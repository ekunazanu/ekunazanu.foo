+++
title = "Complex Rotations"
description = "Building an intuition for the complex plane and rotation using multiplication."
date = 2024-10-01
weight = 2
draft = true
template = "article.html"
[extra]
type = "article"
thumbnail = "lab.plane.svg"
thumbnailalt = "Two lines of unit length on a polar plane."
+++

In mathematics there are multiple ways to represent the same underlying principles or ideas. There are different ways to represent two dimensional spaces — the [cartesian](https://en.wikipedia.org/wiki/Cartesian_coordinate_system), [polar](https://en.wikipedia.org/wiki/Polar_coordinate_system), and [other](https://en.wikipedia.org/wiki/Category:Two-dimensional_coordinate_systems) coordinate systems — and multiple ways to morph that space. Complex numbers are a way to represent two dimensional spaces, and are an even more elegant way to represent two dimensional rotations.

## Real Numbers

This a real number line:

{{ loadData(path="/static/media/lab/complex-rotations/numberline-static.txt") }}

It can be thought of as a one dimensional space — where any real number `x` is a point on the space with distance `x` from the origin point, zero. Positive numbers are on the right of the origin, and negative numbers on the left.

Since any real number is a point on this space, the output of any operation that results in a real number will also be a point on the one dimensional space — both the input and output can be mapped on the real number line. The operation can then be thought of as a transformation of the number line.

{{ loadData(path="/static/media/lab/complex-rotations/numberline-arrows.txt") }}

Consider addtion: If a point or number is taken, and an addend `d` is added to it — then the sum would lie `d` distance to the right or left from the original point on the number line, depending on the sign of the addend. Since it is true for all points, the entire number line can be thought of as being **shifted** by distance `d`.

{{ loadData(path="/static/media/lab/complex-rotations/numberline-addition.txt") }}

{% tangent(summary="Transforming number lines", open=false) %}
The number line on the bottom represents both the original and the transformed number lines superimposed on each other. A single point is highlighted to make it easier to keep track of how the number line is transformed. The numbers below, with respect to the old coordinates above is the result of all the composition of operations.
{% end %}

Just as addition morphed the number line by shifting it, multiplication morphs the number by scaling, or **stretching** it — by the amount specified by the multiplier. Multiplication by a negative value stretches and also **flips** the number line.

{{ loadData(path="/static/media/lab/complex-rotations/numberline-multiplication.txt") }}

The visual transformation analogues on a number line for the square function is however much more complicated than a simple shift or stretch.

{{ loadData(path="/static/media/lab/complex-rotations/numberline-exponentiation.txt") }}

It is complicated to describe how *all* the numbers behave using a single tranform, but breaking it down into multiple transformations for *each* number makes it much easier to comprehend. Since squaring a number simply involves multiplying it by itself — it can be represented as stretching (and possibly flipping) the number line twice by the same multiplier.

{{ loadData(path="/static/media/lab/complex-rotations/numberline-exponentiation-single.txt") }}

Visualizing the square root function to a number line transformation is tricky as well. But the square root function can alternatively defined using the square function — the root shall be defined as the number which, when squared, yields the operand.

{{ loadData(path="/static/media/lab/complex-rotations/numberline-sqrt.txt") }}

{% tangent(summary="Finding square roots", open=true) %}
Finding a square root using this transformation involves specifying a number, and then using trial and error to find another number that squares to the number selected earlier — to get the square root.
{% end %}

There is a problem however. It is impossible to find the square root of negative numbers, since the output of the square function is always mapped to a non-negative number.

{{ loadData(path="/static/media/lab/complex-rotations/numberline-sqrt-negative.txt") }}

This is not a limitation of the visualisation, but rather a limitation arising from the definition of the square and square root function, and real numbers itself — it is impossible get a negative number by squaring real numbers.

## Imaginary Numbers

Suppose numbers which square to a negative number do exist. But then it becomes a challenge on how to place those numbers on the number line. This is where it helps to make certain assumptions.

* **Assumption I**: Since the square root of negative numbers could not be mapped on the real number line, they must lie on a completely different number line. Since these numbers do not lie on the real number line, they will also be referred to as imaginary numbers from now on.

{{ loadData(path="/static/media/lab/complex-rotations/numberlines-real-imaginary.txt") }}

* **Assumption II**: The square root of any negative numbers (imaginary numbers) can derived using the square root of negative one and scaling it with a **real number**. Square root of negative one shall be denoted as `i`. So an imaginary number can be represented as `b·i`, where `b` is a real number. The real and imaginary numbers together shall be described as a sum `a+bi`, where `a` and `b` are real numbers and `i` is the square root of negative one.

{{ loadData(path="/static/media/lab/complex-rotations/numberlines-real-imaginary-complex.txt") }}

* **Assumption III**: Addition is defined as `(a+bi) + (c+di)` = `(a+c) + (b+d)i`; ie. both operate on their own respective real and imaginary components. Multiplication is defined as `(a+bi) · (c+di)` = `a·c + a·i + bi·c + bi·di` or simplified, `(ac-bd) + (ad+bc)i` — ie. multiplication is distruted over addition.

It can be inferred from the assumptions:
* Addition affects their own component and has no effect on the other entity.
* Since any imaginary number can be thought of as root of negative one scaled up by a real number, **multiplying a real with any imaginary number results in a (scaled) imaginary number** as well — ie. `k · bi` = `kb·i`.
* Multiplying an imaginary number with an imaginary number can be thought of as multiplying their scalars and multiplying their roots of negative one. Squaring the root of negative one is negative one, thus **multiplying two imaginary numbers results in a (scaled) negative real number**. That is, `bi · di` can be rewritten as `b·d · i·i` = `bd · -1` = `-bd`.
* Multiplying two numbers with both non-zero real and imaginary components results in a number that is the product of the two numbers following the rules of distributive multiplication over addition.

It is difficult to visualize how multiplication of numbers with non-zero real and imaginary components transforms the number lines. But addition and multiplication with either only a real component or an imaginary component is relatively easier to vizualize. Geometerically:

* Addition with real numbers shifts the real number line.
* Addition with imaginary numbers shifts the imaginary number line.
* Multiplication with real numbers stretches the real number line as well as the imaginary number lines.
* Multiplication with imaginary numbers morphs number lines such that:
    * If the number (line) was on the real number line, it now lies on the imaginary number line.
    * If the number (line) was on the imaginary number line, it now lies on the flipped real number line.

{{ loadData(path="/static/media/lab/complex-rotations/numberlines-real-imaginary-transformations.txt") }}

These assumptions, constraints and the resulting visual transforms might seem arbitrary at first, but the motivation behind it starts making sense when we expand into the second dimension.

## Complex Plane

Take any point on a cartesian plane, and keep track of its coordinates as well as the `x` and `y` axes when it is rotated counter-clockwise by 90°:

{{ loadData(path="/static/media/lab/complex-rotations/plane-cartesian-rotation-90.txt") }}

The `x` and `y` axes get swapped, and the `x` axis also gets flipped. But this behaviour is similar as the behaviour of real and imaginary number lines when multiplied by `i`:

{{ loadData(path="/static/media/lab/complex-rotations/plane-cartesian-rotation-90-numberlines.txt") }}

So, if the real and imaginary number lines are perpendicular to each other, and a point (a,b) is represented by `a+bi` — then multiplication with `i`, represents a 90° counter clockwise rotation of of the point (and all other points, or the entire plane).

{{ loadData(path="/static/media/lab/complex-rotations/plane-complex-rotation-90-numberlines.txt") }}

The perpendicular real and imaginary number lines together form a plane, where a point (a,b) on the plane can be represented as a number `a+bi`. The only defining feature of this plane is that multiplying a point on it by `i` rotates it counter-clockwise by 90°. And that begs the question — is it any useful if it can only represent quarter turn rotations? Or can it be generalised for other angles too?

### A Different Angle

Multiplying a number by `i` rotates it by a quarter turn, and multiplying a number twice by `i` would rotate it by half a turn. But multiplying twice by `i` is the same as multiplying by negative one — since `i·i` is just `-1`. So multiplying by negative one has the effect of rotating the plane by a half turn.

{{ loadData(path="/static/media/lab/complex-rotations/plane-complex-rotation-180.txt") }}

Alternatively framed, multiplying by `-1` rotates a point and the plane by a half turn, and multiplying by `i`, or `√-1`, rotates it by a quarter turn. It is then not totally implausible to assume that multiplying by `√i` should result in a one-eight turn, or 45° rotation.

{{ loadData(path="/static/media/lab/complex-rotations/plane-complex-rotation-45.txt") }}

But `√-1` was defined as `i` as an assumption. Does `√i` need to be defined as another new number — that results in a 45° rotation? Before defining new numbers, it's useful to see if `√i` can be defined using the existing number system. Finding `√i` is much easier analytically — compared to deducing it from its geometric properties.

`Let a+bi = √i`\
`=> (a+bi)^2 = i`\
`=> a^2 - b^2 + 2abi = i`\
`=> a^2 - b^2 = 0, 2ab = 1`\
`=> a = 1/√2, b = 1/√2`\
`=> √i = 1/√2 + i/√2`\

{% tangent(summary="Alternate solutions", open=false) %}
The above equation also has another solution: `a = -1/√2,  b = -1/√2`. However for simplicity's sake it has been excluded for now.
{% end %}

Analytically, `√i` is equivalent to `1/√2 + i/√2`, and multiplying a number by `1/√2 + i/√2` rotates it by 45° — somehow the analytically derived value of `√i` is consistent with its geometric properties which was only *assumed* to be true.

{{ loadData(path="/static/media/lab/complex-rotations/plane-complex-rotation-45-values.txt") }}

The number `1/√2 + i/√2` interestingly lies halfway between `1` and `i`. It also lies on unit circle, forming a 45° angle with the positive real number axis. Other points lying on the unit circle such as `1/2 + √3i/2` and `√3/2 + i/2` form 30° and 60° angles with the positive real axis, respectively — and multiplying a point with the mentioned numbers again rotates it by 30° and 60° accordingly.

In fact multplying a number by another number that lies on the unit circle rotates it — by the angle formed by the number on the unit circle and the positive real axis:

{{ loadData(path="/static/media/lab/complex-rotations/plane-complex-rotation-any.txt") }}

If a number is multiplied by another number that is not on the unit circle, it again gets rotated by the angle formed by the multiplier and positive real axis. But now, it also gets scaled. The point lies farther or closer from the origin depending on the multiplier — the distance scales linearly with the distance of the multiplier from the origin.

{{ loadData(path="/static/media/lab/complex-rotations/plane-complex-rotation-scale-any.txt") }}

While only one point has been explicilty shown, it it important to note that all points in the plane would behave the same way when multiplied. This answers the original question of how multiplication of numbers with non-zero real and imaginary components translates to a geometric transformation: A stretching and rotation of the entire plane itself.

{{ loadData(path="/static/media/lab/complex-rotations/plane-complex-rotation-scale-any-all-points.txt") }}

## Definitions

The plane and the number system consisting of real and imaginary numbers can be used to represent rotations. But to be formally used in mathematical context, it is necessary to establish certain formal definitions to describe 'rotation' and 'stretching' — and to prove it holds true for all points in the plane.

Specific terms can be defined to help describe the properties of the new plane and the number system — which will aid in formally describing and quantifying the rotational and stretching effect of multiplication:

* Numbers of the form `a+bi` where `a` and `b` are real numbers, and `i` is `√-1` are defined as [**complex numbers**](https://en.wikipedia.org/wiki/Complex_number) — and the plane formed by the perpendicular real and imaginary number lines is defined as the [**complex plane**](https://en.wikipedia.org/wiki/Complex_plane).
* The [**argument**](https://en.wikipedia.org/wiki/Argument_(complex_analysis)) of a complex number is defined as the angle between the line joining the origin and the complex number, and the positive real axis. The argument of a complex number `z` is usually denoted by `arg(z)`.
* The [**absolute value**](https://en.wikipedia.org/wiki/Absolute_value#Complex_numbers) of a complex number is defined as its [magnitude](https://en.wikipedia.org/wiki/Magnitude_(mathematics)#Complex_numbers) — its [distance](https://en.wikipedia.org/wiki/Euclidean_distance) from the origin. The absolute value of a complex number `z` is denoted by `|z|`.

While having formal defintions to work with is helpful, it is mostly useless if it is used to describe the properties of an idea whose underlying assumption about the premise itself is flawed, or based only on experimental observation of a few numbers — instead of a solid logical proof that applies *generally* to all numbers.

So there needs to be a proof that shows multiplication rotates and stretches the entire complex plane. Or more formally, it needs to be proved that the argument of the product of two complex numbers is the sum of the argument of the individual numbers, while the magnitude of the product is the product of the magnitude of its individual numbers.

{{ loadData(path="/static/media/lab/complex-rotations/plane-complex-product-argument-magnitude.txt") }}

## Interpretation

Before going through a proof, it first helps to understand how multiplication has the effect of rotating numbers — by decomposing how the real and imaginary components of the product change with respect to its operands.

The product of two complex numbers `a+bi` and `c+di` is `ac-bd + (ad+bc)i`. The real component of the product is `ac-bd` and the imaginary component is `ad+bc`. For the real component, `ac` signifies that the real components of the product scales with the magnitude of the real components of its factors.

However, it also gets subtracted by `bd` — the product of the imaginary components. One way to visualise it is if the imaginary components increase, their arguments increase as well, shrinking the projection of the product on the real number line.

{{ loadData(path="/static/media/lab/complex-rotations/plane-complex-product-real-projection.txt") }}

The imaginary component of the product is `ad+bc`. To keep things simpler, `b` and `c` are kept constant. Then, `a` can be viewed as determining the magnitude of the first number, while `d` as the argument of the other number — suggesting that the magnitude of the first number gets rougly 'rotated' by the argument of the second number when multiplied. As either of the magnitude or argument gets bigger, the product's projection on the imaginary axis gets bigger.

A similar argument can be made for `bc`, keeping `ad` constant — the magnitude of the second number gets rotated by the argument of the first number.

{{ loadData(path="/static/media/lab/complex-rotations/plane-complex-product-imaginary-projection.txt") }}

These are only useful to build an initial intuition, and are in no way complete, and are not at all exact.

### Trigonometric Proof

To be more rigorous, some knowledge about trigonometry is required. Let us assume the same two complex numbers, but this time represented using the magnitudes `|z1|` and `|z2|`, with arguments `α` and `β` respectively. The components can then alternatively be represented as:

`a = |z1|·cos(α)`\
`b = |z1|·sin(α)`\
`c = |z2|·cos(β)`\
`d = |z2|·sin(β)`

{{ loadData(path="/static/media/lab/complex-rotations/plane-complex-coords-conversion.txt") }}

Multiplying the complex numbers `a+bi` and `c+di` would then result in:

`+ |z1|·|z2|·cos(α)·cos(β)`\
`- |z1|·|z2|·sin(α)·sin(β)`\
`+ |z1|·|z2|·cos(α)·sin(β)·i`\
`+ |z1|·|z2|·sin(α)·cos(β)·i`

If the magnitudes are factored out, the result is:

`cos(α)·cos(β) - sin(α)·sin(β)` as the real component\
`cos(α)·sin(β) + sin(α)·cos(β)` as the imaginary component.

Using [basic trigometric identities](https://en.wikipedia.org/wiki/List_of_trigonometric_identities#Angle_sum_and_difference_identities), it can be deduced that resultant product will have a real component `cos(α+β)` and imaginary component `sin(α+β)`. It is evident that the argument of the resultant number will be `α+β`.

{{ loadData(path="/static/media/lab/complex-rotations/plane-complex-coords-angle-addition.txt") }}

The final result is `|z1|·|z2|·(cos(α+β) + sin(α+β)i)`, after the magnitudes are factored back in. Clearly, the magnitude of the product is `|z1|·|z2|` — the product of the individual magnitudes of the operands.

Since `a`, `b`, `c`, and `d` are any real numbers, the proof applies generally for all points in the plane. Thus, it can be said that multiplying with a complex number has the effect of stretching the complex plane by its magnitude, as well as rotating it by its argument.

## Purpose

It can be argued that two dimensional rotations can also be described using vectors and [rotational matrices](https://en.wikipedia.org/wiki/Rotation_matrix), and that it is considerably more powerful since it is not restricted to two dimensions. It is true — complex numbers are not strictly 'necessary', at least not in applied mathematics.

Although not *absolutely* necessary, they are nonetheless very handy since they simplify descriptions of rotations. But the real beauty of the complex plane becomes apparent in the [Euler's formula](https://en.wikipedia.org/wiki/Euler%27s_formula), which provides an elegant and concise way to describe periodic functions — forming the basis of the Fourier and Laplace transforms.

{{ loadData(path="/static/media/lab/complex-rotations/laplace-transformation-static.txt") }}

{% tangent(summary="The Fourier and Laplace transform", open=false) %}
The [Fourier transform](https://en.wikipedia.org/wiki/Fourier_transform) transforms a function to another function describing the intensity of various frequencies present in the original function. The [Laplace transform](https://en.wikipedia.org/wiki/Laplace_transform) is a more generalized form of the Fourier transform which also describes the rate of [decay](https://en.wikipedia.org/wiki/Exponential_decay) of a function.
{% end %}

The necessity of complex numbers is even more significant in [pure mathematics](https://en.wikipedia.org/wiki/Complex_number#Algebraic_number_theory) — they form the algebraically closed field for real numbers.

{% tangent(summary="Algebraically Closed Fields", open=false) %}
In mathematics, an [algebraic structure](https://en.wikipedia.org/wiki/Algebraic_structure) is a set of elements and operations, that satisfies certain [rules](https://en.wikipedia.org/wiki/Axiom#Non-logical_axioms). A [field](https://en.wikipedia.org/wiki/Field_(mathematics)) is an algebraic structure that satisfies [the **properties** of addition, subtraction, multiplication, and division](https://en.wikipedia.org/wiki/Field_(mathematics)#Alternative_definition). Real numbers are fields. An [algebraically closed field](https://en.wikipedia.org/wiki/Algebraically_closed_field) is a field that must have roots for a [non-constant polynomial](https://en.wikipedia.org/wiki/Polynomial#Classification) in that field — if the coefficients of the polynomial are elements of that field.

For example, `x^2 + 1 = 0` does not have its roots defined in real numbers even though its coefficients are real — so real numbers are not algebraically closed. However, the roots are defined for all complex numbers, and thus the set of complex numbers form an algebraically closed field.
{% end %}

## Redefining Conventions

Multiplication initially had the effect of stretching a one dimensional real number line, but later it was found it could also describe two dimensional rotations on the complex plane. The new transformation also preserves its old behaviour of stretching the real number line, except it now stretches the entire complex plane itself. It expands the scope of the multiplication function rather than altering it in a way that breaks its previous behaviour.

Similarly, the assumption about the existence of an imaginary line that is perpendicular to the real number line does not break any existing convention. In fact, when combined with the new defintion of multiplication, it can elegantly describe two dimensional rotations.

So now the question arises: Does it warrant redefining multiplication, and creating a new number system for describing rotations? Absolutely. Does it make sense that a number system that is intuitive, and is used to [describe reality](https://en.wikipedia.org/wiki/Wave_function) are called imaginary? Absolutely not. Would you describe negative numbers as 'unnatural' because they are not a part of natural numbers?
