/**
 * Automated Sitemap & Static HTML Page Generator for Money Master Blog
 * 
 * Generates:
 * 1. Valid sitemaps.org XML sitemap with 100% real, canonical, crawlable Blogger URLs (NO hash fragments).
 * 2. Static HTML pre-rendered pages in dist/ for all Blogger URLs (/p/*.html, /{year}/{month}/*.html)
 *    and clean paths so every sitemap URL returns a 200 OK directly from GitHub Pages.
 * 3. Synchronized robots.txt and CNAME configurations.
 */

import fs from 'fs';
import path from 'path';
import { BLOG_ARTICLES } from '../src/data/blogArticles';
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

function generateStaticHtml(
  templateHtml: string,
  meta: {
    title: string;
    description: string;
    canonicalUrl: string;
    jsonLd?: object;
    bodyContent?: string;
  }
): string {
  let html = templateHtml;

  // Replace <title>
  html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeXml(meta.title)}</title>`);

  // Replace meta description
  if (html.includes('<meta name="description"')) {
    html = html.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${escapeXml(meta.description)}" />`);
  } else {
    html = html.replace('</head>', `  <meta name="description" content="${escapeXml(meta.description)}" />\n  </head>`);
  }

  // Replace og:title
  if (html.includes('<meta property="og:title"')) {
    html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${escapeXml(meta.title)}" />`);
  }

  // Replace og:description
  if (html.includes('<meta property="og:description"')) {
    html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${escapeXml(meta.description)}" />`);
  }

  // Add or update og:url
  if (html.includes('<meta property="og:url"')) {
    html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${escapeXml(meta.canonicalUrl)}" />`);
  } else {
    html = html.replace('</head>', `  <meta property="og:url" content="${escapeXml(meta.canonicalUrl)}" />\n  </head>`);
  }

  // Add or update canonical link
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${escapeXml(meta.canonicalUrl)}" />`);
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${escapeXml(meta.canonicalUrl)}" />\n  </head>`);
  }

  // Add JSON-LD if provided
  if (meta.jsonLd) {
    const jsonLdScript = `\n  <script type="application/ld+json">\n${JSON.stringify(meta.jsonLd, null, 2)}\n  </script>`;
    html = html.replace('</head>', `${jsonLdScript}\n  </head>`);
  }

  // Pre-render basic semantic body markup inside <div id="root"> for non-JS crawlers
  if (meta.bodyContent) {
    const rootTag = '<div id="root">';
    html = html.replace(rootTag, `${rootTag}\n${meta.bodyContent}`);
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

  // 2. If dist/ exists, write files to dist/
  if (fs.existsSync(distDir)) {
    const distSitemapPath = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(distSitemapPath, sitemapXml, 'utf-8');

    const distCnamePath = path.join(distDir, 'CNAME');
    fs.writeFileSync(distCnamePath, 'www.moneymasterblog.site\n', 'utf-8');

    const distRobotsPath = path.join(distDir, 'robots.txt');
    fs.writeFileSync(distRobotsPath, robotsTxtContent, 'utf-8');

    const distIndexPath = path.join(distDir, 'index.html');
    if (fs.existsSync(distIndexPath)) {
      const templateHtml = fs.readFileSync(distIndexPath, 'utf-8');

      // Generate HTML files for Core Pages
      for (const page of CORE_PAGES) {
        if (page.path === '/') continue; // index.html already exists

        const canonicalUrl = getCanonicalUrl(page.path);
        const bodyContent = `
        <header style="padding: 24px; text-align: center; border-bottom: 1px solid #e5e5e5; font-family: sans-serif;">
          <h1>${escapeXml(page.title)}</h1>
          <p>${escapeXml(page.description)}</p>
          <p><a href="/" style="color: #171717; font-weight: bold;">Return to Money Master Blog Homepage</a></p>
        </header>
        `;

        const html = generateStaticHtml(templateHtml, {
          title: page.title,
          description: page.description,
          canonicalUrl,
          bodyContent,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: page.title,
            description: page.description,
            url: canonicalUrl,
          },
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

      // Generate HTML files for all 20 Articles
      for (const article of BLOG_ARTICLES) {
        const postPath = getBloggerPostPath(article);
        const canonicalUrl = getCanonicalUrl(postPath);
        const dateIso = formatDateToIso(article.publishedDate);
        const modIso = formatDateToIso(article.updatedDate || article.publishedDate);

        const bodyContent = `
        <article style="max-width: 800px; margin: 0 auto; padding: 32px 16px; font-family: sans-serif; line-height: 1.6;">
          <header style="margin-bottom: 24px;">
            <p style="color: #666; font-size: 14px;">${escapeXml(article.category)} • ${escapeXml(article.publishedDate)}</p>
            <h1 style="font-size: 28px; line-height: 1.3; margin-top: 8px;">${escapeXml(article.title)}</h1>
            <p style="color: #444; font-size: 16px; margin-top: 12px;">${escapeXml(article.excerpt)}</p>
          </header>
          <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
            <strong>Quick Takeaway:</strong> ${escapeXml(article.quickAnswer)}
          </div>
          ${article.sections.map(s => `
            <section style="margin-bottom: 24px;">
              <h2 style="font-size: 20px; margin-bottom: 12px;">${escapeXml(s.heading)}</h2>
              ${s.paragraphs.map(p => `<p style="margin-bottom: 12px;">${escapeXml(p)}</p>`).join('')}
            </section>
          `).join('')}
          <footer style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee;">
            <p><a href="/p/blog-page.html" style="color: #171717; font-weight: bold;">← Back to Practical Guides</a></p>
          </footer>
        </article>
        `;

        const html = generateStaticHtml(templateHtml, {
          title: `${article.title} – Money Master Blog`,
          description: article.metaDescription,
          canonicalUrl,
          bodyContent,
          jsonLd: {
            '@context': 'https://schema.org',
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

      console.log(`✅ Pre-rendered static HTML for ${CORE_PAGES.length - 1} pages and ${BLOG_ARTICLES.length} articles into dist/`);
    }
  }

  console.log('🎉 Sitemap & Static Generation Completed Successfully!');
}

// Execute immediately when script is run directly
runGenerator();
