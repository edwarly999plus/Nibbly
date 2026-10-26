(function(){
'use strict';
if(window.NibblyModules&&window.NibblyModules.range)return;

const DIGITS='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const MAX_ENTRIES=100000;
const PAGE_SIZE=100;
const COPY_WARN_AT=10000;
const CSV_CHUNK=5000;

const FROM_BASES=[
{id:'2',label:'Binary (2)'},
{id:'8',label:'Octal (8)'},
{id:'10',label:'Decimal (10)'},
{id:'16',label:'Hex (16)'},
{id:'36',label:'Base 36'}
];
const TO_BASES=FROM_BASES.concat([
{id:'bcd',label:'BCD'},
{id:'asc',label:'ASCII'}
]);

function toBaseStr(n,base){
if(n===0n)return'0';
const B=BigInt(base);
const neg=n<0n;
let v=neg?-n:n;
let out='';
while(v>0n){
out=DIGITS[Number(v%B)]+out;
v=v/B;
}
return(neg?'-':'')+out;
}
function parseInBase(str,base){
let s=String(str).trim().toUpperCase().replace(/[\s_,]/g,'');
if(!s)return null;
let neg=false;
if(s[0]==='-'){neg=true;s=s.slice(1);}
if(!s)return null;
let v=0n;
const B=BigInt(base);
for(let i=0;i<s.length;i++){
const d=DIGITS.indexOf(s[i]);
if(d<0||d>=base)return null;
v=v*B+BigInt(d);
}
return neg?-v:v;
}
function toBcd(n){
const s=(n<0n?-n:n).toString(10);
const parts=[];
for(let i=0;i<s.length;i++){
parts.push((s.charCodeAt(i)-48).toString(2).padStart(4,'0'));
}
return(n<0n?'-':'')+parts.join(' ');
}
function toAscii(n){
const v=Number(n);
if(!isFinite(v)||v<0||v>0x10FFFF)return'—';
if(v>=0xD800&&v<=0xDFFF)return'—';
if(v<32){
const names=['NUL','SOH','STX','ETX','EOT','ENQ','ACK','BEL','BS','HT',
'LF','VT','FF','CR','SO','SI','DLE','DC1','DC2','DC3',
'DC4','NAK','SYN','ETB','CAN','EM','SUB','ESC','FS','GS',
'RS','US'];
return'['+names[v]+']';
}
if(v===32)return'[SP]';
if(v===127)return'[DEL]';
return String.fromCodePoint(v)+' ('+v+')';
}
function el(tag,attrs,children){
const n=document.createElement(tag);
if(attrs)for(const k in attrs){
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
if(children)(Array.isArray(children)?children:[children])
.forEach(c=>{if(c!=null)n.appendChild(
typeof c==='string'?document.createTextNode(c):c);});
return n;
}

function init(container,ctx){
if(!container)throw new Error('range.init: container required');

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
const toast=(msg,bad)=>{
if(window.NibblyApp&&typeof window.NibblyApp.toast==='function'){
window.NibblyApp.toast(msg,!!bad);
}
};


const state={
fromBase:10,toBase:'2',
startVal:0n,endVal:0n,
totalCount:0,
page:0,
totalPages:0,
hasResult:false
};


const root=el('section',{class:'nib-range'});
container.appendChild(root);


const card1=el('div',{class:'card'});


let titleRaw=T('range.title','Massive Conversions');
let titleHtml='';
if(window.NibblyIcons){
titleHtml=window.NibblyIcons.get('stats',{size:18})+' ';
}
card1.appendChild(el('div',{class:'card-head'},[
el('span',{class:'card-title',html:titleHtml+titleRaw})
]));

const selFrom=el('select',{class:'select'});
FROM_BASES.forEach(b=>{
const o=el('option',{value:b.id,text:b.label});
if(b.id===String(state.fromBase))o.selected=true;
selFrom.appendChild(o);
});
const selTo=el('select',{class:'select'});
TO_BASES.forEach(b=>{
const o=el('option',{value:b.id,text:b.label});
if(b.id===state.toBase)o.selected=true;
selTo.appendChild(o);
});
card1.appendChild(el('div',{class:'dual'},[
el('div',{},[
el('label',{class:'lbl',text:T('range.from','From base')}),
selFrom
]),
el('div',{},[
el('label',{class:'lbl',text:T('range.to','To base')}),
selTo
])
]));

const inpStart=el('input',{class:'input mono',type:'text',
placeholder:'0',autocomplete:'off',spellcheck:'false'});
const inpEnd=el('input',{class:'input mono',type:'text',
placeholder:'100',autocomplete:'off',spellcheck:'false'});
card1.appendChild(el('div',{class:'dual',style:'margin-top:12px;'},[
el('div',{},[
el('label',{class:'lbl',text:T('range.start','Start value')}),
inpStart
]),
el('div',{},[
el('label',{class:'lbl',text:T('range.end','End value')}),
inpEnd
])
]));

const presets=[
{from:'10',to:'2',s:'0',e:'100',labelKey:'range.preset.decToBin',labelFb:'Dec 0–100 → Bin'},
{from:'10',to:'8',s:'0',e:'100',labelKey:'range.preset.decToOct',labelFb:'Dec 0–100 → Oct'},
{from:'10',to:'bcd',s:'0',e:'100',labelKey:'range.preset.decToBcd',labelFb:'Dec 0–100 → BCD'},
{from:'16',to:'10',s:'0000',e:'FFFF',labelKey:'range.preset.hexToDec',labelFb:'Hex 0000–FFFF → Dec'},
{from:'16',to:'10',s:'00',e:'FF',labelKey:'range.preset.hexByte',labelFb:'Hex 00–FF → Dec'},
{from:'10',to:'asc',s:'32',e:'127',labelKey:'range.preset.ascii',labelFb:'ASCII 32–127'}
];
const presetRow=el('div',{class:'range-presets'});
presets.forEach(p=>{
const btn=el('button',{
class:'chip',type:'button',
text:T(p.labelKey,p.labelFb)
});
btn.addEventListener('click',()=>{
selFrom.value=p.from;selTo.value=p.to;
inpStart.value=p.s;inpEnd.value=p.e;
generate();
});
presetRow.appendChild(btn);
});
card1.appendChild(el('div',{style:'margin-top:12px;'},[
el('label',{class:'lbl',text:T('range.presets','Presets')}),
presetRow
]));

const genBtn=el('button',{
class:'btn-primary',type:'button',
html:(window.NibblyIcons?window.NibblyIcons.get('thunder',{size:18})+' ':'')+
T('range.generate','Generate'),
style:'margin-top:14px;'
});
card1.appendChild(genBtn);

const errEl=el('div',{class:'error'});
card1.appendChild(errEl);
root.appendChild(card1);


const card2=el('div',{class:'card'});

const countEl=el('span',{class:'range-count',text:'—'});
const copyAllBtn=el('button',{
class:'copy',type:'button',
html:(window.NibblyIcons?window.NibblyIcons.get('copy',{size:14})+' ':'')+
T('range.copyAll','Copy all')
});
const csvBtn=el('button',{
class:'copy',type:'button',
html:(window.NibblyIcons?window.NibblyIcons.get('download',{size:14})+' ':'')+
'CSV'
});
card2.appendChild(el('div',{class:'card-head'},[
el('span',{class:'card-title',text:T('range.sequential','Sequential display')}),
countEl
]));
card2.appendChild(el('div',{
style:'display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;'
},[copyAllBtn,csvBtn]));

const prevBtn=el('button',{type:'button',text:'◀'});
const nextBtn=el('button',{type:'button',text:'▶'});
const pageInfoEl=el('span',{class:'range-page-info',text:'—'});
const pageJumpInput=el('input',{
class:'input mono range-page-jump',
type:'text',inputmode:'numeric',
placeholder:'1',
autocomplete:'off',spellcheck:'false'
});
const pageJumpBtn=el('button',{type:'button',
class:'range-jump-btn',
text:T('range.jump','Ir')});
card2.appendChild(el('div',{class:'range-pager'},
[prevBtn,pageInfoEl,nextBtn]));
card2.appendChild(el('div',{class:'range-goto'},[
el('label',{class:'range-goto-label',
text:T('range.goto','Go to page')}),
pageJumpInput,
pageJumpBtn
]));

const tableWrap=el('div',{class:'range-table-wrap'});
const tableEl=el('div',{class:'range-table'});
tableWrap.appendChild(tableEl);
card2.appendChild(tableWrap);

const emptyEl=el('div',{class:'range-empty',
text:T('range.empty','Configure the range and press Generate.')});
card2.appendChild(emptyEl);
root.appendChild(card2);


function convertOne(value,toBase){
if(toBase==='bcd')return toBcd(value);
if(toBase==='asc')return toAscii(value);
return toBaseStr(value,parseInt(toBase,10));
}

function getRowAt(index){
const val=state.startVal+BigInt(index);
return{
input:toBaseStr(val,state.fromBase),
output:convertOne(val,state.toBase),
value:val
};
}

function generate(){
errEl.classList.remove('show');
const fromBase=parseInt(selFrom.value,10);
const s=parseInBase(inpStart.value,fromBase);
const e=parseInBase(inpEnd.value,fromBase);

if(s===null||e===null){
errEl.textContent=T('range.err.invalid',
'Invalid start or end value for the chosen base.');
errEl.classList.add('show');return;
}
if(e<s){
errEl.textContent=T('range.err.range',
'End must be greater than or equal to start.');
errEl.classList.add('show');return;
}
const count=Number(e-s+1n);
if(count>MAX_ENTRIES){
errEl.textContent=T('range.err.limit',
'Range is too large (max {0} entries).')
.replace('{0}',MAX_ENTRIES.toLocaleString());
errEl.classList.add('show');return;
}

state.fromBase=fromBase;
state.toBase=selTo.value;
state.startVal=s;
state.endVal=e;
state.totalCount=count;
state.page=0;
state.totalPages=Math.max(1,Math.ceil(count/PAGE_SIZE));
state.hasResult=true;

pageJumpInput.value='1';
pageJumpInput.max=String(state.totalPages);

renderTable();
log('range: '+count+' entries ('+state.fromBase+' → '+state.toBase+')');
}

function renderTable(){
tableEl.innerHTML='';
countEl.textContent=!state.hasResult
?'—'
:T('range.resultCount','{0} entries')
.replace('{0}',state.totalCount.toLocaleString());

if(!state.hasResult){
emptyEl.style.display='block';
prevBtn.disabled=true;nextBtn.disabled=true;
pageInfoEl.textContent='—';
return;
}
emptyEl.style.display='none';

const startIdx=state.page*PAGE_SIZE;
const endIdx=Math.min(startIdx+PAGE_SIZE,state.totalCount);

const frag=document.createDocumentFragment();
for(let i=startIdx;i<endIdx;i++){
const r=getRowAt(i);
const row=el('div',{class:'range-row'});
row.appendChild(el('span',{class:'range-idx',text:String(i+1)}));
row.appendChild(el('span',{class:'range-input mono',text:r.input}));
row.appendChild(el('span',{class:'range-arrow',text:'→'}));
row.appendChild(el('span',{class:'range-output mono',text:r.output}));
frag.appendChild(row);
}
tableEl.appendChild(frag);

prevBtn.disabled=state.page===0;
nextBtn.disabled=state.page>=state.totalPages-1;
pageInfoEl.textContent=
T('range.page','Page {0}/{1}')
.replace('{0}',state.page+1)
.replace('{1}',state.totalPages.toLocaleString());
pageJumpInput.value=String(state.page+1);
}

function goToPage(n){
if(!state.hasResult)return;
const p=Math.max(1,Math.min(state.totalPages,Number(n)||1))-1;
if(p===state.page)return;
state.page=p;
renderTable();
tableWrap.scrollTop=0;
}

async function copyAll(){
if(!state.hasResult)return;
if(state.totalCount>COPY_WARN_AT){
const ok=await confirmDialog(
T('range.confirmCopy',
'Copiar {0} filas puede tardar unos segundos. ¿Continuar?')
.replace('{0}',state.totalCount.toLocaleString())
);
if(!ok)return;
}
const lines=[];
for(let i=0;i<state.totalCount;i++){
const r=getRowAt(i);
lines.push(r.input+' → '+r.output);
}
copyText(lines.join('\n'),T('toast.copied','✓ Copied'));
}

async function exportCsv(){
if(!state.hasResult)return;
if(state.totalCount>COPY_WARN_AT){
const ok=await confirmDialog(
T('range.confirmCsv',
'Exportar {0} filas a CSV puede tardar unos segundos. ¿Continuar?')
.replace('{0}',state.totalCount.toLocaleString())
);
if(!ok)return;
}

csvBtn.disabled=true;
const oldHtml=csvBtn.innerHTML;

csvBtn.innerHTML=(window.NibblyIcons?window.NibblyIcons.get('sand-clock',{size:14})+' ':'')+
T('range.exporting','Exporting…');

try{
const parts=['input,output\n'];
for(let i=0;i<state.totalCount;i+=CSV_CHUNK){
const end=Math.min(i+CSV_CHUNK,state.totalCount);
let chunk='';
for(let j=i;j<end;j++){
const r=getRowAt(j);
chunk+='"'+r.input.replace(/"/g,'""')+'","'+
r.output.replace(/"/g,'""')+'"\n';
}
parts.push(chunk);
if(i%(CSV_CHUNK*4)===0){
await new Promise(r=>setTimeout(r,0));
}
}
const blob=new Blob(parts,{type:'text/csv;charset=utf-8'});
const url=URL.createObjectURL(blob);
const a=document.createElement('a');
a.href=url;
a.download='nibbly-range-'+state.fromBase+'to'+
state.toBase+'-'+Date.now()+'.csv';
document.body.appendChild(a);
a.click();
setTimeout(()=>{URL.revokeObjectURL(url);a.remove();},60000);
log('range: CSV exported ('+state.totalCount+' rows)');
}catch(e){
toast('CSV failed: '+(e.message||e),true);
}finally{
csvBtn.disabled=false;
csvBtn.innerHTML=oldHtml;
}
}

function confirmDialog(message){
return new Promise(resolve=>{
const ov=el('div',{class:'range-confirm-overlay'});
const box=el('div',{class:'range-confirm-box'});
box.appendChild(el('div',{class:'range-confirm-msg',text:message}));
const actions=el('div',{class:'range-confirm-actions'});
const cancel=el('button',{class:'range-confirm-cancel',type:'button',
text:T('range.cancel','Cancelar')});
const ok=el('button',{class:'range-confirm-ok',type:'button',
text:T('range.confirm','Continuar')});
cancel.addEventListener('click',()=>{ov.remove();resolve(false);});
ok.addEventListener('click',()=>{ov.remove();resolve(true);});
ov.addEventListener('click',e=>{
if(e.target===ov){ov.remove();resolve(false);}
});
actions.appendChild(cancel);
actions.appendChild(ok);
box.appendChild(actions);
ov.appendChild(box);
document.body.appendChild(ov);
});
}

async function copyText(text,okMsg){
try{
if(navigator.clipboard&&window.isSecureContext){
await navigator.clipboard.writeText(text);
}else{
const ta=document.createElement('textarea');
ta.value=text;
ta.style.position='fixed';ta.style.opacity='0';
document.body.appendChild(ta);ta.select();
document.execCommand('copy');
ta.remove();
}
toast(okMsg);
}catch(_){
toast(T('toast.copyFail','Could not copy'),true);
}
}


genBtn.addEventListener('click',generate);
prevBtn.addEventListener('click',()=>{
if(state.page>0){state.page--;renderTable();tableWrap.scrollTop=0;}
});
nextBtn.addEventListener('click',()=>{
if(state.page<state.totalPages-1){
state.page++;renderTable();tableWrap.scrollTop=0;
}
});
pageJumpBtn.addEventListener('click',()=>goToPage(pageJumpInput.value));
pageJumpInput.addEventListener('keydown',e=>{
if(e.key==='Enter'){e.preventDefault();goToPage(pageJumpInput.value);}
});
copyAllBtn.addEventListener('click',copyAll);
csvBtn.addEventListener('click',exportCsv);

[inpStart,inpEnd].forEach(i=>{
i.addEventListener('keydown',e=>{if(e.key==='Enter')generate();});
});

return{
refresh:()=>{},
destroy:()=>{root.remove();}
};
}


window.NibblyModules=window.NibblyModules||{};
window.NibblyModules.range={
id:'range',version:'2.0.16',init,
_helpers:{toBaseStr,parseInBase,toBcd,toAscii,DIGITS,MAX_ENTRIES}
};
window.NibblyRange=window.NibblyModules.range;

if(console&&console.debug){
console.debug('[Nibbly] range.js loaded → window.NibblyModules.range (v2.0.16)');
}
})();