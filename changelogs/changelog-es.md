# Nibbly v2.0.5 — Watchdog y pulido de Práctica

Esta release extiende el watchdog global de arranque de 40s a 60s para evitar falsos positivos en conexiones lentas, y unifica la iconografía vectorial en la pestaña de Práctica. Sin cambios rotos, sin migración de datos, sin archivos nuevos.

## ✨ Añadido

· Iconos SVG en los 4 botones de Práctica (Nuevo ejercicio, Reiniciar, Verificar, Descargar CSV).
· Iconos SVG en los 3 summaries colapsables (Cómo calcular, Espacio de trabajo, Mini calculadora).
· Helper `stripLeadingEmoji()` en practice.js para limpiar el emoji del título sin tocar i18n.
· Fallback a emoji en todos los `icon()` por si `NibblyIcons` no ha cargado.

## 🔧 Bajo el capó

· `GLOBAL_TIMEOUT` de 40000 → 60000 en index.html.
· 5 referencias textuales de "40s" → "60s" (fallbacks, log, buildErrorReport).
· `INIT_TIMEOUT_MS` (30s) sin cambios.
· 2 bloques CSS nuevos en practice.css (botones de acción + summaries).
· Versión actualizada a 2.0.5 en todo el proyecto.
· Sin migración de datos; los ajustes siguen en nibbly-settings-v2.
· Sin archivos nuevos: solo se modifican index.html, practice.js y practice.css.