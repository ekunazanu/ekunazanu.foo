// primary audiocontext node
const audioContext = new AudioContext();

// scale interval table to construct sequences
const intervals = {
    "chromatic": [true, true, true, true, true, true, true, true, true, true, true, true, true],
    "major": [true, false, true, false, true, true, false, true, false, true, false, true, true],
    "harmonic major": [true, false, true, false, true, true, false, true, true, false, false, true, true],
    "minor":  [true, false, true, true, false, true, false, true, true, false, true, false, true],
    "harmonic minor":  [true, false, true, true, false, true, false, true, true, false, false, true, true],
    "pentatonic major": [true, false, true, false, true, false, false, true, false, true, false, false, true],
    "pentatonic minor": [true, false, false, true, false, true, false, true, false, false, true, false, true],
};
const intervalNames = ["chromatic", "major", "harmonic major", "minor", "harmonic minor", "pentatonic major", "pentatonic minor"];

// chord intervals
const chords = {
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
const chordNames = ["major", "minor", "augmented", "diminished", "suspended2", "suspended4", "major7", "minor7", "dominant7"];

// used for drawing canvas items
const notes = {
    letters: ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"],
    numbers: ["A4", "A#4", "B4", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A5"],
    intervals: ["P1", "m2", "M2", "m3", "M3", "P4", "TT", "P5", "m6", "M6", "m7", "M7", "P8"],
    ratiosJust: ["16:15", "9:8", "6:5", "5:4", "4:3", "45:32", "3:2", "8:5", "5:3", "9:5", "15:8", "2:1"],
    ratiosEqual: ["2^1/12", "2^2/12", "2^3/12", "2^4/12", "2^5/12", "2^6/12", "2^7/12", "2^8/12", "2^9/12", "2^10/12", "2^11/12", "2^12/12"],
    frequencies: ["440Hz", "466Hz", "494Hz", "523Hz", "554Hz", "587Hz", "622Hz", "659Hz", "698Hz", "740Hz", "784Hz", "831Hz", "880Hz"],
};

// frequecies from A1 to A7
const frequencyList = [55, 58.2, 61.7, 65.4, 69.2, 73.4, 77.7, 82.4, 87.3, 92.4, 98, 103, 110, 116, 123, 130, 138, 146, 155, 164, 174, 184, 195, 207, 220, 233, 246, 261, 277, 293, 311, 329, 349, 369, 391, 415, 440, 466, 493, 523, 554, 587, 622, 659, 698, 739, 783, 830, 880, 932, 987, 1046, 1108, 1174, 1244, 1318, 1396, 1479, 1567, 1661, 1760, 1864, 1975, 2093, 2217, 2349, 2489, 2637, 2793, 2959, 3135, 3322, 3520]

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
canvasBeats.canvas.height = 200;

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
const rowsWaveRatios = [81, 161, 241, 321, 401, 481, 541, 601, 107, 213, 321, 427];
const waveRatios = [1, 16/15, 9/8, 6/5, 5/4, 4/3, 45/32, 3/2, 8/5, 5/3, 9/5, 15/8, 2/1];
drawTimeGrid(canvasIntervalRatioWaves, rowsWaveRatios, 98.46, "#ddd", "#ddd", 2, canvasWidth, 640, -49);
for (let i = 0; i < 13; i++) {
    drawWaveVertical(canvasIntervalRatioWaves, 600, 0.4, 49 + i * 98.46, "#aaa");
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
drawNotes(canvasJustIntonation, intervals.chromatic, 0, notes.intervals, 51, 0, 13, 13);

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
drawNotes(canvasJustIntonation, intervals.chromatic, 0, notes.ratiosJust, 151, 100, 12);
drawNotes(canvasJustIntonationAlt, intervals.chromatic, 0, notes.ratiosJust, 301, 100, 12);
drawNotes(canvasJustIntonationAlt, intervals.chromatic, 0, ["135:128", "9:8", "75:64"], 96, 200, 3);
drawNotes(canvasEqualTemperament, intervals.chromatic, 0, notes.ratiosEqual, 301, 100, 12, 12, "20px JetBrains Mono");
drawNotes(canvasEqualTemperament, intervals.chromatic, 0, ["2^1/12", "2^2/12", "2^3/12"], 95, 201, 3, 12, "20px JetBrains Mono");
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
drawNotes(canvasNotesOneOctave, intervals.chromatic, 0, notes.numbers, 81);
drawNotes(canvasNotesOneOctave, intervals.chromatic, 0, notes.ratiosEqual, 181, 100, 12, 12, "20px JetBrains Mono");
drawNotes(canvasNotesOneOctave, intervals.chromatic, 0, notes.frequencies, 15, 0, 13, 13);

// draw notes - all octaves
drawCircles(canvasNotesAllOctaves, intervals.chromatic, 80);
drawCircles(canvasNotesAllOctaves, intervals.chromatic, 301, 96, 5, 2, "#000", "#999", 1248, 15);
drawNotes(canvasNotesAllOctaves, intervals.chromatic, 0, notes.numbers, 81, 0, 13, 13);
drawNotes(canvasNotesAllOctaves, intervals.chromatic, 0, notes.frequencies, 15, 0, 13, 13);
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

// intialize canvas finctions for scales canvas
var selectedScaleNote = 0;
var selectedScaleInterval = "major";
drawNotes(canvasScales, intervals.chromatic, 0, notes.intervals, 121, 0, 13, 13);
const playScaleButton = document.getElementById("playScaleButton");
const selectScaleNote = document.getElementById("selectScaleNote");
notes.letters.forEach((element, index) => {
    const newOption = document.createElement("option");
    newOption.value = index;
    newOption.text = element;
    selectScaleNote.appendChild(newOption);
});
const selectScaleInterval = document.getElementById("selectScaleInterval");
intervalNames.forEach(element => {
    const newOption = document.createElement("option");
    newOption.value = element;
    newOption.text = element;
    selectScaleInterval.appendChild(newOption);
});
selectScaleNote.value = selectedScaleNote;
selectScaleInterval.value = selectedScaleInterval;
drawCircles(canvasScales, intervals[selectedScaleInterval]);
drawNotes(canvasScales, intervals[selectedScaleInterval], selectedScaleNote);
// update canvas and variables on root note change
selectScaleNote.addEventListener("change", (event) => {
    canvasScales.clearRect(0, 0, canvasWidth, 100);
    selectedScaleNote = parseInt(selectScaleNote.value);
    selectedScaleInterval = selectScaleInterval.value;
    drawCircles(canvasScales, intervals[selectedScaleInterval]);
    drawNotes(canvasScales, intervals[selectedScaleInterval], selectedScaleNote);
});
selectScaleInterval.addEventListener("change", (event) => {
    canvasScales.clearRect(0, 0, canvasWidth, 100);
    selectedScaleNote = parseInt(selectScaleNote.value);
    selectedScaleInterval = selectScaleInterval.value;
    drawCircles(canvasScales, intervals[selectedScaleInterval]);
    drawNotes(canvasScales, intervals[selectedScaleInterval], selectedScaleNote);
});
var isPlayingScale = false;
playScaleButton.addEventListener("click", async function() {
    if (!isPlayingScale) {
        isPlayingScale = true;
        playScaleButton.innerHTML = "Playing";
        playScaleButton.style.pointerEvents = "none"
        for (let i = 0; i < 13; i++) {
            if (intervals[selectedScaleInterval][i]) {
                canvasScales.clearRect(0, 145, canvasWidth, 15);
                drawTriangle(canvasScales, i * 98.46 + 49, 150);
                await playNote(frequencyList[selectedScaleNote + 36 + i], 1, 400, 400, 0.1);
            }
        }
        canvasScales.clearRect(0, 145, canvasWidth, 25);
        isPlayingScale = false;
        playScaleButton.style.pointerEvents = "auto"
        playScaleButton.innerHTML = "Play notes";
    }
});

// intialize canvas finctions for chords canvas
var selectedChordNote = 0;
var selectedChordInterval = "major";
drawNotes(canvasChords, intervals.chromatic, 0, notes.intervals, 121, 0, 13, 13);
const selectChordNote = document.getElementById("selectChordNote");
notes.letters.forEach((element, index) => {
    const newOption = document.createElement("option");
    newOption.value = index;
    newOption.text = element;
    selectChordNote.appendChild(newOption);
});
const selectChordInterval = document.getElementById("selectChordInterval");
chordNames.forEach(element => {
    const newOption = document.createElement("option");
    newOption.value = element;
    newOption.text = element;
    selectChordInterval.appendChild(newOption);
});
selectChordNote.value = selectedChordNote;
selectChordInterval.value = selectedChordInterval;
drawCircles(canvasChords, chords[selectedChordInterval]);
drawNotes(canvasChords, chords[selectedChordInterval], selectedChordNote);
var chordOscillators = [];
var frequenciesChord = getChord(selectedChordNote, chords[selectedChordInterval], 3);
// update canvas and variables on root note change
selectChordNote.addEventListener("change", (event) => {
    canvasChords.clearRect(0, 0, canvasWidth, 100);
    selectedChordNote = parseInt(selectChordNote.value);
    selectedChordInterval = selectChordInterval.value;
    drawCircles(canvasChords, chords[selectedChordInterval]);
    drawNotes(canvasChords, chords[selectedChordInterval], selectedChordNote);
    frequenciesChord = getChord(selectedChordNote, chords[selectedChordInterval], 3);
    if (chordOscillators.length != 0) {
        stopChord(chordOscillators, gainNodeChord);
        gainNodeChord = playChord(frequenciesChord, 1, chordOscillators);
    }
});
selectChordInterval.addEventListener("change", (event) => {
    canvasChords.clearRect(0, 0, canvasWidth, 100);
    selectedChordNote = parseInt(selectChordNote.value);
    selectedChordInterval = selectChordInterval.value;
    drawCircles(canvasChords, chords[selectedChordInterval]);
    drawNotes(canvasChords, chords[selectedChordInterval], selectedChordNote);
    frequenciesChord = getChord(selectedChordNote, chords[selectedChordInterval], 3);
    if (chordOscillators.length != 0) {
        stopChord(chordOscillators, gainNodeChord);
        gainNodeChord = playChord(frequenciesChord, 1, chordOscillators);
    }
});
var isPlayingChord = false;
playChordButton.addEventListener("click", async function() {
    if (!isPlayingChord) {
        isPlayingChord = true;
        playChordButton.innerHTML = "Stop chord";
        gainNodeChord = playChord(frequenciesChord, 1, chordOscillators);
    }
    else {
        isPlayingChord = false;
        playChordButton.innerHTML = "Play chord";
        stopChord(chordOscillators, gainNodeChord);
    }
});

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
            for (let i = 0.98; i >= 0; i -= 0.02) {          // because i does not go to 1
                canvasDynamics.clearRect(0, 0, canvasWidth, 200);
                drawWave(canvasDynamics, 440, i);
                gainNodeDynamics.gain.value = i;
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            canvasDynamics.clearRect(0, 0, canvasWidth, 200);
            drawWave(canvasDynamics, 440, 0);                 // because i does not go to 0
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
var beatsList = ["Beat A", "Beat B", "Beat C"];
drawTimeGrid(canvasBeats);
const selectBeat = document.getElementById("selectBeat");
beatsList.forEach((element, index) => {
    const newOption = document.createElement("option");
    newOption.value = index;
    newOption.text = element;
    selectBeat.appendChild(newOption);
});
selectBeat.value = 0;
playBeatsButton.addEventListener("click", async function() {
    if (!isPlayingBeats) {
        isPlayingBeats = true;
        playBeatsButton.innerHTML = "Stop playing";
        while (isPlayingBeats) {
            if (selectBeat.value == 0) await playNote(440, 1, 200, 300 + Math.random()*1000, 0.15);
            else if (selectBeat.value == 1) await playNote(440, 1, 200, 300, 0.15);
            else if (selectBeat.value == 2) {
                    await playNote(440, 1, 200, 300, 0.15);
                    await playNote(440, 1, 200, 300, 0.15);
                    await playNote(440, 1, 200, 300, 0.15);
                    await playNote(440, 1, 200, 300, 0.15);
                    await playNote(440, 1, 200, 300, 0.15);
                    await playNote(440, 1, 200, 300, 0.15);
            }
            else break;
        }
    }
    else {
        isPlayingBeats = false;
        playBeatsButton.innerHTML = "Play beat";
    }
});

// draw circles on canvas
function drawCircles(canvas, intervalsArray = intervals["chromatic"], height = 50, circles = 13, radius = 40, strokewidth = 2, strokeFG = "#000", strokeBG = "#bbb", width = canvasWidth, xOffset = 0) {
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

// draw or write notes
function drawNotes(canvas, intervalsArray = intervals["chromatic"], start = 0, notesArray = notes.letters, height = 51, xOffset = 0, length = 13, modulo = 12, font = "24px JetBrains Mono", colorFG = "#000", colorBG = "#bbb", width = canvasWidth) {
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

function drawTimeGrid(canvas, rows = [101], gaps = 256, strokeFG = "#000", strokeBG = "#999", strokewidth = 2, width = canvasWidth, height = 200, xOffset = 0) {
    canvas.lineWidth = strokewidth;
    canvas.strokeStyle = strokeBG;
    canvas.beginPath();
    for (let i = gaps + 1 + xOffset; i < width; i += gaps) {
        canvas.moveTo(i, 0);
        canvas.lineTo(i, height);
    }
    canvas.stroke();
    canvas.strokeStyle = strokeFG;
    canvas.beginPath();
    for (let i = 0; i < rows.length; i++) {
        canvas.moveTo(0, rows[i]);
        canvas.lineTo(width, rows[i]);
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

function getChord(rootNote, intervalArray, octave) {
    chord = [];
    for (let i = 0; i < 12; i++)
        if (intervalArray[i])
            chord.push(frequencyList[rootNote + octave * 12 + i]);
    return chord;
}

function playChord(frequencyArray, amplitude, oscillators) {
    var gainNode = audioContext.createGain();
    for(var i = 0; i < frequencyArray.length; i++) {
        var oscillator = audioContext.createOscillator();
        oscillator.frequency.value = frequencyArray[i];
        oscillator.connect(gainNode);
        oscillator.start();
        oscillators.push(oscillator);
    }
    gainNode.gain.value = amplitude / frequencyArray.length;
    gainNode.connect(audioContext.destination);
    return gainNode;
}

function stopChord(oscillators, gainNode) {
    for (let i = 0; i <= oscillators.length + 1; i++) {
        oscillator = oscillators.pop()
        oscillator.stop();
        oscillator.disconnect(gainNode);
    }
    gainNode.disconnect(audioContext.destination);
}

/*
function playMelody() {
  if (notes.length > 0) {
    note = notes.pop();
    playNote(note[0], 1000 * 256 / (note[1] * tempo));
  }
}

notes.reverse();
tempo = 100;

playMelody();
*/

/*
async function crossFade(audioContextObject, gainObjectIn, gainObjectOut, volumeIn, volumeOut, duration) {
    var curveIn = [volumeIn, 0];
    var curveOut = [0, volumeOut];
    gainObjectOut.gain.setValueCurveAtTime(AA, audioContextObject.currentTime, duration);
    await gainObjectIn.gain.setValueCurveAtTime(AA, audioContextObject.currentTime, duration);
    gainObjectIn = null;
}

function destroyNode(node, outputNode){
    node.disconnect(outputNode);
    node = null;
}

async function playNotes(audioContextObject, frequencyArray, volume, duration) {
    var gainObject = audioContextObject.createGain();
    for(var i = 0; i < frequencyArray.length; i++) {
        var oscillatorObject = audioContextObject.createOscillator();
        oscillatorObject.frequency.value = frequencyArray[i];
        oscillatorObject.connect(gainObject);
        oscillatorObject.start(0);
    }
    gainObject.gain.value = volume / frequencyArray.length;
    gainObject.connect(audioContextObject.destination);
    if (duration) {
        await new Promise(resolve => setTimeout(resolve, duration));
        destroyNode(gainObject, audioContextObject);
    }
    return gainObject;
}
*/
