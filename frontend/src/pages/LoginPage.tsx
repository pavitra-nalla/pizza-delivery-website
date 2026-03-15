import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Navbar from '@/components/Navbar';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    
    login(email, password);
    navigate('/dashboard');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center cream-gradient pt-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-card rounded-3xl shadow-xl p-8 space-y-6"
        >
          <div className="text-center">
            <h1 className="text-3xl font-display font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground font-body mt-2">Sign in to your CHEEZO account</p>
          </div>
          {error && <p className="text-destructive text-sm font-body text-center bg-destructive/10 py-2 rounded-lg border border-destructive/20">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email" placeholder="Email address" value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-accent font-body text-sm text-foreground outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            <div className="relative">
              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${error.includes('Password') ? 'text-destructive' : 'text-muted-foreground'}`} />
              <input
                type={showPw ? 'text' : 'password'} placeholder="Password" value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                className={`w-full pl-11 pr-11 py-3 rounded-xl bg-accent font-body text-sm text-foreground outline-none transition-all ${error.includes('Password') ? 'border border-destructive focus:ring-2 focus:ring-destructive' : 'focus:ring-2 focus:ring-primary'}`}
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2">
                {showPw ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
              </button>
            </div>
            {error.includes('Password') && <p className="text-xs text-destructive font-body mt-1 ml-1">{error}</p>}
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-primary font-body hover:underline">Forgot password?</Link>
            </div>
            <button type="submit" className="btn-primary w-full">Sign In</button>
          </form>
          <p className="text-center text-sm font-body text-muted-foreground">
            Don't have an account? <Link to="/register" className="text-primary font-semibold hover:underline">Sign Up</Link>
          </p>
          <div className="text-center">
            <Link to="/admin-login" className="text-xs text-muted-foreground font-body hover:text-primary transition-colors">Admin Login</Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;
