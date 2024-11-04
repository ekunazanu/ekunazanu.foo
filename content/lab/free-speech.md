+++
title = "Free Speech"
description = "Visualising frequently used words when given a choice to speak (somewhat) freely."
date = 2025-04-28
weight = 8
draft = true
template = "article.html"
[extra]
type = "article"
thumbnail = "lab.words.svg"
thumbnailalt = "A messy word-cloud filled with random words."
+++

This is another experimental post. Arguably more 'experimental' than the previous ones.

It is a visualisation of the most common words — when people are asked to say something. Anything. The setup is quite simple. I place a Pi in public, to do some speech recognition and then send the word updates to a database. This page then fetches and renders that data. The hardest challenge was not related to code. It was making sure that the Pi did not get stolen.

Here are the results. In real time.

{{ loadData(path="/static/media/lab/free-speech/data-viz-cloud.txt") }}

{{ loadData(path="/static/media/lab/free-speech/data-viz-bars.txt") }}

Since it is a do-it-for-the-heck-of-it kind of experiment, the sample space is quite small. It includes random people from the streets of Guwahati and Bangalore. It also includes contributions from people on the internet, who happen to come across this page and add to the count — whether legitimately, or by DDoSing it. But that cohort is quite small as of right now.

If you want to add words as a part of the legitimate online demographic, feel free to.

{{ loadData(path="/static/media/lab/free-speech/add-words.txt") }}

<!--
Use Pi Zero 2W or Pi 3B for the social experiment. Visualise using a word cloud, and bar chart for the same data below (using D3?) Heatmap for most usage using calendar plot — but zoomed on for a few months. Link for raw data at the bottom. Pi sends new data every 30 minutes. Set up an API-architecture. Github Pages requests API to fetch json. JSON API served by Pi.
-->
