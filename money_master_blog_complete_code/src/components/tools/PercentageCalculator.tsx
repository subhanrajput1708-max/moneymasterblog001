import React, { useState } from 'react';
import { Percent, Copy, Check, RotateCcw, Calculator, ArrowRight } from 'lucide-react';

export default function PercentageCalculator() {
  // Mode 1: What is X% of Y?
  const [m1X, setM1X] = useState<string>('15');
  const [m1Y, setM1Y] = useState<string>('80');

  // Mode 2: X is what percentage of Y?
  const [m2X, setM2X] = useState<string>('25');
  const [m2Y, setM2Y] = useState<string>('200');

  // Mode 3: Percentage increase/decrease from X to Y
  const [m3Old, setM3Old] = useState<string>('50');
  const [m3New, setM3New] = useState<string>('75');

  // Mode 4: Value after X% increase/decrease
  const [m4Base, setM4Base] = useState<string>('100');
  const [m4Pct, setM4Pct] = useState<string>('20');
  const [m4Action, setM4Action] = useState<'increase' | 'decrease'>('decrease');

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  // Calculations
  // M1
  const numM1X = parseFloat(m1X);
  const numM1Y = parseFloat(m1Y);
  const resM1 = !isNaN(numM1X) && !isNaN(numM1Y) ? ((numM1X / 100) * numM1Y).toFixed(2) : null;

  // M2
  const numM2X = parseFloat(m2X);
  const numM2Y = parseFloat(m2Y);
  const resM2 = !isNaN(numM2X) && !isNaN(numM2Y) && numM2Y !== 0 ? ((numM2X / numM2Y) * 100).toFixed(2) : null;

  // M3
  const numM3Old = parseFloat(m3Old);
  const numM3New = parseFloat(m3New);
  const diffM3 = !isNaN(numM3Old) && !isNaN(numM3New) ? numM3New - numM3Old : null;
  const pctM3 = diffM3 !== null && numM3Old !== 0 ? ((diffM3 / numM3Old) * 100).toFixed(2) : null;

  // M4
  const numM4Base = parseFloat(m4Base);
  const numM4Pct = parseFloat(m4Pct);
  const resM4 =
    !isNaN(numM4Base) && !isNaN(numM4Pct)
      ? m4Action === 'increase'
        ? (numM4Base * (1 + numM4Pct / 100)).toFixed(2)
        : (numM4Base * (1 - numM4Pct / 100)).toFixed(2)
      : null;

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <Percent className="w-5 h-5 text-blue-600" />
            Multi-Mode Percentage Calculator
          </h2>
          <p className="text-sm text-neutral-600">
            Calculate proportions, percentage increases/decreases, discounts, and markups with exact formulas.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: What is X% of Y? */}
        <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block mb-3">
              1. What is X% of Y?
            </span>
            <div className="flex items-center gap-2 mb-3 text-sm">
              <span className="text-neutral-600">What is</span>
              <input
                type="number"
                value={m1X}
                onChange={(e) => setM1X(e.target.value)}
                className="w-20 px-2.5 py-1.5 border border-neutral-300 rounded-lg bg-white font-semibold text-center"
              />
              <span className="text-neutral-600">% of</span>
              <input
                type="number"
                value={m1Y}
                onChange={(e) => setM1Y(e.target.value)}
                className="w-24 px-2.5 py-1.5 border border-neutral-300 rounded-lg bg-white font-semibold text-center"
              />
              <span className="text-neutral-600">?</span>
            </div>
            <div className="text-[11px] text-neutral-400 font-mono mb-4">
              Formula: ({m1X || 0} / 100) × {m1Y || 0}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-xl">
            <span className="text-xs text-neutral-500 font-medium">Result:</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold text-blue-700">{resM1 ?? '—'}</span>
              {resM1 && (
                <button
                  type="button"
                  onClick={() => handleCopy(String(resM1), 'm1')}
                  className="p-1 text-neutral-400 hover:text-blue-600"
                >
                  {copiedKey === 'm1' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Card 2: X is what % of Y? */}
        <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block mb-3">
              2. X is what % of Y?
            </span>
            <div className="flex items-center gap-2 mb-3 text-sm">
              <input
                type="number"
                value={m2X}
                onChange={(e) => setM2X(e.target.value)}
                className="w-20 px-2.5 py-1.5 border border-neutral-300 rounded-lg bg-white font-semibold text-center"
              />
              <span className="text-neutral-600">is what % of</span>
              <input
                type="number"
                value={m2Y}
                onChange={(e) => setM2Y(e.target.value)}
                className="w-24 px-2.5 py-1.5 border border-neutral-300 rounded-lg bg-white font-semibold text-center"
              />
              <span className="text-neutral-600">?</span>
            </div>
            <div className="text-[11px] text-neutral-400 font-mono mb-4">
              Formula: ({m2X || 0} / {m2Y || 1}) × 100
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-xl">
            <span className="text-xs text-neutral-500 font-medium">Result:</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold text-emerald-700">{resM2 !== null ? `${resM2}%` : '—'}</span>
              {resM2 && (
                <button
                  type="button"
                  onClick={() => handleCopy(`${resM2}%`, 'm2')}
                  className="p-1 text-neutral-400 hover:text-emerald-600"
                >
                  {copiedKey === 'm2' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Card 3: Percentage Increase or Decrease */}
        <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-purple-900 uppercase tracking-wider block mb-3">
              3. Percentage Change (Increase / Decrease)
            </span>
            <div className="flex items-center gap-2 mb-3 text-sm">
              <span className="text-neutral-600">From</span>
              <input
                type="number"
                value={m3Old}
                onChange={(e) => setM3Old(e.target.value)}
                className="w-20 px-2.5 py-1.5 border border-neutral-300 rounded-lg bg-white font-semibold text-center"
              />
              <span className="text-neutral-600">to</span>
              <input
                type="number"
                value={m3New}
                onChange={(e) => setM3New(e.target.value)}
                className="w-24 px-2.5 py-1.5 border border-neutral-300 rounded-lg bg-white font-semibold text-center"
              />
            </div>
            <div className="text-[11px] text-neutral-400 font-mono mb-4">
              Formula: (({m3New || 0} - {m3Old || 0}) / {m3Old || 1}) × 100
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-xl">
            <span className="text-xs text-neutral-500 font-medium">Difference:</span>
            <div className="flex items-center gap-2">
              <span
                className={`text-lg font-extrabold ${
                  diffM3 && diffM3 >= 0 ? 'text-purple-700' : 'text-rose-600'
                }`}
              >
                {pctM3 !== null ? `${parseFloat(pctM3) >= 0 ? '+' : ''}${pctM3}%` : '—'}
              </span>
              {pctM3 && (
                <button
                  type="button"
                  onClick={() => handleCopy(`${pctM3}%`, 'm3')}
                  className="p-1 text-neutral-400 hover:text-purple-600"
                >
                  {copiedKey === 'm3' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Card 4: Value after X% increase/decrease */}
        <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-3">
              4. Discount &amp; Markup Calculator
            </span>
            <div className="flex flex-wrap items-center gap-2 mb-3 text-sm">
              <input
                type="number"
                value={m4Base}
                onChange={(e) => setM4Base(e.target.value)}
                className="w-20 px-2.5 py-1.5 border border-neutral-300 rounded-lg bg-white font-semibold text-center"
              />
              <select
                value={m4Action}
                onChange={(e) => setM4Action(e.target.value as any)}
                className="px-2 py-1.5 border border-neutral-300 rounded-lg bg-white text-xs font-semibold"
              >
                <option value="decrease">Discounted by (-)</option>
                <option value="increase">Increased by (+)</option>
              </select>
              <input
                type="number"
                value={m4Pct}
                onChange={(e) => setM4Pct(e.target.value)}
                className="w-16 px-2.5 py-1.5 border border-neutral-300 rounded-lg bg-white font-semibold text-center"
              />
              <span className="text-neutral-600">%</span>
            </div>
            <div className="text-[11px] text-neutral-400 font-mono mb-4">
              Formula: {m4Base || 0} {m4Action === 'increase' ? '× (1 + ' : '× (1 - '}
              {(parseFloat(m4Pct) || 0) / 100})
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-xl">
            <span className="text-xs text-neutral-500 font-medium">Final Value:</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold text-amber-800">{resM4 ?? '—'}</span>
              {resM4 && (
                <button
                  type="button"
                  onClick={() => handleCopy(String(resM4), 'm4')}
                  className="p-1 text-neutral-400 hover:text-amber-600"
                >
                  {copiedKey === 'm4' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
