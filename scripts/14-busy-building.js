// change dimensions
// show outline on hover

const cellSize = 28;
const gridN = 9;
const gridSize = (gridN * (gridN + 1)) / 2;
const colors = ["#fff", "#000", "#0a0", "#f80", "#00a", "#a05", "#5ad", "#ee5", "#644", "#aaa"];
const colorsText = ["#000", "#fff", "#fff", "#000", "#fff", "#fff", "#000", "#000", "#fff", "#000"];
const canvasPartridge = document.getElementById("canvasPartridge").getContext("2d");
const canvasPartridgeSelection = document.getElementById("canvasPartridgeSelection").getContext("2d");
const selectPartridge = document.getElementById("selectPartridge");
canvasPartridge.canvas.height = 1280;
canvasPartridge.canvas.width = 1280;
canvasPartridgeSelection.canvas.height = 150;
canvasPartridgeSelection.canvas.width = 1280;
for (let i = 1; i <= gridN; i++) {
    const option = document.createElement("option");
    option.value = i; option.textContent = i;
    selectPartridge.appendChild(option);
}
selectPartridge.value = 9;

let partridgeSquaresCardinality = new Array(gridSize).fill(0);
let partridgeGrid = new Array(gridSize).fill(0).map(val => new Array(gridSize).fill(0));
let partridgeSquares = new Array(gridSize).fill(0).map(val => new Array(3).fill(0));
let x, y, size = 0;

canvasPartridge.canvas.addEventListener("mousedown", (evt) => {
    updateSquares(evt, Number(selectPartridge.value));
    drawSelection();
    drawGrid();
});
canvasPartridgeSelection.canvas.addEventListener("mousedown", (evt) => {
    selectPartridge.value = getSelection(evt);
    drawSelection(); });
canvasPartridge.canvas.addEventListener("contextmenu", (evt) => { evt.preventDefault(); });
window.addEventListener("keydown", (evt) => {
    if (evt.key > 0 && evt.key <= gridN) {
        selectPartridge.value = evt.key;
        drawSelection();
}});
drawGridLines(canvasPartridge);
drawSelection(canvasPartridgeSelection);

function getSelection(evt, canvas = canvasPartridgeSelection) {
    const rect = canvas.canvas.getBoundingClientRect();
    return Math.floor(((evt.clientX - rect.left) * (canvas.canvas.width / rect.width) / 140) + 1);
}

function drawSelection(canvas = canvasPartridgeSelection, cardinality = partridgeSquaresCardinality, currentSel = selectPartridge.value) {
    canvas.font = "32px JetBrains Mono";
    canvas.textAlign = "center";
    canvas.textBaseline = "middle";
    canvas.strokeStyle = "#000";
    canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    for (let i = 1; i <= gridN; i++) {
        canvas.lineWidth = 2;
        canvas.fillStyle = colors[i];
        if (i == currentSel) canvas.lineWidth = 6;
        canvas.fillRect(i * 140 - 131, 11, 120, 120);
        canvas.strokeRect(i * 140 - 131, 11, 120, 120);
        canvas.fillStyle = colorsText[i];
        canvas.fillText(i - cardinality[i], i * 140 - 71, 70);
    }
}

function drawGrid(canvas = canvasPartridge) {
    canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    drawGridLines(canvas);
    drawSquares(canvas);
}

function drawSquares(canvas, squares = partridgeSquares) {
    canvas.font = "32px JetBrains Mono";
    canvas.textAlign = "center";
    canvas.textBaseline = "middle";
    canvas.strokeStyle = "#000";
    canvas.lineWidth = 4;
    for (let i = 0; i < squares.length; i++) {
        if (squares[i][2] == 0) continue;
        canvas.fillStyle = colors[squares[i][2]];
        canvas.fillRect(squares[i][0] * cellSize + 1, squares[i][1] * cellSize + 1, squares[i][2] * cellSize, squares[i][2] * cellSize);
        canvas.strokeRect(squares[i][0] * cellSize + 1, squares[i][1] * cellSize + 1, squares[i][2] * cellSize, squares[i][2] * cellSize);
        canvas.fillStyle = colorsText[squares[i][2]];
        canvas.fillText(squares[i][2], squares[i][0] * cellSize + squares[i][2] * cellSize / 2, squares[i][1] * cellSize + squares[i][2] * cellSize / 2);
    }
}

function drawGridLines(canvas) {
    canvas.strokeStyle = "#000";
    canvas.lineWidth = 2;
    canvas.beginPath();
    for (let i = 0; i <= gridSize; i++) { canvas.moveTo(0, i * cellSize + 1); canvas.lineTo(cellSize * gridSize, i * cellSize + 1); }
    for (let i = 0; i <= gridSize; i++) { canvas.moveTo(i * cellSize + 1, 0); canvas.lineTo(i * cellSize + 1, cellSize * gridSize); }
    canvas.stroke();
}

function updateGrid(x, y, size, grid, index) {
    for (let i = x; i < x + size; i++)
        for (let j = y; j < y + size; j++)
            grid[i][j] = index;
}

function checkInvalidity(x, y, size, cardinality, grid) {
    if (cardinality[size] >= size) return true;
    for (let i = x; i < x + size; i++)
        for (let j = y; j < y + size; j++)
            if (grid[i][j] != 0) return true;
    return false;
}

function addSquare(x, y, size, currentList = partridgeSquares, currentCardinality = partridgeSquaresCardinality, currentGrid = partridgeGrid, canvas = canvasPartridge) {
    if (checkInvalidity(x, y, size, currentCardinality, currentGrid)) return;
    let index = ((size * (size - 1)) / 2);
    for (let i = 0; i < size; i++) { if (currentList[index][2] == 0 ) break; index++; }
    currentList[index][0] = x;
    currentList[index][1] = y;
    currentList[index][2] = size;
    updateGrid(x, y, size, currentGrid, index + 1);
    currentCardinality[size] += 1;
}

function removeSquare(x, y, currentList = partridgeSquares, currentCardinality = partridgeSquaresCardinality, currentGrid = partridgeGrid, canvas = canvasPartridge) {
    index = currentGrid[x][y] - 1;
    if (index < 0) return;
    x = currentList[index][0]; currentList[index][0] = 0;
    y = currentList[index][1]; currentList[index][1] = 0;
    let size = currentList[index][2]; currentList[index][2] = 0;
    updateGrid(x, y, size, currentGrid, 0);
    currentCardinality[size] -= 1;
}

function updateSquares(evt, size, canvas = canvasPartridge) {
    let x, y = 0;
    const rect = canvas.canvas.getBoundingClientRect();
    x = Math.floor((evt.clientX - rect.left) * (canvas.canvas.width / rect.width) / cellSize);
    y = Math.floor((evt.clientY - rect.top) * (canvas.canvas.height / rect.height) / cellSize);
    if (event.button === 0) { addSquare(x, y, size); }
    else if (event.button === 2) { removeSquare(x, y); }
}
