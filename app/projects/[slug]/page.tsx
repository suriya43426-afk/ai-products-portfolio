import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ProjectHero } from '@/components/project-detail/ProjectHero';
import { ResearchOverview } from '@/components/project-detail/ResearchOverview';
import { Methodology } from '@/components/project-detail/Methodology';
import { TechArchitecture } from '@/components/project-detail/TechArchitecture';
import { DataPipeline } from '@/components/project-detail/DataPipeline';
import { ExpectedOutcomes } from '@/components/project-detail/ExpectedOutcomes';
import { Timeline } from '@/components/project-detail/Timeline';
import { RiskMatrix } from '@/components/project-detail/RiskMatrix';
import { BudgetSummary } from '@/components/project-detail/BudgetSummary';
import { ResearchPaper } from '@/components/project-detail/ResearchPaper';
import { RelatedProjects } from '@/components/project-detail/RelatedProjects';
import { Sidebar } from '@/components/project-detail/Sidebar';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: `${project.title} — MAI`,
    description: project.subtitle,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const all = await getAllProjects();
  const byId = (id: number) => all.find((p) => p.id === id);
  const depends = project.dependsOn
    .map(byId)
    .filter(Boolean)
    .map((p) => ({ id: p!.id, slug: p!.slug, title: p!.title }));
  const feeds = project.feedsInto
    .map(byId)
    .filter(Boolean)
    .map((p) => ({ id: p!.id, slug: p!.slug, title: p!.title }));

  return (
    <>
      <ProjectHero project={project} />
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6 md:px-12">
          <Breadcrumb
            items={[
              { label: 'Portfolio', href: '/#portfolio' },
              { label: `#${project.id} ${project.title}` },
            ]}
          />
        </div>
      </div>
      <div className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            <Sidebar project={project} depends={depends} feeds={feeds} />
            <div>
              <ResearchOverview project={project} />
              <Methodology project={project} />
              <TechArchitecture project={project} />
              <DataPipeline project={project} />
              <ExpectedOutcomes project={project} />
              <Timeline project={project} />
              <RiskMatrix project={project} />
              <BudgetSummary project={project} />
              <ResearchPaper project={project} />
              <RelatedProjects project={project} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
