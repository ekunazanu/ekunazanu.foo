const WIDTH = 1280; 
const COLORS_BLUES = getColorPalette(0.3, -0.2, 0.7, 0.8, 0.2, 1, 64);
const COLORS_REDS  = getColorPalette(0, 0.4, 0.8, 0.9, 0.3, 1, 64);
const COLORS = COLORS_REDS.concat([...COLORS_BLUES].reverse());
const IMAGE = setImage(60, 40);
const PIXEL_SIZE = 10;

const canvasImages = [];
const imageKernels = [
    [[0.11, 0.11, 0.11], [0.11, 0.11, 0.11], [0.11, 0.11, 0.11]],
    [[0.05, 0.1, 0.05], [0.1, 0.4, 0.1], [0.05, 0.1, 0.05]],
    [[0, -1, 0], [-1, 4, -1], [0, -1, 0]],
    [[-1, -1, -1], [0, 0, 0], [1, 1, 1]],
    [[1, 0, -1], [1, 0, -1], [1, 0, -1]],
    [[-2, -1, 0],[-1, 1, 1], [0, 1, 2]],
];
for (let i = 0; i < 6; i++) {
    canvasImages[i] = initializeCanvas(`canvasImage${i}`, 500);
    drawImages(canvasImages[i], IMAGE, imageKernels[i]);
}

const canvasImageBar = initializeCanvas("canvasImageBar", 50);
drawColorBar(canvasImageBar);
initializeCanvasText(canvasImageBar, "left");
canvasImageBar.fillText("Pixel Values", 785, 25);

let arrayCustomKernel = [];
const canvasCustomKernel = initializeCanvas("canvasCustomKernel", 500);
const inputCustomKernel = document.getElementById("inputCustomKernel");
inputCustomKernel.value = "[[0, 0, 0], [0, 1, 0], [0, 0, 0]]";
inputCustomKernel.addEventListener("input", () => {
    canvasCustomKernel.clearRect(0, 0, WIDTH, 500);
    try {
        arrayCustomKernel = JSON.parse(inputCustomKernel.value);
    } finally {
        drawImages(canvasCustomKernel, IMAGE, arrayCustomKernel);
    }
});
drawImages(canvasCustomKernel, IMAGE, JSON.parse(inputCustomKernel.value));


// functions

function setImage(width, height) {
    const image = Array.from({ length: height }, (_, y) => Array(width).fill(0));
    for (let y = 0; y < width / 2; y++)
        for (let x = 0; x < width / 2; x++)
            image[y][x] = (x * y) % width;
    for (let x = width / 2; x < width; x++)
        for (let y = 10; y < width / 2; y++)
            image[y][x] = ((x + y) % 5) * width / 5;
    for (let y = width / 2; y < height; y++)
        for (let x = 0; x < width; x++)
            image[y][x] = (y * 20) % width;
    for (let x = width / 2; x < width; x++)
        for (let y = 0; y < 10; y++)
            image[y][x] = (x * 10) % width;
    return image;
}

function drawImages(canvas, image, kernel, xOffset = 10, yOffset = 10, size = PIXEL_SIZE) {
    originalImage = normalizeValues(image);
    drawHeatmap(canvas, originalImage, originalImage[0].length * size, originalImage.length * size, xOffset, yOffset);
    if (!isValidKernel(kernel)) return;
    convolutedImage = convolveImage(image, kernel);
    convolutedImage = normalizeValues(convolutedImage);
    drawHeatmap(canvas, convolutedImage, convolutedImage[0].length * size, convolutedImage.length * size, xOffset + WIDTH / 2, yOffset);
    initializeCanvasText(canvas, "left");
    canvas.fillText(JSON.stringify(kernel), xOffset + kernel[0].length * size * 2 + 15, yOffset + originalImage.length * size + 5 * size);
    kernel = normalizeValues(kernel, 127, 64, 0.3);
    drawHeatmap(canvas, kernel, kernel[0].length * size * 2, kernel.length * size * 2, xOffset, yOffset + originalImage.length * size + 2 * size);
}

function isValidKernel(kernel) {
    for (let i = 0; i < kernel.length; i++)
        if (kernel[i].length != kernel.length) {
            return false;
        } else {
            for (let j = 0; j < kernel.length; j++)
                if (Number.isNaN(kernel[i][j]))
                    return false;
        }
    return true;
}

function convolveImage(image, kernel) {
    const padHeight = Math.floor(kernel.length / 2);
    const padWidth = Math.floor(kernel[0].length / 2);
    const convolutedImage = Array.from({ length: image.length }, () => new Array(image[0].length).fill(0));
    for (let y = 0; y < image.length; y++) {
        for (let x = 0; x < image[0].length; x++) {
            let sum = 0;
            for (i = kernel.length - 1; i >= 0; i--) {
                for (j = kernel[0].length - 1; j >= 0; j--) {
                    const origX = x + j - padHeight;
                    const origY = y + i - padWidth;
                    if (origX >= 0 && origX < image[0].length && origY >= 0 && origY < image.length)
                        sum += image[origY][origX] * kernel[i][j];
                }
            }
            convolutedImage[y][x] = sum;
        }
    }
    return convolutedImage;
}

function normalizeValues(values, newMax = 127, zero = 64, correction = 1) {
    const maxVal = Math.max(...values.flat());
    const minVal = Math.min(...values.flat());
    const factor = Math.max(Math.abs(maxVal), Math.abs(minVal));
    return values.map(row => row.map(value => {
        return Math.floor((value * correction * (newMax - zero) / factor) + zero);
    }));
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

function getColorPalette(start, rotation, hue = 1, gamma = 1, dark = 0, light = 1, stops = 128) {
    const colors = [];
    let phi = 0;
    let stop = 0;
    for (let i = dark; i < light; i += (light - dark) / stops) {
        phi = 2 * Math.PI * (start / 3 + rotation * stop);
        stop = Math.pow(i, gamma);
        amplitude = hue * stop * (1 - stop) / 2;
        colors.push([
            stop + amplitude * (-0.14861 * Math.cos(phi) + 1.78277 * Math.sin(phi)),
            stop + amplitude * (-0.29227 * Math.cos(phi) - 0.90649 * Math.sin(phi)),
            stop + amplitude * (+1.97294 * Math.cos(phi))
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

function initializeCanvasText(canvas, horizontal = "center", color = "#000", vertical = "middle", font = "25px JetBrains Mono") {
    canvas.font = font;
    canvas.textBaseline = vertical;
    canvas.textAlign = horizontal;
    canvas.fillStyle = color;
}
