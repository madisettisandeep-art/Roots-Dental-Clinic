'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Users,
  Stethoscope,
  ArrowUpRight,
  MessageSquare,
  Phone,
  RefreshCw,
} from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';

interface Appointment {
  id: string;
  appointmentId: string;
  patientName: string;
  phone: string;
  email?: string;
  preferredContact: string;
  appointmentDate: string;
  timeSlot: string;
  status: string;
  message?: string;
  source: string;
  treatment: { name: string };
  doctor?: { name: string };
}

export default function AdminDashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/appointments');
      const data = await res.json();
      if (data.appointments) {
        setAppointments(data.appointments);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const total = appointments.length;
  const pending = appointments.filter((a) => a.status === 'PENDING').length;
  const confirmed = appointments.filter((a) => a.status === 'CONFIRMED').length;
  const completed = appointments.filter((a) => a.status === 'COMPLETED').length;
  const cancelled = appointments.filter((a) => a.status === 'CANCELLED' || a.status === 'NO_SHOW').length;

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchAppointments();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-bold">PENDING</span>;
      case 'CONFIRMED':
        return <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold">CONFIRMED</span>;
      case 'COMPLETED':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">COMPLETED</span>;
      case 'CANCELLED':
        return <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30 text-[10px] font-bold">CANCELLED</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold">{status}</span>;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time appointment metrics and recent bookings for Roots Super Speciality Dental Clinic.
          </p>
        </div>

        <button
          onClick={fetchAppointments}
          className="px-4 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-white/10 transition-colors self-start"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-white/10 space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Bookings
          </span>
          <div className="text-2xl sm:text-3xl font-black text-white font-display">
            {total}
          </div>
          <span className="text-[10px] text-slate-500 block">All-time appointments</span>
        </div>

        <div className="p-5 rounded-2xl bg-navy-900/80 border border-amber-500/20 space-y-2">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
            Pending
          </span>
          <div className="text-2xl sm:text-3xl font-black text-amber-300 font-display">
            {pending}
          </div>
          <span className="text-[10px] text-slate-500 block">Awaiting confirmation</span>
        </div>

        <div className="p-5 rounded-2xl bg-navy-900/80 border border-cyan-500/20 space-y-2">
          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
            Confirmed
          </span>
          <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-display">
            {confirmed}
          </div>
          <span className="text-[10px] text-slate-500 block">Scheduled visits</span>
        </div>

        <div className="p-5 rounded-2xl bg-navy-900/80 border border-emerald-500/20 space-y-2">
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
            Completed
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-display">
            {completed}
          </div>
          <span className="text-[10px] text-slate-500 block">Treatments finished</span>
        </div>

        <div className="p-5 rounded-2xl bg-navy-900/80 border border-rose-500/20 space-y-2 col-span-2 lg:col-span-1">
          <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block">
            Cancelled
          </span>
          <div className="text-2xl sm:text-3xl font-black text-rose-300 font-display">
            {cancelled}
          </div>
          <span className="text-[10px] text-slate-500 block">Cancelled / No-shows</span>
        </div>
      </div>

      {/* Recent Appointments Table Card */}
      <div className="p-6 rounded-3xl bg-navy-900/80 border border-white/10 backdrop-blur-xl shadow-glass space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white font-display">Recent Appointments</h2>
            <p className="text-xs text-slate-400">Incoming patient consultation requests</p>
          </div>

          <Link
            href="/admin/appointments"
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-aqua-400" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-400 text-xs flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-aqua-400 border-t-transparent rounded-full animate-spin" />
            <span>Loading appointments...</span>
          </div>
        ) : appointments.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No appointments found. New patient bookings will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="pb-3 px-2">ID</th>
                  <th className="pb-3 px-2">Patient</th>
                  <th className="pb-3 px-2">Contact</th>
                  <th className="pb-3 px-2">Treatment</th>
                  <th className="pb-3 px-2">Schedule</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {appointments.slice(0, 6).map((appt) => (
                  <tr key={appt.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-2 font-mono font-bold text-aqua-400">
                      {appt.appointmentId}
                    </td>
                    <td className="py-3 px-2 font-semibold text-white">
                      {appt.patientName}
                    </td>
                    <td className="py-3 px-2">
                      <div className="text-slate-300">{appt.phone}</div>
                      <span className="text-[10px] text-slate-500">{appt.preferredContact}</span>
                    </td>
                    <td className="py-3 px-2 text-slate-200">
                      {appt.treatment?.name}
                    </td>
                    <td className="py-3 px-2">
                      <div className="text-white font-medium">{appt.appointmentDate}</div>
                      <div className="text-aqua-300 text-[11px]">{appt.timeSlot}</div>
                    </td>
                    <td className="py-3 px-2">
                      {getStatusBadge(appt.status)}
                    </td>
                    <td className="py-3 px-2 text-right space-x-1.5">
                      {appt.status === 'PENDING' && (
                        <button
                          onClick={() => handleUpdateStatus(appt.id, 'CONFIRMED')}
                          className="px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[10px] uppercase transition-colors"
                        >
                          Confirm
                        </button>
                      )}
                      {appt.status === 'CONFIRMED' && (
                        <button
                          onClick={() => handleUpdateStatus(appt.id, 'COMPLETED')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] uppercase transition-colors"
                        >
                          Complete
                        </button>
                      )}
                      <a
                        href={getWhatsAppLink({
                          phone: appt.phone,
                          appointmentId: appt.appointmentId,
                          patientName: appt.patientName,
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block p-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
