(function(){
'use strict';
if(window.NibblyModules&&window.NibblyModules.markdown)return;


function icon(name,size,fallback){
if(window.NibblyIcons){
const html=window.NibblyIcons.get(name,{size:size||18});
if(html)return html;
}
return fallback||'';
}


const I18N={
es:{
'markdown.editor':'Editor',
'markdown.preview':'Vista previa',
'markdown.placeholder':'# Escribe tu README aquí…',
'markdown.loadFile':'Cargar archivo .md',
'markdown.download':'Descargar README.md',
'markdown.copyHtml':'Copiar HTML',
'markdown.fullscreen':'Pantalla completa',
'markdown.exitFullscreen':'Salir de pantalla completa',
'markdown.copied':'✓ HTML copiado',
'markdown.copyFail':'No se pudo copiar',
'markdown.downloadOk':'✓ README.md descargado',
'markdown.loadOk':'✓ Archivo cargado',
'markdown.loadFail':'No se pudo cargar el archivo',
'markdown.undo':'Deshacer (Ctrl+Z)',
'markdown.redo':'Rehacer (Ctrl+Y)',
'markdown.bold':'Negrita',
'markdown.strike':'Tachado',
'markdown.quote':'Cita',
'markdown.code':'Código inline',
'markdown.h1':'Encabezado 1',
'markdown.h2':'Encabezado 2',
'markdown.h3':'Encabezado 3',
'markdown.github':'Conectar GitHub',
'markdown.github.connectedShort':'Conectado',
'markdown.github.title':'Conectar con GitHub',
'markdown.github.desc':'Pega la URL del README en GitHub. Las rutas relativas (como ./assets/logo.png) se resolverán contra raw.githubusercontent.com. Los enlaces blob se convierten automáticamente a raw.',
'markdown.github.urlLbl':'URL del README',
'markdown.github.connect':'Conectar y cargar',
'markdown.github.reload':'Recargar',
'markdown.github.cancel':'Cerrar',
'markdown.github.disconnect':'Desconectar',
'markdown.github.connected':'Conectado: {0}',
'markdown.github.loading':'Conectando…',
'markdown.github.invalidUrl':'URL no válida. Debe ser del tipo https://github.com/usuario/repo/blob/rama/README.md',
'markdown.github.notFound':'README no encontrado',
'markdown.github.error':'Error: {0}',
'markdown.github.disconnected':'✓ Desconectado',
'markdown.github.reloadBtn':'Recargar desde GitHub',
'markdown.github.reloaded':'✓ Recargado',
'markdown.github.reloadFail':'No se pudo recargar',
'markdown.offline':'Sin conexión · GitHub deshabilitado',
'markdown.libraryError':'No se pudo cargar el renderizador. Vista previa deshabilitada.',
'markdown.loading':'Cargando…'
},
en:{
'markdown.editor':'Editor',
'markdown.preview':'Preview',
'markdown.placeholder':'# Write your README here…',
'markdown.loadFile':'Load .md file',
'markdown.download':'Download README.md',
'markdown.copyHtml':'Copy HTML',
'markdown.fullscreen':'Fullscreen',
'markdown.exitFullscreen':'Exit fullscreen',
'markdown.copied':'✓ HTML copied',
'markdown.copyFail':'Could not copy',
'markdown.downloadOk':'✓ README.md downloaded',
'markdown.loadOk':'✓ File loaded',
'markdown.loadFail':'Could not load file',
'markdown.undo':'Undo (Ctrl+Z)',
'markdown.redo':'Redo (Ctrl+Y)',
'markdown.bold':'Bold',
'markdown.strike':'Strikethrough',
'markdown.quote':'Quote',
'markdown.code':'Inline code',
'markdown.h1':'Heading 1',
'markdown.h2':'Heading 2',
'markdown.h3':'Heading 3',
'markdown.github':'Connect GitHub',
'markdown.github.connectedShort':'Connected',
'markdown.github.title':'Connect to GitHub',
'markdown.github.desc':'Paste the README URL from GitHub. Relative paths (like ./assets/logo.png) will resolve against raw.githubusercontent.com. Blob links are converted to raw automatically.',
'markdown.github.urlLbl':'README URL',
'markdown.github.connect':'Connect & load',
'markdown.github.reload':'Reload',
'markdown.github.cancel':'Close',
'markdown.github.disconnect':'Disconnect',
'markdown.github.connected':'Connected: {0}',
'markdown.github.loading':'Connecting…',
'markdown.github.invalidUrl':'Invalid URL. Should be like https://github.com/user/repo/blob/branch/README.md',
'markdown.github.notFound':'README not found',
'markdown.github.error':'Error: {0}',
'markdown.github.disconnected':'✓ Disconnected',
'markdown.github.reloadBtn':'Reload from GitHub',
'markdown.github.reloaded':'✓ Reloaded',
'markdown.github.reloadFail':'Could not reload',
'markdown.offline':'Offline · GitHub disabled',
'markdown.libraryError':'Could not load renderer. Preview disabled.',
'markdown.loading':'Loading…'
}
};
function getLang(){
try{
const s=JSON.parse(localStorage.getItem('nibbly-settings-v2')||'{}');
return s.lang==='en'?'en':'es';
}catch(e){return'es';}
}
function t(key){
const lang=getLang();
let s=(I18N[lang]&&I18N[lang][key])||I18N.es[key]||key;
for(let i=1;i<arguments.length;i++){
s=s.replace('{'+(i-1)+'}',arguments[i]);
}
return s;
}


function el(tag,attrs,children){
const node=document.createElement(tag);
if(attrs)for(const k in attrs){
if(k==='class')node.className=attrs[k];
else if(k==='text')node.textContent=attrs[k];
else if(k==='html')node.innerHTML=attrs[k];
else if(k==='dataset')Object.assign(node.dataset,attrs[k]);
else if(k==='style'&&typeof attrs[k]==='object'){
for(const sk in attrs[k])node.style[sk]=attrs[k][sk];
}else if(k.startsWith('data-')||k.startsWith('aria-')){
node.setAttribute(k,attrs[k]);
}else node[k]=attrs[k];
}
if(children){
if(Array.isArray(children))children.forEach(c=>c&&node.appendChild(c));
else if(typeof children==='string')node.textContent=children;
else node.appendChild(children);
}
return node;
}
function clearNode(n){while(n.firstChild)n.removeChild(n.firstChild);}

function soundAllowed(){
try{
const s=JSON.parse(localStorage.getItem('nibbly-settings-v2')||'{}');
if(!s.sounds)return 0;
const v=Number(s.soundVolume);
return isFinite(v)&&v>0?v/100:0;
}catch(e){return 0;}
}
let _audioCtx=null;
function beep(freq,dur,vol){
const v=soundAllowed();
if(v<=0)return;
try{
if(!_audioCtx){
const AC=window.AudioContext||window.webkitAudioContext;
if(!AC)return;
_audioCtx=new AC();
}
if(_audioCtx.state==='suspended')_audioCtx.resume().catch(()=>{});
const ctx=_audioCtx;
const now=ctx.currentTime;
const osc=ctx.createOscillator();
const gain=ctx.createGain();
osc.type='sine';
osc.frequency.setValueAtTime(freq,now);
gain.gain.setValueAtTime(0.0001,now);
gain.gain.exponentialRampToValueAtTime((vol||0.05)*v,now+0.005);
gain.gain.exponentialRampToValueAtTime(0.0001,now+dur);
osc.connect(gain);gain.connect(ctx.destination);
osc.start(now);osc.stop(now+dur+0.02);
}catch(_){}
}


function loadScriptOnce(src,globalCheck){
return new Promise((resolve)=>{
if(globalCheck&&globalCheck())return resolve(true);
const existing=document.querySelector('script[src="'+src+'"]');
if(existing)existing.remove();
const s=document.createElement('script');
s.src=src;
s.async=true;
s.onload=()=>resolve(globalCheck?globalCheck():true);
s.onerror=()=>resolve(false);
document.head.appendChild(s);
setTimeout(()=>resolve(globalCheck?globalCheck():false),10000);
});
}
function loadCSSOnce(href,media){
return new Promise((resolve)=>{
if(document.querySelector('link[href="'+href+'"]'))return resolve(true);
const l=document.createElement('link');
l.rel='stylesheet';
l.href=href;
if(media)l.media=media;
l.onload=()=>resolve(true);
l.onerror=()=>resolve(false);
document.head.appendChild(l);
setTimeout(()=>resolve(true),10000);
});
}
async function loadLibs(){
const okMarked=await loadScriptOnce('https://cdn.jsdelivr.net/npm/marked/marked.min.js',()=>!!window.marked);
const okHljs=await loadScriptOnce('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js',()=>!!window.hljs);
await Promise.all([
loadCSSOnce('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css','(prefers-color-scheme: light)'),
loadCSSOnce('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css','(prefers-color-scheme: dark)')
]);
return{marked:!!window.marked,hljs:!!window.hljs};
}


const state={
markdown:'',
github:{
connected:false,
owner:null,
repo:null,
branch:null,
readmeDir:'',
readmeFile:'README.md',
repoRootRaw:null
},
libsLoaded:false,
libsOk:{marked:false,hljs:false},
renderer:null,
cacheBust:0,
els:{},
renderTimer:null,
statusTimer:null,
currentCtx:null,
initialized:false,
focusMode:false,
history:[],
historyIndex:-1,
historyMax:100,
historyPushTimer:null,
_focusPlaceholder:null,
_focusParent:null,
_focusNextSibling:null,
sampleIsUntouched:true,
sampleInitial:''
};

const SAMPLE_README_ES=[
'# Mi Proyecto',
'',
'Bienvenido al **Editor Markdown** de Nibbly.',
'',
'## Características',
'',
'- ✅ Editor y vista previa en vivo',
'- 🖼️ Soporte para imágenes',
'- 🎨 Resaltado de sintaxis',
'- ☁️ Conexión con GitHub',
'',
'## Ejemplo de código',
'',
'```js',
"const saludo = 'Hola Nibbly';",
'console.log(saludo);',
'```',
'',
'## Tabla',
'',
'| A | B |',
'|---|---|',
'| 1 | 2 |',
'',
'> **Tip:** Conecta con GitHub para resolver rutas relativas de imágenes.'
].join('\n');

const SAMPLE_README_EN=[
'# My Project',
'',
'Welcome to the **Markdown Editor** from Nibbly.',
'',
'## Features',
'',
'- ✅ Live editor and preview',
'- 🖼️ Image support',
'- 🎨 Syntax highlighting',
'- ☁️ GitHub integration',
'',
'## Code example',
'',
'```js',
"const greeting = 'Hello Nibbly';",
'console.log(greeting);',
'```',
'',
'## Table',
'',
'| A | B |',
'|---|---|',
'| 1 | 2 |',
'',
'> **Tip:** Connect to GitHub to resolve relative image paths.'
].join('\n');

function getSampleReadme(){
return getLang()==='en'?SAMPLE_README_EN:SAMPLE_README_ES;
}


function convertGitHubBlobToRaw(url){
if(!url||typeof url!=='string')return url;
const m=url.match(/^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/(.+)$/i);
if(!m)return url;
const[,owner,repo,branch,rawPath]=m;
let decodedPath;
try{decodedPath=decodeURIComponent(rawPath);}
catch(e){decodedPath=rawPath;}
const encodedPath=decodedPath.split('/').map(encodeURIComponent).join('/');
return'https://raw.githubusercontent.com/'+owner+'/'+repo+'/'+branch+'/'+encodedPath;
}

function parseGitHubUrl(url){
try{
const u=new URL(url.trim());
if(u.hostname!=='github.com')return null;
const parts=u.pathname.split('/').filter(p=>p);
if(parts.length<2)return null;
const owner=parts[0];
const repo=parts[1];
let branch='main';
let branchExplicit=false;
let readmeDir='';
let readmeFile='README.md';
const blobIdx=parts.indexOf('blob');
if(blobIdx!==-1&&parts.length>blobIdx+1){
branch=parts[blobIdx+1];
branchExplicit=true;
if(parts.length>blobIdx+2){
readmeFile=parts[parts.length-1];
const dirParts=parts.slice(blobIdx+2,parts.length-1);
readmeDir=dirParts.length?dirParts.join('/')+'/':'';
}
}
return{owner,repo,branch,branchExplicit,readmeDir,readmeFile};
}catch(e){return null;}
}

function buildRawReadmeUrl(info){
const encodedPath=(info.readmeDir+info.readmeFile).split('/').map(encodeURIComponent).join('/');
return'https://raw.githubusercontent.com/'+info.owner+'/'+info.repo+'/'+info.branch+'/'+encodedPath;
}

function resolveImageUrl(href){
if(!href)return href;
let resolved=href;

const rawFromBlob=convertGitHubBlobToRaw(href);
if(rawFromBlob!==href){
resolved=rawFromBlob;
}else if(state.github.connected&&!/^(https?:|data:|\/\/|#)/i.test(href)){
let path=href.replace(/^\.\//,'');
if(path.startsWith('/')){
resolved=state.github.repoRootRaw+path.substring(1);
}else{
const fullPath=state.github.readmeDir+path;
const segments=[];
fullPath.split('/').forEach((seg)=>{
if(seg==='..')segments.pop();
else if(seg!=='.'&&seg!=='')segments.push(seg);
});
resolved=state.github.repoRootRaw+segments.join('/');
}
}

if(state.cacheBust>0&&resolved.indexOf('raw.githubusercontent.com')!==-1){
resolved+=(resolved.indexOf('?')===-1?'?':'&')+'_cb='+state.cacheBust;
}
return resolved;
}


function historyReset(initialValue){
state.history=[initialValue||''];
state.historyIndex=0;
updateUndoRedoButtons();
}

function historyPush(value){
if(!state.history.length){
state.history=[value];
state.historyIndex=0;
updateUndoRedoButtons();
return;
}
if(state.history[state.historyIndex]===value)return;

if(state.historyIndex<state.history.length-1){
state.history=state.history.slice(0,state.historyIndex+1);
}
state.history.push(value);

if(state.history.length>state.historyMax){
state.history.shift();
}else{
state.historyIndex++;
}
updateUndoRedoButtons();
}

function historyPushDebounced(value){
clearTimeout(state.historyPushTimer);
state.historyPushTimer=setTimeout(()=>historyPush(value),350);
}

function historyUndo(){
if(state.historyIndex<=0)return;
state.historyIndex--;
applyHistoryValue(state.history[state.historyIndex]);
}

function historyRedo(){
if(state.historyIndex>=state.history.length-1)return;
state.historyIndex++;
applyHistoryValue(state.history[state.historyIndex]);
}

function applyHistoryValue(value){
state.markdown=value;
if(state.els.textarea)state.els.textarea.value=value;
renderMarkdown();
updateUndoRedoButtons();
beep(600,0.04,0.03);
}

function updateUndoRedoButtons(){
const undoBtn=state.els.btnUndo;
const redoBtn=state.els.btnRedo;
if(undoBtn)undoBtn.disabled=state.historyIndex<=0;
if(redoBtn)redoBtn.disabled=state.historyIndex>=state.history.length-1;
}


function wrapSelection(before,after){
const ta=state.els.textarea;
if(!ta)return;
const start=ta.selectionStart;
const end=ta.selectionEnd;
const value=ta.value;
const selected=value.slice(start,end);
const newValue=value.slice(0,start)+before+selected+after+value.slice(end);
ta.value=newValue;
ta.selectionStart=start+before.length;
ta.selectionEnd=start+before.length+selected.length;
ta.focus();
handleTextareaInput(true);
}

function applyHeading(level){
const ta=state.els.textarea;
if(!ta)return;
const prefix='#'.repeat(level)+' ';
const start=ta.selectionStart;
const value=ta.value;
let lineStart=value.lastIndexOf('\n',start-1)+1;
let lineEnd=value.indexOf('\n',start);
if(lineEnd===-1)lineEnd=value.length;
let line=value.slice(lineStart,lineEnd);
line=line.replace(/^#{1,6}\s+/,'');
const newLine=prefix+line;
const newValue=value.slice(0,lineStart)+newLine+value.slice(lineEnd);
ta.value=newValue;
const newCursor=lineStart+newLine.length;
ta.selectionStart=ta.selectionEnd=newCursor;
ta.focus();
handleTextareaInput(true);
}

function handleTextareaInput(fromFormatting){
const ta=state.els.textarea;
if(!ta)return;
state.markdown=ta.value;
scheduleRender();
if(fromFormatting){
historyPush(state.markdown);
}else{
historyPushDebounced(state.markdown);
}
}


function makeRenderer(){
if(!window.marked||!window.marked.Renderer)return null;
const renderer=new window.marked.Renderer();
const originalImage=renderer.image.bind(renderer);
renderer.image=function(href,title,text){
return originalImage(resolveImageUrl(href),title,text);
};
return renderer;
}

function renderMarkdown(){
const preview=state.els.previewBody;
if(!preview)return;

if(!state.libsOk.marked){
preview.innerHTML='<div class="nib-md-error">'+t('markdown.libraryError')+'</div>';
return;
}

try{
let html;
if(state.renderer){
html=window.marked.parse(state.markdown,{
gfm:true,
breaks:true,
renderer:state.renderer
});
}else{
html=window.marked.parse(state.markdown);
}
preview.innerHTML=html;

if(state.libsOk.hljs&&window.hljs){
preview.querySelectorAll('pre code').forEach((block)=>{
if(!block.classList.contains('hljs')){
try{window.hljs.highlightElement(block);}catch(e){}
}
});
}

preview.querySelectorAll('img').forEach((img)=>{
img.setAttribute('loading','lazy');
img.addEventListener('error',()=>{
img.setAttribute('data-broken','true');
img.setAttribute('title','No se pudo cargar: '+(img.alt||img.src));
},{once:true});
});

preview.querySelectorAll('a').forEach((a)=>{
a.setAttribute('target','_blank');
a.setAttribute('rel','noopener noreferrer');
});
}catch(e){
preview.innerHTML='<div class="nib-md-error">Error: '+(e.message||String(e))+'</div>';
}
}

function scheduleRender(){
clearTimeout(state.renderTimer);
state.renderTimer=setTimeout(renderMarkdown,90);
}


function setStatus(msg,kind){
const status=state.els.status;
if(!status)return;
status.textContent=msg;
status.dataset.kind=kind||'info';
status.style.display='block';
clearTimeout(state.statusTimer);
state.statusTimer=setTimeout(()=>{status.style.display='none';},3000);
}


function btnEditor(){
return el('button',{
class:'nib-md-btn',
type:'button',
title:t('markdown.editor'),
html:icon('text',20,'📝')
});
}


function btnPreview(){
return el('button',{
class:'nib-md-btn',
type:'button',
title:t('markdown.preview'),
html:icon('eye',20,'👁')
});
}


function btnLoad(){
return el('button',{
class:'nib-md-btn',
type:'button',
title:t('markdown.loadFile'),
html:icon('download',20,'📂')
});
}


function btnDownload(){
return el('button',{
class:'nib-md-btn',
type:'button',
title:t('markdown.download'),
html:icon('save',20,'💾')
});
}


function btnCopy(){
return el('button',{
class:'nib-md-btn',
type:'button',
title:t('markdown.copyHtml'),
html:icon('copy',20,'📋')
});
}


function btnFullscreen(){
return el('button',{
class:'nib-md-btn nib-md-btn-fullscreen',
type:'button',
title:t('markdown.fullscreen'),
html:icon('fullscreen',20,'⛶')
});
}


function btnGitHub(){
return el('button',{
class:'nib-md-btn nib-md-btn-github',
type:'button',
title:t('markdown.github'),
html:'<svg viewBox="0 0 16 16" width="20" height="20" aria-hidden="true" fill="currentColor">'+
'<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>'+
'</svg>'
});
}


function fmtBtn(label,cls,title,onClick){
const b=el('button',{
class:'nib-md-fmt-btn'+(cls?' '+cls:''),
type:'button',
title:title,
text:label
});
if(onClick)b.addEventListener('click',onClick);
return b;
}

function fmtSep(){
return el('span',{class:'nib-md-fmt-sep'});
}


async function fetchReadmeFromGitHub(info){
const rawUrl=buildRawReadmeUrl(info);
const res=await fetch(rawUrl,{cache:'no-store'});
if(!res.ok){
if(res.status===404)throw new Error(t('markdown.github.notFound'));
throw new Error(t('markdown.github.error',res.status));
}
return await res.text();
}

function openGitHubDialog(onConnect){
const overlay=el('div',{class:'nib-md-dialog-overlay'});
const dialog=el('div',{class:'nib-md-dialog'});

dialog.appendChild(el('h2',{class:'nib-md-dialog-title',text:t('markdown.github.title')}));
dialog.appendChild(el('p',{class:'nib-md-dialog-desc',text:t('markdown.github.desc')}));

const urlLabel=el('label',{class:'nib-md-dialog-label',text:t('markdown.github.urlLbl')});
dialog.appendChild(urlLabel);

const urlInput=el('input',{
class:'nib-md-dialog-input',
type:'text',
placeholder:'https://github.com/user/repo/blob/main/README.md',
autocomplete:'off',
spellcheck:'false'
});
if(state.github.connected){
const rawBase='https://github.com/'+state.github.owner+'/'+state.github.repo+'/blob/'+state.github.branch+'/'+(state.github.readmeDir+state.github.readmeFile);
urlInput.value=rawBase;
}
dialog.appendChild(urlInput);

const statusEl=el('div',{class:'nib-md-dialog-status'});
statusEl.style.display='none';
dialog.appendChild(statusEl);

const actions=el('div',{class:'nib-md-dialog-actions'});

let disconnectBtn=null;
if(state.github.connected){
disconnectBtn=el('button',{
class:'nib-md-dialog-btn',
type:'button',
text:t('markdown.github.disconnect')
});
actions.appendChild(disconnectBtn);
}

const cancelBtn=el('button',{
class:'nib-md-dialog-btn nib-md-dialog-btn-cancel',
type:'button',
text:t('markdown.github.cancel')
});
actions.appendChild(cancelBtn);

const connectBtn=el('button',{
class:'nib-md-dialog-btn nib-md-dialog-btn-connect',
type:'button',
text:state.github.connected?t('markdown.github.reload'):t('markdown.github.connect')
});
actions.appendChild(connectBtn);

dialog.appendChild(actions);
overlay.appendChild(dialog);
document.body.appendChild(overlay);

const close=()=>{try{overlay.remove();}catch(_){}};

overlay.addEventListener('click',e=>{
if(e.target===overlay)close();
});

cancelBtn.addEventListener('click',close);

function showStatus(msg,kind){
statusEl.textContent=msg;
statusEl.dataset.kind=kind||'info';
statusEl.style.display='block';
}

async function doConnect(){
const url=urlInput.value.trim();
if(!url){
showStatus(t('markdown.github.invalidUrl'),'error');
return;
}
const info=parseGitHubUrl(url);
if(!info){
showStatus(t('markdown.github.invalidUrl'),'error');
return;
}
connectBtn.disabled=true;
connectBtn.textContent=t('markdown.github.loading');
showStatus(t('markdown.github.loading'),'info');
try{
const text=await fetchReadmeFromGitHub(info);
state.github.connected=true;
state.github.owner=info.owner;
state.github.repo=info.repo;
state.github.branch=info.branch;
state.github.readmeDir=info.readmeDir;
state.github.readmeFile=info.readmeFile;
state.github.repoRootRaw='https://raw.githubusercontent.com/'+info.owner+'/'+info.repo+'/'+info.branch+'/';
state.cacheBust=Date.now();
if(state.els.textarea){
state.els.textarea.value=text;
state.sampleIsUntouched=false;
handleTextareaInput(true);
}
showStatus(t('markdown.github.connected',info.owner+'/'+info.repo),'success');
beep(880,0.06,0.05);
close();
if(typeof onConnect==='function')onConnect(info);
}catch(err){
const msg=(err&&err.message)?err.message:t('markdown.github.error','?');
showStatus(msg,'error');
connectBtn.disabled=false;
connectBtn.textContent=t('markdown.github.connect');
beep(300,0.1,0.05);
}
}

connectBtn.addEventListener('click',doConnect);

urlInput.addEventListener('keydown',e=>{
if(e.key==='Enter'){e.preventDefault();doConnect();}
});

if(disconnectBtn){
disconnectBtn.addEventListener('click',()=>{
state.github.connected=false;
state.github.owner=null;
state.github.repo=null;
state.github.branch=null;
state.github.readmeDir='';
state.github.readmeFile='README.md';
state.github.repoRootRaw=null;
state.cacheBust=0;
close();
setStatus(t('markdown.github.disconnected'),'success');
beep(600,0.06,0.05);
});
}

setTimeout(()=>{try{urlInput.focus();}catch(_){}},50);
}


function init(container,ctx){
if(!container)return;
state.initialized=true;
state.currentCtx=ctx;
clearNode(container);

const root=el('section',{class:'nib-markdown'});


const toolbar=el('div',{class:'nib-md-toolbar'},[
btnLoad(),
btnDownload(),
btnCopy(),
btnFullscreen(),
btnGitHub()
]);
root.appendChild(toolbar);


const btnUndo=fmtBtn('↶','',t('markdown.undo'),()=>historyUndo());
const btnRedo=fmtBtn('↷','',t('markdown.redo'),()=>historyRedo());
state.els.btnUndo=btnUndo;
state.els.btnRedo=btnRedo;

const formatbar=el('div',{class:'nib-md-formatbar'},[
btnUndo,
btnRedo,
fmtSep(),
fmtBtn('B','nib-md-fmt-bold',t('markdown.bold'),()=>wrapSelection('**','**')),
fmtBtn('S','nib-md-fmt-strike',t('markdown.strike'),()=>wrapSelection('~~','~~')),
fmtBtn('>','',t('markdown.quote'),()=>{
const ta=state.els.textarea;
if(!ta)return;
const start=ta.selectionStart;
const value=ta.value;
let lineStart=value.lastIndexOf('\n',start-1)+1;
const newValue=value.slice(0,lineStart)+'> '+value.slice(lineStart);
ta.value=newValue;
ta.selectionStart=ta.selectionEnd=start+2;
ta.focus();
handleTextareaInput(true);
}),
fmtBtn('`','nib-md-fmt-code',t('markdown.code'),()=>wrapSelection('`','`')),
fmtSep(),
fmtBtn('H1','nib-md-fmt-h',t('markdown.h1'),()=>applyHeading(1)),
fmtBtn('H2','nib-md-fmt-h',t('markdown.h2'),()=>applyHeading(2)),
fmtBtn('H3','nib-md-fmt-h',t('markdown.h3'),()=>applyHeading(3))
]);
root.appendChild(formatbar);


const tabEditor=el('button',{class:'nib-md-tab active',type:'button',text:t('markdown.editor')});
const tabPreview=el('button',{class:'nib-md-tab',type:'button',text:t('markdown.preview')});
const tabsEl=el('div',{class:'nib-md-tabs'},[tabEditor,tabPreview]);
root.appendChild(tabsEl);


const textarea=el('textarea',{
class:'nib-md-textarea',
spellcheck:'false',
placeholder:t('markdown.placeholder')
});
state.els.textarea=textarea;

const previewBody=el('div',{class:'nib-md-preview-body markdown-body'});
state.els.previewBody=previewBody;

const editorPane=el('div',{class:'nib-md-pane nib-md-editor-pane'},[textarea]);
const previewPane=el('div',{class:'nib-md-pane nib-md-preview-pane'},[previewBody]);

const split=el('div',{class:'nib-md-split',dataset:{tab:'editor'}},[
editorPane,
previewPane
]);
state.els.split=split;
root.appendChild(split);


const status=el('div',{class:'nib-md-status'});
status.style.display='none';
state.els.status=status;
root.appendChild(status);

container.appendChild(root);


tabEditor.addEventListener('click',()=>{
tabEditor.classList.add('active');
tabPreview.classList.remove('active');
split.dataset.tab='editor';
});
tabPreview.addEventListener('click',()=>{
tabPreview.classList.add('active');
tabEditor.classList.remove('active');
split.dataset.tab='preview';
});

textarea.addEventListener('input',()=>{
state.sampleIsUntouched=false;
handleTextareaInput(false);
});


toolbar.children[1].addEventListener('click',()=>{
const blob=new Blob([state.markdown],{type:'text/markdown;charset=utf-8'});
const url=URL.createObjectURL(blob);
const a=document.createElement('a');
a.href=url;
a.download='README.md';
document.body.appendChild(a);a.click();
setTimeout(()=>{URL.revokeObjectURL(url);a.remove();},60000);
setStatus(t('markdown.downloadOk'),'success');
});


toolbar.children[2].addEventListener('click',async()=>{
try{
if(navigator.clipboard&&window.isSecureContext){
await navigator.clipboard.writeText(previewBody.innerHTML);
}else{
const ta=document.createElement('textarea');
ta.value=previewBody.innerHTML;
ta.style.position='fixed';ta.style.top='-9999px';
document.body.appendChild(ta);
ta.select();
document.execCommand('copy');
ta.remove();
}
setStatus(t('markdown.copied'),'success');
beep(880,0.06,0.05);
}catch(e){
setStatus(t('markdown.copyFail'),'error');
beep(300,0.1,0.05);
}
});


toolbar.children[3].addEventListener('click',()=>toggleFocusMode());


toolbar.children[4].addEventListener('click',()=>openGitHubDialog());


const fileInput=document.createElement('input');
fileInput.type='file';
fileInput.accept='.md,.markdown,.txt,text/markdown,text/plain';
fileInput.style.display='none';
document.body.appendChild(fileInput);
toolbar.children[0].addEventListener('click',()=>fileInput.click());
fileInput.addEventListener('change',()=>{
const f=fileInput.files&&fileInput.files[0];
if(!f)return;
const reader=new FileReader();
reader.onload=()=>{
textarea.value=reader.result||'';
state.sampleIsUntouched=false;
handleTextareaInput(true);
setStatus(t('markdown.loadOk'),'success');
};
reader.onerror=()=>setStatus(t('markdown.loadFail'),'error');
reader.readAsText(f);
fileInput.value='';
});


const sampleReadme=getSampleReadme();
textarea.value=sampleReadme;
state.markdown=sampleReadme;
state.sampleInitial=sampleReadme;
state.sampleIsUntouched=true;
historyReset(sampleReadme);


loadLibs().then((ok)=>{
state.libsOk=ok;
state.renderer=makeRenderer();
renderMarkdown();
});


textarea.addEventListener('keydown',(e)=>{
const mod=e.ctrlKey||e.metaKey;
if(!mod)return;
if(e.key==='z'&&!e.shiftKey){e.preventDefault();historyUndo();}
else if((e.key==='y')||(e.key==='z'&&e.shiftKey)){e.preventDefault();historyRedo();}
else if(e.key==='b'){e.preventDefault();wrapSelection('**','**');}
else if(e.key==='i'){e.preventDefault();wrapSelection('_','_');}
});

return{
refresh(){
if(state.sampleIsUntouched&&state.els.textarea){
const newSample=getSampleReadme();
if(newSample!==state.sampleInitial){
state.els.textarea.value=newSample;
state.markdown=newSample;
state.sampleInitial=newSample;
historyReset(newSample);
}
}
renderMarkdown();
},
destroy(){
try{fileInput.remove();}catch(_){}
root.remove();
}
};
}

function toggleFocusMode(){
const root=document.querySelector('.nib-markdown.nib-md-focus-mode')
||document.querySelector('.nib-markdown');
if(!root)return;
state.focusMode=!state.focusMode;

if(state.focusMode){
const rect=root.getBoundingClientRect();
root.style.setProperty('--nib-focus-w',rect.width+'px');
root.style.setProperty('--nib-focus-h',rect.height+'px');

document.documentElement.classList.add('nib-md-focus-lock');
document.body.classList.add('nib-md-focus-lock');
root.classList.add('nib-md-focus-mode');

void root.offsetHeight;

requestAnimationFrame(()=>{
requestAnimationFrame(()=>{
root.style.removeProperty('--nib-focus-w');
root.style.removeProperty('--nib-focus-h');
});
});

if(state.els.textarea){
setTimeout(()=>{
try{state.els.textarea.focus({preventScroll:true});}catch(_){}
},50);
}
}else{
document.documentElement.classList.remove('nib-md-focus-lock');
document.body.classList.remove('nib-md-focus-lock');
root.classList.remove('nib-md-focus-mode');

void root.offsetHeight;
}
}


window.NibblyModules=window.NibblyModules||{};
window.NibblyModules.markdown={
id:'markdown',
version:'1.3.4',
init:init
};
window.NibblyMarkdown=window.NibblyModules.markdown;

if(console&&console.debug){
console.debug('[Nibbly] markdown.js loaded → window.NibblyModules.markdown (v1.3.4)');
}
})();