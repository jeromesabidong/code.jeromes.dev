import { defineCollection, z } from 'astro:content';
import { CATEGORIES } from '../lib/categories';

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(CATEGORIES),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { notes };
