import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import TrustBar from '@/components/home/TrustBar';
import AboutSection from '@/components/home/AboutSection';
import AnatomicalToothExplorer from '@/components/three/AnatomicalToothExplorer';
import TreatmentsExplorer from '@/components/home/TreatmentsExplorer';
import WhyRoots from '@/components/home/WhyRoots';
import PatientJourney from '@/components/home/PatientJourney';
import DoctorShowcase from '@/components/home/DoctorShowcase';
import ReviewsCarousel from '@/components/home/ReviewsCarousel';
import BeforeAfterSlider from '@/components/home/BeforeAfterSlider';
import ClinicGallery from '@/components/home/ClinicGallery';
import EmergencyBanner from '@/components/home/EmergencyBanner';
import FAQAccordion from '@/components/home/FAQAccordion';
import LocationMapSection from '@/components/home/LocationMapSection';
import AppointmentCTA from '@/components/home/AppointmentCTA';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Full-screen Cinematic Hero */}
      <HeroSection />

      {/* 2. Trust Metrics Bar */}
      <TrustBar />

      {/* 3. About Roots Split Section */}
      <AboutSection />

      {/* 4. Interactive 3D Dental Experience (Anatomical Explorer) */}
      <AnatomicalToothExplorer />

      {/* 5. Treatments Explorer */}
      <TreatmentsExplorer />

      {/* 6. Why Patients Choose Roots */}
      <WhyRoots />

      {/* 7. Patient Journey Timeline */}
      <PatientJourney />

      {/* 8. Doctors Showcase */}
      <DoctorShowcase />

      {/* 9. Patient Reviews Carousel */}
      <ReviewsCarousel />

      {/* 10. Before & After Interactive Slider */}
      <BeforeAfterSlider />

      {/* 11. Clinic & Facility Gallery */}
      <ClinicGallery />

      {/* 12. Urgent Dental Emergency Banner */}
      <EmergencyBanner />

      {/* 13. Dynamic FAQ Accordion */}
      <FAQAccordion />

      {/* 14. Interactive Map & Contact Section */}
      <LocationMapSection />

      {/* 15. Final High-Conversion Appointment CTA */}
      <AppointmentCTA />
    </div>
  );
}
