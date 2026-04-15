import Link from 'next/link';
import Image from 'next/image';
import { SectionBlock } from './SectionBlock';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { getRelatedProjects } from '@/lib/projects';
import type { ProjectData } from '@/types/project';

export function RelatedProjects({ project }: { project: ProjectData }) {
  const related = getRelatedProjects(project);
  if (related.length === 0) return null;
  return (
    <SectionBlock id="related" number="09" title="Related Projects">
      <div className="grid gap-4 md:grid-cols-3">
        {related.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.slug}`}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-blue-300 hover:shadow-md"
          >
            <div className="relative aspect-[16/9]">
              <Image src={p.image} alt={p.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-blue-600">#{p.id}</span>
                <StatusBadge status={p.status} label={p.statusLabel} />
              </div>
              <div className="mt-2 font-serif text-xl text-navy-900 group-hover:text-primary">{p.title}</div>
              <div className="mt-1 text-sm text-slate-600">{p.subtitle}</div>
            </div>
          </Link>
        ))}
      </div>
    </SectionBlock>
  );
}
