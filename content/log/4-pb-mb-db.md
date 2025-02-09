+++
title = "PB MB DB"
description = "Designing a probabilistic database in under an MB, sort of."
date = 2025-02-09
draft = false
template = "article.html"
[extra]
type = "article"
thumbnail = "log.4.pigeonhole.avif"
thumbnailalt = "Doodle showing the pigeonhole principle."
+++

I didn't get much work done this week; I was busy with my filmmaking classes. I watched movies all week ~~as part of my course~~. I definitely wasn't just procrastinating.

Okay, maybe I was.

![doodle of a person saying tomorrow for a week](/media/log/doodle-procrastinating.avif)

But just because I did not code much does not mean I did not get anything done.

I created a design for a very simple database, for the next project. Well it is a database if you *really* stretch the definition of a database. Data can be added and queried, but it cannot be modified. This might seem like a very idiotic limitation, but I see it as precision engineering — removing (u)necessary features. So what is the purpose of this restrictive database? Storing counts for items. Possibly millions of items. While using just a single mebibyte. Okay, maybe a few bits over a mebibyte.

You'll see why modifying counts is not really necessary (and perhaps, even a little disingenuous), once the project is up and running. And as for why should the size of the database be limited to a mebibyte? Well, why not? It makes the project a whole lot more interesting.

## Sketches

Okay, a few things first. The only way I am getting this database down to a mebibyte is by using a sketch of the data instead of dealing with the actual data. This makes things a lot easier, but will cost precision. So much for precision engineering. Anyway, I am also pretty sure the data will have a highly skewed [Zipfian distribution](https://en.wikipedia.org/wiki/Zipf%27s_law). So a [count-min sketch](/lab/probabilistic-data-structures#Count-Min_Sketch) should do fine. Hopefully this priori holds, otherwise the precision will be abysmal.

I am also pretty sure that the count will easily exceed billions for the heavy hitters, so 32-bit counters won't do, but 64-bits should be plenty enough. Now a count-min sketch guarantees that the estimate will exceed by ε|A| with probability at most δ — where |A| is the [L1 norm](https://en.wikipedia.org/wiki/Norm_(mathematics)) of the stream — for a sketch with width w = e/ε and depth d = ln(1/δ). That is, for a sketch with depth ln(1/δ) and width e/ε, the error will remain bounded by ε times the size of the input stream with a probability at least 1 - δ.

A count-min sketch of dimensions 32768 x 4 with 64-bit counters will use 32768 * 4 * 8 bytes — exactly a mebibyte. With d = 4, the probability of **NOT** overestimating the count by ε|A| is about 98%. Nice. However, ε|A| itself is huge as the norm of A is likely in the billions. But the input data stream is likely to follow a Zipfian distribution. Then the space required scales a bit differently — O(ε^(-1/z) * ln(1/δ)) — where z is the Zipf distribution parameter. Rearranging in terms of ε, the error scales by w^(-z) instead of e/w. So, even at z ≈ 2, the error bound decreases from a million to less than ten. Beautiful.

Now, multiplicity estimation uses exactly one mebibyte. Goal achieved. But as mentioned earlier, the database is slightly over a mebibyte. A few extra bits are reserved for some nice-to-haves — 2048B for cardinality estimation, 2048B for rank estimation and another 2048B to store the top 16 elements.

The cardinality estimation is done via [HyperLogLog](/lab/probabilistic-data-structures#HyperLogLog) with 97.7% accuracy. The top items are stored on a min-heap, using the count-min sketch and principles from [Misra–Gries summaries](https://en.wikipedia.org/wiki/Misra%E2%80%93Gries_summary) for selection of elements. I am estimating ranks using a custom data structure loosely based on t-digest. Elements are selected at random, and their multiplicities are sorted and stored to create a simple distribution sketch. The rank is then calculated using cardinality estimates from HyperLogLog and by interpolating between the values from the distribution sketch. I am not good at math to prove guarantees for error bounds, but I will try tweaking it to get at least 98% accuracy.

![a distribution sketch estimated using hyperloglog, count-min sketch and arrays of random estimates](/media/log/hll-rank.avif)

This brings the total size of the 'database' to 1054720 bytes — 1.01MB. Sweet. Can I add more features? Yes. Will feature creep set in? Very likely. So no features. It is not because I am lazy. I am very much not. Really.

Now, is it a real database? Well the transactions are atomic and consistent, and there is (complete) isolation and and durability. So perhaps? I don't know, you decide. Either way, cya next week — hopefully by then, I will have actually built it.
