import React, { useState } from 'react';
import { Binary, Copy, Check, Trash2, RotateCcw, BookOpen, Lightbulb, Shield, ArrowRight, Filter } from 'lucide-react';
import { ToolId } from '../../types';
import FaqSection, { FaqItem } from '../common/FaqSection';

interface TextNumberExtractorProps {
  onSelectTool?: (toolId: ToolId) => void;
}

type NumberExtractionType = 'all' | 'integers' | 'decimals' | 'percentages' | 'commas' | 'currency';
type OutputSeparator = 'newline' | 'comma' | 'space' | 'semicolon';
type SortOrder = 'original' | 'asc' | 'desc';

export default function TextNumberExtractor({ onSelectTool }: TextNumberExtractorProps) {
  const sampleText = `Order 458 was shipped on 12/08.\nTotal price: $249.99 with sales tax of $18.50.\nSpecial promotion discount applied: 15% (saving $37.50).\nWarehouse SKU reference: AB-7821.\nInventory stock level: 1,450 units remaining in zone 4.\nInvoice batch #458 received with 15% discount note.`;

  const [inputText, setInputText] = useState<string>(sampleText);
  const [outputText, setOutputText] = useState<string>('');
  const [extractionType, setExtractionType] = useState<NumberExtractionType>('all');
  const [removeDuplicates, setRemoveDuplicates] = useState<boolean>(false);
  const [outputSeparator, setOutputSeparator] = useState<OutputSeparator>('newline');
  const [sortOrder, setSortOrder] = useState<SortOrder>('original');
  const [copied, setCopied] = useState<boolean>(false);
  const [notice, setNotice] = useState<string | null>(null);

  // Statistics
  const [totalFound, setTotalFound] = useState<number>(0);
  const [uniqueCount, setUniqueCount] = useState<number>(0);
  const [duplicatesRemoved, setDuplicatesRemoved] = useState<number>(0);

  const notify = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 2500);
  };

  const handleExtract = () => {
    if (!inputText) {
      setOutputText('');
      setTotalFound(0);
      setUniqueCount(0);
      setDuplicatesRemoved(0);
      notify('Please enter text to extract numbers from');
      return;
    }

    let rawMatches: string[] = [];

    switch (extractionType) {
      case 'integers':
        // Whole numbers without decimal points
        const intRegex = /(?<!\.)\b\d+\b(?!\.)/g;
        rawMatches = inputText.match(intRegex) || [];
        break;

      case 'decimals':
        // Numbers containing decimal points: 249.99, 0.5
        const decRegex = /\b\d+\.\d+\b/g;
        rawMatches = inputText.match(decRegex) || [];
        break;

      case 'percentages':
        // Numbers followed by % symbol: 15%, 2.5%
        const pctRegex = /\b\d+(?:\.\d+)?%/g;
        rawMatches = inputText.match(pctRegex) || [];
        break;

      case 'currency':
        // Numbers preceded or followed by currency symbols: $249.99, €45.50, £100, ¥5000
        const currRegex = /[$€£¥₹]\s*\d+(?:,\d{3})*(?:\.\d+)?|\b\d+(?:,\d{3})*(?:\.\d+)?\s*(?:USD|EUR|GBP)/gi;
        rawMatches = inputText.match(currRegex) || [];
        break;

      case 'commas':
        // Numbers with thousands formatting: 1,450 or 1,000,000
        const commaRegex = /\b\d{1,3}(?:,\d{3})+(?:\.\d+)?\b/g;
        rawMatches = inputText.match(commaRegex) || [];
        break;

      case 'all':
      default:
        // Match numbers including currency symbols, decimals, percentages, and integers
        const allRegex = /[$€£¥₹]?\s*\b\d+(?:,\d{3})*(?:\.\d+)?%?\b/g;
        rawMatches = inputText.match(allRegex) || [];
        break;
    }

    // Clean leading/trailing spaces on matches
    let processed = rawMatches.map((m) => m.trim());

    const total = processed.length;
    setTotalFound(total);

    // Filter duplicates if requested
    if (removeDuplicates) {
      const uniqueSet = Array.from(new Set(processed));
      setDuplicatesRemoved(total - uniqueSet.length);
      setUniqueCount(uniqueSet.length);
      processed = uniqueSet;
    } else {
      const uniqueSet = new Set(processed);
      setUniqueCount(uniqueSet.size);
      setDuplicatesRemoved(0);
    }

    // Sorting
    if (sortOrder === 'asc' || sortOrder === 'desc') {
      processed.sort((a, b) => {
        // Strip non-numeric characters for comparison
        const numA = parseFloat(a.replace(/[^0-9.-]+/g, '')) || 0;
        const numB = parseFloat(b.replace(/[^0-9.-]+/g, '')) || 0;
        return sortOrder === 'asc' ? numA - numB : numB - numA;
      });
    }

    // Format output
    let result = '';
    if (outputSeparator === 'comma') {
      result = processed.join(', ');
    } else if (outputSeparator === 'space') {
      result = processed.join(' ');
    } else if (outputSeparator === 'semicolon') {
      result = processed.join('; ');
    } else {
      result = processed.join('\n');
    }

    setOutputText(result);
    notify(`Extracted ${processed.length} numbers successfully!`);
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    notify('Copied extracted numbers to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setTotalFound(0);
    setUniqueCount(0);
    setDuplicatesRemoved(0);
    notify('Cleared input and output');
  };

  const handleReset = () => {
    setInputText(sampleText);
    setOutputText('');
    setExtractionType('all');
    setRemoveDuplicates(false);
    setOutputSeparator('newline');
    setSortOrder('original');
    notify('Reset to sample text');
  };

  const faqs: FaqItem[] = [
    {
      question: 'What is a text number extractor?',
      answer:
        'A text number extractor is an automated browser utility that parses paragraphs, receipts, invoices, chat transcripts, or server logs to isolate all numerical figures, prices, decimals, and quantities from surrounding non-numeric words.',
    },
    {
      question: 'What types of numbers can I extract?',
      answer:
        'You can choose from six flexible modes: All Numbers, Whole Integers only (e.g. 458, 12), Decimal numbers (e.g. 249.99), Percentages (e.g. 15%), Currency amounts (e.g. $249.99, €45.50), or Formatted thousands with commas (e.g. 1,450).',
    },
    {
      question: 'Can I eliminate duplicate numbers from the extracted output?',
      answer:
        'Yes. By toggling "Remove Duplicate Numbers", repeated figures in the text (such as repeatedly mentioned order numbers or tax rates) are filtered out, displaying only unique entries.',
    },
    {
      question: 'What output formatting options are supported?',
      answer:
        'You can format results as One Number Per Line (ideal for pasting into Excel, Google Sheets, or databases), Comma-Separated values (for code arrays or SQL IN clauses), Space-Separated, or Semicolon-Separated.',
    },
    {
      question: 'Can the extracted numbers be sorted numerically?',
      answer:
        'Yes. You can preserve the exact original sequence in which they appeared in the text, or sort them from Lowest to Highest (Ascending) or Highest to Lowest (Descending).',
    },
    {
      question: 'How does it handle numbers inside hyphenated codes like "AB-7821"?',
      answer:
        'The extractor detects word boundaries and isolates the numeric portion (7821) when whole numbers or all numbers mode is enabled.',
    },
    {
      question: 'What are the most common practical use cases for this tool?',
      answer:
        'Auditing product receipts, extracting invoice totals, scraping phone numbers or quantities from email strings, compiling financial statistics, and cleaning spreadsheet export columns.',
    },
    {
      question: 'Is my financial or numerical data transmitted over the internet?',
      answer:
        'Never. All extraction algorithms run 100% locally inside your browser memory using JavaScript regular expressions. Your private numerical data never touches an external server.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Tool Header Card */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-neutral-100 text-neutral-800 text-xs font-semibold mb-2">
              <Binary className="w-3.5 h-3.5" />
              <span>Text Utility Suite • Tool #13</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Text Number Extractor
            </h2>
            <p className="text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
              Instantly scan and extract integers, decimal prices, percentages, or formatted numbers from unstructured paragraphs, invoices, and data logs.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Sample</span>
            </button>
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Status Notification */}
        {notice && (
          <div className="mb-4 p-3 bg-neutral-900 text-white text-xs font-medium rounded-lg flex items-center justify-between animate-fade-in shadow-xs">
            <span>{notice}</span>
          </div>
        )}

        {/* Live Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-left">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
              Total Numbers Found
            </span>
            <span className="text-xl font-bold text-neutral-900 mt-0.5 block">
              {totalFound}
            </span>
          </div>

          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-left">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
              Unique Numbers
            </span>
            <span className="text-xl font-bold text-neutral-900 mt-0.5 block">
              {uniqueCount}
            </span>
          </div>

          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-left">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
              Duplicates Removed
            </span>
            <span className="text-xl font-bold text-amber-600 mt-0.5 block">
              {duplicatesRemoved}
            </span>
          </div>

          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-left">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
              Result Lines/Items
            </span>
            <span className="text-xl font-bold text-emerald-600 mt-0.5 block">
              {outputText ? outputText.trim().split(outputSeparator === 'newline' ? '\n' : outputSeparator === 'comma' ? ',' : ' ').filter(Boolean).length : 0}
            </span>
          </div>
        </div>

        {/* Extraction Settings & Filter Rules */}
        <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl mb-6 space-y-4">
          <div className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
            Extraction Rules & Output Formatting
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Number Type Selector */}
            <div>
              <label htmlFor="extraction-type" className="block text-xs font-semibold text-neutral-700 mb-1">
                Number Type to Extract
              </label>
              <select
                id="extraction-type"
                value={extractionType}
                onChange={(e) => setExtractionType(e.target.value as NumberExtractionType)}
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-medium text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
              >
                <option value="all">All Numbers & Formats</option>
                <option value="integers">Whole Integers Only</option>
                <option value="decimals">Decimal Numbers (e.g. 249.99)</option>
                <option value="percentages">Percentages (e.g. 15%)</option>
                <option value="currency">Currency Figures ($249.99)</option>
                <option value="commas">Thousands Comma Format (1,450)</option>
              </select>
            </div>

            {/* Output Separator */}
            <div>
              <label htmlFor="output-separator" className="block text-xs font-semibold text-neutral-700 mb-1">
                Output Format Separator
              </label>
              <select
                id="output-separator"
                value={outputSeparator}
                onChange={(e) => setOutputSeparator(e.target.value as OutputSeparator)}
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-medium text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
              >
                <option value="newline">One Number Per Line (\n)</option>
                <option value="comma">Comma-Separated (, )</option>
                <option value="space">Space-Separated ( )</option>
                <option value="semicolon">Semicolon-Separated (; )</option>
              </select>
            </div>

            {/* Sorting Order */}
            <div>
              <label htmlFor="sort-order" className="block text-xs font-semibold text-neutral-700 mb-1">
                Sort Order
              </label>
              <select
                id="sort-order"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-medium text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
              >
                <option value="original">Preserve Original Appearance</option>
                <option value="asc">Sort Ascending (Lowest First)</option>
                <option value="desc">Sort Descending (Highest First)</option>
              </select>
            </div>

            {/* Duplicate Filter Toggle */}
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 text-xs font-semibold text-neutral-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={removeDuplicates}
                  onChange={(e) => setRemoveDuplicates(e.target.checked)}
                  className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
                />
                <span>Remove Duplicate Numbers</span>
              </label>
            </div>
          </div>
        </div>

        {/* Input / Output Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="number-input" className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Input Text with Numbers
              </label>
              <span className="text-xs text-neutral-500">
                {inputText.length} characters
              </span>
            </div>
            <textarea
              id="number-input"
              rows={8}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste invoices, logs, order slips, or articles containing numbers..."
              className="w-full p-3.5 bg-white border border-neutral-300 rounded-xl text-sm font-mono text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden leading-relaxed shadow-2xs"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="number-output" className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Extracted Numbers Output
              </label>
              <span className="text-xs text-neutral-500">
                {outputText ? outputText.length : 0} characters
              </span>
            </div>
            <textarea
              id="number-output"
              rows={8}
              readOnly
              value={outputText}
              placeholder="Click 'Extract Numbers' to view isolated figures..."
              className="w-full p-3.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-mono text-neutral-900 focus:outline-hidden leading-relaxed shadow-2xs"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              id="btn-extract-numbers"
              onClick={handleExtract}
              className="px-6 py-3 rounded-lg bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer min-h-[44px]"
            >
              Extract Numbers
            </button>
            <button
              id="btn-copy-numbers"
              onClick={handleCopy}
              disabled={!outputText}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg bg-white border border-neutral-300 text-neutral-800 text-sm font-semibold hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer min-h-[44px] disabled:opacity-50"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Result'}</span>
            </button>
          </div>

          <div className="text-xs text-neutral-500">
            Instant client-side regex parsing • Completely private
          </div>
        </div>
      </div>

      {/* Editorial Content */}
      <section className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-start gap-3 border-b border-neutral-200 pb-4">
          <BookOpen className="w-5 h-5 text-neutral-900 mt-0.5 shrink-0" />
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
              Practical Applications of Automated Number Extraction
            </h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              Authored by Shahid Ali • 7 years practical experience in web utilities and data cleaning
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-neutral-700">
          <div className="space-y-4">
            <h4 className="font-bold text-neutral-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              Common Data Cleaning Situations
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Business analysts, accounting clerks, research assistants, and software engineers frequently receive messy narrative text containing scattered numbers. Manually copying prices from a multi-page PDF invoice or pulling phone extensions from an employee directory is tedious and error-prone.
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              With the Text Number Extractor, you can paste messy paragraphs and extract all figures into a clean, single-column list ready for direct paste into Excel, Google Sheets, or database management systems.
            </p>
            <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 text-xs space-y-1.5">
              <strong className="text-neutral-900">Example Input & Output:</strong>
              <div className="font-mono text-neutral-600 text-[11px]">
                <strong>Input:</strong> Order 458 was shipped on 12/08. Total price: $249.99.<br />
                <strong>Extracted (Line by Line):</strong><br />
                458<br />
                12<br />
                08<br />
                $249.99
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-neutral-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <Shield className="w-4 h-4 text-emerald-600" />
              Sorting & De-Duplication Modes
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              When working with large batches of IDs or transaction references, repeated numbers clutter spreadsheets. Enabling the "Remove Duplicate Numbers" checkbox filters repeated items automatically while calculating the exact deduplication ratio.
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Furthermore, sorting numerical values from lowest to highest or highest to lowest allows you to instantly find minimum, maximum, and median amounts across raw text.
            </p>
          </div>
        </div>

        {/* Related Utilities Links */}
        <div className="pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Related Analysis Utilities:
          </span>
          <div className="flex flex-wrap items-center gap-3">
            {onSelectTool && (
              <>
                <button
                  onClick={() => onSelectTool('line-counter')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-800 hover:text-neutral-950 underline underline-offset-4 cursor-pointer"
                >
                  <span>Text Line Counter</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onSelectTool('duplicate-remover')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-800 hover:text-neutral-950 underline underline-offset-4 cursor-pointer"
                >
                  <span>Duplicate Line Remover</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onSelectTool('text-sorter')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-800 hover:text-neutral-950 underline underline-offset-4 cursor-pointer"
                >
                  <span>Text Sorter</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Dedicated Tool FAQs */}
      <FaqSection
        id="number-extractor-faqs"
        title="Frequently Asked Questions About Text Number Extraction"
        subtitle="Clear answers on isolating numbers, extracting currency amounts, and sorting numerical datasets."
        items={faqs}
      />
    </div>
  );
}
