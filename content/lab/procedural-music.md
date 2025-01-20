+++
title = "Procedural Music"
description = "Using music theory and markov models to generate music, sort of."
weight = 4
draft = false
template = "article.html"
[extra]
type = "article"
thumbnail = "lab.airwaves.svg"
thumbnailalt = "Air particles as black dots on a yellow background."
+++

This is one of the more experimental posts.

I like music — a lot of people do. I also like math — a lot of people do **not**. It's time to mix both these arts. It's time to experiment and create.

## Music Theory
 
To create music, it helps to have an understanding of sounds and why certain sounds are more pleasant than others.

A vibrating object can transmit its vibrations to the ear via [differences in air pressure](https://en.wikipedia.org/wiki/Acoustic_wave), which is then interpreted by the brain as a sound. If the air pressure at the ear is plotted with respect to time, then the resulting graph forms a wave. The amplitude of this wave corresponds to the difference in sound pressure, which is interpreted by the ear and brain as the intensity or **loudness** of the sound. Meanwhile, the frequency of the wave is interpreted as its **pitch**.

<canvas id="canvasWaveOne"></canvas>
<input id="frequencySliderWaveOne" type="range"><br>
<input id="amplitudeSliderWaveOne" type="range"><br>
<button id="playButtonWaveOne">Play sound</button>

### Intervals

The above sound has a singular frequency, and can sound fairly plain. However, another wave can be added to it to make it sound relatively richer and more textured:

<canvas id="canvasWaveTwo"></canvas>
<input id="frequencySliderWaveTwoA" type="range">
<input id="frequencySliderWaveTwoB" type="range"><br>
<input id="amplitudeSliderWaveTwoA" type="range">
<input id="amplitudeSliderWaveTwoB" type="range"><br>
<button id="playButtonWaveTwo">Play sound</button>

{% tangent(summary="Sound distortion", open=true) %}
If the sum of the amplitudes exceeds the maximum amplitude, the sounds may become distorted. The addition of the sound waves produces an amplitude that is greater than the maximum value, and gets [clipped](https://en.wikipedia.org/wiki/Clipping_(signal_processing)#/media/File:Clipping.svg). This creates a square like wave instead of a sine wave, producing a [distinct buzz sound](https://aatishb.com/synthesine/examples/square/index.html).
{% end %}

Try changing the frequency of the second sound (wave) to <a id="switchFrequencyDouble" style="cursor: pointer;">twice</a> of the other. Now try it again with <a id="switchFrequencyOneHalf" style="cursor: pointer;">one and a half times</a> the other one. Try it using other frequencies too, and notice when they sound pleasant. When the frequency of the two sounds are in simple ratios, they sound harmonious.

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

The twelve notes are used to describe pitches up to one [octave](https://en.wikipedia.org/wiki/Octave) high. To describe pitches that are beyond this range, the same notes are used — with numbers to differentiate them. A note with one number greater indicates a pitch that is an octave higher than the same note with one number lower. Generally, A4 has a pitch of 440Hz, so A5 is 880Hz and A3 is 220Hz. Other notes follow a similar convention.

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

When two notes are played separately in succession, it is called a [melodic interval](https://en.wikipedia.org/wiki/Melody). When the two notes are played in unison, it is called a [harmonic interval](https://en.wikipedia.org/wiki/Harmony). And when three or more notes are played simultaneously, it is called a [chord](https://en.wikipedia.org/wiki/Chord_(music)). Except [power chords](https://en.wikipedia.org/wiki/Power_chord) (which consist of two notes) are also chords, and [arpeggios](https://en.wikipedia.org/wiki/Arpeggio) (notes played separately in succession) can be chords too, so the definition is somewhat loose. Typically, chords are triads — consisting of a root note, a third, and a fifth. The names of chords again depend on the intervals of its constituent notes.

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

The first beat is [periodic](https://en.wikipedia.org/wiki/Metre_(music)), and can sound monotonous and dull. The second beat has periodically [accentuated beats](https://en.wikipedia.org/wiki/Accent_(music)) and sounds more cadenced and 'rhythmic'. Generally, the accentuated beats are [organized](https://en.wikipedia.org/wiki/Bar_(music)) in groups of [three](https://en.wikipedia.org/wiki/Triple_metre) or [four](https://en.wikipedia.org/wiki/Duple_and_quadruple_metre#Quadruple_metre) into [bars](https://en.wikipedia.org/wiki/Bar_(music)). This beat [structure](https://en.wikipedia.org/wiki/Time_signature) is common in pop and rock, while other genres can have more complex beats.

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

### Stochastic Transitions

One way to make the rhythm non-repetitive is by introducing some randomness to the rhythm. A note with a fixed duration can randomly be replaced by two notes with half the duration — and vice versa.

<canvas id="canvasTransitionRhythm"></canvas>

This type of transition preserves the structure of the current rhythm. However, it can still sound random if the transitions are uniformly random. Using weighted probabilities to emphasize specific transitions can reduce the randomness. These transition probabilities can be modeled using a [graph](https://en.wikipedia.org/wiki/Markov_chain).

<canvas id="canvasMarkovRhythm"></canvas>

The pitch for the next notes are similarly generated using weighted probabilities. Simpler intervals ([fifths](https://en.wikipedia.org/wiki/Circle_of_fifths) for example) have a higher probability of being selected, when using a major scale.

<canvas id="canvasMarkovIntervals"></canvas>

These combined provide a basic framework for generating a melody.

## Playground

The main tone generation setup is quite simple. The transition probabilities are used to generate the main melody. The melody is augmented with their [respective chords](https://en.wikipedia.org/wiki/Roman_numeral_analysis), but at a lower frequency (both in pitch and rhythm). A higher octave ascending-oscillating beat also accompanies the melody.

Feel free to experiment with the octaves and amplitudes for the individual pieces, or alter the scale or tempo to change the vibe of the sounds altogether. The updates are applied at the end of each bar.

<button id="mainGenerate">Generate new sequence</button><br>
<canvas id="canvasMain"></canvas>
<select id="selectMainSharpOctave"></select><input id="sliderMainSharpAmplitude" type="range"><br>
<select id="selectMainTunesOctave"></select><input id="sliderMainTunesAmplitude" type="range"><br>
<select id="selectMainChordOctave"></select><input id="sliderMainChordAmplitude" type="range"><br>
<select id="selectMainScaleRoot"></select><select id="selectMainScaleType"></select><button id="playMainButton">Play</button><br>
Tempo: <input id="sliderMainTempo" type="range"><br>

Does it sound like 'music'? Maybe not. But it sounds arguably good for something that is effectively randomly generated. And it might be useful in environments requiring ambient music that is not attention grabbing — in arcade-ish games for example.

All throughout, only a simple composition of [pure tones](https://en.wikipedia.org/wiki/Pure_tone) (purely sinusoidal sound waves) were used. But the [waveforms](https://en.wikipedia.org/wiki/Waveform) can also be modified to make it sound like [different musical instruments](https://en.wikipedia.org/wiki/Timbre). While it is possible to recreate it using [code](https://developer.mozilla.org/en-US/docs/Web/API/WaveShaperNode), I would prefer using my own recordings and samples to experiment with. Perhaps later, in another post.

For now, I am satisfied with how it sounds given how simple the mechanism for the tone generation process is.

<script src="/scripts/procedural-music.js"></script>
