<!-- ═══════════════════════════════════════════════════════════ -->
<!--                          LOGO                              -->
<!-- ═══════════════════════════════════════════════════════════ -->

<p align="center">
  <img src="https://github.com/edwarly999plus/Nibbly/blob/main/img/Nibbly%20Logo.png" alt="Nibbly Logo" width="160" height="160">
</p>

<h1 align="center">Nibbly</h1>

<p align="center">
  <b>El convertidor todo-en-uno para Android</b><br>
  Bases · Texto · Morse · Bits · Potencia · Multimedia · Calculadora · Juegos
</p>

<p align="center">
  <img src="https://img.shields.io/badge/versión-1.0.2-5b8cff?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/Android-6.0%2B-3ddc84?style=for-the-badge&logo=android&logoColor=white" alt="Android">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/licencia-Apache 2.0-22d3a6?style=for-the-badge" alt="License">
</p>
<p align="center">
  <a href="https://github.com/edwarly999plus/Nibbly/releases/latest">
    <img src="https://img.shields.io/badge/⬇_Descargar_APK-Releases-5b8cff?style=for-the-badge&logo=android&logoColor=white" alt="Download APK">
  </a>
</p>

---

## 📥 Descarga

> **⚡ APK ya compilado disponible en [Releases](https://github.com/edwarly999plus/Nibbly/releases/latest)**

El APK incluye el HTML ya construido y listo para ejecutarse. **No requiere conexión a internet** una vez instalado (la música de fondo remota se cachea tras la primera reproducción).

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

**Nibbly** es una aplicación Android construida en **HTML5 + CSS3 + JavaScript** que reúne más de **30 herramientas de conversión**, **una calculadora con personalidad propia** y **3 minijuegos informáticos**, todo en una sola interfaz **Material You 3** con temas personalizables, sonidos, registro de cálculos, música de fondo opcional y soporte bilingüe.

Ligera, rápida y **100% offline**. El APK se genera fácilmente con WebView, Capacitor o Cordova.

**Novedades destacadas de la 1.0.2:**
- 🎮 **Sección Juegos** con Tetris, Buscaminas y 2048 (activables/desactivables)
- 🧮 **Calculadora con personalidad** (explota si activas "Please Don't" y cometes un error)
- 🖥️ **Interfaz de escritorio opcional** con atajos de teclado
- 🌡️ **Medidor de calor de CPU** con °C/°F y chistes
- ⏳ **Botones "Convertir"** con delay de 3 s y mensajes rotativos (para no saturar la consola)
- 🔊 **Descarga de audio Morse en .wav** directamente desde la pestaña Texto
- 🎚️ **Sliders de volumen** independientes para música y sonidos

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
- **🧠 RAM**: DDR, DDR2, DDR3, DDR4, DDR5 con ancho de banda por canal y dual channel
- **💾 Almacenamiento**: HDD, SSD SATA, NVMe Gen3/4/5, MicroSD, eMMC, USB, Thunderbolt

### 🎵 Multimedia
- **Bitrate de audio**: calidad desde voz hasta sin pérdida
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
- Desactivado por defecto → cálculo normal con `"Error"` en pantalla

### 🎮 Juegos
Tres minijuegos informáticos completos, cargados como **archivos separados** (`games/games.css` y `games/games.js`) para mantener el `index.html` principal ligero:

- **🎲 2048**: tablero 4×4 con animación de **deslizamiento real** (los tiles se mueven físicamente entre celdas), soporte de swipe en móvil y teclas de flecha en escritorio
- **🧱 Tetris**: 10×20 con los 7 tetrominós clásicos, wall-kick al rotar, velocidad progresiva por nivel, controles táctiles y de teclado (`← → ↓ ↑ Espacio P`)
- **💣 Buscaminas**: 9×9 con 10 minas, primer clic siempre seguro, banderas con **botón dedicado 🚩** (para marcar de forma determinista en Android con un solo toque) y long-press como alternativa

**Ajustes:**
- **Interruptor Juegos ON/OFF** para desactivar la pestaña completa si te distrae
- Si los archivos `games/*` no existen, aparece el mensaje *"No Hay Juegos Instalados, Descargue Los Archivos Faltantes En GitHub :("*

### 🖥️ Interfaz de escritorio (opcional)
Diseñada para usarse cómodamente desde un PC con ratón, cargada como **expansión externa** (`desktop-ui/desktop.css` y `desktop-ui/desktop.js`):

- **Sidebar vertical** con iconos por pestaña
- **Grid responsive** de tarjetas (2–3 columnas según ancho)
- **Atajos de teclado**: `1`–`7` cambian de pestaña, `Esc` cierra Ajustes
- **Modal centrado** para Ajustes (en vez de bottom sheet)
- **Badge de versión** junto al título
- **Hover states** en botones, tarjetas y tabs
- **Fallback automático** a layout móvil si la ventana baja de 900 px

**Force UI** en Ajustes → Interfaz:
- **Automático** — detecta el dispositivo
- **Forzar Bolsillo** — siempre mobile
- **Forzar Escritorio** — carga `desktop-ui/*`. Si los archivos no existen, el botón se grisea y al pulsarlo muestra *"Los Archivos De Expansión Están Rotos O No Existen"*

### ⚙️ Ajustes
- 🎨 **Color resaltado y fondo personalizables** con presets oscuros
- 📋 **Registro de cálculos**: Desactivado / Consola / En la app
- ✨ **Efectos visuales** ON/OFF (afecta también al **fondo gradiente animado**)
- 🔊 **Sonidos** ON/OFF (Web Audio API) — afecta también al reproductor Morse
- 🎚️ **Sliders de volumen independientes** para música y sonidos (0–100%). Si un slider está en **0%**, el interruptor correspondiente se grisea y no se puede activar hasta subirlo a ≥1%
- 🌐 **Idioma**: Español / Inglés

### 🎨 Fondo gradiente animado
Desde la 1.0.1, la app incluye un **fondo gradiente radial animado** que respira suavemente con la música de fondo. El color del gradiente usa automáticamente el **color de acento** que hayas elegido, creando una experiencia visual coherente:

- Animación `bgPulse` de 9 s que alterna entre 100% y 32% de opacidad
- Combina con el ambiente relajante de *"You Are Nibbled"*
- Respeta el toggle **Efectos visuales** (se desactiva si apagas los efectos)
- Sin coste de rendimiento: usa `will-change: opacity` y `background-repeat: no-repeat`

### 🎵 Música de fondo
Desde la 1.0.1, la app soporta música de fondo opcional:

- **Archivo local**: `mus/You Are Nibbled.ogg` (si existe se usa preferentemente)
- **Fallback remoto**: si el archivo local no se encuentra en **5 s**, se carga automáticamente la versión alojada en **Archive.org** (`nibbly-ost-archive`)
- **Caché offline**: tras la primera reproducción remota, la pista se guarda en **Cache Storage** (`nibbly-theme`) para que las siguientes ejecuciones funcionen sin conexión
- Reproducción en bucle con volumen ajustable desde Ajustes
- Se pausa automáticamente si cambias de app (respeta los controles del sistema)

---

## 🚀 Instalación

### 📦 Opción 1 — Instalar el APK (recomendado)

1. Ve a la sección **[Releases](https://github.com/edwarly999plus/Nibbly/releases/latest)**
2. Descarga el archivo `.apk`
3. Habilita **"Instalar apps de fuentes desconocidas"** en los ajustes de Android
4. Instala el APK y abre la app

> **Nota:** El APK contiene el HTML ya construido. Solo necesita que **Android System WebView** esté instalado y actualizado (viene preinstalado en la mayoría de dispositivos).

### 🛠️ Opción 2 — Compilar desde el código fuente

#### Estructura del proyecto
```

nibbly/
├── index.html                 ← app principal
├── games/
│   ├── games.css              ← estilos de los minijuegos
│   └── games.js               ← lógica de Tetris, Buscaminas y 2048
├── desktop-ui/
│   ├── desktop.css            ← layout de escritorio
│   └── desktop.js             ← enhancers + atajos de teclado
├── mus/
│   └── You Are Nibbled.ogg    ← música local (opcional)
└── img/
└── (capturas para el README)

```

Los archivos en `games/` y `desktop-ui/` son **opcionales**: si no existen, la app funciona igual (pero sin juegos y sin UI de escritorio forzable).

#### Con WebView manual
1. Copia **toda la carpeta del proyecto** a `app/src/main/assets/`
2. Carga el archivo con `WebView.loadUrl("file:///android_asset/index.html")`
3. Habilita **JavaScript** en tu `WebView` (`webSettings.setJavaScriptEnabled(true)`)
4. Habilita **almacenamiento local** (`webSettings.setDomStorageEnabled(true)`)

#### Con Capacitor
```bash
npm install -g @capacitor/cli
npx cap init Nibbly com.edwarly999plus.nibbly
npx cap add android
# Copia index.html + games/ + desktop-ui/ + mus/ a la carpeta www/
npx cap sync
```

Con Cordova

```bash
cordova create nibbly com.edwarly999plus.nibbly Nibbly
cd nibbly
# Copia index.html + games/ + desktop-ui/ + mus/ a www/
cordova platform add android
cordova build android
```

---

📱 Uso

Navega entre las 7 pestañas principales:

Pestaña Descripción
Números Bases numéricas, BCD, ASCII y generador de códigos
Texto Codifica/decodifica texto con reproductor Morse y descarga WAV
Bits Unidades de almacenamiento y combinaciones
Potencia Watts, medidor de calor de CPU, velocidad de red, CPU, RAM y almacenamiento
Multimedia Audio, decibelios, vídeo, tiempo, frames y códecs
Calculadora Operaciones básicas con personalidad explosiva opcional
Juegos Tetris, Buscaminas y 2048 (activables/desactivables)

Pulsa el engranaje ⚙ para acceder a Ajustes y personalizar colores, sonidos, música, idioma, interfaz, registro de cálculos y el toggle "Please Don't".

---

🛠️ Tecnología

· HTML5 — estructura semántica
· CSS3 — Material You 3, color-mix(), variables CSS, animaciones, dvh/svh para adaptación al viewport
· JavaScript vanilla — sin dependencias, sin build step
· Web Audio API — sonidos de click y beeps Morse sintetizados
· BigInt — aritmética de precisión arbitraria
· LocalStorage — persistencia de ajustes
· Cache Storage API — caché offline de la música remota
· ResizeObserver — recálculo dinámico de posiciones en 2048
· requestAnimationFrame — física de la explosión de la calculadora
· Android System WebView — motor de renderizado

Tamaño total: ~250 KB (index.html + games/* + desktop-ui/*), sin contar mus/ ni img/

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
· Pestaña afectada (Números, Texto, Bits, Potencia, Multimedia, Calculadora o Juegos)

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