import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Copy, Check, ShieldCheck, Eye, EyeOff, Key } from 'lucide-react';

export default function PasswordGenerator() {
  const [length, setLength] = useState<number>(16);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeLower, setIncludeLower] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [avoidAmbiguous, setAvoidAmbiguous] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const generatePassword = useCallback(() => {
    let charset = '';
    let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lower = 'abcdefghijklmnopqrstuvwxyz';
    let numbers = '0123456789';
    let symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (avoidAmbiguous) {
      upper = upper.replace(/[IO]/g, '');
      lower = lower.replace(/[lo]/g, '');
      numbers = numbers.replace(/[01]/g, '');
      symbols = symbols.replace(/[{}\[\]()/\\'"`~,;:.<>]/g, '');
    }

    if (includeUpper) charset += upper;
    if (includeLower) charset += lower;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    // Fallback if all unchecked
    if (!charset) {
      charset = lower + numbers;
    }

    // Cryptographically secure pseudorandom number generator (CSPRNG)
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }

    setPassword(result);
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols, avoidAmbiguous]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Strength score
  const getStrength = () => {
    let score = 0;
    if (length >= 12) score += 1;
    if (length >= 16) score += 1;
    if (includeUpper && includeLower) score += 1;
    if (includeNumbers) score += 1;
    if (includeSymbols) score += 1;

    if (score <= 2) return { label: 'Weak', color: 'bg-amber-500', text: 'text-amber-700' };
    if (score <= 3) return { label: 'Moderate', color: 'bg-yellow-500', text: 'text-yellow-700' };
    if (score === 4) return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-700' };
    return { label: 'Very Strong', color: 'bg-emerald-600', text: 'text-emerald-800' };
  };

  const strength = getStrength();

  return (
    <div id="password-generator-tool" className="w-full bg-white border border-neutral-200 rounded-xl p-5 md:p-8 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
              Utility Tool
            </span>
            <span className="text-xs text-neutral-600">Client-Side CSPRNG</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mt-1">Random Password Generator</h3>
          <p className="text-sm text-neutral-600 mt-0.5">
            Generate strong, randomized passwords locally in your browser using cryptographic randomization.
          </p>
        </div>

        <button
          id="btn-regen-pwd"
          onClick={generatePassword}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer min-h-[44px]"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Generate New</span>
        </button>
      </div>

      {/* Password Output Box */}
      <div className="my-6">
        <div className="flex items-center justify-between p-3.5 sm:p-4 bg-neutral-50 border border-neutral-300 rounded-xl gap-2">
          <div className="font-mono text-base sm:text-lg text-neutral-900 break-all select-all font-semibold">
            {showPassword ? password : '•'.repeat(password.length)}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
              title={showPassword ? 'Hide password' : 'Show password'}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>

            <button
              id="btn-copy-generated-pwd"
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium border transition-colors cursor-pointer min-h-[40px] ${
                copied
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-white border-neutral-300 text-neutral-800 hover:bg-neutral-100'
              }`}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Strength Indicator */}
        <div className="mt-3 flex items-center justify-between text-xs text-neutral-600">
          <div className="flex items-center gap-2">
            <span className="font-medium text-neutral-700">Strength:</span>
            <span className={`font-semibold ${strength.text}`}>{strength.label}</span>
          </div>
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
            <span>Browser-generated (Never sent to any server)</span>
          </div>
        </div>
      </div>

      {/* Configuration Controls */}
      <div className="space-y-4 pt-4 border-t border-neutral-200">
        {/* Length Slider */}
        <div>
          <div className="flex justify-between items-center text-sm font-medium text-neutral-800 mb-1.5">
            <label htmlFor="pwd-length-slider">Password Length</label>
            <span className="font-mono text-base font-bold text-neutral-900">{length} characters</span>
          </div>
          <input
            id="pwd-length-slider"
            type="range"
            min={8}
            max={48}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-neutral-900 cursor-pointer h-2 bg-neutral-200 rounded-lg"
          />
          <div className="flex justify-between text-[11px] text-neutral-600 mt-1">
            <span>8 (Minimum)</span>
            <span>16 (Recommended)</span>
            <span>32</span>
            <span>48 (Maximum)</span>
          </div>
        </div>

        {/* Checkbox Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <label className="flex items-center gap-3 p-2.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer text-xs sm:text-sm text-neutral-800">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={(e) => setIncludeUpper(e.target.checked)}
              className="w-4 h-4 rounded text-neutral-900 accent-neutral-900"
            />
            <span>Include Uppercase Letters (A-Z)</span>
          </label>

          <label className="flex items-center gap-3 p-2.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer text-xs sm:text-sm text-neutral-800">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={(e) => setIncludeLower(e.target.checked)}
              className="w-4 h-4 rounded text-neutral-900 accent-neutral-900"
            />
            <span>Include Lowercase Letters (a-z)</span>
          </label>

          <label className="flex items-center gap-3 p-2.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer text-xs sm:text-sm text-neutral-800">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-4 h-4 rounded text-neutral-900 accent-neutral-900"
            />
            <span>Include Numbers (0-9)</span>
          </label>

          <label className="flex items-center gap-3 p-2.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer text-xs sm:text-sm text-neutral-800">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-4 h-4 rounded text-neutral-900 accent-neutral-900"
            />
            <span>Include Symbols (!@#$%^&*)</span>
          </label>

          <label className="flex items-center gap-3 p-2.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer text-xs sm:text-sm text-neutral-800 sm:col-span-2">
            <input
              type="checkbox"
              checked={avoidAmbiguous}
              onChange={(e) => setAvoidAmbiguous(e.target.checked)}
              className="w-4 h-4 rounded text-neutral-900 accent-neutral-900"
            />
            <span>Avoid Ambiguous Characters (e.g., l, 1, I, O, 0)</span>
          </label>
        </div>
      </div>
    </div>
  );
}
