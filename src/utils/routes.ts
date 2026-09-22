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
};

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
 * Parses current window location (pathname and hash) to determine current PageId and article slug.
 */
export function parseCurrentRoute(
  pathname: string = typeof window !== 'undefined' ? window.location.pathname : '/',
  rawHash: string = typeof window !== 'undefined' ? window.location.hash : ''
): { page: PageId; articleSlug: string | null } {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const hash = rawHash.replace('#', '').trim();

  // 1. Check Blogger article post paths: /{year}/{month}/{slug}.html
  const bloggerPostMatch = cleanPath.match(/\d{4}\/\d{2}\/([^/]+?)(?:\.html)?$/);
  if (bloggerPostMatch && bloggerPostMatch[1]) {
    return { page: 'blog-article', articleSlug: bloggerPostMatch[1] };
  }

  // 2. Check clean blog article path: /blog/{slug}
  const cleanBlogMatch = cleanPath.match(/^\/blog\/([^/]+)/);
  if (cleanBlogMatch && cleanBlogMatch[1] && cleanBlogMatch[1] !== 'index.html') {
    return { page: 'blog-article', articleSlug: cleanBlogMatch[1] };
  }

  // 3. Check standalone Blogger pages:
  if (cleanPath.includes('/p/about-us.html') || cleanPath === '/about') {
    return { page: 'about', articleSlug: null };
  }
  if (cleanPath.includes('/p/contact-us.html') || cleanPath === '/contact') {
    return { page: 'contact', articleSlug: null };
  }
  if (cleanPath.includes('/p/privacy-policy.html') || cleanPath === '/privacy') {
    return { page: 'privacy', articleSlug: null };
  }
  if (cleanPath.includes('/p/terms-conditions.html') || cleanPath === '/terms') {
    return { page: 'terms', articleSlug: null };
  }
  if (cleanPath.includes('/p/disclaimer.html') || cleanPath === '/disclaimer') {
    return { page: 'disclaimer', articleSlug: null };
  }
  if (cleanPath.includes('/p/blog-page.html') || cleanPath === '/blog') {
    return { page: 'blog', articleSlug: null };
  }
  if (cleanPath.includes('/p/tools.html') || cleanPath === '/tools') {
    return { page: 'tools', articleSlug: null };
  }

  // 4. Check legacy or fallback hash navigation
  if (hash) {
    if (hash.startsWith('blog/') || hash.startsWith('article/')) {
      const slug = hash.replace(/^(blog|article)\//, '');
      if (slug) return { page: 'blog-article', articleSlug: slug };
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
    ];
    if (validPages.includes(hash as PageId)) {
      return { page: hash as PageId, articleSlug: null };
    }
  }

  return { page: 'home', articleSlug: null };
}
