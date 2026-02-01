import { defineField, defineType } from 'sanity'
import { PackageIcon } from '@sanity/icons'

export default defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    icon: PackageIcon,
    groups: [
        { name: 'essential', title: 'Essential', default: true },
        { name: 'pricing', title: 'Pricing & Availability' },
        { name: 'craft', title: 'Craft Story' },
        { name: 'media', title: 'Media' },
        { name: 'settings', title: 'Settings' },
    ],
    fields: [
        // === ESSENTIAL GROUP ===
        defineField({
            name: 'title',
            title: 'Product Name',
            description: 'E.g., "Indigo Ikat Kurta", "Handwoven Kanjivaram Saree"',
            type: 'string',
            validation: (Rule) => Rule.required(),
            group: 'essential',
        }),
        defineField({
            name: 'slug',
            title: 'URL Slug',
            description: 'Auto-generated from title. Used in URLs like /products/indigo-ikat-kurta',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
            group: 'essential',
        }),
        defineField({
            name: 'description',
            title: 'Short Description',
            description: 'Brief description shown on product cards (2-3 sentences)',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.max(300),
            group: 'essential',
        }),
        defineField({
            name: 'collections',
            title: 'Collections',
            description: 'Assign this product to one or more collections (e.g., Pochampally Ikat, Summer 2026)',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'collection' } }],
            validation: (Rule) => Rule.required().min(1),
            group: 'essential',
        }),

        // === PRICING & AVAILABILITY GROUP ===
        defineField({
            name: 'priceDisplay',
            title: 'Price Display Type',
            description: 'How should pricing be shown to customers?',
            type: 'string',
            options: {
                list: [
                    { title: 'Show Numeric Price', value: 'numeric' },
                    { title: 'Price on Request', value: 'on_request' },
                ],
                layout: 'radio',
            },
            initialValue: 'numeric',
            validation: (Rule) => Rule.required(),
            group: 'pricing',
        }),
        defineField({
            name: 'price',
            title: 'Price (INR)',
            description: 'Only required if "Show Numeric Price" is selected above',
            type: 'number',
            validation: (Rule) =>
                Rule.custom((price, context) => {
                    const priceDisplay = (context.document as any)?.priceDisplay
                    if (priceDisplay === 'numeric' && !price) {
                        return 'Price is required when display type is "Show Numeric Price"'
                    }
                    return true
                }),
            group: 'pricing',
        }),
        defineField({
            name: 'availability',
            title: 'Availability Status',
            description: 'Current stock status',
            type: 'string',
            options: {
                list: [
                    { title: 'In Stock (Ready to Ship)', value: 'in_stock' },
                    { title: 'Made to Order (2-4 weeks)', value: 'made_to_order' },
                    { title: 'Sold Out', value: 'sold_out' },
                ],
                layout: 'radio',
            },
            initialValue: 'made_to_order',
            validation: (Rule) => Rule.required(),
            group: 'pricing',
        }),

        // === CRAFT STORY GROUP ===
        defineField({
            name: 'materialStory',
            title: 'Material & Craft Story',
            description: 'Rich editorial content about the fabric, weave technique, and artisan heritage',
            type: 'array',
            of: [
                { type: 'block' },
                {
                    type: 'image',
                    options: { hotspot: true },
                },
            ],
            group: 'craft',
        }),
        defineField({
            name: 'technicalSpecs',
            title: 'Technical Specifications',
            description: 'Fabric details (e.g., "60s Count Cotton", "Pure Mulberry Silk")',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Label', validation: (Rule) => Rule.required() },
                        { name: 'value', type: 'string', title: 'Value', validation: (Rule) => Rule.required() },
                    ],
                    preview: {
                        select: {
                            label: 'label',
                            value: 'value',
                        },
                        prepare({ label, value }) {
                            return {
                                title: `${label}: ${value}`,
                            }
                        },
                    },
                },
            ],
            group: 'craft',
        }),
        defineField({
            name: 'artisanHours',
            title: 'Artisan Hours',
            description: 'Approximate hours of handwork (e.g., 120). Shown as "120+ Artisan Hours"',
            type: 'number',
            validation: (Rule) => Rule.integer().min(0),
            group: 'craft',
        }),
        defineField({
            name: 'craftStories',
            title: 'Related Craft Stories',
            description: 'Link to long-form editorial articles about the weaving technique or heritage',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'craftStory' } }],
            group: 'craft',
        }),

        // === MEDIA GROUP ===
        defineField({
            name: 'images',
            title: 'Product Images',
            description: 'Upload multiple images. First image is the primary thumbnail.',
            type: 'array',
            of: [
                {
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
                },
            ],
            validation: (Rule) => Rule.required().min(1),
            group: 'media',
        }),

        // === SETTINGS GROUP ===
        defineField({
            name: 'featured',
            title: 'Featured Product',
            description: 'Highlight this product on homepage or collection pages',
            type: 'boolean',
            initialValue: false,
            group: 'settings',
        }),
        defineField({
            name: 'displayOrder',
            title: 'Display Order',
            description: 'Lower numbers appear first within collections (e.g., 1, 2, 3...)',
            type: 'number',
            validation: (Rule) => Rule.integer().min(0),
            initialValue: 100,
            group: 'settings',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            availability: 'availability',
            media: 'images.0',
        },
        prepare({ title, availability, media }) {
            const availabilityLabel = {
                in_stock: '✅ In Stock',
                made_to_order: '⏳ Made to Order',
                sold_out: '❌ Sold Out',
            }[availability] || availability
            return {
                title,
                subtitle: availabilityLabel,
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
            title: 'Availability',
            name: 'availability',
            by: [{ field: 'availability', direction: 'asc' }],
        },
    ],
})
