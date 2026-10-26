(function(){
'use strict';

if(window.NibblyEffects)return;

const state={
effectsEnabled:true,
soundsEnabled:true,
soundVolume:100,
reducedMotion:false,
audioCtx:null,
bgSpeed:9,
bgIntensity:1,
initialized:false,
listenerCleanup:[],
activeRipples:new WeakMap(),
activeShakes:new WeakSet()
};

function checkReducedMotion(){
try{
state.reducedMotion=
window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}catch(_){
state.reducedMotion=false;
}
}

function readLiveSettings(){
let effects=state.effectsEnabled;
let sounds=state.soundsEnabled;
let volume=state.soundVolume;

if(window.NibblyApp&&
typeof window.NibblyApp.getSettings==='function'){
try{
const s=window.NibblyApp.getSettings();
if(s){
if(typeof s.effects==='boolean')effects=s.effects;
if(typeof s.sounds==='boolean')sounds=s.sounds;
if(typeof s.soundVolume==='number')volume=s.soundVolume;
}
}catch(_){}
}
return{effects,sounds,volume};
}

function respectMotion(){
if(state.reducedMotion)return false;
if(document.body&&document.body.classList.contains('no-effects')){
return false;
}
return readLiveSettings().effects;
}

function soundsAllowed(){
const s=readLiveSettings();
return s.sounds&&s.volume>0;
}

function ensureAudioCtx(){
if(!state.audioCtx){
try{
const AC=window.AudioContext||window.webkitAudioContext;
if(!AC)return null;
state.audioCtx=new AC();
}catch(_){
return null;
}
}
return state.audioCtx;
}

function playTone(freq,duration,opts){
opts=opts||{};
if(!soundsAllowed())return;
const ctx=ensureAudioCtx();
if(!ctx)return;

if(ctx.state==='running'){
_scheduleTone(ctx,freq,duration,opts);
}else{
ctx.resume()
.then(function(){_scheduleTone(ctx,freq,duration,opts);})
.catch(function(){});
}
}

function _scheduleTone(ctx,freq,duration,opts){
try{
const now=ctx.currentTime+(opts.delay||0);
const live=readLiveSettings();
const vol=(live.volume/100)*(opts.volume||0.06);
const osc=ctx.createOscillator();
const gain=ctx.createGain();

osc.type=opts.type||'sine';
osc.frequency.setValueAtTime(freq,now);
if(opts.slideTo){
osc.frequency.exponentialRampToValueAtTime(
Math.max(20,opts.slideTo),now+duration
);
}
gain.gain.setValueAtTime(0.0001,now);
gain.gain.exponentialRampToValueAtTime(vol,now+0.006);
gain.gain.exponentialRampToValueAtTime(0.0001,now+duration);

osc.connect(gain);
gain.connect(ctx.destination);
osc.start(now);
osc.stop(now+duration+0.03);
}catch(_){}
}

const sound={
click:function(){
playTone(880,0.09,{slideTo:620,volume:0.05});
},
pop:function(){
playTone(600,0.07,{slideTo:900,volume:0.045});
},
success:function(){
playTone(523.25,0.12,{volume:0.06});
playTone(659.25,0.12,{volume:0.06,delay:0.08});
playTone(783.99,0.18,{volume:0.06,delay:0.16});
},
error:function(){
playTone(220,0.14,{type:'square',volume:0.05});
playTone(180,0.16,{type:'square',volume:0.05,delay:0.08});
},
whoosh:function(){
playTone(1200,0.16,{
slideTo:220,type:'sawtooth',volume:0.04
});
}
};

function pulse(el,opts){
if(!el)return Promise.resolve();
opts=opts||{};
const duration=Math.max(80,Number(opts.duration)||400);
if(!respectMotion())return Promise.resolve();
return new Promise(function(resolve){
el.style.setProperty('--nib-pulse-duration',duration+'ms');
el.classList.add('nib-pulse');
setTimeout(function(){
el.classList.remove('nib-pulse');
resolve();
},duration);
});
}

function shake(el,opts){
if(!el)return Promise.resolve();
if(!respectMotion())return Promise.resolve();
if(state.activeShakes.has(el))return Promise.resolve();
opts=opts||{};
const duration=Math.max(200,Number(opts.duration)||500);
state.activeShakes.add(el);
return new Promise(function(resolve){
el.classList.add('nib-shake');
setTimeout(function(){
el.classList.remove('nib-shake');
state.activeShakes.delete(el);
resolve();
},duration);
});
}

function flash(el,opts){
if(!el)return Promise.resolve();
if(!respectMotion())return Promise.resolve();
opts=opts||{};
const duration=Math.max(120,Number(opts.duration)||400);
const color=opts.color||'var(--accent)';
return new Promise(function(resolve){
el.style.setProperty('--nib-flash-color',color);
el.classList.add('nib-flash');
setTimeout(function(){
el.classList.remove('nib-flash');
el.style.removeProperty('--nib-flash-color');
resolve();
},duration);
});
}

function fadeIn(el,opts){
if(!el)return Promise.resolve();
opts=opts||{};
const duration=Math.max(80,Number(opts.duration)||300);
if(!respectMotion()){
el.style.opacity='1';
el.style.transform='';
return Promise.resolve();
}
return new Promise(function(resolve){
el.style.opacity='0';
el.style.transform=opts.from||'translateY(8px)';
el.style.transition=
'opacity '+duration+'ms cubic-bezier(.2,.9,.3,1.1), '+
'transform '+duration+'ms cubic-bezier(.2,.9,.3,1.1)';
void el.offsetWidth;
requestAnimationFrame(function(){
el.style.opacity='1';
el.style.transform='none';
setTimeout(function(){
el.style.transition='';
el.style.transform='';
resolve();
},duration);
});
});
}

function fadeOut(el,opts){
if(!el)return Promise.resolve();
opts=opts||{};
const duration=Math.max(80,Number(opts.duration)||300);
if(!respectMotion()){
el.style.opacity='0';
return Promise.resolve();
}
return new Promise(function(resolve){
el.style.transition='opacity '+duration+
'ms cubic-bezier(.2,.9,.3,1.1)';
el.style.opacity='0';
setTimeout(function(){
el.style.transition='';
resolve();
},duration);
});
}

function countUp(el,from,to,opts){
if(!el)return Promise.resolve();
opts=opts||{};
const duration=Math.max(120,Number(opts.duration)||800);
if(!respectMotion()){
el.textContent=String(to);
return Promise.resolve();
}
const startTime=performance.now();
const startVal=Number(from)||0;
const endVal=Number(to)||0;
const diff=endVal-startVal;
const hasDecimals=!Number.isInteger(from)||!Number.isInteger(to);
const decimals=Math.max(
(String(from).split('.')[1]||'').length,
(String(to).split('.')[1]||'').length
);
return new Promise(function(resolve){
function frame(now){
const t=Math.min(1,(now-startTime)/duration);
const eased=1-Math.pow(1-t,3);
const cur=startVal+diff*eased;
el.textContent=hasDecimals
?cur.toFixed(decimals)
:String(Math.round(cur));
if(t<1){
requestAnimationFrame(frame);
}else{
el.textContent=hasDecimals
?endVal.toFixed(decimals)
:String(endVal);
resolve();
}
}
requestAnimationFrame(frame);
});
}

function typewriter(el,text,opts){
if(!el)return Promise.resolve();
opts=opts||{};
const delay=Math.max(0,Number(opts.delay)||30);
if(!respectMotion()){
el.textContent=String(text);
return Promise.resolve();
}
el.textContent='';
const chars=Array.from(String(text));
let i=0;
return new Promise(function(resolve){
function tick(){
if(i>=chars.length){resolve();return;}
el.textContent+=chars[i++];
setTimeout(tick,delay);
}
tick();
});
}

function ripple(evt,opts){
opts=opts||{};
const target=(evt&&evt.currentTarget)||opts.element;
if(!target)return;
if(!respectMotion())return;
if(state.activeRipples.has(target))return;

const rect=target.getBoundingClientRect();
if(!rect.width||!rect.height)return;

const size=Math.max(rect.width,rect.height)*2.2;
const clientX=(evt&&typeof evt.clientX==='number')
?evt.clientX
:rect.left+rect.width/2;
const clientY=(evt&&typeof evt.clientY==='number')
?evt.clientY
:rect.top+rect.height/2;
const x=clientX-rect.left-size/2;
const y=clientY-rect.top-size/2;

const span=document.createElement('span');
span.className='nib-ripple-wave';
span.style.width=size+'px';
span.style.height=size+'px';
span.style.left=x+'px';
span.style.top=y+'px';
if(opts.color)span.style.background=opts.color;

const cs=getComputedStyle(target);
if(cs.position==='static')target.style.position='relative';
const prevOverflow=target.style.overflow;
target.style.overflow='hidden';
target.appendChild(span);
state.activeRipples.set(target,true);
setTimeout(function(){
if(span.parentNode)span.parentNode.removeChild(span);
target.style.overflow=prevOverflow;
state.activeRipples.delete(target);
},650);
}

function confetti(opts){
opts=opts||{};
if(!respectMotion())return;
const count=Math.max(6,Number(opts.count)||40);
const duration=Math.max(400,Number(opts.duration)||1800);
const colors=opts.colors||[
'var(--accent)','#a78bfa','#22d3a6','#ffb020','#ff6b7a'
];
let originX=window.innerWidth/2;
let originY=window.innerHeight/2;
if(opts.element&&opts.element.getBoundingClientRect){
const r=opts.element.getBoundingClientRect();
originX=r.left+r.width/2;
originY=r.top+r.height/2;
}
const layer=document.createElement('div');
layer.className='nib-confetti-layer';
layer.setAttribute('aria-hidden','true');
document.body.appendChild(layer);
for(let i=0;i<count;i++){
const piece=document.createElement('div');
piece.className='nib-confetti-piece';
const angle=Math.random()*Math.PI*2;
const velocity=4+Math.random()*9;
const vx=Math.cos(angle)*velocity;
const vy=Math.sin(angle)*velocity-4;
const rot=Math.random()*720-360;
const delay=Math.random()*180;
piece.style.left=originX+'px';
piece.style.top=originY+'px';
piece.style.background=colors[i%colors.length];
piece.style.width=(5+Math.random()*5)+'px';
piece.style.height=(5+Math.random()*5)+'px';
piece.style.setProperty('--nib-cf-vx',vx+'px');
piece.style.setProperty('--nib-cf-vy',vy+'px');
piece.style.setProperty('--nib-cf-rot',rot+'deg');
piece.style.setProperty('--nib-cf-duration',duration+'ms');
piece.style.animationDelay=delay+'ms';
layer.appendChild(piece);
}
setTimeout(function(){
if(layer.parentNode)layer.parentNode.removeChild(layer);
},duration+500);
}

function staggerCards(container,opts){
if(!container)return;
if(!respectMotion())return;
opts=opts||{};
const stagger=Math.max(0,Number(opts.stagger)||60);
const cards=container.querySelectorAll(
':scope > .card, :scope > * > .card'
);
if(!cards.length)return;
cards.forEach(function(card,i){
if(card.dataset.nibStaggered==='1')return;
card.dataset.nibStaggered='1';
card.style.opacity='0';
card.style.transform='translateY(12px)';
card.style.animation=
'nibCardIn 500ms cubic-bezier(.2,.9,.3,1.1) forwards';
card.style.animationDelay=(i*stagger)+'ms';
});
}

function observeReveal(container,opts){
if(!container)return null;
if(!respectMotion())return null;
if(!('IntersectionObserver'in window))return null;
opts=opts||{};
const threshold=typeof opts.threshold==='number'
?opts.threshold
:0.1;
const observer=new IntersectionObserver(function(entries){
entries.forEach(function(entry){
if(entry.isIntersecting){
entry.target.classList.add('nib-revealed');
observer.unobserve(entry.target);
}
});
},{root:opts.root||null,threshold:threshold});
container.querySelectorAll('.nib-reveal').forEach(function(el){
observer.observe(el);
});
return observer;
}

function setBgSpeed(seconds){
const s=Math.max(1,Number(seconds)||9);
state.bgSpeed=s;
document.documentElement.style.setProperty(
'--bg-anim-speed',s+'s'
);
}


function setBgIntensity(level){
const n=Number(level);
const v=Number.isFinite(n)?Math.max(0,Math.min(1,n)):1;
state.bgIntensity=v;


document.documentElement.style.setProperty(
'--bg-anim-brightness',String(v)
);


const pulse=document.getElementById('nibblyMusicPulse');
if(pulse){
pulse.style.filter='brightness('+v+')';
}
}

function primeAudioOnce(){
const ctx=ensureAudioCtx();
if(ctx&&ctx.state==='suspended'){
ctx.resume().catch(function(){});
}
}

function init(container,ctx){
if(state.initialized)return window.NibblyEffects;
checkReducedMotion();

const live=readLiveSettings();
state.effectsEnabled=live.effects;
state.soundsEnabled=live.sounds;
state.soundVolume=live.volume;

document.documentElement.style.setProperty(
'--bg-anim-speed',state.bgSpeed+'s'
);
document.documentElement.style.setProperty(
'--bg-anim-brightness','1'
);

try{
const mq=window.matchMedia('(prefers-reduced-motion: reduce)');
const onChange=function(){checkReducedMotion();};
if(mq.addEventListener){
mq.addEventListener('change',onChange);
state.listenerCleanup.push(function(){
mq.removeEventListener('change',onChange);
});
}else if(mq.addListener){
mq.addListener(onChange);
state.listenerCleanup.push(function(){
mq.removeListener(onChange);
});
}
}catch(_){}

function clickHandler(e){
const hit=e.target.closest(
'button, .chip, .tab, .seg-btn, .copy, .icon-btn, '+
'.sheet-close, .reset-btn, .preset-swatch, .check-row, '+
'.github-link, .color-chip, .morse-key'
);
if(hit&&!hit.disabled)sound.click();
}
document.addEventListener('pointerdown',primeAudioOnce,
{once:true,passive:true});
document.addEventListener('touchstart',primeAudioOnce,
{once:true,passive:true});
document.addEventListener('keydown',primeAudioOnce,{once:true});
document.addEventListener('click',clickHandler,false);

state.listenerCleanup.push(function(){
document.removeEventListener('click',clickHandler);
});
state.listenerCleanup.push(function(){
document.removeEventListener('pointerdown',primeAudioOnce);
document.removeEventListener('touchstart',primeAudioOnce);
document.removeEventListener('keydown',primeAudioOnce);
});

function rippleHandler(e){
const target=e.target.closest('[data-nib-ripple]');
if(target&&respectMotion())ripple(e,{element:target});
}
document.addEventListener('pointerdown',rippleHandler,{passive:true});
state.listenerCleanup.push(function(){
document.removeEventListener('pointerdown',rippleHandler);
});

function tabHandler(e){
const tab=e.target.closest('.tab');
if(!tab)return;
const tabId=tab.dataset.tab;
const panel=document.getElementById('panel-'+tabId);
if(panel&&respectMotion()){
setTimeout(function(){staggerCards(panel);},20);
}
}
document.addEventListener('click',tabHandler,true);
state.listenerCleanup.push(function(){
document.removeEventListener('click',tabHandler,true);
});

if(container){
setTimeout(function(){
staggerCards(container);
observeReveal(container);
},120);
}

state.initialized=true;

if(console&&console.debug){
console.debug('[Nibbly effects] initialized · effects='+
state.effectsEnabled+' sounds='+state.soundsEnabled+
' volume='+state.soundVolume);
}

return window.NibblyEffects;
}

function destroy(){
state.listenerCleanup.forEach(function(fn){
try{fn();}catch(_){}
});
state.listenerCleanup=[];
if(state.audioCtx&&state.audioCtx.state!=='closed'){
try{state.audioCtx.close();}catch(_){}
}
state.audioCtx=null;
state.initialized=false;
}

const api={
id:'effects',
version:'2.0.17',

pulse:pulse,
shake:shake,
flash:flash,
fadeIn:fadeIn,
fadeOut:fadeOut,
countUp:countUp,
typewriter:typewriter,
ripple:ripple,
confetti:confetti,
staggerCards:staggerCards,
observeReveal:observeReveal,

setBgSpeed:setBgSpeed,
setBgIntensity:setBgIntensity,

sound:sound,

respectMotion:respectMotion,
isEffectsEnabled:function(){return readLiveSettings().effects;},
isSoundsEnabled:function(){return readLiveSettings().sounds;},
isReducedMotion:function(){return state.reducedMotion;},

setEffectsEnabled:function(v){state.effectsEnabled=!!v;},
setSoundsEnabled:function(v){state.soundsEnabled=!!v;},
setSoundVolume:function(v){
state.soundVolume=Math.max(0,Math.min(100,Number(v)||0));
},

init:init,
destroy:destroy
};

window.NibblyEffects=api;
window.NibblyModules=window.NibblyModules||{};
window.NibblyModules.effects=api;

if(console&&console.debug){
console.debug('[Nibbly] effects.js loaded → window.NibblyEffects (v2.0.17)');
}
})();