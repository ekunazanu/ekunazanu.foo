+++
title = "Calculating Collisions"
description = "Turns out (sometimes), the DVD square will never reach the corner."
date = 2025-03-23
draft = false
template = "article.html"
[extra]
type = "article"
thumbnail = "log.10.dvd.avif"
thumbnailalt = "Doodle of the DVD square and its trajectory."
+++

I had my midterm exams this entire week, so naturally I ended up wasting a lot of time on YouTube. Something interesting happens during exams — I procrastinate more and do everything except study, even productive things. Human psychology I guess. And I know I am not the only one; I know full well that all of my friends share the exact same laissez faire attitude during exam season. Or maybe it's true that birds of a feather flock together.

![doodle of friends agreeing to play cricket before exams](/media/log/exam-cricket.avif)

I was binge-watching clips of The Office, and came across the scene where [everyone is eagerly waiting for a DVD logo to hit a corner](https://www.youtube.com/watch?v=QOtuX0jL85Y). And that made me curious — how many collisions does it actually take? So I quickly wrote a basic function to count the number of collisions for some initial coordinates and some given aspect ratio for the bounding box. I added two more lines of code to visualize the collisions as well. And got this:

<canvas id="canvasCollisions"></canvas>
<input id="sliderYCoord" type="range" style="margin-left: 0">Initial Y: <span id="textYCoord">0.0000</span><br>
<input id="sliderRatio" type="range" style="margin-left: 0">Aspect ratio: <span id="textRatio">3.0000</span><br>
Collisions: <span id="textCollisions">5</span>

You also can try specific aspect ratios: Most screens will usually have an aspect ratio of either <a id="switchRatio43" style="cursor: pointer;">4:3</a> or <a id="switchRatio169" style="cursor: pointer;">16:9</a>. Anyway, I think there are some interesting insights. The collisions will either be infinite or finite depending on the initial conditions. It is finite whenever the 'criss-crosses overlap' — for lack of a proper definition/description. Note that it may not seem that way because the canvas has a finite precision, so if the Y position is off by even half a pixel, it will not register as hitting the corner.

Designing the function for collisions made it obvious why it has to be that way: Collisions are symmetric and the bounding box is a rectangle. So if the rhombic tiles are coming close to each other, it means the ray elsewhere is experiencing two close collisions — somewhere near a corner. As the tiling patterns overlap, that collision difference reaches zero which means the ray has to hit a corner. It also means that other initial conditions result in an infinite loop. That DVD square will never reach a corner. Sad.

As for other things, The Plan™ got derailed. Of course, it did. But to be fair, I did have my midterms all week. And while I did procrastinate a lot, I did learn other things — mostly about rotary positional embeddings. This [post here](https://blog.eleuther.ai/rotary-embeddings/) explains it pretty well. Anyhow, I'll try to start The Plan™ this week. For real. <small>(If the lab exams don't ruin my schedule.)</small>

![doodle of a person asking others to trust them](/media/log/trust-me-bro.avif)

Cya next week.

<script src="/scripts/10-calculating-collisions.js"></script>
