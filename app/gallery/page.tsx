import React from 'react';
import ClinicGallery from '@/components/home/ClinicGallery';
import AppointmentCTA from '@/components/home/AppointmentCTA';

export const metadata = {
  title: 'Clinic & Equipment Gallery | Roots Super Speciality Dental Clinic',
  description:
    'Take a photo tour of Roots Super Speciality Dental Clinic in Kazipet, Hanamkonda. Modern operatories, sterilization unit, and digital dental technology.',
};

export default function GalleryPage() {
  return (
    <div className="bg-navy-950 text-white min-h-screen">
      <div className="relative py-20 bg-gradient-to-b from-navy-900 to-navy-950 border-b border-white/10 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-aqua-400/30 text-aqua-300 text-xs font-bold tracking-wider uppercase mb-4">
            FACILITIES & TECHNOLOGY
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display max-w-3xl mx-auto">
            Our Clinic Gallery
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Explore our state-of-the-art sterilization suite, modern treatment operatories, and advanced dental technology in Kazipet.
          </p>
        </div>
      </div>

      <ClinicGallery />
      <AppointmentCTA />
    </div>
  );
}
