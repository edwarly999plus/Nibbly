# Nibbly v2.0.6 — The Games & Logic Expansion

This major feature release introduces the new **Cube Run** and **Snake** games, adds a complete visualizer and wave maker to **Logic Gates**, brings **Native Windows support** (x86 & x64 via WebView2), and introduces a new **Audio Ducking** system for background music.

No breaking changes for the core app, but two new games and new audio assets are added to the expansion packs.

## 🌟 Highlights

· 🪟 **Windows Native Port:** x64 & x86 releases using Edge WebView2.
· 🎮 **Cube Run:** Endless runner with shop, skins, and audio ducking.
· 🐍 **Snake:** 3 difficulties, grace delay, and input queue.
· 🌊 **Logic Gates:** Waves visualizer and interactive Wave Maker.
· 🎵 **Cubic Nibbly:** New track added to the Player and Cube Run.
· 🌐 **Download Page:** Nightly releases, Windows cards, and dynamic OS glow.
· 🎵 **Player:** "Cubic Nibbly" added to the playlist.

## ✨ Added

### Games Suite
· **Cube Run (v2.1.5):** Endless runner inspired by Geometry Dash. 3 difficulties (1, 2, 3 spikes). Skin shop with 6 faces. Coins spawn in safe horizontal lines. Audio ducking for background music. Particle explosions and a 3s resume countdown. Local persistence for records, coins, and skins.
· **Snake (v1.5.1):** 3 difficulties. "Grace" system (0.2s delay before dying on walls/tails). Input queue for fluid quick turns. Particle effects. Local persistence for high score.

### Logic Gates (v1.7.0)
· **Waveforms Tab:** Visualizes A, B, and Y signals with a time grid.
· **Wave Maker:** Interactive grid to draw signals with presets and JSON/SVG/PNG export.
· **Basic Concepts:** Expandable cards explaining waveform timing.
· **ANSI/IEEE Builder:** Real gate shapes (D-shape, shield, triangle).
· **Vector Icons:** Replaced emojis with inline SVGs.

### Platforms & Tools
· **Windows Native Port:** x64 & x86 builds using Edge WebView2. Installer handles missing runtime automatically.
· **Download Page:** Added Windows download cards. New purple "Nightly Releases" dropdown. Dynamic green glow adapts to the user's OS (Windows or Web).
· **Player:** Added "Cubic Nibbly" to the music playlist.

## 🔧 Under the hood

· **Icons:** Added ~30 new SVG icons to `icons.js`.
· **CSS:** `games.css` uses `overflow-x: auto` for tabs. All games respect `body.no-effects` (disabling particles and heavy shadows).
· **Audio:** Added `mus/Cubic Nibbly.ogg` to the File Checker in `config.js`.
· **Version:** Bumped to `2.0.6` across the project.
· **Files:** Added `snake.js`, `cube-run.js`, and `Cubic Nibbly.ogg`.

## 📦 New files

· `expansions/expansion-pack-1/games/snake.js`
· `expansions/expansion-pack-1/games/cube-run.js`
· `mus/Cubic Nibbly.ogg`

## 📥 Installation

### 🪟 Windows (Native)
1. Download `Nibbly-v2.0.6-Win64.zip` or `Nibbly-v2.0.6-Win32.zip`.
2. Extract and run `Nibbly.exe`.
3. WebView2 will install automatically if missing.

### 📱 Android
1. Download `Nibbly-v2.0.6.apk`.
2. Enable "Install apps from unknown sources".
3. Install and open.

### 🍏 iOS
1. Download `Nibbly.mobileconfig` using Safari.
2. Install the profile via Settings > General > VPN & Device Management.

## ⚠️ Upgrade notes

**From v2.0.5**
· No data migration needed. Settings remain in `nibbly-settings-v2`.
· If compiling for Android/iOS, you must add the new files (`snake.js`, `cube-run.js`, and `Cubic Nibbly.ogg`) to the build directory.

**From v2.0.4 or earlier**
· Check Settings after the first launch.
· Ensure `expansions/expansion-pack-2/` is fully up to date.