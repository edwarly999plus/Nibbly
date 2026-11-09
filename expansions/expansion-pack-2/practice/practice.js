(function(){
'use strict';
if(window.NibblyModules&&window.NibblyModules.practice)return;


function icon(name,size,fallback){
if(window.NibblyIcons){
const html=window.NibblyIcons.get(name,{size:size||16});
if(html)return html;
}
return fallback||'';
}

function getLang(){
try{
const s=JSON.parse(localStorage.getItem('nibbly-settings-v2')||'{}');
return s.lang||'es';
}catch(e){return'es';}
}

const I18N={
es:{
title:'Práctica',
modePractice:'Práctica',
modeExam:'Examen',
diffEasy:'Fácil',
diffNormal:'Normal',
diffHard:'Difícil',
newExercise:'Nuevo ejercicio',
convert:'Convierte',
from:'de',
to:'a',
verify:'Verificar',
reset:'Reiniciar',
yourResult:'Tu resultado',
realResult:'Resultado real',
correct:'✓ Correcto',
wrong:'✗ Incorrecto',
downloadCsv:'Descargar CSV',
csvLocked:'Corrige todo para descargar',
emptyInput:'Rellena todas las celdas obligatorias primero',
examNoReveal:'Sigue intentando — en modo Examen no se revela nada',
resetOnLeave:'El progreso se reinicia al cambiar de pestaña',
instructions:'Rellena los pasos intermedios. Al verificar, las celdas correctas se ponen verdes y las incorrectas rojas.',
base2:'Binario',
base8:'Octal',
base10:'Decimal',
base16:'Hexadecimal',
stepDivision:'División',
stepQuotient:'Cociente',
stepResidue:'Residuo',
stepDigit:'Dígito',
stepBits:'Bits',
stepValue:'Valor',
stepValueDec:'Valor (dec)',
stepDecimal:'Decimal',
stepQuotientInt:'Cociente',
stepPower:'Potencia',
stepWeight:'Peso',
stepProduct:'Producto',
stepSum:'Suma total',
stepResult:'Resultado',
stepRow:'#',
stepDecimalDigit:'Dígito decimal',
examWinEgg:'¡Bien hecho!',
examLoseEgg:'Sigue intentando',
eggsWin:[
'¡Nada mal para un cadete!',
'¡Que bonito se ve ese verde!',
'¡Genial! Espero que sea así en un examen real, ¡Buena Suerte!',
'GG',
'¡Impresionante!',
'¡Lo logro señor!',
'¡ERES LA CABRA!',
'Creo que ni tú sabes cómo lo lograste... ¿O Sí?',
'Lo hiciste bien',
'Lo has logrado',
'Lo hiciste bien, Eso sí, nada de TikTok 24/7 antes del examen, ¿Quedó claro?',
'Me dejaste sin palabras',
"Ta' bien",
'Según mis cálculos, ¡Es Correcto!',
'Si.'
],
eggsLose:[
'¡Ni Fú ni Fá!',
'Solo te digo que el golpe avisa...',
'No me satisface',
'Si sigues así no llegarás a nada',
'¡NADA!',
'Práctica y vuelve cuando estés preparado',
'Quien sabe, a lo mejor un pequeño error te arruinó',
'Goku... esta vaina es seria',
'Uhhh... ok? si tú lo dices',
'Si no puedes con esto, mejor agarra la pala',
'no sé qué decir',
'Que bonito se ve ese color rojo, mi favorito (realmente no)',
'¡Que bonito se ve ese cero!',
'El examen te dejó 7-0',
'Creo que estás pasando un mal rato',
'El TikTok te tiene podrido',
'El YT Shorts te tiene podrido',
'Los reels te tienen podrido',
'¡Jakajakajakaj!',
'No.'
],
helpTitle:'📘 Cómo calcular',
helpResidue:'Residuo: el sobrante de la división',
helpResidueEx:'Ej: 478 ÷ 16 = 29 (cociente entero × la base). Multiplica 29 × 16 = 464. Resta (divisor − resultado) 478 − 464 = 14. Residuo = 14. Si el residuo sale negativo, conviértelo a positivo.',
helpQuotient:'Cociente: el resultado entero de la división',
helpQuotientEx:'Ej: 478 ÷ 16 = 29.875. El cociente entero es 29 (sin decimales).',
helpQuotientInt:'Cociente entero: divídelo sin decimales y anota el resultado',
helpQuotientIntEx:'Ej: 478 ÷ 2 = 239. Coloca 239 en la columna Cociente. Luego 239 ÷ 2 = 119.5 → cociente 119.',
helpPower:'Potencia: el exponente de la base según la posición',
helpPowerEx:'Ej: en hex A1B, A está en posición 2 → 16². B está en posición 0 → 16⁰ = 1 y el 1 está en posición 1 → 1¹ = 1.',
helpWeight:'Peso: la base elevada a la potencia',
helpWeightEx:'Ej: 16² = 256. 16⁰ = 1. 16¹ = 16.',
helpProduct:'Producto: valor del dígito × peso',
helpProductEx:'Ej: A = 10 → 10 × 256 = 2560. B = 11 → 11 × 1 = 11.',
helpValue:'Valor: el número decimal del dígito',
helpValueEx:'Ej: A = 10, B = 11, C = 12, D = 13, E = 14, F = 15. En octal solo hay dígitos 0-7: 0 = 0, 1 = 1, ..., 7 = 7.',
helpBits:'Bits: convierte el dígito decimal a binario',
helpBitsEx:'Ej: 5 = 0101, 7 = 0111, A = 1010 (4 bits) o 101 (3 bits, octal).',
helpGroup:'Valor del grupo: convierte el grupo de bits a decimal',
helpGroupEx:'Ej: 1010 (binario) = 10 (decimal) = A (hex).',
helpBitsToDecimal:'Decimal: convierte el grupo de bits a decimal',
helpBitsToDecimalEx:'Ej: 101 (binario) = 4+0+1 = 5 (decimal). 1111 (binario) = 8+4+2+1 = 15 (decimal).',
helpDecimalToBase:'Valor en la base destino: convierte el decimal',
helpDecimalToBaseEx:'Ej: 5 (decimal) = 5 (octal). 15 (decimal) = F (hex). 10 (decimal) = A (hex) o 12 (octal).',
helpSum:'Suma todos los productos para obtener el resultado final',
helpSumEx:'Ej: 10×256 + 1×16 + 11×1 = 2560 + 16 + 11 = 2587. Ese 2587 es el resultado final en decimal.',
helpBcd:'BCD: convierte cada dígito decimal a su binario de 4 bits',
helpBcdEx:'Ej: 18 → 1 = 0001, 8 = 1000 → resultado 00011000. Nunca se usa A-F, solo dígitos 0-9.',
readOrder:'📖 Cómo leer el resultado',
readOrderDiv:'Lee los residuos de abajo hacia arriba (del último al primero)',
readOrderDivEx:'Ej: si obtienes residuos 1, 1, 1, 0 (de arriba a abajo en la tabla), el resultado es 0111 (leído de abajo a arriba).',
readOrderWeights:'Suma todos los productos para obtener el resultado final',
readOrderWeightsEx:'Ej: 10×256 + 1×16 + 11×1 = 2560 + 16 + 11 = 2587. Ese es el resultado.',
readOrderGroups:'Lee los valores de arriba a abajo (en el mismo orden de las filas)',
readOrderGroupsEx:'Ej: fila 1 = 101 → 5, fila 2 = 101 → 5. El resultado es 55.',
readOrderDigitBits:'Lee los bits de arriba a abajo (en el mismo orden de las filas)',
readOrderDigitBitsEx:'Ej: fila 1 = A → 1010, fila 2 = F → 1111. El resultado es 10101111.',
readOrderDouble:'Lee la fase ② de arriba a abajo (en el mismo orden de las filas)',
readOrderDoubleEx:'Ej: fila 1 = 111 → 7, fila 2 = 101 → 5. El resultado es 75.',
opDivisionNote:'divide por la base en cada paso',
opMultiplicationNote:'valor × peso = producto',
opGroupsNote:'agrupa en grupos de {0} bits',
opGroupsToDecimalNote:'agrupa en {0} bits → decimal → {1}',
opDigitBitsNote:'convierte el valor decimal a {0} bits',
opBcdNote:'cada dígito decimal → 4 bits',
scratchTitle:'📝 Espacio de trabajo',
scratchPlaceholder:'Escribe aquí tus cálculos, notas o desarrollo paso a paso...',
calcTitle:'🧮 Mini calculadora',
calcDisabled:'Calculadora desactivada en modo Difícil',
optional:'(opcional)',
close:'Cerrar'
},
en:{
title:'Practice',
modePractice:'Practice',
modeExam:'Exam',
diffEasy:'Easy',
diffNormal:'Normal',
diffHard:'Hard',
newExercise:'New exercise',
convert:'Convert',
from:'from',
to:'to',
verify:'Verify',
reset:'Reset',
yourResult:'Your result',
realResult:'Real result',
correct:'✓ Correct',
wrong:'✗ Incorrect',
downloadCsv:'Download CSV',
csvLocked:'Fix all cells to download',
emptyInput:'Fill all required cells first',
examNoReveal:'Keep trying — no answer revealed in Exam mode',
resetOnLeave:'Progress reset when leaving the tab',
instructions:'Fill the intermediate steps. On verify, correct cells turn green and wrong ones red.',
base2:'Binary',
base8:'Octal',
base10:'Decimal',
base16:'Hexadecimal',
stepDivision:'Division',
stepQuotient:'Quotient',
stepResidue:'Remainder',
stepDigit:'Digit',
stepBits:'Bits',
stepValue:'Value',
stepValueDec:'Value (dec)',
stepDecimal:'Decimal',
stepQuotientInt:'Quotient',
stepPower:'Power',
stepWeight:'Weight',
stepProduct:'Product',
stepSum:'Total sum',
stepResult:'Result',
stepRow:'#',
stepDecimalDigit:'Decimal digit',
examWinEgg:'Well done!',
examLoseEgg:'Keep trying',
eggsWin:[
'GG',
'Well done!',
'Impressive!',
'You did it!',
'You made it!',
'That is correct!',
'Yes.',
'YOU ARE THE GOAT!'
],
eggsLose:[
'Nope.',
'Not even close.',
'Practice and come back when you are ready.',
'Who knows, maybe one small mistake ruined it.',
'Uh... ok? if you say so.',
'No TikTok for you today.',
'Such a beautiful red... my favorite (not really).',
'Such a beautiful zero!',
'The exam left you 7-0.',
'I think you are having a rough time.',
'Keep trying.'
],
helpTitle:'📘 How to calculate',
helpResidue:'Remainder: what is left over from division',
helpResidueEx:'Ex: 478 ÷ 16 = 29 (integer quotient × the base). Multiply 29 × 16 = 464. Subtract (divisor − result) 478 − 464 = 14. Remainder = 14. If the remainder is negative, convert it to positive.',
helpQuotient:'Quotient: the integer result of division',
helpQuotientEx:'Ex: 478 ÷ 16 = 29.875. The integer quotient is 29 (no decimals).',
helpQuotientInt:'Integer quotient: divide without decimals and write the result',
helpQuotientIntEx:'Ex: 478 ÷ 2 = 239. Put 239 in the Quotient column. Then 239 ÷ 2 = 119.5 → quotient 119.',
helpPower:'Power: the base exponent by position',
helpPowerEx:'Ex: in hex A1B, A is at position 2 → 16². B is at position 0 → 16⁰ = 1, and 1 is at position 1 → 1¹ = 1.',
helpWeight:'Weight: base raised to the power',
helpWeightEx:'Ex: 16² = 256. 16⁰ = 1. 16¹ = 16.',
helpProduct:'Product: digit value × weight',
helpProductEx:'Ex: A = 10 → 10 × 256 = 2560. B = 11 → 11 × 1 = 11.',
helpValue:'Value: the decimal number of the digit',
helpValueEx:'Ex: A = 10, B = 11, C = 12, D = 13, E = 14, F = 15. Octal only has digits 0-7: 0 = 0, 1 = 1, ..., 7 = 7.',
helpBits:'Bits: convert the decimal digit to binary',
helpBitsEx:'Ex: 5 = 0101, 7 = 0111, A = 1010 (4 bits) or 101 (3 bits, octal).',
helpGroup:'Group value: convert the bit group to decimal',
helpGroupEx:'Ex: 1010 (binary) = 10 (decimal) = A (hex).',
helpBitsToDecimal:'Decimal: convert the bit group to decimal',
helpBitsToDecimalEx:'Ex: 101 (binary) = 4+0+1 = 5 (decimal). 1111 (binary) = 8+4+2+1 = 15 (decimal).',
helpDecimalToBase:'Value in target base: convert the decimal',
helpDecimalToBaseEx:'Ex: 5 (decimal) = 5 (octal). 15 (decimal) = F (hex). 10 (decimal) = A (hex) or 12 (octal).',
helpSum:'Add all products to get the final result',
helpSumEx:'Ex: 10×256 + 1×16 + 11×1 = 2560 + 16 + 11 = 2587. That 2587 is the final decimal result.',
helpBcd:'BCD: convert each decimal digit to its 4-bit binary',
helpBcdEx:'Ex: 18 → 1 = 0001, 8 = 1000 → result 00011000. A-F is never used, only digits 0-9.',
readOrder:'📖 How to read the result',
readOrderDiv:'Read the remainders from bottom to top (last to first)',
readOrderDivEx:'Ex: if you get remainders 1, 1, 1, 0 (top to bottom in the table), the result is 0111 (read bottom to top).',
readOrderWeights:'Add all products to get the final result',
readOrderWeightsEx:'Ex: 10×256 + 1×16 + 11×1 = 2560 + 16 + 11 = 2587. That is the result.',
readOrderGroups:'Read the values from top to bottom (same row order)',
readOrderGroupsEx:'Ex: row 1 = 101 → 5, row 2 = 101 → 5. Result is 55.',
readOrderDigitBits:'Read the bits from top to bottom (same row order)',
readOrderDigitBitsEx:'Ex: row 1 = A → 1010, row 2 = F → 1111. Result is 10101111.',
readOrderDouble:'Read phase ② from top to bottom (same row order)',
readOrderDoubleEx:'Ex: row 1 = 111 → 7, row 2 = 101 → 5. Result is 75.',
opDivisionNote:'divide by the base at each step',
opMultiplicationNote:'value × weight = product',
opGroupsNote:'group into groups of {0} bits',
opGroupsToDecimalNote:'group into {0} bits → decimal → {1}',
opDigitBitsNote:'convert the decimal value to {0} bits',
opBcdNote:'each decimal digit → 4 bits',
scratchTitle:'📝 Scratchpad',
scratchPlaceholder:'Write your calculations, notes or step-by-step work here...',
calcTitle:'🧮 Mini calculator',
calcDisabled:'Calculator disabled in Hard mode',
optional:'(optional)',
close:'Close'
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

function esc(s){
return String(s).replace(/[&<>"']/g,c=>({
'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
}[c]));
}

function showToast(msg,isErr){
if(window.NibblyApp&&typeof window.NibblyApp.toast==='function'){
try{window.NibblyApp.toast(msg,!!isErr);return;}catch(_){}
}
}

function pleaseDontActive(){
try{
const raw=localStorage.getItem('nibbly-settings-v2');
if(!raw)return false;
const s=JSON.parse(raw);
return!!s.pleaseDont;
}catch(_){return false;}
}


window.__nibblyPracticeDev=window.__nibblyPracticeDev||{
calcEnabled:false,
convertDelay:3000
};


function pickEgg(kind){
const lang=getLang();
const list=(I18N[lang]&&I18N[lang][kind])||I18N.es[kind]||[];
if(!list.length)return'';
return list[Math.floor(Math.random()*list.length)];
}


const DIFFICULTY={
easy:{
maxDecimal:31,
convs:['dec2bin','dec2oct','dec2hex','dec2binPuro','dec2bcd','bin2dec','bin2oct','bin2hex','oct2dec','oct2bin','oct2binPuro','hex2dec','hex2bin','hex2binPuro']
},
normal:{
maxDecimal:255,
convs:['dec2bin','dec2oct','dec2hex','dec2binPuro','dec2bcd','bin2oct','bin2hex','bin2dec','oct2dec','oct2bin','oct2binPuro','oct2hex','hex2dec','hex2bin','hex2binPuro','hex2oct']
},
hard:{
maxDecimal:65535,
convs:['dec2bin','dec2oct','dec2hex','dec2hexFrac','dec2binPuro','dec2bcd','bin2oct','bin2hex','bin2dec','oct2dec','oct2bin','oct2binPuro','oct2hex','hex2dec','hex2bin','hex2binPuro','hex2oct'],
includeFrac:true
}
};

const CONV_INFO={
dec2bin:{fromBase:10,toBase:2,type:'div'},
dec2oct:{fromBase:10,toBase:8,type:'div'},
dec2hex:{fromBase:10,toBase:16,type:'div'},
dec2hexFrac:{fromBase:10,toBase:16,type:'divfrac'},
dec2binPuro:{fromBase:10,toBase:2,type:'div',noPad:true},
dec2bcd:{fromBase:10,toBase:2,type:'bcd'},
bin2oct:{fromBase:2,toBase:8,type:'groups3'},
bin2hex:{fromBase:2,toBase:16,type:'groups4'},
bin2dec:{fromBase:2,toBase:10,type:'weights'},
oct2dec:{fromBase:8,toBase:10,type:'weights'},
oct2bin:{fromBase:8,toBase:2,type:'digitbits3'},
oct2binPuro:{fromBase:8,toBase:2,type:'digitbits3',noPad:true},
oct2hex:{fromBase:8,toBase:16,type:'double3to4'},
hex2dec:{fromBase:16,toBase:10,type:'weights'},
hex2bin:{fromBase:16,toBase:2,type:'digitbits4'},
hex2binPuro:{fromBase:16,toBase:2,type:'digitbits4',noPad:true},
hex2oct:{fromBase:16,toBase:8,type:'double4to3'}
};


const HEX='0123456789ABCDEF';

function fromDecimal(n,base){
if(n===0)return'0';
const digits=[];
while(n>0){
const r=n%base;
digits.push(HEX[r]);
n=Math.floor(n/base);
}
return digits.reverse().join('');
}

function randInt(min,max){
return Math.floor(Math.random()*(max-min+1))+min;
}


function generateExercise(diff,customConv){
const conf=DIFFICULTY[diff];
const convs=conf.convs;
const convId=customConv&&convs.indexOf(customConv)!==-1
?customConv
:convs[Math.floor(Math.random()*convs.length)];
const info=CONV_INFO[convId];

let decValue=randInt(1,conf.maxDecimal);
let inputStr,steps,expectedAnswer;

if(info.type==='div'||info.type==='divfrac'){
inputStr=String(decValue);
steps=buildDivSteps(decValue,info.toBase);
let rawAnswer=steps.map(s=>s.rRaw).reverse().join('');
if(info.toBase===2&&!info.noPad){
const padTo=Math.ceil(rawAnswer.length/4)*4;
rawAnswer=rawAnswer.padStart(padTo,'0');
}
expectedAnswer=rawAnswer;
}
else if(info.type==='bcd'){
inputStr=String(decValue);
steps=buildBcdSteps(decValue);
expectedAnswer=steps.map(s=>s.bits).join('');
}
else if(info.type==='groups3'||info.type==='groups4'){
const bitsGroupSize=info.type==='groups3'?3:4;
const targetBase=info.type==='groups3'?8:16;
let bits=fromDecimal(decValue,2);
const padTo=Math.ceil(bits.length/bitsGroupSize)*bitsGroupSize;
bits=bits.padStart(padTo,'0');
inputStr=bits;
steps=buildGroupsSteps(bits,bitsGroupSize,targetBase);
expectedAnswer=fromDecimal(decValue,targetBase);
}
else if(info.type==='weights'){
let inputInBase=fromDecimal(decValue,info.fromBase);
inputStr=inputInBase;
steps=buildWeightsSteps(inputInBase,info.fromBase);
expectedAnswer=String(decValue);
}
else if(info.type==='digitbits3'||info.type==='digitbits4'){
let inputInBase=fromDecimal(decValue,info.fromBase);
inputStr=inputInBase;
const bitsPer=info.type==='digitbits3'?3:4;
steps=buildDigitBitsSteps(inputInBase,info.fromBase,bitsPer);
if(info.noPad){
let joined=steps.map(s=>s.bits).join('');
joined=joined.replace(/^0+(?=.)/,'');
expectedAnswer=joined;
}else{
expectedAnswer=steps.map(s=>s.bits).join('');
}
}
else if(info.type==='double3to4'||info.type==='double4to3'){
let inputInBase=fromDecimal(decValue,info.fromBase);
inputStr=inputInBase;
steps=buildDoubleSteps(inputInBase,info.fromBase,info.toBase);
expectedAnswer=steps.step2.map(s=>s.value).join('');
}
else{
inputStr=String(decValue);
steps=[];
expectedAnswer=fromDecimal(decValue,info.toBase);
}

return{
convId,
info,
input:inputStr,
expectedAnswer,
steps,
decValue
};
}

function buildDivSteps(n,base){
const steps=[];
let v=Math.floor(n);
if(v===0){
steps.push({div:'0 ÷ '+base,q:'0',r:'0',rRaw:'0'});
return steps;
}
while(v>0){
const q=Math.floor(v/base);
const r=v%base;
steps.push({
div:v+' ÷ '+base,
q:String(q),
r:base===16?r+' ('+HEX[r]+')':String(r),
rRaw:base===16?HEX[r]:String(r)
});
v=q;
}
return steps;
}

function buildBcdSteps(n){
const str=String(Math.floor(n));
const steps=[];
for(let i=0;i<str.length;i++){
const digit=str[i];
const val=parseInt(digit,10);
const bits=val.toString(2).padStart(4,'0');
steps.push({
digit:digit,
value:String(val),
bits:bits
});
}
return steps;
}

function buildGroupsSteps(bits,groupSize,base){
const groups=[];
for(let i=0;i<bits.length;i+=groupSize){
const g=bits.slice(i,i+groupSize);
const dec=parseInt(g,2);
groups.push({
bits:g,
decimal:String(dec),
value:dec.toString(base).toUpperCase()
});
}
return groups;
}

function buildWeightsSteps(str,base){
const steps=[];
const len=str.length;
for(let i=0;i<len;i++){
const c=str[i];
const digitValue=parseInt(c,16);
const power=len-1-i;
const weight=Math.pow(base,power);
const product=digitValue*weight;
steps.push({
digit:c,
value:String(digitValue),
power:String(power),
weight:String(weight),
product:String(product)
});
}
return steps;
}

function buildDigitBitsSteps(str,base,bitsPerDigit){
const steps=[];
for(let i=0;i<str.length;i++){
const c=str[i];
const v=parseInt(c,16);
const bits=v.toString(2).padStart(bitsPerDigit,'0');
steps.push({
digit:c,
value:String(v),
bits
});
}
return steps;
}

function buildDoubleSteps(inputInBase,fromBase,toBase){
const bitsPerDigitFrom=fromBase===8?3:4;
const bitsPerDigitTo=toBase===8?3:4;

const step1=[];
let bitsPath='';
for(let i=0;i<inputInBase.length;i++){
const c=inputInBase[i];
const v=parseInt(c,16);
const b=v.toString(2).padStart(bitsPerDigitFrom,'0');
step1.push({
digit:c,
value:String(v),
bits:b
});
bitsPath+=b;
}

const padded=bitsPath.padStart(Math.ceil(bitsPath.length/bitsPerDigitTo)*bitsPerDigitTo,'0');
const step2=[];
for(let i=0;i<padded.length;i+=bitsPerDigitTo){
const g=padded.slice(i,i+bitsPerDigitTo);
const dec=parseInt(g,2);
step2.push({
bits:g,
decimal:String(dec),
value:dec.toString(toBase).toUpperCase()
});
}

return{step1,step2,bitsPath:padded};
}


let state={
mode:'practice',
difficulty:'easy',
exercise:null,
attempt:[],
verified:false,
allCorrect:false,
scratch:''
};

let container=null;

function resetState(){
state.exercise=null;
state.attempt=[];
state.verified=false;
state.allCorrect=false;
state.scratch='';
}


function renderAll(){
if(!container)return;
container.innerHTML='';
const root=document.createElement('div');
root.className='nibbly-practice';
root.id='pRoot';
root.appendChild(buildHeader());
root.appendChild(buildDifficultyBar());


const cardSlot=document.createElement('div');
cardSlot.id='pExerciseCardSlot';
root.appendChild(cardSlot);

root.appendChild(buildScratchpad());
root.appendChild(buildCalculator());
root.appendChild(buildActions());
root.appendChild(buildFeedback());
root.appendChild(buildHint());
container.appendChild(root);


renderExerciseCard();


attachEvents();
}

function renderExerciseCard(){
if(!container)return;
const slot=container.querySelector('#pExerciseCardSlot');
if(!slot)return;

if(!state.exercise){
slot.innerHTML='<div class="p-card"><div class="p-empty">'+esc(t('newExercise'))+'</div></div>';
return;
}

slot.innerHTML='';
slot.appendChild(buildExerciseCard());


attachExerciseInputEvents();
}

function buildHeader(){
const wrap=document.createElement('div');
wrap.className='p-mode-seg';
const btnP=document.createElement('button');
btnP.type='button';
btnP.className='p-seg-btn'+(state.mode==='practice'?' active':'');
btnP.textContent=t('modePractice');
btnP.dataset.mode='practice';
const btnE=document.createElement('button');
btnE.type='button';
btnE.className='p-seg-btn'+(state.mode==='exam'?' active':'');
btnE.textContent=t('modeExam');
btnE.dataset.mode='exam';
wrap.appendChild(btnP);
wrap.appendChild(btnE);
return wrap;
}

function buildDifficultyBar(){
const wrap=document.createElement('div');
wrap.className='p-diff-seg';
['easy','normal','hard'].forEach(d=>{
const b=document.createElement('button');
b.type='button';
b.className='p-diff-btn'+(state.difficulty===d?' active':'');
b.textContent=t('diff'+d.charAt(0).toUpperCase()+d.slice(1));
b.dataset.diff=d;
wrap.appendChild(b);
});
const newBtn=document.createElement('button');
newBtn.type='button';
newBtn.className='p-new-btn';
newBtn.id='pNewExerciseBtn';
newBtn.innerHTML=icon('reload',16)+' <span>'+esc(t('newExercise'))+'</span>';
wrap.appendChild(newBtn);
return wrap;
}

function buildExerciseCard(){
const card=document.createElement('div');
card.className='p-card';
if(!state.exercise){
card.innerHTML='<div class="p-empty">'+esc(t('newExercise'))+'</div>';
return card;
}

const ex=state.exercise;
const info=ex.info;
const header=document.createElement('div');
header.className='p-header';
header.innerHTML=
'<div class="p-prompt">'+esc(t('convert'))+
' <b class="p-input-value">'+esc(ex.input)+'</b> '+
'<span class="p-base-tag">('+esc(getBaseName(info.fromBase))+')</span>'+
' → <span class="p-base-tag">'+esc(getBaseName(info.toBase))+'</span></div>';
card.appendChild(header);

card.appendChild(buildTable(ex));

const helpBox=buildHelpBox(ex);
if(helpBox)card.appendChild(helpBox);

return card;
}

function getBaseName(base){
switch(base){
case 2:return t('base2');
case 8:return t('base8');
case 10:return t('base10');
case 16:return t('base16');
}
return String(base);
}

function buildTable(ex){
const info=ex.info;
const table=document.createElement('table');
table.className='p-table';

const wrap=document.createElement('div');
wrap.className='p-table-wrap';

const opNote=document.createElement('div');
opNote.className='p-op-note';

if(info.type==='div'||info.type==='divfrac'){
const thead=document.createElement('thead');
thead.innerHTML=
'<tr>'+
'<th class="p-col-num">'+esc(t('stepRow'))+'</th>'+
'<th class="p-col-div">'+esc(t('stepDivision'))+'</th>'+
'<th class="p-col-q">'+esc(t('stepQuotientInt'))+'</th>'+
'<th class="p-col-r">'+esc(t('stepResidue'))+'</th>'+
'</tr>';
table.appendChild(thead);

opNote.innerHTML='<span class="p-op-symbol">÷</span> <span>'+esc(String(info.toBase))+' — '+esc(t('opDivisionNote'))+'</span>';
wrap.appendChild(opNote);

const tbody=document.createElement('tbody');
ex.steps.forEach((s,i)=>{
const tr=document.createElement('tr');
tr.innerHTML=
'<td class="p-row-num">'+(i+1)+'</td>'+
'<td class="p-mono">'+esc(s.div)+'</td>'+
'<td><input class="p-input" type="text" data-step="'+i+'" data-field="q" autocomplete="off" spellcheck="false" placeholder="?"></td>'+
'<td><input class="p-input" type="text" data-step="'+i+'" data-field="r" autocomplete="off" spellcheck="false" placeholder="?"></td>';
tbody.appendChild(tr);
});
table.appendChild(tbody);
}
else if(info.type==='bcd'){
const thead=document.createElement('thead');
thead.innerHTML=
'<tr>'+
'<th class="p-col-digit">'+esc(t('stepDecimalDigit'))+'</th>'+
'<th class="p-col-bits">'+esc(t('stepBits'))+'</th>'+
'</tr>';
table.appendChild(thead);

opNote.innerHTML='<span class="p-op-symbol">◫</span> <span>'+esc(t('opBcdNote'))+'</span>';
wrap.appendChild(opNote);

const tbody=document.createElement('tbody');
ex.steps.forEach((s,i)=>{
const tr=document.createElement('tr');
tr.innerHTML=
'<td class="p-mono">'+esc(s.digit)+'</td>'+
'<td><input class="p-input p-mono" type="text" data-step="'+i+'" data-field="bits" autocomplete="off" spellcheck="false" placeholder="?"></td>';
tbody.appendChild(tr);
});
table.appendChild(tbody);
}
else if(info.type==='groups3'||info.type==='groups4'){
const thead=document.createElement('thead');
thead.innerHTML=
'<tr>'+
'<th class="p-col-num">'+esc(t('stepRow'))+'</th>'+
'<th class="p-col-bits">'+esc(t('stepBits'))+'</th>'+
'<th class="p-col-dec">'+esc(t('stepDecimal'))+'</th>'+
'<th class="p-col-val">'+esc(t('stepValue'))+'</th>'+
'</tr>';
table.appendChild(thead);

const groupSize=info.type==='groups3'?3:4;
const targetBase=info.type==='groups3'?8:16;
opNote.innerHTML='<span class="p-op-symbol">◫</span> <span>'+esc(t('opGroupsToDecimalNote',groupSize,getBaseName(targetBase)))+'</span>';
wrap.appendChild(opNote);

const tbody=document.createElement('tbody');
ex.steps.forEach((s,i)=>{
const tr=document.createElement('tr');
tr.innerHTML=
'<td class="p-row-num">'+(i+1)+'</td>'+
'<td class="p-mono">'+esc(s.bits)+'</td>'+
'<td><input class="p-input" type="text" data-step="'+i+'" data-field="decimal" autocomplete="off" spellcheck="false" placeholder="?"></td>'+
'<td><input class="p-input" type="text" data-step="'+i+'" data-field="value" autocomplete="off" spellcheck="false" placeholder="?"></td>';
tbody.appendChild(tr);
});
table.appendChild(tbody);
}
else if(info.type==='weights'){
const isHard=state.difficulty==='hard';
const optMark=isHard?'':' <span class="p-opt-mark">'+esc(t('optional'))+'</span>';

const thead=document.createElement('thead');
thead.innerHTML=
'<tr>'+
'<th class="p-col-digit">'+esc(t('stepDigit'))+'</th>'+
'<th class="p-col-val">'+esc(t('stepValueDec'))+'</th>'+
'<th class="p-col-pow">'+esc(t('stepPower'))+optMark+'</th>'+
'<th class="p-col-w">'+esc(t('stepWeight'))+optMark+'</th>'+
'<th class="p-col-prod">'+esc(t('stepProduct'))+'</th>'+
'</tr>';
table.appendChild(thead);

opNote.innerHTML='<span class="p-op-symbol">×</span> <span>'+esc(t('opMultiplicationNote'))+'</span>';
wrap.appendChild(opNote);

const tbody=document.createElement('tbody');
ex.steps.forEach((s,i)=>{
const tr=document.createElement('tr');
const ph='?';
const titleOpt=isHard?'':t('optional');
tr.innerHTML=
'<td class="p-mono">'+esc(s.digit)+'</td>'+
'<td><input class="p-input" type="text" data-step="'+i+'" data-field="value" autocomplete="off" spellcheck="false" placeholder="?"></td>'+
'<td><input class="p-input" type="text" data-step="'+i+'" data-field="power" autocomplete="off" spellcheck="false" placeholder="'+ph+'" title="'+esc(titleOpt)+'"></td>'+
'<td><input class="p-input" type="text" data-step="'+i+'" data-field="weight" autocomplete="off" spellcheck="false" placeholder="'+ph+'" title="'+esc(titleOpt)+'"></td>'+
'<td><input class="p-input" type="text" data-step="'+i+'" data-field="product" autocomplete="off" spellcheck="false" placeholder="?"></td>';
tbody.appendChild(tr);
});
table.appendChild(tbody);

if(ex.steps.length>=2){
wrap.appendChild(table);
const sumBlock=document.createElement('div');
sumBlock.className='p-sum-block';
sumBlock.innerHTML=
'<div class="p-sum-block-label">Σ '+esc(t('stepSum'))+'</div>'+
'<div class="p-sum-block-input-wrap">'+
'<input class="p-input p-sum-input" type="text" data-field="sum" autocomplete="off" spellcheck="false" placeholder="?">'+
'</div>';
wrap.appendChild(sumBlock);
return wrap;
}
}
else if(info.type==='digitbits3'||info.type==='digitbits4'){
const thead=document.createElement('thead');
const bitsPerCheck=info.type==='digitbits3'?3:4;
const valueHeader=bitsPerCheck===4?t('stepValueDec'):t('stepValue');
thead.innerHTML=
'<tr>'+
'<th class="p-col-digit">'+esc(t('stepDigit'))+'</th>'+
'<th class="p-col-val">'+esc(valueHeader)+'</th>'+
'<th class="p-col-bits">'+esc(t('stepBits'))+'</th>'+
'</tr>';
table.appendChild(thead);

const bitsPer=info.type==='digitbits3'?3:4;
opNote.innerHTML='<span class="p-op-symbol">→</span> <span>'+esc(t('opDigitBitsNote',bitsPer))+'</span>';
wrap.appendChild(opNote);

const tbody=document.createElement('tbody');
ex.steps.forEach((s,i)=>{
const tr=document.createElement('tr');
tr.innerHTML=
'<td class="p-mono">'+esc(s.digit)+'</td>'+
'<td><input class="p-input" type="text" data-step="'+i+'" data-field="dvalue" autocomplete="off" spellcheck="false" placeholder="?"></td>'+
'<td><input class="p-input p-mono" type="text" data-step="'+i+'" data-field="bits" autocomplete="off" spellcheck="false" placeholder="?"></td>';
tbody.appendChild(tr);
});
table.appendChild(tbody);
}
else if(info.type==='double3to4'||info.type==='double4to3'){
const parts=ex.steps;

const sub1=document.createElement('div');
sub1.className='p-subtable-title';
sub1.textContent='① → binario';
wrap.appendChild(sub1);

const bitsPerFrom=info.fromBase===8?3:4;
const opNote1=document.createElement('div');
opNote1.className='p-op-note';
opNote1.innerHTML='<span class="p-op-symbol">→</span> <span>'+esc(t('opDigitBitsNote',bitsPerFrom))+'</span>';
wrap.appendChild(opNote1);

const table1=document.createElement('table');
table1.className='p-table';
const thead1=document.createElement('thead');
const valueHeader1=info.fromBase===16?t('stepValueDec'):t('stepValue');
thead1.innerHTML=
'<tr>'+
'<th class="p-col-digit">'+esc(t('stepDigit'))+'</th>'+
'<th class="p-col-val">'+esc(valueHeader1)+'</th>'+
'<th class="p-col-bits">'+esc(t('stepBits'))+'</th>'+
'</tr>';
table1.appendChild(thead1);
const tbody1=document.createElement('tbody');
parts.step1.forEach((s,i)=>{
const tr=document.createElement('tr');
tr.innerHTML=
'<td class="p-mono">'+esc(s.digit)+'</td>'+
'<td><input class="p-input" type="text" data-step="'+i+'" data-field="dvalue1" autocomplete="off" spellcheck="false" placeholder="?"></td>'+
'<td><input class="p-input p-mono" type="text" data-step="'+i+'" data-field="bits1" autocomplete="off" spellcheck="false" placeholder="?"></td>';
tbody1.appendChild(tr);
});
table1.appendChild(tbody1);
wrap.appendChild(table1);

const sub2=document.createElement('div');
sub2.className='p-subtable-title';
sub2.textContent='② binario → '+getBaseName(info.toBase);
wrap.appendChild(sub2);

const bitsPerTo=info.toBase===8?3:4;
const opNote2=document.createElement('div');
opNote2.className='p-op-note';
opNote2.innerHTML='<span class="p-op-symbol">◫</span> <span>'+esc(t('opGroupsNote',bitsPerTo))+'</span>';
wrap.appendChild(opNote2);

const table2=document.createElement('table');
table2.className='p-table';
const thead2=document.createElement('thead');
thead2.innerHTML=
'<tr>'+
'<th class="p-col-bits">'+esc(t('stepBits'))+'</th>'+
'<th class="p-col-dec">'+esc(t('stepDecimal'))+'</th>'+
'<th class="p-col-val">'+esc(t('stepValue'))+'</th>'+
'</tr>';
table2.appendChild(thead2);
const tbody2=document.createElement('tbody');
parts.step2.forEach((s,i)=>{
const tr=document.createElement('tr');
tr.innerHTML=
'<td class="p-mono">'+esc(s.bits)+'</td>'+
'<td><input class="p-input" type="text" data-step="'+i+'" data-field="decimal2" autocomplete="off" spellcheck="false" placeholder="?"></td>'+
'<td><input class="p-input" type="text" data-step="'+i+'" data-field="value2" autocomplete="off" spellcheck="false" placeholder="?"></td>';
tbody2.appendChild(tr);
});
table2.appendChild(tbody2);
wrap.appendChild(table2);

return wrap;
}

wrap.appendChild(table);
return wrap;
}

function getReadOrderInfo(type){
switch(type){
case'div':
case'divfrac':
return{t:'readOrderDiv',ex:'readOrderDivEx'};
case'weights':
return{t:'readOrderWeights',ex:'readOrderWeightsEx'};
case'groups3':
case'groups4':
return{t:'readOrderGroups',ex:'readOrderGroupsEx'};
case'digitbits3':
case'digitbits4':
case'bcd':
return{t:'readOrderDigitBits',ex:'readOrderDigitBitsEx'};
case'double3to4':
case'double4to3':
return{t:'readOrderDouble',ex:'readOrderDoubleEx'};
default:
return null;
}
}

function buildHelpBox(ex){
if(state.mode==='exam'&&state.difficulty==='hard'){
return null;
}

const info=ex.info;
const parts=[];

if(info.type==='div'||info.type==='divfrac'){
parts.push({t:'helpQuotientInt',ex:'helpQuotientIntEx'});
parts.push({t:'helpResidue',ex:'helpResidueEx'});
}
else if(info.type==='bcd'){
parts.push({t:'helpBcd',ex:'helpBcdEx'});
}
else if(info.type==='weights'){
parts.push({t:'helpPower',ex:'helpPowerEx'});
parts.push({t:'helpWeight',ex:'helpWeightEx'});
parts.push({t:'helpValue',ex:'helpValueEx'});
parts.push({t:'helpProduct',ex:'helpProductEx'});
parts.push({t:'helpSum',ex:'helpSumEx'});
}
else if(info.type==='groups3'||info.type==='groups4'){
parts.push({t:'helpBitsToDecimal',ex:'helpBitsToDecimalEx'});
parts.push({t:'helpDecimalToBase',ex:'helpDecimalToBaseEx'});
}
else if(info.type==='digitbits3'||info.type==='digitbits4'){
parts.push({t:'helpValue',ex:'helpValueEx'});
parts.push({t:'helpBits',ex:'helpBitsEx'});
}
else if(info.type==='double3to4'||info.type==='double4to3'){
parts.push({t:'helpValue',ex:'helpValueEx'});
parts.push({t:'helpBits',ex:'helpBitsEx'});
parts.push({t:'helpBitsToDecimal',ex:'helpBitsToDecimalEx'});
parts.push({t:'helpDecimalToBase',ex:'helpDecimalToBaseEx'});
}

if(parts.length===0)return null;

const readOrderInfo=getReadOrderInfo(info.type);
if(readOrderInfo){
parts.push(readOrderInfo);
}

const details=document.createElement('details');
details.className='p-help-box';

const summary=document.createElement('summary');
summary.className='p-help-summary';
summary.textContent=t('helpTitle');
details.appendChild(summary);

const body=document.createElement('div');
body.className='p-help-body';

parts.forEach((p)=>{
const item=document.createElement('div');
item.className='p-help-item';
const title=document.createElement('div');
title.className='p-help-title';
title.textContent=t(p.t);
const desc=document.createElement('div');
desc.className='p-help-desc';
desc.textContent=t(p.ex);
item.appendChild(title);
item.appendChild(desc);
body.appendChild(item);
});

details.appendChild(body);
return details;
}

function buildScratchpad(){
const details=document.createElement('details');
details.className='p-scratch-box';
details.id='pScratchBox';

const summary=document.createElement('summary');
summary.className='p-scratch-summary';
summary.textContent=t('scratchTitle');
details.appendChild(summary);

const body=document.createElement('div');
body.className='p-scratch-body';

const textarea=document.createElement('textarea');
textarea.className='p-scratch-textarea';
textarea.id='pScratchTextarea';
textarea.spellcheck=false;
textarea.autocomplete='off';
textarea.autocorrect='off';
textarea.autocapitalize='off';
textarea.placeholder=t('scratchPlaceholder');
textarea.rows=4;

if(state.scratch){
textarea.value=state.scratch;
}

textarea.addEventListener('input',()=>{
state.scratch=textarea.value;
});

const autoResize=()=>{
textarea.style.height='auto';
const newH=Math.min(textarea.scrollHeight,300);
textarea.style.height=Math.max(newH,80)+'px';
};
textarea.addEventListener('input',autoResize);
setTimeout(autoResize,0);

body.appendChild(textarea);
details.appendChild(body);

return details;
}


function isCalcEnabled(){
if(state.difficulty==='hard'){
return!!(window.__nibblyPracticeDev&&window.__nibblyPracticeDev.calcEnabled);
}
return true;
}

function buildCalculator(){
const details=document.createElement('details');
details.className='p-calc-box';
details.id='pCalcBox';

const summary=document.createElement('summary');
summary.className='p-calc-summary';

const enabled=isCalcEnabled();

if(enabled){
summary.textContent=t('calcTitle');
}else{
summary.textContent=t('calcTitle')+' · '+t('calcDisabled');
summary.classList.add('p-calc-summary-disabled');
summary.addEventListener('click',(e)=>{
e.preventDefault();
});
}

details.appendChild(summary);

if(!enabled){
return details;
}

const body=document.createElement('div');
body.className='p-calc-body';

const display=document.createElement('input');
display.type='text';
display.className='p-calc-display';
display.readOnly=true;
display.value='0';
display.id='pCalcDisplay';

const buttons=[
['7','8','9','÷'],
['4','5','6','×'],
['1','2','3','−'],
['C','0','.','+'],
['^','←','=','']
];

const grid=document.createElement('div');
grid.className='p-calc-grid';

let calcState={
current:'0',
previous:null,
operator:null,
justEvaluated:false
};

function updateDisplay(){
display.value=calcState.current;
}

function digit(d){
if(calcState.justEvaluated){
calcState.current='0';
calcState.justEvaluated=false;
}
if(d==='.'&&calcState.current.indexOf('.')!==-1)return;
if(calcState.current==='0'&&d!=='.')calcState.current=d;
else calcState.current+=d;
updateDisplay();
}

function operator(op){
if(calcState.operator&&calcState.previous!==null){
const r=evaluate();
if(r===null)return;
calcState.previous=r;
calcState.current='0';
}else{
calcState.previous=parseFloat(calcState.current);
calcState.current='0';
}
calcState.operator=op;
updateDisplay();
}

function evaluate(){
const prev=calcState.previous;
const cur=parseFloat(calcState.current);
let result;
switch(calcState.operator){
case'+':result=prev+cur;break;
case'−':result=prev-cur;break;
case'×':result=prev*cur;break;
case'÷':
if(cur===0)return null;
result=prev/cur;break;
case'^':result=Math.pow(prev,cur);break;
default:result=cur;
}
if(!isFinite(result))return null;
return result;
}

function equals(){
if(calcState.operator!==null){
const r=evaluate();
if(r===null){
calcState.current='Error';
calcState.previous=null;
calcState.operator=null;
calcState.justEvaluated=true;
updateDisplay();
return;
}
calcState.current=String(Number(r.toPrecision(12)));
calcState.previous=null;
calcState.operator=null;
calcState.justEvaluated=true;
updateDisplay();
}
}

function clearAll(){
calcState.current='0';
calcState.previous=null;
calcState.operator=null;
calcState.justEvaluated=false;
updateDisplay();
}

function backspace(){
if(calcState.justEvaluated){
clearAll();
return;
}
if(calcState.current.length>1){
calcState.current=calcState.current.slice(0,-1);
}else{
calcState.current='0';
}
updateDisplay();
}

buttons.forEach(row=>{
row.forEach(label=>{
if(!label)return;
const btn=document.createElement('button');
btn.type='button';
btn.className='p-calc-btn';
btn.textContent=label;
if(label==='=')btn.classList.add('p-calc-btn-eq');
if(label==='C')btn.classList.add('p-calc-btn-clr');
if(['÷','×','−','+','^'].includes(label))btn.classList.add('p-calc-btn-op');

btn.addEventListener('click',()=>{
if(label==='C'){clearAll();return;}
if(label==='='){equals();return;}
if(label==='←'){backspace();return;}
if(['÷','×','−','+','^'].includes(label)){operator(label);return;}
digit(label);
});

grid.appendChild(btn);
});
});

body.appendChild(display);
body.appendChild(grid);
details.appendChild(body);

return details;
}

function buildActions(){
const wrap=document.createElement('div');
wrap.className='p-actions';
const resetBtn=document.createElement('button');
resetBtn.type='button';
resetBtn.className='p-btn-ghost';
resetBtn.id='pResetBtn';
resetBtn.textContent=t('reset');
const verifyBtn=document.createElement('button');
verifyBtn.type='button';
verifyBtn.className='p-btn-primary';
verifyBtn.id='pVerifyBtn';
verifyBtn.textContent=t('verify');
wrap.appendChild(resetBtn);
wrap.appendChild(verifyBtn);
return wrap;
}

function buildFeedback(){
const wrap=document.createElement('div');
wrap.className='p-feedback';
wrap.id='pFeedback';
return wrap;
}

function buildHint(){
const wrap=document.createElement('div');
wrap.className='p-hint';
wrap.textContent=t('instructions')+' '+t('resetOnLeave');
return wrap;
}


function attachEvents(){
if(!container)return;

container.querySelectorAll('.p-seg-btn').forEach(b=>{
b.addEventListener('click',()=>{
if(b.dataset.mode===state.mode)return;
state.mode=b.dataset.mode;
resetState();
newExercise();
});
});

container.querySelectorAll('.p-diff-btn').forEach(b=>{
b.addEventListener('click',()=>{
if(b.dataset.diff===state.difficulty)return;
state.difficulty=b.dataset.diff;
resetState();
newExercise();
});
});

const newBtn=container.querySelector('#pNewExerciseBtn');
if(newBtn)newBtn.addEventListener('click',()=>{
resetState();
newExercise();
});

const resetBtn=container.querySelector('#pResetBtn');
if(resetBtn)resetBtn.addEventListener('click',()=>{
resetState();
newExercise();
});

const verifyBtn=container.querySelector('#pVerifyBtn');
if(verifyBtn)verifyBtn.addEventListener('click',()=>verifyAttempt());


attachExerciseInputEvents();
}

function attachExerciseInputEvents(){
if(!container)return;


}

function newExercise(){
resetState();

const delay=(window.__nibblyPracticeDev&&typeof window.__nibblyPracticeDev.convertDelay==='number')
?window.__nibblyPracticeDev.convertDelay
:3000;


renderAll();


if(delay>0){
const cardSlot=container.querySelector('#pExerciseCardSlot');
if(cardSlot){
cardSlot.innerHTML='<div class="p-loading">'+esc(t('newExercise'))+'…</div>';
}
setTimeout(()=>{
state.exercise=generateExercise(state.difficulty);
renderExerciseCard();
attachExerciseInputEvents();
},delay);
}else{
state.exercise=generateExercise(state.difficulty);
renderExerciseCard();
attachExerciseInputEvents();
}
}


function normalizeAnswer(str){
return String(str).trim().toUpperCase().replace(/^0+(?=\d)/,'').replace(/\s+/g,'');
}

function verifyAttempt(){
if(!state.exercise)return;
const ex=state.exercise;
const info=ex.info;
const isHard=state.difficulty==='hard';

const inputs=container.querySelectorAll('.p-input');
let anyRequiredEmpty=false;
inputs.forEach(inp=>{
if(inp.value.trim())return;
const field=inp.dataset.field;
if(!isHard&&(field==='power'||field==='weight')){
return;
}
anyRequiredEmpty=true;
});
if(anyRequiredEmpty){
showToast(t('emptyInput'),true);
return;
}

let allOk=true;

if(info.type==='div'||info.type==='divfrac'){
ex.steps.forEach((s,i)=>{
const qIn=container.querySelector('.p-input[data-step="'+i+'"][data-field="q"]');
const rIn=container.querySelector('.p-input[data-step="'+i+'"][data-field="r"]');
const qOk=normalizeAnswer(qIn.value)===normalizeAnswer(s.q);
const rOk=normalizeAnswer(rIn.value)===normalizeAnswer(s.rRaw);
qIn.classList.toggle('p-input-ok',qOk);
qIn.classList.toggle('p-input-bad',!qOk);
rIn.classList.toggle('p-input-ok',rOk);
rIn.classList.toggle('p-input-bad',!rOk);
if(!qOk||!rOk)allOk=false;
});
}
else if(info.type==='bcd'){
ex.steps.forEach((s,i)=>{
const bitsInp=container.querySelector('.p-input[data-step="'+i+'"][data-field="bits"]');
const ok=normalizeAnswer(bitsInp.value)===normalizeAnswer(s.bits);
bitsInp.classList.toggle('p-input-ok',ok);
bitsInp.classList.toggle('p-input-bad',!ok);
if(!ok)allOk=false;
});
}
else if(info.type==='groups3'||info.type==='groups4'){
ex.steps.forEach((s,i)=>{
const decInp=container.querySelector('.p-input[data-step="'+i+'"][data-field="decimal"]');
const valInp=container.querySelector('.p-input[data-step="'+i+'"][data-field="value"]');

const decOk=normalizeAnswer(decInp.value)===normalizeAnswer(s.decimal);
const valOk=normalizeAnswer(valInp.value)===normalizeAnswer(s.value);

decInp.classList.toggle('p-input-ok',decOk);
decInp.classList.toggle('p-input-bad',!decOk);
valInp.classList.toggle('p-input-ok',valOk);
valInp.classList.toggle('p-input-bad',!valOk);

if(!decOk||!valOk)allOk=false;
});
}
else if(info.type==='weights'){
ex.steps.forEach((s,i)=>{
const valueInp=container.querySelector('.p-input[data-step="'+i+'"][data-field="value"]');
const productInp=container.querySelector('.p-input[data-step="'+i+'"][data-field="product"]');

const valueOk=normalizeAnswer(valueInp.value)===normalizeAnswer(s.value);
const productOk=normalizeAnswer(productInp.value)===normalizeAnswer(s.product);

valueInp.classList.toggle('p-input-ok',valueOk);
valueInp.classList.toggle('p-input-bad',!valueOk);
productInp.classList.toggle('p-input-ok',productOk);
productInp.classList.toggle('p-input-bad',!productOk);

if(!valueOk||!productOk)allOk=false;

const powerInp=container.querySelector('.p-input[data-step="'+i+'"][data-field="power"]');
const weightInp=container.querySelector('.p-input[data-step="'+i+'"][data-field="weight"]');

if(powerInp){
const filled=powerInp.value.trim().length>0;
if(isHard){
const ok=normalizeAnswer(powerInp.value)===normalizeAnswer(s.power);
powerInp.classList.toggle('p-input-ok',ok);
powerInp.classList.toggle('p-input-bad',!ok);
if(!ok)allOk=false;
}else{
if(filled){
const ok=normalizeAnswer(powerInp.value)===normalizeAnswer(s.power);
powerInp.classList.toggle('p-input-ok',ok);
powerInp.classList.toggle('p-input-bad',!ok);
if(!ok)allOk=false;
}else{
powerInp.classList.remove('p-input-ok','p-input-bad');
}
}
}

if(weightInp){
const filled=weightInp.value.trim().length>0;
if(isHard){
const ok=normalizeAnswer(weightInp.value)===normalizeAnswer(s.weight);
weightInp.classList.toggle('p-input-ok',ok);
weightInp.classList.toggle('p-input-bad',!ok);
if(!ok)allOk=false;
}else{
if(filled){
const ok=normalizeAnswer(weightInp.value)===normalizeAnswer(s.weight);
weightInp.classList.toggle('p-input-ok',ok);
weightInp.classList.toggle('p-input-bad',!ok);
if(!ok)allOk=false;
}else{
weightInp.classList.remove('p-input-ok','p-input-bad');
}
}
}
});

const sumInp=container.querySelector('.p-input[data-field="sum"]');
if(sumInp){
const sumOk=normalizeAnswer(sumInp.value)===normalizeAnswer(ex.expectedAnswer);
sumInp.classList.toggle('p-input-ok',sumOk);
sumInp.classList.toggle('p-input-bad',!sumOk);
if(!sumOk)allOk=false;
}
}
else if(info.type==='digitbits3'||info.type==='digitbits4'){
ex.steps.forEach((s,i)=>{
const valInp=container.querySelector('.p-input[data-step="'+i+'"][data-field="dvalue"]');
const bitsInp=container.querySelector('.p-input[data-step="'+i+'"][data-field="bits"]');

const valOk=normalizeAnswer(valInp.value)===normalizeAnswer(s.value);
const bitsOk=normalizeAnswer(bitsInp.value)===normalizeAnswer(s.bits);

valInp.classList.toggle('p-input-ok',valOk);
valInp.classList.toggle('p-input-bad',!valOk);
bitsInp.classList.toggle('p-input-ok',bitsOk);
bitsInp.classList.toggle('p-input-bad',!bitsOk);

if(!valOk||!bitsOk)allOk=false;
});
}
else if(info.type==='double3to4'||info.type==='double4to3'){
ex.steps.step1.forEach((s,i)=>{
const valInp=container.querySelector('.p-input[data-step="'+i+'"][data-field="dvalue1"]');
const bitsInp=container.querySelector('.p-input[data-step="'+i+'"][data-field="bits1"]');

const valOk=normalizeAnswer(valInp.value)===normalizeAnswer(s.value);
const bitsOk=normalizeAnswer(bitsInp.value)===normalizeAnswer(s.bits);

valInp.classList.toggle('p-input-ok',valOk);
valInp.classList.toggle('p-input-bad',!valOk);
bitsInp.classList.toggle('p-input-ok',bitsOk);
bitsInp.classList.toggle('p-input-bad',!bitsOk);

if(!valOk||!bitsOk)allOk=false;
});
ex.steps.step2.forEach((s,i)=>{
const decInp=container.querySelector('.p-input[data-step="'+i+'"][data-field="decimal2"]');
const valInp=container.querySelector('.p-input[data-step="'+i+'"][data-field="value2"]');

const decOk=normalizeAnswer(decInp.value)===normalizeAnswer(s.decimal);
const valOk=normalizeAnswer(valInp.value)===normalizeAnswer(s.value);

decInp.classList.toggle('p-input-ok',decOk);
decInp.classList.toggle('p-input-bad',!decOk);
valInp.classList.toggle('p-input-ok',valOk);
valInp.classList.toggle('p-input-bad',!valOk);

if(!decOk||!valOk)allOk=false;
});
}

state.verified=true;
state.allCorrect=allOk;
renderFeedback(allOk);
}

function renderFeedback(allOk){
const box=container.querySelector('#pFeedback');
if(!box)return;
box.innerHTML='';

const ex=state.exercise;

if(state.mode==='practice'){
const wrapper=document.createElement('div');
wrapper.className='p-feedback-card '+(allOk?'ok':'bad');
wrapper.innerHTML=
'<div class="p-feedback-title">'+
(allOk?esc(t('correct')):esc(t('wrong')))+
'</div>'+
'<div class="p-feedback-row">'+
'<span class="p-feedback-lbl">'+esc(t('realResult'))+':</span>'+
'<span class="p-feedback-val">'+esc(ex.expectedAnswer)+'</span>'+
'</div>';
if(pleaseDontActive()){
const egg=buildEggBox(allOk);
if(egg)wrapper.appendChild(egg);
}
box.appendChild(wrapper);

if(allOk){
box.appendChild(buildCsvBtn());
}
}
else{
if(allOk){
const wrapper=document.createElement('div');
wrapper.className='p-feedback-card ok';
wrapper.innerHTML=
'<div class="p-feedback-title">'+esc(t('correct'))+'</div>';
if(pleaseDontActive()){
const egg=buildEggBox(true);
if(egg)wrapper.appendChild(egg);
}
box.appendChild(wrapper);
box.appendChild(buildCsvBtn());
}else{
const wrapper=document.createElement('div');
wrapper.className='p-feedback-card bad';
wrapper.innerHTML=
'<div class="p-feedback-title">'+esc(t('wrong'))+'</div>'+
'<div class="p-feedback-hint">'+esc(t('examNoReveal'))+'</div>';
if(pleaseDontActive()){
const egg=buildEggBox(false);
if(egg)wrapper.appendChild(egg);
}
box.appendChild(wrapper);
}
}
}

function buildEggBox(isWin){
const forced=window.__nibblyDevState&&window.__nibblyDevState.forcedPracticeEgg;
let msg='';

if(forced&&forced.kind===(isWin?'win':'lose')){
const lang=getLang();
const list=(I18N[lang]&&I18N[lang][isWin?'eggsWin':'eggsLose'])||[];
const idx=forced.num-1;
if(idx>=0&&idx<list.length){
msg=list[idx];
}
}

if(!msg){
msg=pickEgg(isWin?'eggsWin':'eggsLose');
}

if(!msg)return null;
const box=document.createElement('div');
box.className='p-egg-box '+(isWin?'ok':'bad');
box.textContent=msg;
return box;
}

function buildCsvBtn(){
const btn=document.createElement('button');
btn.type='button';
btn.className='p-btn-primary';
btn.style.marginTop='10px';
btn.textContent='📥 '+t('downloadCsv');
btn.addEventListener('click',()=>{
downloadCSV();
});
return btn;
}


function downloadCSV(){
if(!state.exercise||!state.allCorrect)return;
const ex=state.exercise;
const info=ex.info;

let headers=[];
let rows=[];

if(info.type==='div'||info.type==='divfrac'){
headers=['Step','Division','Quotient','Remainder'];
ex.steps.forEach((s,i)=>{
const q=container.querySelector('.p-input[data-step="'+i+'"][data-field="q"]');
const r=container.querySelector('.p-input[data-step="'+i+'"][data-field="r"]');
rows.push([i+1,s.div,q.value,r.value]);
});
}
else if(info.type==='bcd'){
headers=['Decimal Digit','Bits'];
ex.steps.forEach((s,i)=>{
const b=container.querySelector('.p-input[data-step="'+i+'"][data-field="bits"]');
rows.push([s.digit,b.value]);
});
}
else if(info.type==='groups3'||info.type==='groups4'){
headers=['Step','Bits','Decimal','Value'];
ex.steps.forEach((s,i)=>{
const d=container.querySelector('.p-input[data-step="'+i+'"][data-field="decimal"]');
const v=container.querySelector('.p-input[data-step="'+i+'"][data-field="value"]');
rows.push([i+1,s.bits,d.value,v.value]);
});
}
else if(info.type==='weights'){
headers=['Digit','Value','Power','Weight','Product'];
ex.steps.forEach((s,i)=>{
const v=container.querySelector('.p-input[data-step="'+i+'"][data-field="value"]');
const p=container.querySelector('.p-input[data-step="'+i+'"][data-field="power"]');
const w=container.querySelector('.p-input[data-step="'+i+'"][data-field="weight"]');
const pr=container.querySelector('.p-input[data-step="'+i+'"][data-field="product"]');
rows.push([s.digit,v.value,p.value,w.value,pr.value]);
});
const sumInp=container.querySelector('.p-input[data-field="sum"]');
if(sumInp&&ex.steps.length>=2){
rows.push(['Σ','','','',sumInp.value]);
}
}
else if(info.type==='digitbits3'||info.type==='digitbits4'){
headers=['Digit','Value','Bits'];
ex.steps.forEach((s,i)=>{
const v=container.querySelector('.p-input[data-step="'+i+'"][data-field="dvalue"]');
const b=container.querySelector('.p-input[data-step="'+i+'"][data-field="bits"]');
rows.push([s.digit,v.value,b.value]);
});
}
else if(info.type==='double3to4'||info.type==='double4to3'){
headers=['Phase','Digit/Bits','Value','Decimal','Result'];
ex.steps.step1.forEach((s,i)=>{
const v=container.querySelector('.p-input[data-step="'+i+'"][data-field="dvalue1"]');
const b=container.querySelector('.p-input[data-step="'+i+'"][data-field="bits1"]');
rows.push(['1→bin',s.digit,v.value,b.value,'']);
});
ex.steps.step2.forEach((s,i)=>{
const d=container.querySelector('.p-input[data-step="'+i+'"][data-field="decimal2"]');
const v=container.querySelector('.p-input[data-step="'+i+'"][data-field="value2"]');
rows.push(['bin→'+info.toBase,s.bits,'',d.value,v.value]);
});
}

const csv=[[
'Ejercicio',
'Base origen',
'Base destino',
'Valor',
'Resultado esperado',
'Modo',
'Dificultad'
],[
ex.convId,
info.fromBase,
info.toBase,
ex.input,
ex.expectedAnswer,
state.mode,
state.difficulty
]].map(r=>r.map(csvEsc).join(',')).concat(
['']
).concat(
[headers.map(csvEsc).join(',')]
).concat(
rows.map(r=>r.map(csvEsc).join(','))
).join('\n');

try{
const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});
const url=URL.createObjectURL(blob);
const a=document.createElement('a');
a.href=url;
a.download='nibbly-practice-'+ex.convId+'-'+Date.now()+'.csv';
document.body.appendChild(a);
a.click();
setTimeout(()=>{URL.revokeObjectURL(url);a.remove();},60000);
showToast(t('downloadCsv'),false);
}catch(e){
showToast(String(e),true);
}
}

function csvEsc(v){
const s=String(v==null?'':v);
if(/[",\n\r]/.test(s))return'"'+s.replace(/"/g,'""')+'"';
return s;
}


function init(c){
if(!c)return;
container=c;
resetState();
newExercise();
console.info('[Nibbly practice] ✅ ready');
return{
reset:resetState,
refresh:()=>{
resetState();
newExercise();
},
destroy:()=>{
container=null;
}
};
}

function resetPublic(){
resetState();
if(container&&container.isConnected){
newExercise();
}
}

window.NibblyModules=window.NibblyModules||{};
window.NibblyModules.practice={
id:'practice',
version:'1.1.1',
init:init,
reset:resetPublic
};
window.NibblyPractice=window.NibblyModules.practice;

if(console&&console.debug){
console.debug('[Nibbly] practice.js loaded (v1.1.1)');
}
})();