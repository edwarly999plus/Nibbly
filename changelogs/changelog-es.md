# 🎮 Nibbly v2.0.3 — Corrección de errores y mejoras en Flowcharts

> Esta release corrige seis bugs reportados y mejora la experiencia de Flowcharts.

## ✨ Añadido
- **Modo Editar** en Flowcharts: un toque en cualquier nodo abre el editor.
- **Modales estilo Nibbly** que reemplazan `prompt()` y `confirm()`.

## 🐛 Corregido
- El nodo "Process" ahora dice "Proceso" en español.
- Los iconos de los botones de fórmulas ya no se apilan encima del texto.
- La pantalla de carga se vuelve roja al fallar.
- Las flechas del diagrama de flujo se pegan correctamente a rombos y elipses.
- El texto exportado en SVG/PNG ya tiene wrap.

## 🔧 Bajo el capó
- `edgePoint()` consciente de la forma de cada nodo.
- Los listeners globales se registran una sola vez.