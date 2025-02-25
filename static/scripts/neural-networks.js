const WIDTH = 1280;
const PADDING = 65;
const TEXTOFFSET = 36;
const LINEWIDTH = 2;
const COLORS = getColors();

// class-functions

function getZero() {
    return 0;
}

function identityFunction(num) {
    return num;
}

identityFunction.derivative = function (x) {
    return 1;
}

function rectifiedLinear(num) {
    return Math.max(0, num);
}

rectifiedLinear.derivative = function (x) {
    return x > 0 ? 1 : 0;
};

function errorSquared(prediction, actual) {
    return (prediction - actual) * (prediction - actual);
}

errorSquared.derivative = function (prediction, actual) {
    return 2 * (prediction - actual);
};

function errorAbsolute(prediction, actual) {
    return Math.abs(prediction - actual);
}

errorAbsolute.derivative = function(prediction, actual) {
    return Math.sign(prediction - actual);
}


// classes

class Dataset {

    constructor() {
        this.data = [];
    }

    generatePointsLinear(count, slope = 1, bias = 0, deviation = 0, iterCentralLimit = 6) {
        let points = [];
        for (let i = 0; i < count; i++) {
            let randomVar = 0;
            if (deviation != 0)
                randomVar = getRandomVariable(0, deviation, iterCentralLimit);
            points.push([i * slope + bias + randomVar]);
        }
        this.data = points;
    }

    generatePointsGaussian(count, mean = 0, deviation = 10, iterCentralLimit = 6) {
        let points = [];
        for (let i = 0; i < count; i++)
            points.push([getRandomVariable(mean, deviation, iterCentralLimit)]);
        this.data = points;
    }

    expandPointDimension(expansionFunction, expansionParams = [], deviation = 0, iterCentralLimit = 6) {
        const count = this.data.length;
        for (let point = 0; point < count; point++) {
            let randomVar = 0;
            if (deviation != 0)
                randomVar = getRandomVariable(0, deviation, iterCentralLimit);
            const newPointDimensionVal = expansionFunction(this.data[point], ...expansionParams);
            this.data[point].push(newPointDimensionVal + randomVar);
        }
    }
}

class Model {

    constructor(dataset, learningRate, lossFunction, activationFunction, dataDimensions, outputDimensions, hiddenLayers = []) {
        this.dataset = dataset;
        this.learningRate = learningRate;
        this.lossFunction = lossFunction;
        this.activationFunction = activationFunction;
        this.dataDimensions = dataDimensions;
        this.outputDimensions = outputDimensions;
        this.hiddenLayers = hiddenLayers;
        this.iteration = 0;
        this.loss = 0;
        this.layerDimensions = [ this.dataDimensions.length, ...this.hiddenLayers, this.outputDimensions.length ];
        this.weights = this.initializeWeights();
        this.neurons = this.initializeNeurons();
        this.activatedNeurons = this.initializeNeurons();
        this.neuronDerivatives = this.initializeNeurons();
        this.weightDerivatives = this.initializeWeights(getZero);
        this.dataStats = this.computeDataStats();
    }

    initializeNeurons() {
        const neurons = [];
        for (let layer = 1; layer < this.layerDimensions.length; layer++)
            neurons[layer - 1] = new Array(this.layerDimensions[layer]).fill(0);
        return neurons;
    }

    initializeWeights(randomizerFunction = heInitializer) {
        const weights = [];
        weights[0] = [];
        for (let layer = 0; layer < this.layerDimensions.length - 1; layer++) {
            weights[layer] = [];
            for (let dimensionOut = 0; dimensionOut < this.layerDimensions[layer + 1]; dimensionOut++) {
                weights[layer][dimensionOut] = [];
                for (let dimensionIn = 0; dimensionIn < this.layerDimensions[layer] + 1; dimensionIn++) {
                    weights[layer][dimensionOut][dimensionIn] = randomizerFunction(this.layerDimensions[layer]);
                }
            }
        }
        return weights;
    }

    normalizeData(datapoint) {
        const normalizedValues = [...datapoint];
        for (let dimension = 0; dimension < this.dataDimensions.length; dimension++)
            normalizedValues[this.dataDimensions[dimension]] = (datapoint[this.dataDimensions[dimension]] - this.dataStats[dimension].mean) / this.dataStats[dimension].std;
        return normalizedValues;
    }

    computeDataStats() {
        const dataStats = [];
        for (let dimension = 0; dimension < this.dataDimensions.length; dimension++) {
            let sum = 0; let squaredDifference = 0;
            for (let point = 0; point < this.dataset.data.length; point++)
                sum += this.dataset.data[point][this.dataDimensions[dimension]];
            const mean = sum / this.dataset.data.length;
            for (let point = 0; point < this.dataset.data.length; point++)
                squaredDifference += (this.dataset.data[point][this.dataDimensions[dimension]] - mean) ** 2;
            const standardDeviation = Math.sqrt(squaredDifference / this.dataset.data.length);
            dataStats[dimension] = { mean: mean, std: standardDeviation };
        }
        return dataStats;
    }

    denormalizeWeights(weightMatrix, derivatives = false, reverse = false) {
        const result = [];
        for (let neuron = 0; neuron < weightMatrix[0].length; neuron++) {
            result[neuron] = [...weightMatrix[0][neuron]];
            for (let dimensionIn = 0; dimensionIn < this.dataDimensions.length; dimensionIn++) {
                if (derivatives) {
                    result[neuron][dimensionIn] = weightMatrix[0][neuron][dimensionIn] * this.dataStats[dimensionIn].std + weightMatrix[0][neuron][this.dataDimensions.length] * this.dataStats[dimensionIn].mean;
                } else if (reverse) {
                    result[neuron][this.dataDimensions.length] += weightMatrix[0][neuron][dimensionIn] * this.dataStats[dimensionIn].mean;
                    result[neuron][dimensionIn] = weightMatrix[0][neuron][dimensionIn] * this.dataStats[dimensionIn].std;
                } else {
                    result[neuron][dimensionIn] = weightMatrix[0][neuron][dimensionIn] / this.dataStats[dimensionIn].std;
                    result[neuron][this.dataDimensions.length] -= weightMatrix[0][neuron][dimensionIn] * this.dataStats[dimensionIn].mean / this.dataStats[dimensionIn].std;
                }
            }
        }
        return result;
    }

    predict(datapoint) {
        let inputNeurons = this.dataDimensions.map(dimension => datapoint[dimension]);
        for (let layer = 0; layer < this.neurons.length; layer++) {
            for (let dimensionOut = 0; dimensionOut < this.weights[layer].length; dimensionOut++) {
                this.neurons[layer][dimensionOut] = linearAggregator(inputNeurons, this.weights[layer][dimensionOut]);
                this.activatedNeurons[layer][dimensionOut] = this.activationFunction(this.neurons[layer][dimensionOut]);
            }
            inputNeurons = this.activatedNeurons[layer];
        }
        return this.activatedNeurons[this.neurons.length - 1];
    }

    calculateDerivatives(datapoint) {
        const outputLayer = this.weights.length - 1;
        for (let neuron = 0; neuron < this.layerDimensions[outputLayer + 1]; neuron++) {
            const output = this.activatedNeurons[outputLayer][neuron];
            const target = datapoint[this.outputDimensions[neuron]];
            const dLoss = this.lossFunction.derivative(output, target);
            const dActivation = this.activationFunction.derivative(this.neurons[outputLayer][neuron]);
            this.neuronDerivatives[outputLayer][neuron] = dLoss * dActivation;
        }
        for (let layer = outputLayer - 1; layer >= 0; layer--) {
            for (let neuron = 0; neuron < this.layerDimensions[layer + 1]; neuron++) {
                let derivative = 0;
                for (let nextNeuron = 0; nextNeuron < this.layerDimensions[layer + 2]; nextNeuron++)
                    derivative += this.neuronDerivatives[layer + 1][nextNeuron] * this.weights[layer + 1][nextNeuron][neuron];
                derivative *= this.activationFunction.derivative(this.neurons[layer][neuron]);
                this.neuronDerivatives[layer][neuron] = derivative;
            }
        }
        let inputNeurons = this.dataDimensions.map(dimension => datapoint[dimension]);
        for (let layer = 0; layer < this.weights.length; layer++) {
            for (let dimensionOut = 0; dimensionOut < this.layerDimensions[layer + 1]; dimensionOut++) {
                for (let dimensionIn = 0; dimensionIn < inputNeurons.length; dimensionIn++)
                    this.weightDerivatives[layer][dimensionOut][dimensionIn] = this.neuronDerivatives[layer][dimensionOut] * inputNeurons[dimensionIn];
                this.weightDerivatives[layer][dimensionOut][inputNeurons.length] = this.neuronDerivatives[layer][dimensionOut];
            }
            inputNeurons = this.activatedNeurons[layer];
        }
    }

    calculateLoss() {
        let loss = 0;
        for (let dimension = 0; dimension < this.outputDimensions.length; dimension++) {
            for (let point = 0; point < this.dataset.data.length; point++) {
                const prediction = this.predict(this.normalizeData(this.dataset.data[point]));
                loss += this.lossFunction(prediction[dimension], this.dataset.data[point][this.outputDimensions[dimension]]);
            }
        }
        this.loss = loss / this.dataset.data.length;
        return this.loss;
    }

    updateWeights(learningRate = this.learningRate) {
    for (let layer = 0; layer < this.weights.length; layer++)
        for (let dimensionOut = 0; dimensionOut < this.weights[layer].length; dimensionOut++)
            for (let dimensionIn = 0; dimensionIn < this.weights[layer][dimensionOut].length; dimensionIn++)
                this.weights[layer][dimensionOut][dimensionIn] -= learningRate * this.weightDerivatives[layer][dimensionOut][dimensionIn];
    }

    train(epochs = 1, learningRate = this.learningRate) {
        for (let epoch = 0; epoch < epochs; epoch++) {
            for (let point = 0; point < this.dataset.data.length; point++) {
                const datapoint = this.normalizeData(this.dataset.data[point]);
                this.predict(datapoint);
                this.calculateDerivatives(datapoint);
                this.updateWeights(learningRate);
            }
        }
    }
}

class Plot {

    constructor(canvasName, dataset, dimensionX, dimensionY, xLabel, yLabel, bounds, height = 900, width = WIDTH, xOffset = 0, yOffset = 0, padding = PADDING) {
        this.canvas = initializeCanvas(canvasName, height);
        this.data = dataset.data;
        this.padding = padding;
        this.xLabel = xLabel;
        this.yLabel = yLabel;
        this.dimensionX = dimensionX;
        this.dimensionY = dimensionY;
        this.height = height;
        this.width = width;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.bounds = bounds ? bounds : this.getPlotBounds();
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

    drawPlotAxes(xLabel, yLabel, color = COLORS.FG, lineWidth = 2, textOffset = TEXTOFFSET) {
        const leftHalf = this.bounds.xOrigin <= this.width / 2;
        const bottomHalf = this.bounds.yOrigin >= this.height / 2;
        const x = this.bounds.xOrigin + this.xOffset;
        const y = this.bounds.yOrigin + this.yOffset;
        this.canvas.lineWidth = lineWidth;
        this.canvas.strokeStyle = color;
        this.canvas.beginPath();
        this.canvas.moveTo(x, this.yOffset); this.canvas.lineTo(x, this.height + this.yOffset);
        this.canvas.moveTo(this.xOffset, y); this.canvas.lineTo(this.width + this.xOffset, y);
        this.canvas.stroke();
        initializeCanvasText(this.canvas, COLORS.FG, leftHalf ? "left":"right");
        this.canvas.fillText(this.xLabel + " ->", leftHalf ? x + textOffset : x - textOffset, bottomHalf ? y + textOffset: y - textOffset);
        initializeCanvasText(this.canvas, COLORS.FG, bottomHalf ? "left":"right");
        this.canvas.translate(leftHalf ? x - textOffset : x + textOffset, bottomHalf ? y - textOffset : y + textOffset);
        this.canvas.rotate(-Math.PI / 2);
        this.canvas.fillText(this.yLabel + " ->", 0, 0);
        this.canvas.setTransform(1, 0, 0, 1, 0, 0);
    }

    getPointCoordinates(point) {
        const x = (point[this.dimensionX] - this.bounds.minX) * this.bounds.scaleX + this.padding + this.xOffset;
        const y = this.height - ((point[this.dimensionY] - this.bounds.minY) * this.bounds.scaleY) - this.padding + this.yOffset;
        return [x, y];
    }

    drawPlotPoint(point, color = COLORS.FG, radius = 5) {
        this.canvas.fillStyle = color;
        const pointXY = this.getPointCoordinates(point);
        this.canvas.beginPath();
        this.canvas.arc(pointXY[0], pointXY[1], radius, 0, 2 * Math.PI)
        this.canvas.fill();
    }

    drawArrow(point, magnitude, arrowHeadSize = 10, color = COLORS.GRAY, lineWidth = LINEWIDTH) {
        const direction = Math.sign(magnitude);
        const arrowStart = this.getPointCoordinates(point);
        let arrowEnd = [point[0] - magnitude, point[1]]
        arrowEnd = this.getPointCoordinates(arrowEnd);
        this.canvas.strokeStyle = color;
        this.canvas.lineWidth = lineWidth;
        this.canvas.beginPath();
        this.canvas.moveTo(arrowStart[0], arrowStart[1]);
        this.canvas.lineTo(arrowEnd[0], arrowEnd[1]);
        this.canvas.moveTo(arrowEnd[0] + direction * arrowHeadSize, arrowStart[1] - arrowHeadSize);
        this.canvas.lineTo(arrowEnd[0], arrowEnd[1]);
        this.canvas.lineTo(arrowEnd[0] + direction * arrowHeadSize, arrowStart[1] + arrowHeadSize);
        this.canvas.stroke();
    }

    drawPlotPoints(color = COLORS.FG, radius = 5) {
        for (let point = 0; point < this.data.length; point++)
            this.drawPlotPoint(this.data[point], color, radius);
    }

    drawLinearRegressionLine(slope, bias, pointLines = false, color = COLORS.FG, lineWidth = 2, pointLineColor = COLORS.LOSS, pointLineWidth = 2) { 
        const yIntercept = this.bounds.yOrigin - bias * this.bounds.scaleY;
        if (pointLines) {
            this.canvas.lineWidth = pointLineWidth;
            this.canvas.strokeStyle = pointLineColor;
            this.canvas.beginPath();
            for (let point = 0; point < this.data.length; point++) {
                const pointXY = this.getPointCoordinates(this.data[point]);
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


// main


const SIMPLE_2D_LINEAR_W1 = 1;
const SIMPLE_2D_LINEAR_W2 = 30;
const SIMPLE_2D_LINEAR_W1_MIN = -10;
const SIMPLE_2D_LINEAR_W1_MAX = 10;
const SIMPLE_2D_LINEAR_W2_MIN = -50;
const SIMPLE_2D_LINEAR_W2_MAX = 50;
const SIMPLE_2D_TEXT_Y1 = "Happiness";
const SIMPLE_2D_TEXT_W1 = "Alcohol";

const datasetTwoDimensionsLinear = new Dataset();
datasetTwoDimensionsLinear.generatePointsLinear(30, 1, 10, 2);
datasetTwoDimensionsLinear.expandPointDimension(linearAggregator, [[SIMPLE_2D_LINEAR_W1, SIMPLE_2D_LINEAR_W2]], 30);

const plotTwoDimensionsLinearStatic = new Plot("canvasTwoDimensionsLinearStatic", datasetTwoDimensionsLinear, 0, 1, SIMPLE_2D_TEXT_W1, SIMPLE_2D_TEXT_Y1, false);
plotTwoDimensionsLinearStatic.drawPlotPoints();
plotTwoDimensionsLinearStatic.drawPlotAxes();

const plotTwoDimensionsLinearLineStatic = new Plot("canvasTwoDimensionsLinearLineStatic", datasetTwoDimensionsLinear, 0, 1, SIMPLE_2D_TEXT_W1, SIMPLE_2D_TEXT_Y1, false);
plotTwoDimensionsLinearLineStatic.drawPlotPoints();
plotTwoDimensionsLinearLineStatic.drawPlotAxes();
plotTwoDimensionsLinearLineStatic.drawLinearRegressionLine(SIMPLE_2D_LINEAR_W1, SIMPLE_2D_LINEAR_W2, true, undefined, undefined, COLORS.GRAYL);

const plotTwoDimensionsLinear = new Plot("canvasTwoDimensionsLinear", datasetTwoDimensionsLinear, 0, 1, SIMPLE_2D_TEXT_W1, SIMPLE_2D_TEXT_Y1, false);
const sliderTwoDimensionsLinearW1 = initializeSliders("sliderTwoDimensionsLinearW1", SIMPLE_2D_LINEAR_W1_MIN, SIMPLE_2D_LINEAR_W1_MAX, 0.1, SIMPLE_2D_LINEAR_W1);
const sliderTwoDimensionsLinearW2 = initializeSliders("sliderTwoDimensionsLinearW2", SIMPLE_2D_LINEAR_W2_MIN, SIMPLE_2D_LINEAR_W2_MAX, 1, SIMPLE_2D_LINEAR_W2);
sliderTwoDimensionsLinearW1.addEventListener("input", updateTwoDimensionsLinear);
sliderTwoDimensionsLinearW2.addEventListener("input", updateTwoDimensionsLinear);
function updateTwoDimensionsLinear() {
    plotTwoDimensionsLinear.canvas.clearRect(0, 0, WIDTH, plotTwoDimensionsLinear.canvas.canvas.height);
    plotTwoDimensionsLinear.drawLinearRegressionLine(sliderTwoDimensionsLinearW1.value, sliderTwoDimensionsLinearW2.value, true);
    plotTwoDimensionsLinear.drawPlotPoints();
    plotTwoDimensionsLinear.drawPlotAxes();
}
updateTwoDimensionsLinear();


let varTwoDimensionsLinearLoss = 0;
let varTwoDimensionsLinearLossDerivatives = [];
const varTwoDimensionsLinearLossHeight = 400
const varTwoDimensionsLinearLossBoundsW1 = { data: [[SIMPLE_2D_LINEAR_W1_MIN, 20000], [SIMPLE_2D_LINEAR_W1_MAX, 0]] }
const varTwoDimensionsLinearLossBoundsW2 = { data: [[SIMPLE_2D_LINEAR_W2_MIN, 20000], [SIMPLE_2D_LINEAR_W2_MAX, 0]] }
const sliderTwoDimensionsLinearLossW1 = initializeSliders("sliderTwoDimensionsLinearLossW1", SIMPLE_2D_LINEAR_W1_MIN, SIMPLE_2D_LINEAR_W1_MAX, 0.1, SIMPLE_2D_LINEAR_W1);
const sliderTwoDimensionsLinearLossW2 = initializeSliders("sliderTwoDimensionsLinearLossW2", SIMPLE_2D_LINEAR_W2_MIN, SIMPLE_2D_LINEAR_W2_MAX, 1, SIMPLE_2D_LINEAR_W2);
const modelLoss = new Model(datasetTwoDimensionsLinear, 0.001, errorSquared, identityFunction, [0], [1]);
const plotTwoDimensionsLinearLoss = new Plot("canvasTwoDimensionsLinearLoss", datasetTwoDimensionsLinear, 0, 1, SIMPLE_2D_TEXT_W1, SIMPLE_2D_TEXT_Y1, false, 400);
const plotTwoDimensionsLinearLossPlotW1 = new Plot("canvasTwoDimensionsLinearLossPlots", varTwoDimensionsLinearLossBoundsW1, 0, 1, "Slope", "Loss", false, varTwoDimensionsLinearLossHeight, (WIDTH - PADDING) / 2);
const plotTwoDimensionsLinearLossPlotW2 = new Plot("canvasTwoDimensionsLinearLossPlots", varTwoDimensionsLinearLossBoundsW2, 0, 1, "Intercept", "Loss", false, varTwoDimensionsLinearLossHeight, (WIDTH - PADDING) / 2, (WIDTH + PADDING) / 2);
sliderTwoDimensionsLinearLossW1.addEventListener("input", updateTwoDimensionsLinearLoss);
sliderTwoDimensionsLinearLossW2.addEventListener("input", updateTwoDimensionsLinearLoss);
function updateTwoDimensionsLinearLoss() {
    plotTwoDimensionsLinearLoss.canvas.clearRect(0, 0, WIDTH, plotTwoDimensionsLinearLoss.canvas.canvas.height);
    plotTwoDimensionsLinearLossPlotW1.canvas.clearRect(0, 0, WIDTH, plotTwoDimensionsLinearLossPlotW1.canvas.canvas.height);
    plotTwoDimensionsLinearLossPlotW2.canvas.clearRect(0, 0, WIDTH, plotTwoDimensionsLinearLossPlotW2.canvas.canvas.height);
    plotTwoDimensionsLinearLoss.drawLinearRegressionLine(sliderTwoDimensionsLinearLossW1.value, sliderTwoDimensionsLinearLossW2.value, true);
    plotTwoDimensionsLinearLoss.drawPlotPoints();
    plotTwoDimensionsLinearLoss.drawPlotAxes();
    modelLoss.weights[0][0] = modelLoss.denormalizeWeights([[[Number(sliderTwoDimensionsLinearLossW1.value), Number(sliderTwoDimensionsLinearLossW2.value)]]], false, true)[0];
    varTwoDimensionsLinearLoss = modelLoss.calculateLoss();
    plotTwoDimensionsLinearLossPlotW1.drawPlotPoint([Number(sliderTwoDimensionsLinearLossW1.value), varTwoDimensionsLinearLoss]);
    plotTwoDimensionsLinearLossPlotW2.drawPlotPoint([Number(sliderTwoDimensionsLinearLossW2.value), varTwoDimensionsLinearLoss]);
    plotTwoDimensionsLinearLossPlotW1.drawPlotAxes();
    plotTwoDimensionsLinearLossPlotW2.drawPlotAxes();
}
updateTwoDimensionsLinearLoss();



let varLossLandscapeLoss = 0;
let varLossLandscapeDerivatives = [];
const varLossLandscapeLearningRate = 0.001;
const varLossLandscapeLossHeight = 400;
const buttonLossLandscapeTrain = document.getElementById("buttonLossLandscapeTrain");
const sliderLossLandscapeW1 = initializeSliders("sliderLossLandscapeW1", SIMPLE_2D_LINEAR_W1_MIN, SIMPLE_2D_LINEAR_W1_MAX, 0.1, SIMPLE_2D_LINEAR_W1);
const sliderLossLandscapeW2 = initializeSliders("sliderLossLandscapeW2", SIMPLE_2D_LINEAR_W2_MIN, SIMPLE_2D_LINEAR_W2_MAX, 1, SIMPLE_2D_LINEAR_W2);
const varLossLandscapeBounds = { data: [[SIMPLE_2D_LINEAR_W1_MIN, SIMPLE_2D_LINEAR_W2_MIN], [SIMPLE_2D_LINEAR_W1_MAX, SIMPLE_2D_LINEAR_W2_MAX]] }
const plotLossLandscape = new Plot("canvasLossLandscape", varLossLandscapeBounds, 0, 1, "Slope", "Intercept", false);
const plotLossLandscapePlotW1 = new Plot("canvasLossLandscapePlots", varTwoDimensionsLinearLossBoundsW1, 0, 1, "Slope", "Loss", false, varLossLandscapeLossHeight, (WIDTH - PADDING) / 2);
const plotLossLandscapePlotW2 = new Plot("canvasLossLandscapePlots", varTwoDimensionsLinearLossBoundsW2, 0, 1, "Intercept", "Loss", false, varLossLandscapeLossHeight, (WIDTH - PADDING) / 2, (WIDTH + PADDING) / 2);
sliderLossLandscapeW1.addEventListener("input", updateLossLandscape);
sliderLossLandscapeW2.addEventListener("input", updateLossLandscape);
function updateLossLandscapeDraw(loss, weights, derivatives = null) {
    plotLossLandscape.canvas.clearRect(0, 0, WIDTH, plotLossLandscape.canvas.canvas.height);
    plotLossLandscapePlotW1.canvas.clearRect(0, 0, WIDTH, plotLossLandscapePlotW1.canvas.canvas.height);
    if (derivatives) {
        plotLossLandscapePlotW1.drawArrow([weights[0], loss], derivatives[0] * varLossLandscapeLearningRate * modelLoss.dataset.data.length);
        plotLossLandscapePlotW2.drawArrow([weights[1], loss], derivatives[1] * varLossLandscapeLearningRate * modelLoss.dataset.data.length);
        console.log(weights[0], derivatives[0] * varLossLandscapeLearningRate * modelLoss.dataset.data.length);
        console.log(weights[1], derivatives[1] * varLossLandscapeLearningRate * modelLoss.dataset.data.length);
    }
    plotLossLandscape.drawPlotPoint(weights);
    plotLossLandscape.drawPlotAxes();
    plotLossLandscapePlotW1.drawPlotPoint([weights[0], loss]);
    plotLossLandscapePlotW2.drawPlotPoint([weights[1], loss]);
    plotLossLandscapePlotW1.drawPlotAxes();
    plotLossLandscapePlotW2.drawPlotAxes();
}
function updateLossLandscape() {
    const weights = [Number(sliderLossLandscapeW1.value), Number(sliderLossLandscapeW2.value)];
    modelLoss.weights[0][0] = modelLoss.denormalizeWeights([[weights]], false, true)[0];
    varLossLandscapeLoss = modelLoss.calculateLoss();
    updateLossLandscapeDraw(varLossLandscapeLoss, weights);
}
buttonLossLandscapeTrain.addEventListener("click", () => {
    modelLoss.train(1, varLossLandscapeLearningRate);
    varLossLandscapeLoss = modelLoss.calculateLoss();
    updateLossLandscapeDraw(varLossLandscapeLoss, modelLoss.denormalizeWeights(modelLoss.weights)[0], modelLoss.denormalizeWeights(modelLoss.weightDerivatives, true)[0]);
    sliderLossLandscapeW1.value = modelLoss.denormalizeWeights(modelLoss.weights)[0][0];
    sliderLossLandscapeW2.value = modelLoss.denormalizeWeights(modelLoss.weights)[0][1];
});
updateLossLandscape();


const canvasTestBars = initializeCanvas("canvasTestBars", 200);
initializeCanvasText(canvasTestBars, COLORS.FG, "left");
canvasTestBars.fillText("Grad", 780, 25);
canvasTestBars.fillText("Loss", 780, 100);
canvasTestBars.fillText("Weights", 780, 175);
drawColorBar(canvasTestBars, COLORS.ARRAY_GREENS);
drawColorBar(canvasTestBars, COLORS.ARRAY_LOSS, 75);
drawColorBarDiverging(canvasTestBars, COLORS.ARRAY_WEIGHTNEG, COLORS.ARRAY_WEIGHTPOS, 150);



// functions

function heInitializer(variance) {
    return (Math.random() * 2 - 1) * Math.sqrt(2 / variance);
}

function linearAggregator(datapoint, weightMatrix) {
    let prediction = 0;
    for (let i = 0; i < datapoint.length; i++)
        prediction += datapoint[i] * weightMatrix[i];
    prediction += weightMatrix[datapoint.length];
    return prediction
}

function getRandomVariable(mean = 0, deviation = 1, iterCentralLimit = 6) {
    let randomVar = 0;
    for (let j = 0; j < iterCentralLimit; j++)
        randomVar += Math.random();
    randomVar = randomVar * deviation / iterCentralLimit - deviation * 0.5;
    return mean + randomVar;
}

function drawLines(canvas, coordinates, color = COLORS.FG, lineWidth = 2) {
    canvas.lineWidth = lineWidth;
    canvas.strokeStyle = color;
    canvas.beginPath();
    canvas.moveTo(coordinates[0][0], coordinates[0][1]);
    for (let i = 1; i < coordinates.length; i++)
        canvas.lineTo(coordinates[i][0], coordinates[i][1]);
    canvas.stroke();
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
        canvas.strokeStyle = colors[i + start];
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

function getColorPalette(start, rotation, hue = 1, gamma = 1, dark = 0, light = 1, offset = 0, stops = 128) {
    const colors = [];
    for (let i = dark; i < light; i += (light - dark) / stops) {
        const stop = Math.pow(i, gamma);
        const phi = 2 * Math.PI * (start / 3 + rotation * stop);
        const amplitude = hue * stop * (1 - stop) / 2;
        const base = offset > 0 ? offset - stop : stop;
        colors.push(getColor([
            base + amplitude * (-0.14861 * Math.cos(phi) + 1.78277 * Math.sin(phi)),
            base + amplitude * (-0.29227 * Math.cos(phi) - 0.90649 * Math.sin(phi)),
            base + amplitude * (+1.97294 * Math.cos(phi))
        ]));
    }
    return colors;
}

function getColors() {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const styles = getComputedStyle(document.documentElement);
    const colors = {};
    colors.FG = styles.getPropertyValue("--fg").trim();
    colors.BG = styles.getPropertyValue("--bg").trim();
    colors.GRAY = styles.getPropertyValue("--gray1").trim();
    colors.GRAYL = styles.getPropertyValue("--gray3").trim();
    colors.ARRAY_LOSS = darkMode ? getColorPalette(2.9, 0.2, 0.8, 0.8, 0.3, 1.1, 1.135) : getColorPalette(2.5, 0.4, 1, 0.9);
    colors.ARRAY_WEIGHTPOS = darkMode ? getColorPalette(0.3, -0.2, 0.8, 0.3, 0, 1, 1.135) : getColorPalette(0.5, -0.4, 0.6, 0.8);
    colors.ARRAY_WEIGHTNEG = darkMode ? getColorPalette(0, 0.4, 0.8, 0.3, 0, 1, 1.135) : getColorPalette(0.1, 0.4, 0.8, 0.9);
    colors.ARRAY_GREENS = darkMode ? getColorPalette(0.1, -0.5, 0.6, 0.8, 0.3, 1.1, 1.135) : getColorPalette(0.1, -0.5, 0.6, 0.9);
    colors.LOSS = colors.ARRAY_LOSS[56];
    return colors;
}

function initializeCanvas(canvasID, height, width = WIDTH) {
    const canvas = document.getElementById(canvasID).getContext("2d");
    canvas.canvas.width = width;
    canvas.canvas.height = height;
    return canvas;
}

function initializeCanvasText(canvas, color = COLORS.FG, horizontal = "center", vertical = "middle", font = "25px JetBrains Mono") {
    canvas.font = font;
    canvas.textBaseline = vertical;
    canvas.textAlign = horizontal;
    canvas.fillStyle = color;
}

function initializeSliders(sliderID, minimum, maximum, step, value) {
    const slider = document.getElementById(sliderID);
    slider.min = minimum;
    slider.max = maximum;
    slider.step = step;
    slider.value = value;
    return slider
}
