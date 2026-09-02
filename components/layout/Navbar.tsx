'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, MessageSquare, Menu, X, Calendar, Sparkles, Clock, MapPin } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clinicStatus, setClinicStatus] = useState<{ isOpen: boolean; text: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Fetch live status
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setClinicStatus({
            isOpen: data.isOpenNow,
            text: data.statusText,
          });
        }
      })
      .catch(() => {});

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openBookingModal = () => {
    window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: {} }));
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Treatments', href: '/treatments' },
    { name: 'Doctors', href: '/doctors' },
    { name: 'Why Roots', href: '/#why-roots' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Top Notification / Hours Bar */}
      <div className="bg-navy-950 text-slate-300 text-xs border-b border-white/5 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-aqua-300">
              <MapPin className="w-3.5 h-3.5" />
              Darga Road, near NIT, Kazipet, Hanamkonda
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {clinicStatus ? (
                <span className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      clinicStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
                    }`}
                  />
                  {clinicStatus.text}
                </span>
              ) : (
                'Mon-Sat: 9:30 AM - 8:30 PM | Sun: 10:00 AM - 2:00 PM'
              )}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+919876543210"
              className="hover:text-aqua-300 transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-aqua-400" />
              +91 98765 43210
            </a>
            <span className="text-slate-600">|</span>
            <Link
              href="/admin/login"
              className="text-slate-400 hover:text-white transition-colors text-[11px]"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Floating Glass Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-navy-950/85 backdrop-blur-xl border-b border-white/10 shadow-glass-dark py-3'
            : 'bg-gradient-to-b from-navy-950/90 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-medical-blue p-0.5 shadow-glow-cyan">
                <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                  <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-aqua-300 to-cyan-400 font-display">
                    R
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight text-white font-display leading-tight group-hover:text-aqua-300 transition-colors">
                  ROOTS
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-aqua-400 leading-tight">
                  Super Speciality Dental Clinic
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={getWhatsAppLink({})}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp
              </a>

              <button
                onClick={openBookingModal}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-medical-blue via-cyan-600 to-aqua-500 hover:from-cyan-600 hover:to-aqua-400 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-glow-cyan flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book Appointment
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={openBookingModal}
                className="px-3 py-1.5 rounded-lg bg-cyan-600 text-white font-semibold text-xs tracking-wide flex items-center gap-1"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-navy-800/80 text-white border border-white/10 hover:bg-navy-700 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[73px] bg-navy-950/95 backdrop-blur-2xl border-b border-white/10 p-6 shadow-2xl transition-all">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
                <button
                  onClick={openBookingModal}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-medical-blue to-cyan-500 text-white font-bold text-sm tracking-wide uppercase text-center shadow-glow-cyan flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Book An Appointment
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={getWhatsAppLink({})}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 font-semibold text-xs flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp
                  </a>
                  <a
                    href="tel:+919876543210"
                    className="py-2.5 rounded-xl bg-navy-800 text-slate-200 border border-white/10 font-semibold text-xs flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-4 h-4 text-aqua-400" />
                    Call Clinic
                  </a>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
