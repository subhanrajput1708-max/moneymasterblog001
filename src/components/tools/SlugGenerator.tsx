import React, { useState } from 'react';
import { Copy, Check, RotateCcw, Link2, Sparkles } from 'lucide-react';

export default function SlugGenerator() {
  const [text, setText] = useState('');
  const [separator, setSeparator] = useState<'-' | '_'>('-');
  const [removeStopWords, setRemoveStopWords] = useState(false);
  const [maxLength, setMaxLength] = useState<number>(80);
  const [copied, setCopied] = useState(false);

  const stopWords = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into',
    'is', 'it', 'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then',
    'there', 'these', 'they', 'this', 'to', 'was', 'will', 'with'
  ]);

  const generateSlug = (raw: string) => {
    if (!raw.trim()) return '';

    // Normalize unicode accents (é -> e)
    let s = raw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Convert to lowercase
    s = s.toLowerCase();

    // Replace non-alphanumeric with spaces
    s = s.replace(/[^a-z0-9\s]/g, ' ');

    // Filter words
    let words = s.trim().split(/\s+/).filter(Boolean);

    if (removeStopWords) {
      const filtered = words.filter((w) => !stopWords.has(w));
      if (filtered.length > 0) {
        words = filtered;
      }
    }

    let slug = words.join(separator);

    if (maxLength > 0 && slug.length > maxLength) {
      slug = slug.slice(0, maxLength);
      // clean trailing separator
      if (slug.endsWith(separator)) {
        slug = slug.slice(0, -1);
      }
    }

    return slug;
  };

  const slug = generateSlug(text);

  const handleCopy = () => {
    if (!slug) return;
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSample = () => {
    setText('How to Calculate the Real Cost of a Personal Loan Before Applying (2026 Edition)!');
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <Link2 className="w-5 h-5 text-teal-600" />
            SEO Text-to-Slug Generator
          </h2>
          <p className="text-sm text-neutral-600">
            Convert article titles and headlines into clean, URL-friendly slugs for web publishing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSample}
            className="px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition"
          >
            Load Sample
          </button>
          <button
            type="button"
            onClick={() => setText('')}
            className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-neutral-700">Separator:</span>
            <div className="inline-flex rounded-lg border border-neutral-300 p-0.5 bg-white text-xs">
              <button
                type="button"
                onClick={() => setSeparator('-')}
                className={`px-2.5 py-1 rounded font-medium transition ${
                  separator === '-' ? 'bg-teal-600 text-white' : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                Hyphen (-)
              </button>
              <button
                type="button"
                onClick={() => setSeparator('_')}
                className={`px-2.5 py-1 rounded font-medium transition ${
                  separator === '_' ? 'bg-teal-600 text-white' : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                Underscore (_)
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-neutral-700">
            <input
              type="checkbox"
              checked={removeStopWords}
              onChange={(e) => setRemoveStopWords(e.target.checked)}
              className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
            />
            Remove Stop Words (a, the, in...)
          </label>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="max-length-input" className="text-xs font-semibold text-neutral-700">Max Length:</label>
          <input
            id="max-length-input"
            type="number"
            min={20}
            max={200}
            value={maxLength}
            onChange={(e) => setMaxLength(Math.max(20, parseInt(e.target.value) || 80))}
            className="w-16 px-2 py-1 text-xs border border-neutral-300 rounded-lg text-center"
          />
          <span className="text-xs text-neutral-400">chars</span>
        </div>
      </div>

      {/* Input */}
      <div className="mb-6">
        <label htmlFor="slug-generator-input" className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-2">
          Article or Page Title
        </label>
        <input
          id="slug-generator-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. How to Build a Monthly Debt Payment Plan Using Your Actual Income"
          className="w-full px-4 py-3 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
        />
      </div>

      {/* Output Slug Preview */}
      <div className="bg-teal-50/50 border border-teal-200/70 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            Generated URL Slug
          </span>
          <span className="text-xs text-teal-700 font-mono">
            {slug.length} characters
          </span>
        </div>
        <div className="p-3 bg-white border border-teal-200 rounded-lg font-mono text-sm text-teal-900 break-all select-all">
          {slug || <span className="text-neutral-400 font-sans italic">Your generated slug will appear here...</span>}
        </div>
        <div className="mt-2 text-[11px] text-teal-700/80">
          Example URL: <code className="bg-teal-100/50 px-1.5 py-0.5 rounded">https://moneymasterblog.site/{slug || 'your-slug'}</code>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <span className="text-xs text-neutral-500">
          Search-engine optimized slug.
        </span>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!slug}
          className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition ${
            copied
              ? 'bg-emerald-600 text-white'
              : slug
              ? 'bg-neutral-900 hover:bg-neutral-800 text-white'
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied Slug!' : 'Copy Slug'}
        </button>
      </div>
    </div>
  );
}
