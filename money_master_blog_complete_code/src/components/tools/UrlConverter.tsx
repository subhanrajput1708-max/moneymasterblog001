import React, { useState } from 'react';
import { Copy, Check, RotateCcw, ArrowUpDown, Globe, AlertTriangle } from 'lucide-react';

export default function UrlConverter() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [encodeType, setEncodeType] = useState<'component' | 'full'>('component');
  const [copied, setCopied] = useState(false);

  let output = '';
  let error: string | null = null;

  if (input) {
    try {
      if (mode === 'encode') {
        output = encodeType === 'component' ? encodeURIComponent(input) : encodeURI(input);
      } else {
        // Decode both standard %20 and legacy query + signs
        const prepared = input.replace(/\+/g, ' ');
        output = decodeURIComponent(prepared);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        error = e.message;
      } else {
        error = 'Malformed URI sequence.';
      }
    }
  }

  const handleSwap = () => {
    if (output && !error) {
      setInput(output);
      setMode(mode === 'encode' ? 'decode' : 'encode');
    } else {
      setMode(mode === 'encode' ? 'decode' : 'encode');
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSample = () => {
    if (mode === 'encode') {
      setInput('https://moneymasterblog.site/search?q=personal loan & credit cards 2026');
    } else {
      setInput('https%3A%2F%2Fmoneymasterblog.site%2Fsearch%3Fq%3Dpersonal%20loan%20%26%20credit%20cards%202026');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-sky-600" />
            URL Percent Encoder &amp; Decoder
          </h2>
          <p className="text-sm text-neutral-600">
            Encode URLs for safe browser transmission or decode percent-encoded strings to readable text.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSample}
            className="px-3 py-1.5 text-xs font-medium text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg transition"
          >
            Load Sample
          </button>
          <button
            type="button"
            onClick={() => setInput('')}
            className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* Mode Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-neutral-50 p-3 rounded-xl border border-neutral-200">
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg border border-neutral-300 p-0.5 bg-white text-xs">
            <button
              type="button"
              onClick={() => setMode('encode')}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                mode === 'encode' ? 'bg-sky-600 text-white' : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Encode URL
            </button>
            <button
              type="button"
              onClick={() => setMode('decode')}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                mode === 'decode' ? 'bg-sky-600 text-white' : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Decode URL
            </button>
          </div>

          <button
            type="button"
            onClick={handleSwap}
            title="Swap input and output"
            className="p-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 transition"
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </div>

        {mode === 'encode' && (
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-neutral-700">Encoding Mode:</span>
            <button
              type="button"
              onClick={() => setEncodeType('component')}
              className={`px-2.5 py-1 rounded-md transition ${
                encodeType === 'component' ? 'bg-sky-100 text-sky-800 font-semibold' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              encodeURIComponent (Query params)
            </button>
            <button
              type="button"
              onClick={() => setEncodeType('full')}
              className={`px-2.5 py-1 rounded-md transition ${
                encodeType === 'full' ? 'bg-sky-100 text-sky-800 font-semibold' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              encodeURI (Full URL)
            </button>
          </div>
        )}
      </div>

      {/* Editor split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="url-converter-input" className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-2">
            {mode === 'encode' ? 'Plain URL or Query String' : 'Encoded URL Input'}
          </label>
          <textarea
            id="url-converter-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Paste clean URL to encode...' : 'Paste %-encoded URL to decode...'}
            rows={8}
            className="w-full p-3.5 text-sm font-mono border border-neutral-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
          />
        </div>

        <div>
          <span className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-2">
            {mode === 'encode' ? 'Encoded URL Output' : 'Decoded URL Output'}
          </span>
          {error ? (
            <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs font-mono h-48 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              <div>
                <strong className="block font-semibold mb-1">Malformed URL Sequence</strong>
                {error}
              </div>
            </div>
          ) : (
            <textarea
              readOnly
              value={output}
              placeholder={mode === 'encode' ? 'Encoded string will appear here...' : 'Decoded URL will appear here...'}
              rows={8}
              className="w-full p-3.5 text-sm font-mono border border-neutral-300 rounded-xl bg-neutral-50 text-neutral-900 focus:outline-none"
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <span className="text-xs text-neutral-500">
          Complies with RFC 3986 percent-encoding standards.
        </span>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!output || !!error}
          className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition ${
            copied
              ? 'bg-emerald-600 text-white'
              : output && !error
              ? 'bg-neutral-900 hover:bg-neutral-800 text-white'
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied URL!' : 'Copy Result'}
        </button>
      </div>
    </div>
  );
}
