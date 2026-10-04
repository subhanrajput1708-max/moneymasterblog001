import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, RotateCcw, Crop as CropIcon, Check } from 'lucide-react';

export default function ImageCropper() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [naturalWidth, setNaturalWidth] = useState<number>(0);
  const [naturalHeight, setNaturalHeight] = useState<number>(0);

  // Crop parameters (percentages 0-100)
  const [aspectPreset, setAspectPreset] = useState<'free' | '1:1' | '4:3' | '16:9' | '9:16'>('1:1');
  const [cropX, setCropX] = useState<number>(10);
  const [cropY, setCropY] = useState<number>(10);
  const [cropWidth, setCropWidth] = useState<number>(80);
  const [cropHeight, setCropHeight] = useState<number>(80);

  const [croppedUrl, setCroppedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImageSrc(url);

      const img = new Image();
      img.onload = () => {
        setNaturalWidth(img.naturalWidth);
        setNaturalHeight(img.naturalHeight);
        applyAspectPreset('1:1', img.naturalWidth, img.naturalHeight);
      };
      img.src = url;
    }
  };

  const applyAspectPreset = (preset: 'free' | '1:1' | '4:3' | '16:9' | '9:16', imgW = naturalWidth, imgH = naturalHeight) => {
    setAspectPreset(preset);
    if (!imgW || !imgH) return;

    if (preset === 'free') {
      setCropX(5);
      setCropY(5);
      setCropWidth(90);
      setCropHeight(90);
      return;
    }

    let targetRatio = 1;
    if (preset === '1:1') targetRatio = 1;
    else if (preset === '4:3') targetRatio = 4 / 3;
    else if (preset === '16:9') targetRatio = 16 / 9;
    else if (preset === '9:16') targetRatio = 9 / 16;

    // Calculate crop boundary centered
    const imgRatio = imgW / imgH;
    let wPercent = 80;
    let hPercent = 80;

    if (targetRatio >= imgRatio) {
      wPercent = 85;
      const pixelW = (imgW * wPercent) / 100;
      const pixelH = pixelW / targetRatio;
      hPercent = Math.min(95, (pixelH / imgH) * 100);
    } else {
      hPercent = 85;
      const pixelH = (imgH * hPercent) / 100;
      const pixelW = pixelH * targetRatio;
      wPercent = Math.min(95, (pixelW / imgW) * 100);
    }

    const x = Math.max(0, (100 - wPercent) / 2);
    const y = Math.max(0, (100 - hPercent) / 2);

    setCropX(Math.round(x));
    setCropY(Math.round(y));
    setCropWidth(Math.round(wPercent));
    setCropHeight(Math.round(hPercent));
  };

  // Generate cropped output
  useEffect(() => {
    if (!imageSrc || naturalWidth <= 0 || naturalHeight <= 0) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const pixelX = Math.round((cropX / 100) * naturalWidth);
      const pixelY = Math.round((cropY / 100) * naturalHeight);
      const pixelW = Math.max(10, Math.round((cropWidth / 100) * naturalWidth));
      const pixelH = Math.max(10, Math.round((cropHeight / 100) * naturalHeight));

      canvas.width = pixelW;
      canvas.height = pixelH;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, pixelX, pixelY, pixelW, pixelH, 0, 0, pixelW, pixelH);
        canvas.toBlob((blob) => {
          if (blob) {
            if (croppedUrl) URL.revokeObjectURL(croppedUrl);
            setCroppedUrl(URL.createObjectURL(blob));
          }
        }, 'image/png');
      }
    };
    img.src = imageSrc;
  }, [imageSrc, cropX, cropY, cropWidth, cropHeight, naturalWidth, naturalHeight]);

  const handleDownload = () => {
    if (!croppedUrl) return;
    const a = document.createElement('a');
    a.href = croppedUrl;
    a.download = `cropped-${aspectPreset.replace(':', 'x')}.png`;
    a.click();
  };

  const handleReset = () => {
    if (imageSrc) URL.revokeObjectURL(imageSrc);
    if (croppedUrl) URL.revokeObjectURL(croppedUrl);
    setImageSrc(null);
    setCroppedUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <CropIcon className="w-5 h-5 text-rose-600" />
            Interactive Image Cropper
          </h2>
          <p className="text-sm text-neutral-600">
            Crop images to standard aspect ratios (1:1, 4:3, 16:9, 9:16) or custom freeform boxes.
          </p>
        </div>
        {imageSrc && (
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

      {!imageSrc ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-neutral-300 hover:border-rose-500 rounded-2xl p-10 text-center cursor-pointer transition bg-neutral-50/50 hover:bg-rose-50/20"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="w-16 h-16 rounded-full bg-rose-100/70 text-rose-700 flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-neutral-800 mb-1">
            Click to upload an image to crop
          </h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Choose aspect presets or adjust custom boundaries locally in your browser.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 bg-neutral-50 p-3 rounded-xl border border-neutral-200">
            <span className="text-xs font-semibold text-neutral-700 mr-2">Preset Ratios:</span>
            {(['1:1', '4:3', '16:9', '9:16', 'free'] as const).map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => applyAspectPreset(preset)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  aspectPreset === preset
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {preset === 'free' ? 'Freeform' : preset}
              </button>
            ))}
          </div>

          {/* Interactive Sliders for Crop Boundaries */}
          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <label htmlFor="crop-pos-x-range" className="font-semibold text-neutral-700 block mb-1">Position X ({cropX}%)</label>
              <input
                id="crop-pos-x-range"
                type="range"
                min={0}
                max={100 - cropWidth}
                value={cropX}
                onChange={(e) => setCropX(parseInt(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>
            <div>
              <label htmlFor="crop-pos-y-range" className="font-semibold text-neutral-700 block mb-1">Position Y ({cropY}%)</label>
              <input
                id="crop-pos-y-range"
                type="range"
                min={0}
                max={100 - cropHeight}
                value={cropY}
                onChange={(e) => setCropY(parseInt(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>
            <div>
              <label htmlFor="crop-width-range" className="font-semibold text-neutral-700 block mb-1">Width ({cropWidth}%)</label>
              <input
                id="crop-width-range"
                type="range"
                min={10}
                max={100 - cropX}
                value={cropWidth}
                onChange={(e) => setCropWidth(parseInt(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>
            <div>
              <label htmlFor="crop-height-range" className="font-semibold text-neutral-700 block mb-1">Height ({cropHeight}%)</label>
              <input
                id="crop-height-range"
                type="range"
                min={10}
                max={100 - cropY}
                value={cropHeight}
                onChange={(e) => setCropHeight(parseInt(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Side by side preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Source with overlay */}
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-center">
              <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-2">
                Crop Area Selection
              </span>
              <div className="relative max-h-72 overflow-hidden rounded-xl bg-neutral-900 border border-neutral-300 inline-block">
                <img src={imageSrc} alt="Source" className="max-h-64 object-contain opacity-70" />
                {/* Visual crop outline */}
                <div
                  className="absolute border-2 border-dashed border-rose-500 bg-rose-500/10 pointer-events-none"
                  style={{
                    left: `${cropX}%`,
                    top: `${cropY}%`,
                    width: `${cropWidth}%`,
                    height: `${cropHeight}%`,
                  }}
                />
              </div>
            </div>

            {/* Cropped Output */}
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-center">
              <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block mb-2">
                Cropped Output Preview
              </span>
              <div className="max-h-72 overflow-hidden rounded-xl bg-white border border-neutral-200 flex items-center justify-center p-2">
                {croppedUrl && (
                  <img
                    src={croppedUrl}
                    alt="Cropped output"
                    className="max-h-64 max-w-full object-contain rounded-md"
                  />
                )}
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={!croppedUrl}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Download Cropped Image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
