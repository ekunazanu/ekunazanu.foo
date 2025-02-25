+++
title = "Quantifying Colour"
description = "A visual description of the CIE 1931 colour spaces."
weight = 1
draft = false
template = "article.html"
[extra]
type = "article"
thumbnail = "lab.colours.svg"
thumbnailalt = "Red, green, and blue lines representing pixels of an RGB display."
+++

There are [billions of monitors](https://www.statista.com/statistics/245501/multiple-mobile-device-ownership-worldwide/) worldwide that can reproduce the exact same colour when instructed to. This in itself is an engineering marvel, but it glosses over the fact that this is only possible if there is a standard definition for colours in the first place. Earlier, colours were loosely defined using a limited set of words — most languages have at most [twelve words](https://en.wikipedia.org/wiki/Color_term#Color-term_hierarchy) to describe colours. These loose definitions are fine in most cases, but it is not precise enough for describing the tiny differences between similar looking colours that is required for accurate colour reproduction.

![a image of green leaves with boxes below showing some of the shades of green present in the image](/media/lab/quantifying-colour/leaves.avif)

{% tangent(summary="Same name, different colours", open=true) %}
The above coloured rectangles shows some of the colours present in the above image. Despite being distinct, all the shades can be described by the same label — green. One could argue, they can be labelled as lime-green, olive-green, light-green, dark-green, etc to create some distinction. But this naming system is still clunky and highly inefficient. To display the above image accurately, there needs to be a way to describe the all the different shades of green uniquely without needing to resort to an ever-growing list of labels.

Image sourced from [pixabay](https://pixabay.com/photos/boundary-dark-green-wallpaper-1867353/), under CC0.
{% end %}

Instead of mapping colours to possibly millions of labels, it would be much simpler to use numbered units — the desired precision can then be achieved by simply using more or fewer digits. The idea of mapping colours to numbers might look odd, but it is not too far fetched. Most measurable physical phenomena have already been quantified (for eg. distances, temperature, etc). So if colours can be physically measured it should be easy to map them to numbers, in theory.

Defining colours using numbers also opens up interesting questions: What does addition or multiplication of colours look like? The process of quantifying colours will also reveal why [colour hexcodes](https://en.wikipedia.org/wiki/Web_colors) cannot show enough colours even with 16,777,216 values and how a [dress became a debate](https://en.wikipedia.org/wiki/The_dress) on the internet.

## Spectral Power Distribution

The goal is to then measure colours as some physical entity. Unfortunately, colours are a subjective phenomenon. However the fact that *most* people can agree on the colour of something suggests that there must be at least something objective and physical about it. And there is. Colours are only visible in the presence of light, and that provides a huge clue as to what colours are.

Light is complicated, but it can be thought of as a bunch of wave-like particles, called [photons](https://en.wikipedia.org/wiki/Photon) — each carrying some specific amount of energy. The energy of these particles is determined by their [wavelength or frequency](https://en.wikipedia.org/wiki/Photon_energy#Physics).

<canvas id="canvasPhoton"></canvas>
<input id="sliderPhotonWavelength" type="range">Wavelength

{% tangent(summary="Photon representation", open=true) %}
The above is an interpretation of a photon, and is not necessarily accurate. The exact shape of photons is difficult to describe since photons exhibit [both particle and wave-like behaviour](https://en.wikipedia.org/wiki/Wave%E2%80%93particle_duality#Wave-particle_duality_of_light). Trying to visualize photons as both a particle and a wave can get very tricky very quickly.
{% end %}

<canvas id="canvasPhotonSpectrum"></canvas>

{% tangent(summary="Electromagnetic spectrum", open=true) %}
There are photons with different energies (or wavelengths). The different wavelengths of photons together form the [electromagnetic spectrum](https://en.wikipedia.org/wiki/Electromagnetic_spectrum). It is simply the full range photons energies, ordered by wavelength or frequency. The above wavelengths are not to scale.
{% end %}

The energy carried by photons can be physically measured, making it trivial to quantify light. To simplify comparisons between different types of light however, the energy measurements are normalized per unit time as [power](https://en.wikipedia.org/wiki/Power_(physics)), and then normalized per unit area as [intensity](https://en.wikipedia.org/wiki/Intensity_(physics)) — where the area is the total area of the body radiating the photons/light.

So, light sources can be quantified using a singular intensity value. However, for reasons that will become more obvious later, light is actually represented using multiple intensity values — by measuring the intensity separately for photons at different wavelengths. The intensity-per-wavelength distribution is called the [spectral power distribution](https://en.wikipedia.org/wiki/Spectral_power_distribution).

<canvas id="canvasPhotonPower"></canvas>
<canvas id="canvasPhotonPowerSPD"></canvas>
<input id="sliderPhotonPowerWavelength0" type="range">450nm Photons<br>
<input id="sliderPhotonPowerWavelength1" type="range">500nm Photons<br>
<input id="sliderPhotonPowerWavelength2" type="range">550nm Photons<br>
<input id="sliderPhotonPowerWavelength3" type="range">600nm Photons<br>
<input id="sliderPhotonPowerWavelength4" type="range">650nm Photons<br>

{% tangent(summary="Spectral power distribution", open=true) %}
The above is an example of a spectral power distribution. The intensity at each wavelength depends on the number of photons at that wavelength and the energy of photons at that wavelength. The [energy of a photon](https://en.wikipedia.org/wiki/Photon_energy) is inversely proportional to its wavelength, so the shorter wavelength photons shown above have a higher intensity for the same number of photons.
{% end %}

The spectral power distribution provides a way to quantify light. But this is all irrelevant until there is a quantitative way to define a relationship between colours and the spectral power distribution (light) as well.

## Photoreceptor Cells

The biggest clue to finding that relationship is rather obvious — colour perception is not possible without light, but it is also not possible without eyes. Eyes are sensitive to light, but more importantly they react differently to different wavelengths of light.

To understand how eyes can distinguish between different wavelengths of light, it helps to know a little bit about human physiology. Eyes have different types of [photoreceptor cells](https://en.wikipedia.org/wiki/Photoreceptor_cell) that have evolved to respond to photons with specific wavelengths. Unsurprisingly, these wavelengths are very similar to those emitted by the sun (380nm–750nm):

<canvas id="canvasSPDSun"></canvas>

{% tangent(summary="Spectral power distribution of the sun", open=true) %}
The above is an approximation of the spectral power distribution of the sun. Human eyes have evolved to become sensitive to these wavelengths to be able to perceive environments lit up by the sun.
{% end %}

Photons, depending on their energy (their wavelength), can 'excite' certain photoreceptor cells to produce a specific response. The human eye has two kinds of photoreceptor cells — [rod cells](https://en.wikipedia.org/wiki/Rod_cell) and three types of [cone cells](https://en.wikipedia.org/wiki/Cone_cell). The different types of photoreceptor cells are sensitive to different wavelengths of light by differing amounts — some cone cells will not produce a significant response to lights with longer wavelengths but other cones may. The [sensitivity](https://en.wikipedia.org/wiki/Spectral_sensitivity) curves of the different photoreceptor cells are shown below:

<canvas id="canvasSensitivityCurves"></canvas>

{% tangent(summary="Normalized approximations", open=true) %}
The sensitivity curves shown here are normalized approximations (for simpler visualizations and calculations), and are not accurate. In reality, the sensitivity curves are less smooth, and different types of cones have differing levels of sensitivity. For example, the sensitivity of S-cones is significantly lower compared to the other cones. Similarly, rods are more sensitive to light than any of the cones.
{% end %}

Because of the varying sensitivity curves, the cones can distinguish between different wavelengths of light. Consider a [monochromatic light source](https://en.wikipedia.org/wiki/Monochromatic_radiation) (a light source with a near singular wavelength). The cones will produce a response to the light, depending on the wavelength of the light and how sensitive the cones are to that wavelength. However, since each type of cone has a different sensitivity, their response will be different for the same light.

<canvas id="canvasSimpleSPD"></canvas>
<canvas id="canvasSimpleSSC"></canvas>
<canvas id="canvasSimpleRSP"></canvas>
<input id="sliderSimpleWavelength" type="range">Wavelength<br>

{% tangent(summary="Photoreceptor cell responses", open=true) %}
The first graph is the spectral power distribution of the light source. Since it is monochromatic, the intensity narrowly peaks at some wavelength. The graph below shows the sensitivity curves of the cones. The diagram on the bottom represents the responses of the cones to the monochromatic light. The different cones produce different responses to the same monochromatic light source — because of their differing sensitivity.
{% end %}

This is in itself is not enough to help differentiate different wavelengths, but the way the sensitivity curves are (or have evolved to be) distributed makes it such that all different wavelengths will always correspond to a unique set of responses in the cones — making it possible to distinguish different wavelengths. The brain has evolved to interpret these unique responses as perceiving unique colours.

<canvas id="canvasSimpleColorSPD"></canvas>
<canvas id="canvasSimpleColorSSC"></canvas>
<canvas id="canvasSimpleColorRSP"></canvas>
<div id="divSimpleColor" class="cBox"></div>
<input id="sliderSimpleColorWavelength" type="range">Wavelength<br>

{% tangent(summary="Colour perception", open=true) %}
Notice how different wavelengths always result in a unique set of values. Wavelengths that are close to each other may produce similar cone responses and thus the brain interprets them as similar colours. But in general, wavelengths that are distinctly different will produce distinctly different responses and the brain will interpret them as distinct colours.

The colour in the above box is how the brain interprets the cone responses as a colour. The colours in the above box (and all subsequent boxes) is however just for illustration — it is an approximation and is not accurate. Also, the name in the above colour box is an example of a [word-based definition](https://en.wikipedia.org/wiki/Spectral_color#Spectral_color_terms). Notice here how imprecise they are — the same name correspond to lots of different shades of colours.
{% end %}

Rods are not shown in the above examples because they do not affect colour perception. In [well-lit conditions](https://en.wikipedia.org/wiki/Photopic_vision), cones might produce different responses based on the wavelength of light. But in such conditions, the rod cells produce a saturated response since rods are more sensitive to light than cones. Since the response of rods in bright environments is indifferent to wavelengths, it cannot differentiate between distinct wavelengths, and thus does not have a major impact on colour perception — in bright conditions.

<canvas id="canvasRodsLightSPD"></canvas>
<canvas id="canvasRodsLightSSC"></canvas>
<canvas id="canvasRodsLightRSP"></canvas>
<div id="divRodsLight" class="cBox"></div>
<input id="sliderRodsLightWavelength" type="range">Wavelength<br>

{% tangent(summary="Saturated response", open=true) %}
The sensitivity of the rods is represented here with respect to the sensitivity of the cones (but it is not-to-scale, and is still an approximation). Because of their high sensitivity, the response of rods remain saturated, and no meaningful information about the wavelength is obtained from the response. Th set of cones responses however, remains varied for different wavelengths, and the distinct responses can be interpreted by the brain as distinct wavelengths.
{% end %}

In [dark environments](https://en.wikipedia.org/wiki/Scotopic_vision), rods produce a response when cones do not. But unlike cones, there is only one type of rod cell; there is no other type of rod cell with a slightly different sensitivity curve to help differentiate wavelengths. So, two light sources with different wavelengths can produce the same response in rods, and there is no way to differentiate the wavelengths from the singular response of the rods. The brain evolved to perceive the response of the rods as a singular luminance value.

<canvas id="canvasRodsDarkSPD"></canvas>
<canvas id="canvasRodsDarkSSC"></canvas>
<canvas id="canvasRodsDarkBAR"></canvas>
<canvas id="canvasRodsDarkRSP"></canvas>
<div id="divRodsDarkBox" class="cBox"></div>
<input id="sliderRodsDarkWavelength" type="range">Wavelength<br>

{% tangent(summary="Wavelength ambiguity", open=true) %}
Different wavelengths can produce similar responses in the rods, and are thus perceived as similar by the brain. For example, a low intensity light of <a id="linkRodsDarkWavelengthA" class="linkSwitch">492nm</a> and <a id="linkRodsDarkWavelengthB" class="linkSwitch">536nm</a> can produce similar sets of responses in the rods (and cones), and so cyan and yellow-ish green may appear similar in the dark.
{% end %}

So rods cannot distinguish light of differing wavelengths regardless of whether it is dark or bright, and hence do not play a big role in colour perception.

### Colour Blindness

Sometimes cone cells too may not be able to differentiate between different wavelengths of light. This can happen due to missing cones, or cones with overlapping sensitivity curves. Without the third cone, light with different wavelengths can produce a similar set of cone responses — differentiating between the wavelengths is again not possible. This results in [colour blindness](https://en.wikipedia.org/wiki/Color_blindness).

<canvas id="canvasBlindSPD"></canvas>
<canvas id="canvasBlindSSC"></canvas>
<canvas id="canvasBlindBAR"></canvas>
<canvas id="canvasBlindRSP"></canvas>
<div id="divBlindBox" class="cBox"></div>
<input id="sliderBlindWavelength" type="range">Wavelength<br>
<input id="sliderBlindSensitivityOverlap" type="range">M-cone Overlap<br>

{% tangent(summary="Wavelength ambiguity", open=true) %}
If the sensitivity curves of the M-cones overlap the sensitivity curves of the L-cones, then different wavelengths of light (for eg. <a id="linkBlindWavelengthA" class="linkSwitch">554nm</a> and <a id="linkBlindWavelengthB" class="linkSwitch">604nm</a>) can produce similar sets of responses in the cones — causing them to appear similar. This is not the case if the sensitivity of the M-cones and L-cones <a id="linkBlindOverlap" class="linkSwitch">do not have significant overlap</a>.
{% end %}

The type of cone anomaly determines the type of colour blindness. The sensitivity curve of the L-cones may shift towards shorter wavelengths (protanomaly), or the sensitivity of the M-cones can skew towards longer wavelengths (deuteranomaly). Some people might also lack functional L-cones (protanopia) or M-cones (deuteranopia) entirely. The result is similar in all the cases — reds and greens look similar. In very rare cases, people can have anomalous S-cones, resulting in tritanomaly and tritanopia.

<canvas id="canvasBlindBARNR"></canvas>
<canvas id="canvasBlindBARPP"></canvas>
<canvas id="canvasBlindBARDP"></canvas>
<canvas id="canvasBlindBARTP"></canvas>

{% tangent(summary="Colour blindness types", open=true) %}
The bars represent how colours of different wavelengths for people with normal colour vision might appear to people with colour blindness. The first bar shows unaltered colours. The second bar shows colours for people with protanopia, and the third depicts colours for people with deuteranopia. The fourth bar represents how colours appear to people with tritanopia.
{% end %}

In extremely rare cases, people might have only S-cones or no cone cells at all. Both will result in [total colour blindness](https://en.wikipedia.org/wiki/Monochromacy#Humans) since there is no mechanism for differentiating light with different wavelengths.

Colour blindness also provides clues for why colour perception is subjective — not all people have three perfectly functioning cones, that have the exact same sensitivity curves as everyone else. Also, how exactly the brain interprets the responses as colours is still a [debate](https://en.wikipedia.org/wiki/Color_vision#Theories). So even with identical sensitivity curves and cone responses, the brain may interpret signals differently, leading to inconsistent color perception among people.

Nonetheless, the same wavelengths of light are generally perceived consistently by most of the population. So, for the purpose of colour quantification, *how* the brain interprets the cone responses can be ignored, and standard cone sensitivity curves can be defined using the sensitivity curves of the majority of people with normal colour vision.

<canvas id="canvasAggregateSSC"></canvas>

{% tangent(summary="Standardizing sensitivity curves", open=true) %}
A standard set of sensitivity curves can be defined using the aggregate of the sensitivity curves of people with normal colour vision.
{% end %}

### Non-Spectral Colours

Until now, only [spectral colours](https://en.wikipedia.org/wiki/Spectral_color) (colours corresponding to monochromatic light) have been discussed. But most of the light around us is not monochromatic, it is a combination of multiple wavelengths of light. This slightly complicates the measurement of the cone responses however. Earlier, the sensitivity of the cones at the given wavelength was simply used, but this is not possible now since there is no single specific wavelength, but there are multiple — and the intensity at different wavelengths need not be the same (the monochromatic light in all the cases above had the same intensity).

<canvas id="canvasMonochromaticSPD"></canvas>
<canvas id="canvasNonMonochromaticSPD"></canvas>

{% tangent(summary="Monochromatic and non-monochromatic light", open=true) %}
The first spectral power distribution shows a monochromatic light source. The second spectral power distribution shows a light source that is non-monochromatic, since it emits light over a much wider range of wavelengths. Notice how non-monochromatic light does not necessarily emit the same intensity of light at all wavelengths.
{% end %}

The response for non-monochromatic light sources is calculated by taking the weighted average of all the responses — by finding the normalized area under the response curve. The response curve is the product of the cone sensitivity curves and spectral power distribution: The spectral power distribution describes the intensity of light at some given wavelength and the sensitivity curves describes the sensitivity of the cones at the given wavelength. So, their product together describes the cone response at that wavelength. Measuring this product over all wavelengths (equivalent to calculating the area) gives the total response, which may then be normalized if needed.

For example, this is what the cone responses for light corresponding to <a id="linkNonSpectralSPDGrey" class="linkSwitch">grey</a>, <a id="linkNonSpectralSPDPink" class="linkSwitch">pink</a>, <a id="linkNonSpectralSPDWhite" class="linkSwitch">white</a>, <a id="linkNonSpectralSPDPurple" class="linkSwitch">purple</a>, and <a id="linkNonSpectralSPDOlive" class="linkSwitch">olive green</a> look like:

<canvas id="canvasNonSpectralSPD"></canvas>
<canvas id="canvasNonSpectralSSC"></canvas>
<canvas id="canvasNonSpectralRSP"></canvas>
<div id="divNonSpectral" class="cBox"></div>

{% tangent(summary="Interactive spectral power distribution", open=true) %}
The spectral power distribution can also be modified by drawing on it.
{% end %}

{% tangent(summary="Cone responses", open=true) %}
The response of the cones is the the total area under the curve that is obtained after multiplying the spectral power distribution and the cone sensitivity curves. The response may be normalized for light sources that have a very narrow wavelength range (eg. monochromatic light).
{% end %}

The colour of non-monochromatic light can look different from spectral colours because the set of cone responses produced for these types of lights may be different from the set of responses produced for spectral colours. The brain interprets these unique cone responses as a colour distinct from spectral colours. These colours are aptly referred to as non-spectral colours.

{% tangent(summary="Metamerism", open=true) %}
There are times when non-monochromatic light produces cone responses that are similar to the responses produced by spectral colours — making them appear similar to spectral colours. This phenomenon will be discussed later.
{% end %}

## Colour Space

Since colours perception is ultimately dependent on the set of cone responses, it should be theoretically possible to represent colours using only the responses of the cones. And these responses should theoretically be enough to describe every perceivable colour. So, if the set of cone responses can be quantified, it should be possible for all colours to be quantified just as easily.

As mentioned earlier, the spectral power distribution of any light is both quantifiable and [measurable](https://en.wikipedia.org/wiki/Spectroradiometer). Similarly, while the cone sensitivity curves are subjective, for the purpose of colour quantification, an aggregate of the majority can be standardized and used. Since the response of the cones is dependent on these two factors — both of which can be quantified — the response, too, should be quantifiable. But only if there is a well-defined relationship between the two as well.

Again, as discussed in the non-spectral colours subsection, the biology virtuosos have already found a way to define that relationship — it is the normalized area under the response curve (the response curve itself is the [point-wise product](https://en.wikipedia.org/wiki/Pointwise#Examples) of the spectral power distribution and the photoreceptor sensitivity curves).

<canvas id="canvasPointWiseSPD"></canvas>
<canvas id="canvasPointWiseSSC"></canvas>
<canvas id="canvasPointWiseRSP"></canvas>

{% tangent(summary="Cone response revisited", open=true) %}
The response of the cones is the the normalized area under the curve of the response curve. The response curve is the point-wise product of the spectral power distribution and the cone sensitivity curves.
{% end %}

This relationship can be more formally described as:

`L = ∫ J(λ)·l(λ)·dλ`\
`M = ∫ J(λ)·m(λ)·dλ`\
`S = ∫ J(λ)·s(λ)·dλ`

Where `J(λ)` describes the spectral power distribution of the light, while `l(λ)`, `m(λ)`, and `s(λ)` are the sensitivity curves of the L-cones, M-cones, and S-cones. The responses are also normalized such that their maxima is equal to unity. This relationship quantifies cone responses to a spectral power distribution.

So the colour of any light or any object reflecting light can be precisely described by its (L,M,S) values — which can be derived by from its spectral power distribution. The set of all possible (L,M,S) values describes every perceivable colour, and all these possible values together form a three dimensional space, aptly called a [colour space](https://en.wikipedia.org/wiki/Color_space). More specifically, this is the [LMS colour space](https://en.wikipedia.org/wiki/LMS_color_space), where colours are defined as a set of (L,M,S) values. The LMS colour space here is visualized below, where each of the responses of the cones is represented using a spatial dimension.

<canvas id="canvasColorSpaceLMS"></canvas>
<div id="divColorSpaceLMS" class="cBox"></div>
<input id="sliderColorSpaceLMSL" type="range">L<br>
<input id="sliderColorSpaceLMSM" type="range">M<br>
<input id="sliderColorSpaceLMSS" type="range">S<br>

{% tangent(summary="The LMS colour space", open=true) %}
While all colours can be represented using LMS values — and hence will always be in the LMS color space, the reverse is not always true. Not all LMS values correspond to perceivable colours. Since the sensitivity curves of the M-cones overlaps the sensitivity curves of L-cones and S-cones, any type of light that excites the M-cones, must also excite the L-cones, or S-cones, or both. So 'colours' having LMS values such as <a id="linkColorSpaceLMSImp" class="linkSwitch">(0,0.7,0)</a> are [imaginary](https://en.wikipedia.org/wiki/Impossible_color#Imaginary_colors). The imaginary values are represented as black in the above LMS colour space, but their actual colour is hard to approximate since these 'colours' do not appear naturally, and have only been replicated recently by [shooting lasers directly to the retina](https://en.wikipedia.org/wiki/Olo_(color)).
{% end %}

So we achieved our goal — a way to quantify colours precisely, using numbers. Except this is not at all the standard used when describing colours. The LMS colour space is *one* way to represent colours, but is not the *standard* way to represent them.

As mentioned, defining the LMS values for a colour requires defining some relationship between the spectral power distribution and response of the cones. However, this is only possible if there is a set of standardized sensitivity curves. It is obvious that without these, the response cannot be measured or defined.

<canvas id="canvasSensitivityUndefinedSPD"></canvas>
<canvas id="canvasSensitivityUndefinedSSC"></canvas>
<canvas id="canvasSensitivityUndefinedRSP"></canvas>

{% tangent(summary="Undefined cone sensitivity", open=true) %}
The cones responses cannot be calculated from the spectral power distribution if there is nothing relating them both.
{% end %}

Interestingly, colours were quantified and standardized even before the sensitivity of the cones were measurable with a decent level of precision. So there was already an existing definition/model for colours, making the LMS colour space redundant.

This older model of colours did not use the cone responses as its basis. Instead, it used colour matching functions — mapping colours to the intensity of lights required to produce that colour. This is the same as quantifying colours using numbers (measurable intensity values), but the difference is that it relies on a different phenomenon to map colours to numbers.

## Metamerism

As mentioned earlier briefly, sometimes lights with different spectral power distributions can produce similar responses in the cones as spectral colours. They can also produce similar cone responses as non-spectral colours as well. More broadly, the same cone responses can be produced by light having different spectral power distributions — so different types of lights can appear to have the same colour even if their spectral power distributions vary. This is called [metamerism](https://en.wikipedia.org/wiki/Metamerism_(colour)).

<canvas id="canvasMetamerSPD"></canvas>
<canvas id="canvasMetamerSSC"></canvas>
<canvas id="canvasMetamerRSP"></canvas>
<div id="divMetamer" class="cBox"></div>

{% tangent(summary="Metamer examples", open=true) %}
Here, <a id="linkMetamerDistributionA" class="linkSwitch">multiple</a> <a id="linkMetamerDistributionB" class="linkSwitch">distributions</a> can produce the same <a id="linkMetamerDistributionX" class="linkSwitch">purples</a>.
{% end %}

This phenomenon was explored further in colour matching experiments by [William David Wright](https://doi.org/10.1088/1475-4878/30/4/301) and [John Guild](https://doi.org/10.1098/rsta.1932.0005). A light source with three wavelengths (435nm, 546nm, 700nm) each with different intensities were mapped to spectral colours by varying the intensities of its constituent monochromatic lights, such that the resultant light was perceived to be the same as the spectral colour. The findings were aggregated and summarized as (the now standardized) colour-matching functions.

The colour matching curves define the intensity of each of the three [primaries](https://en.wikipedia.org/wiki/Primary_color#Real_primaries) (colours used to recreate other colours; in this case, the 435nm, 546nm, 700nm monochromatic lights) required to replicate a spectral colour.

<canvas id="canvasColorMatchingCMF"></canvas>
<canvas id="canvasColorMatchingSPD"></canvas>
<canvas id="canvasColorMatchingSSC"></canvas>
<canvas id="canvasColorMatchingRSP"></canvas>
<div id="divColorMatching" class="cBox"></div>
<input id="sliderColorMatchingWavelength" type="range">Wavelength<br>

{% tangent(summary="Inaccurate cyans", open=true) %}
The first graph shows the intensity of the primaries — they are colour matching functions. The rest of the graphs have the same meaning as the previous diagrams. Notice the negative intensity values, and how the colour of the primaries emulating the <a id="linkColorMatchingWavelengthA" class="linkSwitch">500nm</a> cyan looks very different from the real cyan at 500nm.
{% end %}

While the three primaries can produce similar responses to certain spectral colours in the cones — making them appear similar — it is not always the case. There are spectral colours which can never be replicated using only the three monochromatic primaries. For example, the three wavelengths above cannot produce a color that looks similar to spectral cyans (light having wavelengths around 500nm). However, the cyans can still be mapped to the primaries. The spectral colours and primaries are matched by adding some of the primaries to the spectral colour, instead of with the other primaries. This is represented as negative intensity of the primary in the colour matching curves.

<canvas id="canvasColorMatchCircle"></canvas>
<input id="sliderColorMatchCircleIntensity" type="range">700nm Intensity (Normalized): <span id="spanColorMatchingCircleR"></span><br>

{% tangent(summary="Negative intensity", open=true) %}
The 435nm, 546nm, and 700nm primaries cannot produce colours that exactly matches the spectral cyans. The only way to match the primaries to spectral colours is by adding <a id="linkColorMatchCircle" class="linkSwitch">some amount</a> of the 700nm primary to the spectral colour itself. The addition of 700nm light to the spectral colours is represented as negative intensity in the colour matching functions.

Physically, it is impossible to create light with negative intensity, so it is impossible to reproduce certain colours using only three wavelengths of light. However, colours can still be **represented theoretically** using negative values in these colour matching functions, for the purpose of quantifying colours.
{% end %}

## CIE Colour Spaces

The Wright-Guild colour matching functions makes spectral colours quantifiable as a set of measurable intensity values of three monochromatic lights. But non-spectral colours too can be mapped to intensity values using this technique.

Changing the intensity values of the three primaries to something other than the values for spectral colours results in colours that are not spectral colours — so, non-spectral colours. Since the set of intensity values can be mapped to colours, these values can together can create a colour space. Colours can be described as points in this space as well, and this colour space is called the [CIE RGB colour space](https://en.wikipedia.org/wiki/CIE_1931_color_space#CIE_RGB_color_space).

<canvas id="canvasColorSpaceRGB"></canvas>
<div id="divColorSpaceRGB" class="cBox"></div>
<input id="sliderColorSpaceRGBR" type="range">R (700nm)<br>
<input id="sliderColorSpaceRGBG" type="range">G (546nm)<br>
<input id="sliderColorSpaceRGBB" type="range">B (435nm)<br>

{% tangent(summary="The CIE RGB colour space", open=true) %}
The CIE RGB colour space uses the normalized intensity of 700nm, 546nm, and 435nm lights as its bases. The LMS colour space, in contrast, used the response of the cones (L,M,S) as its bases.
{% end %}

These intensity values are again measurable and quantifiable, and forms another way to quantify colours. However, there are some minor inconveniences with this colours space. Not all colours are present in this colours space. Or more accurately, not all perceivable colours lie in the positive quadrant of this colour space.

Consider the spectral colours. Mapping spectral colours in the this colour space results in the [spectral locus](https://en.wikipedia.org/wiki/Spectral_color#In_color_spaces). Some part of this spectral locus outside the positive quadrant of this space — so certain spectral (as well as non-spectral) colours lie outside the positive bounds of this space.

<canvas id="canvasColorSpaceRGBLocusCMF"></canvas>
<canvas id="canvasColorSpaceRGBLocus"></canvas>
<input id="sliderColorSpaceRGBLocusWavelength" type="range">Wavelength<br>

{% tangent(summary="Cyans outside the positive quadrant", open=true) %}
Unlike the LMS colors space, which describes all perceivable colours using non-negative values (all colours have values within zero and one), the CIE RGB colour space requires negative values to define certain colours. For example, spectral cyans are represented using negative intensity of the R primary, and thus lie in the negative R half of the CIE RGB space.
{% end %}

It was decided that a colour space that could map all colours to non-negative values would have been preferable. But instead of conducting more experiments to construct a new colour space, the existing CIE RGB colour space could also be transformed using simple linear transformations. The transformation of the three dimensional colour space can then be defined by a 3x3 matrix.

<canvas id="canvasColorSpaceTransformCMF"></canvas>
<canvas id="canvasColorSpaceTransform"></canvas>
<input id="sliderColorSpaceTransform0" type="range"><input id="sliderColorSpaceTransform1" type="range"><input id="sliderColorSpaceTransform2" type="range"><br>
<input id="sliderColorSpaceTransform3" type="range"><input id="sliderColorSpaceTransform4" type="range"><input id="sliderColorSpaceTransform5" type="range"><br>
<input id="sliderColorSpaceTransform6" type="range"><input id="sliderColorSpaceTransform7" type="range"><input id="sliderColorSpaceTransform8" type="range"><br>

<a id="linkColorSpaceTransformMatRandom" class="linkSwitch">Transforming</a> the space means the new space is now defined by different new bases or new primaries. Earlier, some spectral colours had to be defined by negative values of a primary, but now the same colour is defined by positive values. It suggests that the coordinate system (the primaries) itself has to contain some sort of a negative intensity. But it is impossible for light to have negative intensity, implying that the primaries for the new colour cannot physically exist, and themselves are imaginary.

Since the primaries of the new colour space are imaginary, it is reasonable to define the new primaries to represent more abstract concepts instead of physical quantities. Again, it was decided that [one of the primaries](https://en.wikipedia.org/wiki/Luminous_efficiency_function) would define the [luminance](https://en.wikipedia.org/wiki/Luminance) of the colour. The other two can be used to derive its [chromaticity](https://en.wikipedia.org/wiki/Chromaticity). One of the two primaries is also roughly equal to the response of the S-cones. A <a id="linkColorSpaceTransformSpecificMat" class="linkSwitch">specific transformation</a> was defined to map the colours to the non-negative quadrant and incorporate the above ideas.

{% tangent(summary="Luminance and chromaticity", open=false) %}
Luminance refers to the perceived brightness of a colour, while chromaticity is analogous to hues. According to the [opponent process](https://en.wikipedia.org/wiki/Opponent_process) theory, colours are perceived as pairs of opposing colours — red vs green, blue vs yellow (chromaticity), and black vs white (luminance). Hence, it is possible to describe a colour by how red it is compared to how green it is, how blue it is compared to how yellow it is, and how bright the overall colour is — ie. defining colours based on luminance and chromaticity values.
{% end %}

<canvas id="canvasColorSpaceTransformSpecificCMF"></canvas>
<canvas id="canvasColorSpaceTransformSpecific"></canvas>
<input id="sliderColorSpaceTransformSpecific0" type="range"><input id="sliderColorSpaceTransformSpecific1" type="range"><input id="sliderColorSpaceTransformSpecific2" type="range"><br>
<input id="sliderColorSpaceTransformSpecific3" type="range"><input id="sliderColorSpaceTransformSpecific4" type="range"><input id="sliderColorSpaceTransformSpecific5" type="range"><br>
<input id="sliderColorSpaceTransformSpecific6" type="range"><input id="sliderColorSpaceTransformSpecific7" type="range"><input id="sliderColorSpaceTransformSpecific8" type="range"><br>

The primaries of this new colour space are named X, Y, and Z — and the resulting colour space is called the [CIE XYZ colour space](https://en.wikipedia.org/wiki/CIE_1931_color_space#Meaning_of_X,_Y_and_Z). All spectral colours lie in the positive quadrant of this colour space.

<canvas id="canvasColorSpaceXYZLocusCMF"></canvas>
<canvas id="canvasColorSpaceXYZLocus"></canvas>
<input id="sliderColorSpaceXYZLocusWavelength" type="range">Wavelength<br>

{% tangent(summary="Imaginary primaries", open=true) %}
Notice how transforming the CIE RGB space results in a new space, defined by new bases (primaries). The new XYZ primaries are no longer grounded in physical reality, and instead are more abstract and imaginary.
{% end %}

The other colours in the CIE RGB space can similarly be mapped in the XYZ colour space by applying the same matrix transformation. However, not all perceivable colours can be mapped to the XYZ space using this transformation since the CIE RGB space itself does not define all perceivable colours in its space — colours that require 'negative' intensities have not been defined, apart from the spectral colours. Unlike the RGB colour space, where the primaries are physical monochromatic lights and thus have a corresponding colour, the CIE XYZ space has imaginary primaries and so it is not obvious which colour a certain combination of (X,Y,Z) values refer to — or if it even maps to a valid colour.

<canvas id="canvasColorSpaceXYZ"></canvas>
<input id="sliderColorSpaceXYZX" type="range">X<br>
<input id="sliderColorSpaceXYZY" type="range">Y<br>
<input id="sliderColorSpaceXYZZ" type="range">Z<br>

{% tangent(summary="The CIE XYZ colour space", open=true) %}
The colours in the CIE RGB space after the transformation — resulting in the XYZ space — is shown above. While some of the values in the new XYZ space are valid colours (eg. the CIE RGB colours), it is not clear what the values outside the CIE RGB bounds represent. Colours like <a id="linkColorSpaceXYZCyan" class="linkSwitch">spectral cyans</a> lie outside the CIE RGB bounds, but are perceivable colours. Similarly, there must be (X,Y,Z) values outside the RGB bounds that are valid colours — for example, the colours lying between the spectral cyans the the CIE RGB colours. However, mapping these is difficult since the primaries of the XYZ space are imaginary and don't necessarily correspond to an observable colour, unlike the physical RGB primaries.
{% end %}

To find which colours the undefined values correspond to, it is helpful to first discuss yet another popular way to represent colours — using chromaticity spaces.

## Chromaticity Space

As mentioned before, colours can be alternatively classified based on more abstract properties like their luminance and chrominance. This can be a more convenient way for defining colours since it matches with how the brain is [believed to classify colours](https://en.wikipedia.org/wiki/Opponent_process) — as dark vs bright (luminance), and as red vs green and blue vs yellow (chrominance).

Consider the CIE RGB colour space. A simple way to obtain a crude approximation of the luminance from the primaries' values is by taking the their sum (R+G+B). Likewise, the chrominance values can be approximated by taking the ratios between the intensities of the RGB primaries.

{% tangent(summary="Luminance-chromaticity estimates", open=false) %}
While the luminance and chromaticity are approximations, it does not mean that there is loss of information. The exact RGB values can be recreated using the luminance and chromaticity estimates. The approximation simply refers to the imperfect separation of luminance and chromaticity.
{% end %}

So, the luminance of a colour with values (R,G,B) will be L=R+G+B, and its chromaticity values would be their relative intensities — which can be computed by normalizing them. That is, the chromaticity ratios r, g, b would be equal to R/L, G/L, and B/L respectively. Consider a simple example where the luminance is fixed to one. In the CIE RGB space, all the colours with a luminance value of one will lie on the R+G+B=1 plane. The (R,G,B) values of a colour on this plane represents the ratios of its primaries, and so represents its chrominance values.

<canvas id="canvasColorSpaceRGBChroma"></canvas>
<div id="divColorSpaceRGBChroma" class="cBox"></div>
<input id="sliderColorSpaceRGBChroma0" type="range">R<progress id="progressColorSpaceRGBChroma0"></progress>r<br>
<input id="sliderColorSpaceRGBChroma1" type="range">G<progress id="progressColorSpaceRGBChroma1"></progress>g<br>
<input id="sliderColorSpaceRGBChroma2" type="range">B<progress id="progressColorSpaceRGBChroma2"></progress>b<br>

{% tangent(summary="Chromaticity plane", open=true) %}
The above slice of the CIE RGB space represents a chromaticity plane. When the luninance is fixed, changing any of the (R,G,B) values changes the relative intensity of the primaries without changing their total intensity (luminance). So colours on these type of planes represent colours with a fixed luminance, but different chromaticities.

Here, since the luminance is fixed to one, the chromaticity ratios (r,g,b) of the colours are simply the (R,G,B) values.
{% end %}

A colour with some other luminance k will lie on the plane R+G+B=k. Meanwhile the chromaticity ratios will be the normalized intensities of the primaries, so the (r,g,b) ratios are the projection of the (R,G,B) values on the R+G+B=1 plane.

<canvas id="canvasColorSpaceRGBChromaProject"></canvas>
<div id="divColorSpaceRGBChromaProject" class="cBox"></div>
<input id="sliderColorSpaceRGBChromaProject0" type="range">R<progress id="progressColorSpaceRGBChromaProject0"></progress>r<br>
<input id="sliderColorSpaceRGBChromaProject1" type="range">G<progress id="progressColorSpaceRGBChromaProject1"></progress>g<br>
<input id="sliderColorSpaceRGBChromaProject2" type="range">B<progress id="progressColorSpaceRGBChromaProject2"></progress>b<br>
<input id="sliderColorSpaceRGBChromaProjectPan" type="range">Pan

{% tangent(summary="Dimensionality reduction", open=true) %}
The coloured dots represent colours with the same luminance — colours that lie on the R+G+B=k plane (outlined using the gray triangle). The chromaticity of a colour is the ratio of the intensities, or put simply, their normalized intensities. Geometrically, the chromaticity (the point in black) is the projection of the (R,G,B) point (coloured gray) on the R+G+B=1 plane. Try <a id="linkColorSpaceRGBChromaProjectPan" class="linkSwitch">panning</a> to get a feel of this space.

From the diagram it can be seen that colours with the same chromaticity but different luminance lie on the same lines radiating from the origin. These can be thought of as lines of chromaticity. Points on these lines represent colours with the same chromaticity but different luminance values. Colours with the same chrominance values appear 'similar' but can look lighter or darker, depending on their luminance. For example, <a id="linkColorSpaceRGBChromaProjectGreen1" class="linkSwitch">greens</a> lying on the same chromaticity-line look similar but appear <a id="linkColorSpaceRGBChromaProjectGreen2" class="linkSwitch">lighter</a> or <a id="linkColorSpaceRGBChromaProjectGreen0" class="linkSwitch">darker</a> based on their luminance.

Since colours with the same chromaticity but different luminance values get projected to the same point, it leads to a [loss of information](https://en.wikipedia.org/wiki/Dimensionality_reduction). The chromaticity plane contains information about chromaticity, and generally does not contain any information about luminance. So unless luminance is explicitly specified, it is impossible to recreate the corresponding RGB values using just the (r,g,b) values.
{% end %}

For some specific luminance, the chromaticity space is just a two dimensional plane in a three dimensional space. Instead of representing the chromaticity space as a plane embedded in a three dimensional space, it is simply represented as a two dimensional space by projecting the chromaticity plane to one of the colour space planes. In the case of the CIE RGB space, the R+G+B=1 chromaticity plane is projected to the RG plane.

<canvas id="canvasChromaSpaceRG"></canvas>
<input id="sliderChromaSpaceRGPan" type="range">Pan

{% tangent(summary="The CIE rg chromaticity space", open=true) %}
Projecting the R+G+B=1 plane of the CIE RGB space to the <a id="linkChromaSpaceRGPan" class="linkSwitch">RG plane</a> results in the [rg chromaticity space](https://en.wikipedia.org/wiki/Rg_chromaticity). This plane is specifically called rg plane, and not the RG plane, because RG and rg represent different quantities. The values (r,g) represent the chromaticity of a colour — it represents a colour without describing its luminance — meanwhile the (R,G) values simply represent the intensity of R and G primaries.
{% end %}

The chromaticity values for the spectral colours, too, can be calculated by applying the same transformations on the spectral locus — normalizing the intensity of the primaries to get its projection on the R+G+B=1 plane, and then selecting the (r,g) values to get its <a id="linkChromaRGBLocusPan" class="linkSwitch">projection on the rg plane</a>.

<canvas id="canvasChromaRGBLocus"></canvas>
<input id="sliderChromaRGBLocusWavelength" type="range">Wavelength<br>
<input id="sliderChromaRGBLocusPan" type="range">Pan<br>
<input id="switchChromaRGBLocusSlice" type="checkbox" checked><label for="switchChromaRGBLocusSlice">Show colours</label>

{% tangent(summary="The CIE rg chromaticity diagram", open=true) %}
Applying the same operations for the spectral colours instead of the CIE RGB colours — applying the transformations on the spectral locus — results in the [rg chromaticity diagram](https://en.wikipedia.org/wiki/Rg_chromaticity#rg_chromaticity_diagram). The spectral locus is represented in gray, while its projection on the R+G+B=1 plane is coloured in black. Notice that again, a part of the locus lies on the negative half in the rg chromaticity space.
{% end %}

While the colours, and therefore the chromaticity of the colours in the positive quadrant in the rg chromaticity space are defined, the chromaticity for colours outside the small subset of the positive quadrant is again not defined. Apart from the spectral colours, of course.

<canvas id="canvasChromaRGUndefined"></canvas>

{% tangent(summary="Undefined chromaticity", open=true) %}
The CIE rg chromaticity space is derived from the CIE RGB colour space, so colours and values that are undefined in the RGB colour space are also undefined in the rg chromaticity space. The only colours that have defined values are the colours created using the CIE RGB primaries, and the spectral colours. These have definite values in the RGB space and thus also have values defined in the rg chromaticity space.
{% end %}

The rg chromaticity diagram above might look a little weird with chromaticities defined in some of the negative half of this space (the spectral cyans), and other chromaticities defined in some of the positive half (the colours replicable using the CIE RGB primaries), but there are no chromaticities defined for values in between that space. It is not because there are no such colours — colours that are a combination of spectral cyans and CIE RGB primaires exist, and intuition would suggest that they will have (r,g) values in between those of the cyans and CIE RGB colours in the chromaticity space. The problem is finding a way to map these colours (chromaticities) to these values without conducting more colour matching experiments.

<canvas id="canvasChromaRGDefined"></canvas>

{% tangent(summary="In-between chromaticities", open=true) %}
Intuition suggests that the chromaticity of colours which consist of some combination of spectral cyans and CIE RGB primaries would lie in the space between the spectral locus (the part corresponding to cyans) and the CIE RGB colours. This space is highlighted in light blue above.
{% end %}

Defining the chromaticity for this undefined, in-between space requires another insight from other older experiments — namely that [addition of colours is a linear operation](https://en.wikipedia.org/wiki/Grassmann%27s_laws_(color_science)). This means that colours defined in the CIE spaces can be used to define other colours that are a linear combination of the already-defined colours.

Consider two colours the lie on the spectral locus, eg. two spectral cyans. The colours that can be formed using a linear combination of these cyans can then be represented as a linear combination of the CIE colour or chromaticity space values.

<canvas id="canvasChromaRGLinear"></canvas>
<div id="divChromaRGLinear" class="cBox"></div>
<input id="sliderChromaRGLinearWavelength0" type="range"><input id="sliderChromaRGLinearIntensity0" type="range"><br>
<input id="sliderChromaRGLinearWavelength1" type="range"><input id="sliderChromaRGLinearIntensity1" type="range"><br>
Intensity of <span id="spanChromaRGLinearWavelength0"></span>nm light (r: <span id="spanChromaRGLinearWavelength0R"></span>, g: <span id="spanChromaRGLinearWavelength0G"></span>): <span id="spanChromaRGLinearIntensity0"></span><br>
Intensity of <span id="spanChromaRGLinearWavelength1"></span>nm light (r: <span id="spanChromaRGLinearWavelength1R"></span>, g: <span id="spanChromaRGLinearWavelength1G"></span>): <span id="spanChromaRGLinearIntensity1"></span><br>
The rg-chromaticity of resultant colour:<br>
<span id="spanChromaRGLinearChromaValues"></span><br>
<span id="spanChromaRGLinearChromaResult"></span>

{% tangent(summary="Defining chromaticity for the in-between space", open=true) %}
Combining spectral colours of varying intensities results in real, observable colours. These perceivable colours can be defined as a linear combination of the spectral colours. Since addition of colours is linear, and the spectral colours have values defined in the CIE colour and chromaticity spaces, these new colours can themselves be defined as the linear combination of CIE colour/chormaticity space using the defined values of the spectral colours.

The entire space 'inside' the spectral locus will have a defined chromaticity, and it should be obvious why — any colour that can be created as some combination of spectral colours will always lie inside this space. In fact, this space contains the chromaticity of all perceivable colours. Since a colour is ultimately determined by the intensity of lights at different wavelengths (the spectral power distribution), a linear combination of their intensities can be mapped in this space — and since these intensities will always be non-negative, their chromaticity values will always lie inside the area spanned by the spectral locus.
{% end %}

This property of linearity of colour addition can similarly be expanded from the two dimensional chromaticity spaces to the three dimensional colour spaces. A colour can be first quantified as the intensity of two monochormatic lights, which can then be rewritten as the linear combination of the CIE primaries using the CIE colour values of the two monochromatic lights.

While the chromaticity space was introduced to show the linearity of addition of colours in a simpler reduced dimensional space, it has other uses too. Chromaticity is another way to quantify colours. It is not perfect, since there is a reduction of information — the luminance component of a colour is sacrificed in order to be able to represent colours using two dimensions. But this is a convenient tradeoff since most visual communication media are two dimensional, so chromaticity spaces allow easy representation of colours on such media, without losing much information — making them pretty popular.

### The xy Chromaticity Space

While chromaticity spaces are a popular way of representing colours (again, to be more accurate, chromaticities) the CIE rg-chromaticity space is not very common because it requires negative values to describe certain chromaticities. Instead, the xy chromaticity space is more commonly used.

Similar to how the CIE RGB colour space was transformed to get the rg chromaticity space and rg chromaticity diagram, the same transformations can be applied for the CIE XYZ colour space to get the xy chromaticity space and [xy chromaticity diagram](https://en.wikipedia.org/wiki/CIE_1931_color_space#/media/File:CIE1931xy_blank.svg).

<canvas id="canvasChromaXYZLocus"></canvas>
<input id="sliderChromaXYZLocusWavelength" type="range">Wavelength<br>
<input id="sliderChromaXYZLocusPan" type="range">Pan

{% tangent(summary="Meaning of xy", open=true) %}
The nomenclature used in the CIE XYZ colour space is analogous to the naming convention used in the CIE RGB colour space. So x = X/(X+Y+Z) and y = Y/(X+Y+Z) — the xy values represent the projection of points on the XY plane, after being projected on the X+Y+Z=1 plane.
{% end %}

Since the XYZ colour space is specifically defined to map spectral colours to positive values, the chromaticity values (which are just normalized values of the primaries) of the spectral colours are all positive as well. Because all perceivable colours are some combination of the spectral colours, the chromaticity values of all observable colours will lie inside the spectral locus area, and thus will also have positive values.

<canvas id="canvasLocusRatio"></canvas>
<div id="divLocusRatio" class="cBox"></div>
<input id="sliderLocusRatioWavelength0" type="range"><input id="sliderLocusRatioIntensity0" type="range"><br>
<input id="sliderLocusRatioWavelength1" type="range"><input id="sliderLocusRatioIntensity1" type="range"><br>
<span id="spanLocusRatiox"></span>, <span id="spanLocusRatioy"></span><br>

{% tangent(summary="The CIE xy chromaticity diagram", open=true) %}
Unlike the rg chromaticity space, all the perceivable colours have their chromaticity defined using non-negative values in the xy chromaticity space. The (x,y) chromaticity values for all the colours can be derived the same way it was done in the rg-chromaticity space — using a linear combination of two spectral colours, and then using their xy chromaticity values to calculate the xy chromaticities of the resultant colours.
{% end %}

Quantifying colours using chromaticty values is not perfect because of the elimination of the luminance information. But chromaticity diagrams like the xy chromaticity diagram can be still be useful for certain applications — eg. to visualize the limitations of gamuts.

## Gamut

Again, consider two monochromatic light sources. These lights can produce colours having a chromaticity that lies on the line joining the corresponding two points in the CIE xy chromaticity plane. No combination of intensities can ever produce a colour that will have a chromaticity that does not lie on this line. For example, no combination of a green light and a blue light can ever produce a colour with reddish chromaticities.

<canvas id="canvasLocusGamutTwo"></canvas>
<div id="divLocusGamutTwo" class="cBox"></div>
<input id="sliderLocusGamutTwoIntensity0" type="range">546nm<br>
<input id="sliderLocusGamutTwoIntensity1" type="range">435nm<br>

{% tangent(summary="Chromaticity of two lights", open=true) %}
Colours created by combining two (monochromatic) lights will have a chromaticity that lies on the line connecting the chromaticity points of the two lights in the chromaticity diagram. In this case, the 546nm and 435nm lights can never create colours with chromaticities lying outside this line.
{% end %}

Until now, all the visualizations used the ratios of two monochromatic lights to calculate the chromaticity of colours. However, the chromaticity can be calculated using three monochromatic lights as well. The chromaticity will then be a linear combination of three chromaticity values.

Consider three monochromatic lights — the CIE RGB primaries, for example. The chromaticity of the colour created using the primaries would be a linear combination of the three chromaticities.

<canvas id="canvasLocusGamutCIE"></canvas>
<div id="divLocusGamutCIE" class="cBox"></div>
<input id="sliderLocusGamutCIEIntensity0" type="range">700nm (0.733, 0.267)<br>
<input id="sliderLocusGamutCIEIntensity1" type="range">546nm (0.266, 0.724)<br>
<input id="sliderLocusGamutCIEIntensity2" type="range">435nm (0.166, 0.008)<br>
+<span id="spanLocusGamutCIEIntensity0"></span> × (0.733r + 0.267g)<br>
+<span id="spanLocusGamutCIEIntensity1"></span> × (0.266r + 0.724g)<br>
+<span id="spanLocusGamutCIEIntensity2"></span> × (0.166r + 0.008g)<br>
= <span id="spanLocusGamutCIEChromaticity"></span>

{% tangent(summary="Chromaticity of three primaries", open=true) %}
The chromaticity of colours produced using the CIE RGB primaries will always lie inside the triangle formed by the three primaries. In earlier cases, the chromaticity of the colours lied on the line joining the two primaries.
{% end %}

The chromaticity of the colours which can be physically created using the RGB primaries will lie inside the [convex polygon](https://en.wikipedia.org/wiki/Convex_polygon) formed by the primaries. This range of colours (or chromaticities) that the primaries can produce is called its [gamut](https://en.wikipedia.org/wiki/Gamut). Points lying outside the polygon cannot be physically created (at least with the same three primaries), since it would require a linear combination with negative coefficients — creating colours with chromaticities that lie outside this polygon would require some negative intensities of the primaries, which is not physically possible.

Using more primaries would result in a convex polygon with more vertices (corners) and would cover a larger area, and hence more chromaticities, but having three primaries is usually enough for most applications. It is also economically more efficient to use primaries which are not purely monochromatic. So most displays use just three primaries which aren't monochromatic.

The gamut of the such displays depends on the primaries used, but the primaries that have been standardized are the sRGB primaries. A colour space has been constructed. Similarly other colour spaces like DCI-P3 and Adobe sRGB have also standarized certain primaries.

<canvas id="canvasLocusGamutMultiple"></canvas>
<div id="divLocusGamutMultiple" class="cBox"></div>
<input id="sliderLocusGamutMultipleIntensity0" type="range">Primary A<br>
<input id="sliderLocusGamutMultipleIntensity1" type="range">Primary B<br>
<input id="sliderLocusGamutMultipleIntensity2" type="range">Primary C<br>

<select id="selectLocusGamutMultipleSpace"></select>

{% tangent(summary="Gamut & Colour space", open=true) %}
Gamut refers to the set of colours that can be physically recreated by an output device, while a colour space is simply a mathematical model used to describe colours. Colour spaces may arbitrarily restrict itself to certain values to more accurately represent physical and economic constraints. Others like the Pro Photo use imaginary primaries to cover a much larger space.
{% end %}

HEX CODES SRGB

## White Point

Back to some physical science — all bodies radiate photons, due to [blackbody radiation](https://en.wikipedia.org/wiki/Black-body_radiation). The spectral power distribution of the radiation is a [function of temperature](https://en.wikipedia.org/wiki/Planck%27s_law#The_law):

The spectral power distribution of the radiation will have a colour associated with it:

<canvas id="canvasBlackbodyColorSPD"></canvas>
<canvas id="canvasBlackbodyColorSSC"></canvas>
<canvas id="canvasBlackbodyColorRSP"></canvas>
<div id="divBlackbodyColor" class="cBox"></div>
<input id="sliderBlackbodyColorTemperature" type="range">Temperature<br>

{% tangent(summary="Blackbody", open=true) %}
A blackbody is an idealized body that does not reflect any light and only emits blackbody radiation. Most bodies in the universe do not emit perfect blackbody radiation, but approximating it as such is still useful nonetheless.
{% end %}

The colours above have a corresponding chromaticity — and when mapped on the CIE xy chromaticity diagram, form the [planckian locus](https://en.wikipedia.org/wiki/Planckian_locus):

<canvas id="canvasLocusPlanckian"></canvas>

The [colour temperature](https://en.wikipedia.org/wiki/Color_temperature) is another way to describe certain colours and chromaticities — mostly different types of white. It is a common way to do it, as most physical sources of illumination have a chromaticity close to these values. Daylight, for example, has a chromaticity similar to a blackbody at temperatures ranging from 5000K to 6500K, and incandescent bulbs emit light having a colour temperature close to 2700K.

{% tangent(summary="Daylight colour temperature", open=false) %}
Incandescent bulbs have filaments heated to about 2000K to 2700K and thus have colour temperature close to that temperature. But the same is not true for sunlight as its colour temperature depends on the time of day. Due to [rayleigh scattering](https://en.wikipedia.org/wiki/Rayleigh_scattering), shorter wavelengths of sunlight get scattered making it appear redder, while making skies and overcast light appear bluer. During mornings and evenings when the sun is lower in the sky, more light gets scattered causing sunlight to appear even redder (have a lower colour temperature). Daylight is the combination of all direct and indirect sunlight, and thus also depends on the time of day.
{% end %}

Most illuminants have chromaticity values that lie close to the planckian locus, but do not lie exactly on it — as most bodies are not perfect blackbodies. Also, incandescent lights have been phased out by [fluorescent lights](https://en.wikipedia.org/wiki/Fluorescent_lamp#Color_temperature) and [LEDs](https://en.wikipedia.org/wiki/Light-emitting_diode#White_LEDs), which do not use thermal radiation to emit light, and also do not lie on the planckian locus:

<canvas id="canvasLocusPlanckianLED"></canvas>

While the chromaticity values of these illuminants do not lie on the planckian locus, they are still close enough to be perceptually similar to be meaningfully attributed to a colour temperature. These can be assigned a [correlated colour temperature](https://en.wikipedia.org/wiki/Correlated_color_temperature) based on the colour temperature it most closely resembles.

Correlated colour temperatures can also be mapped alongside the planckian locus:

<canvas id="canvasLocusPlanckianCCT"></canvas>

{% tangent(summary="Correlated colour temperature lines", open=true) %}
The lines intersecting the planckian locus represent correlated colour temperatures. Two points on a correlated colour temperature line have the same correlated correlated colour temperature.
{% end %}

Correlated colour temperature can describe non-ideal blackbodies and other sources of white light. But since a single correlated colour temperature can correspond to multiple chromaticity values, it is not a precise way to describe white light.

To represent different types of white light in an unambiguous way, [standard illuminants](https://en.wikipedia.org/wiki/Standard_illuminant) have been defined — theoretical sources of light having a definitive spectral power distribution, and therefore an exact chromaticity value.

<canvas id="canvasLocusIlluminants"></canvas>
<div id="divLocusIlluminants" class="cBox"></div>
<select id="selectLocusIlluminants"></select>

{% tangent(summary="Standard Illuminants", open=true) %}
For example, <a id="linkLocusIlluminants" class="linkSwitch">switching</a> between the illuminants reveal.
{% end %}

Having a standard and precise way to define illumination sources is necessary because of [chromatic adaptation](https://en.wikipedia.org/wiki/Chromatic_adaptation). Human colour perception adjusts for variations in illumination to preserve colours of objects. Two colours might appear white despite having different 'true' colours because of varying lighting conditions.

<!-- different-white-points ![comparison reddish white vs bluish white — http://brainden.com/images/color-cube-big.jpg, or image similar to white-golden or blue-black dress image; https://upload.wikimedia.org/wikipedia/commons/a/a3/Wikipe-tan_wearing_The_Dress_reduced.svg](static) -->

<!-- two images side by side with different lighting, use color picker for same spot on two images, color boxes below to show colours on both image at that point -->

{% tangent(summary="Colours under different lighting", open=true) %}
Same colours might look different under different lighting conditions and vice versa. [The dress](https://en.wikipedia.org/wiki/The_dress) is a popular, albeit an extreme example. The same colours can be perceived as either blue and black, or white and golden — depending on the perceived lighting.
{% end %}

Specifying a [white point](https://en.wikipedia.org/wiki/White_point) acts as a reference point for a colour space — to adjust for different viewing mediums and environments. Most colour spaces use the chromaticity of standard illuminants to define their white point. Again since the addition of colours can be approximated as linear — a simple calibration change suffices .

<canvas id="canvasLocusWhitePoint"></canvas>
<div id="divLocusWhitePoint" class="cBox"></div>
<div id="divLocusWhitePointAdj" class="cBox"></div>
<input id="sliderLocusWhitePointIntensity0" type="range">Primary A<br>
<input id="sliderLocusWhitePointIntensity1" type="range">Primary B<br>
<input id="sliderLocusWhitePointIntensity2" type="range">Primary C<br>

<select id="selectLocusWhitePoint"></select><select id="selectLocusWhitePointSpace"></select><br>

{% tangent(summary="White as reference point", open=true) %}
The white point to [D65](switch#) or [4500K](switch#) shows how the chromaticity gets transformed to take into account the effects of [chromatic adaptation](https://en.wikipedia.org/wiki/Chromatic_adaptation).
{% end %}

Needs to take into account the surrounding lighting conditions. The light illuminating the objects may have a warm white point than a monitor. And so all the objects will be slightly redder. The eyes will adjust to make it white. But this will also make the light from the display look bluish in comparison. Distorting all the colours.

![a blue-black dress that also appears white-gold to some people](/media/lab/quantifying-colour/dress.avif)

{% tangent(summary="The dress", open=true) %}
The dress appears either white and gold, or black and white, depending on how the brain perceives the white point of the light illuminating the dress. If the light is bluish, the brain tries to correct for it, making the dress appears white and yellow. Similarly if the illuminant is yellowish, the dress appears black and white due to chromatic adaptation.

Image sourced [tumblr (archived)](https://web.archive.org/web/20150227014959/http://swiked.tumblr.com/post/112073818575/guys-please-help-me-is-this-dress-white-and), under fair use.
{% end %}

For accurate colour reproduction, the white point of the environment needs to be taken into account.

{% tangent(summary="Non-emissive colours", open=true) %}
This is mostly true for emissive displays. For 'printed' colours, they simply reflect the light of the illuminant. So if the light is warmer, the 'printed' colour will reflect off a warmer colour, and there is no need to manually adjust colours. They however still do need to take into account [the spectral power distribution](https://en.wikipedia.org/wiki/Color_rendering_index), even if not just the colour temperature, of the light.
{% end %}

## Colour Science

Colours are a very interesting topic, because it involves quantifying something that feels innately qualitative. So far, only certain [additive colour models](https://en.wikipedia.org/wiki/Additive_color) have been discussed. But there are also [subtractive colour models](https://en.wikipedia.org/wiki/Subtractive_color) and [other colour models](https://en.wikipedia.org/wiki/Color_mixing).

Most of these topics involve ways to [describe and recreate colours](https://en.wikipedia.org/wiki/Colorimetry). But there is also an entirely different branch of science that deals with the [psychology of colours](https://en.wikipedia.org/wiki/Color_psychology) — why and how certain [colour combinations](https://en.wikipedia.org/wiki/Color_scheme) appear pleasing, or how the [meaning of colours](https://en.wikipedia.org/wiki/Color_symbolism) vary across cultures. Or how colours can [affect other senses](https://en.wikipedia.org/wiki/Color_psychology#Influence_of_color_on_perception).

The subject of colours is vast — spanning scientific domains from quantum physics and electromagnetism to physiology and psychology. This post is a very tiny fraction of what constitutes [colour science](https://en.wikipedia.org/wiki/Color_science).

---

## References

* Jamie Wong: [Color: From Hexcodes to Eyeballs](https://jamie-wong.com/post/color/)
* Bartosz Ciechanowski: [Color Spaces](https://ciechanow.ski/color-spaces/)
* Douglas A. Kerr: [The CIE XYZ and xyY Color Spaces](https://graphics.stanford.edu/courses/cs148-10-summer/docs/2010--kerr--cie_xyz.pdf)

<!-- <script>
{{ loadData(path="/scripts/quantifying-colour.js") }}
</script>
-->
<script src="/scripts/quantifying-colour.js"></script>
<style>
progress {width: 5rem;}
.cBox { width: 4rem; height: 2.5rem; float: right; margin: 0 0.5rem; font: 0.75rem "JetBrains Mono"; text-align: center; vertical-align: middle; line-height: 2.5rem; border: 0.0625rem solid #000; }
.linkSwitch { cursor: pointer; text-decoration-style: dotted; }
</style>
