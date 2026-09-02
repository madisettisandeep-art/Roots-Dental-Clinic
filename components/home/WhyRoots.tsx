'use client';

import React from 'react';
import {
  Crosshair,
  Heart,
  Cpu,
  Users,
  FileCheck2,
  Clock,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export default function WhyRoots() {
  const differentiators = [
    {
      icon: Crosshair,
      title: 'Precision-Focused Care',
      desc: 'Specialized rotary endodontics and digital apex measurement ensuring clinical accuracy while preserving healthy natural tooth structure.',
    },
    {
      icon: Heart,
      title: 'Patient Comfort First',
      desc: 'Gentle, anxiety-free procedures designed to ensure patients of all age groups feel completely relaxed throughout their visit.',
    },
    {
      icon: Cpu,
      title: 'Modern Treatment Approach',
      desc: 'Advanced digital diagnosis, biocompatible restorative materials, and Class-B autoclave sterilization protocols.',
    },
    {
      icon: Users,
      title: 'Family-Friendly Environment',
      desc: 'Comprehensive oral healthcare under one roof for toddlers, adolescents, adults, and seniors in the Kazipet & Hanamkonda community.',
    },
    {
      icon: FileCheck2,
      title: 'Personalised Treatment Planning',
      desc: 'Transparent consultations with clear step-by-step guidance, digital X-ray review, and no surprise procedures or hidden costs.',
    },
    {
      icon: Clock,
      title: 'Easy Appointment Access',
      desc: 'Seamless online booking, instant WhatsApp confirmations, central location on Darga Road near NIT, and flexible weekend hours.',
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white overflow-hidden" id="why-roots">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-medical-blue/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-aqua-400/30 text-aqua-300 text-xs font-bold tracking-wider uppercase mb-3">
            THE ROOTS ADVANTAGE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-display">
            Why Patients Choose Roots
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Committed to clinical excellence, honest diagnostics, and genuine patient relationships in Hanamkonda.
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentiators.map((diff, index) => {
            const Icon = diff.icon;
            return (
              <div
                key={diff.title}
                className="p-8 rounded-3xl bg-navy-900/60 border border-white/10 hover:border-aqua-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-dark relative overflow-hidden group"
              >
                {/* Micro accent */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-navy-800 to-navy-950 border border-aqua-400/30 flex items-center justify-center text-aqua-300 mb-6 group-hover:scale-110 group-hover:border-aqua-400 transition-all shadow-glow-cyan">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 font-display group-hover:text-aqua-300 transition-colors">
                  {diff.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {diff.desc}
                </p>

                <div className="absolute top-6 right-6 text-2xl font-black font-mono text-white/5 group-hover:text-aqua-400/10 transition-colors">
                  0{index + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
