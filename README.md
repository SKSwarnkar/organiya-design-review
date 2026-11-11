# Organiya design review — finalized Option O

Option O is the chosen direction for a snack-only India catalog and inquiry launch. The root review opens **Finalized O — Mango & Pistachio** from `final-o/`.

Its mango/pistachio palette, cards, home composition and product artwork are retained. The announcement now reads “Good food. Everyday possibilities.” on a deeper pistachio band (#B4C77B) with dark green text (#2F4A28). The bounded refinements add catalog search, a modular multi-image product gallery, an enlarged image view, serving-moment cards and a clearer snack-focused Our Story page.

- `launch-plan.html` is the comprehensive production plan: pages, actual-SKU approval, a visual inventory of all nine existing illustrations, new image briefs, asset/claim readiness, content model, editor, inquiry delivery, costs, phases, a record-specific DNS cutover/rollback runbook, QA and operations.
- `image-production-plan.json` records the existing files, dimensions, hashes, known prompts/provenance and seven possible new scenes. These are planning/preview records, not production approvals.
- `final-o/content/` holds site settings, page copy and product/gallery records. `final-o/CONTENT-GUIDE.md` explains editing and media approval.
- The prototype uses semantic HTML, CSS and JavaScript modules. The proposed production stack is Astro, a content editor and static hosting, as detailed in the plan; those integrations are not claimed complete.
- Product galleries show approved or clearly illustrative assets only. Unprovided pouch, nutrition, ingredients and family images are kept out of the rendered gallery. No numeric nutrition claims are invented.
- Organiya is the India seller and website identity. Spicenza is the snack brand. No future-category navigation appears in the finalized O customer pages.
- Inquiry forms remain local demonstrations: no submissions or personal-data persistence. Production is catalog + real inquiries first; no checkout or payment integration in this tranche.
- The review launcher and launch plan remain separate from customer-facing layouts.

The visible reference order is O, P, Q, R, B, D, F, I, K, L, Earlier selected. A, C, E, G, H, J, M and N remain hidden in the chooser and feedback selector. The older `m-o/` O has the matching announcement update so previously shared links remain consistent; M/N and other historical directions retain their styling and content.

This is temporary public GitHub Pages review hosting, separate from both production repositories. Production DNS, email, live forms, databases and Spicenza runtime are unchanged. Search engines are asked not to index these previews. Disable GitHub Pages in repository Settings to take the review offline.
