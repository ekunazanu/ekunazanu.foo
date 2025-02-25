const WIDTH = 1280;

const canvasCaesar = initializeCanvas("canvasCaesar", 500);
const sliderCaesar = initializeSliders("sliderCaesar", 0, 25, 1, 0);
const spanCaesar = document.getElementById("spanCaesar");
initializeCanvasText(canvasCaesar);
sliderCaesar.addEventListener("input", updateCaesar);
function updateCaesar() {
    drawTextBox(canvasCaesar, "HELLO");
    spanCaesar.innerHTML = sliderCaesar.value;
}
updateCaesar();



// functions

function drawTextBox(canvas, text, height = 300) {
    for (let i = 0; i < 30; i++) {
        drawText(text[i], );
    }
}

function drawText(text, x, y) {
    canvas.aaaaa;
}

function initializeProgressBar(bar, maximum, value) {
    bar.max = maximum;
    bar.value = value;
}

function initializeSliders(sliderID, minimum, maximum, step, value) {
    const slider = document.getElementById(sliderID);
    slider.min = minimum;
    slider.max = maximum;
    slider.step = step;
    slider.value = value;
    return slider;
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
