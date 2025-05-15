// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// --- Block Schemas (Used by 'feed' collection) ---
// MODIFIED: Define 'type' directly in the initial z.object()
const twoColumnBlockSchema = z.object({
    type: z.literal('twoColumn'),
    left: z.string().optional(),
    right: z.string().optional()
});

const fullWidthImageBlockSchema = z.object({
    type: z.literal('fullWidthImage'),
    image: z.string(), // Assuming image path is a string
    alt: z.string().optional()
});

const fullWidthEmbedBlockSchema = z.object({
    type: z.literal('fullWidthEmbed'),
    embedCode: z.string()
});

const fullWidthTextBlockSchema = z.object({
    type: z.literal('fullWidthText'),
    text: z.string() // Assuming markdown string
});

const horizontalGalleryBlockSchema = z.object({
    type: z.literal('horizontalGallery'),
    images: z.array(
        z.object({
            image: z.string(), // Assuming image path is a string
            alt: z.string().optional()
        })
    ).optional()
});

// The .extend() calls are no longer needed as fields are defined above.

// --- Collection Definition: feed ---
const feed = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.date().optional(),
        thumbnail: z.string().optional(), // Assuming image path is a string
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
    }).passthrough(), // .passthrough() allows fields not defined in schema
});

// --- Collection Definition: highlights ---
const highlights = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        order: z.number().optional(),
        summary: z.string().optional(),
        thumbnail: z.string().optional(), // Assuming image path is a string
        linkedFeedSlug: z.string().optional(),
        isSeparator: z.boolean().optional(),
    }),
});

// --- Export Collections ---
export const collections = {
  feed,
  general_content,
  highlights,
};