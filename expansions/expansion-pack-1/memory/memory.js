(function(){
'use strict';
if(window.NibblyModules&&window.NibblyModules.memory)return;

const SIZE=4096;
const ADDR_MAX=0xFFF;
const PAGE=256;
const PAGES=SIZE/PAGE;
const BYTES_ROW=16;
const ROWS_PAGE=PAGE/BYTES_ROW;
const STORAGE_KEY='nibbly-memory-v1';

function loadMemory(){
try{
const raw=localStorage.getItem(STORAGE_KEY);
if(!raw)return new Uint8Array(SIZE);
const arr=JSON.parse(raw);
if(!Array.isArray(arr)||arr.length!==SIZE)return new Uint8Array(SIZE);
return new Uint8Array(arr);
}catch(_){return new Uint8Array(SIZE);}
}
function saveMemory(mem){
try{localStorage.setItem(STORAGE_KEY,JSON.stringify(Array.from(mem)));}
catch(_){}
}

function hex2(n){return n.toString(16).toUpperCase().padStart(2,'0');}
function hex3(n){return n.toString(16).toUpperCase().padStart(3,'0');}
function parseAddr(s){
s=String(s).trim().replace(/^0x/i,'');
if(!/^[0-9a-fA-F]{1,3}$/.test(s))return null;
const n=parseInt(s,16);
return(n>=0&&n<=ADDR_MAX)?n:null;
}
function parseVal(s){
s=String(s).trim().replace(/^0x/i,'');
if(!/^[0-9a-fA-F]{1,2}$/.test(s))return null;
const n=parseInt(s,16);
return(n>=0&&n<=0xFF)?n:null;
}
function el(tag,attrs,children){
const n=document.createElement(tag);
if(attrs){
for(const k in attrs){
const v=attrs[k];
if(k==='class')n.className=v;
else if(k==='text')n.textContent=v;
else if(k==='html')n.innerHTML=v;
else if(k==='dataset')Object.assign(n.dataset,v);
else if(k.startsWith('on')&&typeof v==='function'){
n.addEventListener(k.slice(2).toLowerCase(),v);
}else if(v===undefined||v===null||v===false){
continue;
}else{
n.setAttribute(k,v);
}
}
}
if(children)(Array.isArray(children)?children:[children])
.forEach(c=>{if(c!=null)n.appendChild(
typeof c==='string'?document.createTextNode(c):c);});
return n;
}

function icon(name,size){
if(window.NibblyIcons){
const html=window.NibblyIcons.get(name,{size:size||16});
if(html)return html;
}
return'';
}

function init(container,ctx){
if(!container)throw new Error('memory.init: container required');

const T=(k,fb)=>{
if(ctx&&typeof ctx.getString==='function'){
const v=ctx.getString(k);
if(v&&v!==k)return v;
}
return fb;
};
const log=msg=>{
if(window.NibblyApp&&typeof window.NibblyApp.log==='function'){
window.NibblyApp.log(msg);
}
};

let memory=loadMemory();
let currentPage=0;
let lastAddress=-1;
let saveTimer=null;
const scheduleSave=()=>{
clearTimeout(saveTimer);
saveTimer=setTimeout(()=>saveMemory(memory),400);
};

const root=el('section',{class:'nib-memory'});
container.appendChild(root);

const card1=el('div',{class:'card'});
card1.appendChild(el('div',{class:'card-head'},[
el('span',{class:'card-title',
html:icon('memory',18)+' '+T('memory.title','Memory Simulation')})
]));

const addrInput=el('input',{
class:'input mono',type:'text',maxlength:'4',
placeholder:'000',autocomplete:'off',spellcheck:'false',
autocorrect:'off',autocapitalize:'characters'
});
card1.appendChild(el('div',{},[
el('label',{class:'lbl',
text:T('memory.address','Address (hex 000–FFF)')}),
addrInput
]));

const valueInput=el('input',{
class:'input mono',type:'text',maxlength:'3',
placeholder:'00',autocomplete:'off',spellcheck:'false',
autocorrect:'off',autocapitalize:'characters'
});
card1.appendChild(el('div',{style:'margin-top:12px;'},[
el('label',{class:'lbl',
text:T('memory.value','Value (hex 00–FF)')}),
valueInput
]));

const readBtn=el('button',{
class:'btn-primary',type:'button',
html:icon('search',16)+' '+T('memory.read','Read')
});
const writeBtn=el('button',{
class:'btn-primary',type:'button',
html:icon('pencil',16)+' '+T('memory.write','Write')
});
card1.appendChild(el('div',{class:'dual',style:'margin-top:12px;'},
[readBtn,writeBtn]));

const resultValue=el('span',{class:'v mono',text:'—'});
card1.appendChild(el('div',{
class:'outline-row',style:'margin-top:14px;'
},[
el('span',{class:'k',text:T('memory.result','Result')}),
resultValue
]));

const errorEl=el('div',{class:'error'});
card1.appendChild(errorEl);
root.appendChild(card1);

const card2=el('div',{class:'card'});
card2.appendChild(el('div',{class:'card-head'},[
el('span',{class:'card-title',
html:icon('stats',18)+' '+T('memory.stats','Memory stats')})
]));

const statsGrid=el('div',{class:'mem-stats'});
const statUsedEl=el('div',{class:'mem-stat-v mono',text:'0'});
const statCell=(label,valueEl)=>el('div',{class:'mem-stat'},[
el('div',{class:'mem-stat-l',text:label}),
valueEl
]);
statsGrid.appendChild(statCell(
T('memory.total','Total localities'),
el('div',{class:'mem-stat-v mono',text:String(SIZE)})
));
statsGrid.appendChild(statCell(
T('memory.addressRange','Address range'),
el('div',{class:'mem-stat-v mono',text:'000 – '+hex3(ADDR_MAX)})
));
statsGrid.appendChild(statCell(
T('memory.size','Addressable size'),
el('div',{class:'mem-stat-v mono',text:'4 KB'})
));
statsGrid.appendChild(statCell(
T('memory.used','Used'),statUsedEl
));
card2.appendChild(statsGrid);
card2.appendChild(el('div',{class:'hint',
text:T('memory.hint',
'4096 localities (0000–0FFF) = 4 KB addressable memory. Each byte is 8 bits (0x00–0xFF).')}));
root.appendChild(card2);

const card3=el('div',{class:'card'});

const prevBtn=el('button',{type:'button',text:'◀'});
const nextBtn=el('button',{type:'button',text:'▶'});
const pageInfoEl=el('span',{class:'mem-page-info',
text:'Page 1/'+PAGES});
card3.appendChild(el('div',{class:'mem-pager'},
[prevBtn,pageInfoEl,nextBtn]));

const jumpInput=el('input',{
class:'input mono',type:'text',maxlength:'4',
placeholder:'FFF',autocomplete:'off',spellcheck:'false'
});
const jumpBtn=el('button',{class:'btn-ghost',type:'button',
text:T('memory.jumpBtn','Go')});
card3.appendChild(el('div',{
style:'margin-bottom:12px;display:flex;gap:8px;align-items:flex-end;'
},[
el('div',{style:'flex:1;'},[
el('label',{class:'lbl',style:'margin-bottom:4px;',
text:T('memory.jump','Jump to address')}),
jumpInput
]),
jumpBtn
]));

const dump=el('div',{class:'mem-dump'});
card3.appendChild(el('div',{class:'mem-dump-wrap'},[dump]));
root.appendChild(card3);

const card4=el('div',{class:'card'});
card4.appendChild(el('div',{class:'card-head'},[
el('span',{class:'card-title',
html:icon('adjust',18)+' '+T('memory.bulk','Bulk actions')})
]));

const fillBtn=el('button',{class:'btn-ghost',type:'button',
html:icon('brush',16)+' '+T('memory.fill','Fill all with value')});
const clearBtn=el('button',{class:'btn-ghost',type:'button',
html:icon('trash',16)+' '+T('memory.clearAll','Clear all (00)')});
card4.appendChild(el('div',{class:'dual'},[fillBtn,clearBtn]));
root.appendChild(card4);

function countUsed(){
let c=0;
for(let i=0;i<memory.length;i++)if(memory[i]!==0)c++;
return c;
}

function renderStats(){
statUsedEl.textContent=countUsed()+' / '+SIZE;
}

function renderGrid(){
dump.innerHTML='';
const startAddr=currentPage*PAGE;
const endAddr=startAddr+PAGE;

for(let row=0;row<ROWS_PAGE;row++){
const rowAddr=startAddr+row*BYTES_ROW;
const rowEl=el('div',{class:'mem-row'});
rowEl.appendChild(el('span',{
class:'mem-addr',text:hex3(rowAddr)+':'
}));
for(let col=0;col<BYTES_ROW;col++){
const addr=rowAddr+col;
if(addr>=endAddr){
rowEl.appendChild(el('span',{class:'mem-cell empty',text:''}));
continue;
}
const val=memory[addr];
rowEl.appendChild(el('span',{
class:'mem-cell'+
(val!==0?' nonzero':'')+
(addr===lastAddress?' active':''),
dataset:{addr:String(addr)},
title:hex3(addr)+' = 0x'+hex2(val),
text:hex2(val)
}));
}
dump.appendChild(rowEl);
}

prevBtn.disabled=currentPage===0;
nextBtn.disabled=currentPage===PAGES-1;
pageInfoEl.textContent='Page '+(currentPage+1)+'/'+PAGES+
'  ·  '+hex3(currentPage*PAGE)+' – '+
hex3(currentPage*PAGE+PAGE-1);
}

function scrollToAddress(addr){
lastAddress=addr;
const page=Math.floor(addr/PAGE);
if(page!==currentPage){
currentPage=page;
renderGrid();
}else{
dump.querySelectorAll('.mem-cell.active')
.forEach(c=>c.classList.remove('active'));
const cell=dump.querySelector('[data-addr="'+addr+'"]');
if(cell)cell.classList.add('active');
}
setTimeout(()=>{
const cell=dump.querySelector('[data-addr="'+addr+'"]');
if(cell)cell.scrollIntoView({block:'nearest',behavior:'smooth'});
},30);
}

function showError(msg){
errorEl.textContent=msg;
errorEl.classList.add('show');
}
function clearError(){
errorEl.textContent='';
errorEl.classList.remove('show');
}

function doRead(){
clearError();
const addr=parseAddr(addrInput.value);
if(addr===null){
showError(T('memory.err.address',
'Invalid address. Use 000–FFF (hexadecimal).'));
return;
}
const val=memory[addr];
resultValue.textContent='0x'+hex2(val)+'  ('+val+')';
scrollToAddress(addr);
log('memory read: 0x'+hex3(addr)+' → 0x'+hex2(val));
}

function doWrite(){
clearError();
const addr=parseAddr(addrInput.value);
if(addr===null){
showError(T('memory.err.address',
'Invalid address. Use 000–FFF (hexadecimal).'));
return;
}
const val=parseVal(valueInput.value);
if(val===null){
showError(T('memory.err.value',
'Invalid value. Use 00–FF (hexadecimal).'));
return;
}
memory[addr]=val;
scheduleSave();
resultValue.textContent='0x'+hex2(val)+' → ['+hex3(addr)+']';
scrollToAddress(addr);
renderStats();
const cell=dump.querySelector('[data-addr="'+addr+'"]');
if(cell){
cell.textContent=hex2(val);
cell.classList.toggle('nonzero',val!==0);
cell.classList.add('active');
}
log('memory write: 0x'+hex2(val)+' → 0x'+hex3(addr));
}

function doFill(){
clearError();
const val=parseVal(valueInput.value);
if(val===null){
showError(T('memory.err.value',
'Invalid value. Use 00–FF (hexadecimal).'));
return;
}
memory.fill(val);
scheduleSave();
renderStats();
renderGrid();
resultValue.textContent='Filled all with 0x'+hex2(val);
log('memory fill: all = 0x'+hex2(val));
}

function doClear(){
memory.fill(0);
scheduleSave();
renderStats();
renderGrid();
lastAddress=-1;
resultValue.textContent='Cleared all (0x00)';
log('memory clear: all = 0x00');
}

function goToPage(page){
page=Math.max(0,Math.min(PAGES-1,page));
if(page===currentPage)return;
currentPage=page;
renderGrid();
}

function doJump(){
clearError();
const addr=parseAddr(jumpInput.value);
if(addr===null){
showError(T('memory.err.address',
'Invalid address. Use 000–FFF (hexadecimal).'));
return;
}
currentPage=Math.floor(addr/PAGE);
renderGrid();
scrollToAddress(addr);
addrInput.value=hex3(addr);
}

readBtn.addEventListener('click',doRead);
writeBtn.addEventListener('click',doWrite);
fillBtn.addEventListener('click',doFill);
clearBtn.addEventListener('click',doClear);
prevBtn.addEventListener('click',()=>goToPage(currentPage-1));
nextBtn.addEventListener('click',()=>goToPage(currentPage+1));
jumpBtn.addEventListener('click',doJump);

addrInput.addEventListener('keydown',e=>{
if(e.key==='Enter')doRead();
});
valueInput.addEventListener('keydown',e=>{
if(e.key==='Enter')doWrite();
});
jumpInput.addEventListener('keydown',e=>{
if(e.key==='Enter')doJump();
});

dump.addEventListener('click',e=>{
const cell=e.target.closest('.mem-cell[data-addr]');
if(!cell)return;
const addr=parseInt(cell.dataset.addr,10);
addrInput.value=hex3(addr);
scrollToAddress(addr);
});

renderStats();
renderGrid();

return{
refresh:()=>{renderStats();renderGrid();},
destroy:()=>{
clearTimeout(saveTimer);
saveMemory(memory);
root.remove();
}
};
}

window.NibblyModules=window.NibblyModules||{};
window.NibblyModules.memory={
id:'memory',
version:'2.0.15',
init,
_helpers:{SIZE,ADDR_MAX,PAGE,PAGES,hex2,hex3,parseAddr,parseVal}
};
window.NibblyMemory=window.NibblyModules.memory;

if(console&&console.debug){
console.debug('[Nibbly] memory.js loaded → window.NibblyModules.memory (v2.0.15)');
}
})();