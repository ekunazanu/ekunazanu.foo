+++
title = "Pretty Pixel Patterns"
description = "Playing around with pixels."
date = 2025-03-09
draft = false
template = "article.html"
[extra]
type = "article"
thumbnail = "log.8.pixels.avif"
thumbnailalt = "Doodle of pixels and functions."
+++

Week went by quick. Had quizzes, cleaned some of my digital library but I still have to organize all my accounts and data. But I should be done with most of the things I *need* to get done by next week. After that, I can go back to The Plan™. If you still remember that.

In other news, I tried to generate [Perlin noise](https://en.wikipedia.org/wiki/Perlin_noise#Algorithm_detail), and that led to me experimenting with pixel coloring. Surprisingly good looking patterns can arise from very simple bitwise and arithmetic operations. I colored the pixels based on their position — the intensity for each channel for a pixel is a function of its spatial coordinates — and that was enough for generating some very interesting images. I want to show a few nice ones:

{% tangent(summary="Enable JavaScript", open=false) %}
If the images are not visible, JavaScript is probably disabled; you will need to enable JavaScript to render the patterns. The images are rendered on the browser because compression algorithms distort the patterns and lossless formats take up too much space — and I really don't want to pollute my Git history with big binary files, even with LFS enabled.

On a side note, I don't like how JavaScript has no native support for 8-bit unsigned integers. I initially wrote this in Go, and it felt ugly adding extra logic in JavaScript just to recreate 8-bit overflows and underflows.
{% end %}

1. Gradients — (x, y, !x). The pixels become redder towards the right, greener towards the bottom, and bluer towards the left. It is an 8-bit image so the pattern repeats after every 256 pixels.

<canvas id="canvas0"></canvas>

2. Shadows — (x+y, x+y, x+y). The pixel value is a simple linear x+y, so diagonal pixels have the same intensity values. The image is grayscale since all the channels have the same value for a given pixel.

<canvas id="canvas1"></canvas>

3. Candy — (x+y, x+y+85, x+y+171). It similar to the above pattern, but the added offsets 'separate' each channel and create distinct bands.

<canvas id="canvas2"></canvas>

4. Waves — (0, (x%y)/2, x%y). The intensity of the blue (and green) channel increases as x increases, until the diagonal x=y — where it resets as the remainder becomes zero. It happens again at diagonals x=2y, x=3y, x=4y, etc.

<canvas id="canvas3"></canvas>

5. Boxer — (x, x^y, x+y). The diagonal gradient is because of the red and blue channels. The alternating squares is due to the green channel's x^y. I feel the XOR is a great way to represent the frequency of bit flips at different indices — each square boundary represents a bit flip at some index. Higher the contrast, higher the index of the bit flip.

<canvas id="canvas4"></canvas>

6. Ripples — (63, x\*x+y\*y, 175). The pixels having same intensity k for x\*x+y\*y=k follow the equation for a circle — and hence the pattern. The narrowing concentric circles also reveal the exponential nature of the function and the modular nature of unsigned integers. There are some nice interference patterns going as well.

<canvas id="canvas5"></canvas>

7. Hyperbolic — (x\*x-y\*y, x\*x-y\*y, x\*x-y\*y). Just as x\*x+y\*y is the equation for a circle, x\*x-y\*y is the equation for a hyperbola. So instead of narrowing concentric circles, the pattern now consists of narrowing concentric hyperbolas.

<canvas id="canvas6"></canvas>

8. Chip — (255, (x&y)\*y, x). The x&y has a look similar to the XOR pattern, and multiplying it with y gives it with a high-frequency, grain-y look. Additionally, the red and blue channels are defined to give it a silicon-wafer-reflection-esque look.

<canvas id="canvas7"></canvas>

9. Matrix — (0, (x^y)\*(x^y), 0). From this point on, why the patterns emerge the way it does is beyond me. If you know, please share; I would love to know it too. Functions from here on are mostly a result of me trying to make the patterns look pretty.

<canvas id="canvas8"></canvas>

10. Temple — (((x\*x)&y)\*y, ((x\*x)&y)\*y, 32). Looks like pillars, as well as patterns etched on the walls of old temples.

<canvas id="canvas9"></canvas>

11. Peacock — (0, x\*x\*y\*y, x\*x\*x\*y\*y\*y). I think this is one of the prettiest patterns. The colors remind me of the feathers of a peacock.

<canvas id="canvas10"></canvas>

12. Crimson — ((x^(x\*x\*y\*y))&y, 0, 0). Uses the same x\*x\*y\*y function but masked with an XOR with x and an AND with y. I feel like this can be the loading screen of a bloody horror-thriller game.

<canvas id="canvas11"></canvas>

13. Phases — (x^(x\*x\*y\*y)/2, (x\*x\*y\*y)^y, (x\*x\*y\*y)^x^y). Pretty much the same pattern as before, but the green and blue channels have slightly altered versions of the same function resulting in different colors. Makes it look light like night and morning.

<canvas id="canvas12"></canvas>

There are more functions but I found these the most pretty.

## Melting Metal and Mental States

I also experimented with hardware a bit. I bought a small TFT display but it did not come with pins attached. I had a few pins laying around so I decided to solder it, but ended up causing chaos: I inhaled the lead-tin fumes, my friend ingested it. I burnt my fingers, and as a reflex threw the solder on my friend — he dodged it, but burnt his fingers later anyway. I was holding the solder ~~near~~ on top of some cup noodles and managed to get its plastic melted and stuck on the gun. Tried to sand it off with paper and the paper burnt. Also right as I threw the solder gun, it melted the solder wire itself exposing the copper inside. Another guy came to help us and got a mild shock from it. It was chaotic but also quite comical to say the least.

![doodle of a person soldering and lighting things on fire and another person with a burnt finger looking and another person in the background horrified](/media/log/solder-chaos.avif)

Watching a tutorial on how to use a solder properly seems like the saner (and obvious) approach in retrospect.

Anyway that is all for this week. Cya next week.

<script src="/scripts/8-pretty-pixel-patterns.js"></script>
<style>canvas {image-rendering: pixelated;}</style>
