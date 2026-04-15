import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { ParentStrip } from '@/components/landing/ParentStrip';
import { VisionMission } from '@/components/landing/VisionMission';
import { BuTabsSection } from '@/components/landing/BuTabsSection';
import { Expertise } from '@/components/landing/Expertise';
import { TractionGrid } from '@/components/landing/TractionGrid';
import { ContactSection } from '@/components/landing/ContactSection';
import { getProjectsByBu } from '@/lib/projects';

export default async function Home() {
  const [farm, factory, corporate] = await Promise.all([
    getProjectsByBu('farm'),
    getProjectsByBu('factory'),
    getProjectsByBu('corporate'),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ParentStrip />
        <VisionMission />
        <BuTabsSection projectsByBu={{ farm, factory, corporate }} />
        <Expertise />
        <TractionGrid />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
