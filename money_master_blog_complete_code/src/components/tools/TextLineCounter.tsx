import React, { useState, useMemo } from 'react';
import { Hash, Copy, Check, Trash2, BookOpen, Lightbulb, Shield, AlignLeft } from 'lucide-react';
import { ToolId } from '../../types';
import FaqSection, { FaqItem } from '../common/FaqSection';

interface TextLineCounterProps {
  onSelectTool?: (toolId: ToolId) => void;
}

export default function TextLineCounter({ onSelectTool }: TextLineCounterProps) {
  const [text, setText] = useState<string>(
    'Money Master Blog provides simple browser utilities.\n\nEach tool is crafted with care by Shahid Ali.\nFast, responsive, and privacy-friendly.\n\nNo accounts or server uploads required.'
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [notice, setNotice] = useState<string | null>(null);

  const notify = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 2500);
  };

  // Live statistics calculation
  const stats = useMemo(() => {
    if (!text) {
      return {
        totalLines: 0,
        nonEmptyLines: 0,
        emptyLines: 0,
        characters: 0,
        charactersWithoutSpaces: 0,
        words: 0,
        longestLineLength: 0,
        longestLineNumber: 0,
        shortestLineLength: 0,
        shortestLineNumber: 0,
      };
    }

    const lines = text.split(/\r?\n/);
    const totalLines = lines.length;
    const characters = text.length;
    const charactersWithoutSpaces = text.replace(/\s/g, '').length;
    const words = text.trim().split(/\s+/).filter(Boolean).length;

    let nonEmptyLines = 0;
    let emptyLines = 0;
    let longestLineLength = 0;
    let longestLineNumber = 0;
    let shortestLineLength = Infinity;
    let shortestLineNumber = 0;

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      const length = line.length;

      if (trimmed.length === 0) {
        emptyLines++;
      } else {
        nonEmptyLines++;
        if (length > longestLineLength) {
          longestLineLength = length;
          longestLineNumber = index + 1;
        }
        if (length < shortestLineLength) {
          shortestLineLength = length;
          shortestLineNumber = index + 1;
        }
      }
    });

    if (shortestLineLength === Infinity) {
      shortestLineLength = 0;
    }

    return {
      totalLines,
      nonEmptyLines,
      emptyLines,
      characters,
      charactersWithoutSpaces,
      words,
      longestLineLength,
      longestLineNumber,
      shortestLineLength,
      shortestLineNumber,
    };
  }, [text]);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    notify('Copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
    notify('Cleared text');
  };

  const faqs: FaqItem[] = [
    {
      question: 'What does a line counter measure?',
      answer:
        'A line counter measures the vertical line structure of a document, quantifying total line count, non-empty content lines, blank lines, total characters, characters excluding spaces, and word volume.',
    },
    {
      question: 'What is considered an empty line?',
      answer:
        'An empty line is any line that contains no visible characters or contains only invisible whitespace characters (such as spaces and tabs) between newline delimiters.',
    },
    {
      question: 'Does the tool count words in addition to lines?',
      answer:
        'Yes. The tool counts words using standard whitespace tokenization, accurately updating word metrics alongside line counts as you type or paste.',
    },
    {
      question: 'Does it count spaces as characters?',
      answer:
        'The tool provides both metrics: "Characters" (which includes all spaces, tabs, and newlines) and "Characters Without Spaces" (which measures strictly non-whitespace glyphs).',
    },
    {
      question: 'What is the longest line metric?',
      answer:
        'The longest line metric identifies the highest character count of any individual line in your document, along with the specific line number where it appears.',
    },
    {
      question: 'Can it analyze large amounts of pasted text?',
      answer:
        'Yes. You can paste extensive multi-page documents, code files, CSV exports, or books. Calculations are executed in microseconds directly in your browser.',
    },
    {
      question: 'Does the line counter work on mobile devices?',
      answer:
        'Yes. The line counter is completely responsive and touch-optimized for iPhones, Android smartphones, iPads, and desktop computers.',
    },
    {
      question: 'Are the results updated automatically while typing?',
      answer:
        'Yes. Every keystroke, character deletion, or paste triggers immediate metric recalculation in real time with zero delay or submission required.',
    },
  ];

  return (
    <div id="text-line-counter-tool" className="w-full space-y-8">
      {/* Interactive Tool Card */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 md:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                Text Utility
              </span>
              <span className="text-xs text-neutral-500">Live Text Metrics</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mt-1">Text Line Counter</h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Count lines in a text input and provide useful basic text statistics.
            </p>
          </div>

          {notice && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white text-xs rounded-lg animate-fade-in self-start sm:self-center">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>{notice}</span>
            </div>
          )}
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mt-6">
          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-center">
            <span className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Total Lines</span>
            <span className="text-xl font-extrabold text-neutral-900 font-mono mt-0.5 block">{stats.totalLines}</span>
          </div>

          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-center">
            <span className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Non-Empty</span>
            <span className="text-xl font-extrabold text-neutral-900 font-mono mt-0.5 block">{stats.nonEmptyLines}</span>
          </div>

          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-center">
            <span className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Empty Lines</span>
            <span className="text-xl font-extrabold text-neutral-900 font-mono mt-0.5 block">{stats.emptyLines}</span>
          </div>

          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-center">
            <span className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Words</span>
            <span className="text-xl font-extrabold text-neutral-900 font-mono mt-0.5 block">{stats.words}</span>
          </div>

          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-center">
            <span className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Characters</span>
            <span className="text-xl font-extrabold text-neutral-900 font-mono mt-0.5 block">{stats.characters}</span>
          </div>

          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-center">
            <span className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider">No Spaces</span>
            <span className="text-xl font-extrabold text-neutral-900 font-mono mt-0.5 block">{stats.charactersWithoutSpaces}</span>
          </div>

          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-center">
            <span className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Longest Line</span>
            <span className="text-xl font-extrabold text-neutral-900 font-mono mt-0.5 block">
              {stats.longestLineLength} <span className="text-[10px] text-neutral-500 font-sans font-normal">chars</span>
            </span>
            {stats.longestLineNumber > 0 && (
              <span className="text-[10px] text-neutral-500 block">Line #{stats.longestLineNumber}</span>
            )}
          </div>

          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-center">
            <span className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Shortest Line</span>
            <span className="text-xl font-extrabold text-neutral-900 font-mono mt-0.5 block">
              {stats.shortestLineLength} <span className="text-[10px] text-neutral-500 font-sans font-normal">chars</span>
            </span>
            {stats.shortestLineNumber > 0 && (
              <span className="text-[10px] text-neutral-500 block">Line #{stats.shortestLineNumber}</span>
            )}
          </div>
        </div>

        {/* Text Input Workspace */}
        <div className="mt-6 space-y-2">
          <label htmlFor="line-counter-input" className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
            Live Text Editor
          </label>
          <textarea
            id="line-counter-input"
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste text here to inspect live line and character statistics..."
            className="w-full p-3.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 font-mono focus:bg-white focus:ring-2 focus:ring-neutral-900 focus:outline-hidden transition-all"
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-neutral-200 flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopy}
            disabled={!text}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-lg text-xs sm:text-sm transition-colors cursor-pointer min-h-[44px] shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleClear}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-neutral-300 hover:bg-red-50 hover:text-red-700 hover:border-red-200 text-neutral-700 font-medium rounded-lg text-xs sm:text-sm transition-colors cursor-pointer min-h-[44px]"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </button>

          {onSelectTool && (
            <div className="ml-auto text-xs text-neutral-500 hidden md:flex items-center gap-2">
              <span>Related:</span>
              <button
                onClick={() => onSelectTool('text-sorter')}
                className="text-neutral-900 underline hover:text-neutral-700 cursor-pointer"
              >
                Text Sorter
              </button>
              <span>•</span>
              <button
                onClick={() => onSelectTool('duplicate-remover')}
                className="text-neutral-900 underline hover:text-neutral-700 cursor-pointer"
              >
                Duplicate Line Remover
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Editorial Guide */}
      <section className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-start gap-3 border-b border-neutral-200 pb-4">
          <BookOpen className="w-5 h-5 text-neutral-900 mt-0.5 shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-neutral-900">
              Editorial Guide: Analyzing Text Density and Line Metrics
            </h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              Authored by Shahid Ali • 7 years practical digital workflow experience
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-neutral-700">
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">What Is a Text Line Counter?</h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                A text line counter is a real-time analytical utility that examines text structural characteristics. By measuring total lines, empty spaces, and line lengths, writers, editors, and programmers can quickly verify document constraints.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">What Can It Count?</h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                The counter monitors eight core metrics: total lines, populated lines with content, empty blank lines, gross word volume, total characters, characters excluding whitespace, and the exact character lengths and line positions of your longest and shortest sentences.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">How to Use the Tool</h4>
              <ol className="list-decimal pl-4 space-y-1 text-xs sm:text-sm text-neutral-600">
                <li>Paste or type your draft into the main editor textarea.</li>
                <li>Observe the live metric counters updating instantly across the top bar.</li>
                <li>Identify unusually long lines to check for missing line breaks.</li>
                <li>Click <strong>Copy Text</strong> when you are finished inspecting.</li>
              </ol>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">Common Practical Uses</h4>
              <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm text-neutral-600">
                <li><strong>Checking lists:</strong> Verify how many line entries exist in an exported roster or inventory.</li>
                <li><strong>Reviewing text:</strong> Check whether paragraphs meet stanza or length rules.</li>
                <li><strong>Counting lines in notes:</strong> Ensure meeting minutes or agenda items fit presentation slides.</li>
                <li><strong>Content preparation:</strong> Verify character counts for social meta tags and headings.</li>
                <li><strong>Basic text analysis:</strong> Compare text density between draft versions.</li>
                <li><strong>Reviewing copied text:</strong> Confirm that no empty trailing lines linger in CSV snippets.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">Understanding the Results</h4>
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs space-y-1.5 text-neutral-600">
                <div><strong>Total vs Non-Empty:</strong> The difference between these two reveals exactly how many blank lines or double spacers exist.</div>
                <div><strong>Characters vs No Spaces:</strong> Comparing these numbers shows how much of your text volume consists of spacing.</div>
                <div><strong>Longest Line:</strong> Shows which line contains the most characters, helping you catch unformatted long run-ons.</div>
              </div>
            </div>

            <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
              <h4 className="font-bold text-neutral-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                Live Client-Side Performance
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Because this tool uses instant string parsing in memory, there is no lag or upload delay when checking documents containing thousands of lines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqSection
        id="text-line-counter-faq"
        title="Frequently Asked Questions About Text Line Counter"
        subtitle="Detailed clarifications on line definitions, space counting, and metric tracking."
        items={faqs}
      />
    </div>
  );
}
