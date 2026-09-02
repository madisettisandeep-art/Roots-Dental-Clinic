'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Award, CheckCircle2, ChevronRight, User } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  qualifications: string;
  specialization: string;
  experience: string;
  bio: string;
  imageUrl: string;
  availableDays: string;
}

const FALLBACK_DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Lead Dental Specialist',
    qualifications: 'BDS, MDS (Endodontics & Conservative Dentistry)',
    specialization: 'Chief Endodontist & Microscopic Root Canal Specialist',
    experience: 'Specialist in Precision Endodontics',
    bio: 'Dedicated to preserving natural tooth structure using advanced rotary endodontics, digital apex locators, and conservative restorative techniques with utmost patient comfort.',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    availableDays: 'Mon,Tue,Wed,Thu,Fri,Sat',
  },
  {
    id: '2',
    name: 'Dr. Consultant Implantologist',
    qualifications: 'BDS, MDS (Periodontics & Oral Implantology)',
    specialization: 'Senior Implantologist & Periodontist',
    experience: 'Specialist in Full-Mouth Restorations',
    bio: 'Expert in modern titanium and zirconia implant placement, bone grafting procedures, and comprehensive gum health restoration.',
    imageUrl: 'https://images.unsplash.com/photo-1594824813628-482200234a91?auto=format&fit=crop&w=600&q=80',
    availableDays: 'Mon,Wed,Fri,Sat',
  },
  {
    id: '3',
    name: 'Dr. Consultant Orthodontist',
    qualifications: 'BDS, MDS (Orthodontics & Dentofacial Orthopedics)',
    specialization: 'Orthodontist & Clear Aligner Specialist',
    experience: 'Specialist in Digital Smile Alignment',
    bio: 'Focuses on modern self-ligating braces, ceramic aligners, and clear aligner therapies for both adolescents and adults.',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    availableDays: 'Tue,Thu,Sat,Sun',
  },
  {
    id: '4',
    name: 'Dr. Pediatric Dental Associate',
    qualifications: 'BDS, MDS (Pediatric & Preventive Dentistry)',
    specialization: 'Pediatric Dental Specialist',
    experience: 'Child Dental Healthcare',
    bio: 'Passionate about creating pleasant, fear-free dental visits for children, preventive sealants, fluoride treatments, and gentle restorations.',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80',
    availableDays: 'Mon,Tue,Wed,Thu,Fri,Sat',
  },
];

export default function DoctorShowcase() {
  const [doctors, setDoctors] = useState<Doctor[]>(FALLBACK_DOCTORS);

  useEffect(() => {
    fetch('/api/doctors')
      .then((res) => res.json())
      .then((data) => {
        if (data.doctors && data.doctors.length > 0) {
          setDoctors(data.doctors);
        }
      })
      .catch(() => {});
  }, []);

  const openBookingForDoctor = (docId: string) => {
    window.dispatchEvent(
      new CustomEvent('open-booking-modal', { detail: { doctorId: docId } })
    );
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white overflow-hidden" id="doctors">
      {/* Background glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-medical-blue/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-aqua-400/30 text-aqua-300 text-xs font-bold tracking-wider uppercase mb-3">
              SPECIALIST DENTAL TEAM
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-display">
              Meet Our Dental Specialists
            </h2>
            <p className="mt-3 text-slate-300 text-base max-w-2xl">
              Experienced, specialized dental surgeons dedicated to clinical precision, continuous innovation, and patient comfort in Kazipet.
            </p>
          </div>

          <Link
            href="/doctors"
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 border border-white/10 transition-colors shrink-0 self-start md:self-auto"
          >
            <span>All Doctor Profiles</span>
            <ChevronRight className="w-3.5 h-3.5 text-aqua-300" />
          </Link>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="rounded-3xl bg-navy-900/60 border border-white/10 hover:border-aqua-400/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:shadow-glow-blue hover:-translate-y-1"
            >
              <div>
                {/* Doctor Image with aspect ratio */}
                <div className="aspect-[4/4] relative overflow-hidden bg-navy-950">
                  <Image
                    src={doc.imageUrl}
                    alt={`${doc.name} - Roots Super Speciality Dental Clinic`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />

                  {/* Availability badge */}
                  <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl bg-navy-950/80 backdrop-blur-md border border-white/10 text-[10px] text-slate-300 flex items-center justify-between">
                    <span className="text-aqua-300 font-semibold">{doc.availableDays}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                </div>

                {/* Profile Details */}
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold text-white group-hover:text-aqua-300 transition-colors font-display">
                    {doc.name}
                  </h3>
                  <div className="text-xs text-aqua-400 font-semibold leading-snug">
                    {doc.specialization}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-snug">
                    {doc.qualifications}
                  </div>
                  <p className="text-[11px] text-slate-300 pt-2 line-clamp-3 leading-relaxed">
                    {doc.bio}
                  </p>
                </div>
              </div>

              {/* Booking CTA */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => openBookingForDoctor(doc.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-navy-800 hover:bg-aqua-500 hover:text-navy-950 text-slate-200 text-xs font-bold tracking-wider uppercase transition-all border border-white/10 flex items-center justify-center gap-1.5 shadow-glass"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
