import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/features/shared/components/ThemeToggle";
import { useAuth } from "@/features/auth/context/AuthContext";
import logoWhite from "@/assets/logo-white.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="w-full px-4 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoWhite} alt="AutoStore IM" className="h-8 w-8 dark:invert-0 invert" />
          <span className="font-display font-bold text-lg">AutoStore IM</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          <Link to="/tutorial" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Tutorial</Link>
          <ThemeToggle />
          {isAuthenticated ? (
            <Link to={user?.role === 'superadmin' ? '/admin' : '/dashboard'}>
              <Button size="sm">Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/login"><Button variant="ghost" size="sm">Log In</Button></Link>
              <Link to="/register"><Button size="sm">Get Started</Button></Link>
            </>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" onClick={() => setOpen(!open)} className="font-mono text-xs">
            {open ? '✕' : '☰'}
          </Button>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass-card border-t border-border/50 p-4 space-y-3">
          <Link to="/#features" onClick={() => setOpen(false)} className="block text-sm py-2">Features</Link>
          <Link to="/pricing" onClick={() => setOpen(false)} className="block text-sm py-2">Pricing</Link>
          <Link to="/tutorial" onClick={() => setOpen(false)} className="block text-sm py-2">Tutorial</Link>
          {isAuthenticated ? (
            <Link to={user?.role === 'superadmin' ? '/admin' : '/dashboard'} onClick={() => setOpen(false)}>
              <Button className="w-full" size="sm">Dashboard</Button>
            </Link>
          ) : (
            <div className="space-y-2">
              <Link to="/login" onClick={() => setOpen(false)}><Button variant="ghost" className="w-full" size="sm">Log In</Button></Link>
              <Link to="/register" onClick={() => setOpen(false)}><Button className="w-full" size="sm">Get Started</Button></Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
