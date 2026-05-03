const WIDTH = 1280;
const graphColors = ["#922", "#6a8", "#22d", "#777"];
const pingLatencies = [
    [ // without wireguard
        [1864, 19.4, 18.8, 43.1, 20.0, 19.2, 16.9, 22.1, 25.1, 17.1, 65.2, 19.0, 224, 29.5, 116, 54.5, 17.5, 18.8, 17.7, 21.0, 18.3, 19.3, 18.3, 18.4, 17.0, 22.2, 17.3, 23.4, 17.3, 17.8, 18.6, 19.3, 17.2, 19.5, 17.5, 16.9, 18.3, 18.4, 20.7, 28.8, 17.1, 17.2, 21.0, 17.0, 17.7, 16.9, 18.7, 19.5, 17.8, 17.4, 17.6, 26.8, 74.5, 18.8, 18.2, 18.4, 17.4, 17.2, 18.4, 17.3],
        [1611, 18.8, 17.6, 21.4, 20.0, 16.7, 24.3, 20.5, 17.9, 19.4, 16.9, 22.7, 18.0, 18.1, 19.1, 19.5, 19.9, 17.5, 21.0, 17.6, 20.2, 19.6, 18.0, 20.1, 19.3, 19.4, 17.3, 17.1, 20.1, 17.8, 17.0, 17.7, 18.7, 22.5, 19.5, 19.5, 17.5, 19.0, 17.3, 17.3, 17.4, 18.8, 18.4, 17.6, 19.7, 17.2, 119, 17.5, 110, 39.6, 105, 97.7, 18.9, 18.3, 17.1, 27.7, 22.2, 17.7, 18.5, 18.0],
        [1398, 17.4, 20.3, 17.3, 18.5, 18.1, 16.9, 18.9, 17.3, 19.0, 17.1, 19.6, 18.6, 19.2, 20.0, 22.0, 136, 32.1, 128, 56.9, 99.6, 116, 17.8, 17.9, 17.5, 19.5, 18.0, 18.8, 17.5, 17.2, 17.7, 17.7, 17.7, 18.9, 18.3, 18.8, 17.4, 17.4, 28.2, 18.1, 18.6, 20.1, 30.2, 17.8, 18.1, 18.2, 23.4, 18.2, 17.9, 22.1, 17.7, 18.2, 18.0, 19.5, 18.0, 19.8, 18.5, 20.2, 18.9, 18.9],
        [1727, 17.7, 17.7, 17.7, 18.9, 18.3, 18.8, 17.4, 17.4, 28.2, 18.1, 18.6, 20.1, 30.2, 17.8, 18.1, 18.2, 23.4, 18.2, 17.9, 22.1, 17.7, 18.2, 18.0, 19.5, 18.0, 19.8, 18.5, 20.2, 18.9]
    ],
    [ // with wireguard
        [199, 213, 199, 203, 199, 199, 201, 299, 217, 309, 356, 262, 285, 201, 199, 200, 200, 200, 204, 201, 200, 200, 200, 201, 200, 200, 200, 206, 201, 199, 202, 200, 253, 199, 201, 200, 212, 199, 201, 206, 201, 200, 201, 200, 207, 200, 199, 200, 199, 341, 205, 198, 199, 201, 229, 202, 237, 200, 209, 200],
        [200, 199, 201, 198, 198, 200, 199, 198, 200, 199, 216, 198, 200, 240, 271, 320, 300, 291, 200, 204, 198, 199, 224, 199, 200, 198, 201, 200, 199, 198, 198, 199, 201, 201, 199, 200, 199, 199, 206, 200, 199, 200, 198, 199, 200, 207, 199, 198, 200, 201, 228, 200, 199, 200, 235, 199, 200, 200, 200, 199],
        [198, 198, 198, 199, 201, 199, 214, 198, 202, 198, 208, 198, 198, 198, 198, 198, 201, 199, 214, 305, 281, 328, 307, 222, 205, 199, 199, 205, 200, 200, 198, 200, 207, 200, 199, 199, 230, 200, 201, 199, 199, 203, 200, 199, 199, 207, 199, 200, 198, 212, 202, 198, 202, 199, 199, 199, 200, 199, 204, 199],
        [199, 214, 203, 202, 202, 200, 201, 210, 200, 199, 199, 212, 200, 203, 203, 199, 201, 199, 207, 227, 226, 200, 200, 199, 202, 200, 200, 199, 205, 273]
    ],
];

let canvasLatencies = [];
for (let canvas = 0; canvas < pingLatencies.length; canvas++) {
    canvasLatencies[canvas] = initializeCanvas(`canvasLatencyGraph${canvas}`, 300);
    console.log(canvas, canvasLatencies[canvas])
    for (let line = 0; line < pingLatencies[canvas].length; line++)
        drawGraph(canvasLatencies[canvas], pingLatencies[canvas][line], graphColors[line], line * 30); // 30 is wait time 
    drawAxes(canvasLatencies[canvas]);
}

function drawGraph(canvas, values, color = "#000", start = 0, end = 60, scale = 1 / 2000, colorAxes = "#000", y = 300, width = 2) {
    canvas.lineWidth = width;
    canvas.strokeStyle = color;
    canvas.beginPath();
    canvas.moveTo(start * 10 + 55, y * (1 - values[0] * scale * 0.76) - 49);
    for (let i = 0; i < 60; i++)
        canvas.lineTo((i + start) * 10 + 55, y * (1 - values[i] * scale * 0.76) - 49);
    canvas.stroke();
    console.log(values, start, end);
}

function drawAxes(canvas, y = 300, color = "#000", width = 2) {
    canvas.lineWidth = width;
    canvas.strokeStyle = color;
    canvas.beginPath();
    canvas.moveTo(55, 15);
    canvas.lineTo(55, y - 45);
    canvas.lineTo(WIDTH - 35, y - 45);
    canvas.stroke();
    initializeCanvasText(canvas);
    for (let i = 0; i < 6; i++)
        canvas.fillText(i * 20 + "s", i * 200 + 55, y - 25);
    canvas.fillText("1s", 25, (y - 60) / 2 + 15);
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
