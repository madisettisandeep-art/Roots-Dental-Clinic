'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, CheckCircle2, MessageSquare } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default function LocationMapSection() {
  const [status, setStatus] = useState<{ isOpen: boolean; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus({
            isOpen: data.isOpenNow,
            text: data.statusText,
          });
        }
      })
      .catch(() => {});
  }, []);

  const openBookingModal = () => {
    window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: {} }));
  };

  return (
    <section className="relative py-24 bg-navy-950 text-white overflow-hidden" id="location">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-aqua-400/30 text-aqua-300 text-xs font-bold tracking-wider uppercase mb-3">
            <MapPin className="w-3.5 h-3.5 text-aqua-400" />
            CLINIC LOCATION & CONTACT
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-display">
            Visit Roots Dental Clinic
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Conveniently located on Darga Road near NIT Warangal, Subedari, Kazipet. Ample parking and accessible facilities.
          </p>
        </div>

        {/* Map & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Contact & Hours Details */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl bg-navy-900/80 border border-white/10 backdrop-blur-xl shadow-glass space-y-6">
            <div>
              {/* Live Status Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-950 border border-white/15 text-xs font-semibold mb-6">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    status?.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
                  }`}
                />
                <span className={status?.isOpen ? 'text-emerald-300' : 'text-slate-300'}>
                  {status ? status.text : 'Open Today • Mon-Sat 9:30 AM - 8:30 PM'}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white font-display">
                ROOTS SUPER SPECIALITY DENTAL CLINIC
              </h3>

              <div className="mt-6 space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-navy-800 border border-white/10 text-aqua-400 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Clinic Address</span>
                    <span className="text-slate-300 leading-relaxed block mt-0.5">
                      Darga Road, near NIT, Revenue Colony, Subedari, Kazipet, Hanamkonda, Telangana 506004
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-navy-800 border border-white/10 text-aqua-400 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Phone Numbers</span>
                    <a
                      href="tel:+919876543210"
                      className="text-aqua-300 hover:text-white transition-colors block font-semibold"
                    >
                      +91 98765 43210 (Main Reception)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-navy-800 border border-white/10 text-emerald-400 shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">WhatsApp Front Desk</span>
                    <a
                      href={getWhatsAppLink({})}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-300 hover:text-emerald-200 transition-colors block font-semibold"
                    >
                      Chat on WhatsApp (+91 98765 43210)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-navy-800 border border-white/10 text-aqua-400 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Consultation Timings</span>
                    <span className="text-slate-300 block mt-0.5">
                      Mon – Sat: <strong>09:30 AM – 08:30 PM</strong>
                    </span>
                    <span className="text-slate-300 block">
                      Sunday: <strong>10:00 AM – 02:00 PM</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="https://maps.google.com/?q=Roots+Super+Speciality+Dental+Clinic+Darga+Road+Kazipet+Hanamkonda+506004"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-medical-blue to-cyan-500 hover:from-cyan-500 hover:to-aqua-400 text-white font-bold text-xs tracking-wider uppercase text-center transition-all flex items-center justify-center gap-2 shadow-glow-cyan"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <button
                onClick={openBookingModal}
                className="py-3 px-4 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-bold text-xs tracking-wider uppercase text-center transition-colors border border-white/15"
              >
                Book Appointment
              </button>
            </div>
          </div>

          {/* Right Column: Google Maps Embed */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-navy-900 min-h-[380px] sm:min-h-[440px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.675765038162!2d79.531238475179!3d17.994464883002636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a334f59c8888889%3A0x8888888888888888!2sRoots%20Super%20Speciality%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '440px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Roots Super Speciality Dental Clinic Darga Road Kazipet Location Map"
              className="w-full h-full grayscale contrast-125 opacity-90 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
            />

            {/* Float Landmark Pill */}
            <div className="absolute top-4 left-4 p-3 rounded-2xl bg-navy-950/90 border border-white/20 backdrop-blur-md shadow-lg text-xs space-y-0.5">
              <span className="font-bold text-white block">📍 Landmark Connectivity</span>
              <span className="text-[11px] text-aqua-300 block">
                Near NIT Warangal • Revenue Colony • Subedari
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
