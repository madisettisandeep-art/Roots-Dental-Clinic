import React from 'react';
import TreatmentsExplorer from '@/components/home/TreatmentsExplorer';
import AppointmentCTA from '@/components/home/AppointmentCTA';

export const metadata = {
  title: 'Specialised Dental Treatments | Roots Super Speciality Dental Clinic',
  description:
    'Explore 10 specialized dental services at Roots Super Speciality Dental Clinic in Kazipet, Hanamkonda: Root Canal, Implants, Braces, Teeth Whitening & Cleaning.',
};

export default function TreatmentsPage() {
  return (
    <div className="bg-navy-950 text-white min-h-screen">
      {/* Header */}
      <div className="relative py-20 bg-gradient-to-b from-navy-900 to-navy-950 border-b border-white/10 overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-aqua-400/30 text-aqua-300 text-xs font-bold tracking-wider uppercase mb-4">
            CLINICAL SPECIALITIES
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display max-w-3xl mx-auto">
            Our Dental Treatments
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Precision endodontics, permanent dental implants, orthodontics, and restorative oral care tailored to your individual dental needs in Kazipet.
          </p>
        </div>
      </div>

      <TreatmentsExplorer />
      <AppointmentCTA />
    </div>
  );
}
