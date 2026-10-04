import React, { useState, useEffect } from 'react';
import { Clock, Copy, Check, RotateCcw, Calendar, ArrowRightLeft, Globe } from 'lucide-react';

export default function TimestampConverter() {
  const [currentEpoch, setCurrentEpoch] = useState<number>(Math.floor(Date.now() / 1000));
  const [timestampInput, setTimestampInput] = useState<string>(String(Math.floor(Date.now() / 1000)));
  const [dateInput, setDateInput] = useState<string>(new Date().toISOString().slice(0, 16));
  const [unit, setUnit] = useState<'seconds' | 'milliseconds'>('seconds');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Live ticking clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute parsed date from timestamp
  const parseTimestamp = () => {
    const num = Number(timestampInput);
    if (isNaN(num) || num <= 0) return null;
    const ms = unit === 'seconds' ? num * 1000 : num;
    const d = new Date(ms);
    if (isNaN(d.getTime())) return null;
    return d;
  };

  const parsedDate = parseTimestamp();

  // Compute timestamp from dateInput
  const parsedEpochFromDate = () => {
    if (!dateInput) return null;
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return null;
    return {
      seconds: Math.floor(d.getTime() / 1000),
      milliseconds: d.getTime(),
    };
  };

  const dateToEpoch = parsedEpochFromDate();

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const setTimestampNow = () => {
    const now = Date.now();
    setTimestampInput(unit === 'seconds' ? String(Math.floor(now / 1000)) : String(now));
  };

  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" />
            Unix Timestamp &amp; Epoch Converter
          </h2>
          <p className="text-sm text-neutral-600">
            Convert Unix timestamps to readable UTC/local dates and translate calendar dates to epoch seconds.
          </p>
        </div>

        {/* Live Clock Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200/70 rounded-xl text-xs text-amber-900 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Epoch: <strong>{currentEpoch}</strong></span>
          <button
            type="button"
            onClick={() => handleCopy(String(currentEpoch), 'live')}
            className="text-amber-700 hover:text-amber-950 font-sans text-[11px] underline ml-1"
          >
            {copiedKey === 'live' ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600 flex items-center gap-2 mb-6">
        <Globe className="w-4 h-4 text-neutral-500 shrink-0" />
        <span>Your detected local timezone: <strong>{localTimezone}</strong> ({new Date().toString().match(/\((.+)\)/)?.[1] || 'Local'})</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section 1: Timestamp to Date */}
        <div className="p-5 bg-neutral-50/70 rounded-2xl border border-neutral-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              1. Timestamp → Readable Date
            </span>
            <button
              type="button"
              onClick={setTimestampNow}
              className="text-xs text-amber-700 hover:text-amber-900 font-medium underline"
            >
              Use Current Time
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={timestampInput}
              onChange={(e) => setTimestampInput(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="e.g. 1767225600"
              className="w-full px-3.5 py-2.5 text-sm font-mono border border-neutral-300 rounded-xl bg-white"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as any)}
              className="px-2.5 py-2.5 text-xs font-medium border border-neutral-300 rounded-xl bg-white shrink-0"
            >
              <option value="seconds">Seconds (10 digits)</option>
              <option value="milliseconds">Milliseconds (13 digits)</option>
            </select>
          </div>

          {parsedDate ? (
            <div className="bg-white p-4 rounded-xl border border-neutral-200 space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-neutral-100">
                <span className="text-neutral-500">UTC Date:</span>
                <div className="flex items-center gap-2 font-mono text-neutral-900 font-medium">
                  <span>{parsedDate.toUTCString()}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(parsedDate.toUTCString(), 'utc')}
                    className="text-amber-600 hover:text-amber-800"
                  >
                    {copiedKey === 'utc' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-neutral-100">
                <span className="text-neutral-500">Local Time:</span>
                <div className="flex items-center gap-2 font-mono text-neutral-900 font-medium">
                  <span>{parsedDate.toLocaleString()}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(parsedDate.toLocaleString(), 'local')}
                    className="text-amber-600 hover:text-amber-800"
                  >
                    {copiedKey === 'local' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-neutral-500">ISO 8601:</span>
                <div className="flex items-center gap-2 font-mono text-neutral-900 font-medium">
                  <span>{parsedDate.toISOString()}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(parsedDate.toISOString(), 'iso')}
                    className="text-amber-600 hover:text-amber-800"
                  >
                    {copiedKey === 'iso' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xs text-neutral-400 italic p-3 bg-white rounded-xl border border-neutral-200">
              Enter a valid integer timestamp above.
            </div>
          )}
        </div>

        {/* Section 2: Date to Timestamp */}
        <div className="p-5 bg-neutral-50/70 rounded-2xl border border-neutral-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-600" />
              2. Date / Time → Timestamp
            </span>
            <button
              type="button"
              onClick={() => setDateInput(new Date().toISOString().slice(0, 16))}
              className="text-xs text-amber-700 hover:text-amber-900 font-medium underline"
            >
              Reset to Now
            </button>
          </div>

          <div>
            <label htmlFor="timestamp-datetime-input" className="sr-only">Date and Time</label>
            <input
              id="timestamp-datetime-input"
              type="datetime-local"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm font-mono border border-neutral-300 rounded-xl bg-white"
            />
          </div>

          {dateToEpoch ? (
            <div className="bg-white p-4 rounded-xl border border-neutral-200 space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-neutral-100">
                <span className="text-neutral-500">Epoch (Seconds):</span>
                <div className="flex items-center gap-2 font-mono text-neutral-900 font-bold">
                  <span>{dateToEpoch.seconds}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(String(dateToEpoch.seconds), 'sec')}
                    className="text-amber-600 hover:text-amber-800"
                  >
                    {copiedKey === 'sec' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-neutral-500">Epoch (Milliseconds):</span>
                <div className="flex items-center gap-2 font-mono text-neutral-900 font-bold">
                  <span>{dateToEpoch.milliseconds}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(String(dateToEpoch.milliseconds), 'msec')}
                    className="text-amber-600 hover:text-amber-800"
                  >
                    {copiedKey === 'msec' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xs text-neutral-400 italic p-3 bg-white rounded-xl border border-neutral-200">
              Select a calendar date to generate epoch seconds.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
