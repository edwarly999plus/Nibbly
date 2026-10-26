(function(){
'use strict';
if(window.NibblyModules&&window.NibblyModules.console)return;


function icon(name,size,fallback){
if(window.NibblyIcons){
const html=window.NibblyIcons.get(name,{size:size||16});
if(html)return html;
}
return fallback||'';
}

function el(tag,attrs,children){
const n=document.createElement(tag);
if(attrs)for(const k in attrs){
if(k==='class')n.className=attrs[k];
else if(k==='text')n.textContent=attrs[k];
else if(k==='html')n.innerHTML=attrs[k];
else if(k==='dataset')Object.assign(n.dataset,attrs[k]);
else if(k.startsWith('on')&&typeof attrs[k]==='function'){
n.addEventListener(k.slice(2).toLowerCase(),attrs[k]);
}else if(attrs[k]===undefined||attrs[k]===null||attrs[k]===false){
continue;
}else{
n.setAttribute(k,attrs[k]);
}
}
if(children)(Array.isArray(children)?children:[children])
.forEach(c=>{if(c!=null)n.appendChild(
typeof c==='string'?document.createTextNode(c):c);});
return n;
}


function stripComments(code){
let out=code.replace(/\/\*[\s\S]*?\*\//g,'');
out=out.split('\n').map(line=>{
let inStr=null;
for(let i=0;i<line.length;i++){
const ch=line[i];
if(inStr){
if(ch==='\\'){i++;continue;}
if(ch===inStr)inStr=null;
}else{
if(ch==='"'||ch==="'"||ch==='`'){inStr=ch;continue;}
if(ch==='/'&&line[i+1]==='/'){
return line.slice(0,i);
}
}
}
return line;
}).join('\n');
return out;
}


function wrapWithReturn(code){
const lines=code.split('\n');
let lastNonEmpty=-1;
for(let i=lines.length-1;i>=0;i--){
if(lines[i].trim()){lastNonEmpty=i;break;}
}
if(lastNonEmpty===-1)return code;

const lastLine=lines[lastNonEmpty].trim();


if(/^return\b/.test(lastLine))return code;


if(/^(function|const|let|var|class|for|while|if|switch|try|throw|break|continue|\{|\})/.test(lastLine)){
return code;
}


lines[lastNonEmpty]='return ('+lastLine+');';
return lines.join('\n');
}

function init(container,ctx){
if(!container)throw new Error('console.init: container required');

const T=(k,fb)=>{
if(ctx&&typeof ctx.getString==='function'){
const v=ctx.getString(k);
if(v&&v!==k)return v;
}
return fb;
};

const root=el('section',{class:'nib-console'});
container.appendChild(root);


const disabledView=el('div',{class:'console-disabled'},[
el('div',{class:'console-disabled-icon',html:icon('console',48,'🖥️')}),
el('h3',{class:'console-disabled-title',
text:T('console.disabled','Console Disabled')}),
el('p',{class:'console-disabled-desc',
text:T('console.disabled.desc',
'The Console is only available when the Log Type is set to "Console" '+
'in Settings → Calculation log.')}),
el('button',{
class:'btn-primary',
type:'button',
text:T('console.enable','Enable Console Now')
})
]);


const enabledView=el('div',{class:'console-enabled'});


const pasteBtn=el('button',{
class:'console-paste',
type:'button',
title:T('console.paste.title','Paste from clipboard'),
html:icon('paste',14,'📋')
});
const copyBtn=el('button',{
class:'console-copy',
type:'button',
title:T('console.copy.title','Copy all output'),
html:icon('copy',14,'📋')
});
const clearBtn=el('button',{
class:'console-clear',
type:'button',
text:T('console.clear','Clear')
});
enabledView.appendChild(el('div',{class:'console-header'},[
el('span',{class:'console-title',text:T('console.title','Console')}),
el('div',{class:'console-actions'},[pasteBtn,copyBtn,clearBtn])
]));

const output=el('div',{class:'console-output',id:'nibConsoleOutput'});
enabledView.appendChild(output);


const inputRow=el('div',{class:'console-input-row'},[
el('span',{class:'console-prompt',text:'>'}),
el('textarea',{
class:'console-input',
rows:'1',
spellcheck:'false',
autocomplete:'off',
autocorrect:'off',
autocapitalize:'off',
placeholder:T('console.placeholder','Type JavaScript… (Shift+Enter: new line)')
})
]);
enabledView.appendChild(inputRow);
const inputEl=inputRow.querySelector('.console-input');

root.appendChild(disabledView);
root.appendChild(enabledView);


const history=[];
let historyIdx=-1;


function autoResize(){
inputEl.style.height='auto';
const newH=Math.min(inputEl.scrollHeight,140);
inputEl.style.height=newH+'px';
}


function showToast(msg,isError){
if(window.NibblyApp&&typeof window.NibblyApp.toast==='function'){
try{window.NibblyApp.toast(msg,!!isError);return;}catch(_){}
}
let el=document.getElementById('nibConsoleToast');
if(!el){
el=document.createElement('div');
el.id='nibConsoleToast';
el.style.cssText='position:fixed;left:50%;bottom:calc(28px + env(safe-area-inset-bottom));transform:translate(-50%,20px);padding:10px 20px;border-radius:999px;font-weight:800;font-size:12px;opacity:0;pointer-events:none;transition:opacity .25s,transform .25s;z-index:400;font-family:inherit;';
document.body.appendChild(el);
}
el.textContent=msg;
el.style.background=isError?'var(--bad, #ff6b7a)':'var(--good, #22d3a6)';
el.style.color=isError?'#fff':'#04231a';
el.style.opacity='1';
el.style.transform='translate(-50%,0)';
clearTimeout(el._hideTimer);
el._hideTimer=setTimeout(()=>{
el.style.opacity='0';
el.style.transform='translate(-50%,20px)';
},2000);
}


function pasteText(text){
if(!text)return;
const normalized=String(text).replace(/\r\n/g,'\n').replace(/\r/g,'\n');
const start=inputEl.selectionStart||0;
const end=inputEl.selectionEnd||0;
const before=inputEl.value.slice(0,start);
const after=inputEl.value.slice(end);
inputEl.value=before+normalized+after;
const newPos=start+normalized.length;
inputEl.setSelectionRange(newPos,newPos);
autoResize();
inputEl.focus();
}


async function pasteFromClipboard(){
if(!window.isSecureContext){
showToast(
T('console.pasteInsecure',
'Paste only works on HTTPS. Use Ctrl+V or long-press instead.'),
true
);
return;
}

try{
if(navigator.permissions&&navigator.permissions.query){
const status=await navigator.permissions.query({name:'clipboard-read'});
if(status.state==='denied'){
showToast(
T('console.pasteDenied','Clipboard permission denied. Use Ctrl+V instead.'),
true
);
return;
}
}
}catch(_){}

try{
if(navigator.clipboard&&navigator.clipboard.readText){
const text=await navigator.clipboard.readText();
if(text){
pasteText(text);
showToast(T('console.pasted','Pasted'),false);
}else{
showToast(T('console.pasteEmpty','Clipboard is empty'),true);
}
}else{
showToast(
T('console.pasteUnsupported','Use Ctrl+V or long-press to paste'),
true
);
}
}catch(err){
console.warn('[Nibbly Console] paste error:',err);
showToast(
T('console.pasteFailed','Could not paste. Use Ctrl+V instead.'),
true
);
}
}


function formatValue(v,depth){
depth=depth||0;
if(depth>3)return'…';
if(v===null)return'null';
if(v===undefined)return'undefined';
const t=typeof v;
if(t==='string')return JSON.stringify(v);
if(t==='number'||t==='boolean'||t==='bigint')return String(v);
if(t==='symbol')return v.toString();
if(t==='function')return'ƒ '+(v.name||'anonymous')+'()';
if(Array.isArray(v)){
if(v.length>50)return'[Array('+v.length+')]';
return'['+v.map(x=>formatValue(x,depth+1)).join(', ')+']';
}
if(v instanceof Error)return v.stack||v.message||String(v);
if(v&&v.nodeType===1)return'<'+v.nodeName.toLowerCase()+'>';
try{
const obj={};
Object.keys(v).slice(0,30).forEach(k=>{obj[k]=v[k];});
return JSON.stringify(obj);
}catch(_){
return String(v);
}
}


function appendLine(level,text){
const line=el('div',{class:'console-line console-line-'+level});
const time=new Date().toLocaleTimeString([],{
hour:'2-digit',minute:'2-digit',second:'2-digit'
});
line.appendChild(el('span',{class:'console-time',text:time}));
line.appendChild(el('span',{class:'console-msg',text:text}));
output.appendChild(line);
output.scrollTop=output.scrollHeight;
while(output.children.length>500){
output.removeChild(output.firstChild);
}
}

function clearOutput(){
output.innerHTML='';
appendLine('info',T('console.cleared','Console cleared.'));
}


async function copyOutput(){
const lines=[];
output.querySelectorAll('.console-line').forEach(line=>{
const time=line.querySelector('.console-time');
const msg=line.querySelector('.console-msg');
const t=time?time.textContent:'';
const m=msg?msg.textContent:'';
if(m)lines.push((t?'['+t+'] ':'')+m);
});
const text=lines.join('\n');

let ok=false;
try{
if(navigator.clipboard&&window.isSecureContext){
await navigator.clipboard.writeText(text);
ok=true;
}
}catch(_){}

if(!ok){
try{
const ta=document.createElement('textarea');
ta.value=text;
ta.setAttribute('readonly','');
ta.style.position='fixed';
ta.style.top='-9999px';
ta.style.opacity='0';
document.body.appendChild(ta);
ta.select();
ta.setSelectionRange(0,text.length);
ok=document.execCommand('copy');
ta.remove();
}catch(_){ok=false;}
}

const orig=copyBtn.innerHTML;
copyBtn.innerHTML=ok?icon('check',14,'✓'):'✗';
copyBtn.classList.add(ok?'copied':'copy-failed');
clearTimeout(copyBtn.__feedbackTimer);
copyBtn.__feedbackTimer=setTimeout(()=>{
copyBtn.innerHTML=orig;
copyBtn.classList.remove('copied','copy-failed');
},1500);

if(ok){
appendLine('info',T('console.copied','✓ Output copied to clipboard.'));
}else{
appendLine('error',T('console.copyFailed','✗ Could not copy to clipboard.'));
}
}


async function evaluate(rawCode){
const code=stripComments(rawCode);
if(!code.trim()){
appendLine('info',T('console.noCode','Empty input (only comments).'));
return;
}

const scopeKeys=[
'NibblyApp','NibblyModules','NibblyEffects','NibblyMusic',
'NibblyStrings','NibblyEs','NibblyLangs',
'NibblyPaint','NibblyGames','NibblyFormulas',
'NibblyRange','NibblyMemory','NibblyConsole','NibblyIcons',
'console','window','document',
'localStorage','sessionStorage','navigator','location','caches',
'fetch','setTimeout','setInterval',
'clearTimeout','clearInterval','requestAnimationFrame',
'Audio','Image','Blob','URL','TextEncoder','TextDecoder'
];
const scopeVals=scopeKeys.map(k=>{
try{
if(k==='NibblyApp')return window.NibblyApp;
if(k==='NibblyModules')return window.NibblyModules;
if(k==='NibblyEffects')return window.NibblyEffects;
if(k==='NibblyMusic')return window.NibblyMusic;
if(k==='NibblyStrings')return window.NibblyStrings;
if(k==='NibblyEs')return window.NibblyEs;
if(k==='NibblyLangs')return window.NibblyLangs;
if(k==='NibblyPaint')return window.NibblyPaint;
if(k==='NibblyGames')return window.NibblyGames;
if(k==='NibblyFormulas')return window.NibblyFormulas;
if(k==='NibblyRange')return window.NibblyRange;
if(k==='NibblyMemory')return window.NibblyMemory;
if(k==='NibblyConsole')return window.NibblyConsole;
if(k==='NibblyIcons')return window.NibblyIcons;
if(k==='console')return console;
if(k==='fetch')return window.fetch.bind(window);
if(k==='setTimeout')return window.setTimeout.bind(window);
if(k==='setInterval')return window.setInterval.bind(window);
if(k==='clearTimeout')return window.clearTimeout.bind(window);
if(k==='clearInterval')return window.clearInterval.bind(window);
if(k==='requestAnimationFrame')
return window.requestAnimationFrame.bind(window);
if(k==='Audio')return window.Audio;
if(k==='Image')return window.Image;
if(k==='Blob')return window.Blob;
if(k==='URL')return window.URL;
if(k==='TextEncoder')return window.TextEncoder;
if(k==='TextDecoder')return window.TextDecoder;
if(k==='window')return window;
if(k==='document')return document;
if(k==='localStorage')return localStorage;
if(k==='sessionStorage')return sessionStorage;
if(k==='navigator')return navigator;
if(k==='location')return location;
if(k==='caches')return window.caches;
return undefined;
}catch(_){return undefined;}
});

const origLog=console.log;
const origWarn=console.warn;
const origError=console.error;
const origInfo=console.info;

console.log=(...args)=>{
origLog.apply(console,args);
appendLine('log',args.map(a=>formatValue(a)).join(' '));
};
console.warn=(...args)=>{
origWarn.apply(console,args);
appendLine('warn',args.map(a=>formatValue(a)).join(' '));
};
console.error=(...args)=>{
origError.apply(console,args);
appendLine('error',args.map(a=>formatValue(a)).join(' '));
};
console.info=(...args)=>{
origInfo.apply(console,args);
appendLine('info',args.map(a=>formatValue(a)).join(' '));
};

try{
const wrappedCode=wrapWithReturn(code);
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
const fn=new AsyncFunction(...scopeKeys,wrappedCode);
const result=await fn.apply(null,scopeVals);
if(result!==undefined){
appendLine('result',formatValue(result));
}
}catch(err){
appendLine('error',(err&&(err.stack||err.message))||String(err));
}finally{
console.log=origLog;
console.warn=origWarn;
console.error=origError;
console.info=origInfo;
}
}


function submitInput(){
const code=inputEl.value.trim();
if(!code)return;
appendLine('input',code);
history.unshift(code);
if(history.length>100)history.pop();
historyIdx=-1;
inputEl.value='';
inputEl.style.height='auto';
evaluate(code);
}


pasteBtn.addEventListener('click',e=>{
e.preventDefault();
e.stopPropagation();
pasteFromClipboard();
});

copyBtn.addEventListener('click',e=>{
e.preventDefault();
e.stopPropagation();
copyOutput();
});

clearBtn.addEventListener('click',e=>{
e.preventDefault();
e.stopPropagation();
clearOutput();
});

const disabledEnableBtn=disabledView.querySelector('.btn-primary');
if(disabledEnableBtn){
disabledEnableBtn.addEventListener('click',e=>{
e.preventDefault();
e.stopPropagation();
enableConsole();
});
}


inputEl.addEventListener('paste',e=>{
const paste=(e.clipboardData||window.clipboardData);
if(!paste)return;
const text=paste.getData('text');
if(text&&/\r|\n/.test(text)){
e.preventDefault();
pasteText(text);
showToast(T('console.pasted','Pasted'),false);
}
});


inputEl.addEventListener('keydown',e=>{
if(e.key==='Enter'&&e.shiftKey)return;

if(e.key==='Enter'&&!e.shiftKey){
e.preventDefault();
submitInput();
return;
}
if(e.key==='ArrowUp'){
e.preventDefault();
if(historyIdx<history.length-1){
historyIdx++;
inputEl.value=history[historyIdx];
autoResize();
}
}else if(e.key==='ArrowDown'){
e.preventDefault();
if(historyIdx>0){
historyIdx--;
inputEl.value=history[historyIdx];
autoResize();
}else{
historyIdx=-1;
inputEl.value='';
inputEl.style.height='auto';
}
}else if((e.ctrlKey||e.metaKey)&&e.key==='l'){
e.preventDefault();
clearOutput();
}
});

inputEl.addEventListener('input',autoResize);


function isEnabled(){
try{
if(window.NibblyApp&&typeof window.NibblyApp.getSettings==='function'){
const s=window.NibblyApp.getSettings();
return s&&s.logMode==='console';
}
}catch(_){}
return false;
}

function updateVisibility(){
if(isEnabled()){
disabledView.style.display='none';
enabledView.style.display='flex';
}else{
disabledView.style.display='flex';
enabledView.style.display='none';
}
}

function enableConsole(){
try{
if(window.NibblyApp&&typeof window.NibblyApp.setSettings==='function'){
window.NibblyApp.setSettings({logMode:'console'});
}
}catch(_){}
updateVisibility();
setTimeout(()=>{try{inputEl.focus();}catch(_){}},100);
}


updateVisibility();
appendLine('info',T('console.welcome',
'Nibbly Console ready. Type JavaScript and press Enter.\n'+
'Shift+Enter: new line · // or /* */ comments allowed · Paste button available.\n'+
'Try: 1 + 1  or  NibblyModules'));

return{
refresh(){
updateVisibility();
if(isEnabled()){
setTimeout(()=>{try{inputEl.focus();}catch(_){}},50);
}
},
destroy(){root.remove();}
};
}

window.NibblyModules=window.NibblyModules||{};
window.NibblyModules.console={
id:'console',
version:'2.0.7',
init:init
};
window.NibblyConsole=window.NibblyModules.console;

if(console&&console.debug){
console.debug('[Nibbly] console.js loaded → window.NibblyModules.console (v2.0.7)');
}
})();