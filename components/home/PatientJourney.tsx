'use client';

import React from 'react';
import { Calendar, UserCheck, Stethoscope, FileSpreadsheet, Sparkles, Smile, ArrowRight } from 'lucide-react';

export default function PatientJourney() {
  const steps = [
    {
      num: '01',
      title: 'BOOK',
      subtitle: 'Schedule Online',
      desc: 'Pick your preferred date, time slot, and specialist in under 60 seconds.',
      icon: Calendar,
    },
    {
      num: '02',
      title: 'CONSULT',
      subtitle: 'Clinical Welcome',
      desc: 'Meet our dental surgeons for a thorough, relaxed discussion of your oral health.',
      icon: UserCheck,
    },
    {
      num: '03',
      title: 'DIAGNOSE',
      subtitle: 'Digital Imaging',
      desc: 'High-definition digital assessment to accurately pinpoint issues.',
      icon: Stethoscope,
    },
    {
      num: '04',
      title: 'PLAN',
      subtitle: 'Personalized Roadmap',
      desc: 'Clear options, estimated timeline, and transparent pricing with no surprises.',
      icon: FileSpreadsheet,
    },
    {
      num: '05',
      title: 'TREAT',
      subtitle: 'Gentle Precision',
      desc: 'Comfort-focused care using advanced rotary systems and sterilized equipment.',
      icon: Sparkles,
    },
    {
      num: '06',
      title: 'SMILE',
      subtitle: 'Lasting Health',
      desc: 'Walk out with confidence, lasting relief, and personalized aftercare guidance.',
      icon: Smile,
    },
  ];

  return (
    <section className="relative py-24 bg-navy-950 text-white overflow-hidden" id="journey">
      {/* Background line glow */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent blur-md pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-aqua-400/30 text-aqua-300 text-xs font-bold tracking-wider uppercase mb-3">
            YOUR CLINICAL PATHWAY
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-display">
            The Patient Journey
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            A transparent, organized, and gentle 6-step dental care experience from booking to healthy smile.
          </p>
        </div>

        {/* Timeline Desktop Grid & Mobile Scroll */}
        <div className="relative">
          {/* Glowing Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 -translate-y-8 h-0.5 bg-gradient-to-r from-medical-blue via-aqua-400 to-cyan-500 opacity-30 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="p-6 rounded-3xl bg-navy-900/80 border border-white/10 hover:border-aqua-400/50 transition-all duration-300 flex flex-col justify-between group hover:shadow-glow-cyan hover:-translate-y-1 relative"
                >
                  <div>
                    {/* Top Step Number & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-800 to-navy-950 border border-aqua-400/30 flex items-center justify-center text-aqua-300 group-hover:bg-aqua-500 group-hover:text-navy-950 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-black text-slate-500 group-hover:text-aqua-400 transition-colors">
                        {step.num}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white font-display tracking-wider">
                      {step.title}
                    </h3>
                    <h4 className="text-xs font-semibold text-aqua-300 mt-0.5">
                      {step.subtitle}
                    </h4>
                  </div>

                  <p className="text-[11px] text-slate-300 mt-3 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() =>
              window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: {} }))
            }
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-medical-blue via-cyan-600 to-aqua-500 hover:from-cyan-600 hover:to-aqua-400 text-white font-bold text-xs tracking-wider uppercase shadow-glow-cyan transition-all"
          >
            <span>Begin Step 01 • Book Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
