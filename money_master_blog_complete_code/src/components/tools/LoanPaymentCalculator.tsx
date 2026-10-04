import React, { useState } from 'react';
import { Landmark, Copy, Check, RotateCcw, AlertCircle, Info, Calculator } from 'lucide-react';

export default function LoanPaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('10000');
  const [interestRate, setInterestRate] = useState<string>('9.5');
  const [termType, setTermType] = useState<'years' | 'months'>('years');
  const [termValue, setTermValue] = useState<string>('3');
  const [copied, setCopied] = useState<boolean>(false);

  const P = parseFloat(loanAmount) || 0;
  const annualRate = parseFloat(interestRate) || 0;
  const rawTerm = parseFloat(termValue) || 1;
  const n = termType === 'years' ? rawTerm * 12 : rawTerm;

  // Monthly interest rate
  const r = annualRate > 0 ? annualRate / 100 / 12 : 0;

  // Standard installment amortization formula:
  // M = P * [r(1+r)^n] / [(1+r)^n - 1]
  let monthlyPayment = 0;
  let totalRepayment = 0;
  let totalInterest = 0;

  if (P > 0 && n > 0) {
    if (r > 0) {
      const factor = Math.pow(1 + r, n);
      monthlyPayment = P * ((r * factor) / (factor - 1));
      totalRepayment = monthlyPayment * n;
      totalInterest = totalRepayment - P;
    } else {
      monthlyPayment = P / n;
      totalRepayment = P;
      totalInterest = 0;
    }
  }

  const handleCopy = () => {
    const summary = `Personal Loan Estimate Summary:\n- Principal: $${P.toLocaleString()}\n- Interest Rate: ${annualRate}% APR\n- Term: ${rawTerm} ${termType} (${n} monthly payments)\n- Estimated Monthly Payment: $${monthlyPayment.toFixed(2)}\n- Total Interest: $${totalInterest.toFixed(2)}\n- Total Repayment: $${totalRepayment.toFixed(2)}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <Landmark className="w-5 h-5 text-emerald-600" />
            Personal Loan Payment &amp; Total Cost Calculator
          </h2>
          <p className="text-sm text-neutral-600">
            Estimate monthly installments, total interest expense, and total repayment using standard fixed-rate amortization.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setLoanAmount('10000');
            setInterestRate('9.5');
            setTermType('years');
            setTermValue('3');
          }}
          className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Sample
        </button>
      </div>

      {/* Mandatory Regulatory & Educational Disclaimer */}
      <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-2xl text-xs text-amber-950 flex items-start gap-3 mb-6">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-semibold mb-0.5">Educational Estimate Notice:</strong>
          This calculator provides an estimate for educational purposes. Actual loan payments may vary depending on the lender, fees, rate structure, taxes, insurance, and other terms.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-6">
        {/* Input Parameters Column */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <label htmlFor="loan-amount-input" className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-1">
              Loan Amount (Principal)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-neutral-400 font-bold text-sm">$</span>
              <input
                id="loan-amount-input"
                type="number"
                min={100}
                step={500}
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 text-sm font-semibold border border-neutral-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="loan-apr-input" className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-1">
              Annual Interest Rate (APR %)
            </label>
            <div className="relative">
              <input
                id="loan-apr-input"
                type="number"
                min={0}
                max={99}
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-semibold border border-neutral-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 pr-8"
              />
              <span className="absolute right-3.5 top-2.5 text-neutral-400 font-semibold text-sm">%</span>
            </div>
          </div>

          <div>
            <label htmlFor="loan-term-input" className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-1">
              Loan Term
            </label>
            <div className="flex items-center gap-2">
              <input
                id="loan-term-input"
                type="number"
                min={1}
                max={360}
                value={termValue}
                onChange={(e) => setTermValue(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-semibold border border-neutral-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500"
              />
              <div className="inline-flex rounded-xl border border-neutral-300 p-0.5 bg-neutral-50 text-xs shrink-0">
                <button
                  type="button"
                  onClick={() => setTermType('years')}
                  className={`px-3 py-2 rounded-lg font-semibold transition ${
                    termType === 'years' ? 'bg-emerald-600 text-white shadow-xs' : 'text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  Years
                </button>
                <button
                  type="button"
                  onClick={() => setTermType('months')}
                  className={`px-3 py-2 rounded-lg font-semibold transition ${
                    termType === 'months' ? 'bg-emerald-600 text-white shadow-xs' : 'text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  Months
                </button>
              </div>
            </div>
          </div>

          {/* Formula disclosure box */}
          <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-[11px] text-neutral-600 space-y-1">
            <span className="font-semibold text-neutral-800 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-neutral-500" />
              Standard Amortization Formula:
            </span>
            <code className="block font-mono text-[10px] bg-white p-1.5 rounded border border-neutral-200 text-neutral-800">
              M = P × [r(1 + r)^n] / [(1 + r)^n - 1]
            </code>
            <p>Where P = principal, r = monthly interest (APR / 12), and n = total months.</p>
          </div>
        </div>

        {/* Results Highlight Column */}
        <div className="lg:col-span-6 bg-emerald-50/60 border border-emerald-200/90 rounded-2xl p-6 text-neutral-900 space-y-5">
          <div className="text-center pb-4 border-b border-emerald-200">
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block mb-1">
              Estimated Monthly Payment
            </span>
            <span className="text-4xl font-extrabold text-emerald-950 block my-1">
              ${monthlyPayment.toFixed(2)}
            </span>
            <span className="text-xs text-emerald-800 font-medium">
              for {n} consecutive months
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-1">
              <span className="text-neutral-600 font-medium">Principal Borrowed:</span>
              <span className="font-mono font-bold text-neutral-900">${P.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-neutral-600 font-medium">Total Interest Expense:</span>
              <span className="font-mono font-bold text-emerald-800">+${totalInterest.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-1 pt-2 border-t border-emerald-200">
              <span className="text-sm font-bold text-neutral-900">Total Repayment Amount:</span>
              <span className="text-base font-mono font-extrabold text-emerald-950">
                ${totalRepayment.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied Loan Summary!' : 'Copy Loan Calculation'}
          </button>
        </div>
      </div>
    </div>
  );
}
