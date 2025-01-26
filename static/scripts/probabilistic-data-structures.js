// A lot of this code can be refactored to follow the DRY principles
// But this is the first time I am writing JS and learning as I go
// So this code might look very ugly; if you think it is the case
// send PRs, since I am too lazy to return back to refactor it myself

// hash function
const encoder = new TextEncoder();
async function getHash(str) {
    const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(str));
    const hashArray = new Uint8Array(hashBuffer);
    return hashArray;
}

// update hash
const hashBoxButton = document.getElementById("hashBoxButton");
hashBoxButton.onclick = async() => {
    const hashBoxInput = document.getElementById("hashBoxInput").value;
    const hash = await getHash(hashBoxInput);
    document.getElementById("hashBoxOutput").innerHTML = hash[0];
}

// initialize set lists
const setArrayMain = ["world", "firm", "bat", "if", "glance", "analysis", "reasonable", "resident", "verdict", "world", "snub", "greet", "snub", "half", "speed", "exception", "speed", "helmet", "theorist", "please", "operational", "hello", "nursery", "background", "appreciate", "congress", "verdict", "dictionary", "current", "nursery", "snub", "piece", "dilute", "elapse", "congress", "verdict", "confusion", "fan", "breast", "sting", "disagreement", "helmet", "tape"];
const setArrayHashes = [4, 17, 23, 32, 33, 35, 44, 47, 50, 52, 56, 61, 72, 77, 83, 86, 93, 117, 132, 137, 139, 147, 151, 161, 162, 187, 202, 213, 226, 231, 243, 244];
const setArraySorted = setArrayMain.toSorted();
const setArrayUnique = [... new Set(setArraySorted)];

// append lists to page
document.getElementById("setContainerStatic").innerHTML = setArrayMain.join(" ");
document.getElementById("setContainerLinear").innerHTML = setArrayMain.map((word, index) => `<span id="setSpanLinear-${index}">${word}</span>`).join(" ");
document.getElementById("setContainerBinary").innerHTML = setArraySorted.map((word, index) => `<span id="setSpanBinary-${index}">${word}</span>`).join(" ");
document.getElementById("setContainerUnique").innerHTML = setArrayUnique.map((word, index) => `<span id="setSpanUnique-${index}">${word}</span>`).join(" ");
document.getElementById("setContainerHashes").innerHTML = setArrayHashes.map((word, index) => `<span id="setSpanHashes-${index}">${word}</span>`).join(" ");

// linear search
async function linearSearch(setContainer, target, setArray, setOutput) {
    var children = document.getElementById(setContainer).children;
    for (let child of children) {child.classList.remove("highlight", "found");};
    for (let i = 0; i < setArray.length; i++) {
        const currentWord = document.getElementById(`setSpanLinear-${i}`);
        currentWord.classList.add("highlight");
        await new Promise(resolve => setTimeout(resolve, 200));
        if (setArray[i] === target) {
            currentWord.classList.remove("highlight");
            currentWord.classList.add("found");
            document.getElementById(setOutput).innerHTML = "<b>Element found.</b>";
            return true;
        }
        currentWord.classList.remove("highlight");
    }
    document.getElementById(setOutput).innerHTML = "Element not found.";
    return false;
}

// binary search
async function binarySearch(setContainer, target, setArray, setOutput, setFunctionType) {
    var tmpWords = document.getElementById(setContainer).children;
    for (let child of tmpWords) {child.classList.remove("highlight", "found");};
    let left = 0;
    let right = setArray.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        const currentWord = document.getElementById(`setSpan${setFunctionType}-${mid}`);
        currentWord.classList.add("highlight");
        await new Promise(resolve => setTimeout(resolve, 500));
        if (setArray[mid] === target) {
            currentWord.classList.remove("highlight");
            currentWord.classList.add("found");
            document.getElementById(setOutput).innerHTML = "<b>Element found.</b>";
            return true;
        }
        currentWord.classList.remove("highlight");
        if (setArray[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    document.getElementById(setOutput).innerHTML = "Element not found.";
    return false;
}

const setButtonLinear = document.getElementById("setButtonLinear");
setButtonLinear.onclick = async() => {
    var target = document.getElementById("setInputLinear").value.trim();
    if (!target) return;
    await linearSearch("setContainerLinear", target, setArrayMain, "setOutputLinear");
};

const setButtonBinary = document.getElementById("setButtonBinary");
setButtonBinary.onclick = async() => {
    var target = document.getElementById("setInputBinary").value.trim();
    if (!target) return;
    await binarySearch("setContainerBinary", target, setArraySorted, "setOutputBinary", "Binary");
};

const setButtonUnique = document.getElementById("setButtonUnique");
setButtonUnique.onclick = async() => {
    var target = document.getElementById("setInputUnique").value.trim();
    if (!target) return;
    await binarySearch("setContainerUnique", target, setArrayUnique, "setOutputUnique", "Unique");
};

const setButtonHashes = document.getElementById("setButtonHashes");
setButtonHashes.onclick = async() => {
    var target = document.getElementById("setInputHashes").value.trim();
    if (!target) return;
    target = await getHash(target);
    document.getElementById("setOutputHashesHash").innerHTML = target[0];
    await binarySearch("setContainerHashes", target[0], setArrayHashes, "setOutputHashes", "Hashes");
};

// initialise canvas
function drawCanvas(canvasID, width = 1280, height = 640) {
    var canvasObject = document.getElementById(canvasID).getContext("2d");
        canvasObject.canvas.width = width;
        canvasObject.canvas.height = height;
}

// draw bit array background
const squareSize = 38, gridRows = 8, gridCols = 32, gridXOffset = 5; gridYOffset = 5;
function drawGrid(canvasID, squaresize = squareSize, gridrows = gridRows, gridcols = gridCols, xOffset = gridXOffset, yOffset = gridYOffset, stroke ="#000", fillBlock = false, color = "#fff", strokewidth = 2) {
    var canvasObject = document.getElementById(canvasID).getContext("2d");
    for (let row = 0; row < gridrows; row++) {
        for (let col = 0; col < gridcols; col++) {
            const x = col * squaresize + xOffset;
            const y = row * squaresize + yOffset;
            canvasObject.strokeStyle = stroke;
            canvasObject.lineWidth = strokewidth;
            canvasObject.strokeRect(x, y, squaresize, squaresize);
            if (fillBlock) {
                canvasObject.fillStyle = color;
                canvasObject.fillRect(x + 2, y + 2, squaresize - 4, squaresize - 4);
            }
        }   
    }
}

function drawBlock(canvasID, target, color = "#000", squaresize = squareSize, gridcols = gridCols, xOffset = gridXOffset, yOffset = gridYOffset) {
    var canvasObject = document.getElementById(canvasID).getContext("2d");
    canvasObject.fillStyle = color;
    var y = Math.floor(target / gridcols) * squaresize + yOffset;
    var x = (target % gridcols) * squaresize + xOffset;
    canvasObject.fillRect(x + 2, y + 2, squaresize - 4, squaresize - 4);
}

// draw bit array black blocks
function drawBlocks(canvasID, array, color = "#000", squaresize = squareSize, gridcols = gridCols, xOffset = gridXOffset, yOffset = gridYOffset) {
    for (let i = 0; i < array.length; i++) {
        drawBlock(canvasID, array[i], color, squaresize, gridcols, xOffset, yOffset);
    }
}

function drawBits(canvasID, number, xOffset, yOffset, squarelength = 2, squaresize = 19, colorFG = "#000", colorBG = "#fff") {
    var binaryArraySize = squarelength * squarelength;
    var binaryString = number.toString(2).padStart(binaryArraySize, '0');
    var binaryArray = [...binaryString].map(Number).reverse();
    for (let i = 0; i < binaryArraySize; i++) {
        if (binaryArray[binaryArraySize - i - 1] === 1)
            drawBlock(canvasID, i, colorFG, squaresize, squarelength, xOffset, yOffset);
        else
            drawBlock(canvasID, i, colorBG, squaresize, squarelength, xOffset, yOffset);
    }
}


// add to bit array
async function arrayAdd(bfArray, queryInput, hashOutput, messageOutput, hashDepth, cms = false, cmsWidth = 32) {
    var target = document.getElementById(queryInput).value.trim();
    if (!target) return;
    target = await getHash(target);
    if (cms)
        for (let i = 0; i < hashDepth; i++)
            target[i] = i * cmsWidth + (target[i] % cmsWidth);
    document.getElementById(hashOutput).innerHTML = target.slice(0, hashDepth).join(", ");
    document.getElementById(messageOutput).innerHTML = "Element added.";
    for (i = 0; i < hashDepth; i++)
        bfArray[(target[i])] += 1;
    return target;
}

async function arrayRemove(canvasID, bfArray, queryInput, hashOutput, queryOutput, hashDepth) {
    var target = document.getElementById(queryInput).value.trim();
    if (!target) return;
    target = await getHash(target);
    document.getElementById(hashOutput).innerHTML = target.slice(0, hashDepth).join(", ");
    drawBlocks(canvasID, target.slice(0, hashDepth), "#f45");
    await new Promise(resolve => setTimeout(resolve, 500));
    for (let i = 0; i < hashDepth; i++) {
        drawBlock(canvasID, target[i], "#fff");
        bfArray[target[i]] = 0;
    }
    document.getElementById(queryOutput).innerHTML = "Element removed.";
}

// show and query bitarray position
async function arrayQuery(canvasID, bfArray, queryInput, hashOutput, queryOutput, hashDepth, maxFrequency = 16, xOffset = gridXOffset, yOffset = gridYOffset, squaresize = squareSize, gridcols = gridCols, draw = true, cms = false, cmsWidth = 32) {
    var target = document.getElementById(queryInput).value.trim();
    if (!target) return;
    target = await getHash(target);
    if (cms)
        for (let i = 0; i < hashDepth; i++)
            target[i] = i * cmsWidth + (target[i] % cmsWidth);
    document.getElementById(hashOutput).innerHTML = target.slice(0, hashDepth).join(", ");
    drawBlocks(canvasID, target.slice(0, hashDepth), "#999", squaresize, gridcols, xOffset, yOffset);
    await new Promise(resolve => setTimeout(resolve, 500));
    var bfSimilarity = true;
    var frequency = new Array(hashDepth).fill(0);
    for (let i = 0; i < hashDepth; i++) {
        frequency[i] = bfArray[target[i]] % maxFrequency;
        if (bfArray[target[i]] === 0) {
            if (draw)
                drawBlock(canvasID, target[i], "#fff");
            bfSimilarity = false;
        }
        else
            if (draw)
                drawBlock(canvasID, target[i], "#000");
    }
    if (bfSimilarity)
        document.getElementById(queryOutput).innerHTML = "<b>Element found.</b>";
    else
        document.getElementById(queryOutput).innerHTML = "Element not found.";
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

drawCanvas("bfCanvasAdd", 1280, 320);
drawCanvas("bfCanvasQuery", 1280, 320);
drawCanvas("bfCanvasCollision", 1280, 320);
drawCanvas("bfCanvasMultiple", 1280, 320);
drawCanvas("bfCanvasSaturated", 1280, 320);
drawCanvas("bfCanvasBigger", 1280, 920);
drawCanvas("bfCanvasDeletion", 1280, 320);
drawCanvas("bfCanvasCounting", 1280, 320);
drawGrid("bfCanvasAdd");
drawGrid("bfCanvasQuery");
drawGrid("bfCanvasCollision");
drawGrid("bfCanvasMultiple");
drawGrid("bfCanvasSaturated");
drawGrid("bfCanvasBigger", 38, 24, 32);
drawGrid("bfCanvasDeletion");
drawGrid("bfCanvasCounting");
for (let i = 0; i < 256; i++)
    drawBlock("bfCanvasSaturated", i, "#000");

// initialize bloom filter arrays
var bfArrayAddQuery = new Array(256).fill(0);
var bfArrayCollision = new Array(256).fill(0);
var bfArrayMultiple = new Array(256).fill(0);
var bfArraySaturated = new Array(256).fill(1);
var bfArrayBigger = new Array(256).fill(0);
var bfArrayDeletion = new Array(256).fill(0);
var bfArrayCounting = new Array(256).fill(0);

const bfButtonAdd = document.getElementById("bfButtonAdd");
bfButtonAdd.onclick = async() => {
    var target = await arrayAdd(bfArrayAddQuery, "bfInputAdd", "bfOutputAddHash", "bfOutputAddMessage", 1);
    drawBlock("bfCanvasAdd", target[0]);
    drawBlock("bfCanvasQuery", target[0]);
};
const bfButtonQuery = document.getElementById("bfButtonQuery");
bfButtonQuery.onclick = async() => {
    await arrayQuery("bfCanvasQuery", bfArrayAddQuery, "bfInputQuery", "bfOutputQueryHash", "bfOutputQueryMessage", 1);
}
const bfButtonCollisionAdd = document.getElementById("bfButtonCollisionAdd");
bfButtonCollisionAdd.onclick = async() => {
    var target = await arrayAdd(bfArrayCollision, "bfInputCollisionAdd", "bfOutputCollisionHash", "bfOutputCollisionMessage", 1);
    drawBlock("bfCanvasCollision", target[0]);
};
const bfButtonCollisionQuery = document.getElementById("bfButtonCollisionQuery");
bfButtonCollisionQuery.onclick = async() => {
    await arrayQuery("bfCanvasCollision", bfArrayCollision, "bfInputCollisionQuery", "bfOutputCollisionHash", "bfOutputCollisionMessage", 1);
}

var bfHashDepth = 3;
const bfOutputMultipleHashDepth = document.getElementById("bfOutputMultipleHashDepth");
const bfInputMultipleSlider = document.getElementById("bfInputMultipleSlider");
bfInputMultipleSlider.min = 1;
bfInputMultipleSlider.max = 10;
bfInputMultipleSlider.step = 1;
bfInputMultipleSlider.value = bfHashDepth;
bfInputMultipleSlider.addEventListener("change", function() {
    bfHashDepth = bfInputMultipleSlider.value;
    bfOutputMultipleHashDepth.innerHTML = bfInputMultipleSlider.value
});

const bfButtonMultipleAdd = document.getElementById("bfButtonMultipleAdd");
bfButtonMultipleAdd.onclick = async() => {
    var target = await arrayAdd(bfArrayMultiple, "bfInputMultipleAdd", "bfOutputMultipleHash", "bfOutputMultipleMessage", bfHashDepth);
    drawBlocks("bfCanvasMultiple", target.slice(0, bfHashDepth));
};
const bfButtonMultipleQuery = document.getElementById("bfButtonMutlipleQuery");
bfButtonMultipleQuery.onclick = async() => {
    await arrayQuery("bfCanvasMultiple", bfArrayMultiple, "bfInputMultipleQuery", "bfOutputMultipleHash", "bfOutputMultipleMessage", bfHashDepth);
}
const bfButtonSaturatedQuery = document.getElementById("bfButtonSaturatedQuery");
bfButtonSaturatedQuery.onclick = async() => {
    await arrayQuery("bfCanvasSaturated", bfArraySaturated, "bfInputSaturatedQuery", "bfOutputSaturatedHash", "bfOutputSaturatedMessage", 3);
}
const bfButtonBiggerAdd = document.getElementById("bfButtonBiggerAdd");
bfButtonBiggerAdd.onclick = async() => {
    var target = await arrayAdd(bfArrayBigger, "bfInputBiggerAdd", "bfOutputBiggerHash", "bfOutputBiggerMessage", 3);
    drawBlock("bfCanvasBigger", target[6], "#000", squareSize, gridCols, 5, 5);
    drawBlock("bfCanvasBigger", target[7], "#000", squareSize, gridCols, 5, 309);
    drawBlock("bfCanvasBigger", target[8], "#000", squareSize, gridCols, 5, 613);
    // inaccurate and ugly hack, but using it since used only once
};
const bfButtonBiggerAddRandom = document.getElementById("bfButtonBiggerAddRandom");
bfButtonBiggerAddRandom.onclick = async() => {
    var bfVarBiggerRandom = generateRandomString(8);
    document.getElementById("bfInputBiggerAdd").value = bfVarBiggerRandom;
    var target = await arrayAdd(bfArrayBigger, "bfInputBiggerAdd", "bfOutputBiggerHash", "bfOutputBiggerMessage", 3);
    drawBlock("bfCanvasBigger", target[6], "#000", squareSize, gridCols, 5, 5);
    drawBlock("bfCanvasBigger", target[7], "#000", squareSize, gridCols, 5, 309);
    drawBlock("bfCanvasBigger", target[8], "#000", squareSize, gridCols, 5, 613);
};
const bfButtonDeletionAdd = document.getElementById("bfButtonDeletionAdd");
bfButtonDeletionAdd.onclick = async() => {
    var target = await arrayAdd(bfArrayDeletion, "bfInputDeletionAdd", "bfOutputDeletionHash", "bfOutputDeletionMessage", 3);
    drawBlocks("bfCanvasDeletion", target.slice(0, 3));
};
const bfButtonDeletionQuery = document.getElementById("bfButtonDeletionQuery");
bfButtonDeletionQuery.onclick = async() => {
    await arrayQuery("bfCanvasDeletion", bfArrayDeletion, "bfInputDeletionQuery", "bfOutputDeletionHash", "bfOutputDeletionMessage", 3);
}
const bfButtonDeletionRemove = document.getElementById("bfButtonDeletionRemove");
bfButtonDeletionRemove.onclick = async() => {
    await arrayRemove("bfCanvasDeletion", bfArrayDeletion, "bfInputDeletionRemove", "bfOutputDeletionHash", "bfOutputDeletionMessage", 3); 
}
const bfButtonCountingAdd = document.getElementById("bfButtonCountingAdd");
bfButtonCountingAdd.onclick = async() => {
    var target = await arrayAdd(bfArrayCounting, "bfInputCountingAdd", "bfOutputCountingHash", "bfOutputCountingMessage", 3);
    drawBlocks("bfCanvasCounting", target.slice(0, 3));
};
const bfButtonCountingQuery = document.getElementById("bfButtonCountingQuery");
bfButtonCountingQuery.onclick = async() => {
    await arrayQuery("bfCanvasCounting", bfArrayCounting, "bfInputCountingQuery", "bfOutputCountingHash", "bfOutputCountingMessage", 3);
}

var cmsArrayComparison = new Array(256).fill(0);
drawCanvas("cmsCanvasComparison", 1280, 650);
drawGrid("cmsCanvasComparison", 38, 8, 32);
drawGrid("cmsCanvasComparison", 19, 16, 64, gridXOffset, 341, "#999");
drawGrid("cmsCanvasComparison", 38, 8, 32, gridXOffset, 341, "#000");
const cmsButtonComparisonAdd = document.getElementById("cmsButtonComparisonAdd");
cmsButtonComparisonAdd.onclick = async() => {
    var target = await arrayAdd(cmsArrayComparison, "cmsInputComparisonAdd", "cmsOutputComparisonHash", "cmsOutputComparisonMessage", 3);
    drawBlocks("cmsCanvasComparison", target.slice(0, 3));
    for (let i = 0; i < 3; i++) {
        var xOffset = (target[i] % gridCols) * squareSize + gridXOffset;
        var yOffset = Math.floor(target[i] / gridCols) * squareSize + 341;
        drawBits("cmsCanvasComparison", cmsArrayComparison[target[i]], xOffset, yOffset);
    }
};
const cmsButtonComparisonQuery = document.getElementById("cmsButtonComparisonQuery");
cmsButtonComparisonQuery.onclick = async() => {
    await arrayQuery("cmsCanvasComparison", cmsArrayComparison, "cmsInputComparisonQuery", "cmsOutputComparisonHash", "cmsOutputComparisonMessage", 3);
    var frequency = await arrayQuery("cmsCanvasComparison", cmsArrayComparison, "cmsInputComparisonQuery", "cmsOutputComparisonHash", "cmsOutputComparisonMessage", 3, 16, gridXOffset, 341);
    document.getElementById("cmsOutputComparisonValues").innerHTML = frequency.slice(0, 3).join(", ");
    var target = document.getElementById("cmsInputComparisonQuery").value.trim();
    target = await getHash(target);
    for (let i = 0; i < 3; i++) {
        var xOffset = (target[i] % gridCols) * squareSize + gridXOffset;
        var yOffset = Math.floor(target[i] / gridCols) * squareSize + 341;
        drawGrid("cmsCanvasComparison");
        drawGrid("cmsCanvasComparison", 38, 1, 1, xOffset, yOffset, "#000", true, "#fff");
        drawGrid("cmsCanvasComparison", 19, 2, 2, xOffset, yOffset, "#999", false);
        drawGrid("cmsCanvasComparison", 38, 1, 1, xOffset, yOffset, "#000", false);
        drawBits("cmsCanvasComparison", cmsArrayComparison[target[i]], xOffset, yOffset);
    }
}

var cmsArrayMain = new Array(256).fill(0);
drawCanvas("cmsCanvasMain", 1280, 320);
drawGrid("cmsCanvasMain", 19, 16, 64, gridXOffset, gridYOffset, "#999");
drawGrid("cmsCanvasMain", 38, 8, 32);
const cmsButtonMainAdd = document.getElementById("cmsButtonMainAdd");
cmsButtonMainAdd.onclick = async() => {
    var target = await arrayAdd(cmsArrayMain, "cmsInputMainAdd", "cmsOutputMainHash", "cmsOutputMainMessage", 3);
    for (let i = 0; i < 3; i++) {
        var xOffset = (target[i] % gridCols) * squareSize + gridXOffset;
        var yOffset = Math.floor(target[i] / gridCols) * squareSize + gridYOffset;
        drawBits("cmsCanvasMain", cmsArrayMain[target[i]], xOffset, yOffset);
    }
};
const cmsButtonMainQuery = document.getElementById("cmsButtonMainQuery");
cmsButtonMainQuery.onclick = async() => {
    var frequency = await arrayQuery("cmsCanvasMain", cmsArrayMain, "cmsInputMainQuery", "cmsOutputMainHash", "cmsOutputMainMessage", 3, 16, gridXOffset, gridYOffset, squareSize, gridCols, false);
    document.getElementById("cmsOutputMainValues").innerHTML = frequency.slice(0, 3).join(", ");
    document.getElementById("cmsOutputMainEstimate").innerHTML = Math.min(...frequency.slice(0, 3));
    var target = document.getElementById("cmsInputMainQuery").value.trim();
    target = await getHash(target);
    for (let i = 0; i < 3; i++) {
        var xOffset = (target[i] % gridCols) * squareSize + gridXOffset;
        var yOffset = Math.floor(target[i] / gridCols) * squareSize + gridYOffset;
        drawGrid("cmsCanvasMain", 38, 1, 1, xOffset, yOffset, "#000", true, "#fff");
        drawGrid("cmsCanvasMain", 19, 2, 2, xOffset, yOffset, "#999", false);
        drawGrid("cmsCanvasMain", 38, 1, 1, xOffset, yOffset, "#000", false);
        drawBits("cmsCanvasMain", cmsArrayMain[target[i]], xOffset, yOffset);
    }
}

var cmsArrayComparisonErrors = new Array(256).fill(0);
var cmsVarComparisonErrorsHashDepth = 32;
drawCanvas("cmsCanvasComparisonErrors", 1280, 650);
drawGrid("cmsCanvasComparisonErrors", 38, 8, 32);
drawGrid("cmsCanvasComparisonErrors", 19, 16, 64, gridXOffset, 341, "#999");
drawGrid("cmsCanvasComparisonErrors", 38, 8, 32, gridXOffset, 341, "#000");
cmsInputComparisonErrorsSlider.min = 1;
cmsInputComparisonErrorsSlider.max = 32;
cmsInputComparisonErrorsSlider.step = 1;
cmsInputComparisonErrorsSlider.value = cmsVarComparisonErrorsHashDepth;
cmsInputComparisonErrorsSlider.addEventListener("change", function() {
    cmsVarComparisonErrorsHashDepth = cmsInputComparisonErrorsSlider.value;
    cmsOutputComparisonErrorsHashDepth.innerHTML = cmsInputComparisonErrorsSlider.value;
});
const cmsButtonComparisonErrorsAdd = document.getElementById("cmsButtonComparisonErrorsAdd");
cmsButtonComparisonErrorsAdd.onclick = async() => {
    var target = await arrayAdd(cmsArrayComparisonErrors, "cmsInputComparisonErrorsAdd", "cmsOutputComparisonErrorsHash", "cmsOutputComparisonErrorsMessage", cmsVarComparisonErrorsHashDepth);
    drawBlocks("cmsCanvasComparisonErrors", target.slice(0, cmsVarComparisonErrorsHashDepth));
    for (let i = 0; i < 32; i++) {
        var xOffset = (target[i] % gridCols) * squareSize + gridXOffset;
        var yOffset = Math.floor(target[i] / gridCols) * squareSize + 341;
        drawBits("cmsCanvasComparisonErrors", cmsArrayComparisonErrors[target[i]], xOffset, yOffset);
    }
};

var cmsArraySketch = new Array(256).fill(0);
drawCanvas("cmsCanvasSketch", 1280, 320);
drawGrid("cmsCanvasSketch", 19, 16, 64, gridXOffset, gridYOffset, "#999");
drawGrid("cmsCanvasSketch", 38, 8, 32);
const cmsButtonSketchAdd = document.getElementById("cmsButtonSketchAdd");
cmsButtonSketchAdd.onclick = async() => {
    var target = await arrayAdd(cmsArraySketch, "cmsInputSketchAdd", "cmsOutputSketchHash", "cmsOutputSketchMessage", 8, true, 32);
    for (let i = 0; i < 8; i++) {
        var xOffset = (target[i] % gridCols) * squareSize + gridXOffset;
        var yOffset = Math.floor(target[i] / gridCols) * squareSize + gridYOffset;
        drawBits("cmsCanvasSketch", cmsArraySketch[target[i]], xOffset, yOffset);
    }
}
const cmsButtonSketchQuery = document.getElementById("cmsButtonSketchQuery");
cmsButtonSketchQuery.onclick = async() => {
    var frequency = await arrayQuery("cmsCanvasSketch", cmsArraySketch, "cmsInputSketchQuery", "cmsOutputSketchHash", "cmsOutputSketchMessage", 8, 16, gridXOffset, gridYOffset, squareSize, gridCols, false, true, 32);
    document.getElementById("cmsOutputSketchValues").innerHTML = frequency.slice(0, 8).join(", ");
    document.getElementById("cmsOutputSketchEstimate").innerHTML = Math.min(...frequency.slice(0, 8));
    var target = document.getElementById("cmsInputSketchQuery").value.trim();
    target = await getHash(target);
    for (let i = 0; i < 8; i++)
        target[i] = i * 32 + (target[i] % 32);
    for (let i = 0; i < 8; i++) {
        var xOffset = (target[i] % gridCols) * squareSize + gridXOffset;
        var yOffset = Math.floor(target[i] / gridCols) * squareSize + gridYOffset;
        drawGrid("cmsCanvasSketch", 38, 1, 1, xOffset, yOffset, "#000", true, "#fff");
        drawGrid("cmsCanvasSketch", 19, 2, 2, xOffset, yOffset, "#999", false);
        drawGrid("cmsCanvasSketch", 38, 1, 1, xOffset, yOffset, "#000", false);
        drawBits("cmsCanvasSketch", cmsArraySketch[target[i]], xOffset, yOffset);
    }
}

function drawTrig(canvasID, size = 10, color = "#000", xOffset = 10, yOffset = 10) {
    var canvasObject = document.getElementById(canvasID).getContext("2d");
    canvasObject.beginPath();
    canvasObject.moveTo(xOffset, yOffset);
    canvasObject.lineTo(xOffset - size, yOffset + size);
    canvasObject.lineTo(xOffset + size, yOffset + size);
    canvasObject.closePath(); 
    canvasObject.fillStyle = color;
    canvasObject.fill();
}

function drawCoins(canvasID, number, coins = 8, radius = 70, colorFG = "#000", colorBG = "#fff", stroke = "#000", strokewidth = 2, width = 1280, height = 200) {
    var canvasObject = document.getElementById(canvasID).getContext("2d");
    canvasObject.strokeStyle = stroke;
    canvasObject.lineWidth = strokewidth;
    var y = height / 2;
    for (i = 0; i < coins; i++) {
        var x = (i* width / coins) + (width / (2 * coins));
        canvasObject.beginPath();
        canvasObject.arc(x, y, radius, 0, Math.PI * 2);
        if ((number >> i) & 1 === 1)
            canvasObject.fillStyle = colorFG;
        else
            canvasObject.fillStyle = colorBG;
        canvasObject.fill()
        canvasObject.stroke();
    }
}

function drawBitArray(canvasID, number, length = 32, squaresize = 38, colorFG = "#000", colorBG = "#fff", stroke = "#000", strokewidth = 2, xOffset = 5, yOffset = 5) {
    var canvasObject = document.getElementById(canvasID).getContext("2d");
    var y = yOffset;
    for (let i = 0; i < length; i++) {
    var x = i * squaresize + xOffset;
        if ((number >> i) & 1 === 1)
            canvasObject.fillStyle = colorFG;
        else
            canvasObject.fillStyle = colorBG;
    canvasObject.fillRect(x + 2, y + 2, squaresize - 4, squaresize - 4);
    }
}

function countZeros(number, size, start = 0) {
    for (let i = start; i < size; i++)
        if ((number >> i) & 1 === 1)
            return i - start;
    return size;
}

async function hllAdd(canvasID, squaresize, hllSet, inputQuery, outputZeros, outputZerosMax, outputEstimate, outputCardinality, estimates, maxCounter, outputBucket, bucketsLog = 0, canvasIDBuckets, outputMean, outputScaled) {
    var target = document.getElementById(inputQuery).value.trim();
    if (!target) return;
    hllSet.add(target);
    target = await getHash(target);
    target = ((target[0] << 24) | (target[1] << 16) | (target[2] << 8) | target[3] );
    drawBitArray(canvasID, target);
    var bucket = 0;
    if (outputBucket) {
        var bucketsNum = 1 << bucketsLog;
        var temp = (target & (bucketsNum - 1));
        for (let i = 0; i < bucketsLog; i++) {
            bucket = (bucket << 1) | (temp & 1);
            temp = temp >> 1;
        }
        document.getElementById(outputBucket).innerHTML = bucket;
    }
    var zeros = countZeros(target, 32, bucketsLog);
    if (zeros > maxCounter[bucket])
        maxCounter[bucket] = zeros % 16;
    if (outputBucket) {
        var canvasObject = document.getElementById(canvasIDBuckets).getContext("2d");
        canvasObject.fillStyle = "#fff";
        canvasObject.fillRect(0, squaresize * 2 + 6, 1280, 20);
        drawBits(canvasIDBuckets, maxCounter[bucket], (bucket * squaresize * 2) + gridXOffset, gridYOffset, 2, squaresize, "#999", "#fff");
        drawTrig(canvasIDBuckets, 10, "#999", bucket * squaresize * 2 + squaresize + gridXOffset, squaresize * 2 + gridYOffset + 5);
    }
    estimates[bucket] = 1 << (maxCounter[bucket]);
    document.getElementById(outputZeros).innerHTML = zeros;
    document.getElementById(outputZerosMax).innerHTML = maxCounter.join(", ");
    document.getElementById(outputEstimate).innerHTML = estimates.join(", ");
    document.getElementById(outputCardinality).innerHTML = hllSet.size;
    if (outputBucket) {
        var sum = 0;
        for (let i = 0; i < bucketsNum; i++)
            sum += 1/estimates[i];
        mean = Math.floor(bucketsNum * bucketsNum * 2 / sum);     // additional mult by 2 prob cuz bit shift is off by 1
        document.getElementById(outputMean).innerHTML = mean;     // pls help find it, its buggine me; pun not intended
    }
    if (outputScaled) {
        const alpha = 0.7213 / (1 + 1.079 / bucketsNum);
        document.getElementById(outputScaled).innerHTML = Math.floor(mean * alpha);
    }
}

drawCanvas("hllCanvasCoinProbability", 1280, 400);
drawCoins("hllCanvasCoinProbability", 176);
drawCanvas("hllCanvasCoinObservation", 1280, 200);
drawCoins("hllCanvasCoinObservation", 0);
drawCanvas("hllCanvasCoinEstimation", 1280, 200);
drawCoins("hllCanvasCoinEstimation", 0);

var hllCanvasCoinProbability = document.getElementById("hllCanvasCoinProbability").getContext("2d");
hllCanvasCoinProbability.beginPath();
hllCanvasCoinProbability.strokeStyle = "#000";
hllCanvasCoinProbability.moveTo(11, 231);
hllCanvasCoinProbability.lineTo(11, 241);
hllCanvasCoinProbability.lineTo(311, 241);
hllCanvasCoinProbability.lineTo(311, 231);
hllCanvasCoinProbability.moveTo(11, 281);
hllCanvasCoinProbability.lineTo(11, 291);
hllCanvasCoinProbability.lineTo(471, 291);
hllCanvasCoinProbability.lineTo(471, 281);
hllCanvasCoinProbability.moveTo(11, 331);
hllCanvasCoinProbability.lineTo(11, 341);
hllCanvasCoinProbability.lineTo(631, 341);
hllCanvasCoinProbability.lineTo(631, 331);
hllCanvasCoinProbability.stroke();
hllCanvasCoinProbability.font = "22px JetBrains Mono";
hllCanvasCoinProbability.textAlign = "center";
hllCanvasCoinProbability.textBaseline = "middle";
hllCanvasCoinProbability.fillStyle = "#000";
for (let i = 80; i < 1280; i += 160)
    hllCanvasCoinProbability.fillText("1/2", i, 196);
hllCanvasCoinProbability.font = "22px JetBrains Mono";
hllCanvasCoinProbability.fillStyle = "#000";
for (let i = 0; i < 3; i ++)
    hllCanvasCoinProbability.fillText(`1/${2 << i}`, i * 80 + 161, 260 + i * 50);

var hllVarCoinObservationTosses = 0;
var hllVarCoinObservationZerosMax = 0;
const hllButtonCoinObservationToss = document.getElementById("hllButtonCoinObservationToss");
hllButtonCoinObservationToss.onclick = function() {
    hllVarCoinObservationTosses += 1;
    var hllVarCoinObservationRandom = Math.random() * 256;
    var hllVarCoinObservationZeros = countZeros(hllVarCoinObservationRandom, 8);
    if (hllVarCoinObservationZeros > hllVarCoinObservationZerosMax) {
        hllVarCoinObservationZerosMax = hllVarCoinObservationZeros;
        document.getElementById("hllOutputCoinObservationZerosMax").innerHTML = hllVarCoinObservationZerosMax;
    }
    drawCoins("hllCanvasCoinObservation", hllVarCoinObservationRandom);
    document.getElementById("hllOutputCoinObservationZeros").innerHTML = hllVarCoinObservationZeros;
    document.getElementById("hllOutputCoinObservationTosses").innerHTML = hllVarCoinObservationTosses;
}
const hllButtonCoinObservationReset = document.getElementById("hllButtonCoinObservationReset");
hllButtonCoinObservationReset.onclick = function() {
    hllVarCoinObservationTosses = 0;
    hllVarCoinObservationZerosMax = 0;
    document.getElementById("hllOutputCoinObservationZeros").innerHTML = 0;
    document.getElementById("hllOutputCoinObservationZerosMax").innerHTML = 0;
    document.getElementById("hllOutputCoinObservationTosses").innerHTML = 0;
    drawCoins("hllCanvasCoinObservation", 0);
}

var hllVarCoinEstimationTosses = 0;
var hllVarCoinEstimationZerosMax = 0;
const hllButtonCoinEstimationToss = document.getElementById("hllButtonCoinEstimationToss");
hllButtonCoinEstimationToss.onclick = function() {
    hllVarCoinEstimationTosses += 1;
    var hllVarCoinEstimationRandom = Math.random() * 256;
    var hllVarCoinEstimationZeros = countZeros(hllVarCoinEstimationRandom, 8);
    if (hllVarCoinEstimationZeros > hllVarCoinEstimationZerosMax) {
        hllVarCoinEstimationZerosMax = hllVarCoinEstimationZeros;
        document.getElementById("hllOutputCoinEstimationZerosMax").innerHTML = hllVarCoinEstimationZerosMax;
        document.getElementById("hllOutputCoinEstimationEstimate").innerHTML = 2 << (hllVarCoinEstimationZerosMax - 1);
    }
    drawCoins("hllCanvasCoinEstimation", hllVarCoinEstimationRandom);
    document.getElementById("hllOutputCoinEstimationZeros").innerHTML = hllVarCoinEstimationZeros;
    document.getElementById("hllOutputCoinEstimationTosses").innerHTML = hllVarCoinEstimationTosses;
}
const hllButtonCoinEstimationReset = document.getElementById("hllButtonCoinEstimationReset");
hllButtonCoinEstimationReset.onclick = function() {
    hllVarCoinEstimationTosses = 0;
    hllVarCoinEstimationZerosMax = 0;
    document.getElementById("hllOutputCoinEstimationZeros").innerHTML = 0;
    document.getElementById("hllOutputCoinEstimationZerosMax").innerHTML = 0;
    document.getElementById("hllOutputCoinEstimationEstimate").innerHTML = 0;
    document.getElementById("hllOutputCoinEstimationTosses").innerHTML = 0;
    drawCoins("hllCanvasCoinEstimation", 0);
}

drawCanvas("hllCanvasBits", 1280, 48);
drawGrid("hllCanvasBits", 38, 1, 32, gridXOffset, gridYOffset, "#000");
drawCanvas("hllCanvasBucket", 1280, 65);
drawBitArray("hllCanvasBucket", 0);
drawGrid("hllCanvasBucket", 38, 1, 4, gridXOffset, gridYOffset, "#999");
drawGrid("hllCanvasBucket", 38, 1, 28, 157, gridYOffset, "#000");
drawTrig("hllCanvasBucket", 10, "#999", 24, 50);
drawTrig("hllCanvasBucket", 10, "#999", 62, 50);
drawTrig("hllCanvasBucket", 10, "#999", 100, 50);
drawTrig("hllCanvasBucket", 10, "#999", 138, 50);
drawCanvas("hllCanvasBucketCounters", 1280, 105);
drawGrid("hllCanvasBucketCounters", 38, 2, 32, gridXOffset, gridYOffset, "#999");
drawGrid("hllCanvasBucketCounters", 76, 1, 16, gridXOffset, gridYOffset, "#000");
drawTrig("hllCanvasBucketCounters", 10, "#999", 43, 88);
drawCanvas("hllCanvasMain", 1280, 65);
drawBitArray("hllCanvasMain", 0);
drawGrid("hllCanvasMain", 38, 1, 5, gridXOffset, gridYOffset, "#999");
drawGrid("hllCanvasMain", 38, 1, 27, 195, gridYOffset, "#000");
drawTrig("hllCanvasMain", 10, "#999", 24, 50);
drawTrig("hllCanvasMain", 10, "#999", 62, 50);
drawTrig("hllCanvasMain", 10, "#999", 100, 50);
drawTrig("hllCanvasMain", 10, "#999", 138, 50);
drawTrig("hllCanvasMain", 10, "#999", 176, 50);
drawCanvas("hllCanvasMainCounters", 1280, 65);
drawGrid("hllCanvasMainCounters", 19, 2, 64, gridXOffset, gridYOffset, "#999");
drawGrid("hllCanvasMainCounters", 38, 1, 32, gridXOffset, gridYOffset, "#000");
drawTrig("hllCanvasMainCounters", 10, "#999", 24, 50);

var hllVarBitsZerosMax = [0];
var hllVarBitsEstimates = [0];
const hllSetBitsSet = new Set();
const hllButtonBitsAdd = document.getElementById("hllButtonBitsAdd");
hllButtonBitsAdd.onclick = async() => {
    await hllAdd("hllCanvasBits", 38, hllSetBitsSet, "hllInputBitsAdd", "hllOutputBitsZeros", "hllOutputBitsZerosMax", "hllOutputBitsEstimate", "hllOutputBitsCardinality", hllVarBitsEstimates, hllVarBitsZerosMax);
}
const hllButtonBitsRandom = document.getElementById("hllButtonBitsRandom");
hllButtonBitsRandom.onclick = async() => {
    var target = generateRandomString(10);
    document.getElementById("hllInputBitsAdd").value = target;
    await hllAdd("hllCanvasBits", 38, hllSetBitsSet, "hllInputBitsAdd", "hllOutputBitsZeros", "hllOutputBitsZerosMax", "hllOutputBitsEstimate", "hllOutputBitsCardinality", hllVarBitsEstimates, hllVarBitsZerosMax);
}
const hllButtonBitsReset = document.getElementById("hllButtonBitsReset");
hllButtonBitsReset.onclick = function() {
    hllSetBitsSet.clear();
    hllVarBitsTosses = 0;
    hllVarBitsZerosMax[0] = 0;
    document.getElementById("hllOutputBitsZeros").innerHTML = 0;
    document.getElementById("hllOutputBitsZerosMax").innerHTML = 0;
    document.getElementById("hllOutputBitsEstimate").innerHTML = 0;
    document.getElementById("hllOutputBitsCardinality").innerHTML = 0;
    drawBitArray("hllCanvasBits", 0);
}

var hllVarBucketZerosMax = new Array(16).fill(0);
var hllVarBucketEstimates = new Array(16).fill(1);
const hllSetBucketSet = new Set();
const hllButtonBucketAdd = document.getElementById("hllButtonBucketAdd");
hllButtonBucketAdd.onclick = async() => {
    await hllAdd("hllCanvasBucket", 38, hllSetBucketSet, "hllInputBucketAdd", "hllOutputBucketZeros", "hllOutputBucketZerosMax", "hllOutputBucketEstimates", "hllOutputBucketCardinality", hllVarBucketEstimates, hllVarBucketZerosMax, "hllOutputBucketNumber", 4, "hllCanvasBucketCounters", "hllOutputBucketMean");
}
const hllButtonBucketRandom = document.getElementById("hllButtonBucketRandom");
hllButtonBucketRandom.onclick = async() => {
    var target = generateRandomString(10);
    document.getElementById("hllInputBucketAdd").value = target;
    await hllAdd("hllCanvasBucket", 38, hllSetBucketSet, "hllInputBucketAdd", "hllOutputBucketZeros", "hllOutputBucketZerosMax", "hllOutputBucketEstimates", "hllOutputBucketCardinality", hllVarBucketEstimates, hllVarBucketZerosMax, "hllOutputBucketNumber", 4, "hllCanvasBucketCounters", "hllOutputBucketMean");
}
const hllButtonBucketReset = document.getElementById("hllButtonBucketReset");
hllButtonBucketReset.onclick = function() {
    hllSetBucketSet.clear();
    hllVarBucketZerosMax.fill(0);
    hllVarBucketEstimates.fill(1);
    document.getElementById("hllOutputBucketNumber").innerHTML = 0;
    document.getElementById("hllOutputBucketZeros").innerHTML = 0;
    document.getElementById("hllOutputBucketZerosMax").innerHTML = "0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0";
    document.getElementById("hllOutputBucketEstimates").innerHTML = "1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1";
    document.getElementById("hllOutputBucketMean").innerHTML = 0;
    document.getElementById("hllOutputBucketCardinality").innerHTML = 0;
    drawBitArray("hllCanvasBucket", 0);
    var hllCanvasBucketCounters = document.getElementById("hllCanvasBucketCounters").getContext("2d");
    hllCanvasBucketCounters.clearRect(0, 0, 1280, 120);
    drawGrid("hllCanvasBucketCounters", 38, 2, 32, gridXOffset, gridYOffset, "#999");
    drawGrid("hllCanvasBucketCounters", 76, 1, 16, gridXOffset, gridYOffset, "#000");
    drawTrig("hllCanvasBucketCounters", 10, "#999", 43, 88);
}

var hllVarMainZerosMax = new Array(32).fill(0);
var hllVarMainEstimates = new Array(32).fill(1);
const hllSetMainSet = new Set();
const hllButtonMainAdd = document.getElementById("hllButtonMainAdd");
hllButtonMainAdd.onclick = async() => {
    await hllAdd("hllCanvasMain", 19, hllSetMainSet, "hllInputMainAdd", "hllOutputMainZeros", "hllOutputMainZerosMax", "hllOutputMainEstimates", "hllOutputMainCardinality", hllVarMainEstimates, hllVarMainZerosMax, "hllOutputMainNumber", 5, "hllCanvasMainCounters", "hllOutputMainMean", "hllOutputMainScaled");
}
const hllButtonMainRandom = document.getElementById("hllButtonMainRandom");
hllButtonMainRandom.onclick = async() => {
    var target = generateRandomString(10);
    document.getElementById("hllInputMainAdd").value = target;
    await hllAdd("hllCanvasMain", 19, hllSetMainSet, "hllInputMainAdd", "hllOutputMainZeros", "hllOutputMainZerosMax", "hllOutputMainEstimates", "hllOutputMainCardinality", hllVarMainEstimates, hllVarMainZerosMax, "hllOutputMainNumber", 5, "hllCanvasMainCounters", "hllOutputMainMean", "hllOutputMainScaled");
}
const hllButtonMainRandomK = document.getElementById("hllButtonMainRandomK");
hllButtonMainRandomK.onclick = async() => {
    for (let i = 0; i < 500; i++) {
        var target = generateRandomString(10);
        document.getElementById("hllInputMainAdd").value = target;
        await hllAdd("hllCanvasMain", 19, hllSetMainSet, "hllInputMainAdd", "hllOutputMainZeros", "hllOutputMainZerosMax", "hllOutputMainEstimates", "hllOutputMainCardinality", hllVarMainEstimates, hllVarMainZerosMax, "hllOutputMainNumber", 5, "hllCanvasMainCounters", "hllOutputMainMean", "hllOutputMainScaled");
    }
}
const hllButtonMainReset = document.getElementById("hllButtonMainReset");
hllButtonMainReset.onclick = function() {
    hllSetMainSet.clear();
    hllVarMainZerosMax.fill(0);
    hllVarMainEstimates.fill(1);
    document.getElementById("hllOutputMainNumber").innerHTML = 0;
    document.getElementById("hllOutputMainZeros").innerHTML = 0;
    document.getElementById("hllOutputMainZerosMax").innerHTML = "0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0";
    document.getElementById("hllOutputMainEstimates").innerHTML = "1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1";
    document.getElementById("hllOutputMainMean").innerHTML = 0;
    document.getElementById("hllOutputMainScaled").innerHTML = 0;
    document.getElementById("hllOutputMainCardinality").innerHTML = 0;
    drawBitArray("hllCanvasMain", 0);
    var hllCanvasMainCounters = document.getElementById("hllCanvasMainCounters").getContext("2d");
    hllCanvasMainCounters.clearRect(0, 0, 1280, 120);
    drawGrid("hllCanvasMainCounters", 19, 2, 64, gridXOffset, gridYOffset, "#999");
    drawGrid("hllCanvasMainCounters", 38, 1, 32, gridXOffset, gridYOffset, "#000");
    drawTrig("hllCanvasMainCounters", 10, "#999", 24, 50);
}

drawCanvas("hllCanvasLogSpace", 1280, 300);
var hllCanvasLogSpace = document.getElementById("hllCanvasLogSpace").getContext("2d");
hllCanvasLogSpace.textAlign = "center";
hllCanvasLogSpace.textBaseline = "middle";
hllCanvasLogSpace.font = "24px JetBrains Mono"; 
hllCanvasLogSpace.fillStyle = "#000";
hllCanvasLogSpace.fillText("65000 elements", 160, 251);
hllCanvasLogSpace.fillText("16 zeros", 640, 251);
hllCanvasLogSpace.fillText("4 bits", 1120, 251);
hllCanvasLogSpace.font = "50px JetBrains Mono"; 
hllCanvasLogSpace.fillStyle = "#000";
hllCanvasLogSpace.fillText("0000000", 641, 125);
hllCanvasLogSpace.font = "28px JetBrains Mono"; 
hllCanvasLogSpace.fillText("nKbwCzEjzSq", 160, 85);
hllCanvasLogSpace.fillText("xlMOWJanPAA", 160, 125);
hllCanvasLogSpace.fillText("GuwQVkfmqsl", 160, 162);
drawGrid("hllCanvasLogSpace", 50, 2, 2, 1071, 71, "#999");
drawGrid("hllCanvasLogSpace", 100, 1, 1, 1071, 71);
hllCanvasLogSpace.beginPath();
hllCanvasLogSpace.strokeStyle = "#000";
hllCanvasLogSpace.lineWidth = 2;
hllCanvasLogSpace.moveTo(290, 121);
hllCanvasLogSpace.lineTo(500, 121);
hllCanvasLogSpace.moveTo(780, 121);
hllCanvasLogSpace.lineTo(1000, 121);
hllCanvasLogSpace.stroke();
drawCanvas("cmsCanvasDifferentRange", 1280, 710);
var cmsCanvasDifferentRange = document.getElementById("cmsCanvasDifferentRange").getContext("2d");
drawGrid("cmsCanvasDifferentRange", 19, 16, 32, 613, 5, "#999", false, "#fff", 2);
drawGrid("cmsCanvasDifferentRange", 38, 8, 16, 613, 5, "#000", false, "#fff", 2);
drawGrid("cmsCanvasDifferentRange", 19, 16, 32, 613, 405, "#999", false, "#fff", 2);
drawGrid("cmsCanvasDifferentRange", 38, 8, 16, 613, 405, "#000", false, "#fff", 2);
cmsCanvasDifferentRange.strokeStyle = "#000";
cmsCanvasDifferentRange.lineWidth = 2;
cmsCanvasDifferentRange.beginPath();
cmsCanvasDifferentRange.moveTo(581, 5); cmsCanvasDifferentRange.lineTo(581, 309);
cmsCanvasDifferentRange.moveTo(561, 5); cmsCanvasDifferentRange.lineTo(561, 309);
cmsCanvasDifferentRange.moveTo(541, 5); cmsCanvasDifferentRange.lineTo(541, 309);
cmsCanvasDifferentRange.moveTo(521, 5); cmsCanvasDifferentRange.lineTo(521, 309);
cmsCanvasDifferentRange.moveTo(521, 5); cmsCanvasDifferentRange.lineTo(531, 5);
cmsCanvasDifferentRange.moveTo(541, 5); cmsCanvasDifferentRange.lineTo(551, 5);
cmsCanvasDifferentRange.moveTo(561, 5); cmsCanvasDifferentRange.lineTo(571, 5);
cmsCanvasDifferentRange.moveTo(581, 5); cmsCanvasDifferentRange.lineTo(591, 5);
cmsCanvasDifferentRange.moveTo(521, 309); cmsCanvasDifferentRange.lineTo(531, 309);
cmsCanvasDifferentRange.moveTo(541, 309); cmsCanvasDifferentRange.lineTo(551, 309);
cmsCanvasDifferentRange.moveTo(561, 309); cmsCanvasDifferentRange.lineTo(571, 309);
cmsCanvasDifferentRange.moveTo(581, 309); cmsCanvasDifferentRange.lineTo(591, 309);
cmsCanvasDifferentRange.moveTo(150, 23); cmsCanvasDifferentRange.lineTo(521, 23);
cmsCanvasDifferentRange.moveTo(150, 63); cmsCanvasDifferentRange.lineTo(541, 63);
cmsCanvasDifferentRange.moveTo(150, 103); cmsCanvasDifferentRange.lineTo(561, 103);
cmsCanvasDifferentRange.moveTo(150, 143); cmsCanvasDifferentRange.lineTo(581, 143);
cmsCanvasDifferentRange.moveTo(150, 423); cmsCanvasDifferentRange.lineTo(591, 423);
cmsCanvasDifferentRange.moveTo(150, 463); cmsCanvasDifferentRange.lineTo(591, 463);
cmsCanvasDifferentRange.moveTo(150, 503); cmsCanvasDifferentRange.lineTo(591, 503);
cmsCanvasDifferentRange.moveTo(150, 543); cmsCanvasDifferentRange.lineTo(591, 543);
cmsCanvasDifferentRange.stroke();
cmsCanvasDifferentRange.textAlign = "center";
cmsCanvasDifferentRange.textBaseline = "middle";
cmsCanvasDifferentRange.font = "28px JetBrains Mono"; 
cmsCanvasDifferentRange.fillStyle = "#000";
cmsCanvasDifferentRange.fillText("hash1(x)", 70, 25);
cmsCanvasDifferentRange.fillText("hash2(x)", 70, 65);
cmsCanvasDifferentRange.fillText("hash3(x)", 70, 105);
cmsCanvasDifferentRange.fillText("hash4(x)", 70, 145);
cmsCanvasDifferentRange.fillText("...", 70, 185);
cmsCanvasDifferentRange.fillText("hash1(x)", 70, 425);
cmsCanvasDifferentRange.fillText("hash2(x)", 70, 465);
cmsCanvasDifferentRange.fillText("hash3(x)", 70, 505);
cmsCanvasDifferentRange.fillText("hash4(x)", 70, 545);
cmsCanvasDifferentRange.fillText("...", 70, 585);
cmsCanvasDifferentRange.textAlign = "left";
cmsCanvasDifferentRange.font = "24px JetBrains Mono"; 
cmsCanvasDifferentRange.fillText("Same hash range", 5, 295);
cmsCanvasDifferentRange.fillText("Separate hash ranges", 5, 695);

drawCanvas("cmsCanvasComparisonStatic", 1280, 320);
var cmsCanvasComparisonStatic = document.getElementById("cmsCanvasComparisonStatic").getContext("2d");
drawGrid("cmsCanvasComparisonStatic", 40, 1, 1, 25, 5);
drawGrid("cmsCanvasComparisonStatic", 40, 1, 1, 201, 5);
drawGrid("cmsCanvasComparisonStatic", 40, 1, 1, 261, 5, "#000", true, "#000");
drawGrid("cmsCanvasComparisonStatic", 40, 2, 2, 5, 201, "#999");
drawGrid("cmsCanvasComparisonStatic", 80, 1, 1, 5, 201);

for (let i = 0; i < 8; i++) {
    drawGrid("cmsCanvasComparisonStatic", 40, 2, 2, 201 + i * 100, 201, "#999", false, "#fff", 2);
    drawGrid("cmsCanvasComparisonStatic", 80, 1, 1, 201 + i * 100, 201, "#000", false, "#fff", 2);
    drawBits("cmsCanvasComparisonStatic", i, 201 + i * 100, 201, 2, 40, "#000", "#fff");
}
cmsCanvasComparisonStatic.textAlign = "center";
cmsCanvasComparisonStatic.textBaseline = "middle";
cmsCanvasComparisonStatic.font = "28px JetBrains Mono";
cmsCanvasComparisonStatic.fillStyle = "#000";
for (let i = 0; i < 8; i++)
    cmsCanvasComparisonStatic.fillText(i, i * 100 + 240, 310); 
cmsCanvasComparisonStatic.fillText("...", 1040, 240); 
cmsCanvasComparisonStatic.fillText("15", 1140, 310); 
cmsCanvasComparisonStatic.fillText("0", 220, 75); 
cmsCanvasComparisonStatic.fillText("1", 280, 75); 
drawGrid("cmsCanvasComparisonStatic", 40, 2, 2, 1101, 201, "#999", false, "#fff", 2);
drawGrid("cmsCanvasComparisonStatic", 80, 1, 1, 1101, 201, "#000", false, "#fff", 2);
drawBits("cmsCanvasComparisonStatic", 15, 1101, 201, 2, 40, "#000", "#fff");
cmsCanvasComparisonStatic.strokeStyle = "#000";
cmsCanvasComparisonStatic.lineWidth = 2;
cmsCanvasComparisonStatic.beginPath();
cmsCanvasComparisonStatic.moveTo(45, 74);
cmsCanvasComparisonStatic.lineTo(45, 156);
cmsCanvasComparisonStatic.moveTo(45, 166);
cmsCanvasComparisonStatic.lineTo(35, 156);
cmsCanvasComparisonStatic.lineTo(55, 156);
cmsCanvasComparisonStatic.closePath();
cmsCanvasComparisonStatic.stroke();

var bfCanvasCompare = document.getElementById("bfCanvasCompare").getContext("2d");
drawCanvas("bfCanvasCompare", 1280, 460);
drawGrid("bfCanvasCompare", 38, 1, 32, 5, 145);
drawGrid("bfCanvasCompare", 38, 1, 32, 5, 235);
drawGrid("bfCanvasCompare", 38, 1, 32, 5, 385);
drawGrid("bfCanvasCompare", 38, 1, 8, 5, 5);
drawGrid("bfCanvasCompare", 38, 1, 8, 499, 5);
drawGrid("bfCanvasCompare", 38, 1, 8, 841, 5);
bfCanvasCompare.textAlign = "center";
bfCanvasCompare.textBaseline = "middle";
bfCanvasCompare.fillStyle = "#000";
bfCanvasCompare.font = "24px JetBrains Mono";
bfCanvasCompare.fillText("4", 330, 25);
bfCanvasCompare.fillText("17", 474, 25);
bfCanvasCompare.fillText("23", 1170, 25);
bfCanvasCompare.font = "20px JetBrains Mono";
for (let i = 0; i < 32; i++)
    bfCanvasCompare.fillText(i, i * 38 + 24, 200);
for (let i = 0; i < 32; i++)
    bfCanvasCompare.fillText(i + 32, i * 38 + 24, 290);
bfCanvasCompare.font = "16px JetBrains Mono";
for (let i = 0; i < 32; i++)
    bfCanvasCompare.fillText(i + 224, i * 38 + 24, 440);
bfCanvasCompare.font = "28px JetBrains Mono";
bfCanvasCompare.fillText("...", 630, 334);
var bfArrayCompare1 = [4, 17, 23];
drawBlocks("bfCanvasCompare", bfArrayCompare1, "#000", 38, 32, gridXOffset, 145);
var bfArrayCompare2 = [0, 1, 3, 12, 15, 18, 20, 24, 29];
drawBlocks("bfCanvasCompare", bfArrayCompare2, "#000", 38, 32, gridXOffset, 235);
var bfArrayCompare3 = [2, 7, 19, 20];
drawBlocks("bfCanvasCompare", bfArrayCompare3, "#000", 38, 32, gridXOffset, 385);
var bfArrayCompareN1 = [5];
var bfArrayCompareN2 = [3, 7];
var bfArrayCompareN3 = [3, 5, 6, 7];
drawBlocks("bfCanvasCompare", bfArrayCompareN1, "#000", 38, 32, 5, 5);
drawBlocks("bfCanvasCompare", bfArrayCompareN2, "#000", 38, 32, 499, 5);
drawBlocks("bfCanvasCompare", bfArrayCompareN3, "#000", 38, 32, 841, 5);
bfCanvasCompare.strokeStyle = "#000";
bfCanvasCompare.lineWidth = 2;
bfCanvasCompare.beginPath();
bfCanvasCompare.moveTo(5, 55);
bfCanvasCompare.lineTo(309, 55);
bfCanvasCompare.moveTo(175, 55);
bfCanvasCompare.lineTo(175, 115);
bfCanvasCompare.moveTo(175, 125);
bfCanvasCompare.lineTo(165, 115);
bfCanvasCompare.lineTo(185, 115);
bfCanvasCompare.closePath();
bfCanvasCompare.moveTo(499, 55);
bfCanvasCompare.lineTo(803, 55);
bfCanvasCompare.moveTo(671, 55);
bfCanvasCompare.lineTo(671, 115);
bfCanvasCompare.moveTo(671, 125);
bfCanvasCompare.lineTo(661, 115);
bfCanvasCompare.lineTo(681, 115);
bfCanvasCompare.closePath();
bfCanvasCompare.moveTo(841, 55);
bfCanvasCompare.lineTo(1145, 55);
bfCanvasCompare.moveTo(899, 55);
bfCanvasCompare.lineTo(899, 115);
bfCanvasCompare.moveTo(899, 125);
bfCanvasCompare.lineTo(889, 115);
bfCanvasCompare.lineTo(909, 115);
bfCanvasCompare.closePath();
bfCanvasCompare.stroke();
