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
        await new Promise(resolve => setTimeout(resolve, 500));
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
function drawGrid(canvasID, squaresize = squareSize, gridrows = gridRows, gridcols = gridCols, xOffset = gridXOffset, yOffset = gridYOffset, stroke ="#000", fillBlock = false, color = "#fff") {
    var canvasObject = document.getElementById(canvasID).getContext("2d");
    for (let row = 0; row < gridrows; row++) {
        for (let col = 0; col < gridcols; col++) {
            const x = col * squaresize + xOffset;
            const y = row * squaresize + yOffset;
            canvasObject.strokeStyle = stroke;
            canvasObject.lineWidth = 2;
            canvasObject.strokeRect(x, y, squaresize, squaresize);
            if (fillBlock) {
                canvasObject.fillStyle = color;
                canvasObject.fillRect(x + 1, y + 1, squaresize - 3, squaresize - 3);
            }
        }   
    }
}

function drawBlock(canvasID, target, color = "#000", squaresize = squareSize, gridcols = gridCols, xOffset = gridXOffset, yOffset = gridYOffset) {
    var canvasObject = document.getElementById(canvasID).getContext("2d");
    canvasObject.fillStyle = color;
    var y = Math.floor(target / gridcols) * squaresize + yOffset;
    var x = (target % gridcols) * squaresize + xOffset;
    canvasObject.fillRect(x + 1, y + 1, squaresize - 3, squaresize - 3);
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
        console.log(xOffset, yOffset);
        if (binaryArray[binaryArraySize - i - 1] === 1)
            drawBlock(canvasID, i, colorFG, squaresize, squarelength, xOffset, yOffset);
        else
            drawBlock(canvasID, i, colorBG, squaresize, squarelength, xOffset, yOffset);
    }
}


// add to bit array
async function arrayAdd(bfArray, queryInput, hashOutput, messageOutput, hashDepth) {
    var target = document.getElementById(queryInput).value.trim();
    if (!target) return;
    target = await getHash(target);
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
    console.log(target);
    drawBlocks(canvasID, target.slice(0, hashDepth), "#f45");
    await new Promise(resolve => setTimeout(resolve, 500));
    for (let i = 0; i < hashDepth; i++) {
        drawBlock(canvasID, target[i], "#fff");
        bfArray[target[i]] = 0;
    }
    document.getElementById(queryOutput).innerHTML = "Element removed.";
}

// show and query bitarray position
async function arrayQuery(canvasID, bfArray, queryInput, hashOutput, queryOutput, hashDepth, maxFrequency = 16, xOffset = gridXOffset, yOffset = gridYOffset, squaresize = squareSize, gridcols = gridCols) {
    var target = document.getElementById(queryInput).value.trim();
    if (!target) return;
    target = await getHash(target);
    document.getElementById(hashOutput).innerHTML = target.slice(0, hashDepth).join(", ");
    drawBlocks(canvasID, target.slice(0, hashDepth), "#999", squaresize, gridcols, xOffset, yOffset);
    await new Promise(resolve => setTimeout(resolve, 500));
    var bfSimilarity = true;
    var frequency = new Array(hashDepth).fill(0);
    for (let i = 0; i < hashDepth; i++) {
        if (bfArray[target[i]] === 0) {
            drawBlock(canvasID, target[i], "#fff");
            bfSimilarity = false;
        }
        else {
            drawBlock(canvasID, target[i], "#000");
            frequency[i] = bfArray[target[i]] % maxFrequency;
        }
    }
    if (bfSimilarity)
        document.getElementById(queryOutput).innerHTML = "<b>Element found.</b>";
    else
        document.getElementById(queryOutput).innerHTML = "Element not found.";
    return frequency;
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
drawGrid("bfCanvasSaturated", 38, 8, 32, gridXOffset, gridYOffset, "#000", true, "#000");
drawGrid("bfCanvasBigger", 38, 24, 32);
drawGrid("bfCanvasDeletion");
drawGrid("bfCanvasCounting");

// initialize bloom filter arrays
var bfArrayAddQuery = new Array(256).fill(0);
var bfArrayCollision = new Array(256).fill(0);
var bfArrayMultiple = new Array(256).fill(0);
var bfArraySaturated = new Array(256).fill(1);
var bfArrayBigger = new Array(256).fill(0); // acts as /dev/null, ugly hack
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

var bfHashDepth = 2;
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

drawCanvas("cmsCanvasComparison", 1280, 650);
drawGrid("cmsCanvasComparison", 38, 8, 32);
drawGrid("cmsCanvasComparison", 19, 16, 64, gridXOffset, 340, "#888");
drawGrid("cmsCanvasComparison", 38, 8, 32, gridXOffset, 340, "#000");

var cmsArrayComparison = new Array(256).fill(0);

const cmsButtonComparisonAdd = document.getElementById("cmsButtonComparisonAdd");
cmsButtonComparisonAdd.onclick = async() => {
    var target = await arrayAdd(cmsArrayComparison, "cmsInputComparisonAdd", "cmsOutputComparisonHash", "cmsOutputComparisonMessage", 3);
    drawBlocks("cmsCanvasComparison", target.slice(0, 3));
    for (let i = 0; i < 3; i++) {
        var xOffset = (target[i] % gridCols) * squareSize + 5;
        var yOffset = Math.floor(target[i] / gridCols) * squareSize + 340;
        drawBits("cmsCanvasComparison", cmsArrayComparison[target[i]], xOffset, yOffset);
    }
};
const cmsButtonComparisonQuery = document.getElementById("cmsButtonComparisonQuery");
cmsButtonComparisonQuery.onclick = async() => {
    await arrayQuery("cmsCanvasComparison", cmsArrayComparison, "cmsInputComparisonQuery", "cmsOutputComparisonHash", "cmsOutputComparisonMessage", 3);
    var frequency = await arrayQuery("cmsCanvasComparison", cmsArrayComparison, "cmsInputComparisonQuery", "cmsOutputComparisonHash", "cmsOutputComparisonMessage", 3, 16, gridXOffset, 340);
    document.getElementById("cmsOutputComparisonValues").innerHTML = frequency.slice(0, 3).join(", ");
    var target = document.getElementById("cmsInputComparisonQuery").value.trim();
    target = await getHash(target);
    for (let i = 0; i < 3; i++) {
        var xOffset = (target[i] % gridCols) * squareSize + 5;
        var yOffset = Math.floor(target[i] / gridCols) * squareSize + 340;
        drawBits("cmsCanvasComparison", cmsArrayComparison[target[i]], xOffset, yOffset);
    }
}


