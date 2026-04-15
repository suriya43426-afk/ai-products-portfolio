import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { ParentStrip } from '@/components/landing/ParentStrip';
import { VisionMission } from '@/components/landing/VisionMission';
import { BuSection } from '@/components/landing/BuSection';
import { Expertise } from '@/components/landing/Expertise';
import { TractionGrid } from '@/components/landing/TractionGrid';
import { ContactSection } from '@/components/landing/ContactSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ParentStrip />
        <VisionMission />
        <div id="portfolio">
          <BuSection bu="farm" anchor="smart-agriculture" />
          <BuSection bu="factory" anchor="smart-manufacturing" />
          <BuSection bu="corporate" anchor="ai-data-governance" />
        </div>
        <Expertise />
        <TractionGrid />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
