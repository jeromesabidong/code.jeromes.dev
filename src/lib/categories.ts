export const CATEGORIES = ['projects', 'backend', 'infrastructure', 'database', 'frontend', 'leadership', 'others'] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  projects: 'Projects',
  backend: 'Backend',
  infrastructure: 'Infrastructure',
  database: 'Database',
  frontend: 'Frontend',
  leadership: 'Leadership',
  others: 'Others',
};

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  projects: 'Personal and professional projects, write-ups, and case studies',
  backend: 'Server-side development, APIs, databases, and backend architecture',
  infrastructure: 'DevOps, cloud platforms, deployment, and infrastructure as code',
  database: 'Database design, SQL optimization, indexing, and data management',
  frontend: 'Web UI, component design, CSS, JavaScript, and frontend frameworks',
  leadership: 'Team management, mentoring, decision-making, and organizational growth',
  others: 'Miscellaneous notes and quick references',
};
