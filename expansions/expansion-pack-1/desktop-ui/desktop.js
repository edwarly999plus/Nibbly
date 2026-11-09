(function(){
'use strict';

const TAB_ICONS_MAP={
num:'numbers',
txt:'text',
uni:'bits',
pot:'thunder',
media:'music',
calc:'calc',
ciphers:'cipher',
paint:'pencil',
games:'games',
formulas:'formulas',
range:'range',
memory:'memory',
markdown:'markdown',
console:'console',
logic:'logic',
flowcharts:'flowchart',
practice:'brain'
};

const FALLBACK_EMOJIS={
numbers:'🔢',text:'📝',bits:'📊',thunder:'⚡',
music:'🎵',calc:'🧮',cipher:'🔐',pencil:'🎨',
games:'🎮',formulas:'🧮',range:'📈',memory:'🧩',
markdown:'📄',console:'🖥️',logic:'🔌',flowchart:'📊',
brain:'🧠'
};

let initialized=false;
let observerActive=false;

function injectTabIcons(){
if(!window.NibblyIcons){
setTimeout(injectTabIcons,100);
return;
}

document.querySelectorAll('.nav-bar .tab').forEach(tab=>{
if(tab.querySelector('.tab-icon'))return;
const tabId=tab.dataset.tab;
const iconName=TAB_ICONS_MAP[tabId];
if(!iconName)return;

const originalText=tab.textContent.trim();
const originalI18n=tab.dataset.i18n;

tab.textContent='';

const iconEl=document.createElement('span');
iconEl.className='tab-icon';
iconEl.setAttribute('aria-hidden','true');

let html='';
if(window.NibblyIcons){
html=window.NibblyIcons.get(iconName,{size:18,class:'tab-vec-icon'});
}
if(html){
iconEl.innerHTML=html;
}else{
iconEl.textContent=FALLBACK_EMOJIS[iconName]||'•';
iconEl.style.fontSize='18px';
iconEl.style.lineHeight='1';
}

const labelEl=document.createElement('span');
labelEl.className='tab-label';
labelEl.textContent=originalText;
if(originalI18n)labelEl.dataset.i18n=originalI18n;

tab.appendChild(iconEl);
tab.appendChild(labelEl);
delete tab.dataset.i18n;
});
}

function watchNavBar(){
if(observerActive)return;
const navBar=document.querySelector('.nav-bar');
if(!navBar||typeof MutationObserver==='undefined')return;
observerActive=true;

const observer=new MutationObserver(()=>{
const tabs=navBar.querySelectorAll('.tab');
let needsReinject=false;
tabs.forEach(tab=>{
if(!tab.querySelector('.tab-icon')&&TAB_ICONS_MAP[tab.dataset.tab]){
needsReinject=true;
}
});
if(needsReinject)injectTabIcons();
});

observer.observe(navBar,{childList:true,subtree:false});
}

/* ─── Version Badge (separado correctamente) ──── */
function addVersionBadge(){
const brand=document.querySelector('.topbar .brand');
if(!brand)return;
const h1=brand.querySelector('h1');
if(!h1)return;

let badge=brand.querySelector('.version-badge');
if(!badge){
badge=document.createElement('span');
badge.className='version-badge';
h1.appendChild(badge);
}

// Única fuente de verdad: window.__NIBBLY_APP_VERSION
const version=window.__NIBBLY_APP_VERSION;
if(version){
badge.textContent='v'+version;
badge.style.display='';
}else{
badge.textContent='';
badge.style.display='none';
}
}

function watchVersionBadge(){
if(window.__nibblyVersionWatch)return;
window.__nibblyVersionWatch=true;

let tries=0;
const tick=()=>{
tries++;
const brand=document.querySelector('.topbar .brand');
const v=window.__NIBBLY_APP_VERSION;
if(v&&brand){
addVersionBadge();
return;
}
if(tries<20){
requestAnimationFrame(tick);
}
};
tick();
}

function addKeyboardShortcuts(){
if(window.__nibblyDesktopShortcuts)return;
window.__nibblyDesktopShortcuts=true;

document.addEventListener('keydown',(e)=>{
if(!document.body.classList.contains('desktop-ui'))return;
const tag=(e.target.tagName||'').toUpperCase();
if(tag==='INPUT'||tag==='TEXTAREA'||e.target.isContentEditable)return;
if(e.ctrlKey||e.metaKey||e.altKey||e.shiftKey)return;

if(e.key==='Escape'){
const sheet=document.getElementById('nibSheet');
if(sheet&&sheet.classList.contains('show')){
e.preventDefault();
const closeBtn=document.getElementById('nibSheetClose');
if(closeBtn)closeBtn.click();
}
return;
}

const num=parseInt(e.key,10);
if(num>=1&&num<=9){
const visibleTabs=Array.from(document.querySelectorAll('.nav-bar .tab'))
.filter(t=>!t.disabled&&t.style.display!=='none');
const targetTab=visibleTabs[num-1];
if(targetTab){
e.preventDefault();
targetTab.click();
}
}
},true);
}

function addCardHover(){
if(document.body.classList.contains('no-effects'))return;
const EXCLUDE_SELECTORS=[
'.nib-markdown','.nibbly-formulas','.nibbly-games',
'#panel-markdown','#panel-formulas','#panel-games'
];
document.querySelectorAll('.panel .card').forEach(card=>{
if(card.dataset.desktopHover)return;
let excluded=false;
for(const sel of EXCLUDE_SELECTORS){
if(card.closest(sel)){excluded=true;break;}
}
if(excluded)return;

card.dataset.desktopHover='1';
card.addEventListener('mouseenter',()=>{
card.style.transition='box-shadow .22s ease';
card.style.boxShadow='0 4px 24px rgba(0, 0, 0, .15)';
});
card.addEventListener('mouseleave',()=>{
card.style.boxShadow='';
});
});
}

function run(){
injectTabIcons();
watchNavBar();
addVersionBadge();
watchVersionBadge();
addKeyboardShortcuts();
addCardHover();
}

function init(){
if(initialized){run();return;}
initialized=true;
if(typeof requestAnimationFrame==='function'){
requestAnimationFrame(run);
}else{
setTimeout(run,0);
}
}


const api={
id:'desktop',
version:'1.0.1',
init:init,
refresh:init,
_TAB_ICONS:TAB_ICONS_MAP
};

window.NibblyDesktop=api;
window.NibblyModules=window.NibblyModules||{};
window.NibblyModules.desktop=api;

if(document.body&&document.body.classList.contains('desktop-ui')){
init();
}

if(console&&console.debug){
console.debug('[Nibbly] desktop.js loaded → window.NibblyDesktop + window.NibblyModules.desktop');
}
})();