'use client';

import React from 'react';
import { Flame, Phone, MessageSquare, Calendar, AlertTriangle } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default function EmergencyBanner() {
  const openBookingModal = () => {
    window.dispatchEvent(
      new CustomEvent('open-booking-modal', {
        detail: { treatmentSlug: 'emergency-dental-care' },
      })
    );
  };

  return (
    <section className="relative py-16 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border-y border-rose-500/20 text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-navy-900/90 to-navy-950/90 border border-rose-500/30 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left content */}
          <div className="space-y-4 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-bold tracking-wider uppercase">
              <Flame className="w-4 h-4 text-rose-400" />
              URGENT DENTAL CARE • KAZIPET & HANAMKONDA
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
              Experiencing Severe Dental Pain?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Don&apos;t wait in pain. Whether you are suffering from acute toothache, a broken tooth, sudden swelling, or dental trauma, our clinic provides priority emergency support. Contact our clinical team immediately.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 w-full lg:w-auto shrink-0">
            {/* Call Now */}
            <a
              href="tel:+919876543210"
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Emergency Line</span>
            </a>

            {/* WhatsApp */}
            <a
              href={getWhatsAppLink({ isEmergency: true })}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Doctor</span>
            </a>

            {/* Book Rapid Consultation */}
            <button
              onClick={openBookingModal}
              className="px-5 py-4 rounded-2xl bg-navy-800 hover:bg-navy-700 text-slate-200 border border-white/20 font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-aqua-400" />
              <span>Priority Booking</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
