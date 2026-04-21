'use client';

import type { PaperRevision, PaperStatus } from '@/types/project';
import { FileUpload } from './FileUpload';

const STATUS_OPTIONS: PaperStatus[] = ['draft', 'internal', 'published'];

function emptyPaper(): PaperRevision {
  return {
    version: '',
    uploadedAt: new Date().toISOString(),
    author: '',
    changelog: '',
    pdfUrl: '',
    status: 'draft',
  };
}

export function PapersManager({
  value,
  onChange,
}: {
  value: PaperRevision[];
  onChange: (next: PaperRevision[]) => void;
}) {
  const papers = value ?? [];

  const updateAt = (idx: number, patch: Partial<PaperRevision>) => {
    const next = papers.map((p, i) => (i === idx ? { ...p, ...patch } : p));
    onChange(next);
  };

  const add = () => {
    onChange([emptyPaper(), ...papers]);
  };

  const remove = (idx: number) => {
    onChange(papers.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Upload a PDF, fill in the metadata, then Save the project. Newest entry shown first.
        </p>
        <button
          type="button"
          onClick={add}
          className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white hover:bg-primary-light"
        >
          + Add paper
        </button>
      </div>

      {papers.length === 0 ? (
        <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
          No papers yet. Click &ldquo;Add paper&rdquo; to upload the first revision.
        </div>
      ) : (
        <ul className="space-y-4">
          {papers.map((paper, idx) => (
            <li
              key={idx}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Paper #{papers.length - idx}
                  {paper.version && <span className="ml-2 text-slate-700">v{paper.version}</span>}
                </div>
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="text-xs font-semibold text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>

              <div className="mt-3 grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <FileUpload
                    kind="pdf"
                    label="PDF file"
                    value={paper.pdfUrl}
                    onChange={(path) =>
                      updateAt(idx, { pdfUrl: path, uploadedAt: new Date().toISOString() })
                    }
                  />
                </div>

                <LabeledInput
                  label="Version"
                  value={paper.version}
                  onChange={(v) => updateAt(idx, { version: v })}
                  placeholder="1.0.0"
                />
                <LabeledInput
                  label="Author"
                  value={paper.author}
                  onChange={(v) => updateAt(idx, { author: v })}
                  placeholder="Jane Doe"
                />

                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Status
                  </div>
                  <select
                    value={paper.status}
                    onChange={(e) => updateAt(idx, { status: e.target.value as PaperStatus })}
                    className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <LabeledInput
                  label="Uploaded at (ISO)"
                  value={paper.uploadedAt}
                  onChange={(v) => updateAt(idx, { uploadedAt: v })}
                  placeholder="2026-04-21T08:00:00Z"
                />

                <div className="md:col-span-2">
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Changelog
                  </div>
                  <textarea
                    value={paper.changelog}
                    onChange={(e) => updateAt(idx, { changelog: e.target.value })}
                    placeholder="Initial draft / added validation / ..."
                    className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none min-h-[70px]"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
      />
    </div>
  );
}
