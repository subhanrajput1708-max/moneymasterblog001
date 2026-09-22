import React, { useState } from 'react';
import {
  Mail,
  Phone,
  PhoneCall,
  MessageCircle,
  Copy,
  Check,
  Send,
  CheckCircle2,
  UserCheck,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  AlertCircle,
  Globe,
  ExternalLink
} from 'lucide-react';
import { PageId } from '../../types';
import FaqSection, { FaqItem } from '../common/FaqSection';

interface ContactUsPageProps {
  onNavigate: (page: PageId) => void;
}

export default function ContactUsPage({ onNavigate }: ContactUsPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    priority: 'Normal (within 24-48 hours)',
    topic: 'Tool Suggestion',
    subject: '',
    message: '',
  });

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<string>('');

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill out your name, email, and message details.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Please provide a valid email or Gmail address.');
      return;
    }

    setError(null);
    const generatedId = 'MMB-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(generatedId);
    setSubmitted(true);
  };

  const contactFaqs: FaqItem[] = [
    {
      question: 'Can I call or WhatsApp the number 03678799545 directly for quick questions?',
      answer:
        'Yes! You can reach our support line at 03678799545 (international format: +92 367 8799545). It is active for both direct phone calls and WhatsApp messages between 9:00 AM and 7:00 PM (PKT/UTC+5), Monday through Saturday. For fast troubleshooting or urgent tool bug notifications, WhatsApp messaging is warmly welcomed.',
    },
    {
      question: 'Which email should I use: the Gmail address or the domain email?',
      answer:
        'Both reach our team directly! For direct, fast mobile replies and personal assistance from Subhan Ali, write to subhanrajput1708@gmail.com. For formal business inquiries, editorial feedback, or official correspondence with Shahid Ali, write to contact@moneymasterblog.com.',
    },
    {
      question: 'Who will respond to my inquiry or tool suggestion?',
      answer:
        'Inquiries are reviewed by Shahid Ali (Founder & Lead Digital Tools Practitioner) and Subhan Ali (Support & Technical Operations). We do not employ automated chat bots or outsourced answering services; you will always receive a genuine human response.',
    },
    {
      question: 'How quickly will I receive a reply?',
      answer:
        'General form submissions and email inquiries are answered within 24 to 48 business hours. Urgent WhatsApp messages or calls during working hours regarding tool glitches or accessibility issues are typically acknowledged within a few hours.',
    },
    {
      question: 'Can I suggest a brand new browser-based tool to be developed?',
      answer:
        'Yes! Many of our 15 utilities originated from everyday workflow challenges faced by content writers, designers, and students. If you have an idea for a text converter, calculator, or design assistant that can run client-side in standard web browsers, let us know in detail.',
    },
    {
      question: 'What details should I provide when reporting an erroneous calculation or bug?',
      answer:
        'To help us reproduce and fix the bug quickly, please include:\n1. Your operating system and device (e.g. Windows 11, macOS, Android, iPhone)\n2. Your browser name and version (e.g. Chrome 124, Safari 17)\n3. The exact input text or color value that triggered the defect\n4. What occurred versus what you expected to see.',
    },
    {
      question: 'Will submitting my phone number or email sign me up for marketing messages?',
      answer:
        'Never. We hold a strict zero-spam policy. Your phone number and email are exclusively used to reply to your specific inquiry or feedback. We never send unsolicited marketing SMS, spam calls, or promotional emails, and we never share your details with third parties.',
    },
    {
      question: 'Can I propose a commercial partnership, guest editorial, or sponsorship?',
      answer:
        'Yes. Please select "Website Inquiry / Partnership" in the form dropdown or email contact@moneymasterblog.com with your proposal. Please note that Money Master Blog prioritizes a fast, lightweight, and privacy-conscious environment for its visitors.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-12">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-8">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 text-xs font-semibold mb-3">
          <MessageCircle className="w-3.5 h-3.5 text-neutral-700" />
          <span>Direct Contact & Community Support</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Contact Us & Direct Support
        </h1>
        <p className="mt-3 text-base text-neutral-600 leading-relaxed max-w-3xl">
          Have questions about our online tools, discovered a bug, or want to suggest a new browser utility? Connect directly with our team via phone, WhatsApp, Gmail, or our official contact form below.
        </p>
      </div>

      {/* Primary Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 1: Phone & WhatsApp */}
        <div className="p-6 rounded-2xl border border-neutral-200 bg-white shadow-xs hover:border-neutral-300 transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <PhoneCall className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100/70 text-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                Calls & WhatsApp Active
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">Direct Phone & WhatsApp</h3>
              <p className="text-xs text-neutral-500 mt-0.5">Quick voice calls, SMS, and WhatsApp chats</p>
            </div>
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80">
              <span className="text-xs text-neutral-500 block mb-0.5 font-medium">Contact Number:</span>
              <span className="text-lg font-mono font-bold text-neutral-900 tracking-wide select-all">
                03678799545
              </span>
              <span className="text-[11px] text-neutral-400 block mt-0.5">Intl: +92 367 8799545</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <a
                href="tel:03678799545"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
              <a
                href="https://wa.me/923678799545"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
            <button
              onClick={() => copyToClipboard('03678799545', 'phone')}
              className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              {copiedField === 'phone' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Number Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Copy Number</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Card 2: Direct Support Gmail */}
        <div className="p-6 rounded-2xl border border-neutral-200 bg-white shadow-xs hover:border-neutral-300 transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                Direct Gmail
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">Direct Gmail Address</h3>
              <p className="text-xs text-neutral-500 mt-0.5">Direct personal inbox for quick email answers</p>
            </div>
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80">
              <span className="text-xs text-neutral-500 block mb-0.5 font-medium">Primary Gmail:</span>
              <span className="text-sm font-mono font-semibold text-neutral-900 break-all select-all">
                subhanrajput1708@gmail.com
              </span>
              <span className="text-[11px] text-neutral-400 block mt-0.5">Monitored daily by Subhan Ali</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="mailto:subhanrajput1708@gmail.com?subject=Money%20Master%20Blog%20Inquiry"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email via Gmail</span>
            </a>
            <button
              onClick={() => copyToClipboard('subhanrajput1708@gmail.com', 'gmail')}
              className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              {copiedField === 'gmail' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Gmail Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Copy Gmail</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Card 3: Official Editorial Domain Email & Author */}
        <div className="p-6 rounded-2xl border border-neutral-200 bg-white shadow-xs hover:border-neutral-300 transition-all flex flex-col justify-between space-y-4 sm:col-span-2 lg:col-span-1">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                Official Domain
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">Official Editorial Mail</h3>
              <p className="text-xs text-neutral-500 mt-0.5">For formal partnerships & tool suggestions</p>
            </div>
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80">
              <span className="text-xs text-neutral-500 block mb-0.5 font-medium">Domain Email:</span>
              <span className="text-sm font-mono font-semibold text-neutral-900 break-all select-all">
                contact@moneymasterblog.com
              </span>
              <span className="text-[11px] text-neutral-400 block mt-0.5">Reviewed by Shahid Ali</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="mailto:contact@moneymasterblog.com?subject=Money%20Master%20Blog%20Official%20Inquiry"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Domain</span>
            </a>
            <button
              onClick={() => copyToClipboard('contact@moneymasterblog.com', 'domain')}
              className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              {copiedField === 'domain' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Copy Domain Email</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Team Details & Operational Availability Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 text-white shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          {/* Item 1: Primary Lead */}
          <div className="space-y-1.5 border-b md:border-b-0 md:border-r border-neutral-800 pb-4 md:pb-0 md:pr-4">
            <span className="text-xs uppercase font-semibold text-neutral-400 tracking-wider">
              Lead Practitioner & Founder
            </span>
            <div className="text-base font-bold text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Shahid Ali</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              7+ years practical experience curating browser utilities, content workflows, and educational guides.
            </p>
          </div>

          {/* Item 2: Support & Operations */}
          <div className="space-y-1.5 border-b md:border-b-0 md:border-r border-neutral-800 pb-4 md:pb-0 md:pr-4">
            <span className="text-xs uppercase font-semibold text-neutral-400 tracking-wider">
              Support & Communications
            </span>
            <div className="text-base font-bold text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Subhan Ali (Rajput)</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Direct inquiries manager handling WhatsApp, phone, and Gmail message routing.
            </p>
          </div>

          {/* Item 3: Working Hours */}
          <div className="space-y-1.5 border-b md:border-b-0 lg:border-r border-neutral-800 pb-4 md:pb-0 lg:pr-4">
            <span className="text-xs uppercase font-semibold text-neutral-400 tracking-wider">
              Working Hours
            </span>
            <div className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Mon – Sat: 9am – 7pm</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Pakistan Standard Time (PKT / UTC+5). Weekend emergency bug reports monitored via WhatsApp.
            </p>
          </div>

          {/* Item 4: Response Commitment */}
          <div className="space-y-1.5">
            <span className="text-xs uppercase font-semibold text-neutral-400 tracking-wider">
              Response Guarantee
            </span>
            <div className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Within 24–48 Hours</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              100% human responses. No auto-generated spam, no ticket queues that get lost.
            </p>
          </div>
        </div>
      </div>

      {/* Main Section: Interactive Form + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Guidelines & Trust */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-neutral-200 bg-white shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>What We Love Hearing About</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-neutral-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-2 shrink-0"></span>
                <span><strong>New Utility Suggestions:</strong> Ideas for simple, client-side tools for text sanitization, formatting, or color analysis.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-2 shrink-0"></span>
                <span><strong>Bug & Edge-Case Reports:</strong> Text snippets, regex behavior, or device layouts that did not render properly.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-2 shrink-0"></span>
                <span><strong>Article & Tutorial Feedback:</strong> Suggestions for new topics or formula corrections in our 20 blog guides.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-2 shrink-0"></span>
                <span><strong>Collaboration & Licensing:</strong> Commercial inquiries or web integration partnerships.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Strict Privacy Commitment</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Your name, email address, and phone number are kept strictly confidential. We never sell contact information, nor will you receive marketing newsletters or automated telemarketing calls.
            </p>
          </div>
        </div>

        {/* Right Side: Detailed Submission Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            {submitted ? (
              <div className="text-center py-10 space-y-5">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-neutral-900">Message Dispatched Successfully</h3>
                  <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>! Your inquiry regarding <em>"{formData.topic}"</em> has been logged.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 max-w-md mx-auto text-left space-y-2 text-xs text-neutral-700">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Reference ID:</span>
                    <span className="font-mono font-bold text-neutral-900">{ticketId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Contact Email:</span>
                    <span className="font-medium text-neutral-900">{formData.email}</span>
                  </div>
                  {formData.phone && (
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Phone / WhatsApp:</span>
                      <span className="font-mono font-medium text-neutral-900">{formData.phone}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Priority:</span>
                    <span className="font-medium text-emerald-700">{formData.priority}</span>
                  </div>
                  <div className="pt-2 border-t border-neutral-200 text-neutral-500">
                    Shahid Ali and Subhan Ali will review your message and reply via email or WhatsApp within the designated window.
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        priority: 'Normal (within 24-48 hours)',
                        topic: 'Tool Suggestion',
                        subject: '',
                        message: '',
                      });
                    }}
                    className="px-5 py-2.5 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900">Send an Inquiry or Suggestion</h2>
                  <p className="text-xs text-neutral-500 mt-1">
                    Fill in the details below. We review every submission personally.
                  </p>
                </div>

                {error && (
                  <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Shahid / Subhan"
                      className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                      Email / Gmail Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@gmail.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp Number <span className="text-neutral-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 03678799545"
                      className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-topic" className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      id="contact-topic"
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                    >
                      <option value="Tool Suggestion">Suggest a New Tool</option>
                      <option value="Bug Report">Report a Bug / Glitch</option>
                      <option value="Article Feedback">Blog Article / Formula Feedback</option>
                      <option value="Partnership">Website Inquiry / Partnership</option>
                      <option value="Urgent Help">Urgent Assistance</option>
                      <option value="General Feedback">General Feedback</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-priority" className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                      Priority Level
                    </label>
                    <select
                      id="contact-priority"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                    >
                      <option value="Normal (within 24-48 hours)">Normal (within 24-48 hours)</option>
                      <option value="Urgent (within 12-24 hours)">Urgent (within 12-24 hours)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                      Subject Line <span className="text-neutral-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Issue with Word Counter whitespace"
                      className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor="contact-message" className="block text-xs font-bold text-neutral-800 uppercase tracking-wider">
                      Detailed Message <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] text-neutral-400">
                      {formData.message.length} characters
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your suggestion, the specific problem encountered, or any questions you have for Shahid Ali or Subhan Ali..."
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-xl text-sm shadow-xs transition-colors cursor-pointer min-h-[48px]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Message to Team</span>
                  </button>
                </div>

                <p className="text-[11px] text-neutral-500 text-center">
                  Direct dispatch to Shahid Ali & Subhan Ali. We respect your confidentiality.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Direct FAQ Section */}
      <FaqSection
        id="contact-faq"
        title="Frequently Asked Questions About Contacting Us"
        subtitle="Clear details on calling hours, WhatsApp support, direct Gmail responses, and bug escalation."
        items={contactFaqs}
      />
    </div>
  );
}
