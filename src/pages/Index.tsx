import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

// Lazy load below-the-fold components
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const PortfolioSection = lazy(() => import("@/components/PortfolioSection"));
const CaseStudiesSection = lazy(() => import("@/components/CaseStudiesSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

// Loading component for sections
const SectionLoader = () => (
  <div className="py-24 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />

    <Suspense fallback={<SectionLoader />}>
      <ServicesSection />
    </Suspense>

    <Suspense fallback={<SectionLoader />}>
      <CaseStudiesSection />
    </Suspense>

    <Suspense fallback={<SectionLoader />}>
      <PortfolioSection />
    </Suspense>

    <Suspense fallback={<SectionLoader />}>
      <AboutSection />
    </Suspense>

    <Suspense fallback={<SectionLoader />}>
      <TestimonialsSection />
    </Suspense>

    <Suspense fallback={<SectionLoader />}>
      <FAQSection />
    </Suspense>

    <Suspense fallback={<SectionLoader />}>
      <ContactSection />
    </Suspense>

    <Suspense fallback={<SectionLoader />}>
      <Footer />
    </Suspense>
  </div>
);

export default Index;
