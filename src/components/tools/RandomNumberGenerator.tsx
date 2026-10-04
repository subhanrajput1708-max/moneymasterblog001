import React, { useState } from 'react';
import { Copy, Check, RotateCcw, Dices, Shuffle, Sparkles } from 'lucide-react';

export default function RandomNumberGenerator() {
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(100);
  const [quantity, setQuantity] = useState<number>(5);
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('asc');
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateNumbers = () => {
    setError(null);
    if (min >= max) {
      setError('Minimum value must be less than Maximum value.');
      return;
    }

    const rangeSize = max - min + 1;
    if (!allowDuplicates && quantity > rangeSize) {
      setError(`Cannot pick ${quantity} unique numbers from a range of only ${rangeSize} possible values.`);
      return;
    }

    const nums: number[] = [];

    if (!allowDuplicates) {
      const pool = new Set<number>();
      while (pool.size < quantity) {
        // High quality random integer
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        const rand = min + (array[0] % rangeSize);
        pool.add(rand);
      }
      nums.push(...Array.from(pool));
    } else {
      for (let i = 0; i < quantity; i++) {
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        const rand = min + (array[0] % rangeSize);
        nums.push(rand);
      }
    }

    if (sortOrder === 'asc') {
      nums.sort((a, b) => a - b);
    } else if (sortOrder === 'desc') {
      nums.sort((a, b) => b - a);
    }

    setResults(nums);
  };

  const handleCopy = () => {
    if (!results.length) return;
    navigator.clipboard.writeText(results.join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const setDicePreset = () => {
    setMin(1);
    setMax(6);
    setQuantity(2);
    setAllowDuplicates(true);
    setSortOrder('none');
  };

  const setLottoPreset = () => {
    setMin(1);
    setMax(49);
    setQuantity(6);
    setAllowDuplicates(false);
    setSortOrder('asc');
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <Shuffle className="w-5 h-5 text-rose-600" />
            Random Number &amp; Range Generator
          </h2>
          <p className="text-sm text-neutral-600">
            Generate cryptographically unbiased random numbers, lotto sets, or dice rolls.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={setDicePreset}
            className="px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition"
          >
            Roll 2 Dice (1–6)
          </button>
          <button
            type="button"
            onClick={setLottoPreset}
            className="px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition"
          >
            Lotto 6/49
          </button>
        </div>
      </div>

      {/* Inputs Configuration */}
      <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200 mb-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="min-num-input" className="text-xs font-semibold text-neutral-700 block mb-1">Minimum Value</label>
            <input
              id="min-num-input"
              type="number"
              value={min}
              onChange={(e) => setMin(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white"
            />
          </div>
          <div>
            <label htmlFor="max-num-input" className="text-xs font-semibold text-neutral-700 block mb-1">Maximum Value</label>
            <input
              id="max-num-input"
              type="number"
              value={max}
              onChange={(e) => setMax(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white"
            />
          </div>
          <div>
            <label htmlFor="quantity-num-input" className="text-xs font-semibold text-neutral-700 block mb-1">Quantity (How Many)</label>
            <input
              id="quantity-num-input"
              type="number"
              min={1}
              max={100}
              value={quantity}
              onChange={(e) => setQuantity(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-neutral-200/60">
          <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-neutral-700">
            <input
              type="checkbox"
              checked={allowDuplicates}
              onChange={(e) => setAllowDuplicates(e.target.checked)}
              className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
            />
            Allow Duplicates
          </label>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-neutral-700">Sort:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="px-2.5 py-1 text-xs border border-neutral-300 rounded-lg bg-white"
            >
              <option value="none">As Generated (Unsorted)</option>
              <option value="asc">Ascending (Low to High)</option>
              <option value="desc">Descending (High to Low)</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 mb-6 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
          {error}
        </div>
      )}

      {/* Generate Button */}
      <div className="mb-6 flex justify-center">
        <button
          type="button"
          onClick={generateNumbers}
          className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl text-sm transition shadow-sm flex items-center gap-2"
        >
          <Dices className="w-5 h-5" />
          Generate Random Numbers
        </button>
      </div>

      {/* Results Display */}
      {results.length > 0 && (
        <div className="bg-rose-50/40 border border-rose-100 rounded-2xl p-6 text-center mb-6">
          <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block mb-3">
            Generated Outcomes
          </span>
          <div className="flex flex-wrap justify-center gap-3">
            {results.map((n, idx) => (
              <span
                key={idx}
                className="w-14 h-14 rounded-2xl bg-white border border-rose-200 shadow-xs flex items-center justify-center font-extrabold text-xl text-neutral-900"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <span className="text-xs text-neutral-500">
          Cryptographically random via crypto.getRandomValues().
        </span>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!results.length}
          className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition ${
            copied
              ? 'bg-emerald-600 text-white'
              : results.length
              ? 'bg-neutral-900 hover:bg-neutral-800 text-white'
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied Numbers!' : 'Copy Numbers'}
        </button>
      </div>
    </div>
  );
}
