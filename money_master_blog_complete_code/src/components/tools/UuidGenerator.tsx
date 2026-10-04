import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw, KeyRound, CheckCircle2 } from 'lucide-react';

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState<number>(5);
  const [isUppercase, setIsUppercase] = useState(false);
  const [includeHyphens, setIncludeHyphens] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generateSingleUuid = (): string => {
    let id = '';
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      id = crypto.randomUUID();
    } else {
      // RFC4122 version 4 fallback
      id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    if (!includeHyphens) {
      id = id.replace(/-/g, '');
    }

    return isUppercase ? id.toUpperCase() : id.toLowerCase();
  };

  const generateBulk = () => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      list.push(generateSingleUuid());
    }
    setUuids(list);
  };

  useEffect(() => {
    generateBulk();
  }, [count, isUppercase, includeHyphens]);

  const copySingle = (val: string, index: number) => {
    navigator.clipboard.writeText(val);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-indigo-600" />
            UUID / GUID v4 Generator
          </h2>
          <p className="text-sm text-neutral-600">
            Generate cryptographically secure RFC 4122 Version 4 unique identifiers.
          </p>
        </div>
        <button
          type="button"
          onClick={generateBulk}
          className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition flex items-center gap-1.5 shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Regenerate
        </button>
      </div>

      {/* Controls */}
      <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="uuid-count-input" className="text-xs font-semibold text-neutral-700">Quantity:</label>
          <input
            id="uuid-count-input"
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-16 px-2.5 py-1 text-xs border border-neutral-300 rounded-lg text-center bg-white"
          />
          <span className="text-xs text-neutral-500">(1 to 50)</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-neutral-700">
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isUppercase}
              onChange={(e) => setIsUppercase(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            Uppercase
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={includeHyphens}
              onChange={(e) => setIncludeHyphens(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            Include Hyphens (-)
          </label>
        </div>
      </div>

      {/* Generated list */}
      <div className="space-y-2 mb-6 max-h-96 overflow-y-auto pr-1">
        {uuids.map((id, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-neutral-50 hover:bg-indigo-50/50 rounded-xl border border-neutral-200 transition"
          >
            <span className="font-mono text-xs sm:text-sm text-neutral-900 select-all font-medium">
              {id}
            </span>
            <button
              type="button"
              onClick={() => copySingle(id, index)}
              className="px-2.5 py-1 text-xs font-medium text-neutral-700 hover:text-indigo-600 bg-white border border-neutral-200 rounded-lg transition flex items-center gap-1 shrink-0 ml-2"
            >
              {copiedIndex === index ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <span className="text-xs text-neutral-500">
          Generated via crypto.randomUUID() client-side.
        </span>
        <button
          type="button"
          onClick={copyAll}
          className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition ${
            copiedAll
              ? 'bg-emerald-600 text-white'
              : 'bg-neutral-900 hover:bg-neutral-800 text-white'
          }`}
        >
          {copiedAll ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copiedAll ? 'Copied All UUIDs!' : 'Copy All UUIDs'}
        </button>
      </div>
    </div>
  );
}
