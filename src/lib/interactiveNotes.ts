import type { Category } from './categories';

export interface InteractiveNote {
  slug: string;
  category: Category;
  title: string;
  description: string;
  tags: string[];
  date: Date;
  href: string;
}

// Interactive notes that don't fit the standard MDX content model
// These are typically multi-page interactive tools or tutorials
// WARNING: Never create src/content/notes/{category}/{slug}.mdx files for slugs listed here,
// as static routes take precedence and will shadow the content collection entries.
export const INTERACTIVE_NOTES: InteractiveNote[] = [
  {
    slug: 'mysql-explain',
    category: 'database',
    title: 'MySQL EXPLAIN & Query Optimization',
    description: 'Interactive guide to reading EXPLAIN output, understanding indexes, and optimizing MySQL queries with real-world examples.',
    tags: ['mysql', 'sql', 'performance', 'database', 'optimization'],
    date: new Date('2026-08-08'),
    href: '/database/mysql-explain/',
  },
];
