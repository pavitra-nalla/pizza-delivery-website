import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Navbar from '@/components/Navbar';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [registered, setRegistered] = useState(false);
  const { register } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    register(name, email, password);
    setRegistered(true);
  };

  if (registered) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center cream-gradient pt-16 px-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-card rounded-3xl shadow-xl p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground">Check Your Email</h2>
            <p className="text-muted-foreground font-body">We've sent a verification link to <strong>{email}</strong></p>
            <Link to="/login" className="btn-primary inline-block">Go to Login</Link>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center cream-gradient pt-16 px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-card rounded-3xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-display font-bold text-foreground">Create Account</h1>
            <p className="text-muted-foreground font-body mt-2">Join CHEEZO for the best pizza experience</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-accent font-body text-sm text-foreground outline-none focus:ring-2 focus:ring-primary transition-all" />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-accent font-body text-sm text-foreground outline-none focus:ring-2 focus:ring-primary transition-all" />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type={showPw ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-3 rounded-xl bg-accent font-body text-sm text-foreground outline-none focus:ring-2 focus:ring-primary transition-all" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2">
                {showPw ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
              </button>
            </div>
            <button type="submit" className="btn-primary w-full">Create Account</button>
          </form>
          <p className="text-center text-sm font-body text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default RegisterPage;
