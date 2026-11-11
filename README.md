# Organiya pantry design review — P, Q, R and shortlist

Temporary static review site for a food identity that can grow beyond snacks.

The root page opens **P — Everyday Pantry**, followed by **Q — Pantry Market** and **R — The Organiya Table**. These three new directions use O’s six styled illustrative product images and rounded cards, with different home, catalog, product detail, About, retailer and Contact layouts.

| Direction | Identity and browsing | Product details |
| --- | --- | --- |
| P — Everyday Pantry | Closest to O; Organiya green, cream, mango and food-family accents; horizontal family browsing | Clear image and product introduction, expandable information and serving ideas |
| Q — Pantry Market | Organised catalog; compact cards, search and a browse rail on desktop | Keyboard-accessible information buttons for overview, serving ideas and product details |
| R — The Organiya Table | Forest, cream and clay; serif typography, larger cards and editorial pages | Larger imagery and numbered product stories |

Organiya green anchors each direction. Snacks use mango accents, planned pulses use leafy tones, spices use terracotta and cookies use cocoa. Both original logo artworks are preserved. Food families have text labels as well as colour cues.

The visible comparison order is **P, Q, R, O, B, D, F, I, K, L, Earlier selected**. A, C, E, G, H, J, M and N are hidden from the chooser, feedback selector and no-script links. Their original standalone prototype files are retained. A root review link requesting a hidden choice opens P.

## Content and behavior

- Organiya is the website identity and India seller. Spicenza is the current snack product brand.
- The six snack concepts are Chia Crunch Sticks, Flax Crunch Sticks, Millet Crunch Crisps, Veggie Crisps, Protein Crunch Mix and Smart Snacking Variety Pack.
- Pulses, spices and cookies are clearly labelled planned ranges. Their family pages lead to context-aware demo inquiries; no future products, recipes, prices or availability are invented.
- Every new option covers Home, catalog, all six product details, About, Distributorship and Contact.
- Category filters, snack search, empty states, mobile menus and keyboard controls work locally.
- Switching designs preserves the current page and product. P/Q/R also preserve the selected food family. Earlier concepts keep their original snack-only experience.
- Images are individually labelled illustrative or as references in earlier concepts. Product photos use 4:5 frames and `object-fit: contain`; decorative imagery may crop.
- Forms validate locally and display “Demo only—nothing was sent.” They clear personal input and do not submit or persist data.
- The feedback worksheet copies notes for reviewers to send through their own channels.

## Implementation and hosting

Semantic HTML, CSS Grid/Flexbox, lightweight JavaScript and shared content within each prototype group. No new design library, application framework, backend, analytics, accounts, payments or production integrations were added.

`p-r/` contains the three new alternatives. `selected/`, `a-c/`, `d-f/`, `g-i/`, `j-l/` and `m-o/` retain the previous prototypes. Root files implement the independent review launcher. Review thumbnails use each option’s own homepage.

This repository contains only shareable prototypes and optimised assets. It remains separate from production Organiya and Spicenza repositories. The public GitHub Pages site asks search engines not to index the temporary previews. To take it offline after review, disable GitHub Pages in this repository’s Settings.
