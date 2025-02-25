const WIDTH = 1280;
const LINEWIDTH = 2
const LETTERBOXLENGTH = 16;
const LETTERBOXHEIGHT = 100;
const LETTERBOXWIDTH = 76;
const LETTERINDEXOFFSETX = 4;
const LETTERINDEXOFFSETY = 4;
const CHACHAWORDLABELS = ["a", "b", "c", "d"];
const CHACHACONSTANTS = [0x61707865, 0x3320646e, 0x79622d32, 0x6b206574];
const CHACHAWORDPERMS = [[[0, 5, 10, 15], [1, 6, 11, 12], [2, 7, 8, 13], [3, 4, 9, 14]],
                         [[0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15]]];
const CHACHASAT = new Array(16).fill(0xFFFFFFFF);
const CHACHAZRO = new Array(16).fill(0x00000000);
const DIFFCOLOR = "#8bd";
const HIGHCOLOR = "#f08";
const PARTYLABELS = ["A", "B", "C", "D", "E"];
const HEXCHECKER = 0xCCCC3333;
const HEXVSTRIPE = 0xAAAAAAAA;
const HEXVSTRIPE2 = 0xF0F0F0F0;
const HEXHSTRIPE = 0xFF00FF00;
const HEXHSTRIPE2 = 0xFF000000;
const HEXHSTRIPE3 = 0xFF0000FF;

// example chacha IV with key = 0xAAAAAAAA, and counter, nonce = 0
// as well as example data and xor streams for creating diagrams
const EG_CHACHAKEY = new Array(8).fill(HEXVSTRIPE);
const EG_CHACHAINITBLOCK = createChaChaInitBlock(EG_CHACHAKEY);
const EG_CHACHASTRUCT = createEncryptionStreams(EG_CHACHAINITBLOCK, 5)
const EG_DATA_STREAMS = [HEXCHECKER, HEXVSTRIPE2, HEXHSTRIPE2, HEXHSTRIPE3];


let varCaesarKey = [1];
let varCaesarText = "Encrypting stuff";
const canvasCaesar = initializeCanvas("canvasCaesar", 390);
const canvasCaesarDecrypt = initializeCanvas("canvasCaesarDecrypt", 390);
const sliderCaesar = initializeSliders("sliderCaesar", 0, 25, 1, varCaesarKey);
const inputCaesar = document.getElementById("inputCaesar");
const spanCaesar = document.getElementById("spanCaesar");
initializeCanvasText(canvasCaesar);
inputCaesar.value = varCaesarText;
sliderCaesar.addEventListener("input", updateCaesar);
inputCaesar.addEventListener("input", updateCaesar);
function updateCaesar() {
    canvasCaesar.clearRect(0, 0, WIDTH, 390);
    canvasCaesarDecrypt.clearRect(0, 0, WIDTH, 390);
    varCaesarKey = [Number(sliderCaesar.value)];
    let varCaesarCiphertext = drawLetterShift(canvasCaesar, varCaesarKey, inputCaesar.value, false);
    drawLetterShift(canvasCaesarDecrypt, varCaesarKey, varCaesarCiphertext, spanCaesar, -1);
}
updateCaesar();


let varRot13Text = "Encrypting stuff";
const canvasRot13 = initializeCanvas("canvasRot13", 650);
const inputRot13 = document.getElementById("inputRot13");
const spanRot13 = document.getElementById("spanRot13");
initializeCanvasText(canvasRot13);
inputRot13.value = varRot13Text;
inputRot13.addEventListener("input", updateRot13);
function updateRot13() {
    canvasRot13.clearRect(0, 0, WIDTH, 650);
    let varRot13Ciphertext = drawLetterShift(canvasRot13, [13], inputRot13.value, false, 1);
    drawLetterShift(canvasRot13, [13], varRot13Ciphertext, spanRot13, 1, true, 275);
}
updateRot13();


let varVignereKey = [0, 1, 2];
let varVignereText = "Encrypting stuff";
const canvasVignere = initializeCanvas("canvasVignere", 390);
const canvasVignereDecrypt = initializeCanvas("canvasVignereDecrypt", 390);
const inputVignere = document.getElementById("inputVignere");
const spanVignere = document.getElementById("spanVignere");
initializeCanvasText(canvasVignere);
inputVignere.value = varVignereText;
inputVignereKey.value = varVignereKey;
inputVignere.addEventListener("input", updateVignere);
inputVignereKey.addEventListener("input", updateVignere);
function updateVignere() {
    canvasVignere.clearRect(0, 0, WIDTH, 390);
    canvasVignereDecrypt.clearRect(0, 0, WIDTH, 390);
    varVignereKey = getArrayFromString(inputVignereKey.value);
    let varVignereCiphertext = drawLetterShift(canvasVignere, varVignereKey, inputVignere.value, false);
    drawLetterShift(canvasVignereDecrypt, varVignereKey, varVignereCiphertext, spanVignere, -1);
}
updateVignere();


let varOneTimePadText = "Encrypting stuff";
let varOneTimePadKey = generateKey(varOneTimePadText.length, 26);
const canvasOneTimePad = initializeCanvas("canvasOneTimePad", 390);
const inputOneTimePad = document.getElementById("inputOneTimePad");
const buttonOneTimePad = document.getElementById("buttonOneTimePad");
const spanOneTimePad = document.getElementById("spanOneTimePad");
initializeCanvasText(canvasOneTimePad);
inputOneTimePad.value = varOneTimePadText;
inputOneTimePad.addEventListener("input", updateOneTimePad);
buttonOneTimePad.addEventListener("click", updateOneTimePad);
function updateOneTimePad() {
    canvasOneTimePad.clearRect(0, 0, WIDTH, 390);
    varOneTimePadKey = generateKey((inputOneTimePad.value).length, 26);
    drawLetterShift(canvasOneTimePad, varOneTimePadKey, inputOneTimePad.value, spanOneTimePad);
}
updateOneTimePad();


const canvasOTPReuse = initializeCanvas("canvasOTPReuse", 1125);
const arrayOTPReuseData1 = Array.from({ length: 32 }, (_, row) => Array.from({ length: 32 }, (_, col) => ((row + col) % 8)));
const arrayOTPReuseData2 = Array.from({ length: 32 }, (_, row) => Array.from({ length: 32 }, (_, col) => (((row % 2) * col) % 8)));
const arrayOTPReuseKey = Array.from({ length: 32 }, () => Array.from({ length: 32 }, () => Math.floor(Math.random() * 8)));
const arrayOTPReuseCipher1 = shiftBits2D(arrayOTPReuseData1, arrayOTPReuseKey, 8);
const arrayOTPReuseCipher2 = shiftBits2D(arrayOTPReuseData2, arrayOTPReuseKey, 8);
const arrayOTPReuseDifference = shiftBits2D(arrayOTPReuseCipher1, arrayOTPReuseCipher2, 8, true);
const arrayOTPReuseColors = ["#fff", "#ddd", "#bbb", "#999", "#777", "#555", "#333", "#000"];
const arrayOTPReuseBlocks = [[arrayOTPReuseData1, 15, 15], [arrayOTPReuseData2, 375, 15], [arrayOTPReuseKey, 15, 375], [arrayOTPReuseKey, 375, 375], [arrayOTPReuseCipher1, 15, 785], [arrayOTPReuseCipher2, 375, 785], [arrayOTPReuseDifference, 885, 785]];
for (let i = 0; i < arrayOTPReuseBlocks.length; i++)
    drawBits2D(canvasOTPReuse, arrayOTPReuseBlocks[i][0], arrayOTPReuseBlocks[i][1], arrayOTPReuseBlocks[i][2], arrayOTPReuseColors, 10);
drawArrow(canvasOTPReuse, true, 1, 175, 715, 765);
drawArrow(canvasOTPReuse, true, 1, 535, 715, 765);
drawArrow(canvasOTPReuse, false, 1, 945, 755, 825);


let varVernamText = "0000000000000000";
let varVernamKey = generateKey(varVernamText.length, 2);
const canvasVernam = initializeCanvas("canvasVernam", 650);
const canvasVernamXOR = initializeCanvas("canvasVernamXOR", 650);
const inputVernam = document.getElementById("inputVernam");
const spanVernam = document.getElementById("spanVernam");
const spanVernamXOR = document.getElementById("spanVernamXOR");
initializeCanvasText(canvasVernam);
initializeCanvasText(canvasVernamXOR);
inputVernam.value = varVernamText;
inputVernam.addEventListener("input", updateVernam);
function updateVernam() {
    varVernamText = (inputVernam.value).replace(/[^01]/g, '');
    varVernamKey = generateKey(varVernamText.length, 2);
    let varVernamCiphertext = XORStringArray(varVernamText, varVernamKey);
    canvasVernam.clearRect(0, 0, WIDTH, 650);
    canvasVernamXOR.clearRect(0, 0, WIDTH, 650);
    drawLetterShift(canvasVernam, varVernamKey, varVernamText, false, 1, false);
    drawLetterShift(canvasVernam, varVernamKey, varVernamCiphertext, spanVernam, 1, false, 275);
    drawLetterChain(canvasVernam, varVernamText, 535);
    drawLetterChain(canvasVernamXOR, varVernamText);
    drawShiftArrows(canvasVernamXOR, varVernamKey, Math.min(varVernamText.length, LETTERBOXLENGTH), "^");
    drawLetterChain(canvasVernamXOR, varVernamCiphertext, 275);
    drawShiftArrows(canvasVernamXOR, varVernamKey, Math.min(varVernamText.length, LETTERBOXLENGTH), "^", 395);
    drawLetterChain(canvasVernamXOR, varVernamText, 535);
    spanVernamXOR.innerHTML = varVernamKey;
}
updateVernam();


const canvasVernamReuse = initializeCanvas("canvasVernamReuse", 1125);
const arrayVernamReuseKey = EG_CHACHASTRUCT.chachaStream.slice(0, 32);
const arrayVernamReuseData1 = new Array(32).fill(HEXVSTRIPE2);
const arrayVernamReuseData2 = new Array(32).fill(HEXHSTRIPE2);
const arrayVernamReuseXOR1 = createXORStream(arrayVernamReuseData1, arrayVernamReuseKey);
const arrayVernamReuseXOR2 = createXORStream(arrayVernamReuseData2, arrayVernamReuseKey);
const arrayVernamReuseLeak = createXORStream(arrayVernamReuseXOR1, arrayVernamReuseXOR2);
const arrayVernamReuseBlocks = [[arrayVernamReuseData1, 15, 15], [arrayVernamReuseData2, 375, 15], [arrayVernamReuseKey, 15, 375], [arrayVernamReuseKey, 375, 375], [arrayVernamReuseXOR1, 15, 785], [arrayVernamReuseXOR2, 375, 785], [arrayVernamReuseLeak, 885, 785]];
for (let i = 0; i < arrayVernamReuseBlocks.length; i++)
    drawChaChaBlocks(canvasVernamReuse, arrayVernamReuseBlocks[i][0], arrayVernamReuseBlocks[i][1], arrayVernamReuseBlocks[i][2], 10, "#000", "#000", "#000", 2);
drawArrow(canvasVernamReuse, true, 1, 175, 715, 765);
drawArrow(canvasVernamReuse, true, 1, 535, 715, 765);
drawArrow(canvasVernamReuse, false, 1, 945, 755, 825);


const canvasKeyExchange = initializeCanvas("canvasKeyExchange", 1080);
initializeCanvasText(canvasKeyExchange, "left");
for (let i = 0; i < 2; i++) {
    canvasKeyExchange.fillText("f", 329, 213 + i * 600);
    canvasKeyExchange.fillText(PARTYLABELS[i], 15, 135 + i * 600);
    drawArrow(canvasKeyExchange, true, (i === 0) ? 1 : -1, 143, (i === 0) ? 325 : 737, (i === 0) ? 737 : 325);
}
drawChaChaEncryptionFromKey(canvasKeyExchange, EG_CHACHAINITBLOCK, EG_CHACHASTRUCT.dataStream, EG_CHACHASTRUCT.chachaStream, EG_CHACHASTRUCT.xorStream);
drawChaChaEncryptionFromKey(canvasKeyExchange, EG_CHACHAINITBLOCK, EG_CHACHASTRUCT.xorStream, EG_CHACHASTRUCT.chachaStream, EG_CHACHASTRUCT.dataStream, 15, 615);
drawLock(canvasKeyExchange, 175, 533);


const canvasChaChaSingle = initializeCanvas("canvasChaChaSingle", 480);
const arrayChaChaSingle = EG_CHACHASTRUCT.chachaStream.slice(0, 16);
const arrayChaChaSingleXOR = createXORStream(EG_CHACHASTRUCT.dataStream, arrayChaChaSingle);
drawChaChaEncryptionFromKey(canvasChaChaSingle, EG_CHACHAINITBLOCK, EG_CHACHASTRUCT.dataStream, arrayChaChaSingle, arrayChaChaSingleXOR);


const canvasChaChaPartition = initializeCanvas("canvasChaChaPartition", 605);
const arrayChaChaPartitionIndices = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]];
const arrayChaChaPartitionLabels = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]];
drawChaChaBlock(canvasChaChaPartition, EG_CHACHAINITBLOCK, 15, 15, 8, "#000", "#000");
drawChaChaBlock(canvasChaChaPartition, EG_CHACHAINITBLOCK, 15, 205);
for (let i = 0; i < 4; i++)
    drawChaChaLables(canvasChaChaPartition, arrayChaChaPartitionIndices[i], arrayChaChaPartitionLabels[i], 15, 205);


let varChaChaARXRound = 1;
let varChaChaARXOperation = 0;
let arrayChaChaARXBlock = [...EG_CHACHAINITBLOCK];
const canvasChaChaARX = initializeCanvas("canvasChaChaARX", 415);
const buttonChaChaARXNext = document.getElementById("buttonChaChaARXNext");
const buttonChaChaARXReset = document.getElementById("buttonChaChaARXReset");
const spanChaChaARXRounds = document.getElementById("spanChaChaARXRounds");
buttonChaChaARXNext.addEventListener("click", updateChaChaARX);
buttonChaChaARXReset.addEventListener("click", resetChaChaARX);
function resetChaChaARX() {
    canvasChaChaARX.clearRect(0, 0, WIDTH, 415);
    arrayChaChaARXBlock = [...EG_CHACHAINITBLOCK];
    drawChaChaBlock(canvasChaChaARX, arrayChaChaARXBlock);
    spanChaChaARXRounds.innerHTML = 0;
    varChaChaARXOperation = 0;
    varChaChaARXRound = 1;
}
function updateChaChaARX() {
    varChaChaARXRound = 1 + Math.floor(varChaChaARXOperation / 4);
    canvasChaChaARX.clearRect(0, 0, WIDTH, 415);
    updateChaChaBlockQTRound(arrayChaChaARXBlock, CHACHAWORDPERMS[varChaChaARXRound % 2][varChaChaARXOperation % 4]);
    drawChaChaBlock(canvasChaChaARX, arrayChaChaARXBlock);
    drawChaChaLables(canvasChaChaARX, CHACHAWORDPERMS[varChaChaARXRound % 2][varChaChaARXOperation % 4], CHACHAWORDLABELS);
    spanChaChaARXRounds.innerHTML = varChaChaARXRound;
    varChaChaARXOperation++;
}
resetChaChaARX();


const canvasChaChaAddition = initializeCanvas("canvasChaChaAddition", 720);
const arrayChaChaAdditionBlock = [...EG_CHACHAINITBLOCK];
drawChaChaBlock(canvasChaChaAddition, arrayChaChaAdditionBlock, 695, 15, 18);
updateChaChaBlockTWRound(arrayChaChaAdditionBlock);
drawChaChaBlock(canvasChaChaAddition, arrayChaChaAdditionBlock, 15, 15, 18);
updateChaChaBlockARound(arrayChaChaAdditionBlock, EG_CHACHAINITBLOCK);
drawChaChaBlock(canvasChaChaAddition, arrayChaChaAdditionBlock, 355, 415, 18, "#000", "#000");
drawArrow(canvasChaChaAddition, true, 1, 645, 335, 375);
initializeCanvasText(canvasChaChaAddition);
canvasChaChaAddition.fillText("+", 645, 161);


let varChaChaAvalancheRound = 1;
let varChaChaAvalancheOperation = 0;
let arrayChaChaAvalancheDifference= [];
const arrayChaChaAvalancheBlock = [];
const canvasChaChaAvalanche = initializeCanvas("canvasChaChaAvalanche", 670);
const buttonChaChaAvalancheNext = document.getElementById("buttonChaChaAvalancheNext");
const buttonChaChaAvalancheReset = document.getElementById("buttonChaChaAvalancheReset");
const spanChaChaAvalancheRounds = document.getElementById("spanChaChaAvalancheRounds");
buttonChaChaAvalancheNext.addEventListener("click", updateChaChaAvalanche);
buttonChaChaAvalancheReset.addEventListener("click", resetChaChaAvalanche);
function resetChaChaAvalanche() {
    canvasChaChaAvalanche.clearRect(0, 0, WIDTH, 670);
    for (let i = 0; i < 2; i++) {
        arrayChaChaAvalancheBlock[i] = createChaChaInitBlock(EG_CHACHAKEY, i);
        drawChaChaBlock(canvasChaChaAvalanche, arrayChaChaAvalancheBlock[i], 15 + i * 670, 15, 18);
    }
    arrayChaChaAvalancheDifference = createXORStream(arrayChaChaAvalancheBlock[0], arrayChaChaAvalancheBlock[1]);
    drawChaChaBlock(canvasChaChaAvalanche, arrayChaChaAvalancheDifference, 15, 365, 18, DIFFCOLOR);
    spanChaChaAvalancheRounds.innerHTML = 0;
    varChaChaAvalancheOperation = 0;
    varChaChaAvalancheRound = 1;
}
function updateChaChaAvalanche() {
    varChaChaAvalancheRound = 1 + Math.floor(varChaChaAvalancheOperation / 4);
    canvasChaChaAvalanche.clearRect(0, 0, WIDTH, 670);
    for (let i = 0; i < 2; i++) {
        updateChaChaBlockQTRound(arrayChaChaAvalancheBlock[i], CHACHAWORDPERMS[varChaChaAvalancheRound % 2][varChaChaAvalancheOperation % 4]);
        drawChaChaBlock(canvasChaChaAvalanche, arrayChaChaAvalancheBlock[i], 15 + i * 670, 15, 18);
        drawChaChaLables(canvasChaChaAvalanche, CHACHAWORDPERMS[varChaChaAvalancheRound % 2][varChaChaAvalancheOperation % 4], CHACHAWORDLABELS, 15 + i * 670, 15, 18);
    }
    arrayChaChaAvalancheDifference = createXORStream(arrayChaChaAvalancheBlock[0], arrayChaChaAvalancheBlock[1]);
    drawChaChaBlock(canvasChaChaAvalanche, arrayChaChaAvalancheDifference, 15, 365, 18, DIFFCOLOR);
    spanChaChaAvalancheRounds.innerHTML = varChaChaAvalancheRound;
    varChaChaAvalancheOperation++;
}
resetChaChaAvalanche();


const canvasChaChaPartitionSequence = initializeCanvas("canvasChaChaPartitionSequence", 415);
drawChaChaBlock(canvasChaChaPartitionSequence, EG_CHACHAINITBLOCK);
drawChaChaLables(canvasChaChaPartitionSequence, [12, 13, 14, 15], ["Counter", "Counter", "Nonce", "Nonce"], 15, 15, 24, "bold 36px JetBrains Mono");


let varChaChaCounter = 0;
const varChaChaCounterBlockLength = 7;
const canvasChaChaCounter = initializeCanvas("canvasChaChaCounter", 610);
const buttonChaChaCounterIncrement = document.getElementById("buttonChaChaCounterIncrement");
const buttonChaChaCounterDecrement = document.getElementById("buttonChaChaCounterDecrement");
const spanChaChaCounter = document.getElementById("spanChaChaCounter");
const structChaChaCounter = [createEncryptionStreams(EG_CHACHAINITBLOCK, varChaChaCounterBlockLength)];
buttonChaChaCounterIncrement.addEventListener("click", () => {
    varChaChaCounter = (varChaChaCounter + 1) >>> 0;
    updateChaChaCounter(); });
buttonChaChaCounterDecrement.addEventListener("click", () => {
    varChaChaCounter = (varChaChaCounter - 1) >>> 0;
    updateChaChaCounter(); });
function updateChaChaCounter() {
    canvasChaChaCounter.clearRect(0, 0, WIDTH, 610);
    drawChaChaCountNonce(canvasChaChaCounter, EG_CHACHAKEY, structChaChaCounter, varChaChaCounter);
    spanChaChaCounter.innerHTML = varChaChaCounter;
}
updateChaChaCounter();


let varChaChaRepeatCounter = 0;
let structChaChaCounterRepeat = [];
const canvasChaChaCounterRepeat = initializeCanvas("canvasChaChaCounterRepeat", 1140);
const buttonChaChaCounterRepeatIncrement = document.getElementById("buttonChaChaCounterRepeatIncrement");
const buttonChaChaCounterRepeatDecrement = document.getElementById("buttonChaChaCounterRepeatDecrement");
for (let i = 0; i < 2; i++) structChaChaCounterRepeat[i] = createEncryptionStreams(EG_CHACHAINITBLOCK, 7, EG_DATA_STREAMS[i + 1]);
const arrayChaChaCounterRepeatXOR = createXORStream(structChaChaCounterRepeat[0].xorStream, structChaChaCounterRepeat[1].xorStream);
buttonChaChaCounterRepeatIncrement.addEventListener("click", () => {
    varChaChaRepeatCounter = (varChaChaRepeatCounter + 1) >>> 0;
    updateChaChaCounterRepeat(); });
buttonChaChaCounterRepeatDecrement.addEventListener("click", () => {
    varChaChaRepeatCounter = (varChaChaRepeatCounter - 1) >>> 0;
    updateChaChaCounterRepeat(); });
function updateChaChaCounterRepeat() {
    canvasChaChaCounterRepeat.clearRect(0, 0, WIDTH, 1140);
    drawChaChaCountNonce(canvasChaChaCounterRepeat, EG_CHACHAKEY, structChaChaCounterRepeat, varChaChaRepeatCounter, 0, 15, 15, 6, 220, 66);
    drawChaChaBlocks(canvasChaChaCounterRepeat, arrayChaChaCounterRepeatXOR, 15, 1027, 6);
    if (varChaChaRepeatCounter < structChaChaCounterRepeat[0].length) drawRectangle(canvasChaChaCounterRepeat, 15 + varChaChaRepeatCounter * 32 * 6, 745, 32 * 6, 16 * 6, HIGHCOLOR);
}
updateChaChaCounterRepeat();


let varChaChaNonce = 0;
let varChaChaNonceCounter = 0;
const varChaChaNonceBlockLength = 10;
const canvasChaChaNonce = initializeCanvas("canvasChaChaNonce", 1050);
const spanChaChaNonce = document.getElementById("spanChaChaNonce");
const spanChaChaNonceCounter = document.getElementById("spanChaChaNonceCounter");
const buttonChaChaNonceIncrement = document.getElementById("buttonChaChaNonceIncrement");
const buttonChaChaNonceDecrement = document.getElementById("buttonChaChaNonceDecrement");
const buttonChaChaNonceCounterIncrement = document.getElementById("buttonChaChaNonceCounterIncrement");
const buttonChaChaNonceCounterDecrement = document.getElementById("buttonChaChaNonceCounterDecrement");
const structChaChaNonce = [];
for (let i = 0; i < 3; i++) {
    const arrayInitBlock = createChaChaInitBlock(EG_CHACHAKEY, 0, i);
    structChaChaNonce[i] = createEncryptionStreams(arrayInitBlock, varChaChaNonceBlockLength, EG_DATA_STREAMS[i]);
}
buttonChaChaNonceIncrement.addEventListener("click", () => {
    varChaChaNonce = (varChaChaNonce + 1) >>> 0;
    updateChaChaNonce(); });
buttonChaChaNonceDecrement.addEventListener("click", () => {
    varChaChaNonce = (varChaChaNonce - 1) >>> 0;
    updateChaChaNonce(); });
buttonChaChaNonceCounterIncrement.addEventListener("click", () => {
    varChaChaNonceCounter = (varChaChaNonceCounter + 1) >>> 0;
    updateChaChaNonce(); });
buttonChaChaNonceCounterDecrement.addEventListener("click", () => {
    varChaChaNonceCounter = (varChaChaNonceCounter - 1) >>> 0;
    updateChaChaNonce(); });
function updateChaChaNonce() {
    canvasChaChaNonce.clearRect(0, 0, WIDTH, 1050);
    drawChaChaCountNonce(canvasChaChaNonce, EG_CHACHAKEY, structChaChaNonce, varChaChaNonceCounter, varChaChaNonce, 15, 15, 4);
    spanChaChaNonce.innerHTML = varChaChaNonce;
    spanChaChaNonceCounter.innerHTML = varChaChaNonceCounter;
}
updateChaChaNonce();


const canvasChaChaZeroBlock = initializeCanvas("canvasChaChaZeroBlock", 480);
const arrayChaChaZeroEncryption = createEncryptionStreams(CHACHAZRO, 4);
drawChaChaEncryptionFromKey(canvasChaChaZeroBlock, CHACHAZRO, arrayChaChaZeroEncryption.dataStream, arrayChaChaZeroEncryption.chachaStream, arrayChaChaZeroEncryption.xorStream);


const canvasChaChaPartitionConstants = initializeCanvas("canvasChaChaPartitionConstants", 415);
drawChaChaBlock(canvasChaChaPartitionConstants, EG_CHACHAINITBLOCK);
drawChaChaLables(canvasChaChaPartitionConstants, [0, 1, 2, 3], ["Constant", "Constant", "Constant", "Constant"], 15, 15, 24, "bold 32px JetBrains Mono");


const canvasChaChaPartitionKey = initializeCanvas("canvasChaChaPartitionKey", 415);
drawChaChaBlock(canvasChaChaPartitionKey, EG_CHACHAINITBLOCK);
drawChaChaLables(canvasChaChaPartitionKey, [4, 5, 6, 7], ["Key", "Key", "Key", "Key"]);
drawChaChaLables(canvasChaChaPartitionKey, [8, 9, 10, 11], ["Key", "Key", "Key", "Key"]);


const canvasStructuredKeyExchange = initializeCanvas("canvasStructuredKeyExchange", 1080);
const arrayStructuredKeyExchangeLabels = ["Key", "Counter, Nonce"];
initializeCanvasText(canvasStructuredKeyExchange, "left");
for (let i = 0; i < 2; i++) {
    canvasStructuredKeyExchange.fillText(arrayStructuredKeyExchangeLabels[i], 145, 503 + i * 60);
    canvasStructuredKeyExchange.fillText(PARTYLABELS[i], 25, 135 + i * 600);
    drawArrow(canvasStructuredKeyExchange, true, (i === 0) ? 1 : -1, 93, (i === 0) ? 325 : 737, (i === 0) ? 737 : 325);
    drawLock(canvasStructuredKeyExchange, 125, 503 + i * 60, i === 0);
}
drawChaChaEncryptionFromKey(canvasStructuredKeyExchange, EG_CHACHAINITBLOCK, EG_CHACHASTRUCT.dataStream, EG_CHACHASTRUCT.chachaStream, EG_CHACHASTRUCT.xorStream);
drawChaChaEncryptionFromKey(canvasStructuredKeyExchange, EG_CHACHAINITBLOCK, EG_CHACHASTRUCT.xorStream, EG_CHACHASTRUCT.chachaStream, EG_CHACHASTRUCT.dataStream, 15, 615);


const canvasBitFlip = initializeCanvas("canvasBitFlip", 1410);
const arrayBitFlipMessage = new Array(16).fill(HEXHSTRIPE3);
const arrayBitFlipPlain = EG_CHACHASTRUCT.dataStream.slice(16 * 3, 16 * (3 + 1));
const arrayBitFlipCipher = EG_CHACHASTRUCT.xorStream.slice(16 * 3, 16 * (3 + 1));
const arrayBitFlipXORPlainMessage = createXORStream(arrayBitFlipPlain, arrayBitFlipMessage);
const arrayBitFlipModifiedBlock = createXORStream(arrayBitFlipXORPlainMessage, arrayBitFlipCipher);
const arrayBitFlipModifiedCipher = EG_CHACHASTRUCT.xorStream.slice(0, 16 * 3).concat(arrayBitFlipModifiedBlock, EG_CHACHASTRUCT.xorStream.slice(16 * (3 + 1)));
const arrayBitFlipModifiedPlain = createXORStream(arrayBitFlipModifiedCipher, EG_CHACHASTRUCT.chachaStream);
const arrayBitFlipBlocks = [[arrayBitFlipPlain, 15, 495, "m"], [arrayBitFlipMessage, 15, 639, "m'"], [arrayBitFlipXORPlainMessage, 15, 783, "m^m'"], [arrayBitFlipCipher, 399, 495, "c"], [arrayBitFlipXORPlainMessage, 399, 639, "m^m'"], [arrayBitFlipModifiedBlock, 399, 783, "c^m^m'"]];
const arrayBitFlipBlockRects = [[15, 495, "#f81"], [783, 15, "#f81"], [15, 639, "#69f"], [783, 1263, "#69f"], [399, 495, "#e9f"], [783, 319, "#e9f"], [399, 783, "#8d8"], [783, 959, "#8d8"]];
initializeCanvasText(canvasBitFlip, "left");
drawChaChaEncryption(canvasBitFlip, EG_CHACHASTRUCT.dataStream, EG_CHACHASTRUCT.chachaStream, EG_CHACHASTRUCT.xorStream, 15, 15, 8);
drawChaChaEncryption(canvasBitFlip, arrayBitFlipModifiedCipher, EG_CHACHASTRUCT.chachaStream, arrayBitFlipModifiedPlain, 15, 959, 8);
for (let i = 0; i < arrayBitFlipBlocks.length; i++) {
    drawChaChaBlocks(canvasBitFlip, arrayBitFlipBlocks[i][0], arrayBitFlipBlocks[i][1], arrayBitFlipBlocks[i][2], 8);
    canvasBitFlip.fillText(arrayBitFlipBlocks[i][3], arrayBitFlipBlocks[i][1] + 270, arrayBitFlipBlocks[i][2] + 120);
}
for (let i = 0; i < arrayBitFlipBlockRects.length; i++)
    drawRectangle(canvasBitFlip, arrayBitFlipBlockRects[i][0], arrayBitFlipBlockRects[i][1], 256, 128, arrayBitFlipBlockRects[i][2], 6);
drawArrow(canvasBitFlip, false, -1, 559, 911, 675);
drawArrow(canvasBitFlip, false, 1, 703, 335, 379);
drawArrow(canvasBitFlip, true, 1, 911, 847, 941);
canvasBitFlip.moveTo(911, 467); canvasBitFlip.lineTo(911, 559);
canvasBitFlip.moveTo(675, 847); canvasBitFlip.lineTo(911, 847);
canvasBitFlip.moveTo(291, 847); canvasBitFlip.lineTo(335, 847); canvasBitFlip.lineTo(335, 703);
canvasBitFlip.stroke();



// functions

function shiftBits2D(array1, array2, modulus = 2, subtract = false) {
    const shiftedArray = Array.from({ length: array1.length }, () => new Array(array1[0].length).fill(0));
    for (let i = 0; i < array1.length; i++) {
        for (j = 0; j < array1[0].length; j++) {
            if (subtract) {
                shiftedArray[i][j] = (((array1[i][j] - array2[i][j]) % modulus) + modulus) % modulus;
            } else {
                shiftedArray[i][j] = (array1[i][j] + array2[i][j]) % modulus;
            }
        }
    }
    return shiftedArray;
}

function drawBits2D(canvas, array, x = 15, y = 15, colors = ["#fff", "#000"], size = 10) {
    let dimensionX = array[0].length;
    let dimensionY = array.length;
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[0].length; j++) {
            canvas.fillStyle = colors[array[i][j]];
            canvas.fillRect(x + j * size, y + i * size, size, size);
        }
    }
    canvas.lineWidth = LINEWIDTH;
    for (let i = 0; i <= dimensionY; i++) {
        canvas.moveTo(x, y + i * size);
        canvas.lineTo(x + size * dimensionX, y + i * size);
    }
    for (let i = 0; i <= dimensionX; i++) {
        canvas.moveTo(x + i * size, y);
        canvas.lineTo(x + i * size, y + size * dimensionY);
    }
    canvas.stroke();
}

function drawChaChaWithBlockArrow(canvas, block, x = 15, y = 15, size = 10, arrowStart = 415, arrowEnd = 575, color = "#000", inline = "#000", outline = "#000") {
    drawChaChaBlock(canvas, block, x, y, size, color, inline, outline);
    drawArrow(canvas, false, 1, y + 8 * size, arrowStart, arrowEnd);
}

function drawChaChaCountNonce(canvas, key, encryptionStreams, counter = 0, nonce = 0, x = 15, y = 15, sizeStream = 6, streamsOffset = 240, streamGroupOffset = 70, blockOffset = 640, sizeBlock = 10, lineWidth = 6) {
    const initBlock = createChaChaInitBlock(key, counter, nonce);
    drawChaChaWithBlockArrow(canvas, initBlock, x, y, sizeBlock, x + 32 * sizeBlock + 80, x + blockOffset - 80);
    updateChaChaBlockFLRound(initBlock);
    drawChaChaBlocks(canvas, initBlock, x + blockOffset, y, sizeBlock);
    for (let i = 0; i < encryptionStreams.length; i++)
        drawChaChaEncryption(canvas, encryptionStreams[i].dataStream, encryptionStreams[i].chachaStream, encryptionStreams[i].xorStream, x, y + streamsOffset + i * sizeStream * streamGroupOffset, sizeStream);
    drawRectangle(canvas, x + blockOffset, y, 32 * sizeBlock, 16 * sizeBlock, HIGHCOLOR, lineWidth);
    if (counter < encryptionStreams[0].length) drawRectangle(canvas, 15 + counter * 32 * sizeStream, y + streamsOffset + 19 * sizeStream + nonce * streamGroupOffset * sizeStream, 32 * sizeStream, 16 * sizeStream, HIGHCOLOR, lineWidth);
}

function createEncryptionStreams(initBlock, length, hexDataPattern = HEXCHECKER) {
    const data = new Array(16 * length).fill(hexDataPattern);
    const chacha = createChaChaStream(initBlock, length);
    const xor = createXORStream(data, chacha);
    return { dataStream: data, chachaStream: chacha, xorStream: xor, length: length};
}

function drawRectangle(canvas, x, y, width, height, color = "#000", lineWidth = 4) {
    canvas.strokeStyle = color;
    canvas.lineWidth = lineWidth;
    canvas.beginPath();
    canvas.moveTo(x, y);
    canvas.lineTo(x + width, y);
    canvas.lineTo(x + width, y + height);
    canvas.lineTo(x, y + height);
    canvas.lineTo(x, y);
    canvas.lineTo(x + width, y);
    canvas.stroke();
    canvas.strokeStyle = "#000";
    canvas.lineWidth = LINEWIDTH;
}

function createChaChaInitBlock(key, counterStart = 0, nonce = 0) {
    return CHACHACONSTANTS.concat(key, 0, counterStart, 0, nonce);
}

function createChaChaStream(initBlock, blocksLength) {
    const finalBlocks = [];
    for (let i = 0; i < blocksLength; i++) {
        const tempBlock = [...initBlock];
        tempBlock[13] += i;
        updateChaChaBlockFLRound(tempBlock);
        finalBlocks.push(...tempBlock);
    }
    return finalBlocks;
}

function createXORStream(block1, block2) {
    const arrayLength = Math.max(block1.length, block2.length);
    const XORArray = new Array(arrayLength).fill(0);
    for (let i = 0; i < arrayLength; i++)
            XORArray[i] = block1[i] ^ block2[i];
    return XORArray;
}

function updateChaChaBlockFLRound(block) {
    const initBlock = [...block];
    updateChaChaBlockTWRound(block);
    updateChaChaBlockARound(block, initBlock);
}

function updateChaChaBlockARound(block, initialBlock) {
    for (let i = 0; i < 16; i++)
        block[i] = (block[i] + initialBlock[i]) >>> 0;
}

function updateChaChaBlockTWRound(block) {
    for (let round = 1; round <= 20; round++) {
        for (let quarterRound = 0; quarterRound < 4; quarterRound++) {
            updateChaChaBlockQTRound(block, CHACHAWORDPERMS[round % 2][quarterRound]);
        }
    }
}

function updateChaChaBlockQTRound(block, words) {
    block[words[0]] = (block[words[0]] + block[words[1]]) >>> 0; // extra shifts since
    block[words[3]] = (block[words[3]] ^ block[words[0]]) >>> 0; // no native 32-bit in js
    block[words[3]] = ((block[words[3]] << 16) | (block[words[3]] >>> (32 - 16))) >>> 0;
    block[words[2]] = (block[words[2]] + block[words[3]]) >>> 0;
    block[words[1]] = (block[words[1]] ^ block[words[2]]) >>> 0;
    block[words[1]] = ((block[words[1]] << 12) | (block[words[1]] >>> (32 - 12))) >>> 0;
    block[words[0]] = (block[words[0]] + block[words[1]]) >>> 0;
    block[words[3]] = (block[words[3]] ^ block[words[0]]) >>> 0;
    block[words[3]] = ((block[words[3]] << 8) | (block[words[3]] >>> (32 - 8))) >>> 0;
    block[words[2]] = (block[words[2]] + block[words[3]]) >>> 0;
    block[words[1]] = (block[words[1]] ^ block[words[2]]) >>> 0;
    block[words[1]] = ((block[words[1]] << 7) | (block[words[1]] >>> (32 - 7))) >>> 0;
}

function drawChaChaEncryptionFromKey(canvas, initBlock, dataStream, chachaStream, xorStream, x = 15, y = 15, keyOffset = 390, size = 8) {
    drawChaChaWithBlockArrow(canvas, initBlock, x, y + size * 19, size, x + size * 32 + 20, x + keyOffset - 20);
    drawChaChaEncryption(canvas, dataStream, chachaStream, xorStream, x + keyOffset, y, size);
}

function drawChaChaEncryption(canvas, dataStream, chachaStream, xorStream, x = 15, y = 15, size = 8) {
    drawChaChaBlocks(canvas, dataStream, x, y, size, "#000", "#000");
    drawChaChaBlocks(canvas, chachaStream, x, y + size * 19, size, "#000", "#000");
    drawChaChaBlocks(canvas, xorStream, x, y + size * 38, size, "#000", "#000");
}

function drawChaChaLables(canvas, indices, labels = CHACHAWORDLABELS, x = 15, y = 15, size = 24, font = "bold 40px JetBrains Mono") {
    initializeCanvasText(canvas, "center", font);
    for (let i = 0; i < 4; i++) {
        canvas.fillText(labels[i], 
            x + size * 4 + size * 8 * (indices[i] % 4),
            y + size * 2 + size * 4 * Math.floor(indices[i] / 4),
        );
    }
}

function drawBitBlockOutline(canvas, x, y, sizeX, sizeY, dimensionX, dimensionY, color = "#000") {
    canvas.lineWidth = LINEWIDTH;
    canvas.strokeStyle = color;
    canvas.beginPath();
    for (let i = 0; i <= dimensionY; i++) {
        canvas.moveTo(x, y + i * sizeY);
        canvas.lineTo(x + sizeX * dimensionX, y + i * sizeY);
    }
    for (let i = 0; i <= dimensionX; i++) {
        canvas.moveTo(x + i * sizeX, y);
        canvas.lineTo(x + i * sizeX, y + sizeY * dimensionY);
    }
    canvas.stroke();
}

function drawChaChaWord(canvas, word, x, y, size, color) {
    canvas.fillStyle = color;
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 8; col++) {
            const bitIndex = 31 - (row * 8 + col);
            if ((word >>> bitIndex) & 1) canvas.fillRect(x + col * size, y + row * size, size, size);
        }
    }
}

function drawChaChaBlock(canvas, block, x = 15, y = 15, size = 24, color = "#ccc", inline = "#999", outline = "#000") {
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++)
            drawChaChaWord(canvas, block[i * 4 + j], x + j * size * 8, y + i * size * 4, size, color);
    drawBitBlockOutline(canvas, x, y, size, size, 32, 16, inline);
    drawBitBlockOutline(canvas, x, y, size * 8, size * 4, 4, 4, outline);
}

function drawChaChaBlocks(canvas, block, x = 15, y = 15, size = 10, color = "#000", inline = "#000", outline = "#000", rows = 1) {
    for (let i = 0; i < Math.floor(block.length / 16); i++)
        drawChaChaBlock(canvas, block.slice(i * 16, i * 16 + 16), x + size * 32 * Math.floor(i / rows), y + size * 16 * (i % rows), size, color, inline, outline);
}

function drawLock(canvas, x, y, lock = true, size = 10) {
    canvas.lineWidth = LINEWIDTH;
    canvas.beginPath();
    canvas.moveTo(x - size, y - size);
    canvas.lineTo(x + size, y - size);
    canvas.lineTo(x + size, y + 0.8 * size);
    canvas.lineTo(x - size, y + 0.8 * size);
    canvas.lineTo(x - size, y - size);
    canvas.lineTo(x + size, y - size);
    canvas.fill();
    canvas.moveTo(x - 0.6 * size, y - size);
    canvas.arc(x, y - 1.8 * size, 0.6 * size, Math.PI, 0);
    if (lock) canvas.lineTo(x + 0.6 * size, y - size);
    canvas.stroke();
}

function drawLetterShift(canvas, key, text, spanKey, direction = 1, secondChain = true, y = 15) {
    let ciphertext = shiftLetters(text, key, direction);
    drawLetterChain(canvas, text, y);
    if (secondChain) drawLetterChain(canvas, ciphertext, y + 260);
    drawShiftArrows(canvas, key, Math.min(text.length, LETTERBOXLENGTH), sign(direction), y + 120);
    if (spanKey) spanKey.innerHTML = key;
    return ciphertext;
}

function XORStringArray(binaryString, binaryArray) {
    let result = '';
    for (let i = 0; i < binaryString.length; i++) {
        const bitString = parseInt(binaryString[i], 10);
        const bitArray = binaryArray[i];
        result += (bitString ^ bitArray).toString();
    }
    return result;
}

function getArrayFromString(string) {
    const numbers = string.split(',').map(num => parseInt(num.trim()))
        .filter(num => num >= 0 && num < 26 && Number.isInteger(num));
    if (numbers.length == 0)
        return [0];
    return numbers;
}

function generateKey(length, modulus) {
    return Array.from({ length: length }, () => Math.floor(Math.random() * modulus));
}

function drawShiftArrows(canvas, key, length, sign = "+", y = 135, x = 15) {
    initializeCanvasText(canvas);
    canvas.lineWidth = LINEWIDTH;
    for (let i = 0; i < length; i++) {
        let xOffset = x + i * LETTERBOXWIDTH + LETTERBOXWIDTH / 2;
        canvas.fillText(sign + key[i % key.length], xOffset, y + 60);
        canvas.beginPath();
        canvas.moveTo(xOffset, y);
        canvas.lineTo(xOffset, y + 40);
        canvas.stroke();
        drawArrow(canvas, true, 1, xOffset, y + 80, y + 120);
    }
}

function drawArrow(canvas, vertical, downright, offset, start, end) {
    canvas.beginPath();
    if (vertical) {
        canvas.moveTo(offset, start);
        canvas.lineTo(offset, end);
        canvas.moveTo(offset - 10, end - downright * 10);
        canvas.lineTo(offset, end);
        canvas.lineTo(offset + 10, end - downright * 10);
    } else {
        canvas.moveTo(start, offset);
        canvas.lineTo(end, offset);
        canvas.moveTo(end - downright * 10, offset - 10);
        canvas.lineTo(end, offset);
        canvas.lineTo(end - downright * 10, offset + 10);
    }
    canvas.stroke();
}

function shiftLetters(plaintext, key, sign = 1) {
    let ciphertext = '';
    plaintext = plaintext.toUpperCase();
    for (let i = 0; i < plaintext.length; i++) {
        let currentChar = plaintext[i];
        let currentShift = key[i % key.length];
        let encryptedChar = ' ';
        if (currentChar.charCodeAt(0) >= 65 && currentChar.charCodeAt(0) < 91)
            encryptedChar = String.fromCharCode((((currentChar.charCodeAt(0) - 65 + sign * currentShift) % 26) + 26) % 26 + 65);
        ciphertext += encryptedChar;
    }
    return ciphertext;
}

function getLetterPosition(letter) {
    letter = letter.toUpperCase();
    let position = letter.charCodeAt(0) - 64;
    if (position >= 1 && position <= 26)
        return position;
    else
        return " ";
}

function drawLetterChain(canvas, text, y = 15, x = 15) {
    canvas.lineWidth = LINEWIDTH;
    for (let i = 0; i < LETTERBOXLENGTH; i++)
        if (text[i]) drawLetterBox(canvas, text[i], x + (i * LETTERBOXWIDTH), y, LETTERBOXHEIGHT);
}

function drawLetterBox(canvas, letter, x, y) {
    initializeCanvasText(canvas, "center", "32px JetBrains Mono");
    canvas.fillText(letter, x + LETTERBOXWIDTH / 2, y + LETTERBOXHEIGHT / 2);
    initializeCanvasText(canvas, "right","20px JetBrains Mono", "ideographic");
    canvas.fillText(getLetterPosition(letter), x + LETTERBOXWIDTH - LETTERINDEXOFFSETY, y + LETTERBOXHEIGHT - LETTERINDEXOFFSETY)
    canvas.beginPath();
    canvas.moveTo(x, y);
    canvas.lineTo(x, y + LETTERBOXHEIGHT);
    canvas.lineTo(x + LETTERBOXWIDTH, y + LETTERBOXHEIGHT);
    canvas.lineTo(x + LETTERBOXWIDTH, y);
    canvas.lineTo(x, y);
    canvas.stroke();
}

function sign(number) {
    if (number < 0)
        return "-";
    return "+";
}

function initializeProgressBar(bar, maximum, value) {
    bar.max = maximum;
    bar.value = value;
}

function initializeSliders(sliderID, minimum, maximum, step, value) {
    const slider = document.getElementById(sliderID);
    slider.min = minimum;
    slider.max = maximum;
    slider.step = step;
    slider.value = value;
    return slider;
}

function initializeCanvas(canvasID, height, width = WIDTH) {
    const canvas = document.getElementById(canvasID).getContext("2d");
    canvas.canvas.width = width;
    canvas.canvas.height = height;
    return canvas;
}

function initializeCanvasText(canvas, horizontal = "center", font = "25px JetBrains Mono", vertical = "middle", color = "#000") {
    canvas.font = font;
    canvas.textBaseline = vertical;
    canvas.textAlign = horizontal;
    canvas.fillStyle = color;
}
