import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { ParentStrip } from '@/components/landing/ParentStrip';
import { VisionMission } from '@/components/landing/VisionMission';
import { BuStackedSections } from '@/components/landing/BuStackedSections';
import { MainProductsGrid } from '@/components/landing/MainProductsGrid';
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
        <MainProductsGrid />
        <BuStackedSections projectsByBu={{ farm, factory, corporate }} />
      </main>
      <Footer />
    </>
  );
}
