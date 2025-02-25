+++
title = "Neural Networks"
description = "A primer on neural networks."
weight = 7
draft = true
template = "article.html"
[extra]
type = "article"
thumbnail = "lab.convolution.svg"
thumbnailalt = "Pixelated image of flowers with a 3x3 kernel on the bottom left."
+++

Artifical neural networks are a powerful way to model and find hidden patterns within data. They have become [popular](https://www.understandingai.org/p/why-the-deep-learning-boom-caught) with recent advancements in hardware, and availability of large datasets. Neural networks at their core are very simple — they can achieve remarkable performance using only additions, multiplications, and non-linear functions.

## Linear Regression

Consider a very simple dataset consisting of one input variable and one output variable. The dataset can be represented on a cartesian plane with the inputs on the x-axis and the outputs on the y-axis.

<canvas id="canvasTestBars"></canvas>

This representation of the data provides an intuitive idea of the relationship between the input and output data. One of the simplest ways to model this relationship on this plane is using by a straight line. The line will have a slope, and an intercept. Finding the optimal slope and intercept values will result in an estimator that models the relationship between the inputs and outputs pretty accurately.

<canvas id="canvasTestPlot"></canvas>

Using trial and error, it is easy to find a line that best fits the given dataset. It is also easy to intuitively gauge the accuracy of the estimator when the data points and the estimator are both plotted on a plane. However, there needs to be a way to quantitify it. A simple way to is by calculating how 'off' the line is from the data points — the distance between the line and the data points.

<canvas id="placeholder"></canvas>

The average of the distances provides a measure of how inaccuracte the estimator is. A low average distance means the estimator is likely to be modelling the data well, while a high average distance means the estimator is a good fit for the data. The average of these distance measures the error of an estimator, and is called the 'cost'. Generally, the cost is defined as the square of the distance, instead of the absolute distance.

<canvas id="placeholder"></canvas>

Finding ways to reduce this cost will result in a good estimator for the data.

### Gradient Descent

Because of the way the model and the accuracy (cost) are defined, changing the slope and intercept values changes the cost in a predictable manner. The cost is lowest at some point, and increases when the slope or intercept deviate farther from their optimal values.

<canvas id="placeholder"></canvas>
<!-- graph and line on top; on bottom -> separate 2d graphs for slope and intercept on left; and combined 3d (coloured 2d topography map) -> on right; button to show/hide precalculated graphs -->

{% tangent(summary="Convex cost function", open=true) %}
A formal way to state the above is that the cost function for a linear estimator is [convex](https://en.wikipedia.org/wiki/Convex_function).
{% end %}

The convexity of the cost function can be used to find a point (slope and intercept value) in the function that results in the lowest possible cost.

If the slope and intercept values are changed slightly and a new cost is evaluated, then the differences between the new costs and parameter values can be calculated to yield a [gradient](https://en.wikipedia.org/wiki/Gradient) that describes the direction and magnitude of the changes around that point. That is, how the changes in parameters affect the cost — and by how much.

<canvas id="placeholder"></canvas>
<!-- graph and line on top; on bottom —> separate 2d graphs for slope and intercept on left — red/othcolor line indicated slope; and combined 3d (coloured 2d topography map) on right — red/othcolor single headed-arrow indicating direction and magnitude of gradient; button to show/hide precalculated graphs -->

{% tangent(summary="Calculating precise gradients using calculus", open=true) %}
Formally, the rate of change in output of a function due to slight changes in the input, is described by the [first-order derivative](https://en.wikipedia.org/wiki/Derivative) of the function. The gradient at a point describes the magnitude and direction that results in the steepest rate of change locally — using infomation from each individual [partial derivative](https://en.wikipedia.org/Partial_derivative). That is, how each parameter affects the output to maximize the function locally.
{% end %}

Using the gradient information, new slope and intercept values with a lower cost can be computed by 'descending' down the gradient of the cost function. The step-size of the descent can be adjusted by multiplying the gradient with some constant factor.

<canvas id="placeholder"></canvas>
<!-- graph and line on top; on bottom —> separate 2d graphs for slope and intercept on left — red/othcolor line indicated slope — highlight portion of slope determined by learning rate; and combined 3d (coloured 2d topography map) on right — red/othcolor single headed-arrow indicating direction and magnitude of gradient; button to show/hide precalculated graphs -->

New slope and intercept values along with their gradients are iteratively updated until the point with the lowest cost is found. The constant factor that determines the step-size serves as the rate for arriving at the minima, and is called the learning rate. Smaller rates results in more iterations to converge to a minima, but bigger rates might result in never even converging to a point.

<canvas id="placeholder"></canvas>
<!-- graph and line on top; on bottom —> separate 2d graphs for slope and intercept on left — red/othcolor line indicated slope — highlight portion of slope determined by learning rate; and combined 3d (coloured 2d topography map) on right — red/othcolor double headed-arrows indicating direction and magnitude of gradient; button to show/hide precalculated graphs; animate show iterations -->

{% tangent(summary="Minima", open=true) %}
A [minima](https://en.wikipedia.org/wiki/Maximum_and_minimum#/media/File:Extrema_example_original.svg) is a point in a function where its value is lower than its neighboring points. Since the cost function is convex, finding the point with lowest cost (global minima) is guaranteed for some learning rate &delta;.
{% end %}

By finding the slope and intercept values that minimizes the cost, the line ends up being a good estimator for the dataset.

## Multiple Linear Regression

The current model uses a line as an estimator to find the best fit between an input and an output variable. However the line is just a visual representation of the estimator. What the line signifies is more important — the relationship between the input and output. That relationship is described by the slope and intercept. The slope determines how much the input influences the output, or in other words, the **weight** it holds. Similarly the intercept determines how skewed or **biased** the result is, irrespective of the input.

Instead of representing the current model as a line with a slope and intercept, it can also be represented using only the weights and biases, describing the output as function of a weighted input and a bias.

<canvas id="placeholder"></canvas>
<!-- show graph on top; neurons (1 weight + 1 bias) on bottom; changing weight changes line stroke-width -->

The new representation does away with the cartesian plane, and uses raw weights and biases to illustrate the relationship between the inputs and the output. This has certain strengths and weaknesses. First, it emphasizes the correlation between the input and the ouptut — how much the inputs affect the ouptut. Second, it can represent multiple input (and output) variables without needing to visualize higher dimensional spaces.

<canvas id="placeholder"></canvas>
<!-- show graph on top; neurons on bottom; stop showing graph if exceeding 2 weight neurons or output neurons; button for add input -->

However, this neural-graph representation does not show the data (points) and instead only shows the relationship between the input and output. Without a line and data points, it becomes much harder to gauge the accuracy of the model, at least intuitively.

<canvas id="placeholder"></canvas>
<!-- DO NOT show graph on top; neurons on bottom; button for add input -->

For a single input-output variable dataset represented using a two dimensional space, it is relatively easy to identify patterns in the data — and then using that instinct to verify if the model (line) fits the data. But for data with multiple input-output variables, higher dimensions are required to represent the data. It is very difficult to even imagine a space higher than three dimensions, let alone find patterns in it.

Instead of relying on visual intuition to assess the accuracy of a model, the accuracy can be calculated as was done earlier — by calculating the cost (error) of the estimator.

<canvas id="placeholder"></canvas>
<!-- coloured bar (like a fuel bar) on right for showing cost for given parameter -->

Finding the equation for the actual estimator for multidimensional data can again be done via gradient descent. The principles are the same: Finding the gradient at some point, using the gradient information to update the weights and bias, and repeating the process until the global minima is found.

<canvas id="placeholder"></canvas>
<!-- coloured bar (like a fuel bar) on right for showing cost for given parameter -->

{% tangent(summary="Gradients in higher dimensions", open=true) %}
Similar to the two-parameter model, the gradient can be calculated using the first-order partial derivative of the cost function with respect to each parameter (weight). The difference is only in the number of parameters — the partial derivatives for a bigger set of parameters need to be calculated instead of calculating the partial derivatives for only two parameters.
{% end %}

## Nonlinear Regression

Consider another dataset with one input and one output variable, but without a simple linear relationship.

<canvas id="placeholder"></canvas>
<!-- u or intverted u shaped data -->

While a linear estimator can be used for this dataset, it will result in a cost that is never below a certain threshold. This may not be ideal. Even intuition suggests that a line is far from the optimal estimator for the given data.

<canvas id="placeholder"></canvas>
<!-- u or intverted u shaped data, show dotted line for minimum cost -->

Using a more complex nonlinear estimator however can lower the cost.

### Piecewise Linearity

Instead of using a straight line, a segmented line can better model the data. Formally, the segmented line estimator can be described by a piecewise linear function.

<canvas id="placeholder"></canvas>

{% tangent(summary="Piecewise linear functions", open=true) %}
A [piecewise linear function](https://en.wikipedia.org/wiki/Piecewise_linear_function) is the composition of several linear (or more accurately, affine) functions with distinct domains. It is .
{% end %}

A very simple piecewise linear function is the [rectifier](https://en.wikipedia.org/wiki/Rectifier_(neural_networks)) or rectified linear unit. The rectifier function is just `f(x) = max(0, x)`.

Using a hidden layer coupled with a non-linear, we can model more complex non-linear estimators. The bias has a slightly different use in this case. It acts a paramater to modify the activation function (ReLU).

https://medium.com/@gallettilance/tuning-neural-networks-part-iii-43dfd0c8600f

### Backpropagation

Again.

Chain Rule. How each layer effects the neuron in the next layer.

Matrices are another way to compactly represent the connections between the neurons.

### Generalisation

Since the other models had a convex cost functions, it was easy to find the minima — since it was global. However there are multiple minimas for the given non-linear data using multiple models. there is no way to know if the model finds the best fit for the data — at least not as easily and directly.

A way to 'test' if the model finds a good fit for the data is by calculating the cost on unseen data. If the cost is low even for unseen data points, then the model is most likely to have found an accurate estimator that fits the data well.

<canvas id="placeholder"></canvas>
<!-- coloured bar (like a fuel bar) on right for showing cost for given parameter -->

{% tangent(summary="Test dataset requirements", open=true) %}
The unseen test data must have the same characteristics as the original dataset. If the test dataset does not have the same distribution as the original dataset, the cost would not be a correct representation of the estimator's accuracy.
{% end %}

The first case is underfitting, the model is too simple to model the data. It has a high cost regardless of the data, and is said to have high bias. The second case, the model is overfitting to the training data. The model is overly complex, and highly susceptible to memorizing the data instead of a more generalised estimator.

{% tangent(summary="Bias in models", open=true) %}
The bias.
{% end %}

However, restricting the connections can make the model more efficient and accurate. The hypothesis is features appear locally, so restricting it to local — [inductive biases](https://en.wikipedia.org/wiki/Inductive_bias). Avoid overfitting.

## Neural Networks

While [any non-linear function can be approximated](https://en.wikipedia.org/wiki/Universal_approximation_theorem) by a layer of weighted non-linear activation function with their respective biases, adding more layers have been shown to be more efficient and are more likely to generalise.

## Classification

Finding patterns

Affine Transformations + Squish Space

## Manifold Hypothesis

Thinking of data as points in some higher dimensional space is helpful as it helps a way to define error, via distances between coordinates in this space. A way to formalise this notion of space and standard defined distances between points is standard is via manifolds.

Just finding feature patterns accross higher dimensions, when trying to reduce the cost. Maybe it generalizes, maybe it memorizes. To know for sure: model interpretability — making sense of the weights and how each feature affect the output and each other. Hard to do, using just weight information and why neural networks are notoriously known as black boxes.

According to the [manifold hypothesis](https://en.wikipedia.org/wiki/Manifold_hypothesis), not only does data have correlations across some higher dimensions, the correlations appear across a much [smaller dimensional space](https://en.wikipedia.org/wiki/Latent_space) — the other dimensions does not have much effect on the output.

## Inductive Biases

can improve probability to generalise.

convolutions => local features.

transformers => a way to model the importance of certain tokens depending on previous context.

---

## References

* Simon J. D. Prince: [Understanding Deep Learning](https://udlbook.github.io/udlbook/)

<script src="/scripts/neural-networks.js"></script>
<!-- Weights, Biases — https://observablehq.com/@d3/parallel-coordinates -->
