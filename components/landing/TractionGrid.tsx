import { SectionHeader } from '@/components/ui/SectionHeader';
import { KpiCard } from '@/components/ui/KpiCard';

const tractionKpis = [
  { value: '9', label: 'Products in portfolio', highlight: 'blue' as const },
  { value: '฿500M+', label: 'Investment pipeline', highlight: 'green' as const },
  { value: '1.2M', label: 'Growers reachable' },
  { value: '99.5%', label: 'Platform uptime target' },
  { value: '<15m', label: 'Report refresh SLA' },
  { value: '7', label: 'BUs feeding Gold Zone' },
  { value: '4', label: 'LLM classes evaluated' },
  { value: '18mo', label: 'ISO 42001 readiness' },
];

export function TractionGrid() {
  return (
    <section id="traction" className="bg-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <SectionHeader
          dark
          chip="Traction"
          chipTone="navy"
          title="Early indicators, operating metrics, and scale."
          subtitle="These are the numbers we use internally to make the next investment decision."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {tractionKpis.map((k) => (
            <KpiCard key={k.label} kpi={k} dark />
          ))}
        </div>
      </div>
    </section>
  );
}
