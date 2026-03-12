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

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirm) { setError("Please fill all fields"); return; }
    if (password !== confirm) { setError("Passwords don't match"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    register(name, email, password);
    navigate('/pricing-select');
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
        <h1 className="font-display text-2xl font-bold text-center mb-2">Create Account</h1>
        <p className="text-center text-sm text-muted-foreground mb-6">Join as a BSIT IM Student</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-destructive text-center">{error}</p>}
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Juan Dela Cruz" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@student.bestlink.edu.ph" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="confirm">Confirm Password</Label>
            <Input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" className="mt-1" />
          </div>
          <Button type="submit" className="w-full" size="lg">Register →</Button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account? <Link to="/login" className="text-foreground underline">Log In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
