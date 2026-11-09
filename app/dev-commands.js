(function(){
'use strict';
if(window.dev&&window.dev.__ready)return;


function ok(msg){console.log('%c✓ '+msg,'color:#22d3a6;font-weight:800');}
function err(msg){console.error('%c✗ '+msg,'color:#ff6b7a;font-weight:800');}
function info(msg){console.log('%cℹ '+msg,'color:#7aa2ff;font-weight:800');}
function warn(msg){console.log('%c⚠ '+msg,'color:#ffb020;font-weight:800');}

function readSettings(){
try{return JSON.parse(localStorage.getItem('nibbly-settings-v2')||'{}');}
catch(_){return{};}
}
function writeSettings(patch){
try{
const cur=readSettings();
const next=Object.assign({},cur,patch);
localStorage.setItem('nibbly-settings-v2',JSON.stringify(next));
return next;
}catch(_){return null;}
}
function getApp(){return window.NibblyApp||null;}


const VERSION_RE=/^\d{1,2}(\.\d{1,2}){2,7}$/;
function validateVersion(str){
if(typeof str!=='string')return false;
return VERSION_RE.test(str.trim());
}

const HEX_RE=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
function validateHex(str){
if(typeof str!=='string')return false;
return HEX_RE.test(str.trim());
}


const LOG_HISTORY_KEY='nibbly-log-history-v1';
const LOG_HISTORY_MAX=500;

let logHistory=[];

function loadLogHistory(){
try{
const raw=sessionStorage.getItem(LOG_HISTORY_KEY);
if(raw){
const arr=JSON.parse(raw);
if(Array.isArray(arr))logHistory=arr.slice(-LOG_HISTORY_MAX);
}
}catch(_){logHistory=[];}
}

function saveLogHistory(){
try{
sessionStorage.setItem(LOG_HISTORY_KEY,JSON.stringify(logHistory.slice(-LOG_HISTORY_MAX)));
}catch(_){}
}

function pushLog(level,source,message,extra){
const entry={
t:Date.now(),
level:level,
source:source,
message:message,
extra:extra||null
};
logHistory.push(entry);
if(logHistory.length>LOG_HISTORY_MAX){
logHistory=logHistory.slice(-LOG_HISTORY_MAX);
}
saveLogHistory();
}


function cleanFormatString(format){
if(typeof format!=='string')return String(format);
return format.replace(/%c/g,'').replace(/\s+/g,' ').trim();
}


function isStyleString(str){
if(typeof str!=='string')return false;
const s=str.trim();
return/^(color|background|font|padding|margin|border|display|position|text|line-height|letter-spacing|opacity|transform|transition|animation|width|height|top|left|right|bottom|inset|box-shadow|z-index|overflow|flex|grid|gap|align|justify|white-space|word-break|max-|min-)/.test(s);
}

function installLogHook(){
if(window.__nibblyLogHookInstalled)return;
window.__nibblyLogHookInstalled=true;

const origLog=console.log;
const origWarn=console.warn;
const origError=console.error;
const origInfo=console.info;

function capture(level,orig,args){
try{

if(window.__nibblyLogMuted)return orig.apply(console,args);

const first=args[0];
if(typeof first==='string'){
const isNibbly=/^\[Nibbly/.test(first)||/^dev\./i.test(first)||/NIBBLY/i.test(first);
if(isNibbly){
const cleanMsg=cleanFormatString(first);

const extra=args.slice(1).filter(a=>!isStyleString(a)).map(a=>{
try{
if(typeof a==='string')return a;
if(a instanceof Error)return a.message;
return JSON.stringify(a);
}catch(_){return String(a);}
});
pushLog(level,'console',cleanMsg,extra.length?extra:null);
}
}
}catch(_){}
return orig.apply(console,args);
}

console.log=(...args)=>capture('info',origLog,args);
console.warn=(...args)=>capture('warn',origWarn,args);
console.error=(...args)=>capture('error',origError,args);
console.info=(...args)=>capture('info',origInfo,args);
}

loadLogHistory();
installLogHook();


function getConsoleOutput(){
return document.getElementById('nibConsoleOutput');
}

function appendLineToConsole(level,text){
const out=getConsoleOutput();
if(!out)return;
const line=document.createElement('div');
line.className='console-line console-line-'+level;
const time=document.createElement('span');
time.className='console-time';
time.textContent=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'});
const msg=document.createElement('span');
msg.className='console-msg';
msg.textContent=text;
line.appendChild(time);
line.appendChild(msg);
out.appendChild(line);
out.scrollTop=out.scrollHeight;
while(out.children.length>500)out.removeChild(out.firstChild);
}

function appendTableToConsole(text){
const out=getConsoleOutput();
if(!out)return;
const line=document.createElement('div');
line.className='console-line console-line-log';
const time=document.createElement('span');
time.className='console-time';
time.textContent=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'});
const pre=document.createElement('pre');
pre.className='console-msg console-table';
pre.textContent=text;
line.appendChild(time);
line.appendChild(pre);
out.appendChild(line);
out.scrollTop=out.scrollHeight;
while(out.children.length>500)out.removeChild(out.firstChild);
}


function formatTableObject(obj){
if(!obj)return'';

if(!Array.isArray(obj)&&typeof obj==='object'){
const keys=Object.keys(obj);
const maxKeyLen=Math.max(...keys.map(k=>k.length),10);
const maxValLen=Math.max(...keys.map(k=>String(obj[k]==null?'':obj[k]).length),10);
const top='┌─'+'─'.repeat(maxKeyLen)+'─┬─'+'─'.repeat(maxValLen)+'─┐';
const mid='├─'+'─'.repeat(maxKeyLen)+'─┼─'+'─'.repeat(maxValLen)+'─┤';
const bot='└─'+'─'.repeat(maxKeyLen)+'─┴─'+'─'.repeat(maxValLen)+'─┘';
const lines=[top];
keys.forEach((k,i)=>{
const val=String(obj[k]==null?'':obj[k]);
lines.push('│ '+k.padEnd(maxKeyLen)+' │ '+val.padEnd(maxValLen)+' │');
});
lines.push(bot);
return lines.join('\n');
}

if(Array.isArray(obj)&&obj.length>0&&typeof obj[0]==='object'){
const keys=[];
obj.forEach(r=>{
if(r&&typeof r==='object')Object.keys(r).forEach(k=>{
if(keys.indexOf(k)===-1)keys.push(k);
});
});
const widths=keys.map(k=>k.length);
obj.forEach(r=>keys.forEach((k,i)=>{
const len=String(r&&r[k]!=null?r[k]:'').length;
if(len>widths[i])widths[i]=len;
}));
const top='┌─'+widths.map(w=>'─'.repeat(w)).join('─┬─')+'─┐';
const header='│ '+keys.map((k,i)=>k.padEnd(widths[i])).join(' │ ')+' │';
const sep='├─'+widths.map(w=>'─'.repeat(w)).join('─┼─')+'─┤';
const bot='└─'+widths.map(w=>'─'.repeat(w)).join('─┴─')+'─┘';
const lines=[top,header,sep];
obj.forEach(r=>{
const cells=keys.map((k,i)=>String(r&&r[k]!=null?r[k]:'').padEnd(widths[i]));
lines.push('│ '+cells.join(' │ ')+' │');
});
lines.push(bot);
return lines.join('\n');
}
return String(obj);
}


function printHelp(){
const groups={
'⚙️  Base':[
['dev.help()','Muestra esta ayuda'],
['dev.nib.version("2.0.0")','Fuerza la versión (afecta badge About)'],
['dev.nib.lang("es"|"en")','Fuerza idioma'],
['dev.nib.xd(true|false)','Fuerza Please Don\'t (easter eggs)'],
['dev.nib.ac("#5b8cff")','Cambia color acento (HEX)'],
['dev.nib.bg("#0b1020")','Cambia color fondo (HEX)'],
['dev.nib.fx(true|false)','Efectos visuales'],
['dev.nib.fun("accent", 1000)','Arcoíris pulsante en el acento por 1000s'],
['dev.nib.fun("bg", 60)','Arcoíris pulsante en el fondo por 60s'],
['dev.nib.hcalc(true|false)','Calculadora en modo Difícil: ON/OFF'],
['dev.nib.wait(ms)','Cooldown de conversiones (0 = instantáneo, 3000 = default)']
],
'🧹 Limpieza':[
['dev.nib.clear.exp()','Recarga expansiones'],
['dev.nib.clear()','Borra caché y recarga'],
['dev.nib.css()','Recarga todos los CSS'],
['dev.nib.phone()','Fuerza Bolsillo'],
['dev.nib.pc()','Fuerza Escritorio']
],
'🔊 Media':[
['dev.nib.st()','Sound Test (iOS unlock)'],
['dev.nib.mus(0|1|2, loop?)','0=silencio 1=YouAreNibbled 2=GreatNibbly']
],
'🐣 Easter Eggs':[
['dev.nib.calc(1|2|"off")','Fuerza BOOM (1) o Black Hole (2) en calc'],
['dev.nib.fufa("win:N"|"lose:N"|"off")','Fuerza egg win/lose en Practice'],
['dev.nib.eggr()','Reinicia eggs al default']
],
'🔍 Checkers':[
['dev.nib.checkercat()','Chequea expansiones'],
['dev.nib.js()','Chequea JS en busca de errores'],
['dev.nib.push()','Detecta notificaciones'],
['dev.nib.clipboard()','Detecta permiso portapapeles'],
['dev.nib.fcount()','Cuenta archivos usados'],
['dev.nib.vtab()','Verifica CSS/JS de tabs'],
['dev.nib.platform()','Detecta platform (desktop o no)'],
['dev.nib.git()','Detecta GitHub (Working / 404)'],
['dev.nib.ver()','Detecta versión actual'],
['dev.nib.git.ver()','Última release en GitHub'],
['dev.nib.git.verc()','Compara versión actual vs GitHub']
],
'📱 Sistema':[
['dev.nib.ip()','Dirección IP pública'],
['dev.nib.device()','Dispositivo'],
['dev.nib.browser()','Navegador'],
['dev.nib.comp()','Detecta si es WebView']
],
'📋 Logs':[
['dev.nib.log()','Logcat histórico (últimos 50 eventos)'],
['dev.nib.log("n")','Últimos n eventos'],
['dev.nib.log("clear")','Limpia el historial de logs'],
['dev.nib.log("export")','Descarga logs como .txt']
]
};

console.log('%c═══════════════════════════════════════════════','color:#7aa2ff');
console.log('%c  NIBBLY DEV COMMANDS','color:#7aa2ff;font-weight:900;font-size:16px');
console.log('%c═══════════════════════════════════════════════','color:#7aa2ff');

Object.keys(groups).forEach(g=>{
console.log('%c'+g,'color:#22d3a6;font-weight:900;font-size:13px;margin-top:8px');
console.table(groups[g].map(r=>({'Comando':r[0],'Descripción':r[1]})));
});

console.log('%cNota: la mayoría de cambios persisten en localStorage.','color:#a0a8c0;font-style:italic');
}


const devState={
forcedCalcEgg:null,
forcedPracticeEgg:null,
rainbowTimers:{}
};


const nib={};


nib.version=function(v){
if(!v){info('Versión actual: '+(window.__NIBBLY_APP_VERSION||'?'));return;}
if(!validateVersion(v)){
err('Sintaxis inválida. Ejemplo: "2.0.0" o "9.9.99.99.4.5.5.6.2"');
return false;
}
const clean=v.trim();
window.__NIBBLY_APP_VERSION=clean;
pushLog('info','dev.nib.version','Versión cambiada a '+clean);
const numEl=document.getElementById('nibVersionText');
if(numEl)numEl.textContent=clean;
if(window.NibblyVersionCheck&&typeof window.NibblyVersionCheck.check==='function'){
window.NibblyVersionCheck.check(true).then(()=>{
try{
const badge=document.getElementById('nibVersionBadge');
if(badge&&window.NibblyVersionCheck.getBadgeState){
const st=window.NibblyVersionCheck.getBadgeState();
badge.dataset.state=st;
const s=window.NibblyVersionCheck.getState();
if(st==='new'){
badge.innerHTML='<span class="badge-inner">New '+((s.latestTag||'').replace(/^v/i,''))+'</span>';
}else if(st==='fresh'){
badge.innerHTML='<span class="badge-inner">Updated</span>';
}else if(st==='dev'){
badge.innerHTML='<span class="badge-inner">Dev '+clean+'</span>';
}
}
}catch(_){}
});
}
ok('Versión cambiada a '+clean);
return clean;
};


nib.lang=function(code){
if(!code){info('Idioma actual: '+(readSettings().lang||'en'));return;}
if(code!=='es'&&code!=='en'){err('Solo "es" o "en"');return false;}
const app=getApp();
if(app&&typeof app.setSettings==='function')app.setSettings({lang:code});
else writeSettings({lang:code});
pushLog('info','dev.nib.lang','Idioma cambiado a "'+code+'"');
ok('Idioma cambiado a "'+code+'"');
return code;
};


nib.xd=function(val){
if(val===undefined){info('pleaseDont actual: '+!!readSettings().pleaseDont);return;}
if(typeof val!=='boolean'){err('Solo true o false');return false;}
const app=getApp();
if(app&&typeof app.setSettings==='function')app.setSettings({pleaseDont:val});
else writeSettings({pleaseDont:val});
pushLog('info','dev.nib.xd','pleaseDont = '+val);
ok('pleaseDont = '+val);
return val;
};


nib.ac=function(hex){
if(!hex){info('Uso: dev.nib.ac("#5b8cff")');return;}
if(!validateHex(hex)){err('HEX inválido (#RGB o #RRGGBB)');return false;}
const app=getApp();
if(app&&typeof app.setSettings==='function')app.setSettings({accent:hex.trim()});
else writeSettings({accent:hex.trim()});
pushLog('info','dev.nib.ac','Acento: '+hex);
ok('Acento: '+hex);
return hex;
};


nib.bg=function(hex){
if(!hex){info('Uso: dev.nib.bg("#0b1020")');return;}
if(!validateHex(hex)){err('HEX inválido (#RGB o #RRGGBB)');return false;}
const app=getApp();
if(app&&typeof app.setSettings==='function')app.setSettings({bg:hex.trim()});
else writeSettings({bg:hex.trim()});
pushLog('info','dev.nib.bg','Fondo: '+hex);
ok('Fondo: '+hex);
return hex;
};


nib.fx=function(val){
if(val===undefined){info('Efectos visuales: '+(readSettings().effects!==false));return;}
if(typeof val!=='boolean'){err('Solo true o false');return false;}
const app=getApp();
if(app&&typeof app.setSettings==='function')app.setSettings({effects:val});
else writeSettings({effects:val});
pushLog('info','dev.nib.fx','Efectos visuales = '+val);
ok('Efectos visuales = '+val);
return val;
};


nib.fun=function(type,seconds){
type=type||'accent';
seconds=seconds||1000;
if(type!=='accent'&&type!=='bg'){
err('Tipo inválido. Usa "accent" o "bg".');
return false;
}
if(devState.rainbowTimers[type]){
cancelAnimationFrame(devState.rainbowTimers[type]);
devState.rainbowTimers[type]=null;
}
const root=document.documentElement;
const prop=type==='accent'?'--accent-base':'--bg-base';
const start=performance.now();
function step(now){
const t=(now-start)/1000;
const hue=(t*360)%360;
root.style.setProperty(prop,'hsl('+hue+',85%,55%)');
if(performance.now()-start<seconds*1000){
devState.rainbowTimers[type]=requestAnimationFrame(step);
}else{
devState.rainbowTimers[type]=null;
const s=readSettings();
root.style.setProperty(prop,type==='accent'?(s.accent||'#5b8cff'):(s.bg||'#0b1020'));
info('Arcoíris terminado ('+type+')');
}
}
devState.rainbowTimers[type]=requestAnimationFrame(step);
pushLog('info','dev.nib.fun','Arcoíris en '+type+' durante '+seconds+'s');
ok('Arcoíris pulsante en '+type+' durante '+seconds+'s');
return true;
};


nib.hcalc=function(val){
if(!window.__nibblyPracticeDev){
window.__nibblyPracticeDev={calcEnabled:false};
}
if(val===undefined){
const cur=!!window.__nibblyPracticeDev.calcEnabled;
info('Calculadora en Difícil: '+(cur?'ON ✅':'OFF ❌'));
info('Uso: dev.nib.hcalc(true) para activar, dev.nib.hcalc(false) para desactivar');
return cur;
}
if(typeof val!=='boolean'){
err('Usa true o false');
return false;
}
window.__nibblyPracticeDev.calcEnabled=val;
pushLog('info','dev.nib.hcalc','Calculadora en Difícil: '+(val?'ON':'OFF'));
ok('Calculadora en Difícil: '+(val?'ON ✅':'OFF ❌'));
const practice=window.NibblyModules&&window.NibblyModules.practice;
if(practice&&typeof practice.reset==='function'){
try{
practice.reset();
info('Practice recargado con el nuevo estado');
}catch(_){}
}
return val;
};


nib.wait=function(ms){
if(!window.__nibblyPracticeDev){
window.__nibblyPracticeDev={calcEnabled:false};
}
if(typeof window.__nibblyPracticeDev.convertDelay!=='number'){
window.__nibblyPracticeDev.convertDelay=3000;
}
if(ms===undefined){
const cur=window.__nibblyPracticeDev.convertDelay;
info('Cooldown de conversiones: '+cur+'ms ('+(cur/1000)+'s)');
info('Uso: dev.nib.wait(0) → instantáneo · dev.nib.wait(3000) → 3s');
info('Referencia: 0 = v1.0.0 · 1000-3000 = v2.0.0+');
return cur;
}
if(typeof ms!=='number'||!isFinite(ms)||ms<0){
err('Usa un número ≥ 0 (milisegundos)');
info('Ejemplo: dev.nib.wait(0) → instantáneo');
return false;
}
const val=Math.min(Math.floor(ms),60000);
window.__nibblyPracticeDev.convertDelay=val;
pushLog('info','dev.nib.wait','Cooldown: '+val+'ms');
ok('Cooldown de conversiones: '+val+'ms ('+(val/1000)+'s)');
if(val===0)info('Modo instantáneo (v1.0.0)');
else if(val<=1000)info('Modo rápido');
else if(val<=3000)info('Modo normal (v2.0.0+)');
else info('Modo lento');
return val;
};


nib.clear={
exp:async function(){
if(!window.NibblyApp||typeof window.NibblyApp.reloadExpansionFiles!=='function'){
err('reloadExpansionFiles no disponible');return false;
}
info('Recargando expansiones…');
pushLog('info','dev.nib.clear.exp','Recargando expansiones');
try{await window.NibblyApp.reloadExpansionFiles();ok('Expansiones recargadas');return true;}
catch(e){err('Error: '+(e.message||e));return false;}
},
all:async function(){
if(!window.NibblyApp||typeof window.NibblyApp.clearNibblyCache!=='function'){
err('clearNibblyCache no disponible');return false;
}
info('Borrando caché…');
pushLog('info','dev.nib.clear','Borrando caché y recargando');
try{await window.NibblyApp.clearNibblyCache();ok('Cache borrada');return true;}
catch(e){err('Error: '+(e.message||e));return false;}
}
};


nib.css=async function(){
const links=Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
info('Recargando '+links.length+' hojas CSS…');
links.forEach(l=>{
const base=l.href.split('?')[0];
l.href=base+'?bust='+Date.now();
});
pushLog('info','dev.nib.css','CSS recargados: '+links.length);
ok('Recargadas '+links.length+' hojas');
return links.length;
};


nib.phone=async function(){
const app=getApp();
if(app&&typeof app.setSettings==='function'){
await app.setSettings({uiMode:'pocket'});
document.body.classList.remove('desktop-ui');
pushLog('info','dev.nib.phone','Interfaz Bolsillo');
ok('Interfaz Bolsillo');
return true;
}
err('setSettings no disponible');return false;
};
nib.pc=async function(){
const app=getApp();
if(app&&typeof app.setSettings==='function'){
await app.setSettings({uiMode:'desktop'});
pushLog('info','dev.nib.pc','Interfaz Escritorio');
ok('Interfaz Escritorio');
return true;
}
err('setSettings no disponible');return false;
};


nib.st=async function(){
const AC=window.AudioContext||window.webkitAudioContext;
if(!AC){err('AudioContext no disponible');return false;}
const ctx=new AC();
await ctx.resume().catch(()=>{});
const now=ctx.currentTime;
const sounds=[
{freq:880,dur:0.1,type:'sine',gain:0.08},
{freq:750,dur:0.15,type:'sine',gain:0.10},
{freq:1200,dur:0.08,type:'triangle',gain:0.07},
{freq:220,dur:0.20,type:'sawtooth',gain:0.10},
{freq:660,dur:0.12,type:'sine',gain:0.09}
];
sounds.forEach(snd=>{
const osc=ctx.createOscillator();
const gain=ctx.createGain();
osc.type=snd.type;
osc.frequency.setValueAtTime(snd.freq,now);
gain.gain.setValueAtTime(0.0001,now);
gain.gain.exponentialRampToValueAtTime(snd.gain,now+0.01);
gain.gain.exponentialRampToValueAtTime(0.0001,now+snd.dur);
osc.connect(gain);gain.connect(ctx.destination);
osc.start(now);osc.stop(now+snd.dur+0.05);
});
setTimeout(()=>{try{ctx.close();}catch(_){}},1000);
pushLog('info','dev.nib.st','Sound Test: '+sounds.length+' sonidos');
ok('Sound Test: '+sounds.length+' sonidos');
return true;
};


nib.mus=async function(track,loop){
const tracks={
0:{name:'Silencio',path:null},
1:{name:'You Are Nibbled',path:'mus/You Are Nibbled.ogg'},
2:{name:'The Great Nibbly Revelation',path:'mus/The Great Nibbly Revelation.ogg'}
};
if(track===undefined){
info('Uso: dev.nib.mus(0|1|2, loop=true)');
Object.keys(tracks).forEach(k=>console.log('  '+k+' = '+tracks[k].name));
return;
}
if(!tracks[track]){err('Track inválido (0/1/2)');return false;}
const wantLoop=loop!==false;
if(window.__nibblyDevMusic){
try{window.__nibblyDevMusic.pause();window.__nibblyDevMusic.src='';}catch(_){}
window.__nibblyDevMusic=null;
}
if(track===0){
const music=window.NibblyModules&&window.NibblyModules.music;
if(music&&typeof music.setEnabled==='function'){
try{music.setEnabled(false);}catch(_){}
}
pushLog('info','dev.nib.mus','Música: silencio');
ok('Música: silencio');
return true;
}
try{
const audio=new Audio(tracks[track].path);
audio.loop=wantLoop;
audio.volume=0.7;
window.__nibblyDevMusic=audio;
const music=window.NibblyModules&&window.NibblyModules.music;
if(music&&typeof music.setEnabled==='function'){
try{music.setEnabled(false);}catch(_){}
}
const p=audio.play();
if(p&&p.catch){
p.catch(()=>{
const resume=()=>{
audio.play().catch(()=>{});
document.removeEventListener('pointerdown',resume);
};
document.addEventListener('pointerdown',resume,{once:true});
});
}
pushLog('info','dev.nib.mus','Reproduciendo: '+tracks[track].name);
ok('Reproduciendo: '+tracks[track].name+(wantLoop?' (loop)':''));
return true;
}catch(e){
err('Error: '+(e.message||e));
return false;
}
};


nib.calc=function(mode){
if(mode===undefined){
info('Uso: dev.nib.calc(1|2|"off") — 1=BOOM, 2=Black Hole, "off"=reset');
return;
}
if(mode==='off'){
devState.forcedCalcEgg=null;
ok('Egg calc reiniciado');
return;
}
if(mode!==1&&mode!==2){
err('Modo inválido. 1=BOOM, 2=Black Hole, "off"');
return false;
}
devState.forcedCalcEgg=(mode===1?'boom':'blackhole');
pushLog('info','dev.nib.calc','Egg forzado: '+(mode===1?'BOOM':'BLACK HOLE'));
ok('Calc egg forzado: '+(mode===1?'BOOM':'BLACK HOLE'));
return mode;
};

nib.fufa=function(id){
if(id===undefined){
info('Uso: dev.nib.fufa("win:N" | "lose:N" | "off")');
info('Ej: dev.nib.fufa("win:1") — fuerza el 1er egg de ganar');
return;
}
if(id==='off'){
devState.forcedPracticeEgg=null;
ok('Egg practice reiniciado');
return;
}
if(typeof id==='string'&&(id.startsWith('win:')||id.startsWith('lose:'))){
const parts=id.split(':');
const kind=parts[0];
const num=parseInt(parts[1],10);
const max=kind==='win'?15:20;
if(!num||num<1||num>max){
err('Número inválido. Rango: win 1-15, lose 1-20');
return false;
}
devState.forcedPracticeEgg={kind,num};
pushLog('info','dev.nib.fufa','Egg forzado: '+kind+' #'+num);
ok('Practice egg forzado: '+kind+' #'+num);
return id;
}
err('Formato inválido. Usa "win:N" o "lose:N"');
return false;
};

nib.eggr=function(){
devState.forcedCalcEgg=null;
devState.forcedPracticeEgg=null;
Object.keys(devState.rainbowTimers).forEach(k=>{
if(devState.rainbowTimers[k]){
cancelAnimationFrame(devState.rainbowTimers[k]);
devState.rainbowTimers[k]=null;
}
});
pushLog('info','dev.nib.eggr','Easter eggs reiniciados');
ok('Todos los easter eggs reiniciados al default');
};

window.__nibblyDevState=devState;


nib.checkercat=async function(){
info('Chequeando expansiones…');
const EXPANSION_BASE='expansions/expansion-pack-1/';
const EXPANSION_BASE_2='expansions/expansion-pack-2/';
const files=[
{js:'app/langs/es.js',cat:'Langs'},
{js:'app/version-check.js',cat:'VersionCheck'},
{js:'app/dev-commands.js',cat:'Dev'},
{js:EXPANSION_BASE+'range/range.js',css:EXPANSION_BASE+'range/range.css',cat:'Range'},
{js:EXPANSION_BASE+'memory/memory.js',css:EXPANSION_BASE+'memory/memory.css',cat:'Memory'},
{js:EXPANSION_BASE+'paint/paint.js',css:EXPANSION_BASE+'paint/paint.css',cat:'Paint'},
{js:EXPANSION_BASE+'games/games.js',css:EXPANSION_BASE+'games/games.css',cat:'Games'},
{js:EXPANSION_BASE+'games/games-extras.js',css:EXPANSION_BASE+'games/games-extras.css',cat:'GamesX'},
{js:EXPANSION_BASE+'formulas/formulas.js',css:EXPANSION_BASE+'formulas/formulas.css',cat:'Formulas'},
{js:EXPANSION_BASE+'privacy/privacy.js',css:EXPANSION_BASE+'privacy/privacy.css',cat:'Privacy'},
{js:EXPANSION_BASE+'desktop-ui/desktop.js',css:EXPANSION_BASE+'desktop-ui/desktop.css',cat:'Desktop'},
{js:EXPANSION_BASE+'console/console.js',css:EXPANSION_BASE+'console/console.css',cat:'Console'},
{js:EXPANSION_BASE+'markdown/markdown.js',css:EXPANSION_BASE+'markdown/markdown.css',cat:'Markdown'},
{asset:'mus/You Are Nibbled.ogg',cat:'Music'},
{js:EXPANSION_BASE_2+'logic-gates/logic-gates.js',css:EXPANSION_BASE_2+'logic-gates/logic-gates.css',cat:'Logic'},
{js:EXPANSION_BASE_2+'flowcharts/flowcharts.js',css:EXPANSION_BASE_2+'flowcharts/flowcharts.css',cat:'Flowcharts'},
{js:EXPANSION_BASE_2+'practice/practice.js',css:EXPANSION_BASE_2+'practice/practice.css',cat:'Practice'}
];

function probe(path){
return new Promise(res=>{
if(path.endsWith('.css')){
const l=document.createElement('link');
l.rel='stylesheet';l.href=path+'?probe='+Date.now();
l.onload=()=>{l.remove();res(true);};
l.onerror=()=>{l.remove();res(false);};
document.head.appendChild(l);
setTimeout(()=>{if(l.parentNode){l.remove();res(false);}},4000);
return;
}
if(path.endsWith('.ogg')||path.endsWith('.mp3')){
const a=new Audio();
a.preload='metadata';
let settled=false;
const done=v=>{if(settled)return;settled=true;try{a.src='';}catch(_){}res(v);};
a.onloadedmetadata=()=>done(true);
a.onerror=()=>done(false);
a.src=path;
setTimeout(()=>done(false),4000);
return;
}
fetch(path,{method:'HEAD',cache:'no-store'})
.then(r=>res(r.ok))
.catch(()=>res(false));
});
}

const rows=[];
for(const f of files){
if(f.js){
const okJs=await probe(f.js);
rows.push({Categoría:f.cat,Archivo:f.js,OK:okJs?'✅':'❌'});
}
if(f.css){
const okCss=await probe(f.css);
rows.push({Categoría:f.cat,Archivo:f.css,OK:okCss?'✅':'❌'});
}
if(f.asset){
const okA=await probe(f.asset);
rows.push({Categoría:f.cat,Archivo:f.asset,OK:okA?'✅':'❌'});
}
}
console.table(rows);
const missing=rows.filter(r=>r.OK==='❌');
if(missing.length===0)ok('Todos los archivos están OK');
else warn(missing.length+' archivos faltantes');
pushLog('info','dev.nib.checkercat',rows.length+' archivos chequeados, '+missing.length+' faltantes');
return rows;
};

nib.js=async function(){
info('Analizando errores JS…');
const syntaxErr=window.__NIBBLY_SYNTAX_ERROR||null;
if(syntaxErr)warn('Último error de sintaxis: '+syntaxErr);
else ok('No se detectaron errores de sintaxis recientes');
const mods=window.NibblyModules||{};
const expected=['icons','effects','music','numbers','textconv','bits','power','media','calc','ciphers'];
const missing=expected.filter(m=>!mods[m]);
if(missing.length===0)ok('Módulos core OK ('+expected.length+'/'+expected.length+')');
else warn('Faltan módulos core: '+missing.join(', '));
pushLog('info','dev.nib.js','Análisis JS: '+missing.length+' módulos faltantes');
return{syntaxErr,modules:Object.keys(mods)};
};

nib.push=async function(){
info('Chequeando notificaciones…');
if(!('Notification'in window)){
err('Notification API no disponible');
return{available:false};
}
let perm=Notification.permission;
if(perm==='default'){
info('Solicitando permiso…');
try{perm=await Notification.requestPermission();}catch(_){}
}
console.log('Estado: '+perm);
if(perm==='granted')ok('Notificaciones: GRANTED');
else if(perm==='denied')err('Notificaciones: DENIED');
else warn('Notificaciones: DEFAULT');
pushLog('info','dev.nib.push','Notificaciones: '+perm);
return{permission:perm};
};

nib.clipboard=async function(){
info('Chequeando portapapeles…');
const has=navigator.clipboard&&window.isSecureContext;
if(!has){err('Clipboard API no disponible (requiere HTTPS)');return{available:false};}
try{
await navigator.clipboard.writeText('nibbly-test-'+Date.now());
const read=await navigator.clipboard.readText();
ok('Clipboard: lectura/escritura OK (read: "'+read.slice(0,20)+'…")');
pushLog('info','dev.nib.clipboard','Clipboard OK');
return{available:true,readable:true};
}catch(e){
warn('Clipboard: error — '+(e.message||e));
pushLog('warn','dev.nib.clipboard','Clipboard error: '+(e.message||e));
return{available:true,error:e.message||String(e)};
}
};

nib.fcount=async function(){
info('Contando archivos…');
const EXPANSION_BASE='expansions/expansion-pack-1/';
const EXPANSION_BASE_2='expansions/expansion-pack-2/';
const files=[
'app/config.js','app/config.css','app/effects.js','app/effects.css',
'app/music.js','app/main.js','app/main.css',
'app/langs/strings.js','app/langs/es.js',
'app/version-check.js','app/dev-commands.js',
EXPANSION_BASE+'icons/icons.js',EXPANSION_BASE+'icons/icons.css',
EXPANSION_BASE+'range/range.js',EXPANSION_BASE+'range/range.css',
EXPANSION_BASE+'memory/memory.js',EXPANSION_BASE+'memory/memory.css',
EXPANSION_BASE+'paint/paint.js',EXPANSION_BASE+'paint/paint.css',
EXPANSION_BASE+'games/games.js',EXPANSION_BASE+'games/games.css',
EXPANSION_BASE+'games/games-extras.js',EXPANSION_BASE+'games/games-extras.css',
EXPANSION_BASE+'formulas/formulas.js',EXPANSION_BASE+'formulas/formulas.css',
EXPANSION_BASE+'privacy/privacy.js',EXPANSION_BASE+'privacy/privacy.css',
EXPANSION_BASE+'desktop-ui/desktop.js',EXPANSION_BASE+'desktop-ui/desktop.css',
EXPANSION_BASE+'console/console.js',EXPANSION_BASE+'console/console.css',
EXPANSION_BASE+'markdown/markdown.js',EXPANSION_BASE+'markdown/markdown.css',
'mus/You Are Nibbled.ogg','mus/The Great Nibbly Revelation.ogg',
EXPANSION_BASE_2+'logic-gates/logic-gates.js',EXPANSION_BASE_2+'logic-gates/logic-gates.css',
EXPANSION_BASE_2+'flowcharts/flowcharts.js',EXPANSION_BASE_2+'flowcharts/flowcharts.css',
EXPANSION_BASE_2+'practice/practice.js',EXPANSION_BASE_2+'practice/practice.css'
];

function probe(path){
return new Promise(res=>{
if(path.endsWith('.css')){
const l=document.createElement('link');
l.rel='stylesheet';l.href=path+'?probe='+Date.now();
l.onload=()=>{l.remove();res(true);};
l.onerror=()=>{l.remove();res(false);};
document.head.appendChild(l);
setTimeout(()=>{if(l.parentNode){l.remove();res(false);}},4000);
return;
}
if(path.endsWith('.ogg')||path.endsWith('.mp3')){
const a=new Audio();
a.preload='metadata';
let settled=false;
const done=v=>{if(settled)return;settled=true;try{a.src='';}catch(_){}res(v);};
a.onloadedmetadata=()=>done(true);
a.onerror=()=>done(false);
a.src=path;
setTimeout(()=>done(false),4000);
return;
}
fetch(path,{method:'HEAD',cache:'no-store'})
.then(r=>res(r.ok))
.catch(()=>res(false));
});
}

let okCount=0,failCount=0;
for(const f of files){
const okF=await probe(f);
okF?okCount++:failCount++;
}
console.log('%cArchivos cargados: '+okCount+'/'+files.length,'color:#22d3a6;font-weight:800');
if(failCount>0)warn('Faltan '+failCount+' archivos');
pushLog('info','dev.nib.fcount',okCount+'/'+files.length+' archivos, '+failCount+' faltantes');
return{total:files.length,ok:okCount,fail:failCount};
};

nib.vtab=function(){
info('Verificando tabs…');
const tabs=[
{id:'num',name:'Numbers',jsOk:!!(window.NibblyModules&&window.NibblyModules.numbers)},
{id:'txt',name:'Text',jsOk:!!(window.NibblyModules&&window.NibblyModules.textconv)},
{id:'uni',name:'Bits',jsOk:!!(window.NibblyModules&&window.NibblyModules.bits)},
{id:'pot',name:'Power',jsOk:!!(window.NibblyModules&&window.NibblyModules.power)},
{id:'media',name:'Media',jsOk:!!(window.NibblyModules&&window.NibblyModules.media)},
{id:'calc',name:'Calc',jsOk:!!(window.NibblyModules&&window.NibblyModules.calc)},
{id:'ciphers',name:'Ciphers',jsOk:!!(window.NibblyModules&&window.NibblyModules.ciphers)},
{id:'range',name:'Range',jsOk:!!(window.NibblyModules&&window.NibblyModules.range)},
{id:'memory',name:'Memory',jsOk:!!(window.NibblyModules&&window.NibblyModules.memory)},
{id:'paint',name:'Paint',jsOk:!!(window.NibblyModules&&window.NibblyModules.paint)},
{id:'games',name:'Games',jsOk:!!(window.NibblyModules&&window.NibblyModules.games)},
{id:'formulas',name:'Formulas',jsOk:!!(window.NibblyModules&&window.NibblyModules.formulas)},
{id:'console',name:'Console',jsOk:!!(window.NibblyModules&&window.NibblyModules.console)},
{id:'markdown',name:'Markdown',jsOk:!!(window.NibblyModules&&window.NibblyModules.markdown)},
{id:'logic',name:'Logic',jsOk:!!(window.NibblyModules&&window.NibblyModules['logic-gates'])},
{id:'flowcharts',name:'Flowcharts',jsOk:!!(window.NibblyModules&&window.NibblyModules.flowcharts)},
{id:'practice',name:'Practice',jsOk:!!(window.NibblyModules&&window.NibblyModules.practice)}
];

const rows=tabs.map(t=>{
const btn=document.querySelector('.tab[data-tab="'+t.id+'"]');
const panel=document.getElementById('panel-'+t.id);
return{
Tab:t.name,
'Botón nav':btn?'✅':'❌',
'Panel DOM':panel?'✅':'❌',
'Módulo JS':t.jsOk?'✅':'❌'
};
});
console.table(rows);
const bad=rows.filter(r=>r['Botón nav']==='❌'||r['Panel DOM']==='❌'||r['Módulo JS']==='❌');
if(bad.length===0)ok('Todas las tabs OK');
else warn(bad.length+' tabs con problemas');
pushLog('info','dev.nib.vtab',tabs.length+' tabs, '+bad.length+' con problemas');
return rows;
};

nib.platform=function(){
info('Detectando platform…');
const hasDesktop=!!(window.NibblyModules&&window.NibblyModules.desktop);
const hasDesktopJs=!!(window.NibblyModules&&window.NibblyModules.desktop&&typeof window.NibblyModules.desktop.init==='function');
const isPhone=window.matchMedia('(pointer: coarse)').matches;
const isDesktop=window.innerWidth>=1024&&window.matchMedia('(pointer: fine)').matches;
const hasDesktopFiles=fetch('expansions/expansion-pack-1/desktop-ui/desktop.js',{method:'HEAD'}).then(r=>r.ok).catch(()=>false);
const result={
'Desktop UI cargada':hasDesktop?'✅':'❌',
'Desktop módulo JS':hasDesktopJs?'✅':'❌',
'Pointer coarse (touch)':isPhone?'✅':'❌',
'Pointer fine (mouse)':isDesktop?'✅':'❌',
'Viewport width':window.innerWidth+'px'
};
console.table(result);
hasDesktopFiles.then(okD=>{
console.log('Archivos desktop existen: '+(okD?'✅':'❌'));
if(!okD&&!hasDesktopJs){
warn('Proyecto solo para teléfono');
pushLog('info','dev.nib.platform','Proyecto solo para teléfono');
}else{
ok('Proyecto compatible con PC y teléfono');
pushLog('info','dev.nib.platform','Proyecto compatible');
}
});
return result;
};

nib.git=async function(){
info('Chequeando GitHub…');
const API='https://api.github.com/repos/edwarly999plus/Nibbly';
try{
const res=await fetch(API,{method:'GET',cache:'no-store'});
if(res.ok){
const data=await res.json();
ok('GitHub: Working ('+data.html_url+')');
pushLog('info','dev.nib.git','GitHub Working');
return{status:'Working',url:data.html_url};
}else if(res.status===404){
err('GitHub: 404 (repo no encontrado)');
pushLog('warn','dev.nib.git','GitHub 404');
return{status:'404'};
}else{
err('GitHub: HTTP '+res.status);
pushLog('warn','dev.nib.git','GitHub HTTP '+res.status);
return{status:'HTTP '+res.status};
}
}catch(e){
err('GitHub: sin conexión — '+(e.message||e));
pushLog('error','dev.nib.git','GitHub offline: '+(e.message||e));
return{status:'offline'};
}
};

nib.ver=function(){
const v=window.__NIBBLY_APP_VERSION||'?';
info('Versión actual: '+v);
return v;
};

nib.git.ver=async function(){
info('Consultando última release…');
try{
const res=await fetch('https://api.github.com/repos/edwarly999plus/Nibbly/releases/latest',{cache:'no-store'});
if(!res.ok){err('Error HTTP '+res.status);return null;}
const data=await res.json();
ok('Última release: '+(data.tag_name||'?'));
pushLog('info','dev.nib.git.ver','Última release: '+(data.tag_name||'?'));
return data.tag_name;
}catch(e){
err('Error: '+(e.message||e));
return null;
}
};

nib.git.verc=async function(){
const appV=window.__NIBBLY_APP_VERSION||'?';
info('Comparando versión…');
try{
const res=await fetch('https://api.github.com/repos/edwarly999plus/Nibbly/releases/latest',{cache:'no-store'});
if(!res.ok){err('Error HTTP '+res.status);return null;}
const data=await res.json();
const tag=data.tag_name||'?';
function parse(v){
const c=String(v||'').replace(/^v/i,'').trim();
const p=c.split('.').map(n=>parseInt(n,10));
return{major:p[0]||0,minor:p[1]||0,patch:p[2]||0};
}
function cmp(a,b){
const va=parse(a),vb=parse(b);
if(va.major!==vb.major)return va.major-vb.major;
if(va.minor!==vb.minor)return va.minor-vb.minor;
return va.patch-vb.patch;
}
const c=cmp(tag,appV);
let status,color;
if(c>0){status='NEEDS UPDATE (GitHub > local)';color='#ffb020';}
else if(c<0){status='DEVELOPER (local > GitHub)';color='#a78bfa';}
else{status='UP TO DATE';color='#22d3a6';}
console.log('%cApp version: '+appV,'font-weight:800');
console.log('%cGitHub tag:  '+tag,'font-weight:800');
console.log('%cEstado: '+status,'color:'+color+';font-weight:900');
pushLog('info','dev.nib.git.verc','Comparativa: app='+appV+', github='+tag+', status='+status);
return{appVersion:appV,githubVersion:tag,status};
}catch(e){
err('Error: '+(e.message||e));
return null;
}
};


nib.ip=async function(){
info('Obteniendo IP…');
try{
const res=await fetch('https://api.ipify.org?format=json',{cache:'no-store'});
const data=await res.json();
ok('IP pública: '+data.ip);
pushLog('info','dev.nib.ip','IP: '+data.ip);
return data.ip;
}catch(e){
try{
const res=await fetch('https://ipapi.co/json/',{cache:'no-store'});
const data=await res.json();
ok('IP pública: '+data.ip);
pushLog('info','dev.nib.ip','IP: '+data.ip);
return data.ip;
}catch(e2){
err('No se pudo obtener IP: '+(e.message||e));
return null;
}
}
};

nib.device=function(){
const ua=navigator.userAgent;
const isAndroid=/Android/i.test(ua);
const isIOS=/iPhone|iPad|iPod/i.test(ua);
const isWindows=/Windows/i.test(ua);
const isMac=/Mac OS X/i.test(ua);
const isLinux=/Linux/i.test(ua)&&!isAndroid;
let device='Desconocido';
if(isAndroid)device='Android';
else if(isIOS)device='iOS';
else if(isWindows)device='Windows';
else if(isMac)device='macOS';
else if(isLinux)device='Linux';
let model=null;
if(isAndroid){
const m=ua.match(/Android [\d.]+;\s*([^)]+?)(?:\s+Build|\))/);
if(m)model=m[1].replace(/;/g,'').trim();
}
const result={
'OS':device,
'Modelo':model||'—',
'UserAgent':ua.slice(0,80)+'…'
};
console.table(result);
pushLog('info','dev.nib.device',device+(model?' ('+model+')':''));
return result;
};

nib.browser=function(){
const ua=navigator.userAgent;
let browser='Desconocido',version='?';
if(/Edg\/([\d.]+)/.test(ua)){browser='Edge';version=ua.match(/Edg\/([\d.]+)/)[1];}
else if(/OPR\/([\d.]+)/.test(ua)){browser='Opera';version=ua.match(/OPR\/([\d.]+)/)[1];}
else if(/Chrome\/([\d.]+)/.test(ua)&&!/Edg|OPR/.test(ua)){browser='Chrome';version=ua.match(/Chrome\/([\d.]+)/)[1];}
else if(/Firefox\/([\d.]+)/.test(ua)){browser='Firefox';version=ua.match(/Firefox\/([\d.]+)/)[1];}
else if(/Safari\/([\d.]+)/.test(ua)&&!/Chrome/.test(ua)){browser='Safari';version=ua.match(/Safari\/([\d.]+)/)[1];}
const result={
'Navegador':browser,
'Versión':version,
'Idioma':navigator.language,
'Online':navigator.onLine?'✅':'❌'
};
console.table(result);
pushLog('info','dev.nib.browser',browser+' '+version);
return result;
};

nib.comp=function(){
const ua=navigator.userAgent;
const isWebView=/; wv\)/.test(ua)||/WebView/.test(ua)||(!!window.Capacitor)||(!!window.cordova)||(!!window.ReactNativeWebView)||(navigator.standalone===true)||(window.matchMedia&&window.matchMedia('(display-mode: standalone)').matches);
const result={
'WebView':isWebView?'✅ Sí':'❌ No (navegador normal)',
'Capacitor':!!window.Capacitor?'✅':'❌',
'Cordova':!!window.cordova?'✅':'❌',
'Standalone PWA':navigator.standalone===true?'✅':'❌',
'Display-mode':window.matchMedia&&window.matchMedia('(display-mode: standalone)').matches?'standalone':'browser'
};
console.table(result);
pushLog('info','dev.nib.comp',isWebView?'WebView':'Navegador normal');
return result;
};


nib.log=function(arg){
if(arg===undefined||arg===null||arg===''){
dumpLogs(50);
return logHistory.slice(-50);
}

if(typeof arg==='string'){
const cmd=arg.toLowerCase().trim();

if(cmd==='clear'){
logHistory=[];
sessionStorage.removeItem(LOG_HISTORY_KEY);
appendLineToConsole('info','Historial de logs limpiado');
ok('Historial de logs limpiado');
return;
}

if(cmd==='export'){
exportLogs();
return;
}

const n=parseInt(cmd,10);
if(!isNaN(n)&&n>0){
const count=Math.min(n,LOG_HISTORY_MAX);
dumpLogs(count);
return logHistory.slice(-count);
}
}

err('Uso: dev.nib.log() | dev.nib.log(50) | dev.nib.log("clear") | dev.nib.log("export")');
};

function dumpLogs(count){

window.__nibblyLogMuted=true;

try{
const logs=logHistory.slice(-count);
if(logs.length===0){
appendLineToConsole('warn','No hay logs registrados');
return;
}


appendLineToConsole('info','═══════════════════════════════════════════════');
appendLineToConsole('info','  NIBBLY LOGCAT — '+logs.length+' eventos');
appendLineToConsole('info','═══════════════════════════════════════════════');


appendLineToConsole('info','📊 Información general');
const generalTable={
'App Version':window.__NIBBLY_APP_VERSION||'?',
'URL':location.href,
'Protocol':location.protocol,
'UserAgent':navigator.userAgent.slice(0,60)+'…',
'Online':navigator.onLine?'✅':'❌',
'Idioma':navigator.language,
'Idioma app':(JSON.parse(localStorage.getItem('nibbly-settings-v2')||'{}').lang)||'en',
'Total logs':logHistory.length,
'Mostrando':logs.length
};
appendTableToConsole(formatTableObject(generalTable));


appendLineToConsole('info','🔧 Estado de la app');
const appStateTable={
'NibblyApp':!!window.NibblyApp,
'NibblyModules':Object.keys(window.NibblyModules||{}).length+' módulos',
'NibblyIcons':!!window.NibblyIcons,
'NibblyEffects':!!window.NibblyEffects,
'NibblyVersionCheck':!!window.NibblyVersionCheck,
'dev':!!window.dev,
'Notification':('Notification'in window)?Notification.permission:'unsupported',
'Clipboard':!!(navigator.clipboard&&window.isSecureContext),
'AudioContext':!!(window.AudioContext||window.webkitAudioContext)
};
appendTableToConsole(formatTableObject(appStateTable));


if(window.__nibblyPracticeDev){
appendLineToConsole('info','⚙️  Estado de dev');
const devStateTable={
'Calculadora en Difícil':window.__nibblyPracticeDev.calcEnabled?'ON ✅':'OFF ❌',
'Cooldown (convertDelay)':(window.__nibblyPracticeDev.convertDelay||0)+'ms'
};
appendTableToConsole(formatTableObject(devStateTable));
}


try{
const s=JSON.parse(localStorage.getItem('nibbly-settings-v2')||'{}');
appendLineToConsole('info','🎨 Settings actuales');
const settingsTable={
'lang':s.lang||'en',
'uiMode':s.uiMode||'auto',
'accent':s.accent||'#5b8cff',
'bg':s.bg||'#0b1020',
'effects':s.effects!==false,
'sounds':s.sounds!==false,
'music':!!s.music,
'pleaseDont':!!s.pleaseDont
};
appendTableToConsole(formatTableObject(settingsTable));
}catch(_){}


appendLineToConsole('info','📋 Eventos recientes (más nuevo al final)');

const eventRows=logs.map((l,i)=>{
const t=new Date(l.t);
const time=t.toLocaleTimeString();
const levelIcon=l.level==='error'?'🔴':
l.level==='warn'?'🟡':
l.level==='info'?'🔵':'⚪';
return{
'#':i+1,
'Time':time,
'Lvl':levelIcon+' '+l.level,
'Source':l.source,
'Message':(l.message||'').slice(0,80)
};
});
appendTableToConsole(formatTableObject(eventRows));


let hasExtras=false;
logs.forEach((l,i)=>{
if(l.extra&&l.extra.length>0){
if(!hasExtras){
appendLineToConsole('info','────────────────────────────');
appendLineToConsole('info','Detalles extra de eventos');
hasExtras=true;
}
const extraText=l.extra.map(e=>{
if(typeof e==='string')return e;
try{return JSON.stringify(e);}catch(_){return String(e);}
}).join(' | ');
appendLineToConsole('log','#'+(i+1)+' · '+l.message+' → '+extraText);
}
});

}finally{
window.__nibblyLogMuted=false;
}
}

async function exportLogs(){
try{
const lines=[];
lines.push('═══════════════════════════════════════════════');
lines.push('  NIBBLY LOGCAT EXPORT');
lines.push('═══════════════════════════════════════════════');
lines.push('');
lines.push('Generated: '+new Date().toISOString());
lines.push('App Version: '+(window.__NIBBLY_APP_VERSION||'?'));
lines.push('URL: '+location.href);
lines.push('Protocol: '+location.protocol);
lines.push('UserAgent: '+navigator.userAgent);
lines.push('Online: '+navigator.onLine);
lines.push('Total events: '+logHistory.length);
lines.push('');
lines.push('── Config ─────────────────────────────────────');
try{
const s=JSON.parse(localStorage.getItem('nibbly-settings-v2')||'{}');
Object.keys(s).forEach(k=>lines.push('  '+k+': '+JSON.stringify(s[k])));
}catch(_){}
lines.push('');
lines.push('── Dev state ─────────────────────────────────');
if(window.__nibblyPracticeDev){
lines.push('  calcEnabled: '+!!window.__nibblyPracticeDev.calcEnabled);
lines.push('  convertDelay: '+(window.__nibblyPracticeDev.convertDelay||0));
}
lines.push('');
lines.push('── Events ─────────────────────────────────────');
logHistory.forEach((l,i)=>{
const t=new Date(l.t).toISOString();
const cleanMsg=String(l.message||'').replace(/%c/g,'').replace(/\s+/g,' ').trim();
lines.push('['+(i+1)+'] '+t+' | '+l.level.toUpperCase().padEnd(5)+' | '+l.source+' | '+cleanMsg);
if(l.extra&&l.extra.length){
l.extra.forEach(e=>{
const cleanExtra=typeof e==='string'?e.replace(/%c/g,'').trim():String(e);
if(cleanExtra)lines.push('    → '+cleanExtra);
});
}
});
lines.push('');
lines.push('═══════════════════════════════════════════════');

const text=lines.join('\n');
const blob=new Blob([text],{type:'text/plain;charset=utf-8'});
const url=URL.createObjectURL(blob);
const a=document.createElement('a');
a.href=url;
a.download='nibbly-logcat-'+Date.now()+'.txt';
document.body.appendChild(a);
a.click();
setTimeout(()=>{URL.revokeObjectURL(url);a.remove();},60000);
ok('Logs exportados como .txt');
}catch(e){
err('Error al exportar: '+(e.message||e));
}
}


window.dev={
__ready:true,
help:printHelp,
nib:nib
};

console.info('%c[Nibbly dev] ✅ Comandos cargados. Escribe dev.help() para ver la lista.','color:#22d3a6;font-weight:800');

})();