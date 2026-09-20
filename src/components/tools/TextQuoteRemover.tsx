import React, { useState } from 'react';
import { Quote, Copy, Check, Trash2, RotateCcw, BookOpen, Lightbulb, Shield, ArrowRight, Layers } from 'lucide-react';
import { ToolId } from '../../types';
import FaqSection, { FaqItem } from '../common/FaqSection';

interface TextQuoteRemoverProps {
  onSelectTool?: (toolId: ToolId) => void;
}

type QuoteMode = 'strip-symbols' | 'remove-enclosed' | 'extract-quoted';

export default function TextQuoteRemover({ onSelectTool }: TextQuoteRemoverProps) {
  const sampleText = `She looked across the table and whispered, "This is a confidential test."\nLater, he replied with, 'Everything will be ready on Monday morning.'\nWe also have “smart curly quotes” around titles like “The Art of Design”.\nNotice that contractions like don't, can't, and I'm should be protected from deletion.`;

  const [inputText, setInputText] = useState<string>(sampleText);
  const [outputText, setOutputText] = useState<string>('');
  const [mode, setMode] = useState<QuoteMode>('strip-symbols');
  const [includeDouble, setIncludeDouble] = useState<boolean>(true);
  const [includeSingle, setIncludeSingle] = useState<boolean>(true);
  const [includeCurly, setIncludeCurly] = useState<boolean>(true);
  const [includeGuillemets, setIncludeGuillemets] = useState<boolean>(true);
  const [protectContractions, setProtectContractions] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [notice, setNotice] = useState<string | null>(null);

  // Statistics
  const [quotesProcessedCount, setQuotesProcessedCount] = useState<number>(0);

  const notify = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 2500);
  };

  const handleProcess = () => {
    if (!inputText) {
      setOutputText('');
      setQuotesProcessedCount(0);
      notify('Please enter text containing quotes');
      return;
    }

    let text = inputText;

    // Step 1: Protect Contractions from single quote matching (don't, can't, I'm, it's, etc.)
    const contractionMap: Record<string, string> = {};
    let contractionIndex = 0;

    if (protectContractions) {
      text = text.replace(/(\b[a-zA-Z]+)['’]([a-zA-Z]+\b)/g, (match) => {
        const placeholder = `__CONTR_${contractionIndex++}__`;
        contractionMap[placeholder] = match;
        return placeholder;
      });
    }

    let quotesCount = 0;

    if (mode === 'strip-symbols') {
      // MODE 1: Keep inner text, remove quotation marks only
      if (includeDouble) {
        const doubleMatches = text.match(/"/g);
        if (doubleMatches) quotesCount += doubleMatches.length;
        text = text.replace(/"/g, '');
      }

      if (includeCurly) {
        const curlyMatches = text.match(/[“”‘’]/g);
        if (curlyMatches) quotesCount += curlyMatches.length;
        text = text.replace(/[“”‘’]/g, '');
      }

      if (includeGuillemets) {
        const guillemetMatches = text.match(/[«»‹›]/g);
        if (guillemetMatches) quotesCount += guillemetMatches.length;
        text = text.replace(/[«»‹›]/g, '');
      }

      if (includeSingle) {
        // Single ASCII quote
        const singleMatches = text.match(/'/g);
        if (singleMatches) quotesCount += singleMatches.length;
        text = text.replace(/'/g, '');
      }
    } else if (mode === 'remove-enclosed') {
      // MODE 2: Remove the entire quoted section including the quote symbols
      if (includeDouble) {
        text = text.replace(/"([^"]*)"/g, () => {
          quotesCount++;
          return '';
        });
      }

      if (includeCurly) {
        text = text.replace(/“([^“”]*)”/g, () => {
          quotesCount++;
          return '';
        });
        text = text.replace(/‘([^‘’]*)’/g, () => {
          quotesCount++;
          return '';
        });
      }

      if (includeGuillemets) {
        text = text.replace(/«([^«»]*)»/g, () => {
          quotesCount++;
          return '';
        });
        text = text.replace(/‹([^‹›]*)›/g, () => {
          quotesCount++;
          return '';
        });
      }

      if (includeSingle) {
        text = text.replace(/'([^']*)'/g, () => {
          quotesCount++;
          return '';
        });
      }

      // Clean up any double spaces left behind by deleted phrases
      text = text.replace(/ {2,}/g, ' ');
    } else if (mode === 'extract-quoted') {
      // MODE 3: Extract ONLY the text that was enclosed within quotes
      const extracted: string[] = [];

      if (includeDouble) {
        const regex = /"([^"]*)"/g;
        let match;
        while ((match = regex.exec(text)) !== null) {
          if (match[1].trim()) extracted.push(match[1].trim());
          quotesCount++;
        }
      }

      if (includeCurly) {
        const regexDoubleCurly = /“([^“”]*)”/g;
        let match;
        while ((match = regexDoubleCurly.exec(text)) !== null) {
          if (match[1].trim()) extracted.push(match[1].trim());
          quotesCount++;
        }
        const regexSingleCurly = /‘([^‘’]*)’/g;
        while ((match = regexSingleCurly.exec(text)) !== null) {
          if (match[1].trim()) extracted.push(match[1].trim());
          quotesCount++;
        }
      }

      if (includeGuillemets) {
        const regex = /«([^«»]*)»/g;
        let match;
        while ((match = regex.exec(text)) !== null) {
          if (match[1].trim()) extracted.push(match[1].trim());
          quotesCount++;
        }
      }

      if (includeSingle) {
        const regex = /'([^']*)'/g;
        let match;
        while ((match = regex.exec(text)) !== null) {
          if (match[1].trim()) extracted.push(match[1].trim());
          quotesCount++;
        }
      }

      text = extracted.join('\n');
    }

    // Restore protected contractions
    if (protectContractions) {
      Object.entries(contractionMap).forEach(([placeholder, original]) => {
        text = text.replace(new RegExp(placeholder, 'g'), original);
      });
    }

    setOutputText(text);
    setQuotesProcessedCount(quotesCount);
    notify(`Processed quotes successfully (${quotesCount} occurrences)`);
  };

  const handleCopy = () => {
    const textToCopy = outputText || inputText;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    notify('Copied text to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setQuotesProcessedCount(0);
    notify('Cleared text');
  };

  const handleReset = () => {
    setInputText(sampleText);
    setOutputText('');
    setMode('strip-symbols');
    setQuotesProcessedCount(0);
    notify('Reset to sample text');
  };

  const faqs: FaqItem[] = [
    {
      question: 'What is the difference between removing quote symbols and removing quoted text?',
      answer:
        'Removing quote symbols keeps the words inside the quotes and only strips the quote marks (e.g. `"Hello world"` becomes `Hello world`). Removing quoted text deletes both the quote marks and all the words enclosed between them (e.g. `He said, "Hello world."` becomes `He said, .`).',
    },
    {
      question: 'Will this tool destroy contractions like "don\'t" or "can\'t"?',
      answer:
        'No. When "Protect Contractions & Possessives" is enabled (the default), the tool isolates words with mid-word apostrophes (`don\'t`, `can\'t`, `I\'m`, `it\'s`, `Shahid\'s`) so they are never mistakenly treated as opening or closing single quotes.',
    },
    {
      question: 'Which quotation mark styles are supported?',
      answer:
        'The tool supports standard ASCII double quotes (`""`), ASCII single quotes (`\'\'`), typographical curly quotes (`“”` and `‘’`), and European guillemets (`«»` and `‹›`). You can toggle each quote family individually.',
    },
    {
      question: 'Can I extract only the quoted remarks from an interview transcript?',
      answer:
        'Yes. Switch the Mode to "Extract Quoted Text Only". This strips all narrative text outside of quotes and displays every quoted passage on a separate line.',
    },
    {
      question: 'What happens if a quotation mark is unclosed or mismatched?',
      answer:
        'In "Remove Quotation Marks Only" mode, all unclosed marks are cleanly stripped regardless of pairing. In "Remove Quoted Section" mode, standard greedy matching is bounded per line to avoid deleting excessive text.',
    },
    {
      question: 'Can I clean CSV columns where cells are wrapped in unwanted double quotes?',
      answer:
        'Yes. Paste your CSV rows, select "Remove Quotation Marks Only", and process. All wrapping quotes will be removed while retaining commas, numbers, and headers.',
    },
    {
      question: 'When should I manually review cleaned text?',
      answer:
        'When working with dialogue in complex scripts where single quotes are used both as quotation marks and as nested quotes inside double quotes, we recommend a quick visual scan to confirm formatting.',
    },
    {
      question: 'Is my confidential text uploaded to any server?',
      answer:
        'No. Like every tool on Money Master Blog, the Text Quote Remover operates 100% in local client-side memory using JavaScript. Zero text is transmitted, logged, or recorded.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Tool Header Card */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-neutral-100 text-neutral-800 text-xs font-semibold mb-2">
              <Quote className="w-3.5 h-3.5" />
              <span>Text Utility Suite • Tool #14</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Text Quote Remover
            </h2>
            <p className="text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
              Remove quotation marks, delete quoted dialogue sections completely, or extract only the quoted text across straight, curly, and guillemet quote styles.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Sample</span>
            </button>
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Status Notification */}
        {notice && (
          <div className="mb-4 p-3 bg-neutral-900 text-white text-xs font-medium rounded-lg flex items-center justify-between animate-fade-in shadow-xs">
            <span>{notice}</span>
          </div>
        )}

        {/* Live Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-left">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
              Original Characters
            </span>
            <span className="text-xl font-bold text-neutral-900 mt-0.5 block">
              {inputText.length}
            </span>
          </div>

          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-left">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
              Quotes/Sections Handled
            </span>
            <span className="text-xl font-bold text-neutral-900 mt-0.5 block">
              {quotesProcessedCount}
            </span>
          </div>

          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-left">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
              Result Characters
            </span>
            <span className="text-xl font-bold text-neutral-900 mt-0.5 block">
              {outputText ? outputText.length : inputText.length}
            </span>
          </div>

          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-left">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
              Active Mode
            </span>
            <span className="text-xs font-bold text-neutral-800 mt-1.5 block uppercase tracking-wider truncate">
              {mode === 'strip-symbols' ? 'Strip Marks' : mode === 'remove-enclosed' ? 'Delete Quoted' : 'Extract Only'}
            </span>
          </div>
        </div>

        {/* Cleaning Mode & Quote Selection Controls */}
        <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl mb-6 space-y-4">
          {/* Mode Selector */}
          <div>
            <span className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
              Select Processing Mode
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setMode('strip-symbols')}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  mode === 'strip-symbols'
                    ? 'border-neutral-900 bg-white ring-2 ring-neutral-900 shadow-2xs'
                    : 'border-neutral-200 bg-white/70 hover:bg-white text-neutral-700'
                }`}
              >
                <div className="font-bold text-xs text-neutral-900">
                  1. Remove Quote Marks Only
                </div>
                <div className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                  Keeps text inside intact: <span className="font-mono bg-neutral-100 px-1 rounded">"Hello" → Hello</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMode('remove-enclosed')}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  mode === 'remove-enclosed'
                    ? 'border-neutral-900 bg-white ring-2 ring-neutral-900 shadow-2xs'
                    : 'border-neutral-200 bg-white/70 hover:bg-white text-neutral-700'
                }`}
              >
                <div className="font-bold text-xs text-neutral-900">
                  2. Remove Quoted Sections Completely
                </div>
                <div className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                  Deletes quotes and enclosed text: <span className="font-mono bg-neutral-100 px-1 rounded">He said, "Hi" → He said,</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMode('extract-quoted')}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  mode === 'extract-quoted'
                    ? 'border-neutral-900 bg-white ring-2 ring-neutral-900 shadow-2xs'
                    : 'border-neutral-200 bg-white/70 hover:bg-white text-neutral-700'
                }`}
              >
                <div className="font-bold text-xs text-neutral-900">
                  3. Extract Quoted Content Only
                </div>
                <div className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                  Pulls quoted passages into a clean list
                </div>
              </button>
            </div>
          </div>

          {/* Quote Types to target */}
          <div className="pt-2 border-t border-neutral-200/80">
            <span className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
              Supported Quote Styles & Protections
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeDouble}
                  onChange={(e) => setIncludeDouble(e.target.checked)}
                  className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
                />
                <span>Double Quotes (<code className="font-mono">""</code>)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSingle}
                  onChange={(e) => setIncludeSingle(e.target.checked)}
                  className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
                />
                <span>Single Quotes (<code className="font-mono">''</code>)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeCurly}
                  onChange={(e) => setIncludeCurly(e.target.checked)}
                  className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
                />
                <span>Curly Smart Quotes (<code className="font-mono">“” ‘’</code>)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeGuillemets}
                  onChange={(e) => setIncludeGuillemets(e.target.checked)}
                  className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
                />
                <span>Guillemets (<code className="font-mono">«» ‹›</code>)</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-neutral-900 cursor-pointer">
                <input
                  type="checkbox"
                  checked={protectContractions}
                  onChange={(e) => setProtectContractions(e.target.checked)}
                  className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
                />
                <span>Protect Contractions (don't, can't)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Input / Output Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="quote-input" className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Input Text with Quotations
              </label>
              <span className="text-xs text-neutral-500">
                {inputText.length} characters
              </span>
            </div>
            <textarea
              id="quote-input"
              rows={8}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste dialogue, interview text, CSV data, or code containing quotation marks..."
              className="w-full p-3.5 bg-white border border-neutral-300 rounded-xl text-sm font-mono text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden leading-relaxed shadow-2xs"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="quote-output" className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Processed Output Text
              </label>
              <span className="text-xs text-neutral-500">
                {outputText ? outputText.length : 0} characters
              </span>
            </div>
            <textarea
              id="quote-output"
              rows={8}
              readOnly
              value={outputText}
              placeholder="Click 'Process Quotations' to generate output..."
              className="w-full p-3.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-mono text-neutral-900 focus:outline-hidden leading-relaxed shadow-2xs"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              id="btn-process-quotes"
              onClick={handleProcess}
              className="px-6 py-3 rounded-lg bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer min-h-[44px]"
            >
              Process Quotations
            </button>
            <button
              id="btn-copy-quotes"
              onClick={handleCopy}
              disabled={!outputText}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg bg-white border border-neutral-300 text-neutral-800 text-sm font-semibold hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer min-h-[44px] disabled:opacity-50"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Result'}</span>
            </button>
          </div>

          <div className="text-xs text-neutral-500">
            Contraction protection enabled • Client-side parsing
          </div>
        </div>
      </div>

      {/* Editorial Content */}
      <section className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-start gap-3 border-b border-neutral-200 pb-4">
          <BookOpen className="w-5 h-5 text-neutral-900 mt-0.5 shrink-0" />
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
              Understanding Quotation Removal & Text Normalization
            </h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              Authored by Shahid Ali • 7 years practical experience in web utilities and digital editorial workflows
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-neutral-700">
          <div className="space-y-4">
            <h4 className="font-bold text-neutral-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              Removing Quote Symbols vs. Entire Quoted Passages
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              In digital content preparation, quotation marks serve varied roles. When preparing text for database insertion, CSV exports, or search queries, surrounding double quotes often create syntax errors or string escaping problems. In those cases, removing the quote marks while keeping the text is the ideal solution.
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Conversely, when redacting confidential quotes or stripping dialogue from narrative text, you want to remove the quote marks AND everything inside them. This tool gives you distinct modes for both operations.
            </p>
            <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 text-xs space-y-1.5">
              <strong className="text-neutral-900">Mode Comparison:</strong>
              <div className="space-y-1 text-neutral-600">
                <div><strong>Input:</strong> She said, "This is a test."</div>
                <div><strong>Strip Marks Only:</strong> She said, This is a test.</div>
                <div><strong>Remove Quoted Section:</strong> She said, .</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-neutral-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <Shield className="w-4 h-4 text-emerald-600" />
              Contraction Protection Architecture
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              The primary pitfall with naive quote stripping scripts is that they treat apostrophes inside English contractions (`don't`, `can't`, `it's`, `I'm`) as single quotation marks. This destroys the English prose by leaving awkward fragments like `don t` or `can t`.
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Our tool employs word-boundary token masking to isolate contractions before executing quote-stripping rules, ensuring grammatical accuracy while removing true quotation marks.
            </p>
          </div>
        </div>

        {/* Related Utilities Links */}
        <div className="pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Related Text Cleaning Utilities:
          </span>
          <div className="flex flex-wrap items-center gap-3">
            {onSelectTool && (
              <>
                <button
                  onClick={() => onSelectTool('word-counter')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-800 hover:text-neutral-950 underline underline-offset-4 cursor-pointer"
                >
                  <span>Text Cleaner & Case Converter</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onSelectTool('punctuation-cleaner')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-800 hover:text-neutral-950 underline underline-offset-4 cursor-pointer"
                >
                  <span>Text Punctuation Cleaner</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onSelectTool('find-replace')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-800 hover:text-neutral-950 underline underline-offset-4 cursor-pointer"
                >
                  <span>Find & Replace Text</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Dedicated Tool FAQs */}
      <FaqSection
        id="quote-remover-faqs"
        title="Frequently Asked Questions About Text Quote Removal"
        subtitle="Practical answers regarding stripping quotes, dialogue removal, and protecting word contractions."
        items={faqs}
      />
    </div>
  );
}
