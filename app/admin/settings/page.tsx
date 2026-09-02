'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, Phone, MessageSquare, MapPin, Clock, AlertTriangle } from 'lucide-react';

interface ClinicSettings {
  clinicName: string;
  tagline: string;
  phone: string;
  whatsAppNumber: string;
  email: string;
  emergencyPhone: string;
  address: string;
  googleMapsUrl: string;
  embedMapUrl: string;
  noticeBanner: string;
  isOpenOverride: string | null;
}

interface OpeningHour {
  id: string;
  dayOfWeek: string;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<ClinicSettings>({
    clinicName: 'ROOTS SUPER SPECIALITY DENTAL CLINIC',
    tagline: 'Advanced Dental Care • Precision, Comfort & Technology',
    phone: '+91 98765 43210',
    whatsAppNumber: '+919876543210',
    email: 'contact@rootsdental.com',
    emergencyPhone: '+91 98765 43210',
    address: 'Darga Road, near NIT, Revenue Colony, Subedari, Kazipet, Hanamkonda, Telangana 506004',
    googleMapsUrl: 'https://maps.google.com/?q=Roots+Super+Speciality+Dental+Clinic+Darga+Road+Kazipet+Hanamkonda+506004',
    embedMapUrl: '',
    noticeBanner: '',
    isOpenOverride: null,
  });

  const [openingHours, setOpeningHours] = useState<OpeningHour[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.settings) setSettings(data.settings);
      if (data.openingHours) setOpeningHours(data.openingHours);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg('');

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings, openingHours }),
      });

      if (res.ok) {
        setStatusMsg('Clinic settings and hours updated successfully!');
        setTimeout(() => setStatusMsg(''), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleHourChange = (id: string, field: 'openTime' | 'closeTime' | 'isClosed', value: any) => {
    setOpeningHours((prev) =>
      prev.map((h) => (h.id === id ? { ...h, [field]: value } : h))
    );
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Clinic Settings & Configuration
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure contact numbers, WhatsApp channels, physical address, and working hours.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-medical-blue to-cyan-500 hover:from-cyan-500 hover:to-aqua-400 text-white font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-glow-cyan transition-all self-start disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {statusMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8 text-xs">
        {/* Contact Info Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-navy-900/80 border border-white/10 space-y-5">
          <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
            <Phone className="w-4 h-4 text-aqua-400" />
            Clinic Contact & Communication Channels
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Clinic Name</label>
              <input
                type="text"
                required
                value={settings.clinicName}
                onChange={(e) => setSettings({ ...settings, clinicName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Phone Number (Call Now CTA)</label>
              <input
                type="text"
                required
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">WhatsApp Number (Floating & CTAs)</label>
              <input
                type="text"
                required
                value={settings.whatsAppNumber}
                onChange={(e) => setSettings({ ...settings, whatsAppNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Emergency Hotline</label>
              <input
                type="text"
                value={settings.emergencyPhone}
                onChange={(e) => setSettings({ ...settings, emergencyPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Contact Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Physical Address</label>
            <textarea
              rows={2}
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Top Notice / Alert Banner (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Welcoming New Patients • Prioritize Your Oral Health"
              value={settings.noticeBanner || ''}
              onChange={(e) => setSettings({ ...settings, noticeBanner: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white focus:outline-none focus:border-aqua-400"
            />
          </div>
        </div>

        {/* Operating Hours Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-navy-900/80 border border-white/10 space-y-5">
          <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
            <Clock className="w-4 h-4 text-aqua-400" />
            Weekly Operating Hours & Booking Slots
          </h2>

          <div className="space-y-3">
            {openingHours.map((h) => (
              <div
                key={h.id}
                className="p-3 rounded-2xl bg-navy-950/80 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <span className="font-bold text-white min-w-[120px]">{h.dayOfWeek}</span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Open:</span>
                    <input
                      type="text"
                      disabled={h.isClosed}
                      value={h.openTime}
                      onChange={(e) => handleHourChange(h.id, 'openTime', e.target.value)}
                      className="w-24 px-2 py-1 rounded-lg bg-navy-900 border border-white/20 text-white text-center disabled:opacity-30"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Close:</span>
                    <input
                      type="text"
                      disabled={h.isClosed}
                      value={h.closeTime}
                      onChange={(e) => handleHourChange(h.id, 'closeTime', e.target.value)}
                      className="w-24 px-2 py-1 rounded-lg bg-navy-900 border border-white/20 text-white text-center disabled:opacity-30"
                    />
                  </div>

                  <label className="flex items-center gap-1.5 text-slate-400 cursor-pointer ml-2">
                    <input
                      type="checkbox"
                      checked={h.isClosed}
                      onChange={(e) => handleHourChange(h.id, 'isClosed', e.target.checked)}
                      className="accent-rose-500"
                    />
                    <span className={h.isClosed ? 'text-rose-400 font-bold' : ''}>Closed</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save button footer */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-medical-blue to-cyan-500 hover:from-cyan-500 hover:to-aqua-400 text-white font-bold text-xs tracking-wider uppercase shadow-glow-cyan transition-all disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
