+++
title = "Procedural Music"
description = "Using music theory and randomness to generate basic tunes."
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
 
To create music, it first helps to have some understanding of what sounds are and why certain sounds are more pleasant than others.

Consider any vibrating object. It can transmit its vibrations to the ear via [differences in air pressure](https://en.wikipedia.org/wiki/Acoustic_wave), which is then interpreted by the brain as a sound. If the air pressure at the ear is plotted with respect to time, then the resulting graph forms a wave. The differences in air pressure (represented by the amplitude of the wave), is interpreted by the ear and the brain as the intensity or **loudness** of the sound. Meanwhile the frequency of the pressure changes (represented by the wave frequency), is interpreted as the sound's **pitch**.

Here, the sound source is a vibrating object, oscillating in a [sinusoidal](https://en.wikipedia.org/wiki/Sine_wave) motion — and thus the resulting air-pressure-time-graph looks like a sine wave.

<canvas id="canvasWaveOne"></canvas>
<input id="frequencySliderWaveOne" type="range"><br>
<input id="amplitudeSliderWaveOne" type="range"><br>
<button id="playButtonWaveOne">Play sound</button>

### Intervals

The above sound has a singular frequency, and may sound simple. While introducing variations to the frequency and amplitude can make it somewhat interesting, it might still sound fairly plain. The (perhaps) natural question then would be, what if there was another sound to play around with, instead of having only one sound — another sound with its own knobs for frequency and amplitude? What would the addition of the sounds, sound like?

<canvas id="canvasWaveTwo"></canvas>
<input id="frequencySliderWaveTwoA" type="range">
<input id="frequencySliderWaveTwoB" type="range"><br>
<input id="amplitudeSliderWaveTwoA" type="range">
<input id="amplitudeSliderWaveTwoB" type="range"><br>
<button id="playButtonWaveTwo">Play sound</button>

{% tangent(summary="Sound distortion", open=false) %}
If the sum of the amplitudes exceeds some maximum amplitude, the sounds may become distorted. The addition of the sound waves produces an amplitude that is greater than the maximum value, and gets [clipped](https://en.wikipedia.org/wiki/Clipping_(signal_processing)#/media/File:Clipping.svg). This creates a square like wave instead of a sine wave, producing a [distinct buzz sound](https://aatishb.com/synthesine/examples/square/index.html).
{% end %}

The addition of the two 'simple' sounds, can make it sound relatively more complex and textured. But something even more interesting happens if the frequency of the sounds are in some specific ratio. Try changing the frequency of the second sound to <a id="switchFrequencyDouble" style="cursor: pointer;">twice</a> that of the other. Now try it again with <a id="switchFrequencyOneHalf" style="cursor: pointer;">one and a half times</a> the other one. Try it using other frequencies too, and notice when they sound pleasant. When the frequency of the two sounds are in simple ratios, they sound harmonious.

Music theory is based around these ratios, or [intervals](https://en.wikipedia.org/wiki/Interval_(music)). A frequency ratio of <a id="switchFrequency21" style="cursor: pointer;">2:1</a> is called a perfect octave. A ratio of <a id="switchFrequency32" style="cursor: pointer;">3:2</a> is a perfect fifth, <a id="switchFrequency43" style="cursor: pointer;">4:3</a> is a perfect fourth, and <a id="switchFrequency54" style="cursor: pointer;">5:4</a> is a major third. The smallest of the intervals is called a minor second or semitone, having a ratio of <a id="switchFrequency1615" style="cursor: pointer;">16:15</a>. The minor second, along with the [tritone](https://en.wikipedia.org/wiki/Tritone) and other intervals sound [dissonant](https://en.wikipedia.org/wiki/Consonance_and_dissonance) since they do not have simple frequency ratios, but are still useful for creating [tension](https://en.wikipedia.org/wiki/Tension_(music)).

<canvas id="canvasIntervalRatioWaves"></canvas>
<canvas id="canvasJustIntonation"></canvas>

This simple integer ratio interval system is the [just intonation](https://en.wikipedia.org/wiki/Just_intonation) tuning system. But because of the way the intervals are defined, it is [mathematically impossible](https://www.youtube.com/watch?v=1Hqm0dYKUx4) to have consistent interval ratios between all the sounds — while the root note will be in tune with relation to other intervals, the other intervals will not necessarily be in tune in relation to the others.

<canvas id="canvasJustIntonationAlt"></canvas>

As a partial solution, the [equal temperament](https://en.wikipedia.org/wiki/Equal_temperament) system minimizes the *overall* deviations in intonation. In this system, the ratio between any two successive notes is the twelfth root of two, and the interval ratios are always consistent across all intervals.

<canvas id="canvasEqualTemperament"></canvas>

The equal temperament system makes it so that all intervals are ever so slightly out of tune with the other intervals — the intervals do not form a simple ratio, but are very close to it. However, the intervals ratios are consistent, unlike the just intonation system where few intervals are perfectly in tune with some of the intervals, but cause other intervals to be a lot more out of tune.

Regardless, both tuning systems describe the same phenomena — sounds that have frequencies that are a simple ratio multiple (or close to it) of other sounds usually sound pleasant. While those that are not, do not necessarily sound as soothing.

### Scales

Based around these interval ratios, music theory has standardized frequencies as well as standardized notation to represent these interval structures. There are twelve letters or [notes](https://en.wikipedia.org/wiki/Musical_note) in music theory — A, A#, B, C, C#, D, D#, E, F, F#, G, G# — to describe the pitch of sounds. Usually, the A note describes a pitch with a frequency of [440Hz](https://en.wikipedia.org/wiki/A440_(pitch_standard)), while the other notes denote a frequency that are interval (ratio) multiples of the base note.

<canvas id="canvasNotesOneOctave"></canvas>

{% tangent(summary="Sharps and Flats", open=false) %}
[Sharps](https://en.wikipedia.org/wiki/Accidental_(music)) (denoted using a #) can also be alternatively be written as flats (denoted with a ♭). Sharps indicate the sharper (higher) pitch variant of a note while flats indicate the flatter (lower) pitch variant of a note. For example, C# and D♭ is the same note. Certain notes do not have a sharp or flat variant; the naming convention is purely arbitrary. So all the notes can also be rewritten as: A, B♭, B, C, D♭, D, E♭, E, F, G♭, G, A♭. Using seven letters to describe twelve notes has to do with the [origins of music theory](https://www.reddit.com/r/musictheory/wiki/faq/history/alphabet/) and [western music](https://www.reddit.com/r/musictheory/wiki/faq/history/whytwelve/).
{% end %}

The mentioned twelve notes are used to describe pitches up to one [octave](https://en.wikipedia.org/wiki/Octave) high. To describe pitches that are beyond this range, the same notes are used — with numbers to differentiate them. A note with one number greater indicates a pitch that is an octave higher than the same note with one number lower. Generally, A4 has a pitch of 440Hz, so A5 is 880Hz and A3 is 220Hz. Other notes follow a similar convention.

<canvas id="canvasNotesAllOctaves"></canvas>

{% tangent(summary="Similarity across octaves", open=false) %}
Due to the note nomenclature, the names of notes will repeat after every twelve notes. This is intentional. Because of the equal temperament interval structure, notes double in frequency after every twelve notes, or an octave. Notes with frequencies that are binary multiples (half, double, quarter, etc) of itself sound similar to each other. So all the notes in an octave sound similar to the respective notes in higher and lower octaves. For example, A4 (440Hz) will sound similar to A5 (880Hz), A3 (220Hz), A2 (110Hz) and so on. Similarly, all other notes will sound similar to their respective notes in higher and lower octaves.
{% end %}

The twelve notes exist as a standard way to represent frequencies, but the 'feel' of the sound still comes from the interval structure of the sounds. By only selecting sounds with consonant interval ratios — perfect fifths, perfect fourths, major thirds, etc — music can be created that sound relatively harmonious. Similarly, by selecting notes with dissonant interval ratios, disharmony and tension can be created.

This is described in music theory using the twelve notes mentioned previously. From the twelve notes, a subset can be selected based on some interval structure to form a group of notes — called a [scale](https://en.wikipedia.org/wiki/Scale_(music)). A scale can define the mood of a piece. For example, [major scales](https://en.wikipedia.org/wiki/Major_scale) use consonant intervals and generally sound relatively upbeat, while [minor scales](https://en.wikipedia.org/wiki/Minor_scale) can sound melancholic because of the dissonant intervals. The [pentatonic scale](https://en.wikipedia.org/wiki/Pentatonic_scale) has a five-note interval structure with the major pentatonic scale having an energetic vibe to it, and is common in rock and jazz.

<canvas id="canvasScales"></canvas>
<select id="selectScaleNote"></select><select id="selectScaleInterval"></select><button id="playScaleButton">Play notes</button>

Using notes from a scale can bring more structure to a piece, compared to using random pitches. However, it does not mean that any of these notes when played together will sound pleasant. While the notes can sound pleasant when they are played [separately](https://en.wikipedia.org/wiki/Melody) (and with some structured rhythm), it will probably not sound as pleasant if all the notes are played together at the [same time](https://en.wikipedia.org/wiki/Harmony).

But there are ways to make it sound pleasant, even when the notes are played together in unison. A little earlier in this post, two intervals were played together, and when their frequencies were in the right ratios, it sounded harmonious. In a similar manner, instead of playing all or random intervals at once, only two, three, or four specific sound intervals can be played together at once to avoid a cacophony of multiple random sounds.

This simultaneous playing of a limited number of specific intervals again has a name in music theory — it is called a [chord](https://en.wikipedia.org/wiki/Chord_(music)). Usually chords consist of three intervals, but can also include only two, or sometimes more than three intervals. The definition is quite loose, but generally chords are triads — consisting of a root note, a third, and a fifth. The names of chords again depend on their interval structure.

<canvas id="canvasChords"></canvas>
<select id="selectChordNote"></select><select id="selectChordInterval"></select><button id="playChordButton">Play chord</button>

Chords can add more depth to sounds than single-pitch notes. A specific progression of chords can also be selectively chosen to create particular emotional responses.

### Dynamics

Similar to how altering the pitch can create sounds with a specific feel, the amplitude can also be altered to change the character of a sound. For example, sounds with gradually increasing intensity can create drama and tension. Similarly, the amplitude of sounds can also be varied to resolve tension.

This variation in loudness of sounds is called [dynamics](https://en.wikipedia.org/wiki/Dynamics_(music)).

<canvas id="canvasDynamics"></canvas>
<button id="playDynamicsButton">Increase amplitude</button>

Dynamics can enhance notes and chords by making them more expressive — by adding another layer of character to the sounds.

### Rhythm

Try playing the two beats:

<canvas id="canvasBeats"></canvas>
<select id="selectBeat"></select><button id="playBeatsButton">Play beat</button>

The first beat is [periodic](https://en.wikipedia.org/wiki/Metre_(music)), and can sound monotonous. The second beat has periodically [accentuated beats](https://en.wikipedia.org/wiki/Accent_(music)) and sounds relatively more cadenced and 'rhythmic'.

Periodically accentuating beats can make sounds feels more organized, which in turn can make it feel more rhythmic. Organizing beats into groups (called [bars](https://en.wikipedia.org/wiki/Bar_(music))) of [three](https://en.wikipedia.org/wiki/Triple_metre) or [four](https://en.wikipedia.org/wiki/Duple_and_quadruple_metre#Quadruple_metre) is very common in pop and rock, while other genres can have more complex [beat structures](https://en.wikipedia.org/wiki/Time_signature).

<canvas id="canvasTimeSignature"></canvas>
<select id="selectTimeSignature"></select><button id="playTimeSignatureButton">Play beat</button>

Generally, a structured beat sounds more melodic than a non-structured beat.

While different types of beats can have different structures, the 'speed' of the beats can be varied too, by changing the duration of each beat. The duration of the beats is described by the [tempo](https://en.wikipedia.org/wiki/Tempo) — in beats per minute. A higher tempo represents shorter beats and faster music, while a lower tempo implies longer beats and a slower music.

<canvas id="canvasTempo"></canvas>
<input id="sliderTempo" type="range"><br>
<button id="playTempoButton">Play beat</button>

Altering the rhythm patterns can make sounds structured and more pleasing, but it can also be used to again set the of mood of the sound. For instance, the tempo of the music can be varied to produce different vibes — a fast and structured beat can sound energetic, while a slower and less cadenced beat can sound more relaxed and mellow.

Even with a structured beat however, a piece may begin to sound repetitive if played for long enough. A way to avoid it from sounding repetitive is by introducing variations to the duration of certain notes, while still loosely sticking to the same beat structure. The duration of the beats can be changed to be half, twice, or quadruple the duration of a 'single' beat. Or [somewhere in between](https://en.wikipedia.org/wiki/Note_value). This can be achieved using multiple ways, one of which is described below.

## Procedural Generation

As outlined earlier, music theory provides guidelines for the pitch and timing of notes, to create soothing sounds, or to evoke different emotions. These can be distilled to:

* Deriving the pitch using structured intervals or from a scale.
* Deriving the timing from a dynamic yet structured beat.

The pitch for the notes can be simply selected from a scale, or it also be dynamically generated easily using interval ratios. However, generating a sequence of note timings that is both structured and non-repeating is slightly less simple.

### Stochastic Transitions

One way to make the rhythm non-repetitive is by introducing some randomness to the rhythm. A note with a fixed duration can randomly be replaced by two notes with half the duration — and vice versa.

<canvas id="canvasTransitionRhythm"></canvas>

This type of transition preserves the structure of the current rhythm. However, it can still sound random if the transition probabilities are uniform. Using weighted probabilities to emphasize specific transitions can prevent it from sounding too random. These transition probabilities are modeled using a [graph](https://en.wikipedia.org/wiki/Markov_chain) here.

<canvas id="canvasMarkovRhythm"></canvas>

The pitch for the next notes can be similarly generated using weighted probabilities. As an example, simpler intervals ([fifths](https://en.wikipedia.org/wiki/Circle_of_fifths) for instance) have a higher probability of being selected when using a major scale.

<canvas id="canvasMarkovIntervals"></canvas>

These together can act as the basic framework for generating a melody.

## Playground

The main tone generation setup is quite simple. The transition probabilities are used in generating the notes for the main melody. The melody is augmented with their [respective chords](https://en.wikipedia.org/wiki/Roman_numeral_analysis) and a higher octave ascending-oscillating beat.

Feel free to experiment with the octaves and amplitudes for the individual pieces, or alter the scale or tempo to change the vibe of the sounds altogether. The updates get applied at the end of each bar.

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

<script>
{{ loadData(path="/scripts/procedural-music.js") }}
</script>
