import React, { useState } from 'react';
import { CalendarRange, ArrowLeftRight, RotateCcw, Briefcase, Calendar } from 'lucide-react';

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState<string>('2026-01-01');
  const [endDate, setEndDate] = useState<string>('2026-04-15');
  const [includeEndDate, setIncludeEndDate] = useState<boolean>(true);

  const calculateDifference = () => {
    if (!startDate || !endDate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

    const isReversed = start > end;
    const d1 = isReversed ? end : start;
    const d2 = isReversed ? start : end;

    // Time difference
    const diffTime = d2.getTime() - d1.getTime();
    let totalDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    if (includeEndDate) {
      totalDays += 1;
    }

    // Breakdown: years, months, remaining days
    let cur = new Date(d1);
    let years = 0;
    let months = 0;

    // Advance years
    while (new Date(cur.getFullYear() + 1, cur.getMonth(), cur.getDate()) <= d2) {
      years++;
      cur.setFullYear(cur.getFullYear() + 1);
    }

    // Advance months
    while (new Date(cur.getFullYear(), cur.getMonth() + 1, cur.getDate()) <= d2) {
      months++;
      cur.setMonth(cur.getMonth() + 1);
    }

    let remainingDays = Math.round((d2.getTime() - cur.getTime()) / (1000 * 60 * 60 * 24));
    if (includeEndDate) {
      remainingDays += 1;
    }

    // Count business days (Monday-Friday) and weekend days
    let businessDays = 0;
    let weekendDays = 0;
    const loopDate = new Date(d1);
    const lastDate = includeEndDate ? d2 : new Date(d2.getTime() - 24 * 60 * 60 * 1000);

    while (loopDate <= lastDate) {
      const dayOfWeek = loopDate.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekendDays++;
      } else {
        businessDays++;
      }
      loopDate.setDate(loopDate.getDate() + 1);
    }

    const weeks = Math.floor(totalDays / 7);
    const extraDays = totalDays % 7;

    return {
      totalDays,
      years,
      months,
      remainingDays,
      weeks,
      extraDays,
      businessDays,
      weekendDays,
      isReversed,
    };
  };

  const swapDates = () => {
    const tmp = startDate;
    setStartDate(endDate);
    setEndDate(tmp);
  };

  const diff = calculateDifference();

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <CalendarRange className="w-5 h-5 text-indigo-600" />
            Date Difference &amp; Working Days Calculator
          </h2>
          <p className="text-sm text-neutral-600">
            Find the exact duration between two calendar dates, counting total days, weeks, and business days.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setStartDate('2026-01-01');
            setEndDate('2026-06-30');
            setIncludeEndDate(true);
          }}
          className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Sample
        </button>
      </div>

      {/* Date Pickers */}
      <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200 mb-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-5">
            <label htmlFor="start-date-input" className="text-xs font-semibold text-neutral-700 block mb-1">Start Date</label>
            <input
              id="start-date-input"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-xl bg-white"
            />
          </div>

          <div className="sm:col-span-2 flex justify-center pb-1">
            <button
              type="button"
              onClick={swapDates}
              title="Swap Start and End Dates"
              className="p-2.5 bg-white border border-neutral-300 hover:bg-neutral-100 rounded-xl text-neutral-600 transition"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          <div className="sm:col-span-5">
            <label htmlFor="end-date-input" className="text-xs font-semibold text-neutral-700 block mb-1">End Date</label>
            <input
              id="end-date-input"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-xl bg-white"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-neutral-200/60 flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-neutral-700">
            <input
              type="checkbox"
              checked={includeEndDate}
              onChange={(e) => setIncludeEndDate(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            Include End Date in calculation (+1 day)
          </label>
          {diff?.isReversed && (
            <span className="text-[11px] text-amber-700 font-medium">
              Note: Start date was after End date (chronological span evaluated).
            </span>
          )}
        </div>
      </div>

      {/* Results */}
      {diff ? (
        <div className="space-y-6">
          {/* Main Total Days Callout */}
          <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-2xl p-6 text-center">
            <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider block mb-1">
              Total Elapsed Duration
            </span>
            <span className="text-4xl font-extrabold text-indigo-700 block my-2">
              {diff.totalDays} Days
            </span>
            <span className="text-xs text-indigo-800 font-medium">
              Equivalent to {diff.weeks} weeks and {diff.extraDays} days
              {diff.years > 0 ? ` (${diff.years} yr, ${diff.months} mo, ${diff.remainingDays} d)` : ''}
            </span>
          </div>

          {/* Working Days vs Weekends */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-neutral-500 block">Working Business Days</span>
                <span className="text-base font-bold text-neutral-900">
                  {diff.businessDays} Working Days
                </span>
                <span className="text-[11px] text-neutral-400 block">Monday through Friday</span>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-neutral-500 block">Weekend Days</span>
                <span className="text-base font-bold text-neutral-900">
                  {diff.weekendDays} Weekend Days
                </span>
                <span className="text-[11px] text-neutral-400 block">Saturdays and Sundays</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center text-xs text-neutral-500 bg-neutral-50 rounded-xl border border-neutral-200">
          Select valid dates above to calculate the difference.
        </div>
      )}
    </div>
  );
}
