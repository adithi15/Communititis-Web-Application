import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, Heart, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data';

export default function InstagramPage() {
  const [followed, setFollowed] = useState(false);

  // Derive Instagram posts dynamically from products to make it look gorgeous and coherent
  const posts = [
    {
      id: 'post-1',
      imageUrl: PRODUCTS[2].image, // Reverse washed iris hoodie
      likes: '1.4k',
      comments: '124',
      caption: 'Washed Iris loopback heavy weight fleece capsule. Natural variations in drape. 620GSM. Standard delivery worldwide.',
      tag: 'COLLECTION CORE',
      hex: PRODUCTS[2].hex
    },
    {
      id: 'post-2',
      imageUrl: PRODUCTS[0].image, // watch cap beanie lime
      likes: '912',
      comments: '42',
      caption: 'Acid lime watches. Bright contrast energy stitching detail. Drop 04 accessories are now active online.',
      tag: 'NEW ARRIVALS',
      hex: PRODUCTS[0].hex
    },
    {
      id: 'post-3',
      imageUrl: PRODUCTS[9].image, // Rest slide tennis green
      likes: '2.1k',
      comments: '198',
      caption: 'Rest slides in tennis neon. Active recovery formulation designed in collaboration with sports physiotherapists.',
      tag: 'FOOTWEAR FOOTPRINT',
      hex: PRODUCTS[9].hex
    },
    {
      id: 'post-4',
      imageUrl: PRODUCTS[19].image, // sunmule cave ore
      likes: '3.8k',
      comments: '421',
      caption: 'Charcoal composite polyols. Complex internal air venting channels. Fully floatable monolithic structure.',
      tag: 'DESIGN CONCEPTS',
      hex: PRODUCTS[19].hex
    },
    {
      id: 'post-5',
      imageUrl: PRODUCTS[15].image, // bump case goo slime green
      likes: '840',
      comments: '39',
      caption: 'Tactile bump cores in slime and barcode labels. High deflection impact absorption rating.',
      tag: 'ACCESSORIES',
      hex: PRODUCTS[15].hex
    },
    {
      id: 'post-6',
      imageUrl: PRODUCTS[13].image, // Sizzler Case Pink
      likes: '1.9k',
      comments: '88',
      caption: 'Bubble styled sizzler puffer configurations. Highly satisfying pocket stress relief factor.',
      tag: 'ESSENTIALS',
      hex: PRODUCTS[13].hex
    }
  ];

  return (
    <motion.section
      key="instagram-view"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-12 max-w-5xl mx-auto"
    >
      {/* Profile Info Header */}
      <div className="glass glass-opacity rounded-3xl p-6 md:p-10 border border-white/20 shadow-xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          {/* Brand Gradient Avatar */}
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full p-1 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white border-2 border-slate-900 font-display font-black text-2xl">
              SK
            </div>
            <span className="absolute bottom-1 right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-slate-950 flex items-center justify-center">
              <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <h2 className="font-display font-bold text-2xl text-slate-900 tracking-tight">@skylrk</h2>
              <span className="font-mono text-[9px] tracking-widest text-[#05AA3D] bg-[#05AA3D]/10 px-2.5 py-0.5 rounded-full uppercase">
                Active Feed
              </span>
            </div>
            
            <p className="text-xs text-slate-600 mt-2 font-sans max-w-lg leading-relaxed">
              Design cores, technical drops, and ergonomic footprint recovery clogs. Manufactured on custom high-end organic looms.
            </p>
            
            {/* Stats row */}
            <div className="flex gap-6 mt-4 font-mono text-[10px] uppercase tracking-wider text-slate-500 justify-center md:justify-start">
              <span><strong>142</strong> Posts</span>
              <span><strong>104k</strong> Followers</span>
              <span><strong>12</strong> Following</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={() => setFollowed(!followed)}
            className={`px-6 py-3.5 rounded-2xl font-mono text-xs tracking-widest uppercase transition-all duration-300 font-bold flex items-center justify-center gap-2 max-md:w-full ${
              followed
                ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                : 'bg-slate-900 hover:bg-slate-950 text-white'
            }`}
          >
            <Instagram size={14} />
            {followed ? 'FOLLOWING' : 'FOLLOW @SKYLRK'}
          </button>

          <a
            href="https://www.instagram.com/skylrk/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 border border-slate-900/10 hover:border-slate-900/30 hover:bg-white/40 rounded-2xl font-mono text-xs tracking-widest uppercase transition-all text-slate-700 font-bold flex items-center justify-center gap-2 max-md:w-full"
          >
            <span>Instagram Direct</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Styled Grid of Social Looks */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Sparkles size={14} className="text-[#05AA3D]" />
          <span className="font-mono text-[10px] tracking-widest uppercase text-slate-500 font-semibold">
            EDITORIAL LOOKBOOK ENTRIES
          </span>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -5 }}
              className="glass glass-opacity rounded-3xl p-4 border border-white/20 shadow-sm flex flex-col justify-between group"
            >
              {/* Product Post Frame */}
              <div 
                className="relative aspect-square rounded-2xl overflow-hidden mb-4 flex items-center justify-center transition-all duration-500"
                style={{ background: `linear-gradient(135deg, ${post.hex}15, ${post.hex}30)` }}
              >
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="w-4/5 max-h-[220px] object-contain transition-transform duration-700 group-hover:scale-110"
                />

                {/* Sub title tag */}
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white font-mono text-[8px] tracking-widest uppercase px-2.5 py-1 rounded-full border border-white/10">
                  {post.tag}
                </div>

                {/* Overlaid stats on Hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-6 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 text-white font-mono text-xs font-semibold">
                    <Heart size={16} className="fill-white" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white font-mono text-xs font-semibold">
                    <MessageCircle size={16} className="fill-white" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>

              {/* Caption and Social details */}
              <div className="px-1 text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] font-bold text-slate-900">@skylrk</span>
                  <span className="font-mono text-[8px] text-slate-400">2 DAYS AGO</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed font-sans line-clamp-3">
                  {post.caption}
                </p>
                <div className="mt-3 pt-2.5 border-t border-slate-900/5 flex items-center gap-2 text-[10px] font-mono tracking-wide text-[#05AA3D]">
                  <Heart size={12} />
                  <span>Liked by {post.likes} design cores</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
