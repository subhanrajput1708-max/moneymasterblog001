import React from 'react';
import { Wrench, Shield, CheckCircle2, UserCheck, Heart, Phone, Mail } from 'lucide-react';
import { PageId } from '../types';
import { PAGE_PATHS } from '../utils/routes';

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Author Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="./logo.png"
                alt="Money Master Blog Logo"
                className="h-9 w-9 aspect-square object-contain rounded-md bg-white p-0.5 shadow-xs"
                referrerPolicy="no-referrer"
                width="36"
                height="36"
              />
              <span className="text-xl font-bold text-white tracking-tight">Money Master Blog</span>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-md">
              Money Master Blog provides simple, practical browser-based tools for working with text, colors, and everyday digital content. Fast, lightweight, and executed directly in your browser.
            </p>

            <div className="pt-2 border-t border-neutral-800 space-y-2">
              <div className="flex items-start gap-2.5 text-xs text-neutral-400">
                <UserCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-200 font-medium">Curated by Shahid Ali & Subhan Ali</span>
                  <p className="text-neutral-400 mt-0.5">
                    Direct Support: <a href="tel:03678799545" className="text-neutral-300 hover:text-white underline">03678799545</a> (Calls & WhatsApp)
                    <br />
                    Gmail: <a href="mailto:subhanrajput1708@gmail.com" className="text-neutral-300 hover:text-white underline">subhanrajput1708@gmail.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Tools Column */}
          <div>
            <h4 className="text-xs font-bold text-neutral-100 uppercase tracking-wider mb-4">
              Browser Tools
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={PAGE_PATHS.tools}
                  onClick={createNavClickHandler('tools')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Color Palette Generator
                </a>
              </li>
              <li>
                <a
                  href={PAGE_PATHS.tools}
                  onClick={createNavClickHandler('tools')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Word Counter & Case
                </a>
              </li>
              <li>
                <a
                  href={PAGE_PATHS.tools}
                  onClick={createNavClickHandler('tools')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Random Password Tool
                </a>
              </li>
              <li>
                <a
                  href={PAGE_PATHS.tools}
                  onClick={createNavClickHandler('tools')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Placeholder Text Generator
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-xs font-bold text-neutral-100 uppercase tracking-wider mb-4">
              Website
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={PAGE_PATHS.home}
                  onClick={createNavClickHandler('home')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href={PAGE_PATHS.tools}
                  onClick={createNavClickHandler('tools')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  All Tools Directory
                </a>
              </li>
              <li>
                <a
                  href={PAGE_PATHS.blog}
                  onClick={createNavClickHandler('blog')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Practical Guides & Blog
                </a>
              </li>
              <li>
                <a
                  href={PAGE_PATHS.about}
                  onClick={createNavClickHandler('about')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  About Us & Author
                </a>
              </li>
              <li>
                <a
                  href={PAGE_PATHS.contact}
                  onClick={createNavClickHandler('contact')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Contact & Feedback
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Trust Column */}
          <div>
            <h4 className="text-xs font-bold text-neutral-100 uppercase tracking-wider mb-4">
              Transparency
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
                  href={PAGE_PATHS.disclaimer}
                  onClick={createNavClickHandler('disclaimer')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Website Disclaimer
                </a>
              </li>
            </ul>

            <div className="mt-5 p-3 rounded-lg bg-neutral-800/80 border border-neutral-700 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5 font-medium text-neutral-300 mb-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Client-Side Execution</span>
              </div>
              Text and color calculations run locally inside your browser window.
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} Money Master Blog. All rights reserved. Practical everyday online tools and resources.
          </div>
          <div className="flex items-center gap-4">
            <span>Authored by Shahid Ali</span>
            <span>•</span>
            <span>No Account Required</span>
            <span>•</span>
            <span>Accessible Design</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
