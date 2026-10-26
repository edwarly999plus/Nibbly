(function(){
'use strict';


function icon(name,size,fallback){
if(window.NibblyIcons){
const html=window.NibblyIcons.get(name,{size:size||16});
if(html)return html;
}
return fallback||'';
}

function getLang(){
try{
const s=JSON.parse(localStorage.getItem('nibbly-settings-v2')||'{}');
return s.lang||'es';
}catch(e){return'es';}
}

const I18N={
es:{
'f.mode.formula':'Fórmula libre',
'f.mode.conversion':'Conversión',
'f.formulaLbl':'Fórmula (usa variables como a, b, c…)',
'f.formulaPh':'Ej: a * b + c',
'f.varsLbl':'Valores de las variables',
'f.preview':'Vista previa',
'f.previewEmpty':'Escribe una fórmula para ver el resultado en tiempo real.',
'f.reveal':'Revelar cálculo',
'f.reveal1':'La gran revelación está casi lista, por favor espere...',
'f.reveal2':'Revelando cálculo...',
'f.reveal3':'Ya casi...',
'f.clear':'Limpiar',
'f.copy':'Copiar',
'f.copied':'Copiado',
'f.copyFail':'No se pudo copiar',
'f.nothing':'Nada que copiar',
'f.errorVar':'Falta el valor de la variable "{0}".',
'f.errorSyntax':'La fórmula contiene caracteres no permitidos.',
'f.errorDivZero':'Resultado no finito (¿división por cero?).',
'f.errorInput':'Introduce un número válido.',
'f.errorBits':'Solo se permiten 0s y 1s.',
'f.errorHex':'Solo se permiten dígitos hexadecimales (0-9, A-F).',
'f.convLbl':'Valor a convertir',
'f.convPh.dec2bin':'Ej: 45',
'f.convPh.dec2hex':'Ej: 478',
'f.convPh.dec2hexFrac':'Ej: 26,5',
'f.convPh.dec2oct':'Ej: 45',
'f.convPh.bin2oct':'Ej: 101110',
'f.convPh.bin2hex':'Ej: 11110010',
'f.convPh.hex2dec':'Ej: 2AF',
'f.conv.dec2bin':'Decimal → Binario',
'f.conv.dec2hex':'Decimal → Hexadecimal',
'f.conv.dec2hexFrac':'Decimal (con parte decimal) → Hexadecimal',
'f.conv.dec2oct':'Decimal → Octal',
'f.conv.bin2oct':'Binario → Octal',
'f.conv.bin2hex':'Binario → Hexadecimal',
'f.conv.hex2dec':'Hexadecimal → Decimal',
'f.col.division':'División',
'f.col.quotient':'Cociente',
'f.col.residue':'Residuo',
'f.col.mult':'Multiplicación',
'f.col.result':'Resultado',
'f.col.digit':'Dígito',
'f.col.bits':'Bits',
'f.col.value':'Valor',
'f.col.position':'Posición',
'f.col.weight':'Peso',
'f.col.product':'Producto',
'f.col.dec':'Dec',
'f.col.hex':'Hex',
'f.col.oct':'Oct',
'f.col.bin':'Bin',
'f.col.char':'Carácter',
'f.col.name':'Nombre',
'f.step.int':'Parte entera (divisiones sucesivas)',
'f.step.frac':'Parte decimal (multiplicaciones sucesivas)',
'f.step.groups':'Agrupación de bits',
'f.step.hexExpansion':'Descomposición por pesos',
'f.step.hexDetail':'Detalle por dígito',
'f.step.reduction':'Resolución',
'f.step.formula':'Fórmula original',
'f.step.subst':'Sustitución de variables',
'f.step.result':'Resultado',
'f.empty':'Selecciona una conversión y pulsa "Revelar cálculo".',
'f.hint.formula':'Solo letras sueltas (a, b, c…) son variables. Operadores: + − * / ^ ( ) %. También √, ², ³.',
'f.hint.conversion':'Las tablas muestran el método completo: divisiones sucesivas, agrupación de bits o descomposición por pesos.',
'f.ascii.title':'Tabla ASCII completa',
'f.ascii.desc':'Los 128 caracteres ASCII con su representación decimal, hexadecimal, octal y binaria. Los caracteres de control se muestran con su nombre entre corchetes.',
'f.ascii.generate':'Generar tabla',
'f.ascii.filter':'Filtrar…',
'f.ascii.regenerate':'Regenerar',
'f.ascii.empty':'Pulsa "Generar tabla" para ver los 128 caracteres.',
'f.ascii.shown':'{0} de 128 caracteres',
'f.csvDone':'CSV descargado',
'f.csvFail':'No se pudo generar el CSV',
'f.csvEmpty':'Nada que exportar'
},
en:{
'f.mode.formula':'Free formula',
'f.mode.conversion':'Conversion',
'f.formulaLbl':'Formula (use variables like a, b, c…)',
'f.formulaPh':'e.g. a * b + c',
'f.varsLbl':'Variable values',
'f.preview':'Preview',
'f.previewEmpty':'Type a formula to see the live result.',
'f.reveal':'Reveal calculation',
'f.reveal1':'The big reveal is almost ready, please wait...',
'f.reveal2':'Revealing calculation...',
'f.reveal3':'Almost there...',
'f.clear':'Clear',
'f.copy':'Copy',
'f.copied':'Copied',
'f.copyFail':'Could not copy',
'f.nothing':'Nothing to copy',
'f.errorVar':'Missing value for variable "{0}".',
'f.errorSyntax':'Formula contains disallowed characters.',
'f.errorDivZero':'Non-finite result (division by zero?).',
'f.errorInput':'Enter a valid number.',
'f.errorBits':'Only 0s and 1s allowed.',
'f.errorHex':'Only hex digits allowed (0-9, A-F).',
'f.convLbl':'Value to convert',
'f.convPh.dec2bin':'e.g. 45',
'f.convPh.dec2hex':'e.g. 478',
'f.convPh.dec2hexFrac':'e.g. 26.5',
'f.convPh.dec2oct':'e.g. 45',
'f.convPh.bin2oct':'e.g. 101110',
'f.convPh.bin2hex':'e.g. 11110010',
'f.convPh.hex2dec':'e.g. 2AF',
'f.conv.dec2bin':'Decimal → Binary',
'f.conv.dec2hex':'Decimal → Hexadecimal',
'f.conv.dec2hexFrac':'Decimal (with fraction) → Hexadecimal',
'f.conv.dec2oct':'Decimal → Octal',
'f.conv.bin2oct':'Binary → Octal',
'f.conv.bin2hex':'Binary → Hexadecimal',
'f.conv.hex2dec':'Hexadecimal → Decimal',
'f.col.division':'Division',
'f.col.quotient':'Quotient',
'f.col.residue':'Remainder',
'f.col.mult':'Multiplication',
'f.col.result':'Result',
'f.col.digit':'Digit',
'f.col.bits':'Bits',
'f.col.value':'Value',
'f.col.position':'Position',
'f.col.weight':'Weight',
'f.col.product':'Product',
'f.col.dec':'Dec',
'f.col.hex':'Hex',
'f.col.oct':'Oct',
'f.col.bin':'Bin',
'f.col.char':'Char',
'f.col.name':'Name',
'f.step.int':'Integer part (successive division)',
'f.step.frac':'Fractional part (successive multiplication)',
'f.step.groups':'Bit grouping',
'f.step.hexExpansion':'Weight breakdown',
'f.step.hexDetail':'Detail per digit',
'f.step.reduction':'Resolution',
'f.step.formula':'Original formula',
'f.step.subst':'Variable substitution',
'f.step.result':'Result',
'f.empty':'Pick a conversion and press "Reveal calculation".',
'f.hint.formula':'Only single letters (a, b, c…) are variables. Operators: + − * / ^ ( ) %. Also √, ², ³.',
'f.hint.conversion':'Tables show the full method: successive division, bit grouping, or weight breakdown.',
'f.ascii.title':'Full ASCII table',
'f.ascii.desc':'All 128 ASCII characters with their decimal, hexadecimal, octal, and binary representation. Control characters are shown by name in brackets.',
'f.ascii.generate':'Generate table',
'f.ascii.filter':'Filter…',
'f.ascii.regenerate':'Regenerate',
'f.ascii.empty':'Press "Generate table" to see all 128 characters.',
'f.ascii.shown':'{0} of 128 characters',
'f.csvDone':'CSV downloaded',
'f.csvFail':'Could not generate CSV',
'f.csvEmpty':'Nothing to export'
}
};

function t(key){
const lang=getLang();
let s=(I18N[lang]&&I18N[lang][key])||I18N.es[key]||key;
for(let i=1;i<arguments.length;i++){
s=s.replace('{'+(i-1)+'}',arguments[i]);
}
return s;
}

const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));

function esc(s){
return String(s).replace(/[&<>"']/g,c=>({
'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
}[c]));
}

function parseNum(raw){
if(typeof raw!=='string')return NaN;
const n=parseFloat(raw.trim().replace(',','.'));
return isFinite(n)?n:NaN;
}

async function copyText(txt){
try{
if(navigator.clipboard&&window.isSecureContext){
await navigator.clipboard.writeText(txt);
return true;
}
}catch(e){}
try{
const ta=document.createElement('textarea');
ta.value=txt;
ta.setAttribute('readonly','');
ta.style.cssText='position:fixed;top:-1000px;opacity:0';
document.body.appendChild(ta);
ta.select();
const ok=document.execCommand('copy');
document.body.removeChild(ta);
return ok;
}catch(e){return false;}
}

function showToast(msg,isErr){
if(window.__nibblyToast){
try{window.__nibblyToast(msg,isErr);return;}catch(e){}
}
let el=document.getElementById('nibblyFormulasToast');
if(!el){
el=document.createElement('div');
el.id='nibblyFormulasToast';
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

function csvEscape(v){
const s=String(v==null?'':v);
if(/[",\n\r]/.test(s))return'"'+s.replace(/"/g,'""')+'"';
return s;
}

function downloadCSV(filename,headerRow,dataRows){
if(!dataRows||!dataRows.length){
showToast(t('f.csvEmpty'),true);
return false;
}
try{
const lines=[];
if(headerRow&&headerRow.length){
lines.push(headerRow.map(csvEscape).join(','));
}
dataRows.forEach(r=>lines.push(r.map(csvEscape).join(',')));
const csv=lines.join('\n');
const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});
const url=URL.createObjectURL(blob);
const a=document.createElement('a');
a.href=url;
a.download=filename;
document.body.appendChild(a);
a.click();
setTimeout(()=>{URL.revokeObjectURL(url);a.remove();},60000);
showToast(t('f.csvDone'));
return true;
}catch(e){
showToast(t('f.csvFail')+': '+(e.message||e),true);
return false;
}
}

function safeFilePart(s){
return String(s).replace(/[^\w.-]+/g,'_').replace(/^_+|_+$/g,'').slice(0,40)||'x';
}

const RESERVED=new Set(['e','pi','E','PI']);

function detectVars(formula){
const m=formula.match(/\b[a-zA-Z]\b/g)||[];
return Array.from(new Set(m)).filter(v=>!RESERVED.has(v)).sort();
}

function evaluateFormula(formula,vars){
if(!formula||!formula.trim())return null;
const varNames=detectVars(formula);
if(!varNames.length){
if(!/[\d+\-*/^().,%√²³]/.test(formula))return null;
}
let subst=formula;
for(const v of varNames){
const raw=vars[v];
if(raw===undefined||raw===''||!isFinite(parseNum(raw))){
throw new Error(t('f.errorVar',v));
}
subst=subst.replace(new RegExp('\\b'+v+'\\b','g'),'('+parseNum(raw)+')');
}
if(/[a-zA-Z_]/.test(subst.replace(/[eE]/g,''))){
throw new Error(t('f.errorSyntax'));
}
if(!/^[\d\s+\-*/().,%^√²³eE]+$/.test(subst)){
throw new Error(t('f.errorSyntax'));
}
let expr=subst
.replace(/√/g,'Math.sqrt')
.replace(/²/g,'**2')
.replace(/³/g,'**3')
.replace(/\^/g,'**')
.replace(/%/g,'/100');
let result;
try{
result=Function('"use strict";return ('+expr+');')();
}catch(e){
throw new Error(t('f.errorSyntax'));
}
if(typeof result!=='number'||!isFinite(result)){
throw new Error(t('f.errorDivZero'));
}
return{result,subst,varNames};
}

const HEX='0123456789ABCDEF';

function decToBin(n){
const steps=[];
let v=Math.floor(n);
if(v===0){
steps.push({div:'0 ÷ 2',q:'0',r:'0'});
return{result:'0',steps};
}
while(v>0){
const q=Math.floor(v/2),r=v%2;
steps.push({div:v+' ÷ 2',q:String(q),r:String(r)});
v=q;
}
return{result:steps.map(s=>s.r).reverse().join(''),steps};
}

function decToHex(n){
const steps=[];
let v=Math.floor(n);
if(v===0)return{result:'0',steps:[{div:'0 ÷ 16',q:'0',r:'0'}]};
while(v>0){
const q=Math.floor(v/16),r=v%16;
steps.push({div:v+' ÷ 16',q:String(q),r:r+' ('+HEX[r]+')'});
v=q;
}
return{result:steps.map(s=>HEX[parseInt(s.r,10)]).reverse().join(''),steps};
}

function decToHexFrac(n){
const intPart=Math.floor(n);
const fracPart=n-intPart;
const intSteps=[];
let v=intPart;
if(v===0)intSteps.push({div:'0 ÷ 16',q:'0',r:'0'});
while(v>0){
const q=Math.floor(v/16),r=v%16;
intSteps.push({div:v+' ÷ 16',q:String(q),r:r+' ('+HEX[r]+')'});
v=q;
}
const intResult=intSteps.map(s=>HEX[parseInt(s.r,10)]).reverse().join('');
const fracSteps=[];
let f=fracPart,fracResult='',iter=0;
while(f>1e-10&&iter<20){
const mult=f*16;
const digit=Math.floor(mult);
const rem=mult-digit;
fracSteps.push({
mult:f.toFixed(6).replace(/0+$/,'').replace(/\.$/,'')+' × 16',
result:mult.toFixed(6).replace(/0+$/,'').replace(/\.$/,''),
digit:HEX[digit]
});
fracResult+=HEX[digit];
f=rem;
iter++;
}
const result=intResult+(fracResult?'.'+fracResult:'');
return{result,intSteps,fracSteps};
}

function decToOct(n){
const steps=[];
let v=Math.floor(n);
if(v===0)return{result:'0',steps:[{div:'0 ÷ 8',q:'0',r:'0'}]};
while(v>0){
const q=Math.floor(v/8),r=v%8;
steps.push({div:v+' ÷ 8',q:String(q),r:String(r)});
v=q;
}
return{result:steps.map(s=>s.r).reverse().join(''),steps};
}

function binToOct(bin){
if(!/^[01]+$/.test(bin))throw new Error(t('f.errorBits'));
const padded=bin.padStart(Math.ceil(bin.length/3)*3,'0');
const groups=padded.match(/.{3}/g);
const steps=groups.map(g=>({bits:g,value:parseInt(g,2).toString(8)}));
return{result:steps.map(s=>s.value).join(''),steps};
}

function binToHex(bin){
if(!/^[01]+$/.test(bin))throw new Error(t('f.errorBits'));
const padded=bin.padStart(Math.ceil(bin.length/4)*4,'0');
const groups=padded.match(/.{4}/g);
const steps=groups.map(g=>({bits:g,value:parseInt(g,2).toString(16).toUpperCase()}));
return{result:steps.map(s=>s.value).join(''),steps};
}

function hexToDec(str){
const clean=String(str).trim().replace(/^0x/i,'').replace(/\s+/g,'').toUpperCase();
if(!/^[0-9A-F]+$/.test(clean))throw new Error(t('f.errorHex'));
const len=clean.length;
const steps=[];
let total=0n;
for(let i=0;i<len;i++){
const ch=clean[i];
const digitValue=parseInt(ch,16);
const power=len-1-i;
const weight=16n**BigInt(power);
const product=BigInt(digitValue)*weight;
total+=product;
steps.push({
digit:ch,
value:String(digitValue),
power:String(power),
weight:weight.toString(),
product:product.toString()
});
}
const expression=steps.map(s=>s.value+' × 16^'+s.power).join(' + ');
const productsExpression=steps.map(s=>s.product).join(' + ');
const htmlExpression=steps.map(s=>s.value+' × 16<sup>'+s.power+'</sup>').join(' + ');
return{result:total.toString(),steps,expression,productsExpression,htmlExpression,input:clean};
}

const ASCII_CONTROL_NAMES=['NUL','SOH','STX','ETX','EOT','ENQ','ACK','BEL','BS','HT','LF','VT','FF','CR','SO','SI','DLE','DC1','DC2','DC3','DC4','NAK','SYN','ETB','CAN','EM','SUB','ESC','FS','GS','RS','US'];

function asciiLabel(code){
if(code<32)return'['+ASCII_CONTROL_NAMES[code]+']';
if(code===32)return'[SP]';
if(code===127)return'[DEL]';
return String.fromCharCode(code);
}

function buildAsciiRows(){
const rows=[];
for(let code=0;code<=127;code++){
rows.push({
code,
dec:String(code),
hex:code.toString(16).toUpperCase().padStart(2,'0'),
oct:code.toString(8).padStart(3,'0'),
bin:code.toString(2).padStart(8,'0'),
char:(code>=32&&code!==127)?String.fromCharCode(code):'',
name:asciiLabel(code)
});
}
return rows;
}

let initialized=false;
let container=null;

let state={
mode:'formula',
formula:'',
vars:{},
conversion:'dec2bin',
convValue:'',
revealToken:0,
lastRaw:'',
lastResult:null,
lastConv:null,
asciiRows:null,
asciiFilter:''
};

const CONVERSIONS=[
{id:'dec2bin',fn:decToBin,needs:'int'},
{id:'dec2hex',fn:decToHex,needs:'int'},
{id:'dec2hexFrac',fn:decToHexFrac,needs:'num'},
{id:'dec2oct',fn:decToOct,needs:'int'},
{id:'bin2oct',fn:binToOct,needs:'bin'},
{id:'bin2hex',fn:binToHex,needs:'bin'},
{id:'hex2dec',fn:hexToDec,needs:'hex'}
];

function inputModeFor(convId){
if(convId==='hex2dec')return'text';
if(convId&&convId.indexOf('bin')===0)return'numeric';
return'decimal';
}

function getConv(id){
return CONVERSIONS.find(c=>c.id===id)||CONVERSIONS[0];
}

function renderAll(){
if(!container)return;
container.innerHTML='';
const root=document.createElement('div');
root.className='nibbly-formulas';
root.appendChild(buildModeSeg());
if(state.mode==='formula'){
root.appendChild(buildFormulaEditor());
}else{
root.appendChild(buildConversionEditor());
root.appendChild(buildAsciiCard());
}
container.appendChild(root);
if(state.mode==='formula')attachFormulaEvents();
else attachConversionEvents();
updateFormulaPreview();
}

function buildModeSeg(){
const seg=document.createElement('div');
seg.className='f-seg';
const fBtn=document.createElement('button');
fBtn.type='button';
fBtn.className='f-seg-btn'+(state.mode==='formula'?' active':'');
fBtn.textContent=t('f.mode.formula');
fBtn.dataset.mode='formula';
const cBtn=document.createElement('button');
cBtn.type='button';
cBtn.className='f-seg-btn'+(state.mode==='conversion'?' active':'');
cBtn.textContent=t('f.mode.conversion');
cBtn.dataset.mode='conversion';
fBtn.addEventListener('click',()=>{state.mode='formula';renderAll();});
cBtn.addEventListener('click',()=>{state.mode='conversion';renderAll();});
seg.appendChild(fBtn);
seg.appendChild(cBtn);
return seg;
}

function buildFormulaEditor(){
const wrap=document.createElement('div');
wrap.innerHTML=`
      <div class="f-field">
        <label class="f-lbl">${esc(t('f.formulaLbl'))}</label>
        <textarea class="f-textarea" id="fFormulaInput" spellcheck="false" autocomplete="off" placeholder="${esc(t('f.formulaPh'))}">${esc(state.formula)}</textarea>
      </div>
      <div id="fVarsArea"></div>
      <div class="f-field" style="margin-top:14px;">
        <div class="f-lbl">${esc(t('f.preview'))}</div>
        <div class="f-preview" id="fPreview">
          <div class="f-preview-label">${esc(t('f.preview'))}</div>
          <div class="f-preview-sub">${esc(t('f.previewEmpty'))}</div>
        </div>
      </div>
      <div class="f-actions">
        <button type="button" class="f-btn formulas-clear-btn" id="fClearBtn">${esc(t('f.clear'))}</button>
        <button type="button" class="formulas-reveal-btn" id="fRevealBtn">${esc(t('f.reveal'))}</button>
      </div>
      <div class="f-loading" id="fLoading"></div>
      <div class="f-reveal" id="fRevealArea"></div>
      <div class="f-hint">${esc(t('f.hint.formula'))}</div>
      <div class="f-error" id="fError"></div>
    `;
const area=wrap.querySelector('#fVarsArea');
area.appendChild(buildVarsInputs());
return wrap;
}

function buildVarsInputs(){
const box=document.createElement('div');
const formula=state.formula;
const vars=detectVars(formula);
if(!vars.length)return box;
const lbl=document.createElement('label');
lbl.className='f-lbl';
lbl.textContent=t('f.varsLbl');
box.appendChild(lbl);
const grid=document.createElement('div');
grid.className='f-vars';
vars.forEach(v=>{
const cell=document.createElement('div');
cell.className='f-var';
cell.innerHTML=`
        <span class="f-var-lbl">${esc(v)}</span>
        <input class="f-var-input" type="text" inputmode="decimal" data-var="${esc(v)}" value="${esc(state.vars[v] != null ? state.vars[v] : '')}" placeholder="0" autocomplete="off" spellcheck="false">
      `;
grid.appendChild(cell);
});
box.appendChild(grid);
return box;
}

function buildConversionEditor(){
const wrap=document.createElement('div');
const chips=CONVERSIONS.map(c=>
`<button type="button" class="f-chip${c.id === state.conversion ? ' active' : ''}" data-conv="${c.id}">${esc(t('f.conv.' + c.id))}</button>`
).join('');
wrap.innerHTML=`
      <div class="f-field" style="margin-top:0;">
        <label class="f-lbl">${esc(t('f.convLbl'))}</label>
        <div class="f-chips" id="fConvChips">${chips}</div>
        <input class="f-var-input" id="fConvInput" type="text" inputmode="${inputModeFor(state.conversion)}" style="margin-top:12px;width:100%;" value="${esc(state.convValue)}" placeholder="${esc(t('f.convPh.' + state.conversion))}" autocomplete="off" spellcheck="false">
      </div>
      <div class="f-actions">
        <button type="button" class="f-btn formulas-clear-btn" id="fClearBtn">${esc(t('f.clear'))}</button>
        <button type="button" class="formulas-reveal-btn" id="fRevealBtn">${esc(t('f.reveal'))}</button>
      </div>
      <div class="f-loading" id="fLoading"></div>
      <div class="f-reveal" id="fRevealArea"></div>
      <div class="f-hint">${esc(t('f.hint.conversion'))}</div>
      <div class="f-error" id="fError"></div>
    `;
return wrap;
}


function buildAsciiCard(){
const card=document.createElement('div');
card.className='f-field';
card.style.marginTop='20px';
card.innerHTML=`
        <div class="f-seg" style="cursor:default;">
          <button type="button" class="f-seg-btn active" id="fAsciiHeaderBtn" style="cursor:default;pointer-events:none;justify-content:flex-start;text-align:left;padding-left:14px;">${icon('grid', 16)} ${esc(t('f.ascii.title'))}</button>
        </div>
        <div class="f-hint" style="margin-top:6px;">${esc(t('f.ascii.desc'))}</div>
        <div class="f-actions" id="fAsciiActions">
          <button type="button" class="formulas-reveal-btn" id="fAsciiGenBtn" style="flex:1;min-width:140px;">${icon('download', 16)} ${esc(t('f.ascii.generate'))}</button>
        </div>
        <div id="fAsciiResult" style="margin-top:12px;"></div>
      `;
return card;
}

function attachAsciiEvents(){
const genBtn=container.querySelector('#fAsciiGenBtn');
if(genBtn){
genBtn.addEventListener('click',()=>{
state.asciiRows=buildAsciiRows();
state.asciiFilter='';
renderAsciiTable();
});
}
}

function renderAsciiTable(){
const result=container.querySelector('#fAsciiResult');
if(!result)return;

if(!state.asciiRows){
result.innerHTML=`<div class="f-empty">${esc(t('f.ascii.empty'))}</div>`;
return;
}

const filter=(state.asciiFilter||'').trim().toLowerCase();
const rows=state.asciiRows.filter(r=>{
if(!filter)return true;
return r.dec.indexOf(filter)!==-1||
r.hex.toLowerCase().indexOf(filter)!==-1||
r.oct.indexOf(filter)!==-1||
r.bin.indexOf(filter)!==-1||
r.name.toLowerCase().indexOf(filter)!==-1||
(r.char&&r.char.toLowerCase().indexOf(filter)!==-1);
});

const countLabel=t('f.ascii.shown',rows.length);

let html='';
html+=`<div class="f-actions" style="margin-top:0;">
      <input type="text" class="f-var-input" id="fAsciiFilter" placeholder="${esc(t('f.ascii.filter'))}" value="${esc(state.asciiFilter || '')}" style="flex:1;min-width:120px;padding:9px 12px;font-size:13px;">
      <button type="button" class="f-btn" id="fAsciiCsvBtn" style="padding:9px 16px;">${icon('download', 14)} CSV</button>
      <button type="button" class="f-btn" id="fAsciiRegenBtn" style="padding:9px 16px;">${esc(t('f.ascii.regenerate'))}</button>
    </div>`;
html+=`<div class="f-hint" style="margin-top:6px;margin-bottom:8px;font-family:ui-monospace,monospace;">${esc(countLabel)}</div>`;
html+=`<div style="max-height:420px;overflow-y:auto;border-radius:var(--r-md);border:1px solid var(--outline-v);">`;
html+=`<table class="f-table" style="margin-bottom:0;">
      <thead style="position:sticky;top:0;z-index:1;">
        <tr>
          <th>${esc(t('f.col.dec'))}</th>
          <th>${esc(t('f.col.hex'))}</th>
          <th>${esc(t('f.col.oct'))}</th>
          <th>${esc(t('f.col.bin'))}</th>
          <th>${esc(t('f.col.char'))}</th>
        </tr>
      </thead><tbody>`;
if(!rows.length){
html+=`<tr><td colspan="5" style="text-align:center;color:var(--on-variant);font-style:italic;padding:20px;">${esc(t('f.ascii.empty'))}</td></tr>`;
}else{
rows.forEach(r=>{
html+=`<tr>
          <td>${esc(r.dec)}</td>
          <td>${esc(r.hex)}</td>
          <td>${esc(r.oct)}</td>
          <td>${esc(r.bin)}</td>
          <td class="res" style="font-family:ui-monospace,monospace;">${esc(r.char || r.name)}</td>
        </tr>`;
});
}
html+=`</tbody></table></div>`;

result.innerHTML=html;

const filterInput=result.querySelector('#fAsciiFilter');
if(filterInput){
filterInput.addEventListener('input',(e)=>{
state.asciiFilter=e.target.value;
renderAsciiTable();
const again=container.querySelector('#fAsciiFilter');
if(again){
again.focus();
const val=again.value;
again.setSelectionRange(val.length,val.length);
}
});
}
const csvBtn=result.querySelector('#fAsciiCsvBtn');
if(csvBtn){
csvBtn.addEventListener('click',()=>{
const list=state.asciiRows||[];
if(!list.length){showToast(t('f.csvEmpty'),true);return;}
downloadCSV(
'nibbly-formulas-ascii.csv',
[t('f.col.dec'),t('f.col.hex'),t('f.col.oct'),t('f.col.bin'),t('f.col.char')],
list.map(r=>[r.dec,r.hex,r.oct,r.bin,(r.char||r.name)])
);
});
}
const regenBtn=result.querySelector('#fAsciiRegenBtn');
if(regenBtn){
regenBtn.addEventListener('click',()=>{
state.asciiRows=buildAsciiRows();
state.asciiFilter='';
renderAsciiTable();
});
}
}

function updateFormulaPreview(){
if(state.mode!=='formula')return;
const prev=container.querySelector('#fPreview');
const errBox=container.querySelector('#fError');
if(!prev)return;
if(errBox){errBox.classList.remove('show');errBox.textContent='';}
if(!state.formula.trim()){
prev.className='f-preview';
prev.innerHTML=`<div class="f-preview-label">${esc(t('f.preview'))}</div><div class="f-preview-sub">${esc(t('f.previewEmpty'))}</div>`;
return;
}
try{
const r=evaluateFormula(state.formula,state.vars);
if(!r){
prev.className='f-preview';
prev.innerHTML=`<div class="f-preview-label">${esc(t('f.preview'))}</div><div class="f-preview-sub">${esc(t('f.previewEmpty'))}</div>`;
return;
}
prev.className='f-preview ok';
prev.innerHTML=`
        <div class="f-preview-sub">${esc(r.subst)}</div>
        <div class="f-preview-res ok">= ${esc(String(r.result))}</div>
      `;
}catch(e){
prev.className='f-preview err';
prev.innerHTML=`<div class="f-preview-res err">${esc(e.message || 'Error')}</div>`;
if(errBox){
errBox.textContent=e.message||'Error';
errBox.classList.add('show');
}
}
}

function attachFormulaEvents(){
const ta=container.querySelector('#fFormulaInput');
if(ta){
ta.addEventListener('input',()=>{
state.formula=ta.value;
const area=container.querySelector('#fVarsArea');
if(area){
area.innerHTML='';
area.appendChild(buildVarsInputs());
attachVarInputs();
}
updateFormulaPreview();
});
}
attachVarInputs();
const clr=container.querySelector('#fClearBtn');
if(clr)clr.addEventListener('click',()=>{
state.formula='';
state.vars={};
renderAll();
});
const rev=container.querySelector('#fRevealBtn');
if(rev)rev.addEventListener('click',()=>revealFormula());
}

function attachVarInputs(){
container.querySelectorAll('.f-var-input[data-var]').forEach(inp=>{
inp.addEventListener('input',()=>{
state.vars[inp.dataset.var]=inp.value;
updateFormulaPreview();
});
});
}

function attachConversionEvents(){
const input=container.querySelector('#fConvInput');
if(input){
input.addEventListener('input',()=>{state.convValue=input.value;});
input.addEventListener('keydown',(e)=>{
if(e.key==='Enter')revealConversion();
});
}
container.querySelectorAll('#fConvChips .f-chip').forEach(chip=>{
chip.addEventListener('click',()=>{
state.conversion=chip.dataset.conv;
container.querySelectorAll('#fConvChips .f-chip').forEach(c=>
c.classList.toggle('active',c===chip)
);
if(input){
input.placeholder=t('f.convPh.'+state.conversion);
input.inputMode=inputModeFor(state.conversion);
}
const area=container.querySelector('#fRevealArea');
if(area){area.classList.remove('show');area.innerHTML='';}
});
});
const clr=container.querySelector('#fClearBtn');
if(clr)clr.addEventListener('click',()=>{state.convValue='';renderAll();});
const rev=container.querySelector('#fRevealBtn');
if(rev)rev.addEventListener('click',()=>revealConversion());
attachAsciiEvents();
if(state.asciiRows)renderAsciiTable();
}

async function showLoadingSequence(){
const box=container.querySelector('#fLoading');
if(!box)return;
box.classList.add('show');
box.textContent=t('f.reveal1');
await sleep(850);
box.textContent=t('f.reveal2');
await sleep(600);
box.textContent=t('f.reveal3');
await sleep(500);
box.classList.remove('show');
box.textContent='';
}

async function revealFormula(){
const token=++state.revealToken;
const errBox=container.querySelector('#fError');
const area=container.querySelector('#fRevealArea');
if(errBox){errBox.classList.remove('show');errBox.textContent='';}
if(area){area.classList.remove('show');area.innerHTML='';}
let evaluated;
try{
evaluated=evaluateFormula(state.formula,state.vars);
if(!evaluated){
if(errBox){errBox.textContent=t('f.previewEmpty');errBox.classList.add('show');}
return;
}
}catch(e){
if(errBox){errBox.textContent=e.message||'Error';errBox.classList.add('show');}
return;
}
const btn=container.querySelector('#fRevealBtn');
if(btn)btn.disabled=true;
await showLoadingSequence();
if(btn)btn.disabled=false;
if(token!==state.revealToken)return;
if(!area)return;
area.innerHTML=`
      <div class="f-step">
        <div class="f-step-title">${esc(t('f.step.formula'))}</div>
        <div class="f-preview-sub" style="font-size:14px;">${esc(state.formula)}</div>
      </div>
      <div class="f-step">
        <div class="f-step-title">${esc(t('f.step.subst'))}</div>
        <div class="f-preview-sub" style="font-size:14px;">${esc(evaluated.subst)}</div>
      </div>
      <div class="f-step">
        <div class="f-step-title">${esc(t('f.step.result'))}</div>
        <div class="f-result">
          <div class="f-result-label">${esc(t('f.step.result'))}</div>
          <div class="f-result-value">${esc(String(evaluated.result))}</div>
          <button type="button" class="f-copy" data-copy-result="${esc(String(evaluated.result))}">${esc(t('f.copy'))}</button>
        </div>
      </div>
    `;
area.classList.add('show');
area.querySelectorAll('.f-copy').forEach(btn=>{
btn.addEventListener('click',async()=>{
const ok=await copyText(btn.dataset.copyResult||'');
showToast(ok?t('f.copied'):t('f.copyFail'),!ok);
});
});
}

async function revealConversion(){
const token=++state.revealToken;
const errBox=container.querySelector('#fError');
const area=container.querySelector('#fRevealArea');
if(errBox){errBox.classList.remove('show');errBox.textContent='';}
if(area){area.classList.remove('show');area.innerHTML='';}
const conv=getConv(state.conversion);
const raw=(state.convValue||'').trim();
if(!raw){
if(errBox){errBox.textContent=t('f.errorInput');errBox.classList.add('show');}
return;
}
let result;
try{
if(conv.needs==='bin'){
if(!/^[01]+$/.test(raw))throw new Error(t('f.errorBits'));
result=conv.fn(raw);
}else if(conv.needs==='hex'){
const cleanHex=raw.replace(/^0x/i,'').replace(/\s+/g,'');
if(!/^[0-9A-Fa-f]+$/.test(cleanHex))throw new Error(t('f.errorHex'));
result=conv.fn(raw);
}else{
const n=parseNum(raw);
if(!isFinite(n)||n<0)throw new Error(t('f.errorInput'));
if(conv.needs==='int'&&Math.floor(n)!==n){
throw new Error(t('f.errorInput')+' (entero)');
}
result=conv.fn(n);
}
}catch(e){
if(errBox){errBox.textContent=e.message||'Error';errBox.classList.add('show');}
return;
}
const btn=container.querySelector('#fRevealBtn');
if(btn)btn.disabled=true;
await showLoadingSequence();
if(btn)btn.disabled=false;
if(token!==state.revealToken)return;
if(!area)return;
state.lastRaw=raw;
state.lastResult=result;
state.lastConv=conv;
area.innerHTML=buildConversionHtml(conv,raw,result);
area.classList.add('show');
area.querySelectorAll('.f-copy').forEach(b=>{
b.addEventListener('click',async()=>{
const ok=await copyText(b.dataset.copyResult||'');
showToast(ok?t('f.copied'):t('f.copyFail'),!ok);
});
});
area.querySelectorAll('[data-csv]').forEach(b=>{
b.addEventListener('click',()=>exportTableCSV(b.dataset.csv,conv,raw,result));
});
}

function exportTableCSV(kind,conv,raw,result){
const base='nibbly-formulas-'+safeFilePart(conv.id)+'-'+safeFilePart(raw);
if(kind==='div'&&result.steps){
downloadCSV(base+'-division.csv',
[t('f.col.division'),t('f.col.quotient'),t('f.col.residue')],
result.steps.map(s=>[s.div,s.q,s.r]));
return;
}
if(kind==='frac'&&result.fracSteps){
downloadCSV(base+'-multiplicacion.csv',
[t('f.col.mult'),t('f.col.result'),t('f.col.digit')],
result.fracSteps.map(s=>[s.mult,s.result,s.digit]));
return;
}
if(kind==='groups'&&result.steps){
downloadCSV(base+'-grupos.csv',
[t('f.col.bits'),t('f.col.value')],
result.steps.map(s=>[s.bits,s.value]));
return;
}
if(kind==='hex'&&result.steps){
downloadCSV(base+'-hex-a-decimal.csv',
[t('f.col.digit'),t('f.col.value'),t('f.col.position'),t('f.col.weight'),t('f.col.product')],
result.steps.map(s=>[s.digit,s.value,s.power,s.weight,s.product]));
return;
}
downloadCSV(base+'-resultado.csv',['input','output'],[[raw,result.result]]);
}

function buildConversionHtml(conv,raw,result){
let html='';
if(conv.id==='dec2bin'||conv.id==='dec2hex'||conv.id==='dec2oct'){
html+=`<div class="f-step"><div class="f-step-title">${esc(t('f.step.int'))}</div>
        <button type="button" class="f-copy" data-csv="div" style="margin-bottom:8px;">${icon('download', 14)} CSV</button>
        <table class="f-table"><thead><tr>
          <th>${esc(t('f.col.division'))}</th>
          <th>${esc(t('f.col.quotient'))}</th>
          <th>${esc(t('f.col.residue'))}</th>
        </tr></thead><tbody>`;
result.steps.forEach(s=>{
html+=`<tr><td>${esc(s.div)}</td><td>${esc(s.q)}</td><td class="res">${esc(s.r)}</td></tr>`;
});
html+=`</tbody></table></div>`;
}
if(conv.id==='dec2hexFrac'){
html+=`<div class="f-step"><div class="f-step-title">${esc(t('f.step.int'))}</div>
        <button type="button" class="f-copy" data-csv="div" style="margin-bottom:8px;">${icon('download', 14)} CSV</button>
        <table class="f-table"><thead><tr>
          <th>${esc(t('f.col.division'))}</th>
          <th>${esc(t('f.col.quotient'))}</th>
          <th>${esc(t('f.col.residue'))}</th>
        </tr></thead><tbody>`;
result.intSteps.forEach(s=>{
html+=`<tr><td>${esc(s.div)}</td><td>${esc(s.q)}</td><td class="res">${esc(s.r)}</td></tr>`;
});
html+=`</tbody></table></div>`;
if(result.fracSteps.length){
html+=`<div class="f-step"><div class="f-step-title">${esc(t('f.step.frac'))}</div>
          <button type="button" class="f-copy" data-csv="frac" style="margin-bottom:8px;">${icon('download', 14)} CSV</button>
          <table class="f-table"><thead><tr>
            <th>${esc(t('f.col.mult'))}</th>
            <th>${esc(t('f.col.result'))}</th>
            <th>${esc(t('f.col.digit'))}</th>
          </tr></thead><tbody>`;
result.fracSteps.forEach(s=>{
html+=`<tr><td>${esc(s.mult)}</td><td>${esc(s.result)}</td><td class="res">${esc(s.digit)}</td></tr>`;
});
html+=`</tbody></table></div>`;
}
}
if(conv.id==='bin2oct'||conv.id==='bin2hex'){
html+=`<div class="f-step"><div class="f-step-title">${esc(t('f.step.groups'))}</div>
        <button type="button" class="f-copy" data-csv="groups" style="margin-bottom:8px;">${icon('download', 14)} CSV</button>
        <div class="f-groups">`;
result.steps.forEach((s,i)=>{
html+=`<div class="f-group-box"><span class="bits">${esc(s.bits)}</span><span class="val">${esc(s.value)}</span></div>`;
if(i<result.steps.length-1)html+=`<span class="f-group-arrow">→</span>`;
});
html+=`</div></div>`;
}
if(conv.id==='hex2dec'){
html+=`<div class="f-step"><div class="f-step-title">${esc(t('f.step.hexExpansion'))}</div>
        <div class="f-preview-sub f-pow-line">
          ${result.htmlExpression} = ${esc(result.productsExpression)} = ${esc(result.result)}
        </div>
      </div>`;
html+=`<div class="f-step"><div class="f-step-title">${esc(t('f.step.hexDetail'))}</div>
        <button type="button" class="f-copy" data-csv="hex" style="margin-bottom:8px;">${icon('download', 14)} CSV</button>
        <table class="f-table"><thead><tr>
          <th>${esc(t('f.col.digit'))}</th>
          <th>${esc(t('f.col.value'))}</th>
          <th>${esc(t('f.col.position'))}</th>
          <th>${esc(t('f.col.weight'))}</th>
          <th>${esc(t('f.col.product'))}</th>
        </tr></thead><tbody>`;
result.steps.forEach(s=>{
html+=`<tr><td>${esc(s.digit)}</td><td>${esc(s.value)}</td><td>${esc(s.power)}</td><td>${esc(s.weight)}</td><td class="res">${esc(s.product)}</td></tr>`;
});
html+=`</tbody></table></div>`;
}
html+=`<div class="f-step">
      <div class="f-step-title">${esc(t('f.step.result'))}</div>
      <div class="f-result">
        <div class="f-result-label">${esc(raw)} → ${esc(t('f.conv.' + conv.id))}</div>
        <div class="f-result-value">${esc(result.result)}</div>
        <button type="button" class="f-copy" data-copy-result="${esc(result.result)}">${esc(t('f.copy'))}</button>
      </div>
    </div>`;
return html;
}

function init(c){
if(!c)return;
container=c;
initialized=true;
container.innerHTML='';
renderAll();
}

window.NibblyFormulas={init:init};
})();