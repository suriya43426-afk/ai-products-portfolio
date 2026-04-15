import type { ReactNode } from 'react';

export function SectionBlock({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-12 first:pt-0">
      <div className="flex items-baseline gap-4">
        <div className="text-xs font-semibold text-blue-600">{number}</div>
        <h2 className="font-serif text-3xl text-navy-900 md:text-4xl">{title}</h2>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
