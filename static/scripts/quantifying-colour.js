const WIDTH = 1280;
const CONES = ["L", "M", "S"]
const COLORL = "#000";
const COLORM = "#000";
const COLORS = "#000";
const COLORR = "#000";
const LMSCOLORS = [COLORL, COLORM, COLORS];
const LMSMEANS = [76, 65, 32];
const RODMEANS = 48;
const LMSDEVNS = [31, 32, 20];
const RODDEVNS = 25;
const LMSNORMS = [54.445, 56.58, 35.18];
const LMSMAGNS = [1, 1, 1];
const ARRAYRSPSAT = new Array(126).fill(1);
const MATRIX_XYZ_RGB = [
    [  3.2404542, -1.5371385, -0.4985314],
    [ -0.9692660,  1.8760108,  0.0415560],
    [  0.0556434, -0.2040259,  1.0572252]];
const MATRIX_LMS_XYZ = [
    [ 1.91020, -1.11212, 0.20191],
    [ 0.37095,  0.62905, 0.00000],
    [ 0.00000,  0.00000, 1.00000]];
const MATRIX_LMS_RGB = [
    [  5.4336886, -4.77398843, 0.3306119],
    [ -0.7913143,  1.75772089, 0.0353320],
    [  0.0316132, -0.07734499, 1.0312963]];
const arraySPDGrey = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
const arraySPDOlive = [0.13, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2, 0.21, 0.23, 0.24, 0.25, 0.27, 0.28, 0.29, 0.31, 0.32, 0.34, 0.35, 0.37, 0.39, 0.4, 0.42, 0.44, 0.46, 0.47, 0.49, 0.51, 0.53, 0.55, 0.57, 0.59, 0.61, 0.62, 0.64, 0.66, 0.68, 0.7, 0.72, 0.74, 0.75, 0.77, 0.79, 0.81, 0.82, 0.84, 0.85, 0.87, 0.88, 0.9, 0.91, 0.92, 0.93, 0.94, 0.95, 0.96, 0.97, 0.98, 0.98, 0.99, 0.99, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.99, 0.99, 0.98, 0.98, 0.97, 0.96, 0.95, 0.94, 0.93, 0.92, 0.91, 0.9, 0.88, 0.87, 0.85, 0.84, 0.82, 0.81, 0.79, 0.77, 0.75, 0.74, 0.72, 0.7, 0.68, 0.66, 0.64, 0.62, 0.61, 0.59, 0.57, 0.55, 0.53, 0.51, 0.49, 0.47, 0.46, 0.44, 0.42, 0.4, 0.39, 0.37, 0.35, 0.34, 0.32, 0.31, 0.29, 0.28, 0.27, 0.25, 0.24, 0.23, 0.21, 0.2, 0.19, 0.18, 0.17];
const arraySPDPink = [0.46, 0.47, 0.48, 0.49, 0.5, 0.51, 0.52, 0.52, 0.53, 0.54, 0.55, 0.55, 0.56, 0.57, 0.57, 0.57, 0.58, 0.58, 0.58, 0.59, 0.59, 0.59, 0.59, 0.59, 0.59, 0.59, 0.58, 0.58, 0.58, 0.57, 0.57, 0.56, 0.56, 0.55, 0.55, 0.54, 0.54, 0.53, 0.52, 0.51, 0.51, 0.5, 0.49, 0.49, 0.48, 0.47, 0.46, 0.46, 0.45, 0.44, 0.44, 0.43, 0.43, 0.42, 0.42, 0.41, 0.41, 0.41, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.41, 0.41, 0.41, 0.42, 0.42, 0.43, 0.43, 0.44, 0.45, 0.46, 0.47, 0.48, 0.49, 0.5, 0.52, 0.53, 0.54, 0.56, 0.57, 0.59, 0.6, 0.62, 0.64, 0.65, 0.67, 0.69, 0.7, 0.72, 0.74, 0.76, 0.77, 0.79, 0.81, 0.82, 0.84, 0.85, 0.87, 0.88, 0.9, 0.91, 0.92, 0.94, 0.95, 0.96, 0.97, 0.97, 0.98, 0.99, 0.99, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.99, 0.99, 0.98, 0.97, 0.96];
const arraySPDPurple = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
const arraySPDSun = [0.456, 0.473, 0.490, 0.507, 0.532, 0.558, 0.575, 0.600, 0.617, 0.634, 0.651, 0.659, 0.676, 0.693, 0.693, 0.719, 0.727, 0.736, 0.753, 0.770, 0.778, 0.795, 0.803, 0.812, 0.837, 0.837, 0.846, 0.854, 0.863, 0.863, 0.871, 0.871, 0.880, 0.880, 0.880, 0.880, 0.888, 0.888, 0.897, 0.897, 0.897, 0.897, 0.897, 0.897, 0.897, 0.897, 0.897, 0.897, 0.897, 0.897, 0.897, 0.897, 0.897, 0.897, 0.897, 0.897, 0.880, 0.871, 0.854, 0.846, 0.829, 0.820, 0.812, 0.803, 0.778, 0.761, 0.753, 0.736, 0.727, 0.719, 0.710, 0.702, 0.693, 0.685, 0.676, 0.668, 0.668, 0.668, 0.668, 0.651, 0.642, 0.625, 0.609, 0.592, 0.566, 0.558, 0.549, 0.532, 0.532, 0.515, 0.515, 0.515, 0.515, 0.507, 0.498, 0.481, 0.481, 0.481, 0.464, 0.456, 0.456, 0.448, 0.439, 0.431, 0.422, 0.405, 0.397, 0.388, 0.380, 0.346, 0.337, 0.329, 0.312, 0.303, 0.303, 0.287, 0.253, 0.253, 0.253, 0.253, 0.236,, 0.219,, 0.210, 0.210, 0.193,, 0.185, 0.176];


const canvasPhoton = initializeCanvas("canvasPhoton", 400);
const sliderPhotonWavelength = document.getElementById("sliderPhotonWavelength");
initializeSliders(sliderPhotonWavelength, 0.1, 0.4, 0.01, 0.2);
sliderPhotonWavelength.addEventListener("input", updatePhoton);
function updatePhoton() {
    canvasPhoton.clearRect(0, 0, WIDTH, 400);
    drawPhoton(canvasPhoton, sliderPhotonWavelength.value, 440, 200, 400, 150);
}
updatePhoton();


const canvasPhotonSpectrum = initializeCanvas("canvasPhotonSpectrum", 280);
initializeCanvasText(canvasPhotonSpectrum);
const arrayPhotonSpectrumWavelengths = ["1km", "1cm", "10µm", "500nm", "10nm", "0.1nm"];
const arrayPhotonSpectrumNames = ["Radio", "Microwave", "Infrared", "Visible", "Ultraviolet", "X-ray"];
for (let i = 0; i < 6; i++) {
    drawPhoton(canvasPhotonSpectrum, i * 0.05 + 0.1, i * 210 + 21, 90, 175);
    canvasPhotonSpectrum.fillText(arrayPhotonSpectrumWavelengths[i], i * 210 + 115, 205);
    canvasPhotonSpectrum.fillText(arrayPhotonSpectrumNames[i], i * 210 + 115, 245);
}


const canvasPhotonPower = initializeCanvas("canvasPhotonPower", 300);
const canvasPhotonPowerSPD = initializeCanvas("canvasPhotonPowerSPD", 300);
var sliderPhotonPowerWavelength = [];
var arrayPhotonPowerNumber = new Array(126).fill(0);
for (let i = 0; i < 5; i++) {
    sliderPhotonPowerWavelength[i] = document.getElementById(`sliderPhotonPowerWavelength${i}`);
    initializeSliders(sliderPhotonPowerWavelength[i], 0, 5, 1, 5);
    sliderPhotonPowerWavelength[i].addEventListener("input", updatePhotonPower);
}
function updatePhotonPower() {
    canvasPhotonPower.clearRect(0, 0, WIDTH, 300);
    for (let i = 0; i < 5; i++) {
        arrayPhotonPowerNumber[i * 18 + 26] = sliderPhotonPowerWavelength[i].value / (5 + i);
        for (let j = 0; j < sliderPhotonPowerWavelength[i].value; j++)
            drawPhoton(canvasPhotonPower, 0.3 - i * 0.05, (j * 510 + i * 100) % 1100 + 15, (i * 310 + j * 20) % 200 + 50);
    }
    canvasPhotonPowerSPD.clearRect(0, 0, WIDTH, 300);
    drawSPD(canvasPhotonPowerSPD, arrayPhotonPowerNumber);
}
updatePhotonPower();


const canvasSPDSun = initializeCanvas("canvasSPDSun", 300);
canvasSPDSun.canvas.height = 300;
drawSPD(canvasSPDSun, arraySPDSun);


const canvasSensitivityCurves = initializeCanvas("canvasSensitivityCurves", 300);
drawSSC(canvasSensitivityCurves, [COLORR].concat(LMSCOLORS), [RODMEANS].concat(LMSMEANS), [RODDEVNS].concat(LMSDEVNS), [1, 1, 1, 1]);
initializeCanvasText(canvasSensitivityCurves, COLORR, "left");
canvasSensitivityCurves.fillText("Rods", 660, 165);
canvasSensitivityCurves.fillStyle = COLORL;
canvasSensitivityCurves.fillText("L cones", 1110, 165);
canvasSensitivityCurves.fillStyle = COLORM;
canvasSensitivityCurves.fillText("M cones", 850, 165);
canvasSensitivityCurves.fillStyle = COLORS;
canvasSensitivityCurves.fillText("S cones", 45, 135);


const canvasSimpleSPD = initializeCanvas("canvasSimpleSPD", 300);
const canvasSimpleSSC = initializeCanvas("canvasSimpleSSC", 300);
const canvasSimpleRSP = initializeCanvas("canvasSimpleRSP", 200);
const sliderSimpleWavelength = document.getElementById("sliderSimpleWavelength");
initializeSliders(sliderSimpleWavelength, 0, 125, 1, 80);
var arraySimpleSPD = new Array(126).fill(0);
var varSimplePrevWavelength = 0;
sliderSimpleWavelength.addEventListener("input", updateSimple);
drawSSC(canvasSimpleSSC);
function updateSimple() {
    canvasSimpleSPD.clearRect(0, 0, WIDTH, 300);
    canvasSimpleRSP.clearRect(0, 0, WIDTH, 200);
    arraySimpleSPD[varSimplePrevWavelength] = 0;
    varSimplePrevWavelength = sliderSimpleWavelength.value;
    arraySimpleSPD[varSimplePrevWavelength] = 1;
    drawSPD(canvasSimpleSPD, arraySimpleSPD);
    drawRSP(canvasSimpleRSP, arraySimpleSPD);
}
updateSimple();


const canvasSimpleColorSPD = initializeCanvas("canvasSimpleColorSPD", 300);
const canvasSimpleColorSSC = initializeCanvas("canvasSimpleColorSSC", 300);
const canvasSimpleColorRSP = initializeCanvas("canvasSimpleColorRSP", 200);
const sliderSimpleColorWavelength = document.getElementById("sliderSimpleColorWavelength");
const divSimpleColor = document.getElementById("divSimpleColor");
initializeSliders(sliderSimpleColorWavelength, 0, 125, 1, 80);
var arraySimpleColorSPD = new Array(126).fill(0);
var arraySimpleColorRSP = [0, 0, 0];
var varSimpleColorPrevWavelength = 0;
sliderSimpleColorWavelength.addEventListener("input", updateSimpleColor);
drawSSC(canvasSimpleColorSSC);
function updateSimpleColor() {
    canvasSimpleColorSPD.clearRect(0, 0, WIDTH, 300);
    canvasSimpleColorRSP.clearRect(0, 0, WIDTH, 200);
    arraySimpleColorSPD[varSimpleColorPrevWavelength] = 0;
    varSimpleColorPrevWavelength = sliderSimpleColorWavelength.value;
    arraySimpleColorSPD[varSimpleColorPrevWavelength] = 1;
    drawSPD(canvasSimpleColorSPD, arraySimpleColorSPD);
    arraySimpleColorRSP = drawRSP(canvasSimpleColorRSP, arraySimpleColorSPD);
    colorBoxLMS(divSimpleColor, arraySimpleColorRSP);
    divSimpleColor.innerHTML = getNameWavelength(divSimpleColor, varSimpleColorPrevWavelength * 2.8 + 380);
}
updateSimpleColor();


const canvasRodsLightSPD = initializeCanvas("canvasRodsLightSPD", 300);
const canvasRodsLightSSC = initializeCanvas("canvasRodsLightSSC", 300);
const canvasRodsLightRSP = initializeCanvas("canvasRodsLightRSP", 250);
const sliderRodsLightWavelength = document.getElementById("sliderRodsLightWavelength");
const divRodsLight = document.getElementById("divRodsLight");
initializeSliders(sliderRodsLightWavelength, 0, 125, 1, 80);
var arrayRodsLightSPD = new Array(126).fill(0);
var arrayRodsLightRSP = [0, 0, 0];
var varRodsLightPrevWavelength = 0;
sliderRodsLightWavelength.addEventListener("input", updateRodsLight);
drawSSC(canvasRodsLightSSC, [COLORR].concat(LMSCOLORS), [RODMEANS].concat(LMSMEANS), [RODDEVNS].concat(LMSDEVNS), [1, 0.15, 0.15, 0.15]);
function updateRodsLight() {
    canvasRodsLightSPD.clearRect(0, 0, WIDTH, 300);
    canvasRodsLightRSP.clearRect(0, 0, WIDTH, 250);
    arrayRodsLightSPD[varRodsLightPrevWavelength] = 0;
    varRodsLightPrevWavelength = sliderRodsLightWavelength.value;
    arrayRodsLightSPD[varRodsLightPrevWavelength] = 1;
    drawSPD(canvasRodsLightSPD, arrayRodsLightSPD);
    arrayRodsLightRSP = drawRSP(canvasRodsLightRSP, arrayRodsLightSPD, LMSCOLORS.concat(COLORR), LMSMEANS.concat(RODMEANS), LMSDEVNS.concat(RODDEVNS), [1, 1, 1, 5000], LMSNORMS.concat(40), CONES.concat("R"));
    colorBoxLMS(divRodsLight, arrayRodsLightRSP);
}
updateRodsLight();


const canvasRodsDarkSPD = initializeCanvas("canvasRodsDarkSPD", 300);
const canvasRodsDarkSSC = initializeCanvas("canvasRodsDarkSSC", 300);
const canvasRodsDarkRSP = initializeCanvas("canvasRodsDarkRSP", 250);
const canvasRodsDarkBAR = initializeCanvas("canvasRodsDarkBAR", 50);
const sliderRodsDarkWavelength = document.getElementById("sliderRodsDarkWavelength");
const sliderRodsDarkSensitivityOverlap = document.getElementById("sliderRodsDarkSensitivityOverlap");
const divRodsDarkBox = document.getElementById("divRodsDarkBox");
const linkRodsDarkWavelengthA = document.getElementById("linkRodsDarkWavelengthA");
const linkRodsDarkWavelengthB = document.getElementById("linkRodsDarkWavelengthB");
initializeSliders(sliderRodsDarkWavelength, 0, 125, 1, 80);
var arrayRodsDarkSPD = new Array(126).fill(0);
var arrayRodsDarkRSP = [0, 0, 0, 0];
var arrayRodsDarkROD = [0, 0, 0];
var varRodsDarkPrevWavelength = 0;
sliderRodsDarkWavelength.addEventListener("input", updateRodsDark);
linkRodsDarkWavelengthA.addEventListener("click", () => { sliderRodsDarkWavelength.value = 40; updateRodsDark(); });
linkRodsDarkWavelengthB.addEventListener("click", () => { sliderRodsDarkWavelength.value = 56; updateRodsDark(); });
drawSSC(canvasRodsDarkSSC, [COLORR].concat(LMSCOLORS), [RODMEANS].concat(LMSMEANS), [RODDEVNS].concat(LMSDEVNS), [1, 0.15, 0.15, 0.15]);
drawSpectralBar(canvasRodsDarkBAR, [RODMEANS, RODMEANS, RODMEANS], [RODDEVNS, RODDEVNS, RODDEVNS], 4);
function updateRodsDark() {
    canvasRodsDarkSPD.clearRect(0, 0, WIDTH, 300);
    canvasRodsDarkRSP.clearRect(0, 0, WIDTH, 250);
    arrayRodsDarkSPD[varRodsDarkPrevWavelength] = 0;
    varRodsDarkPrevWavelength = sliderRodsDarkWavelength.value;
    arrayRodsDarkSPD[varRodsDarkPrevWavelength] = 0.1;
    drawSPD(canvasRodsDarkSPD, arrayRodsDarkSPD);
    arrayRodsDarkRSP = drawRSP(canvasRodsDarkRSP, arrayRodsDarkSPD, LMSCOLORS.concat(COLORR), LMSMEANS.concat(RODMEANS), LMSDEVNS.concat(RODDEVNS), [0.01, 0.01, 0.01, 10], LMSNORMS.concat(40), CONES.concat("R"), 0.063);
    arrayRodsDarkROD.fill(arrayRodsDarkRSP[3] * 0.5);
    colorBoxLMS(divRodsDarkBox, arrayRodsDarkROD);
}
updateRodsDark();


const canvasBlindSPD = initializeCanvas("canvasBlindSPD", 300);
const canvasBlindSSC = initializeCanvas("canvasBlindSSC", 300);
const canvasBlindRSP = initializeCanvas("canvasBlindRSP", 200);
const canvasBlindBAR = initializeCanvas("canvasBlindBAR", 50);
const sliderBlindWavelength = document.getElementById("sliderBlindWavelength");
const sliderBlindSensitivityOverlap = document.getElementById("sliderBlindSensitivityOverlap");
const divBlindBox = document.getElementById("divBlindBox");
const linkBlindWavelengthA = document.getElementById("linkBlindWavelengthA");
const linkBlindWavelengthB = document.getElementById("linkBlindWavelengthB");
initializeSliders(sliderBlindWavelength, 0, 125, 1, 80);
initializeSliders(sliderBlindSensitivityOverlap, LMSMEANS[1], LMSMEANS[0], 0.1, LMSMEANS[0]);
var arrayBlindSPD = new Array(126).fill(0);
var arrayBlindRSP = [0, 0, 0];
var varBlindPrevWavelength = 0;
sliderBlindWavelength.addEventListener("input", updateBlind);
sliderBlindSensitivityOverlap.addEventListener("input", updateBlindSensitivity);
linkBlindWavelengthA.addEventListener("click", () => { sliderBlindWavelength.value = 67; updateBlind(); });
linkBlindWavelengthB.addEventListener("click", () => { sliderBlindWavelength.value = 85; updateBlind(); });
function updateBlind() {
    canvasBlindSPD.clearRect(0, 0, WIDTH, 300);
    canvasBlindRSP.clearRect(0, 0, WIDTH, 200);
    arrayBlindSPD[varBlindPrevWavelength] = 0;
    varBlindPrevWavelength = sliderBlindWavelength.value;
    arrayBlindSPD[varBlindPrevWavelength] = 1;
    drawSPD(canvasBlindSPD, arrayBlindSPD);
    arrayBlindRSP = drawRSP(canvasBlindRSP, arrayBlindSPD, LMSCOLORS, [LMSMEANS[0], sliderBlindSensitivityOverlap.value, LMSMEANS[2]]);
    colorBoxLMS(divBlindBox, arrayBlindRSP);
}
function updateBlindSensitivity() {
    canvasBlindSSC.clearRect(0, 0, WIDTH, 300);
    drawSSC(canvasBlindSSC, LMSCOLORS, [LMSMEANS[0], sliderBlindSensitivityOverlap.value, LMSMEANS[2]]);
    drawSpectralBar(canvasBlindBAR, [LMSMEANS[0], sliderBlindSensitivityOverlap.value, LMSMEANS[2]]);
    updateBlind();
}
updateBlindSensitivity();


const canvasBlindBARNR = initializeCanvas("canvasBlindBARNR", 50);
const canvasBlindBARPP = initializeCanvas("canvasBlindBARPP", 50);
const canvasBlindBARDP = initializeCanvas("canvasBlindBARDP", 50);
const canvasBlindBARTP = initializeCanvas("canvasBlindBARTP", 50);
drawSpectralBar(canvasBlindBARNR);
drawSpectralBar(canvasBlindBARPP, [LMSMEANS[1], LMSMEANS[1], LMSMEANS[2]]);
drawSpectralBar(canvasBlindBARDP, [LMSMEANS[0], LMSMEANS[0], LMSMEANS[2]]);
drawSpectralBar(canvasBlindBARTP, [LMSMEANS[0], LMSMEANS[1], LMSMEANS[0]]);


const canvasNonSpectralSPD = initializeCanvas("canvasNonSpectralSPD", 300);
const canvasNonSpectralSSC = initializeCanvas("canvasNonSpectralSSC", 300);
const canvasNonSpectralRSP = initializeCanvas("canvasNonSpectralRSP", 200);
const divNonSpectral = document.getElementById("divNonSpectral");
const linkNonSpectralSPDGrey = document.getElementById("linkNonSpectralSPDGrey");
const linkNonSpectralSPDOlive = document.getElementById("linkNonSpectralSPDOlive");
const linkNonSpectralSPDPink = document.getElementById("linkNonSpectralSPDPink");
const linkNonSpectralSPDPurple = document.getElementById("linkNonSpectralSPDPurple");
var arrayNonSpectralSPD = new Array(126).fill(0);
var arrayNonSpectralRSP = [0, 0, 0];
var varNonSpectralMousedown = false;
drawSSC(canvasNonSpectralSSC);
linkNonSpectralSPDGrey.addEventListener("click", () => { arrayNonSpectralSPD = [...arraySPDGrey]; updateNonSpectral(); });
linkNonSpectralSPDOlive.addEventListener("click", () => { arrayNonSpectralSPD = [...arraySPDOlive]; updateNonSpectral(); });
linkNonSpectralSPDPink.addEventListener("click", () => { arrayNonSpectralSPD = [...arraySPDPink]; updateNonSpectral(); });
linkNonSpectralSPDPurple.addEventListener("click", () => { arrayNonSpectralSPD = [...arraySPDPurple]; updateNonSpectral(); });
canvasNonSpectralSPD.canvas.addEventListener("mousedown", () => { varNonSpectralMousedown = true; }); // unfortunately
canvasNonSpectralSPD.canvas.addEventListener("mouseup", () => { varNonSpectralMousedown = false; });  // idk a better way
canvasNonSpectralSPD.canvas.addEventListener("mouseout", () => { varNonSpectralMousedown = false; });
canvasNonSpectralSPD.canvas.addEventListener("mousemove", (evt) => {
    if (varNonSpectralMousedown) {
        getSPD(canvasNonSpectralSPD.canvas, arrayNonSpectralSPD, evt);
        updateNonSpectral(); } });
function updateNonSpectral() {
    canvasNonSpectralSPD.clearRect(0, 0, WIDTH, 300);
    canvasNonSpectralRSP.clearRect(0, 0, WIDTH, 200);
    drawSPD(canvasNonSpectralSPD, arrayNonSpectralSPD);
    arrayNonSpectralRSP = drawRSP(canvasNonSpectralRSP, arrayNonSpectralSPD);
    colorBoxLMS(divNonSpectral, arrayNonSpectralRSP);
}
updateNonSpectral();



// functions

function getSPD(canvas, spdArray, evt) {
    const rect = canvas.getBoundingClientRect();
    let wavelengthBin = (evt.clientX - rect.left) * (canvas.width / rect.width);
    let intensity = (evt.clientY - rect.top) * (canvas.height / rect.height);
    wavelengthBin = Math.floor((wavelengthBin - 15) / 10);
    intensity = Math.max(0, (canvas.height - 49 - intensity) / (canvas.height - 64));
    spdArray[wavelengthBin] = intensity;
}

function drawSpectralBar(canvas, means = LMSMEANS, deviations = LMSDEVNS, correction = 1, height = 50) {
    let spd = new Array(126).fill(0)
    canvas.lineWidth = 10;
    for (let i = 0; i < 125; i++) {
        spd[i] = 0;
        spd[i + 1] = correction;
        responses = getResponses(spd, means, deviations);
        let color = vectorMultiply(MATRIX_LMS_RGB, responses);
        canvas.strokeStyle = getColor(color);
        canvas.beginPath();
        canvas.moveTo(i * 10 + 15, 0);
        canvas.lineTo(i * 10 + 15, 50);
        canvas.stroke();
    }
}

function drawRSP(canvas, values = ARRAYRSPSAT, colors = LMSCOLORS, means = LMSMEANS, deviations = LMSDEVNS, magnitudes = LMSMAGNS, norms = LMSNORMS, cones = CONES, correction = 1, y = 200, width = 2) {
    canvas.lineWidth = width;
    initializeCanvasText(canvas, "#000", "right");
    let responseSum = new Array(colors.length).fill(0);
    let valueSum = new Array(colors.length).fill(0);
    let y_n = 0;
    for (let c = 0; c < colors.length; c++) {
        canvas.strokeStyle = colors[c];
        canvas.beginPath();
        canvas.moveTo(15, c * 60 + 65);
        for (let i = 0; i < 126; i++) {
            y_n = Math.min(values[i] * magnitudes[c] * (2.7 ** -(((i - means[c])/deviations[c]) ** 2)), 1);
            canvas.lineTo(i * 10 + 15, c * 60 + 65 - (y * 0.25 * y_n));
            responseSum[c] += y_n;
            valueSum[c] += values[i];
        }
        canvas.stroke();
        canvas.lineTo(1265, c * 60 + 65);
        canvas.fillStyle = colors[c];
        canvas.fill();
        if (valueSum[c] == 0) { responseSum[c] = 0; } // prevent div by zero
        // higher weightage for single wavelength
        else { responseSum[c] = correction * responseSum[c] /  Math.min(valueSum[c] ** 1.2, norms[c]); }
        canvas.fillText(cones[c] + ":" + responseSum[c].toFixed(3), 1265, c * 60 + 49);
    }
    return responseSum;
}

function drawSSC(canvas, colors = LMSCOLORS, means = LMSMEANS, deviations = LMSDEVNS, magnitudes = LMSMAGNS, y = 300, width = 2) {
    canvas.lineWidth = width;
    for (let c = 0; c < colors.length; c++) {
        canvas.strokeStyle = colors[c];
        canvas.beginPath();
        canvas.moveTo(15, y - 49);
        for (let i = 0; i < 126; i++)
            canvas.lineTo(i * 10 + 15, y * (1 - 0.76 * magnitudes[c] * (2.7 ** -(((i - means[c])/deviations[c]) ** 2))) - 49);
        canvas.stroke();
    }
    drawWavelengthAxes(canvas, y, "#000", 2);
}

function drawSPD(canvas, values, color = "#000", colorAxes = "#000", y = 300, width = 2) {
    canvas.lineWidth = width;
    canvas.strokeStyle = color;
    canvas.beginPath();
    canvas.moveTo(15, y - 55);
    for (let i = 0; i < 126; i++)
        canvas.lineTo(i * 10 + 15, y * (1 - values[i] * 0.76) - 49);
    canvas.stroke();
    drawWavelengthAxes(canvas, y, colorAxes, 2);
}

function drawWavelengthAxes(canvas, y = 300, color = "#000", width = 2) {
    canvas.lineWidth = width;
    canvas.strokeStyle = color;
    canvas.beginPath();
    canvas.moveTo(15, 15);
    canvas.lineTo(15, y - 45);
    canvas.lineTo(WIDTH - 15, y - 45);
    canvas.stroke();
    initializeCanvasText(canvas);
    for (let i = 0; i < 7; i++)
        canvas.fillText(i * 50 + 400 + "nm", i * 180 + 100, y - 25);
}

function drawPhoton(canvas, wavelength, x, y, length = 200, amplitude = 75, color = "#000", width = 2) {
    canvas.lineWidth = width;
    canvas.strokeStyle = color;
    canvas.beginPath();
    canvas.moveTo(x, y);
    for (let i = 0; i < length; i++) {
        canvas.lineTo(x + i, y + amplitude * Math.sin(3.14 * i / length) * Math.sin(i * wavelength));
    }
    canvas.stroke();
}

function getResponses(values = ARRAYRSPSAT, means = LMSMEANS, deviations = LMSDEVNS, magnitudes = LMSMAGNS, norms = LMSNORMS) {
    let responseSum = new Array(means.length).fill(0);
    let valueSum = new Array(means.length).fill(0);
    let y_n = 0;
    for (let c = 0; c < means.length; c++) {
        for (let i = 0; i < 126; i++) {
            responseSum[c] += values[i] * magnitudes[c] * (2.7 ** -(((i - means[c])/deviations[c]) ** 2));
            valueSum[c] += values[i];
        }
        responseSum[c] = responseSum[c] /  Math.min(valueSum[c] ** 1.2, norms[c]);
    }
    return responseSum;
}

function getColor(rgbArray) {
    let r = Math.floor(Math.max(0, Math.min(rgbArray[0], 1)) * 255);
    let g = Math.floor(Math.max(0, Math.min(rgbArray[1], 1)) * 255);
    let b = Math.floor(Math.max(0, Math.min(rgbArray[2], 1)) * 255);
    return `rgb(${r}, ${g}, ${b})`
}

function colorBoxLMS(div, lmsArray) {
    let color = vectorMultiply(MATRIX_LMS_RGB, lmsArray);
    div.style.backgroundColor = getColor(color);
}

function getNameWavelength(div, wavelength) {
    if (wavelength < 480 || wavelength > 620) { div.style.color = "#fff";
    } else div.style.color = "#000";
    if (wavelength >= 380 && wavelength < 430) { return "Violet"; }
    else if (wavelength >= 430 && wavelength < 500) { return "Blue"; }
    else if (wavelength >= 500 && wavelength < 520) { return "Cyan"; }
    else if (wavelength >= 520 && wavelength < 570) { return "Green"; }
    else if (wavelength >= 570 && wavelength < 580) { return "Yellow"; }
    else if (wavelength >= 580 && wavelength < 630) { return "Orange"; }
    else if (wavelength >= 630 && wavelength < 740) { return "Red"; }
    else { return "None"; }
}

function vectorMultiply(matrix, vector) {
    let result = [0, 0, 0];
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
        result[i] += matrix[i][j] * vector[j];
    return result;
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

/* const CIE_X = [
    { wavelength: 380, value: 0.001368 },
    { wavelength: 390, value: 0.004243 },
    { wavelength: 400, value: 0.014310 },
    { wavelength: 410, value: 0.043510 },
    { wavelength: 420, value: 0.134730 },
    { wavelength: 430, value: 0.283780 },
    { wavelength: 440, value: 0.348560 },
    { wavelength: 450, value: 0.348060 },
    { wavelength: 460, value: 0.336200 },
    { wavelength: 470, value: 0.290800 },
    { wavelength: 480, value: 0.195040 },
    { wavelength: 490, value: 0.080750 },
    { wavelength: 500, value: 0.020290 },
    { wavelength: 510, value: 0.004900 },
    { wavelength: 520, value: 0.009638 },
    { wavelength: 530, value: 0.063140 },
    { wavelength: 540, value: 0.161000 },
    { wavelength: 550, value: 0.289800 },
    { wavelength: 560, value: 0.432440 },
    { wavelength: 570, value: 0.565730 },
    { wavelength: 580, value: 0.677620 },
    { wavelength: 590, value: 0.762060 },
    { wavelength: 600, value: 0.841530 },
    { wavelength: 610, value: 0.912040 },
    { wavelength: 620, value: 0.965350 },
    { wavelength: 630, value: 0.998300 },
    { wavelength: 640, value: 1.000000 },
    { wavelength: 650, value: 0.968600 },
    { wavelength: 660, value: 0.867000 },
    { wavelength: 670, value: 0.757000 },
    { wavelength: 680, value: 0.631000 },
    { wavelength: 690, value: 0.503000 },
    { wavelength: 700, value: 0.381000 }
];

const CIE_Y = [
    { wavelength: 380, value: 0.000039 },
    { wavelength: 390, value: 0.000120 },
    { wavelength: 400, value: 0.000396 },
    { wavelength: 410, value: 0.001210 },
    { wavelength: 420, value: 0.004000 },
    { wavelength: 430, value: 0.011600 },
    { wavelength: 440, value: 0.023000 },
    { wavelength: 450, value: 0.038000 },
    { wavelength: 460, value: 0.060000 },
    { wavelength: 470, value: 0.090980 },
    { wavelength: 480, value: 0.139700 },
    { wavelength: 490, value: 0.208020 },
    { wavelength: 500, value: 0.323000 },
    { wavelength: 510, value: 0.503000 },
    { wavelength: 520, value: 0.714160 },
    { wavelength: 530, value: 0.917300 },
    { wavelength: 540, value: 1.061550 },
    { wavelength: 550, value: 1.108800 },
    { wavelength: 560, value: 1.074600 },
    { wavelength: 570, value: 0.973000 },
    { wavelength: 580, value: 0.813000 },
    { wavelength: 590, value: 0.654000 },
    { wavelength: 600, value: 0.498000 },
    { wavelength: 610, value: 0.370000 },
    { wavelength: 620, value: 0.270000 },
    { wavelength: 630, value: 0.190000 },
    { wavelength: 640, value: 0.126000 },
    { wavelength: 650, value: 0.081000 },
    { wavelength: 660, value: 0.048000 },
    { wavelength: 670, value: 0.028000 },
    { wavelength: 680, value: 0.017000 },
    { wavelength: 690, value: 0.010000 },
    { wavelength: 700, value: 0.005800 }
];

const CIE_Z = [
    { wavelength: 380, value: 0.006450 },
    { wavelength: 390, value: 0.020020 },
    { wavelength: 400, value: 0.067850 },
    { wavelength: 410, value: 0.207400 },
    { wavelength: 420, value: 0.645600 },
    { wavelength: 430, value: 1.385600 },
    { wavelength: 440, value: 1.747700 },
    { wavelength: 450, value: 1.839400 },
    { wavelength: 460, value: 1.726700 },
    { wavelength: 470, value: 1.295600 },
    { wavelength: 480, value: 0.812800 },
    { wavelength: 490, value: 0.465180 },
    { wavelength: 500, value: 0.272000 },
    { wavelength: 510, value: 0.158800 },
    { wavelength: 520, value: 0.078250 },
    { wavelength: 530, value: 0.028370 },
    { wavelength: 540, value: 0.103600 },
    { wavelength: 550, value: 0.323000 },
    { wavelength: 560, value: 0.714160 },
    { wavelength: 570, value: 1.268000 },
    { wavelength: 580, value: 1.916000 },
    { wavelength: 590, value: 2.527000 },
    { wavelength: 600, value: 3.064000 },
    { wavelength: 610, value: 3.477000 },
    { wavelength: 620, value: 3.761000 },
    { wavelength: 630, value: 3.863000 },
    { wavelength: 640, value: 3.782000 },
    { wavelength: 650, value: 3.487000 },
    { wavelength: 660, value: 3.026000 },
    { wavelength: 670, value: 2.513000 },
    { wavelength: 680, value: 1.982000 },
    { wavelength: 690, value: 1.503000 },
    { wavelength: 700, value: 1.107000 }
];

function drawCIEXYZDiagram() {
    const canvas = document.getElementById('xyzCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    // Normalize data
    const normalizeData = (data) => {
        const max = Math.max(...data.map(d => d.value));
        return data.map(d => ({
            wavelength: d.wavelength,
            normalizedValue: d.value / max
        }));
    };

    const normalizedX = normalizeData(CIE_X);
    const normalizedY = normalizeData(CIE_Y);
    const normalizedZ = normalizeData(CIE_Z);

    // Draw axes and labels
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, height - 50);
    ctx.lineTo(50, 50);
    ctx.lineTo(width - 50, 50);
    ctx.stroke();

    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Wavelength (nm)', width / 2, height - 10);
    ctx.save();
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Normalized Color Matching Function', -height / 2, 20);
    ctx.restore();

    // Draw wavelength ticks
    const drawColorMatchingFunction = (data, color) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        data.forEach((point, index) => {
            const x = 50 + ((point.wavelength - 380) / 320) * (width - 100);
            const y = height - 50 - (point.normalizedValue * (height - 100));

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();
    };

    // Draw color matching functions
    drawColorMatchingFunction(normalizedX, 'red');
    drawColorMatchingFunction(normalizedY, 'green');
    drawColorMatchingFunction(normalizedZ, 'blue');

    // Legend
    ctx.fillStyle = 'black';
    ctx.fillText('x̄(λ)', width - 100, 70);
    ctx.fillStyle = 'green';
    ctx.fillText('ȳ(λ)', width - 100, 90);
    ctx.fillStyle = 'blue';
    ctx.fillText('z̄(λ)', width - 100, 110);
}

// Draw the diagram when the page loads
window.onload = drawCIEXYZDiagram;
    const canvas = document.getElementById('colorWheel');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;

    // Draw the color wheel
    function drawColorWheel() {
      const numSegments = 360;  // Number of segments in the color wheel
      const angleStep = (2 * Math.PI) / numSegments;  // Angle for each segment
      
      // Loop through each angle and draw a segment
      for (let i = 0; i < numSegments; i++) {
        const startAngle = i * angleStep;
        const endAngle = (i + 1) * angleStep;

        // HSL values
        const hue = i;  // The hue varies from 0 to 360
        const saturation = 1;  // Full saturation
        const lightness = 0.5;  // Mid-level lightness

        // Convert HSL to RGB
        const rgb = hslToRgb(hue, saturation, lightness);

        // Set the fill color
        ctx.fillStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

        // Draw the segment as a pie slice
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);  // Move to the center of the canvas
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);  // Draw the arc
        ctx.closePath();
        ctx.fill();  // Fill the segment with the color
      }
    }

    // Convert HSL to RGB
    function hslToRgb(h, s, l) {
      const c = (1 - Math.abs(2 * l - 1)) * s;  // Chroma
      const x = c * (1 - Math.abs((h / 60) % 2 - 1));  // Temporary value
      const m = l - c / 2;  // Match value

      let r = 0, g = 0, b = 0;

      if (h >= 0 && h < 60) {
        r = c; g = x; b = 0;
      } else if (h >= 60 && h < 120) {
        r = x; g = c; b = 0;
      } else if (h >= 120 && h < 180) {
        r = 0; g = c; b = x;
      } else if (h >= 180 && h < 240) {
        r = 0; g = x; b = c;
      } else if (h >= 240 && h < 300) {
        r = x; g = 0; b = c;
      } else if (h >= 300 && h < 360) {
        r = c; g = 0; b = x;
      }

      // Convert to RGB values
      r = Math.round((r + m) * 255);
      g = Math.round((g + m) * 255);
      b = Math.round((b + m) * 255);

      return { r, g, b };
    }

    // Initial call to draw the color wheel
    drawColorWheel();
*/
