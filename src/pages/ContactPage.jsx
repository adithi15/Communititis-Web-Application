import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Check } from 'lucide-react';

export default function ContactPage() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    category: 'Drop Inquiry',
    message: ''
  });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactLoading(true);
    setTimeout(() => {
      setContactLoading(false);
      setContactSuccess(true);
      setContactForm({ name: '', email: '', category: 'Drop Inquiry', message: '' });
      setTimeout(() => setContactSuccess(false), 4000);
    }, 1200);
  };

  return (
    <motion.section
      key="contact-view"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="max-w-2xl mx-auto"
    >
      <div className="glass glass-opacity rounded-3xl p-6 md:p-10 border border-white/20 shadow-xl backdrop-blur-md">
        <div className="text-center mb-8">
          <span className="font-mono text-xs tracking-widest text-slate-500 uppercase bg-black/5 px-3.5 py-1 rounded-full">
            Customer Experience Service
          </span>
          <h2 className="font-display font-medium text-3xl text-slate-900 mt-3 tracking-tight">
            COMMUNICATE WITH CORP
          </h2>
          <p className="text-xs text-slate-600 font-sans mt-2 max-w-md mx-auto leading-relaxed">
            Stuck on a sizing metric, or checking an overseas shipment? Complete individual fields below, and our support team will synchronize with you.
          </p>
        </div>

        {contactSuccess ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-12 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center mx-auto mb-4 text-emerald-600">
              <Check size={24} />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">DISPATCH SECURED!</h3>
            <p className="text-xs text-slate-600 mt-2 font-mono">
              YOUR CASE HAS BEEN ASSIGNED ID: SK-H-{Math.floor(1000 + Math.random() * 9000)}
            </p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-4 leading-relaxed font-sans">
              Our design representatives typically process inquiries within 24 operational hours. Thank you.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono tracking-wider uppercase text-slate-600 mb-1.5 px-1 font-semibold">
                  Name / Identity
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/45 focus:bg-white/80 rounded-2xl outline-none text-slate-800 placeholder-slate-400 border border-white/40 focus:border-slate-800 transition-all text-sm font-sans"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono tracking-wider uppercase text-slate-600 mb-1.5 px-1 font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/45 focus:bg-white/80 rounded-2xl outline-none text-slate-800 placeholder-slate-400 border border-white/40 focus:border-slate-800 transition-all text-sm font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono tracking-wider uppercase text-slate-600 mb-1.5 px-1 font-semibold">
                Inquiry Category
              </label>
              <select
                value={contactForm.category}
                onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                className="w-full px-4 py-3 bg-white/45 focus:bg-white/80 rounded-2xl outline-none text-slate-800 border border-white/40 focus:border-slate-800 transition-all text-sm font-sans"
              >
                <option>Drop Inquiry</option>
                <option>Order Status Check</option>
                <option>Return/Refund Request</option>
                <option>General Collaboration</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono tracking-wider uppercase text-slate-600 mb-1.5 px-1 font-semibold">
                Message Body
              </label>
              <textarea
                required
                rows={5}
                placeholder="Detail your inquiry specs..."
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full px-4 py-3 bg-white/45 focus:bg-white/80 rounded-2xl outline-none text-slate-800 placeholder-slate-400 border border-white/40 focus:border-slate-800 transition-all text-sm font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={contactLoading}
              className="w-full py-4 bg-slate-900 hover:bg-slate-950 active:scale-98 transition-all text-white font-mono text-xs tracking-widest uppercase font-bold rounded-2xl flex items-center justify-center gap-2"
            >
              {contactLoading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  SUBMIT CASE TICKET
                  <Send size={13} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </motion.section>
  );
}
