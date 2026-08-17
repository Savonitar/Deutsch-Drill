<p align="center">
  <a href="https://savonitar.github.io/Deutsch-Drill/">
    <img src="assets/deutsch-drill-logo.png" alt="Deutsch Drill logo: a detailed badge with der, die, das tags and a drill bit" width="136">
  </a>
</p>

# Deutsch Drill

**Live app:** [savonitar.github.io/Deutsch-Drill](https://savonitar.github.io/Deutsch-Drill/)

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

## Feedback

Found a bug or have an idea?

- [Report a bug](https://github.com/Savonitar/Deutsch-Drill/issues/new?template=bug_report.yml)
- [Request a feature](https://github.com/Savonitar/Deutsch-Drill/issues/new?template=feature_request.yml)
- [Star the project](https://github.com/Savonitar/Deutsch-Drill) if Deutsch Drill is useful to you

## Checks

Run the no-dependency app checks with:

```bash
npm test
```

## GitHub Pages

The public app is available at:

<https://savonitar.github.io/Deutsch-Drill/>

The repository includes a GitHub Actions workflow that deploys the static site
to Pages whenever `main` is updated. In the repository settings, set Pages to
use GitHub Actions as the source.

## Local Preview

Open `index.html` in a browser, or serve the folder with any static file server.
