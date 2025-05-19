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

// --- Define a schema for client logos ---
const clientLogoSchema = z.object({
    image: z.string(),
    alt: z.string(),
    link: z.string().url().optional(),
    name: z.string().optional(),
    alreadySuitsDarkMode: z.boolean().optional(), // ADDED: Flag for dark mode suitability
});

// --- Collection Definition: general_content ---
const general_content = defineCollection({
    type: 'content',
    schema: z.object({
        introText: z.string().optional(),
        aboutPageContent: z.string().optional(),
        contactPageImage: z.string().optional(),
        contactPageImageAlt: z.string().optional(),
        contactPageText: z.string().optional(),
        landingPageBackgroundImage: z.string().optional(),
        landingPageBackgroundImageAlt: z.string().optional(),
        landingPageSiteName: z.string().optional(),
        landingPageTagline: z.string().optional(),
        landingPageLocation: z.string().optional(),
        clientLogos: z.array(clientLogoSchema).optional(),
    }).passthrough(),
});

// --- Collection Definition: highlights ---
const highlights = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        order: z.number().optional(),
        summary: z.string().optional(),
        thumbnail: z.string().optional(),
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