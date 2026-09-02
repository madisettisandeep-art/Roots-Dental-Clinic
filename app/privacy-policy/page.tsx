import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Roots Super Speciality Dental Clinic',
  description:
    'Privacy Policy of Roots Super Speciality Dental Clinic Kazipet regarding patient information, booking data, and communication.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-navy-950 text-white min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 bg-navy-900/60 p-8 sm:p-12 rounded-3xl border border-white/10">
        <div className="border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800 border border-aqua-400/30 text-aqua-300 text-xs font-bold uppercase mb-3">
            <Lock className="w-3.5 h-3.5" />
            PATIENT PRIVACY
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-white">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            Last Updated: September 2026 • Roots Super Speciality Dental Clinic
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-display">1. Information We Collect</h2>
            <p>
              When you book an appointment, submit an enquiry, or contact us through WhatsApp on the Roots Super Speciality Dental Clinic website, we collect only necessary details to facilitate your consultation:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li>Full Name</li>
              <li>Mobile Phone Number</li>
              <li>Email Address (optional)</li>
              <li>Selected Dental Treatment & Doctor Preference</li>
              <li>Dental Concerns or Symptoms described by you</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-display">2. How We Use Your Data</h2>
            <p>
              Your contact information is strictly utilized for clinic administration, appointment confirmations, consultation scheduling, WhatsApp reminders, and providing post-treatment care guidelines. We do not sell, lease, or monetize patient data to any third-party marketing entities.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-display">3. Medical Confidentiality & Security</h2>
            <p>
              All clinical records, radiographs, and personal health details are maintained securely in accordance with medical ethics and confidentiality guidelines. Access to patient management systems is restricted to authorized clinic personnel only.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-display">4. Clinical Photography & Consent</h2>
            <p>
              Any before & after clinical photography featured on our website is published only with the explicit consent of the patient and anonymized where required to safeguard patient privacy.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-display">5. Contact Our Privacy Officer</h2>
            <p>
              If you have any questions regarding your personal data or wish to update your records, please contact our clinic administration at:
            </p>
            <p className="text-aqua-300 font-semibold">
              Roots Super Speciality Dental Clinic<br />
              Darga Road, near NIT, Revenue Colony, Subedari, Kazipet, Hanamkonda, Telangana 506004<br />
              Email: contact@rootsdental.com • Phone: +91 98765 43210
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-between items-center text-xs">
          <Link href="/" className="text-aqua-400 hover:text-white transition-colors font-semibold">
            ← Back to Homepage
          </Link>
          <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
            Terms of Use →
          </Link>
        </div>
      </div>
    </div>
  );
}
