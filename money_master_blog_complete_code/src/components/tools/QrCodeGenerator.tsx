import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Download, Copy, Check, QrCode as QrIcon, RotateCcw } from 'lucide-react';

export default function QrCodeGenerator() {
  const [text, setText] = useState('https://moneymasterblog.site/p/tools.html');
  const [size, setSize] = useState<number>(260);
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current && text.trim()) {
      QRCode.toCanvas(
        canvasRef.current,
        text,
        {
          width: size,
          margin: 2,
          errorCorrectionLevel: errorLevel,
          color: {
            dark: '#111827',
            light: '#ffffff',
          },
        },
        (error) => {
          if (error) console.error('QR code generation error:', error);
        }
      );
    }
  }, [text, size, errorLevel]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'moneymaster-qrcode.png';
    a.click();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <QrIcon className="w-5 h-5 text-neutral-900" />
            Custom QR Code Generator
          </h2>
          <p className="text-sm text-neutral-600">
            Generate high-resolution, downloadable QR codes for URLs, WiFi, or text.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setText('https://moneymasterblog.site')}
          className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Default
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <label htmlFor="qr-code-content-input" className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-2">
              QR Code Content (URL, Text, or Phone)
            </label>
            <textarea
              id="qr-code-content-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your destination website or text message..."
              rows={4}
              className="w-full p-3.5 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="qr-size-select" className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-2">
                Image Size
              </label>
              <select
                id="qr-size-select"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl bg-white focus:ring-2 focus:ring-neutral-900"
              >
                <option value={180}>Small (180 x 180 px)</option>
                <option value={260}>Medium (260 x 260 px)</option>
                <option value={360}>Large (360 x 360 px)</option>
                <option value={500}>High-Res Print (500 x 500 px)</option>
              </select>
            </div>

            <div>
              <label htmlFor="qr-error-level-select" className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-2">
                Error Correction Level
              </label>
              <select
                id="qr-error-level-select"
                value={errorLevel}
                onChange={(e) => setErrorLevel(e.target.value as any)}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl bg-white focus:ring-2 focus:ring-neutral-900"
              >
                <option value="L">Level L (7% recovery)</option>
                <option value="M">Level M (15% recovery – standard)</option>
                <option value="Q">Level Q (25% recovery)</option>
                <option value="H">Level H (30% recovery – best for print)</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600 space-y-1.5">
            <span className="font-semibold text-neutral-800 block">Scannability Tip:</span>
            <p>
              High error correction allows QR codes to be scanned reliably even if partially obscured or printed on textured surfaces.
            </p>
          </div>
        </div>

        {/* Canvas & Download Preview Column */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-neutral-50 rounded-2xl border border-neutral-200 text-center">
          <div className="p-4 bg-white rounded-xl shadow-xs border border-neutral-200 mb-4 inline-block">
            <canvas ref={canvasRef} className="max-w-full h-auto rounded-sm" />
          </div>

          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              disabled={!text.trim()}
              className="w-full sm:w-auto px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download PNG
            </button>
            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full sm:w-auto px-4 py-2.5 bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied Content!' : 'Copy Content'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
