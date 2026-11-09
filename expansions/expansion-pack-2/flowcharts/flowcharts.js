(function(){
'use strict';
if(window.NibblyFlowcharts)return;

const I18N={
es:{
title:'Diagramas de flujo',
hint:'Inicia centrado. Usa Zoom (+ / -) o Ctrl + Rueda. Arrastra nodos fluidamente.',
addStart:'+ Inicio',
addEnd:'+ Fin',
addProcess:'+ Proceso',
addDecision:'+ Decisión',
addIO:'+ E/S',
modeMove:'Mover',
modeConnect:'Conectar',
modeDelete:'Borrar',
modeEdit:'Editar',
clear:'Limpiar todo',
exportSvg:'SVG',
exportPng:'PNG',
empty:'Añade un nodo con los botones de arriba para empezar.',
editHint:'Pulsa un nodo para editar su contenido.',
connectHint:'Pulsa el nodo origen y luego el destino.',
deleteHint:'Pulsa un nodo para borrarlo.',
nodeStart:'Inicio | Comenzar',
nodeEnd:'Fin | Salida',
nodeProcess:'Proceso | Configurar Variable | Activo',
nodeDecision:'¿Condición? | Revisar',
nodeIO:'E/S | Leer datos',
stats:'{0} nodos · {1} conexiones',


editTitle:'Editar nodo',
editSubtitle:'Contenido del nodo',
editTitleLbl:'Título',
editTitlePh:'Ej: Proceso principal',
editSub1Lbl:'Subtítulo 1 (opcional)',
editSub1Ph:'Ej: Configurar Variable',
editSub2Lbl:'Subtítulo 2 (opcional)',
editSub2Ph:'Ej: Activo',
editSub3Lbl:'Subtítulo 3 (opcional)',
editSub3Ph:'Ej: …',
editCancel:'Cancelar',
editSave:'Guardar',
editEmpty:'El título no puede estar vacío.',


clearTitle:'¿Borrar todo el diagrama?',
clearDesc:'Se eliminarán todos los nodos y conexiones. Esta acción no se puede deshacer.',
clearCancel:'Cancelar',
clearConfirm:'Borrar todo',


savedOk:'✓ Diagrama guardado',
loadOk:'✓ Diagrama cargado',
loadErr:'✗ Archivo .nib inválido',
confirmLoad:'¿Reemplazar el diagrama actual?',
confirmLoadDesc:'Se perderán todos los nodos y conexiones actuales. Esta acción no se puede deshacer.',
confirmYes:'Sí, cargar',
confirmNo:'Cancelar',
nibEmpty:'No hay nada que guardar todavía.',
nibSaveErr:'No se pudo guardar el archivo.',
nibVersion:'Versión',
nibFormatErr:'El archivo no tiene el formato .nib de Nibbly.'
},
en:{
title:'Flowcharts',
hint:'Starts centered. Use Zoom (+ / -) or Ctrl + Scroll. Drag nodes smoothly.',
addStart:'+ Start',
addEnd:'+ End',
addProcess:'+ Process',
addDecision:'+ Decision',
addIO:'+ I/O',
modeMove:'Move',
modeConnect:'Connect',
modeDelete:'Delete',
modeEdit:'Edit',
clear:'Clear all',
exportSvg:'SVG',
exportPng:'PNG',
empty:'Add a node with the buttons above to start.',
editHint:'Tap a node to edit its content.',
connectHint:'Tap source node, then target node.',
deleteHint:'Tap a node to delete it.',
nodeStart:'Start | Begin',
nodeEnd:'End | Finish',
nodeProcess:'Process | Config Variable | Active',
nodeDecision:'Condition? | Check',
nodeIO:'I/O | Read data',
stats:'{0} nodes · {1} connections',

editTitle:'Edit node',
editSubtitle:'Node content',
editTitleLbl:'Title',
editTitlePh:'e.g. Main process',
editSub1Lbl:'Subtitle 1 (optional)',
editSub1Ph:'e.g. Configure variable',
editSub2Lbl:'Subtitle 2 (optional)',
editSub2Ph:'e.g. Active',
editSub3Lbl:'Subtitle 3 (optional)',
editSub3Ph:'e.g. …',
editCancel:'Cancel',
editSave:'Save',
editEmpty:'Title cannot be empty.',

clearTitle:'Clear the whole diagram?',
clearDesc:'All nodes and connections will be removed. This cannot be undone.',
clearCancel:'Cancel',
clearConfirm:'Delete all',

savedOk:'✓ Diagram saved',
loadOk:'✓ Diagram loaded',
loadErr:'✗ Invalid .nib file',
confirmLoad:'Replace current diagram?',
confirmLoadDesc:'Current nodes and connections will be lost. This cannot be undone.',
confirmYes:'Yes, load',
confirmNo:'Cancel',
nibEmpty:'Nothing to save yet.',
nibSaveErr:'Could not save the file.',
nibVersion:'Version',
nibFormatErr:'The file does not have Nibbly\'s .nib format.'
}
};

function getLang(){
try{
const s=JSON.parse(localStorage.getItem('nibbly-settings-v2')||'{}');
return s.lang||'es';
}catch(e){return'es';}
}
function t(k){
const lang=getLang();
const dict=I18N[lang]||I18N.es;
let s=dict[k]||I18N.es[k]||k;
for(let i=1;i<arguments.length;i++)s=s.replace('{'+(i-1)+'}',arguments[i]);
return s;
}

function esc(s){
return String(s).replace(/[&<>"']/g,c=>({
'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
}[c]));
}

function showToast(msg,isErr){
if(window.__nibblyToast){
try{window.__nibblyToast(msg,isErr);return;}catch(e){}
}
let el=document.getElementById('nibblyFlowToast');
if(!el){
el=document.createElement('div');
el.id='nibblyFlowToast';
el.style.cssText='position:fixed;left:50%;bottom:calc(28px + env(safe-area-inset-bottom));transform:translate(-50%,20px);padding:12px 22px;border-radius:999px;font-weight:800;font-size:13px;opacity:0;pointer-events:none;transition:opacity .25s,transform .25s;z-index:400;box-shadow:0 8px 24px rgba(0,0,0,.35);max-width:90vw;text-align:center;font-family:inherit;';
document.body.appendChild(el);
}
el.textContent=msg;
el.style.background=isErr?'var(--bad,#ff6b7a)':'var(--good,#22d3a6)';
el.style.color=isErr?'#fff':'#04231a';
el.style.opacity='1';
el.style.transform='translate(-50%,0)';
clearTimeout(el._hideTimer);
el._hideTimer=setTimeout(()=>{
el.style.opacity='0';
el.style.transform='translate(-50%,20px)';
},2000);
}

const ICONS={
svg:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
png:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`,
save:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>`,
load:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><polyline points="9 14 12 17 15 14"></polyline></svg>`
};

const state={
nodes:[],
edges:[],
mode:'move',
pendingSource:null,
nextId:1,
drag:null,
resize:null,
canvasW:1600,
canvasH:1100,
zoom:1
};

const ZOOM_LEVELS=[0.1,0.125,0.15,0.175,0.2,0.225,0.25,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0,1.25,1.5,1.75,2.0,2.25,2.5];

const DEFAULT_W=170;
const DEFAULT_H=80;
const MIN_W=120;
const MIN_H=60;
const GRID=16;
const CANVAS_MARGIN=48;

function snap(v){return Math.round(v/GRID)*GRID;}

function nodeById(id){return state.nodes.find(n=>n.id===id);}

function nodeCenter(n){
const w=n.w||DEFAULT_W;
const h=n.h||DEFAULT_H;
return{x:n.x+w/2,y:n.y+h/2};
}

function defaultText(type){
switch(type){
case'start':return t('nodeStart');
case'end':return t('nodeEnd');
case'decision':return t('nodeDecision');
case'io':return t('nodeIO');
default:return t('nodeProcess');
}
}

function createNode(type,x,y){
const n={
id:state.nextId++,
type,
x:snap(x),
y:snap(y),
w:DEFAULT_W,
h:DEFAULT_H,
text:defaultText(type)
};
state.nodes.push(n);
return n;
}

let container=null;
let rafId=null;
let globalListenersBound=false;
let firstRenderDone=false;

function scheduleRender(){
if(rafId)return;
rafId=requestAnimationFrame(()=>{
rafId=null;
drawEdges();
});
}


function renderAll(preserveScroll){
if(!container)return;

const wrap=container.querySelector('#fCanvasWrap');
let savedScrollLeft=0,savedScrollTop=0;
if(preserveScroll&&wrap){
savedScrollLeft=wrap.scrollLeft;
savedScrollTop=wrap.scrollTop;
}

container.innerHTML='';
const root=document.createElement('div');
root.className='nibbly-flowcharts';
root.appendChild(buildToolbar());
root.appendChild(buildCanvas());
root.appendChild(buildHint());
container.appendChild(root);
attachEvents();

if(preserveScroll&&wrap){
const newWrap=container.querySelector('#fCanvasWrap');
if(newWrap){
newWrap.scrollLeft=savedScrollLeft;
newWrap.scrollTop=savedScrollTop;
}
}else{
centerScrollToMiddle();
}
drawEdges();
}

function centerScrollToMiddle(){
const wrap=container.querySelector('#fCanvasWrap');
const canvas=container.querySelector('#fCanvas');
if(!wrap||!canvas)return;

requestAnimationFrame(()=>{
requestAnimationFrame(()=>{
const scaledW=canvas.offsetWidth*state.zoom;
const scaledH=canvas.offsetHeight*state.zoom;
wrap.scrollLeft=Math.max(0,(scaledW-wrap.clientWidth)/2);
wrap.scrollTop=Math.max(0,(scaledH-wrap.clientHeight)/2);
});
});
}

function buildToolbar(){
const bar=document.createElement('div');
bar.className='f-toolbar';

const addBtns=[
['start',t('addStart')],
['end',t('addEnd')],
['process',t('addProcess')],
['decision',t('addDecision')],
['io',t('addIO')]
];
addBtns.forEach(([type,label])=>{
const b=document.createElement('button');
b.type='button';
b.className='f-btn f-add-btn';
b.dataset.add=type;
b.textContent=label;
bar.appendChild(b);
});

const sep=document.createElement('div');
sep.className='f-sep';
bar.appendChild(sep);

const modes=[
['move',t('modeMove')],
['connect',t('modeConnect')],
['delete',t('modeDelete')],
['edit',t('modeEdit')]
];
const modeWrap=document.createElement('div');
modeWrap.className='f-seg f-mode-seg';
modes.forEach(([m,label])=>{
const b=document.createElement('button');
b.type='button';
b.className='f-seg-btn'+(state.mode===m?' active':'');
b.dataset.mode=m;
b.textContent=label;
modeWrap.appendChild(b);
});
bar.appendChild(modeWrap);

const sep2=document.createElement('div');
sep2.className='f-sep';
bar.appendChild(sep2);

const sizeWrap=document.createElement('div');
sizeWrap.className='f-canvas-size-controls';
sizeWrap.innerHTML=`
<span>W:</span>
<input type="number" id="fCanvasWInput" value="${state.canvasW}" min="800" max="5000" step="100" style="width:55px;background:var(--surface-2,#1a2138);border:1px solid var(--outline,rgba(255,255,255,.15));color:var(--on-surface,#f0f2f8);border-radius:6px;padding:3px 5px;font-size:11px;font-family:inherit;">
<span>H:</span>
<input type="number" id="fCanvasHInput" value="${state.canvasH}" min="600" max="5000" step="100" style="width:55px;background:var(--surface-2,#1a2138);border:1px solid var(--outline,rgba(255,255,255,.15));color:var(--on-surface,#f0f2f8);border-radius:6px;padding:3px 5px;font-size:11px;font-family:inherit;">
<button type="button" class="f-btn f-zoom-btn" id="fZoomOut" title="Zoom Out">-</button>
<span id="fZoomLbl" style="min-width:32px;text-align:center;">${Math.round(state.zoom*100)}%</span>
<button type="button" class="f-btn f-zoom-btn" id="fZoomIn" title="Zoom In">+</button>
`;
bar.appendChild(sizeWrap);


const saveNib=document.createElement('button');
saveNib.type='button';
saveNib.className='f-btn f-icon-btn';
saveNib.id='fSaveNib';
saveNib.innerHTML=ICONS.save;
saveNib.title='Save .nib';
saveNib.setAttribute('aria-label','Save .nib');
bar.appendChild(saveNib);

const loadNib=document.createElement('button');
loadNib.type='button';
loadNib.className='f-btn f-icon-btn';
loadNib.id='fLoadNib';
loadNib.innerHTML=ICONS.load;
loadNib.title='Load .nib';
loadNib.setAttribute('aria-label','Load .nib');
bar.appendChild(loadNib);

const nibFileInput=document.createElement('input');
nibFileInput.type='file';
nibFileInput.accept='.nib,application/json,application/octet-stream';
nibFileInput.id='fNibFileInput';
nibFileInput.style.display='none';
bar.appendChild(nibFileInput);

const clear=document.createElement('button');
clear.type='button';
clear.className='f-btn f-clear-btn';
clear.id='fClearAll';
clear.textContent=t('clear');
bar.appendChild(clear);

const svg=document.createElement('button');
svg.type='button';
svg.className='f-btn';
svg.id='fExportSvg';
svg.innerHTML=ICONS.svg+' '+t('exportSvg');
bar.appendChild(svg);

const png=document.createElement('button');
png.type='button';
png.className='f-btn';
png.id='fExportPng';
png.innerHTML=ICONS.png+' '+t('exportPng');
bar.appendChild(png);

return bar;
}

function buildCanvas(){
const wrap=document.createElement('div');
wrap.className='f-canvas-wrap';
wrap.id='fCanvasWrap';

const canvas=document.createElement('div');
canvas.className='f-canvas';
canvas.id='fCanvas';
canvas.style.width=state.canvasW+'px';
canvas.style.height=state.canvasH+'px';
canvas.style.transform=`scale(${state.zoom})`;
canvas.innerHTML='<svg class="f-edges" id="fEdges"></svg>';

if(!state.nodes.length){
const empty=document.createElement('div');
empty.className='f-empty';
empty.textContent=t('empty');
canvas.appendChild(empty);
}

state.nodes.forEach(n=>canvas.appendChild(buildNodeEl(n)));

wrap.appendChild(canvas);
return wrap;
}

function buildNodeEl(n){
const el=document.createElement('div');
el.className='f-node f-node-'+n.type;
el.dataset.id=String(n.id);
const w=n.w||DEFAULT_W;
const h=n.h||DEFAULT_H;
el.style.left=n.x+'px';
el.style.top=n.y+'px';
el.style.width=w+'px';
el.style.height=h+'px';

const shape=document.createElement('div');
shape.className='f-node-shape f-shape-'+n.type;
el.appendChild(shape);

const content=document.createElement('div');
content.className='f-node-content';

const parts=n.text.split('|').map(p=>p.trim());
const titleText=parts[0]||'';
const subtitles=parts.slice(1,4);

const titleEl=document.createElement('div');
titleEl.className='f-node-title';
titleEl.textContent=titleText;
content.appendChild(titleEl);

subtitles.forEach(sub=>{
if(sub){
const subEl=document.createElement('div');
subEl.className='f-node-subtitle';
subEl.textContent=sub;
content.appendChild(subEl);
}
});

el.appendChild(content);

const del=document.createElement('button');
del.type='button';
del.className='f-node-del';
del.dataset.del=String(n.id);
del.textContent='×';
del.title='Delete';
el.appendChild(del);

const resizer=document.createElement('div');
resizer.className='f-node-resize';
resizer.dataset.resize=String(n.id);
el.appendChild(resizer);

if(state.mode==='connect'&&state.pendingSource===n.id){
el.classList.add('f-node-pending');
}

return el;
}

function buildHint(){
const h=document.createElement('div');
h.className='f-hint';
h.id='fFlowHint';
h.textContent=
state.mode==='connect'?t('connectHint'):
state.mode==='delete'?t('deleteHint'):
state.mode==='edit'?t('editHint'):
t('hint');
return h;
}

function attachEvents(){
if(!container)return;
const canvas=container.querySelector('#fCanvas');
const wrap=container.querySelector('#fCanvasWrap');
if(!canvas||!wrap)return;

const wInput=container.querySelector('#fCanvasWInput');
const hInput=container.querySelector('#fCanvasHInput');
const zoomInBtn=container.querySelector('#fZoomIn');
const zoomOutBtn=container.querySelector('#fZoomOut');
const zoomLbl=container.querySelector('#fZoomLbl');

function getClosestZoomIndex(z){
let closest=0;
let minDiff=Infinity;
ZOOM_LEVELS.forEach((lvl,idx)=>{
const diff=Math.abs(lvl-z);
if(diff<minDiff){
minDiff=diff;
closest=idx;
}
});
return closest;
}

function updateZoom(dir){
let idx=getClosestZoomIndex(state.zoom);
idx+=dir;
idx=Math.max(0,Math.min(ZOOM_LEVELS.length-1,idx));
state.zoom=ZOOM_LEVELS[idx];
canvas.style.transform=`scale(${state.zoom})`;
if(zoomLbl)zoomLbl.textContent=Math.round(state.zoom*100)+'%';
resizeEdgesSvg();
}

if(zoomInBtn)zoomInBtn.addEventListener('click',()=>updateZoom(1));
if(zoomOutBtn)zoomOutBtn.addEventListener('click',()=>updateZoom(-1));

wrap.addEventListener('wheel',(ev)=>{
if(ev.ctrlKey){
ev.preventDefault();
if(ev.deltaY<0)updateZoom(1);
else updateZoom(-1);
}
},{passive:false});

if(wInput){
wInput.addEventListener('change',()=>{
const val=parseInt(wInput.value,10);
if(!isNaN(val)&&val>=600){
state.canvasW=val;
canvas.style.width=val+'px';
resizeEdgesSvg();
}
});
wInput.addEventListener('input',()=>{
const val=parseInt(wInput.value,10);
if(!isNaN(val)&&val>=600){
state.canvasW=val;
canvas.style.width=val+'px';
resizeEdgesSvg();
}
});
}

if(hInput){
hInput.addEventListener('change',()=>{
const val=parseInt(hInput.value,10);
if(!isNaN(val)&&val>=400){
state.canvasH=val;
canvas.style.height=val+'px';
resizeEdgesSvg();
}
});
hInput.addEventListener('input',()=>{
const val=parseInt(hInput.value,10);
if(!isNaN(val)&&val>=400){
state.canvasH=val;
canvas.style.height=val+'px';
resizeEdgesSvg();
}
});
}

container.querySelectorAll('[data-add]').forEach(b=>{
b.addEventListener('click',()=>{
const type=b.dataset.add;
const curWrap=container.querySelector('#fCanvasWrap');
if(!curWrap)return;
const scrollLeft=curWrap.scrollLeft;
const scrollTop=curWrap.scrollTop;
const viewW=curWrap.clientWidth;
const viewH=curWrap.clientHeight;
const cx=(scrollLeft+viewW/2)/state.zoom;
const cy=(scrollTop+viewH/2)/state.zoom;
const node=createNode(type,cx-DEFAULT_W/2,cy-DEFAULT_H/2);
renderAll(true);
});
});

container.querySelectorAll('.f-mode-seg [data-mode]').forEach(b=>{
b.addEventListener('click',()=>{
state.mode=b.dataset.mode;
state.pendingSource=null;
container.querySelectorAll('.f-mode-seg [data-mode]').forEach(x=>{
x.classList.toggle('active',x===b);
});
container.querySelectorAll('.f-node').forEach(n=>n.classList.remove('f-node-pending'));
const hint=container.querySelector('#fFlowHint');
if(hint)hint.textContent=
state.mode==='connect'?t('connectHint'):
state.mode==='delete'?t('deleteHint'):
state.mode==='edit'?t('editHint'):
t('hint');
});
});

const clr=container.querySelector('#fClearAll');
if(clr)clr.addEventListener('click',()=>{
if(!state.nodes.length&&!state.edges.length)return;
openClearModal();
});

const svgBtn=container.querySelector('#fExportSvg');
if(svgBtn)svgBtn.addEventListener('click',()=>{
try{
const svgStr=buildExportSVG();
const blob=new Blob([svgStr],{type:'image/svg+xml;charset=utf-8'});
const url=URL.createObjectURL(blob);
const a=document.createElement('a');
a.href=url;
a.download='nibbly-flowchart.svg';
document.body.appendChild(a);
a.click();
setTimeout(()=>{URL.revokeObjectURL(url);a.remove();},60000);
showToast('SVG exportado');
}catch(e){showToast(String(e),true);}
});

const pngBtn=container.querySelector('#fExportPng');
if(pngBtn)pngBtn.addEventListener('click',()=>{
try{
const svgStr=buildExportSVG();
const svgBlob=new Blob([svgStr],{type:'image/svg+xml;charset=utf-8'});
const url=URL.createObjectURL(svgBlob);
const img=new Image();
img.onload=()=>{
const scale=2;
const canvasPng=document.createElement('canvas');
canvasPng.width=(img.width||1200)*scale;
canvasPng.height=(img.height||800)*scale;
const ctx=canvasPng.getContext('2d');
ctx.fillStyle='#0b1020';
ctx.fillRect(0,0,canvasPng.width,canvasPng.height);
ctx.drawImage(img,0,0,canvasPng.width,canvasPng.height);
URL.revokeObjectURL(url);
canvasPng.toBlob(b=>{
const a=document.createElement('a');
a.href=URL.createObjectURL(b);
a.download='nibbly-flowchart.png';
document.body.appendChild(a);
a.click();
setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},60000);
showToast('PNG exportado');
},'image/png');
};
img.onerror=()=>{URL.revokeObjectURL(url);showToast('PNG error',true);};
img.src=url;
}catch(e){showToast(String(e),true);}
});


const saveNibBtn=container.querySelector('#fSaveNib');
if(saveNibBtn){
saveNibBtn.addEventListener('click',()=>{
saveNibFile();
});
}

const loadNibBtn=container.querySelector('#fLoadNib');
const nibInput=container.querySelector('#fNibFileInput');
if(loadNibBtn&&nibInput){
loadNibBtn.addEventListener('click',()=>{
if(state.nodes.length>0){
const ok=window.confirm(t('confirmLoad')+'\n\n'+t('confirmLoadDesc'));
if(!ok)return;
}
nibInput.value='';
nibInput.click();
});
nibInput.addEventListener('change',(ev)=>{
const f=ev.target.files&&ev.target.files[0];
if(f)importNibFile(f);
});
}

canvas.addEventListener('pointerdown',onCanvasPointerDown);


if(!globalListenersBound){
window.addEventListener('pointermove',onWindowPointerMove);
window.addEventListener('pointerup',onWindowPointerUp);
globalListenersBound=true;
}

canvas.querySelectorAll('[data-del]').forEach(b=>{
b.addEventListener('click',(ev)=>{
ev.stopPropagation();
const id=parseInt(b.dataset.del,10);
removeNode(id);
renderAll(true);
});
});


canvas.querySelectorAll('.f-node').forEach(el=>{
el.addEventListener('dblclick',(ev)=>{
ev.stopPropagation();
const id=parseInt(el.dataset.id,10);
openEditModal(id);
});
});

resizeEdgesSvg();
}

function onCanvasPointerDown(ev){
const tgt=ev.target;
const resizerEl=tgt.closest('.f-node-resize');
const nodeEl=tgt.closest('.f-node');
const canvas=container.querySelector('#fCanvas');
if(!canvas)return;

if(resizerEl){
ev.stopPropagation();
ev.preventDefault();
const id=parseInt(resizerEl.dataset.resize,10);
const n=nodeById(id);
if(!n)return;
state.resize={
id,
startX:ev.clientX,
startY:ev.clientY,
origW:n.w||DEFAULT_W,
origH:n.h||DEFAULT_H
};
return;
}

if(state.mode==='delete'){
if(nodeEl){
ev.preventDefault();
const id=parseInt(nodeEl.dataset.id,10);
removeNode(id);
renderAll(true);
return;
}
return;
}

if(state.mode==='edit'){
if(nodeEl){
ev.preventDefault();
const id=parseInt(nodeEl.dataset.id,10);
openEditModal(id);
return;
}
return;
}

if(state.mode==='connect'){
if(!nodeEl)return;
ev.preventDefault();
const id=parseInt(nodeEl.dataset.id,10);
if(state.pendingSource===null){
state.pendingSource=id;
container.querySelectorAll('.f-node').forEach(n=>n.classList.remove('f-node-pending'));
nodeEl.classList.add('f-node-pending');
}else if(state.pendingSource===id){
state.pendingSource=null;
nodeEl.classList.remove('f-node-pending');
}else{
const src=state.pendingSource;
const dst=id;
if(src!==dst&&!state.edges.some(e=>e.from===src&&e.to===dst)){
state.edges.push({id:state.nextId++,from:src,to:dst});
}
state.pendingSource=null;
container.querySelectorAll('.f-node').forEach(n=>n.classList.remove('f-node-pending'));
renderAll(true);
}
return;
}

if(nodeEl){
ev.preventDefault();
const id=parseInt(nodeEl.dataset.id,10);
const n=nodeById(id);
if(!n)return;
state.drag={
id,
offsetX:(ev.clientX/state.zoom)-n.x,
offsetY:(ev.clientY/state.zoom)-n.y
};
nodeEl.classList.add('f-node-dragging');
}
}

function onWindowPointerMove(ev){
if(state.resize){
const n=nodeById(state.resize.id);
if(!n)return;
const dw=(ev.clientX-state.resize.startX)/state.zoom;
const dh=(ev.clientY-state.resize.startY)/state.zoom;
n.w=Math.max(120,state.resize.origW+dw);
n.h=Math.max(60,state.resize.origH+dh);

const el=container.querySelector('.f-node[data-id="'+n.id+'"]');
if(el){
el.style.width=n.w+'px';
el.style.height=n.h+'px';
}
scheduleRender();
return;
}

if(!state.drag)return;
const canvas=container.querySelector('#fCanvas');
if(!canvas)return;
const n=nodeById(state.drag.id);
if(!n)return;

n.x=(ev.clientX/state.zoom)-state.drag.offsetX;
n.y=(ev.clientY/state.zoom)-state.drag.offsetY;

const el=canvas.querySelector('.f-node[data-id="'+n.id+'"]');
if(el){
el.style.left=n.x+'px';
el.style.top=n.y+'px';
}

const wrap=container.querySelector('#fCanvasWrap');
if(wrap){
const margin=48;
const nw=n.w||DEFAULT_W;
const nh=n.h||DEFAULT_H;
let grew=false;
if(n.x+nw+margin>canvas.offsetWidth){
state.canvasW=Math.max(state.canvasW,Math.round(n.x+nw+margin*2));
canvas.style.width=state.canvasW+'px';
const wIn=container.querySelector('#fCanvasWInput');
if(wIn)wIn.value=state.canvasW;
grew=true;
}
if(n.y+nh+margin>canvas.offsetHeight){
state.canvasH=Math.max(state.canvasH,Math.round(n.y+nh+margin*2));
canvas.style.height=state.canvasH+'px';
const hIn=container.querySelector('#fCanvasHInput');
if(hIn)hIn.value=state.canvasH;
grew=true;
}
if(grew)resizeEdgesSvg();
}

scheduleRender();
}

function onWindowPointerUp(){
if(state.resize){
state.resize=null;
expandCanvasToFit();
drawEdges();
return;
}
if(!state.drag)return;
const n=nodeById(state.drag.id);
if(n){
n.x=snap(n.x);
n.y=snap(n.y);
const el=container.querySelector('.f-node[data-id="'+n.id+'"]');
if(el){
el.style.left=n.x+'px';
el.style.top=n.y+'px';
}
}
const elDrag=container.querySelector('.f-node-dragging');
if(elDrag)elDrag.classList.remove('f-node-dragging');
state.drag=null;
expandCanvasToFit();
renderAll(true);
}

function removeNode(id){
state.nodes=state.nodes.filter(n=>n.id!==id);
state.edges=state.edges.filter(e=>e.from!==id&&e.to!==id);
if(state.pendingSource===id)state.pendingSource=null;
}

function expandCanvasToFit(){
const canvas=container.querySelector('#fCanvas');
if(!canvas)return;
let maxX=0,maxY=0;
state.nodes.forEach(n=>{
const nw=n.w||DEFAULT_W;
const nh=n.h||DEFAULT_H;
maxX=Math.max(maxX,n.x+nw);
maxY=Math.max(maxY,n.y+nh);
});
if(!maxX||!maxY)return;
const pad=CANVAS_MARGIN;
let updated=false;
if(maxX+pad>state.canvasW){
state.canvasW=Math.max(state.canvasW,Math.round(maxX+pad*2));
canvas.style.width=state.canvasW+'px';
const wIn=container.querySelector('#fCanvasWInput');
if(wIn)wIn.value=state.canvasW;
updated=true;
}
if(maxY+pad>state.canvasH){
state.canvasH=Math.max(state.canvasH,Math.round(maxY+pad*2));
canvas.style.height=state.canvasH+'px';
const hIn=container.querySelector('#fCanvasHInput');
if(hIn)hIn.value=state.canvasH;
updated=true;
}
if(updated)resizeEdgesSvg();
}

function resizeEdgesSvg(){
const canvas=container.querySelector('#fCanvas');
const svg=container.querySelector('#fEdges');
if(!canvas||!svg)return;
const w=state.canvasW;
const h=state.canvasH;
svg.setAttribute('viewBox','0 0 '+w+' '+h);
svg.setAttribute('width',w);
svg.setAttribute('height',h);
}


function edgePoint(n,targetX,targetY){
const w=n.w||DEFAULT_W;
const h=n.h||DEFAULT_H;
const cx=n.x+w/2;
const cy=n.y+h/2;
const halfW=w/2;
const halfH=h/2;
const dx=targetX-cx;
const dy=targetY-cy;

if(Math.abs(dx)<1e-6&&Math.abs(dy)<1e-6)return{x:cx,y:cy};

if(n.type==='decision'){
const adx=Math.abs(dx),ady=Math.abs(dy);
const denom=(adx/halfW)+(ady/halfH);
if(denom<1e-9)return{x:cx,y:cy};
const s=1/denom;
return{x:cx+dx*s,y:cy+dy*s};
}

if(n.type==='start'||n.type==='end'){
const a=dx/halfW,b=dy/halfH;
const denom=Math.sqrt(a*a+b*b);
if(denom<1e-9)return{x:cx,y:cy};
const s=1/denom;
return{x:cx+dx*s,y:cy+dy*s};
}

if(n.type==='io'){
const k=Math.min(24,w*0.18);
const slope=dy/dx;
let rx,ry;
if(Math.abs(dy)<=Math.abs(dx)*(halfH/halfW)){
rx=cx+Math.sign(dx)*halfW;
ry=cy+Math.sign(dx)*halfW*slope;
const normY=(ry-cy)/halfH;
if(rx>cx){rx=n.x+w-k*((normY+1)/2);}
else{rx=n.x+k*((1-normY)/2);}
}else{
ry=cy+Math.sign(dy)*halfH;
rx=cx+Math.sign(dy)*(halfH/slope);
}
return{x:rx,y:ry};
}

const slope=dy/dx;
if(Math.abs(dy)<=Math.abs(dx)*(halfH/halfW)){
return{x:cx+Math.sign(dx)*halfW,y:cy+Math.sign(dx)*halfW*slope};
}
return{y:cy+Math.sign(dy)*halfH,x:cx+Math.sign(dy)*(halfH/slope)};
}

function edgePath(from,to){
const aCenter=nodeCenter(from);
const bCenter=nodeCenter(to);
const p1=edgePoint(from,bCenter.x,bCenter.y);
const p2=edgePoint(to,aCenter.x,aCenter.y);
const mx=(p1.x+p2.x)/2;

return{
d:'M '+p1.x+' '+p1.y+' L '+mx+' '+p1.y+' L '+mx+' '+p2.y+' L '+p2.x+' '+p2.y,
tip:p2,
from:p1
};
}

function drawEdges(){
const svg=container.querySelector('#fEdges');
if(!svg)return;
resizeEdgesSvg();
let inner='';
state.edges.forEach(e=>{
const a=nodeById(e.from);
const b=nodeById(e.to);
if(!a||!b)return;
const p=edgePath(a,b);
const color='#9fb0d0';
const tip=p.tip;
const angle=Math.atan2(tip.y-p.from.y,tip.x-p.from.x);
const size=9;
const x1=tip.x-Math.cos(angle-0.5)*size;
const y1=tip.y-Math.sin(angle-0.5)*size;
const x2=tip.x-Math.cos(angle+0.5)*size;
const y2=tip.y-Math.sin(angle+0.5)*size;
inner+='<path d="'+p.d+'" fill="none" stroke="'+color+'" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>';
inner+='<polygon points="'+tip.x+','+tip.y+' '+x1+','+y1+' '+x2+','+y2+'" fill="'+color+'"/>';
});
svg.innerHTML=inner;
}


function wrapTextToLines(text,maxWidth,fontSize,isBold){
const charW=fontSize*(isBold?0.62:0.6);
const maxChars=Math.max(1,Math.floor(maxWidth/charW));
const words=String(text).split(/\s+/).filter(Boolean);
if(!words.length)return[''];
const lines=[];
let cur='';
words.forEach(w=>{
if(!cur){cur=w;return;}
if((cur+' '+w).length<=maxChars){cur+=' '+w;}
else{lines.push(cur);cur=w;}
});
if(cur)lines.push(cur);
return lines.length?lines:[''];
}


const NIB_FORMAT_VERSION='1.0';

function splitNodeText(text){
const parts=String(text||'').split('|').map(p=>p.trim());
return{
title:parts[0]||'',
desc:parts.slice(1,4).filter(Boolean)
};
}

function buildNibData(){
const nodes=state.nodes.map(n=>{
const tt=splitNodeText(n.text);
const connected=state.edges
.filter(e=>e.from===n.id)
.map(e=>e.to);
return{
id:n.id,
type:n.type,
pos:{x:Math.round(n.x),y:Math.round(n.y)},
size:{
w:Math.round(n.w||DEFAULT_W),
h:Math.round(n.h||DEFAULT_H)
},
title:tt.title,
desc:tt.desc,
connected
};
});

return{
save_type:'flowchart',
version:NIB_FORMAT_VERSION,
app:'Nibbly',
saved_at:new Date().toISOString(),
canvas_size:{
w:Math.round(state.canvasW),
h:Math.round(state.canvasH)
},
nodes,
edges:state.edges.map(e=>({from:e.from,to:e.to}))
};
}

function saveNibFile(){
if(!state.nodes.length){
showToast(t('nibEmpty'),true);
return;
}
try{
const data=buildNibData();
const json=JSON.stringify(data,null,2);
const blob=new Blob([json],{type:'application/json;charset=utf-8'});
const url=URL.createObjectURL(blob);
const a=document.createElement('a');
a.href=url;
a.download='nibbly-flowchart-'+Date.now()+'.nib';
document.body.appendChild(a);
a.click();
setTimeout(()=>{
URL.revokeObjectURL(url);
a.remove();
},60000);
showToast(t('savedOk'));
}catch(e){
console.error('[Nibbly flowcharts] save .nib error:',e);
showToast(t('nibSaveErr'),true);
}
}

function loadNibData(raw){
if(!raw||typeof raw!=='object'){
throw new Error(t('nibFormatErr'));
}
if(raw.save_type!=='flowchart'){
throw new Error(t('nibFormatErr'));
}
if(!Array.isArray(raw.nodes)){
throw new Error(t('nibFormatErr'));
}

const idMap={};
const newNodes=[];
let nextId=1;

raw.nodes.forEach(rawNode=>{
if(!rawNode||typeof rawNode!=='object')return;
const oldId=rawNode.id!=null?rawNode.id:('tmp_'+nextId);
const newId=nextId++;
idMap[oldId]=newId;

const type=['start','end','process','decision','io'].indexOf(rawNode.type)!==-1
?rawNode.type
:'process';

const title=String(rawNode.title||'').trim()||defaultText(type).split('|')[0].trim();
const desc=Array.isArray(rawNode.desc)
?rawNode.desc.map(d=>String(d||'').trim()).filter(Boolean).slice(0,3)
:[];

const parts=[title].concat(desc);
const text=parts.join(' | ');

const pos=rawNode.pos||{};
const size=rawNode.size||{};

newNodes.push({
id:newId,
type,
x:Number.isFinite(pos.x)?pos.x:0,
y:Number.isFinite(pos.y)?pos.y:0,
w:Number.isFinite(size.w)?Math.max(MIN_W,size.w):DEFAULT_W,
h:Number.isFinite(size.h)?Math.max(MIN_H,size.h):DEFAULT_H,
text
});
});

const newEdges=[];
(raw.edges||[]).forEach(e=>{
if(!e)return;
const from=idMap[e.from];
const to=idMap[e.to];
if(!from||!to)return;
if(newEdges.some(x=>x.from===from&&x.to===to))return;
newEdges.push({id:nextId++,from,to});
});

let newW=state.canvasW;
let newH=state.canvasH;
if(raw.canvas_size&&typeof raw.canvas_size==='object'){
const w=Number(raw.canvas_size.w);
const h=Number(raw.canvas_size.h);
if(Number.isFinite(w)&&w>=600)newW=w;
if(Number.isFinite(h)&&h>=400)newH=h;
}

state.nodes=newNodes;
state.edges=newEdges;
state.nextId=nextId;
state.canvasW=newW;
state.canvasH=newH;
state.pendingSource=null;
state.drag=null;
state.resize=null;
}

function importNibFile(file){
if(!file)return;
const reader=new FileReader();

reader.onload=()=>{
try{
const raw=JSON.parse(reader.result);
loadNibData(raw);
renderAll(false);
console.info('[Nibbly flowcharts] ✅ .nib cargado —',state.nodes.length,'nodos,',state.edges.length,'edges');
showToast(t('loadOk'));
}catch(e){
console.error('[Nibbly flowcharts] load .nib error:',e);
showToast(t('loadErr')+' — '+(e.message||String(e)),true);
}
};

reader.onerror=()=>{
showToast(t('loadErr'),true);
};

reader.readAsText(file);
}


function buildExportSVG(){
const C_BG='#0b1020';
const C_SURF='#141a2e';
const C_PRIMARY='#7aa2ff';
const C_WIRE='#9fb0d0';
const C_TITLE='#ffffff';
const C_SUB='#a0a8c0';

const w=state.canvasW;
const h=state.canvasH;

let inner='';
state.edges.forEach(e=>{
const a=nodeById(e.from);
const b=nodeById(e.to);
if(!a||!b)return;
const p=edgePath(a,b);
const tip=p.tip;
const angle=Math.atan2(tip.y-p.from.y,tip.x-p.from.x);
const size=9;
const x1=tip.x-Math.cos(angle-0.5)*size;
const y1=tip.y-Math.sin(angle-0.5)*size;
const x2=tip.x-Math.cos(angle+0.5)*size;
const y2=tip.y-Math.sin(angle+0.5)*size;
inner+='<path d="'+p.d+'" fill="none" stroke="'+C_WIRE+'" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>';
inner+='<polygon points="'+tip.x+','+tip.y+' '+x1+','+y1+' '+x2+','+y2+'" fill="'+C_WIRE+'"/>';
});

state.nodes.forEach(n=>{
const x=n.x;
const y=n.y;
const nw=n.w||DEFAULT_W;
const nh=n.h||DEFAULT_H;
const cx=x+nw/2;
const cy=y+nh/2;

if(n.type==='start'||n.type==='end'){
inner+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+(nw/2)+'" ry="'+(nh/2)+'" fill="'+C_SURF+'" stroke="'+C_PRIMARY+'" stroke-width="2"/>';
}else if(n.type==='decision'){
const pts=[cx+','+y,x+nw+','+cy,cx+','+(y+nh),x+','+cy].join(' ');
inner+='<polygon points="'+pts+'" fill="'+C_SURF+'" stroke="'+C_PRIMARY+'" stroke-width="2" stroke-linejoin="round"/>';
}else if(n.type==='io'){
const k=Math.min(24,nw*0.18);
const pts=[(x+k)+','+y,(x+nw)+','+y,(x+nw-k)+','+(y+nh),x+','+(y+nh)].join(' ');
inner+='<polygon points="'+pts+'" fill="'+C_SURF+'" stroke="'+C_PRIMARY+'" stroke-width="2" stroke-linejoin="round"/>';
}else{
inner+='<rect x="'+x+'" y="'+y+'" width="'+nw+'" height="'+nh+'" rx="10" fill="'+C_SURF+'" stroke="'+C_PRIMARY+'" stroke-width="2"/>';
}

const parts=n.text.split('|').map(p=>p.trim());
const titleText=parts[0]||'';
const subtitles=parts.slice(1,4).filter(Boolean);

let maxTextW=nw-20;
if(n.type==='decision')maxTextW=nw*0.55;
else if(n.type==='start'||n.type==='end')maxTextW=nw*0.72;
else if(n.type==='io')maxTextW=nw*0.78;
maxTextW=Math.max(40,maxTextW);

const titleFontSize=12;
const subFontSize=10;
const titleLineH=titleFontSize*1.25;
const subLineH=subFontSize*1.3;

const titleLines=wrapTextToLines(titleText,maxTextW,titleFontSize,true);
const subLinesArr=[];
subtitles.forEach(sub=>{
subLinesArr.push(...wrapTextToLines(sub,maxTextW,subFontSize,false));
});

const totalH=titleLines.length*titleLineH+subLinesArr.length*subLineH;
let curY=cy-totalH/2+titleFontSize*0.85;

titleLines.forEach(line=>{
inner+='<text x="'+cx+'" y="'+curY+'" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="'+titleFontSize+'" font-weight="900" fill="'+C_TITLE+'">'+esc(line)+'</text>';
curY+=titleLineH;
});
subLinesArr.forEach(line=>{
inner+='<text x="'+cx+'" y="'+curY+'" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="'+subFontSize+'" font-weight="600" fill="'+C_SUB+'">'+esc(line)+'</text>';
curY+=subLineH;
});
});

return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'">'+
'<rect x="0" y="0" width="'+w+'" height="'+h+'" fill="'+C_BG+'"/>'+
inner+
'</svg>';
}


let activeModal=null;

function closeModal(){
if(!activeModal)return;
try{activeModal.remove();}catch(_){}
activeModal=null;
}

function openEditModal(nodeId){
const n=nodeById(nodeId);
if(!n)return;

const parts=n.text.split('|').map(p=>p.trim());
const titleVal=parts[0]||'';
const sub1=parts[1]||'';
const sub2=parts[2]||'';
const sub3=parts[3]||'';

const overlay=document.createElement('div');
overlay.className='f-modal-overlay';
overlay.setAttribute('role','dialog');
overlay.setAttribute('aria-modal','true');

const panel=document.createElement('div');
panel.className='f-modal-panel';

panel.innerHTML=`
<div class="f-modal-header">
  <div class="f-modal-title">${esc(t('editTitle'))}</div>
  <button type="button" class="f-modal-close" id="fModalClose" aria-label="Cerrar">×</button>
</div>
<div class="f-modal-body">
  <div class="f-modal-sub">${esc(t('editSubtitle'))}</div>
  <div class="f-field" style="margin-top:10px;">
    <label class="f-lbl" for="fEditTitle">${esc(t('editTitleLbl'))}</label>
    <input class="f-var-input" id="fEditTitle" type="text" maxlength="80"
      value="${esc(titleVal)}" placeholder="${esc(t('editTitlePh'))}"
      autocomplete="off" spellcheck="false">
    <div class="f-error" id="fEditTitleErr" style="display:none;"></div>
  </div>
  <div class="f-field">
    <label class="f-lbl" for="fEditSub1">${esc(t('editSub1Lbl'))}</label>
    <input class="f-var-input" id="fEditSub1" type="text" maxlength="80"
      value="${esc(sub1)}" placeholder="${esc(t('editSub1Ph'))}"
      autocomplete="off" spellcheck="false">
  </div>
  <div class="f-field">
    <label class="f-lbl" for="fEditSub2">${esc(t('editSub2Lbl'))}</label>
    <input class="f-var-input" id="fEditSub2" type="text" maxlength="80"
      value="${esc(sub2)}" placeholder="${esc(t('editSub2Ph'))}"
      autocomplete="off" spellcheck="false">
  </div>
  <div class="f-field">
    <label class="f-lbl" for="fEditSub3">${esc(t('editSub3Lbl'))}</label>
    <input class="f-var-input" id="fEditSub3" type="text" maxlength="80"
      value="${esc(sub3)}" placeholder="${esc(t('editSub3Ph'))}"
      autocomplete="off" spellcheck="false">
  </div>
</div>
<div class="f-modal-actions">
  <button type="button" class="f-btn" id="fModalCancel">${esc(t('editCancel'))}</button>
  <button type="button" class="f-btn f-btn-primary" id="fModalSave">${esc(t('editSave'))}</button>
</div>
`;

overlay.appendChild(panel);
document.body.appendChild(overlay);
activeModal=overlay;

const titleInp=overlay.querySelector('#fEditTitle');
const sub1Inp=overlay.querySelector('#fEditSub1');
const sub2Inp=overlay.querySelector('#fEditSub2');
const sub3Inp=overlay.querySelector('#fEditSub3');
const errBox=overlay.querySelector('#fEditTitleErr');

function save(){
const title=titleInp.value.trim();
if(!title){
errBox.textContent=t('editEmpty');
errBox.style.display='block';
titleInp.focus();
return;
}
errBox.style.display='none';
const s1=sub1Inp.value.trim();
const s2=sub2Inp.value.trim();
const s3=sub3Inp.value.trim();
let newText=title;
[s1,s2,s3].forEach(s=>{if(s)newText+=' | '+s;});
n.text=newText;
closeModal();
renderAll(true);
}

overlay.querySelector('#fModalClose').addEventListener('click',closeModal);
overlay.querySelector('#fModalCancel').addEventListener('click',closeModal);
overlay.querySelector('#fModalSave').addEventListener('click',save);

overlay.addEventListener('pointerdown',(ev)=>{
if(ev.target===overlay)closeModal();
});

overlay.addEventListener('keydown',(ev)=>{
if(ev.key==='Escape'){ev.preventDefault();closeModal();}
else if(ev.key==='Enter'&&(ev.target.tagName==='INPUT'||ev.target.tagName==='TEXTAREA')){
ev.preventDefault();save();
}
});

setTimeout(()=>{titleInp.focus();titleInp.select();},50);
}

function openClearModal(){
const overlay=document.createElement('div');
overlay.className='f-modal-overlay';
overlay.setAttribute('role','dialog');
overlay.setAttribute('aria-modal','true');

const panel=document.createElement('div');
panel.className='f-modal-panel';

panel.innerHTML=`
<div class="f-modal-header">
  <div class="f-modal-title">${esc(t('clearTitle'))}</div>
  <button type="button" class="f-modal-close" id="fClearClose" aria-label="Cerrar">×</button>
</div>
<div class="f-modal-body">
  <div class="f-modal-sub">${esc(t('clearDesc'))}</div>
</div>
<div class="f-modal-actions">
  <button type="button" class="f-btn" id="fClearCancel">${esc(t('clearCancel'))}</button>
  <button type="button" class="f-btn f-modal-danger" id="fClearConfirm">${esc(t('clearConfirm'))}</button>
</div>
`;

overlay.appendChild(panel);
document.body.appendChild(overlay);
activeModal=overlay;

function doClear(){
state.nodes=[];
state.edges=[];
state.pendingSource=null;
state.nextId=1;
closeModal();
renderAll(false);
}

overlay.querySelector('#fClearClose').addEventListener('click',closeModal);
overlay.querySelector('#fClearCancel').addEventListener('click',closeModal);
overlay.querySelector('#fClearConfirm').addEventListener('click',doClear);

overlay.addEventListener('pointerdown',(ev)=>{
if(ev.target===overlay)closeModal();
});
overlay.addEventListener('keydown',(ev)=>{
if(ev.key==='Escape'){ev.preventDefault();closeModal();}
else if(ev.key==='Enter'){ev.preventDefault();doClear();}
});

setTimeout(()=>{
const c=overlay.querySelector('#fClearCancel');
if(c)c.focus();
},50);
}

const api={
id:'flowcharts',
version:'2.4.0',
init:function(c){
if(!c)return;
container=c;
renderAll(false);
console.info('[Nibbly flowcharts] ✅ ready (v2.4.0 — .nib save/load + scroll preservado + modales Nibbly + modo editar)');
}
};

window.NibblyFlowcharts=api;
window.NibblyModules=window.NibblyModules||{};
window.NibblyModules.flowcharts=api;
})();