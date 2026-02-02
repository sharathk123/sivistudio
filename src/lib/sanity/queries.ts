import { groq } from 'next-sanity'

// === COLLECTIONS ===
export const collectionsQuery = groq`*[_type == "collection" && status == "live"] | order(displayOrder asc) {
  _id,
  title,
  slug,
  description,
  heroImage,
  editorialTagline,
  status,
  featured,
  displayOrder
}`

export const collectionBySlugQuery = groq`*[_type == "collection" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  heroImage,
  editorialTagline,
  longDescription,
  status,
  featured,
  "craftStories": craftStories[]->{
    _id,
    title,
    slug,
    category,
    excerpt,
    heroImage
  },
  "products": *[_type == "product" && references(^._id)] | order(displayOrder asc) {
    _id,
    title,
    slug,
    description,
    images,
    priceDisplay,
    price,
    availability,
    artisanHours
  }
}`

// === PRODUCTS ===
export const productsQuery = groq`*[_type == "product"] | order(displayOrder asc) {
  _id,
  title,
  slug,
  description,
  images,
  priceDisplay,
  price,
  availability,
  "collections": collections[]->{title, slug},
  technicalSpecs,
  sizes,
  artisanHours,
  featured,
  displayOrder
}`

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  images,
  priceDisplay,
  price,
  availability,
  "collections": collections[]->{
    _id,
    title,
    slug,
    heroImage
  },
  materialStory,
  technicalSpecs,
  sizes,
  artisanHours,
  "craftStories": craftStories[]->{
    _id,
    title,
    slug,
    category,
    excerpt,
    heroImage
  }
}`

// === CRAFT STORIES ===
export const craftStoriesQuery = groq`*[_type == "craftStory"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  category,
  heroImage,
  excerpt,
  publishedAt,
  featured
}`

export const craftStoryBySlugQuery = groq`*[_type == "craftStory" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  heroImage,
  excerpt,
  body,
  publishedAt,
  "relatedCollections": relatedCollections[]->{
    _id,
    title,
    slug,
    heroImage
  },
  "relatedProducts": relatedProducts[]->{
    _id,
    title,
    slug,
    images,
    priceDisplay,
    price,
    availability
  }
}`



// === DEPRECATED: Category ===
// Queries removed as they are no longer used.
