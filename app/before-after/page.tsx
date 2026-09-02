import React from 'react';
import BeforeAfterSlider from '@/components/home/BeforeAfterSlider';
import AppointmentCTA from '@/components/home/AppointmentCTA';

export const metadata = {
  title: 'Smile Transformations & Before/After | Roots Super Speciality Dental Clinic',
  description:
    'Explore smile restorations, teeth whitening, and cosmetic bonding transformations at Roots Super Speciality Dental Clinic Kazipet.',
};

export default function BeforeAfterPage() {
  return (
    <div className="bg-navy-950 text-white min-h-screen">
      <div className="relative py-20 bg-gradient-to-b from-navy-900 to-navy-950 border-b border-white/10 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-aqua-400/30 text-aqua-300 text-xs font-bold tracking-wider uppercase mb-4">
            CLINICAL EXCELLENCE
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display max-w-3xl mx-auto">
            Smile Transformations
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Real patient smile enhancements achieved with conservative, high-precision aesthetic and restorative dentistry.
          </p>
        </div>
      </div>

      <BeforeAfterSlider />
      <AppointmentCTA />
    </div>
  );
}
