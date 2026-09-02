'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Users, Plus, Edit2, Trash2, CheckCircle2, X } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  qualifications: string;
  specialization: string;
  experience: string;
  bio: string;
  imageUrl: string;
  availableDays: string;
  active?: boolean;
}

export default function DoctorsAdminPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [statusMsg, setStatusMsg] = useState('');

  const fetchDoctors = async () => {
    try {
      const res = await fetch('/api/doctors');
      const data = await res.json();
      if (data.doctors) setDoctors(data.doctors);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoctor) return;

    try {
      const isNew = !editingDoctor.id;
      const url = isNew ? '/api/doctors' : `/api/doctors/${editingDoctor.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingDoctor),
      });

      if (res.ok) {
        setStatusMsg('Doctor profile saved successfully!');
        setEditingDoctor(null);
        fetchDoctors();
        setTimeout(() => setStatusMsg(''), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Doctors & Specialists CMS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage dental surgeon profiles, credentials, and consultation availability.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingDoctor({
              id: '',
              name: '',
              qualifications: 'BDS, MDS',
              specialization: 'Dental Specialist',
              experience: 'Specialist Care',
              bio: '',
              imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
              availableDays: 'Mon,Tue,Wed,Thu,Fri,Sat',
              active: true,
            })
          }
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-medical-blue to-cyan-500 hover:from-cyan-500 hover:to-aqua-400 text-white font-bold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-glow-cyan transition-all self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add Specialist</span>
        </button>
      </div>

      {statusMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Grid of Doctors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div
            key={doc.id}
            className="p-6 rounded-3xl bg-navy-900/80 border border-white/10 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl relative overflow-hidden bg-navy-950 border border-white/10 shrink-0">
                  <Image src={doc.imageUrl} alt={doc.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">{doc.name}</h3>
                  <span className="text-xs text-aqua-400 block font-semibold">{doc.specialization}</span>
                  <span className="text-[11px] text-slate-400 block">{doc.qualifications}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                {doc.bio}
              </p>

              <div className="text-[11px] text-slate-400 p-2.5 rounded-xl bg-navy-950 border border-white/5">
                Available Days: <strong className="text-white">{doc.availableDays}</strong>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setEditingDoctor(doc)}
                className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-white/10 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10"
              >
                <Edit2 className="w-3.5 h-3.5 text-aqua-400" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Doctor Modal */}
      {editingDoctor && (
        <div className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-xl w-full p-6 sm:p-8 rounded-3xl bg-navy-900 border border-white/20 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white font-display">
                {editingDoctor.id ? `Edit: ${editingDoctor.name}` : 'New Doctor Profile'}
              </h3>
              <button
                onClick={() => setEditingDoctor(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Doctor Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. A. Sharma"
                  value={editingDoctor.name}
                  onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Qualifications *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BDS, MDS (Endodontics)"
                    value={editingDoctor.qualifications}
                    onChange={(e) =>
                      setEditingDoctor({ ...editingDoctor, qualifications: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Specialization *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chief Endodontist"
                    value={editingDoctor.specialization}
                    onChange={(e) =>
                      setEditingDoctor({ ...editingDoctor, specialization: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Photo Image URL</label>
                <input
                  type="url"
                  value={editingDoctor.imageUrl}
                  onChange={(e) => setEditingDoctor({ ...editingDoctor, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Available Days</label>
                <input
                  type="text"
                  placeholder="e.g. Mon,Tue,Wed,Thu,Fri,Sat"
                  value={editingDoctor.availableDays}
                  onChange={(e) =>
                    setEditingDoctor({ ...editingDoctor, availableDays: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Bio / Profile Description</label>
                <textarea
                  rows={3}
                  value={editingDoctor.bio}
                  onChange={(e) => setEditingDoctor({ ...editingDoctor, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingDoctor(null)}
                  className="px-4 py-2 rounded-xl bg-navy-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-medical-blue to-cyan-500 text-white font-bold tracking-wider uppercase shadow-glow-cyan"
                >
                  Save Doctor Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
