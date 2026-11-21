(function(){
'use strict';
if(window.NibblyModules&&window.NibblyModules['cube-run'])return;

const I18N={
es:{
'tab.cuberun':'Cube Run',
'cuberun.score':'Puntos',
'cuberun.best':'Récord',
'cuberun.jumps':'Saltos',
'cuberun.coins':'Monedas',
'cuberun.start':'Comenzar',
'cuberun.restart':'Reiniciar',
'cuberun.menu':'Menú',
'cuberun.pause':'Pausa',
'cuberun.resume':'Reanudar',
'cuberun.gameover':'Game Over',
'cuberun.paused':'Pausado',
'cuberun.hint':'Espacio / ↑ para saltar · ↓ baja · P pausa',
'cuberun.newRecord':'¡Nuevo récord!',
'cuberun.jumpBtn':'Saltar',
'cuberun.fastFallBtn':'Bajar',
'cuberun.shop':'Tienda',
'cuberun.shopTitle':'Tienda de Skins',
'cuberun.shopClose':'Cerrar',
'cuberun.shopBuy':'Comprar',
'cuberun.shopEquip':'Equipar',
'cuberun.shopEquipped':'Equipada',
'cuberun.shopBought':'Comprada',
'cuberun.shopNotEnough':'Faltan monedas',
'cuberun.shopOwned':'Ya tienes esta skin',
'cuberun.skinEyes':'Ojos',
'cuberun.skinHappy':':)',
'cuberun.skinMeh':'-_-',
'cuberun.skinWow':':0',
'cuberun.skinAngry':'>:(',
'cuberun.skinGrin':':D',
'cuberun.resuming':'Reanudando en {0}…',
'cuberun.difficulty':'Dificultad',
'cuberun.diff.easy':'Fácil',
'cuberun.diff.normal':'Normal',
'cuberun.diff.hard':'Difícil',
'cuberun.clearData':'Borrar Datos',
'cuberun.clearDataConfirm':'¿Borrar récords, monedas y skins?',
'cuberun.musicPrompt':'¿Activar la música en Cube Run?',
'cuberun.audioMissing':'Audio Cubic Nibbly.ogg no disponible'
},
en:{
'tab.cuberun':'Cube Run',
'cuberun.score':'Score',
'cuberun.best':'Best',
'cuberun.jumps':'Jumps',
'cuberun.coins':'Coins',
'cuberun.start':'Start',
'cuberun.restart':'Restart',
'cuberun.menu':'Menu',
'cuberun.pause':'Pause',
'cuberun.resume':'Resume',
'cuberun.gameover':'Game Over',
'cuberun.paused':'Paused',
'cuberun.hint':'Space / ↑ to jump · ↓ fast fall · P pause',
'cuberun.newRecord':'New record!',
'cuberun.jumpBtn':'Jump',
'cuberun.fastFallBtn':'Fall',
'cuberun.shop':'Shop',
'cuberun.shopTitle':'Skin Shop',
'cuberun.shopClose':'Close',
'cuberun.shopBuy':'Buy',
'cuberun.shopEquip':'Equip',
'cuberun.shopEquipped':'Equipped',
'cuberun.shopBought':'Owned',
'cuberun.shopNotEnough':'Not enough coins',
'cuberun.shopOwned':'You already own this skin',
'cuberun.skinEyes':'Eyes',
'cuberun.skinHappy':':)',
'cuberun.skinMeh':'-_-',
'cuberun.skinWow':':0',
'cuberun.skinAngry':'>:(',
'cuberun.skinGrin':':D',
'cuberun.resuming':'Resuming in {0}…',
'cuberun.difficulty':'Difficulty',
'cuberun.diff.easy':'Easy',
'cuberun.diff.normal':'Normal',
'cuberun.diff.hard':'Hard',
'cuberun.clearData':'Clear Data',
'cuberun.clearDataConfirm':'Delete records, coins and skins?',
'cuberun.musicPrompt':'Activate music in Cube Run?',
'cuberun.audioMissing':'Audio Cubic Nibbly.ogg not available'
}
};

function getLang(){
try{
const raw=localStorage.getItem('nibbly-settings-v2');
if(raw){
const s=JSON.parse(raw);
if(s&&s.lang==='en')return'en';
}
}catch(e){}
return'es';
}
function t(key){
const lang=getLang();
let s=(I18N[lang]&&I18N[lang][key])||I18N.es[key]||key;
for(let i=1;i<arguments.length;i++){
s=s.replace('{'+(i-1)+'}',arguments[i]);
}
return s;
}
function el(tag,attrs,children){
const node=document.createElement(tag);
if(attrs)for(const k in attrs){
if(k==='class')node.className=attrs[k];
else if(k==='text')node.textContent=attrs[k];
else if(k==='html')node.innerHTML=attrs[k];
else if(k==='style'&&typeof attrs[k]==='object'){
for(const sk in attrs[k])node.style[sk]=attrs[k][sk];
}else if(k.startsWith('data-')||k.startsWith('aria-'))node.setAttribute(k,attrs[k]);
else node[k]=attrs[k];
}
if(children){
if(Array.isArray(children))children.forEach(c=>c&&node.appendChild(c));
else if(typeof children==='string')node.textContent=children;
else node.appendChild(children);
}
return node;
}
function clearNode(n){while(n.firstChild)n.removeChild(n.firstChild);}
function icon(name,size,fallback){
if(window.NibblyIcons){
const html=window.NibblyIcons.get(name,{size:size||18});
if(html)return html;
}
return fallback||'';
}
function noEffects(){
return document.body&&document.body.classList.contains('no-effects');
}

let _audioCtx=null;
let _audioUnlocked=false;
function unlockAudio(){
if(_audioUnlocked)return;
try{
if(!_audioCtx){
const AC=window.AudioContext||window.webkitAudioContext;
if(!AC)return;
_audioCtx=new AC();
}
if(_audioCtx.state==='suspended')_audioCtx.resume().catch(()=>{});
_audioUnlocked=true;
}catch(_){}
}
if(typeof document!=='undefined'&&!window.__cubeRunAudioHooked){
window.__cubeRunAudioHooked=true;
const u=()=>{
unlockAudio();
document.removeEventListener('pointerdown',u,true);
document.removeEventListener('keydown',u,true);
document.removeEventListener('touchstart',u,true);
};
document.addEventListener('pointerdown',u,true);
document.addEventListener('keydown',u,true);
document.addEventListener('touchstart',u,true);
}
function beep(freq,dur,vol,type){
try{
unlockAudio();
if(!_audioCtx)return;
const s=JSON.parse(localStorage.getItem('nibbly-settings-v2')||'{}');
if(!s.sounds)return;
const v=Number(s.soundVolume);
if(!isFinite(v)||v<=0)return;
const ctx=_audioCtx;
const fire=()=>{
try{
const now=ctx.currentTime;
const osc=ctx.createOscillator();
const gain=ctx.createGain();
osc.type=type||'square';
osc.frequency.setValueAtTime(freq,now);
gain.gain.setValueAtTime(0.0001,now);
gain.gain.exponentialRampToValueAtTime((vol||0.05)*(v/100),now+0.005);
gain.gain.exponentialRampToValueAtTime(0.0001,now+dur);
osc.connect(gain);gain.connect(ctx.destination);
osc.start(now);osc.stop(now+dur+0.02);
}catch(_){}
};
if(ctx.state==='suspended')ctx.resume().then(fire).catch(()=>{});
else fire();
}catch(_){}
}

let cubeRunMusic=null;
let cubeRunAudioAvailable=true;
const MUSIC_PREF_KEY='nibbly-cuberun-music-active';
const MUSIC_CONF_KEY='nibbly-cuberun-music-prompted';

function getMusicVolume(){
try{
const s=JSON.parse(localStorage.getItem('nibbly-settings-v2')||'{}');
if(s.music===false)return 0;
const v=Number(s.musicVolume);
if(!isFinite(v)||v<=0)return 0.5;
return v/100;
}catch(_){return 0.5;}
}

function getStoredMusicState(){
return localStorage.getItem(MUSIC_PREF_KEY)==='true';
}

function setStoredMusicState(active){
localStorage.setItem(MUSIC_PREF_KEY,active?'true':'false');
}

function checkCubeRunAudioFile(callback){
const testAudio=new Audio('mus/Cubic Nibbly.ogg');
testAudio.oncanplaythrough=()=>{cubeRunAudioAvailable=true;if(callback)callback(true);};
testAudio.onerror=()=>{cubeRunAudioAvailable=false;if(callback)callback(false);};
testAudio.load();
}

function fadeAudioVolume(audioEl,targetVol,durationMs,onDone){
if(!audioEl){
if(onDone)onDone();
return;
}
const startVol=typeof audioEl.volume==='number'?audioEl.volume:0.5;
const steps=15;
const stepTime=Math.max(10,durationMs/steps);
let currentStep=0;
const interval=setInterval(()=>{
currentStep++;
const progress=currentStep/steps;
try{
audioEl.volume=Math.max(0,Math.min(1,startVol+(targetVol-startVol)*progress));
}catch(_){}
if(currentStep>=steps){
clearInterval(interval);
try{audioEl.volume=targetVol;}catch(_){}
if(onDone)onDone();
}
},stepTime);
}

function fadeMusicModuleVolume(mod,targetVolNum,durationMs,onDone){
let currentVol=100;
try{
const s=JSON.parse(localStorage.getItem('nibbly-settings-v2')||'{}');
currentVol=s.musicVolume!==undefined?s.musicVolume:100;
}catch(_){}

const steps=15;
const stepTime=Math.max(10,durationMs/steps);
let stepCount=0;
const interval=setInterval(()=>{
stepCount++;
const progress=stepCount/steps;
const v=Math.round(currentVol+(targetVolNum-currentVol)*progress);
try{mod.setVolume(v);}catch(_){}
if(stepCount>=steps){
clearInterval(interval);
try{mod.setVolume(targetVolNum);}catch(_){}
if(onDone)onDone();
}
},stepTime);
}

function playCubeRunMusic(){
if(!cubeRunAudioAvailable)return;
if(!cubeRunMusic){
cubeRunMusic=new Audio('mus/Cubic Nibbly.ogg');
cubeRunMusic.loop=true;
}
cubeRunMusic.volume=getMusicVolume();
cubeRunMusic.play().catch(()=>{});


const s=JSON.parse(localStorage.getItem('nibbly-settings-v2')||'{}');
if(s.music!==false){
const musicMod=window.NibblyModules&&window.NibblyModules.music;
if(musicMod&&typeof musicMod.setVolume==='function'){
fadeMusicModuleVolume(musicMod,0,400);
}else{
const mainAudio=document.querySelector('audio[src*="You Are Nibbled.ogg"]')||document.querySelector('audio');
if(mainAudio){
fadeAudioVolume(mainAudio,0,400);
}
}
}
}

function stopCubeRunMusic(){
if(cubeRunMusic){
fadeAudioVolume(cubeRunMusic,0,300,()=>{
try{
cubeRunMusic.pause();
cubeRunMusic.currentTime=0;
}catch(_){}
});
}


const s=JSON.parse(localStorage.getItem('nibbly-settings-v2')||'{}');
if(s.music!==false){
const targetVol=s.musicVolume!==undefined?s.musicVolume:100;
const musicMod=window.NibblyModules&&window.NibblyModules.music;
if(musicMod&&typeof musicMod.setVolume==='function'){
if(typeof musicMod.setEnabled==='function')musicMod.setEnabled(true);
fadeMusicModuleVolume(musicMod,targetVol,400);
}else{
const mainAudio=document.querySelector('audio[src*="You Are Nibbled.ogg"]')||document.querySelector('audio');
if(mainAudio){
try{
mainAudio.play().catch(()=>{});
}catch(_){}
fadeAudioVolume(mainAudio,targetVol/100,400);
}
}
}
}

const BEST_KEY='nibbly-cuberun-best';
const COINS_KEY='nibbly-cuberun-coins';
const SKINS_KEY='nibbly-cuberun-skins';
const SKIN_ACTIVE_KEY='nibbly-cuberun-skin-active';

const SKINS=[
{id:'eyes',nameKey:'cuberun.skinEyes',price:0,
draw:(ctx,size,accent)=>{
const e=size*0.14;
const off=size*0.24;
ctx.fillStyle='rgba(0,0,0,0.55)';
ctx.beginPath();
ctx.arc(-off,-off*0.4,e,0,Math.PI*2);
ctx.arc(off,-off*0.4,e,0,Math.PI*2);
ctx.fill();
}},
{id:'happy',nameKey:'cuberun.skinHappy',price:100,
draw:(ctx,size,accent)=>{
const e=size*0.13;
const off=size*0.22;
ctx.strokeStyle='rgba(0,0,0,0.7)';
ctx.lineWidth=size*0.06;
ctx.lineCap='round';
ctx.beginPath();
ctx.moveTo(-off-e,-off*0.4+e*0.4);
ctx.lineTo(-off,-off*0.4-e*0.6);
ctx.lineTo(-off+e,-off*0.4+e*0.4);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(off-e,-off*0.4+e*0.4);
ctx.lineTo(off,-off*0.4-e*0.6);
ctx.lineTo(off+e,-off*0.4+e*0.4);
ctx.stroke();
ctx.beginPath();
ctx.arc(0,size*0.18,size*0.18,0.15*Math.PI,0.85*Math.PI,false);
ctx.stroke();
}},
{id:'meh',nameKey:'cuberun.skinMeh',price:100,
draw:(ctx,size,accent)=>{
const e=size*0.13;
const off=size*0.22;
ctx.strokeStyle='rgba(0,0,0,0.7)';
ctx.lineWidth=size*0.06;
ctx.lineCap='round';
ctx.beginPath();
ctx.moveTo(-off-e,-off*0.4);
ctx.lineTo(-off+e,-off*0.4);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(off-e,-off*0.4);
ctx.lineTo(off+e,-off*0.4);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(-size*0.15,size*0.2);
ctx.lineTo(size*0.15,size*0.2);
ctx.stroke();
}},
{id:'wow',nameKey:'cuberun.skinWow',price:100,
draw:(ctx,size,accent)=>{
const e=size*0.16;
const off=size*0.22;
ctx.strokeStyle='rgba(0,0,0,0.7)';
ctx.lineWidth=size*0.055;
ctx.lineCap='round';
ctx.beginPath();
ctx.arc(-off,-off*0.4,e,0,Math.PI*2);
ctx.stroke();
ctx.beginPath();
ctx.arc(off,-off*0.4,e,0,Math.PI*2);
ctx.stroke();
ctx.beginPath();
ctx.arc(0,size*0.22,size*0.13,0,Math.PI*2);
ctx.stroke();
}},
{id:'angry',nameKey:'cuberun.skinAngry',price:100,
draw:(ctx,size,accent)=>{
const e=size*0.13;
const off=size*0.22;
ctx.strokeStyle='rgba(0,0,0,0.7)';
ctx.lineWidth=size*0.06;
ctx.lineCap='round';
ctx.beginPath();
ctx.moveTo(-off-e*1.3,-off*0.7-e*0.3);
ctx.lineTo(-off+e*0.3,-off*0.4);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(off+e*1.3,-off*0.7-e*0.3);
ctx.lineTo(off-e*0.3,-off*0.4);
ctx.stroke();
ctx.fillStyle='rgba(0,0,0,0.7)';
ctx.beginPath();
ctx.arc(-off,-off*0.1,e*0.7,0,Math.PI*2);
ctx.arc(off,-off*0.1,e*0.7,0,Math.PI*2);
ctx.fill();
ctx.beginPath();
ctx.moveTo(-size*0.16,size*0.22);
ctx.lineTo(size*0.16,size*0.22);
ctx.stroke();
}},
{id:'grin',nameKey:'cuberun.skinGrin',price:100,
draw:(ctx,size,accent)=>{
const e=size*0.13;
const off=size*0.22;
ctx.fillStyle='rgba(0,0,0,0.7)';
ctx.beginPath();
ctx.arc(-off,-off*0.4,e,0,Math.PI*2);
ctx.arc(off,-off*0.4,e,0,Math.PI*2);
ctx.fill();
ctx.strokeStyle='rgba(0,0,0,0.7)';
ctx.lineWidth=size*0.06;
ctx.lineCap='round';
ctx.beginPath();
ctx.moveTo(-size*0.22,size*0.1);
ctx.quadraticCurveTo(0,size*0.38,size*0.22,size*0.1);
ctx.stroke();
}}
];

const CFG={
W:800,
H:600,
GROUND_Y:480,
CUBE_SIZE:42,
CUBE_X:100,
GRAVITY:2200,
JUMP_V:-980,
FAST_FALL_V:1400,
SPEED_START:320,
SPEED_MAX:700,
SPEED_GROWTH:0.15,
OBSTACLE_W_MIN:26,
OBSTACLE_W_MAX:42,
OBSTACLE_H_MIN:38,
OBSTACLE_H_MAX:64,
SCORE_PER_PX:0.05,
MIN_GAP_TIME:0.65,
MAX_GAP_TIME:1.8,
COIN_SIZE:20,
COIN_GROUP_MAX:3,
COIN_SPACING:32,
SPAWN_OFFSET:300
};

const DIFFICULTY={
easy:{spikes:1,label:'cuberun.diff.easy'},
normal:{spikes:2,label:'cuberun.diff.normal'},
hard:{spikes:3,label:'cuberun.diff.hard'}
};

const CUBE_HITBOX_FRACTION=0.34;
const SPIKE_HITBOX_W_FRACTION=0.40;
const SPIKE_HITBOX_H_FRACTION=0.60;

const CubeRun={
canvas:null,ctx:null,
W:CFG.W,H:CFG.H,
dpr:1,

score:0,
best:0,
jumps:0,
coins:0,
speed:CFG.SPEED_START,
distance:0,
state:'menu',
difficulty:'easy',
alive:false,
paused:false,
tabPaused:false,

cube:{
x:CFG.CUBE_X,
y:CFG.GROUND_Y-CFG.CUBE_SIZE,
vy:0,
size:CFG.CUBE_SIZE,
onGround:true,
rotation:0,
spinVelocity:0
},
obstacles:[],
coinsOnMap:[],
reservedSpaces:[],
nextSpawnIn:0,
nextCoinGroupIn:0,
groundOffset:0,
particles:[],

scoreEl:null,
bestEl:null,
jumpsEl:null,
coinsEl:null,
overlayEl:null,
overlayTitleEl:null,
overlaySubEl:null,
pauseBtnEl:null,
playAgainBtn:null,
startBtn:null,
menuBtn:null,
clearBtn:null,
shopBtn:null,
musicBtn:null,
shopEl:null,
canvasWrap:null,
jumpBtnEl:null,
fallBtnEl:null,
diffSegEl:null,

_raf:null,
_lastT:0,
_accumulator:0,
_STEP:1/60,
_debugHitboxes:false,
_countdownValue:0,
_countdownTimer:null,

_ownedSkins:['eyes'],
_activeSkin:'eyes',

_keyHandler:null,
_touchHandler:null,
_resizeHandler:null,

init(stage){
clearNode(stage);
this.best=this._loadBest();
this.coins=this._loadCoins();
this._ownedSkins=this._loadSkins();
this._activeSkin=this._loadActiveSkin();
this.score=0;this.jumps=0;
this.speed=CFG.SPEED_START;
this.distance=0;
this.obstacles=[];
this.coinsOnMap=[];
this.reservedSpaces=[];
this.particles=[];
this.nextSpawnIn=1200;
this.nextCoinGroupIn=1500;
this.groundOffset=0;
this._accumulator=0;

checkCubeRunAudioFile(()=>{
this._updateMusicButtonUI();
});

const wrap=el('div',{class:'ng-cuberun'});

const header=el('div',{class:'ng-game-header',style:'width:100%;display:flex;justify-content:space-between;align-items:center;gap:4px;box-sizing:border-box;'});
const statsWrap=el('div',{style:'display:flex;gap:3px;flex-wrap:nowrap;flex:1;min-width:0;'});

const mkStat=(label,initial)=>{
const box=el('div',{class:'ng-score-box',style:'padding:3px 4px;flex:1;min-width:0;text-align:center;overflow:hidden;'});
box.appendChild(el('div',{class:'ng-score-label',text:label,style:'font-size:7px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'}));
const v=el('div',{class:'ng-score-value',text:initial,style:'font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'});
box.appendChild(v);
return{box,v};
};
const scoreStat=mkStat(t('cuberun.score'),'0');
const bestStat=mkStat(t('cuberun.best'),String(this.best));
const jumpsStat=mkStat(t('cuberun.jumps'),'0');
const coinsStat=mkStat(t('cuberun.coins'),String(this.coins));
this.scoreEl=scoreStat.v;
this.bestEl=bestStat.v;
this.jumpsEl=jumpsStat.v;
this.coinsEl=coinsStat.v;
statsWrap.appendChild(scoreStat.box);
statsWrap.appendChild(bestStat.box);
statsWrap.appendChild(jumpsStat.box);
statsWrap.appendChild(coinsStat.box);
header.appendChild(statsWrap);

const headerBtns=el('div',{style:'display:flex;gap:4px;flex-shrink:0;align-items:center;'});

const musicBtn=el('button',{
class:'ng-btn',
style:'width:30px;height:30px;padding:0;border-radius:50%;display:flex;align-items:center;justify-content:center;',
html:icon('music',13,'🎵'),
title:'Música'
});
this.musicBtn=musicBtn;
headerBtns.appendChild(musicBtn);

const shopBtn=el('button',{
class:'ng-btn',
style:'width:30px;height:30px;padding:0;border-radius:50%;display:flex;align-items:center;justify-content:center;',
html:icon('gift',13,'🛍️'),
title:t('cuberun.shop')
});
this.shopBtn=shopBtn;
headerBtns.appendChild(shopBtn);

const pauseBtn=el('button',{
class:'ng-btn',
style:'width:30px;height:30px;padding:0;border-radius:50%;display:flex;align-items:center;justify-content:center;',
html:icon('pause',13,'⏸')
});
this.pauseBtnEl=pauseBtn;
headerBtns.appendChild(pauseBtn);

header.appendChild(headerBtns);
wrap.appendChild(header);

this.canvasWrap=el('div',{class:'ng-cuberun-canvas-wrap'});
const canvas=document.createElement('canvas');
canvas.className='ng-cuberun-canvas';
canvas.tabIndex=0;
this.canvas=canvas;
this.ctx=canvas.getContext('2d');
this.canvasWrap.appendChild(canvas);
wrap.appendChild(this.canvasWrap);

const overlay=el('div',{class:'ng-overlay',style:'border-radius: 14px;'});
const content=el('div',{class:'ng-overlay-content',style:'padding: 16px 20px; width: 90%; max-height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;'});
this.overlayTitleEl=el('h3',{class:'ng-overlay-title',style:'font-size: 18px; margin: 0 0 8px 0;',text:t('tab.cuberun')});

const diffSeg=el('div',{class:'ng-snake-diff',style:'margin: 0 auto 10px; width: 100%; max-width: 220px; padding: 3px;'});
['easy','normal','hard'].forEach(id=>{
diffSeg.appendChild(el('button',{
class:'ng-snake-diff-btn'+(id===this.difficulty?' active':''),
type:'button',
'data-diff':id,
text:t(DIFFICULTY[id].label)
}));
});
this.diffSegEl=diffSeg;

this.overlaySubEl=el('p',{class:'ng-overlay-sub',style:'font-size: 11px; margin: 0 0 10px 0; line-height: 1.4;',text:t('cuberun.hint')});

const actions=el('div',{class:'ng-cuberun-overlay-actions',style:'gap: 6px; width: 100%; justify-content: center; margin-top: 0;'});
this.startBtn=el('button',{class:'ng-btn ng-btn-primary',style:'padding: 8px 16px; font-size: 13px;',text:t('cuberun.start')});
this.playAgainBtn=el('button',{class:'ng-btn ng-btn-primary',style:'padding: 8px 16px; font-size: 13px;',text:t('cuberun.restart')});
this.menuBtn=el('button',{class:'ng-btn',style:'padding: 8px 16px; font-size: 13px;',text:t('cuberun.menu')});

this.clearBtn=el('button',{
class:'ng-btn',
style:'padding: 8px 16px; font-size: 13px; color: var(--bad, #ff6b7a); border-color: color-mix(in srgb, var(--bad, #ff6b7a) 40%, transparent);',
html:icon('trash',14,'🗑️'),
title:t('cuberun.clearData')
});

this.playAgainBtn.style.display='none';
this.menuBtn.style.display='none';
this.clearBtn.style.display='';

actions.appendChild(this.startBtn);
actions.appendChild(this.playAgainBtn);
actions.appendChild(this.menuBtn);
actions.appendChild(this.clearBtn);

content.appendChild(this.overlayTitleEl);
content.appendChild(diffSeg);
content.appendChild(this.overlaySubEl);
content.appendChild(actions);
overlay.appendChild(content);
this.canvasWrap.appendChild(overlay);
this.overlayEl=overlay;

const touchPad=el('div',{class:'ng-cuberun-touchpad'});
const jumpBtn=el('button',{
class:'ng-cuberun-touch-btn ng-cuberun-touch-jump',
type:'button',
html:icon('arrow-up',22,'↑')
});
this.jumpBtnEl=jumpBtn;
const fallBtn=el('button',{
class:'ng-cuberun-touch-btn ng-cuberun-touch-fall',
type:'button',
html:icon('arrow-down',22,'↓')
});
this.fallBtnEl=fallBtn;
touchPad.appendChild(fallBtn);
touchPad.appendChild(jumpBtn);
wrap.appendChild(touchPad);

wrap.appendChild(el('div',{class:'ng-hint',text:t('cuberun.hint')}));
stage.appendChild(wrap);

this._updateMusicButtonUI();

this.startBtn.addEventListener('click',()=>this.newGame());

this.playAgainBtn.addEventListener('click',()=>{
if(this.pauseBtnEl)this.pauseBtnEl.innerHTML=icon('pause',16,'⏸');
this.newGame();
});

this.menuBtn.addEventListener('click',()=>{
if(this.pauseBtnEl)this.pauseBtnEl.innerHTML=icon('pause',16,'⏸');
this._showMenu();
});

this.clearBtn.addEventListener('click',()=>{
if(confirm(t('cuberun.clearDataConfirm'))){
localStorage.removeItem(BEST_KEY);
localStorage.removeItem(COINS_KEY);
localStorage.removeItem(SKINS_KEY);
localStorage.removeItem(SKIN_ACTIVE_KEY);
this.best=0;
this.coins=0;
this._ownedSkins=['eyes'];
this._activeSkin='eyes';
this._updateHUD();
this._draw();
}
});

musicBtn.addEventListener('click',()=>{
this.toggleMusicWithPrompt();
});

diffSeg.addEventListener('click',e=>{
const b=e.target.closest('.ng-snake-diff-btn');
if(!b)return;
this.difficulty=b.dataset.diff;
diffSeg.querySelectorAll('.ng-snake-diff-btn').forEach(x=>{
x.classList.toggle('active',x===b);
});
});

pauseBtn.addEventListener('click',()=>{
if(this.state!=='menu'&&this.state!=='over'){
this.togglePause();
}
});

shopBtn.addEventListener('click',()=>{
if(this.state==='menu'||this.state==='over'){
this.openShop();
}
});

jumpBtn.addEventListener('pointerdown',(e)=>{
e.preventDefault();
if(this.state==='playing'&&this.alive&&!this.paused&&!this.tabPaused){
this.jump();
}else if(this.state==='menu'){
this.newGame();
}
});
fallBtn.addEventListener('pointerdown',(e)=>{
e.preventDefault();
if(this.state==='playing')this.fastFall();
});

this._bindControls();
this._bindResize();
this._setupCanvas();
this._showMenu();

requestAnimationFrame(()=>{
this._setupCanvas();
this._draw();
});
},

setMusicVolume(vol){
if(cubeRunMusic){
cubeRunMusic.volume=Number(vol)/100;
}
},

_updateMusicButtonUI(){
if(!this.musicBtn)return;
if(!cubeRunAudioAvailable){
this.musicBtn.style.opacity='1';
this.musicBtn.style.borderColor='var(--bad, #ff4d5e)';
this.musicBtn.style.background='color-mix(in srgb, var(--bad, #ff4d5e) 25%, transparent)';
this.musicBtn.title=t('cuberun.audioMissing');
return;
}
const active=getStoredMusicState();
if(active){
this.musicBtn.style.opacity='1';
this.musicBtn.style.borderColor='var(--accent-base, #5b8cff)';
this.musicBtn.style.background='color-mix(in srgb, var(--accent-base, #5b8cff) 20%, transparent)';
}else{
this.musicBtn.style.opacity='0.45';
this.musicBtn.style.borderColor='';
this.musicBtn.style.background='';
}
},

toggleMusicWithPrompt(){
if(!cubeRunAudioAvailable){
alert(t('cuberun.audioMissing'));
return;
}
const prompted=localStorage.getItem(MUSIC_CONF_KEY);
const currentActive=getStoredMusicState();

if(!prompted){
const ok=confirm(t('cuberun.musicPrompt'));
localStorage.setItem(MUSIC_CONF_KEY,'true');
if(!ok)return;
setStoredMusicState(true);
}else{
setStoredMusicState(!currentActive);
}

this._updateMusicButtonUI();
const active=getStoredMusicState();

if(active&&(this.state==='playing'||this.state==='countdown')){
playCubeRunMusic();
}else{
stopCubeRunMusic();
}
},

_setupCanvas(){
if(!this.canvas)return;
const dpr=window.devicePixelRatio||1;
this.dpr=dpr;
this.W=CFG.W;
this.H=CFG.H;
this.canvas.width=Math.round(this.W*dpr);
this.canvas.height=Math.round(this.H*dpr);
this.ctx.setTransform(dpr,0,0,dpr,0,0);
},

_loadBest(){
try{
const v=parseInt(localStorage.getItem(BEST_KEY)||'0',10);
return isFinite(v)&&v>0?v:0;
}catch(_){return 0;}
},
_saveBest(){
try{localStorage.setItem(BEST_KEY,String(this.best));}catch(_){}
},
_loadCoins(){
try{
const v=parseInt(localStorage.getItem(COINS_KEY)||'0',10);
return isFinite(v)&&v>=0?v:0;
}catch(_){return 0;}
},
_saveCoins(){
try{localStorage.setItem(COINS_KEY,String(this.coins));}catch(_){}
},
_loadSkins(){
try{
const raw=localStorage.getItem(SKINS_KEY);
if(!raw)return['eyes'];
const arr=JSON.parse(raw);
if(!Array.isArray(arr)||arr.indexOf('eyes')<0)return['eyes'];
return arr.filter(id=>SKINS.some(s=>s.id===id));
}catch(_){return['eyes'];}
},
_saveSkins(){
try{localStorage.setItem(SKINS_KEY,JSON.stringify(this._ownedSkins));}catch(_){}
},
_loadActiveSkin(){
try{
const raw=localStorage.getItem(SKIN_ACTIVE_KEY)||'eyes';
return SKINS.some(s=>s.id===raw)?raw:'eyes';
}catch(_){return'eyes';}
},
_saveActiveSkin(){
try{localStorage.setItem(SKIN_ACTIVE_KEY,this._activeSkin);}catch(_){}
},

_getSkin(){
return SKINS.find(s=>s.id===this._activeSkin)||SKINS[0];
},

_getAccent(){
const v=getComputedStyle(document.documentElement).getPropertyValue('--accent-base').trim();
return v||'#5b8cff';
},

_showMenu(){
this.state='menu';
this.alive=false;
this.paused=false;
this.tabPaused=false;
this._stopLoop();
this._clearCountdown();
stopCubeRunMusic();
this.overlayEl.style.display='flex';
this.overlayTitleEl.textContent=t('tab.cuberun');
this.overlaySubEl.textContent=t('cuberun.hint');
this.startBtn.style.display='';
this.playAgainBtn.style.display='none';
this.menuBtn.style.display='none';
if(this.clearBtn)this.clearBtn.style.display='';
if(this.diffSegEl)this.diffSegEl.style.display='flex';
this._resetCube();
this.obstacles=[];
this.coinsOnMap=[];
this.reservedSpaces=[];
this.particles=[];
this._updateHUD();
this._draw();
},

openShop(){
if(this.state!=='menu'&&this.state!=='over'){
return;
}
if(this.shopEl){
this.shopEl.style.display='flex';
this._renderShop();
return;
}
const shop=el('div',{class:'ng-cuberun-shop'});
const shopContent=el('div',{class:'ng-cuberun-shop-content'});
const title=el('h3',{class:'ng-overlay-title',text:t('cuberun.shopTitle')});
shopContent.appendChild(title);

const coinsRow=el('div',{class:'ng-cuberun-shop-coins'});
const coinsIcon=el('span',{html:icon('award',18,'🪙')});
const coinsCount=el('span',{text:String(this.coins),id:'nibCuberunShopCoins'});
coinsRow.appendChild(coinsIcon);
coinsRow.appendChild(coinsCount);
shopContent.appendChild(coinsRow);

const grid=el('div',{class:'ng-cuberun-shop-grid'});
shopContent.appendChild(grid);

const closeBtn=el('button',{
class:'ng-btn ng-btn-primary',
text:t('cuberun.shopClose'),
style:'margin-top:14px;'
});
closeBtn.addEventListener('click',()=>{
shop.style.display='none';
});
shopContent.appendChild(closeBtn);
shop.appendChild(shopContent);
document.body.appendChild(shop);
this.shopEl=shop;

this._renderShop();
},

_renderShop(){
if(!this.shopEl)return;
const grid=this.shopEl.querySelector('.ng-cuberun-shop-grid');
if(!grid)return;
clearNode(grid);
const coinsEl=this.shopEl.querySelector('#nibCuberunShopCoins');
if(coinsEl)coinsEl.textContent=String(this.coins);

const accent=this._getAccent();
SKINS.forEach(skin=>{
const owned=this._ownedSkins.indexOf(skin.id)>=0;
const equipped=this._activeSkin===skin.id;
const canAfford=this.coins>=skin.price;
const item=el('div',{class:'ng-cuberun-skin-item'+(equipped?' equipped':'')});

const preview=el('canvas',{class:'ng-cuberun-skin-preview',width:'80',height:'80'});
const pctx=preview.getContext('2d');
const dpr=window.devicePixelRatio||1;
preview.width=80*dpr;
preview.height=80*dpr;
preview.style.width='80px';
preview.style.height='80px';
pctx.setTransform(dpr,0,0,dpr,0,0);
const size=60;
const cx=40,cy=40;
pctx.fillStyle=accent;
pctx.shadowColor=accent;
pctx.shadowBlur=noEffects()?0:8;
pctx.fillRect(cx-size/2,cy-size/2,size,size);
pctx.shadowBlur=0;
pctx.strokeStyle='rgba(0,0,0,.25)';
pctx.lineWidth=1.5;
pctx.strokeRect(cx-size/2+4,cy-size/2+4,size-8,size-8);
pctx.save();
pctx.translate(cx,cy);
skin.draw(pctx,size,accent);
pctx.restore();
item.appendChild(preview);

const name=el('div',{class:'ng-cuberun-skin-name',text:t(skin.nameKey)});
item.appendChild(name);

const price=el('div',{class:'ng-cuberun-skin-price',
text:equipped?t('cuberun.shopEquipped'):(owned?t('cuberun.shopBought'):(skin.price+' 🪙'))});
item.appendChild(price);

const actionBtn=el('button',{class:'ng-btn ng-btn-primary ng-cuberun-skin-action'});
if(equipped){
actionBtn.textContent=t('cuberun.shopEquipped');
actionBtn.disabled=true;
actionBtn.style.opacity='0.5';
actionBtn.style.background='var(--surface-3, #2c3446)';
actionBtn.style.color='var(--on-variant, #aaa)';
actionBtn.style.borderColor='transparent';
}else if(owned){
actionBtn.textContent=t('cuberun.shopEquip');
actionBtn.addEventListener('click',()=>{
this._activeSkin=skin.id;
this._saveActiveSkin();
this._renderShop();
this._draw();
});
}else{
actionBtn.textContent=t('cuberun.shopBuy');
if(!canAfford){
actionBtn.disabled=true;
actionBtn.style.opacity='0.5';
actionBtn.style.background='var(--surface-3, #2c3446)';
actionBtn.style.color='var(--on-variant, #aaa)';
actionBtn.style.borderColor='transparent';
actionBtn.style.cursor='not-allowed';
}else{
actionBtn.addEventListener('click',()=>{
this.coins-=skin.price;
this._saveCoins();
this._ownedSkins.push(skin.id);
this._saveSkins();
this._activeSkin=skin.id;
this._saveActiveSkin();
this._updateHUD();
this._renderShop();
this._draw();
beep(880,0.08,0.06);
setTimeout(()=>beep(1100,0.08,0.06),80);
});
}
}
item.appendChild(actionBtn);
grid.appendChild(item);
});
},

newGame(){
this._stopLoop();
this._clearCountdown();
this.state='countdown';
this.alive=true;
this.paused=false;
this.tabPaused=false;
this.score=0;
this.jumps=0;
this.distance=0;
this.speed=CFG.SPEED_START;
this._accumulator=0;
this._updateHUD();
this.overlayEl.style.display='none';
this._resetCube();
this.obstacles=[];
this.coinsOnMap=[];
this.reservedSpaces=[];
this.particles=[];
this.nextSpawnIn=1200;
this.nextCoinGroupIn=1500;
this.groundOffset=0;

if(cubeRunAudioAvailable&&getStoredMusicState()){
playCubeRunMusic();
}

this._startCountdown(3,()=>{
if(this.tabPaused)return;
this.state='playing';
this._lastT=performance.now();
this._accumulator=0;
this.canvas.focus();
this._startLoop();
});
},

_startCountdown(seconds,onDone){
this._clearCountdown();
this._countdownValue=seconds;
const start=performance.now();
const totalMs=seconds*1000;

const step=()=>{
if(this.tabPaused||this.paused)return;
const elapsed=performance.now()-start;
const remaining=Math.max(0,totalMs-elapsed);
this._countdownValue=remaining/1000;

this._draw();

if(remaining>0){
this._countdownTimer=setTimeout(step,50);
}else{
this._countdownValue=0;
this._draw();
if(onDone)onDone();
}
};
step();
},

_clearCountdown(){
if(this._countdownTimer){clearTimeout(this._countdownTimer);this._countdownTimer=null;}
this._countdownValue=0;
},

_resetCube(){
this.cube.x=CFG.CUBE_X;
this.cube.y=CFG.GROUND_Y-CFG.CUBE_SIZE;
this.cube.vy=0;
this.cube.onGround=true;
this.cube.rotation=0;
this.cube.spinVelocity=0;
},

_gameOver(){
if(!this.alive)return;
this.alive=false;
this.state='over';
this._stopLoop();
this._clearCountdown();
stopCubeRunMusic();
beep(220,0.18,0.06,'sawtooth');
setTimeout(()=>beep(160,0.22,0.05,'sawtooth'),100);
this._spawnExplosion();
const waitMs=noEffects()?120:900;
setTimeout(()=>{
if(this.state!=='over')return;
this.overlayEl.style.display='flex';
const isRecord=this.score>=this.best&&this.score>0;
this.overlayTitleEl.textContent=isRecord?t('cuberun.newRecord'):t('cuberun.gameover');
this.overlaySubEl.textContent=t('cuberun.score')+': '+this.score+' · '+t('cuberun.jumps')+': '+this.jumps;
this.startBtn.style.display='none';
this.playAgainBtn.style.display='';
this.menuBtn.style.display='';
if(this.clearBtn)this.clearBtn.style.display='none';
if(this.diffSegEl)this.diffSegEl.style.display='none';
},waitMs);
},

_spawnExplosion(){
const accent=this._getAccent();
const cx=this.cube.x+CFG.CUBE_SIZE/2;
const cy=this.cube.y+CFG.CUBE_SIZE/2;
const n=noEffects()?8:50;
for(let i=0;i<n;i++){
const ang=Math.random()*Math.PI*2;
const sp=100+Math.random()*280;
this.particles.push({
x:cx,y:cy,
vx:Math.cos(ang)*sp,
vy:Math.sin(ang)*sp-80,
life:0.6+Math.random()*0.5,
maxLife:1.1,
size:2+Math.random()*4,
color:accent
});
}
},

jump(){
if(this.state!=='playing'||!this.alive||this.paused||this.tabPaused)return;
if(!this.cube.onGround)return;
this.cube.vy=CFG.JUMP_V;
this.cube.onGround=false;
const timeInAir=(2*Math.abs(CFG.JUMP_V))/CFG.GRAVITY;
this.cube.spinVelocity=(Math.PI*2)/timeInAir;
this.jumps++;
this._updateHUD();
beep(660,0.05,0.05,'square');
if(!noEffects())this._spawnJumpDust();
},

fastFall(){
if(this.state!=='playing'||!this.alive||this.paused||this.tabPaused)return;
if(this.cube.onGround)return;
if(this.cube.vy<CFG.FAST_FALL_V){
this.cube.vy=CFG.FAST_FALL_V;
const timeToGround=Math.max(0.08,(CFG.GROUND_Y-CFG.CUBE_SIZE-this.cube.y)/CFG.FAST_FALL_V);
this.cube.spinVelocity=Math.PI/timeToGround;
}
beep(440,0.04,0.03,'square');
},

_startLoop(){
if(this._raf)return;
this._lastT=performance.now();
this._accumulator=0;
const tick=(now)=>{
this._raf=null;
if(this.state!=='playing'||this.paused||this.tabPaused)return;
let dt=(now-this._lastT)/1000;
this._lastT=now;
if(dt>0.1)dt=0.1;
this._accumulator+=dt;
let steps=0;
while(this._accumulator>=this._STEP&&steps<4){
this._update(this._STEP);
this._accumulator-=this._STEP;
steps++;
}
this._draw();
if(this.state==='playing'&&!this.paused&&!this.tabPaused){
this._raf=requestAnimationFrame(tick);
}
};
this._raf=requestAnimationFrame(tick);
},
_stopLoop(){
if(this._raf){cancelAnimationFrame(this._raf);this._raf=null;}
},

_cubeHitbox(){
const hbSize=this.cube.size*CUBE_HITBOX_FRACTION;
const cx=this.cube.x+this.cube.size/2;
const cy=this.cube.y+this.cube.size/2;
return{x:cx-hbSize/2,y:cy-hbSize/2,w:hbSize,h:hbSize};
},
_spikeHitbox(o){
const hbW=o.w*SPIKE_HITBOX_W_FRACTION;
const hbH=o.h*SPIKE_HITBOX_H_FRACTION;
const cx=o.x+o.w/2;
return{x:cx-hbW/2,y:CFG.GROUND_Y-hbH,w:hbW,h:hbH};
},

_update(dt){
this.groundOffset=(this.groundOffset+this.speed*dt)%40;

for(let i=this.obstacles.length-1;i>=0;i--){
const o=this.obstacles[i];
o.x-=this.speed*dt;
if(o.x+o.w<0)this.obstacles.splice(i,1);
}
for(let i=this.coinsOnMap.length-1;i>=0;i--){
const c=this.coinsOnMap[i];
c.x-=this.speed*dt;
if(c.x+c.size<0)this.coinsOnMap.splice(i,1);
}
for(let i=this.reservedSpaces.length-1;i>=0;i--){
this.reservedSpaces[i].x-=this.speed*dt;
if(this.reservedSpaces[i].x+this.reservedSpaces[i].w<0){
this.reservedSpaces.splice(i,1);
}
}

if(!this.cube.onGround){
this.cube.vy+=CFG.GRAVITY*dt;
this.cube.y+=this.cube.vy*dt;
this.cube.rotation+=this.cube.spinVelocity*dt;
if(this.cube.y>=CFG.GROUND_Y-CFG.CUBE_SIZE){
this.cube.y=CFG.GROUND_Y-CFG.CUBE_SIZE;
this.cube.vy=0;
this.cube.onGround=true;
this.cube.spinVelocity=0;
this.cube.rotation=Math.round(this.cube.rotation/(Math.PI/2))*(Math.PI/2);
}
}

this.distance+=this.speed*dt;
this.score=Math.floor(this.distance*CFG.SCORE_PER_PX);
if(this.score>this.best){this.best=this.score;this._saveBest();}
this._updateHUD();

if(this.speed<CFG.SPEED_MAX){
this.speed=Math.min(CFG.SPEED_MAX,
CFG.SPEED_START+Math.log10(1+this.distance/100)*CFG.SPEED_GROWTH*10);
}

this.nextSpawnIn-=dt*1000;
if(this.nextSpawnIn<=0){
this._spawnObstacle();
const timeInAir=(2*Math.abs(CFG.JUMP_V))/CFG.GRAVITY;
const minGapPx=this.speed*(timeInAir+0.18);
const maxGapPx=this.speed*CFG.MAX_GAP_TIME;
const gapPx=minGapPx+Math.random()*(maxGapPx-minGapPx);
this.nextSpawnIn=(gapPx/this.speed)*1000;
}

this.nextCoinGroupIn-=dt*1000;
if(this.nextCoinGroupIn<=0){
this._spawnCoinGroup();
this.nextCoinGroupIn=(1500+Math.random()*2000);
}

const coinHb={
x:this.cube.x+5,
y:this.cube.y+5,
w:this.cube.size-10,
h:this.cube.size-10
};
const hb=this._cubeHitbox();

for(const o of this.obstacles){
const sh=this._spikeHitbox(o);
if(hb.x<sh.x+sh.w&&hb.x+hb.w>sh.x&&
hb.y<sh.y+sh.h&&hb.y+hb.h>sh.y){
this._gameOver();
return;
}
}

for(let i=this.coinsOnMap.length-1;i>=0;i--){
const c=this.coinsOnMap[i];
const chb={
x:c.x,y:c.y,
w:c.size,h:c.size
};
if(coinHb.x<chb.x+chb.w&&coinHb.x+coinHb.w>chb.x&&
coinHb.y<chb.y+chb.h&&coinHb.y+chb.h>chb.y){
this.coins++;
this._saveCoins();
this._updateHUD();
this.coinsOnMap.splice(i,1);
beep(990,0.04,0.04,'sine');
if(!noEffects())this._spawnCoinSparkle(c.x+c.size/2,c.y+c.size/2);
}
}

if(this.particles.length){
for(let i=this.particles.length-1;i>=0;i--){
const p=this.particles[i];
p.x+=p.vx*dt;
p.y+=p.vy*dt;
p.vy+=CFG.GRAVITY*0.4*dt;
p.life-=dt;
if(p.life<=0)this.particles.splice(i,1);
}
}
},

_spawnObstacle(){
const cfg=DIFFICULTY[this.difficulty]||DIFFICULTY.easy;
const count=cfg.spikes;
const w=CFG.OBSTACLE_W_MIN+Math.random()*(CFG.OBSTACLE_W_MAX-CFG.OBSTACLE_W_MIN);
const h=CFG.OBSTACLE_H_MIN+Math.random()*(CFG.OBSTACLE_H_MAX-CFG.OBSTACLE_H_MIN);
const startX=CFG.W+CFG.SPAWN_OFFSET;
const gap=4;
const totalGroupW=(w*count)+(gap*(count-1));

let blocked=false;
for(let i=0;i<this.reservedSpaces.length;i++){
const res=this.reservedSpaces[i];
if(startX<res.x+res.w&&startX+totalGroupW>res.x){blocked=true;break;}
}
if(blocked){
this.nextSpawnIn=200;
return;
}

for(let i=0;i<count;i++){
this.obstacles.push({
x:startX+i*(w+gap),
y:CFG.GROUND_Y-h,
w:w,
h:h
});
}

this.reservedSpaces.push({x:startX-80,w:totalGroupW+160});
},

_spawnCoinGroup(){
const baseX=CFG.W+CFG.SPAWN_OFFSET;
const baseY=CFG.GROUND_Y-(CFG.CUBE_SIZE/2)-6;
const spacing=32;
const totalW=(CFG.COIN_GROUP_MAX-1)*spacing+CFG.COIN_SIZE;

const spawnLeft=baseX-60;
const spawnRight=baseX+totalW+60;

for(let i=this.obstacles.length-1;i>=0;i--){
const o=this.obstacles[i];
if(o.x<spawnRight&&o.x+o.w>spawnLeft){
this.obstacles.splice(i,1);
}
}

for(let i=0;i<CFG.COIN_GROUP_MAX;i++){
const cx=baseX+i*spacing;
this.coinsOnMap.push({
x:cx,
y:baseY,
size:CFG.COIN_SIZE,
phase:Math.random()*Math.PI*2
});
}

this.reservedSpaces.push({x:spawnLeft,w:spawnRight-spawnLeft});
},

_spawnJumpDust(){
const accent=this._getAccent();
const n=noEffects()?3:10;
for(let i=0;i<n;i++){
this.particles.push({
x:this.cube.x+CFG.CUBE_SIZE/2,
y:CFG.GROUND_Y-2,
vx:(Math.random()-0.5)*120,
vy:-Math.random()*80-20,
life:0.4+Math.random()*0.3,
maxLife:0.7,
size:2+Math.random()*2,
color:accent
});
}
},

_spawnCoinSparkle(x,y){
for(let i=0;i<8;i++){
const ang=Math.random()*Math.PI*2;
this.particles.push({
x,y,
vx:Math.cos(ang)*80,
vy:Math.sin(ang)*80-40,
life:0.35+Math.random()*0.25,
maxLife:0.6,
size:1.5+Math.random()*2,
color:'#ffd700'
});
}
},

_draw(){
const ctx=this.ctx;
if(!ctx)return;
const W=this.W,H=this.H;
const accent=this._getAccent();
const bg=getComputedStyle(document.documentElement).getPropertyValue('--bg-base').trim()||'#0b1020';

ctx.fillStyle=bg;
ctx.fillRect(0,0,W,H);

ctx.strokeStyle=accent;
ctx.globalAlpha=0.6;
ctx.lineWidth=2;
ctx.beginPath();
ctx.moveTo(0,CFG.GROUND_Y);
ctx.lineTo(W,CFG.GROUND_Y);
ctx.stroke();

ctx.globalAlpha=0.25;
ctx.lineWidth=1.5;
ctx.beginPath();
for(let x=-this.groundOffset;x<W;x+=40){
ctx.moveTo(x,CFG.GROUND_Y+4);
ctx.lineTo(x+16,CFG.GROUND_Y+4);
}
ctx.stroke();
ctx.globalAlpha=1;

for(const o of this.obstacles){
ctx.fillStyle='#ff4d5e';
ctx.beginPath();
ctx.moveTo(o.x,CFG.GROUND_Y);
ctx.lineTo(o.x+o.w/2,o.y);
ctx.lineTo(o.x+o.w,CFG.GROUND_Y);
ctx.closePath();
ctx.fill();
if(!noEffects()){
ctx.shadowColor='#ff4d5e';
ctx.shadowBlur=8;
ctx.fill();
ctx.shadowBlur=0;
}
}

const now=performance.now()/1000;
for(const c of this.coinsOnMap){
const bob=Math.sin(now*4+c.phase)*1.5;
const cx=c.x+c.size/2;
const cy=c.y+c.size/2+bob;
const r=c.size/2;
ctx.save();
ctx.translate(cx,cy);
ctx.fillStyle='#ffd700';
ctx.shadowColor='#ffd700';
ctx.shadowBlur=noEffects()?0:10;
ctx.beginPath();
ctx.arc(0,0,r,0,Math.PI*2);
ctx.fill();
ctx.shadowBlur=0;
ctx.strokeStyle='#b8860b';
ctx.lineWidth=2;
ctx.beginPath();
ctx.arc(0,0,r*0.7,0,Math.PI*2);
ctx.stroke();
ctx.fillStyle='#fff8b0';
ctx.font='bold '+(r*1.1)+'px system-ui,sans-serif';
ctx.textAlign='center';
ctx.textBaseline='middle';
ctx.fillText('$',0,1);
ctx.restore();
}

if(this.alive||this.state==='menu'||this.state==='countdown'){
ctx.save();
ctx.translate(this.cube.x+CFG.CUBE_SIZE/2,this.cube.y+CFG.CUBE_SIZE/2);
ctx.rotate(this.cube.rotation);
if(!noEffects()){
ctx.shadowColor=accent;
ctx.shadowBlur=20;
}
ctx.fillStyle=accent;
ctx.fillRect(-CFG.CUBE_SIZE/2,-CFG.CUBE_SIZE/2,CFG.CUBE_SIZE,CFG.CUBE_SIZE);
ctx.shadowBlur=0;
ctx.strokeStyle='rgba(0,0,0,.25)';
ctx.lineWidth=1.5;
ctx.strokeRect(-CFG.CUBE_SIZE/2+4,-CFG.CUBE_SIZE/2+4,CFG.CUBE_SIZE-8,CFG.CUBE_SIZE-8);
const skin=this._getSkin();
skin.draw(ctx,CFG.CUBE_SIZE,accent);
ctx.restore();
}

if(this.particles.length&&!noEffects()){
for(const p of this.particles){
const alpha=Math.max(0,p.life/p.maxLife);
ctx.globalAlpha=alpha;
ctx.fillStyle=p.color;
ctx.beginPath();
ctx.arc(p.x,p.y,p.size*alpha,0,Math.PI*2);
ctx.fill();
}
ctx.globalAlpha=1;
}

if(this._countdownValue>0){
ctx.fillStyle='rgba(0,0,0,0.55)';
ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';
ctx.font='bold '+(H*0.18)+'px system-ui,sans-serif';
ctx.textAlign='center';
ctx.textBaseline='middle';
ctx.shadowColor='#fff';
ctx.shadowBlur=20;
ctx.fillText(String(Math.ceil(this._countdownValue)),W/2,H/2);
ctx.shadowBlur=0;
}

if(this._debugHitboxes){
const hb=this._cubeHitbox();
ctx.strokeStyle='#22d3a6';
ctx.lineWidth=2;
ctx.strokeRect(hb.x,hb.y,hb.w,hb.h);
for(const o of this.obstacles){
const sh=this._spikeHitbox(o);
ctx.strokeStyle='#ffb020';
ctx.strokeRect(sh.x,sh.y,sh.w,sh.h);
}
}
},

_updateHUD(){
if(this.scoreEl)this.scoreEl.textContent=String(this.score);
if(this.bestEl)this.bestEl.textContent=String(this.best);
if(this.jumpsEl)this.jumpsEl.textContent=String(this.jumps);
if(this.coinsEl)this.coinsEl.textContent=String(this.coins);
},

togglePause(){
if(this.state==='playing'&&!this.paused){
this._enterPause();
}else if(this.state==='paused'){
this._exitPause();
}
},
_enterPause(){
if(this.state==='paused')return;
this._prevState=this.state;
this.state='paused';
this._stopLoop();
this._clearCountdown();
stopCubeRunMusic();
this.overlayEl.style.display='flex';
this.overlayTitleEl.textContent=t('cuberun.paused');
this.overlaySubEl.textContent=t('cuberun.score')+': '+this.score+' · '+t('cuberun.jumps')+': '+this.jumps;
this.startBtn.style.display='none';
this.playAgainBtn.style.display='';
this.playAgainBtn.textContent=t('cuberun.restart');
this.menuBtn.style.display='';
if(this.clearBtn)this.clearBtn.style.display='none';
if(this.diffSegEl)this.diffSegEl.style.display='none';
this.pauseBtnEl.innerHTML=icon('play',16,'▶');
beep(500,0.05,0.04);
},
_exitPause(){
if(this.state!=='paused')return;
this.overlayEl.style.display='none';
this.pauseBtnEl.innerHTML=icon('pause',16,'⏸');
this.state='countdown';
this._lastT=performance.now();
this._accumulator=0;
if(cubeRunAudioAvailable&&getStoredMusicState())playCubeRunMusic();
this._startCountdown(3,()=>{
this.state='playing';
this._lastT=performance.now();
this._accumulator=0;
this._startLoop();
});
beep(800,0.05,0.04);
},

pause(){
if(this.state!=='playing'&&this.state!=='countdown')return;
this.tabPaused=true;
this._stopLoop();
this._clearCountdown();
stopCubeRunMusic();
this.overlayEl.style.display='flex';
this.overlayTitleEl.textContent=t('cuberun.paused');
this.overlaySubEl.textContent=t('cuberun.score')+': '+this.score+' · '+t('cuberun.jumps')+': '+this.jumps;
this.startBtn.style.display='none';
this.playAgainBtn.style.display='';
this.playAgainBtn.textContent=t('cuberun.restart');
this.menuBtn.style.display='';
if(this.clearBtn)this.clearBtn.style.display='none';
if(this.diffSegEl)this.diffSegEl.style.display='none';
if(this.pauseBtnEl)this.pauseBtnEl.innerHTML=icon('play',16,'▶');
},

resume(){
if(!this.tabPaused)return;
this.tabPaused=false;
this.overlayEl.style.display='none';
if(this.pauseBtnEl)this.pauseBtnEl.innerHTML=icon('pause',16,'⏸');

if(this.state==='paused')return;

if(cubeRunAudioAvailable&&getStoredMusicState())playCubeRunMusic();
this.state='countdown';
this._startCountdown(3,()=>{
if(this.tabPaused)return;
this.state='playing';
this._lastT=performance.now();
this._accumulator=0;
this._startLoop();
});
},

_bindControls(){
if(this._keyHandler)document.removeEventListener('keydown',this._keyHandler);
this._keyHandler=(e)=>{
if(!this.canvas||!this.canvas.isConnected)return;
const stg=this.canvas.closest('.ng-stage');
if(!stg||!stg.classList.contains('active'))return;
const k=e.key;
if(k===' '||k==='ArrowUp'||k==='w'||k==='W'){
e.preventDefault();
if(this.state==='menu'||this.state==='over')this.newGame();
else if(this.state==='playing'||this.state==='countdown')this.jump();
}else if(k==='ArrowDown'||k==='s'||k==='S'){
e.preventDefault();
this.fastFall();
}else if(k==='p'||k==='P'||k==='Escape'){
e.preventDefault();
if(this.state!=='menu'&&this.state!=='over')this.togglePause();
}else if(k==='h'||k==='H'){
this._debugHitboxes=!this._debugHitboxes;
this._draw();
}
};
document.addEventListener('keydown',this._keyHandler);

if(this._touchHandler)this.canvas.removeEventListener('pointerdown',this._touchHandler);
this._touchHandler=(e)=>{
if(this.state==='playing'||this.state==='countdown'){
e.preventDefault();
this.jump();
}
};
this.canvas.addEventListener('pointerdown',this._touchHandler);
},

_bindResize(){
if(this._resizeHandler)window.removeEventListener('resize',this._resizeHandler);
this._resizeHandler=()=>{};
window.addEventListener('resize',this._resizeHandler);
},

destroy(){
this._stopLoop();
this._clearCountdown();
stopCubeRunMusic();
if(this._keyHandler)document.removeEventListener('keydown',this._keyHandler);
if(this._resizeHandler)window.removeEventListener('resize',this._resizeHandler);
if(this.canvas&&this._touchHandler){
this.canvas.removeEventListener('pointerdown',this._touchHandler);
}
if(this.shopEl&&this.shopEl.parentNode)this.shopEl.parentNode.removeChild(this.shopEl);
}
};

function register(){
if(!window.NibblyGames||typeof window.NibblyGames.extend!=='function')return false;
const ok=window.NibblyGames.extend({
id:'cube-run',
label:()=>t('tab.cuberun'),
init:(stage)=>CubeRun.init(stage),
pause:()=>{CubeRun.pause();stopCubeRunMusic();},
resume:()=>CubeRun.resume()
});
window.NibblyCubeRun=CubeRun;
if(ok&&console&&console.debug)console.debug('[NibblyCubeRun] Cube Run v2.1.5 registered.');
return ok;
}
if(!register()){
let tries=0;
const iv=setInterval(()=>{
tries++;
if(register()||tries>50)clearInterval(iv);
},100);
}

window.NibblyModules=window.NibblyModules||{};
if(!window.NibblyModules['cube-run']){
window.NibblyModules['cube-run']={
id:'cube-run',version:'2.1.5',
init:function(){return{refresh:function(){},destroy:function(){stopCubeRunMusic&&stopCubeRunMusic();}};}
};
}
})();