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
const general_content = defineCollection({
    type: 'content', 
    schema: z.object({
        introText: z.string().optional(), 
        aboutPageContent: z.string().optional(), 
    }).passthrough(),
});

// --- MODIFIED: Collection Definition: highlights ---
const highlights = defineCollection({
    type: 'content', // CHANGED from 'data' to 'content'
    schema: z.object({ // Schema defines the frontmatter for the .md files
        title: z.string(),
        summary: z.string(), 
        thumbnail: z.string(), 
        linkedFeedSlug: z.string(), 
        order: z.number().optional(),
        isSeparator: z.boolean().optional(), // New field 
    }),
});

// --- Export Collections ---
export const collections = {
  feed,
  general_content,
  highlights,
};