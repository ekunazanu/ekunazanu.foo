+++
title = "Convoluting Things"
description = "Math is Mathing."
date = 2025-12-26
draft = false
template = "article.html"
[extra]
type = "article"
thumbnail = "log.19.kernel.avif"
thumbnailalt = "A pixeleted dot with a 3x3 array of ones overlaid on it."
+++

Okay I missed November's post — regular updates require discipline, which you might've guessed by now, I lack severely. Anyhow, happy holidays. Tis the season, and probably my last one where I don't feel any pressure to be fiscally responsible. Here's another way to phrase it: Moni come, moni go, problem of tomorro.

More seriously though, I don't feel the holiday spirit this year. Maybe because it has been years since I was in a Christian school that used to celebrate Christmas rather festively. Or maybe because I know my fun college days are behind me. Perhaps it's because I feel kind of pessimistic about the world right now. Or maybe it's because I still do not have a bright yellow lambo. Definitely the last one.

![a lego lamborghini with a cartoon doodle driving it](/media/log/yellow-lambo.avif)

{% tangent(summary="Not my image", open=true) %}
Original image by [Jan Hammershaug](https://flickr.com/photos/hammershaug/4236899570/) features a cuter puppy instead.
{% end %}

Anyhow, I haven't done much. To be fair, besides the [regular puzzles](https://www.janestreet.com/puzzles/current-puzzle/), I did do [Advent of Code](https://adventofcode.com/) earlier this month for a while — before ending prematurely and just enjoying my last few days in college with the few people still around (I left roughly two weeks after the end of the semester; the majority of people still there till then were in all my year, and all mostly friends).

I'm still learning about new random things though. More than that, I am rediscovering the fun in applying and messing around with concepts that would be otherwise taught to first years. Simple things that got me interested in this field — and made me love it, before the dull curriculum sucked out all the fun and intuition from it and filtered it to raw formulas and tedious calculations.

Take the humble [convolution](https://en.wikipedia.org/wiki/Convolution) for example. For discrete data, it's just simple additions and multiplications. And yet, playing around with the kernel modifies the original signal in very interesting ways. Take simple 2D signals (images) for example: It can smoothen out signals or sharpen it, just by changing the second function (kernel). For example below are the outputs for the box blur, Gaussian blur, edge-detection (Prewitt), embossing, and Laplacian kernels. Notice how they modify the original signal to get a more smoothened signal, sharpened signal, etc. You can try your own kernel in the last graphic.

<canvas id="canvasImageBar"></canvas>
<canvas id="canvasImage0"></canvas>
<canvas id="canvasImage1"></canvas>
<canvas id="canvasImage2"></canvas>
<canvas id="canvasImage3"></canvas>
<canvas id="canvasImage4"></canvas>
<canvas id="canvasImage5"></canvas>

<canvas id="canvasCustomKernel"></canvas>
<input id="inputCustomKernel">

Since convolution can be performed on any arbitrary signals, audio signals too can be convolved. For example, an audio signal can be convolved with another signal to modify/filter/combine the signals. It will make more sense when you hear it for yourself:

This is an echo:
<audio controls class="audioSeeker"><source src="/media/log/convolution.clap.kernel.mp3" type="audio/mpeg"></audio>
The is an audio sample:
<audio controls class="audioSeeker"><source src="/media/log/convolution.original.mp3" type="audio/mpeg"></audio>
This is the convolution of the above audios. Notice the echo-ey response:
<audio controls class="audioSeeker"><source src="/media/log/convolution.clap.output.mp3" type="audio/mpeg"></audio>
Similarly, when convolved with a beep impulse:
<audio controls class="audioSeeker"><source src="/media/log/convolution.beep.kernel.mp3" type="audio/mpeg"></audio>
<audio controls class="audioSeeker"><source src="/media/log/convolution.beep.output.mp3" type="audio/mpeg"></audio>
And when convolved with the impulse response from a shaker:
<audio controls class="audioSeeker"><source src="/media/log/convolution.shaker.kernel.mp3" type="audio/mpeg"></audio>
<audio controls class="audioSeeker"><source src="/media/log/convolution.shaker.output.mp3" type="audio/mpeg"></audio>
When convolved with this water-splash sound:
<audio controls class="audioSeeker"><source src="/media/log/convolution.water.kernel.mp3" type="audio/mpeg"></audio>
<audio controls class="audioSeeker"><source src="/media/log/convolution.water.output.mp3" type="audio/mpeg"></audio>
Sounds and music by [Kevin Brown](https://freesound.org/people/AudioWay/).

Convolutions in one domain are also [equivalent to multiplication in another domain](https://en.wikipedia.org/wiki/Convolution_theorem) — so convolution of time-domain signals is equivalent to multiplying them in the frequency domain. The convolution theorem means that certain problems can be translated to other domains to [compute them more efficiently](https://en.wikipedia.org/wiki/Sch%C3%B6nhage%E2%80%93Strassen_algorithm). Also, convolution is not restricted to filtering signals — it can be used for [calculating probabilities](https://www.youtube.com/watch?v=IaSGqQa5O-M) too, and provides intuition for the [central limit theorem](https://en.wikipedia.org/wiki/Central_limit_theorem). It's a very simple idea — it's fundamentally just a dot product — and yet it is also very, very powerful.

In other meta-news, I am thinking about writing less casual blog-style updates, and start posting about my experiments and experiences with [mechanistic interpretability](https://en.wikipedia.org/wiki/Mechanistic_interpretability). For the last two years I studied AI (supposedly), and it would be a shame if nothing came of it. Just some basic stuff, for now. Don't expect the same level of interactivity as [lab posts](/lab/); I don't have the same level of resources as [Distill](https://distill.pub/) or [PAIR](https://pair.withgoogle.com/explorables/). I might also post about statistics every now and then. And finally update my [notes](https://notes.ekunazanu.foo/) in accordance with The Plan™.

So cya when I cya.

<script>
{{ loadData(path="/scripts/19-convoluting-things.js") }}
</script>
<style>
.audioSeeker {margin: 0.125rem 0;}
</style>
