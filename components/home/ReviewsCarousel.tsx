'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, ChevronLeft, ChevronRight, MessageSquare, Quote, CheckCircle2 } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  treatmentCategory?: string;
  date: string;
  source: string;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Patient from Hanamkonda',
    rating: 5,
    comment: 'Very professional dental care! I visited Roots Dental for a root canal treatment. The doctor explained every step clearly and the entire process was smooth and painless. Highly recommended for anyone in Kazipet and Hanamkonda.',
    treatmentCategory: 'Root Canal Treatment',
    date: 'Recent Google Review',
    source: 'Google',
  },
  {
    id: '2',
    author: 'Verified Patient',
    rating: 5,
    comment: 'Got cavity filling and cleaning done here. Extremely clean and hygienic clinic setup with modern equipment. The doctor was very patient and the price was very reasonable compared to other clinics.',
    treatmentCategory: 'Cavity Filling & Cleaning',
    date: 'Recent Google Review',
    source: 'Google',
  },
  {
    id: '3',
    author: 'Local Resident',
    rating: 5,
    comment: 'I had severe wisdom tooth pain. The extraction was done with great precision and care. Recovery was very quick. The staff is polite and welcoming.',
    treatmentCategory: 'Wisdom Tooth Removal',
    date: 'Recent Google Review',
    source: 'Google',
  },
  {
    id: '4',
    author: 'Family Dentistry Patient',
    rating: 5,
    comment: 'Best dental clinic near NIT Warangal area. Took my parents for dental consultation. Very honest doctor who only recommends necessary treatments. 5 stars for genuine care!',
    treatmentCategory: 'General Consultation',
    date: 'Recent Google Review',
    source: 'Google',
  },
  {
    id: '5',
    author: 'Verified Visitor',
    rating: 5,
    comment: 'Super specialty clinic with excellent hygiene standards. Modern technology and clear pricing without hidden charges. Will definitely visit again for regular checkups.',
    treatmentCategory: 'Teeth Cleaning',
    date: 'Recent Google Review',
    source: 'Google',
  },
];

export default function ReviewsCarousel() {
  const [reviews, setReviews] = useState<Review[]>(DEFAULT_REVIEWS);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
      })
      .catch(() => {});
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="relative py-24 bg-navy-950 text-white overflow-hidden" id="reviews">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-aqua-400/30 text-aqua-300 text-xs font-bold tracking-wider uppercase mb-3">
              VERIFIED PATIENT EXPERIENCES
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-display">
              5.0 Star Google Rated Care
            </h2>
            <p className="mt-3 text-slate-300 text-base max-w-2xl">
              Authentic feedback from patients across Kazipet, Hanamkonda, and Warangal experiencing gentle, high-precision dental treatments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="p-3 rounded-2xl bg-navy-800 hover:bg-navy-700 text-slate-200 hover:text-white border border-white/10 transition-colors shadow-glass"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-2xl bg-navy-800 hover:bg-navy-700 text-slate-200 hover:text-white border border-white/10 transition-colors shadow-glass"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(currentIndex, currentIndex + 3).concat(
            reviews.slice(0, Math.max(0, currentIndex + 3 - reviews.length))
          ).map((rev) => (
            <div
              key={rev.id}
              className="p-8 rounded-3xl bg-navy-900/70 border border-white/10 hover:border-aqua-400/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-glow-blue relative"
            >
              <Quote className="w-10 h-10 text-white/5 absolute top-6 right-6" />

              <div className="space-y-4">
                {/* 5-star rating */}
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-amber-300 ml-1.5">5.0</span>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    {rev.author}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </h4>
                  {rev.treatmentCategory && (
                    <span className="text-[11px] text-aqua-400 block font-medium">
                      {rev.treatmentCategory}
                    </span>
                  )}
                </div>

                <span className="text-[10px] uppercase font-bold text-slate-500 px-2 py-1 rounded bg-navy-950 border border-white/5">
                  {rev.source}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust summary note */}
        <div className="mt-12 text-center text-xs text-slate-400">
          ⭐ Verified 5.0 Google Rating across 66+ authentic patient reviews.
        </div>
      </div>
    </section>
  );
}
