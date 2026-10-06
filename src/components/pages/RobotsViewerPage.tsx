import React, { useState } from 'react';
import { Bot, Copy, Check, Download, ExternalLink, ShieldCheck, CheckCircle2, AlertCircle, FileText, Globe, Search, RefreshCw, Terminal } from 'lucide-react';
import { PageId } from '../../types';
import { CANONICAL_DOMAIN, PAGE_PATHS } from '../../utils/routes';

interface RobotsViewerPageProps {
  onNavigate: (page: PageId) => void;
}

export default function RobotsViewerPage({ onNavigate }: RobotsViewerPageProps) {
  const [copied, setCopied] = useState(false);

  const robotsContent = `User-agent: *
Allow: /

Sitemap: ${CANONICAL_DOMAIN}/sitemap.xml
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(robotsContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([robotsContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'robots.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* 1. Header */}
      <div className="border-b border-neutral-200 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <Bot className="w-3.5 h-3.5 text-emerald-600" />
          <span>SEO &amp; Search Engine Crawler Directives</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Robots.txt &amp; Crawler Configuration
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl">
          Money Master Blog maintains fully permissive, standardized search engine crawl directives allowing Googlebot, Bingbot, and Google AdSense crawlers to seamlessly index all financial guides and browser calculators.
        </p>
      </div>

      {/* 2. Live Status Banner */}
      <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-neutral-900">Live Status: HTTP 200 OK Active</h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Available at <code className="font-mono text-neutral-800 bg-neutral-100 px-1.5 py-0.5 rounded">/robots.txt</code> and alias <code className="font-mono text-neutral-800 bg-neutral-100 px-1.5 py-0.5 rounded">/robot.txt</code>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
          <a
            href="/robots.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>Open Raw /robots.txt</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={handleCopy}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* 3. Raw Code Viewer Card */}
      <div className="rounded-2xl border border-neutral-300 bg-neutral-950 text-neutral-100 overflow-hidden shadow-sm">
        <div className="px-5 py-3.5 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>robots.txt (Live Content)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-sans transition-colors cursor-pointer"
              title="Download robots.txt file"
            >
              <Download className="w-3 h-3" />
              <span>Download .txt</span>
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-sans font-medium transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="p-6 font-mono text-sm leading-relaxed space-y-2">
          <div className="text-neutral-500 text-xs"># Allow all standard web crawlers and search indexers</div>
          <div className="text-emerald-400 font-bold">User-agent: *</div>
          <div className="text-emerald-300">Allow: /</div>
          <div className="text-neutral-500 text-xs pt-3"># Canonical XML Sitemap for fast content discovery</div>
          <div className="text-sky-300">Sitemap: {CANONICAL_DOMAIN}/sitemap.xml</div>
        </div>
      </div>

      {/* 4. Critical Search & Blogger Troubleshooting Guide */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-neutral-900">
          Frequently Asked Questions &amp; Verification Guide
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Why it doesn't show in Google search query */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <Search className="w-4 h-4 text-amber-600" />
              <h3>Why does "robots.txt" not show in Google Search results?</h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Google Search strictly treats <code>robots.txt</code> as a <strong>machine instruction file</strong>, NOT a public content article. Search engines intentionally never index robots.txt in normal search results (SERP) to prevent search clutter. Googlebot reads it automatically in the background when crawling.
            </p>
            <div className="pt-2 border-t border-neutral-100 text-xs text-neutral-700">
              <strong>How to check:</strong> Open <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-mono">/robots.txt</a> directly in your browser or test it in <strong>Google Search Console</strong>.
            </div>
          </div>

          {/* Card 2: How to test in Google Search Console */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h3>How to verify in Google Search Console</h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              To verify that Googlebot successfully fetches your robots.txt:
            </p>
            <ol className="list-decimal pl-4 text-xs text-neutral-600 space-y-1">
              <li>Open your verified <strong>Google Search Console</strong> property.</li>
              <li>Navigate to <strong>Settings</strong> &rarr; <strong>Robots.txt</strong>.</li>
              <li>Google will show the exact timestamp when it last fetched your file (Status: 200 OK).</li>
            </ol>
          </div>

          {/* Card 3: Blogger / Blogspot Setup */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
              <Globe className="w-4 h-4 text-sky-600" />
              <h3>How to configure in Google Blogger (Blogspot)</h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              If your custom domain or blog is connected via Blogger:
            </p>
            <ol className="list-decimal pl-4 text-xs text-neutral-600 space-y-1">
              <li>Go to <strong>Blogger Dashboard &rarr; Settings</strong>.</li>
              <li>Scroll down to <strong>Crawlers and indexing</strong>.</li>
              <li>Turn ON <strong>"Enable custom robots.txt"</strong>.</li>
              <li>Click <strong>"Custom robots.txt"</strong>, paste the 3 lines from the code box above, and click <strong>Save</strong>.</li>
            </ol>
          </div>

          {/* Card 4: AdSense Crawler Access */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <h3>Google AdSense Policy Compliance</h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Google AdSense reviewers use dedicated crawler bots (including <code>Mediapartners-Google</code>). Because our directive specifies:
            </p>
            <pre className="p-2 bg-neutral-100 rounded text-[11px] font-mono text-neutral-800">User-agent: *&#10;Allow: /</pre>
            <p className="text-xs text-neutral-600">
              AdSense crawlers have unrestricted permission to audit every page, passing the AdSense site-readiness requirement.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Navigation Links */}
      <div className="pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-500">
        <div className="flex items-center gap-3">
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-900 font-medium transition-colors"
          >
            XML Sitemap &rarr;
          </a>
          <span>•</span>
          <a
            href="/ads.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-900 font-medium transition-colors"
          >
            Ads.txt &rarr;
          </a>
          <span>•</span>
          <a
            href={PAGE_PATHS['editorial-policy']}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('editorial-policy');
            }}
            className="hover:text-neutral-900 font-medium transition-colors"
          >
            Editorial Policy &rarr;
          </a>
        </div>

        <button
          onClick={() => onNavigate('home')}
          className="text-neutral-900 font-semibold hover:underline cursor-pointer"
        >
          Return to Homepage &rarr;
        </button>
      </div>
    </div>
  );
}
