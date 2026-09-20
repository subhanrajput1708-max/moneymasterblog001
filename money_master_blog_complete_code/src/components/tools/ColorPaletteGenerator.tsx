import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Copy, Check, Lock, Unlock, Download, Sparkles, SlidersHorizontal } from 'lucide-react';
import { PaletteColor } from '../../types';

// Helper: Convert HSL to Hex
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

// Calculate luminance to decide whether text on swatch should be white or black
function getContrastColor(hex: string): 'text-white' | 'text-neutral-900' {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  // Perceived luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? 'text-neutral-900' : 'text-white';
}

type PaletteMode = 'balanced' | 'vibrant' | 'pastel' | 'warm' | 'cool' | 'monochrome';

function generateColorByMode(mode: PaletteMode, index: number, baseHue: number): string {
  let h = 0;
  let s = 70;
  let l = 50;

  switch (mode) {
    case 'vibrant':
      h = (baseHue + index * 60 + Math.floor(Math.random() * 25)) % 360;
      s = 85 + Math.floor(Math.random() * 15);
      l = 50 + Math.floor(Math.random() * 10);
      break;
    case 'pastel':
      h = (baseHue + index * 50 + Math.floor(Math.random() * 30)) % 360;
      s = 40 + Math.floor(Math.random() * 25);
      l = 75 + Math.floor(Math.random() * 15);
      break;
    case 'warm':
      // Hues between 0 (red) and 60 (yellow) or 340-360
      h = (345 + (index * 18) + Math.floor(Math.random() * 12)) % 360;
      s = 65 + Math.floor(Math.random() * 25);
      l = 45 + Math.floor(Math.random() * 25);
      break;
    case 'cool':
      // Hues between 170 (cyan) and 260 (blue/purple)
      h = 175 + (index * 18) + Math.floor(Math.random() * 15);
      s = 60 + Math.floor(Math.random() * 30);
      l = 45 + Math.floor(Math.random() * 25);
      break;
    case 'monochrome':
      h = baseHue;
      s = 35 + (index * 10);
      l = 25 + (index * 14);
      break;
    case 'balanced':
    default:
      h = (baseHue + index * 55 + Math.floor(Math.random() * 20)) % 360;
      s = 55 + Math.floor(Math.random() * 35);
      l = 40 + Math.floor(Math.random() * 30);
      break;
  }

  return hslToHex(h, s, l);
}

export default function ColorPaletteGenerator() {
  const [mode, setMode] = useState<PaletteMode>('balanced');
  const [colors, setColors] = useState<PaletteColor[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // Generate initial or new palette
  const generateNewPalette = useCallback(
    (forcedMode?: PaletteMode) => {
      const activeMode = forcedMode || mode;
      const baseHue = Math.floor(Math.random() * 360);

      setColors((prev) => {
        if (prev.length === 0) {
          return Array.from({ length: 5 }, (_, i) => ({
            id: `color-${i}-${Date.now()}`,
            hex: generateColorByMode(activeMode, i, baseHue),
            locked: false,
          }));
        }

        return prev.map((item, index) => {
          if (item.locked) {
            return item;
          }
          return {
            ...item,
            hex: generateColorByMode(activeMode, index, baseHue),
          };
        });
      });
    },
    [mode]
  );

  useEffect(() => {
    generateNewPalette();
  }, [generateNewPalette]);

  const toggleLock = (index: number) => {
    setColors((prev) =>
      prev.map((color, i) => (i === index ? { ...color, locked: !color.locked } : color))
    );
  };

  const copyIndividualHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedCode(hex);
    setCopyFeedback(`Copied ${hex} to clipboard`);
    setTimeout(() => {
      setCopiedCode(null);
      setCopyFeedback(null);
    }, 2000);
  };

  const copyCompletePalette = () => {
    const hexList = colors.map((c) => c.hex).join(', ');
    navigator.clipboard.writeText(hexList);
    setCopyFeedback('Copied complete palette (HEX list) to clipboard');
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  const copyCssVariables = () => {
    const cssVars = colors
      .map((c, i) => `  --color-${i + 1}: ${c.hex};`)
      .join('\n');
    const output = `:root {\n${cssVars}\n}`;
    navigator.clipboard.writeText(output);
    setCopyFeedback('Copied CSS Variables snippet to clipboard');
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  const exportAsJson = () => {
    const data = {
      palette: colors.map((c, i) => ({ name: `Color ${i + 1}`, hex: c.hex })),
      createdAt: new Date().toISOString(),
      generatedWith: 'QuickWeb Tools',
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `quickweb-palette-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setCopyFeedback('Palette downloaded as JSON file');
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  return (
    <div id="color-palette-generator" className="w-full bg-white border border-neutral-200 rounded-xl p-5 md:p-8 shadow-xs">
      {/* Header & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
              Browser Utility
            </span>
            <span className="text-xs text-neutral-600">Client-Side</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mt-1">Color Palette Generator</h3>
          <p className="text-sm text-neutral-600 mt-0.5">
            Generate harmonized color schemes. Lock shades you like and regenerate the rest.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0">
          <button
            id="btn-generate-palette"
            onClick={() => generateNewPalette()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer min-h-[44px]"
            title="Generate a new set of colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Generate New</span>
          </button>

          <button
            id="btn-copy-palette"
            onClick={copyCompletePalette}
            className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 bg-neutral-100 text-neutral-800 border border-neutral-300 rounded-lg text-sm font-medium hover:bg-neutral-200 transition-colors cursor-pointer min-h-[44px]"
            title="Copy all HEX codes"
          >
            <Copy className="w-4 h-4 text-neutral-600" />
            <span>Copy All HEX</span>
          </button>
        </div>
      </div>

      {/* Harmony Filter Pills */}
      <div className="py-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-neutral-500 font-medium mr-1 flex items-center gap-1">
          <SlidersHorizontal className="w-3.5 h-3.5" /> Style:
        </span>
        {(['balanced', 'vibrant', 'pastel', 'warm', 'cool', 'monochrome'] as PaletteMode[]).map((m) => (
          <button
            key={m}
            id={`btn-mode-${m}`}
            onClick={() => {
              setMode(m);
              generateNewPalette(m);
            }}
            className={`px-3 py-1.5 rounded-full capitalize font-medium transition-colors cursor-pointer min-h-[32px] ${
              mode === m
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Swatch Display Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 my-4">
        {colors.map((color, index) => {
          const contrastClass = getContrastColor(color.hex);
          const isCopied = copiedCode === color.hex;

          return (
            <div
              key={color.id}
              className="flex flex-col rounded-xl overflow-hidden border border-neutral-200 shadow-xs transition-transform hover:-translate-y-0.5"
            >
              {/* Color Block */}
              <div
                style={{ backgroundColor: color.hex }}
                className="h-36 sm:h-44 md:h-52 w-full p-3 flex flex-col justify-between transition-colors relative"
              >
                {/* Top indicator: lock toggle */}
                <div className="flex justify-between items-center">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded backdrop-blur-xs bg-black/20 ${contrastClass}`}
                  >
                    #{index + 1}
                  </span>
                  <button
                    id={`btn-lock-${index}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLock(index);
                    }}
                    className={`p-1.5 rounded-full backdrop-blur-xs bg-black/25 ${contrastClass} hover:bg-black/40 transition-colors cursor-pointer`}
                    title={color.locked ? 'Unlock this color' : 'Lock this color'}
                    aria-label={color.locked ? 'Unlock color' : 'Lock color'}
                  >
                    {color.locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5 opacity-80" />}
                  </button>
                </div>

                {/* Bottom preview note */}
                <div className="flex items-center justify-between">
                  {color.locked && (
                    <span className={`text-[11px] font-medium tracking-wide uppercase px-1.5 py-0.5 rounded bg-black/30 ${contrastClass}`}>
                      Locked
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Details & Copy button */}
              <div className="p-3 bg-neutral-50 flex items-center justify-between gap-2 border-t border-neutral-200">
                <div className="truncate">
                  <div className="text-xs font-bold text-neutral-900 tracking-wider font-mono">{color.hex}</div>
                  <div className="text-[11px] text-neutral-500">Color {index + 1}</div>
                </div>

                <button
                  id={`btn-copy-${index}`}
                  onClick={() => copyIndividualHex(color.hex)}
                  className={`p-2 rounded-lg border text-xs font-medium flex items-center justify-center transition-colors cursor-pointer min-h-[36px] min-w-[36px] ${
                    isCopied
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                      : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-100'
                  }`}
                  title="Copy this HEX code"
                  aria-label={`Copy HEX code ${color.hex}`}
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Copy feedback alert toast / bar */}
      {copyFeedback && (
        <div className="p-3 bg-neutral-900 text-white text-xs sm:text-sm rounded-lg flex items-center gap-2 mt-3 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{copyFeedback}</span>
        </div>
      )}

      {/* Secondary Tools / Export bar */}
      <div className="mt-6 pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-600">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span><strong>Quick Tip:</strong> Click the lock icon on any swatch to keep it while generating new combinations.</span>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            id="btn-copy-css-vars"
            onClick={copyCssVariables}
            className="px-2.5 py-1.5 rounded text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 cursor-pointer"
          >
            Copy CSS Variables
          </button>
          <button
            id="btn-download-json"
            onClick={exportAsJson}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>JSON</span>
          </button>
        </div>
      </div>
    </div>
  );
}
