(function(){
'use strict';
if(window.NibblyModules&&window.NibblyModules['logic-gates'])return;

function el(tag,attrs,children){
const n=document.createElement(tag);
if(attrs)for(const k in attrs){
if(k==='class')n.className=attrs[k];
else if(k==='text')n.textContent=attrs[k];
else if(k==='html')n.innerHTML=attrs[k];
else if(k==='dataset')Object.assign(n.dataset,attrs[k]);
else n.setAttribute(k,attrs[k]);
}
if(children)(Array.isArray(children)?children:[children])
.forEach(c=>{if(c!=null)n.appendChild(
typeof c==='string'?document.createTextNode(c):c);});
return n;
}
function getStr(ctx,key,fallback){
if(ctx&&typeof ctx.getString==='function'){
const v=ctx.getString(key);
if(v&&v!==key)return v;
}
return fallback;
}
function logTo(msg){
if(window.NibblyApp&&typeof window.NibblyApp.log==='function'){
window.NibblyApp.log(msg);
}
}
function iconOrEmoji(name,emojiFallback,size){
if(window.NibblyIcons&&typeof window.NibblyIcons.get==='function'){
const html=window.NibblyIcons.get(name,{size:size||16});
if(html)return html;
}
return'<span aria-hidden="true">'+(emojiFallback||'')+'</span>';
}
function escapeHTML(s){
return String(s).replace(/[&<>"']/g,c=>({
'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
}[c]));
}

const SVGNS='http://www.w3.org/2000/svg';
function svgEl(tag,attrs){
const n=document.createElementNS(SVGNS,tag);
if(attrs)for(const k in attrs){
if(attrs[k]===undefined||attrs[k]===null)continue;
n.setAttribute(k,attrs[k]);
}
return n;
}


const GATES={
AND:{fn:(a,b)=>a&b,arity:2,expr:(a,b)=>`(${a}·${b})`},
OR:{fn:(a,b)=>a|b,arity:2,expr:(a,b)=>`(${a}+${b})`},
XOR:{fn:(a,b)=>a^b,arity:2,expr:(a,b)=>`(${a}⊕${b})`},
NAND:{fn:(a,b)=>((a&b)?0:1),arity:2,expr:(a,b)=>`¬(${a}·${b})`},
NOR:{fn:(a,b)=>((a|b)?0:1),arity:2,expr:(a,b)=>`¬(${a}+${b})`},
XNOR:{fn:(a,b)=>((a^b)?0:1),arity:2,expr:(a,b)=>`¬(${a}⊕${b})`},
NOT:{fn:(a)=>a?0:1,arity:1,expr:(a)=>`¬${a}`},
BUF:{fn:(a)=>a,arity:1,expr:(a)=>`${a}`}
};

const GATE_LIST=[
{id:'AND',name:'AND',descKey:'lg.gate.and.desc'},
{id:'OR',name:'OR',descKey:'lg.gate.or.desc'},
{id:'XOR',name:'XOR',descKey:'lg.gate.xor.desc'},
{id:'NAND',name:'NAND',descKey:'lg.gate.nand.desc'},
{id:'NOR',name:'NOR',descKey:'lg.gate.nor.desc'},
{id:'XNOR',name:'XNOR',descKey:'lg.gate.xnor.desc'},
{id:'NOT',name:'NOT',descKey:'lg.gate.not.desc'},
{id:'BUF',name:'BUFFER',descKey:'lg.gate.buf.desc'}
];

function evalGate(gate,a,b){
const g=GATES[gate];
if(!g)return 0;
return g.arity===1?g.fn(a):g.fn(a,b);
}

function truthTable(gate){
const g=GATES[gate];
if(g.arity===1){
return[0,1].map(a=>({inputs:[a],out:g.fn(a)}));
}
return[[0,0],[0,1],[1,0],[1,1]].map(([a,b])=>({
inputs:[a,b],out:g.fn(a,b)
}));
}

function minterms(gate){
const tt=truthTable(gate);
const mts=[];
tt.forEach((row,i)=>{if(row.out===1)mts.push(i);});
return mts;
}

function simplifySOP(gate){
const mt=minterms(gate);
if(mt.length===0)return'0';
const g=GATES[gate];
if(g.arity===1){
return mt[0]===1?'A':'¬A';
}
if(mt.length===4)return'1';
const all=[0,1,2,3];
const terms=[];
if(mt.length===1){
const idx=mt[0];
const a=(idx>>1)&1,b=idx&1;
terms.push((a?'A':'¬A')+(b?'B':'¬B'));
return terms[0];
}
if(mt.length===3){
const missing=all.find(x=>!mt.includes(x));
const a=(missing>>1)&1,b=missing&1;
return'¬'+(a?'A':'¬A')+(b?'B':'¬B');
}
const pairs=[[0,1],[0,2],[1,3],[2,3]];
const used=new Set();
const termsOut=[];
mt.forEach(m=>{
for(const[x,y]of pairs){
if((x===m&&mt.includes(y))||(y===m&&mt.includes(x))){
const key=Math.min(x,y)+'-'+Math.max(x,y);
if(used.has(key))return;
used.add(key);
const xa=(x>>1)&1,xb=x&1;
const ya=(y>>1)&1,yb=y&1;
let term='';
if(xa===ya)term+=(xa?'A':'¬A');
if(xb===yb)term+=(xb?'B':'¬B');
termsOut.push(term||'1');
return;
}
}
});
return termsOut.length?termsOut.join(' + '):'0';
}


function initLogicGates(container,ctx){
const root=el('section',{class:'nib-main nib-logic-gates'});
container.appendChild(root);

let currentGate='AND';
let inputA=0,inputB=0;
let mode='calc';


const modeSeg=el('div',{class:'seg'},[
el('button',{class:'seg-btn active',type:'button',
dataset:{mode:'calc'},
html:iconOrEmoji('calculator','',14)+' '+
getStr(ctx,'lg.mode.calc','Calculadora')}),
el('button',{class:'seg-btn',type:'button',
dataset:{mode:'table'},
html:iconOrEmoji('table','',14)+' '+
getStr(ctx,'lg.mode.table','Tabla de verdad')}),
el('button',{class:'seg-btn',type:'button',
dataset:{mode:'builder'},
html:iconOrEmoji('layout','',14)+' '+
getStr(ctx,'lg.mode.builder','Constructor')}),
el('button',{class:'seg-btn',type:'button',
dataset:{mode:'wave'},
html:iconOrEmoji('wave','',14)+' '+
getStr(ctx,'lg.mode.wave','Ondas')})
]);
root.appendChild(modeSeg);


const panelCalc=el('div',{class:'lg-panel lg-panel-calc'});

const gateChips=el('div',{class:'chips lg-gate-chips'});
GATE_LIST.forEach(g=>{
gateChips.appendChild(el('button',{
class:'chip'+(g.id===currentGate?' active':''),
type:'button',dataset:{gate:g.id},text:g.name
}));
});
panelCalc.appendChild(gateChips);

const initialCfg=GATE_LIST.find(g=>g.id===currentGate);
const gateDesc=el('div',{class:'hint lg-gate-desc',
text:getStr(ctx,initialCfg.descKey,initialCfg.name)});
panelCalc.appendChild(gateDesc);

const inputCard=el('div',{class:'card lg-input-card'});
const rowA=el('div',{class:'lg-input-row'});
rowA.appendChild(el('span',{class:'lg-input-label',
text:getStr(ctx,'lg.bit.a','A')}));
const btnA0=el('button',{class:'lg-bit-btn',type:'button',
dataset:{val:'0'},text:'0'});
const btnA1=el('button',{class:'lg-bit-btn',type:'button',
dataset:{val:'1'},text:'1'});
rowA.appendChild(btnA0);rowA.appendChild(btnA1);
inputCard.appendChild(rowA);

const rowB=el('div',{class:'lg-input-row'});
rowB.appendChild(el('span',{class:'lg-input-label',
text:getStr(ctx,'lg.bit.b','B')}));
const btnB0=el('button',{class:'lg-bit-btn',type:'button',
dataset:{val:'0'},text:'0'});
const btnB1=el('button',{class:'lg-bit-btn',type:'button',
dataset:{val:'1'},text:'1'});
rowB.appendChild(btnB0);rowB.appendChild(btnB1);
inputCard.appendChild(rowB);
panelCalc.appendChild(inputCard);

const resultCard=el('div',{class:'card lg-result-card'});
const resultLabel=el('div',{class:'lg-result-label',
text:getStr(ctx,'lg.result','Resultado')});
const resultBig=el('div',{class:'lg-result-big',text:'0'});
const resultExpr=el('div',{class:'lg-result-expr mono',text:''});
const resultBadge=el('span',{class:'badge good',
text:getStr(ctx,'lg.state.off','OFF (0)')});
resultCard.appendChild(resultLabel);
resultCard.appendChild(resultBig);
resultCard.appendChild(resultExpr);
resultCard.appendChild(resultBadge);
panelCalc.appendChild(resultCard);
root.appendChild(panelCalc);


const panelTable=el('div',{class:'lg-panel lg-panel-table',
style:'display:none;'});
const tableGateChips=el('div',{class:'chips lg-gate-chips-table'});
GATE_LIST.forEach(g=>{
tableGateChips.appendChild(el('button',{
class:'chip'+(g.id===currentGate?' active':''),
type:'button',dataset:{gate:g.id},text:g.name
}));
});
panelTable.appendChild(tableGateChips);

const tableWrap=el('div',{class:'card lg-table-card'});
const tableHost=el('div',{class:'lg-table-host'});
tableWrap.appendChild(tableHost);
panelTable.appendChild(tableWrap);

const analysisCard=el('div',{class:'card lg-analysis-card'});
analysisCard.appendChild(el('div',{class:'card-head'},[
el('span',{class:'card-title',
text:getStr(ctx,'lg.analysis','Análisis booleano')})
]));
const analysisBody=el('div',{class:'lg-analysis-body'});
analysisCard.appendChild(analysisBody);
panelTable.appendChild(analysisCard);
root.appendChild(panelTable);


const panelBuilder=el('div',{class:'lg-panel lg-panel-builder',
style:'display:none;'});

const builderHint=el('div',{class:'hint',
text:getStr(ctx,'lg.builder.hint',
'Toca las entradas para cambiar bits y ver el circuito en tiempo real. '+
'Puedes arrastrar los círculos A, B e Y.')});
panelBuilder.appendChild(builderHint);

const builderCard=el('div',{class:'card lg-builder-card'});
const canvas=el('div',{class:'lg-canvas',id:'lgCanvas'});
builderCard.appendChild(canvas);
panelBuilder.appendChild(builderCard);

const builderCtrl=el('div',{class:'card lg-builder-ctrl'});
builderCtrl.appendChild(el('div',{class:'card-head'},[
el('span',{class:'card-title',
text:getStr(ctx,'lg.builder.controls','Constructor de circuito')})
]));
const builderGateSel=el('select',{class:'select lg-builder-gate'});
GATE_LIST.forEach(g=>{
const o=el('option',{value:g.id,text:g.name});
if(g.id===currentGate)o.selected=true;
builderGateSel.appendChild(o);
});
builderCtrl.appendChild(builderGateSel);

const bRowA=el('div',{class:'lg-input-row'});
bRowA.appendChild(el('span',{class:'lg-input-label',
text:getStr(ctx,'lg.bit.a','A')}));
const bA0=el('button',{class:'lg-bit-btn',type:'button',
dataset:{val:'0'},text:'0'});
const bA1=el('button',{class:'lg-bit-btn',type:'button',
dataset:{val:'1'},text:'1'});
bRowA.appendChild(bA0);bRowA.appendChild(bA1);
builderCtrl.appendChild(bRowA);

const bRowB=el('div',{class:'lg-input-row'});
bRowB.appendChild(el('span',{class:'lg-input-label',
text:getStr(ctx,'lg.bit.b','B')}));
const bB0=el('button',{class:'lg-bit-btn',type:'button',
dataset:{val:'0'},text:'0'});
const bB1=el('button',{class:'lg-bit-btn',type:'button',
dataset:{val:'1'},text:'1'});
bRowB.appendChild(bB0);bRowB.appendChild(bB1);
builderCtrl.appendChild(bRowB);

const builderOut=el('div',{class:'lg-builder-out'});
builderOut.appendChild(el('span',{class:'lg-builder-out-label',
text:getStr(ctx,'lg.builder.output','Salida')}));
const builderOutVal=el('span',{class:'lg-builder-out-val',text:'0'});
builderOut.appendChild(builderOutVal);
builderCtrl.appendChild(builderOut);
panelBuilder.appendChild(builderCtrl);
root.appendChild(panelBuilder);


const panelWave=el('div',{class:'lg-panel lg-panel-wave',
style:'display:none;'});

let wavePeriod=4;
let waveShowA=true,waveShowB=true,waveShowY=true;
let waveCursor=1;

const waveHint=el('div',{class:'hint',
text:getStr(ctx,'lg.wave.hint',
'Cada cuadrado es un ciclo de reloj (t). Las entradas A y B se combinan '+
'para producir Y. Usa los botones para cambiar bits y ver el efecto al instante.')});
panelWave.appendChild(waveHint);

const waveToolbar=el('div',{class:'lg-wave-toolbar'});

function waveChip(label,active,datasetKey,datasetVal){
const b=el('button',{class:'chip'+(active?' active':''),
type:'button',text:label});
if(datasetKey)b.dataset[datasetKey]=datasetVal;
return b;
}
waveToolbar.appendChild(waveChip(getStr(ctx,'lg.wave.a','A'),
true,'wave','a'));
waveToolbar.appendChild(waveChip(getStr(ctx,'lg.wave.b','B'),
true,'wave','b'));
waveToolbar.appendChild(waveChip(getStr(ctx,'lg.wave.y','Y'),
true,'wave','y'));
waveToolbar.appendChild(waveChip('2×',false,'period','2'));
waveToolbar.appendChild(waveChip('4×',true,'period','4'));
waveToolbar.appendChild(waveChip('8×',false,'period','8'));
panelWave.appendChild(waveToolbar);

const waveCard=el('div',{class:'card lg-wave-card'});
const waveCanvasWrap=el('div',{class:'lg-wave-canvas-wrap'});
const waveHost=el('div');
waveCanvasWrap.appendChild(waveHost);
waveCard.appendChild(waveCanvasWrap);

const waveReadout=el('div',{class:'lg-wave-readout'});
const rdA=el('div',{class:'lg-wave-readout-item'},[
el('span',{class:'k',text:getStr(ctx,'lg.bit.a','A')}),
el('span',{class:'v a',text:'0'})
]);
const rdB=el('div',{class:'lg-wave-readout-item'},[
el('span',{class:'k',text:getStr(ctx,'lg.bit.b','B')}),
el('span',{class:'v b',text:'0'})
]);
const rdY=el('div',{class:'lg-wave-readout-item'},[
el('span',{class:'k',text:getStr(ctx,'lg.bit.y','Y')}),
el('span',{class:'v',text:'0'})
]);
const rdGate=el('div',{class:'lg-wave-readout-item'},[
el('span',{class:'k',text:getStr(ctx,'lg.wave.gate','Puerta')}),
el('span',{class:'v',text:'AND'})
]);
waveReadout.appendChild(rdA);
waveReadout.appendChild(rdB);
waveReadout.appendChild(rdY);
waveReadout.appendChild(rdGate);
waveCard.appendChild(waveReadout);
panelWave.appendChild(waveCard);


const conceptsCard=el('div',{class:'card lg-analysis-card'});
conceptsCard.appendChild(el('div',{class:'card-head'},[
el('span',{class:'card-title',
text:getStr(ctx,'lg.concepts.title','Conceptos básicos de ondas')})
]));
const conceptsList=el('div',{class:'lg-concepts'});

const CONCEPTS=[
{icon:'signal',titleKey:'lg.concept.1.title',
title:'¿Qué es una forma de onda?',
body:
'Una <strong>forma de onda</strong> es la representación gráfica de una señal digital en el tiempo. '+
'En lógica binaria solo hay dos niveles: <span class="mono">0</span> (bajo) y '+
'<span class="mono">1</span> (alto). La línea <strong>sube</strong> cuando la señal pasa de 0 a 1 '+
'y <strong>baja</strong> cuando vuelve a 0.'},
{icon:'clock-2',titleKey:'lg.concept.2.title',
title:'Tiempo y ciclos (t)',
body:
'El eje horizontal representa el <strong>tiempo</strong>. Cada cuadrado de la cuadrícula equivale a '+
'un <strong>ciclo</strong> o <span class="mono">t</span>. Los tiempos se marcan de izquierda a derecha: '+
'<span class="mono">t₀, t₁, t₂, t₃…</span> Siempre debes alinear las señales A, B e Y con la misma '+
'escala temporal para poder compararlas.'},
{icon:'arrow-swap',titleKey:'lg.concept.3.title',
title:'Entradas vs. salida',
body:
'Las <strong>entradas</strong> (A y B) son las señales que tú controlas. La <strong>salida</strong> (Y) '+
'es el resultado de aplicar la puerta lógica. En cada ciclo, la salida se calcula con los valores de '+
'A y B en ese mismo instante: <span class="mono">Y = f(A, B)</span>.'},
{icon:'layers',titleKey:'lg.concept.4.title',
title:'Cómo marcar correctamente los tiempos',
body:
'1. Dibuja primero las líneas verticales de los ciclos.<br>'+
'2. Coloca A y B respetando esas líneas.<br>'+
'3. Dibuja Y justo debajo, con las mismas verticales.<br>'+
'4. Los cambios de nivel deben caer <strong>exactamente</strong> sobre una línea de ciclo; nunca '+
'entre dos, o la lectura será ambigua.'},
{icon:'zap-off',titleKey:'lg.concept.5.title',
title:'Retardo de propagación',
body:
'En un circuito real, la salida no cambia <strong>instantáneamente</strong> con las entradas: '+
'existe un pequeño <strong>retardo de propagación</strong> (típicamente nanosegundos). En estos '+
'diagramas didácticos lo dibujamos ideal (sin retardo) para que la lógica sea más clara.'},
{icon:'arrow-up-right',titleKey:'lg.concept.6.title',
title:'Flancos y niveles',
body:
'Un <strong>flanco</strong> es el instante en que la señal cambia de nivel: '+
'<span class="mono">flanco de subida ↑</span> (0→1) y <span class="mono">flanco de bajada ↓</span> '+
'(1→0). El <strong>nivel</strong> es el valor estable entre flancos. Los circuitos secuenciales '+
'(flip-flops, contadores) se disparan con flancos, no con niveles.'}
];

CONCEPTS.forEach(c=>{
const item=el('div',{class:'lg-concept'});
const head=el('div',{class:'lg-concept-head'});
head.appendChild(el('span',{class:'lg-concept-icon',
html:iconOrEmoji(c.icon,'',18)}));
head.appendChild(el('span',{class:'lg-concept-title',
text:getStr(ctx,c.titleKey,c.title)}));
head.appendChild(el('span',{class:'lg-concept-toggle',
html:iconOrEmoji('chevron-right','▶',12)}));
item.appendChild(head);
const body=el('div',{class:'lg-concept-body'});
body.innerHTML='<p>'+c.body+'</p>';
item.appendChild(body);
head.addEventListener('click',()=>{
item.classList.toggle('open');
});
conceptsList.appendChild(item);
});
conceptsCard.appendChild(conceptsList);
panelWave.appendChild(conceptsCard);


const makerCard=el('div',{class:'card lg-maker-card'});
makerCard.appendChild(el('div',{class:'card-head'},[
el('span',{class:'card-title',
html:iconOrEmoji('wave-maker','',16)+' '+
getStr(ctx,'lg.maker.title','Wave Maker')})
]));
makerCard.appendChild(el('div',{class:'hint',
text:getStr(ctx,'lg.maker.hint',
'Toca una celda para cambiar su bit. A y B son tus entradas; Y se calcula '+
'automáticamente con la puerta seleccionada en tiempo real.')}));

const MAKER_MIN=2,MAKER_MAX=32;
let makerPeriod=8;
let makerBits={
A:new Array(MAKER_MAX).fill(0),
B:new Array(MAKER_MAX).fill(0)
};
for(let i=0;i<makerPeriod;i++){
makerBits.A[i]=i%2;
makerBits.B[i]=(i>>1)%2;
}

const makerGateRow=el('div',{class:'lg-maker-gate-row'});
GATE_LIST.forEach(g=>{
makerGateRow.appendChild(el('button',{
class:'chip'+(g.id===currentGate?' active':''),
type:'button',dataset:{gate:g.id},text:g.name
}));
});
makerCard.appendChild(makerGateRow);

const makerToolbar=el('div',{class:'lg-maker-toolbar'});
const makerPresets=el('div',{class:'lg-maker-toolbar'});
const makerGridWrap=el('div',{class:'lg-maker-grid-wrap'});
const makerGrid=el('div',{class:'lg-maker-grid'});
makerGridWrap.appendChild(makerGrid);
makerCard.appendChild(makerToolbar);
makerCard.appendChild(makerPresets);
makerCard.appendChild(makerGridWrap);


const makerDiagramWrap=el('div',{class:'lg-maker-diagram-wrap'});
const makerDiagramHost=el('div',{class:'lg-maker-diagram-host'});
makerDiagramWrap.appendChild(makerDiagramHost);
makerCard.appendChild(makerDiagramWrap);

const makerLegend=el('div',{class:'lg-maker-legend'});
makerCard.appendChild(makerLegend);

const makerReadout=el('div',{class:'lg-maker-readout'});
makerCard.appendChild(makerReadout);

const makerActions=el('div',{class:'lg-maker-actions'});
makerActions.appendChild(el('button',{
class:'chip primary',type:'button',dataset:{act:'download'},
html:iconOrEmoji('download','⬇',14)+' '+
getStr(ctx,'lg.maker.download','Descargar JSON')}));
makerActions.appendChild(el('button',{
class:'chip',type:'button',dataset:{act:'copy'},
html:iconOrEmoji('copy-2','📋',14)+' '+
getStr(ctx,'lg.maker.copyBits','Copiar bits')}));
makerActions.appendChild(el('button',{
class:'chip',type:'button',dataset:{act:'clear'},
html:iconOrEmoji('clear','🗑',14)+' '+
getStr(ctx,'lg.maker.clear','Limpiar')}));
makerActions.appendChild(el('button',{
class:'chip',type:'button',dataset:{act:'png'},
html:iconOrEmoji('image','',14)+' PNG'}));
makerActions.appendChild(el('button',{
class:'chip',type:'button',dataset:{act:'svg'},
html:iconOrEmoji('download','',14)+' SVG'}));
makerCard.appendChild(makerActions);

panelWave.appendChild(makerCard);
root.appendChild(panelWave);

function makerComputeY(a,b){
return evalGate(currentGate,a,b);
}

function buildMakerToolbar(){
makerToolbar.innerHTML='';
[2,4,8,16,32].forEach(n=>{
makerToolbar.appendChild(el('button',{
class:'chip'+(n===makerPeriod?' active':''),
type:'button',dataset:{period:String(n)},
html:iconOrEmoji('clock-2','',11)+' '+n
}));
});
}

function buildMakerPresets(){
makerPresets.innerHTML='';
const PRESETS=[
{id:'alt',icon:'activity-2',label:getStr(ctx,'lg.maker.preset.alt','Alternado')},
{id:'low',icon:'arrow-down',label:getStr(ctx,'lg.maker.preset.low','Todo 0')},
{id:'high',icon:'arrow-up',label:getStr(ctx,'lg.maker.preset.high','Todo 1')},
{id:'random',icon:'dice',label:getStr(ctx,'lg.maker.preset.random','Aleatorio')},
{id:'invert',icon:'invert',label:getStr(ctx,'lg.maker.preset.invert','Invertir A')},
{id:'copyAB',icon:'copy',label:getStr(ctx,'lg.maker.preset.copyAB','Copiar A→B')}
];
PRESETS.forEach(p=>{
makerPresets.appendChild(el('button',{
class:'chip',type:'button',dataset:{preset:p.id},
html:iconOrEmoji(p.icon,'',13)+' '+escapeHTML(p.label)
}));
});
}

function buildMakerLegend(){
makerLegend.innerHTML=
'<span>'+iconOrEmoji('bit-0','',14)+' 0</span>'+
'<span>'+iconOrEmoji('bit-1','',14)+' 1</span>'+
'<span>'+iconOrEmoji('check-circle','',14)+' Y</span>'+
'<span>'+escapeHTML(getStr(ctx,'lg.maker.legend','0 = bajo · 1 = alto'))+'</span>';
}

function buildMakerGrid(){
makerGrid.style.gridTemplateColumns=
'auto repeat('+makerPeriod+', 1fr)';
makerGrid.innerHTML='';

makerGrid.appendChild(el('div',{class:'lg-maker-cell col-label',text:''}));
for(let i=0;i<makerPeriod;i++){
const sub=String(i).replace(/\d/g,d=>'₀₁₂₃₄₅₆₇₈₉'[d]);
makerGrid.appendChild(el('div',{
class:'lg-maker-cell col-label',text:'t'+sub
}));
}

makerGrid.appendChild(el('div',{
class:'lg-maker-cell row-label',
text:getStr(ctx,'lg.maker.rowA','Entrada A')
}));
for(let i=0;i<makerPeriod;i++){
const v=makerBits.A[i];
makerGrid.appendChild(el('button',{
class:'lg-maker-cell'+(v?' on':''),
type:'button',
dataset:{row:'A',idx:String(i)},
text:String(v)
}));
}

makerGrid.appendChild(el('div',{
class:'lg-maker-cell row-label',
text:getStr(ctx,'lg.maker.rowB','Entrada B')
}));
for(let i=0;i<makerPeriod;i++){
const v=makerBits.B[i];
makerGrid.appendChild(el('button',{
class:'lg-maker-cell'+(v?' on':''),
type:'button',
dataset:{row:'B',idx:String(i)},
text:String(v)
}));
}

makerGrid.appendChild(el('div',{
class:'lg-maker-cell row-label',
text:getStr(ctx,'lg.maker.rowY','Salida Y (auto)')
}));
for(let i=0;i<makerPeriod;i++){
const y=makerComputeY(makerBits.A[i],makerBits.B[i]);
makerGrid.appendChild(el('div',{
class:'lg-maker-cell row-y'+(y?' on':''),
dataset:{row:'Y',idx:String(i)},
text:String(y)
}));
}
}

function buildMakerReadout(){
let sumA=0,sumB=0,sumY=0;
for(let i=0;i<makerPeriod;i++){
const y=makerComputeY(makerBits.A[i],makerBits.B[i]);
sumA+=makerBits.A[i];
sumB+=makerBits.B[i];
sumY+=y;
}
const dutyA=Math.round(sumA/makerPeriod*100);
const dutyB=Math.round(sumB/makerPeriod*100);
const dutyY=Math.round(sumY/makerPeriod*100);

makerReadout.innerHTML='';
const items=[
{icon:'cpu',k:getStr(ctx,'lg.wave.gate','Puerta'),v:currentGate},
{icon:'clock-2',k:getStr(ctx,'lg.maker.period','Ciclos'),v:String(makerPeriod)},
{icon:'bit-0',k:'A',v:'0:'+(makerPeriod-sumA)+' · 1:'+sumA},
{icon:'bit-1',k:'B',v:'0:'+(makerPeriod-sumB)+' · 1:'+sumB},
{icon:'check-circle',k:'Y',v:'0:'+(makerPeriod-sumY)+' · 1:'+sumY,on:sumY>0},
{icon:'pie-chart',k:'Duty',v:dutyA+'% / '+dutyB+'% / '+dutyY+'%'}
];
items.forEach(it=>{
makerReadout.appendChild(el('div',{class:'item'},[
el('span',{class:'k',
html:iconOrEmoji(it.icon,'',11)+' '+escapeHTML(it.k)}),
el('span',{class:'v'+(it.on?' on':''),text:it.v})
]));
});
}


const MD_SVG_W=640;
const MD_SVG_H=340;
const MD_LEFT=64;
const MD_RIGHT=MD_SVG_W-24;
const MD_TOP=56;
const MD_ROW_H=64;
const MD_GAP=18;
const MD_TIME_H=34;

function mdYBase(row){
return MD_TOP+row*(MD_ROW_H+MD_GAP)+MD_ROW_H;
}
function mdYHigh(row){
return mdYBase(row)-MD_ROW_H*0.7;
}
function mdStepPx(){
return(MD_RIGHT-MD_LEFT)/makerPeriod;
}

function buildMakerDiagramSvg(){
const gate=currentGate;
const period=makerPeriod;
const step=mdStepPx();

const rows=[
{key:'A',label:getStr(ctx,'lg.bit.a','A'),color:'#5b8cff'},
{key:'B',label:getStr(ctx,'lg.bit.b','B'),color:'#a78bfa'},
{key:'Y',label:getStr(ctx,'lg.bit.y','Y'),color:'#22d3a6'}
];

const svg=svgEl('svg',{
viewBox:`0 0 ${MD_SVG_W} ${MD_SVG_H}`,
class:'lg-maker-diagram',
xmlns:SVGNS,
width:'100%',
height:'auto'
});


svg.appendChild(svgEl('rect',{
x:0,y:0,width:MD_SVG_W,height:MD_SVG_H,
fill:'#0b1020',rx:'16'
}));


const title=svgEl('text',{
x:MD_LEFT,y:32,
fill:'#f0f2f8',
'font-size':'16',
'font-weight':'900',
'font-family':'ui-monospace, SFMono-Regular, Menlo, monospace'
});
title.textContent='Wave Maker · '+gate+' · '+period+'t';
svg.appendChild(title);


const gridG=svgEl('g');
for(let i=0;i<=period;i++){
const x=MD_LEFT+i*step;
gridG.appendChild(svgEl('line',{
x1:x,y1:MD_TOP-10,x2:x,y2:MD_SVG_H-MD_TIME_H-6,
stroke:'#2a3050','stroke-width':'1',
'stroke-dasharray':'2 4',
opacity:0.9
}));
}
rows.forEach((_,idx)=>{
gridG.appendChild(svgEl('line',{
x1:MD_LEFT,y1:mdYBase(idx),x2:MD_RIGHT,y2:mdYBase(idx),
stroke:'#3a4166','stroke-width':'1.2'
}));
gridG.appendChild(svgEl('line',{
x1:MD_LEFT,y1:mdYHigh(idx),x2:MD_RIGHT,y2:mdYHigh(idx),
stroke:'#3a4166','stroke-width':'1',
'stroke-dasharray':'2 4',
opacity:0.7
}));
});
svg.appendChild(gridG);


rows.forEach((r,idx)=>{
const t=svgEl('text',{
x:MD_LEFT-14,y:mdYHigh(idx)+MD_ROW_H*0.38,
'text-anchor':'end',
fill:'#a0a8c0',
'font-size':'13',
'font-weight':'900',
'font-family':'ui-monospace, SFMono-Regular, Menlo, monospace'
});
t.textContent=r.label;
svg.appendChild(t);

const t1=svgEl('text',{
x:MD_LEFT-6,y:mdYHigh(idx)+4,
'text-anchor':'end',
fill:'#6b7390',
'font-size':'9',
'font-weight':'700'
});
t1.textContent='1';
svg.appendChild(t1);
const t0=svgEl('text',{
x:MD_LEFT-6,y:mdYBase(idx)+4,
'text-anchor':'end',
fill:'#6b7390',
'font-size':'9',
'font-weight':'700'
});
t0.textContent='0';
svg.appendChild(t0);
});


rows.forEach((r,idx)=>{
let prev=null;
let d='';
for(let i=0;i<period;i++){
let v;
if(r.key==='A')v=makerBits.A[i];
else if(r.key==='B')v=makerBits.B[i];
else v=makerComputeY(makerBits.A[i],makerBits.B[i]);
const x0=MD_LEFT+i*step;
const x1=x0+step;
const y=v?mdYHigh(idx):mdYBase(idx);
if(prev===null){
d+=`M ${x0} ${y}`;
}else{
const yPrev=prev?mdYHigh(idx):mdYBase(idx);
d+=` L ${x0} ${yPrev} L ${x0} ${y}`;
}
d+=` L ${x1} ${y}`;
prev=v;
}
const path=svgEl('path',{
d:d,
fill:'none',
stroke:r.color,
'stroke-width':'2.8',
'stroke-linejoin':'round',
'stroke-linecap':'round'
});
svg.appendChild(path);

for(let i=0;i<period;i++){
let v;
if(r.key==='A')v=makerBits.A[i];
else if(r.key==='B')v=makerBits.B[i];
else v=makerComputeY(makerBits.A[i],makerBits.B[i]);
if(v===1){
const x=MD_LEFT+i*step+step/2;
const y=mdYHigh(idx);
svg.appendChild(svgEl('circle',{
cx:x,cy:y,r:3,
fill:r.color,
stroke:'#0b1020',
'stroke-width':'1.2'
}));
}
}
});


const timeY=MD_SVG_H-MD_TIME_H+6;
svg.appendChild(svgEl('line',{
x1:MD_LEFT,y1:timeY,x2:MD_RIGHT,y2:timeY,
stroke:'#3a4166','stroke-width':'1.2'
}));
for(let i=0;i<=period;i++){
const x=MD_LEFT+i*step;
const sub=String(i).replace(/\d/g,d=>'₀₁₂₃₄₅₆₇₈₉'[d]);
const t=svgEl('text',{
x:x,y:timeY+18,'text-anchor':'middle',
fill:'#a0a8c0',
'font-size':'11',
'font-weight':'700',
'font-family':'ui-monospace, SFMono-Regular, Menlo, monospace'
});
t.textContent='t'+sub;
svg.appendChild(t);
}


const legendItems=[
{label:getStr(ctx,'lg.bit.a','A'),color:'#5b8cff'},
{label:getStr(ctx,'lg.bit.b','B'),color:'#a78bfa'},
{label:getStr(ctx,'lg.bit.y','Y'),color:'#22d3a6'}
];
const legendW=50;
const legendTotalW=legendItems.length*legendW;
let lx=MD_RIGHT-legendTotalW;
const legendY=26;
legendItems.forEach(item=>{
svg.appendChild(svgEl('rect',{
x:lx,y:legendY-9,width:10,height:10,rx:3,
fill:item.color
}));
const lt=svgEl('text',{
x:lx+15,y:legendY,
fill:'#a0a8c0','font-size':'11','font-weight':'700',
'font-family':'ui-monospace, SFMono-Regular, Menlo, monospace'
});
lt.textContent=item.label;
svg.appendChild(lt);
lx+=legendW;
});

return svg;
}

function renderMakerDiagram(){
if(!makerDiagramHost)return;
makerDiagramHost.innerHTML='';
makerDiagramHost.appendChild(buildMakerDiagramSvg());
}

function renderMaker(){
buildMakerToolbar();
buildMakerPresets();
buildMakerLegend();
buildMakerGrid();
buildMakerReadout();
renderMakerDiagram();
makerGateRow.querySelectorAll('.chip').forEach(c=>{
c.classList.toggle('active',c.dataset.gate===currentGate);
});
}

function makerSetPeriod(n){
n=Math.max(MAKER_MIN,Math.min(MAKER_MAX,n));
makerPeriod=n;
renderMaker();
}

function makerToggle(row,idx){
if(row!=='A'&&row!=='B')return;
makerBits[row][idx]=makerBits[row][idx]?0:1;
renderMaker();
}

function makerApplyPreset(name){
for(let i=0;i<MAKER_MAX;i++){
if(name==='alt'){
makerBits.A[i]=i%2;
makerBits.B[i]=(i>>1)%2;
}else if(name==='low'){
makerBits.A[i]=0;
makerBits.B[i]=0;
}else if(name==='high'){
makerBits.A[i]=1;
makerBits.B[i]=1;
}else if(name==='random'){
makerBits.A[i]=Math.random()<0.5?0:1;
makerBits.B[i]=Math.random()<0.5?0:1;
}else if(name==='invert'){
makerBits.A[i]=makerBits.A[i]?0:1;
}else if(name==='copyAB'){
makerBits.B[i]=makerBits.A[i];
}
}
renderMaker();
}

function makerDownloadJSON(){
const data={
gate:currentGate,
period:makerPeriod,
A:makerBits.A.slice(0,makerPeriod),
B:makerBits.B.slice(0,makerPeriod),
Y:makerBits.A.slice(0,makerPeriod)
.map((a,i)=>makerComputeY(a,makerBits.B[i])),
timestamp:new Date().toISOString()
};
const blob=new Blob([JSON.stringify(data,null,2)],
{type:'application/json'});
const url=URL.createObjectURL(blob);
const a=document.createElement('a');
a.href=url;
a.download='nibbly-wave-'+currentGate+'-'+makerPeriod+'t.json';
document.body.appendChild(a);
a.click();
a.remove();
setTimeout(()=>URL.revokeObjectURL(url),1000);
logTo('wave-maker: JSON downloaded');
}

function makerCopyBits(){
const data={
gate:currentGate,
period:makerPeriod,
A:makerBits.A.slice(0,makerPeriod).join(''),
B:makerBits.B.slice(0,makerPeriod).join(''),
Y:makerBits.A.slice(0,makerPeriod)
.map((a,i)=>makerComputeY(a,makerBits.B[i])).join('')
};
const text='gate='+data.gate+' period='+data.period+
'\nA='+data.A+'\nB='+data.B+'\nY='+data.Y;
try{
if(navigator.clipboard&&window.isSecureContext){
navigator.clipboard.writeText(text).then(()=>{
logTo(getStr(ctx,'lg.maker.copied','✓ Bits copiados'));
}).catch(()=>{});
}else{
const ta=document.createElement('textarea');
ta.value=text;ta.style.position='fixed';
ta.style.top='-9999px';document.body.appendChild(ta);
ta.select();document.execCommand('copy');ta.remove();
logTo(getStr(ctx,'lg.maker.copied','✓ Bits copiados'));
}
}catch(_){}
}

function makerDownloadSVG(){
const svg=buildMakerDiagramSvg();
const xml=new XMLSerializer().serializeToString(svg);
const blob=new Blob(
['<?xml version="1.0" encoding="UTF-8"?>\n'+xml],
{type:'image/svg+xml;charset=utf-8'}
);
const url=URL.createObjectURL(blob);
const a=document.createElement('a');
a.href=url;
a.download='nibbly-wave-'+currentGate+'-'+makerPeriod+'t.svg';
document.body.appendChild(a);
a.click();
a.remove();
setTimeout(()=>URL.revokeObjectURL(url),1000);
logTo('wave-maker: SVG downloaded');
}

function makerDownloadPNG(){
const svg=buildMakerDiagramSvg();
const xml=new XMLSerializer().serializeToString(svg);
const svgBlob=new Blob([xml],{type:'image/svg+xml;charset=utf-8'});
const url=URL.createObjectURL(svgBlob);

const scale=2;
const img=new Image();
img.onload=()=>{
const canvas=document.createElement('canvas');
canvas.width=MD_SVG_W*scale;
canvas.height=MD_SVG_H*scale;
const cx=canvas.getContext('2d');
cx.fillStyle='#0b1020';
cx.fillRect(0,0,canvas.width,canvas.height);
cx.drawImage(img,0,0,canvas.width,canvas.height);
canvas.toBlob(blob=>{
URL.revokeObjectURL(url);
if(!blob){
logTo('wave-maker: PNG failed');
return;
}
const pngUrl=URL.createObjectURL(blob);
const a=document.createElement('a');
a.href=pngUrl;
a.download='nibbly-wave-'+currentGate+'-'+makerPeriod+'t.png';
document.body.appendChild(a);
a.click();
a.remove();
setTimeout(()=>URL.revokeObjectURL(pngUrl),1000);
logTo('wave-maker: PNG downloaded');
},'image/png');
};
img.onerror=()=>{
URL.revokeObjectURL(url);
logTo('wave-maker: PNG image load failed');
};
img.src=url;
}

makerCard.addEventListener('click',e=>{
const cell=e.target.closest('.lg-maker-cell');
if(cell&&cell.dataset.row&&cell.dataset.idx!==undefined){
if(cell.dataset.row==='Y')return;
makerToggle(cell.dataset.row,parseInt(cell.dataset.idx,10));
return;
}
const chip=e.target.closest('.chip');
if(!chip)return;
if(chip.dataset.gate){
currentGate=chip.dataset.gate;
gateChips.querySelectorAll('.chip').forEach(c=>{
c.classList.toggle('active',c.dataset.gate===currentGate);
});
tableGateChips.querySelectorAll('.chip').forEach(c=>{
c.classList.toggle('active',c.dataset.gate===currentGate);
});
builderGateSel.value=currentGate;
renderMaker();
renderWave();
renderCalc();
return;
}
if(chip.dataset.period){
makerSetPeriod(parseInt(chip.dataset.period,10));
return;
}
if(chip.dataset.preset){
makerApplyPreset(chip.dataset.preset);
return;
}
if(chip.dataset.act){
const act=chip.dataset.act;
if(act==='download')makerDownloadJSON();
else if(act==='copy')makerCopyBits();
else if(act==='clear')makerApplyPreset('low');
else if(act==='svg')makerDownloadSVG();
else if(act==='png')makerDownloadPNG();
}
});


const SVG_W=360;
const SVG_H=240;
const NODE_R=18;
const NODE_PAD=NODE_R+4;

const GATE_X=160,GATE_Y=135,GATE_W=70,GATE_H=70;
const GATE_CY=GATE_Y+GATE_H/2;

const defaults={
A:{x:40,y:100},
B:{x:40,y:170},
Y:{x:SVG_W-25,y:GATE_CY}
};

let svgRoot=null;
let refs=null;
let dragState=null;


function getSvgBounds(){
const fallback={
xMin:NODE_PAD,yMin:NODE_PAD,
xMax:SVG_W-NODE_PAD,yMax:SVG_H-NODE_PAD
};
if(!svgRoot)return fallback;

const rect=svgRoot.getBoundingClientRect();
if(!rect||rect.width<=0||rect.height<=0)return fallback;

const vbRatio=SVG_W/SVG_H;
const rectRatio=rect.width/rect.height;

let drawW,drawH,offsetX,offsetY;
if(rectRatio>vbRatio){
drawH=rect.height;
drawW=drawH*vbRatio;
offsetX=(rect.width-drawW)/2;
offsetY=0;
}else{
drawW=rect.width;
drawH=drawW/vbRatio;
offsetX=0;
offsetY=(rect.height-drawH)/2;
}

const leftPx=rect.left+offsetX;
const topPx=rect.top+offsetY;
const rightPx=leftPx+drawW;
const bottomPx=topPx+drawH;

const ctm=svgRoot.getScreenCTM();
if(!ctm)return fallback;

const pt=(x,y)=>{
const p=svgRoot.createSVGPoint();
p.x=x;p.y=y;
return p.matrixTransform(ctm.inverse());
};
const tl=pt(leftPx,topPx);
const br=pt(rightPx,bottomPx);

const xMin=Math.min(tl.x,br.x)+NODE_PAD;
const yMin=Math.min(tl.y,br.y)+NODE_PAD;
const xMax=Math.max(tl.x,br.x)-NODE_PAD;
const yMax=Math.max(tl.y,br.y)-NODE_PAD;

if(xMax<=xMin||yMax<=yMin)return fallback;
return{xMin,yMin,xMax,yMax};
}

function clampNode(pos){
const b=getSvgBounds();
return{
x:Math.max(b.xMin,Math.min(b.xMax,pos.x)),
y:Math.max(b.yMin,Math.min(b.yMax,pos.y))
};
}

let nodePos={
A:clampNode({x:defaults.A.x,y:defaults.A.y}),
B:clampNode({x:defaults.B.x,y:defaults.B.y}),
Y:clampNode({x:defaults.Y.x,y:defaults.Y.y})
};


function updateBitButtons(){
const g=GATES[currentGate];
btnA0.classList.toggle('active',inputA===0);
btnA1.classList.toggle('active',inputA===1);
btnB0.classList.toggle('active',inputB===0);
btnB1.classList.toggle('active',inputB===1);
rowB.style.display=g.arity===1?'none':'';
bA0.classList.toggle('active',inputA===0);
bA1.classList.toggle('active',inputA===1);
bB0.classList.toggle('active',inputB===0);
bB1.classList.toggle('active',inputB===1);
bRowB.style.display=g.arity===1?'none':'';
}

function renderCalc(){
const g=GATES[currentGate];
const out=evalGate(currentGate,inputA,inputB);
resultBig.textContent=out;
resultBig.classList.toggle('on',out===1);
resultBadge.className='badge '+(out?'good':'bad');
resultBadge.textContent=getStr(ctx,out?'lg.state.on':'lg.state.off',
out?'ON (1)':'OFF (0)');
const expr=g.arity===1?g.expr(inputA):g.expr(inputA,inputB);
resultExpr.textContent=expr+' = '+out;
const gateCfg=GATE_LIST.find(x=>x.id===currentGate);
gateDesc.textContent=getStr(ctx,gateCfg.descKey,gateCfg.name);
updateBitButtons();
logTo('logic ['+currentGate+'] '+inputA+(g.arity===2?','+inputB:'')+' → '+out);
}


function renderTable(){
const g=GATES[currentGate];
const tt=truthTable(currentGate);
tableHost.innerHTML='';

const table=el('table',{class:'lg-tt'});
const thead=el('thead');
const headerRow=el('tr');
headerRow.appendChild(el('th',{text:getStr(ctx,'lg.bit.a','A')}));
if(g.arity===2)headerRow.appendChild(el('th',{text:getStr(ctx,'lg.bit.b','B')}));
headerRow.appendChild(el('th',{text:getStr(ctx,'lg.bit.y','Y')}));
thead.appendChild(headerRow);
table.appendChild(thead);

const tbody=el('tbody');
tt.forEach(row=>{
const tr=el('tr');
row.inputs.forEach(v=>{
tr.appendChild(el('td',{
class:'lg-td-bit'+(v?' lg-bit-on':''),
text:String(v)
}));
});
tr.appendChild(el('td',{
class:'lg-td-out'+(row.out?' lg-bit-on':''),
text:String(row.out)
}));
tbody.appendChild(tr);
});
table.appendChild(tbody);
tableHost.appendChild(table);

const mts=minterms(currentGate);
const sop=simplifySOP(currentGate);
analysisBody.innerHTML='';
analysisBody.appendChild(el('div',{class:'lg-analysis-row'},[
el('span',{class:'k',text:getStr(ctx,'lg.minterms','Minterms Σm')}),
el('span',{class:'v mono',text:mts.length?'Σm('+mts.join(',')+')':'—'})
]));
analysisBody.appendChild(el('div',{class:'lg-analysis-row'},[
el('span',{class:'k',text:getStr(ctx,'lg.sop','Expresión (SOP)')}),
el('span',{class:'v mono',text:sop})
]));
analysisBody.appendChild(el('div',{class:'lg-analysis-row'},[
el('span',{class:'k',text:getStr(ctx,'lg.gateFn','Función')}),
el('span',{class:'v mono',
text:getStr(ctx,'lg.truthRows','Filas con Y=1: ')+mts.length})
]));

document.querySelectorAll('.lg-gate-chips-table .chip').forEach(c=>{
c.classList.toggle('active',c.dataset.gate===currentGate);
});
builderGateSel.value=currentGate;
}


function gateShapePath(gate){
const x=GATE_X,y=GATE_Y,w=GATE_W,h=GATE_H;
const cx=x+w,cy=y+h/2,r=h/2;
switch(gate){
case'AND':
case'NAND':

return`M ${x} ${y} L ${x+w-r} ${y} `+
`A ${r} ${r} 0 0 1 ${x+w-r} ${y+h} `+
`L ${x} ${y+h} Z`;
case'OR':
case'NOR':
case'XOR':
case'XNOR':

return`M ${x} ${y} `+
`Q ${x+w*0.18} ${cy} ${x} ${y+h} `+
`Q ${x+w*0.62} ${y+h} ${cx} ${cy} `+
`Q ${x+w*0.62} ${y} ${x} ${y} Z`;
case'NOT':
case'BUF':

return`M ${x} ${y} L ${cx} ${cy} L ${x} ${y+h} Z`;
default:
return`M ${x} ${y} L ${x+w} ${y} L ${x+w} ${y+h} L ${x} ${y+h} Z`;
}
}

function gateHasBubble(gate){
return gate==='NAND'||gate==='NOR'||gate==='XNOR'||gate==='NOT';
}

function gateHasXorInput(gate){
return gate==='XOR'||gate==='XNOR';
}

function pinPoints(arity){
const pinAX=GATE_X;
const pinAY=arity===1?GATE_CY:GATE_Y+22;
const pinBX=GATE_X;
const pinBY=GATE_Y+GATE_H-22;
const pinOutX=GATE_X+GATE_W;
const pinOutY=GATE_CY;
return{pinAX,pinAY,pinBX,pinBY,pinOutX,pinOutY};
}

function cablePathD(fromX,fromY,toX,toY){
const cx=fromX+(toX-fromX)*0.5;
return`M ${fromX} ${fromY} C ${cx} ${fromY}, ${cx} ${toY}, ${toX} ${toY}`;
}

function buildCircuitSvg(){
const g=GATES[currentGate];
const arity=g.arity;
const out=evalGate(currentGate,inputA,inputB);

const posA=nodePos.A;
const posY=nodePos.Y;
const posB=arity===2?nodePos.B:null;
const{pinAX,pinAY,pinBX,pinBY,pinOutX,pinOutY}=pinPoints(arity);

const aColor=inputA?'#22d3a6':'#5b8cff';
const bColor=inputB?'#22d3a6':'#5b8cff';
const outColor=out?'#22d3a6':'#5b8cff';

const svg=svgEl('svg',{
viewBox:`0 0 ${SVG_W} ${SVG_H}`,
class:'lg-svg',
xmlns:SVGNS
});

const defs=svgEl('defs');
const gOn=svgEl('linearGradient',{id:'gateOn',x1:'0',y1:'0',x2:'1',y2:'1'});
gOn.appendChild(svgEl('stop',{offset:'0%','stop-color':'#22d3a6'}));
gOn.appendChild(svgEl('stop',{offset:'100%','stop-color':'#5b8cff'}));
const gOff=svgEl('linearGradient',{id:'gateOff',x1:'0',y1:'0',x2:'1',y2:'1'});
gOff.appendChild(svgEl('stop',{offset:'0%','stop-color':'#3a4166'}));
gOff.appendChild(svgEl('stop',{offset:'100%','stop-color':'#2a3050'}));
defs.appendChild(gOn);defs.appendChild(gOff);
svg.appendChild(defs);

const cableA=svgEl('path',{
d:cablePathD(posA.x,posA.y,pinAX,pinAY),
stroke:aColor,'stroke-width':'2.5',fill:'none','stroke-linecap':'round'
});
svg.appendChild(cableA);

let cableB=null;
if(arity===2){
cableB=svgEl('path',{
d:cablePathD(posB.x,posB.y,pinBX,pinBY),
stroke:bColor,'stroke-width':'2.5',fill:'none','stroke-linecap':'round'
});
svg.appendChild(cableB);
}


if(gateHasXorInput(currentGate)){
const xorArc=svgEl('path',{
d:`M ${GATE_X-8} ${GATE_Y} `+
`Q ${GATE_X+8} ${GATE_CY} ${GATE_X-8} ${GATE_Y+GATE_H}`,
fill:'none',
stroke:'#fff','stroke-width':1.6,opacity:0.85
});
svg.appendChild(xorArc);
}


const gateShape=svgEl('path',{
d:gateShapePath(currentGate),
fill:out?'url(#gateOn)':'url(#gateOff)',
stroke:'#fff','stroke-width':1.6,opacity:0.95
});
svg.appendChild(gateShape);


const gateLabel=svgEl('text',{
x:GATE_X+GATE_W*0.42,
y:GATE_CY+5,
'text-anchor':'middle',
'font-size':'13',
'font-weight':'900',
fill:'#fff'
});
gateLabel.style.pointerEvents='none';
gateLabel.textContent=currentGate;
svg.appendChild(gateLabel);

const outStartX=gateHasBubble(currentGate)?pinOutX+14:pinOutX;
const cableOut=svgEl('path',{
d:cablePathD(outStartX,pinOutY,posY.x,posY.y),
stroke:outColor,'stroke-width':'2.5',fill:'none','stroke-linecap':'round'
});
svg.appendChild(cableOut);


let bubble=null;
if(gateHasBubble(currentGate)){
bubble=svgEl('circle',{
cx:pinOutX+8,cy:pinOutY,r:6,
fill:'#fff',stroke:'#fff','stroke-width':1
});
svg.appendChild(bubble);
}


const gA=svgEl('g',{class:'lg-node lg-node-a','data-node':'A'});
const circleA=svgEl('circle',{cx:posA.x,cy:posA.y,r:NODE_R,fill:aColor,opacity:0.9});
const textAVal=svgEl('text',{
x:posA.x,y:posA.y+5,'text-anchor':'middle',
'font-size':'16','font-weight':'800',fill:'#fff'
});
textAVal.style.pointerEvents='none';
textAVal.textContent=inputA;
const textALabel=svgEl('text',{
x:posA.x,y:posA.y-NODE_R-8,'text-anchor':'middle',
'font-size':'12','font-weight':'800',fill:'#a0a8c0'
});
textALabel.style.pointerEvents='none';
textALabel.textContent=getStr(ctx,'lg.bit.a','A');
gA.appendChild(circleA);gA.appendChild(textAVal);gA.appendChild(textALabel);
svg.appendChild(gA);


let gB=null,circleB=null,textBVal=null,textBLabel=null;
if(arity===2){
gB=svgEl('g',{class:'lg-node lg-node-b','data-node':'B'});
circleB=svgEl('circle',{cx:posB.x,cy:posB.y,r:NODE_R,fill:bColor,opacity:0.9});
textBVal=svgEl('text',{
x:posB.x,y:posB.y+5,'text-anchor':'middle',
'font-size':'16','font-weight':'800',fill:'#fff'
});
textBVal.style.pointerEvents='none';
textBVal.textContent=inputB;
textBLabel=svgEl('text',{
x:posB.x,y:posB.y-NODE_R-8,'text-anchor':'middle',
'font-size':'12','font-weight':'800',fill:'#a0a8c0'
});
textBLabel.style.pointerEvents='none';
textBLabel.textContent=getStr(ctx,'lg.bit.b','B');
gB.appendChild(circleB);gB.appendChild(textBVal);gB.appendChild(textBLabel);
svg.appendChild(gB);
}


const gY=svgEl('g',{class:'lg-node lg-node-y','data-node':'Y'});
const circleY=svgEl('circle',{cx:posY.x,cy:posY.y,r:NODE_R,fill:outColor,opacity:0.9});
const textYVal=svgEl('text',{
x:posY.x,y:posY.y+6,'text-anchor':'middle',
'font-size':'18','font-weight':'800',fill:'#fff'
});
textYVal.style.pointerEvents='none';
textYVal.textContent=out;
const textYLabel=svgEl('text',{
x:posY.x,y:posY.y-NODE_R-8,'text-anchor':'middle',
'font-size':'12','font-weight':'800',fill:'#a0a8c0'
});
textYLabel.style.pointerEvents='none';
textYLabel.textContent=getStr(ctx,'lg.bit.y','Y');
gY.appendChild(circleY);gY.appendChild(textYVal);gY.appendChild(textYLabel);
svg.appendChild(gY);

return{
svg,
refs:{
cableA,cableB,cableOut,bubble,
circleA,textAVal,textALabel,
circleB,textBVal,textBLabel,gB,
circleY,textYVal,textYLabel,
gateShape,gateLabel
}
};
}

function updatePositionsOnly(){
if(!refs)return;
const g=GATES[currentGate];
const arity=g.arity;
const{pinAX,pinAY,pinBX,pinBY,pinOutX,pinOutY}=pinPoints(arity);
const posA=nodePos.A;
const posY=nodePos.Y;

refs.cableA.setAttribute('d',cablePathD(posA.x,posA.y,pinAX,pinAY));
refs.circleA.setAttribute('cx',posA.x);
refs.circleA.setAttribute('cy',posA.y);
refs.textAVal.setAttribute('x',posA.x);
refs.textAVal.setAttribute('y',posA.y+5);
refs.textALabel.setAttribute('x',posA.x);
refs.textALabel.setAttribute('y',posA.y-NODE_R-8);

if(arity===2&&refs.cableB&&refs.circleB){
const posB=nodePos.B;
refs.cableB.setAttribute('d',cablePathD(posB.x,posB.y,pinBX,pinBY));
refs.circleB.setAttribute('cx',posB.x);
refs.circleB.setAttribute('cy',posB.y);
refs.textBVal.setAttribute('x',posB.x);
refs.textBVal.setAttribute('y',posB.y+5);
refs.textBLabel.setAttribute('x',posB.x);
refs.textBLabel.setAttribute('y',posB.y-NODE_R-8);
}

refs.cableOut.setAttribute('d',cablePathD(pinOutX,pinOutY,posY.x,posY.y));
refs.circleY.setAttribute('cx',posY.x);
refs.circleY.setAttribute('cy',posY.y);
refs.textYVal.setAttribute('x',posY.x);
refs.textYVal.setAttribute('y',posY.y+6);
refs.textYLabel.setAttribute('x',posY.x);
refs.textYLabel.setAttribute('y',posY.y-NODE_R-8);
}

function renderBuilder(){
const built=buildCircuitSvg();
svgRoot=built.svg;
refs=built.refs;
canvas.innerHTML='';
canvas.appendChild(svgRoot);

nodePos.A=clampNode(nodePos.A);
nodePos.B=clampNode(nodePos.B);
nodePos.Y=clampNode(nodePos.Y);
updatePositionsOnly();

const out=evalGate(currentGate,inputA,inputB);
builderOutVal.textContent=out;
builderOutVal.classList.toggle('on',out===1);

attachPointerDown();
}


const WAVE_SVG_W=520;
const WAVE_SVG_H=300;
const WAVE_LEFT=48;
const WAVE_RIGHT=WAVE_SVG_W-16;
const WAVE_TOP=26;
const WAVE_ROW_H=64;
const WAVE_GAP=14;

function waveYBase(row){
return WAVE_TOP+row*(WAVE_ROW_H+WAVE_GAP)+WAVE_ROW_H;
}

function waveYHigh(row){
return waveYBase(row)-WAVE_ROW_H*0.72;
}

function waveStepPx(){
return(WAVE_RIGHT-WAVE_LEFT)/wavePeriod;
}

function waveValueAt(gate,cycle,which){
const a=(Math.floor(cycle)%2===0)?0:1;
const b=(Math.floor(cycle/2)%2===0)?0:1;
if(which==='a')return a;
if(which==='b')return b;
return evalGate(gate,a,b);
}

function wavePath(gate,which){
const step=waveStepPx();
const rowMap={a:0,b:1,y:2};
const row=rowMap[which];
if(which==='b'&&GATES[gate].arity===1)return'';
const yLow=waveYBase(row);
const yHigh=waveYHigh(row);
let d='';
let prev=null;
for(let i=0;i<wavePeriod;i++){
const x0=WAVE_LEFT+i*step;
const x1=x0+step;
const v=waveValueAt(gate,i,which);
const y=v?yHigh:yLow;
if(prev===null){
d+=`M ${x0} ${y}`;
}else{
d+=` L ${x0} ${prev?yHigh:yLow} L ${x0} ${y}`;
}
d+=` L ${x1} ${y}`;
prev=v;
}
return d;
}

function buildWaveSvg(){
const gate=currentGate;
const arity=GATES[gate].arity;
const step=waveStepPx();
const showB=arity===2&&waveShowB;
const rows=[];
if(waveShowA)rows.push({key:'a',label:getStr(ctx,'lg.bit.a','A')});
if(showB)rows.push({key:'b',label:getStr(ctx,'lg.bit.b','B')});
if(waveShowY)rows.push({key:'y',label:getStr(ctx,'lg.bit.y','Y')});

const svg=svgEl('svg',{
viewBox:`0 0 ${WAVE_SVG_W} ${WAVE_SVG_H}`,
class:'lg-wave-svg',
xmlns:SVGNS
});

const gridG=svgEl('g');
for(let i=0;i<=wavePeriod;i++){
const x=WAVE_LEFT+i*step;
gridG.appendChild(svgEl('line',{
x1:x,y1:WAVE_TOP-6,x2:x,y2:WAVE_SVG_H-38,
class:'wave-grid'
}));
}
rows.forEach((_,idx)=>{
gridG.appendChild(svgEl('line',{
x1:WAVE_LEFT,y1:waveYBase(idx),x2:WAVE_RIGHT,y2:waveYBase(idx),
class:'wave-axis'
}));
gridG.appendChild(svgEl('line',{
x1:WAVE_LEFT,y1:waveYHigh(idx),x2:WAVE_RIGHT,y2:waveYHigh(idx),
class:'wave-grid'
}));
});
const cursorX=WAVE_LEFT+waveCursor*step;
gridG.appendChild(svgEl('line',{
x1:cursorX,y1:WAVE_TOP-6,x2:cursorX,y2:WAVE_SVG_H-38,
class:'wave-marker wave-marker-active'
}));
svg.appendChild(gridG);

rows.forEach((r,idx)=>{
const t=svgEl('text',{
x:WAVE_LEFT-10,y:waveYHigh(idx)+WAVE_ROW_H*0.36+4,
'text-anchor':'end',
class:'wave-label-title'
});
t.textContent=r.label;
svg.appendChild(t);
});

rows.forEach((r,idx)=>{
const path=svgEl('path',{
d:wavePath(gate,r.key),
class:'wave-line wave-line-'+r.key
});
svg.appendChild(path);
});

const timeY=WAVE_SVG_H-24;
svg.appendChild(svgEl('line',{
x1:WAVE_LEFT,y1:timeY-4,x2:WAVE_RIGHT,y2:timeY-4,
class:'wave-axis'
}));
for(let i=0;i<=wavePeriod;i++){
const x=WAVE_LEFT+i*step;
const sub=String(i).replace(/\d/g,d=>'₀₁₂₃₄₅₆₇₈₉'[d]);
const t=svgEl('text',{
x:x,y:timeY+10,'text-anchor':'middle',
class:'wave-time-label'
});
t.textContent='t'+sub;
svg.appendChild(t);
}

const miniX=WAVE_RIGHT-108;
const miniY=WAVE_SVG_H-34;
const miniGate=svgEl('rect',{
x:miniX+22,y:miniY-30,width:38,height:26,rx:7,
class:'wave-mini-gate'+(evalGate(gate,1,1)?' on':'')
});
svg.appendChild(miniGate);
const miniLabel=svgEl('text',{
x:miniX+41,y:miniY-13,'text-anchor':'middle',
class:'wave-mini-label'
});
miniLabel.textContent=gate;
svg.appendChild(miniLabel);
const inA=svgEl('circle',{cx:miniX+10,cy:miniY-22,r:4,
class:'wave-mini-node'});
const inB=arity===2?svgEl('circle',{cx:miniX+10,cy:miniY-8,r:4,
class:'wave-mini-node'}):null;
const outY=svgEl('circle',{cx:miniX+72,cy:miniY-17,r:4,
class:'wave-mini-node'+(evalGate(gate,1,1)?' on':'')});
svg.appendChild(inA);
if(inB)svg.appendChild(inB);
svg.appendChild(outY);
svg.appendChild(svgEl('path',{
d:`M ${miniX+14} ${miniY-22} L ${miniX+22} ${miniY-22}`,
class:'wave-mini-cable'
}));
if(inB)svg.appendChild(svgEl('path',{
d:`M ${miniX+14} ${miniY-8} L ${miniX+22} ${miniY-8}`,
class:'wave-mini-cable'
}));
svg.appendChild(svgEl('path',{
d:`M ${miniX+60} ${miniY-17} L ${miniX+68} ${miniY-17}`,
class:'wave-mini-cable'+(evalGate(gate,1,1)?' on':'')
}));

return svg;
}

function renderWave(){
const gate=currentGate;
const arity=GATES[gate].arity;
waveHost.innerHTML='';
waveHost.appendChild(buildWaveSvg());

const outVal=evalGate(gate,1,1);
rdA.querySelector('.v').textContent='0/1';
rdB.querySelector('.v').textContent=arity===2?'0/1':'—';
rdY.querySelector('.v').textContent=outVal;
rdY.querySelector('.v').classList.toggle('on',outVal===1);
rdGate.querySelector('.v').textContent=gate;

waveToolbar.querySelectorAll('.chip[data-wave]').forEach(c=>{
const k=c.dataset.wave;
c.classList.toggle('active',k==='a'?waveShowA:k==='b'?waveShowB:waveShowY);
});

if(typeof renderMaker==='function')renderMaker();
}

waveToolbar.addEventListener('click',e=>{
const chip=e.target.closest('.chip');
if(!chip)return;
if(chip.dataset.wave){
const k=chip.dataset.wave;
if(k==='a')waveShowA=!waveShowA;
if(k==='b')waveShowB=!waveShowB;
if(k==='y')waveShowY=!waveShowY;
}else if(chip.dataset.period){
wavePeriod=parseInt(chip.dataset.period,10);
waveToolbar.querySelectorAll('.chip[data-period]').forEach(c=>{
c.classList.toggle('active',c===chip);
});
}
renderWave();
});


function renderAll(){
renderCalc();
renderTable();
renderBuilder();
renderWave();
renderMaker();
}


function clientToSvg(clientX,clientY){
if(!svgRoot)return{x:0,y:0};
const pt=svgRoot.createSVGPoint();
pt.x=clientX;pt.y=clientY;
const ctm=svgRoot.getScreenCTM();
if(!ctm)return{x:0,y:0};
const p=pt.matrixTransform(ctm.inverse());
return{x:p.x,y:p.y};
}

let rafPending=false;
let pendingMove=null;

function onPointerDown(ev){
const nodeG=ev.target.closest('.lg-node');
if(!nodeG)return;
ev.preventDefault();
ev.stopPropagation();

const nodeId=nodeG.dataset.node;
const pt=clientToSvg(ev.clientX,ev.clientY);
const start=nodePos[nodeId];

dragState={
nodeId,
offsetX:pt.x-start.x,
offsetY:pt.y-start.y,
pointerId:ev.pointerId,
nodeG
};

try{nodeG.setPointerCapture(ev.pointerId);}catch(_){}
nodeG.classList.add('dragging');
}

function onPointerMove(ev){
if(!dragState)return;
if(ev.pointerId!==dragState.pointerId)return;
ev.preventDefault();

const pt=clientToSvg(ev.clientX,ev.clientY);
pendingMove={
nodeId:dragState.nodeId,
pos:clampNode({
x:pt.x-dragState.offsetX,
y:pt.y-dragState.offsetY
})
};

if(!rafPending){
rafPending=true;
requestAnimationFrame(flushMove);
}
}

function flushMove(){
rafPending=false;
if(!pendingMove)return;
const{nodeId,pos}=pendingMove;
pendingMove=null;
nodePos[nodeId]=pos;
updatePositionsOnly();
}

function onPointerUp(ev){
if(!dragState)return;
if(ev.pointerId!==dragState.pointerId)return;
try{dragState.nodeG.classList.remove('dragging');}catch(_){}
dragState=null;
}

function attachPointerDown(){
if(!svgRoot)return;
svgRoot.addEventListener('pointerdown',onPointerDown);
}

document.addEventListener('pointermove',onPointerMove,{passive:false});
document.addEventListener('pointerup',onPointerUp);
document.addEventListener('pointercancel',onPointerUp);


let resizeRaf=null;
function onResize(){
if(resizeRaf)return;
resizeRaf=requestAnimationFrame(()=>{
resizeRaf=null;
if(!svgRoot)return;
nodePos.A=clampNode(nodePos.A);
nodePos.B=clampNode(nodePos.B);
nodePos.Y=clampNode(nodePos.Y);
updatePositionsOnly();
});
}
window.addEventListener('resize',onResize);


modeSeg.addEventListener('click',e=>{
const btn=e.target.closest('.seg-btn');
if(!btn||btn.dataset.mode===mode)return;
mode=btn.dataset.mode;
modeSeg.querySelectorAll('.seg-btn').forEach(b=>{
b.classList.toggle('active',b===btn);
});
panelCalc.style.display=mode==='calc'?'':'none';
panelTable.style.display=mode==='table'?'':'none';
panelBuilder.style.display=mode==='builder'?'':'none';
panelWave.style.display=mode==='wave'?'':'none';
if(mode==='table')renderTable();
if(mode==='builder')renderBuilder();
if(mode==='wave'){renderWave();renderMaker();}
});

gateChips.addEventListener('click',e=>{
const chip=e.target.closest('.chip');
if(!chip||chip.dataset.gate===currentGate)return;
currentGate=chip.dataset.gate;
gateChips.querySelectorAll('.chip').forEach(c=>{
c.classList.toggle('active',c===chip);
});
tableGateChips.querySelectorAll('.chip').forEach(c=>{
c.classList.toggle('active',c.dataset.gate===currentGate);
});
builderGateSel.value=currentGate;
renderAll();
});

tableGateChips.addEventListener('click',e=>{
const chip=e.target.closest('.chip');
if(!chip||chip.dataset.gate===currentGate)return;
currentGate=chip.dataset.gate;
gateChips.querySelectorAll('.chip').forEach(c=>{
c.classList.toggle('active',c.dataset.gate===currentGate);
});
tableGateChips.querySelectorAll('.chip').forEach(c=>{
c.classList.toggle('active',c===chip);
});
builderGateSel.value=currentGate;
renderAll();
});

rowA.addEventListener('click',e=>{
const b=e.target.closest('.lg-bit-btn');
if(!b)return;
inputA=parseInt(b.dataset.val,10);
renderAll();
});
rowB.addEventListener('click',e=>{
const b=e.target.closest('.lg-bit-btn');
if(!b)return;
inputB=parseInt(b.dataset.val,10);
renderAll();
});

bRowA.addEventListener('click',e=>{
const b=e.target.closest('.lg-bit-btn');
if(!b)return;
inputA=parseInt(b.dataset.val,10);
renderAll();
});
bRowB.addEventListener('click',e=>{
const b=e.target.closest('.lg-bit-btn');
if(!b)return;
inputB=parseInt(b.dataset.val,10);
renderAll();
});

builderGateSel.addEventListener('change',()=>{
currentGate=builderGateSel.value;
gateChips.querySelectorAll('.chip').forEach(c=>{
c.classList.toggle('active',c.dataset.gate===currentGate);
});
tableGateChips.querySelectorAll('.chip').forEach(c=>{
c.classList.toggle('active',c.dataset.gate===currentGate);
});
renderAll();
});


renderAll();

return{
refresh(){
if(mode==='builder')renderBuilder();
else if(mode==='wave'){renderWave();renderMaker();}
else renderAll();
},
destroy(){
document.removeEventListener('pointermove',onPointerMove);
document.removeEventListener('pointerup',onPointerUp);
document.removeEventListener('pointercancel',onPointerUp);
window.removeEventListener('resize',onResize);
dragState=null;
refs=null;
svgRoot=null;
root.remove();
}
};
}


window.NibblyModules=window.NibblyModules||{};
window.NibblyModules['logic-gates']={
id:'logic-gates',version:'1.7.0',init:initLogicGates
};

if(console&&console.debug){
console.debug('[Nibbly] logic-gates.js loaded — Logic Gates expansion ready (waveforms + wave maker + diagram export, 60 FPS)');
}
})();