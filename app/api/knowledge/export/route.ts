import { literatureStore } from '@/lib/literatureStore';
import { getAllProjects } from '@/lib/projects';
import type { LiteratureEntry } from '@/types/literature';

export const dynamic = 'force-dynamic';

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function citationKey(e: LiteratureEntry): string {
  const firstAuthor = e.authors[0]?.split(/[, ]+/).pop()?.toLowerCase() ?? 'anon';
  const firstTitleWord = e.title.split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, '') ?? 'paper';
  return `${firstAuthor}${e.year}${firstTitleWord}`.slice(0, 40);
}

function escapeYaml(s: string): string {
  return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ')}"`;
}

function renderMarkdown(
  e: LiteratureEntry,
  projectTitle: string,
  backlinks: { toKey: string; toTitle: string; reason: string }[],
): string {
  const key = citationKey(e);
  const frontmatter = [
    '---',
    `title: ${escapeYaml(e.title)}`,
    `citation_key: ${key}`,
    `project: ${escapeYaml(projectTitle)}`,
    `project_slug: ${e.projectSlug}`,
    `group: ${escapeYaml(e.group)}`,
    `year: ${e.year}`,
    `venue: ${escapeYaml(e.venue)}`,
    `doi: ${escapeYaml(e.doiUrl)}`,
    `authors:${e.authors.map((a) => `\n  - ${escapeYaml(a)}`).join('')}`,
    `status: ${e.status}`,
    `tags:`,
    `  - paper`,
    `  - ${slugify(e.group)}`,
    `  - ${slugify(e.projectSlug)}`,
    '---',
  ].join('\n');

  const sections: string[] = [];
  sections.push(`# ${e.title}`);
  sections.push(
    `**Authors:** ${e.authors.join(', ') || '—'}\n**Venue:** ${e.venue} (${e.year})\n**DOI:** ${e.doiUrl || '—'}`,
  );
  if (e.relevance) sections.push(`## Analyst Relevance\n${e.relevance}`);
  if (e.abstract) sections.push(`## Abstract\n${e.abstract}`);
  if (e.introduction) sections.push(`## Introduction Excerpt\n${e.introduction}`);
  if (e.aiSummary) sections.push(`## AI Relevance Summary\n${e.aiSummary}`);

  if (backlinks.length) {
    const lines = backlinks.map((bl) => `- [[${bl.toKey}]] — ${bl.reason}`);
    sections.push(`## Related Papers\n${lines.join('\n')}`);
  }

  return `${frontmatter}\n\n${sections.join('\n\n')}\n`;
}

function renderIndex(entries: LiteratureEntry[], projectMap: Map<string, string>): string {
  const lines: string[] = ['# MAI Literature Vault', ''];
  const byProject = new Map<string, LiteratureEntry[]>();
  entries.forEach((e) => {
    const arr = byProject.get(e.projectSlug) ?? [];
    arr.push(e);
    byProject.set(e.projectSlug, arr);
  });
  for (const [slug, items] of byProject) {
    lines.push(`## ${projectMap.get(slug) ?? slug}`);
    items.sort((a, b) => a.group.localeCompare(b.group) || a.no - b.no);
    for (const e of items) {
      lines.push(`- [[${citationKey(e)}]] — ${e.title} _(${e.group}, ${e.year})_`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

function buildBacklinks(entries: LiteratureEntry[]): Map<string, { toKey: string; toTitle: string; reason: string }[]> {
  const out = new Map<string, { toKey: string; toTitle: string; reason: string }[]>();
  const authorIndex = new Map<string, LiteratureEntry[]>();
  entries.forEach((e) => {
    e.authors.forEach((a) => {
      const k = a.trim().toLowerCase();
      if (!k) return;
      const arr = authorIndex.get(k) ?? [];
      arr.push(e);
      authorIndex.set(k, arr);
    });
  });

  entries.forEach((e) => {
    const links = new Map<string, { toKey: string; toTitle: string; reason: string }>();
    // same project + group
    entries.forEach((other) => {
      if (other.id === e.id) return;
      if (other.projectSlug === e.projectSlug && other.group === e.group) {
        links.set(other.id, {
          toKey: citationKey(other),
          toTitle: other.title,
          reason: `same group (${e.group})`,
        });
      }
    });
    // shared author
    e.authors.forEach((a) => {
      const arr = authorIndex.get(a.trim().toLowerCase()) ?? [];
      arr.forEach((other) => {
        if (other.id === e.id) return;
        if (!links.has(other.id)) {
          links.set(other.id, {
            toKey: citationKey(other),
            toTitle: other.title,
            reason: `shared author (${a})`,
          });
        }
      });
    });
    out.set(e.id, Array.from(links.values()));
  });

  return out;
}

// Minimal stored-mode ZIP writer (no compression, Node crypto for CRC32)
function crc32(data: Uint8Array): number {
  let c = ~0 >>> 0;
  for (let i = 0; i < data.length; i++) {
    c ^= data[i];
    for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1;
  }
  return ~c >>> 0;
}

function zip(files: { name: string; content: string }[]): Uint8Array {
  const enc = new TextEncoder();
  const parts: Uint8Array[] = [];
  const central: Uint8Array[] = [];
  let offset = 0;

  for (const file of files) {
    const nameBytes = enc.encode(file.name);
    const data = enc.encode(file.content);
    const crc = crc32(data);
    const size = data.length;

    // Local file header
    const local = new Uint8Array(30 + nameBytes.length);
    const ldv = new DataView(local.buffer);
    ldv.setUint32(0, 0x04034b50, true);
    ldv.setUint16(4, 20, true); // version
    ldv.setUint16(6, 0, true); // flags
    ldv.setUint16(8, 0, true); // method = stored
    ldv.setUint16(10, 0, true); // time
    ldv.setUint16(12, 0, true); // date
    ldv.setUint32(14, crc, true);
    ldv.setUint32(18, size, true); // compressed
    ldv.setUint32(22, size, true); // uncompressed
    ldv.setUint16(26, nameBytes.length, true);
    ldv.setUint16(28, 0, true); // extra
    local.set(nameBytes, 30);

    parts.push(local, data);

    // Central dir
    const cen = new Uint8Array(46 + nameBytes.length);
    const cdv = new DataView(cen.buffer);
    cdv.setUint32(0, 0x02014b50, true);
    cdv.setUint16(4, 20, true);
    cdv.setUint16(6, 20, true);
    cdv.setUint16(8, 0, true);
    cdv.setUint16(10, 0, true);
    cdv.setUint16(12, 0, true);
    cdv.setUint16(14, 0, true);
    cdv.setUint32(16, crc, true);
    cdv.setUint32(20, size, true);
    cdv.setUint32(24, size, true);
    cdv.setUint16(28, nameBytes.length, true);
    cdv.setUint16(30, 0, true);
    cdv.setUint16(32, 0, true);
    cdv.setUint16(34, 0, true);
    cdv.setUint16(36, 0, true);
    cdv.setUint32(38, 0, true);
    cdv.setUint32(42, offset, true);
    cen.set(nameBytes, 46);
    central.push(cen);

    offset += local.length + data.length;
  }

  const centralSize = central.reduce((n, a) => n + a.length, 0);
  const end = new Uint8Array(22);
  const edv = new DataView(end.buffer);
  edv.setUint32(0, 0x06054b50, true);
  edv.setUint16(4, 0, true);
  edv.setUint16(6, 0, true);
  edv.setUint16(8, files.length, true);
  edv.setUint16(10, files.length, true);
  edv.setUint32(12, centralSize, true);
  edv.setUint32(16, offset, true);
  edv.setUint16(20, 0, true);

  const all = [...parts, ...central, end];
  const total = all.reduce((n, a) => n + a.length, 0);
  const out = new Uint8Array(total);
  let cursor = 0;
  for (const p of all) {
    out.set(p, cursor);
    cursor += p.length;
  }
  return out;
}

export async function GET() {
  const [entries, projects] = await Promise.all([literatureStore.list(), getAllProjects()]);
  const projectMap = new Map(projects.map((p) => [p.slug, p.title]));
  const backlinks = buildBacklinks(entries);

  const files = [
    { name: 'README.md', content: renderIndex(entries, projectMap) },
    ...entries.map((e) => ({
      name: `${citationKey(e)}.md`,
      content: renderMarkdown(e, projectMap.get(e.projectSlug) ?? e.projectSlug, backlinks.get(e.id) ?? []),
    })),
  ];
  // dedupe filenames (citation keys can collide)
  const seen = new Map<string, number>();
  for (const f of files) {
    const n = seen.get(f.name) ?? 0;
    if (n > 0) f.name = f.name.replace(/\.md$/, `-${n + 1}.md`);
    seen.set(f.name, n + 1);
  }

  const bytes = zip(files);
  const buf = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buf).set(bytes);
  return new Response(buf, {
    headers: {
      'content-type': 'application/zip',
      'content-disposition': `attachment; filename="mai-knowledge-vault.zip"`,
    },
  });
}
