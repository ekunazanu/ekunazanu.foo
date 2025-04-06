+++
title = "Diffusion and Denoising"
description = "Learning about statistics and diffusion models."
date = 2025-04-06
draft = false
template = "article.html"
[extra]
type = "article"
thumbnail = "log.12.distribution.avif"
thumbnailalt = "Doodle of a normal distribution."
+++

Did I learn about network protocols? No. Was I was bedridden this week? Yes. That is my justification. Nah, but I did learn a lot about diffusion models.

I think diffusion models are the most convincing arguments for the [manifold hypothesis](https://en.wikipedia.org/wiki/Manifold_hypothesis), along with [VAEs](https://en.wikipedia.org/wiki/Variational_autoencoder). But in a way, diffusion models are also autoencoders, just with non-parameterized encoding. But then, they can also be considered just [autoregression in the frequency domain](https://sander.ai/2024/09/02/spectral-autoregression.html). Either way, diffusion models are powerful for how simple they are.

Okay, the theory behind diffusion models is 'simple' if you already know some statistics and probability theory. From a high level, diffusion models simply denoise data — by predicting the mean of the distribution to get structured data. The encoder part gradually adds random noise to the data and the decoder is trained to remove this noise.

![a distribution transformed to a Gaussian distribution and then back to a similar distribution](/media/log/diffusion-distribution.avif)

Assume x is some structured data with some distribution. This is gradually corrupted by shifting its mean and adding noise: z = (1-β)x + β·ϵ, where ϵ is a random variable sampled from a standard normal distribution N(0, 1). In other words, z ~ N((1-β)x, β). This is done iteratively, adding small noise over multiple steps — well, the forward encoding process is actually done in a single step as the normal distribution is simply reparameterized. The decoding process however *does* use multiple iterations.

As said, the encoding will result in a new PDF given by q(z<sub>t</sub> | z<sub>t-1</sub>) = N((1-β)·z<sub>t</sub>, b), and when it is done in a single iteration till some final step T, then q(z<sub>T</sub> | x) = N(α·x, 1-α) where α is the products of 1−β<sub>t</sub>. That is, α = Π[1 − β<sub>t</sub>] — the new distribution parameter.

The decoder is slightly more complicated. Like other models, the goal is to minimize the negative-log-likelihood of the function. The decoder PDF must be the inverse of the encoder: q(z<sub>t-1</sub> | z<sub>t</sub>). And when performed iteratively until t = 0, we should get something similar to the original distribution x. A way to get q(z<sub>t-1</sub> | z<sub>t</sub>) from q(z<sub>t</sub> | z<sub>t-1</sub>) is via Bayes' Theorem: q(z<sub>t-1</sub> | z<sub>t</sub>) = q(z<sub>t</sub> | z<sub>t-1</sub>) · q(z<sub>t-1</sub>) / q(z<sub>t</sub>). But this is marginal probability for all x. To be more accurate: q(z<sub>t</sub> | z<sub>t-1</sub>, x) · q(z<sub>t-1</sub>, x) / q(z<sub>t</sub> | x).

There's some more clever rearranging that results in a easy-to-backpropagate lower bound from which the model is trained to maximize the probability of q(z<sub>t-1</sub> | z<sub>t</sub>). I am not completely confident of how the calculations works out, so I won't spew non-sense here. I need to learn more about statistics.

But it is still magical that this is enough to create structured distributions from pure noise. Even complicated structured data like images. In fact, diffusion models are common in the generative image space — so common that it feels like they are half of the images on the internet now. I don't mind generative art, but I also hope for a world where human art thrives, and art and IP rights are respected.

![a doodle with ghibli colors of a portrait of a person in a forest surrounded by flowers](/media/log/me-ghibli.avif)

So, networking protocols and operating systems this week? Perhaps. I am also changing the upload schedule to monthly posts now, because (b)logging weekly is dragging down my productivity rather than improving it. Who would have thought.

Cya next month.
