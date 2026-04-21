'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import type { LiteratureEntry } from '@/types/literature';

interface ProjectRef {
  slug: string;
  title: string;
}

interface Node {
  id: string;
  entry: LiteratureEntry;
  x: number;
  y: number;
  clusterColor: string;
}

interface Edge {
  a: string;
  b: string;
  kind: 'group' | 'author';
}

const CLUSTER_COLORS = [
  '#16a34a',
  '#3050d6',
  '#7c3aed',
  '#f59e0b',
  '#0d9488',
  '#db2777',
  '#0ea5e9',
  '#dc2626',
];

const CANVAS_W = 960;
const CANVAS_H = 640;

function layoutNodes(entries: LiteratureEntry[]): { nodes: Node[]; clusterLabels: Map<string, string> } {
  // Cluster by project+group
  const clusterKeyOf = (e: LiteratureEntry) => `${e.projectSlug}//${e.group}`;
  const clustersMap = new Map<string, LiteratureEntry[]>();
  entries.forEach((e) => {
    const k = clusterKeyOf(e);
    const arr = clustersMap.get(k) ?? [];
    arr.push(e);
    clustersMap.set(k, arr);
  });

  const clusterEntries = Array.from(clustersMap.entries());
  const clusterCount = clusterEntries.length;

  const centerX = CANVAS_W / 2;
  const centerY = CANVAS_H / 2;
  const outerRadius = Math.min(CANVAS_W, CANVAS_H) / 2 - 80;

  const nodes: Node[] = [];
  const clusterLabels = new Map<string, string>();

  clusterEntries.forEach(([key, items], ci) => {
    // Center of this cluster on the main ring
    const clusterAngle = (2 * Math.PI * ci) / Math.max(1, clusterCount);
    const cx = centerX + Math.cos(clusterAngle) * outerRadius * 0.55;
    const cy = centerY + Math.sin(clusterAngle) * outerRadius * 0.55;
    const color = CLUSTER_COLORS[ci % CLUSTER_COLORS.length];
    clusterLabels.set(key, color);

    const localRadius = 40 + Math.min(90, items.length * 8);
    items.forEach((e, i) => {
      const a = (2 * Math.PI * i) / Math.max(1, items.length);
      nodes.push({
        id: e.id,
        entry: e,
        x: cx + Math.cos(a) * localRadius,
        y: cy + Math.sin(a) * localRadius,
        clusterColor: color,
      });
    });
  });

  return { nodes, clusterLabels };
}

function buildEdges(entries: LiteratureEntry[]): Edge[] {
  const edges: Edge[] = [];
  // Group edges
  const groupMap = new Map<string, LiteratureEntry[]>();
  entries.forEach((e) => {
    const k = `${e.projectSlug}//${e.group}`;
    const arr = groupMap.get(k) ?? [];
    arr.push(e);
    groupMap.set(k, arr);
  });
  for (const arr of groupMap.values()) {
    for (let i = 0; i < arr.length; i++) {
      const next = arr[(i + 1) % arr.length];
      if (next.id !== arr[i].id) edges.push({ a: arr[i].id, b: next.id, kind: 'group' });
    }
  }
  // Author edges (papers with any shared author, capped)
  const byAuthor = new Map<string, string[]>();
  entries.forEach((e) => {
    e.authors.forEach((rawA) => {
      const a = rawA.trim().toLowerCase();
      if (!a) return;
      const arr = byAuthor.get(a) ?? [];
      arr.push(e.id);
      byAuthor.set(a, arr);
    });
  });
  const seen = new Set<string>();
  for (const ids of byAuthor.values()) {
    if (ids.length < 2) continue;
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const key = ids[i] < ids[j] ? `${ids[i]}|${ids[j]}` : `${ids[j]}|${ids[i]}`;
        if (seen.has(key)) continue;
        seen.add(key);
        edges.push({ a: ids[i], b: ids[j], kind: 'author' });
      }
    }
  }
  return edges;
}

export function KnowledgeGraph({
  entries,
  projects,
}: {
  entries: LiteratureEntry[];
  projects: ProjectRef[];
}) {
  const [projectSlug, setProjectSlug] = useState<string>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredEntries = useMemo(
    () => (projectSlug === 'all' ? entries : entries.filter((e) => e.projectSlug === projectSlug)),
    [entries, projectSlug],
  );

  const { nodes } = useMemo(() => layoutNodes(filteredEntries), [filteredEntries]);
  const edges = useMemo(() => buildEdges(filteredEntries), [filteredEntries]);

  const nodeIndex = useMemo(() => {
    const m = new Map<string, Node>();
    nodes.forEach((n) => m.set(n.id, n));
    return m;
  }, [nodes]);

  const selected = selectedId ? nodeIndex.get(selectedId)?.entry : null;
  const projectMap = useMemo(() => new Map(projects.map((p) => [p.slug, p.title])), [projects]);

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-navy-900">{filteredEntries.length}</span> papers
            <span>·</span>
            <span className="font-semibold text-navy-900">{edges.filter((e) => e.kind === 'group').length}</span>{' '}
            group edges
            <span>·</span>
            <span className="font-semibold text-navy-900">{edges.filter((e) => e.kind === 'author').length}</span>{' '}
            author edges
          </div>
          <select
            value={projectSlug}
            onChange={(e) => setProjectSlug(e.target.value)}
            className="field max-w-xs"
          >
            <option value="all">All projects</option>
            {projects.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3 overflow-hidden rounded-xl bg-slate-50">
          <svg
            viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
            className="block h-auto w-full"
            role="img"
            aria-label="Knowledge graph"
          >
            {/* Edges first */}
            {edges.map((ed, i) => {
              const a = nodeIndex.get(ed.a);
              const b = nodeIndex.get(ed.b);
              if (!a || !b) return null;
              const active =
                hoveredId === ed.a || hoveredId === ed.b || selectedId === ed.a || selectedId === ed.b;
              return (
                <line
                  key={`${ed.a}-${ed.b}-${i}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={ed.kind === 'author' ? '#94a3b8' : '#cbd5e1'}
                  strokeOpacity={active ? 0.9 : 0.35}
                  strokeWidth={ed.kind === 'author' ? 0.8 : 1.2}
                  strokeDasharray={ed.kind === 'author' ? '3 3' : undefined}
                />
              );
            })}
            {/* Nodes */}
            {nodes.map((n) => {
              const active = hoveredId === n.id || selectedId === n.id;
              return (
                <g
                  key={n.id}
                  onMouseEnter={() => setHoveredId(n.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedId(n.id === selectedId ? null : n.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={active ? 9 : 6}
                    fill={n.clusterColor}
                    opacity={active ? 1 : 0.85}
                    stroke="white"
                    strokeWidth={2}
                  />
                  {active && (
                    <text
                      x={n.x + 12}
                      y={n.y + 4}
                      fontSize={10}
                      fontFamily="ui-sans-serif, system-ui"
                      fill="#0c1629"
                    >
                      {n.entry.title.length > 48
                        ? n.entry.title.slice(0, 45) + '…'
                        : n.entry.title}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-6 bg-slate-300" />
            solid = same group
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-6 border-t border-dashed border-slate-400" />
            dashed = shared author
          </span>
          <span className="ml-auto">Hover node for title · click to pin detail panel</span>
        </div>
      </div>

      <aside className="rounded-2xl border border-slate-200 bg-white p-4">
        {selected ? (
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              {projectMap.get(selected.projectSlug) ?? selected.projectSlug} · {selected.group}
            </div>
            <h3 className="mt-1 font-serif text-lg text-navy-900">{selected.title}</h3>
            <div className="mt-1 text-xs text-slate-500">
              {selected.authors.slice(0, 4).join(', ')}
              {selected.authors.length > 4 && ' et al.'}
            </div>
            <div className="mt-1 text-xs italic text-slate-500">
              {selected.venue} · {selected.year}
            </div>

            {selected.aiSummary && (
              <div className="mt-3 rounded-lg border-l-2 border-green/50 bg-green/5 p-3 text-xs leading-relaxed text-slate-700">
                {selected.aiSummary}
              </div>
            )}
            {!selected.aiSummary && selected.abstract && (
              <div className="mt-3 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-700">
                {selected.abstract.slice(0, 320)}
                {selected.abstract.length > 320 && '…'}
              </div>
            )}
            {!selected.aiSummary && !selected.abstract && selected.relevance && (
              <div className="mt-3 text-xs leading-relaxed text-slate-600">{selected.relevance}</div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {selected.doiUrl && (
                <a
                  href={selected.doiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Open DOI
                </a>
              )}
              <Link
                href={`/projects/${selected.projectSlug}#literature`}
                className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white hover:bg-primary-light"
              >
                Go to project
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-sm text-slate-500">
            <div className="font-semibold text-navy-900">No paper selected.</div>
            <p className="mt-2 leading-relaxed">
              Hover any node for its title, or click to pin it here with abstract + AI relevance summary. Use the
              project filter to isolate clusters.
            </p>
            <div className="mt-4 rounded-lg bg-slate-50 p-3 text-xs">
              <span className="font-semibold text-navy-900">Export for Obsidian</span>
              <p className="mt-1 text-slate-600">
                Download a single Markdown bundle — one file per paper, with YAML frontmatter and{' '}
                <code className="rounded bg-slate-100 px-1">[[wiki-links]]</code> between related papers. Drop it
                into an Obsidian vault to get a live, navigable graph view.
              </p>
            </div>
          </div>
        )}

        <div className="mt-5 rounded-lg border border-slate-100 bg-slate-50 p-3">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Cluster legend</div>
          <div className="mt-2 space-y-1.5">
            {Array.from(new Set(nodes.map((n) => `${n.entry.projectSlug}//${n.entry.group}`))).map(
              (key, i) => {
                const [slug, group] = key.split('//');
                return (
                  <div key={key} className="flex items-center gap-2 text-xs">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ background: CLUSTER_COLORS[i % CLUSTER_COLORS.length] }}
                    />
                    <span className="truncate text-slate-700">
                      {(projectMap.get(slug) ?? slug) + ' · ' + group}
                    </span>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
