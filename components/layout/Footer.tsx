'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart, ArrowUpRight, MessageSquare } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const treatments = [
    { name: 'Root Canal Treatment', href: '/treatments/root-canal' },
    { name: 'Dental Implants', href: '/treatments/dental-implants' },
    { name: 'Teeth Cleaning & Scaling', href: '/treatments/teeth-cleaning' },
    { name: 'Teeth Whitening', href: '/treatments/teeth-whitening' },
    { name: 'Braces & Orthodontics', href: '/treatments/braces' },
    { name: 'Wisdom Tooth Removal', href: '/treatments/wisdom-tooth-removal' },
    { name: 'Pediatric Dentistry', href: '/treatments/pediatric-dentistry' },
    { name: 'Emergency Dental Care', href: '/treatments/emergency-dental-care' },
  ];

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-white/10 pt-16 pb-24 md:pb-12 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & NAP */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-medical-blue p-0.5 shadow-glow-cyan">
                <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                  <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-aqua-300 to-cyan-400 font-display">
                    R
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tight font-display">
                  ROOTS
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-aqua-400">
                  Super Speciality Dental Clinic
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              Advanced dental healthcare in Hanamkonda & Kazipet. Delivering precision endodontics, surgical implantology, and family oral care with comfort, technology, and trust.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-aqua-400 shrink-0 mt-0.5" />
                <span>
                  Darga Road, near NIT, Revenue Colony, Subedari, Kazipet, Hanamkonda, Telangana 506004
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-aqua-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-aqua-400 shrink-0" />
                <a href="mailto:contact@rootsdental.com" className="hover:text-white transition-colors">
                  contact@rootsdental.com
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Treatments */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Speciality Treatments
            </h4>
            <ul className="space-y-2 text-xs">
              {treatments.map((t) => (
                <li key={t.name}>
                  <Link
                    href={t.href}
                    className="text-slate-400 hover:text-aqua-300 transition-colors flex items-center justify-between group"
                  >
                    <span>{t.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-aqua-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links & Hours */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/about" className="hover:text-aqua-300 transition-colors">
                  About Clinic
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-aqua-300 transition-colors">
                  Doctor Profiles
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-aqua-300 transition-colors">
                  Patient Reviews
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-aqua-300 transition-colors">
                  Clinic Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-aqua-300 transition-colors">
                  Location & Map
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-aqua-300 transition-colors">
                  Admin CMS Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Timings & Emergency Action */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2">
              Clinic Working Hours
            </h4>
            <div className="p-4 rounded-2xl bg-navy-900/80 border border-white/10 text-xs space-y-2">
              <div className="flex justify-between text-slate-300">
                <span className="font-medium">Monday – Saturday</span>
                <span className="font-semibold text-aqua-300">9:30 AM – 8:30 PM</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="font-medium">Sunday</span>
                <span className="font-semibold text-amber-300">10:00 AM – 2:00 PM</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs text-slate-400 block mb-2 font-medium">Have an enquiry?</span>
              <a
                href={getWhatsAppLink({})}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold tracking-wide uppercase text-center transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Legal, Medical Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} Roots Super Speciality Dental Clinic. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Use
            </Link>
            <span>•</span>
            <Link href="/medical-disclaimer" className="hover:text-slate-300 transition-colors">
              Medical Disclaimer
            </Link>
          </div>
        </div>

        {/* Mandatory Medical Disclaimer Text */}
        <div className="mt-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-slate-400 text-center leading-relaxed">
          <span className="font-semibold text-slate-300">Medical Disclaimer:</span> Information provided on this website is for general educational purposes only and does not constitute formal dental diagnosis or individual medical advice. Please consult our qualified dental surgeons for clinical examination and tailored treatment planning.
        </div>
      </div>
    </footer>
  );
}
