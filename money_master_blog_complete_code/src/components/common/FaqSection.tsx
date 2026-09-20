import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title?: string;
  subtitle?: string;
  items: FaqItem[];
  id?: string;
}

export default function FaqSection({
  title = 'Frequently Asked Questions',
  subtitle = 'Find answers to common questions about this page and our utilities.',
  items,
  id = 'faq-section',
}: FaqSectionProps) {
  // Allow toggling multiple or single items
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id={id} className="scroll-mt-20 pt-6">
      <div className="border-t border-neutral-200 pt-10">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
            <HelpCircle className="w-3.5 h-3.5 text-neutral-600" />
            <span>Questions & Answers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm sm:text-base text-neutral-600 mt-2 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndices.includes(index);
            const buttonId = `faq-btn-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={index}
                className="border border-neutral-200 rounded-xl bg-white transition-all overflow-hidden shadow-2xs"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleIndex(index)}
                    className="w-full px-5 py-4 sm:py-4.5 flex items-center justify-between text-left gap-4 hover:bg-neutral-50/75 transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">
                      {item.question}
                    </span>
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-neutral-500 bg-neutral-100 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-neutral-900 text-white' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 bg-neutral-50/30"
                  >
                    <p className="whitespace-pre-line">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
