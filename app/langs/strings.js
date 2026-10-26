(function(){
'use strict';

const strings={


'app.title':'Nibbly',
'app.subtitle':'Bases · Text · Morse · Bits · Power · Media',
'app.loading':'Loading Nibbly…',
'app.starting':'Starting Nibbly…',


'error.brick':
'[ - No converter added. Error Code: Brick. ]',
'error.missingNo':
'[ - If you added only one or the others are missing inside the '+
'app/ folder: More converters are needed for optimal operation. '+
'Error Code: MissingNo. ]',
'error.noInit':
'[ - App module loaded but no init function was found. '+
'Error Code: MissingNo. ]',
'error.initFail':
'[ - App initialization failed. Error Code: MissingNo. ]',
'error.initTimeout':
'[ - App init took too long (30s). Error Code: MissingNo. ]',
'error.timeoutBrick':
'[ - Load timeout (40s) reached. No files loaded. '+
'Error Code: Brick. ]',
'error.timeoutMissingNo':
'[ - Load timeout (40s) reached. Some files still loading. '+
'Error Code: MissingNo. ]',
'error.missingDetail':'Missing files:',
'error.generic':'Error: {0}',
'error.rescan':'Rescan files',
'error.rescanning':'Rescanning…',


'tab.num':'Numbers',
'tab.txt':'Text',
'tab.uni':'Bits',
'tab.pot':'Power',
'tab.media':'Media',
'tab.calc':'Calculator',
'tab.paint':'Paint',
'tab.games':'Games',
'tab.formulas':'Formulas',
'tab.ciphers':'Ciphers',
'tab.range':'Ranges',
'tab.memory':'Memory',
'tab.config':'Config',


'settings.title':'Settings',
'settings.appearance':'Appearance',
'settings.accent':'Accent color',
'settings.bg':'Background color',
'settings.reset':'Reset colors',
'settings.interface':'Interface',
'settings.interface.hint':
"Force pocket or desktop interface if your browser doesn't detect "+
'the device correctly.',
'settings.ui.auto':'Auto',
'settings.ui.pocket':'Force Pocket',
'settings.ui.desktop':'Force Desktop',
'settings.log':'Calculation log',
'settings.log.off':'Off',
'settings.log.console':'Console',
'settings.log.visual':'In-app',
'settings.log.desc':'Shows the details of each calculation.',
'settings.effects':'Visual effects',
'settings.effects.desc':'Transitions, animations and gradients.',
'settings.sounds':'Sounds',
'settings.sounds.desc':'Sounds when tapping buttons.',
'settings.volume.sound':'Sound volume',
'settings.volume.music':'Music volume',
'settings.bgIntensity':'Background intensity',
'settings.musicSection':'Music',
'settings.music':'Background music',
'settings.music.desc':'Plays the Nibbly soundtrack in a loop.',
'settings.music.hint':
'Loads <b>mus/You Are Nibbled.ogg</b>. If not found within 5 s, '+
'the online version is used (cached for offline playback).',
'settings.gamesSection':'Games',
'settings.games':'Games ON/OFF',
'settings.games.desc':'Enable or disable the games section.',
'settings.extras':'Extras',
'settings.pleaseDont':"Please Don't",
'settings.pleaseDont.desc':
'Activates EasterEggs when you make an error in the calculator. '+
'Exit it to restore it.',
'settings.lang':'Language',
'settings.lang.desc':'Only Spanish and English.',
'settings.lang.disabled':
'Spanish pack not installed (app/langs/es.js missing).',
'settings.checker':'File checker',
'settings.checker.desc':
'Verifies which expansion files are installed on the device.',
'settings.checker.run':'Check files',
'settings.checker.checking':'Checking…',
'settings.checker.empty':'No files checked yet.',
'settings.reloadExpansion':'Reload Expansion Files',
'settings.reloadExpansion.desc':
'Reloads only optional expansion files (range, memory, paint, games, '+
'formulas, privacy, desktop, images, mus). Does NOT touch app/ core '+
'files, so the app stays running.',
'settings.reloadExpansion.reloading':'Reloading…',
'settings.clearCache':'Clear Cache & Reload',
'settings.clearCache.desc':
'The app will run slow on first start. Clear cache if a tab does not '+
'load correctly.',

'range.goto': 'Go to page',
'range.jump': 'Go',
'range.sequential': 'Sequential display',
'range.resultCount': '{0} entries',
'range.page': 'Page {0}/{1}',
'range.empty': 'Set range',

'log.title':'Log',
'log.clear':'Clear',
'log.empty':'No entries yet.',


'about.title':'About',
'about.creator':'Creator',
'about.version':'Version',
'about.copyright':'©',
'about.github':'GitHub Source Code',
'about.made':'Made with ♥️ by',
'about.disclaimer':
'Nibbly is a private app and does not collect data. When opening '+
'external links (like GitHub) on Android, navigation is shown inside '+
'the app: do not log in here, do it from your browser for better '+
'security and convenience. We are not responsible for the data '+
'collection those pages may perform.',


'num.title':'Input value',
'num.placeholder':'e.g. 2025',
'num.clear':'Clear',
'num.output':'Output',
'num.copy':'Copy',
'num.convert':'Convert',

'fmt.2':'Binary',
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

'bcd.title':'BCD Verifier',
'bcd.hint':
"Paste a BCD (only 0s and 1s) to verify if it's valid. A BCD must "+
'have a number of bits multiple of 4 and each group of 4 bits must be '+
'0000-1001 (0-9).',
'bcd.placeholder':'e.g. 01101111 0010 0001',
'bcd.check':'Verify BCD',
'bcd.err.empty':'Enter a BCD to verify.',
'bcd.err.chars':'Only 0s and 1s allowed (no spaces or other characters).',
'bcd.err.length':
'Length of {0} bits: not a multiple of 4. {1} extra bit(s) at the end '+
'("{2}") or {3} missing bit(s).',
'bcd.err.nibble':'Invalid BCD: {0} (max allowed: 1001 = 9).',
'bcd.ok':'✅ Valid BCD: {0} digits → {1}',

'code.title':'Generate alphanumeric codes',
'code.separators':'Separators',
'code.digits':'Digits per block',
'code.sepType':'Separator type',
'code.sep.dash':'Dash ( - )',
'code.sep.underscore':'Underscore ( _ )',
'code.sep.slash':'Slash ( / )',
'code.sep.space':'Space',
'code.sep.dot':'Dot ( . )',
'code.sep.none':'None (empty)',
'code.numbers':'Numbers',
'code.upper':'Uppercase',
'code.lower':'Lowercase',
'code.symbols':'Symbols',
'code.generate':'Generate code',
'code.output':'Generated code',
'code.errNoChar':'Select at least one character type.',
'code.errDigits':'Digits per block must be at least 1.',
'code.errSeps':'Invalid number of separators.',


'txt.dir.enc':'Text → Codes',
'txt.dir.dec':'Codes → Text',
'txt.clear':'Clear',
'txt.morseHint':
'Separate letters with a space and words with /. '+
'E.g: .... --- .-.. .- / -- ..- -. -.. ---',
'morse.speak':'Listen',
'morse.speakTitle':'Play Morse as beeps',
'morse.download':'WAV',
'morse.downloadTitle':'Download Morse audio as .wav file',


'uni.title':'Input amount',
'uni.placeholder':'e.g. 1024',
'uni.from':'Input unit',
'uni.to':'Output unit',
'uni.output':'Output',
'uni.hint':
'1 byte = 8 bits · SI: 1 KB = 1000 B · IEC: 1 KiB = 1024 B',

'combo.title':'Possible combinations',
'combo.value':'Amount',
'combo.unit':'Unit',
'combo.bitsTotal':'Total bits',
'combo.result':'Combinations (2^N)',
'combo.range':'Representable range',
'combo.hint':
'In N bits there are 2^N combinations. '+
'E.g: 8 bits = 2^8 = 256 values (0–255).',


'pot.watts':'Power (Watts)',
'pot.value':'Value',
'pot.from':'Input unit',
'pot.to':'Output unit',
'pot.result':'Result',
'pot.quality':'Quality / Use',
'pot.intro':'Enter a value to evaluate.',

'w.neg':'Negative value',
'w.neg.d':'Power cannot be negative.',
'w.zero':'No load',
'w.zero.d':'No consumption or power.',
'w.vlow':'Very low',
'w.vlow.d':'Sensors, LEDs, microcontrollers.',
'w.low':'Low',
'w.low.d':'Slow charger, router, small devices.',
'w.mod':'Moderate',
'w.mod.d':'Basic phone charge, speakers, USB hubs.',
'w.good':'Good',
'w.good.d':'Fast phone charge, tablet, mini-PC.',
'w.vgood':'Very good',
'w.vgood.d':'Standard laptop, USB-C PD fast charge.',
'w.exc':'Excellent',
'w.exc.d':'Powerful laptop, high-end fast charge.',
'w.high':'High',
'w.high.d':'Workstation, mid-range GPU, large monitors.',
'w.vhigh':'Very high',
'w.vhigh.d':'Gaming PC, small appliances.',
'w.extreme':'Extreme',
'w.extreme.d':'Large appliances, power tools.',
'w.ind':'Industrial',
'w.ind.d':'Industrial equipment, large motors.',
'w.vind':'Very industrial',
'w.vind.d':'Industrial-grade power or higher.',


'pot.heat':'CPU Heat Meter',
'pot.heatC':'Celsius (°C)',
'pot.heatF':'Fahrenheit (°F)',
'pot.heatUsage':'Estimated usage',
'pot.heatDanger':'Danger level',
'pot.heatHint':
'High temperatures can permanently damage the CPU. '+
'Usage estimated by temperature.',
'pot.heat.cold':'Cold',
'pot.heat.cold.d':'CPU idle or just powered on.',
'pot.heat.cool':'Cool',
'pot.heat.cool.d':'Normal temperature under light load.',
'pot.heat.warm':'Warm',
'pot.heat.warm.d':'Moderate use or light gaming.',
'pot.heat.hot':'Hot',
'pot.heat.hot.d':'Heavy use or gaming. Ventilation recommended.',
'pot.heat.vhot':'Very hot',
'pot.heat.vhot.d':'Near limit. Throttling risk.',
'pot.heat.danger':'Danger',
'pot.heat.danger.d':'Damage risk. Shut down the device.',
'pot.heat.extreme':'Extreme!',
'pot.heat.extreme.d':'Imminent danger. Shut down now.',
'pot.heat.joke1':'Hot enough to fry an egg',
'pot.heat.joke2':
'So hot you could light a campfire and say goodbye to the CPU',


'pot.speed':'Connection speed',
'pot.speedValue':'Speed',
'pot.speedUnit':'Unit',
'pot.speedTo':'Convert to',
'pot.speedEquiv':'Equivalent',
'pot.download':'Download',
'pot.upload':'Upload',
'pot.speedHint':
'Meters evaluate speed in Mbps. Reference: 1 MB/s ≈ 8 Mbps.',
'q.introSpeed':'Enter a speed.',

's.vbad':'Very bad',
's.vbad.d':'Not suitable for streaming or video calls.',
's.bad':'Bad',
's.bad.d':'Slow browsing, issues with HD video.',
's.reg':'Fair',
's.reg.d':'HD video, acceptable video calls.',
's.good':'Good',
's.good.d':'4K streaming, smooth online gaming.',
's.vgood':'Very good',
's.vgood.d':'Fast downloads, multiple devices.',
's.exc':'Excellent',
's.exc.d':'High-end fiber, professional use.',
's.up.vbad':'Very bad',
's.up.vbad.d':'Hard to upload files or make video calls.',
's.up.bad':'Bad',
's.up.bad.d':'Slow uploads, poor live quality.',
's.up.reg':'Fair',
's.up.reg.d':'Acceptable upload for home use.',
's.up.good':'Good',
's.up.good.d':'Live streaming, cloud backups.',
's.up.vgood':'Very good',
's.up.vgood.d':'Professional streaming, large uploads.',
's.up.exc':'Excellent',
's.up.exc.d':'Professional / enterprise grade.',


'pot.cpu':'CPU Speed (GHz)',
'pot.cpuValue':'Frequency',
'pot.cpuUnit':'Unit',
'pot.cpuTo':'Convert to',
'pot.cpuEquiv':'Equivalent',
'pot.cpuPerf':'Performance',
'pot.cpuSlow':'Slow',
'pot.cpuFast':'Fast',
'pot.cpuPeriod':'Period',
'pot.cpuOps':'Ops/s',
'pot.cpuIntro':'Enter a frequency to evaluate.',
'pot.cpuHint':
'Frequency means cycles per second. '+
'Meters use a log scale from 1 MHz to 10 GHz.',

'c.retro':'Retro',
'c.retro.d':'Old 8/16-bit processors.',
'c.vslow':'Very slow',
'c.vslow.d':'Embedded devices or very old hardware.',
'c.slow':'Slow',
'c.slow.d':'Basic phones, IoT, budget mini PCs.',
'c.basic':'Basic',
'c.basic.d':'Light use: browsing, office work.',
'c.good':'Good',
'c.good.d':'Mid-range: smooth multitasking, light gaming.',
'c.vgood':'Very good',
'c.vgood.d':'High-end: gaming, editing, productivity.',
'c.exc':'Excellent',
'c.exc.d':'High performance: demanding gaming, 4K editing.',
'c.extreme':'Extreme',
'c.extreme.d':'Overclocked / high-performance servers.',
'c.insane':'Insane',
'c.insane.d':'Server-grade or experimental.',


'pot.ram':'RAM Speed',
'pot.ramQty':'Amount',
'pot.ramQtyUnit':'Unit',
'pot.ramGen':'Generation',
'pot.ramSpeed':'Speed',
'pot.ramTotal':'Total capacity',
'pot.ramBandwidth':'Bandwidth per channel',
'pot.ramDual':'Dual channel (2 channels)',
'pot.ramQuality':'Performance',
'pot.ramIntro':'Enter RAM amount and type.',
'pot.ramHint':
'Bandwidth is MT/s × 8 bytes (64-bit bus). '+
'DDR5-6000 ≈ 48 GB/s per channel.',

'rm.legacy':'Legacy',
'rm.legacy.d':'Old RAM. Only useful for retro machines.',
'rm.basic':'Basic',
'rm.basic.d':'Enough for very light tasks.',
'rm.office':'Office',
'rm.office.d':'Browsing, office work, basic daily use.',
'rm.good':'Good',
'rm.good.d':'Smooth multitasking, gaming and light editing.',
'rm.vgood':'Very good',
'rm.vgood.d':'Gaming, video editing, heavy workloads.',
'rm.exc':'Excellent',
'rm.exc.d':'Workstation, virtualization, servers.',
'rm.extreme':'Extreme',
'rm.extreme.d':'Professional workstation or high-performance server.',


'pot.storage':'Storage speed',
'pot.stQty':'Capacity',
'pot.stUnit':'Unit',
'pot.stType':'Device type',
'pot.stRead':'Sequential read',
'pot.stWrite':'Sequential write',
'pot.stIOPS':'IOPS (4K random)',
'pot.stQuality':'Performance',
'pot.stIntro':'Enter capacity and device type.',
'pot.stHint':
'Typical market values. Real performance varies with controller, '+
'cache and drive state.',

'sq.slow':'Very slow',
'sq.slow.d':'Old storage or low-speed card.',
'sq.basic':'Basic',
'sq.basic.d':'Traditional HDD or budget storage.',
'sq.good':'Good',
'sq.good.d':'SATA SSD or high-speed card. Noticeable improvement.',
'sq.vgood':'Very good',
'sq.vgood.d':'NVMe Gen3 or USB 3.2. Very fast boot and apps.',
'sq.exc':'Excellent',
'sq.exc.d':'NVMe Gen4. High-end performance.',
'sq.extreme':'Extreme',
'sq.extreme.d':'NVMe Gen5 or Thunderbolt. Professional grade.',


'pot.audio':'Audio bitrate',
'pot.audioValue':'Bitrate',
'pot.audioUnit':'Unit',
'pot.audioTo':'Convert to',
'pot.audioEquiv':'Equivalent',
'pot.audioQuality':'Quality',
'pot.audioIntro':'Enter a bitrate.',
'pot.audioHint':
'Reference: 128 kbps ≈ standard quality · 320 kbps ≈ high quality · '+
'1411 kbps = lossless CD.',

'aq.vlow':'Very low',
'aq.vlow.d':'Telephone or voice quality.',
'aq.low':'Low',
'aq.low.d':'Acceptable for voice podcasts.',
'aq.reg':'Fair',
'aq.reg.d':'Casual listening, basic quality.',
'aq.good':'Good',
'aq.good.d':'Standard quality, general music.',
'aq.vgood':'Very good',
'aq.vgood.d':'High quality, nearly transparent.',
'aq.exc':'Excellent',
'aq.exc.d':'High quality, indistinguishable from source.',
'aq.near':'Near lossless',
'aq.near.d':'Transparent with minimal loss.',
'aq.lossless':'Lossless',
'aq.lossless.d':'CD quality or higher, no compression.',


'pot.db':'Decibels',
'pot.dbValue':'Level',
'pot.dbUnit':'Unit',
'pot.dbTo':'Convert to',
'pot.dbEquiv':'Equivalent',
'pot.dbLevel':'Sound level',
'pot.dbSpectrum':'Estimated spectrum',
'pot.dbBass':'Bass',
'pot.dbMid':'Mid',
'pot.dbTreble':'Treble',
'pot.dbIntro':'Enter a sound level.',
'pot.dbHint':
'SPL scale: 0 dB = hearing threshold · 60 dB = conversation · '+
'120+ dB = hearing risk.',

'db.silent':'Silence',
'db.silent.d':'Hearing threshold, absolute silence.',
'db.quiet':'Very quiet',
'db.quiet.d':'Recording studio, library.',
'db.calm':'Calm',
'db.calm.d':'Quiet home, low conversation.',
'db.normal':'Normal',
'db.normal.d':'Normal conversation, office.',
'db.busy':'Noisy',
'db.busy.d':'Traffic, busy restaurant.',
'db.loud':'Loud',
'db.loud.d':'Busy street, vacuum cleaner.',
'db.vloud':'Very loud',
'db.vloud.d':'Concert, drill. Caution.',
'db.danger':'Dangerous',
'db.danger.d':'Hearing risk with prolonged exposure.',
'db.pain':'Painful',
'db.pain.d':'Pain threshold, immediate damage.',


'pot.video':'Video resolution',
'pot.videoValue':'Resolution',
'pot.videoUnit':'Unit',
'pot.videoTo':'Convert to',
'pot.videoEquiv':'Equivalent',
'pot.videoQuality':'Quality',
'pot.videoIntro':'Enter a resolution.',
'pot.videoHint':
'Reference: 2 MP ≈ Full HD 1080p · 8 MP ≈ 4K · 33 MP ≈ 8K. '+
'Phone cameras: 12–200 MP.',

'vq.vlow':'Very low',
'vq.vlow.d':'VGA / QVGA. Old cameras or basic webcams.',
'vq.low':'Low',
'vq.low.d':'SD (480p). Old video or basic phone.',
'vq.reg':'Fair',
'vq.reg.d':'HD ready 720p. Standard video.',
'vq.good':'Good',
'vq.good.d':'Full HD 1080p. Common high definition.',
'vq.vgood':'Very good',
'vq.vgood.d':'2K / QHD. Advanced monitors and cameras.',
'vq.exc':'Excellent',
'vq.exc.d':'4K UHD. Professional high resolution.',
'vq.extreme':'Extreme',
'vq.extreme.d':'5K–8K. Digital cinema and high-end cameras.',
'vq.pro':'Professional',
'vq.pro.d':'High-resolution full-frame cameras.',


'pot.time':'Time converter',
'pot.timeValue':'Amount',
'pot.timeUnit':'Unit',
'pot.timeTo':'Convert to',
'pot.timeEquiv':'Equivalent',
'pot.timeScale':'Time scale',
'pot.timeIntro':'Enter a time amount.',
'pot.timeHint':
'Month ≈ 30.44 days · Year ≈ 365.25 days. '+
'Converters use Gregorian calendar averages.',

'tq.atomic':'Atomic',
'tq.atomic.d':'Subatomic scale: nuclear reactions and light.',
'tq.micro':'Microscopic',
'tq.micro.d':'Electronics and chemical processes scale.',
'tq.human':'Human',
'tq.human.d':'Everyday life and perception scale.',
'tq.day':'Daily',
'tq.day.d':'One-day scale. Sleep, work, circadian cycles.',
'tq.week':'Weekly',
'tq.week.d':'One-week scale. Routines and planning.',
'tq.month':'Monthly',
'tq.month.d':'Monthly scale. Cycles, bills, seasons.',
'tq.year':'Yearly',
'tq.year.d':'Annual scale. Birthdays, school cycles.',
'tq.decade':'Decade',
'tq.decade.d':'Decades scale. Generational changes.',
'tq.century':'Century',
'tq.century.d':'Historical scale. Major transformations.',
'tq.millennium':'Millennium',
'tq.millennium.d':'Millennium scale. Human history.',


'pot.frames':'Frames per time unit',
'pot.framesValue':'Frames',
'pot.framesUnit':'Unit',
'pot.framesTo':'Convert to',
'pot.framesEquiv':'Equivalent',
'pot.framesPerf':'Smoothness',
'pot.framesIntro':'Enter a frame rate.',
'pot.framesHint':
'Reference: 24 fps = cinema · 30 fps = standard video · '+
'60 fps = smooth · 120+ fps = competitive gaming.',

'fq.slideshow':'Slideshow',
'fq.slideshow.d':'Very choppy motion, unusable for video.',
'fq.low':'Low',
'fq.low.d':'Basic animation or old video.',
'fq.cinema':'Cinema',
'fq.cinema.d':'Cinematic standard 24 fps.',
'fq.standard':'Standard',
'fq.standard.d':'Standard video and TV (30 fps).',
'fq.smooth':'Smooth',
'fq.smooth.d':'Casual gaming and modern video (60 fps).',
'fq.verySmooth':'Very smooth',
'fq.verySmooth.d':'High rate for gaming and fast motion (90–144 fps).',
'fq.extreme':'Extreme',
'fq.extreme.d':'Competitive gaming / high refresh monitors (144–240 fps).',
'fq.insane':'Insane',
'fq.insane.d':'Beyond human eye and most displays (240+ fps).',


'pot.codec':'Codec info',
'pot.codecAudio':'Audio',
'pot.codecVideo':'Video',
'pot.codecFull':'Full name',
'pot.codecYear':'Year',
'pot.codecType2':'Type',
'pot.codecBitrate':'Typical bitrate',
'pot.codecQuality':'Quality',
'pot.codecEfficiency':'Compression efficiency',
'pot.codecCompat':'Device compatibility',

'ct.lossy':'Lossy',
'ct.lossless':'Lossless',
'ct.uncompressed':'Uncompressed',
'ct.lossyM':'Lossy (mezzanine)',

'cd.quality.high':'Maximum quality',
'cd.quality.mid':'Medium quality',
'cd.quality.low':'Low quality',
'cd.eff.high':'Very efficient compression',
'cd.eff.mid':'Moderate compression',
'cd.eff.low':'Large files',
'cp.yes':'✓',
'cp.no':'✗',
'cp.partial':'~',


'calc.exploded':'BOOM! The calculator exploded.',
'calc.easterEgg':'Please Don\'t…',


'paint.loading':'Loading paint…',
'paint.error':
'Paint files not found, download them from GitHub :(',

'formulas.loading':'Loading formulas…',
'formulas.error':
'Formulas files not found, download them from GitHub :(',
'formulas.reveal':'Reveal calculation',
'formulas.reveal1':
'The big reveal is almost ready, please wait…',
'formulas.reveal2':'Revealing calculation…',
'formulas.reveal3':'Almost there…',

'games.loading':'Loading games…',
'games.error':
'No games installed, download the missing files on GitHub :(',
'games.disabled':
'The games section is disabled. Enable it in Settings > Games.',


'pinball.title':'Classic Pinball',
'pinball.start':'Start',
'pinball.launch':'Launch ball',
'pinball.restart':'Play again',
'pinball.score':'Score',
'pinball.lives':'Lives',
'pinball.gameOver':'Game Over',
'pinball.hint':
'3 ball drops = Game Over. First 2 drops show a recovery animation.',


'popit.title':'Pop It!',
'popit.flip':'Flip',
'popit.reset':'Reset',
'popit.hint':'Press the bubbles. Flip to see the other side.',
'popit.complete':'All popped! 🎉',
'popit.progress':'Popped {0}/{1}',


'ciphers.title':'Ciphers & Encodings',
'ciphers.algorithm':'Algorithm',
'ciphers.direction':'Direction',
'ciphers.encrypt':'Encrypt',
'ciphers.decrypt':'Decrypt',
'ciphers.input':'Input',
'ciphers.output':'Output',
'ciphers.key':'Key',
'ciphers.keyPlaceholder':'Enter key…',
'ciphers.alphabet':'Alphabet',
'ciphers.shift':'Shift',
'ciphers.paramA':'Parameter a',
'ciphers.paramB':'Parameter b',
'ciphers.iv':'IV',
'ciphers.mode':'Mode',
'ciphers.apply':'Apply',
'ciphers.clear':'Clear',
'ciphers.copy':'Copy',
'ciphers.outputEmpty':'—',
'ciphers.hint.cesar':'Classic shift cipher. Shift value 1–25.',
'ciphers.hint.rot13':'ROT13 (shift 13). Self-inverse.',
'ciphers.hint.rot47':'ROT47 over ASCII 33–126. Self-inverse.',
'ciphers.hint.atbash':'Mirrors the alphabet. Self-inverse.',
'ciphers.hint.vigenere':'Polyalphabetic cipher using a keyword.',
'ciphers.hint.affine':'Uses a and b. a must be coprime with 26.',
'ciphers.hint.substitution':
'Substitution alphabet (26 unique letters).',
'ciphers.hint.url':'URL encode/decode (percent).',
'ciphers.hint.unicode':'Unicode escape sequences (\\uXXXX).',
'ciphers.hint.xor':'XOR with a numeric or text key.',
'ciphers.hint.aes':'AES-256 with key (and optional IV).',
'ciphers.hint.des':'DES with 8-byte key.',
'ciphers.hint.tripledes':'3DES with 24-byte key.',
'ciphers.hint.rc4':'RC4 stream cipher with key.',
'ciphers.hint.rabbit':'Rabbit stream cipher with key (+IV).',
'ciphers.err.noInput':'Enter something to process.',
'ciphers.err.badKey':'Invalid key for this algorithm.',
'ciphers.err.badShift':'Shift must be 1–25.',
'ciphers.err.badAffine':'Parameter a must be coprime with 26.',
'ciphers.err.badAlphabet':'Alphabet must contain 26 unique letters.',
'ciphers.err.unsupported':'Algorithm not supported.',
'ciphers.err.generic':'Cipher error: {0}',

'ciphers.algo.cesar':'Caesar',
'ciphers.algo.rot13':'ROT13',
'ciphers.algo.rot47':'ROT47',
'ciphers.algo.atbash':'Atbash',
'ciphers.algo.vigenere':'Vigenère',
'ciphers.algo.affine':'Affine',
'ciphers.algo.substitution':'Substitution',
'ciphers.algo.url':'URL',
'ciphers.algo.unicode':'Unicode',
'ciphers.algo.xor':'XOR',
'ciphers.algo.aes':'AES',
'ciphers.algo.des':'DES',
'ciphers.algo.tripledes':'3DES',
'ciphers.algo.rc4':'RC4',
'ciphers.algo.rabbit':'Rabbit',


'range.title':'Massive Conversions',
'range.from':'From base',
'range.to':'To base',
'range.start':'Start value',
'range.end':'End value',
'range.presets':'Presets',
'range.generate':'Generate',
'range.copyAll':'Copy all',
'range.sequential':'Sequential display',
'range.empty':'Configure the range and press Generate.',
'range.resultCount':'{0} entries',
'range.page':'Page {0}/{1}',
'range.err.range':'End must be greater than or equal to start.',
'range.err.limit':'Range is too large (max 10000 entries).',
'range.err.invalid':'Invalid start or end value for the chosen base.',
'range.preset.decToBin':'Dec 0–100 → Bin',
'range.preset.decToOct':'Dec 0–100 → Oct',
'range.preset.decToBcd':'Dec 0–100 → BCD',
'range.preset.hexToDec':'Hex 0000–FFFF → Dec',
'range.preset.hexByte':'Hex 00–FF → Dec',
'range.preset.ascii':'ASCII 32–127',


'memory.title':'Memory Simulation',
'memory.total':'Total localities',
'memory.addressRange':'Address range',
'memory.size':'Addressable size',
'memory.used':'Used',
'memory.address':'Address (hex 000–FFF)',
'memory.value':'Value (hex 00–FF)',
'memory.read':'Read',
'memory.write':'Write',
'memory.result':'Result',
'memory.stats':'Memory stats',
'memory.bulk':'Bulk actions',
'memory.reset':'Reset all',
'memory.fill':'Fill all with value',
'memory.clearAll':'Clear all (00)',
'memory.jump':'Jump to address',
'memory.jumpBtn':'Go',
'memory.hint':
'4096 localities (0000–0FFF) = 4 KB addressable memory. '+
'Each byte is 8 bits (0x00–0xFF).',
'memory.empty':'Address {0} is empty (0x00).',
'memory.written':'Address {0} = 0x{1}',
'memory.err.address':
'Invalid address. Use 000–FFF (hexadecimal).',
'memory.err.value':
'Invalid value. Use 00–FF (hexadecimal).',


'convert.msg1':'Aligning the stars for conversion…',
'convert.msg2':'Checking the input…',
'convert.msg3':'Converting, please be patient…',
'convert.msg4':'Waiting makes the conversion more precise, please wait…',
'convert.msg5':'Calculating mathematically, please wait…',
'convert.msg6':'Almost at the output, please wait…',


'tab.console':'Console',
'console.title':'Console',
'console.clear':'Clear',
'console.cleared':'Console cleared.',
'console.placeholder':'Type JavaScript…',
'console.welcome':
'Nibbly Console ready. Type JavaScript and press Enter. '+
'Try: 1 + 1  or  NibblyModules',
'console.disabled':'Console Disabled',
'console.disabled.desc':
'The Console is only available when the Log Type is set to "Console" '+
'in Settings → Calculation log.',
'console.enable':'Enable Console Now',
'checker.cat.console':'Console',
'console.copy':'Copy',
'console.copy.title':'Copy all output',
'console.copied':'✓ Output copied to clipboard.',
'console.copyFailed':'✗ Could not copy to clipboard.',
'console.paste.title':'Paste from clipboard',
'console.pasted':'Pasted',
'console.pasteEmpty':'Clipboard is empty',
'console.pasteUnsupported':'Use Ctrl+V or long-press to paste',
'console.pasteFailed':'Could not paste. Use Ctrl+V instead.',
'console.pasteDenied':'Clipboard permission denied. Use Ctrl+V instead.',
'console.noCode':'Empty input (only comments).',


'toast.copied':'✓ Copied',
'toast.copyFail':'Could not copy',
'toast.nothing':'Nothing to copy',
'toast.reset':'✓ Reset',
'toast.gen':'✓ Code generated',
'toast.morsePlay':'♪ Playing Morse',
'toast.morseOff':'Sounds disabled',
'toast.wav':'⬇ Downloading WAV',
'toast.uiFail':
'The expansion files are broken or missing',
'toast.uiOk':'✓ UI applied',
'toast.bcdOk':'✓ Valid BCD',
'toast.bcdBad':'✗ Invalid BCD',
'toast.cipherOk':'✓ Cipher applied',
'toast.rangeOk':'✓ Range generated',
'toast.memoryWrite':'✓ Memory written',
'toast.memoryReset':'✓ Memory reset',
'toast.languageMissing':
'Spanish pack not installed.',
'toast.expansionReloaded':'✓ Expansion files reloaded',
'toast.expansionFailed':'⚠ Some files failed',
'toast.cacheCleared':'✓ Cache cleared — reloading',


'checker.cat.games':'Games',
'checker.cat.desktop':'Desktop',
'checker.cat.paint':'Paint',
'checker.cat.privacy':'Privacy',
'checker.cat.music':'Music',
'checker.cat.formulas':'Formulas',
'checker.cat.ciphers':'Ciphers',
'checker.cat.range':'Ranges',
'checker.cat.memory':'Memory',
'checker.cat.langs':'Languages',
'checker.cat.app':'App',


'err.invalidValue':'"{0}" is not a valid value in base {1}.',
'err.invalidNum':'Enter a valid number.',
'err.invalidPos':'Enter a valid positive number.',
'err.invalidCode':'Invalid code: "{0}"',
'err.outOfRange':'Out of Unicode range: "{0}"',
'err.invalidToken':'Invalid token: "{0}"',
'err.calcDivZero':'Division by zero',
'err.calcSqrt':'Square root of negative',


'f.csvDone':'✓ CSV downloaded',
'f.csvFail':'Could not generate CSV',
'f.csvEmpty':'Nothing to export',


'tab.markdown':'Markdown',
'checker.cat.markdown':'Markdown',
'markdown.editor':'Editor',
'markdown.preview':'Preview',
'markdown.loadFile':'Load file',
'markdown.download':'Download README.md',
'markdown.copyHtml':'Copy HTML',
'markdown.github':'Conect GitHub',
};

window.NibblyStrings=strings;
window.NibblyLangs=window.NibblyLangs||{};
window.NibblyLangs.en=strings;

if(console&&console.debug){
console.debug('[Nibbly] strings.js loaded (English, '+
Object.keys(strings).length+' keys)');
}
})();
