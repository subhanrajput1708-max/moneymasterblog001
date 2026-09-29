/**
 * Automated Sitemap & Static HTML Page Generator for Money Master Blog
 * 
 * Generates:
 * 1. Valid sitemaps.org XML sitemap with 100% real, canonical, crawlable Blogger URLs (NO hash fragments).
 * 2. High-fidelity static HTML pre-rendered pages in dist/ for all Blogger URLs (/p/*.html, /{year}/{month}/*.html)
 *    and homepage with rich semantic content, deep internal link graph, and Schema.org JSON-LD (Breadcrumbs, FAQPage, WebSite, BlogPosting).
 * 3. Synchronized robots.txt, CNAME, and ads.txt configurations.
 */

import fs from 'fs';
import path from 'path';
import { BLOG_ARTICLES, getRelatedArticles } from '../src/data/blogArticles';
import { CANONICAL_DOMAIN, PAGE_PATHS, getBloggerPostPath, getCanonicalUrl } from '../src/utils/routes';

interface CorePageDef {
  id: string;
  path: string;
  priority: string;
  changefreq: string;
  title: string;
  description: string;
  alternatePaths?: string[];
}

const CORE_PAGES: CorePageDef[] = [
  {
    id: 'home',
    path: '/',
    priority: '1.0',
    changefreq: 'daily',
    title: 'Money Master Blog – Simple Online Tools for Everyday Tasks',
    description: 'Money Master Blog provides simple online tools for generating color palettes, creating placeholder text, cleaning text, and completing everyday digital tasks.',
  },
  {
    id: 'tools',
    path: '/p/tools.html',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'Online Tools – Money Master Blog',
    description: 'Explore free, lightweight browser-based tools on Money Master Blog including our Color Palette Generator, Text Cleaner, and Lorem Ipsum Generator.',
    alternatePaths: ['/tools/index.html', '/tools.html'],
  },
  {
    id: 'blog',
    path: '/p/blog-page.html',
    priority: '0.9',
    changefreq: 'daily',
    title: 'Practical Guides & Digital Productivity Tips – Money Master Blog',
    description: 'Browse practical guides on cleaning text, preparing spreadsheets, removing hidden characters, and improving digital productivity workflows.',
    alternatePaths: ['/blog/index.html', '/blog.html'],
  },
  {
    id: 'about',
    path: '/p/about-us.html',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'About Us – Money Master Blog',
    description: 'Learn about Money Master Blog and author Shahid Ali, featuring 7 years of practical experience with online utilities and everyday digital content workflows.',
    alternatePaths: ['/about/index.html', '/about.html'],
  },
  {
    id: 'contact',
    path: '/p/contact-us.html',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Contact Us – Money Master Blog',
    description: 'Get in touch with Shahid Ali at Money Master Blog to share tool suggestions, report bugs, or provide feedback on our browser utilities.',
    alternatePaths: ['/contact/index.html', '/contact.html'],
  },
  {
    id: 'privacy',
    path: '/p/privacy-policy.html',
    priority: '0.5',
    changefreq: 'monthly',
    title: 'Privacy Policy – Money Master Blog',
    description: 'Read the Money Master Blog Privacy Policy. Learn why our client-side browser tools process all text and colors locally without storing your data.',
    alternatePaths: ['/privacy/index.html', '/privacy.html'],
  },
  {
    id: 'terms',
    path: '/p/terms-conditions.html',
    priority: '0.5',
    changefreq: 'monthly',
    title: 'Terms & Conditions – Money Master Blog',
    description: 'Review the Terms and Conditions for using Money Master Blog. Understand permitted usage, commercial output rights, and user guidelines.',
    alternatePaths: ['/terms/index.html', '/terms.html'],
  },
  {
    id: 'disclaimer',
    path: '/p/disclaimer.html',
    priority: '0.5',
    changefreq: 'monthly',
    title: 'Website Disclaimer – Money Master Blog',
    description: 'Read the Money Master Blog Disclaimer regarding tool accuracy, monitor color calibration, text tokenization differences, and productivity use.',
    alternatePaths: ['/disclaimer/index.html', '/disclaimer.html'],
  },
];

const ALL_TOOLS = [
  { id: 'color-palette', name: 'Color Palette Generator', category: 'Colors', summary: 'Generate harmonic color palettes, view HEX values, lock chosen tones, and copy CSS color values.' },
  { id: 'lorem-ipsum', name: 'Lorem Ipsum Generator', category: 'Text', summary: 'Create custom placeholder text by paragraph, sentence, or word count for layouts and mockups.' },
  { id: 'word-counter', name: 'Text Cleaner & Case Converter', category: 'Text', summary: 'Clean text, remove extra spaces, inspect real-time character metrics, and convert letter casing.' },
  { id: 'password-generator', name: 'Random Password Generator', category: 'Security', summary: 'Generate cryptographically strong random passwords client-side with custom character filters.' },
  { id: 'text-sorter', name: 'Text Sorter', category: 'Text', summary: 'Sort lines of text quickly using different sorting methods directly in the browser.' },
  { id: 'find-replace', name: 'Find & Replace Text', category: 'Text', summary: 'Find specific words or phrases in text and replace them quickly without manually editing every occurrence.' },
  { id: 'remove-line-breaks', name: 'Remove Line Breaks', category: 'Text', summary: 'Convert text containing unnecessary line breaks into cleaner continuous text.' },
  { id: 'duplicate-remover', name: 'Duplicate Line Remover', category: 'Text', summary: 'Find and remove repeated lines from lists and text while keeping the unique lines.' },
  { id: 'whitespace-remover', name: 'Whitespace Remover', category: 'Text', summary: 'Clean unnecessary spaces, tabs, and extra whitespace from text.' },
  { id: 'line-counter', name: 'Text Line Counter', category: 'Text', summary: 'Count lines in a text input and provide useful basic text statistics.' },
  { id: 'invisible-character-remover', name: 'Invisible Character Remover', category: 'Text', summary: 'Detect and remove hidden Unicode characters, zero-width spaces, byte order marks, and formatting artifacts.' },
  { id: 'punctuation-cleaner', name: 'Text Punctuation Cleaner', category: 'Text', summary: 'Clean, normalize, or remove erratic and repeated punctuation marks while preserving numbers and contractions.' },
  { id: 'number-extractor', name: 'Text Number Extractor', category: 'Text', summary: 'Extract integers, decimals, prices, percentages, or formatted numbers quickly from paragraphs or logs.' },
  { id: 'quote-remover', name: 'Text Quote Remover', category: 'Text', summary: 'Identify and strip quotation marks, remove quoted dialogue sections, or extract quoted content across all styles.' },
  { id: 'prefix-suffix-cleaner', name: 'Text Prefix & Suffix Cleaner', category: 'Text', summary: 'Add, remove, or modify prefixes and suffixes across every line with case-matching and line numbering options.' },
];

function formatDateToIso(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    return '2026-03-20';
  }
  return d.toISOString().split('T')[0];
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function generateSitemapXml(): string {
  const today = new Date().toISOString().split('T')[0];
  const lines: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
    '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9',
    '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
    '  <!-- Core Site Pages (Real Standalone Blogger Page URLs) -->',
  ];

  for (const page of CORE_PAGES) {
    const loc = getCanonicalUrl(page.path);
    lines.push('  <url>');
    lines.push(`    <loc>${escapeXml(loc)}</loc>`);
    lines.push(`    <lastmod>${today}</lastmod>`);
    lines.push(`    <changefreq>${page.changefreq}</changefreq>`);
    lines.push(`    <priority>${page.priority}</priority>`);
    lines.push('  </url>');
  }

  lines.push('');
  lines.push(`  <!-- ${BLOG_ARTICLES.length} Practical Guides (Real Standalone Blogger Post URLs) -->`);

  for (const article of BLOG_ARTICLES) {
    const postPath = getBloggerPostPath(article);
    const loc = getCanonicalUrl(postPath);
    const lastmod = formatDateToIso(article.updatedDate || article.publishedDate);

    lines.push('  <url>');
    lines.push(`    <loc>${escapeXml(loc)}</loc>`);
    lines.push(`    <lastmod>${lastmod}</lastmod>`);
    lines.push('    <changefreq>monthly</changefreq>');
    lines.push('    <priority>0.8</priority>');
    lines.push('  </url>');
  }

  lines.push('</urlset>');
  lines.push('');

  return lines.join('\n');
}

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  fs.mkdirSync(dirname, { recursive: true });
}

function renderHeader(): string {
  return `
  <header style="background: #ffffff; border-bottom: 1px solid #e5e7eb; padding: 16px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <div style="max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px;">
      <div>
        <a href="/" style="font-size: 20px; font-weight: 700; color: #111827; text-decoration: none;">Money Master Blog</a>
        <p style="font-size: 13px; color: #6b7280; margin: 2px 0 0 0;">Simple Online Tools &amp; Practical Guides</p>
      </div>
      <nav style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 14px; font-weight: 500;">
        <a href="/" style="color: #374151; text-decoration: none;">Home</a>
        <a href="/p/tools.html" style="color: #374151; text-decoration: none;">Online Tools</a>
        <a href="/p/blog-page.html" style="color: #374151; text-decoration: none;">Practical Guides</a>
        <a href="/p/about-us.html" style="color: #374151; text-decoration: none;">About Us</a>
        <a href="/p/contact-us.html" style="color: #374151; text-decoration: none;">Contact Us</a>
      </nav>
    </div>
  </header>`;
}

function renderFooter(): string {
  return `
  <footer style="background: #111827; color: #9ca3af; padding: 48px 24px; margin-top: 64px; font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6;">
    <div style="max-width: 1200px; margin: 0 auto;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 32px; margin-bottom: 32px;">
        <div>
          <h3 style="color: #ffffff; font-size: 16px; font-weight: 600; margin-bottom: 12px;">Money Master Blog</h3>
          <p style="margin-bottom: 12px;">Lightweight, privacy-respecting browser utilities and real-world formatting guides. Created and maintained by <strong>Shahid Ali</strong> (7 years practical experience).</p>
          <p style="color: #10b981; font-size: 13px;">✔ 100% Client-Side • Zero Data Storage • Completely Free</p>
        </div>
        <div>
          <h4 style="color: #ffffff; font-size: 15px; font-weight: 600; margin-bottom: 12px;">Essential Tools</h4>
          <ul style="list-style: none; padding: 0; margin: 0; line-height: 2;">
            <li><a href="/p/tools.html" style="color: #d1d5db; text-decoration: none;">All 15 Browser Tools</a></li>
            <li><a href="/p/tools.html" style="color: #d1d5db; text-decoration: none;">Color Palette Generator</a></li>
            <li><a href="/p/tools.html" style="color: #d1d5db; text-decoration: none;">Text Cleaner &amp; Case Converter</a></li>
            <li><a href="/p/tools.html" style="color: #d1d5db; text-decoration: none;">Duplicate Line Remover</a></li>
            <li><a href="/p/tools.html" style="color: #d1d5db; text-decoration: none;">Invisible Character Remover</a></li>
          </ul>
        </div>
        <div>
          <h4 style="color: #ffffff; font-size: 15px; font-weight: 600; margin-bottom: 12px;">Featured Guides</h4>
          <ul style="list-style: none; padding: 0; margin: 0; line-height: 2;">
            <li><a href="/p/blog-page.html" style="color: #d1d5db; text-decoration: none;">All 20 Productivity Guides</a></li>
            <li><a href="/2026/01/how-to-clean-text-copied-from-pdf-without-losing-formatting.html" style="color: #d1d5db; text-decoration: none;">Fix Broken PDF Line Breaks</a></li>
            <li><a href="/2026/01/how-to-remove-invisible-and-zero-width-characters-from-text.html" style="color: #d1d5db; text-decoration: none;">Remove Zero-Width Spaces</a></li>
            <li><a href="/2026/02/how-to-sort-a-messy-name-list-alphabetically-by-first-or-last-name.html" style="color: #d1d5db; text-decoration: none;">Sort Messy Name Lists</a></li>
          </ul>
        </div>
        <div>
          <h4 style="color: #ffffff; font-size: 15px; font-weight: 600; margin-bottom: 12px;">Editorial &amp; Legal</h4>
          <ul style="list-style: none; padding: 0; margin: 0; line-height: 2;">
            <li><a href="/p/about-us.html" style="color: #d1d5db; text-decoration: none;">About Shahid Ali</a></li>
            <li><a href="/p/contact-us.html" style="color: #d1d5db; text-decoration: none;">Contact Us</a></li>
            <li><a href="/p/privacy-policy.html" style="color: #d1d5db; text-decoration: none;">Privacy Policy</a></li>
            <li><a href="/p/terms-conditions.html" style="color: #d1d5db; text-decoration: none;">Terms &amp; Conditions</a></li>
            <li><a href="/p/disclaimer.html" style="color: #d1d5db; text-decoration: none;">Website Disclaimer</a></li>
          </ul>
        </div>
      </div>
      <div style="border-top: 1px solid #374151; padding-top: 24px; text-align: center; font-size: 13px;">
        <p>&copy; 2026 Money Master Blog (https://www.moneymasterblog.site/). All rights reserved.</p>
      </div>
    </div>
  </footer>`;
}

function renderBreadcrumbNav(items: { name: string; url?: string }[]): string {
  const parts = items.map((item, index) => {
    const isLast = index === items.length - 1;
    if (isLast || !item.url) {
      return `<span style="color: #4b5563; font-weight: 600;">${escapeXml(item.name)}</span>`;
    }
    return `<a href="${escapeXml(item.url)}" style="color: #2563eb; text-decoration: none;">${escapeXml(item.name)}</a>`;
  });
  return `
  <nav aria-label="Breadcrumb" style="padding: 12px 0; margin-bottom: 24px; font-size: 14px; border-bottom: 1px solid #f3f4f6;">
    <div style="max-width: 1000px; margin: 0 auto; padding: 0 16px;">
      ${parts.join(' <span style="color: #9ca3af; margin: 0 6px;">/</span> ')}
    </div>
  </nav>`;
}

function renderHomePageBody(): string {
  return `
  ${renderHeader()}
  <main style="max-width: 1200px; margin: 0 auto; padding: 40px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <section style="text-align: center; margin-bottom: 48px; padding: 40px 20px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px;">
      <h1 style="font-size: 32px; font-weight: 800; color: #111827; margin-bottom: 16px; line-height: 1.25;">Simple Online Tools for Everyday Tasks</h1>
      <p style="font-size: 18px; color: #4b5563; max-width: 780px; margin: 0 auto 24px auto; line-height: 1.6;">
        Money Master Blog provides 15 fast, 100% browser-based utilities and 20 in-depth practical guides. Clean text formatting, convert casing, strip line breaks, eliminate duplicates, and generate secure passwords with zero server storage.
      </p>
      <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
        <a href="/p/tools.html" style="background: #111827; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: 600; text-decoration: none;">Explore 15 Online Tools</a>
        <a href="/p/blog-page.html" style="background: #f3f4f6; color: #1f2937; padding: 12px 24px; border-radius: 8px; font-weight: 600; text-decoration: none;">Read Practical Guides</a>
      </div>
    </section>

    <section style="margin-bottom: 56px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 24px;">
        <h2 style="font-size: 24px; font-weight: 700; color: #111827;">Essential Online Tools</h2>
        <a href="/p/tools.html" style="color: #2563eb; font-weight: 600; text-decoration: none; font-size: 15px;">View all 15 tools →</a>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
        ${ALL_TOOLS.map(t => `
          <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <span style="display: inline-block; font-size: 12px; font-weight: 600; padding: 4px 8px; border-radius: 4px; background: #e0f2fe; color: #0369a1; margin-bottom: 8px;">${escapeXml(t.category)}</span>
              <h3 style="font-size: 18px; font-weight: 600; margin: 0 0 8px 0;"><a href="/p/tools.html" style="color: #111827; text-decoration: none;">${escapeXml(t.name)}</a></h3>
              <p style="font-size: 14px; color: #6b7280; line-height: 1.5; margin: 0 0 16px 0;">${escapeXml(t.summary)}</p>
            </div>
            <a href="/p/tools.html" style="color: #2563eb; font-size: 14px; font-weight: 600; text-decoration: none;">Open Tool →</a>
          </div>
        `).join('')}
      </div>
    </section>

    <section style="margin-bottom: 56px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 24px;">
        <h2 style="font-size: 24px; font-weight: 700; color: #111827;">Practical Productivity Guides</h2>
        <a href="/p/blog-page.html" style="color: #2563eb; font-weight: 600; text-decoration: none; font-size: 15px;">Browse all 20 guides →</a>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
        ${BLOG_ARTICLES.map(a => {
          const postPath = getBloggerPostPath(a);
          return `
          <article style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; color: #6b7280; margin-bottom: 8px;">
                <span>${escapeXml(a.category)}</span>
                <time datetime="${formatDateToIso(a.publishedDate)}">${escapeXml(a.publishedDate)}</time>
              </div>
              <h3 style="font-size: 19px; font-weight: 700; line-height: 1.35; margin: 0 0 10px 0;">
                <a href="${postPath}" style="color: #111827; text-decoration: none;">${escapeXml(a.title)}</a>
              </h3>
              <p style="font-size: 14px; color: #4b5563; line-height: 1.55; margin: 0 0 16px 0;">${escapeXml(a.excerpt)}</p>
            </div>
            <a href="${postPath}" style="color: #2563eb; font-weight: 600; font-size: 14px; text-decoration: none;">Read Full Guide (${escapeXml(a.readingTime)}) →</a>
          </article>
        `;
        }).join('')}
      </div>
    </section>

    <section style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 32px; margin-bottom: 32px;">
      <h2 style="font-size: 22px; font-weight: 700; color: #111827; margin-bottom: 12px;">Curated by Shahid Ali (7 Years Practical Experience)</h2>
      <p style="color: #4b5563; line-height: 1.7; margin-bottom: 16px;">
        Money Master Blog was founded by Shahid Ali after 7 years working with digital content operations, text formatting, and online publishing. Our editorial mission is simple: provide clean, lightning-fast utilities without deceptive download buttons, invasive ads, or forced accounts.
      </p>
      <p style="color: #4b5563; line-height: 1.7;">
        Learn more on our <a href="/p/about-us.html" style="color: #2563eb; font-weight: 600;">About Us</a> page or get in touch on the <a href="/p/contact-us.html" style="color: #2563eb; font-weight: 600;">Contact Us</a> page.
      </p>
    </section>
  </main>
  ${renderFooter()}`;
}

function renderToolsPageBody(): string {
  return `
  ${renderHeader()}
  ${renderBreadcrumbNav([{ name: 'Home', url: '/' }, { name: 'Online Tools' }])}
  <main style="max-width: 1100px; margin: 0 auto; padding: 24px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6;">
    <header style="margin-bottom: 36px; text-align: center;">
      <h1 style="font-size: 32px; font-weight: 800; color: #111827; margin-bottom: 12px;">Online Tools – 15 Browser Utilities</h1>
      <p style="font-size: 17px; color: #4b5563; max-width: 750px; margin: 0 auto;">
        Free, lightweight browser utilities for color harmonies, word counting, casing conversion, password generation, line breaking, deduplication, and text cleanup.
      </p>
    </header>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 48px;">
      ${ALL_TOOLS.map(tool => `
        <section style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 24px;">
          <span style="display: inline-block; font-size: 12px; font-weight: 600; padding: 3px 8px; border-radius: 4px; background: #f3f4f6; color: #374151; margin-bottom: 8px;">${escapeXml(tool.category)}</span>
          <h2 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 10px 0;">${escapeXml(tool.name)}</h2>
          <p style="font-size: 14px; color: #4b5563; line-height: 1.55; margin-bottom: 16px;">${escapeXml(tool.summary)}</p>
          <a href="/p/tools.html" style="display: inline-block; background: #111827; color: #ffffff; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; text-decoration: none;">Use Tool Locally</a>
        </section>
      `).join('')}
    </div>

    <section style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 32px; margin-bottom: 40px;">
      <h2 style="font-size: 22px; font-weight: 700; color: #111827; margin-bottom: 12px;">Why Choose Client-Side Tools on Money Master Blog?</h2>
      <ul style="color: #4b5563; line-height: 1.8; padding-left: 20px;">
        <li><strong>Complete Privacy:</strong> Your text, customer records, and passwords never leave your browser DOM memory.</li>
        <li><strong>Instant Zero-Latency Execution:</strong> Computations run natively on your device without server latency or network lag.</li>
        <li><strong>No Paywalls or Registration:</strong> All 15 tools are 100% accessible to every visitor worldwide.</li>
      </ul>
      <p style="margin-top: 16px;"><a href="/p/blog-page.html" style="color: #2563eb; font-weight: 600;">View our 20 practical guides on using these tools →</a></p>
    </section>
  </main>
  ${renderFooter()}`;
}

function renderBlogIndexBody(): string {
  return `
  ${renderHeader()}
  ${renderBreadcrumbNav([{ name: 'Home', url: '/' }, { name: 'Practical Guides' }])}
  <main style="max-width: 1100px; margin: 0 auto; padding: 24px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6;">
    <header style="margin-bottom: 40px; text-align: center;">
      <h1 style="font-size: 32px; font-weight: 800; color: #111827; margin-bottom: 12px;">Practical Guides &amp; Digital Productivity Tips</h1>
      <p style="font-size: 17px; color: #4b5563; max-width: 780px; margin: 0 auto;">
        20 in-depth articles curated by Shahid Ali addressing real-world text formatting friction, data preparation, spreadsheet hygiene, and digital productivity workflows.
      </p>
    </header>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; margin-bottom: 48px;">
      ${BLOG_ARTICLES.map(article => {
        const postPath = getBloggerPostPath(article);
        return `
        <article style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 13px; color: #6b7280; margin-bottom: 8px;">
              <span style="font-weight: 600; color: #0284c7;">${escapeXml(article.category)}</span>
              <time datetime="${formatDateToIso(article.publishedDate)}">${escapeXml(article.publishedDate)}</time>
            </div>
            <h2 style="font-size: 20px; font-weight: 700; line-height: 1.35; margin: 0 0 10px 0;">
              <a href="${postPath}" style="color: #111827; text-decoration: none;">${escapeXml(article.title)}</a>
            </h2>
            <p style="font-size: 14px; color: #4b5563; line-height: 1.55; margin: 0 0 16px 0;">${escapeXml(article.excerpt)}</p>
          </div>
          <div style="border-top: 1px solid #f3f4f6; padding-top: 14px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 13px; color: #6b7280;">${escapeXml(article.readingTime)}</span>
            <a href="${postPath}" style="color: #2563eb; font-weight: 600; font-size: 14px; text-decoration: none;">Read Guide →</a>
          </div>
        </article>`;
      }).join('')}
    </div>
  </main>
  ${renderFooter()}`;
}

function renderArticleBody(article: typeof BLOG_ARTICLES[0]): string {
  const postPath = getBloggerPostPath(article);
  const related = getRelatedArticles(article.slug, 3);

  return `
  ${renderHeader()}
  ${renderBreadcrumbNav([
    { name: 'Home', url: '/' },
    { name: 'Practical Guides', url: '/p/blog-page.html' },
    { name: article.title }
  ])}
  <main style="max-width: 840px; margin: 0 auto; padding: 24px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #1f2937;">
    <article>
      <header style="margin-bottom: 32px; border-bottom: 1px solid #e5e7eb; padding-bottom: 24px;">
        <div style="display: flex; flex-wrap: wrap; gap: 12px; font-size: 14px; color: #6b7280; margin-bottom: 12px;">
          <span style="background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 4px; font-weight: 600;">${escapeXml(article.category)}</span>
          <span>By <strong>Shahid Ali</strong></span>
          <span>•</span>
          <time datetime="${formatDateToIso(article.publishedDate)}">${escapeXml(article.publishedDate)}</time>
          <span>•</span>
          <span>${escapeXml(article.readingTime)}</span>
        </div>
        <h1 style="font-size: 32px; font-weight: 800; color: #111827; line-height: 1.25; margin: 0 0 16px 0;">${escapeXml(article.title)}</h1>
        <p style="font-size: 18px; color: #4b5563; line-height: 1.6; margin: 0;">${escapeXml(article.excerpt)}</p>
      </header>

      <section style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 20px; border-radius: 0 8px 8px 0; margin-bottom: 32px;">
        <strong style="color: #166534; font-size: 15px; display: block; margin-bottom: 6px;">⚡ Quick Takeaway</strong>
        <p style="color: #15803d; margin: 0; font-size: 15px;">${escapeXml(article.quickAnswer)}</p>
      </section>

      ${article.sections.map(section => `
        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 14px 0;">${escapeXml(section.heading)}</h2>
          ${section.paragraphs.map(p => `<p style="margin: 0 0 14px 0;">${escapeXml(p)}</p>`).join('')}
          ${section.bulletPoints && section.bulletPoints.length > 0 ? `
            <ul style="padding-left: 20px; margin: 0 0 16px 0;">
              ${section.bulletPoints.map(bp => `<li style="margin-bottom: 6px;">${escapeXml(bp)}</li>`).join('')}
            </ul>
          ` : ''}
          ${section.example ? `
            <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 16px 0;">
              <strong style="font-size: 14px; color: #374151; display: block; margin-bottom: 8px;">Example: ${escapeXml(section.example.title)}</strong>
              <div style="font-family: monospace; font-size: 13px; background: #ffffff; border: 1px solid #e5e7eb; padding: 10px; border-radius: 6px; margin-bottom: 8px; color: #dc2626;"><strong>Before:</strong> ${escapeXml(section.example.before)}</div>
              <div style="font-family: monospace; font-size: 13px; background: #ffffff; border: 1px solid #e5e7eb; padding: 10px; border-radius: 6px; color: #16a34a;"><strong>After:</strong> ${escapeXml(section.example.after)}</div>
            </div>
          ` : ''}
        </section>
      `).join('')}

      ${article.faqs && article.faqs.length > 0 ? `
        <section style="margin: 40px 0; border-top: 1px solid #e5e7eb; padding-top: 32px;">
          <h2 style="font-size: 22px; font-weight: 700; color: #111827; margin-bottom: 20px;">Frequently Asked Questions</h2>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${article.faqs.map(faq => `
              <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 18px;">
                <h3 style="font-size: 16px; font-weight: 600; color: #111827; margin: 0 0 8px 0;">${escapeXml(faq.question)}</h3>
                <p style="margin: 0; color: #4b5563; font-size: 14px;">${escapeXml(faq.answer)}</p>
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}

      <section style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 24px; margin: 40px 0; text-align: center;">
        <h3 style="font-size: 18px; font-weight: 700; color: #1e3a8a; margin: 0 0 8px 0;">Ready to apply these techniques?</h3>
        <p style="color: #1e40af; font-size: 14px; margin: 0 0 16px 0;">Try our 15 free browser utilities directly on Money Master Blog with 100% local privacy.</p>
        <a href="/p/tools.html" style="display: inline-block; background: #1d4ed8; color: #ffffff; padding: 10px 20px; border-radius: 6px; font-weight: 600; font-size: 14px; text-decoration: none;">Open Online Tools Directory</a>
      </section>

      <section style="border-top: 1px solid #e5e7eb; padding-top: 32px; margin-top: 40px;">
        <h3 style="font-size: 20px; font-weight: 700; color: #111827; margin-bottom: 16px;">Related Practical Guides</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
          ${related.map(r => `
            <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
              <span style="font-size: 12px; color: #0284c7; font-weight: 600;">${escapeXml(r.category)}</span>
              <h4 style="font-size: 15px; font-weight: 600; margin: 6px 0 8px 0;"><a href="${getBloggerPostPath(r)}" style="color: #111827; text-decoration: none;">${escapeXml(r.title)}</a></h4>
              <a href="${getBloggerPostPath(r)}" style="font-size: 13px; color: #2563eb; text-decoration: none; font-weight: 600;">Read Guide →</a>
            </div>
          `).join('')}
        </div>
      </section>
    </article>
  </main>
  ${renderFooter()}`;
}

function renderAboutPageBody(): string {
  return `
  ${renderHeader()}
  ${renderBreadcrumbNav([{ name: 'Home', url: '/' }, { name: 'About Us' }])}
  <main style="max-width: 900px; margin: 0 auto; padding: 24px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #1f2937;">
    <header style="margin-bottom: 32px; border-bottom: 1px solid #e5e7eb; padding-bottom: 24px;">
      <h1 style="font-size: 32px; font-weight: 800; color: #111827; margin-bottom: 12px;">About Money Master Blog &amp; Shahid Ali</h1>
      <p style="font-size: 18px; color: #4b5563;">7 Years of Practical Experience in Online Utilities &amp; Digital Content Workflows</p>
    </header>

    <section style="margin-bottom: 32px;">
      <h2 style="font-size: 22px; font-weight: 700; color: #111827; margin-bottom: 14px;">Editorial Mission</h2>
      <p style="margin-bottom: 14px;">Money Master Blog was founded and is maintained by Shahid Ali. After 7 years of relying on web utilities for daily text drafting, layout formatting, and content design, Shahid grew frustrated with how cluttered modern utility websites had become—cluttered with intrusive ads, misleading download buttons, paywalls, and invasive tracking cookies.</p>
      <p>Money Master Blog proves that online tools can remain fast, transparent, and completely free. Every tool runs locally in your browser DOM, ensuring your private lists, passwords, and copy remain exclusively on your device.</p>
    </section>

    <section style="margin-bottom: 32px;">
      <h2 style="font-size: 22px; font-weight: 700; color: #111827; margin-bottom: 14px;">Our Core Philosophy: Functional Simplicity</h2>
      <ul style="padding-left: 20px; line-height: 1.8;">
        <li><strong>No Paywalls or Accounts:</strong> All 15 tools and 20 guides are open and free forever.</li>
        <li><strong>Client-Side Processing:</strong> Computations run natively in browser memory. Nothing is sent to remote servers.</li>
        <li><strong>Honest Representation:</strong> We do not fabricate fake certifications or awards; we rely solely on functional speed and utility.</li>
      </ul>
    </section>

    <section style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
      <h2 style="font-size: 20px; font-weight: 700; color: #111827; margin-bottom: 12px;">Get in Touch</h2>
      <p style="margin-bottom: 12px;">Have suggestions for new utilities or found a bug? We welcome community feedback.</p>
      <a href="/p/contact-us.html" style="color: #2563eb; font-weight: 600; text-decoration: none;">Contact Shahid Ali via the Contact Us Page →</a>
    </section>
  </main>
  ${renderFooter()}`;
}

function renderContactPageBody(): string {
  return `
  ${renderHeader()}
  ${renderBreadcrumbNav([{ name: 'Home', url: '/' }, { name: 'Contact Us' }])}
  <main style="max-width: 900px; margin: 0 auto; padding: 24px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #1f2937;">
    <header style="margin-bottom: 32px; border-bottom: 1px solid #e5e7eb; padding-bottom: 24px;">
      <h1 style="font-size: 32px; font-weight: 800; color: #111827; margin-bottom: 12px;">Contact Us – Money Master Blog</h1>
      <p style="font-size: 18px; color: #4b5563;">Direct Feedback, Tool Suggestions, and Support</p>
    </header>

    <section style="margin-bottom: 32px;">
      <h2 style="font-size: 22px; font-weight: 700; color: #111827; margin-bottom: 14px;">How to Reach Shahid Ali</h2>
      <p style="margin-bottom: 14px;">We appreciate hearing from our visitors. If you have an idea for a new text utility, want to report an issue, or need clarification on any of our 20 practical guides, please get in touch.</p>
      <p>We review inquiries regularly and aim to respond within 24 to 48 business hours.</p>
    </section>

    <section style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
      <h2 style="font-size: 20px; font-weight: 700; color: #111827; margin-bottom: 12px;">Guidelines for Submitting Feature Requests</h2>
      <ul style="padding-left: 20px; line-height: 1.8;">
        <li>Explain the specific formatting or text problem you are trying to solve.</li>
        <li>Provide sample input text and the desired clean output format.</li>
        <li>Note whether the feature would benefit general web users.</li>
      </ul>
    </section>
  </main>
  ${renderFooter()}`;
}

function renderLegalPageBody(title: string, description: string, bodyText: string): string {
  return `
  ${renderHeader()}
  ${renderBreadcrumbNav([{ name: 'Home', url: '/' }, { name: title }])}
  <main style="max-width: 900px; margin: 0 auto; padding: 24px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #1f2937;">
    <header style="margin-bottom: 32px; border-bottom: 1px solid #e5e7eb; padding-bottom: 24px;">
      <h1 style="font-size: 32px; font-weight: 800; color: #111827; margin-bottom: 12px;">${escapeXml(title)}</h1>
      <p style="font-size: 16px; color: #4b5563;">${escapeXml(description)}</p>
    </header>
    <div style="font-size: 15px; color: #374151;">
      ${bodyText}
    </div>
  </main>
  ${renderFooter()}`;
}

function generateStaticHtml(
  templateHtml: string,
  meta: {
    title: string;
    description: string;
    canonicalUrl: string;
    jsonLd?: object | object[];
    bodyContent?: string;
  }
): string {
  let html = templateHtml;

  // Replace <title>
  html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeXml(meta.title)}</title>`);

  // Replace or add meta description
  if (html.includes('<meta name="description"')) {
    html = html.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${escapeXml(meta.description)}" />`);
  } else {
    html = html.replace('</head>', `  <meta name="description" content="${escapeXml(meta.description)}" />\n  </head>`);
  }

  // Replace or add og:title
  if (html.includes('<meta property="og:title"')) {
    html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${escapeXml(meta.title)}" />`);
  }

  // Replace or add og:description
  if (html.includes('<meta property="og:description"')) {
    html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${escapeXml(meta.description)}" />`);
  }

  // Replace or add og:url
  if (html.includes('<meta property="og:url"')) {
    html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${escapeXml(meta.canonicalUrl)}" />`);
  } else {
    html = html.replace('</head>', `  <meta property="og:url" content="${escapeXml(meta.canonicalUrl)}" />\n  </head>`);
  }

  // Replace or add canonical link
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${escapeXml(meta.canonicalUrl)}" />`);
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${escapeXml(meta.canonicalUrl)}" />\n  </head>`);
  }

  // Ensure robots meta tags are present for Google Search Console fast indexing
  if (!html.includes('<meta name="robots"')) {
    html = html.replace('</head>', `  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />\n  </head>`);
  }
  if (!html.includes('<meta name="googlebot"')) {
    html = html.replace('</head>', `  <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n  </head>`);
  }

  // Add JSON-LD if provided
  if (meta.jsonLd) {
    const jsonLdData = Array.isArray(meta.jsonLd)
      ? { '@context': 'https://schema.org', '@graph': meta.jsonLd }
      : meta.jsonLd;
    const jsonLdScript = `\n  <script type="application/ld+json">\n${JSON.stringify(jsonLdData, null, 2)}\n  </script>`;
    html = html.replace('</head>', `${jsonLdScript}\n  </head>`);
  }

  // Pre-render rich semantic body markup inside <div id="root"> for Googlebot & fast indexing
  if (meta.bodyContent) {
    const rootTag = '<div id="root">';
    // If root tag already has content, replace its inner content, otherwise prepend
    if (html.includes('<div id="root"></div>')) {
      html = html.replace('<div id="root"></div>', `${rootTag}\n${meta.bodyContent}\n</div>`);
    } else {
      html = html.replace(rootTag, `${rootTag}\n${meta.bodyContent}`);
    }
  }

  return html;
}

export function runGenerator() {
  const rootDir = process.cwd();
  const publicDir = path.join(rootDir, 'public');
  const distDir = path.join(rootDir, 'dist');

  console.log('🚀 Running Money Master Blog Sitemap & Static Page Generator...');

  // 1. Generate XML Sitemap
  const sitemapXml = generateSitemapXml();

  // Write to public/sitemap.xml
  const publicSitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(publicSitemapPath, sitemapXml, 'utf-8');
  console.log(`✅ Written clean XML sitemap to ${publicSitemapPath}`);

  // Write CNAME to public
  const publicCnamePath = path.join(publicDir, 'CNAME');
  fs.writeFileSync(publicCnamePath, 'www.moneymasterblog.site\n', 'utf-8');
  console.log(`✅ Verified CNAME in ${publicCnamePath}`);

  // Write robots.txt to public
  const robotsTxtContent = `User-agent: *\nAllow: /\n\nSitemap: ${CANONICAL_DOMAIN}/sitemap.xml\n`;
  const publicRobotsPath = path.join(publicDir, 'robots.txt');
  fs.writeFileSync(publicRobotsPath, robotsTxtContent, 'utf-8');
  console.log(`✅ Verified robots.txt in ${publicRobotsPath}`);

  // Write ads.txt to public
  const adsTxtContent = 'google.com, pub-8888653949280512, DIRECT, f08c47fec0942fa0\n';
  const publicAdsPath = path.join(publicDir, 'ads.txt');
  fs.writeFileSync(publicAdsPath, adsTxtContent, 'utf-8');
  console.log(`✅ Verified ads.txt in ${publicAdsPath}`);

  // 2. If dist/ exists, write files to dist/
  if (fs.existsSync(distDir)) {
    const distSitemapPath = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(distSitemapPath, sitemapXml, 'utf-8');

    const distCnamePath = path.join(distDir, 'CNAME');
    fs.writeFileSync(distCnamePath, 'www.moneymasterblog.site\n', 'utf-8');

    const distRobotsPath = path.join(distDir, 'robots.txt');
    fs.writeFileSync(distRobotsPath, robotsTxtContent, 'utf-8');

    const distAdsPath = path.join(distDir, 'ads.txt');
    fs.writeFileSync(distAdsPath, adsTxtContent, 'utf-8');

    const distIndexPath = path.join(distDir, 'index.html');
    if (fs.existsSync(distIndexPath)) {
      const templateHtml = fs.readFileSync(distIndexPath, 'utf-8');

      // 2a. Pre-render dist/index.html (HOMEPAGE) with full crawlable content & schema!
      const homeCanonical = getCanonicalUrl('/');
      const homeHtml = generateStaticHtml(templateHtml, {
        title: 'Money Master Blog – Simple Online Tools for Everyday Tasks',
        description: 'Money Master Blog provides simple online tools for generating color palettes, creating placeholder text, cleaning text, and completing everyday digital tasks.',
        canonicalUrl: homeCanonical,
        bodyContent: renderHomePageBody(),
        jsonLd: [
          {
            '@type': 'WebSite',
            name: 'Money Master Blog',
            url: CANONICAL_DOMAIN,
            description: 'Simple online tools for everyday digital tasks, text cleaning, formatting, and practical productivity guides.',
            author: {
              '@type': 'Person',
              name: 'Shahid Ali',
            },
          },
          {
            '@type': 'Organization',
            name: 'Money Master Blog',
            url: CANONICAL_DOMAIN,
            logo: `${CANONICAL_DOMAIN}/logo.png`,
          },
        ],
      });
      fs.writeFileSync(distIndexPath, homeHtml, 'utf-8');
      console.log(`✅ Pre-rendered homepage into ${distIndexPath}`);

      // 2b. Generate HTML files for Core Standalone Pages
      for (const page of CORE_PAGES) {
        if (page.path === '/') continue; // homepage handled above

        const canonicalUrl = getCanonicalUrl(page.path);
        let bodyContent = '';
        let pageType = 'WebPage';

        if (page.id === 'tools') {
          bodyContent = renderToolsPageBody();
          pageType = 'CollectionPage';
        } else if (page.id === 'blog') {
          bodyContent = renderBlogIndexBody();
          pageType = 'CollectionPage';
        } else if (page.id === 'about') {
          bodyContent = renderAboutPageBody();
          pageType = 'AboutPage';
        } else if (page.id === 'contact') {
          bodyContent = renderContactPageBody();
          pageType = 'ContactPage';
        } else if (page.id === 'privacy') {
          bodyContent = renderLegalPageBody(
            'Privacy Policy',
            'How Money Master Blog safeguards your privacy through 100% client-side computing.',
            `<p>Money Master Blog respects your privacy. All 15 text utilities and tools run purely client-side in your web browser. No text input, clipboard snippets, passwords, or files are transmitted to or stored on any server.</p>
             <h3 style="font-size: 18px; margin: 20px 0 8px 0;">Google AdSense &amp; Cookies</h3>
             <p>Third-party vendors, including Google, use cookies to serve ads based on prior visits. Users may opt out of personalized advertising by visiting Google Ads Settings.</p>`
          );
        } else if (page.id === 'terms') {
          bodyContent = renderLegalPageBody(
            'Terms &amp; Conditions',
            'Usage rights, acceptable use, and output ownership on Money Master Blog.',
            `<p>By accessing Money Master Blog, you agree to these terms. All output generated through our utilities (cleaned text, color palettes, passwords) belongs entirely to you for personal and commercial use without attribution requirements.</p>`
          );
        } else if (page.id === 'disclaimer') {
          bodyContent = renderLegalPageBody(
            'Website Disclaimer',
            'Informational purposes, tool accuracy, and productivity utility.',
            `<p>The tools and guides on Money Master Blog are provided for practical digital utility on an "as-is" basis. While our algorithms are thoroughly tested for edge-case text handling, users should verify critical spreadsheet data before final import.</p>`
          );
        }

        const breadcrumbs = [
          { '@type': 'ListItem', position: 1, name: 'Home', item: CANONICAL_DOMAIN },
          { '@type': 'ListItem', position: 2, name: page.title, item: canonicalUrl },
        ];

        const html = generateStaticHtml(templateHtml, {
          title: page.title,
          description: page.description,
          canonicalUrl,
          bodyContent,
          jsonLd: [
            {
              '@type': pageType,
              name: page.title,
              description: page.description,
              url: canonicalUrl,
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: breadcrumbs,
            },
          ],
        });

        // Write primary Blogger URL file (e.g. /p/about-us.html)
        const targetFilePath = path.join(distDir, page.path.replace(/^\//, ''));
        ensureDirectoryExistence(targetFilePath);
        fs.writeFileSync(targetFilePath, html, 'utf-8');

        // Write alternate paths if defined
        if (page.alternatePaths) {
          for (const alt of page.alternatePaths) {
            const altFilePath = path.join(distDir, alt.replace(/^\//, ''));
            ensureDirectoryExistence(altFilePath);
            fs.writeFileSync(altFilePath, html, 'utf-8');
          }
        }
      }

      // 2c. Generate HTML files for all 20 Articles
      for (const article of BLOG_ARTICLES) {
        const postPath = getBloggerPostPath(article);
        const canonicalUrl = getCanonicalUrl(postPath);
        const dateIso = formatDateToIso(article.publishedDate);
        const modIso = formatDateToIso(article.updatedDate || article.publishedDate);

        const breadcrumbs = [
          { '@type': 'ListItem', position: 1, name: 'Home', item: CANONICAL_DOMAIN },
          { '@type': 'ListItem', position: 2, name: 'Practical Guides', item: `${CANONICAL_DOMAIN}/p/blog-page.html` },
          { '@type': 'ListItem', position: 3, name: article.title, item: canonicalUrl },
        ];

        const jsonLdGraph: object[] = [
          {
            '@type': 'BlogPosting',
            headline: article.title,
            description: article.metaDescription,
            url: canonicalUrl,
            datePublished: dateIso,
            dateModified: modIso,
            author: {
              '@type': 'Person',
              name: 'Shahid Ali',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Money Master Blog',
              logo: {
                '@type': 'ImageObject',
                url: `${CANONICAL_DOMAIN}/logo.png`,
              },
            },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs,
          },
        ];

        // If article has FAQs, add FAQPage schema
        if (article.faqs && article.faqs.length > 0) {
          jsonLdGraph.push({
            '@type': 'FAQPage',
            mainEntity: article.faqs.map(f => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: f.answer,
              },
            })),
          });
        }

        const bodyContent = renderArticleBody(article);

        const html = generateStaticHtml(templateHtml, {
          title: `${article.title} – Money Master Blog`,
          description: article.metaDescription,
          canonicalUrl,
          bodyContent,
          jsonLd: jsonLdGraph,
        });

        // 1. Primary Blogger post path (e.g. /2026/01/how-to-clean-text...html)
        const targetFilePath = path.join(distDir, postPath.replace(/^\//, ''));
        ensureDirectoryExistence(targetFilePath);
        fs.writeFileSync(targetFilePath, html, 'utf-8');

        // 2. Clean alias path (e.g. /blog/how-to-clean-text.../index.html)
        const cleanAliasPath = path.join(distDir, 'blog', article.slug, 'index.html');
        ensureDirectoryExistence(cleanAliasPath);
        fs.writeFileSync(cleanAliasPath, html, 'utf-8');
      }

      console.log(`✅ Pre-rendered static HTML for ${CORE_PAGES.length} core pages and ${BLOG_ARTICLES.length} articles into dist/`);
    }
  }

  console.log('🎉 Sitemap & Static Generation Completed Successfully!');
}

// Execute immediately when script is run directly
runGenerator();
