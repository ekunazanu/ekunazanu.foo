+++
title = "Spotify Wrapped"
description = "Analyzing and visualizing six years of Spotify data."
weight = 4
draft = true
template = "article.html"
[extra]
type = "article"
thumbnail = "lab.spotify.svg"
thumbnailalt = "Spotify logo amidst green bubbles."
+++

This is another one of the more experimental posts.

Spotify annually releases [Spotify Wrapped](https://en.wikipedia.org/wiki/Spotify_Wrapped) — a visual compilation of user listening data for the calendar year (roughly). My biggest gripe with it is that it does not show data from previous years. I like being able to see how my music tastes have evolved over the years rather than just the current year.

So I manually downloaded all my data, and had a go at visualising it myself using [D3](https://d3js.org/). The source is [available here](https://codeberg.org/ekunazanu/).

<div id="heatmap"></div>

Personally, I think the [calendar plot](https://observablehq.com/@d3/calendar/2) is more data dense and gives deeper insights than listing top artists and top songs of the year. But there's also disadvantages  — the most obvious being that it will not scale well at all for smaller screens.

<script type="module" src="/scripts/spotify-wrapped.js"></script>
<!-- <script src="https://d3js.org/d3.v7.min.js"></script> -->
<!-- <script type="module" src="/media/scripts/spotify-wrapped-d3.js"></script> -->

<!--
* Selection menu for:
    * Top Artists. Use similar color for similar artists — pehaps sorted by artist genre.
    On hover: Top 5 artists of day, based on:
        * Time listened
        * Number of times played
    Submenu for viewing certain top artist — time per day — same colors — below main selection menu.
    * Top Songs. Use similar color for similar songs — pehaps sorted by artist genre.
    On hover: Top 5 songs based on:
        * Time listened
        * Number of times played
    Submenu for viewing certain top song — time per day — same colors — below main selection menu.
    * Genre — Colorscale legend at the bottom, above the selection menu.
    On hover: Top 5 genres of day based on:
        * Genre breakdown for the day (proportional line chart — like a pie chart but using a line). Legend shown below
    * Mood — Colorscale legend at the bottom, above the selection menu. Blue for sad, orange for upbeat.
    On hover: Top 5 genres of day based on:
        * Moodiness score of top 5 songs for the day (based on time listened)
        * Number of sad songs listened on that day
        * Number of upbeat songs listened on that day
    * Times listened — Colorscale legend at the bottom, above the selection menu.
    On hover:
        * 24 dots arranged as (8-12 morning, 12-16 daytime, 16-20 evening, 20-0 night, 0-4 late night, 4-8 ultra late night) with same colors, signifying hours.
* Time per hour — Slider for selecting hour+an overall for the day option, above the selection menu. No hover if hour is selected.
* On hover show date regardless of menu option. Maybe use diving lines on date graph to differentiate months.
* https://observablehq.com/@observablehq/plot-calendar
* https://observablehq.com/framework/markdown#cards
-->
