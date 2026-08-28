+++
title = "When Axioms Break"
description = "Lots of events happening lately."
date = 2026-08-29
draft = false
template = "article.html"
[extra]
type = "article"
thumbnail = "log.20.fragile.avif"
thumbnailalt = "A doodle of a person staring at a suspiciously fragile structure."
+++

Hello there, it's been a while. I'll reward the patience by finally posting some real pictures and a more personal-ish post. This will come at a cost of fewer doodles though ;)

These last few months have been a roller coaster. But first, the usual updates: I wrote and submitted [another article](/lab/stream-ciphers) for [#SoME5](https://some.3b1b.co/), this year too. The entries this year felt a lot more polished than last year — maybe because it's community run this time, and there's less of a monetary incentive. But that's just *my* guess; I might be projecting.

Speaking of SoME, I have a feeling it has slightly increased the visibility of my posts. I say this because someone recently DDoS'ed [my free speech experiment](/lab/free-speech). I was expecting it to happen at some point. In fact, I was surprised that it took this long for it to happen, and more surprised that **only one** of the top words is a cussword. My conclusion: It has yet to reach the wider internet.

But I was most surprised at the fact that a decade-old Raspberry Pi was able to process all those 200K+ requests. While I did write the server to be as efficient and simple as possible, I did not expect it to handle this level of throughput — at least not gracefully. Oh well, I guess Golang and simplicity *go* a long way.

![a graph showing 200k+ requests](/media/log/ddos.avif)

And again, the requests were uncached, so it was definitely the old Pi that was handling them all. Maybe I should have added *some* observability to verify these claims. Nah, it's unnecessary bloat for a project whose goal is to be as [small and lean as possible](/log/04-pb-mb-db/).

I have been experimenting with [mechanistic interpretability](https://en.wikipedia.org/wiki/Mechanistic_interpretability) as well. Although progress on that has been *very* slow. The primary reasons being limited time and shifting priorities — I have to work for a living now, and hobbyist research does not pay the bills. Speaking of work, I finally know what it feels like being in corporate: You get to learn about workplace dynamics. Latency does not matter as much as visibility.

![photo of a typical workplace desk with doodles on the table](/media/log/life.work.avif)

Yes, I wear slides with socks to work. It is very comfortable, shut up. Also the doodles have escaped from my notebooks to my desk. Sometimes others would participate in the doodling as well (there's lots of markers around). Although there's still a long way to go in my mission of converting engineers into part-time-artists.

More things have happened over the last nine months. Some might even say I have had a bit of a rebirth. It all began with me finally moving away from the [guttastemning](https://redd.it/15nf9mw/) dorm environment. While I miss all the useless shenanigans my friends and I used to waste our time on, moving out of the fun-all-the-time place has been a nice change. I feel more like an adult. I have become financially responsible, I eat (relatively) healthy, sleep on time, pay taxes, and not cancel plans. I never expected that these things would ever become a flex, but here we are. My last-year-me would surprised, but proud.

The new place is okay and all, but one nice thing is that it has a private theater. It's pretty neat. I mostly use it for playing FIFA with my roommates though.

![photo of a private home theater](/media/log/life.theater.avif)

The other good thing about moving, is that now I live close to the city center. There's lots of good(ish) restaurants and good food around here. From what I've discovered, there is no strong correlation between the quality of the food and the general ambiance of the place. Besides restaurants, there are also a lot of parks nearby. All the restaurants and parks are only a five minute walk from where I stay. So naturally, I've been going a lot out more — solo strolls in parks, and casual dinners with friends and roommates.

![photo of some random half and half pizza](/media/log/life.pizza.avif)

The street food here is hit or miss. But there are so many options that it does not really matter. I have been here for a few months now, but there are still lots of places that I have yet to visit and rate their food.

<!-- I also went to college with my friends — for the last time. We were supposed to get a few signatures, but we (like idiots) ended up playing football, and didn't get any work done. So two days later, we had to go there again. This was the real, 'last' last time. We played football again, but we also got all the paperwork done this time. And then exchanged casual insults while not knowing when/if we'll meet again. We did hang out at a park the next day — followed by a customary [iced tea](https://en.wikipedia.org/wiki/Long_Island_iced_tea) ceremony later. Good times. -->

I also started a breakfast club thing. It has nothing to do with the movie, it simply means I go for morning walks on weekends followed by a fancy breakfast at a fancy place with three other people. It's definitely a relaxing yet fun way to start the weekend (if you don't consider Friday nights as the beginning of the weekend).

![edited photo of a person wearing multiple tote bags](/media/log/life.tote.avif)

That's me, right after a hearty brunch. No low-res doodles this time, you get the detailed ray-traced render of me this time. And no, none of those are my bags — I would much rather don a 'Socially Awkward Club' bag than the one above.

Earlier, I had also applied (after being forced to), and got invited to [Startup School India](https://events.ycombinator.com/yc-sus-india). I attended it not because I am big fan of YC. No, I attended because YC was giving away more than $25,0000 in AWS/Azure/Anthropic/etc credits to people who were present for the event. It was fun. Met new people with different POVs — and got my free credits.

![photo of a tech startup gathering event](/media/log/life.yc.avif)

Speaking of YC, I hate what the world is heading towards. It feels like the future is bleak, and no one seems to care. Despite being happier, these last nine months have also made me more pessimistic than ever.

## Becoming a Quixotic Georgist

I have mixed thoughts on AI. On one hand, I find it fascinating that interpolating between data points can finally help us learn more about, and help us define what it even means to be intelligent. On the other hand, I feel like the lack of regulatory will — just to win the geopolitical prisoner's dilemma — is going to end up creating a dystopian [technofeudalist](https://en.wikipedia.org/wiki/Technofeudalism) future where few people play God without permission.

There are certain things that are assumed as universally true — things like money having value, people upholding shared values, a general trend of increasing standards of living over time, etc. Institutions are built around these assumptions, and to uphold them. It's good for forming a basis for a functional society, but I think it also implies institutions are not tailored for a world where some of these axioms start falling apart.

With how fast AI has been progressing, it's time to rethink a lot of those assumptions. Is the current economic system even compatible with what's about to come? Do we need [UBI](https://en.wikipedia.org/wiki/Universal_basic_income)? How will the change public power dynamics? Debates that need serious discussion but are being overshadowed by short-term concerns. Stuck in a one-dimensional local minima, while we slowly drift in the other dimensions towards a world where the ladders for upward social mobility become increasingly sparse.

I do not think AI will take over all jobs, or even the majority for that matter. I feel if the cost of knowledge becomes cheaper, [Jevons effect](https://en.wikipedia.org/wiki/Jevons_paradox) will kick in and the demand will increase correspondingly. But I am also confident the increased productivity will just keep trickling up to the rent seekers, as we lose even more of our collective bargaining power. I think CGP Grey does a much better job of [articulating](https://www.youtube.com/watch?v=rStL7niR7gs) my [thoughts](https://www.youtube.com/watch?v=7Pq-S557XQU) than I myself can. Here is a one liner that also sums it up pretty well:

> Artificial intelligence will allow wealth to access skill while removing from the skilled the ability to access wealth.

Of course it goes without saying that predicting the future is a fool's errand. So as Tom Scott says: This is *a* future, not *the* future. Maybe the AI bubble pops and things are rosy again. I do hope that, but personally I feel this is more of a Pandora's box situation. And this is just AI; there's also climate change. That's an even bigger box.

Anyway this is already more than enough for the yearly rant. Cya next time.
