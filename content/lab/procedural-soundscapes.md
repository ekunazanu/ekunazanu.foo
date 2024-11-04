+++
title = "Procedural Soundscapes"
description = "Using music theory to generate ambient sounds."
date = 2025-03-01
weight = 4
draft = true
template = "article.html"
[extra]
type = "article"
thumbnail = "lab.airwaves.svg"
thumbnailalt = "Air particles as black dots on a yellow background."
+++

This is one of the more experimental posts.

I like music — a lot of people do. I also like math — a lot of people do **not**. It's time to mix both these arts. It's time to experiment and create.

## Music Theory
 
To create soothing soundscapes, it helps to have an understanding why certain sounds are more pleasant than others.

A vibrating object can transmit its vibrations to the ear via [differences in air pressure](https://en.wikipedia.org/wiki/Acoustic_wave), which is then interpreted by the brain as a sound. If the air pressure at the ear is plotted with respect to time, then the resulting graph forms a wave. The amplitude of this wave corresponds to the difference in sound pressure, which is interpreted by the ear and brain as the intensity or **loudness** of the sound. Meanwhile, the frequency of the wave is interpreted as its **pitch**.

<canvas id="canvasWaveOne"></canvas>
<input id="frequencySliderWaveOne" type="range"><br>
<input id="amplitudeSliderWaveOne" type="range"><br>
<button id="playButtonWaveOne">Play sound</button>

### Intervals

The above sound has a singular frequency, and can sound fairly plain. However, another wave can be added to it to make it sound relatively richer and more complex:

<canvas id="canvasWaveTwo"></canvas>
<input id="frequencySliderWaveTwoA" type="range">
<input id="frequencySliderWaveTwoB" type="range"><br>
<input id="amplitudeSliderWaveTwoA" type="range">
<input id="amplitudeSliderWaveTwoB" type="range"><br>
<button id="playButtonWaveTwo">Play sound</button>

{% tangent(summary="Sound distortion", open=true) %}
If the sum of the amplitudes exceeds the maximum amplitude, the sounds may become distorted. The addition of the sound waves produces an amplitude that is greater than the maximum value, and gets [clipped](https://en.wikipedia.org/wiki/Clipping_(signal_processing)#/media/File:Clipping.svg). This creates a square like wave instead of a sine wave, producing a [distinct buzz sound](https://aatishb.com/synthesine/examples/square/index.html).
{% end %}

Try changing the frequency of the second sound (wave) to <a id="switchFrequencyDouble" style="cursor: pointer;">twice</a> of the other. Now try it again with <a id="switchFrequencyOneHalf" style="cursor: pointer;">one and a half times</a> the other one. Try it using other frequencies too, and notice when they sound pleasant. When the freuqency of the two sounds are in simple ratios, they sound harmonious.

Music theory is based around these ratios, or [intervals](https://en.wikipedia.org/wiki/Interval_(music)). A frequency ratio of 2:1 is called a perfect octave. A ratio of 3:2 is a perfect fifth, 4:3 is a perfect fourth, and 5:4 is a major third. The smallest of the intervals is called a minor second or semitone, having a ratio of 16:15. The minor second, along with the [tritone](https://en.wikipedia.org/wiki/Tritone) and other intervals sound [dissonant](https://en.wikipedia.org/wiki/Consonance_and_dissonance) since they do not have simple frequency ratios, but are still useful for creating [tension](https://en.wikipedia.org/wiki/Tension_(music)).

<canvas id="canvasIntervalRatioWaves"></canvas>
<canvas id="canvasJustIntonation"></canvas>

This simple integer ratio interval system is the [just intonation](https://en.wikipedia.org/wiki/Just_intonation) tuning system. But because of the way the intervals are defined, it is [mathematically impossible](https://www.youtube.com/watch?v=1Hqm0dYKUx4) to have consistent interval ratios between any two sounds. Instead, the [equal temperament](https://en.wikipedia.org/wiki/Equal_temperament) (equally spaced intervals) system is used to minimize the *overall* deviations in intonation.

<canvas id="canvasJustIntonationAlt"></canvas>
<canvas id="canvasEqualTemperament"></canvas>

### Scales

Instead of using frequencies and interval ratios to describe pitches, music theory has twelve letters or [notes](https://en.wikipedia.org/wiki/Musical_note) — A, A#, B, C, C#, D, D#, E, F, F#, G, G# — to describe the pitch of a sound. Usually, the A note describes a pitch with a frequency of [440Hz](https://en.wikipedia.org/wiki/A440_(pitch_standard)). The other notes denote a frequency that are interval multiples of the base note.

<canvas id="canvasNotesOneOctave"></canvas>

{% tangent(summary="Sharps and Flats", open=false) %}
[Sharps](https://en.wikipedia.org/wiki/Accidental_(music)) (denoted using a #) can also be alternatively be written as flats (denoted with a ♭). Sharps indicate the sharper (higher) pitch variant of a note while flats indicate the flatter (lower) pitch variant of a note. For example, C# and D♭ is the same note. Certain notes do not have a sharp or flat variant; the naming convention is purely arbitrary. So all the notes can also be rewritten as: A, B♭, B, C, D♭, D, E♭, E, F, G♭, G, A♭. Using seven letters to describe twelve notes has to do with the [origins of music theory](https://www.reddit.com/r/musictheory/wiki/faq/history/alphabet/) itself and [western music](https://www.reddit.com/r/musictheory/wiki/faq/history/whytwelve/).
{% end %}

The twelve notes are used to describe pitches upto one [octave](https://en.wikipedia.org/wiki/Octave) high. To describe pitches that are beyond this range, the same notes are used — with numbers to differentiate them. A note with one number greater indicates a pitch that is an octave higher than the same note with one number lower. Generally, A4 has a pitch of 440Hz, so A5 is 880Hz and A3 is 220Hz. Other notes follow a similar convention.

<canvas id="canvasNotesAllOctaves"></canvas>

{% tangent(summary="Similarity across octaves", open=false) %}
Due to the note nomenclature, the names of notes will repeat after every twelve notes. This is intentional. Because of the equal temperament interval structure, notes double in frequency after every twelve notes, or an octave. Notes with frequencies that are binary multiples (half, double, quarter, etc) of itself will sound similar to each other. So all the notes in an octave sound similar to the respective notes in higher and lower octaves. For example, A4 (440Hz) will sound similar to A5 (880Hz), A3 (220Hz), A2 (110Hz) and so on. Similarly, all other notes will sound similar to their respective notes in higher and lower octaves.
{% end %}

From the twelve notes of an octave, a subset can be selected to get a [scale](https://en.wikipedia.org/wiki/Scale_(music)). Scales are defined by intervals and a note — by selecting a certain subset of intervals, a distinct 'mood' for the sounds can be established. Music in [major scales](https://en.wikipedia.org/wiki/Major_scale) generally sound upbeat, while music in [minor scales](https://en.wikipedia.org/wiki/Minor_scale) can sound melancholic. The [pentatonic scale](https://en.wikipedia.org/wiki/Pentatonic_scale) has an interval structure with five notes and is common in rock music.

<canvas id="canvasScales"></canvas>
<select id="selectScaleNote"></select><select id="selectScaleInterval"></select><button id="playScaleButton">Play notes</button>

{% tangent(summary="Interval structure harmony", open=true) %}
The interval structure of a scale defines its 'vibe'. A scale with dissonant intervals can sound jarring and tense, while a scale with a consonant intervals can sound upbeat and bright.
{% end %}

When two notes are played separately in succession, it is called a [melodic interval](https://en.wikipedia.org/wiki/Melody). When the two notes are played in unison, it is called a [harmonic interval](https://en.wikipedia.org/wiki/Harmony). And when three or more notes are played simultaneously, it is called a [chord](https://en.wikipedia.org/wiki/Chord_(music)). Except [power chords](https://en.wikipedia.org/wiki/Power_chord) (which consist of two notes) are also chords, and [arpeggios](https://en.wikipedia.org/wiki/Arpeggio) (notes played separately in succession) can be chords too, so the definition is somewhat loose. Typically, chords are triads — consiting of a root note, a third, and a fifth. The names of chords again depend on the intervals of its constituent notes.

<canvas id="canvasChords"></canvas>
<select id="selectChordNote"></select><select id="selectChordInterval"></select><button id="playChordButton">Play chord</button>

Chords can add more depth and texture to sounds than single-pitch notes. The scale, as well the progression of chords can be selectively chosen to create sounds for evoking a specific mood.

However, the amplitude, just like the pitch, can also be altered to change the character of a sound. Gradually increasing the amplitude of a sound can create drama and tension. Similarly sounds with gradually decreasing volume can be used to resolve tension. The variation in loudness of sounds is called [dynamics](https://en.wikipedia.org/wiki/Dynamics_(music)).

<canvas id="canvasDynamics"></canvas>
<button id="playDynamicsButton">Increase amplitude</button>

Dynamics can enhance notes and chords by making them more expressive — by adding another layer of character to the sounds.

### Rhythm

Try playing the two beats:

<canvas id="canvasBeats"></canvas>
<select id="selectBeat"></select><button id="playBeatsButton">Play beat</button>

The first beat is [periodic](https://en.wikipedia.org/wiki/Metre_(music)), and can sound monotonous and dull. The second beat has periodically [accentuated beats](https://en.wikipedia.org/wiki/Accent_(music)) and sounds more cadenced and 'rhythmic'. Generally, the accentuated beats are [organised](https://en.wikipedia.org/wiki/Bar_(music)) in groups of [three](https://en.wikipedia.org/wiki/Triple_metre) or [four](https://en.wikipedia.org/wiki/Duple_and_quadruple_metre#Quadruple_metre). This beat [structure](https://en.wikipedia.org/wiki/Time_signature) is common in a lot of pop and rock music, while genres like jazz can have more complex beats.

<canvas id="canvasTimeSignature"></canvas>
<select id="selectTimeSignature"></select><button id="playTimeSignatureButton">Play beat</button>

Even then, the beat will begin to sound repetitive if played long enough. The obvious way to go about it is to introduce variations in the duration of certain notes, while still loosely sticking to the same beat structure. The duration of beats can be altered to be half, twice, or quadruple the duration of a single beat. Or [somewhere in between](https://en.wikipedia.org/wiki/Note_value).

The number of beats per minute or [tempo](https://en.wikipedia.org/wiki/Tempo) can itself be varied, against which the beat structure is measured and built upon.

<canvas id="canvasTempo"></canvas>
<input id="sliderTempo" type="range"><br>
<button id="playTempoButton">Play beat</button>

Altering the rhythm patterns can make sounds structured and more pleasing, but it can also be used to again set the of mood of the sound. For instance, the tempo of the music can be varied to produce different vibes — a fast beat can sound energetic, while a slower one can sound more relaxed and mellow.
## Procedural Generation

Music theory provides guidelines for the pitch and timing of notes, to create sounds that evoke different emotions. The aforementioned ones can be distilled to:

* Deriving the pitch using structured intervals or a scale.
* Deriving the timing from a dynamic yet structured beat.

The pitch for the notes can be simply selected from a scale, or it also be dynamically generated easily. However, generating a sequence for the timing that is both structured and non-repeating is slightly more complicated.

### Chaos Theory

Maybe [fractals](https://en.wikipedia.org/wiki/Fractal). Maybe include [images](https://en.wikipedia.org/wiki/Mandelbrot_set#Image_gallery_of_a_zoom_sequence) Another [cellular automaton](https://en.wikipedia.org/wiki/Cellular_automaton), and [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) is.

## Sandbox

certain configurable settings — mood: happy(relaxed), sad, eerie(tensed but slow scary), upbeat-angry.

<select id="selectMainTime"></select><select id="selectMainScaleRoot"></select><select id="selectMainScaleType"></select><br>
<button id="mainGenerate">Generate new sequence</button><button id="playMainButton">Play</button>

---

## References

* Make sounds similar to Limbo game OST

<!--
* https://ivanish.ca/diminished-fifth/
* https://generative.fm/
* https://medium.com/@alexbainter/making-generative-music-in-the-browser-bfb552a26b0b
* https://crow-caw.com/60-why/61-algorithms-and-ambient/
* https://ciechanow.ski/sound/
* search for algorithmic composition
* https://tones.wolfram.com/about/how-it-works/
* Alt -> https://alterebro.com/ for generative images
* https://www.youtube.com/@marcevanstein
* https://learningmusic.ableton.com/make-beats/tempo-and-genre.html/
* https://musiclab.chromeexperiments.com/Harmonics/
* https://musiclab.chromeexperiments.com/Piano-Roll/
-->
<script src="/media/lab/procedural-soundscapes.js"></script>
