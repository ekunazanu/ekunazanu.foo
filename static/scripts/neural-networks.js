const WIDTH = 1280
const COLORS_PINKS = getColorPalette(2.5, 0.4, 1, 0.9);    // costs
const COLORS_BLUES = getColorPalette(0.5, -0.4, 0.6, 0.8); // weights postive
const COLORS_REDS  = getColorPalette(0.1, 0.4, 0.8, 0.9);  // weights negative
const COLORS_GREEN = getColorPalette(0.1, -0.5, 0.6, 0.9); // dont use with weights to avoid red-green ambiguity
// const COLORS_GRBL = getColorPalette(0.8, -0.8, 0.6, 0.9); // default colorscheme for log posts

const canvasTestBar = initializeCanvas("canvasTestBar", 200);
initializeCanvasText(canvasTestBar, "#000", "left");
canvasTestBar.fillText("Grad", 780, 25);
canvasTestBar.fillText("Loss", 780, 100);
canvasTestBar.fillText("Weights", 780, 175);
drawColorBar(canvasTestBar, COLORS_PINKS, 75);
drawColorBarDiverging(canvasTestBar, COLORS_REDS, COLORS_BLUES, 150)
drawColorBar(canvasTestBar, COLORS_GREEN);

function drawColorBarDiverging(canvas, colorsLeft, colorsRight, y = 0, x = 0, startLeft = 33, startRight = 0, endLeft = 128, endRight = 95, height = 50, width = 760) {
    drawColorBar(canvas, colorsLeft, y, x, startLeft, endLeft, height, width / 2);
    colorsReversed = [...colorsRight].reverse();
    drawColorBar(canvas, colorsReversed, y, x + width / 2, startRight, endRight, height, width / 2);
}

function drawColorBar(canvas, colors, y = 0, x = 0, start = 20, end = 115, height = 50, width = 760) {
    let lineWidth = width / (end - start);
    canvas.lineWidth = lineWidth;
    for (let i = 0; i <= end - start; i++) {
        canvas.strokeStyle = getColor(colors[i + start]);
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
    return `rgb(${r}, ${g}, ${b})`
}

function getColorPalette(start, rotation, hue = 1, gamma = 1, stops = 128) {
    colors = [];
    let phi = 0;
    let stop = 0;
    for (let i = 0; i <= stops; i++) {
        phi = 2 * Math.PI * (start / 3 + rotation * stop)
        stop = Math.pow(i / stops, gamma),
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

function initializeCanvasText(canvas, color = "#000", horizontal = "center", vertical = "middle", font = "25px JetBrains Mono") {
    canvas.font = font;
    canvas.textBaseline = vertical;
    canvas.textAlign = horizontal;
    canvas.fillStyle = color;
}

function initializeSliders(slider, minimum, maximum, step, value) {
    slider.min = minimum;
    slider.max = maximum;
    slider.step = step;
    slider.value = value;
}
