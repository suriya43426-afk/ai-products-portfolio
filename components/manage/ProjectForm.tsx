'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { ProjectData, PaperRevision } from '@/types/project';
import { FileUpload } from './FileUpload';
import { PapersManager } from './PapersManager';
import { TYPE_LABEL } from '@/lib/constants';

type Mode = 'create' | 'edit';

const emptyProject: ProjectData = {
  id: 0,
  slug: '',
  title: '',
  subtitle: '',
  description: '',
  image: '/images/factory.jpg',
  heroImage: '/images/factory.jpg',
  type: 'ownbuild',
  businessUnit: 'factory',
  status: 'planning',
  statusLabel: 'Planning',
  techTags: [],
  techStack: [],
  kpis: [],
  metricNote: '',
  research: {
    problemStatement: '',
    objectives: [],
    scope: '',
    approach: { type: '', framework: '', description: '', phases: [] },
    dataCollection: { sources: [], volume: '', frequency: '', preprocessing: [] },
    analysisMethod: { primary: '', tools: [], metrics: [] },
    validation: { method: '', baseline: '', successCriteria: [] },
  },
  timeline: [],
  risks: [],
  budget: [],
  dependsOn: [],
  feedsInto: [],
  relatedProjects: [],
};

function csvToStrings(v: string): string[] {
  return v
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function csvToNumbers(v: string): number[] {
  return csvToStrings(v)
    .map((s) => Number(s))
    .filter((n) => Number.isFinite(n));
}

export function ProjectForm({ mode, initial }: { mode: Mode; initial?: ProjectData }) {
  const router = useRouter();
  const seed = initial ?? emptyProject;
  const [form, setForm] = useState<ProjectData>(seed);
  const [papers, setPapers] = useState<PaperRevision[]>(seed.papers ?? []);
  const [techStackJson, setTechStackJson] = useState(JSON.stringify(seed.techStack, null, 2));
  const [kpisJson, setKpisJson] = useState(JSON.stringify(seed.kpis, null, 2));
  const [researchJson, setResearchJson] = useState(JSON.stringify(seed.research, null, 2));
  const [timelineJson, setTimelineJson] = useState(JSON.stringify(seed.timeline, null, 2));
  const [risksJson, setRisksJson] = useState(JSON.stringify(seed.risks, null, 2));
  const [budgetJson, setBudgetJson] = useState(JSON.stringify(seed.budget, null, 2));
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const set = <K extends keyof ProjectData>(key: K, value: ProjectData[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const parsed: ProjectData = {
        ...form,
        techStack: JSON.parse(techStackJson),
        kpis: JSON.parse(kpisJson),
        research: JSON.parse(researchJson),
        timeline: JSON.parse(timelineJson),
        risks: JSON.parse(risksJson),
        budget: JSON.parse(budgetJson),
        papers,
      };
      const url = mode === 'create' ? '/api/projects' : `/api/projects/${seed.slug}`;
      const method = mode === 'create' ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Save failed');
      router.push('/manage');
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-8">
      {/* Basics */}
      <Section title="Basics">
        <Grid>
          <Field label="Slug" required>
            <input
              type="text"
              required
              disabled={mode === 'edit'}
              value={form.slug}
              onChange={(e) => set('slug', e.target.value)}
              className="field disabled:bg-slate-100"
              placeholder="my-new-project"
            />
          </Field>
          <Field label="Title" required>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              className="field"
            />
          </Field>
          <Field label="Subtitle" full>
            <input
              type="text"
              value={form.subtitle}
              onChange={(e) => set('subtitle', e.target.value)}
              className="field"
            />
          </Field>
          <Field label="Description" full>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              className="field min-h-[90px]"
            />
          </Field>
        </Grid>
      </Section>

      {/* Classification */}
      <Section title="Classification">
        <Grid>
          <Field label="Type">
            <select value={form.type} onChange={(e) => set('type', e.target.value as ProjectData['type'])} className="field">
              {Object.entries(TYPE_LABEL).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Business Unit">
            <select
              value={form.businessUnit}
              onChange={(e) => set('businessUnit', e.target.value as ProjectData['businessUnit'])}
              className="field"
            >
              <option value="farm">Smart Agriculture (farm)</option>
              <option value="factory">Smart Manufacturing (factory)</option>
              <option value="corporate">AI & Data Governance (corporate)</option>
            </select>
          </Field>
          <Field label="Status">
            <select
              value={form.status}
              onChange={(e) => set('status', e.target.value as ProjectData['status'])}
              className="field"
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="planning">Planning</option>
            </select>
          </Field>
          <Field label="Status Label">
            <input
              type="text"
              value={form.statusLabel}
              onChange={(e) => set('statusLabel', e.target.value)}
              className="field"
            />
          </Field>
          <Field label="Tech Tags (comma-separated)" full>
            <input
              type="text"
              value={form.techTags.join(', ')}
              onChange={(e) => set('techTags', csvToStrings(e.target.value))}
              className="field"
            />
          </Field>
          <Field label="Metric Note" full>
            <input
              type="text"
              value={form.metricNote}
              onChange={(e) => set('metricNote', e.target.value)}
              className="field"
            />
          </Field>
        </Grid>
      </Section>

      {/* Images */}
      <Section title="Images">
        <div className="grid gap-5 md:grid-cols-2">
          <FileUpload kind="image" label="Card Image" value={form.image} onChange={(v) => set('image', v)} />
          <FileUpload kind="image" label="Hero Image" value={form.heroImage} onChange={(v) => set('heroImage', v)} />
        </div>
      </Section>

      {/* Papers */}
      <Section title="Papers">
        <PapersManager value={papers} onChange={setPapers} />
      </Section>

      {/* Relationships */}
      <Section title="Relationships">
        <Grid>
          <Field label="Depends On (ids, comma-separated)">
            <input
              type="text"
              value={form.dependsOn.join(', ')}
              onChange={(e) => set('dependsOn', csvToNumbers(e.target.value))}
              className="field"
            />
          </Field>
          <Field label="Feeds Into (ids, comma-separated)">
            <input
              type="text"
              value={form.feedsInto.join(', ')}
              onChange={(e) => set('feedsInto', csvToNumbers(e.target.value))}
              className="field"
            />
          </Field>
          <Field label="Related Projects (ids, comma-separated)" full>
            <input
              type="text"
              value={form.relatedProjects.join(', ')}
              onChange={(e) => set('relatedProjects', csvToNumbers(e.target.value))}
              className="field"
            />
          </Field>
        </Grid>
      </Section>

      {/* Structured JSON */}
      <Section title="Structured Content (JSON)">
        <p className="mb-3 text-xs text-slate-500">
          Edit as JSON — these fields drive the research detail page. Invalid JSON will block save.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          <JsonField label="techStack" value={techStackJson} onChange={setTechStackJson} />
          <JsonField label="kpis" value={kpisJson} onChange={setKpisJson} />
          <JsonField label="timeline" value={timelineJson} onChange={setTimelineJson} />
          <JsonField label="risks" value={risksJson} onChange={setRisksJson} />
          <JsonField label="budget" value={budgetJson} onChange={setBudgetJson} />
          <div className="md:col-span-2">
            <JsonField label="research (full methodology)" value={researchJson} onChange={setResearchJson} tall />
          </div>
        </div>
      </Section>

      {err && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{err}</div>
      )}

      <div className="sticky bottom-0 -mx-6 border-t border-slate-200 bg-white/95 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => router.push('/manage')}
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-60"
          >
            {busy ? 'Saving…' : mode === 'create' ? 'Create project' : 'Save changes'}
          </button>
        </div>
      </div>

      <style>{`.field{width:100%;border:1px solid #cbd5e1;border-radius:8px;padding:8px 12px;font-size:14px;background:#fff}
.field:focus{outline:none;border-color:#3050d6;box-shadow:0 0 0 3px rgba(48,80,214,.15)}`}</style>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="font-serif text-xl text-navy-900">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

function Field({
  label,
  children,
  full = false,
  required = false,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
  required?: boolean;
}) {
  return (
    <label className={full ? 'md:col-span-2 block' : 'block'}>
      <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </div>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function JsonField({
  label,
  value,
  onChange,
  tall,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  tall?: boolean;
}) {
  let ok = true;
  try {
    JSON.parse(value);
  } catch {
    ok = false;
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</div>
        <span className={ok ? 'text-xs text-green' : 'text-xs text-red-600'}>{ok ? 'JSON OK' : 'Invalid JSON'}</span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 w-full rounded-md border border-slate-300 bg-slate-50 p-3 font-mono text-xs ${tall ? 'min-h-[320px]' : 'min-h-[180px]'}`}
      />
    </div>
  );
}
