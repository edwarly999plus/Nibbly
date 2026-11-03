# 🎮 Nibbly v2.0.3 — Bug fixes & Flowchart QoL

> This release fixes six reported bugs and improves the Flowcharts experience.

## ✨ Added
- **Edit mode** in Flowcharts: one tap on any node opens the editor.
- **Nibbly-style modals** replacing `prompt()` and `confirm()`.

## 🐛 Fixed
- The "Process" node now shows "Proceso" in Spanish.
- Formula button icons no longer stack above the text.
- The loading screen turns red on error.
- Flowchart arrows stick correctly to diamonds and ellipses.
- Exported SVG/PNG text now wraps.

## 🔧 Under the hood
- Shape-aware `edgePoint()` for every node type.
- Global listeners registered only once.