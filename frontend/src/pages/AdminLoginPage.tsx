import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Navbar from '@/components/Navbar';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const { adminLogin } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      adminLogin(email, password);
      navigate('/admin');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center cream-gradient pt-16 px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-card rounded-3xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">Admin Access</h1>
            <p className="text-muted-foreground font-body mt-2">Sign in to the admin dashboard</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="email" placeholder="Admin email" value={email} onChange={e => setEmail(e.target.value)}
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
            <button type="submit" className="btn-primary w-full">Admin Sign In</button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default AdminLoginPage;
