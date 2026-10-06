import React from 'react';
import {
  AlertCircle,
  Shield,
  Info,
  CheckCircle2,
  FileText,
  Lock,
  Palette,
  Terminal,
  Calculator,
  BookOpen,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import FaqSection, { FaqItem } from '../common/FaqSection';
import { PageId } from '../../types';

interface DisclaimerPageProps {
  onNavigate?: (page: PageId) => void;
}

export default function DisclaimerPage({ onNavigate }: DisclaimerPageProps) {
  const disclaimerFaqs: FaqItem[] = [
    {
      question: 'Does Money Master Blog provide certified legal, financial, or investment advice?',
      answer:
        'No. Money Master Blog provides practical personal finance guides and browser-based calculators for educational and informational planning purposes only. None of the articles, tools, calculations, or explanations constitute certified financial advice, investment advisory services, legal counsel, loan underwriting, or official tax preparation. Because individual credit profiles, statutory tax laws, and lender terms vary widely, readers should always verify loan agreements and important financial decisions directly with authorized providers or licensed financial advisors.',
    },
    {
      question: 'How accurate are the Loan Payment and Interest Calculators?',
      answer:
        'Our financial calculators use standard mathematical amortization and compound interest formulas. However, actual loan terms offered by commercial banks and lenders may include specific day-count conventions (e.g., actual/365 vs. 30/360), tiered credit spreads, mandatory origination fee structures, insurance riders, and localized statutory taxes that can slightly alter final monthly figures.',
    },
    {
      question: 'Can I rely on the GST and Tax Calculator for official tax filing?',
      answer:
        'Our tax calculators are designed for rapid estimations and retail receipt verification. They do not replace formal accounting or certified tax advisory. Statutory tax laws, exemptions, deductions, and cross-border tariffs change frequently, so always consult a registered tax professional or your local revenue authority for official filings.',
    },
    {
      question: 'Are the tutorial formulas and spreadsheet workflows guaranteed for all financial scenarios?',
      answer:
        'Our 20 comprehensive practical guides feature standard, well-tested spreadsheet formulas (Google Sheets, Microsoft 365, LibreOffice Calc) and established arithmetic methods. However, macroeconomic conditions, localized inflation rates, and personal risk tolerances will vary. We advise using the guides as structured analytical frameworks rather than financial guarantees.',
    },
    {
      question: 'Does Money Master Blog provide certified legal, financial, or investment advice?',
      answer:
        'No. Money Master Blog provides practical personal finance guides and browser-based calculators for educational and informational planning purposes only. None of the articles, tools, calculations, or explanations constitute certified financial advice, investment advisory services, legal counsel, loan underwriting, or official tax preparation. Because individual credit profiles, statutory tax laws, and lender terms vary widely, readers should always verify loan agreements and important financial decisions directly with authorized providers or licensed financial advisors.',
    },
    {
      question: 'Does the Color Palette Generator provide official WCAG 2.1 AA/AAA compliance certification?',
      answer:
        'No. While our color generator presents mathematical relative luminance contrast calculations (e.g., 4.5:1 for normal body text and 3:1 for large display text), an official Web Content Accessibility Guidelines (WCAG) audit necessitates holistic evaluation of interactive focus outlines, typography sizing, text weight, responsive layout reflow, and assistive technology (screen reader) testing.',
    },
    {
      question: 'Are the tutorial formulas, spreadsheet workflows, and regex patterns in the Blog guaranteed for all software?',
      answer:
        'Our 20 comprehensive practical guides feature standard, well-tested spreadsheet formulas (Google Sheets, Microsoft 365, LibreOffice Calc) and established browser behavior. However, software suite version updates, localized regional decimal settings (comma decimal vs dot decimal in European locales), and enterprise administrative restrictions may impact execution. We always advise testing formulas and regex replacements on a duplicate backup copy of your dataset first.',
    },
    {
      question: 'Can third-party browser extensions or user-scripts alter the tool outputs?',
      answer:
        'Yes. Aggressive client-side browser extensions (such as automatic grammar correctors, translation plug-ins, custom CSS injects, or ad-blocking scripts) have permission to intercept the browser DOM and modify input/output text areas. If you experience an unexpected formatting glitch, test the page in an incognito or private browsing window without active extensions to identify third-party interference.',
    },
    {
      question: 'Are there any hidden API calls or server logs capturing my sensitive input text?',
      answer:
        'No. All 25 tools operate client-side inside your local browser memory using JavaScript and HTML5. Your text, passwords, datasets, and calculations are processed directly in your browser. Once you close or refresh the browser tab, memory is cleared by your browser engine.',
    },
    {
      question: 'What is the procedure for reporting an algorithmic discrepancy or suggesting a correction?',
      answer:
        'Website author Shahid Ali personally investigates all reported discrepancies, edge cases, and feature requests. Please reach out through our Contact Us page or write directly to contact@moneymasterblog.com with your browser version, sample input, and observed output.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-12">
      {/* Header Section */}
      <div className="border-b border-neutral-200 pb-8">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-xs font-semibold mb-3">
          <Shield className="w-3.5 h-3.5 text-neutral-600" />
          <span>Operational Transparency & Boundaries</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Website & Tool Disclaimer
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          Last revised: September 2026 • Published by Shahid Ali • Practitioner with 7 years of practical digital workflow experience
        </p>
      </div>

      {/* Primary Notice Banner */}
      <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex flex-col sm:flex-row items-start gap-4 shadow-xs">
        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 text-sm text-neutral-800 leading-relaxed">
          <h3 className="font-bold text-neutral-900 text-base">
            General Informational & Productivity Notice
          </h3>
          <p>
            The software utilities, calculations, color models, placeholder generators, and 20 educational guides provided across <strong>Money Master Blog</strong> are engineered strictly for everyday productivity, content drafting, design prototyping, and educational workflows. They are provided on an <em>"as is"</em> and <em>"as available"</em> basis without warranties of infallibility or commercial fitness for high-consequence environments.
          </p>
        </div>
      </div>

      {/* Comprehensive Sections Breakdown */}
      <div className="space-y-10 text-neutral-700 text-sm leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-100">
            <span className="w-7 h-7 rounded-lg bg-neutral-900 text-white text-xs font-bold flex items-center justify-center">
              01
            </span>
            <h2 className="text-xl font-bold text-neutral-900">
              No Exaggerated Guarantees or Professional Certifications
            </h2>
          </div>
          <p>
            Money Master Blog rejects deceptive marketing claims. We do not represent our utilities as "the world's most infallible software", nor do we claim government authorization, corporate standard-body accreditation, or official ISO compliance.
          </p>
          <p>
            Creator <strong>Shahid Ali</strong> designs, inspects, and maintains each tool and educational guide drawing upon 7 years of practical hands-on experience in content writing, digital troubleshooting, and web operations. Our commitment is focused on honest, transparent utility: delivering lightweight, zero-latency, client-side tools that make everyday digital work faster, simpler, and completely private.
          </p>
        </section>

        {/* Section 2: Tool-Specific Operational Limitations */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-100">
            <span className="w-7 h-7 rounded-lg bg-neutral-900 text-white text-xs font-bold flex items-center justify-center">
              02
            </span>
            <h2 className="text-xl font-bold text-neutral-900">
              Tool-Specific Technical Boundaries & Explanations
            </h2>
          </div>
          <p>
            Because our utilities execute locally inside your web browser without server-side processing, specific algorithmic and hardware boundaries apply to each category:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Tool 1 */}
            <div className="p-5 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs uppercase tracking-wider">
                <Palette className="w-4 h-4 text-purple-600" />
                <span>Color Palette & Contrast Tools</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Color rendering on consumer computer screens and mobile displays is governed by physical monitor panel construction (OLED, IPS, VA), factory calibration, operating system color profiles (sRGB, Display P3), and ambient display filters (True Tone, Night Light). While our HEX, RGB, and HSL mathematical values are exact, visual perception will shift across different hardware screens. For industrial print runs or strict corporate brand guides, physical swatch guides (such as Pantone) and certified hard proofs are mandatory.
              </p>
            </div>

            {/* Tool 2 */}
            <div className="p-5 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs uppercase tracking-wider">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Text Cleaners, Converters & Counters</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Word processors (Microsoft Word, Google Docs, Apple Pages, Scrivener) and academic compilers (LaTeX) employ differing internal tokenization rules for compound words, em-dashes, apostrophes, and non-breaking spaces. The word, character, and sentence counts on Money Master Blog use standard international Unicode whitespace separation. They serve as reliable approximations for drafting and content quotas rather than legal word-audit guarantees.
              </p>
            </div>

            {/* Tool 3 */}
            <div className="p-5 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs uppercase tracking-wider">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>Password Generator & Security State</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Our password generator utilizes browser-native Cryptographically Secure Pseudo-Random Number Generation (<code>window.crypto.getRandomValues</code>) to ensure high statistical entropy. However, real-world account protection also requires server-side credential encryption, unique non-reused passphrases, two-factor authentication (2FA), and safeguarding devices against keyloggers and malware. Money Master Blog cannot guarantee against compromised third-party accounts.
              </p>
            </div>

            {/* Tool 4 */}
            <div className="p-5 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs uppercase tracking-wider">
                <Terminal className="w-4 h-4 text-amber-600" />
                <span>Placeholder Text (Lorem Ipsum)</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Passages created by our Lorem Ipsum generator are intentionally scrambled pseudo-Latin text modeled on classical treatises by Cicero. They carry zero semantic, factual, or linguistic meaning. Their sole function is to facilitate graphic design, typography testing, and wireframe structural layout. They must never be published as legitimate editorial or commercial copy.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Blog & Educational Guides */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-100">
            <span className="w-7 h-7 rounded-lg bg-neutral-900 text-white text-xs font-bold flex items-center justify-center">
              03
            </span>
            <h2 className="text-xl font-bold text-neutral-900">
              Blog Articles, Educational Tutorials & Formula Guidelines
            </h2>
          </div>
          <p>
            Money Master Blog publishes 20 comprehensive educational guides addressing practical computer troubleshooting, text sanitization, spreadsheet formula preparation, and digital typography. Readers should note the following operational guidelines:
          </p>
          <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3">
            <div className="flex items-start gap-2.5 text-xs text-neutral-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Spreadsheet Environment Variations:</strong> Formulas (such as <code>TRIM</code>, <code>SUBSTITUTE</code>, <code>TEXTSPLIT</code>, and <code>REGEXREPLACE</code>) are verified in current editions of Google Sheets and Microsoft Excel (365). Differences between desktop standalone licenses, regional language syntax (e.g. semicolon vs comma parameter separators in Europe), or enterprise macros may require minor local adjustments.</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-neutral-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Mandatory Backup Recommendation:</strong> Before executing batch bulk replaces, spreadsheet formula sweeps, deduplication scripts, or CSV formatting adjustments based on our guides, users should always save an unaltered archival copy of their original master file.</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-neutral-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>No Professional Agency Warranty:</strong> While the articles reflect 7 years of hands-on digital troubleshooting by Shahid Ali, they are intended for educational and productivity empowerment and do not constitute contractually guaranteed enterprise software engineering or data recovery consulting.</span>
            </div>
          </div>
        </section>

        {/* Section 4: Absence of Legal, Financial, or Medical Counsel */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-100">
            <span className="w-7 h-7 rounded-lg bg-neutral-900 text-white text-xs font-bold flex items-center justify-center">
              04
            </span>
            <h2 className="text-xl font-bold text-neutral-900">
              Absence of Legal, Financial, Medical, or Specialized Advice
            </h2>
          </div>
          <p>
            Content, commentary, and calculator outputs found on this site must not be interpreted as:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-neutral-600 text-xs sm:text-sm">
            <li><strong>Financial or Investment Counsel:</strong> The historical brand name "Money Master Blog" represents our commitment to saving users time and boosting digital efficiency. It does not provide certified financial planning, stock market advice, banking recommendations, or tax accounting services.</li>
            <li><strong>Legal or Contractual Guidance:</strong> Our text tools, case converters, and terms generators are not substitute instruments for certified legal counsel or formal contract drafting.</li>
            <li><strong>Medical or Health Information:</strong> Nothing on this domain constitutes health guidance or professional physiological counsel.</li>
          </ul>
        </section>

        {/* Section 5: Browser Environment & Third-Party Interference */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-100">
            <span className="w-7 h-7 rounded-lg bg-neutral-900 text-white text-xs font-bold flex items-center justify-center">
              05
            </span>
            <h2 className="text-xl font-bold text-neutral-900">
              Local Browser Execution & Extension Interference
            </h2>
          </div>
          <p>
            Because Money Master Blog operates client-side inside the user's browser runtime, performance and output fidelity are subject to the local operating environment:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-600 text-xs sm:text-sm">
            <li>Third-party extensions, automated grammar checkers, inline spellcheckers, and translation add-ons can modify text fields and interfere with copy-paste actions.</li>
            <li>Outdated browser engines lacking current JavaScript standard support (ECMAScript 6+, Canvas API, Web Crypto) may exhibit degraded functionality.</li>
            <li>Memory limitations on mobile hardware or devices running low available RAM may impact processing speed when handling massive text files.</li>
          </ul>
        </section>

        {/* Section 6: User Verification Obligation */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-100">
            <span className="w-7 h-7 rounded-lg bg-neutral-900 text-white text-xs font-bold flex items-center justify-center">
              06
            </span>
            <h2 className="text-xl font-bold text-neutral-900">
              User Responsibility for Verification & Independent Audit
            </h2>
          </div>
          <p>
            By using Money Master Blog, you acknowledge that you retain sole responsibility for reviewing, proofreading, and verifying the accuracy and appropriateness of any generated text, calculated counts, formatted data, or generated color codes before submitting them for formal academic, publishing, or commercial purposes.
          </p>
        </section>

        {/* Section 7: Discrepancy Reporting & Direct Author Contact */}
        <section className="p-6 rounded-2xl bg-neutral-100 border border-neutral-200/80 space-y-3">
          <div className="flex items-center gap-2 text-neutral-900 font-bold">
            <HelpCircle className="w-4 h-4 text-neutral-700" />
            <h3 className="text-base font-bold">07. Reporting Inaccuracies & Continuous Verification</h3>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            We value community feedback and continuous improvement. If you discover an algorithmic edge case, character counter discrepancy, or typographical error in any tool or guide, we encourage you to notify author <strong>Shahid Ali</strong> directly:
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 text-xs text-neutral-800">
            <div>
              <span>Official Inquiries: </span>
              <a href="mailto:contact@moneymasterblog.com" className="font-semibold text-neutral-900 underline hover:text-blue-600">
                contact@moneymasterblog.com
              </a>
            </div>
            {onNavigate && (
              <button
                onClick={() => onNavigate('contact')}
                className="px-4 py-2 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Open Contact Form &rarr;
              </button>
            )}
          </div>
        </section>
      </div>

      {/* Detailed FAQ Section */}
      <FaqSection
        id="disclaimer-faq"
        title="Frequently Asked Questions About Accuracy, Scope & Hardware"
        subtitle="In-depth answers addressing monitor calibration shifts, tokenization variations, cryptographic entropy, and client-side guarantees."
        items={disclaimerFaqs}
      />
    </div>
  );
}
