// src/content/config.ts
import { defineCollection, z } from 'astro:content';

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

// --- ADDED: Schema for Full Width Text Block ---
const fullWidthTextBlockSchema = z.object({
    type: z.literal('fullWidthText'),
    text: z.string(), // Markdown content
});
// --- END ADDED ---

// --- ADDED: Schema for Horizontal Gallery Block ---
const horizontalGalleryBlockSchema = z.object({
    type: z.literal('horizontalGallery'),
    images: z.array(
        z.object({
            image: z.string(), // Path to the image
            alt: z.string().optional(), // Alt text
        })
    ).optional(), // Allow the gallery to be empty
});
// --- END ADDED ---

const feedCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        // If you had the optional _styling_note before, keep it, otherwise omit it
        // _styling_note: z.string().optional(),
        date: z.date().optional(),
        thumbnail: z.string().optional(),
        contentBlocks: z.array(
            z.discriminatedUnion('type', [
                twoColumnBlockSchema,
                fullWidthImageBlockSchema,
                fullWidthEmbedBlockSchema,
                // --- ADDED: Include new schemas in the union ---
                fullWidthTextBlockSchema,
                horizontalGalleryBlockSchema,
                // --- END ADDED ---
            ])
        ).optional(),
    }),
});

export const collections = {
    'feed': feedCollection,
};