'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Sparkles, MoveHorizontal, AlertCircle } from 'lucide-react';

interface BeforeAfterItem {
  id: string;
  title: string;
  treatmentCategory: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

const SAMPLE_CASES: BeforeAfterItem[] = [
  {
    id: '1',
    title: 'Clinical Enamel Brightening & Stain Removal',
    treatmentCategory: 'Teeth Whitening',
    beforeImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=80',
    description: 'In-office clinical teeth whitening lifting deep intrinsic coffee stains in a single comfortable session.',
  },
  {
    id: '2',
    title: 'Aesthetic Composite Edge Recontouring',
    treatmentCategory: 'Cosmetic Dentistry',
    beforeImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
    description: 'Conservative aesthetic bonding restoring a chipped anterior incisor edge with lifelike optical translucency.',
  },
];

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentCase = SAMPLE_CASES[activeCaseIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white overflow-hidden" id="before-after">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[400px] bg-medical-blue/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-aqua-400/30 text-aqua-300 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-aqua-400" />
            CLINICAL RESTORATIONS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-display">
            Smile Transformations
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Drag the interactive slider to view clinical results and smile enhancements delivered with precision care.
          </p>
        </div>

        {/* Case Switcher Tabs */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {SAMPLE_CASES.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveCaseIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold tracking-wide uppercase transition-all border ${
                activeCaseIndex === idx
                  ? 'bg-aqua-500 text-navy-950 border-aqua-400 shadow-glow-cyan'
                  : 'bg-navy-900/60 text-slate-300 border-white/10 hover:border-white/25 hover:text-white'
              }`}
            >
              {c.treatmentCategory}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Slider */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden select-none cursor-ew-resize border border-white/20 shadow-2xl bg-navy-950"
          >
            {/* After Image (Full Base) */}
            <div className="absolute inset-0">
              <Image
                src={currentCase.afterImage}
                alt={`After Treatment - ${currentCase.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
              <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-xl bg-emerald-500/90 text-navy-950 font-extrabold text-xs tracking-wider uppercase backdrop-blur-md shadow-lg">
                After Treatment
              </div>
            </div>

            {/* Before Image (Clipped with polygon) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <Image
                src={currentCase.beforeImage}
                alt={`Before Treatment - ${currentCase.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-xl bg-navy-950/90 text-slate-200 border border-white/20 font-extrabold text-xs tracking-wider uppercase backdrop-blur-md shadow-lg">
                Before Treatment
              </div>
            </div>

            {/* Draggable Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,180,216,0.8)] flex items-center justify-center -ml-0.5"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-10 h-10 rounded-full bg-navy-900 border-2 border-white shadow-2xl flex items-center justify-center text-aqua-400">
                <MoveHorizontal className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Case Description & Clinical Disclaimer */}
          <div className="mt-6 p-6 rounded-3xl bg-navy-900/60 border border-white/10 backdrop-blur-md space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-white font-display">
                {currentCase.title}
              </h3>
              <span className="text-xs font-semibold text-aqua-300 px-3 py-1 rounded-full bg-navy-950 border border-white/10 self-start">
                {currentCase.treatmentCategory}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentCase.description}
            </p>

            <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-aqua-400 shrink-0" />
              <span>
                Clinical results vary depending on individual oral conditions and enamel structure. All clinical imagery published with appropriate consent.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
