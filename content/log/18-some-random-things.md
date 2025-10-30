+++
title = "Some Random Things"
description = "Posting on a random Thursday?"
date = 2025-10-31
draft = false
template = "article.html"
[extra]
type = "article"
thumbnail = "log.18.dice.avif"
thumbnailalt = "Doodle of two dice being rolled."
+++

Yes, updates are slowing shifting towards the end of the month, but I think it makes more sense this way. The posts can then (for me) act as a reflection of what I've done for the month. Or that is what I would have said if the posts actually were logs of what I got done for the month. Lately I have been wanting to post about things I find midly interesting, instead of mundane things-that-I-got-done. Things that are too short and simple for [Lab](/lab), but interesting enough that I want to write about it.

One of those things is how a random uniform distribution changes when transformed by different operators. I made some simple visualizations to get a feel of how they transform the uniform distribution to something less uniform:

<canvas id="canvasDistributions"></canvas>

The random numbers are sampled from a [uniform distribution](https://en.wikipedia.org/wiki/Continuous_uniform_distribution). They are equally likely to get small numbers, big numbers, and everything in between. The first square shows cells with just the random numbers — the uniform distribution. Adding random numbers to random numbers changes the uniform distribution to a one that approaches a [Gaussian distribution](https://en.wikipedia.org/wiki/Normal_distribution), because of [CLT](https://en.wikipedia.org/wiki/Central_limit_theorem) since the random numbers are [IID](https://en.wikipedia.org/wiki/Independent_and_identically_distributed_random_variables). For division, small denominators distort the distribution because probability for denominator P(X < x) scales linearly but quotients scales hyperbolically — so bigger numbers are disproportionately more unlikely. In multiplication too, the probability of the factors scale linearly, but products scale superlinearly, so the probability of products scales sublinearly. That is, bigger numbers are, again, disproportionately less likely.

The unary operators are simpler to understand: The square root scales bigger numbers slower than smaller numbers — smaller numbers 'grow more' after the transformation, so small numbers are increasinsly less probable. The logarithm is similar, but it grows even slower, so the effect is even more pronounced. The maximum of two random numbers similarly skews values towards larger numbers — the probability linearly increases as the size of numbers increase.

For the comparator, the distribution is a [bernoulli distribution](https://en.wikipedia.org/wiki/Bernoulli_distribution) with P(X = True | Y = y) = y. But 𝔼[Y] = 0.5, so P(X = True) = 0.5. That is, the uniform distribution collapses to 1 (True) or 0 (False) in a 50-50 split. The modulo is also simple: The probability a number is big P(X > x) scales linearly, but since the result is reduced by the modulus, the result is only big (P(Y > y)) if the modulus is also big. So similar to multiplicaiton, the distribution skews towards smaller values.

Anyhow, pretty interesting stuff. I explored [littlewood polynomials](https://en.wikipedia.org/wiki/Littlewood_polynomial) a bit as well. Dragon curves showing up in the fractal pattern was interesting, and the reason they do is pretty neat. Also read about [helicopter money](https://en.wikipedia.org/wiki/Helicopter_money). Not as neat, but equally as interesting. 

![brief description of helipcopter money explained using a doodles - a cartoonish central bank giving away free money](/media/log/free-money.avif)

I am thinking about writing less about journal-y posts in Log, and write about more about short, random, interesting topics. Maybe future Log posts will reflect this. Maybe this is the general direction Log is heading towards. I don't know; I might start doing more stuff and start writing about them more frequently once I'm done with college in a few weeks. Or maybe I will get even lesser time once I start working. We'll see.

Speaking of work, I got a job offer that I **have** to accept — not because of a weak market for new grads (it is pretty bad out there though), but because of how the system works in my college. TLDR: Companies visit and offer jobs, and you have to accept the first offer that you receive. It is basically solving the assignment problem using FCFS. Not the most optimal, but it is what it is. Anyhow I got lucky, and got a job I'm satisfied with.

![doodle of a person offering a job after a horrible interview answer](/media/log/hired.avif)

Been a slow month otherwise. Cya next month.

<script>
{{ loadData(path="/scripts/18-some-random-things.js") }}
</script>
