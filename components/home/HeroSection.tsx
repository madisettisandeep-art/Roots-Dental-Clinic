'use client';

import React from 'react';
import { Sparkles, Calendar, MessageSquare, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import Tooth3DCanvas from '@/components/three/Tooth3DCanvas';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default function HeroSection() {
  const openBookingModal = () => {
    window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: {} }));
  };

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 overflow-hidden pt-4 pb-16 lg:py-0">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-medical-blue/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-aqua-500/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-aqua-400/30 text-aqua-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-glass">
              <Sparkles className="w-3.5 h-3.5 text-aqua-400" />
              ADVANCED DENTAL CARE • HANAMKONDA
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white font-display leading-[1.08]">
              Your Smile Deserves{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-aqua-300 via-cyan-400 to-medical-light">
                Specialised Care.
              </span>
            </h1>

            {/* Supporting Subtext */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Advanced dental care delivered with precision, comfort, and a patient-first approach. State-of-the-art diagnostics and microscopic endodontics in Kazipet.
            </p>

            {/* CTA Button Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              {/* Primary CTA */}
              <button
                onClick={openBookingModal}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-medical-blue via-cyan-600 to-aqua-500 hover:from-cyan-600 hover:to-aqua-400 text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-glow-cyan flex items-center justify-center gap-2 group"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA: WhatsApp */}
              <a
                href={getWhatsAppLink({})}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-bold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-glass"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Us</span>
              </a>

              {/* Tertiary CTA: Call Now */}
              <a
                href="tel:+919876543210"
                className="w-full sm:w-auto px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-aqua-400" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-slate-300 font-medium">5.0 Google Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-aqua-400" />
                <span className="text-slate-300 font-medium">66+ Patient Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-slate-300 font-medium">Near NIT Warangal</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Tooth Canvas with Floating Micro-Labels */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Background Radial Glow */}
            <div className="absolute inset-0 bg-radial-gradient from-cyan-500/20 via-medical-blue/10 to-transparent rounded-full blur-3xl" />

            <div className="relative w-full h-[420px] sm:h-[500px] flex items-center justify-center">
              <Tooth3DCanvas className="w-full h-full" interactive={true} />

              {/* Floating Micro-Labels */}
              <div className="absolute top-6 left-2 sm:left-4 px-3.5 py-1.5 rounded-xl bg-navy-950/80 border border-aqua-400/40 text-aqua-300 text-[11px] font-bold tracking-widest uppercase shadow-glass-dark backdrop-blur-md animate-float">
                ✨ PRECISION
              </div>

              <div
                className="absolute bottom-16 left-4 sm:left-8 px-3.5 py-1.5 rounded-xl bg-navy-950/80 border border-white/20 text-white text-[11px] font-bold tracking-widest uppercase shadow-glass-dark backdrop-blur-md animate-float"
                style={{ animationDelay: '2s' }}
              >
                🛡️ COMFORT
              </div>

              <div
                className="absolute top-20 right-2 sm:right-4 px-3.5 py-1.5 rounded-xl bg-navy-950/80 border border-cyan-400/40 text-cyan-300 text-[11px] font-bold tracking-widest uppercase shadow-glass-dark backdrop-blur-md animate-float"
                style={{ animationDelay: '4s' }}
              >
                🔬 ADVANCED CARE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
