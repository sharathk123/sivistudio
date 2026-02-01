import { StructureBuilder } from 'sanity/structure'
import { TagIcon, PackageIcon, DocumentTextIcon, BookIcon } from '@sanity/icons'

export const structure = (S: StructureBuilder) =>
    S.list()
        .title('Sivi Studio')
        .items([
            // === COLLECTIONS SECTION ===
            S.listItem()
                .title('Collections')
                .icon(TagIcon)
                .child(
                    S.documentTypeList('collection')
                        .title('Collections')
                        .filter('_type == "collection"')
                        .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
                        .child((documentId) =>
                            S.document()
                                .documentId(documentId)
                                .schemaType('collection')
                        )
                ),

            // === PRODUCTS SECTION ===
            S.listItem()
                .title('Products')
                .icon(PackageIcon)
                .child(
                    S.list()
                        .title('Products')
                        .items([
                            // All Products
                            S.listItem()
                                .title('All Products')
                                .icon(PackageIcon)
                                .child(
                                    S.documentTypeList('product')
                                        .title('All Products')
                                        .filter('_type == "product"')
                                        .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
                                ),

                            S.divider(),

                            // By Availability
                            S.listItem()
                                .title('In Stock')
                                .icon(PackageIcon)
                                .child(
                                    S.documentTypeList('product')
                                        .title('In Stock')
                                        .filter('_type == "product" && availability == "in_stock"')
                                ),
                            S.listItem()
                                .title('Made to Order')
                                .icon(PackageIcon)
                                .child(
                                    S.documentTypeList('product')
                                        .title('Made to Order')
                                        .filter('_type == "product" && availability == "made_to_order"')
                                ),
                            S.listItem()
                                .title('Sold Out')
                                .icon(PackageIcon)
                                .child(
                                    S.documentTypeList('product')
                                        .title('Sold Out')
                                        .filter('_type == "product" && availability == "sold_out"')
                                ),
                        ])
                ),

            // === EDITORIAL SECTION ===
            S.divider(),
            S.listItem()
                .title('Editorial')
                .icon(BookIcon)
                .child(
                    S.list()
                        .title('Editorial Content')
                        .items([
                            // Craft Stories
                            S.listItem()
                                .title('Craft Stories')
                                .icon(DocumentTextIcon)
                                .child(
                                    S.documentTypeList('craftStory')
                                        .title('Craft Stories')
                                        .filter('_type == "craftStory"')
                                        .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                                ),

                            S.divider(),

                            // By Category
                            S.listItem()
                                .title('Weaving Techniques')
                                .child(
                                    S.documentTypeList('craftStory')
                                        .title('Weaving Techniques')
                                        .filter('_type == "craftStory" && category == "weaving"')
                                ),
                            S.listItem()
                                .title('Artisan Heritage')
                                .child(
                                    S.documentTypeList('craftStory')
                                        .title('Artisan Heritage')
                                        .filter('_type == "craftStory" && category == "heritage"')
                                ),
                            S.listItem()
                                .title('Natural Dyes & Materials')
                                .child(
                                    S.documentTypeList('craftStory')
                                        .title('Natural Dyes & Materials')
                                        .filter('_type == "craftStory" && category == "materials"')
                                ),
                            S.listItem()
                                .title('Regional Crafts')
                                .child(
                                    S.documentTypeList('craftStory')
                                        .title('Regional Crafts')
                                        .filter('_type == "craftStory" && category == "regional"')
                                ),
                            S.listItem()
                                .title('Contemporary Innovation')
                                .child(
                                    S.documentTypeList('craftStory')
                                        .title('Contemporary Innovation')
                                        .filter('_type == "craftStory" && category == "innovation"')
                                ),

                            S.divider(),

                            // Legacy Editorial
                            S.listItem()
                                .title('Legacy Editorial (Deprecated)')
                                .icon(DocumentTextIcon)
                                .child(
                                    S.documentTypeList('editorial')
                                        .title('Legacy Editorial Stories')
                                        .filter('_type == "editorial"')
                                ),
                        ])
                ),

            // === DEPRECATED CATEGORY (Hidden from main nav) ===
            // Note: category.ts is deprecated - use collection.ts instead
            // Keeping it in schema for backward compatibility but hiding from UI
        ])

export default structure
