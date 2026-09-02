'use client';

import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Navigation,
} from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';
import LocationMapSection from '@/components/home/LocationMapSection';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, subject, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatusMsg({ type: 'error', text: data.error || 'Failed to submit enquiry.' });
      } else {
        setStatusMsg({
          type: 'success',
          text: 'Thank you! Your enquiry has been received. Our team will contact you shortly.',
        });
        setName('');
        setPhone('');
        setEmail('');
        setSubject('');
        setMessage('');
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Network error. Please try again or WhatsApp us.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-navy-950 text-white min-h-screen">
      {/* Header */}
      <div className="relative py-20 bg-gradient-to-b from-navy-900 to-navy-950 border-b border-white/10 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-aqua-400/30 text-aqua-300 text-xs font-bold tracking-wider uppercase mb-4">
            CONNECT WITH ROOTS DENTAL
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display max-w-3xl mx-auto">
            Contact Our Clinic
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Have a question or looking to schedule a consultation? Reach out to our front desk via phone, WhatsApp, or send us a direct message below.
          </p>
        </div>
      </div>

      {/* Contact Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-navy-900/70 border border-white/10 backdrop-blur-xl shadow-glass space-y-6">
            <div>
              <h2 className="text-2xl font-bold font-display text-white">Send an Online Enquiry</h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Fill in your details and our clinic coordinator will get back to you promptly.
              </p>
            </div>

            {statusMsg && (
              <div
                className={`p-4 rounded-2xl text-xs flex items-center gap-2.5 border ${
                  statusMsg.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}
              >
                {statusMsg.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{statusMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="text-xs font-semibold text-slate-300 block mb-1">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white text-xs focus:outline-none focus:border-aqua-400"
                  />
                </div>

                <div>
                  <label htmlFor="contact-phone" className="text-xs font-semibold text-slate-300 block mb-1">
                    Mobile Number *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    placeholder="e.g. 98480 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white text-xs focus:outline-none focus:border-aqua-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-email" className="text-xs font-semibold text-slate-300 block mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="e.g. ramesh@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white text-xs focus:outline-none focus:border-aqua-400"
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="text-xs font-semibold text-slate-300 block mb-1">
                    Enquiry Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="e.g. Root Canal Consultation"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white text-xs focus:outline-none focus:border-aqua-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="text-xs font-semibold text-slate-300 block mb-1">
                  Message / Dental Concern *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  placeholder="Describe your symptoms, previous treatments, or preferred appointment days..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white text-xs focus:outline-none focus:border-aqua-400"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-medical-blue via-cyan-600 to-aqua-500 hover:from-cyan-600 hover:to-aqua-400 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-glow-cyan flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Enquiry...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Online Enquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Channels Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-navy-900/80 border border-white/10 space-y-6">
              <h3 className="text-xl font-bold font-display text-white">Direct Channels</h3>

              <div className="space-y-4 text-xs">
                <a
                  href="tel:+919876543210"
                  className="p-4 rounded-2xl bg-navy-950/80 border border-white/10 hover:border-aqua-400/40 transition-all flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-navy-800 flex items-center justify-center text-aqua-400 group-hover:bg-aqua-500 group-hover:text-navy-950 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Call Reception</span>
                    <span className="font-bold text-white text-sm">+91 98765 43210</span>
                  </div>
                </a>

                <a
                  href={getWhatsAppLink({})}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-400 transition-all flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-navy-950 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-300 block">Chat on WhatsApp</span>
                    <span className="font-bold text-white text-sm">+91 98765 43210</span>
                  </div>
                </a>

                <a
                  href="mailto:contact@rootsdental.com"
                  className="p-4 rounded-2xl bg-navy-950/80 border border-white/10 hover:border-aqua-400/40 transition-all flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-navy-800 flex items-center justify-center text-aqua-400 group-hover:bg-aqua-500 group-hover:text-navy-950 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Email Us</span>
                    <span className="font-bold text-white text-sm">contact@rootsdental.com</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-navy-900/60 border border-white/10 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-aqua-400">
                Clinic Location
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Darga Road, near NIT, Revenue Colony, Subedari, Kazipet, Hanamkonda, Telangana 506004
              </p>
              <span className="text-[11px] text-slate-400 block pt-1">
                Landmarks: 5 mins from Kazipet Junction, opposite Revenue Colony entrance.
              </span>
            </div>
          </div>
        </div>
      </div>

      <LocationMapSection />
    </div>
  );
}
