const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const WIDTH = 1280
const COLORS = darkMode ? getColorPalette(0, 0, 0, 0.8, 0.08, 0.7) : getColorPalette(0.7, -0.6, 0.7, 0.9, 0.05, 0.95);
const COLOR_FG = getComputedStyle(document.documentElement).getPropertyValue("--fg").trim();

const altRandomFunctions = {
    "Random": () => Math.random(),
    "Random + Random + ...": () => Math.random() + Math.random() + Math.random() + Math.random() + Math.random(),
    "Random / Random": () => Math.random() / Math.random(),
    "Random * Random": () => Math.random() * Math.random(),
    "sqrt(Random)": () => Math.sqrt(Math.random()),
    "log2(Random)": () => Math.log2(Math.random()),
    "max(Random, Random)": () => Math.max(Math.random(), Math.random()),
    "Random <= Random": () => Number(Math.random() <= Math.random()),
    "Random % Random": () => Math.random() % Math.random(),
};

const canvasDistributions = initializeCanvas("canvasDistributions", 1500);
const buttomDistributions = document.getElementById("buttonDistributions");
initializeCanvasText(canvasDistributions, COLOR_FG, "left");
canvasDistributions.fillText("Normalized Values", 785, 25);
drawColorBar(canvasDistributions);
drawFunctionDistributions(canvasDistributions, altRandomFunctions);
buttomDistributions.innerHTML = "Refresh Distribution";
buttomDistributions.addEventListener("click", () => {
    canvasDistributions.clearRect(0, 100, WIDTH, 1400);
    drawFunctionDistributions(canvasDistributions, altRandomFunctions);
});


// functions

function drawFunctionDistributions(canvas, functions, x = 40, y = 40, size = 10, columns = 3) {
    let gap = Math.round((WIDTH - (size * x * (columns))) / (columns - 1));
    let yOffset = 20 - y * size;
    let xOffset = 0;
    let randomVals = [];
    let normalizedVals = [];
    Object.entries(functions).forEach(([funcName, funcFunction], i) => {
        if (i % columns == 0) {
            xOffset = 0;
            yOffset += y * size + 80;
        }
        else xOffset += x * size + gap;
        randomVals = Array.from({ length: y }, () => Array.from({ length: x }, funcFunction));
        normalizedVals = normalizeValues(randomVals);
        drawHeatmap(canvas, normalizedVals, x * size, y * size, xOffset, yOffset);
        canvas.fillStyle = COLOR_FG;
        canvas.fillText(funcName, xOffset, yOffset + y * size + 27);
    });
}

function normalizeValues(values, newMin = 0, newMax = 127) {
    let maxVal = Math.max(...values.flat());
    let minVal = Math.min(...values.flat());
    if (maxVal === minVal) {
        return values.map(row => 
            row.map((value) => value));
    }
    return values.map(row => 
        row.map(value => {
            return Math.floor(((value - minVal) / (maxVal - minVal)) * (newMax - newMin) + newMin);
        })
    );
}

function drawHeatmap(canvas, values, width, height, xOffset = 0, yOffset = 0, colors = COLORS) {
    let cellWidth = width / values[0].length;
    let cellHeight = height / values.length;
    for (let y = 0; y < values.length; y++) {
        for (let x = 0; x < values[y].length; x++) {
            canvas.fillStyle = getColor(colors[values[y][x]]);
            canvas.fillRect(x * cellWidth + xOffset, y * cellHeight + yOffset, cellWidth, cellHeight);
        }
    }
}

function drawColorBar(canvas, y = 0, x = 0, colors = COLORS, stops = 128, height = 50, width = 768) {
    let lineWidth = width / stops;
    canvas.lineWidth = lineWidth;
    for (let i = 0; i < stops; i++) {
        canvas.strokeStyle = getColor(colors[i]);
        canvas.beginPath();
        canvas.moveTo(i * lineWidth + x, y);
        canvas.lineTo(i * lineWidth + x, y + height);
        canvas.stroke();
    }
}

function getColor(rgbArray) {
    let r = Math.floor(Math.max(0, Math.min(rgbArray[0], 1)) * 255);
    let g = Math.floor(Math.max(0, Math.min(rgbArray[1], 1)) * 255);
    let b = Math.floor(Math.max(0, Math.min(rgbArray[2], 1)) * 255);
    return `rgb(${r}, ${g}, ${b})`;
}

function getColorPalette(start, rotation, hue = 1, gamma = 1, dark = 0, light = 1, offset = 0, stops = 128) {
    const colors = [];
    for (let i = dark; i < light; i += (light - dark) / stops) {
        const stop = Math.pow(i, gamma);
        const phi = 2 * Math.PI * (start / 3 + rotation * stop);
        const amplitude = hue * stop * (1 - stop) / 2;
        const base = offset > 0 ? offset - stop : stop;
        colors.push([
            base + amplitude * (-0.14861 * Math.cos(phi) + 1.78277 * Math.sin(phi)),
            base + amplitude * (-0.29227 * Math.cos(phi) - 0.90649 * Math.sin(phi)),
            base + amplitude * (+1.97294 * Math.cos(phi))
        ]);
    }
    return colors;
}

function initializeCanvas(canvasID, height, width = WIDTH) {
    const canvas = document.getElementById(canvasID).getContext("2d");
    canvas.canvas.width = width;
    canvas.canvas.height = height;
    return canvas;
}

function initializeCanvasText(canvas, color = "#000", horizontal = "center", vertical = "middle", font = "25px JetBrains Mono") {
    canvas.font = font;
    canvas.textBaseline = vertical;
    canvas.textAlign = horizontal;
    canvas.fillStyle = color;
}
