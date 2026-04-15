import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/projects';
import { ProjectForm } from '@/components/manage/ProjectForm';

export const dynamic = 'force-dynamic';

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Editing #{project.id}</div>
          <h1 className="mt-1 font-serif text-3xl text-navy-900 md:text-4xl">{project.title}</h1>
          <p className="mt-1 text-sm text-slate-600">{project.subtitle}</p>
        </div>
      </div>
      <div className="mt-8">
        <ProjectForm mode="edit" initial={project} />
      </div>
    </div>
  );
}
