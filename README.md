<p align="center">
  <img src="https://github.com/edwarly999plus/Nibbly/blob/main/img/Nibbly%20Logo.png" alt="Nibbly Rounded Square Logo" width="160" height="160">
</p>

<h1 align="center">Nibbly</h1>

<p align="center">
  <b>The all-in-one converter for Android</b><br>
  Bases · Text · Morse · Bits · Power · Multimedia · Calculator · Formulas · Drawing · Games · Private Mode
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.5-5b8cff?style=for-the-badge" alt="Version">
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

**Nibbly** is an Android app built with **HTML5 + CSS3 + JavaScript** that bundles over **35 conversion tools**, **a calculator with its own personality**, **a live formula editor with step-by-step math**, **a drawing editor**, **3 computer-themed minigames**, and **a private mode with a disguised scientific calculator**, all inside a single **Material You 3** interface with customizable themes, sounds, calculation logging, bundled background music, and bilingual support.

Lightweight, fast, and **100% offline**. The APK can be easily generated with WebView, Capacitor, or Cordova.

**v1.0.5 highlights:**
- 🧮 **Fórmulas tab (Formulas)** — new module for **real-time formulas with dynamic variable replacement**
- 📊 **6 step-by-step conversions** with full procedure tables: decimal → binary / hex / hex (with fraction) / octal, and binary → octal / hex
- ⏳ **3 reveal messages** when pressing "Reveal calculation" (academic-ready output)
- 🔧 **v1.0.4.1 fix included** — WAV Morse downloads now work correctly in the compiled APK
- 🖥️ **Desktop UI** updated — sidebar now includes the 9th tab, badge shows `v1.0.5`, keyboard shortcut `9` opens Formulas

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
- **⬇ Download Morse audio as .wav**: generates an audio file with the message tones to save or share (with a 0.5s lead-in so some players don't cut the start) — **fixed in v1.0.4.1 for the compiled APK**
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

### 🧮 Fórmulas (Formulas) — NEW in 1.0.5

> 🎓 **Tired of turning in answers without showing the procedure and losing academic points?**
> This option helps you **calculate with the full step-by-step procedure** — ready to copy into your notebook or homework.
> And if phones aren't allowed in class, you can **practice at home before the exams** with the exact same method your teacher will ask you to write down.

Loaded as an **external expansion** (`formulas/formulas.css` and `formulas/formulas.js`). Two modes:

#### 🧠 Free formula (live evaluation)
- Write any formula using **single letters as variables** (`a * b + c`)
- **Auto-detects variables** on every keystroke → input fields appear instantly for each one
- **Live preview** with two lines: the **substituted expression** (`(2) * (3) + (4)`) and the **result** (`= 14`)
- Supported operators: `+ − * / ^ ( ) %` and special symbols `√` (square root), `²` (square), `³` (cube)
- Constants recognized: `e`, `pi`
- Result preserved across language changes

#### 📊 6 step-by-step conversions (with full procedure table)
Each one shows the **complete method** so you can reproduce it by hand:

1. **Decimal → Binary** — successive division by 2 (with quotient / remainder table)
   - Example: `45 → 101101`
2. **Decimal → Hexadecimal** — successive division by 16 (with digit conversion `10=A`…`15=F`)
   - Example: `478 → 1DE`
3. **Decimal (with fraction) → Hexadecimal** — integer part by division + decimal part by multiplication
   - Example: `26,5 → 1A.8`
4. **Decimal → Octal** — successive division by 8
5. **Binary → Octal** — grouping bits in **blocks of 3** from right to left
   - Example: `101110 → 56`
6. **Binary → Hexadecimal** — grouping bits in **blocks of 4** from right to left
   - Example: `11110010 → F2`

#### ⏳ Reveal sequence
When you press **"Reveal calculation"**, the app shows 3 sequential loading messages before revealing the full procedure:
1. *"The big reveal is almost ready, please wait..."*
2. *"Revealing calculation..."*
3. *"Almost there..."*

Then it renders the complete table(s) plus a highlighted result block with a **📋 Copy** button (with toast feedback).

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
- **`?` button** → modal with security tips
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

Designed to be comfortably used from a PC with a mouse, loaded as an **external expansion** (`desktop-ui/desktop.css` and `desktop-ui/desktop.js`):

- **Vertical sidebar** with icons per tab (now includes the 9th tab, **Fórmulas** 🧮)
- **Responsive card grid** (2–3 columns depending on width)
- **Keyboard shortcuts**: `1`–`9` switch tabs, `Esc` closes Settings
- **Centered modal** for Settings (instead of bottom sheet)
- **Version badge** next to the title (`v1.0.5`)
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
- 🔍 **File checker**: detects which expansion files (`games/`, `desktop-ui/`, `paint/`, `privacy/`, `formulas/`, `images/`, `mus/`) are installed and which are missing

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
- **Auto pauses** when opening private mode (calc / black screen) and resumes when you return.

#### 💻 In the web / PC version
- **The `.ogg` file is NOT included** by default.
- The **first time** you enable music, it's downloaded automatically from **Archive.org** (`nibbly-ost-archive`). In practice it takes **less than 5 seconds** with a normal connection.
- Once downloaded, it's saved in **Cache Storage** (`nibbly-theme`) and plays **instantly** the next time, even offline.

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
│   ├── games.css
│   └── games.js               ← Tetris, Minesweeper, and 2048 logic
├── formulas/                  ← ✅ INCLUDE in the APK (NEW in 1.0.5)
│   ├── formulas.css           ← formula editor + procedure tables styles
│   └── formulas.js            ← live evaluation + 6 step-by-step conversions
├── paint/                     ← ✅ INCLUDE in the APK
│   ├── paint.css
│   └── paint.js               ← canvas logic, tools, and color copying
├── privacy/                   ← ✅ INCLUDE in the APK
│   ├── privacy.css            ← private mode styles
│   └── privacy.js             ← scientific calculator + black screen + IME rescue
├── images/                    ← ✅ INCLUDE in the APK (optional)
│   └── privacy.png            ← incognito icon for the black FAB
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
2. **It's unnecessary on tablets**: when you build for an Android tablet, the compiler **stretches the mobile layout** naturally.
3. **`index.html` already has the fallback built in**: if it detects that `desktop-ui/` isn't available, the **"Force Desktop"** button is greyed out automatically and the app continues working with just the pocket layout.

#### 🔒 About `privacy/` in the Android build

**Yes, include the `privacy/` folder in the APK.** It contains the private calculator and the black screen.

#### 🧮 About `formulas/` in the Android build

**Yes, include the `formulas/` folder in the APK.** It contains the formula editor and the step-by-step conversion tables. No extra permissions, no network calls.

#### 🎵 About `mus/` in the Android build vs web/PC

| Platform | Include `mus/`? | Behavior |
|---|---|---|
| **Android APK** | ✅ **Yes** (recommended) | Offline music from first launch. No downloads. |
| **Android APK** | ⚠️ Optional (without `mus/`) | Downloaded from Archive.org the first time and cached. |
| **Web / PC** | ⚠️ Optional (default **off**) | Downloaded from Archive.org the first time you enable music (<5s) and cached. |

#### With manual WebView
1. Copy **`index.html` + `games/` + `formulas/` + `paint/` + `privacy/` + `images/` + `mus/`** (without `desktop-ui/` or `img/`) to `app/src/main/assets/`
2. Load the file with `WebView.loadUrl("file:///android_asset/index.html")`
3. Enable **JavaScript** in your `WebView` (`webSettings.setJavaScriptEnabled(true)`)
4. Enable **local storage** (`webSettings.setDomStorageEnabled(true)`)

#### With Capacitor
```bash
npm install -g @capacitor/cli
npx cap init Nibbly com.edwarly999plus.nibbly
npx cap add android
# Copy index.html + games/ + formulas/ + paint/ + privacy/ + images/ + mus/ to www/
# ⚠️ DO NOT copy desktop-ui/ or img/
npx cap sync
```

With Cordova

```bash
cordova create nibbly com.edwarly999plus.nibbly Nibbly
cd nibbly
# Copy index.html + games/ + formulas/ + paint/ + privacy/ + images/ + mus/ to www/
# ⚠️ DO NOT copy desktop-ui/ or img/
cordova platform add android
cordova build android
```

---

📱 Usage

Navigate between the 9 main tabs + Private Mode:

Tab Description
Numbers Numeric bases, BCD, ASCII, and code generator
Text Encode/decode text with Morse player and WAV download
Bits Storage units and combinations
Power Watts, CPU heat meter, network speed, CPU, RAM, and storage
Multimedia Audio, decibels, video, time, frames, and codecs
Calculator Basic operations with optional explosive personality
Formulas Live formula editor + 6 step-by-step conversions with full procedure
Drawing Simple editor with RGBA/HEX value copy
Games Tetris, Minesweeper, and 2048 (enable/disable)
🔒 Private Mode Scientific calculator + black screen (FABs in the topbar)

Tap the ⚙ gear to access Settings and customize colors, sounds, music, language, interface, calculation log, file checker, and the "Please Don't" toggle.

The two FABs next to the gear (🧮 and 👁️) activate Private Mode.

🎵 To enable music: Settings → Music → Background music ON.

---

🔒 Privacy

Nibbly is a 100% private and offline app:

· ❌ Doesn't collect any kind of data
· ❌ No analytics or telemetry
· ❌ Doesn't send information to external servers
· ✅ All settings are saved locally on the device (localStorage)
· ✅ Conversions, calculations, formulas, and drawings happen exclusively on the device
· ✅ Private Mode is completely offline — requires no network and sends nothing

⚠️ External links

When tapping "Source Code on GitHub" (or any other external link):

· On PC: the link opens in a new browser tab (standard behavior)
· On Android: the link is shown inside the app due to WebView compiler limitations. Don't log in from Nibbly — do it from your browser for better security and convenience.
· Nibbly is not responsible for the data collection those third-party pages may perform.

🔒 About Private Mode

Private Mode is designed for "discreet offline" situations. It's not a tool for cheating — the responsibility warning makes that clear every time you open it (unless you check "Don't show again"). Private Mode data is stored separately under nibbly-privacy-v1 in localStorage, without affecting your main settings.

---

❓ Q&A

How did you make this App?

In HTML5 — HTML + CSS + vanilla JavaScript. No frameworks, no external dependencies, no build step. Everything lives in a single index.html plus the expansion folders (games/, formulas/, paint/, privacy/, desktop-ui/, mus/).

Why don't you compile a native .exe version?

Because I don't have a PC. The whole app was developed from a simple text editor on Android, without IDEs or desktop tools. That's also why some games and features are relatively simple — they're designed to work well with the resources available on mobile and without heavy dependencies.

How can I try it on my PC?

Go to Releases, download the Source code.zip file, extract it, and open index.html with any modern browser. The app will automatically load all expansion files (games/*, formulas/*, paint/*, privacy/*, mus/*, etc.) from the repo folders, with no need to compile or install anything.

💡 On PC you can also enjoy the desktop UI (desktop-ui/) with vertical sidebar, card grid, and 1–9 keyboard shortcuts.

Can I try it without downloading anything?

Yes! You can go directly to the online version hosted on GitHub Pages:

🔗 https://edwarly999plus.github.io/Nibbly/

Advantage: zero downloads, zero installations. Open the link and the app works instantly.

Disadvantage: it's an online version. The app doesn't save files or conversions on any server (everything is local in your browser via localStorage and Cache Storage), but you do need internet to enter the page.

Where is the music if I enable "Background music"?

· Android APK: the mus/You Are Nibbled.ogg file is already bundled → works offline from the first launch, no downloads.
· Web/PC version: the file is not included. The first time you enable music it's downloaded automatically from Archive.org in less than 5 seconds and cached forever.

How does the Fórmulas tab work?

It has two modes:

· Free formula — write a * b + c, input values for a, b, c, and the preview updates on every keystroke showing the substituted expression and the result.
· 6 step-by-step conversions — decimal → binary/hex/hex-with-fraction/octal, and binary → octal/hex. Press "Reveal calculation" and the app shows 3 loading messages, then renders the full procedure table (successive divisions or bit grouping), exactly as a teacher would write it on the board.

Ideal for:

· ✅ Turning in homework with the full procedure
· ✅ Practicing at home before exams when phones aren't allowed in class
· ✅ Understanding why the answer is what it is, not just the final number

How does Private Mode work?

Private Mode is two FABs that appear next to the Settings gear:

· 🧮 Private calculator: opens a fullscreen scientific calculator (dark) with accumulated expression, nested parentheses, and x^y exponents.
· 👁️ Black screen: opens a fully black screen that enters fullscreen. Exit with 3 taps (within ≤ 800 ms). If you came from the calc, it returns to it with the same state.

Both modes auto pause the music and resume it when exiting (if you were in the main mode).

Why does it ask me to confirm Private Mode the first time?

It's a responsibility warning. Nibbly doesn't want Private Mode to be used to cheat in a test where the teacher doesn't allow phones. You can check "Don't show again" to never see it again.

Does the app have a virus?

No. Nibbly is an open-source application with the source code available in this very repository — you can review it yourself at any time.

It's true that 1 isolated detection on VirusTotal can raise suspicion, but that's a typical false positive from the compiler (WebToApp). WebView compilers bundle the HTML into a generic native container that many antivirus programs flag by heuristics, even though the content is completely harmless.

🚫 No ads or notifications

Nibbly shows no kind of ad and sends no notification. Period.

Do you see ads or notifications on your device? Then you have adware installed on your phone. Adware are malicious apps that inject ads over OTHER apps. Nibbly can't generate ads because its code is pure HTML+JS with no ad SDK, the WebToApp compiler doesn't include any ad module, and the generated AndroidManifest.xml doesn't declare notification services or broadcast receivers.

⏹️ It doesn't run in the background

Nibbly has no background service, no WorkManager, no JobScheduler, no ForegroundService. When the app goes to the background without music, the process dies automatically.

Action Music behavior App state
🕐 Leave the app open (foreground) ✅ Loops indefinitely 🟢 Active
🏠 Home button ⏳ Keeps playing until the track ends (~2 min) then stops 🔴 Auto-kills when the music ends
🔙 Back button ❌ Cuts instantly 🔴 Closed
📱 Recents → Swipe the app ❌ Cuts instantly 🔴 Closed
⚙️ Settings → Force stop ❌ Cuts instantly 🔴 Closed
🔇 Manually disable music ❌ Cuts instantly 🔴 Auto-kills
📞 Receive a call ❌ Pauses 🟡 Paused
🔒 Lock screen 🟢 Keeps looping ⚠️ Lower volume or close before locking

🔋 Battery usage

Nibbly only uses battery when it's in the foreground. There are no background services, no wake locks, no scheduled alarms. When the app auto-kills on exit, it stops consuming battery completely.

You can enable optimized battery saving from Android Settings → Battery → Battery usage → Nibbly → Optimize. The app will continue working normally — it doesn't require special permissions.

⚡ Performance

Nibbly isn't slow by itself. If you experience lag, it's your device's capacity, not an app problem.

If you have performance problems, try Settings → Visual effects → Disable. This turns off transitions, the animated gradient background, and the logo pulse animation. All tools, games, drawing, private mode, and settings keep working exactly the same — just without visual flourishes.

Also try: mute music, disable games, or disable the calculation log.

📂 What the app actually accesses

Only 3 locations/permissions, all standard for any browser or common app:

1. 📥 Downloads folder (public) — only writes when you tap the WAV button or the Morse WAV download. Doesn't read, scan, or delete anything. On Android 10+ it uses MediaStore to write directly to Downloads. In v1.0.4.1 the storage permission flow was fixed so this works reliably in the compiled APK with user confirmation (Nibbly does nothing outside the user's view).
2. 📁 App internal data (private) — app state (colors, language, music, sounds), Private Mode state, calculator logs, music cache.
3. 📳 Vibration (hardware permission, not data) — only brief pulses on important buttons and on Minesweeper flagging. Never loops, never long patterns.

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
· ❌ Notifications
· ❌ Display over other apps
· ❌ Notification access
· ❌ Photos / gallery access
· ❌ System music / audio access
· ❌ Documents access
· ❌ Call log access
· ❌ Device administrator

🌐 Internet — what it's used for

· Loading the background music the first time from Archive.org (in the APK it's bundled, so it's not usually used)
· Opening external links (like the GitHub one) inside the WebView
· Nothing else. No analytics, no telemetry, no calls to own servers, no advertising.
· Fórmulas and Private Mode do NOT use internet — everything is local.

✅ Reasons to rule out a virus

· ✅ The app doesn't request unnecessary permissions — only the 3 standard accesses described above
· ✅ All the code is visible in this repo: index.html, games/, formulas/, paint/, privacy/, desktop-ui/ — no obfuscated binaries
· ✅ Doesn't include analytics, telemetry, or third-party SDKs
· ✅ Doesn't send data to external servers (everything is local)
· ✅ Zero ads and zero notifications — if you see any, it's adware from another app
· ✅ Auto-kills when going to background

🔍 If you suspect a virus got in after installing the app

1. Verify the download source — make sure you downloaded the APK directly from the Releases section of this repository.
2. Check if your phone was infected by something else at the same moment of installation.
3. Run a full scan with Play Protect or with Malwarebytes / Kaspersky / Bitdefender.
4. Check granted permissions in Settings → Apps → Nibbly → Permissions. Only Storage, Internet, and Vibration should appear.
5. Check which apps have recent access to your storage in Settings → Privacy → Permission manager → Files and media.
6. Check apps with "Display over other apps" — if there's one you don't recognize, that's the ad injector, not Nibbly.

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
· Cache Storage API — offline cache for remote music
· ResizeObserver — dynamic position recalculation in 2048
· requestAnimationFrame — physics for the calculator explosion and the black hole
· Fullscreen API — Private Mode black screen
· Function constructor (sanitized) — safe formula evaluation in the Fórmulas tab
· Android System WebView — rendering engine

Approximate size:

· Full APK (with mus/): ~315 KB of web + ~1–2 MB of the .ogg file
· Minimal APK (without mus/): ~315 KB
· Web / PC (without mus/, without desktop-ui/): ~290 KB
· Web / PC (with desktop-ui/, without mus/): ~315 KB
· Web / PC (with everything): ~315 KB + ~1–2 MB of the .ogg

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
  · Fix: GitHub opening in external browser (with in-app fallback)
  · Fix: toasts visible above Settings (no longer hidden behind the sheet)
  · Fix: sentence case texts instead of Title Case
  · Documentation: clarification that desktop-ui/ must not be included in the APK
  · Documentation: clarification of music behavior in APK (bundled) vs PC (download in <5s)
  · Documentation: complete app lifecycle (auto-kills on exit without music)
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
· ☑ v1.0.4.1 — Minor fix:
  · Fix: WAV Morse files generated in the compiled APK were not downloading correctly
  · Now uses read/write storage permissions with user confirmation (Nibbly does nothing outside the user's view)
  · Works reliably on Android 10+ (uses MediaStore to write to Downloads without broad permissions)
· ☑ v1.0.5 — Fórmulas tab:
  · New Fórmulas tab (formulas/formulas.css, formulas/formulas.js)
  · Live formula editor with dynamic variable detection and real-time preview
  · 6 step-by-step conversions with full procedure tables:
    · Decimal → Binary (successive division by 2)
    · Decimal → Hexadecimal (successive division by 16)
    · Decimal with fraction → Hexadecimal (division + multiplication)
    · Decimal → Octal (successive division by 8)
    · Binary → Octal (bit grouping, blocks of 3)
    · Binary → Hexadecimal (bit grouping, blocks of 4)
  · Reveal sequence with 3 loading messages: "The big reveal is almost ready..." → "Revealing calculation..." → "Almost there..."
  · Copy button with toast feedback on every result block
  · Preserves state (formula and values) when switching tabs and coming back
  · Desktop UI updated: 9th tab in sidebar, v1.0.5 badge, keyboard shortcut 9
  · File checker now includes formulas/* files
  · Fix: reveal loading messages now use localized strings instead of raw i18n keys (ES/EN)
  · Fix: copy toast in Fórmulas works with an internal fallback
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
· Affected tab (Numbers, Text, Bits, Power, Multimedia, Calculator, Formulas, Drawing, Games, or Private Mode)

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
```

(Full Apache 2.0 text as in the LICENSE file — unchanged)

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
