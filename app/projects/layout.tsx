import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar forceSolid={false} />
      {children}
      <Footer />
    </>
  );
}
