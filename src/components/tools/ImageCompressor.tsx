import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, RotateCcw, Image as ImageIcon, Sliders, CheckCircle2 } from 'lucide-react';

export default function ImageCompressor() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [originalDims, setOriginalDims] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const [quality, setQuality] = useState<number>(75);
  const [outputFormat, setOutputFormat] = useState<'image/jpeg' | 'image/webp' | 'image/png'>('image/jpeg');

  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setOriginalSize(file.size);

      // Default format based on upload
      if (file.type === 'image/webp') setOutputFormat('image/webp');
      else if (file.type === 'image/png') setOutputFormat('image/png');
      else setOutputFormat('image/jpeg');

      const url = URL.createObjectURL(file);
      setOriginalUrl(url);

      // Measure dimensions
      const img = new Image();
      img.onload = () => {
        setOriginalDims({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.src = url;
    }
  };

  const compressImage = () => {
    if (!originalUrl) return;
    setIsProcessing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      // Draw original image onto canvas
      ctx.drawImage(img, 0, 0);

      const q = quality / 100;
      canvas.toBlob(
        (blob) => {
          if (blob) {
            if (compressedUrl) URL.revokeObjectURL(compressedUrl);
            const newUrl = URL.createObjectURL(blob);
            setCompressedUrl(newUrl);
            setCompressedSize(blob.size);
          }
          setIsProcessing(false);
        },
        outputFormat,
        q
      );
    };
    img.src = originalUrl;
  };

  useEffect(() => {
    if (originalUrl) {
      compressImage();
    }
  }, [originalUrl, quality, outputFormat]);

  const handleDownload = () => {
    if (!compressedUrl) return;
    const ext = outputFormat === 'image/webp' ? 'webp' : outputFormat === 'image/png' ? 'png' : 'jpg';
    const a = document.createElement('a');
    a.href = compressedUrl;
    a.download = `compressed-moneymaster.${ext}`;
    a.click();
  };

  const handleReset = () => {
    setImageFile(null);
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    setOriginalUrl(null);
    setCompressedUrl(null);
    setOriginalSize(0);
    setCompressedSize(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const percentReduction =
    originalSize > 0 && compressedSize > 0
      ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
      : 0;

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-600" />
            Client-Side Image Compressor
          </h2>
          <p className="text-sm text-neutral-600">
            Reduce JPG, PNG, and WebP file sizes in your browser with zero server uploads.
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
          className="border-2 border-dashed border-neutral-300 hover:border-emerald-500 rounded-2xl p-10 text-center cursor-pointer transition bg-neutral-50/50 hover:bg-emerald-50/20"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="w-16 h-16 rounded-full bg-emerald-100/70 text-emerald-700 flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-neutral-800 mb-1">
            Click to upload an image, or drag &amp; drop
          </h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Supports JPEG, PNG, and WebP photos. Processed 100% locally in your browser memory for complete privacy.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-neutral-700 mb-2">
                <span className="flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                  Compression Quality:
                </span>
                <span className="text-emerald-700 font-bold">{quality}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={95}
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                <span>Smaller size (10%)</span>
                <span>Balanced (75%)</span>
                <span>High Quality (95%)</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-neutral-700 block mb-2">
                Target Format:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setOutputFormat('image/jpeg')}
                  className={`py-2 text-xs font-semibold rounded-lg border transition ${
                    outputFormat === 'image/jpeg'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                  }`}
                >
                  JPEG
                </button>
                <button
                  type="button"
                  onClick={() => setOutputFormat('image/webp')}
                  className={`py-2 text-xs font-semibold rounded-lg border transition ${
                    outputFormat === 'image/webp'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                  }`}
                >
                  WebP (Best)
                </button>
                <button
                  type="button"
                  onClick={() => setOutputFormat('image/png')}
                  className={`py-2 text-xs font-semibold rounded-lg border transition ${
                    outputFormat === 'image/png'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                  }`}
                >
                  PNG
                </button>
              </div>
            </div>
          </div>

          {/* Stats Savings Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <span className="text-sm font-bold text-emerald-950 block">
                  Saved {percentReduction}% of original file size!
                </span>
                <span className="text-xs text-emerald-700">
                  {formatBytes(originalSize)} → {formatBytes(compressedSize)} ({originalDims.width} × {originalDims.height} px)
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              disabled={isProcessing || !compressedUrl}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download Compressed Image
            </button>
          </div>

          {/* Preview Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-center">
              <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-2">
                Original Image ({formatBytes(originalSize)})
              </span>
              <div className="max-h-72 overflow-hidden rounded-xl bg-white border border-neutral-200 flex items-center justify-center p-2">
                <img
                  src={originalUrl}
                  alt="Original preview"
                  className="max-h-64 max-w-full object-contain"
                />
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-center">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-2">
                Compressed Preview ({formatBytes(compressedSize)})
              </span>
              <div className="max-h-72 overflow-hidden rounded-xl bg-white border border-neutral-200 flex items-center justify-center p-2">
                {compressedUrl && (
                  <img
                    src={compressedUrl}
                    alt="Compressed preview"
                    className="max-h-64 max-w-full object-contain"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
