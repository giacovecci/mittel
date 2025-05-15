// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// --- Block Schemas (Used by 'feed' collection) ---
const twoColumnBlockSchema = z.object({ /* ... */ });
const fullWidthImageBlockSchema = z.object({ /* ... */ });
const fullWidthEmbedBlockSchema = z.object({ /* ... */ });
const fullWidthTextBlockSchema = z.object({ /* ... */ });
const horizontalGalleryBlockSchema = z.object({ /* ... */ });
twoColumnBlockSchema.extend({ type: z.literal('twoColumn'), left: z.string().optional(), right: z.string().optional() });
fullWidthImageBlockSchema.extend({ type: z.literal('fullWidthImage'), image: z.string(), alt: z.string().optional() });
fullWidthEmbedBlockSchema.extend({ type: z.literal('fullWidthEmbed'), embedCode: z.string() });
fullWidthTextBlockSchema.extend({ type: z.literal('fullWidthText'), text: z.string() });
horizontalGalleryBlockSchema.extend({ type: z.literal('horizontalGallery'), images: z.array(z.object({ image: z.string(), alt: z.string().optional() })).optional() });


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
    type: 'content',
    schema: z.object({
        title: z.string(),
        order: z.number().optional(),
        // MODIFIED: Make these fields optional
        summary: z.string().optional(),
        thumbnail: z.string().optional(), // Astro Image component handles missing images gracefully if path is invalid/null
        linkedFeedSlug: z.string().optional(),
        // ADDED: New field for separators
        isSeparator: z.boolean().optional(),
    }),
});

// --- Export Collections ---
export const collections = {
  feed,
  general_content,
  highlights,
};