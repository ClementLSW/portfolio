import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    project: z.string().optional(), // Links to related project slug
    draft: z.boolean().default(false),
    coverImage: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['released', 'in-progress', 'prototype', 'archived']),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    event: z.string().optional(), // e.g., "Global Game Jam 2024"
    team: z.array(z.string()).optional(),
    role: z.string(),
    coverImage: z.string(),
    links: z.object({
      itch: z.string().optional(),
      github: z.string().optional(),
      play: z.string().optional(),
      other: z.array(z.object({
        label: z.string(),
        url: z.string(),
      })).optional(),
    }).optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lastUpdated: z.date().optional(),
  }),
});

export const collections = { blog, projects, pages };
