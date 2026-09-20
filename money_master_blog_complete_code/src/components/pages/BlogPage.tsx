import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  Filter,
  Tag,
  Sparkles,
  Wrench,
  CheckCircle2,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { BlogArticle, BlogCategory, PageId, ToolId } from '../../types';
import { BLOG_ARTICLES, BLOG_CATEGORIES, searchArticles } from '../../data/blogArticles';

interface BlogPageProps {
  onNavigate: (page: PageId) => void;
  onSelectArticle: (slug: string) => void;
  onSelectTool?: (tool: ToolId) => void;
}

export const CATEGORY_STYLES: Record<
  BlogCategory,
  { bg: string; text: string; border: string; dot: string }
> = {
  'Text Cleaning': {
    bg: 'bg-blue-50',
    text: 'text-blue-800',
    border: 'border-blue-200',
    dot: 'bg-blue-600'
  },
  'Productivity': {
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    border: 'border-emerald-200',
    dot: 'bg-emerald-600'
  },
  'Data Preparation': {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    dot: 'bg-amber-600'
  },
  'Online Work': {
    bg: 'bg-sky-50',
    text: 'text-sky-800',
    border: 'border-sky-200',
    dot: 'bg-sky-600'
  },
  'Digital Organization': {
    bg: 'bg-purple-50',
    text: 'text-purple-800',
    border: 'border-purple-200',
    dot: 'bg-purple-600'
  }
};

export default function BlogPage({ onNavigate, onSelectArticle, onSelectTool }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return searchArticles(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: BLOG_ARTICLES.length };
    BLOG_CATEGORIES.forEach(cat => {
      counts[cat] = BLOG_ARTICLES.filter(a => a.category === cat).length;
    });
    return counts;
  }, []);

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* 1. HERO & INTRODUCTION HEADER */}
      <section id="blog-header" className="pt-4 sm:pt-8 pb-4 border-b border-neutral-200">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold mb-4 border border-neutral-200">
            <BookOpen className="w-3.5 h-3.5 text-neutral-700" />
            <span>Money Master Blog • Practical Guides</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            Practical Guides for Everyday Digital Work
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl">
            Welcome to the Money Master Blog resource library. Here you will find detailed, step-by-step guides for cleaning, organizing, preparing, converting, and formatting digital text, spreadsheets, and everyday business workflows. Every guide is written with real-world scenarios, clear before-and-after examples, and verified client-side browser techniques.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-500 pt-4 border-t border-neutral-100">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-medium text-neutral-700">{BLOG_ARTICLES.length} Comprehensive Guides</span>
            </div>
            <span>•</span>
            <div>Zero Fluff or Exaggerated Claims</div>
            <span>•</span>
            <div>Written by Shahid Ali (7 Years Experience)</div>
            <span>•</span>
            <div>Integrated With 15 Free Browser Tools</div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER CONTROLS */}
      <section id="blog-controls" className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search bar */}
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="blog-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides by keyword, topic, or problem (e.g., PDF, spreadsheet, duplicates)..."
              className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-1 cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Results count */}
          <div className="text-xs sm:text-sm text-neutral-500 self-center md:self-auto font-medium">
            Showing <span className="text-neutral-900 font-bold">{filteredArticles.length}</span> of {BLOG_ARTICLES.length} guides
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <button
            id="cat-pill-all"
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border ${
              selectedCategory === 'All'
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100'
            }`}
          >
            <span>All Guides</span>
            <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${selectedCategory === 'All' ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-600'}`}>
              {categoryCounts.All}
            </span>
          </button>

          {BLOG_CATEGORIES.map(category => {
            const isSelected = selectedCategory === category;
            const count = categoryCounts[category] || 0;
            const style = CATEGORY_STYLES[category];

            return (
              <button
                key={category}
                id={`cat-pill-${category.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
                <span>{category}</span>
                <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-600'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. ARTICLES GRID */}
      <section id="blog-articles-grid">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-white border border-neutral-200 space-y-4">
            <BookOpen className="w-12 h-12 text-neutral-400 mx-auto" />
            <h3 className="text-lg font-bold text-neutral-900">No guides matched your search</h3>
            <p className="text-sm text-neutral-600 max-w-md mx-auto">
              We could not find any guides matching "{searchQuery}" in the selected category. Try a different keyword or reset your filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article, idx) => {
              const catStyle = CATEGORY_STYLES[article.category];
              return (
                <article
                  key={article.id}
                  id={`article-card-${article.slug}`}
                  className="bg-white rounded-2xl border border-neutral-200 hover:border-neutral-300 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-6 sm:p-7 space-y-4">
                    {/* Top row: Category Badge & Reading Time */}
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${catStyle.dot}`}></span>
                        {article.category}
                      </span>

                      <div className="flex items-center gap-1 text-neutral-500 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{article.readingTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg sm:text-xl font-bold text-neutral-900 leading-snug tracking-tight group-hover:text-neutral-700 transition-colors">
                      <button
                        onClick={() => onSelectArticle(article.slug)}
                        className="text-left cursor-pointer hover:underline"
                      >
                        {article.title}
                      </button>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* Quick Answer Snippet */}
                    <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 text-xs text-neutral-700 space-y-1">
                      <span className="font-bold text-neutral-900 block text-[11px] uppercase tracking-wider text-emerald-800">
                        Quick Takeaway
                      </span>
                      <p className="line-clamp-2 leading-relaxed text-neutral-600">
                        {article.quickAnswer}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Footer: Date & Read CTA */}
                  <div className="px-6 py-4 bg-neutral-50/75 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-neutral-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{article.publishedDate}</span>
                    </div>

                    <button
                      onClick={() => onSelectArticle(article.slug)}
                      className="inline-flex items-center gap-1.5 font-bold text-neutral-900 hover:text-emerald-700 transition-colors cursor-pointer group-hover:translate-x-0.5 transform duration-150"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. CROSS-LINKING TOOL BANNER */}
      <section id="blog-tools-banner" className="bg-neutral-900 text-neutral-100 rounded-2xl p-6 sm:p-10 border border-neutral-800">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5" />
              <span>Instant Client-Side Tools</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Ready to clean your text or prepare your list right now?
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Every workflow explained in our guides can be completed directly on Money Master Blog using our suite of 15 lightweight, browser-based tools. No signup, no fees, and 100% private in-browser processing.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => onNavigate('tools')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-neutral-900 font-bold text-sm hover:bg-neutral-100 transition-all cursor-pointer shadow-sm"
            >
              <span>Explore All 15 Tools</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. AUTHOR TRUST CALLOUT */}
      <section id="blog-author-strip" className="p-6 rounded-2xl bg-white border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-neutral-900 text-white font-bold text-lg flex items-center justify-center shrink-0">
          SA
        </div>
        <div className="space-y-1">
          <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Editorial Standard
          </div>
          <h4 className="text-sm font-bold text-neutral-900">
            Practical, Tested Advice by Shahid Ali
          </h4>
          <p className="text-xs text-neutral-600 leading-relaxed max-w-3xl">
            Every article on Money Master Blog reflects 7 years of daily hands-on experience working with digital content, web tools, and data formatting. We focus on real-world edge cases rather than theoretical fluff.
          </p>
        </div>
      </section>
    </div>
  );
}
