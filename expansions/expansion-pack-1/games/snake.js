(function(){
'use strict';
if(window.NibblyModules&&window.NibblyModules['snake'])return;

const I18N={
es:{
'tab.snake':'Snake','snake.score':'Puntos','snake.best':'Récord',
'snake.pause':'Pausa','snake.resume':'Reanudar','snake.newgame':'Nueva partida',
'snake.menu':'Menú','snake.gameover':'Game Over','snake.youwin':'¡Ganaste!',
'snake.paused':'Pausado','snake.playagain':'Reiniciar',
'snake.hint':'Flechas / WASD · Swipe en móvil · P pausa',
'snake.difficulty':'Dificultad','snake.diff.easy':'Fácil',
'snake.diff.normal':'Normal','snake.diff.hard':'Difícil',
'snake.start':'Comenzar','snake.go':'¡GO!',
'snake.dir.up':'↑','snake.dir.down':'↓','snake.dir.left':'←','snake.dir.right':'→'
},
en:{
'tab.snake':'Snake','snake.score':'Score','snake.best':'Best',
'snake.pause':'Pause','snake.resume':'Resume','snake.newgame':'New game',
'snake.menu':'Menu','snake.gameover':'Game Over','snake.youwin':'You win!',
'snake.paused':'Paused','snake.playagain':'Restart',
'snake.hint':'Arrows / WASD · Swipe on mobile · P pause',
'snake.difficulty':'Difficulty','snake.diff.easy':'Easy',
'snake.diff.normal':'Normal','snake.diff.hard':'Hard',
'snake.start':'Start','snake.go':'GO!',
'snake.dir.up':'↑','snake.dir.down':'↓','snake.dir.left':'←','snake.dir.right':'→'
}
};

function getLang(){
try{const raw=localStorage.getItem('nibbly-settings-v2');if(raw){const s=JSON.parse(raw);if(s&&s.lang==='en')return'en';}}catch(e){}
return'es';
}
function t(key){
const lang=getLang();
let s=(I18N[lang]&&I18N[lang][key])||I18N.es[key]||key;
for(let i=1;i<arguments.length;i++){s=s.replace('{'+(i-1)+'}',arguments[i]);}
return s;
}
function el(tag,attrs,children){
const node=document.createElement(tag);
if(attrs)for(const k in attrs){
if(k==='class')node.className=attrs[k];
else if(k==='text')node.textContent=attrs[k];
else if(k==='html')node.innerHTML=attrs[k];
else if(k==='style'&&typeof attrs[k]==='object'){for(const sk in attrs[k])node.style[sk]=attrs[k][sk];}
else if(k.startsWith('data-')||k.startsWith('aria-'))node.setAttribute(k,attrs[k]);
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
if(window.NibblyIcons){const html=window.NibblyIcons.get(name,{size:size||18});if(html)return html;}
return fallback||'';
}
function noEffects(){return document.body&&document.body.classList.contains('no-effects');}

let _audioCtx=null;
let _audioUnlocked=false;
function unlockAudio(){
if(_audioUnlocked)return;
try{
if(!_audioCtx){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;_audioCtx=new AC();}
if(_audioCtx.state==='suspended')_audioCtx.resume().catch(()=>{});
_audioUnlocked=true;
}catch(_){}
}
if(typeof document!=='undefined'&&!window.__snakeAudioHooked){
window.__snakeAudioHooked=true;
const u=()=>{unlockAudio();document.removeEventListener('pointerdown',u,true);document.removeEventListener('keydown',u,true);document.removeEventListener('touchstart',u,true);};
document.addEventListener('pointerdown',u,true);document.addEventListener('keydown',u,true);document.addEventListener('touchstart',u,true);
}
function beep(freq,dur,vol){
try{
unlockAudio();if(!_audioCtx)return;
const s=JSON.parse(localStorage.getItem('nibbly-settings-v2')||'{}');if(!s.sounds)return;
const v=Number(s.soundVolume);if(!isFinite(v)||v<=0)return;
const ctx=_audioCtx;
const fire=()=>{
try{
const now=ctx.currentTime;const osc=ctx.createOscillator();const gain=ctx.createGain();
osc.type='square';osc.frequency.setValueAtTime(freq,now);
gain.gain.setValueAtTime(0.0001,now);gain.gain.exponentialRampToValueAtTime((vol||0.05)*(v/100),now+0.005);
gain.gain.exponentialRampToValueAtTime(0.0001,now+dur);
osc.connect(gain);gain.connect(ctx.destination);osc.start(now);osc.stop(now+dur+0.02);
}catch(_){}
};
if(ctx.state==='suspended')ctx.resume().then(fire).catch(()=>{});else fire();
}catch(_){}
}

const BEST_KEY='nibbly-snake-best';

const DIFFICULTY={
easy:{speedMs:172,speedMin:112,growth:0,label:'snake.diff.easy'},
normal:{speedMs:132,speedMin:77,growth:2,label:'snake.diff.normal'},
hard:{speedMs:97,speedMin:57,growth:3,label:'snake.diff.hard'}
};

const Snake={
COLS:20,ROWS:20,
snake:[],dir:{x:1,y:0},nextDir:{x:1,y:0},inputQueue:[],
food:null,score:0,best:0,alive:false,paused:false,tabPaused:false,
state:'menu',difficulty:'normal',speedMs:132,speedMin:77,speedGrowth:2,
_loopId:null,_lastTick:0,_accumMs:0,
_countdownTimer:null,_countdownValue:0,
_graceTimer:0,_isInGrace:false,_graceDir:{x:1,y:0},

boardEl:null,scoreEl:null,bestEl:null,overlayEl:null,
overlayTitleEl:null,overlaySubEl:null,pauseBtnEl:null,
countdownEl:null,diffSegEl:null,startBtn:null,playAgainBtn:null,menuBtn:null,

_cells:[],_cellState:[],_particleLayer:null,
_keyHandler:null,_touchStart:null,_growTimer:null,

init(stage){
clearNode(stage);
this.best=this._loadBest();
this.snake=[];
this._cellState=[];
this.inputQueue=[];
this._graceTimer=0;
this._isInGrace=false;

const wrap=el('div',{class:'ng-snake'});

const header=el('div',{class:'ng-snake-header'});
const mkStat=(label,initial)=>{
const box=el('div',{class:'ng-snake-stat'});
box.appendChild(el('div',{class:'k',text:label}));
const val=el('div',{class:'v',text:initial});
box.appendChild(val);
return{box,val};
};
const scoreStat=mkStat(t('snake.score'),'0');
const bestStat=mkStat(t('snake.best'),String(this.best));
this.scoreEl=scoreStat.val;this.bestEl=bestStat.val;
header.appendChild(scoreStat.box);header.appendChild(bestStat.box);
const pauseBtn=el('button',{class:'ng-snake-icon-btn',html:icon('pause',16,'⏸')});
this.pauseBtnEl=pauseBtn;
header.appendChild(pauseBtn);
wrap.appendChild(header);

const board=el('div',{class:'ng-snake-board'});
this.boardEl=board;
this._cells=[];
this._cellState=[];
const total=this.COLS*this.ROWS;
for(let i=0;i<total;i++){
const c=el('div',{class:'ng-snake-cell'});
board.appendChild(c);
this._cells.push(c);
this._cellState.push('empty');
}

this._particleLayer=el('div',{class:'ng-snake-particles'});
board.appendChild(this._particleLayer);

this.countdownEl=el('div',{class:'ng-snake-countdown'});
this.countdownEl.style.display='none';
board.appendChild(this.countdownEl);

const overlay=el('div',{class:'ng-snake-overlay'});
this.overlayTitleEl=el('h3',{class:'ng-snake-overlay-title',text:t('snake.difficulty')});
this.overlaySubEl=el('p',{class:'ng-snake-overlay-sub',text:t('snake.hint')});

const diffSeg=el('div',{class:'ng-snake-diff'});
['easy','normal','hard'].forEach(id=>{
diffSeg.appendChild(el('button',{
class:'ng-snake-diff-btn'+(id===this.difficulty?' active':''),
type:'button','data-diff':id,text:t(DIFFICULTY[id].label)
}));
});
this.diffSegEl=diffSeg;
overlay.appendChild(this.overlayTitleEl);
overlay.appendChild(diffSeg);
overlay.appendChild(this.overlaySubEl);

const overlayActions=el('div',{class:'ng-snake-overlay-actions'});
this.startBtn=el('button',{class:'ng-btn ng-btn-primary',text:t('snake.start')});
overlayActions.appendChild(this.startBtn);
this.playAgainBtn=el('button',{class:'ng-btn ng-btn-primary',text:t('snake.playagain')});
this.playAgainBtn.style.display='none';
overlayActions.appendChild(this.playAgainBtn);
this.menuBtn=el('button',{class:'ng-btn',text:t('snake.menu')});
this.menuBtn.style.display='none';
overlayActions.appendChild(this.menuBtn);
overlay.appendChild(overlayActions);
this.overlayEl=overlay;
board.appendChild(overlay);

wrap.appendChild(board);

const dpad=el('div',{class:'ng-snake-dpad'});
const mkDirBtn=(dir,label)=>{
const b=el('button',{class:'ng-snake-dpad-btn',type:'button',text:label,'data-dir':dir});
b.addEventListener('pointerdown',(e)=>{e.preventDefault();this.setDir(dir);});
return b;
};
dpad.appendChild(el('div',{class:'ng-snake-dpad-spacer'}));
dpad.appendChild(mkDirBtn('up',t('snake.dir.up')));
dpad.appendChild(el('div',{class:'ng-snake-dpad-spacer'}));
dpad.appendChild(mkDirBtn('left',t('snake.dir.left')));
dpad.appendChild(el('div',{class:'ng-snake-dpad-center'}));
dpad.appendChild(mkDirBtn('right',t('snake.dir.right')));
dpad.appendChild(el('div',{class:'ng-snake-dpad-spacer'}));
dpad.appendChild(mkDirBtn('down',t('snake.dir.down')));
dpad.appendChild(el('div',{class:'ng-snake-dpad-spacer'}));
wrap.appendChild(dpad);

stage.appendChild(wrap);

this.startBtn.addEventListener('click',()=>this.startWithDifficulty());
this.playAgainBtn.addEventListener('click',()=>this.startWithDifficulty());
this.menuBtn.addEventListener('click',()=>this._showMenu());
pauseBtn.addEventListener('click',()=>{
if(this.state==='playing'||this.state==='countdown'||this.state==='paused')this.togglePause();
});

diffSeg.addEventListener('click',e=>{
const b=e.target.closest('.ng-snake-diff-btn');
if(!b)return;
this.difficulty=b.dataset.diff;
diffSeg.querySelectorAll('.ng-snake-diff-btn').forEach(x=>{
x.classList.toggle('active',x===b);
});
});

this._bindKeys();
this._bindSwipe(board);
this._showMenu();
},

_showMenu(){
this.state='menu';
this.alive=false;
this.paused=false;
this.tabPaused=false;
this._stopLoop();
this._clearCountdown();
if(this.boardEl)this.boardEl.classList.remove('ng-snake-dying','ng-paused','ng-snake-grow');
if(!this.snake)this.snake=[];
this._render();
if(this.overlayEl){
this.overlayEl.style.display='flex';
this.overlayTitleEl.textContent=t('snake.difficulty');
this.overlaySubEl.textContent=t('snake.hint');
}
if(this.diffSegEl)this.diffSegEl.style.display='flex';
if(this.startBtn)this.startBtn.style.display='';
if(this.playAgainBtn)this.playAgainBtn.style.display='none';
if(this.menuBtn)this.menuBtn.style.display='none';
if(this.pauseBtnEl)this.pauseBtnEl.innerHTML=icon('pause',16,'⏸');
},

startWithDifficulty(){
const cfg=DIFFICULTY[this.difficulty]||DIFFICULTY.normal;
this.speedMs=cfg.speedMs;
this.speedMin=cfg.speedMin;
this.speedGrowth=cfg.growth;
if(this.overlayEl)this.overlayEl.style.display='none';
if(this.boardEl)this.boardEl.classList.remove('ng-snake-dying');
this.newGame();
},

newGame(){
this._stopLoop();
this._clearCountdown();
this._clearGrowTimer();
if(this.boardEl)this.boardEl.classList.remove('ng-snake-dying');
this.snake=[
{r:10,c:10},
{r:10,c:9},
{r:10,c:8}
];
this.dir={x:1,y:0};
this.nextDir={x:1,y:0};
this.inputQueue=[];
this.score=0;
this.alive=true;
this.paused=false;
this.tabPaused=false;
this.state='countdown';
this._accumMs=0;
this._graceTimer=0;
this._isInGrace=false;
if(this.pauseBtnEl)this.pauseBtnEl.innerHTML=icon('pause',16,'⏸');
if(this.boardEl)this.boardEl.classList.remove('ng-paused');
this._spawnFood();
this._updateScoreUI();
this._render();
this._startCountdown(3);
},

_startCountdown(seconds){
this._clearCountdown();
this._countdownValue=seconds;
if(this.countdownEl){
this.countdownEl.style.display='flex';
this.countdownEl.classList.remove('go');
this.countdownEl.textContent=String(seconds);
}
const start=performance.now();
const totalMs=seconds*1000;
const step=()=>{
if(this.state!=='countdown')return;
const elapsed=performance.now()-start;
const remaining=Math.max(0,totalMs-elapsed);
this._countdownValue=remaining/1000;

if(remaining>0){
if(this.countdownEl){
const val=Math.ceil(this._countdownValue);
if(val>0)this.countdownEl.textContent=String(val);
}
this._countdownTimer=setTimeout(step,50);
}else{
this._clearCountdown();
this.state='playing';
this._lastTick=performance.now();
this._accumMs=0;
this._startLoop();
}
};
step();
},

_clearCountdown(){
if(this._countdownTimer){clearTimeout(this._countdownTimer);this._countdownTimer=null;}
if(this.countdownEl)this.countdownEl.style.display='none';
this._countdownValue=0;
},

_loadBest(){
try{const v=parseInt(localStorage.getItem(BEST_KEY)||'0',10);return isFinite(v)&&v>0?v:0;}catch(_){return 0;}
},
_saveBest(){
try{localStorage.setItem(BEST_KEY,String(this.best));}catch(_){}
},

_spawnFood(){
const occupied=new Set();
this.snake.forEach(s=>occupied.add(s.r+','+s.c));
const empty=[];
for(let r=0;r<this.ROWS;r++)for(let c=0;c<this.COLS;c++){
if(!occupied.has(r+','+c))empty.push({r,c});
}
if(!empty.length){this._win();return;}
this.food=empty[Math.floor(Math.random()*empty.length)];
},

_startLoop(){
if(this._loopId)return;
this._lastTick=performance.now();
this._accumMs=0;
const tick=(now)=>{
this._loopId=null;
if(this.state!=='playing'||this.paused||this.tabPaused)return;
const dt=now-this._lastTick;
this._lastTick=now;
this._accumMs+=dt;
let steps=0;
while(this._accumMs>=this.speedMs&&steps<4&&this.state==='playing'){
this._accumMs-=this.speedMs;
this._step();
steps++;
}
this._render();
if(this.state==='playing'&&!this.paused&&!this.tabPaused){
this._loopId=requestAnimationFrame(tick);
}
};
this._loopId=requestAnimationFrame(tick);
},
_stopLoop(){
if(this._loopId){cancelAnimationFrame(this._loopId);this._loopId=null;}
},

_step(){
if(!this.snake||!this.snake.length)return;
if(this._isInGrace){
this._graceTimer-=this.speedMs/1000;
if(this._graceTimer<=0){
this._isInGrace=false;
this._gameOver();
return;
}
this.dir=this._graceDir;
}else{
if(this.inputQueue.length>0){
const nd=this.inputQueue.shift();
if((nd.x!==-this.dir.x||nd.y!==-this.dir.y)&&(nd.x!==this.dir.x||nd.y!==this.dir.y)){
this.dir=nd;
}
}
}

const head=this.snake[0];
const nr=head.r+this.dir.y;
const nc=head.c+this.dir.x;

if(nr<0||nr>=this.ROWS||nc<0||nc>=this.COLS){
if(!this._isInGrace){
this._isInGrace=true;
this._graceTimer=0.2;
this._graceDir=this.dir;
}
return;
}

for(let i=0;i<this.snake.length-1;i++){
if(this.snake[i].r===nr&&this.snake[i].c===nc){
if(!this._isInGrace){
this._isInGrace=true;
this._graceTimer=0.2;
this._graceDir=this.dir;
}
return;
}
}

this._isInGrace=false;
const ateFood=this.food&&nr===this.food.r&&nc===this.food.c;
this.snake.unshift({r:nr,c:nc});

if(ateFood){
this.score+=10;
if(this.score>this.best){this.best=this.score;this._saveBest();}
this._updateScoreUI();
beep(880,0.05,0.05);
if(!noEffects())this._spawnParticles(nc,nr,18,'#ff6b7a');
this._growGlow();
this.food=null;
this._spawnFood();
if(this.speedMs>this.speedMin)this.speedMs-=this.speedGrowth;
}else{
this.snake.pop();
}
},

_render(){
const cells=this._cells;
const states=this._cellState;
if(!cells||!cells.length)return;

const next=new Array(cells.length).fill('empty');
if(this.snake&&this.snake.length){
for(let i=0;i<this.snake.length;i++){
const s=this.snake[i];
const idx=s.r*this.COLS+s.c;
if(idx>=0&&idx<cells.length)next[idx]=i===0?'head':'body';
}
}
if(this.food){
const idx=this.food.r*this.COLS+this.food.c;
if(idx>=0&&idx<cells.length)next[idx]='food';
}
for(let i=0;i<cells.length;i++){
if(states[i]===next[i])continue;
const c=cells[i];
c.classList.toggle('ng-snake-body',next[i]==='body');
c.classList.toggle('ng-snake-head',next[i]==='head');
c.classList.toggle('ng-snake-food',next[i]==='food');
states[i]=next[i];
}
},

_updateScoreUI(){
if(this.scoreEl)this.scoreEl.textContent=String(this.score);
if(this.bestEl)this.bestEl.textContent=String(this.best);
},

_spawnParticles(col,row,count,color){
if(!this._particleLayer||!this.boardEl)return;
if(noEffects())return;
const rect=this.boardEl.getBoundingClientRect();
const cellW=rect.width/this.COLS;
const cellH=rect.height/this.ROWS;
const cx=(col+0.5)*cellW;
const cy=(row+0.5)*cellH;
for(let i=0;i<count;i++){
const p=el('div',{class:'ng-snake-particle'});
p.style.left=cx+'px';p.style.top=cy+'px';
p.style.background=color;p.style.color=color;
const ang=Math.random()*Math.PI*2;
const dist=18+Math.random()*40;
p.style.setProperty('--dx',(Math.cos(ang)*dist)+'px');
p.style.setProperty('--dy',(Math.sin(ang)*dist)+'px');
const size=2+Math.random()*3;
p.style.width=size+'px';p.style.height=size+'px';
this._particleLayer.appendChild(p);
setTimeout(()=>{try{p.remove();}catch(_){}},700);
}
},
_clearParticles(){if(this._particleLayer)this._particleLayer.innerHTML='';},

_growGlow(){
if(!this.boardEl||noEffects())return;
this.boardEl.classList.remove('ng-snake-grow');
void this.boardEl.offsetWidth;
this.boardEl.classList.add('ng-snake-grow');
this._clearGrowTimer();
this._growTimer=setTimeout(()=>{if(this.boardEl)this.boardEl.classList.remove('ng-snake-grow');},450);
},
_clearGrowTimer(){if(this._growTimer){clearTimeout(this._growTimer);this._growTimer=null;}},

_gameOver(){
this.alive=false;this.state='over';
this._stopLoop();this._clearCountdown();
if(this.snake&&this.snake.length){
if(!noEffects())this.snake.forEach(seg=>this._spawnParticles(seg.c,seg.r,6,'#22d3a6'));
}
if(this.boardEl)this.boardEl.classList.add('ng-snake-dying');
this.snake=[];
this._render();
beep(220,0.18,0.06);
setTimeout(()=>beep(160,0.22,0.05),100);
setTimeout(()=>{
this._showGameOver(t('snake.gameover'),t('snake.score')+': '+this.score);
},noEffects()?120:420);
},
_win(){
this.alive=false;this.state='over';
this._stopLoop();this._clearCountdown();
beep(880,0.15,0.06);
setTimeout(()=>beep(1100,0.15,0.06),100);
this._showGameOver(t('snake.youwin'),t('snake.score')+': '+this.score);
},
_showGameOver(title,sub){
if(!this.overlayEl)return;
this.overlayTitleEl.textContent=title;
this.overlaySubEl.textContent=sub;
if(this.diffSegEl)this.diffSegEl.style.display='none';
if(this.startBtn)this.startBtn.style.display='none';
if(this.playAgainBtn)this.playAgainBtn.style.display='';
if(this.menuBtn)this.menuBtn.style.display='';
this.overlayEl.style.display='flex';
},

togglePause(){
if(this.state==='playing'||this.state==='countdown')this._enterPause();
else if(this.state==='paused')this._exitPause();
},
_enterPause(){
if(this.state==='paused')return;
this._prevState=this.state;
this.state='paused';
this._stopLoop();this._clearCountdown();
if(this.overlayEl){
this.overlayEl.style.display='flex';
this.overlayTitleEl.textContent=t('snake.paused');
this.overlaySubEl.textContent=t('snake.score')+': '+this.score;
if(this.diffSegEl)this.diffSegEl.style.display='none';

if(this.startBtn)this.startBtn.style.display='none';
if(this.playAgainBtn){
this.playAgainBtn.style.display='';
this.playAgainBtn.textContent=t('snake.playagain');
}
if(this.menuBtn)this.menuBtn.style.display='';
}
if(this.pauseBtnEl)this.pauseBtnEl.innerHTML=icon('play',16,'▶');
if(this.boardEl)this.boardEl.classList.add('ng-paused');
beep(500,0.05,0.04);
},
_exitPause(){
if(this.state!=='paused')return;
if(this.overlayEl)this.overlayEl.style.display='none';
if(this.boardEl)this.boardEl.classList.remove('ng-paused');
if(this.pauseBtnEl)this.pauseBtnEl.innerHTML=icon('pause',16,'⏸');
if(this._prevState==='countdown'){
this.state='countdown';this._startCountdown(3);
}else{
this.state='playing';
this._lastTick=performance.now();this._accumMs=0;
this._startLoop();
}
beep(800,0.05,0.04);
},

pause(){
if(this.state!=='playing'&&this.state!=='countdown')return;
this.tabPaused=true;
this._stopLoop();this._clearCountdown();
if(this.overlayEl){
this.overlayEl.style.display='flex';
this.overlayTitleEl.textContent=t('snake.paused');
this.overlaySubEl.textContent=t('snake.score')+': '+this.score;
if(this.diffSegEl)this.diffSegEl.style.display='none';
if(this.startBtn)this.startBtn.style.display='none';
if(this.playAgainBtn){
this.playAgainBtn.style.display='';
this.playAgainBtn.textContent=t('snake.playagain');
}
if(this.menuBtn)this.menuBtn.style.display='';
}
if(this.pauseBtnEl)this.pauseBtnEl.innerHTML=icon('play',16,'▶');
if(this.boardEl)this.boardEl.classList.add('ng-paused');
},
resume(){
if(!this.tabPaused)return;
this.tabPaused=false;
if(this.overlayEl)this.overlayEl.style.display='none';
if(this.boardEl)this.boardEl.classList.remove('ng-paused');
if(this.pauseBtnEl)this.pauseBtnEl.innerHTML=icon('pause',16,'⏸');
if(this.state==='playing'){
this._lastTick=performance.now();this._accumMs=0;
this._startLoop();
}else if(this.state==='countdown'){
this._startCountdown(3);
}
},

setDir(dir){
const map={up:{x:0,y:-1},down:{x:0,y:1},left:{x:-1,y:0},right:{x:1,y:0}};
const d=map[dir];
if(!d)return;
if(this._isInGrace){
if((d.x!==-this._graceDir.x||d.y!==-this._graceDir.y)&&(d.x!==this._graceDir.x||d.y!==this._graceDir.y)){
this._graceDir=d;this.dir=d;this._isInGrace=false;this._graceTimer=0;
}
return;
}
const lastDir=this.inputQueue.length>0?this.inputQueue[this.inputQueue.length-1]:this.dir;
if((d.x!==-lastDir.x||d.y!==-lastDir.y)&&(d.x!==lastDir.x||d.y!==lastDir.y)){
if(this.inputQueue.length<2){this.inputQueue.push(d);}
}
},

_bindKeys(){
if(this._keyHandler)document.removeEventListener('keydown',this._keyHandler);
this._keyHandler=(e)=>{
if(!this.boardEl||!this.boardEl.isConnected)return;
const stg=this.boardEl.closest('.ng-stage');
if(!stg||!stg.classList.contains('active'))return;
const k=e.key;
if(this.state!=='playing'&&this.state!=='countdown'){
if((k==='p'||k==='P'||k==='Escape')&&this.state==='paused'){e.preventDefault();this._exitPause();}
return;
}
if(k==='ArrowUp'||k==='w'||k==='W'){e.preventDefault();this.setDir('up');}
else if(k==='ArrowDown'||k==='s'||k==='S'){e.preventDefault();this.setDir('down');}
else if(k==='ArrowLeft'||k==='a'||k==='A'){e.preventDefault();this.setDir('left');}
else if(k==='ArrowRight'||k==='d'||k==='D'){e.preventDefault();this.setDir('right');}
else if(k==='p'||k==='P'||k==='Escape'){e.preventDefault();this.togglePause();}
};
document.addEventListener('keydown',this._keyHandler);
},

_bindSwipe(board){
board.addEventListener('touchstart',(e)=>{
if(this.state!=='playing'&&this.state!=='countdown')return;
const touch=e.touches[0];
this._touchStart={x:touch.clientX,y:touch.clientY};
},{passive:true});
board.addEventListener('touchend',(e)=>{
if(!this._touchStart)return;
const touch=e.changedTouches[0];
const dx=touch.clientX-this._touchStart.x;
const dy=touch.clientY-this._touchStart.y;
this._touchStart=null;
if(Math.abs(dx)<24&&Math.abs(dy)<24)return;
if(Math.abs(dx)>Math.abs(dy)){this.setDir(dx>0?'right':'left');}
else{this.setDir(dy>0?'down':'up');}
},{passive:true});
},

destroy(){
this._stopLoop();this._clearCountdown();this._clearGrowTimer();this._clearParticles();
if(this._keyHandler)document.removeEventListener('keydown',this._keyHandler);
}
};

function register(){
if(!window.NibblyGames||typeof window.NibblyGames.extend!=='function')return false;
const ok=window.NibblyGames.extend({
id:'snake',label:()=>t('tab.snake'),init:(stage)=>Snake.init(stage),pause:()=>Snake.pause(),resume:()=>Snake.resume()
});
if(ok&&console&&console.debug)console.debug('[NibblySnake] Snake registered (v1.5.1).');
return ok;
}
if(!register()){
let tries=0;
const iv=setInterval(()=>{tries++;if(register()||tries>50)clearInterval(iv);},100);
}

window.NibblyModules=window.NibblyModules||{};
if(!window.NibblyModules['snake']){
window.NibblyModules['snake']={id:'snake',version:'1.5.1',init:function(){return{refresh:function(){},destroy:function(){}};}};
}
})();