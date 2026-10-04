import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  UserCheck,
  RefreshCw,
  Scale,
  Award,
  AlertCircle,
  HelpCircle,
  Mail,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Lock,
  Binary
} from 'lucide-react';
import { PageId } from '../../types';
import { PAGE_PATHS } from '../../utils/routes';

interface EditorialPolicyPageProps {
  onNavigate: (page: PageId) => void;
}

export default function EditorialPolicyPage({ onNavigate }: EditorialPolicyPageProps) {
  const [feedbackGiven, setFeedbackGiven] = useState<'yes' | 'no' | null>(null);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 max-w-4xl mx-auto pb-16">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="pt-2">
        <ol className="flex items-center gap-2 text-xs text-neutral-500">
          <li>
            <a
              href={PAGE_PATHS.home}
              onClick={(e) => {
                e.preventDefault();
                handleNav('home');
              }}
              className="hover:text-black transition-colors"
            >
              Home
            </a>
          </li>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <li className="text-black font-semibold">Editorial Policy &amp; Standards</li>
        </ol>
      </nav>

      {/* Hero Header */}
      <header className="space-y-4 border-b border-neutral-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Transparency, Fact-Checking &amp; Structural Maintenance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight">
          Editorial Policy &amp; Content Quality Standards
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl">
          At Money Master Blog, we are committed to delivering authentic, accurate, and transparent personal finance education and browser-based utility tools. This policy outlines our research methodologies, mathematical verification processes, ongoing curation protocols, and editorial independence.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 pt-2">
          <span className="flex items-center gap-1.5 font-medium text-neutral-800">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            Curated by Shahid Ali (7+ Years Experience)
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-neutral-400" />
            Active Audit Cycle: Q1/Q4 2026
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            100% Client-Side Privacy Verified
          </span>
        </div>
      </header>

      {/* Pillar 1: Authentic, High-Quality Information */}
      <section className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold">
            1
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-black">
              Authentic, High-Quality Research &amp; Educational Purpose
            </h2>
            <p className="text-xs text-neutral-500">How we research, write, and structure financial information</p>
          </div>
        </div>

        <p className="text-sm text-neutral-700 leading-relaxed">
          Every financial guide published on Money Master Blog addresses real-world consumer scenarios—such as personal loan APR comparisons, credit card Schumer Box fine print, emergency fund sizing, and debt snowball vs. avalanche strategies. We do not generate shallow, automated summaries or regurgitate marketing copy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
            <h3 className="text-sm font-bold text-black flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-600" />
              Mathematical Verification
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              All loan amortization formulas, compound interest equations, and debt-payoff calculations are rigorously verified against banking industry standards (such as standard annuity formulas and Truth in Lending Act APR conventions).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
            <h3 className="text-sm font-bold text-black flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              Real Numerical Examples
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Every guide includes worked mathematical examples with exact numbers, loan amounts, interest rates, and fee breakdowns so readers can follow the math step-by-step before making financial commitments.
            </p>
          </div>
        </div>
      </section>

      {/* Pillar 2: Tool Integrity & Client-Side Architecture */}
      <section className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold">
            2
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-black">
              Tool Authenticity &amp; Client-Side Privacy
            </h2>
            <p className="text-xs text-neutral-500">25 free tools built for consumer utility, not data harvesting</p>
          </div>
        </div>

        <p className="text-sm text-neutral-700 leading-relaxed">
          Our suite of 25 browser-based calculators and utility tools is built on pure client-side JavaScript. Unlike platforms that require user registration or upload sensitive financial details to remote servers:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1.5">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-black block">Zero Server Tracking</span>
            <p className="text-neutral-600">Your inputs (loan figures, salary, passwords, images) never leave your device or enter a remote database.</p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1.5">
            <Binary className="w-4 h-4 text-blue-600" />
            <span className="font-bold text-black block">Deterministic Logic</span>
            <p className="text-neutral-600">Every calculation uses transparent formulas that can be audited and verified with standard mathematics.</p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1.5">
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            <span className="font-bold text-black block">No Paywalls</span>
            <p className="text-neutral-600">All tools are 100% free with unlimited calculations and zero subscription tiers.</p>
          </div>
        </div>
      </section>

      {/* Pillar 3: Ongoing Curation & Structural Maintenance */}
      <section className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold">
            3
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-black">
              Ongoing Curation &amp; Structural Maintenance Schedule
            </h2>
            <p className="text-xs text-neutral-500">Regular audits ensuring zero broken links, fresh data, and technical excellence</p>
          </div>
        </div>

        <p className="text-sm text-neutral-700 leading-relaxed">
          Websites that provide financial information require active, structural maintenance. Shahid Ali oversees a continuous quarterly review protocol:
        </p>

        <div className="border border-neutral-200 rounded-xl overflow-hidden text-xs">
          <div className="bg-neutral-100 p-3 font-bold text-black grid grid-cols-4 gap-2">
            <span>Quarter</span>
            <span>Maintenance Focus</span>
            <span>Audit Scope</span>
            <span>Status</span>
          </div>
          <div className="divide-y divide-neutral-200">
            <div className="p-3 grid grid-cols-4 gap-2 items-center bg-white">
              <span className="font-semibold text-black">Q1 2026</span>
              <span className="text-neutral-600">Loan &amp; Debt Guides Audit</span>
              <span className="text-neutral-600">Verified APR benchmarks, penalty fee terms</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Completed
              </span>
            </div>
            <div className="p-3 grid grid-cols-4 gap-2 items-center bg-neutral-50/50">
              <span className="font-semibold text-black">Q2 2026</span>
              <span className="text-neutral-600">Calculator Precision &amp; Math</span>
              <span className="text-neutral-600">Stress-tested 25 tools across iOS/Android browsers</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Completed
              </span>
            </div>
            <div className="p-3 grid grid-cols-4 gap-2 items-center bg-white">
              <span className="font-semibold text-black">Q3 2026</span>
              <span className="text-neutral-600">Savings &amp; Insurance Reviews</span>
              <span className="text-neutral-600">Updated emergency fund and deductible ratios</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Completed
              </span>
            </div>
            <div className="p-3 grid grid-cols-4 gap-2 items-center bg-neutral-50/50">
              <span className="font-semibold text-black">Q4 2026</span>
              <span className="text-neutral-600">Structural &amp; Link Audits</span>
              <span className="text-neutral-600">XML sitemap validation, 0 broken links, accessibility</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 4: Sustaining Genuine User Interest */}
      <section className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold">
            4
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-black">
              Reader Engagement &amp; Feedback Feedback Loop
            </h2>
            <p className="text-xs text-neutral-500">How we listen to user feedback and keep content relevant</p>
          </div>
        </div>

        <p className="text-sm text-neutral-700 leading-relaxed">
          We maintain genuine user interest through actionable utility. Every guide provides:
        </p>

        <ul className="space-y-2 text-sm text-neutral-700 list-disc list-inside">
          <li><strong>Interactive Implementation Checklists:</strong> Readers can mark off steps as they complete them to track their debt payoff or loan review progress.</li>
          <li><strong>Direct Tool Integration:</strong> Relevant financial calculators are embedded or directly linked inside guides so readers can immediately test their own figures.</li>
          <li><strong>Two-Way Feedback Loops:</strong> Readers can vote on guide helpfulness and submit suggestions directly to our editorial desk.</li>
        </ul>

        {/* Interactive Feedback Box */}
        <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3">
          <span className="text-sm font-bold text-black block">
            Do you find our Editorial Standards and Transparency clear?
          </span>
          {feedbackGiven ? (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Thank you! Your feedback helps us sustain high editorial standards.</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setFeedbackGiven('yes')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-black text-white text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                Yes, completely clear
              </button>
              <button
                type="button"
                onClick={() => setFeedbackGiven('no')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-neutral-300 text-neutral-700 text-xs font-semibold hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
                Needs more detail
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Corrections Policy */}
      <section className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-black flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-emerald-600" />
          Corrections &amp; Errata Policy
        </h2>
        <p className="text-sm text-neutral-600 leading-relaxed">
          If you detect a mathematical discrepancy, an outdated financial regulation, or a typographical issue in any of our 20 guides or 25 tools, please notify us immediately. We review all corrections within 24 to 48 hours and publish clear update notices.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium pt-2">
          <a
            href="mailto:contact@moneymasterblog.site"
            className="text-black font-semibold hover:underline flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5 text-neutral-500" />
            contact@moneymasterblog.site
          </a>
          <span>•</span>
          <a
            href={PAGE_PATHS.contact}
            onClick={(e) => {
              e.preventDefault();
              handleNav('contact');
            }}
            className="text-black font-semibold hover:underline"
          >
            Submit Feedback via Contact Page →
          </a>
        </div>
      </section>
    </div>
  );
}
