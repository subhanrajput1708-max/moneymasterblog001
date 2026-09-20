import React, { useState, useEffect, useRef } from 'react';
import {
  Palette,
  FileText,
  KeyRound,
  AlignLeft,
  ArrowUpDown,
  Search,
  WrapText,
  Layers,
  Space,
  Hash,
  EyeOff,
  Type,
  Binary,
  Quote,
  AlignJustify,
  BookOpen,
  Lightbulb,
  Shield,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ToolId } from '../../types';
import ColorPaletteGenerator from '../tools/ColorPaletteGenerator';
import WordCounterCaseConverter from '../tools/WordCounterCaseConverter';
import PasswordGenerator from '../tools/PasswordGenerator';
import LoremIpsumGenerator from '../tools/LoremIpsumGenerator';
import TextSorter from '../tools/TextSorter';
import FindReplaceText from '../tools/FindReplaceText';
import RemoveLineBreaks from '../tools/RemoveLineBreaks';
import DuplicateLineRemover from '../tools/DuplicateLineRemover';
import WhitespaceRemover from '../tools/WhitespaceRemover';
import TextLineCounter from '../tools/TextLineCounter';
import InvisibleCharacterRemover from '../tools/InvisibleCharacterRemover';
import TextPunctuationCleaner from '../tools/TextPunctuationCleaner';
import TextNumberExtractor from '../tools/TextNumberExtractor';
import TextQuoteRemover from '../tools/TextQuoteRemover';
import TextPrefixSuffixCleaner from '../tools/TextPrefixSuffixCleaner';
import FaqSection, { FaqItem } from '../common/FaqSection';

interface ToolsPageProps {
  initialTool?: ToolId;
}

interface ToolDefinition {
  id: ToolId;
  name: string;
  category: 'Colors' | 'Text' | 'Security';
  icon: React.ComponentType<{ className?: string }>;
  summary: string;
  badge?: string;
}

export default function ToolsPage({ initialTool = 'color-palette' }: ToolsPageProps) {
  const [selectedTool, setSelectedTool] = useState<ToolId>(initialTool);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'All' | 'Text' | 'Colors' | 'Security'>('All');
  const workspaceRef = useRef<HTMLDivElement>(null);

  // Sync initialTool prop if it changes
  useEffect(() => {
    if (initialTool) {
      setSelectedTool(initialTool);
    }
  }, [initialTool]);

  const toolsList: ToolDefinition[] = [
    {
      id: 'color-palette',
      name: 'Color Palette Generator',
      category: 'Colors',
      icon: Palette,
      summary: 'Generate harmonic color palettes, view HEX values, lock chosen tones, and copy CSS color values.',
    },
    {
      id: 'lorem-ipsum',
      name: 'Lorem Ipsum Generator',
      category: 'Text',
      icon: AlignLeft,
      summary: 'Create custom placeholder text by paragraph, sentence, or word count for layouts and mockups.',
    },
    {
      id: 'word-counter',
      name: 'Text Cleaner & Case Converter',
      category: 'Text',
      icon: FileText,
      summary: 'Clean text, remove extra spaces, inspect real-time character metrics, and convert letter casing.',
    },
    {
      id: 'password-generator',
      name: 'Random Password Generator',
      category: 'Security',
      icon: KeyRound,
      summary: 'Generate cryptographically strong random passwords client-side with custom character filters.',
    },
    {
      id: 'text-sorter',
      name: 'Text Sorter',
      category: 'Text',
      icon: ArrowUpDown,
      summary: 'Sort lines of text quickly using different sorting methods directly in the browser.',
      badge: 'New',
    },
    {
      id: 'find-replace',
      name: 'Find & Replace Text',
      category: 'Text',
      icon: Search,
      summary: 'Find specific words or phrases in text and replace them quickly without manually editing every occurrence.',
      badge: 'New',
    },
    {
      id: 'remove-line-breaks',
      name: 'Remove Line Breaks',
      category: 'Text',
      icon: WrapText,
      summary: 'Convert text containing unnecessary line breaks into cleaner continuous text.',
      badge: 'New',
    },
    {
      id: 'duplicate-remover',
      name: 'Duplicate Line Remover',
      category: 'Text',
      icon: Layers,
      summary: 'Find and remove repeated lines from lists and text while keeping the unique lines.',
      badge: 'New',
    },
    {
      id: 'whitespace-remover',
      name: 'Whitespace Remover',
      category: 'Text',
      icon: Space,
      summary: 'Clean unnecessary spaces, tabs, and extra whitespace from text.',
      badge: 'New',
    },
    {
      id: 'line-counter',
      name: 'Text Line Counter',
      category: 'Text',
      icon: Hash,
      summary: 'Count lines in a text input and provide useful basic text statistics.',
      badge: 'New',
    },
    {
      id: 'invisible-character-remover',
      name: 'Invisible Character Remover',
      category: 'Text',
      icon: EyeOff,
      summary: 'Detect and remove hidden Unicode characters, zero-width spaces, byte order marks, and formatting artifacts.',
      badge: 'New',
    },
    {
      id: 'punctuation-cleaner',
      name: 'Text Punctuation Cleaner',
      category: 'Text',
      icon: Type,
      summary: 'Clean, normalize, or remove erratic and repeated punctuation marks while preserving numbers and contractions.',
      badge: 'New',
    },
    {
      id: 'number-extractor',
      name: 'Text Number Extractor',
      category: 'Text',
      icon: Binary,
      summary: 'Extract integers, decimals, prices, percentages, or formatted numbers quickly from paragraphs or logs.',
      badge: 'New',
    },
    {
      id: 'quote-remover',
      name: 'Text Quote Remover',
      category: 'Text',
      icon: Quote,
      summary: 'Identify and strip quotation marks, remove quoted dialogue sections, or extract quoted content across all styles.',
      badge: 'New',
    },
    {
      id: 'prefix-suffix-cleaner',
      name: 'Text Prefix & Suffix Cleaner',
      category: 'Text',
      icon: AlignJustify,
      summary: 'Add, remove, or modify prefixes and suffixes across every line with case-matching and line numbering options.',
      badge: 'New',
    },
  ];

  const handleSelectTool = (id: ToolId) => {
    setSelectedTool(id);
    if (workspaceRef.current) {
      workspaceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredTools = toolsList.filter((tool) => {
    const matchesCategory = filterCategory === 'All' || tool.category === filterCategory;
    const matchesQuery =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  // Dedicated FAQs for the 4 initial tools
  const colorPaletteFaqs: FaqItem[] = [
    {
      question: 'How are the harmonic color palettes calculated?',
      answer:
        'Palettes are synthesized using mathematical color harmony formulas on the HSL (Hue, Saturation, Lightness) color wheel, generating complementary, analogous, triadic, warm, and cool color relationships.',
    },
    {
      question: 'Can I lock specific colors while generating new ones?',
      answer:
        'Yes. Click the padlock icon on any color swatch. When you click "Generate New Palette" or press the Spacebar, all locked colors remain unchanged while unlocked slots regenerate.',
    },
    {
      question: 'What color formats are available for export?',
      answer:
        'You can copy individual HEX color codes, CSS variable blocks (`--color-1: #...`), JSON objects, or download a clean CSS stylesheet.',
    },
    {
      question: 'Are the generated colors safe for commercial branding?',
      answer:
        'Yes. All generated color values are 100% royalty-free for commercial client work, print packaging, digital marketing, and web templates.',
    },
    {
      question: 'Does the tool check color contrast automatically?',
      answer:
        'Yes. The generator dynamically evaluates perceived luminance to ensure that swatch text labels remain legible in either high-contrast white or dark typography.',
    },
    {
      question: 'Can I adjust individual color brightness or saturation?',
      answer:
        'You can switch between preset generation moods (Balanced, Vibrant, Pastel, Warm, Cool, and Monochrome) to steer the saturation and lightness range.',
    },
    {
      question: 'Does generating palettes consume mobile cellular data?',
      answer:
        'No. Once the web application is loaded in your browser, all mathematical conversions run client-side using JavaScript with zero server network calls.',
    },
    {
      question: 'Can I use keyboard shortcuts on desktop?',
      answer:
        'Yes. On laptop and desktop keyboards, you can press the Spacebar to generate a fresh palette instantly.',
    },
  ];

  const loremIpsumFaqs: FaqItem[] = [
    {
      question: 'What is the purpose of Lorem Ipsum placeholder text?',
      answer:
        'Placeholder text enables designers, web developers, and publishers to preview typographical layout, spacing, and typography before the final draft is written.',
    },
    {
      question: 'Is this text real Latin or simulated words?',
      answer:
        'It originates from Cicero’s 45 BC philosophical treatise "De Finibus Bonorum et Malorum", but words have been altered and randomized so it provides realistic letter distributions without distracting meaning.',
    },
    {
      question: 'Can I generate dummy text by word, sentence, or paragraph count?',
      answer:
        'Yes. You can select Paragraphs, Sentences, or Words, and adjust the numerical slider or counter to generate the exact volume needed for your UI component.',
    },
    {
      question: 'Does the generated text contain HTML markup tags?',
      answer:
        'By default, the text is pure clean Unicode. You can also toggle HTML paragraph tags (`<p>...</p>`) if you need ready-to-paste markup for web code.',
    },
    {
      question: 'Can I generate short teaser snippets for buttons and badges?',
      answer:
        'Yes. Switch to "Words" or "Sentences" mode and set the count to 3–6 words to test microcopy containers.',
    },
    {
      question: 'Can I copy the generated copy with one click?',
      answer:
        'Yes. Clicking "Copy to Clipboard" transfers the full text block directly into your operating system clipboard with visual confirmation.',
    },
    {
      question: 'Is there a limit on how many paragraphs I can generate?',
      answer:
        'You can generate up to 20 comprehensive paragraphs in a single click, which is sufficient for multi-column magazine and blog mockups.',
    },
    {
      question: 'Does the generator require an account or registration?',
      answer:
        'No. Money Master Blog tools are completely free, open to all visitors, and require zero sign-in or personal information.',
    },
  ];

  const wordCounterFaqs: FaqItem[] = [
    {
      question: 'How are word and character counts calculated?',
      answer:
        'Words are counted by splitting text on whitespace boundaries while excluding empty characters. Characters with and without spaces are evaluated directly in browser memory.',
    },
    {
      question: 'How is the estimated reading time determined?',
      answer:
        'Reading time is based on the international editorial standard of 200 words per minute for regular adult non-technical reading.',
    },
    {
      question: 'What case conversions are supported?',
      answer:
        'You can instantly convert text to UPPERCASE, lowercase, Title Case, Sentence case, and web-ready kebab-case slugs.',
    },
    {
      question: 'How does Clean Spaces work without removing line breaks?',
      answer:
        'Clean Spaces specifically collapses multiple consecutive horizontal spaces and tab characters into a single space while keeping line endings intact.',
    },
    {
      question: 'Can I remove blank lines from draft notes?',
      answer:
        'Yes. Clicking "Remove Blank Lines" filters out empty lines so you have a tight, compact list.',
    },
    {
      question: 'Is my draft text ever uploaded to a remote server?',
      answer:
        'No. All text parsing, counting, and casing transformations execute 100% locally in your browser memory. We never transmit or log your draft content.',
    },
    {
      question: 'Can I count sentences and paragraphs accurately?',
      answer:
        'Yes. Sentences are counted using punctuation markers (.!?), and paragraphs are measured using distinct line breaks.',
    },
    {
      question: 'Does this tool support non-English alphabets?',
      answer:
        'Yes. Character counts and casing transformations work across standard Unicode character sets including accented European letters and special characters.',
    },
  ];

  const passwordGeneratorFaqs: FaqItem[] = [
    {
      question: 'How does this password generator create random characters?',
      answer:
        'It utilizes the browser’s native Cryptographically Secure Pseudo-Random Number Generator (`window.crypto.getRandomValues`), drawing entropy directly from your operating system.',
    },
    {
      question: 'Is the generated password sent across the internet?',
      answer:
        'No. The credential is generated exclusively inside your browser’s temporary JavaScript memory and is never transmitted over the internet.',
    },
    {
      question: 'Can I exclude ambiguous characters like 0 and O or 1 and l?',
      answer:
        'Yes. You can enable the "Exclude Ambiguous Characters" toggle to avoid confusing lookalike letters when printing or sharing passwords.',
    },
    {
      question: 'What length is recommended for maximum security?',
      answer:
        'Security experts recommend at least 16 to 20 characters combining uppercase, lowercase, numbers, and symbols for critical accounts.',
    },
    {
      question: 'Can I generate passwords without symbols for systems that forbid them?',
      answer:
        'Yes. You can uncheck "Include Symbols" to produce alphanumeric credentials for older banking portals or legacy databases.',
    },
    {
      question: 'How does the password strength meter evaluate complexity?',
      answer:
        'The meter calculates information entropy based on the size of the character pool and total character length.',
    },
    {
      question: 'Can I copy the password safely to my clipboard?',
      answer:
        'Yes. Clicking "Copy Password" immediately transfers it to your clipboard with visual confirmation.',
    },
    {
      question: 'Can I regenerate passwords instantly?',
      answer:
        'Yes. Simply click the "Generate New Password" button or adjust any length slider to generate a new credential in milliseconds.',
    },
  ];

  // Global Tools Page FAQs
  const toolsFaqs: FaqItem[] = [
    {
      question: 'Do all 15 tools work offline or without an active internet connection?',
      answer:
        'Yes. Once Money Master Blog is loaded in your browser, all calculation, sorting, and transformation scripts run entirely client-side using JavaScript. You can generate palettes, sort lists, clean whitespace, extract numbers, remove invisible characters, and count lines even without an active internet connection.',
    },
    {
      question: 'Are my texts, lists, or passwords ever sent to a server or stored in a database?',
      answer:
        'Never. Money Master Blog is built on a strict privacy-first architecture. All text cleaning, word counting, sorting, line break removal, number extraction, quote processing, and password generation happen entirely in your browser’s local execution memory.',
    },
    {
      question: 'Are there any usage limits, fees, or hidden paywalls?',
      answer:
        'No. Every tool on Money Master Blog is 100% free and open to everyone with no usage limits, credit cards, or account registrations required.',
    },
    {
      question: 'Can I use the outputs from these tools for commercial client projects?',
      answer:
        'Yes, absolutely. Any color palette, placeholder text, sorted list, extracted dataset, or cleaned copy produced using these tools is entirely yours to use for commercial websites, client presentations, or publications.',
    },
    {
      question: 'Do these tools work properly on smartphones and tablets?',
      answer:
        'Yes. All 15 tools are fully responsive and touch-optimized for Android smartphones, iPhones, iPads, tablets, laptops, and desktop computers without requiring any software installation.',
    },
    {
      question: 'Which tool should I use to clean copied text from a PDF file?',
      answer:
        'We recommend using "Remove Line Breaks" to join fragmented sentences, followed by "Whitespace Remover" to normalize tabs and multiple spaces.',
    },
    {
      question: 'Can I link directly to a specific tool from my own notes or bookmarks?',
      answer:
        'Yes. Each tool has a dedicated identifier and card so you can select and navigate directly to your favorite utility anytime.',
    },
    {
      question: 'Who maintains and creates these online utility tools?',
      answer:
        'All tools on Money Master Blog are created and maintained by Shahid Ali, an experienced digital workflow creator with 7 years of practical experience working with web utilities, online content, and productivity tools.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-12">
      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-8">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Money Master Blog Utilities
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
          Online Tools
        </h1>
        <p className="mt-2 text-base text-neutral-600 max-w-3xl leading-relaxed">
          Money Master Blog provides simple, practical browser-based tools for working with text, colors, and everyday digital content. Each utility runs entirely on your device with complete privacy, instant performance, and zero registration required.
        </p>

        {/* Mobile Quick Tool Selector Dropdown */}
        <div className="mt-6 block md:hidden">
          <label htmlFor="mobile-tool-select" className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
            Jump Directly to Tool
          </label>
          <select
            id="mobile-tool-select"
            value={selectedTool}
            onChange={(e) => handleSelectTool(e.target.value as ToolId)}
            className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 font-medium focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
          >
            {toolsList.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.category})
              </option>
            ))}
          </select>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {(['All', 'Text', 'Colors', 'Security'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer min-h-[36px] ${
                  filterCategory === cat
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
                }`}
              >
                {cat} {cat === 'All' ? `(${toolsList.length})` : `(${toolsList.filter((t) => t.category === cat).length})`}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 15 tools..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Tool Navigation Cards (All 10 Tools) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-neutral-900">
            Select a Tool to Open
          </h2>
          <span className="text-xs text-neutral-500">
            Showing {filteredTools.length} of {toolsList.length} tools
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            const isSelected = selectedTool === tool.id;
            return (
              <div
                key={tool.id}
                id={`card-${tool.id}`}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-md ring-2 ring-neutral-900'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-xs text-neutral-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-white/15 text-white' : 'bg-neutral-100 text-neutral-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      {tool.badge && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-white uppercase">
                          {tool.badge}
                        </span>
                      )}
                      <span
                        className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        {tool.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-sm tracking-tight line-clamp-1">{tool.name}</h3>
                  <p
                    className={`text-xs mt-1.5 leading-relaxed line-clamp-2 ${
                      isSelected ? 'text-neutral-300' : 'text-neutral-600'
                    }`}
                  >
                    {tool.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    onClick={() => handleSelectTool(tool.id)}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[36px] ${
                      isSelected
                        ? 'bg-white text-neutral-900 hover:bg-neutral-100'
                        : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-900 hover:text-white'
                    }`}
                  >
                    <span>{isSelected ? 'Currently Active' : 'Open Tool'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Tool Workspace Anchor */}
      <div ref={workspaceRef} id="tool-workspace" className="pt-4 scroll-mt-6">
        {/* Render Selected Tool */}
        {selectedTool === 'color-palette' && <ColorPaletteGenerator />}
        {selectedTool === 'lorem-ipsum' && <LoremIpsumGenerator />}
        {selectedTool === 'word-counter' && <WordCounterCaseConverter onSelectTool={handleSelectTool} />}
        {selectedTool === 'password-generator' && <PasswordGenerator />}
        {selectedTool === 'text-sorter' && <TextSorter onSelectTool={handleSelectTool} />}
        {selectedTool === 'find-replace' && <FindReplaceText onSelectTool={handleSelectTool} />}
        {selectedTool === 'remove-line-breaks' && <RemoveLineBreaks onSelectTool={handleSelectTool} />}
        {selectedTool === 'duplicate-remover' && <DuplicateLineRemover onSelectTool={handleSelectTool} />}
        {selectedTool === 'whitespace-remover' && <WhitespaceRemover onSelectTool={handleSelectTool} />}
        {selectedTool === 'line-counter' && <TextLineCounter onSelectTool={handleSelectTool} />}
        {selectedTool === 'invisible-character-remover' && <InvisibleCharacterRemover onSelectTool={handleSelectTool} />}
        {selectedTool === 'punctuation-cleaner' && <TextPunctuationCleaner onSelectTool={handleSelectTool} />}
        {selectedTool === 'number-extractor' && <TextNumberExtractor onSelectTool={handleSelectTool} />}
        {selectedTool === 'quote-remover' && <TextQuoteRemover onSelectTool={handleSelectTool} />}
        {selectedTool === 'prefix-suffix-cleaner' && <TextPrefixSuffixCleaner onSelectTool={handleSelectTool} />}
      </div>

      {/* Editorial Guides for the 4 Original Tools (New tools have guides built-in) */}
      {selectedTool === 'color-palette' && (
        <section className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-start gap-3 border-b border-neutral-200 pb-4">
            <BookOpen className="w-5 h-5 text-neutral-900 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-neutral-900">
                Practical Guide: Color Palette Generator
              </h3>
              <p className="text-xs text-neutral-600 mt-0.5">
                Authored by Shahid Ali • 7 years practical digital workflow experience
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-neutral-700">
            <div>
              <h4 className="font-bold text-neutral-900 mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                Practical Workflow Advice
              </h4>
              <p className="leading-relaxed text-xs sm:text-sm text-neutral-600">
                When building a digital palette, it is usually best to pick one strong primary accent color first and lock it. Next, generate secondary tones or neutral complements. The lock function prevents your chosen base from changing while you experiment with accompanying shades.
              </p>
              <div className="mt-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs space-y-1">
                <strong>Recommended Harmony Formula:</strong>
                <div className="text-neutral-600">
                  1 Dominant color (60%) + 1 Supporting color (30%) + 1 High-contrast accent (10%)
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <Shield className="w-4 h-4 text-emerald-600" />
                Technical Accuracy & Privacy
              </h4>
              <p className="leading-relaxed text-xs sm:text-sm text-neutral-600">
                All color calculations (HSL to HEX conversions and contrast checks) are executed entirely on your client machine using JavaScript mathematical calculations. No color queries are sent to a server.
              </p>
              <div className="mt-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs text-neutral-600">
                HEX values are formatted in standard 6-character hexadecimal codes compatible with CSS, Figma, Photoshop, Illustrator, and web markup.
              </div>
            </div>
          </div>

          <FaqSection
            id="color-palette-tool-faq"
            title="Frequently Asked Questions About Color Palette Generator"
            subtitle="Common questions on color harmonies, export formats, and commercial usage."
            items={colorPaletteFaqs}
          />
        </section>
      )}

      {selectedTool === 'lorem-ipsum' && (
        <section className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-start gap-3 border-b border-neutral-200 pb-4">
            <BookOpen className="w-5 h-5 text-neutral-900 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-neutral-900">
                Practical Guide: Lorem Ipsum Placeholder Generator
              </h3>
              <p className="text-xs text-neutral-600 mt-0.5">
                Authored by Shahid Ali • 7 years practical digital workflow experience
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-neutral-700">
            <div>
              <h4 className="font-bold text-neutral-900 mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                Why Designers Use Dummy Text
              </h4>
              <p className="leading-relaxed text-xs sm:text-sm text-neutral-600">
                Placeholder copy allows design clients and stakeholders to focus on visual hierarchy, typographical balance, line-height, and container spacing rather than getting distracted by reading the content prematurely.
              </p>
              <div className="mt-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs space-y-1">
                <strong>Workflow Tip:</strong>
                <div className="text-neutral-600">
                  Use single-sentence outputs to test button or badge wrapping, and 2-to-3 paragraph outputs to test responsive column grids.
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <Shield className="w-4 h-4 text-emerald-600" />
                Clean Text Without Formatting Tags
              </h4>
              <p className="leading-relaxed text-xs sm:text-sm text-neutral-600">
                Text copied from our generator contains clean, unstyled Unicode characters. It carries no unwanted HTML inline tags, styled spans, or rich-text artifacts that can break your layout CSS.
              </p>
            </div>
          </div>

          <FaqSection
            id="lorem-ipsum-tool-faq"
            title="Frequently Asked Questions About Lorem Ipsum Generator"
            subtitle="Common inquiries about dummy copy, Latin origins, and layout mockups."
            items={loremIpsumFaqs}
          />
        </section>
      )}

      {selectedTool === 'word-counter' && (
        <section className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-start gap-3 border-b border-neutral-200 pb-4">
            <BookOpen className="w-5 h-5 text-neutral-900 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-neutral-900">
                Practical Guide: Text Cleaner & Case Converter
              </h3>
              <p className="text-xs text-neutral-600 mt-0.5">
                Authored by Shahid Ali • 7 years practical digital workflow experience
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-neutral-700">
            <div>
              <h4 className="font-bold text-neutral-900 mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                Content Drafting & Cleaning Tips
              </h4>
              <p className="leading-relaxed text-xs sm:text-sm text-neutral-600">
                When copying text from PDFs or legacy email clients, stray tabs and multiple whitespace blocks frequently sneak into headers and paragraphs. Use the "Clean Spaces" button to collapse multiple spaces down to a single space, and "Remove Blank Lines" to condense draft blocks.
              </p>
              <div className="mt-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs space-y-1">
                <strong>Reading Time Metric:</strong>
                <div className="text-neutral-600">
                  Calculated using the widely accepted editorial benchmark of 200 words per minute for typical digital readers.
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <Shield className="w-4 h-4 text-emerald-600" />
                Complete Client-Side Text Privacy
              </h4>
              <p className="leading-relaxed text-xs sm:text-sm text-neutral-600">
                Unlike remote grammar services that transmit your drafts to remote clouds, Money Master Blog calculates all metrics in real time on your machine. Your draft text is never sent, logged, or saved to any external database.
              </p>
              <div className="mt-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs text-neutral-600">
                All character transformations occur instantaneously as you type or paste without debounce lag.
              </div>
            </div>
          </div>

          <FaqSection
            id="word-counter-tool-faq"
            title="Frequently Asked Questions About Text Cleaner"
            subtitle="Common questions regarding character metrics, case conversions, and space removal."
            items={wordCounterFaqs}
          />
        </section>
      )}

      {selectedTool === 'password-generator' && (
        <section className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-start gap-3 border-b border-neutral-200 pb-4">
            <BookOpen className="w-5 h-5 text-neutral-900 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-neutral-900">
                Practical Guide: Random Password Generator
              </h3>
              <p className="text-xs text-neutral-600 mt-0.5">
                Authored by Shahid Ali • 7 years practical digital workflow experience
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-neutral-700">
            <div>
              <h4 className="font-bold text-neutral-900 mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                Credential Hygiene Principles
              </h4>
              <p className="leading-relaxed text-xs sm:text-sm text-neutral-600">
                For critical accounts (such as email, banking, or cloud hosting), aim for at least 16 to 20 characters combining uppercase, lowercase, numbers, and symbols. Never reuse credentials across different accounts.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <Shield className="w-4 h-4 text-emerald-600" />
                Cryptographic Randomness (CSPRNG)
              </h4>
              <p className="leading-relaxed text-xs sm:text-sm text-neutral-600">
                This tool strictly uses your browser's built-in <code>crypto.getRandomValues</code> API rather than pseudo-random <code>Math.random()</code>. The generated string exists exclusively in local memory and is never logged or transmitted.
              </p>
            </div>
          </div>

          <FaqSection
            id="password-generator-tool-faq"
            title="Frequently Asked Questions About Password Generator"
            subtitle="Detailed explanations on cryptographic entropy, symbols, and credential protection."
            items={passwordGeneratorFaqs}
          />
        </section>
      )}

      {/* Global Tools Directory FAQ Section */}
      <FaqSection
        id="tools-general-faq"
        title="Frequently Asked Questions About Money Master Blog Tools"
        subtitle="Detailed answers regarding tool mechanics, browser compatibility, privacy, and commercial use."
        items={toolsFaqs}
      />
    </div>
  );
}
