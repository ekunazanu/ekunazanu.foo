// A lot of this code can be refactored to follow the DRY principles
// But this is the first time I am writing JS and learning as I go
// So this code might look very ugly; if you think it is the case
// send PRs, since I am too lazy to return back to refactor it myself

const WIDTH = 1280;
const LINEWIDTH = 2;
const ARROW_SIZE = 10;
const GRID_CELL_SIZE = 38;
const GRID_CELL_PADDING = 2;
const GRID_SUB_CELL_LENGTH = 2;
const GRID_SUB_CELL_SIZE = GRID_CELL_SIZE / GRID_SUB_CELL_LENGTH;
const GRID_ROWS = 8;
const GRID_COLS = 32;
const GRID_X_OFFSET = 5;
const GRID_Y_OFFSET = 5;
const MAX_CELL_SUBS = GRID_SUB_CELL_LENGTH ** 2;
const MAX_COUNT = 2 ** (GRID_SUB_CELL_LENGTH ** 2);

const COLORS = getColors();


const encoder = new TextEncoder();


// first hash box
const hashBoxButton = document.getElementById("hashBoxButton");
hashBoxButton.onclick = async() => {
    const hashBoxInput = document.getElementById("hashBoxInput").value;
    const hash = await getHash(hashBoxInput);
    document.getElementById("hashBoxOutput").innerHTML = hash[0];
}

// search sets
const setArrayMain = ["world", "firm", "bat", "if", "glance", "analysis", "reasonable", "resident", "verdict", "world", "snub", "greet", "snub", "half", "speed", "exception", "speed", "helmet", "theorist", "please", "operational", "hello", "nursery", "background", "appreciate", "congress", "verdict", "dictionary", "current", "nursery", "snub", "piece", "dilute", "elapse", "congress", "verdict", "confusion", "fan", "breast", "sting", "disagreement", "helmet", "tape"];
const setArrayHashes = [4, 17, 23, 32, 33, 35, 44, 47, 50, 52, 56, 61, 72, 77, 83, 86, 93, 117, 132, 137, 139, 147, 151, 161, 162, 187, 202, 213, 226, 231, 243, 244];
const setArraySorted = setArrayMain.toSorted();
const setArrayUnique = [... new Set(setArraySorted)];

setHTML("setContainerStatic", setArrayMain.join(" "));
setHTML("setContainerLinear", renderSpans(setArrayMain, "setSpanLinear"));
setHTML("setContainerBinary", renderSpans(setArraySorted, "setSpanBinary"));
setHTML("setContainerUnique", renderSpans(setArrayUnique, "setSpanUnique"));
setHTML("setContainerHashes", renderSpans(setArrayHashes, "setSpanHashes"));

setupSearchButton("setButtonLinear", "setInputLinear", (target, button) =>
    linearSearch("setContainerLinear", target, setArrayMain, "setOutputLinear", button)
);
setupSearchButton("setButtonBinary", "setInputBinary", (target, button) =>
    binarySearch("setContainerBinary", target, setArraySorted, "setOutputBinary", "Binary", button)
);
setupSearchButton("setButtonUnique", "setInputUnique", (target, button) =>
    binarySearch("setContainerUnique", target, setArrayUnique, "setOutputUnique", "Unique", button)
);
setupSearchButton("setButtonHashes", "setInputHashes", async(target, button) => {
    const hash = await getHash(target);
    document.getElementById("setOutputHashesHash").innerHTML = hash[0];
    await binarySearch("setContainerHashes", hash[0], setArrayHashes, "setOutputHashes", "Hashes", button);
});


// bloom filter static expanded
const bfArrayCompareBlocksBF = new Array(32).fill(0);
const bfCanvasCompare = initializeCanvas("bfCanvasCompare", 460);
const bfArrayCompareGridsYOffsets = [145, 235, 385];
const bfArrayCompareIndexOffsets = [0, 32, 224];
const bfArrayCompareNumbers = [4, 17, 23];
const bfArrayCompareGridsXOffsets = [5, 499, 841];
const bfArrayCompareNumberXOffsets = [330, 474, 1170];
const bfArrayCompareBlocks = [[4, 17, 23], [0, 1, 3, 12, 15, 18, 20, 24, 29], [2, 7, 19, 20]];
initializeCanvasText(bfCanvasCompare, "center", "20px JetBrains Mono");
for (let i = 0; i < bfArrayCompareGridsYOffsets.length; i++) {
    bfArrayCompareBlocksBF.fill(0);
    bfArrayCompareBlocks[i].forEach(i => { bfArrayCompareBlocksBF[i] = 1; });
    const binaryString = bfArrayCompareNumbers[i].toString(2).padStart(8, '0');
    const binaryArray = [...binaryString].map(Number);
    drawGridBlocks(bfCanvasCompare, bfArrayCompareBlocksBF, COLORS.FG, bfArrayCompareGridsYOffsets[i], GRID_X_OFFSET, 1);
    drawGridBlocks(bfCanvasCompare, binaryArray, COLORS.FG, 5, bfArrayCompareGridsXOffsets[i], 1, 8);
    bfCanvasCompare.fillText(bfArrayCompareNumbers[i], bfArrayCompareNumberXOffsets[i], 25);
    if (i === 2) bfCanvasCompare.font = "16px JetBrains Mono";
    for (let j = 0; j < 32; j++)
        bfCanvasCompare.fillText(j + bfArrayCompareIndexOffsets[i], j * 38 + 24, bfArrayCompareGridsYOffsets[i] + 55);
}
bfCanvasCompare.font = "28px JetBrains Mono";
bfCanvasCompare.fillText("...", 630, 334);
drawArrowBracket(bfCanvasCompare, 5, 309, 175, 55, 115);
drawArrowBracket(bfCanvasCompare, 499, 803, 671, 55, 115);
drawArrowBracket(bfCanvasCompare, 841, 1145, 899, 55, 115);


// bloom filter add/query
const bfArrayAddQuery = new Array(256).fill(0);
const bfCanvasAdd = initializeCanvas("bfCanvasAdd", 320);
const bfCanvasQuery = initializeCanvas("bfCanvasQuery", 320);
const bfButtonAdd = document.getElementById("bfButtonAdd");
const bfButtonQuery = document.getElementById("bfButtonQuery");
bfButtonAdd.onclick = async() => {
    await BFMSHelper(bfArrayAddQuery, bloomFilterAdd, "bfInputAdd", "bfOutputAddHash", "bfOutputAddMessage", 1);
    drawGridBlocks(bfCanvasAdd, bfArrayAddQuery);
    drawGridBlocks(bfCanvasQuery, bfArrayAddQuery);
};
bfButtonQuery.onclick = async() => {
    const varBfAddQueryFound = await BFMSHelper(bfArrayAddQuery, bloomFilterQuery, "bfInputQuery", "bfOutputQueryHash", "bfOutputQueryMessage", 1, "", true, bfCanvasQuery);
    document.getElementById("bfOutputQueryMessage").innerHTML = varBfAddQueryFound ? "<b>Element found</b>." : "Element not found.";
    drawGridBlocks(bfCanvasQuery, bfArrayAddQuery);
}
drawGridBlocks(bfCanvasAdd, bfArrayAddQuery);
drawGridBlocks(bfCanvasQuery, bfArrayAddQuery);


const bfArrayCollision = new Array(256).fill(0);
const bfCanvasCollision = initializeCanvas("bfCanvasCollision", 320);
const bfButtonCollisionAdd = document.getElementById("bfButtonCollisionAdd");
const bfButtonCollisionQuery = document.getElementById("bfButtonCollisionQuery");
bfButtonCollisionAdd.onclick = async() => {
    await BFMSHelper(bfArrayCollision, bloomFilterAdd, "bfInputCollisionAdd", "bfOutputCollisionHash", "bfOutputCollisionMessage", 1);
    drawGridBlocks(bfCanvasCollision, bfArrayCollision);
};
bfButtonCollisionQuery.onclick = async() => {
    const varCollisionFound = await BFMSHelper(bfArrayCollision, bloomFilterQuery, "bfInputCollisionQuery", "bfOutputCollisionHash", "bfOutputCollisionMessage", 1, "", true, bfCanvasCollision);
    document.getElementById("bfOutputCollisionMessage").innerHTML = varCollisionFound ? "<b>Element found</b>." : "Element not found.";
    drawGridBlocks(bfCanvasCollision, bfArrayCollision);
}
drawGridBlocks(bfCanvasCollision, bfArrayCollision);


let bfHashDepth = 3;
const bfArrayMultiple = new Array(256).fill(0);
const bfCanvasMultiple = initializeCanvas("bfCanvasMultiple", 320);
const bfInputMultipleSlider = initializeSliders("bfInputMultipleSlider", 1, 10, 1, bfHashDepth);
const bfOutputMultipleHashDepth = document.getElementById("bfOutputMultipleHashDepth");
const bfButtonMultipleQuery = document.getElementById("bfButtonMutlipleQuery");
const bfButtonMultipleAdd = document.getElementById("bfButtonMultipleAdd");
bfInputMultipleSlider.addEventListener("change", function() {
    bfHashDepth = bfInputMultipleSlider.value;
    bfOutputMultipleHashDepth.innerHTML = bfInputMultipleSlider.value
});
bfButtonMultipleAdd.onclick = async() => {
    await BFMSHelper(bfArrayMultiple, bloomFilterAdd, "bfInputMultipleAdd", "bfOutputMultipleHash", "bfOutputMultipleMessage", bfHashDepth);
    drawGridBlocks(bfCanvasMultiple, bfArrayMultiple);
};
bfButtonMultipleQuery.onclick = async() => {
    const varMultipleFound = await BFMSHelper(bfArrayMultiple, bloomFilterQuery, "bfInputMultipleQuery", "bfOutputMultipleHash", "bfOutputMultipleMessage", bfHashDepth, "", true, bfCanvasMultiple);
    document.getElementById("bfOutputMultipleMessage").innerHTML = varMultipleFound ? "<b>Element found</b>." : "Element not found.";
    drawGridBlocks(bfCanvasMultiple, bfArrayMultiple);
}
drawGridBlocks(bfCanvasMultiple, bfArrayMultiple);


const bfArraySaturated = new Array(256).fill(1);
const bfCanvasSaturated = initializeCanvas("bfCanvasSaturated", 320);
const bfButtonSaturatedQuery = document.getElementById("bfButtonSaturatedQuery");
bfButtonSaturatedQuery.onclick = async() => {
    await BFMSHelper(bfArraySaturated, bloomFilterQuery, "bfInputSaturatedQuery", "bfOutputSaturatedHash", "bfOutputSaturatedMessage", 3, "", true, bfCanvasSaturated);
    document.getElementById("bfOutputMultipleMessage").innerHTML = "<b>Element found</b>.";
    drawGridBlocks(bfCanvasSaturated, bfArraySaturated);
}
drawGridBlocks(bfCanvasSaturated, bfArraySaturated);


const bfArrayDeletion = new Array(256).fill(0);
const bfCanvasDeletion = initializeCanvas("bfCanvasDeletion", 320);
const bfButtonDeletionAdd = document.getElementById("bfButtonDeletionAdd");
const bfButtonDeletionQuery = document.getElementById("bfButtonDeletionQuery");
const bfButtonDeletionRemove = document.getElementById("bfButtonDeletionRemove");
bfButtonDeletionAdd.onclick = async() => {
    await BFMSHelper(bfArrayDeletion, bloomFilterAdd, "bfInputDeletionAdd", "bfOutputDeletionHash", "bfOutputDeletionMessage", 3);
    drawGridBlocks(bfCanvasDeletion, bfArrayDeletion);
};
bfButtonDeletionRemove.onclick = async() => {
    await BFMSHelper(bfArrayDeletion, bloomFilterRemove, "bfInputDeletionRemove", "bfOutputDeletionHash", "bfOutputDeletionMessage", 3, "Element removed.", true, bfCanvasDeletion, COLORS.RED);
    drawGridBlocks(bfCanvasDeletion, bfArrayDeletion);
}
bfButtonDeletionQuery.onclick = async() => {
    const varDeletionFound = await BFMSHelper(bfArrayDeletion, bloomFilterQuery, "bfInputDeletionQuery", "bfOutputDeletionHash", "bfOutputDeletionMessage", 3, "", true, bfCanvasDeletion);
    document.getElementById("bfOutputDeletionMessage").innerHTML = varDeletionFound ? "<b>Element found</b>." : "Element not found.";
    drawGridBlocks(bfCanvasDeletion, bfArrayDeletion);
}
drawGridBlocks(bfCanvasDeletion, bfArrayDeletion);


const bfArrayCounting = new Array(256).fill(0);
const bfCanvasCounting = initializeCanvas("bfCanvasCounting", 320);
const bfButtonCountingAdd = document.getElementById("bfButtonCountingAdd");
const bfButtonCountingQuery = document.getElementById("bfButtonCountingQuery");
bfButtonCountingAdd.onclick = async() => {
    await BFMSHelper(bfArrayCounting, bloomFilterAdd, "bfInputCountingAdd", "bfOutputCountingHash", "bfOutputCountingMessage", 3);
    drawGridBlocks(bfCanvasCounting, bfArrayCounting);
};
bfButtonCountingQuery.onclick = async() => {
    const varCountingFound = await BFMSHelper(bfArrayCounting, bloomFilterQuery, "bfInputCountingQuery", "bfOutputCountingHash", "bfOutputCountingMessage", 3, "", true, bfCanvasCounting);
    document.getElementById("bfOutputCountingMessage").innerHTML = varCountingFound ? "<b>Element found</b>." : "Element not found.";
    drawGridBlocks(bfCanvasCounting, bfArrayCounting);
}
drawGridBlocks(bfCanvasCounting, bfArrayCounting);


const cmsCanvasComparisonStatic = initializeCanvas("cmsCanvasComparisonStatic", 320);
initializeCanvasText(cmsCanvasComparisonStatic);
cmsCanvasComparisonStatic.fillText("...", 1040, 240);
cmsCanvasComparisonStatic.fillText("15", 1140, 310);
cmsCanvasComparisonStatic.fillText("0", 220, 75);
cmsCanvasComparisonStatic.fillText("1", 280, 75);
drawBitsAll(cmsCanvasComparisonStatic, [0], COLORS.FG, 5, 25, 1, 1, 40, 1);
drawBitsAll(cmsCanvasComparisonStatic, [0], COLORS.FG, 5, 201, 1, 1, 40, 1);
drawBitsAll(cmsCanvasComparisonStatic, [1], COLORS.FG, 5, 261, 1, 1, 40, 1);
drawBitsAll(cmsCanvasComparisonStatic, [0], COLORS.FG, 201, 5, 1, 1, 80);
drawBitsAll(cmsCanvasComparisonStatic, [15], COLORS.FG, 201, 1101, 1, 1, 80);
for (let i = 0; i < 8; i++) {
    drawBitsAll(cmsCanvasComparisonStatic, [i], COLORS.FG, 201, 201 + i * 100, 1, 1, 80);
    cmsCanvasComparisonStatic.fillText(i, i * 100 + 240, 310);
}
drawArrowBracket(cmsCanvasComparisonStatic, 45, 45, 45, 74, 156);


const cmsArrayComparison = new Array(256).fill(0);
const cmsCanvasComparison = initializeCanvas("cmsCanvasComparison", 650);
const cmsButtonComparisonAdd = document.getElementById("cmsButtonComparisonAdd");
const cmsButtonComparisonQuery = document.getElementById("cmsButtonComparisonQuery");
cmsButtonComparisonAdd.onclick = async() => {
    await BFMSHelper(cmsArrayComparison, bloomFilterAdd, "cmsInputComparisonAdd", "cmsOutputComparisonHash", "cmsOutputComparisonMessage", 3);
    cmsCanvasComparison.clearRect(0, 0, WIDTH, cmsCanvasComparison.canvas.height);
    drawGridBlocks(cmsCanvasComparison, cmsArrayComparison);
    drawBitsAll(cmsCanvasComparison, cmsArrayComparison, COLORS.FG, 341);
};
cmsButtonComparisonQuery.onclick = async() => {
    const varComparisonFound = await BFMSHelper(cmsArrayComparison, bloomFilterQuery, "cmsInputComparisonAdd", "cmsOutputComparisonHash", "cmsOutputComparisonMessage", 3, "", true, cmsCanvasComparison);
    drawGridBlocks(cmsCanvasComparison, cmsArrayComparison);
    drawBitsAll(cmsCanvasComparison, cmsArrayComparison, COLORS.FG, 341);
    document.getElementById("cmsOutputComparisonMessage").innerHTML = varComparisonFound ? "<b>Element found</b>." : "Element not found.";
    const frequency = await BFMSHelper(cmsArrayComparison, bloomFilterCountQuery, "cmsInputComparisonAdd", "cmsOutputComparisonHash", "cmsOutputComparisonMessage", 3, "", true, cmsCanvasComparison, COLORS.BLUE, 341);
    document.getElementById("cmsOutputComparisonMessage").innerHTML = varComparisonFound ? "<b>Element found</b>." : "Element not found.";
    document.getElementById("cmsOutputComparisonValues").innerHTML = frequency;
    cmsCanvasComparison.clearRect(0, 0, WIDTH, cmsCanvasComparison.canvas.height);
    drawGridBlocks(cmsCanvasComparison, cmsArrayComparison);
    drawBitsAll(cmsCanvasComparison, cmsArrayComparison, COLORS.FG, 341);
}
drawGridBlocks(cmsCanvasComparison, cmsArrayComparison);
drawBitsAll(cmsCanvasComparison, cmsArrayComparison, COLORS.FG, 341);


const cmsArrayMain = new Array(256).fill(0);
const cmsCanvasMain = initializeCanvas("cmsCanvasMain", 320);
const cmsButtonMainAdd = document.getElementById("cmsButtonMainAdd");
const cmsButtonMainQuery = document.getElementById("cmsButtonMainQuery");
cmsButtonMainAdd.onclick = async() => {
    await BFMSHelper(cmsArrayMain, bloomFilterAdd, "cmsInputMainAdd", "cmsOutputMainHash", "cmsOutputMainMessage", 3);
    cmsCanvasMain.clearRect(0, 0, WIDTH, cmsCanvasComparison.canvas.height);
    drawBitsAll(cmsCanvasMain, cmsArrayMain);
};
cmsButtonMainQuery.onclick = async() => {
    const frequency = await BFMSHelper(cmsArrayMain, bloomFilterCountQuery, "cmsInputMainQuery", "cmsOutputMainHash", "cmsOutputMainMessage", 3, "", true, cmsCanvasMain);
    document.getElementById("cmsOutputMainValues").innerHTML = frequency;
    document.getElementById("cmsOutputMainEstimate").innerHTML = Math.min(...frequency);
    cmsCanvasMain.clearRect(0, 0, WIDTH, cmsCanvasComparison.canvas.height);
    drawBitsAll(cmsCanvasMain, cmsArrayMain);
}
drawBitsAll(cmsCanvasMain, cmsArrayMain);


let cmsVarComparisonErrorsHashDepth = 32;
const cmsArrayComparisonErrors = new Array(256).fill(0);
const cmsCanvasComparisonErrors = initializeCanvas("cmsCanvasComparisonErrors", 650);
const cmsInputComparisonErrorsSlider = initializeSliders("cmsInputComparisonErrorsSlider", 1, 32, 1, cmsVarComparisonErrorsHashDepth);
const cmsButtonComparisonErrorsAdd = document.getElementById("cmsButtonComparisonErrorsAdd");
cmsInputComparisonErrorsSlider.addEventListener("change", function() {
    cmsVarComparisonErrorsHashDepth = cmsInputComparisonErrorsSlider.value;
    cmsOutputComparisonErrorsHashDepth.innerHTML = cmsVarComparisonErrorsHashDepth;
});
cmsButtonComparisonErrorsAdd.onclick = async() => {
    await BFMSHelper(cmsArrayComparisonErrors, bloomFilterAdd, "cmsInputComparisonErrorsAdd", "cmsOutputComparisonErrorsHash", "cmsOutputComparisonErrorsMessage", cmsVarComparisonErrorsHashDepth);
    cmsCanvasComparisonErrors.clearRect(0, 0, WIDTH, cmsCanvasComparisonErrors.canvas.height)
    drawGridBlocks(cmsCanvasComparisonErrors, cmsArrayComparisonErrors);
    drawBitsAll(cmsCanvasComparisonErrors, cmsArrayComparisonErrors, COLORS.FG, 341);
};
drawGridBlocks(cmsCanvasComparisonErrors, cmsArrayComparisonErrors);
drawBitsAll(cmsCanvasComparisonErrors, cmsArrayComparisonErrors, COLORS.FG, 341);


const cmsCanvasDifferentRange = initializeCanvas("cmsCanvasDifferentRange", 710);
drawBitsAll(cmsCanvasDifferentRange, [], COLORS.FG, 5, 613);
drawBitsAll(cmsCanvasDifferentRange, [], COLORS.FG, 405, 613);
cmsCanvasDifferentRange.beginPath();
initializeCanvasText(cmsCanvasDifferentRange, "left");
for (let i = 0; i < 2; i++)
    cmsCanvasDifferentRange.fillText("...", 5, 185 + i * 400);
for (let i = 0; i < 4; i++) {
    cmsCanvasDifferentRange.fillText(`hash${i}(x)`, 5, 25 + i * 40);
    cmsCanvasDifferentRange.fillText(`hash${i}(x)`, 5, 425 + i * 40);
    cmsCanvasDifferentRange.moveTo(150, 423 + i * 40); cmsCanvasDifferentRange.lineTo(591, 423 + i * 40);
    cmsCanvasDifferentRange.moveTo(150, 23 + i * 40); cmsCanvasDifferentRange.lineTo(521 + i * 20, 23 + i * 40);
    cmsCanvasDifferentRange.moveTo(531 + i * 20, 5); cmsCanvasDifferentRange.lineTo(521 + i * 20, 5);
    cmsCanvasDifferentRange.lineTo(521 + i * 20, 309); cmsCanvasDifferentRange.lineTo(531 + i * 20, 309);
}
cmsCanvasDifferentRange.stroke();
cmsCanvasDifferentRange.font = "24px JetBrains Mono";
cmsCanvasDifferentRange.fillText("Same hash range", 5, 295);
cmsCanvasDifferentRange.fillText("Separate hash ranges", 5, 695);


const cmsArraySketch = new Array(256).fill(0);
const cmsCanvasSketch = initializeCanvas("cmsCanvasSketch", 320);
const cmsButtonSketchAdd = document.getElementById("cmsButtonSketchAdd");
const cmsButtonSketchQuery = document.getElementById("cmsButtonSketchQuery");
cmsButtonSketchAdd.onclick = async() => {
    await BFMSHelper(cmsArraySketch, countSketchAdd, "cmsInputSketchAdd", "cmsOutputSketchHash", "cmsOutputSketchMessage", 8);
    cmsCanvasSketch.clearRect(0, 0, WIDTH, cmsCanvasSketch.canvas.height);
    drawBitsAll(cmsCanvasSketch, cmsArraySketch);
}
cmsButtonSketchQuery.onclick = async() => {
    const frequency = await BFMSHelper(cmsArraySketch, countSketchQuery, "cmsInputSketchQuery", "cmsOutputSketchHash", "cmsOutputSketchMessage", 8, "", true, cmsCanvasSketch);
    document.getElementById("cmsOutputSketchValues").innerHTML = frequency;
    document.getElementById("cmsOutputSketchEstimate").innerHTML = Math.min(...frequency);
    cmsCanvasSketch.clearRect(0, 0, WIDTH, cmsCanvasSketch.canvas.height);
    drawBitsAll(cmsCanvasSketch, cmsArraySketch);
}
drawBitsAll(cmsCanvasSketch, cmsArraySketch);


const hllCanvasCoinProbability = initializeCanvas("hllCanvasCoinProbability", 400);
drawCoins(hllCanvasCoinProbability, 176);
initializeCanvasText(hllCanvasCoinProbability, "center", "22px JetBrains Mono");
for (let i = 80; i < 1280; i += 160)
    hllCanvasCoinProbability.fillText("1/2", i, 196);
hllCanvasCoinProbability.beginPath();
for (let i = 0; i < 3; i ++) {
    hllCanvasCoinProbability.fillText(`1/${2 << (i + 1)}`, i * 80 + 161, 260 + i * 50);
    hllCanvasCoinProbability.moveTo(11, 231 + i * 50); hllCanvasCoinProbability.lineTo(11, 241 + i * 50);
    hllCanvasCoinProbability.lineTo(311 + i * 160, 241 + i * 50); hllCanvasCoinProbability.lineTo(311 + i * 160, 231 + i * 50);
}
hllCanvasCoinProbability.stroke();


let hllVarCoinObservationTosses = 0;
let hllVarCoinObservationZerosMax = 0;
const hllCanvasCoinObservation = initializeCanvas("hllCanvasCoinObservation", 200);
const hllButtonCoinObservationToss = document.getElementById("hllButtonCoinObservationToss");
const hllButtonCoinObservationReset = document.getElementById("hllButtonCoinObservationReset");
hllButtonCoinObservationToss.onclick = function() {
    hllVarCoinObservationTosses += 1;
    const hllVarCoinObservationRandom = Math.random() * 256;
    const hllVarCoinObservationZeros = countZeros(hllVarCoinObservationRandom, 8);
    if (hllVarCoinObservationZeros > hllVarCoinObservationZerosMax) {
        hllVarCoinObservationZerosMax = hllVarCoinObservationZeros;
        document.getElementById("hllOutputCoinObservationZerosMax").innerHTML = hllVarCoinObservationZerosMax;
    }
    hllCanvasCoinObservation.clearRect(0, 0, WIDTH, hllCanvasCoinObservation.canvas.height);
    drawCoins(hllCanvasCoinObservation, hllVarCoinObservationRandom);
    document.getElementById("hllOutputCoinObservationZeros").innerHTML = hllVarCoinObservationZeros;
    document.getElementById("hllOutputCoinObservationTosses").innerHTML = hllVarCoinObservationTosses;
}
hllButtonCoinObservationReset.onclick = function() {
    hllVarCoinObservationTosses = 0;
    hllVarCoinObservationZerosMax = 0;
    document.getElementById("hllOutputCoinObservationZeros").innerHTML = 0;
    document.getElementById("hllOutputCoinObservationZerosMax").innerHTML = 0;
    document.getElementById("hllOutputCoinObservationTosses").innerHTML = 0;
    hllCanvasCoinObservation.clearRect(0, 0, WIDTH, hllCanvasCoinObservation.canvas.height);
    drawCoins(hllCanvasCoinObservation, 0xFF);
}
drawCoins(hllCanvasCoinObservation, 0xFF);


let hllVarCoinEstimationTosses = 0;
let hllVarCoinEstimationZerosMax = 0;
const hllCanvasCoinEstimation = initializeCanvas("hllCanvasCoinEstimation", 200);
const hllButtonCoinEstimationToss = document.getElementById("hllButtonCoinEstimationToss");
const hllButtonCoinEstimationReset = document.getElementById("hllButtonCoinEstimationReset");
hllButtonCoinEstimationToss.onclick = function() {
    hllVarCoinEstimationTosses += 1;
    const hllVarCoinEstimationRandom = Math.random() * 256;
    const hllVarCoinEstimationZeros = countZeros(hllVarCoinEstimationRandom, 8);
    if (hllVarCoinEstimationZeros > hllVarCoinEstimationZerosMax) {
        hllVarCoinEstimationZerosMax = hllVarCoinEstimationZeros;
        document.getElementById("hllOutputCoinEstimationZerosMax").innerHTML = hllVarCoinEstimationZerosMax;
        document.getElementById("hllOutputCoinEstimationEstimate").innerHTML = 2 << (hllVarCoinEstimationZerosMax - 1);
    }
    hllCanvasCoinEstimation.clearRect(0, 0, WIDTH, hllCanvasCoinEstimation.canvas.height);
    drawCoins(hllCanvasCoinEstimation, hllVarCoinEstimationRandom);
    document.getElementById("hllOutputCoinEstimationZeros").innerHTML = hllVarCoinEstimationZeros;
    document.getElementById("hllOutputCoinEstimationTosses").innerHTML = hllVarCoinEstimationTosses;
}
hllButtonCoinEstimationReset.onclick = function() {
    hllVarCoinEstimationTosses = 0;
    hllVarCoinEstimationZerosMax = 0;
    document.getElementById("hllOutputCoinEstimationZeros").innerHTML = 0;
    document.getElementById("hllOutputCoinEstimationZerosMax").innerHTML = 0;
    document.getElementById("hllOutputCoinEstimationEstimate").innerHTML = 0;
    document.getElementById("hllOutputCoinEstimationTosses").innerHTML = 0;
    hllCanvasCoinEstimation.clearRect(0, 0, WIDTH, hllCanvasCoinEstimation.canvas.height);
    drawCoins(hllCanvasCoinEstimation, 0xFF);
}
drawCoins(hllCanvasCoinEstimation, 0xFF);


const hllSetBitsSet = new Set();
const hllVarBitsZerosMax = [0];
const hllVarBitsEstimates = [0];
const hllCanvasBits = initializeCanvas("hllCanvasBits", 48);
const hllButtonBitsAdd = document.getElementById("hllButtonBitsAdd");
const hllButtonBitsRandom = document.getElementById("hllButtonBitsRandom");
const hllButtonBitsReset = document.getElementById("hllButtonBitsReset");
hllButtonBitsAdd.onclick = async() => {
    hllCanvasBits.clearRect(0, 0, WIDTH, hllCanvasBits.canvas.height);
    await HLLHelper(hllVarBitsZerosMax, hllVarBitsEstimates, hllSetBitsSet, hllCanvasBits, "hllInputBitsAdd", "hllOutputBitsZeros", "hllOutputBitsZerosMax", "hllOutputBitsEstimate", "hllOutputBitsCardinality");
}
hllButtonBitsRandom.onclick = async() => {
    const randomString = generateRandomString(10);
    document.getElementById("hllInputBitsAdd").value = randomString;
    hllCanvasBits.clearRect(0, 0, WIDTH, hllCanvasBits.canvas.height);
    await HLLHelper(hllVarBitsZerosMax, hllVarBitsEstimates, hllSetBitsSet, hllCanvasBits, "hllInputBitsAdd", "hllOutputBitsZeros", "hllOutputBitsZerosMax", "hllOutputBitsEstimate", "hllOutputBitsCardinality");
}
hllButtonBitsReset.onclick = function() {
    hllSetBitsSet.clear();
    hllVarBitsZerosMax.fill(0);
    hllVarBitsEstimates.fill(1);
    document.getElementById("hllOutputBitsZeros").innerHTML = 0;
    document.getElementById("hllOutputBitsZerosMax").innerHTML = 0;
    document.getElementById("hllOutputBitsEstimate").innerHTML = 0;
    document.getElementById("hllOutputBitsCardinality").innerHTML = 0;
    hllCanvasBits.clearRect(0, 0, WIDTH, hllCanvasBits.canvas.height);
    drawBitArray(hllCanvasBits, 0xFFFFFFFF);
}
drawBitArray(hllCanvasBits, 0xFFFFFFFF);


const hllSetBucketSet = new Set();
const hllVarBucketZerosMax = new Array(MAX_COUNT).fill(0);
const hllVarBucketEstimates = new Array(MAX_COUNT).fill(1);
const hllCanvasBucket = initializeCanvas("hllCanvasBucket", 210);
const hllButtonBucketAdd = document.getElementById("hllButtonBucketAdd");
const hllButtonBucketRandom = document.getElementById("hllButtonBucketRandom");
const hllButtonBucketReset = document.getElementById("hllButtonBucketReset");
hllButtonBucketAdd.onclick = async() => {
    hllCanvasBucket.clearRect(0, 0, WIDTH, hllCanvasBucket.canvas.height);
    await HLLHelper(hllVarBucketZerosMax, hllVarBucketEstimates, hllSetBucketSet, hllCanvasBucket, "hllInputBucketAdd", "hllOutputBucketZeros", "hllOutputBucketZerosMax", "hllOutputBucketEstimates", "hllOutputBucketCardinality", "hllOutputBucketNumber", "hllOutputBucketMean");
}
hllButtonBucketRandom.onclick = async() => {
    const randomString = generateRandomString(10);
    document.getElementById("hllInputBucketAdd").value = randomString;
    hllCanvasBucket.clearRect(0, 0, WIDTH, hllCanvasBucket.canvas.height);
    await HLLHelper(hllVarBucketZerosMax, hllVarBucketEstimates, hllSetBucketSet, hllCanvasBucket, "hllInputBucketAdd", "hllOutputBucketZeros", "hllOutputBucketZerosMax", "hllOutputBucketEstimates", "hllOutputBucketCardinality", "hllOutputBucketNumber", "hllOutputBucketMean");
}
hllButtonBucketReset.onclick = function() {
    hllSetBucketSet.clear();
    hllVarBucketZerosMax.fill(0);
    hllVarBucketEstimates.fill(1);
    document.getElementById("hllOutputBucketNumber").innerHTML = 0;
    document.getElementById("hllOutputBucketZeros").innerHTML = 0;
    document.getElementById("hllOutputBucketZerosMax").innerHTML = hllVarBucketZerosMax.join(", ");
    document.getElementById("hllOutputBucketEstimates").innerHTML = hllVarBucketEstimates.join(", ");
    document.getElementById("hllOutputBucketMean").innerHTML = 0;
    document.getElementById("hllOutputBucketCardinality").innerHTML = 0;
    hllCanvasBucket.clearRect(0, 0, WIDTH, hllCanvasBucket.canvas.height);
    drawBitArray(hllCanvasBucket, 0xFFFFFFFF);
    drawBitBuckets(hllCanvasBucket, hllVarBucketZerosMax, 0, MAX_CELL_SUBS, GRID_Y_OFFSET, GRID_Y_OFFSET + 100, GRID_CELL_SIZE, GRID_CELL_SIZE * 2);
}
drawBitArray(hllCanvasBucket, 0xFFFFFFFF);
drawBitBuckets(hllCanvasBucket, hllVarBucketZerosMax, 0, MAX_CELL_SUBS, GRID_Y_OFFSET, GRID_Y_OFFSET + 100, GRID_CELL_SIZE, GRID_CELL_SIZE * 2);


const hllSetMainSet = new Set();
const hllVarMainZerosMax = new Array(16).fill(0);
const hllVarMainEstimates = new Array(16).fill(1);
const hllCanvasMain = initializeCanvas("hllCanvasMain", 210);
const hllButtonMainAdd = document.getElementById("hllButtonMainAdd");
const hllButtonMainRandom = document.getElementById("hllButtonMainRandom");
const hllButtonMainRandomK = document.getElementById("hllButtonMainRandomK");
const hllButtonMainReset = document.getElementById("hllButtonMainReset");
hllButtonMainAdd.onclick = async() => {
    hllCanvasMain.clearRect(0, 0, WIDTH, hllCanvasMain.canvas.height);
    await HLLHelper(hllVarMainZerosMax, hllVarMainEstimates, hllSetMainSet, hllCanvasMain, "hllInputMainAdd", "hllOutputMainZeros", "hllOutputMainZerosMax", "hllOutputMainEstimates", "hllOutputMainCardinality", "hllOutputMainNumber", "hllOutputMainMean", "hllOutputMainScaled");
}
hllButtonMainRandom.onclick = async() => {
    const randomString = generateRandomString(10);
    document.getElementById("hllInputMainAdd").value = randomString;
    hllCanvasMain.clearRect(0, 0, WIDTH, hllCanvasMain.canvas.height);
    await HLLHelper(hllVarMainZerosMax, hllVarMainEstimates, hllSetMainSet, hllCanvasMain, "hllInputMainAdd", "hllOutputMainZeros", "hllOutputMainZerosMax", "hllOutputMainEstimates", "hllOutputMainCardinality", "hllOutputMainNumber", "hllOutputMainMean", "hllOutputMainScaled");
}
hllButtonMainRandomK.onclick = async() => {
    for (let i = 0; i < 500; i++) {
        const randomString = generateRandomString(10);
        hllSetMainSet.add(randomString);
        hllAdd(randomString, hllVarMainZerosMax, MAX_CELL_SUBS);
    }
    await HLLHelper(hllVarMainZerosMax, hllVarMainEstimates, hllSetMainSet, hllCanvasMain, "hllInputMainAdd", "hllOutputMainZeros", "hllOutputMainZerosMax", "hllOutputMainEstimates", "hllOutputMainCardinality", "hllOutputMainNumber", "hllOutputMainMean", "hllOutputMainScaled");
}
hllButtonMainReset.onclick = function() {
    hllSetMainSet.clear();
    hllVarMainZerosMax.fill(0);
    hllVarMainEstimates.fill(1);
    document.getElementById("hllOutputMainNumber").innerHTML = 0;
    document.getElementById("hllOutputMainZeros").innerHTML = 0;
    document.getElementById("hllOutputMainZerosMax").innerHTML = hllVarMainZerosMax.join(", ");
    document.getElementById("hllOutputMainEstimates").innerHTML = hllVarMainEstimates.join(", ");
    document.getElementById("hllOutputMainMean").innerHTML = 0;
    document.getElementById("hllOutputMainScaled").innerHTML = 0;
    document.getElementById("hllOutputMainCardinality").innerHTML = 0;
    hllCanvasMain.clearRect(0, 0, WIDTH, hllCanvasMain.canvas.height);
    drawBitArray(hllCanvasMain, 0xFFFFFFFF);
    drawBitBuckets(hllCanvasMain, hllVarMainZerosMax, 0, MAX_CELL_SUBS, GRID_Y_OFFSET, GRID_Y_OFFSET + 100, GRID_CELL_SIZE, GRID_CELL_SIZE * 2);
}
drawBitArray(hllCanvasMain, 0xFFFFFFFF);
drawBitBuckets(hllCanvasMain, hllVarMainZerosMax, 0, MAX_CELL_SUBS, GRID_Y_OFFSET, GRID_Y_OFFSET + 100, GRID_CELL_SIZE, GRID_CELL_SIZE * 2);


const hllCanvasLogSpace = initializeCanvas("hllCanvasLogSpace", 300);
const hllLabelsLogSpace = ["65000 elements", "16 zeros", "4 bits"];
const hllRandomLogSpace = ["nKbwCzEjzSq", "xlMOWJanPAA", "GuwQVkfmqsl"];
initializeCanvasText(hllCanvasLogSpace, "center", "24px JetBrains Mono");
for (let i = 0; i < 3; i++) {
    hllCanvasLogSpace.fillText(hllLabelsLogSpace[i], 160 + i * 480, 251);
    hllCanvasLogSpace.font = "28px JetBrains Mono"; 
    hllCanvasLogSpace.fillText(hllRandomLogSpace[i], 160, 85 + i * 40);
}
hllCanvasLogSpace.font = "50px JetBrains Mono";
hllCanvasLogSpace.fillText("0000000", 641, 125);
drawBitsAll(hllCanvasLogSpace, [0], COLORS.FG, 71, 1071, 1, 1, 100);
hllCanvasLogSpace.beginPath();
hllCanvasLogSpace.moveTo(290, 121); hllCanvasLogSpace.lineTo(500, 121);
hllCanvasLogSpace.moveTo(780, 121); hllCanvasLogSpace.lineTo(1000, 121);
hllCanvasLogSpace.stroke();



// functions

async function getHash(str) {
    const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(str));
    const hashArray = new Uint8Array(hashBuffer);
    return hashArray;
}

function setHTML(id, content) {
    document.getElementById(id).innerHTML = content;
}

function renderSpans(array, prefix) {
    return array.map((word, index) => `<span id="${prefix}-${index}">${word}</span>`).join(" ");
}

function setButtonStatus(button, enabled) {
    if (enabled) {
        button.innerHTML = "Searching";
        button.disabled = true;
        button.style.pointerEvents = "none"
    } else {
        button.innerHTML = "Search";
        button.disabled = false;
        button.style.pointerEvents = "auto"
    }
}

function setupSearchButton(buttonId, inputId, searchFn) {
    const button = document.getElementById(buttonId);
    button.onclick = async() => {
        const inputText = document.getElementById(inputId).value.trim();
        if (!inputText) return;
        await searchFn(inputText, button);
    };
}

async function flashHighlight(element, delay) {
    element.classList.add("highlight");
    await new Promise(resolve => setTimeout(resolve, delay));
    element.classList.remove("highlight");
}

function clearHighlights(setContainer) {
    for (let child of document.getElementById(setContainer).children)
        child.classList.remove("highlight", "found");
}

function reportResult(found, setOutput, button, foundElement = null) {
    document.getElementById(setOutput).innerHTML = found ? "<b>Element found.</b>" : "Element not found.";
    if (foundElement) foundElement.classList.add("found");
    setButtonStatus(button, false);
    return found;
}

async function linearSearch(setContainer, inputText, setArray, setOutput, button) {
    setButtonStatus(button, true);
    clearHighlights(setContainer);
    for (let i = 0; i < setArray.length; i++) {
        const currentWord = document.getElementById(`setSpanLinear-${i}`);
        await flashHighlight(currentWord, 200);
        if (setArray[i] === inputText)
            return reportResult(true, setOutput, button, currentWord);
    }
    return reportResult(false, setOutput, button);
}

async function binarySearch(setContainer, inputText, setArray, setOutput, setFunctionType, button) {
    setButtonStatus(button, true);
    clearHighlights(setContainer);
    let left = 0;
    let right = setArray.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        const currentWord = document.getElementById(`setSpan${setFunctionType}-${mid}`);
        await flashHighlight(currentWord, 500);
        if (setArray[mid] === inputText)
            return reportResult(true, setOutput, button, currentWord);
        if (setArray[mid] < inputText) left = mid + 1;
        else right = mid - 1;
    }
    return reportResult(false, setOutput, button);
}

function drawCoins(canvas, number, coins = 8, radius = 70, colorFG = COLORS.FG, stroke = COLORS.FG, lineWidth = LINEWIDTH, width = WIDTH, height = 200) {
    canvas.strokeStyle = stroke;
    canvas.lineWidth = lineWidth;
    const y = height / 2;
    for (i = 0; i < coins; i++) {
        var x = (i* width / coins) + (width / (2 * coins));
        canvas.beginPath();
        canvas.arc(x, y, radius, 0, Math.PI * 2);
        if (((number >> i) & 1) === 0) {
            canvas.fillStyle = colorFG;
            canvas.fill()
        }
        canvas.stroke();
    }
}

function drawBitArray(canvas, number, xOffset = 5, yOffset = 5, color = COLORS.FG, length = GRID_COLS, cellSize = GRID_CELL_SIZE, cellPadding = GRID_CELL_PADDING, stroke = COLORS.FG, lineWidth = LINEWIDTH) {
    const bits = new Array(length).fill(0);
    for (let i = 0; i < length; i++)
        if (((number >> i) & 1) == 0)
            bits[i] = 1;
    drawGridBlocks(canvas, bits, color, yOffset, xOffset, 1, length, cellSize, cellPadding, stroke, lineWidth);
}

function countZeros(number, size, start = 0) {
    for (let i = start; i < size; i++)
        if ((number >> i) & 1 === 1)
            return i - start;
    return size;
}

function getBucket(hash, bucketBits) {
    const buckets = 1 << bucketBits;
    let masked = (hash & (buckets - 1));
    let bucket = 0;
    for (let i = 0; i < bucketBits; i++) {
        bucket = (bucket << 1) | (masked & 1);
        masked = masked >> 1;
    }
    return bucket;
}

async function hllAdd(element, buckets, bucketBits = MAX_CELL_SUBS, maxFrequency = MAX_COUNT) {
    const hashArray = await getHash(element);
    const hash = ((hashArray[0] << 24) | (hashArray[1] << 16) | (hashArray[2] << 8) | hashArray[3]);
    const bucket = getBucket(hash, bucketBits);
    const zeros = countZeros(hash, 32, bucketBits);
    if (zeros > buckets[bucket]) buckets[bucket] = zeros % maxFrequency;
    return hash;
}

function hllQuery(buckets, estimates) {
    for (let bucket = 0; bucket < buckets.length; bucket++)
        estimates[bucket] = 1 << (buckets[bucket]);
    let sum = 0;
    for (let i = 0; i < buckets.length; i++)
        sum += 1/estimates[i];
    return Math.floor(buckets.length * buckets.length * 2 / sum); // x2 cuz bitshift prob is off-by-one
}

async function HLLHelper(buckets, estimates, hllSet, canvas, inputElementID, outputZerosID, outputZerosMaxID, outputEstimatesID, outputCardinalityID, outputBucketID, outputMeanID, outputScaledID, cellSize = GRID_CELL_SIZE) {
    const inputText = document.getElementById(inputElementID).value.trim();
    if (!inputText) return;
    hllSet.add(inputText);
    const bucketBits = Math.floor(Math.log2(buckets.length));
    const hash = await hllAdd(inputText, buckets, bucketBits)
    const bucket = getBucket(hash, bucketBits);
    console.log(hash, bucket);
    const cardinality = hllQuery(buckets, estimates);
    document.getElementById(outputZerosID).innerHTML = countZeros(hash, 32, bucketBits);
    document.getElementById(outputZerosMaxID).innerHTML = buckets.join(", ");
    document.getElementById(outputEstimatesID).innerHTML = estimates.join(", ");
    document.getElementById(outputCardinalityID).innerHTML = hllSet.size;
    if (outputMeanID) document.getElementById(outputMeanID).innerHTML = cardinality;
    if (outputBucketID) document.getElementById(outputBucketID).innerHTML = bucket;
    if (outputScaledID) document.getElementById(outputScaledID).innerHTML = Math.floor(cardinality * 0.7213 / (1 + 1.079 / buckets.length));
    if (outputBucketID) drawBitBuckets(canvas, buckets, bucket, bucketBits, GRID_Y_OFFSET, GRID_Y_OFFSET + 100, cellSize, cellSize * 2);
    drawBitArray(canvas, hash);
}

function drawBitBuckets(canvas, buckets, bucket, bucketBits, yOffsetBits, yOffsetBuckets, cellSizeBits, cellSizeBuckets, trianglePad = 10, xOffset = GRID_X_OFFSET) {
    drawBitsAll(canvas, buckets, COLORS.FG, yOffsetBuckets, xOffset, 1, MAX_COUNT, cellSizeBuckets);
    drawTriangle(canvas, xOffset + cellSizeBuckets / 2 + cellSizeBuckets * bucket, yOffsetBuckets + cellSizeBuckets + trianglePad);
    for (let i = 0; i < bucketBits; i++)
        drawTriangle(canvas, xOffset + cellSizeBits / 2 + cellSizeBits * i, yOffsetBits + cellSizeBits + trianglePad);
}

function drawTriangle(canvas, xOffset = 10, yOffset = 10, color = COLORS.FG, size = ARROW_SIZE) {
    canvas.beginPath();
    canvas.moveTo(xOffset, yOffset);
    canvas.lineTo(xOffset - size, yOffset + size);
    canvas.lineTo(xOffset + size, yOffset + size);
    canvas.closePath(); 
    canvas.fillStyle = color;
    canvas.fill();
}

function drawArrowBracket(canvas, x1, x2, shaftX, lineY, shaftY, size = ARROW_SIZE) {
    canvas.beginPath();
    canvas.moveTo(x1, lineY);
    canvas.lineTo(x2, lineY);
    canvas.moveTo(shaftX, lineY);
    canvas.lineTo(shaftX, shaftY);
    canvas.moveTo(shaftX, shaftY + size);
    canvas.lineTo(shaftX - size, shaftY);
    canvas.lineTo(shaftX + size, shaftY);
    canvas.closePath();
    canvas.stroke();
}

function drawGrid(canvas, yOffset = GRID_Y_OFFSET, xOffset = GRID_X_OFFSET, gridRows = GRID_ROWS, gridCols = GRID_COLS, cellSize = GRID_CELL_SIZE, color = COLORS.FG, lineWidth = LINEWIDTH) {
    canvas.strokeStyle = color;
    canvas.lineWidth = lineWidth;
    canvas.beginPath();
    for (let row = 0; row <= gridRows; row++) {
        canvas.moveTo(xOffset, yOffset + row * cellSize);
        canvas.lineTo(xOffset + cellSize * gridCols, yOffset + row * cellSize);
    }
    for (let col = 0; col <= gridCols; col++) {
        canvas.moveTo(xOffset + col * cellSize, yOffset);
        canvas.lineTo(xOffset + col * cellSize, yOffset + gridRows * cellSize);
    }
    canvas.closePath();
    canvas.stroke();

}

function drawGridBlocks(canvas, blocks, color = COLORS.FG, yOffset = GRID_Y_OFFSET, xOffset = GRID_X_OFFSET, gridRows = GRID_ROWS, gridCols = GRID_COLS, cellSize = GRID_CELL_SIZE, cellPadding = GRID_CELL_PADDING, gridColor = COLORS.FG, lineWidth = LINEWIDTH) {
    canvas.fillStyle = color;
    for (let block = 0; block < blocks.length; block++) {
        if (blocks[block] === 0) continue;
        const x = (block % gridCols) * cellSize + xOffset;
        const y = Math.floor(block / gridCols) * cellSize + yOffset;
        canvas.fillRect(x + cellPadding, y + cellPadding, cellSize - cellPadding * 2, cellSize - cellPadding * 2);
    }
    drawGrid(canvas, yOffset, xOffset, gridRows, gridCols, cellSize, gridColor, lineWidth);
}

function drawBits(canvas, number, xOffset, yOffset, color = COLORS.FG, cellLength = GRID_SUB_CELL_LENGTH, cellSize = GRID_SUB_CELL_SIZE) {
    const binaryArraySize = cellLength * cellLength;
    const binaryString = number.toString(2).padStart(binaryArraySize, '0');
    const binaryArray = [...binaryString].map(Number);
    drawGridBlocks(canvas, binaryArray, color, yOffset, xOffset, cellLength, cellLength, cellSize);
}

function drawBitsGrid(canvas, yOffset = GRID_Y_OFFSET, xOffset = GRID_X_OFFSET, gridRows = GRID_ROWS, gridCols = GRID_COLS, cellSize = GRID_CELL_SIZE, cellLength = GRID_SUB_CELL_LENGTH, cellPadding = GRID_CELL_PADDING, colorMain = COLORS.FG, colorSub = COLORS.GRAY, lineWidth = LINEWIDTH) {
    drawGrid(canvas, yOffset, xOffset, gridRows * cellLength, gridCols * cellLength, cellSize / cellLength, colorSub, lineWidth);
    drawGrid(canvas, yOffset, xOffset, gridRows, gridCols, cellSize, colorMain, lineWidth);
}

function drawBitsAll(canvas, counters, color = COLORS.FG, yOffset = GRID_Y_OFFSET, xOffset = GRID_X_OFFSET, gridRows = GRID_ROWS, gridCols = GRID_COLS, cellSize = GRID_CELL_SIZE, cellLength = GRID_SUB_CELL_LENGTH, cellPadding = GRID_CELL_PADDING, gridColor = COLORS.FG, gridColorSub = COLORS.GRAY, lineWidth = LINEWIDTH) {
    for (let counter = 0; counter < counters.length; counter++) {
        if (counters[counter] == 0) continue;
        const x = (counter % gridCols) * cellSize + xOffset;
        const y = Math.floor(counter / gridCols) * cellSize + yOffset;
        drawBits(canvas, counters[counter], x, y, color, cellLength, cellSize / cellLength);
    }
    drawBitsGrid(canvas, yOffset, xOffset, gridRows, gridCols, cellSize, cellLength, cellPadding, gridColor, gridColorSub, lineWidth);
}

async function BFMSHelper(bitArray, mainFunction, inputElementID, hashOutputElementID, messageOutputElementID, hashDepth, message = "Element added.", gridFlash = false, canvas, flashColor = COLORS.BLUE, yOffset = GRID_Y_OFFSET) {
    const inputText = document.getElementById(inputElementID).value.trim();
    if (!inputText) return;
    const hashes = (await getHash(inputText)).slice(0, hashDepth);
    const result = mainFunction(hashes, bitArray, hashDepth);
    if (gridFlash) await flashGrid(canvas, hashes, bitArray, flashColor, yOffset);
    document.getElementById(hashOutputElementID).innerHTML = hashes.slice(0, hashDepth).join(", ");
    document.getElementById(messageOutputElementID).innerHTML = message;
    return result;
}

async function flashGrid(canvas, hashes, bitArray, flashColor, yOffset) {
    const blocks = new Array(bitArray.length).fill(0);
    hashes.forEach(i => { blocks[i] = 1; });
    drawGridBlocks(canvas, blocks, flashColor, yOffset);
    await new Promise(resolve => setTimeout(resolve, 500));
    canvas.clearRect(0, 0, WIDTH, canvas.canvas.height);
}

function bloomFilterAdd(hash, bitArray, hashDepth = 1, maxFrequency = MAX_COUNT) {
    for (i = 0; i < hashDepth; i++)
        bitArray[(hash[i])] = (bitArray[(hash[i])] + 1) % maxFrequency;
    return hash;
}

function bloomFilterRemove(hash, bitArray, hashDepth = 1) {
    for (let i = 0; i < hashDepth; i++)
        bitArray[hash[i]] = 0;
    return hash;
}

function countSketchAdd(hash, bitArray, hashDepth = 1, cmsWidth = GRID_COLS, maxFrequency = MAX_COUNT) {
    for (i = 0; i < hashDepth; i++) {
        hash[i] = (i * cmsWidth) + (hash[i] % cmsWidth);
        bitArray[hash[i]] = (bitArray[hash[i]] + 1) % maxFrequency;
    }
    return hash;
}

function countSketchQuery(hash, bitArray, hashDepth = 1, cmsWidth = GRID_COLS) {
    const frequency = new Array(hashDepth).fill(0);
    for (let i = 0; i < hashDepth; i++) {
        hash[i] = (i * cmsWidth) + (hash[i] % cmsWidth);
        frequency[i] = bitArray[hash[i]];
    }
    return frequency;
}

function bloomFilterQuery(hash, bitArray, hashDepth = 1) {
    let exists = true;
    for (let i = 0; i < hashDepth; i++)
        if (bitArray[hash[i]] === 0)
            exists = false;
    return exists;
}

function bloomFilterCountQuery(hash, bitArray, hashDepth = 1) {
    const frequency = new Array(hashDepth).fill(0);
    for (let i = 0; i < hashDepth; i++)
        frequency[i] = bitArray[hash[i]];
    return frequency;
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var result = '';
    for (let i = 0; i < length; i++) {
        var index = Math.floor(Math.random() * characters.length);
        result += characters[index];
    }
    return result;
}

function getColors() {
    const styles = getComputedStyle(document.documentElement);
    const colors = {
        FG: styles.getPropertyValue("--fg").trim(),
        BG: styles.getPropertyValue("--bg").trim(),
        GRAY: styles.getPropertyValue("--gray2").trim(),
        BLUE: styles.getPropertyValue("--blue").trim(),
        RED: styles.getPropertyValue("--red").trim(),
    }
    return colors;
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
    var canvasObject = document.getElementById(canvasID).getContext("2d");
    canvasObject.canvas.width = width;
    canvasObject.canvas.height = height;
    return canvasObject;
}

function initializeCanvasText(canvas, horizontal = "center", font = "28px JetBrains Mono", vertical = "middle", color = COLORS.FG) {
    canvas.font = font;
    canvas.textBaseline = vertical;
    canvas.textAlign = horizontal;
    canvas.fillStyle = color;
}
