(function(){
'use strict';


function icon(name,size,fallback){
if(window.NibblyIcons){
const html=window.NibblyIcons.get(name,{size:size||18});
if(html)return html;
}
return fallback||'';
}

function getLang(){
try{
const s=JSON.parse(localStorage.getItem('nibbly-settings-v2')||'{}');
return s.lang==='en'?'en':'es';
}catch(e){return'es';}
}
const I18N={
es:{
'tab.pong':'Pong',
'tab.popit':'Pop It!',
'pong.mode.classic':'Clásico (a 10)',
'pong.mode.infinity':'Infinito',
'pong.players1':'1 Jugador',
'pong.players2':'2 Jugadores',
'pong.selectPlayers':'Modo de juego',
'pong.timer.go':'¡GO!',
'pong.play':'Jugar',
'pong.win':'¡Ganaste!',
'pong.winP1':'¡Ganó P1!',
'pong.winP2':'¡Ganó P2!',
'pong.lose':'Perdiste',
'pong.draw':'Empate',
'pong.surrender':'Rendirse',
'pong.playAgain':'Jugar de nuevo',
'pong.selectMode':'Selecciona modo',
'pong.hint':'P1: ← → o A/D · La IA cambia de dificultad.',
'pong.hint2p':'P1: ← → · P2: A / D',
'pong.aiAhead':'La IA te sacó 5 puntos',
'pong.pause':'Pausa',
'pong.resume':'Reanudar',
'pong.paused':'Pausado',
'pong.quit':'Salir al menú',
'popit.title':'¡Pop It!',
'popit.flip':'Voltear',
'popit.reset':'Reiniciar',
'popit.hint':'Presiona las burbujas. Voltea para ver el otro lado.',
'popit.complete':'¡Todas explotadas!',
'popit.progress':'Explotadas {0}/{1}'
},
en:{
'tab.pong':'Pong',
'tab.popit':'Pop It!',
'pong.mode.classic':'Classic (first to 10)',
'pong.mode.infinity':'Infinity',
'pong.players1':'1 Player',
'pong.players2':'2 Players',
'pong.selectPlayers':'Game mode',
'pong.timer.go':'GO!',
'pong.play':'Play',
'pong.win':'You win!',
'pong.winP1':'P1 wins!',
'pong.winP2':'P2 wins!',
'pong.lose':'You lose',
'pong.draw':'Draw',
'pong.surrender':'Surrender',
'pong.playAgain':'Play again',
'pong.selectMode':'Choose mode',
'pong.hint':'P1: ← → or A/D · The AI changes difficulty.',
'pong.hint2p':'P1: ← → · P2: A / D',
'pong.aiAhead':'The AI got 5 ahead',
'pong.pause':'Pause',
'pong.resume':'Resume',
'pong.paused':'Paused',
'pong.quit':'Back to menu',
'pong.aiAhead':'The AI got 5 ahead',
'pong.mode.classic.short':'Classic',
'pong.mode.infinity.short':'Infinity',
'pong.players1.short':'1P',
'pong.players2.short':'2P',
'pong.modeLabel.classic':'Classic · {0}',
'pong.modeLabel.infinity':'Infinity · {0}',
'popit.title':'Pop It!',
'popit.flip':'Flip',
'popit.reset':'Reset',
'popit.hint':'Press the bubbles. Flip to see the other side.',
'popit.complete':'All popped!',
'popit.progress':'Popped {0}/{1}'
}
};
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
}else if(k.startsWith('data-')||k.startsWith('aria-')){
node.setAttribute(k,attrs[k]);
}else node[k]=attrs[k];
}
if(children){
if(Array.isArray(children))children.forEach(c=>c&&node.appendChild(c));
else if(typeof children==='string')node.textContent=children;
else node.appendChild(children);
}
return node;
}
function clearNode(n){while(n.firstChild)n.removeChild(n.firstChild);}

function soundAllowed(){
try{
const s=JSON.parse(localStorage.getItem('nibbly-settings-v2')||'{}');
if(!s.sounds)return 0;
const v=Number(s.soundVolume);
return isFinite(v)&&v>0?v/100:0;
}catch(e){return 0;}
}
let _audioCtx=null;
function beep(freq,dur,vol){
const v=soundAllowed();
if(v<=0)return;
try{
if(!_audioCtx){
const AC=window.AudioContext||window.webkitAudioContext;
if(!AC)return;
_audioCtx=new AC();
}
if(_audioCtx.state==='suspended')_audioCtx.resume().catch(()=>{});
const ctx=_audioCtx;
const now=ctx.currentTime;
const osc=ctx.createOscillator();
const gain=ctx.createGain();
osc.type='square';
osc.frequency.setValueAtTime(freq,now);
gain.gain.setValueAtTime(0.0001,now);
gain.gain.exponentialRampToValueAtTime((vol||0.05)*v,now+0.005);
gain.gain.exponentialRampToValueAtTime(0.0001,now+dur);
osc.connect(gain);gain.connect(ctx.destination);
osc.start(now);osc.stop(now+dur+0.02);
}catch(_){}
}


const Pong={
canvas:null,ctx:null,wrap:null,stageEl:null,dpr:1,
W:320,H:420,

paddleW:70,paddleH:10,
paddleY_player:0,paddleY_ai:0,
paddlePlayerX:0,paddleAiX:0,
ball:{x:0,y:0,vx:0,vy:0,r:7},
particles:[],

state:'menu',
gameMode:'classic',
playersCount:1,
_scoreP:0,_scoreA:0,
countdownTimer:3.5,
_launchToward:'player',
_ballSpeed:200,

_aiState:'normal',
_aiStateTimer:3,
_aiTargetX:null,
_aiTargetTimer:0,

_leftPressed:false,
_rightPressed:false,
_upPressed:false,
_downPressed:false,
_aPressed:false,
_dPressed:false,

_scorePEl:null,_scoreAEl:null,_modeEl:null,
_menuEl:null,_overEl:null,_pauseEl:null,
_overTitleEl:null,_overSubEl:null,
_surrenderBtn:null,_pauseBtn:null,_resumeBtn:null,_pauseQuitBtn:null,
_topControlsEl:null,
_menuPlayersSeg:null,
_menuModeSeg:null,
_hintEl:null,

_raf:null,_lastT:0,_running:false,_pausedFromTab:false,
_keyHandler:null,_keyUpHandler:null,_resizeHandler:null,

init(stage){
clearNode(stage);
const wrap=el('div',{class:'ng-pong'});
this.wrap=wrap;

const header=el('div',{class:'ng-pong-header'});
const scorebox=el('div',{class:'ng-pong-scorebox'});
const scoresRow=el('div',{class:'ng-pong-scores'});
this._scorePEl=el('div',{class:'ng-pong-score',text:'0'});
this._scoreAEl=el('div',{class:'ng-pong-score ng-pong-score-ai',text:'0'});
scoresRow.appendChild(this._scorePEl);
scoresRow.appendChild(el('div',{class:'ng-pong-vs',text:'—'}));
scoresRow.appendChild(this._scoreAEl);
scorebox.appendChild(scoresRow);
this._modeEl=el('div',{class:'ng-pong-mode',text:''});
scorebox.appendChild(this._modeEl);
header.appendChild(scorebox);
wrap.appendChild(header);

const topControls=el('div',{class:'ng-pong-top-controls'});
const p2Left=el('button',{class:'ng-pong-btn ng-pong-btn-p2',text:'◀'});
const p2Right=el('button',{class:'ng-pong-btn ng-pong-btn-p2',text:'▶'});
topControls.appendChild(p2Left);
topControls.appendChild(p2Right);
topControls.style.display='none';
this._topControlsEl=topControls;
wrap.appendChild(topControls);

const stageEl=el('div',{class:'ng-pong-stage'});
const canvas=document.createElement('canvas');
canvas.className='ng-pong-canvas';
stageEl.appendChild(canvas);
this.canvas=canvas;
this.ctx=canvas.getContext('2d');
this.stageEl=stageEl;

const menu=el('div',{class:'ng-pong-overlay'});
menu.appendChild(el('h3',{class:'ng-pong-menu-title',text:t('pong.selectPlayers')}));

const playersSeg=el('div',{class:'ng-pong-menu-seg'});
const btnP1=el('button',{class:'ng-pong-seg-btn active',text:t('pong.players1')});
const btnP2=el('button',{class:'ng-pong-seg-btn',text:t('pong.players2')});
playersSeg.appendChild(btnP1);
playersSeg.appendChild(btnP2);
menu.appendChild(playersSeg);
this._menuPlayersSeg=playersSeg;

menu.appendChild(el('h3',{class:'ng-pong-menu-title',text:t('pong.selectMode'),style:{marginTop:'10px'}}));
const modeSeg=el('div',{class:'ng-pong-menu-seg'});
const btnClassic=el('button',{class:'ng-pong-seg-btn active',text:t('pong.mode.classic')});
const btnInfinity=el('button',{class:'ng-pong-seg-btn',text:t('pong.mode.infinity')});
modeSeg.appendChild(btnClassic);
modeSeg.appendChild(btnInfinity);
menu.appendChild(modeSeg);
this._menuModeSeg=modeSeg;


const startBtn=el('button',{
class:'ng-pong-menu-btn',
html:icon('games',14,'▶')+' '+t('pong.play'),
style:{marginTop:'14px'}
});
menu.appendChild(startBtn);

stageEl.appendChild(menu);
this._menuEl=menu;

let selPlayers=1;
let selMode='classic';

const updateSeg=(seg,activeBtn)=>{
seg.querySelectorAll('.ng-pong-seg-btn').forEach(b=>b.classList.toggle('active',b===activeBtn));
};
btnP1.addEventListener('click',()=>{
selPlayers=1;
updateSeg(playersSeg,btnP1);
this.playersCount=1;
this._updateHint();
});
btnP2.addEventListener('click',()=>{
selPlayers=2;
updateSeg(playersSeg,btnP2);
this.playersCount=2;
this._updateHint();
});
btnClassic.addEventListener('click',()=>{selMode='classic';updateSeg(modeSeg,btnClassic);});
btnInfinity.addEventListener('click',()=>{selMode='infinity';updateSeg(modeSeg,btnInfinity);});
startBtn.addEventListener('click',()=>this.newGame(selMode,selPlayers));

this._resetMenuSelectors=()=>{
selPlayers=1;
selMode='classic';
updateSeg(playersSeg,btnP1);
updateSeg(modeSeg,btnClassic);
this.playersCount=1;
this.gameMode='classic';
};

const over=el('div',{class:'ng-pong-overlay'});
this._overTitleEl=el('h3',{class:'ng-pong-menu-title',text:''});
this._overSubEl=el('p',{class:'ng-pong-menu-sub',text:''});
const btnRestart=el('button',{class:'ng-pong-menu-btn',text:t('pong.playAgain')});
over.appendChild(this._overTitleEl);
over.appendChild(this._overSubEl);
over.appendChild(btnRestart);
over.style.display='none';
stageEl.appendChild(over);
this._overEl=over;

const pauseOverlay=el('div',{class:'ng-pong-overlay'});
pauseOverlay.appendChild(el('h3',{class:'ng-pong-menu-title',text:t('pong.paused')}));

this._resumeBtn=el('button',{
class:'ng-pong-menu-btn',
html:icon('play',14,'▶')+' '+t('pong.resume')
});
this._pauseQuitBtn=el('button',{class:'ng-pong-menu-btn ng-pong-menu-btn-quit',text:t('pong.quit')});
pauseOverlay.appendChild(this._resumeBtn);
pauseOverlay.appendChild(this._pauseQuitBtn);
pauseOverlay.style.display='none';
stageEl.appendChild(pauseOverlay);
this._pauseEl=pauseOverlay;

wrap.appendChild(stageEl);

const controls=el('div',{class:'ng-pong-controls'});
const leftBtn=el('button',{class:'ng-pong-btn',text:'◀'});
const rightBtn=el('button',{class:'ng-pong-btn',text:'▶'});
controls.appendChild(leftBtn);
controls.appendChild(rightBtn);
wrap.appendChild(controls);

const actionsRow=el('div',{class:'ng-pong-actions'});

const pauseBtn=el('button',{
class:'ng-pong-pause',
html:icon('pause',14,'⏸')+' '+t('pong.pause')
});
pauseBtn.style.display='none';
actionsRow.appendChild(pauseBtn);
this._pauseBtn=pauseBtn;


const surrender=el('button',{
class:'ng-pong-surrender',
html:icon('red-flag',14,'🏳️')+' '+t('pong.surrender')
});
surrender.style.display='none';
actionsRow.appendChild(surrender);
this._surrenderBtn=surrender;

wrap.appendChild(actionsRow);

this._hintEl=el('div',{class:'ng-hint',text:t('pong.hint')});
wrap.appendChild(this._hintEl);
stage.appendChild(wrap);
this._updateHint();

btnRestart.addEventListener('click',()=>this.showMenu());
surrender.addEventListener('click',()=>this.endGame('manual'));
pauseBtn.addEventListener('click',()=>this.userPause());
this._resumeBtn.addEventListener('click',()=>this.userResume());
this._pauseQuitBtn.addEventListener('click',()=>this.showMenu());

const pressLeft=(e)=>{e.preventDefault();this._leftPressed=true;};
const relLeft=(e)=>{e.preventDefault();this._leftPressed=false;};
const pressRight=(e)=>{e.preventDefault();this._rightPressed=true;};
const relRight=(e)=>{e.preventDefault();this._rightPressed=false;};
leftBtn.addEventListener('pointerdown',pressLeft);
leftBtn.addEventListener('pointerup',relLeft);
leftBtn.addEventListener('pointerleave',relLeft);
leftBtn.addEventListener('pointercancel',relLeft);
rightBtn.addEventListener('pointerdown',pressRight);
rightBtn.addEventListener('pointerup',relRight);
rightBtn.addEventListener('pointerleave',relRight);
rightBtn.addEventListener('pointercancel',relRight);

const pressP2L=(e)=>{
e.preventDefault();
if(this.playersCount===2)this._aPressed=true;
};
const relP2L=(e)=>{
e.preventDefault();
if(this.playersCount===2)this._aPressed=false;
};
const pressP2R=(e)=>{
e.preventDefault();
if(this.playersCount===2)this._dPressed=true;
};
const relP2R=(e)=>{
e.preventDefault();
if(this.playersCount===2)this._dPressed=false;
};
p2Left.addEventListener('pointerdown',pressP2L);
p2Left.addEventListener('pointerup',relP2L);
p2Left.addEventListener('pointerleave',relP2L);
p2Left.addEventListener('pointercancel',relP2L);
p2Right.addEventListener('pointerdown',pressP2R);
p2Right.addEventListener('pointerup',relP2R);
p2Right.addEventListener('pointerleave',relP2R);
p2Right.addEventListener('pointercancel',relP2R);

if(this._keyHandler)document.removeEventListener('keydown',this._keyHandler);
if(this._keyUpHandler)document.removeEventListener('keyup',this._keyUpHandler);

this._keyHandler=(e)=>{
if(!this.canvas||!this.canvas.isConnected)return;
const stg=this.canvas.closest('.ng-stage');
if(!stg||!stg.classList.contains('active'))return;

const k=e.key;
const lower=k.toLowerCase();

if(this.playersCount===1){
if(k==='ArrowLeft'||lower==='a'){e.preventDefault();this._leftPressed=true;}
else if(k==='ArrowRight'||lower==='d'){e.preventDefault();this._rightPressed=true;}
}else{
if(k==='ArrowLeft'){e.preventDefault();this._leftPressed=true;}
else if(k==='ArrowRight'){e.preventDefault();this._rightPressed=true;}
else if(lower==='a'){e.preventDefault();this._aPressed=true;}
else if(lower==='d'){e.preventDefault();this._dPressed=true;}
}

if(k===' '||k==='Enter'){
e.preventDefault();
if(this.state==='menu'){
const firstBtn=this._menuEl.querySelector('.ng-pong-menu-btn');
if(firstBtn)firstBtn.click();
}
}else if(lower==='p'||k==='Escape'){
if(this.state==='playing'||this.state==='countdown'){
e.preventDefault();
this.userPause();
}else if(this.state==='paused'){
e.preventDefault();
this.userResume();
}
}
};
this._keyUpHandler=(e)=>{
const k=e.key;
const lower=k.toLowerCase();
if(this.playersCount===1){
if(k==='ArrowLeft'||lower==='a')this._leftPressed=false;
else if(k==='ArrowRight'||lower==='d')this._rightPressed=false;
}else{
if(k==='ArrowLeft')this._leftPressed=false;
else if(k==='ArrowRight')this._rightPressed=false;
else if(lower==='a')this._aPressed=false;
else if(lower==='d')this._dPressed=false;
}
};
document.addEventListener('keydown',this._keyHandler);
document.addEventListener('keyup',this._keyUpHandler);

if(this._resizeHandler)window.removeEventListener('resize',this._resizeHandler);
this._resizeHandler=()=>this.resize();
window.addEventListener('resize',this._resizeHandler);

setTimeout(()=>{
this.resize();
this.showMenu();
},30);
},

resize(){
if(!this.canvas)return;
const parentW=this.stageEl?(this.stageEl.getBoundingClientRect().width||320):320;
const dpr=window.devicePixelRatio||1;
this.dpr=dpr;
const W=Math.min(parentW,360);
const H=Math.min(window.innerHeight*0.55,W*4/3);
this.canvas.style.width=W+'px';
this.canvas.style.height=H+'px';
this.canvas.width=Math.round(W*dpr);
this.canvas.height=Math.round(H*dpr);
this.W=W;
this.H=H;
this.ctx.setTransform(dpr,0,0,dpr,0,0);
this.updateLayout();
this.renderFrame();
},

updateLayout(){
const W=this.W,H=this.H;
this.paddleW=W*0.24;
this.paddleH=10;
this.paddleY_player=H-22;
this.paddleY_ai=12;
this.ball.r=Math.max(5,W*0.022);
this.paddlePlayerX=Math.max(0,Math.min(W-this.paddleW,this.paddlePlayerX));
this.paddleAiX=Math.max(0,Math.min(W-this.paddleW,this.paddleAiX));
},

_isHumiliation(){
if(this.gameMode==='classic'){
if(this._scoreP>=7&&this._scoreA===0)return'player';
if(this.playersCount===1&&this._scoreA>=7&&this._scoreP===0)return'ai';
return null;
}
if(this._scoreP-this._scoreA>=7)return'player';
return null;
},

_setPlayBtnsVisible(visible){
if(this._pauseBtn)this._pauseBtn.style.display=visible?'':'none';
if(this._surrenderBtn)this._surrenderBtn.style.display=visible?'':'none';
},

_updateHint(){
if(!this._hintEl)return;
this._hintEl.textContent=this.playersCount===2?t('pong.hint2p'):t('pong.hint');
},

_updateTopControls(){
if(!this._topControlsEl)return;
this._topControlsEl.style.display=this.playersCount===2?'flex':'none';
},

_resetPressed(){
this._leftPressed=false;
this._rightPressed=false;
this._upPressed=false;
this._downPressed=false;
this._aPressed=false;
this._dPressed=false;
},

showMenu(){
this._stopLoop();
this.state='menu';
this.gameMode='classic';
this.playersCount=1;
this._scoreP=0;
this._scoreA=0;
this.updateScoreUI();
this._menuEl.style.display='flex';
this._overEl.style.display='none';
if(this._pauseEl)this._pauseEl.style.display='none';
this._setPlayBtnsVisible(false);

if(this._pauseBtn){
this._pauseBtn.innerHTML=icon('pause',14,'⏸')+' '+t('pong.pause');
}
if(this._resumeBtn){
this._resumeBtn.innerHTML=icon('play',14,'▶')+' '+t('pong.resume');
}
this._updateTopControls();
this._updateHint();
if(typeof this._resetMenuSelectors==='function'){
this._resetMenuSelectors();
}
if(this._modeEl)this._modeEl.textContent='';
const W=this.W,H=this.H;
this.ball.x=W/2;
this.ball.y=H/2;
this.ball.vx=0;
this.ball.vy=0;
this.paddlePlayerX=(W-this.paddleW)/2;
this.paddleAiX=(W-this.paddleW)/2;
this.particles=[];
this._aiTargetX=null;
this._aiTargetTimer=0;
this._pausedFromTab=false;
this._resetPressed();
this.renderFrame();
},

newGame(mode,players){
this.gameMode=mode;
this.playersCount=players||1;
this._scoreP=0;
this._scoreA=0;
this.updateScoreUI();
this._menuEl.style.display='none';
this._overEl.style.display='none';
if(this._pauseEl)this._pauseEl.style.display='none';

if(this._pauseBtn){
this._pauseBtn.innerHTML=icon('pause',14,'⏸')+' '+t('pong.pause');
}
if(this._resumeBtn){
this._resumeBtn.innerHTML=icon('play',14,'▶')+' '+t('pong.resume');
}

if(mode==='infinity'){
if(this._surrenderBtn)this._surrenderBtn.style.display='';
if(this._pauseBtn)this._pauseBtn.style.display='';
}else{
if(this._surrenderBtn)this._surrenderBtn.style.display='none';
if(this._pauseBtn)this._pauseBtn.style.display='';
}

this._updateTopControls();
this._updateHint();

if(this._modeEl){
const modeStr=(mode==='infinity')?t('pong.mode.infinity'):t('pong.mode.classic');
const playersStr=(this.playersCount===2)?' · '+t('pong.players2'):'';
this._modeEl.textContent=modeStr+playersStr;
}

this.paddlePlayerX=(this.W-this.paddleW)/2;
this.paddleAiX=(this.W-this.paddleW)/2;
this._ballSpeed=200;
this._launchToward='player';
this._aiState=['easy','normal','hard'][Math.floor(Math.random()*3)];
this._aiStateTimer=3+Math.random()*3;
this._aiTargetX=null;
this._aiTargetTimer=0;
this.particles=[];
this._pausedFromTab=false;
this._resetPressed();
this.resetBall();
this._startLoop();
},

resetBall(){
const W=this.W,H=this.H;
this.ball.x=W/2;
this.ball.y=H/2;
this.ball.vx=0;
this.ball.vy=0;
this._ballSpeed=200;
this.countdownTimer=3.5;
this.state='countdown';
this._aiTargetX=null;
this._aiTargetTimer=0;
},

launchBall(){
const angle=(Math.random()-0.5)*Math.PI*0.7;
const speed=200;
let vx=Math.sin(angle)*speed;
let vy=Math.cos(angle)*speed;
if(this._launchToward==='ai')vy=-Math.abs(vy);
else vy=Math.abs(vy);
if(Math.abs(vx)<35)vx=(Math.random()<0.5?-1:1)*35;
this.ball.vx=vx;
this.ball.vy=vy;
this._ballSpeed=speed;
this.state='playing';
this._launchToward=null;
},

updateScoreUI(){
if(this._scorePEl)this._scorePEl.textContent=String(this._scoreP);
if(this._scoreAEl)this._scoreAEl.textContent=String(this._scoreA);
},

_startLoop(){
if(this._running)return;
this._running=true;
this._lastT=performance.now();
const tick=(t)=>{
if(!this._running)return;
const dt=Math.min(0.033,(t-this._lastT)/1000);
this._lastT=t;
this.update(dt);
this.renderFrame();
this._raf=requestAnimationFrame(tick);
};
this._raf=requestAnimationFrame(tick);
},

_stopLoop(){
this._running=false;
if(this._raf){cancelAnimationFrame(this._raf);this._raf=null;}
},

update(dt){
this.updateParticles(dt);

if(this.state==='countdown'||this.state==='playing'){
this.updatePlayer(dt);
if(this.playersCount===2)this.updateP2(dt);
}

if(this.state==='countdown'){
const prevText=this._countdownText();
this.countdownTimer-=dt;
const newText=this._countdownText();
if(newText!==prevText&&newText!==''){
beep(newText===t('pong.timer.go')?1000:800,0.06,0.05);
}
if(this.countdownTimer<=0)this.launchBall();
}else if(this.state==='playing'){
if(this.playersCount===1)this.updateAI(dt);
this.updateBall(dt);
}
},

_countdownText(){
const tt=this.countdownTimer;
if(tt>=2.5)return'3';
if(tt>=1.5)return'2';
if(tt>=0.5)return'1';
if(tt>=0.1)return t('pong.timer.go');
return'';
},

updatePlayer(dt){
if(this.state!=='playing'&&this.state!=='countdown')return;
const speed=440;
if(this._leftPressed)this.paddlePlayerX-=speed*dt;
if(this._rightPressed)this.paddlePlayerX+=speed*dt;
this.paddlePlayerX=Math.max(0,Math.min(this.W-this.paddleW,this.paddlePlayerX));
},

updateP2(dt){
if(this.state!=='playing'&&this.state!=='countdown')return;
const speed=440;
if(this._aPressed)this.paddleAiX-=speed*dt;
if(this._dPressed)this.paddleAiX+=speed*dt;
this.paddleAiX=Math.max(0,Math.min(this.W-this.paddleW,this.paddleAiX));
},

updateAI(dt){
this._aiStateTimer-=dt;
if(this._aiStateTimer<=0){
const states=['easy','normal','normal','hard','hard','veryhard'];
this._aiState=states[Math.floor(Math.random()*states.length)];
this._aiStateTimer=3+Math.random()*3;
}

const cfg={
easy:{speed:120,error:50,reaction:0.50,deadzone:22},
normal:{speed:190,error:22,reaction:0.75,deadzone:14},
hard:{speed:280,error:10,reaction:0.88,deadzone:8},
veryhard:{speed:400,error:3,reaction:0.99,deadzone:3}
}[this._aiState]||{speed:190,error:22,reaction:0.75,deadzone:14};

const ballGoingUp=this.ball.vy<-5;
let targetX;
if(ballGoingUp){
targetX=this.ball.x+(Math.random()-0.5)*2*cfg.error*0.3;
}else{
targetX=this.W/2;
}

this._aiTargetTimer-=dt;
if(this._aiTargetTimer<=0||this._aiTargetX===null){
if(Math.random()<=cfg.reaction){
this._aiTargetX=targetX;
this._aiTargetTimer=0.2;
}else if(this._aiTargetX===null){
this._aiTargetX=this.W/2;
this._aiTargetTimer=0.2;
}
}

const currentCenter=this.paddleAiX+this.paddleW/2;
const diff=this._aiTargetX-currentCenter;

if(Math.abs(diff)<cfg.deadzone)return;

const move=Math.sign(diff)*cfg.speed*dt;
this.paddleAiX+=move;
this.paddleAiX=Math.max(0,Math.min(this.W-this.paddleW,this.paddleAiX));
},

updateBall(dt){
const b=this.ball;
b.x+=b.vx*dt;
b.y+=b.vy*dt;

if(b.x-b.r<0){
b.x=b.r;
b.vx=Math.abs(b.vx);
this.bounceWall(b.x,b.y);
}
if(b.x+b.r>this.W){
b.x=this.W-b.r;
b.vx=-Math.abs(b.vx);
this.bounceWall(b.x,b.y);
}

if(b.vy<0&&b.y-b.r<=this.paddleY_ai+this.paddleH){
if(b.x>=this.paddleAiX&&b.x<=this.paddleAiX+this.paddleW){
b.y=this.paddleY_ai+this.paddleH+b.r;
b.vy=Math.abs(b.vy);
this.applyPaddleAngle(this.paddleAiX);
this.bouncePaddle(b.x,b.y,'ai');
}
}

if(b.vy>0&&b.y+b.r>=this.paddleY_player){
if(b.x>=this.paddlePlayerX&&b.x<=this.paddlePlayerX+this.paddleW){
b.y=this.paddleY_player-b.r;
b.vy=-Math.abs(b.vy);
this.applyPaddleAngle(this.paddlePlayerX);
this.bouncePaddle(b.x,b.y,'player');
}
}

if(b.y+b.r<0)this.onPoint('player');
else if(b.y-b.r>this.H)this.onPoint('ai');
},

applyPaddleAngle(paddleX){
const b=this.ball;
const rel=(b.x-(paddleX+this.paddleW/2))/(this.paddleW/2);
b.vx+=rel*180;
const speed=Math.hypot(b.vx,b.vy);
if(speed<1)return;
const newSpeed=Math.min(480,speed*1.04);
const scale=newSpeed/speed;
b.vx*=scale;
b.vy*=scale;
if(Math.abs(b.vx)<30)b.vx=(Math.random()<0.5?-1:1)*30;
this._ballSpeed=newSpeed;
},

bounceWall(x,y){
beep(500,0.04,0.04);
this.spawnParticles(x,y,6,'255,255,255');
},

bouncePaddle(x,y,side){
const hum=this._isHumiliation();
if(hum===side){
beep(880,0.06,0.06);
setTimeout(()=>beep(1100,0.07,0.055),55);
setTimeout(()=>beep(1320,0.10,0.05),115);
this.spawnParticles(x,y,22,'34,211,166');
}else{
beep(650,0.05,0.05);
this.spawnParticles(x,y,12,'255,255,255');
}
},

onPoint(scorer){
if(scorer==='player')this._scoreP++;
else this._scoreA++;
this.updateScoreUI();
beep(250,0.15,0.06);
this.spawnParticles(this.ball.x,this.ball.y,20,'255,255,255');

if(this.gameMode==='classic'){
if(this._scoreP>=10){this.endGame(this.playersCount===2?'p1Win':'classicWin');return;}
if(this._scoreA>=10){this.endGame(this.playersCount===2?'p2Win':'classicLose');return;}
}else{
if(this._scoreA-this._scoreP>=5){this.endGame(this.playersCount===2?'p2Win':'infinityLose');return;}
}

this._launchToward=scorer==='player'?'ai':'player';
this.resetBall();
},

endGame(reason){
this._stopLoop();
this.state='over';
this._setPlayBtnsVisible(false);
if(this._pauseEl)this._pauseEl.style.display='none';
let title='';
let sub='';
const is2P=this.playersCount===2;

if(reason==='p1Win'||reason==='classicWin'){
title=is2P?t('pong.winP1'):t('pong.win');
sub=this._scoreP+' — '+this._scoreA;
beep(880,0.15,0.06);
setTimeout(()=>beep(1100,0.15,0.06),100);
setTimeout(()=>beep(1320,0.25,0.06),220);
}else if(reason==='p2Win'){
title=t('pong.winP2');
sub=this._scoreP+' — '+this._scoreA;
beep(880,0.15,0.06);
setTimeout(()=>beep(1100,0.15,0.06),100);
setTimeout(()=>beep(1320,0.25,0.06),220);
}else if(reason==='classicLose'){
title=t('pong.lose');
sub=this._scoreP+' — '+this._scoreA;
beep(300,0.2,0.06);
setTimeout(()=>beep(200,0.3,0.06),120);
}else if(reason==='infinityLose'){
title=t('pong.lose');
sub=t('pong.aiAhead')+' ('+this._scoreP+' — '+this._scoreA+')';
beep(300,0.2,0.06);
}else if(reason==='manual'){
sub=this._scoreP+' — '+this._scoreA;
if(this._scoreP>this._scoreA){
title=is2P?t('pong.winP1'):t('pong.win');
beep(880,0.15,0.06);
}else if(this._scoreA>this._scoreP){
title=is2P?t('pong.winP2'):t('pong.lose');
beep(300,0.2,0.06);
}else{
title=t('pong.draw');
beep(500,0.15,0.06);
}
}
this._overTitleEl.textContent=title;
this._overSubEl.textContent=sub;
this._overEl.style.display='flex';
this._pausedFromTab=false;
},

userPause(){
if(this.state!=='playing'&&this.state!=='countdown')return;
this._pausedFromTab=false;
this._enterPause();
beep(600,0.06,0.04);
},

userResume(){
if(this.state!=='paused')return;
this._exitPause();
beep(800,0.06,0.04);
},

_enterPause(){
if(this.state==='paused')return;
this._prevState=this.state;
this.state='paused';
this._resetPressed();
this._stopLoop();
this.renderFrame();
if(this._pauseEl)this._pauseEl.style.display='flex';
if(this._pauseBtn){
this._pauseBtn.innerHTML=icon('play',14,'▶')+' '+t('pong.resume');
}
},

_exitPause(){
if(this.state!=='paused')return;
this.state=this._prevState||'playing';
if(this._pauseEl)this._pauseEl.style.display='none';
if(this._pauseBtn){
this._pauseBtn.innerHTML=icon('pause',14,'⏸')+' '+t('pong.pause');
}
this._startLoop();
},

pause(){
if(this.state==='playing'||this.state==='countdown'){
this._pausedFromTab=true;
this._enterPause();
}
},

resume(){
if(this.state==='paused'&&this._pausedFromTab){
this._pausedFromTab=false;
this._exitPause();
}
},

spawnParticles(x,y,n,color){
if(this.particles.length>200)return;
for(let i=0;i<n;i++){
const ang=Math.random()*Math.PI*2;
const sp=40+Math.random()*140;
const life=0.45+Math.random()*0.35;
this.particles.push({
x,y,
vx:Math.cos(ang)*sp,
vy:Math.sin(ang)*sp,
life,maxLife:life,
r:1.6+Math.random()*2.5,
color:color||'255,255,255'
});
}
},

updateParticles(dt){
for(let i=this.particles.length-1;i>=0;i--){
const p=this.particles[i];
p.x+=p.vx*dt;
p.y+=p.vy*dt;
p.vx*=0.94;
p.vy*=0.94;
p.life-=dt;
if(p.life<=0)this.particles.splice(i,1);
}
},

renderFrame(){
const ctx=this.ctx;
if(!ctx)return;
const W=this.W,H=this.H;

ctx.fillStyle='#000000';
ctx.fillRect(0,0,W,H);

ctx.save();
ctx.strokeStyle='rgba(255,255,255,0.12)';
ctx.lineWidth=1;
ctx.setLineDash([6,8]);
ctx.beginPath();
ctx.moveTo(0,H/2);
ctx.lineTo(W,H/2);
ctx.stroke();
ctx.restore();

const hum=this._isHumiliation();
const playerColor=hum==='player'?'#22d3a6':'#ffffff';
const aiColor=(this.playersCount===1&&hum==='ai')?'#22d3a6':'#ffffff';

ctx.save();
ctx.fillStyle=aiColor;
ctx.shadowColor=aiColor;
ctx.shadowBlur=14;
ctx.fillRect(this.paddleAiX,this.paddleY_ai,this.paddleW,this.paddleH);
ctx.restore();

ctx.save();
ctx.fillStyle=playerColor;
ctx.shadowColor=playerColor;
ctx.shadowBlur=14;
ctx.fillRect(this.paddlePlayerX,this.paddleY_player,this.paddleW,this.paddleH);
ctx.restore();

if(this.state!=='menu'){
ctx.save();
ctx.fillStyle='#ffffff';
ctx.shadowColor='#ffffff';
ctx.shadowBlur=16;
ctx.beginPath();
ctx.arc(this.ball.x,this.ball.y,this.ball.r,0,Math.PI*2);
ctx.fill();
ctx.restore();
}

this.renderParticles(ctx);

if(this.state==='countdown')this.renderCountdown(ctx);
},

renderParticles(ctx){
for(const p of this.particles){
const alpha=Math.max(0,p.life/p.maxLife);
ctx.fillStyle='rgba('+p.color+','+alpha+')';
ctx.beginPath();
ctx.arc(p.x,p.y,p.r*alpha,0,Math.PI*2);
ctx.fill();
}
},

renderCountdown(ctx){
const text=this._countdownText();
if(!text)return;
ctx.save();
ctx.font='bold '+Math.floor(this.H*0.18)+'px system-ui, sans-serif';
ctx.textAlign='center';
ctx.textBaseline='middle';
const isGo=text===t('pong.timer.go');
ctx.fillStyle=isGo?'#22d3a6':'#ffffff';
ctx.shadowColor=ctx.fillStyle;
ctx.shadowBlur=20;
ctx.fillText(text,this.W/2,this.H*0.32);
ctx.restore();
},

destroy(){
this._stopLoop();
if(this._keyHandler)document.removeEventListener('keydown',this._keyHandler);
if(this._keyUpHandler)document.removeEventListener('keyup',this._keyUpHandler);
if(this._resizeHandler)window.removeEventListener('resize',this._resizeHandler);
}
};


const PopIt={
SIZE:5,
front:null,back:null,showing:'front',
cellsEl:null,progressEl:null,completeEl:null,

init(stage){
clearNode(stage);
const wrap=el('div',{class:'ng-popit'});

const header=el('div',{class:'ng-popit-header'});
const title=el('div',{class:'ng-popit-title',text:t('popit.title')});
header.appendChild(title);

const btnRow=el('div',{class:'ng-popit-actions'});
const flipBtn=el('button',{class:'ng-btn',text:t('popit.flip')});
const resetBtn=el('button',{class:'ng-btn',text:t('popit.reset')});
btnRow.appendChild(flipBtn);
btnRow.appendChild(resetBtn);
header.appendChild(btnRow);
wrap.appendChild(header);

this.progressEl=el('div',{class:'ng-popit-progress',text:''});
wrap.appendChild(this.progressEl);

const board=el('div',{class:'ng-popit-board'});
this.cellsEl=[];
for(let r=0;r<this.SIZE;r++){
const row=[];
for(let c=0;c<this.SIZE;c++){
const cell=el('button',{class:'ng-popit-cell',type:'button'});
cell.dataset.r=String(r);
cell.dataset.c=String(c);
cell.addEventListener('click',()=>this.onPress(r,c));
row.push(cell);
board.appendChild(cell);
}
this.cellsEl.push(row);
}
wrap.appendChild(board);
wrap.appendChild(el('div',{class:'ng-hint',text:t('popit.hint')}));
stage.appendChild(wrap);

flipBtn.addEventListener('click',()=>this.flip());
resetBtn.addEventListener('click',()=>this.reset());

this.reset();
},

reset(){
this.front=[];
this.back=[];
for(let r=0;r<this.SIZE;r++){
const rowF=[],rowB=[];
for(let c=0;c<this.SIZE;c++){rowF.push(1);rowB.push(0);}
this.front.push(rowF);this.back.push(rowB);
}
this.showing='front';
if(this.completeEl){this.completeEl.remove();this.completeEl=null;}
this.render();
},

get matrix(){return this.showing==='front'?this.front:this.back;},
get otherMatrix(){return this.showing==='front'?this.back:this.front;},

onPress(r,c){
const m=this.matrix;
if(m[r][c]===1){
m[r][c]=0;
this.otherMatrix[r][c]=1;
beep(880,0.05,0.04);
this.render();
this.checkComplete();
}
},

flip(){
const tmp=this.front;
this.front=this.back;
this.back=tmp;
const board=this.cellsEl[0][0].closest('.ng-popit-board');
if(board){
board.classList.remove('ng-popit-flip-left','ng-popit-flip-right');
void board.offsetWidth;
const dir=Math.random()<0.5?'ng-popit-flip-left':'ng-popit-flip-right';
board.classList.add(dir);
setTimeout(()=>{if(board)board.classList.remove(dir);},750);
}
this.render();
beep(440,0.08,0.04);
},

checkComplete(){
const m=this.matrix;
for(let r=0;r<this.SIZE;r++)for(let c=0;c<this.SIZE;c++){
if(m[r][c]!==0)return;
}
this.showComplete();
},

showComplete(){
if(this.completeEl)return;
const wrap=this.cellsEl[0][0].closest('.ng-popit');
const ov=el('div',{class:'ng-overlay'});
const content=el('div',{class:'ng-overlay-content'});

content.appendChild(el('div',{
class:'ng-overlay-title',
html:icon('confetti',24,'🎉')+' '+t('popit.complete')
}));
const btn=el('button',{class:'ng-btn ng-btn-primary',text:t('popit.reset')});
content.appendChild(btn);
ov.appendChild(content);
wrap.appendChild(ov);
this.completeEl=ov;
btn.addEventListener('click',()=>{
if(this.completeEl){this.completeEl.remove();this.completeEl=null;}
this.reset();
});
this.spawnConfetti(wrap);
},

spawnConfetti(wrap){
const colors=['#5b8cff','#a78bfa','#22d3a6','#ffb020','#ff6b7a'];
for(let i=0;i<40;i++){
const p=document.createElement('span');
p.className='ng-popit-confetti';
p.style.background=colors[i%colors.length];
p.style.left=(Math.random()*100)+'%';
p.style.top='50%';
p.style.setProperty('--dx',(Math.random()-0.5)*240+'px');
p.style.setProperty('--dy',(-Math.random()*260-60)+'px');
p.style.setProperty('--rot',(Math.random()*720-360)+'deg');
p.style.animationDelay=(Math.random()*200)+'ms';
wrap.appendChild(p);
setTimeout(()=>p.remove(),1800);
}
},

render(){
const m=this.matrix;
let popped=0;
const total=this.SIZE*this.SIZE;
for(let r=0;r<this.SIZE;r++)for(let c=0;c<this.SIZE;c++){
const cell=this.cellsEl[r][c];
const up=m[r][c]===1;
cell.classList.toggle('up',up);
cell.classList.toggle('down',!up);
cell.dataset.state=up?'up':'down';
if(!up)popped++;
}
if(this.progressEl){
this.progressEl.textContent=t('popit.progress',popped,total);
}
},

pause(){},resume(){},destroy(){}
};


function register(){
if(!window.NibblyGames||typeof window.NibblyGames.extend!=='function'){
return false;
}
window.NibblyGames.extend({
id:'pong',
label:()=>t('tab.pong'),
init:(stage)=>Pong.init(stage),
pause:()=>Pong.pause(),
resume:()=>Pong.resume()
});
window.NibblyGames.extend({
id:'popit',
label:()=>t('tab.popit'),
init:(stage)=>PopIt.init(stage),
pause:()=>PopIt.pause(),
resume:()=>PopIt.resume()
});
if(console&&console.debug)console.debug('[NibblyGamesExtras] Pong + Pop It! registered.');
return true;
}

if(!register()){
let tries=0;
const iv=setInterval(()=>{
tries++;
if(register()||tries>50)clearInterval(iv);
},100);
}


window.NibblyModules=window.NibblyModules||{};
if(!window.NibblyModules['games-extras']){
window.NibblyModules['games-extras']={
id:'games-extras',
version:'2.0.30',
init:function(){return{refresh:function(){},destroy:function(){}};}
};
}
})();