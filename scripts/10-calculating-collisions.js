// quick ugly script
// decetly performat, but code is ugly

const maxIters = 100;
const canvasCollisions = document.getElementById("canvasCollisions").getContext("2d");
const textYCoord = document.getElementById("textYCoord");
const textRatio = document.getElementById("textRatio");
const textCollisions = document.getElementById("textCollisions");
const sliderYCoord = document.getElementById("sliderYCoord");
const sliderRatio = document.getElementById("sliderRatio");
const switchRatio43 = document.getElementById("switchRatio43");
const switchRatio169 = document.getElementById("switchRatio169");
var collisions = 0;

canvasCollisions.canvas.width = 1296;
canvasCollisions.canvas.height = 432;
canvasCollisions.canvas.style.border = "0.0625rem solid #000"
sliderYCoord.min = 0;
sliderYCoord.max = canvasCollisions.canvas.height;
sliderYCoord.step = 1;
sliderYCoord.value = 0;
sliderRatio.min = 432;
sliderRatio.max = 1296;
sliderRatio.step = 2;
sliderRatio.value = 1296;

drawReflections(canvasCollisions, 0, 0, canvasCollisions.canvas.width, canvasCollisions.canvas.height, maxIters);
drawCircle(canvasCollisions, 0);

sliderYCoord.addEventListener("input", function() {
    updateCanvasWrapper();
});

sliderRatio.addEventListener("input", function() {
    canvasCollisions.canvas.width = sliderRatio.value;
    updateCanvasWrapper();
});

switchRatio43.addEventListener("click", function() {
    canvasCollisions.canvas.width = 576;
    sliderRatio.value = 576;
    updateCanvasWrapper();
});

switchRatio169.addEventListener("click", function() {
    canvasCollisions.canvas.width = 768;
    sliderRatio.value = 768;
    updateCanvasWrapper();
});

function updateCanvasWrapper() {
    canvasCollisions.clearRect(0, 0, canvasCollisions.canvas.width, canvasCollisions.canvas.height);
    collisions = drawReflections(canvasCollisions, 0, sliderYCoord.value, canvasCollisions.canvas.width, canvasCollisions.canvas.height, maxIters);
    drawCircle(canvasCollisions, sliderYCoord.value);
    textYCoord.innerHTML = (sliderYCoord.value / sliderYCoord.max).toFixed(4);
    textRatio.innerHTML = (sliderRatio.value / 432).toFixed(4);
    if (collisions == 100) textCollisions.innerHTML = "≥ 100";
    else textCollisions.innerHTML = collisions;
}

function drawCircle(canvas, y, x = 0, radius = 15, color = "#aaa") {
    canvas.fillStyle = color;
    canvas.beginPath();
    canvas.arc(x, y, radius, 0, Math.PI * 2);
    canvas.closePath();
    canvas.fill();
    canvas.stroke();
}

function drawReflections(canvas, initialX, initialY, boundX, boundY, maxIter = 5, color = "#000", strokewidth = 2) {
    let iter = 0;
    let x = initialX;
    let y = initialY;
    let right = true;
    let down = true;
    let diffX, diffY;
    canvas.strokeStyle = color;
    canvas.lineWidth = strokewidth;
    canvas.beginPath();
    while (iter < maxIter) {
        canvas.moveTo(x, y);
        if (right) {diffX = boundX - x} else {diffX = x}
        if (down) {diffY = boundY - y} else {diffY = y}
        if (diffX < diffY) {
            if (right) {x = boundX; right = false} else {x = 0; right = true;}
            if (down) {y += diffX} else {y -= diffX}
        }
        else if (diffY < diffX) {
            if (down) {y = boundY; down = false} else {y = 0; down = true;}
            if (right) {x += diffY} else {x -= diffY}
        }
        else if (diffX == diffY) {
            if (down) {y = boundY} else {y = 0}
            if (right) {x = boundX} else {x = 0}
            canvas.lineTo(x, y);
            canvas.closePath();
            canvas.stroke();
            drawCircle(canvas, y, x);
            break;
        }
        canvas.lineTo(x, y);
        iter++;
    }
    canvas.closePath();
    canvas.stroke();
    return iter
}
