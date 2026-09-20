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
import BlogPage from './components/pages/BlogPage';
import BlogArticlePage from './components/pages/BlogArticlePage';
import { getArticleBySlug, BLOG_ARTICLES } from './data/blogArticles';

interface PageSeoMeta {
  title: string;
  description: string;
}

const PAGE_SEO: Record<PageId, PageSeoMeta> = {
  home: {
    title: 'Money Master Blog – Simple Online Tools for Everyday Tasks',
    description:
      'Money Master Blog provides simple online tools for generating color palettes, creating placeholder text, cleaning text, and completing everyday digital tasks.',
  },
  tools: {
    title: 'Online Tools – Money Master Blog',
    description:
      'Explore free, lightweight browser-based tools on Money Master Blog including our Color Palette Generator, Text Cleaner, and Lorem Ipsum Generator.',
  },
  blog: {
    title: 'Practical Guides & Digital Productivity Tips – Money Master Blog',
    description:
      'Browse practical guides on cleaning text, preparing spreadsheets, removing hidden characters, and improving digital productivity workflows.',
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
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedTool, setSelectedTool] = useState<ToolId>('color-palette');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);

  const currentArticle = selectedArticleSlug ? getArticleBySlug(selectedArticleSlug) : null;

  // Handle URL hash navigation if user uses browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '');

      // Check article routes: #blog/slug or #article/slug
      if (rawHash.startsWith('blog/') || rawHash.startsWith('article/')) {
        const slug = rawHash.replace(/^(blog|article)\//, '');
        const found = getArticleBySlug(slug);
        if (found) {
          setSelectedArticleSlug(found.slug);
          setCurrentPage('blog-article');
          return;
        }
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
      if (validPages.includes(rawHash as PageId)) {
        setCurrentPage(rawHash as PageId);
        if (rawHash !== 'blog-article') {
          setSelectedArticleSlug(null);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    if (window.location.hash) {
      handleHashChange();
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Synchronize document title and meta description tag with current page
  useEffect(() => {
    let title = '';
    let description = '';

    if (currentPage === 'blog-article' && currentArticle) {
      title = `${currentArticle.title} – Money Master Blog`;
      description = currentArticle.metaDescription;
    } else {
      const seo = PAGE_SEO[currentPage] || PAGE_SEO.home;
      title = seo.title;
      description = seo.description;
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
  }, [currentPage, currentArticle]);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    if (page === 'blog') {
      setSelectedArticleSlug(null);
    }
    window.location.hash = page === 'home' ? '' : `#${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTool = (tool: ToolId) => {
    setSelectedTool(tool);
    setCurrentPage('tools');
    window.location.hash = '#tools';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (slug: string) => {
    const article = getArticleBySlug(slug);
    if (article) {
      setSelectedArticleSlug(article.slug);
      setCurrentPage('blog-article');
      window.location.hash = `#blog/${article.slug}`;
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
          <ToolsPage initialTool={selectedTool} />
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
          <DisclaimerPage />
        )}
      </main>

      {/* Comprehensive Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
