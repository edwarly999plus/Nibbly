(function(){
'use strict';
if(window.NibblyModules&&window.NibblyModules.music)return;


const SETTINGS_KEY='nibbly-music-settings-v2';
const CACHE_NAME='nibbly-theme';

const LOAD_TIMEOUT_LOCAL=5000;
const LOAD_TIMEOUT_REMOTE=15000;


const TRACKS=[
{
name:'You Are Nibbled',
local:'mus/You Are Nibbled.ogg',
remote:'https://ia600102.us.archive.org/6/items/'+
'nibbly-ost-archive_202610/You Are Nibbled (In-App).mp3',
cacheKey:'/__nibbly_music_track0__'
}
];


const state={
audio:null,
loadedTrack:-1,
userPaused:false,
enabled:false,
volume:100,
pulseEl:null,
currentTrack:0,
destroyFns:[]
};
let fadeInActive=false;


function loadSettings(){
try{
const raw=localStorage.getItem(SETTINGS_KEY);
if(!raw)return;
const s=JSON.parse(raw);
if(typeof s.enabled==='boolean')state.enabled=s.enabled;
if(typeof s.volume==='number')state.volume=clamp(s.volume,0,100);
state.currentTrack=0;
}catch(_){}
}
function saveSettings(){
try{
localStorage.setItem(SETTINGS_KEY,JSON.stringify({
enabled:state.enabled,
volume:state.volume,
track:0
}));
}catch(_){}
}
function clamp(v,min,max){return v<min?min:v>max?max:v;}


function ensureAudio(){
if(state.audio)return state.audio;
const a=new Audio();
a.loop=true;
a.preload='auto';
a.crossOrigin='anonymous';
a.setAttribute('playsinline','');
a.volume=state.volume/100;
a.addEventListener('play',()=>markPlaying(true));
a.addEventListener('pause',()=>markPlaying(false));
a.addEventListener('error',()=>{
if(console&&console.debug){
console.debug('[Nibbly music] audio error:',a.error&&a.error.code);
}
});
state.audio=a;
return a;
}


function ensurePulseLayer(){
if(state.pulseEl)return state.pulseEl;
let el=document.getElementById('nibblyMusicPulse');
if(!el){
el=document.createElement('div');
el.id='nibblyMusicPulse';
el.setAttribute('aria-hidden','true');
document.body.insertBefore(el,document.body.firstChild);
}
state.pulseEl=el;
return el;
}

function markPlaying(isPlaying){
const el=ensurePulseLayer();
if(isPlaying){
document.body.classList.add('nib-music-playing');
el.style.opacity='';
}else{
document.body.classList.remove('nib-music-playing');
el.style.opacity=state.enabled?'':'0';
}
}


function loadSource(src,timeoutMs){
const audio=ensureAudio();
return new Promise((resolve,reject)=>{
let settled=false;
const timer=setTimeout(()=>{
if(settled)return;
settled=true;cleanup();
reject(new Error('timeout'));
},timeoutMs);
const onReady=()=>{if(settled)return;settled=true;cleanup();resolve();};
const onError=()=>{if(settled)return;settled=true;cleanup();reject(new Error('load-error'));};
function cleanup(){
clearTimeout(timer);
audio.removeEventListener('canplay',onReady);
audio.removeEventListener('loadeddata',onReady);
audio.removeEventListener('error',onError);
}
audio.addEventListener('canplay',onReady);
audio.addEventListener('loadeddata',onReady);
audio.addEventListener('error',onError);
try{audio.src=src;audio.load();}
catch(_){onError();}
});
}

async function getCachedBlob(cacheKey){
if(!('caches'in window))return null;
try{
const cache=await caches.open(CACHE_NAME);
const res=await cache.match(cacheKey);
if(!res)return null;
return await res.blob();
}catch(_){return null;}
}
async function cacheRemote(url,cacheKey){
if(!('caches'in window))return;
try{
const cache=await caches.open(CACHE_NAME);
const existing=await cache.match(cacheKey);
if(existing)return;
const res=await fetch(url,{mode:'cors',credentials:'omit'});
if(res&&res.ok)await cache.put(cacheKey,res.clone());
}catch(_){}
}

async function loadTrackByIndex(index){
const track=TRACKS[index];
if(!track)throw new Error('Invalid track index '+index);

try{
await loadSource(track.local,LOAD_TIMEOUT_LOCAL);
state.loadedTrack=index;
if(console&&console.debug){
console.debug('[Nibbly music] ✅ local:',track.name);
}
return true;
}catch(_){
if(console&&console.debug){
console.debug('[Nibbly music] local unavailable:',track.local);
}
}

try{
const blob=await getCachedBlob(track.cacheKey);
if(blob){
const url=URL.createObjectURL(blob);
await loadSource(url,LOAD_TIMEOUT_LOCAL);
state.loadedTrack=index;
return true;
}
}catch(_){}

if(track.remote){
try{
await loadSource(track.remote,LOAD_TIMEOUT_REMOTE);
cacheRemote(track.remote,track.cacheKey);
state.loadedTrack=index;
return true;
}catch(_){}
}

throw new Error('All sources failed for "'+track.name+'"');
}


async function ensureLoaded(){
if(state.loadedTrack===0)return true;
try{
await loadTrackByIndex(0);
return true;
}catch(_){return false;}
}

async function play(){
if(!state.enabled)return false;
state.userPaused=false;
const ok=await ensureLoaded();
if(!ok)return false;

try{
await state.audio.play();
return true;
}catch(_){return false;}
}

function pause(){
state.userPaused=true;
if(state.audio){try{state.audio.pause();}catch(_){}}
markPlaying(false);
}

function setVolume(v){
state.volume=clamp(Number(v)||0,0,100);
if(state.audio)state.audio.volume=state.volume/100;
saveSettings();
}

function setEnabled(on){
state.enabled=!!on;
saveSettings();
document.body.classList.toggle('nib-music-enabled',state.enabled);
if(state.enabled){
if(!state.userPaused)play();
}else{
pause();
state.userPaused=false;
}
}

function isPlaying(){
return!!(state.audio&&!state.audio.paused&&!state.audio.ended);
}


function fadeIn(durationMs){
durationMs=durationMs||1500;
if(!state.audio)return Promise.resolve();
if(fadeInActive)return Promise.resolve();
fadeInActive=true;

const targetVol=state.volume/100;
const startTime=performance.now();

try{state.audio.volume=0;}catch(_){}

return new Promise(resolve=>{
const tick=()=>{
if(!state.audio){fadeInActive=false;resolve();return;}
const elapsed=performance.now()-startTime;

if(state.audio.paused){
if(elapsed>8000){
try{state.audio.volume=targetVol;}catch(_){}
fadeInActive=false;
resolve();
return;
}
try{state.audio.volume=0;}catch(_){}
setTimeout(tick,100);
return;
}

const t=Math.min(1,elapsed/durationMs);
try{state.audio.volume=targetVol*t;}catch(_){}

if(t>=1){
fadeInActive=false;
resolve();
return;
}
requestAnimationFrame(tick);
};
tick();
});
}


function attachAutoplayGate(){
const tryResume=()=>{
document.removeEventListener('pointerdown',tryResume);
document.removeEventListener('keydown',tryResume);
document.removeEventListener('touchstart',tryResume);
if(state.enabled&&!state.userPaused&&!isPlaying())play();
};
document.addEventListener('pointerdown',tryResume,{passive:true});
document.addEventListener('keydown',tryResume,{passive:true});
document.addEventListener('touchstart',tryResume,{passive:true});
state.destroyFns.push(()=>{
document.removeEventListener('pointerdown',tryResume);
document.removeEventListener('keydown',tryResume);
document.removeEventListener('touchstart',tryResume);
});
}


function init(container,ctx){
loadSettings();
ensureAudio();
ensurePulseLayer();

document.body.classList.toggle('nib-music-enabled',state.enabled);
if(state.audio)state.audio.volume=state.volume/100;

attachAutoplayGate();

if(state.enabled)play();

const api={
play,
pause,
isPlaying,
setVolume,
getVolume:()=>state.volume,
setEnabled,
isEnabled:()=>state.enabled,
hasAnalyser:()=>false,
getAudioElement:()=>state.audio,

fadeIn,

getCurrentTrack:()=>0,
getTrackName:()=>TRACKS[0].name,
getTracks:()=>TRACKS.map(t=>t.name),

resume:()=>{if(state.enabled&&!state.userPaused)play();},
destroy:()=>{
pause();
state.destroyFns.forEach(fn=>{try{fn();}catch(_){}});
document.body.classList.remove(
'nib-music-playing','nib-music-analyser','nib-music-enabled'
);
if(state.pulseEl&&state.pulseEl.parentNode){
state.pulseEl.parentNode.removeChild(state.pulseEl);
}
state.pulseEl=null;
}
};

window.__nibblyMusic=api;
window.NibblyMusic=api;

if(console&&console.debug){
console.debug('[Nibbly music] ready — enabled='+state.enabled+
', track="'+api.getTrackName()+'"');
}

return api;
}


window.NibblyModules=window.NibblyModules||{};
window.NibblyModules.music={
id:'music',
version:'2.0.2',
init,
_tracks:TRACKS
};

if(console&&console.debug){
console.debug('[Nibbly] music.js loaded → window.NibblyModules.music');
}
})();