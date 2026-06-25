import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KeyRound, Check, ShieldCheck } from 'lucide-react';

// Shared access code — give this to anyone you want to let in.
// Any number of people can use the same code.
const ACCESS_CODE = 'ANKAM15';

export default function LoginPage({ onLoginSuccess }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = code.trim();

    if (!trimmed) {
      setError('Enter your access code.');
      setShakeKey((k) => k + 1);
      return;
    }

    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (trimmed.toUpperCase() === ACCESS_CODE.toUpperCase()) {
        setSuccess(true);
      } else {
        setError('Invalid access code. Please try again.');
        setShakeKey((k) => k + 1);
        setCode('');
      }
    }, 800);
  };

  // Once the code checks out, the app starts automatically — no extra click.
  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => {
      onLoginSuccess?.({ code });
    }, 1100);
    return () => clearTimeout(t);
  }, [success]);

  return (
    <motion.section
      key="login-view"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="w-full max-w-sm"
    >
      <div className="relative rounded-[28px] overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0b] font-mono select-none">
        {/* Premium top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, transparent, #D1F362, transparent)' }}
        />

        {/* Subtle ambient accent */}
        <div
          className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: '#D1F362' }}
        />

        <div className="relative z-10 p-8 sm:p-10">
          {/* Brand mark */}
          <div className="text-center mb-10">
            <span className="font-display font-black text-2xl text-white tracking-tight">
              COMMUNITITIS
            </span>
            <div className="w-8 h-[2px] mx-auto mt-3 rounded-full bg-[#D1F362]/60" />
            {/* <p className="text-[9px] tracking-[0.2em] uppercase text-white/40 mt-2">
              Private Access
            </p> */}
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
                  Access Granted
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
                <h2 className="font-display font-bold text-xl text-white tracking-tight text-center mb-7">
                  Enter your access code
                </h2>
                {/* <p className="text-xs text-white/40 mt-2 mb-8 text-center font-sans leading-relaxed">
                  This is an invite-only space. Enter the code you were given to continue.
                </p> */}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div
                    key={shakeKey}
                    initial={{ x: 0 }}
                    animate={error ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                  >
                    <KeyRound size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      type="text"
                      autoFocus
                      placeholder="ACCESS CODE"
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value);
                        if (error) setError('');
                      }}
                      className={`w-full h-14 pl-11 pr-4 bg-white/5 hover:bg-white/10 focus:bg-white/10 rounded-xl text-white text-sm font-bold uppercase tracking-[0.2em] text-center placeholder-white/30 outline-none border transition-all duration-200 ${
                        error
                          ? 'border-rose-500/60 focus:border-rose-500'
                          : 'border-white/10 focus:border-[#D1F362]/50 focus:shadow-[0_0_0_3px_rgba(209,243,98,0.12)]'
                      }`}
                    />
                  </motion.div>

                  {error && (
                    <p className="text-[10px] text-rose-400 font-sans tracking-wide text-center">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-white text-slate-950 hover:bg-white/90 active:scale-[0.98] font-mono text-[11px] font-bold uppercase tracking-widest rounded-full flex items-center justify-center transition-all shadow-[0_4px_24px_rgba(255,255,255,0.08)] mt-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                    ) : (
                      'Unlock Access'
                    )}
                  </button>

                  {/* <div className="flex justify-center items-center gap-2 text-[8px] text-white/30 uppercase tracking-[0.15em] pt-3">
                    <ShieldCheck size={12} className="text-emerald-500/50" />
                    <span>Access codes are limited to invited members</span>
                  </div> */}
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}   