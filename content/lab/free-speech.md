+++
title = "Free Speech"
description = "Visualising frequently used word submissions."
weight = 8
draft = true
template = "article.html"
[extra]
type = "article"
thumbnail = "lab.words.svg"
thumbnailalt = "A messy word-cloud filled with random words."
+++

This is another experimental post. Arguably more 'experimental' than the previous ones.

<canvas id="canvasChart"></canvas>
<button id="buttonSync">Sync</button>

It is simply a visualisation of the most common words submitted here. Everything gets added and nothing is censored. This project did not feel like a novel idea, but surprisingly I could not find anything similar.

Anyway, you can add to the statistics too.

<input id="inputWords"><button id="buttonAdd">Add</button><button id="buttonQuery">Query</button>

The data includes submissions from anyone who happened to visit this page and add to the count — whether legitimately, or by DoSing the API. Since the database needs to scale to arbitrarily large sizes, it uses some [nifty tricks](/lab/probabilistic-data-structures) to store the data. This means the data is 'only' 99% accurate however.

{% tangent(summary="Accuracy of the data", open=false) %}
The database does not store any individual word. Instead, it uses [HyperLogLog](https://en.wikipedia.org/wiki/HyperLogLog) for cardinality estimation, [t-digest](https://www.sciencedirect.com/science/article/pii/S2665963820300403) to estimate ranks, and a [count-mean sketch](https://webdocs.cs.ualberta.ca/~drafiei/papers/cmm.pdf) and [cuckoo heavy keeper](https://arxiv.org/abs/2412.12873) to calculate frequency estimates. The cardinality and rank estimate is 99% accurate. The frequency estimate for the top 10,000 elements is also 99% accurate. However, the frequency estimate for the other words is less than 99%, and may be higher than the true frequency.
{% end %}

<script src="/scripts/free-speech.js"></script>
<!-- Use Pi Zero 2W or Pi 3B for hosting. Visualise using a bar chart for the data (using just js canvas). Page send API request to fetch sketches and send updates. JSON API served by Pi -->
