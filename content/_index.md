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
const WIDTH = 1280
const HEIGHT = 322;
const GRID_SQUARES_X = 127;
const GRID_SQUARES_Y = 32;
const CELL_SIZE = 10;

const LIGHTMODE = window.matchMedia("(prefers-color-scheme: light)").matches;
const STYLES = getComputedStyle(document.documentElement);
const FG_COLOR = STYLES.getPropertyValue(LIGHTMODE ? "--fg" : "--gray1").trim();

const canvasGOL = document.getElementById('canvasGOL').getContext('2d');
canvasGOL.canvas.width = WIDTH;
canvasGOL.canvas.height = HEIGHT;


let GRID = [];
let GRID_NEXT = [];

function initializeGrid(grid, nextGrid) {
    for (let i = 0; i < GRID_SQUARES_Y; i++) {
        grid[i] = [];
        nextGrid[i] = [];
        for (let j = 0; j < GRID_SQUARES_X; j++) {
            grid[i][j] = Math.random() < 0.2 ? 1 : 0;
            nextGrid[i][j] = 0;
        }
    }
}

function initializeLogo(grid, xOffset = 4, yOffset = 4, scale = 2) {
    for (let i = yOffset; i < 12 * scale + yOffset; i++)
        for (let j = xOffset; j < 12 * scale + xOffset; j++)
            grid[i][j] = 1;
    for (let y = 2 * scale; y < 7 * scale; y++) {
        for (let x = 2 * scale; x < 5 * scale; x++) {
            grid[y + yOffset][x + xOffset] = 0;
            grid[y + yOffset][x + 5 * scale + xOffset] = 0;
        }
    }
    for (let y = 3 * scale; y < 6 * scale; y++) {
        for (let x = 3 * scale; x < 4 * scale; x++) {
            grid[y + yOffset][x + xOffset] = 1;
            grid[y + yOffset][x + 5 * scale + xOffset] = 1;
        }
    }
}

function drawSquares(canvas, grid) {
    canvas.fillStyle = FG_COLOR;
    for (let y = 0; y < GRID_SQUARES_Y; y++)
        for (let x = 0; x < GRID_SQUARES_X; x++)
            if (grid[y][x] === 1)
                canvas.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawGrid(canvas, xOffset = 1, yOffset = 1) {
    canvas.strokeStyle = FG_COLOR;
    canvas.lineWidth = 2;
    canvas.beginPath();
    for (let i = 0; i <= GRID_SQUARES_X; i++) {
        canvas.moveTo(xOffset + i * CELL_SIZE, yOffset);
        canvas.lineTo(xOffset + i * CELL_SIZE, yOffset + GRID_SQUARES_Y * CELL_SIZE);
    }
    for (let i = 0; i <= GRID_SQUARES_Y; i++) {
        canvas.moveTo(xOffset, yOffset + i * CELL_SIZE);
        canvas.lineTo(xOffset + GRID_SQUARES_X * CELL_SIZE, yOffset + i * CELL_SIZE);
    }
    canvas.stroke();
}

function countNeighbors(grid, x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) continue;
            let ni = (x + i + GRID_SQUARES_Y) % GRID_SQUARES_Y;
            let nj = (y + j + GRID_SQUARES_X) % GRID_SQUARES_X;
            count += grid[ni][nj];
        }
    }
    return count;
}

function updateGrid(grid, nextGrid) {
    for (let i = 0; i < GRID_SQUARES_Y; i++) {
        for (let j = 0; j < GRID_SQUARES_X; j++) {
            let neighbors = countNeighbors(grid, i, j);
            if (grid[i][j] == 1 && (neighbors < 2 || neighbors > 3)) {
                nextGrid[i][j] = 0;
            } else if (grid[i][j] == 0 && neighbors == 3) {
                nextGrid[i][j] = 1;
            } else {
                nextGrid[i][j] = grid[i][j];
            }
        }
    }
    return [nextGrid, grid];
}

function gameLoop() {
    initializeLogo(GRID);
    canvasGOL.clearRect(0, 0, WIDTH, HEIGHT);
    drawSquares(canvasGOL, GRID);
    drawGrid(canvasGOL);
    [GRID, GRID_NEXT] = updateGrid(GRID, GRID_NEXT);
}

initializeGrid(GRID, GRID_NEXT);
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
