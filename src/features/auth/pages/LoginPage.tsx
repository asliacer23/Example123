import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/features/auth/context/AuthContext";
import ParticleBackground from "@/features/shared/components/ParticleBackground";
import ThemeToggle from "@/features/shared/components/ThemeToggle";
import logoWhite from "@/assets/logo-white.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill all fields"); return; }
    const success = login(email, password);
    if (success) {
      if (email === 'admin@autostore.im') navigate('/admin');
      else navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4">
      <ParticleBackground />
      <div className="absolute top-4 right-4 z-10"><ThemeToggle /></div>
      <div className="absolute top-4 left-4 z-10">
        <Link to="/">
          <Button variant="ghost" size="sm">← Home</Button>
        </Link>
      </div>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
        className="glass-card p-8 w-full max-w-md">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <img src={logoWhite} alt="AutoStore IM" className="h-10 w-10 dark:invert-0 invert" />
          <span className="font-display font-bold text-xl">AutoStore IM</span>
        </div>
        <h1 className="font-display text-2xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-center text-sm text-muted-foreground mb-6">Sign in to your account</p>

        <div className="glass-card p-3 mb-6 text-xs text-muted-foreground space-y-1">
          <p className="font-semibold text-foreground">Demo Credentials:</p>
          <p>Admin: admin@autostore.im / any password</p>
          <p>Student: juan@student.bestlink.edu.ph / any password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-destructive text-center">{error}</p>}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@student.bestlink.edu.ph" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1" />
          </div>
          <Button type="submit" className="w-full" size="lg">Log In →</Button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account? <Link to="/register" className="text-foreground underline">Register</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
