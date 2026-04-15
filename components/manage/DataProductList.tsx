'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { DataProduct } from '@/types/dataProduct';
import { DP_BU_COLORS } from '@/lib/dataProductsMeta';

export function DataProductList({ initial }: { initial: DataProduct[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [busy, setBusy] = useState<string | null>(null);

  const onDelete = async (slug: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setBusy(slug);
    try {
      const res = await fetch(`/api/data-products/${slug}`, { method: 'DELETE' });
      if (!res.ok) throw new Error((await res.json()).error ?? 'Delete failed');
      setItems((xs) => xs.filter((d) => d.slug !== slug));
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
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">BU</th>
            <th className="px-4 py-3">Function</th>
            <th className="px-4 py-3">Data Owner</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {items.map((d) => {
            const color = DP_BU_COLORS[d.bu] ?? DP_BU_COLORS.Other;
            return (
              <tr key={d.slug} className="bg-white">
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{d.id}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-navy-900">{d.title}</div>
                  <div className="truncate text-xs text-slate-500">{d.slug}</div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
                    style={{ background: `linear-gradient(135deg, ${color.from}, ${color.to})` }}
                  >
                    {d.bu}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-700">{d.supportFunction}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-navy-900">{d.owner.name}</div>
                  <a href={`mailto:${d.owner.email}`} className="text-xs text-primary hover:text-primary-light">
                    {d.owner.email}
                  </a>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/data-products/${d.slug}`}
                      className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      View
                    </Link>
                    <Link
                      href={`/manage/data-products/${d.slug}`}
                      className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-light"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      disabled={busy === d.slug}
                      onClick={() => onDelete(d.slug, d.title)}
                      className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      {busy === d.slug ? '...' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
          {items.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                No data products yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
