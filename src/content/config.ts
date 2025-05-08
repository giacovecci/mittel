// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// --- Block Schemas (Used by 'feed' collection) ---
const twoColumnBlockSchema = z.object({
    type: z.literal('twoColumn'),
    left: z.string().optional(),
    right: z.string().optional(),
});
const fullWidthImageBlockSchema = z.object({
    type: z.literal('fullWidthImage'),
    image: z.string(),
    alt: z.string().optional(),
});
const fullWidthEmbedBlockSchema = z.object({
    type: z.literal('fullWidthEmbed'),
    embedCode: z.string(),
});
const fullWidthTextBlockSchema = z.object({
    type: z.literal('fullWidthText'),
    text: z.string(),
});
const horizontalGalleryBlockSchema = z.object({
    type: z.literal('horizontalGallery'),
    images: z.array(
        z.object({
            image: z.string(),
            alt: z.string().optional(),
        })
    ).optional(),
});

// --- Collection Definition: feed ---
const feed = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.date().optional(),
        thumbnail: z.string().optional(),
        contentBlocks: z.array(
            z.discriminatedUnion('type', [
                twoColumnBlockSchema,
                fullWidthImageBlockSchema,
                fullWidthEmbedBlockSchema,
                fullWidthTextBlockSchema,
                horizontalGalleryBlockSchema,
            ])
        ).optional(),
    }),
});

// --- Collection Definition: general_content ---
// This key 'general_content' MUST match the folder name src/content/general_content/
const general_content = defineCollection({
    type: 'data', // For YAML/JSON/MD files where we primarily use frontmatter
    schema: z.object({
        introText: z.string(),
    }),
});

// --- Export Collections ---
export const collections = {
  feed, // Key will be 'feed'
  general_content, // Key will be 'general_content'
};