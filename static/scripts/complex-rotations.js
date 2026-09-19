const WIDTH = 1280;
const LINEWIDTH = 2;
const COLORS = getColors();


const canvasNumberlineStatic = initializeCanvas("canvasNumberlineStatic", 128);
drawNumberLine(canvasNumberlineStatic, 65);
drawNumberMark(canvasNumberlineStatic, 65);


const canvasNumberlineMap = initializeCanvas("canvasNumberlineMap", 384);
drawNumberLine(canvasNumberlineMap, 65, COLORS.GRAY);
drawNumberMark(canvasNumberlineMap, 65, COLORS.GRAY);
drawNumberMark(canvasNumberlineMap, 321, COLORS.GRAY);
drawNumberLine(canvasNumberlineMap, 321);
drawNumberMark(canvasNumberlineMap, 321, COLORS.FG, -36, 140, 571);
drawLine(canvasNumberlineMap, 641, 120, 571, 261);
drawLine(canvasNumberlineMap, 571, 120, 435, 261);
drawLine(canvasNumberlineMap, 501, 120, 301, 261);
drawLine(canvasNumberlineMap, 711, 120, 711, 261);
drawLine(canvasNumberlineMap, 781, 120, 841, 261);
canvasNumberlineMap.stroke();
canvasNumberlineMap.fillText("f(x)", 750, 200);


const canvasNumberlineAdd = initializeCanvas("canvasNumberlineAdd", 384);
const sliderAdd = initializeSliders("sliderAdd", -8, 8, 0.05, 0);
drawNumberLine(canvasNumberlineAdd, 65, COLORS.GRAY);
drawNumberMark(canvasNumberlineAdd, 65, COLORS.GRAY);
function updateNumberlineAdd() {
    canvasNumberlineAdd.clearRect(0, 119, 1280, 265);
    drawNumberLineOverlay(canvasNumberlineAdd, 321, 1, sliderAdd.value);
    drawLine(canvasNumberlineAdd, 641, 120, sliderAdd.value * 70 + 641, 261);
    canvasNumberlineAdd.stroke();
    spanNumberlineAdd.innerHTML = Number(sliderAdd.value).toFixed(2);
}
updateNumberlineAdd();
sliderAdd.addEventListener("input", updateNumberlineAdd);


const canvasNumberlineMultiply = initializeCanvas("canvasNumberlineMultiply", 384);
const sliderMultiply = initializeSliders("sliderMultiply", -6, 6, 0.05, 1);
drawNumberLine(canvasNumberlineMultiply, 65, COLORS.GRAY);
drawNumberMark(canvasNumberlineMultiply, 65, COLORS.GRAY);
function updateNumberlineMultiply() {
    canvasNumberlineMultiply.clearRect(0, 119, 1280, 265);
    drawNumberLineOverlay(canvasNumberlineMultiply, 321, sliderMultiply.value, 0);
    drawLine(canvasNumberlineMultiply, 711, 120, sliderMultiply.value * 70 + 641, 261);
    canvasNumberlineMultiply.stroke();
    spanNumberlineMultiply.innerHTML = Number(sliderMultiply.value).toFixed(2);
}
updateNumberlineMultiply();
sliderMultiply.addEventListener("input", updateNumberlineMultiply);


const canvasNumberlineSquareMap = initializeCanvas("canvasNumberlineSquareMap", 384);
drawNumberLine(canvasNumberlineSquareMap, 65, COLORS.GRAY);
drawNumberMark(canvasNumberlineSquareMap, 65, COLORS.GRAY);
drawNumberMark(canvasNumberlineSquareMap, 321, COLORS.GRAY);
drawNumberLine(canvasNumberlineSquareMap, 321);
drawNumberMark(canvasNumberlineSquareMap, 321, COLORS.FG, -36, 70, 641, 640, 750);
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


const canvasNumberlineSquare = initializeCanvas("canvasNumberlineSquare", 640);
const sliderSquare = initializeSliders("sliderSquare", -2.5, 2.5, 0.05, 1);
drawNumberLine(canvasNumberlineSquare, 65, COLORS.GRAY);
drawNumberMark(canvasNumberlineSquare, 65, COLORS.GRAY);
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


const canvasNumberlineSqrt = initializeCanvas("canvasNumberlineSqrt", 640);
const sliderSqrtRes = initializeSliders("sliderSqrtRes", 0, 6.25, 0.05, 1);
const sliderSqrt = initializeSliders("sliderSqrt", -2.5, 2.5, 0.1, 1);
drawNumberLine(canvasNumberlineSqrt, 65, COLORS.GRAY);
drawNumberMark(canvasNumberlineSqrt, 65, COLORS.GRAY);
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


const canvasNumberlineSqrtNeg = initializeCanvas("canvasNumberlineSqrtNeg", 640);
const sliderSqrtNegRes = initializeSliders("sliderSqrtNegRes", -6.25, 0, 0.05, 0);
const sliderSqrtNeg = initializeSliders("sliderSqrtNeg", -2.5, 2.5, 0.1, 1);
drawNumberLine(canvasNumberlineSqrtNeg, 65, COLORS.GRAY);
drawNumberMark(canvasNumberlineSqrtNeg, 65, COLORS.GRAY);
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


const canvasNumberlineImaginary = initializeCanvas("canvasNumberlineImaginary", 334);
drawNumberLine(canvasNumberlineImaginary, 65);
drawNumberMark(canvasNumberlineImaginary, 65);
drawNumberLine(canvasNumberlineImaginary, 271);
drawNumberMark(canvasNumberlineImaginary, 271);
initializeCanvasText(canvasNumberlineImaginary, "right");
canvasNumberlineImaginary.fillText("Real Number Line", 1270, 15);
canvasNumberlineImaginary.fillText("Imaginary Number Line", 1270, 221);


const canvasNumberlinesTransform = initializeCanvas("canvasNumberlinesTransform", 370);
const sliderTransformAddR = initializeSliders("sliderTransformAddR", -8, 8, 0.05, 3);
const sliderTransformAddI = initializeSliders("sliderTransformAddI", -8, 8, 0.05, 0);
const sliderTransformMultiplyR = initializeSliders("sliderTransformMultiplyR", -2, 2, 0.05, 1);
const buttonTransformMultiplyI = document.getElementById("buttonTransformMultiplyI");
initializeCanvasText(canvasNumberlinesTransform, "right");
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
    let temp_R = sliderTransformAddR.value;
    sliderTransformAddR.value = sliderTransformAddI.value * -1;
    sliderTransformAddI.value = temp_R;
    updateNumberlineTransform();
});


const canvasPlaneCartesian = initializeCanvas("canvasPlaneCartesian", 640);
const canvasPlaneCartesianLine = initializeCanvas("canvasPlaneCartesianLine", 350);
const canvasComplexLinesMultiply = initializeCanvas("canvasComplexLinesMultiply", 350);
const sliderPlaneCartesianX = initializeSliders("sliderPlaneCartesianX", -4, 4, 0.05, 3);
const sliderPlaneCartesianY = initializeSliders("sliderPlaneCartesianY", -4, 4, 0.05, 0);
const buttonPlaneCartesianRotate = document.getElementById("buttonPlaneCartesianRotate");
const buttonComplexLinesMultiply = document.getElementById("buttonComplexLinesMultiply");
initializeCanvasText(canvasPlaneCartesianLine, "right");
canvasPlaneCartesianLine.fillText("X", 1270, 25);
canvasPlaneCartesianLine.fillText("Y", 1270, 201);
initializeCanvasText(canvasComplexLinesMultiply, "right");
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
    let temp_X = sliderPlaneCartesianX.value;
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


const canvasPlaneComplex = initializeCanvas("canvasPlaneComplex", 640);
const canvasPlaneComplexLine = initializeCanvas("canvasPlaneComplexLine", 350);
const sliderPlaneComplexR = initializeSliders("sliderPlaneComplexR", -4, 4, 0.05, 3);
const sliderPlaneComplexI = initializeSliders("sliderPlaneComplexI", -4, 4, 0.05, 0);
const sliderPlaneComplexM = initializeSliders("sliderPlaneComplexM", -2, 2, 0.05, 1);
const buttonPlaneComplexRotate = document.getElementById("buttonPlaneComplexRotate");
initializeCanvasText(canvasPlaneComplexLine, "right");
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
    let temp_X = sliderPlaneComplexR.value;
    sliderPlaneComplexR.value = sliderPlaneComplexI.value * -1;
    sliderPlaneComplexI.value = temp_X;
    updatePlaneComplex();
}
updatePlaneComplex();
sliderPlaneComplexR.addEventListener("input", updatePlaneComplex);
sliderPlaneComplexI.addEventListener("input", updatePlaneComplex);
sliderPlaneComplexM.addEventListener("input", updatePlaneComplex);
buttonPlaneComplexRotate.addEventListener("click", updatePlaneComplexRotate);


const canvasPlaneComplexNegOne = initializeCanvas("canvasPlaneComplexNegOne", 640);
const canvasPlaneComplexNegOneLine = initializeCanvas("canvasPlaneComplexNegOneLine", 350);
const sliderPlaneComplexNegOneR = initializeSliders("sliderPlaneComplexNegOneR", -4, 4, 0.05, 3);
const sliderPlaneComplexNegOneI = initializeSliders("sliderPlaneComplexNegOneI", -4, 4, 0.05, 0);
const sliderPlaneComplexNegOneM = initializeSliders("sliderPlaneComplexNegOneM", -2, 2, 0.05, 1);
const buttonPlaneComplexNegOneMO = document.getElementById("buttonPlaneComplexNegOneMO");
const buttonPlaneComplexNegOneMI = document.getElementById("buttonPlaneComplexNegOneMI");
initializeCanvasText(canvasPlaneComplexNegOneLine, "right");
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
        let temp_X = sliderPlaneComplexNegOneR.value;
        sliderPlaneComplexNegOneR.value = sliderPlaneComplexNegOneI.value * -1;
        sliderPlaneComplexNegOneI.value = temp_X;
        updatePlaneComplexNegOne();
        await new Promise(resolve => setTimeout(resolve, 300));
    }
}
updatePlaneComplexNegOne();
sliderPlaneComplexNegOneR.addEventListener("input", updatePlaneComplexNegOne);
sliderPlaneComplexNegOneI.addEventListener("input", updatePlaneComplexNegOne);
sliderPlaneComplexNegOneM.addEventListener("input", updatePlaneComplexNegOne);
buttonPlaneComplexNegOneMO.addEventListener("click", updatePlaneComplexNegOneMultiplyOne);
buttonPlaneComplexNegOneMI.addEventListener("click", updatePlaneComplexNegOneMultiplyImg);


const canvasPlaneComplexHalf = initializeCanvas("canvasPlaneComplexHalf", 640);
const canvasPlaneComplexHalfLine = initializeCanvas("canvasPlaneComplexHalfLine", 350);
const sliderPlaneComplexHalfR = initializeSliders("sliderPlaneComplexHalfR", -4, 4, 0.05, 2);
const sliderPlaneComplexHalfI = initializeSliders("sliderPlaneComplexHalfI", -4, 4, 0.05, 0);
const sliderPlaneComplexHalfM = initializeSliders("sliderPlaneComplexHalfM", -2, 2, 0.05, 1);
const buttonPlaneComplexHalfRotate = document.getElementById("buttonPlaneComplexHalfRotate");
initializeCanvasText(canvasPlaneComplexHalfLine, "right");
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
    let temp_X = sliderPlaneComplexHalfR.value;
    sliderPlaneComplexHalfR.value = getReal(sliderPlaneComplexHalfR.value, sliderPlaneComplexHalfI.value, 0.7071, 0.70711);
    sliderPlaneComplexHalfI.value = getImag(temp_X, sliderPlaneComplexHalfI.value, 0.7071, 0.70711);
    updatePlaneComplexHalf();
}
updatePlaneComplexHalf();
sliderPlaneComplexHalfR.addEventListener("input", updatePlaneComplexHalf);
sliderPlaneComplexHalfI.addEventListener("input", updatePlaneComplexHalf);
sliderPlaneComplexHalfM.addEventListener("input", updatePlaneComplexHalf);
buttonPlaneComplexHalfRotate.addEventListener("click", updatePlaneComplexHalfRotate);


const canvasPlaneComplexUnit = initializeCanvas("canvasPlaneComplexUnit", 640);
const canvasPlaneComplexUnitLine = initializeCanvas("canvasPlaneComplexUnitLine", 350);
const sliderPlaneComplexUnitR = initializeSliders("sliderPlaneComplexUnitR", -4, 4, 0.05, 2);
const sliderPlaneComplexUnitI = initializeSliders("sliderPlaneComplexUnitI", -4, 4, 0.05, 0);
const sliderPlaneComplexUnitA = initializeSliders("sliderPlaneComplexUnitA", -3.14, 3.14, 0.01, 0);
let varPlaneComplexUnitR = 0;
let varPlaneComplexUnitI = 0;
let varPlaneComplexUnitX;
let varPlaneComplexUnitY;
let varPlaneComplexUnitNum;
initializeCanvasText(canvasPlaneComplexUnitLine, "right");
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


const canvasPlaneComplexMag = initializeCanvas("canvasPlaneComplexMag", 640);
const canvasPlaneComplexMagLine = initializeCanvas("canvasPlaneComplexMagLine", 350);
const sliderPlaneComplexMagR = initializeSliders("sliderPlaneComplexMagR", -4, 4, 0.05, 2);
const sliderPlaneComplexMagI = initializeSliders("sliderPlaneComplexMagI", -4, 4, 0.05, 0);
const sliderPlaneComplexMagA = initializeSliders("sliderPlaneComplexMagA", -3.14, 3.14, 0.01, 0);
const sliderPlaneComplexMagM = initializeSliders("sliderPlaneComplexMagM", -2, 2, 0.05, 1);
let varPlaneComplexMagR = 0;
let varPlaneComplexMagI = 0;
let varPlaneComplexMagX;
let varPlaneComplexMagY;
let varPlaneComplexMagNum;
initializeCanvasText(canvasPlaneComplexMagLine, "right");
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


const canvasPlaneComplexAll = initializeCanvas("canvasPlaneComplexAll", 640);
const canvasPlaneComplexAllLine = initializeCanvas("canvasPlaneComplexAllLine", 350);
const sliderPlaneComplexAllR = initializeSliders("sliderPlaneComplexAllR", -4, 4, 0.05, 2);
const sliderPlaneComplexAllI = initializeSliders("sliderPlaneComplexAllI", -4, 4, 0.05, 0);
const sliderPlaneComplexAllA = initializeSliders("sliderPlaneComplexAllA", -3.14, 3.14, 0.01, 0);
const sliderPlaneComplexAllM = initializeSliders("sliderPlaneComplexAllM", -2, 2, 0.05, 1);
let varPlaneComplexAllR = 0;
let varPlaneComplexAllI = 0;
let varPlaneComplexAllX;
let varPlaneComplexAllY;
let varPlaneComplexAllNum;
initializeCanvasText(canvasPlaneComplexAllLine, "right");
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


const canvasDefinitions = initializeCanvas("canvasDefinitions", 640);
drawGrid(canvasDefinitions, 0, 0, 1, 0, COLORS.GRAYL);
drawGridNumbers(canvasDefinitions, 0, 0, 1, 0, COLORS.GRAY);
drawPoint(canvasDefinitions, 3, 0, 2, 1, COLORS.GRAY);
drawGrid(canvasDefinitions, 3, 0, 2, 1, COLORS.GRAY, 10)
drawGridNumbers(canvasDefinitions, 3, 0, 2, 1, COLORS.FG, 10, -16);
canvasDefinitions.fillText("Argument", 810, 295);
canvasDefinitions.fillText("Magnitude", 820, 135);
canvasDefinitions.lineWidth = 5;
drawArc(canvasDefinitions, 0.46);
drawLine(canvasDefinitions, 621, 280, 1041, 70);
drawLine(canvasDefinitions, 621, 280, 631, 250);
drawLine(canvasDefinitions, 1041, 70, 1010, 65);
canvasDefinitions.stroke();


const arrayProofProductGridXSize = [3, 2, 3];
const arrayProofProductArcs1 = [[3.14, 30], [0.8, 45], [0.5, 60]];
const arrayProofProductArcs2 = [[4, 30, 3.14], [1.5, 45, 0.78], [1.2, 60, 0.5]];
const arrayProofProductHLines = [[11, 431], [501, 781], [851, 1271]];
const arrayProofProductVLines = [[221, 15, 435], [641, 85, 365], [1061, 15, 435]];
const arrayProofProductSymbolLines = [[456, 215, 476, 235], [456, 235, 476, 215], [800, 221, 830, 221], [800, 231, 830, 231]];
const arrayProofProductFGLines = [[1061, 125, 1061, 85], [641, 225, 711, 155], [1111, 75, 1131, 15], [1011, 275, 991, 295]];
const arrayProofProductFGDiamonds = [[711, 155], [1061, 85], [1131, 15], [991, 295]];
const arrayProofProductGrayDiamonds = [[291, 155], [361, 155], [151, 225]];
const arrayProofProductGrayLines = [[221, 225, 291, 155], [221, 225, 361, 155], [221, 225, 151, 225], [1061, 225, 1061, 125], [1061, 225, 1111, 75], [1061, 225, 1011, 275]];
const canvasProofProduct = initializeCanvas("canvasProofProduct", 450);
for (let i = 0; i < 3; i++) {
    drawGrid(canvasProofProduct, 0, 0, 1, 0, COLORS.GRAY, arrayProofProductGridXSize[i], 221 + i * 420, 225);
    canvasProofProduct.lineWidth = 3;
    drawArc(canvasProofProduct, ...arrayProofProductArcs1[i], 0, 221, 225);
    drawArc(canvasProofProduct, ...arrayProofProductArcs1[i], 0, 1061, 225);
    canvasProofProduct.strokeStyle = COLORS.FG;
    drawArc(canvasProofProduct, ...arrayProofProductArcs2[i], 1061, 225);
}
canvasProofProduct.strokeStyle = COLORS.GRAY;
canvasProofProduct.lineWidth = 5;
drawArc(canvasProofProduct, 0.8, 30, 0, 641, 225);
canvasProofProduct.beginPath();
for (const [x1, x2] of arrayProofProductHLines)
    drawLine(canvasProofProduct, x1, 225, x2, 225);
for (const [x, y1, y2] of arrayProofProductVLines)
    drawLine(canvasProofProduct, x, y1, x, y2);
for (const [x1, y1, x2, y2] of arrayProofProductGrayLines)
    drawLine(canvasProofProduct, x1, y1, x2, y2);
canvasProofProduct.stroke();
for (const [x, y] of arrayProofProductGrayDiamonds)
    drawDiamond(canvasProofProduct, x, y, COLORS.GRAY);
canvasProofProduct.strokeStyle = COLORS.FG;
canvasProofProduct.beginPath();
for (const [x1, y1, x2, y2] of arrayProofProductFGLines)
    drawLine(canvasProofProduct, x1, y1, x2, y2);
canvasProofProduct.stroke();
for (const [x, y] of arrayProofProductFGDiamonds)
    drawDiamond(canvasProofProduct, x, y);
for (let i = 0; i < 3; i++)
    drawDiamond(canvasProofProduct, 221 + i * 420, 225, COLORS.GRAY);
canvasProofProduct.lineWidth = LINEWIDTH;
canvasProofProduct.beginPath();
for (const [x1, y1, x2, y2] of arrayProofProductSymbolLines)
    drawLine(canvasProofProduct, x1, y1, x2, y2);
canvasProofProduct.stroke();


const canvasProofReal = initializeCanvas("canvasProofReal", 640);
const sliderProofRealA = initializeSliders("sliderProofRealA", -3, 3, 0.05, 1);
const sliderProofRealB = initializeSliders("sliderProofRealB", -3, 3, 0.05, 1);
const sliderProofRealC = initializeSliders("sliderProofRealC", -3, 3, 0.05, 2);
const sliderProofRealD = initializeSliders("sliderProofRealD", -3, 3, 0.05, 1);
let varProofRealAngle1 = 0;
let varProofRealAngle2 = 0;
function updateProofReal() {
    canvasProofReal.clearRect(0, 0, 1280, 640);
    drawGrid(canvasProofReal, 0, 0, 1, 0, COLORS.GRAY);
    drawGridNumbers(canvasProofReal, 0, 0, 1, 0, COLORS.GRAY);
    canvasProofReal.lineWidth = 5;
    varProofRealAngle1 = Math.atan2(sliderProofRealB.value, sliderProofRealA.value);
    varProofRealAngle2 = Math.atan2(sliderProofRealD.value, sliderProofRealC.value);
    drawAngle(canvasProofReal, varProofRealAngle1, varProofRealAngle2, COLORS.PINK, COLORS.BLUE);
    drawProjection(canvasProofReal, sliderProofRealA.value, sliderProofRealB.value, 1, 0, true, COLORS.PINK, COLORS.PINK);
    drawProjection(canvasProofReal, sliderProofRealC.value, sliderProofRealD.value, 1, 0, true, COLORS.BLUE, COLORS.BLUE);
    drawProjection(canvasProofReal, sliderProofRealA.value, sliderProofRealB.value, sliderProofRealC.value, sliderProofRealD.value, true, COLORS.FG);
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


const canvasProofImag = initializeCanvas("canvasProofImag", 640);
const sliderProofImagA = initializeSliders("sliderProofImagA", -3, 3, 0.05, 1);
const sliderProofImagB = initializeSliders("sliderProofImagB", -3, 3, 0.05, 1);
const sliderProofImagC = initializeSliders("sliderProofImagC", -3, 3, 0.05, 2);
const sliderProofImagD = initializeSliders("sliderProofImagD", -3, 3, 0.05, 1);
let varProofImagAngle1 = 0;
let varProofImagAngle2 = 0;
function updateProofImag() {
    canvasProofImag.clearRect(0, 0, 1280, 640);
    drawGrid(canvasProofImag, 0, 0, 1, 0, COLORS.GRAY);
    drawGridNumbers(canvasProofImag, 0, 0, 1, 0, COLORS.GRAY);
    canvasProofImag.lineWidth = 5;
    varProofImagAngle1 = Math.atan2(sliderProofImagB.value, sliderProofImagA.value);
    varProofImagAngle2 = Math.atan2(sliderProofImagD.value, sliderProofImagC.value);
    drawAngle(canvasProofImag, varProofImagAngle1, varProofImagAngle2, COLORS.PINK, COLORS.BLUE);
    drawProjection(canvasProofImag, sliderProofImagA.value, sliderProofImagB.value, 1, 0, false, COLORS.PINK, COLORS.PINK);
    drawProjection(canvasProofImag, sliderProofImagC.value, sliderProofImagD.value, 1, 0, false, COLORS.BLUE, COLORS.BLUE);
    drawProjection(canvasProofImag, sliderProofImagA.value, sliderProofImagB.value, sliderProofImagC.value, sliderProofImagD.value, false, COLORS.FG);
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


const canvasFourier = initializeCanvas("canvasFourier", 720);
for (let i = 1; i <= 4; i++)
    drawWave(canvasFourier, i, 270 + i * 100);
canvasFourier.beginPath();
canvasFourier.fillStyle = COLORS.FG;
canvasFourier.moveTo(0, 100);
for (let x = 0; x < 1280; x += 2) {
    const y = 100 + 25 * (Math.sin(0.01 * x * Math.PI) + Math.sin(0.02 * x * Math.PI) + Math.sin(0.03 * x * Math.PI) + Math.sin(0.04 * x * Math.PI));
    canvasFourier.lineTo(x, y);
}
canvasFourier.stroke();
canvasFourier.beginPath();
canvasFourier.moveTo(641, 220); canvasFourier.lineTo(641, 301);
canvasFourier.lineTo(631, 291); canvasFourier.lineTo(651, 291);
canvasFourier.lineTo(641, 301);
canvasFourier.stroke(); canvasFourier.fill();


const arrFieldsCoords = [[921, 321], [501, 78], [501, 563]];
const canvasFields = initializeCanvas("canvasFields", 640);
drawGrid(canvasFields, 0, 0, 4, 0, COLORS.GRAY);
drawGridNumbers(canvasFields, 0, 0, 4, 0, COLORS.GRAY);
canvasFields.beginPath(); canvasFields.arc(641, 321, 280, 0, 2 * Math.PI); canvasFields.stroke();
canvasFields.fillText("x^3 = 1", 891, 585);
canvasFields.strokeStyle = COLORS.FG;
for (let j = 0; j < 3; j++) {
    drawDiamond(canvasFields, ...arrFieldsCoords[j]);
    for (let i = 10; i < 250; i*= 1.5) {
        canvasFields.beginPath();
        canvasFields.arc(...arrFieldsCoords[j], i, 0, 2 * Math.PI);
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

function drawWave(canvas, frequency, yOffset, color = COLORS.FG, width = 2) {
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

function drawNumberLine(canvas, y, color = COLORS.FG, x1 = 5, x2 = 1275, width = 2) {
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

function drawNumberMark(canvas, y, color = COLORS.FG, textOffset = 36, gaps = 70, origin = 641, x1 = 5, x2 = 1275, font = "25px JetBrains Mono", width = 2) {
    canvas.lineWidth = width;
    canvas.strokeStyle = color;
    canvas.fillStyle = color;
    canvas.textAlign = "center";
    canvas.textBaseline = "middle";
    canvas.font = font;
    canvas.beginPath();
    let i = 0;
    for (let x = Number(origin); x < (x2 - Math.abs(gaps / 4)); x += Math.abs(gaps)) {
        drawLine(canvas, x, y - 15, x, y + 15);
        if (gaps > 2) canvas.fillText(i, x, y + textOffset);
        else if (gaps < -2) canvas.fillText(-i, x, y + textOffset);
        else break
        i++;
    }
    i = 0;
    for (let x = origin; x > (x1 + Math.abs(gaps / 4)); x -= Math.abs(gaps)) {
        drawLine(canvas, x, y - 15, x, y + 15);
        if (gaps > 2) canvas.fillText(i, x, y + textOffset);
        else if (gaps < -2) canvas.fillText(-i, x, y + textOffset);
        else break
        i--;
    }
    canvas.stroke();
}

function drawNumberLineOverlay(canvas, y, multiplier = 1, addition = 0, colorBG = COLORS.GRAY, colorFG = COLORS.FG) {
    drawNumberMark(canvas, y, colorBG);
    drawNumberLine(canvas, y);
    drawNumberMark(canvas, y, colorFG, -36, multiplier * 70, addition * 70 + 641);
}

function drawGrid(canvas, x, y, real, imag, color = COLORS.FG, maxL = 10, originX = 641, originY = 321, width = 2) {
    canvas.lineWidth = width;
    canvas.strokeStyle = color;
    canvas.beginPath();
    if (maxL < 500) for (let i = -maxL; i <= maxL; i++)
        drawLine(canvas, getX(i + x, -maxL, real, imag, originX), getY(i + x, -maxL, real, imag, originY), getX(i + x, maxL, real, imag, originX), getY(i + x, maxL, real, imag, originY));
    if (maxL < 500) for (let i = -maxL; i <= maxL; i++)
        drawLine(canvas, getX(-maxL, i + y, real, imag, originX), getY(-maxL, i + y, real, imag, originY), getX(maxL, i + y, real, imag, originX), getY(maxL, i + y, real, imag, originY));
    canvas.stroke();
}

function drawGridNumbers(canvas, originX, originY, real, imag, color = COLORS.FG, maxL = 10, textOffset = 16, width = 5, widthMarks = 2, font = "25px JetBrains Mono") {
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

function drawPoint(canvas, x, y, real, imag, color = COLORS.FG, width = 2) {
    canvas.lineWidth = width;
    canvas.strokeStyle = color;
    canvas.beginPath();
    drawLine(canvas, getX(x, y, real, imag), getY(x, y, real, imag), getX(x, y, real, imag), 321);
    drawLine(canvas, getX(x, y, real, imag), getY(x, y, real, imag), 641, getY(x, y, real, imag));
    canvas.stroke();
    drawDiamond(canvas, 641, getY(x, y, real, imag), COLORS.GRAY);
    drawDiamond(canvas, getX(x, y, real, imag), 321, COLORS.GRAY);
    drawDiamond(canvas, getX(x, y, real, imag), getY(x, y, real, imag));
}

function drawProjection(canvas, x, y, real, imag, X, color = COLORS.FG, colorPoint = COLORS.FG, width = 2) {
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

function drawGridOverlay(canvas, x, y, real, imag, colorBG = COLORS.GRAY, colorFG = COLORS.FG) {
    drawGrid(canvas, 0, 0, 1, 0, colorBG);
    drawGridNumbers(canvas, 0, 0, 1, 0, colorBG);
    drawPoint(canvas, x, y, real, imag, colorBG);
    drawGrid(canvas, x, y, real, imag, colorFG, parseInt(40 / (Math.abs(real) + Math.abs(imag))));
    drawGridNumbers(canvas, x, y, real, imag, COLORS.FG, parseInt(40 / (Math.abs(real) + Math.abs(imag))), -16);
}

function drawTriangle(canvas, xOffset, yOffset, color = COLORS.FG, size = 11) {
    canvas.beginPath();
    canvas.moveTo(xOffset, yOffset);
    canvas.lineTo(xOffset - size, yOffset + size);
    canvas.lineTo(xOffset + size, yOffset + size);
    canvas.closePath();
    canvas.fillStyle = color;
    canvas.fill();
}

function drawDiamond(canvas, xOffset, yOffset, color = COLORS.FG, size = 11) {
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

function getColors() {
    const styles = getComputedStyle(document.documentElement);
    const colors = {
        FG: styles.getPropertyValue('--fg').trim(),
        BG: styles.getPropertyValue('--bg').trim(),
        GRAY: styles.getPropertyValue('--gray3').trim(),
        GRAYL: styles.getPropertyValue('--gray4').trim(),
        PINK: "#c88",
        BLUE: "#78a",
    }
    return colors;
}

function initializeSliders(sliderID, minimum, maximum, step, value) {
    const slider = document.getElementById(sliderID);
    slider.min = minimum;
    slider.max = maximum;
    slider.step = step;
    slider.value = value;
    return slider;
}

function initializeCanvasText(canvas, horizontal = "center", font = "28px JetBrains Mono", vertical = "middle", color = COLORS.FG) {
    canvas.font = font;
    canvas.textBaseline = vertical;
    canvas.textAlign = horizontal;
    canvas.fillStyle = color;
}

function initializeCanvas(canvasID, height, width = WIDTH) {
    let canvasObject = document.getElementById(canvasID).getContext("2d");
    canvasObject.canvas.width = width;
    canvasObject.canvas.height = height;
    return canvasObject;
}
