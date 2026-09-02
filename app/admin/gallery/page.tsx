'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Camera, Plus, CheckCircle2, X } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption?: string;
}

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('CLINIC');
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.items) setItems(data.items);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, imageUrl, caption }),
      });

      if (res.ok) {
        setStatusMsg('Gallery item added successfully!');
        setShowModal(false);
        setTitle('');
        setImageUrl('');
        setCaption('');
        fetchGallery();
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
            Gallery & Media CMS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage clinic photography, operatory setups, and equipment imagery.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-medical-blue to-cyan-500 hover:from-cyan-500 hover:to-aqua-400 text-white font-bold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-glow-cyan transition-all self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media Item</span>
        </button>
      </div>

      {statusMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-navy-900/80 border border-white/10 overflow-hidden space-y-3"
          >
            <div className="aspect-[4/3] relative bg-navy-950">
              <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-navy-950/80 backdrop-blur-md text-[10px] font-bold text-aqua-300 border border-white/10">
                {item.category}
              </div>
            </div>

            <div className="p-4 pt-0">
              <h3 className="text-sm font-bold text-white font-display">{item.title}</h3>
              {item.caption && (
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.caption}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-3xl bg-navy-900 border border-white/20 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white font-display">Add Gallery Photo</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Operatory Suite"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
                >
                  <option value="CLINIC">CLINIC</option>
                  <option value="EQUIPMENT">EQUIPMENT</option>
                  <option value="TREATMENTS">TREATMENTS</option>
                  <option value="TEAM">TEAM</option>
                  <option value="PATIENT_EXPERIENCE">PATIENT EXPERIENCE</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Caption</label>
                <textarea
                  rows={2}
                  placeholder="Short description..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
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
                  Save Media
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
