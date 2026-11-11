# Nibbly v2.0.5 — Watchdog & Practice Polish

This release extends the global boot watchdog from 40s to 60s to avoid false positives on slow connections, and unifies the vector iconography in the Practice tab. No breaking changes, no data migration, no new files.

## ✨ Added

· SVG icons in the 4 Practice action buttons (New exercise, Reset, Verify, Download CSV).
· SVG icons in the 3 collapsible summaries (How to calculate, Scratchpad, Mini calculator).
· `stripLeadingEmoji()` helper in practice.js to strip the emoji from the title without touching i18n.
· Emoji fallback on every `icon()` call in case `NibblyIcons` hasn't loaded yet.

## 🔧 Under the hood

· `GLOBAL_TIMEOUT` from 40000 → 60000 in index.html.
· 5 textual "40s" → "60s" references (fallbacks, log, buildErrorReport).
· `INIT_TIMEOUT_MS` (30s) unchanged.
· 2 new CSS blocks in practice.css (action buttons + summaries).
· Version bumped to 2.0.5 across the project.
· No data migration needed; settings remain in nibbly-settings-v2.
· No new files: only index.html, practice.js and practice.css are modified.