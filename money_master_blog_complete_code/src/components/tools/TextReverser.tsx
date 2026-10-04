import React, { useState } from 'react';
import { Copy, Check, RotateCcw, ArrowLeftRight, FlipVertical } from 'lucide-react';

export default function TextReverser() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'chars' | 'words' | 'lines' | 'upsideDown'>('chars');
  const [copied, setCopied] = useState(false);

  const flipMap: Record<string, string> = {
    a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ', k: 'ʞ',
    l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ',
    w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
    A: '∀', B: 'ᗺ', C: 'Ɔ', D: 'ᗡ', E: 'Ǝ', F: 'Ⅎ', G: '⅁', H: 'H', I: 'I', J: 'ſ', K: 'ʞ',
    L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Ò', R: 'ᴚ', S: 'S', T: '⊥', U: '∩', V: 'Λ',
    W: 'M', X: 'X', Y: '⅄', Z: 'Z',
    '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '0': '0',
    '.': '˙', ',': '\'', '\'': ',', '"': ',,', '?': '¿', '!': '¡', '(': ')', ')': '(',
    '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<', '&': '⅋', '_': '‾',
  };

  const reverseCharacters = (str: string) => Array.from(str).reverse().join('');

  const reverseWords = (str: string) => {
    return str
      .split('\n')
      .map((line) => line.split(/\s+/).reverse().join(' '))
      .join('\n');
  };

  const reverseLines = (str: string) => {
    return str.split('\n').reverse().join('\n');
  };

  const flipUpsideDown = (str: string) => {
    return Array.from(str)
      .reverse()
      .map((char) => flipMap[char] || char)
      .join('');
  };

  const getReversedText = () => {
    if (!text) return '';
    switch (mode) {
      case 'chars':
        return reverseCharacters(text);
      case 'words':
        return reverseWords(text);
      case 'lines':
        return reverseLines(text);
      case 'upsideDown':
        return flipUpsideDown(text);
      default:
        return text;
    }
  };

  const outputText = getReversedText();

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSample = () => {
    setText('Money Master Blog provides simple online tools for everyday tasks.');
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-amber-600" />
            Online Text &amp; Word Reverser
          </h2>
          <p className="text-sm text-neutral-600">
            Reverse character order, flip words, invert lists, or create mirrored text instantly.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSample}
            className="px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition"
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

      {/* Mode Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => setMode('chars')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
            mode === 'chars'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
          }`}
        >
          Reverse Characters
        </button>
        <button
          type="button"
          onClick={() => setMode('words')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
            mode === 'words'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
          }`}
        >
          Reverse Word Order
        </button>
        <button
          type="button"
          onClick={() => setMode('lines')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
            mode === 'lines'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
          }`}
        >
          Reverse Lines
        </button>
        <button
          type="button"
          onClick={() => setMode('upsideDown')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
            mode === 'upsideDown'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
          }`}
        >
          <FlipVertical className="w-3.5 h-3.5" />
          Upside-Down Text
        </button>
      </div>

      {/* Split view */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="text-reverser-input" className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-2">
            Original Text
          </label>
          <textarea
            id="text-reverser-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste text to reverse..."
            rows={8}
            className="w-full p-3.5 text-sm font-sans border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
          />
        </div>
        <div>
          <span className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-2">
            Reversed Output ({mode})
          </span>
          <textarea
            readOnly
            value={outputText}
            placeholder="Reversed text will appear here..."
            rows={8}
            className="w-full p-3.5 text-sm font-sans border border-neutral-300 rounded-xl bg-neutral-50 text-neutral-900 focus:outline-none"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <span className="text-xs text-neutral-500">
          Reversed instantly on your device.
        </span>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!outputText}
          className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition ${
            copied
              ? 'bg-emerald-600 text-white'
              : outputText
              ? 'bg-neutral-900 hover:bg-neutral-800 text-white'
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied Reversed Text!' : 'Copy Reversed Text'}
        </button>
      </div>
    </div>
  );
}
