import { getCollection } from 'astro:content';
import { INTERACTIVE_NOTES, type InteractiveNote } from './interactiveNotes';
import { CATEGORIES, type Category } from './categories';

export interface Note {
  type: 'content' | 'interactive';
  category: Category;
  title: string;
  description: string;
  tags: string[];
  date: Date;
  href: string;
}

export async function getAllNotes(): Promise<Note[]> {
  // Get all MDX content notes (non-draft)
  const contentNotes = await getCollection('notes', ({ data }) => !data.draft);

  // Normalize content notes to Note interface
  const normalizedContent: Note[] = contentNotes.map((entry) => ({
    type: 'content',
    category: entry.data.category,
    title: entry.data.title,
    description: entry.data.description,
    tags: entry.data.tags,
    date: entry.data.date,
    href: `/${entry.slug}`,
  }));

  // Normalize interactive notes to Note interface
  const normalizedInteractive: Note[] = INTERACTIVE_NOTES.map((note) => ({
    type: 'interactive',
    category: note.category,
    title: note.title,
    description: note.description,
    tags: note.tags,
    date: note.date,
    href: note.href,
  }));

  // Merge and sort by date (newest first)
  return [...normalizedContent, ...normalizedInteractive].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );
}

export async function getNotesByCategory(category: Category): Promise<Note[]> {
  const allNotes = await getAllNotes();
  return allNotes.filter((note) => note.category === category);
}

export async function getCategoryCounts(): Promise<Record<Category, number>> {
  const allNotes = await getAllNotes();
  const counts: Record<Category, number> = {
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
