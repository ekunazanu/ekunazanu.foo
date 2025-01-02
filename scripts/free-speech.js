const canvasChart = document.getElementById("canvasChart").getContext("2d");
const buttonSync = document.getElementById("buttonSync");
const buttonAdd = document.getElementById("buttonAdd");
const buttonQuery = document.getElementById("buttonQuery");
const inputWords = document.getElementById("inputWords");
canvasChart.canvas.width = 1280;
canvasChart.canvas.height = 700;

var arrayFrequencies = [50000, 7000, 4000, 2000, 1700, 1500, 1200, 1000, 900, 800];
var arrayWords = ["hello", "world", "400", "this", "is", "e", "and", "I", "am", "out"];

drawChart(arrayFrequencies, arrayWords);

function drawChart(frequencies, words, yGaps = 70) {
    var normalizedFrequencies = getNormalizedFrequencies(frequencies, 1280);
    var wordsWithFrequencies = getWordsWithFrequencies(words, frequencies);
    drawBars(normalizedFrequencies, yGaps);
    drawWords(wordsWithFrequencies, yGaps);
}

function drawBars(frequencies, yGaps, xOffset = 0, yOffset = 10, height = 50, color = "#bbb", canvas = canvasChart) {
    canvas.fillStyle = color;
    for (let i = 0; i < frequencies.length; i++)
        canvas.fillRect(xOffset, i * yGaps + yOffset, frequencies[i], height);
}

function drawWords(words, yGaps, xOffset = 20, yOffset = 39, color = "#000", canvas = canvasChart, width = 60) {
    canvas.textAlign = "left";
    canvas.textBaseline = "middle";
    canvas.fillStyle = color;
    canvas.font = "27px JetBrains Mono";
    for (let i = 0; i < words.length; i++)
        canvas.fillText(words[i], xOffset, i * yGaps + yOffset);
}

function getWordsWithFrequencies(words, frequencies) {
    let newWords = [];
    for (let i = 0; i < words.length; i++) {
        newWords.push(words[i] + " ⟶ " + frequencies[i]);
    }
    return newWords;
}

function getNormalizedFrequencies(frequencies, maxValue) {
    let norm = maxValue / frequencies[0];
    let newFrequencies = [];
    for (let i = 0; i < frequencies.length; i++)
        newFrequencies.push(Math.floor(frequencies[i] * norm));
    return newFrequencies;
}
