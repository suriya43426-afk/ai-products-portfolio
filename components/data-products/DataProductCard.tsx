'use client';

import Link from 'next/link';
import type { DataProduct } from '@/types/dataProduct';
import { DP_BU_COLORS } from '@/lib/dataProductsMeta';

export function DataProductCard({ item }: { item: DataProduct }) {
  const color = DP_BU_COLORS[item.bu] ?? DP_BU_COLORS.Other;
  return (
    <Link
      href={`/data-products/${item.slug}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-blue-300 hover:shadow-md"
    >
      <div
        className="relative h-20"
        style={{ background: `linear-gradient(135deg, ${color.from}, ${color.to})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-4 py-2 text-white">
          <span className="text-xs font-semibold uppercase tracking-widest drop-shadow">{item.bu}</span>
          <span className="text-xs opacity-90">{item.format}</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="font-mono">{item.id}</span>
          <span>·</span>
          <span>{item.supportFunction}</span>
        </div>

        <h3 className="mt-2 font-serif text-lg leading-snug text-navy-900 group-hover:text-primary">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{item.description}</p>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <Stat label="Rows" value={item.rowCount.toLocaleString()} />
          <Stat label="Cols" value={item.columnCount.toString()} />
          <Stat label="Size" value={item.size} />
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-md border border-slate-200 px-2 py-0.5 text-xs text-slate-600">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
          <div className="truncate">
            <div className="text-slate-500">Owner</div>
            <div className="truncate font-semibold text-navy-900">{item.owner.name}</div>
          </div>
          <div className="text-right">
            <div className="text-slate-500">Usability</div>
            <div className="font-semibold text-green">{item.usabilityScore.toFixed(1)}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-slate-50 px-2 py-1.5">
      <div className="text-[10px] uppercase tracking-wide text-slate-500">{label}</div>
      <div className="text-sm font-semibold text-navy-900">{value}</div>
    </div>
  );
}
