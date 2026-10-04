/**
 * Automated Sitemap & Static HTML Page Generator for Money Master Blog
 * 
 * Generates:
 * 1. Valid sitemaps.org XML sitemap with 100% real, canonical, crawlable URLs (NO hash fragments).
 *    Includes:
 *    - 8 Core Pages
 *    - Exactly 25 Production-Ready Tool Pages (/tools/{tool.id}.html)
 *    - Exactly 20 Financial & Productivity Articles (/YYYY/MM/{slug}.html)
 * 2. High-fidelity static HTML pre-rendered pages in dist/ for all tools, core pages, and articles:
 *    - Rich semantic HTML content for Googlebot and no-JS visitors
 *    - Complete Schema.org JSON-LD (WebApplication, BreadcrumbList, FAQPage, BlogPosting)
 *    - Working forms, step-by-step instructions, examples, tips, FAQs, and related tools
 * 3. Synchronized robots.txt, CNAME, and ads.txt configurations.
 */

import fs from 'fs';
import path from 'path';
import { BLOG_ARTICLES, getRelatedArticles } from '../src/data/blogArticles';
import { TOOLS_DATA, TOOL_CATEGORIES, getToolById } from '../src/data/toolsData';
import { ToolMeta } from '../src/types';
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
    title: 'Money Master Blog | Practical Money Guides & Financial Tools',
    description: 'Explore practical money guides, financial calculators, saving and budgeting tips, loan and credit explanations, and useful online tools at Money Master Blog.',
  },
  {
    id: 'tools',
    path: '/p/tools.html',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'Free Online Financial & Utility Tools (25 Tools) – Money Master Blog',
    description: 'Simple, fast browser-based calculators and utilities for loans, interest, percentages, text, and everyday digital productivity tasks. Exactly 25 functional tools.',
    alternatePaths: ['/tools/index.html', '/tools.html'],
  },
  {
    id: 'blog',
    path: '/p/blog-page.html',
    priority: '0.9',
    changefreq: 'daily',
    title: 'Practical Personal Finance Guides & Money Resources – Money Master Blog',
    description: 'Browse comprehensive, reader-first guides on personal loans, credit card fees, debt repayment, emergency funds, insurance evaluation, and budgeting.',
    alternatePaths: ['/blog/index.html', '/blog.html', '/p/blog.html'],
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
    description: 'Read the Money Master Blog Privacy Policy. Learn why our client-side browser tools process all text, calculations, and images locally without storing your data.',
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
    description: 'Read the Money Master Blog Disclaimer regarding tool accuracy, educational calculations, financial estimates, and productivity use.',
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
    '  <!-- Core Site Pages (Canonical Standalone Pages) -->',
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
  lines.push(`  <!-- Exactly 25 Production-Ready Online Tools -->`);

  for (const tool of TOOLS_DATA) {
    const loc = `${CANONICAL_DOMAIN}/tools/${tool.id}.html`;
    lines.push('  <url>');
    lines.push(`    <loc>${escapeXml(loc)}</loc>`);
    lines.push(`    <lastmod>${today}</lastmod>`);
    lines.push('    <changefreq>weekly</changefreq>');
    lines.push('    <priority>0.9</priority>');
    lines.push('  </url>');
  }

  lines.push('');
  lines.push(`  <!-- Exactly ${BLOG_ARTICLES.length} Practical Financial & Productivity Guides -->`);

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
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function renderHeader(): string {
  return `
  <header style="background: #ffffff; border-bottom: 1px solid #e5e7eb; padding: 14px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; position: sticky; top: 0; z-index: 50;">
    <div style="max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px;">
      <a href="/" style="display: flex; align-items: center; gap: 12px; text-decoration: none;">
        <img src="/logo.png" alt="Money Master Blog Logo" width="40" height="40" style="height: 40px; width: 40px; object-fit: contain; border-radius: 8px; border: 1px solid #e5e7eb; background: #ffffff; padding: 2px;" />
        <div>
          <span style="font-size: 19px; font-weight: 800; color: #000000; display: block; line-height: 1.2;">Money Master Blog</span>
          <span style="font-size: 11px; color: #6b7280; font-weight: 500;">Practical Money Guides &amp; Tools</span>
        </div>
      </a>
      <nav style="display: flex; flex-wrap: wrap; gap: 20px; font-size: 14px; font-weight: 500;">
        <a href="/" style="color: #000000; text-decoration: none; font-weight: 600;">Home</a>
        <a href="/p/tools.html" style="color: #1f2937; text-decoration: none;">Tools</a>
        <a href="/p/blog-page.html" style="color: #1f2937; text-decoration: none;">Blog</a>
        <a href="/p/about-us.html" style="color: #1f2937; text-decoration: none;">About</a>
        <a href="/p/contact-us.html" style="color: #1f2937; text-decoration: none;">Contact</a>
      </nav>
    </div>
  </header>
  `;
}

function renderFooter(): string {
  return `
  <footer style="background: #111827; color: #9ca3af; padding: 48px 24px 32px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; margin-top: 64px;">
    <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 32px; border-bottom: 1px solid #1f2937; padding-bottom: 40px;">
      <div>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
          <img src="/logo.png" alt="Money Master Blog" width="36" height="36" style="height: 36px; width: 36px; object-fit: contain; border-radius: 6px; background: #ffffff; padding: 2px;" />
          <span style="font-size: 18px; font-weight: 800; color: #ffffff;">Money Master Blog</span>
        </div>
        <p style="color: #9ca3af; line-height: 1.6; font-size: 13px;">
          Fast, lightweight, client-side tools and educational financial guides. All tools execute locally in your web browser with zero server tracking.
        </p>
      </div>
      <div>
        <h4 style="color: #ffffff; font-weight: 700; font-size: 15px; margin-bottom: 14px;">Tool Categories (25 Tools)</h4>
        <ul style="list-style: none; padding: 0; margin: 0; line-height: 2; font-size: 13px;">
          <li><a href="/p/tools.html" style="color: #9ca3af; text-decoration: none;">Text Tools (7)</a></li>
          <li><a href="/p/tools.html" style="color: #9ca3af; text-decoration: none;">Developer &amp; Web Tools (6)</a></li>
          <li><a href="/p/tools.html" style="color: #9ca3af; text-decoration: none;">Image Tools (4)</a></li>
          <li><a href="/p/tools.html" style="color: #9ca3af; text-decoration: none;">Calculators &amp; Finance (8)</a></li>
        </ul>
      </div>
      <div>
        <h4 style="color: #ffffff; font-weight: 700; font-size: 15px; margin-bottom: 14px;">Financial Guides</h4>
        <ul style="list-style: none; padding: 0; margin: 0; line-height: 2; font-size: 13px;">
          <li><a href="/2026/01/how-to-calculate-the-real-cost-of-a-personal-loan-before-applying.html" style="color: #9ca3af; text-decoration: none;">Calculate Loan Real Cost</a></li>
          <li><a href="/2026/01/how-to-find-hidden-fees-in-a-credit-card-agreement.html" style="color: #9ca3af; text-decoration: none;">Credit Card Hidden Fees</a></li>
          <li><a href="/2026/02/how-to-build-a-monthly-debt-payment-plan-using-your-actual-income.html" style="color: #9ca3af; text-decoration: none;">Monthly Debt Payment Plan</a></li>
          <li><a href="/p/blog-page.html" style="color: #38bdf8; text-decoration: none;">View All 20 Guides →</a></li>
        </ul>
      </div>
      <div>
        <h4 style="color: #ffffff; font-weight: 700; font-size: 15px; margin-bottom: 14px;">Trust &amp; Transparency</h4>
        <ul style="list-style: none; padding: 0; margin: 0; line-height: 2; font-size: 13px;">
          <li><a href="/p/about-us.html" style="color: #9ca3af; text-decoration: none;">About Shahid Ali</a></li>
          <li><a href="/p/contact-us.html" style="color: #9ca3af; text-decoration: none;">Contact Us</a></li>
          <li><a href="/p/privacy-policy.html" style="color: #9ca3af; text-decoration: none;">Privacy Policy</a></li>
          <li><a href="/p/terms-conditions.html" style="color: #9ca3af; text-decoration: none;">Terms &amp; Conditions</a></li>
          <li><a href="/p/disclaimer.html" style="color: #9ca3af; text-decoration: none;">Disclaimer</a></li>
          <li><a href="/sitemap.xml" style="color: #9ca3af; text-decoration: none;">XML Sitemap</a></li>
        </ul>
      </div>
    </div>
    <div style="max-width: 1200px; margin: 24px auto 0 auto; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; font-size: 12px; color: #6b7280;">
      <span>© 2026 Money Master Blog. Written and curated by Shahid Ali. All rights reserved.</span>
      <span>Educational Financial Guides &amp; Practical Tools.</span>
    </div>
  </footer>
  `;
}

function renderBreadcrumbNav(items: { name: string; url?: string }[]): string {
  return `
  <nav aria-label="Breadcrumb" style="padding: 12px 0; margin-bottom: 24px; font-size: 14px; border-bottom: 1px solid #f3f4f6;">
    <div style="max-width: 1100px; margin: 0 auto; padding: 0 16px;">
      ${items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        if (isLast) {
          return `<span style="color: #4b5563; font-weight: 600;">${escapeXml(item.name)}</span>`;
        }
        return `<a href="${item.url || '/'}" style="color: #2563eb; text-decoration: none;">${escapeXml(item.name)}</a> <span style="color: #9ca3af; margin: 0 6px;">/</span>`;
      }).join(' ')}
    </div>
  </nav>
  `;
}

function renderHomePageBody(): string {
  const featuredArticles = [
    BLOG_ARTICLES.find(a => a.slug === 'how-to-calculate-the-real-cost-of-a-personal-loan-before-applying'),
    BLOG_ARTICLES.find(a => a.slug === 'what-makes-a-loan-offer-expensive-even-when-the-interest-rate-looks-low'),
    BLOG_ARTICLES.find(a => a.slug === 'how-to-find-hidden-fees-in-a-credit-card-agreement'),
    BLOG_ARTICLES.find(a => a.slug === 'how-credit-card-minimum-payments-increase-the-time-to-become-debt-free'),
    BLOG_ARTICLES.find(a => a.slug === 'how-to-estimate-the-emergency-fund-you-need-from-your-monthly-expenses'),
    BLOG_ARTICLES.find(a => a.slug === 'how-to-calculate-your-true-monthly-cost-of-owning-a-car'),
  ].filter(Boolean) as typeof BLOG_ARTICLES;

  return `
  ${renderHeader()}
  <main style="max-width: 1100px; margin: 0 auto; padding: 32px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6;">
    {/* 1. HERO */}
    <section style="text-align: center; margin-bottom: 56px; padding-bottom: 40px; border-bottom: 1px solid #e5e7eb;">
      <span style="display: inline-block; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; background: #ecfdf5; color: #047857; padding: 6px 14px; border-radius: 9999px; margin-bottom: 16px; border: 1px solid #a7f3d0;">
        Money Master Blog • Practical Money Guides &amp; Online Tools
      </span>
      <h1 style="font-size: 44px; font-weight: 800; color: #111827; line-height: 1.15; margin: 0 0 16px 0; letter-spacing: -0.02em;">
        Welcome to Money Master Blog
      </h1>
      <p style="font-size: 22px; font-weight: 700; color: #1f2937; margin: 0 0 16px 0; letter-spacing: -0.01em;">
        Practical Money Guides, Financial Tools &amp; Helpful Online Resources
      </p>
      <p style="font-size: 17px; color: #4b5563; max-width: 740px; margin: 0 auto 28px auto; line-height: 1.6;">
        Money Master Blog provides practical explanations, useful financial calculators, and easy-to-understand guides that help readers make better-informed everyday financial decisions. Whether you are calculating monthly loan payments, evaluating debt repayment strategies, or seeking reliable everyday calculation tools, our resources are structured for clarity and immediate utility.
      </p>
      <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin-bottom: 36px;">
        <a href="/p/tools.html" style="background: #111827; color: #ffffff; padding: 12px 26px; border-radius: 8px; font-weight: 600; text-decoration: none;">Explore Tools →</a>
        <a href="/p/blog-page.html" style="background: #ffffff; color: #111827; border: 1px solid #d1d5db; padding: 12px 26px; border-radius: 8px; font-weight: 600; text-decoration: none;">Read Our Blog</a>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; text-align: left; padding-top: 24px; border-top: 1px solid #f3f4f6;">
        <div style="background: #f9fafb; padding: 12px 16px; border-radius: 8px; border: 1px solid #e5e7eb;">
          <strong style="color: #111827; font-size: 13px; display: block;">Practical Explanations</strong>
          <span style="color: #6b7280; font-size: 12px;">Formulas explained simply</span>
        </div>
        <div style="background: #f9fafb; padding: 12px 16px; border-radius: 8px; border: 1px solid #e5e7eb;">
          <strong style="color: #111827; font-size: 13px; display: block;">25 Online Tools</strong>
          <span style="color: #6b7280; font-size: 12px;">Calculators &amp; utilities</span>
        </div>
        <div style="background: #f9fafb; padding: 12px 16px; border-radius: 8px; border: 1px solid #e5e7eb;">
          <strong style="color: #111827; font-size: 13px; display: block;">Mobile Responsive</strong>
          <span style="color: #6b7280; font-size: 12px;">Phones, tablets &amp; PCs</span>
        </div>
        <div style="background: #f9fafb; padding: 12px 16px; border-radius: 8px; border: 1px solid #e5e7eb;">
          <strong style="color: #111827; font-size: 13px; display: block;">Curated by Shahid Ali</strong>
          <span style="color: #6b7280; font-size: 12px;">7 years practical exp.</span>
        </div>
      </div>
    </section>

    {/* 2. WHY MONEY MASTER BLOG? */}
    <section style="margin-bottom: 56px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <h2 style="font-size: 28px; font-weight: 800; color: #111827; margin: 0 0 8px 0;">Why Money Master Blog?</h2>
        <p style="color: #6b7280; font-size: 15px; margin: 0;">Reliable financial education and practical calculators built for everyday decision-making.</p>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 8px 0;">Practical Explanations</h3>
          <p style="font-size: 13px; color: #4b5563; line-height: 1.6; margin: 0;">We demystify complex financial terminology—such as APR, amortization schedules, compounding frequency, and fee clauses—using plain, straightforward language.</p>
        </div>
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 8px 0;">Simple Examples</h3>
          <p style="font-size: 13px; color: #4b5563; line-height: 1.6; margin: 0;">Every calculation guide includes realistic hypothetical examples showing how adjusting interest rates, loan terms, or fees directly impacts your total cost.</p>
        </div>
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 8px 0;">Useful Calculators &amp; Tools</h3>
          <p style="font-size: 13px; color: #4b5563; line-height: 1.6; margin: 0;">Instant browser-based calculators allow you to run loan estimates, tax computations, and percentage changes quickly on any device with zero software downloads.</p>
        </div>
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 8px 0;">Reader-Focused Guides</h3>
          <p style="font-size: 13px; color: #4b5563; line-height: 1.6; margin: 0;">Our in-depth articles prioritize the reader's real dilemmas, including comparing loan offers, spotting hidden credit card fees, and setting emergency fund targets.</p>
        </div>
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 8px 0;">Transparent &amp; Responsible Information</h3>
          <p style="font-size: 13px; color: #4b5563; line-height: 1.6; margin: 0;">We disclose calculation formulas and assumptions openly, without sponsored bias, misleading rankings, or high-pressure financial promotions.</p>
        </div>
      </div>
    </section>

    {/* 3. FEATURED FINANCIAL TOOLS */}
    <section style="margin-bottom: 56px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 20px;">
        <div>
          <h2 style="font-size: 24px; font-weight: 800; color: #111827; margin: 0 0 4px 0;">Featured Financial Tools</h2>
          <p style="font-size: 14px; color: #6b7280; margin: 0;">Explore our curated selection of calculation tools designed to clarify loan costs, taxes, and rates.</p>
        </div>
        <a href="/p/tools.html" style="color: #2563eb; font-weight: 600; font-size: 14px; text-decoration: none;">View All 25 Tools →</a>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 24px;">
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #059669; background: #ecfdf5; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Popular Tool</span>
            <h3 style="font-size: 17px; font-weight: 700; color: #111827; margin: 0 0 6px 0;">Loan Payment Calculator</h3>
            <p style="font-size: 12px; color: #4b5563; line-height: 1.5; margin: 0 0 14px 0;">Estimate monthly loan payments, total interest costs, and full lifetime repayment with amortization formulas.</p>
          </div>
          <a href="/tools/loan-payment-calculator.html" style="background: #111827; color: #ffffff; padding: 8px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; text-decoration: none; text-align: center;">Open Calculator</a>
        </div>
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #2563eb; background: #eff6ff; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Fast Calculation</span>
            <h3 style="font-size: 17px; font-weight: 700; color: #111827; margin: 0 0 6px 0;">Percentage Calculator</h3>
            <p style="font-size: 12px; color: #4b5563; line-height: 1.5; margin: 0 0 14px 0;">Solve percentage increases, decreases, retail discounts, rate comparisons, and proportional changes.</p>
          </div>
          <a href="/tools/percentage-calculator.html" style="background: #111827; color: #ffffff; padding: 8px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; text-decoration: none; text-align: center;">Open Calculator</a>
        </div>
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #7c3aed; background: #f5f3ff; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Tax &amp; VAT</span>
            <h3 style="font-size: 17px; font-weight: 700; color: #111827; margin: 0 0 6px 0;">GST / Tax Calculator</h3>
            <p style="font-size: 12px; color: #4b5563; line-height: 1.5; margin: 0 0 14px 0;">Add or remove sales tax, VAT, and GST with custom statutory rates and net/gross price breakdowns.</p>
          </div>
          <a href="/tools/gst-tax-calculator.html" style="background: #111827; color: #ffffff; padding: 8px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; text-decoration: none; text-align: center;">Open Calculator</a>
        </div>
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #ea580c; background: #fff7ed; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Everyday Utility</span>
            <h3 style="font-size: 17px; font-weight: 700; color: #111827; margin: 0 0 6px 0;">Tip &amp; Bill Splitter</h3>
            <p style="font-size: 12px; color: #4b5563; line-height: 1.5; margin: 0 0 14px 0;">Compute gratuities, split restaurant checks evenly across groups, and round totals to whole dollars.</p>
          </div>
          <a href="/tools/tip-calculator.html" style="background: #111827; color: #ffffff; padding: 8px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; text-decoration: none; text-align: center;">Open Calculator</a>
        </div>
      </div>
    </section>

    {/* 4. FEATURED MONEY GUIDES */}
    <section style="margin-bottom: 56px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 20px;">
        <div>
          <h2 style="font-size: 24px; font-weight: 800; color: #111827; margin: 0 0 4px 0;">Featured Money Guides</h2>
          <p style="font-size: 14px; color: #6b7280; margin: 0;">Carefully researched practical articles to help you navigate borrowing, credit, and savings decisions.</p>
        </div>
        <a href="/p/blog-page.html" style="color: #2563eb; font-weight: 600; font-size: 14px; text-decoration: none;">View All Guides →</a>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
        ${featuredArticles.map((a) => {
          const postPath = getBloggerPostPath(a);
          return `
          <article style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <span style="font-size: 11px; font-weight: 700; color: #0284c7; text-transform: uppercase; letter-spacing: 0.05em;">${escapeXml(a.category)}</span>
              <h3 style="font-size: 17px; font-weight: 700; margin: 8px 0 10px 0; line-height: 1.35;">
                <a href="${postPath}" style="color: #111827; text-decoration: none;">${escapeXml(a.title)}</a>
              </h3>
              <p style="font-size: 13px; color: #4b5563; line-height: 1.55; margin: 0 0 14px 0;">${escapeXml(a.excerpt)}</p>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f3f4f6; padding-top: 12px; margin-top: 12px; font-size: 12px;">
              <span style="color: #9ca3af;">${escapeXml(a.publishedDate)}</span>
              <a href="${postPath}" style="color: #2563eb; font-weight: 600; text-decoration: none;">Read Guide →</a>
            </div>
          </article>
        `;
        }).join('')}
      </div>
    </section>

    {/* 5. MONEY TOPICS WE COVER */}
    <section style="margin-bottom: 56px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <h2 style="font-size: 26px; font-weight: 800; color: #111827; margin: 0 0 8px 0;">Money Topics We Cover</h2>
        <p style="color: #6b7280; font-size: 15px; margin: 0;">Explore structured guides across core areas of personal finance and debt planning.</p>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 18px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 6px 0;">Loans &amp; Borrowing</h3>
          <p style="font-size: 12px; color: #4b5563; line-height: 1.5; margin: 0 0 12px 0;">Personal loan math, amortization schedules, APR vs. nominal rates, and repayment strategies.</p>
          <a href="/p/blog-page.html" style="font-size: 12px; color: #2563eb; font-weight: 600; text-decoration: none;">Browse Loans Articles →</a>
        </div>
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 18px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 6px 0;">Credit Cards</h3>
          <p style="font-size: 12px; color: #4b5563; line-height: 1.5; margin: 0 0 12px 0;">Fee schedules, billing cycles, balance transfer conditions, grace periods, and compounding interest.</p>
          <a href="/p/blog-page.html" style="font-size: 12px; color: #2563eb; font-weight: 600; text-decoration: none;">Browse Credit Card Articles →</a>
        </div>
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 18px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 6px 0;">Saving &amp; Budgeting</h3>
          <p style="font-size: 12px; color: #4b5563; line-height: 1.5; margin: 0 0 12px 0;">Calculating emergency funds from real expenses, sinking funds for annual bills, and high-yield account features.</p>
          <a href="/p/blog-page.html" style="font-size: 12px; color: #2563eb; font-weight: 600; text-decoration: none;">Browse Saving Articles →</a>
        </div>
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 18px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 6px 0;">Debt Management</h3>
          <p style="font-size: 12px; color: #4b5563; line-height: 1.5; margin: 0 0 12px 0;">Minimum payment traps, payoff plans built from actual income, and structured debt elimination frameworks.</p>
          <a href="/p/blog-page.html" style="font-size: 12px; color: #2563eb; font-weight: 600; text-decoration: none;">Browse Debt Articles →</a>
        </div>
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 18px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 6px 0;">Retirement &amp; Goals</h3>
          <p style="font-size: 12px; color: #4b5563; line-height: 1.5; margin: 0 0 12px 0;">Estimating retirement savings with variable yearly income and calculating how inflation shifts future targets.</p>
          <a href="/p/blog-page.html" style="font-size: 12px; color: #2563eb; font-weight: 600; text-decoration: none;">Browse Goals Articles →</a>
        </div>
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 18px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 6px 0;">Personal Finance &amp; Auto</h3>
          <p style="font-size: 12px; color: #4b5563; line-height: 1.5; margin: 0 0 12px 0;">True vehicle ownership cost equations, insurance deductible calculations, and policy exclusion audits.</p>
          <a href="/p/blog-page.html" style="font-size: 12px; color: #2563eb; font-weight: 600; text-decoration: none;">Browse Auto &amp; Insurance →</a>
        </div>
      </div>
    </section>

    {/* 6. PRACTICAL, READER-FOCUSED INFORMATION */}
    <section style="margin-bottom: 56px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 28px;">
      <h2 style="font-size: 22px; font-weight: 800; color: #111827; margin: 0 0 12px 0;">Practical, Reader-Focused Information</h2>
      <p style="font-size: 14px; color: #4b5563; line-height: 1.6; margin: 0 0 16px 0;">
        Money Master Blog was founded on the belief that everyday personal finance should be straightforward, understandable, and free from deceptive marketing. We focus on showing the actual math: how monthly installments are derived, how fees affect your net cash proceeds, and how extra repayments shorten debt timelines.
      </p>
      <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 14px; font-size: 12px; color: #92400e; line-height: 1.6;">
        <strong>Educational Disclaimer:</strong> Money Master Blog is an educational publisher and does not operate as a licensed financial advisor, lender, bank, or insurance broker. Content on this website is for general informational and educational estimation purposes. Financial rules, statutory tax rates, and lending guidelines vary by jurisdiction. Readers should always verify specific terms, rates, and contracts with authorized providers or licensed professionals.
      </div>
    </section>

    {/* 7. ABOUT THE AUTHOR */}
    <section style="margin-bottom: 56px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 28px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 12px;">
        <div>
          <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #6b7280;">Author &amp; Creator</span>
          <h2 style="font-size: 22px; font-weight: 800; color: #111827; margin: 2px 0 0 0;">Shahid Ali</h2>
          <p style="font-size: 13px; color: #4b5563; margin: 2px 0 0 0;">7 years of practical experience in digital content workflows &amp; web utilities</p>
        </div>
        <a href="/p/about-us.html" style="background: #f3f4f6; color: #111827; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; text-decoration: none;">About Shahid Ali →</a>
      </div>
      <p style="font-size: 13px; color: #4b5563; line-height: 1.6; margin: 0;">
        Shahid Ali curates Money Master Blog with a practical approach to digital publishing and online tools. Over 7 years of working with digital content workflows, testing web utilities, and structuring long-form educational guides, Shahid focuses on presenting complex topics clearly and honestly.
      </p>
    </section>

    {/* 8. FAQS */}
    <section style="margin-bottom: 56px;">
      <div style="text-align: center; margin-bottom: 28px;">
        <h2 style="font-size: 26px; font-weight: 800; color: #111827; margin: 0 0 6px 0;">Frequently Asked Questions</h2>
        <p style="color: #6b7280; font-size: 14px; margin: 0;">Common questions about Money Master Blog, our tools, and our educational guides.</p>
      </div>
      <div style="display: grid; gap: 12px;">
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #111827; margin: 0 0 6px 0;">What is Money Master Blog?</h3>
          <p style="font-size: 13px; color: #4b5563; margin: 0; line-height: 1.5;">Money Master Blog is an educational personal finance and online utilities website. It provides practical, reader-first money guides, step-by-step borrowing and saving explanations, and a collection of 25 fast, browser-based calculators and digital tools designed for everyday tasks.</p>
        </div>
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #111827; margin: 0 0 6px 0;">What financial topics does Money Master Blog cover?</h3>
          <p style="font-size: 13px; color: #4b5563; margin: 0; line-height: 1.5;">We cover personal loans, loan amortization, credit card agreements, debt reduction plans, emergency funds, sinking funds, car ownership expenses, insurance policy reviews, and long-term savings goals impacted by inflation.</p>
        </div>
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #111827; margin: 0 0 6px 0;">Are the calculators free to use?</h3>
          <p style="font-size: 13px; color: #4b5563; margin: 0; line-height: 1.5;">Yes, every calculator and tool on Money Master Blog is completely free to use. There are no fees, no subscriptions, no forced account registrations, and no paywalls.</p>
        </div>
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #111827; margin: 0 0 6px 0;">Can I use the financial calculators on mobile?</h3>
          <p style="font-size: 13px; color: #4b5563; margin: 0; line-height: 1.5;">Yes. The entire website is responsive. All calculators, forms, and articles adapt smoothly to smartphones, tablets, and desktop computers with comfortable touch targets and clear displays.</p>
        </div>
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #111827; margin: 0 0 6px 0;">Is the information on Money Master Blog financial advice?</h3>
          <p style="font-size: 13px; color: #4b5563; margin: 0; line-height: 1.5;">No. All articles, tools, and calculations on Money Master Blog are strictly educational. We do not provide personalized financial, legal, or investment advice. You should always consult qualified professionals or verified institutions for your specific situation.</p>
        </div>
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #111827; margin: 0 0 6px 0;">How can I contact Money Master Blog?</h3>
          <p style="font-size: 13px; color: #4b5563; margin: 0; line-height: 1.5;">You can reach website creator Shahid Ali directly through our Contact Us page (/p/contact-us.html). We welcome reader questions, tool suggestions, bug reports, and editorial feedback.</p>
        </div>
      </div>
    </section>

    {/* 9. FINAL CTA */}
    <section style="background: #111827; color: #ffffff; border-radius: 12px; padding: 40px 24px; text-align: center; margin-bottom: 40px;">
      <h2 style="font-size: 30px; font-weight: 800; margin: 0 0 12px 0;">Explore Money Guides &amp; Useful Tools</h2>
      <p style="font-size: 15px; color: #d1d5db; max-width: 580px; margin: 0 auto 24px auto;">Take the guesswork out of personal loans, interest calculations, budgeting, and everyday digital tasks with our free guides and browser utilities.</p>
      <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
        <a href="/p/tools.html" style="background: #ffffff; color: #111827; padding: 12px 24px; border-radius: 8px; font-weight: 600; text-decoration: none;">Explore Tools →</a>
        <a href="/p/blog-page.html" style="background: #1f2937; color: #ffffff; border: 1px solid #374151; padding: 12px 24px; border-radius: 8px; font-weight: 600; text-decoration: none;">Browse Blog</a>
      </div>
    </section>
  </main>
  ${renderFooter()}`;
}

function renderToolsPageBody(): string {
  return `
  ${renderHeader()}
  ${renderBreadcrumbNav([{ name: 'Home', url: '/' }, { name: 'Free Online Tools' }])}
  <main style="max-width: 1100px; margin: 0 auto; padding: 24px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6;">
    <header style="margin-bottom: 40px; text-align: center;">
      <span style="display: inline-block; font-size: 12px; font-weight: 700; text-transform: uppercase; background: #ecfdf5; color: #047857; padding: 4px 12px; border-radius: 9999px; margin-bottom: 12px; border: 1px solid #a7f3d0;">
        ⚡ Exactly 25 Functional Tools
      </span>
      <h1 style="font-size: 34px; font-weight: 800; color: #111827; margin: 0 0 12px 0;">Free Online Tools for Everyday Tasks</h1>
      <p style="font-size: 17px; color: #4b5563; max-width: 780px; margin: 0 auto;">
        Simple, fast browser-based tools for text, images, calculations, productivity, and everyday digital tasks. No unnecessary registration required.
      </p>
    </header>

    <!-- CATEGORIES SUMMARY -->
    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-bottom: 36px;">
      <span style="padding: 8px 16px; background: #111827; color: #ffffff; border-radius: 8px; font-size: 13px; font-weight: 600;">All Tools (25)</span>
      <span style="padding: 8px 16px; background: #f3f4f6; color: #374151; border-radius: 8px; font-size: 13px; font-weight: 600;">Text Tools (7)</span>
      <span style="padding: 8px 16px; background: #f3f4f6; color: #374151; border-radius: 8px; font-size: 13px; font-weight: 600;">Developer &amp; Web Tools (6)</span>
      <span style="padding: 8px 16px; background: #f3f4f6; color: #374151; border-radius: 8px; font-size: 13px; font-weight: 600;">Image Tools (4)</span>
      <span style="padding: 8px 16px; background: #f3f4f6; color: #374151; border-radius: 8px; font-size: 13px; font-weight: 600;">Calculators &amp; Finance (8)</span>
    </div>

    <!-- 25 TOOLS LIST -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 24px; margin-bottom: 48px;">
      ${TOOLS_DATA.map((tool) => `
        <section style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <span style="display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 3px 8px; border-radius: 4px; background: #f3f4f6; color: #374151;">${escapeXml(tool.category)}</span>
              <span style="font-size: 11px; color: #059669; font-weight: 600;">100% Client-Side</span>
            </div>
            <h2 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 10px 0;">${escapeXml(tool.name)}</h2>
            <p style="font-size: 14px; color: #4b5563; line-height: 1.55; margin-bottom: 18px;">${escapeXml(tool.summary)}</p>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f3f4f6; padding-top: 14px;">
            <a href="/tools/${tool.id}.html" style="background: #111827; color: #ffffff; padding: 9px 18px; border-radius: 8px; font-size: 13px; font-weight: 700; text-decoration: none;">Use Tool</a>
            <a href="/tools/${tool.id}.html" style="color: #2563eb; font-size: 13px; font-weight: 600; text-decoration: none;">Documentation &amp; FAQs →</a>
          </div>
        </section>
      `).join('')}
    </div>

    <!-- CLIENT SIDE PRIVACY GUARANTEE -->
    <section style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 32px; margin-bottom: 40px;">
      <h2 style="font-size: 22px; font-weight: 700; color: #111827; margin-bottom: 12px;">Client-Side Execution &amp; Browser Privacy Guarantee</h2>
      <p style="color: #4b5563; line-height: 1.7; margin-bottom: 14px;">
        All 25 tools on Money Master Blog execute entirely within your browser memory using HTML5 Canvas, the Web Cryptography API, and local string processors. Your documents, photos, calculations, and passwords are never transmitted to any external server or saved in third-party databases.
      </p>
      <ul style="color: #4b5563; line-height: 1.8; padding-left: 20px; margin-bottom: 14px;">
        <li><strong>Text Processing:</strong> Text Cleaner, Word Counter, Case Converter, Reverser, and Slug Generator manipulate text in local RAM.</li>
        <li><strong>Security:</strong> Password Generator and UUID Generator use native cryptographically secure pseudorandom number generators (CSPRNG).</li>
        <li><strong>Images:</strong> Image Compressor, Resizer, and Cropper run via the HTML5 2D Canvas context without uploads.</li>
        <li><strong>Calculators:</strong> Loans, GST, Tip, Percentages, and Dates calculate instantly with zero network roundtrips.</li>
      </ul>
      <p><a href="/p/blog-page.html" style="color: #2563eb; font-weight: 600;">Explore our 20 practical guides on utilizing these utilities →</a></p>
    </section>
  </main>
  ${renderFooter()}`;
}

function renderIndividualToolPageBody(tool: ToolMeta): string {
  const relatedTools = tool.relatedToolIds
    .map((id) => getToolById(id))
    .filter((t): t is ToolMeta => t !== undefined);

  return `
  ${renderHeader()}
  ${renderBreadcrumbNav([
    { name: 'Home', url: '/' },
    { name: 'Online Tools', url: '/p/tools.html' },
    { name: tool.name },
  ])}
  <main style="max-width: 900px; margin: 0 auto; padding: 24px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #1f2937;">
    <!-- TOOL HEADER -->
    <header style="margin-bottom: 32px; border-bottom: 1px solid #e5e7eb; padding-bottom: 24px;">
      <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
        <span style="font-size: 12px; font-weight: 700; color: #047857; background: #ecfdf5; padding: 3px 10px; border-radius: 9999px;">${escapeXml(tool.category)}</span>
        <span style="font-size: 12px; color: #6b7280;">•</span>
        <span style="font-size: 12px; color: #6b7280;">${escapeXml(tool.privacyNote)}</span>
      </div>
      <h1 style="font-size: 32px; font-weight: 800; color: #111827; margin: 0 0 12px 0;">${escapeXml(tool.h1)}</h1>
      <p style="font-size: 17px; color: #4b5563; line-height: 1.6; margin: 0 0 16px 0;">${escapeXml(tool.explanation)}</p>
      <div>
        <a href="/p/tools.html" style="color: #2563eb; font-weight: 600; font-size: 14px; text-decoration: none;">← Back to All 25 Tools Directory</a>
      </div>
    </header>

    <!-- LIVE TOOL PLACEHOLDER / NOTICE -->
    <div style="background: #ffffff; border: 2px solid #10b981; border-radius: 12px; padding: 28px; margin-bottom: 36px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h2 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0;">Interactive ${escapeXml(tool.name)} Workspace</h2>
        <span style="background: #ecfdf5; color: #065f46; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 6px;">Active Tool</span>
      </div>
      <p style="font-size: 14px; color: #4b5563; margin-bottom: 18px;">
        ${escapeXml(tool.summary)}
      </p>
      <div style="background: #f9fafb; border: 1px dashed #d1d5db; border-radius: 8px; padding: 20px; text-align: center;">
        <p style="font-size: 14px; color: #374151; font-weight: 600; margin-bottom: 8px;">
          Ready to use: Open the interactive widget above.
        </p>
        <p style="font-size: 12px; color: #6b7280; margin: 0;">
          All computations, image conversions, and text analyses execute client-side directly on your device.
        </p>
      </div>
    </div>

    <!-- HOW TO USE -->
    <section style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 28px; margin-bottom: 32px;">
      <h2 style="font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 16px 0;">How to Use the ${escapeXml(tool.name)}</h2>
      <ol style="padding-left: 20px; margin: 0; line-height: 1.8;">
        ${tool.howToUse.map((step) => `<li style="margin-bottom: 8px;">${escapeXml(step)}</li>`).join('')}
      </ol>
    </section>

    <!-- PRACTICAL EXAMPLE -->
    <section style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 28px; margin-bottom: 32px;">
      <h2 style="font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 16px 0;">Practical Example: ${escapeXml(tool.example.title)}</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 16px;">
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px;">
          <strong style="display: block; font-size: 12px; color: #6b7280; text-transform: uppercase; margin-bottom: 4px;">Sample Input:</strong>
          <pre style="margin: 0; font-family: monospace; font-size: 13px; color: #111827; white-space: pre-wrap;">${escapeXml(tool.example.input)}</pre>
        </div>
        <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 14px;">
          <strong style="display: block; font-size: 12px; color: #065f46; text-transform: uppercase; margin-bottom: 4px;">Processed Output:</strong>
          <pre style="margin: 0; font-family: monospace; font-size: 13px; color: #064e3b; white-space: pre-wrap;">${escapeXml(tool.example.output)}</pre>
        </div>
      </div>
      ${tool.example.explanation ? `<p style="font-size: 14px; color: #4b5563; margin: 0;">${escapeXml(tool.example.explanation)}</p>` : ''}
    </section>

    <!-- USEFUL TIPS -->
    <section style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 28px; margin-bottom: 32px;">
      <h2 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 12px 0;">Useful Tips &amp; Best Practices</h2>
      <ul style="padding-left: 20px; margin: 0; line-height: 1.8;">
        ${tool.usefulTips.map((tip) => `<li style="margin-bottom: 6px;">${escapeXml(tip)}</li>`).join('')}
      </ul>
    </section>

    <!-- FREQUENTLY ASKED QUESTIONS -->
    <section style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 28px; margin-bottom: 32px;">
      <h2 style="font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 20px 0;">Frequently Asked Questions</h2>
      <div style="display: flex; flex-direction: column; gap: 18px;">
        ${tool.faqs.map((faq) => `
          <div style="border-bottom: 1px solid #f3f4f6; padding-bottom: 16px;">
            <h3 style="font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 6px 0;">${escapeXml(faq.question)}</h3>
            <p style="font-size: 14px; color: #4b5563; margin: 0; line-height: 1.6;">${escapeXml(faq.answer)}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- RELATED TOOLS -->
    ${relatedTools.length > 0 ? `
    <section style="margin-bottom: 32px;">
      <h2 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 16px 0;">Related Online Tools</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
        ${relatedTools.map((rel) => `
          <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 18px;">
            <span style="font-size: 11px; font-weight: 600; color: #0284c7; text-transform: uppercase;">${escapeXml(rel.category)}</span>
            <h3 style="font-size: 16px; font-weight: 700; margin: 6px 0 8px 0;">
              <a href="/tools/${rel.id}.html" style="color: #111827; text-decoration: none;">${escapeXml(rel.name)}</a>
            </h3>
            <p style="font-size: 13px; color: #4b5563; line-height: 1.5; margin: 0 0 12px 0;">${escapeXml(rel.summary)}</p>
            <a href="/tools/${rel.id}.html" style="font-size: 13px; color: #2563eb; font-weight: 600; text-decoration: none;">Use Tool →</a>
          </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    <div style="text-align: center; margin: 40px 0;">
      <a href="/p/tools.html" style="display: inline-block; background: #111827; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: 700; text-decoration: none;">← Browse All 25 Tools</a>
    </div>
  </main>
  ${renderFooter()}`;
}

function renderBlogIndexBody(): string {
  return `
  ${renderHeader()}
  ${renderBreadcrumbNav([{ name: 'Home', url: '/' }, { name: 'Financial Guides' }])}
  <main style="max-width: 1100px; margin: 0 auto; padding: 24px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6;">
    <header style="margin-bottom: 40px; text-align: center;">
      <h1 style="font-size: 32px; font-weight: 800; color: #111827; margin-bottom: 12px;">Financial Planning &amp; Practical Guides</h1>
      <p style="font-size: 17px; color: #4b5563; max-width: 780px; margin: 0 auto;">
        20 comprehensive, educational guides written by Shahid Ali on calculating real loan costs, finding hidden credit card fees, creating debt plans, estimating emergency funds, evaluating insurance, and retirement planning.
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
            <p style="font-size: 12px; color: #6b7280; margin: 0 0 8px 0;">Written by <strong style="color: #111827;">Shahid Ali</strong></p>
            <h2 style="font-size: 20px; font-weight: 700; line-height: 1.35; margin: 0 0 10px 0;">
              <a href="${postPath}" style="color: #111827; text-decoration: none;">${escapeXml(article.title)}</a>
            </h2>
            <p style="font-size: 14px; color: #4b5563; line-height: 1.55; margin: 0 0 16px 0;">${escapeXml(article.excerpt)}</p>
          </div>
          <div style="border-top: 1px solid #f3f4f6; padding-top: 14px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 13px; color: #6b7280;">${escapeXml(article.readingTime)}</span>
            <a href="${postPath}" style="background: #111827; color: #ffffff; padding: 8px 16px; border-radius: 6px; font-weight: 600; font-size: 13px; text-decoration: none;">Read More →</a>
          </div>
        </article>
      `;
      }).join('')}
    </div>
  </main>
  ${renderFooter()}`;
}

function renderArticleBody(article: typeof BLOG_ARTICLES[0]): string {
  const related = getRelatedArticles(article.slug, 3);
  return `
  ${renderHeader()}
  ${renderBreadcrumbNav([
    { name: 'Home', url: '/' },
    { name: 'Financial Guides', url: '/p/blog-page.html' },
    { name: article.title },
  ])}
  <main style="max-width: 860px; margin: 0 auto; padding: 24px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #1f2937;">
    <article>
      <header style="margin-bottom: 32px; border-bottom: 1px solid #e5e7eb; padding-bottom: 24px;">
        <div style="display: flex; flex-wrap: wrap; gap: 12px; font-size: 14px; color: #6b7280; margin-bottom: 12px;">
          <span style="background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 4px; font-weight: 600;">${escapeXml(article.category)}</span>
          <span>Written by <strong>Shahid Ali</strong></span>
          <span>•</span>
          <time datetime="${formatDateToIso(article.publishedDate)}">${escapeXml(article.publishedDate)}</time>
          <span>•</span>
          <span>${escapeXml(article.readingTime)}</span>
        </div>
        <h1 style="font-size: 34px; font-weight: 800; color: #111827; line-height: 1.25; margin: 0 0 16px 0;">${escapeXml(article.title)}</h1>
        <p style="font-size: 18px; color: #4b5563; line-height: 1.6; margin: 0;">${escapeXml(article.excerpt)}</p>
      </header>

      <!-- QUICK PRACTICAL ANSWER -->
      <section style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 20px; border-radius: 0 8px 8px 0; margin-bottom: 32px;">
        <strong style="color: #166534; font-size: 15px; display: block; margin-bottom: 6px;">⚡ Quick Practical Answer</strong>
        <p style="color: #15803d; margin: 0; font-size: 15px; line-height: 1.6;">${escapeXml(article.quickAnswer)}</p>
      </section>

      <!-- CORE CONCEPT & DEFINITIONS -->
      ${article.coreConcept ? `
        <section style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 32px; box-shadow: 0 1px 2px rgba(0,0,0,0.04);">
          <span style="font-size: 12px; font-weight: 700; color: #047857; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">Core Financial Concept</span>
          <h2 style="font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 12px 0;">${escapeXml(article.coreConcept.title)}</h2>
          <p style="margin: 0 0 16px 0; color: #374151;">${escapeXml(article.coreConcept.explanation)}</p>
          ${article.coreConcept.definitions && article.coreConcept.definitions.length > 0 ? `
            <div style="border-top: 1px solid #f3f4f6; padding-top: 16px;">
              <strong style="font-size: 12px; color: #6b7280; text-transform: uppercase; display: block; margin-bottom: 10px;">Essential Terms Defined</strong>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px;">
                ${article.coreConcept.definitions.map(d => `
                  <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px;">
                    <strong style="font-size: 13px; color: #111827; display: block; margin-bottom: 4px;">${escapeXml(d.term)}</strong>
                    <span style="font-size: 12px; color: #4b5563; line-height: 1.5; display: block;">${escapeXml(d.definition)}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </section>
      ` : ''}

      <!-- MAIN BODY SECTIONS -->
      ${article.sections.map(section => `
        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 24px; font-weight: 800; color: #111827; margin: 0 0 14px 0;">${escapeXml(section.heading)}</h2>
          ${section.subheading ? `<h3 style="font-size: 18px; font-weight: 700; color: #374151; margin: 0 0 12px 0;">${escapeXml(section.subheading)}</h3>` : ''}
          ${section.paragraphs.map(p => `<p style="margin: 0 0 14px 0; line-height: 1.75;">${escapeXml(p)}</p>`).join('')}
          ${section.bulletPoints && section.bulletPoints.length > 0 ? `
            <ul style="padding-left: 20px; margin: 0 0 16px 0; line-height: 1.8;">
              ${section.bulletPoints.map(bp => `<li style="margin-bottom: 6px;">${escapeXml(bp)}</li>`).join('')}
            </ul>
          ` : ''}
          ${section.numberedList && section.numberedList.length > 0 ? `
            <ol style="padding-left: 20px; margin: 0 0 16px 0; line-height: 1.8;">
              ${section.numberedList.map(item => `<li style="margin-bottom: 8px;">${escapeXml(item)}</li>`).join('')}
            </ol>
          ` : ''}
          ${section.callout ? `
            <div style="background: #f8fafc; border-left: 4px solid #0284c7; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 20px 0;">
              <strong style="color: #0369a1; font-size: 14px; display: block; margin-bottom: 4px;">${escapeXml(section.callout.title)}</strong>
              <p style="color: #334155; margin: 0; font-size: 14px;">${escapeXml(section.callout.text)}</p>
            </div>
          ` : ''}
        </section>
      `).join('')}

      <!-- STEP-BY-STEP METHOD -->
      ${article.stepByStepMethod ? `
        <section style="margin: 40px 0; border-top: 1px solid #e5e7eb; padding-top: 32px;">
          <h2 style="font-size: 26px; font-weight: 800; color: #111827; margin: 0 0 8px 0;">${escapeXml(article.stepByStepMethod.title)}</h2>
          <p style="font-size: 16px; color: #4b5563; margin: 0 0 24px 0;">${escapeXml(article.stepByStepMethod.description)}</p>
          <div style="display: flex; flex-direction: column; gap: 20px;">
            ${article.stepByStepMethod.steps.map(step => `
              <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                  <span style="width: 28px; height: 28px; border-radius: 6px; background: #111827; color: #ffffff; font-weight: 700; font-size: 13px; display: flex; align-items: center; justify-content: center; shrink: 0;">${step.stepNumber}</span>
                  <h3 style="font-size: 17px; font-weight: 700; color: #111827; margin: 0;">${escapeXml(step.stepName)}</h3>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin-bottom: 12px; font-size: 13px;">
                  <div style="background: #f9fafb; padding: 10px; border-radius: 6px;">
                    <strong style="color: #111827; display: block; margin-bottom: 2px;">What to Check:</strong>
                    <span style="color: #4b5563;">${escapeXml(step.whatToCheck)}</span>
                  </div>
                  <div style="background: #f9fafb; padding: 10px; border-radius: 6px;">
                    <strong style="color: #111827; display: block; margin-bottom: 2px;">Why It Matters:</strong>
                    <span style="color: #4b5563;">${escapeXml(step.whyItMatters)}</span>
                  </div>
                </div>
                <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 12px; font-size: 13px; color: #065f46;">
                  <strong>How to Calculate: </strong>${escapeXml(step.howToCalculate)}
                  <div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid #bbf7d0; font-weight: 600;">
                    Expected Result: ${escapeXml(step.expectedResult)}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}

      <!-- PRACTICAL EXAMPLES -->
      ${article.examples && article.examples.length > 0 ? `
        <section style="margin: 40px 0; border-top: 1px solid #e5e7eb; padding-top: 32px;">
          <h2 style="font-size: 26px; font-weight: 800; color: #111827; margin: 0 0 8px 0;">Practical Numerical Examples</h2>
          <p style="font-size: 16px; color: #4b5563; margin: 0 0 24px 0;">Realistic hypothetical scenarios illustrating calculations across different loan and savings structures:</p>
          <div style="display: flex; flex-direction: column; gap: 24px;">
            ${article.examples.map(ex => `
              <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                <div style="background: #111827; color: #ffffff; padding: 12px 20px; font-weight: 700; font-size: 15px; display: flex; justify-content: space-between; align-items: center;">
                  <span>${escapeXml(ex.title)}</span>
                  <span style="font-size: 11px; background: #374151; padding: 2px 8px; border-radius: 4px; color: #34d399;">Hypothetical Example</span>
                </div>
                <div style="padding: 20px;">
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-bottom: 16px; font-size: 12px;">
                    <div style="background: #f9fafb; border: 1px solid #e5e7eb; padding: 8px; border-radius: 6px;">
                      <span style="color: #6b7280; display: block; font-size: 10px; text-transform: uppercase;">Amount</span>
                      <strong>${escapeXml(ex.startingAmount)}</strong>
                    </div>
                    <div style="background: #f9fafb; border: 1px solid #e5e7eb; padding: 8px; border-radius: 6px;">
                      <span style="color: #6b7280; display: block; font-size: 10px; text-transform: uppercase;">Rate</span>
                      <strong>${escapeXml(ex.rate)}</strong>
                    </div>
                    <div style="background: #f9fafb; border: 1px solid #e5e7eb; padding: 8px; border-radius: 6px;">
                      <span style="color: #6b7280; display: block; font-size: 10px; text-transform: uppercase;">Term</span>
                      <strong>${escapeXml(ex.term)}</strong>
                    </div>
                    <div style="background: #f9fafb; border: 1px solid #e5e7eb; padding: 8px; border-radius: 6px;">
                      <span style="color: #6b7280; display: block; font-size: 10px; text-transform: uppercase;">Fees</span>
                      <strong>${escapeXml(ex.fees)}</strong>
                    </div>
                  </div>
                  <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 14px; font-family: monospace; font-size: 12px; color: #111827; white-space: pre-wrap; margin-bottom: 14px;">${escapeXml(ex.calculation)}</div>
                  <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; padding: 12px; font-weight: 700; color: #065f46; margin-bottom: 12px;">
                    Result: ${escapeXml(ex.result)}
                  </div>
                  <p style="font-size: 13px; color: #4b5563; margin: 0; line-height: 1.6;"><strong>Interpretation: </strong>${escapeXml(ex.interpretation)}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}

      <!-- COMPARISON TABLE -->
      ${article.comparisonTable ? `
        <section style="margin: 40px 0; border-top: 1px solid #e5e7eb; padding-top: 32px;">
          <h2 style="font-size: 24px; font-weight: 800; color: #111827; margin: 0 0 8px 0;">${escapeXml(article.comparisonTable.title)}</h2>
          ${article.comparisonTable.description ? `<p style="font-size: 15px; color: #4b5563; margin: 0 0 16px 0;">${escapeXml(article.comparisonTable.description)}</p>` : ''}
          <div style="overflow-x: auto; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 8px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
              <thead>
                <tr style="background: #111827; color: #ffffff;">
                  ${article.comparisonTable.headers.map(h => `<th style="padding: 12px 14px; font-weight: 600;">${escapeXml(h)}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${article.comparisonTable.rows.map((row, rIdx) => `
                  <tr style="background: ${rIdx % 2 === 0 ? '#ffffff' : '#f9fafb'}; border-bottom: 1px solid #e5e7eb;">
                    ${row.map((cell, cIdx) => `<td style="padding: 10px 14px; ${cIdx === 0 ? 'font-weight: 700; color: #111827;' : 'color: #374151;'}">${escapeXml(cell)}</td>`).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          ${article.comparisonTable.footnote ? `<p style="font-size: 12px; color: #6b7280; font-style: italic; margin: 0;">${escapeXml(article.comparisonTable.footnote)}</p>` : ''}
        </section>
      ` : ''}

      <!-- REAL-WORLD SCENARIOS -->
      ${article.realWorldScenarios && article.realWorldScenarios.length > 0 ? `
        <section style="margin: 40px 0; border-top: 1px solid #e5e7eb; padding-top: 32px;">
          <h2 style="font-size: 24px; font-weight: 800; color: #111827; margin: 0 0 16px 0;">Real-World Practical Scenarios</h2>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${article.realWorldScenarios.map(sc => `
              <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px;">
                <h3 style="font-size: 17px; font-weight: 700; color: #111827; margin: 0 0 8px 0;">${escapeXml(sc.title)}</h3>
                <p style="font-size: 13px; color: #6b7280; margin: 0 0 10px 0;"><strong>Profile: </strong>${escapeXml(sc.profile)}</p>
                <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 12px; font-size: 13px; margin-bottom: 10px; line-height: 1.6;">
                  <p style="margin: 0 0 6px 0;"><strong>Dilemma: </strong>${escapeXml(sc.dilemma)}</p>
                  <p style="margin: 0 0 6px 0;"><strong>Analysis: </strong>${escapeXml(sc.evaluation)}</p>
                  <p style="margin: 0; color: #047857;"><strong>Recommended Action: </strong>${escapeXml(sc.recommendedAction)}</p>
                </div>
                <div style="font-size: 13px; font-weight: 700; color: #065f46;">
                  Financial Outcome: ${escapeXml(sc.financialOutcome)}
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}

      <!-- COMMON MISTAKES -->
      ${article.commonMistakes && article.commonMistakes.length > 0 ? `
        <section style="margin: 40px 0; border-top: 1px solid #e5e7eb; padding-top: 32px;">
          <h2 style="font-size: 24px; font-weight: 800; color: #111827; margin: 0 0 16px 0;">Common Mistakes to Avoid</h2>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${article.commonMistakes.map(m => `
              <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 18px;">
                <h3 style="font-size: 16px; font-weight: 700; color: #991b1b; margin: 0 0 6px 0;">✕ Mistake: ${escapeXml(m.mistake)}</h3>
                <p style="font-size: 13px; color: #4b5563; margin: 0 0 8px 0;"><strong>Why it happens: </strong>${escapeXml(m.whyItHappens)}</p>
                <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 10px; font-size: 13px; color: #991b1b; margin-bottom: 8px;">
                  <strong>Financial Consequence: </strong>${escapeXml(m.consequence)}
                </div>
                <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 10px; font-size: 13px; color: #166534;">
                  <strong>Better Approach: </strong>${escapeXml(m.betterApproach)}
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}

      <!-- IMPORTANT EXCEPTIONS -->
      ${article.importantExceptions && article.importantExceptions.length > 0 ? `
        <section style="margin: 40px 0; border-top: 1px solid #e5e7eb; padding-top: 32px;">
          <h2 style="font-size: 24px; font-weight: 800; color: #111827; margin: 0 0 16px 0;">Important Exceptions &amp; Edge Cases</h2>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${article.importantExceptions.map(ex => `
              <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 14px; font-size: 13px; line-height: 1.6;">
                <strong style="color: #92400e; font-size: 14px; display: block; margin-bottom: 4px;">Exception: ${escapeXml(ex.situation)}</strong>
                <p style="color: #78350f; margin: 0 0 6px 0;"><strong>Why the general rule fails: </strong>${escapeXml(ex.whyGeneralMethodFails)}</p>
                <p style="color: #065f46; margin: 0;"><strong>How to handle: </strong>${escapeXml(ex.howToHandle)}</p>
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}

      <!-- DECISION FRAMEWORK -->
      ${article.decisionFramework ? `
        <section style="background: #111827; color: #ffffff; border-radius: 12px; padding: 28px; margin: 40px 0;">
          <span style="font-size: 12px; font-weight: 700; color: #34d399; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">Decision Framework</span>
          <h2 style="font-size: 24px; font-weight: 800; color: #ffffff; margin: 0 0 8px 0;">${escapeXml(article.decisionFramework.title)}</h2>
          <p style="font-size: 14px; color: #9ca3af; margin: 0 0 20px 0;">${escapeXml(article.decisionFramework.description)}</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px;">
            ${article.decisionFramework.stages.map(stg => `
              <div style="background: #1f2937; border: 1px solid #374151; border-radius: 8px; padding: 14px;">
                <span style="font-size: 12px; font-weight: 800; color: #34d399; text-transform: uppercase; display: block; margin-bottom: 4px;">${escapeXml(stg.stage)}</span>
                <strong style="font-size: 14px; color: #ffffff; display: block; margin-bottom: 6px;">${escapeXml(stg.action)}</strong>
                <p style="font-size: 12px; color: #9ca3af; margin: 0; line-height: 1.5;">${escapeXml(stg.details)}</p>
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}

      <!-- ACTIONABLE CHECKLIST -->
      ${article.checklist && article.checklist.length > 0 ? `
        <section style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin: 40px 0;">
          <h2 style="font-size: 22px; font-weight: 800; color: #111827; margin: 0 0 16px 0;">Actionable Implementation Checklist</h2>
          <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8;">
            ${article.checklist.map(item => `
              <li style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; font-size: 14px; color: #374151;">
                <span style="color: #16a34a; font-weight: 700; margin-top: 1px;">✓</span>
                <span>${escapeXml(item)}</span>
              </li>
            `).join('')}
          </ul>
        </section>
      ` : ''}

      <!-- FAQS -->
      ${article.faqs && article.faqs.length > 0 ? `
        <section style="margin: 40px 0; border-top: 1px solid #e5e7eb; padding-top: 32px;">
          <h2 style="font-size: 24px; font-weight: 800; color: #111827; margin: 0 0 20px 0;">Frequently Asked Questions</h2>
          <div style="display: flex; flex-direction: column; gap: 18px;">
            ${article.faqs.map(faq => `
              <div style="border-bottom: 1px solid #f3f4f6; padding-bottom: 16px;">
                <h3 style="font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 6px 0;">${escapeXml(faq.question)}</h3>
                <p style="font-size: 14px; color: #4b5563; margin: 0; line-height: 1.6;">${escapeXml(faq.answer)}</p>
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}

      <!-- CONCLUSION -->
      ${article.conclusion ? `
        <section style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin: 40px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
          <h2 style="font-size: 22px; font-weight: 800; color: #111827; margin: 0 0 10px 0;">Conclusion &amp; Key Takeaways</h2>
          <p style="font-size: 15px; color: #374151; line-height: 1.7; margin: 0 0 16px 0;">${escapeXml(article.conclusion.summary)}</p>
          ${article.conclusion.nextSteps && article.conclusion.nextSteps.length > 0 ? `
            <div style="border-top: 1px solid #f3f4f6; padding-top: 14px;">
              <strong style="font-size: 13px; color: #111827; text-transform: uppercase; display: block; margin-bottom: 8px;">Actionable Next Steps:</strong>
              <ul style="padding-left: 20px; margin: 0; font-size: 14px; color: #4b5563; line-height: 1.7;">
                ${article.conclusion.nextSteps.map(step => `<li style="margin-bottom: 6px;">${escapeXml(step)}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </section>
      ` : ''}

      <!-- AUTHOR BOX -->
      <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin: 40px 0;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: #111827; color: #ffffff; font-weight: 700; font-size: 16px; display: flex; align-items: center; justify-content: center; shrink: 0;">
            SA
          </div>
          <div>
            <h3 style="font-size: 17px; font-weight: 700; color: #111827; margin: 0;">Written by Shahid Ali</h3>
            <p style="font-size: 13px; color: #4b5563; margin: 3px 0 0 0;">7 years of practical experience in digital content workflows &amp; web utilities.</p>
          </div>
        </div>
      </div>

      <!-- EDUCATIONAL DISCLAIMER -->
      <div style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 16px; margin: 24px 0; font-size: 12px; color: #92400e; line-height: 1.6;">
        <strong>Educational Disclaimer:</strong> This article is published exclusively for educational and informational purposes. It does not constitute personalized financial, credit, legal, insurance, or investment advice. Numerical examples are hypothetical models for conceptual illustration. Interest rates, loan eligibility, card terms, and insurance provisions vary according to state regulations and individual provider underwriting criteria.
      </div>

      <section style="border-top: 1px solid #e5e7eb; padding-top: 32px; margin-top: 40px;">
        <h3 style="font-size: 20px; font-weight: 700; color: #111827; margin-bottom: 16px;">Related Financial Guides</h3>
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
      <p style="margin-bottom: 14px;">Money Master Blog was founded and is maintained by Shahid Ali. After 7 years of relying on web utilities for daily text drafting, layout formatting, calculations, and content operations, Shahid built this hub to give users fast, transparent, and completely free online utilities.</p>
      <p>Every one of our 25 tools runs locally in your browser DOM, ensuring your private lists, passwords, calculations, and photos remain exclusively on your device.</p>
    </section>

    <section style="margin-bottom: 32px;">
      <h2 style="font-size: 22px; font-weight: 700; color: #111827; margin-bottom: 14px;">Our Core Philosophy: Functional Simplicity</h2>
      <ul style="padding-left: 20px; line-height: 1.8;">
        <li><strong>No Paywalls or Accounts:</strong> All 25 tools and 20 guides are open and free forever.</li>
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
      <p style="margin-bottom: 14px;">We appreciate hearing from our visitors. If you have an idea for a new utility, want to report an issue with any of our 25 tools, or need clarification on any of our 20 practical guides, please get in touch.</p>
      <p>We review inquiries regularly and aim to respond within 24 to 48 business hours.</p>
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

      // 2a. Pre-render Homepage into dist/index.html
      const homeCanonical = `${CANONICAL_DOMAIN}/`;
      const preRenderedHomeHtml = generateStaticHtml(templateHtml, {
        title: 'Money Master Blog | Practical Money Guides & Financial Tools',
        description: 'Explore practical money guides, financial calculators, saving and budgeting tips, loan and credit explanations, and useful online tools at Money Master Blog.',
        canonicalUrl: homeCanonical,
        bodyContent: renderHomePageBody(),
        jsonLd: [
          {
            '@type': 'WebSite',
            name: 'Money Master Blog',
            url: CANONICAL_DOMAIN,
            description: 'Explore practical money guides, financial calculators, saving and budgeting tips, loan and credit explanations, and useful online tools at Money Master Blog.',
            publisher: {
              '@type': 'Organization',
              name: 'Money Master Blog',
              logo: {
                '@type': 'ImageObject',
                url: `${CANONICAL_DOMAIN}/logo.png`,
              },
            },
          },
        ],
      });
      fs.writeFileSync(distIndexPath, preRenderedHomeHtml, 'utf-8');
      console.log(`✅ Pre-rendered homepage into ${distIndexPath}`);

      // 2b. Generate HTML files for Core Pages
      for (const page of CORE_PAGES) {
        if (page.path === '/') continue;

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
            'How Money Master Blog handles visitor privacy, cookies, and local browser processing.',
            `<p>Money Master Blog operates with a strict privacy-first principle. All 25 tools process text, calculations, and images locally in your browser memory. We never transmit or store your inputs on remote servers.</p>`
          );
        } else if (page.id === 'terms') {
          bodyContent = renderLegalPageBody(
            'Terms &amp; Conditions',
            'Usage rights, acceptable use, and output ownership on Money Master Blog.',
            `<p>By accessing Money Master Blog, you agree to these terms. All output generated through our utilities belongs entirely to you for personal and commercial use without attribution requirements.</p>`
          );
        } else if (page.id === 'disclaimer') {
          bodyContent = renderLegalPageBody(
            'Website Disclaimer',
            'Informational purposes, tool accuracy, and productivity utility.',
            `<p>The tools and guides on Money Master Blog are provided for practical digital utility on an "as-is" basis. Calculations and financial figures serve educational estimation purposes.</p>`
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

      // 2c. Generate HTML files for all 25 individual Tools
      for (const tool of TOOLS_DATA) {
        const toolUrl = `${CANONICAL_DOMAIN}/tools/${tool.id}.html`;
        const breadcrumbs = [
          { '@type': 'ListItem', position: 1, name: 'Home', item: CANONICAL_DOMAIN },
          { '@type': 'ListItem', position: 2, name: 'Online Tools', item: `${CANONICAL_DOMAIN}/p/tools.html` },
          { '@type': 'ListItem', position: 3, name: tool.name, item: toolUrl },
        ];

        const jsonLdGraph: object[] = [
          {
            '@type': 'WebApplication',
            name: `${tool.name} – Money Master Blog`,
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'All',
            browserRequirements: 'Requires JavaScript. Requires HTML5.',
            url: toolUrl,
            description: tool.metaDescription,
            author: {
              '@type': 'Person',
              name: 'Shahid Ali',
            },
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs,
          },
          {
            '@type': 'FAQPage',
            mainEntity: tool.faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: f.answer,
              },
            })),
          },
        ];

        const bodyContent = renderIndividualToolPageBody(tool);
        const html = generateStaticHtml(templateHtml, {
          title: `${tool.seoTitle} – Money Master Blog`,
          description: tool.metaDescription,
          canonicalUrl: toolUrl,
          bodyContent,
          jsonLd: jsonLdGraph,
        });

        // Write /tools/${tool.id}.html
        const directToolPath = path.join(distDir, 'tools', `${tool.id}.html`);
        ensureDirectoryExistence(directToolPath);
        fs.writeFileSync(directToolPath, html, 'utf-8');

        // Write clean folder /tools/${tool.id}/index.html
        const cleanToolPath = path.join(distDir, 'tools', tool.id, 'index.html');
        ensureDirectoryExistence(cleanToolPath);
        fs.writeFileSync(cleanToolPath, html, 'utf-8');
      }

      console.log(`✅ Pre-rendered static HTML for 25 individual tools into dist/tools/*.html`);

      // 2d. Generate HTML files for all 20 Articles
      for (const article of BLOG_ARTICLES) {
        const postPath = getBloggerPostPath(article);
        const canonicalUrl = getCanonicalUrl(postPath);
        const dateIso = formatDateToIso(article.publishedDate);
        const modIso = formatDateToIso(article.updatedDate || article.publishedDate);

        const breadcrumbs = [
          { '@type': 'ListItem', position: 1, name: 'Home', item: CANONICAL_DOMAIN },
          { '@type': 'ListItem', position: 2, name: 'Financial Guides', item: `${CANONICAL_DOMAIN}/p/blog-page.html` },
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

        // Primary Blogger post path (e.g. /2026/01/how-to-clean-text...html)
        const targetFilePath = path.join(distDir, postPath.replace(/^\//, ''));
        ensureDirectoryExistence(targetFilePath);
        fs.writeFileSync(targetFilePath, html, 'utf-8');

        // Clean alias path (e.g. /blog/how-to-clean-text.../index.html)
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
