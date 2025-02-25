// numberline static
const canvasNumberlineStatic = document.getElementById("canvasNumberlineStatic").getContext("2d");
canvasNumberlineStatic.canvas.width = 1280;
canvasNumberlineStatic.canvas.height = 128;
drawNumberLine(canvasNumberlineStatic, 5, 1275, 65);
drawNumberMark(canvasNumberlineStatic, 5, 1260, 65);
canvasNumberlineStatic.stroke();

// numberline mapping
const canvasNumberlineMap = document.getElementById("canvasNumberlineMap").getContext("2d");
canvasNumberlineMap.canvas.width = 1280;
canvasNumberlineMap.canvas.height = 384;
drawNumberLine(canvasNumberlineMap, 5, 1275, 65, "#aaa");
drawNumberMark(canvasNumberlineMap, 5, 1260, 65, "#aaa");
drawNumberMark(canvasNumberlineMap, 5, 1260, 321, "#aaa");
drawNumberLine(canvasNumberlineMap, 5, 1275, 321);
drawNumberMark(canvasNumberlineMap, 5, 1260, 321, "#000", 140, 1, 571, -36);
drawLine(canvasNumberlineMap, 641, 120, 571, 261);
drawLine(canvasNumberlineMap, 571, 120, 435, 261);
drawLine(canvasNumberlineMap, 501, 120, 301, 261);
drawLine(canvasNumberlineMap, 711, 120, 711, 261);
drawLine(canvasNumberlineMap, 781, 120, 841, 261);
canvasNumberlineMap.fillText("f(x)", 750, 200);
canvasNumberlineMap.stroke();

// numberline addition
const canvasNumberlineAdd = document.getElementById("canvasNumberlineAdd").getContext("2d");
const sliderAdd = document.getElementById("sliderAdd");
const spanNumberlineAdd = document.getElementById("spanNumberlineAdd");
intializeSliders(sliderAdd, -8.3, 8.3, 0.05, 0);
canvasNumberlineAdd.canvas.width = 1280;
canvasNumberlineAdd.canvas.height = 384;
drawNumberLine(canvasNumberlineAdd, 5, 1275, 65, "#aaa");
drawNumberMark(canvasNumberlineAdd, 5, 1260, 65, "#aaa");
function drawNumberlineAdd() {
    drawNumberMark(canvasNumberlineAdd, 5, 1260, 321, "#aaa");
    drawNumberLine(canvasNumberlineAdd, 5, 1275, 321);
    drawNumberMark(canvasNumberlineAdd, 5, 1260, 321, "#000", undefined, undefined, sliderAdd.value * 70 + 641, -36);
    drawLine(canvasNumberlineAdd, 641, 120, sliderAdd.value * 70 + 641, 261);
    canvasNumberlineAdd.stroke();
}
drawNumberlineAdd();
sliderAdd.addEventListener("input", function() {
    canvasNumberlineAdd.clearRect(0, 119, 1280, 265);
    drawNumberlineAdd();
    spanNumberlineAdd.innerHTML = Number(sliderAdd.value).toFixed(2);
});

// number line multiplication
const canvasNumberlineMultiply = document.getElementById("canvasNumberlineMultiply").getContext("2d");
const sliderMultiply = document.getElementById("sliderMultiply");
const spanNumberlineMultiply = document.getElementById("spanNumberlineMultiply");
intializeSliders(sliderMultiply, -6, 6, 0.05, 1);
canvasNumberlineMultiply.canvas.width = 1280;
canvasNumberlineMultiply.canvas.height = 384;
drawNumberLine(canvasNumberlineMultiply, 5, 1275, 65, "#aaa");
drawNumberMark(canvasNumberlineMultiply, 5, 1260, 65, "#aaa");
function drawNumberlineMultiply() {
    drawNumberMark(canvasNumberlineMultiply, 5, 1260, 321, "#aaa");
    drawNumberLine(canvasNumberlineMultiply, 5, 1275, 321);
    drawNumberMark(canvasNumberlineMultiply, 5, 1260, 321, "#000", sliderMultiply.value * 70, 1, undefined, -36);
    drawLine(canvasNumberlineMultiply, 711, 120, sliderMultiply.value * 70 + 641, 261);
    canvasNumberlineMultiply.stroke();
}
drawNumberlineMultiply();
sliderMultiply.addEventListener("input", function() {
    canvasNumberlineMultiply.clearRect(0, 119, 1280, 265);
    drawNumberlineMultiply();
    spanNumberlineMultiply.innerHTML = Number(sliderMultiply.value).toFixed(2);
});

// numberline square mapping
const canvasNumberlineSquareMap = document.getElementById("canvasNumberlineSquareMap").getContext("2d");
canvasNumberlineSquareMap.canvas.width = 1280;
canvasNumberlineSquareMap.canvas.height = 384;
drawNumberLine(canvasNumberlineSquareMap, 5, 1275, 65, "#aaa");
drawNumberMark(canvasNumberlineSquareMap, 5, 1260, 65, "#aaa");
drawNumberMark(canvasNumberlineSquareMap, 5, 1260, 321, "#aaa");
drawNumberLine(canvasNumberlineSquareMap, 5, 1275, 321);
drawNumberMark(canvasNumberlineSquareMap, 640, 750, 321, "#000", undefined, undefined, 641, -36);
canvasNumberlineSquareMap.moveTo(921, 306)
canvasNumberlineSquareMap.lineTo(921, 336);
canvasNumberlineSquareMap.stroke();
canvasNumberlineSquareMap.fillText("2", 921, 285);
drawLine(canvasNumberlineSquareMap, 641, 120, 641, 261);
drawLine(canvasNumberlineSquareMap, 571, 120, 701, 261);
drawLine(canvasNumberlineSquareMap, 711, 120, 711, 261);
drawLine(canvasNumberlineSquareMap, 501, 120, 901, 261);
drawLine(canvasNumberlineSquareMap, 781, 120, 911, 261);
drawLine(canvasNumberlineSquareMap, 431, 120, 1250, 261);
drawLine(canvasNumberlineSquareMap, 851, 120, 1260, 261);
drawLine(canvasNumberlineSquareMap, 361, 120, 1260, 201);
drawLine(canvasNumberlineSquareMap, 921, 120, 1260, 191);
canvasNumberlineSquareMap.stroke();

// numberline squaring
const canvasNumberlineSquare = document.getElementById("canvasNumberlineSquare").getContext("2d");
const sliderSquare = document.getElementById("sliderSquare");
const spanNumberlineSquare = document.getElementById("spanNumberlineSquare");
const spanNumberlineSquareRes = document.getElementById("spanNumberlineSquareRes");
intializeSliders(sliderSquare, -2.5, 2.5, 0.05, 1);
canvasNumberlineSquare.canvas.width = 1280;
canvasNumberlineSquare.canvas.height = 640;
drawNumberLine(canvasNumberlineSquare, 5, 1275, 65, "#aaa");
drawNumberMark(canvasNumberlineSquare, 5, 1260, 65, "#aaa");
function drawNumberlineSquare() {
    drawNumberMark(canvasNumberlineSquare, 5, 1260, 321, "#aaa");
    drawNumberMark(canvasNumberlineSquare, 5, 1260, 577, "#aaa");
    drawNumberLine(canvasNumberlineSquare, 5, 1275, 321);
    drawNumberLine(canvasNumberlineSquare, 5, 1275, 577);
    drawNumberMark(canvasNumberlineSquare, 5, 1260, 321, "#000", sliderSquare.value * 70, 1, undefined, -36);
    drawNumberMark(canvasNumberlineSquare, 5, 1260, 577, "#000", sliderSquare.value * sliderSquare.value * 70, 1, undefined, -36);
    drawLine(canvasNumberlineSquare, 711, 120, sliderSquare.value * 70 + 641, 261);
    drawLine(canvasNumberlineSquare, sliderSquare.value * 70 + 641, 376, sliderSquare.value * sliderSquare.value * 70 + 641, 517);
    canvasNumberlineSquare.stroke();
    canvasNumberlineSquare.fillText(Number(sliderSquare.value).toFixed(2) + "x", 1221, 193);
    canvasNumberlineSquare.fillText(Number(sliderSquare.value).toFixed(2) + "x", 1221, 449);
}
drawNumberlineSquare();
sliderSquare.addEventListener("input", function() {
    canvasNumberlineSquare.clearRect(0, 119, 1280, 521);
    drawNumberlineSquare();
    spanNumberlineSquare.innerHTML = Number(sliderSquare.value).toFixed(2);
    spanNumberlineSquareRes.innerHTML = (sliderSquare.value * sliderSquare.value).toFixed(2);
});

// numberline square root
const canvasNumberlineSqrt = document.getElementById("canvasNumberlineSqrt").getContext("2d");
const sliderSqrt = document.getElementById("sliderSqrt");
const sliderSqrtRes = document.getElementById("sliderSqrtRes");
const spanNumberlineSqrt = document.getElementById("spanNumberlineSqrt");
const spanNumberlineSqrtRes = document.getElementById("spanNumberlineSqrtRes");
const spanNumberlineSqrtEqu = document.getElementById("spanNumberlineSqrtEqu");
intializeSliders(sliderSqrtRes, 0, 6.25, 0.05, 1);
intializeSliders(sliderSqrt, -2.5, 2.5, 0.1, 1);
canvasNumberlineSqrt.canvas.width = 1280;
canvasNumberlineSqrt.canvas.height = 640;
drawNumberLine(canvasNumberlineSqrt, 5, 1275, 65, "#aaa");
drawNumberMark(canvasNumberlineSqrt, 5, 1260, 65, "#aaa");
function drawNumberlineSqrt() {
    drawNumberMark(canvasNumberlineSqrt, 5, 1260, 321, "#aaa");
    drawNumberMark(canvasNumberlineSqrt, 5, 1260, 577, "#aaa");
    drawNumberLine(canvasNumberlineSqrt, 5, 1275, 321);
    drawNumberLine(canvasNumberlineSqrt, 5, 1275, 577);
    drawNumberMark(canvasNumberlineSqrt, 5, 1260, 321, "#000", sliderSqrt.value * 70, 1, undefined, -36);
    drawNumberMark(canvasNumberlineSqrt, 5, 1260, 577, "#000", sliderSqrt.value * sliderSqrt.value * 70, 1, undefined, -36);
    drawLine(canvasNumberlineSqrt, 711, 120, sliderSqrt.value * 70 + 641, 261);
    drawLine(canvasNumberlineSqrt, sliderSqrt.value * 70 + 641, 376, sliderSqrt.value * sliderSqrt.value * 70 + 641, 517);
    canvasNumberlineSqrt.stroke();
    canvasNumberlineSqrt.fillText(Number(sliderSqrt.value).toFixed(2) + "x", 1221, 193);
    canvasNumberlineSqrt.fillText(Number(sliderSqrt.value).toFixed(2) + "x", 1221, 449);
}
drawNumberlineSqrt();
drawTriangle(canvasNumberlineSqrt, sliderSqrtRes.value * 70 + 641, 629)
function updateSqrtEqual() {
    if (sliderSqrt.value * sliderSqrt.value == sliderSqrtRes.value) spanNumberlineSqrtEqu.innerHTML = "is";
    else spanNumberlineSqrtEqu.innerHTML = "is <b>not</b>";
}
sliderSqrt.addEventListener("input", function() {
    canvasNumberlineSqrt.clearRect(0, 119, 1280, 510);
    drawNumberlineSqrt();
    spanNumberlineSqrt.innerHTML = Number(sliderSqrt.value).toFixed(2);
    updateSqrtEqual();
});
sliderSqrtRes.addEventListener("input", function() {
    canvasNumberlineSqrt.clearRect(0, 629, 1280, 11);
    drawTriangle(canvasNumberlineSqrt, sliderSqrtRes.value * 70 + 641, 629)
    spanNumberlineSqrtRes.innerHTML = Number(sliderSqrtRes.value).toFixed(2);
    updateSqrtEqual();
});

// numberline square root negative
const canvasNumberlineSqrtNeg = document.getElementById("canvasNumberlineSqrtNeg").getContext("2d");
const sliderSqrtNeg = document.getElementById("sliderSqrtNeg");
const sliderSqrtNegRes = document.getElementById("sliderSqrtNegRes");
const spanNumberlineSqrtNeg = document.getElementById("spanNumberlineSqrtNeg");
const spanNumberlineSqrtNegRes = document.getElementById("spanNumberlineSqrtNegRes");
const spanNumberlineSqrtNegEqu = document.getElementById("spanNumberlineSqrtNegEqu");
intializeSliders(sliderSqrtNegRes, -6.25, 0, 0.05, 0);
intializeSliders(sliderSqrtNeg, -2.5, 2.5, 0.1, 1);
canvasNumberlineSqrtNeg.canvas.width = 1280;
canvasNumberlineSqrtNeg.canvas.height = 640;
drawNumberLine(canvasNumberlineSqrtNeg, 5, 1275, 65, "#aaa");
drawNumberMark(canvasNumberlineSqrtNeg, 5, 1260, 65, "#aaa");
function drawNumberlineSqrtNeg() {
    drawNumberMark(canvasNumberlineSqrtNeg, 5, 1260, 321, "#aaa");
    drawNumberMark(canvasNumberlineSqrtNeg, 5, 1260, 577, "#aaa");
    drawNumberLine(canvasNumberlineSqrtNeg, 5, 1275, 321);
    drawNumberLine(canvasNumberlineSqrtNeg, 5, 1275, 577);
    drawNumberMark(canvasNumberlineSqrtNeg, 5, 1260, 321, "#000", sliderSqrtNeg.value * 70, 1, undefined, -36);
    drawNumberMark(canvasNumberlineSqrtNeg, 5, 1260, 577, "#000", sliderSqrtNeg.value * sliderSqrtNeg.value * 70, 1, undefined, -36);
    drawLine(canvasNumberlineSqrtNeg, 711, 120, sliderSqrtNeg.value * 70 + 641, 261);
    drawLine(canvasNumberlineSqrtNeg, sliderSqrtNeg.value * 70 + 641, 376, sliderSqrtNeg.value * sliderSqrtNeg.value * 70 + 641, 517);
    canvasNumberlineSqrtNeg.stroke();
    canvasNumberlineSqrtNeg.fillText(Number(sliderSqrtNeg.value).toFixed(2) + "x", 1221, 193);
    canvasNumberlineSqrtNeg.fillText(Number(sliderSqrtNeg.value).toFixed(2) + "x", 1221, 449);
}
drawNumberlineSqrtNeg();
drawTriangle(canvasNumberlineSqrtNeg, sliderSqrtNegRes.value * 70 + 641, 629)
function updateSqrtNegEqual() {
    if (sliderSqrtNeg.value * sliderSqrtNeg.value == sliderSqrtNegRes.value) spanNumberlineSqrtNegEqu.innerHTML = "is";
    else spanNumberlineSqrtNegEqu.innerHTML = "is <b>not</b>";
}
sliderSqrtNeg.addEventListener("input", function() {
    canvasNumberlineSqrtNeg.clearRect(0, 119, 1280, 510);
    drawNumberlineSqrtNeg();
    spanNumberlineSqrtNeg.innerHTML = Number(sliderSqrtNeg.value).toFixed(2);
    updateSqrtNegEqual();
});
sliderSqrtNegRes.addEventListener("input", function() {
    canvasNumberlineSqrtNeg.clearRect(0, 629, 1280, 11);
    drawTriangle(canvasNumberlineSqrtNeg, sliderSqrtNegRes.value * 70 + 641, 629)
    spanNumberlineSqrtNegRes.innerHTML = Number(sliderSqrtNegRes.value).toFixed(2);
    updateSqrtNegEqual();
});

// numberline static
const canvasNumberlineImaginary = document.getElementById("canvasNumberlineImaginary").getContext("2d");
canvasNumberlineImaginary.canvas.width = 1280;
canvasNumberlineImaginary.canvas.height = 334;
drawNumberLine(canvasNumberlineImaginary, 5, 1275, 65);
drawNumberMark(canvasNumberlineImaginary, 5, 1260, 65);
drawNumberLine(canvasNumberlineImaginary, 5, 1275, 271);
drawNumberMark(canvasNumberlineImaginary, 5, 1260, 271);
canvasNumberlineImaginary.stroke();
canvasNumberlineImaginary.textAlign = "right";
canvasNumberlineImaginary.fillText("Real Number Line", 1270, 15);
canvasNumberlineImaginary.fillText("Imaginary Number Line", 1270, 221);

// numberline static
const canvasNumberlineImaginaryAdd = document.getElementById("canvasNumberlineImaginaryAdd").getContext("2d");
canvasNumberlineImaginaryAdd.canvas.width = 1280;
canvasNumberlineImaginaryAdd.canvas.height = 334;
drawNumberLine(canvasNumberlineImaginaryAdd, 5, 1275, 65);
drawNumberMark(canvasNumberlineImaginaryAdd, 5, 1260, 65);
drawNumberLine(canvasNumberlineImaginaryAdd, 5, 1275, 271);
drawNumberMark(canvasNumberlineImaginaryAdd, 5, 1260, 271);
drawLine(canvasNumberlineImaginaryAdd, 615, 185, 665, 185);
drawLine(canvasNumberlineImaginaryAdd, 641, 160, 641, 210);
canvasNumberlineImaginaryAdd.stroke();
canvasNumberlineImaginaryAdd.textAlign = "right";
canvasNumberlineImaginaryAdd.fillText("Real Number Line", 1270, 15);
canvasNumberlineImaginaryAdd.fillText("Imaginary Number Line", 1270, 221);

// numberlines transformation
const canvasNumberlinesTransform = document.getElementById("canvasNumberlinesTransform").getContext("2d");
const sliderTransformAddR = document.getElementById("sliderTransformAddR");
const sliderTransformAddI = document.getElementById("sliderTransformAddI");
const sliderTransformMultiplyR = document.getElementById("sliderTransformMultiplyR");
const sliderTransformMultiplyI = document.getElementById("sliderTransformMultiplyI");
intializeSliders(sliderTransformAddR, -8, 8, 0.05, 0);
intializeSliders(sliderTransformAddI, -8, 8, 0.05, 0);
intializeSliders(sliderTransformMultiplyR, -2, 2, 0.05, 1);
intializeSliders(sliderTransformMultiplyI, -2, 2, 0.05, 1);
canvasNumberlinesTransform.canvas.width = 1280;
canvasNumberlinesTransform.canvas.height = 350;
canvasNumberlinesTransform.font = "25px JetBrains Mono";
canvasNumberlinesTransform.textBaseline = "middle";
function drawNumberlineTransform() {
    canvasNumberlinesTransform.textAlign = "right";
    canvasNumberlinesTransform.fillStyle = "#000";
    canvasNumberlinesTransform.fillText("Real Number Line", 1270, 15);
    canvasNumberlinesTransform.fillText("Imaginary Number Line", 1270, 221);
    drawNumberMark(canvasNumberlinesTransform, 5, 1260, 95, "#aaa");
    drawNumberLine(canvasNumberlinesTransform, 5, 1275, 95, "#37c");
    drawNumberMark(canvasNumberlinesTransform, 5, 1260, 95, "#37c", sliderTransformMultiplyR.value * 70, undefined, sliderTransformAddR.value * 70 + 641, -36);
    drawNumberMark(canvasNumberlinesTransform, 5, 1260, 301, "#aaa");
    drawNumberLine(canvasNumberlinesTransform, 5, 1275, 301, "#a60");
    drawNumberMark(canvasNumberlinesTransform, 5, 1260, 301, "#a60", sliderTransformMultiplyR.value * 70, undefined, sliderTransformAddI.value * 70 + 641, -36);
}
drawNumberlineTransform();
sliderTransformAddR.addEventListener("input", function() {
    canvasNumberlinesTransform.clearRect(0, 0, 1280, 350);
    drawNumberlineTransform();
});
sliderTransformAddI.addEventListener("input", function() {
    canvasNumberlinesTransform.clearRect(0, 0, 1280, 350);
    drawNumberlineTransform();
});
sliderTransformMultiplyR.addEventListener("input", function() {
    canvasNumberlinesTransform.clearRect(0, 0, 1280, 350);
    drawNumberlineTransform();
});
sliderTransformMultiplyI.addEventListener("input", function() {
    canvasNumberlinesTransform.clearRect(0, 0, 1280, 350);
    drawNumberlineTransform();
});



// functions

function drawLine(canvas, x1, y1, x2, y2) {
    canvas.moveTo(x1, y1);
    canvas.lineTo(x2, y2);
}

function drawNumberLine(canvas, x1, x2, y, color = "#000", width = 2) {
    canvas.beginPath();
    canvas.lineWidth = 5;
    canvas.strokeStyle = color;
    drawLine(canvas, x1, y, x2, y);
    drawLine(canvas, x1, y, x1+20, y+20);
    drawLine(canvas, x1, y, x1+20, y-20);
    drawLine(canvas, x2, y, x2-20, y+20);
    drawLine(canvas, x2, y, x2-20, y-20);
    canvas.stroke();
}

function drawNumberMark(canvas, x1, x2, y, color = "#000", gapsMarks = 70, gapsNumber = 1, origin = 641, textOffset = 36, font = "25px JetBrains Mono", width = 2) {
    canvas.lineWidth = width;
    canvas.strokeStyle = color;
    canvas.fillStyle = color;
    canvas.textAlign = "center";
    canvas.textBaseline = "middle";
    canvas.font = font;
    canvas.beginPath();
    var i = 0;
    for (let x = Number(origin); x < (x2 - Math.abs(gapsMarks / 4)); x += Math.abs(gapsMarks)) {
        drawLine(canvas, x, y - 15, x, y + 15);
        if (gapsMarks > 2) canvas.fillText(i, x, y + textOffset);
        else if (gapsMarks < -2) canvas.fillText(-i, x, y + textOffset);
        else break
        i += gapsNumber;
    }
    var i = 0;
    for (let x = origin; x > (x1 + Math.abs(gapsMarks / 4)); x -= Math.abs(gapsMarks)) {
        drawLine(canvas, x, y - 15, x, y + 15);
        if (gapsMarks > 2) canvas.fillText(i, x, y + textOffset);
        else if (gapsMarks < -2) canvas.fillText(-i, x, y + textOffset);
        else break
        i -= gapsNumber;
    }
    canvas.stroke();
}

function drawTriangle(canvas, xOffset, yOffset, size = 10, color = "#000") {
    canvas.beginPath();
    canvas.moveTo(xOffset, yOffset);
    canvas.lineTo(xOffset - size, yOffset + size);
    canvas.lineTo(xOffset + size, yOffset + size);
    canvas.closePath();
    canvas.fillStyle = color;
    canvas.fill();
}

function intializeSliders(slider, minimum, maximum, step, value) {
    slider.min = minimum;
    slider.max = maximum;
    slider.step = step;
    slider.value = value;
}
