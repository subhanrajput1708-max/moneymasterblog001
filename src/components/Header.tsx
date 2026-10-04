import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { PageId } from '../types';
import { PAGE_PATHS } from '../utils/routes';

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
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Logo + Brand Name */}
          <a
            id="nav-logo"
            href={PAGE_PATHS.home}
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                e.preventDefault();
                handleNavClick('home');
              }
            }}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-hidden rounded-lg shrink-0"
            aria-label="Money Master Blog – Return to Homepage"
          >
            <img
              src="/logo.png"
              alt="Money Master Blog Logo"
              className="h-9 w-9 sm:h-11 sm:w-11 object-contain rounded-lg border border-neutral-200 bg-white p-0.5"
              referrerPolicy="no-referrer"
              width="44"
              height="44"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold text-black tracking-tight leading-tight">
                Money Master Blog
              </span>
              <span className="text-[11px] text-neutral-500 font-medium hidden sm:inline leading-none mt-0.5">
                Practical Money Guides &amp; Tools
              </span>
            </div>
          </a>

          {/* Desktop Navigation: Simple Black & White Minimalist Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive =
                currentPage === item.id ||
                (item.id === 'blog' && currentPage === 'blog-article');
              const href = PAGE_PATHS[item.id] || '/';
              return (
                <a
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  href={href}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }
                  }}
                  className={`px-3.5 py-2 text-sm transition-colors cursor-pointer rounded-md ${
                    isActive
                      ? 'text-black font-bold bg-neutral-100'
                      : 'text-neutral-700 hover:text-black hover:bg-neutral-50 font-medium'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              id="btn-mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-black hover:bg-neutral-100 focus:outline-hidden cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 sm:top-20 z-50 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border-b border-neutral-200 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto p-4 space-y-1">
            <div className="pb-3 border-b border-neutral-100 mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Menu
              </span>
              <span className="text-xs text-neutral-400">Money Master Blog</span>
            </div>

            {navItems.map((item) => {
              const isActive =
                currentPage === item.id ||
                (item.id === 'blog' && currentPage === 'blog-article');
              const href = PAGE_PATHS[item.id] || '/';
              return (
                <a
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  href={href}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base transition-colors cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-neutral-100 text-black font-bold'
                      : 'text-neutral-800 hover:bg-neutral-50 hover:text-black font-medium'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-black"></span>}
                </a>
              );
            })}

            <div className="pt-3 mt-2 border-t border-neutral-100">
              <a
                href={PAGE_PATHS.tools}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    e.preventDefault();
                    handleNavClick('tools');
                  }
                }}
                className="block w-full py-2.5 px-4 rounded-lg bg-black text-white font-medium text-center text-sm cursor-pointer"
              >
                Explore 25 Online Tools
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
