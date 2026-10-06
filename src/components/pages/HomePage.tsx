import React, { useState } from 'react';
import {
  ArrowRight,
  Calculator,
  Percent,
  Receipt,
  Coins,
  ShieldCheck,
  BookOpen,
  UserCheck,
  Scale,
  CreditCard,
  PiggyBank,
  Car,
  ChevronRight,
  CheckCircle2,
  Clock,
  Calendar,
  Zap,
  Smartphone,
  Globe2,
  Sparkles,
  Info,
  Check,
  TrendingUp,
  HelpCircle,
} from 'lucide-react';
import { PageId, ToolId } from '../../types';
import { TOOLS_DATA } from '../../data/toolsData';
import { BLOG_ARTICLES, getArticleImage } from '../../data/blogArticles';
import { PAGE_PATHS, getBloggerPostPath, getToolPath } from '../../utils/routes';
import LoanPaymentCalculator from '../tools/LoanPaymentCalculator';
import { CATEGORY_STYLES } from './BlogPage';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectTool: (tool: ToolId) => void;
  onSelectArticle?: (slug: string) => void;
}

export default function HomePage({ onNavigate, onSelectTool, onSelectArticle }: HomePageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featuredTools = [
    {
      id: 'loan-payment-calculator' as ToolId,
      name: 'Loan Payment Calculator',
      category: 'Calculators',
      icon: Calculator,
      description: 'Estimate monthly loan payments, total interest costs, and full lifetime repayment with amortization formulas.',
      badge: 'Popular Tool',
    },
    {
      id: 'percentage-calculator' as ToolId,
      name: 'Percentage Calculator',
      category: 'Calculators',
      icon: Percent,
      description: 'Solve percentage increases, decreases, retail discounts, rate comparisons, and proportional changes.',
      badge: 'Fast Calculation',
    },
    {
      id: 'gst-tax-calculator' as ToolId,
      name: 'GST / Tax Calculator',
      category: 'Calculators',
      icon: Receipt,
      description: 'Add or remove sales tax, VAT, and GST with custom statutory rates and net/gross price breakdowns.',
      badge: 'Tax & VAT',
    },
    {
      id: 'tip-calculator' as ToolId,
      name: 'Tip & Bill Splitter',
      category: 'Calculators',
      icon: Coins,
      description: 'Compute gratuities, split restaurant checks evenly across groups, and round totals to whole dollars.',
      badge: 'Everyday Utility',
    },
  ];

  // Curate 6 high-value financial guides
  const featuredArticles = [
    BLOG_ARTICLES.find(a => a.slug === 'how-to-calculate-the-real-cost-of-a-personal-loan-before-applying'),
    BLOG_ARTICLES.find(a => a.slug === 'what-makes-a-loan-offer-expensive-even-when-the-interest-rate-looks-low'),
    BLOG_ARTICLES.find(a => a.slug === 'how-to-find-hidden-fees-in-a-credit-card-agreement'),
    BLOG_ARTICLES.find(a => a.slug === 'how-credit-card-minimum-payments-increase-the-time-to-become-debt-free'),
    BLOG_ARTICLES.find(a => a.slug === 'how-to-estimate-the-emergency-fund-you-need-from-your-monthly-expenses'),
    BLOG_ARTICLES.find(a => a.slug === 'how-to-calculate-your-true-monthly-cost-of-owning-a-car'),
  ].filter(Boolean) as typeof BLOG_ARTICLES;

  const topicsWeCover = [
    {
      title: 'Loans & Borrowing',
      icon: Calculator,
      description: 'Personal loan calculations, APR vs. nominal interest rates, origination fees, and true amortization costs.',
    },
    {
      title: 'Credit Cards',
      icon: CreditCard,
      description: 'Fee schedules, billing cycles, balance transfer conditions, grace periods, and compounding interest.',
    },
    {
      title: 'Saving & Budgeting',
      icon: PiggyBank,
      description: 'Calculating emergency funds from real expenses, sinking funds for annual bills, and high-yield account features.',
    },
    {
      title: 'Debt Management',
      icon: TrendingUp,
      description: 'Minimum payment traps, payoff plans built from actual income, and structured debt elimination frameworks.',
    },
    {
      title: 'Retirement & Goals',
      icon: Coins,
      description: 'Estimating retirement savings with variable yearly income and calculating how inflation shifts future targets.',
    },
    {
      title: 'Personal Finance & Auto',
      icon: Car,
      description: 'True vehicle ownership cost equations, insurance deductible calculations, and policy exclusion audits.',
    },
  ];

  const homepageFaqs = [
    {
      question: 'What is Money Master Blog?',
      answer:
        'Money Master Blog is an educational personal finance and online utilities website. It provides practical, reader-first money guides, step-by-step borrowing and saving explanations, and a collection of 25 fast, browser-based calculators and digital tools designed for everyday tasks.',
    },
    {
      question: 'What financial topics does Money Master Blog cover?',
      answer:
        'We cover personal loans, loan amortization, credit card agreements, debt reduction plans, emergency funds, sinking funds, car ownership expenses, insurance policy reviews, and long-term savings goals impacted by inflation.',
    },
    {
      question: 'Are the calculators free to use?',
      answer:
        'Yes, every calculator and tool on Money Master Blog is completely free to use. There are no fees, no subscriptions, no forced account registrations, and no paywalls.',
    },
    {
      question: 'Can I use the financial calculators on mobile?',
      answer:
        'Yes. The entire website is responsive. All calculators, forms, and articles adapt smoothly to smartphones, tablets, and desktop computers with comfortable touch targets and clear displays.',
    },
    {
      question: 'Is the information on Money Master Blog financial advice?',
      answer:
        'No. All articles, tools, and calculations on Money Master Blog are strictly educational. We do not provide personalized financial, legal, or investment advice. You should always consult qualified professionals or verified institutions for your specific situation.',
    },
    {
      question: 'How can I contact Money Master Blog?',
      answer:
        'You can reach website creator Shahid Ali directly through our Contact Us page (/p/contact-us.html). We welcome reader questions, tool suggestions, bug reports, and editorial feedback.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section id="hero-section" className="pt-6 sm:pt-12 pb-8 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold mb-6 border border-neutral-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Money Master Blog • Practical Money Guides & Online Tools</span>
          </div>

          {/* EXACT H1 */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight leading-tight sm:leading-none">
            Welcome to Money Master Blog
          </h1>

          {/* SUPPORTING HEADING */}
          <p className="mt-4 text-xl sm:text-2xl font-bold text-neutral-800 tracking-tight">
            Practical Money Guides, Financial Tools &amp; Helpful Online Resources
          </p>

          {/* NATURAL INTRODUCTORY PARAGRAPH */}
          <p className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Money Master Blog provides practical explanations, useful financial calculators, and easy-to-understand guides that help readers make better-informed everyday financial decisions. Whether you are calculating monthly loan payments, evaluating debt repayment strategies, or seeking reliable everyday calculation tools, our resources are structured for clarity and immediate utility.
          </p>

          {/* PRIMARY CTA BUTTONS */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              id="hero-btn-explore-tools"
              href={PAGE_PATHS.tools}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('tools');
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-neutral-900 text-white text-base font-semibold hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer min-h-[48px]"
            >
              <span>Explore Tools</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              id="hero-btn-read-blog"
              href={PAGE_PATHS.blog}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('blog');
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white text-neutral-800 text-base font-semibold border border-neutral-300 hover:bg-neutral-50 transition-colors cursor-pointer min-h-[48px]"
            >
              <BookOpen className="w-4 h-4 text-neutral-700" />
              <span>Read Our Blog</span>
            </a>
          </div>

          {/* Value Badges */}
          <div className="mt-12 pt-8 border-t border-neutral-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="flex items-start gap-2.5">
              <BookOpen className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-neutral-900">Practical Explanations</div>
                <div className="text-[11px] text-neutral-500">Formulas explained simply</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Calculator className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-neutral-900">25 Online Tools</div>
                <div className="text-[11px] text-neutral-500">Calculators & utilities</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Smartphone className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-neutral-900">Mobile Responsive</div>
                <div className="text-[11px] text-neutral-500">Phones, tablets & PCs</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <UserCheck className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-neutral-900">Curated by Shahid Ali</div>
                <div className="text-[11px] text-neutral-500">7 years practical exp.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY MONEY MASTER BLOG? */}
      <section id="why-money-master-blog" className="scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Editorial Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1">
              Why Money Master Blog?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              We focus on clarity, accuracy, and everyday utility. Here is how our approach helps you understand your money better.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 transition-colors shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">Practical Explanations</h3>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                We demystify complex financial terminology—such as APR, amortization schedules, compounding frequency, and fee clauses—using plain, straightforward language.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 transition-colors shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">Simple Examples</h3>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                Every calculation guide includes realistic hypothetical examples showing how adjusting interest rates, loan terms, or fees directly impacts your total cost.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 transition-colors shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">Useful Calculators &amp; Tools</h3>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                Instant browser-based calculators allow you to run loan estimates, tax computations, and percentage changes quickly on any device with zero software downloads.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 transition-colors shadow-2xs md:col-span-1.5">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">Reader-Focused Guides</h3>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                Our in-depth articles prioritize the reader&apos;s real dilemmas, including comparing loan offers, spotting hidden credit card fees, and setting emergency fund targets.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 transition-colors shadow-2xs md:col-span-2">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
                <ShieldCheck className="w-5 h-5 text-neutral-900" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">Transparent &amp; Responsible Information</h3>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                We disclose calculation formulas and assumptions openly, without sponsored bias, misleading rankings, or high-pressure financial promotions. We provide clear educational information so you can evaluate options independently.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-neutral-100 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-neutral-700 font-medium">
                Our guides and tools undergo quarterly mathematical audits and review for 2026 financial standards.
              </span>
            </div>
            <a
              href={PAGE_PATHS['editorial-policy']}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('editorial-policy');
              }}
              className="text-black font-bold hover:underline shrink-0"
            >
              Read Editorial Standards &amp; Review Policy &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* 3. FEATURED FINANCIAL TOOLS */}
      <section id="featured-financial-tools" className="scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Online Calculators
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1">
                Featured Financial Tools
              </h2>
              <p className="text-sm text-neutral-600 mt-1">
                Explore our curated selection of calculation tools designed to clarify loan costs, taxes, and rates.
              </p>
            </div>

            <a
              href={PAGE_PATHS.tools}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('tools');
                }
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 hover:text-neutral-700 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>View All 25 Tools</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {featuredTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  className="p-5 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 uppercase">
                        {tool.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-neutral-900">{tool.name}</h3>
                    <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-neutral-100">
                    <a
                      href={getToolPath(tool.id)}
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                          e.preventDefault();
                          onSelectTool(tool.id);
                        }
                      }}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <span>Open Calculator</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Interactive Loan Payment Calculator Preview */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-6 sm:p-8">
            <div className="max-w-3xl mb-6">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Interactive Preview
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1">
                Try the Loan Payment Calculator Live
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                Enter your loan amount, interest rate, and term below to calculate your estimated monthly installment and total repayment cost instantly.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-6 shadow-xs">
              <LoanPaymentCalculator />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-200/80 text-xs text-neutral-500">
              <span>Looking for percentage, VAT/tax, tip, or web tools?</span>
              <a
                href={PAGE_PATHS.tools}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    e.preventDefault();
                    onNavigate('tools');
                  }
                }}
                className="font-semibold text-neutral-900 hover:underline inline-flex items-center gap-1"
              >
                <span>Browse the full 25-tool directory</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED MONEY GUIDES */}
      <section id="featured-money-guides" className="scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                In-Depth Research
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1">
                Featured Money Guides
              </h2>
              <p className="text-sm text-neutral-600 mt-1">
                Carefully researched practical articles to help you navigate borrowing, credit, and savings decisions.
              </p>
            </div>

            <a
              href={PAGE_PATHS.blog}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('blog');
                }
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 hover:text-neutral-700 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>View All Guides</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => {
              const catStyle = CATEGORY_STYLES[article.category] || {
                bg: 'bg-neutral-100',
                text: 'text-neutral-800',
                border: 'border-neutral-200',
                dot: 'bg-neutral-600',
              };
              const postPath = getBloggerPostPath(article);
              const articleImg = getArticleImage(article);

              return (
                <article
                  key={article.slug}
                  className="rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-xs transition-all flex flex-col justify-between overflow-hidden"
                >
                  <a
                    href={postPath}
                    onClick={(e) => {
                      if (!e.ctrlKey && !e.metaKey && !e.shiftKey && onSelectArticle) {
                        e.preventDefault();
                        onSelectArticle(article.slug);
                      }
                    }}
                    className="block w-full aspect-16/9 overflow-hidden bg-neutral-100 border-b border-neutral-100 cursor-pointer"
                  >
                    <img
                      src={articleImg.src}
                      alt={articleImg.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </a>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${catStyle.dot}`}></span>
                          <span>{article.category}</span>
                        </span>
                        <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.readingTime}</span>
                        </span>
                      </div>

                    <h3 className="text-lg font-bold text-neutral-900 leading-snug">
                      <a
                        href={postPath}
                        onClick={(e) => {
                          if (!e.ctrlKey && !e.metaKey && !e.shiftKey && onSelectArticle) {
                            e.preventDefault();
                            onSelectArticle(article.slug);
                          }
                        }}
                        className="hover:text-neutral-700 transition-colors"
                      >
                        {article.title}
                      </a>
                    </h3>

                    <p className="text-xs text-neutral-600 mt-2.5 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{article.publishedDate}</span>
                    </span>

                    <a
                      href={postPath}
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey && !e.shiftKey && onSelectArticle) {
                          e.preventDefault();
                          onSelectArticle(article.slug);
                        }
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. MONEY TOPICS WE COVER */}
      <section id="money-topics-we-cover" className="scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Subject Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1">
              Money Topics We Cover
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Explore our structured resource library organized into focused personal finance categories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topicsWeCover.map((topic) => {
              const Icon = topic.icon;
              return (
                <div
                  key={topic.title}
                  className="p-5 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 transition-colors shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-800 mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-neutral-900">{topic.title}</h3>
                    <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100">
                    <a
                      href={PAGE_PATHS.blog}
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                          e.preventDefault();
                          onNavigate('blog');
                        }
                      }}
                      className="text-xs font-semibold text-neutral-900 hover:text-neutral-600 inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Explore {topic.title}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. PRACTICAL, READER-FOCUSED INFORMATION */}
      <section id="reader-focused-information" className="scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Editorial Principle
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                  Practical, Reader-Focused Information
                </h2>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
              <p>
                Money Master Blog was founded on the belief that everyday personal finance should be straightforward, understandable, and free from deceptive marketing. Many websites obscure real borrowing expenses behind promotional rankings or complex terminology. We focus on showing the actual math: how monthly installments are derived, how fees affect your net cash proceeds, and how extra repayments shorten debt timelines.
              </p>
              <p>
                Every calculation guide is built around transparent formulas, step-by-step evaluation methods, and clear hypothetical examples. We aim to equip you with the practical tools and knowledge required to evaluate loan contracts, credit agreements, and savings plans objectively.
              </p>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-950">Educational Disclaimer:</span>{' '}
                  Money Master Blog is an educational publisher and does not operate as a licensed financial advisor, lender, bank, or insurance broker. Content on this website is for general informational and educational estimation purposes. Financial rules, statutory tax rates, and lending guidelines vary by jurisdiction and change over time. Readers should always verify specific terms, rates, and contracts with authorized providers or licensed professionals before making binding commitments.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ABOUT THE AUTHOR */}
      <section id="about-author" className="scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-100">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-lg">
                  SA
                </div>
                <div>
                  <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Author &amp; Creator
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">Shahid Ali</h2>
                  <p className="text-xs text-neutral-500 font-medium">
                    7 years of practical experience in digital content workflows &amp; web utilities
                  </p>
                </div>
              </div>

              <a
                href={PAGE_PATHS.about}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    e.preventDefault();
                    onNavigate('about');
                  }
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-semibold hover:bg-neutral-200 transition-colors"
              >
                <span>Read Full Bio</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="text-xs sm:text-sm text-neutral-700 leading-relaxed space-y-3">
              <p>
                Shahid Ali curates Money Master Blog with a practical approach to digital publishing and online tools. Over 7 years of working with digital content workflows, testing web utilities, and structuring long-form educational guides, Shahid focuses on presenting complex topics clearly and honestly.
              </p>
              <p>
                Rather than relying on generic summaries, Shahid personally researches and writes the comprehensive finance guides on this site, testing formulas, building concrete hypothetical examples, and reviewing common borrower pitfalls. His goal is to provide a clean, distraction-free environment where readers can make sense of their numbers and find dependable everyday web utilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section id="faq-section" className="scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Find clear answers to common questions about Money Master Blog, our tools, and our educational guides.
            </p>
          </div>

          <div className="space-y-3">
            {homepageFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="rounded-xl border border-neutral-200 bg-white transition-all overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50 transition-colors focus:outline-hidden"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-neutral-900">
                      {faq.question}
                    </span>
                    <span
                      className={`text-neutral-500 text-lg transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      ▾
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 bg-neutral-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section id="final-cta" className="scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-12 rounded-2xl bg-neutral-900 text-white text-center shadow-lg">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Explore Money Guides &amp; Useful Tools
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
              Take the guesswork out of personal loans, interest calculations, budgeting, and everyday digital tasks with our free guides and browser utilities.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href={PAGE_PATHS.tools}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    e.preventDefault();
                    onNavigate('tools');
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white text-neutral-900 text-sm font-semibold hover:bg-neutral-100 transition-colors shadow-xs cursor-pointer min-h-[46px]"
              >
                <span>Explore Tools</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={PAGE_PATHS.blog}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    e.preventDefault();
                    onNavigate('blog');
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-neutral-800 text-white text-sm font-semibold hover:bg-neutral-700 transition-colors border border-neutral-700 cursor-pointer min-h-[46px]"
              >
                <span>Browse Blog</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
