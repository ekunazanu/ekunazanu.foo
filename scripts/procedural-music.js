// primary audiocontext node
const audioContext = new AudioContext();

// scale interval table to construct sequences
const INTERVALS = {
    "chromatic": [true, true, true, true, true, true, true, true, true, true, true, true, true],
    "major": [true, false, true, false, true, true, false, true, false, true, false, true, true],
    "harmonic major": [true, false, true, false, true, true, false, true, true, false, false, true, true],
    "minor":  [true, false, true, true, false, true, false, true, true, false, true, false, true],
    "harmonic minor":  [true, false, true, true, false, true, false, true, true, false, false, true, true],
    "pentatonic major": [true, false, true, false, true, false, false, true, false, true, false, false, true],
    "pentatonic minor": [true, false, false, true, false, true, false, true, false, false, true, false, true],
};
const INTERVALNAMES = ["chromatic", "major", "harmonic major", "minor", "harmonic minor", "pentatonic major", "pentatonic minor"];

// chord intervals
const CHORDS = {
    "major": [true, false, false, false, true, false, false, true, false, false, false, false, false],
    "minor":  [true, false, false, true, false, false, false, true, false, false, false, false, false],
    "augmented":  [true, false, false, false, true, false, false, false, true, false, false, false, false],
    "diminished":  [true, false, false, true, false, false, true, false, false, false, false, false, false],
    "suspended2":  [true, false, true, false, false, false, false, true, false, false, false, false, false],
    "suspended4":  [true, false, false, false, false, true, false, true, false, false, false, false, false],
    "major7": [true, false, false, false, true, false, false, true, false, false, false, true, false],
    "minor7":  [true, false, false, true, false, false, false, true, false, false, true, false, false],
    "dominant7":  [true, false, false, false, true, false, false, true, false, false, true, false, false],
};

const CHORDPROGRESSION = {
    "diatonicmajor": ["major", "minor", "minor", "major", "major", "minor", "diminished", "major"],
    "diatonicminor": ["minor", "diminished", "major", "minor", "minor", "major", "major", "minor"],
    "pentatonicmajor": ["major", "minor", "major", "major", "major", "major"],
    "pentatonicminor": ["minor", "major", "diminished", "major", "major", "minor"],
};

const CHORDNAMES = ["major", "minor", "augmented", "diminished", "suspended2", "suspended4", "major7", "minor7", "dominant7"];

// used for drawing canvas items
const NOTES = {
    letters: ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"],
    numbers: ["A4", "A#4", "B4", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A5"],
    intervals: ["P1", "m2", "M2", "m3", "M3", "P4", "TT", "P5", "m6", "M6", "m7", "M7", "P8"],
    ratiosJust: ["16:15", "9:8", "6:5", "5:4", "4:3", "45:32", "3:2", "8:5", "5:3", "9:5", "15:8", "2:1"],
    ratiosEqual: ["2^1/12", "2^2/12", "2^3/12", "2^4/12", "2^5/12", "2^6/12", "2^7/12", "2^8/12", "2^9/12", "2^10/12", "2^11/12", "2^12/12"],
    frequencies: ["440Hz", "466Hz", "494Hz", "523Hz", "554Hz", "587Hz", "622Hz", "659Hz", "698Hz", "740Hz", "784Hz", "831Hz", "880Hz"],
};

// frequecies from A1 to A7
const FREQUENCIES = [55, 58.2, 61.7, 65.4, 69.2, 73.4, 77.7, 82.4, 87.3, 92.4, 98, 103, 110, 116, 123, 130, 138, 146, 155, 164, 174, 184, 195, 207, 220, 233, 246, 261, 277, 293, 311, 329, 349, 369, 391, 415, 440, 466, 493, 523, 554, 587, 622, 659, 698, 739, 783, 830, 880, 932, 987, 1046, 1108, 1174, 1244, 1318, 1396, 1479, 1567, 1661, 1760, 1864, 1975, 2093, 2217, 2349, 2489, 2637, 2793, 2959, 3135, 3322, 3520, 3729, 3951, 4186, 4435, 4699, 4978, 5274, 5588, 5920, 6272, 6645, 7040]

const nextNoteTransitionProbability = [0.15, 0.12, 0.13, 0.12, 0.20, 0.20, 0.08];

// initlaize canvas objects and set dimensions
const canvasWidth = 1280;
const canvasWaveOne = document.getElementById("canvasWaveOne").getContext("2d");
const canvasWaveTwo = document.getElementById("canvasWaveTwo").getContext("2d");
const canvasIntervalRatioWaves = document.getElementById("canvasIntervalRatioWaves").getContext("2d");
const canvasJustIntonation = document.getElementById("canvasJustIntonation").getContext("2d");
const canvasJustIntonationAlt = document.getElementById("canvasJustIntonationAlt").getContext("2d");
const canvasEqualTemperament = document.getElementById("canvasEqualTemperament").getContext("2d");
const canvasNotesOneOctave = document.getElementById("canvasNotesOneOctave").getContext("2d");
const canvasNotesAllOctaves = document.getElementById("canvasNotesAllOctaves").getContext("2d");
const canvasScales = document.getElementById("canvasScales").getContext("2d");
const canvasChords = document.getElementById("canvasChords").getContext("2d");
const canvasDynamics = document.getElementById("canvasDynamics").getContext("2d");
const canvasBeats = document.getElementById("canvasBeats").getContext("2d");
const canvasTimeSignature = document.getElementById("canvasTimeSignature").getContext("2d");
const canvasTempo = document.getElementById("canvasTempo").getContext("2d");
const canvasTransitionRhythm = document.getElementById("canvasTransitionRhythm").getContext("2d");
const canvasMarkovRhythm = document.getElementById("canvasMarkovRhythm").getContext("2d");
const canvasMarkovIntervals = document.getElementById("canvasMarkovIntervals").getContext("2d");
const canvasMain = document.getElementById("canvasMain").getContext("2d");
canvasWaveOne.canvas.width = canvasWidth;
canvasWaveOne.canvas.height = 200;
canvasWaveTwo.canvas.width = canvasWidth;
canvasWaveTwo.canvas.height = 200;
canvasIntervalRatioWaves.canvas.width = canvasWidth;
canvasIntervalRatioWaves.canvas.height = 640;
canvasJustIntonation.canvas.width = canvasWidth;
canvasJustIntonation.canvas.height = 350;
canvasNotesOneOctave.canvas.width = canvasWidth;
canvasNotesOneOctave.canvas.height = 360;
canvasJustIntonationAlt.canvas.width = canvasWidth;
canvasJustIntonationAlt.canvas.height = 490;
canvasEqualTemperament.canvas.width = canvasWidth;
canvasEqualTemperament.canvas.height = 490;
canvasNotesAllOctaves.canvas.width = canvasWidth;
canvasNotesAllOctaves.canvas.height = 410;
canvasScales.canvas.width = canvasWidth;
canvasScales.canvas.height = 160;
canvasChords.canvas.width = canvasWidth;
canvasChords.canvas.height = 135;
canvasDynamics.canvas.width = canvasWidth;
canvasDynamics.canvas.height = 200;
canvasBeats.canvas.width = canvasWidth;
canvasBeats.canvas.height = 100;
canvasTimeSignature.canvas.width = canvasWidth;
canvasTimeSignature.canvas.height = 100;
canvasTempo.canvas.width = canvasWidth;
canvasTempo.canvas.height = 100;
canvasMain.canvas.width = canvasWidth;
canvasMain.canvas.height = 414;
canvasTransitionRhythm.canvas.width = canvasWidth;
canvasTransitionRhythm.canvas.height = 140;
canvasMarkovRhythm.canvas.width = canvasWidth;
canvasMarkovRhythm.canvas.height = 250;
canvasMarkovIntervals.canvas.width = canvasWidth;
canvasMarkovIntervals.canvas.height = 440;

// initialize, draw, and play sounds - first two canvases
const playButtonWaveOne = document.getElementById("playButtonWaveOne");
const frequencySliderWaveOne = document.getElementById("frequencySliderWaveOne");
const amplitudeSliderWaveOne = document.getElementById("amplitudeSliderWaveOne");
const playButtonWaveTwo = document.getElementById("playButtonWaveTwo");
const frequencySliderWaveTwoA = document.getElementById("frequencySliderWaveTwoA");
const amplitudeSliderWaveTwoA = document.getElementById("amplitudeSliderWaveTwoA");
const frequencySliderWaveTwoB = document.getElementById("frequencySliderWaveTwoB");
const amplitudeSliderWaveTwoB = document.getElementById("amplitudeSliderWaveTwoB");
const switchFrequencyDouble = document.getElementById("switchFrequencyDouble");
const switchFrequencyOneHalf = document.getElementById("switchFrequencyOneHalf");
const switchFrequency21 = document.getElementById("switchFrequency21");
const switchFrequency32 = document.getElementById("switchFrequency32");
const switchFrequency43 = document.getElementById("switchFrequency43");
const switchFrequency54 = document.getElementById("switchFrequency54");
const switchFrequency1615 = document.getElementById("switchFrequency1615");
intializeSliders(frequencySliderWaveOne, 50, 5000, 10, 440);
intializeSliders(amplitudeSliderWaveOne, 0, 1, 0.01, 0.5);
intializeSliders(frequencySliderWaveTwoA, 50, 5000, 10, 440);
intializeSliders(amplitudeSliderWaveTwoA, 0, 1, 0.01, 0.5);
intializeSliders(frequencySliderWaveTwoB, 50, 5000, 10, 1000);
intializeSliders(amplitudeSliderWaveTwoB, 0, 1, 0.01, 0.5);
var isPlayingWaveOne = false;
var isPlayingWaveTwo = false;
frequencySliderWaveOne.addEventListener("input", function() {
    canvasWaveOne.clearRect(0, 0, canvasWidth, 200);
    drawWave(canvasWaveOne, frequencySliderWaveOne.value, amplitudeSliderWaveOne.value);
    oscillatorNodeWaveOne.frequency.setValueAtTime(frequencySliderWaveOne.value, audioContext.currentTime);
});
amplitudeSliderWaveOne.addEventListener("input", function() {
    canvasWaveOne.clearRect(0, 0, canvasWidth, 200);
    drawWave(canvasWaveOne, frequencySliderWaveOne.value, amplitudeSliderWaveOne.value);
    gainNodeWaveOne.gain.setValueAtTime(amplitudeSliderWaveOne.value, audioContext.currentTime);
});
frequencySliderWaveTwoA.addEventListener("input", function() {
    canvasWaveTwo.clearRect(0, 0, canvasWidth, 200);
    drawWave(canvasWaveTwo, frequencySliderWaveTwoA.value, amplitudeSliderWaveTwoA.value, "#999");
    drawWave(canvasWaveTwo, frequencySliderWaveTwoB.value, amplitudeSliderWaveTwoB.value);
    oscillatorNodeWaveTwoA.frequency.setValueAtTime(frequencySliderWaveTwoA.value, audioContext.currentTime);
});
amplitudeSliderWaveTwoA.addEventListener("input", function() {
    canvasWaveTwo.clearRect(0, 0, canvasWidth, 200);
    drawWave(canvasWaveTwo, frequencySliderWaveTwoA.value, amplitudeSliderWaveTwoA.value, "#999");
    drawWave(canvasWaveTwo, frequencySliderWaveTwoB.value, amplitudeSliderWaveTwoB.value);
    gainNodeWaveTwoA.gain.setValueAtTime(amplitudeSliderWaveTwoA.value, audioContext.currentTime);
});
frequencySliderWaveTwoB.addEventListener("input", function() {
    canvasWaveTwo.clearRect(0, 0, canvasWidth, 200);
    drawWave(canvasWaveTwo, frequencySliderWaveTwoA.value, amplitudeSliderWaveTwoA.value, "#999");
    drawWave(canvasWaveTwo, frequencySliderWaveTwoB.value, amplitudeSliderWaveTwoB.value);
    oscillatorNodeWaveTwoB.frequency.setValueAtTime(frequencySliderWaveTwoB.value, audioContext.currentTime);
});
amplitudeSliderWaveTwoB.addEventListener("input", function() {
    canvasWaveTwo.clearRect(0, 0, canvasWidth, 200);
    drawWave(canvasWaveTwo, frequencySliderWaveTwoA.value, amplitudeSliderWaveTwoA.value, "#999");
    drawWave(canvasWaveTwo, frequencySliderWaveTwoB.value, amplitudeSliderWaveTwoB.value);
    gainNodeWaveTwoB.gain.setValueAtTime(amplitudeSliderWaveTwoB.value, audioContext.currentTime);
});
switchFrequencyDouble.addEventListener("click", function() {
    frequencySliderWaveTwoB.value = 2 * frequencySliderWaveTwoA.value;
    canvasWaveTwo.clearRect(0, 0, canvasWidth, 200);
    drawWave(canvasWaveTwo, frequencySliderWaveTwoA.value, amplitudeSliderWaveTwoA.value, "#999");
    drawWave(canvasWaveTwo, frequencySliderWaveTwoB.value, amplitudeSliderWaveTwoB.value);
    oscillatorNodeWaveTwoB.frequency.setValueAtTime(frequencySliderWaveTwoB.value, audioContext.currentTime);
});
switchFrequencyOneHalf.addEventListener("click", function() {
    frequencySliderWaveTwoB.value = 1.5 * frequencySliderWaveTwoA.value;
    canvasWaveTwo.clearRect(0, 0, canvasWidth, 200);
    drawWave(canvasWaveTwo, frequencySliderWaveTwoA.value, amplitudeSliderWaveTwoA.value, "#999");
    drawWave(canvasWaveTwo, frequencySliderWaveTwoB.value, amplitudeSliderWaveTwoB.value);
    oscillatorNodeWaveTwoB.frequency.setValueAtTime(frequencySliderWaveTwoB.value, audioContext.currentTime);
});
switchFrequency21.addEventListener("click", function() {
    frequencySliderWaveTwoB.value = 2 * frequencySliderWaveTwoA.value;
    canvasWaveTwo.clearRect(0, 0, canvasWidth, 200);
    drawWave(canvasWaveTwo, frequencySliderWaveTwoA.value, amplitudeSliderWaveTwoA.value, "#999");
    drawWave(canvasWaveTwo, frequencySliderWaveTwoB.value, amplitudeSliderWaveTwoB.value);
    oscillatorNodeWaveTwoB.frequency.setValueAtTime(frequencySliderWaveTwoB.value, audioContext.currentTime);
});
switchFrequency32.addEventListener("click", function() {
    frequencySliderWaveTwoB.value = 1.5 * frequencySliderWaveTwoA.value;
    canvasWaveTwo.clearRect(0, 0, canvasWidth, 200);
    drawWave(canvasWaveTwo, frequencySliderWaveTwoA.value, amplitudeSliderWaveTwoA.value, "#999");
    drawWave(canvasWaveTwo, frequencySliderWaveTwoB.value, amplitudeSliderWaveTwoB.value);
    oscillatorNodeWaveTwoB.frequency.setValueAtTime(frequencySliderWaveTwoB.value, audioContext.currentTime);
});
switchFrequency43.addEventListener("click", function() {
    frequencySliderWaveTwoB.value = 1.3333 * frequencySliderWaveTwoA.value;
    canvasWaveTwo.clearRect(0, 0, canvasWidth, 200);
    drawWave(canvasWaveTwo, frequencySliderWaveTwoA.value, amplitudeSliderWaveTwoA.value, "#999");
    drawWave(canvasWaveTwo, frequencySliderWaveTwoB.value, amplitudeSliderWaveTwoB.value);
    oscillatorNodeWaveTwoB.frequency.setValueAtTime(frequencySliderWaveTwoB.value, audioContext.currentTime);
});
switchFrequency54.addEventListener("click", function() {
    frequencySliderWaveTwoB.value = 1.25 * frequencySliderWaveTwoA.value;
    canvasWaveTwo.clearRect(0, 0, canvasWidth, 200);
    drawWave(canvasWaveTwo, frequencySliderWaveTwoA.value, amplitudeSliderWaveTwoA.value, "#999");
    drawWave(canvasWaveTwo, frequencySliderWaveTwoB.value, amplitudeSliderWaveTwoB.value);
    oscillatorNodeWaveTwoB.frequency.setValueAtTime(frequencySliderWaveTwoB.value, audioContext.currentTime);
});
switchFrequency1615.addEventListener("click", function() {
    frequencySliderWaveTwoB.value = 1.0666 * frequencySliderWaveTwoA.value;
    canvasWaveTwo.clearRect(0, 0, canvasWidth, 200);
    drawWave(canvasWaveTwo, frequencySliderWaveTwoA.value, amplitudeSliderWaveTwoA.value, "#999");
    drawWave(canvasWaveTwo, frequencySliderWaveTwoB.value, amplitudeSliderWaveTwoB.value);
    oscillatorNodeWaveTwoB.frequency.setValueAtTime(frequencySliderWaveTwoB.value, audioContext.currentTime);
});
playButtonWaveOne.addEventListener("click", function() {
    if (!isPlayingWaveOne) {
        isPlayingWaveOne = true;
        playButtonWaveOne.innerHTML = "Stop sound";
        oscillatorNodeWaveOne = audioContext.createOscillator();    // converting to a function saves some lines
        oscillatorNodeWaveOne.type = "sine";                        // but the function is even even uglier using eval()
        oscillatorNodeWaveOne.frequency.value = frequencySliderWaveOne.value;
        gainNodeWaveOne = audioContext.createGain();
        gainNodeWaveOne.gain.value = amplitudeSliderWaveOne.value;
        oscillatorNodeWaveOne.connect(gainNodeWaveOne);
        gainNodeWaveOne.connect(audioContext.destination);
        oscillatorNodeWaveOne.start();
    }
    else {
        isPlayingWaveOne = false;
        playButtonWaveOne.innerHTML = "Play sound";
        oscillatorNodeWaveOne.stop();
        oscillatorNodeWaveOne.disconnect(gainNodeWaveOne);
        gainNodeWaveOne.disconnect(audioContext.destination);
    }
});
playButtonWaveTwo.addEventListener("click", function() {
    if (!isPlayingWaveTwo) {
        isPlayingWaveTwo = true;
        playButtonWaveTwo.innerHTML = "Stop sound";
        oscillatorNodeWaveTwoA = audioContext.createOscillator();
        oscillatorNodeWaveTwoA.type = "sine";
        oscillatorNodeWaveTwoA.frequency.value = frequencySliderWaveTwoA.value;
        gainNodeWaveTwoA = audioContext.createGain();
        gainNodeWaveTwoA.gain.value = amplitudeSliderWaveTwoA.value;
        oscillatorNodeWaveTwoA.connect(gainNodeWaveTwoA);
        gainNodeWaveTwoA.connect(audioContext.destination);
        oscillatorNodeWaveTwoA.start();
        oscillatorNodeWaveTwoB = audioContext.createOscillator();
        oscillatorNodeWaveTwoB.type = "sine";
        oscillatorNodeWaveTwoB.frequency.value = frequencySliderWaveTwoB.value;
        gainNodeWaveTwoB = audioContext.createGain();
        gainNodeWaveTwoB.gain.value = amplitudeSliderWaveTwoB.value;
        oscillatorNodeWaveTwoB.connect(gainNodeWaveTwoB);
        gainNodeWaveTwoB.connect(audioContext.destination);
        oscillatorNodeWaveTwoB.start();
    }
    else {
        isPlayingWaveTwo = false;
        playButtonWaveTwo.innerHTML = "Play sound";
        oscillatorNodeWaveTwoA.stop();
        oscillatorNodeWaveTwoB.stop();
        oscillatorNodeWaveTwoA.disconnect(gainNodeWaveTwoA);
        oscillatorNodeWaveTwoB.disconnect(gainNodeWaveTwoB);
        gainNodeWaveTwoA.disconnect(audioContext.destination);
        gainNodeWaveTwoB.disconnect(audioContext.destination);
    }
});
drawWave(canvasWaveOne, frequencySliderWaveOne.value, amplitudeSliderWaveOne.value);
drawWave(canvasWaveTwo, frequencySliderWaveTwoA.value, amplitudeSliderWaveTwoA.value, "#999");
drawWave(canvasWaveTwo, frequencySliderWaveTwoB.value, amplitudeSliderWaveTwoB.value);

// draw wave ratios
const rowsWaveRatios = [81, 161, 241, 321, 401, 481, 561, 213, 427];
const waveRatios = [1, 16/15, 9/8, 6/5, 5/4, 4/3, 45/32, 3/2, 8/5, 5/3, 9/5, 15/8, 2/1];
drawGrid(canvasIntervalRatioWaves, rowsWaveRatios, 98.46, 640, -49, "#ccc", "#ccc");
for (let i = 0; i < 13; i++) {
    drawWaveVertical(canvasIntervalRatioWaves, 600, 0.4, 49 + i * 98.46, "#999");
    drawWaveVertical(canvasIntervalRatioWaves, 600 * waveRatios[i], 0.4, 49 + i * 98.46);
}

// draw just intonation canvas items
drawCircles(canvasJustIntonation);
canvasJustIntonation.strokeStyle = "#000";
canvasJustIntonation.lineWidth = 2;
for (let i = 1; i <= 12; i++) {
    let gap = canvasWidth / 13;
    canvasJustIntonation.moveTo(49, 101 + i * 12);
    canvasJustIntonation.lineTo(49, 175 + i * 12);
    canvasJustIntonation.lineTo(Math.floor(i * gap + 50), 175 + i * 12);
    canvasJustIntonation.lineTo(Math.floor(i * gap + 50), 173);
    canvasJustIntonation.moveTo(Math.floor(i * gap + 50), 101);
    canvasJustIntonation.lineTo(Math.floor(i * gap + 50), 131);
}
canvasJustIntonation.stroke();
canvasNotesOneOctave.drawImage(document.getElementById("canvasJustIntonation"), 0, 30);
drawNotes(canvasJustIntonation, INTERVALS.chromatic, 0, NOTES.intervals, 51, 0, 13, 13);

// draw equal temperament canvas items - top half
canvasJustIntonationAlt.drawImage(document.getElementById("canvasJustIntonation"), 0, 150);
canvasJustIntonationAlt.strokeStyle = "#000";
canvasJustIntonationAlt.lineWidth = 2;
for (let i = 0; i < 4; i++) {
    let gap = canvasWidth / 13;
    canvasJustIntonationAlt.moveTo(149, 145 - i * 12);
    canvasJustIntonationAlt.lineTo(149, 71 - i * 12);
    canvasJustIntonationAlt.lineTo(Math.floor(i * gap + 149), 71 - i * 12);
    canvasJustIntonationAlt.lineTo(Math.floor(i * gap + 149), 80);
    canvasJustIntonationAlt.moveTo(Math.floor(i * gap + 149), 145);
    canvasJustIntonationAlt.lineTo(Math.floor(i * gap + 149), 111);
}
canvasJustIntonationAlt.stroke();

// draw equal temperament - bottom half
canvasEqualTemperament.drawImage(document.getElementById("canvasJustIntonationAlt"), 0, 0);
drawNotes(canvasJustIntonation, INTERVALS.chromatic, 0, NOTES.ratiosJust, 151, 100, 12);
drawNotes(canvasJustIntonationAlt, INTERVALS.chromatic, 0, NOTES.ratiosJust, 301, 100, 12);
drawNotes(canvasJustIntonationAlt, INTERVALS.chromatic, 0, ["135:128", "9:8", "75:64"], 96, 200, 3);
drawNotes(canvasEqualTemperament, INTERVALS.chromatic, 0, NOTES.ratiosEqual, 301, 100, 12, 12, "20px JetBrains Mono");
drawNotes(canvasEqualTemperament, INTERVALS.chromatic, 0, ["2^1/12", "2^2/12", "2^3/12"], 95, 201, 3, 12, "20px JetBrains Mono");
canvasJustIntonationAlt.textAlign = "right";
canvasJustIntonationAlt.textBaseline = "middle";
canvasJustIntonationAlt.fillStyle = "#000";
canvasJustIntonationAlt.font = "24px JetBrains Mono";
canvasJustIntonationAlt.fillText("Just Intonation", 1250, 51);
canvasEqualTemperament.textAlign = "right";
canvasEqualTemperament.textBaseline = "middle";
canvasEqualTemperament.fillStyle = "#000";
canvasEqualTemperament.font = "24px JetBrains Mono";
canvasEqualTemperament.fillText("Equal Temperament", 1250, 51);

// draw notes - one octave
drawNotes(canvasNotesOneOctave, INTERVALS.chromatic, 0, NOTES.letters, 81);
drawNotes(canvasNotesOneOctave, INTERVALS.chromatic, 0, NOTES.ratiosEqual, 181, 100, 12, 12, "20px JetBrains Mono");
drawNotes(canvasNotesOneOctave, INTERVALS.chromatic, 0, NOTES.frequencies, 15, 0, 13, 13);

// draw notes - all octaves
drawCircles(canvasNotesAllOctaves, INTERVALS.chromatic, 80);
drawCircles(canvasNotesAllOctaves, INTERVALS.chromatic, 301, 96, 5, 2, "#000", "#999", 1248, 15);
drawNotes(canvasNotesAllOctaves, INTERVALS.chromatic, 0, NOTES.numbers, 81, 0, 13, 13);
drawNotes(canvasNotesAllOctaves, INTERVALS.chromatic, 0, NOTES.frequencies, 15, 0, 13, 13);
canvasJustIntonationAlt.textAlign = "center";
canvasJustIntonationAlt.textBaseline = "middle";
canvasJustIntonationAlt.fillStyle = "#000";
canvasJustIntonationAlt.font = "24px JetBrains Mono";
canvasNotesAllOctaves.strokeStyle = "#000";
canvasNotesAllOctaves.lineWidth = 2;
for (let i = 0; i < 13; i++) {
    canvasNotesAllOctaves.moveTo(125 + i * 87, 145);
    canvasNotesAllOctaves.lineTo(638 + i * 13, 281);
}
for (let i = 0; i <= 8; i++) {
    canvasNotesAllOctaves.moveTo(15 + i * 156, 286);
    canvasNotesAllOctaves.lineTo(15 + i * 156, 316);
    canvasNotesAllOctaves.fillText(`A${i}`, 15 + i * 156, 341);
    canvasNotesAllOctaves.fillText(`${27.5 * Math.pow(2, i)}Hz`, 43 + i * 149, 381);
}
canvasNotesAllOctaves.stroke();

// intialize canvas itmes for scales canvas
var selectedScaleNote = 0;
var selectedScaleInterval = "major";
drawNotes(canvasScales, INTERVALS.chromatic, 0, NOTES.intervals, 121, 0, 13, 13);
const playScaleButton = document.getElementById("playScaleButton");
const selectScaleNote = document.getElementById("selectScaleNote");
NOTES.letters.forEach((element, index) => {
    const newOption = document.createElement("option");
    newOption.value = index;
    newOption.text = element;
    selectScaleNote.appendChild(newOption);
});
const selectScaleInterval = document.getElementById("selectScaleInterval");
INTERVALNAMES.forEach(element => {
    const newOption = document.createElement("option");
    newOption.value = element;
    newOption.text = element;
    selectScaleInterval.appendChild(newOption);
});
selectScaleNote.value = selectedScaleNote;
selectScaleInterval.value = selectedScaleInterval;
drawCircles(canvasScales, INTERVALS[selectedScaleInterval]);
drawNotes(canvasScales, INTERVALS[selectedScaleInterval], selectedScaleNote);
selectScaleNote.addEventListener("change", (event) => {
    canvasScales.clearRect(0, 0, canvasWidth, 100);
    selectedScaleNote = parseInt(selectScaleNote.value);
    selectedScaleInterval = selectScaleInterval.value;
    drawCircles(canvasScales, INTERVALS[selectedScaleInterval]);
    drawNotes(canvasScales, INTERVALS[selectedScaleInterval], selectedScaleNote);
});
selectScaleInterval.addEventListener("change", (event) => {
    canvasScales.clearRect(0, 0, canvasWidth, 100);
    selectedScaleNote = parseInt(selectScaleNote.value);
    selectedScaleInterval = selectScaleInterval.value;
    drawCircles(canvasScales, INTERVALS[selectedScaleInterval]);
    drawNotes(canvasScales, INTERVALS[selectedScaleInterval], selectedScaleNote);
});
var isPlayingScale = false;
playScaleButton.addEventListener("click", async function() {
    if (!isPlayingScale) {
        isPlayingScale = true;
        playScaleButton.disabled = true;
        playScaleButton.style.pointerEvents = "none"
        playScaleButton.innerHTML = "Playing";
        for (let i = 0; i < 13; i++) {
            if (INTERVALS[selectedScaleInterval][i]) {
                canvasScales.clearRect(0, 145, canvasWidth, 15);
                drawTriangle(canvasScales, i * 98.46 + 49, 150);
                await playNote(FREQUENCIES[selectedScaleNote + 36 + i], 0.5, 400, 400, 0.1);
            }
        }
        canvasScales.clearRect(0, 145, canvasWidth, 25);
        isPlayingScale = false;
        playScaleButton.disabled = false;
        playScaleButton.style.pointerEvents = "auto"
        playScaleButton.innerHTML = "Play notes";
    }
});

// intialize canvas itmes for chords canvas
var selectedChordNote = 0;
var selectedChordInterval = "major";
drawNotes(canvasChords, INTERVALS.chromatic, 0, NOTES.intervals, 121, 0, 13, 13);
const selectChordNote = document.getElementById("selectChordNote");
NOTES.letters.forEach((element, index) => {
    const newOption = document.createElement("option");
    newOption.value = index;
    newOption.text = element;
    selectChordNote.appendChild(newOption);
});
const selectChordInterval = document.getElementById("selectChordInterval");
CHORDNAMES.forEach(element => {
    const newOption = document.createElement("option");
    newOption.value = element;
    newOption.text = element;
    selectChordInterval.appendChild(newOption);
});
selectChordNote.value = selectedChordNote;
selectChordInterval.value = selectedChordInterval;
drawCircles(canvasChords, CHORDS[selectedChordInterval]);
drawNotes(canvasChords, CHORDS[selectedChordInterval], selectedChordNote);
var chordOscillators = [];
var frequenciesChord = getChord(selectedChordNote, CHORDS[selectedChordInterval], 3);
selectChordNote.addEventListener("change", async function() {
    canvasChords.clearRect(0, 0, canvasWidth, 100);
    selectedChordNote = parseInt(selectChordNote.value);
    selectedChordInterval = selectChordInterval.value;
    drawCircles(canvasChords, CHORDS[selectedChordInterval]);
    drawNotes(canvasChords, CHORDS[selectedChordInterval], selectedChordNote);
    frequenciesChord = getChord(selectedChordNote, CHORDS[selectedChordInterval], 3);
    if (isPlayingChord) {
        stopChord(chordOscillators, gainNodeChord, chordOscillators.length, 0.1);
        gainNodeChord = await playChord(frequenciesChord, 0.8, chordOscillators);
    }
});
selectChordInterval.addEventListener("change", async function() {
    canvasChords.clearRect(0, 0, canvasWidth, 100);
    selectedChordNote = parseInt(selectChordNote.value);
    selectedChordInterval = selectChordInterval.value;
    drawCircles(canvasChords, CHORDS[selectedChordInterval]);
    drawNotes(canvasChords, CHORDS[selectedChordInterval], selectedChordNote);
    frequenciesChord = getChord(selectedChordNote, CHORDS[selectedChordInterval], 3);
    if (isPlayingChord) {
        stopChord(chordOscillators, gainNodeChord, chordOscillators.length, 0.1);
        gainNodeChord = await playChord(frequenciesChord, 0.8, chordOscillators);
    }
});
var isPlayingChord = false;
playChordButton.addEventListener("click", async function() {
    if (!isPlayingChord) {
        isPlayingChord = true;
        playChordButton.innerHTML = "Stop chord";
        gainNodeChord = await playChord(frequenciesChord, 0.8, chordOscillators);
    }
    else {
        isPlayingChord = false;
        playChordButton.innerHTML = "Play chord";
        stopChord(chordOscillators, gainNodeChord, chordOscillators.length, 0.1);
    }
});

// canvas for dynamics
drawWave(canvasDynamics, 0, 0);
var isPlayingDynamics = false;
var isCrescendoDynamics = true;
playDynamicsButton.addEventListener("click", async function() {
    if (!isPlayingDynamics) {
        isPlayingDynamics = true;
        if (isCrescendoDynamics) {
            playDynamicsButton.innerHTML = "Increasing amplitude";
            playDynamicsButton.style.pointerEvents = "none"
            oscillatorDynamics = audioContext.createOscillator();
            oscillatorDynamics.type = "sine";
            oscillatorDynamics.frequency = 440;
            gainNodeDynamics = audioContext.createGain();
            oscillatorDynamics.connect(gainNodeDynamics);
            gainNodeDynamics.connect(audioContext.destination);
            oscillatorDynamics.start();
            for (let i = 0; i <= 1; i += 0.02) {
                canvasDynamics.clearRect(0, 0, canvasWidth, 200);
                drawWave(canvasDynamics, 440, i);
                gainNodeDynamics.gain.value = i;
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            playDynamicsButton.innerHTML = "Decrease amplitude";
            playDynamicsButton.style.pointerEvents = "auto"
            isCrescendoDynamics = false;
        }
        else {
            playDynamicsButton.innerHTML = "Decreasing amplitude";
            playDynamicsButton.style.pointerEvents = "none"
            for (let i = 0.98; i >= 0; i -= 0.02) {           // because i does not go to 1 (floating point calc)
                canvasDynamics.clearRect(0, 0, canvasWidth, 200);
                drawWave(canvasDynamics, 440, i);
                gainNodeDynamics.gain.value = i;
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            canvasDynamics.clearRect(0, 0, canvasWidth, 200);
            drawWave(canvasDynamics, 440, 0);                 // because i does not go to 0 (floating point calc)
            oscillatorDynamics.disconnect(gainNodeDynamics);
            gainNodeDynamics.disconnect(audioContext.destination);
            playDynamicsButton.innerHTML = "Increase amplitude";
            playDynamicsButton.style.pointerEvents = "auto"
            isCrescendoDynamics = true;
        }
        isPlayingDynamics = false;
    }
});

var isPlayingBeats = false;
const beatsList = ["Beat A", "Beat B"];
const beatsTimings = [[1, 0], [2, 0, 1, 0, 1, 0]];
const selectBeat = document.getElementById("selectBeat");
beatsList.forEach((element, index) => {
    const newOption = document.createElement("option");
    newOption.value = index;
    newOption.text = element;
    selectBeat.appendChild(newOption);
});
selectBeat.value = 0;
drawGrid(canvasBeats);
drawBeats(canvasBeats, beatsTimings[selectBeat.value]);
selectBeat.addEventListener("change", (event) => {
    canvasBeats.clearRect(0, 0, canvasWidth, 100);
    drawGrid(canvasBeats);
    drawBeats(canvasBeats, beatsTimings[selectBeat.value]);
});
playBeatsButton.addEventListener("click", async function() {
    if (!isPlayingBeats) {
        isPlayingBeats = true;
        playBeatsButton.innerHTML = "Stop playing";
        while (isPlayingBeats) {
            await playBeats(beatsTimings[selectBeat.value]);
        }
    }
    else {
        isPlayingBeats = false;
        playBeatsButton.innerHTML = "Play beat";
    }
});

var isPlayingTimeSignature = false;
const timeSignatureList = ["2/2", "2/4", "3/4", "4/4", "6/8", "8/8", "12/8"];
const timeSignatureTimings = [[2, 0, 0, 0, 1, 0, 0, 0], [2, 0, 1, 0], [2, 0, 1, 0, 1, 0], [2, 0, 1, 0, 1, 0, 1, 0], [2, 1, 1, 1, 1, 1], [2, 1, 1, 1, 1, 1, 1, 1], [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
const selectTimeSignature = document.getElementById("selectTimeSignature");
timeSignatureList.forEach((element, index) => {
    const newOption = document.createElement("option");
    newOption.value = index;
    newOption.text = element;
    selectTimeSignature.appendChild(newOption);
});
selectTimeSignature.value = 3;
drawGrid(canvasTimeSignature);
drawBeats(canvasTimeSignature, timeSignatureTimings[selectTimeSignature.value]);
selectTimeSignature.addEventListener("change", (event) => {
    canvasTimeSignature.clearRect(0, 0, canvasWidth, 100);
    drawGrid(canvasTimeSignature);
    drawBeats(canvasTimeSignature, timeSignatureTimings[selectTimeSignature.value]);
});
playTimeSignatureButton.addEventListener("click", async function() {
    if (!isPlayingTimeSignature) {
        isPlayingTimeSignature = true;
        playTimeSignatureButton.innerHTML = "Stop playing";
        while (isPlayingTimeSignature) {
            await playBeats(timeSignatureTimings[selectTimeSignature.value]);
        }
    }
    else {
        isPlayingTimeSignature = false;
        playTimeSignatureButton.innerHTML = "Play beat";
    }
});

var isPlayingTempo = false;
var tempo = 32
const tempoBeats = [2, 0, 1, 0, 1, 0, 1, 0];
const sliderTempo = document.getElementById("sliderTempo");
intializeSliders(sliderTempo, 10, 48, 1, 32);
drawGrid(canvasTempo);
drawBeats(canvasTempo, tempoBeats);
sliderTempo.addEventListener("input", (event) => {
    canvasTempo.clearRect(0, 0, canvasWidth, 100);
    tempo = 64 - parseInt(sliderTempo.value);
    drawGrid(canvasTempo, [51], tempo);
    drawBeats(canvasTempo, tempoBeats, tempo);
});
playTempoButton.addEventListener("click", async function() {
    if (!isPlayingTempo) {
        isPlayingTempo = true;
        playTempoButton.innerHTML = "Stop playing";
        while (isPlayingTempo) {
            await playBeats(tempoBeats, tempo);
        }
    }
    else {
        isPlayingTempo = false;
        playTempoButton.innerHTML = "Play beat";
    }
});

drawGrid(canvasTransitionRhythm, [51], 32, 100, 1040, "#000", "#999", 2, 1280);
drawGrid(canvasTransitionRhythm, [51], 32, 100, 528, "#000", "#999", 2, 754);
drawGrid(canvasTransitionRhythm, [51], 32, 100, 16, "#000", "#999", 2, 242);
canvasTransitionRhythm.strokeStyle = "#fff";
const canvasTransitionRhythmBlanks = [257, 333, 439, 505, 769, 839, 951, 1017];
canvasTransitionRhythm.beginPath();
for (let i = 0; i < canvasTransitionRhythmBlanks.length * 2; i += 2) {
    canvasTransitionRhythm.moveTo(canvasTransitionRhythmBlanks[i], 51);
    canvasTransitionRhythm.lineTo(canvasTransitionRhythmBlanks[i + 1], 51);
}
canvasTransitionRhythm.closePath();
canvasTransitionRhythm.stroke();
canvasTransitionRhythm.strokeStyle = "#000";
canvasTransitionRhythm.beginPath();
const canvasTransitionRhythmTrigs = [333, 439, 839, 951]
for (let i = 0; i < canvasTransitionRhythmTrigs.length; i++) {
    canvasTransitionRhythm.moveTo(canvasTransitionRhythmTrigs[i], 41);
    if (i % 2 == 0) canvasTransitionRhythm.lineTo(canvasTransitionRhythmTrigs[i] - 10, 51);
    else            canvasTransitionRhythm.lineTo(canvasTransitionRhythmTrigs[i] + 10, 51);
    canvasTransitionRhythm.lineTo(canvasTransitionRhythmTrigs[i], 61);
    canvasTransitionRhythm.lineTo(canvasTransitionRhythmTrigs[i], 41);
}
canvasTransitionRhythm.closePath();
canvasTransitionRhythm.stroke();
canvasTransitionRhythm.beginPath();
for (let i = 16; i < 272; i += 64) canvasTransitionRhythm.arc(i, 50, 8, 0, Math.PI * 2);
for (let i = 528; i < 784; i += 64) canvasTransitionRhythm.arc(i, 50, 8, 0, Math.PI * 2);
canvasTransitionRhythm.arc(688, 50, 8, 0, Math.PI * 2);
canvasTransitionRhythm.arc(1040, 50, 8, 0, Math.PI * 2);
canvasTransitionRhythm.arc(1168, 50, 8, 0, Math.PI * 2);
canvasTransitionRhythm.arc(1200, 50, 8, 0, Math.PI * 2);
canvasTransitionRhythm.arc(1232, 50, 8, 0, Math.PI * 2);
canvasTransitionRhythm.closePath();
canvasTransitionRhythm.fill();
canvasTransitionRhythm.textAlign = "center";
canvasTransitionRhythm.textBaseline = "middle";
canvasTransitionRhythm.fillStyle = "#000";
canvasTransitionRhythm.font = "24px JetBrains Mono";
for (let i = 16; i < 272; i += 64) canvasTransitionRhythm.fillText("1", i, 125);
canvasTransitionRhythm.fillText("1", 528, 125);
canvasTransitionRhythm.fillText("1", 592, 125);
canvasTransitionRhythm.fillText("1", 720, 125);
canvasTransitionRhythm.fillText("1", 1232, 125);
canvasTransitionRhythm.fillText("2", 1040, 125);
canvasTransitionRhythm.font = "22px JetBrains Mono";
canvasTransitionRhythm.fillText(".5", 656, 126);
canvasTransitionRhythm.fillText(".5", 688, 126);
canvasTransitionRhythm.fillText(".5", 1168, 126);
canvasTransitionRhythm.fillText(".5", 1200, 126);

const canvasMarkovRhythmProbSame = [0.2, 0.2, 0.3, 0.5];
const canvasMarkovRhythmProbNext = [0.8, 0.7, 0.5];
const canvasMarkovRhythmProbPrev = [0.1, 0.2, 0.5];
canvasMarkovRhythm.strokeStyle = "#000";
canvasMarkovRhythm.lineWidth = 2;
canvasMarkovRhythm.textAlign = "center";
canvasMarkovRhythm.textBaseline = "middle";
canvasMarkovRhythm.fillStyle = "#000";
canvasMarkovRhythm.font = "32px JetBrains Mono";
const canvasMarkovRhythmTimes = ["4", "2", "1", ".5"];
for (let i = 0; i < 4; i++) {
    canvasMarkovRhythm.fillText(canvasMarkovRhythmTimes[i], i * 320 + 160, 155);
    canvasMarkovRhythm.moveTo(i * 320 + 128, 114);
    canvasMarkovRhythm.arc(i * 320 + 160, 90, 40, 2.5, 0.64);
    canvasMarkovRhythm.moveTo(i * 320 + 183, 119);
    canvasMarkovRhythm.lineTo(i * 320 + 183, 105);
    canvasMarkovRhythm.lineTo(i * 320 + 197, 119);
    canvasMarkovRhythm.lineTo(i * 320 + 183, 119);
}
canvasMarkovRhythm.font = "22px JetBrains Mono";
for (let i = 0; i < 3; i++) {
    canvasMarkovRhythm.moveTo(i * 320 + 211, 135);
    canvasMarkovRhythm.lineTo(i * 320 + 421, 135);
    canvasMarkovRhythm.moveTo(i * 320 + 421, 125);
    canvasMarkovRhythm.lineTo(i * 320 + 421, 145);
    canvasMarkovRhythm.lineTo(i * 320 + 431, 135);
    canvasMarkovRhythm.lineTo(i * 320 + 421, 125);
    canvasMarkovRhythm.moveTo(i * 320 + 431, 175);
    canvasMarkovRhythm.lineTo(i * 320 + 221, 175);
    canvasMarkovRhythm.moveTo(i * 320 + 221, 165);
    canvasMarkovRhythm.lineTo(i * 320 + 221, 185);
    canvasMarkovRhythm.lineTo(i * 320 + 211, 175);
    canvasMarkovRhythm.lineTo(i * 320 + 221, 165);
    canvasMarkovRhythm.fillText(canvasMarkovRhythmProbNext[i] * 100 + "%", i * 320 + 320, 110);
    canvasMarkovRhythm.fillText(canvasMarkovRhythmProbPrev[i] * 100 + "%", i * 320 + 320, 200);
}
for (let i = 0; i < 4; i++) canvasMarkovRhythm.fillText(canvasMarkovRhythmProbSame[i] * 100 + "%", i * 320 + 160, 26);
canvasMarkovRhythm.stroke();

const canvasMarkovIntervalsLetters = ["P1", "M2", "M3", "P4", "P5", "M6", "M7"];
canvasMarkovIntervals.textAlign = "center";
canvasMarkovIntervals.textBaseline = "middle";
canvasMarkovIntervals.fillStyle = "#000";
canvasMarkovIntervals.font = "24px JetBrains Mono";
canvasMarkovIntervals.strokeStyle = "#000";
canvasMarkovIntervals.lineWidth = 2;
canvasMarkovIntervals.beginPath();
for (let i = 15; i < 127; i += 16) {
    canvasMarkovIntervals.moveTo(0, i);
    canvasMarkovIntervals.lineTo(200, i);
}
for (let i = 287; i < 399; i += 16) {
    canvasMarkovIntervals.moveTo(0, i);
    canvasMarkovIntervals.lineTo(canvasWidth, i);
}
canvasMarkovIntervals.closePath();
for (let i = 99; i < 1280; i += 180) {
    canvasMarkovIntervals.moveTo(i, 231);
    canvasMarkovIntervals.lineTo(i, 261);
    canvasMarkovIntervals.lineTo(i + 10, 261);
    canvasMarkovIntervals.lineTo(i, 271);
    canvasMarkovIntervals.lineTo(i - 10, 261);
    canvasMarkovIntervals.lineTo(i, 261);
}
canvasMarkovIntervals.moveTo(99, 171);
canvasMarkovIntervals.lineTo(99, 231);
canvasMarkovIntervals.lineTo(1179, 231);
canvasMarkovIntervals.stroke();
canvasMarkovIntervals.beginPath();
for (let i = 0; i < 7; i++) {
    canvasMarkovIntervals.arc(100 + i * 180, 383 - i * 16, 5, 0, Math.PI * 2);
    canvasMarkovIntervals.fillText(canvasMarkovIntervalsLetters[i], 100 + i * 180, 421);
}
canvasMarkovIntervals.closePath();
canvasMarkovIntervals.arc(100, 111, 5, 0, Math.PI * 2);
canvasMarkovIntervals.fill();
canvasMarkovIntervals.fillText("P1", 100, 149);
canvasMarkovIntervals.fillText("Next note probabilities for the major scale", 951, 65);
for (let i = 1; i < 7; i++) canvasMarkovIntervals.fillText(nextNoteTransitionProbability[i] * 100 + "%", 100 + i * 180, 215);
canvasMarkovIntervals.fillText(nextNoteTransitionProbability[0] * 100 + "%", 125, 215);

// main sandbox
var mainChordFrequencies = [];
var mainChordOscillators = [];
var mainScaleNotes = [];
var mainScaleChords = [];
var mainTunes = [];
var mainSharp = [];
var mainChords = [];
var mainTunesDurations = [];
var mainSharpDurations = [];
const mainScaleTypes = ["major", "minor", "harmonic major", "harmonic minor"];
const mainSharpOctaves = [4, 5, 6];
const mainTunesOctaves = [3, 4, 5];
const mainChordOctaves = [2, 3, 4];
const mainCanvasRows = [15, 31, 47, 63, 79, 95, 111, 159, 175, 191, 207, 223, 239, 255, 303, 319, 335, 351, 367, 383, 399];
const mainTempoSlider = document.getElementById("sliderMainTempo");
const mainScaleRoot = document.getElementById("selectMainScaleRoot");
const mainScaleType = document.getElementById("selectMainScaleType");
const mainSharpOctave = document.getElementById("selectMainSharpOctave");
const mainTunesOctave = document.getElementById("selectMainTunesOctave");
const mainChordOctave = document.getElementById("selectMainChordOctave");
const mainSharpAmplitude = document.getElementById("sliderMainSharpAmplitude");
const mainTunesAmplitude = document.getElementById("sliderMainTunesAmplitude");
const mainChordAmplitude = document.getElementById("sliderMainChordAmplitude");
intializeSliders(mainChordAmplitude, 0, 1, 0.02, 0.4);
intializeSliders(mainTunesAmplitude, 0, 1, 0.02, 0.25);
intializeSliders(mainSharpAmplitude, 0, 1, 0.02, 0.04);
intializeSliders(mainTempoSlider, 0.5, 2, 0.05, 1.5);
mainSharpOctaves.forEach(element => {
    const newOption = document.createElement("option");
    newOption.value = element;
    newOption.text = element;
    mainSharpOctave.appendChild(newOption);
});
mainTunesOctaves.forEach(element => {
    const newOption = document.createElement("option");
    newOption.value = element;
    newOption.text = element;
    mainTunesOctave.appendChild(newOption);
});
mainChordOctaves.forEach(element => {
    const newOption = document.createElement("option");
    newOption.value = element;
    newOption.text = element;
    mainChordOctave.appendChild(newOption);
});
NOTES.letters.forEach((element, index) => {
    const newOption = document.createElement("option");
    newOption.value = index;
    newOption.text = element;
    mainScaleRoot.appendChild(newOption);
});
mainScaleTypes.forEach(element => {
    const newOption = document.createElement("option");
    newOption.value = element;
    newOption.text = element;
    mainScaleType.appendChild(newOption);
});
mainScaleRoot.addEventListener("change", function() {
    mainScaleNotes = getNotes(parseInt(mainScaleRoot.value), INTERVALS[mainScaleType.value]);
    mainTunesFrequencies = getFrequencies(mainScaleNotes, mainTunesOctave.value);
    mainSharpFrequencies = getFrequencies(mainScaleNotes, mainSharpOctave.value);
    mainScaleChords = getChordProgression(mainScaleType.value);
});
mainScaleType.addEventListener("change", function() {
    mainScaleNotes = getNotes(parseInt(mainScaleRoot.value), INTERVALS[mainScaleType.value]);
    mainTunesFrequencies = getFrequencies(mainScaleNotes, mainTunesOctave.value);
    mainSharpFrequencies = getFrequencies(mainScaleNotes, mainSharpOctave.value);
    mainScaleChords = getChordProgression(mainScaleType.value);
});
mainTunesOctave.addEventListener("change", function() {
    mainTunesFrequencies = getFrequencies(mainScaleNotes, mainTunesOctave.value);
});
mainSharpOctave.addEventListener("change", function() {
    mainSharpFrequencies = getFrequencies(mainScaleNotes, mainSharpOctave.value);
});
mainTempoSlider.addEventListener("change", function() {
    mainTempo = 2.5 - mainTempoSlider.value;
});
mainGenerate.addEventListener("click", function() {
    getSequence(mainTime, mainTotalBars, mainTunes, mainSharp, mainChords, mainTunesDurations, mainSharpDurations);
    canvasMain.clearRect(0, 0, canvasWidth, 414);
    drawGrid(canvasMain, mainCanvasRows, 16, 414, 6, "#000", "#aaa");
    drawGrid(canvasMain, false, 32 * mainTime, 414, 6, "#000", "#000");
    drawSequence(canvasMain, mainTunesDurations, mainTunes, mainTotalBars, 255);
    drawSequence(canvasMain, mainSharpDurations, mainSharp, mainTotalBars, 111);
    drawChord(canvasMain, mainChords, mainTotalBars, 399);
});

var mainTempo = 2.5 - mainTempoSlider.value;
var mainTotalBars = 10;
isTunesMain = true;
isSharpMain = true;
mainTime = 4;
mainScaleRoot.value = 0;
mainScaleType.value = "major";
mainSharpOctave.value = 6;
mainTunesOctave.value = 5;
mainChordOctave.value = 4;
mainScaleNotes = getNotes(mainScaleRoot.value, INTERVALS[mainScaleType.value]);
mainScaleChords = getChordProgression(mainScaleType.value);
mainTunesFrequencies = getFrequencies(mainScaleNotes, mainTunesOctave.value);
mainSharpFrequencies = getFrequencies(mainScaleNotes, mainSharpOctave.value);
drawGrid(canvasMain, mainCanvasRows, 16, 414, 6, "#000", "#aaa");
drawGrid(canvasMain, false, 32 * mainTime, 414, 6, "#000", "#000");
getSequence(mainTime, mainTotalBars, mainTunes, mainSharp, mainChords, mainTunesDurations, mainSharpDurations);
drawSequence(canvasMain, mainTunesDurations, mainTunes, mainTotalBars, 255);
drawSequence(canvasMain, mainSharpDurations, mainSharp, mainTotalBars, 111);
drawChord(canvasMain, mainChords, mainTotalBars, 399);

var counter = 0;
var isPlayingMain = false;
playMainButton.addEventListener("click", async function() {
    if (!isPlayingMain) {
        isPlayingMain = true;
        playMainButton.innerHTML = "Pause";
        while (isPlayingMain) {
            let mainChordIntervals = CHORDS[mainScaleChords[mainChords[counter]]];
            mainChordFrequencies = getChord(mainScaleNotes[mainChords[counter]], mainChordIntervals, mainChordOctave.value);
            if (mainChordOscillators.length != 0) {
                stopChord(mainChordOscillators, gainNodeMain, mainChordOscillators.length, mainTempo);
            }
            playNotes(mainTunes[counter], mainTunesDurations[counter], mainTunesAmplitude.value, mainTunesFrequencies, mainTempo);
            playNotes(mainSharp[counter], mainSharpDurations[counter], mainSharpAmplitude.value, mainSharpFrequencies, mainTempo);
            gainNodeMain = await playChord(mainChordFrequencies, mainChordAmplitude.value, mainChordOscillators);
            await new Promise(resolve => setTimeout(resolve, mainTempo * mainTime * 1000));
            counter += 1;
            if (counter === mainTotalBars) counter = 0;
        }
    }
    else {
        isPlayingMain = false;
        playMainButton.disabled = true;
        playMainButton.style.pointerEvents = "none"     // of same loop
        playMainButton.innerHTML = "Pausing";           // to prevent creating multiple instances
        stopChord(mainChordOscillators, gainNodeMain, mainChordOscillators.length); // oscillators,length will overestimate if two chords are playing
        await new Promise(resolve => setTimeout(resolve, mainTime * 1000 * mainTempo));
        playMainButton.disabled = false;
        playMainButton.style.pointerEvents = "auto"
        playMainButton.innerHTML = "Play";
    }
});

function drawCircles(canvas, intervalsArray = INTERVALS["chromatic"], height = 50, circles = 13, radius = 40, strokewidth = 2, strokeFG = "#000", strokeBG = "#bbb", width = canvasWidth, xOffset = 0) {
    canvas.lineWidth = strokewidth;
    const gap = width / circles;
    const gapHalf = width / (2 * circles);
    for (let i = 0; i < circles; i++) {
        if (intervalsArray[i] === false)
            canvas.strokeStyle = strokeBG;
        else
            canvas.strokeStyle = strokeFG;
        canvas.beginPath();
        canvas.arc(i * gap + gapHalf + xOffset, height, radius, 0, Math.PI * 2);
        canvas.stroke();
    }
}

function drawNotes(canvas, intervalsArray = INTERVALS["chromatic"], start = 0, notesArray = NOTES.letters, height = 51, xOffset = 0, length = 13, modulo = 12, font = "24px JetBrains Mono", colorFG = "#000", colorBG = "#bbb", width = canvasWidth) {
    const gap = width / 13;
    const gapHalf = width / 26;
    canvas.textAlign = "center";
    canvas.textBaseline = "middle";
    canvas.font = font;
    for (let i = 0; i < length; i++) {
        if (intervalsArray[i] === false)
            canvas.fillStyle = colorBG;
        else
            canvas.fillStyle = colorFG;
        canvas.fillText(notesArray[(i + start) % modulo], i * gap + gapHalf + xOffset, height);
    }
}

function drawWave(canvas, frequency, amplitude, stroke = "#000", height = 101, width = canvasWidth, strokewidth = 2) {
    canvas.beginPath();
    canvas.moveTo(0, height);
    for (let x = 0; x < width; x++) {
        const y = height + amplitude * 90 * Math.sin(frequency * x * Math.PI / 32000);
        canvas.lineTo(x, y);
    }
    canvas.strokeStyle = stroke;
    canvas.lineWidth = strokewidth;
    canvas.stroke();
}

function drawWaveVertical(canvas, frequency, amplitude, xOffset = 101, stroke = "#000", height = 640, strokewidth = 2) {
    canvas.beginPath();
    canvas.moveTo(xOffset + amplitude * 90, height);
    for (let y = height; y > 0; y--) {
        const x = xOffset + amplitude * 90 * Math.sin(frequency * (height - y) * Math.PI / 32000 + 1.57);
        canvas.lineTo(x, y);
    }
    canvas.strokeStyle = stroke;
    canvas.lineWidth = strokewidth;
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

function drawGrid(canvas, rows = [51], gap = 32, height = 100, xOffset = 16, strokeFG = "#000", strokeBG = "#999", strokewidth = 2, width = canvasWidth) {
    canvas.lineWidth = strokewidth;
    canvas.strokeStyle = strokeBG;
    canvas.beginPath();
    for (let i = xOffset + 1; i < width; i += gap) {
        canvas.moveTo(i, 0);
        canvas.lineTo(i, height);
    }
    canvas.stroke();
    canvas.strokeStyle = strokeFG;
    canvas.beginPath();
    if (rows) {
        for (let i = 0; i < rows.length; i++) {
            canvas.moveTo(0, rows[i]);
            canvas.lineTo(width, rows[i]);
        }
    }
    canvas.stroke();
}

function drawBeats(canvas, beats, gap = 32, height = 51, width = canvasWidth, colorFG = "#000", colorBG = "#fff", radius = 10, strokewidth = 2, xOffset = 16) {
    let x = xOffset + 1;
    let bars = width / (beats.length * gap);
    canvas.strokeStyle = colorFG;
    for (let j = 0; j < bars; j++) {
        for (let i = 0; i < beats.length; i++) {
            if (beats[i] == 0) { x += gap; continue; }
            canvas.beginPath();
            canvas.arc(x, height, radius, 0, Math.PI * 2);
            if (beats[i] === 1) { canvas.fillStyle = colorFG; canvas.fill(); }
            else if (beats[i] === 2) { canvas.fillStyle = colorBG; canvas.stroke(); }
            x += gap;
        }
    }
}

function drawSequence(canvas, durations, notes, bars, yOffset, xOffset = 7, radius = 5, color = "#000") {
    let x = xOffset;
    let y = yOffset;
    canvas.fillStyle = color;
    canvas.beginPath();
    for (let bar = 0; bar < bars; bar++) {
        for (let i = 0; i < durations[bar].length; i++) {
            y = yOffset - notes[bar][i] * 16;
            canvas.moveTo(x, y);
            canvas.arc(x, y, radius, 0, Math.PI * 2);
            x += Math.floor(durations[bar][i] / 31.25);
        }
    }
    canvas.fill();
}

function drawChord(canvas, chords, bars, yOffset, xOffset = 7, gap = 128, radius = 5, color = "#000") {
    let x = xOffset;
    let y = yOffset;
    canvas.fillStyle = color;
    canvas.beginPath();
    for (let bar = 0; bar < bars; bar++) {
        y = yOffset - chords[bar] * 16;
        canvas.moveTo(x, y)
        canvas.arc(x, y, radius, 0, Math.PI * 2);
        x += gap;
    }
    canvas.fill();
}

function intializeSliders(slider, minimum, maximum, step, value) {
    slider.min = minimum;
    slider.max = maximum;
    slider.step = step;
    slider.value = value;
}

async function playNote(frequency, amplitude, duration, durationSilent, durationFade) {
    var gainNode = audioContext.createGain();
    var oscillator = audioContext.createOscillator();
    oscillator.frequency.value = frequency;
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    gainNode.gain.value = amplitude;
    oscillator.start();
    await new Promise(resolve => setTimeout(resolve, duration));
    gainNode.gain.setTargetAtTime(0, audioContext.currentTime, durationFade); // fade to prevent clicking sound
    await new Promise(resolve => setTimeout(resolve, durationSilent));
    oscillator.disconnect(gainNode);
    gainNode.disconnect(audioContext.destination);
    oscillator = null;
    gainNode = null;
}

async function playBeats(beats, tempo = 32) {
    for (let i = 0; i < beats.length; i++) {
        if (beats[i] === 0) await new Promise(resolve => setTimeout(resolve, tempo * 10));
        else if (beats[i] === 1) { playNote(440, 0.3, 100, 1000, 0.2); await new Promise(resolve => setTimeout(resolve, tempo * 10)); }
        else if (beats[i] === 2) { playNote(146, 0.5, 100, 1000, 0.3); await new Promise(resolve => setTimeout(resolve, tempo * 10)); }
    }
}

async function playNotes(notes, durations, amplitude, notesFrequencies, tempo = 1) {
    for (let i = 0; i < notes.length; i++) {
        playNote(notesFrequencies[notes[i]], amplitude, 100, durations[i] * tempo, 0.1);
        await new Promise(resolve => setTimeout(resolve, durations[i] * tempo));
    }
}

function getNotes(note, intervals) {
    var notes = [];
    for (let i = 0; i < 12; i++) {
        if (intervals[i])
            notes.push((note + i) % 12);
    }
    return notes;
}

function getFrequencies(notes, octave) {
    var frequencies = [];
    for (let i = 0; i < notes.length; i++)
        frequencies.push(FREQUENCIES[octave * 12 + notes[i]])
    return frequencies;
}

function getChord(rootNote, intervalArray, octave) {
    chord = [];
    for (let i = 0; i < 12; i++)
        if (intervalArray[i])
            chord.push(FREQUENCIES[rootNote + octave * 12 + i]);
    return chord;
}

function getChordProgression(scale) {
    if (scale === "major" || scale === "harmonic major")
        return CHORDPROGRESSION["diatonicmajor"];
    else if (scale === "minor" || scale === "harmonic minor")
        return CHORDPROGRESSION["diatonicminor"];
    else if (scale === "pentatonic major")
        return CHORDPROGRESSION["pentatonicmajor"];
    else if (scale === "pentatonic minor")
        return CHORDPROGRESSION["pentatonicminor"];
}

async function playChord(frequencyArray, amplitude, oscillators, durationFadeIn = 0.5) {
    var gainNode = audioContext.createGain();
    for (var i = 0; i < frequencyArray.length; i++) {
        var oscillator = audioContext.createOscillator();
        oscillator.frequency.value = frequencyArray[i];
        oscillator.connect(gainNode);
        oscillator.start();
        oscillators.push(oscillator);
    }
    gainNode.connect(audioContext.destination);
    gainNode.gain.value = 0;
    gainNode.gain.setTargetAtTime(amplitude / frequencyArray.length, audioContext.currentTime, durationFadeIn);
    return gainNode;
}

async function stopChord(oscillators, gainNode, oscillatorsLength, durationFadeOut = 0.5) {
    gainNode.gain.setTargetAtTime(0, audioContext.currentTime, durationFadeOut);
    await new Promise(resolve => setTimeout(resolve, durationFadeOut * 2000));
    for (let i = 0; i < oscillatorsLength; i++) {
        let oscillator = oscillators.shift()
        oscillator.stop();
        oscillator.disconnect(gainNode);
        oscillator = null;
    }
    gainNode.disconnect(audioContext.destination);
    gainNode = null;
}

function getNextNote(currentNote) {
    let sum = 0;
    let randomNum = Math.random();
    for (let i = 0; i < nextNoteTransitionProbability.length ; i++) {
        sum += nextNoteTransitionProbability[i]
        if (sum > randomNum) {
            return (currentNote + i) % 7;
        }
    }
}

// not an accurate markov chain, since probabilities are not independent
// but generating a random number once is more efficient, and sounds better
function getNextRhythm(currentRhythm) {
    let nextRhythm = [];
    for (let i = 0; i < currentRhythm.length; i++) {
        let randomNum = Math.random();
        if (currentRhythm[i] === 4000) {
            if (randomNum < 0.8) nextRhythm.push(2000, 2000);
            else nextRhythm.push(4000);
        }
        else if (currentRhythm[i] === 2000) {
            if (currentRhythm[i + 1] === 2000 && randomNum < 0.1) { nextRhythm.push(4000); i++; }
            else if (randomNum < 0.8) nextRhythm.push(1000, 1000);
            else nextRhythm.push(2000);
        }
        else if (currentRhythm[i] === 1000) {
            if (currentRhythm[i + 1] === 1000 && randomNum < 0.2) { nextRhythm.push(2000); i++; }
            else if (randomNum < 0.8) nextRhythm.push(500, 500);
            else nextRhythm.push(1000);
        }
        else if (currentRhythm[i] === 500) {
            if (randomNum < 0.5) nextRhythm.push(1000);
            else nextRhythm.push(500, 500);
            i++;
        }
    }
    return nextRhythm;
}

function getSequence(time, bars, tunes, sharps, chords, tunesDurations, sharpDurations) {
    tunes.length = 0;
    sharps.length = 0;
    chords.length = 0;
    tunesDurations.length = 0;
    sharpDurations.length = 0;
    var currentNote = 0;
    var tunesDurationBar = [1000 * time];
    for (let i = 0; i < bars; i++) {
        currentNote = getNextNote(currentNote);
        mainChords.push(currentNote);
        let sharpDurationBar = [];
        for (let j = 0; j < time; j++)
            sharpDurationBar.push(500, 500);
        sharpDurations.push(sharpDurationBar);
        let sharpTones = [];
        for (let j = 1; j <= time; j++)
            sharpTones.push((currentNote + j) % 7, currentNote);
        sharps.push(sharpTones);
        // main melody
        tunesDurationBar = getNextRhythm(tunesDurationBar)
        tunesDurations.push(tunesDurationBar);
        let tunesTones = [];
        tunesTones.push(currentNote);
        for (let j = 1; j < tunesDurationBar.length; j++)
            tunesTones.push(getNextNote(currentNote));
        tunes.push(tunesTones);
//        console.log(currentNote, sharpTones, sharpDurationBar, tunesTones, tunesDurationBar);
    }
}
