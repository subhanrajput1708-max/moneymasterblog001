import React, { useState } from 'react';
import {
  ArrowRight,
  Palette,
  FileText,
  AlignLeft,
  CheckCircle2,
  Sparkles,
  Zap,
  Globe2,
  Smartphone,
  BookOpen,
  ChevronRight,
  UserCheck,
  Layers,
  Scissors,
  Check,
  MousePointerClick,
  Sliders,
  RefreshCw,
  Eye,
  Copy,
  GraduationCap,
  PenTool,
  Code,
  Layout,
  Video,
  Monitor,
  User,
  Clock,
  Calendar
} from 'lucide-react';
import { PageId, ToolId } from '../../types';
import ColorPaletteGenerator from '../tools/ColorPaletteGenerator';
import WordCounterCaseConverter from '../tools/WordCounterCaseConverter';
import LoremIpsumGenerator from '../tools/LoremIpsumGenerator';
import FaqSection, { FaqItem } from '../common/FaqSection';
import { getRecentArticles } from '../../data/blogArticles';
import { CATEGORY_STYLES } from './BlogPage';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectTool: (tool: ToolId) => void;
  onSelectArticle?: (slug: string) => void;
}

export default function HomePage({ onNavigate, onSelectTool, onSelectArticle }: HomePageProps) {
  const [activeInteractiveTool, setActiveInteractiveTool] = useState<ToolId>('color-palette');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenTool = (tool: ToolId) => {
    setActiveInteractiveTool(tool);
    scrollToSection('interactive-workspace');
  };

  const homeFaqs: FaqItem[] = [
    {
      question: 'What is Money Master Blog?',
      answer:
        'Money Master Blog is an online utility website created to give visitors quick, reliable access to browser-based digital tools. It offers practical tools for generating color schemes, creating placeholder text for mockups, and cleaning or reformatting text drafts without requiring account registrations, paid subscriptions, or desktop software installations.',
    },
    {
      question: 'What tools are available on the website?',
      answer:
        'Money Master Blog features 15 practical browser utilities:\n1. Color Palette Generator: Create harmonic color schemes, view HEX codes, and copy palette values.\n2. Lorem Ipsum Generator: Generate custom placeholder text for mockups.\n3. Text Cleaner & Case Converter: Strip extra spaces, check character metrics, and transform letter casing.\n4. Random Password Generator: Generate cryptographically strong random credentials.\n5. Text Sorter: Sort lists alphabetically (A–Z, Z–A) or by line length.\n6. Find & Replace Text: Search and replace terms across multi-paragraph text.\n7. Remove Line Breaks: Convert broken PDF or email lines into continuous paragraphs.\n8. Duplicate Line Remover: Clean repeated lines from lists while retaining unique items.\n9. Whitespace Remover: Normalize spaces, tabs, and blank lines.\n10. Text Line Counter: Inspect live lines, words, characters, and longest/shortest lines.\n11. Invisible Character Remover: Detect and strip zero-width spaces, BOMs, and hidden formatting characters.\n12. Text Punctuation Cleaner: Collapse repeated punctuation marks and fix erratic spacing.\n13. Text Number Extractor: Extract integers, decimals, prices, and percentages from text.\n14. Text Quote Remover: Strip quote marks or delete quoted dialogue across straight and curly styles.\n15. Text Prefix & Suffix Cleaner: Add, remove, or modify prefixes and suffixes across every line.',
    },
    {
      question: 'Who can use the tools on Money Master Blog?',
      answer:
        'Our tools are built for anyone who works with digital content on a regular basis. This includes students writing essays, bloggers drafting articles, graphic designers assembling color palettes, web developers wireframing layouts, content creators organizing text, website owners updating copy, and everyday internet users looking to reformat notes or clean copied clipboard text.',
    },
    {
      question: 'Do I need to install software or browser extensions?',
      answer:
        'No. Every tool on Money Master Blog runs directly inside your web browser using client-side JavaScript. There is no software to download, no desktop package to install, and no browser extension required. You simply visit the website and use the tools immediately.',
    },
    {
      question: 'Can I use the tools on a phone?',
      answer:
        'Yes. Money Master Blog is completely mobile-responsive. All buttons, text fields, color swatches, and copy controls have been styled with comfortable touch targets (at least 44px) so you can generate colors, clean text, or copy placeholder passages effortlessly on an Android phone, iPhone, or any mobile browser.',
    },
    {
      question: 'Can I use the tools on a tablet?',
      answer:
        'Yes. Tablets (such as iPads, Android tablets, and Microsoft Surface devices) have full access to all tools. The layout automatically adapts to mid-sized viewports, offering spacious controls whether you are using a stylus, your fingers, or a connected keyboard.',
    },
    {
      question: 'Are the tools suitable for beginners?',
      answer:
        'Yes. The tools are intentionally designed to be straightforward and self-explanatory. You do not need technical knowledge or coding skills to use them. Controls are labeled in plain English with clear action buttons such as "Copy Text", "Generate", "Lock Color", and "Remove Extra Spaces".',
    },
    {
      question: 'What kind of topics and guides are covered in the Blog section?',
      answer:
        'The Blog section contains 20 comprehensive, practical guides written by Shahid Ali. Topics include solving PDF line-break formatting errors, removing invisible zero-width Unicode characters, sorting messy name lists, preparing clean CSV data for spreadsheets, fixing curly quotation marks in code terminals, and applying client-side privacy best practices.',
    },
    {
      question: 'Do the blog guides require registration or a paid subscription?',
      answer:
        'No. Every article and workflow tutorial on Money Master Blog is completely open-access and free of charge. There are no paywalls, no forced email registrations, and no tracking cookies. You can freely read all guides and use the recommended formulas or tools immediately.',
    },
    {
      question: 'How can I contact Money Master Blog?',
      answer:
        'You can reach website author Shahid Ali directly through our Contact Us page. We provide an accessible submission form for tool recommendations, bug reports, and general feedback, or you can write directly to contact@moneymasterblog.com. Shahid reviews inquiries personally.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section id="hero-section" className="pt-6 sm:pt-12 pb-8 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold mb-6 border border-neutral-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Money Master Blog • Practical Browser Utilities</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight leading-tight sm:leading-none">
            Simple Online Tools for Everyday Digital Tasks
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Money Master Blog brings together practical browser-based utilities designed to make common digital tasks easier. Whether you need to create a color palette, generate placeholder text, or clean copied text, these tools are designed to be simple, fast, and easy to use.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              id="hero-btn-explore"
              onClick={() => scrollToSection('tools-section')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-neutral-900 text-white text-base font-semibold hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer min-h-[48px]"
            >
              <span>Explore Tools</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-btn-about"
              onClick={() => onNavigate('about')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white text-neutral-800 text-base font-semibold border border-neutral-300 hover:bg-neutral-50 transition-colors cursor-pointer min-h-[48px]"
            >
              <span>About Us</span>
            </button>
          </div>

          {/* Value Badges */}
          <div className="mt-12 pt-8 border-t border-neutral-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-neutral-900">Instant Execution</div>
                <div className="text-[11px] text-neutral-500">Runs directly in browser</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Globe2 className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-neutral-900">Zero Installation</div>
                <div className="text-[11px] text-neutral-500">No software required</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Smartphone className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-neutral-900">Mobile Responsive</div>
                <div className="text-[11px] text-neutral-500">Phones, tablets & PCs</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <UserCheck className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-neutral-900">Curated by Shahid Ali</div>
                <div className="text-[11px] text-neutral-500">7 years practical exp.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT MONEY MASTER BLOG */}
      <section id="about-money-master-blog" className="scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Website Purpose
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1">
              About Money Master Blog
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Why this website was created and our commitment to lightweight, practical digital utilities.
            </p>
          </div>

          <div className="space-y-4 text-neutral-700 text-sm sm:text-base leading-relaxed">
            <p>
              Money Master Blog was created to solve a common digital frustration: performing minor everyday tasks without dealing with slow, ad-heavy websites or complex desktop programs. In modern digital workflows, small tasks—like testing a five-color palette, generating clean Latin placeholder paragraphs for a layout mockup, or stripping awkward line breaks from copied text—are performed repeatedly every single day.
            </p>
            <p>
              Unfortunately, many tool websites have become overloaded with intrusive popups, forced email registrations, slow tracking scripts, and misleading download buttons. Money Master Blog takes the opposite approach. Our goal is to provide practical browser-based utilities that are simple to understand, lightning fast to use, and completely respectful of your privacy.
            </p>
            <p>
              Because every tool runs directly inside your device's web browser, your text drafts and generated values stay on your own machine. There is nothing to install, no account to create, and no waiting.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white border border-neutral-200">
              <div className="text-xs font-bold text-neutral-900 uppercase tracking-wide">Clarity First</div>
              <p className="text-xs text-neutral-600 mt-1">
                Interfaces are clean and stripped of confusing technical jargon or unnecessary settings.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-neutral-200">
              <div className="text-xs font-bold text-neutral-900 uppercase tracking-wide">Device Privacy</div>
              <p className="text-xs text-neutral-600 mt-1">
                Client-side algorithms process text and color data in your local browser memory.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-neutral-200">
              <div className="text-xs font-bold text-neutral-900 uppercase tracking-wide">Everyday Utility</div>
              <p className="text-xs text-neutral-600 mt-1">
                Focused specifically on high-frequency, practical tasks that save you time daily.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR TOOLS */}
      <section id="tools-section" className="scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Online Utility Suite
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1">
                Our Online Tools
              </h2>
              <p className="text-sm text-neutral-600 mt-1">
                Three focused browser utilities designed for everyday productivity.
              </p>
            </div>

            <button
              onClick={() => onNavigate('tools')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 hover:text-neutral-700 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>View Full Tools Page</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Three Large Tool Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* TOOL 1: Color Palette Generator */}
            <div
              className={`p-6 rounded-xl border transition-all flex flex-col justify-between ${
                activeInteractiveTool === 'color-palette'
                  ? 'border-neutral-900 bg-neutral-50 ring-2 ring-neutral-900/10 shadow-sm'
                  : 'border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-neutral-900 text-white flex items-center justify-center mb-4">
                  <Palette className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-500 uppercase">Design Utility</span>
                  {activeInteractiveTool === 'color-palette' && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-neutral-900 text-white">
                      Active Below
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mt-1">Color Palette Generator</h3>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  Generate harmonic color palettes, explore warm, cool, pastel, and vibrant combinations, and copy clean HEX values instantly.
                </p>

                <div className="mt-4 pt-3 border-t border-neutral-100 space-y-3">
                  <div>
                    <span className="text-[11px] font-bold text-neutral-700 uppercase tracking-wide">Main Uses:</span>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Selecting brand tones, styling UI wireframes, picking presentation slide themes, and testing high-contrast accents.
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-neutral-700 uppercase tracking-wide">Key Features:</span>
                    <ul className="mt-1.5 space-y-1 text-xs text-neutral-600">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Instant random palette generation</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Lock selected colors while exploring others</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Single-click HEX code copying</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Export ready-to-use CSS variables</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200/80">
                <button
                  id="btn-open-color-palette"
                  onClick={() => handleOpenTool('color-palette')}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer min-h-[42px]"
                >
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* TOOL 2: Lorem Ipsum Generator */}
            <div
              className={`p-6 rounded-xl border transition-all flex flex-col justify-between ${
                activeInteractiveTool === 'lorem-ipsum'
                  ? 'border-neutral-900 bg-neutral-50 ring-2 ring-neutral-900/10 shadow-sm'
                  : 'border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-neutral-900 text-white flex items-center justify-center mb-4">
                  <AlignLeft className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-500 uppercase">Layout Utility</span>
                  {activeInteractiveTool === 'lorem-ipsum' && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-neutral-900 text-white">
                      Active Below
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mt-1">Lorem Ipsum Generator</h3>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  Generate clean placeholder text in paragraphs, sentences, or word counts to test typographic layout and spacing.
                </p>

                <div className="mt-4 pt-3 border-t border-neutral-100 space-y-3">
                  <div>
                    <span className="text-[11px] font-bold text-neutral-700 uppercase tracking-wide">Main Uses:</span>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Filling website prototypes, evaluating font sizes, testing responsive card wraps, and preparing design mockups.
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-neutral-700 uppercase tracking-wide">Key Features:</span>
                    <ul className="mt-1.5 space-y-1 text-xs text-neutral-600">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Paragraphs, sentences, or words selector</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Custom length slider / count control</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Optional standard "Lorem ipsum" starter</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Clean unformatted text copying</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200/80">
                <button
                  id="btn-open-placeholder-tool"
                  onClick={() => handleOpenTool('lorem-ipsum')}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer min-h-[42px]"
                >
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* TOOL 3: Text Cleaner */}
            <div
              className={`p-6 rounded-xl border transition-all flex flex-col justify-between ${
                activeInteractiveTool === 'word-counter'
                  ? 'border-neutral-900 bg-neutral-50 ring-2 ring-neutral-900/10 shadow-sm'
                  : 'border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-neutral-900 text-white flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-500 uppercase">Text Utility</span>
                  {activeInteractiveTool === 'word-counter' && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-neutral-900 text-white">
                      Active Below
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mt-1">Text Cleaner & Case Converter</h3>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  Clean copied text, strip unwanted double spaces, eliminate blank lines, check live stats, and transform letter casing.
                </p>

                <div className="mt-4 pt-3 border-t border-neutral-100 space-y-3">
                  <div>
                    <span className="text-[11px] font-bold text-neutral-700 uppercase tracking-wide">Main Uses:</span>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Cleaning messy copied PDF/email text, reformatting headings, counting words for assignments, and sanitizing notes.
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-neutral-700 uppercase tracking-wide">Key Features:</span>
                    <ul className="mt-1.5 space-y-1 text-xs text-neutral-600">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Remove unnecessary spaces & blank lines</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Live word, character & sentence metrics</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Instant UPPER, lower & Title Case</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Zero server logging; 100% private</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200/80">
                <button
                  id="btn-open-text-cleaner"
                  onClick={() => handleOpenTool('word-counter')}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer min-h-[42px]"
                >
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Tool Interactive Area */}
          <div id="interactive-workspace" className="mt-12 scroll-mt-20">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 pb-3">
              <div>
                <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  Live Interactive Tool Workspace
                </span>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Execute tasks in real time without navigating away from the homepage.
                </p>
              </div>

              {/* Tool Quick Toggle */}
              <div className="flex flex-wrap gap-1.5 text-xs">
                <button
                  onClick={() => setActiveInteractiveTool('color-palette')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    activeInteractiveTool === 'color-palette'
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  Color Palette
                </button>
                <button
                  onClick={() => setActiveInteractiveTool('lorem-ipsum')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    activeInteractiveTool === 'lorem-ipsum'
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  Lorem Ipsum
                </button>
                <button
                  onClick={() => setActiveInteractiveTool('word-counter')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    activeInteractiveTool === 'word-counter'
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  Text Cleaner
                </button>
              </div>
            </div>

            {activeInteractiveTool === 'color-palette' && <ColorPaletteGenerator />}
            {activeInteractiveTool === 'lorem-ipsum' && <LoremIpsumGenerator />}
            {activeInteractiveTool === 'word-counter' && <WordCounterCaseConverter />}
          </div>

          {/* Quick Access to All 15 Tools */}
          <div className="mt-12 p-6 bg-neutral-900 text-white rounded-2xl shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4 mb-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
                  Expanded 15-Tool Suite
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  Explore All 15 Browser Tools
                </h3>
              </div>
              <button
                onClick={() => onNavigate('tools')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 bg-white text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <span>View Complete Tools Directory</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {[
                { id: 'color-palette' as ToolId, label: 'Color Palette' },
                { id: 'lorem-ipsum' as ToolId, label: 'Lorem Ipsum' },
                { id: 'word-counter' as ToolId, label: 'Text Cleaner' },
                { id: 'password-generator' as ToolId, label: 'Password Gen' },
                { id: 'text-sorter' as ToolId, label: 'Text Sorter' },
                { id: 'find-replace' as ToolId, label: 'Find & Replace' },
                { id: 'remove-line-breaks' as ToolId, label: 'Remove Line Breaks' },
                { id: 'duplicate-remover' as ToolId, label: 'Duplicate Remover' },
                { id: 'whitespace-remover' as ToolId, label: 'Whitespace Remover' },
                { id: 'line-counter' as ToolId, label: 'Line Counter' },
                { id: 'invisible-character-remover' as ToolId, label: 'Invisible Chars' },
                { id: 'punctuation-cleaner' as ToolId, label: 'Punctuation Clean' },
                { id: 'number-extractor' as ToolId, label: 'Number Extractor' },
                { id: 'quote-remover' as ToolId, label: 'Quote Remover' },
                { id: 'prefix-suffix-cleaner' as ToolId, label: 'Prefix & Suffix' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectTool(item.id)}
                  className="px-3 py-2 bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 hover:text-white rounded-lg text-xs font-medium text-left transition-colors flex items-center justify-between cursor-pointer border border-neutral-700/50"
                >
                  <span className="truncate">{item.label}</span>
                  <ArrowRight className="w-3 h-3 text-neutral-400 shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHO CAN USE THESE TOOLS? */}
      <section id="who-can-use" className="scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Audience & Practical Uses
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1">
              Who Can Use These Tools?
            </h2>
            <p className="mt-2 text-sm text-neutral-600 max-w-2xl mx-auto">
              Realistic, everyday applications for various professions, academic pursuits, and personal projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Students */}
            <div className="p-5 rounded-xl border border-neutral-200 bg-white shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">Students</h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    Check essay word counts before submitting assignments, clean awkward line breaks when gathering research citations, and format bibliography titles with Title Case in seconds.
                  </p>
                </div>
              </div>
            </div>

            {/* Bloggers */}
            <div className="p-5 rounded-xl border border-neutral-200 bg-white shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 shrink-0">
                  <PenTool className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">Bloggers</h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    Format post headlines cleanly, sanitize draft copy pasted from external word processors, and quickly calculate approximate reading times for readers.
                  </p>
                </div>
              </div>
            </div>

            {/* Designers */}
            <div className="p-5 rounded-xl border border-neutral-200 bg-white shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 shrink-0">
                  <Layout className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">Designers</h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    Generate fresh color combinations, lock base branding colors to find complementary accents, and copy clean HEX codes directly into design artboards.
                  </p>
                </div>
              </div>
            </div>

            {/* Developers */}
            <div className="p-5 rounded-xl border border-neutral-200 bg-white shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 shrink-0">
                  <Code className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">Developers</h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    Grab dummy text blocks for frontend component testing, copy CSS color variables straight into style sheets, and format constant names or slugs easily.
                  </p>
                </div>
              </div>
            </div>

            {/* Content Creators */}
            <div className="p-5 rounded-xl border border-neutral-200 bg-white shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 shrink-0">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">Content Creators</h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    Format social media descriptions, sanitize multi-platform caption drafts, and test thumbnail color palettes before rendering video graphics.
                  </p>
                </div>
              </div>
            </div>

            {/* Website Owners */}
            <div className="p-5 rounded-xl border border-neutral-200 bg-white shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 shrink-0">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">Website Owners</h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    Draft website copy, populate draft page layouts with placeholder paragraphs while awaiting final copy, and ensure clean typography across site updates.
                  </p>
                </div>
              </div>
            </div>

            {/* Everyday Users */}
            <div className="p-5 rounded-xl border border-neutral-200 bg-white shadow-2xs md:col-span-2">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">Everyday Users</h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    Anyone who needs to strip strange line breaks from an email draft, check the character limit for an online form, or quickly pick pleasant colors for a family invitation card or personal project.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW MONEY MASTER BLOG WORKS */}
      <section id="how-it-works" className="scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Step-by-Step Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1">
              How Money Master Blog Works
            </h2>
            <p className="mt-2 text-sm text-neutral-600 max-w-xl mx-auto">
              A clear, 5-step process from opening a tool to using your output.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-xl bg-white border border-neutral-200 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white font-bold text-xs flex items-center justify-center mb-3">
                  1
                </div>
                <h3 className="text-sm font-bold text-neutral-900">Choose a Tool</h3>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Select the tool you need from our homepage or top navigation.
                </p>
              </div>
              <div className="text-[11px] text-neutral-400 mt-3 pt-2 border-t border-neutral-100">
                Zero sign-up required
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-neutral-200 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white font-bold text-xs flex items-center justify-center mb-3">
                  2
                </div>
                <h3 className="text-sm font-bold text-neutral-900">Enter or Configure</h3>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Type or paste your text, adjust sliders, or pick color mode options.
                </p>
              </div>
              <div className="text-[11px] text-neutral-400 mt-3 pt-2 border-t border-neutral-100">
                Intuitive controls
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-neutral-200 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white font-bold text-xs flex items-center justify-center mb-3">
                  3
                </div>
                <h3 className="text-sm font-bold text-neutral-900">Generate or Clean</h3>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Click a formatting action or generate button to run the algorithm.
                </p>
              </div>
              <div className="text-[11px] text-neutral-400 mt-3 pt-2 border-t border-neutral-100">
                Instant browser calculation
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-neutral-200 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white font-bold text-xs flex items-center justify-center mb-3">
                  4
                </div>
                <h3 className="text-sm font-bold text-neutral-900">Review Result</h3>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Inspect the live preview, word statistics, or color contrast values.
                </p>
              </div>
              <div className="text-[11px] text-neutral-400 mt-3 pt-2 border-t border-neutral-100">
                Real-time visual feedback
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-neutral-200 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white font-bold text-xs flex items-center justify-center mb-3">
                  5
                </div>
                <h3 className="text-sm font-bold text-neutral-900">Copy and Use It</h3>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Click copy to transfer formatted text, HEX values, or dummy copy to your clipboard.
                </p>
              </div>
              <div className="text-[11px] text-neutral-400 mt-3 pt-2 border-t border-neutral-100">
                Ready for any application
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY SIMPLE TOOLS MATTER */}
      <section id="why-simple-tools-matter" className="scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Productivity Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Why Simple Tools Matter
            </h2>
            <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
              <p>
                In an era where digital tools increasingly demand complex multi-step onboarding, cloud synchronization, monthly recurring charges, and heavyweight software installations, small tasks often become unnecessarily tedious. Launching a complex graphics editor just to grab five matching hex codes takes time and system memory.
              </p>
              <p>
                Simple, single-purpose browser tools cut through that friction. When you have an application that loads immediately, does not track your personal identity, and accomplishes its task in three seconds, you maintain mental momentum. You can clean an article excerpt, copy placeholder text for a layout test, or verify a color scheme and jump right back into your creative work.
              </p>
              <p>
                By keeping tools lightweight, uncluttered, and strictly browser-based, Money Master Blog aims to provide a dependable everyday resource for anyone who values speed, simplicity, and straightforward execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST PRACTICAL GUIDES (BLOG) */}
      <section id="latest-guides-section" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5 text-neutral-700" />
              <span>Practical Digital Guides</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Latest Productivity & Workflow Articles
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-1 max-w-2xl">
              Step-by-step guides for cleaning text, preparing spreadsheets, removing hidden characters, and improving your everyday digital workflow.
            </p>
          </div>

          <button
            onClick={() => onNavigate('blog')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-900 hover:bg-neutral-100 text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {getRecentArticles(4).map((article) => {
            const catStyle = CATEGORY_STYLES[article.category];
            return (
              <article
                key={article.id}
                className="bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
                    >
                      <span className={`w-1 h-1 rounded-full ${catStyle.dot}`}></span>
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-neutral-500">
                      <Clock className="w-3 h-3" />
                      <span>{article.readingTime}</span>
                    </div>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug group-hover:text-neutral-700 transition-colors line-clamp-2">
                    <button
                      onClick={() => {
                        if (onSelectArticle) {
                          onSelectArticle(article.slug);
                        } else {
                          onNavigate('blog');
                        }
                      }}
                      className="text-left cursor-pointer hover:underline"
                    >
                      {article.title}
                    </button>
                  </h3>

                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="px-5 py-3 bg-neutral-50/75 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-[11px] text-neutral-500">
                    <Calendar className="w-3 h-3" />
                    <span>{article.publishedDate}</span>
                  </div>

                  <button
                    onClick={() => {
                      if (onSelectArticle) {
                        onSelectArticle(article.slug);
                      } else {
                        onNavigate('blog');
                      }
                    }}
                    className="inline-flex items-center gap-1 font-bold text-neutral-900 hover:text-emerald-700 transition-colors cursor-pointer group-hover:translate-x-0.5 transform duration-150 text-xs"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Blog Category Highlights & Open-Access Guarantee */}
        <div className="mt-8 p-6 rounded-2xl bg-neutral-50 border border-neutral-200">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <h3 className="text-sm sm:text-base font-bold text-neutral-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>20 In-Depth Practical Guides by Shahid Ali</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Covering text cleanup algorithms, spreadsheet sanitization, formatting error prevention, and browser privacy. Every guide includes copyable formulas, real examples, and integrated links to our 15 online tools.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => onNavigate('blog')}
                className="px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-800 text-xs font-medium hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                Text Formatting
              </button>
              <button
                onClick={() => onNavigate('blog')}
                className="px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-800 text-xs font-medium hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                Data Prep & Spreadsheets
              </button>
              <button
                onClick={() => onNavigate('blog')}
                className="px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-800 text-xs font-medium hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                Design & Typography
              </button>
              <button
                onClick={() => onNavigate('blog')}
                className="px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-800 text-xs font-medium hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                Security & Privacy
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-500">
            <div className="flex items-center gap-2 text-neutral-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Free to read, no account registration, and zero reading tracking.</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('privacy')}
                className="text-neutral-600 hover:text-neutral-900 underline cursor-pointer text-xs"
              >
                Blog Privacy Details
              </button>
              <button
                onClick={() => onNavigate('terms')}
                className="text-neutral-600 hover:text-neutral-900 underline cursor-pointer text-xs"
              >
                Usage Rights & Terms
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ABOUT THE AUTHOR */}
      <section id="about-author-section" className="bg-neutral-100 rounded-2xl p-6 sm:p-10 max-w-5xl mx-auto border border-neutral-200">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0 font-bold text-2xl shadow-xs">
            SA
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-700 uppercase tracking-wider">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>Website Creator & Content Author</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
              About Shahid Ali
            </h3>
            <p className="text-sm text-neutral-700 leading-relaxed max-w-3xl">
              Shahid Ali has <strong>7 years of practical experience</strong> working with online tools, digital content workflows, web utilities, and everyday digital tasks. Through years of managing content drafts, testing color combinations, preparing web layouts, and streamlining digital workflows, Shahid built Money Master Blog as an honest, ad-light utility resource focused purely on helpfulness, usability, and speed.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 hover:underline cursor-pointer"
              >
                <span>Read Shahid's full background & site mission</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. HOME FAQ SECTION (8 DETAILED FAQS) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <FaqSection
          id="home-faq"
          title="Frequently Asked Questions About Money Master Blog"
          subtitle="Clear, practical answers about our website, our browser-based utilities, and how to use them."
          items={homeFaqs}
        />
      </div>
    </div>
  );
}
