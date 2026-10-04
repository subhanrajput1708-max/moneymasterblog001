import React, { useState } from 'react';
import { Copy, Check, RotateCcw, Sparkles, FileText, CheckCircle2 } from 'lucide-react';

export default function TextCleaner() {
  const [input, setInput] = useState('');
  const [removeExtraSpaces, setRemoveExtraSpaces] = useState(true);
  const [removeBlankLines, setRemoveBlankLines] = useState(true);
  const [trimLines, setTrimLines] = useState(true);
  const [stripHtml, setStripHtml] = useState(true);
  const [normalizeQuotes, setNormalizeQuotes] = useState(true);
  const [removeNonAscii, setRemoveNonAscii] = useState(false);
  const [copied, setCopied] = useState(false);

  const cleanText = (raw: string): string => {
    if (!raw) return '';
    let result = raw;

    // Strip HTML tags
    if (stripHtml) {
      result = result.replace(/<[^>]*>/g, '');
    }

    // Normalize curly quotes and dashes
    if (normalizeQuotes) {
      result = result
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/[\u2013\u2014]/g, '-');
    }

    // Remove non-ASCII if enabled
    if (removeNonAscii) {
      result = result.replace(/[^\x00-\x7F]/g, '');
    }

    // Trim lines & spaces
    const lines = result.split(/\r?\n/);
    const cleanedLines = lines
      .map((line) => {
        let l = line;
        if (removeExtraSpaces) {
          l = l.replace(/[ \t]+/g, ' ');
        }
        if (trimLines) {
          l = l.trim();
        }
        return l;
      })
      .filter((line) => {
        if (removeBlankLines) {
          return line.length > 0;
        }
        return true;
      });

    return cleanedLines.join('\n');
  };

  const outputText = cleanText(input);

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInput('');
  };

  const handleSample = () => {
    setInput(
      `   <b>Welcome</b> to   Money Master   Blog!   \n\n\n` +
      `Here is a “quote” with ‘curly’ marks and irregular   spacing.  \n\n` +
      `<p>Another paragraph copied from   a web page or PDF document.</p>\n\n\n` +
      `   List item 1 with trailing spaces     \n` +
      `   List item 2 with trailing spaces     \n`
    );
  };

  const inputCharCount = input.length;
  const outputCharCount = outputText.length;
  const inputWords = input.trim() ? input.trim().split(/\s+/).length : 0;
  const outputWords = outputText.trim() ? outputText.trim().split(/\s+/).length : 0;

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            Text Cleaner &amp; Sanitizer
          </h2>
          <p className="text-sm text-neutral-600">
            Clean unwanted spaces, blank lines, HTML markup, and formatting artifacts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSample}
            className="px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition"
          >
            Load Sample
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Options Grid */}
      <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 mb-6">
        <span className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-3">
          Cleaning Options
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={removeExtraSpaces}
              onChange={(e) => setRemoveExtraSpaces(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
            <span className="text-neutral-800">Remove Multiple Spaces</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={removeBlankLines}
              onChange={(e) => setRemoveBlankLines(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
            <span className="text-neutral-800">Remove Empty Lines</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={trimLines}
              onChange={(e) => setTrimLines(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
            <span className="text-neutral-800">Trim Line Edges</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={stripHtml}
              onChange={(e) => setStripHtml(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
            <span className="text-neutral-800">Strip HTML Tags</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={normalizeQuotes}
              onChange={(e) => setNormalizeQuotes(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
            <span className="text-neutral-800">Normalize Quotes &amp; Dashes</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={removeNonAscii}
              onChange={(e) => setRemoveNonAscii(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
            <span className="text-neutral-800">Strip Non-ASCII Characters</span>
          </label>
        </div>
      </div>

      {/* Input / Output split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="text-cleaner-input" className="text-sm font-semibold text-neutral-800 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-neutral-500" />
              Original Text
            </label>
            <span className="text-xs text-neutral-500">
              {inputWords} words • {inputCharCount} chars
            </span>
          </div>
          <textarea
            id="text-cleaner-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your unformatted text here to clean it..."
            rows={10}
            className="w-full p-3.5 text-sm font-mono border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-neutral-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Cleaned Result
            </span>
            <span className="text-xs text-neutral-500">
              {outputWords} words • {outputCharCount} chars
            </span>
          </div>
          <textarea
            readOnly
            value={outputText}
            placeholder="Cleaned text will appear here automatically..."
            rows={10}
            className="w-full p-3.5 text-sm font-mono border border-neutral-300 rounded-xl bg-neutral-50 text-neutral-900 focus:outline-none"
          />
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-100">
        <div className="text-xs text-neutral-500">
          {inputCharCount > 0 ? (
            <span>
              Saved{' '}
              <strong className="text-emerald-700">
                {Math.max(0, inputCharCount - outputCharCount)}
              </strong>{' '}
              characters and cleaned{' '}
              <strong className="text-emerald-700">
                {Math.max(0, inputWords - outputWords)}
              </strong>{' '}
              redundancies.
            </span>
          ) : (
            'Type or paste text above to start cleaning.'
          )}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!outputText}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition shadow-sm ${
            copied
              ? 'bg-emerald-600 text-white'
              : outputText
              ? 'bg-neutral-900 hover:bg-neutral-800 text-white'
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied Clean Text!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Clean Text
            </>
          )}
        </button>
      </div>
    </div>
  );
}
