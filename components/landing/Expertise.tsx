import { SectionHeader } from '@/components/ui/SectionHeader';
import { GradientCard } from '@/components/ui/GradientCard';

const domains = [
  {
    image: '/images/geospatial_ai.jpg',
    title: 'Geospatial AI',
    desc: 'Sentinel-2, GEE, NDVI zoning, VRT guidance, UAV fusion.',
  },
  {
    image: '/images/industrial_ml.png',
    title: 'Industrial ML',
    desc: 'OSIsoft PI streams, APC, SPC, time-series forecasting.',
  },
  {
    image: '/images/data_platform.png',
    title: 'Data Platform',
    desc: 'Medallion lakehouse, DQ gates, lineage, RLS governance.',
  },
  {
    image: '/images/agentic_genai.png',
    title: 'Agentic GenAI',
    desc: 'LangChain, n8n, multi-LLM evaluation and orchestration.',
  },
];

const differentiators = [
  { title: '9 Live Products', desc: 'Portfolio depth, not a single-bet demo.' },
  { title: 'Shared Gold Zone', desc: 'Every product builds on the same governed data.' },
  { title: 'Applied Research', desc: 'CRISP-DM, DMAIC, Design Science Research — rigorous by default.' },
  { title: 'ISO 42001 Bound', desc: 'Governance embedded before scale, not retrofitted.' },
  { title: 'Own-Build + Vendor', desc: 'Buy to accelerate, build to compound IP.' },
  { title: 'Measurable KPIs', desc: 'Each project ships with a validated success metric.' },
];

const pipelineStages = [
  'Ingest (SAP · PI · Sentinel · CV)',
  'Raw Zone (S3)',
  'Silver (Cleansed)',
  'Gold (KPI marts)',
  'AI Services (APC · VLM · LLM · Geo)',
  'Products (9)',
];

export function Expertise() {
  return (
    <section id="expertise" className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <SectionHeader
          chip="Deep Tech Expertise"
          title="Four technical domains, one shared foundation."
          subtitle="Our products don't compete for context — they feed the same Gold Zone and reuse the same governance."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {domains.map((d) => (
            <GradientCard key={d.title} src={d.image} alt={d.title} minHeight={260}>
              <div className="text-xs font-semibold uppercase tracking-widest text-blue-200">Domain</div>
              <h3 className="mt-2 font-serif text-2xl">{d.title}</h3>
              <p className="mt-2 text-sm text-slate-200">{d.desc}</p>
            </GradientCard>
          ))}
        </div>

        {/* Pipeline */}
        <div className="mt-20 rounded-3xl border border-slate-200 bg-white p-6 md:p-10">
          <div className="text-xs uppercase tracking-widest text-slate-500">Shared Data Pipeline</div>
          <div className="mt-6 flex flex-wrap items-center gap-2 md:gap-3">
            {pipelineStages.map((stage, i) => (
              <div key={stage} className="flex items-center gap-2 md:gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-navy-900 md:px-4 md:text-sm">
                  {stage}
                </div>
                {i < pipelineStages.length - 1 && (
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-slate-400">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.06 10 7.23 6.29a.75.75 0 111.04-1.08l4.39 4.25a.75.75 0 010 1.08l-4.39 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Differentiators */}
        <div className="mt-20">
          <SectionHeader
            chip="Cutting-Edge Differentiators"
            title="What compounds this portfolio."
            chipTone="blue"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((d) => (
              <div key={d.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="font-serif text-xl text-navy-900">{d.title}</div>
                <div className="mt-2 text-sm text-slate-600">{d.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
