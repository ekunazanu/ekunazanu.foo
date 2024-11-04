+++
title = "Convolutional Network"
description = "A primer on convolutional neural networks."
date = 2027-01-28
draft = true
template = "article.html"
[extra]
type = "article"
thumbnail = "lab.convolution.svg"
thumbnailalt = "Pixelated image of flower drawings with a 3x3 grid on the top left."
+++

Convolutional neural networks are a powerful way to model and process grid structured data like images and audio — to find hidden patterns and relationships within the data. They have become [increasingly popular](https://www.understandingai.org/p/why-the-deep-learning-boom-caught) with advancements in hardware capabilities, and availability of large datasets. CNNs at their core are very simple — they can achieve remarkable performance using only additions, multiplications, and a simple non-linear function.

## Linear Regression

Consider a very simple dataset consisting of one input variable and one output variable. The dataset can be represented on a cartesian plane with the inputs on the x-axis and the outputs on the y-axis.

{{ loadData(path="/static/media/lab/neural-networks/.txt") }}

This representation of the data provides an intuitive idea of the relationship between the input and output data. One of the simplest ways to model this relationship on this plane is using by a straight line. The line will have a slope, and an intercept. Finding the optimal slope and intercept values will result in an estimator that models the relationship between the inputs and outputs pretty accurately.

{{ loadData(path="/static/media/lab/neural-networks/.txt") }}

<mark>Using trial and error, it is easy to find a line that best fits the given dataset. This statement can be quantitatified by stating tha calculating how 'off' the line is from the data points — the distance between the line and the data points — and then find ways to reduce this distance or 'cost'.</mark>

{{ loadData(path="/static/media/lab/neural-networks/.txt") }}

Because of the way the model and the accuracy (cost) are defined, changing the slope and intercept values changes the cost in a predictable manner. The cost is lowest at some point, and increases when the slope or intercept deviate farther from their optimal values. A formal way to state this is that the cost function is [convex](https://en.wikipedia.org/wiki/Convex_function).

{{ loadData(path="/static/media/lab/neural-networks/.txt") }} <!-- graph and line on top; on bottom -> separate 2d graphs for slope and intercept on left; and combined 3d (coloured 2d topography map) -> on right; button to show/hide precalculated graphs -->

### Gradient Descent

The slope and intercept value can either be increased or decreased. If these parameters are updated and a new cost is evaluated, then the differences between the new costs and parameter values can be calculated to yield a [gradient](https://en.wikipedia.org/wiki/Gradient) that describes the direction and magnitude of the changes around that point. That is, how the changes in parameters affect the cost — and by how much.

The gradient can also be computed using the [first-order derivative](https://en.wikipedia.org/wiki/Derivative) of the cost function.

{{ loadData(path="/static/media/lab/neural-networks/.txt") }} <!-- graph and line on top; on bottom —> separate 2d graphs for slope and intercept on left — red/othcolor line indicated slope; and combined 3d (coloured 2d topography map) on right — red/othcolor double headed-arrows indicating direction and magnitude of gradient; button to show/hide precalculated graphs -->

Using the gradient information, new slope and intercept values with a lower cost can be computed by 'descending' down the gradient of the cost function. The step-size of the descent can be adjusted by multiplying the gradient with some constant factor.

{{ loadData(path="/static/media/lab/neural-networks/.txt") }} <!-- graph and line on top; on bottom —> separate 2d graphs for slope and intercept on left — red/othcolor line indicated slope — highlight portion of slope determined by learning rate; and combined 3d (coloured 2d topography map) on right — red/othcolor double headed-arrows indicating direction and magnitude of gradient; button to show/hide precalculated graphs -->

The parameter values are continuously updated until a minima is found. The constant factor determines how big the steps should be to reach a minima — indirectly serving as the rate for arriving at the minima. Smaller rates mean results in more iterations to reach a minima; bigger rates results in sometimes overshooting past the minima.

{{ loadData(path="/static/media/lab/neural-networks/.txt") }} <!-- graph and line on top; on bottom —> separate 2d graphs for slope and intercept on left — red/othcolor line indicated slope — highlight portion of slope determined by learning rate; and combined 3d (coloured 2d topography map) on right — red/othcolor double headed-arrows indicating direction and magnitude of gradient; button to show/hide precalculated graphs; animate show iterations -->

{% tangent(summary="Minima", open=true) %}
A [minima](https://en.wikipedia.org/wiki/Maximum_and_minimum#/media/File:Extrema_example_original.svg) is a point in a function where its value is lower than its neighboring points. Since the cost function is convex, finding the point with lowest cost (global minima) is guaranteed.
{% end %}

By finding the slope and intercept values that minimizes the cost, the line ends up being a good estimator for the dataset.

### Multidimensional Data

The current model uses a line as an estimator to find the best fit between an input and an output variable. However the line is just a visual representation of the estimator. What the line signifies is more important — the relationship between the input and output. That relationship is described by the slope and intercept. The slope determines how much the input influences the output, or in other words, the **weight** it holds. Similarly the intercept determines how skewed or **biased** the result is, irrespective of the input.

Instead of representing the current model as a line with a slope and intercept, it can also be represented using only the weights and biases, describing the output as function of a weighted input and a bias.

{{ loadData(path="/static/media/lab/neural-networks/.txt") }} <!-- show graph on top; neurons (1 weight + 1 bias) on bottom; changing weight changes line stroke-width -->

The new representation does away with the cartesian plane, and uses raw weights and biases to illustrate the relationship between the inputs and outputs. This has certain strengths and weaknesses. First, it emphasizes the correlation between the input and the ouptut — how much the inputs affect the ouptut. Second, it can represent multiple input and output variables without needing to visualize higher dimensional spaces.

{{ loadData(path="/static/media/lab/neural-networks/.txt") }} <!-- show graph on top; neurons on bottom; stop showing graph if exceeding 2 weight neurons or output neurons; button for add input -->

However, this neural-graph representation does not show the data (points) and instead only shows the relationship between the inputs and outputs. Without a line and data points, it becomes much harder to gauge the accuracy of the model, at least intuitively.

{{ loadData(path="/static/media/lab/neural-networks/.txt") }} <!-- DO NOT show graph on top; neurons on bottom; button for add input -->

For a single input-output variable dataset represented using a two dimensional space, it is relatively easy to identify patterns in the data — and then using that instinct to verify if the model (line) fits the data. But for data with multiple input-output variables, higher dimensions are required to represent the data. It is very difficult to even imagine a space higher than three dimensions, let alone find patterns in it.

Instead of relying on visual intuition to assess the accuracy of a model, the accuracy can be calculated as was done earlier — by averaging the distance between the data (points) and the estimator. This is an acceptable solution, but there is no way to know if the model finds the best fit for the data — at least not directly.

{{ loadData(path="/static/media/lab/neural-networks/.txt") }} <!-- coloured bar (like a fuel bar) on right for showing cost for given parameter -->

A way to test if the model finds a good fit for the data is by calculating the cost using unseen data If the cost is low even for unseen data points, then the model is most likely to have found an accurate estimator that fits the data well.

{{ loadData(path="/static/media/lab/neural-networks/.txt") }} <!-- coloured bar (like a fuel bar) on right for showing cost for given parameter -->

{% tangent(summary="Test dataset requirements", open=false) %}
It should be obvious that the unseen test data must have the same characteristics as the original dataset. If the test dataset does not have the same distribution as the original dataset, the cost would not be a correct representation of the estimator's accuracy.
{% end %}

Finding an accurate estimator for multidimensional data can again be done via gradient descent. The principles are the same: Finding the gradient at some point, using the gradient information to update the weights and bias, and repeating the process until a minima is found.

{{ loadData(path="/static/media/lab/neural-networks/.txt") }} <!-- coloured bar (like a fuel bar) on right for showing cost for given parameter -->

## Nonlinear Regression

Again consider a simple dataset. Circle datapoints.

Using more layers, we can model more complex non-linear estimators.

### Backpropagation

Again.

#### Chain Rule

How each layer effects the neuron in the next layer.

Matrices are another way to compactly represent the connections between the neurons.

## Classification

Finding patterns

## Manifold Hypothesis

Just finding feature patterns accross higher dimensions, when trying to reduce the cost. Maybe it generalizes, maybe it memorizes. To know for sure: model interpretability — making sense of the weights and how each feature affect the output and each other. Hard to do, using just weight information and why neural networks are notoriously known as black boxes.

According to the [manifold hypothesis](https://en.wikipedia.org/wiki/Manifold_hypothesis), not only does data have correlations across some higher dimensions, the correlations appear across a much [smaller dimensional space](https://en.wikipedia.org/wiki/Latent_space) — the other dimensions does not have much effect on the output.

## Convolutions

The same argument goes for image data. Images {apparently} have some structure across some higher dimensions. Neural networks can be used for extracting those correlations (features).

Fully-connected layer first.

However, restricting the connections can make the model more efficient and accurate. The hypothesis is features appear locally, so restricting it to local — [inductive biases](https://en.wikipedia.org/wiki/Inductive_bias).

Is called a convolution.

{% tangent(summary="Convolution and Correlation", open=true) %}
Is technically a [correlation](https://en.wikipedia.org/wiki/Cross-correlation) instead of a [convolution](https://en.wikipedia.org/wiki/Convolution#/media/File:Comparison_convolution_correlation.svg).
{% end %}

## Visual Transfomers

Transformers are another neural network architecture that allows to selectively focus on which input is more likely recently. While the inductive bias in CNNs was helpful, it can also be a liability at times. 

---

## References

* Colour scheme:
    * Cost — Acton (light-pink, dark-purple)
    * Weights, Biases — (pos-Blue, neg-Orange)
