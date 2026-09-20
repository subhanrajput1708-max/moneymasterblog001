import { BlogArticle, BlogCategory } from '../types';
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
  'Text Cleaning',
  'Productivity',
  'Data Preparation',
  'Online Work',
  'Digital Organization'
];

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
