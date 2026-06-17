import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Eye, EyeOff, Check, ShieldCheck } from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const switchMode = (next) => {
    setMode(next);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup') {
      if (!name || !email || !password || !confirmPassword) {
        setError('Please fill out every field to continue.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (!agreeTerms) {
        setError('Please accept the terms to create an account.');
        return;
      }
    } else {
      if (!email || !password) {
        setError('Enter your email and password.');
        return;
      }
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1200);
  };

  // Once login/signup succeeds, the app starts automatically — no extra click.
  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => {
      onLoginSuccess?.({ name, email, mode });
    }, 1100);
    return () => clearTimeout(t);
  }, [success]);

  return (
    <motion.section
      key="login-view"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="w-full max-w-md"
    >
      <div className="relative rounded-[28px] overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0b] p-8 sm:p-10 font-mono select-none">
        {/* Subtle ambient accent, no product imagery */}
        <div
          className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: '#D1F362' }}
        />

        <div className="relative z-10">
          {/* Brand mark */}
          <div className="text-center mb-8">
            <span className="font-display font-black text-2xl text-white tracking-tight">
              SKYLRK
            </span>
            <p className="text-[9px] tracking-[0.2em] uppercase text-white/40 mt-2">
              Member Access
            </p>
          </div>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="flex flex-col items-center text-center py-8"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center mb-5 text-emerald-400">
                  <Check size={24} />
                </div>
                <h3 className="font-display font-bold text-lg text-white uppercase tracking-widest">
                  {mode === 'signin' ? 'Access Granted' : 'Welcome to Skylrk'}
                </h3>
                <p className="text-xs text-white/50 mt-3 leading-relaxed font-sans">
                  Setting things up — just a moment.
                </p>
                <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-[#D1F362] animate-spin mt-6" />
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Mode toggle */}
                <div className="relative flex bg-white/5 border border-white/10 rounded-full p-1 mb-8">
                  {['signin', 'signup'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => switchMode(m)}
                      className={`relative flex-1 px-4 py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest rounded-full transition-colors duration-200 ${
                        mode === m ? 'text-slate-950' : 'text-white/50 hover:text-white/80'
                      }`}
                    >
                      {mode === m && (
                        <motion.span
                          layoutId="login-toggle-pill"
                          className="absolute inset-0 bg-white rounded-full -z-10"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">
                        {m === 'signin' ? 'Sign In' : 'Sign Up'}
                      </span>
                    </button>
                  ))}
                </div>

                <h2 className="font-display font-bold text-xl text-white tracking-tight text-center">
                  {mode === 'signin' ? 'Welcome back' : 'Create your account'}
                </h2>
                <p className="text-xs text-white/40 mt-2 mb-7 text-center font-sans">
                  {mode === 'signin'
                    ? 'Sign in to continue.'
                    : 'Set up your account to continue.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={mode}
                      initial={{ opacity: 0, x: mode === 'signup' ? 16 : -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: mode === 'signup' ? -16 : 16 }}
                      transition={{ duration: 0.22 }}
                      className="space-y-4"
                    >
                      {mode === 'signup' && (
                        <div className="relative">
                          <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                          <input
                            type="text"
                            required
                            placeholder="Full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-12 pl-11 pr-4 bg-white/5 hover:bg-white/10 focus:bg-white/10 rounded-xl text-white text-xs placeholder-white/40 outline-none border border-white/10 focus:border-[#D1F362]/50 transition-all"
                          />
                        </div>
                      )}

                      <div className="relative">
                        <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                          type="email"
                          required
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full h-12 pl-11 pr-4 bg-white/5 hover:bg-white/10 focus:bg-white/10 rounded-xl text-white text-xs placeholder-white/40 outline-none border border-white/10 focus:border-[#D1F362]/50 transition-all"
                        />
                      </div>

                      <div className="relative">
                        <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full h-12 pl-11 pr-11 bg-white/5 hover:bg-white/10 focus:bg-white/10 rounded-xl text-white text-xs placeholder-white/40 outline-none border border-white/10 focus:border-[#D1F362]/50 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>

                      {mode === 'signup' && (
                        <div className="relative">
                          <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                          <input
                            type={showConfirm ? 'text' : 'password'}
                            required
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full h-12 pl-11 pr-11 bg-white/5 hover:bg-white/10 focus:bg-white/10 rounded-xl text-white text-xs placeholder-white/40 outline-none border border-white/10 focus:border-[#D1F362]/50 transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                            aria-label={showConfirm ? 'Hide password' : 'Show password'}
                          >
                            {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        </div>
                      )}

                      {mode === 'signin' ? (
                        <div className="flex items-center justify-between pt-1">
                          <label className="flex items-center gap-2 text-[10px] text-white/50 font-sans cursor-pointer">
                            <input
                              type="checkbox"
                              checked={remember}
                              onChange={(e) => setRemember(e.target.checked)}
                              className="rounded border-white/20 bg-transparent focus:ring-0 text-slate-950 w-3.5 h-3.5"
                            />
                            Remember me
                          </label>
                          <button
                            type="button"
                            className="text-[10px] text-white/40 hover:text-white uppercase tracking-widest transition-colors"
                          >
                            Forgot password?
                          </button>
                        </div>
                      ) : (
                        <label className="flex items-start gap-2 text-[10px] text-white/50 font-sans cursor-pointer pt-1 leading-relaxed">
                          <input
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            className="rounded border-white/20 bg-transparent focus:ring-0 text-slate-950 w-3.5 h-3.5 mt-0.5"
                          />
                          I agree to the Terms of Service and Privacy Policy.
                        </label>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {error && (
                    <p className="text-[10px] text-rose-400 font-sans tracking-wide">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-white text-slate-950 hover:bg-white/90 active:scale-[0.98] font-mono text-[11px] font-bold uppercase tracking-widest rounded-full flex items-center justify-center transition-all mt-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                    ) : mode === 'signin' ? (
                      'Sign In'
                    ) : (
                      'Create Account'
                    )}
                  </button>

                  <p className="text-center text-[10px] text-white/40 font-sans pt-1">
                    {mode === 'signin' ? (
                      <>
                        New to SKYLRK?{' '}
                        <button
                          type="button"
                          onClick={() => switchMode('signup')}
                          className="text-white hover:text-[#D1F362] font-semibold transition-colors"
                        >
                          Create account
                        </button>
                      </>
                    ) : (
                      <>
                        Already a member?{' '}
                        <button
                          type="button"
                          onClick={() => switchMode('signin')}
                          className="text-white hover:text-[#D1F362] font-semibold transition-colors"
                        >
                          Sign in
                        </button>
                      </>
                    )}
                  </p>

                  <div className="flex justify-center items-center gap-2 text-[8px] text-white/30 uppercase tracking-[0.15em] pt-3">
                    <ShieldCheck size={12} className="text-emerald-500/50" />
                    <span>Simulated secure login demo</span>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}