# Finalized O content guide

This is the modular review prototype. The launch plan is `../launch-plan.html`.
The public site is still a demonstration: inquiry forms send nothing, and images are labelled illustrative.

## Files to edit

| Content | File |
| --- | --- |
| Site identity, public email, navigation, categories | `content/site.json` |
| Home copy/hero, story sections, catalog and contact/trade introductions, snack occasions | `content/pages.json` |
| Product names/copy, card images, galleries, serving suggestions, facts | `content/products.json` |
| O palette | `styles/food.css` — preserve the approved `.design-o` values |
| Layout/interaction | `scripts/pages/*`, `scripts/components.js`, `scripts/gallery.js` |

Page copy is escaped. Home and Story use arrays of lines or `{text, emphasis}` entries instead of executable HTML. Some shared form and utility copy remains in the components and will move to production settings during CMS integration.

## Gallery contract

Each product keeps its original `image` for catalog cards. `gallery` is an ordered array, independent of the card image:

```json
{
  "id": "stable-asset-id",
  "kind": "front",
  "label": "Pouch front",
  "src": "approved-file.webp",
  "alt": "Describe the actual approved package",
  "caption": "Approved India packaging",
  "status": "approved"
}
```

Supported editorial roles: styled, front, back, nutrition, ingredients, family, lifestyle and pairing.
All files are relative to `assets/`. Keep package and label images fully visible; the gallery uses a 4:5 contain frame and full-size opening.
The public renderer accepts approved assets; illustrative status is limited to styled/pairing/lifestyle images. Missing, draft or pending records are not shown.
`pendingMedia` is an editorial checklist with no file references and never produces public thumbnails.

No pouch artwork, nutrition panel or family photo has been fabricated. The three current views per product are serving/occasion illustrations.

## Product claims and label data

The current `claims` arrays are empty. Rendered claims must have `approved: true`, `text`, `basis` and a private-system `evidenceRef`. Do not put raw lab reports or private evidence into this public repository.
`nutrition`, `ingredients` and `allergens` are currently null, reflecting missing approved label data. Production schemas must require the agreed content and invalidate claim approval when formulation/label versions change.

## Safe editing workflow

Change the appropriate JSON record, preserve stable IDs/slugs, add the image file, run syntax/asset checks and review desktop/mobile layouts. Commit the approved change and let the hosting build publish it. Do not upload credentials or inquiry records.
A browser-based content editor, preview/publish permissions and real inquiry endpoints belong to the production launch tranche; they are not implemented here.
