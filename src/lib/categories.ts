export const CATEGORIES = ['backend', 'infrastructure', 'database', 'frontend', 'leadership', 'others'] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  backend: 'Backend',
  infrastructure: 'Infrastructure',
  database: 'Database',
  frontend: 'Frontend',
  leadership: 'Leadership',
  others: 'Others',
};

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  backend: 'Server-side development, APIs, databases, and backend architecture',
  infrastructure: 'DevOps, cloud platforms, deployment, and infrastructure as code',
  database: 'Database design, SQL optimization, indexing, and data management',
  frontend: 'Web UI, component design, CSS, JavaScript, and frontend frameworks',
  leadership: 'Team management, mentoring, decision-making, and organizational growth',
  others: 'Miscellaneous notes and quick references',
};
