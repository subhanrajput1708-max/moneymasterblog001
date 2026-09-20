import React, { useState } from 'react';
import { Space, Copy, Check, Trash2, BookOpen, Lightbulb, Shield } from 'lucide-react';
import { ToolId } from '../../types';
import FaqSection, { FaqItem } from '../common/FaqSection';

interface WhitespaceRemoverProps {
  onSelectTool?: (toolId: ToolId) => void;
}

export default function WhitespaceRemover({ onSelectTool }: WhitespaceRemoverProps) {
  const [inputText, setInputText] = useState<string>(
    '   This text    has excessive   spaces between words.   \n\tIt also includes tabs\tand trailing whitespace.   \n\n\nAnd excessive empty blank lines.   '
  );
  const [outputText, setOutputText] = useState<string>('');
  const [removeLeading, setRemoveLeading] = useState<boolean>(true);
  const [removeTrailing, setRemoveTrailing] = useState<boolean>(true);
  const [replaceMultipleSpaces, setReplaceMultipleSpaces] = useState<boolean>(true);
  const [removeTabs, setRemoveTabs] = useState<boolean>(true);
  const [removeBlankLines, setRemoveBlankLines] = useState<boolean>(true);
  const [trimEntire, setTrimEntire] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [notice, setNotice] = useState<string | null>(null);

  const notify = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 2500);
  };

  const handleClean = () => {
    if (!inputText) {
      setOutputText('');
      notify('Please enter text to clean');
      return;
    }

    let result = inputText;

    // Remove tabs if selected
    if (removeTabs) {
      result = result.replace(/\t/g, ' ');
    }

    // Process line by line
    let lines = result.split(/\r?\n/);

    if (removeLeading) {
      lines = lines.map((l) => l.replace(/^[ \t]+/g, ''));
    }

    if (removeTrailing) {
      lines = lines.map((l) => l.replace(/[ \t]+$/g, ''));
    }

    if (replaceMultipleSpaces) {
      lines = lines.map((l) => l.replace(/ {2,}/g, ' '));
    }

    if (removeBlankLines) {
      lines = lines.filter((l) => l.trim().length > 0);
    }

    result = lines.join('\n');

    if (trimEntire) {
      result = result.trim();
    }

    setOutputText(result);
    notify('Whitespace cleaned successfully');
  };

  const handleNormalizeAll = () => {
    setRemoveLeading(true);
    setRemoveTrailing(true);
    setReplaceMultipleSpaces(true);
    setRemoveTabs(true);
    setRemoveBlankLines(true);
    setTrimEntire(true);

    let result = inputText
      .replace(/\t/g, ' ')
      .split(/\r?\n/)
      .map((l) => l.trim().replace(/ {2,}/g, ' '))
      .filter((l) => l.length > 0)
      .join('\n')
      .trim();

    setOutputText(result);
    notify('Fully normalized whitespace');
  };

  const handleCopy = () => {
    const textToCopy = outputText || inputText;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    notify('Copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    notify('Cleared text');
  };

  const faqs: FaqItem[] = [
    {
      question: 'What is whitespace?',
      answer:
        'Whitespace refers to any character or series of characters used to create horizontal or vertical empty space in typography, including standard spaces (ASCII 32), tabs (ASCII 9), non-breaking spaces, and newlines.',
    },
    {
      question: 'What is the difference between spaces and tabs?',
      answer:
        'A space is a single fixed horizontal character width. A tab is a jump code that indents text to the next preset tab-stop (often 4 or 8 spaces). When text is copied across different applications, tabs often produce erratic column spacing.',
    },
    {
      question: 'Can the tool replace multiple consecutive spaces with a single space?',
      answer:
        'Yes. The "Replace multiple spaces with one" option collapses runs of double, triple, or quadruple spaces down to a single clean space between words.',
    },
    {
      question: 'Can it strip leading and trailing spaces on every line?',
      answer:
        'Yes. You can toggle "Remove leading spaces" to clean the start of lines, and "Remove trailing spaces" to remove hidden ghost spaces at the ends of lines.',
    },
    {
      question: 'Can the tool remove blank or empty lines?',
      answer:
        'Yes. With "Remove blank lines" enabled, any lines consisting solely of whitespace or newlines are completely removed.',
    },
    {
      question: 'Can it clean messy text copied from emails or PDFs?',
      answer:
        'Yes. Copied text often inherits strange indents, inconsistent margin tabs, and trailing spaces from mail clients or PDF layers. This tool strips them in milliseconds.',
    },
    {
      question: 'Can I use this whitespace remover on my mobile phone?',
      answer:
        'Yes. Money Master Blog tools are fully responsive and work seamlessly on mobile browsers like Safari on iOS and Chrome on Android.',
    },
    {
      question: 'What does the "Normalize whitespace" option do?',
      answer:
        'Normalizing enables all cleaning rules simultaneously—stripping leading, trailing, and multi-spaces, converting tabs, and removing blank lines—to produce the cleanest possible standard text.',
    },
  ];

  return (
    <div id="whitespace-remover-tool" className="w-full space-y-8">
      {/* Interactive Tool Card */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 md:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                Text Utility
              </span>
              <span className="text-xs text-neutral-500">Spacing Normalizer</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mt-1">Whitespace Remover</h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Clean unnecessary spaces, tabs, and extra whitespace from text.
            </p>
          </div>

          {notice && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white text-xs rounded-lg animate-fade-in self-start sm:self-center">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>{notice}</span>
            </div>
          )}
        </div>

        {/* Workspaces */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="whitespace-input" className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Original Input Text
              </label>
              <span className="text-xs text-neutral-500">{inputText.length} chars</span>
            </div>
            <textarea
              id="whitespace-input"
              rows={8}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste text with excessive spaces or tabs here..."
              className="w-full p-3.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 font-mono focus:bg-white focus:ring-2 focus:ring-neutral-900 focus:outline-hidden transition-all"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="whitespace-output" className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Cleaned Output Text
              </label>
              <span className="text-xs text-neutral-500">{outputText ? `${outputText.length} chars` : 'Awaiting clean...'}</span>
            </div>
            <textarea
              id="whitespace-output"
              rows={8}
              readOnly
              value={outputText}
              placeholder="Click 'Clean Whitespace' to see the normalized text..."
              className="w-full p-3.5 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 font-mono focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Cleaning Options */}
        <div className="mt-6 pt-6 border-t border-neutral-200 space-y-4">
          <div>
            <span className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
              Granular Cleaning Options
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-neutral-700 select-none">
                <input
                  type="checkbox"
                  checked={removeLeading}
                  onChange={(e) => setRemoveLeading(e.target.checked)}
                  className="rounded text-neutral-900 focus:ring-neutral-900 w-4 h-4"
                />
                <span>Remove leading spaces</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-neutral-700 select-none">
                <input
                  type="checkbox"
                  checked={removeTrailing}
                  onChange={(e) => setRemoveTrailing(e.target.checked)}
                  className="rounded text-neutral-900 focus:ring-neutral-900 w-4 h-4"
                />
                <span>Remove trailing spaces</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-neutral-700 select-none">
                <input
                  type="checkbox"
                  checked={replaceMultipleSpaces}
                  onChange={(e) => setReplaceMultipleSpaces(e.target.checked)}
                  className="rounded text-neutral-900 focus:ring-neutral-900 w-4 h-4"
                />
                <span>Replace multiple spaces with one</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-neutral-700 select-none">
                <input
                  type="checkbox"
                  checked={removeTabs}
                  onChange={(e) => setRemoveTabs(e.target.checked)}
                  className="rounded text-neutral-900 focus:ring-neutral-900 w-4 h-4"
                />
                <span>Remove tabs</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-neutral-700 select-none">
                <input
                  type="checkbox"
                  checked={removeBlankLines}
                  onChange={(e) => setRemoveBlankLines(e.target.checked)}
                  className="rounded text-neutral-900 focus:ring-neutral-900 w-4 h-4"
                />
                <span>Remove blank lines</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-neutral-700 select-none">
                <input
                  type="checkbox"
                  checked={trimEntire}
                  onChange={(e) => setTrimEntire(e.target.checked)}
                  className="rounded text-neutral-900 focus:ring-neutral-900 w-4 h-4"
                />
                <span>Trim entire text</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={handleClean}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-lg text-xs sm:text-sm transition-colors cursor-pointer min-h-[44px] shadow-xs"
            >
              <Space className="w-4 h-4" />
              <span>Clean Whitespace</span>
            </button>

            <button
              onClick={handleNormalizeAll}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium rounded-lg text-xs sm:text-sm transition-colors cursor-pointer min-h-[44px]"
            >
              <span>Normalize Whitespace</span>
            </button>

            <button
              onClick={handleCopy}
              disabled={!outputText && !inputText}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 font-medium rounded-lg text-xs sm:text-sm transition-colors cursor-pointer min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Result'}</span>
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
                  onClick={() => onSelectTool('word-counter')}
                  className="text-neutral-900 underline hover:text-neutral-700 cursor-pointer"
                >
                  Text Cleaner
                </button>
                <span>•</span>
                <button
                  onClick={() => onSelectTool('remove-line-breaks')}
                  className="text-neutral-900 underline hover:text-neutral-700 cursor-pointer"
                >
                  Remove Line Breaks
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Editorial Guide */}
      <section className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-start gap-3 border-b border-neutral-200 pb-4">
          <BookOpen className="w-5 h-5 text-neutral-900 mt-0.5 shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-neutral-900">
              Editorial Guide: Mastering Whitespace Hygiene in Digital Content
            </h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              Authored by Shahid Ali • 7 years practical digital workflow experience
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-neutral-700">
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">What Is Whitespace?</h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Whitespace includes all invisible typographic characters that separate words, columns, sentences, and paragraphs. In addition to standard single spaces, digital text often accumulates stray horizontal tabs, non-breaking spaces (NBSP), and invisible trailing space characters.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">Why Does Extra Whitespace Appear?</h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Extra whitespace is routinely introduced when copying formatted text from PDF documents, copying table cells from spreadsheets, downloading email newsletters, or pasting code snippets from text editors that use tab indentation.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">How This Tool Cleans Text</h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                The tool evaluates each line through custom string filters. Multiple spaces are condensed to a single space, tab characters are stripped, and invisible trailing bytes are cleanly removed before reassembling the clean output.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">Common Practical Uses</h4>
              <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm text-neutral-600">
                <li><strong>Cleaning copied text:</strong> Normalize spacing on quotes copied from online research papers.</li>
                <li><strong>Preparing documents:</strong> Eliminate double spacing after periods before publishing.</li>
                <li><strong>Cleaning notes:</strong> Strip unpredictable tab indents from copied meeting minutes.</li>
                <li><strong>Formatting lists:</strong> Ensure uniform left margin alignment across bullet lists.</li>
                <li><strong>Preparing text for websites:</strong> Prevent unwanted word breaks in web CMS editors.</li>
                <li><strong>Fixing spacing problems:</strong> Remove trailing spaces that cause subtle layout glitches.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">Practical Example</h4>
              <div className="grid grid-cols-2 gap-2 p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs font-mono">
                <div>
                  <strong className="block text-[10px] text-neutral-500 uppercase font-sans mb-1">Before (Messy Spaces)</strong>
                  "&nbsp;&nbsp;Digital&nbsp;&nbsp;&nbsp;&nbsp;utilities&nbsp;&nbsp;matter.&nbsp;&nbsp;"
                </div>
                <div>
                  <strong className="block text-[10px] text-neutral-500 uppercase font-sans mb-1">After Cleaned</strong>
                  "Digital utilities matter."
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
              <h4 className="font-bold text-neutral-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                Workflow Advice
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                If you are preparing text for code editors, python files, or markdown tables that rely on indentation, be careful with "Remove leading spaces", as it removes all left indents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqSection
        id="whitespace-remover-faq"
        title="Frequently Asked Questions About Whitespace Remover"
        subtitle="Common questions regarding space normalization, tab handling, and line trimming."
        items={faqs}
      />
    </div>
  );
}
