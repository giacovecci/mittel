// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// Define the schema for the 'twoColumn' block type
const twoColumnBlockSchema = z.object({
    type: z.literal('twoColumn'), // Matches the 'name' in config.yml types list
    left: z.string().optional(), // Markdown content for left column
    right: z.string().optional(), // Markdown content for right column
});

// Define the schema for the 'fullWidthImage' block type
const fullWidthImageBlockSchema = z.object({
    type: z.literal('fullWidthImage'), // Matches the 'name' in config.yml types list
    image: z.string(), // Path to the image (string expected from CMS)
    alt: z.string().optional(), // Alt text for the image
});

// Define the schema for the 'fullWidthEmbed' block type
const fullWidthEmbedBlockSchema = z.object({
    type: z.literal('fullWidthEmbed'), // Matches the 'name' in config.yml types list
    embedCode: z.string(), // Raw HTML embed code
});

// Define the main 'feed' collection
const feedCollection = defineCollection({
    type: 'content', // Default type for Markdown files with frontmatter
    schema: z.object({
        title: z.string(), // Mandatory title
        _styling_note: z.string().optional(),
        date: z.date().optional(), // Optional publish date
        thumbnail: z.string().optional(), // Optional path to thumbnail image for overview grid
        // Define contentBlocks as an array containing a union of the block schemas
        contentBlocks: z.array(
            z.discriminatedUnion('type', [
                twoColumnBlockSchema,
                fullWidthImageBlockSchema,
                fullWidthEmbedBlockSchema,
            ])
        ).optional(), // Make the whole blocks array optional, or default to empty array
        // Note: The 'layout' field from your config.yml is often not needed here
        // unless you specifically use it in Astro's logic. Astro handles layouts separately.
    }),
});

// Export a single 'collections' object to register our collection(s)
export const collections = {
    'feed': feedCollection,
};