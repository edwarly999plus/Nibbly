(function(){
'use strict';

const I18N={
es:{
'tab.2048':'2048','tab.tetris':'Tetris','tab.mines':'Buscaminas',
'score':'Puntos','lines':'Líneas','level':'Nivel','mines':'Minas','flags':'Banderas',
'newgame':'Nueva partida','pause':'Pausa','resume':'Reanudar','retry':'Reintentar',
'gameover':'Game Over','youwin':'¡Ganaste!','boom':'¡BOOM!',
'all_safe':'Todas las casillas seguras reveladas','stepped_mine':'Pisaste una mina',
'hint.2048':'← → ↑ ↓ para mover · Swipe en móvil',
'hint.tetris':'← → mover · ↑ gira · ↓ baja · Espacio cae · P pausa',
'hint.mines':'Clic revela · Botón de bandera o clic derecho marca bandera',
'flagMode':'Modo Bandera','flagMode.active':'Toca una casilla',
'error':'Error cargando el juego','next':'Siguiente'
},
en:{
'tab.2048':'2048','tab.tetris':'Tetris','tab.mines':'Minesweeper',
'score':'Score','lines':'Lines','level':'Level','mines':'Mines','flags':'Flags',
'newgame':'New game','pause':'Pause','resume':'Resume','retry':'Retry',
'gameover':'Game Over','youwin':'You win!','boom':'BOOM!',
'all_safe':'All safe cells revealed','stepped_mine':'You stepped on a mine',
'hint.2048':'← → ↑ ↓ to move · Swipe on mobile',
'hint.tetris':'← → move · ↑ rotate · ↓ down · Space drop · P pause',
'hint.mines':'Click reveals · Flag button or right-click flags',
'flagMode':'Flag Mode','flagMode.active':'Tap a cell',
'error':'Error loading game','next':'Next'
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


function icon(name,size){
if(window.NibblyIcons){
const html=window.NibblyIcons.get(name,{size:size||18});
if(html)return html;
}
return'';
}


let _tetrisAudioCtx=null;
let _tetrisAudioUnlocked=false;

function unlockTetrisAudio(){
if(_tetrisAudioUnlocked)return;
try{
if(!_tetrisAudioCtx){
const AC=window.AudioContext||window.webkitAudioContext;
if(!AC)return;
_tetrisAudioCtx=new AC();
}
if(_tetrisAudioCtx.state==='suspended'){
_tetrisAudioCtx.resume().catch(()=>{});
}
_tetrisAudioUnlocked=true;
}catch(_){}
}

if(typeof document!=='undefined'&&!window.__tetrisAudioHooked){
window.__tetrisAudioHooked=true;
const unlock=()=>{
unlockTetrisAudio();
document.removeEventListener('pointerdown',unlock,true);
document.removeEventListener('keydown',unlock,true);
document.removeEventListener('touchstart',unlock,true);
document.removeEventListener('click',unlock,true);
};
document.addEventListener('pointerdown',unlock,true);
document.addEventListener('keydown',unlock,true);
document.addEventListener('touchstart',unlock,true);
document.addEventListener('click',unlock,true);
}

function tetrisBeep(freq,dur,vol,when){
try{
unlockTetrisAudio();
if(!_tetrisAudioCtx)return;
const s=JSON.parse(localStorage.getItem('nibbly-settings-v2')||'{}');
if(!s.sounds)return;
const v=Number(s.soundVolume);
if(!isFinite(v)||v<=0)return;
const ctx=_tetrisAudioCtx;
const fire=()=>{
try{
const now=ctx.currentTime+(when||0);
const osc=ctx.createOscillator();
const gain=ctx.createGain();
osc.type='sine';
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


const Game2048={
tiles:[],nextId:1,score:0,over:false,moving:false,
boardEl:null,tilesLayer:null,scoreEl:null,
layout:{padding:8,gap:8,cellSize:0},
_keyHandler:null,_touchStart:null,_resizeObserver:null,
_retries:0,_tabPaused:false,

init(stage){
clearNode(stage);
const wrap=el('div',{class:'ng-2048'});
const header=el('div',{class:'ng-game-header'});
const scoreBox=el('div',{class:'ng-score-box'});
scoreBox.appendChild(el('div',{class:'ng-score-label',text:t('score')}));
const scoreVal=el('div',{class:'ng-score-value',text:'0'});
this.scoreEl=scoreVal;
scoreBox.appendChild(scoreVal);
header.appendChild(scoreBox);
const newBtn=el('button',{class:'ng-btn ng-btn-primary',text:t('newgame')});
header.appendChild(newBtn);
wrap.appendChild(header);
const board=el('div',{class:'ng-board-2048'});
this.boardEl=board;
const bg=el('div',{class:'ng-2048-bg'});
for(let i=0;i<16;i++)bg.appendChild(el('div',{class:'ng-2048-bg-cell'}));
board.appendChild(bg);
const tilesLayer=el('div',{class:'ng-2048-tiles'});
this.tilesLayer=tilesLayer;
board.appendChild(tilesLayer);
wrap.appendChild(board);
wrap.appendChild(el('div',{class:'ng-hint',text:t('hint.2048')}));
stage.appendChild(wrap);
newBtn.addEventListener('click',()=>this.newGame());
this.attachControls();
if(typeof ResizeObserver!=='undefined'&&!this._resizeObserver){
this._resizeObserver=new ResizeObserver(()=>{
if(!this.boardEl||!this.boardEl.isConnected)return;
const stg=this.boardEl.closest('.ng-stage');
if(!stg||!stg.classList.contains('active'))return;
const prev=this.layout.cellSize;
this.updateLayout();
if(this.layout.cellSize!==prev&&prev>0&&!this.moving){
this.tiles.forEach(tr=>{
tr.el.style.width=this.layout.cellSize+'px';
tr.el.style.height=this.layout.cellSize+'px';
tr.el.style.transform=`translate(${this.tileX(tr.c)}px, ${this.tileY(tr.r)}px)`;
});
}
});
this._resizeObserver.observe(board);
}
requestAnimationFrame(()=>this.newGame());
},
updateLayout(){
const rect=this.boardEl.getBoundingClientRect();
const style=getComputedStyle(this.boardEl);
const padding=parseFloat(style.getPropertyValue('--ng-2048-pad'))||8;
const gap=parseFloat(style.getPropertyValue('--ng-2048-gap'))||8;
const innerW=rect.width-padding*2;
const cellSize=Math.max(0,(innerW-gap*3)/4);
this.layout={padding,gap,cellSize};
},
tileX(c){return this.layout.padding+c*(this.layout.cellSize+this.layout.gap);},
tileY(r){return this.layout.padding+r*(this.layout.cellSize+this.layout.gap);},
newGame(){
this.updateLayout();
if(this.layout.cellSize<=0){
this._retries=(this._retries||0)+1;
if(this._retries<20)setTimeout(()=>this.newGame(),50);
return;
}
this._retries=0;
this.tiles.forEach(tr=>tr.el.remove());
this.tiles=[];this.nextId=1;this.score=0;this.over=false;this.moving=false;
this._tabPaused=false;
if(this.boardEl)this.boardEl.classList.remove('ng-paused');
if(this.scoreEl)this.scoreEl.textContent='0';
const old=this.boardEl.parentElement.querySelector('.ng-overlay');
if(old)old.remove();
this.addRandomTile();this.addRandomTile();
},
cellStyle(v){
if(!v)return{bg:'transparent',fg:'transparent'};
const map={2:'#eee4da',4:'#ede0c8',8:'#f2b179',16:'#f59563',32:'#f67c5f',64:'#f65e3b',128:'#edcf72',256:'#edcc61',512:'#edc850',1024:'#edc53f',2048:'#edc22e'};
if(v<=4)return{bg:map[v],fg:'#776e65'};
if(map[v])return{bg:map[v],fg:'#fff'};
return{bg:'#3c3a32',fg:'#fff'};
},
createTile(r,c,value,isNew){
const node=document.createElement('div');
node.className='ng-2048-tile';
node.textContent=value;
node.dataset.value=value;
const colors=this.cellStyle(value);
node.style.background=colors.bg;
node.style.color=colors.fg;
node.style.width=this.layout.cellSize+'px';
node.style.height=this.layout.cellSize+'px';
const tile={id:this.nextId++,value,r,c,el:node};
this.tiles.push(tile);
this.tilesLayer.appendChild(node);
const x=this.tileX(c),y=this.tileY(r);
const pos=`translate(${x}px, ${y}px)`;
if(isNew){
node.style.transform=pos+' scale(0)';
node.style.opacity='0';
node.getBoundingClientRect();
node.style.transform=pos+' scale(1)';
node.style.opacity='1';
}else node.style.transform=pos;
return tile;
},
addRandomTile(){
const occupied=new Set();
this.tiles.forEach(tr=>occupied.add(tr.r*4+tr.c));
const empty=[];
for(let i=0;i<16;i++)if(!occupied.has(i))empty.push(i);
if(!empty.length)return;
const pos=empty[Math.floor(Math.random()*empty.length)];
this.createTile(Math.floor(pos/4),pos%4,Math.random()<0.9?2:4,true);
},
positionTile(tile){
tile.el.style.transform=`translate(${this.tileX(tile.c)}px, ${this.tileY(tile.r)}px)`;
tile.el.style.width=this.layout.cellSize+'px';
tile.el.style.height=this.layout.cellSize+'px';
},
move(dir){
if(this.over||this.moving||this._tabPaused)return;
this.tiles.forEach(tr=>{tr.mergedThisMove=false;tr.removedThisMove=false;tr.mergeSurvivor=null;});
const result=this.computeMove(dir);
if(!result.moved)return;
this.moving=true;
this.score+=result.scoreDelta;
if(this.scoreEl)this.scoreEl.textContent=this.score;
this.tiles.forEach(tr=>{
if(tr.removedThisMove&&tr.mergeSurvivor){
tr.el.style.transform=`translate(${this.tileX(tr.mergeSurvivor.c)}px, ${this.tileY(tr.mergeSurvivor.r)}px)`;
}else if(!tr.removedThisMove)this.positionTile(tr);
});
setTimeout(()=>{
this.tiles.forEach(tr=>{
if(!tr.removedThisMove&&tr.mergedThisMove){
tr.el.textContent=tr.value;
tr.el.dataset.value=tr.value;
const colors=this.cellStyle(tr.value);
tr.el.style.background=colors.bg;
tr.el.style.color=colors.fg;
}
});
const survivors=this.tiles.filter(tr=>!tr.removedThisMove);
this.tiles.forEach(tr=>{if(tr.removedThisMove)tr.el.remove();});
this.tiles=survivors;
this.addRandomTile();
this.moving=false;
if(this.isGameOver())this.showGameOver();
},160);
},
computeMove(dir){
const isVertical=(dir==='up'||dir==='down');
const isReversed=(dir==='right'||dir==='down');
let moved=false,scoreDelta=0;
const grid=[[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null]];
this.tiles.forEach(tr=>{if(!tr.removedThisMove)grid[tr.r][tr.c]=tr;});
for(let lineIdx=0;lineIdx<4;lineIdx++){
const line=[];
for(let i=0;i<4;i++){
line.push(grid[isVertical?i:lineIdx][isVertical?lineIdx:i]);
}
if(isReversed)line.reverse();
const filtered=line.filter(tr=>tr);
const newLine=[];
for(let i=0;i<filtered.length;i++){
const tile=filtered[i];
if(i+1<filtered.length&&filtered[i+1].value===tile.value){
const other=filtered[i+1];
tile.value*=2;
scoreDelta+=tile.value;
tile.mergedThisMove=true;
other.removedThisMove=true;
other.mergeSurvivor=tile;
newLine.push(tile);i++;
}else newLine.push(tile);
}
while(newLine.length<4)newLine.push(null);
if(isReversed)newLine.reverse();
for(let i=0;i<4;i++){
const r=isVertical?i:lineIdx;
const c=isVertical?lineIdx:i;
const tile=newLine[i];
if(tile&&(tile.r!==r||tile.c!==c)){tile.r=r;tile.c=c;moved=true;}
}
}
return{moved,scoreDelta};
},
isGameOver(){
const grid=[[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null]];
this.tiles.forEach(tr=>{grid[tr.r][tr.c]=tr;});
for(let r=0;r<4;r++)for(let c=0;c<4;c++){
if(!grid[r][c])return false;
if(c<3&&grid[r][c].value===grid[r][c+1].value)return false;
if(r<3&&grid[r][c].value===grid[r+1][c].value)return false;
}
return true;
},
showGameOver(){
this.over=true;
const ov=el('div',{class:'ng-overlay'});
const content=el('div',{class:'ng-overlay-content'});
content.appendChild(el('div',{class:'ng-overlay-title',text:t('gameover')}));
content.appendChild(el('div',{class:'ng-overlay-sub',text:t('score')+': '+this.score}));
const btn=el('button',{class:'ng-btn ng-btn-primary',text:t('retry')});
content.appendChild(btn);
ov.appendChild(content);
this.boardEl.parentElement.appendChild(ov);
btn.addEventListener('click',()=>{ov.remove();this.newGame();});
},
attachControls(){
if(this._keyHandler)document.removeEventListener('keydown',this._keyHandler);
this._keyHandler=(e)=>{
if(!this.boardEl||!this.boardEl.isConnected||this._tabPaused)return;
const stage=this.boardEl.closest('.ng-stage');
if(!stage||!stage.classList.contains('active'))return;
const map={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down'};
if(map[e.key]){e.preventDefault();this.move(map[e.key]);}
};
document.addEventListener('keydown',this._keyHandler);
const board=this.boardEl;
board.addEventListener('touchstart',(e)=>{
const touch=e.touches[0];
this._touchStart={x:touch.clientX,y:touch.clientY};
},{passive:true});
board.addEventListener('touchend',(e)=>{
if(this._tabPaused||!this._touchStart)return;
const touch=e.changedTouches[0];
const dx=touch.clientX-this._touchStart.x;
const dy=touch.clientY-this._touchStart.y;
this._touchStart=null;
if(Math.abs(dx)<24&&Math.abs(dy)<24)return;
if(Math.abs(dx)>Math.abs(dy))this.move(dx>0?'right':'left');
else this.move(dy>0?'down':'up');
},{passive:true});
},
pause(){this._tabPaused=true;if(this.boardEl)this.boardEl.classList.add('ng-paused');},
resume(){this._tabPaused=false;if(this.boardEl)this.boardEl.classList.remove('ng-paused');}
};


const TETROMINOES={
I:{shape:[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],color:'#00e5ff'},
O:{shape:[[1,1],[1,1]],color:'#ffd400'},
T:{shape:[[0,1,0],[1,1,1],[0,0,0]],color:'#b06bff'},
S:{shape:[[0,1,1],[1,1,0],[0,0,0]],color:'#3ddc84'},
Z:{shape:[[1,1,0],[0,1,1],[0,0,0]],color:'#ff5577'},
J:{shape:[[1,0,0],[1,1,1],[0,0,0]],color:'#5b8cff'},
L:{shape:[[0,0,1],[1,1,1],[0,0,0]],color:'#ff9a3c'}
};

const Tetris={
COLS:10,ROWS:20,
grid:null,current:null,next:null,
score:0,lines:0,level:1,dropMs:800,intervalId:null,
boardEl:null,nextBoardEl:null,
scoreEl:null,linesEl:null,levelEl:null,pauseBtnEl:null,
gameOver:false,paused:false,tabPaused:false,
_keyHandler:null,
_animating:false,

init(stage){
clearNode(stage);
const wrap=el('div',{class:'ng-tetris'});
const header=el('div',{class:'ng-game-header'});
const mkStat=(label,initial)=>{
const box=el('div',{class:'ng-score-box'});
box.appendChild(el('div',{class:'ng-score-label',text:label}));
const val=el('div',{class:'ng-score-value',text:initial});
box.appendChild(val);
return{box,val};
};
const linesStat=mkStat(t('lines'),'0');
const scoreStat=mkStat(t('score'),'0');
const levelStat=mkStat(t('level'),'1');
this.linesEl=linesStat.val;this.scoreEl=scoreStat.val;this.levelEl=levelStat.val;
header.appendChild(linesStat.box);header.appendChild(scoreStat.box);header.appendChild(levelStat.box);
wrap.appendChild(header);

const playArea=el('div',{class:'ng-tetris-play-area'});
const board=el('div',{class:'ng-board-tetris'});
this.boardEl=board;
playArea.appendChild(board);

const nextWrap=el('div',{class:'ng-tetris-next'});
nextWrap.appendChild(el('div',{class:'ng-tetris-next-label',text:t('next')}));
const nextBoard=el('div',{class:'ng-board-next'});
for(let i=0;i<16;i++)nextBoard.appendChild(el('div',{class:'ng-tetris-next-cell'}));
nextWrap.appendChild(nextBoard);
this.nextBoardEl=nextBoard;
playArea.appendChild(nextWrap);
wrap.appendChild(playArea);

const controls=el('div',{class:'ng-tetris-controls'});
const mkCtrl=(action,label,wide)=>{
const b=el('button',{class:'ng-ctrl-btn'+(wide?' wide':''),text:label,'data-action':action});
b.addEventListener('click',()=>this.action(action));
return b;
};
controls.appendChild(mkCtrl('left','←'));
controls.appendChild(mkCtrl('rotate','↻'));
controls.appendChild(mkCtrl('right','→'));
controls.appendChild(mkCtrl('down','↓'));
controls.appendChild(mkCtrl('drop','⇊',true));
wrap.appendChild(controls);

const bottom=el('div',{class:'ng-game-header',style:{marginTop:'12px',justifyContent:'center'}});
const pauseBtn=el('button',{class:'ng-btn',text:t('pause')});
this.pauseBtnEl=pauseBtn;
const newBtn=el('button',{class:'ng-btn ng-btn-primary',text:t('newgame')});
bottom.appendChild(pauseBtn);bottom.appendChild(newBtn);
wrap.appendChild(bottom);
wrap.appendChild(el('div',{class:'ng-hint',text:t('hint.tetris')}));
stage.appendChild(wrap);

pauseBtn.addEventListener('click',()=>this.togglePause());
newBtn.addEventListener('click',()=>this.newGame());
this.buildCells();
this.attachControls();
this.newGame();
},

buildCells(){
clearNode(this.boardEl);
for(let i=0;i<this.COLS*this.ROWS;i++)this.boardEl.appendChild(el('div',{class:'ng-tetris-cell'}));
},

newGame(){
if(this.intervalId){clearInterval(this.intervalId);this.intervalId=null;}
this.grid=Array.from({length:this.ROWS},()=>Array(this.COLS).fill(null));
this.score=0;this.lines=0;this.level=1;this.dropMs=800;
this.gameOver=false;this.paused=false;this.tabPaused=false;
this._animating=false;
if(this.pauseBtnEl)this.pauseBtnEl.textContent=t('pause');
if(this.boardEl)this.boardEl.classList.remove('ng-paused');
const old=this.boardEl.parentElement.querySelector('.ng-overlay');
if(old)old.remove();
this.current=this.randomPiece();
this.next=this.randomPiece();
this.spawnCurrent();
this.updateStats();
this.renderNext();
this.render();
this.startLoop();
},

randomPiece(){
const keys=Object.keys(TETROMINOES);
const key=keys[Math.floor(Math.random()*keys.length)];
const def=TETROMINOES[key];
return{type:key,shape:def.shape.map(r=>r.slice()),color:def.color,x:0,y:0};
},

spawnCurrent(){
const p=this.current;
p.x=Math.floor((this.COLS-p.shape[0].length)/2);
p.y=0;
},

startLoop(){
if(this.intervalId)clearInterval(this.intervalId);
if(this.gameOver||this.paused||this.tabPaused){this.intervalId=null;return;}
this.intervalId=setInterval(()=>this.tick(),this.dropMs);
},

tick(){
if(this.gameOver||this.paused||this.tabPaused||this._animating)return;
if(!this.current)return;
if(this.canMove(0,1)){this.current.y++;this.render();}
else this.lockPiece();
},

canMove(dx,dy){
const p=this.current;
if(!p)return false;
for(let r=0;r<p.shape.length;r++)for(let c=0;c<p.shape[r].length;c++){
if(!p.shape[r][c])continue;
const nx=p.x+c+dx,ny=p.y+r+dy;
if(nx<0||nx>=this.COLS||ny>=this.ROWS)return false;
if(ny>=0&&this.grid[ny][nx])return false;
}
return true;
},

canMoveAt(x,y,shape){
for(let r=0;r<shape.length;r++)for(let c=0;c<shape[r].length;c++){
if(!shape[r][c])continue;
const nx=x+c,ny=y+r;
if(nx<0||nx>=this.COLS||ny>=this.ROWS)return false;
if(ny>=0&&this.grid[ny][nx])return false;
}
return true;
},

getGhostY(){
const p=this.current;
if(!p)return 0;
let dy=0;
while(this.canMoveAt(p.x,p.y+dy+1,p.shape))dy++;
return p.y+dy;
},

lockPiece(){
const p=this.current;
if(!p)return;

for(let r=0;r<p.shape.length;r++)for(let c=0;c<p.shape[r].length;c++){
if(!p.shape[r][c])continue;
const x=p.x+c,y=p.y+r;
if(y>=0)this.grid[y][x]=p.color;
}
this.current=null;
this.render();

const rowsToClear=[];
for(let r=this.ROWS-1;r>=0;r--){
if(this.grid[r].every(v=>v))rowsToClear.push(r);
}

if(!rowsToClear.length){
this.current=this.next;
this.next=this.randomPiece();
this.spawnCurrent();
this.renderNext();
if(!this.canMove(0,0)){this.gameOver=true;this.showGameOver();}
this.render();
return;
}

const rowData=rowsToClear.map(r=>({row:r,cells:this.grid[r].slice()}));
tetrisBeep(500+rowsToClear.length*100,0.08,0.06);

this._animating=true;
this.animateRowDestroy(rowData,()=>{
let cleared=0;
for(let r=this.ROWS-1;r>=0;r--){
if(this.grid[r].every(v=>v)){
this.grid.splice(r,1);
this.grid.unshift(Array(this.COLS).fill(null));
cleared++;
r++;
}
}
this.score+=[0,100,300,500,800][cleared]*this.level;
this.lines+=cleared;
const newLevel=Math.floor(this.lines/10)+1;
if(newLevel!==this.level){
this.level=newLevel;
this.dropMs=Math.max(100,800-(this.level-1)*60);
this.startLoop();
}
this.updateStats();

this.current=this.next;
this.next=this.randomPiece();
this.spawnCurrent();
this.renderNext();
if(!this.canMove(0,0)){this.gameOver=true;this.showGameOver();}
this.render();
this._animating=false;
});
},

animateRowDestroy(rowData,onComplete){
if(!this.boardEl){onComplete();return;}
const cells=this.boardEl.children;
let totalCells=0;
rowData.forEach(rd=>{totalCells+=rd.cells.filter(c=>c).length;});
if(totalCells===0){onComplete();return;}

let destroyedCount=0;
let globalIndex=0;
const staggerMs=25;

rowData.forEach(rd=>{
for(let c=0;c<this.COLS;c++){
const color=rd.cells[c];
if(!color)continue;
const cell=cells[rd.row*this.COLS+c];
if(!cell)continue;
const delay=globalIndex*staggerMs;
globalIndex++;
setTimeout(()=>{
cell.classList.add('ng-tetris-cell-destroy');
if(destroyedCount%2===0){
tetrisBeep(700+Math.random()*300,0.03,0.02);
}
setTimeout(()=>{
cell.classList.remove('ng-tetris-cell-destroy');
cell.style.background='';
cell.style.boxShadow='';
destroyedCount++;
if(destroyedCount>=totalCells){
setTimeout(onComplete,80);
}
},120);
},delay);
}
});
},

updateStats(){
if(this.scoreEl)this.scoreEl.textContent=this.score;
if(this.linesEl)this.linesEl.textContent=this.lines;
if(this.levelEl)this.levelEl.textContent=this.level;
},

renderNext(){
if(!this.nextBoardEl){
const stage=document.getElementById('ng-stage-tetris');
if(stage)this.nextBoardEl=stage.querySelector('.ng-board-next');
}
if(!this.nextBoardEl)return;
const cells=this.nextBoardEl.children;
for(let i=0;i<cells.length;i++){cells[i].style.background='';cells[i].style.boxShadow='';}
const p=this.next;
if(!p)return;
const shape=p.shape;
const offsetR=Math.floor((4-shape.length)/2);
const offsetC=Math.floor((4-shape[0].length)/2);
for(let r=0;r<shape.length;r++)for(let c=0;c<shape[r].length;c++){
if(!shape[r][c])continue;
const gr=r+offsetR,gc=c+offsetC;
if(gr<0||gr>=4||gc<0||gc>=4)continue;
const cell=cells[gr*4+gc];
if(!cell)continue;
cell.style.background=p.color;
cell.style.boxShadow='inset 0 0 0 1px rgba(0,0,0,.35)';
}
},

render(){
const cells=this.boardEl.children;
for(let i=0;i<cells.length;i++){
cells[i].style.background='';
cells[i].style.boxShadow='';
cells[i].style.opacity='';
if(!cells[i].classList.contains('ng-tetris-cell-destroy')){
cells[i].classList.remove('ng-tetris-ghost');
}
}
for(let r=0;r<this.ROWS;r++)for(let c=0;c<this.COLS;c++){
const color=this.grid[r][c];
if(color){
const cell=cells[r*this.COLS+c];
cell.style.background=color;
cell.style.boxShadow='inset 0 0 0 1px rgba(0,0,0,.35)';
}
}
const p=this.current;
if(!p||this.gameOver)return;
const ghostY=this.getGhostY();
if(ghostY!==p.y){
for(let r=0;r<p.shape.length;r++)for(let c=0;c<p.shape[r].length;c++){
if(!p.shape[r][c])continue;
const x=p.x+c,y=ghostY+r;
if(y<0||y>=this.ROWS||x<0||x>=this.COLS)continue;
if(this.grid[y]&&this.grid[y][x])continue;
cells[y*this.COLS+x].classList.add('ng-tetris-ghost');
}
}
for(let r=0;r<p.shape.length;r++)for(let c=0;c<p.shape[r].length;c++){
if(!p.shape[r][c])continue;
const x=p.x+c,y=p.y+r;
if(y<0||y>=this.ROWS||x<0||x>=this.COLS)continue;
const cell=cells[y*this.COLS+x];
cell.style.background=p.color;
cell.style.boxShadow='inset 0 0 0 1px rgba(0,0,0,.35)';
cell.classList.remove('ng-tetris-ghost');
}
},

action(a){
if(this.gameOver||this.paused||this.tabPaused||this._animating)return;
if(a==='left')this.tryMove(-1,0);
else if(a==='right')this.tryMove(1,0);
else if(a==='down')this.tryMove(0,1);
else if(a==='rotate')this.tryRotate();
else if(a==='drop')this.hardDrop();
},

tryMove(dx,dy){
if(this.canMove(dx,dy)){this.current.x+=dx;this.current.y+=dy;this.render();}
},

tryRotate(){
const p=this.current;
const n=p.shape.length;
const rotated=Array.from({length:n},()=>Array(n).fill(0));
for(let r=0;r<n;r++)for(let c=0;c<n;c++)rotated[c][n-1-r]=p.shape[r][c];
const oldShape=p.shape,oldX=p.x;
p.shape=rotated;
if(this.canMove(0,0)){this.render();return;}
p.x=oldX+1;if(this.canMove(0,0)){this.render();return;}
p.x=oldX-2;if(this.canMove(0,0)){this.render();return;}
p.x=oldX+2;if(this.canMove(0,0)){this.render();return;}
p.shape=oldShape;p.x=oldX;
},

hardDrop(){
if(!this.current)return;
const fromY=this.current.y;
while(this.canMove(0,1))this.current.y++;
if(this.current.y>fromY){
this.shakeBoard();
tetrisBeep(180,0.12,0.10);
setTimeout(()=>tetrisBeep(120,0.15,0.08),40);
}
this.render();
this.lockPiece();
},

shakeBoard(){
if(!this.boardEl)return;
this.boardEl.classList.remove('ng-tetris-shake');
void this.boardEl.offsetWidth;
this.boardEl.classList.add('ng-tetris-shake');
setTimeout(()=>{if(this.boardEl)this.boardEl.classList.remove('ng-tetris-shake');},350);
},

togglePause(){
if(this.gameOver)return;
this.paused=!this.paused;
if(this.pauseBtnEl)this.pauseBtnEl.textContent=this.paused?t('resume'):t('pause');
if(this.paused){if(this.intervalId){clearInterval(this.intervalId);this.intervalId=null;}}
else this.startLoop();
},

showGameOver(){
const ov=el('div',{class:'ng-overlay'});
const content=el('div',{class:'ng-overlay-content'});
content.appendChild(el('div',{class:'ng-overlay-title',text:t('gameover')}));
content.appendChild(el('div',{class:'ng-overlay-sub',text:t('score')+': '+this.score+' · '+t('lines')+': '+this.lines}));
const btn=el('button',{class:'ng-btn ng-btn-primary',text:t('retry')});
content.appendChild(btn);
ov.appendChild(content);
this.boardEl.parentElement.appendChild(ov);
btn.addEventListener('click',()=>{ov.remove();this.newGame();});
},

attachControls(){
if(this._keyHandler)document.removeEventListener('keydown',this._keyHandler);
this._keyHandler=(e)=>{
if(!this.boardEl||!this.boardEl.isConnected||this.tabPaused)return;
const stage=this.boardEl.closest('.ng-stage');
if(!stage||!stage.classList.contains('active'))return;
switch(e.key){
case'ArrowLeft':e.preventDefault();this.action('left');break;
case'ArrowRight':e.preventDefault();this.action('right');break;
case'ArrowDown':e.preventDefault();this.action('down');break;
case'ArrowUp':e.preventDefault();this.action('rotate');break;
case' ':e.preventDefault();this.action('drop');break;
case'p':case'P':e.preventDefault();this.togglePause();break;
}
};
document.addEventListener('keydown',this._keyHandler);
},

pause(){
this.tabPaused=true;
if(this.intervalId){clearInterval(this.intervalId);this.intervalId=null;}
if(this.boardEl)this.boardEl.classList.add('ng-paused');
},
resume(){
this.tabPaused=false;
if(this.boardEl)this.boardEl.classList.remove('ng-paused');
if(!this.gameOver&&!this.paused&&!this.intervalId&&!this._animating)this.startLoop();
}
};


const Minesweeper={
ROWS:9,COLS:9,MINES:10,
grid:null,cells:null,boardEl:null,
countEl:null,flagsEl:null,flagBtnEl:null,
started:false,gameOver:false,won:false,flagMode:false,
_pressTimer:null,_didLongPress:false,_touchStartPos:null,
_eventsAttached:false,_tabPaused:false,

init(stage){
clearNode(stage);
const wrap=el('div',{class:'ng-mines'});
const header=el('div',{class:'ng-game-header'});
const mkStat=(label,initial)=>{
const box=el('div',{class:'ng-score-box'});
box.appendChild(el('div',{class:'ng-score-label',text:label}));
const val=el('div',{class:'ng-score-value',text:initial});
box.appendChild(val);
return{box,val};
};
const countStat=mkStat(t('mines'),String(this.MINES));
const flagsStat=mkStat(t('flags'),'0');
this.countEl=countStat.val;this.flagsEl=flagsStat.val;
header.appendChild(countStat.box);header.appendChild(flagsStat.box);
const newBtn=el('button',{class:'ng-btn ng-btn-primary',text:t('newgame')});
header.appendChild(newBtn);
wrap.appendChild(header);


const toolbar=el('div',{class:'ng-mines-toolbar'});
const flagBtn=el('button',{class:'ng-flag-toggle',type:'button'});
flagBtn.appendChild(el('span',{
class:'icon',
html:icon('red-flag',20)||'🚩'
}));
flagBtn.appendChild(el('span',{class:'label',text:t('flagMode')}));
flagBtn.appendChild(el('span',{class:'state',text:'OFF'}));
this.flagBtnEl=flagBtn;
toolbar.appendChild(flagBtn);
wrap.appendChild(toolbar);
flagBtn.addEventListener('click',()=>this.toggleFlagMode());

const board=el('div',{class:'ng-board-mines'});
this.boardEl=board;
board.style.gridTemplateColumns='repeat('+this.COLS+', 1fr)';
wrap.appendChild(board);
wrap.appendChild(el('div',{class:'ng-hint',text:t('hint.mines')}));
stage.appendChild(wrap);

newBtn.addEventListener('click',()=>this.newGame());
this.attachEvents();
this.newGame();
},

toggleFlagMode(){
if(this.gameOver||this._tabPaused)return;
this.flagMode=!this.flagMode;
this.updateFlagModeUI();
if(navigator.vibrate){try{navigator.vibrate(15);}catch(e){}}
},

updateFlagModeUI(){
if(!this.flagBtnEl)return;
this.flagBtnEl.classList.toggle('active',this.flagMode);
const stateEl=this.flagBtnEl.querySelector('.state');
if(stateEl)stateEl.textContent=this.flagMode?'ON':'OFF';
const labelEl=this.flagBtnEl.querySelector('.label');
if(labelEl)labelEl.textContent=this.flagMode?t('flagMode.active'):t('flagMode');
if(this.boardEl)this.boardEl.classList.toggle('flag-mode',this.flagMode);
},

newGame(){
this.started=false;this.gameOver=false;this.won=false;this.flagMode=false;
this._tabPaused=false;this._didLongPress=false;this._touchStartPos=null;
if(this.boardEl)this.boardEl.classList.remove('ng-paused');
if(this._pressTimer){clearTimeout(this._pressTimer);this._pressTimer=null;}
const old=this.boardEl.parentElement.querySelector('.ng-overlay');
if(old)old.remove();
this.grid=[];
for(let r=0;r<this.ROWS;r++){
const row=[];
for(let c=0;c<this.COLS;c++)row.push({mine:false,revealed:false,flagged:false,count:0});
this.grid.push(row);
}
clearNode(this.boardEl);
this.cells=[];
for(let r=0;r<this.ROWS;r++){
const row=[];
for(let c=0;c<this.COLS;c++){
const btn=el('button',{class:'ng-mine-cell',type:'button','data-r':String(r),'data-c':String(c)});
this.boardEl.appendChild(btn);
row.push(btn);
}
this.cells.push(row);
}
this.updateStats();
this.updateFlagModeUI();
},

attachEvents(){
if(this._eventsAttached)return;
this._eventsAttached=true;
const board=this.boardEl;
board.addEventListener('click',(e)=>{
if(this._tabPaused)return;
if(this._didLongPress){this._didLongPress=false;return;}
const cell=e.target.closest('.ng-mine-cell');
if(!cell)return;
const r=+cell.dataset.r,c=+cell.dataset.c;
if(this.flagMode){
if(this.toggleFlag(r,c)){
this.flagMode=false;
this.updateFlagModeUI();
if(navigator.vibrate){try{navigator.vibrate(20);}catch(err){}}
}
return;
}
this.reveal(r,c);
});
board.addEventListener('contextmenu',(e)=>{
if(this._tabPaused)return;
const cell=e.target.closest('.ng-mine-cell');
if(!cell)return;
e.preventDefault();
if(this._didLongPress){this._didLongPress=false;return;}
this.toggleFlag(+cell.dataset.r,+cell.dataset.c);
});
board.addEventListener('touchstart',(e)=>{
if(this._tabPaused)return;
const cell=e.target.closest('.ng-mine-cell');
if(!cell)return;
this._didLongPress=false;
this._touchStartPos={x:e.touches[0].clientX,y:e.touches[0].clientY};
if(this._pressTimer)clearTimeout(this._pressTimer);
this._pressTimer=setTimeout(()=>{
this._pressTimer=null;
if(!this._touchStartPos)return;
this._didLongPress=true;
this.toggleFlag(+cell.dataset.r,+cell.dataset.c);
if(navigator.vibrate){try{navigator.vibrate(30);}catch(err){}}
},400);
},{passive:true});
board.addEventListener('touchmove',(e)=>{
if(!this._touchStartPos||!this._pressTimer)return;
const dx=e.touches[0].clientX-this._touchStartPos.x;
const dy=e.touches[0].clientY-this._touchStartPos.y;
if(Math.abs(dx)>12||Math.abs(dy)>12){
clearTimeout(this._pressTimer);this._pressTimer=null;this._touchStartPos=null;
}
},{passive:true});
const cancelPress=()=>{
if(this._pressTimer){clearTimeout(this._pressTimer);this._pressTimer=null;}
this._touchStartPos=null;
};
board.addEventListener('touchend',cancelPress);
board.addEventListener('touchcancel',cancelPress);
},

placeMines(safeR,safeC){
const forbidden=new Set();
for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++)forbidden.add((safeR+dr)+','+(safeC+dc));
let placed=0,guard=0;
while(placed<this.MINES&&guard<5000){
guard++;
const r=Math.floor(Math.random()*this.ROWS),c=Math.floor(Math.random()*this.COLS);
if(this.grid[r][c].mine||forbidden.has(r+','+c))continue;
this.grid[r][c].mine=true;placed++;
}
for(let r=0;r<this.ROWS;r++)for(let c=0;c<this.COLS;c++){
let cnt=0;
for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){
if(dr===0&&dc===0)continue;
const nr=r+dr,nc=c+dc;
if(nr<0||nr>=this.ROWS||nc<0||nc>=this.COLS)continue;
if(this.grid[nr][nc].mine)cnt++;
}
this.grid[r][c].count=cnt;
}
},

reveal(r,c){
if(this.gameOver||this._tabPaused)return;
const cell=this.grid[r][c];
if(cell.revealed||cell.flagged)return;
if(!this.started){this.started=true;this.placeMines(r,c);}
if(cell.mine){
cell.revealed=true;
this.renderCell(r,c);
this.gameOver=true;
this.revealAllMines();
this.showResult(false);
return;
}
this.floodReveal(r,c);
this.checkWin();
},

floodReveal(sr,sc){
const stack=[[sr,sc]];
while(stack.length){
const[r,c]=stack.pop();
if(r<0||r>=this.ROWS||c<0||c>=this.COLS)continue;
const cell=this.grid[r][c];
if(cell.revealed||cell.flagged)continue;
cell.revealed=true;
this.renderCell(r,c);
if(cell.count===0){
for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){
if(dr===0&&dc===0)continue;
stack.push([r+dr,c+dc]);
}
}
}
},

toggleFlag(r,c){
if(this.gameOver||this._tabPaused)return false;
const cell=this.grid[r][c];
if(cell.revealed)return false;
cell.flagged=!cell.flagged;
this.renderCell(r,c);
this.updateStats();
return true;
},

renderCell(r,c){
const cell=this.grid[r][c];
const btn=this.cells[r][c];
btn.classList.toggle('revealed',cell.revealed);
btn.classList.toggle('flagged',cell.flagged);
btn.classList.toggle('mine',cell.revealed&&cell.mine);


if(cell.revealed){
if(cell.mine){
btn.innerHTML=icon('bomb',18)||'💣';
delete btn.dataset.count;
btn.classList.remove('n0');
}else if(cell.count>0){
btn.textContent=cell.count;
btn.dataset.count=String(cell.count);
btn.classList.remove('n0');
}else{
btn.textContent='';
delete btn.dataset.count;
btn.classList.add('n0');
}
}else if(cell.flagged){
btn.innerHTML=icon('red-flag',18)||'🚩';
delete btn.dataset.count;
btn.classList.remove('n0');
}else{
btn.textContent='';
delete btn.dataset.count;
btn.classList.remove('n0');
}
},

revealAllMines(){
for(let r=0;r<this.ROWS;r++)for(let c=0;c<this.COLS;c++){
const cell=this.grid[r][c];
if(cell.mine&&!cell.flagged&&!cell.revealed){
cell.revealed=true;
this.renderCell(r,c);
}
}
},

checkWin(){
for(let r=0;r<this.ROWS;r++)for(let c=0;c<this.COLS;c++){
const cell=this.grid[r][c];
if(!cell.mine&&!cell.revealed)return;
}
this.gameOver=true;
this.won=true;
this.showResult(true);
},

updateStats(){
let flags=0;
for(let r=0;r<this.ROWS;r++)for(let c=0;c<this.COLS;c++)if(this.grid[r][c].flagged)flags++;
if(this.countEl)this.countEl.textContent=Math.max(0,this.MINES-flags);
if(this.flagsEl)this.flagsEl.textContent=flags;
},

showResult(won){
const ov=el('div',{class:'ng-overlay'});
const content=el('div',{class:'ng-overlay-content'});


let titleHtml;
if(won){
titleHtml=icon('confetti',24)+' '+t('youwin');
}else{
titleHtml=icon('bomb',24)+' '+t('boom');
}
content.appendChild(el('div',{class:'ng-overlay-title',html:titleHtml}));
content.appendChild(el('div',{class:'ng-overlay-sub',text:won?t('all_safe'):t('stepped_mine')}));
const btn=el('button',{class:'ng-btn ng-btn-primary',text:t('retry')});
content.appendChild(btn);
ov.appendChild(content);
this.boardEl.parentElement.appendChild(ov);
btn.addEventListener('click',()=>{ov.remove();this.newGame();});
},

pause(){this._tabPaused=true;if(this.boardEl)this.boardEl.classList.add('ng-paused');},
resume(){this._tabPaused=false;if(this.boardEl)this.boardEl.classList.remove('ng-paused');}
};


const registry={
t2048:{label:()=>t('tab.2048'),init:(s)=>Game2048.init(s),pause:()=>Game2048.pause(),resume:()=>Game2048.resume()},
tetris:{label:()=>t('tab.tetris'),init:(s)=>Tetris.init(s),pause:()=>Tetris.pause(),resume:()=>Tetris.resume()},
mines:{label:()=>t('tab.mines'),init:(s)=>Minesweeper.init(s),pause:()=>Minesweeper.pause(),resume:()=>Minesweeper.resume()}
};
const order=['t2048','tetris','mines'];
const initialized=new Set();
let currentGameId=null;
let rootEl=null,stagesRef=null,tabsRef=null;

function ensureInit(id){
if(initialized.has(id)){
const g=registry[id];
if(g&&typeof g.resume==='function'){try{g.resume();}catch(e){}}
return;
}
initialized.add(id);
try{
registry[id].init(stagesRef[id]);
}catch(e){
console.error('[NibblyGames] Error init '+id,e);
stagesRef[id].innerHTML='';
const errBox=el('div',{style:{padding:'24px',textAlign:'center',color:'var(--on-variant, #aaa)',fontSize:'13px'}});
errBox.textContent=t('error')+': '+(e&&e.message?e.message:id);
stagesRef[id].appendChild(errBox);
}
}

function showGame(id,root,stages){
if(currentGameId&&currentGameId!==id){
const prev=registry[currentGameId];
if(prev&&typeof prev.pause==='function'){try{prev.pause();}catch(e){}}
}
root.querySelectorAll('.ng-tab').forEach((tb)=>tb.classList.toggle('active',tb.dataset.game===id));
root.querySelectorAll('.ng-stage').forEach((st)=>st.classList.toggle('active',st.id==='ng-stage-'+id));
ensureInit(id);
currentGameId=id;
}

function rebuildTabs(){
if(!rootEl||!tabsRef)return;
clearNode(tabsRef);
order.forEach((id)=>{
const btn=el('button',{class:'ng-tab'+(currentGameId===id?' active':''),'data-game':id,text:registry[id].label()});
btn.addEventListener('click',()=>showGame(id,rootEl,stagesRef));
tabsRef.appendChild(btn);
});
}

window.NibblyGames={
init(container){
if(!container)return;
clearNode(container);
const root=el('div',{class:'nibbly-games'});
const tabs=el('div',{class:'ng-tabs'});
const tabBtns={};
order.forEach((id)=>{
const btn=el('button',{class:'ng-tab'+(id==='t2048'?' active':''),'data-game':id,text:registry[id].label()});
tabBtns[id]=btn;
tabs.appendChild(btn);
});
root.appendChild(tabs);
const stages={};
order.forEach((id)=>{
const stage=el('div',{class:'ng-stage'+(id==='t2048'?' active':''),id:'ng-stage-'+id});
stages[id]=stage;
root.appendChild(stage);
});
container.appendChild(root);
rootEl=root;stagesRef=stages;tabsRef=tabs;
Object.keys(tabBtns).forEach((id)=>{
tabBtns[id].addEventListener('click',()=>showGame(id,root,stages));
});
showGame('t2048',root,stages);
},
extend(def){
if(!def||!def.id||typeof def.init!=='function')return false;
if(registry[def.id])return false;
registry[def.id]={label:def.label||(()=>def.id),init:def.init,pause:def.pause,resume:def.resume};
order.push(def.id);
if(!rootEl)return true;
const stage=el('div',{class:'ng-stage',id:'ng-stage-'+def.id});
stagesRef[def.id]=stage;
rootEl.appendChild(stage);
rebuildTabs();
return true;
},
pauseActive(){
if(!currentGameId)return;
const g=registry[currentGameId];
if(g&&typeof g.pause==='function'){try{g.pause();}catch(e){}}
},
resumeActive(){
if(!currentGameId)return;
const g=registry[currentGameId];
if(g&&typeof g.resume==='function'){try{g.resume();}catch(e){}}
},
getGames(){return order.slice();}
};
if(console&&console.debug)console.debug('[NibblyGames] games.js loaded (v2.0.28)');
})();