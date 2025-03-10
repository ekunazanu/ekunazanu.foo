// code is all over the place
// it can be refactored to be DRY and not use global variables
// but i am on a time crunch

const canvasTop = document.getElementById("canvasTop").getContext("2d");
const canvasDistribution = document.getElementById("canvasDistribution").getContext("2d");
const buttonRefreshTop = document.getElementById("buttonRefreshTop");
const buttonRefreshDist = document.getElementById("buttonRefreshDist");
const buttonAdd = document.getElementById("buttonAdd");
const inputWords = document.getElementById("inputWords");
const infoDistribution = document.getElementById("infoDistribution");

canvasTop.canvas.width = 1280;
canvasTop.canvas.height = 0;
canvasDistribution.canvas.width = 1280;
canvasDistribution.canvas.height = 0;

var topItems = {};
var topCounts = [];
var topElements = [];
var countDistribution = {};
var currentItem = {rank: 1, count: 0, rawRank: 0};

getDistribution("https://words.ekunazanu.foo/dist");
syncChart("https://words.ekunazanu.foo", 16);

buttonRefreshTop.addEventListener('click', async function() {
    syncChart("https://words.ekunazanu.foo", 16);
});

buttonRefreshDist.addEventListener('click', async function() {
    getDistribution("https://words.ekunazanu.foo/dist");
});

buttonAdd.addEventListener('click', async function() {
    var inputData = inputWords.value
    if (inputData == "") return;
    postWord(inputWords.value, "https://words.ekunazanu.foo/item");
});

async function syncChart(url, n = 16) {
    topItems = await getTop(url);
    sortCounts(topItems, n);
    getArrays(topItems, topCounts, topElements, n);
    canvasTop.canvas.height = 1050;
    drawTop(canvasTop, topCounts, topElements, 50, 70);
}

async function getTop(url) {
    try {
        var response = await fetch(url);
        var itemsObject = await response.json();
        return itemsObject
    } catch (error) {
        canvasTop.canvas.style.display = "none";
        buttonRefreshTop.style.display = "none";
    }
}

async function getDistribution(url) {
    try {
        countDistribution = await getTop(url);
        countDistribution.distribution.sort( function(a, b) { return a - b; }).reverse();
        canvasDistribution.canvas.height = 650;
        drawDistribution(canvasDistribution, countDistribution.distribution, countDistribution.cardinality);
    } catch (error) { handleServerDisconnect(); }
}

async function postWord(word, url) {
    await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "text/plain"},
        body: word
    })
    .then(response => response.json())
    .then(data => {
        currentItem.count = data;
        getRank(data);
        drawDistribution(canvasDistribution, countDistribution.distribution, countDistribution.cardinality);
        canvasDistribution.fillStyle = "#fe8";
        canvasDistribution.fillRect(currentItem.rawRank * 5, 0, 5, 600);
        canvasDistribution.fillStyle = "#000";
        canvasDistribution.fillRect(currentItem.rawRank * 5, 600 - currentItem.count * 600 / countDistribution.distribution[0], 5, currentItem.count * 600 / countDistribution.distribution[0]);
        infoDistribution.innerHTML = `Added <mark>${word}</mark>. It appears roughly <strong>${data} times</strong>, at about the <strong>${Math.round(currentItem.rank / 255 * 100)}th percentile</strong>, with an approximate <strong>rank of ${Math.round(currentItem.rank / 255 * countDistribution.cardinality + 1)}</strong>.`;
    })
    .catch(error => { handleServerDisconnect(); });
}

function handleServerDisconnect() {
    inputWords.style.display = "none";
    buttonAdd.style.display = "none";
    buttonRefreshDist.style.display = "none";
    canvasDistribution.canvas.style.display = "none";
    infoDistribution.innerHTML = 'Nevermind, you cannot. See <a href="/log/6-back-on-track">why</a>.'
}

function sortCounts(itemsObject, n = 16) {
    var temp = itemsObject.top16[0];
    for (let i = n - 1; i > 0; i--) {
        let maximum = 0;
        for (let j = 1; j <= i; j++) {
            if (itemsObject.top16[j].count > itemsObject.top16[maximum].count) {
                maximum = j;
            }
        }
        temp = itemsObject.top16[maximum];
        itemsObject.top16[maximum] = itemsObject.top16[i];
        itemsObject.top16[i] = temp;
    }
}

function getArrays(itemsObject, countArray, elementArray, n = 16) {
    for (let i = 0; i < n; i++) {
        countArray[i] = itemsObject.top16[n - 1 - i].count
        var byteVal = itemsObject.top16[n - 1 - i].element
        var strgVal = new TextDecoder().decode(Uint8Array.from(byteVal));
        elementArray[i] = strgVal
    }
}

function getRank(count, n = 256) {
    var rank = 0;
    var zeroes = 0;
    for (let i = 0; i < n; i++) {
        if (count < countDistribution.distribution[i]) { rank++ }
        if (countDistribution.distribution[i] == 0) { zeroes++ }
    }
    currentItem.rawRank = rank;
    currentItem.rank = rank * 255 / (256 - zeroes)
}

function drawTop(canvas, frequencies, words) {
    var normalizedFrequencies = getNormalizedFrequencies(frequencies, 1280);
    canvas.clearRect(0, 0, 1280, 1050);
    canvas.fillStyle = "#aaa";
    for (let i = 0; i < frequencies.length; i++)
        canvas.fillRect(0, i * 70 + 10, normalizedFrequencies[i], 50);
    canvas.textAlign = "left";
    canvas.textBaseline = "middle";
    canvas.fillStyle = "#000";
    canvas.font = "28px Inter";
    for (let i = 0; i < words.length; i++)
        canvas.fillText(frequencies[i] + " → " + words[i], 20, i * 70 + 38);
}

function drawDistribution(canvas, frequencies, cardinality) {
    canvas.clearRect(0, 0, 1280, 650);
    var normalizedFrequencies = getNormalizedFrequencies(frequencies, 600);
    canvas.fillStyle = "#aaa";
    for (let i = 0; i < frequencies.length; i++)
        canvas.fillRect(i * 5, 600 - normalizedFrequencies[i], 5, normalizedFrequencies[i])
    canvas.textAlign = "center";
    canvas.textBaseline = "middle";
    canvas.fillStyle = "#000";
    canvas.font = "28px Inter";
    canvas.fillText("← Approximately "+ cardinality + " total elements →", 640, 625);
}

function getNormalizedFrequencies(frequencies, maxValue = 1280) {
    let norm = maxValue / frequencies[0];
    let newFrequencies = [];
    for (let i = 0; i < frequencies.length; i++)
        newFrequencies.push(Math.floor(frequencies[i] * norm));
    return newFrequencies;
}
