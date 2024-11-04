+++
title = "Procedural Soundscapes"
description = "Using music theory to generate ambient sounds."
date = 2026-05-01
draft = true
template = "article.html"
[extra]
type = "article"
thumbnail = "lab.airwaves.svg"
thumbnailalt = "Air particles as black dots on a yellow background."
+++

This is another one of the more experimental posts.

I like music — a lot of people do. I also like math — a lot of people do **not**. It's time to mix both these arts. It's time to experiment and create.

## Music Theory
 
To create soothing soundscapes, it helps to have an understanding why certain sounds are more pleasant than others.

A vibrating object can transmit its vibrations to the ear via air molecules — which is then interpreted by the brain as a sound.

{{ loadData(path="/static/media/lab/procedural-soundscapes/air-particles.txt") }}

The particles above loosely represent air molecules. The particles transfer the vibrations and oscillations from a body using [differences in pressure](https://en.wikipedia.org/wiki/Acoustic_wave). If the air pressure at the ear is plotted with respect to time, then the resulting graph forms a rough sine wave:

{{ loadData(path="/static/media/lab/procedural-soundscapes/air-particles-wave.txt") }}

{% tangent(summary="Wave source", open=true) %}
The pressure graph draws out looks similar to sine wave since the source creating the vibrations is oscillating in a sine-like motion.
{% end %}

The amplitude of this wave corresponds to the difference in sound pressure. This is interpreted by the brain as the intensity or **loudness** of the sound. While the frequency of the wave is interpreted as its **pitch**.

{{ loadData(path="/static/media/lab/procedural-soundscapes/intervals-one-wave.txt") }}

### Intervals

The above sound has a singular frequency, and can sound fairly plain. However, another wave can be added to it to make it sound relatively richer and more complex:

{{ loadData(path="/static/media/lab/procedural-soundscapes/intervals-two-waves.txt") }}

Try changing the frequency of the second sound (wave) to [twice](switch) of the other. Now try it again with [one and a half times](switch) the other one. Try it using other frequencies too, and notice when they sound pleasant. When the freuqency of the two sounds are in simple ratios, they sound harmonious.

Music theory is based around these ratios, or [intervals](https://en.wikipedia.org/wiki/Interval_(music)). A frequency ratio of 2:1 is called a perfect octave. A ratio of 3:2 is a perfect fifth, 4:3 is a perfect fourth, and 5:4 is a major third. The smallest of the intervals is called a minor second or semitone, having a ratio of 16:15. The minor second, along with a few other intervals sound [dissonant](https://en.wikipedia.org/wiki/Consonance_and_dissonance) since they do not have simple frequency ratios, but are still useful for creating [tension](https://en.wikipedia.org/wiki/Tension_(music)).

{{ loadData(path="/static/media/lab/procedural-soundscapes/intervals-static-all-just-intonation.txt") }}

This simple integer ratio interval system is the [just intonation](https://en.wikipedia.org/wiki/Just_intonation) tuning system. But because of the way the intervals are defined, it is [mathematically impossible](https://www.youtube.com/watch?v=1Hqm0dYKUx4) to have consistent interval ratios between any other two sounds. Instead, the [equal temperament](https://en.wikipedia.org/wiki/Equal_temperament) (equally spaced intervals) system is used to minimize the *overall* deviations in intonation.

{{ loadData(path="/static/media/lab/procedural-soundscapes/intervals-static-all-equal-temperament.txt") }}

### Scales

There are twelve [notes](https://en.wikipedia.org/wiki/Musical_note) in music theory — A, A#, B, C, C#, D, D#, E, F, F#, G, G#. Notes are a way to assign names to certain sound frequencies. Usually, the A note has a pitch of [440Hz](https://en.wikipedia.org/wiki/A440_(pitch_standard)). The pitch of the other notes are derived using intervals.

{{ loadData(path="/static/media/lab/procedural-soundscapes/intervals-static-all-notes.txt") }}

{% tangent(summary="Sharps and Flats", open=true) %}
[Sharps](https://en.wikipedia.org/wiki/Accidental_(music)) (denoted using a #) can also be alternatively be written as flats (denoted with a ♭). So all the notes can also be written as: A, B♭, B, C, D♭, D, E♭, E, F, G♭, G, A♭. Sharps indicate a sharper (higher) pitch while flats indicate a flatter (lower) pitch — so C# and D♭ is the same note. Certain notes may not have a sharp/flat variant. It is completely arbitrary and unnecessarily complicated.
{% end %}

The twelve notes are used to describe pitches upto one [octave](https://en.wikipedia.org/wiki/Octave) high. To describe pitches that are beyond this range, the same notes are used — with numbers to differentiate them. A note with one number greater indicates a pitch that is an octave higher than the same note with one number lower. Generally, A4 has a pitch of 440Hz, so A5 is 880Hz and A3 is 220Hz. Other notes follow a similar convention.

{{ loadData(path="/static/media/lab/procedural-soundscapes/intervals-static-all-notes-superset.txt") }}

From the twelve notes of an octave, a subset can be selected to get a [scale](https://en.wikipedia.org/wiki/Scale_(music)). Scales are defined by intervals and a key — by selecting a certain subset of intervals, a distinct 'mood' for the sounds can be established. Music in [major scales](https://en.wikipedia.org/wiki/Major_scale) generally sound upbeat, while music in [minor scales](https://en.wikipedia.org/wiki/Minor_scale) can sound melancholic. The [pentatonic scale](https://en.wikipedia.org/wiki/Pentatonic_scale) has an interval structure with five notes and is common in a lot of energetic rock music.

Similar to a scale, a [mode](https://en.wikipedia.org/wiki/Mode_(music)) is also an interval structure but without a specific key.

{{ loadData(path="/static/media/lab/procedural-soundscapes/scales-modes.txt") }}

{% tangent(summary="Keys", open=true) %}
A [key](https://en.wikipedia.org/wiki/Key_(music)) in a scale defines the root note of that scale. Other notes are derived using the interval structures using the root note as its base frequency. Modes do not have any specific keys, and simply describe an interval structue.
{% end %}

When two notes are played separately in succession, it is called a [melodic interval](https://en.wikipedia.org/wiki/Melody). When the two notes are played in unison, it is called a [harmonic interval](https://en.wikipedia.org/wiki/Harmony). And when three or more notes are played simultaneously, it is called a [chord](https://en.wikipedia.org/wiki/Chord_(music)). Except [power chords](https://en.wikipedia.org/wiki/Power_chord) (which consist of two notes) are also chords, and [arpeggios](https://en.wikipedia.org/wiki/Chord_(music)) (notes played separately in succession) can be chords too, so the definition is somewhat loose. Usually, chords are triads — consiting of a root note, a major or minor third, and a fifth.

{{ loadData(path="/static/media/lab/procedural-soundscapes/scales-modes-chords.txt") }}

A scale or mode can be used to set the tone for the sounds, and chords from that scale.

### Dynamics

The amplitude, just like the pitch, can also be altered to affect the character of a sound. Gradually increasing the intensity of a sound can create drama and tension. Similarly, sounds with gradually decreasing volume can be used to resolve tension. The variation in loudness of sounds is called [dynamics](https://en.wikipedia.org/wiki/Dynamics_(music)). It is a very powerful

{{ loadData(path="/static/media/lab/procedural-soundscapes/dynamics.txt") }}

### Timbre

Going back to sound waves, it is important to specify that so far we've only been dealing with sine waves. But waveforms other than the sinusoid exist too — notable ones include the square wave, triangular wave, and sawtooth wave. These however sound different when compared against the sine waves — even at the same frequency.

{{ loadData(path="/static/media/lab/procedural-soundscapes/timbre-waves.txt") }}

Using [fourier analysis](https://en.wikipedia.org/wiki/Fourier_analysis), these waves can be decomposed into multiple sine waves. The human ear perceives the square wave (and the sawtooth and triangular wave for that matter) as a group of multiple sine waves with frequencies.

{{ loadData(path="/static/media/lab/procedural-soundscapes/timbre-waves-decomposition.txt") }}

Try creating your own waveform to see how it sounds at the frequency:

{{ loadData(path="/static/media/lab/procedural-soundscapes/timbre-waves-decomposition-custom.txt") }}

Similarly, different instruments have different and unique waveforms and hence sound different even at the same frequency. This is why instruments sound different even when playing the same notes. Notes played on some instruments like guitars or pianos quickly become quieter over time — the change in amplitude of the sound over time, described by their [envelope](https://en.wikipedia.org/wiki/Envelope_(music)) — differ based on the instrument, also giving each of them a unique tone. The unique tone quality of an instrument is called its [timbre](https://en.wikipedia.org/wiki/Timbre). For example, this is the waveform and envelope of a piano and a guitar playing at 440Hz.

{{ loadData(path="/static/media/lab/procedural-soundscapes/timbre-piano-guitar.txt") }}

### Rhythm

Try playing these beats:

{{ loadData(path="/static/media/lab/procedural-soundscapes/rhythm-structure.txt") }}

The first beat is random, and does not necessarily sound enjoyable. The second is periodic, and is slightly more pleasant but nonetheless feels monotonous and dull. The last one feels rhythmic and dynamic; more enjoyable compared to the previous two. One way to make music sound more satisfying is to use stick to regular pulse beat groupings and accentuating certain beats — using a [metre](https://en.wikipedia.org/wiki/Metre_(music)). The [number](https://en.wikipedia.org/wiki/Time_signature) of beats per [grouping](https://en.wikipedia.org/wiki/Bar_(music)) is usually four or three — called [common time](https://en.wikipedia.org/wiki/Duple_and_quadruple_metre#Quadruple_metre) and [waltz](https://en.wikipedia.org/wiki/Triple_metre) respectively.

Even after sticking to a meter, the music might sound rhythmic for a while, but if played long enough, even it will begin to sound repetitive. The obvious way to go about it is to introduce variations in the duration of certain notes, while still loosely sticking to the selected beat structure. Notes can be half, twice, quadruple the duration of a single beat, or [somewhere in between](https://en.wikipedia.org/wiki/Note_value).

While using certain rhythm patterns can make music sound structured and more pleasing, it can also be used to set the of vibe of the music. The number of [beats per minute](https://en.wikipedia.org/wiki/Tempo) can be varied to express emotions. Music with a fast tempo sounds lively and energetic, while music with a slow tempo sounds sad and mellow.

{{ loadData(path="/static/media/lab/procedural-soundscapes/rhythm-tempo.txt") }}

## Procedural Generation

The parameters for the soundscape are procedurally generated using a PRNG and a seed, as well as determined by certain configurable settings — mood: happy(relaxed), sad, eerie(tensed but slow scary), upbeat-angry.

---

## References

* Make sounds similar to Limbo game OST
* https://ivanish.ca/diminished-fifth/
* https://generative.fm/
* https://medium.com/@alexbainter/making-generative-music-in-the-browser-bfb552a26b0b
* https://crow-caw.com/60-why/61-algorithms-and-ambient/
* https://ciechanow.ski/sound/
* search for algorithmic composition
* Alt -> https://alterebro.com/ for generative images
* https://www.youtube.com/@marcevanstein
* https://learningmusic.ableton.com/make-beats/tempo-and-genre.html
