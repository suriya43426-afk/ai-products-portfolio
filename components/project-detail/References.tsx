import { SectionBlock } from './SectionBlock';
import type { ProjectData } from '@/types/project';

export function References({ project }: { project: ProjectData }) {
  const refs = project.references ?? [];
  if (!refs.length) return null;

  return (
    <SectionBlock id="references" number="07" title="References">
      <ol className="space-y-3 text-sm leading-relaxed text-slate-700">
        {refs.map((r, i) => (
          <li key={r.id} className="flex gap-3">
            <span className="mt-0.5 shrink-0 font-mono text-xs text-slate-400">[{i + 1}]</span>
            <div className="min-w-0">
              <div>{r.citation}</div>
              {r.url && (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 inline-block break-all text-xs text-primary hover:underline"
                >
                  {r.url}
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </SectionBlock>
  );
}
