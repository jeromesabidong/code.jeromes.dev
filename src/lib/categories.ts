export const CATEGORIES = ['projects', 'backend', 'infrastructure', 'database', 'frontend', 'leadership', 'coding'] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  projects: 'Projects',
  backend: 'Backend',
  infrastructure: 'Infrastructure',
  database: 'Database',
  frontend: 'Frontend',
  leadership: 'Leadership',
  coding: 'Coding',
};

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  projects: 'Personal and professional projects, write-ups, and case studies',
  backend: 'Server-side development, APIs, databases, and backend architecture',
  infrastructure: 'DevOps, cloud platforms, deployment, and infrastructure as code',
  database: 'Database design, SQL optimization, indexing, and data management',
  frontend: 'Web UI, component design, CSS, JavaScript, and frontend frameworks',
  leadership: 'Team management, mentoring, decision-making, and organizational growth',
  coding: 'Other coding-related concepts, tools, and quick references',
};
