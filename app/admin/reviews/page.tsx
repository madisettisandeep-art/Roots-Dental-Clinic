'use client';

import React, { useState, useEffect } from 'react';
import { Star, Plus, CheckCircle2, Trash2, X } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  treatmentCategory?: string;
  date: string;
  source: string;
}

export default function ReviewsAdminPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newAuthor, setNewAuthor] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newCategory, setNewCategory] = useState('Root Canal Treatment');
  const [newRating, setNewRating] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      if (data.reviews) setReviews(data.reviews);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: newAuthor,
          comment: newComment,
          treatmentCategory: newCategory,
          rating: newRating,
          source: 'Google',
        }),
      });

      if (res.ok) {
        setStatusMsg('Review added successfully!');
        setShowModal(false);
        setNewAuthor('');
        setNewComment('');
        fetchReviews();
        setTimeout(() => setStatusMsg(''), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Reviews & Testimonials CMS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage verified patient reviews displayed on the website.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-medical-blue to-cyan-500 hover:from-cyan-500 hover:to-aqua-400 text-white font-bold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-glow-cyan transition-all self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add Review</span>
        </button>
      </div>

      {statusMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="p-6 rounded-3xl bg-navy-900/80 border border-white/10 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase px-2 py-0.5 rounded bg-navy-950">
                  {r.source}
                </span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed italic">
                &ldquo;{r.comment}&rdquo;
              </p>
            </div>

            <div className="pt-3 border-t border-white/10">
              <h4 className="text-xs font-bold text-white">{r.author}</h4>
              <span className="text-[11px] text-aqua-400 font-medium block">
                {r.treatmentCategory}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-3xl bg-navy-900 border border-white/20 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white font-display">Add Verified Review</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Author Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Patient from Hanamkonda"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Treatment Category</label>
                <input
                  type="text"
                  placeholder="e.g. Root Canal Treatment"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Review Comment *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter patient review text..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-navy-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-medical-blue to-cyan-500 text-white font-bold uppercase tracking-wider shadow-glow-cyan"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
