+++
title = "Busy Building"
description = "Busy building bugs and excuses."
date = 2025-06-10
draft = false
template = "article.html"
[extra]
type = "article"
thumbnail = "log.14.impostor.avif"
thumbnailalt = "Doodle of an Among Us dead body."
+++

Endsems are over, I am back in hometown, and I am doing a little internship. Needless to say, I've been busy trying to dodge invitations and get some work done. So there's not a lot of internet-related log-apt updates for this month.

![doodle of a person lying on their bed, pretending to be busy on a phone call](/media/log/sleeping-calling.avif)

But not a lot != none. First, I've decided to make an article for [SoME4](https://some.3b1b.co/). I've always enjoyed the content people made for SoME, and I feel like this year I might be able to contribute too. Would I have written an article anyway? Probably. But I think the fact that at least one person will be reading/reviewing it is making me want to elevate its quality — more than the other lab articles. Unless laziness kicks in; we'll see.

Second, I had to revisit some linear algebra, and matrix inversions have finally started to make *some* geometric sense. If the determinant [determines the scaling factor](https://www.youtube.com/watch?v=Ip3X9LOh2dk) by which a matrix scales the [hypercube](https://en.wikipedia.org/wiki/Hypercube) formed by the identity matrix into some [parallelotope](https://en.wikipedia.org/wiki/Parallelepiped#Parallelotope) of non unit hyper-volume, then the inverse of the scaling factor (determinant) should restore scale the signed volume of the transformed parallelotope back to unit hyper-volume. The transpose provides a way to encode [the reverse ordering of the transformations](https://math.stackexchange.com/a/37402). Another way to think about it: If a 3x2 matrix will transform a 2D space to 3D, then its transpose will transform the 3D vector space back to 2D. Not the best analogy since inversions are not defined for rectangular matrices — they can lower the rank, making 'inversions' impossible. But still helps me remember. The cofactors — I still don't understand. If there is an intuitive explanation, please let me know.

Also while I was also solving [this month's puzzle](https://www.janestreet.com/puzzles/current-puzzle/), I unknowingly ended up creating an oddly satisfying tiler. I guess it is only satisfying if you have (very subtle) OCD. Anyhow, I wanted a quick way to find [partridge tilings](https://erich-friedman.github.io/mathmagic/0802.html) for squares, and instead of drawing it out or coming up with an algorithm to solve it, I just wrote a quick implementation for drawing tiles quickly. And what do you know, it's a great way to pass time — it was for me at least. So I thought about just leaving it up here:

<canvas id="canvasPartridge"></canvas>
<canvas id="canvasPartridgeSelection"></canvas>
<select id="selectPartridge"></select>

If you don't want to read what partridge tiling is, here's the gist: [the sum of the cubes of natural numbers is equal to the square of the sum of those natural numbers](https://www.youtube.com/watch?v=BP6bLvfl0V0). Now instead of the sum of n cubes, just think of them as the sum of n squares of n side length. This means area of n squares of n side length, where n goes from one to any number, is equal to the area of another square. But simply because the areas add up does not mean the squares will tile perfectly. But for squares of certain order, all the squares will neatly pack into the larger square. Here that order is nine, and tiling solutions do exist; you can try finding a few. Select the square from the menus or just use your keyboard. Right click to remove squares. Sorry mobile users, the grid is too small for you anyway.

Not much else for this month. Cya next month.

<script>
{{ loadData(path="/scripts/14-busy-building.js") }}
</script>
