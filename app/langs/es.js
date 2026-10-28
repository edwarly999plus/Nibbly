(function(){
'use strict';

const strings={


'app.title':'Nibbly',
'app.subtitle':'Bases · Texto · Morse · Bits · Potencia · Multimedia',
'app.loading':'Cargando Nibbly…',
'app.starting':'Iniciando Nibbly…',


'error.brick':
'[ - No hay ningún conversor agregado. Código De Error: Brick. ]',
'error.missingNo':
'[ - Si Agregaste Solo Uno O Faltan Los Demás Dentro De La Carpeta '+
'app/: Hacen falta más conversores para el funcionamiento óptimo. '+
'Código De Error: MissingNo. ]',
'error.noInit':
'[ - El módulo de la app cargó pero no se encontró función de '+
'inicialización. Código De Error: MissingNo. ]',
'error.initFail':
'[ - La inicialización de la app falló. Código De Error: MissingNo. ]',
'error.initTimeout':
'[ - La inicialización tardó demasiado (30s). Código De Error: MissingNo. ]',
'error.timeoutBrick':
'[ - Se alcanzó el tiempo máximo de carga (40s) y no se pudo cargar '+
'ningún módulo. Código De Error: Brick. ]',
'error.timeoutMissingNo':
'[ - Se alcanzó el tiempo máximo de carga (40s). Algunos módulos no se '+
'pudieron cargar a tiempo. Código De Error: MissingNo. ]',
'error.boom':
'[ - La carga de archivos se detuvo por un error desconocido. '+
'Código De Error: BOOM! ]',
'error.missingDetail':'Archivos faltantes:',
'error.generic':'Error: {0}',
'error.rescan':'Reescanear archivos',
'error.rescanning':'Reescaneando…',
'error.copyReport':'Copiar reporte de error',
'error.copied':'Copiado',
'error.copyFailed':'No se pudo copiar',


'tab.num':'Números',
'tab.txt':'Texto',
'tab.uni':'Bits',
'tab.pot':'Potencia',
'tab.media':'Multimedia',
'tab.calc':'Calculadora',
'tab.paint':'Dibujo',
'tab.games':'Juegos',
'tab.formulas':'Fórmulas',
'tab.ciphers':'Cifrados',
'tab.range':'Rangos',
'tab.memory':'Memoria',
'tab.logic':'Comp. Lógicas',
'tab.config':'Ajustes',


'settings.title':'Ajustes',
'settings.appearance':'Apariencia',
'settings.accent':'Color resaltado',
'settings.bg':'Color de fondo',
'settings.reset':'Restablecer colores',
'settings.interface':'Interfaz',
'settings.interface.hint':
'Fuerza la interfaz de bolsillo o de escritorio si tu navegador no '+
'detecta el dispositivo correctamente.',
'settings.ui.auto':'Automático',
'settings.ui.pocket':'Forzar Bolsillo',
'settings.ui.desktop':'Forzar Escritorio',
'settings.log':'Registro de cálculos',
'settings.log.off':'Desactivado',
'settings.log.console':'Consola',
'settings.log.visual':'En la app',
'settings.log.desc':'Muestra el detalle de cada cálculo.',
'settings.effects':'Efectos visuales',
'settings.effects.desc':'Transiciones, animaciones y degradados.',
'settings.sounds':'Sonidos',
'settings.sounds.desc':'Sonidos al pulsar botones.',
'settings.volume.sound':'Volumen de sonidos',
'settings.volume.music':'Volumen de música',
'settings.bgIntensity':'Intensidad del fondo',
'settings.musicSection':'Música',
'settings.music':'Música de fondo',
'settings.music.desc':'Reproduce la banda sonora de Nibbly en bucle.',
'settings.music.hint':
'Carga <b>mus/You Are Nibbled.ogg</b>. Si no se encuentra en 5 s, '+
'usa la versión en línea (guardada para uso sin conexión).',
'settings.gamesSection':'Juegos',
'settings.games':'Juegos ON/OFF',
'settings.games.desc':'Activa o desactiva la sección de juegos.',
'settings.extras':'Extras',
'settings.pleaseDont':"Please Don't",
'settings.pleaseDont.desc':
'Activa EasterEggs al cometer un error en la calculadora. '+
'Sal de ella para restaurarla.',
'settings.lang':'Idioma',
'settings.lang.desc':'Solo español e inglés.',
'settings.lang.disabled':
'Paquete de español no instalado (falta app/langs/es.js).',
'settings.checker':'Comprobador de archivos',
'settings.checker.desc':
'Verifica qué archivos de expansión están instalados en el dispositivo.',
'settings.checker.run':'Comprobar archivos',
'settings.checker.checking':'Comprobando…',
'settings.checker.empty':'Aún no se han comprobado archivos.',
'settings.reloadExpansion':'Recargar Archivos De Expansión',
'settings.reloadExpansion.desc':
'Recarga solo los archivos opcionales de expansión (range, memory, '+
'paint, games, formulas, privacy, desktop, images, mus). NO toca los '+
'archivos obligatorios dentro de app/, así que la app sigue funcionando.',
'settings.reloadExpansion.reloading':'Recargando…',
'settings.clearCache':'Borrar Caché Y Recargar',
'settings.clearCache.desc':
'La app correrá lenta al primer arranque. Borra la caché si una '+
'pestaña no carga correctamente.',


'log.title':'Registro',
'log.clear':'Limpiar',
'log.empty':'Sin registros aún.',


'about.title':'Acerca De',
'about.creator':'Creador',
'about.version':'Versión',
'about.copyright':'©',
'about.github':'Código Fuente en GitHub',
'about.made':'Hecho Con ♥️ Por',
'about.disclaimer':
'Nibbly es una app privada y no recopila datos. Al abrir enlaces '+
'externos (como GitHub) en Android, la navegación se muestra dentro '+
'de la app: no inicies sesión desde aquí, hazlo desde tu navegador '+
'para mayor seguridad y comodidad. No somos responsables de la '+
'recolección de datos que esas páginas puedan hacer.',


'num.title':'Valor de entrada',
'num.placeholder':'Ej. 2025',
'num.clear':'Limpiar',
'num.output':'Salida',
'num.copy':'Copiar',
'num.convert':'Convertir',

'fmt.2':'Binario',
'fmt.8':'Octal',
'fmt.10':'Decimal',
'fmt.16':'Hexadecimal',
'fmt.32':'Base 32',
'fmt.36':'Base 36',
'fmt.nib':'Nibble',
'fmt.bcd':'BCD',
'fmt.asc':'ASCII',
'fmt.mor':'Morse',
'fmt.64':'Base64',

'bcd.title':'Verificador de BCD',
'bcd.hint':
'Pega un BCD (solo 0s y 1s) para verificar si es válido. Un BCD debe '+
'tener un número de bits múltiplo de 4 y cada grupo de 4 bits debe '+
'ser 0000-1001 (0-9).',
'bcd.placeholder':'Ej. 01101111 0010 0001',
'bcd.check':'Verificar BCD',
'bcd.err.empty':'Introduce un BCD para verificar.',
'bcd.err.chars':'Solo se permiten 0s y 1s (sin espacios ni otros caracteres).',
'bcd.err.length':
'Longitud de {0} bits: no es múltiplo de 4. Sobran {1} bit(s) al final '+
'("{2}") o faltan {3} bit(s).',
'bcd.err.nibble':'BCD inválido: {0} (máximo permitido: 1001 = 9).',
'bcd.ok':'BCD válido: {0} dígitos → {1}',

'range.goto': 'Ir a página',
'range.jump': 'Ir',
'range.sequential': 'Visualización secuencial',
'range.resultCount': '{0} entradas',
'range.page': 'Página {0}/{1}',
'range.empty': 'Configura el rango y pulsa Generar.',

'code.title':'Generar códigos alfanuméricos',
'code.separators':'Separadores',
'code.digits':'Dígitos por bloque',
'code.sepType':'Tipo de separador',
'code.sep.dash':'Guión ( - )',
'code.sep.underscore':'Barra baja ( _ )',
'code.sep.slash':'Barra ( / )',
'code.sep.space':'Espacio',
'code.sep.dot':'Punto ( . )',
'code.sep.none':'Nada (vacío)',
'code.numbers':'Números',
'code.upper':'Mayúsculas',
'code.lower':'Minúsculas',
'code.symbols':'Símbolos',
'code.generate':'Generar código',
'code.output':'Código generado',
'code.errNoChar':'Selecciona al menos un tipo de caracteres.',
'code.errDigits':'Los dígitos por bloque deben ser al menos 1.',
'code.errSeps':'El número de separadores no es válido.',


'txt.dir.enc':'Texto → Códigos',
'txt.dir.dec':'Códigos → Texto',
'txt.clear':'Limpiar',
'txt.morseHint':
'Separa letras con espacio y palabras con /. '+
'Ej: .... --- .-.. .- / -- ..- -. -.. ---',
'morse.speak':'Escuchar',
'morse.speakTitle':'Reproducir Morse como beeps',
'morse.download':'WAV',
'morse.downloadTitle':'Descargar el audio Morse como archivo .wav',


'uni.title':'Cantidad de entrada',
'uni.placeholder':'Ej. 1024',
'uni.from':'Unidad de entrada',
'uni.to':'Unidad de salida',
'uni.output':'Salida',
'uni.hint':
'1 byte = 8 bits · SI: 1 KB = 1000 B · IEC: 1 KiB = 1024 B',

'combo.title':'Combinaciones posibles',
'combo.value':'Cantidad',
'combo.unit':'Unidad',
'combo.bitsTotal':'Bits totales',
'combo.result':'Combinaciones (2^N)',
'combo.range':'Rango representable',
'combo.hint':
'En N bits caben 2^N combinaciones. '+
'Ej: 8 bits = 2^8 = 256 valores (0–255).',


'pot.watts':'Potencia (Watts)',
'pot.value':'Valor',
'pot.from':'Unidad entrada',
'pot.to':'Unidad salida',
'pot.result':'Resultado',
'pot.quality':'Calidad / Uso',
'pot.intro':'Introduce un valor para evaluar.',

'w.neg':'Valor negativo',
'w.neg.d':'La potencia no puede ser negativa.',
'w.zero':'Sin consumo',
'w.zero.d':'No hay consumo o potencia.',
'w.vlow':'Muy bajo',
'w.vlow.d':'Sensores, LEDs, microcontroladores.',
'w.low':'Bajo',
'w.low.d':'Cargador lento, router, dispositivos pequeños.',
'w.mod':'Moderado',
'w.mod.d':'Carga básica de móvil, altavoces, hubs USB.',
'w.good':'Bueno',
'w.good.d':'Carga rápida de móvil, tablet, mini-PC.',
'w.vgood':'Muy bueno',
'w.vgood.d':'Portátil estándar, carga rápida USB-C PD.',
'w.exc':'Excelente',
'w.exc.d':'Portátil potente, carga rápida de alta gama.',
'w.high':'Alto',
'w.high.d':'Workstation, GPU de gama media, monitores grandes.',
'w.vhigh':'Muy alto',
'w.vhigh.d':'PC gaming, electrodomésticos pequeños.',
'w.extreme':'Extremo',
'w.extreme.d':'Electrodomésticos grandes, herramientas eléctricas.',
'w.ind':'Industrial',
'w.ind.d':'Equipos industriales, motores grandes.',
'w.vind':'Muy industrial',
'w.vind.d':'Potencia de nivel industrial o superior.',


'pot.heat':'Medidor de calor de CPU',
'pot.heatC':'Celsius (°C)',
'pot.heatF':'Fahrenheit (°F)',
'pot.heatUsage':'Uso estimado',
'pot.heatDanger':'Nivel de peligro',
'pot.heatIntro':'Introduce una temperatura para evaluar.',
'pot.heatHint':
'Temperaturas altas pueden dañar el CPU permanentemente. '+
'Uso estimado según la temperatura.',
'pot.heat.cold':'Frío',
'pot.heat.cold.d':'CPU en reposo o recién encendido.',
'pot.heat.cool':'Fresco',
'pot.heat.cool.d':'Temperatura normal en uso ligero.',
'pot.heat.warm':'Templado',
'pot.heat.warm.d':'Uso moderado o gaming ligero.',
'pot.heat.hot':'Caliente',
'pot.heat.hot.d':'Uso intensivo o gaming. Ventilación recomendada.',
'pot.heat.vhot':'Muy caliente',
'pot.heat.vhot.d':'Cerca del límite. Riesgo de throttling.',
'pot.heat.danger':'Peligro',
'pot.heat.danger.d':'Riesgo de daño. Apaga el equipo.',
'pot.heat.extreme':'¡Extremo!',
'pot.heat.extreme.d':'Peligro inminente. Apaga ya.',
'pot.heat.joke1':'Tan caliente para freír un huevo',
'pot.heat.joke2':
'Hace tanto calor que puedes prender una fogata y despedirte del CPU',


'pot.speed':'Velocidad de conexión',
'pot.speedValue':'Velocidad',
'pot.speedUnit':'Unidad',
'pot.speedTo':'Convertir a',
'pot.speedEquiv':'Equivalente',
'pot.download':'Descarga',
'pot.upload':'Subida',
'pot.speedHint':
'Los medidores evalúan la velocidad en Mbps. Referencia: 1 MB/s ≈ 8 Mbps.',
'q.introSpeed':'Introduce una velocidad.',

's.vbad':'Muy malo',
's.vbad.d':'No apto para streaming ni videollamadas.',
's.bad':'Malo',
's.bad.d':'Navegación lenta, problemas con vídeo HD.',
's.reg':'Regular',
's.reg.d':'Vídeo HD, videollamadas aceptables.',
's.good':'Bueno',
's.good.d':'Streaming 4K, gaming online fluido.',
's.vgood':'Muy bueno',
's.vgood.d':'Descargas rápidas, múltiples dispositivos.',
's.exc':'Excelente',
's.exc.d':'Fibra de alta gama, uso profesional.',
's.up.vbad':'Muy malo',
's.up.vbad.d':'Difícil subir archivos o hacer videollamadas.',
's.up.bad':'Malo',
's.up.bad.d':'Subidas lentas, mala calidad en directo.',
's.up.reg':'Regular',
's.up.reg.d':'Subida aceptable para uso doméstico.',
's.up.good':'Bueno',
's.up.good.d':'Streaming en directo, backups en la nube.',
's.up.vgood':'Muy bueno',
's.up.vgood.d':'Streaming profesional, grandes subidas.',
's.up.exc':'Excelente',
's.up.exc.d':'Nivel profesional / empresarial.',


'pot.cpu':'Velocidad de CPU (GHz)',
'pot.cpuValue':'Frecuencia',
'pot.cpuUnit':'Unidad',
'pot.cpuTo':'Convertir a',
'pot.cpuEquiv':'Equivalente',
'pot.cpuPerf':'Rendimiento',
'pot.cpuSlow':'Lento',
'pot.cpuFast':'Rápido',
'pot.cpuPeriod':'Período',
'pot.cpuOps':'Ops/s',
'pot.cpuIntro':'Introduce una frecuencia para evaluar.',
'pot.cpuHint':
'La frecuencia indica ciclos por segundo. '+
'Los medidores usan escala logarítmica de 1 MHz a 10 GHz.',

'c.retro':'Retro',
'c.retro.d':'Procesadores antiguos de 8/16 bits.',
'c.vslow':'Muy lento',
'c.vslow.d':'Dispositivos embebidos o equipos muy antiguos.',
'c.slow':'Lento',
'c.slow.d':'Móviles básicos, IoT, mini PC económicos.',
'c.basic':'Básico',
'c.basic.d':'Uso ligero: navegación, ofimática.',
'c.good':'Bueno',
'c.good.d':'Gama media: multitarea fluida, gaming ligero.',
'c.vgood':'Muy bueno',
'c.vgood.d':'Gama alta: gaming, edición, productividad.',
'c.exc':'Excelente',
'c.exc.d':'Alto rendimiento: gaming exigente, edición 4K.',
'c.extreme':'Extremo',
'c.extreme.d':'Overclock / servidores de alto rendimiento.',
'c.insane':'Enorme',
'c.insane.d':'Nivel servidor o experimental.',


'pot.ram':'Velocidad de RAM',
'pot.ramQty':'Cantidad',
'pot.ramQtyUnit':'Unidad',
'pot.ramGen':'Generación',
'pot.ramSpeed':'Velocidad',
'pot.ramTotal':'Capacidad total',
'pot.ramBandwidth':'Ancho de banda por canal',
'pot.ramDual':'Dual channel (2 canales)',
'pot.ramQuality':'Rendimiento',
'pot.ramIntro':'Introduce cantidad y tipo de RAM.',
'pot.ramHint':
'El ancho de banda se calcula como MT/s × 8 bytes (bus de 64 bits). '+
'DDR5-6000 ≈ 48 GB/s por canal.',

'rm.legacy':'Legado',
'rm.legacy.d':'RAM antigua. Solo sirve para equipos retro.',
'rm.basic':'Básica',
'rm.basic.d':'Suficiente para tareas muy ligeras.',
'rm.office':'Ofimática',
'rm.office.d':'Navegación, ofimática, uso diario básico.',
'rm.good':'Buena',
'rm.good.d':'Multitarea fluida, gaming y edición ligera.',
'rm.vgood':'Muy buena',
'rm.vgood.d':'Gaming, edición de vídeo y cargas pesadas.',
'rm.exc':'Excelente',
'rm.exc.d':'Workstation, virtualización, servidores.',
'rm.extreme':'Extrema',
'rm.extreme.d':'Workstation profesional o servidor de alto rendimiento.',


'pot.storage':'Velocidad de almacenamiento',
'pot.stQty':'Capacidad',
'pot.stUnit':'Unidad',
'pot.stType':'Tipo de dispositivo',
'pot.stRead':'Lectura secuencial',
'pot.stWrite':'Escritura secuencial',
'pot.stIOPS':'IOPS (4K aleatorio)',
'pot.stQuality':'Rendimiento',
'pot.stIntro':'Introduce capacidad y tipo de dispositivo.',
'pot.stHint':
'Valores típicos de mercado. El rendimiento real varía según '+
'controlador, caché y estado del disco.',

'sq.slow':'Muy lento',
'sq.slow.d':'Almacenamiento antiguo o tarjeta de baja velocidad.',
'sq.basic':'Básico',
'sq.basic.d':'HDD tradicional o almacenamiento económico.',
'sq.good':'Bueno',
'sq.good.d':'SSD SATA o tarjeta de alta velocidad. Notable mejora.',
'sq.vgood':'Muy bueno',
'sq.vgood.d':'NVMe Gen3 o USB 3.2. Arranque y apps muy rápidas.',
'sq.exc':'Excelente',
'sq.exc.d':'NVMe Gen4. Rendimiento de gama alta.',
'sq.extreme':'Extremo',
'sq.extreme.d':'NVMe Gen5 o Thunderbolt. Nivel profesional.',


'pot.audio':'Bitrate de audio',
'pot.audioValue':'Bitrate',
'pot.audioUnit':'Unidad',
'pot.audioTo':'Convertir a',
'pot.audioEquiv':'Equivalente',
'pot.audioQuality':'Calidad',
'pot.audioIntro':'Introduce un bitrate.',
'pot.audioHint':
'Referencia: 128 kbps ≈ calidad estándar · 320 kbps ≈ alta calidad · '+
'1411 kbps = CD sin pérdida.',

'aq.vlow':'Muy baja',
'aq.vlow.d':'Calidad telefónica o voz.',
'aq.low':'Baja',
'aq.low.d':'Aceptable para podcasts de voz.',
'aq.reg':'Regular',
'aq.reg.d':'Escucha casual, calidad básica.',
'aq.good':'Buena',
'aq.good.d':'Calidad estándar, música general.',
'aq.vgood':'Muy buena',
'aq.vgood.d':'Alta calidad, casi transparente.',
'aq.exc':'Excelente',
'aq.exc.d':'Calidad alta, indistinguible del original.',
'aq.near':'Casi sin pérdida',
'aq.near.d':'Transparencia total con pérdida mínima.',
'aq.lossless':'Sin pérdida',
'aq.lossless.d':'Calidad CD o superior, sin compresión.',


'pot.db':'Decibelios',
'pot.dbValue':'Nivel',
'pot.dbUnit':'Unidad',
'pot.dbTo':'Convertir a',
'pot.dbEquiv':'Equivalente',
'pot.dbLevel':'Nivel sonoro',
'pot.dbSpectrum':'Espectro estimado',
'pot.dbBass':'Grave',
'pot.dbMid':'Medio',
'pot.dbTreble':'Agudo',
'pot.dbIntro':'Introduce un nivel de sonido.',
'pot.dbHint':
'Escala SPL: 0 dB = umbral auditivo · 60 dB = conversación · '+
'120+ dB = riesgo auditivo.',

'db.silent':'Silencio',
'db.silent.d':'Umbral auditivo, silencio absoluto.',
'db.quiet':'Muy silencioso',
'db.quiet.d':'Estudio de grabación, biblioteca.',
'db.calm':'Tranquilo',
'db.calm.d':'Casa tranquila, conversación baja.',
'db.normal':'Normal',
'db.normal.d':'Conversación normal, oficina.',
'db.busy':'Ruidoso',
'db.busy.d':'Tráfico, restaurante lleno.',
'db.loud':'Fuerte',
'db.loud.d':'Calle concurrida, aspiradora.',
'db.vloud':'Muy fuerte',
'db.vloud.d':'Concierto, taladro. Precaución.',
'db.danger':'Peligroso',
'db.danger.d':'Riesgo auditivo con exposición prolongada.',
'db.pain':'Doloroso',
'db.pain.d':'Umbral del dolor, daño inmediato.',


'pot.video':'Resolución de vídeo',
'pot.videoValue':'Resolución',
'pot.videoUnit':'Unidad',
'pot.videoTo':'Convertir a',
'pot.videoEquiv':'Equivalente',
'pot.videoQuality':'Calidad',
'pot.videoIntro':'Introduce una resolución.',
'pot.videoHint':
'Referencia: 2 MP ≈ Full HD 1080p · 8 MP ≈ 4K · 33 MP ≈ 8K. '+
'Cámaras de móvil: 12–200 MP.',

'vq.vlow':'Muy baja',
'vq.vlow.d':'VGA / QVGA. Cámaras antiguas o webcams básicas.',
'vq.low':'Baja',
'vq.low.d':'SD (480p). Vídeo antiguo o móvil básico.',
'vq.reg':'Regular',
'vq.reg.d':'HD ready 720p. Vídeo estándar.',
'vq.good':'Buena',
'vq.good.d':'Full HD 1080p. Alta definición común.',
'vq.vgood':'Muy buena',
'vq.vgood.d':'2K / QHD. Monitores y cámaras avanzadas.',
'vq.exc':'Excelente',
'vq.exc.d':'4K UHD. Alta resolución profesional.',
'vq.extreme':'Extrema',
'vq.extreme.d':'5K–8K. Cine digital y cámaras de gama alta.',
'vq.pro':'Profesional',
'vq.pro.d':'Cámaras full-frame de alta resolución.',


'pot.time':'Conversor de tiempo',
'pot.timeValue':'Cantidad',
'pot.timeUnit':'Unidad',
'pot.timeTo':'Convertir a',
'pot.timeEquiv':'Equivalente',
'pot.timeScale':'Escala temporal',
'pot.timeIntro':'Introduce una cantidad de tiempo.',
'pot.timeHint':
'Mes ≈ 30.44 días · Año ≈ 365.25 días. '+
'Los conversores usan promedios del calendario gregoriano.',

'tq.atomic':'Atómico',
'tq.atomic.d':'Escala subatómica: reacciones nucleares y luz.',
'tq.micro':'Microscópico',
'tq.micro.d':'Escala de circuitos electrónicos y procesos químicos.',
'tq.human':'Humano',
'tq.human.d':'Escala de la vida cotidiana y la percepción.',
'tq.day':'Diario',
'tq.day.d':'Escala de un día. Sueño, trabajo, ciclos circadianos.',
'tq.week':'Semanal',
'tq.week.d':'Escala de una semana. Rutinas y planificación.',
'tq.month':'Mensual',
'tq.month.d':'Escala mensual. Ciclos, facturas, estaciones.',
'tq.year':'Anual',
'tq.year.d':'Escala anual. Cumpleaños, ciclos escolares.',
'tq.decade':'Década',
'tq.decade.d':'Escala de décadas. Cambios generacionales.',
'tq.century':'Siglo',
'tq.century.d':'Escala histórica. Grandes transformaciones.',
'tq.millennium':'Milenio',
'tq.millennium.d':'Escala de milenios. Historia humana.',


'pot.frames':'Frames por unidad de tiempo',
'pot.framesValue':'Frames',
'pot.framesUnit':'Unidad',
'pot.framesTo':'Convertir a',
'pot.framesEquiv':'Equivalente',
'pot.framesPerf':'Fluidez',
'pot.framesIntro':'Introduce una tasa de frames.',
'pot.framesHint':
'Referencia: 24 fps = cine · 30 fps = vídeo estándar · '+
'60 fps = fluido · 120+ fps = gaming competitivo.',

'fq.slideshow':'Diapositivas',
'fq.slideshow.d':'Movimiento muy entrecortado, no apto para vídeo.',
'fq.low':'Bajo',
'fq.low.d':'Animación básica o vídeo antiguo.',
'fq.cinema':'Cine',
'fq.cinema.d':'Estándar cinematográfico 24 fps.',
'fq.standard':'Estándar',
'fq.standard.d':'Vídeo estándar y TV (30 fps).',
'fq.smooth':'Fluido',
'fq.smooth.d':'Gaming casual y vídeo moderno (60 fps).',
'fq.verySmooth':'Muy fluido',
'fq.verySmooth.d':'Alta tasa para gaming y movimiento rápido (90–144 fps).',
'fq.extreme':'Extremo',
'fq.extreme.d':'Gaming competitivo / monitores de alta tasa (144–240 fps).',
'fq.insane':'Insano',
'fq.insane.d':'Más allá del ojo humano y de la mayoría de pantallas (240+ fps).',


'pot.codec':'Info de códecs',
'pot.codecAudio':'Audio',
'pot.codecVideo':'Vídeo',
'pot.codecFull':'Nombre completo',
'pot.codecYear':'Año',
'pot.codecType2':'Tipo',
'pot.codecBitrate':'Bitrate típico',
'pot.codecQuality':'Calidad',
'pot.codecEfficiency':'Eficiencia de compresión',
'pot.codecCompat':'Compatibilidad con dispositivos',

'ct.lossy':'Con pérdida',
'ct.lossless':'Sin pérdida',
'ct.uncompressed':'Sin comprimir',
'ct.lossyM':'Con pérdida (mezzanine)',

'cd.quality.high':'Calidad máxima',
'cd.quality.mid':'Calidad media',
'cd.quality.low':'Calidad baja',
'cd.eff.high':'Compresión muy eficiente',
'cd.eff.mid':'Compresión moderada',
'cd.eff.low':'Archivos grandes',
'cp.yes':'✓',
'cp.no':'✗',
'cp.partial':'~',


'calc.exploded':'¡BOOM! La calculadora explotó.',
'calc.easterEgg':'Please Don\'t…',


'paint.loading':'Cargando dibujo…',
'paint.error':
'No se encontraron los archivos de Paint, descárgalos de GitHub :(',

'formulas.loading':'Cargando fórmulas…',
'formulas.error':
'No se encontraron los archivos de Fórmulas, descárgalos de GitHub :(',
'formulas.reveal':'Revelar cálculo',
'formulas.reveal1':
'La gran revelación está casi lista, por favor espere…',
'formulas.reveal2':'Revelando cálculo…',
'formulas.reveal3':'Ya casi…',

'games.loading':'Cargando juegos…',
'games.error':
'No hay juegos instalados, descargue los archivos faltantes en GitHub :(',
'games.disabled':
'La sección de juegos está desactivada. Actívala en Ajustes > Juegos.',


'pinball.title':'Pinball Clásico',
'pinball.start':'Comenzar',
'pinball.launch':'Lanzar bola',
'pinball.restart':'Jugar de nuevo',
'pinball.score':'Puntuación',
'pinball.lives':'Vidas',
'pinball.gameOver':'Fin del juego',
'pinball.hint':
'3 caídas de bola = Fin del juego. Las 2 primeras caídas muestran '+
'una animación de recuperación.',


'popit.title':'¡Pop It!',
'popit.flip':'Voltear',
'popit.reset':'Reiniciar',
'popit.hint':'Presiona las burbujas. Voltea para ver el otro lado.',
'popit.complete':'¡Todas explotadas! 🎉',
'popit.progress':'Explotadas {0}/{1}',


'ciphers.title':'Cifrados y Codificaciones',
'ciphers.algorithm':'Algoritmo',
'ciphers.direction':'Dirección',
'ciphers.encrypt':'Cifrar',
'ciphers.decrypt':'Descifrar',
'ciphers.input':'Entrada',
'ciphers.output':'Salida',
'ciphers.key':'Clave',
'ciphers.keyPlaceholder':'Introduce la clave…',
'ciphers.alphabet':'Alfabeto',
'ciphers.shift':'Desplazamiento',
'ciphers.paramA':'Parámetro a',
'ciphers.paramB':'Parámetro b',
'ciphers.iv':'IV',
'ciphers.mode':'Modo',
'ciphers.apply':'Aplicar',
'ciphers.clear':'Limpiar',
'ciphers.copy':'Copiar',
'ciphers.outputEmpty':'—',
'ciphers.hint.cesar':'Cifrado clásico por desplazamiento. Valor 1–25.',
'ciphers.hint.rot13':'ROT13 (desplazamiento 13). Auto-inverso.',
'ciphers.hint.rot47':'ROT47 sobre ASCII 33–126. Auto-inverso.',
'ciphers.hint.atbash':'Espeja el alfabeto. Auto-inverso.',
'ciphers.hint.vigenere':'Cifrado polialfabético con palabra clave.',
'ciphers.hint.affine':'Usa a y b. a debe ser coprimo con 26.',
'ciphers.hint.substitution':
'Alfabeto de sustitución (26 letras únicas).',
'ciphers.hint.url':'Codificar/decodificar URL (porcentaje).',
'ciphers.hint.unicode':'Secuencias de escape Unicode (\\uXXXX).',
'ciphers.hint.xor':'XOR con clave numérica o de texto.',
'ciphers.hint.aes':'AES-256 con clave (e IV opcional).',
'ciphers.hint.des':'DES con clave de 8 bytes.',
'ciphers.hint.tripledes':'3DES con clave de 24 bytes.',
'ciphers.hint.rc4':'Cifrado de flujo RC4 con clave.',
'ciphers.hint.rabbit':'Cifrado de flujo Rabbit con clave (+IV).',
'ciphers.err.noInput':'Introduce algo para procesar.',
'ciphers.err.badKey':'Clave inválida para este algoritmo.',
'ciphers.err.badShift':'El desplazamiento debe ser 1–25.',
'ciphers.err.badAffine':'El parámetro a debe ser coprimo con 26.',
'ciphers.err.badAlphabet':'El alfabeto debe tener 26 letras únicas.',
'ciphers.err.unsupported':'Algoritmo no soportado.',
'ciphers.err.generic':'Error de cifrado: {0}',

'ciphers.algo.cesar':'César',
'ciphers.algo.rot13':'ROT13',
'ciphers.algo.rot47':'ROT47',
'ciphers.algo.atbash':'Atbash',
'ciphers.algo.vigenere':'Vigenère',
'ciphers.algo.affine':'Afín',
'ciphers.algo.substitution':'Sustitución',
'ciphers.algo.url':'URL',
'ciphers.algo.unicode':'Unicode',
'ciphers.algo.xor':'XOR',
'ciphers.algo.aes':'AES',
'ciphers.algo.des':'DES',
'ciphers.algo.tripledes':'3DES',
'ciphers.algo.rc4':'RC4',
'ciphers.algo.rabbit':'Rabbit',


'range.title':'Conversiones Masivas',
'range.from':'Base inicial',
'range.to':'Base final',
'range.start':'Valor inicial',
'range.end':'Valor final',
'range.presets':'Preajustes',
'range.generate':'Generar',
'range.copyAll':'Copiar todo',
'range.sequential':'Vista secuencial',
'range.empty':'Configura el rango y pulsa Generar.',
'range.resultCount':'{0} entradas',
'range.page':'Página {0}/{1}',
'range.err.range':'El valor final debe ser mayor o igual al inicial.',
'range.err.limit':'Rango demasiado grande (máx. 10000 entradas).',
'range.err.invalid':'Valor inicial o final inválido para la base elegida.',
'range.preset.decToBin':'Dec 0–100 → Bin',
'range.preset.decToOct':'Dec 0–100 → Oct',
'range.preset.decToBcd':'Dec 0–100 → BCD',
'range.preset.hexToDec':'Hex 0000–FFFF → Dec',
'range.preset.hexByte':'Hex 00–FF → Dec',
'range.preset.ascii':'ASCII 32–127',


'memory.title':'Simulación de Memoria',
'memory.total':'Localidades totales',
'memory.addressRange':'Rango de direcciones',
'memory.size':'Tamaño direccionable',
'memory.used':'Usados',
'memory.address':'Dirección (hex 000–FFF)',
'memory.value':'Valor (hex 00–FF)',
'memory.read':'Leer',
'memory.write':'Escribir',
'memory.result':'Resultado',
'memory.stats':'Estadísticas de memoria',
'memory.bulk':'Acciones masivas',
'memory.reset':'Reiniciar todo',
'memory.fill':'Rellenar todo con valor',
'memory.clearAll':'Limpiar todo (00)',
'memory.jump':'Saltar a dirección',
'memory.jumpBtn':'Ir',
'memory.hint':
'4096 localidades (0000–0FFF) = 4 KB de memoria direccionable. '+
'Cada byte son 8 bits (0x00–0xFF).',
'memory.empty':'La dirección {0} está vacía (0x00).',
'memory.written':'Dirección {0} = 0x{1}',
'memory.err.address':
'Dirección inválida. Usa 000–FFF (hexadecimal).',
'memory.err.value':
'Valor inválido. Usa 00–FF (hexadecimal).',


'convert.msg1':'Alineando los astros para la conversión…',
'convert.msg2':'Chequeando la entrada…',
'convert.msg3':'Convirtiendo, por favor sea paciente…',
'convert.msg4':'Esperar hace que la conversión sea más precisa, por favor espere…',
'convert.msg5':'Calculando matemáticamente, por favor espere…',
'convert.msg6':'Ya casi llegamos a la salida, por favor espere…',


'tab.console':'Consola',
'console.title':'Consola',
'console.clear':'Limpiar',
'console.cleared':'Consola limpiada.',
'console.placeholder':'Escribe JavaScript…',
'console.welcome':
'Consola de Nibbly lista. Escribe JavaScript y pulsa Enter. '+
'Prueba: 1 + 1  o  NibblyModules',
'console.disabled':'Consola Desactivada',
'console.disabled.desc':
'La Consola solo está disponible cuando el Tipo de Registro está en '+
'"Consola" (Ajustes → Registro de cálculos).',
'console.enable':'Activar Consola Ahora',
'checker.cat.console':'Consola',
'console.copy':'Copiar',
'console.copy.title':'Copiar toda la salida',
'console.copied':'✓ Salida copiada al portapapeles.',
'console.copyFailed':'✗ No se pudo copiar al portapapeles.',
'console.paste.title':'Pegar desde el portapapeles',
'console.pasted':'Pegado',
'console.pasteEmpty':'El portapapeles está vacío',
'console.pasteUnsupported':'Usa Ctrl+V o mantén pulsado para pegar',
'console.pasteFailed':'No se pudo pegar. Usa Ctrl+V en su lugar.',
'console.pasteDenied':'Permiso de portapapeles denegado. Usa Ctrl+V en su lugar.',
'console.noCode':'Entrada vacía (solo comentarios).',


'toast.copied':'✓ Copiado',
'toast.copyFail':'No se pudo copiar',
'toast.nothing':'Nada que copiar',
'toast.reset':'✓ Restablecido',
'toast.gen':'✓ Código generado',
'toast.morsePlay':'♪ Reproduciendo Morse',
'toast.morseOff':'Sonidos desactivados',
'toast.wav':'⬇ Descargando WAV',
'toast.uiFail':
'Los archivos de expansión están rotos o no existen',
'toast.uiOk':'✓ Interfaz aplicada',
'toast.bcdOk':'✓ BCD válido',
'toast.bcdBad':'✗ BCD inválido',
'toast.cipherOk':'✓ Cifrado aplicado',
'toast.rangeOk':'✓ Rango generado',
'toast.memoryWrite':'✓ Memoria escrita',
'toast.memoryReset':'✓ Memoria reiniciada',
'toast.languageMissing':
'Paquete de español no instalado.',
'toast.expansionReloaded':'✓ Archivos de expansión recargados',
'toast.expansionFailed':'⚠ Algunos archivos fallaron',
'toast.cacheCleared':'✓ Caché borrada — recargando',


'checker.cat.games':'Juegos',
'checker.cat.desktop':'Escritorio',
'checker.cat.paint':'Dibujo',
'checker.cat.privacy':'Privacidad',
'checker.cat.music':'Música',
'checker.cat.formulas':'Fórmulas',
'checker.cat.ciphers':'Cifrados',
'checker.cat.range':'Rangos',
'checker.cat.memory':'Memoria',
'checker.cat.langs':'Idiomas',
'checker.cat.app':'App',
'checker.cat.logic':'Comp. Lógicas',

'err.invalidValue':'"{0}" no es un valor válido en base {1}.',
'err.invalidNum':'Introduce un número válido.',
'err.invalidPos':'Introduce un número válido y positivo.',
'err.invalidCode':'Código no válido: "{0}"',
'err.outOfRange':'Fuera de rango Unicode: "{0}"',
'err.invalidToken':'Token no válido: "{0}"',
'err.calcDivZero':'División por cero',
'err.calcSqrt':'Raíz de negativo',


'f.csvDone':'✓ CSV descargado',
'f.csvFail':'No se pudo generar el CSV',
'f.csvEmpty':'Nada que exportar',


'tab.pinball':'Pinball',
'tab.popit':'Pop It!',
'pinball.title':'Pinball Clásico',
'pinball.start':'Comenzar',
'pinball.launch':'Lanzar bola',
'pinball.restart':'Jugar de nuevo',
'pinball.score':'Puntuación',
'pinball.lives':'Vidas',
'pinball.gameOver':'Fin del juego',
'pinball.hint':'3 caídas de bola = Fin del juego. Las 2 primeras caídas muestran una animación de recuperación.',
'popit.title':'¡Pop It!',
'popit.flip':'Voltear',
'popit.reset':'Reiniciar',
'popit.hint':'Presiona las burbujas. Voltea para ver el otro lado.',
'popit.complete':'¡Todas explotadas! 🎉',
'popit.progress':'Explotadas {0}/{1}',


'tab.markdown':'Markdown',
'checker.cat.markdown':'Markdown',
'markdown.editor':'Editor',
'markdown.preview':'Vista previa',
'markdown.loadFile':'Cargar archivo .md',
'markdown.download':'Descargar README.md',
'markdown.copyHtml':'Copiar HTML',
'markdown.github':'Conectar GitHub',


/* ══════════════ LOGIC GATES (Expansion Pack 2) ══════════════ */

'lg.mode.calc':'Calculadora',
'lg.mode.table':'Tabla de verdad',
'lg.mode.builder':'Constructor',

'lg.result':'Resultado',
'lg.analysis':'Análisis booleano',
'lg.minterms':'Minterms Σm',
'lg.sop':'Expresión (SOP)',
'lg.gateFn':'Función',
'lg.truthRows':'Filas con Y=1: ',

'lg.builder.hint':
'Toca las entradas para cambiar bits y ver el circuito en tiempo real.',
'lg.builder.controls':'Constructor de circuito',
'lg.builder.output':'Salida',

'lg.gate.and.desc':'1 solo si ambas entradas son 1',
'lg.gate.or.desc':'1 si al menos una entrada es 1',
'lg.gate.xor.desc':'1 si las entradas son distintas',
'lg.gate.nand.desc':'Inverso de AND',
'lg.gate.nor.desc':'Inverso de OR',
'lg.gate.xnor.desc':'1 si las entradas son iguales',
'lg.gate.not.desc':'Invierte la entrada',
'lg.gate.buf.desc':'Copia la entrada',

'lg.state.on':'ON (1)',
'lg.state.off':'OFF (0)',

'lg.bit.a':'A',
'lg.bit.b':'B',
'lg.bit.y':'Y',
};

window.NibblyEs=strings;
window.NibblyLangs=window.NibblyLangs||{};
window.NibblyLangs.es=strings;

if(console&&console.debug){
console.debug('[Nibbly] es.js loaded (Spanish, '+
Object.keys(strings).length+' keys)');
}
})();