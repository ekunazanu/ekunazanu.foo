+++
title = "Probabilistic Data Structures"
description = "A brief about bloom filters, count-min sketches, and HyperLogLog."
date = 2024-09-28
weight = 1
draft = true
template = "article.html"
[extra]
type = "article"
thumbnail = "lab.die.svg"
thumbnailalt = "Die face showing five dots."
+++

Probabilistic data structures are what their names suggest — they are [data structures](https://en.wikipedia.org/wiki/Data_structure) that give probabilisitic answers to queries. What is lost in [precision](https://en.wikipedia.org/wiki/Accuracy_and_precision#/media/File:Accuracy_and_precision.svg) however, is more than made up for in extremely efficient use of memory and/or computational resources.

## Hashing

A hash function is simply a mathematical function that maps an input to an output. In practice however, the output of hash functions have certain properties:

* **Deterministic** — Hash functions produce the same output for the same input.
* **Fixed Length** — For any input, most hash functions produce a fixed length output.
* **Pseudorandom** — Most hash functions produce a hash that is [pseudorandom](https://en.wikipedia.org/wiki/Pseudorandomness); hash outputs appear and behave random, but are ultimately deterministic.
* **One-Way** — For most hash functions, it is difficult to determine the input just from the output. This is useful for [cryptographic applications](https://en.wikipedia.org/wiki/Cryptographic_hash_function); this is not necessarily useful for probabilistic data structrues.
* **Collision Resistant** — Despite having fixed length ouputs, hash functions are designed to minimize cases where two inputs output the same hash. Collisions are not impossible however, because of the [limited output space](https://en.wikipedia.org/wiki/Pigeonhole_principle).

Some of these properties are immensely useful and form the basis of most probabilistic data structures.

<input id="hashBoxInput" value="hello"> <button id="hashBoxButton">Hash</button><br>
Hash: <code id="hashBoxOutput">044</code>

## Bloom Filters

Bloom filters are one of the most popular probabilistic data structures, that are used to check for membership in sets or multisets. In simpler words, bloom filters are used to check if an element is present in a set or not. Bloom filters cannot identify if an element exists in a set with absolute certainty, but it can report with certainty if it does **not** exist in a set. And it does it for big datasets using very little space.

### Approaches

Rather than outright disclosing how bloom filters work, it is much more effective to discuss possible solutions first. It will help build a natural intuition as to why bloom filters are a better approach — at least when accuracy is not a big priority.

Consider these elements:

<div class="setContainer" id="setContainerStatic"></div>

We need to know if `hello` is in the multiset. One possible solution is to store the entire multiset, and then performing a [linear search](https://en.wikipedia.org/wiki/Linear_search) — going through each element one-by-one and checking if it exists.

<div class="setContainer" id="setContainerLinear"></div>
<input id="setInputLinear" value="hello"> <button id="setButtonLinear">Search</button>
<div id="setOutputLinear">&nbsp;</div>

Or if you've studied computer science, the multiset can be sorted in [lexicographic order](https://en.wikipedia.org/wiki/Lexicographic_order) and then a [binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm) can be performed.

<div class="setContainer" id="setContainerBinary"></div>
<input id="setInputBinary" value="hello"> <button id="setButtonBinary">Search</button>
<div id="setOutputBinary">&nbsp;</div>

That makes querying faster, but a lot of space is still needed to store all the elements. It can be optimized on that front. One way to reduce the space used could be by storing only the unique values and purging all the duplicates:

<div class="setContainer" id="setContainerUnique"></div>
<input id="setInputUnique" value="hello"> <button id="setButtonUnique">Search</button>
<div id="setOutputUnique">&nbsp;</div>

But the space required will still scale linearly with the number of elements and the size of each element. What if, instead of storing all the individual elements, only the hashes of the elements are stored instead? In this case, we will need to search for `044` — the hash for `hello`.

<div class="setContainer" id="setContainerHashes"></div>
<input id="setInputHashes" value="hello"> <button id="setButtonHashes">Search</button><br>
Hash: <code id="setOutputHashesHash">044</code>&nbsp;<span id="setOutputHashes"></span>

Using hashes is arguably better than storing individual long variable-length elements. But it can be optimized even further. Since most hashing functions always produce a fixed length output for any input, it can be exploited to decrease the amount of space needed to store the hashes even more.

The above hash function produces an output between `0` and `255`. Instead of allocating arrays to store all the individual hashes, a [bit-array](https://en.wikipedia.org/wiki/Bit_array) of size of 256-bits can be created to represent the existing hashes. All the bits are initially set to zero. and a bit is set to one, if its corresponding hash is in the set.

<canvas id="bfCanvasCompare"></canvas>

For example if the output hash is `044`, the 44th bit is flipped to one.

<canvas id="bfCanvasAdd"></canvas>
<input id="bfInputAdd" value="hello"> <button id="bfButtonAdd">Add</button><br>
Hash: <code id="bfOutputAddHash">044</code> <span id="bfOutputAddMessage"></span>

{% tangent(summary="Bit ordinality", open=false) %}
The n-th bit is in reference to a [zero based indexing](https://en.wikipedia.org/wiki/Zero-based_numbering) system. Because the range of the hash is from 0 to 255, instead of from 1 to 256, the 'first' bit is considered as the 0-th bit and the ordinality of all the bits are considered as one lesser than their 'actual' ordinality. 
{% end %}

It should be obvious that using a bit-array is analogous to storing the hash itself. But while in the previous approach multiple bits were needed to store the individual hashes, the new bit-array approach requires only one bit per hash.

And this is what a bloom filter is. It is fundamentally a bit-array, where a bit corresponds to an individual hash output — and that hash output correspondings to an element (or more elements) in a set. The only difference is that multiple hash functions are used in bloom filters to minimize collisions.

### Querying

It is apparent that checking for membership of an element simply involves verifying if the hash exists — checking if the corresponding bit in the bit-array is set to one. So to query an element: It is first hashed, and then the bit in the bit-array corresponding to the hash is assessed to see if it is set (to one).

<canvas id="bfCanvasQuery"></canvas>
<input id="bfInputQuery" value="hello"> <button id="bfButtonQuery">Search</button><br>
Hash: <code id="bfOutputQueryHash">044</code> <span id="bfOutputQueryMessage"></span>

### Hash Collisions

While hash functions are designed to be collision resistant, they are not collision proof. Sometimes two elements may have the same hash. In such cases, an element that was added may have the same hash as a different element being queried, leading to a false positive.

For example, `hello` having the hash `044` is added in the bloom filter. Another word, `foo` might have the same hash `044`. If the bloom filter is queried for `foo`, it would wrongly report that `foo` exists in the set since the 44th bit in the bit-array is already set to one by a different word — `hello`.

<canvas id="bfCanvasCollision"></canvas>
<input id="bfInputCollisionAdd" value="hello"> <button id="bfButtonCollisionAdd">Add</button><br>
<input id="bfInputCollisionQuery" value="foo"> <button id="bfButtonCollisionQuery">Search</button><br>
Hash: <code id="bfOutputCollisionHash">044</code> <span id="bfOutputCollisionMessage"></span>

To reduce the probability of collisions, multiple hash functions can be used for each element. In that case, querying an element will return true only if **all** bits corresponding to the hashes are one.

The probability of two elements having the same hash outputs is `1/m` where `m` is the size of the bloom filter. However, if two hash functions are used for every element, the probability of two elements having the same hash outputs is roughly `1/m * 1/m`. In general, using more hashing functions exponentially decreases the probability that **all** the hash outputs of two elements will collide.

<canvas id="bfCanvasMultiple"></canvas>
<input id="bfInputMultipleAdd" value="hello"> <button id="bfButtonMultipleAdd">Add</button><br>
<input id="bfInputMultipleQuery" value="hello"> <button id="bfButtonMutlipleQuery">Search</button><br>
Hashes: <code id="bfOutputMultipleHash">044</code> <span id="bfOutputMultipleMessage"></span>

{% tangent(summary="Universal hashing", open=true) %}
The assumption is that the output of the hash functions are randomly distributed and are not correlated to each other. In other words, the hash functions should be selected from a [universal family](https://en.wikipedia.org/wiki/Universal_hashing), and ideally be [pairwise indepenedent](https://en.wikipedia.org/wiki/Pairwise_independence).
{% end %}

However using too many hashing functions can also increase the false positive rate. It might feel counterintuitive, especially right after showing it *decreases* false positives, but consider this: The bloom filter is finite. The more the number of hash functions, the higher the probability that it fills up quickly and most bits are set to one. When querying from a bloom filter where most bits are set to one, the higher the probability that any query results in a positive — even if the element is not in the set.

<canvas id="bfCanvasSaturated"></canvas>
<input id="bfInputSaturatedAdd" value="hello"> <button id="bfButtonSaturatedAdd">Add</button><br>
<input id="bfInputSaturatedQuery" value="hello"> <button id="bfButtonSaturatedQuery">Search</button><br>
Hashes: <code id="bfOutputSaturatedHash">044</code> <span id="bfOutputSaturatedMessage"></span>

In the extreme case when all the bits in a bloom filter are set to one, the bloom filter would **always** report positive for membership — regardless of whether the element actually exists in the set.

Other than using a large number of hashing functions, a bloom filter can also be quickly saturated if the number elements to be hashed (added) is huge. The only solution to decreasing the number of false positives then, is by increasing the size of the bloom filter itself. Increasing the size of the bloom filter bit-array equates to a larger output space for the hash functions, reducing the probability for collisions.

{{ loadData(path="/static/media/lab/probabilistic-data-structures/bitarray-bf-collision-sizes-small-big.txt") }}

Thus the false positive rate is also dependent on the size of the bloom filter and the number of (unique) elements to be added.

### Space Efficiency

Thus, the false positive rate depends on the number of hash functions used per element, the number of elements hashed/added, and the size of the bloom filter. Conversely, the size of the bloom filter and the ideal number of hash functions depends on the tolerance for false positives and the number elements to be added.

More precisely, the [optimal size for a bloom filter](https://en.wikipedia.org/wiki/Bloom_filter#Optimal_number_of_hash_functions) is `-2.08·ln(p)·n` bits, where `p` is the tolerance for the false positive rate and `n` is the number of unique elements one expects to observe. The [optimal number of hash functions](https://en.wikipedia.org/wiki/Bloom_filter#Optimal_number_of_hash_functions) is `ln(2)·(m/n)`, where `m` is the size of the bloom filter and `n` is the number of expected elements. Thomas Hurst visualizes how the factors affect each other in his [bloom filter calculator](https://hur.st/bloomfilter/).

### Deletion

Deletions can be achieved by unsetting the bits corresponding to the hash of the element to be deleted, to zero. But if one of the bits was previously set by some different element, then checking membership for that element would lead to a false negative.

{{ loadData(path="/static/media/lab/probabilistic-data-structures/bitarray-bf-deletion.txt") }}

The general consensus is to forbid deletions in bloom filters to remove the possibility of getting false negatives.

## Count-Min Sketch

A count-min sketch is a probabilisitc data structure that calculates the maximum occurences of elements in a set. It is what a bloom filter would have been if it was a frequency table instead.

### Counting Bloom Filter

Count-min sketches are very similar to bloom filters, so it's helpful to start off with a bloom filter.

{{ loadData(path="/static/media/lab/probabilistic-data-structures/bitarray-cbf-one-bit.txt") }}

Instead of using one bit per hash, what if a few more bits per hash were used instead?

{{ loadData(path="/static/media/lab/probabilistic-data-structures/bitarray-cbf-four-bits.txt") }}

A way to utilize the extra bits is use it as 'counters' to store information about frequency. The bit-counter can be incremented by one whenever a hash (and therefore, an element) is added. This expands the ability of the array from being able to only store information about the **existence** of an element to store information about its **frequency** as well.

{{ loadData(path="/static/media/lab/probabilistic-data-structures/bitarray-cbf-increment-frequency.txt") }}

The array on top is a bloom filter, used for querying membership. The one below that is a counting bloom filter which helps us query frequency information as well.

In a counting bloom filter, the counter for the hash of an element is incremented when an element is added. However the counters can [overflow](https://en.wikipedia.org/wiki/Integer_overflow) and reset back to zero, leading to wrong estimates. This is not a big issue however, since even thirty-two bits per counter is enough for storing frequency estimates up to roughly four billion.

### Hash Collisions

The other (and more susceptible) way error seeps through in the estimates is via hash collisions. Sometimes two elements will map to the same hash, increasing the count of the other element. This means elements can be over-counted. However there is no way for elements to be under-counted (barring overflows).

{{ loadData(path="/static/media/lab/probabilistic-data-structures/bitarray-cbf-collisions.txt") }}

To reduce errors, approaches used in bloom filters can be applied: By increasing the size of the array, and using multiple hash functions. The solutions might look plausible on the surface because of the counting bloom filter's similiarities to a bloom filter, but that is not the case — or at least, it is not that simple.

The first solution is pretty easy to verify. Increasing the size of the array increases the range of the hash functions, reducing collisions — regardless of the number of hashing functions used. The reasoning is similar to bloom filters, discussed above.

{{ loadData(path="/static/media/lab/probabilistic-data-structures/bitarray-cbf-collisions-sizes-big-small.txt") }}

Similar to bloom filters, when querying using multiple hash functions per element, the intersection of all the counters and using the minimum value of all the counters is used. Since collisions only cause elements to be over-counted, the minimum estimate is the closest to the true frequency.

{{ loadData(path="/static/media/lab/probabilistic-data-structures/bitarray-cbf-collisions-multiple-hashes.txt") }}

It might seem that it using multiple hash functions would reduce errors similar to bloom filters. However when it comes to increasing the number of hash functions, it does not decrease errors — in fact it actually leads to slightly higher errors.

{{ loadData(path="/static/media/lab/probabilistic-data-structures/bitarray-cbf-collisions-saturation-over-count.txt") }}

It's important to mention that in both bloom filters and counting bloom filters, increasing the number of hash functions per element increases the probability of a collision. But in the case of bloom filters, any hash collision did not change the value of a bit in the bloom filter itself — it would be set to one regardless. In fact hash collisions [decrease overall error](https://stackoverflow.com/a/72509014) by preventing the bloom filter from getting saturated too quickly.

{{ loadData(path="/static/media/lab/probabilistic-data-structures/bitarray-cbf-bf-comparison-bf.txt") }}

Compare that to a counting bloom filter, where every collision increases the value of the counter by one. In the case of a single hash function being used, a counter would get incremented by one. However if multiple hash functions are used, the probability when an element with multiple hash functions would map to the same counter is non-zero. Adding an element to the sketch would then increment the counter by more than one. And worse, the probability of over-counting an element only increases as the number of hash functions per element increases.

{{ loadData(path="/static/media/lab/probabilistic-data-structures/bitarray-cbf-bf-comparison-cbf.txt") }}

The solution to reducing errors then would be to increase the size of the array and to stick to using a single hash function. And while that is acceptable, there are better ways to go about it.

### Separate Hash Ranges

There is an upside in using multiple hash functions — while querying the frequency of an element, it gets expenontially less probable that the **all** hashes of **one** element will collide. The downside to using more hash functions is that it increases **overall** collisions, which leads to over-counting and less precise estimates.

A simple way to resolve the downside is by assigning the ouput of each hash function to separate output spaces. This prevents from collisions between hash functions. That is, while collisions from different elements having the same hashes are possible, collisions between different hash functions are now impossible.

{{ loadData(path="/static/media/lab/probabilistic-data-structures/bitarray-cbf-separate-range.txt") }}

The resulting data structure is a count-min sketch. It can also be thought of as a two dimensional array with `w` columns and `d` rows — where `d` is the total number of hash functions and `w` is the range for the hash outputs. Each hash function outputs to their respective row, and the hash functions are again assumed to be pairwise independent.

{{ loadData(path="/static/media/lab/probabilistic-data-structures/bitarray-cms.txt") }}

The count-min sketch is capable of answering more than simple frequency queries. It can also respond to [range and inner-product queries](https://cs.stanford.edu/~rishig/courses/ref/l12b.pdf#page=5).

### Space efficiency

Similar to bloom filters, the space required by a count-min depends on [the tolerance for error and the number of elements to be hashed](http://dimacs.rutgers.edu/~graham/pubs/papers/cmsoft.pdf). The optimal width of the array `w` is `2n/ε` and depth `d` is `log(δ)/log(1/2)` — where `n` is the number of elements, `ε` defines the bounds for frequency estimates, and `δ` is the probability the estimates exceeds those bounds.

## HyperLogLog

HyperLogLog is another probabilistic data structure, used to approximate the cardinality, or total number of distinct elements in a multiset. It relies on the pseudorandomness of the hashes as its basis to calculate the cardinality of a multiset.

### Probability

Consider this thought expirement: Take a few coins where each coin has an equal probability of landing on heads or tails and toss them all at once. The probability that the first coin is heads is half, or one in `2`. The probability that both the first and second coin are heads is one in `4`. The probability that all three first coins are heads is one in `8`. In general, for all the first `n` coins to be heads, the probability is one in `2^n`.

{{ loadData(path="/static/media/lab/probabilistic-data-structures/coins-probability.txt") }}

Alternatively, the coins need to be tossed roughly `2^n` times to observe `n` consecutive heads at the beginning of the coin array.

{{ loadData(path="/static/media/lab/probabilistic-data-structures/coins-frequency.txt") }}

Conversely, if shown `n` consecutive heads, it can be estimated that the coins were tossed roughly `2^n` times.

{{ loadData(path="/static/media/lab/probabilistic-data-structures/coins-estimate.txt") }}

The maximum number of consecutive heads returns a rough estimate for the number of times the coins were tossed.

This is the fundamental principle behind HyperLogLog. Coins are replaced with bits — a hash function is chosen such that output is pseudorandom. Each bit of the hash acts as an unbiased coin — having an equal probability of being `0` or `1`. The total number of elements can be estimated using the length of the longest run of consecutive zeroes of their hashes.

{{ loadData(path="/static/media/lab/probabilistic-data-structures/bitarray-hll.txt") }}

Since hashes are deterministic, duplicate elements will yield the same hashes and would not affect the cardinality calculation. So HyperLogLog estimates the number of **distinct** elements in a multiset.

### Weakness

There is a glaring flaw in this approach however. The gaps between the approximations double every time an extra consecutive zero is observed — it can only provide estimates that are powers of two, and nothing in between. Second, a hash output may have a lot of consecutive zeros at the beginning simply owing to chance, causing the estimate to be wildly off and beyond the true cardinality.

To mitigate these problems, multiple counters can be used that store the longest run of zeroes for different subsets of the multiset — instead of storing one counter that stores the longest run of zeroes for the entire multiset. The values can then be averaged to find a more [accurate](https://en.wikipedia.org/wiki/Accuracy_and_precision#/media/File:Accuracy_and_precision.svg) cardinality estimate.

### Buckets

A multiset is segregated into different subsets using '[buckets](https://en.wikipedia.org/wiki/Hash_table#/media/File:Hash_table_3_1_1_0_1_0_0_SP.svg)'. In HyperLogLog, a bucket is just a container for storing the length of the longest run of zeroes of hashes for some particular subset of elements. The first `b` bits of the hash of an element are reserved for selecting the bucket to update the values, and the remaining hash is used for finding the longest run of consecutive zeroes for that bucket.

{{ loadData(path="/static/media/lab/probabilistic-data-structures/bitarray-hll-buckets.txt") }}

Each bucket stores the longest run of zeroes for a subset of elements — which is used to compute the cardinality estimate for that bucket. Cardinality for the entire multiset can be calculated by finding the average of the individual estimates using the [harmonic mean](https://en.wikipedia.org/wiki/Harmonic_mean).

{{ loadData(path="/static/media/lab/probabilistic-data-structures/bitarray-hll-buckets-average.txt") }}

{% tangent(summary="Averaging using harmonic mean", open=true) %}
The harmonic mean is used for averaging because it reduces the influence of large outliers from affecting the estimate.
{% end %}

### Scaling and Discarding

There is a predictable [bias](https://www.moderndescartes.com/essays/hyperloglog/#loglog) towards the larger estimates, and scaling the final estimate by a correction factor that ranges from `0.673` to `0.709` results in estimates that are much closer to the true cardinality. [Research](https://dl.acm.org/doi/abs/10.1145/2452376.2452456) also shows that discarding the largest 30% of the values in the buckets before averaging can improve the accuracy of the estimates.

These corrective measures can bring down the error rate to `1.04/√m`, where `m` is the number of buckets.

This is HyperLogLog. Adding elements involves hashing them and storing their longest run of leading zeroes in buckets. To estimating the cardinality, the harmonic mean of the smallest 70% of values is taken and then scaled by a correction factor. 

{{ loadData(path="/static/media/lab/probabilistic-data-structures/bitarray-hll-complete.txt") }}

It is less acccurate when the number of elements are low, and becomes more accurate as the true cardinality grows.

### Space Efficiency

The only thing needed (to store) for calculating the cardinality are the buckets. So the total amount of space required is the number of buckets times the size of each bucket. The number of buckets depends on the degree of accuracy required — the error rate is inversely proportional to the sqaure root of quantity of buckets. More buckets lead to more accurate estimates and vice versa.

The largest number that can be stored in each bucket before it overflows depends on its size. A five-bit bucket can store numbers from zero to thirty-one. A hash with thirty-one leading zeroes in a hash suggests roughly two billion unique elements were hashed. So to store cardinalities of up to two billion unique elements, the size of each bucket needs to be only five bits. To store cardinality of `n` unique elements, the size of each bucket needs to be `log(log(n))` bits. That is also where its name comes from.

{{ loadData(path="/static/media/lab/probabilistic-data-structures/bitarray-hll-space.txt") }}

For example, HyperLogLog is able to estimate cardinalities of more than a billion unique elements with an an error of 2% using 2500 five-bit buckets — only 1.5 kB of memory. Or alternatively, just 0.25 kB for an error of 5% using 400 buckets.

## Other Data Structures

There are lots of other probabilistic data structures that trade accuracy for efficiency. In addition to bloom filters, both [cuckoo filters](https://en.wikipedia.org/wiki/Cuckoo_filter) or [quotient filers](https://en.wikipedia.org/wiki/Quotient_filter) are useful probabilistic data structures used for membership queries. Or [linear counting](https://doi.org/10.1145/78922.78925), which is used for estimating distinct elements — but the underlying principle is similar to bloom filters. Rank can be approximated using [t-digests](https://doi.org/10.48550/arXiv.1902.04023), or [KLL sketches](https://doi.org/10.48550/arXiv.1603.05346), and similarities can be estimated using [LSH](https://en.wikipedia.org/wiki/Locality-sensitive_hashing), [MinHash](https://en.wikipedia.org/wiki/MinHash), and [SimHash](https://doi.org/10.1145/509907.509965). There's a lot of other resources online to know more about the different kinds of probabilisitc data structures that exist.

---

## References

* Florian Hartmann: [Bloom Filters](https://florian.github.io/bloom-filters/)
* Eric Crahen: [Count-Min Sketching, Configuration & Point-Queries](https://crahen.github.io/algorithm/stream/count-min-sketch-point-query.html)
* Engineering at Meta: [HyperLogLog in Presto: A significantly faster way to handle cardinality estimation](https://engineering.fb.com/2018/12/13/data-infrastructure/hyperloglog/)
* Cheng-Wei Hu: [HyperLogLog: A Simple but Powerful Algorithm for Data Scientists](https://chengweihu.com/hyperloglog/)

<script src="/media/lab/probabilistic-data-structures.js"></script>
<style>
.setContainer {font: normal 0.875rem var(--monospace); line-height: 1.25rem; overflow: auto; padding: 1rem; margin: 1rem 0rem; border: 1px solid var(--fg);}
.highlight {font-weight: 800;}
.found {font-weight: 800; background-color: var(--green);
</style>
