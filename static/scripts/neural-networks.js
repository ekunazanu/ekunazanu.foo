const WIDTH = 1280
const COLORS_PINKS = getColorPalette(2.5, 0.4, 1, 0.9);    // purple - costs
const COLORS_BLUES = getColorPalette(0.5, -0.4, 0.6, 0.8); // blue - weights postive
const COLORS_REDS  = getColorPalette(0.1, 0.4, 0.8, 0.9);  // red - weights negative
const COLORS_GREEN = getColorPalette(0.1, -0.5, 0.6, 0.9); // green - dont use with weights to avoid red-green ambiguity
// const COLORS_GRBL = getColorPalette(0.5, -0.5, 0.7, 0.8);  // default colorscheme for log posts

class Dataset {
    constructor(records) {
        this.records = records;
        this.dimensions = 0;
        this.data = [];
    }

    generatePointsLinear(slope = 1, bias = 0) {
        let points = [];
        for (let i = 0; i < this.records; i++)
            points.push(i * slope + bias);
        this.data.push(points);
        this.dimensions += 1;
    }

    generatePointsGaussian(dimension, deviation, slope = 1, bias = 0, iterCentralLimit = 6) {
        let points = [];
        for (let i = 0; i < this.records; i++) {
            let randomVar = 0;
            for (let j = 0; j < iterCentralLimit; j++)
                randomVar += Math.random();
            randomVar = randomVar * deviation / iterCentralLimit - deviation * 0.5;
            points.push(this.data[dimension][i] * slope + bias + randomVar);
        }
        this.data.push(points);
        this.dimensions += 1;
    }

    getPlotBounds(dimensionX, dimensionY) {
        let minX = Math.min(...this.data[dimensionX], 0);
        let maxX = Math.max(...this.data[dimensionX], 0);
        let minY = Math.min(...this.data[dimensionY], 0);
        let maxY = Math.max(...this.data[dimensionY], 0);
        return [minX, maxX, minY, maxY];
    }

    drawPlotAxes(canvas, xLabel, yLabel, dimensionX, dimensionY, height = 900, color = "#000", lineWidth = 2, padding = 15) {
        const bounds = this.getPlotBounds(dimensionX, dimensionY);
        canvas.lineWidth = lineWidth;
        canvas.strokeStyle = color;
        canvas.beginPath();
        canvas.moveTo(bounds[0] + padding, 0);
        canvas.lineTo(bounds[0] + padding, height);
        canvas.moveTo(0, height - points[7] - padding);
        canvas.lineTo(WIDTH, height - points[7] - padding);
        canvas.stroke();
        initializeCanvasText(canvas, "#000", "left");
        canvas.fillText(xLabel + " ->", points[6] + 50, height - points[7] + 28);
        canvas.translate(points[6] - 28, height - points[7] - 50);
        canvas.rotate(-Math.PI / 2);
        canvas.fillText(yLabel + " ->", 0, 0);
        canvas.setTransform(1, 0, 0, 1, 0, 0);
    }
}

const canvasTestBars = initializeCanvas("canvasTestBars", 200);
initializeCanvasText(canvasTestBars, "#000", "left");
canvasTestBars.fillText("Grad", 780, 25);
canvasTestBars.fillText("Loss", 780, 100);
canvasTestBars.fillText("Weights", 780, 175);
drawColorBar(canvasTestBars, COLORS_GREEN);
drawColorBar(canvasTestBars, COLORS_PINKS, 75);
drawColorBarDiverging(canvasTestBars, COLORS_REDS, COLORS_BLUES, 150)


const canvasTestPlot = initializeCanvas("canvasTestPlot", 900);
const arrayTestData = new Dataset(100);
arrayTestData.generatePointsLinear();
arrayTestData.generatePointsGaussian(0, 10);
arrayTestData.drawPlotAxes(canvasTestPlot, "AREA", "PRICE", 0, 1);
// const arrayTestPoints = getPlotPoints(arrayTestData, 0, 1);
// drawPlotAxes(canvasTestPlot, arrayTestPoints, "AREA", "PRICE");
// drawLinearRegressionLine(canvasTestPlot, arrayTestPoints, 1, 50);
// drawPlotPoints(canvasTestPlot, arrayTestPoints);



// functions

function drawLinearRegressionLine(canvas, points, slope, bias, color = "#000", lineWidth = 2, height = 900, padding = 15) {
    canvas.lineWidth = lineWidth;
    canvas.strokeStyle = color;
    canvas.moveTo(points[6] + padding, (1 - bias / (points[3] - points[5])) * (height - points[7]));
    canvas.lineTo(WIDTH - padding, (1 - (bias + points[2] * slope) / (points[3] - points[5])) * (height - points[7] - padding * 2) + padding);
    canvas.stroke();
    canvas.moveTo(points[6], (1 - bias / (points[3] - points[5])) * (height - points[7]));
    canvas.lineTo(0, (1 - (bias - points[4] * slope) / (points[5] - points[5])) * (height - points[7]));
    canvas.stroke();
}

function drawPlotPoints(canvas, points, color = "#000", radius = 5, height = 900, padding = 15) {
    canvas.fillStyle = color;
    for (let i = 0; i < points[0].length; i++) {
        canvas.beginPath();
        canvas.arc(points[0][i] / (points[2] - points[4]) * (WIDTH - points[6] - padding * 2) + points[6] + padding, (1 - points[1][i] / (points[3] - points[5])) * (height - points[7] - padding * 2) + padding, radius, 0, Math.PI * 2);
        canvas.fill();
    }
}

function drawPlotAxes(canvas, points, xLabel, yLabel, height = 900, color = "#000", lineWidth = 2, padding = 15) {
    canvas.lineWidth = lineWidth;
    canvas.strokeStyle = color;
    canvas.beginPath();
    canvas.moveTo(points[6] + padding, 0);
    canvas.lineTo(points[6] + padding, height);
    canvas.moveTo(0, height - points[7] - padding);
    canvas.lineTo(WIDTH, height - points[7] - padding);
    canvas.stroke();
    initializeCanvasText(canvas, "#000", "left");
    canvas.fillText(xLabel + " ->", points[6] + 50, height - points[7] + 28);
    canvas.translate(points[6] - 28, height - points[7] - 50);
    canvas.rotate(-Math.PI / 2);
    canvas.fillText(yLabel + " ->", 0, 0);
    canvas.setTransform(1, 0, 0, 1, 0, 0);
}

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
