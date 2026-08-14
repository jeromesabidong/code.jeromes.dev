import { getCollection } from 'astro:content';
import type { Category } from './categories';

export interface Note {
  category: Category;
  title: string;
  description: string;
  tags: string[];
  date: Date;
  href: string;
}

export async function getAllNotes(): Promise<Note[]> {
  const contentNotes = await getCollection('notes', ({ data }) => !data.draft);

  const notes: Note[] = contentNotes.map((entry) => ({
    category: entry.data.category,
    title: entry.data.title,
    description: entry.data.description,
    tags: entry.data.tags,
    date: entry.data.date,
    href: `/${entry.id}/`,
  }));

  return notes.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getNotesByCategory(category: Category): Promise<Note[]> {
  const allNotes = await getAllNotes();
  return allNotes.filter((note) => note.category === category);
}

export async function getCategoryCounts(): Promise<Record<Category, number>> {
  const allNotes = await getAllNotes();
  const counts: Record<Category, number> = {
    projects: 0,
    backend: 0,
    infrastructure: 0,
    database: 0,
    frontend: 0,
    leadership: 0,
    others: 0,
  };

  allNotes.forEach((note) => {
    counts[note.category]++;
  });

  return counts;
}

export interface SearchDoc {
  title: string;
  description: string;
  category: Category;
  tags: string[];
  href: string;
  content: string;
}

function plainTextFromSource(source: string): string {
  return source
    .replace(/^import .+$/gm, '')
    .replace(/^export const \w+\s*=\s*[\s\S]*?;\s*$/gm, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/<\/?[A-Z][\w.]*[^>]*>/g, '')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_~]{1,3}/g, '')
    .replace(/^>\s?/gm, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/^-{3,}$/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function getSearchIndex(): Promise<SearchDoc[]> {
  const entries = await getCollection('notes', ({ data }) => !data.draft);

  return entries.map((entry) => ({
    title: entry.data.title,
    description: entry.data.description,
    category: entry.data.category,
    tags: entry.data.tags,
    href: `/${entry.id}/`,
    content: plainTextFromSource(entry.body ?? ''),
  }));
}
