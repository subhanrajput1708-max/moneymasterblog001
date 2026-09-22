import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  Lightbulb,
  Wrench,
  Share2,
  Copy,
  Check,
  BookOpen,
  ChevronRight,
  ShieldCheck,
  Layers,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import { BlogArticle, PageId, ToolId } from '../../types';
import { BLOG_ARTICLES, getRelatedArticles } from '../../data/blogArticles';
import { CATEGORY_STYLES } from './BlogPage';
import FaqSection from '../common/FaqSection';
import { PAGE_PATHS, getBloggerPostPath, getCanonicalUrl } from '../../utils/routes';

interface BlogArticlePageProps {
  article: BlogArticle;
  onNavigate: (page: PageId) => void;
  onSelectArticle: (slug: string) => void;
  onSelectTool: (tool: ToolId) => void;
}

const TOOL_NAMES: Record<ToolId, string> = {
  'color-palette': 'Color Palette Generator',
  'lorem-ipsum': 'Lorem Ipsum Generator',
  'word-counter': 'Word Counter & Case Converter',
  'password-generator': 'Random Password Generator',
  'text-sorter': 'Text Sorter',
  'find-replace': 'Find & Replace Text',
  'remove-line-breaks': 'Remove Line Breaks',
  'duplicate-remover': 'Duplicate Line Remover',
  'whitespace-remover': 'Whitespace Remover',
  'line-counter': 'Text Line Counter',
  'invisible-character-remover': 'Invisible Character Remover',
  'punctuation-cleaner': 'Text Punctuation Cleaner',
  'number-extractor': 'Text Number Extractor',
  'quote-remover': 'Text Quote Remover',
  'prefix-suffix-cleaner': 'Text Prefix & Suffix Cleaner'
};

export default function BlogArticlePage({
  article,
  onNavigate,
  onSelectArticle,
  onSelectTool
}: BlogArticlePageProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedExampleIndex, setCopiedExampleIndex] = useState<number | null>(null);

  const catStyle = CATEGORY_STYLES[article.category];
  const relatedArticles = getRelatedArticles(article.slug, 3);

  // Find index in master list for Prev / Next navigation
  const currentIndex = BLOG_ARTICLES.findIndex(a => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? BLOG_ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < BLOG_ARTICLES.length - 1 ? BLOG_ARTICLES[currentIndex + 1] : null;

  // Dynamically inject Schema.org JSON-LD for Article and FAQPage
  useEffect(() => {
    const articleScriptId = 'blog-article-jsonld';
    const existingScript = document.getElementById(articleScriptId);
    if (existingScript) existingScript.remove();

    const faqEntities = article.faqs.map(faq => ({
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
          datePublished: article.publishedDate,
          dateModified: article.updatedDate,
          author: {
            '@type': 'Person',
            name: 'Shahid Ali',
            jobTitle: 'Content Author & Web Utility Specialist',
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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getCanonicalUrl(getBloggerPostPath(article)));
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedExampleIndex(index);
    setTimeout(() => setCopiedExampleIndex(null), 2000);
  };

  return (
    <article className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. BREADCRUMBS NAVIGATION */}
      <nav aria-label="Breadcrumb" className="pt-2">
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
              className="hover:text-neutral-900 transition-colors cursor-pointer"
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
              className="hover:text-neutral-900 transition-colors cursor-pointer"
            >
              Practical Guides & Blog
            </a>
          </li>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <li className="font-semibold text-neutral-900 truncate max-w-xs sm:max-w-md">
            {article.title}
          </li>
        </ol>
      </nav>

      {/* 2. ARTICLE HEADER */}
      <header className="space-y-6 max-w-4xl">
        {/* Category & Meta Information */}
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

          <div className="flex items-center gap-1 text-neutral-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>Published {article.publishedDate}</span>
          </div>
        </div>

        {/* H1 Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
          {article.h1}
        </h1>

        {/* Excerpt / Lead Paragraph */}
        <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed font-normal">
          {article.excerpt}
        </p>

        {/* Author & Share Bar */}
        <div className="pt-4 pb-2 border-t border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-900 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
              SA
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-neutral-900">
                <span>Written by Shahid Ali</span>
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <p className="text-xs text-neutral-500">
                7 years of practical experience in digital content workflows & web utilities
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold transition-colors cursor-pointer"
              title="Copy link to guide"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Share Guide</span>
                </>
              )}
            </button>

            <button
              onClick={() => onNavigate('blog')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50 text-xs font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Guides</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. QUICK ANSWER CALLOUT */}
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

      {/* 4. RELEVANT TOOL CALLOUT BANNER */}
      {article.relevantToolIds.length > 0 && (
        <section id="relevant-tools" className="max-w-4xl">
          <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900 text-neutral-100 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <Wrench className="w-3.5 h-3.5" />
                <span>Try This Workflow In Browser</span>
              </div>
              <h4 className="text-base font-bold text-white">
                Clean and format your data using our free tools
              </h4>
              <p className="text-xs text-neutral-300">
                100% private client-side execution. Your text never leaves your browser.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 shrink-0">
              {article.relevantToolIds.slice(0, 2).map(toolId => (
                <button
                  key={toolId}
                  onClick={() => onSelectTool(toolId)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-neutral-900 font-bold text-xs hover:bg-neutral-100 transition-colors cursor-pointer shadow-xs"
                >
                  <span>Open {TOOL_NAMES[toolId] || 'Tool'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. ARTICLE BODY SECTIONS */}
      <div className="max-w-4xl space-y-12 text-neutral-800">
        {article.sections.map((section, sIndex) => (
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

            {/* Bullet Points */}
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

            {/* Numbered List */}
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

            {/* Callout Box */}
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

            {/* Before / After Example Box */}
            {section.example && (
              <div className="my-6 rounded-xl border border-neutral-300 overflow-hidden bg-white shadow-2xs">
                <div className="px-4 py-2.5 bg-neutral-100 border-b border-neutral-200 font-bold text-xs text-neutral-800 flex items-center justify-between">
                  <span>{section.example.title}</span>
                  <span className="text-[11px] text-neutral-500 font-normal">Demonstration</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
                  {/* Before */}
                  <div className="p-4 space-y-2 bg-rose-50/20">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                        Raw / Before
                      </span>
                    </div>
                    <pre className="text-xs font-mono text-neutral-800 whitespace-pre-wrap bg-white p-3 rounded-lg border border-neutral-200 overflow-x-auto leading-relaxed">
                      {section.example.before}
                    </pre>
                  </div>

                  {/* After */}
                  <div className="p-4 space-y-2 bg-emerald-50/20">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                        Cleaned / After
                      </span>
                      <button
                        onClick={() => handleCopyText(section.example!.after, sIndex)}
                        className="text-[11px] font-semibold text-neutral-600 hover:text-neutral-900 inline-flex items-center gap-1 cursor-pointer"
                      >
                        {copiedExampleIndex === sIndex ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Output</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="text-xs font-mono text-neutral-800 whitespace-pre-wrap bg-white p-3 rounded-lg border border-neutral-200 overflow-x-auto leading-relaxed">
                      {section.example.after}
                    </pre>
                  </div>
                </div>

                {section.example.explanation && (
                  <div className="px-4 py-2.5 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-600">
                    <span className="font-bold text-neutral-800">What changed: </span>
                    {section.example.explanation}
                  </div>
                )}
              </div>
            )}
          </section>
        ))}

        {/* 6. ALTERNATIVE METHOD & DECISION GUIDE */}
        {article.alternativeMethod && (
          <section id="alternative-method" className="space-y-4 pt-6 border-t border-neutral-200">
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-neutral-800 uppercase tracking-wider">
                  <SlidersHorizontal className="w-4 h-4 text-neutral-700" />
                  <span>Alternative Workflow & Decision Guide</span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-200 text-neutral-800 font-semibold">
                  Manual / Formula Method
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
                  {article.alternativeMethod.title}
                </h3>
                <p className="text-sm text-neutral-700 mt-1 leading-relaxed">
                  {article.alternativeMethod.description}
                </p>
              </div>

              {article.alternativeMethod.steps && article.alternativeMethod.steps.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                    Execution Steps:
                  </span>
                  <ol className="space-y-2">
                    {article.alternativeMethod.steps.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                        <span className="w-5 h-5 rounded bg-white border border-neutral-300 text-neutral-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                          {sIdx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <div className="p-4 rounded-xl bg-white border border-neutral-200 text-xs sm:text-sm text-neutral-800 space-y-1">
                <span className="font-bold text-neutral-900 block text-xs uppercase tracking-wider text-emerald-800">
                  When to Choose Which Approach:
                </span>
                <p className="leading-relaxed text-neutral-700">
                  {article.alternativeMethod.whenToChooseThis}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 7. EDGE CASES WHERE THE OBVIOUS SOLUTION FAILS */}
        {article.edgeCases && article.edgeCases.length > 0 && (
          <section id="edge-cases" className="space-y-4 pt-6 border-t border-neutral-200">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Edge Cases Where the Obvious Solution Fails
            </h2>
            <p className="text-base text-neutral-700">
              Standard automated techniques often break down when encountering these tricky real-world scenarios:
            </p>

            <div className="grid grid-cols-1 gap-4 pt-2">
              {article.edgeCases.map((ec, ecIdx) => (
                <div
                  key={ecIdx}
                  className="p-5 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2 shadow-2xs"
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900">
                        Scenario: {ec.scenario}
                      </h4>
                      <p className="text-xs sm:text-sm text-amber-950 mt-1">
                        <strong className="font-semibold text-amber-900">Why simple automation fails:</strong>{' '}
                        {ec.whyItFails}
                      </p>
                      <p className="text-xs sm:text-sm text-emerald-900 mt-1.5 pt-1.5 border-t border-amber-200/60">
                        <strong className="font-semibold text-emerald-800">Correct handling:</strong>{' '}
                        {ec.howToFix}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. WHEN NOT TO USE AUTOMATED TOOLS */}
        {article.whenNotToUse && article.whenNotToUse.length > 0 && (
          <section id="when-not-to-use" className="space-y-4 pt-6 border-t border-neutral-200">
            <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-900 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-rose-700" />
                <span>Critical Precautions: When NOT to Use Automated Tools</span>
              </div>
              <p className="text-xs sm:text-sm text-rose-950 leading-relaxed">
                Automated regex or batch string replacements are dangerous in certain data contexts. Never run blind automated transformations in these situations:
              </p>

              <div className="space-y-3">
                {article.whenNotToUse.map((wnt, wIdx) => (
                  <div key={wIdx} className="p-4 rounded-xl bg-white border border-rose-200/80 space-y-1.5 text-xs sm:text-sm">
                    <h5 className="font-bold text-neutral-900">
                      Do not automate: {wnt.scenario}
                    </h5>
                    <p className="text-rose-900">
                      <strong className="font-semibold">Risk:</strong> {wnt.reason}
                    </p>
                    <p className="text-neutral-700">
                      <strong className="font-semibold text-emerald-800">Recommended approach:</strong> {wnt.alternativeRecommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 9. COMMON MISTAKES SECTION */}
        {article.commonMistakes && article.commonMistakes.length > 0 && (
          <section id="common-mistakes" className="space-y-4 pt-6 border-t border-neutral-200">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Common Mistakes to Avoid
            </h2>
            <p className="text-base text-neutral-700">
              When working through this workflow, watch out for these frequent missteps:
            </p>

            <div className="space-y-3 pt-2">
              {article.commonMistakes.map((item, mIndex) => (
                <div
                  key={mIndex}
                  className="p-4 sm:p-5 rounded-xl border border-neutral-200 bg-white space-y-2 shadow-2xs"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900">
                        Mistake: {item.mistake}
                      </h4>
                      <p className="text-xs sm:text-sm text-rose-800 mt-1">
                        <strong className="font-medium">Consequence:</strong> {item.consequence}
                      </p>
                      <p className="text-xs sm:text-sm text-emerald-800 mt-1">
                        <strong className="font-medium">Safe Solution:</strong> {item.solution}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 10. VERIFICATION METHOD & QUALITY INSPECTION */}
        {article.verificationMethod && (
          <section id="verification-method" className="space-y-4 pt-6 border-t border-neutral-200">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              How to Verify Your Results
            </h2>
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4 shadow-2xs">
              <h3 className="text-base font-bold text-neutral-900">
                {article.verificationMethod.title}
              </h3>

              <div className="space-y-2">
                <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
                  Verification Steps:
                </span>
                <ul className="space-y-2">
                  {article.verificationMethod.steps.map((vStep, vIdx) => (
                    <li key={vIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{vStep}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-700 space-y-1">
                <span className="font-bold text-neutral-900 block text-[11px] uppercase tracking-wider">
                  Quality Assurance Check:
                </span>
                <p className="leading-relaxed">{article.verificationMethod.sampleCheck}</p>
              </div>
            </div>
          </section>
        )}

        {/* 11. PRACTICAL CHECKLIST */}
        {article.checklist && article.checklist.length > 0 && (
          <section id="practical-checklist" className="space-y-4 pt-6 border-t border-neutral-200">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Practical Step-by-Step Checklist
            </h2>
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
              {article.checklist.map((item, cIndex) => (
                <div key={cIndex} className="flex items-start gap-3 text-sm text-neutral-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 12. PRIVACY & LOCAL PROCESSING ASSURANCE */}
        <section id="security-assurance" className="p-5 rounded-2xl bg-neutral-100 border border-neutral-200 text-xs sm:text-sm text-neutral-700 space-y-2">
          <div className="flex items-center gap-2 font-bold text-neutral-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Data Privacy & Client-Side Execution Guarantee</span>
          </div>
          <p className="leading-relaxed text-neutral-600">
            {article.privacyGuidance ||
              'When executing the steps in this guide using Money Master Blog tools, all text operations take place entirely inside your web browser’s local memory. No text, names, emails, numbers, or documents are ever sent to, logged by, or stored on external servers.'}
          </p>
        </section>

        {/* 13. DETAILED FAQS ACCORDION */}
        <div id="article-faqs">
          <FaqSection
            title={`Frequently Asked Questions About ${article.title}`}
            subtitle="Answers to common practical questions, edge cases, and troubleshooting steps."
            items={article.faqs}
          />
        </div>
      </div>

      {/* 10. PREVIOUS / NEXT ARTICLE NAVIGATION */}
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

      {/* 11. RELATED GUIDES */}
      <section id="related-guides" className="max-w-4xl pt-8 border-t border-neutral-200 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
              Related Practical Guides
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Explore more actionable guides in {article.category} and related productivity topics.
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
                className="p-5 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between cursor-pointer group text-left block"
              >
                <div className="space-y-2.5">
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
    </article>
  );
}
