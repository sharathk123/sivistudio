import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'

export default defineType({
    name: 'collection',
    title: 'Collection',
    type: 'document',
    icon: TagIcon,
    groups: [
        { name: 'content', title: 'Content', default: true },
        { name: 'editorial', title: 'Editorial' },
        { name: 'settings', title: 'Settings' },
    ],
    fields: [
        // === CONTENT GROUP ===
        defineField({
            name: 'title',
            title: 'Collection Name',
            description: 'E.g., "Pochampally Ikat", "Kanjivaram Silk"',
            type: 'string',
            validation: (Rule) => Rule.required(),
            group: 'content',
        }),
        defineField({
            name: 'slug',
            title: 'URL Slug',
            description: 'Auto-generated from title. Used in URLs like /collections/pochampally-ikat',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
            group: 'content',
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            description: 'Large banner image for collection page (recommended: 1920x1080px)',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
            group: 'content',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            description: 'Short description shown on collection overview and detail pages',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.max(300),
            group: 'content',
        }),

        // === EDITORIAL GROUP ===
        defineField({
            name: 'editorialTagline',
            title: 'Editorial Tagline',
            description: 'Optional poetic tagline (e.g., "Geometry Woven in Silk")',
            type: 'string',
            group: 'editorial',
        }),
        defineField({
            name: 'longDescription',
            title: 'Long-Form Story',
            description: "Rich editorial content about the collection's heritage and craft",
            type: 'array',
            of: [
                { type: 'block' },
                {
                    type: 'image',
                    options: { hotspot: true },
                },
            ],
            group: 'editorial',
        }),
        defineField({
            name: 'craftStories',
            title: 'Related Craft Stories',
            description: 'Link to long-form editorial articles about techniques, artisans, or heritage',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'craftStory' } }],
            group: 'editorial',
        }),

        // === SETTINGS GROUP ===
        defineField({
            name: 'status',
            title: 'Collection Status',
            description: 'Controls visibility and indexing',
            type: 'string',
            options: {
                list: [
                    { title: 'Upcoming (Hidden, Not Indexed)', value: 'upcoming' },
                    { title: 'Live (Visible, Indexed)', value: 'live' },
                    { title: 'Archive (Hidden from Nav, Indexed)', value: 'archive' },
                ],
                layout: 'radio',
            },
            initialValue: 'upcoming',
            validation: (Rule) => Rule.required(),
            group: 'settings',
        }),
        defineField({
            name: 'featured',
            title: 'Featured Collection',
            description: 'Show this collection prominently on homepage or navigation',
            type: 'boolean',
            initialValue: false,
            group: 'settings',
        }),
        defineField({
            name: 'displayOrder',
            title: 'Display Order',
            description: 'Lower numbers appear first (e.g., 1, 2, 3...)',
            type: 'number',
            validation: (Rule) => Rule.integer().min(0),
            initialValue: 100,
            group: 'settings',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            status: 'status',
            media: 'heroImage',
        },
        prepare(selection: any) {
            const { title, status, media } = selection
            const statusLabels: Record<string, string> = {
                upcoming: '🔒 Upcoming',
                live: '✅ Live',
                archive: '📦 Archive',
            }
            return {
                title,
                subtitle: statusLabels[status] || status,
                media,
            }
        },
    },
    orderings: [
        {
            title: 'Display Order',
            name: 'displayOrder',
            by: [{ field: 'displayOrder', direction: 'asc' }],
        },
        {
            title: 'Status',
            name: 'status',
            by: [{ field: 'status', direction: 'asc' }],
        },
    ],
})
