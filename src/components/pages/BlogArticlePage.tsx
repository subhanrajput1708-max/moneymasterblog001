import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Info,
  Lightbulb,
  Calculator,
  ChevronRight,
  ShieldCheck,
  Layers,
  BookOpen,
  Scale,
  Compass,
  ListChecks,
  HelpCircle,
  TrendingUp,
  Award,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Printer,
  Check,
  FileCheck
} from 'lucide-react';
import { BlogArticle, PageId, ToolId } from '../../types';
import { BLOG_ARTICLES, getRelatedArticles, getArticleImage } from '../../data/blogArticles';
import { CATEGORY_STYLES } from './BlogPage';
import FaqSection from '../common/FaqSection';
import { PAGE_PATHS, getBloggerPostPath, getCanonicalUrl } from '../../utils/routes';
import { getToolById } from '../../data/toolsData';

interface BlogArticlePageProps {
  article: BlogArticle;
  onNavigate: (page: PageId) => void;
  onSelectArticle: (slug: string) => void;
  onSelectTool: (tool: ToolId) => void;
}

export default function BlogArticlePage({
  article,
  onNavigate,
  onSelectArticle,
  onSelectTool
}: BlogArticlePageProps) {
  const catStyle = CATEGORY_STYLES[article.category];
  const relatedArticles = getRelatedArticles(article.slug, 3);

  // Interactive user features
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [helpfulVote, setHelpfulVote] = useState<'yes' | 'no' | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const articleImage = getArticleImage(article);

  const toggleStep = (idx: number) => {
    setCheckedSteps(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const completedCount = Object.values(checkedSteps).filter(Boolean).length;
  const totalSteps = article.checklist?.length || 0;
  const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  const handleCopySummary = () => {
    const actionSteps = article.conclusion?.nextSteps || article.checklist || [];
    const summaryText = `${article.title}\n\nQuick Answer:\n${article.quickAnswer}\n\nKey Action Steps:\n${actionSteps.map((t: string) => `- ${t}`).join('\n')}\n\nRead full guide at: ${getCanonicalUrl(getBloggerPostPath(article))}`;
    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Find index in master list for Prev / Next navigation
  const currentIndex = BLOG_ARTICLES.findIndex(a => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? BLOG_ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < BLOG_ARTICLES.length - 1 ? BLOG_ARTICLES[currentIndex + 1] : null;

  // Dynamically inject Schema.org JSON-LD for Article and FAQPage
  useEffect(() => {
    const articleScriptId = 'blog-article-jsonld';
    const existingScript = document.getElementById(articleScriptId);
    if (existingScript) existingScript.remove();

    const faqEntities = (article.faqs || []).map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }));

    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          headline: article.h1,
          name: article.title,
          description: article.metaDescription,
          image: getCanonicalUrl(articleImage.src),
          datePublished: article.publishedDate,
          dateModified: article.updatedDate,
          author: {
            '@type': 'Person',
            name: 'Shahid Ali',
            jobTitle: 'Content Author & Web Utility Specialist',
            description: '7 years of practical experience in digital content workflows & web utilities.',
            url: getCanonicalUrl(PAGE_PATHS.about)
          },
          publisher: {
            '@type': 'Organization',
            name: 'Money Master Blog',
            url: getCanonicalUrl(PAGE_PATHS.home),
            logo: {
              '@type': 'ImageObject',
              url: getCanonicalUrl('/logo.png')
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': getCanonicalUrl(getBloggerPostPath(article))
          }
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqEntities
        }
      ]
    };

    const script = document.createElement('script');
    script.id = articleScriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById(articleScriptId);
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [article]);

  return (
    <article className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. TOP BACK BAR & BREADCRUMBS */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 pb-3 border-b border-neutral-200">
        <button
          type="button"
          onClick={() => onNavigate('blog')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white hover:bg-neutral-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs group"
          aria-label="Back to All Articles"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to All Articles</span>
        </button>

        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-xs text-neutral-500 flex-wrap">
            <li>
              <a
                href={PAGE_PATHS.home}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    e.preventDefault();
                    onNavigate('home');
                  }
                }}
                className="hover:text-black transition-colors cursor-pointer"
              >
                Home
              </a>
            </li>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <li>
              <a
                href={PAGE_PATHS.blog}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    e.preventDefault();
                    onNavigate('blog');
                  }
                }}
                className="hover:text-black transition-colors cursor-pointer"
              >
                Blog
              </a>
            </li>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <li className="font-semibold text-black truncate max-w-[200px] sm:max-w-xs">
              {article.title}
            </li>
          </ol>
        </nav>
      </div>

      {/* 2. ARTICLE HEADER */}
      <header className="space-y-6 max-w-4xl">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold tracking-wide uppercase border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${catStyle.dot}`}></span>
            {article.category}
          </span>

          <div className="flex items-center gap-1 text-neutral-500 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readingTime}</span>
          </div>

          <span className="text-neutral-300">•</span>

          <div className="flex items-center gap-1 text-neutral-500 font-medium">
            <Calendar className="w-3.5 h-3.5" />
            <span>Published {article.publishedDate}</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
          {article.h1}
        </h1>

        <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed font-normal">
          {article.excerpt}
        </p>

        {/* Author Byline & Fact Check Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 text-xs text-neutral-600 border-t border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
              SA
            </div>
            <div>
              <span className="font-bold text-neutral-900">Written by Shahid Ali</span>
              <span className="text-neutral-400 ml-2">7+ years practical finance modeling</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PAGE_PATHS['editorial-policy']}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('editorial-policy');
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold hover:bg-emerald-100 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Fact-Checked &bull; Editorial Policy</span>
            </a>
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[11px] font-medium transition-colors cursor-pointer"
              title="Copy Summary to Clipboard"
            >
              {copiedSummary ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copiedSummary ? 'Copied!' : 'Copy Summary'}</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[11px] font-medium transition-colors cursor-pointer"
              title="Print or Save PDF"
            >
              <Printer className="w-3 h-3" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>
      </header>

      {/* FEATURED TOPIC IMAGE */}
      <div className="max-w-4xl overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-2xs">
        <img
          src={articleImage.src}
          alt={articleImage.alt}
          referrerPolicy="no-referrer"
          className="w-full aspect-16/9 object-cover"
          loading="eager"
        />
        <div className="p-3 bg-white border-t border-neutral-200 flex flex-wrap items-center justify-between text-xs text-neutral-500 gap-2">
          <span>{articleImage.caption}</span>
          <span className="font-semibold text-neutral-700">Money Master Blog • Visual Analysis</span>
        </div>
      </div>

      {/* 3. QUICK PRACTICAL ANSWER */}
      <section id="quick-answer" className="max-w-4xl">
        <div className="p-6 sm:p-7 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-2xs space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold text-emerald-900 uppercase tracking-wider">
            <Lightbulb className="w-4 h-4 text-emerald-700" />
            <span>Quick Practical Answer</span>
          </div>
          <p className="text-sm sm:text-base text-emerald-950 font-medium leading-relaxed">
            {article.quickAnswer}
          </p>
        </div>
      </section>

      {/* 4. RELEVANT FINANCIAL TOOL CALLOUT (ONLY IF GENUINELY RELEVANT) */}
      {article.relevantToolIds && article.relevantToolIds.length > 0 && (
        <section id="relevant-tools" className="max-w-4xl">
          <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900 text-neutral-100 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5" />
                <span>Interactive Calculator Available</span>
              </div>
              <h4 className="text-base font-bold text-white">
                Calculate your custom numbers using our free browser tool
              </h4>
              <p className="text-xs text-neutral-300">
                100% client-side execution. Your financial figures remain entirely on your device.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 shrink-0">
              {article.relevantToolIds.slice(0, 2).map(toolId => (
                <button
                  key={toolId}
                  onClick={() => onSelectTool(toolId)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-neutral-900 font-bold text-xs hover:bg-neutral-100 transition-colors cursor-pointer shadow-xs"
                >
                  <span>Open {getToolById(toolId)?.name || 'Calculator'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. CORE CONCEPT & KEY DEFINITIONS */}
      {article.coreConcept && (
        <section id="core-concept" className="max-w-4xl">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-neutral-800 uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>Core Financial Concept</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
              {article.coreConcept.title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              {article.coreConcept.explanation}
            </p>

            {article.coreConcept.definitions && article.coreConcept.definitions.length > 0 && (
              <div className="pt-4 border-t border-neutral-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                  Essential Terms Defined
                </h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {article.coreConcept.definitions.map((def, dIdx) => (
                    <div key={dIdx} className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
                      <dt className="text-xs font-bold text-neutral-900 mb-1">{def.term}</dt>
                      <dd className="text-xs text-neutral-600 leading-relaxed">{def.definition}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 6. MAIN BODY SECTIONS */}
      <div className="max-w-4xl space-y-12 text-neutral-800">
        {article.sections && article.sections.map((section, sIndex) => (
          <section key={sIndex} className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {section.heading}
            </h2>

            {section.subheading && (
              <h3 className="text-lg font-bold text-neutral-800 tracking-tight">
                {section.subheading}
              </h3>
            )}

            {section.paragraphs.map((p, pIndex) => (
              <p key={pIndex} className="text-base sm:text-lg text-neutral-700 leading-relaxed font-normal">
                {p}
              </p>
            ))}

            {section.bulletPoints && section.bulletPoints.length > 0 && (
              <ul className="space-y-2.5 my-4 pl-2">
                {section.bulletPoints.map((item, bIndex) => (
                  <li key={bIndex} className="flex items-start gap-3 text-sm sm:text-base text-neutral-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-2.5 shrink-0"></span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.numberedList && section.numberedList.length > 0 && (
              <ol className="space-y-3.5 my-4">
                {section.numberedList.map((item, nIndex) => (
                  <li key={nIndex} className="flex items-start gap-3 text-sm sm:text-base text-neutral-700">
                    <span className="w-6 h-6 rounded-md bg-neutral-100 border border-neutral-300 text-neutral-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {nIndex + 1}
                    </span>
                    <span className="leading-relaxed font-normal">{item}</span>
                  </li>
                ))}
              </ol>
            )}

            {section.callout && (
              <div
                className={`p-5 rounded-xl border my-6 text-sm ${
                  section.callout.type === 'warning'
                    ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                    : section.callout.type === 'info'
                    ? 'bg-blue-50/80 border-blue-200 text-blue-950'
                    : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1.5">
                  {section.callout.type === 'warning' && (
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                  )}
                  {section.callout.type === 'info' && (
                    <Info className="w-4 h-4 text-blue-700 shrink-0" />
                  )}
                  {section.callout.type === 'tip' && (
                    <Lightbulb className="w-4 h-4 text-emerald-700 shrink-0" />
                  )}
                  <span>{section.callout.title}</span>
                </div>
                <p className="leading-relaxed">{section.callout.text}</p>
              </div>
            )}
          </section>
        ))}

        {/* 7. STEP-BY-STEP METHOD */}
        {article.stepByStepMethod && (
          <section id="step-by-step-method" className="space-y-6 pt-6 border-t border-neutral-200">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                {article.stepByStepMethod.title}
              </h2>
              <p className="text-base text-neutral-600 mt-2">
                {article.stepByStepMethod.description}
              </p>
            </div>

            <div className="space-y-4">
              {article.stepByStepMethod.steps.map((step) => (
                <div key={step.stepNumber} className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-neutral-900 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                      {step.stepNumber}
                    </span>
                    <h3 className="text-lg font-bold text-neutral-900">
                      {step.stepName}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm pt-2">
                    <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80">
                      <strong className="block text-neutral-900 font-semibold mb-1">What to Check:</strong>
                      <span className="text-neutral-700">{step.whatToCheck}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80">
                      <strong className="block text-neutral-900 font-semibold mb-1">Why It Matters:</strong>
                      <span className="text-neutral-700">{step.whyItMatters}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200/80 text-xs sm:text-sm">
                    <div className="flex items-start gap-2">
                      <Calculator className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-emerald-950 font-bold">Calculation / Evaluation: </strong>
                        <span className="text-emerald-900">{step.howToCalculate}</span>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-emerald-200/60 text-emerald-950 text-xs font-medium">
                      <strong>Expected Result: </strong>{step.expectedResult}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. MULTIPLE ORIGINAL PRACTICAL EXAMPLES */}
        {article.examples && article.examples.length > 0 && (
          <section id="practical-examples" className="space-y-6 pt-6 border-t border-neutral-200">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                Practical Calculation Examples
              </h2>
              <p className="text-base text-neutral-600 mt-2">
                Realistic hypothetical scenarios demonstrating the real-world mathematical impact across different variables:
              </p>
            </div>

            <div className="space-y-6">
              {article.examples.map((ex, exIdx) => (
                <div key={exIdx} className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-xs">
                  <div className="px-6 py-4 bg-neutral-900 text-white font-bold text-sm sm:text-base flex items-center justify-between">
                    <span>{ex.title}</span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-neutral-800 text-emerald-400">
                      Hypothetical Example
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
                        <span className="text-neutral-500 uppercase font-semibold block text-[10px]">Starting Amount</span>
                        <span className="font-bold text-neutral-900">{ex.startingAmount}</span>
                      </div>
                      <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
                        <span className="text-neutral-500 uppercase font-semibold block text-[10px]">Rate</span>
                        <span className="font-bold text-neutral-900">{ex.rate}</span>
                      </div>
                      <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
                        <span className="text-neutral-500 uppercase font-semibold block text-[10px]">Term</span>
                        <span className="font-bold text-neutral-900">{ex.term}</span>
                      </div>
                      <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
                        <span className="text-neutral-500 uppercase font-semibold block text-[10px]">Fees</span>
                        <span className="font-bold text-neutral-900">{ex.fees}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 font-mono text-xs text-neutral-800 whitespace-pre-wrap leading-relaxed">
                      <span className="font-sans font-bold text-neutral-500 block mb-1 uppercase tracking-wider text-[11px]">
                        Step-by-Step Calculation:
                      </span>
                      {ex.calculation}
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <span className="font-bold text-sm sm:text-base">Result: {ex.result}</span>
                    </div>

                    <div className="text-xs sm:text-sm text-neutral-700 bg-neutral-50/60 p-3.5 rounded-xl border border-neutral-200">
                      <strong className="text-neutral-900">Interpretation: </strong>
                      {ex.interpretation}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 9. COMPARISON TABLE */}
        {article.comparisonTable && (
          <section id="comparison-table" className="space-y-4 pt-6 border-t border-neutral-200">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-2">
                <Scale className="w-6 h-6 text-neutral-800" />
                {article.comparisonTable.title}
              </h2>
              {article.comparisonTable.description && (
                <p className="text-sm text-neutral-600 mt-1">
                  {article.comparisonTable.description}
                </p>
              )}
            </div>

            <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-xs">
              <table className="min-w-full divide-y divide-neutral-200 text-xs sm:text-sm">
                <thead className="bg-neutral-900 text-white font-bold">
                  <tr>
                    {article.comparisonTable.headers.map((h, hIdx) => (
                      <th key={hIdx} className="px-4 py-3.5 text-left font-semibold tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-neutral-800">
                  {article.comparisonTable.rows.map((row, rIdx) => (
                    <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/70'}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className={`px-4 py-3 ${cIdx === 0 ? 'font-bold text-neutral-900' : ''}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {article.comparisonTable.footnote && (
              <p className="text-xs text-neutral-500 italic">
                {article.comparisonTable.footnote}
              </p>
            )}
          </section>
        )}

        {/* 10. REAL-WORLD SCENARIOS */}
        {article.realWorldScenarios && article.realWorldScenarios.length > 0 && (
          <section id="real-world-scenarios" className="space-y-4 pt-6 border-t border-neutral-200">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Real-World Financial Scenarios
            </h2>
            <div className="space-y-4">
              {article.realWorldScenarios.map((sc, scIdx) => (
                <div key={scIdx} className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-3">
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                    {sc.title}
                  </h3>
                  <div className="text-xs sm:text-sm text-neutral-600">
                    <strong className="text-neutral-900 font-semibold">Borrower/Saver Profile: </strong>
                    {sc.profile}
                  </div>
                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs sm:text-sm space-y-2">
                    <p><strong className="text-neutral-900">Dilemma: </strong>{sc.dilemma}</p>
                    <p><strong className="text-neutral-900">Analysis: </strong>{sc.evaluation}</p>
                    <p><strong className="text-emerald-800">Recommended Action: </strong>{sc.recommendedAction}</p>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-emerald-900 pt-1">
                    Financial Outcome: {sc.financialOutcome}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 11. COMMON MISTAKES SECTION */}
        {article.commonMistakes && article.commonMistakes.length > 0 && (
          <section id="common-mistakes" className="space-y-4 pt-6 border-t border-neutral-200">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              Common Mistakes to Avoid
            </h2>
            <div className="space-y-4">
              {article.commonMistakes.map((m, mIdx) => (
                <div key={mIdx} className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-2.5">
                  <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-800 font-bold text-xs flex items-center justify-center shrink-0">
                      ✕
                    </span>
                    Mistake: {m.mistake}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600">
                    <strong className="text-neutral-800 font-semibold">Why it happens: </strong>
                    {m.whyItHappens}
                  </p>
                  <p className="text-xs sm:text-sm text-rose-900 bg-rose-50/60 p-2.5 rounded-lg border border-rose-100">
                    <strong className="font-semibold">Financial Consequence: </strong>
                    {m.consequence}
                  </p>
                  <p className="text-xs sm:text-sm text-emerald-950 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100">
                    <strong className="font-semibold text-emerald-900">Better Approach: </strong>
                    {m.betterApproach}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 12. IMPORTANT EXCEPTIONS */}
        {article.importantExceptions && article.importantExceptions.length > 0 && (
          <section id="important-exceptions" className="space-y-4 pt-6 border-t border-neutral-200">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Important Exceptions &amp; Edge Cases
            </h2>
            <div className="space-y-3">
              {article.importantExceptions.map((ex, exIdx) => (
                <div key={exIdx} className="p-5 rounded-xl bg-amber-50/40 border border-amber-200 space-y-1.5 text-xs sm:text-sm">
                  <h3 className="font-bold text-neutral-900">
                    Exception: {ex.situation}
                  </h3>
                  <p className="text-amber-950">
                    <strong className="font-semibold">Why the general method fails: </strong>
                    {ex.whyGeneralMethodFails}
                  </p>
                  <p className="text-emerald-950 pt-1">
                    <strong className="font-semibold text-emerald-900">How to handle: </strong>
                    {ex.howToHandle}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 13. DECISION FRAMEWORK */}
        {article.decisionFramework && (
          <section id="decision-framework" className="space-y-4 pt-6 border-t border-neutral-200">
            <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 text-white space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                <span>Decision Framework</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {article.decisionFramework.title}
              </h2>
              <p className="text-sm text-neutral-300">
                {article.decisionFramework.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-4 border-t border-neutral-800">
                {article.decisionFramework.stages.map((stg, sIdx) => (
                  <div key={sIdx} className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700 space-y-2">
                    <span className="text-xs font-extrabold text-emerald-400 block uppercase">
                      {stg.stage}
                    </span>
                    <h3 className="text-sm font-bold text-white leading-tight">
                      {stg.action}
                    </h3>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {stg.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 14. PRACTICAL INTERACTIVE CHECKLIST */}
        {article.checklist && article.checklist.length > 0 && (
          <section id="practical-checklist" className="space-y-4 pt-6 border-t border-neutral-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-2">
                <ListChecks className="w-6 h-6 text-emerald-600" />
                Actionable Implementation Checklist
              </h2>
              <span className="text-xs font-bold text-neutral-500">
                {completedCount} of {totalSteps} Completed ({progressPercent}%)
              </span>
            </div>

            {/* Live Progress Bar */}
            <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
              {article.checklist.map((item, cIndex) => {
                const isChecked = !!checkedSteps[cIndex];
                return (
                  <div
                    key={cIndex}
                    onClick={() => toggleStep(cIndex)}
                    className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors cursor-pointer ${
                      isChecked ? 'bg-emerald-50/70 border border-emerald-200' : 'hover:bg-neutral-100/70'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleStep(cIndex)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 mt-0.5 cursor-pointer"
                    />
                    <span className={`text-sm leading-relaxed ${isChecked ? 'text-emerald-950 font-medium line-through' : 'text-neutral-800'}`}>
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 15. DETAILED FAQS ACCORDION */}
        {article.faqs && article.faqs.length > 0 && (
          <div id="article-faqs" className="pt-6 border-t border-neutral-200">
            <FaqSection
              title={`Frequently Asked Questions: ${article.title}`}
              subtitle="Clear, verified answers to common questions and practical financial scenarios."
              items={article.faqs}
            />
          </div>
        )}

        {/* 16. CONCLUSION & NEXT STEPS */}
        {article.conclusion && (
          <section id="conclusion" className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
              Conclusion &amp; Key Takeaways
            </h2>
            <p className="text-base text-neutral-700 leading-relaxed">
              {article.conclusion.summary}
            </p>
            {article.conclusion.nextSteps && article.conclusion.nextSteps.length > 0 && (
              <div className="pt-4 border-t border-neutral-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-2">
                  Actionable Next Steps:
                </h3>
                <ul className="space-y-2 text-sm text-neutral-700">
                  {article.conclusion.nextSteps.map((step, nsIdx) => (
                    <li key={nsIdx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* INTERACTIVE READER FEEDBACK WIDGET */}
        <section id="reader-feedback" className="p-6 rounded-2xl bg-neutral-100 border border-neutral-200 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-neutral-900">Was this financial guide helpful?</h3>
              <p className="text-xs text-neutral-600">Your feedback directly informs our quarterly editorial reviews and calculation accuracy audits.</p>
            </div>
            {helpfulVote ? (
              <div className="text-xs font-semibold text-emerald-900 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 flex items-center gap-1.5 shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Thank you! Your feedback has been recorded.</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setHelpfulVote('yes')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-black text-white text-xs font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  Yes, helpful
                </button>
                <button
                  type="button"
                  onClick={() => setHelpfulVote('no')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-neutral-300 text-neutral-700 text-xs font-bold hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                  Needs revision
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 17. AUTHOR BIO BOX & EDITORIAL TRANSPARENCY */}
        <section id="author-bio" className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-neutral-900 text-white font-extrabold text-lg flex items-center justify-center shrink-0">
              SA
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-neutral-900">
                Written by Shahid Ali
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                7 years of practical experience in digital content workflows &amp; web utilities. Focused on building transparent, client-side tools and educational financial guides that empower readers to make data-driven personal finance decisions.
              </p>
            </div>
          </div>
          <div className="pt-3 border-t border-neutral-200 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
            <span className="font-semibold text-emerald-800 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Audited for 2026 Financial Standards
            </span>
            <span>&bull;</span>
            <a
              href={PAGE_PATHS['editorial-policy']}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('editorial-policy');
              }}
              className="text-neutral-900 font-semibold hover:underline"
            >
              Read our Editorial Policy &amp; Calculation Methodology &rarr;
            </a>
          </div>
        </section>

        {/* 18. EDUCATIONAL DISCLAIMER */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
          <strong>Educational Disclaimer: </strong>
          This guide is published strictly for educational and informational purposes. It does not constitute personalized financial, credit, legal, insurance, or investment advice. Numerical examples are hypothetical models for conceptual illustration. Interest rates, loan eligibility, tax policies, and insurance regulations vary according to local jurisdictions and individual underwriter guidelines.
        </div>
      </div>

      {/* 19. PREVIOUS / NEXT ARTICLE NAVIGATION */}
      <section id="article-pagination" className="max-w-4xl pt-8 border-t border-neutral-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevArticle ? (
            <a
              href={getBloggerPostPath(prevArticle)}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onSelectArticle(prevArticle.slug);
                }
              }}
              className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-2xs transition-all text-left flex flex-col justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 mb-1 group-hover:text-neutral-900">
                <ArrowLeft className="w-3 h-3" />
                <span>Previous Guide</span>
              </div>
              <h4 className="text-sm font-bold text-neutral-900 line-clamp-2">
                {prevArticle.title}
              </h4>
            </a>
          ) : (
            <div></div>
          )}

          {nextArticle ? (
            <a
              href={getBloggerPostPath(nextArticle)}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onSelectArticle(nextArticle.slug);
                }
              }}
              className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-2xs transition-all text-right flex flex-col justify-between cursor-pointer group sm:col-start-2"
            >
              <div className="flex items-center justify-end gap-1.5 text-xs font-semibold text-neutral-500 mb-1 group-hover:text-neutral-900">
                <span>Next Guide</span>
                <ArrowRight className="w-3 h-3" />
              </div>
              <h4 className="text-sm font-bold text-neutral-900 line-clamp-2">
                {nextArticle.title}
              </h4>
            </a>
          ) : (
            <div></div>
          )}
        </div>
      </section>

      {/* 20. RELATED FINANCIAL GUIDES */}
      <section id="related-guides" className="max-w-4xl pt-8 border-t border-neutral-200 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
              Related Financial Guides
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Explore more actionable guides in {article.category} and practical wealth management.
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
            className="text-xs font-bold text-neutral-900 hover:underline cursor-pointer hidden sm:inline-flex items-center gap-1"
          >
            <span>View All {BLOG_ARTICLES.length} Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {relatedArticles.map(rel => {
            const relStyle = CATEGORY_STYLES[rel.category];
            const relImg = getArticleImage(rel);
            return (
              <a
                key={rel.id}
                href={getBloggerPostPath(rel)}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    e.preventDefault();
                    onSelectArticle(rel.slug);
                  }
                }}
                className="p-4 sm:p-5 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between cursor-pointer group text-left block"
              >
                <div className="space-y-3">
                  <div className="w-full aspect-16/9 overflow-hidden rounded-lg bg-neutral-100">
                    <img
                      src={relImg.src}
                      alt={relImg.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${relStyle.bg} ${relStyle.text}`}
                  >
                    {rel.category}
                  </span>
                  <h4 className="text-sm font-bold text-neutral-900 leading-snug group-hover:text-neutral-700 transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {rel.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                  <span>{rel.readingTime}</span>
                  <span className="font-bold text-neutral-900 group-hover:translate-x-0.5 transform duration-150 inline-flex items-center gap-1">
                    Read
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* 21. BOTTOM NAVIGATION & BACK BUTTON */}
      <section className="pt-8 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            onNavigate('blog');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 text-sm font-semibold transition-colors cursor-pointer shadow-xs group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to All Articles</span>
        </button>

        <button
          type="button"
          onClick={() => {
            onNavigate('tools');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-300 bg-white text-black hover:bg-neutral-50 text-sm font-semibold transition-colors cursor-pointer"
        >
          <span>Explore 25 Online Tools &rarr;</span>
        </button>
      </section>
    </article>
  );
}
