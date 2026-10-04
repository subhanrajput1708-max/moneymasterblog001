import React, { useState } from 'react';
import { Copy, Check, RotateCcw, Braces, AlertCircle, CheckCircle2, ArrowDownAZ } from 'lucide-react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [indentSize, setIndentSize] = useState<'2' | '4' | 'tab'>('2');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const formatJson = (spaces: '2' | '4' | 'tab') => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const indent = spaces === 'tab' ? '\t' : parseInt(spaces);
      const formatted = JSON.stringify(parsed, null, indent);
      setInput(formatted);
      setError(null);
      setIsValid(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Syntax error in JSON string.');
      }
      setIsValid(false);
    }
  };

  const minifyJson = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setInput(minified);
      setError(null);
      setIsValid(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Invalid JSON syntax cannot be minified.');
      }
      setIsValid(false);
    }
  };

  const sortKeys = () => {
    if (!input.trim()) return;
    try {
      const sortObject = (obj: any): any => {
        if (typeof obj !== 'object' || obj === null) return obj;
        if (Array.isArray(obj)) return obj.map(sortObject);
        return Object.keys(obj)
          .sort()
          .reduce((acc: any, key) => {
            acc[key] = sortObject(obj[key]);
            return acc;
          }, {});
      };
      const parsed = JSON.parse(input);
      const sorted = sortObject(parsed);
      const indent = indentSize === 'tab' ? '\t' : parseInt(indentSize);
      setInput(JSON.stringify(sorted, null, indent));
      setError(null);
      setIsValid(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
      setIsValid(false);
    }
  };

  const handleCopy = () => {
    if (!input) return;
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSample = () => {
    const sample = {
      site: 'Money Master Blog',
      category: 'Financial Tools & Guides',
      version: '2026.1',
      toolsCount: 25,
      features: ['100% Client-Side', 'Zero Server Tracking', 'Mobile Responsive'],
      author: {
        name: 'Shahid Ali',
        experience: '7 years practical experience in digital content workflows',
      },
      published: true,
    };
    setInput(JSON.stringify(sample));
    setError(null);
    setIsValid(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <Braces className="w-5 h-5 text-emerald-600" />
            JSON Formatter, Validator &amp; Minifier
          </h2>
          <p className="text-sm text-neutral-600">
            Beautify, validate syntax, sort keys alphabetically, and minify JSON payloads client-side.
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
            onClick={() => {
              setInput('');
              setError(null);
              setIsValid(null);
            }}
            className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 bg-neutral-50 p-3 rounded-xl border border-neutral-200">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIndentSize('2');
              formatJson('2');
            }}
            disabled={!input.trim()}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-800 transition disabled:opacity-50"
          >
            Format (2 Spaces)
          </button>
          <button
            type="button"
            onClick={() => {
              setIndentSize('4');
              formatJson('4');
            }}
            disabled={!input.trim()}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-800 transition disabled:opacity-50"
          >
            Format (4 Spaces)
          </button>
          <button
            type="button"
            onClick={minifyJson}
            disabled={!input.trim()}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-800 transition disabled:opacity-50"
          >
            Minify (Compact)
          </button>
          <button
            type="button"
            onClick={sortKeys}
            disabled={!input.trim()}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-800 transition disabled:opacity-50 flex items-center gap-1"
          >
            <ArrowDownAZ className="w-3.5 h-3.5 text-emerald-600" />
            Sort Keys
          </button>
        </div>

        {isValid !== null && (
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            {isValid ? (
              <span className="text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Valid JSON
              </span>
            ) : (
              <span className="text-red-700 bg-red-100/70 px-2.5 py-1 rounded-full flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Invalid JSON
              </span>
            )}
          </div>
        )}
      </div>

      {/* Editor */}
      <div className="mb-4">
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Paste raw, unformatted, or minified JSON here..."
          rows={14}
          className={`w-full p-4 text-xs font-mono border rounded-xl focus:ring-2 bg-white ${
            error
              ? 'border-red-300 focus:ring-red-400 focus:border-red-400'
              : 'border-neutral-300 focus:ring-emerald-500 focus:border-emerald-500'
          }`}
        />
      </div>

      {/* Error alert */}
      {error && (
        <div className="mb-4 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs font-mono text-red-800 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold mb-0.5">JSON Parsing Error:</strong>
            {error}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <span className="text-xs text-neutral-500">
          Evaluated locally using browser V8 JSON parser.
        </span>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!input.trim()}
          className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition ${
            copied
              ? 'bg-emerald-600 text-white'
              : input.trim()
              ? 'bg-neutral-900 hover:bg-neutral-800 text-white'
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied JSON!' : 'Copy JSON'}
        </button>
      </div>
    </div>
  );
}
