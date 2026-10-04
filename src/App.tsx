/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, ToolId } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import ToolsPage from './components/pages/ToolsPage';
import AboutUsPage from './components/pages/AboutUsPage';
import ContactUsPage from './components/pages/ContactUsPage';
import PrivacyPolicyPage from './components/pages/PrivacyPolicyPage';
import TermsPage from './components/pages/TermsPage';
import DisclaimerPage from './components/pages/DisclaimerPage';
import EditorialPolicyPage from './components/pages/EditorialPolicyPage';
import BlogPage from './components/pages/BlogPage';
import BlogArticlePage from './components/pages/BlogArticlePage';
import { getArticleBySlug, BLOG_ARTICLES } from './data/blogArticles';
import { getToolById } from './data/toolsData';
import { parseCurrentRoute, PAGE_PATHS, getBloggerPostPath, getCanonicalUrl } from './utils/routes';

interface PageSeoMeta {
  title: string;
  description: string;
}

const PAGE_SEO: Record<PageId, PageSeoMeta> = {
  home: {
    title: 'Money Master Blog | Practical Money Guides & Financial Tools',
    description:
      'Explore practical money guides, financial calculators, saving and budgeting tips, loan and credit explanations, and useful online tools at Money Master Blog.',
  },
  tools: {
    title: 'Free Online Financial & Utility Tools (25 Tools) – Money Master Blog',
    description:
      'Explore 25 free, lightweight browser-based calculators and utilities on Money Master Blog including loan payment, interest, percentage, and everyday digital tools.',
  },
  blog: {
    title: 'Practical Personal Finance Guides & Money Resources – Money Master Blog',
    description:
      'Browse comprehensive, reader-first guides on personal loans, credit card fees, debt repayment, emergency funds, insurance evaluation, and budgeting.',
  },
  'blog-article': {
    title: 'Practical Productivity Guide – Money Master Blog',
    description:
      'Step-by-step practical guides for digital text cleaning, document formatting, and browser-based productivity workflows.',
  },
  about: {
    title: 'About Us – Money Master Blog',
    description:
      'Learn about Money Master Blog and author Shahid Ali, featuring 7 years of practical experience with online utilities and everyday digital content workflows.',
  },
  contact: {
    title: 'Contact Us – Money Master Blog',
    description:
      'Get in touch with Shahid Ali at Money Master Blog to share tool suggestions, report bugs, or provide feedback on our browser utilities.',
  },
  privacy: {
    title: 'Privacy Policy – Money Master Blog',
    description:
      'Read the Money Master Blog Privacy Policy. Learn why our client-side browser tools process all text and colors locally without storing your data.',
  },
  terms: {
    title: 'Terms & Conditions – Money Master Blog',
    description:
      'Review the Terms and Conditions for using Money Master Blog. Understand permitted usage, commercial output rights, and user guidelines.',
  },
  disclaimer: {
    title: 'Website Disclaimer – Money Master Blog',
    description:
      'Read the Money Master Blog Disclaimer regarding tool accuracy, monitor color calibration, text tokenization differences, and productivity use.',
  },
  'editorial-policy': {
    title: 'Editorial Policy & Content Quality Standards – Money Master Blog',
    description:
      'Read the Money Master Blog Editorial Policy, mathematical verification standards, ongoing curation schedules, and fact-checking protocols by Shahid Ali.',
  },
};

export default function App() {
  const initialRoute = parseCurrentRoute();
  const [currentPage, setCurrentPage] = useState<PageId>(initialRoute.page);
  const [selectedTool, setSelectedTool] = useState<ToolId | null>(
    (initialRoute.toolId as ToolId) || null
  );
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(initialRoute.articleSlug);

  const currentArticle = selectedArticleSlug ? getArticleBySlug(selectedArticleSlug) : null;

  // Handle URL navigation (both browser history popstate and hashchange)
  useEffect(() => {
    // If a user or legacy link lands with a hash like #tools or #blog/slug, convert URL cleanly without '#'
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash) {
        let cleanUrl = '/';
        if (hash.startsWith('blog/') || hash.startsWith('article/')) {
          const slug = hash.replace(/^(blog|article)\//, '');
          const art = getArticleBySlug(slug);
          if (art) {
            cleanUrl = getBloggerPostPath(art);
          }
        } else if (hash.startsWith('tools/') || hash.startsWith('tool/')) {
          const tId = hash.replace(/^(tools|tool)\//, '');
          cleanUrl = `/tools/${tId}.html`;
        } else if (hash === 'tools') {
          cleanUrl = PAGE_PATHS.tools;
        } else if (hash === 'blog') {
          cleanUrl = PAGE_PATHS.blog;
        } else if (hash === 'about') {
          cleanUrl = PAGE_PATHS.about;
        } else if (hash === 'contact') {
          cleanUrl = PAGE_PATHS.contact;
        } else if (hash === 'privacy') {
          cleanUrl = PAGE_PATHS.privacy;
        } else if (hash === 'terms') {
          cleanUrl = PAGE_PATHS.terms;
        } else if (hash === 'disclaimer') {
          cleanUrl = PAGE_PATHS.disclaimer;
        }

        try {
          window.history.replaceState({}, '', cleanUrl);
        } catch {
          // ignore in restricted environments
        }
      }
    }

    const handleUrlChange = () => {
      const route = parseCurrentRoute();
      setCurrentPage(route.page);
      setSelectedArticleSlug(route.articleSlug);
      if (route.toolId) {
        setSelectedTool(route.toolId as ToolId);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Synchronize document title, meta description tag, and canonical link with current page
  useEffect(() => {
    let title = '';
    let description = '';
    let canonicalPath = '/';

    if (currentPage === 'blog-article' && currentArticle) {
      title = `${currentArticle.title} – Money Master Blog`;
      description = currentArticle.metaDescription;
      canonicalPath = getBloggerPostPath(currentArticle);
    } else if (currentPage === 'tools' && selectedTool) {
      const toolMeta = getToolById(selectedTool);
      if (toolMeta) {
        title = `${toolMeta.seoTitle} – Money Master Blog`;
        description = toolMeta.metaDescription;
        canonicalPath = `/tools/${toolMeta.id}.html`;
      } else {
        const seo = PAGE_SEO.tools;
        title = seo.title;
        description = seo.description;
        canonicalPath = PAGE_PATHS.tools;
      }
    } else {
      const seo = PAGE_SEO[currentPage] || PAGE_SEO.home;
      title = seo.title;
      description = seo.description;
      canonicalPath = PAGE_PATHS[currentPage] || '/';
    }

    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', description);
    }

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', getCanonicalUrl(canonicalPath));
  }, [currentPage, currentArticle, selectedTool]);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    if (page === 'blog') {
      setSelectedArticleSlug(null);
    }
    if (page === 'tools') {
      setSelectedTool(null);
    }
    const targetPath = PAGE_PATHS[page] || '/';
    try {
      window.history.pushState({}, '', targetPath);
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTool = (tool: ToolId) => {
    setSelectedTool(tool);
    setCurrentPage('tools');
    const targetPath = `/tools/${tool}.html`;
    try {
      window.history.pushState({}, '', targetPath);
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (slug: string) => {
    const article = getArticleBySlug(slug);
    if (article) {
      setSelectedArticleSlug(article.slug);
      setCurrentPage('blog-article');
      const targetPath = getBloggerPostPath(article);
      try {
        window.history.pushState({}, '', targetPath);
      } catch {
        // ignore
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Sticky Header with Hamburger Menu */}
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectTool={handleSelectTool}
            onSelectArticle={handleSelectArticle}
          />
        )}
        {currentPage === 'tools' && (
          <ToolsPage initialTool={selectedTool} onSelectTool={handleSelectTool} />
        )}
        {currentPage === 'blog' && (
          <BlogPage
            onNavigate={handleNavigate}
            onSelectArticle={handleSelectArticle}
            onSelectTool={handleSelectTool}
          />
        )}
        {currentPage === 'blog-article' && (
          currentArticle ? (
            <BlogArticlePage
              article={currentArticle}
              onNavigate={handleNavigate}
              onSelectArticle={handleSelectArticle}
              onSelectTool={handleSelectTool}
            />
          ) : (
            <div className="py-16 text-center max-w-lg mx-auto space-y-4">
              <h2 className="text-2xl font-bold text-neutral-900">Guide Not Found</h2>
              <p className="text-neutral-600 text-sm">
                The article you requested could not be located. It may have been moved or updated.
              </p>
              <button
                onClick={() => handleNavigate('blog')}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 transition-colors"
              >
                Browse All Guides
              </button>
            </div>
          )
        )}
        {currentPage === 'about' && (
          <AboutUsPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'contact' && (
          <ContactUsPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'privacy' && (
          <PrivacyPolicyPage />
        )}
        {currentPage === 'terms' && (
          <TermsPage />
        )}
        {currentPage === 'disclaimer' && (
          <DisclaimerPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'editorial-policy' && (
          <EditorialPolicyPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Comprehensive Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
