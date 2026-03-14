import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password === confirm) setDone(true);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center cream-gradient pt-16 px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-card rounded-3xl shadow-xl p-8 space-y-6">
          {done ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground">Password Reset</h2>
              <p className="text-muted-foreground font-body">Your password has been successfully updated.</p>
              <Link to="/login" className="btn-primary inline-block">Sign In</Link>
            </div>
          ) : (
            <>
              <div className="text-center">
                <h1 className="text-3xl font-display font-bold text-foreground">Reset Password</h1>
                <p className="text-muted-foreground font-body mt-2">Enter your new password</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type={showPw ? 'text' : 'password'} placeholder="New password" value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-3 rounded-xl bg-accent font-body text-sm text-foreground outline-none focus:ring-2 focus:ring-primary transition-all" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2">
                    {showPw ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="password" placeholder="Confirm password" value={confirm} onChange={e => setConfirm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-accent font-body text-sm text-foreground outline-none focus:ring-2 focus:ring-primary transition-all" />
                </div>
                {password && confirm && password !== confirm && (
                  <p className="text-destructive text-sm font-body">Passwords do not match</p>
                )}
                <button type="submit" className="btn-primary w-full">Reset Password</button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
