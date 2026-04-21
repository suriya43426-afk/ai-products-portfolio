import 'server-only';

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';

export interface FetchedArticle {
  url: string;
  title?: string;
  abstract?: string;
  introduction?: string;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function stripTags(s: string): string {
  return decodeEntities(
    s
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' '),
  ).trim();
}

function metaContent(html: string, name: string): string | undefined {
  const re = new RegExp(
    `<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']+)["']`,
    'i',
  );
  const m = html.match(re);
  if (m) return decodeEntities(m[1]).trim();
  // reversed attribute order
  const re2 = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["']${name}["']`,
    'i',
  );
  const m2 = html.match(re2);
  return m2 ? decodeEntities(m2[1]).trim() : undefined;
}

function extractAbstract(html: string): string | undefined {
  // Common citation_abstract
  const cit = metaContent(html, 'citation_abstract') || metaContent(html, 'dc.description');
  if (cit && cit.length > 80) return cit;

  // MDPI / arXiv / sciencedirect often expose og:description
  const og = metaContent(html, 'og:description') || metaContent(html, 'description');
  if (og && og.length > 80) return og;

  // Find <section|div class contains 'abstract'
  const m = html.match(
    /<(section|div|p)[^>]*class=["'][^"']*abstract[^"']*["'][^>]*>([\s\S]*?)<\/\1>/i,
  );
  if (m) {
    const text = stripTags(m[2]);
    if (text.length > 40) return text;
  }

  // arXiv abstract tag
  const ar = html.match(/<blockquote[^>]*class=["'][^"']*abstract[\s\S]*?<\/blockquote>/i);
  if (ar) {
    const text = stripTags(ar[0]).replace(/^Abstract:?\s*/i, '');
    if (text.length > 40) return text;
  }

  return undefined;
}

function extractIntroduction(html: string): string | undefined {
  // Look for <h2|h3 id or text containing "Introduction"
  const m = html.match(
    /<h[1-3][^>]*>\s*(?:1\.?\s*)?introduction\s*<\/h[1-3]>([\s\S]*?)<h[1-3]/i,
  );
  if (m) {
    const text = stripTags(m[1]);
    if (text.length > 80) return text.slice(0, 3000);
  }
  return undefined;
}

export async function fetchArticleContent(url: string, timeoutMs = 12000): Promise<FetchedArticle> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': UA,
        Accept: 'text/html,application/xhtml+xml',
      },
      redirect: 'follow',
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    return {
      url,
      title: metaContent(html, 'citation_title') || metaContent(html, 'og:title'),
      abstract: extractAbstract(html),
      introduction: extractIntroduction(html),
    };
  } finally {
    clearTimeout(t);
  }
}
