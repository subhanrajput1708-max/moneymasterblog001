import React, { useState } from 'react';
import { AlignJustify, Copy, Check, Trash2, RotateCcw, BookOpen, Lightbulb, Shield, ArrowRight, Plus, Minus } from 'lucide-react';
import { ToolId } from '../../types';
import FaqSection, { FaqItem } from '../common/FaqSection';

interface TextPrefixSuffixCleanerProps {
  onSelectTool?: (toolId: ToolId) => void;
}

export default function TextPrefixSuffixCleaner({ onSelectTool }: TextPrefixSuffixCleanerProps) {
  const sampleInput = `Title: Apple\nTitle: Orange\nTitle: Banana\nTitle: Strawberry\nTitle: Pineapple`;

  const [inputText, setInputText] = useState<string>(sampleInput);
  const [outputText, setOutputText] = useState<string>('');
  
  // Prefix actions
  const [removePrefix, setRemovePrefix] = useState<string>('Title: ');
  const [addPrefix, setAddPrefix] = useState<string>('- ');

  // Suffix actions
  const [removeSuffix, setRemoveSuffix] = useState<string>('');
  const [addSuffix, setAddSuffix] = useState<string>('');

  // Modifiers & Toggles
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [ignoreEmptyLines, setIgnoreEmptyLines] = useState<boolean>(true);
  const [trimLeadingWhitespace, setTrimLeadingWhitespace] = useState<boolean>(true);
  const [trimTrailingWhitespace, setTrimTrailingWhitespace] = useState<boolean>(true);
  const [addLineNumbers, setAddLineNumbers] = useState<boolean>(false);

  const [copied, setCopied] = useState<boolean>(false);
  const [notice, setNotice] = useState<string | null>(null);

  const notify = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 2500);
  };

  const handleProcess = () => {
    if (!inputText) {
      setOutputText('');
      notify('Please enter text to process');
      return;
    }

    const lines = inputText.split(/\r?\n/);
    let lineNumber = 1;

    const processedLines = lines.map((originalLine) => {
      let line = originalLine;

      // Check empty line
      if (line.trim().length === 0) {
        return ignoreEmptyLines ? '' : line;
      }

      // 1. Trim whitespace if requested before prefix/suffix operations
      if (trimLeadingWhitespace) {
        line = line.replace(/^[ \t]+/, '');
      }
      if (trimTrailingWhitespace) {
        line = line.replace(/[ \t]+$/, '');
      }

      // 2. Remove Prefix if configured
      if (removePrefix) {
        if (caseSensitive) {
          if (line.startsWith(removePrefix)) {
            line = line.slice(removePrefix.length);
          }
        } else {
          if (line.toLowerCase().startsWith(removePrefix.toLowerCase())) {
            line = line.slice(removePrefix.length);
          }
        }
      }

      // 3. Remove Suffix if configured
      if (removeSuffix) {
        if (caseSensitive) {
          if (line.endsWith(removeSuffix)) {
            line = line.slice(0, line.length - removeSuffix.length);
          }
        } else {
          if (line.toLowerCase().endsWith(removeSuffix.toLowerCase())) {
            line = line.slice(0, line.length - removeSuffix.length);
          }
        }
      }

      // 4. Add Prefix if configured
      if (addPrefix) {
        line = addPrefix + line;
      }

      // 5. Add line numbering if toggled
      if (addLineNumbers) {
        line = `${lineNumber}. ` + line;
        lineNumber++;
      }

      // 6. Add Suffix if configured
      if (addSuffix) {
        line = line + addSuffix;
      }

      return line;
    });

    const result = (ignoreEmptyLines ? processedLines.filter((l) => l.length > 0) : processedLines).join('\n');
    setOutputText(result);
    notify(`Processed ${lines.length} lines successfully!`);
  };

  const handleCopy = () => {
    const textToCopy = outputText || inputText;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    notify('Copied result to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    notify('Cleared text');
  };

  const handleReset = () => {
    setInputText(sampleInput);
    setOutputText('');
    setRemovePrefix('Title: ');
    setAddPrefix('- ');
    setRemoveSuffix('');
    setAddSuffix('');
    setCaseSensitive(false);
    setIgnoreEmptyLines(true);
    notify('Reset to default example');
  };

  const inputLineCount = inputText ? inputText.split(/\r?\n/).filter((l) => l.trim().length > 0).length : 0;
  const outputLineCount = outputText ? outputText.split(/\r?\n/).filter((l) => l.trim().length > 0).length : 0;

  const faqs: FaqItem[] = [
    {
      question: 'What is a line prefix and suffix?',
      answer:
        'A prefix is any string of characters situated at the very beginning of a line (such as `Title: `, `SKU-`, or a Markdown bullet `- `). A suffix is any string situated at the very end of a line (such as a comma `,`, semicolon `;`, or trailing tag).',
    },
    {
      question: 'Can I remove an existing prefix and add a new prefix at the same time?',
      answer:
        'Yes. For instance, you can enter `Title: ` in the "Remove Prefix" field and `- ` in the "Add Prefix" field to convert raw labeled items into a clean Markdown bulleted list in one single pass.',
    },
    {
      question: 'How does case-insensitive prefix/suffix removal work?',
      answer:
        'When "Case-Sensitive Match" is disabled, entering `title: ` will successfully match and strip `Title: `, `TITLE: `, or `title: ` from the start of lines without requiring multiple passes.',
    },
    {
      question: 'How do I format a list of items for an SQL query or code array?',
      answer:
        'Paste your items, set Add Prefix to `\'` (single quote) and Add Suffix to `\',` (single quote and comma). Every line will immediately be wrapped as a valid string literal for SQL `IN (\'item1\', \'item2\')` clauses.',
    },
    {
      question: 'Does this tool ignore empty or blank lines?',
      answer:
        'Yes. With "Ignore Empty Lines" checked (the default), prefixes and suffixes are only applied to lines containing real text, preventing unwanted floating prefixes on blank rows.',
    },
    {
      question: 'Can I add sequential numbers to every line?',
      answer:
        'Yes. Toggling the "Add Line Numbering" option automatically prepends `1. `, `2. `, `3. ` sequentially to every non-empty line.',
    },
    {
      question: 'Can I trim leading or trailing spaces before applying new prefixes?',
      answer:
        'Yes. The tool features dedicated "Trim Leading Whitespace" and "Trim Trailing Whitespace" checkboxes to normalize erratic indentation before attaching new prefixes.',
    },
    {
      question: 'Is my line data kept private and secure?',
      answer:
        'Yes, completely. All text transformations execute purely inside your browser\'s local JavaScript engine. No line data is ever sent to or stored on our servers.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Tool Header Card */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-neutral-100 text-neutral-800 text-xs font-semibold mb-2">
              <AlignJustify className="w-3.5 h-3.5" />
              <span>Text Utility Suite • Tool #15</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Text Prefix & Suffix Cleaner
            </h2>
            <p className="text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
              Add, remove, or modify prefixes and suffixes across every line. Perfect for cleaning spreadsheet exports, formatting bullet lists, and preparing code arrays.
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
              Input Lines
            </span>
            <span className="text-xl font-bold text-neutral-900 mt-0.5 block">
              {inputLineCount}
            </span>
          </div>

          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-left">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
              Output Lines
            </span>
            <span className="text-xl font-bold text-neutral-900 mt-0.5 block">
              {outputLineCount || inputLineCount}
            </span>
          </div>

          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-left">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
              Input Characters
            </span>
            <span className="text-xl font-bold text-neutral-900 mt-0.5 block">
              {inputText.length}
            </span>
          </div>

          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-left">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
              Output Characters
            </span>
            <span className="text-xl font-bold text-emerald-600 mt-0.5 block">
              {outputText ? outputText.length : inputText.length}
            </span>
          </div>
        </div>

        {/* Prefix & Suffix Settings Grid */}
        <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl mb-6 space-y-4">
          <div className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
            Configure Line Prefix & Suffix Controls
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Prefix Column */}
            <div className="p-3.5 bg-white border border-neutral-200 rounded-lg space-y-3">
              <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                <Minus className="w-3.5 h-3.5 text-rose-600" />
                Line Prefix Actions (Beginning of Lines)
              </span>

              <div>
                <label htmlFor="remove-prefix-input" className="block text-[11px] font-semibold text-neutral-600 mb-1">
                  Prefix to REMOVE:
                </label>
                <input
                  id="remove-prefix-input"
                  type="text"
                  value={removePrefix}
                  onChange={(e) => setRemovePrefix(e.target.value)}
                  placeholder="e.g. Title: or - or 1. "
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                />
              </div>

              <div>
                <label htmlFor="add-prefix-input" className="block text-[11px] font-semibold text-neutral-600 mb-1">
                  Prefix to ADD:
                </label>
                <input
                  id="add-prefix-input"
                  type="text"
                  value={addPrefix}
                  onChange={(e) => setAddPrefix(e.target.value)}
                  placeholder="e.g. - or Item: or ' "
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Suffix Column */}
            <div className="p-3.5 bg-white border border-neutral-200 rounded-lg space-y-3">
              <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-emerald-600" />
                Line Suffix Actions (End of Lines)
              </span>

              <div>
                <label htmlFor="remove-suffix-input" className="block text-[11px] font-semibold text-neutral-600 mb-1">
                  Suffix to REMOVE:
                </label>
                <input
                  id="remove-suffix-input"
                  type="text"
                  value={removeSuffix}
                  onChange={(e) => setRemoveSuffix(e.target.value)}
                  placeholder="e.g. ; or , or [Final]"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                />
              </div>

              <div>
                <label htmlFor="add-suffix-input" className="block text-[11px] font-semibold text-neutral-600 mb-1">
                  Suffix to ADD:
                </label>
                <input
                  id="add-suffix-input"
                  type="text"
                  value={addSuffix}
                  onChange={(e) => setAddSuffix(e.target.value)}
                  placeholder="e.g. , or ; or ', "
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Options Toggles */}
          <div className="pt-2 border-t border-neutral-200/80">
            <span className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
              Formatting & Matching Toggles
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={caseSensitive}
                  onChange={(e) => setCaseSensitive(e.target.checked)}
                  className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
                />
                <span>Case-Sensitive Matching</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={ignoreEmptyLines}
                  onChange={(e) => setIgnoreEmptyLines(e.target.checked)}
                  className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
                />
                <span>Ignore Blank / Empty Lines</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={trimLeadingWhitespace}
                  onChange={(e) => setTrimLeadingWhitespace(e.target.checked)}
                  className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
                />
                <span>Trim Leading Spaces First</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addLineNumbers}
                  onChange={(e) => setAddLineNumbers(e.target.checked)}
                  className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
                />
                <span className="font-semibold text-neutral-900">Add Sequential Line Numbers (1, 2, 3...)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Input / Output Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="prefix-input" className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Input Text (Line by Line)
              </label>
              <span className="text-xs text-neutral-500">
                {inputText.length} characters
              </span>
            </div>
            <textarea
              id="prefix-input"
              rows={8}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste list of items or lines to add/remove prefixes and suffixes..."
              className="w-full p-3.5 bg-white border border-neutral-300 rounded-xl text-sm font-mono text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden leading-relaxed shadow-2xs"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="prefix-output" className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Processed Output
              </label>
              <span className="text-xs text-neutral-500">
                {outputText ? outputText.length : 0} characters
              </span>
            </div>
            <textarea
              id="prefix-output"
              rows={8}
              readOnly
              value={outputText}
              placeholder="Click 'Process Prefix & Suffix' to generate transformed lines..."
              className="w-full p-3.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-mono text-neutral-900 focus:outline-hidden leading-relaxed shadow-2xs"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              id="btn-process-prefix"
              onClick={handleProcess}
              className="px-6 py-3 rounded-lg bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer min-h-[44px]"
            >
              Process Prefix & Suffix
            </button>
            <button
              id="btn-copy-prefix"
              onClick={handleCopy}
              disabled={!outputText}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg bg-white border border-neutral-300 text-neutral-800 text-sm font-semibold hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer min-h-[44px] disabled:opacity-50"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Result'}</span>
            </button>
          </div>

          <div className="text-xs text-neutral-500">
            Batch line processing • Preserves order
          </div>
        </div>
      </div>

      {/* Editorial Content */}
      <section className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-start gap-3 border-b border-neutral-200 pb-4">
          <BookOpen className="w-5 h-5 text-neutral-900 mt-0.5 shrink-0" />
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
              Batch Line Cleaning: Streamlining Repetitive Text Tasks
            </h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              Authored by Shahid Ali • 7 years practical experience in web utilities and digital workflow optimization
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-neutral-700">
          <div className="space-y-4">
            <h4 className="font-bold text-neutral-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              Common Text Cleaning Situations
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Anyone who works with lists, spreadsheets, databases, or content management systems regularly runs into repetitive line-formatting chores. You might copy a column of names where every cell begins with `User: `, or a list of files where each line has a trailing file extension you want removed.
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Instead of manually backspacing or cursoring through hundreds of lines, this tool allows you to strip unwanted prefixes or suffixes simultaneously while adding new formatting marks (such as Markdown bullets or database commas) in a single click.
            </p>
            <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 text-xs space-y-1.5">
              <strong className="text-neutral-900">Practical Example:</strong>
              <div className="font-mono text-neutral-600 text-[11px]">
                <strong>Original Input:</strong><br />
                Title: Apple<br />
                Title: Orange<br />
                <strong>After removing "Title: " and adding "- ":</strong><br />
                - Apple<br />
                - Orange
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-neutral-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <Shield className="w-4 h-4 text-emerald-600" />
              Formatting for Code & Databases
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Developers and data analysts frequently need to convert plain text lists into code-ready data structures. By setting Add Prefix to `"` and Add Suffix to `",`, a plain text list instantly turns into a JSON or JavaScript array without tedious regex writing.
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Because all calculations happen client-side in the browser, your proprietary data, customer lists, or internal codes remain confidential on your device.
            </p>
          </div>
        </div>

        {/* Related Utilities Links */}
        <div className="pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Related List & Text Utilities:
          </span>
          <div className="flex flex-wrap items-center gap-3">
            {onSelectTool && (
              <>
                <button
                  onClick={() => onSelectTool('text-sorter')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-800 hover:text-neutral-950 underline underline-offset-4 cursor-pointer"
                >
                  <span>Text Sorter</span>
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
                  onClick={() => onSelectTool('line-counter')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-800 hover:text-neutral-950 underline underline-offset-4 cursor-pointer"
                >
                  <span>Text Line Counter</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Dedicated Tool FAQs */}
      <FaqSection
        id="prefix-suffix-cleaner-faqs"
        title="Frequently Asked Questions About Prefix & Suffix Cleaning"
        subtitle="Practical answers on modifying line beginnings and endings, batch list formatting, and case matching."
        items={faqs}
      />
    </div>
  );
}
