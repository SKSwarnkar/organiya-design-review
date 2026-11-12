# Finalized Option O: content editing guide

Revision 10 — upcoming snack range, plain HTML/CSS/JavaScript, maintained through Codex.
The launch plan is `../launch-plan.html`. No Astro, Decap, Sanity or application backend is required now.

The review is public, but it is still a design review: forms validate locally and send/save nothing. Production domain/DNS remain unchanged. Production will publish an upcoming-products introduction before final SKU/pricing data exists.

## Files to edit

| Content | File |
| --- | --- |
| Identity, contact, announcement, launch phase and notices | `content/site.json` |
| Home, story, page introductions and family occasions | `content/pages.json` |
| Product names/copy, status, card image, ordered gallery, future details | `content/products.json` |
| Source image dimensions | `content/media.json` |
| Option O palette | `styles/food.css` |
| Shared cards, navigation, footer and form | `scripts/components.js` |
| Page compositions and image interaction | `scripts/pages/*`, `scripts/gallery.js` |

Copy is escaped. Structured arrays of lines or `{text, emphasis}` support formatting without executable HTML. Utility/form copy is in shared components; production extraction into content settings is part of the build plan.

## Upcoming phase

`site.launchPhase` is `upcoming`; `commerceEnabled` is false. Product status is `upcoming`. Show “In the making” and explain that the range is not available to order. SKUs and prices are not a condition of this introductory release. Do not claim a licence has been issued, invent final ingredients, or present illustrations as actual retail-pack photos.

Each product has nullable `sku`, `price`, `availability`, `labelVersion`, `ingredients`, `allergens`, `nutrition`, plus `packSizes: []`, `detailsApproved: false` and `claims: []`. Stable slugs remain unchanged. The public mix display name is “Crunch Mix” pending substantiation of protein positioning; its historical slug is retained for shared links.

After licensing and product finalisation, populate approved facts, change the relevant product status, and review/publish the content release. The production build will validate required fields for the announced phase separately from upcoming introductions. Activating ordering is a separate future project; neither adding a licence number nor price enables checkout.

## Gallery and media contract

```json
{
  "id": "product-slug-front-v1",
  "kind": "front",
  "label": "Pouch front",
  "src": "approved-front.webp",
  "alt": "Describe the approved package",
  "caption": "Approved India packaging",
  "status": "approved"
}
```

All files are relative to `assets/`. `content/media.json` records each source width and height. Gallery stages and thumbnails follow these dimensions and display the full image. A landscape source gets a landscape frame, never blank bars inside a portrait frame. Full-size opening remains available.

Catalog cards retain the chosen 4:5 design. Supply an image composed at 4:5, check dimensions within rounding tolerance, and preserve the product/packaging. Do not use `object-fit: cover` as a substitute for commissioning the right image: current cover handling removes only pixel rounding for verified portrait sources. Future packaging should be framed natively or professionally composed at the required card ratio without clipping it.

The renderer accepts `approved` images; `illustrative` is allowed for styled, pairing and lifestyle scenes only. Draft/pending front, back, nutrition and ingredient records never render. `pendingMedia` is a checklist, not a source of placeholders.

Current images: eight 1000 × 1250 WebP illustrations. Six were newly generated from product-reference photos, two reused from the supplied library. Both family scenes appear on Our Story and in galleries; the American scene does not change the India-only launch scope. The assortment image illustrates a serving selection, not committed pack contents. Captions distinguish generated styling from actual products.

See `../image-production-plan.json` for paths, hashes, provenance and all retained prompts. Original private source photos and generation masters are not copied into the production build. Keep obsolete review assets out of the production asset allowlist.

## Claims and label data

No claims currently render. Any future claim needs approved text, basis and evidence reference matched to the current formulation and label version. Keep the evidence itself private. Product nutrition/ingredient artwork must be supplied and approved, never generated. Provide equivalent accessible text.

## Editing and release

1. Request a specific text/image change through Codex.
2. Edit the relevant JSON record, add the image, update dimensions; retain stable IDs.
3. Validate syntax, assets, phase rules and page links.
4. Review mobile/desktop layout, search, gallery and product-to-contact context.
5. Commit and publish the reviewed version; retain a rollback release.

Production builds will emit ordinary HTML at real routes with useful no-JavaScript content. The review’s query-string router is not the production SEO architecture. A later Decap UI can map these structured files after authentication is configured; Astro would be an optional template/build migration.
