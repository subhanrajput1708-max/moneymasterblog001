import React, { useState } from 'react';
import { Receipt, Copy, Check, RotateCcw, AlertCircle, HelpCircle } from 'lucide-react';

export default function GstTaxCalculator() {
  const [amount, setAmount] = useState<string>('1000');
  const [taxRate, setTaxRate] = useState<string>('18');
  const [mode, setMode] = useState<'add' | 'remove'>('add');
  const [copied, setCopied] = useState(false);

  const numAmount = parseFloat(amount) || 0;
  const numRate = parseFloat(taxRate) || 0;

  // Calculation:
  // Add Tax (Exclusive to Inclusive): Tax = Amount * (Rate / 100); Total = Amount + Tax
  // Remove Tax (Inclusive to Exclusive): PreTax = Amount / (1 + Rate / 100); Tax = Amount - PreTax
  let netAmount = 0;
  let taxAmount = 0;
  let grossAmount = 0;

  if (numAmount > 0 && numRate >= 0) {
    if (mode === 'add') {
      netAmount = numAmount;
      taxAmount = (numAmount * numRate) / 100;
      grossAmount = netAmount + taxAmount;
    } else {
      grossAmount = numAmount;
      netAmount = numAmount / (1 + numRate / 100);
      taxAmount = grossAmount - netAmount;
    }
  }

  const presets = [5, 10, 12, 15, 18, 20, 25];

  const handleCopy = () => {
    const summary = `Tax Calculation:\n- Mode: ${mode === 'add' ? 'Add Tax (Exclusive)' : 'Remove Tax (Inclusive)'}\n- Base Amount: $${netAmount.toFixed(2)}\n- Tax Rate: ${numRate}%\n- Tax Amount: $${taxAmount.toFixed(2)}\n- Final Amount: $${grossAmount.toFixed(2)}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-emerald-600" />
            GST / VAT &amp; Sales Tax Calculator
          </h2>
          <p className="text-sm text-neutral-600">
            Calculate tax addition or reverse tax extraction with custom rates and clear line-item breakdowns.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setAmount('1000');
            setTaxRate('18');
            setMode('add');
          }}
          className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Jurisdiction Notice */}
      <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2 mb-6">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Statutory Rate Notice:</strong> Tax rates (GST, VAT, Sales Tax) vary significantly by country, province, and product category. Enter the specific statutory rate applicable to your jurisdiction.
        </div>
      </div>

      {/* Operation Selection */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          onClick={() => setMode('add')}
          className={`py-3 px-4 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center gap-1 ${
            mode === 'add'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
              : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
          }`}
        >
          <span>➕ Add Tax (Exclusive)</span>
          <span className={`text-[10px] font-normal ${mode === 'add' ? 'text-emerald-100' : 'text-neutral-500'}`}>
            Price doesn't include tax yet
          </span>
        </button>

        <button
          type="button"
          onClick={() => setMode('remove')}
          className={`py-3 px-4 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center gap-1 ${
            mode === 'remove'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
              : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
          }`}
        >
          <span>➖ Remove Tax (Inclusive)</span>
          <span className={`text-[10px] font-normal ${mode === 'remove' ? 'text-emerald-100' : 'text-neutral-500'}`}>
            Price already includes tax
          </span>
        </button>
      </div>

      {/* Input controls */}
      <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200 mb-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tax-amount-input" className="text-xs font-semibold text-neutral-700 block mb-1">
              {mode === 'add' ? 'Pre-Tax Net Amount' : 'Gross Total (Tax-Inclusive)'}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-neutral-400 font-semibold text-sm">$</span>
              <input
                id="tax-amount-input"
                type="number"
                min={0}
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-3.5 py-2.5 text-sm font-semibold border border-neutral-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="tax-rate-input" className="text-xs font-semibold text-neutral-700 block mb-1">
              Tax Rate Percentage (%)
            </label>
            <div className="relative">
              <input
                id="tax-rate-input"
                type="number"
                min={0}
                max={100}
                step="any"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-semibold border border-neutral-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 pr-8"
              />
              <span className="absolute right-3.5 top-2.5 text-neutral-400 font-semibold text-sm">%</span>
            </div>
          </div>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-neutral-200/60 text-xs">
          <span className="text-neutral-500 mr-1 font-medium">Quick Rates:</span>
          {presets.map((rate) => (
            <button
              key={rate}
              type="button"
              onClick={() => setTaxRate(String(rate))}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition ${
                taxRate === String(rate)
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {rate}%
            </button>
          ))}
        </div>
      </div>

      {/* Itemized Calculation Summary */}
      <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-6 mb-6">
        <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-wider mb-4">
          Calculation Breakdown
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center py-1.5 border-b border-emerald-200/50">
            <span className="text-neutral-600 font-medium">Original Pre-Tax Amount:</span>
            <span className="font-mono font-bold text-neutral-900">${netAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-emerald-200/50">
            <span className="text-neutral-600 font-medium">Tax Calculated ({numRate}%):</span>
            <span className="font-mono font-bold text-emerald-700">+${taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-base font-extrabold text-neutral-900">Total Final Amount:</span>
            <span className="text-xl font-mono font-extrabold text-emerald-900">
              ${grossAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <span className="text-xs text-neutral-500">
          Formula: {mode === 'add' ? 'Amount × (1 + Rate / 100)' : 'Amount / (1 + Rate / 100)'}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition ${
            copied
              ? 'bg-emerald-600 text-white'
              : 'bg-neutral-900 hover:bg-neutral-800 text-white'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied Breakdown!' : 'Copy Summary'}
        </button>
      </div>
    </div>
  );
}
