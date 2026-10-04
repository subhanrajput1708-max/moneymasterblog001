import React, { useState } from 'react';
import { Utensils, Users, Copy, Check, RotateCcw, Plus, Minus } from 'lucide-react';

export default function TipCalculator() {
  const [bill, setBill] = useState<string>('84.00');
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [people, setPeople] = useState<number>(3);
  const [roundUp, setRoundUp] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const numBill = parseFloat(bill) || 0;
  let rawTip = (numBill * tipPercent) / 100;
  let totalBill = numBill + rawTip;

  if (roundUp && totalBill > 0) {
    totalBill = Math.ceil(totalBill);
    rawTip = totalBill - numBill;
  }

  const tipPerPerson = people > 0 ? rawTip / people : 0;
  const totalPerPerson = people > 0 ? totalBill / people : 0;

  const tipPresets = [10, 15, 18, 20, 25];

  const handleCopy = () => {
    const summary = `Tip & Bill Split Summary:\n- Subtotal: $${numBill.toFixed(2)}\n- Tip (${tipPercent}%): $${rawTip.toFixed(2)}\n- Total: $${totalBill.toFixed(2)}\n- Split Between: ${people} person(s)\n- Per Person: $${totalPerPerson.toFixed(2)} ($${(numBill / people).toFixed(2)} bill + $${tipPerPerson.toFixed(2)} tip)`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <Utensils className="w-5 h-5 text-amber-600" />
            Restaurant Tip &amp; Bill Split Calculator
          </h2>
          <p className="text-sm text-neutral-600">
            Calculate gratuities, split checks evenly, round totals, and inspect per-person payments.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setBill('84.00');
            setTipPercent(18);
            setPeople(3);
            setRoundUp(false);
          }}
          className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-5">
          {/* Bill input */}
          <div>
            <label htmlFor="bill-amount-input" className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-2">
              Bill Subtotal (Before Tip)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-neutral-400 font-bold text-base">$</span>
              <input
                id="bill-amount-input"
                type="number"
                min={0}
                step="any"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                placeholder="0.00"
                className="w-full pl-9 pr-4 py-3 text-base font-bold border border-neutral-300 rounded-xl bg-white focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Tip Percentage Presets */}
          <div>
            <label htmlFor="tip-custom-percentage-input" className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-2">
              Select Tip Percentage
            </label>
            <div className="grid grid-cols-5 gap-2 mb-2">
              {tipPresets.map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setTipPercent(pct)}
                  className={`py-2 rounded-xl text-xs font-bold border transition ${
                    tipPercent === pct
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-800 hover:bg-neutral-100'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-500">Custom percentage:</span>
              <input
                id="tip-custom-percentage-input"
                type="number"
                min={0}
                max={100}
                value={tipPercent}
                onChange={(e) => setTipPercent(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-16 px-2 py-1 border border-neutral-300 rounded-lg text-center font-bold"
              />
              <span className="text-neutral-500">%</span>
            </div>
          </div>

          {/* Number of People */}
          <div>
            <span className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-2">
              Split Between People
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPeople(Math.max(1, people - 1))}
                className="w-10 h-10 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-700 transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-neutral-50 border border-neutral-200 rounded-xl">
                <Users className="w-4 h-4 text-neutral-400" />
                <span className="font-extrabold text-base text-neutral-900">{people}</span>
                <span className="text-xs text-neutral-500">{people === 1 ? 'person' : 'people'}</span>
              </div>
              <button
                type="button"
                onClick={() => setPeople(people + 1)}
                className="w-10 h-10 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-700 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Round up checkbox */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-neutral-700">
              <input
                type="checkbox"
                checked={roundUp}
                onChange={(e) => setRoundUp(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
              />
              Round up final bill to nearest whole dollar
            </label>
          </div>
        </div>

        {/* Results Highlight Card */}
        <div className="lg:col-span-5 bg-amber-50/80 border border-amber-200/90 rounded-2xl p-6 text-neutral-900 space-y-5">
          <div className="text-center pb-4 border-b border-amber-200">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-1">
              Total Share Per Person
            </span>
            <span className="text-4xl font-extrabold text-amber-950 block my-1">
              ${totalPerPerson.toFixed(2)}
            </span>
            <span className="text-xs text-amber-800 font-medium">
              (${ (numBill / people).toFixed(2) } bill + ${ tipPerPerson.toFixed(2) } tip)
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center py-1">
              <span className="text-neutral-600 font-medium">Tip Amount (Total):</span>
              <span className="font-mono font-bold text-amber-900">+${rawTip.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-neutral-600 font-medium">Total Bill (With Tip):</span>
              <span className="font-mono font-bold text-neutral-900">${totalBill.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-1 pt-2 border-t border-amber-200">
              <span className="text-neutral-600 font-medium">Tip Share Each:</span>
              <span className="font-mono font-bold text-amber-800">${tipPerPerson.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied Calculation!' : 'Copy Summary'}
          </button>
        </div>
      </div>
    </div>
  );
}
