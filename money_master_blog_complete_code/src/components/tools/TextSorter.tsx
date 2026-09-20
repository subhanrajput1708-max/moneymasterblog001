import React, { useState } from 'react';
import { ArrowUpDown, Copy, Check, Trash2, ArrowRight, BookOpen, Lightbulb, Shield, HelpCircle } from 'lucide-react';
import { ToolId } from '../../types';
import FaqSection, { FaqItem } from '../common/FaqSection';

interface TextSorterProps {
  onSelectTool?: (toolId: ToolId) => void;
}

type SortMethod = 'az' | 'za' | 'shortest' | 'longest';

export default function TextSorter({ onSelectTool }: TextSorterProps) {
  const [inputText, setInputText] = useState<string>(
    'Bananas\nApples\nOranges\nStrawberries\nBlueberries\nApples\nPineapples'
  );
  const [outputText, setOutputText] = useState<string>('');
  const [sortMethod, setSortMethod] = useState<SortMethod>('az');
  const [removeDuplicates, setRemoveDuplicates] = useState<boolean>(true);
  const [ignoreEmptyLines, setIgnoreEmptyLines] = useState<boolean>(true);
  const [ignoreCase, setIgnoreCase] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [notice, setNotice] = useState<string | null>(null);

  const notify = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 2500);
  };

  const handleSort = () => {
    if (!inputText.trim()) {
      setOutputText('');
      notify('Please enter text to sort');
      return;
    }

    let lines = inputText.split(/\r?\n/);

    if (ignoreEmptyLines) {
      lines = lines.filter((l) => l.trim().length > 0);
    }

    if (removeDuplicates) {
      if (ignoreCase) {
        const seen = new Set<string>();
        lines = lines.filter((l) => {
          const key = l.trim().toLowerCase();
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      } else {
        lines = Array.from(new Set(lines));
      }
    }

    lines.sort((a, b) => {
      if (sortMethod === 'az') {
        return ignoreCase
          ? a.localeCompare(b, undefined, { sensitivity: 'accent' })
          : a.localeCompare(b);
      }
      if (sortMethod === 'za') {
        return ignoreCase
          ? b.localeCompare(a, undefined, { sensitivity: 'accent' })
          : b.localeCompare(a);
      }
      if (sortMethod === 'shortest') {
        return a.length - b.length || (ignoreCase ? a.localeCompare(b, undefined, { sensitivity: 'accent' }) : a.localeCompare(b));
      }
      if (sortMethod === 'longest') {
        return b.length - a.length || (ignoreCase ? a.localeCompare(b, undefined, { sensitivity: 'accent' }) : a.localeCompare(b));
      }
      return 0;
    });

    const result = lines.join('\n');
    setOutputText(result);
    notify(`Sorted ${lines.length} lines`);
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
      question: 'What does a text sorter do?',
      answer:
        'A text sorter takes multi-line text or unorganized lists and rearranges each line into a logical sequence, such as ascending alphabetical order (A–Z), descending alphabetical order (Z–A), or by character length.',
    },
    {
      question: 'Can I sort text alphabetically from A to Z?',
      answer:
        'Yes. Select the "A–Z" option and click "Sort Text". The tool will arrange names, keywords, vocabulary, or inventory items from first to last using standard lexical comparison.',
    },
    {
      question: 'Can I sort text backwards from Z to A?',
      answer:
        'Yes. Choose "Z–A" to reverse the alphabetical order so lines starting with Z, Y, or X appear at the top and lines beginning with A appear at the bottom.',
    },
    {
      question: 'Can I sort lines by line length (shortest to longest)?',
      answer:
        'Yes. Both "Shortest to Longest" and "Longest to Shortest" are supported. This is particularly useful for poets, UI designers testing label widths, and developers testing layout bounding boxes.',
    },
    {
      question: 'Can duplicate lines be removed during sorting?',
      answer:
        'Yes. When the "Remove duplicate lines" checkbox is enabled, identical lines are identified and stripped out automatically so only unique items remain in your final list.',
    },
    {
      question: 'Can I sort a large list of hundreds or thousands of items?',
      answer:
        'Yes. Because the sorting algorithm executes natively in your browser using optimized JavaScript array sorting, lists containing thousands of lines sort virtually instantaneously without latency.',
    },
    {
      question: 'Does the tool alter or overwrite my original text?',
      answer:
        'No. Your original text remains safely preserved in the input area. The organized text is rendered cleanly in the separate output box so you can review both versions side by side.',
    },
    {
      question: 'Can I copy the sorted result with one click?',
      answer:
        'Yes. Clicking the "Copy Result" button copies the entire sorted list directly to your clipboard. A quick "Copied!" notice confirms that the text is ready to paste into documents or spreadsheets.',
    },
  ];

  return (
    <div id="text-sorter-tool" className="w-full space-y-8">
      {/* Interactive Tool Card */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 md:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                Text Utility
              </span>
              <span className="text-xs text-neutral-500">Fast Browser Sorting</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mt-1">Text Sorter</h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Sort lines of text quickly using different sorting methods directly in the browser.
            </p>
          </div>

          {notice && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white text-xs rounded-lg animate-fade-in self-start sm:self-center">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>{notice}</span>
            </div>
          )}
        </div>

        {/* Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Input Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="text-sorter-input" className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Original Input List
              </label>
              <span className="text-xs text-neutral-500">
                {inputText ? `${inputText.split(/\r?\n/).length} lines` : '0 lines'}
              </span>
            </div>
            <textarea
              id="text-sorter-input"
              rows={8}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text or list here..."
              className="w-full p-3.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 font-mono focus:bg-white focus:ring-2 focus:ring-neutral-900 focus:outline-hidden transition-all"
            />
          </div>

          {/* Output Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="text-sorter-output" className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Sorted Output List
              </label>
              <span className="text-xs text-neutral-500">
                {outputText ? `${outputText.split(/\r?\n/).length} lines` : 'Awaiting sort...'}
              </span>
            </div>
            <textarea
              id="text-sorter-output"
              rows={8}
              readOnly
              value={outputText}
              placeholder="Click 'Sort Text' below to generate your sorted list..."
              className="w-full p-3.5 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 font-mono focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Options & Controls */}
        <div className="mt-6 pt-6 border-t border-neutral-200 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                Sorting Order
              </label>
              <select
                value={sortMethod}
                onChange={(e) => setSortMethod(e.target.value as SortMethod)}
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs sm:text-sm text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
              >
                <option value="az">A–Z (Alphabetical)</option>
                <option value="za">Z–A (Reverse Alphabetical)</option>
                <option value="shortest">Shortest to Longest</option>
                <option value="longest">Longest to Shortest</option>
              </select>
            </div>

            <div className="sm:col-span-1 lg:col-span-3 flex flex-wrap items-center gap-4 pt-1">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-neutral-700 select-none">
                <input
                  type="checkbox"
                  checked={removeDuplicates}
                  onChange={(e) => setRemoveDuplicates(e.target.checked)}
                  className="rounded text-neutral-900 focus:ring-neutral-900 w-4 h-4"
                />
                <span>Remove duplicate lines</span>
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
                  checked={ignoreCase}
                  onChange={(e) => setIgnoreCase(e.target.checked)}
                  className="rounded text-neutral-900 focus:ring-neutral-900 w-4 h-4"
                />
                <span>Ignore letter case</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleSort}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-lg text-xs sm:text-sm transition-colors cursor-pointer min-h-[44px] shadow-xs"
            >
              <ArrowUpDown className="w-4 h-4" />
              <span>Sort Text</span>
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
                  onClick={() => onSelectTool('duplicate-remover')}
                  className="text-neutral-900 underline hover:text-neutral-700 cursor-pointer"
                >
                  Duplicate Line Remover
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
              Editorial Guide: How to Organize Lists with Text Sorter
            </h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              Authored by Shahid Ali • 7 years practical digital workflow experience
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-neutral-700">
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">What Is a Text Sorter?</h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                A text sorter is an online utility that restructures raw, chaotic lists into tidy, sequenced items. Whether you are assembling research keywords, arranging customer directories, alphabetizing book citations, or grouping inventory parts, sorting allows you to locate information quickly and detect missing items.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">How Does Text Sorting Work?</h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                The tool breaks your pasted block into discrete lines using newline delimiters (`\n`). Each line is compared character by character using Unicode code points. With case-insensitive sorting turned on, uppercase and lowercase letters are treated uniformly so "apple" and "Apple" sort alongside each other rather than being placed in separate ASCII blocks.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">How to Use the Text Sorter</h4>
              <ol className="list-decimal pl-4 space-y-1 text-xs sm:text-sm text-neutral-600">
                <li>Paste your list of words or lines into the input textarea.</li>
                <li>Choose your sorting direction: A–Z, Z–A, shortest, or longest.</li>
                <li>Check the options to remove duplicates or ignore empty lines if needed.</li>
                <li>Click <strong>Sort Text</strong> to generate your result in the output box.</li>
                <li>Click <strong>Copy Result</strong> to transfer the organized list to your clipboard.</li>
              </ol>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">Common Practical Uses</h4>
              <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm text-neutral-600">
                <li><strong>Organizing lists:</strong> Alphabetize glossaries, index terms, or attendee rosters.</li>
                <li><strong>Cleaning copied lists:</strong> Reorder items copied from messy web pages or emails.</li>
                <li><strong>Sorting names:</strong> Alphabetize last names or directory contacts accurately.</li>
                <li><strong>Organizing keywords:</strong> Arrange SEO search terms and research tags alphabetically.</li>
                <li><strong>Preparing content:</strong> Tidy up documentation lists before publishing.</li>
                <li><strong>Managing lines of text:</strong> Strip out unwanted duplicates while ordering items.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">Practical Example</h4>
              <div className="grid grid-cols-2 gap-2 p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs font-mono">
                <div>
                  <strong className="block text-[10px] text-neutral-500 uppercase font-sans mb-1">Unsorted Input</strong>
                  Bananas<br />Apples<br />Oranges<br />Apples<br />Pineapples
                </div>
                <div>
                  <strong className="block text-[10px] text-neutral-500 uppercase font-sans mb-1">Sorted (A–Z, No Dups)</strong>
                  Apples<br />Bananas<br />Oranges<br />Pineapples
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
              <h4 className="font-bold text-neutral-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                Real-World Limitations
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                This tool sorts by lines. If your data consists of continuous comma-separated items on a single line, use our text tools to place each item onto a new line first. Numbers are sorted lexically by default (e.g. 10 precedes 2) unless they share equal zero-padding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqSection
        id="text-sorter-faq"
        title="Frequently Asked Questions About Text Sorter"
        subtitle="Common questions regarding sorting rules, duplicate elimination, and list handling."
        items={faqs}
      />
    </div>
  );
}
