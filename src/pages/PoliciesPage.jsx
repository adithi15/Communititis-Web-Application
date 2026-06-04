import React from 'react';
import { FAQ_DATA, POLICY_TABS } from '../data';
import { motion } from 'motion/react';
import { HelpCircle, ShieldCheck, RefreshCw, Scale, Compass } from 'lucide-react';

export default function PoliciesPage({ activePolicyTab, setActivePolicyTab }) {
  return (
    <motion.section
      key="policies-view"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="max-w-4xl mx-auto"
    >
      <div className="grid md:grid-cols-3 gap-6">
        {/* Visual Tab Side Bar */}
        <div className="flex flex-col gap-2 pointer-events-auto">
          {Object.keys(POLICY_TABS).map((tabKey) => (
            <button
              key={tabKey}
              onClick={() => setActivePolicyTab(tabKey)}
              className={`px-5 py-4 text-left rounded-2xl transition-all border font-mono text-[11px] uppercase tracking-widest flex items-center justify-between ${
                activePolicyTab === tabKey
                  ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-md'
                  : 'glass glass-opacity hover:bg-white/50 text-slate-600 border-white/20'
              }`}
            >
              <span>{tabKey.replace('-', ' ')}</span>
              {tabKey === 'faq' && <HelpCircle size={14} className="opacity-80" />}
              {tabKey === 'privacy' && <ShieldCheck size={14} className="opacity-80" />}
              {tabKey === 'returns' && <RefreshCw size={14} className="opacity-80" />}
              {tabKey === 'terms' && <Scale size={14} className="opacity-80" />}
              {tabKey === 'accessibility' && <Compass size={14} className="opacity-80" />}
            </button>
          ))}
        </div>

        {/* Substantive detail panel */}
        <div className="md:col-span-2">
          <div className="glass glass-opacity rounded-3xl p-6 md:p-8 border border-white/20 shadow-xl backdrop-blur-md">
            <h3 className="font-display font-medium text-2xl text-slate-900 mb-4 tracking-tight">
              {POLICY_TABS[activePolicyTab]?.title || POLICY_TABS.faq.title}
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed mb-6">
              {POLICY_TABS[activePolicyTab]?.content || POLICY_TABS.faq.content}
            </p>

            {/* Expandable FAQs nested within FAQ key tabs */}
            {activePolicyTab === 'faq' && (
              <div className="space-y-4 border-t border-slate-900/10 pt-5">
                {FAQ_DATA.map((faq, i) => (
                  <div key={i} className="bg-white/30 border border-white/20 rounded-xl p-4">
                    <h4 className="font-mono text-[11px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <HelpCircle size={12} className="text-slate-500" />
                      {faq.q}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2 pl-5">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-slate-950/10 pt-5 mt-6 font-mono text-[9px] text-slate-400 uppercase tracking-widest text-center">
              OFFICIAL TERMS GOVERNED BY CORP © 2026
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
