+++
title = "Spotify Wrapped"
description = "Analyzing and visualizing six years of Spotify data."
date = 2024-12-13
weight = 5
draft = true
template = "article.html"
[extra]
type = "article"
thumbnail = "lab.spotify.svg"
thumbnailalt = "Spotify logo amidst green bubbles."
+++

This is another one of the more experimental posts.

Spotify annually releases [Spotify Wrapped](https://en.wikipedia.org/wiki/Spotify_Wrapped) — a visual compilation of user listening data for the calendar year (roughly). My biggest gripe with it is that it does not show data from previous years. I like being able to see how my music tastes have evolved over the years rather than just the current year.

So I manually downloaded all my data, and had a go at visualising it myself using [D3](https://d3js.org/). The source is [available here](INSERT_LINK_CHECK_PLS).

{{ loadData(path="/media/lab/spotify-wrapped/data-viz.txt") }}

Personally, I think the [calendar plot](https://observablehq.com/@d3/calendar/2) is more data dense and gives deeper insights than listing top artists and top songs of the year. But there's also disadvantages  — the most obvious being that it will not scale well at all for smaller screens.
