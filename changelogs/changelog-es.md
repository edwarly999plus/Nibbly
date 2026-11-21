# Nibbly v2.0.6 — La Expansión de Juegos y Lógica

Esta gran actualización introduce los nuevos juegos **Cube Run** y **Snake**, añade un visualizador y generador de ondas a **Logic Gates**, trae soporte **Nativo para Windows** (x86 y x64 vía WebView2), y presenta un nuevo sistema de **Audio Ducking** (atenuación de música) para la música de fondo.

No hay cambios que rompan la compatibilidad, pero se añaden dos nuevos juegos y activos de audio a los paquetes de expansión.

## 🌟 Destacados

· 🪟 **Port Nativo para Windows:** Versiones x64 y x86 usando Edge WebView2.
· 🎮 **Cube Run:** Runner infinito con tienda, skins y audio dinámico.
· 🐍 **Snake:** 3 dificultades, tiempo de gracia y cola de inputs.
· 🌊 **Logic Gates:** Visualizador de ondas y Wave Maker interactivo.
· 🎵 **Cubic Nibbly:** Nueva pista añadida al Reproductor y a Cube Run.
· 🌐 **Página de Descargas:** Nightly releases, tarjetas de Windows y brillo dinámico.
· 🎵 **Reproductor:** "Cubic Nibbly" añadido a la lista de reproducción.

## ✨ Añadido

### Suite de Juegos
· **Cube Run (v2.1.5):** Runner infinito inspirado en Geometry Dash. 3 dificultades (1, 2, 3 pinchos). Tienda de skins con 6 caras. Las monedas aparecen en líneas horizontales seguras. Audio ducking para la música de fondo. Explosión de partículas y cuenta atrás de 3s al reanudar. Persistencia local para récords, monedas y skins.
· **Snake (v1.5.1):** 3 dificultades. Sistema de "Gracia" (retraso de 0.2s antes de morir en paredes/cola). Cola de inputs para giros rápidos y fluidos. Efectos de partículas. Persistencia local para el récord.

### Logic Gates (v1.7.0)
· **Pestaña de Ondas:** Visualiza las señales A, B e Y con una cuadrícula de tiempo.
· **Wave Maker:** Cuadrícula interactiva para dibujar señales con presets y exportación a JSON/SVG/PNG.
· **Conceptos Básicos:** Tarjetas desplegables explicando los tiempos de las ondas.
· **Constructor ANSI/IEEE:** Formas reales de las puertas (forma de D, escudo, triángulo).
· **Iconos Vectoriales:** Se reemplazaron los emojis por SVGs inline.

### Plataformas y Herramientas
· **Port Nativo para Windows:** Versiones x64 y x86 usando Edge WebView2. El instalador maneja la falta del runtime automáticamente.
· **Página de Descargas:** Añadidas tarjetas de Windows. Nuevo desplegable morado para "Nightly Releases". El brillo verde dinámico se adapta al SO del usuario (Windows o Web).
· **Reproductor:** Añadida "Cubic Nibbly" a la lista de reproducción.

## 🔧 Bajo el capó

· **Iconos:** Añadidos ~30 nuevos iconos SVG a `icons.js`.
· **CSS:** `games.css` usa `overflow-x: auto` para las pestañas. Todos los juegos respetan `body.no-effects` (desactivando partículas y sombras pesadas).
· **Audio:** Añadido `mus/Cubic Nibbly.ogg` al Comprobador de Archivos en `config.js`.
· **Versión:** Actualizada a `2.0.6` en todo el proyecto.
· **Archivos:** Añadidos `snake.js`, `cube-run.js` y `Cubic Nibbly.ogg`.

## 📦 Archivos nuevos

· `expansions/expansion-pack-1/games/snake.js`
· `expansions/expansion-pack-1/games/cube-run.js`
· `mus/Cubic Nibbly.ogg`

## 📥 Instalación

### 🪟 Windows (Nativo)
1. Descarga `Nibbly-v2.0.6-Win64.zip` o `Nibbly-v2.0.6-Win32.zip`.
2. Extrae y ejecuta `Nibbly.exe`.
3. WebView2 se instalará automáticamente si falta.

### 📱 Android
1. Descarga `Nibbly-v2.0.6.apk`.
2. Activa "Instalar apps de origen desconocido".
3. Instala y abre.

### 🍏 iOS
1. Descarga `Nibbly.mobileconfig` usando Safari.
2. Instala el perfil vía Ajustes > General > VPN y Gestión de dispositivos.

## ⚠️ Notas de actualización

**Desde v2.0.5**
· No se necesita migración de datos. Los ajustes se mantienen en `nibbly-settings-v2`.
· Si compilas para Android/iOS, debes añadir los nuevos archivos (`snake.js`, `cube-run.js` y `Cubic Nibbly.ogg`) al directorio de compilación.

**Desde v2.0.4 o anterior**
· Revisa los Ajustes tras el primer arranque.
· Asegúrate de que `expansions/expansion-pack-2/` esté completamente actualizado.