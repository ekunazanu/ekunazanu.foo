const WIDTH = 1280;
const LINEWIDTH = 2
const LETTERS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const LETTERBOXLENGTH = 16;
const LETTERBOXHEIGHT = 100;
const LETTERBOXWIDTH = 76;
const LETTERINDEXOFFSETX = 5;
const LETTERINDEXOFFSETY = 5;
const CHACHAWORDLABELS = ["a", "b", "c", "d"];
const CHACHACONSTANTS = [0x61707865, 0x3320646e, 0x79622d32, 0x6b206574];
const CHACHAWORDPERMS = [[[0, 5, 10, 15], [1, 6, 11, 12], [2, 7, 8, 13], [3, 4, 9, 14]],
                         [[0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15]]];
const CHACHASAT = new Array(16).fill(0xFFFFFFFF);
const CHACHAZRO = new Array(16).fill(0x00000000);
const GRAY = "#555";
const LGRAY = "#888";
const BLACK = "#000";
const DIFFCOLOR = "#8bd";
const HIGHCOLOR = "#f08";
const DISTCOLORS = ["#000", "#fc9", "#9cf", "#eaf", "#7a9", "#bbb"];
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
const EG_CHACHASTRUCT = createEncryptionStreams(EG_CHACHAINITBLOCK, 5);
const EG_CHACHADATASTREAM = EG_CHACHASTRUCT.dataStream;
const EG_CHACHAKEYSTREAM = EG_CHACHASTRUCT.chachaStream;
const EG_CHACHACIPHERSTREAM = EG_CHACHASTRUCT.xorStream;
const EG_DATA_STREAMS = [HEXCHECKER, HEXVSTRIPE2, HEXHSTRIPE2, HEXHSTRIPE3];
const LETTERPROBDIST = [0.08167, 0.01492, 0.02782, 0.04253, 0.12702, 0.02228, 0.02015, 0.06094, 0.06966, 0.00153, 0.00772, 0.04025, 0.02406, 0.06749, 0.07507, 0.01929, 0.00095, 0.05987, 0.06327, 0.09056, 0.02758, 0.00978, 0.02360, 0.00150, 0.01974, 0.00074];


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


const LETTERPROBDIST_SEPARATE = getDisparateDistributions([4, 0, 1, 2, 3]);
const arrayLetterFrequencyStaticKey = [[1], [1, 2]];
const canvasLetterFrequencyStatic = [];
for (let i = 0; i < 2; i++) {
    canvasLetterFrequencyStatic[i] = initializeCanvas(`canvasLetterFrequencyStatic${i}`, 870)
    drawDistribution(canvasLetterFrequencyStatic[i], LETTERPROBDIST_SEPARATE);
    drawDistribution(canvasLetterFrequencyStatic[i], getFrequencyDistributionFromKey(LETTERPROBDIST_SEPARATE, arrayLetterFrequencyStaticKey[i]), 15, 445);
}


let varLetterFrequencyKey = Array.from({ length: 26 }, (_, i) => i);
let arrayLetterFrequencyTDistribution = [];
const linkLetterFrequencyUniform = document.getElementById("linkLetterFrequencyUniform");
const linkLetterFrequencyGaussian = document.getElementById("linkLetterFrequencyGaussian");
const linkLetterFrequencyPerfect = document.getElementById("linkLetterFrequencyPerfect");
const canvasLetterFrequency = initializeCanvas("canvasLetterFrequency", 870);
const inputLetterFrequencyKey = document.getElementById("inputLetterFrequencyKey");
const spanLetterFrequencyKey = document.getElementById("spanLetterFrequencyKey");
inputLetterFrequencyKey.value = varLetterFrequencyKey;
drawDistribution(canvasLetterFrequency, LETTERPROBDIST_SEPARATE);
inputLetterFrequencyKey.addEventListener("input", updateLetterFrequency);
linkLetterFrequencyGaussian.addEventListener("click", () => {
    inputLetterFrequencyKey.value = returnGaussianValues(25);
    updateLetterFrequency();
});
linkLetterFrequencyUniform.addEventListener("click", () => {
    inputLetterFrequencyKey.value = Array.from({ length: 25 }, () => Math.floor(Math.random() * 26));
    updateLetterFrequency();
});
linkLetterFrequencyPerfect.addEventListener("click", () => {
    inputLetterFrequencyKey.value = Array.from({ length: 26 }, (_, i) => i);
    updateLetterFrequency();
});
function updateLetterFrequency() {
    canvasLetterFrequency.clearRect(0, 440, WIDTH, 430);
    varLetterFrequencyKey = getArrayFromString(inputLetterFrequencyKey.value);
    arrayLetterFrequencyTDistribution = getFrequencyDistributionFromKey(LETTERPROBDIST_SEPARATE, varLetterFrequencyKey);
    drawDistribution(canvasLetterFrequency, arrayLetterFrequencyTDistribution, 15, 445);
    spanLetterFrequencyKey.innerHTML = varLetterFrequencyKey;
}
updateLetterFrequency();


const arrayLetterFrequencyStaticMultipleDistributions = [];
const arrayLetterFrequencyStaticMultipleKeys = [[9], [18], [1]];
const arrayLetterFrequencyStaticMultipleColors = [["#9b8"], ["#c9d"], ["#7ce"]];
const canvasLetterFrequencyStaticMultiple = initializeCanvas("canvasLetterFrequencyStaticMultiple", 850);
arrayLetterFrequencyStaticMultipleDistributionC = getFrequencyDistributionFromKey(LETTERPROBDIST_SEPARATE, arrayLetterFrequencyStaticMultipleKeys.flat());
drawCipherRects(canvasLetterFrequencyStaticMultiple, arrayLetterFrequencyStaticMultipleColors);
drawDistribution(canvasLetterFrequencyStaticMultiple, arrayLetterFrequencyStaticMultipleDistributionC, 15, 155, LETTERS, 9, ["#000"], 32, 140);
for (let i = 0; i < arrayLetterFrequencyStaticMultipleKeys.length; i++) {
    arrayLetterFrequencyStaticMultipleDistributions[i] = getFrequencyDistributionFromKey(LETTERPROBDIST_SEPARATE, arrayLetterFrequencyStaticMultipleKeys[i]);
    drawDistribution(canvasLetterFrequencyStaticMultiple, arrayLetterFrequencyStaticMultipleDistributions[i], 15, 330 + i * 170, LETTERS, 7, arrayLetterFrequencyStaticMultipleColors[i], 32, 140);
}


let varMapPlainCipherCardinality = 2;
let arrayMapPlainCipherKey = [];
let arrayMapPlainCipherPlaintextSymbols = [];
const varMapPlainCipherCiphertextSymbol = 12;
const canvasMapPlainCipher = initializeCanvas("canvasMapPlainCipher", 370);
const sliderMapPlainCipher = initializeSliders("sliderMapPlainCipher", 1, 26, 1, varMapPlainCipherCardinality);
const spanMapPlainCipher = document.getElementById("spanMapPlainCipher");
sliderMapPlainCipher.addEventListener("input", updateMapPlainCipher);
function updateMapPlainCipher() {
    canvasMapPlainCipher.clearRect(0, 0, WIDTH, 420);
    drawDistributionLabels(canvasMapPlainCipher, LETTERS, 37, 85);
    drawDistributionLabels(canvasMapPlainCipher, LETTERS, 37, 205);
    initializeCanvasText(canvasMapPlainCipher, "left");
    canvasMapPlainCipher.fillText("Plaintext Symbols", 25, 35);
    canvasMapPlainCipher.fillText("Ciphertext Symbols", 25, 255);
    varMapPlainCipherCardinality = sliderMapPlainCipher.value;
    arrayMapPlainCipherKey = generateKeysUnique(varMapPlainCipherCardinality);
    arrayMapPlainCipherPlaintextSymbols = getSymbols(varMapPlainCipherCiphertextSymbol, arrayMapPlainCipherKey);
    for (let symbol = 0; symbol < 26; symbol++)
        drawFunctionMap(canvasMapPlainCipher, arrayMapPlainCipherKey, symbol);
    drawFunctionMap(canvasMapPlainCipher, arrayMapPlainCipherKey, varMapPlainCipherCiphertextSymbol, "#000");
    canvasMapPlainCipher.fillText(`${LETTERS[varMapPlainCipherCiphertextSymbol]} ← ${arrayMapPlainCipherPlaintextSymbols}`, 25, 345);
    spanMapPlainCipher.innerHTML = varMapPlainCipherCardinality + " [" + (arrayMapPlainCipherKey.length > 8 ? arrayMapPlainCipherKey.slice(0, 8).join(", ") + ", ..." : arrayMapPlainCipherKey.join(", ")) + "]";
}
updateMapPlainCipher();


let varOneTimePadText = "Encrypting stuff";
let varOneTimePadKey = generateKey(varOneTimePadText.length, 26);
const canvasOneTimePad = initializeCanvas("canvasOneTimePad", 390);
const inputOneTimePad = document.getElementById("inputOneTimePad");
const spanOneTimePad = document.getElementById("spanOneTimePad");
initializeCanvasText(canvasOneTimePad);
inputOneTimePad.value = varOneTimePadText;
inputOneTimePad.addEventListener("input", updateOneTimePad);
function updateOneTimePad() {
    canvasOneTimePad.clearRect(0, 0, WIDTH, 390);
    varOneTimePadKey = generateKey((inputOneTimePad.value).length, 26);
    drawLetterShift(canvasOneTimePad, varOneTimePadKey, inputOneTimePad.value, spanOneTimePad);
}
updateOneTimePad();


const canvasOTPReuse = initializeCanvas("canvasOTPReuse", 1124);
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


let varVernamText = "0000000011111111";
let varVernamKey = generateKey(varVernamText.length, 2);
const canvasVernam = initializeCanvas("canvasVernam", 650);
const canvasVernamXOR = initializeCanvas("canvasVernamXOR", 650);
const inputVernam = document.getElementById("inputVernam");
const spanVernam = document.getElementById("spanVernam");
const spanVernamXOR = document.getElementById("spanVernamXOR");
const arrayVernamOperators = ["+", "^"];
const arrayVernamCanvases = [canvasVernam, canvasVernamXOR];
const arrayVernamSpans = [spanVernam, spanVernamXOR];
initializeCanvasText(canvasVernam);
initializeCanvasText(canvasVernamXOR);
inputVernam.value = varVernamText;
inputVernam.addEventListener("input", updateVernam);
function updateVernam() {
    varVernamText = (inputVernam.value).replace(/[^01]/g, '');
    varVernamKey = generateKey(varVernamText.length, 2);
    let varVernamCiphertext = XORStringArray(varVernamText, varVernamKey);
    for (let i = 0; i < 2; i++) {
        arrayVernamCanvases[i].clearRect(0, 0, WIDTH, 650);
        drawLetterChain(arrayVernamCanvases[i], varVernamText);
        drawLetterChain(arrayVernamCanvases[i], varVernamCiphertext, 275);
        drawLetterChain(arrayVernamCanvases[i], varVernamText, 535);
        drawShiftArrows(arrayVernamCanvases[i], varVernamKey, Math.min(varVernamText.length, LETTERBOXLENGTH), arrayVernamOperators[i]);
        drawShiftArrows(arrayVernamCanvases[i], varVernamKey, Math.min(varVernamText.length, LETTERBOXLENGTH), arrayVernamOperators[i], 395);
        arrayVernamSpans[i].innerHTML = varVernamKey;
    }
}
updateVernam();


const canvasVernamReuse = initializeCanvas("canvasVernamReuse", 1124);
const arrayVernamReuseKey = EG_CHACHAKEYSTREAM.slice(0, 32);
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
    canvasKeyExchange.fillText(PARTYLABELS[i], 15, 135 + i * 600);
    drawArrow(canvasKeyExchange, true, (i === 0) ? 1 : -1, 143, (i === 0) ? 325 : 737, (i === 0) ? 737 : 325);
}
drawChaChaEncryptionFromKey(canvasKeyExchange, EG_CHACHAINITBLOCK, EG_CHACHADATASTREAM, EG_CHACHAKEYSTREAM, EG_CHACHACIPHERSTREAM);
drawChaChaEncryptionFromKey(canvasKeyExchange, EG_CHACHAINITBLOCK, EG_CHACHACIPHERSTREAM, EG_CHACHAKEYSTREAM, EG_CHACHADATASTREAM, 15, 615);
drawArrow(canvasKeyExchange, true, 1, 869, 495, 567);
drawLock(canvasKeyExchange, 175, 533);


const canvasChaChaSingle = initializeCanvas("canvasChaChaSingle", 480);
const arrayChaChaSingle = EG_CHACHAKEYSTREAM.slice(0, 16);
const arrayChaChaSingleXOR = createXORStream(EG_CHACHADATASTREAM, arrayChaChaSingle);
drawChaChaEncryptionFromKey(canvasChaChaSingle, EG_CHACHAINITBLOCK, EG_CHACHADATASTREAM, arrayChaChaSingle, arrayChaChaSingleXOR);


const canvasChaChaPartition = initializeCanvas("canvasChaChaPartition", 606);
const arrayChaChaPartitionIndices = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]];
const arrayChaChaPartitionLabels = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]];
drawChaChaBlock(canvasChaChaPartition, EG_CHACHAINITBLOCK, 15, 15, 8, "#000", "#000");
drawChaChaBlock(canvasChaChaPartition, EG_CHACHAINITBLOCK, 15, 205);
for (let i = 0; i < 4; i++)
    drawChaChaLables(canvasChaChaPartition, arrayChaChaPartitionIndices[i], arrayChaChaPartitionLabels[i], 15, 205);


let varChaChaARXRound = 1;
let varChaChaARXOperation = 0;
let arrayChaChaARXBlock = [...EG_CHACHAINITBLOCK];
const canvasChaChaARX = initializeCanvas("canvasChaChaARX", 414);
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
    if (varChaChaARXOperation >= 80) return
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
    if (varChaChaAvalancheOperation >= 80) return
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


const canvasChaChaPartitionSequence = initializeCanvas("canvasChaChaPartitionSequence", 414);
drawChaChaBlock(canvasChaChaPartitionSequence, EG_CHACHAINITBLOCK);
drawChaChaLables(canvasChaChaPartitionSequence, [12, 13, 14, 15], ["Counter", "Counter", "Nonce", "Nonce"], 15, 15, 24, "bold 36px JetBrains Mono");


let varChaChaCounter = 0;
const varChaChaCounterBlockLength = 7;
const canvasChaChaCounter = initializeCanvas("canvasChaChaCounter", 590);
const buttonChaChaCounterIncrement = document.getElementById("buttonChaChaCounterIncrement");
const buttonChaChaCounterDecrement = document.getElementById("buttonChaChaCounterDecrement");
const spanChaChaCounter = document.getElementById("spanChaChaCounter");
const structChaChaCounter = [createEncryptionStreams(EG_CHACHAINITBLOCK, varChaChaCounterBlockLength)];
buttonChaChaCounterIncrement.addEventListener("click", () => {
    varChaChaCounter += 1;
    updateChaChaCounter(); });
buttonChaChaCounterDecrement.addEventListener("click", () => {
    if (varChaChaCounter <= 0) return;
    varChaChaCounter -= 1;
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
    varChaChaRepeatCounter += 1;
    updateChaChaCounterRepeat(); });
buttonChaChaCounterRepeatDecrement.addEventListener("click", () => {
    if (varChaChaRepeatCounter <= 0) return;
    varChaChaRepeatCounter -= 1;
    updateChaChaCounterRepeat(); });
function updateChaChaCounterRepeat() {
    canvasChaChaCounterRepeat.clearRect(0, 0, WIDTH, 1140);
    drawChaChaCountNonce(canvasChaChaCounterRepeat, EG_CHACHAKEY, structChaChaCounterRepeat, varChaChaRepeatCounter, 0, 15, 15, 6, 220, 66);
    drawChaChaBlocks(canvasChaChaCounterRepeat, arrayChaChaCounterRepeatXOR, 15, 1027, 6);
    if (varChaChaRepeatCounter < structChaChaCounterRepeat[0].length) drawRectangle(canvasChaChaCounterRepeat, 15 + varChaChaRepeatCounter * 32 * 6, 745, 32 * 6, 16 * 6, HIGHCOLOR, 6);
}
updateChaChaCounterRepeat();


let varChaChaNonce = 0;
let varChaChaNonceCounter = 0;
const varChaChaNonceBlockLength = 10;
const canvasChaChaNonce = initializeCanvas("canvasChaChaNonce", 1046);
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
    varChaChaNonce += 1;
    updateChaChaNonce(); });
buttonChaChaNonceDecrement.addEventListener("click", () => {
    if (varChaChaNonce <= 0) return;
    varChaChaNonce -= 1;
    updateChaChaNonce(); });
buttonChaChaNonceCounterIncrement.addEventListener("click", () => {
    varChaChaNonceCounter += 1;
    updateChaChaNonce(); });
buttonChaChaNonceCounterDecrement.addEventListener("click", () => {
    if (varChaChaNonceCounter <= 0) return;
    varChaChaNonceCounter -= 1;
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


const canvasChaChaPartitionConstants = initializeCanvas("canvasChaChaPartitionConstants", 414);
drawChaChaBlock(canvasChaChaPartitionConstants, EG_CHACHAINITBLOCK);
drawChaChaLables(canvasChaChaPartitionConstants, [0, 1, 2, 3], ["Constant", "Constant", "Constant", "Constant"], 15, 15, 24, "bold 32px JetBrains Mono");


const canvasChaChaPartitionKey = initializeCanvas("canvasChaChaPartitionKey", 414);
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
drawChaChaEncryptionFromKey(canvasStructuredKeyExchange, EG_CHACHAINITBLOCK, EG_CHACHADATASTREAM, EG_CHACHAKEYSTREAM, EG_CHACHACIPHERSTREAM);
drawChaChaEncryptionFromKey(canvasStructuredKeyExchange, EG_CHACHAINITBLOCK, EG_CHACHACIPHERSTREAM, EG_CHACHAKEYSTREAM, EG_CHACHADATASTREAM, 15, 615);


// for the next few illustrations
const AUTH_MESSAGE_ORIG = EG_CHACHADATASTREAM.slice(16 * 3, 16 * 4);
const AUTH_CIPHER_ORIG = EG_CHACHACIPHERSTREAM.slice(16 * 3, 16 * 4);
const AUTH_MESSAGE_MODF = new Array(16).fill(HEXHSTRIPE3);
const AUTH_XOR_ORIG_MODF = createXORStream(AUTH_MESSAGE_ORIG, AUTH_MESSAGE_MODF);
const AUTH_CIPHER_MODF = createXORStream(AUTH_XOR_ORIG_MODF, AUTH_CIPHER_ORIG);
const AUTH_CIPHERSTREAM_MODF = EG_CHACHACIPHERSTREAM.slice(0, 16 * 3).concat(AUTH_CIPHER_MODF);
const AUTH_CIPHERSTREAM_MODF_LONG = AUTH_CIPHERSTREAM_MODF.concat(EG_CHACHACIPHERSTREAM.slice(16 * 4));
const AUTH_DATASTREAM_MODF_LONG = createXORStream(AUTH_CIPHERSTREAM_MODF_LONG, EG_CHACHAKEYSTREAM);
const AUTH_DATASTREAM_MODF = AUTH_DATASTREAM_MODF_LONG.slice(0, 16 * 4);
const AUTH_DATASTREAM_ORIG = EG_CHACHADATASTREAM.slice(0, 16 * 4)
const AUTH_CIPHERSTREAM_ORIG = EG_CHACHACIPHERSTREAM.slice(0, 16 * 4);
const AUTH_KEYSTREAM = EG_CHACHAKEYSTREAM.slice(0, 16 * 4);
const AUTH_DATASTREAM_ORIG_SHORT = EG_CHACHADATASTREAM.slice(0, 16 * 2)
const AUTH_CIPHERSTREAM_ORIG_SHORT = EG_CHACHACIPHERSTREAM.slice(0, 16 * 2);
const AUTH_KEYSTREAM_SHORT = EG_CHACHAKEYSTREAM.slice(0, 16 * 2);
const AUTH_UNIT_BLOCKS = [[AUTH_MESSAGE_ORIG, 15, 495, "m"], [AUTH_MESSAGE_MODF, 15, 639, "m'"], [AUTH_XOR_ORIG_MODF, 15, 783, "m^m'"], [AUTH_CIPHER_ORIG, 399, 495, "c"], [AUTH_XOR_ORIG_MODF, 399, 639, "m^m'"], [AUTH_CIPHER_MODF, 399, 783, "c^m^m'"]];
const AUTH_CHECKSUM_ORIG = calculateHash(AUTH_CIPHERSTREAM_ORIG);
const AUTH_CHECKSUM_MODF = calculateHash(AUTH_CIPHERSTREAM_MODF);
const AUTH_CHECKSUM_CIPHER_ORIG = calculateHash(AUTH_CIPHER_ORIG);
const AUTH_CHECKSUM_CIPHER_MODF = calculateHash(AUTH_CIPHER_MODF);


const canvasBitFlip = initializeCanvas("canvasBitFlip", 1410);
const arrayBitFlipBlockRects = [[15, 495, "#f81"], [783, 15, "#f81"], [15, 639, "#69f"], [783, 1263, "#69f"], [399, 495, "#e9f"], [783, 319, "#e9f"], [399, 783, "#8d8"], [783, 959, "#8d8"]];
initializeCanvasText(canvasBitFlip, "right");
canvasBitFlip.fillText("Sender", 1275, 477);
canvasBitFlip.fillText("Receiver", 1275, 929);
canvasBitFlip.textAlign = "left";
drawChaChaEncryption(canvasBitFlip, EG_CHACHADATASTREAM, EG_CHACHAKEYSTREAM, EG_CHACHACIPHERSTREAM, 15, 15, 8);
drawChaChaEncryption(canvasBitFlip, AUTH_CIPHERSTREAM_MODF_LONG, EG_CHACHAKEYSTREAM, AUTH_DATASTREAM_MODF_LONG, 15, 959, 8);
for (let i = 0; i < AUTH_UNIT_BLOCKS.length; i++) {
    drawChaChaBlocks(canvasBitFlip, AUTH_UNIT_BLOCKS[i][0], AUTH_UNIT_BLOCKS[i][1], AUTH_UNIT_BLOCKS[i][2], 8);
    canvasBitFlip.fillText(AUTH_UNIT_BLOCKS[i][3], AUTH_UNIT_BLOCKS[i][1] + 270, AUTH_UNIT_BLOCKS[i][2] + 120);
}
for (let i = 0; i < arrayBitFlipBlockRects.length; i++)
    drawRectangle(canvasBitFlip, arrayBitFlipBlockRects[i][0], arrayBitFlipBlockRects[i][1], 256, 128, arrayBitFlipBlockRects[i][2], 6);
drawOrthoArrow(canvasBitFlip, [[911, 467], [911, 559], [675, 559]]);
drawOrthoArrow(canvasBitFlip, [[675, 847], [911, 847], [911, 941]]);
drawOrthoArrow(canvasBitFlip, [[291, 847], [335, 847], [335, 705], [379, 705]]);


let arrayChecksumPointers = [0, 0, 0, 0, 1, 0, 0];
arrayChecksumPointers[6] = calculateHash(AUTH_CIPHERSTREAM_ORIG_SHORT);
const canvasChecksum = initializeCanvas("canvasChecksum", 460);
const spanChecksumByte = document.getElementById("spanChecksumByte");
const spanChecksumHash = document.getElementById("spanChecksumHash");
const buttonChecksumIncrement = document.getElementById("buttonChecksumIncrement");
buttonChecksumIncrement.addEventListener("click", updateChecksum);
function updateChecksum() {
    if (arrayChecksumPointers[0] >= AUTH_CIPHERSTREAM_ORIG_SHORT.length) return;
    updateHashGeneral(canvasChecksum, arrayChecksumPointers);
    spanChecksumByte.innerHTML = toHexString(arrayChecksumPointers[1]);
    spanChecksumHash.innerHTML = `${toHexString(arrayChecksumPointers[2])} [${toHexString(arrayChecksumPointers[3])} + ${toHexString(arrayChecksumPointers[1])}]`;
    arrayChecksumPointers[0]++;
}
updateChecksum();


const canvasAuthentication = initializeCanvas("canvasAuthentication", 1410);
drawChaChaEncryption(canvasAuthentication, AUTH_DATASTREAM_ORIG, AUTH_KEYSTREAM, AUTH_CIPHERSTREAM_ORIG, 15, 15, 8);
drawChaChaEncryption(canvasAuthentication, AUTH_CIPHERSTREAM_MODF, AUTH_KEYSTREAM, AUTH_DATASTREAM_MODF, 15, 959, 8);
drawHash(canvasAuthentication, AUTH_CHECKSUM_ORIG);
drawHash(canvasAuthentication, AUTH_CHECKSUM_MODF, 1119, 1023);
canvasAuthentication.fillText(toHexString(AUTH_CHECKSUM_ORIG), 1119, 973);
for (let i = 0; i < AUTH_UNIT_BLOCKS.length; i++) {
    drawChaChaBlocks(canvasAuthentication, AUTH_UNIT_BLOCKS[i][0], AUTH_UNIT_BLOCKS[i][1], AUTH_UNIT_BLOCKS[i][2], 8);
    canvasAuthentication.fillText(AUTH_UNIT_BLOCKS[i][3], AUTH_UNIT_BLOCKS[i][1] + 270, AUTH_UNIT_BLOCKS[i][2] + 120);
}
drawOrthoArrow(canvasAuthentication, [[911, 467], [911, 559], [675, 559]]);
drawOrthoArrow(canvasAuthentication, [[675, 847], [911, 847], [911, 941]]);
drawOrthoArrow(canvasAuthentication, [[291, 847], [335, 847], [335, 705], [379, 705]]);
drawArrow(canvasAuthentication, true, 1, 1189, 423, 933);


const canvasMalhash = initializeCanvas("canvasMalhash", 1410);
const varMalhashDifference = (AUTH_CHECKSUM_ORIG >>> 0) - (AUTH_CHECKSUM_CIPHER_ORIG >>> 0);
const arrayMalhashTexts = [[AUTH_CHECKSUM_ORIG, 740, 519], [varMalhashDifference, 740, 599], [varMalhashDifference, 740, 807], [AUTH_CHECKSUM_MODF, 740, 887], [AUTH_CHECKSUM_MODF, 1119, 973]];
const arrayMalhashHashes = [[AUTH_CHECKSUM_ORIG, 1119, 383], [AUTH_CHECKSUM_MODF, 1119, 1023], [AUTH_CHECKSUM_CIPHER_ORIG, 740, 559], [AUTH_CHECKSUM_CIPHER_MODF, 740, 847]];
drawChaChaEncryption(canvasMalhash, AUTH_DATASTREAM_ORIG, AUTH_KEYSTREAM, AUTH_CIPHERSTREAM_ORIG, 15, 15, 8);
drawChaChaEncryption(canvasMalhash, AUTH_CIPHERSTREAM_MODF, AUTH_KEYSTREAM, AUTH_DATASTREAM_MODF, 15, 959, 8);
for (let i = 0; i < AUTH_UNIT_BLOCKS.length; i++)
    drawChaChaBlocks(canvasMalhash, AUTH_UNIT_BLOCKS[i][0], AUTH_UNIT_BLOCKS[i][1], AUTH_UNIT_BLOCKS[i][2], 8);
for (let i = 0; i < arrayMalhashHashes.length; i++)
    drawHash(canvasMalhash, arrayMalhashHashes[i][0], arrayMalhashHashes[i][1], arrayMalhashHashes[i][2]);
for (let i = 0; i < arrayMalhashTexts.length; i++)
    canvasMalhash.fillText(toHexString(arrayMalhashTexts[i][0]), arrayMalhashTexts[i][1], arrayMalhashTexts[i][2]);
drawOrthoArrow(canvasMalhash, [[1189, 423], [1189, 519], [913, 519]]);
drawOrthoArrow(canvasMalhash, [[913, 887], [1189, 887], [1189, 933]]);
drawArrow(canvasMalhash, true, 1, 815, 637, 769);


let arrayKeyedhashPointers = [0, 0, 0, 0, 1, 0, 0];
arrayKeyedhashPointers[4] = Math.floor(Math.random() * 0xFFFFFFFF);
arrayKeyedhashPointers[6] = calculateHash(AUTH_CIPHERSTREAM_ORIG_SHORT, arrayKeyedhashPointers[4]);
const canvasKeyedhash = initializeCanvas("canvasKeyedhash", 460);
const spanKeyedhashByte = document.getElementById("spanKeyedhashByte");
const spanKeyedhash = document.getElementById("spanKeyedhash");
const inputKeyedhashKey = document.getElementById("inputKeyedhashKey");
const buttonKeyedhashIncrement = document.getElementById("buttonKeyedhashIncrement");
inputKeyedhashKey.value = toHexString(arrayKeyedhashPointers[4]);
buttonKeyedhashIncrement.addEventListener("click", updateKeyedhash);
inputKeyedhashKey.addEventListener("input", () => { resetHashGeneral(updateKeyedhash, arrayKeyedhashPointers, inputKeyedhashKey) });
function updateKeyedhash() {
    if (arrayKeyedhashPointers[0] >= AUTH_CIPHERSTREAM_ORIG_SHORT.length) return;
    updateHashGeneral(canvasKeyedhash, arrayKeyedhashPointers);
    spanKeyedhashByte.innerHTML = toHexString(arrayKeyedhashPointers[1]);
    spanKeyedhash.innerHTML = `${toHexString(arrayKeyedhashPointers[2])} [(${toHexString(arrayKeyedhashPointers[3])} + ${toHexString(arrayKeyedhashPointers[1])}) * ${toHexString(arrayKeyedhashPointers[4])}]`;
    arrayKeyedhashPointers[0]++;
}
updateKeyedhash();


const varFailhashKey = Math.floor(Math.random() * 0xFFFFFFFF);
const canvasFailhash = initializeCanvas("canvasFailhash", 1410);
const varFailhashOrig = calculateHash(AUTH_CIPHERSTREAM_ORIG, varFailhashKey);
const varFailhashModf = calculateHash(AUTH_CIPHERSTREAM_MODF, varFailhashKey);
const arrayFailhashTexts = [[toHexString(varFailhashOrig), 740, 519], ["??????????", 740, 599], ["??????????", 740, 807], ["??????????", 740, 887], ["??????????", 1119, 973], ["???? (bytes * ?)", 740, 559], ["???? (bytes * ?)", 740, 847]];
drawChaChaEncryption(canvasFailhash, AUTH_DATASTREAM_ORIG, AUTH_KEYSTREAM, AUTH_CIPHERSTREAM_ORIG, 15, 15, 8);
drawChaChaEncryption(canvasFailhash, AUTH_CIPHERSTREAM_MODF, AUTH_KEYSTREAM, AUTH_DATASTREAM_MODF, 15, 959, 8);
drawHash(canvasFailhash, varFailhashOrig, 1119, 383, [varFailhashKey]);
drawHash(canvasFailhash, varFailhashModf, 1119, 1023);
for (let i = 0; i < AUTH_UNIT_BLOCKS.length; i++)
    drawChaChaBlocks(canvasFailhash, AUTH_UNIT_BLOCKS[i][0], AUTH_UNIT_BLOCKS[i][1], AUTH_UNIT_BLOCKS[i][2], 8);
for (let i = 0; i < arrayFailhashTexts.length; i++)
    canvasFailhash.fillText(arrayFailhashTexts[i][0], arrayFailhashTexts[i][1], arrayFailhashTexts[i][2]);
drawOrthoArrow(canvasFailhash, [[1189, 423], [1189, 519], [913, 519]]);
drawOrthoArrow(canvasFailhash, [[913, 887], [1189, 887], [1189, 933]]);
drawArrow(canvasFailhash, false, 1, 559, 675, 725);
drawArrow(canvasFailhash, false, 1, 847, 675, 725);
drawArrow(canvasFailhash, true, 1, 815, 637, 769);
drawLock(canvasFailhash, 1101, 702);
canvasFailhash.moveTo(1073, 383); canvasFailhash.lineTo(1073, 1023);
canvasFailhash.stroke();
canvasFailhash.beginPath();
canvasFailhash.arc(1073, 1023, 6, 0, 2 * Math.PI);
canvasFailhash.fill();
canvasFailhash.strokeStyle = "#fff"; canvasFailhash.lineWidth = 6;
canvasFailhash.beginPath();
canvasFailhash.moveTo(1069, 393); canvasFailhash.lineTo(1069, 1013);
canvasFailhash.moveTo(1077, 393); canvasFailhash.lineTo(1077, 1013);
canvasFailhash.stroke();


let arrayPaddedhashPointers = [0, 0, 0, 0, 1, 0, 0];
arrayPaddedhashPointers[5] = Math.floor(Math.random() * 0xFFFFFFFF) >>> 0;
arrayPaddedhashPointers[6] = calculateHash(AUTH_CIPHERSTREAM_ORIG_SHORT, 1, arrayPaddedhashPointers[5]);
const canvasPaddedhash = initializeCanvas("canvasPaddedhash", 460);
const spanPaddedhash = document.getElementById("spanPaddedhash");
const spanPaddedhashByte = document.getElementById("spanPaddedhashByte");
const spanPaddedhashChecksum = document.getElementById("spanPaddedhashChecksum");
const inputPaddedhashKey = document.getElementById("inputPaddedhashKey");
const buttonPaddedhashIncrement = document.getElementById("buttonPaddedhashIncrement");
inputPaddedhashKey.value = toHexString(arrayPaddedhashPointers[5]);
buttonPaddedhashIncrement.addEventListener("click", updatePaddedhash);
inputPaddedhashKey.addEventListener("input", () => { resetHashGeneral(updatePaddedhash, arrayPaddedhashPointers, false, inputPaddedhashKey) });
function updatePaddedhash() {
    if (arrayPaddedhashPointers[0] >= AUTH_CIPHERSTREAM_ORIG_SHORT.length) return;
    updateHashGeneral(canvasPaddedhash, arrayPaddedhashPointers, 1);
    spanPaddedhashByte.innerHTML = toHexString(arrayPaddedhashPointers[1]);
    spanPaddedhashChecksum.innerHTML = `${toHexString(arrayPaddedhashPointers[2])} [${toHexString(arrayPaddedhashPointers[3])} + ${toHexString(arrayPaddedhashPointers[1])}]`;
    spanPaddedhash.innerHTML = `${toHexString(arrayPaddedhashPointers[2] + arrayPaddedhashPointers[5])} [${toHexString(arrayPaddedhashPointers[2])} + ${toHexString(arrayPaddedhashPointers[5])}]`;
    arrayPaddedhashPointers[0]++;
}
updatePaddedhash();


let arrayMachashPointers = [0, 0, 0, 0, 1, 0, 0];
arrayMachashPointers[4] = Math.floor(Math.random() * 0xFFFFFFFF) >>> 0;
arrayMachashPointers[5] = Math.floor(Math.random() * 0xFFFFFFFF) >>> 0;
arrayMachashPointers[6] = calculateHash(AUTH_CIPHERSTREAM_ORIG_SHORT, arrayMachashPointers[4], arrayMachashPointers[5]);
const canvasMachash = initializeCanvas("canvasMachash", 460);
const spanMachashByte = document.getElementById("spanMachashByte");
const spanMachashChecksum = document.getElementById("spanMachashChecksum");
const spanMachashHashKeyed = document.getElementById("spanMachashHashKeyed");
const spanMachashHashPadded = document.getElementById("spanMachashHashPadded");
const inputMachashKey = document.getElementById("inputMachashKey");
const inputMachashKeyPad = document.getElementById("inputMachashKeyPad");
const buttonMachashIncrement = document.getElementById("buttonMachashIncrement");
inputMachashKey.value = toHexString(arrayMachashPointers[4]);
inputMachashKeyPad.value = toHexString(arrayMachashPointers[5]);
buttonMachashIncrement.addEventListener("click", updateMachash);
inputMachashKey.addEventListener("input", () => { resetHashGeneral(updateMachash, arrayMachashPointers, inputMachashKey, inputMachashKeyPad) });
inputMachashKeyPad.addEventListener("input", () => { resetHashGeneral(updateMachash, arrayMachashPointers, inputMachashKey, inputMachashKeyPad) });
function updateMachash() {
    if (arrayMachashPointers[0] >= AUTH_CIPHERSTREAM_ORIG_SHORT.length) return;
    updateHashGeneral(canvasMachash, arrayMachashPointers);
    spanMachashByte.innerHTML = toHexString(arrayMachashPointers[1]);
    spanMachashHashKeyed.innerHTML = `${toHexString(arrayMachashPointers[2])} [(${toHexString(arrayMachashPointers[3])} + ${toHexString(arrayMachashPointers[1])})) * ${toHexString(arrayMachashPointers[4])}]`;
    spanMachashHashPadded.innerHTML = `${toHexString(arrayMachashPointers[2] + arrayMachashPointers[5])} [${toHexString(arrayMachashPointers[2])} + ${toHexString(arrayMachashPointers[5])}]`;
    arrayMachashPointers[0]++;
}
updateMachash();


let varPoly1305Pointer = 0;
let varPoly1305CurrentHash = 0n;
let varPoly1305CurrentBlock = 0n;
let varPoly1305KeyS = getPoly1305Key();
let varPoly1305KeyR = getPoly1305Key(true);
let varPoly1305Hash = calculatePoly1305(AUTH_CIPHERSTREAM_ORIG_SHORT, varPoly1305KeyR, varPoly1305KeyS);
const canvasPoly1305 = initializeCanvas("canvasPoly1305", 460);
const spanPoly1305Byte = document.getElementById("spanPoly1305Byte");
const spanPoly1305Checksum = document.getElementById("spanPoly1305Checksum");
const spanPoly1305HashKeyed = document.getElementById("spanPoly1305HashKeyed");
const spanPoly1305HashPadded = document.getElementById("spanPoly1305HashPadded");
const buttonPoly1305Increment = document.getElementById("buttonPoly1305Increment");
const buttonPoly1305NewKeys = document.getElementById("buttonPoly1305NewKeys");
buttonPoly1305Increment.addEventListener("click", updatePoly1305);
buttonPoly1305NewKeys.addEventListener("click", () => {
    varPoly1305KeyS = getPoly1305Key();
    varPoly1305KeyR = getPoly1305Key(true);
    varPoly1305Pointer = 0;
    varPoly1305CurrentHash = 0n;
    varPoly1305Hash = calculatePoly1305(AUTH_CIPHERSTREAM_ORIG_SHORT, varPoly1305KeyR, varPoly1305KeyS);
    updatePoly1305();
});
function updatePoly1305() {
    if (varPoly1305Pointer * 4 >= AUTH_CIPHERSTREAM_ORIG_SHORT.length) return;
    varPoly1305CurrentBlock = toBigInt(AUTH_CIPHERSTREAM_ORIG_SHORT.slice(varPoly1305Pointer * 4, varPoly1305Pointer * 4 + 4));
    varPoly1305CurrentHash = calculatePoly1305Block(varPoly1305CurrentBlock, varPoly1305CurrentHash, varPoly1305KeyR);
    canvasPoly1305.clearRect(0, 0, WIDTH, 460);
    drawChaChaEncryption(canvasPoly1305, AUTH_DATASTREAM_ORIG_SHORT, AUTH_KEYSTREAM_SHORT, AUTH_CIPHERSTREAM_ORIG_SHORT, 15, 15, 8);
    drawHash(canvasPoly1305, varPoly1305Hash, 607, 383, [varPoly1305KeyR, varPoly1305KeyS], true);
    drawRectangle(canvasPoly1305, 15 + Math.floor(varPoly1305Pointer / 4) * 256, 319 + (varPoly1305Pointer % 4) * 32, 256, 32, HIGHCOLOR, 6);
    spanPoly1305Byte.innerHTML = "0x(1)" + varPoly1305CurrentBlock.toString(16).padStart(32, '0');
    spanPoly1305HashKeyed.innerHTML = toHexStringBigInt(varPoly1305CurrentHash) + " [((h + m) * r) mod p]";
    spanPoly1305HashPadded.innerHTML = toHexStringBigInt(BigInt.asUintN(128, varPoly1305CurrentHash + varPoly1305KeyS)) + " [h + s]";
    varPoly1305Pointer++;
}
updatePoly1305();


let varPrimeFieldModulus = 30;
let varPrimeFieldMultiplier = 6;
let arrayPrimeFieldLabels = [];
let arrayPrimeFieldDist = [];
const canvasPrimeField = initializeCanvas("canvasPrimeField", 430);
const sliderPrimeFieldModulus = initializeSliders("sliderPrimeFieldModulus", 2, 31, 1, varPrimeFieldModulus);
const sliderPrimeFieldMultiplier = initializeSliders("sliderPrimeFieldMultiplier", 1, 31, 1, varPrimeFieldMultiplier);
const spanPrimeFieldModulus = document.getElementById("spanPrimeFieldModulus");
const spanPrimeFieldMultiplier = document.getElementById("spanPrimeFieldMultiplier");
sliderPrimeFieldModulus.addEventListener("input", updatePrimeField);
sliderPrimeFieldMultiplier.addEventListener("input", updatePrimeField);
function updatePrimeField() {
    varPrimeFieldModulus = parseInt(sliderPrimeFieldModulus.value);
    varPrimeFieldMultiplier = parseInt(sliderPrimeFieldMultiplier.value);
    varPrimeFieldMultiplier = Math.min(varPrimeFieldMultiplier, varPrimeFieldModulus - 1);
    sliderPrimeFieldMultiplier.value = varPrimeFieldMultiplier;
    varPrimeFieldMultiplier = parseInt(sliderPrimeFieldMultiplier.value);
    arrayPrimeFieldLabels = getNumberLabels(0, varPrimeFieldModulus);
    arrayPrimeFieldDist = getModuloDistribution(varPrimeFieldModulus, varPrimeFieldMultiplier);
    canvasPrimeField.clearRect(0, 0, WIDTH, 430);
    drawDistribution(canvasPrimeField, [arrayPrimeFieldDist], 15, 15, arrayPrimeFieldLabels, 1);
    spanPrimeFieldModulus.innerHTML = varPrimeFieldModulus;
    spanPrimeFieldMultiplier.innerHTML =  varPrimeFieldMultiplier;
}
updatePrimeField();


const canvasChaChaPolySeparate = initializeCanvas("canvasChaChaPolySeparate", 1080);
const arrayChaChaPolySeparateLabels = ["Keys (ChaCha, r, s)", "Counter, Nonce, Hash"];
initializeCanvasText(canvasChaChaPolySeparate, "left");
for (let i = 0; i < 2; i++) {
    canvasChaChaPolySeparate.fillText(arrayChaChaPolySeparateLabels[i], 145, 509 + i * 48);
    canvasChaChaPolySeparate.fillText(PARTYLABELS[i], 25, 135 + i * 600);
    drawArrow(canvasChaChaPolySeparate, true, (i === 0) ? 1 : -1, 93, (i === 0) ? 325 : 737, (i === 0) ? 737 : 325);
    drawLock(canvasChaChaPolySeparate, 125, 509 + i * 48, i === 0);
    drawHash(canvasChaChaPolySeparate, "H", 999, 383 + i * 296, ["r", "s"], true, true);
}
drawChaChaEncryptionFromKey(canvasChaChaPolySeparate, EG_CHACHAINITBLOCK, AUTH_DATASTREAM_ORIG_SHORT, AUTH_KEYSTREAM_SHORT, AUTH_CIPHERSTREAM_ORIG_SHORT);
drawChaChaEncryptionFromKey(canvasChaChaPolySeparate, EG_CHACHAINITBLOCK, AUTH_CIPHERSTREAM_ORIG_SHORT, AUTH_KEYSTREAM_SHORT, AUTH_DATASTREAM_ORIG_SHORT, 15, 615);


const canvasChaChaPolyIntegrated = initializeCanvas("canvasChaChaPolyIntegrated", 1080);
const arrayChaChaPolyIntegratedLabels = ["ChaCha Key", "Counter, Nonce, Hash"];
const arrayChaChaPolyIntegratedArrows = [[[405, 157], [661, 157], [533, 157], [533, 3], [1229, 3], [1229, 269]], [[405, 757], [661, 757], [533, 757], [533, 603], [1199, 603]]];
const arrayChaChaPolyKeystream0 = createChaChaStream(EG_CHACHAINITBLOCK, 1, 0);
const arrayChaChaPolyKeystream1 = createChaChaStream(EG_CHACHAINITBLOCK, 2, 1);
const arrayChaChaPolyCipherstream = EG_CHACHACIPHERSTREAM.slice(16, 48);
initializeCanvasText(canvasChaChaPolyIntegrated, "left");
drawChaChaEncryptionFromKey(canvasChaChaPolyIntegrated, EG_CHACHAINITBLOCK, AUTH_DATASTREAM_ORIG_SHORT, arrayChaChaPolyKeystream1, arrayChaChaPolyCipherstream, 15, 15, 646);
drawChaChaEncryptionFromKey(canvasChaChaPolyIntegrated, EG_CHACHAINITBLOCK, arrayChaChaPolyCipherstream, arrayChaChaPolyKeystream1, AUTH_DATASTREAM_ORIG_SHORT, 15, 615, 646);
for (let i = 0; i < 2; i++) {
    canvasChaChaPolyIntegrated.fillText(arrayChaChaPolyIntegratedLabels[i], 145, 509 + i * 48);
    canvasChaChaPolyIntegrated.fillText(PARTYLABELS[i], 25, 135 + i * 600);
    drawArrow(canvasChaChaPolyIntegrated, true, (i === 0) ? 1 : -1, 93, (i === 0) ? 325 : 737, (i === 0) ? 737 : 325);
    drawLock(canvasChaChaPolyIntegrated, 125, 509 + i * 48, i === 0);
    drawHash(canvasChaChaPolyIntegrated, "H", 1255, 383 + i * 296, ["r", "s"], true, true);
    drawChaChaBlock(canvasChaChaPolyIntegrated, arrayChaChaPolyKeystream0, 405, 167 + i * 600, 8, "#000", "#000", "#000");
    drawRectangle(canvasChaChaPolyIntegrated, 405, 167 + i * 600, 256, 32, "#f81", 6);
    drawRectangle(canvasChaChaPolyIntegrated, 405, 199 + i * 600, 256, 32, "#e9f", 6);
    drawOrthoArrow(canvasChaChaPolyIntegrated, arrayChaChaPolyIntegratedArrows[i]);
}


const canvasChaChaPolySequence = initializeCanvas("canvasChaChaPolySequence", 370);
const arrayChaChaPolySequenceLabels = ["Normal ChaCha20 Block", "ChaCha20 Block in ChaCha20-Poly1305"];
const arrayChaChaPolySequenceBlockLabels = [["Counter", "Counter", "Nonce", "Nonce"], ["Counter", "Nonce", "Nonce", "Nonce"]];
for (let i = 0; i < 2; i++) {
    drawChaChaBlock(canvasChaChaPolySequence, EG_CHACHAINITBLOCK, 15 + i * 630, 15, 18);
    drawChaChaLables(canvasChaChaPolySequence, [12, 13, 14, 15], arrayChaChaPolySequenceBlockLabels[i], 15 + i * 630, 15, 18, "bold 28px JetBrains Mono");
    initializeCanvasText(canvasChaChaPolySequence, "left");
    canvasChaChaPolySequence.fillText(arrayChaChaPolySequenceLabels[i], 15 + i * 630, 341);
}


const canvasAssociatedData = initializeCanvas("canvasAssociatedData", 460);
const arrayAssociatedDataCipherstream = AUTH_CIPHERSTREAM_ORIG_SHORT.concat(new Array(16).fill(HEXHSTRIPE));
drawChaChaEncryption(canvasAssociatedData, AUTH_DATASTREAM_ORIG_SHORT, AUTH_KEYSTREAM_SHORT, arrayAssociatedDataCipherstream, 15, 15, 8);
drawHash(canvasAssociatedData, "H", 863, 383, ["r", "s"], true, true);
initializeCanvasText(canvasAssociatedData);
canvasAssociatedData.fillText("Associated Data", 655, 299);
canvasAssociatedData.fillText("(Unencrypted)", 655, 269);


const POLYMODULUS = 31;
let varPolynomial1Validity = false;
let arrayPolynomial1Values = [];
const arrayPolynomial1Sliders = ["sliderPolynomial1Variable", "sliderPolynomial1Range", "sliderPolynomial1Coefficient1"];
const arrayPolynomial1Spans = ["spanPolynomial1Variable", "spanPolynomial1Range", "spanPolynomial1Coefficient1"];
const arrayPolynomial1Objects = initializePolynomialIllustration(arrayPolynomial1Sliders, arrayPolynomial1Spans, updatePolynomial1, POLYMODULUS);
function updatePolynomial1() {
    arrayPolynomial1Values = getSetPolynomialValues(arrayPolynomial1Objects);
    varPolynomial1Validity = (arrayPolynomial1Values[2] * arrayPolynomial1Values[0]) % POLYMODULUS == arrayPolynomial1Values[1];
    spanPolynomial1Equation.innerHTML = `${arrayPolynomial1Values[2]} * ${arrayPolynomial1Values[0]} ≡ ${arrayPolynomial1Values[1]} (mod) ${POLYMODULUS} : ${varPolynomial1Validity? "True" : "False"}`;
}
updatePolynomial1();


let varPolynomial2Validity = false;
let arrayPolynomial2Values = [];
const arrayPolynomial2Sliders = ["sliderPolynomial2Variable", "sliderPolynomial2Range", "sliderPolynomial2Coefficient1", "sliderPolynomial2Coefficient2"];
const arrayPolynomial2Spans = ["spanPolynomial2Variable", "spanPolynomial2Range", "spanPolynomial2Coefficient1", "spanPolynomial2Coefficient2"];
const arrayPolynomial2Objects = initializePolynomialIllustration(arrayPolynomial2Sliders, arrayPolynomial2Spans, updatePolynomial2, POLYMODULUS);
function updatePolynomial2() {
    arrayPolynomial2Values = getSetPolynomialValues(arrayPolynomial2Objects);
    varPolynomial2Validity = ((arrayPolynomial2Values[2] * arrayPolynomial2Values[0] * arrayPolynomial2Values[0]) + (arrayPolynomial2Values[3] * arrayPolynomial2Values[0])) % POLYMODULUS == arrayPolynomial2Values[1];
    spanPolynomial2Equation.innerHTML = `(${arrayPolynomial2Values[2]} * (${arrayPolynomial2Values[0]} * ${arrayPolynomial2Values[0]})) + (${arrayPolynomial2Values[3]} * ${arrayPolynomial2Values[0]}) ≡ ${arrayPolynomial2Values[1]} (mod) ${POLYMODULUS} : ${varPolynomial2Validity ? "True" : "False"}`;
}
updatePolynomial2();


let varChaChaDiffusionDistHeightFactor = 1;
const varChaChaDiffusionDistBars = 78;
const varChaChaDiffusionDistStart = 256 - varChaChaDiffusionDistBars / 2;
const arrayChaChaDiffusionDistLables = getNumberLabels(varChaChaDiffusionDistStart, varChaChaDiffusionDistBars, 7, 4);
const arrayChaChaDiffusionDistribution = new Array(varChaChaDiffusionDistBars).fill(0);
const canvasChaChaDiffusion = initializeCanvas("canvasChaChaDiffusion", 750);
const buttonChaChaDiffusion = document.getElementById("buttonChaChaDiffusion");
const buttonChaChaDiffusion1000 = document.getElementById("buttonChaChaDiffusion1000");
const buttonChaChaDiffusionReset = document.getElementById("buttonChaChaDiffusionReset");
const arrayChaChaDiffusionBlocks = [createChaChaInitBlock(0), createChaChaInitBlock(0)];
buttonChaChaDiffusion.addEventListener("click", () => { updateChaChaDiffusionBlocks(); updateChaChaDiffusionCanvas(); });
buttonChaChaDiffusion1000.addEventListener("click", () => {
    for (let i = 0; i < 1000; i++)
        updateChaChaDiffusionBlocks();
    updateChaChaDiffusionCanvas();
});
buttonChaChaDiffusionReset.addEventListener("click", () => {
    varChaChaDiffusionDistHeightFactor = 0;
    for (let i = 0; i < arrayChaChaDiffusionDistribution.length; i++)
        arrayChaChaDiffusionDistribution[i] = 0;
    updateChaChaDiffusionCanvas();
});
function updateChaChaDiffusionBlocks() {
    for (let i = 4; i < 16; i++) {
        arrayChaChaDiffusionBlocks[0][i] = (Math.random() * 0xFFFFFFFF) >>> 0;
        arrayChaChaDiffusionBlocks[1][i] = arrayChaChaDiffusionBlocks[0][i];
    }
    arrayChaChaDiffusionBlocks[1][Math.floor(Math.random() * 12) + 4] ^= (1 << Math.floor(Math.random() * 32));
    arrayChaChaDiffusionBlocks[2] = createChaChaStream(arrayChaChaDiffusionBlocks[0], 1);
    arrayChaChaDiffusionBlocks[3] = createChaChaStream(arrayChaChaDiffusionBlocks[1], 1);
    arrayChaChaDiffusionBlocks[4] = createXORStream(arrayChaChaDiffusionBlocks[0], arrayChaChaDiffusionBlocks[1]);
    arrayChaChaDiffusionBlocks[5] = createXORStream(arrayChaChaDiffusionBlocks[2], arrayChaChaDiffusionBlocks[3]);
    updateChaChaDistribution(arrayChaChaDiffusionDistribution, arrayChaChaDiffusionBlocks[5], varChaChaDiffusionDistStart);
    varChaChaDiffusionDistHeightFactor++;
}
function updateChaChaDiffusionCanvas() {
    canvasChaChaDiffusion.clearRect(0, 0, WIDTH, 750);
    for (let i = 0; i < 4; i++)
        drawChaChaBlocks(canvasChaChaDiffusion, arrayChaChaDiffusionBlocks[i], (Math.floor(i / 2) != 1) ? 15 : 705, (i % 2 == 0) ? 15 : 173, 8);
    drawChaChaBlock(canvasChaChaDiffusion, arrayChaChaDiffusionBlocks[4], 301, 95, 8, HIGHCOLOR);
    drawChaChaBlock(canvasChaChaDiffusion, arrayChaChaDiffusionBlocks[5], 991, 95, 8, DIFFCOLOR);
    drawArrow(canvasChaChaDiffusion, false, 1, 49, 291, 665);
    drawArrow(canvasChaChaDiffusion, false, 1, 267, 291, 665);
    drawDistribution(canvasChaChaDiffusion, [arrayChaChaDiffusionDistribution], 15, 335, arrayChaChaDiffusionDistLables, Math.pow(varChaChaDiffusionDistHeightFactor, -0.65), [DIFFCOLOR], 10);
};
updateChaChaDiffusionBlocks();
updateChaChaDiffusionCanvas();


// functions

function updateChaChaDistribution(distribution, blocks, start) {
    const bits = countActiveBitsBlock(blocks);
    if (bits >= start && bits < start + distribution.length)
        distribution[bits - start] += 1;
}

function countActiveBits(number) {
    let ones = 0;
    while (number) {
        ones += number & 1;
        number >>>= 1;
    }
    return ones;
}

function countActiveBitsBlock(blocks) {
    let ones = 0;
    for (let i = 0; i < blocks.length; i++)
        ones += countActiveBits(blocks[i]);
    return ones;
}

function getNumberLabels(start, total, gap = 1, offset = 0) {
    const labels = new Array(total).fill("");
    for (let i = 0; i < total; i++)
        if ((i + offset) % gap == 0) labels[i] = String(i + start);
    return labels;
}

function initializePolynomialIllustration(sliderIDs, spanIDs, updateFunction, modulus) {
    const sliders = [];
    const spans = [];
    for (let i = 0; i < sliderIDs.length; i++) {
        const slider = initializeSliders(sliderIDs[i], (i === 0) ? 1 : 0, modulus - 1, 1, Math.floor(Math.random() * modulus));
        slider.addEventListener("input", updateFunction);
        sliders.push(slider);
    }
    for (let i = 0; i < spanIDs.length; i++) {
        const span = document.getElementById(spanIDs[i]);
        spans.push(span);
    }
    return [sliders, spans];
}

function getSetPolynomialValues(objects) {
    const values = [];
    for (let i = 0; i < objects[0].length; i++)
        values[i] = parseInt(objects[0][i].value);
    for (let i = 0; i < objects[1].length; i++)
        objects[1][i].innerHTML = values[i];
    return values;
}

function calculatePoly1305(blocks, r, s) {
    let hash = 0n;
    let block = 0n;
    for (let i = 0; i < blocks.length; i += 4) {
        block = toBigInt(blocks.slice(i, i + 4));
        hash = calculatePoly1305Block(block, hash, r);
    }
    hash = hash + s;
    return BigInt.asUintN(128, hash);
}

function calculatePoly1305Block(block, prev, key) {
    const message = block + (1n << 128n);
    const hash = ((prev + message) * key) % ((1n << 130n) - 5n);
    return BigInt.asUintN(128, hash);
}

function getPoly1305Key(r = false) {
    const key = new Array(4);
    for (let i = 0; i < key.length; i++)
        key[i] = Math.floor(Math.random() * 0xFFFFFFFF) >>> 0;
    if (r) {
        for (let i = 0; i < 4; i++)
            key[i] &= 0x0FFFFFFF;
        for (let i = 1; i < 4; i++)
            key[i] &= 0xFFFFFFFC;
    }
    return toBigInt(key);
}

function resetHashGeneral(updateFunction, pointers, inputKey = false, inputPad = false) {
    pointers[0] = 0; pointers[1] = 0; pointers[2] = 0; pointers[3] = 0;
    if (inputKey) pointers[4] = parseInt(inputKey.value, 16) >>> 0;
    if (inputPad) pointers[5] = parseInt(inputPad.value, 16) >>> 0;
    pointers[6] = calculateHash(AUTH_CIPHERSTREAM_ORIG_SHORT, pointers[4], pointers[5]);
    updateFunction();
}

function updateHashGeneral(canvas, pointers) {
    // pointers = [pointer, current byte, current hash, previous byte, key, pad, hash]
    const keys = [];
    if (pointers[4] != 1) keys.push(pointers[4]);
    if (pointers[5] != 0) keys.push(pointers[5]);
    canvas.clearRect(0, 0, WIDTH, 460);
    drawChaChaEncryption(canvas, AUTH_DATASTREAM_ORIG_SHORT, AUTH_KEYSTREAM_SHORT, AUTH_CIPHERSTREAM_ORIG_SHORT, 15, 15, 8);
    drawHash(canvas, pointers[6], 607, 383, keys, false);
    drawRectangle(canvas, 15 + (pointers[0] % 4) * 64 + Math.floor(pointers[0] / 16) * 256, 319 + (Math.floor(pointers[0] / 4) % 4) * 32, 64, 32, HIGHCOLOR, 6);
    pointers[1] = AUTH_CIPHERSTREAM_ORIG_SHORT[pointers[0]] >>> 0;
    pointers[3] = pointers[2] >>> 0;
    pointers[2] = Math.imul(pointers[1] + (pointers[3]), pointers[4]) >>> 0;
}

function drawHash(canvas, hash, x = 1119, y = 383, keys = [], bigInt = false, raw = false) {
    const xOffset = 46;
    let toHexFunction = bigInt ? toHexStringBigInt : toHexString;
    if (raw) toHexFunction = val => val;
    initializeCanvasText(canvas, "left");
    drawArrow(canvas, false, 1, y, x - 65, x - 15);
    canvas.fillText(toHexFunction(hash), x, y);
    if (keys.length == 0) return;
    canvas.beginPath();
    for (let i = 0; i < keys.length; i++) {
        canvas.moveTo(x - xOffset, y);
        canvas.lineTo(x - xOffset, y - 60 - (30 * i));
        canvas.lineTo(x - xOffset + 10, y - 60 - (30 * i));
        canvas.fillText(toHexFunction(keys[i]), x - xOffset + 15, y - 60 - (30 * i));
    }
    canvas.stroke();
    canvas.beginPath();
    canvas.arc(x - xOffset, y, 6, 0, 2 * Math.PI);
    canvas.fill();
}

function calculateHash(array, key = 1, pad = 0) {
    let hash = 0;
    for (let i = 0; i < array.length; i++)
        hash = Math.imul(array[i] + hash, key) >>> 0;
    hash = hash + (pad >>> 0);
    return hash;
}

function toHexStringBigInt(number) {
    return "0x" + number.toString(16).padStart(32, '0');
}

function toHexString(number) {
    const hexString = (number >>> 0).toString(16);
    return "0x" + hexString.padStart(8, '0');
}

function toLittleEndian(number) {
    number &= 0xFFFFFFFF;
    const byte1 = (number & 0xFF);
    const byte2 = (number >> 8) & 0xFF;
    const byte3 = (number >> 16) & 0xFF;
    const byte4 = (number >> 24) & 0xFF;
    const littleEndian = (byte1 << 24) | (byte2 << 16) | (byte3 << 8) | byte4;
    return littleEndian;
}

function toBigInt(array) {
    const length = array.length;
    let multiplier = 1n;
    let number = 0n;
    for (let i = 0; i < length; i++) {
        number += BigInt(array[i]) * multiplier;
        multiplier *= 0x100000000n;
    }
    return BigInt.asUintN(length * 32, number);
}

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

function createEncryptionStreams(initBlock, length, hexDataPattern = HEXCHECKER, counterStart = 0) {
    const data = new Array(16 * length).fill(hexDataPattern);
    const chacha = createChaChaStream(initBlock, length, counterStart);
    const xor = createXORStream(data, chacha);
    return { dataStream: data, chachaStream: chacha, xorStream: xor, length: length};
}

function drawCipherRects(canvas, colors, yDots = 10, xDots = 101, size = 12, gap = 4, xOffset = 36, yOffset = 16) {
    let color = 0;
    for (let y = 0; y < yDots; y++) {
        for (let x = 0; x < xDots; x++) {
            canvas.fillStyle = colors[color % colors.length];
            canvas.fillRect(x * size + xOffset, y * size + yOffset, size - gap, size - gap);
            color++;
            if (Math.random() < 0.3) x++;
        }
    }
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

function createChaChaStream(initBlock, blocksLength, counterStart = 0) {
    const finalBlocks = [];
    for (let i = counterStart; i < blocksLength + counterStart; i++) {
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

function drawChaChaEncryptionFromKey(canvas, initBlock, dataStream, chachaStream, xorStream, x = 15, y = 15, keyOffset = 390, arrowOffset = 390, size = 8) {
    drawChaChaWithBlockArrow(canvas, initBlock, x, y + size * 19, size, x + size * 32 + 20, x + arrowOffset - 20);
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

function drawDistributionAxes(canvas, x, y, height) {
    canvas.lineWidth = LINEWIDTH;
    canvas.beginPath();
    canvas.moveTo(x, y);
    canvas.lineTo(x, y + height);
    canvas.lineTo(x + 1250, y + height);
    canvas.stroke();
}

function drawDistributionLabels(canvas, labels, x, y) {
    initializeCanvasText(canvas);
    for (let i = 0; i < labels.length; i++)
        canvas.fillText(labels[i], x + i * 1248 / labels.length, y);
}

function drawDistributionBar(canvas, x, y, width, height) {
    canvas.beginPath();
    canvas.moveTo(x, y);
    canvas.lineTo(x + width, y);
    canvas.lineTo(x + width, y - height);
    canvas.lineTo(x, y - height);
    canvas.fill();
}

function drawDistribution(canvas, distributions, x = 15, y = 15, labels = LETTERS, scaleFactor = 7, colors = DISTCOLORS, widthBar = 32, height = 370) {
    const items = distributions[0].length;
    const offset = 624 / items - 13;
    const cumulative = new Array(items).fill(0);
    for (let distribution = 0; distribution < distributions.length; distribution++) {
        canvas.fillStyle = colors[distribution];
        for (let item = 0; item < items; item++) {
            drawDistributionBar(canvas, x + offset + item * 1248 / items, y + height - cumulative[item] * height * scaleFactor, widthBar, distributions[distribution][item] * height * scaleFactor);
            cumulative[item] += distributions[distribution][item];
        }
    }
    drawDistributionAxes(canvas, x, y, height);
    drawDistributionLabels(canvas, labels, x + offset + 15, y + height + 22);
}

function getModuloDistribution(modulus, key) {
    const distribution = new Array(modulus).fill(0);
    const increment = 1 / modulus;
    for (let i = 0; i < modulus; i++)
        distribution[(i * key) % modulus] += increment;
    return distribution;
}

function getDisparateDistributions(arrayIndices, originalDistribution = LETTERPROBDIST) {
    const distributions = [[...originalDistribution]];
    for (let i = 0; i < arrayIndices.length; i++) {
        const newDistribution = new Array(26).fill(0);
        newDistribution[arrayIndices[i]] = originalDistribution[arrayIndices[i]];
        distributions.push(newDistribution);
        distributions[0][arrayIndices[i]] = 0;
    }
    return distributions;
}

function getFrequencyDistributionFromKey(oldDistributions, key) {
    const transformedDistributions = [];
    for (let i = 0; i < oldDistributions.length; i++) {
        const newDistribution = new Array(26).fill(0);
        for (let letter = 0; letter < 26; letter++) {
            for (let k = 0; k < key.length; k++)
                newDistribution[(letter + key[k]) % 26] += oldDistributions[i][letter] / key.length;
        }
        transformedDistributions.push(newDistribution);
    }
    return transformedDistributions;
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

function generateKeysUnique(count, range = 26) {
    const numbers = Array.from({ length: range }, (_, i) => i);
    for (let i = 0; i < range; i++) {
        const j = i + Math.floor(Math.random() * (range - i));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers.slice(0, count);
}

function generateKey(length, modulus) {
    return Array.from({ length: length }, () => Math.floor(Math.random() * modulus));
}

function drawOrthoArrow(canvas, coordinates) {
    const last = coordinates.length - 1;
    canvas.beginPath();
    canvas.moveTo(coordinates[0][0], coordinates[0][1]);
    for (let i = 1; i < last; i++)
        canvas.lineTo(coordinates[i][0], coordinates[i][1]);
    canvas.stroke();
    const vertical = coordinates[last - 1][0] == coordinates[last][0];
    const direction = (coordinates[last - 1][0] < coordinates[last][0] || coordinates[last - 1][1] < coordinates[last][1]) ? 1 : -1;
    const offset = vertical ? coordinates[last][0] : coordinates[last][1];
    const start = vertical ? coordinates[last - 1][1] : coordinates[last - 1][0];
    const end = vertical ? coordinates[last][1] : coordinates[last][0];
    drawArrow(canvas, vertical, direction, offset, start, end);
}

function drawShiftArrows(canvas, key, length, sign = "+", y = 135, x = 15, color = LGRAY) {
    initializeCanvasText(canvas);
    canvas.lineWidth = LINEWIDTH;
    drawLetterChain(canvas, ' '.repeat(length), y + 10, x, color);   // kinda ugly hack; last minute changes 
    initializeCanvasText(canvas, undefined, undefined, undefined, color);
    for (let i = 0; i < length; i++) {
        let xOffset = x + i * LETTERBOXWIDTH + LETTERBOXWIDTH / 2;
        canvas.fillText(sign + key[i % key.length], xOffset, y + 60);
        canvas.beginPath();
        canvas.moveTo(xOffset, y - 5);
        canvas.lineTo(xOffset, y + 10);
        canvas.stroke();
        drawArrow(canvas, true, 1, xOffset, y + 110, y + 130);
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

function drawFunctionMap(canvas, key, symbol, color = "#ccc", cardinality = 26, y1 = 105, y2 = 185) {
    const xOffset = 624 / cardinality + 13;
    const gap = 1248 / cardinality;
    canvas.lineWidth = LINEWIDTH;
    canvas.strokeStyle = color;
    canvas.beginPath();
    for (let i = 0; i < key.length; i++) {
        canvas.moveTo(symbol * gap + xOffset, y2);
        canvas.lineTo(((((symbol - key[i]) % cardinality) + cardinality) % cardinality) * gap + xOffset, y1);
    }
    canvas.stroke();
}

function getSymbols(text, key, sign = -1) {
    const symbols = [];
    for (i = 0; i < key.length; i++) {
        symbol = LETTERS[(((text + sign * key[i]) % 26) + 26) % 26];
        symbols.push(symbol);
    }
    return symbols;
}

function shiftLetters(plaintext, key, sign = 1) {
    let ciphertext = '';
    plaintext = plaintext.toUpperCase();
    for (let i = 0; i < plaintext.length; i++) {
        let currentChar = plaintext[i];
        let currentShift = key[i % key.length];
        let encryptedChar = ' ';
        if (currentChar.charCodeAt(0) >= 65 && currentChar.charCodeAt(0) < 91)
            encryptedChar = LETTERS[(((currentChar.charCodeAt(0) - 65 + sign * currentShift) % 26) + 26) % 26];
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

function drawLetterChainBackground(canvas, text, x = 15, y = 15, color = "#666") {
    canvas.fillStyle = color;
    for (let i = 0; i < LETTERBOXLENGTH; i++) {
        if (text[i] == '1') {
            canvas.beginPath();
            canvas.moveTo(x + (i * LETTERBOXWIDTH), y);
            canvas.lineTo(x + (i * LETTERBOXWIDTH), y + LETTERBOXHEIGHT);
            canvas.lineTo(x + (i * LETTERBOXWIDTH) + LETTERBOXWIDTH, y + LETTERBOXHEIGHT);
            canvas.lineTo(x + (i * LETTERBOXWIDTH) + LETTERBOXWIDTH, y);
            canvas.lineTo(x + (i * LETTERBOXWIDTH), y);
            canvas.fill();
        }
    }
    canvas.fillStyle = "#000";
}

function drawLetterChain(canvas, text, y = 15, x = 15, color = BLACK) {
    canvas.lineWidth = LINEWIDTH;
    for (let i = 0; i < LETTERBOXLENGTH; i++)
        if (text[i]) drawLetterBox(canvas, text[i], x + (i * LETTERBOXWIDTH), y, color);
}

function drawLetterBox(canvas, letter, x, y, color) {
    initializeCanvasText(canvas, "center", "32px JetBrains Mono", "middle", color);
    canvas.fillText(letter, x + LETTERBOXWIDTH / 2, y + LETTERBOXHEIGHT / 2);
    initializeCanvasText(canvas, "right","20px JetBrains Mono", "ideographic", color);
    canvas.fillText(getLetterPosition(letter), x + LETTERBOXWIDTH - LETTERINDEXOFFSETX, y + LETTERBOXHEIGHT - LETTERINDEXOFFSETY)
    canvas.strokeStyle = color;
    canvas.beginPath();
    canvas.moveTo(x, y);
    canvas.lineTo(x, y + LETTERBOXHEIGHT);
    canvas.lineTo(x + LETTERBOXWIDTH, y + LETTERBOXHEIGHT);
    canvas.lineTo(x + LETTERBOXWIDTH, y);
    canvas.lineTo(x, y);
    canvas.stroke();
}

function returnGaussianValues(values, range = 26, iterations = 8) {
    const array = new Array(values).fill(0);
    for (let i = 0; i < values; i++) {
        let value = 0;
        for (let iter = 0; iter < iterations; iter++)
            value += Math.random();
        array[i]= Math.floor(value * range / iterations);
    }
    return array;
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
