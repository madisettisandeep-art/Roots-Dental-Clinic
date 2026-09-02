'use client';

import React, { useState, useEffect } from 'react';
import {
  CalendarCheck,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  MessageSquare,
  Phone,
  Trash2,
  ChevronDown,
  RefreshCw,
  Eye,
  Calendar,
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
  notes?: string;
  treatment: { name: string };
  doctor?: { id: string; name: string };
}

export default function AppointmentsAdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

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

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchAppointments();
        if (selectedAppointment && selectedAppointment.id === id) {
          setSelectedAppointment({ ...selectedAppointment, status: newStatus });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this appointment record?')) return;
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchAppointments();
        setSelectedAppointment(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = appointments.filter((appt) => {
    const matchesStatus = statusFilter === 'ALL' || appt.status === statusFilter;
    const matchesSearch =
      searchTerm === '' ||
      appt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.phone.includes(searchTerm) ||
      appt.appointmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.treatment.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
      case 'RESCHEDULED':
        return <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-[10px] font-bold">RESCHEDULED</span>;
      case 'NO_SHOW':
        return <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-white/10 text-[10px] font-bold">NO SHOW</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Appointment Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Search, filter, update statuses, and follow up with patients.
          </p>
        </div>

        <button
          onClick={fetchAppointments}
          className="px-4 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-white/10 transition-colors self-start"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="p-4 rounded-2xl bg-navy-900/80 border border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search patient, ID, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-navy-950 border border-white/20 text-white text-xs focus:outline-none focus:border-aqua-400"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-aqua-500 text-navy-950 border-aqua-400 font-bold shadow-glow-cyan'
                  : 'bg-navy-950 text-slate-300 border-white/10 hover:border-white/25'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table & Details Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table Column */}
        <div className={`${selectedAppointment ? 'lg:col-span-8' : 'lg:col-span-12'} p-6 rounded-3xl bg-navy-900/80 border border-white/10 overflow-hidden`}>
          {loading ? (
            <div className="py-16 text-center text-slate-400 text-xs flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-aqua-400 border-t-transparent rounded-full animate-spin" />
              <span>Loading appointments...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-xs">
              No appointments matching your criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="pb-3 px-2">ID</th>
                    <th className="pb-3 px-2">Patient</th>
                    <th className="pb-3 px-2">Phone</th>
                    <th className="pb-3 px-2">Treatment</th>
                    <th className="pb-3 px-2">Schedule</th>
                    <th className="pb-3 px-2">Status</th>
                    <th className="pb-3 px-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map((appt) => (
                    <tr
                      key={appt.id}
                      onClick={() => setSelectedAppointment(appt)}
                      className={`hover:bg-white/[0.04] transition-colors cursor-pointer ${
                        selectedAppointment?.id === appt.id ? 'bg-white/[0.06]' : ''
                      }`}
                    >
                      <td className="py-3 px-2 font-mono font-bold text-aqua-400">
                        {appt.appointmentId}
                      </td>
                      <td className="py-3 px-2 font-semibold text-white">
                        {appt.patientName}
                      </td>
                      <td className="py-3 px-2 text-slate-300">
                        {appt.phone}
                      </td>
                      <td className="py-3 px-2 text-slate-200">
                        {appt.treatment.name}
                      </td>
                      <td className="py-3 px-2">
                        <div className="text-white font-medium">{appt.appointmentDate}</div>
                        <div className="text-aqua-300 text-[11px]">{appt.timeSlot}</div>
                      </td>
                      <td className="py-3 px-2">
                        {getStatusBadge(appt.status)}
                      </td>
                      <td className="py-3 px-2 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedAppointment(appt)}
                            className="p-1.5 rounded-lg bg-navy-800 text-slate-300 hover:text-white"
                            title="View Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <a
                            href={getWhatsAppLink({
                              phone: appt.phone,
                              appointmentId: appt.appointmentId,
                              patientName: appt.patientName,
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Selected Appointment Detail Sidebar */}
        {selectedAppointment && (
          <div className="lg:col-span-4 p-6 rounded-3xl bg-navy-900 border border-aqua-400/30 backdrop-blur-xl shadow-glass space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-aqua-400 uppercase">
                  Appointment Card
                </span>
                <h3 className="text-lg font-bold text-white font-display">
                  {selectedAppointment.appointmentId}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕ Close
              </button>
            </div>

            {/* Info list */}
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-navy-950/80 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Patient</span>
                <div className="text-sm font-bold text-white">{selectedAppointment.patientName}</div>
                <div className="text-slate-300">{selectedAppointment.phone}</div>
                {selectedAppointment.email && (
                  <div className="text-slate-400 text-[11px]">{selectedAppointment.email}</div>
                )}
              </div>

              <div className="p-3 rounded-xl bg-navy-950/80 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Clinical Care</span>
                <div className="font-semibold text-white">{selectedAppointment.treatment.name}</div>
                <div className="text-slate-400 text-[11px]">
                  Doctor: {selectedAppointment.doctor?.name || 'Any Specialist'}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-navy-950/80 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Schedule</span>
                <div className="font-bold text-aqua-300">
                  {selectedAppointment.appointmentDate} • {selectedAppointment.timeSlot}
                </div>
                <div className="text-slate-400 text-[11px]">
                  Contact Preference: {selectedAppointment.preferredContact}
                </div>
              </div>

              {selectedAppointment.message && (
                <div className="p-3 rounded-xl bg-navy-950/80 border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Patient Note</span>
                  <div className="text-slate-300 italic">{selectedAppointment.message}</div>
                </div>
              )}
            </div>

            {/* Status Modification Buttons */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                Change Status:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleUpdateStatus(selectedAppointment.id, 'CONFIRMED')}
                  className="py-2 px-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[11px] uppercase transition-colors"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedAppointment.id, 'COMPLETED')}
                  className="py-2 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] uppercase transition-colors"
                >
                  Complete
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedAppointment.id, 'RESCHEDULED')}
                  className="py-2 px-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] uppercase transition-colors"
                >
                  Reschedule
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedAppointment.id, 'CANCELLED')}
                  className="py-2 px-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] uppercase transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center gap-2">
              <a
                href={getWhatsAppLink({
                  phone: selectedAppointment.phone,
                  appointmentId: selectedAppointment.appointmentId,
                  patientName: selectedAppointment.patientName,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase text-center flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Patient</span>
              </a>

              <button
                onClick={() => handleDelete(selectedAppointment.id)}
                className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30"
                title="Delete Record"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
