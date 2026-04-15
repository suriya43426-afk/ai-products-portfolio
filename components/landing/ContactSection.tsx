import { SectionHeader } from '@/components/ui/SectionHeader';

const MAIL = 'contact@mitrphol-ai.com';
const HQ = {
  name: 'Mitr Phol Sugar Corporation, Ltd.',
  address: 'Ploenchit Center Building 2, Sukhumvit Rd, Khlong Toei, Bangkok 10110',
  phone: '02 794 1000',
  mapsQuery: 'Mitr+Phol+Sugar+Corporation+Ploenchit+Center+Sukhumvit+Bangkok',
};

export function ContactSection() {
  return (
    <section id="contact" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <SectionHeader
          chip="Contact"
          title="Get in touch."
          subtitle="For partnerships, research collaboration, or investor inquiries — reach MitrPhol AI through the corporate office."
        />

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div className="space-y-10">
            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <div>
                <div className="text-sm font-semibold text-navy-900">Email</div>
                <a href={`mailto:${MAIL}`} className="mt-1 inline-block text-slate-700 hover:text-primary">
                  {MAIL}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11a3 3 0 100-6 3 3 0 000 6z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.5-7.5 11.25-7.5 11.25s-7.5-3.75-7.5-11.25a7.5 7.5 0 1115 0z" />
                </svg>
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-navy-900">Address</div>
                <div className="mt-1 font-semibold text-navy-900">{HQ.name}</div>
                <div className="mt-1 text-sm text-slate-600">{HQ.address}</div>
                <div className="mt-2 text-sm text-slate-600">
                  Tel: <a href={`tel:${HQ.phone.replace(/\s+/g, '')}`} className="hover:text-primary">{HQ.phone}</a>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${HQ.mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-light"
                >
                  Open in Google Maps
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path d="M11 3a1 1 0 100 2h2.586L7.293 11.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <iframe
              title="Mitr Phol Sugar Corporation on Google Maps"
              src={`https://maps.google.com/maps?q=${HQ.mapsQuery}&z=16&output=embed`}
              className="h-[360px] w-full md:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
