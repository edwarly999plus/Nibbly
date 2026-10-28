(function(){
'use strict';
if(window.NibblyIcons)return;

const ICONS={

config:'images/config.png',
adjust:'images/adjust.png',
copy:'images/copy.png',
download:'images/download.png',
paste:'images/paste.png',
trash:'images/trash.png',
reload:'images/reload.png',
search:'images/search.png',
check:'images/check.png',
checkbox:'images/checkbox.png',
'sand-clock':'images/sand-clock.png',
grid:'images/grid.png',
nibbly:'images/nibbly.png',
github:'images/github.png',
fullscreen:'images/fullscreen.png',


numbers:'images/numbers.png',
text:'images/text.png',
bits:'images/bits.png',
thunder:'images/thunder.png',
music:'images/music.png',
calc:'images/calc.png',
cipher:'images/cipher.png',
pencil:'images/pencil.png',
games:'images/games.png',
formulas:'images/formulas.png',
range:'images/range.png',
memory:'images/memory.png',
markdown:'images/markdown.png',
console:'images/console.png',
logic:'images/logic.png',


storage:'images/storage.png',
ram:'images/ram.png',
cpu:'images/cpu.png',
video:'images/video.png',
clock:'images/clock.png',
film:'images/film.png',
codec:'images/codec.png',
volume:'images/volume.png',
wifi:'images/wifi.png',
thermometer:'images/thermometer.png',
stats:'images/stats.png',
random:'images/random.png',
eye:'images/eye.png',
cloud:'images/cloud.png',
confetti:'images/confetti.png',
bomb:'images/bomb.png',
dropper:'images/dropper.png',
eraser:'images/eraser.png',
brush:'images/brush.png',
bulk:'images/bulk.png',
load:'images/load.png',
save:'images/save.png',
'red-flag':'images/red-flag.png',
pause:'images/pause.png',
play:'images/play.png',
warning:'images/warning.png',
};

const api={
id:'icons',
version:'2.0.0',

get:function(name,opts){
opts=opts||{};
const src=ICONS[name];
if(!src)return'';

const size=opts.size||20;
const cls=opts.class?' '+opts.class:'';
const style=opts.style?' style="'+opts.style+'"':'';

return`<img src="${src}" class="nib-vec-icon${cls}" width="${size}" height="${size}" alt="${name}" aria-hidden="true"${style}>`;
},

element:function(name,opts){
const html=this.get(name,opts);
if(!html)return null;
const wrap=document.createElement('div');
wrap.innerHTML=html;
return wrap.firstElementChild;
},

init:function(){
return api;
}
};

window.NibblyIcons=api;
window.NibblyModules=window.NibblyModules||{};
window.NibblyModules.icons=api;
})();