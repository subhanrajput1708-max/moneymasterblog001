import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { PageId } from '../types';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'tools', label: 'Tools' },
    { id: 'blog', label: 'Blog' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'terms', label: 'Terms & Conditions' },
    { id: 'disclaimer', label: 'Disclaimer' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Uploaded Logo + Brand */}
          <button
            id="nav-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 sm:gap-3.5 text-left group cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-lg p-1 -ml-1 shrink-0"
            aria-label="Money Master Blog – Return to Homepage"
          >
            <img
              src="./logo.png"
              alt="Money Master Blog Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 aspect-square object-contain rounded-md border border-neutral-200/90 bg-white p-0.5 shadow-xs group-hover:border-neutral-400 transition-colors"
              referrerPolicy="no-referrer"
              width="48"
              height="48"
            />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-extrabold text-neutral-900 tracking-tight leading-tight group-hover:text-neutral-700 transition-colors">
                Money Master Blog
              </span>
              <span className="text-[10px] sm:text-[11px] text-neutral-500 font-medium hidden sm:inline leading-none mt-0.5">
                Online Tools & Utilities
              </span>
            </div>
          </button>

          {/* Desktop Navigation: [Logo] | Home | Tools | About Us | Contact Us | Privacy Policy | Terms & Conditions | Disclaimer */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            <div className="h-6 w-px bg-neutral-200 mx-1.5" aria-hidden="true" />
            <nav className="flex items-center space-x-1" aria-label="Main Navigation">
              {navItems.map((item) => {
                const isActive =
                  currentPage === item.id ||
                  (item.id === 'blog' && currentPage === 'blog-article');
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors cursor-pointer min-h-[38px] flex items-center whitespace-nowrap ${
                      isActive
                        ? 'bg-neutral-900 text-white font-semibold shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Header Controls / Mobile Hamburger Button */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu Button: [Uploaded Logo] ☰ */}
            <button
              id="btn-mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2.5 rounded-lg text-neutral-800 hover:text-neutral-900 hover:bg-neutral-100 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 cursor-pointer min-h-[44px] min-w-[44px]"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 sm:top-20 z-50 bg-neutral-900/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border-b border-neutral-200 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto p-4 sm:p-6 space-y-1">
            <div className="pb-3 border-b border-neutral-100 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src="./logo.png"
                  alt="Money Master Blog"
                  className="h-7 w-7 aspect-square object-contain rounded bg-white"
                  referrerPolicy="no-referrer"
                  width="28"
                  height="28"
                />
                <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                  Navigation Menu
                </span>
              </div>
              <span className="text-xs text-neutral-400">by Shahid Ali</span>
            </div>

            {navItems.map((item) => {
              const isActive =
                currentPage === item.id ||
                (item.id === 'blog' && currentPage === 'blog-article');
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3.5 rounded-lg text-base font-medium transition-colors cursor-pointer min-h-[48px] flex items-center justify-between ${
                    isActive
                      ? 'bg-neutral-100 text-neutral-900 font-bold'
                      : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-neutral-900"></span>}
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-neutral-100">
              <button
                onClick={() => handleNavClick('tools')}
                className="w-full py-3 px-4 rounded-lg bg-neutral-900 text-white font-medium text-center text-sm shadow-xs min-h-[44px] cursor-pointer"
              >
                Browse All 15 Online Tools
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
