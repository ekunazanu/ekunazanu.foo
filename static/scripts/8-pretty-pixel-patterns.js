var canvasList = []
const scale = 2;
for (let i = 0; i < 13; i++) {
    canvasList[i] = document.getElementById(`canvas${i}`).getContext("2d");
    canvasList[i].canvas.width = 512 * scale;
    canvasList[i].canvas.height = 256 * scale;
}

async function generatePattern(canvasCurr, rFunc, gFunc, bFunc) {
    const width = canvasCurr.canvas.width;
    const height = canvasCurr.canvas.height;
    const imageData = canvasCurr.createImageData(width, height);
    const data = imageData.data;
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const index = (y * width + x) * 4;
            data[index]     = (rFunc(x/scale, y/scale)) % 0x100;
            data[index + 1] = (gFunc(x/scale, y/scale)) % 0x100;
            data[index + 2] = (bFunc(x/scale, y/scale)) % 0x100;
            data[index + 3] = 0xFF;
        }
    }
    canvasCurr.putImageData(imageData, 0, 0);
}

generatePattern(canvasList[0], (x,y)=> x, (x,y)=> y, (x,y)=> x^0xFF);
generatePattern(canvasList[1], (x,y)=> x+y, (x,y)=> x+y, (x,y)=> x+y);
generatePattern(canvasList[2], (x,y)=> x+y, (x,y)=> x+y+85, (x,y)=> x+y+171);
generatePattern(canvasList[3], (x,y)=> 0, (x,y)=> (x % 0x100) % (y % 0x100)/2, (x,y)=> (x % 0x100) % (y % 0x100));
generatePattern(canvasList[4], (x,y)=> x, (x,y)=> x^y, (x,y)=> x+y);
generatePattern(canvasList[5], (x,y)=> 0x3F, (x,y)=> scale*x*x+scale*y*y, (x,y)=> 0xAF);
generatePattern(canvasList[6], (x,y)=> ((scale*x*x-scale*y*y) % 0x100) + 0x100, (x,y)=> ((scale*x*x-scale*y*y) % 0x100) + 0x100, (x,y)=> ((scale*x*x-scale*y*y) % 0x100) + 0x100);
generatePattern(canvasList[7], (x,y)=> 0xFF, (x,y)=> ((x&y) % 0x100) * y, (x,y)=> x);
generatePattern(canvasList[8], (x,y)=> 0, (x,y)=> (x^y)*(x^y), (x,y)=> 0);
generatePattern(canvasList[9], (x,y)=> (((x*x*scale*scale)&y)*y), (x,y)=> (((x*x*scale*scale)&y)*y), (x,y)=> 0x20); // the correct scaling not multiply twice, but it looks bad
generatePattern(canvasList[10], (x,y)=> 0, (x,y)=> ((x*y) % 0x100)*((x*y) % 0x100) * scale*scale*scale, (x,y)=> ((x*y) % 0x100)*((x*y) % 0x100)*((x*y) % 0x100) * scale*scale*scale*scale*scale);
generatePattern(canvasList[11], (x,y)=> (x^((((x*x*y*y)%0x100)*scale*scale*scale) % 0x100))&y, (x,y)=> 0, (x,y)=> 0);
generatePattern(canvasList[12], (x,y)=> ((x*scale)^((((x*x*y*y)%0x100)*scale*scale*scale) % 0x100))/2, (x,y)=> (y^((((x*x*y*y)%0x100)*scale*scale*scale) % 0x100)), (x,y)=> (x^y^((((x*x*y*y)%0x100)*scale*scale*scale) % 0x100)));
