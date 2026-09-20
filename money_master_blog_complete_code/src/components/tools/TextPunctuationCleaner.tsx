import React, { useState } from 'react';
import { Type, Copy, Check, Trash2, RotateCcw, BookOpen, Lightbulb, Shield, ArrowRight } from 'lucide-react';
import { ToolId } from '../../types';
import FaqSection, { FaqItem } from '../common/FaqSection';

interface TextPunctuationCleanerProps {
  onSelectTool?: (toolId: ToolId) => void;
}

export default function TextPunctuationCleaner({ onSelectTool }: TextPunctuationCleanerProps) {
  const sampleInput = `Hello,,, world!!! How are you doing today???\nThis is a test draft... with multiple repeated periods,, and erratic spacing before commas , colons : and exclamation marks !\nIt also includes well-known hyphenated words, user's contractions (don't, can't), and numeric values like $24.99 or 1,000.`;

  const [inputText, setInputText] = useState<string>(sampleInput);
  const [outputText, setOutputText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [notice, setNotice] = useState<string | null>(null);

  // Cleaning Options
  const [collapseRepeatedPeriods, setCollapseRepeatedPeriods] = useState<boolean>(true);
  const [collapseRepeatedCommas, setCollapseRepeatedCommas] = useState<boolean>(true);
  const [collapseRepeatedExclamations, setCollapseRepeatedExclamations] = useState<boolean>(true);
  const [collapseRepeatedQuestions, setCollapseRepeatedQuestions] = useState<boolean>(true);
  const [collapseRepeatedGeneral, setCollapseRepeatedGeneral] = useState<boolean>(true); // e.g. ;;; ---
  const [trimSpaceBeforePunctuation, setTrimSpaceBeforePunctuation] = useState<boolean>(true); // "word ," -> "word,"
  const [ensureSpaceAfterPunctuation, setEnsureSpaceAfterPunctuation] = useState<boolean>(true); // "word,next" -> "word, next"
  const [removeAllPunctuation, setRemoveAllPunctuation] = useState<boolean>(false);
  const [preserveApostrophes, setPreserveApostrophes] = useState<boolean>(true);
  const [preserveHyphens, setPreserveHyphens] = useState<boolean>(true);
  const [preserveDecimals, setPreserveDecimals] = useState<boolean>(true);

  const notify = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 2500);
  };

  const handleClean = () => {
    if (!inputText) {
      setOutputText('');
      notify('Please enter or paste text to clean');
      return;
    }

    let text = inputText;

    // Mode A: Remove All Punctuation
    if (removeAllPunctuation) {
      if (preserveDecimals) {
        // Temporarily protect decimals: e.g. 24.99 -> __DEC_24_99__
        text = text.replace(/(\d+)\.(\d+)/g, '$1__DEC__$2');
        text = text.replace(/(\d+),(\d{3})/g, '$1__COM__$2');
      }

      if (preserveApostrophes) {
        // Protect contractions: don't, it's, etc.
        text = text.replace(/(\b[a-zA-Z]+)['’]([a-zA-Z]+\b)/g, '$1__APOS__$2');
      }

      if (preserveHyphens) {
        // Protect hyphenated compound words: e.g. well-known
        text = text.replace(/(\b[a-zA-Z]+)-([a-zA-Z]+\b)/g, '$1__HYPH__$2');
      }

      // Strip all remaining punctuation marks
      text = text.replace(/[.,/#!$%^&*;:{}=\-_`~()?"'<>@\\|[\]+]/g, '');

      // Restore protected tokens
      if (preserveDecimals) {
        text = text.replace(/__DEC__/g, '.');
        text = text.replace(/__COM__/g, ',');
      }
      if (preserveApostrophes) {
        text = text.replace(/__APOS__/g, "'");
      }
      if (preserveHyphens) {
        text = text.replace(/__HYPH__/g, '-');
      }

      // Collapse multiple spaces
      text = text.replace(/ {2,}/g, ' ').trim();
      setOutputText(text);
      notify('All punctuation removed according to preferences');
      return;
    }

    // Mode B: Selective Normalization & Repeated Cleaning
    // 1. Trim space before punctuation: e.g. "word ," -> "word,"
    if (trimSpaceBeforePunctuation) {
      text = text.replace(/\s+([.,;:!?])/g, '$1');
    }

    // 2. Collapse repeated periods into single period (protect ellipses if user wants, or collapse)
    if (collapseRepeatedPeriods) {
      text = text.replace(/\.{2,}/g, '.');
    }

    // 3. Collapse repeated commas
    if (collapseRepeatedCommas) {
      text = text.replace(/,{2,}/g, ',');
    }

    // 4. Collapse repeated exclamation marks
    if (collapseRepeatedExclamations) {
      text = text.replace(/!{2,}/g, '!');
    }

    // 5. Collapse repeated question marks
    if (collapseRepeatedQuestions) {
      text = text.replace(/\?{2,}/g, '?');
    }

    // 6. Clean mixed exclamation/question marks (e.g. "?!?!" -> "?")
    if (collapseRepeatedGeneral) {
      text = text.replace(/[?!]{2,}/g, '?');
      text = text.replace(/;{2,}/g, ';');
      text = text.replace(/:{2,}/g, ':');
      text = text.replace(/-{3,}/g, '—'); // convert 3+ dashes into clean em-dash
    }

    // 7. Ensure space after punctuation (except decimals or abbreviations like e.g. / i.e.)
    if (ensureSpaceAfterPunctuation) {
      // Don't add space between digits (e.g. 3.14 or 1,000)
      text = text.replace(/([,;:!?])([a-zA-Z])/g, '$1 $2');
      text = text.replace(/(\.)([A-Z])/g, '$1 $2');
    }

    // Final cleanup of multiple spaces
    text = text.replace(/ {2,}/g, ' ');

    setOutputText(text);
    notify('Punctuation cleaned successfully!');
  };

  const handleCopy = () => {
    const textToCopy = outputText || inputText;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    notify('Copied cleaned text!');
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
    setRemoveAllPunctuation(false);
    notify('Reset to sample text');
  };

  // Metrics
  const countPunctuation = (str: string) => {
    const matches = str.match(/[.,/#!$%^&*;:{}=\-_`~()?"'<>@\\|[\]+]/g);
    return matches ? matches.length : 0;
  };

  const inputPunctCount = countPunctuation(inputText);
  const outputPunctCount = outputText ? countPunctuation(outputText) : inputPunctCount;

  const faqs: FaqItem[] = [
    {
      question: 'What does text punctuation cleanup do?',
      answer:
        'Punctuation cleanup normalizes pasted drafts by collapsing repeated symbols (such as `,,,`, `!!!!`, or `???`), stripping accidental spaces before punctuation (`word ,` to `word,`), and optionally removing all symbols while protecting numbers, contractions, and hyphens.',
    },
    {
      question: 'Why does repeated or erratic punctuation happen?',
      answer:
        'It frequently occurs in informal conversational chats, social media comments, text scraped from scanned documents with OCR errors, or hasty keyboard typing where punctuation keys were held down.',
    },
    {
      question: 'Will cleaning punctuation damage numbers with decimal points or currency symbols?',
      answer:
        'No. When "Preserve Decimals & Numbers" is enabled, prices like `$24.99`, percentages like `15.5%`, and thousands commas like `1,000` are protected from deletion or distortion.',
    },
    {
      question: 'Can I keep apostrophes in contractions like "don\'t" and "can\'t"?',
      answer:
        'Yes. By toggling "Preserve Apostrophes", contractions and possessive nouns (`Shahid\'s`, `it\'s`, `we\'re`) remain intact even if you choose to remove all general punctuation marks.',
    },
    {
      question: 'How does the tool handle spaces before commas and colons?',
      answer:
        'It strips unnecessary leading horizontal spaces before punctuation marks (e.g. converting `Hello , world !` into `Hello, world!`), bringing the text into alignment with standard English grammatical conventions.',
    },
    {
      question: 'Does this tool support curly or smart quotation marks?',
      answer:
        'Yes. It recognizes standard ASCII punctuation marks as well as Unicode smart quotes (`“”` and `‘’`) and em-dashes.',
    },
    {
      question: 'When should I preserve original punctuation?',
      answer:
        'You should keep punctuation intact in programming code (such as JSON, JavaScript, or SQL), mathematical equations, URLs, and legal agreements where commas and semicolons determine clause interpretations.',
    },
    {
      question: 'Is my text processed securely on my local computer?',
      answer:
        'Yes. All string parsing and regex replacements run client-side in your browser using JavaScript. No text is uploaded to any remote server or stored in any database.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Tool Header Card */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-neutral-100 text-neutral-800 text-xs font-semibold mb-2">
              <Type className="w-3.5 h-3.5" />
              <span>Text Utility Suite • Tool #12</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Text Punctuation Cleaner
            </h2>
            <p className="text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
              Clean, normalize, and fix erratic punctuation, repeated commas, multiple exclamation marks, or strip all punctuation while preserving numbers and contractions.
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
              Original Characters
            </span>
            <span className="text-xl font-bold text-neutral-900 mt-0.5 block">
              {inputText.length}
            </span>
          </div>

          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-left">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
              Punctuation Marks
            </span>
            <span className="text-xl font-bold text-neutral-900 mt-0.5 block">
              {inputPunctCount}
            </span>
          </div>

          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-left">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
              Cleaned Punctuation
            </span>
            <span className="text-xl font-bold text-neutral-900 mt-0.5 block">
              {outputText ? outputPunctCount : inputPunctCount}
            </span>
          </div>

          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-left">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
              Marks Removed
            </span>
            <span className="text-xl font-bold text-emerald-600 mt-0.5 block">
              {outputText ? Math.max(0, inputPunctCount - outputPunctCount) : 0}
            </span>
          </div>
        </div>

        {/* Cleaning Options */}
        <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200/80 pb-2">
            <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
              Punctuation Cleaning Options
            </span>
            <label className="inline-flex items-center gap-2 text-xs font-bold text-rose-700 cursor-pointer">
              <input
                type="checkbox"
                checked={removeAllPunctuation}
                onChange={(e) => setRemoveAllPunctuation(e.target.checked)}
                className="w-4 h-4 text-rose-600 rounded border-neutral-300 focus:ring-rose-500"
              />
              <span>Remove ALL Punctuation Completely</span>
            </label>
          </div>

          {removeAllPunctuation ? (
            <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-lg text-xs space-y-2">
              <div className="font-semibold text-rose-900">
                All-Punctuation Removal Mode Enabled:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="flex items-center gap-2 text-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preserveApostrophes}
                    onChange={(e) => setPreserveApostrophes(e.target.checked)}
                    className="w-4 h-4 text-neutral-900 rounded border-neutral-300"
                  />
                  <span>Preserve Contraction Apostrophes (e.g. don't)</span>
                </label>
                <label className="flex items-center gap-2 text-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preserveHyphens}
                    onChange={(e) => setPreserveHyphens(e.target.checked)}
                    className="w-4 h-4 text-neutral-900 rounded border-neutral-300"
                  />
                  <span>Preserve Hyphenated Words (e.g. well-known)</span>
                </label>
                <label className="flex items-center gap-2 text-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preserveDecimals}
                    onChange={(e) => setPreserveDecimals(e.target.checked)}
                    className="w-4 h-4 text-neutral-900 rounded border-neutral-300"
                  />
                  <span>Preserve Numbers & Decimals ($24.99, 1,000)</span>
                </label>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={collapseRepeatedPeriods}
                  onChange={(e) => setCollapseRepeatedPeriods(e.target.checked)}
                  className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
                />
                <span>Collapse repeated periods (.... → .)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={collapseRepeatedCommas}
                  onChange={(e) => setCollapseRepeatedCommas(e.target.checked)}
                  className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
                />
                <span>Collapse repeated commas (,,, → ,)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={collapseRepeatedExclamations}
                  onChange={(e) => setCollapseRepeatedExclamations(e.target.checked)}
                  className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
                />
                <span>Collapse repeated exclamations (!!! → !)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={collapseRepeatedQuestions}
                  onChange={(e) => setCollapseRepeatedQuestions(e.target.checked)}
                  className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
                />
                <span>Collapse repeated questions (??? → ?)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={trimSpaceBeforePunctuation}
                  onChange={(e) => setTrimSpaceBeforePunctuation(e.target.checked)}
                  className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
                />
                <span>Trim spaces before punctuation ("word ," → "word,")</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={ensureSpaceAfterPunctuation}
                  onChange={(e) => setEnsureSpaceAfterPunctuation(e.target.checked)}
                  className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
                />
                <span>Ensure space after punctuation ("word,next" → "word, next")</span>
              </label>
            </div>
          )}
        </div>

        {/* Input / Output Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="punct-input" className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Input Text with Punctuation
              </label>
              <span className="text-xs text-neutral-500">
                {inputText.length} characters
              </span>
            </div>
            <textarea
              id="punct-input"
              rows={8}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste text here to clean repeated punctuation, fix spacing, or strip marks..."
              className="w-full p-3.5 bg-white border border-neutral-300 rounded-xl text-sm font-mono text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden leading-relaxed shadow-2xs"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="punct-output" className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Cleaned Output Text
              </label>
              <span className="text-xs text-neutral-500">
                {outputText ? outputText.length : 0} characters
              </span>
            </div>
            <textarea
              id="punct-output"
              rows={8}
              readOnly
              value={outputText}
              placeholder="Click 'Clean Punctuation' to generate normalized output..."
              className="w-full p-3.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-mono text-neutral-900 focus:outline-hidden leading-relaxed shadow-2xs"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              id="btn-clean-punct"
              onClick={handleClean}
              className="px-6 py-3 rounded-lg bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer min-h-[44px]"
            >
              Clean Punctuation
            </button>
            <button
              id="btn-copy-punct"
              onClick={handleCopy}
              disabled={!outputText && !inputText}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg bg-white border border-neutral-300 text-neutral-800 text-sm font-semibold hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer min-h-[44px] disabled:opacity-50"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Result'}</span>
            </button>
          </div>

          <div className="text-xs text-neutral-500">
            Instant client-side transformation • Privacy protected
          </div>
        </div>
      </div>

      {/* Editorial Content */}
      <section className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-start gap-3 border-b border-neutral-200 pb-4">
          <BookOpen className="w-5 h-5 text-neutral-900 mt-0.5 shrink-0" />
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
              Why Punctuation Cleaning Matters in Content & Data Workflows
            </h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              Authored by Shahid Ali • 7 years practical experience in digital content workflows
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-neutral-700">
          <div className="space-y-4">
            <h4 className="font-bold text-neutral-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              Common Causes of Erratic Punctuation
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Pasting text from informal chat logs, voice-to-text dictation apps, customer survey replies, or OCR-scanned PDFs frequently introduces broken punctuation patterns. In casual conversation, writers frequently type excessive exclamation points (`Great job!!!!!`) or multiple question marks (`Why???`).
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              When republishing this copy into editorial articles, corporate newsletters, or database entries, repeated punctuation looks unpolished and unprofessional. Standardizing these marks with a single click saves hours of manual proofreading.
            </p>
            <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 text-xs space-y-1.5">
              <strong className="text-neutral-900">Practical Example Transformation:</strong>
              <div className="font-mono text-neutral-600">
                <strong>Before:</strong> Hello ,,, world !!! How are you ???<br />
                <strong>After:</strong> Hello, world! How are you?
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-neutral-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <Shield className="w-4 h-4 text-emerald-600" />
              Protecting Numbers, Decimals, and Contractions
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              One of the major flaws in generic string cleaners is that they indiscriminately delete apostrophes from contractions (`don't` turns into `dont`), destroy decimal points in financial amounts (`$24.99` turns into `2499`), and ruin compound hyphenated words.
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Money Master Blog's Text Punctuation Cleaner includes smart token guards that isolate numbers, currency figures, and contractions before running general punctuation filters, ensuring your prose remains grammatically sound.
            </p>
          </div>
        </div>

        {/* Related Utilities Links */}
        <div className="pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Related Text Cleaning Utilities:
          </span>
          <div className="flex flex-wrap items-center gap-3">
            {onSelectTool && (
              <>
                <button
                  onClick={() => onSelectTool('word-counter')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-800 hover:text-neutral-950 underline underline-offset-4 cursor-pointer"
                >
                  <span>Text Cleaner & Case Converter</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onSelectTool('whitespace-remover')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-800 hover:text-neutral-950 underline underline-offset-4 cursor-pointer"
                >
                  <span>Whitespace Remover</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onSelectTool('invisible-character-remover')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-800 hover:text-neutral-950 underline underline-offset-4 cursor-pointer"
                >
                  <span>Invisible Character Remover</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Dedicated Tool FAQs */}
      <FaqSection
        id="punctuation-cleaner-faqs"
        title="Frequently Asked Questions About Text Punctuation Cleaning"
        subtitle="Detailed answers on cleaning repeated marks, preserving contractions, and standardizing text drafts."
        items={faqs}
      />
    </div>
  );
}
