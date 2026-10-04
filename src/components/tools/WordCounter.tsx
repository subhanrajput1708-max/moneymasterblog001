import React, { useState, useMemo } from 'react';
import { Copy, Check, RotateCcw, Clock, Volume2, AlignLeft, Hash } from 'lucide-react';

export default function WordCounter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const raw = text;
    const trimmed = raw.trim();

    const charactersWithSpaces = raw.length;
    const charactersWithoutSpaces = raw.replace(/\s/g, '').length;

    const wordsArray = trimmed ? trimmed.split(/\s+/).filter((w) => w.length > 0) : [];
    const words = wordsArray.length;

    // Sentences count: split by . ! ? followed by whitespace or end of string
    const sentences = trimmed
      ? (trimmed.match(/[.!?]+(?=\s|$)/g) || []).length || (trimmed.length > 0 ? 1 : 0)
      : 0;

    // Paragraphs count: split by one or more blank lines
    const paragraphs = trimmed
      ? trimmed.split(/\n+/).filter((p) => p.trim().length > 0).length
      : 0;

    // Reading time: standard 200 wpm
    const readingMinutes = words > 0 ? Math.ceil(words / 200) : 0;
    // Speaking time: standard 130 wpm
    const speakingMinutes = words > 0 ? Math.ceil(words / 130) : 0;

    // Keyword density: top words (excluding common stop words if longer than 3 chars)
    const stopWords = new Set(['the', 'and', 'for', 'that', 'this', 'with', 'from', 'have', 'were', 'which', 'your', 'about']);
    const frequencyMap: Record<string, number> = {};
    for (const w of wordsArray) {
      const cleanWord = w.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (cleanWord.length > 2 && !stopWords.has(cleanWord)) {
        frequencyMap[cleanWord] = (frequencyMap[cleanWord] || 0) + 1;
      }
    }

    const topKeywords = Object.entries(frequencyMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({
        word,
        count,
        percent: words > 0 ? ((count / words) * 100).toFixed(1) : '0',
      }));

    return {
      words,
      charactersWithSpaces,
      charactersWithoutSpaces,
      sentences,
      paragraphs,
      readingMinutes,
      speakingMinutes,
      topKeywords,
    };
  }, [text]);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSample = () => {
    setText(
      'Calculating the real cost of a loan requires analyzing interest rates, loan terms, and origination fees. ' +
      'When borrowers examine only monthly installments, they frequently miss substantial lifetime finance charges.\n\n' +
      'By comparing total repayment obligations before signing any contract, you protect your long-term savings and ensure that borrowing remains manageable.'
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <AlignLeft className="w-5 h-5 text-blue-600" />
            Real-Time Word &amp; Character Counter
          </h2>
          <p className="text-sm text-neutral-600">
            Measure words, characters, sentences, paragraphs, reading speed, and top keyword frequencies.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSample}
            className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
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

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5 text-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-blue-900 block leading-tight">
            {stats.words.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
            Total Words
          </span>
        </div>
        <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3.5 text-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-900 block leading-tight">
            {stats.charactersWithSpaces.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            Characters
          </span>
        </div>
        <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-3.5 text-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-purple-900 block leading-tight">
            {stats.sentences.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">
            Sentences
          </span>
        </div>
        <div className="bg-amber-50/70 border border-amber-100 rounded-xl p-3.5 text-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-900 block leading-tight">
            {stats.paragraphs.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
            Paragraphs
          </span>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="flex flex-wrap items-center gap-4 py-2 px-3 bg-neutral-50 rounded-lg text-xs text-neutral-600 mb-4 border border-neutral-200/60">
        <div>
          Characters (no spaces):{' '}
          <strong className="text-neutral-900">{stats.charactersWithoutSpaces}</strong>
        </div>
        <div>•</div>
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-neutral-500" />
          Reading time: <strong className="text-neutral-900">~{stats.readingMinutes} min</strong>
        </div>
        <div>•</div>
        <div className="flex items-center gap-1">
          <Volume2 className="w-3.5 h-3.5 text-neutral-500" />
          Speaking time: <strong className="text-neutral-900">~{stats.speakingMinutes} min</strong>
        </div>
      </div>

      {/* Editor Box */}
      <div className="mb-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your article, essay, or draft here..."
          rows={10}
          className="w-full p-4 text-sm font-sans border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
        />
      </div>

      {/* Keyword Density / Top Terms */}
      {stats.topKeywords.length > 0 && (
        <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 mb-6">
          <h3 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-blue-600" />
            Top Keyword Frequency
          </h3>
          <div className="flex flex-wrap gap-2">
            {stats.topKeywords.map((kw) => (
              <span
                key={kw.word}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-neutral-200 rounded-md text-xs text-neutral-800 shadow-2xs"
              >
                <span className="font-medium">{kw.word}</span>
                <span className="text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded text-[10px]">
                  {kw.count}x ({kw.percent}%)
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <span className="text-xs text-neutral-500">
          Evaluated locally in real time.
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
