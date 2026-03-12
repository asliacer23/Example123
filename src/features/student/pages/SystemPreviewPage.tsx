import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PREVIEW_PRODUCTS } from "@/features/shared/data/mockData";
import { useAuth } from "@/features/auth/context/AuthContext";
import ThemeToggle from "@/features/shared/components/ThemeToggle";
import { toast } from "sonner";

const SystemPreviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<'store' | 'cart' | 'orders'>('store');

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const categories = ["All", ...new Set(PREVIEW_PRODUCTS.map(p => p.category))];

  const filteredProducts = PREVIEW_PRODUCTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const addToCart = (productId: string) => {
    setCart([...cart, productId]);
    toast.success("Added to cart!");
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(id => id !== productId));
    toast.success("Removed from cart");
  };

  const cartProducts = PREVIEW_PRODUCTS.filter(p => cart.includes(p.id));
  const cartTotal = cartProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Preview Header */}
      <div className="glass-card border-b border-border/50 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>← Back</Button>
            <div className="hidden sm:block">
              <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full">Live Preview</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono hidden sm:block">campusmerch.autostore-im.app</span>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Store Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="w-full px-4 sm:px-8 py-12 text-center border-b border-border/50">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-3">Campus Merch Store</h1>
        <p className="text-muted-foreground text-lg mb-8">Official merchandise for Bestlink College students</p>
        
        {/* Navigation */}
        <div className="flex justify-center gap-2 mb-6">
          {(['store', 'cart', 'orders'] as const).map((view) => (
            <Button key={view} variant={activeView === view ? 'default' : 'outline'} size="sm"
              onClick={() => setActiveView(view)} className="capitalize">
              {view === 'cart' ? `Cart (${cart.length})` : view}
            </Button>
          ))}
        </div>
      </motion.div>

      {activeView === 'store' && (
        <div className="w-full px-4 sm:px-8 py-8">
          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..." className="flex-1" />
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <Button key={cat} size="sm" variant={selectedCategory === cat ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat)}>
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="dashboard-card p-0 overflow-hidden group">
                <div className="bg-secondary p-8 text-center group-hover:bg-accent transition-colors">
                  <span className="text-6xl">{product.image}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-display font-semibold">{product.name}</h4>
                    <span className="text-sm text-muted-foreground">⭐ {product.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                  <p className="text-xs text-muted-foreground mb-3">{product.stock} in stock</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-display font-bold">₱{product.price.toLocaleString()}</p>
                    <Button size="sm" onClick={() => addToCart(product.id)}
                      disabled={cart.includes(product.id)}>
                      {cart.includes(product.id) ? 'In Cart' : 'Add to Cart'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <span className="text-5xl block mb-4">🔍</span>
              <p className="text-lg font-display">No products found</p>
            </div>
          )}
        </div>
      )}

      {activeView === 'cart' && (
        <div className="w-full px-4 sm:px-8 py-8">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-6xl block mb-4">🛒</span>
              <h3 className="font-display font-bold text-2xl mb-2">Cart is empty</h3>
              <p className="text-muted-foreground mb-6">Add products to your cart to see them here.</p>
              <Button onClick={() => setActiveView('store')}>Browse Products</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-3">
                {cartProducts.map((product) => (
                  <motion.div key={product.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    className="dashboard-card p-5 flex items-center gap-4">
                    <span className="text-4xl">{product.image}</span>
                    <div className="flex-1">
                      <h4 className="font-display font-semibold">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <p className="font-display font-bold text-lg">₱{product.price.toLocaleString()}</p>
                    <Button size="sm" variant="ghost" onClick={() => removeFromCart(product.id)}
                      className="text-destructive hover:text-destructive">Remove</Button>
                  </motion.div>
                ))}
              </div>
              <div className="dashboard-card p-6 h-fit sticky top-20">
                <h4 className="font-display font-semibold text-lg mb-4">Order Summary</h4>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({cart.length} items)</span>
                    <span>₱{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-border/50 pt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-xl font-display">₱{cartTotal.toLocaleString()}</span>
                  </div>
                </div>
                <Button className="w-full" onClick={() => { setCart([]); setActiveView('orders'); toast.success("Order placed!"); }}>
                  Checkout →
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeView === 'orders' && (
        <div className="w-full px-4 sm:px-8 py-8">
          <div className="text-center py-8 mb-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
              className="text-6xl mb-4">✅</motion.div>
            <h3 className="font-display font-bold text-2xl mb-2">Order Confirmed!</h3>
            <p className="text-muted-foreground">Your order has been placed successfully.</p>
          </div>
          <div className="dashboard-card p-6 max-w-2xl mx-auto">
            <h4 className="font-display font-semibold text-lg mb-4">Order #ORD-2025-0042</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="text-success font-medium">Processing</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment</span>
                <span>GCash</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-6" onClick={() => setActiveView('store')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemPreviewPage;
