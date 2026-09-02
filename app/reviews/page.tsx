import React from 'react';
import ReviewsCarousel from '@/components/home/ReviewsCarousel';
import AppointmentCTA from '@/components/home/AppointmentCTA';
import { Star, CheckCircle2, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Patient Reviews & 5.0 Google Ratings | Roots Super Speciality Dental Clinic',
  description:
    'Read genuine verified patient reviews for Roots Super Speciality Dental Clinic in Kazipet, Hanamkonda. 5.0 Star Google Rating across 66+ reviews.',
};

export default function ReviewsPage() {
  return (
    <div className="bg-navy-950 text-white min-h-screen">
      <div className="relative py-20 bg-gradient-to-b from-navy-900 to-navy-950 border-b border-white/10 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-aqua-400/30 text-aqua-300 text-xs font-bold tracking-wider uppercase mb-4">
            PATIENT TRUST
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display max-w-3xl mx-auto">
            Patient Stories & Ratings
          </h1>
          <div className="mt-4 flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
            <span className="text-lg font-bold text-white ml-2">5.0 / 5.0 on Google</span>
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Based on 66+ authentic, verified patient reviews across Hanamkonda & Kazipet.
          </p>
        </div>
      </div>

      <ReviewsCarousel />
      <AppointmentCTA />
    </div>
  );
}
