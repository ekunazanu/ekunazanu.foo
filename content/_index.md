+++
title = "Home"
description = "A blogified version of xkcd, only worse and more personal and not really funny."
draft = false
template = "page.html"
[extra]
type = "website"
thumbnail = "other.ekunazanu.avif"
thumbnailalt = "A black square box with rectangular eyes, signifying a face."
+++

Hello, World!

<canvas id="canvasGOL"></canvas>

This is yet another blog on the internet. Nothing much here, just some [normal posts](/log) and a few [other things](/lab) I created that I [like to] think is cool.

That's pretty much it, but here's more [about](/about) me and this site.

<script>
const canvasGOL = document.getElementById('canvasGOL').getContext('2d');
canvasGOL.canvas.width = 1280;
canvasGOL.canvas.height = 322;
const gridSizeX = 63;
const gridSizeY = 16;
const cellSize = 20;
const eyeCells = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [1, 0], [1, 4]];
let grid = [];
let nextGrid = [];

function initializeGrid() {
    for (let i = 0; i < gridSizeY; i++) {
        grid[i] = [];
        nextGrid[i] = [];
        for (let j = 0; j < gridSizeX; j++) {
            grid[i][j] = Math.random() < 0.2 ? 1 : 0;
            nextGrid[i][j] = 0;
        }
    }
}

function initializeLogo() {
    for (let i = 2; i < 14; i++)
        for (let j = 2; j < 14; j++)
            grid[i][j] = 1;
    for (let i = 0; i < eyeCells.length; i++) {
        grid[eyeCells[i][1] + 4][eyeCells[i][0] + 4] = 0;
        grid[eyeCells[i][1] + 4][eyeCells[i][0] + 9] = 0;
    }
}

function drawGrid() {
    for (let i = 0; i < gridSizeY; i++) {
        for (let j = 0; j < gridSizeX; j++) {
            canvasGOL.fillStyle = grid[i][j] == 1 ? "#000" : "#fff";
            canvasGOL.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            canvasGOL.strokeStyle = "#000";
            canvasGOL.lineWidth = 2;
            canvasGOL.strokeRect(j * cellSize + 1, i * cellSize + 1, cellSize, cellSize);
        }
    }
}

function countNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) continue;
            let ni = (x + i + gridSizeY) % gridSizeY;
            let nj = (y + j + gridSizeX) % gridSizeX;
            count += grid[ni][nj];
        }
    }
    return count;
}

function updateGrid() {
    for (let i = 0; i < gridSizeY; i++) {
        for (let j = 0; j < gridSizeX; j++) {
            let neighbors = countNeighbors(i, j);
            if (grid[i][j] == 1 && (neighbors < 2 || neighbors > 3)) {
                nextGrid[i][j] = 0;
            } else if (grid[i][j] == 0 && neighbors == 3) {
                nextGrid[i][j] = 1;
            } else {
                nextGrid[i][j] = grid[i][j];
            }
        }
    }
    [grid, nextGrid] = [nextGrid, grid];
}

function gameLoop() {
    initializeLogo()
    drawGrid();
    updateGrid();
}

initializeGrid();
setInterval(gameLoop, 500);
</script>

<!--
const canvasHFT = document.getElementById("canvasHFT").getContext("2d");
canvasHFT.canvas.width = 1280;
canvasHFT.canvas.height = 960;
canvasHFT.globalCompositeOperation = "multiply";

const halfTones = ["#0ff", "#f0f", "#ff0", "#000"];
const halfToneAngles = [15, -15, 0, 15];
const halfToneSizeRange = [9, 9, 9, 6];
const halfToneSizeBaseDenom = [3, 3, 3, 4];
const halfToneSizeMax = 18;
const halfToneXMax = 20;
const halfToneYMax = 18;

function createHalfTones() {
    canvasHFT.clearRect(0, 0, 1280, 960);
    for (let color = 0; color < halfTones.length; color++) {
        canvasHFT.fillStyle = halfTones[color];
        for (let y = -halfToneYMax; y < halfToneYMax; y++) {
            for (let x = -halfToneXMax; x < halfToneXMax; x++) {
                canvasHFT.beginPath();
                canvasHFT.arc(2 * halfToneSizeMax * (x * Math.cos(halfToneAngles[color] * (Math.PI / 180)) - y * Math.sin(halfToneAngles[color] * (Math.PI / 180))) + color * 5 + 640, 2 * halfToneSizeMax * (x * Math.sin(halfToneAngles[color] * (Math.PI / 180)) + y * Math.cos(halfToneAngles[color] * (Math.PI / 180))) + color * 5 + 480, Math.floor(Math.random() * halfToneSizeRange[color] + halfToneSizeMax / halfToneSizeBaseDenom[color]), 0, 2 * Math.PI);
                canvasHFT.fill();
            }
        }
    }
}
createHalfTones();
-->
