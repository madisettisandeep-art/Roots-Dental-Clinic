'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip 3 seconds after page loads
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-20 md:bottom-8 right-5 z-40 flex items-center gap-3">
      {/* Desktop Helper Tooltip */}
      {showTooltip && (
        <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-navy-900/95 border border-emerald-500/30 text-white text-xs shadow-2xl backdrop-blur-md animate-bounce duration-1000">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Need help choosing a treatment?</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white ml-1"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Badge */}
      <a
        href={getWhatsAppLink({})}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group p-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
        aria-label="Chat with Roots Super Speciality Dental Clinic on WhatsApp"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />
        <MessageSquare className="w-6 h-6 fill-current relative z-10" />
      </a>
    </div>
  );
}
