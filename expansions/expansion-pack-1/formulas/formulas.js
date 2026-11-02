(function(){
'use strict';


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
'f.mode.formula':'Fórmula libre',
'f.mode.conversion':'Conversión',
'f.subtab.convert':'Conversor',
'f.subtab.residue':'Buscador de residuos',
'f.subtab.boole':'Calculadora booleana',
'f.subtab.boolDiagram':'Diagrama booleano',
'f.formulaLbl':'Fórmula (usa variables como a, b, c…)',
'f.formulaPh':'Ej: a * b + c',
'f.varsLbl':'Valores de las variables',
'f.preview':'Vista previa',
'f.previewEmpty':'Escribe una fórmula para ver el resultado en tiempo real.',
'f.reveal':'Revelar cálculo',
'f.reveal1':'La gran revelación está casi lista, por favor espere...',
'f.reveal2':'Revelando cálculo...',
'f.reveal3':'Ya casi...',
'f.clear':'Limpiar',
'f.copy':'Copiar',
'f.copied':'Copiado',
'f.copyFail':'No se pudo copiar',
'f.nothing':'Nada que copiar',
'f.errorVar':'Falta el valor de la variable "{0}".',
'f.errorSyntax':'La fórmula contiene caracteres no permitidos.',
'f.errorDivZero':'Resultado no finito (¿división por cero?).',
'f.errorInput':'Introduce un número válido.',
'f.errorBits':'Solo se permiten 0s y 1s.',
'f.errorHex':'Solo se permiten dígitos hexadecimales (0-9, A-F).',
'f.errorOct':'Solo se permiten dígitos octales (0-7).',
'f.errorNonNeg':'Solo se admiten números enteros no negativos.',
'f.errorDivisor':'El divisor debe ser un entero distinto de cero.',
'f.errorDivisorBig':'El divisor no puede ser mayor que el dividendo en este buscador.',
'f.convLbl':'Valor a convertir',
'f.convPh.dec2bin':'Ej: 45',
'f.convPh.dec2hex':'Ej: 478',
'f.convPh.dec2hexFrac':'Ej: 26,5',
'f.convPh.dec2oct':'Ej: 45',
'f.convPh.bin2oct':'Ej: 101110',
'f.convPh.bin2hex':'Ej: 11110010',
'f.convPh.bin2dec':'Ej: 101101',
'f.convPh.oct2dec':'Ej: 755',
'f.convPh.oct2bin':'Ej: 755',
'f.convPh.oct2hex':'Ej: 755',
'f.convPh.hex2dec':'Ej: 2AF',
'f.convPh.hex2bin':'Ej: 2AF',
'f.convPh.hex2oct':'Ej: 2AF',
'f.conv.dec2bin':'Decimal → Binario',
'f.conv.dec2hex':'Decimal → Hexadecimal',
'f.conv.dec2hexFrac':'Decimal (con parte decimal) → Hexadecimal',
'f.conv.dec2oct':'Decimal → Octal',
'f.conv.bin2oct':'Binario → Octal',
'f.conv.bin2hex':'Binario → Hexadecimal',
'f.conv.bin2dec':'Binario → Decimal',
'f.conv.oct2dec':'Octal → Decimal',
'f.conv.oct2bin':'Octal → Binario',
'f.conv.oct2hex':'Octal → Hexadecimal',
'f.conv.hex2dec':'Hexadecimal → Decimal',
'f.conv.hex2bin':'Hexadecimal → Binario',
'f.conv.hex2oct':'Hexadecimal → Octal',
'f.col.division':'División',
'f.col.quotient':'Cociente',
'f.col.residue':'Residuo',
'f.col.mult':'Multiplicación',
'f.col.result':'Resultado',
'f.col.digit':'Dígito',
'f.col.bits':'Bits',
'f.col.value':'Valor',
'f.col.position':'Posición',
'f.col.weight':'Peso',
'f.col.product':'Producto',
'f.col.dec':'Dec',
'f.col.hex':'Hex',
'f.col.oct':'Oct',
'f.col.bin':'Bin',
'f.col.char':'Carácter',
'f.col.name':'Nombre',
'f.col.check':'Comprobación',
'f.step.int':'Parte entera (divisiones sucesivas)',
'f.step.frac':'Parte decimal (multiplicaciones sucesivas)',
'f.step.groups':'Agrupación de bits',
'f.step.octGroups':'Agrupación de bits (grupos de 3)',
'f.step.hexGroups':'Agrupación de bits (grupos de 4)',
'f.step.octExpansion':'Descomposición por pesos (base 8)',
'f.step.binExpansion':'Descomposición por pesos (base 2)',
'f.step.hexExpansion':'Descomposición por pesos (base 16)',
'f.step.hexDetail':'Detalle por dígito',
'f.step.octDetail':'Detalle por dígito octal',
'f.step.binDetail':'Detalle por bit',
'f.step.reduction':'Resolución',
'f.step.formula':'Fórmula original',
'f.step.subst':'Sustitución de variables',
'f.step.result':'Resultado',
'f.step.residueMethod':'Método: dividendo = divisor × cociente + residuo',
'f.empty':'Selecciona una conversión y pulsa "Revelar cálculo".',
'f.hint.formula':'Solo letras sueltas (a, b, c…) son variables. Operadores: + − * / ^ ( ) %. También √, ², ³.',
'f.hint.conversion':'Las tablas muestran el método completo: divisiones sucesivas, agrupación de bits o descomposición por pesos.',
'f.hint.residue':'Introduce el dividendo y el divisor. Verás la división larga paso a paso y cómo se obtiene el residuo. El residuo siempre cumple 0 ≤ residuo < divisor.',
'f.ascii.title':'Tabla ASCII completa',
'f.ascii.desc':'Los 128 caracteres ASCII con su representación decimal, hexadecimal, octal y binaria. Los caracteres de control se muestran con su nombre entre corchetes.',
'f.ascii.generate':'Generar tabla',
'f.ascii.filter':'Filtrar…',
'f.ascii.regenerate':'Regenerar',
'f.ascii.empty':'Pulsa "Generar tabla" para ver los 128 caracteres.',
'f.ascii.shown':'{0} de 128 caracteres',
'f.csvDone':'CSV descargado',
'f.csvFail':'No se pudo generar el CSV',
'f.csvEmpty':'Nada que exportar',

'r.dividendLbl':'Dividendo (el número que se divide)',
'r.divisorLbl':'Divisor (entre cuánto se divide)',
'r.dividendPh':'Ej: 478',
'r.divisorPh':'Ej: 16',
'r.needIntegers':'El dividendo y el divisor deben ser números enteros no negativos.',
'r.needDivisor':'El divisor debe ser un número entero mayor que cero.',
'r.resultTitle':'Resultado de la división',
'r.quotientLbl':'Cociente',
'r.residueLbl':'Residuo',
'r.verification':'Verificación',
'r.stepsTitle':'División larga paso a paso',
'r.stepN':'Paso {0}',
'r.bringDown':'Bajamos el dígito {0}',
'r.currentNumber':'Número actual: {0}',
'r.divideBy':'÷ {0} = {1}  (residuo {2})',
'r.multiply':'Multiplicamos: {0} × {1} = {2}',
'r.subtract':'Restamos: {0} − {1} = {2}',
'r.finalQuotient':'Cociente final: {0}',
'r.finalResidue':'Residuo final: {0}',
'r.checkFormula':'{0} = {1} × {2} + {3}',
'r.checkOk':'✓ La comprobación cuadra',
'r.checkFail':'✗ La comprobación NO cuadra',
'r.residueRule':'Regla: el residuo siempre es menor que el divisor y mayor o igual que cero.',
'r.residueRuleOk':'✓ {0} < {1} → el residuo es válido',
'r.residueRuleFail':'✗ {0} ≥ {1} → algo falló en el cálculo',
'r.zeroResidue':'Residuo 0 → la división es exacta (el dividendo es múltiplo del divisor).',
'r.nonZeroResidue':'Residuo {0} → la división NO es exacta. El dividendo no es múltiplo del divisor.',
'r.aboutTitle':'¿Qué es el residuo?',
'r.aboutDesc':'El residuo (o resto) de una división es lo que sobra cuando el dividendo no es divisible exactamente entre el divisor. Se calcula como dividendo − (divisor × cociente entero).',
'r.aboutFormula':'Residuo = Dividendo − Divisor × Cociente',
'r.aboutExact':'Si el residuo es 0, la división es exacta. Si no, el resultado real es Cociente + Residuo/Divisor (la parte decimal).',
'r.needInputs':'Introduce dividendo y divisor para ver los pasos.',
'r.copyAll':'Copiar explicación',

'b.exprLbl':'Expresión booleana',
'b.exprPh':'Ej: (A AND B) OR NOT C',
'b.varsLbl':'Variables detectadas',
'b.hint':'Operadores: AND (·), OR (+), NOT (¬), XOR (⊕), NAND, NOR, XNOR. También puedes usar & | ! ^ ~. Variables: A, B, C, D (máx. 4).',
'b.errorVar':'Variable no permitida: solo A, B, C, D.',
'b.errorSyntax':'Expresión booleana inválida.',
'b.errorVars':'Demasiadas variables (máximo 4: A, B, C, D).',
'b.errorEmpty':'Escribe una expresión booleana para empezar.',
'b.truthTable':'Tabla de verdad',
'b.minterms':'Minterms (donde F = 1)',
'b.maxterms':'Maxterms (donde F = 0)',
'b.sop':'Forma canónica SOP (suma de productos)',
'b.pos':'Forma canónica POS (producto de sumas)',
'b.simplified':'Simplificación',
'b.simplify':'Simplificar',
'b.simplifying':'Simplificando…',
'b.noSimplify':'No se pudo simplificar automáticamente.',
'b.usesVars':'Usa: {0}',
'b.noVars':'La expresión no contiene variables.',
'b.resultF':'F = {0}',
'b.evalAll':'Evaluar todas las combinaciones',
'b.copyTruth':'Copiar tabla de verdad',
'b.downloadCSV':'Descargar CSV',

'd.exprLbl':'Expresión booleana para el diagrama',
'd.exprPh':'Ej: (A AND B) OR NOT C',
'd.hint':'Genera un diagrama SVG con las compuertas lógicas. Cada compuerta se dibuja con su símbolo estándar y las conexiones con cables ortogonales.',
'd.generate':'Generar diagrama',
'd.generating':'Generando diagrama…',
'd.errorExpr':'No se pudo interpretar la expresión.',
'd.errorEmpty':'Escribe una expresión booleana.',
'd.errorTooDeep':'La expresión es demasiado profunda o compleja para dibujarla.',
'd.errorVars':'Demasiadas variables para el diagrama (máximo 4).',
'd.download':'Descargar SVG',
'd.downloadPNG':'Descargar PNG',
'd.svgTitle':'Diagrama de compuertas',
'd.gates':'Compuertas utilizadas',
'd.depth':'Profundidad',
'd.inputs':'Entradas',
'd.nodeCount':'Nodos',
'd.downloadDone':'Descargado',
'd.downloadFail':'No se pudo descargar',
'd.simplifiedLabel':'Expresión',
'd.truthBelow':'Tabla de verdad',
'd.noDiagram':'Pulsa "Generar diagrama" para ver el circuito.',
'd.legend':'Leyenda',
'd.andGate':'AND',
'd.orGate':'OR',
'd.notGate':'NOT',
'd.xorGate':'XOR',
'd.nandGate':'NAND',
'd.norGate':'NOR',
'd.xnorGate':'XNOR'
},
en:{
'f.mode.formula':'Free formula',
'f.mode.conversion':'Conversion',
'f.subtab.convert':'Converter',
'f.subtab.residue':'Residue finder',
'f.subtab.boole':'Boolean calculator',
'f.subtab.boolDiagram':'Boolean diagram',
'f.formulaLbl':'Formula (use variables like a, b, c…)',
'f.formulaPh':'e.g. a * b + c',
'f.varsLbl':'Variable values',
'f.preview':'Preview',
'f.previewEmpty':'Type a formula to see the live result.',
'f.reveal':'Reveal calculation',
'f.reveal1':'The big reveal is almost ready, please wait...',
'f.reveal2':'Revealing calculation...',
'f.reveal3':'Almost there...',
'f.clear':'Clear',
'f.copy':'Copy',
'f.copied':'Copied',
'f.copyFail':'Could not copy',
'f.nothing':'Nothing to copy',
'f.errorVar':'Missing value for variable "{0}".',
'f.errorSyntax':'Formula contains disallowed characters.',
'f.errorDivZero':'Non-finite result (division by zero?).',
'f.errorInput':'Enter a valid number.',
'f.errorBits':'Only 0s and 1s allowed.',
'f.errorHex':'Only hex digits allowed (0-9, A-F).',
'f.errorOct':'Only octal digits allowed (0-7).',
'f.errorNonNeg':'Only non-negative integers are allowed.',
'f.errorDivisor':'The divisor must be a non-zero integer.',
'f.errorDivisorBig':'The divisor cannot be larger than the dividend in this finder.',
'f.convLbl':'Value to convert',
'f.convPh.dec2bin':'e.g. 45',
'f.convPh.dec2hex':'e.g. 478',
'f.convPh.dec2hexFrac':'e.g. 26.5',
'f.convPh.dec2oct':'e.g. 45',
'f.convPh.bin2oct':'e.g. 101110',
'f.convPh.bin2hex':'e.g. 11110010',
'f.convPh.bin2dec':'e.g. 101101',
'f.convPh.oct2dec':'e.g. 755',
'f.convPh.oct2bin':'e.g. 755',
'f.convPh.oct2hex':'e.g. 755',
'f.convPh.hex2dec':'e.g. 2AF',
'f.convPh.hex2bin':'e.g. 2AF',
'f.convPh.hex2oct':'e.g. 2AF',
'f.conv.dec2bin':'Decimal → Binary',
'f.conv.dec2hex':'Decimal → Hexadecimal',
'f.conv.dec2hexFrac':'Decimal (with fraction) → Hexadecimal',
'f.conv.dec2oct':'Decimal → Octal',
'f.conv.bin2oct':'Binary → Octal',
'f.conv.bin2hex':'Binary → Hexadecimal',
'f.conv.bin2dec':'Binary → Decimal',
'f.conv.oct2dec':'Octal → Decimal',
'f.conv.oct2bin':'Octal → Binary',
'f.conv.oct2hex':'Octal → Hexadecimal',
'f.conv.hex2dec':'Hexadecimal → Decimal',
'f.conv.hex2bin':'Hexadecimal → Binary',
'f.conv.hex2oct':'Hexadecimal → Octal',
'f.col.division':'Division',
'f.col.quotient':'Quotient',
'f.col.residue':'Remainder',
'f.col.mult':'Multiplication',
'f.col.result':'Result',
'f.col.digit':'Digit',
'f.col.bits':'Bits',
'f.col.value':'Value',
'f.col.position':'Position',
'f.col.weight':'Weight',
'f.col.product':'Product',
'f.col.dec':'Dec',
'f.col.hex':'Hex',
'f.col.oct':'Oct',
'f.col.bin':'Bin',
'f.col.char':'Char',
'f.col.name':'Name',
'f.col.check':'Check',
'f.step.int':'Integer part (successive division)',
'f.step.frac':'Fractional part (successive multiplication)',
'f.step.groups':'Bit grouping',
'f.step.octGroups':'Bit grouping (3-bit groups)',
'f.step.hexGroups':'Bit grouping (4-bit groups)',
'f.step.octExpansion':'Weight breakdown (base 8)',
'f.step.binExpansion':'Weight breakdown (base 2)',
'f.step.hexExpansion':'Weight breakdown (base 16)',
'f.step.hexDetail':'Detail per digit',
'f.step.octDetail':'Detail per octal digit',
'f.step.binDetail':'Detail per bit',
'f.step.reduction':'Resolution',
'f.step.formula':'Original formula',
'f.step.subst':'Variable substitution',
'f.step.result':'Result',
'f.step.residueMethod':'Method: dividend = divisor × quotient + remainder',
'f.empty':'Pick a conversion and press "Reveal calculation".',
'f.hint.formula':'Only single letters (a, b, c…) are variables. Operators: + − * / ^ ( ) %. Also √, ², ³.',
'f.hint.conversion':'Tables show the full method: successive division, bit grouping, or weight breakdown.',
'f.hint.residue':'Enter dividend and divisor. You will see the long division step by step and how the remainder is obtained. The remainder always satisfies 0 ≤ remainder < divisor.',
'f.ascii.title':'Full ASCII table',
'f.ascii.desc':'All 128 ASCII characters with their decimal, hexadecimal, octal, and binary representation. Control characters are shown by name in brackets.',
'f.ascii.generate':'Generate table',
'f.ascii.filter':'Filter…',
'f.ascii.regenerate':'Regenerate',
'f.ascii.empty':'Press "Generate table" to see all 128 characters.',
'f.ascii.shown':'{0} of 128 characters',
'f.csvDone':'CSV downloaded',
'f.csvFail':'Could not generate CSV',
'f.csvEmpty':'Nothing to export',
'r.dividendLbl':'Dividend (the number being divided)',
'r.divisorLbl':'Divisor (what to divide by)',
'r.dividendPh':'e.g. 478',
'r.divisorPh':'e.g. 16',
'r.needIntegers':'Dividend and divisor must be non-negative integers.',
'r.needDivisor':'The divisor must be an integer greater than zero.',
'r.resultTitle':'Division result',
'r.quotientLbl':'Quotient',
'r.residueLbl':'Remainder',
'r.verification':'Verification',
'r.stepsTitle':'Long division step by step',
'r.stepN':'Step {0}',
'r.bringDown':'Bring down digit {0}',
'r.currentNumber':'Current number: {0}',
'r.divideBy':'÷ {0} = {1}  (remainder {2})',
'r.multiply':'Multiply: {0} × {1} = {2}',
'r.subtract':'Subtract: {0} − {1} = {2}',
'r.finalQuotient':'Final quotient: {0}',
'r.finalResidue':'Final remainder: {0}',
'r.checkFormula':'{0} = {1} × {2} + {3}',
'r.checkOk':'✓ Check passed',
'r.checkFail':'✗ Check FAILED',
'r.residueRule':'Rule: the remainder is always less than the divisor and greater than or equal to zero.',
'r.residueRuleOk':'✓ {0} < {1} → remainder is valid',
'r.residueRuleFail':'✗ {0} ≥ {1} → something went wrong',
'r.zeroResidue':'Remainder 0 → exact division (dividend is a multiple of divisor).',
'r.nonZeroResidue':'Remainder {0} → NOT an exact division. Dividend is not a multiple of divisor.',
'r.aboutTitle':'What is the remainder?',
'r.aboutDesc':'The remainder (or residue) of a division is what is left over when the dividend is not exactly divisible by the divisor. It is computed as dividend − (divisor × integer quotient).',
'r.aboutFormula':'Remainder = Dividend − Divisor × Quotient',
'r.aboutExact':'If the remainder is 0, the division is exact. Otherwise the real result is Quotient + Remainder/Divisor (the decimal part).',
'r.needInputs':'Enter dividend and divisor to see the steps.',
'r.copyAll':'Copy explanation',
'b.exprLbl':'Boolean expression',
'b.exprPh':'e.g. (A AND B) OR NOT C',
'b.varsLbl':'Detected variables',
'b.hint':'Operators: AND (·), OR (+), NOT (¬), XOR (⊕), NAND, NOR, XNOR. You can also use & | ! ^ ~. Variables: A, B, C, D (max 4).',
'b.errorVar':'Variable not allowed: only A, B, C, D.',
'b.errorSyntax':'Invalid boolean expression.',
'b.errorVars':'Too many variables (max 4: A, B, C, D).',
'b.errorEmpty':'Type a boolean expression to start.',
'b.truthTable':'Truth table',
'b.minterms':'Minterms (where F = 1)',
'b.maxterms':'Maxterms (where F = 0)',
'b.sop':'Canonical SOP form (sum of products)',
'b.pos':'Canonical POS form (product of sums)',
'b.simplified':'Simplification',
'b.simplify':'Simplify',
'b.simplifying':'Simplifying…',
'b.noSimplify':'Could not simplify automatically.',
'b.usesVars':'Uses: {0}',
'b.noVars':'The expression contains no variables.',
'b.resultF':'F = {0}',
'b.evalAll':'Evaluate all combinations',
'b.copyTruth':'Copy truth table',
'b.downloadCSV':'Download CSV',
'd.exprLbl':'Boolean expression for the diagram',
'd.exprPh':'e.g. (A AND B) OR NOT C',
'd.hint':'Generates an SVG diagram with the logic gates. Each gate is drawn with its standard symbol and connections with orthogonal wires.',
'd.generate':'Generate diagram',
'd.generating':'Generating diagram…',
'd.errorExpr':'Could not parse the expression.',
'd.errorEmpty':'Type a boolean expression.',
'd.errorTooDeep':'The expression is too deep or complex to draw.',
'd.errorVars':'Too many variables for the diagram (max 4).',
'd.download':'Download SVG',
'd.downloadPNG':'Download PNG',
'd.svgTitle':'Gate diagram',
'd.gates':'Gates used',
'd.depth':'Depth',
'd.inputs':'Inputs',
'd.nodeCount':'Nodes',
'd.downloadDone':'Downloaded',
'd.downloadFail':'Could not download',
'd.simplifiedLabel':'Expression',
'd.truthBelow':'Truth table',
'd.noDiagram':'Press "Generate diagram" to see the circuit.',
'd.legend':'Legend',
'd.andGate':'AND',
'd.orGate':'OR',
'd.notGate':'NOT',
'd.xorGate':'XOR',
'd.nandGate':'NAND',
'd.norGate':'NOR',
'd.xnorGate':'XNOR'
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

const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));

function esc(s){
return String(s).replace(/[&<>"']/g,c=>({
'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
}[c]));
}

function parseNum(raw){
if(typeof raw!=='string')return NaN;
const n=parseFloat(raw.trim().replace(',','.'));
return isFinite(n)?n:NaN;
}

async function copyText(txt){
try{
if(navigator.clipboard&&window.isSecureContext){
await navigator.clipboard.writeText(txt);
return true;
}
}catch(e){}
try{
const ta=document.createElement('textarea');
ta.value=txt;
ta.setAttribute('readonly','');
ta.style.cssText='position:fixed;top:-1000px;opacity:0';
document.body.appendChild(ta);
ta.select();
const ok=document.execCommand('copy');
document.body.removeChild(ta);
return ok;
}catch(e){return false;}
}

function showToast(msg,isErr){
if(window.__nibblyToast){
try{window.__nibblyToast(msg,isErr);return;}catch(e){}
}
let el=document.getElementById('nibblyFormulasToast');
if(!el){
el=document.createElement('div');
el.id='nibblyFormulasToast';
el.style.cssText='position:fixed;left:50%;bottom:calc(28px + env(safe-area-inset-bottom));transform:translate(-50%,20px);padding:12px 22px;border-radius:999px;font-weight:800;font-size:13px;opacity:0;pointer-events:none;transition:opacity .25s,transform .25s;z-index:400;box-shadow:0 8px 24px rgba(0,0,0,.35);max-width:90vw;text-align:center;font-family:inherit;';
document.body.appendChild(el);
}
el.textContent=msg;
el.style.background=isErr?'var(--bad,#ff6b7a)':'var(--good,#22d3a6)';
el.style.color=isErr?'#fff':'#04231a';
el.style.opacity='1';
el.style.transform='translate(-50%,0)';
clearTimeout(el._hideTimer);
el._hideTimer=setTimeout(()=>{
el.style.opacity='0';
el.style.transform='translate(-50%,20px)';
},2000);
}

function csvEscape(v){
const s=String(v==null?'':v);
if(/[",\n\r]/.test(s))return'"'+s.replace(/"/g,'""')+'"';
return s;
}

function downloadCSV(filename,headerRow,dataRows){
if(!dataRows||!dataRows.length){
showToast(t('f.csvEmpty'),true);
return false;
}
try{
const lines=[];
if(headerRow&&headerRow.length){
lines.push(headerRow.map(csvEscape).join(','));
}
dataRows.forEach(r=>lines.push(r.map(csvEscape).join(',')));
const csv=lines.join('\n');
const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});
const url=URL.createObjectURL(blob);
const a=document.createElement('a');
a.href=url;
a.download=filename;
document.body.appendChild(a);
a.click();
setTimeout(()=>{URL.revokeObjectURL(url);a.remove();},60000);
showToast(t('f.csvDone'));
return true;
}catch(e){
showToast(t('f.csvFail')+': '+(e.message||e),true);
return false;
}
}

function safeFilePart(s){
return String(s).replace(/[^\w.-]+/g,'_').replace(/^_+|_+$/g,'').slice(0,40)||'x';
}

const RESERVED=new Set(['e','pi','E','PI']);

function detectVars(formula){
const m=formula.match(/\b[a-zA-Z]\b/g)||[];
return Array.from(new Set(m)).filter(v=>!RESERVED.has(v)).sort();
}

function evaluateFormula(formula,vars){
if(!formula||!formula.trim())return null;
const varNames=detectVars(formula);
if(!varNames.length){
if(!/[\d+\-*/^().,%√²³]/.test(formula))return null;
}
let subst=formula;
for(const v of varNames){
const raw=vars[v];
if(raw===undefined||raw===''||!isFinite(parseNum(raw))){
throw new Error(t('f.errorVar',v));
}
subst=subst.replace(new RegExp('\\b'+v+'\\b','g'),'('+parseNum(raw)+')');
}
if(/[a-zA-Z_]/.test(subst.replace(/[eE]/g,''))){
throw new Error(t('f.errorSyntax'));
}
if(!/^[\d\s+\-*/().,%^√²³eE]+$/.test(subst)){
throw new Error(t('f.errorSyntax'));
}
let expr=subst
.replace(/√/g,'Math.sqrt')
.replace(/²/g,'**2')
.replace(/³/g,'**3')
.replace(/\^/g,'**')
.replace(/%/g,'/100');
let result;
try{
result=Function('"use strict";return ('+expr+');')();
}catch(e){
throw new Error(t('f.errorSyntax'));
}
if(typeof result!=='number'||!isFinite(result)){
throw new Error(t('f.errorDivZero'));
}
return{result,subst,varNames};
}

const HEX='0123456789ABCDEF';

function decToBin(n){
const steps=[];
let v=Math.floor(n);
if(v===0){
steps.push({div:'0 ÷ 2',q:'0',r:'0'});
return{result:'0',steps};
}
while(v>0){
const q=Math.floor(v/2),r=v%2;
steps.push({div:v+' ÷ 2',q:String(q),r:String(r)});
v=q;
}
return{result:steps.map(s=>s.r).reverse().join(''),steps};
}

function decToHex(n){
const steps=[];
let v=Math.floor(n);
if(v===0)return{result:'0',steps:[{div:'0 ÷ 16',q:'0',r:'0'}]};
while(v>0){
const q=Math.floor(v/16),r=v%16;
steps.push({div:v+' ÷ 16',q:String(q),r:r+' ('+HEX[r]+')'});
v=q;
}
return{result:steps.map(s=>HEX[parseInt(s.r,10)]).reverse().join(''),steps};
}

function decToHexFrac(n){
const intPart=Math.floor(n);
const fracPart=n-intPart;
const intSteps=[];
let v=intPart;
if(v===0)intSteps.push({div:'0 ÷ 16',q:'0',r:'0'});
while(v>0){
const q=Math.floor(v/16),r=v%16;
intSteps.push({div:v+' ÷ 16',q:String(q),r:r+' ('+HEX[r]+')'});
v=q;
}
const intResult=intSteps.map(s=>HEX[parseInt(s.r,10)]).reverse().join('');
const fracSteps=[];
let f=fracPart,fracResult='',iter=0;
while(f>1e-10&&iter<20){
const mult=f*16;
const digit=Math.floor(mult);
const rem=mult-digit;
fracSteps.push({
mult:f.toFixed(6).replace(/0+$/,'').replace(/\.$/,'')+' × 16',
result:mult.toFixed(6).replace(/0+$/,'').replace(/\.$/,''),
digit:HEX[digit]
});
fracResult+=HEX[digit];
f=rem;
iter++;
}
const result=intResult+(fracResult?'.'+fracResult:'');
return{result,intSteps,fracSteps};
}

function decToOct(n){
const steps=[];
let v=Math.floor(n);
if(v===0)return{result:'0',steps:[{div:'0 ÷ 8',q:'0',r:'0'}]};
while(v>0){
const q=Math.floor(v/8),r=v%8;
steps.push({div:v+' ÷ 8',q:String(q),r:String(r)});
v=q;
}
return{result:steps.map(s=>s.r).reverse().join(''),steps};
}

function binToOct(bin){
if(!/^[01]+$/.test(bin))throw new Error(t('f.errorBits'));
const padded=bin.padStart(Math.ceil(bin.length/3)*3,'0');
const groups=padded.match(/.{3}/g);
const steps=groups.map(g=>({bits:g,value:parseInt(g,2).toString(8)}));
return{result:steps.map(s=>s.value).join(''),steps};
}

function binToHex(bin){
if(!/^[01]+$/.test(bin))throw new Error(t('f.errorBits'));
const padded=bin.padStart(Math.ceil(bin.length/4)*4,'0');
const groups=padded.match(/.{4}/g);
const steps=groups.map(g=>({bits:g,value:parseInt(g,2).toString(16).toUpperCase()}));
return{result:steps.map(s=>s.value).join(''),steps};
}

function binToDec(bin){
if(!/^[01]+$/.test(bin))throw new Error(t('f.errorBits'));
const clean=bin.replace(/^0+(?=\d)/,'')||'0';
const len=clean.length;
const steps=[];
let total=0n;
for(let i=0;i<len;i++){
const bit=clean[i];
const power=len-1-i;
const weight=2n**BigInt(power);
const product=BigInt(bit)*weight;
total+=product;
steps.push({
digit:bit,
value:String(bit),
power:String(power),
weight:weight.toString(),
product:product.toString()
});
}
const htmlExpression=steps.map(s=>s.value+' × 2<sup>'+s.power+'</sup>').join(' + ');
const productsExpression=steps.map(s=>s.product).join(' + ');
return{result:total.toString(),steps,htmlExpression,productsExpression,input:clean};
}

function octToDec(str){
const clean=String(str).trim().replace(/^0o/i,'').replace(/\s+/g,'');
if(!/^[0-7]+$/.test(clean))throw new Error(t('f.errorOct'));
const len=clean.length;
const steps=[];
let total=0n;
for(let i=0;i<len;i++){
const ch=clean[i];
const digitValue=parseInt(ch,8);
const power=len-1-i;
const weight=8n**BigInt(power);
const product=BigInt(digitValue)*weight;
total+=product;
steps.push({
digit:ch,
value:String(digitValue),
power:String(power),
weight:weight.toString(),
product:product.toString()
});
}
const htmlExpression=steps.map(s=>s.value+' × 8<sup>'+s.power+'</sup>').join(' + ');
const productsExpression=steps.map(s=>s.product).join(' + ');
return{result:total.toString(),steps,htmlExpression,productsExpression,input:clean};
}

function octToBin(str){
const clean=String(str).trim().replace(/^0o/i,'').replace(/\s+/g,'');
if(!/^[0-7]+$/.test(clean))throw new Error(t('f.errorOct'));
const steps=[];
let result='';
for(let i=0;i<clean.length;i++){
const ch=clean[i];
const bin=parseInt(ch,8).toString(2).padStart(3,'0');
steps.push({digit:ch,bits:bin});
result+=bin;
}
return{result:result.replace(/^0+(?=\d)/,'')||'0',steps};
}

function hexToBin(str){
const clean=String(str).trim().replace(/^0x/i,'').replace(/\s+/g,'').toUpperCase();
if(!/^[0-9A-F]+$/.test(clean))throw new Error(t('f.errorHex'));
const steps=[];
let result='';
for(let i=0;i<clean.length;i++){
const ch=clean[i];
const bin=parseInt(ch,16).toString(2).padStart(4,'0');
steps.push({digit:ch,bits:bin});
result+=bin;
}
return{result:result.replace(/^0+(?=\d)/,'')||'0',steps};
}

function hexToOct(str){
const binRes=hexToBin(str);
const padded=binRes.result.padStart(Math.ceil(binRes.result.length/3)*3,'0');
const groups=padded.match(/.{3}/g)||['0'];
const steps=groups.map(g=>({bits:g,value:parseInt(g,2).toString(8)}));
return{
result:steps.map(s=>s.value).join(''),
steps,
binPath:binRes.result,
binSteps:binRes.steps
};
}

function octToHex(str){
const binRes=octToBin(str);
const padded=binRes.result.padStart(Math.ceil(binRes.result.length/4)*4,'0');
const groups=padded.match(/.{4}/g)||['0000'];
const steps=groups.map(g=>({bits:g,value:parseInt(g,2).toString(16).toUpperCase()}));
return{
result:steps.map(s=>s.value).join(''),
steps,
binPath:binRes.result,
binSteps:binRes.steps
};
}

function hexToDec(str){
const clean=String(str).trim().replace(/^0x/i,'').replace(/\s+/g,'').toUpperCase();
if(!/^[0-9A-F]+$/.test(clean))throw new Error(t('f.errorHex'));
const len=clean.length;
const steps=[];
let total=0n;
for(let i=0;i<len;i++){
const ch=clean[i];
const digitValue=parseInt(ch,16);
const power=len-1-i;
const weight=16n**BigInt(power);
const product=BigInt(digitValue)*weight;
total+=product;
steps.push({
digit:ch,
value:String(digitValue),
power:String(power),
weight:weight.toString(),
product:product.toString()
});
}
const expression=steps.map(s=>s.value+' × 16^'+s.power).join(' + ');
const productsExpression=steps.map(s=>s.product).join(' + ');
const htmlExpression=steps.map(s=>s.value+' × 16<sup>'+s.power+'</sup>').join(' + ');
return{result:total.toString(),steps,expression,productsExpression,htmlExpression,input:clean};
}


function computeResidueSteps(dividendStr,divisorStr){
const dividend=String(dividendStr).trim();
const divisorNum=parseInt(divisorStr,10);

if(!/^\d+$/.test(dividend)){
throw new Error(t('r.needIntegers'));
}
if(!/^\d+$/.test(String(divisorStr).trim())){
throw new Error(t('r.needIntegers'));
}
if(!isFinite(divisorNum)||divisorNum<=0){
throw new Error(t('r.needDivisor'));
}

const dividendNum=parseInt(dividend,10);
if(!isFinite(dividendNum)){
throw new Error(t('r.needIntegers'));
}
if(divisorNum>dividendNum){
throw new Error(t('f.errorDivisorBig'));
}

const digits=dividend.split('');
const steps=[];
let current=0;
let quotientStr='';

for(let i=0;i<digits.length;i++){
const d=parseInt(digits[i],10);
const before=current;
current=current*10+d;
const q=Math.floor(current/divisorNum);
const r=current-q*divisorNum;
const multiplied=q*divisorNum;

steps.push({
index:i+1,
digitBrought:String(d),
before:String(before),
current:String(current),
quotientDigit:String(q),
multiplied:String(multiplied),
residue:String(r),
isFirst:q===0&&quotientStr===''
});

quotientStr+=String(q);
}

const quotient=quotientStr.replace(/^0+(?=\d)/,'')||'0';
const residue=current%divisorNum;

return{
dividend:String(dividendNum),
divisor:String(divisorNum),
quotient,
residue:String(residue),
steps,
check:{
lhs:String(dividendNum),
rhsMul:divisorNum*parseInt(quotient,10),
rhsRes:residue,
sum:divisorNum*parseInt(quotient,10)+residue
}
};
}


const BOOL_TOKEN_RE=/\s*(NOT|NAND|NOR|XNOR|AND|OR|XOR|[A-Da-d]|[01]|[()&|!^~·+⊕¬])\s*/g;
const BOOL_VARS_ALLOWED=new Set(['A','B','C','D']);

function normalizeBoolExpr(expr){
let s=String(expr||'');
s=s.replace(/[·⋅]/g,' AND ');
s=s.replace(/\+/g,' OR ');
s=s.replace(/⊕/g,' XOR ');
s=s.replace(/¬/g,' NOT ');
s=s.replace(/~/g,' NOT ');
s=s.replace(/!/g,' NOT ');
s=s.replace(/&/g,' AND ');
s=s.replace(/\|/g,' OR ');
s=s.replace(/\^/g,' XOR ');
s=s.replace(/\bAND\b/gi,' AND ');
s=s.replace(/\bOR\b/gi,' OR ');
s=s.replace(/\bNOT\b/gi,' NOT ');
s=s.replace(/\bXOR\b/gi,' XOR ');
s=s.replace(/\bNAND\b/gi,' NAND ');
s=s.replace(/\bNOR\b/gi,' NOR ');
s=s.replace(/\bXNOR\b/gi,' XNOR ');
s=s.replace(/\b([a-d])\b/g,(m,p)=>p.toUpperCase());
return s.replace(/\s+/g,' ').trim();
}

function tokenizeBool(expr){
const norm=normalizeBoolExpr(expr);
const tokens=[];
let i=0;
const s=norm;
while(i<s.length){
const ch=s[i];
if(/\s/.test(ch)){i++;continue;}

const rest=s.slice(i);
const ops=['XNOR','NAND','NOT','XOR','NOR','AND','OR'];
let matched=false;
for(const op of ops){
if(rest.toUpperCase().startsWith(op)){

const after=rest.slice(op.length);
if(after===''||/[\s()A-D0-1]/.test(after[0])){
tokens.push({type:'op',value:op});
i+=op.length;
matched=true;
break;
}
}
}
if(matched)continue;
if(ch==='('||ch===')'){tokens.push({type:'paren',value:ch});i++;continue;}
if(ch==='0'||ch==='1'){tokens.push({type:'const',value:ch});i++;continue;}
if(/[A-Da-d]/.test(ch)){tokens.push({type:'var',value:ch.toUpperCase()});i++;continue;}
throw new Error(t('b.errorSyntax'));
}
return tokens;
}


function parseBoolTokens(tokens){
let pos=0;
function peek(){return tokens[pos];}
function consume(){return tokens[pos++];}
function expect(type,value){
const tk=peek();
if(!tk||tk.type!==type||(value!==undefined&&tk.value!==value))throw new Error(t('b.errorSyntax'));
return consume();
}

function parsePrimary(){
const tk=peek();
if(!tk)throw new Error(t('b.errorSyntax'));
if(tk.type==='paren'&&tk.value==='('){
consume();
const node=parseOr();
expect('paren',')');
return node;
}
if(tk.type==='const'){consume();return{type:'const',value:tk.value};}
if(tk.type==='var'){consume();return{type:'var',name:tk.value};}
if(tk.type==='op'&&tk.value==='NOT'){
consume();
const child=parsePrimary();
return{type:'not',child};
}
throw new Error(t('b.errorSyntax'));
}

function parseAnd(){
let left=parsePrimary();
while(true){
const tk=peek();
if(!tk)break;
if(tk.type==='op'&&(tk.value==='AND'||tk.value==='NAND')){
consume();
const right=parsePrimary();
left={type:tk.value==='AND'?'and':'nand',left,right};
}else break;
}
return left;
}

function parseXor(){
let left=parseAnd();
while(true){
const tk=peek();
if(!tk)break;
if(tk.type==='op'&&(tk.value==='XOR'||tk.value==='XNOR')){
consume();
const right=parseAnd();
left={type:tk.value==='XOR'?'xor':'xnor',left,right};
}else break;
}
return left;
}

function parseOr(){
let left=parseXor();
while(true){
const tk=peek();
if(!tk)break;
if(tk.type==='op'&&(tk.value==='OR'||tk.value==='NOR')){
consume();
const right=parseXor();
left={type:tk.value==='OR'?'or':'nor',left,right};
}else break;
}
return left;
}

const ast=parseOr();
if(pos<tokens.length)throw new Error(t('b.errorSyntax'));
return ast;
}

function collectVars(ast){
const set=new Set();
function walk(n){
if(!n)return;
if(n.type==='var')set.add(n.name);
if(n.left)walk(n.left);
if(n.right)walk(n.right);
if(n.child)walk(n.child);
}
walk(ast);
return Array.from(set).sort();
}

function evalBoolAst(ast,values){
switch(ast.type){
case'const':return ast.value==='1';
case'var':return!!values[ast.name];
case'not':return!evalBoolAst(ast.child,values);
case'and':return evalBoolAst(ast.left,values)&&evalBoolAst(ast.right,values);
case'or':return evalBoolAst(ast.left,values)||evalBoolAst(ast.right,values);
case'xor':return(evalBoolAst(ast.left,values)?1:0)!==(evalBoolAst(ast.right,values)?1:0);
case'nand':return!(evalBoolAst(ast.left,values)&&evalBoolAst(ast.right,values));
case'nor':return!(evalBoolAst(ast.left,values)||evalBoolAst(ast.right,values));
case'xnor':return(evalBoolAst(ast.left,values)?1:0)===(evalBoolAst(ast.right,values)?1:0);
}
return false;
}

function astToExprString(ast){
switch(ast.type){
case'const':return ast.value;
case'var':return ast.name;
case'not':return'NOT '+astToExprString(ast.child);
case'and':return'('+astToExprString(ast.left)+' AND '+astToExprString(ast.right)+')';
case'or':return'('+astToExprString(ast.left)+' OR '+astToExprString(ast.right)+')';
case'xor':return'('+astToExprString(ast.left)+' XOR '+astToExprString(ast.right)+')';
case'nand':return'('+astToExprString(ast.left)+' NAND '+astToExprString(ast.right)+')';
case'nor':return'('+astToExprString(ast.left)+' NOR '+astToExprString(ast.right)+')';
case'xnor':return'('+astToExprString(ast.left)+' XNOR '+astToExprString(ast.right)+')';
}
return'';
}

function buildTruthTable(ast,vars){
const rows=[];
const n=1<<vars.length;
for(let i=0;i<n;i++){
const values={};
for(let j=0;j<vars.length;j++){
values[vars[j]]=!!((i>>(vars.length-1-j))&1);
}
rows.push({index:i,values,result:evalBoolAst(ast,values)});
}
return rows;
}

function mintermsFromTable(rows,vars){
const minterms=[];
rows.forEach(r=>{
if(r.result){
let m=0;
vars.forEach((v,j)=>{
if(r.values[v])m|=(1<<(vars.length-1-j));
});
minterms.push(m);
}
});
return minterms;
}

function maxtermsFromTable(rows,vars){
const maxterms=[];
rows.forEach(r=>{
if(!r.result){
let m=0;
vars.forEach((v,j)=>{
if(r.values[v])m|=(1<<(vars.length-1-j));
});
maxterms.push(m);
}
});
return maxterms;
}

function mintermToSOP(minterm,vars){
const n=vars.length;
const parts=[];
for(let j=0;j<n;j++){
const bit=(minterm>>(n-1-j))&1;
parts.push(bit?vars[j]:'NOT '+vars[j]);
}
return'('+parts.join(' AND ')+')';
}

function maxtermToPOS(maxterm,vars){
const n=vars.length;
const parts=[];
for(let j=0;j<n;j++){
const bit=(maxterm>>(n-1-j))&1;

parts.push(bit?'NOT '+vars[j]:vars[j]);
}
return'('+parts.join(' OR ')+')';
}

function buildSOP(minterms,vars){
if(!minterms.length)return'0';
if(minterms.length===(1<<vars.length))return'1';
return minterms.map(m=>mintermToSOP(m,vars)).join(' OR ');
}

function buildPOS(maxterms,vars){
if(!maxterms.length)return'1';
if(maxterms.length===(1<<vars.length))return'0';
return maxterms.map(m=>maxtermToPOS(m,vars)).join(' AND ');
}


function popcount(x){let c=0;while(x){c+=x&1;x>>=1;}return c;}

function simplifyMinterms(minterms,vars){
if(!minterms.length)return'0';
if(minterms.length===(1<<vars.length))return'1';

const n=vars.length;
const groups={};
minterms.forEach(m=>{
const b=m.toString(2).padStart(n,'0');
const pc=popcount(m);
if(!groups[pc])groups[pc]=[];
groups[pc].push({bits:b,cover:[m],dc:false});
});
let allTerms=[];
let current=groups;
let changed=true;
const primes=[];
while(changed){
changed=false;
const used=new Set();
const nextGroups={};
const keys=Object.keys(current).map(Number).sort((a,b)=>a-b);
for(let gi=0;gi<keys.length-1;gi++){
const g1=current[keys[gi]];
const g2=current[keys[gi+1]];
if(!g1||!g2)continue;
for(const t1 of g1){
for(const t2 of g2){
const diff=diffBits(t1.bits,t2.bits);
if(diff===1){
changed=true;
used.add(t1);used.add(t2);
const newBits=mergeBits(t1.bits,t2.bits);
const cover=Array.from(new Set([...t1.cover,...t2.cover]));
const pc=popcount(parseInt(newBits.replace(/-/g,'0'),2));
const key=pc;
if(!nextGroups[key])nextGroups[key]=[];
const exists=nextGroups[key].some(x=>x.bits===newBits);
if(!exists)nextGroups[key].push({bits:newBits,cover,dc:false});
}
}
}
}
Object.values(current).forEach(arr=>{
arr.forEach(t=>{
if(!used.has(t)){
const exists=primes.some(p=>p.bits===t.bits&&p.cover.join(',')===t.cover.join(','));
if(!exists)primes.push(t);
}
});
});
current=nextGroups;
}

const uncovered=new Set(minterms);
const selected=[];
while(uncovered.size){

let best=null,bestCount=-1;
for(const p of primes){
const c=p.cover.filter(m=>uncovered.has(m)).length;
if(c>bestCount){bestCount=c;best=p;}
}
if(!best)break;
selected.push(best);
best.cover.forEach(m=>uncovered.delete(m));
}

const terms=selected.map(p=>{
const parts=[];
for(let j=0;j<n;j++){
if(p.bits[j]==='-')continue;
parts.push(p.bits[j]==='1'?vars[j]:'NOT '+vars[j]);
}
return parts.length?parts.join(' AND '):'1';
});
return terms.join(' OR ');
}

function diffBits(a,b){
let d=0;
for(let i=0;i<a.length;i++)if(a[i]!==b[i])d++;
return d;
}

function mergeBits(a,b){
let r='';
for(let i=0;i<a.length;i++)r+=a[i]===b[i]?a[i]:'-';
return r;
}


const GATE_W=80;
const GATE_H=56;
const INPUT_W=44;
const INPUT_H=30;
const WIRE_GAP=28;
const LEVEL_GAP_X=120;
const LEVEL_GAP_Y=90;
const PAD=24;

function measureAstDepth(ast){
if(!ast)return 0;
if(ast.type==='const'||ast.type==='var')return 0;
if(ast.type==='not')return 1+measureAstDepth(ast.child);
return 1+Math.max(measureAstDepth(ast.left),measureAstDepth(ast.right));
}


function gateExtraW(type){
return(type==='nand'||type==='nor'||type==='xnor')?9:0;
}

function buildLayout(ast){

const nodes=[];
const leaves=[];

function collectLeaves(n){
if(n.type==='const'||n.type==='var'){leaves.push(n);return;}
if(n.type==='not'){collectLeaves(n.child);return;}
collectLeaves(n.left);
collectLeaves(n.right);
}
collectLeaves(ast);


leaves.forEach((leaf,i)=>{
leaf._y=PAD+i*(GATE_H+WIRE_GAP);
});


function assignY(n){
if(n.type==='const'||n.type==='var')return n._y;
if(n.type==='not'){
n._y=assignY(n.child);
}else{
const yl=assignY(n.left);
const yr=assignY(n.right);
n._y=(yl+yr)/2;
}
return n._y;
}
assignY(ast);


function assignX(n){
if(n.type==='const'||n.type==='var'){
n._x=PAD;
return PAD+INPUT_W;
}
if(n.type==='not'){
const childRight=assignX(n.child);
n._x=childRight+LEVEL_GAP_X/2;
return n._x+GATE_W+gateExtraW('not');
}
const lx=assignX(n.left);
const rx=assignX(n.right);
n._x=Math.max(lx,rx)+LEVEL_GAP_X/2;
return n._x+GATE_W+gateExtraW(n.type);
}
assignX(ast);


function collectNodes(n){
if(n.type==='not'){
collectNodes(n.child);
nodes.push(n);
}else if(n.type!=='const'&&n.type!=='var'){
collectNodes(n.left);
collectNodes(n.right);
nodes.push(n);
}else{
nodes.push(n);
}
}
collectNodes(ast);

return{nodes,leaves,maxDepth:measureAstDepth(ast)};
}

function svgGateSymbol(type,x,y,w,h){

const cy=y+h/2;
const fill='#1a2138';
const stroke='#7aa2ff';
const sw=2;
switch(type){
case'and':
case'nand':{
const path=`<path d="M ${x} ${y} L ${x+w*0.5} ${y} A ${w*0.5} ${h/2} 0 0 1 ${x+w} ${cy} A ${w*0.5} ${h/2} 0 0 1 ${x+w*0.5} ${y+h} L ${x} ${y+h} Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const circle=type==='nand'?`<circle cx="${x+w+5}" cy="${cy}" r="5" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`:'';
return path+circle;
}
case'or':
case'nor':{
const path=`<path d="M ${x} ${y} Q ${x+w*0.4} ${cy} ${x} ${y+h} Q ${x+w*0.8} ${cy} ${x+w} ${cy} Q ${x+w*0.8} ${cy} ${x} ${y} Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const circle=type==='nor'?`<circle cx="${x+w+5}" cy="${cy}" r="5" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`:'';
return path+circle;
}
case'xor':
case'xnor':{
const extra=`<path d="M ${x-6} ${y} Q ${x+w*0.3} ${cy} ${x-6} ${y+h}" fill="none" stroke="${stroke}" stroke-width="${sw}"/>`;
const path=`<path d="M ${x} ${y} Q ${x+w*0.4} ${cy} ${x} ${y+h} Q ${x+w*0.8} ${cy} ${x+w} ${cy} Q ${x+w*0.8} ${cy} ${x} ${y} Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const circle=type==='xnor'?`<circle cx="${x+w+5}" cy="${cy}" r="5" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`:'';
return extra+path+circle;
}
case'not':{
const tip=x+w*0.72;
return`<path d="M ${x} ${y} L ${x} ${y+h} L ${tip} ${cy} Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`+
`<circle cx="${tip+5}" cy="${cy}" r="5" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
}
}
return'';
}

function buildDiagramSVG(ast,vars){
const layout=buildLayout(ast);
const nodes=layout.nodes;
const leaves=layout.leaves;


const C_BG='#0b1020';
const C_SURFACE='#141a2e';
const C_PRIMARY='#7aa2ff';
const C_WIRE='#9fb0d0';
const C_VAR_TEXT='#ffffff';
const C_CONST_TEXT='#ffffff';
const C_GATE_LABEL='#ffffff';
const C_OUT='#22d3a6';
const C_OUT_TEXT='#22d3a6';


let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
nodes.forEach(n=>{
const isLeaf=n.type==='var'||n.type==='const';
const w=isLeaf?INPUT_W:GATE_W+gateExtraW(n.type);
const h=isLeaf?INPUT_H:GATE_H;
minX=Math.min(minX,n._x);
maxX=Math.max(maxX,n._x+w);
minY=Math.min(minY,n._y-h/2);
maxY=Math.max(maxY,n._y+h/2);
});

const width=Math.max(360,maxX-minX+PAD*2);
const height=Math.max(200,maxY-minY+PAD*2);
const offX=PAD-minX;
const offY=PAD-minY;

function nodeW(n){return n.type==='var'||n.type==='const'?INPUT_W:GATE_W;}
function nodeH(n){return n.type==='var'||n.type==='const'?INPUT_H:GATE_H;}
function nodeX(n){return n._x+offX;}
function nodeY(n){return n._y+offY;}


const edges=[];
function connect(parent,child,portIndex){
const cx=nodeX(child)+nodeW(child);
const cy=nodeY(child);
const px=nodeX(parent);
const ph=nodeH(parent);
const py=nodeY(parent);
let targetY;
if(parent.type==='not'){
targetY=py;
}else{
targetY=portIndex===0?py-ph/2+ph*0.3:py+ph/2-ph*0.3;
}
const midX=(cx+px)/2;
edges.push(`<path d="M ${cx} ${cy} L ${midX} ${cy} L ${midX} ${targetY} L ${px} ${targetY}" fill="none" stroke="${C_WIRE}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`);
}

function walkConnections(n){
if(n.type==='not'){
connect(n,n.child,0);
walkConnections(n.child);
}else if(n.type!=='var'&&n.type!=='const'){
connect(n,n.left,0);
connect(n,n.right,1);
walkConnections(n.left);
walkConnections(n.right);
}
}
walkConnections(ast);


const nodeEls=[];
nodes.forEach(n=>{
const x=nodeX(n),y=nodeY(n);
const w=nodeW(n),h=nodeH(n);
if(n.type==='var'){
nodeEls.push(`<g>
          <rect x="${x}" y="${y-h/2}" width="${w}" height="${h}" rx="8" fill="${C_SURFACE}" stroke="${C_PRIMARY}" stroke-width="2"/>
          <text x="${x+w/2}" y="${y+6}" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="15" font-weight="800" fill="${C_VAR_TEXT}">${esc(n.name)}</text>
        </g>`);
}else if(n.type==='const'){
nodeEls.push(`<g>
          <rect x="${x}" y="${y-h/2}" width="${w}" height="${h}" rx="8" fill="${C_SURFACE}" stroke="${C_PRIMARY}" stroke-width="2"/>
          <text x="${x+w/2}" y="${y+6}" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="15" font-weight="800" fill="${C_CONST_TEXT}">${esc(n.value)}</text>
        </g>`);
}else{
const gateType=n.type;
const symbolY=y-h/2;
const label=gateType.toUpperCase();
const labelEl=gateType==='not'?'':`<text x="${x+w*0.45}" y="${y+4}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="800" fill="${C_GATE_LABEL}" letter-spacing="0.5">${esc(label)}</text>`;
nodeEls.push(`<g>${svgGateSymbol(gateType,x,symbolY,w,h)}${labelEl}</g>`);
}
});


const root=ast;
const rootOutX=nodeX(root)+nodeW(root)+gateExtraW(root.type);
const rootOutY=nodeY(root);
const outW=50;
const outX=rootOutX+16;
const finalWidth=Math.max(width,outX+outW+PAD);

const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${finalWidth} ${height}" width="${finalWidth}" height="${height}" style="display:block;">
      <rect x="0" y="0" width="${finalWidth}" height="${height}" fill="${C_BG}"/>
      ${edges.join('\n')}
      ${nodeEls.join('\n')}
      <line x1="${rootOutX}" y1="${rootOutY}" x2="${outX}" y2="${rootOutY}" stroke="${C_WIRE}" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="${outX}" cy="${rootOutY}" r="4" fill="${C_OUT}"/>
      <text x="${outX+8}" y="${rootOutY+5}" font-family="ui-monospace,Menlo,monospace" font-size="14" font-weight="800" fill="${C_OUT_TEXT}">F</text>
    </svg>`;

return{svg,finalWidth,height,gateCount:nodes.filter(n=>n.type!=='var'&&n.type!=='const').length,depth:layout.maxDepth,inputs:leaves.length,nodeCount:nodes.length};
}


const ASCII_CONTROL_NAMES=['NUL','SOH','STX','ETX','EOT','ENQ','ACK','BEL','BS','HT','LF','VT','FF','CR','SO','SI','DLE','DC1','DC2','DC3','DC4','NAK','SYN','ETB','CAN','EM','SUB','ESC','FS','GS','RS','US'];

function asciiLabel(code){
if(code<32)return'['+ASCII_CONTROL_NAMES[code]+']';
if(code===32)return'[SP]';
if(code===127)return'[DEL]';
return String.fromCharCode(code);
}

function buildAsciiRows(){
const rows=[];
for(let code=0;code<=127;code++){
rows.push({
code,
dec:String(code),
hex:code.toString(16).toUpperCase().padStart(2,'0'),
oct:code.toString(8).padStart(3,'0'),
bin:code.toString(2).padStart(8,'0'),
char:(code>=32&&code!==127)?String.fromCharCode(code):'',
name:asciiLabel(code)
});
}
return rows;
}

let initialized=false;
let container=null;

let state={
mode:'formula',
subtab:'convert',
formula:'',
vars:{},
conversion:'dec2bin',
convValue:'',
revealToken:0,
lastRaw:'',
lastResult:null,
lastConv:null,
asciiRows:null,
asciiFilter:'',
residueDividend:'',
residueDivisor:'',
residueToken:0,

boolExpr:'(A AND B) OR NOT C',
boolAst:null,
boolVars:[],
boolError:'',

diagExpr:'(A AND B) OR NOT C',
diagSVG:null,
diagMeta:null,
diagError:''
};

const CONVERSIONS=[
{id:'dec2bin',fn:decToBin,needs:'int'},
{id:'dec2hex',fn:decToHex,needs:'int'},
{id:'dec2hexFrac',fn:decToHexFrac,needs:'num'},
{id:'dec2oct',fn:decToOct,needs:'int'},
{id:'bin2oct',fn:binToOct,needs:'bin'},
{id:'bin2hex',fn:binToHex,needs:'bin'},
{id:'bin2dec',fn:binToDec,needs:'bin'},
{id:'oct2dec',fn:octToDec,needs:'oct'},
{id:'oct2bin',fn:octToBin,needs:'oct'},
{id:'oct2hex',fn:octToHex,needs:'oct'},
{id:'hex2dec',fn:hexToDec,needs:'hex'},
{id:'hex2bin',fn:hexToBin,needs:'hex'},
{id:'hex2oct',fn:hexToOct,needs:'hex'}
];

function inputModeFor(convId){
if(convId==='hex2dec'||convId==='hex2bin'||convId==='hex2oct')return'text';
if(convId.indexOf('bin')===0)return'numeric';
if(convId.indexOf('oct')===0)return'numeric';
return'decimal';
}

function getConv(id){
return CONVERSIONS.find(c=>c.id===id)||CONVERSIONS[0];
}

function renderAll(){
if(!container)return;
container.innerHTML='';
const root=document.createElement('div');
root.className='nibbly-formulas';
root.appendChild(buildModeSeg());
if(state.mode==='formula'){
root.appendChild(buildFormulaEditor());
}else{
root.appendChild(buildSubtabs());
if(state.subtab==='convert'){
root.appendChild(buildConversionEditor());
root.appendChild(buildAsciiCard());
}else if(state.subtab==='residue'){
root.appendChild(buildResidueEditor());
}else if(state.subtab==='boole'){
root.appendChild(buildBooleEditor());
}else if(state.subtab==='boolDiagram'){
root.appendChild(buildBoolDiagramEditor());
}
}
container.appendChild(root);
if(state.mode==='formula')attachFormulaEvents();
else{
if(state.subtab==='convert')attachConversionEvents();
else if(state.subtab==='residue')attachResidueEvents();
else if(state.subtab==='boole')attachBooleEvents();
else if(state.subtab==='boolDiagram')attachBoolDiagramEvents();
}
updateFormulaPreview();
}

function buildModeSeg(){
const seg=document.createElement('div');
seg.className='f-seg';
const fBtn=document.createElement('button');
fBtn.type='button';
fBtn.className='f-seg-btn'+(state.mode==='formula'?' active':'');
fBtn.textContent=t('f.mode.formula');
fBtn.dataset.mode='formula';
const cBtn=document.createElement('button');
cBtn.type='button';
cBtn.className='f-seg-btn'+(state.mode==='conversion'?' active':'');
cBtn.textContent=t('f.mode.conversion');
cBtn.dataset.mode='conversion';
fBtn.addEventListener('click',()=>{state.mode='formula';renderAll();});
cBtn.addEventListener('click',()=>{state.mode='conversion';renderAll();});
seg.appendChild(fBtn);
seg.appendChild(cBtn);
return seg;
}

function buildSubtabs(){
const seg=document.createElement('div');
seg.className='f-seg f-seg-sub f-seg-sub-4';
const subtabs=[
{id:'convert',label:t('f.subtab.convert')},
{id:'residue',label:t('f.subtab.residue')},
{id:'boole',label:t('f.subtab.boole')},
{id:'boolDiagram',label:t('f.subtab.boolDiagram')}
];
subtabs.forEach(st=>{
const btn=document.createElement('button');
btn.type='button';
btn.className='f-seg-btn'+(state.subtab===st.id?' active':'');
btn.textContent=st.label;
btn.dataset.subtab=st.id;
btn.addEventListener('click',()=>{state.subtab=st.id;renderAll();});
seg.appendChild(btn);
});
return seg;
}

function buildFormulaEditor(){
const wrap=document.createElement('div');
wrap.innerHTML=`
      <div class="f-field">
        <label class="f-lbl">${esc(t('f.formulaLbl'))}</label>
        <textarea class="f-textarea" id="fFormulaInput" spellcheck="false" autocomplete="off" placeholder="${esc(t('f.formulaPh'))}">${esc(state.formula)}</textarea>
      </div>
      <div id="fVarsArea"></div>
      <div class="f-field" style="margin-top:14px;">
        <div class="f-lbl">${esc(t('f.preview'))}</div>
        <div class="f-preview" id="fPreview">
          <div class="f-preview-label">${esc(t('f.preview'))}</div>
          <div class="f-preview-sub">${esc(t('f.previewEmpty'))}</div>
        </div>
      </div>
      <div class="f-actions">
        <button type="button" class="f-btn formulas-clear-btn" id="fClearBtn">${esc(t('f.clear'))}</button>
        <button type="button" class="formulas-reveal-btn" id="fRevealBtn">${esc(t('f.reveal'))}</button>
      </div>
      <div class="f-loading" id="fLoading"></div>
      <div class="f-reveal" id="fRevealArea"></div>
      <div class="f-hint">${esc(t('f.hint.formula'))}</div>
      <div class="f-error" id="fError"></div>
    `;
const area=wrap.querySelector('#fVarsArea');
area.appendChild(buildVarsInputs());
return wrap;
}

function buildVarsInputs(){
const box=document.createElement('div');
const formula=state.formula;
const vars=detectVars(formula);
if(!vars.length)return box;
const lbl=document.createElement('label');
lbl.className='f-lbl';
lbl.textContent=t('f.varsLbl');
box.appendChild(lbl);
const grid=document.createElement('div');
grid.className='f-vars';
vars.forEach(v=>{
const cell=document.createElement('div');
cell.className='f-var';
cell.innerHTML=`
        <span class="f-var-lbl">${esc(v)}</span>
        <input class="f-var-input" type="text" inputmode="decimal" data-var="${esc(v)}" value="${esc(state.vars[v] != null ? state.vars[v] : '')}" placeholder="0" autocomplete="off" spellcheck="false">
      `;
grid.appendChild(cell);
});
box.appendChild(grid);
return box;
}

function buildConversionEditor(){
const wrap=document.createElement('div');
const chips=CONVERSIONS.map(c=>
`<button type="button" class="f-chip${c.id === state.conversion ? ' active' : ''}" data-conv="${c.id}">${esc(t('f.conv.' + c.id))}</button>`
).join('');
wrap.innerHTML=`
      <div class="f-field" style="margin-top:0;">
        <label class="f-lbl">${esc(t('f.convLbl'))}</label>
        <div class="f-chips" id="fConvChips">${chips}</div>
        <input class="f-var-input" id="fConvInput" type="text" inputmode="${inputModeFor(state.conversion)}" style="margin-top:12px;width:100%;" value="${esc(state.convValue)}" placeholder="${esc(t('f.convPh.' + state.conversion))}" autocomplete="off" spellcheck="false">
      </div>
      <div class="f-actions">
        <button type="button" class="f-btn formulas-clear-btn" id="fClearBtn">${esc(t('f.clear'))}</button>
        <button type="button" class="formulas-reveal-btn" id="fRevealBtn">${esc(t('f.reveal'))}</button>
      </div>
      <div class="f-loading" id="fLoading"></div>
      <div class="f-reveal" id="fRevealArea"></div>
      <div class="f-hint">${esc(t('f.hint.conversion'))}</div>
      <div class="f-error" id="fError"></div>
    `;
return wrap;
}


function buildAsciiCard(){
const card=document.createElement('div');
card.className='f-field';
card.style.marginTop='20px';
card.innerHTML=`
        <div class="f-seg" style="cursor:default;">
          <button type="button" class="f-seg-btn active" id="fAsciiHeaderBtn" style="cursor:default;pointer-events:none;justify-content:flex-start;text-align:left;padding-left:14px;">${icon('grid', 16)} ${esc(t('f.ascii.title'))}</button>
        </div>
        <div class="f-hint" style="margin-top:6px;">${esc(t('f.ascii.desc'))}</div>
        <div class="f-actions" id="fAsciiActions">
          <button type="button" class="formulas-reveal-btn" id="fAsciiGenBtn" style="flex:1;min-width:140px;">${icon('download', 16)} ${esc(t('f.ascii.generate'))}</button>
        </div>
        <div id="fAsciiResult" style="margin-top:12px;"></div>
      `;
return card;
}

function attachAsciiEvents(){
const genBtn=container.querySelector('#fAsciiGenBtn');
if(genBtn){
genBtn.addEventListener('click',()=>{
state.asciiRows=buildAsciiRows();
state.asciiFilter='';
renderAsciiTable();
});
}
}

function renderAsciiTable(){
const result=container.querySelector('#fAsciiResult');
if(!result)return;

if(!state.asciiRows){
result.innerHTML=`<div class="f-empty">${esc(t('f.ascii.empty'))}</div>`;
return;
}

const filter=(state.asciiFilter||'').trim().toLowerCase();
const rows=state.asciiRows.filter(r=>{
if(!filter)return true;
return r.dec.indexOf(filter)!==-1||
r.hex.toLowerCase().indexOf(filter)!==-1||
r.oct.indexOf(filter)!==-1||
r.bin.indexOf(filter)!==-1||
r.name.toLowerCase().indexOf(filter)!==-1||
(r.char&&r.char.toLowerCase().indexOf(filter)!==-1);
});

const countLabel=t('f.ascii.shown',rows.length);

let html='';
html+=`<div class="f-actions" style="margin-top:0;">
      <input type="text" class="f-var-input" id="fAsciiFilter" placeholder="${esc(t('f.ascii.filter'))}" value="${esc(state.asciiFilter || '')}" style="flex:1;min-width:120px;padding:9px 12px;font-size:13px;">
      <button type="button" class="f-btn" id="fAsciiCsvBtn" style="padding:9px 16px;">${icon('download', 14)} CSV</button>
      <button type="button" class="f-btn" id="fAsciiRegenBtn" style="padding:9px 16px;">${esc(t('f.ascii.regenerate'))}</button>
    </div>`;
html+=`<div class="f-hint" style="margin-top:6px;margin-bottom:8px;font-family:ui-monospace,monospace;">${esc(countLabel)}</div>`;
html+=`<div style="max-height:420px;overflow-y:auto;border-radius:var(--r-md);border:1px solid var(--outline-v);">`;
html+=`<table class="f-table" style="margin-bottom:0;">
      <thead style="position:sticky;top:0;z-index:1;">
        <tr>
          <th>${esc(t('f.col.dec'))}</th>
          <th>${esc(t('f.col.hex'))}</th>
          <th>${esc(t('f.col.oct'))}</th>
          <th>${esc(t('f.col.bin'))}</th>
          <th>${esc(t('f.col.char'))}</th>
        </tr>
      </thead><tbody>`;
if(!rows.length){
html+=`<tr><td colspan="5" style="text-align:center;color:var(--on-variant);font-style:italic;padding:20px;">${esc(t('f.ascii.empty'))}</td></tr>`;
}else{
rows.forEach(r=>{
html+=`<tr>
          <td>${esc(r.dec)}</td>
          <td>${esc(r.hex)}</td>
          <td>${esc(r.oct)}</td>
          <td>${esc(r.bin)}</td>
          <td class="res" style="font-family:ui-monospace,monospace;">${esc(r.char || r.name)}</td>
        </tr>`;
});
}
html+=`</tbody></table></div>`;

result.innerHTML=html;

const filterInput=result.querySelector('#fAsciiFilter');
if(filterInput){
filterInput.addEventListener('input',(e)=>{
state.asciiFilter=e.target.value;
renderAsciiTable();
const again=container.querySelector('#fAsciiFilter');
if(again){
again.focus();
const val=again.value;
again.setSelectionRange(val.length,val.length);
}
});
}
const csvBtn=result.querySelector('#fAsciiCsvBtn');
if(csvBtn){
csvBtn.addEventListener('click',()=>{
const list=state.asciiRows||[];
if(!list.length){showToast(t('f.csvEmpty'),true);return;}
downloadCSV(
'nibbly-formulas-ascii.csv',
[t('f.col.dec'),t('f.col.hex'),t('f.col.oct'),t('f.col.bin'),t('f.col.char')],
list.map(r=>[r.dec,r.hex,r.oct,r.bin,(r.char||r.name)])
);
});
}
const regenBtn=result.querySelector('#fAsciiRegenBtn');
if(regenBtn){
regenBtn.addEventListener('click',()=>{
state.asciiRows=buildAsciiRows();
state.asciiFilter='';
renderAsciiTable();
});
}
}


function buildResidueEditor(){
const wrap=document.createElement('div');
wrap.innerHTML=`
      <div class="f-residue-intro">
        <div class="f-residue-intro-title">${esc(t('r.aboutTitle'))}</div>
        <div class="f-residue-intro-desc">${esc(t('r.aboutDesc'))}</div>
        <div class="f-residue-intro-formula">${esc(t('r.aboutFormula'))}</div>
        <div class="f-residue-intro-desc" style="margin-top:6px;">${esc(t('r.aboutExact'))}</div>
      </div>
      <div class="f-field">
        <label class="f-lbl">${esc(t('r.dividendLbl'))}</label>
        <input class="f-var-input" id="fResDividend" type="text" inputmode="numeric" style="width:100%;" value="${esc(state.residueDividend)}" placeholder="${esc(t('r.dividendPh'))}" autocomplete="off" spellcheck="false">
      </div>
      <div class="f-field">
        <label class="f-lbl">${esc(t('r.divisorLbl'))}</label>
        <input class="f-var-input" id="fResDivisor" type="text" inputmode="numeric" style="width:100%;" value="${esc(state.residueDivisor)}" placeholder="${esc(t('r.divisorPh'))}" autocomplete="off" spellcheck="false">
      </div>
      <div class="f-actions">
        <button type="button" class="f-btn formulas-clear-btn" id="fResClearBtn">${esc(t('f.clear'))}</button>
        <button type="button" class="formulas-reveal-btn" id="fResRevealBtn">${esc(t('f.reveal'))}</button>
      </div>
      <div class="f-loading" id="fResLoading"></div>
      <div class="f-reveal" id="fResRevealArea"></div>
      <div class="f-hint">${esc(t('f.hint.residue'))}</div>
      <div class="f-error" id="fResError"></div>
    `;
return wrap;
}

function attachResidueEvents(){
const dInp=container.querySelector('#fResDividend');
const vInp=container.querySelector('#fResDivisor');
if(dInp){
dInp.addEventListener('input',()=>{state.residueDividend=dInp.value;});
dInp.addEventListener('keydown',(e)=>{if(e.key==='Enter')revealResidue();});
}
if(vInp){
vInp.addEventListener('input',()=>{state.residueDivisor=vInp.value;});
vInp.addEventListener('keydown',(e)=>{if(e.key==='Enter')revealResidue();});
}
const clr=container.querySelector('#fResClearBtn');
if(clr)clr.addEventListener('click',()=>{
state.residueDividend='';
state.residueDivisor='';
renderAll();
});
const rev=container.querySelector('#fResRevealBtn');
if(rev)rev.addEventListener('click',()=>revealResidue());
}

async function revealResidue(){
const token=++state.residueToken;
const errBox=container.querySelector('#fResError');
const area=container.querySelector('#fResRevealArea');
if(errBox){errBox.classList.remove('show');errBox.textContent='';}
if(area){area.classList.remove('show');area.innerHTML='';}

const dividendRaw=(state.residueDividend||'').trim();
const divisorRaw=(state.residueDivisor||'').trim();

if(!dividendRaw||!divisorRaw){
if(errBox){errBox.textContent=t('r.needInputs');errBox.classList.add('show');}
return;
}

let data;
try{
data=computeResidueSteps(dividendRaw,divisorRaw);
}catch(e){
if(errBox){errBox.textContent=e.message||'Error';errBox.classList.add('show');}
return;
}

const btn=container.querySelector('#fResRevealBtn');
if(btn)btn.disabled=true;
await showLoadingSequenceGeneric('fResLoading');
if(btn)btn.disabled=false;
if(token!==state.residueToken)return;
if(!area)return;

area.innerHTML=buildResidueHtml(data);
area.classList.add('show');

area.querySelectorAll('.f-copy').forEach(b=>{
b.addEventListener('click',async()=>{
const ok=await copyText(b.dataset.copyResult||'');
showToast(ok?t('f.copied'):t('f.copyFail'),!ok);
});
});
const copyAll=area.querySelector('#fResCopyAll');
if(copyAll){
copyAll.addEventListener('click',async()=>{
const ok=await copyText(area.querySelector('.f-residue-plain').textContent);
showToast(ok?t('f.copied'):t('f.copyFail'),!ok);
});
}
const csvBtn=area.querySelector('#fResCsvBtn');
if(csvBtn){
csvBtn.addEventListener('click',()=>{
downloadCSV(
'nibbly-residuo-'+safeFilePart(data.dividend)+'-'+safeFilePart(data.divisor)+'.csv',
[t('r.stepN','#'),t('f.col.division'),t('f.col.quotient'),t('f.col.residue')],
data.steps.map(s=>[s.index,s.current+' ÷ '+data.divisor,s.quotientDigit,s.residue])
);
});
}
}

async function showLoadingSequenceGeneric(id){
const box=container.querySelector('#'+id);
if(!box)return;
box.classList.add('show');
box.textContent=t('f.reveal1');
await sleep(850);
box.textContent=t('f.reveal2');
await sleep(600);
box.textContent=t('f.reveal3');
await sleep(500);
box.classList.remove('show');
box.textContent='';
}

function buildResidueHtml(data){
const checkOk=parseInt(data.check.lhs,10)===data.check.sum;
const residueNum=parseInt(data.residue,10);
const divisorNum=parseInt(data.divisor,10);
const residueValid=residueNum<divisorNum&&residueNum>=0;

const plainLines=[];
plainLines.push(t('r.aboutTitle'));
plainLines.push(t('r.aboutFormula'));
plainLines.push('');
plainLines.push(data.dividend+' ÷ '+data.divisor);
plainLines.push(t('r.quotientLbl')+': '+data.quotient);
plainLines.push(t('r.residueLbl')+': '+data.residue);
plainLines.push('');
data.steps.forEach(s=>{
plainLines.push(t('r.stepN',s.index)+': '+s.current+' ÷ '+data.divisor+' = '+s.quotientDigit+'  (residuo '+s.residue+')');
});
plainLines.push('');
plainLines.push(t('r.verification')+': '+t('r.checkFormula',data.check.lhs,data.divisor,data.quotient,String(data.check.rhsRes)));

let html='';

html+=`<div class="f-step">
      <div class="f-step-title">${esc(t('r.aboutTitle'))}</div>
      <div class="f-residue-rule">${esc(t('r.residueRule'))}</div>
      <div class="f-hint" style="margin-top:8px;">
        ${esc(t('r.residueRuleOk',data.residue,data.divisor))}
      </div>
    </div>`;

html+=`<div class="f-step">
      <div class="f-step-title">${esc(t('r.resultTitle'))}</div>
      <div class="f-residue-result-grid">
        <div class="f-residue-result-box">
          <div class="f-residue-result-lbl">${esc(t('r.quotientLbl'))}</div>
          <div class="f-residue-result-val">${esc(data.quotient)}</div>
        </div>
        <div class="f-residue-result-box big ${residueValid ? 'ok' : 'err'}">
          <div class="f-residue-result-lbl">${esc(t('r.residueLbl'))}</div>
          <div class="f-residue-result-val">${esc(data.residue)}</div>
        </div>
      </div>
      <div class="f-residue-note">${esc(residueNum===0 ? t('r.zeroResidue') : t('r.nonZeroResidue',data.residue))}</div>
    </div>`;

html+=`<div class="f-step">
      <div class="f-step-title">${esc(t('r.stepsTitle'))}</div>
      <div class="f-actions" style="margin-top:0;margin-bottom:8px;">
        <button type="button" class="f-copy" id="fResCsvBtn">${icon('download',14)} CSV</button>
      </div>
      <table class="f-table f-residue-table"><thead><tr>
        <th>#</th>
        <th>${esc(t('r.currentNumber',''))}</th>
        <th>${esc(t('f.col.quotient'))}</th>
        <th>${esc(t('f.col.residue'))}</th>
      </tr></thead><tbody>`;
data.steps.forEach(s=>{
html+=`<tr>
        <td>${esc(String(s.index))}</td>
        <td>${esc(s.current)}</td>
        <td class="res">${esc(s.quotientDigit)}</td>
        <td class="res">${esc(s.residue)}</td>
      </tr>`;
});
html+=`</tbody></table></div>`;

html+=`<div class="f-step">
      <div class="f-step-title">${esc(t('r.verification'))}</div>
      <div class="f-residue-check ${checkOk ? 'ok' : 'err'}">
        <div class="f-residue-check-formula">${esc(t('r.checkFormula',data.check.lhs,data.divisor,data.quotient,String(data.check.rhsRes)))}</div>
        <div class="f-residue-check-num">${esc(data.check.lhs)} = ${esc(String(data.check.sum))}</div>
        <div class="f-residue-check-msg">${esc(checkOk ? t('r.checkOk') : t('r.checkFail'))}</div>
      </div>
      ${residueValid ? '' : `<div class="f-error show">${esc(t('r.residueRuleFail',data.residue,data.divisor))}</div>`}
    </div>`;

html+=`<div class="f-step">
      <div class="f-step-title">${esc(t('f.step.residueMethod'))}</div>
      <div class="f-residue-method">
        <div class="f-residue-method-row">
          <span class="f-residue-method-lbl">${esc(t('r.quotientLbl'))}</span>
          <span class="f-residue-method-val">${esc(data.quotient)}</span>
        </div>
        <div class="f-residue-method-row">
          <span class="f-residue-method-lbl">× ${esc(data.divisor)}</span>
          <span class="f-residue-method-val">${esc(String(parseInt(data.quotient,10)*divisorNum))}</span>
        </div>
        <div class="f-residue-method-row">
          <span class="f-residue-method-lbl">${esc(data.dividend)} − ${esc(String(parseInt(data.quotient,10)*divisorNum))}</span>
          <span class="f-residue-method-val ok">= ${esc(data.residue)}</span>
        </div>
      </div>
      <div class="f-residue-plain" style="display:none;">${esc(plainLines.join('\n'))}</div>
    </div>`;

html+=`<div class="f-actions">
      <button type="button" class="f-btn" id="fResCopyAll">${esc(t('r.copyAll'))}</button>
    </div>`;

return html;
}


function buildBooleEditor(){
const wrap=document.createElement('div');
wrap.innerHTML=`
      <div class="f-field">
        <label class="f-lbl">${esc(t('b.exprLbl'))}</label>
        <textarea class="f-textarea" id="fBoolInput" spellcheck="false" autocomplete="off" placeholder="${esc(t('b.exprPh'))}">${esc(state.boolExpr)}</textarea>
      </div>
      <div class="f-hint">${esc(t('b.hint'))}</div>
      <div class="f-actions">
        <button type="button" class="f-btn formulas-clear-btn" id="fBoolClearBtn">${esc(t('f.clear'))}</button>
        <button type="button" class="formulas-reveal-btn" id="fBoolRevealBtn">${esc(t('f.reveal'))}</button>
      </div>
      <div class="f-loading" id="fBoolLoading"></div>
      <div class="f-reveal" id="fBoolRevealArea"></div>
      <div class="f-error" id="fBoolError"></div>
    `;
return wrap;
}

function attachBooleEvents(){
const ta=container.querySelector('#fBoolInput');
if(ta){
ta.addEventListener('input',()=>{state.boolExpr=ta.value;});
ta.addEventListener('keydown',(e)=>{
if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();revealBoole();}
});
}
const clr=container.querySelector('#fBoolClearBtn');
if(clr)clr.addEventListener('click',()=>{
state.boolExpr='';
state.boolAst=null;
state.boolVars=[];
state.boolError='';
renderAll();
});
const rev=container.querySelector('#fBoolRevealBtn');
if(rev)rev.addEventListener('click',()=>revealBoole());
}

async function revealBoole(){
const token=++state.revealToken;
const errBox=container.querySelector('#fBoolError');
const area=container.querySelector('#fBoolRevealArea');
if(errBox){errBox.classList.remove('show');errBox.textContent='';}
if(area){area.classList.remove('show');area.innerHTML='';}

const expr=(state.boolExpr||'').trim();
if(!expr){
if(errBox){errBox.textContent=t('b.errorEmpty');errBox.classList.add('show');}
return;
}

let ast,vars;
try{
const tokens=tokenizeBool(expr);
if(!tokens.length)throw new Error(t('b.errorSyntax'));
ast=parseBoolTokens(tokens);
vars=collectVars(ast);
if(vars.length>4)throw new Error(t('b.errorVars'));
}catch(e){
if(errBox){errBox.textContent=e.message||t('b.errorSyntax');errBox.classList.add('show');}
return;
}

const btn=container.querySelector('#fBoolRevealBtn');
if(btn)btn.disabled=true;
await showLoadingSequenceGeneric('fBoolLoading');
if(btn)btn.disabled=false;
if(token!==state.revealToken)return;
if(!area)return;

state.boolAst=ast;
state.boolVars=vars;

area.innerHTML=buildBooleHtml(ast,vars,expr);
area.classList.add('show');

area.querySelectorAll('.f-copy').forEach(b=>{
b.addEventListener('click',async()=>{
const ok=await copyText(b.dataset.copyResult||'');
showToast(ok?t('f.copied'):t('f.copyFail'),!ok);
});
});
const csvBtn=area.querySelector('#fBoolCsvBtn');
if(csvBtn){
csvBtn.addEventListener('click',()=>{
const table=buildTruthTable(ast,vars);
const header=[...vars,t('b.resultF','F')];
const rows=table.map(r=>[...vars.map(v=>r.values[v]?'1':'0'),r.result?'1':'0']);
downloadCSV('nibbly-boole-tabla.csv',header,rows);
});
}
const copyTruth=area.querySelector('#fBoolCopyTruth');
if(copyTruth){
copyTruth.addEventListener('click',async()=>{
const table=buildTruthTable(ast,vars);
const lines=[];
lines.push([...vars,'F'].join('\t'));
table.forEach(r=>{
lines.push([...vars.map(v=>r.values[v]?'1':'0'),r.result?'1':'0'].join('\t'));
});
const ok=await copyText(lines.join('\n'));
showToast(ok?t('f.copied'):t('f.copyFail'),!ok);
});
}
}

function buildBooleHtml(ast,vars,originalExpr){
const table=buildTruthTable(ast,vars);
const minterms=mintermsFromTable(table,vars);
const maxterms=maxtermsFromTable(table,vars);
const sop=buildSOP(minterms,vars);
const pos=buildPOS(maxterms,vars);
const simplified=simplifyMinterms(minterms,vars);

let html='';


html+=`<div class="f-step">
      <div class="f-step-title">${esc(t('f.step.formula'))}</div>
      <div class="f-preview-sub" style="font-size:14px;font-family:ui-monospace,monospace;">${esc(originalExpr)}</div>
    </div>`;


html+=`<div class="f-step">
      <div class="f-step-title">${esc(t('b.varsLbl'))}</div>
      <div class="f-bool-vars">`;
if(!vars.length){
html+=`<span class="f-bool-var-chip">— ${esc(t('b.noVars'))} —</span>`;
}else{
vars.forEach(v=>{
html+=`<span class="f-bool-var-chip">${esc(v)}</span>`;
});
}
html+=`</div></div>`;


html+=`<div class="f-step">
      <div class="f-step-title">${esc(t('b.truthTable'))}</div>
      <div class="f-actions" style="margin-top:0;margin-bottom:8px;">
        <button type="button" class="f-copy" id="fBoolCsvBtn">${icon('download',14)} ${esc(t('b.downloadCSV'))}</button>
        <button type="button" class="f-copy" id="fBoolCopyTruth">${esc(t('b.copyTruth'))}</button>
      </div>
      <table class="f-table f-bool-table"><thead><tr>`;
vars.forEach(v=>html+=`<th>${esc(v)}</th>`);
html+=`<th>F</th></tr></thead><tbody>`;
table.forEach(r=>{
const rowClass=r.result?'bool-row-true':'bool-row-false';
html+=`<tr class="${rowClass}">`;
vars.forEach(v=>html+=`<td>${r.values[v]?'1':'0'}</td>`);
html+=`<td class="res">${r.result?'1':'0'}</td></tr>`;
});
html+=`</tbody></table></div>`;


html+=`<div class="f-step">
      <div class="f-step-title">${esc(t('b.minterms'))}</div>
      <div class="f-bool-terms">${minterms.length?minterms.map(m=>`<span class="f-bool-term">m${m}</span>`).join(''):'<span class="f-bool-term empty">—</span>'}</div>
    </div>`;
html+=`<div class="f-step">
      <div class="f-step-title">${esc(t('b.maxterms'))}</div>
      <div class="f-bool-terms">${maxterms.length?maxterms.map(m=>`<span class="f-bool-term">M${m}</span>`).join(''):'<span class="f-bool-term empty">—</span>'}</div>
    </div>`;


html+=`<div class="f-step">
      <div class="f-step-title">${esc(t('b.sop'))}</div>
      <div class="f-bool-expr">${esc(sop)}</div>
      <button type="button" class="f-copy" data-copy-result="${esc(sop)}">${esc(t('f.copy'))}</button>
    </div>`;


html+=`<div class="f-step">
      <div class="f-step-title">${esc(t('b.pos'))}</div>
      <div class="f-bool-expr">${esc(pos)}</div>
      <button type="button" class="f-copy" data-copy-result="${esc(pos)}">${esc(t('f.copy'))}</button>
    </div>`;


html+=`<div class="f-step">
      <div class="f-step-title">${esc(t('b.simplified'))}</div>
      <div class="f-bool-expr simplified">${esc(simplified)}</div>
      <button type="button" class="f-copy" data-copy-result="${esc(simplified)}">${esc(t('f.copy'))}</button>
    </div>`;

return html;
}


function buildBoolDiagramEditor(){
const wrap=document.createElement('div');
wrap.innerHTML=`
      <div class="f-field">
        <label class="f-lbl">${esc(t('d.exprLbl'))}</label>
        <textarea class="f-textarea" id="fDiagInput" spellcheck="false" autocomplete="off" placeholder="${esc(t('d.exprPh'))}">${esc(state.diagExpr)}</textarea>
      </div>
      <div class="f-hint">${esc(t('d.hint'))}</div>
      <div class="f-actions">
        <button type="button" class="f-btn formulas-clear-btn" id="fDiagClearBtn">${esc(t('f.clear'))}</button>
        <button type="button" class="formulas-reveal-btn" id="fDiagRevealBtn">${esc(t('d.generate'))}</button>
      </div>
      <div class="f-loading" id="fDiagLoading"></div>
      <div class="f-reveal" id="fDiagRevealArea"></div>
      <div class="f-error" id="fDiagError"></div>
    `;
return wrap;
}

function attachBoolDiagramEvents(){
const ta=container.querySelector('#fDiagInput');
if(ta){
ta.addEventListener('input',()=>{state.diagExpr=ta.value;});
ta.addEventListener('keydown',(e)=>{
if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();revealDiagram();}
});
}
const clr=container.querySelector('#fDiagClearBtn');
if(clr)clr.addEventListener('click',()=>{
state.diagExpr='';
state.diagSVG=null;
state.diagMeta=null;
state.diagError='';
renderAll();
});
const rev=container.querySelector('#fDiagRevealBtn');
if(rev)rev.addEventListener('click',()=>revealDiagram());
}

async function revealDiagram(){
const token=++state.revealToken;
const errBox=container.querySelector('#fDiagError');
const area=container.querySelector('#fDiagRevealArea');
if(errBox){errBox.classList.remove('show');errBox.textContent='';}
if(area){area.classList.remove('show');area.innerHTML='';}

const expr=(state.diagExpr||'').trim();
if(!expr){
if(errBox){errBox.textContent=t('d.errorEmpty');errBox.classList.add('show');}
return;
}

let ast,vars,diagram;
try{
const tokens=tokenizeBool(expr);
if(!tokens.length)throw new Error(t('d.errorExpr'));
ast=parseBoolTokens(tokens);
vars=collectVars(ast);
if(vars.length>4)throw new Error(t('d.errorVars'));
const depth=measureAstDepth(ast);
if(depth>12)throw new Error(t('d.errorTooDeep'));
diagram=buildDiagramSVG(ast,vars);
}catch(e){
if(errBox){errBox.textContent=e.message||t('d.errorExpr');errBox.classList.add('show');}
return;
}

const btn=container.querySelector('#fDiagRevealBtn');
if(btn)btn.disabled=true;
await showLoadingSequenceGeneric('fDiagLoading');
if(btn)btn.disabled=false;
if(token!==state.revealToken)return;
if(!area)return;

state.diagSVG=diagram;
state.diagMeta={ast,vars,expr};

const table=buildTruthTable(ast,vars);

let html='';
html+=`<div class="f-step">
      <div class="f-step-title">${esc(t('d.svgTitle'))}</div>
      <div class="f-diagram-stats">
        <div class="f-diagram-stat"><span class="f-diagram-stat-lbl">${esc(t('d.gates'))}</span><span class="f-diagram-stat-val">${diagram.gateCount}</span></div>
        <div class="f-diagram-stat"><span class="f-diagram-stat-lbl">${esc(t('d.depth'))}</span><span class="f-diagram-stat-val">${diagram.depth}</span></div>
        <div class="f-diagram-stat"><span class="f-diagram-stat-lbl">${esc(t('d.inputs'))}</span><span class="f-diagram-stat-val">${diagram.inputs}</span></div>
        <div class="f-diagram-stat"><span class="f-diagram-stat-lbl">${esc(t('d.nodeCount'))}</span><span class="f-diagram-stat-val">${diagram.nodeCount}</span></div>
      </div>
      <div class="f-diagram-wrap">${diagram.svg}</div>
      <div class="f-actions" style="margin-top:12px;">
        <button type="button" class="f-btn" id="fDiagDownloadSvg">${icon('download',14)} ${esc(t('d.download'))}</button>
        <button type="button" class="f-btn" id="fDiagDownloadPng">${icon('download',14)} ${esc(t('d.downloadPNG'))}</button>
      </div>
    </div>`;


html+=`<div class="f-step">
      <div class="f-step-title">${esc(t('d.legend'))}</div>
      <div class="f-diagram-legend">
        ${['AND','OR','NOT','XOR','NAND','NOR','XNOR'].map(g=>`
          <div class="f-diagram-legend-item">
            <span class="f-diagram-legend-glyph">${svgLegendGlyph(g)}</span>
            <span class="f-diagram-legend-lbl">${esc(t('d.'+g.toLowerCase()+'Gate'))}</span>
          </div>`).join('')}
      </div>
    </div>`;


html+=`<div class="f-step">
      <div class="f-step-title">${esc(t('d.simplifiedLabel'))}</div>
      <div class="f-bool-expr">${esc(expr)}</div>
    </div>`;


html+=`<div class="f-step">
      <div class="f-step-title">${esc(t('d.truthBelow'))}</div>
      <table class="f-table f-bool-table"><thead><tr>`;
vars.forEach(v=>html+=`<th>${esc(v)}</th>`);
html+=`<th>F</th></tr></thead><tbody>`;
table.forEach(r=>{
const rowClass=r.result?'bool-row-true':'bool-row-false';
html+=`<tr class="${rowClass}">`;
vars.forEach(v=>html+=`<td>${r.values[v]?'1':'0'}</td>`);
html+=`<td class="res">${r.result?'1':'0'}</td></tr>`;
});
html+=`</tbody></table></div>`;

area.innerHTML=html;
area.classList.add('show');

const dlSvg=area.querySelector('#fDiagDownloadSvg');
if(dlSvg){
dlSvg.addEventListener('click',()=>{
try{
const blob=new Blob([diagram.svg],{type:'image/svg+xml;charset=utf-8'});
const url=URL.createObjectURL(blob);
const a=document.createElement('a');
a.href=url;
a.download='nibbly-diagrama-'+safeFilePart(expr)+'.svg';
document.body.appendChild(a);
a.click();
setTimeout(()=>{URL.revokeObjectURL(url);a.remove();},60000);
showToast(t('d.downloadDone'));
}catch(e){showToast(t('d.downloadFail'),true);}
});
}
const dlPng=area.querySelector('#fDiagDownloadPng');
if(dlPng){
dlPng.addEventListener('click',()=>{
try{
const svgStr=diagram.svg;
const img=new Image();
const svgBlob=new Blob([svgStr],{type:'image/svg+xml;charset=utf-8'});
const url=URL.createObjectURL(svgBlob);
img.onload=()=>{
const canvas=document.createElement('canvas');
const scale=2;
canvas.width=img.width*scale||diagram.finalWidth*scale;
canvas.height=img.height*scale||diagram.height*scale;
const ctx=canvas.getContext('2d');
ctx.fillStyle='#0b1020';
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.drawImage(img,0,0,canvas.width,canvas.height);
URL.revokeObjectURL(url);
canvas.toBlob(b=>{
const a=document.createElement('a');
a.href=URL.createObjectURL(b);
a.download='nibbly-diagrama-'+safeFilePart(expr)+'.png';
document.body.appendChild(a);
a.click();
setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},60000);
showToast(t('d.downloadDone'));
},'image/png');
};
img.onerror=()=>{URL.revokeObjectURL(url);showToast(t('d.downloadFail'),true);};
img.crossOrigin='anonymous';
img.src=url;
}catch(e){showToast(t('d.downloadFail'),true);}
});
}
}

function svgLegendGlyph(type){
const w=36,h=24,x=2,y=2;
const cy=y+h/2;
switch(type){
case'AND':
case'NAND':
return`<svg viewBox="0 0 50 28" width="50" height="28"><path d="M ${x} ${y} L ${x+w*0.5} ${y} A ${h/2} ${h/2} 0 0 1 ${x+w*0.5} ${y+h} L ${x} ${y+h} Z" fill="none" stroke="currentColor" stroke-width="1.6"/>${type==='NAND'?`<circle cx="${x+w*0.5+h/2+3}" cy="${cy}" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/>`:''}</svg>`;
case'OR':
case'NOR':
return`<svg viewBox="0 0 50 28" width="50" height="28"><path d="M ${x} ${y} Q ${x+w*0.4} ${cy} ${x} ${y+h} Q ${x+w*0.8} ${cy} ${x+w} ${cy} Q ${x+w*0.8} ${cy} ${x} ${y} Z" fill="none" stroke="currentColor" stroke-width="1.6"/>${type==='NOR'?`<circle cx="${x+w+3}" cy="${cy}" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/>`:''}</svg>`;
case'XOR':
case'XNOR':
return`<svg viewBox="0 0 50 28" width="50" height="28"><path d="M ${x-4} ${y} Q ${x+w*0.3} ${cy} ${x-4} ${y+h}" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M ${x} ${y} Q ${x+w*0.4} ${cy} ${x} ${y+h} Q ${x+w*0.8} ${cy} ${x+w} ${cy} Q ${x+w*0.8} ${cy} ${x} ${y} Z" fill="none" stroke="currentColor" stroke-width="1.6"/>${type==='XNOR'?`<circle cx="${x+w+3}" cy="${cy}" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/>`:''}</svg>`;
case'NOT':
return`<svg viewBox="0 0 50 28" width="50" height="28"><path d="M ${x} ${y} L ${x} ${y+h} L ${x+w*0.6} ${cy} Z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="${x+w*0.6+3}" cy="${cy}" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`;
}
return'';
}

function updateFormulaPreview(){
if(state.mode!=='formula')return;
const prev=container.querySelector('#fPreview');
const errBox=container.querySelector('#fError');
if(!prev)return;
if(errBox){errBox.classList.remove('show');errBox.textContent='';}
if(!state.formula.trim()){
prev.className='f-preview';
prev.innerHTML=`<div class="f-preview-label">${esc(t('f.preview'))}</div><div class="f-preview-sub">${esc(t('f.previewEmpty'))}</div>`;
return;
}
try{
const r=evaluateFormula(state.formula,state.vars);
if(!r){
prev.className='f-preview';
prev.innerHTML=`<div class="f-preview-label">${esc(t('f.preview'))}</div><div class="f-preview-sub">${esc(t('f.previewEmpty'))}</div>`;
return;
}
prev.className='f-preview ok';
prev.innerHTML=`
        <div class="f-preview-sub">${esc(r.subst)}</div>
        <div class="f-preview-res ok">= ${esc(String(r.result))}</div>
      `;
}catch(e){
prev.className='f-preview err';
prev.innerHTML=`<div class="f-preview-res err">${esc(e.message || 'Error')}</div>`;
if(errBox){
errBox.textContent=e.message||'Error';
errBox.classList.add('show');
}
}
}

function attachFormulaEvents(){
const ta=container.querySelector('#fFormulaInput');
if(ta){
ta.addEventListener('input',()=>{
state.formula=ta.value;
const area=container.querySelector('#fVarsArea');
if(area){
area.innerHTML='';
area.appendChild(buildVarsInputs());
attachVarInputs();
}
updateFormulaPreview();
});
}
attachVarInputs();
const clr=container.querySelector('#fClearBtn');
if(clr)clr.addEventListener('click',()=>{
state.formula='';
state.vars={};
renderAll();
});
const rev=container.querySelector('#fRevealBtn');
if(rev)rev.addEventListener('click',()=>revealFormula());
}

function attachVarInputs(){
container.querySelectorAll('.f-var-input[data-var]').forEach(inp=>{
inp.addEventListener('input',()=>{
state.vars[inp.dataset.var]=inp.value;
updateFormulaPreview();
});
});
}

function attachConversionEvents(){
const input=container.querySelector('#fConvInput');
if(input){
input.addEventListener('input',()=>{state.convValue=input.value;});
input.addEventListener('keydown',(e)=>{
if(e.key==='Enter')revealConversion();
});
}
container.querySelectorAll('#fConvChips .f-chip').forEach(chip=>{
chip.addEventListener('click',()=>{
state.conversion=chip.dataset.conv;
container.querySelectorAll('#fConvChips .f-chip').forEach(c=>
c.classList.toggle('active',c===chip)
);
if(input){
input.placeholder=t('f.convPh.'+state.conversion);
input.inputMode=inputModeFor(state.conversion);
}
const area=container.querySelector('#fRevealArea');
if(area){area.classList.remove('show');area.innerHTML='';}
});
});
const clr=container.querySelector('#fClearBtn');
if(clr)clr.addEventListener('click',()=>{state.convValue='';renderAll();});
const rev=container.querySelector('#fRevealBtn');
if(rev)rev.addEventListener('click',()=>revealConversion());
attachAsciiEvents();
if(state.asciiRows)renderAsciiTable();
}

async function showLoadingSequence(){
const box=container.querySelector('#fLoading');
if(!box)return;
box.classList.add('show');
box.textContent=t('f.reveal1');
await sleep(850);
box.textContent=t('f.reveal2');
await sleep(600);
box.textContent=t('f.reveal3');
await sleep(500);
box.classList.remove('show');
box.textContent='';
}

async function revealFormula(){
const token=++state.revealToken;
const errBox=container.querySelector('#fError');
const area=container.querySelector('#fRevealArea');
if(errBox){errBox.classList.remove('show');errBox.textContent='';}
if(area){area.classList.remove('show');area.innerHTML='';}
let evaluated;
try{
evaluated=evaluateFormula(state.formula,state.vars);
if(!evaluated){
if(errBox){errBox.textContent=t('f.previewEmpty');errBox.classList.add('show');}
return;
}
}catch(e){
if(errBox){errBox.textContent=e.message||'Error';errBox.classList.add('show');}
return;
}
const btn=container.querySelector('#fRevealBtn');
if(btn)btn.disabled=true;
await showLoadingSequence();
if(btn)btn.disabled=false;
if(token!==state.revealToken)return;
if(!area)return;
area.innerHTML=`
      <div class="f-step">
        <div class="f-step-title">${esc(t('f.step.formula'))}</div>
        <div class="f-preview-sub" style="font-size:14px;">${esc(state.formula)}</div>
      </div>
      <div class="f-step">
        <div class="f-step-title">${esc(t('f.step.subst'))}</div>
        <div class="f-preview-sub" style="font-size:14px;">${esc(evaluated.subst)}</div>
      </div>
      <div class="f-step">
        <div class="f-step-title">${esc(t('f.step.result'))}</div>
        <div class="f-result">
          <div class="f-result-label">${esc(t('f.step.result'))}</div>
          <div class="f-result-value">${esc(String(evaluated.result))}</div>
          <button type="button" class="f-copy" data-copy-result="${esc(String(evaluated.result))}">${esc(t('f.copy'))}</button>
        </div>
      </div>
    `;
area.classList.add('show');
area.querySelectorAll('.f-copy').forEach(btn=>{
btn.addEventListener('click',async()=>{
const ok=await copyText(btn.dataset.copyResult||'');
showToast(ok?t('f.copied'):t('f.copyFail'),!ok);
});
});
}

async function revealConversion(){
const token=++state.revealToken;
const errBox=container.querySelector('#fError');
const area=container.querySelector('#fRevealArea');
if(errBox){errBox.classList.remove('show');errBox.textContent='';}
if(area){area.classList.remove('show');area.innerHTML='';}
const conv=getConv(state.conversion);
const raw=(state.convValue||'').trim();
if(!raw){
if(errBox){errBox.textContent=t('f.errorInput');errBox.classList.add('show');}
return;
}
let result;
try{
if(conv.needs==='bin'){
if(!/^[01]+$/.test(raw))throw new Error(t('f.errorBits'));
result=conv.fn(raw);
}else if(conv.needs==='hex'){
const cleanHex=raw.replace(/^0x/i,'').replace(/\s+/g,'');
if(!/^[0-9A-Fa-f]+$/.test(cleanHex))throw new Error(t('f.errorHex'));
result=conv.fn(raw);
}else if(conv.needs==='oct'){
const cleanOct=raw.replace(/^0o/i,'').replace(/\s+/g,'');
if(!/^[0-7]+$/.test(cleanOct))throw new Error(t('f.errorOct'));
result=conv.fn(raw);
}else{
const n=parseNum(raw);
if(!isFinite(n)||n<0)throw new Error(t('f.errorInput'));
if(conv.needs==='int'&&Math.floor(n)!==n){
throw new Error(t('f.errorInput')+' (entero)');
}
result=conv.fn(n);
}
}catch(e){
if(errBox){errBox.textContent=e.message||'Error';errBox.classList.add('show');}
return;
}
const btn=container.querySelector('#fRevealBtn');
if(btn)btn.disabled=true;
await showLoadingSequence();
if(btn)btn.disabled=false;
if(token!==state.revealToken)return;
if(!area)return;
state.lastRaw=raw;
state.lastResult=result;
state.lastConv=conv;
area.innerHTML=buildConversionHtml(conv,raw,result);
area.classList.add('show');
area.querySelectorAll('.f-copy').forEach(b=>{
b.addEventListener('click',async()=>{
const ok=await copyText(b.dataset.copyResult||'');
showToast(ok?t('f.copied'):t('f.copyFail'),!ok);
});
});
area.querySelectorAll('[data-csv]').forEach(b=>{
b.addEventListener('click',()=>exportTableCSV(b.dataset.csv,conv,raw,result));
});
}

function exportTableCSV(kind,conv,raw,result){
const base='nibbly-formulas-'+safeFilePart(conv.id)+'-'+safeFilePart(raw);
if(kind==='div'&&result.steps){
downloadCSV(base+'-division.csv',
[t('f.col.division'),t('f.col.quotient'),t('f.col.residue')],
result.steps.map(s=>[s.div,s.q,s.r]));
return;
}
if(kind==='frac'&&result.fracSteps){
downloadCSV(base+'-multiplicacion.csv',
[t('f.col.mult'),t('f.col.result'),t('f.col.digit')],
result.fracSteps.map(s=>[s.mult,s.result,s.digit]));
return;
}
if(kind==='groups'&&result.steps){
downloadCSV(base+'-grupos.csv',
[t('f.col.bits'),t('f.col.value')],
result.steps.map(s=>[s.bits,s.value]));
return;
}
if(kind==='digits'&&result.steps){
downloadCSV(base+'-digitos.csv',
[t('f.col.digit'),t('f.col.bits')],
result.steps.map(s=>[s.digit,s.bits]));
return;
}
if(kind==='hex'&&result.steps){
downloadCSV(base+'-base-a-decimal.csv',
[t('f.col.digit'),t('f.col.value'),t('f.col.position'),t('f.col.weight'),t('f.col.product')],
result.steps.map(s=>[s.digit,s.value,s.power,s.weight,s.product]));
return;
}
downloadCSV(base+'-resultado.csv',['input','output'],[[raw,result.result]]);
}

function buildConversionHtml(conv,raw,result){
let html='';

if(conv.id==='dec2bin'||conv.id==='dec2hex'||conv.id==='dec2oct'){
html+=`<div class="f-step"><div class="f-step-title">${esc(t('f.step.int'))}</div>
        <button type="button" class="f-copy" data-csv="div" style="margin-bottom:8px;">${icon('download', 14)} CSV</button>
        <table class="f-table"><thead><tr>
          <th>${esc(t('f.col.division'))}</th>
          <th>${esc(t('f.col.quotient'))}</th>
          <th>${esc(t('f.col.residue'))}</th>
        </tr></thead><tbody>`;
result.steps.forEach(s=>{
html+=`<tr><td>${esc(s.div)}</td><td>${esc(s.q)}</td><td class="res">${esc(s.r)}</td></tr>`;
});
html+=`</tbody></table></div>`;
}

if(conv.id==='dec2hexFrac'){
html+=`<div class="f-step"><div class="f-step-title">${esc(t('f.step.int'))}</div>
        <button type="button" class="f-copy" data-csv="div" style="margin-bottom:8px;">${icon('download', 14)} CSV</button>
        <table class="f-table"><thead><tr>
          <th>${esc(t('f.col.division'))}</th>
          <th>${esc(t('f.col.quotient'))}</th>
          <th>${esc(t('f.col.residue'))}</th>
        </tr></thead><tbody>`;
result.intSteps.forEach(s=>{
html+=`<tr><td>${esc(s.div)}</td><td>${esc(s.q)}</td><td class="res">${esc(s.r)}</td></tr>`;
});
html+=`</tbody></table></div>`;
if(result.fracSteps.length){
html+=`<div class="f-step"><div class="f-step-title">${esc(t('f.step.frac'))}</div>
          <button type="button" class="f-copy" data-csv="frac" style="margin-bottom:8px;">${icon('download', 14)} CSV</button>
          <table class="f-table"><thead><tr>
            <th>${esc(t('f.col.mult'))}</th>
            <th>${esc(t('f.col.result'))}</th>
            <th>${esc(t('f.col.digit'))}</th>
          </tr></thead><tbody>`;
result.fracSteps.forEach(s=>{
html+=`<tr><td>${esc(s.mult)}</td><td>${esc(s.result)}</td><td class="res">${esc(s.digit)}</td></tr>`;
});
html+=`</tbody></table></div>`;
}
}

if(conv.id==='bin2oct'||conv.id==='bin2hex'){
html+=`<div class="f-step"><div class="f-step-title">${esc(t('f.step.groups'))}</div>
        <button type="button" class="f-copy" data-csv="groups" style="margin-bottom:8px;">${icon('download', 14)} CSV</button>
        <div class="f-groups">`;
result.steps.forEach((s,i)=>{
html+=`<div class="f-group-box"><span class="bits">${esc(s.bits)}</span><span class="val">${esc(s.value)}</span></div>`;
if(i<result.steps.length-1)html+=`<span class="f-group-arrow">→</span>`;
});
html+=`</div></div>`;
}

if(conv.id==='bin2dec'){
html+=`<div class="f-step"><div class="f-step-title">${esc(t('f.step.binExpansion'))}</div>
        <div class="f-preview-sub f-pow-line">
          ${result.htmlExpression} = ${esc(result.productsExpression)} = ${esc(result.result)}
        </div>
      </div>`;
html+=`<div class="f-step"><div class="f-step-title">${esc(t('f.step.binDetail'))}</div>
        <button type="button" class="f-copy" data-csv="hex" style="margin-bottom:8px;">${icon('download', 14)} CSV</button>
        <table class="f-table"><thead><tr>
          <th>${esc(t('f.col.digit'))}</th>
          <th>${esc(t('f.col.value'))}</th>
          <th>${esc(t('f.col.position'))}</th>
          <th>${esc(t('f.col.weight'))}</th>
          <th>${esc(t('f.col.product'))}</th>
        </tr></thead><tbody>`;
result.steps.forEach(s=>{
html+=`<tr><td>${esc(s.digit)}</td><td>${esc(s.value)}</td><td>${esc(s.power)}</td><td>${esc(s.weight)}</td><td class="res">${esc(s.product)}</td></tr>`;
});
html+=`</tbody></table></div>`;
}

if(conv.id==='oct2dec'){
html+=`<div class="f-step"><div class="f-step-title">${esc(t('f.step.octExpansion'))}</div>
        <div class="f-preview-sub f-pow-line">
          ${result.htmlExpression} = ${esc(result.productsExpression)} = ${esc(result.result)}
        </div>
      </div>`;
html+=`<div class="f-step"><div class="f-step-title">${esc(t('f.step.octDetail'))}</div>
        <button type="button" class="f-copy" data-csv="hex" style="margin-bottom:8px;">${icon('download', 14)} CSV</button>
        <table class="f-table"><thead><tr>
          <th>${esc(t('f.col.digit'))}</th>
          <th>${esc(t('f.col.value'))}</th>
          <th>${esc(t('f.col.position'))}</th>
          <th>${esc(t('f.col.weight'))}</th>
          <th>${esc(t('f.col.product'))}</th>
        </tr></thead><tbody>`;
result.steps.forEach(s=>{
html+=`<tr><td>${esc(s.digit)}</td><td>${esc(s.value)}</td><td>${esc(s.power)}</td><td>${esc(s.weight)}</td><td class="res">${esc(s.product)}</td></tr>`;
});
html+=`</tbody></table></div>`;
}

if(conv.id==='oct2bin'||conv.id==='hex2bin'){
const title=conv.id==='oct2bin'?t('f.step.octGroups'):t('f.step.hexGroups');
html+=`<div class="f-step"><div class="f-step-title">${title}</div>
        <button type="button" class="f-copy" data-csv="digits" style="margin-bottom:8px;">${icon('download', 14)} CSV</button>
        <table class="f-table"><thead><tr>
          <th>${esc(t('f.col.digit'))}</th>
          <th>${esc(t('f.col.bits'))}</th>
        </tr></thead><tbody>`;
result.steps.forEach(s=>{
html+=`<tr><td>${esc(s.digit)}</td><td class="res" style="font-family:ui-monospace,monospace;">${esc(s.bits)}</td></tr>`;
});
html+=`</tbody></table>
        <div class="f-result" style="margin-top:10px;">
          <div class="f-result-label">${esc(t('f.step.result'))}</div>
          <div class="f-result-value" style="font-family:ui-monospace,monospace;">${esc(result.result)}</div>
        </div>
      </div>`;
}

if(conv.id==='oct2hex'||conv.id==='hex2oct'){
const firstTitle=conv.id==='oct2hex'?t('f.step.octGroups'):t('f.step.hexGroups');
const secondTitle=conv.id==='oct2hex'?t('f.step.hexGroups'):t('f.step.octGroups');
html+=`<div class="f-step"><div class="f-step-title">${firstTitle} → binario</div>
        <table class="f-table"><thead><tr>
          <th>${esc(t('f.col.digit'))}</th>
          <th>${esc(t('f.col.bits'))}</th>
        </tr></thead><tbody>`;
result.binSteps.forEach(s=>{
html+=`<tr><td>${esc(s.digit)}</td><td class="res" style="font-family:ui-monospace,monospace;">${esc(s.bits)}</td></tr>`;
});
html+=`</tbody></table>
        <div class="f-hint" style="margin-top:6px;font-family:ui-monospace,monospace;">= ${esc(result.binPath)}</div>
      </div>`;

html+=`<div class="f-step"><div class="f-step-title">${secondTitle} → resultado</div>
        <button type="button" class="f-copy" data-csv="groups" style="margin-bottom:8px;">${icon('download', 14)} CSV</button>
        <div class="f-groups">`;
result.steps.forEach((s,i)=>{
html+=`<div class="f-group-box"><span class="bits">${esc(s.bits)}</span><span class="val">${esc(s.value)}</span></div>`;
if(i<result.steps.length-1)html+=`<span class="f-group-arrow">→</span>`;
});
html+=`</div>
        <div class="f-result" style="margin-top:10px;">
          <div class="f-result-label">${esc(t('f.step.result'))}</div>
          <div class="f-result-value" style="font-family:ui-monospace,monospace;">${esc(result.result)}</div>
        </div>
      </div>`;
}

if(conv.id==='hex2dec'){
html+=`<div class="f-step"><div class="f-step-title">${esc(t('f.step.hexExpansion'))}</div>
        <div class="f-preview-sub f-pow-line">
          ${result.htmlExpression} = ${esc(result.productsExpression)} = ${esc(result.result)}
        </div>
      </div>`;
html+=`<div class="f-step"><div class="f-step-title">${esc(t('f.step.hexDetail'))}</div>
        <button type="button" class="f-copy" data-csv="hex" style="margin-bottom:8px;">${icon('download', 14)} CSV</button>
        <table class="f-table"><thead><tr>
          <th>${esc(t('f.col.digit'))}</th>
          <th>${esc(t('f.col.value'))}</th>
          <th>${esc(t('f.col.position'))}</th>
          <th>${esc(t('f.col.weight'))}</th>
          <th>${esc(t('f.col.product'))}</th>
        </tr></thead><tbody>`;
result.steps.forEach(s=>{
html+=`<tr><td>${esc(s.digit)}</td><td>${esc(s.value)}</td><td>${esc(s.power)}</td><td>${esc(s.weight)}</td><td class="res">${esc(s.product)}</td></tr>`;
});
html+=`</tbody></table></div>`;
}

html+=`<div class="f-step">
      <div class="f-step-title">${esc(t('f.step.result'))}</div>
      <div class="f-result">
        <div class="f-result-label">${esc(raw)} → ${esc(t('f.conv.' + conv.id))}</div>
        <div class="f-result-value">${esc(result.result)}</div>
        <button type="button" class="f-copy" data-copy-result="${esc(result.result)}">${esc(t('f.copy'))}</button>
      </div>
    </div>`;
return html;
}

function init(c){
if(!c)return;
container=c;
initialized=true;
container.innerHTML='';
renderAll();
}

window.NibblyFormulas={init:init};
})();