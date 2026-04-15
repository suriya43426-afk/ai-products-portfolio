'use client';

import { useRef, useState } from 'react';

export function FileUpload({
  kind,
  value,
  onChange,
  label,
  accept,
}: {
  kind: 'image' | 'pdf';
  value?: string;
  onChange: (path: string) => void;
  label: string;
  accept?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handle = async (file: File) => {
    setBusy(true);
    setErr(null);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('kind', kind);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Upload failed');
      onChange(json.path);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setBusy(false);
      if (ref.current) ref.current.value = '';
    }
  };

  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</label>
      <div className="mt-1.5 flex items-center gap-2">
        <input
          type="text"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={kind === 'image' ? '/images/foo.jpg' : '/papers/paper.pdf'}
          className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
        <input
          ref={ref}
          type="file"
          accept={accept ?? (kind === 'image' ? 'image/*' : 'application/pdf')}
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handle(e.target.files[0])}
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => ref.current?.click()}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          {busy ? 'Uploading…' : 'Upload'}
        </button>
      </div>
      {err && <div className="mt-1 text-xs text-red-600">{err}</div>}
      {value && kind === 'image' && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="preview" className="mt-2 h-20 rounded-md border border-slate-200 object-cover" />
      )}
      {value && kind === 'pdf' && (
        <a href={value} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs text-primary">
          Open PDF →
        </a>
      )}
    </div>
  );
}
