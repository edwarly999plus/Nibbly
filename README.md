<p align="center">
  <img src="https://github.com/edwarly999plus/Nibbly/blob/main/img/Nibbly%20Logo.png" alt="Nibbly Logo" width="160" height="160">
</p>

<h1 align="center">Nibbly</h1>

<p align="center">
  <b>The all-in-one converter for Android</b><br>
  Bases · Text · Morse · Bits · Power · Multimedia · Calculator · Drawing · Games · Private Mode
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.4-5b8cff?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/Android-6.0%2B-3ddc84?style=for-the-badge&logo=android&logoColor=white" alt="Android">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/license-Apache%202.0-22d3a6?style=for-the-badge" alt="License">
</p>

<p align="center">
  <a href="https://github.com/edwarly999plus/Nibbly/releases/latest">
    <img src="https://img.shields.io/badge/⬇_Download_APK-Releases-5b8cff?style=for-the-badge&logo=android&logoColor=white" alt="Download APK">
  </a>
  <a href="https://edwarly999plus.github.io/Nibbly/">
    <img src="https://img.shields.io/badge/▶_Try_Online-GitHub_Pages-22d3a6?style=for-the-badge&logo=github&logoColor=white" alt="Try Online">
  </a>
  <a href="https://edwarly999plus.github.io/Nibbly/player.html">
    <img src="https://img.shields.io/badge/🎵_Music_Player-5b8cff?style=for-the-badge" alt="Music Player">
  </a>
</p>

---

## 📥 Download

> **⚡ Pre-built APK available at [Releases](https://github.com/edwarly999plus/Nibbly/releases/latest)**

The APK includes the HTML already built and ready to run. **No internet connection required** once installed.

**🎵 The background music (`mus/You Are Nibbled.ogg`) is already bundled inside the APK**, so you can enable it from Settings **without needing an internet connection** from the very first launch. On the **web/PC version**, the `.ogg` file **is not included** (PCs usually have home internet with a stable connection); the music is downloaded automatically the first time you enable it (usually in <5s) and stays cached for future use.

You can also listen to it right here directly without downloading anything.

<a href="https://edwarly999plus.github.io/Nibbly/player.html">
  <img src="https://img.shields.io/badge/🎵_Listen_Now-5b8cff?style=for-the-badge" alt="Music Player">
</a>

### ⚠️ Important requirement

The app uses the **Android System WebView** (or Chrome) to render the interface.

- **Android 6.0 (Marshmallow) or higher** ✅
- **Android System WebView** installed and up to date ✅
- On most modern devices it **comes preinstalled**

If the app shows a blank screen, update **Android System WebView** from the Play Store or install **Chrome**.

<p align="center">
  <a href="https://play.google.com/store/apps/details?id=com.google.android.webview">
    <img src="https://img.shields.io/badge/Update_WebView-Play_Store-3ddc84?style=for-the-badge&logo=google-play&logoColor=white" alt="Update WebView">
  </a>
</p>

---

## 📸 Screenshots

<p align="center">
  <img src="https://github.com/edwarly999plus/Nibbly/blob/main/img/1.png" alt="1" width="180">
  <img src="https://github.com/edwarly999plus/Nibbly/blob/main/img/2.png" alt="2" width="180">
  <img src="https://github.com/edwarly999plus/Nibbly/blob/main/img/3.png" alt="3" width="180">
  <img src="https://github.com/edwarly999plus/Nibbly/blob/main/img/4.png" alt="4" width="180">
  <img src="https://github.com/edwarly999plus/Nibbly/blob/main/img/5.png" alt="5" width="180">
</p>
<p align="center">
  <img src="https://github.com/edwarly999plus/Nibbly/blob/main/img/6.png" alt="6" width="180">
  <img src="https://github.com/edwarly999plus/Nibbly/blob/main/img/7.png" alt="7" width="180">
  <img src="https://github.com/edwarly999plus/Nibbly/blob/main/img/8.png" alt="8" width="180">
  <img src="https://github.com/edwarly999plus/Nibbly/blob/main/img/9.png" alt="9" width="180">
  <img src="https://github.com/edwarly999plus/Nibbly/blob/main/img/10.png" alt="10" width="180">
</p>

---

## 📖 Description

**Nibbly** is an Android app built with **HTML5 + CSS3 + JavaScript** that bundles over **30 conversion tools**, **a calculator with its own personality**, **a drawing editor**, **3 computer-themed minigames**, and a **private mode with a disguised scientific calculator**, all inside a single **Material You 3** interface with customizable themes, sounds, calculation logging, bundled background music, and bilingual support.

Lightweight, fast, and **100% offline**. The APK can be easily generated with WebView, Capacitor, or Cordova.

**v1.0.4 highlights:**
- 🔒 **Private Mode** — private calculator + black screen accessible from FABs in the topbar
- 🧮 **Scientific calculator** with visible accumulated expression, nested parentheses, and `x^y` exponents
- 👁️ **Panic button** — instant jump to a black screen with the calculator state restored
- ⌨️ **Android keyboard fix** after exiting fullscreen (automatic IME rescue)
- 🎵 **Auto pause/resume** of music when opening/closing private mode
- 🔢 **RAM meter fix** — now reaches 100% with DDR5-8400
- 🎵 **Audio bitrate meter fix** — now reaches 100% with CD/FLAC
- 🔍 **File checker fix** — `.ogg` files are now properly validated with `<audio>`

---

## ✨ Features

### 🔢 Numbers
- Conversion between bases **2 – 36**
- Output in **Binary, Octal, Decimal, Hex, Base32, Base36**
- **Nibble** (4-bit blocks) and **BCD** (Binary-Coded Decimal)
- **ASCII** and support for large numbers with `BigInt`
- **⏳ "Convert" button** with a 3-second delay and **rotating messages** ("Aligning the stars…", "Calculating mathematically…", etc.) — conversion only runs when pressed, avoiding console spam and respecting the user's pace
- **🎲 Alphanumeric code generator** with:
  - **Separator** configuration (0 to N)
  - Customizable **digits per block**
  - **6 separator types**: dash, underscore, slash, space, dot, none
  - **4 character types**: numbers, uppercase, lowercase, symbols

### 📝 Text
- Text ↔ Binary, Octal, Decimal, Hex, ASCII, **Morse**, **Base64**
- Full **Unicode** support (emojis included)
- **Built-in Morse keyboard** (dot, dash, space, `/`) for devices without those fonts
- **🔊 Morse player**: listen to the frequencies as beeps (750 Hz) directly from the app
- **⬇ Download Morse audio as .wav**: generates an audio file with the message tones to save or share (with a 0.5s lead-in so some players don't cut the start)
- Auto-split of continuous strings on paste

### 💾 Bits
- **bit, byte, KB, MB, GB, TB, PB, EB, ZB, YB** (SI)
- **KiB, MiB, GiB, TiB, PiB, EiB, ZiB, YiB** (IEC)
- **🔢 Combinations calculator**: how many values fit in X bits/bytes/GB (2^N)

### ⚡ Power
- **Watts**: mW, W, kW, MW, GW, HP, CV, BTU/h with quality bar
- **🌡️ CPU heat meter**: enter °C or °F and get the danger level, estimated CPU usage, and a joke when the heat reaches extreme levels ("Hot enough to fry an egg", "So hot you could light a campfire and say goodbye to the CPU")
- **Connection speed**: bps → Tbps, B/s → GB/s with download and upload meters
- **CPU (GHz)**: Hz → THz with 8 vertical performance bars
- **🧠 RAM**: DDR, DDR2, DDR3, DDR4, DDR5 with per-channel bandwidth and dual channel — **meter fixed in 1.0.4** to reach 100% with DDR5-8400
- **💾 Storage**: HDD, SATA SSD, NVMe Gen3/4/5, MicroSD, eMMC, USB, Thunderbolt

### 🎵 Multimedia
- **Audio bitrate**: quality from voice to lossless — **meter fixed in 1.0.4** to reach 100% with CD 1411 kbps / FLAC
- **Decibels**: dB SPL, dBu, dBV, dBFS, dBm with **Bass/Mid/Treble spectrum**
- **Video resolution**: px, Kpx, Mpx, MP, Gpx with quality scale
- **Time converter**: ns → millennia with classified time scale
- **🎞️ Frames per time unit**: frames/ns → frames/year with smoothness meter
- **Codec info**: MP3, AAC, Opus, FLAC, H.264, H.265, VP9, AV1, ProRes…
  - Quality and compression efficiency
  - Compatibility with **Android, iOS, Windows, and Web**

### 🧮 Calculator
- Classic functions: **add, subtract, multiply, divide, square root, powers, and sign change**
- **💥 Optional physics explosion**: enable the **"Please Don't"** toggle in Settings and, when you make a syntax error or a **division by zero**, the buttons fly off with gravity physics, rotation, and fade. The calculator stays unusable until you switch tabs and come back
- **🕳️ Black hole alternative**: with "Please Don't" enabled, each error can trigger an explosion **or** a black hole that sucks in the buttons while spinning and vanishes with a thud
- Off by default → normal calculation with `"Error"` on screen

### 🎨 Drawing
Simple editor loaded as an **external expansion** (`paint/paint.css` and `paint/paint.js`) — designed for designers working with HTML who need to know the exact values of their colors:

- **🖌️ Brush** — smooth antialiased strokes, adjustable thickness 1–40 px
- **✏️ Pencil** — pixel-perfect (Bresenham, no antialiasing), respects the thickness with N×N blocks
- **🧽 Eraser** — leaves the pixel completely transparent (`alpha = 0`)
- **💧 Eyedropper** — tap any pixel and capture its exact color
- **🎨 Color picker** with circular preview
- **📋 Individual copy** of `RGBA` and `HEX` values (each with its own 📋 button) or **both at once**
- **Instant update** of the values when the stroke is applied (eraser resets to `#00000000`)
- **Adaptive canvas**: 320×320 px on mobile, 500×400 px on desktop
- **Transparency background** (checkerboard) to see the real opacity

### 🔒 Private Mode
Module loaded as an **external expansion** (`privacy/privacy.css` and `privacy/privacy.js`). Adds **two discreet FABs** in the topbar (next to the ⚙ settings gear) for private use:

- **🧮 Private calculator** — fullscreen dark interface with a complete scientific calculator
- **👁️ Black screen** — true fullscreen with exit via 3 taps

#### Responsibility warning
The first time it shows a modal with an academic notice and a **"Don't show again"** checkbox persisted in `localStorage` under `nibbly-privacy-v1`. Once checked, it never appears again.

#### Private calculator
- **📝 Accumulated expression** visible: `(55) + (7) − (78) = -16`
- **🔢 Large display** with current number (clamp 40–80 px)
- **🧮 Symmetric layout like a numeric keypad**:
```

C    ⌫    ±    ÷
7    8    9    ×
4    5    6    −
1    2    3    +
.    0    ,    =      ← 0 centered between the two symbols
(    )    √    x^y    ← advanced functions at the bottom

```
- **Full operators**: `+ − × ÷` · `x^y` (power `Math.pow`) · `√` (root) · `±` (sign) · `⌫` (backspace) · `C` (clear) · `=` · `(` `)` (nested parentheses)
- **Parentheses with `parenStack`**:
  - Up to 32 nesting levels
  - Each `(` stores the parent `previous` + `operator`
  - Each `)` closes and applies the result to the parent
  - `=` **auto-closes** all pending parentheses
- **Decimals with `,` or `.`** (`1,5` = `1.5`, only one separator per number)
- **Panic button 👁️** in the header:
  - Hides the calc (`display: none`) **without destroying it**
  - Jumps to the black screen with `mode=returnToCalc`
  - On return → the calc reappears **with the same state intact** (same number, same expression, same open parenthesis)
- **`?` button** → modal with security tips:
  1. Use a privacy screen protector
  2. Lower your phone brightness when using the app
  3. Avoid using it if the room is dark and backlight could give you away
  4. Also useful to hide your carrier name (Android) or open apps (PC)
  5. To use the base converters, exit fullscreen
- **`✕` button** → closes the calc and returns to the active panel

#### Black screen
- `#000` background with `touch-action: none` (prevents accidental scroll)
- **True fullscreen** (hides system bars)
- **3 taps** (within ≤ 800 ms) to exit
- If you came from the calc → returns with the **state intact**
- If you came from the topbar → returns to the active panel

#### Android keyboard fix after fullscreen
After exiting `requestFullscreen()` (or `onHideCustomView` from the WebToApp compiler), the WebView **loses the connection to the IME** → the app's `<input>` fields stop responding until the activity is restarted. `rescueKeyboardAfterFullscreen()` reconnects the keyboard using a temporary `<input>` and 4 staggered attempts (0/120/350/700 ms).

#### Music synchronization
- 🎵 Auto pause when opening the calc or the black screen
- 🎵 Auto resume when returning to the main app
- 🎵 **Does not resume** if you came from calc → black screen → calc (keeps it paused until you fully exit private mode)
- Implemented via `window.__nibblyMusic` (public API exposed by `index.html`)

### 🎮 Games
Three complete computer-themed minigames, loaded as **separate files** (`games/games.css` and `games/games.js`) to keep the main `index.html` lightweight:

- **🎲 2048**: 4×4 board with **real slide animation** (tiles physically move between cells), swipe support on mobile, and arrow keys on desktop
- **🧱 Tetris**: 10×20 with the 7 classic tetrominoes, wall-kick on rotation, progressive speed per level, touch and keyboard controls (`← → ↓ ↑ Space P`)
- **💣 Minesweeper**: 9×9 with 10 mines, first click always safe, flags with a **dedicated 🚩 button** (for deterministic marking on Android with a single tap) and long-press as an alternative

**Settings:**
- **Games ON/OFF toggle** to disable the whole tab if it distracts you
- If the `games/*` files don't exist, the message *"No games installed, please download the missing files from GitHub :("* appears

### 🖥️ Desktop UI (web / PC only)
> **⚠️ Important — Do not include in the APK build**
>
> The `desktop-ui/` folder is **exclusively for browser/PC use**. **It must not be included in the Android APK** because it would force the desktop layout inside a phone, breaking the interface on small screens.
>
> On **Android tablets**, the compiler itself (WebToApp, Capacitor, Cordova…) **stretches the mobile layout** naturally without looking weird, so the desktop UI isn't needed there either.
>
> **Only include it if** you're going to distribute the `index.html` to open directly in a desktop browser or package it with another tool that respects `desktop-ui/`.

Designed to be comfortably used from a PC with a mouse, loaded as an **external expansion** (`desktop-ui/desktop.css` and `desktop-ui/desktop.js`):

- **Vertical sidebar** with icons per tab
- **Responsive card grid** (2–3 columns depending on width)
- **Keyboard shortcuts**: `1`–`8` switch tabs, `Esc` closes Settings
- **Centered modal** for Settings (instead of bottom sheet)
- **Version badge** next to the title
- **Hover states** on buttons, cards, and tabs
- **Auto fallback** to mobile layout if the window goes below 900 px

**Force UI** in Settings → Interface:
- **Automatic** — detects the device (on Android WebView it will always be Pocket)
- **Force Pocket** — always mobile
- **Force Desktop** — loads `desktop-ui/*`. If the files don't exist, the button is greyed out and shows *"The expansion files are broken or missing"*

### ⚙️ Settings
- 🎨 **Customizable accent color and background** with dark presets
- 📋 **Calculation log**: Off / Console / In-app
- ✨ **Visual effects** ON/OFF (also affects the **animated gradient background**)
- 🔊 **Sounds** ON/OFF (Web Audio API) — also affects the Morse player and private mode
- 🎚️ **Independent volume sliders** for music and sounds (0–100%). If a slider is at **0%**, the corresponding toggle is greyed out and can't be enabled until it's raised to ≥1%
- 🌐 **Language**: Spanish / English
- 🔍 **File checker**: detects which expansion files (`games/`, `desktop-ui/`, `paint/`, `privacy/`, `images/`, `mus/`) are installed and which are missing

### 🎨 Animated gradient background
An **animated radial gradient background** that breathes softly with the background music. The gradient color automatically uses the **accent color** you chose, creating a coherent visual experience:

- `bgPulse` animation over 9s alternating between 100% and 32% opacity
- Combines with the relaxing vibe of *"You Are Nibbled"*
- Respects the **Visual effects** toggle (disabled if you turn off effects)
- No performance cost: uses `will-change: opacity` and `background-repeat: no-repeat`

### 🎵 Background music
Optional looping music. Behavior changes depending on the platform:

#### 📱 In the Android APK
- **✅ The `.ogg` file is already bundled** in the APK (`mus/You Are Nibbled.ogg`).
- **Works offline from the first launch**, no downloads or waiting.
- You can enable the music from Settings immediately, even without internet.
- **No download required.**
- **Auto pauses** when opening private mode (calc / black screen) and resumes when you return.

#### 💻 In the web / PC version
- **The `.ogg` file is NOT included** by default (PCs usually have home internet or a place with stable connection, so it doesn't make sense to bundle the audio).
- The **first time** you enable music, it's downloaded automatically from **Archive.org** (`nibbly-ost-archive`). In practice it takes **less than 5 seconds** with a normal connection.
- Once downloaded, it's saved in **Cache Storage** (`nibbly-theme`) and plays **instantly** the next time, even offline.
- If you want the web version to also work offline from the first moment, you can manually copy `mus/You Are Nibbled.ogg` to the project folder.

#### General behavior
- Looping playback with adjustable volume from Settings.
- Auto pauses if you switch apps (respects system controls).
- Pauses when opening private mode and resumes when returning.
- The animated gradient background breathes to the beat of the music.

---

## 🚀 Installation

### 📦 Option 1 — Install the APK (recommended)

1. Go to the **[Releases](https://github.com/edwarly999plus/Nibbly/releases/latest)** section
2. Download the `.apk` file
3. Enable **"Install apps from unknown sources"** in Android settings
4. Install the APK and open the app

> **Note:** The APK contains the HTML already built **and the background music bundled** (works offline from the first launch). It only needs **Android System WebView** to be installed and up to date (preinstalled on most devices).

### 🌐 Option 2 — Try online without downloading anything

Go directly to the online version hosted on **GitHub Pages**:

🔗 **[https://edwarly999plus.github.io/Nibbly/](https://edwarly999plus.github.io/Nibbly/)**

- ✅ Zero downloads, zero installations
- ⚠️ It's an **online** version: the app doesn't save anything to servers (everything is local via `localStorage` + `Cache Storage`), but you need internet to load the page
- 💡 On PC you can enjoy the **desktop UI** with sidebar and keyboard shortcuts

### 🛠️ Option 3 — Build from source

#### Project structure

```

nibbly/
├── index.html                 ← main app
├── games/                     ← ✅ INCLUDE in the APK
│   ├── games.css              ← minigame styles
│   └── games.js               ← Tetris, Minesweeper, and 2048 logic
├── paint/                     ← ✅ INCLUDE in the APK
│   ├── paint.css              ← drawing editor styles
│   └── paint.js               ← canvas logic, tools, and color copying
├── privacy/                   ← ✅ INCLUDE in the APK (NEW in 1.0.4)
│   ├── privacy.css            ← private mode styles (FABs, calc, black screen)
│   └── privacy.js             ← scientific calculator + black screen + IME rescue
├── images/                    ← ✅ INCLUDE in the APK (optional)
│   └── privacy.png            ← incognito icon for the black FAB (falls back to 👁️ if missing)
├── mus/                       ← ✅ INCLUDE in the APK · ⚠️ OPTIONAL on web/PC
│   └── You Are Nibbled.ogg    ← background music (offline in the APK)
├── img/
│   └── (screenshots for the README)
└── desktop-ui/                ← ❌ DO NOT INCLUDE in the APK (web / PC only)
├── desktop.css
└── desktop.js

```

#### ⚠️ About `desktop-ui/` in the Android build

**Do not copy the `desktop-ui/` folder to the Android project.** Reasons:

1. **Breaks the UI on small phones**: the desktop layout (260 px sidebar + 2-column grid) doesn't fit on screens below 900 px and crushes the panels.
2. **It's unnecessary on tablets**: when you build for an Android tablet, the compiler **stretches the mobile layout** naturally without looking weird. You don't need the desktop UI for that.
3. **`index.html` already has the fallback built in**: if it detects that `desktop-ui/` isn't available, the **"Force Desktop"** button is greyed out automatically and the app continues working with just the pocket layout (which is the correct one for Android).

Only include it **if** you're going to serve the `index.html` from a desktop web browser.

#### 🔒 About `privacy/` in the Android build

**Yes, include the `privacy/` folder in the APK.** It contains the private calculator and the black screen, which are features designed to be used specifically on mobile.

- `privacy/privacy.css` → styles for the FABs, the fullscreen calc, and the black screen
- `privacy/privacy.js` → complete logic (scientific calc, nested parentheses, IME rescue, music synchronization)
- `images/privacy.png` → **optional**, if missing it uses 👁️ as a fallback

#### 🎵 About `mus/` in the Android build vs web/PC

| Platform | Include `mus/`? | Behavior |
|---|---|---|
| **Android APK** | ✅ **Yes** (recommended) | Offline music from first launch. No downloads. |
| **Android APK** | ⚠️ Optional (without `mus/`) | Downloaded from Archive.org the first time and cached. |
| **Web / PC** | ⚠️ Optional (default **off**) | Downloaded from Archive.org the first time you enable music (<5s) and cached. PCs usually have home internet, so no need to bundle the audio. |

If you want the web version to **also** work offline from the first moment, manually copy `mus/You Are Nibbled.ogg` to the web project folder.

#### With manual WebView
1. Copy **`index.html` + `games/` + `paint/` + `privacy/` + `images/` + `mus/`** (without `desktop-ui/` or `img/`) to `app/src/main/assets/`
2. Load the file with `WebView.loadUrl("file:///android_asset/index.html")`
3. Enable **JavaScript** in your `WebView` (`webSettings.setJavaScriptEnabled(true)`)
4. Enable **local storage** (`webSettings.setDomStorageEnabled(true)`)

#### With Capacitor
```bash
npm install -g @capacitor/cli
npx cap init Nibbly com.edwarly999plus.nibbly
npx cap add android
# Copy index.html + games/ + paint/ + privacy/ + images/ + mus/ to the www/ folder
# ⚠️ DO NOT copy desktop-ui/ or img/
npx cap sync
```

With Cordova

```bash
cordova create nibbly com.edwarly999plus.nibbly Nibbly
cd nibbly
# Copy index.html + games/ + paint/ + privacy/ + images/ + mus/ to www/
# ⚠️ DO NOT copy desktop-ui/ or img/
cordova platform add android
cordova build android
```

---

📱 Usage

Navigate between the 8 main tabs + Private Mode:

Tab Description
Numbers Numeric bases, BCD, ASCII, and code generator
Text Encode/decode text with Morse player and WAV download
Bits Storage units and combinations
Power Watts, CPU heat meter, network speed, CPU, RAM, and storage
Multimedia Audio, decibels, video, time, frames, and codecs
Calculator Basic operations with optional explosive personality
Drawing Simple editor with RGBA/HEX value copy
Games Tetris, Minesweeper, and 2048 (enable/disable)
🔒 Private Mode Scientific calculator + black screen (FABs in the topbar)

Tap the ⚙ gear to access Settings and customize colors, sounds, music, language, interface, calculation log, file checker, and the "Please Don't" toggle.

The two new FABs next to the gear (🧮 and 👁️) activate Private Mode. The first time it asks for confirmation with a responsibility warning that can be silenced by checking "Don't show again".

🎵 To enable music: Settings → Music → Background music ON.

· In the Android APK: works offline from the first moment (the .ogg is bundled).
· In the web/PC version: downloaded in <5s the first time (requires connection) and cached forever.
· Auto pauses when opening Private Mode and resumes when returning.

---

🔒 Privacy

Nibbly is a 100% private and offline app:

· ❌ Doesn't collect any kind of data
· ❌ No analytics or telemetry
· ❌ Doesn't send information to external servers
· ✅ All settings are saved locally on the device (localStorage)
· ✅ Conversions, calculations, and drawings happen exclusively on the device
· ✅ Private Mode is completely offline — requires no network and sends nothing

⚠️ External links

When tapping "Source Code on GitHub" (or any other external link):

· On PC: the link opens in a new browser tab (standard behavior)
· On Android: the link is shown inside the app due to WebView compiler limitations. Don't log in from Nibbly — do it from your browser for better security and convenience.
· Nibbly is not responsible for the data collection those third-party pages may perform. Check each external site's privacy policy.

🔒 About Private Mode

Private Mode is designed for "discreet offline" situations (e.g., a test with permission for phones without internet). It's not a tool for cheating — the responsibility warning makes that clear every time you open it (unless you check "Don't show again"). Private Mode data is stored separately under nibbly-privacy-v1 in localStorage, without affecting your main settings.

---

❓ Q&A

How did you make this App?

In HTML5 — HTML + CSS + vanilla JavaScript. No frameworks, no external dependencies, no build step. Everything lives in a single index.html plus the expansion folders (games/, paint/, privacy/, desktop-ui/, mus/).

Why don't you compile a native .exe version?

Because I don't have a PC. The whole app was developed from a simple text editor on Android, without IDEs or desktop tools. That's also why some games and features are relatively simple — they're designed to work well with the resources available on mobile and without heavy dependencies.

How can I try it on my PC?

Go to Releases, download the Source code.zip file, extract it, and open index.html with any modern browser (Chrome, Firefox, Edge, Safari). The app will automatically load all expansion files (games/*, paint/*, privacy/*, mus/*, etc.) from the repo folders, with no need to compile or install anything.

💡 On PC you can also enjoy the desktop UI (desktop-ui/) with vertical sidebar, card grid, and 1–8 keyboard shortcuts. In the Android APK that folder is not included so the mobile layout isn't broken.

Can I try it without downloading anything?

Yes! You can go directly to the online version hosted on GitHub Pages:

🔗 https://edwarly999plus.github.io/Nibbly/

Advantage: zero downloads, zero installations. Open the link and the app works instantly.

Disadvantage: it's an online version. The app doesn't save files or conversions on any server (everything is local in your browser via localStorage and Cache Storage), but you do need internet to enter the page. If you lose connection before loading it, you won't be able to access. Once loaded, most features keep working offline (except those that depend on the network, like the Archive.org music fallback).

Why doesn't the GitHub link open in the browser on Android?

Due to limitations of the WebView compiler used (WebToApp): the compiler doesn't respect the "open in external browser" option when compiling HTMLs (though it does respect it when compiling online websites). On PC the link opens correctly in a new tab. On Android it opens inside the app itself — we recommend not logging in from Nibbly and doing it from your browser for better security.

Where is the music if I enable "Background music"?

· Android APK: the mus/You Are Nibbled.ogg file is already bundled → works offline from the first launch, no downloads.
· Web/PC version: the file is not included (PCs usually have a stable connection). The first time you enable music it's downloaded automatically from Archive.org in less than 5 seconds and cached forever.

How does Private Mode work?

Private Mode is two FABs that appear next to the Settings gear:

· 🧮 Private calculator: opens a fullscreen scientific calculator (dark) with accumulated expression, nested parentheses, and x^y exponents. Ideal if you need to calculate something discreetly without it looking like a "toy" calc.
· 👁️ Black screen: opens a fully black screen that enters fullscreen (hides system bars). Exit with 3 taps (within ≤ 800 ms). If you came from the calc, it returns to it with the same state.

Both modes auto pause the music and resume it when exiting (if you were in the main mode).

Why does it ask me to confirm Private Mode the first time?

It's a responsibility warning. Nibbly doesn't want Private Mode to be used to cheat in a test where the teacher doesn't allow phones. The warning explains that you should only use it if the teacher allows phones without internet. You can check "Don't show again" to never see it again.

Does the app have a virus?

No. Nibbly is an open-source application with the source code available in this very repository — you can review it yourself at any time.

It's true that 1 isolated detection on VirusTotal can raise suspicion, but that's a typical false positive from the compiler (WebToApp). WebView compilers bundle the HTML into a generic native container that many antivirus programs flag by heuristics, even though the content is completely harmless.

🚫 No ads or notifications

Nibbly shows no kind of ad and sends no notification. Period.

· ❌ Zero ads — no banners, no interstitials, no rewarded, no pop-ups
· ❌ Zero notifications — no push, no local, no reminders, no alerts
· ❌ Zero integration with ad SDKs (AdMob, Unity Ads, AppLovin, Facebook Ads, etc.)

Do you see ads or notifications on your device? Then you have adware installed on your phone. Adware are malicious apps that inject ads over OTHER apps (not just Nibbly) — they appear as floating layers on top of any application, including this one. Nibbly can't generate ads because:

1. Its code is pure HTML+JS with no ad SDK
2. The WebToApp compiler doesn't include any ad module
3. The generated AndroidManifest.xml doesn't declare notification services or broadcast receivers
4. No "Display over other apps" or "Notification access" permissions are requested

If you see floating ads or ghost notifications, try this:

1. Fully close Nibbly (not just in the background — force stop from Settings → Apps → Nibbly → Force stop)
2. If the ads keep appearing with Nibbly closed → it's not Nibbly, it's another app
3. If the ads disappear with Nibbly closed → tap the "Recent" button while the ad appears → see which app it's associated with
4. Run a scan with Malwarebytes (specialized in adware) or check Settings → Apps → Special permissions → Display over other apps to see which apps have this permission enabled

⏹️ It doesn't run in the background

Nibbly has no background service, no WorkManager, no JobScheduler, no ForegroundService. When the app goes to the background without music, the process dies automatically. Period.

Background music follows these exact rules:

Action Music behavior App state
🕐 Leave the app open (foreground) ✅ Loops indefinitely 🟢 Active
🏠 Home button ⏳ Keeps playing until the track ends (~2 min) then stops 🔴 Auto-kills when the music ends
🔙 Back button ❌ Cuts instantly 🔴 Closed
📱 Recents → Swipe the app ❌ Cuts instantly 🔴 Closed
⚙️ Settings → Force stop ❌ Cuts instantly 🔴 Closed
🔇 Manually disable music ❌ Cuts instantly 🔴 Auto-kills (no music = no keep-alive)
📞 Receive a call ❌ Pauses 🟡 Paused (returns when the call ends)
🔒 Lock screen 🟢 Keeps looping ⚠️ I recommend lowering the volume or closing the app before locking

Lifecycle summary:

· App visible (foreground) → the music loops non-stop while you're in Nibbly ✅
· Press Home → the music keeps playing until the track ends (~2 min), and then the app auto-kills. Nothing runs in the background 🎯
· Manually kill the app (Back / Recents / Force stop / Disable music) → instant silence + process killed immediately

💡 Technical note: the app process is tied to the WebView's AudioContext. While audio is playing, Android keeps the process alive. When the audio ends (because the loop is broken in the background), the WebView releases the AudioContext and the WebToApp compiler kills the process so it doesn't consume resources. That is: Nibbly literally shuts itself off when the music ends in the background. If you never enabled music, the app kills itself instantly when you press Home.

About the music:

· 🎵 Not annoying: it's a relaxing melody ("You Are Nibbled") meant to accompany, not distract.
· 🔇 Barely noticeable on devices with poor audio quality or mono audio — it's perceived as a soft background, not as predominant music.
· 🎚️ You can lower it or mute it completely from Settings → Music → Move the volume slider to 0% or disable the toggle.
· ⏱️ Track duration: ~2 minutes. With the app open it loops, so it plays indefinitely until you disable it.

🔋 Battery usage

Nibbly only uses battery when it's in the foreground. There are no background services, no wake locks, no scheduled alarms — nothing that consumes battery while you're not watching it. Also, when the app auto-kills on exit, it stops consuming battery completely.

If you notice it consumes more than normal:

1. It's normal for an app with animations, music, canvas, and effects to consume some battery while you use it — it's the price of having a fluid interface with customizable design.
2. You can enable optimized battery saving from Android Settings → Battery → Battery usage → Nibbly → Optimize (or "Restrict in background" in some versions).
3. The app will continue working normally — it doesn't require special permissions, "unrestricted", or "background execution". Optimizing it may cause Android to kill it faster when exiting, but doesn't affect normal operation while you use it.

Expected real consumption:

· 📱 Normal use (conversions, calculator, text): minimal consumption — comparable to any utility app.
· 🎵 With music enabled: low consumption — the WebView AudioContext is lightweight.
· 🎮 With games enabled: moderate consumption — Tetris, 2048, and Minesweeper use requestAnimationFrame and setInterval, but only while in the foreground.
· 🔒 With Private Mode open: low consumption — just a canvas and text, no heavy animations.
· ⚙️ With visual effects disabled: even lower consumption — animations, gradients, and the animated background are turned off.

Doesn't consume battery when:

· It's fully closed (Back / Recents / Force stop)
· It's in the background (Home) — music stops when the track ends, and the app auto-kills
· You've manually closed it or the system has killed it

⚡ Performance

Nibbly isn't slow by itself. If you experience lag, it's your device's capacity, not an app problem.

Nibbly is designed to run fluid on most modern and old phones — no frameworks, no heavy dependencies, everything in HTML+CSS+vanilla JS. If your phone is low-end, has little RAM, or is several years old, you may notice lag in some specific spots:

· The animated gradient background (always visible)
· The transition animations between tabs
· The games (Tetris at high speed, 2048 with many tiles)
· The drawing editor's canvas with long strokes

Solution: disable visual effects

Go to Settings → Visual effects → Disable. This turns off:

· ❌ The transition animations between tabs
· ❌ The animated gradient background (bgPulse)
· ❌ The smooth transitions on buttons, chips, and cards
· ❌ The logo pulse animation
· ❌ The glow effect on active buttons

Result: the app feels much lighter and responds instantly, without losing any functionality. All tools, games, drawing, private mode, and settings keep working exactly the same — just without visual flourishes.

Also, if you have performance problems:

· 🎵 Mute the music from Settings → Music → Volume 0% or disable the toggle
· 🎮 Disable the Games section if you don't use it: Settings → Games ON/OFF → disable
· 🎨 Avoid the drawing editor if your phone is slow with large canvases
· 📋 Disable the Calculation log: Settings → Log → Off

With these settings, Nibbly can run fluid even on modest devices — it's not a heavy app by design, it's just that sometimes visual effects add unnecessary load.

📂 What the app actually accesses

Only 3 locations/permissions, all standard for any browser or common app:

1. 📥 Downloads folder (public)
   · Only writes when you tap the WAV button in the Text tab to save the Morse audio.
   · Doesn't read, doesn't scan, doesn't delete anything from that folder. It only adds the file you ask it to save.
   · It's exactly the same as what Chrome, Firefox, or any browser does when you download a file.
   · On Android 10+ it uses MediaStore to write directly to Downloads without broad permissions.
2. 📁 App internal data (private, app's own root)
   · App state: colors, language, music, sounds, localStorage with all your settings.
   · Private Mode state (nibbly-privacy-v1 in localStorage).
   · Calculator logs (if you enable "Calculation log" in Settings).
   · Music cache (if downloaded from Archive.org in the web version).
   · This folder only exists inside Nibbly — it's inaccessible from other apps and is deleted on uninstall.
3. 📳 Vibration (hardware permission, not data)
   · Only vibrates at specific, brief moments:
     · When pressing important buttons (automatically detected by the Android compiler) — pulses of ~20–30 ms.
     · When flagging in Minesweeper — 25 ms pulse to confirm the action.
   · Never vibrates non-stop. No vibration loops, no long patterns, no navigator.vibrate(60000) or similar.
   · It's exactly the same type of haptic feedback that Chrome does when you tap a link or any messaging app does when receiving a message.
   · If you don't like it, you can disable vibration from Settings → Apps → Nibbly → Notifications → Vibrate, or with "Do not disturb" mode enabled.

NO OTHER FOLDER OR PERMISSION. No photos, videos, music, documents, contacts, or anything else.

🚫 Permissions it NEVER requests

· ❌ Contacts
· ❌ SMS / Calls
· ❌ Camera
· ❌ Microphone
· ❌ Location
· ❌ Calendar
· ❌ Body sensors
· ❌ Device accounts
· ❌ Notifications (no push, no local, no kind whatsoever)
· ❌ Display over other apps (the permission adware uses to inject ads)
· ❌ Notification access (the permission adware uses to spy on notifications)
· ❌ Photos / gallery access
· ❌ System music / audio access
· ❌ Documents access
· ❌ Call log access
· ❌ Device administrator (root / superuser)

🌐 Internet — what it's used for

· Loading the background music the first time from Archive.org (in the APK it's bundled, so it's not usually used)
· Opening external links (like the GitHub one) inside the WebView
· Nothing else. No analytics, no telemetry, no calls to own servers, no advertising.
· Private Mode does NOT use internet — everything is local (canvas, text, localStorage).

✅ Reasons to rule out a virus

· ✅ The app doesn't request unnecessary permissions — only the 3 standard accesses described above
· ✅ All the code is visible in this repo: index.html, games/, paint/, privacy/, desktop-ui/ — no obfuscated binaries
· ✅ Doesn't include analytics, telemetry, or third-party SDKs
· ✅ Doesn't send data to external servers (everything is local)
· ✅ Vibration is brief and punctual — it can't leave your phone vibrating non-stop
· ✅ Zero ads and zero notifications — if you see any, it's adware from another app
· ✅ Auto-kills when going to background — it can't consume battery or send hidden data

🔍 If you suspect a virus got in after installing the app

1. Verify the download source — make sure you downloaded the APK directly from the Releases section of this repository. Any APK from other places (third-party sites, Telegram groups, unofficial mirrors…) is not the project's responsibility and could have been modified.
2. Check if your phone was infected by something else at the same moment of installation — other newly installed apps, APKs from unknown sources, suspicious links, etc.
3. Run a full scan with Play Protect (Settings → Google → Play Protect → Scan) or with Malwarebytes / Kaspersky / Bitdefender. Malwarebytes is especially good at detecting adware.
4. Check granted permissions in Settings → Apps → Nibbly → Permissions. Only these should appear:
   · Storage (or "Files and media" on Android 13+)
   · Internet
   · Vibration (or "Vibration control" on some Android versions)
     If you see any other active permission (camera, microphone, location, contacts, notifications, display over other apps…), something is wrong — uninstall and reinstall from official Releases.
5. Check which apps have recent access to your storage in Settings → Privacy → Permission manager → Files and media. There you see all apps that have touched files, not just Nibbly.
6. Verify that vibration is brief: if you install the app and notice the phone vibrates repeatedly or without you pressing anything, it's not Nibbly — Nibbly only vibrates as a response to your taps (never autonomously or in a loop).
7. Check apps with "Display over other apps": Settings → Apps → Special permissions → Display over other apps. If there's an app with this permission you don't recognize, that's the one injecting ads, not Nibbly (Nibbly doesn't request this permission).

🐞 If after checking everything above you still have doubts

Open an Issue with:

· Clear description of what you saw
· Screenshot of the VirusTotal report (if you have it)
· Exact source where you downloaded the APK
· Android and Android System WebView versions
· Screenshot of the app's permissions screen
· Any other app installed at that moment

---

🛠️ Technology

· HTML5 — semantic structure
· CSS3 — Material You 3, color-mix(), CSS variables, animations, dvh/svh for viewport adaptation
· Vanilla JavaScript — no dependencies, no build step
· Web Audio API — synthesized click sounds and Morse beeps
· Canvas 2D API — drawing editor with Bresenham pixel-perfect
· BigInt — arbitrary precision arithmetic
· LocalStorage — settings persistence (2 namespaces: nibbly-settings-v2 + nibbly-privacy-v1)
· Cache Storage API — offline cache for remote music (web/PC only, or APK if mus/ is omitted)
· ResizeObserver — dynamic position recalculation in 2048
· requestAnimationFrame — physics for the calculator explosion and the black hole
· Fullscreen API — Private Mode black screen
· Android System WebView — rendering engine

Approximate size:

· Full APK (with mus/): ~290 KB of web + ~1–2 MB of the .ogg file
· Minimal APK (without mus/): ~290 KB (music is downloaded the first time and cached)
· Web / PC (without mus/, without desktop-ui/): ~265 KB
· Web / PC (with desktop-ui/, without mus/): ~290 KB
· Web / PC (with everything): ~290 KB + ~1–2 MB of the .ogg

---

🗺️ Roadmap

· ☑ v1.0.0 — Initial complete version
· ☑ v1.0.1 — Design-focused version: background music with Archive.org fallback, animated gradient background that breathes with the music
· ☑ v1.0.2 — Quality of life + minigames:
  · Games section with Tetris, Minesweeper, and 2048
  · Optional desktop UI (desktop-ui/)
  · Calculator with personality ("Please Don't" → physics explosion)
  · CPU heat meter with jokes
  · "Convert" buttons with delay and rotating messages
  · Morse audio download as .wav
  · Independent volume sliders
  · Force UI (Pocket / Desktop)
  · Robust toggle synchronization after reloading or changing layout
· ☑ v1.0.3 — Massive Bug Fix + Drawing editor:
  · Drawing editor (paint/) with brush, pixel-perfect pencil, eraser, and eyedropper
  · Individual copy of RGBA/HEX values
  · Expansion file checker in Settings
  · Privacy section about external links
  · Fix: glow on Games buttons now respects the accent color
  · Fix: GitHub opening in external browser (with in-app fallback if the compiler forces it)
  · Fix: toasts visible above Settings (no longer hidden behind the sheet)
  · Fix: sentence case texts instead of Title Case
  · Documentation: clarification that desktop-ui/ must not be included in the APK
  · Documentation: clarification of music behavior in APK (bundled) vs PC (download in <5s the first time)
  · Documentation: complete app lifecycle (auto-kills on exit without music or when music ends in background)
· ☑ v1.0.4 — Private Mode + scientific calculator:
  · Private calculator with accumulated expression, nested parentheses, and x^y exponents
  · Black screen with fullscreen and exit via 3 taps
  · Panic button in the calc → hides without destroying, restores on return
  · Responsibility warning with persistent "don't show again"
  · Security tips inside the calculator
  · IME rescue fix after exiting fullscreen (Android keyboard)
  · RAM meter fix (now reaches 100% with DDR5-8400)
  · Audio bitrate meter fix (now reaches 100% with CD/FLAC)
  · File checker fix with .ogg (uses <audio> not <img>)
  · Incognito icon with images/privacy.png (falls back to 👁️)
  · Auto pause/resume of music in private mode
· ☐ v1.0.x — Bug fixes (according to reported issues)

Note: From now on the project enters maintenance mode. Only bugfix pull requests will be accepted. New features will be considered case by case.

---

🤝 Contributing

Contributions are welcome, especially bugfixes:

1. Fork the project
2. Create a branch: git checkout -b fix/bug-name
3. Commit: git commit -m "fix: bug description"
4. Push: git push origin fix/bug-name
5. Open a Pull Request

If you find a bug, open an Issue with:

· Clear description
· Steps to reproduce it
· Screenshot (if applicable)
· Android and Android System WebView versions
· Affected tab (Numbers, Text, Bits, Power, Multimedia, Calculator, Drawing, Games, or Private Mode)

---

👤 Author

EdwarlyGamer999+

· 🐙 GitHub: @edwarly999plus
· 📦 Repository: Nibbly

---

📄 License

This project is licensed under Apache-2.0. See the LICENSE file for details.

```
                              Apache License
                        Version 2.0, January 2004
                     http://www.apache.org/licenses/

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

1. Definitions.

   "License" shall mean the terms and conditions for use, reproduction,
   and distribution as defined by Sections 1 through 9 of this document.

   "Licensor" shall mean the copyright owner or entity authorized by
   the copyright owner that is granting the License.

   "Legal Entity" shall mean the union of the acting entity and all
   other entities that control, are controlled by, or are under common
   control with that entity. For the purposes of this definition,
   "control" means (i) the power, direct or indirect, to cause the
   direction or management of such entity, whether by contract or
   otherwise, or (ii) ownership of fifty percent (50%) or more of the
   outstanding shares, or (iii) beneficial ownership of such entity.

   "You" (or "Your") shall mean an individual or Legal Entity
   exercising permissions granted by this License.

   "Source" form shall mean the preferred form for making modifications,
   including but not limited to software source code, documentation
   source, and configuration files.

   "Object" form shall mean any form resulting from mechanical
   transformation or translation of a Source form, including but
   not limited to compiled object code, generated documentation,
   and conversions to other media types.

   "Work" shall mean the work of authorship, whether in Source or
   Object form, made available under the License, as indicated by a
   copyright notice that is included in or attached to the work
   (an example is provided in the Appendix below).

   "Derivative Works" shall mean any work, whether in Source or Object
   form, that is based on (or derived from) the Work and for which the
   editorial revisions, annotations, elaborations, or other modifications
   represent, as a whole, an original work of authorship. For the purposes
   of this License, Derivative Works shall not include works that remain
   separable from, or merely link (or bind by name) to the interfaces of,
   the Work and Derivative Works thereof.

   "Contribution" shall mean any work of authorship, including
   the original version of the Work and any modifications or additions
   to that Work or Derivative Works thereof, that is intentionally
   submitted to Licensor for inclusion in the Work by the copyright owner
   or by an individual or Legal Entity authorized to submit on behalf of
   the copyright owner. For the purposes of this definition, "submitted"
   means any form of electronic, verbal, or written communication sent
   to the Licensor or its representatives, including but not limited to
   communication on electronic mailing lists, source code control systems,
   and issue tracking systems that are managed by, or on behalf of, the
   Licensor for the purpose of discussing and improving the Work, but
   excluding communication that is conspicuously marked or otherwise
   designated in writing by the copyright owner as "Not a Contribution."

   "Contributor" shall mean Licensor and any individual or Legal Entity
   on behalf of whom a Contribution has been received by Licensor and
   subsequently incorporated within the Work.

2. Grant of Copyright License. Subject to the terms and conditions of
   this License, each Contributor hereby grants to You a perpetual,
   worldwide, non-exclusive, no-charge, royalty-free, irrevocable
   copyright license to reproduce, prepare Derivative Works of,
   publicly display, publicly perform, sublicense, and distribute the
   Work and such Derivative Works in Source or Object form.

3. Grant of Patent License. Subject to the terms and conditions of
   this License, each Contributor hereby grants to You a perpetual,
   worldwide, non-exclusive, no-charge, royalty-free, irrevocable
   (except as stated in this section) patent license to make, have made,
   use, offer to sell, sell, import, and otherwise transfer the Work,
   where such license applies only to those patent claims licensable
   by such Contributor that are necessarily infringed by their
   Contribution(s) alone or by combination of their Contribution(s)
   with the Work to which such Contribution(s) was submitted. If You
   institute patent litigation against any entity (including a
   cross-claim or counterclaim in a lawsuit) alleging that the Work
   or a Contribution incorporated within the Work constitutes direct
   or contributory patent infringement, then any patent licenses
   granted to You under this License for that Work shall terminate
   as of the date such litigation is filed.

4. Redistribution. You may reproduce and distribute copies of the
   Work or Derivative Works thereof in any medium, with or without
   modifications, and in Source or Object form, provided that You
   meet the following conditions:

   (a) You must give any other recipients of the Work or
       Derivative Works a copy of this License; and

   (b) You must cause any modified files to carry prominent notices
       stating that You changed the files; and

   (c) You must retain, in the Source form of any Derivative Works
       that You distribute, all copyright, patent, trademark, and
       attribution notices from the Source form of the Work,
       excluding those notices that do not pertain to any part of
       the Derivative Works; and

   (d) If the Work includes a "NOTICE" text file as part of its
       distribution, then any Derivative Works that You distribute must
       include a readable copy of the attribution notices contained
       within such NOTICE file, excluding those notices that do not
       pertain to any part of the Derivative Works, in at least one
       of the following places: within a NOTICE text file distributed
       as part of the Derivative Works; within the Source form or
       documentation, if provided along with the Derivative Works; or,
       within a display generated by the Derivative Works, if and
       wherever such third-party notices normally appear. The contents
       of the NOTICE file are for informational purposes only and
       do not modify the License. You may add Your own attribution
       notices within Derivative Works that You distribute, alongside
       or as an addendum to the NOTICE text from the Work, provided
       that such additional attribution notices cannot be construed
       as modifying the License.

   You may add Your own copyright statement to Your modifications and
   may provide additional or different license terms and conditions
   for use, reproduction, or distribution of Your modifications, or
   for any such Derivative Works as a whole, provided Your use,
   reproduction, and distribution of the Work otherwise complies with
   the conditions stated in this License.

5. Submission of Contributions. Unless You explicitly state otherwise,
   any Contribution intentionally submitted for inclusion in the Work
   by You to the Licensor shall be under the terms and conditions of
   this License, without any additional terms or conditions.
   Notwithstanding the above, nothing herein shall supersede or modify
   the terms of any separate license agreement you may have executed
   with Licensor regarding such Contributions.

6. Trademarks. This License does not grant permission to use the trade
   names, trademarks, service marks, or product names of the Licensor,
   except as required for reasonable and customary use in describing the
   origin of the Work and reproducing the content of the NOTICE file.

7. Disclaimer of Warranty. Unless required by applicable law or
   agreed to in writing, Licensor provides the Work (and each
   Contributor provides its Contributions) on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
   implied, including, without limitation, any warranties or conditions
   of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
   PARTICULAR PURPOSE. You are solely responsible for determining the
   appropriateness of using or redistributing the Work and assume any
   risks associated with Your exercise of permissions under this License.

8. Limitation of Liability. In no event and under no legal theory,
   whether in tort (including negligence), contract, or otherwise,
   unless required by applicable law (such as deliberate and grossly
   negligent acts) or agreed to in writing, shall any Contributor be
   liable to You for damages, including any direct, indirect, special,
   incidental, or consequential damages of any character arising as a
   result of this License or out of the use or inability to use the
   Work (including but not limited to damages for loss of goodwill,
   work stoppage, computer failure or malfunction, or any and all
   other commercial damages or losses), even if such Contributor
   has been advised of the possibility of such damages.

9. Accepting Warranty or Additional Liability. While redistributing
   the Work or Derivative Works thereof, You may choose to offer,
   and charge a fee for, acceptance of support, warranty, indemnity,
   or other liability obligations and/or rights consistent with this
   License. However, in accepting such obligations, You may act only
   on Your own behalf and on Your sole responsibility, not on behalf
   of any other Contributor, and only if You agree to indemnify,
   defend, and hold each Contributor harmless for any liability
   incurred by, or claims asserted against, such Contributor by reason
   of your accepting any such warranty or additional liability.

END OF TERMS AND CONDITIONS

APPENDIX: How to apply the Apache License to your work.

   To apply the Apache License to your work, attach the following
   boilerplate notice, with the fields enclosed by brackets "[]"
   replaced with your own identifying information. (Don't include
   the brackets!)  The text should be enclosed in the appropriate
   comment syntax for the file format. We also recommend that a
   file or class name and description of purpose be included on the
   same "printed page" as the copyright notice for easier
   identification within third-party archives.

Copyright 2026 EdwarlyGamer999+

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

---

<p align="center">
  <b>Made with ♥️ by EdwarlyGamer999+</b><br>
  <sub>⭐ If you liked the project, give it a star on GitHub ⭐</sub>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/edwarly999plus/Nibbly" alt="Stars">
  <img src="https://img.shields.io/github/forks/edwarly999plus/Nibbly?style=social" alt="Forks">
  <img src="https://img.shields.io/github/issues/edwarly999plus/Nibbly" alt="Issues">
</p>
