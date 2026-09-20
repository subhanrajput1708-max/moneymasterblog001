import React from 'react';
import { FileCheck, ShieldAlert, CheckCircle2 } from 'lucide-react';
import FaqSection, { FaqItem } from '../common/FaqSection';

export default function TermsPage() {
  const termsFaqs: FaqItem[] = [
    {
      question: 'Can I use generated color palettes and CSS snippets in commercial client projects?',
      answer:
        'Yes. You have full, unrestricted permission to use any color palette, HEX combination, or CSS variable snippet generated on Money Master Blog in commercial projects, freelance client work, paid mobile applications, and physical print designs with zero royalties.',
    },
    {
      question: 'Am I required to credit or link back to Money Master Blog when using formatted text?',
      answer:
        'No. Attribution is entirely optional. You are never obligated to include a backlink, logo, or mention of Money Master Blog or author Shahid Ali in your published books, articles, websites, or client deliverables.',
    },
    {
      question: 'Does Money Master Blog retain any intellectual property rights over text I clean or format?',
      answer:
        'No. You retain 100% ownership and copyright over your original text. Because our tools execute purely in your browser memory, Money Master Blog never acquires, claims, or stores any rights to your content.',
    },
    {
      question: 'Can I apply techniques, formulas, and workflows from the Blog guides in my commercial work?',
      answer:
        'Yes. You are completely free to adopt, implement, and integrate any workflow advice, Excel/Google Sheets formula, regex pattern, or text formatting technique explained in our 20 guides into your commercial businesses, client projects, or internal systems without paying licensing fees or royalties.',
    },
    {
      question: 'Can I repost or republish entire articles from the Blog on other websites?',
      answer:
        'No. The written editorial prose, explanations, and structure of the 20 guides are the copyrighted intellectual property of Shahid Ali and Money Master Blog. You are welcome to quote brief excerpts, reference our checklists, or link to our guides for educational commentary or review, provided proper credit and a direct link to the original article are given.',
    },
    {
      question: 'Are there daily usage limits or rate caps on the tools?',
      answer:
        'No. There are no artificial daily limits, quotas, or rate caps for human visitors. You can generate as many color combinations, clean as many draft passages, and create as many placeholder blocks as your workflow requires.',
    },
    {
      question: 'Can I use the tools for school assignments, universities, or academic teaching?',
      answer:
        'Yes. Educators, researchers, and students are welcome to use Money Master Blog for coursework, lecture demonstrations, typography testing, and writing assignments without restriction.',
    },
    {
      question: 'Can I run automated scraping scripts against the website?',
      answer:
        'No. Automated scraping, bulk denial-of-service pinging, or automated attempts to overload or disrupt the hosting infrastructure are strictly prohibited under our Terms of Use.',
    },
    {
      question: 'Can I mirror or re-host the website claiming official partnership with Shahid Ali?',
      answer:
        'No. You may not re-brand, clone, or mirror Money Master Blog in a deceptive manner that misrepresents website authorship or falsely implies corporate backing or official partnership.',
    },
    {
      question: 'Are these Terms and Conditions applicable internationally?',
      answer:
        'Yes. These terms govern the use of Money Master Blog by all visitors worldwide, regardless of geographical location or access device.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-10">
      <div className="border-b border-neutral-200 pb-8">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Legal & User Agreement
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
          Terms & Conditions
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          Effective Date: September 2026 • Published by Shahid Ali (7 years practical digital workflow experience)
        </p>
      </div>

      <div className="p-5 rounded-xl bg-neutral-100 border border-neutral-200 flex items-start gap-4">
        <FileCheck className="w-6 h-6 text-neutral-800 shrink-0 mt-1" />
        <div className="text-sm text-neutral-700 leading-relaxed">
          <strong className="text-neutral-900">Summary for Users:</strong> Money Master Blog provides free, client-side tools for your everyday productivity. You retain complete ownership of all content, color schemes, and texts you create or format using these tools. No licensing fees or attribution required.
        </div>
      </div>

      <div className="space-y-6 text-neutral-700 text-sm leading-relaxed">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">1. Agreement to Terms</h2>
          <p>
            By accessing and using Money Master Blog (including all associated pages and browser utilities), you acknowledge that you have read, understood, and agreed to be bound by these Terms & Conditions. If you do not agree with these provisions, please discontinue use of the website.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">2. Permitted Use & Ownership of Outputs</h2>
          <p>
            Money Master Blog provides browser-based utilities for designers, writers, developers, students, bloggers, and everyday users. You are granted a worldwide, royalty-free, non-exclusive right to use the site and its outputs:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-neutral-600">
            <li><strong>Commercial & Client Projects:</strong> You may freely use generated color schemes, formatted text strings, CSS snippets, and placeholder content in client deliverables, published books, software applications, and commercial media.</li>
            <li><strong>No Attribution Required:</strong> While we appreciate mentions or bookmarks, you are never required to credit Money Master Blog or Shahid Ali on your generated designs or formatted articles.</li>
            <li><strong>Personal & Educational Use:</strong> You may use our tools for academic study, classroom demonstrations, homework, and personal workflows without restriction.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">3. Blog Guides, Practical Tutorials & Intellectual Property</h2>
          <p>
            Money Master Blog features 20 comprehensive educational guides addressing practical data preparation, typography rules, spreadsheet sanitization, and text formatting:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-neutral-600">
            <li><strong>Implementation of Techniques:</strong> You are granted full permission to implement, teach, adapt, and run any formulas, regex snippets, or procedural steps explained in the articles within your daily work and commercial pipelines without licensing costs.</li>
            <li><strong>Editorial Copyright:</strong> The original written prose, organization, and explanations within all 20 guides are protected by copyright law and authored by Shahid Ali. Automated wholesale scraping, mass republishing, or claiming authorship of our complete articles is strictly prohibited.</li>
            <li><strong>Fair Use Citations:</strong> Educators, journalists, and bloggers may quote short excerpts or refer to our problem-solving checklists provided appropriate credit and a live link to the original Money Master Blog article are included.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">4. Prohibited Conduct</h2>
          <p>
            When utilizing Money Master Blog, you agree not to:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-neutral-600">
            <li>Attempt to disrupt, overload, or impair the website's infrastructure through automated scraping scripts, denial-of-service (DDoS) attacks, or malicious payloads.</li>
            <li>Re-host or mirror the website in a deceptive manner that misrepresents authorship or falsely claims official endorsement by Shahid Ali.</li>
            <li>Use the tools for unlawful activities or to facilitate malicious spam campaigns.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">5. Disclaimer of Warranties</h2>
          <p>
            Money Master Blog is provided strictly on an "as is" and "as available" basis without warranties of any kind, whether express or implied. While creator Shahid Ali maintains these utilities with care drawing from 7 years of practical experience in digital content and web workflows, we do not warrant that all functions will be uninterrupted, totally error-free, or compatible with obsolete legacy browser engines.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">6. Limitation of Liability</h2>
          <p>
            In no event shall Money Master Blog or its creator, Shahid Ali, be held liable for any direct, indirect, incidental, or consequential damages resulting from the use of, or inability to use, any tool, guide, or calculated output on this site.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">7. Modifications to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms & Conditions as new tools or articles are added. Any updates become effective immediately upon posting to this page.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-2">8. Inquiries & Contact</h2>
          <p>
            For questions regarding these Terms, please reach out via our Contact Us form or directly by email at <code>contact@moneymasterblog.com</code>.
          </p>
        </div>
      </div>

      {/* Terms Page Specific FAQ */}
      <FaqSection
        id="terms-faq"
        title="Frequently Asked Questions About Terms & Usage Rights"
        subtitle="Clarifications regarding commercial deliverables, client rights, licensing, and fair use."
        items={termsFaqs}
      />
    </div>
  );
}
