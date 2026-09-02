-- ========================================================
-- ROOTS SUPER SPECIALITY DENTAL CLINIC - SUPABASE POSTGRESQL SCHEMA
-- Can be pasted directly into Supabase Dashboard -> SQL Editor
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Admin Table
CREATE TABLE IF NOT EXISTS "Admin" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT DEFAULT 'ADMIN' NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 2. Doctor Table
CREATE TABLE IF NOT EXISTS "Doctor" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "name" TEXT NOT NULL,
    "qualifications" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "availableDays" TEXT DEFAULT 'Mon,Tue,Wed,Thu,Fri,Sat' NOT NULL,
    "active" BOOLEAN DEFAULT true NOT NULL,
    "sortOrder" INTEGER DEFAULT 0 NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 3. Treatment Table
CREATE TABLE IF NOT EXISTS "Treatment" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "slug" TEXT UNIQUE NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "indications" TEXT NOT NULL,
    "procedureSteps" TEXT NOT NULL,
    "benefits" TEXT NOT NULL,
    "recoveryInfo" TEXT NOT NULL,
    "faqs" TEXT NOT NULL,
    "iconName" TEXT DEFAULT 'Sparkles' NOT NULL,
    "imageUrl" TEXT,
    "featured" BOOLEAN DEFAULT false NOT NULL,
    "active" BOOLEAN DEFAULT true NOT NULL,
    "sortOrder" INTEGER DEFAULT 0 NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 4. Appointment Table
CREATE TABLE IF NOT EXISTS "Appointment" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "appointmentId" TEXT UNIQUE NOT NULL,
    "patientName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "preferredContact" TEXT DEFAULT 'WHATSAPP' NOT NULL,
    "treatmentId" TEXT NOT NULL REFERENCES "Treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    "doctorId" TEXT REFERENCES "Doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    "appointmentDate" TEXT NOT NULL,
    "timeSlot" TEXT NOT NULL,
    "status" TEXT DEFAULT 'PENDING' NOT NULL,
    "message" TEXT,
    "source" TEXT DEFAULT 'WEBSITE' NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS "Appointment_appointmentDate_timeSlot_idx" ON "Appointment"("appointmentDate", "timeSlot");
CREATE INDEX IF NOT EXISTS "Appointment_status_idx" ON "Appointment"("status");

-- 5. Review Table
CREATE TABLE IF NOT EXISTS "Review" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "author" TEXT NOT NULL,
    "rating" INTEGER DEFAULT 5 NOT NULL,
    "comment" TEXT NOT NULL,
    "treatmentCategory" TEXT,
    "date" TEXT NOT NULL,
    "verified" BOOLEAN DEFAULT true NOT NULL,
    "source" TEXT DEFAULT 'Google' NOT NULL,
    "featured" BOOLEAN DEFAULT true NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 6. GalleryItem Table
CREATE TABLE IF NOT EXISTS "GalleryItem" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "caption" TEXT,
    "sortOrder" INTEGER DEFAULT 0 NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 7. BeforeAfter Table
CREATE TABLE IF NOT EXISTS "BeforeAfter" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "title" TEXT NOT NULL,
    "treatmentCategory" TEXT NOT NULL,
    "beforeImage" TEXT NOT NULL,
    "afterImage" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "consentVerified" BOOLEAN DEFAULT true NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 8. FAQ Table
CREATE TABLE IF NOT EXISTS "FAQ" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT DEFAULT 'General' NOT NULL,
    "sortOrder" INTEGER DEFAULT 0 NOT NULL,
    "active" BOOLEAN DEFAULT true NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 9. ClinicSetting Table
CREATE TABLE IF NOT EXISTS "ClinicSetting" (
    "id" TEXT PRIMARY KEY DEFAULT 'default',
    "clinicName" TEXT DEFAULT 'ROOTS SUPER SPECIALITY DENTAL CLINIC' NOT NULL,
    "tagline" TEXT DEFAULT 'Advanced Dental Care • Precision, Comfort & Technology' NOT NULL,
    "phone" TEXT DEFAULT '+91 98765 43210' NOT NULL,
    "whatsAppNumber" TEXT DEFAULT '+91 98765 43210' NOT NULL,
    "email" TEXT DEFAULT 'contact@rootsdental.com' NOT NULL,
    "emergencyPhone" TEXT DEFAULT '+91 98765 43210' NOT NULL,
    "address" TEXT DEFAULT 'Darga Road, near NIT, Revenue Colony, Subedari, Kazipet, Hanamkonda, Telangana 506004' NOT NULL,
    "googleMapsUrl" TEXT DEFAULT 'https://maps.google.com/?q=Roots+Super+Speciality+Dental+Clinic+Darga+Road+Kazipet+Hanamkonda+506004' NOT NULL,
    "embedMapUrl" TEXT DEFAULT 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.675765038162!2d79.531238475179!3d17.994464883002636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a334f59c8888889%3A0x8888888888888888!2sRoots%20Super%20Speciality%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin' NOT NULL,
    "noticeBanner" TEXT,
    "isOpenOverride" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 10. OpeningHour Table
CREATE TABLE IF NOT EXISTS "OpeningHour" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "dayOfWeek" TEXT NOT NULL,
    "openTime" TEXT NOT NULL,
    "closeTime" TEXT NOT NULL,
    "isClosed" BOOLEAN DEFAULT false NOT NULL,
    "sortOrder" INTEGER DEFAULT 0 NOT NULL
);

-- 11. Holiday Table
CREATE TABLE IF NOT EXISTS "Holiday" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "date" TEXT NOT NULL,
    "reason" TEXT NOT NULL
);

-- 12. ContactEnquiry Table
CREATE TABLE IF NOT EXISTS "ContactEnquiry" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "status" TEXT DEFAULT 'NEW' NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 13. AuditLog Table
CREATE TABLE IF NOT EXISTS "AuditLog" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "details" TEXT,
    "adminEmail" TEXT,
    "timestamp" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
