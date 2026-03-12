import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center relative px-4 bg-background">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
      <span className="text-8xl block mb-6 font-display font-bold text-muted-foreground/30">404</span>
      <h1 className="font-display font-bold text-4xl sm:text-5xl mb-4">Page Not Found</h1>
      <p className="text-muted-foreground text-lg mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/">
        <Button size="lg" className="px-8">← Back to Home</Button>
      </Link>
    </motion.div>
  </div>
);

export default NotFound;
