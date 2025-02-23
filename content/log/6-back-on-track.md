+++
title = "Back on Track"
description = "It's time to speed up."
date = 2025-02-23
draft = false
template = "article.html"
[extra]
type = "article"
thumbnail = "log.6.running.avif"
thumbnailalt = "Doodle of a person running towards the right."
+++

Title is clickbait. When I say back on track, it is something closer to this:

![doodle of a person strapped to a railway track](/media/log/on-track.avif)

Thing is, everything was indeed going as planned. The server is up and running, and the frontend for it looks and works decent. The main roadblock turned out to be my college ISP. I was expecting a few issues, but nothing fundamentally unfix-able (or unhack-able). Turned out not to be the case.

## PBMBDB v0.2

About some changes first. I changed the structure for storing the top elements — instead of a min-heap, I am using an unsorted array and just tracking the minimum count. This makes the insertions scale in linear time instead of being log-linear (although in practice the difference is almost negligible). Also, I went with [FNV-1A](https://en.wikipedia.org/wiki/Fowler–Noll–Vo_hash_function) for hashing — it is much simpler and faster, and still retains a satisfactory unifom distribution. I also calculate only a single hash and break it into separate parts to simulate multiple hashes. A big speedup for a slight increase in collisions and a very slight degradation in precision.

For data serialization, I originally wanted to go with [protobuf](https://en.wikipedia.org/wiki/Protocol_Buffers) because of its size and performance. But later, I realized it would just add more dependencies I don't want. In the future I might reconsider it if it becomes a bottleneck. However right now, I have an even bigger issue: The college internet service provider.

## Derailing Hard

Turns out my college ISP uses NAT, and my server is behind it. In hindsight it should have been pretty obvious. Anyhow, it means that I cannot have a simple DNS (or even a DDNS) setup for the API endpoints — it will be inaccessible. While I can use a tunneling service, it would mean shelling out $$$. An ugly workaround is to send requests from the server to another deivce and track the TCP source port and use that information for the API endpoint. But that is too unreliable and too ugly for my liking.

So what now? Imagine you are in a race; you are the hare. You take a nap just before the finish line and let the tortoise beat you. What now? Do you give up? No. You pretend it was all part of the plan. You pretend that your nap was intentional, and that the race was just an act to symbolize that underdogs can win too.

That's what I am doing as well.

![doodle of cool person explaining the bug is actually a feature](/media/log/feature-not-bug.avif)

I am simply rebranding the project. Instead of allowing anyone to post, it is exclusively for the people in my college. Early Facebook style. Except the project is really basic, and serves no other purpose than being a fun little ~~social network~~ social experiment. It [should be up](/lab/free-speech) in a few hours.

Until I find the right way to get it working for the wider internet, my DNS record just points to the LAN IP of the Raspberry Pi I am running the server on. And anyway once I get back home, I should be able to connect it to my home router (IPv6, no NAT non-sense). But that will take a few months ¯\\\_(\'\_\')\_/¯.

That's all. Cya next week.
