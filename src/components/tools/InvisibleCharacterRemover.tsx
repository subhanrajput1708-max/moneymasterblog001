import React, { useState, useMemo } from 'react';
import { EyeOff, Copy, Check, Trash2, RotateCcw, AlertTriangle, Info, BookOpen, Lightbulb, Shield, ArrowRight } from 'lucide-react';
import { ToolId } from '../../types';
import FaqSection, { FaqItem } from '../common/FaqSection';

interface InvisibleCharacterRemoverProps {
  onSelectTool?: (toolId: ToolId) => void;
}

interface CharInfo {
  code: string;
  name: string;
  regex: RegExp;
  category: 'zero-width' | 'format' | 'space' | 'control';
}

const INVISIBLE_DEFINITIONS: CharInfo[] = [
  { code: 'U+200B', name: 'Zero-Width Space (ZWSP)', regex: /\u200B/g, category: 'zero-width' },
  { code: 'U+200C', name: 'Zero-Width Non-Joiner (ZWNJ)', regex: /\u200C/g, category: 'zero-width' },
  { code: 'U+200D', name: 'Zero-Width Joiner (ZWJ)', regex: /\u200D/g, category: 'zero-width' },
  { code: 'U+FEFF', name: 'Byte Order Mark / Zero-Width No-Break Space (BOM)', regex: /\uFEFF/g, category: 'zero-width' },
  { code: 'U+2060', name: 'Word Joiner (WJ)', regex: /\u2060/g, category: 'zero-width' },
  { code: 'U+00A0', name: 'Non-Breaking Space (NBSP)', regex: /\u00A0/g, category: 'space' },
  { code: 'U+00AD', name: 'Soft Hyphen (SHY)', regex: /\u00AD/g, category: 'format' },
  { code: 'U+200E', name: 'Left-to-Right Mark (LRM)', regex: /\u200E/g, category: 'format' },
  { code: 'U+200F', name: 'Right-to-Left Mark (RLM)', regex: /\u200F/g, category: 'format' },
  { code: 'U+202A-E', name: 'BiDi Embedding / Override Controls', regex: /[\u202A-\u202E\u2066-\u2069]/g, category: 'format' },
  { code: 'U+2062-4', name: 'Invisible Operators / Separators', regex: /[\u2061-\u2064]/g, category: 'format' },
  { code: 'U+180E', name: 'Mongolian Vowel Separator', regex: /\u180E/g, category: 'format' },
  { code: 'Ctrl', name: 'Non-Printable Control Codes (ASCII 0-8, 11-12, 14-31)', regex: /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, category: 'control' },
];

export default function InvisibleCharacterRemover({ onSelectTool }: InvisibleCharacterRemoverProps) {
  // Sample text containing deliberate hidden characters
  const defaultSample = `Hello\u200BWorld! This\u00A0sentence contains\u200C invisible\uFEFF characters copied from a rich text\u00AD document.`;
  
  const [inputText, setInputText] = useState<string>(defaultSample);
  const [outputText, setOutputText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [showInspector, setShowInspector] = useState<boolean>(false);

  // Filter options
  const [removeZeroWidth, setRemoveZeroWidth] = useState<boolean>(true);
  const [convertNbsp, setConvertNbsp] = useState<boolean>(true); // Convert NBSP to normal space
  const [removeSoftHyphens, setRemoveSoftHyphens] = useState<boolean>(true);
  const [removeBidi, setRemoveBidi] = useState<boolean>(true);
  const [removeControlCodes, setRemoveControlCodes] = useState<boolean>(true);

  const notify = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 2500);
  };

  // Real-time detection analysis
  const detectionStats = useMemo(() => {
    const counts: Record<string, number> = {};
    let totalDetected = 0;

    INVISIBLE_DEFINITIONS.forEach((def) => {
      const matches = inputText.match(def.regex);
      const count = matches ? matches.length : 0;
      counts[def.name] = count;
      totalDetected += count;
    });

    return {
      totalDetected,
      counts,
      originalChars: inputText.length,
    };
  }, [inputText]);

  // Clean execution
  const handleClean = () => {
    if (!inputText) {
      setOutputText('');
      notify('Please enter or paste text to clean');
      return;
    }

    let result = inputText;

    // 1. Remove Zero-Width (ZWSP, ZWNJ, ZWJ, BOM, Word Joiner)
    if (removeZeroWidth) {
      result = result.replace(/[\u200B\u200C\u200D\uFEFF\u2060]/g, '');
    }

    // 2. Convert or remove NBSP
    if (convertNbsp) {
      result = result.replace(/\u00A0/g, ' ');
    }

    // 3. Remove Soft Hyphens
    if (removeSoftHyphens) {
      result = result.replace(/\u00AD/g, '');
    }

    // 4. Remove BiDi controls and invisible separators
    if (removeBidi) {
      result = result.replace(/[\u200E\u200F\u202A-\u202E\u2061-\u2064\u2066-\u2069\u180E]/g, '');
    }

    // 5. Remove control codes (preserve tabs and standard line returns)
    if (removeControlCodes) {
      result = result.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
    }

    setOutputText(result);
    notify('Cleaned text successfully!');
  };

  const handleCopy = () => {
    const textToCopy = outputText || inputText;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    notify('Copied cleaned text to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    notify('Cleared text area');
  };

  const handleReset = () => {
    setInputText(defaultSample);
    setOutputText('');
    notify('Reset to sample text');
  };

  // Visual representation for Inspector mode
  const renderVisualTokens = () => {
    if (!inputText) return null;

    const parts: React.ReactNode[] = [];
    let keyIdx = 0;

    for (let i = 0; i < inputText.length; i++) {
      const char = inputText[i];
      const code = char.charCodeAt(0);

      if (char === '\u200B') {
        parts.push(<span key={keyIdx++} className="bg-rose-100 text-rose-800 text-[10px] font-mono px-1 py-0.5 rounded mx-0.5 border border-rose-300">ZWSP</span>);
      } else if (char === '\u200C') {
        parts.push(<span key={keyIdx++} className="bg-amber-100 text-amber-800 text-[10px] font-mono px-1 py-0.5 rounded mx-0.5 border border-amber-300">ZWNJ</span>);
      } else if (char === '\u200D') {
        parts.push(<span key={keyIdx++} className="bg-amber-100 text-amber-800 text-[10px] font-mono px-1 py-0.5 rounded mx-0.5 border border-amber-300">ZWJ</span>);
      } else if (char === '\uFEFF') {
        parts.push(<span key={keyIdx++} className="bg-purple-100 text-purple-800 text-[10px] font-mono px-1 py-0.5 rounded mx-0.5 border border-purple-300">BOM</span>);
      } else if (char === '\u00A0') {
        parts.push(<span key={keyIdx++} className="bg-blue-100 text-blue-800 text-[10px] font-mono px-1 py-0.5 rounded mx-0.5 border border-blue-300">NBSP</span>);
      } else if (char === '\u00AD') {
        parts.push(<span key={keyIdx++} className="bg-indigo-100 text-indigo-800 text-[10px] font-mono px-1 py-0.5 rounded mx-0.5 border border-indigo-300">SHY</span>);
      } else if (code < 32 && char !== '\n' && char !== '\t' && char !== '\r') {
        parts.push(<span key={keyIdx++} className="bg-neutral-200 text-neutral-800 text-[10px] font-mono px-1 py-0.5 rounded mx-0.5 border border-neutral-300">CTRL</span>);
      } else {
        parts.push(char);
      }
    }

    return parts;
  };

  const faqs: FaqItem[] = [
    {
      question: 'What are invisible Unicode characters?',
      answer:
        'Invisible Unicode characters are valid typographical codepoints that occupy memory in a text string but do not render any visible glyph or ink on the screen. Common examples include the Zero-Width Space (U+200B), Zero-Width Joiner (U+200D), Byte Order Mark (U+FEFF), and Non-Breaking Space (U+00A0).',
    },
    {
      question: 'Why do hidden characters appear in pasted text?',
      answer:
        'They are frequently injected automatically by rich word processors (Microsoft Word, Google Docs), PDF export engines, web scrapers, code highlighters, and chat applications to manage hyphenation boundaries, text flow, character joining, or character encoding detection.',
    },
    {
      question: 'What technical problems do invisible characters cause?',
      answer:
        'Because they are invisible to human eyes, they frequently cause failed password logins, database search mismatches (e.g. searching for "apple" fails when text has "app[ZWSP]le"), broken command-line code execution, syntax compilation errors, and unexpected line breaks.',
    },
    {
      question: 'How does this tool detect and remove them?',
      answer:
        'The tool scans the exact Unicode codepoints of your input string in memory against a comprehensive catalog of non-rendering, zero-width, and formatting characters. It provides detailed statistics and filters them out using client-side JavaScript.',
    },
    {
      question: 'Will removing invisible characters damage normal text?',
      answer:
        'No. Standard alphanumeric letters, punctuation marks, numbers, tabs, and regular spacebar spaces (ASCII 32) are fully preserved. Non-breaking spaces (NBSP) can either be converted into normal standard spaces or removed based on your preferences.',
    },
    {
      question: 'When should I NOT remove invisible characters?',
      answer:
        'Certain non-Latin writing systems (including Persian, Arabic, and Indic languages like Devanagari) legitimately require Zero-Width Non-Joiners (ZWNJ) and Zero-Width Joiners (ZWJ) to display correct cursive ligature shapes. Complex emoji sequences (such as family emojis) also rely on ZWJ to combine multiple glyphs.',
    },
    {
      question: 'Can I view exactly where the hidden characters were hiding?',
      answer:
        'Yes. Toggle the "Inspect Hidden Tokens" view. This highlights invisible characters with color-coded badges (such as [ZWSP], [NBSP], or [BOM]) directly within the text layout so you can inspect their exact locations.',
    },
    {
      question: 'Is my pasted text kept private and secure?',
      answer:
        'Yes, 100%. Like all tools on Money Master Blog, the Invisible Character Remover processes text entirely within your local browser memory using JavaScript. Zero text data is ever transmitted, logged, or stored on external servers.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Tool Header Card */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-neutral-100 text-neutral-800 text-xs font-semibold mb-2">
              <EyeOff className="w-3.5 h-3.5" />
              <span>Text Utility Suite • Tool #11</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Invisible Character Remover
            </h2>
            <p className="text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
              Detect and remove hidden Unicode characters, zero-width spaces, byte order marks, and formatting artifacts that cause search mismatches and broken code.
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
              Original Chars
            </span>
            <span className="text-xl font-bold text-neutral-900 mt-0.5 block">
              {detectionStats.originalChars}
            </span>
          </div>

          <div className={`p-3 rounded-lg text-left border ${
            detectionStats.totalDetected > 0 ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
          }`}>
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
              Hidden Detected
            </span>
            <span className="text-xl font-bold mt-0.5 block">
              {detectionStats.totalDetected}
            </span>
          </div>

          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-left">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
              Cleaned Chars
            </span>
            <span className="text-xl font-bold text-neutral-900 mt-0.5 block">
              {outputText ? outputText.length : detectionStats.originalChars}
            </span>
          </div>

          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-left">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
              Chars Removed
            </span>
            <span className="text-xl font-bold text-emerald-600 mt-0.5 block">
              {outputText ? Math.max(0, detectionStats.originalChars - outputText.length) : 0}
            </span>
          </div>
        </div>

        {/* Detailed Breakdown Badge Row if hidden characters detected */}
        {detectionStats.totalDetected > 0 && (
          <div className="mb-6 p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Invisible Characters Found in Input Text:</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {Object.entries(detectionStats.counts).map(([name, count]) => {
                if (count === 0) return null;
                return (
                  <span key={name} className="px-2 py-1 bg-white border border-amber-300 rounded text-[11px] font-medium text-amber-900 shadow-2xs">
                    {name}: <strong className="font-bold">{count}</strong>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Cleaning Options Toggles */}
        <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl mb-6 space-y-3">
          <div className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
            Cleaning & Removal Rules
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <label className="flex items-center gap-2.5 text-xs text-neutral-800 cursor-pointer">
              <input
                type="checkbox"
                checked={removeZeroWidth}
                onChange={(e) => setRemoveZeroWidth(e.target.checked)}
                className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
              />
              <span>Remove Zero-Width (ZWSP, ZWNJ, ZWJ, BOM)</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-neutral-800 cursor-pointer">
              <input
                type="checkbox"
                checked={convertNbsp}
                onChange={(e) => setConvertNbsp(e.target.checked)}
                className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
              />
              <span>Convert Non-Breaking Spaces (NBSP) to Regular Space</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-neutral-800 cursor-pointer">
              <input
                type="checkbox"
                checked={removeSoftHyphens}
                onChange={(e) => setRemoveSoftHyphens(e.target.checked)}
                className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
              />
              <span>Remove Soft Hyphens (U+00AD)</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-neutral-800 cursor-pointer">
              <input
                type="checkbox"
                checked={removeBidi}
                onChange={(e) => setRemoveBidi(e.target.checked)}
                className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
              />
              <span>Remove BiDi Control Codes & Invisible Separators</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-neutral-800 cursor-pointer">
              <input
                type="checkbox"
                checked={removeControlCodes}
                onChange={(e) => setRemoveControlCodes(e.target.checked)}
                className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
              />
              <span>Remove ASCII Non-Printable Control Characters</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-neutral-800 cursor-pointer">
              <input
                type="checkbox"
                checked={showInspector}
                onChange={(e) => setShowInspector(e.target.checked)}
                className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900"
              />
              <span className="font-semibold text-neutral-900">Inspect & Highlight Hidden Tokens</span>
            </label>
          </div>
        </div>

        {/* Input / Output Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="invisible-input" className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Input Text with Hidden Characters
              </label>
              <span className="text-xs text-neutral-500">
                {inputText.length} characters
              </span>
            </div>
            <textarea
              id="invisible-input"
              rows={8}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste text here to detect and clean hidden invisible characters..."
              className="w-full p-3.5 bg-white border border-neutral-300 rounded-xl text-sm font-mono text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden leading-relaxed shadow-2xs"
            />

            {/* Inspector Preview if enabled */}
            {showInspector && (
              <div className="p-3 bg-neutral-900 text-neutral-100 rounded-xl text-xs font-mono break-words leading-loose max-h-40 overflow-y-auto border border-neutral-800">
                <div className="text-[10px] text-neutral-400 font-sans uppercase tracking-wider mb-1">
                  Token Inspector (Visualizing Invisible Codepoints)
                </div>
                {renderVisualTokens()}
              </div>
            )}
          </div>

          {/* Output Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="invisible-output" className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Cleaned Output Text
              </label>
              <span className="text-xs text-neutral-500">
                {outputText ? outputText.length : 0} characters
              </span>
            </div>
            <textarea
              id="invisible-output"
              rows={8}
              readOnly
              value={outputText}
              placeholder="Click 'Clean Invisible Characters' to generate cleaned, sanitized output..."
              className="w-full p-3.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-mono text-neutral-900 focus:outline-hidden leading-relaxed shadow-2xs"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              id="btn-clean-invisible"
              onClick={handleClean}
              className="px-6 py-3 rounded-lg bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer min-h-[44px]"
            >
              Clean Invisible Characters
            </button>
            <button
              id="btn-copy-invisible"
              onClick={handleCopy}
              disabled={!outputText && !inputText}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg bg-white border border-neutral-300 text-neutral-800 text-sm font-semibold hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer min-h-[44px] disabled:opacity-50"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Result'}</span>
            </button>
          </div>

          <div className="text-xs text-neutral-500">
            Client-side regex execution • Zero data transmission
          </div>
        </div>
      </div>

      {/* Caution & Language Notice */}
      <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-amber-950">
          <Info className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Important Notice Regarding Unicode Scripts & Complex Emojis</span>
        </div>
        <p className="leading-relaxed">
          Certain Unicode codepoints (specifically Zero-Width Joiner <code className="bg-amber-100 px-1 py-0.5 rounded">U+200D</code> and Zero-Width Non-Joiner <code className="bg-amber-100 px-1 py-0.5 rounded">U+200C</code>) are grammatically necessary for cursive ligatures in languages such as Arabic, Persian, Urdu, and Indic scripts, as well as multi-part emoji sequences. Always review your cleaned text before using it in localized multilingual content.
        </p>
      </div>

      {/* Editorial Content: Detailed Guide */}
      <section className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-start gap-3 border-b border-neutral-200 pb-4">
          <BookOpen className="w-5 h-5 text-neutral-900 mt-0.5 shrink-0" />
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
              Understanding Invisible Characters in Digital Workflows
            </h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              Authored by Shahid Ali • 7 years practical experience with web utilities and content workflows
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-neutral-700">
          <div className="space-y-4">
            <h4 className="font-bold text-neutral-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              What Are Invisible Characters and Where Do They Come From?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              When working on modern computers, not every character you copy has a visible shape. Unicode defines hundreds of functional formatting characters designed to control line breaks, script rendering, text direction, and character encoding identification.
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              The most common source is copying text from rich-text documents such as Google Docs, Microsoft Word, email clients, and PDF files. For instance, when Word hyphenates a word across lines, it often injects a hidden Soft Hyphen (U+00AD) or Zero-Width Space (U+200B). When you paste that text into an HTML editor, CMS, or code terminal, those invisible codepoints travel with it silently.
            </p>
            <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 text-xs space-y-1.5">
              <span className="font-bold text-neutral-900">Common Problems Caused:</span>
              <ul className="list-disc pl-4 space-y-1 text-neutral-600">
                <li>Database and search engine queries fail because "apple" does not equal "app[ZWSP]le".</li>
                <li>Passwords and authentication keys fail because unseen codepoints change hash calculations.</li>
                <li>Code compilation errors such as "unexpected token in source code".</li>
                <li>Spurious line wraps in web design layouts and typography.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-neutral-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <Shield className="w-4 h-4 text-emerald-600" />
              How to Use and Privacy Architecture
            </h4>
            <ol className="list-decimal pl-4 space-y-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
              <li><strong>Paste your text</strong> into the input box. The tool automatically detects and breaks down hidden characters in real-time.</li>
              <li><strong>Check the inspection bar</strong> to see which exact Unicode codepoints are present.</li>
              <li><strong>Toggle cleaning options</strong> according to your project requirements (e.g. converting non-breaking spaces into regular spaces).</li>
              <li><strong>Click Clean Invisible Characters</strong> and copy your sanitized text directly to your clipboard.</li>
            </ol>
            <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 text-xs text-neutral-600 space-y-1">
              <strong className="text-neutral-900">Privacy Guarantee:</strong>
              <p>
                No text entered into the Invisible Character Remover is ever sent over the internet or saved on remote servers. All regex scanning runs purely inside your browser's local sandbox memory.
              </p>
            </div>
          </div>
        </div>

        {/* Related Utility Tools Links */}
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
                  onClick={() => onSelectTool('remove-line-breaks')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-800 hover:text-neutral-950 underline underline-offset-4 cursor-pointer"
                >
                  <span>Remove Line Breaks</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Dedicated Tool FAQs */}
      <FaqSection
        id="invisible-char-faqs"
        title="Frequently Asked Questions About Invisible Characters"
        subtitle="Clear, practical answers about detecting, removing, and debugging hidden Unicode characters."
        items={faqs}
      />
    </div>
  );
}
