'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { DataProduct, DataProductBu } from '@/types/dataProduct';
import { DP_BU_NAMES, SUPPORT_FUNCTIONS } from '@/lib/dataProductsMeta';

type Mode = 'create' | 'edit';

const empty: DataProduct = {
  id: '',
  slug: '',
  title: '',
  description: '',
  bu: 'Sugar',
  supportFunction: 'Production / Operations',
  tags: [],
  fileCount: 1,
  rowCount: 0,
  columnCount: 0,
  size: '',
  format: 'CSV',
  lastUpdated: new Date().toISOString().slice(0, 10),
  usabilityScore: 8.0,
  downloads: 0,
  ownerTeam: '',
  owner: { name: 'Suriya Chayatummagoon', email: 'suriyachay@mitrphol.com' },
  status: 'draft',
};

function csv(v: string): string[] {
  return v.split(',').map((s) => s.trim()).filter(Boolean);
}

export function DataProductForm({ mode, initial }: { mode: Mode; initial?: DataProduct }) {
  const router = useRouter();
  const [form, setForm] = useState<DataProduct>(initial ?? empty);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const set = <K extends keyof DataProduct>(k: K, v: DataProduct[K]) => setForm((f) => ({ ...f, [k]: v }));
  const setOwner = <K extends keyof DataProduct['owner']>(k: K, v: string) =>
    setForm((f) => ({ ...f, owner: { ...f.owner, [k]: v } }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.owner.email);
      if (!emailOk) throw new Error('Invalid data owner email');
      const url = mode === 'create' ? '/api/data-products' : `/api/data-products/${form.slug}`;
      const method = mode === 'create' ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
    <form onSubmit={submit} className="space-y-6">
      <Section title="Basics">
        <Grid>
          <F label="ID (e.g. farm-001)" required>
            <input type="text" required disabled={mode === 'edit'} value={form.id} onChange={(e) => set('id', e.target.value)} className="field disabled:bg-slate-100" />
          </F>
          <F label="Slug" required>
            <input type="text" required disabled={mode === 'edit'} value={form.slug} onChange={(e) => set('slug', e.target.value)} className="field disabled:bg-slate-100" />
          </F>
          <F label="Title" required full>
            <input type="text" required value={form.title} onChange={(e) => set('title', e.target.value)} className="field" />
          </F>
          <F label="Description" full>
            <textarea value={form.description} onChange={(e) => set('description', e.target.value)} className="field min-h-[90px]" />
          </F>
        </Grid>
      </Section>

      <Section title="Classification">
        <Grid>
          <F label="Business Unit">
            <select value={form.bu} onChange={(e) => set('bu', e.target.value as DataProductBu)} className="field">
              {DP_BU_NAMES.map((b) => (<option key={b} value={b}>{b}</option>))}
            </select>
          </F>
          <F label="Support Function">
            <select value={form.supportFunction} onChange={(e) => set('supportFunction', e.target.value)} className="field">
              {SUPPORT_FUNCTIONS.map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
          </F>
          <F label="Tags (comma-separated)" full>
            <input type="text" value={form.tags.join(', ')} onChange={(e) => set('tags', csv(e.target.value))} className="field" />
          </F>
          <F label="Status">
            <select value={form.status} onChange={(e) => set('status', e.target.value as DataProduct['status'])} className="field">
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="deprecated">Deprecated</option>
            </select>
          </F>
          <F label="Owning Team">
            <input type="text" value={form.ownerTeam} onChange={(e) => set('ownerTeam', e.target.value)} className="field" />
          </F>
        </Grid>
      </Section>

      <Section title="Data Owner">
        <Grid>
          <F label="Owner Name" required>
            <input type="text" required value={form.owner.name} onChange={(e) => setOwner('name', e.target.value)} className="field" />
          </F>
          <F label="Owner Email" required>
            <input type="email" required value={form.owner.email} onChange={(e) => setOwner('email', e.target.value)} className="field" placeholder="name@mitrphol.com" />
          </F>
        </Grid>
      </Section>

      <Section title="Dataset Metadata">
        <Grid>
          <F label="Format"><input type="text" value={form.format} onChange={(e) => set('format', e.target.value)} className="field" /></F>
          <F label="Size (e.g. 42 MB)"><input type="text" value={form.size} onChange={(e) => set('size', e.target.value)} className="field" /></F>
          <F label="File Count"><input type="number" value={form.fileCount} onChange={(e) => set('fileCount', Number(e.target.value))} className="field" /></F>
          <F label="Row Count"><input type="number" value={form.rowCount} onChange={(e) => set('rowCount', Number(e.target.value))} className="field" /></F>
          <F label="Column Count"><input type="number" value={form.columnCount} onChange={(e) => set('columnCount', Number(e.target.value))} className="field" /></F>
          <F label="Last Updated"><input type="date" value={form.lastUpdated} onChange={(e) => set('lastUpdated', e.target.value)} className="field" /></F>
          <F label="Usability Score (0-10)"><input type="number" step="0.1" min={0} max={10} value={form.usabilityScore} onChange={(e) => set('usabilityScore', Number(e.target.value))} className="field" /></F>
          <F label="Downloads"><input type="number" value={form.downloads} onChange={(e) => set('downloads', Number(e.target.value))} className="field" /></F>
        </Grid>
      </Section>

      {err && <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{err}</div>}

      <div className="sticky bottom-0 -mx-6 border-t border-slate-200 bg-white/95 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <button type="button" onClick={() => router.push('/manage')} className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
          <button type="submit" disabled={busy} className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-60">
            {busy ? 'Saving…' : mode === 'create' ? 'Create data product' : 'Save changes'}
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
function F({ label, children, full = false, required = false }: { label: string; children: React.ReactNode; full?: boolean; required?: boolean }) {
  return (
    <label className={full ? 'md:col-span-2 block' : 'block'}>
      <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}{required && <span className="ml-1 text-red-500">*</span>}</div>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
