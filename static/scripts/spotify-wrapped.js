const WIDTH = 1280;
const UNIT_SQUARE = 16;
const STROKE_WIDTH = UNIT_SQUARE / 16;
const STROKE_WIDTH_HIGHLIGHT = UNIT_SQUARE / 4;
const HIGHLIGHT_COLOR = "#000";
const YEAR_HEATMAP_ROWS = 7;   // days of week
const YEAR_HEATMAP_COLS = 53;  // weeks of year
const DATA = 20;

const mainChart = document.getElementById("mainChart");
const heatmap1Array = Array.from({ length: 52 }, () => Array.from({ length: 7 }, () => Math.random()));
initChart(mainChart, 1);
initHeatmap(mainChart, heatmap1Array);
initDayBox(mainChart);

function initChart(chart, heatmaps) {
    const viewWidth = (YEAR_HEATMAP_COLS + 1) * UNIT_SQUARE;
    const viewHeight = (YEAR_HEATMAP_ROWS + 4) * (heatmaps + 1) * UNIT_SQUARE;
    const width = WIDTH;
    const height = Math.round(width * viewHeight / viewWidth);
    chart.setAttribute("width", width);
    chart.setAttribute("height", height);
    chart.setAttribute("viewBox", `0 0 ${viewWidth} ${viewHeight}`);
}

function initDayBox(chart, yOffset = UNIT_SQUARE * 12, xOffset = UNIT_SQUARE) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", xOffset);
    rect.setAttribute("y", yOffset);
    rect.setAttribute("width", (YEAR_HEATMAP_COLS - 1) * UNIT_SQUARE);
    rect.setAttribute("height", UNIT_SQUARE * 10);
    rect.setAttribute("fill", "none");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", STROKE_WIDTH);
    chart.appendChild(rect);
    for (let section = 0; section < 6; section++) {
        for (let hour = 0; hour < 4; hour++) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", UNIT_SQUARE * (hour + 1) + xOffset);
        circle.setAttribute("cy", UNIT_SQUARE * (section + 4) + yOffset);
        circle.setAttribute("r", UNIT_SQUARE / 3);
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", "black");
        circle.setAttribute("stroke-width", STROKE_WIDTH);
        chart.appendChild(circle);
        }
    }
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M0 4 24 4M18 4A3 3 90 006 4M6-2 3-5M12-5 12-9.5M18-2 21-5");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "black");
    path.setAttribute("stroke-width", STROKE_WIDTH);
    path.setAttribute("transform", `translate(${xOffset + UNIT_SQUARE * 4.8}, ${yOffset + UNIT_SQUARE * 4})`);
    chart.appendChild(path);
    
    const newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    newPath.setAttribute("d", "M8-9C4-3 7 5 17 4 5 14-3-5 8-9");
    newPath.setAttribute("fill", "none");
    newPath.setAttribute("stroke", "black");
    newPath.setAttribute("stroke-width", STROKE_WIDTH);
    newPath.setAttribute("transform", `translate(${xOffset + UNIT_SQUARE * 4.8}, ${yOffset + UNIT_SQUARE * 9})`);
    chart.appendChild(newPath);
}

function initHeatmap(chart, values, yOffset = 3 * UNIT_SQUARE, xOffset = UNIT_SQUARE) {
    const cellSize = UNIT_SQUARE;
    const gapSize = UNIT_SQUARE * 0.1;
    const weeks = values.length;
    const days = values[0].length;
    let selected = null;
    
    for (let week = 0; week < weeks; week++) {
        for (let day = 0; day < days; day++) {
            const value = values[week][day];
            const color = `rgba(0, 0, 0, ${value})`;
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", week * cellSize + xOffset);
            rect.setAttribute("y", day * cellSize + yOffset);
            rect.setAttribute("width", cellSize - gapSize);
            rect.setAttribute("height", cellSize - gapSize);
            rect.setAttribute("fill", color);
            rect.setAttribute("stroke-width", STROKE_WIDTH_HIGHLIGHT);

            rect.dataset.day = day;
            rect.dataset.week = week;

            const updateStroke = (highlight) => rect.setAttribute("stroke", highlight ? HIGHLIGHT_COLOR : "none");
            rect.addEventListener("mouseenter", () => { console.log({day: day, col: week}); updateStroke(true); });
            rect.addEventListener("mouseleave", () => { updateStroke(false); });
            chart.appendChild(rect);
        }
    }
}
