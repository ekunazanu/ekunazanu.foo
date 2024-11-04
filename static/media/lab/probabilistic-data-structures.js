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
    document.getElementById("hashBoxOutput").innerText = hash[0].toString().padStart(3, "0");
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
    document.getElementById("setOutputHashesHash").innerText = target[0].toString().padStart(3, "0");
    await binarySearch("setContainerHashes", target[0], setArrayHashes, "setOutputHashes", "Hashes");
};

// draw bit array background
const squareSize = 38, gridRows = 8, gridCols = 32, gridXOffset = 5; gridYOffset = 5;
function bfDraw(canvasID) {
    var bfArrayCanvas = document.getElementById(canvasID).getContext("2d");
    bfArrayCanvas.canvas.width  = 1280;
    bfArrayCanvas.canvas.height = 320;
    for (let row = 0; row < gridRows; row++) {
        for (let col = 0; col < gridCols; col++) {
            const x = col * squareSize + gridXOffset;
            const y = row * squareSize + gridYOffset;
            bfArrayCanvas.strokeStyle = "#000";
            bfArrayCanvas.lineWidth = 2;
            bfArrayCanvas.strokeRect(x, y, squareSize, squareSize);
        }   
    }
}

function drawBlock(canvasID, target, color = "#000") {
    var bfArrayCanvas = document.getElementById(canvasID).getContext("2d");
    bfArrayCanvas.fillStyle = color;
    var y = Math.floor(target / gridCols) * squareSize + gridXOffset;
    var x = (target % gridCols) * squareSize + gridYOffset;
    bfArrayCanvas.fillRect(x + 1, y + 1, squareSize - 3, squareSize - 3);
}

// draw bit array black blocks
function drawBlocks(canvasID, array, color) {
    for (let i = 0; i < array.length; i++) {
        drawBlock(canvasID, array[i], color);
    }
}

// add to bit array
async function bfAdd(bfArray, queryInput, hashOutput, messageOutput, hashDepth) {
    var target = document.getElementById(queryInput).value.trim();
    if (!target) return;
    target = await getHash(target);
    document.getElementById(hashOutput).innerText = target.slice(0, hashDepth).toString().padStart(3, "0");
    document.getElementById(messageOutput).innerHTML = "Element added.";
    for (i = 0; i < hashDepth; i++)
        bfArray[(target[i])] = 1;
    return target;
}

// show and query bitarray position
async function bfQuery(canvasID, bfArray, queryInput, hashOutput, queryOutput, hashDepth) {
    var target = document.getElementById(queryInput).value.trim();
    if (!target) return;
    target = await getHash(target);
    document.getElementById(hashOutput).innerText = target.slice(0, hashDepth).toString().padStart(3, "0");
    drawBlocks(canvasID, target.slice(0, hashDepth), "#999");
    await new Promise(resolve => setTimeout(resolve, 500));
    var same = true;
    for (let i = 0; i < hashDepth; i++) {
        if (bfArray[target[i]] === 1) {
            drawBlock(canvasID, target[i], "#000");
        }
        else {
            drawBlock(canvasID, target[i], "#fff");
            same = false;
        }
    }
    if (same)
        document.getElementById(queryOutput).innerHTML = "<b>Element found.</b>";
    else
        document.getElementById(queryOutput).innerText = "Element not found.";
}

bfDraw("bfCanvasAdd");
bfDraw("bfCanvasQuery");
bfDraw("bfCanvasCollision");
bfDraw("bfCanvasMultiple");
bfDraw("bfCanvasSaturated");

// initialize bloom filter arrays
var bfArrayAddQuery = new Array(256).fill(0);
var bfArrayCollision = new Array(256).fill(0);
var bfArrayMultiple = new Array(256).fill(0);
var bfArraySaturated = new Array(256).fill(1);
drawBlocks("bfCanvasSaturated", bfArraySaturated);

const bfButtonAdd = document.getElementById("bfButtonAdd");
bfButtonAdd.onclick = async() => {
    var target = await bfAdd(bfArrayAddQuery, "bfInputAdd", "bfOutputAddHash", "bfOutputAddMessage", 1);
    drawBlock("bfCanvasAdd", target[0]);
    drawBlock("bfCanvasQuery", target[0]);
};
const bfButtonQuery = document.getElementById("bfButtonQuery");
bfButtonQuery.onclick = async() => {
    await bfQuery("bfCanvasQuery", bfArrayAddQuery, "bfInputQuery", "bfOutputQueryHash", "bfOutputQueryMessage", 1);
}
const bfButtonCollisionAdd = document.getElementById("bfButtonCollisionAdd");
bfButtonCollisionAdd.onclick = async() => {
    var target = await bfAdd(bfArrayCollision, "bfInputCollisionAdd", "bfOutputCollisionHash", "bfOutputCollisionMessage", 1);
    drawBlock("bfCanvasCollision", target[0]);
};
const bfButtonCollisionQuery = document.getElementById("bfButtonCollisionQuery");
bfButtonCollisionQuery.onclick = async() => {
    bfQuery("bfCanvasCollision", bfArrayCollision, "bfInputCollisionQuery", "bfOutputCollisionHash", "bfOutputCollisionMessage", 1);
}
const bfButtonMultipleAdd = document.getElementById("bfButtonMultipleAdd");
bfButtonMultipleAdd.onclick = async() => {
    var target = await bfAdd(bfArrayMultiple, "bfInputMultipleAdd", "bfOutputMultipleHash", "bfOutputMultipleMessage", 2);
    drawBlocks("bfCanvasMultiple", target.slice(0, 2));
};
const bfButtonMultipleQuery = document.getElementById("bfButtonMutlipleQuery");
bfButtonMultipleQuery.onclick = async() => {
    bfQuery("bfCanvasMultiple", bfArrayMultiple, "bfInputMultipleQuery", "bfOutputMultipleHash", "bfOutputMultipleMessage", 2);
}
const bfButtonSaturatedAdd = document.getElementById("bfButtonSaturatedAdd");
bfButtonSaturatedAdd.onclick = async() => {
    var target = await bfAdd(bfArraySaturated, "bfInputSaturatedAdd", "bfOutputSaturatedHash", "bfOutputSaturatedMessage", 5);
    drawBlocks("bfCanvasSaturated", target.slice(0, 5));
};
const bfButtonSaturatedQuery = document.getElementById("bfButtonSaturatedQuery");
bfButtonSaturatedQuery.onclick = async() => {
    bfQuery("bfCanvasSaturated", bfArraySaturated, "bfInputSaturatedQuery", "bfOutputSaturatedHash", "bfOutputSaturatedMessage", 5);
}
