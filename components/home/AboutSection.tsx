'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Heart,
  Activity,
  ArrowRight,
  Stethoscope,
  Microscope,
} from 'lucide-react';

export default function AboutSection() {
  const points = [
    {
      title: 'Advanced Dental Treatment',
      desc: 'Precision rotary endodontics, high-definition digital imaging, and modern sterilization suites.',
      icon: Microscope,
    },
    {
      title: 'Patient Comfort First',
      desc: 'Gentle, pain-conscious protocols designed to alleviate dental anxiety for all age groups.',
      icon: Heart,
    },
    {
      title: 'Precision-Focused Care',
      desc: 'Targeted diagnostics preserving maximum natural tooth structure whenever clinically viable.',
      icon: Sparkles,
    },
    {
      title: 'Family & Pediatric Dentistry',
      desc: 'Dedicated oral healthcare for children, adults, and seniors under one trusted roof in Kazipet.',
      icon: Activity,
    },
    {
      title: 'Modern Treatment Options',
      desc: 'Biocompatible titanium implants, digital clear aligners, and aesthetic restorations.',
      icon: Stethoscope,
    },
    {
      title: 'Individualised Treatment Planning',
      desc: 'Clear, transparent explanations with customized treatment roadmap and reasonable pricing.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white overflow-hidden" id="about">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-medical-blue/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
              <div className="aspect-[4/3] relative">
                <Image
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80"
                  alt="Roots Super Speciality Dental Clinic modern operatory and equipment in Kazipet"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
              </div>

              {/* Floating clinic badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-navy-900/90 border border-white/15 backdrop-blur-xl shadow-glass">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-aqua-500/20 border border-aqua-400/40 flex items-center justify-center text-aqua-300 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Sterilization & Clinical Hygiene</h4>
                    <p className="text-xs text-slate-300">
                      Multi-tier Class-B autoclave and strict infection-control standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative secondary badge */}
            <div className="hidden sm:flex absolute -top-4 -right-4 p-4 rounded-2xl bg-navy-800/95 border border-aqua-400/40 backdrop-blur-md shadow-glow-cyan items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold text-white">
                Near NIT Warangal • Subedari
              </span>
            </div>
          </div>

          {/* Right Column: About Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-aqua-400/30 text-aqua-300 text-xs font-bold tracking-wider uppercase">
              ABOUT ROOTS
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display leading-tight">
              Modern Dentistry.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-aqua-300 to-cyan-400">
                Personalised Care.
              </span>
            </h2>

            <p className="text-base text-slate-300 leading-relaxed font-normal">
              Located on Darga Road near NIT Kazipet, <strong className="text-white">Roots Super Speciality Dental Clinic</strong> combines advanced dental technology with compassionate, patient-centered care. We believe exceptional dentistry is built on clinical precision, transparent communication, and genuine long-term relationships with families across Hanamkonda and Warangal.
            </p>

            {/* Feature Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {points.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="p-4 rounded-2xl bg-navy-800/50 border border-white/10 hover:border-aqua-400/40 transition-all hover:bg-navy-800/80"
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <Icon className="w-4 h-4 text-aqua-400" />
                      <h4 className="text-xs font-bold text-white tracking-wide">{p.title}</h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-snug">{p.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Action CTA */}
            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/about"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-2 border border-white/15"
              >
                <span>Read Clinic Story</span>
                <ArrowRight className="w-3.5 h-3.5 text-aqua-300" />
              </Link>

              <button
                onClick={() =>
                  window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: {} }))
                }
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-medical-blue to-cyan-500 hover:from-cyan-500 hover:to-aqua-400 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-glow-cyan"
              >
                Schedule Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
