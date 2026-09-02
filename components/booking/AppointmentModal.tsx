'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getWhatsAppLink } from '@/lib/whatsapp';

interface TreatmentOption {
  id: string;
  slug: string;
  name: string;
  category: string;
}

interface DoctorOption {
  id: string;
  name: string;
  specialization: string;
  qualifications: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

// Fallback treatments using matching unique slugs as IDs
const DEFAULT_TREATMENTS: TreatmentOption[] = [
  { id: 'root-canal', slug: 'root-canal', name: 'Root Canal Treatment', category: 'Endodontics' },
  { id: 'dental-implants', slug: 'dental-implants', name: 'Dental Implants', category: 'Implantology' },
  { id: 'teeth-cleaning', slug: 'teeth-cleaning', name: 'Teeth Cleaning & Scaling', category: 'Preventive Care' },
  { id: 'teeth-whitening', slug: 'teeth-whitening', name: 'Teeth Whitening', category: 'Cosmetic Dentistry' },
  { id: 'braces', slug: 'braces', name: 'Braces & Orthodontics', category: 'Orthodontics' },
  { id: 'wisdom-tooth-removal', slug: 'wisdom-tooth-removal', name: 'Wisdom Tooth Removal', category: 'Oral Surgery' },
  { id: 'tooth-extraction', slug: 'tooth-extraction', name: 'Tooth Extraction', category: 'General Dentistry' },
  { id: 'pediatric-dentistry', slug: 'pediatric-dentistry', name: 'Pediatric Dentistry', category: 'Child Dental Care' },
  { id: 'cosmetic-dentistry', slug: 'cosmetic-dentistry', name: 'Cosmetic Dentistry & Smile Design', category: 'Aesthetics' },
  { id: 'emergency-dental-care', slug: 'emergency-dental-care', name: 'Emergency Dental Care', category: 'Urgent Care' },
];

const DEFAULT_DOCTORS: DoctorOption[] = [
  { id: 'doc-1', name: 'Dr. A. Sharma', specialization: 'Chief Endodontist & Implant Specialist', qualifications: 'BDS, MDS' },
  { id: 'doc-2', name: 'Dr. K. Srinivas', specialization: 'Consultant Orthodontist', qualifications: 'BDS, MDS' },
  { id: 'doc-3', name: 'Dr. P. Madhavi', specialization: 'Pediatric Dental Specialist', qualifications: 'BDS, MDS' },
  { id: 'doc-4', name: 'Dr. V. Rajesh', specialization: 'Oral & Maxillofacial Surgeon', qualifications: 'BDS, MDS, FIBOMS' },
];

function getFormattedDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function AppointmentModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  // Form State
  const [treatments, setTreatments] = useState<TreatmentOption[]>(DEFAULT_TREATMENTS);
  const [doctors, setDoctors] = useState<DoctorOption[]>(DEFAULT_DOCTORS);
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>(DEFAULT_TREATMENTS[0].slug);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState('');

  // Patient Info
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredContact, setPreferredContact] = useState<'WHATSAPP' | 'CALL' | 'EMAIL'>('WHATSAPP');
  const [message, setMessage] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [confirmedAppointment, setConfirmedAppointment] = useState<any>(null);

  // Initialize date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(getFormattedDate(tomorrow));
  }, []);

  // Load Treatments & Doctors from API if available
  useEffect(() => {
    fetch('/api/treatments')
      .then((res) => res.json())
      .then((data) => {
        if (data.treatments && data.treatments.length > 0) {
          setTreatments(data.treatments);
          if (!selectedTreatmentId) {
            setSelectedTreatmentId(data.treatments[0].slug || data.treatments[0].id);
          }
        }
      })
      .catch(() => {});

    fetch('/api/doctors')
      .then((res) => res.json())
      .then((data) => {
        if (data.doctors && data.doctors.length > 0) {
          setDoctors(data.doctors);
        }
      })
      .catch(() => {});
  }, []);

  // Global event listener to open booking modal
  useEffect(() => {
    const handleOpen = (e: CustomEvent) => {
      setIsOpen(true);
      setStep(1);
      setSubmitError('');
      setConfirmedAppointment(null);

      if (e.detail?.treatmentSlug) {
        const found = treatments.find(
          (t) => t.slug === e.detail.treatmentSlug || t.id === e.detail.treatmentSlug
        );
        if (found) {
          setSelectedTreatmentId(found.slug || found.id);
        }
      }
      if (e.detail?.doctorId) {
        setSelectedDoctorId(e.detail.doctorId);
      }

      if (dialogRef.current && !dialogRef.current.open) {
        dialogRef.current.showModal();
      }
    };

    window.addEventListener('open-booking-modal' as any, handleOpen);
    return () => window.removeEventListener('open-booking-modal' as any, handleOpen);
  }, [treatments]);

  // Fetch Slots when Date or Doctor changes
  useEffect(() => {
    if (!selectedDate) return;

    setLoadingSlots(true);
    setSlotsError('');

    const url = `/api/appointments/slots?date=${selectedDate}${
      selectedDoctorId ? `&doctorId=${selectedDoctorId}` : ''
    }`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLoadingSlots(false);
        if (data.available === false) {
          setSlotsError(data.reason || 'No appointments available for this date.');
          setTimeSlots([]);
          setSelectedTimeSlot('');
        } else if (data.slots && data.slots.length > 0) {
          setTimeSlots(data.slots);
          const firstAvailable = data.slots.find((s: TimeSlot) => s.available);
          if (firstAvailable && (!selectedTimeSlot || !data.slots.some((s: TimeSlot) => s.time === selectedTimeSlot && s.available))) {
            setSelectedTimeSlot(firstAvailable.time);
          }
        }
      })
      .catch(() => {
        setLoadingSlots(false);
        setSlotsError('Could not load slots. Please check your connection.');
      });
  }, [selectedDate, selectedDoctorId]);

  const closeModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    setIsOpen(false);
  };

  const handleNextStep = () => {
    if (step === 1 && !selectedTreatmentId) {
      setSubmitError('Please select a treatment to proceed.');
      return;
    }
    if (step === 3 && !selectedDate) {
      setSubmitError('Please select an appointment date.');
      return;
    }
    if (step === 4 && !selectedTimeSlot) {
      setSubmitError('Please select an available time slot.');
      return;
    }
    setSubmitError('');
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setSubmitError('');
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmitBooking = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSubmitError('');

    if (!patientName.trim()) {
      setSubmitError('Please enter your full name.');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setSubmitError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!termsAccepted) {
      setSubmitError('Please agree to the appointment consultation terms.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName: patientName.trim(),
          phone: cleanPhone,
          email: email.trim() || undefined,
          preferredContact,
          treatmentId: selectedTreatmentId,
          doctorId: selectedDoctorId || undefined,
          appointmentDate: selectedDate,
          timeSlot: selectedTimeSlot,
          message: message.trim() || undefined,
          source: 'WEBSITE',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitError(data.error || 'Failed to submit appointment. Please try again.');
        setSubmitting(false);
        return;
      }

      setConfirmedAppointment(data.appointment);
      setStep(6);
      setSubmitting(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00b4d8', '#48cae4', '#10b981', '#ffffff'],
        });
      } catch {}
    } catch {
      setSubmitError('Network error. Please check your internet connection or call our clinic.');
      setSubmitting(false);
    }
  };

  const selectedTreatmentObj =
    treatments.find((t) => t.id === selectedTreatmentId || t.slug === selectedTreatmentId) ||
    treatments[0];

  // Today for min date
  const todayStr = getFormattedDate(new Date());

  return (
    <dialog
      ref={dialogRef}
      onClose={() => setIsOpen(false)}
      onClick={(e) => {
        if (e.target === dialogRef.current) closeModal();
      }}
      className="backdrop:bg-navy-950/80 backdrop:backdrop-blur-md p-0 rounded-3xl bg-navy-900 border border-white/20 shadow-2xl text-white max-w-2xl w-[95vw] overflow-hidden m-auto"
      aria-labelledby="booking-title"
    >
      {isOpen && (
        <div className="flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="p-5 sm:p-6 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-medical-blue p-0.5 shadow-glow-cyan">
                <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-aqua-300" />
                </div>
              </div>
              <div>
                <h3 id="booking-title" className="text-lg font-bold text-white font-display">
                  Book An Appointment
                </h3>
                <p className="text-xs text-aqua-400">
                  Roots Super Speciality Dental Clinic • Kazipet
                </p>
              </div>
            </div>

            <button
              onClick={closeModal}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar (Steps 1-5) */}
          {step < 6 && (
            <div className="px-6 pt-4 pb-2 bg-navy-950/50 border-b border-white/5">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-2">
                <span className={step >= 1 ? 'text-aqua-300 font-bold' : ''}>1. Treatment</span>
                <span className={step >= 2 ? 'text-aqua-300 font-bold' : ''}>2. Doctor</span>
                <span className={step >= 3 ? 'text-aqua-300 font-bold' : ''}>3. Date</span>
                <span className={step >= 4 ? 'text-aqua-300 font-bold' : ''}>4. Slot</span>
                <span className={step >= 5 ? 'text-aqua-300 font-bold' : ''}>5. Details</span>
              </div>
              <div className="w-full bg-navy-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-medical-blue to-aqua-400 h-full transition-all duration-300"
                  style={{ width: `${(step / 5) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Body Content by Step */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {submitError && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* STEP 1: Select Treatment */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-bold text-white">Select Required Treatment</h4>
                  <p className="text-xs text-slate-400">
                    Choose the dental service or concern you would like to consult for.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
                  {treatments.map((t) => {
                    const isSelected = selectedTreatmentId === t.id || selectedTreatmentId === t.slug;
                    return (
                      <button
                        key={t.id || t.slug}
                        type="button"
                        onClick={() => {
                          setSelectedTreatmentId(t.slug || t.id);
                          setSubmitError('');
                        }}
                        className={`p-3.5 rounded-2xl text-left border transition-all ${
                          isSelected
                            ? 'bg-navy-800 border-aqua-400 shadow-glow-cyan'
                            : 'bg-navy-950/60 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{t.name}</span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-aqua-400" />
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 block mt-1">{t.category}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: Select Doctor */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-bold text-white">Select Preferred Specialist</h4>
                  <p className="text-xs text-slate-400">
                    You can pick a specific dental specialist or choose &quot;Any Available Specialist&quot;.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedDoctorId('')}
                    className={`w-full p-3.5 rounded-2xl text-left border transition-all ${
                      selectedDoctorId === ''
                        ? 'bg-navy-800 border-aqua-400 shadow-glow-cyan'
                        : 'bg-navy-950/60 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Any Available Specialist</span>
                      {selectedDoctorId === '' && <CheckCircle2 className="w-4 h-4 text-aqua-400" />}
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      Our clinic will allocate the best available doctor based on your treatment.
                    </span>
                  </button>

                  {doctors.map((doc) => (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => setSelectedDoctorId(doc.id)}
                      className={`w-full p-3.5 rounded-2xl text-left border transition-all ${
                        selectedDoctorId === doc.id
                          ? 'bg-navy-800 border-aqua-400 shadow-glow-cyan'
                          : 'bg-navy-950/60 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{doc.name}</span>
                        {selectedDoctorId === doc.id && (
                          <CheckCircle2 className="w-4 h-4 text-aqua-400" />
                        )}
                      </div>
                      <span className="text-[11px] text-aqua-300 block mt-0.5">{doc.specialization}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{doc.qualifications}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Select Date */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-bold text-white">Choose Appointment Date</h4>
                  <p className="text-xs text-slate-400">
                    Clinic hours: Mon-Sat (9:30 AM - 8:30 PM), Sun (10:00 AM - 2:00 PM).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-navy-950/70 border border-white/10 space-y-3">
                  <label htmlFor="appointment-date-input" className="text-xs font-semibold text-slate-300 block">
                    Select Date
                  </label>
                  <input
                    id="appointment-date-input"
                    type="date"
                    min={todayStr}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-white/20 text-white text-sm focus:outline-none focus:border-aqua-400 transition-colors cursor-pointer"
                  />
                  {selectedDate && (
                    <span className="text-[11px] text-slate-300 block">
                      Selected: <strong>{selectedDate}</strong>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* STEP 4: Select Time Slot */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-bold text-white">Select Time Slot</h4>
                  <p className="text-xs text-slate-400">
                    Real-time available consultation slots for {selectedDate}.
                  </p>
                </div>

                {loadingSlots ? (
                  <div className="py-12 flex flex-col items-center justify-center text-slate-400 text-xs gap-2">
                    <div className="w-6 h-6 border-2 border-aqua-400 border-t-transparent rounded-full animate-spin" />
                    <span>Loading available slots...</span>
                  </div>
                ) : slotsError ? (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                    {slotsError}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[300px] overflow-y-auto pr-1">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        className={`p-2.5 rounded-xl text-center text-xs font-semibold border transition-all ${
                          !slot.available
                            ? 'bg-navy-950/30 border-white/5 text-slate-600 line-through cursor-not-allowed'
                            : selectedTimeSlot === slot.time
                            ? 'bg-aqua-500 text-navy-950 border-aqua-400 font-bold shadow-glow-cyan'
                            : 'bg-navy-950/70 border-white/10 text-slate-200 hover:border-white/30'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* STEP 5: Patient Details & Submission */}
            {step === 5 && (
              <form onSubmit={handleSubmitBooking} className="space-y-4">
                <div>
                  <h4 className="text-base font-bold text-white">Patient Contact Details</h4>
                  <p className="text-xs text-slate-400">
                    We will send your appointment confirmation via your preferred channel.
                  </p>
                </div>

                {/* Summary banner */}
                <div className="p-3.5 rounded-xl bg-navy-950/80 border border-aqua-400/30 text-xs space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>Treatment:</span>
                    <span className="font-bold text-white">{selectedTreatmentObj?.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Schedule:</span>
                    <span className="font-bold text-aqua-300">
                      {selectedDate} at {selectedTimeSlot}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label htmlFor="patient-name-input" className="text-xs font-semibold text-slate-300 block mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        id="patient-name-input"
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white text-xs focus:outline-none focus:border-aqua-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="patient-phone-input" className="text-xs font-semibold text-slate-300 block mb-1">
                      Mobile Number (10 digits) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        id="patient-phone-input"
                        type="tel"
                        required
                        placeholder="e.g. 98480 12345"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white text-xs focus:outline-none focus:border-aqua-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="patient-email-input" className="text-xs font-semibold text-slate-300 block mb-1">
                      Email Address <span className="text-aqua-400 font-normal">(for instant email confirmation)</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        id="patient-email-input"
                        type="email"
                        placeholder="e.g. ramesh@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white text-xs focus:outline-none focus:border-aqua-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Preferred Confirmation Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['WHATSAPP', 'CALL', 'EMAIL'] as const).map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setPreferredContact(method)}
                          className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                            preferredContact === method
                              ? 'bg-aqua-500 text-navy-950 border-aqua-400 font-bold'
                              : 'bg-navy-950 border-white/10 text-slate-300'
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="patient-concern-input" className="text-xs font-semibold text-slate-300 block mb-1">
                      Describe Concern or Message (Optional)
                    </label>
                    <textarea
                      id="patient-concern-input"
                      rows={2}
                      placeholder="e.g. Mild sensitivity when drinking cold water..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/20 text-white text-xs focus:outline-none focus:border-aqua-400"
                    />
                  </div>

                  <label className="flex items-start gap-2 text-[11px] text-slate-400 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 accent-aqua-500"
                    />
                    <span>
                      I consent to receive clinic appointment confirmation and care reminders via WhatsApp / SMS / Phone.
                    </span>
                  </label>
                </div>
              </form>
            )}

            {/* STEP 6: Confirmation Screen */}
            {step === 6 && confirmedAppointment && (
              <div className="py-4 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center animate-pulse">
                  <CheckCircle2 className="w-9 h-9 text-emerald-300" />
                </div>

                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-aqua-400 uppercase">
                    Appointment Request Received
                  </span>
                  <h3 className="text-2xl font-black text-white font-display mt-1">
                    You Are All Set!
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Your appointment reference ID is:
                  </p>
                  <div className="mt-2 inline-block px-4 py-2 rounded-xl bg-navy-950 border border-aqua-400/50 text-aqua-300 font-mono font-bold text-base tracking-wider shadow-glow-cyan">
                    {confirmedAppointment.appointmentId}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-navy-950/70 border border-white/10 text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Patient:</span>
                    <span className="font-semibold text-white">{confirmedAppointment.patientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Treatment:</span>
                    <span className="font-semibold text-white">{confirmedAppointment.treatment?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Date & Slot:</span>
                    <span className="font-semibold text-aqua-300">
                      {confirmedAppointment.appointmentDate} • {confirmedAppointment.timeSlot}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Clinic Location:</span>
                    <span className="font-semibold text-white">Kazipet, Hanamkonda</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                  <a
                    href={getWhatsAppLink({
                      appointmentId: confirmedAppointment.appointmentId,
                      patientName: confirmedAppointment.patientName,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Confirm on WhatsApp
                  </a>

                  <button
                    onClick={closeModal}
                    className="py-3 px-6 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-semibold text-xs tracking-wider uppercase transition-colors border border-white/10"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          {step < 6 && (
            <div className="p-4 sm:p-6 bg-navy-950 border-t border-white/10 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-medical-blue to-cyan-500 hover:from-cyan-500 hover:to-aqua-400 text-white font-bold text-xs tracking-wider uppercase shadow-glow-cyan flex items-center gap-1.5 transition-all"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSubmitBooking()}
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-medical-blue to-cyan-500 hover:from-cyan-500 hover:to-aqua-400 text-white font-bold text-xs tracking-wider uppercase shadow-glow-cyan flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Confirm Appointment
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
