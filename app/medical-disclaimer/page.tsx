import React from 'react';
import Link from 'next/link';
import { AlertTriangle, ShieldCheck, Stethoscope } from 'lucide-react';

export const metadata = {
  title: 'Medical Disclaimer | Roots Super Speciality Dental Clinic',
  description:
    'Medical and clinical disclaimer regarding dental educational content and diagnosis at Roots Dental Clinic.',
};

export default function MedicalDisclaimerPage() {
  return (
    <div className="bg-navy-950 text-white min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 bg-navy-900/60 p-8 sm:p-12 rounded-3xl border border-white/10">
        <div className="border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-bold uppercase mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            HEALTHCARE GUIDELINES
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-white">
            Medical & Clinical Disclaimer
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            Roots Super Speciality Dental Clinic • Kazipet, Hanamkonda
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm leading-relaxed">
            <strong>Important Notice:</strong> Information provided on this website is intended solely for general patient education and awareness. It is not designed to replace, and should never be used as a substitute for, professional medical advice, clinical examination, diagnosis, or treatment by a licensed dental surgeon.
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-display">1. No Doctor-Patient Relationship Established Online</h2>
            <p>
              Browsing this website, utilizing our 3D anatomical viewer, or submitting an online appointment enquiry does not by itself establish a formal doctor-patient relationship. A clinical relationship is established only upon personal consultation, clinical history evaluation, and physical examination at our clinic facility.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-display">2. Individual Clinical Variations</h2>
            <p>
              Dental conditions, bone anatomy, enamel quality, periodontal tissue health, and systemic factors vary significantly from person to person. Descriptions of root canals, implants, orthodontic aligners, or cosmetic whitening represent standard procedures; the exact protocol, duration, and outcomes depend strictly on the patient&apos;s personal clinical assessment.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-display">3. Dental Emergencies</h2>
            <p>
              If you are experiencing severe dental trauma, uncontrolled bleeding, difficulty breathing, or severe facial swelling spreading to the throat or eyes, please call our emergency hotline immediately or visit the nearest emergency medical hospital.
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-between items-center text-xs">
          <Link href="/" className="text-aqua-400 hover:text-white transition-colors font-semibold">
            ← Back to Homepage
          </Link>
          <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
            Contact Clinic →
          </Link>
        </div>
      </div>
    </div>
  );
}
