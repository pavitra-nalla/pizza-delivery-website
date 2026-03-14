import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center cream-gradient pt-16 px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-card rounded-3xl shadow-xl p-8 space-y-6">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground">Email Sent</h2>
              <p className="text-muted-foreground font-body">Check your inbox for a password reset link.</p>
              <Link to="/login" className="btn-primary inline-block">Back to Login</Link>
            </div>
          ) : (
            <>
              <div className="text-center">
                <h1 className="text-3xl font-display font-bold text-foreground">Forgot Password</h1>
                <p className="text-muted-foreground font-body mt-2">Enter your email to receive a reset link</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-accent font-body text-sm text-foreground outline-none focus:ring-2 focus:ring-primary transition-all" />
                </div>
                <button type="submit" className="btn-primary w-full">Send Reset Link</button>
              </form>
              <p className="text-center text-sm font-body text-muted-foreground">
                <Link to="/login" className="text-primary font-semibold hover:underline">Back to Login</Link>
              </p>
            </>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
