'use client';

import React, { useState, useEffect } from 'react';
import { Stethoscope, Plus, Edit2, Trash2, CheckCircle2, X, Sparkles } from 'lucide-react';

interface Treatment {
  id: string;
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  recoveryInfo: string;
  featured: boolean;
  active: boolean;
  iconName: string;
}

export default function TreatmentsAdminPage() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [editingTreatment, setEditingTreatment] = useState<Treatment | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState('');

  const fetchTreatments = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/treatments');
      const data = await res.json();
      if (data.treatments) setTreatments(data.treatments);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTreatment) return;

    try {
      const isNew = !editingTreatment.id;
      const url = isNew
        ? '/api/treatments'
        : `/api/treatments/${editingTreatment.slug}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTreatment),
      });

      if (res.ok) {
        setStatusMsg('Treatment updated successfully!');
        setEditingTreatment(null);
        fetchTreatments();
        setTimeout(() => setStatusMsg(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Treatments CMS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage dental services, clinical descriptions, and recovery instructions.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingTreatment({
              id: '',
              slug: 'new-treatment',
              name: '',
              category: 'General Care',
              summary: '',
              description: '',
              recoveryInfo: '',
              featured: false,
              active: true,
              iconName: 'Sparkles',
            })
          }
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-medical-blue to-cyan-500 hover:from-cyan-500 hover:to-aqua-400 text-white font-bold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-glow-cyan transition-all self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add Treatment</span>
        </button>
      </div>

      {statusMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Grid of Treatments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {treatments.map((t) => (
          <div
            key={t.id}
            className="p-6 rounded-3xl bg-navy-900/80 border border-white/10 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-aqua-400 uppercase tracking-widest px-2.5 py-1 rounded-full bg-navy-950 border border-white/10">
                  {t.category}
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    t.active ? 'bg-emerald-400' : 'bg-slate-600'
                  }`}
                />
              </div>

              <h3 className="text-base font-bold text-white font-display">{t.name}</h3>
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {t.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">/{t.slug}</span>

              <button
                onClick={() => setEditingTreatment(t)}
                className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-white/10 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10"
              >
                <Edit2 className="w-3.5 h-3.5 text-aqua-400" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingTreatment && (
        <div className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-2xl w-full p-6 sm:p-8 rounded-3xl bg-navy-900 border border-white/20 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white font-display">
                {editingTreatment.id ? `Edit: ${editingTreatment.name}` : 'New Treatment'}
              </h3>
              <button
                onClick={() => setEditingTreatment(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Treatment Name *</label>
                  <input
                    type="text"
                    required
                    value={editingTreatment.name}
                    onChange={(e) =>
                      setEditingTreatment({ ...editingTreatment, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingTreatment.slug}
                    onChange={(e) =>
                      setEditingTreatment({ ...editingTreatment, slug: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Category *</label>
                <input
                  type="text"
                  required
                  value={editingTreatment.category}
                  onChange={(e) =>
                    setEditingTreatment({ ...editingTreatment, category: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Summary (Short) *</label>
                <textarea
                  rows={2}
                  required
                  value={editingTreatment.summary}
                  onChange={(e) =>
                    setEditingTreatment({ ...editingTreatment, summary: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Full Description *</label>
                <textarea
                  rows={4}
                  required
                  value={editingTreatment.description}
                  onChange={(e) =>
                    setEditingTreatment({ ...editingTreatment, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Recovery & Aftercare</label>
                <textarea
                  rows={2}
                  value={editingTreatment.recoveryInfo}
                  onChange={(e) =>
                    setEditingTreatment({ ...editingTreatment, recoveryInfo: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingTreatment.featured}
                    onChange={(e) =>
                      setEditingTreatment({ ...editingTreatment, featured: e.target.checked })
                    }
                    className="accent-aqua-500"
                  />
                  <span>Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingTreatment.active}
                    onChange={(e) =>
                      setEditingTreatment({ ...editingTreatment, active: e.target.checked })
                    }
                    className="accent-aqua-500"
                  />
                  <span>Active (Visible on Website)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingTreatment(null)}
                  className="px-4 py-2 rounded-xl bg-navy-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-medical-blue to-cyan-500 text-white font-bold tracking-wider uppercase shadow-glow-cyan"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
