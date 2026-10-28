(function(){
'use strict';
if(window.NibblyApp&&window.NibblyApp.init)return;


const SETTINGS_KEY='nibbly-settings-v2';
const EXPANSION_BASE='expansions/expansion-pack-1/';
const EXPANSION_BASE_2='expansions/expansion-pack-2/';

const DEFAULT_SETTINGS={
accent:'#5b8cff',bg:'#0b1020',
effects:true,sounds:true,soundVolume:100,
music:false,musicVolume:100,
gamesEnabled:true,pleaseDont:false,
lang:'en',uiMode:'auto',logMode:'off',
bgIntensity:100
};

const CORE_TABS=[
{id:'num',key:'tab.num',mod:'numbers',panel:'panel-num'},
{id:'txt',key:'tab.txt',mod:'textconv',panel:'panel-txt'},
{id:'uni',key:'tab.uni',mod:'bits',panel:'panel-uni'},
{id:'pot',key:'tab.pot',mod:'power',panel:'panel-pot'},
{id:'media',key:'tab.media',mod:'media',panel:'panel-media'},
{id:'calc',key:'tab.calc',mod:'calc',panel:'panel-calc'},
{id:'ciphers',key:'tab.ciphers',mod:'ciphers',panel:'panel-ciphers'}
];

const OPTIONAL_TABS=[
{id:'range',key:'tab.range',mod:'range',
js:EXPANSION_BASE+'range/range.js',
css:EXPANSION_BASE+'range/range.css',
panel:'panel-range'},
{id:'memory',key:'tab.memory',mod:'memory',
js:EXPANSION_BASE+'memory/memory.js',
css:EXPANSION_BASE+'memory/memory.css',
panel:'panel-memory'},
{id:'paint',key:'tab.paint',mod:'paint',
js:EXPANSION_BASE+'paint/paint.js',
css:EXPANSION_BASE+'paint/paint.css',
panel:'panel-paint'},
{id:'games',key:'tab.games',mod:'games',
js:EXPANSION_BASE+'games/games.js',
css:EXPANSION_BASE+'games/games.css',
panel:'panel-games'},
{id:'formulas',key:'tab.formulas',mod:'formulas',
js:EXPANSION_BASE+'formulas/formulas.js',
css:EXPANSION_BASE+'formulas/formulas.css',
panel:'panel-formulas'},
{id:'console',key:'tab.console',mod:'console',
js:EXPANSION_BASE+'console/console.js',
css:EXPANSION_BASE+'console/console.css',
panel:'panel-console',
requiresLogMode:'console'},
{id:'markdown',key:'tab.markdown',mod:'markdown',
js:EXPANSION_BASE+'markdown/markdown.js',
css:EXPANSION_BASE+'markdown/markdown.css',
panel:'panel-markdown'},
/* ══════════════ EXPANSION PACK 2 ══════════════ */
{id:'logic',
key:'tab.logic',
mod:'logic-gates',
js:EXPANSION_BASE_2+'logic-gates/logic-gates.js',
css:EXPANSION_BASE_2+'logic-gates/logic-gates.css',
panel:'panel-logic'}
];

const EXPANSION_FILES=[
{js:'app/langs/es.js',cat:'checker.cat.langs'},
{js:EXPANSION_BASE+'range/range.js',
css:EXPANSION_BASE+'range/range.css',
cat:'checker.cat.range'},
{js:EXPANSION_BASE+'memory/memory.js',
css:EXPANSION_BASE+'memory/memory.css',
cat:'checker.cat.memory'},
{js:EXPANSION_BASE+'paint/paint.js',
css:EXPANSION_BASE+'paint/paint.css',
cat:'checker.cat.paint'},
{js:EXPANSION_BASE+'games/games.js',
css:EXPANSION_BASE+'games/games.css',
cat:'checker.cat.games'},
{js:EXPANSION_BASE+'games/games-extras.js',
css:EXPANSION_BASE+'games/games-extras.css',
cat:'checker.cat.games'},
{js:EXPANSION_BASE+'formulas/formulas.js',
css:EXPANSION_BASE+'formulas/formulas.css',
cat:'checker.cat.formulas'},
{js:EXPANSION_BASE+'privacy/privacy.js',
css:EXPANSION_BASE+'privacy/privacy.css',
cat:'checker.cat.privacy'},
{js:EXPANSION_BASE+'desktop-ui/desktop.js',
css:EXPANSION_BASE+'desktop-ui/desktop.css',
cat:'checker.cat.desktop'},
{js:EXPANSION_BASE+'console/console.js',
css:EXPANSION_BASE+'console/console.css',
cat:'checker.cat.console'},
{js:EXPANSION_BASE+'markdown/markdown.js',
css:EXPANSION_BASE+'markdown/markdown.css',
cat:'checker.cat.markdown'},
{asset:'mus/You Are Nibbled.ogg',assetType:'audio',cat:'checker.cat.music'},
/* ══════════════ EXPANSION PACK 2 ══════════════ */
{js:EXPANSION_BASE_2+'logic-gates/logic-gates.js',
css:EXPANSION_BASE_2+'logic-gates/logic-gates.css',
cat:'checker.cat.logic'}
];


let settings=Object.assign({},DEFAULT_SETTINGS);
let ctxRef=null;
let rootApp=null;
let appContainer=null;
let currentTab='num';
let moduleInst={};
let initialized={};
let visualLogs=[];
let toastTimer=null;
let audioCtx=null;
let lazyLoading={};
let destroyed=false;
let reloading=false;


function loadSettings(){
try{
const raw=localStorage.getItem(SETTINGS_KEY);
if(raw)settings=Object.assign({},DEFAULT_SETTINGS,JSON.parse(raw));
}catch(_){}
}
function saveSettings(){
try{localStorage.setItem(SETTINGS_KEY,JSON.stringify(settings));}catch(_){}
}


function t(key,fallback){
if(ctxRef&&typeof ctxRef.getString==='function'){
const v=ctxRef.getString(key);
if(v&&v!==key)return v;
}
return fallback||key;
}
function applyI18n(){
document.querySelectorAll('[data-i18n]').forEach(el=>{
if(el.querySelector('.nib-vec-icon'))return;
const v=t(el.dataset.i18n,el.textContent);
if(v)el.textContent=v;
});
document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
const v=t(el.dataset.i18nPlaceholder,el.placeholder);
if(v)el.placeholder=v;
});
document.querySelectorAll('[data-i18n-title]').forEach(el=>{
const v=t(el.dataset.i18nTitle,el.title);
if(v)el.title=v;
});
document.documentElement.lang=settings.lang;
}


function syncColorChips(){
const sa=document.getElementById('setAccent');
const sb=document.getElementById('setBg');
if(sa&&sa.parentElement){
sa.parentElement.style.setProperty('--chip-color',settings.accent||'#5b8cff');
}
if(sb&&sb.parentElement){
sb.parentElement.style.setProperty('--chip-color',settings.bg||'#0b1020');
}
}

function applyTheme(){
const root=document.documentElement;
root.style.setProperty('--accent-base',settings.accent);
root.style.setProperty('--bg-base',settings.bg);
const meta=document.querySelector('meta[name="theme-color"]');
if(meta)meta.setAttribute('content',settings.bg);
document.body.classList.toggle('no-effects',!settings.effects);

const rawIntensity=Number(settings.bgIntensity);
const safeIntensity=Number.isFinite(rawIntensity)?rawIntensity:100;
const intensity=Math.max(0,Math.min(100,safeIntensity))/100;

root.style.setProperty('--bg-anim-brightness',String(intensity));
if(window.NibblyEffects&&
typeof window.NibblyEffects.setBgIntensity==='function'){
try{window.NibblyEffects.setBgIntensity(intensity);}catch(_){}
}

const ap=document.getElementById('accentPreview');
const bp=document.getElementById('bgPreview');
const al=document.getElementById('accentLabel');
const bl=document.getElementById('bgLabel');
if(ap)ap.style.background=settings.accent;
if(bp)bp.style.background=settings.bg;
if(al)al.textContent=settings.accent;
if(bl)bl.textContent=settings.bg;
const sa=document.getElementById('setAccent');
const sb=document.getElementById('setBg');
if(sa)sa.value=settings.accent;
if(sb)sb.value=settings.bg;
syncColorChips();
}


function ensureToast(){
let el=document.getElementById('nibToast');
if(!el){
el=document.createElement('div');
el.id='nibToast';
el.className='toast';
document.body.appendChild(el);
}
return el;
}
function toast(msg,isError){
const el=ensureToast();
el.textContent=msg;
el.classList.toggle('bad',!!isError);
el.classList.add('show');
clearTimeout(toastTimer);
toastTimer=setTimeout(()=>el.classList.remove('show'),2000);
}


function logCalc(msg){
if(settings.logMode==='off')return;
if(settings.logMode==='console'){console.log('[Nibbly]',msg);return;}
const time=new Date().toLocaleTimeString();
visualLogs.unshift({time,msg:String(msg)});
if(visualLogs.length>200)visualLogs.pop();
renderLog();
}
function renderLog(){
const body=document.getElementById('nibLogBody');
if(!body)return;
if(!visualLogs.length){
body.innerHTML='<div class="log-empty">'+t('log.empty','No entries yet.')+'</div>';
return;
}
body.innerHTML=visualLogs.map(e=>
'<div class="log-entry"><span class="time">'+e.time+'</span>'+
escapeHtml(e.msg)+'</div>').join('');
}
function escapeHtml(s){
return String(s).replace(/[&<>"']/g,c=>({
'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
}[c]));
}


function ensureAudioCtx(){
if(!audioCtx){
try{
const AC=window.AudioContext||window.webkitAudioContext;
if(!AC)return null;
audioCtx=new AC();
}catch(_){return null;}
}
if(audioCtx.state==='suspended')audioCtx.resume().catch(()=>{});
return audioCtx;
}
function playClick(){
if(window.NibblyEffects&&
window.NibblyEffects.sound&&
typeof window.NibblyEffects.sound.click==='function'){
window.NibblyEffects.sound.click();
return;
}
if(!settings.sounds||settings.soundVolume<1)return;
const ctx=ensureAudioCtx();
if(!ctx)return;
try{
const now=ctx.currentTime;
const vol=settings.soundVolume/100;
const osc=ctx.createOscillator();
const gain=ctx.createGain();
osc.type='sine';
osc.frequency.setValueAtTime(880,now);
osc.frequency.exponentialRampToValueAtTime(620,now+0.055);
gain.gain.setValueAtTime(0.0001,now);
gain.gain.exponentialRampToValueAtTime(0.075*vol,now+0.006);
gain.gain.exponentialRampToValueAtTime(0.0001,now+0.09);
osc.connect(gain);gain.connect(ctx.destination);
osc.start(now);osc.stop(now+0.1);
}catch(_){}
}


function h(tag,attrs,children){
const n=document.createElement(tag);
if(attrs){
for(const k in attrs){
const v=attrs[k];
if(k==='class')n.className=v;
else if(k==='html')n.innerHTML=v;
else if(k==='text')n.textContent=v;
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
.forEach(c=>{
if(c==null||c===false)return;
n.appendChild(typeof c==='string'?document.createTextNode(c):c);
});
return n;
}


function buildShell(){
rootApp=h('div',{class:'app'});

const topbar=h('header',{class:'topbar'},[
h('div',{class:'brand'},[
h('h1',{},[
h('span',{class:'logo-dot'}),
h('span',{'data-i18n':'app.title',text:t('app.title','Nibbly')})
]),
h('p',{'data-i18n':'app.subtitle',
text:t('app.subtitle','Bases · Text · Morse · Bits · Power · Media')})
]),
h('button',{
class:'icon-btn',id:'nibOpenSettings',type:'button',
'aria-label':'Settings',
html:window.NibblyIcons?window.NibblyIcons.get('config',{size:24}):''
})
]);
rootApp.appendChild(topbar);

const nav=h('nav',{class:'nav-bar'});
CORE_TABS.forEach(tab=>{
nav.appendChild(h('button',{
class:'tab'+(tab.id===currentTab?' active':''),
type:'button',
dataset:{tab:tab.id},
'data-i18n':tab.key,
text:t(tab.key,tab.id)
}));
});
OPTIONAL_TABS.forEach(tab=>{
nav.appendChild(h('button',{
class:'tab',type:'button',
dataset:{tab:tab.id},
'data-i18n':tab.key,
text:t(tab.key,tab.id)
}));
});
rootApp.appendChild(nav);

const main=h('main');
CORE_TABS.forEach(tab=>{
main.appendChild(h('section',{
class:'panel'+(tab.id===currentTab?' active':''),
id:tab.panel
}));
});
OPTIONAL_TABS.forEach(tab=>{
main.appendChild(h('section',{class:'panel',id:tab.panel}));
});
rootApp.appendChild(main);

nav.addEventListener('click',e=>{
const btn=e.target.closest('.tab');
if(!btn||btn.disabled)return;
switchTab(btn.dataset.tab);
});

const settingsBtn=topbar.querySelector('#nibOpenSettings');
settingsBtn.addEventListener('click',()=>{
if(settingsBtn.dataset.spinning==='1')return;
settingsBtn.dataset.spinning='1';

const isRight=settingsBtn.classList.contains('spin-right');
settingsBtn.classList.remove('spin-right','spin-left');
void settingsBtn.offsetWidth;
settingsBtn.classList.add(isRight?'spin-left':'spin-right');

setTimeout(()=>{
openSheet();
settingsBtn.dataset.spinning='0';
},450);
});

return rootApp;
}


function initPrivacyFab(){
if(!window.NibblyPrivacy)return;
try{
if(typeof window.NibblyPrivacy.mount==='function'){
window.NibblyPrivacy.mount();
}else if(typeof window.NibblyPrivacy.init==='function'){
window.NibblyPrivacy.init();
}
}catch(e){
console.warn('[Nibbly] privacy mount failed:',e);
}
}


function switchTab(tabId){
const prevTab=currentTab;
currentTab=tabId;

if(prevTab==='games'&&tabId!=='games'){
const g=window.NibblyGames;
if(g&&typeof g.pauseActive==='function'){
try{g.pauseActive();}catch(_){}
}
}
if(prevTab!=='games'&&tabId==='games'){
const g=window.NibblyGames;
if(g&&typeof g.resumeActive==='function'){
try{g.resumeActive();}catch(_){}
}
}

document.querySelectorAll('.nav-bar .tab').forEach(b=>{
b.classList.toggle('active',b.dataset.tab===tabId);
});
document.querySelectorAll('.panel').forEach(p=>{
p.classList.toggle('active',p.id==='panel-'+tabId);
});
const coreTab=CORE_TABS.find(x=>x.id===tabId);
if(coreTab){
const inst=moduleInst[coreTab.mod];
if(inst&&typeof inst.refresh==='function'){
try{inst.refresh();}catch(e){
console.warn('[Nibbly] refresh '+coreTab.mod+':',e);
}
}else if(inst&&typeof inst.rebuild==='function'){
try{inst.rebuild();}catch(e){
console.warn('[Nibbly] rebuild '+coreTab.mod+':',e);
}
}
}
const opt=OPTIONAL_TABS.find(x=>x.id===tabId);
if(opt)lazyLoadOptional(opt);
}


function initCoreModules(){
CORE_TABS.forEach(tab=>{
const mod=window.NibblyModules&&window.NibblyModules[tab.mod];
const panel=document.getElementById(tab.panel);
if(!panel)return;
if(!mod||typeof mod.init!=='function'){
panel.innerHTML='<div class="card"><div class="hint">'+
'Module <b>'+tab.mod+'</b> not available.</div></div>';
return;
}
try{
moduleInst[tab.mod]=mod.init(panel,ctxRef);
initialized[tab.mod]=true;
}catch(e){
console.error('[Nibbly] init '+tab.mod+' failed:',e);
panel.innerHTML='<div class="card"><div class="hint">'+
'Error: '+escapeHtml(e.message||String(e))+'</div></div>';
}
});
['music','effects'].forEach(name=>{
const mod=window.NibblyModules&&window.NibblyModules[name];
if(mod&&typeof mod.init==='function'&&!initialized[name]){
try{
moduleInst[name]=mod.init(null,ctxRef);
initialized[name]=true;
}catch(e){
console.warn('[Nibbly] init '+name+' failed:',e);
}
}
});
}

function getOptionalModule(id){
const m1=window.NibblyModules&&window.NibblyModules[id];
if(m1&&typeof m1.init==='function')return m1;
const cap=id.charAt(0).toUpperCase()+id.slice(1);
const m2=window['Nibbly'+cap];
if(m2&&typeof m2.init==='function')return m2;
return null;
}

function lazyLoadOptional(tab){
const panel=document.getElementById(tab.panel);
if(!panel)return;
if(initialized[tab.mod]){
const inst=moduleInst[tab.mod];
if(inst&&typeof inst.refresh==='function'){
try{inst.refresh();}catch(_){}
}
return;
}
if(lazyLoading[tab.id])return lazyLoading[tab.id];

panel.innerHTML='<div class="card"><div class="hint">'+
t('games.loading','Loading…')+'</div></div>';

lazyLoading[tab.id]=new Promise(resolve=>{
let settled=false;
const existing=getOptionalModule(tab.mod);
if(existing){doInit();return;}

const css=document.createElement('link');
css.rel='stylesheet';css.href=tab.css;
document.head.appendChild(css);
const js=document.createElement('script');
js.src=tab.js;
js.onload=()=>{if(!settled){settled=true;doInit();}};
js.onerror=()=>{if(!settled){settled=true;fail();}};
document.head.appendChild(js);
setTimeout(()=>{if(!settled){settled=true;fail();}},8000);

function doInit(){
const mod=getOptionalModule(tab.mod);
if(!mod){fail();return;}
try{
panel.innerHTML='';
moduleInst[tab.mod]=mod.init(panel,ctxRef);
initialized[tab.mod]=true;
resolve(true);
}catch(e){
console.error('[Nibbly] lazy init '+tab.mod+':',e);
fail();
}
}
function fail(){
panel.innerHTML='<div class="card"><div class="hint" '+
'style="color:var(--bad)">'+
t('games.error','Files not found :(')+'</div></div>';
resolve(false);
}
});
return lazyLoading[tab.id];
}

function refreshModules(){
CORE_TABS.forEach(tab=>{
const inst=moduleInst[tab.mod];
if(inst&&typeof inst.refresh==='function'){
try{inst.refresh();return;}catch(_){}
}
if(typeof inst==='function'){try{inst();}catch(_){}}
const panel=document.getElementById(tab.panel);
const mod=window.NibblyModules&&window.NibblyModules[tab.mod];
if(panel&&mod&&typeof mod.init==='function'){
panel.innerHTML='';
try{moduleInst[tab.mod]=mod.init(panel,ctxRef);}
catch(e){console.warn('[Nibbly] refresh '+tab.mod+':',e);}
}
});
}


function updateConsoleTabVisibility(){
const tabBtn=document.querySelector('.tab[data-tab="console"]');
if(!tabBtn)return;
const shouldShow=settings.logMode==='console';
tabBtn.style.display=shouldShow?'':'none';
if(!shouldShow&&currentTab==='console'){
switchTab('num');
}
}


function injectSheetIcons(){
if(!window.NibblyIcons){
setTimeout(injectSheetIcons,50);
return;
}

const reloadBtn=document.getElementById('nibReloadExpansion');
if(reloadBtn){
if(reloadBtn.querySelector('img'))return;
const text=reloadBtn.textContent.replace('🔄','').trim();
reloadBtn.innerHTML=window.NibblyIcons.get('reload',{size:18})+
' '+(text||t('settings.reloadExpansion','Reload Expansion Files'));
}

const clearBtn=document.getElementById('nibClearCache');
if(clearBtn){
if(clearBtn.querySelector('img'))return;
const text=clearBtn.textContent.replace('🗑️','').trim();
clearBtn.innerHTML=window.NibblyIcons.get('trash',{size:18,class:'tint-bad'})+
' '+(text||t('settings.clearCache','Clear Cache & Reload'));
}
}


function buildSheet(){
const overlay=h('div',{class:'sheet-overlay',id:'nibSheetOverlay'});
const sheet=h('div',{class:'sheet',id:'nibSheet'},[
h('div',{class:'sheet-inner'},[
h('div',{class:'sheet-handle'}),
h('h2',{class:'sheet-title'},[
h('span',{'data-i18n':'settings.title',text:t('settings.title','Settings')}),
h('button',{class:'sheet-close',id:'nibSheetClose',type:'button',text:'✕'})
]),

h('div',{class:'setting-section'},[
h('h3',{'data-i18n':'settings.appearance',text:t('settings.appearance','Appearance')}),
h('div',{class:'setting-row'},[
h('div',{class:'rl'},[
h('div',{class:'t','data-i18n':'settings.accent',
text:t('settings.accent','Accent color')}),
h('div',{class:'d'},[
h('span',{class:'color-preview',id:'accentPreview'}),
h('span',{id:'accentLabel',text:settings.accent})
])
]),
h('label',{class:'color-chip'},[
h('span',{class:'chip-color-fill'}),
h('input',{type:'color',id:'setAccent',value:settings.accent})
])
]),

h('div',{class:'setting-row',style:'margin-top:8px;'},[
h('div',{class:'rl'},[
h('div',{class:'t','data-i18n':'settings.bg',
text:t('settings.bg','Background color')}),
h('div',{class:'d'},[
h('span',{class:'color-preview',id:'bgPreview'}),
h('span',{id:'bgLabel',text:settings.bg})
])
]),
h('label',{class:'color-chip'},[
h('span',{class:'chip-color-fill'}),
h('input',{type:'color',id:'setBg',value:settings.bg})
])
]),

h('button',{
class:'reset-btn',id:'nibResetColors',type:'button',
'data-i18n':'settings.reset',text:t('settings.reset','Reset colors')
})
]),

h('div',{class:'setting-section'},[
h('h3',{'data-i18n':'settings.interface',text:t('settings.interface','Interface')}),
h('div',{
class:'hint',style:'margin:0 0 10px;',
'data-i18n':'settings.interface.hint',
text:t('settings.interface.hint',
"Force pocket or desktop interface if your browser doesn't detect the device correctly.")
}),
h('div',{class:'seg',id:'uiModeSeg'},[
segBtn('auto','settings.ui.auto','Auto',settings.uiMode==='auto'),
segBtn('pocket','settings.ui.pocket','Pocket',settings.uiMode==='pocket'),
segBtn('desktop','settings.ui.desktop','Desktop',settings.uiMode==='desktop')
])
]),

h('div',{class:'setting-section'},[
h('h3',{'data-i18n':'settings.log',text:t('settings.log','Calculation log')}),
h('div',{class:'seg',id:'logModeSeg'},[
segBtn('off','settings.log.off','Off',settings.logMode==='off'),
segBtn('console','settings.log.console','Console',settings.logMode==='console'),
segBtn('visual','settings.log.visual','In-app',settings.logMode==='visual')
])
]),

h('div',{class:'setting-section'},[
h('h3',{'data-i18n':'settings.effects',text:t('settings.effects','Visual effects')}),
h('div',{class:'setting-row'},[
h('div',{class:'rl'},[
h('div',{class:'t','data-i18n':'settings.effects',
text:t('settings.effects','Visual effects')}),
h('div',{class:'d','data-i18n':'settings.effects.desc',
text:t('settings.effects.desc','Transitions, animations and gradients.')})
]),
switchEl('setEffects',settings.effects)
]),

h('div',{style:'padding:0 0 8px;'},[
h('div',{class:'hint',style:'margin:0 0 4px;'},[
h('span',{'data-i18n':'settings.bgIntensity',
text:t('settings.bgIntensity','Background intensity')}),
document.createTextNode(': '),
h('b',{id:'bgIntensityLabel',text:settings.bgIntensity+'%'})
]),
h('input',{
type:'range',class:'vol-slider',id:'setBgIntensity',
min:'0',max:'100',value:String(settings.bgIntensity),
disabled:!settings.effects?'':undefined
})
]),

h('div',{class:'setting-row'},[
h('div',{class:'rl'},[
h('div',{class:'t','data-i18n':'settings.sounds',
text:t('settings.sounds','Sounds')}),
h('div',{class:'d','data-i18n':'settings.sounds.desc',
text:t('settings.sounds.desc','Sounds when tapping buttons.')})
]),
switchEl('setSounds',settings.sounds)
]),
h('div',{style:'padding:0 0 8px;'},[
h('div',{class:'hint',style:'margin:0 0 4px;'},[
h('span',{'data-i18n':'settings.volume.sound',
text:t('settings.volume.sound','Sound volume')}),
document.createTextNode(': '),
h('b',{id:'soundVolLabel',text:settings.soundVolume+'%'})
]),
h('input',{
type:'range',class:'vol-slider',id:'setSoundVol',
min:'0',max:'100',value:String(settings.soundVolume)
})
])
]),

h('div',{class:'setting-section'},[
h('h3',{'data-i18n':'settings.musicSection',text:t('settings.musicSection','Music')}),
h('div',{class:'setting-row'},[
h('div',{class:'rl'},[
h('div',{class:'t','data-i18n':'settings.music',
text:t('settings.music','Background music')}),
h('div',{class:'d','data-i18n':'settings.music.desc',
text:t('settings.music.desc','Plays the Nibbly soundtrack in a loop.')})
]),
switchEl('setMusic',settings.music)
]),
h('div',{style:'padding:0 0 8px;'},[
h('div',{class:'hint',style:'margin:0 0 4px;'},[
h('span',{'data-i18n':'settings.volume.music',
text:t('settings.volume.music','Music volume')}),
document.createTextNode(': '),
h('b',{id:'musicVolLabel',text:settings.musicVolume+'%'})
]),
h('input',{
type:'range',class:'vol-slider',id:'setMusicVol',
min:'0',max:'100',value:String(settings.musicVolume)
})
])
]),

h('div',{class:'setting-section'},[
h('h3',{'data-i18n':'settings.gamesSection',text:t('settings.gamesSection','Games')}),
h('div',{class:'setting-row'},[
h('div',{class:'rl'},[
h('div',{class:'t','data-i18n':'settings.games',
text:t('settings.games','Games ON/OFF')}),
h('div',{class:'d','data-i18n':'settings.games.desc',
text:t('settings.games.desc','Enable or disable the games section.')})
]),
switchEl('setGames',settings.gamesEnabled)
])
]),

h('div',{class:'setting-section'},[
h('h3',{'data-i18n':'settings.extras',text:t('settings.extras','Extras')}),
h('div',{class:'setting-row'},[
h('div',{class:'rl'},[
h('div',{class:'t','data-i18n':'settings.pleaseDont',
text:t('settings.pleaseDont',"Please Don't")}),
h('div',{class:'d','data-i18n':'settings.pleaseDont.desc',
text:t('settings.pleaseDont.desc',
'Activates EasterEggs when you make an error in the calculator.')})
]),
switchEl('setPleaseDont',settings.pleaseDont)
])
]),

h('div',{class:'setting-section'},[
h('h3',{'data-i18n':'settings.lang',text:t('settings.lang','Language')}),
h('div',{class:'seg',id:'langSeg'},[
segBtn('en',null,'🇬🇧 English',settings.lang==='en'),
segBtn('es',null,'🇪🇸 Español',settings.lang==='es',
!ctxRef||!ctxRef.hasSpanish)
]),
(!ctxRef||!ctxRef.hasSpanish)
?h('div',{
class:'hint',style:'margin-top:8px;color:var(--bad)',
'data-i18n':'settings.lang.disabled',
text:t('settings.lang.disabled',
'Spanish pack not installed (app/langs/es.js missing).')
})
:null
]),

h('div',{class:'setting-section'},[
h('h3',{'data-i18n':'settings.checker',text:t('settings.checker','File checker')}),
h('div',{
class:'hint',style:'margin:0 0 10px;',
'data-i18n':'settings.checker.desc',
text:t('settings.checker.desc',
'Verifies which expansion files are installed on the device.')
}),
h('button',{
class:'btn-primary',id:'nibCheckFiles',type:'button',
'data-i18n':'settings.checker.run',text:t('settings.checker.run','Check files')
}),
h('div',{class:'file-check-results',id:'nibFileCheckResults'}),
h('button',{
class:'reload-btn',id:'nibReloadExpansion',type:'button',
text:t('settings.reloadExpansion','Reload Expansion Files')
}),
h('div',{
class:'hint',style:'margin-top:6px;',
'data-i18n':'settings.reloadExpansion.desc',
text:t('settings.reloadExpansion.desc',
'Reloads only optional expansion files. Does NOT touch app/ core files.')
}),
h('button',{
class:'reset-btn',id:'nibClearCache',type:'button',
text:t('settings.clearCache','Clear Cache & Reload'),
style:'margin-top:12px;border-color:color-mix(in srgb,var(--bad) 45%,transparent);color:var(--bad);'
}),
h('div',{
class:'hint',style:'margin-top:6px;',
'data-i18n':'settings.clearCache.desc',
text:t('settings.clearCache.desc',
'The app will run slow on first start. Clear cache if a tab does not load correctly.')
})
]),

h('div',{class:'setting-section'},[
h('h3',{'data-i18n':'about.title',text:t('about.title','About')}),
h('div',{class:'about-card'},[
h('div',{class:'about-row'},[
h('span',{class:'k','data-i18n':'about.creator',text:t('about.creator','Creator')}),
h('span',{class:'v',text:'EdwarlyGamer999+'})
]),
h('div',{class:'about-row'},[
h('span',{class:'k','data-i18n':'about.version',text:t('about.version','Version')}),
h('span',{class:'v',text:window.__NIBBLY_APP_VERSION||'2.0.0'})
]),
h('div',{class:'about-row'},[
h('span',{class:'k',text:'Copyright ©'}),
h('span',{class:'v',text:'2026'})
]),
h('a',{
class:'github-link',
href:'https://github.com/edwarly999plus/Nibbly',
target:'_blank',rel:'noopener noreferrer'
},[
h('span',{html:
'<svg viewBox="0 0 16 16" aria-hidden="true" style="width:18px;height:18px;fill:currentColor">'+
'<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>'}),
h('span',{'data-i18n':'about.github',text:t('about.github','GitHub Source Code')})
]),
h('p',{
class:'external-disclaimer',
'data-i18n':'about.disclaimer',
text:t('about.disclaimer','Nibbly is a private app and does not collect data.')
}),
h('p',{class:'heart'},[
h('span',{'data-i18n':'about.made',text:t('about.made','Made with ♥️ by')}),
document.createTextNode(' '),
h('b',{text:'EdwarlyGamer999+'})
])
])
])
])
]);

document.body.appendChild(overlay);
document.body.appendChild(sheet);

injectSheetIcons();
syncColorChips();

return{sheet,overlay};
}


function segBtn(value,i18nKey,fallback,active,disabled){
return h('button',{
class:'seg-btn'+(active?' active':'')+(disabled?' disabled':''),
type:'button',dataset:{value},
text:i18nKey?t(i18nKey,fallback):fallback,
disabled:disabled?'':undefined
});
}
function switchEl(id,checked){
const input=h('input',{type:'checkbox',id});
if(checked)input.checked=true;
return h('label',{class:'switch'},[
input,h('span',{class:'track'}),h('span',{class:'thumb'})
]);
}

function openSheet(){
const s=document.getElementById('nibSheet');
const o=document.getElementById('nibSheetOverlay');
if(s)s.classList.add('show');
if(o)o.classList.add('show');
syncSettingsUI();
syncColorChips();
}
function closeSheet(){
const s=document.getElementById('nibSheet');
const o=document.getElementById('nibSheetOverlay');
if(s)s.classList.remove('show');
if(o)o.classList.remove('show');
}

function bindSheet(){
const overlay=document.getElementById('nibSheetOverlay');
const close=document.getElementById('nibSheetClose');
if(overlay)overlay.addEventListener('click',closeSheet);
if(close)close.addEventListener('click',closeSheet);

const sa=document.getElementById('setAccent');
const sb=document.getElementById('setBg');
if(sa)sa.addEventListener('input',e=>{
settings.accent=e.target.value;
applyTheme();saveSettings();
syncColorChips();
});
if(sb)sb.addEventListener('input',e=>{
settings.bg=e.target.value;
applyTheme();saveSettings();
syncColorChips();
});

const resetBtn=document.getElementById('nibResetColors');
if(resetBtn)resetBtn.addEventListener('click',()=>{
settings.accent=DEFAULT_SETTINGS.accent;
settings.bg=DEFAULT_SETTINGS.bg;
applyTheme();saveSettings();
toast(t('toast.reset','✓ Reset'));
});

bindSeg('uiModeSeg',v=>{settings.uiMode=v;saveSettings();applyUIMode();});
bindSeg('logModeSeg',v=>{
settings.logMode=v;
saveSettings();
updateLogVisibility();
updateConsoleTabVisibility();
});

const effects=document.getElementById('setEffects');
if(effects)effects.addEventListener('change',e=>{
settings.effects=e.target.checked;
applyTheme();saveSettings();
const slider=document.getElementById('setBgIntensity');
if(slider)slider.disabled=!settings.effects;
syncSettingsUI();
});

const bgIntensitySlider=document.getElementById('setBgIntensity');
if(bgIntensitySlider)bgIntensitySlider.addEventListener('input',e=>{
settings.bgIntensity=parseInt(e.target.value,10);
applyTheme();saveSettings();
const label=document.getElementById('bgIntensityLabel');
if(label)label.textContent=settings.bgIntensity+'%';
});

const sounds=document.getElementById('setSounds');
if(sounds)sounds.addEventListener('change',e=>{
settings.sounds=e.target.checked;
saveSettings();
if(settings.sounds)playClick();
});

const sv=document.getElementById('setSoundVol');
if(sv)sv.addEventListener('input',e=>{
settings.soundVolume=parseInt(e.target.value,10);
saveSettings();syncSettingsUI();
});

const music=document.getElementById('setMusic');
if(music)music.addEventListener('change',e=>{
settings.music=e.target.checked;
saveSettings();
const mm=moduleInst.music;
if(mm&&typeof mm.setEnabled==='function'){
mm.setEnabled(settings.music);
mm.setVolume(settings.musicVolume);
}
});

const mv=document.getElementById('setMusicVol');
if(mv)mv.addEventListener('input',e=>{
settings.musicVolume=parseInt(e.target.value,10);
saveSettings();syncSettingsUI();
const mm=moduleInst.music;
if(mm&&typeof mm.setVolume==='function')mm.setVolume(settings.musicVolume);
});

const games=document.getElementById('setGames');
if(games)games.addEventListener('change',e=>{
settings.gamesEnabled=e.target.checked;
saveSettings();
});

const pd=document.getElementById('setPleaseDont');
if(pd)pd.addEventListener('change',e=>{
settings.pleaseDont=e.target.checked;
saveSettings();
});

const langSeg=document.getElementById('langSeg');
if(langSeg)langSeg.addEventListener('click',e=>{
const btn=e.target.closest('.seg-btn');
if(!btn||btn.disabled)return;
const val=btn.dataset.value;
if(val===settings.lang)return;
if(val==='es'&&(!ctxRef||!ctxRef.hasSpanish)){
toast(t('toast.languageMissing','Spanish pack not installed.'),true);
return;
}
settings.lang=val;
if(ctxRef&&typeof ctxRef.setLanguage==='function')ctxRef.setLanguage(val);
saveSettings();
langSeg.querySelectorAll('.seg-btn').forEach(b=>{
b.classList.toggle('active',b.dataset.value===val);
});
applyI18n();refreshModules();
});

const chk=document.getElementById('nibCheckFiles');
if(chk)chk.addEventListener('click',runFileCheck);
const reloadBtn=document.getElementById('nibReloadExpansion');
if(reloadBtn)reloadBtn.addEventListener('click',reloadExpansionFiles);
const clearCacheBtn=document.getElementById('nibClearCache');
if(clearCacheBtn)clearCacheBtn.addEventListener('click',clearNibblyCache);
}

function buildPresets(boxId,colors,onPick){
const box=document.getElementById(boxId);
if(!box)return;
box.innerHTML='';
colors.forEach(c=>{
const b=h('button',{
class:'preset-swatch'+
(c.toLowerCase()===(boxId.startsWith('accent')
?settings.accent:settings.bg).toLowerCase()?' active':''),
type:'button',dataset:{color:c},
style:'background:'+c,title:c
});
b.addEventListener('click',()=>onPick(c));
box.appendChild(b);
});
}
function bindSeg(id,onPick){
const seg=document.getElementById(id);
if(!seg)return;
seg.addEventListener('click',e=>{
const btn=e.target.closest('.seg-btn');
if(!btn||btn.disabled)return;
seg.querySelectorAll('.seg-btn').forEach(b=>{
b.classList.toggle('active',b===btn);
});
onPick(btn.dataset.value);
});
}

function syncSettingsUI(){
const setVal=(id,v)=>{const el=document.getElementById(id);if(el)el.value=v;};
const setChk=(id,v)=>{const el=document.getElementById(id);if(el)el.checked=!!v;};
setChk('setEffects',settings.effects);
setChk('setSounds',settings.sounds);
setChk('setMusic',settings.music);
setChk('setGames',settings.gamesEnabled);
setChk('setPleaseDont',settings.pleaseDont);
setVal('setSoundVol',settings.soundVolume);
setVal('setMusicVol',settings.musicVolume);
setVal('setBgIntensity',settings.bgIntensity);
const sl=document.getElementById('soundVolLabel');
const ml=document.getElementById('musicVolLabel');
const bil=document.getElementById('bgIntensityLabel');
if(sl)sl.textContent=settings.soundVolume+'%';
if(ml)ml.textContent=settings.musicVolume+'%';
if(bil)bil.textContent=settings.bgIntensity+'%';
const bgSlider=document.getElementById('setBgIntensity');
if(bgSlider)bgSlider.disabled=!settings.effects;
const sa=document.getElementById('setAccent');
const sb=document.getElementById('setBg');
if(sa)sa.value=settings.accent;
if(sb)sb.value=settings.bg;
syncColorChips();
}


let desktopLoaded=false,desktopMissing=false,desktopPromise=null;
function loadDesktop(){
if(desktopLoaded)return Promise.resolve(true);
if(desktopMissing)return Promise.resolve(false);
if(desktopPromise)return desktopPromise;
desktopPromise=new Promise(resolve=>{
let settled=false;
const css=document.createElement('link');
css.rel='stylesheet';
css.href=EXPANSION_BASE+'desktop-ui/desktop.css';
document.head.appendChild(css);
const js=document.createElement('script');
js.src=EXPANSION_BASE+'desktop-ui/desktop.js';
js.onload=()=>{
if(settled)return;settled=true;
const m=getOptionalModule('desktop');
if(m){desktopLoaded=true;resolve(true);}
else{desktopMissing=true;resolve(false);}
};
js.onerror=()=>{if(settled)return;settled=true;desktopMissing=true;resolve(false);};
document.head.appendChild(js);
setTimeout(()=>{
if(settled)return;settled=true;
const m=getOptionalModule('desktop');
if(m){desktopLoaded=true;resolve(true);}
else{desktopMissing=true;resolve(false);}
},4000);
});
return desktopPromise;
}
async function applyUIMode(){
document.body.classList.remove('desktop-ui');
if(settings.uiMode==='desktop'){
const ok=await loadDesktop();
if(ok){
document.body.classList.add('desktop-ui');
const m=getOptionalModule('desktop');
if(m&&typeof m.init==='function'){try{m.init();}catch(_){}}
}else{
toast(t('toast.uiFail','Desktop files missing'),true);
settings.uiMode='auto';saveSettings();
}
}else if(settings.uiMode==='auto'){
const shouldDesktop=window.innerWidth>=1024&&
window.matchMedia('(pointer: fine)').matches;
if(shouldDesktop&&!desktopMissing){
const ok=await loadDesktop();
if(ok){
document.body.classList.add('desktop-ui');
const m=getOptionalModule('desktop');
if(m&&typeof m.init==='function'){try{m.init();}catch(_){}}
}
}
}
}

function updateLogVisibility(){
const fab=document.getElementById('nibLogFab');
const panel=document.getElementById('nibLogPanel');
if(!fab)return;
if(settings.logMode==='visual')fab.style.display='flex';
else{fab.style.display='none';if(panel)panel.classList.remove('show');}
}

function buildToastLog(){
ensureToast();
const fab=h('button',{
class:'log-fab',id:'nibLogFab',type:'button',
title:'Log',
html:window.NibblyIcons?window.NibblyIcons.get('copy',{size:24}):''
});
fab.style.display='none';
fab.addEventListener('click',()=>{
const panel=document.getElementById('nibLogPanel');
if(!panel)return;
panel.classList.toggle('show');
if(panel.classList.contains('show'))renderLog();
});
document.body.appendChild(fab);
const panel=h('div',{class:'log-panel',id:'nibLogPanel'},[
h('div',{class:'log-head'},[
h('span',{class:'lt','data-i18n':'log.title',text:t('log.title','Log')}),
h('div',{},[
h('button',{
type:'button','data-i18n':'log.clear',text:t('log.clear','Clear'),
onclick:()=>{visualLogs=[];renderLog();}
}),
h('button',{type:'button',text:'✕',
onclick:()=>panel.classList.remove('show')})
])
]),
h('div',{class:'log-body',id:'nibLogBody'})
]);
document.body.appendChild(panel);
}


function sleep(ms){return new Promise(r=>setTimeout(r,ms));}
function bustUrl(path){
return path+(path.indexOf('?')!==-1?'&':'?')+'bust='+Date.now();
}

function loadScript(src,timeout){
timeout=timeout||15000;
return new Promise(resolve=>{
let settled=false;
const s=document.createElement('script');
s.src=src;s.async=true;
let timerId=null;
const done=ok=>{
if(settled)return;
settled=true;
clearTimeout(timerId);
resolve(ok);
};
s.onload=()=>done(true);
s.onerror=()=>done(false);
document.head.appendChild(s);
timerId=setTimeout(()=>done(false),timeout);
});
}

function loadCSS(href,timeout){
timeout=timeout||15000;
return new Promise(resolve=>{
let settled=false;
const l=document.createElement('link');
l.rel='stylesheet';l.href=href;
let timerId=null;
const done=ok=>{
if(settled)return;
settled=true;
clearTimeout(timerId);
resolve(ok);
};
l.onload=()=>done(true);
l.onerror=()=>done(false);
document.head.appendChild(l);
timerId=setTimeout(()=>done(false),timeout);
});
}

function deleteModule(path){
const filename=path.split('/').pop().split('?')[0].replace(/\.js$/,'');
if(window.NibblyModules)delete window.NibblyModules[filename];
const cap=filename.charAt(0).toUpperCase()+filename.slice(1);
['Nibbly'+cap,'Nibbly'+cap+'s',
'Nibbly'+cap+'Module','Nibbly'+cap+'Tab'
].forEach(n=>{if(window[n])delete window[n];});
if(window[cap])delete window[cap];
if(window[cap+'s'])delete window[cap+'s'];
}

function removeCssLink(path){
const target=path.split('?')[0].toLowerCase().replace(/^\.?\//,'');
document.querySelectorAll('link[rel="stylesheet"]').forEach(l=>{
const raw=(l.getAttribute('href')||'').toLowerCase();
if(raw.indexOf(target)!==-1)l.remove();
});
}

function verifyJs(path){
const filename=path.split('/').pop().split('?')[0].replace(/\.js$/,'');

if(path.indexOf('/langs/')!==-1){
if(filename==='strings'){
return!!(window.NibblyStrings&&Object.keys(window.NibblyStrings).length>10);
}
if(filename==='es'){
return!!((window.NibblyEs&&Object.keys(window.NibblyEs).length>10)||
(window.NibblyLangs&&window.NibblyLangs.es&&
Object.keys(window.NibblyLangs.es).length>10));
}
return false;
}

if(filename==='config'){
return!!(window.NibblyApp&&typeof window.NibblyApp.init==='function');
}

if(filename==='games-extras'){
const m=window.NibblyModules&&window.NibblyModules['games-extras'];
if(m&&typeof m.init==='function')return true;
const g=window.NibblyModules&&window.NibblyModules.games;
return!!(g&&typeof g.init==='function');
}

if(filename==='range'){
const r=window.NibblyRange||
(window.NibblyModules&&window.NibblyModules.range);
if(r&&typeof r.init==='function')return true;
}

if(filename==='logic-gates'){
const lg=window.NibblyModules&&window.NibblyModules['logic-gates'];
return!!(lg&&typeof lg.init==='function');
}

const m1=window.NibblyModules&&window.NibblyModules[filename];
if(m1&&typeof m1.init==='function')return true;

const cap=filename.charAt(0).toUpperCase()+filename.slice(1);
const candidates=[
'Nibbly'+cap,'Nibbly'+cap+'s',
'Nibbly'+cap+'Module','Nibbly'+cap+'Tab',
cap,cap+'s'
];
for(let i=0;i<candidates.length;i++){
const m=window[candidates[i]];
if(!m)continue;
if(typeof m.init==='function')return true;
if(typeof m==='function')return true;
if(typeof m.render==='function')return true;
}
return false;
}

function verifyCss(path){
const target=path.split('?')[0].toLowerCase().replace(/^\.?\//,'');
try{
for(let i=0;i<document.styleSheets.length;i++){
const s=document.styleSheets[i];
if(!s.href)continue;
if(s.href.toLowerCase().indexOf(target)!==-1){
try{if(s.cssRules&&s.cssRules.length>0)return true;}
catch(_){return true;}
}
}
}catch(_){}
return false;
}


function checkFile(path){
return new Promise(resolve=>{
if(path.endsWith('.css')){
let settled=false;
const link=document.createElement('link');
link.rel='stylesheet';
link.href=path+'?probe='+Date.now();
link.onload=()=>{if(settled)return;settled=true;link.remove();resolve(true);};
link.onerror=()=>{if(settled)return;settled=true;link.remove();resolve(false);};
document.head.appendChild(link);
setTimeout(()=>{if(settled)return;settled=true;if(link.parentNode)link.remove();resolve(false);},4000);
return;
}
if(/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(path)){
let settled=false;
const img=new Image();
const done=ok=>{if(settled)return;settled=true;img.onload=img.onerror=null;img.src='';resolve(ok);};
img.onload=()=>done(true);
img.onerror=()=>done(false);
img.src=path;
setTimeout(()=>done(false),4000);
return;
}
if(/\.(mp3|ogg|wav|m4a|aac)$/i.test(path)){
let settled=false;
const a=new Audio();
a.preload='metadata';
const done=ok=>{if(settled)return;settled=true;try{a.src='';}catch(_){}resolve(ok);};
a.onloadedmetadata=()=>done(true);
a.oncanplay=()=>done(true);
a.onerror=()=>done(false);
a.src=path;
setTimeout(()=>done(false),4000);
return;
}
try{
const xhr=new XMLHttpRequest();
xhr.open('GET',path,true);
xhr.onreadystatechange=()=>{
if(xhr.readyState===4){
if(xhr.status===200||xhr.status===206)resolve(true);
else if(xhr.status===0)resolve(!!(xhr.responseText&&xhr.responseText.length>0));
else resolve(false);
}
};
xhr.onerror=()=>resolve(false);
xhr.ontimeout=()=>resolve(false);
xhr.timeout=4000;
xhr.send();
}catch(_){resolve(false);}
});
}

function makeResultRow(cat,path,ok){
return h('div',{
class:'file-check-item '+(ok?'ok':'missing')
},[
h('span',{class:'file-check-icon',text:ok?'✅':'❌'}),
h('span',{class:'file-check-category',text:t(cat,cat.split('.').pop())}),
h('span',{class:'file-check-path',text:path})
]);
}

async function runFileCheck(){
const btn=document.getElementById('nibCheckFiles');
const results=document.getElementById('nibFileCheckResults');
if(!btn||!results)return;
btn.disabled=true;
const orig=btn.textContent;
btn.textContent=t('settings.checker.checking','Checking…');
results.innerHTML='<div class="file-check-empty">…</div>';

const rows=[];
for(const file of EXPANSION_FILES){
if(file.js)rows.push(makeResultRow(file.cat,file.js,await checkFile(file.js)));
if(file.css)rows.push(makeResultRow(file.cat,file.css,await checkFile(file.css)));
if(file.asset)rows.push(makeResultRow(file.cat,file.asset,await checkFile(file.asset)));
}
results.innerHTML='';
rows.forEach(r=>results.appendChild(r));
btn.disabled=false;
btn.textContent=orig;
}


async function reloadExpansionFiles(){
if(reloading)return;
reloading=true;
const btn=document.getElementById('nibReloadExpansion');
const results=document.getElementById('nibFileCheckResults');
const origText=btn?btn.textContent:'';

if(btn){
btn.disabled=true;
btn.innerHTML=
(window.NibblyIcons?window.NibblyIcons.get('sand-clock',{size:18}):'')+
' '+t('settings.reloadExpansion.reloading','Reloading…');
btn.classList.add('spinning');
}
if(results)results.innerHTML='';

let okCount=0,failCount=0;
const VERIFY_JS_MS=1000;
const VERIFY_CSS_MS=500;

for(const file of EXPANSION_FILES){
if(file.js){
try{
deleteModule(file.js);
const loaded=await loadScript(bustUrl(file.js),15000);
let ok=false;
if(loaded){
await sleep(VERIFY_JS_MS);
ok=verifyJs(file.js);
}
if(results)results.appendChild(makeResultRow(file.cat,file.js,ok));
ok?okCount++:failCount++;
}catch(err){
console.warn('[Nibbly] reload js error on',file.js,err);
if(results)results.appendChild(makeResultRow(file.cat,file.js,false));
failCount++;
}
}
if(file.css){
try{
removeCssLink(file.css);
const loaded=await loadCSS(bustUrl(file.css),15000);
let ok=false;
if(loaded){
await sleep(VERIFY_CSS_MS);
ok=verifyCss(file.css);
}
if(results)results.appendChild(makeResultRow(file.cat,file.css,ok));
ok?okCount++:failCount++;
}catch(err){
console.warn('[Nibbly] reload css error on',file.css,err);
if(results)results.appendChild(makeResultRow(file.cat,file.css,false));
failCount++;
}
}
if(file.asset){
try{
const ok=await checkFile(file.asset);
if(results)results.appendChild(makeResultRow(file.cat,file.asset,ok));
ok?okCount++:failCount++;
}catch(err){
console.warn('[Nibbly] reload asset error on',file.asset,err);
if(results)results.appendChild(makeResultRow(file.cat,file.asset,false));
failCount++;
}
}
}

OPTIONAL_TABS.forEach(tab=>{
delete initialized[tab.mod];
delete moduleInst[tab.mod];
delete lazyLoading[tab.id];
});
desktopLoaded=false;desktopMissing=false;desktopPromise=null;

const currentOpt=OPTIONAL_TABS.find(t=>t.id===currentTab);
if(currentOpt){
const panel=document.getElementById(currentOpt.panel);
if(panel)panel.innerHTML='';
lazyLoadOptional(currentOpt);
}

if(btn){
btn.disabled=false;
btn.classList.remove('spinning');
btn.innerHTML=
(window.NibblyIcons?window.NibblyIcons.get('reload',{size:18}):'')+
' '+t('settings.reloadExpansion','Reload Expansion Files');
}
reloading=false;

const toastKey=failCount===0?'toast.expansionReloaded':'toast.expansionFailed';
const fallback=failCount===0
?'✓ Expansion files reloaded'
:'⚠ Some files failed ('+failCount+')';
toast(t(toastKey,fallback),failCount>0);
logCalc('reload-expansion: '+okCount+' ok, '+failCount+' failed');
}


async function clearNibblyCache(){
try{
let cleared=0;
if('caches'in window){
const keys=await caches.keys();
const targets=keys.filter(k=>k.startsWith('nibbly'));
await Promise.all(targets.map(k=>caches.delete(k)));
cleared+=targets.length;
}
if('serviceWorker'in navigator){
const regs=await navigator.serviceWorker.getRegistrations();
await Promise.all(regs.map(r=>r.unregister()));
}
console.info('[Nibbly] Cache cleared:',cleared,'caches + SW unregistered');
toast(t('toast.cacheCleared','✓ Cache cleared — reloading'));
setTimeout(()=>{try{location.reload();}catch(_){}},800);
}catch(err){
console.error('[Nibbly] clearNibblyCache failed:',err);
toast('Failed: '+(err.message||err),true);
}
}


function openExternal(url){
if(!url)return;
try{
if(window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.Browser){
window.Capacitor.Plugins.Browser.open({url});return;
}
}catch(_){}
const isAndroid=/Android/i.test(navigator.userAgent);
const isWebView=/; wv\)/.test(navigator.userAgent);
if(isAndroid&&isWebView){
try{
const isHttps=url.indexOf('https://')===0;
const clean=url.replace(/^https?:\/\//,'');
const scheme=isHttps?'https':'http';
window.location.href='intent://'+clean+'#Intent;scheme='+scheme+';end';
return;
}catch(_){}
}
try{
const w=window.open(url,'_blank','noopener,noreferrer');
if(!w){
const a=document.createElement('a');
a.href=url;a.target='_blank';a.rel='noopener noreferrer';
document.body.appendChild(a);a.click();
setTimeout(()=>a.remove(),1000);
}
}catch(_){window.location.href=url;}
}


function init(containerEl,ctx){
if(destroyed)return null;
appContainer=containerEl;
ctxRef=ctx||null;

loadSettings();

if(ctx&&ctx.hasSpanish&&settings.lang==='es'){}
else if(!ctx||!ctx.hasSpanish)settings.lang='en';

if(ctx&&typeof ctx.setLanguage==='function'){
ctx.setLanguage(settings.lang);
}

const shell=buildShell();
appContainer.appendChild(shell);

buildSheet();
bindSheet();
buildToastLog();

applyTheme();
applyI18n();

initCoreModules();

initPrivacyFab();

const music=moduleInst.music;
if(music){
if(typeof music.setVolume==='function')music.setVolume(settings.musicVolume);
if(settings.music&&typeof music.setEnabled==='function'){
music.setEnabled(true);
if(typeof music.fadeIn==='function')music.fadeIn(1500);
}
}

applyUIMode();
updateConsoleTabVisibility();

document.addEventListener('click',e=>{
const link=e.target.closest('.github-link');
if(!link)return;
e.preventDefault();e.stopPropagation();
const href=link.getAttribute('href');
if(href)openExternal(href);
},true);

document.querySelectorAll('#langSeg .seg-btn').forEach(b=>{
b.classList.toggle('active',b.dataset.value===settings.lang);
if(b.dataset.value==='es'&&(!ctx||!ctx.hasSpanish)){
b.disabled=true;
b.style.opacity='0.35';
b.style.cursor='not-allowed';
}
});

updateLogVisibility();

document.addEventListener('visibilitychange',()=>{
const g=window.NibblyGames;
if(!g)return;
if(document.hidden){
if(typeof g.pauseActive==='function'){
try{g.pauseActive();}catch(_){}
}
}
});

const api={
getSettings:()=>Object.assign({},settings),
setSettings:(patch)=>{
Object.assign(settings,patch||{});
saveSettings();applyTheme();syncSettingsUI();applyI18n();
updateConsoleTabVisibility();
},
toast,log:logCalc,playClick,
switchTab,openSheet,closeSheet,
refreshModules,reloadExpansionFiles,clearNibblyCache,
updateConsoleTabVisibility,
destroy
};
window.NibblyApp=Object.assign(window.NibblyApp||{},api);
return api;
}

function destroy(){
destroyed=true;
Object.keys(moduleInst).forEach(k=>{
const inst=moduleInst[k];
if(typeof inst==='function'){try{inst();}catch(_){}}
else if(inst&&typeof inst.destroy==='function'){try{inst.destroy();}catch(_){}}
});
moduleInst={};
if(rootApp&&rootApp.parentNode)rootApp.parentNode.removeChild(rootApp);
['nibSheet','nibSheetOverlay','nibToast','nibLogFab','nibLogPanel'].forEach(id=>{
const el=document.getElementById(id);
if(el&&el.parentNode)el.parentNode.removeChild(el);
});
}


window.NibblyModules=window.NibblyModules||{};
window.NibblyModules.config={id:'config',version:'2.0.31',init};
window.NibblyApp=window.NibblyApp||{};
window.NibblyApp.init=init;

if(console&&console.debug){
console.debug('[Nibbly] config.js loaded → window.NibblyApp.init ready (v2.0.31)');
}
})();