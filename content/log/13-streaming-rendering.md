+++
title = "Streaming Rendering"
description = "Winging April."
date = 2025-05-11
draft = false
template = "article.html"
[extra]
type = "article"
thumbnail = "log.13.april.avif"
thumbnailalt = "Doodle of pages of a calendar with dates from April on it."
+++

This ~~week~~ month has been pretty chill. I haven’t been creating a lot lately, but I have been consuming a lot (of media). I think this sums up my current state pretty well:

![doodle of a person with red eyes in a dark room watching his glowing monitor](/media/log/sleep-deprived.avif)

It would be fair to say that April was anime month for me. I dove deeper (relatively) into anime and have been really enjoying it so far. I completed Steins;Gate 0, Steins;Gate: The Movie, A Silent Voice, Saiki K, and Your Name. I absolutely loved A Silent Voice, probably because it was slower paced than the others — just how I like it. Ironically, I did not watch Your Lie in April. I also just completed Summer Time Rendering yesterday (it’s great), and started watching Grand Blue. So far, it is probably the funniest of all animes I watched.

Since I have been consuming a lot of art, I have been drawing a lot less this month. Nah it is actually because because I used to draw mostly during classes and classes are over for this semester. But I do want to get back to it soon, because I find it pretty relaxing and therapeutic. And it’s not like I have stopped completely, I have [started experimenting with digital art](https://bsky.app/profile/ekunazanu.foo/post/3lonhmojmrs2d) more. It is mostly pixel art for now, but it is pretty relaxing too.

<img alt="a dithered pixel art image of a sunset" decoding=async loading=lazy src="/media/log/sunset-dither.avif" style="image-rendering: pixelated; width: 100%;">

In other things, writing cool software is now on pause since it is endsem season right now. Because I have exams. Not because I am lazy. Nothing has changed about that. In fact I will stop procrastinating. From next week onwards, after my exams end. I did write some simple visualization code for a [new lab article](/lab/complex-rotations) though.

In meta updates: The site has a new home page. The old one looked very cluttered, so I created a cleaner one. They say, “Show, don’t tell”, so I added a live, random [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) simulation that may give an idea of what this site is about— computer science, math, and experimentation. Maybe I should add something for statistics as well.

Speaking of statistics: I have my data-something-something exam tomorrow. But I was bored and didn’t want to study, so I instead read about [wave functions](https://en.wikipedia.org/wiki/Wave_function). And tried to create a visualization (because that’s my thing now I guess) for the [interference patterns](https://en.wikipedia.org/wiki/Wave_interference) of two waves. It’s not fully accurate; the waves do not follow the [inverse square law](https://en.wikipedia.org/wiki/Inverse-square_law).

<canvas id=canvasWaves></canvas>
<input id=sliderWavl1 type=range><input id=sliderWavl2 type=range>Wavelength<br>
<input id=sliderAmpl1 type=range><input id=sliderAmpl2 type=range>Amplitude<br>
<input id=sliderPhas1 type=range><input id=sliderPhas2 type=range>Phase<br>
<input id=sliderDistance type=range> Distance

That's pretty much it. I did finally read about computer networks, and will probably start learning about operating systems next. But after my exams end. I also want go back to making mediocre art and mediocre-r software. Hopefully all these will resume when this endsem season ends.

Cya next month.

<script>
{{ loadData(path="/scripts/13-streaming-rendering.js") }}
</script>
