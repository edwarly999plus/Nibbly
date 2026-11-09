(function(){
'use strict';
if(window.NibblyVersionCheck)return;

const GITHUB_REPO='edwarly999plus/Nibbly';
const API_URL='https://api.github.com/repos/'+GITHUB_REPO+'/releases/latest';
const CACHE_KEY='nibbly-version-check-v1';
const CACHE_TTL_MS=1000*60*30;

let state={
status:'idle',
appVersion:null,
latestTag:null,
latestUrl:null,
lastChecked:0,
error:null
};

function parseVersion(str){
const clean=String(str||'').replace(/^v/i,'').trim();
const parts=clean.split('.').map(n=>parseInt(n,10));
return{
major:parts[0]||0,
minor:parts[1]||0,
patch:parts[2]||0,
raw:clean
};
}

function compareVersions(a,b){
const va=parseVersion(a);
const vb=parseVersion(b);
if(va.major!==vb.major)return va.major-vb.major;
if(va.minor!==vb.minor)return va.minor-vb.minor;
return va.patch-vb.patch;
}

function readCache(){
try{
const raw=localStorage.getItem(CACHE_KEY);
if(!raw)return null;
const c=JSON.parse(raw);
if(Date.now()-c.t>CACHE_TTL_MS)return null;
return c;
}catch(_){return null;}
}

function writeCache(data){
try{
localStorage.setItem(CACHE_KEY,JSON.stringify({
t:Date.now(),
...data
}));
}catch(_){}
}

async function fetchLatestRelease(){
const res=await fetch(API_URL,{
headers:{'Accept':'application/vnd.github+json'}
});
if(!res.ok){
if(res.status===403)throw new Error('rate-limit');
if(res.status===404)throw new Error('not-found');
throw new Error('http-'+res.status);
}
const data=await res.json();
return{
tag:data.tag_name||'',
url:data.html_url||''
};
}

async function requestNotificationPermission(){
if(!('Notification'in window))return{ok:false,reason:'unsupported'};
if(Notification.permission==='granted')return{ok:true,reason:'granted'};
if(Notification.permission==='denied')return{ok:false,reason:'denied'};
try{
const perm=await Notification.requestPermission();
return{ok:perm==='granted',reason:perm};
}catch(_){
return{ok:false,reason:'error'};
}
}

function showBrowserNotification(version){
if(!('Notification'in window))return;
if(Notification.permission!=='granted')return;
try{
new Notification('NUEVA ACTUALIZACIÓN DE NIBBLY '+version+' 🎉',{
body:'Chequea la última release en GitHub',
tag:'nibbly-update-'+version
});
}catch(_){}
}

async function check(force){
const appVersion=window.__NIBBLY_APP_VERSION;
if(!appVersion){
state.status='error';
state.error='no-app-version';
return state;
}

const cached=!force&&readCache();
if(cached){
state.appVersion=appVersion;
state.latestTag=cached.tag;
state.latestUrl=cached.url;
state.lastChecked=cached.t;
computeStatus();
return state;
}

state.status='loading';
state.appVersion=appVersion;

try{
const latest=await fetchLatestRelease();
state.latestTag=latest.tag;
state.latestUrl=latest.url;
state.lastChecked=Date.now();
writeCache({tag:latest.tag,url:latest.url});
computeStatus();

if(state.status==='needs-update'){
showBrowserNotification(latest.tag);
}
}catch(e){
state.status='error';
state.error=e.message||String(e);
}

return state;
}

function computeStatus(){
const cmp=compareVersions(state.latestTag,state.appVersion);

if(cmp>0){
state.status='needs-update';
}else if(cmp<0){
state.status='developer';
}else{
state.status='up-to-date';
}
}

window.NibblyVersionCheck={
check,
requestNotificationPermission,
getState:()=>({...state}),

getStatusText:()=>{
switch(state.status){
case'needs-update':
return'App version: '+state.appVersion+'\nRelease Tag: '+state.latestTag+' (Need Update)';
case'developer':
return'Developer Version, No Need To Update';
case'up-to-date':
return'Up to date ('+state.appVersion+')';
case'loading':
return'Checking…';
case'error':
return'Could not check ('+(state.error||'error')+')';
default:
return'';
}
},

hasUpdate:()=>state.status==='needs-update',


getNotificationState:()=>{
if(!('Notification'in window))return'unsupported';
return Notification.permission;
},


getBadgeState:()=>{
switch(state.status){
case'needs-update':return'new';
case'up-to-date':return'fresh';
case'developer':return'dev';
case'loading':return'loading';
case'error':return'error';
default:return'idle';
}
}
};

window.NibblyModules=window.NibblyModules||{};
window.NibblyModules['version-check']={
id:'version-check',
version:'1.0.1',
init:function(){return window.NibblyVersionCheck;}
};
})();