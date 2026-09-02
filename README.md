# Roots Super Speciality Dental Clinic 🦷

> **Ultra-Premium 3D Cinematic Dental Clinic Website + WhatsApp + 6-Step Appointment Booking + Dynamic Admin CMS**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

---

## 📍 Clinic Information
* **Name**: ROOTS SUPER SPECIALITY DENTAL CLINIC
* **Location**: Darga Road, near NIT, Revenue Colony, Subedari, Kazipet, Hanamkonda, Telangana 506004
* **Trust Metrics**: 5.0 Google Rating (66+ Verified Patient Reviews)
* **Working Hours**: Mon–Sat: 09:30 AM – 08:30 PM | Sun: 10:00 AM – 02:00 PM

---

## 🌟 Key Features

### 1. 🔬 3D WebGL Dental Engine & Anatomical Explorer
- Procedural 3D human tooth mesh with realistic crown cusps, bifurcated roots, translucent enamel shader, ambient medical lighting, and mouse-driven parallax.
- **"Explore Better Dental Care" Interactive Explorer**: 5 interactive anatomical hotspots (*Enamel, Dentin, Pulp, Root, Gum*) with *Layered Cross-Section*, *Natural Enamel*, and *Digital Wireframe* diagnostic views.

### 2. 📅 6-Step Appointment Booking Engine
- **Step 1**: Select Treatment from 10 confirmed clinical services.
- **Step 2**: Select Doctor or "Any Available Specialist".
- **Step 3**: Interactive Date picker with past dates disabled & holiday check.
- **Step 4**: Dynamic real-time slot calculation checking clinic hours and occupied slots.
- **Step 5**: Patient Details with 10-digit Indian mobile validation and contact preference.
- **Step 6**: Unique reference ID generation (`ROOTS-2026-XXXX`), confetti celebration, and instant WhatsApp confirmation.
- **Anti-Collision Guard**: Prevents double-booking for the same specialist/date/time.

### 3. 💬 Contextual WhatsApp & Telephony Conversion System
- Context-aware dynamic WhatsApp links for general inquiries, specific treatments, emergency care, and appointment verification.
- Floating WhatsApp widget with pulse ring and interactive hover tooltip.
- Persistent mobile bottom action bar: **Call Now** (`tel:`), **WhatsApp**, and **Book Appointment**.

### 4. 🛡️ Dynamic Admin CMS Dashboard
- **Authentication**: JWT with HTTP-only session cookies and bcrypt password hashing.
- **Dashboard Overview**: KPI cards for Total Bookings, Pending, Confirmed, Completed, and Cancelled appointments.
- **Appointments Workflow**: Filter, search, and transition statuses (`PENDING` → `CONFIRMED` → `COMPLETED` → `CANCELLED` → `RESCHEDULED`).
- **Calendar Schedule**: Day, Week, and Month visual views.
- **CMS Editors**: Treatments, Doctors, Verified Reviews, Categorized Gallery, FAQs, and Clinic Settings (hours, phone, WhatsApp, live Open/Closed status override).

### 5. 🔍 SEO & Healthcare Compliance
- Full `DentalClinic` / `LocalBusiness` JSON-LD schema.
- Dynamic XML sitemap (`/sitemap.xml`) and `robots.txt`.
- Non-diagnostic medical disclaimers throughout.

---

## 🛠️ Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Medical Luxury Theme)
- **3D Graphics**: Three.js / WebGL
- **Animation**: Framer Motion & Canvas Confetti
- **ORM & Database**: Prisma ORM with SQLite (PostgreSQL compatible)
- **Icons**: Lucide React
- **Auth**: JWT + Bcrypt

---

## 🚀 Quick Start

### 1. Clone and Install Dependencies
```bash
git clone https://github.com/madisettisandeep-art/Roots-Dental-Clinic.git
cd Roots-Dental-Clinic
npm install
```

### 2. Database Setup & Seeding
```bash
npx prisma db push
npm run prisma:seed
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Admin Portal Credentials
* **Portal URL**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
* **Email**: `admin@rootsdental.com`
* **Password**: `RootsAdmin2026!`

---

## 📄 License
MIT License. Built for Roots Super Speciality Dental Clinic.
