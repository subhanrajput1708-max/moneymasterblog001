import { PageId } from '../types';

export const CANONICAL_DOMAIN = 'https://www.moneymasterblog.site';

export const PAGE_PATHS: Record<PageId, string> = {
  home: '/',
  tools: '/p/tools.html',
  blog: '/p/blog-page.html',
  'blog-article': '/p/blog-page.html',
  about: '/p/about-us.html',
  contact: '/p/contact-us.html',
  privacy: '/p/privacy-policy.html',
  terms: '/p/terms-conditions.html',
  disclaimer: '/p/disclaimer.html',
  'editorial-policy': '/p/editorial-policy.html',
  robots: '/p/robots-txt.html',
};

/**
 * Returns canonical tool path
 */
export function getToolPath(toolId: string): string {
  return `/tools/${toolId}.html`;
}

/**
 * Derives the canonical Blogger post path for an article based on its published date and slug.
 * E.g., "January 14, 2026" + "how-to-clean-pdf" -> "/2026/01/how-to-clean-pdf.html"
 */
export function getBloggerPostPath(article: { publishedDate: string; slug: string; bloggerUrl?: string }): string {
  if (article.bloggerUrl) {
    return article.bloggerUrl.startsWith('/') ? article.bloggerUrl : `/${article.bloggerUrl}`;
  }
  const d = new Date(article.publishedDate);
  const year = isNaN(d.getFullYear()) ? 2026 : d.getFullYear();
  const month = isNaN(d.getMonth()) ? '03' : String(d.getMonth() + 1).padStart(2, '0');
  return `/${year}/${month}/${article.slug}.html`;
}

/**
 * Returns full canonical HTTPS URL without any hash fragments.
 */
export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${CANONICAL_DOMAIN}${cleanPath === '/' ? '/' : cleanPath}`;
}

/**
 * Parses current window location (pathname and hash) to determine current PageId, article slug, and tool ID.
 */
export function parseCurrentRoute(
  pathname: string = typeof window !== 'undefined' ? window.location.pathname : '/',
  rawHash: string = typeof window !== 'undefined' ? window.location.hash : ''
): { page: PageId; articleSlug: string | null; toolId: string | null } {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const hash = rawHash.replace('#', '').trim();

  // Check URL search params for ?tool=xyz
  let paramTool: string | null = null;
  if (typeof window !== 'undefined' && window.location.search) {
    const params = new URLSearchParams(window.location.search);
    paramTool = params.get('tool');
  }

  // 1. Check direct tool paths: /tools/{tool-id} or /tools/{tool-id}.html
  const toolMatch = cleanPath.match(/^\/tools\/([^/]+?)(?:\.html)?$/);
  if (toolMatch && toolMatch[1] && toolMatch[1] !== 'index') {
    return { page: 'tools', articleSlug: null, toolId: toolMatch[1] };
  }

  // 2. Check Blogger article post paths: /{year}/{month}/{slug}.html
  const bloggerPostMatch = cleanPath.match(/\d{4}\/\d{2}\/([^/]+?)(?:\.html)?$/);
  if (bloggerPostMatch && bloggerPostMatch[1]) {
    return { page: 'blog-article', articleSlug: bloggerPostMatch[1], toolId: null };
  }

  // 3. Check clean blog article path: /blog/{slug}
  const cleanBlogMatch = cleanPath.match(/^\/blog\/([^/]+)/);
  if (cleanBlogMatch && cleanBlogMatch[1] && cleanBlogMatch[1] !== 'index.html') {
    return { page: 'blog-article', articleSlug: cleanBlogMatch[1], toolId: null };
  }

  // 4. Check standalone Blogger pages:
  if (cleanPath.includes('/p/about-us.html') || cleanPath === '/about') {
    return { page: 'about', articleSlug: null, toolId: null };
  }
  if (cleanPath.includes('/p/contact-us.html') || cleanPath === '/contact') {
    return { page: 'contact', articleSlug: null, toolId: null };
  }
  if (cleanPath.includes('/p/privacy-policy.html') || cleanPath === '/privacy') {
    return { page: 'privacy', articleSlug: null, toolId: null };
  }
  if (cleanPath.includes('/p/terms-conditions.html') || cleanPath === '/terms') {
    return { page: 'terms', articleSlug: null, toolId: null };
  }
  if (cleanPath.includes('/p/disclaimer.html') || cleanPath === '/disclaimer') {
    return { page: 'disclaimer', articleSlug: null, toolId: null };
  }
  if (cleanPath.includes('/p/editorial-policy.html') || cleanPath === '/editorial-policy') {
    return { page: 'editorial-policy', articleSlug: null, toolId: null };
  }
  if (cleanPath.includes('/p/blog-page.html') || cleanPath.includes('/p/blog.html') || cleanPath === '/blog') {
    return { page: 'blog', articleSlug: null, toolId: null };
  }
  if (cleanPath.includes('/p/tools.html') || cleanPath === '/tools') {
    return { page: 'tools', articleSlug: null, toolId: paramTool };
  }
  if (
    cleanPath === '/robots.txt' ||
    cleanPath === '/robot.txt' ||
    cleanPath === '/robots' ||
    cleanPath === '/robot' ||
    cleanPath.includes('/p/robots-txt.html') ||
    cleanPath.includes('/p/robots.html') ||
    cleanPath.includes('/p/robot.html')
  ) {
    return { page: 'robots', articleSlug: null, toolId: null };
  }

  // 5. Check legacy or fallback hash navigation
  if (hash) {
    if (hash.startsWith('tools/') || hash.startsWith('tool/')) {
      const tId = hash.replace(/^(tools|tool)\//, '');
      if (tId) return { page: 'tools', articleSlug: null, toolId: tId };
    }
    if (hash.startsWith('blog/') || hash.startsWith('article/')) {
      const slug = hash.replace(/^(blog|article)\//, '');
      if (slug) return { page: 'blog-article', articleSlug: slug, toolId: null };
    }
    const validPages: PageId[] = [
      'home',
      'tools',
      'blog',
      'about',
      'contact',
      'privacy',
      'terms',
      'disclaimer',
      'editorial-policy',
      'robots',
    ];
    if (validPages.includes(hash as PageId)) {
      return { page: hash as PageId, articleSlug: null, toolId: paramTool };
    }
  }

  return { page: 'home', articleSlug: null, toolId: null };
}
