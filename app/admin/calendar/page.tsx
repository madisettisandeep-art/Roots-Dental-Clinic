'use client';

import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, User, Stethoscope } from 'lucide-react';

interface Appointment {
  id: string;
  appointmentId: string;
  patientName: string;
  phone: string;
  appointmentDate: string;
  timeSlot: string;
  status: string;
  treatment: { name: string };
  doctor?: { name: string };
}

export default function CalendarAdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  useEffect(() => {
    fetch('/api/appointments')
      .then((res) => res.json())
      .then((data) => {
        if (data.appointments) setAppointments(data.appointments);
      })
      .catch(() => {});
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getAppointmentsForDay = (dayNum: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    return appointments.filter((a) => a.appointmentDate === dateStr);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Appointment Calendar
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Visual schedule of patient bookings across days, weeks, and months.
          </p>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-navy-900 border border-white/10 p-1 rounded-2xl">
            <button
              onClick={prevMonth}
              className="p-2 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 text-xs font-bold text-white min-w-[140px] text-center">
              {monthNames[month]} {year}
            </span>
            <button
              onClick={nextMonth}
              className="p-2 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Month Calendar Grid */}
      <div className="p-6 rounded-3xl bg-navy-900/80 border border-white/10 backdrop-blur-xl shadow-glass">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-bold text-slate-400 uppercase tracking-wider pb-4 border-b border-white/10">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-2 pt-3">
          {/* Leading empty days */}
          {[...Array(firstDayIndex)].map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[100px] p-2 rounded-2xl bg-navy-950/20 border border-transparent" />
          ))}

          {/* Actual days */}
          {[...Array(daysInMonth)].map((_, i) => {
            const dayNum = i + 1;
            const dayAppts = getAppointmentsForDay(dayNum);
            const isToday =
              dayNum === new Date().getDate() &&
              month === new Date().getMonth() &&
              year === new Date().getFullYear();

            return (
              <div
                key={`day-${dayNum}`}
                className={`min-h-[110px] p-2.5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isToday
                    ? 'bg-navy-800/80 border-aqua-400/60 shadow-glow-cyan'
                    : 'bg-navy-950/60 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold ${
                      isToday ? 'w-6 h-6 rounded-full bg-aqua-500 text-navy-950 flex items-center justify-center font-mono' : 'text-slate-300 font-mono'
                    }`}
                  >
                    {dayNum}
                  </span>
                  {dayAppts.length > 0 && (
                    <span className="text-[10px] font-bold text-aqua-400 px-1.5 py-0.5 rounded-md bg-navy-900 border border-aqua-400/30">
                      {dayAppts.length}
                    </span>
                  )}
                </div>

                {/* Appointment Tags */}
                <div className="space-y-1 mt-1 overflow-y-auto max-h-[65px] scrollbar-none">
                  {dayAppts.map((a) => (
                    <div
                      key={a.id}
                      className={`px-2 py-1 rounded-lg text-[10px] font-semibold truncate ${
                        a.status === 'CONFIRMED'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : a.status === 'COMPLETED'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                      title={`${a.timeSlot} - ${a.patientName} (${a.treatment.name})`}
                    >
                      <span className="font-mono">{a.timeSlot}</span> • {a.patientName}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
