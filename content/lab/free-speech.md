+++
title = "Free Speech"
description = "Visualizing frequent word submissions."
weight = 8
draft = false
template = "article.html"
[extra]
type = "article"
thumbnail = "lab.words.svg"
thumbnailalt = "A messy word-cloud filled with random words."
+++

This is another experimental post. Arguably more 'experimental' than the previous ones.

<canvas id="canvasTop"></canvas>
<button id="buttonRefreshTop">Refresh</button>

This is simply the list of all the words submitted here. Everything gets added; nothing is censored. While this project did not feel like a novel idea, I could not find anything similar surprisingly.

Anyway, you can add to the dataset too.

<input id="inputWords" placeholder="Add any word"><button id="buttonAdd">Add</button><button id="buttonRefreshDist">Refresh</button>
<canvas id="canvasDistribution"></canvas>
<div id="infoDistribution"></div>

The entire database is only a single mebibyte big and so it uses a few [nice tricks](/log/4-pb-mb-db) to store the data. This however means the data is 'only' around 98% accurate.

<script>
{{ loadData(path="/scripts/free-speech.js") }}
</script>
