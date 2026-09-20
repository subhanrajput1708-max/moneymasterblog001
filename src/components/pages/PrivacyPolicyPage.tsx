import React from 'react';
import { ShieldCheck, Lock, EyeOff, Server, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import FaqSection, { FaqItem } from '../common/FaqSection';

export default function PrivacyPolicyPage() {
  const privacyFaqs: FaqItem[] = [
    {
      question: 'Is my input text ever uploaded to a remote database or cloud server?',
      answer:
        'No. When you paste text into our Text Cleaner or Word Counter, all transformations, whitespace stripping, and metrics calculations take place exclusively inside your device’s browser memory via client-side JavaScript. No text is ever uploaded to a remote server or database.',
    },
    {
      question: 'Does Money Master Blog use tracking cookies to follow me across other websites?',
      answer:
        'No. We do not use third-party behavioral tracking cookies, cross-site analytics pixels, or advertising identifiers. Any local storage used by the site is strictly functional—such as remembering tool preference states on your device.',
    },
    {
      question: 'Does Money Master Blog use or train AI models on the text I paste?',
      answer:
        'No. Your text is never used to train artificial intelligence models, nor is it fed into external machine learning APIs. Text cleaning and formatting rely on straightforward deterministic JavaScript algorithms executing locally.',
    },
    {
      question: 'Can Money Master Blog or Shahid Ali see the passwords generated with the Password Generator?',
      answer:
        'No. The password generator uses your browser\'s native Web Cryptography API (`window.crypto.getRandomValues`). The generated random string exists exclusively in your browser\'s temporary local memory and is never logged or transmitted over any network.',
    },
    {
      question: 'What happens to my working text and color palettes when I close the browser tab?',
      answer:
        'Because data is held in temporary browser memory (state), closing your browser tab or refreshing the page immediately clears any text you were working on. Money Master Blog does not retain drafts after your session ends.',
    },
    {
      question: 'Who has access to the information I submit via the contact form?',
      answer:
        'Only website author Shahid Ali. Information submitted through our contact form (your name, email address, and message) is used solely to respond to your inquiry and is never shared, rented, or sold to third-party marketing lists.',
    },
    {
      question: 'Does Money Master Blog track which articles or guides I read in the Blog section?',
      answer:
        'No. Reading articles and guides on Money Master Blog is completely anonymous. We do not track your reading habits, monitor which paragraphs you view, require user accounts, or maintain reading profiles. All 20 articles are statically delivered HTML/JS without behavioral analytics or third-party comment tracking scripts.',
    },
    {
      question: 'Are code examples, regex patterns, and spreadsheet formulas in the Blog safe?',
      answer:
        'Yes. All examples, formulas, and cleaning techniques published across our 20 guides are completely open, transparent, and execute either directly inside your spreadsheet program (Excel, Google Sheets) or within our client-side browser tools without sending data over external networks.',
    },
    {
      question: 'What information is recorded in server access logs?',
      answer:
        'Like virtually all websites on the internet, our hosting infrastructure automatically logs basic technical request metadata (such as IP address, user-agent string, requested resource URL, and timestamp). These logs are used solely for security diagnostics, preventing DDoS attacks, and server uptime monitoring.',
    },
    {
      question: 'How can I independently verify that your tools run client-side?',
      answer:
        'You can open your browser\'s Developer Tools (F12 or right-click -> Inspect), navigate to the "Network" tab, and perform actions in the tools (e.g. generating a palette, cleaning text, or creating placeholder paragraphs). You will observe zero HTTP network requests being sent during these calculations.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-10">
      <div className="border-b border-neutral-200 pb-8">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Legal & Transparency
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          Last updated: September 2026 • Published by Shahid Ali (7 years practical digital workflow experience)
        </p>
      </div>

      {/* Summary Box */}
      <div className="p-5 rounded-xl bg-neutral-100 border border-neutral-200 flex items-start gap-4">
        <ShieldCheck className="w-6 h-6 text-neutral-800 shrink-0 mt-1" />
        <div className="text-sm text-neutral-700 leading-relaxed">
          <strong className="text-neutral-900">Privacy-First Commitment:</strong> Money Master Blog is built around an in-browser, client-side model. When you generate a color scheme, count words, clean copied text, or produce placeholder sentences, all calculations happen inside your device's browser memory. Your working text and generated values are never sent to our servers or stored in remote databases.
        </div>
      </div>

      <div className="space-y-8 text-neutral-700 text-sm leading-relaxed">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">1. In-Browser Tool Processing (No Data Harvesting)</h2>
          <p>
            Unlike many commercial utility websites that route your content to cloud servers for processing, our utilities are engineered to run entirely client-side:
          </p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-lg border border-neutral-200 bg-white">
              <strong className="block text-neutral-900 text-xs uppercase tracking-wider mb-1">Text Cleaner & Case Converter</strong>
              <p className="text-xs text-neutral-600">
                Any text pasted or typed into our editor is processed instantly in browser memory. It is never transmitted, saved, indexed, or used to train machine models.
              </p>
            </div>
            <div className="p-3.5 rounded-lg border border-neutral-200 bg-white">
              <strong className="block text-neutral-900 text-xs uppercase tracking-wider mb-1">Random Password Generator</strong>
              <p className="text-xs text-neutral-600">
                Passwords are created using <code>window.crypto.getRandomValues()</code> on your own processor. The generated credentials exist solely in your temporary browser state.
              </p>
            </div>
            <div className="p-3.5 rounded-lg border border-neutral-200 bg-white">
              <strong className="block text-neutral-900 text-xs uppercase tracking-wider mb-1">Color Palette Generator</strong>
              <p className="text-xs text-neutral-600">
                Color combinations, HSL/HEX conversions, and luminance checks are calculated locally. No palette designs or project assets are uploaded.
              </p>
            </div>
            <div className="p-3.5 rounded-lg border border-neutral-200 bg-white">
              <strong className="block text-neutral-900 text-xs uppercase tracking-wider mb-1">Placeholder Text Generator</strong>
              <p className="text-xs text-neutral-600">
                Lorem Ipsum paragraphs and sentences are assembled dynamically in client memory from standard Latin root dictionaries.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">2. Information You Voluntarily Provide</h2>
          <p>
            If you choose to communicate with Shahid Ali through our Contact Us page, you voluntarily submit your name, email address, inquiry topic, and message text. This information is utilized solely to:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-neutral-600">
            <li>Read, evaluate, and provide a direct reply to your feedback or inquiry.</li>
            <li>Investigate any reported tool bugs, browser layout anomalies, or calculation errors.</li>
          </ul>
          <p className="mt-2 text-neutral-600">
            We never rent, sell, monetize, or trade your email address or personal details to any marketing networks or third-party brokers.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">3. Server Logs & Hosting Telemetry</h2>
          <p>
            Like standard web hosts across the globe, our infrastructure servers automatically record standard HTTP server logs when a page asset is delivered to your browser. These logs may contain:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-neutral-600">
            <li>Internet Protocol (IP) address</li>
            <li>Browser type and operating system user-agent string</li>
            <li>Requested file paths and HTTP status codes</li>
            <li>Date and time stamps of asset requests</li>
          </ul>
          <p className="mt-2 text-neutral-600">
            These logs are used strictly by our cloud hosting infrastructure for security diagnostics, preventing distributed denial-of-service (DDoS) abuse, and maintaining site availability.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">4. Cookies and Local Storage Policy</h2>
          <p>
            Money Master Blog does not employ third-party behavioral advertising cookies, tracking pixels, or cross-site fingerprinting technologies.
          </p>
          <p className="mt-2 text-neutral-600">
            We may use your browser's native <code>localStorage</code> mechanism strictly to preserve non-sensitive interface preferences across reloads (for instance, remembering your selected tool tab or UI settings). This data remains exclusively on your own device and can be cleared at any time through your browser settings.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">5. Blog Section & Educational Guides Privacy</h2>
          <p>
            The Blog section on Money Master Blog provides 20 in-depth practical tutorials authored by Shahid Ali. We uphold strict reader privacy standards across all articles:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-neutral-600">
            <li><strong>Zero Reading Profiles:</strong> We do not monitor, log, or profile your reading habits, dwell time per section, or clicked tutorial links.</li>
            <li><strong>No Third-Party Comment Systems:</strong> We do not load external third-party comment widgets (such as Disqus, Facebook Comments, or tracking iframes) that secretly collect personal data or inject cross-site trackers.</li>
            <li><strong>No Gated Content:</strong> All 20 articles, practical workflow guides, code snippets, and troubleshooting checklists are fully open access without email capture forms, sign-in walls, or subscription nag screens.</li>
            <li><strong>Safe, Client-Side Demonstrations:</strong> Any interactive tool integrations linked within the articles run strictly on your local browser engine without server upload.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">6. Children's Online Privacy</h2>
          <p>
            Money Master Blog provides general utility tools for everyday digital tasks, suitable for students, writers, and designers of all ages. We do not knowingly collect personal identifiable information from children under the age of 13.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">7. Changes to this Policy</h2>
          <p>
            If we introduce new utilities or update existing data handling procedures, this document will be updated with an amended "Last updated" date. Continued use of the website indicates acceptance of the updated policy.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">8. Contact the Website Author</h2>
          <p>
            If you have questions regarding this Privacy Policy or our client-side computing architecture, you can contact author Shahid Ali directly at:
          </p>
          <div className="mt-2 p-3 bg-neutral-50 rounded-lg border border-neutral-200 inline-block text-xs sm:text-sm font-medium text-neutral-900">
            contact@moneymasterblog.com
          </div>
        </div>
      </div>

      {/* Privacy FAQ */}
      <FaqSection
        id="privacy-faq"
        title="Frequently Asked Questions About Data Privacy"
        subtitle="Detailed, straightforward answers regarding client-side processing, data security, and local storage."
        items={privacyFaqs}
      />
    </div>
  );
}
