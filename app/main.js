(function(){
'use strict';
if(window.NibblyModules&&window.NibblyModules.numbers)return;


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
function fmt(n){
if(!isFinite(n))return'—';
if(n===0)return'0';
const abs=Math.abs(n);
if(abs>=1e15||abs<1e-4){
return n.toExponential(8).replace(/(\.\d*?)0+e/,'$1e').replace(/\.e/,'e');
}
let s=n.toPrecision(12);
if(s.indexOf('.')>=0)s=s.replace(/0+$/,'').replace(/\.$/,'');
return s;
}
function parseNum(raw){
const n=parseFloat(String(raw).replace(',','.').replace(/\s/g,''));
return isFinite(n)?n:null;
}
function logTo(msg){
if(window.NibblyApp&&typeof window.NibblyApp.log==='function'){
window.NibblyApp.log(msg);
}
}
function getStr(ctx,key,fallback){
if(ctx&&typeof ctx.getString==='function'){
const v=ctx.getString(key);
if(v&&v!==key)return v;
}
return fallback;
}
function paintColor(cls){
if(cls==='good')return'linear-gradient(90deg,var(--good),#5b8cff)';
if(cls==='mid')return'linear-gradient(90deg,var(--warn),#ff8a3c)';
if(cls==='bad')return'linear-gradient(90deg,var(--bad),#ff3d6e)';
return'transparent';
}


const CARD_ICON_MAP={
'code.title':'random',
'bcd.title':'search',
'combo.title':'bulk',
'pot.watts':'thunder',
'pot.heat':'thermometer',
'pot.speed':'wifi',
'pot.cpu':'cpu',
'pot.ram':'ram',
'pot.storage':'storage',
'pot.audio':'music',
'pot.db':'volume',
'pot.video':'video',
'pot.time':'clock',
'pot.frames':'film',
'pot.codec':'codec'
};

function makeCard(titleKey,titleFb,ctx){
const rawTitle=getStr(ctx,titleKey,titleFb);
let iconHtml='';


const iconName=CARD_ICON_MAP[titleKey];
if(iconName&&window.NibblyIcons){
iconHtml=window.NibblyIcons.get(iconName,{size:18})+' ';
}

const c=el('div',{class:'card'});
c.appendChild(el('div',{class:'card-head'},[
el('span',{class:'card-title',html:iconHtml+rawTitle})
]));
return c;
}

function makeMeter(){
const w=el('div',{class:'meter-wrap'});
const top=el('div',{class:'meter-top'},[
el('span',{class:'meter-label',text:'—'}),
el('span',{class:'badge neutral',text:'—'})
]);
const bar=el('div',{class:'meter-bar'},[
el('div',{class:'meter-fill',style:'width:0%'})
]);
const d=el('div',{class:'meter-desc',text:'—'});
w.appendChild(top);w.appendChild(bar);w.appendChild(d);
return{wrap:w,label:top.children[0],badge:top.children[1],
fill:bar.children[0],desc:d};
}
function makeOutlineRow(kText){
const r=el('div',{class:'outline-row'});
r.appendChild(el('span',{class:'k',text:kText}));
const v=el('span',{class:'v mono',text:'—'});
r.appendChild(v);
return{row:r,v};
}
function dual(a,b){return el('div',{class:'dual'},[a,b]);}
function labelUnit(text,select){
const d=el('div');
d.appendChild(el('label',{class:'lbl',text}));
d.appendChild(select);
return d;
}
function fillSelect(select,items,defaultId){
items.forEach(u=>{
const o=el('option',{value:u.id,text:u.label});
if(u.id===defaultId)o.selected=true;
select.appendChild(o);
});
}


const DIGITS='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function parseInBase(str,base){
let s=String(str).trim().toUpperCase().replace(/[\s_,]/g,'');
if(!s)return null;
let neg=false;
if(s[0]==='-'||s[0]==='+'){neg=(s[0]==='-');s=s.slice(1);}
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
function toBaseStr(n,base){
const neg=n<0n;
let v=neg?-n:n;
const B=BigInt(base);
if(v===0n)return'0';
let out='';
while(v>0n){out=DIGITS[Number(v%B)]+out;v=v/B;}
return(neg?'-':'')+out;
}
function nibbleStr(v){
const neg=v<0n;
let bin=(neg?-v:v).toString(2);
const pad=(4-(bin.length%4))%4;
bin='0'.repeat(pad)+bin;
return(neg?'-':'')+bin.match(/.{4}/g).join(' ');
}
function bcdStr(v){
const neg=v<0n;
const s=(neg?-v:v).toString(10);
const parts=[];
for(let i=0;i<s.length;i++){
parts.push((s.charCodeAt(i)-48).toString(2).padStart(4,'0'));
}
return(neg?'-':'')+parts.join(' ');
}
function asciiStr(v){
if(v<0n||v>0x10FFFFn)return'—';
const cp=Number(v);
if(cp>=0xD800&&cp<=0xDFFF)return'—';
if(cp<32){
const names=['NUL','SOH','STX','ETX','EOT','ENQ','ACK','BEL','BS','HT',
'LF','VT','FF','CR','SO','SI','DLE','DC1','DC2','DC3',
'DC4','NAK','SYN','ETB','CAN','EM','SUB','ESC','FS','GS',
'RS','US'];
return'['+names[cp]+']';
}
if(cp===32)return'[SP]';
if(cp===127)return'[DEL]';
return String.fromCodePoint(cp);
}

function initNumbers(container,ctx){
const root=el('section',{class:'nib-main nib-numbers'});
container.appendChild(root);
let numOutFmt='2';
let convertBusy=false;
let convertTimer=null,convertMsgTimer=null;


const card1=el('div',{class:'card'});
card1.appendChild(el('label',{class:'lbl',for:'numInput',
text:getStr(ctx,'num.title','Input value')}));
const numInput=el('input',{id:'numInput',class:'input mono',type:'text',
placeholder:getStr(ctx,'num.placeholder','e.g. 2025'),
autocomplete:'off',autocorrect:'off',
autocapitalize:'characters',spellcheck:'false'});
card1.appendChild(numInput);


const BASE_LABELS = {
  2:  'Binary',
  8:  'Octal',
  10: 'Decimal',
  16: 'Hexadecimal'
};
const BASE_LABELS_ES = {
  2:  'Binario',
  8:  'Octal',
  10: 'Decimal',
  16: 'Hexadecimal'
};

const baseIn = el('select', { id: 'baseIn', class: 'select' });
const isSpanish = (() => {
  try {
    const s = JSON.parse(localStorage.getItem('nibbly-settings-v2') || '{}');
    return s.lang === 'es';
  } catch (_) { return false; }
})();
const baseLabels = isSpanish ? BASE_LABELS_ES : BASE_LABELS;

for (let b = 2; b <= 36; b++) {
  const label = baseLabels[b]
    ? 'Base ' + b + ' (' + baseLabels[b] + ')'
    : 'Base ' + b;
  const o = el('option', { value: String(b), text: label });
  if (b === 10) o.selected = true;
  baseIn.appendChild(o);
}

const clearNumBtn=el('button',{id:'clearNum',class:'btn-ghost',
type:'button',text:getStr(ctx,'num.clear','Clear')});
card1.appendChild(el('div',{class:'grid2'},[baseIn,clearNumBtn]));
const numConvert=el('button',{id:'numConvert',class:'btn-primary',
type:'button',text:getStr(ctx,'num.convert','Convert'),
style:'margin-top:12px;'});
card1.appendChild(numConvert);
const numLoading=el('div',{class:'loading-msg',id:'numLoading'});
card1.appendChild(numLoading);
const numError=el('div',{class:'error',id:'numError'});
card1.appendChild(numError);
root.appendChild(card1);


const card2=el('div',{class:'card'});
const copyNumOut=el('button',{class:'copy',type:'button',
dataset:{copy:'numOut',strip:'1'},
text:getStr(ctx,'num.copy','Copy')});
card2.appendChild(el('div',{class:'card-head'},[
el('span',{class:'card-title',text:getStr(ctx,'num.output','Output')}),
copyNumOut
]));
const FORMATS=[
{id:'2',key:'fmt.2',fb:'Binary'},
{id:'8',key:'fmt.8',fb:'Octal'},
{id:'10',key:'fmt.10',fb:'Decimal'},
{id:'16',key:'fmt.16',fb:'Hexadecimal'},
{id:'32',key:'fmt.32',fb:'Base 32'},
{id:'36',key:'fmt.36',fb:'Base 36'},
{id:'nib',key:'fmt.nib',fb:'Nibble'},
{id:'bcd',key:'fmt.bcd',fb:'BCD'},
{id:'asc',key:'fmt.asc',fb:'ASCII'}
];
const chipsWrap=el('div',{class:'chips',id:'numOutChips'});
FORMATS.forEach(f=>chipsWrap.appendChild(el('button',{
class:'chip'+(f.id===numOutFmt?' active':''),
type:'button',dataset:{fmt:f.id},
text:getStr(ctx,f.key,f.fb)
})));
card2.appendChild(chipsWrap);
const numOut=el('div',{class:'result-val mono',id:'numOut',
style:'margin-top:12px;',text:'—'});
card2.appendChild(numOut);
root.appendChild(card2);


const card3=el('div',{class:'card'});
let codeTitle=getStr(ctx,'code.title','Generate alphanumeric codes');
let codeIcon=window.NibblyIcons?window.NibblyIcons.get('random',{size:18}):'';
card3.appendChild(el('div',{class:'card-head'},[
el('span',{class:'card-title',html:codeIcon+' '+codeTitle})
]));
const codeSeps=el('input',{class:'input mono',type:'text',
inputmode:'numeric',value:'3',placeholder:'0',spellcheck:'false'});
const codeDigits=el('input',{class:'input mono',type:'text',
inputmode:'numeric',value:'4',placeholder:'4',spellcheck:'false'});
card3.appendChild(el('div',{class:'dual'},[
el('div',{},[
el('label',{class:'lbl',text:getStr(ctx,'code.separators','Separators')}),
codeSeps
]),
el('div',{},[
el('label',{class:'lbl',text:getStr(ctx,'code.digits','Digits per block')}),
codeDigits
])
]));
const codeSepType=el('select',{class:'select'});
[
['dash','code.sep.dash','Dash ( - )'],
['underscore','code.sep.underscore','Underscore ( _ )'],
['slash','code.sep.slash','Slash ( / )'],
['space','code.sep.space','Space'],
['dot','code.sep.dot','Dot ( . )'],
['none','code.sep.none','None (empty)']
].forEach(([v,k,fb],i)=>{
const o=el('option',{value:v,text:getStr(ctx,k,fb)});
if(i===0)o.selected=true;
codeSepType.appendChild(o);
});
card3.appendChild(el('div',{style:'margin-top:12px;'},[
el('label',{class:'lbl',text:getStr(ctx,'code.sepType','Separator type')}),
codeSepType
]));
const chkNumbers=el('input',{type:'checkbox'});chkNumbers.checked=true;
const chkUpper=el('input',{type:'checkbox'});chkUpper.checked=true;
const chkLower=el('input',{type:'checkbox'});
const chkSymbols=el('input',{type:'checkbox'});
function checkRow(input,key,fb){
return el('label',{class:'check-row'},[
input,el('span',{text:getStr(ctx,key,fb)})
]);
}
card3.appendChild(el('div',{class:'check-grid'},[
checkRow(chkNumbers,'code.numbers','Numbers'),
checkRow(chkUpper,'code.upper','Uppercase'),
checkRow(chkLower,'code.lower','Lowercase'),
checkRow(chkSymbols,'code.symbols','Symbols')
]));
const codeGenBtn=el('button',{class:'btn-primary',type:'button',
text:getStr(ctx,'code.generate','Generate code'),
style:'margin-top:14px;'});
card3.appendChild(codeGenBtn);
const copyCode=el('button',{class:'copy',type:'button',
dataset:{copy:'codeResult'},
text:getStr(ctx,'num.copy','Copy')});
card3.appendChild(el('div',{style:'margin-top:14px;'},[
el('div',{class:'card-head',style:'margin-bottom:8px;'},[
el('span',{class:'card-title',text:getStr(ctx,'code.output','Generated code')}),
copyCode
]),
el('div',{class:'result-val mono',id:'codeResult',
style:'font-size:18px;letter-spacing:2px;',text:'—'})
]));
const codeError=el('div',{class:'error',id:'codeError'});
card3.appendChild(codeError);
root.appendChild(card3);


const card4=el('div',{class:'card'});
let bcdTitle=getStr(ctx,'bcd.title','BCD Verifier');
let bcdIcon=window.NibblyIcons?window.NibblyIcons.get('search',{size:18}):'';
card4.appendChild(el('div',{class:'card-head'},[
el('span',{class:'card-title',html:bcdIcon+' '+bcdTitle})
]));
card4.appendChild(el('div',{class:'hint',style:'margin:0 0 10px;',
text:getStr(ctx,'bcd.hint',
'Paste a BCD (only 0s and 1s) to verify if it\'s valid.')}));
const bcdInput=el('input',{id:'bcdInput',class:'input mono',type:'text',
placeholder:getStr(ctx,'bcd.placeholder','e.g. 01101111 0010 0001'),
autocomplete:'off',spellcheck:'false',
autocorrect:'off',autocapitalize:'off'});
card4.appendChild(bcdInput);
const bcdCheckBtn=el('button',{id:'bcdCheckBtn',class:'btn-primary',
type:'button',text:getStr(ctx,'bcd.check','Verify BCD'),
style:'margin-top:12px;'});
card4.appendChild(bcdCheckBtn);
const bcdResult=el('div',{class:'result-val mono',id:'bcdResult',
style:'margin-top:12px;font-size:14px;',text:'—'});
card4.appendChild(bcdResult);
const bcdError=el('div',{class:'error',id:'bcdError'});
card4.appendChild(bcdError);
root.appendChild(card4);


function t(key,...args){
let s=getStr(ctx,key,key);
args.forEach((a,i)=>{s=s.replace('{'+i+'}',a);});
return s;
}
function clearNumOutput(){
numOut.textContent='—';
numError.classList.remove('show');
numOut.classList.remove('ascii');
}
function cancelConvert(){
if(convertTimer)clearTimeout(convertTimer);
if(convertMsgTimer)clearInterval(convertMsgTimer);
convertTimer=convertMsgTimer=null;
convertBusy=false;
numConvert.disabled=false;
numLoading.classList.remove('show');
}
function renderNum(){
const raw=numInput.value.trim();
const base=parseInt(baseIn.value,10);
numOut.classList.remove('ascii');
if(raw===''){numError.classList.remove('show');numOut.textContent='—';return;}
const val=parseInBase(raw,base);
if(val===null){
const shown=raw.length>22?raw.slice(0,22)+'…':raw;
numError.textContent=t('err.invalidValue',shown,base);
numError.classList.add('show');
numOut.textContent='—';
return;
}
numError.classList.remove('show');
let result='—';
switch(numOutFmt){
case'2':result=toBaseStr(val,2);break;
case'8':result=toBaseStr(val,8);break;
case'10':result=toBaseStr(val,10);break;
case'16':result=toBaseStr(val,16);break;
case'32':result=toBaseStr(val,32);break;
case'36':result=toBaseStr(val,36);break;
case'nib':result=nibbleStr(val);break;
case'bcd':result=bcdStr(val);break;
case'asc':result=asciiStr(val);numOut.classList.add('ascii');break;
}
numOut.textContent=result;
}
const CONVERT_KEYS=['convert.msg1','convert.msg2','convert.msg3',
'convert.msg4','convert.msg5','convert.msg6'];
numConvert.addEventListener('click',()=>{
if(convertBusy)return;
convertBusy=true;
numConvert.disabled=true;
numLoading.classList.add('show');
let idx=0;
numLoading.textContent=getStr(ctx,CONVERT_KEYS[0],'…');
convertMsgTimer=setInterval(()=>{
idx=(idx+1)%CONVERT_KEYS.length;
numLoading.textContent=getStr(ctx,CONVERT_KEYS[idx],'…');
},500);
convertTimer=setTimeout(()=>{
clearInterval(convertMsgTimer);convertMsgTimer=null;
convertTimer=null;
numLoading.classList.remove('show');
numConvert.disabled=false;
convertBusy=false;
renderNum();
},3000);
});
chipsWrap.addEventListener('click',e=>{
const chip=e.target.closest('.chip');
if(!chip)return;
const newFmt=chip.dataset.fmt;
if(numOutFmt===newFmt)return;
numOutFmt=newFmt;
chipsWrap.querySelectorAll('.chip').forEach(c=>{
c.classList.toggle('active',c===chip);
});
cancelConvert();clearNumOutput();
});
numInput.addEventListener('input',()=>{cancelConvert();clearNumOutput();});
baseIn.addEventListener('change',()=>{cancelConvert();clearNumOutput();});
clearNumBtn.addEventListener('click',()=>{
cancelConvert();numInput.value='';clearNumOutput();numInput.focus();
});


const CODE_CHARS={
numbers:'0123456789',
upper:'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
lower:'abcdefghijklmnopqrstuvwxyz',
symbols:'!@#$%^&*()_+-=[]{}|;:,.<>?/~€£¥'
};
const CODE_SEPS={dash:'-',underscore:'_',slash:'/',
space:' ',dot:'.',none:''};
codeGenBtn.addEventListener('click',()=>{
codeError.classList.remove('show');
const seps=parseInt(codeSeps.value,10);
const digits=parseInt(codeDigits.value,10);
if(!isFinite(seps)||seps<0){
codeError.textContent=t('code.errSeps');codeError.classList.add('show');return;
}
if(!isFinite(digits)||digits<1){
codeError.textContent=t('code.errDigits');codeError.classList.add('show');return;
}
let charset='';
if(chkNumbers.checked)charset+=CODE_CHARS.numbers;
if(chkUpper.checked)charset+=CODE_CHARS.upper;
if(chkLower.checked)charset+=CODE_CHARS.lower;
if(chkSymbols.checked)charset+=CODE_CHARS.symbols;
if(!charset){codeError.textContent=t('code.errNoChar');codeError.classList.add('show');return;}
const sep=CODE_SEPS[codeSepType.value];
const blocks=seps+1;
const parts=[];
for(let i=0;i<blocks;i++){
let part='';
for(let j=0;j<digits;j++){
part+=charset.charAt(Math.floor(Math.random()*charset.length));
}
parts.push(part);
}
document.getElementById('codeResult').textContent=parts.join(sep);
});


function checkBCD(){
bcdError.classList.remove('show');
bcdResult.textContent='—';
const raw=bcdInput.value.trim();
const input=raw.replace(/\s/g,'');
if(!input){bcdError.textContent=t('bcd.err.empty');bcdError.classList.add('show');return;}
if(!/^[01]+$/.test(input)){
bcdError.textContent=t('bcd.err.chars');bcdError.classList.add('show');return;
}
if(input.length%4!==0){
const remainder=input.length%4;
const missing=4-remainder;
const extra=input.slice(-remainder);
bcdError.textContent=t('bcd.err.length',
String(input.length),String(remainder),extra,String(missing));
bcdError.classList.add('show');return;
}
const nibbles=input.match(/.{4}/g);
const invalid=[];
nibbles.forEach((nibble,i)=>{
const val=parseInt(nibble,2);
if(val>9)invalid.push({index:i+1,nibble,val});
});
if(invalid.length>0){
bcdError.textContent=invalid.map(x=>
t('bcd.err.nibble','grupo '+x.index+' "'+x.nibble+'" = '+x.val)
).join(' · ');
bcdError.classList.add('show');return;
}
const digits=nibbles.map(n=>parseInt(n,2)).join('');
bcdResult.textContent=t('bcd.ok',String(nibbles.length),digits);
}
bcdCheckBtn.addEventListener('click',checkBCD);
bcdInput.addEventListener('keydown',e=>{if(e.key==='Enter')checkBCD();});

return{refresh(){renderNum();},destroy(){cancelConvert();root.remove();}};
}


const MORSE={
'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.','H':'....',
'I':'..','J':'.---','K':'-.-','L':'.-..','M':'--','N':'-.','O':'---','P':'.--.',
'Q':'--.-','R':'.-.','S':'...','T':'-','U':'..-','V':'...-','W':'.--','X':'-..-',
'Y':'-.--','Z':'--..','0':'-----','1':'.----','2':'..---','3':'...--','4':'....-',
'5':'.....','6':'-....','7':'--...','8':'---..','9':'----.','.':'.-.-.-',',':'--..--',
'?':'..--..',"'":'.----.','!':'-.-.--','/':'-..-.','(':'-.--.',')':'-.--.-','&':'.-...',
':':'---...',';':'-.-.-.','=':'-...-','+':'.-.-.','-':'-....-','_':'..--.-','"':'.-..-.',
'$':'...-..-','@':'.--.-.'
};
const MORSE_REV={};
for(const k in MORSE)MORSE_REV[MORSE[k]]=k;

function padCode(cp,base){
const bits=cp<0x100?8:cp<0x10000?16:32;
if(base===10)return cp.toString(10);
let len;
if(base===2)len=bits;
else if(base===8)len=Math.ceil(bits/3);
else if(base===16)len=Math.ceil(bits/4);
else len=1;
return cp.toString(base).toUpperCase().padStart(len,'0');
}
function encodeToCodes(text,base){
const out=[];
for(const ch of text)out.push(padCode(ch.codePointAt(0),base));
return out.join(' ');
}
function decodeFromCodes(str,base){
let s=str.trim();
if(!s)return'';
let tokens=s.split(/[\s,;|\n\r\t]+/).filter(Boolean);
if(tokens.length===1){
const T=tokens[0].toUpperCase();
if(base===16&&T.length>2&&T.length%2===0&&/^[0-9A-F]+$/.test(T)){
tokens=T.match(/.{2}/g);
}else if(base===2&&T.length>8&&T.length%8===0&&/^[01]+$/.test(T)){
tokens=T.match(/.{8}/g);
}else if(base===8&&T.length>3&&T.length%3===0&&/^[0-7]+$/.test(T)){
tokens=T.match(/.{3}/g);
}
}
let out='';
for(const tk of tokens){
const v=parseInBase(tk,base);
if(v===null)throw new Error('Invalid code: "'+tk+'"');
if(v<0n||v>0x10FFFFn)throw new Error('Out of Unicode range: "'+tk+'"');
const cp=Number(v);
if(cp>=0xD800&&cp<=0xDFFF)throw new Error('Out of Unicode range: "'+tk+'"');
out+=String.fromCodePoint(cp);
}
return out;
}
function encodeToAscii(text){
const out=[];
for(const ch of text)out.push(ch+'('+ch.codePointAt(0)+')');
return out.join(' ');
}
function decodeFromAscii(str){
const tokens=str.trim().split(/\s+/).filter(Boolean);
let out='';
for(const tk of tokens){
const m=tk.match(/^(.+?)\((\d+)\)$/);
if(m)out+=String.fromCodePoint(parseInt(m[2],10));
else if(/^\d+$/.test(tk))out+=String.fromCodePoint(parseInt(tk,10));
else throw new Error('Invalid token: "'+tk+'"');
}
return out;
}
function textToMorse(text){
const words=text.toUpperCase().split(/\s+/).filter(Boolean);
return words.map(w=>w.split('').map(ch=>MORSE[ch]||'').filter(Boolean).join(' '))
.filter(Boolean).join(' / ');
}
function morseToText(morse){
const clean=morse.replace(/[·•●]/g,'.').replace(/[–—−_]/g,'-');
return clean.trim().split(/\s*\/\s*/).map(w=>
w.trim().split(/\s+/).filter(Boolean).map(c=>MORSE_REV[c]||'?').join('')
).join(' ');
}
function toB64(str){
const bytes=new TextEncoder().encode(str);
let bin='';
for(let i=0;i<bytes.length;i++)bin+=String.fromCharCode(bytes[i]);
return btoa(bin);
}
function fromB64(str){
const clean=str.replace(/\s+/g,'');
if(!clean)return'';
let bin;
try{bin=atob(clean);}catch(_){throw new Error('Invalid Base64');}
const bytes=new Uint8Array(bin.length);
for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
return new TextDecoder().decode(bytes);
}
function generateMorseWav(morse,sampleRate){
sampleRate=sampleRate||44100;
const unit=0.09,freq=750;
const lead=0.5,tail=0.3;
const clean=morse.replace(/[·•●]/g,'.').replace(/[–—−_]/g,'-');
let bodyTime=0;
for(let i=0;i<clean.length;i++){
const ch=clean[i];
if(ch==='.')bodyTime+=unit*2;
else if(ch==='-')bodyTime+=unit*4;
else if(ch===' ')bodyTime+=unit*2;
else if(ch==='/')bodyTime+=unit*4;
}
const totalTime=lead+bodyTime+tail;
const totalSamples=Math.ceil(totalTime*sampleRate);
const samples=new Float32Array(totalSamples);
function addTone(startTime,duration){
const start=Math.floor(startTime*sampleRate);
const end=Math.floor((startTime+duration)*sampleRate);
const fade=Math.max(1,Math.floor(0.002*sampleRate));
for(let i=start;i<end&&i<samples.length;i++){
const t=(i-start)/sampleRate;
let amp=0.4;
if(i-start<fade)amp*=(i-start)/fade;
if(end-i<fade)amp*=(end-i)/fade;
samples[i]=Math.sin(2*Math.PI*freq*t)*amp;
}
}
let time=lead;
for(let i=0;i<clean.length;i++){
const ch=clean[i];
if(ch==='.'){addTone(time,unit);time+=unit*2;}
else if(ch==='-'){addTone(time,unit*3);time+=unit*4;}
else if(ch===' ')time+=unit*2;
else if(ch==='/')time+=unit*4;
}
const buffer=new ArrayBuffer(44+samples.length*2);
const view=new DataView(buffer);
function ws(off,str){for(let i=0;i<str.length;i++)view.setUint8(off+i,str.charCodeAt(i));}
ws(0,'RIFF');view.setUint32(4,36+samples.length*2,true);
ws(8,'WAVE');ws(12,'fmt ');view.setUint32(16,16,true);
view.setUint16(20,1,true);view.setUint16(22,1,true);
view.setUint32(24,sampleRate,true);view.setUint32(28,sampleRate*2,true);
view.setUint16(32,2,true);view.setUint16(34,16,true);
ws(36,'data');view.setUint32(40,samples.length*2,true);
let offset=44;
for(let i=0;i<samples.length;i++){
const s=Math.max(-1,Math.min(1,samples[i]));
view.setInt16(offset,s<0?s*0x8000:s*0x7FFF,true);
offset+=2;
}
return new Blob([buffer],{type:'audio/wav'});
}

function initTextconv(container,ctx){
const root=el('section',{class:'nib-main nib-textconv'});
container.appendChild(root);
let dir='enc',fmt='2';
let beepCtx=null,playTimer=null;

const dirSeg=el('div',{class:'seg',id:'tcDirSeg'},[
el('button',{class:'seg-btn active',type:'button',
dataset:{dir:'enc'},text:getStr(ctx,'txt.dir.enc','Text → Codes')}),
el('button',{class:'seg-btn',type:'button',
dataset:{dir:'dec'},text:getStr(ctx,'txt.dir.dec','Codes → Text')})
]);
root.appendChild(dirSeg);

const cardIn=el('div',{class:'card'});
const clearBtn=el('button',{class:'copy',type:'button',
text:getStr(ctx,'txt.clear','Clear')});
const txtInLabel=el('span',{class:'card-title',
text:getStr(ctx,'num.title','Input')});
cardIn.appendChild(el('div',{class:'card-head'},[txtInLabel,clearBtn]));
const txtIn=el('textarea',{class:'input mono',rows:'3',
placeholder:'Hola mundo 🙂',spellcheck:'false',
autocomplete:'off',autocorrect:'off',autocapitalize:'off'});
cardIn.appendChild(txtIn);
const chipsWrap=el('div',{class:'chips',id:'tcFmtChips'});
const FMT_BUTTONS=[
{id:'2',key:'fmt.2',fb:'Binary'},
{id:'8',key:'fmt.8',fb:'Octal'},
{id:'10',key:'fmt.10',fb:'Decimal'},
{id:'16',key:'fmt.16',fb:'Hexadecimal'},
{id:'asc',key:'fmt.asc',fb:'ASCII'},
{id:'mor',key:'fmt.mor',fb:'Morse'},
{id:'64',key:'fmt.64',fb:'Base64'}
];
FMT_BUTTONS.forEach(f=>chipsWrap.appendChild(el('button',{
class:'chip'+(f.id===fmt?' active':''),
type:'button',dataset:{fmt:f.id},
text:getStr(ctx,f.key,f.fb)
})));
cardIn.appendChild(chipsWrap);

const morsePad=el('div',{class:'morse-pad',id:'tcMorsePad'},[
el('button',{class:'morse-key',type:'button','data-ins':'.',text:'·'}),
el('button',{class:'morse-key',type:'button','data-ins':'-',text:'−'}),
el('button',{class:'morse-key sp',type:'button','data-ins':' ',text:'esp'}),
el('button',{class:'morse-key sp',type:'button','data-ins':'/',text:'/'}),
el('button',{class:'morse-key del',type:'button','data-ins':'__DEL__',text:'⌫'}),
el('button',{class:'morse-key del',type:'button','data-ins':'__CLR__',text:'CLR'})
]);
cardIn.appendChild(morsePad);
const morseHint=el('div',{class:'hint',style:'display:none;',
text:getStr(ctx,'txt.morseHint','Separate letters with a space and words with /.')});
cardIn.appendChild(morseHint);
root.appendChild(cardIn);

const cardOut=el('div',{class:'card'});
const copyOut=el('button',{class:'copy',type:'button',
text:getStr(ctx,'num.copy','Copy')});
const speakBtn=el('button',{class:'speaker-btn',type:'button',
title:getStr(ctx,'morse.speakTitle','Play Morse as beeps'),
style:'display:none;'},[
el('span',{class:'ico',html:window.NibblyIcons?window.NibblyIcons.get('volume',{size:14}):''}),
el('span',{text:getStr(ctx,'morse.speak','Listen')})
]);
const wavBtn=el('button',{class:'speaker-btn',type:'button',
title:getStr(ctx,'morse.downloadTitle','Download .wav'),
style:'display:none;'},[
el('span',{class:'ico',html:window.NibblyIcons?window.NibblyIcons.get('save',{size:14}):''}),
el('span',{text:getStr(ctx,'morse.download','WAV')})
]);
const txtOutLabel=el('span',{class:'card-title',
text:getStr(ctx,'num.output','Output')});
cardOut.appendChild(el('div',{class:'card-head'},[
txtOutLabel,
el('div',{style:'display:flex;gap:8px;align-items:center;flex-wrap:wrap;'},
[speakBtn,wavBtn,copyOut])
]));
const txtOut=el('textarea',{class:'input mono',rows:'4',readonly:''});
cardOut.appendChild(txtOut);
const txtError=el('div',{class:'error'});
cardOut.appendChild(txtError);
root.appendChild(cardOut);

function fmtLabel(id){
const map={
'2':['fmt.2','Binary'],'8':['fmt.8','Octal'],
'10':['fmt.10','Decimal'],'16':['fmt.16','Hexadecimal'],
'asc':['fmt.asc','ASCII'],'mor':['fmt.mor','Morse'],
'64':['fmt.64','Base64']
};
const[k,fb]=map[id]||['',id];
return getStr(ctx,k,fb);
}
function updateLabels(){
const isEnc=dir==='enc';
const name=fmtLabel(fmt);
txtInLabel.textContent=getStr(ctx,'num.title','Input')+' · '+
(isEnc?getStr(ctx,'tab.txt','Text'):name);
txtOutLabel.textContent=getStr(ctx,'num.output','Output')+' · '+
(isEnc?name:getStr(ctx,'tab.txt','Text'));
const placeholder={
'2':'01001000 01101111 01101100 01100001',
'8':'110 157 154 141',
'10':'72 111 108 97',
'16':'48 6F 6C 61',
'asc':'H(72) o(111) l(108) a(97)',
'mor':'.... --- .-.. .- / -- ..- -. -.. ---',
'64':'SG9sYQ=='
}[fmt]||'';
const hello = (() => {
  try {
    const s = JSON.parse(localStorage.getItem('nibbly-settings-v2') || '{}');
    return s.lang === 'es' ? 'Hola mundo 🙂' : 'Hello world 🙂';
  } catch (_) {
    return 'Hello world 🙂';
  }
})();
txtIn.placeholder=isEnc?hello:placeholder;
txtOut.placeholder=isEnc?placeholder:hello;
const showMorse=(fmt==='mor');
morsePad.classList.toggle('show',showMorse);
morseHint.style.display=showMorse?'block':'none';
speakBtn.style.display=showMorse?'inline-flex':'none';
wavBtn.style.display=showMorse?'inline-flex':'none';
}
function render(){
const inp=txtIn.value;
txtError.textContent='';
txtError.classList.remove('show');
if(!inp){txtOut.value='';return;}
try{
let result;
if(dir==='enc'){
if(fmt==='64')result=toB64(inp);
else if(fmt==='asc')result=encodeToAscii(inp);
else if(fmt==='mor')result=textToMorse(inp);
else result=encodeToCodes(inp,parseInt(fmt,10));
}else{
if(fmt==='64')result=fromB64(inp);
else if(fmt==='asc')result=decodeFromAscii(inp);
else if(fmt==='mor')result=morseToText(inp);
else result=decodeFromCodes(inp,parseInt(fmt,10));
}
txtOut.value=result;
}catch(e){
txtOut.value='';
txtError.textContent=(e&&e.message)?e.message:'Error';
txtError.classList.add('show');
}
}
function getVolume(){
if(window.NibblyApp&&typeof window.NibblyApp.getSettings==='function'){
try{
const s=window.NibblyApp.getSettings();
if(s&&typeof s.soundVolume==='number')return s.soundVolume/100;
}catch(_){}
}
return 1;
}
function ensureBeepCtx(){
if(!beepCtx){
try{
const AC=window.AudioContext||window.webkitAudioContext;
if(!AC)return null;
beepCtx=new AC();
}catch(_){return null;}
}
if(beepCtx.state==='suspended')beepCtx.resume().catch(()=>{});
return beepCtx;
}
function beep(ctx,start,duration,vol){
const osc=ctx.createOscillator();
const gain=ctx.createGain();
osc.type='sine';
osc.frequency.setValueAtTime(750,start);
gain.gain.setValueAtTime(0.0001,start);
gain.gain.exponentialRampToValueAtTime(0.14*vol,start+0.005);
gain.gain.setValueAtTime(0.14*vol,Math.max(start+0.006,start+duration-0.008));
gain.gain.exponentialRampToValueAtTime(0.0001,start+duration);
osc.connect(gain);gain.connect(ctx.destination);
osc.start(start);osc.stop(start+duration+0.005);
}
function playMorse(morse){
const vol=getVolume();
if(vol<=0)return;
const ctx=ensureBeepCtx();
if(!ctx)return;
const unit=0.09;
let time=ctx.currentTime+0.02;
const clean=morse.replace(/[·•●]/g,'.').replace(/[–—−_]/g,'-');
for(let i=0;i<clean.length;i++){
const ch=clean[i];
if(ch==='.'){beep(ctx,time,unit,vol);time+=unit*2;}
else if(ch==='-'){beep(ctx,time,unit*3,vol);time+=unit*4;}
else if(ch===' ')time+=unit*2;
else if(ch==='/')time+=unit*4;
}
clearTimeout(playTimer);
playTimer=setTimeout(()=>{},(time-ctx.currentTime)*1000+200);
}
dirSeg.addEventListener('click',e=>{
const btn=e.target.closest('.seg-btn');
if(!btn)return;
const newDir=btn.dataset.dir;
if(newDir===dir)return;
dir=newDir;
dirSeg.querySelectorAll('.seg-btn').forEach(b=>{
b.classList.toggle('active',b===btn);
});
const prev=txtOut.value;
if(prev)txtIn.value=prev;
txtOut.value='';
updateLabels();render();
});
chipsWrap.addEventListener('click',e=>{
const chip=e.target.closest('.chip');
if(!chip)return;
const newFmt=chip.dataset.fmt;
if(newFmt===fmt)return;
fmt=newFmt;
chipsWrap.querySelectorAll('.chip').forEach(c=>{
c.classList.toggle('active',c===chip);
});
updateLabels();render();
});
txtIn.addEventListener('input',render);
clearBtn.addEventListener('click',()=>{
txtIn.value='';txtOut.value='';
txtError.classList.remove('show');txtIn.focus();
});
morsePad.addEventListener('click',e=>{
const key=e.target.closest('.morse-key');
if(!key)return;
const val=key.dataset.ins;
const start=txtIn.selectionStart||0;
const end=txtIn.selectionEnd||0;
const s=txtIn.value;
if(val==='__DEL__'){
if(start!==end){
txtIn.value=s.slice(0,start)+s.slice(end);
txtIn.setSelectionRange(start,start);
}else if(start>0){
txtIn.value=s.slice(0,start-1)+s.slice(start);
txtIn.setSelectionRange(start-1,start-1);
}
}else if(val==='__CLR__'){
txtIn.value='';
}else{
txtIn.value=s.slice(0,start)+val+s.slice(end);
const pos=start+val.length;
txtIn.setSelectionRange(pos,pos);
}
txtIn.focus();render();
});
copyOut.addEventListener('click',async()=>{
const text=txtOut.value;
if(!text)return;
try{
if(navigator.clipboard&&window.isSecureContext){
await navigator.clipboard.writeText(text);
}else{
txtOut.select();document.execCommand('copy');
}
}catch(_){}
});
speakBtn.addEventListener('click',()=>playMorse(txtOut.value.trim()));
wavBtn.addEventListener('click',()=>{
const text=txtOut.value.trim();
if(!text)return;
try{
const blob=generateMorseWav(text);
const url=URL.createObjectURL(blob);
const a=document.createElement('a');
a.href=url;
a.download='nibbly-morse-'+Date.now()+'.wav';
document.body.appendChild(a);a.click();
setTimeout(()=>{URL.revokeObjectURL(url);a.remove();},120000);
}catch(_){}
});

updateLabels();render();
return{
refresh(){updateLabels();render();},
destroy(){
clearTimeout(playTimer);
if(beepCtx&&beepCtx.state!=='closed'){
try{beepCtx.close();}catch(_){}
}
beepCtx=null;root.remove();
}
};
}


const UNITS=[
{id:'bit',label:'bit (b)',factor:1/8},
{id:'byte',label:'byte (B)',factor:1},
{id:'KB',label:'KB · 1000 B',factor:1e3},
{id:'MB',label:'MB · 10⁶ B',factor:1e6},
{id:'GB',label:'GB · 10⁹ B',factor:1e9},
{id:'TB',label:'TB · 10¹² B',factor:1e12},
{id:'PB',label:'PB · 10¹⁵ B',factor:1e15},
{id:'EB',label:'EB · 10¹⁸ B',factor:1e18},
{id:'ZB',label:'ZB · 10²¹ B',factor:1e21},
{id:'YB',label:'YB · 10²⁴ B',factor:1e24},
{id:'KiB',label:'KiB · 1024 B',factor:1024},
{id:'MiB',label:'MiB · 2²⁰ B',factor:1048576},
{id:'GiB',label:'GiB · 2³⁰ B',factor:1073741824},
{id:'TiB',label:'TiB · 2⁴⁰ B',factor:1099511627776},
{id:'PiB',label:'PiB · 2⁵⁰ B',factor:1125899906842624},
{id:'EiB',label:'EiB · 2⁶⁰ B',factor:1152921504606846976},
{id:'ZiB',label:'ZiB · 2⁷⁰ B',factor:1.1805916207174113e21},
{id:'YiB',label:'YiB · 2⁸⁰ B',factor:1.2089258196146292e24}
];
const UNIT_MAP={};UNITS.forEach(u=>UNIT_MAP[u.id]=u);
function groupThousands(s){return s.replace(/\B(?=(\d{3})+(?!\d))/g,' ');}

function initBits(container,ctx){
const root=el('section',{class:'nib-main nib-bits'});
container.appendChild(root);

const card1=el('div',{class:'card'});
card1.appendChild(el('label',{class:'lbl',for:'bitsValue',
text:getStr(ctx,'uni.title','Input amount')}));
const inputValue=el('input',{id:'bitsValue',class:'input mono',type:'text',
inputmode:'decimal',placeholder:getStr(ctx,'uni.placeholder','e.g. 1024'),
autocomplete:'off',spellcheck:'false'});
card1.appendChild(inputValue);
const selFrom=el('select',{id:'bitsFrom',class:'select'});
const selTo=el('select',{id:'bitsTo',class:'select'});
UNITS.forEach(u=>{
selFrom.appendChild(el('option',{value:u.id,text:u.label}));
selTo.appendChild(el('option',{value:u.id,text:u.label}));
});
selFrom.value='byte';selTo.value='KB';
card1.appendChild(el('div',{style:'margin-top:12px;'},[
el('label',{class:'lbl',text:getStr(ctx,'uni.from','Input unit')}),
selFrom
]));
const errorEl=el('div',{class:'error'});
card1.appendChild(errorEl);
root.appendChild(card1);

const swapBtn=el('button',{class:'swap-btn',type:'button',
title:'⇅',text:'⇅'});
root.appendChild(swapBtn);

const card2=el('div',{class:'card',style:'margin-top:14px;'});
const copyBtn=el('button',{class:'copy',type:'button',
text:getStr(ctx,'num.copy','Copy')});
card2.appendChild(el('div',{class:'card-head'},[
el('span',{class:'card-title',text:getStr(ctx,'uni.output','Output')}),
copyBtn
]));
const outInput=el('input',{id:'bitsOut',class:'input mono',
type:'text',readonly:'',value:'—'});
card2.appendChild(outInput);
card2.appendChild(el('div',{style:'margin-top:12px;'},[
el('label',{class:'lbl',text:getStr(ctx,'uni.to','Output unit')}),
selTo
]));
card2.appendChild(el('div',{class:'hint',
text:getStr(ctx,'uni.hint',
'1 byte = 8 bits · 1 KB = 1000 B · IEC: 1 KiB = 1024 B')}));
root.appendChild(card2);

const card3=el('div',{class:'card'});
let comboTitle=getStr(ctx,'combo.title','Possible combinations');
let comboIcon=window.NibblyIcons?window.NibblyIcons.get('bulk',{size:18}):'';
card3.appendChild(el('div',{class:'card-head'},[
el('span',{class:'card-title',html:comboIcon+' '+comboTitle})
]));
card3.appendChild(el('label',{class:'lbl',
text:getStr(ctx,'combo.value','Amount')}));
const comboValue=el('input',{class:'input mono',type:'text',
inputmode:'decimal',placeholder:'8',autocomplete:'off',
spellcheck:'false'});
card3.appendChild(comboValue);
const comboUnit=el('select',{class:'select'});
UNITS.forEach(u=>{
const o=el('option',{value:u.id,text:u.label});
if(u.id==='byte')o.selected=true;
comboUnit.appendChild(o);
});
card3.appendChild(el('div',{style:'margin-top:12px;'},[
el('label',{class:'lbl',text:getStr(ctx,'combo.unit','Unit')}),
comboUnit
]));
const comboBits=el('span',{class:'v mono',id:'comboBits',text:'—'});
const comboResult=el('span',{class:'v mono',id:'comboResult',
text:'—',style:'font-size:14px;'});
const comboRange=el('span',{class:'v mono',id:'comboRange',
text:'—',style:'font-size:14px;'});
card3.appendChild(el('div',{class:'outline-row',style:'margin-top:14px;'},[
el('span',{class:'k',text:getStr(ctx,'combo.bitsTotal','Total bits')}),
comboBits
]));
card3.appendChild(el('div',{class:'outline-row'},[
el('span',{class:'k',text:getStr(ctx,'combo.result','Combinations (2^N)')}),
comboResult
]));
card3.appendChild(el('div',{class:'outline-row'},[
el('span',{class:'k',text:getStr(ctx,'combo.range','Representable range')}),
comboRange
]));
card3.appendChild(el('div',{class:'hint',
text:getStr(ctx,'combo.hint',
'In N bits there are 2^N combinations. E.g: 8 bits = 2^8 = 256 values (0–255).')}));
const comboError=el('div',{class:'error'});
card3.appendChild(comboError);
root.appendChild(card3);

function renderUnits(){
const raw=inputValue.value.trim();
errorEl.classList.remove('show');
if(raw===''){outInput.value='—';return;}
const n=parseNum(raw);
if(n===null){
errorEl.textContent=getStr(ctx,'err.invalidNum','Enter a valid number.');
errorEl.classList.add('show');
outInput.value='—';
return;
}
const f=UNIT_MAP[selFrom.value],t=UNIT_MAP[selTo.value];
const result=(n*f.factor)/t.factor;
outInput.value=fmt(result)+' '+t.id;
}
function renderCombo(){
const raw=comboValue.value.trim();
comboError.classList.remove('show');
if(raw===''){
comboBits.textContent='—';comboResult.textContent='—';comboRange.textContent='—';
return;
}
const n=parseNum(raw);
if(n===null||n<0){
comboError.textContent=getStr(ctx,'err.invalidPos','Enter a valid positive number.');
comboError.classList.add('show');
comboBits.textContent='—';comboResult.textContent='—';comboRange.textContent='—';
return;
}
const unit=UNIT_MAP[comboUnit.value];
const bits=n*unit.factor*8;
let bitsStr;
if(bits>=1e15)bitsStr=bits.toExponential(4)+' bits';
else if(bits>=1e6)bitsStr=groupThousands(String(Math.round(bits)))+' bits';
else if(Number.isInteger(bits))bitsStr=groupThousands(String(bits))+' bits';
else bitsStr=bits.toFixed(4)+' bits';
comboBits.textContent=bitsStr;
if(bits<=0){
comboResult.textContent='1';comboRange.textContent='0';return;
}
if(Number.isInteger(bits)&&bits<=256){
const combos=2n**BigInt(bits);
const range=combos-1n;
comboResult.textContent=groupThousands(combos.toString());
comboRange.textContent='0 – '+groupThousands(range.toString());
}else{
const log10v=bits*Math.log10(2);
const exp=Math.floor(log10v);
const mant=Math.pow(10,log10v-exp);
const sci=mant.toFixed(4)+' × 10^'+groupThousands(String(exp));
comboResult.textContent='≈ '+sci;
comboRange.textContent='0 – ≈ '+sci;
}
}
inputValue.addEventListener('input',renderUnits);
selFrom.addEventListener('change',renderUnits);
selTo.addEventListener('change',renderUnits);
swapBtn.addEventListener('click',()=>{
const a=selFrom.value;
selFrom.value=selTo.value;selTo.value=a;
if(outInput.value&&outInput.value!=='—'){
inputValue.value=outInput.value.replace(/\s+[^\s]+$/,'');
}
renderUnits();
});
copyBtn.addEventListener('click',async()=>{
const text=outInput.value;
if(!text||text==='—')return;
try{
if(navigator.clipboard&&window.isSecureContext){
await navigator.clipboard.writeText(text);
}else{
outInput.select();document.execCommand('copy');
}
}catch(_){}
});
comboValue.addEventListener('input',renderCombo);
comboUnit.addEventListener('change',renderCombo);
renderUnits();renderCombo();
return{
refresh(){renderUnits();renderCombo();},
destroy(){root.remove();}
};
}


const W_UNITS=[
{id:'mW',label:'mW',factor:1e-3},{id:'W',label:'W',factor:1},
{id:'kW',label:'kW',factor:1e3},{id:'MW',label:'MW',factor:1e6},
{id:'GW',label:'GW',factor:1e9},{id:'HP',label:'HP',factor:745.6998715823},
{id:'CV',label:'CV',factor:735.49875},{id:'BTU',label:'BTU/h',factor:0.29307107017}
];
const W_MAP={};W_UNITS.forEach(u=>W_MAP[u.id]=u);

const SP_UNITS=[
{id:'bps',label:'bps',factor:1},{id:'Kbps',label:'Kbps',factor:1e3},
{id:'Mbps',label:'Mbps',factor:1e6},{id:'Gbps',label:'Gbps',factor:1e9},
{id:'Tbps',label:'Tbps',factor:1e12},{id:'B/s',label:'B/s',factor:8},
{id:'KB/s',label:'KB/s',factor:8e3},{id:'MB/s',label:'MB/s',factor:8e6},
{id:'GB/s',label:'GB/s',factor:8e9}
];
const SP_MAP={};SP_UNITS.forEach(u=>SP_MAP[u.id]=u);

const CPU_UNITS=[
{id:'Hz',label:'Hz',factor:1},{id:'kHz',label:'kHz',factor:1e3},
{id:'MHz',label:'MHz',factor:1e6},{id:'GHz',label:'GHz',factor:1e9},
{id:'THz',label:'THz',factor:1e12}
];
const CPU_MAP={};CPU_UNITS.forEach(u=>CPU_MAP[u.id]=u);

const RAM_GENS=[
{id:'ddr',label:'DDR',speeds:[200,266,333,400]},
{id:'ddr2',label:'DDR2',speeds:[400,533,667,800]},
{id:'ddr3',label:'DDR3',speeds:[800,1066,1333,1600,1866,2133]},
{id:'ddr4',label:'DDR4',speeds:[2133,2400,2666,2933,3200,3600,4000,4400]},
{id:'ddr5',label:'DDR5',speeds:[4800,5200,5600,6000,6400,7200,8000,8400]}
];
const RAM_MAP={};RAM_GENS.forEach(g=>RAM_MAP[g.id]=g);

const ST_DEVS=[
{id:'hdd5400',label:'HDD 5400 RPM',read:120,write:100,iops:80},
{id:'hdd7200',label:'HDD 7200 RPM',read:180,write:160,iops:100},
{id:'hdd10k',label:'HDD 10.000 RPM',read:250,write:220,iops:130},
{id:'emmc',label:'eMMC',read:300,write:150,iops:3000},
{id:'usb30',label:'USB 3.0',read:400,write:350,iops:5000},
{id:'sdC10',label:'MicroSD Class 10',read:48,write:20,iops:500},
{id:'sdUHS1',label:'MicroSD UHS-I',read:104,write:60,iops:2000},
{id:'sdUHS2',label:'MicroSD UHS-II',read:312,write:200,iops:4000},
{id:'sdExp',label:'MicroSD Express',read:985,write:800,iops:20000},
{id:'sataSSD',label:'SSD SATA III',read:550,write:520,iops:90000},
{id:'usb31',label:'USB 3.1/3.2 Gen2',read:1000,write:900,iops:60000},
{id:'nvme3',label:'NVMe Gen3 ×4',read:3500,write:3000,iops:500000},
{id:'nvme4',label:'NVMe Gen4 ×4',read:7000,write:6500,iops:1000000},
{id:'nvme5',label:'NVMe Gen5 ×4',read:14000,write:12000,iops:1500000},
{id:'usb4',label:'USB4/Thunderbolt',read:3000,write:2800,iops:200000}
];
const ST_MAP={};ST_DEVS.forEach(d=>ST_MAP[d.id]=d);

function initPower(container,ctx){
const root=el('section',{class:'nib-main nib-power'});
container.appendChild(root);


(function(){
const card=makeCard('pot.watts','Power (Watts)',ctx);
const wValue=el('input',{class:'input mono',type:'text',
inputmode:'decimal',placeholder:'65',autocomplete:'off',spellcheck:'false'});
card.appendChild(el('label',{class:'lbl',text:getStr(ctx,'pot.value','Value')}));
card.appendChild(wValue);
const wFrom=el('select',{class:'select'});
const wTo=el('select',{class:'select'});
fillSelect(wFrom,W_UNITS,'W');fillSelect(wTo,W_UNITS,'kW');
card.appendChild(dual(
labelUnit(getStr(ctx,'pot.from','Input unit'),wFrom),
labelUnit(getStr(ctx,'pot.to','Output unit'),wTo)
));
const out=makeOutlineRow(getStr(ctx,'pot.result','Result'));
out.row.style.marginTop='14px';
card.appendChild(out.row);
const m=makeMeter();
m.label.textContent=getStr(ctx,'pot.quality','Quality / Use');
card.appendChild(m.wrap);
const err=el('div',{class:'error'});
card.appendChild(err);

function quality(w){
const G=(k,fb)=>getStr(ctx,k,fb);
if(w<0)return{cls:'bad',txt:G('w.neg','Negative value'),desc:G('w.neg.d','Power cannot be negative.')};
if(w===0)return{cls:'neutral',txt:G('w.zero','No load'),desc:G('w.zero.d','No consumption or power.')};
if(w<1)return{cls:'neutral',txt:G('w.vlow','Very low'),desc:G('w.vlow.d','Sensors, LEDs, microcontrollers.')};
if(w<5)return{cls:'good',txt:G('w.low','Low'),desc:G('w.low.d','Slow charger, router, small devices.')};
if(w<15)return{cls:'good',txt:G('w.mod','Moderate'),desc:G('w.mod.d','Basic phone charge, speakers, USB hubs.')};
if(w<30)return{cls:'good',txt:G('w.good','Good'),desc:G('w.good.d','Fast phone charge, tablet, mini-PC.')};
if(w<65)return{cls:'good',txt:G('w.vgood','Very good'),desc:G('w.vgood.d','Standard laptop, USB-C PD fast charge.')};
if(w<100)return{cls:'good',txt:G('w.exc','Excellent'),desc:G('w.exc.d','Powerful laptop, high-end fast charge.')};
if(w<250)return{cls:'mid',txt:G('w.high','High'),desc:G('w.high.d','Workstation, mid-range GPU, large monitors.')};
if(w<500)return{cls:'mid',txt:G('w.vhigh','Very high'),desc:G('w.vhigh.d','Gaming PC, small appliances.')};
if(w<1000)return{cls:'mid',txt:G('w.extreme','Extreme'),desc:G('w.extreme.d','Large appliances, power tools.')};
if(w<5000)return{cls:'bad',txt:G('w.ind','Industrial'),desc:G('w.ind.d','Industrial equipment, large motors.')};
return{cls:'bad',txt:G('w.vind','Very industrial'),desc:G('w.vind.d','Industrial-grade power or higher.')};
}
function render(){
err.classList.remove('show');
const raw=wValue.value.trim();
if(raw===''){
out.v.textContent='—';
m.badge.className='badge neutral';m.badge.textContent='—';
m.fill.style.width='0%';m.fill.style.background='transparent';
m.desc.textContent=getStr(ctx,'pot.intro','Enter a value.');return;
}
const n=parseNum(raw);
if(n===null){
err.textContent=getStr(ctx,'err.invalidNum','Invalid number.');
err.classList.add('show');out.v.textContent='—';return;
}
const f=W_MAP[wFrom.value],t=W_MAP[wTo.value];
const watts=n*f.factor,result=watts/t.factor;
out.v.textContent=fmt(result)+' '+t.id;
const q=quality(watts);
const pct=watts<=0?0:Math.max(3,Math.min(100,
Math.log10(1+watts)/Math.log10(5001)*100));
m.badge.className='badge '+q.cls;
m.badge.textContent=q.txt;
m.desc.textContent=q.desc+' ('+fmt(watts)+' W)';
m.fill.style.width=pct+'%';
m.fill.style.background=paintColor(q.cls);
}
wValue.addEventListener('input',render);
wFrom.addEventListener('change',render);
wTo.addEventListener('change',render);
root.appendChild(card);
})();


(function(){
const card=makeCard('pot.heat','CPU Heat Meter',ctx);
const hC=el('input',{class:'input mono',type:'text',
inputmode:'decimal',placeholder:'65'});
const hF=el('input',{class:'input mono',type:'text',
inputmode:'decimal',placeholder:'149'});
card.appendChild(dual(
labelUnit(getStr(ctx,'pot.heatC','Celsius (°C)'),hC),
labelUnit(getStr(ctx,'pot.heatF','Fahrenheit (°F)'),hF)
));
const usage=makeOutlineRow(getStr(ctx,'pot.heatUsage','Estimated usage'));
usage.row.style.marginTop='14px';
card.appendChild(usage.row);
const m=makeMeter();
m.label.textContent=getStr(ctx,'pot.heatDanger','Danger level');
card.appendChild(m.wrap);
const err=el('div',{class:'error'});
card.appendChild(err);
function toF(c){return c*9/5+32;}
function toC(f){return(f-32)*5/9;}

function quality(c){
const G=(k,fb)=>getStr(ctx,k,fb);
if(c<30)return{cls:'good',txt:G('pot.heat.cold','Cold'),desc:G('pot.heat.cold.d','CPU idle or just powered on.'),pct:0.1};
if(c<50)return{cls:'good',txt:G('pot.heat.cool','Cool'),desc:G('pot.heat.cool.d','Normal temperature under light load.'),pct:0.3};
if(c<65)return{cls:'good',txt:G('pot.heat.warm','Warm'),desc:G('pot.heat.warm.d','Moderate use or light gaming.'),pct:0.5};
if(c<75)return{cls:'mid',txt:G('pot.heat.hot','Hot'),desc:G('pot.heat.hot.d','Heavy use or gaming. Ventilation recommended.'),pct:0.7};
if(c<85)return{cls:'mid',txt:G('pot.heat.vhot','Very hot'),desc:G('pot.heat.vhot.d','Near limit. Throttling risk.'),pct:0.85};
if(c<95)return{cls:'bad',txt:G('pot.heat.danger','Danger'),desc:G('pot.heat.danger.d','Damage risk. Shut down the device.'),pct:0.95};
return{cls:'bad',txt:G('pot.heat.extreme','Extreme!'),desc:G('pot.heat.extreme.d','Imminent danger. Shut down now.'),pct:1};
}
let syncing=false;
function render(src){
err.classList.remove('show');
const rc=hC.value.trim(),rf=hF.value.trim();
if(!rc&&!rf){
usage.v.textContent='—';
m.badge.className='badge neutral';m.badge.textContent='—';
m.fill.style.width='0%';m.desc.textContent='—';return;
}
let cVal;
if(src==='F'){
const f=parseNum(rf);
if(f===null){err.textContent=getStr(ctx,'err.invalidNum','Invalid.');err.classList.add('show');return;}
cVal=toC(f);
}else{
const c=parseNum(rc);
if(c===null){err.textContent=getStr(ctx,'err.invalidNum','Invalid.');err.classList.add('show');return;}
cVal=c;
}
syncing=true;
if(src==='F')hC.value=fmt(cVal);else hF.value=fmt(toF(cVal));
syncing=false;
const q=quality(cVal);
m.badge.className='badge '+q.cls;
m.badge.textContent=q.txt;
m.desc.textContent=q.desc;
usage.v.textContent=Math.round(q.pct*100)+'%';
m.fill.style.width=(q.pct*100)+'%';
m.fill.style.background=paintColor(q.cls);
}
hC.addEventListener('input',()=>{if(!syncing)render('C');});
hF.addEventListener('input',()=>{if(!syncing)render('F');});
root.appendChild(card);
})();


(function(){
const card=makeCard('pot.speed','Connection speed',ctx);
const inp=el('input',{class:'input mono',type:'text',
inputmode:'decimal',placeholder:'100'});
card.appendChild(el('label',{class:'lbl',
text:getStr(ctx,'pot.speedValue','Speed')}));
card.appendChild(inp);
const sFrom=el('select',{class:'select'});
const sTo=el('select',{class:'select'});
fillSelect(sFrom,SP_UNITS,'Mbps');fillSelect(sTo,SP_UNITS,'MB/s');
card.appendChild(dual(
labelUnit(getStr(ctx,'pot.speedUnit','Unit'),sFrom),
labelUnit(getStr(ctx,'pot.speedTo','Convert to'),sTo)
));
const out=makeOutlineRow(getStr(ctx,'pot.speedEquiv','Equivalent'));
out.row.style.marginTop='14px';
card.appendChild(out.row);
const dl=makeMeter();
dl.label.textContent='⬇ '+getStr(ctx,'pot.download','Download');
const ul=makeMeter();
ul.label.textContent='⬆ '+getStr(ctx,'pot.upload','Upload');
card.appendChild(dl.wrap);
card.appendChild(ul.wrap);
const err=el('div',{class:'error'});
card.appendChild(err);

function qDl(mbps){
const G=(k,fb)=>getStr(ctx,k,fb);
if(mbps<=0)return{cls:'neutral',txt:'—',desc:'—'};
if(mbps<1)return{cls:'bad',txt:G('s.vbad','Very bad'),desc:G('s.vbad.d','Not suitable for streaming or video calls.')};
if(mbps<5)return{cls:'bad',txt:G('s.bad','Bad'),desc:G('s.bad.d','Slow browsing, issues with HD video.')};
if(mbps<25)return{cls:'mid',txt:G('s.reg','Fair'),desc:G('s.reg.d','HD video, acceptable video calls.')};
if(mbps<100)return{cls:'good',txt:G('s.good','Good'),desc:G('s.good.d','4K streaming, smooth online gaming.')};
if(mbps<500)return{cls:'good',txt:G('s.vgood','Very good'),desc:G('s.vgood.d','Fast downloads, multiple devices.')};
return{cls:'good',txt:G('s.exc','Excellent'),desc:G('s.exc.d','High-end fiber, professional use.')};
}
function qUl(mbps){
const G=(k,fb)=>getStr(ctx,k,fb);
if(mbps<=0)return{cls:'neutral',txt:'—',desc:'—'};
if(mbps<0.5)return{cls:'bad',txt:G('s.up.vbad','Very bad'),desc:G('s.up.vbad.d','Hard to upload files or make video calls.')};
if(mbps<2)return{cls:'bad',txt:G('s.up.bad','Bad'),desc:G('s.up.bad.d','Slow uploads, poor live quality.')};
if(mbps<10)return{cls:'mid',txt:G('s.up.reg','Fair'),desc:G('s.up.reg.d','Acceptable upload for home use.')};
if(mbps<50)return{cls:'good',txt:G('s.up.good','Good'),desc:G('s.up.good.d','Live streaming, cloud backups.')};
if(mbps<200)return{cls:'good',txt:G('s.up.vgood','Very good'),desc:G('s.up.vgood.d','Professional streaming, large uploads.')};
return{cls:'good',txt:G('s.up.exc','Excellent'),desc:G('s.up.exc.d','Professional / enterprise grade.')};
}

function paint(m,q,mbps){
m.badge.className='badge '+q.cls;
m.badge.textContent=q.txt;
m.desc.textContent=q.desc+(mbps>0?' ('+fmt(mbps)+' Mbps)':'');
const pct=mbps<=0?0:Math.max(3,Math.min(100,
Math.log10(1+mbps)/Math.log10(1001)*100));
m.fill.style.width=pct+'%';
m.fill.style.background=paintColor(q.cls);
}
function render(){
err.classList.remove('show');
const raw=inp.value.trim();
if(raw===''){
out.v.textContent='—';
paint(dl,{cls:'neutral',txt:'—',desc:'—'},0);
paint(ul,{cls:'neutral',txt:'—',desc:'—'},0);
return;
}
const n=parseNum(raw);
if(n===null||n<0){
err.textContent=getStr(ctx,'err.invalidPos','Positive number.');
err.classList.add('show');out.v.textContent='—';return;
}
const f=SP_MAP[sFrom.value],t=SP_MAP[sTo.value];
const bps=n*f.factor,result=bps/t.factor;
out.v.textContent=fmt(result)+' '+t.id;
const mbps=bps/1e6;
paint(dl,qDl(mbps),mbps);
paint(ul,qUl(mbps),mbps);
}
inp.addEventListener('input',render);
sFrom.addEventListener('change',render);
sTo.addEventListener('change',render);
root.appendChild(card);
})();


(function(){
const card=makeCard('pot.cpu','CPU Speed (GHz)',ctx);
const inp=el('input',{class:'input mono',type:'text',
inputmode:'decimal',placeholder:'3.5'});
card.appendChild(el('label',{class:'lbl',
text:getStr(ctx,'pot.cpuValue','Frequency')}));
card.appendChild(inp);
const cFrom=el('select',{class:'select'});
const cTo=el('select',{class:'select'});
fillSelect(cFrom,CPU_UNITS,'GHz');fillSelect(cTo,CPU_UNITS,'MHz');
card.appendChild(dual(
labelUnit(getStr(ctx,'pot.cpuUnit','Unit'),cFrom),
labelUnit(getStr(ctx,'pot.cpuTo','Convert to'),cTo)
));
const out=makeOutlineRow(getStr(ctx,'pot.cpuEquiv','Equivalent'));
out.row.style.marginTop='14px';
card.appendChild(out.row);
const m=makeMeter();
m.label.textContent=getStr(ctx,'pot.cpuPerf','Performance');
card.appendChild(m.wrap);
const cores=el('div',{class:'cpu-cores'});
const coreRefs={};
['GHz','MHz',getStr(ctx,'pot.cpuPeriod','Period'),
getStr(ctx,'pot.cpuOps','Ops/s')].forEach((lbl,i)=>{
const cc=el('div',{class:'cc'},[
el('div',{class:'n',text:'—'}),
el('div',{class:'c',text:lbl})
]);
coreRefs[i]=cc.children[0];
cores.appendChild(cc);
});
card.appendChild(cores);
const err=el('div',{class:'error'});
card.appendChild(err);

function q(ghz){
const G=(k,fb)=>getStr(ctx,k,fb);
if(ghz<=0)return{cls:'neutral',txt:'—',desc:'—'};
if(ghz<0.01)return{cls:'bad',txt:G('c.retro','Retro'),desc:G('c.retro.d','Old 8/16-bit processors.')};
if(ghz<0.5)return{cls:'bad',txt:G('c.vslow','Very slow'),desc:G('c.vslow.d','Embedded devices or very old hardware.')};
if(ghz<1)return{cls:'mid',txt:G('c.slow','Slow'),desc:G('c.slow.d','Basic phones, IoT, budget mini PCs.')};
if(ghz<2)return{cls:'mid',txt:G('c.basic','Basic'),desc:G('c.basic.d','Light use: browsing, office work.')};
if(ghz<3)return{cls:'good',txt:G('c.good','Good'),desc:G('c.good.d','Mid-range: smooth multitasking, light gaming.')};
if(ghz<4)return{cls:'good',txt:G('c.vgood','Very good'),desc:G('c.vgood.d','High-end: gaming, editing, productivity.')};
if(ghz<5)return{cls:'good',txt:G('c.exc','Excellent'),desc:G('c.exc.d','High performance: demanding gaming, 4K editing.')};
if(ghz<8)return{cls:'mid',txt:G('c.extreme','Extreme'),desc:G('c.extreme.d','Overclocked / high-performance servers.')};
return{cls:'bad',txt:G('c.insane','Insane'),desc:G('c.insane.d','Server-grade or experimental.')};
}
function render(){
err.classList.remove('show');
const raw=inp.value.trim();
if(raw===''){
out.v.textContent='—';
m.badge.className='badge neutral';m.badge.textContent='—';
m.fill.style.width='0%';m.desc.textContent='—';
Object.values(coreRefs).forEach(r=>r.textContent='—');
return;
}
const n=parseNum(raw);
if(n===null||n<0){
err.textContent=getStr(ctx,'err.invalidPos','Positive number.');
err.classList.add('show');out.v.textContent='—';return;
}
const f=CPU_MAP[cFrom.value],t=CPU_MAP[cTo.value];
const hz=n*f.factor,result=hz/t.factor;
out.v.textContent=fmt(result)+' '+t.id;
const ghz=hz/1e9;
const quality=q(ghz);
m.badge.className='badge '+quality.cls;
m.badge.textContent=quality.txt;
m.desc.textContent=quality.desc+' ('+fmt(ghz)+' GHz)';
const minGHz=0.001,maxGHz=10;
const pct=ghz<=minGHz?3:Math.max(3,Math.min(100,
(Math.log10(ghz)-Math.log10(minGHz))/
(Math.log10(maxGHz)-Math.log10(minGHz))*100));
m.fill.style.width=pct+'%';
m.fill.style.background=paintColor(quality.cls);
coreRefs[0].textContent=fmt(ghz);
coreRefs[1].textContent=fmt(hz/1e6);
if(hz>0){
const period=1/hz;
if(period>=1)coreRefs[2].textContent=fmt(period)+' s';
else if(period>=1e-3)coreRefs[2].textContent=fmt(period*1e3)+' ms';
else if(period>=1e-6)coreRefs[2].textContent=fmt(period*1e6)+' µs';
else coreRefs[2].textContent=fmt(period*1e9)+' ns';
if(hz>=1e9)coreRefs[3].textContent=fmt(hz/1e9)+' G';
else if(hz>=1e6)coreRefs[3].textContent=fmt(hz/1e6)+' M';
else if(hz>=1e3)coreRefs[3].textContent=fmt(hz/1e3)+' K';
else coreRefs[3].textContent=fmt(hz);
}
}
inp.addEventListener('input',render);
cFrom.addEventListener('change',render);
cTo.addEventListener('change',render);
root.appendChild(card);
})();


(function(){
const card=makeCard('pot.ram','RAM Speed',ctx);
const qty=el('input',{class:'input mono',type:'text',
inputmode:'decimal',placeholder:'16'});
card.appendChild(el('label',{class:'lbl',
text:getStr(ctx,'pot.ramQty','Amount')}));
card.appendChild(qty);
const qtyUnit=el('select',{class:'select'});
['MB','GB','TB'].forEach(v=>{
const o=el('option',{value:v,text:v});
if(v==='GB')o.selected=true;
qtyUnit.appendChild(o);
});
card.appendChild(el('div',{style:'margin-top:12px;'},[
el('label',{class:'lbl',text:getStr(ctx,'pot.ramQtyUnit','Unit')}),
qtyUnit
]));
const genSel=el('select',{class:'select'});
RAM_GENS.forEach(g=>{
const o=el('option',{value:g.id,text:g.label});
if(g.id==='ddr4')o.selected=true;
genSel.appendChild(o);
});
const spdSel=el('select',{class:'select'});
function refillSpeeds(){
const cur=spdSel.value;
spdSel.innerHTML='';
const g=RAM_MAP[genSel.value];
g.speeds.forEach(s=>{
const o=el('option',{value:String(s),text:s+' MT/s'});
if(String(s)===cur)o.selected=true;
spdSel.appendChild(o);
});
if(!spdSel.value)spdSel.value=g.speeds[Math.floor(g.speeds.length/2)];
}
refillSpeeds();
genSel.addEventListener('change',refillSpeeds);
card.appendChild(el('div',{class:'dual'},[
labelUnit(getStr(ctx,'pot.ramGen','Generation'),genSel),
labelUnit(getStr(ctx,'pot.ramSpeed','Speed'),spdSel)
]));
const total=makeOutlineRow(getStr(ctx,'pot.ramTotal','Total capacity'));
total.row.style.marginTop='14px';
const bw=makeOutlineRow(getStr(ctx,'pot.ramBandwidth','Bandwidth per channel'));
const dual2=makeOutlineRow(getStr(ctx,'pot.ramDual','Dual channel (2 channels)'));
card.appendChild(total.row);
card.appendChild(bw.row);
card.appendChild(dual2.row);
const m=makeMeter();
m.label.textContent=getStr(ctx,'pot.ramQuality','Performance');
card.appendChild(m.wrap);
const err=el('div',{class:'error'});
card.appendChild(err);

function quality(gb,gen){
const G=(k,fb)=>getStr(ctx,k,fb);
if(gen==='ddr'||gen==='ddr2')return{cls:'bad',txt:G('rm.legacy','Legacy'),desc:G('rm.legacy.d','Old RAM. Only useful for retro machines.')};
if(gb<4)return{cls:'bad',txt:G('rm.basic','Basic'),desc:G('rm.basic.d','Enough for very light tasks.')};
if(gb<8)return{cls:'mid',txt:G('rm.office','Office'),desc:G('rm.office.d','Browsing, office work, basic daily use.')};
if(gb<16)return{cls:'good',txt:G('rm.good','Good'),desc:G('rm.good.d','Smooth multitasking, gaming and light editing.')};
if(gb<32)return{cls:'good',txt:G('rm.vgood','Very good'),desc:G('rm.vgood.d','Gaming, video editing, heavy workloads.')};
if(gb<64)return{cls:'good',txt:G('rm.exc','Excellent'),desc:G('rm.exc.d','Workstation, virtualization, servers.')};
return{cls:'good',txt:G('rm.extreme','Extreme'),desc:G('rm.extreme.d','Professional workstation or high-performance server.')};
}

function render(){
err.classList.remove('show');
const raw=qty.value.trim();
if(raw===''){
total.v.textContent='—';bw.v.textContent='—';dual2.v.textContent='—';
m.badge.className='badge neutral';m.badge.textContent='—';
m.fill.style.width='0%';m.desc.textContent='—';return;
}
const n=parseNum(raw);
if(n===null||n<0){
err.textContent=getStr(ctx,'err.invalidPos','Positive number.');
err.classList.add('show');return;
}
const factor=qtyUnit.value==='MB'?1/1024:qtyUnit.value==='TB'?1024:1;
const gb=n*factor;
const gen=RAM_MAP[genSel.value];
const mt=parseInt(spdSel.value,10);
const bwCh=mt*8/1000;
const bwDual=bwCh*2;
total.v.textContent=fmt(gb)+' GB';
bw.v.textContent=fmt(bwCh)+' GB/s';
dual2.v.textContent=fmt(bwDual)+' GB/s';
const qualityObj=quality(gb,gen.id);
m.badge.className='badge '+qualityObj.cls;
m.badge.textContent=qualityObj.txt;
m.desc.textContent=qualityObj.desc+' · '+
gen.label+'-'+mt+' · '+fmt(bwDual)+' GB/s';
const minB=1.6,maxB=67.2;
const pct=bwCh<=minB?3:Math.max(3,Math.min(100,
(Math.log10(bwCh)-Math.log10(minB))/
(Math.log10(maxB)-Math.log10(minB))*100));
m.fill.style.width=pct+'%';
m.fill.style.background=paintColor(qualityObj.cls);
}
qty.addEventListener('input',render);
qtyUnit.addEventListener('change',render);
spdSel.addEventListener('change',render);
root.appendChild(card);
})();


(function(){
const card=makeCard('pot.storage','Storage speed',ctx);
const qty=el('input',{class:'input mono',type:'text',
inputmode:'decimal',placeholder:'512'});
card.appendChild(el('label',{class:'lbl',
text:getStr(ctx,'pot.stQty','Capacity')}));
card.appendChild(qty);
const unit=el('select',{class:'select'});
['GB','TB'].forEach(v=>{
const o=el('option',{value:v,text:v});
if(v==='GB')o.selected=true;
unit.appendChild(o);
});
card.appendChild(el('div',{style:'margin-top:12px;'},[
el('label',{class:'lbl',text:getStr(ctx,'pot.stUnit','Unit')}),
unit
]));
const typeSel=el('select',{class:'select'});
ST_DEVS.forEach(d=>{
const o=el('option',{value:d.id,text:d.label});
if(d.id==='sataSSD')o.selected=true;
typeSel.appendChild(o);
});
card.appendChild(el('div',{style:'margin-top:12px;'},[
el('label',{class:'lbl',text:getStr(ctx,'pot.stType','Device type')}),
typeSel
]));
const readRow=makeOutlineRow(getStr(ctx,'pot.stRead','Sequential read'));
readRow.row.style.marginTop='14px';
const writeRow=makeOutlineRow(getStr(ctx,'pot.stWrite','Sequential write'));
const iopsRow=makeOutlineRow(getStr(ctx,'pot.stIOPS','IOPS (4K random)'));
card.appendChild(readRow.row);
card.appendChild(writeRow.row);
card.appendChild(iopsRow.row);
const m=makeMeter();
m.label.textContent=getStr(ctx,'pot.stQuality','Performance');
card.appendChild(m.wrap);
const err=el('div',{class:'error'});
card.appendChild(err);
function fmtSpeed(mbs){return mbs>=1000?fmt(mbs/1000)+' GB/s':fmt(mbs)+' MB/s';}
function fmtIops(v){
if(v>=1e6)return fmt(v/1e6)+' M';
if(v>=1e3)return fmt(v/1e3)+' K';
return String(v);
}

function quality(r){
const G=(k,fb)=>getStr(ctx,k,fb);
if(r<50)return{cls:'bad',txt:G('sq.slow','Very slow'),desc:G('sq.slow.d','Old storage or low-speed card.')};
if(r<300)return{cls:'mid',txt:G('sq.basic','Basic'),desc:G('sq.basic.d','Traditional HDD or budget storage.')};
if(r<900)return{cls:'good',txt:G('sq.good','Good'),desc:G('sq.good.d','SATA SSD or high-speed card. Noticeable improvement.')};
if(r<3500)return{cls:'good',txt:G('sq.vgood','Very good'),desc:G('sq.vgood.d','NVMe Gen3 or USB 3.2. Very fast boot and apps.')};
if(r<8000)return{cls:'good',txt:G('sq.exc','Excellent'),desc:G('sq.exc.d','NVMe Gen4. High-end performance.')};
return{cls:'good',txt:G('sq.extreme','Extreme'),desc:G('sq.extreme.d','NVMe Gen5 or Thunderbolt. Professional grade.')};
}

function render(){
err.classList.remove('show');
const raw=qty.value.trim();
if(raw===''){
readRow.v.textContent='—';writeRow.v.textContent='—';iopsRow.v.textContent='—';
m.badge.className='badge neutral';m.badge.textContent='—';
m.fill.style.width='0%';m.desc.textContent='—';return;
}
const n=parseNum(raw);
if(n===null||n<0){
err.textContent=getStr(ctx,'err.invalidPos','Positive number.');
err.classList.add('show');return;
}
const gb=unit.value==='TB'?n*1024:n;
const dev=ST_MAP[typeSel.value];
readRow.v.textContent=fmtSpeed(dev.read);
writeRow.v.textContent=fmtSpeed(dev.write);
iopsRow.v.textContent=fmtIops(dev.iops);
const qualityObj=quality(dev.read);
m.badge.className='badge '+qualityObj.cls;
m.badge.textContent=qualityObj.txt;
m.desc.textContent=qualityObj.desc+' · '+dev.label+' · '+fmt(gb)+' GB';
const minR=20,maxR=14000;
const pct=dev.read<=minR?3:Math.max(3,Math.min(100,
(Math.log10(dev.read)-Math.log10(minR))/
(Math.log10(maxR)-Math.log10(minR))*100));
m.fill.style.width=pct+'%';
m.fill.style.background=paintColor(qualityObj.cls);
}
qty.addEventListener('input',render);
unit.addEventListener('change',render);
typeSel.addEventListener('change',render);
root.appendChild(card);
})();

return{refresh(){},destroy(){root.remove();}};
}


const A_UNITS=[
{id:'bps',label:'bps',factor:1},
{id:'kbps',label:'kbps',factor:1e3},
{id:'Mbps',label:'Mbps',factor:1e6},
{id:'KB/s',label:'KB/s',factor:8e3},
{id:'MB/s',label:'MB/s',factor:8e6}
];
const A_MAP={};A_UNITS.forEach(u=>A_MAP[u.id]=u);

const DB_UNITS=[
{id:'dB SPL',label:'dB SPL',ref:20e-6},
{id:'dBu',label:'dBu',ref:0.775},
{id:'dBV',label:'dBV',ref:1.0},
{id:'dBFS',label:'dBFS',ref:null},
{id:'dBm',label:'dBm',ref:1e-3}
];
const DB_MAP={};DB_UNITS.forEach(u=>DB_MAP[u.id]=u);

const V_UNITS=[
{id:'px',label:'px (total)',factor:1},
{id:'Kpx',label:'Kpx (mil)',factor:1e3},
{id:'Mpx',label:'Mpx (millón)',factor:1e6},
{id:'MP',label:'MP (megapíxel)',factor:1e6},
{id:'Gpx',label:'Gpx (mil millones)',factor:1e9}
];
const V_MAP={};V_UNITS.forEach(u=>V_MAP[u.id]=u);

const T_UNITS=[
{id:'ns',label:'ns',factor:1e-9},
{id:'µs',label:'µs',factor:1e-6},
{id:'ms',label:'ms',factor:1e-3},
{id:'s',label:'s',factor:1},
{id:'min',label:'min',factor:60},
{id:'h',label:'h',factor:3600},
{id:'d',label:'día',factor:86400},
{id:'w',label:'semana',factor:604800},
{id:'mo',label:'mes',factor:2629746},
{id:'y',label:'año',factor:31556952},
{id:'dec',label:'década',factor:315569520},
{id:'cen',label:'siglo',factor:3155695200},
{id:'mil',label:'milenio',factor:31556952000}
];
const T_MAP={};T_UNITS.forEach(u=>T_MAP[u.id]=u);

const FR_UNITS=[
{id:'fpns',label:'frames/ns',factor:1e9},
{id:'fpµs',label:'frames/µs',factor:1e6},
{id:'fpms',label:'frames/ms',factor:1e3},
{id:'fps',label:'frames/s',factor:1},
{id:'fpmin',label:'frames/min',factor:1/60},
{id:'fph',label:'frames/h',factor:1/3600},
{id:'fpd',label:'frames/día',factor:1/86400},
{id:'fpw',label:'frames/sem',factor:1/604800},
{id:'fpm',label:'frames/mes',factor:1/2629746},
{id:'fpy',label:'frames/año',factor:1/31556952}
];
const FR_MAP={};FR_UNITS.forEach(u=>FR_MAP[u.id]=u);

const CODECS={
audio:[
{id:'mp3',name:'MP3',full:'MPEG-1 Audio Layer III',year:1993,type:'lossy',quality:55,eff:35,br:'128–320 kbps',compat:{android:'yes',ios:'yes',windows:'yes',web:'yes'}},
{id:'aac',name:'AAC',full:'Advanced Audio Coding',year:1997,type:'lossy',quality:75,eff:65,br:'128–256 kbps',compat:{android:'yes',ios:'yes',windows:'yes',web:'yes'}},
{id:'opus',name:'Opus',full:'Opus (RFC 6716)',year:2012,type:'lossy',quality:92,eff:95,br:'64–256 kbps',compat:{android:'yes',ios:'yes',windows:'yes',web:'yes'}},
{id:'vorbis',name:'Vorbis',full:'Ogg Vorbis',year:2000,type:'lossy',quality:78,eff:72,br:'128–320 kbps',compat:{android:'yes',ios:'no',windows:'partial',web:'yes'}},
{id:'ac3',name:'AC-3',full:'Dolby Digital',year:1992,type:'lossy',quality:70,eff:50,br:'192–640 kbps',compat:{android:'yes',ios:'no',windows:'yes',web:'no'}},
{id:'flac',name:'FLAC',full:'Free Lossless Audio Codec',year:2001,type:'lossless',quality:100,eff:40,br:'700–1500 kbps',compat:{android:'yes',ios:'partial',windows:'yes',web:'yes'}},
{id:'alac',name:'ALAC',full:'Apple Lossless',year:2004,type:'lossless',quality:100,eff:38,br:'700–1500 kbps',compat:{android:'partial',ios:'yes',windows:'partial',web:'partial'}},
{id:'wav',name:'WAV',full:'Waveform Audio (PCM)',year:1991,type:'uncompressed',quality:100,eff:5,br:'1411 kbps',compat:{android:'yes',ios:'yes',windows:'yes',web:'yes'}}
],
video:[
{id:'h264',name:'H.264',full:'MPEG-4 AVC',year:2003,type:'lossy',quality:80,eff:65,br:'1–20 Mbps',compat:{android:'yes',ios:'yes',windows:'yes',web:'yes'}},
{id:'h265',name:'H.265',full:'HEVC',year:2013,type:'lossy',quality:90,eff:90,br:'0.5–15 Mbps',compat:{android:'yes',ios:'yes',windows:'partial',web:'partial'}},
{id:'vp9',name:'VP9',full:'Google VP9',year:2013,type:'lossy',quality:88,eff:85,br:'0.5–15 Mbps',compat:{android:'yes',ios:'partial',windows:'partial',web:'yes'}},
{id:'av1',name:'AV1',full:'AOMedia Video 1',year:2018,type:'lossy',quality:95,eff:95,br:'0.3–12 Mbps',compat:{android:'partial',ios:'partial',windows:'partial',web:'yes'}},
{id:'prores',name:'ProRes',full:'Apple ProRes',year:2007,type:'lossyM',quality:98,eff:20,br:'50–300 Mbps',compat:{android:'no',ios:'yes',windows:'no',web:'no'}},
{id:'dnxhd',name:'DNxHD',full:'Avid DNxHD',year:2007,type:'lossyM',quality:98,eff:22,br:'36–220 Mbps',compat:{android:'no',ios:'no',windows:'partial',web:'no'}}
]
};

function initMedia(container,ctx){
const root=el('section',{class:'nib-main nib-media'});
container.appendChild(root);


(function(){
const card=makeCard('pot.audio','Audio bitrate',ctx);
const inp=el('input',{class:'input mono',type:'text',inputmode:'decimal',placeholder:'320'});
card.appendChild(el('label',{class:'lbl',text:getStr(ctx,'pot.audioValue','Bitrate')}));
card.appendChild(inp);
const aF=el('select',{class:'select'});
const aT=el('select',{class:'select'});
fillSelect(aF,A_UNITS,'kbps');fillSelect(aT,A_UNITS,'kbps');
card.appendChild(dual(
labelUnit(getStr(ctx,'pot.audioUnit','Unit'),aF),
labelUnit(getStr(ctx,'pot.audioTo','Convert to'),aT)
));
const out=makeOutlineRow(getStr(ctx,'pot.audioEquiv','Equivalent'));
out.row.style.marginTop='14px';card.appendChild(out.row);
const m=makeMeter();
m.label.textContent=getStr(ctx,'pot.audioQuality','Quality');
card.appendChild(m.wrap);
card.appendChild(el('div',{class:'hint',
text:getStr(ctx,'pot.audioHint','128 kbps ≈ standard · 320 kbps ≈ high.')}));
const err=el('div',{class:'error'});
card.appendChild(err);

function quality(kbps){
const G=(k,fb)=>getStr(ctx,k,fb);
if(kbps<=0)return{cls:'neutral',txt:'—',desc:'—'};
if(kbps<32)return{cls:'bad',txt:G('aq.vlow','Very low'),desc:G('aq.vlow.d','Telephone or voice quality.')};
if(kbps<64)return{cls:'bad',txt:G('aq.low','Low'),desc:G('aq.low.d','Acceptable for voice podcasts.')};
if(kbps<128)return{cls:'mid',txt:G('aq.reg','Fair'),desc:G('aq.reg.d','Casual listening, basic quality.')};
if(kbps<192)return{cls:'good',txt:G('aq.good','Good'),desc:G('aq.good.d','Standard quality, general music.')};
if(kbps<256)return{cls:'good',txt:G('aq.vgood','Very good'),desc:G('aq.vgood.d','High quality, nearly transparent.')};
if(kbps<400)return{cls:'good',txt:G('aq.exc','Excellent'),desc:G('aq.exc.d','High quality, indistinguishable from source.')};
if(kbps<1000)return{cls:'good',txt:G('aq.near','Near lossless'),desc:G('aq.near.d','Transparent with minimal loss.')};
return{cls:'good',txt:G('aq.lossless','Lossless'),desc:G('aq.lossless.d','CD quality or higher, no compression.')};
}

function render(){
err.classList.remove('show');
const raw=inp.value.trim();
if(raw===''){
out.v.textContent='—';
m.badge.className='badge neutral';m.badge.textContent='—';
m.fill.style.width='0%';m.fill.style.background='transparent';
m.desc.textContent=getStr(ctx,'pot.audioIntro','Enter a bitrate.');return;
}
const n=parseNum(raw);
if(n===null||n<0){
err.textContent=getStr(ctx,'err.invalidPos','Positive number.');
err.classList.add('show');out.v.textContent='—';return;
}
const f=A_MAP[aF.value],t=A_MAP[aT.value];
const bps=n*f.factor,result=bps/t.factor;
out.v.textContent=fmt(result)+' '+t.id;
const kbps=bps/1e3;
const q=quality(kbps);
m.badge.className='badge '+q.cls;
m.badge.textContent=q.txt;
m.desc.textContent=q.desc+' ('+fmt(kbps)+' kbps)';
const pct=kbps<=0?0:Math.max(3,Math.min(100,
Math.log10(1+kbps)/Math.log10(1001)*100));
m.fill.style.width=pct+'%';
m.fill.style.background=paintColor(q.cls);
}
inp.addEventListener('input',render);
aF.addEventListener('change',render);
aT.addEventListener('change',render);
root.appendChild(card);
})();


(function(){
const card=makeCard('pot.db','Decibels',ctx);
const inp=el('input',{class:'input mono',type:'text',inputmode:'decimal',placeholder:'60'});
card.appendChild(el('label',{class:'lbl',text:getStr(ctx,'pot.dbValue','Level')}));
card.appendChild(inp);
const dF=el('select',{class:'select'});
const dT=el('select',{class:'select'});
fillSelect(dF,DB_UNITS,'dB SPL');fillSelect(dT,DB_UNITS,'dB SPL');
card.appendChild(dual(
labelUnit(getStr(ctx,'pot.dbUnit','Unit'),dF),
labelUnit(getStr(ctx,'pot.dbTo','Convert to'),dT)
));
const out=makeOutlineRow(getStr(ctx,'pot.dbEquiv','Equivalent'));
out.row.style.marginTop='14px';card.appendChild(out.row);
const m=makeMeter();
m.label.textContent=getStr(ctx,'pot.dbLevel','Sound level');
card.appendChild(m.wrap);
const spec=el('div',{class:'meter-wrap'});
spec.appendChild(el('div',{class:'meter-top'},[
el('span',{class:'meter-label',text:getStr(ctx,'pot.dbSpectrum','Estimated spectrum')})
]));
const bars=el('div',{class:'cpu-bars',style:'height:60px;'});
['bass','mid','treble'].forEach(()=>{
bars.appendChild(el('div',{class:'cpu-bar'},[
el('div',{class:'fill',style:'height:0%'})
]));
});
spec.appendChild(bars);
spec.appendChild(el('div',{class:'cpu-bars-label'},[
el('span',{text:getStr(ctx,'pot.dbBass','Bass')}),
el('span',{text:getStr(ctx,'pot.dbMid','Mid')}),
el('span',{text:getStr(ctx,'pot.dbTreble','Treble')})
]));
card.appendChild(spec);
card.appendChild(el('div',{class:'hint',
text:getStr(ctx,'pot.dbHint','SPL: 0 dB = threshold · 60 dB = conversation.')}));
const err=el('div',{class:'error'});
card.appendChild(err);

function quality(db){
const G=(k,fb)=>getStr(ctx,k,fb);
if(db<0)return{cls:'neutral',txt:'—',desc:'—'};
if(db<10)return{cls:'mid',txt:G('db.silent','Silence'),desc:G('db.silent.d','Hearing threshold, absolute silence.')};
if(db<30)return{cls:'good',txt:G('db.quiet','Very quiet'),desc:G('db.quiet.d','Recording studio, library.')};
if(db<50)return{cls:'good',txt:G('db.calm','Calm'),desc:G('db.calm.d','Quiet home, low conversation.')};
if(db<70)return{cls:'good',txt:G('db.normal','Normal'),desc:G('db.normal.d','Normal conversation, office.')};
if(db<85)return{cls:'good',txt:G('db.busy','Noisy'),desc:G('db.busy.d','Traffic, busy restaurant.')};
if(db<100)return{cls:'mid',txt:G('db.loud','Loud'),desc:G('db.loud.d','Busy street, vacuum cleaner.')};
if(db<115)return{cls:'mid',txt:G('db.vloud','Very loud'),desc:G('db.vloud.d','Concert, drill. Caution.')};
if(db<130)return{cls:'bad',txt:G('db.danger','Dangerous'),desc:G('db.danger.d','Hearing risk with prolonged exposure.')};
return{cls:'bad',txt:G('db.pain','Painful'),desc:G('db.pain.d','Pain threshold, immediate damage.')};
}

function render(){
err.classList.remove('show');
const raw=inp.value.trim();
if(raw===''){
out.v.textContent='—';
m.badge.className='badge neutral';m.badge.textContent='—';
m.fill.style.width='0%';m.desc.textContent='—';
bars.querySelectorAll('.fill').forEach(b=>{b.style.height='0%';b.style.opacity='0';});
return;
}
const n=parseNum(raw);
if(n===null){
err.textContent=getStr(ctx,'err.invalidNum','Invalid number.');
err.classList.add('show');out.v.textContent='—';return;
}
const f=DB_MAP[dF.value],t=DB_MAP[dT.value];
let result=n;
if(f.ref&&t.ref&&f.id!==t.id){
result=n+20*Math.log10(t.ref/f.ref);
}
out.v.textContent=fmt(result)+' '+t.id;
let spl=n;
if(f.id!=='dB SPL'&&f.ref){
spl=n+20*Math.log10(f.ref/20e-6);
}
const q=quality(spl);
m.badge.className='badge '+q.cls;
m.badge.textContent=q.txt;
m.desc.textContent=q.desc+' ('+fmt(spl)+' dB SPL)';
m.fill.style.width=(spl<=0?0:Math.max(2,Math.min(100,spl/140*100)))+'%';
m.fill.style.background=paintColor(q.cls);
if(spl>0){
const bass=Math.min(100,20+spl*0.7);
const mid=Math.min(100,15+spl*0.85);
const trb=Math.min(100,10+spl*0.75);
const vals=[bass,mid,trb];
const colors=['linear-gradient(180deg,#5b8cff,#22d3a6)',
'linear-gradient(180deg,#5b8cff,#a78bfa)',
'linear-gradient(180deg,#a78bfa,#22d3a6)'];
bars.querySelectorAll('.fill').forEach((b,i)=>{
b.style.height=vals[i]+'%';
b.style.background=colors[i];
b.style.opacity='0.9';
});
}
}
inp.addEventListener('input',render);
dF.addEventListener('change',render);
dT.addEventListener('change',render);
root.appendChild(card);
})();


(function(){
const card=makeCard('pot.video','Video resolution',ctx);
const inp=el('input',{class:'input mono',type:'text',inputmode:'decimal',placeholder:'12'});
card.appendChild(el('label',{class:'lbl',text:getStr(ctx,'pot.videoValue','Resolution')}));
card.appendChild(inp);
const vF=el('select',{class:'select'});
const vT=el('select',{class:'select'});
fillSelect(vF,V_UNITS,'MP');fillSelect(vT,V_UNITS,'Mpx');
card.appendChild(dual(
labelUnit(getStr(ctx,'pot.videoUnit','Unit'),vF),
labelUnit(getStr(ctx,'pot.videoTo','Convert to'),vT)
));
const out=makeOutlineRow(getStr(ctx,'pot.videoEquiv','Equivalent'));
out.row.style.marginTop='14px';card.appendChild(out.row);
const m=makeMeter();
m.label.textContent=getStr(ctx,'pot.videoQuality','Quality');
card.appendChild(m.wrap);
card.appendChild(el('div',{class:'hint',
text:getStr(ctx,'pot.videoHint','2 MP ≈ 1080p · 8 MP ≈ 4K · 33 MP ≈ 8K.')}));
const err=el('div',{class:'error'});
card.appendChild(err);

function quality(mp){
const G=(k,fb)=>getStr(ctx,k,fb);
if(mp<=0)return{cls:'neutral',txt:'—',desc:'—'};
if(mp<0.3)return{cls:'bad',txt:G('vq.vlow','Very low'),desc:G('vq.vlow.d','VGA / QVGA. Old cameras or basic webcams.')};
if(mp<1)return{cls:'bad',txt:G('vq.low','Low'),desc:G('vq.low.d','SD (480p). Old video or basic phone.')};
if(mp<2)return{cls:'mid',txt:G('vq.reg','Fair'),desc:G('vq.reg.d','HD ready 720p. Standard video.')};
if(mp<3)return{cls:'good',txt:G('vq.good','Good'),desc:G('vq.good.d','Full HD 1080p. Common high definition.')};
if(mp<5)return{cls:'good',txt:G('vq.vgood','Very good'),desc:G('vq.vgood.d','2K / QHD. Advanced monitors and cameras.')};
if(mp<9)return{cls:'good',txt:G('vq.exc','Excellent'),desc:G('vq.exc.d','4K UHD. Professional high resolution.')};
if(mp<40)return{cls:'good',txt:G('vq.extreme','Extreme'),desc:G('vq.extreme.d','5K–8K. Digital cinema and high-end cameras.')};
return{cls:'good',txt:G('vq.pro','Professional'),desc:G('vq.pro.d','High-resolution full-frame cameras.')};
}

function render(){
err.classList.remove('show');
const raw=inp.value.trim();
if(raw===''){
out.v.textContent='—';
m.badge.className='badge neutral';m.badge.textContent='—';
m.fill.style.width='0%';m.desc.textContent='—';return;
}
const n=parseNum(raw);
if(n===null||n<0){
err.textContent=getStr(ctx,'err.invalidPos','Positive number.');
err.classList.add('show');out.v.textContent='—';return;
}
const f=V_MAP[vF.value],t=V_MAP[vT.value];
const px=n*f.factor,result=px/t.factor;
out.v.textContent=fmt(result)+' '+t.id;
const mp=px/1e6;
const q=quality(mp);
m.badge.className='badge '+q.cls;
m.badge.textContent=q.txt;
m.desc.textContent=q.desc+' ('+fmt(mp)+' MP · '+fmt(px)+' px)';
const pct=mp<=0?0:Math.max(3,Math.min(100,
Math.log10(1+mp)/Math.log10(201)*100));
m.fill.style.width=pct+'%';
m.fill.style.background=paintColor(q.cls);
}
inp.addEventListener('input',render);
vF.addEventListener('change',render);
vT.addEventListener('change',render);
root.appendChild(card);
})();


(function(){
const card=makeCard('pot.time','Time converter',ctx);
const inp=el('input',{class:'input mono',type:'text',inputmode:'decimal',placeholder:'3600'});
card.appendChild(el('label',{class:'lbl',text:getStr(ctx,'pot.timeValue','Amount')}));
card.appendChild(inp);
const tF=el('select',{class:'select'});
const tT=el('select',{class:'select'});
fillSelect(tF,T_UNITS,'s');fillSelect(tT,T_UNITS,'min');
card.appendChild(dual(
labelUnit(getStr(ctx,'pot.timeUnit','Unit'),tF),
labelUnit(getStr(ctx,'pot.timeTo','Convert to'),tT)
));
const out=makeOutlineRow(getStr(ctx,'pot.timeEquiv','Equivalent'));
out.row.style.marginTop='14px';card.appendChild(out.row);
const m=makeMeter();
m.label.textContent=getStr(ctx,'pot.timeScale','Time scale');
card.appendChild(m.wrap);
card.appendChild(el('div',{class:'hint',
text:getStr(ctx,'pot.timeHint','Month ≈ 30.44 days · Year ≈ 365.25 days.')}));
const err=el('div',{class:'error'});
card.appendChild(err);

function quality(sec){
const G=(k,fb)=>getStr(ctx,k,fb);
if(sec<=0)return{cls:'neutral',txt:'—',desc:'—'};
if(sec<1e-6)return{cls:'bad',txt:G('tq.atomic','Atomic'),desc:G('tq.atomic.d','Subatomic scale: nuclear reactions and light.')};
if(sec<0.1)return{cls:'mid',txt:G('tq.micro','Microscopic'),desc:G('tq.micro.d','Electronics and chemical processes scale.')};
if(sec<60)return{cls:'good',txt:G('tq.human','Human'),desc:G('tq.human.d','Everyday life and perception scale.')};
if(sec<86400)return{cls:'good',txt:G('tq.day','Daily'),desc:G('tq.day.d','One-day scale. Sleep, work, circadian cycles.')};
if(sec<604800)return{cls:'good',txt:G('tq.week','Weekly'),desc:G('tq.week.d','One-week scale. Routines and planning.')};
if(sec<2629746)return{cls:'good',txt:G('tq.month','Monthly'),desc:G('tq.month.d','Monthly scale. Cycles, bills, seasons.')};
if(sec<31556952)return{cls:'good',txt:G('tq.year','Yearly'),desc:G('tq.year.d','Annual scale. Birthdays, school cycles.')};
if(sec<315569520)return{cls:'mid',txt:G('tq.decade','Decade'),desc:G('tq.decade.d','Decades scale. Generational changes.')};
if(sec<3155695200)return{cls:'mid',txt:G('tq.century','Century'),desc:G('tq.century.d','Historical scale. Major transformations.')};
return{cls:'mid',txt:G('tq.millennium','Millennium'),desc:G('tq.millennium.d','Millennium scale. Human history.')};
}

function render(){
err.classList.remove('show');
const raw=inp.value.trim();
if(raw===''){
out.v.textContent='—';
m.badge.className='badge neutral';m.badge.textContent='—';
m.fill.style.width='0%';m.desc.textContent='—';return;
}
const n=parseNum(raw);
if(n===null||n<0){
err.textContent=getStr(ctx,'err.invalidPos','Positive number.');
err.classList.add('show');out.v.textContent='—';return;
}
const f=T_MAP[tF.value],t=T_MAP[tT.value];
const sec=n*f.factor,result=sec/t.factor;
out.v.textContent=fmt(result)+' '+t.id;
const q=quality(sec);
m.badge.className='badge '+q.cls;
m.badge.textContent=q.txt;
m.desc.textContent=q.desc+' ('+fmt(sec)+' s)';
const minS=1e-9,maxS=3.156e9;
const pct=sec<=minS?3:Math.max(3,Math.min(100,
(Math.log10(sec)-Math.log10(minS))/
(Math.log10(maxS)-Math.log10(minS))*100));
m.fill.style.width=pct+'%';
m.fill.style.background=paintColor(q.cls);
}
inp.addEventListener('input',render);
tF.addEventListener('change',render);
tT.addEventListener('change',render);
root.appendChild(card);
})();


(function(){
const card=makeCard('pot.frames','Frames per time unit',ctx);
const inp=el('input',{class:'input mono',type:'text',inputmode:'decimal',placeholder:'60'});
card.appendChild(el('label',{class:'lbl',text:getStr(ctx,'pot.framesValue','Frames')}));
card.appendChild(inp);
const fF=el('select',{class:'select'});
const fT=el('select',{class:'select'});
fillSelect(fF,FR_UNITS,'fps');fillSelect(fT,FR_UNITS,'fpms');
card.appendChild(dual(
labelUnit(getStr(ctx,'pot.framesUnit','Unit'),fF),
labelUnit(getStr(ctx,'pot.framesTo','Convert to'),fT)
));
const out=makeOutlineRow(getStr(ctx,'pot.framesEquiv','Equivalent'));
out.row.style.marginTop='14px';card.appendChild(out.row);
const m=makeMeter();
m.label.textContent=getStr(ctx,'pot.framesPerf','Smoothness');
card.appendChild(m.wrap);
card.appendChild(el('div',{class:'hint',
text:getStr(ctx,'pot.framesHint','24 fps = cinema · 30 fps = standard · 60 fps = smooth.')}));
const err=el('div',{class:'error'});
card.appendChild(err);

function quality(fps){
const G=(k,fb)=>getStr(ctx,k,fb);
if(fps<=0)return{cls:'neutral',txt:'—',desc:'—'};
if(fps<15)return{cls:'bad',txt:G('fq.slideshow','Slideshow'),desc:G('fq.slideshow.d','Very choppy motion, unusable for video.')};
if(fps<24)return{cls:'bad',txt:G('fq.low','Low'),desc:G('fq.low.d','Basic animation or old video.')};
if(fps<30)return{cls:'mid',txt:G('fq.cinema','Cinema'),desc:G('fq.cinema.d','Cinematic standard 24 fps.')};
if(fps<60)return{cls:'good',txt:G('fq.standard','Standard'),desc:G('fq.standard.d','Standard video and TV (30 fps).')};
if(fps<120)return{cls:'good',txt:G('fq.smooth','Smooth'),desc:G('fq.smooth.d','Casual gaming and modern video (60 fps).')};
if(fps<240)return{cls:'good',txt:G('fq.verySmooth','Very smooth'),desc:G('fq.verySmooth.d','High rate for gaming and fast motion (90–144 fps).')};
if(fps<1000)return{cls:'mid',txt:G('fq.extreme','Extreme'),desc:G('fq.extreme.d','Competitive gaming / high refresh monitors (144–240 fps).')};
return{cls:'mid',txt:G('fq.insane','Insane'),desc:G('fq.insane.d','Beyond human eye and most displays (240+ fps).')};
}

function render(){
err.classList.remove('show');
const raw=inp.value.trim();
if(raw===''){
out.v.textContent='—';
m.badge.className='badge neutral';m.badge.textContent='—';
m.fill.style.width='0%';m.desc.textContent='—';return;
}
const n=parseNum(raw);
if(n===null||n<0){
err.textContent=getStr(ctx,'err.invalidPos','Positive number.');
err.classList.add('show');out.v.textContent='—';return;
}
const f=FR_MAP[fF.value],t=FR_MAP[fT.value];
const fps=n*f.factor,result=fps/t.factor;
out.v.textContent=fmt(result)+' '+t.id;
const q=quality(fps);
m.badge.className='badge '+q.cls;
m.badge.textContent=q.txt;
m.desc.textContent=q.desc+' ('+fmt(fps)+' fps)';
const minF=1,maxF=1000;
const pct=fps<=minF?3:Math.max(3,Math.min(100,
(Math.log10(fps)-Math.log10(minF))/
(Math.log10(maxF)-Math.log10(minF))*100));
m.fill.style.width=pct+'%';
m.fill.style.background=paintColor(q.cls);
}
inp.addEventListener('input',render);
fF.addEventListener('change',render);
fT.addEventListener('change',render);
root.appendChild(card);
})();


(function(){
const card=makeCard('pot.codec','Codec info',ctx);
let cType='audio';
let cSel='mp3';
const seg=el('div',{class:'seg'},[
el('button',{class:'seg-btn active',type:'button',
dataset:{value:'audio'},text:getStr(ctx,'pot.codecAudio','Audio')}),
el('button',{class:'seg-btn',type:'button',
dataset:{value:'video'},text:getStr(ctx,'pot.codecVideo','Video')})
]);
card.appendChild(seg);
const chips=el('div',{class:'chips'});
card.appendChild(chips);
function buildChips(){
chips.innerHTML='';
CODECS[cType].forEach(c=>{
const b=el('button',{
class:'chip'+(c.id===cSel?' active':''),
type:'button',dataset:{id:c.id},text:c.name
});
chips.appendChild(b);
});
}
const rFull=makeOutlineRow(getStr(ctx,'pot.codecFull','Full name'));
rFull.row.style.marginTop='14px';
const rYear=makeOutlineRow(getStr(ctx,'pot.codecYear','Year'));
const rType=makeOutlineRow(getStr(ctx,'pot.codecType2','Type'));
const rBr=makeOutlineRow(getStr(ctx,'pot.codecBitrate','Typical bitrate'));
card.appendChild(rFull.row);
card.appendChild(rYear.row);
card.appendChild(rType.row);
card.appendChild(rBr.row);
const mQ=makeMeter();
mQ.label.textContent=getStr(ctx,'pot.codecQuality','Quality');
card.appendChild(mQ.wrap);
const mE=makeMeter();
mE.label.textContent=getStr(ctx,'pot.codecEfficiency','Compression efficiency');
card.appendChild(mE.wrap);
const compatWrap=el('div',{class:'meter-wrap'});
compatWrap.appendChild(el('div',{class:'meter-top'},[
el('span',{class:'meter-label',text:getStr(ctx,'pot.codecCompat','Device compatibility')})
]));
const compat=el('div',{class:'compat-grid'});
compatWrap.appendChild(compat);
card.appendChild(compatWrap);
function typeLabel(t){
if(t==='lossy')return getStr(ctx,'ct.lossy','Lossy');
if(t==='lossless')return getStr(ctx,'ct.lossless','Lossless');
if(t==='uncompressed')return getStr(ctx,'ct.uncompressed','Uncompressed');
if(t==='lossyM')return getStr(ctx,'ct.lossyM','Lossy (mezzanine)');
return t;
}
function scoreBadge(score,kind){
if(kind==='quality'){
if(score>=85)return{cls:'good',txt:getStr(ctx,'cd.quality.high','Maximum quality')};
if(score>=60)return{cls:'mid',txt:getStr(ctx,'cd.quality.mid','Medium quality')};
return{cls:'bad',txt:getStr(ctx,'cd.quality.low','Low quality')};
}
if(score>=80)return{cls:'good',txt:getStr(ctx,'cd.eff.high','Very efficient')};
if(score>=40)return{cls:'mid',txt:getStr(ctx,'cd.eff.mid','Moderate')};
return{cls:'bad',txt:getStr(ctx,'cd.eff.low','Large files')};
}
function render(){
const c=CODECS[cType].find(x=>x.id===cSel)||CODECS[cType][0];
rFull.v.textContent=c.full;
rYear.v.textContent=c.year;
rType.v.textContent=typeLabel(c.type);
rBr.v.textContent=c.br;
const qb=scoreBadge(c.quality,'quality');
mQ.badge.className='badge '+qb.cls;
mQ.badge.textContent=c.quality+'/100';
mQ.fill.style.width=c.quality+'%';
mQ.fill.style.background=paintColor(qb.cls);
mQ.desc.textContent=qb.txt;
const eb=scoreBadge(c.eff,'eff');
mE.badge.className='badge '+eb.cls;
mE.badge.textContent=c.eff+'/100';
mE.fill.style.width=c.eff+'%';
mE.fill.style.background=paintColor(eb.cls);
mE.desc.textContent=eb.txt;
compat.innerHTML='';
[{key:'android',label:'Android'},{key:'ios',label:'iOS'},
{key:'windows',label:'Windows'},{key:'web',label:'Web'}].forEach(s=>{
const st=c.compat[s.key]||'no';
const sym=st==='yes'?'✓':st==='partial'?'~':'✗';
compat.appendChild(el('div',{class:'compat-item'},[
el('div',{class:'sys',text:s.label}),
el('div',{class:'st '+st,text:sym})
]));
});
}
seg.addEventListener('click',e=>{
const btn=e.target.closest('.seg-btn');
if(!btn)return;
const v=btn.dataset.value;
if(v===cType)return;
cType=v;cSel=CODECS[cType][0].id;
seg.querySelectorAll('.seg-btn').forEach(b=>{
b.classList.toggle('active',b===btn);
});
buildChips();render();
});
chips.addEventListener('click',e=>{
const chip=e.target.closest('.chip');
if(!chip)return;
cSel=chip.dataset.id;
chips.querySelectorAll('.chip').forEach(c=>{
c.classList.toggle('active',c===chip);
});
render();
});
buildChips();render();
root.appendChild(card);
})();

return{refresh(){},destroy(){root.remove();}};
}


const CALC_BUTTONS=[
{v:'C',cls:'clr',label:'C'},{v:'√',cls:'op',label:'√'},
{v:'±',cls:'op',label:'±'},{v:'÷',cls:'op',label:'÷'},
{v:'7'},{v:'8'},{v:'9'},{v:'×',cls:'op',label:'×'},
{v:'4'},{v:'5'},{v:'6'},{v:'−',cls:'op',label:'−'},
{v:'1'},{v:'2'},{v:'3'},{v:'+',cls:'op',label:'+'},
{v:'^',cls:'op',label:'x^y'},{v:'0'},{v:'.'},
{v:'=',cls:'eq',label:'='}
];
const CALC_OPS=['+','−','×','÷','^'];
const CALC_BH={
growMs:700,suckMs:1500,staggerMs:60,holdMs:500,shrinkMs:500,
ambientVolume:0.06,ambientFreqLow:45,ambientFadeIn:0.4,ambientFadeOut:0.3,
suckVolume:0.12,suckFreqStart:300,suckFreqEnd:60,suckDuration:0.18,
vanishVolume:0.2,vanishFreqStart:70,vanishFreqEnd:20,vanishDuration:0.5
};

function initCalc(container,ctx){
const root=el('section',{class:'nib-main nib-calc'});
container.appendChild(root);
const state={
current:'0',previous:null,operator:null,justEvaluated:false,
exploded:false,audioCtx:null
};
const wrapper=el('div',{class:'calc-wrapper'});
root.appendChild(wrapper);
const calc=el('div',{class:'calc',id:'nibCalc'});
wrapper.appendChild(calc);
const exprEl=el('div',{class:'calc-expression',id:'nibCalcExpr',html:'&nbsp;'});
calc.appendChild(exprEl);
const displayEl=el('div',{class:'calc-display',id:'nibCalcDisplay',text:'0'});
calc.appendChild(displayEl);
const buttonsEl=el('div',{class:'calc-buttons',id:'nibCalcButtons'});
calc.appendChild(buttonsEl);
CALC_BUTTONS.forEach(b=>{
const btn=el('button',{type:'button',dataset:{calc:b.v}});
if(b.cls)btn.className=b.cls;
btn.textContent=b.label||b.v;
buttonsEl.appendChild(btn);
});
function getVolume(){
if(window.NibblyApp&&typeof window.NibblyApp.getSettings==='function'){
try{
const s=window.NibblyApp.getSettings();
if(!s.sounds)return 0;
const v=Number(s.soundVolume);
if(!isFinite(v)||v<=0)return 0;
return v/100;
}catch(_){}
}
return 1;
}
function createAudio(){
try{
const AC=window.AudioContext||window.webkitAudioContext;
if(!AC)return null;
return new AC();
}catch(_){return null;}
}
function reducedMotion(){
try{
if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return true;
}catch(_){}
if(document.body&&document.body.classList.contains('no-effects'))return true;
return false;
}
function updateDisplay(){
if(state.exploded)return;
displayEl.textContent=state.current;
if(state.previous!==null&&state.operator){
exprEl.textContent=state.previous+' '+state.operator;
}else{
exprEl.innerHTML='&nbsp;';
}
}
function reset(){
state.current='0';state.previous=null;
state.operator=null;state.justEvaluated=false;
updateDisplay();
}
function digit(d){
if(state.exploded)return;
if(state.justEvaluated){state.current='0';state.justEvaluated=false;}
if(state.current==='0'&&d!=='.')state.current=d;
else if(d==='.'&&state.current.indexOf('.')>=0)return;
else state.current+=d;
updateDisplay();
}
function evaluate(){
const prev=state.previous,cur=parseFloat(state.current);
let result;
switch(state.operator){
case'+':result=prev+cur;break;
case'−':result=prev-cur;break;
case'×':result=prev*cur;break;
case'÷':
if(cur===0){triggerError('Division by zero');return null;}
result=prev/cur;break;
case'^':result=Math.pow(prev,cur);break;
default:result=cur;
}
if(!isFinite(result)){triggerError('Out of range');return null;}
return result;
}
function operator(op){
if(state.exploded)return;
state.justEvaluated=false;
if(state.operator&&state.previous!==null){
const r=evaluate();
if(r===null)return;
state.previous=r;state.current='0';
}else{
state.previous=parseFloat(state.current);state.current='0';
}
state.operator=op;
updateDisplay();
}
function equals(){
if(state.exploded)return;
if(state.operator!==null){
const r=evaluate();
if(r===null)return;
state.current=String(Number(r.toPrecision(12)));
state.previous=null;state.operator=null;state.justEvaluated=true;
updateDisplay();
}
}
function sqrt(){
if(state.exploded)return;
const cur=parseFloat(state.current);
if(cur<0){triggerError('Square root of negative');return;}
state.current=String(Number(Math.sqrt(cur).toPrecision(12)));
state.justEvaluated=true;
updateDisplay();
}
function sign(){
if(state.exploded)return;
if(state.current.startsWith('-'))state.current=state.current.slice(1);
else if(state.current!=='0')state.current='-'+state.current;
updateDisplay();
}
function triggerError(msg){
let pleaseDont=false;
if(window.NibblyApp&&typeof window.NibblyApp.getSettings==='function'){
try{pleaseDont=!!window.NibblyApp.getSettings().pleaseDont;}catch(_){}
}
logTo('calc error: '+msg);
if(!pleaseDont||reducedMotion()){
state.current='Error';
state.previous=null;state.operator=null;state.justEvaluated=true;
updateDisplay();return;
}
if(Math.random()<0.5)runBlackHole();
else runExplosion();
}
function runExplosion(){
state.exploded=true;
const buttons=buttonsEl.querySelectorAll('button');
const rects=[];
buttons.forEach(btn=>{
const r=btn.getBoundingClientRect();
rects.push({rect:r,text:btn.textContent,cls:btn.className||''});
});
calc.style.opacity='0';
calc.style.pointerEvents='none';
rects.forEach(item=>{
const clone=el('div',{class:'calc-clone '+item.cls,text:item.text});
clone.style.left=item.rect.left+'px';
clone.style.top=item.rect.top+'px';
clone.style.width=item.rect.width+'px';
clone.style.height=item.rect.height+'px';
document.body.appendChild(clone);
let vx=(Math.random()-0.5)*24,vy=-Math.random()*16-4;
let x=0,y=0,rot=0,vrot=(Math.random()-0.5)*24;
let last=performance.now(),life=0;
function step(now){
const dt=Math.min(50,now-last)/16.67;
last=now;life+=dt;
vy+=0.9*dt;vx*=0.995;
x+=vx*dt;y+=vy*dt;rot+=vrot*dt;
clone.style.transform='translate('+x+'px,'+y+'px) rotate('+rot+'deg)';
if(life<180&&y<window.innerHeight+200)requestAnimationFrame(step);
else{
clone.style.transition='opacity .5s';
clone.style.opacity='0';
setTimeout(()=>clone.remove(),600);
}
}
requestAnimationFrame(step);
});
const vol=getVolume();
if(vol>0){
if(!state.audioCtx)state.audioCtx=createAudio();
const a=state.audioCtx;
if(a)try{
const now=a.currentTime;
const osc=a.createOscillator(),gain=a.createGain();
osc.type='sawtooth';
osc.frequency.setValueAtTime(220,now);
osc.frequency.exponentialRampToValueAtTime(40,now+0.6);
gain.gain.setValueAtTime(0.0001,now);
gain.gain.exponentialRampToValueAtTime(0.15*vol,now+0.02);
gain.gain.exponentialRampToValueAtTime(0.0001,now+0.7);
osc.connect(gain);gain.connect(a.destination);
osc.start(now);osc.stop(now+0.75);
}catch(_){}
}
}
function runBlackHole(){
state.exploded=true;
const buttons=Array.prototype.slice.call(buttonsEl.querySelectorAll('button'));
const calcRect=calc.getBoundingClientRect();
const cx=calcRect.left+calcRect.width/2;
const cy=calcRect.top+calcRect.height/2;
const hole=el('div',{class:'calc-black-hole'});
hole.style.left=cx+'px';hole.style.top=cy+'px';
document.body.appendChild(hole);
const vol=getVolume();
let ambientOsc=null,ambientGain=null;
if(vol>0){
if(!state.audioCtx)state.audioCtx=createAudio();
const a=state.audioCtx;
if(a)try{
const now=a.currentTime;
ambientOsc=a.createOscillator();ambientGain=a.createGain();
ambientOsc.type='sine';
ambientOsc.frequency.setValueAtTime(CALC_BH.ambientFreqLow,now);
ambientGain.gain.setValueAtTime(0.0001,now);
ambientGain.gain.exponentialRampToValueAtTime(CALC_BH.ambientVolume*vol,now+CALC_BH.ambientFadeIn);
ambientOsc.connect(ambientGain);ambientGain.connect(a.destination);
ambientOsc.start();
}catch(_){ambientOsc=null;ambientGain=null;}
}
calc.style.pointerEvents='none';
buttons.forEach((btn,i)=>{
const r=btn.getBoundingClientRect();
const clone=btn.cloneNode(true);
clone.className='calc-black-hole-victim '+(btn.className||'');
clone.style.left=r.left+'px';clone.style.top=r.top+'px';
clone.style.width=r.width+'px';clone.style.height=r.height+'px';
const dx=cx-(r.left+r.width/2);
const dy=cy-(r.top+r.height/2);
const dir=Math.random()<0.5?-1:1;
const deg=400+Math.random()*600;
const delay=i*CALC_BH.staggerMs;
clone.style.setProperty('--dx',dx+'px');
clone.style.setProperty('--dy',dy+'px');
clone.style.setProperty('--delay',delay+'ms');
clone.style.setProperty('--spin',(dir*deg)+'deg');
document.body.appendChild(clone);
});
calc.style.opacity='0';
setTimeout(()=>{
requestAnimationFrame(()=>{
document.querySelectorAll('.calc-black-hole-victim').forEach(el=>el.classList.add('sucked'));
});
},CALC_BH.growMs);
const suckTotalMs=buttons.length*CALC_BH.staggerMs+CALC_BH.suckMs;
const holdEndMs=CALC_BH.growMs+suckTotalMs+CALC_BH.holdMs;
const totalMs=holdEndMs+CALC_BH.shrinkMs;
setTimeout(()=>{
hole.classList.add('shrinking');
if(ambientGain&&state.audioCtx)try{
const now=state.audioCtx.currentTime;
ambientGain.gain.cancelScheduledValues(now);
ambientGain.gain.setValueAtTime(ambientGain.gain.value,now);
ambientGain.gain.exponentialRampToValueAtTime(0.0001,now+CALC_BH.ambientFadeOut);
}catch(_){}
},holdEndMs);
if(ambientOsc)setTimeout(()=>{try{ambientOsc.stop();}catch(_){}},
holdEndMs+CALC_BH.ambientFadeOut*1000+200);
setTimeout(()=>{
try{hole.remove();}catch(_){}
document.querySelectorAll('.calc-black-hole-victim').forEach(n=>n.remove());
},totalMs+300);
}
function rebuild(){
state.exploded=false;
state.current='0';state.previous=null;
state.operator=null;state.justEvaluated=false;
calc.style.opacity='';calc.style.pointerEvents='';
document.querySelectorAll('.calc-clone, .calc-black-hole, .calc-black-hole-victim')
.forEach(n=>n.remove());
updateDisplay();
}
buttonsEl.addEventListener('click',ev=>{
const btn=ev.target.closest('button[data-calc]');
if(!btn||state.exploded)return;
const val=btn.dataset.calc;
if(val==='C'){reset();return;}
if(val==='='){equals();return;}
if(val==='√'){sqrt();return;}
if(val==='±'){sign();return;}
if(CALC_OPS.indexOf(val)!==-1){operator(val);return;}
digit(val);
});
updateDisplay();
return{
rebuild,
refresh(){if(state.exploded)rebuild();},
destroy(){
if(state.audioCtx&&state.audioCtx.state!=='closed'){
try{state.audioCtx.close();}catch(_){}
}
state.audioCtx=null;
document.querySelectorAll('.calc-clone, .calc-black-hole, .calc-black-hole-victim')
.forEach(n=>n.remove());
root.remove();
}
};
}


const CIPHER_DIGITS='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function cesar(text,shift,dec){
if(!Number.isInteger(shift)||shift<1||shift>25)throw new Error('Shift must be 1–25');
const s=dec?(26-shift)%26:shift;
return text.replace(/[a-zA-Z]/g,ch=>{
const base=ch<='Z'?65:97;
return String.fromCharCode(((ch.charCodeAt(0)-base+s)%26)+base);
});
}
function rot13(t){return cesar(t,13,false);}
function rot47(t){
let o='';
for(let i=0;i<t.length;i++){
const c=t.charCodeAt(i);
o+=(c>=33&&c<=126)?String.fromCharCode(33+((c-33+47)%94)):t[i];
}
return o;
}
function atbash(t){
return t.replace(/[a-zA-Z]/g,ch=>{
const b=ch<='Z'?65:97;
return String.fromCharCode(25-(ch.charCodeAt(0)-b)+b);
});
}
function vigenere(text,key,dec){
if(!key||!/[a-zA-Z]/.test(key))throw new Error('Key must contain letters');
const k=key.toUpperCase().replace(/[^A-Z]/g,'');
let ki=0,o='';
for(let i=0;i<text.length;i++){
const ch=text[i];
if(/[a-zA-Z]/.test(ch)){
const base=ch<='Z'?65:97;
let shift=k.charCodeAt(ki%k.length)-65;
if(dec)shift=(26-shift)%26;
o+=String.fromCharCode(((ch.charCodeAt(0)-base+shift)%26)+base);
ki++;
}else o+=ch;
}
return o;
}
function affine(text,a,b,dec){
const gcd=(x,y)=>y?gcd(y,x%y):x;
if(gcd(a,26)!==1)throw new Error('a must be coprime with 26');
let aInv=1;
if(dec)for(let i=1;i<26;i++)if((a*i)%26===1){aInv=i;break;}
return text.replace(/[a-zA-Z]/g,ch=>{
const base=ch<='Z'?65:97;
const x=ch.charCodeAt(0)-base;
const y=dec?((aInv*(x-b+26*26))%26):((a*x+b)%26);
return String.fromCharCode(y+base);
});
}
function substitution(text,alphabet,dec){
if(!/^[a-zA-Z]{26}$/.test(alphabet))throw new Error('Alphabet must be 26 letters');
if(new Set(alphabet.toUpperCase()).size!==26)throw new Error('Alphabet must be unique');
const upper='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ALPH=alphabet.toUpperCase();
return text.replace(/[a-zA-Z]/g,ch=>{
const isLower=ch>='a'&&ch<='z';
const c=ch.toUpperCase();
const idx=dec?ALPH.indexOf(c):upper.indexOf(c);
const mapped=dec?upper[idx]:ALPH[idx];
return isLower?mapped.toLowerCase():mapped;
});
}
function unicodeEnc(t){
let o='';
for(let i=0;i<t.length;i++)o+='\\u'+t.charCodeAt(i).toString(16).padStart(4,'0');
return o;
}
function unicodeDec(t){
return t.replace(/\\u([0-9a-fA-F]{4})/g,(_,h)=>String.fromCharCode(parseInt(h,16)));
}
function xorBytes(data,key){
const k=new TextEncoder().encode(key);
if(!k.length)throw new Error('Empty key');
const out=new Uint8Array(data.length);
for(let i=0;i<data.length;i++)out[i]=data[i]^k[i%k.length];
return out;
}
function rc4(data,key){
const k=new TextEncoder().encode(key);
if(!k.length)throw new Error('Empty key');
const S=new Uint8Array(256);
for(let i=0;i<256;i++)S[i]=i;
let j=0;
for(let i=0;i<256;i++){
j=(j+S[i]+k[i%k.length])&0xFF;
[S[i],S[j]]=[S[j],S[i]];
}
const out=new Uint8Array(data.length);
let i=0;j=0;
for(let n=0;n<data.length;n++){
i=(i+1)&0xFF;j=(j+S[i])&0xFF;
[S[i],S[j]]=[S[j],S[i]];
out[n]=data[n]^S[(S[i]+S[j])&0xFF];
}
return out;
}
function bytesToB64(b){
let s='';
for(let i=0;i<b.length;i++)s+=String.fromCharCode(b[i]);
return btoa(s);
}
function b64ToBytes(s){return Uint8Array.from(atob(s),c=>c.charCodeAt(0));}
function deriveKey(password,len){
const enc=new TextEncoder().encode(password);
if(!enc.length)throw new Error('Empty key');
const out=new Uint8Array(len);
for(let i=0;i<len;i++)out[i]=enc[i%enc.length]^((i*71+0x5a+enc.length)&0xff);
return out;
}


const DES_IP=[58,50,42,34,26,18,10,2,60,52,44,36,28,20,12,4,62,54,46,38,30,22,14,6,64,56,48,40,32,24,16,8,57,49,41,33,25,17,9,1,59,51,43,35,27,19,11,3,61,53,45,37,29,21,13,5,63,55,47,39,31,23,15,7];
const DES_FP=[40,8,48,16,56,24,64,32,39,7,47,15,55,23,63,31,38,6,46,14,54,22,62,30,37,5,45,13,53,21,61,29,36,4,44,12,52,20,60,28,35,3,43,11,51,19,59,27,34,2,42,10,50,18,58,26,33,1,41,9,49,17,57,25];
const DES_EX=[32,1,2,3,4,5,4,5,6,7,8,9,8,9,10,11,12,13,12,13,14,15,16,17,16,17,18,19,20,21,20,21,22,23,24,25,24,25,26,27,28,29,28,29,30,31,32,1];
const DES_PB=[16,7,20,21,29,12,28,17,1,15,23,26,5,18,31,10,2,8,24,14,32,27,3,9,19,13,30,6,22,11,4,25];
const DES_SB=[
[14,4,13,1,2,15,11,8,3,10,6,12,5,9,0,7,0,15,7,4,14,2,13,1,10,6,12,11,9,5,3,8,4,1,14,8,13,6,2,11,15,12,9,7,3,10,5,0,15,12,8,2,4,9,1,7,5,11,3,14,10,0,6,13],
[15,1,8,14,6,11,3,4,9,7,2,13,12,0,5,10,3,13,4,7,15,2,8,14,12,0,1,10,6,9,11,5,0,14,7,11,10,4,13,1,5,8,12,6,9,3,2,15,13,8,10,1,3,15,4,2,11,6,7,12,0,5,14,9],
[10,0,9,14,6,3,15,5,1,13,12,7,11,4,2,8,13,7,0,9,3,4,6,10,2,8,5,14,12,11,15,1,13,6,4,9,8,15,3,0,11,1,2,12,5,10,14,7,1,10,13,0,6,9,8,7,4,15,14,3,11,5,2,12],
[7,13,14,3,0,6,9,10,1,2,8,5,11,12,4,15,13,8,11,5,6,15,0,3,4,7,2,12,1,10,14,9,10,6,9,0,12,11,7,13,15,1,3,14,5,2,8,4,3,15,0,6,10,1,13,8,9,4,5,11,12,7,2,14],
[2,12,4,1,7,10,11,6,8,5,3,15,13,0,14,9,14,11,2,12,4,7,13,1,5,0,15,10,3,9,8,6,4,2,1,11,10,13,7,8,15,9,12,5,6,3,0,14,11,8,12,7,1,14,2,13,6,15,0,9,10,4,5,3],
[12,1,10,15,9,2,6,8,0,13,3,4,14,7,5,11,10,15,4,2,7,12,9,5,6,1,13,14,0,11,3,8,9,14,15,5,2,8,12,3,7,0,4,10,1,13,11,6,4,3,2,12,9,5,15,10,11,14,1,7,6,0,8,13],
[4,11,2,14,15,0,8,13,3,12,9,7,5,10,6,1,13,0,11,7,4,9,1,10,14,3,5,12,2,15,8,6,1,4,11,13,12,3,7,14,10,15,6,8,0,5,9,2,6,11,13,8,1,4,10,7,9,5,0,15,14,2,3,12],
[13,2,8,4,6,15,11,1,10,9,3,14,5,0,12,7,1,15,13,8,10,3,7,4,12,5,6,11,0,14,9,2,7,11,4,1,9,12,14,2,0,6,10,13,15,3,5,8,2,1,14,7,4,10,8,13,15,12,9,0,3,5,6,11]
];
const DES_PC1=[57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4];
const DES_PC2=[14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32];
const DES_SH=[1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1];

function toBits(bytes){
let s='';
for(let i=0;i<bytes.length;i++)s+=bytes[i].toString(2).padStart(8,'0');
return s;
}
function fromBits(bits){
const out=new Uint8Array(bits.length/8);
for(let i=0;i<out.length;i++)out[i]=parseInt(bits.substr(i*8,8),2);
return out;
}
function perm(bits,tbl){
let o='';
for(let i=0;i<tbl.length;i++)o+=bits[tbl[i]-1];
return o;
}
function xorb(a,b){
let o='';
for(let i=0;i<a.length;i++)o+=(a[i]===b[i]?'0':'1');
return o;
}
function shl(b,n){return b.substr(n)+b.substr(0,n);}
function desKeySchedule(keyBytes){
const p=perm(toBits(keyBytes),DES_PC1);
let C=p.substr(0,28),D=p.substr(28,28);
const ks=[];
for(let i=0;i<16;i++){
C=shl(C,DES_SH[i]);D=shl(D,DES_SH[i]);
ks.push(perm(C+D,DES_PC2));
}
return ks;
}
function desF(R,k){
const x=xorb(perm(R,DES_EX),k);
let o='';
for(let i=0;i<8;i++){
const b=x.substr(i*6,6);
const row=parseInt(b[0]+b[5],2);
const col=parseInt(b.substr(1,4),2);
o+=DES_SB[i][row*16+col].toString(2).padStart(4,'0');
}
return perm(o,DES_PB);
}
function desBlock(bytes,ks,dec){
const p=perm(toBits(bytes),DES_IP);
let L=p.substr(0,32),R=p.substr(32,32);
const keys=dec?ks.slice().reverse():ks;
for(let i=0;i<16;i++){
const nL=R,nR=xorb(L,desF(R,keys[i]));
L=nL;R=nR;
}
return fromBits(perm(R+L,DES_FP));
}
function pkcs7Pad(b,bs){
const pad=bs-(b.length%bs);
const o=new Uint8Array(b.length+pad);
o.set(b);
for(let i=b.length;i<o.length;i++)o[i]=pad;
return o;
}
function pkcs7Unpad(b,bs){
const p=b[b.length-1];
if(p<1||p>bs)return b;
return b.slice(0,b.length-p);
}
function desECB(data,key,dec){
const ks=desKeySchedule(key);
if(!dec){
const pad=pkcs7Pad(data,8);
const o=new Uint8Array(pad.length);
for(let i=0;i<pad.length;i+=8)o.set(desBlock(pad.slice(i,i+8),ks,false),i);
return o;
}else{
if(data.length%8!==0)throw new Error('Ciphertext not multiple of 8');
const o=new Uint8Array(data.length);
for(let i=0;i<data.length;i+=8)o.set(desBlock(data.slice(i,i+8),ks,true),i);
return pkcs7Unpad(o,8);
}
}
function tripleDESECB(data,key,dec){
const k1=desKeySchedule(key.slice(0,8));
const k2=desKeySchedule(key.slice(8,16));
const k3=desKeySchedule(key.slice(16,24));
if(!dec){
const pad=pkcs7Pad(data,8);
const o=new Uint8Array(pad.length);
for(let i=0;i<pad.length;i+=8){
let b=desBlock(pad.slice(i,i+8),k1,false);
b=desBlock(b,k2,true);
b=desBlock(b,k3,false);
o.set(b,i);
}
return o;
}else{
if(data.length%8!==0)throw new Error('Ciphertext not multiple of 8');
const o=new Uint8Array(data.length);
for(let i=0;i<data.length;i+=8){
let b=desBlock(data.slice(i,i+8),k3,true);
b=desBlock(b,k2,false);
b=desBlock(b,k1,true);
o.set(b,i);
}
return pkcs7Unpad(o,8);
}
}

async function aesDerive(password){
const kb=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(password));
return crypto.subtle.importKey('raw',kb,{name:'AES-CBC'},false,['encrypt','decrypt']);
}
async function aesEncrypt(text,password){
if(!password)throw new Error('Empty key');
const key=await aesDerive(password);
const iv=crypto.getRandomValues(new Uint8Array(16));
const enc=await crypto.subtle.encrypt({name:'AES-CBC',iv},key,new TextEncoder().encode(text));
const combined=new Uint8Array(16+enc.byteLength);
combined.set(iv,0);
combined.set(new Uint8Array(enc),16);
return bytesToB64(combined);
}
async function aesDecrypt(b64,password){
if(!password)throw new Error('Empty key');
try{
const bytes=b64ToBytes(b64);
if(bytes.length<32)throw new Error('Too short');
const iv=bytes.slice(0,16);
const enc=bytes.slice(16);
const key=await aesDerive(password);
const dec=await crypto.subtle.decrypt({name:'AES-CBC',iv},key,enc);
return new TextDecoder().decode(dec);
}catch(e){
throw new Error('AES decryption failed');
}
}

const CIPHER_ALGOS=[
{id:'cesar',name:'Caesar',needs:['shift'],hint:'Classic shift 1–25.'},
{id:'rot13',name:'ROT13',needs:[],hint:'ROT13 (self-inverse).'},
{id:'rot47',name:'ROT47',needs:[],hint:'ROT47 over ASCII 33–126.'},
{id:'atbash',name:'Atbash',needs:[],hint:'Mirrors the alphabet.'},
{id:'vigenere',name:'Vigenère',needs:['key'],hint:'Polyalphabetic with keyword.'},
{id:'affine',name:'Affine',needs:['a','b'],hint:'a must be coprime with 26.'},
{id:'substitution',name:'Substitution',needs:['alphabet'],hint:'26 unique letters.'},
{id:'url',name:'URL',needs:[],hint:'Percent encoding.'},
{id:'unicode',name:'Unicode',needs:[],hint:'\\uXXXX escapes.'},
{id:'xor',name:'XOR',needs:['key'],hint:'Byte XOR with key → Base64.'},
{id:'aes',name:'AES',needs:['key'],hint:'AES-256-CBC, SHA-256 key.'},
{id:'des',name:'DES',needs:['key'],hint:'DES ECB, PKCS#7.'},
{id:'tripledes',name:'3DES',needs:['key'],hint:'3DES EDE3 ECB, PKCS#7.'},
{id:'rc4',name:'RC4',needs:['key'],hint:'RC4 stream cipher.'}
];

async function applyCipher(algo,dir,input,params){
const dec=dir==='dec';
if(!input&&algo!=='unicode')throw new Error('Empty input');
const p=params||{};
switch(algo){
case'cesar':{
const shift=parseInt(p.shift,10);
if(!Number.isInteger(shift))throw new Error('Invalid shift');
return cesar(input,shift,dec);
}
case'rot13':return rot13(input);
case'rot47':return rot47(input);
case'atbash':return atbash(input);
case'vigenere':return vigenere(input,p.key||'',dec);
case'affine':{
const a=parseInt(p.a,10),b=parseInt(p.b,10);
if(!Number.isInteger(a)||!Number.isInteger(b))throw new Error('a and b required');
return affine(input,a,b,dec);
}
case'substitution':return substitution(input,p.alphabet||'',dec);
case'url':
try{return dec?decodeURIComponent(input):encodeURIComponent(input);}
catch(e){throw new Error('Invalid URL encoding');}
case'unicode':return dec?unicodeDec(input):unicodeEnc(input);
case'xor':{
if(!p.key)throw new Error('Key required');
const te=new TextEncoder(),td=new TextDecoder();
const bytes=dec?b64ToBytes(input):te.encode(input);
const out=xorBytes(bytes,p.key);
return dec?td.decode(out):bytesToB64(out);
}
case'aes':{
if(!p.key)throw new Error('Key required');
return dec?await aesDecrypt(input,p.key):await aesEncrypt(input,p.key);
}
case'des':{
if(!p.key)throw new Error('Key required');
const k=deriveKey(p.key,8);
const td=new TextDecoder();
const data=dec?b64ToBytes(input):new TextEncoder().encode(input);
const out=desECB(data,k,dec);
return dec?td.decode(out):bytesToB64(out);
}
case'tripledes':{
if(!p.key)throw new Error('Key required');
const k=deriveKey(p.key,24);
const td=new TextDecoder();
const data=dec?b64ToBytes(input):new TextEncoder().encode(input);
const out=tripleDESECB(data,k,dec);
return dec?td.decode(out):bytesToB64(out);
}
case'rc4':{
if(!p.key)throw new Error('Key required');
const td=new TextDecoder();
const data=dec?b64ToBytes(input):new TextEncoder().encode(input);
const out=rc4(data,p.key);
return dec?td.decode(out):bytesToB64(out);
}
default:throw new Error('Unknown algorithm');
}
}

function initCiphers(container,ctx){
const root=el('section',{class:'nib-main nib-ciphers'});
container.appendChild(root);
let dir='enc';
let algo='cesar';
let token=0;
let renderTimer=null;

const dirSeg=el('div',{class:'seg'},[
el('button',{class:'seg-btn active',type:'button',
dataset:{dir:'enc'},text:getStr(ctx,'ciphers.encrypt','Encrypt')}),
el('button',{class:'seg-btn',type:'button',
dataset:{dir:'dec'},text:getStr(ctx,'ciphers.decrypt','Decrypt')})
]);
root.appendChild(dirSeg);
const chips=el('div',{class:'chips'});
CIPHER_ALGOS.forEach(a=>{
chips.appendChild(el('button',{
class:'chip'+(a.id===algo?' active':''),
type:'button',dataset:{id:a.id},text:a.name
}));
});
root.appendChild(chips);
const hint=el('div',{class:'hint'});
root.appendChild(hint);
const cardIn=el('div',{class:'card'});
cardIn.appendChild(el('div',{class:'card-head'},[
el('span',{class:'card-title',text:getStr(ctx,'ciphers.input','Input')})
]));
const inputEl=el('textarea',{class:'input mono',rows:'3',
spellcheck:'false',autocomplete:'off',autocorrect:'off',
autocapitalize:'off',placeholder:'Hello, Nibbly!'});
cardIn.appendChild(inputEl);
root.appendChild(cardIn);
const cardParams=el('div',{class:'card'});
cardParams.appendChild(el('div',{class:'card-head'},[
el('span',{class:'card-title',text:getStr(ctx,'ciphers.key','Parameters')})
]));
const paramsBox=el('div',{class:'params-box'});
cardParams.appendChild(paramsBox);
root.appendChild(cardParams);
const cardOut=el('div',{class:'card'});
const copyBtn=el('button',{class:'copy',type:'button',
text:getStr(ctx,'ciphers.copy','Copy')});
cardOut.appendChild(el('div',{class:'card-head'},[
el('span',{class:'card-title',text:getStr(ctx,'ciphers.output','Output')}),
copyBtn
]));
const outEl=el('textarea',{class:'input mono',rows:'4',readonly:''});
cardOut.appendChild(outEl);
const errEl=el('div',{class:'error'});
cardOut.appendChild(errEl);
root.appendChild(cardOut);

const fieldRefs={};
function buildParams(){
paramsBox.innerHTML='';
Object.keys(fieldRefs).forEach(k=>delete fieldRefs[k]);
const cfg=CIPHER_ALGOS.find(a=>a.id===algo);
cfg.needs.forEach(need=>{
let label='',placeholder='',def='';
if(need==='shift'){label='Shift (1–25)';placeholder='3';def='3';}
else if(need==='key'){label=getStr(ctx,'ciphers.key','Key');placeholder=getStr(ctx,'ciphers.keyPlaceholder','Enter key…');}
else if(need==='a'){label='a';placeholder='5';def='5';}
else if(need==='b'){label='b';placeholder='8';def='8';}
else if(need==='alphabet'){label='Alphabet';placeholder='ZYXWVUTSRQPONMLKJIHGFEDCBA';}
const wrap=el('div',{class:'param-field'});
wrap.appendChild(el('label',{class:'lbl',text:label}));
const input=el('input',{class:'input mono',type:'text',
placeholder,autocomplete:'off',spellcheck:'false'});
if(def)input.value=def;
wrap.appendChild(input);
paramsBox.appendChild(wrap);
fieldRefs[need]=input;
});
}
function collectParams(){
const p={};
Object.keys(fieldRefs).forEach(k=>{p[k]=fieldRefs[k].value;});
return p;
}
async function render(){
const myToken=++token;
errEl.classList.remove('show');
outEl.value='';
const cfg=CIPHER_ALGOS.find(a=>a.id===algo);
if(!cfg)return;
const input=inputEl.value;
if(!input&&algo!=='unicode')return;
try{
const result=await applyCipher(algo,dir,input,collectParams());
if(myToken!==token)return;
outEl.value=result==null?'':result;
}catch(e){
if(myToken!==token)return;
errEl.textContent=e.message||String(e);
errEl.classList.add('show');
}
}
function schedule(){
clearTimeout(renderTimer);
renderTimer=setTimeout(render,120);
}
function updateAlgo(){
const cfg=CIPHER_ALGOS.find(a=>a.id===algo);
hint.textContent=cfg?cfg.hint:'';
buildParams();
schedule();
}
dirSeg.addEventListener('click',e=>{
const b=e.target.closest('.seg-btn');
if(!b||b.dataset.dir===dir)return;
dir=b.dataset.dir;
dirSeg.querySelectorAll('.seg-btn').forEach(x=>{
x.classList.toggle('active',x===b);
});
const prev=outEl.value;
if(prev)inputEl.value=prev;
outEl.value='';
schedule();
});
chips.addEventListener('click',e=>{
const chip=e.target.closest('.chip');
if(!chip||chip.dataset.id===algo)return;
algo=chip.dataset.id;
chips.querySelectorAll('.chip').forEach(c=>{
c.classList.toggle('active',c===chip);
});
updateAlgo();
});
inputEl.addEventListener('input',schedule);
paramsBox.addEventListener('input',schedule);
paramsBox.addEventListener('change',schedule);
copyBtn.addEventListener('click',async()=>{
if(!outEl.value)return;
try{
if(navigator.clipboard&&window.isSecureContext){
await navigator.clipboard.writeText(outEl.value);
}else{
outEl.select();document.execCommand('copy');
}
}catch(_){}
});
updateAlgo();
return{
refresh(){
dirSeg.querySelectorAll('.seg-btn').forEach(b=>{
b.textContent=getStr(ctx,
b.dataset.dir==='enc'?'ciphers.encrypt':'ciphers.decrypt',
b.dataset.dir==='enc'?'Encrypt':'Decrypt');
});
copyBtn.textContent=getStr(ctx,'ciphers.copy','Copy');
updateAlgo();
},
destroy(){clearTimeout(renderTimer);root.remove();}
};
}


window.NibblyModules=window.NibblyModules||{};
window.NibblyModules.numbers={id:'numbers',version:'2.0.14',init:initNumbers};
window.NibblyModules.textconv={id:'textconv',version:'2.0.14',init:initTextconv};
window.NibblyModules.bits={id:'bits',version:'2.0.14',init:initBits};
window.NibblyModules.power={id:'power',version:'2.0.14',init:initPower};
window.NibblyModules.media={id:'media',version:'2.0.14',init:initMedia};
window.NibblyModules.calc={id:'calc',version:'2.0.14',init:initCalc};
window.NibblyModules.ciphers={id:'ciphers',version:'2.0.14',init:initCiphers};

if(console&&console.debug){
console.debug('[Nibbly] main.js loaded — 7 tabs registrados: numbers, textconv, bits, power, media, calc, ciphers');
}
})();