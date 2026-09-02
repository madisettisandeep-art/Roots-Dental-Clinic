'use client';

import React, { useState, useEffect } from 'react';
import { HelpCircle, Plus, Edit2, CheckCircle2, X } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  sortOrder: number;
}

export default function FAQsAdminPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('General');
  const [statusMsg, setStatusMsg] = useState('');

  const fetchFaqs = async () => {
    try {
      const res = await fetch('/api/faqs');
      const data = await res.json();
      if (data.faqs) setFaqs(data.faqs);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer, category }),
      });

      if (res.ok) {
        setStatusMsg('FAQ saved successfully!');
        setShowModal(false);
        setQuestion('');
        setAnswer('');
        fetchFaqs();
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
            Frequently Asked Questions CMS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage dynamic answers to common patient questions.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-medical-blue to-cyan-500 hover:from-cyan-500 hover:to-aqua-400 text-white font-bold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-glow-cyan transition-all self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add FAQ</span>
        </button>
      </div>

      {statusMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusMsg}</span>
        </div>
      )}

      <div className="space-y-3">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="p-5 rounded-2xl bg-navy-900/80 border border-white/10 space-y-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-display">{faq.question}</h3>
              <span className="text-[10px] font-bold text-aqua-400 uppercase px-2 py-0.5 rounded bg-navy-950">
                {faq.category || 'General'}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-3xl bg-navy-900 border border-white/20 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white font-display">Add FAQ</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Question *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Do you provide emergency care?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Treatments, Booking"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Answer *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detailed clear response..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
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
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
