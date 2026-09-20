import React, { useState } from 'react';
import { Copy, Check, RefreshCw, FileText } from 'lucide-react';

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'placerat', 'orci', 'nulla',
  'pellentesque', 'dignissim', 'praesent', 'sollicitudin', 'mollis', 'dictum', 'facilisi'
];

export default function LoremIpsumGenerator() {
  const [count, setCount] = useState<number>(3);
  const [unit, setUnit] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const generateParagraph = (): string => {
    const sentenceCount = 4 + Math.floor(Math.random() * 4);
    const sentences = Array.from({ length: sentenceCount }, () => {
      const wordCount = 8 + Math.floor(Math.random() * 10);
      const words = Array.from({ length: wordCount }, () =>
        LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]
      );
      const capitalized = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      return [capitalized, ...words.slice(1)].join(' ') + '.';
    });
    return sentences.join(' ');
  };

  const generateText = (): string => {
    if (unit === 'words') {
      const words = Array.from({ length: count }, () =>
        LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]
      );
      if (startWithLorem && count >= 2) {
        words[0] = 'lorem';
        words[1] = 'ipsum';
      }
      return words.join(' ');
    }

    if (unit === 'sentences') {
      const sentences = Array.from({ length: count }, (_, i) => {
        const wordCount = 7 + Math.floor(Math.random() * 8);
        const words = Array.from({ length: wordCount }, () =>
          LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]
        );
        if (i === 0 && startWithLorem && words.length >= 2) {
          words[0] = 'Lorem';
          words[1] = 'ipsum';
        } else {
          words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        }
        return words.join(' ') + '.';
      });
      return sentences.join(' ');
    }

    // Paragraphs
    const paras = Array.from({ length: count }, (_, i) => {
      let para = generateParagraph();
      if (i === 0 && startWithLorem) {
        para = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + para;
      }
      return para;
    });
    return paras.join('\n\n');
  };

  const [text, setText] = useState<string>(generateText());

  const handleRegenerate = () => {
    setText(generateText());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="lorem-ipsum-tool" className="w-full bg-white border border-neutral-200 rounded-xl p-5 md:p-8 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
              Design & Writing
            </span>
            <span className="text-xs text-neutral-600">Placeholder Text</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mt-1">Lorem Ipsum Generator</h3>
          <p className="text-sm text-neutral-600 mt-0.5">
            Quickly create mock text layouts for mockups, prototypes, templates, and testing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRegenerate}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg text-sm font-medium border border-neutral-300 transition-colors cursor-pointer min-h-[44px]"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Regenerate</span>
          </button>

          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer min-h-[44px] ${
              copied
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'bg-neutral-900 border-neutral-900 text-white hover:bg-neutral-800'
            }`}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy Text'}</span>
          </button>
        </div>
      </div>

      {/* Control row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5 p-4 bg-neutral-50 border border-neutral-200 rounded-lg text-sm">
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5 uppercase">Quantity</label>
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value))))}
            className="w-full bg-white px-3 py-2 border border-neutral-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5 uppercase">Type</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as any)}
            className="w-full bg-white px-3 py-2 border border-neutral-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
          >
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>

        <div className="flex items-center sm:pt-6">
          <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-neutral-800 select-none">
            <input
              type="checkbox"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="w-4 h-4 rounded text-neutral-900 accent-neutral-900"
            />
            <span>Start with "Lorem ipsum"</span>
          </label>
        </div>
      </div>

      {/* Text Output Box */}
      <div className="relative">
        <textarea
          readOnly
          value={text}
          rows={7}
          className="w-full p-4 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-800 text-sm leading-relaxed font-serif focus:outline-hidden"
        />
      </div>
    </div>
  );
}
