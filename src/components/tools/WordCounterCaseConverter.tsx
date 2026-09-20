import React, { useState, useMemo } from 'react';
import { Copy, Check, Trash2, ArrowUpDown, AlignLeft, Sparkles, ArrowRight } from 'lucide-react';
import { TextMetrics, ToolId } from '../../types';

interface WordCounterProps {
  onSelectTool?: (toolId: ToolId) => void;
}

export default function WordCounterCaseConverter({ onSelectTool }: WordCounterProps = {}) {
  const [text, setText] = useState<string>(
    'Money Master Blog provides simple, practical browser-based tools for working with text, colors, and everyday digital content. You can paste any article, blog draft, or notes here to instantly analyze length, remove redundant spaces, and transform letter casing.'
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Compute text statistics in real-time
  const metrics: TextMetrics = useMemo(() => {
    if (!text.trim()) {
      return {
        words: 0,
        charactersWithSpaces: 0,
        charactersWithoutSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTimeMinutes: 0,
      };
    }

    const trimmed = text.trim();
    // Words count (split on whitespace)
    const words = trimmed.split(/\s+/).filter(Boolean).length;
    const charactersWithSpaces = text.length;
    const charactersWithoutSpaces = text.replace(/\s/g, '').length;
    // Sentences count
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
    // Paragraphs count
    const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0).length;
    // Average reading speed: 200 words per minute
    const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));

    return {
      words,
      charactersWithSpaces,
      charactersWithoutSpaces,
      sentences,
      paragraphs,
      readingTimeMinutes,
    };
  }, [text]);

  const notify = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 2500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    notify('Text copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
    notify('Text cleared');
  };

  // Conversions
  const toUpperCase = () => {
    setText((prev) => prev.toUpperCase());
    notify('Converted to UPPERCASE');
  };

  const toLowerCase = () => {
    setText((prev) => prev.toLowerCase());
    notify('Converted to lowercase');
  };

  const toTitleCase = () => {
    const converted = text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    setText(converted);
    notify('Converted to Title Case');
  };

  const toSentenceCase = () => {
    const converted = text
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    setText(converted);
    notify('Converted to Sentence case');
  };

  const toKebabCase = () => {
    const converted = text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .trim()
      .split(/\s+/)
      .join('-');
    setText(converted);
    notify('Converted to kebab-case');
  };

  const cleanExtraSpaces = () => {
    const cleaned = text.replace(/[ \t]+/g, ' ').trim();
    setText(cleaned);
    notify('Removed extra spaces');
  };

  const removeEmptyLines = () => {
    const cleaned = text
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .join('\n');
    setText(cleaned);
    notify('Removed empty lines');
  };

  return (
    <div id="word-counter-tool" className="w-full bg-white border border-neutral-200 rounded-xl p-5 md:p-8 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
              Text Utility
            </span>
            <span className="text-xs text-neutral-600">Real-Time Metrics</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mt-1">Word Counter & Text Case Converter</h3>
          <p className="text-sm text-neutral-600 mt-0.5">
            Analyze text stats and transform letter casing instantly directly inside your browser.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            id="btn-copy-text"
            onClick={handleCopy}
            className={`inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer min-h-[44px] ${
              copied
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'bg-white border-neutral-300 text-neutral-800 hover:bg-neutral-50'
            }`}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy Text'}</span>
          </button>

          <button
            id="btn-clear-text"
            onClick={handleClear}
            className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 hover:text-red-600 transition-colors cursor-pointer min-h-[44px]"
            title="Clear all text"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Metrics Counter Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 my-5">
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-neutral-900 font-mono">{metrics.words.toLocaleString()}</div>
          <div className="text-xs text-neutral-600 uppercase font-semibold mt-1">Words</div>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-neutral-900 font-mono">{metrics.charactersWithSpaces.toLocaleString()}</div>
          <div className="text-xs text-neutral-600 uppercase font-semibold mt-1">Characters</div>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-neutral-900 font-mono">{metrics.charactersWithoutSpaces.toLocaleString()}</div>
          <div className="text-xs text-neutral-600 uppercase font-semibold mt-1">No Spaces</div>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-neutral-900 font-mono">{metrics.sentences}</div>
          <div className="text-xs text-neutral-600 uppercase font-semibold mt-1">Sentences</div>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-neutral-900 font-mono">{metrics.paragraphs}</div>
          <div className="text-xs text-neutral-600 uppercase font-semibold mt-1">Paragraphs</div>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-neutral-900 font-mono">~{metrics.readingTimeMinutes}m</div>
          <div className="text-xs text-neutral-600 uppercase font-semibold mt-1">Reading Time</div>
        </div>
      </div>

      {/* Main Textarea */}
      <div className="relative">
        <textarea
          id="text-input-area"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here to begin analyzing or formatting..."
          rows={7}
          className="w-full p-4 border border-neutral-300 rounded-lg text-neutral-900 text-sm md:text-base leading-relaxed focus:ring-2 focus:ring-neutral-900 focus:outline-hidden resize-y font-sans transition-colors"
        />
      </div>

      {/* Case Converter Action Bar */}
      <div className="mt-4 pt-4 border-t border-neutral-200">
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <ArrowUpDown className="w-3.5 h-3.5" />
          <span>Case Transformations & Formatting</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            id="btn-case-upper"
            onClick={toUpperCase}
            className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-md text-xs font-medium border border-neutral-300 transition-colors cursor-pointer min-h-[36px]"
          >
            UPPERCASE
          </button>
          <button
            id="btn-case-lower"
            onClick={toLowerCase}
            className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-md text-xs font-medium border border-neutral-300 transition-colors cursor-pointer min-h-[36px]"
          >
            lowercase
          </button>
          <button
            id="btn-case-title"
            onClick={toTitleCase}
            className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-md text-xs font-medium border border-neutral-300 transition-colors cursor-pointer min-h-[36px]"
          >
            Title Case
          </button>
          <button
            id="btn-case-sentence"
            onClick={toSentenceCase}
            className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-md text-xs font-medium border border-neutral-300 transition-colors cursor-pointer min-h-[36px]"
          >
            Sentence case
          </button>
          <button
            id="btn-case-kebab"
            onClick={toKebabCase}
            className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-md text-xs font-medium border border-neutral-300 transition-colors cursor-pointer min-h-[36px]"
          >
            slug-kebab-case
          </button>

          <div className="hidden sm:block w-px h-6 bg-neutral-200 self-center mx-1" />

          <button
            id="btn-clean-spaces"
            onClick={cleanExtraSpaces}
            className="px-3 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 rounded-md text-xs font-medium border border-neutral-300 transition-colors cursor-pointer min-h-[36px] flex items-center gap-1"
          >
            <AlignLeft className="w-3.5 h-3.5 text-neutral-500" />
            <span>Clean Spaces</span>
          </button>
          <button
            id="btn-remove-empty-lines"
            onClick={removeEmptyLines}
            className="px-3 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 rounded-md text-xs font-medium border border-neutral-300 transition-colors cursor-pointer min-h-[36px]"
          >
            Remove Blank Lines
          </button>
        </div>
      </div>

      {/* Notice alert */}
      {actionNotice && (
        <div className="mt-4 p-3 bg-neutral-900 text-white text-xs sm:text-sm rounded-lg flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Internal linking to related tools */}
      {onSelectTool && (
        <div className="mt-5 pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
          <span className="font-medium text-neutral-700">Related Text Tools:</span>
          <button
            onClick={() => onSelectTool('whitespace-remover')}
            className="text-neutral-900 underline hover:text-neutral-700 cursor-pointer"
          >
            Whitespace Remover
          </button>
          <span>•</span>
          <button
            onClick={() => onSelectTool('remove-line-breaks')}
            className="text-neutral-900 underline hover:text-neutral-700 cursor-pointer"
          >
            Remove Line Breaks
          </button>
          <span>•</span>
          <button
            onClick={() => onSelectTool('duplicate-remover')}
            className="text-neutral-900 underline hover:text-neutral-700 cursor-pointer"
          >
            Duplicate Line Remover
          </button>
        </div>
      )}
    </div>
  );
}
