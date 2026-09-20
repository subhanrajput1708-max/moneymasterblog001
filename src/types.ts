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
  | 'Text Cleaning'
  | 'Productivity'
  | 'Data Preparation'
  | 'Online Work'
  | 'Digital Organization';

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

export type ToolId =
  | 'color-palette'
  | 'lorem-ipsum'
  | 'word-counter'
  | 'password-generator'
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
  title: string;
  category: 'Colors' | 'Text' | 'Security' | 'Productivity';
  shortDesc: string;
  description: string;
  badge?: string;
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
