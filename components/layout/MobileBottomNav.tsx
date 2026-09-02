'use client';

import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default function MobileBottomNav() {
  const openBookingModal = () => {
    window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: {} }));
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-navy-950/95 backdrop-blur-2xl border-t border-white/15 px-3 py-2 shadow-2xl safe-bottom">
      <div className="grid grid-cols-3 gap-2">
        {/* Call Now Button */}
        <a
          href="tel:+919876543210"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-navy-800/80 border border-white/10 text-slate-200 active:bg-navy-700 transition-colors"
        >
          <Phone className="w-4 h-4 text-cyan-400 mb-0.5" />
          <span className="text-[11px] font-bold tracking-wide uppercase">Call Now</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={getWhatsAppLink({})}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 active:bg-emerald-600/50 transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span className="text-[11px] font-bold tracking-wide uppercase">WhatsApp</span>
        </a>

        {/* Book Appointment CTA */}
        <button
          onClick={openBookingModal}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-medical-blue to-cyan-500 text-white font-bold shadow-glow-cyan active:opacity-90 transition-opacity"
        >
          <Calendar className="w-4 h-4 text-white mb-0.5" />
          <span className="text-[11px] font-bold tracking-wide uppercase">Book Now</span>
        </button>
      </div>
    </div>
  );
}
