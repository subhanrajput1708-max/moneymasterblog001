import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Sparkles,
  AlignLeft,
  FileText,
  Type,
  CaseSensitive,
  ArrowLeftRight,
  Link2,
  Code,
  Globe,
  Braces,
  KeyRound,
  QrCode as QrIcon,
  Key,
  Shuffle,
  Palette,
  Minimize2,
  Scaling,
  Crop,
  Clock,
  Percent,
  Cake,
  CalendarRange,
  Receipt,
  Utensils,
  Landmark,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Layers,
  ChevronRight,
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  Bot,
  FileCode,
} from 'lucide-react';
import { ToolId, ToolCategory } from '../../types';
import { TOOLS_DATA, TOOL_CATEGORIES, getToolById } from '../../data/toolsData';

// Component Imports for all 25 tools
import ColorPaletteGenerator from '../tools/ColorPaletteGenerator';
import LoremIpsumGenerator from '../tools/LoremIpsumGenerator';
import PasswordGenerator from '../tools/PasswordGenerator';
import TextCleaner from '../tools/TextCleaner';
import WordCounter from '../tools/WordCounter';
import CharacterCounter from '../tools/CharacterCounter';
import CaseConverter from '../tools/CaseConverter';
import TextReverser from '../tools/TextReverser';
import SlugGenerator from '../tools/SlugGenerator';
import Base64Converter from '../tools/Base64Converter';
import UrlConverter from '../tools/UrlConverter';
import JsonFormatter from '../tools/JsonFormatter';
import UuidGenerator from '../tools/UuidGenerator';
import QrCodeGenerator from '../tools/QrCodeGenerator';
import RandomNumberGenerator from '../tools/RandomNumberGenerator';
import ImageCompressor from '../tools/ImageCompressor';
import ImageResizer from '../tools/ImageResizer';
import ImageCropper from '../tools/ImageCropper';
import TimestampConverter from '../tools/TimestampConverter';
import PercentageCalculator from '../tools/PercentageCalculator';
import AgeCalculator from '../tools/AgeCalculator';
import DateDifferenceCalculator from '../tools/DateDifferenceCalculator';
import GstTaxCalculator from '../tools/GstTaxCalculator';
import TipCalculator from '../tools/TipCalculator';
import LoanPaymentCalculator from '../tools/LoanPaymentCalculator';

interface ToolsPageProps {
  initialTool?: string | null;
  onSelectTool?: (toolId: ToolId) => void;
}

export default function ToolsPage({ initialTool, onSelectTool }: ToolsPageProps) {
  const [selectedToolId, setSelectedToolId] = useState<ToolId | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [toolFeedback, setToolFeedback] = useState<Record<string, 'yes' | 'no'>>({});
  const workspaceRef = useRef<HTMLDivElement>(null);

  // Sync initialTool prop if present
  useEffect(() => {
    if (initialTool) {
      const match = getToolById(initialTool);
      if (match) {
        setSelectedToolId(match.id);
      }
    }
  }, [initialTool]);

  const handleOpenTool = (id: ToolId) => {
    setSelectedToolId(id);
    if (onSelectTool) {
      onSelectTool(id);
    }
    // Update browser URL cleanly
    if (typeof window !== 'undefined') {
      const cleanUrl = `/tools/${id}.html`;
      window.history.pushState(null, '', cleanUrl);
    }
    if (workspaceRef.current) {
      workspaceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBackToDirectory = () => {
    setSelectedToolId(null);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/p/tools.html');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeTool = selectedToolId ? getToolById(selectedToolId) : null;

  // Filter tools for the directory
  const filteredTools = TOOLS_DATA.filter((tool) => {
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      tool.name.toLowerCase().includes(q) ||
      tool.summary.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.id.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  // Icon mapping
  const getToolIcon = (id: ToolId) => {
    switch (id) {
      case 'text-cleaner':
        return <Sparkles className="w-5 h-5 text-emerald-600" />;
      case 'lorem-ipsum':
        return <AlignLeft className="w-5 h-5 text-blue-600" />;
      case 'word-counter':
        return <FileText className="w-5 h-5 text-indigo-600" />;
      case 'character-counter':
        return <Type className="w-5 h-5 text-purple-600" />;
      case 'case-converter':
        return <CaseSensitive className="w-5 h-5 text-violet-600" />;
      case 'text-reverser':
        return <ArrowLeftRight className="w-5 h-5 text-amber-600" />;
      case 'slug-generator':
        return <Link2 className="w-5 h-5 text-teal-600" />;
      case 'base64-converter':
        return <Code className="w-5 h-5 text-cyan-600" />;
      case 'url-converter':
        return <Globe className="w-5 h-5 text-sky-600" />;
      case 'json-formatter':
        return <Braces className="w-5 h-5 text-emerald-600" />;
      case 'uuid-generator':
        return <KeyRound className="w-5 h-5 text-indigo-600" />;
      case 'qr-code-generator':
        return <QrIcon className="w-5 h-5 text-neutral-800" />;
      case 'password-generator':
        return <Key className="w-5 h-5 text-emerald-600" />;
      case 'random-number-generator':
        return <Shuffle className="w-5 h-5 text-rose-600" />;
      case 'color-palette':
        return <Palette className="w-5 h-5 text-blue-600" />;
      case 'image-compressor':
        return <Minimize2 className="w-5 h-5 text-emerald-600" />;
      case 'image-resizer':
        return <Scaling className="w-5 h-5 text-indigo-600" />;
      case 'image-cropper':
        return <Crop className="w-5 h-5 text-rose-600" />;
      case 'timestamp-converter':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'percentage-calculator':
        return <Percent className="w-5 h-5 text-blue-600" />;
      case 'age-calculator':
        return <Cake className="w-5 h-5 text-pink-600" />;
      case 'date-difference-calculator':
        return <CalendarRange className="w-5 h-5 text-indigo-600" />;
      case 'gst-tax-calculator':
        return <Receipt className="w-5 h-5 text-emerald-600" />;
      case 'tip-calculator':
        return <Utensils className="w-5 h-5 text-amber-600" />;
      case 'loan-payment-calculator':
        return <Landmark className="w-5 h-5 text-emerald-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-blue-600" />;
    }
  };

  // Render individual tool interactive component
  const renderToolComponent = (id: ToolId) => {
    switch (id) {
      case 'color-palette':
        return <ColorPaletteGenerator />;
      case 'lorem-ipsum':
        return <LoremIpsumGenerator />;
      case 'password-generator':
        return <PasswordGenerator />;
      case 'text-cleaner':
      case 'text-sorter':
      case 'find-replace':
      case 'remove-line-breaks':
      case 'duplicate-remover':
      case 'whitespace-remover':
      case 'invisible-character-remover':
      case 'punctuation-cleaner':
      case 'number-extractor':
      case 'quote-remover':
      case 'prefix-suffix-cleaner':
        return <TextCleaner />;
      case 'word-counter':
        return <WordCounter />;
      case 'character-counter':
      case 'line-counter':
        return <CharacterCounter />;
      case 'case-converter':
        return <CaseConverter />;
      case 'text-reverser':
        return <TextReverser />;
      case 'slug-generator':
        return <SlugGenerator />;
      case 'base64-converter':
        return <Base64Converter />;
      case 'url-converter':
        return <UrlConverter />;
      case 'json-formatter':
        return <JsonFormatter />;
      case 'uuid-generator':
        return <UuidGenerator />;
      case 'qr-code-generator':
        return <QrCodeGenerator />;
      case 'random-number-generator':
        return <RandomNumberGenerator />;
      case 'image-compressor':
        return <ImageCompressor />;
      case 'image-resizer':
        return <ImageResizer />;
      case 'image-cropper':
        return <ImageCropper />;
      case 'timestamp-converter':
        return <TimestampConverter />;
      case 'percentage-calculator':
        return <PercentageCalculator />;
      case 'age-calculator':
        return <AgeCalculator />;
      case 'date-difference-calculator':
        return <DateDifferenceCalculator />;
      case 'gst-tax-calculator':
        return <GstTaxCalculator />;
      case 'tip-calculator':
        return <TipCalculator />;
      case 'loan-payment-calculator':
        return <LoanPaymentCalculator />;
      default:
        return <TextCleaner />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50/70 pb-20">
      {/* Hero Section */}
      <section className="bg-white border-b border-neutral-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            25 Production-Ready Web Tools & Calculators
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight mb-4">
            Free Online Financial &amp; Everyday Web Tools
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Simple, fast browser-based tools for financial calculations, text formatting, image processing, and everyday digital productivity. Exactly 25 functional tools with no registration required.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mb-6">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools (e.g. image, calculator, slug, password)..."
              className="w-full pl-12 pr-4 py-3.5 text-sm sm:text-base border border-neutral-300 rounded-2xl bg-white shadow-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3.5 text-xs text-neutral-400 hover:text-neutral-700 font-medium"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeCategory === 'All'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
            >
              All Tools (25)
            </button>
            {TOOL_CATEGORIES.map((cat) => {
              const count = TOOLS_DATA.filter((t) => t.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                    activeCategory === cat
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10" ref={workspaceRef}>
        {/* Active Tool View */}
        {activeTool ? (
          <div className="space-y-10">
            {/* Top Back Bar & Breadcrumb */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 pb-3 border-b border-neutral-200">
              <button
                type="button"
                onClick={handleBackToDirectory}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white hover:bg-neutral-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs group"
                aria-label="Back to All 25 Tools"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <span>Back to All 25 Tools</span>
              </button>

              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-500 flex-wrap">
                <a href="/" className="hover:text-black">Home</a>
                <span>/</span>
                <button
                  type="button"
                  onClick={handleBackToDirectory}
                  className="hover:text-black font-medium cursor-pointer"
                >
                  Online Tools
                </button>
                <span>/</span>
                <span className="font-semibold text-black">{activeTool.name}</span>
              </nav>
            </div>

            {/* Tool Heading & Intro */}
            <header className="border-b border-neutral-200 pb-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                  {activeTool.category}
                </span>
                <span>•</span>
                <span>{activeTool.privacyNote}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
                {activeTool.h1}
              </h1>
              <p className="text-base text-neutral-600 max-w-3xl leading-relaxed">
                {activeTool.explanation}
              </p>
            </header>

            {/* Interactive Tool Workspace */}
            <div className="rounded-2xl">
              {renderToolComponent(activeTool.id)}
            </div>

            {/* How to Use Section */}
            <section className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                How to Use the {activeTool.name}
              </h2>
              <ol className="space-y-3">
                {activeTool.howToUse.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-neutral-700">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* Example Section */}
            <section className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-neutral-900 mb-3">
                Practical Example: {activeTool.example.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-xs">
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 font-mono">
                  <span className="font-bold text-neutral-500 uppercase block mb-1 font-sans">Input:</span>
                  <div className="text-neutral-800 whitespace-pre-wrap">{activeTool.example.input}</div>
                </div>
                <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 font-mono">
                  <span className="font-bold text-emerald-800 uppercase block mb-1 font-sans">Output:</span>
                  <div className="text-emerald-950 whitespace-pre-wrap">{activeTool.example.output}</div>
                </div>
              </div>
              {activeTool.example.explanation && (
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {activeTool.example.explanation}
                </p>
              )}
            </section>

            {/* Useful Tips */}
            <section className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 md:p-8">
              <h2 className="text-lg font-bold text-neutral-900 mb-3">
                Useful Tips &amp; Best Practices
              </h2>
              <ul className="space-y-2 text-sm text-neutral-700">
                {activeTool.usefulTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQs */}
            <section className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                Frequently Asked Questions ({activeTool.name})
              </h2>
              <div className="divide-y divide-neutral-200">
                {activeTool.faqs.map((faq, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0">
                    <h3 className="text-base font-bold text-neutral-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Interactive User Feedback & Calculation Accuracy */}
            <section className="bg-neutral-100 rounded-2xl border border-neutral-200 p-6 md:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    Was this tool fast, accurate, and easy to use?
                  </h3>
                  <p className="text-xs text-neutral-600">
                    Your direct feedback helps Shahid Ali and our engineering team maintain precision across all 25 client-side utilities.
                  </p>
                </div>
                {toolFeedback[activeTool.id] ? (
                  <div className="text-xs font-semibold text-emerald-900 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 flex items-center gap-1.5 shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Thank you for voting!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setToolFeedback(prev => ({ ...prev, [activeTool.id]: 'yes' }))}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-black text-white text-xs font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      Yes, accurate
                    </button>
                    <button
                      type="button"
                      onClick={() => setToolFeedback(prev => ({ ...prev, [activeTool.id]: 'no' }))}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-neutral-300 text-neutral-700 text-xs font-bold hover:bg-neutral-50 transition-colors cursor-pointer"
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                      Report an issue
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-500">
                <span className="flex items-center gap-1 font-medium text-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  100% Client-Side Privacy: Inputs are never sent to remote servers
                </span>
                <a
                  href="/p/editorial-policy.html"
                  className="text-neutral-900 font-semibold hover:underline"
                >
                  View Editorial &amp; Calculation Standards &rarr;
                </a>
              </div>
            </section>

            {/* Related Tools Internal Linking */}
            {activeTool.relatedToolIds.length > 0 && (
              <section className="pt-6">
                <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-neutral-700" />
                  Related Tools You May Need
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeTool.relatedToolIds.map((relId) => {
                    const rel = getToolById(relId);
                    if (!rel) return null;
                    return (
                      <div
                        key={rel.id}
                        onClick={() => handleOpenTool(rel.id)}
                        className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-emerald-500 hover:shadow-sm cursor-pointer transition flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            {getToolIcon(rel.id)}
                            <h3 className="text-sm font-bold text-neutral-900">{rel.name}</h3>
                          </div>
                          <p className="text-xs text-neutral-600 line-clamp-2 mb-3">
                            {rel.summary}
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                          Use Tool <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Back to top button */}
            <div className="text-center pt-8">
              <button
                type="button"
                onClick={handleBackToDirectory}
                className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-bold inline-flex items-center gap-2 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Browse All 25 Tools Directory
              </button>
            </div>
          </div>
        ) : (
          /* Directory Grid View */
          <div>
            {/* Robots.txt and Sitemap search intent banner */}
            {(searchQuery.toLowerCase().includes('robot') || searchQuery.toLowerCase().includes('sitemap') || searchQuery.toLowerCase().includes('crawler')) && (
              <div className="p-6 rounded-2xl bg-neutral-900 text-white border border-neutral-800 shadow-md space-y-4 mb-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">Robots.txt &amp; Crawler Directives</h3>
                      <p className="text-xs text-neutral-400">Search Engine Crawler Rules &amp; Indexing Configuration</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live &bull; HTTP 200 OK
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  You searched for <strong>{searchQuery}</strong>. Money Master Blog serves production-standard crawler directives directly at <code className="text-emerald-300 font-mono">/robots.txt</code> and <code className="text-emerald-300 font-mono">/robot.txt</code>. All search engine crawlers (Googlebot, Bingbot) are explicitly permitted to index all pages and calculators.
                </p>

                <div className="p-4 bg-neutral-950 rounded-xl font-mono text-xs text-neutral-200 border border-neutral-800 space-y-1 overflow-x-auto">
                  <div className="text-neutral-500"># Crawl-Rule: Permit all standard search crawlers</div>
                  <div className="text-emerald-300">User-agent: *</div>
                  <div className="text-emerald-300">Allow: /</div>
                  <div className="text-neutral-500 pt-1"># Canonical XML Sitemap Location</div>
                  <div className="text-sky-300">Sitemap: https://www.moneymasterblog.site/sitemap.xml</div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href="/robots.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    <span>View /robots.txt Directly &rarr;</span>
                  </a>
                  <a
                    href="/robot.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition-colors cursor-pointer"
                  >
                    <span>View /robot.txt (Alias) &rarr;</span>
                  </a>
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition-colors cursor-pointer"
                  >
                    <span>Open XML Sitemap &rarr;</span>
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-extrabold text-neutral-900 flex items-center gap-2">
                <span>{activeCategory === 'All' ? 'All Free Tools' : activeCategory}</span>
                <span className="text-xs font-normal text-neutral-500 bg-neutral-200/70 px-2 py-0.5 rounded-full">
                  {filteredTools.length} tools
                </span>
              </h2>
            </div>

            {filteredTools.length === 0 ? (
              <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
                <Search className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-neutral-800 mb-1">No tools match your query</h3>
                <p className="text-xs text-neutral-500 mb-4">
                  Try searching for keywords like "image", "calculator", "text", or "password".
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-semibold"
                >
                  Reset Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <article
                    key={tool.id}
                    className="bg-white rounded-2xl border border-neutral-200/90 hover:border-emerald-500/80 p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                          {getToolIcon(tool.id)}
                        </div>
                        <span className="text-[11px] font-semibold text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full">
                          {tool.category}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-neutral-900 mb-2 group-hover:text-emerald-700 transition">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed mb-6">
                        {tool.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                      <span className="text-[11px] text-neutral-400 font-medium">
                        100% Client-Side
                      </span>
                      <a
                        href={`/tools/${tool.id}.html`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleOpenTool(tool.id);
                        }}
                        className="px-4 py-2 bg-neutral-900 group-hover:bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-xs"
                      >
                        Use Tool
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Privacy & Quality Guarantee Banner */}
            <div className="mt-16 bg-white rounded-2xl border border-neutral-200 p-8 text-neutral-800">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 mb-1">
                    Client-Side Execution &amp; Browser Privacy Guarantee
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    All 25 tools on Money Master Blog execute entirely within your browser memory using HTML5 Canvas, the Web Cryptography API, and local string processors. Your documents, photos, calculations, and passwords are never transmitted to any external server or saved in third-party databases.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
