'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'th';

type Dict = {
  nav: {
    about: string;
    portfolio: string;
    products: string;
    dataProducts: string;
    expertise: string;
    traction: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    blurb: string;
    viewPortfolio: string;
    contactUs: string;
  };
  products: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allBus: string;
    allStatus: string;
    allTypes: string;
    resultCount: (n: number) => string;
    noResults: string;
    clearFilters: string;
    openProject: string;
  };
  bu: { farm: string; factory: string; corporate: string };
  status: { active: string; pending: string; planning: string };
  type: { vendor: string; ownbuild: string; platform: string; genai: string; governance: string };
};

const en: Dict = {
  nav: {
    about: 'About',
    portfolio: 'Portfolio',
    products: 'AI Products',
    dataProducts: 'Data Products',
    expertise: 'Expertise',
    traction: 'Traction',
    contact: 'Contact',
  },
  hero: {
    eyebrow: 'MitrPhol AI · Center of Excellence',
    title: 'Applied AI at the scale of a 79-year industrial group.',
    blurb:
      "A deep-tech portfolio of nine AI products spanning farm, factory, and corporate data — built to compound returns across MitrPhol's operations.",
    viewPortfolio: 'View Portfolio',
    contactUs: 'Contact Us',
  },
  products: {
    title: 'AI Products',
    subtitle: 'Search MitrPhol AI’s portfolio by keyword, business unit, status, or type.',
    searchPlaceholder: 'Search products, tech, or keywords…',
    allBus: 'All Business Units',
    allStatus: 'All Status',
    allTypes: 'All Types',
    resultCount: (n) => `${n} ${n === 1 ? 'result' : 'results'}`,
    noResults: 'No products match your filters.',
    clearFilters: 'Clear filters',
    openProject: 'Open research',
  },
  bu: { farm: 'Smart Agriculture', factory: 'Smart Manufacturing', corporate: 'AI & Data Governance' },
  status: { active: 'Active', pending: 'Pending', planning: 'Planning' },
  type: { vendor: 'Vendor', ownbuild: 'Own-Build', platform: 'Platform', genai: 'GenAI', governance: 'Governance' },
};

const th: Dict = {
  nav: {
    about: 'เกี่ยวกับเรา',
    portfolio: 'พอร์ตโฟลิโอ',
    products: 'AI Products',
    dataProducts: 'Data Products',
    expertise: 'ความเชี่ยวชาญ',
    traction: 'ผลงาน',
    contact: 'ติดต่อเรา',
  },
  hero: {
    eyebrow: 'MitrPhol AI · ศูนย์ความเป็นเลิศด้าน AI',
    title: 'AI เชิงประยุกต์ในระดับกลุ่มอุตสาหกรรมที่อยู่คู่ไทยมา 79 ปี',
    blurb:
      'พอร์ตโฟลิโอเทคโนโลยีเชิงลึก 9 โครงการ AI ครอบคลุมไร่นา โรงงาน และข้อมูลองค์กร — ออกแบบเพื่อสร้างผลตอบแทนทบต้นให้กับธุรกิจมิตรผล',
    viewPortfolio: 'ดูพอร์ตโฟลิโอ',
    contactUs: 'ติดต่อเรา',
  },
  products: {
    title: 'AI Products',
    subtitle: 'ค้นหาพอร์ตโฟลิโอ AI ของมิตรผลด้วยคำค้น หน่วยธุรกิจ สถานะ หรือประเภท',
    searchPlaceholder: 'ค้นหา products, เทคโนโลยี, คำสำคัญ…',
    allBus: 'ทุกหน่วยธุรกิจ',
    allStatus: 'ทุกสถานะ',
    allTypes: 'ทุกประเภท',
    resultCount: (n) => `${n} รายการ`,
    noResults: 'ไม่พบ product ที่ตรงกับตัวกรอง',
    clearFilters: 'ล้างตัวกรอง',
    openProject: 'ดูรายละเอียด',
  },
  bu: { farm: 'เกษตรอัจฉริยะ', factory: 'โรงงานอัจฉริยะ', corporate: 'ธรรมาภิบาล AI & ข้อมูล' },
  status: { active: 'ใช้งานจริง', pending: 'นำร่อง', planning: 'กำลังวางแผน' },
  type: { vendor: 'Vendor', ownbuild: 'Own-Build', platform: 'Platform', genai: 'GenAI', governance: 'Governance' },
};

const DICTS: Record<Lang, Dict> = { en, th };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const stored = (typeof window !== 'undefined' && (localStorage.getItem('mai-lang') as Lang | null)) || null;
    if (stored === 'en' || stored === 'th') setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== 'undefined') localStorage.setItem('mai-lang', l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: DICTS[lang] }}>{children}</LanguageContext.Provider>
  );
}

export function useLang(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
