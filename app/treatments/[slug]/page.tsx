import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import {
  Sparkles,
  Calendar,
  MessageSquare,
  Phone,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';
import AppointmentCTA from '@/components/home/AppointmentCTA';

interface TreatmentDetailProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: TreatmentDetailProps) {
  try {
    const treatment = await prisma.treatment.findUnique({
      where: { slug: params.slug },
    });

    if (!treatment) {
      return {
        title: 'Treatment | Roots Super Speciality Dental Clinic',
      };
    }

    return {
      title: `${treatment.name} in Hanamkonda & Kazipet | Roots Dental`,
      description: treatment.summary,
      openGraph: {
        title: `${treatment.name} | Roots Super Speciality Dental Clinic`,
        description: treatment.summary,
        images: [
          treatment.imageUrl ||
            'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&h=630&q=80',
        ],
      },
    };
  } catch {
    return {
      title: 'Treatment | Roots Super Speciality Dental Clinic',
    };
  }
}

export default async function TreatmentDetailPage({ params }: TreatmentDetailProps) {
  let treatment = null;
  try {
    treatment = await prisma.treatment.findUnique({
      where: { slug: params.slug },
    });
  } catch (err) {
    console.error('Error loading treatment:', err);
  }

  if (!treatment) {
    notFound();
  }

  const indications: string[] = JSON.parse(treatment.indications || '[]');
  const procedureSteps: Array<{ step: string; title: string; desc: string }> = JSON.parse(
    treatment.procedureSteps || '[]'
  );
  const benefits: string[] = JSON.parse(treatment.benefits || '[]');
  const faqs: Array<{ q: string; a: string }> = JSON.parse(treatment.faqs || '[]');

  const whatsAppLink = getWhatsAppLink({ treatmentName: treatment.name });

  return (
    <div className="bg-navy-950 text-white min-h-screen">
      {/* 1. Treatment Hero */}
      <div className="relative py-20 lg:py-28 bg-gradient-to-b from-navy-900 to-navy-950 border-b border-white/10 overflow-hidden">
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/treatments" className="hover:text-white transition-colors">
              Treatments
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-aqua-300 font-semibold">{treatment.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-aqua-400/30 text-aqua-300 text-xs font-bold tracking-wider uppercase">
                {treatment.category}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display leading-tight">
                {treatment.name}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                {treatment.summary}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5">
                <Link
                  href={`/book-appointment?treatment=${treatment.slug}`}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-medical-blue via-cyan-600 to-aqua-500 hover:from-cyan-600 hover:to-aqua-400 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-glow-cyan flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation</span>
                </Link>

                <a
                  href={whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Treatment Hero Image */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-navy-900">
                <Image
                  src={
                    treatment.imageUrl ||
                    'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80'
                  }
                  alt={`${treatment.name} at Roots Super Speciality Dental Clinic Kazipet`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Overview & Indications */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Detailed Clinical Description */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-4">
                Clinical Overview
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
                {treatment.description}
              </p>
            </div>

            {/* Step-by-Step Procedure */}
            {procedureSteps.length > 0 && (
              <div className="pt-6 border-t border-white/10">
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-6">
                  Step-by-Step Treatment Process
                </h3>

                <div className="space-y-4">
                  {procedureSteps.map((step) => (
                    <div
                      key={step.step}
                      className="p-5 rounded-2xl bg-navy-900/60 border border-white/10 flex items-start gap-4"
                    >
                      <span className="w-9 h-9 rounded-xl bg-aqua-500/20 text-aqua-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-aqua-400/30">
                        {step.step}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">{step.title}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recovery Guidance */}
            {treatment.recoveryInfo && (
              <div className="p-6 rounded-3xl bg-navy-900/80 border border-aqua-400/30 space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-aqua-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Recovery & Aftercare
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {treatment.recoveryInfo}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar: Indications & Benefits */}
          <div className="lg:col-span-5 space-y-6">
            {/* Symptoms / Indications */}
            {indications.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-navy-900/60 border border-white/10 backdrop-blur-xl shadow-glass space-y-4">
                <h3 className="text-lg font-bold font-display text-white">
                  When is this Recommended?
                </h3>
                <ul className="space-y-3">
                  {indications.map((ind, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-aqua-400 shrink-0 mt-0.5" />
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {benefits.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-navy-900 to-navy-950 border border-white/10 space-y-4">
                <h3 className="text-lg font-bold font-display text-white">
                  Expected Clinical Benefits
                </h3>
                <ul className="space-y-3">
                  {benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-snug">
                      <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contextual WhatsApp Card */}
            <div className="p-6 rounded-3xl bg-emerald-950/40 border border-emerald-500/30 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                Have questions about {treatment.name}?
              </h4>
              <p className="text-xs text-slate-300">
                Chat directly with our front desk on WhatsApp for immediate answers regarding pricing, procedure time, and scheduling.
              </p>
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wider uppercase text-center transition-colors shadow-lg shadow-emerald-600/20"
              >
                Chat About {treatment.name}
              </a>
            </div>
          </div>
        </div>

        {/* Treatment Specific FAQs */}
        {faqs.length > 0 && (
          <div className="mt-20 pt-16 border-t border-white/10 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold font-display text-white text-center mb-8">
              Frequently Asked Questions About {treatment.name}
            </h3>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-navy-900/60 border border-white/10 space-y-2">
                  <h4 className="text-sm sm:text-base font-bold text-white flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-aqua-400 shrink-0 mt-1" />
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 pl-6 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Medical Disclaimer Banner */}
        <div className="mt-16 p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-slate-400 text-center max-w-4xl mx-auto leading-relaxed">
          <AlertCircle className="w-4 h-4 text-aqua-400 inline mr-1.5 -mt-0.5" />
          <strong className="text-slate-300">Clinical Disclaimer:</strong> Information provided on this page is for educational guidance only and does not replace in-person dental examination or clinical diagnosis. Your dentist will recommend the appropriate treatment tailored to your oral condition.
        </div>
      </div>

      <AppointmentCTA />
    </div>
  );
}
