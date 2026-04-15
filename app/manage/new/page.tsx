import { ProjectForm } from '@/components/manage/ProjectForm';

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
      <div>
        <h1 className="font-serif text-3xl text-navy-900 md:text-4xl">New Project</h1>
        <p className="mt-1 text-sm text-slate-600">Create a new entry in the MAI portfolio.</p>
      </div>
      <div className="mt-8">
        <ProjectForm mode="create" />
      </div>
    </div>
  );
}
