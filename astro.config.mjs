import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: process.env.SITE_URL || 'https://localhost:3000',
  output: 'static',
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      langs: [],
      wrap: true,
    },
  },
});
