import React, { useState, useMemo } from 'react';
import { Layers, Copy, Check, Trash2, BookOpen, Lightbulb, Shield, HelpCircle } from 'lucide-react';
import { ToolId } from '../../types';
import FaqSection, { FaqItem } from '../common/FaqSection';

interface DuplicateLineRemoverProps {
  onSelectTool?: (toolId: ToolId) => void;
}

export default function DuplicateLineRemover({ onSelectTool }: DuplicateLineRemoverProps) {
  const [inputText, setInputText] = useState<string>(
    'apple\nbanana\ncherry\napple\norange\nbanana\ngrapes\nApple'
  );
  const [outputText, setOutputText] = useState<string>('');
  const [occurrenceStrategy, setOccurrenceStrategy] = useState<'first' | 'last'>('first');
  const [ignoreCase, setIgnoreCase] = useState<boolean>(true);
  const [ignoreEmptyLines, setIgnoreEmptyLines] = useState<boolean>(true);
  const [trimWhitespace, setTrimWhitespace] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [notice, setNotice] = useState<string | null>(null);

  // Statistics
  const [stats, setStats] = useState({
    originalCount: 0,
    uniqueCount: 0,
    duplicatesRemoved: 0,
  });

  const notify = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 2500);
  };

  const handleProcess = () => {
    if (!inputText) {
      setOutputText('');
      setStats({ originalCount: 0, uniqueCount: 0, duplicatesRemoved: 0 });
      notify('Please enter text to check for duplicates');
      return;
    }

    const rawLines = inputText.split(/\r?\n/);
    const originalCount = rawLines.length;

    let workingLines = rawLines;
    if (ignoreEmptyLines) {
      workingLines = workingLines.filter((l) => l.trim().length > 0);
    }

    const seen = new Set<string>();
    const result: string[] = [];

    if (occurrenceStrategy === 'first') {
      for (const line of workingLines) {
        let compareKey = line;
        if (trimWhitespace) compareKey = compareKey.trim();
        if (ignoreCase) compareKey = compareKey.toLowerCase();

        if (!seen.has(compareKey)) {
          seen.add(compareKey);
          result.push(line);
        }
      }
    } else {
      // Keep last occurrence: traverse from end
      const reversed = [...workingLines].reverse();
      const lastKept: string[] = [];
      for (const line of reversed) {
        let compareKey = line;
        if (trimWhitespace) compareKey = compareKey.trim();
        if (ignoreCase) compareKey = compareKey.toLowerCase();

        if (!seen.has(compareKey)) {
          seen.add(compareKey);
          lastKept.push(line);
        }
      }
      lastKept.reverse();
      result.push(...lastKept);
    }

    const finalOutput = result.join('\n');
    setOutputText(finalOutput);
    const duplicatesRemoved = originalCount - result.length;

    setStats({
      originalCount,
      uniqueCount: result.length,
      duplicatesRemoved: Math.max(0, duplicatesRemoved),
    });

    notify(`Removed ${Math.max(0, duplicatesRemoved)} duplicates`);
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
    setStats({ originalCount: 0, uniqueCount: 0, duplicatesRemoved: 0 });
    notify('Cleared text');
  };

  const faqs: FaqItem[] = [
    {
      question: 'What is a duplicate line?',
      answer:
        'A duplicate line is any line of text that shares the exact same character sequence as another line in your list, differing only in placement or optional surrounding whitespace.',
    },
    {
      question: 'Can the tool remove repeated lines from long lists?',
      answer:
        'Yes. Whether your list has ten lines or ten thousand lines, the tool scans all lines in client memory and keeps only distinct entries.',
    },
    {
      question: 'Which duplicate occurrence is kept (first or last)?',
      answer:
        'You can choose. "Keep first occurrence" preserves the line where it first appeared in your document, whereas "Keep last occurrence" retains the final instance encountered.',
    },
    {
      question: 'Can letter case be ignored during duplicate matching?',
      answer:
        'Yes. With "Ignore letter case" checked, entries like "Product A" and "product a" are identified as duplicates. If unchecked, they will be treated as distinct.',
    },
    {
      question: 'Are empty lines removed as duplicates?',
      answer:
        'With "Ignore empty lines" enabled, blank lines are filtered out so your final output contains only valid entries.',
    },
    {
      question: 'Can spaces be normalized before comparison?',
      answer:
        'Yes. The "Trim whitespace before comparing" option strips leading and trailing spaces prior to checking, preventing lines like "  hello" and "hello" from coexisting as false uniques.',
    },
    {
      question: 'Does the tool change or overwrite my original text?',
      answer:
        'No. Your original list remains unchanged in the left input box, allowing you to compare metrics and review entries before copying.',
    },
    {
      question: 'Can I copy the unique list to my clipboard immediately?',
      answer:
        'Yes. Click the "Copy Result" button and paste your de-duplicated list straight into Excel, Google Sheets, or any code editor.',
    },
  ];

  return (
    <div id="duplicate-remover-tool" className="w-full space-y-8">
      {/* Interactive Tool Card */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 md:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                Text Utility
              </span>
              <span className="text-xs text-neutral-500">De-Duplication Engine</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mt-1">Duplicate Line Remover</h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Find and remove repeated lines from lists and text while keeping the unique lines.
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
              <label htmlFor="dup-input" className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Original Text / List
              </label>
              <span className="text-xs text-neutral-500">
                {inputText ? `${inputText.split(/\r?\n/).length} lines` : '0 lines'}
              </span>
            </div>
            <textarea
              id="dup-input"
              rows={8}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your list containing possible duplicates here..."
              className="w-full p-3.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 font-mono focus:bg-white focus:ring-2 focus:ring-neutral-900 focus:outline-hidden transition-all"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="dup-output" className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Unique Lines Result
              </label>
              <span className="text-xs text-neutral-500">
                {outputText ? `${outputText.split(/\r?\n/).length} unique lines` : 'Awaiting processing...'}
              </span>
            </div>
            <textarea
              id="dup-output"
              rows={8}
              readOnly
              value={outputText}
              placeholder="Click 'Remove Duplicates' below to view unique lines..."
              className="w-full p-3.5 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 font-mono focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Options & Statistics Bar */}
        <div className="mt-6 pt-6 border-t border-neutral-200 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Strategy radio */}
            <div>
              <span className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                Occurrence to Retain
              </span>
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-neutral-700">
                  <input
                    type="radio"
                    name="dup-strategy"
                    value="first"
                    checked={occurrenceStrategy === 'first'}
                    onChange={() => setOccurrenceStrategy('first')}
                    className="text-neutral-900 focus:ring-neutral-900"
                  />
                  <span>Keep first occurrence</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-neutral-700">
                  <input
                    type="radio"
                    name="dup-strategy"
                    value="last"
                    checked={occurrenceStrategy === 'last'}
                    onChange={() => setOccurrenceStrategy('last')}
                    className="text-neutral-900 focus:ring-neutral-900"
                  />
                  <span>Keep last occurrence</span>
                </label>
              </div>
            </div>

            {/* Checkbox Options */}
            <div className="flex flex-wrap items-center gap-4">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-neutral-700 select-none">
                <input
                  type="checkbox"
                  checked={ignoreCase}
                  onChange={(e) => setIgnoreCase(e.target.checked)}
                  className="rounded text-neutral-900 focus:ring-neutral-900 w-4 h-4"
                />
                <span>Ignore letter case</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-neutral-700 select-none">
                <input
                  type="checkbox"
                  checked={ignoreEmptyLines}
                  onChange={(e) => setIgnoreEmptyLines(e.target.checked)}
                  className="rounded text-neutral-900 focus:ring-neutral-900 w-4 h-4"
                />
                <span>Ignore empty lines</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-neutral-700 select-none">
                <input
                  type="checkbox"
                  checked={trimWhitespace}
                  onChange={(e) => setTrimWhitespace(e.target.checked)}
                  className="rounded text-neutral-900 focus:ring-neutral-900 w-4 h-4"
                />
                <span>Trim whitespace before comparing</span>
              </label>
            </div>
          </div>

          {/* Useful Metrics Banner */}
          <div className="p-3 bg-neutral-100 rounded-lg border border-neutral-200 flex flex-wrap items-center gap-4 text-xs">
            <div>
              <span className="font-semibold text-neutral-900">Original Lines:</span>{' '}
              <span className="font-mono text-neutral-700">{stats.originalCount}</span>
            </div>
            <span className="text-neutral-300">|</span>
            <div>
              <span className="font-semibold text-neutral-900">Unique Lines:</span>{' '}
              <span className="font-mono text-neutral-700">{stats.uniqueCount}</span>
            </div>
            <span className="text-neutral-300">|</span>
            <div>
              <span className="font-semibold text-neutral-900">Duplicates Removed:</span>{' '}
              <span className="font-mono text-emerald-700 font-bold">{stats.duplicatesRemoved}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleProcess}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-lg text-xs sm:text-sm transition-colors cursor-pointer min-h-[44px] shadow-xs"
            >
              <Layers className="w-4 h-4" />
              <span>Remove Duplicates</span>
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
                  onClick={() => onSelectTool('text-sorter')}
                  className="text-neutral-900 underline hover:text-neutral-700 cursor-pointer"
                >
                  Text Sorter
                </button>
                <span>•</span>
                <button
                  onClick={() => onSelectTool('line-counter')}
                  className="text-neutral-900 underline hover:text-neutral-700 cursor-pointer"
                >
                  Text Line Counter
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
              Editorial Guide: Streamlining Data with Duplicate Line Removal
            </h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              Authored by Shahid Ali • 7 years practical digital workflow experience
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-neutral-700">
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">What Is a Duplicate Line?</h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                A duplicate line is a line of content that reoccurs more than once in a dataset or document. In lists of emails, parts, keywords, or inventory items, repeated entries inflate record counts, cause redundant communication, and distort analytics.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">Why Remove Duplicate Lines?</h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                De-duplicating data saves hours of manual checking. It ensures accurate email recipient counts, eliminates double orders, cleans up exported database tables, and produces pristine reference lists for publishing.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">How the Tool Works</h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                The algorithm reads each line sequentially into a high-performance hash Set in browser memory. When a line with a matching hash key is encountered again, it is discarded according to your retention rule (keeping either the very first or last instance seen).
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">Common Practical Uses</h4>
              <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm text-neutral-600">
                <li><strong>Cleaning lists:</strong> Remove repeated items from conference attendee sign-ups.</li>
                <li><strong>Organizing copied data:</strong> De-duplicate URL lists aggregated from multiple sources.</li>
                <li><strong>Removing repeated keywords:</strong> Clean SEO search volume lists and negative keyword groups.</li>
                <li><strong>Cleaning notes:</strong> Consolidate brainstorming lists where team members suggested identical concepts.</li>
                <li><strong>Preparing lists:</strong> Ensure clean, unique data before importing into a spreadsheet.</li>
                <li><strong>Managing text records:</strong> Prune log files of repeated status notifications.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">Practical Example</h4>
              <div className="grid grid-cols-2 gap-2 p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs font-mono">
                <div>
                  <strong className="block text-[10px] text-neutral-500 uppercase font-sans mb-1">Before (Duplicates)</strong>
                  apple<br />banana<br />apple<br />orange<br />banana
                </div>
                <div>
                  <strong className="block text-[10px] text-neutral-500 uppercase font-sans mb-1">After (Unique)</strong>
                  apple<br />banana<br />orange
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
              <h4 className="font-bold text-neutral-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                Important Verification Note
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Similar-looking lines may not be identical. For example, "Support Team" and "Support Team." (with a trailing period) are lexically different. Always review the output if punctuation variations exist in your source list.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqSection
        id="duplicate-remover-faq"
        title="Frequently Asked Questions About Duplicate Line Remover"
        subtitle="Detailed clarifications on matching logic, occurrence choices, and whitespace handling."
        items={faqs}
      />
    </div>
  );
}
