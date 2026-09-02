'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarDays,
  CalendarCheck,
  Stethoscope,
  Users,
  Star,
  Image as ImageIcon,
  HelpCircle,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Clock,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null);

  // If on login page, render children directly
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) return;

    fetch('/api/auth/me')
      .then((res) => {
        if (!res.ok) {
          router.push('/admin/login');
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.user) setAdminUser(data.user);
      })
      .catch(() => {
        router.push('/admin/login');
      });
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Appointments', href: '/admin/appointments', icon: CalendarCheck },
    { name: 'Calendar', href: '/admin/calendar', icon: CalendarDays },
    { name: 'Treatments CMS', href: '/admin/treatments', icon: Stethoscope },
    { name: 'Doctors CMS', href: '/admin/doctors', icon: Users },
    { name: 'Reviews CMS', href: '/admin/reviews', icon: Star },
    { name: 'Gallery CMS', href: '/admin/gallery', icon: ImageIcon },
    { name: 'FAQs CMS', href: '/admin/faqs', icon: HelpCircle },
    { name: 'Clinic Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col lg:flex-row">
      {/* Mobile Top Header */}
      <div className="lg:hidden p-4 bg-navy-900 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center font-black text-navy-950 text-sm">
            R
          </div>
          <span className="font-bold text-sm text-white font-display">Roots Admin CMS</span>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl bg-navy-800 text-white"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 z-40 h-screen w-64 bg-navy-900/95 lg:bg-navy-900 border-r border-white/10 p-5 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl ${
          sidebarOpen ? 'left-0' : '-left-64 lg:left-0'
        }`}
      >
        <div className="space-y-6">
          {/* Brand header */}
          <Link href="/admin" className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-medical-blue p-0.5 shadow-glow-cyan">
              <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-aqua-300 to-cyan-400 font-display">
                  R
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black text-white font-display">ROOTS DENTAL</span>
              <span className="text-[10px] uppercase font-bold text-aqua-400">Admin Control</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-aqua-500 text-navy-950 font-bold shadow-glow-cyan'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-navy-950' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User & Sign Out */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-aqua-400" />
              View Public Website
            </span>
          </Link>

          <div className="flex items-center justify-between px-2 pt-2 text-xs">
            <div className="truncate pr-2">
              <span className="text-white font-bold block truncate">
                {adminUser?.name || 'Administrator'}
              </span>
              <span className="text-[10px] text-slate-400 block truncate">
                {adminUser?.email || 'admin@rootsdental.com'}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 transition-colors shrink-0"
              title="Sign Out"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top bar */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-navy-900/60 border-b border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-aqua-400 uppercase tracking-wider">
              Roots Super Speciality CMS
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-xs text-slate-300">
              Kazipet, Hanamkonda, Telangana 506004
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-emerald-300 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Database Active (SQLite)
            </span>
          </div>
        </header>

        <main className="p-4 sm:p-8 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
