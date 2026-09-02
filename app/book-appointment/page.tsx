'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calendar, Phone, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';

function BookAppointmentContent() {
  const searchParams = useSearchParams();
  const treatmentParam = searchParams.get('treatment');

  useEffect(() => {
    // Automatically trigger booking modal
    window.dispatchEvent(
      new CustomEvent('open-booking-modal', {
        detail: { treatmentSlug: treatmentParam },
      })
    );
  }, [treatmentParam]);

  const handleOpenModal = () => {
    window.dispatchEvent(
      new CustomEvent('open-booking-modal', {
        detail: { treatmentSlug: treatmentParam },
      })
    );
  };

  return (
    <div className="max-w-2xl w-full p-8 sm:p-12 rounded-3xl bg-navy-900/80 border border-aqua-400/30 backdrop-blur-2xl shadow-2xl text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-medical-blue mx-auto flex items-center justify-center shadow-glow-cyan">
        <Calendar className="w-8 h-8 text-white" />
      </div>

      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-950 border border-aqua-400/30 text-aqua-300 text-xs font-bold tracking-wider uppercase">
        <Sparkles className="w-3.5 h-3.5" />
        ONLINE APPOINTMENT DESK
      </div>

      <h1 className="text-3xl sm:text-4xl font-black font-display text-white">
        Book Your Dental Consultation
      </h1>

      <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
        Select your required treatment, preferred specialist, date, and convenient time slot in our interactive 6-step booking engine.
      </p>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
        <button
          onClick={handleOpenModal}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-medical-blue via-cyan-600 to-aqua-500 hover:from-cyan-600 hover:to-aqua-400 text-white font-bold text-xs tracking-wider uppercase shadow-glow-cyan transition-all flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          <span>Open Booking System</span>
        </button>

        <a
          href={getWhatsAppLink({})}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>Book via WhatsApp</span>
        </a>
      </div>

      <div className="pt-6 border-t border-white/10 flex items-center justify-center gap-4 text-xs text-slate-400">
        <span className="flex items-center gap-1 text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          No Booking Fees
        </span>
        <span>•</span>
        <span>Instant Slot Reservation</span>
      </div>
    </div>
  );
}

export default function BookAppointmentPage() {
  return (
    <div className="bg-navy-950 text-white min-h-[85vh] flex items-center justify-center py-20 px-4">
      <Suspense fallback={
        <div className="p-12 text-center text-slate-400 text-xs">Loading booking desk...</div>
      }>
        <BookAppointmentContent />
      </Suspense>
    </div>
  );
}
