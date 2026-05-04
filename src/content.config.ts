import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    series: z.string().optional(),
    seriesOrder: z.number().int().positive().optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    author: z.string().optional(),
    draft: z.boolean().default(false),
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
    toc: z.boolean().default(true),
    comment: z.boolean().default(true),
    language: z.enum(['zh-CN', 'en-US']).default('zh-CN'),
  }),
});

export const collections = { blog };
