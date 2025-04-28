+++
title = "Probabilistic Data Structures"
description = "A primer on Bloom Filters, Count-min Sketch, and HyperLogLog."
weight = 1
draft = false
template = "article.html"
[extra]
type = "article"
thumbnail = "lab.die.svg"
thumbnailalt = "A die showing the face with five dots."
+++

Probabilistic data structures are what their names suggest — these are [data structures](https://en.wikipedia.org/wiki/Data_structure) that give probabilistic answers to queries. What is lost in [precision](https://en.wikipedia.org/wiki/Accuracy_and_precision#/media/File:Accuracy_and_precision.svg) however, is more than made up for in extremely efficient use of memory and/or computational resources.

## Hashing

A hash function is simply a mathematical function that maps an input to an output. In practice however, the output of hash functions have certain properties:

* **Deterministic** — Hash functions produce the same output for the same input.
* **Fixed Length** — For any input, most hash functions produce a fixed length output.
* **Pseudorandom** — Most hash functions produce a hash that is [pseudorandom](https://en.wikipedia.org/wiki/Pseudorandomness); hash outputs appear and behave random, but are ultimately deterministic.
* **One-Way** — For most hash functions, it is difficult to determine the input just from the output. This is useful for [cryptographic applications](https://en.wikipedia.org/wiki/Cryptographic_hash_function); this is not necessarily useful for probabilistic data structures.
* **Collision Resistant** — Despite having fixed length outputs, hash functions are designed to minimize cases where two inputs output the same hash. Collisions are not impossible however, because of the [limited output space](https://en.wikipedia.org/wiki/Pigeonhole_principle).

<input id="hashBoxInput" value="hello"><button id="hashBoxButton">Hash</button><br>
Hash: <code id="hashBoxOutput">44</code>

Some of these properties form the basis for most probabilistic data structures.

## Bloom Filters

Bloom filters are one of the most popular probabilistic data structures. These are used to check for membership in sets or multisets — or in simpler words, they are used to check if an element is present in a set or not. Bloom filters cannot predict the membership of an element with absolute certainty, but it can report with certainty if it does **not** exist in a set. And it does it for big datasets using very little space.

### Approaches

Rather than outright disclosing how bloom filters work, it is much more effective to discuss possible solutions first. It will help build a natural intuition as to why bloom filters are a better approach — at least when accuracy is not a big priority.

Consider these elements:

<div class="setContainer" id="setContainerStatic"></div>

We need to know if `hello` is in the multiset. One possible solution is to store the entire multiset, and then performing a [linear search](https://en.wikipedia.org/wiki/Linear_search) — going through each element one-by-one and checking if it exists.

<div class="setContainer" id="setContainerLinear"></div>
<input id="setInputLinear" value="hello"><button id="setButtonLinear">Search</button><br>
<span id="setOutputLinear">Element state unknown.</span>

Or if you've studied computer science, the multiset can be stored in [lexicographic order](https://en.wikipedia.org/wiki/Lexicographic_order) and then a [binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm) can be performed.

<div class="setContainer" id="setContainerBinary"></div>
<input id="setInputBinary" value="hello"><button id="setButtonBinary">Search</button><br>
<span id="setOutputBinary">Element state unknown.</span>

That makes querying faster, but the space required to store the elements remains the same. One way to reduce the space used could be by storing only the unique values and purging all the duplicates. Rephrased formally, the multiset can be made into a set:

<div class="setContainer" id="setContainerUnique"></div>
<input id="setInputUnique" value="hello"><button id="setButtonUnique">Search</button><br>
<span id="setOutputUnique">Element state unknown.</span>

While this is a decent solution, it can be made better. The space required is roughly dependent on the number of elements, and the size of each element. What if, instead of storing all the individual elements, only the hashes of the elements are stored instead? In this case, we will need to search for `44` — the hash for `hello`.

<div class="setContainer" id="setContainerHashes"></div>
<input id="setInputHashes" value="hello"><button id="setButtonHashes">Search</button><br>
Hash: <code id="setOutputHashesHash">44</code>&nbsp;<span id="setOutputHashes">Element state unknown.</span>

Using hashes is arguably better than storing individual long variable-length elements. But it can be optimized even further. Since most hashing functions always produce a fixed length output for any input, it can be exploited to decrease the amount of space needed to store the hashes even more.

The above hash function produces an output between `0` and `255`. Instead of allocating arrays to store all the individual hashes, a [bit-array](https://en.wikipedia.org/wiki/Bit_array) of size of 256-bits can be created to represent the existing hashes. All the bits are initially set to zero. A bit is set to one only if its corresponding hash is in the set.

<canvas id="bfCanvasCompare"></canvas>

For example if the output hash is `44`, the 44th bit is flipped to one.

<canvas id="bfCanvasAdd"></canvas>
<input id="bfInputAdd" value="hello"><button id="bfButtonAdd">Add</button><br>
Hash: <code id="bfOutputAddHash">44</code> <span id="bfOutputAddMessage"></span>

{% tangent(summary="Bit ordinality", open=false) %}
The n-th bit is in reference to a [zero based indexing](https://en.wikipedia.org/wiki/Zero-based_numbering) system. Because the range of the hash is from 0 to 255, instead of from 1 to 256, the 'first' bit is considered as the 0-th bit and the ordinality of all the bits are considered as one lesser than their 'actual' ordinality. 
{% end %}

It should be obvious that using a bit-array is analogous to storing the hash itself. But while in the previous approach multiple bits were needed to store the individual hashes, the new bit-array approach requires only one bit per hash.

This is what a bloom filter is. It is fundamentally a bit-array, where a bit corresponds to an individual hash output — and that hash output corresponds to an element (or more) in the set. But in 'real' bloom filters, multiple hash functions are used. More about why that is, is discussed later.

### Queries

It is apparent that checking for membership of an element simply involves verifying if the hash exists — checking if the corresponding bit in the bit-array is set to one. So to query an element: It is first hashed, and then the bit corresponding to its hash is checked to see if it is set (to one).

<canvas id="bfCanvasQuery"></canvas>
<input id="bfInputQuery" value="hello"><button id="bfButtonQuery">Search</button><br>
Hash: <code id="bfOutputQueryHash">44</code> <span id="bfOutputQueryMessage"></span>

### Hash Collisions

While hash functions are designed to be collision resistant, they are not collision proof. Sometimes two elements may have the same hash. In such cases, an element that was added may have the same hash as a different element being queried, leading to a false positive.

For example, `hello` having the hash `44` is added in the bloom filter. Another word, `foo` might have the same hash `44`. If the bloom filter is queried for `foo`, it would wrongly report that `foo` exists in the set since the 44th bit in the bit-array is already set to one by a different word — `hello`.

<canvas id="bfCanvasCollision"></canvas>
<input id="bfInputCollisionAdd" value="hello"><button id="bfButtonCollisionAdd">Add</button><br>
<input id="bfInputCollisionQuery" value="foo"><button id="bfButtonCollisionQuery">Search</button><br>
Hash: <code id="bfOutputCollisionHash">44</code> <span id="bfOutputCollisionMessage"></span>

To reduce the probability of collisions, multiple hash functions can be used for each element. In that case, querying an element will return true only if **all** bits corresponding to the hashes are one.

<canvas id="bfCanvasMultiple"></canvas>
<input id="bfInputMultipleAdd" value="hello"><button id="bfButtonMultipleAdd">Add</button><br>
<input id="bfInputMultipleQuery" value="foo"><button id="bfButtonMutlipleQuery">Search</button><br>
<input id="bfInputMultipleSlider" type="range"><br>
Hash depth: <span id="bfOutputMultipleHashDepth">3</span><br>
Hash: <code id="bfOutputMultipleHash">44, 242, 77</code> <span id="bfOutputMultipleMessage"></span>

{% tangent(summary="Universal hashing", open=false) %}
The hash depth refers to the number of hash functions used. The output of the hash functions should be randomly distributed and should not be correlated to each other. Formally, the hash functions should be selected from a [universal family](https://en.wikipedia.org/wiki/Universal_hashing), and should ideally be [pairwise independent](https://en.wikipedia.org/wiki/Pairwise_independence). These assumptions are used when calculating the probability of collisions when using multiple hash functions.
{% end %}

The probability of two elements having the same hash outputs is `1/m` where `m` is the size of the bloom filter. However, if two hash functions are used for every element, the probability of two elements having the same hash outputs is roughly `1/m * 1/m`. In general, using more hashing functions exponentially decreases the probability that **all** the hash outputs of two elements will collide.

However using too many hashing functions can also increase the false positive rate. It might feel counter-intuitive, especially right after showing it *decreases* false positives, but consider this: The bloom filter is finite. The more the number of hash functions, the higher the probability that it fills up quickly and most bits are set to one. When querying from a bloom filter where most bits are set to one, the higher the probability that *any* query results in a positive — even if the element is not in the set.

In the extreme case when all the bits in a bloom filter are set to one, the bloom filter would **always** report positive for membership — regardless of whether the element actually exists in the set.

<canvas id="bfCanvasSaturated"></canvas>
<input id="bfInputSaturatedQuery" value="foo"><button id="bfButtonSaturatedQuery">Search</button><br>
Hash: <code id="bfOutputSaturatedHash">44, 38, 180</code> <span id="bfOutputSaturatedMessage"></span>

Other than using a large number of hashing functions, a bloom filter can also be quickly saturated if the number elements to be hashed (added) is huge. The only solution to decreasing the number of false positives then, is by increasing the size of the bloom filter itself. Increasing the size of the bloom filter bit-array equates to a larger output space for the hash functions, reducing the probability for collisions.

<canvas id="bfCanvasBigger"></canvas>
<input id="bfInputBiggerAdd" value="hello"><button id="bfButtonBiggerAdd">Add</button><button id="bfButtonBiggerAddRandom">Add Random</button><br>
<span style="display: none" id="bfOutputBiggerMessage"></span>
<code style="display:none" id="bfOutputBiggerHash"></code> <!-- acts as /dev/null -->

In effect, the false positive rate is also dependent on the **size of the bloom filter** and the **number of (unique) elements** to be added.

### Space Efficiency

The false positive rate depends on the number of hash functions used per element, the number of elements hashed/added, and the size of the bloom filter. Conversely, the size of the bloom filter and the ideal number of hash functions depends on the tolerance for false positives and the number elements to be added.

More precisely, the [optimal size for a bloom filter](https://en.wikipedia.org/wiki/Bloom_filter#Optimal_number_of_hash_functions) is `-2.08·ln(p)·n` bits, where `p` is the tolerance for the false positive rate and `n` is the number of unique elements one expects to observe. The [optimal number of hash functions](https://en.wikipedia.org/wiki/Bloom_filter#Optimal_number_of_hash_functions) is `ln(2)·(m/n)`, where `m` is the size of the bloom filter and `n` is the number of expected elements. Thomas Hurst visualizes how the factors affect each other in his [bloom filter calculator](https://hur.st/bloomfilter/).

### Deletion

Deletions can be achieved by unsetting the bits corresponding to the hash of the element to be deleted, to zero. But if one of the bits was previously set by some different element, then checking membership for that element would lead to a false negative.

<canvas id="bfCanvasDeletion"></canvas>
<input id="bfInputDeletionAdd" value="hello"><button id="bfButtonDeletionAdd">Add</button><br>
<input id="bfInputDeletionRemove" value="foo"><button id="bfButtonDeletionRemove">Remove</button><br>
<input id="bfInputDeletionQuery" value="hello"><button id="bfButtonDeletionQuery">Search</button><br>
Hash: <code id="bfOutputDeletionHash">44, 242, 77</code> <span id="bfOutputDeletionMessage"></span><br>

The general consensus is to forbid deletions in bloom filters to remove the possibility of getting false negatives.

## Count-Min Sketch

A count-min sketch is a probabilistic data structure that calculates the multiplicity (the number of occurrences) of elements in a multiset. It is what a bloom filter would have been if it was a frequency table instead.

### Counting Bloom Filter

Count-min sketches are very similar to bloom filters, so it's helpful to start off with a bloom filter.

<canvas id="bfCanvasCounting"></canvas>
<input id="bfInputCountingAdd" value="hello"><button id="bfButtonCountingAdd">Add</button><br>
<input id="bfInputCountingQuery" value="hello"><button id="bfButtonCountingQuery">Search</button><br>
Hash: <code id="bfOutputCountingHash">44, 242, 77</code> <span id="bfOutputCountingMessage"></span><br>

Now, instead of using one bit per hash, what if a few more bits (per hash) were used?

<canvas id="cmsCanvasComparisonStatic"></canvas>

A way to utilize the extra bits is by using them as 'counters' to store information about frequency — the bit-counter can be incremented by one whenever a hash (an element) is added. This expands the ability of the array from being able to only store information about the **existence** of an element to store information about its **frequency** as well.

<canvas id="cmsCanvasComparison"></canvas>
<input id="cmsInputComparisonAdd" value="hello"><button id="cmsButtonComparisonAdd">Add</button><br>
<input id="cmsInputComparisonQuery" value="hello"><button id="cmsButtonComparisonQuery">Search</button><br>
Hash: <code id="cmsOutputComparisonHash">44, 242, 77</code><br>
Bloom Filter: <span id="cmsOutputComparisonMessage">-</span><br>
Counting Bloom Filter: <span id="cmsOutputComparisonValues">-</span><br>

The array on top is a bloom filter, which only only be used for binary queries — that is, whether it exists or not. The array below the bloom filter is a counting bloom filter which can give slightly richer information in the form of frequency estimates.

Hash collisions are again possible in counting bloom filters, which increase the counters of other elements. The frequency of an element is calculated by taking the minimum of the values in the hash counters to minimize the overestimation. However, as there is no way to under-count, the minimum of the values is the necessarily the upper bound of the estimate — the true frequency is guaranteed to be equal or lower than the estimate.

As an example, try adding both `hello` and `foo` and notice how the 44th counter is affected. The counter increases to two. If the 44th counter is the only counter used for calculating the estimate, it would over-count the frequency of both elements. However, using more hashes and counters can decrease the probability of over-counting — but only when the minimum of the counters is used for estimation.

<canvas id="cmsCanvasMain"></canvas>
<input id="cmsInputMainAdd" value="hello"><button id="cmsButtonMainAdd">Add</button><br>
<input id="cmsInputMainQuery" value="hello"><button id="cmsButtonMainQuery">Search</button><br>
Hash: <code id="cmsOutputMainHash">44, 242, 77</code><br>
Counters: <span id="cmsOutputMainValues">0, 0, 0</span><br>
Frequency estimate: <span id="cmsOutputMainEstimate">0</span>
<span id="cmsOutputMainMessage" style="display: none"></span>

The only possible way counters can under-count is when they [overflow](https://en.wikipedia.org/wiki/Integer_overflow) and reset back to zero. Here, four bits are used per hash so the counter will overflow when the count exceeds fifteen. This is not a big issue however, since the number of bits per counter can easily be increased a little — even thirty-two bits for each counter is enough for storing frequency estimates up to more than four billion.

### Hash Collisions

To reduce over-counting, hash collisions should be reduced. Two approaches used in bloom filters can be applied: By increasing the size of the array, and using multiple hash functions. The solutions might look plausible on the surface because of the counting bloom filter's similarities to a bloom filter, but that is not the case — or at least, it is not that simple.

The first solution is easy to verify and is intuitive to follow. Increasing the size of the array increases the range of the hash functions, reducing collisions. Just like bloom filters, discussed above. The second approach however, does reduce errors. In fact it leads to *slightly* higher errors.

It's important to mention that in both bloom filters and counting bloom filters, increasing the number of hash functions per element increases the probability of a collision. But in the case of bloom filters, any hash collision did not change the value of a bit in the bloom filter itself — it would be set to one regardless. In fact hash collisions [decrease overall error](https://stackoverflow.com/a/72509014) by preventing the bloom filter from getting saturated too quickly.

Compare that to a counting bloom filter, where every collision increases the value of the counter by one. Having more hashing function increases the probability of collisions, and therefore, over-counting. The probability of over-counting an element only increases as the number of hash functions per element increases.

Notice how collisions do not affect the bits that are already set in the bloom filter, but affects the bits of the counting bloom filter:

<canvas id="cmsCanvasComparisonErrors"></canvas>
<input id="cmsInputComparisonErrorsAdd" value="hello"><button id="cmsButtonComparisonErrorsAdd">Add</button><br>
<code style="display: none" id="cmsOutputComparisonErrorsHash">44, 242, 77</code>
<span style="display: none" id="cmsOutputComparisonErrorsMessage">&nbsp;</span>
<span style="display: none" id="cmsOutputComparisonErrorsValues">0, 0, 0</span>
<input id="cmsInputComparisonErrorsSlider" type="range"><br>
Hash depth: <span id="cmsOutputComparisonErrorsHashDepth">32</span><br>

The solution to reducing errors then would be to increase the size of the array and to minimize the number hash functions. And while that is acceptable, there are better ways to go about it.

### Disjoint Hash Ranges

There is an upside in using multiple hash functions — while querying the frequency of an element, it gets exponentially less probable that the **all** hashes of **one** element will collide. The downside to using more hash functions is that it increases **overall** collisions, which leads to over-counting and less precise estimates.

A simple way to resolve the downside is by assigning the output of each hash function to separate output spaces. This prevents from collisions between hash functions. That is, while collisions from different elements having the same hashes are possible, collisions between different hash functions are now impossible.

<canvas id="cmsCanvasDifferentRange"></canvas>

The resulting data structure is a count-min sketch. It can also be thought of as a two dimensional array with `w` columns and `d` rows — where `d` is the total number of hash functions and `w` is the range for the hash outputs. Each hash function outputs to their respective row, and the hash functions are again assumed to be pairwise independent.

Here, the count-min sketch is thirty two counters wide and eight hashes deep.

<canvas id="cmsCanvasSketch"></canvas>
<input id="cmsInputSketchAdd" value="hello"><button id="cmsButtonSketchAdd">Add</button><br>
<input id="cmsInputSketchQuery" value="hello"><button id="cmsButtonSketchQuery">Search</button><br>
Hash: <code id="cmsOutputSketchHash">12, 50, 77, 122, 159, 176, 195, 238</code><br>
Counters: <span id="cmsOutputSketchValues">0, 0, 0, 0, 0, 0, 0, 0</span><br>
Frequency estimate: <span id="cmsOutputSketchEstimate">0</span><br>
<span id="cmsOutputSketchMessage" style="display: none"></span>

The count-min sketch is capable of answering more than simple frequency queries. It can also respond to [range and inner-product queries](https://cs.stanford.edu/~rishig/courses/ref/l12b.pdf#page=5).

### Space Efficiency

Similar to bloom filters, the space required by a count-min sketch depends on [the tolerance for error and the number of expected elements](http://dimacs.rutgers.edu/~graham/pubs/papers/cmsoft.pdf#page=4). The optimal width of the array `w` is `2n/ε` and depth `d` is `log(δ)/log(1/2)` — where `n` is the number of total elements, `ε` defines the bounds for collisions, and `δ` is the probability the estimates exceeds those bounds.

## HyperLogLog

HyperLogLog is another probabilistic data structure, used to approximate the cardinality (or total number of distinct elements) of a multiset. It is different from a bloom filter and a count-min sketch, and relies on the pseudorandomness of hash functions to estimate cardinalities.

### Probability

Consider this thought experiment: Take a few coins where each coin has an equal probability of landing on heads or tails, and toss them all at once. The probability that the first coin is heads is half, or 1/2. The probability that both the first and second coin are heads is 1/4. The probability that all the first three first coins are heads is 1/8. In general, the probability that the first n coins are heads is one in 2^n.

<canvas id="hllCanvasCoinProbability"></canvas>

Phrased alternatively, roughly 2^n total tosses are required to observe a maximum of n consecutive leading heads at the beginning of the coin array.

<canvas id="hllCanvasCoinObservation"></canvas>
Leading heads: <span id="hllOutputCoinObservationZeros">0</span><br>
Max. leading heads: <span id="hllOutputCoinObservationZerosMax">0</span><br>
Total tosses: <span id="hllOutputCoinObservationTosses">0</span><br>
<button id="hllButtonCoinObservationToss">Toss coins</button><button id="hllButtonCoinObservationReset">Reset count</button>

Conversely, if shown n consecutive heads at the beginning of the sequence, it can be estimated that the coins were tossed roughly 2^n times.

<canvas id="hllCanvasCoinEstimation"></canvas>
Leading heads: <span id="hllOutputCoinEstimationZeros">0</span><br>
Max. leading heads: <span id="hllOutputCoinEstimationZerosMax">0</span><br>
Estimated tosses: <span id="hllOutputCoinEstimationEstimate">0</span><br>
Total tosses: <span id="hllOutputCoinEstimationTosses">0</span><br>
<button id="hllButtonCoinEstimationToss">Toss coins</button><button id="hllButtonCoinEstimationReset">Reset count</button>

The maximum number of consecutive leading heads provides a rough estimate for the number of times the coins were tossed.

This is the fundamental principle behind HyperLogLog. Coins are replaced with bits — a hash function is chosen such that output is pseudorandom. Then each bit of the hash acts as an unbiased coin, having an equal probability of being 0 or 1. Analogous to the total number of tosses, the total number of elements can be estimated using the longest run of consecutive leading zeroes of their hashes.

<canvas id="hllCanvasBits"></canvas>
Leading zeros: <span id="hllOutputBitsZeros">0</span><br>
Max. leading zeros: <span id="hllOutputBitsZerosMax">0</span><br>
Estimated cardinality: <span id="hllOutputBitsEstimate">0</span><br>
Actual cardinality: <span id="hllOutputBitsCardinality">0</span><br>
<input id="hllInputBitsAdd" value="hello"><button id="hllButtonBitsAdd">Add</button><br>
<button id="hllButtonBitsRandom">Add random</button><button id="hllButtonBitsReset">Reset count</button>

Since hashes are deterministic, duplicate elements will yield the same hashes and would not affect the cardinality calculation. So HyperLogLog estimates the number of **distinct** elements in a multiset.

### Limitations

There is a glaring flaw in this approach however. The gaps between the approximations double every time an extra consecutive zero is observed — it can only provide estimates that are powers of two, and nothing in between. Second, a hash output may have a lot of consecutive zeros at the beginning simply owing to chance, skewing the estimate.

To mitigate these problems, multiple counters that store the longest run of zeroes for different subsets of the multiset can be used — instead of storing one counter that stores the longest run of zeroes for the entire multiset. The values can then be averaged to find a more precise cardinality estimate.

### Buckets

A multiset is segregated into different subsets using '[buckets](https://en.wikipedia.org/wiki/Hash_table#/media/File:Hash_table_3_1_1_0_1_0_0_SP.svg)'. In HyperLogLog, a bucket is just a counter for storing the length of the longest run of zeroes of hashes for some particular subset of elements. The first `b` bits of the hash of an element are reserved for selecting the bucket, and the remaining bits are used for finding the leading zeros. The number of leading zeroes are then used to compute the cardinality estimate for that subset. Cardinality for the entire multiset can be calculated by finding the average of the individual estimates using the [harmonic mean](https://en.wikipedia.org/wiki/Harmonic_mean). 

Here, the bucket is chosen from the first four bits of the hash.

<canvas id="hllCanvasBucket"></canvas>
<canvas id="hllCanvasBucketCounters"></canvas>
Bucket: <span id="hllOutputBucketNumber">0</span><br>
Leading zeros: <span id="hllOutputBucketZeros">0</span><br>
Max. leading zeros: <span id="hllOutputBucketZerosMax">0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0</span><br>
Estimated cardinalities: <span id="hllOutputBucketEstimates">1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1</span><br>
Average estimate: <span id="hllOutputBucketMean">0</span><br>
Actual cardinality: <span id="hllOutputBucketCardinality">0</span><br>
<input id="hllInputBucketAdd" value="foo"><button id="hllButtonBucketAdd">Add</button><br>
<button id="hllButtonBucketRandom">Add random</button><button id="hllButtonBucketReset">Reset count</button>

{% tangent(summary="Averaging estimates", open=true) %}
The addition of new buckets 'spreads' the cardinality over all the buckets. However, the bucket quantity information is lost during averaging, and the estimates gets scaled down by the number of buckets. To counteract this, the harmonic mean is scaled by the number of buckets. That is, if there are `m` buckets, the estimate is `m * mean`.

The harmonic mean is used for averaging because it reduces the influence of large outliers and has shown to be more accurate.
{% end %}

However, even with the corrective measures, there is a [predictable bias](https://www.moderndescartes.com/essays/hyperloglog/#loglog) towards larger estimates. Scaling the average by a correction factor counteracts this bias. This brings down the [error](https://en.wikipedia.org/wiki/Standard_error) to 1.04/√m, where m is the number of buckets.

Thirty two buckets are used here, and so the standard error is approximately 0.18.

<canvas id="hllCanvasMain"></canvas>
<canvas id="hllCanvasMainCounters"></canvas>
Bucket: <span id="hllOutputMainNumber">0</span><br>
Leading zeros: <span id="hllOutputMainZeros">0</span><br>
<span style="display: none;" id="hllOutputMainZerosMax"></span>
<span style="display: none;" id="hllOutputMainEstimates"></span>
Average estimate: <span id="hllOutputMainMean">0</span><br>
Scaled estimate: <span id="hllOutputMainScaled">0</span><br>
Actual cardinality: <span id="hllOutputMainCardinality">0</span><br>
<input id="hllInputMainAdd" value="foo"><button id="hllButtonMainAdd">Add</button><br>
<button id="hllButtonMainRandom">Add random</button><button id="hllButtonMainReset">Reset count</button><br>
<button id="hllButtonMainRandomK">Add 500 random elements</button>

{% tangent(summary="Correction factor", open=true) %}
The correction factor ranges between 0.672 and 0.723, depending on the number of buckets. It is approximately equal to `0.723/(1+1.079/m)` where `m` is the number of buckets.
{% end %}

This is HyperLogLog. A very simple and elegant data structure that is also ridiculously efficient. Adding elements involves hashing them and storing their longest run of leading zeroes in buckets. Estimating the cardinality involves finding the harmonic mean of the estimates, scaled by the number of buckets and a correction factor.

### Space Efficiency

The only thing needed (to store) for calculating the cardinality are the buckets. So the total amount of space required is the number of buckets times the size of each bucket. The number of buckets depends on the degree of accuracy required — the error rate is inversely proportional to the square root of the number of buckets. More buckets lead to more accurate estimates and vice versa.

The size of each bucket depends on the largest number that must be stored in the bucket (before it overflows). A five-bit bucket can store numbers from zero to thirty-one. A hash with thirty-one leading zeroes in a hash suggests roughly two billion unique elements were hashed. So to store cardinalities of up to two billion unique elements, the size of each bucket only needs to be five bits. In general, to store cardinality of `n` unique elements, the size of each bucket needs to be `log(log(n))` bits. That is also where its name comes from.

<canvas id="hllCanvasLogSpace"></canvas>

For example, HyperLogLog is able to estimate cardinalities of more than a billion unique elements with an an error of 2% using 2500 five-bit buckets — only 1.5 kB of memory. Or alternatively, just 0.25 kB for an error of 5% using 400 buckets.

## Other Data Structures

There are lots of other probabilistic data structures that trade accuracy for efficiency. [Cuckoo filters](https://en.wikipedia.org/wiki/Cuckoo_filter) and [quotient filers](https://en.wikipedia.org/wiki/Quotient_filter) are probabilistic data structures used for membership queries, in addition to bloom filters. Estimating distinct elements can be done via [linear counting](https://doi.org/10.1145/78922.78925) — like HyperLogLog — but the underlying principle is similar to bloom filters. Rank can be approximated using [t-digests](https://doi.org/10.48550/arXiv.1902.04023), or [KLL sketches](https://doi.org/10.48550/arXiv.1603.05346). Similarities can be estimated using [LSH](https://en.wikipedia.org/wiki/Locality-sensitive_hashing), [MinHash](https://en.wikipedia.org/wiki/MinHash), and [SimHash](https://doi.org/10.1145/509907.509965).

There are other probabilistic data structures too, each with their own advantages and disadvantages. But the trade off is similar in all cases — precision for efficiency.

---

## References

* Florian Hartmann: [Bloom Filters](https://florian.github.io/bloom-filters/)
* Eric Crahen: [Count-Min Sketching, Configuration & Point-Queries](https://crahen.github.io/algorithm/stream/count-min-sketch-point-query.html)
* Engineering at Meta: [HyperLogLog in Presto: A significantly faster way to handle cardinality estimation](https://engineering.fb.com/2018/12/13/data-infrastructure/hyperloglog/)

<script>
{{ loadData(path="/scripts/probabilistic-data-structures.js") }}
</script>
<style>
.setContainer {font: normal 0.875rem var(--monospace); line-height: 1.25rem; overflow: auto; padding: 1rem; margin: 1rem 0rem; border: 0.0625rem solid var(--fg);}
.highlight {font-weight: 800;}
.found {font-weight: 800; background-color: var(--green);
</style>
