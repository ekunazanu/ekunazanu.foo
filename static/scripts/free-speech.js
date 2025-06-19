// code is all over the place
// it can be refactored to be DRY and not use global variables
// but i am on a time crunch

const svgContainerTop = document.getElementById("svgContainerTop")
const svgContainerDistribution = document.getElementById("svgContainerDistribution")
const buttonRefreshTop = document.getElementById("buttonRefreshTop");
const buttonRefreshDist = document.getElementById("buttonRefreshDist");
const buttonAdd = document.getElementById("buttonAdd");
const inputWords = document.getElementById("inputWords");
const infoDistribution = document.getElementById("infoDistribution");

const svgTop = document.createElementNS("http://www.w3.org/2000/svg", "svg");
const svgDistribution = document.createElementNS("http://www.w3.org/2000/svg", "svg");

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
    drawTop(svgTop, svgContainerTop, topCounts, topElements, 50, 70);
}

async function getTop(url) {
    try {
        var response = await fetch(url);
        var itemsObject = await response.json();
        return itemsObject
    } catch (error) {
        buttonRefreshTop.style.display = "none";
    }
}

async function getDistribution(url) {
    try {
        countDistribution = await getTop(url);
        countDistribution.distribution.sort( function(a, b) { return a - b; }).reverse();
        drawDistribution(svgDistribution, svgContainerDistribution, countDistribution.distribution, countDistribution.cardinality);
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
        drawDistribution(svgDistribution, svgContainerDistribution, countDistribution.distribution, countDistribution.cardinality);
        createRectangle(svgDistribution, currentItem.rawRank * 5, 0, 5, 600, null, "#fe8");
        createRectangle(svgDistribution, currentItem.rawRank * 5, 600 - currentItem.count * 600 / countDistribution.distribution[0], 5, currentItem.count * 600 / countDistribution.distribution[0], null, "#000");
        infoDistribution.innerHTML = `Added <mark>${word}</mark>. It appears roughly <strong>${data} times</strong>, at about the <strong>${Math.round(currentItem.rank / 255 * 100)}th percentile</strong>, with an approximate <strong>rank of ${Math.round(currentItem.rank / 255 * countDistribution.cardinality + 1)}</strong>.`;
    })
    .catch(error => { handleServerDisconnect(); });
}

function handleServerDisconnect() {
    inputWords.style.display = "none";
    buttonAdd.style.display = "none";
    buttonRefreshDist.style.display = "none";
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

function drawTop(svg, container, frequencies, words) {
    svg.innerHTML = "";
    svg.setAttribute("width", 1280);
    svg.setAttribute("height", 1050);
    svg.setAttribute("viewBox", "0 0 1280 1050");
    var normalizedFrequencies = getNormalizedFrequencies(frequencies, 1280);
    for (let i = 0; i < words.length; i++)
        createRectangle(svg, 0, i * 70 + 10, normalizedFrequencies[i], 50, frequencies[i] + " → " + words[i]);
    container.appendChild(svg);
}

function createRectangle(svg, x, y, width, height, text = null, color = "#aaa") {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", width);
    rect.setAttribute("height", height);
    rect.setAttribute("fill", color);
    svg.appendChild(rect);
    if (text) {
        txt.setAttribute("x", 20);
        txt.setAttribute("y", y + height / 2 + 10);
        txt.setAttribute("text-anchor", "start");
        txt.setAttribute("font-size", "28");
        txt.setAttribute("fill", "#000");
        txt.textContent = text;
        svg.appendChild(txt);
    }
}

function drawDistribution(svg, container, frequencies, cardinality) {
    svg.innerHTML = "";
    svg.setAttribute("width", 1280);
    svg.setAttribute("height", 650);
    svg.setAttribute("viewBox", "0 0 1280 650");
    var normalizedFrequencies = getNormalizedFrequencies(frequencies, 600);
    for (let i = 0; i < frequencies.length; i++)
        createRectangle(svg, i * 5, 600 - normalizedFrequencies[i], 5, normalizedFrequencies[i]);
    const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
    txt.setAttribute("x", 640);
    txt.setAttribute("y", 625);
    txt.setAttribute("alignment-baseline", "middle");
    txt.setAttribute("text-anchor", "middle");
    txt.setAttribute("font-size", "28");
    txt.setAttribute("fill", "#000");
    txt.textContent = "← Approximately "+ cardinality + " total elements →";
    svg.appendChild(txt);
    container.appendChild(svg);
}

function getNormalizedFrequencies(frequencies, maxValue = 1280) {
    let norm = maxValue / frequencies[0];
    let newFrequencies = [];
    for (let i = 0; i < frequencies.length; i++)
        newFrequencies.push(Math.floor(frequencies[i] * norm));
    return newFrequencies;
}
