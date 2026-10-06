import React from 'react';
import { UserCheck, ShieldCheck } from 'lucide-react';
import { PageId } from '../types';
import { PAGE_PATHS, getToolPath } from '../utils/routes';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const createNavClickHandler = (page: PageId) => (e: React.MouseEvent) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      handleNav(page);
    }
  };

  return (
    <footer className="bg-neutral-900 text-neutral-300 border-t border-neutral-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-8">
          {/* Brand & Editorial Column (2 cols wide on desktop) */}
          <div className="sm:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Money Master Blog Logo"
                className="h-9 w-9 aspect-square object-contain rounded-md bg-white p-0.5 shadow-xs"
                referrerPolicy="no-referrer"
                width="36"
                height="36"
              />
              <span className="text-xl font-bold text-white tracking-tight">Money Master Blog</span>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Practical money guides, helpful financial calculators, and easy-to-use browser tools designed to help readers make informed everyday financial decisions.
            </p>

            <div className="pt-3 border-t border-neutral-800 space-y-2">
              <div className="flex items-start gap-2.5 text-xs text-neutral-400">
                <UserCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-200 font-medium">Written & Curated by Shahid Ali</span>
                  <p className="text-neutral-400 mt-0.5">
                    7 years of practical experience in digital content workflows & web utilities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 1: Tools */}
          <div>
            <h4 className="text-xs font-bold text-neutral-100 uppercase tracking-wider mb-4">
              Tools
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={PAGE_PATHS.tools}
                  onClick={createNavClickHandler('tools')}
                  className="text-neutral-300 font-medium hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Explore All 25 Tools
                </a>
              </li>
              <li>
                <a
                  href={getToolPath('loan-payment-calculator')}
                  className="text-neutral-400 hover:text-white transition-colors text-left block"
                >
                  Loan Calculator
                </a>
              </li>
              <li>
                <a
                  href={getToolPath('percentage-calculator')}
                  className="text-neutral-400 hover:text-white transition-colors text-left block"
                >
                  Percentage Calculator
                </a>
              </li>
              <li>
                <a
                  href={getToolPath('gst-tax-calculator')}
                  className="text-neutral-400 hover:text-white transition-colors text-left block"
                >
                  GST & Tax Calculator
                </a>
              </li>
              <li>
                <a
                  href={getToolPath('tip-calculator')}
                  className="text-neutral-400 hover:text-white transition-colors text-left block"
                >
                  Tip & Bill Splitter
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Blog */}
          <div>
            <h4 className="text-xs font-bold text-neutral-100 uppercase tracking-wider mb-4">
              Blog
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={PAGE_PATHS.blog}
                  onClick={createNavClickHandler('blog')}
                  className="text-neutral-300 font-medium hover:text-white transition-colors cursor-pointer text-left block"
                >
                  All Blog Articles
                </a>
              </li>
              <li>
                <a
                  href={PAGE_PATHS.blog}
                  onClick={createNavClickHandler('blog')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Loans & Borrowing
                </a>
              </li>
              <li>
                <a
                  href={PAGE_PATHS.blog}
                  onClick={createNavClickHandler('blog')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Credit & Debt
                </a>
              </li>
              <li>
                <a
                  href={PAGE_PATHS.blog}
                  onClick={createNavClickHandler('blog')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Savings & Budgeting
                </a>
              </li>
              <li>
                <a
                  href={PAGE_PATHS.blog}
                  onClick={createNavClickHandler('blog')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Insurance & Planning
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-xs font-bold text-neutral-100 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={PAGE_PATHS.about}
                  onClick={createNavClickHandler('about')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href={PAGE_PATHS.contact}
                  onClick={createNavClickHandler('contact')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href={PAGE_PATHS.home}
                  onClick={createNavClickHandler('home')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Homepage
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Other */}
          <div>
            <h4 className="text-xs font-bold text-neutral-100 uppercase tracking-wider mb-4">
              Legal & Other
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={PAGE_PATHS.privacy}
                  onClick={createNavClickHandler('privacy')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href={PAGE_PATHS.terms}
                  onClick={createNavClickHandler('terms')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href={PAGE_PATHS['editorial-policy']}
                  onClick={createNavClickHandler('editorial-policy')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Editorial Policy
                </a>
              </li>
              <li>
                <a
                  href={PAGE_PATHS.disclaimer}
                  onClick={createNavClickHandler('disclaimer')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Disclaimer
                </a>
              </li>
              <li>
                <a
                  href={PAGE_PATHS.robots}
                  onClick={createNavClickHandler('robots')}
                  className="text-neutral-400 hover:text-white transition-colors text-left block"
                >
                  Robots.txt &amp; Crawlers
                </a>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors text-left block"
                >
                  XML Sitemap
                </a>
              </li>
            </ul>

            <div className="mt-5 p-3 rounded-lg bg-neutral-800/80 border border-neutral-700 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5 font-medium text-neutral-300 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Educational Resources</span>
              </div>
              Guides and tools are educational and for informational planning purposes.
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} Money Master Blog. All rights reserved.
          </div>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <span>Written & Curated by Shahid Ali</span>
            <span>•</span>
            <a
              href={PAGE_PATHS.robots}
              onClick={createNavClickHandler('robots')}
              className="hover:text-neutral-300 transition-colors"
            >
              Robots.txt
            </a>
            <span>•</span>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300 transition-colors">
              XML Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
