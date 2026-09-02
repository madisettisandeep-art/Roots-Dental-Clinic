'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShieldAlert,
  Activity,
  Smile,
  AlignJustify,
  ZapOff,
  Scissors,
  HeartHandshake,
  Flame,
  ArrowRight,
  Calendar,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldAlert: ShieldAlert,
  Sparkles: Sparkles,
  Activity: Activity,
  Smile: Smile,
  AlignJustify: AlignJustify,
  ZapOff: ZapOff,
  Scissors: Scissors,
  HeartHandshake: HeartHandshake,
  Flame: Flame,
};

interface TreatmentItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  summary: string;
  iconName: string;
  imageUrl?: string;
  featured?: boolean;
}

const DEFAULT_TREATMENTS: TreatmentItem[] = [
  {
    id: '1',
    slug: 'root-canal',
    name: 'Root Canal Treatment',
    category: 'Endodontics',
    summary: 'Precision-focused treatment for infected or damaged teeth to relieve pain and preserve your natural tooth.',
    iconName: 'ShieldAlert',
    featured: true,
  },
  {
    id: '2',
    slug: 'dental-implants',
    name: 'Dental Implants',
    category: 'Implantology',
    summary: 'Modern, permanent tooth-replacement solutions that look, feel, and function just like natural teeth.',
    iconName: 'Sparkles',
    featured: true,
  },
  {
    id: '3',
    slug: 'teeth-cleaning',
    name: 'Teeth Cleaning & Scaling',
    category: 'Preventive Care',
    summary: 'Professional oral hygiene, ultrasonic tartar removal, and comprehensive preventive periodontal care.',
    iconName: 'Activity',
    featured: true,
  },
  {
    id: '4',
    slug: 'teeth-whitening',
    name: 'Teeth Whitening',
    category: 'Cosmetic Dentistry',
    summary: 'Clinical cosmetic treatment for a brighter, radiant smile using safe, enamel-friendly formulations.',
    iconName: 'Smile',
    featured: true,
  },
  {
    id: '5',
    slug: 'braces',
    name: 'Braces & Orthodontics',
    category: 'Orthodontics',
    summary: 'Comprehensive tooth alignment and bite correction solutions including metal, ceramic braces, and clear aligners.',
    iconName: 'AlignJustify',
    featured: true,
  },
  {
    id: '6',
    slug: 'wisdom-tooth-removal',
    name: 'Wisdom Tooth Removal',
    category: 'Oral Surgery',
    summary: 'Precision evaluation and gentle surgical removal for impacted or painful third molars.',
    iconName: 'ZapOff',
    featured: false,
  },
  {
    id: '7',
    slug: 'tooth-extraction',
    name: 'Tooth Extraction',
    category: 'Oral Surgery',
    summary: 'Atraumatic, gentle tooth removal when preservation is not clinically viable, with immediate socket care.',
    iconName: 'Scissors',
    featured: false,
  },
  {
    id: '8',
    slug: 'pediatric-dentistry',
    name: 'Pediatric Dentistry',
    category: 'Pedodontics',
    summary: 'Gentle, child-friendly oral care, preventive sealants, fluoride treatments, and habit counseling.',
    iconName: 'HeartHandshake',
    featured: true,
  },
  {
    id: '9',
    slug: 'cosmetic-dentistry',
    name: 'Cosmetic Dentistry',
    category: 'Cosmetic Care',
    summary: 'Smile makeovers, porcelain veneers, composite bonding, and aesthetic smile contouring.',
    iconName: 'Sparkles',
    featured: false,
  },
  {
    id: '10',
    slug: 'emergency-dental-care',
    name: 'Emergency Dental Care',
    category: 'Emergency Care',
    summary: 'Prompt clinical support for acute tooth pain, dental trauma, knocked-out teeth, and facial swelling.',
    iconName: 'Flame',
    featured: true,
  },
];

export default function TreatmentsExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Endodontics', 'Implantology', 'Preventive Care', 'Cosmetic Dentistry', 'Orthodontics', 'Oral Surgery', 'Pedodontics', 'Emergency Care'];

  const filteredTreatments =
    selectedCategory === 'ALL'
      ? DEFAULT_TREATMENTS
      : DEFAULT_TREATMENTS.filter((t) => t.category === selectedCategory || (selectedCategory === 'Cosmetic Dentistry' && t.category === 'Cosmetic Care'));

  const openBookingForTreatment = (slug: string) => {
    window.dispatchEvent(
      new CustomEvent('open-booking-modal', { detail: { treatmentSlug: slug } })
    );
  };

  return (
    <section className="relative py-24 bg-navy-950 text-white overflow-hidden" id="treatments">
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-aqua-400/30 text-aqua-300 text-xs font-bold tracking-wider uppercase mb-3">
              SPECIALISED CLINICAL SERVICES
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-display">
              Comprehensive Dental Treatments
            </h2>
            <p className="mt-3 text-slate-300 text-base max-w-2xl">
              From advanced root canal therapy to permanent dental implants and clear aligners, explore our complete suite of specialized clinical services in Kazipet.
            </p>
          </div>

          <Link
            href="/treatments"
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 border border-white/10 transition-colors shrink-0 self-start md:self-auto"
          >
            <span>All Services</span>
            <ArrowRight className="w-3.5 h-3.5 text-aqua-300" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-aqua-500 text-navy-950 border-aqua-400 shadow-glow-cyan'
                  : 'bg-navy-900/60 text-slate-300 border-white/10 hover:border-white/25 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTreatments.map((t) => {
            const IconComponent = ICON_MAP[t.iconName] || Sparkles;
            return (
              <div
                key={t.id}
                className="p-6 rounded-3xl bg-navy-900/60 border border-white/10 hover:border-aqua-400/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-glow-blue hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-navy-800 to-navy-950 border border-aqua-400/30 flex items-center justify-center text-aqua-300 group-hover:scale-110 group-hover:border-aqua-400 transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-aqua-400 px-3 py-1 rounded-full bg-navy-950 border border-white/10">
                      {t.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-aqua-300 transition-colors font-display">
                      {t.name}
                    </h3>
                    <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                      {t.summary}
                    </p>
                  </div>
                </div>

                {/* Card CTAs */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-3">
                  <Link
                    href={`/treatments/${t.slug}`}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white text-xs font-semibold tracking-wider uppercase text-center transition-colors flex items-center justify-center gap-1 group/btn border border-white/10"
                  >
                    <span>Explore</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>

                  <button
                    onClick={() => openBookingForTreatment(t.slug)}
                    className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-medical-blue to-cyan-500 hover:from-cyan-500 hover:to-aqua-400 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-glow-cyan"
                  >
                    Book
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
