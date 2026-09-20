import React, { useState } from 'react';
import { WrapText, Copy, Check, Trash2, BookOpen, Lightbulb, Shield } from 'lucide-react';
import { ToolId } from '../../types';
import FaqSection, { FaqItem } from '../common/FaqSection';

interface RemoveLineBreaksProps {
  onSelectTool?: (toolId: ToolId) => void;
}

export default function RemoveLineBreaks({ onSelectTool }: RemoveLineBreaksProps) {
  const [inputText, setInputText] = useState<string>(
    'When text is copied\nfrom a narrow PDF column,\nit frequently contains\nannoying hard returns at\nevery single line ending.\n\nThis creates broken fragments\nthat look terrible inside\nyour documents.'
  );
  const [outputText, setOutputText] = useState<string>('');
  const [mode, setMode] = useState<'spaces' | 'none'>('spaces');
  const [preserveParagraphs, setPreserveParagraphs] = useState<boolean>(true);
  const [removeExtraSpaces, setRemoveExtraSpaces] = useState<boolean>(true);
  const [trimWhitespace, setTrimWhitespace] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [notice, setNotice] = useState<string | null>(null);

  const notify = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 2500);
  };

  const handleProcess = () => {
    if (!inputText) {
      setOutputText('');
      notify('Please enter text to format');
      return;
    }

    let result = inputText;

    if (preserveParagraphs) {
      // Split into paragraphs by two or more newlines
      const paragraphs = result.split(/\r?\n\s*\r?\n/);
      const cleanedParagraphs = paragraphs.map((para) => {
        let p = para.replace(/\r?\n/g, mode === 'spaces' ? ' ' : '');
        if (removeExtraSpaces) {
          p = p.replace(/[ \t]+/g, ' ');
        }
        if (trimWhitespace) {
          p = p.trim();
        }
        return p;
      });
      result = cleanedParagraphs.join('\n\n');
    } else {
      // Remove all line breaks across the entire text
      result = result.replace(/\r?\n/g, mode === 'spaces' ? ' ' : '');
      if (removeExtraSpaces) {
        result = result.replace(/[ \t]+/g, ' ');
      }
      if (trimWhitespace) {
        result = result.trim();
      }
    }

    setOutputText(result);
    notify('Line breaks removed successfully');
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
      question: 'What does Remove Line Breaks do?',
      answer:
        'It converts fragmented, multi-line sentences into fluid, continuous paragraphs by stripping out unwanted carriage returns (`\\r`) and newlines (`\\n`) while optionally maintaining true paragraph separations.',
    },
    {
      question: 'Can I turn multiple broken lines into one single paragraph?',
      answer:
        'Yes. Uncheck "Preserve paragraph breaks" and select "Replace line breaks with spaces". The tool will join all lines into a single continuous stream of text.',
    },
    {
      question: 'Can I preserve intentional paragraph breaks?',
      answer:
        'Yes. With "Preserve paragraph breaks" checked, double newlines (blank lines between paragraphs) are recognized and retained, so only the artificial line wraps within paragraphs are eliminated.',
    },
    {
      question: 'Can I remove extra spaces at the same time?',
      answer:
        'Yes. Enabling "Remove extra spaces" automatically collapses consecutive spaces and stray tabs down to a single clean space.',
    },
    {
      question: 'Is my original text modified or lost?',
      answer:
        'No. Your original text remains intact in the left/upper input box. The joined continuous text is written to the separate output textarea.',
    },
    {
      question: 'Can I use this tool on my mobile phone or tablet?',
      answer:
        'Yes. The tool is fully responsive and touch-friendly across iPhones, Android devices, iPads, and desktop computers with zero app downloads required.',
    },
    {
      question: 'Can I copy the cleaned result with one click?',
      answer:
        'Yes. Clicking "Copy Result" immediately transfers the unified text to your clipboard with visual confirmation.',
    },
    {
      question: 'Why does copied text sometimes contain unwanted line breaks?',
      answer:
        'PDF documents, email headers, terminal outputs, and older mainframe databases enforce hard column margins (often 72–80 characters). When you copy text, those visual margins are copied as literal line-break characters.',
    },
  ];

  return (
    <div id="remove-line-breaks-tool" className="w-full space-y-8">
      {/* Interactive Tool Card */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 md:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                Text Utility
              </span>
              <span className="text-xs text-neutral-500">PDF & Draft Reformatter</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mt-1">Remove Line Breaks</h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Convert text containing unnecessary line breaks into cleaner continuous text.
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
              <label htmlFor="line-breaks-input" className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Raw Input Text
              </label>
              <span className="text-xs text-neutral-500">
                {inputText ? `${inputText.split(/\r?\n/).length} lines` : '0 lines'}
              </span>
            </div>
            <textarea
              id="line-breaks-input"
              rows={8}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste text with broken lines here..."
              className="w-full p-3.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 font-sans focus:bg-white focus:ring-2 focus:ring-neutral-900 focus:outline-hidden transition-all"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="line-breaks-output" className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Continuous Output Text
              </label>
              <span className="text-xs text-neutral-500">
                {outputText ? `${outputText.split(/\r?\n/).length} lines` : 'Awaiting format...'}
              </span>
            </div>
            <textarea
              id="line-breaks-output"
              rows={8}
              readOnly
              value={outputText}
              placeholder="Click 'Remove Line Breaks' below to generate clean text..."
              className="w-full p-3.5 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 font-sans focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Options & Configuration */}
        <div className="mt-6 pt-6 border-t border-neutral-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mode selection */}
            <div>
              <span className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                Replacement Behavior
              </span>
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-neutral-700">
                  <input
                    type="radio"
                    name="line-break-mode"
                    value="spaces"
                    checked={mode === 'spaces'}
                    onChange={() => setMode('spaces')}
                    className="text-neutral-900 focus:ring-neutral-900"
                  />
                  <span>Replace with single spaces</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-neutral-700">
                  <input
                    type="radio"
                    name="line-break-mode"
                    value="none"
                    checked={mode === 'none'}
                    onChange={() => setMode('none')}
                    className="text-neutral-900 focus:ring-neutral-900"
                  />
                  <span>Remove completely</span>
                </label>
              </div>
            </div>

            {/* Checkbox Options */}
            <div className="flex flex-wrap items-center gap-4">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-neutral-700 select-none">
                <input
                  type="checkbox"
                  checked={preserveParagraphs}
                  onChange={(e) => setPreserveParagraphs(e.target.checked)}
                  className="rounded text-neutral-900 focus:ring-neutral-900 w-4 h-4"
                />
                <span>Preserve paragraph breaks</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-neutral-700 select-none">
                <input
                  type="checkbox"
                  checked={removeExtraSpaces}
                  onChange={(e) => setRemoveExtraSpaces(e.target.checked)}
                  className="rounded text-neutral-900 focus:ring-neutral-900 w-4 h-4"
                />
                <span>Remove extra spaces</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-neutral-700 select-none">
                <input
                  type="checkbox"
                  checked={trimWhitespace}
                  onChange={(e) => setTrimWhitespace(e.target.checked)}
                  className="rounded text-neutral-900 focus:ring-neutral-900 w-4 h-4"
                />
                <span>Trim surrounding whitespace</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={handleProcess}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-lg text-xs sm:text-sm transition-colors cursor-pointer min-h-[44px] shadow-xs"
            >
              <WrapText className="w-4 h-4" />
              <span>Remove Line Breaks</span>
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
                  onClick={() => onSelectTool('whitespace-remover')}
                  className="text-neutral-900 underline hover:text-neutral-700 cursor-pointer"
                >
                  Whitespace Remover
                </button>
                <span>•</span>
                <button
                  onClick={() => onSelectTool('word-counter')}
                  className="text-neutral-900 underline hover:text-neutral-700 cursor-pointer"
                >
                  Text Cleaner
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
              Editorial Guide: Fixing Broken Paragraphs and PDF Returns
            </h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              Authored by Shahid Ali • 7 years practical digital workflow experience
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-neutral-700">
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">What Are Line Breaks?</h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Line breaks (represented in computer code as `\n` or `\r\n`) tell digital systems to terminate the current line of text and begin on a fresh one. While line breaks are necessary between distinct paragraphs or list items, unwanted mid-sentence line breaks disrupt natural sentence flow.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">Why Do Line Breaks Appear in Copied Text?</h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                When extracting passages from PDF documents, ebooks, multi-column print designs, or terminal outputs, the visual column wrapping is often hardcoded as literal return characters. Pasting that text into Word or Google Docs causes jagged, premature wraps at every line ending.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">How to Remove Line Breaks</h4>
              <ol className="list-decimal pl-4 space-y-1 text-xs sm:text-sm text-neutral-600">
                <li>Paste your fragmented text into the input box above.</li>
                <li>Choose whether to replace line breaks with spaces (recommended for reading sentences).</li>
                <li>Ensure "Preserve paragraph breaks" is checked if you want to keep separate paragraphs.</li>
                <li>Click <strong>Remove Line Breaks</strong> to produce fluid continuous copy.</li>
                <li>Click <strong>Copy Result</strong> to transfer the cleaned text.</li>
              </ol>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">Common Practical Uses</h4>
              <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm text-neutral-600">
                <li><strong>Cleaning copied website text:</strong> Remove jagged line ends copied from narrow sidebars.</li>
                <li><strong>Fixing text copied from PDFs:</strong> Restore continuous paragraphs from multi-column research papers.</li>
                <li><strong>Preparing content for documents:</strong> Format clean quotations without manual backspacing.</li>
                <li><strong>Combining broken sentences:</strong> Unite sentence fragments into natural reading paragraphs.</li>
                <li><strong>Cleaning notes:</strong> Convert phone voice-transcriptions with sporadic line wraps into clean paragraphs.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">Practical Example</h4>
              <div className="grid grid-cols-2 gap-2 p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs font-mono">
                <div>
                  <strong className="block text-[10px] text-neutral-500 uppercase font-sans mb-1">Before (Broken PDF)</strong>
                  This is a long<br />sentence with<br />unwanted line<br />returns inside.
                </div>
                <div>
                  <strong className="block text-[10px] text-neutral-500 uppercase font-sans mb-1">After Clean</strong>
                  This is a long sentence with unwanted line returns inside.
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
              <h4 className="font-bold text-neutral-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                Review Before Publishing
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Always review the result because removing line breaks can occasionally join headers or section titles directly onto the first sentence if they were only separated by a single return. Check that intentional headings remain distinct.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqSection
        id="remove-line-breaks-faq"
        title="Frequently Asked Questions About Removing Line Breaks"
        subtitle="Common questions regarding PDF text fixing, paragraph preservation, and spacing."
        items={faqs}
      />
    </div>
  );
}
