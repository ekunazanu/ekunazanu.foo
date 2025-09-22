+++
title = "Late and Latency"
description = "Things have been slow recently."
date = 2025-09-22
draft = false
template = "article.html"
[extra]
type = "article"
thumbnail = "log.17.ecg.avif"
thumbnailalt = "A rough doodle of an ECG graph."
+++

Okay I am making this post only because my classmate asked me to do it. The internet in our campus has been hot garbage lately, and he pointed out to me that it internet is only horrible on Firefox. I told him it was probably just selection bias. But I found the claim interesting enough that I came back to my room, and ran some ping tests. And of course, the spikes in latency existed independent of a browser.

<canvas id="canvasLatencyGraph0" aria-label="a chart showing an inconsitent ping latency, with time on x axis and latency on y axis" role="img"></canvas>

{% tangent(summary="Ping tests", open=true) %}
I just wrote a quick dirty script to store the start pings every thirty seconds, and log the start and end times, and latency values. Cleaned the data using some basic python, and visualized it by re-using code from another [lab post](/lab/quantifying-colour).

```
#!/bin/env sh

HOST="google.com"
WAIT=30
RUNS=60

while true; do
    START="$(date)"
    echo "start $START" > "$START.log" && ping -c $RUNS -i 1 $HOST &>> "$START.log" && echo "end $(date)" >> "$START.log" &
    sleep $WAIT
done
```
{% end %}

There are some big spikes whenever a new ping session begins. The number of people on campus increased by quite a lot recently, so maybe it's the ISP struggling to handle new demand? Or maybe intentional throttling? I don't know. But one thing was clear: The latency spikes and dropped packets happen the most frequently at the beginning of new 'connections'. I am not sure how ICMP works but I think it's pretty similar in how I have been experiencing it — starting new TCP connections aka. opening new tabs and sites feel ridiculously slow, but downloads and bandwidth is otherwise fine.

So if I could just route all connections via a single connection — ie. set up a tunnel — it should make the internet slightly less rage inducing. I already run a [tunnel via Cloudflare for my RPi server](/log/6-back-on-track/). I don't want to run a CF service running on my personal PC though. I already have a WireGuard config set up, and so all I need to go is turn that on.

<canvas id="canvasLatencyGraph1" aria-label="a chart showing consitent latency, with time on x axis and latency on y axis" role="img"></canvas>

Sure enough, with a WireGuard instance on, the average latency was slightly higher but no more spikes. And the difference in browsing experience was night and day. Told the 'hack' to the person who led me down this rabbit hole — asking him to use a VPN — and he could feel the differences so much that he was impressed and asked me to make a post on it.

![doodle of a person explaining to a surprised person that the solution was just using a vpn](/media/log/vpn-solution.avif)

In other news, the grind for jobs is going decent. Cleared the initial rounds for a couple of companies, but not good enough. Maybe I started a bit too late in my prep, but better late than never. The grind continues. The lambo dream lives on.

Cya next month.

<script>
{{ loadData(path="/scripts/17-late-and-latency.js") }}
</script>
