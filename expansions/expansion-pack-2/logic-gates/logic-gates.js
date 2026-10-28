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

const SVGNS='http://www.w3.org/2000/svg';
function svgEl(tag,attrs){
const n=document.createElementNS(SVGNS,tag);
if(attrs)for(const k in attrs){
if(attrs[k]===undefined||attrs[k]===null)continue;
n.setAttribute(k,attrs[k]);
}
return n;
}

/* ══════════════ LÓGICA PURA ══════════════ */
const GATES={
AND:  {fn:(a,b)=>a&b,        arity:2, expr:(a,b)=>`(${a}·${b})`},
OR:   {fn:(a,b)=>a|b,        arity:2, expr:(a,b)=>`(${a}+${b})`},
XOR:  {fn:(a,b)=>a^b,        arity:2, expr:(a,b)=>`(${a}⊕${b})`},
NAND: {fn:(a,b)=>((a&b)?0:1),arity:2, expr:(a,b)=>`¬(${a}·${b})`},
NOR:  {fn:(a,b)=>((a|b)?0:1),arity:2, expr:(a,b)=>`¬(${a}+${b})`},
XNOR: {fn:(a,b)=>((a^b)?0:1),arity:2, expr:(a,b)=>`¬(${a}⊕${b})`},
NOT:  {fn:(a)=>a?0:1,        arity:1, expr:(a)=>`¬${a}`},
BUF:  {fn:(a)=>a,            arity:1, expr:(a)=>`${a}`}
};

const GATE_LIST=[
{id:'AND', name:'AND',  descKey:'lg.gate.and.desc'},
{id:'OR',  name:'OR',   descKey:'lg.gate.or.desc'},
{id:'XOR', name:'XOR',  descKey:'lg.gate.xor.desc'},
{id:'NAND',name:'NAND', descKey:'lg.gate.nand.desc'},
{id:'NOR', name:'NOR',  descKey:'lg.gate.nor.desc'},
{id:'XNOR',name:'XNOR', descKey:'lg.gate.xnor.desc'},
{id:'NOT', name:'NOT',  descKey:'lg.gate.not.desc'},
{id:'BUF', name:'BUFFER',descKey:'lg.gate.buf.desc'}
];

function evalGate(gate,a,b){
const g=GATES[gate];
if(!g)return 0;
return g.arity===1?g.fn(a):g.fn(a,b);
}

function truthTable(gate){
const g=GATES[gate];
if(g.arity===1){
return [0,1].map(a=>({inputs:[a],out:g.fn(a)}));
}
return [[0,0],[0,1],[1,0],[1,1]].map(([a,b])=>({
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
if(mt.length===0)return '0';
const g=GATES[gate];
if(g.arity===1){
return mt[0]===1?'A':'¬A';
}
if(mt.length===4)return '1';
const all=[0,1,2,3];
const terms=[];
if(mt.length===1){
const idx=mt[0];
const a=(idx>>1)&1, b=idx&1;
terms.push((a?'A':'¬A')+(b?'B':'¬B'));
return terms[0];
}
if(mt.length===3){
const missing=all.find(x=>!mt.includes(x));
const a=(missing>>1)&1, b=missing&1;
return '¬'+(a?'A':'¬A')+(b?'B':'¬B');
}
const pairs=[[0,1],[0,2],[1,3],[2,3]];
const used=new Set();
const termsOut=[];
mt.forEach(m=>{
for(const [x,y] of pairs){
if((x===m&&mt.includes(y))||(y===m&&mt.includes(x))){
const key=Math.min(x,y)+'-'+Math.max(x,y);
if(used.has(key))return;
used.add(key);
const xa=(x>>1)&1, xb=x&1;
const ya=(y>>1)&1, yb=y&1;
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

/* ══════════════ INIT ══════════════ */
function initLogicGates(container,ctx){
const root=el('section',{class:'nib-main nib-logic-gates'});
container.appendChild(root);

let currentGate='AND';
let inputA=0,inputB=0;
let mode='calc';

/* ───────── Barra de modo ───────── */
const modeSeg=el('div',{class:'seg'},[
el('button',{class:'seg-btn active',type:'button',
dataset:{mode:'calc'},
text:getStr(ctx,'lg.mode.calc','Calculadora')}),
el('button',{class:'seg-btn',type:'button',
dataset:{mode:'table'},
text:getStr(ctx,'lg.mode.table','Tabla de verdad')}),
el('button',{class:'seg-btn',type:'button',
dataset:{mode:'builder'},
text:getStr(ctx,'lg.mode.builder','Constructor')})
]);
root.appendChild(modeSeg);

/* ══════════════ MODO CALCULADORA ══════════════ */
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

/* ══════════════ MODO TABLA ══════════════ */
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

/* ══════════════ MODO CONSTRUCTOR ══════════════ */
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

/* ══════════════ GEOMETRÍA DEL SVG ══════════════ */
const SVG_W=360;
const SVG_H=240;
const NODE_R=18;
const NODE_PAD=NODE_R+4;

const GATE_X=160, GATE_Y=135, GATE_W=70, GATE_H=70;
const GATE_CY=GATE_Y+GATE_H/2;

const defaults={
A:{x:40,y:100},
B:{x:40,y:170},
Y:{x:SVG_W-25,y:GATE_CY}
};

let svgRoot=null;
let refs=null;
let dragState=null;

/* ══════════════ LÍMITES REALES DEL ÁREA DIBUJADA ══════════════ */
/* Calcula el rectángulo donde el viewBox se dibuja realmente dentro
   del <svg> renderizado, respetando preserveAspectRatio="xMidYMid meet". */
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
/* SVG más ancho que el viewBox → bandas a los lados (pillarbox) */
drawH=rect.height;
drawW=drawH*vbRatio;
offsetX=(rect.width-drawW)/2;
offsetY=0;
}else{
/* SVG más alto que el viewBox → bandas arriba/abajo (letterbox) */
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

/* ══════════════ RENDER CALC ══════════════ */
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

/* ══════════════ RENDER TABLE ══════════════ */
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

/* ══════════════ CONSTRUCTOR SVG ══════════════ */
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

const gateRect=svgEl('rect',{
x:GATE_X,y:GATE_Y,width:GATE_W,height:GATE_H,rx:14,
fill:out?'url(#gateOn)':'url(#gateOff)',
stroke:'#fff','stroke-width':1.5,opacity:0.95
});
svg.appendChild(gateRect);

const gateLabel=svgEl('text',{
x:GATE_X+GATE_W/2,
y:GATE_Y+GATE_H/2+6,
'text-anchor':'middle',
'font-size':'18',
'font-weight':'900',
fill:'#fff'
});
gateLabel.style.pointerEvents='none';
gateLabel.textContent=currentGate;
svg.appendChild(gateLabel);

const cableOut=svgEl('path',{
d:cablePathD(pinOutX,pinOutY,posY.x,posY.y),
stroke:outColor,'stroke-width':'2.5',fill:'none','stroke-linecap':'round'
});
svg.appendChild(cableOut);

let bubble=null;
if(['NAND','NOR','XNOR','NOT'].includes(currentGate)){
bubble=svgEl('circle',{
cx:pinOutX+10,cy:pinOutY,r:6,fill:'#fff',stroke:'#fff','stroke-width':1
});
svg.appendChild(bubble);
}

/* Nodo A */
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

/* Nodo B */
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

/* Nodo Y */
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
gateRect,gateLabel
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

/* Saneo tras insertar en DOM: ahora getSvgBounds es preciso */
nodePos.A=clampNode(nodePos.A);
nodePos.B=clampNode(nodePos.B);
nodePos.Y=clampNode(nodePos.Y);
updatePositionsOnly();

const out=evalGate(currentGate,inputA,inputB);
builderOutVal.textContent=out;
builderOutVal.classList.toggle('on',out===1);

attachPointerDown();
}

function renderAll(){
renderCalc();
renderTable();
renderBuilder();
}

/* ══════════════ DRAG ══════════════ */
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

/* ══════════════ RESIZE → RE-CLAMP ══════════════ */
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

/* ══════════════ EVENTOS UI ══════════════ */
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
if(mode==='table')renderTable();
if(mode==='builder')renderBuilder();
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

/* ══════════════ INICIALIZACIÓN ══════════════ */
renderAll();

return{
refresh(){
if(mode==='builder')renderBuilder();
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

/* ══════════════ REGISTRO ══════════════ */
window.NibblyModules=window.NibblyModules||{};
window.NibblyModules['logic-gates']={
id:'logic-gates',version:'1.4.0',init:initLogicGates
};

if(console&&console.debug){
console.debug('[Nibbly] logic-gates.js loaded — Logic Gates expansion ready (bounds-fixed, 60 FPS)');
}
})();