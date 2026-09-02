'use client';

import React from 'react';
import { Star, Award, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function TrustBar() {
  const metrics = [
    {
      icon: Star,
      value: '5.0',
      suffix: '★',
      title: 'Google Rating',
      desc: 'Flawless patient satisfaction rating',
      color: 'text-amber-400',
    },
    {
      icon: Award,
      value: '66+',
      suffix: '',
      title: 'Patient Reviews',
      desc: 'Verified patient testimonials',
      color: 'text-aqua-400',
    },
    {
      icon: ShieldCheck,
      value: 'Advanced',
      suffix: '',
      title: 'Dental Care',
      desc: 'Precision rotary endodontics & diagnostics',
      color: 'text-cyan-400',
    },
    {
      icon: HeartHandshake,
      value: 'Patient-First',
      suffix: '',
      title: 'Treatment Approach',
      desc: 'Transparent pricing & gentle care',
      color: 'text-emerald-400',
    },
  ];

  return (
    <section className="relative py-10 bg-navy-950 border-y border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={m.title}
                className="p-5 rounded-2xl bg-navy-900/60 border border-white/10 hover:border-white/20 transition-all text-center md:text-left flex flex-col items-center md:items-start group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                    <Icon className={`w-5 h-5 ${m.color}`} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-display">
                    {m.value}
                    <span className={m.color}>{m.suffix}</span>
                  </div>
                </div>

                <div className="text-sm font-bold text-slate-100 tracking-wide">
                  {m.title}
                </div>
                <div className="text-xs text-slate-400 mt-0.5 leading-snug">
                  {m.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
