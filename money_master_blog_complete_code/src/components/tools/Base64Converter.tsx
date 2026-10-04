import React, { useState } from 'react';
import { Copy, Check, RotateCcw, ArrowUpDown, Code, AlertTriangle } from 'lucide-react';

export default function Base64Converter() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [urlSafe, setUrlSafe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // UTF-8 friendly Base64 encode
  const encodeBase64 = (str: string) => {
    try {
      const bytes = new TextEncoder().encode(str);
      const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
      let encoded = btoa(binString);
      if (urlSafe) {
        encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      }
      return encoded;
    } catch {
      return '';
    }
  };

  // UTF-8 friendly Base64 decode
  const decodeBase64 = (str: string) => {
    try {
      let clean = str.trim();
      if (urlSafe) {
        clean = clean.replace(/-/g, '+').replace(/_/g, '/');
        while (clean.length % 4) {
          clean += '=';
        }
      }
      const binString = atob(clean);
      const bytes = Uint8Array.from(binString, (m) => m.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error('Invalid Base64 sequence: verify padding and character set.');
      }
      throw new Error('Failed to decode Base64 data.');
    }
  };

  let output = '';
  let currentError: string | null = null;

  if (input) {
    try {
      if (mode === 'encode') {
        output = encodeBase64(input);
      } else {
        output = decodeBase64(input);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        currentError = e.message;
      } else {
        currentError = 'Decoding error.';
      }
    }
  }

  const handleSwap = () => {
    if (output && !currentError) {
      setInput(output);
      setMode(mode === 'encode' ? 'decode' : 'encode');
      setError(null);
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
      setInput('Hello, Money Master Blog! Tools hub 2026.');
    } else {
      setInput('SGVsbG8sIE1vbmV5IE1hc3RlciBCbG9nISBUb29scyBodWIgMjAyNi4=');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <Code className="w-5 h-5 text-cyan-600" />
            Base64 Encoder &amp; Decoder
          </h2>
          <p className="text-sm text-neutral-600">
            Convert UTF-8 text to Base64 or decode Base64 strings safely with error diagnostics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSample}
            className="px-3 py-1.5 text-xs font-medium text-cyan-700 bg-cyan-50 hover:bg-cyan-100 rounded-lg transition"
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
                mode === 'encode' ? 'bg-cyan-600 text-white' : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Encode to Base64
            </button>
            <button
              type="button"
              onClick={() => setMode('decode')}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                mode === 'decode' ? 'bg-cyan-600 text-white' : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Decode from Base64
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

        <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-neutral-700">
          <input
            type="checkbox"
            checked={urlSafe}
            onChange={(e) => setUrlSafe(e.target.checked)}
            className="rounded text-cyan-600 focus:ring-cyan-500 w-4 h-4"
          />
          URL-Safe Base64 (- and _ instead of + and /)
        </label>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="base64-input" className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-2">
            {mode === 'encode' ? 'Plain Text Input (UTF-8)' : 'Base64 Input'}
          </label>
          <textarea
            id="base64-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Type or paste plain text to encode...' : 'Paste Base64 string to decode...'}
            rows={8}
            className="w-full p-3.5 text-sm font-mono border border-neutral-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white"
          />
        </div>

        <div>
          <span className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-2">
            {mode === 'encode' ? 'Base64 Output' : 'Decoded Plain Text'}
          </span>
          {currentError ? (
            <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs font-mono h-48 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              <div>
                <strong className="block font-semibold mb-1">Decoding Failed</strong>
                {currentError}
              </div>
            </div>
          ) : (
            <textarea
              readOnly
              value={output}
              placeholder={mode === 'encode' ? 'Base64 string will appear here...' : 'Decoded text will appear here...'}
              rows={8}
              className="w-full p-3.5 text-sm font-mono border border-neutral-300 rounded-xl bg-neutral-50 text-neutral-900 focus:outline-none"
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <span className="text-xs text-neutral-500">
          Full UTF-8 support. Encoded locally in your browser.
        </span>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!output || !!currentError}
          className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition ${
            copied
              ? 'bg-emerald-600 text-white'
              : output && !currentError
              ? 'bg-neutral-900 hover:bg-neutral-800 text-white'
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied Result!' : 'Copy Result'}
        </button>
      </div>
    </div>
  );
}
