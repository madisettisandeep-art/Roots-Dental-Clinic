'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: '1',
    question: 'What treatments does Roots Dental Clinic provide?',
    answer: 'Roots Super Speciality Dental Clinic provides comprehensive dental care including Root Canal Treatment, Dental Implants, Teeth Cleaning & Scaling, Teeth Whitening, Braces & Orthodontics, Wisdom Tooth Removal, Tooth Extractions, Pediatric Dentistry, Cosmetic Dentistry, and Emergency Dental Care.',
  },
  {
    id: '2',
    question: 'How do I book an appointment?',
    answer: 'You can book an appointment online via our 6-step appointment booking system on this website, chat with us directly on WhatsApp, or call our clinic phone number. We will confirm your preferred time slot promptly.',
  },
  {
    id: '3',
    question: 'How can I contact the clinic through WhatsApp?',
    answer: 'Simply click any of the "WhatsApp Us" buttons on our website. It will automatically open a pre-filled message on your WhatsApp with your treatment of interest, allowing you to ask questions or confirm your visit with our front desk.',
  },
  {
    id: '4',
    question: 'What should I bring for my first dental appointment?',
    answer: 'Please bring any previous dental records, recent X-rays (if available), and a list of current medications or relevant medical history. If you do not have previous records, our doctors will perform a fresh comprehensive digital assessment.',
  },
  {
    id: '5',
    question: 'How long does a typical dental consultation take?',
    answer: 'A standard initial consultation and examination typically takes 20 to 30 minutes, allowing our doctors to thoroughly inspect your teeth, discuss findings with you, and design a personalized treatment plan.',
  },
  {
    id: '6',
    question: 'Do you treat children?',
    answer: 'Yes! We have specialized pediatric dental care tailored to children in a gentle, warm, and fear-free environment to make their visits pleasant and encouraging.',
  },
  {
    id: '7',
    question: 'Do you provide emergency dental care?',
    answer: 'Yes, we provide priority support for dental emergencies including acute toothache, knocked-out teeth, broken restorations, and facial swelling. Please call our clinic number or message us on WhatsApp immediately.',
  },
  {
    id: '8',
    question: 'Do you offer root canal treatment?',
    answer: 'Yes, Root Canal Treatment is one of our primary specialities. We utilize modern rotary systems and digital apex locators for high precision, gentle treatment, and natural tooth preservation.',
  },
  {
    id: '9',
    question: 'Do you provide dental implants?',
    answer: 'Yes, we offer modern dental implants made of biocompatible titanium to permanently replace single or multiple missing teeth with natural look and biting strength.',
  },
  {
    id: '10',
    question: 'Do you provide braces and orthodontic treatment?',
    answer: 'Yes, we provide orthodontic solutions including traditional metal braces, ceramic aesthetic braces, and modern transparent clear aligners for both teens and adults.',
  },
];

export default function FAQAccordion() {
  const [faqs, setFaqs] = useState<FAQItem[]>(DEFAULT_FAQS);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    fetch('/api/faqs')
      .then((res) => res.json())
      .then((data) => {
        if (data.faqs && data.faqs.length > 0) {
          setFaqs(data.faqs);
        }
      })
      .catch(() => {});
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white overflow-hidden" id="faq">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-medical-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-aqua-400/30 text-aqua-300 text-xs font-bold tracking-wider uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-aqua-400" />
            PATIENT INFORMATION
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-display">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Clear answers to common questions about dental procedures, consultation steps, and appointments at Roots Dental.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id || idx}
                className="rounded-2xl bg-navy-900/70 border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-aqua-300 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-display">{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-navy-800 flex items-center justify-center text-aqua-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-aqua-500 text-navy-950' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help Trigger */}
        <div className="mt-12 p-6 rounded-3xl bg-navy-900/80 border border-aqua-400/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-white">Have a specific question not listed here?</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Our front desk is available on WhatsApp to answer your questions.
            </p>
          </div>
          <a
            href={getWhatsAppLink({})}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
