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
              <strong className="block text-neutral-900 text-xs uppercase tracking-wider mb-1">Loan &amp; Interest Payment Calculators</strong>
              <p className="text-xs text-neutral-600">
                Any financial numbers, loan principal values, interest percentages, or terms entered into our calculators are processed locally in your browser memory. No financial figures are ever sent to external databases or recorded on servers.
              </p>
            </div>
            <div className="p-3.5 rounded-lg border border-neutral-200 bg-white">
              <strong className="block text-neutral-900 text-xs uppercase tracking-wider mb-1">Percentage &amp; Tax Calculators</strong>
              <p className="text-xs text-neutral-600">
                Tax brackets, GST breakdowns, percentage differences, and tip calculations execute instantaneously on your device processor using deterministic client-side JavaScript.
              </p>
            </div>
            <div className="p-3.5 rounded-lg border border-neutral-200 bg-white">
              <strong className="block text-neutral-900 text-xs uppercase tracking-wider mb-1">Text &amp; String Formatting Utilities</strong>
              <p className="text-xs text-neutral-600">
                Text cleaning, case conversion, URL decoding, and string transformations take place in memory without saving, indexing, or feeding text to machine learning models.
              </p>
            </div>
            <div className="p-3.5 rounded-lg border border-neutral-200 bg-white">
              <strong className="block text-neutral-900 text-xs uppercase tracking-wider mb-1">Date &amp; Age Calculation Tools</strong>
              <p className="text-xs text-neutral-600">
                Calendar dates, birthdays, and time interval comparisons are calculated purely via client JavaScript date engines without network telemetry.
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
          <h2 className="text-lg font-bold text-neutral-900 mb-2">4. Cookies and Advertising Policy (Google AdSense &amp; Third-Party Partners)</h2>
          <p>
            Money Master Blog works with third-party advertising partners, including <strong>Google AdSense</strong>, to serve relevant advertisements to our visitors. In accordance with Google Publisher Policies, we disclose the following practices:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-neutral-600">
            <li>
              <strong>Third-Party Vendor Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites on the internet.
            </li>
            <li>
              <strong>Google DoubleClick DART Cookie:</strong> Google's use of advertising cookies enables it and its partners to serve ads to users based on their visits to Money Master Blog and other sites across the internet.
            </li>
            <li>
              <strong>Opt-Out of Personalized Advertising:</strong> Users may opt out of personalized advertising at any time by visiting Google's <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-medium">Google Ads Settings</a>. Alternatively, users can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-medium">aboutads.info</a> or the <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-medium">Network Advertising Initiative Opt-Out</a>.
            </li>
            <li>
              <strong>First-Party Functional Storage:</strong> We use your browser's native <code>localStorage</code> strictly to remember non-sensitive interface preferences (such as tool inputs or calculator presets). This functional data stays strictly on your own device and can be cleared at any time in your browser settings.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">5. European Economic Area (EEA) &amp; UK User Rights (GDPR Compliance)</h2>
          <p>
            If you reside in the European Economic Area (EEA) or the United Kingdom, you have rights under the General Data Protection Regulation (GDPR), including the right to access, rectify, or erase any personal information we process. Because our calculation tools execute client-side and do not require user accounts, Money Master Blog does not collect or hold identifying profile records. For any consent choices or data privacy requests, you can contact our privacy controller directly at <a href="mailto:subhanrajput1708@gmail.com" className="text-emerald-700 underline font-medium">subhanrajput1708@gmail.com</a>.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">6. California Consumer Privacy Rights (CCPA / CPRA Compliance)</h2>
          <p>
            Under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA), California residents are entitled to specific disclosures regarding personal information:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-neutral-600">
            <li><strong>No Sale of Personal Data:</strong> Money Master Blog does not sell, rent, or trade your personal information.</li>
            <li><strong>Right to Know &amp; Delete:</strong> You have the right to request disclosure of information collected and request its deletion.</li>
            <li><strong>Non-Discrimination:</strong> We do not discriminate against users who exercise their statutory privacy rights; all 25 tools and 20 guides remain 100% accessible to every visitor.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">7. Blog Section & Educational Guides Privacy</h2>
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
          <h2 className="text-lg font-bold text-neutral-900 mb-2">8. Children's Online Privacy Protection (COPPA)</h2>
          <p>
            Money Master Blog provides general educational financial guides and browser utility tools suitable for students, researchers, and consumers. We do not knowingly collect personal identifiable information from children under the age of 13.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">9. Changes to this Policy</h2>
          <p>
            If we introduce new utilities, update advertising partners, or adjust data handling procedures, this document will be updated with an amended "Last updated" date. Continued use of the website indicates acceptance of the updated policy.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">10. Contact Information & Data Controller</h2>
          <p>
            If you have questions regarding this Privacy Policy, our AdSense integration, or cookie preferences, you can reach out directly to author and operator Shahid Ali:
          </p>
          <div className="mt-2.5 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-xs sm:text-sm font-medium text-neutral-900 space-y-1">
            <div><strong>Publisher &amp; Data Controller:</strong> Shahid Ali</div>
            <div><strong>Email:</strong> <a href="mailto:subhanrajput1708@gmail.com" className="text-emerald-700 underline font-semibold">subhanrajput1708@gmail.com</a></div>
            <div><strong>Website:</strong> https://www.moneymasterblog.site</div>
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
