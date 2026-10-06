import { BlogArticle, BlogCategory, BlogArticleImage } from '../types';
import { ARTICLES_1_TO_5 } from './articles/article1To5';
import { ARTICLES_6_TO_10 } from './articles/article6To10';
import { ARTICLES_11_TO_15 } from './articles/article11To15';
import { ARTICLES_16_TO_20 } from './articles/article16To20';

export const BLOG_ARTICLES: BlogArticle[] = [
  ...ARTICLES_1_TO_5,
  ...ARTICLES_6_TO_10,
  ...ARTICLES_11_TO_15,
  ...ARTICLES_16_TO_20
];

export const BLOG_CATEGORIES: BlogCategory[] = [
  'Personal Loans',
  'Credit & Debt',
  'Savings & Budgeting',
  'Insurance & Auto',
  'Retirement & Goals'
];

export const ARTICLE_IMAGES_MAP: Record<string, BlogArticleImage> = {
  'how-to-calculate-the-real-cost-of-a-personal-loan-before-applying': {
    src: '/images/article-1-real-cost-personal-loan.jpg',
    alt: 'Real Cost of Personal Loan Calculation and Amortization Analysis',
    caption: 'Loan contract disclosure and APR calculation ledger showing true borrowing cost.'
  },
  'what-makes-a-loan-offer-expensive-even-when-the-interest-rate-looks-low': {
    src: '/images/article-2-expensive-loan-hidden-fees.jpg',
    alt: 'Magnifying Glass Reviewing Hidden Fees on Loan Agreement Document',
    caption: 'Origination fees, prepayment penalties, and fine-print clauses audited in detail.'
  },
  'how-to-compare-two-personal-loans-using-total-repayment-cost': {
    src: '/images/article-3-compare-personal-loans.jpg',
    alt: 'Side-by-Side Personal Loan Comparison Schedules and Calculation Charts',
    caption: 'Comparative repayment cost modeling across varying loan terms and fee structures.'
  },
  'how-to-lower-your-monthly-loan-payment-without-taking-a-new-loan': {
    src: '/images/article-4-lower-monthly-loan-payment.jpg',
    alt: 'Bank Consultation and Loan Modification Worksheet for Lower Payments',
    caption: 'Restructuring, term extension, and recast strategies without taking new debt.'
  },
  'how-to-find-hidden-fees-in-a-credit-card-agreement': {
    src: '/images/article-5-hidden-fees-credit-card.jpg',
    alt: 'Credit Card Agreement With Red Pen Highlighting Fee Schedules and Fine Print',
    caption: 'Auditing variable interest, penalty APR triggers, and foreign transaction fee terms.'
  },
  'how-credit-card-minimum-payments-increase-the-time-to-become-debt-free': {
    src: '/images/article-6-credit-card-minimum-payment-trap.jpg',
    alt: 'Debt Payoff Calendar and Timeline Comparing Minimum Payment Trap vs Accelerated Plan',
    caption: 'Comparing 20+ year minimum payment amortization against focused payoff timelines.'
  },
  'how-to-build-a-monthly-debt-payment-plan-using-your-actual-income': {
    src: '/images/article-7-monthly-debt-payment-plan.jpg',
    alt: 'Monthly Debt Payment Plan Spreadsheet and Cashflow Waterfall Budget',
    caption: 'Snowball and avalanche repayment modeling anchored to take-home paycheck income.'
  },
  'what-to-check-before-choosing-a-balance-transfer-credit-card': {
    src: '/images/article-8-balance-transfer-credit-card.jpg',
    alt: 'Balance Transfer Cards with Promotional 0% APR Timeline and Fee Evaluation',
    caption: 'Evaluating transfer fees, promo expiration windows, and post-introductory APR spikes.'
  },
  'how-to-estimate-the-emergency-fund-you-need-from-your-monthly-expenses': {
    src: '/images/article-9-estimate-emergency-fund.jpg',
    alt: 'Emergency Fund Savings Reserve Planner and Household Expenses Ledger',
    caption: 'Step-by-step 3 to 6-month safety net calculation based on essential baseline living costs.'
  },
  'how-to-compare-high-yield-savings-accounts-without-looking-only-at-apy': {
    src: '/images/article-10-high-yield-savings-compare.jpg',
    alt: 'High-Yield Savings Accounts Comparison on Digital Banking Screen',
    caption: 'Comparing FDIC insurance, withdrawal transfer speed, balance minimums, and compounding rate.'
  },
  'how-to-calculate-the-opportunity-cost-of-keeping-too-much-cash': {
    src: '/images/article-11-opportunity-cost-cash.jpg',
    alt: 'Opportunity Cost Visual Comparing Cash Reserve Against Long-Term Growth Graph',
    caption: 'Inflation drag and purchasing power loss modeling for idle cash over 5 to 20 years.'
  },
  'how-to-create-a-sinking-fund-for-large-annual-expenses': {
    src: '/images/article-12-sinking-fund-annual-expenses.jpg',
    alt: 'Color-Coded Sinking Fund Budget Categories for Annual Recurring Expenses',
    caption: 'Allocating monthly cash reserves for property taxes, car insurance, and unexpected repairs.'
  },
  'how-to-calculate-your-true-monthly-cost-of-owning-a-car': {
    src: '/images/article-13-true-cost-car-ownership.jpg',
    alt: 'Vehicle Ownership Total Cost of Ownership Calculation and Fuel Maintenance Receipts',
    caption: 'Depreciation, gas, routine maintenance, financing interest, and insurance aggregated monthly.'
  },
  'how-to-compare-car-insurance-quotes-without-comparing-the-wrong-coverage': {
    src: '/images/article-14-compare-car-insurance-quotes.jpg',
    alt: 'Side-by-Side Car Insurance Quotes Comparing Liability and Collision Limits',
    caption: 'Harmonizing coverage limits, endorsements, and comprehensive deductibles for fair quotes.'
  },
  'what-information-should-you-prepare-before-requesting-an-insurance-quote': {
    src: '/images/article-15-prepare-insurance-quote-info.jpg',
    alt: 'Insurance Quote Preparation Folder with VIN Number, Driver Record, and Vehicle Specs',
    caption: 'Complete pre-quote document checklist to obtain fast, accurate, and bindable insurance rates.'
  },
  'how-to-review-an-insurance-policy-for-exclusions-limits-and-deductibles': {
    src: '/images/article-16-review-insurance-policy-exclusions.jpg',
    alt: 'Insurance Policy Declaration Page with Highlighted Exclusion Clauses and Limits',
    caption: 'Auditing policy fine print, coverage boundaries, and out-of-pocket maximum exposure.'
  },
  'how-to-calculate-the-financial-impact-of-a-higher-insurance-deductible': {
    src: '/images/article-17-higher-deductible-financial-impact.jpg',
    alt: 'Deductible Risk and Premium Savings Break-Even Worksheet',
    caption: 'Break-even math evaluating whether annual premium savings justify higher claim deductibles.'
  },
  'how-to-estimate-retirement-savings-when-your-income-changes-every-year': {
    src: '/images/article-18-variable-income-retirement-savings.jpg',
    alt: 'Variable Income Retirement Savings Roadmap and Freelance Cashflow Curve',
    caption: 'Percentage-based savings framework adapting smoothly to fluctuating freelance and bonus income.'
  },
  'how-inflation-changes-the-amount-you-need-to-save-for-a-future-goal': {
    src: '/images/article-19-inflation-future-savings-goal.jpg',
    alt: 'Inflation Impact Graph Showing Purchasing Power Erosion Over Future Decades',
    caption: 'Adjusting future savings targets for real purchasing power versus nominal dollar numbers.'
  },
  'how-to-compare-two-savings-goals-when-you-have-limited-monthly-income': {
    src: '/images/article-20-compare-two-savings-goals.jpg',
    alt: 'Balance Scale Weighing Competing Savings Goals and Priority Financial Milestones',
    caption: 'Decision matrix prioritizing emergency cushion, high-interest debt, and long-term milestones.'
  }
};

export function getArticleImage(article: BlogArticle): BlogArticleImage {
  if (article.image) return article.image;

  // 1. Direct slug-based individual matching (Every article gets its own distinct photo)
  if (article.slug && ARTICLE_IMAGES_MAP[article.slug]) {
    return ARTICLE_IMAGES_MAP[article.slug];
  }

  // 2. Fallback category matching
  switch (article.category) {
    case 'Personal Loans':
      return {
        src: '/images/personal-loans-guide.jpg',
        alt: `${article.title} - Personal Loan and Rate Analysis`,
        caption: `Practical loan analysis, APR calculation, and contract verification framework for ${article.title}.`
      };
    case 'Credit & Debt':
      return {
        src: '/images/credit-debt-guide.jpg',
        alt: `${article.title} - Credit Statement and Debt Payoff Management`,
        caption: `Actionable fee breakdown, statement auditing, and repayment roadmap for ${article.title}.`
      };
    case 'Savings & Budgeting':
      return {
        src: '/images/savings-budget-guide.jpg',
        alt: `${article.title} - High-Yield Savings and Budget Allocation`,
        caption: `Cash allocation rules, liquidity reserves, and compounding savings for ${article.title}.`
      };
    case 'Insurance & Auto':
      return {
        src: '/images/auto-insurance-guide.jpg',
        alt: `${article.title} - Auto Ownership and Insurance Policy Review`,
        caption: `Ownership cost breakdown, depreciation analysis, and policy clauses for ${article.title}.`
      };
    case 'Retirement & Goals':
      return {
        src: '/images/retirement-wealth-guide.jpg',
        alt: `${article.title} - Compound Interest and Long-Term Wealth Planning`,
        caption: `Compound growth modeling, timeline planning, and asset protection for ${article.title}.`
      };
    default:
      return {
        src: '/images/personal-loans-guide.jpg',
        alt: article.title,
        caption: `Practical financial framework for ${article.title}.`
      };
  }
}

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find(article => article.slug === slug || article.id === slug);
}

export function getRecentArticles(count: number = 4): BlogArticle[] {
  return BLOG_ARTICLES.slice(0, count);
}

export function getRelatedArticles(currentSlug: string, count: number = 3): BlogArticle[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return BLOG_ARTICLES.slice(0, count);

  // Match same category first, excluding current article
  const sameCategory = BLOG_ARTICLES.filter(
    a => a.category === current.category && a.slug !== current.slug
  );

  if (sameCategory.length >= count) {
    return sameCategory.slice(0, count);
  }

  // If not enough in same category, supplement with others
  const others = BLOG_ARTICLES.filter(
    a => a.category !== current.category && a.slug !== current.slug
  );

  return [...sameCategory, ...others].slice(0, count);
}

export function getArticlesByCategory(category: BlogCategory | 'All'): BlogArticle[] {
  if (category === 'All') return BLOG_ARTICLES;
  return BLOG_ARTICLES.filter(article => article.category === category);
}

export function searchArticles(query: string, category: BlogCategory | 'All' = 'All'): BlogArticle[] {
  const cleanQuery = query.toLowerCase().trim();
  let baseArticles = category === 'All' ? BLOG_ARTICLES : getArticlesByCategory(category);

  if (!cleanQuery) return baseArticles;

  return baseArticles.filter(article => {
    return (
      article.title.toLowerCase().includes(cleanQuery) ||
      article.excerpt.toLowerCase().includes(cleanQuery) ||
      article.quickAnswer.toLowerCase().includes(cleanQuery) ||
      article.category.toLowerCase().includes(cleanQuery) ||
      article.sections.some(s => 
        s.heading.toLowerCase().includes(cleanQuery) ||
        s.paragraphs.some(p => p.toLowerCase().includes(cleanQuery))
      )
    );
  });
}
