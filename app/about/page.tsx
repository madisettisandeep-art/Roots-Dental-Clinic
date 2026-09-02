import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  Sparkles,
  Heart,
  Activity,
  Microscope,
  Stethoscope,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import AppointmentCTA from '@/components/home/AppointmentCTA';

export const metadata = {
  title: 'About Our Clinic | Roots Super Speciality Dental Clinic',
  description:
    'Learn about Roots Super Speciality Dental Clinic in Kazipet, Hanamkonda. Our commitment to advanced microscopic endodontics, patient comfort, and digital dentistry.',
};

export default function AboutPage() {
  const pillars = [
    {
      title: 'Microscopic & Rotary Precision',
      desc: 'We use high-precision rotary instruments and digital apex locators to treat root canal infections with millimeter accuracy, saving natural teeth from unnecessary extraction.',
      icon: Microscope,
    },
    {
      title: 'Class-B Medical Sterilization',
      desc: 'Patient safety is non-negotiable. Every instrument undergoes multi-stage ultrasonic cleaning and vacuum autoclave sterilization adhering strictly to international clinical hygiene protocols.',
      icon: ShieldCheck,
    },
    {
      title: 'Gentle, Anxiety-Free Dentistry',
      desc: 'We recognize dental anxiety and prioritize comfortable, relaxed treatment sessions with clear communication and gentle local anesthesia protocols.',
      icon: Heart,
    },
    {
      title: 'Transparent & Honest Guidance',
      desc: 'We believe in clinical integrity. Our doctors explain findings clearly using digital X-rays and only recommend necessary, evidence-based treatments with upfront pricing.',
      icon: Award,
    },
  ];

  return (
    <div className="bg-navy-950 text-white min-h-screen">
      {/* Hero Header */}
      <div className="relative py-20 lg:py-28 bg-gradient-to-b from-navy-900 to-navy-950 border-b border-white/10 overflow-hidden">
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-aqua-400/30 text-aqua-300 text-xs font-bold tracking-wider uppercase mb-4">
            ABOUT ROOTS DENTAL CLINIC
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display max-w-3xl mx-auto">
            Advanced Dentistry Built on Trust & Precision
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Providing specialized, compassionate dental care on Darga Road, near NIT Kazipet for families across Hanamkonda and Warangal.
          </p>
        </div>
      </div>

      {/* Main Story & Philosophy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
              A Modern Approach to Family & Speciality Dental Care
            </h2>

            <p className="text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
              At <strong className="text-white">Roots Super Speciality Dental Clinic</strong>, our goal is simple: deliver high-standard dental healthcare that pairs modern technology with genuine empathy and clinical precision.
            </p>

            <p className="text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
              Whether preserving an infected tooth through microscopic endodontics, restoring missing teeth with titanium dental implants, or aligning smiles with clear aligners, we take the time to explain your options thoroughly so you feel confident and comfortable in every clinical decision.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-white/10 text-xs">
              <div className="p-4 rounded-2xl bg-navy-900/80 border border-white/10">
                <span className="text-2xl font-black text-aqua-400 block font-display">5.0 ★</span>
                <span className="text-slate-300 font-semibold mt-1 block">Google Rating</span>
                <span className="text-slate-400 text-[11px]">66+ Verified Patient Reviews</span>
              </div>
              <div className="p-4 rounded-2xl bg-navy-900/80 border border-white/10">
                <span className="text-2xl font-black text-cyan-400 block font-display">Kazipet</span>
                <span className="text-slate-300 font-semibold mt-1 block">Prime Location</span>
                <span className="text-slate-400 text-[11px]">Darga Road, near NIT</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80"
                alt="Roots Dental Clinic sterilization setup and operatory"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* 4 Clinical Pillars */}
        <div className="mt-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Our Core Clinical Standards
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              The four guiding principles behind every procedure at Roots Super Speciality Dental Clinic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="p-6 rounded-3xl bg-navy-900/60 border border-white/10 hover:border-aqua-400/40 transition-all hover:shadow-glass-dark"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-navy-800 to-navy-950 border border-aqua-400/30 flex items-center justify-center text-aqua-300 mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 font-display">{p.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AppointmentCTA />
    </div>
  );
}
