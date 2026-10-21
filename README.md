<p align="center">
  <img src="https://github.com/edwarly999plus/Nibbly/blob/main/img/Nibbly%20Logo.png" alt="Nibbly Logo" width="160" height="160">
</p>

<h1 align="center">Nibbly</h1>

<p align="center">
  <b>El convertidor todo-en-uno para Android</b><br>
  Bases · Texto · Morse · Bits · Potencia · Multimedia · Calculadora · Dibujo · Juegos · Modo Privado
</p>

<p align="center">
  <img src="https://img.shields.io/badge/versión-1.0.4-5b8cff?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/Android-6.0%2B-3ddc84?style=for-the-badge&logo=android&logoColor=white" alt="Android">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/licencia-Apache%202.0-22d3a6?style=for-the-badge" alt="License">
</p>

<p align="center">
  <a href="https://github.com/edwarly999plus/Nibbly/releases/latest">
    <img src="https://img.shields.io/badge/⬇_Descargar_APK-Releases-5b8cff?style=for-the-badge&logo=android&logoColor=white" alt="Download APK">
  </a>
  <a href="https://edwarly999plus.github.io/Nibbly/">
    <img src="https://img.shields.io/badge/▶_Probar_Online-GitHub_Pages-22d3a6?style=for-the-badge&logo=github&logoColor=white" alt="Try Online">
  </a>
</p>

---

## 📥 Descarga

> **⚡ APK ya compilado disponible en [Releases](https://github.com/edwarly999plus/Nibbly/releases/latest)**

El APK incluye el HTML ya construido y listo para ejecutarse. **No requiere conexión a internet** una vez instalado.

**🎵 La música de fondo (`mus/You Are Nibbled.ogg`) ya viene incluida dentro del APK**, así que puedes activarla desde Ajustes **sin necesidad de conexión a internet** desde el primer arranque. En la versión **web/PC**, el archivo `.ogg` **no se incluye** (los PC suelen estar en casa con conexión estable); la música se descarga automáticamente la primera vez que la activas (usualmente en <5 s) y queda en caché para siguientes usos.

### ⚠️ Requisito importante

La app usa el **Android System WebView** (o Chrome) para renderizar la interfaz.

- **Android 6.0 (Marshmallow) o superior** ✅
- **Android System WebView** instalado y actualizado ✅
- En la mayoría de dispositivos modernos **ya viene preinstalado**

Si la app muestra una pantalla en blanco, actualiza **Android System WebView** desde Play Store o instala **Chrome**.

<p align="center">
  <a href="https://play.google.com/store/apps/details?id=com.google.android.webview">
    <img src="https://img.shields.io/badge/Actualizar_WebView-Play_Store-3ddc84?style=for-the-badge&logo=google-play&logoColor=white" alt="Update WebView">
  </a>
</p>

---

## 📸 Capturas de pantalla

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

## 📖 Descripción

**Nibbly** es una aplicación Android construida en **HTML5 + CSS3 + JavaScript** que reúne más de **30 herramientas de conversión**, **una calculadora con personalidad propia**, **un editor de dibujo**, **3 minijuegos informáticos** y un **modo privado con calculadora científica disfrazada**, todo en una sola interfaz **Material You 3** con temas personalizables, sonidos, registro de cálculos, música de fondo incluida y soporte bilingüe.

Ligera, rápida y **100% offline**. El APK se genera fácilmente con WebView, Capacitor o Cordova.

**Novedades destacadas de la 1.0.4:**
- 🔒 **Modo Privado** — calculadora privada + pantalla negra accesibles desde FABs en la topbar
- 🧮 **Calculadora científica** con expresión acumulada visible, paréntesis anidados y exponentes `x^y`
- 👁️ **Panic button** — salto instantáneo a pantalla negra con restauración del estado de la calc
- ⌨️ **Fix del teclado Android** tras salir de fullscreen (IME rescue automático)
- 🎵 **Pausa/reanudación automática** de la música al abrir/cerrar el modo privado
- 🔢 **Fix del medidor de RAM** — ahora llega a 100% con DDR5-8400
- 🎵 **Fix del medidor de bitrate** — ahora llega a 100% con CD/FLAC
- 🔍 **Fix del comprobador** — los `.ogg` ahora se validan correctamente con `<audio>`

---

## ✨ Características

### 🔢 Números
- Conversión entre bases **2 – 36**
- Salidas en **Binario, Octal, Decimal, Hex, Base32, Base36**
- **Nibble** (bloques de 4 bits) y **BCD** (Binary-Coded Decimal)
- **ASCII** y soporte para números grandes con `BigInt`
- **⏳ Botón "Convertir"** con delay de 3 s y **mensajes rotativos** ("Alineando los astros…", "Calculando matemáticamente…", etc.) — la conversión solo se ejecuta al pulsarlo, evitando saturar la consola y respetando el ritmo del usuario
- **🎲 Generador de códigos alfanuméricos** con:
  - Configuración de **separadores** (0 a N)
  - **Dígitos por bloque** personalizables
  - **6 tipos de separador**: guión, barra baja, barra, espacio, punto, ninguno
  - **4 tipos de caracteres**: números, mayúsculas, minúsculas, símbolos

### 📝 Texto
- Texto ↔ Binario, Octal, Decimal, Hex, ASCII, **Morse**, **Base64**
- Soporte completo de **Unicode** (emojis incluidos)
- **Teclado Morse integrado** (punto, línea, espacio, `/`) para dispositivos sin esas fuentes
- **🔊 Reproductor Morse**: escucha las frecuencias en formato beep (750 Hz) directamente desde la app
- **⬇ Descarga de audio Morse en .wav**: genera un archivo de audio con los tonos del mensaje para guardarlo o compartirlo (con 0.5 s de lead-in para evitar que algunos reproductores recorten el inicio)
- Auto-división de cadenas continuas al pegar

### 💾 Bits
- **bit, byte, KB, MB, GB, TB, PB, EB, ZB, YB** (SI)
- **KiB, MiB, GiB, TiB, PiB, EiB, ZiB, YiB** (IEC)
- **🔢 Calculadora de combinaciones**: cuántos valores caben en X bits/bytes/GB (2^N)

### ⚡ Potencia
- **Watts**: mW, W, kW, MW, GW, HP, CV, BTU/h con barra de calidad
- **🌡️ Medidor de calor de CPU**: introduce °C o °F y obtén el nivel de peligro, el uso estimado del procesador y un chiste cuando el calor llega a niveles extremos ("Tan caliente para freír un huevo", "Hace tanto calor que puedes prender una fogata y despedirte del CPU")
- **Velocidad de conexión**: bps → Tbps, B/s → GB/s con medidores de descarga y subida
- **CPU (GHz)**: Hz → THz con 8 barras de rendimiento verticales
- **🧠 RAM**: DDR, DDR2, DDR3, DDR4, DDR5 con ancho de banda por canal y dual channel — **medidor corregido en 1.0.4** para llegar a 100% con DDR5-8400
- **💾 Almacenamiento**: HDD, SSD SATA, NVMe Gen3/4/5, MicroSD, eMMC, USB, Thunderbolt

### 🎵 Multimedia
- **Bitrate de audio**: calidad desde voz hasta sin pérdida — **medidor corregido en 1.0.4** para llegar a 100% con CD 1411 kbps / FLAC
- **Decibelios**: dB SPL, dBu, dBV, dBFS, dBm con **espectro Grave/Medio/Agudo**
- **Resolución de vídeo**: px, Kpx, Mpx, MP, Gpx con escala de calidad
- **Conversor de tiempo**: ns → milenios con escala temporal clasificada
- **🎞️ Frames por unidad de tiempo**: frames/ns → frames/año con medidor de fluidez
- **Info de códecs**: MP3, AAC, Opus, FLAC, H.264, H.265, VP9, AV1, ProRes…
  - Calidad y eficiencia de compresión
  - Compatibilidad con **Android, iOS, Windows y Web**

### 🧮 Calculadora
- Funciones clásicas: **suma, resta, multiplicación, división, raíz cuadrada, potencias y cambio de signo**
- **💥 Explosión física opcional**: activa el interruptor **"Please Don't"** en Ajustes y, al cometer un error de sintaxis o una **división por cero**, los botones salen volando con física de gravedad, rotación y desvanecimiento. La calculadora queda inutilizable hasta que cambies de pestaña y vuelvas a entrar
- **🕳️ Agujero negro alternativa**: con "Please Don't" activado, cada error puede disparar una explosión **o** un agujero negro que succiona los botones girando y desaparece con un thud
- Desactivado por defecto → cálculo normal con `"Error"` en pantalla

### 🎨 Dibujo
Editor simple cargado como **expansión externa** (`paint/paint.css` y `paint/paint.js`) — pensado para diseñadores que trabajan con HTML y necesitan conocer los valores exactos de sus colores:

- **🖌️ Pincel** — trazos suaves con antialiasing, grosor ajustable 1–40 px
- **✏️ Lápiz** — pixel-perfect (Bresenham, sin antialiasing), respeta el grosor con bloques N×N
- **🧽 Borrador** — deja el píxel completamente transparente (`alpha = 0`)
- **💧 Cuentagotas** — toca cualquier píxel y captura su color exacto
- **🎨 Selector de color** con preview circular
- **📋 Copia individual** de valores `RGBA` y `HEX` (RGBA y HEX con botón 📋 cada uno) o **ambos a la vez**
- **Actualización instantánea** de los valores al apoyar el trazo (borrador resetea a `#00000000`)
- **Canvas adaptativo**: 320×320 px en móvil, 500×400 px en escritorio
- **Fondo de transparencia** (cuadros de ajedrez) para ver la opacidad real

### 🔒 Modo Privado
Módulo cargado como **expansión externa** (`privacy/privacy.css` y `privacy/privacy.js`). Añade **dos FABs discretos** en la topbar (junto al engranaje ⚙) para uso privado:

- **🧮 Calculadora privada** — interfaz oscura fullscreen con calculadora científica completa
- **👁️ Pantalla negra** — fullscreen real con salida por 3 toques

#### Aviso de responsabilidad
La primera vez aparece un modal con aviso académico y checkbox **"No mostrar de nuevo"** persistente en `localStorage` bajo `nibbly-privacy-v1`. Una vez marcado, no vuelve a aparecer.

#### Calculadora privada
- **📝 Expresión acumulada** visible: `(55) + (7) − (78) = -16`
- **🔢 Display grande** con número actual (clamp 40–80 px)
- **🧮 Layout simétrico tipo teclado numérico**:
```

C    ⌫    ±    ÷
7    8    9    ×
4    5    6    −
1    2    3    +
.    0    ,    =      ← 0 centrado entre los dos símbolos
(    )    √    x^y    ← funciones avanzadas al fondo

```
- **Operadores completos**: `+ − × ÷` · `x^y` (potencia `Math.pow`) · `√` (raíz) · `±` (signo) · `⌫` (backspace) · `C` (clear) · `=` · `(` `)` (paréntesis anidados)
- **Paréntesis con `parenStack`**:
  - Hasta 32 niveles de anidamiento
  - Cada `(` guarda el `previous` + `operator` del padre
  - Cada `)` cierra y aplica el resultado al padre
  - `=` **autocierra** todos los paréntesis pendientes
- **Decimales con `,` o `.`** (`1,5` = `1.5`, solo un separador por número)
- **Panic button 👁️** en el header:
  - Oculta la calc (`display: none`) **sin destruirla**
  - Salta a pantalla negra con `mode=returnToCalc`
  - Al volver → la calc reaparece **con el mismo estado intacto** (mismo número, misma expresión, mismo paréntesis abierto)
- **Botón `?`** → modal con tips de seguridad:
  1. Usa una pantalla anti-espía (privacy screen protector)
  2. Baja el brillo del celular al usar la app
  3. Evita usarla si la sala está oscura y puede delatarte la retroiluminación
  4. Sirve también para ocultar la operadora (Android) o apps abiertas (PC)
  5. Para los convertidores de bases, sal del fullscreen
- **Botón `✕`** → cierra la calc y vuelve al panel activo

#### Pantalla negra
- Fondo `#000` con `touch-action: none` (evita scroll accidental)
- **Fullscreen real** (oculta barras del sistema)
- **3 toques** (en ≤ 800 ms) para salir
- Si venías de la calc → vuelve con el **estado intacto**
- Si venías de la topbar → vuelve al panel activo

#### Fix del teclado Android tras fullscreen
Al salir de `requestFullscreen()` (o `onHideCustomView` del compilador WebToApp), el WebView **pierde la conexión con el IME** → los `<input>` dejan de responder hasta reiniciar la actividad. `rescueKeyboardAfterFullscreen()` reconecta el teclado con un `<input>` temporal y 4 intentos escalonados (0/120/350/700 ms).

#### Sincronización con la música
- 🎵 Pausa automática al abrir la calc o la pantalla negra
- 🎵 Reanudación automática al volver a la app principal
- 🎵 **No reanuda** si venías de calc → pantalla negra → calc (mantiene la pausa hasta salir del modo privado por completo)
- Implementado vía `window.__nibblyMusic` (API pública expuesta por `index.html`)

### 🎮 Juegos
Tres minijuegos informáticos completos, cargados como **archivos separados** (`games/games.css` y `games/games.js`) para mantener el `index.html` principal ligero:

- **🎲 2048**: tablero 4×4 con animación de **deslizamiento real** (los tiles se mueven físicamente entre celdas), soporte de swipe en móvil y teclas de flecha en escritorio
- **🧱 Tetris**: 10×20 con los 7 tetrominós clásicos, wall-kick al rotar, velocidad progresiva por nivel, controles táctiles y de teclado (`← → ↓ ↑ Espacio P`)
- **💣 Buscaminas**: 9×9 con 10 minas, primer clic siempre seguro, banderas con **botón dedicado 🚩** (para marcar de forma determinista en Android con un solo toque) y long-press como alternativa

**Ajustes:**
- **Interruptor Juegos ON/OFF** para desactivar la pestaña completa si te distrae
- Si los archivos `games/*` no existen, aparece el mensaje *"No hay juegos instalados, descargue los archivos faltantes en GitHub :("*

### 🖥️ Interfaz de escritorio (solo para web / PC)
> **⚠️ Importante — No incluir en la compilación del APK**
>
> La carpeta `desktop-ui/` es **exclusivamente para uso en navegador web / PC**. **No debe incluirse en el APK de Android** porque forzaría el layout de escritorio dentro de un móvil, rompiendo la interfaz en pantallas pequeñas.
>
> En **tablets Android**, el propio compilador (WebToApp, Capacitor, Cordova…) se encarga de **estirar el layout móvil** de forma natural sin verse raro, así que tampoco es necesaria la UI de escritorio en ese caso.
>
> **Inclúyela solo si** vas a distribuir el `index.html` para abrirlo directamente en un navegador de escritorio o empaquetarlo con otra herramienta que respete `desktop-ui/`.

Diseñada para usarse cómodamente desde un PC con ratón, cargada como **expansión externa** (`desktop-ui/desktop.css` y `desktop-ui/desktop.js`):

- **Sidebar vertical** con iconos por pestaña
- **Grid responsive** de tarjetas (2–3 columnas según ancho)
- **Atajos de teclado**: `1`–`8` cambian de pestaña, `Esc` cierra Ajustes
- **Modal centrado** para Ajustes (en vez de bottom sheet)
- **Badge de versión** junto al título
- **Hover states** en botones, tarjetas y tabs
- **Fallback automático** a layout móvil si la ventana baja de 900 px

**Force UI** en Ajustes → Interfaz:
- **Automático** — detecta el dispositivo (en Android WebView siempre será Bolsillo)
- **Forzar Bolsillo** — siempre mobile
- **Forzar Escritorio** — carga `desktop-ui/*`. Si los archivos no existen, el botón se grisea y al pulsarlo muestra *"Los archivos de expansión están rotos o no existen"*

### ⚙️ Ajustes
- 🎨 **Color resaltado y fondo personalizables** con presets oscuros
- 📋 **Registro de cálculos**: Desactivado / Consola / En la app
- ✨ **Efectos visuales** ON/OFF (afecta también al **fondo gradiente animado**)
- 🔊 **Sonidos** ON/OFF (Web Audio API) — afecta también al reproductor Morse y al modo privado
- 🎚️ **Sliders de volumen independientes** para música y sonidos (0–100%). Si un slider está en **0%**, el interruptor correspondiente se grisea y no se puede activar hasta subirlo a ≥1%
- 🌐 **Idioma**: Español / Inglés
- 🔍 **Comprobador de archivos**: detecta qué archivos de expansión (`games/`, `desktop-ui/`, `paint/`, `privacy/`, `images/`, `mus/`) están instalados y cuáles faltan

### 🎨 Fondo gradiente animado
Un **fondo gradiente radial animado** que respira suavemente con la música de fondo. El color del gradiente usa automáticamente el **color de acento** que hayas elegido, creando una experiencia visual coherente:

- Animación `bgPulse` de 9 s que alterna entre 100% y 32% de opacidad
- Combina con el ambiente relajante de *"You Are Nibbled"*
- Respeta el toggle **Efectos visuales** (se desactiva si apagas los efectos)
- Sin coste de rendimiento: usa `will-change: opacity` y `background-repeat: no-repeat`

### 🎵 Música de fondo
Música opcional en bucle. El comportamiento cambia según la plataforma:

#### 📱 En el APK de Android
- **✅ El archivo `.ogg` ya viene incluido** en el APK (`mus/You Are Nibbled.ogg`).
- **Funciona offline desde el primer arranque**, sin descargas ni esperas.
- Puedes activar la música desde Ajustes inmediatamente, incluso sin conexión a internet.
- **No requiere descargar nada.**
- **Se pausa automáticamente** al abrir el modo privado (calc / pantalla negra) y se reanuda al volver.

#### 💻 En la versión web / PC
- **El archivo `.ogg` NO se incluye** por defecto (los PC suelen estar en casa o en un sitio con conexión estable, así que no tiene sentido empaquetar el audio).
- La **primera vez** que actives la música, se descargará automáticamente desde **Archive.org** (`nibbly-ost-archive`). En la práctica tarda **menos de 5 segundos** con conexión normal.
- Una vez descargada, queda guardada en **Cache Storage** (`nibbly-theme`) y las siguientes veces se reproduce **al instante**, incluso sin conexión.
- Si quieres que la versión web también funcione offline desde el primer momento, puedes copiar manualmente `mus/You Are Nibbled.ogg` a la carpeta del proyecto.

#### Comportamiento en general
- Reproducción en bucle con volumen ajustable desde Ajustes.
- Se pausa automáticamente si cambias de app (respeta los controles del sistema).
- Se pausa al abrir el modo privado y se reanuda al volver.
- El fondo gradiente animado respira al ritmo de la música.

---

## 🚀 Instalación

### 📦 Opción 1 — Instalar el APK (recomendado)

1. Ve a la sección **[Releases](https://github.com/edwarly999plus/Nibbly/releases/latest)**
2. Descarga el archivo `.apk`
3. Habilita **"Instalar apps de fuentes desconocidas"** en los ajustes de Android
4. Instala el APK y abre la app

> **Nota:** El APK contiene el HTML ya construido **y la música de fondo incluida** (funciona offline desde el primer arranque). Solo necesita que **Android System WebView** esté instalado y actualizado (viene preinstalado en la mayoría de dispositivos).

### 🌐 Opción 2 — Probar online sin descargar nada

Accede directamente a la versión online alojada en **GitHub Pages**:

🔗 **[https://edwarly999plus.github.io/Nibbly/](https://edwarly999plus.github.io/Nibbly/)**

- ✅ Cero descargas, cero instalaciones
- ⚠️ Es una versión **online**: la app no guarda nada en servidores (todo es local vía `localStorage` + `Cache Storage`), pero necesitas conexión para cargar la página
- 💡 En PC puedes disfrutar de la **interfaz de escritorio** con sidebar y atajos de teclado

### 🛠️ Opción 3 — Compilar desde el código fuente

#### Estructura del proyecto

```

nibbly/
├── index.html                 ← app principal
├── games/                     ← ✅ INCLUIR en el APK
│   ├── games.css              ← estilos de los minijuegos
│   └── games.js               ← lógica de Tetris, Buscaminas y 2048
├── paint/                     ← ✅ INCLUIR en el APK
│   ├── paint.css              ← estilos del editor de dibujo
│   └── paint.js               ← lógica del canvas, herramientas y copia de colores
├── privacy/                   ← ✅ INCLUIR en el APK (NUEVO en 1.0.4)
│   ├── privacy.css            ← estilos del modo privado (FABs, calc, pantalla negra)
│   └── privacy.js             ← calculadora científica + pantalla negra + IME rescue
├── images/                    ← ✅ INCLUIR en el APK (opcional)
│   └── privacy.png            ← icono incógnito del FAB negro (fallback a 👁️ si falta)
├── mus/                       ← ✅ INCLUIR en el APK · ⚠️ OPCIONAL en web/PC
│   └── You Are Nibbled.ogg    ← música de fondo (offline en APK)
├── img/
│   └── (capturas para el README)
└── desktop-ui/                ← ❌ NO INCLUIR en el APK (solo web / PC)
├── desktop.css
└── desktop.js

```

#### ⚠️ Sobre `desktop-ui/` en la compilación Android

**No copies la carpeta `desktop-ui/` al proyecto Android.** Razones:

1. **Rompe la IU en móviles pequeños**: el layout de escritorio (sidebar de 260 px + grid de 2 columnas) no cabe en pantallas de menos de 900 px y aplasta los paneles.
2. **Es innecesaria en tablets**: cuando compilas para una tablet Android, el compilador **estira el layout móvil** de forma natural sin verse raro. No necesitas la UI de escritorio para eso.
3. **El `index.html` ya tiene el fallback integrado**: si detecta que no hay `desktop-ui/` disponibles, el botón **"Forzar Escritorio"** se grisea automáticamente y la app sigue funcionando solo con el layout de bolsillo (que es el correcto para Android).

Inclúyela **solo** si vas a servir el `index.html` desde un navegador web de escritorio.

#### 🔒 Sobre `privacy/` en la compilación Android

**Sí incluir la carpeta `privacy/` en el APK.** Contiene la calculadora privada y la pantalla negra, que son funcionalidades diseñadas para usarse específicamente en móvil.

- `privacy/privacy.css` → estilos de los FABs, la calc fullscreen y la pantalla negra
- `privacy/privacy.js` → lógica completa (calc científica, paréntesis anidados, rescue del IME, sincronización de música)
- `images/privacy.png` → **opcional**, si falta se usa `👁️` como fallback

#### 🎵 Sobre `mus/` en la compilación Android vs web/PC

| Plataforma | ¿Incluir `mus/`? | Comportamiento |
|---|---|---|
| **APK Android** | ✅ **Sí** (recomendado) | Música offline desde el primer arranque. Sin descargas. |
| **APK Android** | ⚠️ Opcional (sin `mus/`) | Se descarga desde Archive.org la primera vez y queda cacheada. |
| **Web / PC** | ⚠️ Opcional (por defecto **no**) | Se descarga desde Archive.org la primera vez que actives la música (<5 s) y queda cacheada. El PC suele estar en casa con conexión, así que no es necesario empaquetar el audio. |

Si quieres que la versión web **también** funcione offline desde el primer momento, copia manualmente `mus/You Are Nibbled.ogg` a la carpeta del proyecto web.

#### Con WebView manual
1. Copia **`index.html` + `games/` + `paint/` + `privacy/` + `images/` + `mus/`** (sin `desktop-ui/` ni `img/`) a `app/src/main/assets/`
2. Carga el archivo con `WebView.loadUrl("file:///android_asset/index.html")`
3. Habilita **JavaScript** en tu `WebView` (`webSettings.setJavaScriptEnabled(true)`)
4. Habilita **almacenamiento local** (`webSettings.setDomStorageEnabled(true)`)

#### Con Capacitor
```bash
npm install -g @capacitor/cli
npx cap init Nibbly com.edwarly999plus.nibbly
npx cap add android
# Copia index.html + games/ + paint/ + privacy/ + images/ + mus/ a la carpeta www/
# ⚠️ NO copies desktop-ui/ ni img/
npx cap sync
```

Con Cordova

```bash
cordova create nibbly com.edwarly999plus.nibbly Nibbly
cd nibbly
# Copia index.html + games/ + paint/ + privacy/ + images/ + mus/ a www/
# ⚠️ NO copies desktop-ui/ ni img/
cordova platform add android
cordova build android
```

---

📱 Uso

Navega entre las 8 pestañas principales + el Modo Privado:

Pestaña Descripción
Números Bases numéricas, BCD, ASCII y generador de códigos
Texto Codifica/decodifica texto con reproductor Morse y descarga WAV
Bits Unidades de almacenamiento y combinaciones
Potencia Watts, medidor de calor de CPU, velocidad de red, CPU, RAM y almacenamiento
Multimedia Audio, decibelios, vídeo, tiempo, frames y códecs
Calculadora Operaciones básicas con personalidad explosiva opcional
Dibujo Editor simple con copia de valores RGBA/HEX
Juegos Tetris, Buscaminas y 2048 (activables/desactivables)
🔒 Modo Privado Calculadora científica + pantalla negra (FABs en la topbar)

Pulsa el engranaje ⚙ para acceder a Ajustes y personalizar colores, sonidos, música, idioma, interfaz, registro de cálculos, comprobador de archivos y el toggle "Please Don't".

Los dos FABs nuevos junto al engranaje (🧮 y 👁️) activan el Modo Privado. La primera vez pide confirmar con un aviso de responsabilidad que se puede silenciar marcando "No mostrar de nuevo".

🎵 Para activar la música: Ajustes → Música → Música de fondo ON.

· En el APK de Android: funciona offline desde el primer momento (el .ogg está incluido).
· En la versión web/PC: se descarga en <5 s la primera vez (requiere conexión) y queda cacheada para siempre.
· Se pausa automáticamente al abrir el Modo Privado y se reanuda al volver.

---

🔒 Privacidad

Nibbly es una aplicación 100% privada y offline:

· ❌ No recopila datos de ningún tipo
· ❌ No tiene analytics ni telemetría
· ❌ No envía información a servidores externos
· ✅ Todos los ajustes se guardan localmente en el dispositivo (localStorage)
· ✅ Las conversiones, cálculos y dibujos ocurren exclusivamente en el dispositivo
· ✅ El Modo Privado es completamente offline — no requiere red ni envía nada

⚠️ Enlaces externos

Al pulsar "Código Fuente en GitHub" (o cualquier otro enlace externo):

· En PC: el enlace se abre en una nueva pestaña del navegador (comportamiento estándar)
· En Android: el enlace se muestra dentro de la app por limitaciones del compilador WebView. No inicies sesión desde Nibbly — hazlo desde tu navegador para mayor seguridad y comodidad.
· Nibbly no es responsable de la recolección de datos que esas páginas de terceros puedan realizar. Consulta la política de privacidad de cada sitio externo que visites.

🔒 Sobre el Modo Privado

El Modo Privado está diseñado para situaciones de "offline discreto" (por ejemplo, un examen con permiso de celular sin conexión). No es una herramienta para hacer trampa — el aviso de responsabilidad lo deja claro cada vez que lo abres (a menos que marques "No mostrar de nuevo"). Los datos del Modo Privado se guardan aparte bajo nibbly-privacy-v1 en localStorage, sin afectar tus ajustes principales.

---

❓ Preguntas y Respuestas

¿Cómo hiciste esta App?

En HTML5 — HTML + CSS + JavaScript vanilla. Sin frameworks, sin dependencias externas, sin build step. Todo vive en un único index.html más las carpetas de expansión (games/, paint/, privacy/, desktop-ui/, mus/).

¿Por qué no compilas una versión nativa .exe?

Porque no tengo PC. Toda la app fue desarrollada desde un editor de texto simple en Android, sin IDEs ni herramientas de escritorio. Esa también es la razón por la que algunos juegos y funciones son relativamente simples — están pensados para funcionar bien con los recursos disponibles en móvil y sin dependencias pesadas.

¿Cómo puedo probarla en mi PC?

Ve a Releases, descarga el archivo Source code.zip, extráelo y abre el index.html con cualquier navegador moderno (Chrome, Firefox, Edge, Safari). La app cargará automáticamente todos los archivos de expansión (games/*, paint/*, privacy/*, mus/*, etc.) desde las carpetas del repo, sin necesidad de compilar ni instalar nada.

💡 En PC puedes disfrutar además de la interfaz de escritorio (desktop-ui/) con sidebar vertical, grid de tarjetas y atajos de teclado 1–8. En el APK de Android esa carpeta no se incluye para no romper el layout móvil.

¿Puedo probarla sin descargar nada?

¡Sí! Puedes acceder directamente a la versión online alojada en GitHub Pages:

🔗 https://edwarly999plus.github.io/Nibbly/

Ventaja: cero descargas, cero instalaciones. Abres el enlace y la app funciona al instante.

Desventaja: es una versión online. La app no guarda archivos ni conversiones en ningún servidor (todo es local en tu navegador vía localStorage y Cache Storage), pero sí necesitas conexión para entrar a la página. Si pierdes conexión antes de cargarla, no podrás acceder. Una vez cargada, la mayoría de funciones siguen funcionando offline (excepto las que dependen de red, como el fallback de música de Archive.org).

¿Por qué el link de GitHub no se abre en el navegador en Android?

Por limitaciones del compilador WebView utilizado (WebToApp): el compilador no respeta la opción de "abrir en navegador externo" cuando compila HTMLs (aunque sí la respeta al compilar sitios web online). En PC el enlace se abre correctamente en una pestaña nueva. En Android se abre dentro de la propia app — recomendamos no iniciar sesión desde Nibbly y hacerlo desde el navegador para mayor seguridad.

¿Dónde está la música si activo "Música de fondo"?

· APK Android: el archivo mus/You Are Nibbled.ogg ya viene incluido → funciona offline desde el primer arranque, sin descargas.
· Versión web/PC: el archivo no se incluye (los PC suelen tener conexión estable). La primera vez que actives la música se descarga automáticamente desde Archive.org en menos de 5 segundos y queda guardada en caché para siempre.

¿Cómo funciona el Modo Privado?

El Modo Privado son dos FABs que aparecen junto al engranaje de Ajustes:

· 🧮 Calculadora privada: abre una calculadora científica fullscreen (oscura) con expresión acumulada, paréntesis anidados y exponentes x^y. Ideal si necesitas calcular algo de forma discreta sin que se vea como una calc "de juguete".
· 👁️ Pantalla negra: abre una pantalla completamente negra que entra en fullscreen (oculta barras). Se sale con 3 toques (en ≤ 800 ms). Si venías de la calc, vuelve a ella con el mismo estado.

Ambos modos pausan la música automáticamente y la reanudan al salir (si estabas en modo principal).

¿Por qué me pide confirmar el Modo Privado la primera vez?

Es un aviso de responsabilidad. Nibbly no quiere que el Modo Privado se use para hacer trampa en un examen donde el profesor no permite el celular. El aviso explica que solo debes usarlo si el profesor permite celulares sin conexión. Puedes marcar "No mostrar de nuevo" para no volver a verlo.

¿La app tiene virus?

No. Nibbly es una aplicación de código abierto con el código fuente disponible en este mismo repositorio — puedes revisarlo tú mismo en cualquier momento.

Es cierto que 1 detección aislada en VirusTotal puede levantar sospechas, pero eso es un falso positivo típico del compilador (WebToApp). Los compiladores de WebView empaquetan el HTML en un contenedor nativo genérico que muchos antivirus marcan por heurística, aunque el contenido sea completamente inofensivo.

🚫 Sin anuncios ni notificaciones

Nibbly no muestra ningún tipo de anuncio y no envía ninguna notificación. Punto.

· ❌ Cero anuncios — ni banners, ni intersticiales, ni recompensados, ni pop-ups
· ❌ Cero notificaciones — ni push, ni locales, ni recordatorios, ni avisos
· ❌ Cero integración con SDKs publicitarios (AdMob, Unity Ads, AppLovin, Facebook Ads, etc.)

¿Ves anuncios o notificaciones en tu dispositivo? Entonces tienes un adware instalado en el teléfono. Los adware son apps maliciosas que inyectan anuncios sobre OTRAS apps (no solo Nibbly) — aparecen como capas flotantes encima de cualquier aplicación, incluida esta. Nibbly no puede generar anuncios porque:

1. Su código es HTML+JS puro sin SDK de publicidad
2. El compilador WebToApp no incluye ningún módulo de ads
3. El AndroidManifest.xml generado no declara servicios de notificación ni receptores de broadcast
4. No hay permisos de "Mostrar sobre otras apps" ni "Acceso a notificaciones" solicitados

Si ves anuncios flotantes o notificaciones fantasma, prueba esto:

1. Cierra Nibbly por completo (no solo en segundo plano — fuerza parada en Ajustes → Apps → Nibbly → Forzar detención)
2. Si los anuncios siguen apareciendo con Nibbly cerrada → no es Nibbly, es otra app
3. Si los anuncios desaparecen con Nibbly cerrada → pulsa el botón "Recientes" mientras aparece un anuncio → mira qué app está asociada
4. Pasa un análisis con Malwarebytes (especializado en adware) o revisa Ajustes → Apps → Permisos especiales → Mostrar sobre otras apps para ver qué apps tienen este permiso activado

⏹️ No se ejecuta en segundo plano

Nibbly no tiene servicio en segundo plano, ni WorkManager, ni JobScheduler, ni ForegroundService. Cuando la app pasa a segundo plano sin música, el proceso muere automáticamente. Punto.

La música de fondo sigue estas reglas exactas:

Acción Comportamiento de la música Estado de la app
🕐 Dejar la app abierta (primer plano) ✅ Se loopea indefinidamente 🟢 Activa
🏠 Botón Inicio (Home) ⏳ Sigue sonando hasta terminar la pista (~2 min) y se detiene 🔴 Se mata sola al terminar la música
🔙 Botón Back (Atrás) ❌ Se corta al instante 🔴 Cerrada
📱 Recientes → Deslizar la app ❌ Se corta al instante 🔴 Cerrada
⚙️ Ajustes → Forzar detención ❌ Se corta al instante 🔴 Cerrada
🔇 Desactivar música manualmente ❌ Se corta al instante 🔴 Se mata sola (sin música = sin keep-alive)
📞 Recibir llamada ❌ Se pausa 🟡 En pausa (vuelve al terminar la llamada)
🔒 Bloquear pantalla 🟢 Sigue activa en loop ⚠️ Recomiendo bajar el volumen o cerrar la app antes de bloquear

Resumen del ciclo de vida:

· App visible (primer plano) → la música se loopea sin parar mientras estés en Nibbly ✅
· Pulsar Home → la música sigue sonando hasta que termina la pista (~2 min), y entonces la app se mata sola. No queda nada corriendo en segundo plano 🎯
· Matar la app manualmente (Back / Recents / Forzar detención / Desactivar música) → silencio inmediato + proceso muerto al instante

💡 Nota técnica: el proceso de la app está vinculado al AudioContext del WebView. Mientras haya audio reproduciéndose, Android mantiene el proceso vivo. Cuando el audio termina (porque el loop está roto en segundo plano), el WebView libera el AudioContext y el compilador WebToApp mata el proceso para no consumir recursos. Es decir: Nibbly literalmente se auto-apaga cuando la música termina en background. Si nunca activaste la música, la app se mata al instante al pulsar Home.

Sobre la música:

· 🎵 No es molesta: es una melodía relajante ("You Are Nibbled") pensada para acompañar, no para distraer.
· 🔇 Casi no se nota en dispositivos con poca calidad de audio o audio mono — se percibe como un fondo suave, no como música predominante.
· 🎚️ Puedes bajarla o silenciarla por completo desde Ajustes → Música → Mover el slider de volumen a 0% o desactivar el interruptor.
· ⏱️ Duración por pista: ~2 minutos. Con la app abierta se loopea, así que suena indefinidamente hasta que la desactives.

🔋 Consumo de batería

Nibbly solo consume batería cuando está en primer plano. No hay servicios en segundo plano, ni wake locks, ni alarmas programadas — nada que consuma batería mientras no la estés viendo. Además, cuando la app se auto-mata al salir, deja de consumir batería por completo.

Si notas que consume más de lo normal:

1. Es normal que una app con animaciones, música, canvas y efectos consuma algo de batería mientras la usas — es el precio de tener una interfaz fluida con diseño personalizable.
2. Puedes activar el ahorro de batería optimizado en: Ajustes de Android → Batería → Uso de batería → Nibbly → Optimizar (o "Restringir en segundo plano" en algunas versiones).
3. La app seguirá funcionando con normalidad — no requiere permisos especiales, ni "sin restricciones", ni "ejecución en segundo plano". Al optimizarla, Android puede matarla más rápido al salir, pero no afecta a su funcionamiento normal mientras la usas.

Consumo real esperado:

· 📱 Uso normal (conversiones, calculadora, texto): consumo mínimo — comparable a cualquier app de utilidades.
· 🎵 Con música activada: consumo bajo — el AudioContext del WebView es ligero.
· 🎮 Con juegos activados: consumo moderado — Tetris, 2048 y Buscaminas usan requestAnimationFrame y setInterval, pero solo mientras están en primer plano.
· 🔒 Con Modo Privado abierto: consumo bajo — solo un canvas y texto, sin animaciones pesadas.
· ⚙️ Con efectos visuales desactivados: consumo aún menor — se apagan animaciones, degradados y el fondo animado.

No consume batería cuando:

· Está cerrada completamente (Back / Recents / Forzar detención)
· Está en segundo plano (Home) — la música se detiene al terminar la pista, y la app se mata sola
· La has cerrado manualmente o el sistema la ha matado

⚡ Rendimiento

Nibbly no va lenta por sí sola. Si experimentas lag, es la capacidad de tu dispositivo, no un problema de la app.

Nibbly está pensada para funcionar fluida en la mayoría de teléfonos modernos y viejos — sin frameworks, sin dependencias pesadas, todo en HTML+CSS+JS vanilla. Si tu teléfono es de gama baja, tiene poca RAM o es de hace varios años, puedes notar lag en algunos puntos concretos:

· El fondo gradiente animado (siempre visible)
· Las animaciones de transición entre pestañas
· Los juegos (Tetris a velocidad alta, 2048 con muchos tiles)
· El canvas del editor de dibujo con trazos largos

Solución: desactiva los efectos visuales

Ve a Ajustes → Efectos visuales → Desactivar. Esto apaga:

· ❌ Las animaciones de transición entre pestañas
· ❌ El fondo gradiente animado (bgPulse)
· ❌ Las transiciones suaves en botones, chips y cards
· ❌ La animación de pulso del logo
· ❌ El efecto de glow en botones activos

Resultado: la app se siente mucho más ligera y responde al instante, sin perder ninguna funcionalidad. Todas las herramientas, juegos, dibujo, modo privado y ajustes siguen funcionando exactamente igual — solo sin adornos visuales.

Además, si tienes problemas de rendimiento:

· 🎵 Silencia la música desde Ajustes → Música → Volumen 0% o desactivar interruptor
· 🎮 Desactiva la sección de Juegos si no la usas: Ajustes → Juegos ON/OFF → desactivar
· 🎨 Evita el editor de dibujo si tu teléfono va lento con canvas grandes
· 📋 Desactiva el Registro de cálculos: Ajustes → Registro → Desactivado

Con estos ajustes, Nibbly puede funcionar fluida incluso en dispositivos modestos — no es una app pesada por diseño, es que a veces los efectos visuales añaden carga innecesaria.

📂 A qué accede realmente la app

Solo 3 ubicaciones/permisos, todos estándar para cualquier navegador o app común:

1. 📥 Carpeta de Descargas (pública)
   · Solo escribe cuando tú pulsas el botón WAV en la pestaña Texto para guardar el audio Morse.
   · No lee, no escanea, no borra nada de esa carpeta. Solo añade el archivo que tú pides guardar.
   · Es exactamente lo mismo que hace Chrome, Firefox o cualquier navegador cuando descargas un archivo.
   · En Android 10+ se usa MediaStore para escribir directo en Descargas sin permisos amplios.
2. 📁 Datos internos de la app (privados, root de la propia app)
   · Estado de la app: colores, idioma, música, sonidos, localStorage con todos tus ajustes.
   · Estado del Modo Privado (nibbly-privacy-v1 en localStorage).
   · Logs de la calculadora (si activas "Registro de cálculos" en Ajustes).
   · Caché de la música (si se descarga desde Archive.org en la versión web).
   · Esta carpeta solo existe dentro de Nibbly — es inaccesible desde otras apps y se borra al desinstalar.
3. 📳 Vibración (permiso de hardware, no de datos)
   · Solo vibra en momentos concretos y breves:
     · Al pulsar botones importantes (detectados automáticamente por el compilador de Android) — pulsos de ~20–30 ms.
     · Al marcar una bandera en Buscaminas — pulso de 25 ms para confirmar la acción.
   · Nunca vibra sin parar. No hace bucles de vibración, no reproduce patrones largos, no hay navigator.vibrate(60000) ni similares.
   · Es exactamente el mismo tipo de feedback háptico que hace Chrome al pulsar un enlace o cualquier app de mensajería al recibir un mensaje.
   · Si no te gusta, puedes desactivar la vibración en Ajustes → Apps → Nibbly → Notificaciones → Vibrar, o con el modo "No molestar" activado.

NINGUNA OTRA CARPETA NI PERMISO. Ni fotos, ni vídeos, ni música, ni documentos, ni contactos, ni nada más.

🚫 Qué permisos NO solicita (nunca)

· ❌ Contactos
· ❌ SMS / Llamadas
· ❌ Cámara
· ❌ Micrófono
· ❌ Ubicación
· ❌ Calendario
· ❌ Sensores corporales
· ❌ Cuentas del dispositivo
· ❌ Notificaciones (ni push, ni locales, ni de ningún tipo)
· ❌ Mostrar sobre otras apps (el permiso que usan los adware para inyectar anuncios)
· ❌ Acceso a notificaciones (el permiso que usan los adware para espiar notificaciones)
· ❌ Acceso a fotos / galería
· ❌ Acceso a música / audio del sistema
· ❌ Acceso a documentos
· ❌ Acceso a registros de llamadas
· ❌ Administrador del dispositivo (root / superusuario)

🌐 Internet — para qué se usa

· Cargar la música de fondo la primera vez desde Archive.org (en APK viene incluida, así que normalmente no se usa)
· Abrir enlaces externos (como el de GitHub) dentro del WebView
· Nada más. Sin analytics, sin telemetría, sin llamadas a servidores propios, sin publicidad.
· El Modo Privado NO usa internet — todo es local (canvas, texto, localStorage).

✅ Argumentos para descartar un virus

· ✅ La app no solicita permisos innecesarios — solo los 3 accesos estándar descritos arriba
· ✅ Todo el código es visible en este repo: index.html, games/, paint/, privacy/, desktop-ui/ — no hay binarios ofuscados
· ✅ No incluye analytics, telemetría ni SDKs de terceros
· ✅ No envía datos a servidores externos (todo es local)
· ✅ La vibración es puntual y breve — no puede dejar el teléfono vibrando sin parar
· ✅ Cero anuncios y cero notificaciones — si ves alguno, es adware de otra app
· ✅ Se auto-mata al pasar a segundo plano — no puede consumir batería ni enviar datos ocultos

🔍 Si sospechas que entró un virus después de instalar la app

1. Verifica la fuente de descarga — asegúrate de haber descargado el APK directamente desde la sección Releases de este repositorio. Cualquier APK de otro sitio (webs de terceros, grupos de Telegram, mirrors no oficiales…) no es responsabilidad del proyecto y podría haber sido modificado.
2. Verifica si tu teléfono fue infectado por otra cosa en el mismo momento de la instalación — otras apps recién instaladas, APKs de fuentes desconocidas, links sospechosos, etc.
3. Pasa un análisis completo con Play Protect (Ajustes → Google → Play Protect → Analizar) o con Malwarebytes / Kaspersky / Bitdefender. Malwarebytes es especialmente bueno detectando adware.
4. Revisa los permisos concedidos en Ajustes → Apps → Nibbly → Permisos. Solo deberían aparecer:
   · Almacenamiento (o "Archivos y medios" en Android 13+)
   · Internet
   · Vibración (o "Control de vibración" en algunas versiones de Android)
     Si ves cualquier otro permiso activo (cámara, micrófono, ubicación, contactos, notificaciones, mostrar sobre otras apps…), algo va mal — desinstala y reinstala desde Releases oficiales.
5. Revisa qué apps tienen acceso reciente a tu almacenamiento en Ajustes → Privacidad → Administrador de permisos → Archivos y medios. Ahí ves todas las apps que han tocado archivos, no solo Nibbly.
6. Comprueba que la vibración es puntual: si instalas la app y notas que el teléfono vibra de forma repetida o sin que tú pulses nada, no es Nibbly — Nibbly solo vibra como respuesta a tus pulsaciones (nunca de forma autónoma ni en bucle).
7. Revisa apps con "Mostrar sobre otras apps": Ajustes → Apps → Permisos especiales → Mostrar sobre otras apps. Si hay alguna app con este permiso que no reconozcas, esa es la que inyecta anuncios, no Nibbly (Nibbly no pide este permiso).

🐞 Si tras revisar todo lo anterior sigues teniendo dudas

Abre un Issue con:

· Descripción clara de lo que viste
· Captura del reporte de VirusTotal (si lo tienes)
· Fuente exacta de donde descargaste el APK
· Versión de Android y de Android System WebView
· Captura de la pantalla de permisos de la app
· Cualquier otra app instalada en ese momento

---

🛠️ Tecnología

· HTML5 — estructura semántica
· CSS3 — Material You 3, color-mix(), variables CSS, animaciones, dvh/svh para adaptación al viewport
· JavaScript vanilla — sin dependencias, sin build step
· Web Audio API — sonidos de click y beeps Morse sintetizados
· Canvas 2D API — editor de dibujo con Bresenham pixel-perfect
· BigInt — aritmética de precisión arbitraria
· LocalStorage — persistencia de ajustes (2 namespaces: nibbly-settings-v2 + nibbly-privacy-v1)
· Cache Storage API — caché offline de la música remota (solo en web/PC, o en APK si se omite mus/)
· ResizeObserver — recálculo dinámico de posiciones en 2048
· requestAnimationFrame — física de la explosión de la calculadora y del agujero negro
· Fullscreen API — pantalla negra del Modo Privado
· Android System WebView — motor de renderizado

Tamaño aproximado:

· APK completo (con mus/): ~290 KB de web + ~1–2 MB del archivo .ogg
· APK mínimo (sin mus/): ~290 KB (la música se descarga la primera vez y queda cacheada)
· Web / PC (sin mus/, sin desktop-ui/): ~265 KB
· Web / PC (con desktop-ui/, sin mus/): ~290 KB
· Web / PC (con todo): ~290 KB + ~1–2 MB del .ogg

---

🗺️ Roadmap

· ☑ v1.0.0 — Versión inicial completa
· ☑ v1.0.1 — Versión enfocada al diseño: música de fondo con fallback en Archive.org, fondo gradiente animado que respira con la música
· ☑ v1.0.2 — Calidad de vida + minijuegos:
  · Sección Juegos con Tetris, Buscaminas y 2048
  · Interfaz de escritorio opcional (desktop-ui/)
  · Calculadora con personalidad ("Please Don't" → explosión física)
  · Medidor de calor de CPU con chistes
  · Botones "Convertir" con delay y mensajes rotativos
  · Descarga de audio Morse en .wav
  · Sliders de volumen independientes
  · Force UI (Bolsillo / Escritorio)
  · Sincronización robusta de toggles tras recargar o cambiar de layout
· ☑ v1.0.3 — Massive Bug Fix + Editor de dibujo:
  · Editor de dibujo (paint/) con pincel, lápiz pixel-perfect, borrador y cuentagotas
  · Copia individual de valores RGBA/HEX
  · Comprobador de archivos de expansión en Ajustes
  · Sección de privacidad sobre enlaces externos
  · Fix: glow de botones en Juegos ahora respeta el color de acento
  · Fix: apertura de GitHub en el navegador externo (con fallback in-app si el compilador lo fuerza)
  · Fix: toasts visibles sobre Ajustes (ya no se ocultan detrás del sheet)
  · Fix: textos en sentence case en lugar de Todo En Mayúsculas
  · Documentación: aclaración de que desktop-ui/ no debe incluirse en el APK
  · Documentación: aclaración del comportamiento de la música en APK (incluida) vs PC (descarga en <5 s la primera vez)
  · Documentación: ciclo de vida completo de la app (se auto-mata al salir sin música o al terminar la música en background)
· ☑ v1.0.4 — Modo Privado + calculadora científica:
  · Calculadora privada con expresión acumulada, paréntesis anidados y exponentes x^y
  · Pantalla negra con fullscreen y salida por 3 toques
  · Panic button en la calc → oculta sin destruir, restaura al volver
  · Aviso de responsabilidad con "no mostrar de nuevo" persistente
  · Tips de seguridad dentro de la calculadora
  · Fix del IME rescue tras salir de fullscreen (teclado Android)
  · Fix del medidor de RAM (ahora llega a 100% con DDR5-8400)
  · Fix del medidor de bitrate de audio (ahora llega a 100% con CD/FLAC)
  · Fix del comprobador de archivos con .ogg (usa <audio> no <img>)
  · Icono incógnito con images/privacy.png (fallback a 👁️)
  · Pausa/reanudación automática de música en modo privado
· ☐ v1.0.x — Corrección de bugs (según issues reportados)

Nota: A partir de ahora el proyecto entra en modo mantenimiento. Solo se aceptarán pull requests de bugfix. Las nuevas funciones se considerarán caso por caso.

---

🤝 Contribuir

Las contribuciones son bienvenidas, especialmente bugfixes:

1. Haz un fork del proyecto
2. Crea una rama: git checkout -b fix/nombre-del-bug
3. Commit: git commit -m "fix: descripción del bug"
4. Push: git push origin fix/nombre-del-bug
5. Abre un Pull Request

Si encuentras un bug, abre un Issue con:

· Descripción clara
· Pasos para reproducirlo
· Captura de pantalla (si aplica)
· Versión de Android y de Android System WebView
· Pestaña afectada (Números, Texto, Bits, Potencia, Multimedia, Calculadora, Dibujo, Juegos o Modo Privado)

---

👤 Autor

EdwarlyGamer999+

· 🐙 GitHub: @edwarly999plus
· 📦 Repositorio: Nibbly

---

📄 Licencia

Este proyecto está bajo la licencia Apache-2.0. Consulta el archivo LICENSE para más detalles.

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
  <b>Hecho con ♥️ por EdwarlyGamer999+</b><br>
  <sub>⭐ Si te gustó el proyecto, dale una estrella en GitHub ⭐</sub>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/edwarly999plus/Nibbly" alt="Stars">
  <img src="https://img.shields.io/github/forks/edwarly999plus/Nibbly?style=social" alt="Forks">
  <img src="https://img.shields.io/github/issues/edwarly999plus/Nibbly" alt="Issues">
</p>