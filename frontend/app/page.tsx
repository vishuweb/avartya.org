/**
 * app/page.tsx — Avartya NGO Homepage
 *
 * Assembles all section components in order:
 * Navbar → Hero → SDG → Impact → Programmes → CTA → Newsletter → Footer
 *
 * Future: Each section can be wired to dynamic API data
 * by replacing static props with server-side fetches.
 */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SDGSection from "@/components/SDGSection";
import ImpactSection from "@/components/ImpactSection";
import ProgrammesSection from "@/components/ProgrammesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ImpactStorySection from "@/components/ImpactStorySection";

export default function HomePage() {
  return (
    <>
      {/* ── Sticky Navigation ── */}
      <Navbar />

      <main id="main-content">
        <HeroSection />
        <SDGSection />
        <ImpactStorySection />
        <ImpactSection />
        <ProgrammesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
