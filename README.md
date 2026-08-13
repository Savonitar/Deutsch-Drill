# Deutsch Drill

A static German training page for:

- adjective declension
- verbs with prepositions

The app has no backend, no external requests, and no scraped dictionary data.
All exercise data is hand-authored or derived from grammar tables in `app.js`.
Progress is stored locally in the browser with `localStorage`.

## Training Modes

- Adjective full-word forms, such as `guten`
- Adjective ending-only forms, such as `-en`
- Adjective case recognition from completed sentences
- Adjective article-pattern recognition
- Adjective gender/number recognition
- Verb missing-preposition questions
- Verb preposition-case questions
- Full verb-pattern recognition, such as `warten auf + Akkusativ`
- Mistake-history review for repeated practice

## GitHub Pages

1. Create a repository.
2. Put `index.html`, `styles.css`, `app.js`, and `.nojekyll` in the repository root.
3. Enable GitHub Pages from the repository settings.
4. Select the root of the main branch as the publishing source.

## Local Preview

Open `index.html` in a browser, or serve the folder with any static file server.
