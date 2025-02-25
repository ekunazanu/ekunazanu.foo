const WIDTH = 1280
const PADDING = 65
const COLORS_LOSS = getColorPalette(2.5, 0.4, 1, 0.9);    // purple - costs
const COLORS_BLUES = getColorPalette(0.5, -0.4, 0.6, 0.8); // blue - weights postive
const COLORS_REDS  = getColorPalette(0.1, 0.4, 0.8, 0.9);  // red - weights negative
const COLORS_GREEN = getColorPalette(0.1, -0.5, 0.6, 0.9); // green - dont use with weights to avoid red-green ambiguity
// const COLORS_GRBL = getColorPalette(0.5, -0.5, 0.7, 0.8);  // default colorscheme for log posts
const COLOR_LOSS = getColor(COLORS_LOSS[96]);
console.log(COLOR_LOSS);

class Dataset {

    constructor() {
        this.dimensions = 0;
        this.data = [];
    }

    // use generate once per dataset; would be ugly to handle later expansion
    generatePointsLinear(count, slope = 1, bias = 0, deviation = 0, iterCentralLimit = 6) {
        let points = [];
        for (let i = 0; i < count; i++) {
            let randomVar = 0;
            if (deviation != 0) {
                for (let j = 0; j < iterCentralLimit; j++)
                    randomVar += Math.random();
                randomVar = randomVar * deviation / iterCentralLimit - deviation * 0.5;
            }
            points.push([i * slope + bias + randomVar]);
        }
        this.data = points;
        this.dimensions = 1;
    }

    generatePointsGaussian(count, mean = 0, deviation = 10, iterCentralLimit = 6) {
        let points = [];
        for (let i = 0; i < count; i++) {
            let randomVar = 0;
            for (let j = 0; j < iterCentralLimit; j++)
                randomVar += Math.random();
            randomVar = randomVar * deviation / iterCentralLimit - deviation * 0.5;
            points.push([mean + randomVar]);
        }
        this.data = points;
        this.dimensions = 1;
    }

    expandPointDimension(baseDimension = 0, slope = 1, bias = 0, deviation = 0, iterCentralLimit = 6) {
        const count = this.data.length;
        for (let point = 0; point < count; point++) {
            let randomVar = 0;
            if (deviation != 0) {
                for (let j = 0; j < iterCentralLimit; j++)
                    randomVar += Math.random();
                randomVar = randomVar * deviation / iterCentralLimit - deviation * 0.5;
            }
            this.data[point].push(this.data[point][baseDimension] * slope + bias + randomVar);
        }
        this.dimensions += 1;
    }
}

class Plot {

    constructor(canvas, dataset, dimensionX, dimensionY, padding = PADDING) {
        this.data = dataset.data;
        this.canvas = canvas;
        this.padding = padding;
        this.dimensionX = dimensionX;
        this.dimensionY = dimensionY;
        this.height = canvas.canvas.height;
        this.width = WIDTH;
        this.bounds = this.getPlotBounds();
    }

    getPlotBounds() {
        const minX = Math.min(...this.data.map(i => i[this.dimensionX]), 0);
        const maxX = Math.max(...this.data.map(i => i[this.dimensionX]), 0);
        const minY = Math.min(...this.data.map(i => i[this.dimensionY]), 0);
        const maxY = Math.max(...this.data.map(i => i[this.dimensionY]), 0);
        const scaleX = (this.width - this.padding * 2) / (maxX - minX);
        const scaleY = (this.height - this.padding * 2) / (maxY - minY);
        const xOrigin = -minX * scaleX + this.padding;
        const yOrigin = this.height + (minY * scaleY) - this.padding;
        return { minX, maxX, minY, maxY, scaleX, scaleY, xOrigin, yOrigin };
    }

    drawPlotAxes(xLabel, yLabel, color = "#000", lineWidth = 2, textOffset = 35) {
        const leftHalf = this.bounds.xOrigin < this.width / 2;
        const bottomHalf = this.bounds.yOrigin > this.height / 2;
        this.canvas.lineWidth = lineWidth;
        this.canvas.strokeStyle = color;
        this.canvas.beginPath();
        this.canvas.moveTo(this.bounds.xOrigin, 0);
        this.canvas.lineTo(this.bounds.xOrigin, this.height);
        this.canvas.moveTo(0, this.bounds.yOrigin);
        this.canvas.lineTo(this.width, this.bounds.yOrigin);
        this.canvas.stroke();
        initializeCanvasText(this.canvas, "#000", leftHalf ? "left":"right");
        this.canvas.fillText(xLabel + " ->", leftHalf ? this.bounds.xOrigin + textOffset : this.bounds.xOrigin - textOffset, bottomHalf ? this.bounds.yOrigin + textOffset: this.bounds.yOrigin - textOffset);
        initializeCanvasText(this.canvas, "#000", bottomHalf ? "left":"right");
        this.canvas.translate(leftHalf ? this.bounds.xOrigin - textOffset : this.bounds.xOrigin + textOffset, bottomHalf ? this.bounds.yOrigin - textOffset : this.bounds.yOrigin + textOffset);
        this.canvas.rotate(-Math.PI / 2);
        this.canvas.fillText(yLabel + " ->", 0, 0);
        this.canvas.setTransform(1, 0, 0, 1, 0, 0);
    }

    getPointCoordinates(index) {
        const x = (this.data[index][this.dimensionX] - this.bounds.minX) * this.bounds.scaleX + this.padding;
        const y = this.height - ((this.data[index][this.dimensionY] - this.bounds.minY) * this.bounds.scaleY) - this.padding;
        return [x, y]
    }

    drawPlotPoints(color = "#000", radius = 5) {
        this.canvas.fillStyle = color;
        this.canvas.beginPath();
        for (let point = 0; point < this.data.length; point++) {
            const pointXY = this.getPointCoordinates(point);
            this.canvas.beginPath();
            this.canvas.arc(pointXY[0], pointXY[1], radius, 0, 2 * Math.PI)
            this.canvas.fill();
        }
    }

    drawLinearRegressionLine(slope, bias, pointLines = false, color = "#000", lineWidth = 2, pointLineColor = COLOR_LOSS, pointLineWidth = 2) { 
        const yIntercept = this.bounds.yOrigin - bias * this.bounds.scaleY;
        if (pointLines) {
            this.canvas.lineWidth = pointLineWidth;
            this.canvas.strokeStyle = pointLineColor;
            this.canvas.beginPath();
            for (let point = 0; point < this.data.length; point++) {
                const pointXY = this.getPointCoordinates(point);
                this.canvas.moveTo(pointXY[0], pointXY[1]);
                this.canvas.lineTo(pointXY[0], yIntercept - this.bounds.scaleY * slope * this.data[point][this.dimensionX]);
            }
            this.canvas.stroke();
        }
        this.canvas.lineWidth = lineWidth;
        this.canvas.strokeStyle = color;
        this.canvas.beginPath();
        this.canvas.moveTo(this.bounds.xOrigin, yIntercept);
        this.canvas.lineTo(this.width, yIntercept - slope * this.bounds.scaleY * (this.bounds.maxX + this.padding / this.bounds.scaleX));
        this.canvas.moveTo(this.bounds.xOrigin, yIntercept);
        this.canvas.lineTo(0, yIntercept - slope * this.bounds.scaleY * (this.bounds.minX - this.padding / this.bounds.scaleX));
        this.canvas.stroke();
    }
}

const canvasTestBars = initializeCanvas("canvasTestBars", 200);
initializeCanvasText(canvasTestBars, "#000", "left");
canvasTestBars.fillText("Grad", 780, 25);
canvasTestBars.fillText("Loss", 780, 100);
canvasTestBars.fillText("Weights", 780, 175);
drawColorBar(canvasTestBars, COLORS_GREEN);
drawColorBar(canvasTestBars, COLORS_LOSS, 75);
drawColorBarDiverging(canvasTestBars, COLORS_REDS, COLORS_BLUES, 150)


const canvasTestPlot = initializeCanvas("canvasTestPlot", 900);
const datasetTestData = new Dataset();
const testSlope = 1
const testBias = 30
// arrayTestData.generatePointsGaussian(50, -50, 10);
datasetTestData.generatePointsLinear(30, 1, -25);
datasetTestData.expandPointDimension(0, testSlope, testBias, 40);
const plotTestData = new Plot(canvasTestPlot, datasetTestData, 0, 1)
plotTestData.drawLinearRegressionLine(testSlope, testBias, true);
plotTestData.drawPlotPoints();
plotTestData.drawPlotAxes("AREA", "PRICE");



// functions

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
