'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Camera, X, ZoomIn, ChevronRight, Sparkles } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption?: string;
}

const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: '1',
    title: 'Modern Treatment Bay & Operatory',
    category: 'CLINIC',
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
    caption: 'Ergonomic dental chair with intraoral imaging system and digital diagnostics.',
  },
  {
    id: '2',
    title: 'Digital Sterilization & Autoclave Suite',
    category: 'EQUIPMENT',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    caption: 'Multi-stage medical-grade autoclaving and vacuum sterilization protocols.',
  },
  {
    id: '3',
    title: 'Advanced Rotary Endodontics & Apex Locators',
    category: 'EQUIPMENT',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    caption: 'High-precision micro-rotary instruments for gentle root canal therapy.',
  },
  {
    id: '4',
    title: 'Comfortable Patient Reception & Lounge',
    category: 'PATIENT_EXPERIENCE',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    caption: 'Tranquil and hygienic reception lounge designed for patient comfort.',
  },
  {
    id: '5',
    title: 'Digital Smile Design & Restorative Setup',
    category: 'TREATMENTS',
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    caption: 'Advanced digital smile simulation for cosmetic veneers and clear aligners.',
  },
  {
    id: '6',
    title: 'Specialist Dental Team in Session',
    category: 'TEAM',
    imageUrl: 'https://images.unsplash.com/photo-1594824813628-482200234a91?auto=format&fit=crop&w=800&q=80',
    caption: 'Collaborative specialist consultation for complex multidisciplinary cases.',
  },
];

export default function ClinicGallery() {
  const [items, setItems] = useState<GalleryItem[]>(DEFAULT_GALLERY);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          setItems(data.items);
        }
      })
      .catch(() => {});
  }, []);

  const categories = ['ALL', 'CLINIC', 'EQUIPMENT', 'TREATMENTS', 'TEAM', 'PATIENT_EXPERIENCE'];

  const filteredItems =
    selectedCategory === 'ALL'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <section className="relative py-24 bg-navy-950 text-white overflow-hidden" id="gallery">
      {/* Background glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-aqua-400/30 text-aqua-300 text-xs font-bold tracking-wider uppercase mb-3">
            <Camera className="w-3.5 h-3.5 text-aqua-400" />
            CLINICAL ENVIRONMENT
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-display">
            The Clinic & Facilities
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Take a virtual tour of our modern, sterilized operatories and state-of-the-art dental technology on Darga Road, Kazipet.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all uppercase whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-aqua-500 text-navy-950 border-aqua-400 shadow-glow-cyan'
                  : 'bg-navy-900/60 text-slate-300 border-white/10 hover:border-white/25 hover:text-white'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Gallery Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-aqua-400/50 transition-all duration-500 hover:shadow-glow-cyan bg-navy-900"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              </div>

              {/* Hover Overlay Details */}
              <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase tracking-widest text-aqua-400 mb-1">
                  {item.category.replace('_', ' ')}
                </span>
                <h3 className="text-base font-bold text-white font-display leading-tight">
                  {item.title}
                </h3>
                {item.caption && (
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-snug">
                    {item.caption}
                  </p>
                )}
              </div>

              {/* Zoom icon badge */}
              <div className="absolute top-4 right-4 p-2.5 rounded-full bg-navy-950/80 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 text-aqua-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div
          onClick={() => setActiveLightboxItem(null)}
          className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full rounded-3xl bg-navy-900 border border-white/20 overflow-hidden shadow-2xl"
          >
            <div className="aspect-[16/10] relative w-full bg-black">
              <Image
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-6 bg-navy-950 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-aqua-400">
                  {activeLightboxItem.category.replace('_', ' ')}
                </span>
                <h3 className="text-lg font-bold text-white font-display">
                  {activeLightboxItem.title}
                </h3>
                {activeLightboxItem.caption && (
                  <p className="text-xs text-slate-300 mt-1">{activeLightboxItem.caption}</p>
                )}
              </div>

              <button
                onClick={() => setActiveLightboxItem(null)}
                className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
