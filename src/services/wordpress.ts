/**
 * WordPress REST API Service
 * Target API Base URL: https://circlehqcompany.com/wp-json/wp/v2/
 */

export type WpCategory = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

export type WpPost = {
  id: number;
  slug: string;
  date: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  categories: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url?: string;
      alt_text?: string;
      media_details?: {
        sizes?: Record<string, { source_url?: string }>;
      };
    }>;
    author?: Array<{
      name?: string;
      avatar_urls?: Record<string, string>;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
};

export type ProcessedPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  category: string;
  categoryId: number;
  date: string;
  readTime: string;
  cover: string;
  author: {
    name: string;
    avatar?: string;
  };
  link: string;
};

const WP_BASE_URL = 'https://circlehqcompany.com/wp-json/wp/v2';
const FALLBACK_IMAGE = '/blog_ai_solutions_sphere.png';

/**
 * Decodes HTML entities (e.g., &#8217; -> ', &amp; -> &)
 */
export function decodeHtmlEntities(html: string): string {
  if (!html) return '';
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

/**
 * Strips HTML tags for excerpt display
 */
export function stripHtmlTags(html: string): string {
  if (!html) return '';
  const decoded = decodeHtmlEntities(html);
  return decoded.replace(/<[^>]*>?/gm, '').trim();
}

/**
 * Formats ISO date string to DD MMM YYYY (e.g. 12 AUG 2026)
 */
export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      .toUpperCase();
  } catch {
    return dateString;
  }
}

/**
 * Calculates estimated read time from content length
 */
export function calculateReadTime(contentHtml: string): string {
  const text = stripHtmlTags(contentHtml);
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} MIN`;
}

/**
 * Transforms raw WP REST API Post object into a clean, UI-ready ProcessedPost object
 */
export function transformWpPost(post: WpPost): ProcessedPost {
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  const coverUrl =
    featuredMedia?.media_details?.sizes?.large?.source_url ||
    featuredMedia?.source_url ||
    FALLBACK_IMAGE;

  const authorObj = post._embedded?.author?.[0];
  const authorName = authorObj?.name ? decodeHtmlEntities(authorObj.name) : 'Circle HQ Team';
  const authorAvatar = authorObj?.avatar_urls?.['96'] || authorObj?.avatar_urls?.['48'];

  const categoryObj = post._embedded?.['wp:term']?.[0]?.[0];
  const categoryName = categoryObj?.name ? decodeHtmlEntities(categoryObj.name) : 'INSIGHTS';

  const title = decodeHtmlEntities(post.title?.rendered || '');
  const excerpt = stripHtmlTags(post.excerpt?.rendered || '');
  const contentHtml = post.content?.rendered || '';
  const dateFormatted = formatDate(post.date);
  const readTime = calculateReadTime(contentHtml);

  return {
    id: String(post.id),
    slug: post.slug,
    title,
    excerpt,
    contentHtml,
    category: categoryName.toUpperCase(),
    categoryId: post.categories?.[0] ?? 0,
    date: dateFormatted,
    readTime,
    cover: coverUrl,
    author: {
      name: authorName,
      avatar: authorAvatar,
    },
    link: post.link,
  };
}

/**
 * Fetches all active WordPress post categories
 */
export async function fetchWpCategories(): Promise<WpCategory[]> {
  const res = await fetch(`${WP_BASE_URL}/categories?per_page=100&hide_empty=true`);
  if (!res.ok) {
    throw new Error(`Failed to fetch categories (${res.status} ${res.statusText})`);
  }
  const categories: WpCategory[] = await res.json();
  return categories
    .filter((cat) => cat.count > 0)
    .map((cat) => ({
      ...cat,
      name: decodeHtmlEntities(cat.name),
    }));
}

/**
 * Fetches WordPress posts dynamically with optional category filtering
 */
export async function fetchWpPosts(categoryId?: number | string): Promise<ProcessedPost[]> {
  let url = `${WP_BASE_URL}/posts?_embed&per_page=20`;
  if (categoryId && categoryId !== 'ALL' && typeof categoryId === 'number') {
    url += `&categories=${categoryId}`;
  }
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch posts (${res.status} ${res.statusText})`);
  }
  const posts: WpPost[] = await res.json();
  return posts.map(transformWpPost);
}
