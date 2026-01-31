# Cloudinary Migration Plan (Page-by-Page)

This plan outlines the systematic migration of local images to Cloudinary, ensuring stability and verification at each step.

## Phase 1: Preparation & Configuration
- [x] **Infrastructure Update**: 
    - Change `CLOUDINARY_FOLDER` in `src/lib/images.ts` to `sivi-studio`.
    - Ensure `cloudinaryUrl` helper is correctly prepending the folder.
- [x] **Mass Upload**: 
    - Use the `scripts/upload-to-cloudinary.js` to upload all files from `public/images/` to the `sivi-studio` folder.
    - Path in Cloudinary: `sivi-studio/**/*`

## Phase 2: Implementation (Section-by-Section)

### 1. Global & Landing Page
- **Components**: `EditorialHero`, `NavigationOverlay`, `HeritageMarquee` (additional items).
- **Update**: Switch `src/lib/images.ts` constants for Hero Ikat, Modern Vibrant, etc., back to using the `cloudinaryUrl()` helper. [COMPLETED]
- **Verification**: Check http://localhost:3000/ hero section and menu previews.

### 2. Heritage Page
- **Data**: `src/data/heritageData.ts`.
- **Update**: Revert the local paths for the 8 weaves back to using the `cloudinaryUrl` pattern. [COMPLETED via src/lib/images.ts update]
- **Verification**: Check http://localhost:3000/heritage/ and click through all 8 weaves.

### 3. Brand Story Page
- **File**: `src/app/(editorial)/story/page.tsx`.
- **Update**: Wrap local strings in `cloudinaryUrl()` or update `IMAGES` keys. [COMPLETED via src/lib/images.ts update]
- **Verification**: Check http://localhost:3000/story/.

### 4. Custom Tailoring
- **File**: `src/app/custom-tailoring/page.tsx`.
- **Update**: Update the gallery images and hero background. [COMPLETED via src/lib/images.ts update]
- **Verification**: Check http://localhost:3000/custom-tailoring/.

### 5. Shop & Studio
- **File**: `src/app/shop/page.tsx` and Landing Page "Essence" section.
- **Update**: `collection-studio`, `contemporary-dress`, and product thumbnails. [COMPLETED via src/lib/images.ts update]
- **Verification**: Check the shop grid.

### 6. Support Pages
- **Files**: `src/app/contact/page.tsx`, `src/components/account/`.
- **Update**: Contact background and account profile placeholders. [COMPLETED via src/lib/images.ts update]
- **Verification**: Check contact and account pages.

## Phase 3: Final Verification
- [x] **Build Check**: Run `npm run build` to ensure no image optimization errors. [COMPLETED]
- [x] **Network Audit**: Verified via `test-cloudinary-access.js` script. [COMPLETED]
- [ ] **Cleanup**: Once verified in production, the `public/images/` folder can be pruned (optional, keep as backup).

---
**Current Status**: 🟢 Cloudinary Migration & Verification Complete | 🚀 Ready for Production
