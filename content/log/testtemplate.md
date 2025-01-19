+++
title = "Test template to check if everything is working and that very long titles get truncated"
description = "Testing and stuff."
date = 2024-12-10
draft = true
template = "article.html"
[extra]
type = "article"
thumbnail = "log.doodle-test.avif"
thumbnailalt = "Image with random noisy pixels."
+++

Paragraph with an [internal link](linkaddress) and [external link](https://foo.bar).

Huge fan of pastel photos of [echevarrio.io](https://www.echevarria.io/). The photos below are **not** his and are random pictures from [Lorem Picsum](https://picsum.photos/).

![First](https://picsum.photos/900/600)
![Second](https://picsum.photos/900/500)
![Third](https://picsum.photos/900/300)
![Fourth](https://picsum.photos/900/400)

But also for doodles, maybe a style similar to [xkcd](https://xkcd.com/) and this:

![water-color-style](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3103/optimized_Screenshot%202024-05-17%20at%209.11.00%20AM.png)

### Header3

Another paragraph with *emphasis* or **strong emphasis**. Also `monospaced string or inline code`. Don't use underline, to reduce confusion with links. ~~Strike through~~ is fine though. Also <mark>text can be marked</mark>. Not sure how it can be useful.

<div style="overflow-x: auto; margin: 1rem 0;">

| left | right | center | YYYYY | gfdhcbfghrdcbvgfhdc | dghyh | ebhd |
|:-----|------:|:------:|-------|---------------------|-------|------|
|  1   |   a   |   1    |   1   | ghelldfigffvbn      | er    | ww   |
|  2   |   a   |   1    | 11987 | vgnbfhdrjcv b       | q     | 222  |
|  3   |   a   |   1    | 23e4r | ftrhdejxncvbgfrhejs | aa    | rd   |
| 4    |   a   |   1    |  22   | fcngthrdjfcnv       | aa    | edr  |
|  5   |   a   |   1    | 1215  | gfyeh ftgrebd       | a     | erf  |
|    6 |   a   |   1    | 2333  | 2w3erftg            | aa    | dfd  |
|7     |   a   |   1    |  33   | 234 r 43edr 3ewdasdfgtrdfghg ashdgj xyhgsfdxgthyd sjhgbxd | a | vfc |

</div>

This is some sample text again. I don't know what to say other than that this is tedious. Okay, maybe not, but at least this is a waste of time. At least on the bright side I get to practice my typing skills and frankly I am not surprised I'm this slow. Worse, I am making too many mistakes. Good thing my typing won't be a bottleneck. My brain will. Anyways I think this is enough text for a paragraph to check how images look between paragraphs.

![Fifth](https://picsum.photos/300/200)

This is some sample text again. I don't know what to say other than that this is tedious. Okay, maybe not, but at least this is a waste of time. At least on the bright side I get to practice my typing skills and frankly I am not surprised I'm this slow. Worse, I am making too many mistakes. Good thing my typing won't be a bottleneck. My brain will. Anyways I think this is enough text for a paragraph to check how images look between paragraphs.

```
code block
with just
    some lines
    of
text
that is very longggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
```

This is some sample text again. I don't know what to say other than that this is tedious. Okay, maybe not, but at least this is a waste of time. At least on the bright side I get to practice my typing skills and frankly I am not surprised I'm this slow. Worse, I am making too many mistakes. Good thing my typing won't be a bottleneck. My brain will. Anyways I think this is enough text for a paragraph to check how images look between paragraphs.

<div style="overflow-x: auto; margin: 1rem 0;">
<table>
<thead>
    <tr><th>Row/col header</th> <th>Row header</th> <th colspan="2">Row header spanning 2 cols</th></tr>
</thead>
<tfoot>
    <tr><th>Row/col footer</th><th>Row footer</th><th>Row footer</th><th>Row footer</th></tr>
</tfoot>
<tbody>
    <tr><th>Col header</th><td>cell</td><td>cell</td><td>cell</td></tr>
    <tr><th rowspan="2">Col header spanning 2 rows</th><td>cell</td><td>cell</td><td>cell</td></tr>
    <tr><td></td><td> &lt;- empty cell</td><td>cell</td></tr>
    <tr><th>Col header</th><td>cell</td><td rowspan="2" colspan="2">Cell spanning two rows and cols</td></tr>
    <tr><th>Col header</th><td>cell</td></tr>
    <tr><th>Col header</th><td>cell</td><td>cell</td><td>cell</td></tr>
</tbody>
</table>
</div>

This is some sample text again. I don't know what to say other than that this is tedious. Okay, maybe not, but at least this is a waste of time. At least on the bright side I get to practice my typing skills and frankly I am not surprised I'm this slow. Worse, I am making too many mistakes. Good thing my typing won't be a bottleneck. My brain will. Anyways I think this is enough text for a paragraph to check how tables look between paragraphs.

```
int main(void){
    float num1;
    float num2;
    scanf("%f, %f", &num1, &num2);
    if (num1 > num2){
        printf("\033[31;1;4mThe first number is greater\033[0m");
    }
    else if (num2 > num1){
        printf("\033[32;1;4mThe second number is greater\033[0m");
    }
    else {
        printf("\033[34;1;4mBoth are equal\033[0m");
    }
    return 0;
}
```

## Header2

> Single line block quote that wraps around because the width of the text is longer than the width of the display on the screen of the computer, phone or other device.

> Block quote
> > Which is nested

[External site](https://ivanceras.github.io/svgbob-editor) for converting ASCII to SVG. Store externally and use `loadData` shortcode to keep content page organized but inline the SVGs. Also use `loadData` for in lining interactive JS visuals.

{{ loadData(path="/static/media/something.svg") }}

Some random words. And some other random words, to pad out this paragraph. It's not enough text so adding more here. I guess this is enough. Okay it's not, so here I am adding more. It's repetitive, but it is what is is. Okay maybe this is enough. Yeah it is. And then something here to end the article.

![6th](https://picsum.photos/800?grayscale)

Some random words. And some other random words, to pad out this paragraph. It's not enough text so adding more here. I guess this is enough. Okay it's not, so here I am adding more. It's repetitive, but it is what is is. Okay maybe this is enough. Yeah it is. And then something here to end the article.

An unordered list:

* This is some sample text again. I don’t know what to say other than that this is tedious. Okay, maybe not, but at least this is a waste of time. At least on the bright side I get to practice my typing skills and frankly I am not surprised I’m this slow. Worse, I am making too many mistakes. Good thing my typing won’t be a bottleneck. My brain will. Anyways I think this is enough text for a paragraph to check how tables look between paragraphs.
    * This is some sample text again. I don’t know what to say other than that this is tedious. Okay, maybe not, but at least this is a waste of time.
* This is some sample text again. I don’t know what to say other than that this is tedious. Okay, maybe not, but at least this is a waste of time. At least on the bright side I get to practice my typing skills and frankly I am not surprised I’m this slow.
    * This is some sample text again. I don’t know what to say other than that this is tedious.
        *  Worse, I am making too many mistakes. Good thing my typing won’t be a bottleneck. My brain will. Anyways I think this is enough text for a paragraph to check how tables look between paragraphs.

And an ordered list:

1. Something else
2. This too
    1. and something
3. This three [test link](/)

Some random words. And some other random words, to pad out this paragraph. It's not enough text so adding more here. I guess this is enough. Okay it's not, so here I am adding more. It's repetitive, but it is what is is. Okay maybe this is enough. Yeah it is. And then something here to end the article.

{% tangent(summary="Disclaimer", open=true) %}
Some random words. And some other random words, to pad out this paragraph. It's not enough text so adding more here. I guess this is enough. A [random link](link). Okay it's not, so here I am adding more. It's repetitive, but it is what is is. Okay maybe this is enough. Yeah it is. And then something here to end the article.

Some random words. And some other random words, to pad out this paragraph. It's not enough text so adding more here. I guess this is enough. A [random external link](https://foo.bar). Okay it's not, so here I am adding more. It's repetitive, but it is what is is. Okay maybe this is enough. Yeah it is. And then something here to end the article.
{% end %}

Some random words. And some other random words, to pad out this paragraph. It's not enough text so adding more here. I guess this is enough. Okay it's not, so here I am adding more. It's repetitive, but it is what is is. Okay maybe this is enough. Yeah it is. And then something here to end the article.

---

## References / Footnotes

1. A thing.
2. Other Thing.
3. Something.
