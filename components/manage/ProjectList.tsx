'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { ProjectData } from '@/types/project';
import { StatusBadge } from '@/components/ui/StatusBadge';

export function ProjectList({ initial }: { initial: ProjectData[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState(initial);
  const [busy, setBusy] = useState<string | null>(null);

  const onDelete = async (slug: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setBusy(slug);
    try {
      const res = await fetch(`/api/projects/${slug}`, { method: 'DELETE' });
      if (!res.ok) throw new Error((await res.json()).error ?? 'Delete failed');
      setProjects((ps) => ps.filter((p) => p.slug !== slug));
      router.refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Delete failed');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Project</th>
            <th className="px-4 py-3">BU</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Assets</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {projects.map((p) => (
            <tr key={p.slug} className="bg-white">
              <td className="px-4 py-3 font-semibold text-slate-500">#{p.id}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-14 overflow-hidden rounded-md border border-slate-200">
                    <Image src={p.image} alt={p.title} fill className="object-cover" sizes="56px" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-navy-900">{p.title}</div>
                    <div className="truncate text-xs text-slate-500">{p.slug}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 capitalize text-slate-700">{p.businessUnit}</td>
              <td className="px-4 py-3">
                <StatusBadge status={p.status} label={p.statusLabel} />
              </td>
              <td className="px-4 py-3 text-xs text-slate-600">
                <div className="flex flex-wrap gap-1.5">
                  {p.paperPdf && <span className="rounded-full bg-blue-50 px-2 py-0.5 text-blue-700">PDF</span>}
                  {p.researchHtml && <span className="rounded-full bg-green/10 px-2 py-0.5 text-green">HTML</span>}
                  {!p.paperPdf && !p.researchHtml && <span className="text-slate-400">—</span>}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    View
                  </Link>
                  <Link
                    href={`/manage/${p.slug}`}
                    className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-light"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    disabled={busy === p.slug}
                    onClick={() => onDelete(p.slug, p.title)}
                    className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    {busy === p.slug ? '...' : 'Delete'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {projects.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                No projects yet. Click “+ New Project” to add one.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
