// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// --- Block Schemas (Used by 'feed' collection) ---
// ... (Block schemas remain the same) ...
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
        contentType: z.enum(['TV News', 'Documentary', 'Audio', 'Press']).optional(),
        // MODIFICATION: Added clientName and myRole
        clientName: z.string().optional(),
        myRole: z.array(z.string()).optional(), // Array of strings for roles
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
// ... (clientLogoSchema remains the same) ...
const clientLogoSchema = z.object({
    image: z.string(),
    alt: z.string(),
    link: z.string().url().optional(),
    name: z.string().optional(),
    alreadySuitsDarkMode: z.boolean().optional(),
});

// --- Collection Definition: general_content ---
// ... (general_content schema remains the same) ...
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
// ... (highlights schema remains the same) ...
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