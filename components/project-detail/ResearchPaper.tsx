import { SectionBlock } from './SectionBlock';
import type { ProjectData } from '@/types/project';

export function ResearchPaper({ project }: { project: ProjectData }) {
  if (!project.researchHtml && !project.paperPdf) return null;

  return (
    <SectionBlock id="paper" number="09" title="Research Paper">
      {project.paperPdf && (
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6M10 13h4M10 17h4M10 9h1" />
                </svg>
              </span>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Reference Paper</div>
                <div className="font-semibold text-navy-900">{project.paperPdf.split('/').pop()}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href={project.paperPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Open
              </a>
              <a
                href={project.paperPdf}
                download
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-light"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      )}

      {project.researchHtml && (
        <div className="prose prose-slate max-w-none rounded-2xl border border-slate-200 bg-white p-6 md:p-8 prose-headings:font-serif prose-headings:text-navy-900 prose-a:text-primary">
          <div dangerouslySetInnerHTML={{ __html: project.researchHtml }} />
        </div>
      )}
    </SectionBlock>
  );
}
