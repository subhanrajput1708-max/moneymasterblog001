import React, { useState } from 'react';
import { Cake, Calendar, RotateCcw, Clock, Sparkles } from 'lucide-react';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<string>('1995-07-15');
  const [asOfDate, setAsOfDate] = useState<string>(new Date().toISOString().slice(0, 10));

  const calculateAge = () => {
    if (!birthDate || !asOfDate) return null;

    const birth = new Date(birthDate);
    const target = new Date(asOfDate);

    if (isNaN(birth.getTime()) || isNaN(target.getTime()) || birth > target) {
      return null;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      // Days in previous month of target
      const prevMonthLastDay = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += prevMonthLastDay;
      months -= 1;
    }

    if (months < 0) {
      months += 12;
      years -= 1;
    }

    // Total days lived
    const diffTime = target.getTime() - birth.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;

    // Next birthday countdown
    let nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < target) {
      nextBday = new Date(target.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysToNextBday = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
    const nextBdayDayOfWeek = nextBday.toLocaleDateString(undefined, { weekday: 'long' });

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      daysToNextBday,
      nextBdayDayOfWeek,
    };
  };

  const ageData = calculateAge();

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <Cake className="w-5 h-5 text-pink-600" />
            Chronological Age Calculator
          </h2>
          <p className="text-sm text-neutral-600">
            Calculate exact age in years, months, and days, with next birthday countdown and lifetime milestones.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setBirthDate('1998-05-20');
            setAsOfDate(new Date().toISOString().slice(0, 10));
          }}
          className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Date Pickers */}
      <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="birthdate-input" className="text-xs font-semibold text-neutral-700 block mb-1">Date of Birth</label>
          <input
            id="birthdate-input"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-xl bg-white focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div>
          <label htmlFor="target-date-input" className="text-xs font-semibold text-neutral-700 block mb-1">Age as of Date (Today)</label>
          <input
            id="target-date-input"
            type="date"
            value={asOfDate}
            onChange={(e) => setAsOfDate(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-xl bg-white focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </div>

      {/* Results */}
      {ageData ? (
        <div className="space-y-6">
          {/* Main Age Highlight */}
          <div className="bg-pink-50/70 border border-pink-200/80 rounded-2xl p-6 text-center">
            <span className="text-xs font-bold text-pink-900 uppercase tracking-wider block mb-2">
              Exact Chronological Age
            </span>
            <div className="flex flex-wrap items-baseline justify-center gap-3 text-neutral-900">
              <div>
                <span className="text-4xl font-extrabold text-pink-600">{ageData.years}</span>
                <span className="text-xs font-semibold text-neutral-600 uppercase ml-1">Years</span>
              </div>
              <span className="text-2xl text-neutral-300 font-light">•</span>
              <div>
                <span className="text-4xl font-extrabold text-pink-600">{ageData.months}</span>
                <span className="text-xs font-semibold text-neutral-600 uppercase ml-1">Months</span>
              </div>
              <span className="text-2xl text-neutral-300 font-light">•</span>
              <div>
                <span className="text-4xl font-extrabold text-pink-600">{ageData.days}</span>
                <span className="text-xs font-semibold text-neutral-600 uppercase ml-1">Days</span>
              </div>
            </div>
          </div>

          {/* Birthday countdown & Lifetime stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-neutral-500 block">Upcoming Birthday</span>
                <span className="text-sm font-bold text-neutral-900">
                  {ageData.daysToNextBday === 0
                    ? '🎉 Happy Birthday Today!'
                    : `In ${ageData.daysToNextBday} days (${ageData.nextBdayDayOfWeek})`}
                </span>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-neutral-500 block">Total Lifetime Elapsed</span>
                <span className="text-sm font-bold text-neutral-900">
                  {ageData.totalDays.toLocaleString()} days ({ageData.totalWeeks.toLocaleString()} weeks)
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center text-xs text-neutral-500 bg-neutral-50 rounded-xl border border-neutral-200">
          Please select a valid date of birth earlier than the target date.
        </div>
      )}
    </div>
  );
}
