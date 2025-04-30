// numberline static
const canvasNumberlineStatic = document.getElementById("canvasNumberlineStatic").getContext("2d");
canvasNumberlineStatic.canvas.width = 1280;
canvasNumberlineStatic.canvas.height = 128;
drawNumberLine(canvasNumberlineStatic, 65);
drawNumberMark(canvasNumberlineStatic, 65);
canvasNumberlineStatic.stroke();

// numberline mapping
const canvasNumberlineMap = document.getElementById("canvasNumberlineMap").getContext("2d");
canvasNumberlineMap.canvas.width = 1280;
canvasNumberlineMap.canvas.height = 384;
drawNumberLine(canvasNumberlineMap, 65, "#aaa");
drawNumberMark(canvasNumberlineMap, 65, "#aaa");
drawNumberMark(canvasNumberlineMap, 321, "#aaa");
drawNumberLine(canvasNumberlineMap, 321);
drawNumberMark(canvasNumberlineMap, 321, "#000", -36, 140, 571);
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
initializeSliders(sliderAdd, -8, 8, 0.05, 0);
canvasNumberlineAdd.canvas.width = 1280;
canvasNumberlineAdd.canvas.height = 384;
drawNumberLine(canvasNumberlineAdd, 65, "#aaa");
drawNumberMark(canvasNumberlineAdd, 65, "#aaa");
function updateNumberlineAdd() {
    canvasNumberlineAdd.clearRect(0, 119, 1280, 265);
    drawNumberLineOverlay(canvasNumberlineAdd, 321, 1, sliderAdd.value);
    drawLine(canvasNumberlineAdd, 641, 120, sliderAdd.value * 70 + 641, 261);
    canvasNumberlineAdd.stroke();
    spanNumberlineAdd.innerHTML = Number(sliderAdd.value).toFixed(2);
}
updateNumberlineAdd();
sliderAdd.addEventListener("input", updateNumberlineAdd);

// number line multiplication
const canvasNumberlineMultiply = document.getElementById("canvasNumberlineMultiply").getContext("2d");
const sliderMultiply = document.getElementById("sliderMultiply");
initializeSliders(sliderMultiply, -6, 6, 0.05, 1);
canvasNumberlineMultiply.canvas.width = 1280;
canvasNumberlineMultiply.canvas.height = 384;
drawNumberLine(canvasNumberlineMultiply, 65, "#aaa");
drawNumberMark(canvasNumberlineMultiply, 65, "#aaa");
function updateNumberlineMultiply() {
    canvasNumberlineMultiply.clearRect(0, 119, 1280, 265);
    drawNumberLineOverlay(canvasNumberlineMultiply, 321, sliderMultiply.value, 0);
    drawLine(canvasNumberlineMultiply, 711, 120, sliderMultiply.value * 70 + 641, 261);
    canvasNumberlineMultiply.stroke();
    spanNumberlineMultiply.innerHTML = Number(sliderMultiply.value).toFixed(2);
}
updateNumberlineMultiply();
sliderMultiply.addEventListener("input", updateNumberlineMultiply);

// numberline square mapping
const canvasNumberlineSquareMap = document.getElementById("canvasNumberlineSquareMap").getContext("2d");
canvasNumberlineSquareMap.canvas.width = 1280;
canvasNumberlineSquareMap.canvas.height = 384;
drawNumberLine(canvasNumberlineSquareMap, 65, "#aaa");
drawNumberMark(canvasNumberlineSquareMap, 65, "#aaa");
drawNumberMark(canvasNumberlineSquareMap, 321, "#aaa");
drawNumberLine(canvasNumberlineSquareMap, 321);
drawNumberMark(canvasNumberlineSquareMap, 640, 750, 321, "#000", -36);
canvasNumberlineSquareMap.moveTo(921, 306)
canvasNumberlineSquareMap.lineTo(921, 336);
canvasNumberlineSquareMap.stroke();
canvasNumberlineSquareMap.fillText("2", 921, 285);
drawLine(canvasNumberlineSquareMap, 641, 120, 641, 261);
drawLine(canvasNumberlineSquareMap, 571, 120, 701, 261);
drawLine(canvasNumberlineSquareMap, 711, 120, 711, 261);
drawLine(canvasNumberlineSquareMap, 501, 120, 901, 261);
drawLine(canvasNumberlineSquareMap, 781, 120, 911, 261);
drawLine(canvasNumberlineSquareMap, 451, 120, 1250, 261);
drawLine(canvasNumberlineSquareMap, 871, 120, 1260, 261);
drawLine(canvasNumberlineSquareMap, 381, 120, 1260, 201);
drawLine(canvasNumberlineSquareMap, 941, 120, 1260, 171);
canvasNumberlineSquareMap.stroke();

// numberline squaring
const canvasNumberlineSquare = document.getElementById("canvasNumberlineSquare").getContext("2d");
const sliderSquare = document.getElementById("sliderSquare");
initializeSliders(sliderSquare, -2.5, 2.5, 0.05, 1);
canvasNumberlineSquare.canvas.width = 1280;
canvasNumberlineSquare.canvas.height = 640;
drawNumberLine(canvasNumberlineSquare, 65, "#aaa");
drawNumberMark(canvasNumberlineSquare, 65, "#aaa");
function updateNumberlineSquare() {
    canvasNumberlineSquare.clearRect(0, 119, 1280, 521);
    drawNumberLineOverlay(canvasNumberlineSquare, 321, sliderSquare.value, 0);
    drawNumberLineOverlay(canvasNumberlineSquare, 577, sliderSquare.value * sliderSquare.value, 0);
    drawLine(canvasNumberlineSquare, 711, 120, sliderSquare.value * 70 + 641, 261);
    drawLine(canvasNumberlineSquare, sliderSquare.value * 70 + 641, 376, sliderSquare.value * sliderSquare.value * 70 + 641, 517);
    canvasNumberlineSquare.stroke();
    canvasNumberlineSquare.fillText(Number(sliderSquare.value).toFixed(2) + "x", 1221, 193);
    canvasNumberlineSquare.fillText(Number(sliderSquare.value).toFixed(2) + "x", 1221, 449);
    spanNumberlineSquare.innerHTML = Number(sliderSquare.value).toFixed(2);
    spanNumberlineSquareRes.innerHTML = (sliderSquare.value * sliderSquare.value).toFixed(2);
}
updateNumberlineSquare();
sliderSquare.addEventListener("input", updateNumberlineSquare);

// numberline square root
const canvasNumberlineSqrt = document.getElementById("canvasNumberlineSqrt").getContext("2d");
const sliderSqrt = document.getElementById("sliderSqrt");
const sliderSqrtRes = document.getElementById("sliderSqrtRes");
initializeSliders(sliderSqrtRes, 0, 6.25, 0.05, 1);
initializeSliders(sliderSqrt, -2.5, 2.5, 0.1, 1);
canvasNumberlineSqrt.canvas.width = 1280;
canvasNumberlineSqrt.canvas.height = 640;
drawNumberLine(canvasNumberlineSqrt, 65, "#aaa");
drawNumberMark(canvasNumberlineSqrt, 65, "#aaa");
function updateNumberlineSqrt() {
    canvasNumberlineSqrt.clearRect(0, 119, 1280, 510);
    drawNumberLineOverlay(canvasNumberlineSqrt, 321, sliderSqrt.value, 0);
    drawNumberLineOverlay(canvasNumberlineSqrt, 577, sliderSqrt.value * sliderSqrt.value, 0);
    drawLine(canvasNumberlineSqrt, 711, 120, sliderSqrt.value * 70 + 641, 261);
    drawLine(canvasNumberlineSqrt, sliderSqrt.value * 70 + 641, 376, sliderSqrt.value * sliderSqrt.value * 70 + 641, 517);
    canvasNumberlineSqrt.stroke();
    canvasNumberlineSqrt.fillText(Number(sliderSqrt.value).toFixed(2) + "x", 1221, 193);
    canvasNumberlineSqrt.fillText(Number(sliderSqrt.value).toFixed(2) + "x", 1221, 449);
    spanNumberlineSqrt.innerHTML = Number(sliderSqrt.value).toFixed(2);
    updateNumberlineSqrtText();
}
function updateNumberlineSqrtTrig() {
    canvasNumberlineSqrt.clearRect(0, 629, 1280, 11);
    drawTriangle(canvasNumberlineSqrt, sliderSqrtRes.value * 70 + 641, 629)
    spanNumberlineSqrtRes.innerHTML = Number(sliderSqrtRes.value).toFixed(2);
    updateNumberlineSqrtText();
}
function updateNumberlineSqrtText() {
    if (sliderSqrt.value * sliderSqrt.value == sliderSqrtRes.value) spanNumberlineSqrtEqu.innerHTML = "is";
    else spanNumberlineSqrtEqu.innerHTML = "is <b>not</b>";
}
updateNumberlineSqrt();
updateNumberlineSqrtTrig();
sliderSqrt.addEventListener("input", updateNumberlineSqrt);
sliderSqrtRes.addEventListener("input", updateNumberlineSqrtTrig);

// numberline square root negative
const canvasNumberlineSqrtNeg = document.getElementById("canvasNumberlineSqrtNeg").getContext("2d");
const sliderSqrtNeg = document.getElementById("sliderSqrtNeg");
const sliderSqrtNegRes = document.getElementById("sliderSqrtNegRes");
initializeSliders(sliderSqrtNegRes, -6.25, 0, 0.05, 0);
initializeSliders(sliderSqrtNeg, -2.5, 2.5, 0.1, 1);
canvasNumberlineSqrtNeg.canvas.width = 1280;
canvasNumberlineSqrtNeg.canvas.height = 640;
drawNumberLine(canvasNumberlineSqrtNeg, 65, "#aaa");
drawNumberMark(canvasNumberlineSqrtNeg, 65, "#aaa");
function updateNumberlineSqrtNeg() {
    canvasNumberlineSqrtNeg.clearRect(0, 119, 1280, 510);
    drawNumberLineOverlay(canvasNumberlineSqrtNeg, 321, sliderSqrtNeg.value, 0);
    drawNumberLineOverlay(canvasNumberlineSqrtNeg, 577, sliderSqrtNeg.value * sliderSqrtNeg.value, 0);
    drawLine(canvasNumberlineSqrtNeg, 711, 120, sliderSqrtNeg.value * 70 + 641, 261);
    drawLine(canvasNumberlineSqrtNeg, sliderSqrtNeg.value * 70 + 641, 376, sliderSqrtNeg.value * sliderSqrtNeg.value * 70 + 641, 517);
    canvasNumberlineSqrtNeg.stroke();
    canvasNumberlineSqrtNeg.fillText(Number(sliderSqrtNeg.value).toFixed(2) + "x", 1221, 193);
    canvasNumberlineSqrtNeg.fillText(Number(sliderSqrtNeg.value).toFixed(2) + "x", 1221, 449);
    spanNumberlineSqrtNeg.innerHTML = Number(sliderSqrtNeg.value).toFixed(2);
    updateNumberlineSqrtNegText();
}
function updateNumberlineSqrtNegTrig() {
    canvasNumberlineSqrtNeg.clearRect(0, 629, 1280, 11);
    drawTriangle(canvasNumberlineSqrtNeg, sliderSqrtNegRes.value * 70 + 641, 629)
    spanNumberlineSqrtNegRes.innerHTML = Number(sliderSqrtNegRes.value).toFixed(2);
    updateNumberlineSqrtNegText();
}
function updateNumberlineSqrtNegText() {
    if (sliderSqrtNeg.value * sliderSqrtNeg.value == sliderSqrtNegRes.value) spanNumberlineSqrtNegEqu.innerHTML = "is";
    else spanNumberlineSqrtNegEqu.innerHTML = "is <b>not</b>";
}
updateNumberlineSqrtNeg();
updateNumberlineSqrtNegTrig();
sliderSqrtNeg.addEventListener("input", updateNumberlineSqrtNeg);
sliderSqrtNegRes.addEventListener("input", updateNumberlineSqrtNegTrig);

// numberline imaginary static
const canvasNumberlineImaginary = document.getElementById("canvasNumberlineImaginary").getContext("2d");
canvasNumberlineImaginary.canvas.width = 1280;
canvasNumberlineImaginary.canvas.height = 334;
drawNumberLine(canvasNumberlineImaginary, 65);
drawNumberMark(canvasNumberlineImaginary, 65);
drawNumberLine(canvasNumberlineImaginary, 271);
drawNumberMark(canvasNumberlineImaginary, 271);
canvasNumberlineImaginary.stroke();
canvasNumberlineImaginary.textAlign = "right";
canvasNumberlineImaginary.fillText("Real Number Line", 1270, 15);
canvasNumberlineImaginary.fillText("Imaginary Number Line", 1270, 221);

// numberlines transformation
const canvasNumberlinesTransform = document.getElementById("canvasNumberlinesTransform").getContext("2d");
const sliderTransformAddR = document.getElementById("sliderTransformAddR");
const sliderTransformAddI = document.getElementById("sliderTransformAddI");
const sliderTransformMultiplyR = document.getElementById("sliderTransformMultiplyR");
const buttonTransformMultiplyI = document.getElementById("buttonTransformMultiplyI");
initializeSliders(sliderTransformAddR, -8, 8, 0.05, 0);
initializeSliders(sliderTransformAddI, -8, 8, 0.05, 0);
initializeSliders(sliderTransformMultiplyR, -2, 2, 0.05, 1);
canvasNumberlinesTransform.canvas.width = 1280;
canvasNumberlinesTransform.canvas.height = 370;
canvasNumberlinesTransform.font = "25px JetBrains Mono";
canvasNumberlinesTransform.textBaseline = "middle";
canvasNumberlinesTransform.textAlign = "right";
canvasNumberlinesTransform.fillStyle = "#000";
canvasNumberlinesTransform.fillText("Real Number Line", 1270, 15);
canvasNumberlinesTransform.fillText("Imaginary Number Line", 1270, 221);
function updateNumberlineTransform() {
    canvasNumberlinesTransform.clearRect(0, 24, 1280, 150);
    canvasNumberlinesTransform.clearRect(0, 235, 1280, 356);
    drawNumberLineOverlay(canvasNumberlinesTransform, 95, sliderTransformMultiplyR.value, sliderTransformAddR.value * sliderTransformMultiplyR.value);
    drawNumberLineOverlay(canvasNumberlinesTransform, 301, sliderTransformMultiplyR.value, sliderTransformAddI.value * sliderTransformMultiplyR.value);
    drawTriangle(canvasNumberlinesTransform, sliderTransformMultiplyR.value * sliderTransformAddR.value * 70 + 641, 154);
    drawTriangle(canvasNumberlinesTransform, sliderTransformMultiplyR.value * sliderTransformAddI.value * 70 + 641, 360);
    spanTransformAddR.innerHTML = Number(sliderTransformAddR.value).toFixed(2);
    spanTransformAddI.innerHTML = Number(sliderTransformAddI.value).toFixed(2);
    spanTransformMultiplyR.innerHTML = Number(sliderTransformMultiplyR.value).toFixed(2);
    spanTransformNumber.innerHTML = getComplexNum(sliderTransformMultiplyR.value * sliderTransformAddR.value, sliderTransformMultiplyR.value * sliderTransformAddI.value);
}
updateNumberlineTransform();
sliderTransformAddR.addEventListener("input", updateNumberlineTransform);
sliderTransformAddI.addEventListener("input", updateNumberlineTransform);
sliderTransformMultiplyR.addEventListener("input", updateNumberlineTransform);
buttonTransformMultiplyI.addEventListener("click", function() {
    var temp_R = sliderTransformAddR.value;
    sliderTransformAddR.value = sliderTransformAddI.value * -1;
    sliderTransformAddI.value = temp_R;
    updateNumberlineTransform();
});

// cartesian plane transformation
const canvasPlaneCartesian = document.getElementById("canvasPlaneCartesian").getContext("2d");
const canvasPlaneCartesianLine = document.getElementById("canvasPlaneCartesianLine").getContext("2d");
const canvasComplexLinesMultiply = document.getElementById("canvasComplexLinesMultiply").getContext("2d");
const sliderPlaneCartesianX = document.getElementById("sliderPlaneCartesianX");
const sliderPlaneCartesianY = document.getElementById("sliderPlaneCartesianY");
const buttonPlaneCartesianRotate = document.getElementById("buttonPlaneCartesianRotate");
const buttonComplexLinesMultiply = document.getElementById("buttonComplexLinesMultiply");
initializeSliders(sliderPlaneCartesianX, -4, 4, 0.05, 3);
initializeSliders(sliderPlaneCartesianY, -4, 4, 0.05, 0);
canvasPlaneCartesian.canvas.width = 1280;
canvasPlaneCartesian.canvas.height = 640;
canvasPlaneCartesianLine.canvas.width = 1280;
canvasPlaneCartesianLine.canvas.height = 350;
canvasComplexLinesMultiply.canvas.width = 1280;
canvasComplexLinesMultiply.canvas.height = 350;
canvasPlaneCartesianLine.font = "25px JetBrains Mono";
canvasPlaneCartesianLine.textBaseline = "middle";
canvasPlaneCartesianLine.textAlign = "right";
canvasPlaneCartesianLine.fillStyle = "#000";
canvasPlaneCartesianLine.fillText("X", 1270, 25);
canvasPlaneCartesianLine.fillText("Y", 1270, 201);
canvasComplexLinesMultiply.font = "25px JetBrains Mono";
canvasComplexLinesMultiply.textBaseline = "middle";
canvasComplexLinesMultiply.textAlign = "right";
canvasComplexLinesMultiply.fillStyle = "#000";
canvasComplexLinesMultiply.fillText("Real", 1270, 25);
canvasComplexLinesMultiply.fillText("Imaginary", 1270, 201);
function updatePlaneCartesian() {
    canvasPlaneCartesianLine.clearRect(0, 35, 1280, 150);
    canvasPlaneCartesianLine.clearRect(0, 215, 1280, 356);
    drawNumberLineOverlay(canvasPlaneCartesianLine, 109, 1, sliderPlaneCartesianX.value);
    drawNumberLineOverlay(canvasPlaneCartesianLine, 281, 1, sliderPlaneCartesianY.value);
    drawTriangle(canvasPlaneCartesianLine, sliderPlaneCartesianX.value * 70 + 641, 160);
    drawTriangle(canvasPlaneCartesianLine, sliderPlaneCartesianY.value * 70 + 641, 336);
    canvasPlaneCartesian.clearRect(0, 0, 1280, 640);
    drawGridOverlay(canvasPlaneCartesian, Number(sliderPlaneCartesianX.value), Number(sliderPlaneCartesianY.value), 1, 0);
    spanPlaneCartesianX.innerHTML = Number(sliderPlaneCartesianX.value).toFixed(2);
    spanPlaneCartesianY.innerHTML = Number(sliderPlaneCartesianY.value).toFixed(2);
    spanPlaneCartesianNumber.innerHTML = Number(sliderPlaneCartesianX.value).toFixed(2) + ", " + Number(sliderPlaneCartesianY.value).toFixed(2);
    updateComplexLinesMultiply();
}
function updatePlaneCartesianRotate() {
    var temp_X = sliderPlaneCartesianX.value;
    sliderPlaneCartesianX.value = sliderPlaneCartesianY.value * -1;
    sliderPlaneCartesianY.value = temp_X;
    updatePlaneCartesian();
    updateComplexLinesMultiply();
}
function updateComplexLinesMultiply() {
    canvasComplexLinesMultiply.clearRect(0, 35, 1280, 150);
    canvasComplexLinesMultiply.clearRect(0, 215, 1280, 356);
    drawNumberLineOverlay(canvasComplexLinesMultiply, 109, 1, sliderPlaneCartesianX.value);
    drawNumberLineOverlay(canvasComplexLinesMultiply, 281, 1, sliderPlaneCartesianY.value);
    drawTriangle(canvasComplexLinesMultiply, sliderPlaneCartesianX.value * 70 + 641, 160);
    drawTriangle(canvasComplexLinesMultiply, sliderPlaneCartesianY.value * 70 + 641, 336);
}
updatePlaneCartesian();
sliderPlaneCartesianX.addEventListener("input", updatePlaneCartesian);
sliderPlaneCartesianY.addEventListener("input", updatePlaneCartesian);
buttonPlaneCartesianRotate.addEventListener("click", updatePlaneCartesianRotate);
buttonComplexLinesMultiply.addEventListener("click", updatePlaneCartesianRotate);

// complex plane transformation
const canvasPlaneComplex = document.getElementById("canvasPlaneComplex").getContext("2d");
const canvasPlaneComplexLine = document.getElementById("canvasPlaneComplexLine").getContext("2d");
const sliderPlaneComplexR = document.getElementById("sliderPlaneComplexR");
const sliderPlaneComplexI = document.getElementById("sliderPlaneComplexI");
const sliderPlaneComplexM = document.getElementById("sliderPlaneComplexM");
const buttonPlaneComplexRotate = document.getElementById("buttonPlaneComplexRotate");
initializeSliders(sliderPlaneComplexR, -4, 4, 0.05, 3);
initializeSliders(sliderPlaneComplexI, -4, 4, 0.05, 0);
initializeSliders(sliderPlaneComplexM, -2, 2, 0.05, 1);
canvasPlaneComplex.canvas.width = 1280;
canvasPlaneComplex.canvas.height = 640;
canvasPlaneComplexLine.canvas.width = 1280;
canvasPlaneComplexLine.canvas.height = 350;
canvasPlaneComplexLine.font = "25px JetBrains Mono";
canvasPlaneComplexLine.textBaseline = "middle";
canvasPlaneComplexLine.textAlign = "right";
canvasPlaneComplexLine.fillStyle = "#000";
canvasPlaneComplexLine.fillText("Real", 1270, 25);
canvasPlaneComplexLine.fillText("Imaginary", 1270, 201);
function updatePlaneComplex() {
    canvasPlaneComplexLine.clearRect(0, 35, 1280, 150);
    canvasPlaneComplexLine.clearRect(0, 215, 1280, 356);
    drawNumberLineOverlay(canvasPlaneComplexLine, 109, sliderPlaneComplexM.value, sliderPlaneComplexM.value * sliderPlaneComplexR.value);
    drawNumberLineOverlay(canvasPlaneComplexLine, 281, sliderPlaneComplexM.value, sliderPlaneComplexM.value * sliderPlaneComplexI.value);
    drawTriangle(canvasPlaneComplexLine, sliderPlaneComplexM.value * sliderPlaneComplexR.value * 70 + 641, 160);
    drawTriangle(canvasPlaneComplexLine, sliderPlaneComplexM.value * sliderPlaneComplexI.value * 70 + 641, 336);
    canvasPlaneComplex.clearRect(0, 0, 1280, 640);
    drawGridOverlay(canvasPlaneComplex, Number(sliderPlaneComplexR.value), Number(sliderPlaneComplexI.value), sliderPlaneComplexM.value, 0);
    spanPlaneComplexR.innerHTML = Number(sliderPlaneComplexR.value).toFixed(2);
    spanPlaneComplexI.innerHTML = Number(sliderPlaneComplexI.value).toFixed(2);
    spanPlaneComplexM.innerHTML = Number(sliderPlaneComplexM.value).toFixed(2);
    spanPlaneComplexNumber.innerHTML = getComplexNum(sliderPlaneComplexM.value * sliderPlaneComplexR.value, sliderPlaneComplexM.value * sliderPlaneComplexI.value);
}
function updatePlaneComplexRotate() {
    var temp_X = sliderPlaneComplexR.value;
    sliderPlaneComplexR.value = sliderPlaneComplexI.value * -1;
    sliderPlaneComplexI.value = temp_X;
    updatePlaneComplex();
}
updatePlaneComplex();
sliderPlaneComplexR.addEventListener("input", updatePlaneComplex);
sliderPlaneComplexI.addEventListener("input", updatePlaneComplex);
sliderPlaneComplexM.addEventListener("input", updatePlaneComplex);
buttonPlaneComplexRotate.addEventListener("click", updatePlaneComplexRotate);

// complex plane multiplication negative one
const canvasPlaneComplexNegOne = document.getElementById("canvasPlaneComplexNegOne").getContext("2d");
const canvasPlaneComplexNegOneLine = document.getElementById("canvasPlaneComplexNegOneLine").getContext("2d");
const sliderPlaneComplexNegOneR = document.getElementById("sliderPlaneComplexNegOneR");
const sliderPlaneComplexNegOneI = document.getElementById("sliderPlaneComplexNegOneI");
const sliderPlaneComplexNegOneM = document.getElementById("sliderPlaneComplexNegOneM");
const buttonPlaneComplexNegOneMO = document.getElementById("buttonPlaneComplexNegOneMO");
const buttonPlaneComplexNegOneMI = document.getElementById("buttonPlaneComplexNegOneMI");
initializeSliders(sliderPlaneComplexNegOneR, -4, 4, 0.05, 3);
initializeSliders(sliderPlaneComplexNegOneI, -4, 4, 0.05, 0);
initializeSliders(sliderPlaneComplexNegOneM, -2, 2, 0.05, 1);
canvasPlaneComplexNegOne.canvas.width = 1280;
canvasPlaneComplexNegOne.canvas.height = 640;
canvasPlaneComplexNegOneLine.canvas.width = 1280;
canvasPlaneComplexNegOneLine.canvas.height = 350;
canvasPlaneComplexNegOneLine.font = "25px JetBrains Mono";
canvasPlaneComplexNegOneLine.textBaseline = "middle";
canvasPlaneComplexNegOneLine.textAlign = "right";
canvasPlaneComplexNegOneLine.fillStyle = "#000";
canvasPlaneComplexNegOneLine.fillText("Real", 1270, 25);
canvasPlaneComplexNegOneLine.fillText("Imaginary", 1270, 201);
function updatePlaneComplexNegOne() {
    canvasPlaneComplexNegOneLine.clearRect(0, 35, 1280, 150);
    canvasPlaneComplexNegOneLine.clearRect(0, 215, 1280, 356);
    drawNumberLineOverlay(canvasPlaneComplexNegOneLine, 109, sliderPlaneComplexNegOneM.value, sliderPlaneComplexNegOneM.value * sliderPlaneComplexNegOneR.value);
    drawNumberLineOverlay(canvasPlaneComplexNegOneLine, 281, sliderPlaneComplexNegOneM.value, sliderPlaneComplexNegOneM.value * sliderPlaneComplexNegOneI.value);
    drawTriangle(canvasPlaneComplexNegOneLine, sliderPlaneComplexNegOneM.value * sliderPlaneComplexNegOneR.value * 70 + 641, 160);
    drawTriangle(canvasPlaneComplexNegOneLine, sliderPlaneComplexNegOneM.value * sliderPlaneComplexNegOneI.value * 70 + 641, 336);
    canvasPlaneComplexNegOne.clearRect(0, 0, 1280, 640);
    drawGridOverlay(canvasPlaneComplexNegOne, Number(sliderPlaneComplexNegOneR.value), Number(sliderPlaneComplexNegOneI.value), sliderPlaneComplexNegOneM.value, 0);
    spanPlaneComplexNegOneR.innerHTML = Number(sliderPlaneComplexNegOneR.value).toFixed(2);
    spanPlaneComplexNegOneI.innerHTML = Number(sliderPlaneComplexNegOneI.value).toFixed(2);
    spanPlaneComplexNegOneM.innerHTML = Number(sliderPlaneComplexNegOneM.value).toFixed(2);
    spanPlaneComplexNegOneNumber.innerHTML = getComplexNum(sliderPlaneComplexNegOneM.value * sliderPlaneComplexNegOneR.value, sliderPlaneComplexNegOneM.value * sliderPlaneComplexNegOneI.value);
}
function updatePlaneComplexNegOneMultiplyOne() {
    sliderPlaneComplexNegOneR.value *= -1;
    sliderPlaneComplexNegOneI.value *= -1;
    updatePlaneComplexNegOne();
}
async function updatePlaneComplexNegOneMultiplyImg() {
    for (let i = 0; i < 2; i++) {
        var temp_X = sliderPlaneComplexNegOneR.value;
        sliderPlaneComplexNegOneR.value = sliderPlaneComplexNegOneI.value * -1;
        sliderPlaneComplexNegOneI.value = temp_X;
        updatePlaneComplexNegOne();
        await new Promise(resolve => setTimeout(resolve, 700));
    }
}
updatePlaneComplexNegOne();
sliderPlaneComplexNegOneR.addEventListener("input", updatePlaneComplexNegOne);
sliderPlaneComplexNegOneI.addEventListener("input", updatePlaneComplexNegOne);
sliderPlaneComplexNegOneM.addEventListener("input", updatePlaneComplexNegOne);
buttonPlaneComplexNegOneMO.addEventListener("click", updatePlaneComplexNegOneMultiplyOne);
buttonPlaneComplexNegOneMI.addEventListener("click", updatePlaneComplexNegOneMultiplyImg);

// complex plane transformation 45 deg
const canvasPlaneComplexHalf = document.getElementById("canvasPlaneComplexHalf").getContext("2d");
const canvasPlaneComplexHalfLine = document.getElementById("canvasPlaneComplexHalfLine").getContext("2d");
const sliderPlaneComplexHalfR = document.getElementById("sliderPlaneComplexHalfR");
const sliderPlaneComplexHalfI = document.getElementById("sliderPlaneComplexHalfI");
const sliderPlaneComplexHalfM = document.getElementById("sliderPlaneComplexHalfM");
const buttonPlaneComplexHalfRotate = document.getElementById("buttonPlaneComplexHalfRotate");
initializeSliders(sliderPlaneComplexHalfR, -4, 4, 0.05, 2);
initializeSliders(sliderPlaneComplexHalfI, -4, 4, 0.05, 0);
initializeSliders(sliderPlaneComplexHalfM, -2, 2, 0.05, 1);
canvasPlaneComplexHalf.canvas.width = 1280;
canvasPlaneComplexHalf.canvas.height = 640;
canvasPlaneComplexHalfLine.canvas.width = 1280;
canvasPlaneComplexHalfLine.canvas.height = 350;
canvasPlaneComplexHalfLine.font = "25px JetBrains Mono";
canvasPlaneComplexHalfLine.textBaseline = "middle";
canvasPlaneComplexHalfLine.textAlign = "right";
canvasPlaneComplexHalfLine.fillStyle = "#000";
canvasPlaneComplexHalfLine.fillText("Real", 1270, 25);
canvasPlaneComplexHalfLine.fillText("Imaginary", 1270, 201);
function updatePlaneComplexHalf() {
    canvasPlaneComplexHalfLine.clearRect(0, 35, 1280, 150);
    canvasPlaneComplexHalfLine.clearRect(0, 215, 1280, 356);
    drawNumberLineOverlay(canvasPlaneComplexHalfLine, 109, sliderPlaneComplexHalfM.value, sliderPlaneComplexHalfM.value * sliderPlaneComplexHalfR.value);
    drawNumberLineOverlay(canvasPlaneComplexHalfLine, 281, sliderPlaneComplexHalfM.value, sliderPlaneComplexHalfM.value * sliderPlaneComplexHalfI.value);
    drawTriangle(canvasPlaneComplexHalfLine, sliderPlaneComplexHalfM.value * sliderPlaneComplexHalfR.value * 70 + 641, 160);
    drawTriangle(canvasPlaneComplexHalfLine, sliderPlaneComplexHalfM.value * sliderPlaneComplexHalfI.value * 70 + 641, 336);
    canvasPlaneComplexHalf.clearRect(0, 0, 1280, 640);
    drawGridOverlay(canvasPlaneComplexHalf, Number(sliderPlaneComplexHalfR.value), Number(sliderPlaneComplexHalfI.value), sliderPlaneComplexHalfM.value, 0);
    spanPlaneComplexHalfR.innerHTML = Number(sliderPlaneComplexHalfR.value).toFixed(2);
    spanPlaneComplexHalfI.innerHTML = Number(sliderPlaneComplexHalfI.value).toFixed(2);
    spanPlaneComplexHalfM.innerHTML = Number(sliderPlaneComplexHalfM.value).toFixed(2);
    spanPlaneComplexHalfNumber.innerHTML = getComplexNum(sliderPlaneComplexHalfM.value * sliderPlaneComplexHalfR.value, sliderPlaneComplexHalfM.value * sliderPlaneComplexHalfI.value);
}
function updatePlaneComplexHalfRotate() {
    var temp_X = sliderPlaneComplexHalfR.value;
    sliderPlaneComplexHalfR.value = getReal(sliderPlaneComplexHalfR.value, sliderPlaneComplexHalfI.value, 0.7071, 0.70711);
    sliderPlaneComplexHalfI.value = getImag(temp_X, sliderPlaneComplexHalfI.value, 0.7071, 0.70711);
    updatePlaneComplexHalf();
}
updatePlaneComplexHalf();
sliderPlaneComplexHalfR.addEventListener("input", updatePlaneComplexHalf);
sliderPlaneComplexHalfI.addEventListener("input", updatePlaneComplexHalf);
sliderPlaneComplexHalfM.addEventListener("input", updatePlaneComplexHalf);
buttonPlaneComplexHalfRotate.addEventListener("click", updatePlaneComplexHalfRotate);

// complex plane transformation unit circle
const canvasPlaneComplexUnit = document.getElementById("canvasPlaneComplexUnit").getContext("2d");
const canvasPlaneComplexUnitLine = document.getElementById("canvasPlaneComplexUnitLine").getContext("2d");
const sliderPlaneComplexUnitR = document.getElementById("sliderPlaneComplexUnitR");
const sliderPlaneComplexUnitI = document.getElementById("sliderPlaneComplexUnitI");
const sliderPlaneComplexUnitA = document.getElementById("sliderPlaneComplexUnitA");
var varPlaneComplexUnitR = 0;
var varPlaneComplexUnitI = 0;
var varPlaneComplexUnitX;
var varPlaneComplexUnitY;
var varPlaneComplexUnitNum;
initializeSliders(sliderPlaneComplexUnitR, -4, 4, 0.05, 2);
initializeSliders(sliderPlaneComplexUnitI, -4, 4, 0.05, 0);
initializeSliders(sliderPlaneComplexUnitA, -3.14, 3.14, 0.01, 0);
canvasPlaneComplexUnit.canvas.width = 1280;
canvasPlaneComplexUnit.canvas.height = 640;
canvasPlaneComplexUnitLine.canvas.width = 1280;
canvasPlaneComplexUnitLine.canvas.height = 350;
canvasPlaneComplexUnitLine.font = "25px JetBrains Mono";
canvasPlaneComplexUnitLine.textBaseline = "middle";
canvasPlaneComplexUnitLine.textAlign = "right";
canvasPlaneComplexUnitLine.fillStyle = "#000";
canvasPlaneComplexUnitLine.fillText("Real", 1270, 25);
canvasPlaneComplexUnitLine.fillText("Imaginary", 1270, 201);
function updatePlaneComplexUnit() {
    canvasPlaneComplexUnitLine.clearRect(0, 35, 1280, 150);
    canvasPlaneComplexUnitLine.clearRect(0, 215, 1280, 356);
    canvasPlaneComplexUnit.clearRect(0, 0, 1280, 640);
    varPlaneComplexUnitI = Math.sin(sliderPlaneComplexUnitA.value);
    varPlaneComplexUnitR = Math.cos(sliderPlaneComplexUnitA.value);
    varPlaneComplexUnitX = getReal(varPlaneComplexUnitR, varPlaneComplexUnitI, sliderPlaneComplexUnitR.value, sliderPlaneComplexUnitI.value);
    varPlaneComplexUnitY = getImag(varPlaneComplexUnitR, varPlaneComplexUnitI, sliderPlaneComplexUnitR.value, sliderPlaneComplexUnitI.value);
    varPlaneComplexUnitNum = getComplexNum(varPlaneComplexUnitR, varPlaneComplexUnitI);
    drawNumberLineOverlay(canvasPlaneComplexUnitLine, 109, 1, varPlaneComplexUnitX);
    drawNumberLineOverlay(canvasPlaneComplexUnitLine, 281, 1, varPlaneComplexUnitY);
    drawTriangle(canvasPlaneComplexUnitLine, varPlaneComplexUnitX * 70 + 641, 160);
    drawTriangle(canvasPlaneComplexUnitLine, varPlaneComplexUnitY * 70 + 641, 336);
    drawGridOverlay(canvasPlaneComplexUnit, varPlaneComplexUnitX, varPlaneComplexUnitY, 1, 0);
    spanPlaneComplexUnitR.innerHTML = Number(sliderPlaneComplexUnitR.value).toFixed(2);
    spanPlaneComplexUnitI.innerHTML = Number(sliderPlaneComplexUnitI.value).toFixed(2);
    spanPlaneComplexUnitA.innerHTML = varPlaneComplexUnitNum;
    spanPlaneComplexUnitNums.innerHTML = "(" + getComplexNum(Number(sliderPlaneComplexUnitR.value), Number(sliderPlaneComplexUnitI.value)) + ") · (" + getComplexNum(varPlaneComplexUnitR, varPlaneComplexUnitI) +")";
    spanPlaneComplexUnitNumber.innerHTML = getComplexNum(varPlaneComplexUnitX, varPlaneComplexUnitY);
}
updatePlaneComplexUnit();
sliderPlaneComplexUnitR.addEventListener("input", updatePlaneComplexUnit);
sliderPlaneComplexUnitI.addEventListener("input", updatePlaneComplexUnit);
sliderPlaneComplexUnitA.addEventListener("input", updatePlaneComplexUnit);

// complex plane transformation unit circle + magnitude
const canvasPlaneComplexMag = document.getElementById("canvasPlaneComplexMag").getContext("2d");
const canvasPlaneComplexMagLine = document.getElementById("canvasPlaneComplexMagLine").getContext("2d");
const sliderPlaneComplexMagR = document.getElementById("sliderPlaneComplexMagR");
const sliderPlaneComplexMagI = document.getElementById("sliderPlaneComplexMagI");
const sliderPlaneComplexMagA = document.getElementById("sliderPlaneComplexMagA");
const sliderPlaneComplexMagM = document.getElementById("sliderPlaneComplexMagM");
var varPlaneComplexMagR = 0;
var varPlaneComplexMagI = 0;
var varPlaneComplexMagX;
var varPlaneComplexMagY;
var varPlaneComplexMagNum;
initializeSliders(sliderPlaneComplexMagR, -4, 4, 0.05, 2);
initializeSliders(sliderPlaneComplexMagI, -4, 4, 0.05, 0);
initializeSliders(sliderPlaneComplexMagA, -3.14, 3.14, 0.01, 0);
initializeSliders(sliderPlaneComplexMagM, -2, 2, 0.05, 1);
canvasPlaneComplexMag.canvas.width = 1280;
canvasPlaneComplexMag.canvas.height = 640;
canvasPlaneComplexMagLine.canvas.width = 1280;
canvasPlaneComplexMagLine.canvas.height = 350;
canvasPlaneComplexMagLine.font = "25px JetBrains Mono";
canvasPlaneComplexMagLine.textBaseline = "middle";
canvasPlaneComplexMagLine.textAlign = "right";
canvasPlaneComplexMagLine.fillStyle = "#000";
canvasPlaneComplexMagLine.fillText("Real", 1270, 25);
canvasPlaneComplexMagLine.fillText("Imaginary", 1270, 201);
function updatePlaneComplexMag() {
    canvasPlaneComplexMagLine.clearRect(0, 35, 1280, 150);
    canvasPlaneComplexMagLine.clearRect(0, 215, 1280, 356);
    canvasPlaneComplexMag.clearRect(0, 0, 1280, 640);
    varPlaneComplexMagI = Math.sin(sliderPlaneComplexMagA.value);
    varPlaneComplexMagR = Math.cos(sliderPlaneComplexMagA.value);
    varPlaneComplexMagX = getReal(varPlaneComplexMagR, varPlaneComplexMagI, sliderPlaneComplexMagR.value, sliderPlaneComplexMagI.value);
    varPlaneComplexMagY = getImag(varPlaneComplexMagR, varPlaneComplexMagI, sliderPlaneComplexMagR.value, sliderPlaneComplexMagI.value);
    varPlaneComplexMagNum = getComplexNum(varPlaneComplexMagR, varPlaneComplexMagI);
    drawNumberLineOverlay(canvasPlaneComplexMagLine, 109, sliderPlaneComplexMagM.value, sliderPlaneComplexMagM.value * varPlaneComplexMagX);
    drawNumberLineOverlay(canvasPlaneComplexMagLine, 281, sliderPlaneComplexMagM.value, sliderPlaneComplexMagM.value * varPlaneComplexMagY);
    drawTriangle(canvasPlaneComplexMagLine, sliderPlaneComplexMagM.value * varPlaneComplexMagX * 70 + 641, 160);
    drawTriangle(canvasPlaneComplexMagLine, sliderPlaneComplexMagM.value * varPlaneComplexMagY * 70 + 641, 336);
    drawGridOverlay(canvasPlaneComplexMag, varPlaneComplexMagX, varPlaneComplexMagY, sliderPlaneComplexMagM.value, 0);
    spanPlaneComplexMagR.innerHTML = Number(sliderPlaneComplexMagR.value).toFixed(2);
    spanPlaneComplexMagI.innerHTML = Number(sliderPlaneComplexMagI.value).toFixed(2);
    spanPlaneComplexMagM.innerHTML = Number(sliderPlaneComplexMagM.value).toFixed(2);
    spanPlaneComplexMagA.innerHTML = varPlaneComplexMagNum;
    spanPlaneComplexMagNums.innerHTML = "(" + getComplexNum(Number(sliderPlaneComplexMagR.value), Number(sliderPlaneComplexMagI.value)) + ") · ((" + getComplexNum(varPlaneComplexMagR, varPlaneComplexMagI) +")·(" + Number(sliderPlaneComplexMagM.value).toFixed(2) + "))";
    spanPlaneComplexMagNumber.innerHTML = getComplexNum(varPlaneComplexMagX * sliderPlaneComplexMagM.value, varPlaneComplexMagY * sliderPlaneComplexMagM.value);
}
updatePlaneComplexMag();
sliderPlaneComplexMagR.addEventListener("input", updatePlaneComplexMag);
sliderPlaneComplexMagI.addEventListener("input", updatePlaneComplexMag);
sliderPlaneComplexMagA.addEventListener("input", updatePlaneComplexMag);
sliderPlaneComplexMagM.addEventListener("input", updatePlaneComplexMag);

// complex plane rotation transformation
const canvasPlaneComplexAll = document.getElementById("canvasPlaneComplexAll").getContext("2d");
const canvasPlaneComplexAllLine = document.getElementById("canvasPlaneComplexAllLine").getContext("2d");
const sliderPlaneComplexAllR = document.getElementById("sliderPlaneComplexAllR");
const sliderPlaneComplexAllI = document.getElementById("sliderPlaneComplexAllI");
const sliderPlaneComplexAllA = document.getElementById("sliderPlaneComplexAllA");
const sliderPlaneComplexAllM = document.getElementById("sliderPlaneComplexAllM");
var varPlaneComplexAllR = 0;
var varPlaneComplexAllI = 0;
var varPlaneComplexAllX;
var varPlaneComplexAllY;
var varPlaneComplexAllNum;
initializeSliders(sliderPlaneComplexAllR, -4, 4, 0.05, 2);
initializeSliders(sliderPlaneComplexAllI, -4, 4, 0.05, 0);
initializeSliders(sliderPlaneComplexAllA, -3.14, 3.14, 0.01, 0);
initializeSliders(sliderPlaneComplexAllM, -2, 2, 0.05, 1);
canvasPlaneComplexAll.canvas.width = 1280;
canvasPlaneComplexAll.canvas.height = 640;
canvasPlaneComplexAllLine.canvas.width = 1280;
canvasPlaneComplexAllLine.canvas.height = 350;
canvasPlaneComplexAllLine.font = "25px JetBrains Mono";
canvasPlaneComplexAllLine.textBaseline = "middle";
canvasPlaneComplexAllLine.textAlign = "right";
canvasPlaneComplexAllLine.fillStyle = "#000";
canvasPlaneComplexAllLine.fillText("Real", 1270, 25);
canvasPlaneComplexAllLine.fillText("Imaginary", 1270, 201);
function updatePlaneComplexAll() {
    canvasPlaneComplexAllLine.clearRect(0, 35, 1280, 150);
    canvasPlaneComplexAllLine.clearRect(0, 215, 1280, 356);
    canvasPlaneComplexAll.clearRect(0, 0, 1280, 640);
    varPlaneComplexAllI = Math.sin(sliderPlaneComplexAllA.value);
    varPlaneComplexAllR = Math.cos(sliderPlaneComplexAllA.value);
    varPlaneComplexAllX = getReal(varPlaneComplexAllR, varPlaneComplexAllI, sliderPlaneComplexAllR.value, sliderPlaneComplexAllI.value);
    varPlaneComplexAllY = getImag(varPlaneComplexAllR, varPlaneComplexAllI, sliderPlaneComplexAllR.value, sliderPlaneComplexAllI.value);
    varPlaneComplexAllNum = getComplexNum(varPlaneComplexAllR, varPlaneComplexAllI);
    drawNumberLineOverlay(canvasPlaneComplexAllLine, 109, sliderPlaneComplexAllM.value, sliderPlaneComplexAllM.value * varPlaneComplexAllX);
    drawNumberLineOverlay(canvasPlaneComplexAllLine, 281, sliderPlaneComplexAllM.value, sliderPlaneComplexAllM.value * varPlaneComplexAllY);
    drawTriangle(canvasPlaneComplexAllLine, sliderPlaneComplexAllM.value * varPlaneComplexAllX * 70 + 641, 160);
    drawTriangle(canvasPlaneComplexAllLine, sliderPlaneComplexAllM.value * varPlaneComplexAllY * 70 + 641, 336);
    drawGridOverlay(canvasPlaneComplexAll, Number(sliderPlaneComplexAllR.value), Number(sliderPlaneComplexAllI.value), varPlaneComplexAllR * sliderPlaneComplexAllM.value, varPlaneComplexAllI * sliderPlaneComplexAllM.value);
    spanPlaneComplexAllR.innerHTML = Number(sliderPlaneComplexAllR.value).toFixed(2);
    spanPlaneComplexAllI.innerHTML = Number(sliderPlaneComplexAllI.value).toFixed(2);
    spanPlaneComplexAllM.innerHTML = Number(sliderPlaneComplexAllM.value).toFixed(2);
    spanPlaneComplexAllA.innerHTML = varPlaneComplexAllNum;
    spanPlaneComplexAllMult.innerHTML = "(" + getComplexNum(varPlaneComplexAllR, varPlaneComplexAllI) +")·(" + Number(sliderPlaneComplexAllM.value).toFixed(2) + "))";
    spanPlaneComplexAllNums.innerHTML = "(" + getComplexNum(Number(sliderPlaneComplexAllR.value), Number(sliderPlaneComplexAllI.value)) + ") · ((" + getComplexNum(varPlaneComplexAllR, varPlaneComplexAllI) +")·(" + Number(sliderPlaneComplexAllM.value).toFixed(2) + "))";
    spanPlaneComplexAllNumber.innerHTML = getComplexNum(varPlaneComplexAllX * sliderPlaneComplexAllM.value, varPlaneComplexAllY * sliderPlaneComplexAllM.value);
}
updatePlaneComplexAll();
sliderPlaneComplexAllR.addEventListener("input", updatePlaneComplexAll);
sliderPlaneComplexAllI.addEventListener("input", updatePlaneComplexAll);
sliderPlaneComplexAllA.addEventListener("input", updatePlaneComplexAll);
sliderPlaneComplexAllM.addEventListener("input", updatePlaneComplexAll);

// definitions
const canvasDefinitions = document.getElementById("canvasDefinitions").getContext("2d");
canvasDefinitions.canvas.width = 1280;
canvasDefinitions.canvas.height = 640;
drawGrid(canvasDefinitions, 0, 0, 1, 0, "#ccc");
drawGridNumbers(canvasDefinitions, 0, 0, 1, 0, "#aaa");
drawPoint(canvasDefinitions, 3, 0, 2, 1, "#aaa");
drawGrid(canvasDefinitions, 3, 0, 2, 1, "#888", 10)
drawGridNumbers(canvasDefinitions, 3, 0, 2, 1, "#000", 10, -16);
canvasDefinitions.fillText("Argument", 810, 295);
canvasDefinitions.fillText("Magnitude", 820, 135);
canvasDefinitions.lineWidth = 5;
drawArc(canvasDefinitions, 0.46);
drawLine(canvasDefinitions, 621, 280, 1041, 70);
drawLine(canvasDefinitions, 621, 280, 631, 250);
drawLine(canvasDefinitions, 1041, 70, 1010, 65);
canvasDefinitions.stroke();

// proof multiplication rotation
const canvasProofProduct = document.getElementById("canvasProofProduct").getContext("2d");
canvasProofProduct.canvas.width = 1280;
canvasProofProduct.canvas.height = 450;
drawGrid(canvasProofProduct, 0, 0, 1, 0, "#aaa", 3, 221, 225);
drawGrid(canvasProofProduct, 0, 0, 1, 0, "#aaa", 2, 641, 225);
drawGrid(canvasProofProduct, 0, 0, 1, 0, "#aaa", 3, 1061, 225);
canvasProofProduct.lineWidth = 3;
drawArc(canvasProofProduct, 3.14, 30, 0, 221, 225);
drawArc(canvasProofProduct, 0.8, 45, 0, 221, 225);
drawArc(canvasProofProduct, 0.5, 60, 0, 221, 225);
drawArc(canvasProofProduct, 3.14, 30, 0, 1061, 225);
drawArc(canvasProofProduct, 0.78, 45, 0, 1061, 225);
drawArc(canvasProofProduct, 0.5, 60, 0, 1061, 225);
canvasProofProduct.strokeStyle = "#000";
drawArc(canvasProofProduct, 0.8, 30, 0, 641, 225);
drawArc(canvasProofProduct, 4, 30, 3.14, 1061, 225);
drawArc(canvasProofProduct, 1.5, 45, 0.78, 1061, 225);
drawArc(canvasProofProduct, 1.2, 60, 0.5, 1061, 225);
canvasProofProduct.strokeStyle = "#aaa";
canvasProofProduct.lineWidth = 5;
canvasProofProduct.beginPath();
drawLine(canvasProofProduct, 11, 225, 431, 225);
drawLine(canvasProofProduct, 501, 225, 781, 225);
drawLine(canvasProofProduct, 851, 225, 1271, 225);
drawLine(canvasProofProduct, 221, 15, 221, 435);
drawLine(canvasProofProduct, 641, 85, 641, 365);
drawLine(canvasProofProduct, 1061, 15, 1061, 435);
drawLine(canvasProofProduct, 221, 225, 291, 155);
drawLine(canvasProofProduct, 221, 225, 361, 155);
drawLine(canvasProofProduct, 221, 225, 151, 225);
drawLine(canvasProofProduct, 1061, 225, 1061, 125);
drawLine(canvasProofProduct, 1061, 225, 1111, 75);
drawLine(canvasProofProduct, 1061, 225, 1011, 275);
canvasProofProduct.stroke();
drawDiamond(canvasProofProduct, 291, 155, "#aaa");
drawDiamond(canvasProofProduct, 361, 155, "#aaa");
drawDiamond(canvasProofProduct, 151, 225, "#aaa");
canvasProofProduct.strokeStyle = "#000";
canvasProofProduct.beginPath();
drawLine(canvasProofProduct, 1061, 125, 1061, 85);
drawLine(canvasProofProduct, 641, 225, 711, 155);
drawLine(canvasProofProduct, 1111, 75, 1131, 15);
drawLine(canvasProofProduct, 1011, 275, 991, 295);
canvasProofProduct.stroke();
drawDiamond(canvasProofProduct, 711, 155);
drawDiamond(canvasProofProduct, 1061, 85);
drawDiamond(canvasProofProduct, 1131, 15);
drawDiamond(canvasProofProduct, 991, 295);
drawDiamond(canvasProofProduct, 221, 225, "#aaa");
drawDiamond(canvasProofProduct, 641, 225, "#aaa");
drawDiamond(canvasProofProduct, 1061, 225, "#aaa");
canvasProofProduct.lineWidth = 2;
canvasProofProduct.beginPath();
drawLine(canvasProofProduct, 456, 215, 476, 235);
drawLine(canvasProofProduct, 456, 235, 476, 215);
drawLine(canvasProofProduct, 800, 221, 830, 221);
drawLine(canvasProofProduct, 800, 231, 830, 231);
canvasProofProduct.stroke();

// proof real part
const canvasProofReal = document.getElementById("canvasProofReal").getContext("2d");
const sliderProofRealA = document.getElementById("sliderProofRealA");
const sliderProofRealB = document.getElementById("sliderProofRealB");
const sliderProofRealC = document.getElementById("sliderProofRealC");
const sliderProofRealD = document.getElementById("sliderProofRealD");
initializeSliders(sliderProofRealA, -3, 3, 0.05, 1);
initializeSliders(sliderProofRealB, -3, 3, 0.05, 1);
initializeSliders(sliderProofRealC, -3, 3, 0.05, 2);
initializeSliders(sliderProofRealD, -3, 3, 0.05, 1);
canvasProofReal.canvas.width = 1280;
canvasProofReal.canvas.height = 640;
var varProofRealAngle1 = 0;
var varProofRealAngle2 = 0;
function updateProofReal() {
    canvasProofReal.clearRect(0, 0, 1280, 640);
    drawGrid(canvasProofReal, 0, 0, 1, 0, "#aaa");
    drawGridNumbers(canvasProofReal, 0, 0, 1, 0, "#aaa");
    canvasProofReal.lineWidth = 5;
    varProofRealAngle1 = Math.atan2(sliderProofRealB.value, sliderProofRealA.value);
    varProofRealAngle2 = Math.atan2(sliderProofRealD.value, sliderProofRealC.value);
    drawAngle(canvasProofReal, varProofRealAngle1, varProofRealAngle2, "#c88", "#78a");
    drawProjection(canvasProofReal, sliderProofRealA.value, sliderProofRealB.value, 1, 0, true, "#c88", "#c88");
    drawProjection(canvasProofReal, sliderProofRealC.value, sliderProofRealD.value, 1, 0, true, "#78a", "#78a");
    drawProjection(canvasProofReal, sliderProofRealA.value, sliderProofRealB.value, sliderProofRealC.value, sliderProofRealD.value, true, "#000");
    spanProofRealA.innerHTML = Number(sliderProofRealA.value).toFixed(2);
    spanProofRealB.innerHTML = Number(sliderProofRealB.value).toFixed(2);
    spanProofRealC.innerHTML = Number(sliderProofRealC.value).toFixed(2);
    spanProofRealD.innerHTML = Number(sliderProofRealD.value).toFixed(2);
}
updateProofReal();
sliderProofRealA.addEventListener("input", updateProofReal);
sliderProofRealB.addEventListener("input", updateProofReal);
sliderProofRealC.addEventListener("input", updateProofReal);
sliderProofRealD.addEventListener("input", updateProofReal);

// proof real part
const canvasProofImag = document.getElementById("canvasProofImag").getContext("2d");
const sliderProofImagA = document.getElementById("sliderProofImagA");
const sliderProofImagB = document.getElementById("sliderProofImagB");
const sliderProofImagC = document.getElementById("sliderProofImagC");
const sliderProofImagD = document.getElementById("sliderProofImagD");
initializeSliders(sliderProofImagA, -3, 3, 0.05, 1);
initializeSliders(sliderProofImagB, -3, 3, 0.05, 1);
initializeSliders(sliderProofImagC, -3, 3, 0.05, 2);
initializeSliders(sliderProofImagD, -3, 3, 0.05, 1);
canvasProofImag.canvas.width = 1280;
canvasProofImag.canvas.height = 640;
var varProofImagAngle1 = 0;
var varProofImagAngle2 = 0;
function updateProofImag() {
    canvasProofImag.clearRect(0, 0, 1280, 640);
    drawGrid(canvasProofImag, 0, 0, 1, 0, "#aaa");
    drawGridNumbers(canvasProofImag, 0, 0, 1, 0, "#aaa");
    canvasProofImag.lineWidth = 5;
    varProofImagAngle1 = Math.atan2(sliderProofImagB.value, sliderProofImagA.value);
    varProofImagAngle2 = Math.atan2(sliderProofImagD.value, sliderProofImagC.value);
    drawAngle(canvasProofImag, varProofImagAngle1, varProofImagAngle2, "#c88", "#78a");
    drawProjection(canvasProofImag, sliderProofImagA.value, sliderProofImagB.value, 1, 0, false, "#c88", "#c88");
    drawProjection(canvasProofImag, sliderProofImagC.value, sliderProofImagD.value, 1, 0, false, "#78a", "#78a");
    drawProjection(canvasProofImag, sliderProofImagA.value, sliderProofImagB.value, sliderProofImagC.value, sliderProofImagD.value, false, "#000");
    spanProofImagA.innerHTML = Number(sliderProofImagA.value).toFixed(2);
    spanProofImagB.innerHTML = Number(sliderProofImagB.value).toFixed(2);
    spanProofImagC.innerHTML = Number(sliderProofImagC.value).toFixed(2);
    spanProofImagD.innerHTML = Number(sliderProofImagD.value).toFixed(2);
}
updateProofImag();
sliderProofImagA.addEventListener("input", updateProofImag);
sliderProofImagB.addEventListener("input", updateProofImag);
sliderProofImagC.addEventListener("input", updateProofImag);
sliderProofImagD.addEventListener("input", updateProofImag);

// fourier
const canvasFourier = document.getElementById("canvasFourier").getContext("2d");
canvasFourier.canvas.width = 1280;
canvasFourier.canvas.height = 720;
canvasFourier.lineWidth = 2;
canvasFourier.strokeStyle = "#000";
canvasFourier.beginPath();
canvasFourier.moveTo(0, 100);
for (let x = 0; x < 1280; x += 2) {
    const y = 100 + 25 * (Math.sin(0.01 * x * Math.PI) + Math.sin(0.02 * x * Math.PI) + Math.sin(0.03 * x * Math.PI) + Math.sin(0.04 * x * Math.PI));
    canvasFourier.lineTo(x, y);
}
canvasFourier.stroke();
canvasFourier.beginPath();
canvasFourier.moveTo(641, 220);
canvasFourier.lineTo(641, 301);
canvasFourier.lineTo(631, 291);
canvasFourier.lineTo(651, 291);
canvasFourier.lineTo(641, 301);
canvasFourier.stroke();
canvasFourier.fill();
drawWave(canvasFourier, 1, 370);
drawWave(canvasFourier, 2, 470);
drawWave(canvasFourier, 3, 570);
drawWave(canvasFourier, 4, 670);

// roots of unity
const canvasFields = document.getElementById("canvasFields").getContext("2d");
canvasFields.canvas.width = 1280;
canvasFields.canvas.height = 640;
drawGrid(canvasFields, 0, 0, 4, 0, "#aaa");
drawGridNumbers(canvasFields, 0, 0, 4, 0, "#aaa");
canvasFields.beginPath();
canvasFields.arc(641, 321, 280, 0, 2 * Math.PI);
canvasFields.stroke();
drawDiamond(canvasFields, 921, 321);
drawDiamond(canvasFields, 501, 78);
drawDiamond(canvasFields, 501, 563);
canvasFields.fillText("x^3 = 1", 891, 585);
canvasFields.strokeStyle = "#000";
var arrFieldsCoords = [921, 501, 501, 321, 78, 563];
for (let j = 0; j < 3; j++) {
    for (let i = 10; i < 250; i*= 1.5) {
        canvasFields.beginPath();
        canvasFields.arc(arrFieldsCoords[j], arrFieldsCoords[j + 3], i, 0, 2 * Math.PI);
        canvasFields.stroke();
    }
}



function drawLine(canvas, x1, y1, x2, y2) {
    canvas.moveTo(x1, y1);
    canvas.lineTo(x2, y2);
}

function drawArc(canvas, angleEnd, radius = 100, angleStart = 0, centerX = 641, centerY = 321) {
    canvas.beginPath();
    if (angleEnd < 0) canvas.arc(centerX, centerY, radius, -angleStart, -angleEnd);
    else canvas.arc(centerX, centerY, radius, 2 * Math.PI - angleStart, 2 * Math.PI - angleEnd, true);
    canvas.stroke();
}

function drawAngle(canvas, angleA, angleB, colorA, colorB, radiusA = 30, radiusB = 40, radiusP = 70, x = 641, y = 321) {
    canvas.strokeStyle = colorA;
    drawArc(canvas, angleA, radiusA);
    drawArc(canvas, angleA, radiusP);
    canvas.strokeStyle = colorB;
    drawArc(canvas, angleB, radiusB);
    canvas.beginPath();
    if (angleA > 0 && angleB < 0) { canvas.arc(x, y, radiusP + 5, -angleA, -angleA - angleB);
    } else if (angleA < 0 && angleB > 0) { canvas.arc(x, y, radiusP + 5, -angleA, -angleA - angleB, true);
    } else { drawArc(canvas, angleA + angleB, radiusP + 5, angleA); }
    canvas.stroke();
};

function drawWave(canvas, frequency, yOffset, color = "#aaa", width = 2) {
    canvas.strokeStyle = color;
    canvas.lineWidth = width;
    canvas.beginPath();
    canvas.moveTo(0, yOffset);
    for (let x = 0; x < 1280; x += 2) {
        const y = yOffset + 40 * Math.sin(frequency * 0.01 * x * Math.PI);
        canvas.lineTo(x, y);
    }
    canvas.stroke();
}

function drawNumberLine(canvas, y, color = "#000", x1 = 5, x2 = 1275, width = 2) {
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

function drawNumberMark(canvas, y, color = "#000", textOffset = 36, gaps = 70, origin = 641, x1 = 5, x2 = 1275, font = "25px JetBrains Mono", width = 2) {
    canvas.lineWidth = width;
    canvas.strokeStyle = color;
    canvas.fillStyle = color;
    canvas.textAlign = "center";
    canvas.textBaseline = "middle";
    canvas.font = font;
    canvas.beginPath();
    var i = 0;
    for (let x = Number(origin); x < (x2 - Math.abs(gaps / 4)); x += Math.abs(gaps)) {
        drawLine(canvas, x, y - 15, x, y + 15);
        if (gaps > 2) canvas.fillText(i, x, y + textOffset);
        else if (gaps < -2) canvas.fillText(-i, x, y + textOffset);
        else break
        i++;
    }
    var i = 0;
    for (let x = origin; x > (x1 + Math.abs(gaps / 4)); x -= Math.abs(gaps)) {
        drawLine(canvas, x, y - 15, x, y + 15);
        if (gaps > 2) canvas.fillText(i, x, y + textOffset);
        else if (gaps < -2) canvas.fillText(-i, x, y + textOffset);
        else break
        i--;
    }
    canvas.stroke();
}

function drawNumberLineOverlay(canvas, y, multiplier = 1, addition = 0, colorBG = "#aaa", colorFG = "#000") {
    drawNumberMark(canvas, y, colorBG);
    drawNumberLine(canvas, y);
    drawNumberMark(canvas, y, colorFG, -36, multiplier * 70, addition * 70 + 641);
}

function drawGrid(canvas, x, y, real, imag, color = "#000", maxL = 10, originX = 641, originY = 321, width = 2) {
    canvas.lineWidth = width;
    canvas.strokeStyle = color;
    canvas.beginPath();
    if (maxL < 500) for (let i = -maxL; i <= maxL; i++)
        drawLine(canvas, getX(i + x, -maxL, real, imag, originX), getY(i + x, -maxL, real, imag, originY), getX(i + x, maxL, real, imag, originX), getY(i + x, maxL, real, imag, originY));
    if (maxL < 500) for (let i = -maxL; i <= maxL; i++)
        drawLine(canvas, getX(-maxL, i + y, real, imag, originX), getY(-maxL, i + y, real, imag, originY), getX(maxL, i + y, real, imag, originX), getY(maxL, i + y, real, imag, originY));
    canvas.stroke();
}

function drawGridNumbers(canvas, originX, originY, real, imag, color = "#000", maxL = 10, textOffset = 16, width = 5, widthMarks = 2, font = "25px JetBrains Mono") {
    canvas.lineWidth = width;
    canvas.fillStyle = color;
    canvas.strokeStyle = color;
    canvas.beginPath();
    if (maxL < 500) drawLine(canvas, getX(originX, maxL, real, imag), getY(originX, maxL, real, imag), getX(originX, -maxL, real, imag), getY(originX, -maxL, real, imag));
    if (maxL < 500) drawLine(canvas, getX(-maxL, originY, real, imag), getY(-maxL, originY, real, imag), getX(maxL, originY, real, imag), getY(maxL, originY, real, imag));
    canvas.stroke();
    canvas.lineWidth = widthMarks;
    canvas.textAlign = "center";
    canvas.textBaseline = "middle";
    canvas.font = font;
    canvas.beginPath();
    if (maxL < 500) for (let i = -maxL; i < maxL; i++) {
        drawLine(canvas, getX(i + originX, originY, real, imag), getY(i + originX, originY, real, imag) - 15, getX(i + originX, originY, real, imag), getY(i + originX, originY, real, imag) + 15);
        drawLine(canvas, getX(originX, i + originY, real, imag) - 15, getY(originX, i + originY, real, imag), getX(originX, i + originY, real, imag) + 15, getY(originX, i + originY, real, imag));
        canvas.fillText(i, getX(i + originX, originY, real, imag) + textOffset, getY(i + originX, originY, real, imag) + textOffset);
        canvas.fillText(i, getX(originX, i + originY, real, imag) + textOffset, getY(originX, i + originY, real, imag) + textOffset);
    }
    canvas.stroke();
}

function drawPoint(canvas, x, y, real, imag, color = "#000", width = 2) {
    canvas.lineWidth = width;
    canvas.strokeStyle = color;
    canvas.beginPath();
    drawLine(canvas, getX(x, y, real, imag), getY(x, y, real, imag), getX(x, y, real, imag), 321);
    drawLine(canvas, getX(x, y, real, imag), getY(x, y, real, imag), 641, getY(x, y, real, imag));
    canvas.stroke();
    drawDiamond(canvas, 641, getY(x, y, real, imag), "#aaa");
    drawDiamond(canvas, getX(x, y, real, imag), 321, "#aaa");
    drawDiamond(canvas, getX(x, y, real, imag), getY(x, y, real, imag));
}

function drawProjection(canvas, x, y, real, imag, X, color = "#000", colorPoint = "#000", width = 2) {
    canvas.lineWidth = width;
    canvas.strokeStyle = color;
    canvas.beginPath();
    if (X) {
        drawLine(canvas, getX(x, y, real, imag), getY(x, y, real, imag), getX(x, y, real, imag), 321);
        drawLine(canvas, 641, 321, getX(x, y, real, imag), 321);
        canvas.stroke();
        drawDiamond(canvas, getX(x, y, real, imag), 321, colorPoint, 8);
    }
    else {
        drawLine(canvas, getX(x, y, real, imag), getY(x, y, real, imag), 641, getY(x, y, real, imag));
        drawLine(canvas, 641, 321, 641, getY(x, y, real, imag));
        canvas.stroke();
        drawDiamond(canvas, 641, getY(x, y, real, imag), colorPoint, 8);
    }
    drawDiamond(canvas, getX(x, y, real, imag), getY(x, y, real, imag), colorPoint, 5);
    canvas.lineWidth = 5;
    canvas.strokeStyle = color;
    drawLine(canvas, 641, 321, getX(x, y, real, imag), getY(x, y, real, imag));
    canvas.stroke();
}

function drawGridOverlay(canvas, x, y, real, imag, colorBG = "#aaa", colorFG = "#000") {
    drawGrid(canvas, 0, 0, 1, 0, colorBG);
    drawGridNumbers(canvas, 0, 0, 1, 0, colorBG);
    drawPoint(canvas, x, y, real, imag, colorBG);
    drawGrid(canvas, x, y, real, imag, colorFG, parseInt(40 / (Math.abs(real) + Math.abs(imag))));
    drawGridNumbers(canvas, x, y, real, imag, "#000", parseInt(40 / (Math.abs(real) + Math.abs(imag))), -16);
}

function drawTriangle(canvas, xOffset, yOffset, color = "#000", size = 11) {
    canvas.beginPath();
    canvas.moveTo(xOffset, yOffset);
    canvas.lineTo(xOffset - size, yOffset + size);
    canvas.lineTo(xOffset + size, yOffset + size);
    canvas.closePath();
    canvas.fillStyle = color;
    canvas.fill();
}

function drawDiamond(canvas, xOffset, yOffset, color = "#000", size = 11) {
    canvas.beginPath();
    canvas.moveTo(xOffset, yOffset - size);
    canvas.lineTo(xOffset - size, yOffset);
    canvas.lineTo(xOffset, yOffset + size);
    canvas.lineTo(xOffset + size, yOffset);
    canvas.closePath();
    canvas.fillStyle = color;
    canvas.fill();
}

function getReal(real1, imag1, real2, imag2) {
    return real1 * real2 - imag1 * imag2;
}

function getImag(real1, imag1, real2, imag2) {
    return real1 * imag2 + imag1 * real2;
}

function getX(real1, imag1, real2, imag2, origin = 641, gaps = 70) {
    return origin + getReal(real1, imag1, real2, imag2) * gaps;
}

function getY(real1, imag1, real2, imag2, origin = 321, gaps = 70) {
    return origin - getImag(real1, imag1, real2, imag2) * gaps;
}

function getComplexNum(a, b) {
    return a.toFixed(2) + (b < 0 ? "" : "+") + b.toFixed(2) + "i";
}

function initializeSliders(slider, minimum, maximum, step, value) {
    slider.min = minimum;
    slider.max = maximum;
    slider.step = step;
    slider.value = value;
}
