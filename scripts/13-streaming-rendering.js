// could be more efficient, but works decently fast

const WIDTH = 1280;
const HEIGHT = 640;

const canvasWaves = document.getElementById("canvasWaves").getContext("2d");
canvasWaves.canvas.width = WIDTH;
canvasWaves.canvas.height = HEIGHT;

const sliderWavl1 = document.getElementById("sliderWavl1");
const sliderAmpl1 = document.getElementById("sliderAmpl1");
const sliderPhas1 = document.getElementById("sliderPhas1");
const sliderWavl2 = document.getElementById("sliderWavl2");
const sliderAmpl2 = document.getElementById("sliderAmpl2");
const sliderPhas2 = document.getElementById("sliderPhas2");
const sliderDistance = document.getElementById("sliderDistance");
initializeSliders(sliderWavl1, 10, 50, 1, 20);
initializeSliders(sliderAmpl1, 0, 50, 1, 40);
initializeSliders(sliderPhas1, 0, 1, 0.05, 0);
initializeSliders(sliderWavl2, 10, 50, 1, 20);
initializeSliders(sliderAmpl2, 0, 50, 1, 40);
initializeSliders(sliderPhas2, 0, 1, 0.05, 0);
initializeSliders(sliderDistance, 0, 300, 1, 50);

sliderWavl1.addEventListener("input", updateCanvas);
sliderAmpl1.addEventListener("input", updateCanvas);
sliderPhas1.addEventListener("input", updateCanvas);
sliderWavl2.addEventListener("input", updateCanvas);
sliderAmpl2.addEventListener("input", updateCanvas);
sliderPhas2.addEventListener("input", updateCanvas);
sliderDistance.addEventListener("input", updateCanvas);

let col1, col2;
updateCanvas();

function updateCanvas() {
    col1 = 255 - Math.floor(sliderAmpl1.value * 5);
    col2 = 255 - Math.floor(sliderAmpl2.value * 5);
    canvasWaves.clearRect(0, 0, WIDTH, HEIGHT);
    drawCircles(canvasWaves, Number(sliderWavl1.value), sliderPhas1.value * sliderWavl1.value, Number(sliderDistance.value), `rgb(${col1} ${col1} ${col1})`);
    drawCircles(canvasWaves, Number(sliderWavl2.value), sliderPhas2.value * sliderWavl2.value, Number(-sliderDistance.value), `rgb(${col2} ${col2} ${col2})`);
    canvasWaves.clearRect(1000, 0, 280, HEIGHT);
    drawLine(canvasWaves, 1141, 0, 1141, 640);
    drawWaves(canvasWaves, Number(sliderWavl1.value), Number(sliderAmpl1.value), Number(sliderPhas1.value), Number(sliderWavl2.value), Number(sliderAmpl2.value), Number(sliderPhas2.value), Number(sliderDistance.value));
}

function drawWaves(canvas, wavelengthA, amplitudeA, phaseA, wavelengthB, amplitudeB, phaseB, distance, color = "#000", x = 1000) {
    let argA, argB, val;
    canvas.lineWidth = 2;
    canvas.strokeStyle = color;
    canvas.beginPath();
    canvas.moveTo(1141, -2);
    for (let i = -2; i <= HEIGHT; i += 2) {
        canvas.lineTo(val, i);
        distA = (Math.sqrt(x**2 + (HEIGHT / 2 + distance - i)**2) + phaseA * wavelengthA) % wavelengthA;
        distB = (Math.sqrt(x**2 + (HEIGHT / 2 - distance - i)**2) + phaseB * wavelengthB) % wavelengthB;
        val = x + 141 + amplitudeA * Math.sin(6.28 * distA / wavelengthA) + amplitudeB * Math.sin(6.28 * distB / wavelengthB);
    }
    canvas.stroke();
}

function drawCircles(canvas, wavelength, phase, distance, color = "#000") {
    canvas.lineWidth = 2;
    canvas.strokeStyle = color;
    canvas.beginPath();
    let centerY = (HEIGHT / 2);
    for (let i = 0; i < WIDTH; i += wavelength) {
        canvas.arc(-1 + phase, centerY + distance, i, -1.57, 4.71);
    }
    canvas.stroke();
}

function drawLine(canvas, x1, y1, x2, y2, color = "#aaa"){
    canvas.lineWidth = 2;
    canvas.strokeStyle = color;
    canvas.beginPath();
    canvas.moveTo(x1, y1);
    canvas.lineTo(x2, y2);
    canvas.stroke();
}

function initializeSliders(slider, minimum, maximum, step, value) {
    slider.min = minimum;
    slider.max = maximum;
    slider.step = step;
    slider.value = value;
}
