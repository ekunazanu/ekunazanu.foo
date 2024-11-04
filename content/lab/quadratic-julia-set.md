+++
title = "Quadratic Julia Set"
description = "Visualizing chaos on the complex plane."
date = 2025-08-01
weight = 9
draft = true
template = "article.html"
[extra]
type = "article"
thumbnail = "lab.julia.svg"
thumbnailalt = "A julia set on the complex plane in black with three white points inside the set."
+++

The julia set set is a . And all of this using the simple equation `z^2 + c`.

## Riemann Surface

operations morph the [complex plane](/lab/complex-rotations).

Additions transforms it by translating it. Multiplying scales as well as rotates it.

{{ loadData(path="/static/media/lab/quadratic-julia-set/addition.txt") }}
<!-- domain color https://en.wikipedia.org/wiki/Domain_coloring to show morphed spacel use sliders for magnitude and argument for operand-->

{{ loadData(path="/static/media/lab/quadratic-julia-set/multiplication.txt") }}
<!-- domain color to show morphed space; use sliders for magnitude and argument for operand -->

Addition and multiplication transform the plane, but these transformations still preserve angles and distances — they are [similarity transformations](https://en.wikipedia.org/wiki/Similarity_(geometry)). Exponentiation on the other hand, morphs the space in a slightly more complicated way.

{{ loadData(path="/static/media/lab/quadratic-julia-set/multiplication.txt") }}
<!-- domain color to show morphed space; use sliders for magnitude and argument for operand -->

It stretches the space. Can be visualized using a higher dimension

Reimann surfaces.

Iteratively.

z^2 + c, c <- fixed

Connected julia sets ==> z0 does not diverge to infinity ==> given c is part of mandelbrot set.

## Chaos Theory

Bifurcation diagrams for z^2 + c from 0.25 to -2. Poincaré plot.

<canvas id="fractalCanvas"></canvas>

## Beyond Fractals

Fractals are prevalent in nature because it has interesting properties. They have infinite perimeter for a fixed area. Natural processes too tend to envolve towards maximizing surface area for a fixed volume — which leads to the evolution towards three dimensional fractal structures.

![image](image)

But it application of chaos extend beyond . dynamics can help us study the security of cryptographic techniques. Hashing is very sensitive to initial conditions and uses iterated functions to derive its output, it becomes important that its output do not enter a periodic or fixed point.

---

## References

* Robert L Devaney: [An Introduction to Chaotic Dynamical Systems](https://doi.org/10.1201/9780429280801)
* Steven Wittens: [How to Fold a Julia Fractal](https://acko.net/blog/how-to-fold-a-julia-fractal/)
* Heinz-Otto Peitgen, Peter H. Richter: [The Beauty of Fractals](https://doi.org/10.1007/978-3-642-61717-1)

<!--
* https://www.youtube.com/watch?v=9gk_8mQuerg
* https://www.youtube.com/watch?v=ovJcsL7vyrk
* https://fractalfoundation.org/OFC/OFC-3-5.html
* https://math.hws.edu/eck/js/mandelbrot/MB.html
* https://www.ma.imperial.ac.uk/~svanstri/Files/svs-1styearproject-handout.pdf
* https://geoffboeing.com/2015/04/visualizing-chaos-and-randomness/
-->

<script src="/media/lab/quadratic-julia-set.js"></script>
