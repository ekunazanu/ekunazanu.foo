+++
title = "Complex Rotations"
description = "Building an intuition for the complex plane and rotation using multiplication."
weight = 2
draft = false
template = "article.html"
[extra]
type = "article"
thumbnail = "lab.plane.svg"
thumbnailalt = "Two lines of unit length on a polar plane."
+++

In mathematics there are multiple ways to represent the same underlying principles or ideas. There are different ways to represent two dimensional spaces — the [cartesian](https://en.wikipedia.org/wiki/Cartesian_coordinate_system), [polar](https://en.wikipedia.org/wiki/Polar_coordinate_system), and [other](https://en.wikipedia.org/wiki/Category:Two-dimensional_coordinate_systems) coordinate systems — and multiple ways to morph that space. Complex numbers are a way to represent two dimensional spaces, and are an even more elegant way to represent two dimensional rotations.

## Real Numbers

This a real number line:

<canvas id="canvasNumberlineStatic"></canvas>

It can be thought of as a one dimensional space — where any real number `x` is a point on the space with distance `x` from the origin point, zero. Positive numbers are on the right of the origin, and negative numbers on the left.

Since any real number is a point on this space, the output of any operation that results in a real number will also be a point on the one dimensional space — both the input and output can be mapped on the real number line. The operation can then be thought of as a transformation of the number line.

<canvas id="canvasNumberlineMap"></canvas>

Consider addition: If a point or number is taken, and an addend `d` is added to it — then the sum would lie `d` distance to the right or left from the original point on the number line, depending on the sign of the addend. Since it is true for all points, the entire number line can be thought of as being **shifted** by distance `d`.

<canvas id="canvasNumberlineAdd"></canvas>
<input id="sliderAdd" type="range"> `d`: <span id="spanNumberlineAdd">0.00</span>

{% tangent(summary="Transforming number lines", open=true) %}
The numbers on the transformed number line (below) is the result of the addition operation when `d` is added to the numbers on the old numbers line (above). A single point (zero) is highlighted to make it easier to keep track of how the new number line numbers above is transformed.
{% end %}

Just as addition morphed the number line by shifting it, multiplication morphs the number by scaling, or **stretching** it — by the amount specified by the multiplier. Multiplication by a negative value stretches and also **flips** the number line around zero.

<canvas id="canvasNumberlineMultiply"></canvas>
<input id="sliderMultiply" type="range"> `m`: <span id="spanNumberlineMultiply">1.00</span>

The visual transformation analogues on a number line for the square function is however much more complicated than a simple shift or stretch.

<canvas id="canvasNumberlineSquareMap"></canvas>

It is complicated to describe how *all* the numbers behave using a single transform, but breaking it down into multiple transformations for *each* number makes it much easier to comprehend. Since squaring a number simply involves multiplying it by itself — it can be represented as stretching (and possibly flipping) the number line twice by the same multiplier.

<canvas id="canvasNumberlineSquare"></canvas>
<input id="sliderSquare" type="range"> Square of <span id="spanNumberlineSquare">1.00</span> = <span id="spanNumberlineSquareRes">1.00</span>

Visualizing the square root function to a number line transformation is tricky as well. But the square root function can alternatively defined using the square function — the root shall be defined as the number which, when squared, yields the operand.

<canvas id="canvasNumberlineSqrt"></canvas>
<input id="sliderSqrtRes" type="range"><br>
<input id="sliderSqrt" type="range"><br>
Square root of <span id="spanNumberlineSqrtRes">1.00</span> <span id="spanNumberlineSqrtEqu">is</span> <span id="spanNumberlineSqrt">1.00</span>

{% tangent(summary="Finding square roots", open=true) %}
Finding a square root using this transformation involves specifying a number, and then using trial and error to find another number that squares to the number selected earlier — to get the square root.
{% end %}

There is a problem however. It is impossible to find the square root of negative numbers, since the output of the square function is always mapped to a non-negative number.

<canvas id="canvasNumberlineSqrtNeg"></canvas>
<input id="sliderSqrtNegRes" type="range"><br>
<input id="sliderSqrtNeg" type="range"><br>
Square root of <span id="spanNumberlineSqrtNegRes">0.00</span> <span id="spanNumberlineSqrtNegEqu">is <b>not</b></span> <span id="spanNumberlineSqrtNeg">1.00</span>

This is not a limitation of the visualization, but rather a limitation arising from the current definition of the function, and real numbers itself — it is impossible to find the square root of negative numbers from the existing definition of the number system.

Unless the definition itself is changed.

## Imaginary Numbers

Suppose numbers which square to any negative number do exist. The natural questions that might then arise are: What is the points of making these numbers up? Or how should the numbers be organized, or how should the numbers behave? This is where it helps to make certain assumptions.

* **Assumption I**: Since the square root of negative numbers could not be mapped on the real number line, they must lie on a completely different number line. Since these numbers do not lie on the real number line, they will also be referred to as imaginary numbers from now on.

<canvas id="canvasNumberlineImaginary"></canvas>

* **Assumption II**: The square root of any negative numbers (imaginary numbers) can derived using the square root of negative one and scaling it with a **real number**. Square root of negative one shall be denoted as `i`. So an imaginary number can be represented as `b·i`, where `b` is a real number. The real and imaginary numbers together shall be described as a sum `a+bi`, where `a` and `b` are real numbers and `i` is the square root of negative one.

* **Assumption III**: Addition is defined as `(a+bi) + (c+di)` = `(a+c) + (b+d)i`; ie. both operate on their own respective real and imaginary components. Multiplication is defined as `(a+bi) · (c+di)` = `a·c + a·i + bi·c + bi·di` or simplified, `(ac-bd) + (ad+bc)i` — ie. multiplication is distributed over addition.

It can be inferred from the assumptions:
* Addition affects their own component and has no effect on the other entity.
* Multiplication of any real number with another real number multiplier scales the original number by the multiplier.
* Since any imaginary number can be thought of as the root of negative one scaled up by a real number, they can be decomposed into its real factors and `i`. This implies multiplying a real with any imaginary number results in a (scaled) imaginary number as well — ie. `kb·i` = `k · bi`, so `k · bi` = `kb·i`.
* So, **multiplication with a real number results scales a number by the real multiplier**, irrespective of whether the multiplicand is real or imaginary.
* Multiplying an imaginary number with an imaginary number involves multiplying their scalars and multiplying their roots of negative one. But squaring the root of negative one is just negative one, so **multiplying two imaginary numbers results in a (scaled) negative real number**. That is, `bi · di` can be rewritten as `b·d · i·i`, which is just `bd · -1` = `-bd`.
* Multiplying two numbers with both non-zero real and imaginary components results in a number that is the product of the two numbers following the rules of distributive multiplication over addition.

It is difficult to visualize how the multiplication of numbers with both non-zero real and imaginary components transform the number lines. But addition and multiplication with only a real component or an the root of negative one is relatively easier to visualize. Geometrically:

* Addition with real numbers shifts only the real number line.
* Addition with imaginary numbers shifts only the imaginary number line.
* Multiplication with real numbers stretches the real number line as well as the imaginary number lines.
* Multiplication with `i` morphs number lines such that:
    * If the number (line) was on the real number line, it now lies on the imaginary number line.
    * If the number (line) was on the imaginary number line, it now lies on the flipped real number line.

<canvas id="canvasNumberlinesTransform"></canvas>
Transformed Number: <b><span id="spanTransformNumber">0.00+0.00i</span></b><br>
<input id="sliderTransformAddR" type="range">Add by real: <span id="spanTransformAddR">0.00</span><br>
<input id="sliderTransformAddI" type="range">Add by imaginary: <span id="spanTransformAddI">0.00</span><br>
<input id="sliderTransformMultiplyR" type="range">Multiply by real: <span id="spanTransformMultiplyR">1.00</span>

<button id="buttonTransformMultiplyI">Multiply by i</button>

But how does the multiplication of numbers with both non-zero real and imaginary components transform the number lines? And why these assumptions specifically? All of this might seem arbitrary at first, but the motivation behind it starts making more sense when the second dimension is taken into account.

## Complex Plane

Take any point on a cartesian plane, and keep track of its coordinates as well as the `x` and `y` axes when it is rotated counter-clockwise by 90°:

<canvas id="canvasPlaneCartesian"></canvas>
<canvas id="canvasPlaneCartesianLine"></canvas>
Coordinates: <b><span id="spanPlaneCartesianNumber">0.00, 0.00</span></b><br>
<input id="sliderPlaneCartesianX" type="range">X: <span id="spanPlaneCartesianX">0.00</span><br>
<input id="sliderPlaneCartesianY" type="range">Y: <span id="spanPlaneCartesianY">0.00</span>

<button id="buttonPlaneCartesianRotate">Rotate counter-clockwise</button>

The `x` and `y` axes get swapped, and the `x` axis also gets flipped. But this behavior is the same as the behavior of real and imaginary number lines when multiplied by `i`:

<canvas id="canvasComplexLinesMultiply"></canvas>

<button id="buttonComplexLinesMultiply">Multiply by i</button>

So, if the real and imaginary number lines are perpendicular to each other, and a point (a,b) is represented by `a+bi` — then multiplication with `i`, represents a 90° counter clockwise rotation of the point.

<canvas id="canvasPlaneComplex"></canvas>
<canvas id="canvasPlaneComplexLine"></canvas>
Transformed Number: <b><span id="spanPlaneComplexNumber">0.00 + 0.00i</span></b><br>
<input id="sliderPlaneComplexR" type="range">Add by Real (a): <span id="spanPlaneComplexR">0.00</span><br>
<input id="sliderPlaneComplexI" type="range">Add by Imaginary (b): <span id="spanPlaneComplexI">0.00</span><br>
<input id="sliderPlaneComplexM" type="range">Multiply by Real: <span id="spanPlaneComplexM">1.00</span>

<button id="buttonPlaneComplexRotate">Multiply by i</button>

The perpendicular real and imaginary number lines together form a plane, where a point (a,b) on the plane can be represented as a number `a+bi`. The only defining feature of this plane is that multiplying a point on it by `i` rotates it counter-clockwise by 90°. And that begs the question — is it any useful if it can only represent quarter turn rotations? Or can it be generalized for other angles too?

### Looking from a Different Angle

Multiplying a number by `i` rotates it by a quarter turn, and multiplying a number twice by `i` would rotate it by half a turn. But multiplying twice by `i` is the same as multiplying by negative one — since `i·i` is just `-1`. So multiplying a point by negative one should have the effect of rotating it by a half turn. And it does.

<canvas id="canvasPlaneComplexNegOne"></canvas>
<canvas id="canvasPlaneComplexNegOneLine"></canvas>
Transformed Number: <b><span id="spanPlaneComplexNegOneNumber">0.00 + 0.00i</span></b><br>
<input id="sliderPlaneComplexNegOneR" type="range">Add by Real (a): <span id="spanPlaneComplexNegOneR">0.00</span><br>
<input id="sliderPlaneComplexNegOneI" type="range">Add by Imaginary (b): <span id="spanPlaneComplexNegOneI">0.00</span><br>
<input id="sliderPlaneComplexNegOneM" type="range">Multiply by Real: <span id="spanPlaneComplexNegOneM">1.00</span>

<button id="buttonPlaneComplexNegOneMI">Multiply by i twice</button><button id="buttonPlaneComplexNegOneMO">Multiply by -1</button>

Alternatively framed, multiplying by `-1` rotates a point and the plane by a half turn, and multiplying by `i`, or `√-1`, rotates it by a quarter turn. It is then not totally implausible to assume that multiplying by `√i` should result in a one-eight turn, or 45° rotation.

But `√-1` was defined as `i` as an assumption. Does `√i` need to be defined as another new number — that results in a 45° rotation? Before defining new numbers, it's useful to see if `√i` can be defined using the existing number system. Finding `√i` is much easier analytically — compared to deducing it from its geometric properties.

`Let a+bi = √i`\
`=> (a+bi)^2 = i`\
`=> a^2 - b^2 + 2abi = i`\
`=> a^2 - b^2 = 0, 2ab = 1`\
`=> a = 1/√2, b = 1/√2`\
`=> √i = 1/√2 + i/√2`

{% tangent(summary="Alternate solutions", open=false) %}
The above equation also has another solution: `a = -1/√2,  b = -1/√2`. However for simplicity, it has been excluded for now.
{% end %}

Analytically, `√i` is equivalent to `1/√2 + i/√2`, and multiplying a number by `1/√2 + i/√2` rotates it by 45° — somehow the analytically derived value of `√i` is consistent with its geometric properties which was only *assumed* to be true.

<canvas id="canvasPlaneComplexHalf"></canvas>
<canvas id="canvasPlaneComplexHalfLine"></canvas>
Transformed Number: <b><span id="spanPlaneComplexHalfNumber">0.00 + 0.00i</span></b><br>
<input id="sliderPlaneComplexHalfR" type="range">Add by Real (a): <span id="spanPlaneComplexHalfR">0.00</span><br>
<input id="sliderPlaneComplexHalfI" type="range">Add by Imaginary (b): <span id="spanPlaneComplexHalfI">0.00</span><br>
<input id="sliderPlaneComplexHalfM" type="range">Multiply by Real: <span id="spanPlaneComplexHalfM">1.00</span>

<button id="buttonPlaneComplexHalfRotate">Multiply by 1/√2 + i/√2</button>

The number `1/√2 + i/√2` interestingly lies halfway between `1` and `i`. It also lies on unit circle, forming a 45° angle with the positive real number axis. Other points lying on the unit circle such as `1/2 + √3i/2` and `√3/2 + i/2` form 30° and 60° angles with the positive real axis, respectively — and multiplying a point with the mentioned numbers again rotates it by 30° and 60° accordingly.

In fact multiplying a number by another number that lies on the unit circle rotates it — by the angle formed by the number on the unit circle and the positive real axis. For example, the multiplier here takes values of numbers lying on the unit circle:

<canvas id="canvasPlaneComplexUnit"></canvas>
<canvas id="canvasPlaneComplexUnitLine"></canvas>
<span id="spanPlaneComplexUnitNums">(0.00+0.00i)(1.00i+0.00i)</span> = <b><span id="spanPlaneComplexUnitNumber">0.00 + 0.00i</span></b><br>
<input id="sliderPlaneComplexUnitR" type="range">Add by Real (a): <span id="spanPlaneComplexUnitR">0.00</span><br>
<input id="sliderPlaneComplexUnitI" type="range">Add by Imaginary (b): <span id="spanPlaneComplexUnitI">0.00</span><br>
<input id="sliderPlaneComplexUnitA" type="range">Multiply by Number: <span id="spanPlaneComplexUnitA">0.00</span>

If a number is multiplied by another number that is not on the unit circle, it again gets rotated by the angle formed by the multiplier and positive real axis. But now, it also gets scaled. The point lies farther or closer from the origin depending on the multiplier — the distance scales linearly with the distance of the multiplier from the origin.

<canvas id="canvasPlaneComplexMag"></canvas>
<canvas id="canvasPlaneComplexMagLine"></canvas>
<span id="spanPlaneComplexMagNums">(0.00+0.00i)(1.00i+0.00i)</span> = <b><span id="spanPlaneComplexMagNumber">0.00 + 0.00i</span></b><br>
<input id="sliderPlaneComplexMagR" type="range">Add by Real (a): <span id="spanPlaneComplexMagR">0.00</span><br>
<input id="sliderPlaneComplexMagI" type="range">Add by Imaginary (b): <span id="spanPlaneComplexMagI">0.00</span><br>
<input id="sliderPlaneComplexMagA" type="range">Multiply by Number: <span id="spanPlaneComplexMagA">0.00</span><br>
<input id="sliderPlaneComplexMagM" type="range">Multiply by Number: <span id="spanPlaneComplexMagM">0.00</span>

It may seem that this what the transformation of the plane looks like when multiplied by real and imaginary numbers, but it is actually wrong. Until now, the transformation of only a single number was tracked — the rest of the plane was simply a translation with respect to that transformed number. To know the actual transformation, all the points of the plane must be tracked instead of a single point.

For example, multiplying all the [integers points on this plane](https://en.wikipedia.org/wiki/Gaussian_integer) with a number reveals that transformation of the plane is a rotation. Using more points reinforces the idea that it applies for all points in the plane. The aforementioned translation transformation of the plane also still occurs, but for addition, not multiplication. Here below, all the points in the plane are operated upon, but a single point can still be tracked for reference.

<canvas id="canvasPlaneComplexAll"></canvas>
<canvas id="canvasPlaneComplexAllLine"></canvas>
<b>Z</b>[i] · <span id="spanPlaneComplexAllMult">(0.00+0.00i)(1.00i+0.00i)</span><br>
<span id="spanPlaneComplexAllNums">(0.00+0.00i)(1.00i+0.00i)</span> = <b><span id="spanPlaneComplexAllNumber">0.00 + 0.00i</span></b><br>
<input id="sliderPlaneComplexAllR" type="range">Add by Real (a): <span id="spanPlaneComplexAllR">0.00</span><br>
<input id="sliderPlaneComplexAllI" type="range">Add by Imaginary (b): <span id="spanPlaneComplexAllI">0.00</span><br>
<input id="sliderPlaneComplexAllA" type="range">Multiply by Number: <span id="spanPlaneComplexAllA">0.00</span><br>
<input id="sliderPlaneComplexAllM" type="range">Multiply by Number: <span id="spanPlaneComplexAllM">0.00</span>

This answers the original question of how multiplication of numbers with non-zero real and imaginary components translates to a geometric transformation: A stretching and rotation of the entire plane itself.

## Definitions

The plane and the number system consisting of real and imaginary numbers can be used to represent rotations. But to be formally used in mathematical context, it is necessary to establish certain formal definitions to describe 'rotation' and 'stretching' — and to prove it holds true for all points in the plane.

Specific terms can be defined to help describe the properties of the new plane and the number system — which will aid in formally describing and quantifying the rotational and stretching effect of multiplication:

* Numbers of the form `a+bi` where `a` and `b` are real numbers, and `i` is `√-1` are defined as [**complex numbers**](https://en.wikipedia.org/wiki/Complex_number) — and the plane formed by the perpendicular real and imaginary number lines is defined as the [**complex plane**](https://en.wikipedia.org/wiki/Complex_plane).
* The [**argument**](https://en.wikipedia.org/wiki/Argument_(complex_analysis)) of a complex number is defined as the angle between the line joining the origin and the complex number, and the positive real axis. The argument of a complex number `z` is usually denoted by `arg(z)`.
* The [**absolute value**](https://en.wikipedia.org/wiki/Absolute_value#Complex_numbers) of a complex number is defined as its [magnitude](https://en.wikipedia.org/wiki/Magnitude_(mathematics)#Complex_numbers) — its [distance](https://en.wikipedia.org/wiki/Euclidean_distance) from the origin. The absolute value of a complex number `z` is denoted by `|z|`.

<canvas id="canvasDefinitions"></canvas>

While having formal definitions to work with is helpful, it is mostly useless if it is used to describe the properties of an idea whose underlying assumption about the premise itself is flawed, or based only on experimental observation of a few numbers — instead of a solid logical proof that applies *generally* to all numbers.

So there needs to be a proof that shows multiplication rotates and stretches the entire complex plane. Or more formally, it needs to be proved that the argument of the product of two complex numbers is the sum of the argument of the individual numbers, while the magnitude of the product is the product of the magnitude of its individual numbers.

<canvas id="canvasProofProduct"></canvas>

## Interpretation

Before going through a proof, it first helps to understand how multiplication has the effect of rotating numbers — by decomposing how the real and imaginary components of the product change with respect to its operands.

The product of two complex numbers `a+bi` and `c+di` is `ac-bd + (ad+bc)i`. The real component of the product is `ac-bd` and the imaginary component is `ad+bc`. For the real component, `ac` signifies that the real components of the product scales with the magnitude of the real components of its factors.

However, it also gets subtracted by `bd` — the product of the imaginary components. One way to visualize it is if the imaginary components increase, their arguments increase as well, shrinking the projection of the product on the real number line.

<canvas id="canvasProofReal"></canvas>
<input id="sliderProofRealA" type="range"><input id="sliderProofRealB" type="range"> a: <span id="spanProofRealA">0.00</span> b: <span id="spanProofRealB">0.00</span><br>
<input id="sliderProofRealC" type="range"><input id="sliderProofRealD" type="range"> c: <span id="spanProofRealC">0.00</span> d: <span id="spanProofRealD">0.00</span><br>

The imaginary component of the product is `ad+bc`. To keep things simpler, `b` and `c` can be kept constant. Then, `a` can be viewed as determining the magnitude of the first number, while `d` as the argument of the other number — suggesting that the magnitude of the first number gets roughly 'rotated' by the argument of the second number when multiplied. As either of the magnitude or argument gets bigger, the product's projection on the imaginary axis gets bigger.

A similar argument can be made for `bc`, keeping `ad` constant — the magnitude of the second number gets rotated by the argument of the first number.

<canvas id="canvasProofImag"></canvas>
<input id="sliderProofImagA" type="range"><input id="sliderProofImagB" type="range"> a: <span id="spanProofImagA">0.00</span> b: <span id="spanProofImagB">0.00</span><br>
<input id="sliderProofImagC" type="range"><input id="sliderProofImagD" type="range"> c: <span id="spanProofImagC">0.00</span> d: <span id="spanProofImagD">0.00</span><br>

These are only useful to build an initial intuition, and are in no way complete, and are not at all exact.

### Trigonometric Proof

To be more rigorous, some knowledge about trigonometry is required. Let us assume the same two complex numbers, but this time represented using the magnitudes `|z1|` and `|z2|`, with arguments `α` and `β` respectively. The components can then alternatively be represented as:

`a = |z1|·cos(α)`\
`b = |z1|·sin(α)`\
`c = |z2|·cos(β)`\
`d = |z2|·sin(β)`

Multiplying the complex numbers `a+bi` and `c+di` would then result in:

`+ |z1|·|z2|·cos(α)·cos(β)`\
`- |z1|·|z2|·sin(α)·sin(β)`\
`+ |z1|·|z2|·cos(α)·sin(β)·i`\
`+ |z1|·|z2|·sin(α)·cos(β)·i`

If the magnitudes are factored out, the result is:

`cos(α)·cos(β) - sin(α)·sin(β)` as the real component,\
`cos(α)·sin(β) + sin(α)·cos(β)` as the imaginary component.

Using [basic trigonometric identities](https://en.wikipedia.org/wiki/List_of_trigonometric_identities#Angle_sum_and_difference_identities), it can be deduced that resultant product will have a real component `cos(α+β)` and imaginary component `sin(α+β)`. It is evident that the argument of the resultant number will be `α+β`.

The final result is `|z1|·|z2|·(cos(α+β) + sin(α+β)i)`, after the magnitudes are factored back in. Clearly, the magnitude of the product is `|z1|·|z2|` — the product of the individual magnitudes of the operands.

Since `a`, `b`, `c`, and `d` are any real numbers, the proof applies generally for all points in the plane. Thus, it can be said that multiplying with a complex number has the effect of stretching the complex plane by its magnitude, as well as rotating it by its argument.

## Purpose

Complex numbers can thus be used to model two dimensional rotations. However it can be argued that these rotations can also be described using vectors and [rotational matrices](https://en.wikipedia.org/wiki/Rotation_matrix), and that those are considerably more powerful since they are not restricted to only two dimensions. So this means that complex numbers are not strictly 'necessary'.

Although not *absolutely* necessary (in applied math), complex numbers are nonetheless very handy since they simplify descriptions of rotations — it is a simple multiplication. In fact, this simplicity is embodied in the [Euler's formula](https://en.wikipedia.org/wiki/Euler%27s_formula), which provides an elegant and concise way to describe periodic functions using rotations — and forms the basis of the Fourier and Laplace transforms.

<canvas id="canvasFourier"></canvas>

{% tangent(summary="The Fourier and Laplace transform", open=true) %}
The [Fourier transform](https://en.wikipedia.org/wiki/Fourier_transform) transforms a function to another function describing the intensity of various frequencies present in the original function. The [Laplace transform](https://en.wikipedia.org/wiki/Laplace_transform) is a more generalized form of the Fourier transform which also describes the rate of [decay](https://en.wikipedia.org/wiki/Exponential_decay) of a function.
{% end %}

The necessity of complex numbers is even more significant in [pure mathematics](https://en.wikipedia.org/wiki/Complex_number#Algebraic_number_theory) — they form the algebraically closed field for real numbers.

<canvas id="canvasFields"></canvas>

{% tangent(summary="Algebraically Closed Fields", open=true) %}
In mathematics, an [algebraic structure](https://en.wikipedia.org/wiki/Algebraic_structure) is a set of elements and operations, that satisfies certain [rules](https://en.wikipedia.org/wiki/Axiom#Non-logical_axioms). A [field](https://en.wikipedia.org/wiki/Field_(mathematics)) is an algebraic structure that satisfies [the **properties** of addition, subtraction, multiplication, and division](https://en.wikipedia.org/wiki/Field_(mathematics)#Alternative_definition). Real numbers are fields. An [algebraically closed field](https://en.wikipedia.org/wiki/Algebraically_closed_field) is a field that must have roots for a [non-constant polynomial](https://en.wikipedia.org/wiki/Polynomial#Classification) in that field — if the coefficients of the polynomial are elements of that field.

For example, `x^2 + 1 = 0` does not have its roots defined in real numbers even though its coefficients are real — so real numbers are not algebraically closed. However, the roots are defined for all complex numbers, and thus the set of complex numbers form an algebraically closed field.
{% end %}

So now the question arises: Does it warrant redefining the number system to describe rotations? Absolutely. But does it make sense that a number system that is intuitive, and is used to [describe reality](https://en.wikipedia.org/wiki/Wave_function) are called imaginary? Absolutely not. Would anyone describe negative numbers as 'unnatural' because they are not a part of natural numbers?

<script>
{{ loadData(path="/scripts/complex-rotations.js") }}
</script>
