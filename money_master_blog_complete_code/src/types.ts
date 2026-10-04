export type PageId =
  | 'home'
  | 'tools'
  | 'blog'
  | 'blog-article'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'disclaimer';

export type BlogCategory =
  | 'Personal Loans'
  | 'Credit & Debt'
  | 'Savings & Budgeting'
  | 'Insurance & Auto'
  | 'Retirement & Goals';

export interface BlogArticleSection {
  heading: string;
  subheading?: string;
  paragraphs: string[];
  bulletPoints?: string[];
  numberedList?: string[];
  callout?: {
    type: 'tip' | 'warning' | 'info';
    title: string;
    text: string;
  };
  example?: {
    title: string;
    before: string;
    after: string;
    explanation?: string;
  };
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  category: BlogCategory;
  publishedDate: string;
  updatedDate: string;
  readingTime: string;
  excerpt: string;
  quickAnswer: string;
  relevantToolIds: ToolId[];
  sections: BlogArticleSection[];
  alternativeMethod?: {
    title: string;
    description: string;
    whenToChooseThis: string;
    steps?: string[];
  };
  edgeCases?: {
    scenario: string;
    whyItFails: string;
    howToFix: string;
  }[];
  whenNotToUse?: {
    scenario: string;
    reason: string;
    alternativeRecommendation: string;
  }[];
  verificationMethod?: {
    title: string;
    steps: string[];
    sampleCheck: string;
  };
  privacyGuidance?: string;
  commonMistakes: {
    mistake: string;
    consequence: string;
    solution: string;
  }[];
  checklist: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export type ToolCategory =
  | 'Text Tools'
  | 'Developer & Web Tools'
  | 'Image Tools'
  | 'Calculators';

export type ToolId =
  // Text Tools (7)
  | 'text-cleaner'
  | 'lorem-ipsum'
  | 'word-counter'
  | 'character-counter'
  | 'case-converter'
  | 'text-reverser'
  | 'slug-generator'
  // Developer & Web Tools (6)
  | 'base64-converter'
  | 'url-converter'
  | 'json-formatter'
  | 'uuid-generator'
  | 'qr-code-generator'
  | 'password-generator'
  // Image Tools (4)
  | 'image-compressor'
  | 'image-resizer'
  | 'image-cropper'
  | 'color-palette'
  // Calculators (8)
  | 'percentage-calculator'
  | 'gst-tax-calculator'
  | 'tip-calculator'
  | 'loan-payment-calculator'
  | 'age-calculator'
  | 'date-difference-calculator'
  | 'timestamp-converter'
  | 'random-number-generator'
  // Legacy alias compatibility
  | 'text-sorter'
  | 'find-replace'
  | 'remove-line-breaks'
  | 'duplicate-remover'
  | 'whitespace-remover'
  | 'line-counter'
  | 'invisible-character-remover'
  | 'punctuation-cleaner'
  | 'number-extractor'
  | 'quote-remover'
  | 'prefix-suffix-cleaner';

export interface ToolMeta {
  id: ToolId;
  name: string;
  category: ToolCategory;
  summary: string;
  badge?: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  explanation: string;
  howToUse: string[];
  example: {
    title: string;
    input: string;
    output: string;
    explanation?: string;
  };
  usefulTips: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedToolIds: ToolId[];
  privacyNote: string;
}

export interface PaletteColor {
  id: string;
  hex: string;
  locked: boolean;
}

export interface TextMetrics {
  words: number;
  charactersWithSpaces: number;
  charactersWithoutSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
}
