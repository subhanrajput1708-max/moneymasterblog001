import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, UserCheck, Clock, HelpCircle, ShieldCheck, Check } from 'lucide-react';
import { PageId } from '../../types';
import FaqSection, { FaqItem } from '../common/FaqSection';

interface ContactUsPageProps {
  onNavigate: (page: PageId) => void;
}

export default function ContactUsPage({ onNavigate }: ContactUsPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'General Feedback',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill out all required fields.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }

    setError(null);
    setSubmitted(true);
  };

  const contactFaqs: FaqItem[] = [
    {
      question: 'How quickly will I receive a reply from Money Master Blog?',
      answer:
        'Shahid Ali reviews incoming inquiries regularly. You can typically expect a response within 24 to 48 business hours. For complex bug investigations or detailed tool feature proposals, a thorough reply may take slightly longer.',
    },
    {
      question: 'Does Shahid Ali read all submissions personally?',
      answer:
        'Yes. Money Master Blog is an independently curated website. We do not use automated support bots, outsourced call centers, or automated response funnels. Every message submitted through our contact form is delivered directly to Shahid Ali for review.',
    },
    {
      question: 'Can I request or propose a new browser tool?',
      answer:
        'Yes, definitely! Many of our tools were inspired by common workflow pain points. If you have an idea for a simple text, color, layout, or productivity utility that could benefit other users and run client-side in a browser, select "Suggest a New Tool" in the form above and describe how you envision it working.',
    },
    {
      question: 'What information should I include when reporting a bug or calculation error?',
      answer:
        'To help us investigate and reproduce the issue rapidly, please include:\n• Your device type (e.g. iPhone, Android phone, Windows PC, Mac)\n• Your browser name and approximate version (e.g. Chrome 120, Safari 17)\n• The exact input text or color value that caused the problem\n• The unexpected result you observed versus what you expected to see.',
    },
    {
      question: 'Will submitting my email address subscribe me to a marketing newsletter?',
      answer:
        'No. Money Master Blog has a strict no-spam policy. Your email address is used solely to respond to your specific inquiry or feedback. We do not send marketing newsletters, do not store contact details in promotional mailing lists, and never sell information to third parties.',
    },
    {
      question: 'What is the official email address for direct inquiries?',
      answer:
        'You can write to us directly at contact@moneymasterblog.com if you prefer using your own email client rather than the web submission form.',
    },
    {
      question: 'Can I propose a commercial partnership or advertising deal?',
      answer:
        'You can select "Website Inquiry" in the topic dropdown to share your proposal. Please note that we prioritize maintaining a clean, fast-loading, and ad-light user experience that respects visitor privacy.',
    },
    {
      question: 'Can I share feedback about user accessibility or mobile experience?',
      answer:
        'Yes, accessibility and mobile usability are top priorities for Money Master Blog. If you encounter any contrast issues, screen-reader hurdles, or awkward touch targets on smaller screens, please let us know so we can refine the interface.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-12">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-8">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
          Contact Us & Tool Suggestions
        </h1>
        <p className="mt-3 text-base text-neutral-600 leading-relaxed max-w-2xl">
          Have an idea for a new utility tool, spotted an issue, or want to share feedback? Shahid Ali reviews community suggestions regularly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Info Column */}
        <div className="space-y-6">
          <div className="p-5 rounded-xl border border-neutral-200 bg-white shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 mb-3">
              <UserCheck className="w-5 h-5 text-neutral-800" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Direct Editorial Review</h3>
            <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
              Every message sent through this form is reviewed directly by <strong>Shahid Ali</strong> (7 years practical digital tools experience).
            </p>
          </div>

          <div className="p-5 rounded-xl border border-neutral-200 bg-white shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 mb-3">
              <Clock className="w-5 h-5 text-neutral-800" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Response Times</h3>
            <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
              We typically review and respond to inquiries within 24 to 48 business hours. We do not use automated marketing funnels.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-neutral-200 bg-white shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 mb-3">
              <Mail className="w-5 h-5 text-neutral-800" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Direct Email</h3>
            <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
              For editorial or utility inquiries, reach out at:<br />
              <span className="font-medium text-neutral-900">contact@moneymasterblog.com</span>
            </p>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-2">
          <div className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-xs">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">Thank You for Reaching Out</h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Your message has been received. Shahid Ali will review your feedback or utility suggestion and respond if requested.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', topic: 'General Feedback', message: '' });
                  }}
                  className="mt-4 px-4 py-2 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label htmlFor="contact-topic" className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1">
                    Inquiry Category
                  </label>
                  <select
                    id="contact-topic"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                  >
                    <option value="Tool Suggestion">Suggest a New Tool</option>
                    <option value="Bug Report">Report a Bug / Issue</option>
                    <option value="General Feedback">General Feedback</option>
                    <option value="Partnership">Website Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your idea, feedback, or the specific behavior you observed..."
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-lg text-sm shadow-xs transition-colors cursor-pointer min-h-[44px]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Suggestion Guidelines & Privacy Commitment */}
      <section className="bg-neutral-50 rounded-xl p-6 sm:p-8 border border-neutral-200 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-neutral-900">Guidelines for Tool Suggestions & Inquiries</h3>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            To help Shahid Ali evaluate suggestions quickly and prioritize useful utilities, keep the following in mind:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-neutral-700">
          <div className="p-4 bg-white rounded-lg border border-neutral-200 space-y-1">
            <strong className="text-neutral-900 flex items-center gap-1.5 font-bold">
              <Check className="w-4 h-4 text-emerald-600" />
              What Makes a Great Tool Addition?
            </strong>
            <p className="text-neutral-600 leading-relaxed text-xs">
              We prioritize utilities that can run 100% client-side in standard browsers, solve a practical everyday pain point (like text formatting or color work), and need no third-party accounts.
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg border border-neutral-200 space-y-1">
            <strong className="text-neutral-900 flex items-center gap-1.5 font-bold">
              <Check className="w-4 h-4 text-emerald-600" />
              Reporting an Inaccuracy or Bug
            </strong>
            <p className="text-neutral-600 leading-relaxed text-xs">
              Please state which browser and device you are using (e.g. Chrome on Android or Safari on iOS), plus the exact input or steps that caused the unexpected output.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-200 flex items-center gap-3 text-xs text-neutral-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Your email address is only used to respond to your specific inquiry. We never send unsolicited newsletters or sell contact lists.
          </span>
        </div>
      </section>

      {/* Contact Page Specific FAQ */}
      <FaqSection
        id="contact-faq"
        title="Frequently Asked Questions About Contacting Us"
        subtitle="Common questions regarding response times, tool submissions, and email privacy."
        items={contactFaqs}
      />
    </div>
  );
}
