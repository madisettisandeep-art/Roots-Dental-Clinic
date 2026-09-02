'use client';

import React from 'react';
import { Sparkles, Calendar, MessageSquare, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default function AppointmentCTA() {
  const openBookingModal = () => {
    window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: {} }));
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white overflow-hidden" id="book">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-medical-blue/25 via-aqua-500/20 to-cyan-400/25 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-14 lg:p-16 rounded-3xl bg-gradient-to-b from-navy-800/80 via-navy-900/90 to-navy-950/95 border border-aqua-400/30 backdrop-blur-2xl shadow-2xl text-center space-y-6 relative overflow-hidden">
          {/* Subtle Grid Accent */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-aqua-500/10 border border-aqua-400/30 text-aqua-300 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-aqua-400" />
            PRIORITIZE YOUR ORAL HEALTH TODAY
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display max-w-3xl mx-auto leading-tight">
            Ready to Experience Specialised Dental Care in Kazipet?
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Book your consultation in under 60 seconds. Our specialist dental team is here to restore your comfort, function, and natural smile.
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={openBookingModal}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-medical-blue via-cyan-600 to-aqua-500 hover:from-cyan-600 hover:to-aqua-400 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-glow-cyan flex items-center justify-center gap-2 group"
            >
              <Calendar className="w-4 h-4" />
              <span>Book An Appointment</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={getWhatsAppLink({})}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href="tel:+919876543210"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-aqua-400" />
              <span>Call Clinic</span>
            </a>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Transparent Pricing
            </span>
            <span>•</span>
            <span>Zero Double-Booking Guarantee</span>
            <span>•</span>
            <span>Darga Road, near NIT Hanamkonda</span>
          </div>
        </div>
      </div>
    </section>
  );
}
