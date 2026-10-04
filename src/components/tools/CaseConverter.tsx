import React, { useState } from 'react';
import { Copy, Check, RotateCcw, CaseSensitive, Sparkles } from 'lucide-react';

export default function CaseConverter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  // Conversion helpers
  const toUpperCase = (str: string) => str.toUpperCase();
  const toLowerCase = (str: string) => str.toLowerCase();

  const toSentenceCase = (str: string) => {
    return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const toTitleCase = (str: string) => {
    const minorWords = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet']);
    return str
      .toLowerCase()
      .split(/(\s+)/)
      .map((word, index) => {
        const clean = word.toLowerCase().trim();
        if (!clean) return word;
        if (index > 0 && minorWords.has(clean)) {
          return clean;
        }
        return clean.charAt(0).toUpperCase() + clean.slice(1);
      })
      .join('');
  };

  const toWords = (str: string) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/[_\-]+/g, ' ')
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  };

  const toCamelCase = (str: string) => {
    const words = toWords(str);
    if (!words.length) return '';
    return words
      .map((w, idx) => (idx === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
      .join('');
  };

  const toPascalCase = (str: string) => {
    const words = toWords(str);
    return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
  };

  const toSnakeCase = (str: string) => {
    const words = toWords(str);
    return words.map((w) => w.toLowerCase()).join('_');
  };

  const toConstantCase = (str: string) => {
    const words = toWords(str);
    return words.map((w) => w.toUpperCase()).join('_');
  };

  const toKebabCase = (str: string) => {
    const words = toWords(str);
    return words.map((w) => w.toLowerCase()).join('-');
  };

  const toAlternatingCase = (str: string) => {
    let flag = false;
    return str
      .split('')
      .map((char) => {
        if (/[a-zA-Z]/.test(char)) {
          flag = !flag;
          return flag ? char.toUpperCase() : char.toLowerCase();
        }
        return char;
      })
      .join('');
  };

  const applyCase = (transformFn: (s: string) => string) => {
    if (!text) return;
    setText(transformFn(text));
  };

  const copyResult = (content: string, label: string) => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSample = () => {
    setText('how to calculate the real cost of a personal loan before applying');
  };

  const transformations = [
    { label: 'Sentence case', fn: toSentenceCase, example: 'Capitalizes the first letter of each sentence.' },
    { label: 'Title Case', fn: toTitleCase, example: 'Capitalizes primary words for article headlines.' },
    { label: 'UPPERCASE', fn: toUpperCase, example: 'CONVERTS ALL CHARACTERS TO CAPITAL LETTERS.' },
    { label: 'lowercase', fn: toLowerCase, example: 'converts all characters to lowercase letters.' },
    { label: 'camelCase', fn: toCamelCase, example: 'usefulForCodeVariablesAndIdentifiers' },
    { label: 'PascalCase', fn: toPascalCase, example: 'UsefulForClassNamesAndReactComponents' },
    { label: 'snake_case', fn: toSnakeCase, example: 'useful_for_database_columns_and_python' },
    { label: 'CONSTANT_CASE', fn: toConstantCase, example: 'USEFUL_FOR_GLOBAL_CONFIG_CONSTANTS' },
    { label: 'kebab-case', fn: toKebabCase, example: 'useful-for-urls-and-css-classes' },
    { label: 'aLtErNaTiNg cAsE', fn: toAlternatingCase, example: 'aLtErNaTeS lOwEr AnD uPpEr CaSe' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <CaseSensitive className="w-5 h-5 text-violet-600" />
            Universal Text Case Converter
          </h2>
          <p className="text-sm text-neutral-600">
            Convert text between standard typographic and coding case conventions in one click.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSample}
            className="px-3 py-1.5 text-xs font-medium text-violet-700 bg-violet-50 hover:bg-violet-100 rounded-lg transition"
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

      {/* Editor */}
      <div className="mb-6">
        <label htmlFor="case-converter-input" className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-2">
          Your Text
        </label>
        <textarea
          id="case-converter-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type text here, then choose a case format below..."
          rows={6}
          className="w-full p-4 text-sm font-sans border border-neutral-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white"
        />
      </div>

      {/* Conversion Buttons Grid */}
      <div className="mb-6">
        <span className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-violet-600" />
          Click to Apply Format
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {transformations.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => applyCase(t.fn)}
              disabled={!text}
              className={`p-3 rounded-xl border text-left text-xs font-medium transition flex flex-col justify-between ${
                text
                  ? 'border-neutral-200 bg-neutral-50 hover:bg-violet-50 hover:border-violet-300 text-neutral-800'
                  : 'border-neutral-100 bg-neutral-50/50 text-neutral-400 cursor-not-allowed'
              }`}
            >
              <span className="font-bold text-neutral-900 mb-1">{t.label}</span>
              <span className="text-[10px] text-neutral-500 line-clamp-1">{t.example}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Copy Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <span className="text-xs text-neutral-500">
          Character count: {text.length}
        </span>
        <button
          type="button"
          onClick={() => copyResult(text, 'main')}
          disabled={!text}
          className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition ${
            copied === 'main'
              ? 'bg-emerald-600 text-white'
              : text
              ? 'bg-neutral-900 hover:bg-neutral-800 text-white'
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
          }`}
        >
          {copied === 'main' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied === 'main' ? 'Copied Current Text!' : 'Copy Converted Text'}
        </button>
      </div>
    </div>
  );
}
