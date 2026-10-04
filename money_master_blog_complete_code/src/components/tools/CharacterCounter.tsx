import React, { useState, useMemo } from 'react';
import { Copy, Check, RotateCcw, Type, AlertCircle } from 'lucide-react';

export default function CharacterCounter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const raw = text;
    const totalChars = raw.length;
    const noSpaces = raw.replace(/\s/g, '').length;
    const letters = (raw.match(/[a-zA-Z]/g) || []).length;
    const numbers = (raw.match(/[0-9]/g) || []).length;
    const spaces = (raw.match(/\s/g) || []).length;
    const symbols = totalChars - letters - numbers - spaces;

    return {
      totalChars,
      noSpaces,
      letters,
      numbers,
      spaces,
      symbols,
    };
  }, [text]);

  const limits = [
    { label: 'Google Search Title', max: 60, color: 'blue' },
    { label: 'Meta Description (SEO)', max: 160, color: 'emerald' },
    { label: 'Twitter / X Post', max: 280, color: 'sky' },
    { label: 'Standard SMS (GSM-7)', max: 160, color: 'purple' },
    { label: 'LinkedIn Post Headline', max: 220, color: 'indigo' },
  ];

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSample = () => {
    setText('How to Calculate the Real Cost of a Personal Loan Before Applying – Practical Guide');
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <Type className="w-5 h-5 text-indigo-600" />
            Character Counter &amp; Social Media Limit Checker
          </h2>
          <p className="text-sm text-neutral-600">
            Monitor exact character counts, letters, digits, and evaluate constraints for SEO and social posts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSample}
            className="px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition"
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

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3 text-center">
          <span className="text-2xl font-extrabold text-indigo-900 block leading-tight">
            {stats.totalChars}
          </span>
          <span className="text-[11px] font-semibold text-indigo-700 uppercase tracking-wider">
            Total Chars
          </span>
        </div>
        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-center">
          <span className="text-2xl font-extrabold text-neutral-800 block leading-tight">
            {stats.noSpaces}
          </span>
          <span className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider">
            No Spaces
          </span>
        </div>
        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-center">
          <span className="text-2xl font-extrabold text-neutral-800 block leading-tight">
            {stats.letters}
          </span>
          <span className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider">
            Letters
          </span>
        </div>
        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-center">
          <span className="text-2xl font-extrabold text-neutral-800 block leading-tight">
            {stats.numbers}
          </span>
          <span className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider">
            Numbers
          </span>
        </div>
        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-center">
          <span className="text-2xl font-extrabold text-neutral-800 block leading-tight">
            {stats.spaces}
          </span>
          <span className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider">
            Spaces
          </span>
        </div>
        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-center">
          <span className="text-2xl font-extrabold text-neutral-800 block leading-tight">
            {stats.symbols}
          </span>
          <span className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider">
            Symbols
          </span>
        </div>
      </div>

      {/* Editor */}
      <div className="mb-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type text to check character limits in real time..."
          rows={6}
          className="w-full p-4 text-sm font-sans border border-neutral-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
        />
      </div>

      {/* Platform Limit Bars */}
      <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200 mb-6">
        <h3 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-4">
          Platform Character Constraints
        </h3>
        <div className="space-y-4">
          {limits.map((lim) => {
            const ratio = Math.min(100, Math.round((stats.totalChars / lim.max) * 100));
            const isOver = stats.totalChars > lim.max;
            const remaining = lim.max - stats.totalChars;

            return (
              <div key={lim.label}>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-medium text-neutral-800">{lim.label}</span>
                  <span className={`font-semibold ${isOver ? 'text-red-600' : 'text-neutral-600'}`}>
                    {stats.totalChars} / {lim.max}{' '}
                    {isOver ? (
                      <span className="inline-flex items-center gap-1 text-red-600">
                        <AlertCircle className="w-3 h-3" /> ({Math.abs(remaining)} over limit)
                      </span>
                    ) : (
                      <span className="text-neutral-400">({remaining} left)</span>
                    )}
                  </span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isOver ? 'bg-red-500' : ratio > 85 ? 'bg-amber-500' : 'bg-indigo-600'
                    }`}
                    style={{ width: `${Math.min(100, ratio)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <span className="text-xs text-neutral-500">
          Client-side UTF-16 character count.
        </span>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!text}
          className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition ${
            copied
              ? 'bg-emerald-600 text-white'
              : text
              ? 'bg-neutral-900 hover:bg-neutral-800 text-white'
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied Text!' : 'Copy Text'}
        </button>
      </div>
    </div>
  );
}
