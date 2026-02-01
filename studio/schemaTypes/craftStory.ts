import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export default defineType({
    name: 'craftStory',
    title: 'Craft Story',
    type: 'document',
    icon: DocumentTextIcon,
    description: 'Long-form editorial content about weaving techniques, artisan heritage, or textile traditions',
    groups: [
        { name: 'content', title: 'Content', default: true },
        { name: 'settings', title: 'Settings' },
    ],
    fields: [
        // === CONTENT GROUP ===
        defineField({
            name: 'title',
            title: 'Story Title',
            description: 'E.g., "The Art of Pochampally Ikat", "Natural Dyes of Telangana"',
            type: 'string',
            validation: (Rule) => Rule.required(),
            group: 'content',
        }),
        defineField({
            name: 'slug',
            title: 'URL Slug',
            description: 'Auto-generated from title. Used in URLs like /craft-stories/art-of-pochampally-ikat',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
            group: 'content',
        }),
        defineField({
            name: 'category',
            title: 'Story Category',
            description: 'Classify the type of story',
            type: 'string',
            options: {
                list: [
                    { title: 'Weaving Technique', value: 'weaving' },
                    { title: 'Artisan Heritage', value: 'heritage' },
                    { title: 'Natural Dyes & Materials', value: 'materials' },
                    { title: 'Regional Craft', value: 'regional' },
                    { title: 'Contemporary Innovation', value: 'innovation' },
                ],
            },
            validation: (Rule) => Rule.required(),
            group: 'content',
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            description: 'Large banner image for the story (recommended: 1920x1080px)',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alt Text',
                    description: 'Describe the image for accessibility',
                },
            ],
            validation: (Rule) => Rule.required(),
            group: 'content',
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            description: 'Short summary shown in story listings (2-3 sentences)',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required().max(300),
            group: 'content',
        }),
        defineField({
            name: 'body',
            title: 'Story Content',
            description: 'Long-form editorial content with rich formatting',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'Heading 2', value: 'h2' },
                        { title: 'Heading 3', value: 'h3' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alt Text',
                        },
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Caption',
                        },
                    ],
                },
            ],
            validation: (Rule) => Rule.required(),
            group: 'content',
        }),
        defineField({
            name: 'relatedCollections',
            title: 'Related Collections',
            description: 'Link to collections that feature this craft technique',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'collection' } }],
            group: 'content',
        }),
        defineField({
            name: 'relatedProducts',
            title: 'Featured Products',
            description: 'Showcase specific products that exemplify this craft story',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'product' } }],
            group: 'content',
        }),

        // === SETTINGS GROUP ===
        defineField({
            name: 'publishedAt',
            title: 'Published Date',
            description: 'When this story was published',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
            group: 'settings',
        }),
        defineField({
            name: 'featured',
            title: 'Featured Story',
            description: 'Highlight this story on homepage or journal section',
            type: 'boolean',
            initialValue: false,
            group: 'settings',
        }),
        defineField({
            name: 'seo',
            title: 'SEO Metadata',
            description: 'Optional custom SEO fields (defaults to title/excerpt if not set)',
            type: 'object',
            fields: [
                {
                    name: 'metaTitle',
                    type: 'string',
                    title: 'Meta Title',
                    validation: (Rule) => Rule.max(60),
                },
                {
                    name: 'metaDescription',
                    type: 'text',
                    title: 'Meta Description',
                    rows: 2,
                    validation: (Rule) => Rule.max(160),
                },
            ],
            group: 'settings',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            category: 'category',
            media: 'heroImage',
            publishedAt: 'publishedAt',
        },
        prepare(selection: any) {
            const { title, category, media, publishedAt } = selection
            const categoryLabels: Record<string, string> = {
                weaving: '🧵 Weaving',
                heritage: '🏛️ Heritage',
                materials: '🌿 Materials',
                regional: '🗺️ Regional',
                innovation: '💡 Innovation',
            }
            return {
                title,
                subtitle: `${categoryLabels[category] || category} • ${publishedAt ? new Date(publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' }) : 'Draft'}`,
                media,
            }
        },
    },
    orderings: [
        {
            title: 'Published Date (Newest First)',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
        {
            title: 'Category',
            name: 'category',
            by: [{ field: 'category', direction: 'asc' }],
        },
    ],
})
