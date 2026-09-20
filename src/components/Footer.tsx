import React from 'react';
import { Wrench, Shield, CheckCircle2, UserCheck, Heart } from 'lucide-react';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

            <div className="pt-2 border-t border-neutral-800">
              <div className="flex items-start gap-2.5 text-xs text-neutral-400">
                <UserCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-200 font-medium">Curated & Written by Shahid Ali</span>
                  <p className="text-neutral-400 mt-0.5">
                    7 years of practical experience working with online tools, digital content, web utilities, and everyday digital workflows.
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
                <button
                  onClick={() => handleNav('tools')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Color Palette Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('tools')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Word Counter & Case
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('tools')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Random Password Tool
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('tools')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Placeholder Text Generator
                </button>
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
                <button
                  onClick={() => handleNav('home')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('tools')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  All Tools Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('blog')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Practical Guides & Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Us & Author
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact & Feedback
                </button>
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
                <button
                  onClick={() => handleNav('privacy')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('terms')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('disclaimer')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Website Disclaimer
                </button>
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
