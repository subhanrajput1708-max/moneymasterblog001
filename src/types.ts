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
}

export interface PracticalExample {
  title: string;
  startingAmount: string;
  rate: string;
  term: string;
  fees: string;
  calculation: string;
  result: string;
  interpretation: string;
}

export interface ComparisonTable {
  title: string;
  description?: string;
  headers: string[];
  rows: string[][];
  footnote?: string;
}

export interface RealWorldScenario {
  title: string;
  profile: string;
  dilemma: string;
  evaluation: string;
  recommendedAction: string;
  financialOutcome: string;
}

export interface CommonMistakeItem {
  mistake: string;
  whyItHappens: string;
  consequence: string;
  betterApproach: string;
}

export interface ImportantException {
  situation: string;
  whyGeneralMethodFails: string;
  howToHandle: string;
}

export interface DecisionFrameworkStage {
  stage: string; // e.g. 'Check', 'Calculate', 'Compare', 'Verify', 'Decide'
  action: string;
  details: string;
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
  coreConcept: {
    title: string;
    explanation: string;
    definitions: { term: string; definition: string }[];
  };
  sections: BlogArticleSection[];
  stepByStepMethod: {
    title: string;
    description: string;
    steps: {
      stepNumber: number;
      stepName: string;
      whatToCheck: string;
      whyItMatters: string;
      howToCalculate: string;
      expectedResult: string;
    }[];
  };
  examples: PracticalExample[];
  comparisonTable: ComparisonTable;
  realWorldScenarios: RealWorldScenario[];
  commonMistakes: CommonMistakeItem[];
  importantExceptions: ImportantException[];
  decisionFramework: {
    title: string;
    description: string;
    stages: DecisionFrameworkStage[];
  };
  checklist: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  conclusion: {
    summary: string;
    nextSteps: string[];
  };
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
