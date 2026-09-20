import React, { useState, useMemo } from 'react';
import { Search, Replace, Copy, Check, Trash2, BookOpen, Lightbulb, Shield } from 'lucide-react';
import { ToolId } from '../../types';
import FaqSection, { FaqItem } from '../common/FaqSection';

interface FindReplaceTextProps {
  onSelectTool?: (toolId: ToolId) => void;
}

export default function FindReplaceText({ onSelectTool }: FindReplaceTextProps) {
  const [text, setText] = useState<string>(
    'The quick brown fox jumps over the lazy dog. The fox was nimble, and the fox was quick.'
  );
  const [findWord, setFindWord] = useState<string>('fox');
  const [replaceWord, setReplaceWord] = useState<string>('cat');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [replaceAll, setReplaceAll] = useState<boolean>(true);
  const [wholeWord, setWholeWord] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [replacementsCount, setReplacementsCount] = useState<number>(0);

  const notify = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 2500);
  };

  // Compute matches found dynamically
  const matchesFound = useMemo(() => {
    if (!findWord || !text) return 0;
    try {
      const flags = caseSensitive ? 'g' : 'gi';
      const escaped = findWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = wholeWord ? `\\b${escaped}\\b` : escaped;
      const regex = new RegExp(pattern, flags);
      const matches = text.match(regex);
      return matches ? matches.length : 0;
    } catch {
      return 0;
    }
  }, [text, findWord, caseSensitive, wholeWord]);

  const handleReplace = () => {
    if (!findWord) {
      notify('Please enter a word or phrase to find');
      return;
    }

    try {
      const escaped = findWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = wholeWord ? `\\b${escaped}\\b` : escaped;

      if (replaceAll) {
        const flags = caseSensitive ? 'g' : 'gi';
        const regex = new RegExp(pattern, flags);
        const matches = text.match(regex);
        const count = matches ? matches.length : 0;
        const newText = text.replace(regex, replaceWord);
        setText(newText);
        setReplacementsCount(count);
        notify(count > 0 ? `Replaced ${count} occurrences` : 'No matches found to replace');
      } else {
        const flags = caseSensitive ? '' : 'i';
        const regex = new RegExp(pattern, flags);
        const hasMatch = regex.test(text);
        const newText = text.replace(regex, replaceWord);
        setText(newText);
        setReplacementsCount(hasMatch ? 1 : 0);
        notify(hasMatch ? 'Replaced 1st occurrence' : 'No match found');
      }
    } catch {
      notify('Invalid search pattern');
    }
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    notify('Copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
    setFindWord('');
    setReplaceWord('');
    setReplacementsCount(0);
    notify('Cleared text and inputs');
  };

  const faqs: FaqItem[] = [
    {
      question: 'What does Find & Replace do?',
      answer:
        'Find & Replace scans your text for every occurrence of a specific character, word, or multi-word phrase, and substitutes it with your chosen replacement text without you having to retype each instance manually.',
    },
    {
      question: 'Can I replace every occurrence at once?',
      answer:
        'Yes. With the "Replace all matches" option checked, every instance across your entire document is replaced in a single click. Unchecking it will only replace the first occurrence.',
    },
    {
      question: 'Is the search case-sensitive?',
      answer:
        'You have full control. By default, the search is case-insensitive so searching for "apple" also finds "Apple" and "APPLE". Enable "Case sensitive" if you only want exact character casing matches.',
    },
    {
      question: 'Can I replace a multi-word phrase or paragraph snippet?',
      answer:
        'Yes. You can input multiple words, phrases, numbers, or symbols into the "Find" field, and provide any replacement string or even leave the "Replace With" field empty to remove the phrase completely.',
    },
    {
      question: 'Does the tool modify my original text without my consent?',
      answer:
        'No. Nothing is replaced until you explicitly click the "Replace" button. Furthermore, your text is maintained only in your browser window and is never uploaded anywhere.',
    },
    {
      question: 'What is whole-word matching?',
      answer:
        'Whole-word matching uses word boundary markers (`\\b`) so that searching for "cat" will match "cat", but will not accidentally match "caterpillar", "scat", or "locate".',
    },
    {
      question: 'Can I copy the final modified result easily?',
      answer:
        'Yes. Clicking "Copy Result" immediately copies the updated text to your operating system clipboard, accompanied by a confirmation indicator.',
    },
    {
      question: 'What should I check after replacing text?',
      answer:
        'We recommend reviewing context around modified phrases, checking capitalization consistency, and verifying that whole-word boundaries did not unintentionally omit words adjoining hyphens or quotes.',
    },
  ];

  return (
    <div id="find-replace-tool" className="w-full space-y-8">
      {/* Interactive Tool Card */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 md:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                Text Utility
              </span>
              <span className="text-xs text-neutral-500">Fast Browser Search & Replace</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mt-1">Find & Replace Text</h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Find specific words or phrases in text and replace them quickly without manually editing every occurrence.
            </p>
          </div>

          {notice && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white text-xs rounded-lg animate-fade-in self-start sm:self-center">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>{notice}</span>
            </div>
          )}
        </div>

        {/* Text Input Area */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="find-replace-textarea" className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
              Working Text Content
            </label>
            <span className="text-xs text-neutral-500">
              {text.length} characters • {text.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>
          <textarea
            id="find-replace-textarea"
            rows={7}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full p-3.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 font-sans focus:bg-white focus:ring-2 focus:ring-neutral-900 focus:outline-hidden transition-all"
          />
        </div>

        {/* Search & Replace Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div>
            <label htmlFor="find-input" className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1">
              Find Word or Phrase
            </label>
            <div className="relative">
              <input
                id="find-input"
                type="text"
                value={findWord}
                onChange={(e) => setFindWord(e.target.value)}
                placeholder="e.g. fox"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-xs sm:text-sm text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label htmlFor="replace-input" className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1">
              Replace With
            </label>
            <input
              id="replace-input"
              type="text"
              value={replaceWord}
              onChange={(e) => setReplaceWord(e.target.value)}
              placeholder="e.g. cat (leave empty to delete)"
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-xs sm:text-sm text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Options & Statistics Bar */}
        <div className="mt-5 pt-4 border-t border-neutral-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <label className="inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-neutral-700 select-none">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="rounded text-neutral-900 focus:ring-neutral-900 w-4 h-4"
              />
              <span>Case sensitive</span>
            </label>

            <label className="inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-neutral-700 select-none">
              <input
                type="checkbox"
                checked={replaceAll}
                onChange={(e) => setReplaceAll(e.target.checked)}
                className="rounded text-neutral-900 focus:ring-neutral-900 w-4 h-4"
              />
              <span>Replace all matches</span>
            </label>

            <label className="inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-neutral-700 select-none">
              <input
                type="checkbox"
                checked={wholeWord}
                onChange={(e) => setWholeWord(e.target.checked)}
                className="rounded text-neutral-900 focus:ring-neutral-900 w-4 h-4"
              />
              <span>Whole word matching</span>
            </label>
          </div>

          {/* Useful Statistics */}
          <div className="flex items-center gap-3 text-xs bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200 text-neutral-700 self-start md:self-auto">
            <div>
              <span className="font-semibold text-neutral-900">Matches Found:</span>{' '}
              <span className="font-mono">{matchesFound}</span>
            </div>
            <span className="text-neutral-300">|</span>
            <div>
              <span className="font-semibold text-neutral-900">Replacements Made:</span>{' '}
              <span className="font-mono">{replacementsCount}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={handleReplace}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-lg text-xs sm:text-sm transition-colors cursor-pointer min-h-[44px] shadow-xs"
          >
            <Replace className="w-4 h-4" />
            <span>Replace</span>
          </button>

          <button
            onClick={handleCopy}
            disabled={!text}
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
                onClick={() => onSelectTool('whitespace-remover')}
                className="text-neutral-900 underline hover:text-neutral-700 cursor-pointer"
              >
                Whitespace Remover
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
              Editorial Guide: Precision Editing with Find & Replace
            </h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              Authored by Shahid Ali • 7 years practical digital workflow experience
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-neutral-700">
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">What Is Find & Replace?</h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Find & Replace is an essential text processing utility that automates bulk term substitution. Instead of scrolling through thousands of words manually searching for every typo, misspelled brand name, or obsolete price, this tool pinpoints every occurrence instantly.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">How Does Find & Replace Work?</h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                The tool constructs a client-side regular expression (RegExp) based on your chosen term. It safely escapes special punctuation characters (such as dots, asterisks, brackets, and question marks) to avoid syntax errors, checks for case sensitivity flags, and substitutes occurrences in computer memory.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">How to Use This Tool</h4>
              <ol className="list-decimal pl-4 space-y-1 text-xs sm:text-sm text-neutral-600">
                <li>Paste or type your draft text into the main content textarea.</li>
                <li>Enter the target search word or phrase into the <strong>Find</strong> field.</li>
                <li>Enter your new substitute into the <strong>Replace With</strong> field.</li>
                <li>Check the "Matches Found" indicator to verify how many occurrences exist.</li>
                <li>Click <strong>Replace</strong> to apply the changes, then <strong>Copy Result</strong>.</li>
              </ol>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">Common Uses</h4>
              <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm text-neutral-600">
                <li><strong>Editing repeated words:</strong> Swap placeholders like "[Client Name]" with real names.</li>
                <li><strong>Updating product names:</strong> Re-brand old model numbers across long specifications.</li>
                <li><strong>Correcting repeated mistakes:</strong> Fix a consistently misspelled foreign word or acronym.</li>
                <li><strong>Cleaning drafts:</strong> Remove recurring unwanted phrases by replacing with empty space.</li>
                <li><strong>Editing copied content:</strong> Harmonize terminology between different draft contributors.</li>
                <li><strong>Updating simple text lists:</strong> Modify domain extensions (e.g. .org to .com) in bulk.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-1 text-sm">Practical Example</h4>
              <div className="grid grid-cols-2 gap-2 p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs font-mono">
                <div>
                  <strong className="block text-[10px] text-neutral-500 uppercase font-sans mb-1">Original Text</strong>
                  The fox was fast. The fox was brown.
                </div>
                <div>
                  <strong className="block text-[10px] text-neutral-500 uppercase font-sans mb-1">After Replacing "fox" with "cat"</strong>
                  The cat was fast. The cat was brown.
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
              <h4 className="font-bold text-neutral-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                Tips for Accurate Replacements
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Always review the "Matches Found" count before clicking Replace. If you search for short abbreviations like "it" or "in" without whole-word matching enabled, you risk accidentally editing inside words like "writing" or "inside".
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqSection
        id="find-replace-faq"
        title="Frequently Asked Questions About Find & Replace"
        subtitle="Common questions regarding bulk replacements, whole word matching, and safety."
        items={faqs}
      />
    </div>
  );
}
