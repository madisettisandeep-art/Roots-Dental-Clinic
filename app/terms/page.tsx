import React from 'react';
import Link from 'next/link';
import { FileText, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Terms of Use | Roots Super Speciality Dental Clinic',
  description:
    'Terms and conditions for using the Roots Super Speciality Dental Clinic website and booking system.',
};

export default function TermsPage() {
  return (
    <div className="bg-navy-950 text-white min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 bg-navy-900/60 p-8 sm:p-12 rounded-3xl border border-white/10">
        <div className="border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800 border border-aqua-400/30 text-aqua-300 text-xs font-bold uppercase mb-3">
            <FileText className="w-3.5 h-3.5" />
            TERMS & CONDITIONS
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-white">
            Terms of Use
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            Last Updated: September 2026 • Roots Super Speciality Dental Clinic
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-display">1. Website Purpose & Scope</h2>
            <p>
              This website provides general educational information regarding dental services offered at Roots Super Speciality Dental Clinic (Kazipet, Hanamkonda), as well as convenient online appointment scheduling and direct communication channels.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-display">2. Appointment Scheduling & Confirmations</h2>
            <p>
              Submitting an online appointment request reserves a preferred time slot subject to clinic confirmation. Our front desk will verify the time slot with you via WhatsApp, phone call, or email. While we strive to adhere strictly to appointment times, emergency clinical procedures may occasionally cause minor schedule adjustments.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-display">3. Medical Advice & Examination</h2>
            <p>
              No content published on this website constitutes a personalized dental diagnosis or treatment recommendation. All treatments must be preceded by an in-person physical clinical examination and diagnostic radiographic evaluation by our licensed dental surgeons.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-display">4. Intellectual Property</h2>
            <p>
              All branding, logos, 3D anatomical models, and educational written content are the intellectual property of Roots Super Speciality Dental Clinic.
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-between items-center text-xs">
          <Link href="/" className="text-aqua-400 hover:text-white transition-colors font-semibold">
            ← Back to Homepage
          </Link>
          <Link href="/medical-disclaimer" className="text-slate-400 hover:text-white transition-colors">
            Medical Disclaimer →
          </Link>
        </div>
      </div>
    </div>
  );
}
