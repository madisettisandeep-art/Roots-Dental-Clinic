import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import AppointmentModal from '@/components/booking/AppointmentModal';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Roots Super Speciality Dental Clinic | Hanamkonda & Kazipet',
    template: '%s | Roots Super Speciality Dental Clinic',
  },
  description:
    'Advanced 3D dental care in Kazipet & Hanamkonda near NIT Warangal. Specializing in microscopic root canal treatment, dental implants, clear aligners, teeth cleaning & cosmetic dentistry. 5.0 Google Rated.',
  keywords: [
    'Roots Dental Clinic',
    'Roots Super Speciality Dental Clinic',
    'Dentist in Kazipet',
    'Dental Clinic in Hanamkonda',
    'Best Dental Clinic Warangal',
    'Root Canal Treatment Hanamkonda',
    'Dental Implants Kazipet',
    'Teeth Whitening Warangal',
    'Braces and Aligners Kazipet',
    'Dentist near NIT Warangal',
  ],
  authors: [{ name: 'Roots Super Speciality Dental Clinic' }],
  creator: 'Roots Super Speciality Dental Clinic',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://rootsdentalclinic.in',
    title: 'Roots Super Speciality Dental Clinic | Advanced Dental Care in Hanamkonda',
    description:
      'Experience specialized dental care with precision, comfort, and advanced technology on Darga Road, near NIT Kazipet.',
    siteName: 'Roots Super Speciality Dental Clinic',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Roots Super Speciality Dental Clinic - Advanced Operatory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roots Super Speciality Dental Clinic',
    description:
      'Advanced 3D dental care in Kazipet & Hanamkonda near NIT. Precision root canal, implants & family dentistry.',
    images: ['https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&h=630&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org DentalClinic Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DentalClinic',
    name: 'Roots Super Speciality Dental Clinic',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&h=630&q=80',
    telephone: '+91 98765 43210',
    email: 'contact@rootsdental.com',
    url: 'https://rootsdentalclinic.in',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Darga Road, near NIT, Revenue Colony, Subedari',
      addressLocality: 'Kazipet, Hanamkonda',
      addressRegion: 'Telangana',
      postalCode: '506004',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 17.9944648,
      longitude: 79.5312384,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:30',
        closes: '20:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:00',
        closes: '14:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '66',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Kazipet' },
      { '@type': 'AdministrativeArea', name: 'Hanamkonda' },
      { '@type': 'AdministrativeArea', name: 'Warangal' },
      { '@type': 'AdministrativeArea', name: 'Subedari' },
    ],
    priceRange: '₹₹',
    medicalSpecialty: 'Dentistry',
  };

  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-navy-950 text-slate-100 selection:bg-aqua-500 selection:text-navy-950 font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileBottomNav />
        <FloatingWhatsApp />
        <AppointmentModal />
      </body>
    </html>
  );
}
