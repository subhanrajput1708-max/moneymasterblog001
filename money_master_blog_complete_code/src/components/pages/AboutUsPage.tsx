import React from 'react';
import { UserCheck, Shield, CheckCircle2, Wrench, Compass, Sparkles, Clock, Globe, ArrowRight, Laptop, Check, BookOpen, FileText } from 'lucide-react';
import { PageId } from '../../types';
import FaqSection, { FaqItem } from '../common/FaqSection';

interface AboutUsPageProps {
  onNavigate: (page: PageId) => void;
}

export default function AboutUsPage({ onNavigate }: AboutUsPageProps) {
  const aboutFaqs: FaqItem[] = [
    {
      question: 'Who founded and maintains Money Master Blog?',
      answer:
        'Money Master Blog was founded and is actively maintained by Shahid Ali. Shahid has 7 years of practical experience working directly with online tools, digital content workflows, web utilities, and everyday digital tasks.',
    },
    {
      question: 'Why did Shahid Ali decide to build Money Master Blog?',
      answer:
        'After years of relying on digital utilities for daily text drafting, layout formatting, and design tasks, Shahid grew frustrated with how congested most utility websites had become. Many were bogged down by deceptive download banners, invasive tracking scripts, slow loading times, and forced user registrations. Money Master Blog was created to prove that online tools can remain clean, fast, transparent, and completely free.',
    },
    {
      question: 'What is the purpose of the Money Master Blog educational guides and articles?',
      answer:
        'The Blog section contains 20 comprehensive, practical guides curated by Shahid Ali. Rather than generic filler content, each article tackles a real-world friction point—such as fixing broken line breaks in PDFs, removing invisible Unicode zero-width spaces, sorting messy name lists, preparing clean CSV data, and preventing common text formatting blunders. Each guide provides clear step-by-step instructions, troubleshooting checklists, and direct links to the relevant client-side tools.',
    },
    {
      question: 'Are the 20 blog guides free to read without registration or paywalls?',
      answer:
        'Yes. All 20 guides and future articles on Money Master Blog are 100% free and open access. There are no paywalls, no forced email subscriptions, no reading limits, and no account requirements. Anyone can read, learn, and reference the techniques freely.',
    },
    {
      question: 'How do the blog guides integrate with the 15 browser tools?',
      answer:
        'Each guide is designed to pair directly with our suite of 15 browser tools. When an article explains a challenge (for example, cleaning up messy clipboard quotes or stripping extra whitespace), it includes practical examples, spreadsheet formulas, and an integrated link to open the exact tool needed right in your browser.',
    },
    {
      question: 'Does Money Master Blog claim any official corporate certifications or awards?',
      answer:
        'No. We maintain a strict policy of honest representation. We do not claim fabricated corporate awards, artificial certifications, or unverified memberships. The value of our tools comes directly from functional code quality, client-side speed, and real daily utility.',
    },
    {
      question: 'How is Money Master Blog funded if all tools are free?',
      answer:
        'Money Master Blog is maintained as an independent, lightweight web project with minimal server overhead because computations run locally in user browsers. We do not gate utilities behind paid subscription paywalls or sell user data.',
    },
    {
      question: 'Are there plans to introduce complex software installations or desktop apps?',
      answer:
        'No. Our core philosophy is "Functional Simplicity." We believe the greatest strength of Money Master Blog is that it works immediately inside any modern web browser without downloads, setup installers, or platform incompatibilities.',
    },
    {
      question: 'How are new tools selected and added to the website?',
      answer:
        'New tools are evaluated based on genuine frequency of use. We prioritize micro-utilities that solve real daily friction points for writers, designers, developers, students, and everyday web users, rather than adding bloated or rarely used feature sets.',
    },
    {
      question: 'Can visitors suggest new tools or improvements directly to Shahid?',
      answer:
        'Yes. Community feedback is warmly welcomed. Visitors can submit feature suggestions, workflow ideas, or bug reports through our Contact Us page. Shahid reviews all incoming community notes personally.',
    },
    {
      question: 'How often are the tools updated and tested?',
      answer:
        'Tools are continuously tested for browser compatibility across the latest stable versions of Chrome, Safari, Firefox, and Edge on mobile, tablet, and desktop environments to ensure flawless client-side operation.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-12">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-8">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          About Money Master Blog
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
          Simple Utilities, Honest Craft
        </h1>
        <p className="mt-3 text-base sm:text-lg text-neutral-600 leading-relaxed">
          Money Master Blog was founded with a straightforward mission: to provide simple, practical browser-based tools for working with text, colors, and everyday digital content without software bloat or invasive ads.
        </p>
      </div>

      {/* Author Profile Card */}
      <section className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shrink-0 font-bold text-3xl shadow-xs">
            SA
          </div>
          <div className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Website Creator & Content Author</span>
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mt-1">Shahid Ali</h2>
              <div className="text-sm font-medium text-neutral-600">
                Digital Tools Practitioner
              </div>
            </div>

            <p className="text-sm text-neutral-700 leading-relaxed">
              Shahid Ali has <strong>7 years of practical experience</strong> working with online tools, digital content, web utilities, and everyday digital workflows. Over years of working with digital projects, drafting text, preparing color schemes, and organizing content, Shahid observed that many online tool websites were overloaded with excessive advertising, slow scripts, confusing interfaces, and misleading download buttons.
            </p>

            <p className="text-sm text-neutral-700 leading-relaxed">
              Money Master Blog was built as a clean, trustworthy utility hub: browser tools that do exactly what they describe, execute locally, load quickly, and require no account creation or complicated software.
            </p>

            <div className="pt-2 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-neutral-800 shrink-0" />
                <span>7 Years Practical Workflow Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Laptop className="w-4 h-4 text-neutral-800 shrink-0" />
                <span>Hands-on Web & Content Work</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-neutral-800 shrink-0" />
                <span>100% In-Browser Privacy Focus</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Background & Why This Site Exists */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-neutral-900">Why Money Master Blog Was Created</h3>
        <div className="space-y-3 text-sm text-neutral-700 leading-relaxed">
          <p>
            When performing common digital tasks—such as finding matching colors for a presentation, stripping extra whitespace from copied text, or generating clean placeholder paragraphs for a webpage wireframe—most users do not need a heavyweight software package or a paid subscription.
          </p>
          <p>
            However, a large portion of existing online utilities today are plagued by:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-600 text-xs sm:text-sm">
            <li>Aggressive popup ads, autoplaying videos, and misleading "Start Download" banners.</li>
            <li>Forced account sign-ups that harvest email addresses for marketing campaigns.</li>
            <li>Unnecessary server round-trips that compromise data privacy and cause needless latency.</li>
            <li>Cluttered navigation bars with dozens of identical or non-functional tool stubs.</li>
          </ul>
          <p>
            Money Master Blog was designed as a direct remedy: focused, lightweight, and trustworthy utilities designed to solve one specific problem cleanly and quickly.
          </p>
        </div>
      </section>

      {/* Core Principles Grid */}
      <section className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-neutral-900">Our Core Editorial & Engineering Principles</h3>
          <p className="text-sm text-neutral-600 mt-1">
            How Shahid Ali builds, evaluates, and maintains every browser utility on Money Master Blog.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl border border-neutral-200 bg-white shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 mb-3">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-neutral-900">Functional Simplicity</h4>
            <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
              Every tool focuses on completing a discrete task cleanly. We eliminate unnecessary steps, confusing jargon, and clutter.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-neutral-200 bg-white shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-neutral-900">Transparent Computing</h4>
            <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
              We never make exaggerated claims. Our tools run locally in your browser so your inputs remain on your device.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-neutral-200 bg-white shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 mb-3">
              <Wrench className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-neutral-900">Broad Accessibility</h4>
            <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
              Touch-friendly mobile interfaces, high contrast, clean typography, and zero forced account registration.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Standards & Fact Integrity */}
      <section className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-lg font-bold text-neutral-900">Editorial Standards & Authenticity</h3>
        <p className="text-sm text-neutral-700 leading-relaxed">
          At Money Master Blog, we believe online trust is earned through transparency and honest representation.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-700">
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-neutral-50 border border-neutral-200">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-neutral-900 block mb-0.5">No Invented Credentials</strong>
              <span>We do not invent fake degrees, corporate awards, fictional partners, or misleading certifications.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-neutral-50 border border-neutral-200">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-neutral-900 block mb-0.5">Zero Artificial Testimonials</strong>
              <span>We do not display stock photos pretending to be verified users or publish fabricated review ratings.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-neutral-50 border border-neutral-200">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-neutral-900 block mb-0.5">Tested Algorithms</strong>
              <span>All color computations, character tokenizers, and cryptography formulas rely on standard web specifications.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-neutral-50 border border-neutral-200">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-neutral-900 block mb-0.5">Direct Author Accountability</strong>
              <span>Shahid Ali personally reviews feedback, fixes reported bugs, and maintains the tool codebase.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="bg-neutral-50 rounded-xl p-6 sm:p-8 border border-neutral-200 space-y-4">
        <h3 className="text-lg font-bold text-neutral-900">Who Are These Tools For?</h3>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Money Master Blog is designed to assist visitors with common digital tasks:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-700">
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-neutral-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Designers:</strong> Generate color palettes and copy HEX codes</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-neutral-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Writers & Bloggers:</strong> Clean copied text, count words, and format case</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-neutral-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Web Creators & Developers:</strong> Create placeholder text (Lorem Ipsum) and CSS variables</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-neutral-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Students & Everyday Users:</strong> Essay word count metrics and formatting cleanup</span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 items-center justify-between border-t border-neutral-200">
          <span className="text-xs text-neutral-500">Have a suggestion or need a specific utility?</span>
          <button
            onClick={() => onNavigate('contact')}
            className="text-xs font-bold text-neutral-900 hover:underline cursor-pointer"
          >
            Send Shahid a message &rarr;
          </button>
        </div>
      </section>

      {/* Practical Guides & Educational Blog Section */}
      <section className="bg-white rounded-xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Editorial Knowledge Base
              </span>
              <h3 className="text-xl font-bold text-neutral-900 mt-1">
                The Practical Guides & Tutorials Library
              </h3>
            </div>
          </div>
          <button
            onClick={() => onNavigate('blog')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
          >
            <span>Explore All 20 Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-sm text-neutral-700 leading-relaxed">
          In addition to our suite of 15 client-side browser utilities, Money Master Blog publishes <strong>20 comprehensive practical guides</strong> curated by author Shahid Ali. Drawing directly upon 7 years of hands-on digital troubleshooting, these articles provide step-by-step methodologies for solving real everyday computer headaches.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200/80 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>Text Formatting & Cleanup</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Step-by-step techniques to strip PDF line break glitches, fix curly smart quotes for code terminals, and format proper title casing.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200/80 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Spreadsheet & Data Preparation</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Formulas and workflows to sanitize raw CSV datasets, deduplicate messy contact lists, and remove hidden zero-width Unicode characters.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200/80 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Design & Typography Practice</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Visual contrast essentials (WCAG AA/AAA standards), dummy copy (Lorem Ipsum) dos and don'ts, and word count target management.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200/80 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>Security & Client-Side Privacy</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              CSPRNG password generation heuristics, browser memory sanitation, and how client-side computing guarantees complete data safety.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-neutral-100 border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>All 20 guides are completely open-access: zero paywalls, zero accounts, and zero cookie tracking.</span>
          </div>
          <button
            onClick={() => onNavigate('blog')}
            className="font-bold text-neutral-900 hover:underline shrink-0 cursor-pointer"
          >
            Browse Blog Articles &rarr;
          </button>
        </div>
      </section>

      {/* About Us Page FAQ Section */}
      <FaqSection
        id="about-faq"
        title="Frequently Asked Questions About Shahid Ali & Money Master Blog"
        subtitle="Learn more about our editorial philosophy, website ownership, and creator background."
        items={aboutFaqs}
      />
    </div>
  );
}
