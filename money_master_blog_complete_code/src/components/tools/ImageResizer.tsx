import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, RotateCcw, Scaling, Lock, Unlock, Check } from 'lucide-react';

export default function ImageResizer() {
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [lockRatio, setLockRatio] = useState<boolean>(true);
  const [format, setFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/png');

  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setOriginalUrl(url);

      const img = new Image();
      img.onload = () => {
        setOriginalWidth(img.naturalWidth);
        setOriginalHeight(img.naturalHeight);
        setWidth(img.naturalWidth);
        setHeight(img.naturalHeight);
      };
      img.src = url;
    }
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (lockRatio && originalWidth > 0 && originalHeight > 0) {
      const ratio = originalHeight / originalWidth;
      setHeight(Math.round(val * ratio));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (lockRatio && originalWidth > 0 && originalHeight > 0) {
      const ratio = originalWidth / originalHeight;
      setWidth(Math.round(val * ratio));
    }
  };

  const applyScalePreset = (percent: number) => {
    if (originalWidth > 0 && originalHeight > 0) {
      const scale = percent / 100;
      setWidth(Math.round(originalWidth * scale));
      setHeight(Math.round(originalHeight * scale));
    }
  };

  const applyDimensionPreset = (w: number, h: number) => {
    setLockRatio(false);
    setWidth(w);
    setHeight(h);
  };

  useEffect(() => {
    if (!originalUrl || width <= 0 || height <= 0) return;
    setIsProcessing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (blob) {
            if (resizedUrl) URL.revokeObjectURL(resizedUrl);
            setResizedUrl(URL.createObjectURL(blob));
          }
          setIsProcessing(false);
        }, format, 0.92);
      }
    };
    img.src = originalUrl;
  }, [originalUrl, width, height, format]);

  const handleDownload = () => {
    if (!resizedUrl) return;
    const ext = format === 'image/webp' ? 'webp' : format === 'image/jpeg' ? 'jpg' : 'png';
    const a = document.createElement('a');
    a.href = resizedUrl;
    a.download = `resized-${width}x${height}.${ext}`;
    a.click();
  };

  const handleReset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resizedUrl) URL.revokeObjectURL(resizedUrl);
    setOriginalUrl(null);
    setResizedUrl(null);
    setWidth(0);
    setHeight(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <Scaling className="w-5 h-5 text-indigo-600" />
            Image Resizer &amp; Dimension Scaler
          </h2>
          <p className="text-sm text-neutral-600">
            Scale pixel dimensions with aspect ratio lock, percentage scale, or social presets.
          </p>
        </div>
        {originalUrl && (
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Upload Another
          </button>
        )}
      </div>

      {!originalUrl ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-neutral-300 hover:border-indigo-500 rounded-2xl p-10 text-center cursor-pointer transition bg-neutral-50/50 hover:bg-indigo-50/20"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="w-16 h-16 rounded-full bg-indigo-100/70 text-indigo-700 flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-neutral-800 mb-1">
            Click to upload an image to resize
          </h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Scale width and height locally in your browser. No files uploaded to servers.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Dimension Controls */}
          <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label htmlFor="image-resizer-width-input" className="text-xs font-semibold text-neutral-700 block mb-1">
                  Width (px)
                </label>
                <input
                  id="image-resizer-width-input"
                  type="number"
                  min={10}
                  max={8000}
                  value={width}
                  onChange={(e) => handleWidthChange(parseInt(e.target.value) || 10)}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl bg-white"
                />
              </div>

              <div>
                <label htmlFor="image-resizer-height-input" className="text-xs font-semibold text-neutral-700 block mb-1">
                  Height (px)
                </label>
                <input
                  id="image-resizer-height-input"
                  type="number"
                  min={10}
                  max={8000}
                  value={height}
                  onChange={(e) => handleHeightChange(parseInt(e.target.value) || 10)}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl bg-white"
                />
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setLockRatio(!lockRatio)}
                  className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                    lockRatio
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                      : 'bg-white border-neutral-300 text-neutral-600'
                  }`}
                >
                  {lockRatio ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                  {lockRatio ? 'Ratio Locked' : 'Ratio Unlocked'}
                </button>
              </div>

              <div>
                <label htmlFor="image-resizer-format-select" className="text-xs font-semibold text-neutral-700 block mb-1">
                  Format
                </label>
                <select
                  id="image-resizer-format-select"
                  value={format}
                  onChange={(e) => setFormat(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl bg-white"
                >
                  <option value="image/png">PNG (Lossless)</option>
                  <option value="image/jpeg">JPEG</option>
                  <option value="image/webp">WebP (Modern)</option>
                </select>
              </div>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-200/60 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-semibold text-neutral-600 mr-1">Scale:</span>
                {[25, 50, 75, 100].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => applyScalePreset(pct)}
                    className="px-2.5 py-1 bg-white border border-neutral-200 hover:bg-neutral-100 rounded-md font-medium text-neutral-700"
                  >
                    {pct}%
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-semibold text-neutral-600 mr-1">Social:</span>
                <button
                  type="button"
                  onClick={() => applyDimensionPreset(1080, 1080)}
                  className="px-2.5 py-1 bg-white border border-neutral-200 hover:bg-neutral-100 rounded-md font-medium text-neutral-700"
                >
                  IG Post (1080x1080)
                </button>
                <button
                  type="button"
                  onClick={() => applyDimensionPreset(1200, 630)}
                  className="px-2.5 py-1 bg-white border border-neutral-200 hover:bg-neutral-100 rounded-md font-medium text-neutral-700"
                >
                  Social Share (1200x630)
                </button>
                <button
                  type="button"
                  onClick={() => applyDimensionPreset(1280, 720)}
                  className="px-2.5 py-1 bg-white border border-neutral-200 hover:bg-neutral-100 rounded-md font-medium text-neutral-700"
                >
                  YouTube (1280x720)
                </button>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-indigo-50/70 border border-indigo-200/80 rounded-2xl">
            <div className="text-xs text-indigo-900">
              Original: <strong>{originalWidth} × {originalHeight} px</strong> → Resized:{' '}
              <strong className="text-indigo-700">{width} × {height} px</strong>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              disabled={isProcessing || !resizedUrl}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download Resized Image
            </button>
          </div>

          {/* Preview */}
          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-center">
            <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-2">
              Resized Output Preview
            </span>
            <div className="max-h-80 overflow-hidden rounded-xl bg-white border border-neutral-200 flex items-center justify-center p-2">
              {resizedUrl && (
                <img
                  src={resizedUrl}
                  alt="Resized output"
                  className="max-h-72 max-w-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
