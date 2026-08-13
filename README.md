# Deutsch Drill

A static German training page for:

- adjective declension
- verbs with prepositions

The app has no backend, no external requests, and no scraped dictionary data.
Exercise data is stored locally in `app.js` and the static files under `data/`.
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
- Custom verb training lists with search, bulk paste, and selected-only practice
- Favourite drills with saved-list replay by topic
- Immediate answer scoring for verb practice
- Verb translations in English, Russian, Ukrainian, and Turkish for the starter set
- Mistake-history review for repeated practice

## Checks

Run the no-dependency app checks with:

```bash
npm test
```

## GitHub Pages

The repository includes a GitHub Actions workflow that deploys the static site
to Pages whenever `main` is updated. In the repository settings, set Pages to
use GitHub Actions as the source.

## Local Preview

Open `index.html` in a browser, or serve the folder with any static file server.
