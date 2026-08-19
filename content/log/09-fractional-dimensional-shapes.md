+++
title = "Fractional Dimensional Shapes"
description = "Creating slices of abstract four dimensional fractals."
date = 2025-03-16
draft = false
template = "article.html"
[extra]
type = "article"
thumbnail = "log.9.fractal.avif"
thumbnailalt = "Doodle of a low iteration Sierpinski triangle."
+++

Fractals. That's what [fractional dimensional shapes are](https://en.wikipedia.org/wiki/Hausdorff_dimension). I just thought phrasing the title that way sounded cooler.

Anyway, this week I read [An Introduction to Chaotic Dynamical Systems](https://doi.org/10.1201/9780429280801), and organized all my data. My midterms also started this week so I am a little busy with that too. No one cares about how I organized my data, or why I hate exams, so I will update on what I did after reading the book — creating fractals.

Now the book explores the behaviour of the [logistic map](https://en.wikipedia.org/wiki/Logistic_map), [rational maps](https://en.wikipedia.org/wiki/Rational_mapping), [Julia sets](https://en.wikipedia.org/wiki/Julia_set) and the [Mandelbrot set](https://en.wikipedia.org/wiki/Mandelbrot_set), but I mostly experimented with the latter. Now, the Mandelbrot set is defined for an initial z = 0. However, removing that restriction provides two more parameters in addition to c — creating a new four dimensional set. I tried to render a few 2D slices of this 4D set at different points. For example, translating through the set by changing z from -2+0i to 2+0i results in this animation:

<video controls><source src="/media/log/fractal-mandelbrot-real.mp4" type="video/mp4"></video>

While changing z from 0-2i to 0+2i generates this:

<video controls><source src="/media/log/fractal-mandelbrot-imaginary.mp4" type="video/mp4"></video>

Changing z such that it completes a full round of the complex unit circle yields this:

<video controls><source src="/media/log/fractal-mandelbrot-rotation.mp4" type="video/mp4"></video>

These 2D slices of the 4D shape reveal there is some symmetry in this complicated four dimensional structure, unlike the [Burning Ship fractal](https://en.wikipedia.org/wiki/Burning_Ship_fractal) which is less symmetric:

<video controls><source src="/media/log/fractal-ship-real.mp4" type="video/mp4"></video>

The above animation shows when z changes from -2+0i to 4+0i, while the one below represents changing z from 0-2i to 0+4i. And the animation below that again represents when z runs counter-clockwise on the complex unit circle.

<video controls><source src="/media/log/fractal-ship-imaginary.mp4" type="video/mp4"></video>
<video controls><source src="/media/log/fractal-ship-rotation.mp4" type="video/mp4"></video>

Other than that, I celebrated the festival of colors. By having a water-fight in the dorm washroom. Also the display I was trying to solder was not damaged — I connected it to a RPi Pico and it was all good. However I am still not sure if the SD card reader unit is working. But if it is, maybe a tiny Game Boy emulator soon? I don't know. As of right now, it has a lower priority than The Plan™ — which I *want* to to get back to this week. But it'll likely end up being next week since I will be busy with midterms this entire week.

This is all. Cya next week.
