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

There's a lot of different ways to describe colours. But to pinpoint an exact colour, there needs to be a standard way to represent it. Even some surface level research about the topic reveals that there's extensive science and math behind this seemingly simple task.

Before quantifying colours, it is important to first define what colours even are. [Wikipedia](https://en.wikipedia.org/wiki/Color) defines it as "The visual perception based on the electromagnetic spectrum". So a colour depends on the perception of the viewer, as well as the electromagnetic spectrum — or in plain language, light.

## Spectral Power Distribution

Light is made up of [photons](https://en.wikipedia.org/wiki/Photon). These can thought of as abstract particles carrying specific amounts of energy — determined by their [wavelength or frequency](https://en.wikipedia.org/wiki/Photon_energy#Physics).

<canvas id="canvasPhoton"></canvas>
<input id="sliderPhotonWavelength" type="range">Wavelength

{% tangent(summary="Photon wave-particle duality", open=true) %}
The above is an interpretation of a photon, and is not necessarily accurate. The exact shape of photons is difficult to describe since photons exhibit [both particle and wave-like behaviour](https://en.wikipedia.org/wiki/Wave%E2%80%93particle_duality#Wave-particle_duality_of_light). Trying to visualize photons as both a particle and a wave can get very tricky very quickly.
{% end %}

The different wavelengths of photons together form the [electromagnetic spectrum](https://en.wikipedia.org/wiki/Electromagnetic_spectrum). It is simply the full range photons of different energies, ordered by wavelength.

<canvas id="canvasPhotonSpectrum"></canvas>

Since photons carry energy, any body that radiate photons also radiate energy. The rate of energy transferred via photons can be measured as [power](https://en.wikipedia.org/wiki/Power_(physics)). If the power per unit area, or the [intensity](https://en.wikipedia.org/wiki/Intensity_(physics)) is plotted per wavelength for a body radiating photons, then the resulting curve yields its [spectral power distribution](https://en.wikipedia.org/wiki/Spectral_power_distribution).

<canvas id="canvasPhotonPower"></canvas>
<canvas id="canvasPhotonPowerSPD"></canvas>
<input id="sliderPhotonPowerWavelength0" type="range">450nm Photons<br>
<input id="sliderPhotonPowerWavelength1" type="range">500nm Photons<br>
<input id="sliderPhotonPowerWavelength2" type="range">550nm Photons<br>
<input id="sliderPhotonPowerWavelength3" type="range">600nm Photons<br>
<input id="sliderPhotonPowerWavelength4" type="range">650nm Photons<br>

{% tangent(summary="High energy photons", open=true) %}
Shorter wavelength photons carry higher energy than longer wavelength photons. The exact [energy of a photon](https://en.wikipedia.org/wiki/Photon_energy) is described by the relation E = hc/λ — where λ is its wavelength, c is the speed of light, and h is the Planck constant. So, even for the number of photons, more power is transferred by shorter wavelength photons.
{% end %}

The spectral power distribution is fundamental to determining the 'colour' of an object.

## Photoreceptor Cells

The sun too radiates a large amount of photons, and the spectral power distribution of the sun appears similar to this:

<canvas id="canvasSPDSun"></canvas>

The intensity peaks near 500nm. Human eyes naturally evolved to become sensitive to photons with these wavelengths —  different kinds of [photoreceptor cells](https://en.wikipedia.org/wiki/Photoreceptor_cell) have evolved to become sensitive to photons of wavelengths from 400nm to around 700nm. Depending on the energy carried by the photons (their wavelength and intensity), they can 'excite' the photoreceptor cells to produce a specific response.

The human eye has two kinds of photoreceptor cells — [rod cells](https://en.wikipedia.org/wiki/Rod_cell) and three types of [cone cells](https://en.wikipedia.org/wiki/Cone_cell). The different types of photoreceptor cells are sensitive to different wavelengths of light by differing amounts — some cone cells (S-cones) will not produce a significant response to lights with longer wavelengths but other types (L-cones) will. The [sensitivity](https://en.wikipedia.org/wiki/Spectral_sensitivity) curves of the different photoreceptor cells are shown below:

<canvas id="canvasSensitivityCurves"></canvas>

{% tangent(summary="Normalized approximations", open=true) %}
The sensitivity curves shown here are normalized approximations (for simpler visualizations and calculations), and are not accurate. In reality, the sensitivity curves are less smooth, and different types of cones have differing levels of sensitivity. For example, the sensitivity of S-cones is significantly lower compared to the other cones. Similarly, rods are more sensitive to light than any of the cones.
{% end %}

The response of the photoreceptor cells to lights of different wavelengths is dependent on the spectral power distribution of the incident light, and the sensitivity of the cells. The responses generated by different photoreceptor cells for [monochromatic light](https://en.wikipedia.org/wiki/Monochromatic_radiation) (light with near singular wavelength) is shown below:

<canvas id="canvasSimpleSPD"></canvas>
<canvas id="canvasSimpleSSC"></canvas>
<canvas id="canvasSimpleRSP"></canvas>
<input id="sliderSimpleWavelength" type="range">Wavelength<br>

{% tangent(summary="Photoreceptor cell responses", open=true) %}
The response curve of the types of photoreceptor cells is the [point-wise product](https://en.wikipedia.org/wiki/Pointwise#Examples) of the spectral power distribution curve and the photoreceptor sensitivity curves. The overall response from each type of photoreceptor cell is the total area under their corresponding response curves.
{% end %}

Lights with differing wavelengths produce a unique set of responses in the three types of cones. The [different responses are perceived by the brain](https://en.wikipedia.org/wiki/Color_vision#Theories) as a colour.

<canvas id="canvasSimpleColorSPD"></canvas>
<canvas id="canvasSimpleColorSSC"></canvas>
<canvas id="canvasSimpleColorRSP"></canvas>
<div id="divSimpleColor" class="cBox"></div>
<input id="sliderSimpleColorWavelength" type="range">Wavelength<br>

{% tangent(summary="Colour Classifications", open=true) %}
There can be more or fewer colour names for these wavelengths depending on the [classification](https://en.wikipedia.org/wiki/Spectral_color#Spectral_color_terms). The color shown in the above box is an approximation and is not necessarily accurate.
{% end %}

Rods are not shown here because they do not greatly affect colour perception. In [well-lit conditions](https://en.wikipedia.org/wiki/Photopic_vision), cones might produce different responses based on the wavelength of light. But in such conditions, the rod cells produce a saturated response since rods are more sensitive to light than cones. As the response of rods in bright environments is indifferent to wavelengths, it cannot differentiate between distinct wavelengths, and therefore does not have a major impact on colour perception — in bright conditions.

<canvas id="canvasRodsLightSPD"></canvas>
<canvas id="canvasRodsLightSSC"></canvas>
<canvas id="canvasRodsLightRSP"></canvas>
<div id="divRodsLight" class="cBox"></div>
<input id="sliderRodsLightWavelength" type="range">Wavelength<br>

{% tangent(summary="Saturated response", open=true) %}
The sensitivity of the rods compared to the cones is represented here using the non-normalized curve approximations. Because of their high sensitivity, the response of rods remain saturated, and no meaningful information about the wavelength is obtained from the response. Cones on the other hand, respond differently to different wavelengths, and the varied responses can be interpreted by the brain as distinct wavelengths.
{% end %}

In [dark environments](https://en.wikipedia.org/wiki/Scotopic_vision), rods produce a response when cones do not. But unlike cones, there is only one type of rod cell; there is no other type of rod cell with a slightly different sensitivity curve to help differentiate wavelengths. So, two light sources with different wavelengths can produce the same response in rods, and there is no way to differentiate the wavelengths from the singular response of the rods. The brain evolved to perceive the response of the rods as a singular luminance value.

<canvas id="canvasRodsDarkSPD"></canvas>
<canvas id="canvasRodsDarkSSC"></canvas>
<canvas id="canvasRodsDarkBAR"></canvas>
<canvas id="canvasRodsDarkRSP"></canvas>
<div id="divRodsDarkBox" class="cBox"></div>
<input id="sliderRodsDarkWavelength" type="range">Wavelength<br>

{% tangent(summary="Wavelength ambiguity", open=true) %}
Different wavelengths can produce similar responses in the rods, and are thus perceived as similar by the brain. For example, a low intensity light of <a id="linkRodsDarkWavelengthA" style="cursor: pointer;">492nm</a> and <a id="linkRodsDarkWavelengthB" style="cursor: pointer;">536nm</a> can produce similar sets of responses in the rods, and so cyan and yellow-ish green may appear similar in the dark.
{% end %}

Since rods cannot differentiate between different wavelengths of light, they do not play a role in colour perception — regardless of whether it is dark or bright.

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
If the sensitivity curves of the M-cones overlap the sensitivity curves of the L-cones, then different wavelengths of light (for eg. <a id="linkBlindWavelengthA" style="cursor: pointer;">568nm</a> and <a id="linkBlindWavelengthB" style="cursor: pointer;">618nm</a>) can produce similar sets of responses in the cones — causing them to appear similar.
{% end %}

The type of cone anomaly determines the type of colour blindness. The sensitivity curve of the L-cones may shift towards shorter wavelengths (protanomaly), or the sensitivity of the M-cones can skew towards longer wavelengths (deuteranomaly). Some people might also lack functional L-cones (protanopia) or M-cones (deuteranopia) entirely. The result is similar in all the cases — reds and greens look similar. In very rare cases, people can have non-functional S-cones, resulting in tritanomaly and tritanopia.

<canvas id="canvasBlindBARNR"></canvas>
<canvas id="canvasBlindBARPP"></canvas>
<canvas id="canvasBlindBARDP"></canvas>
<canvas id="canvasBlindBARTP"></canvas>

{% tangent(summary="Colour blindness types", open=true) %}
The bars represent how colours of different wavelengths might appear to people with colour blindness. The first bar shows colours appear to people with normal cone cells. The second bar shows colours for people with protanopia, and the third depicts colours as perceived by people with deuteranopia. The fourth bar represents how colours appear to people with tritanopia.
{% end %}

In extremely rare cases, people might have only S-cones or no cone cells at all. Both will result in [total colour blindness](https://en.wikipedia.org/wiki/Monochromacy#Humans) since there is no mechanism for differentiating light with different wavelengths.

### Non-Spectral Colours

All the examples in the above subsections were about [spectral colours](https://en.wikipedia.org/wiki/Spectral_color) — light with very narrow bands of wavelengths. But not all colours are spectral colours. <a id="linkNonSpectralSPDGrey" style="cursor: pointer;">Greys</a> and <a id="linkNonSpectralSPDPurple" style="cursor: pointer;">purples</a> are examples of non-spectral colours — colours that are made up of a combination of multiple different wavelengths of light. <a id="linkNonSpectralSPDPink" style="cursor: pointer;">Pink</a> and <a id="linkNonSpectralSPDOlive" style="cursor: pointer;">olive-green</a> are more other examples of non-spectral colours.

<canvas id="canvasNonSpectralSPD"></canvas>
<canvas id="canvasNonSpectralSSC"></canvas>
<canvas id="canvasNonSpectralRSP"></canvas>
<div id="divNonSpectral" class="cBox"></div>

{% tangent(summary="Interactive spectral power distribution", open=true) %}
The spectral power distribution can be modified by drawing on it.
{% end %}

Non-spectral colours can look different from spectral colours because the set of cone responses produced for non-spectral colours may be different from the set of responses produced for spectral colours. The brain interprets these unique cone responses as a different colour.

Multiple wavelengths of light together can however also produce a response that is very similar to the response produced by spectral colours — making them appear similar to spectral colours.

### Metamerism

The fact that multiple wavelengths of light can be used to mimic spectral colours was explored in colour matching experiments by [William David Wright](https://doi.org/10.1088/1475-4878/30/4/301) and [John Guild](https://doi.org/10.1098/rsta.1932.0005). Lights with three wavelengths (435nm, 546nm, and 700nm) of differing intensities were mapped to spectral colours by varying the intensities of its constituent monochromatic lights such that the resultant light was perceived to be the same as a spectral colour. The findings were then summarized, and the observations resulted in a standardized colour-matching curves.

<!-- response curves cie rgb cmf ![spd of single wavelength light on left above; response curve below; and product of both bottom; slider for wavelength but grayed out slider for intensity below bottom; grayed out sliders for 700nm and 546nm light may appear and disappear depending on wavelenght; the sliders have grayed out wavelenths (fixed at 700/546nm) and grayed out (but moveable) sliders for intensity; spd of three wavelengths on right above; response curve below; and product of both bottom; grayed out sliders for wavelenghts (grayed out and stays fixed as well) and intensity (grayed out moves) of light sources; separate cone responses for both graphs below respective graphs](/media/lab/quantifying-colours/samp.png) -->

{% tangent(summary="Negative intensity", open=true) %}
Adding colours to one side is equivalent to subtracting colours from the other side (inferred from [Grassman's laws](https://en.wikipedia.org/wiki/Grassmann%27s_laws_(color_science))). In the colour matching experiment, adding light to the spectral colour being compared is represented as subtracting from the colour matching function curves — resulting in negative intensity.

Physically, it is impossible to create light with negative intensity, so it is impossible to reproduce certain colours using only three wavelengths of light. However, colours can still be represented *theoretically* using negative values.
{% end %}

The three wavelengths of light together produce identical responses to spectral colours in the cones — making them appear similar. So certain spectral colours can be recreated using only three monochromatic sources of light. But there is also a subset of spectral colours which cannot be replicated using only the three wavelengths of light.

While the experiment had used three spectral colours to replicate most spectral colours, the same three wavelengths can also be used to replicate non-spectral colours. Light with other wavelengths or different spectral power distributions can be used to reproduce other spectral and non-spectral colours as well. In general, bodies with [different spectral power distributions](switch#below) can be perceived as same colours as long as they generate identical responses in cones. This phenomenon is called [metamerism](https://en.wikipedia.org/wiki/Metamerism_(colour)).

<!-- response curves metamerism cmf ![spd on left above; spd on right above; identical response curves below on both left and right; separate products at the bottom on left and right; show cone response bars below bottom; make the spd drawable; if drawing is not feasible, make it such that the "different spd" link cycles through various metamer spds — every time it is clicked;](interactive) -->

## Colour Space

Since the responses generated by the L-cones, M-cones, and S-cones correspond to a colour, a set of (L,M,S) values can identify a colour. The set of (L,M,S) values can also be mapped as points in a three dimensional space — a colour can be described as a point on this space. As this space can describe colours, it is aptly called a [colour space](https://en.wikipedia.org/wiki/Color_space).

{% tangent(summary="Measuring LMS values" open=false) %}
The (L,M,S) values is the total response of their respective cones. The total response of each cone is simply the area under their corresponding response curves, and the response curves of the cones are the pointwise product of their normalized sensitivity curves and the spectral power distribution. So, if `J(λ)` is the spectral power distribution of the light source, and `l(λ)`, `m(λ)`, and `s(λ)` are the sensitivity curves of the L-cones, M-cones, and S-cones — then the L, M, and S values is given by:\
`L = ∫ J(λ)·l(λ)·dλ`\
`M = ∫ J(λ)·m(λ)·dλ`\
`S = ∫ J(λ)·s(λ)·dλ`
{% end %}

In this case, the colour space is the [LMS colur space](https://en.wikipedia.org/wiki/LMS_color_space) — where a colour can be described as a set of (L,M,S) values in this space.

<!-- lms space ![LMS colour cube on left — isomorphic projection; sliced plane of cube on right for specific value of L — plane has (M, S) as coordinates — show point on place corresponding to M S values; sliders for 'L, M, S response' below/at bottom; colour box on right of sliders; https://www.psy.ritsumei.ac.jp/akitaoka/LMS_color_space.html; show impossible colours](static/interactive-maybe3d) -->

{% tangent(summary="Impossible colours", open=true) %}
While all colours can be represented using LMS values, the reverse is not always true. Not all LMS values correspond to perceivable colours. The sensitivity curves of the M-cones overlaps the sensitivity curves of L-cones and S-cones. Any type of light that excites the M-cones, must also excite the L-cones, or S-cones, or both. So 'colours' having LMS values such as (0,1,0) are [imaginary](https://en.wikipedia.org/wiki/Impossible_color#Imaginary_colors) and physically impossible.
{% end %}

The LMS colour space is one way to describe colours. But there are other ways as well. While fundamental, the LMS colour space is not the standard reference for describing colours — it is the [CIE 1931 colour spaces](https://en.wikipedia.org/wiki/CIE_1931_color_space).

### CIE 1931

In the Wright-Guild colour matching experiments, three wavelengths of light were used to recreate spectral colours by varying the intensity of the individual constituent lights. The same three wavelengths can also be used to produce non-spectral colours.

All these spectral and non-spectral colours can again be represented as a set of three intensity values — for each of the three wavelengths. The set of intensity values can again be represented as points in some space. Colours can be described as points in this space as well, and this colour space is called the [CIE RGB colour space](https://en.wikipedia.org/wiki/CIE_1931_color_space#CIE_RGB_color_space).

<!-- rgb space ![RGB colour space cube on left; slice of plane on right; similar to LMS color space; sliders should explicitly mention 'Xnm intensity' and not cone response; colour box on right of sliders;](interactive) -->

{% tangent(summary="CIE RGB space bases", open=true) %}
The CIE RGB colour space uses as lights of 700nm (R), 546nm (G), and 435nm (B) as its [primaries](https://en.wikipedia.org/wiki/Primary_color#Real_primaries) (colours used to recreate other colours). The LMS colour space, in contrast, used the response of the cones (L,M,S) as its bases.
{% end %}

Mapping spectral colours in the CIE RGB colour space results in the [spectral locus](https://en.wikipedia.org/wiki/Spectral_color#In_color_spaces). This curve represents the intensity of RGB primaries required to replicate spectral colours — it is simply the Wright-Guild colour-matching curves mapped in the CIE RGB colour space.

<!-- rgb space spectral locus ![spectral locus mapped on CIE RGB color cube; sliced plane on right — like earlier; slider for wavelength;](interactive) -->

Because of the way the colour space is constructed, parts of the spectral locus have negative RGB values. This means that certain spectral (and non-spectral) colours have to be described using negative values in the CIE RGB colour space.

It was decided that a colour space that could map all colours to non-negative values would have been preferable. But instead of conducting more experiments to construct a new colour space, the existing CIE RGB colour space could also be transformed using simple linear transformations. The transformation of the three dimensional colour space can then be defined by a 3x3 matrix:

<!-- color space transformation matrix ![colour space with spectral locus with bouding boxes drawing with dotted lines on left — also has three orthogonal lines to depict primaries; arrow with matrix below the arrow in middle; transformed space on the right — transforming space transforms primaries — use red, green, blue for old primaries that change with space transform — but also include gray orthogonal lines that stay in place regardless of transform; below inputs for matrix on left; on right of matrix inputs include views depicting top, side and front views — option to select which view — include transformed primaries and fixed orthogonal primaries; include transformation from https://en.wikipedia.org/wiki/File:CIE1931_RGBCMF.svg to https://en.wikipedia.org/wiki/File:CIE_1931_XYZ_Color_Matching_Functions.svg;](interactive) -->

{% tangent(summary="Colour space transformations", open=true) %}
Linear transformation of colour spaces is possible since human colour perception is nearly linear. The linearity of colour perception in humans is again inferred from Grassman's laws.
{% end %}

[Transforming](switch#transformToXYZ) the space means the new space is now defined by different new bases or new primaries. Earlier, some spectral colours had to be defined by negative values of a primary, but now the same colour is defined by positive values. It suggests that the coordinate system (the primaries) itself has to contain some sort of a negative intensity. But it is impossible for light to have negative intensity, implying that the primaries for the new colour cannot physically exist, and are imaginary.

Since the primaries of the new colour space are imaginary, it is reasonable to define the new primaries to represent more abstract concepts instead of physical quantities. Again, it was decided that one of the primaries would define the [luminance](https://en.wikipedia.org/wiki/Luminance) of the colour. The other two can be used to derive its [chromaticity](https://en.wikipedia.org/wiki/Chromaticity). One of the two primaries is also roughly equal to the response of the S-cones. The primaries of this new colour space are named X, Y, and Z — and the resulting colour space is called [CIE XYZ colour space](https://en.wikipedia.org/wiki/CIE_1931_color_space#Meaning_of_X,_Y_and_Z).

The Y primary represents the luminance of a colour, while the X and Z primaries loosely defining its chromaticity. The Z primary also closely matches the response of the S-cone.

{% tangent(summary="Luminance and chromaticity", open=false) %}
Luminance refers to the perceived brightness of a colour, while chromaticity is analogous to hues. According to the [opponent process](https://en.wikipedia.org/wiki/Opponent_process) theory, colours are perceived as pairs of opposing colours — red vs green, blue vs yellow (chromaticity), and black vs white (luminance). Hence, it is possible to describe a colour by how red it is compared to how green it is, how blue it is compared to how yellow it is, and how bright the overall colour is — ie. defining colours based on luminance and chromaticity values.
{% end %}

Similar to how the sensitivity of different cones can be measured, the average sensitivity of all the cones can also be measured — resulting in a curve that effectively functions as a [luminosity sensitivity curve](https://en.wikipedia.org/wiki/Luminous_efficiency_function):

<!-- photopic curve ![photopic vision luminosity function](static) -->

This curve can also be approximated as a weighted sum of the individual RGB colour matching function curves:

<!-- photopic linear combination ![three color matching function curves side-by-side on left — with number values below them denoting weights — add symbol between them; equal symbol between input curves on left and output curve on right; output curve on right; output curve also has fixed luminosity function curve in gray;](interactive) -->

The [factors](switch#above) represent how much the RGB primaries contribute to the overall brightness or luminance of a colour. But the luminance of a colour is the Y primary in the XYZ colour space. So the factors represent how much each of the RGB primaries contribute to the Y primary in the XYZ colour space — and forms one row of the transformation matrix:

<!-- colour-space-transform-matrix-photopic-fixed ![colour space transform as above; matrix transform but with time with fixed middle rows; include transformation from https://en.wikipedia.org/wiki/File:CIE1931_RGBCMF.svg to https://en.wikipedia.org/wiki/File:CIE_1931_XYZ_Color_Matching_Functions.svg;](interactive) -->

The X and Z primaries was defined such that the new colour space fulfilled [other certain properties](https://en.wikipedia.org/wiki/CIE_1931_color_space#Construction_of_the_CIE_XYZ_color_space_from_the_Wright%E2%80%93Guild_data) decided by the CIE — resulting in a transformation matrix with values:

<!-- colour-space-transform-matrix-all-fixed ![matrix transform as above; fixed values for matrix; include transformation from https://en.wikipedia.org/wiki/File:CIE1931_RGBCMF.svg to https://en.wikipedia.org/wiki/File:CIE_1931_XYZ_Color_Matching_Functions.svg;](interactive/static) -->

The X and Z primaries do not directly represent the chromaticity of a colour, but can be used to derive it. To understand how the X and Z primaries can be used to derive the chromaticity in the CIE XYZ colour space, it first helps to understand how the same can be achieved in the CIE RBG colour space.

### Chromaticity

In the CIE RGB colour space, the sum of the intensity of its primaries (R+G+B) can act as a crude approximation for luminance of a colour, while the ratios between the intensities of the RGB primaries can serve as an approximation for a colour's chromaticity. The ratios r, g, b representing the chromaticity of the R, G, B primaries respectively can then be calculated by normalizing out the total intensity of the primaries:

`r = R/(R+G+B)`\
`g = G/(R+G+B)`\
`b = B/(R+G+B)`

{% tangent(summary="Luminance-chromaticity estimates", open=false) %}
While the luminance and chromaticity are approximations, it does not mean that there is loss of information. The exact RGB values can be recreated using the luminance and chromaticity estimates. The approximation simply refers to the imperfect separation of luminance and chromaticity.
{% end %}

In the CIE RGB colour space, all the colours with a luminosity value of one will lie on the plane R+G+B = 1. The plane is a triangle bounded by the points (1,0,0), (0,1,0), and (0,0,1).

<!-- rgb-space-fixed-luminance-slice ![sliced plane RGB space — https://jamie-wong.com/images/color/TriangleSliceRGB.png](static) -->

The chromaticity values (r,g,b) of the colours on this plane are simply the (R,G,B) values, since the luminosity is one — the ratios are already normalized.

<!-- rgb-space-fixed-luminance ![sliced plane RGB space on top on left; 2d plane for R+G+B=1 as another figure on right of cube; sliders for (R,G,B) below on left; L as a progress bar (non-adjustable; fixed to 1); stacked horizontal bar chart bars for (r,g,b) on right of RGB slider — but maybe include numerial values below too; increasing any one of the RGB values decreases the remaing two primaries (proportionally, such that the ratio bewteen the other primaries is maintained; maybe or maybe not emphasize that r=R, g=G, b=B); see below visualisation for more info — make both of them look similar — exceptions being the fixed luminance to one — and no chromaticity line projection thingy — and only one sliced plane; plot (R,G,B) and (r,g,b) as points on both the sliced plane in the cube figure and the 2d plane figure](interactive) -->

A colour having some other luminance k would lie on the plane R+G+B = k — the plane in the CIE RGB colour space bounded by (k,0,0), (0,k,0,), and (0,0,k). The chromaticity values (r,g,b) are derived by normalizing the (R,G,B) values. Geometrically, it is the same as scaling the plane, or projecting the point on the R+G+B = 1 plane.

<!-- rgb-space-variable-luminance ![greyed out sliced plane R+G+B=1 space on top; another greyed out plane for R+G+B=k; 2d sliced plane for R+G+B=1 (NOT R+G+B=k) as another figure on right of cube; sliders for RBG below; k values as a progress bar (non adjustable — determined by RGB values — max value 3 I guess) on right of sliders; rgb values (non-adjustable, determined by RGB values) as a stacked proportional horizontal bar chart type bar — https://media.geeksforgeeks.org/wp-content/uploads/20200923090400/1.PNG — but numerical values below; plot (R,G,B) on the R+G+B=k plane on the cube figure; plot (r,g,b) as points on the plane R+G+B=1 in the sliced plane cube figure, as well as the separate plane figure on the right; in the cube figure include a faint line joining (0,0,0) to (R,G,B) passing through (r,g,b) to signify projection;](interactive) -->

{% tangent(summary="Dimensionality reduction", open=false) %}
The line connecting a point (R,G,B) to the origin (0,0,0) can be thought of as lines of chromaticity. Points on the same line but at different distances represent colours with the same chromaticity but different luminance values. The (r,g,b) values are the projection of the points on the R+G+B =1 plane — so colours having the same chromaticity but different luminance values get projected on the same point, leading to [loss of information](https://en.wikipedia.org/wiki/Dimensionality_reduction).

The chromaticity plane contains information about chromaticity, and generally does not contain any information about luminance. So unless luminance is explicitly specified, it is impossible to recreate the corresponding RGB values using just the (r,g,b) values.
{% end %}

Since (r,g,b) values denote ratios, r+g+b is always equal to one. It makes one of the three values redundant. Knowing two, the third can be deduced by subtracting the other two values from one. The values for r and g are kept, and b is discarded. Geometrically, it can be represented by projecting points on the R+G+B = 1 plane to the RG plane.

<!-- rg-plane ![greyed out sliced plane R+G+B=1 space on top; another greyed out plane for R+G+B=k; 2d sliced plane for R+G+B=1 (NOT R+G+B=k) as another figure on right of cube — in the middle; rg plane on the right — right of separate sliced 2d plane figure — maybe make it selectable to choose rg-plane, gb-plane or rb-plane OR make a smooth transition between rg-plane and R+G+B=1 plane; sliders for RBG below; k values as a progress bar (non adjustable — determined by RGB values — max value 3 I guess) on right of sliders; rgb values (non-adjustable, determined by RGB values) as a stacked proportional horizontal bar chart type bar — https://media.geeksforgeeks.org/wp-content/uploads/20200923090400/1.PNG — but numerical values below; plot (R,G,B) on the R+G+B=k plane on the cube figure; plot (r,g,b) as points on the plane R+G+B=1 in the sliced plane cube figure, as well as the separate plane figure on the right — as well as the rg-plane diagram; in the cube figure include a faint line joining (0,0,0) to (R,G,B) passing through (r,g,b) to signify projection;](interactive) -->

{% tangent(summary="The rg plane", open=true) %}
While the points are projected on the RG plane, it is represented as the rg plane because RG and rg represent different quantities. The values (r,g) represent the chromaticity of a colour, while (R,G) values represent the intensity of R and G primaries.
{% end %}

These projections result in a chromaticity plane that describes the chromaticity of a colour using (r,g) values. However, the [rg chromaticity space](https://en.wikipedia.org/wiki/Rg_chromaticity) cannot describe all possible chromaticity of colours with positive values since the CIE RGB colour space itself cannot. But the same idea can be translated for the CIE XYZ colour space.

Similar to how colours were projected on the rg plane in the CIE RGB colour space, the same can be projected on the xy plane in the CIE XYZ colour space. However in this colour space, the bases are imaginary and the only colours that have been mapped so far are the spectral colours. So the chromaticity of spectral colours are first mapped on the xy plane.

<!-- xy-plane-spectral-locus ![greyed out sliced plane X+Y+Z=1 space on top; another greyed out plane for X+Y+Z=k — k determined by wavelength parameter; 2d sliced plane for X+Y+Z=1 (NOT X+Y+Z=k) as another figure on right of cube — in the middle; rg plane on the right — right of separate sliced 2d plane figure — maybe make a smooth transition between xy-plane and X+Y+Z=1 plane; slider for wavelength of specteal colour; xyz values (non-adjustable, determined by wavalength parameter) as a stacked proportional horizontal bar chart type bar — https://media.geeksforgeeks.org/wp-content/uploads/20200923090400/1.PNG — but numerical values below; plot (X,Y,Z) on the X+Y+Z=k plane on the cube figure; plot (x,y,z) as points on the plane X+Y+Z=1 in the sliced plane cube figure, as well as the separate plane figure on the right — as well as the xy-plane diagram; in the cube figure include a faint line joining (0,0,0) to (X,Y,Z) passing through (x,y,z) to signify projection;](interactive) -->

{% tangent(summary="Meaning of xy", open=true) %}
The nomenclature used in the CIE XYZ colour space to describe the chromaticity of colours is analagous to the naming convention used in the CIE RGB colour space. So `x = X/(X+Y+Z)` and `y = Y/(X+Y+Z)`.
{% end %}

If two points can define a line in the xy plane, a point on that line can be represented as the ratio of these two points:

<!-- xy-plane-spectral-locus-line ![horseshoe curve on xy plane; line crossing through x,y axes; two points for selecting line — draggable on the xy plane — maybe make it so the line always lies inside positive (triangle quadrant?); point on line — determined by the ratio slider; two sliders for ratio of two primaries — sum is one — increasing one decreases the other; stacked horizontal bar chart type bars on right of sliders showing ratio of two primaries — on left of bar char bar the (x,y,z) coordinates of one draggable point — on right of bar the (x,y,z) coordinates of the other draggable point;](interactive) -->

But the line can also [intersect the spectral locus](switch#below). Then, the point can also be represented as the ratio of the points on the spectral locus:

<!-- xy-plane-spectral-locus-line-ratios ![same as above; but include new (keep the original bar) and separate stacked horizontal bar chart for ratio of showing spectral colour intensities — emphasize ratio of spectral intensities;](interactive) -->

But the points on spectral locus represent the chromaticity of spectral colours — colours which can be physically perceived. A point in the xy plane can be defined as (x,y) values or as the ratio between the intensity of two (or more) spectral colours.

{% tangent(summary="Colour perception linearity", open=false) %}
The ratio between the intensity of the primaries, ie. (x,y) values, is equal to the ratio between the intensity of the spectal colours because colour perception is linear. The near linearity of human colour perception is again inferred from Grassman's laws.
{% end %}

All the points inside the spectral locus are all non-spectral colours and their chromaticity can be represented as the ratio between the intensity of other spectral colours. If all these colours, along with all the spectral colours are mapped in the xy plane, it results in the [CIE xy chromaticity diagram](https://en.wikipedia.org/wiki/CIE_1931_color_space#/media/File:CIE1931xy_blank.svg):

<!-- xy-plane-cie ![cie xy diagram without planckian locus and white points — just outline (with spectral locus wavelegnth labels — huge maybe) and chromaticity](static) -->

The chromaticity (and colours) outside the spectral locus are imaginary, but all the points inside contain the chromaticity of all colours perceviable by an average human. As the CIE xy chromaticity diagram can represent all perceivable chromaticities, it is often used for comparing other colour spaces.

{% tangent(summary="The xy plane to compare colour spaces", open=false) %}
The xy chromaticity diagram represents a *chromaticity* space, not a *colour* space. Using a chromaticity space to compare colour spaces is not perfectly accurate, since luminance information cannot be compared. However comparing chromaticity information is simpler, and sufficient in certain cases. For a more complete comparison of colour spaces, the CIE XYZ colour space is generally used as the standard reference instead.
{% end %}

{% tangent(summary="CIE xyY colour space", open=false) %}
The CIE xy chromaticity diagram represents chromaticity, but not colours since there is no information about luminance. Adding a luminance component allows it to represent colours, forming a colours space. In the RGB colour space the luminance of a colour was approximated as the sum of the primaries, but in CIE XYZ space the luminance is already somewhat accurately described by the Y primary — which means it can be represented using the Y primary. The chromaticity (x,y) along with luminance Y forms the CIE xyY colour space.
{% end %}

## Gamut

As mentioned, the chromaticity of a colour can be described by the ratio of the intensity of two monochromatic colours. Conversely, two monochromatic light sources can produce colours having a chromaticity that lies on the line joining the corresponding two points in the CIE xy plane:

<!-- xy-plane-cie-gamut-line ![similar diagram as the line joining xy plane with a point — line and point determined by sliders; make line endpoints un-draggable — instead determined by two sliders for wavelengths — endpoints would lie on spetral locus; two more sliders determines relative intensity of both primaries — increasing intensity of one decreases the other; stacked horizontal bar chart bar to show ratios of primaries;](interactive) -->

Adding a third monochromatic light allows for more combinations of ratios of among the primaries — greatly expanding the chromaticty of colours that can be recreated:

<!-- xy-plane-cie-gamut-line-ratios ![xy plane with faint dotted triangle outline — vertices determined by sliders; make line endpoints un-draggable — instead determined by three sliders for wavelengths — vertices would lie on spetral locus; three more sliders determines relative intensity of primaries — increasing intensity of one decreases the other two — such that the ratio between the other two is preserved; stacked horizontal bar chart bar to show ratios of primaries; two solid distinct lines on xy plane and show final point as point on a line — and the line is determined by a point on another line — similar to https://graphics.stanford.edu/courses/cs148-10-summer/docs/2010--kerr--cie_xyz.pdf PAGE 13 — but make the point and lines adjustable using sliders;](interactive) -->

Using more sources of monochromatic light generally results in a bigger chromaticity space that can be physically recreated by the light sources:

<!-- xy-plane-cie-gamut-polygon ![mostly same as above; but instead of triangle, a convex polygon — number of vertices (max 5, min 2) determined by checkboxes; same sliders as above, but five this time — unselecting the primary disables the slider and ratio bar (and sliders) gets accordingly reset;](interactive) -->

The primaries define a [convex polygon](https://en.wikipedia.org/wiki/Convex_polygon), which represents the chromaticity of colours that can be physically recreated by the primaries. This range of colours (chromaticities) that the primaries can produce is called its [gamut](https://en.wikipedia.org/wiki/Gamut). Points lying outside the polygon cannot be physically created, since it would require creating light with negative intensity. 

The gamut of the original CIE RGB primaries on the CIE xy chromaticity diagram would then look like this:

<!-- xy-plane-cie-gamut-rgb ![xy plane with solid triangle outline — vertices fixed at CIE RGB primaries; three more sliders determines relative intensity of primaries — increasing intensity of one decreases the other two — such that the ratio between the other two is preserved; stacked horizontal bar chart bar to show ratios of primaries; two faint lines on xy plane and show point as point on a line — and the line is determined by a point on another line — similar to https://graphics.stanford.edu/courses/cs148-10-summer/docs/2010--kerr--cie_xyz.pdf PAGE 13 — but make the point and lines adjustable using sliders;](interactive) -->

{% tangent(summary="CIE RGB chromaticity gamut", open=true) %}
It has been stated that the CIE RGB cannot physically reproduce certain colours and this is yet another representation of the same idea. Although in this case, the diagram represents the *chromaticities* that cannot be reproduced, instead of the exact colours.
{% end %}

The gamut of the display devices depends on its primaries. It is economically efficient to use just three primaries — which are not purely monochromatic. Certain colour spaces are designed keeping such gamut constraints in mind, such as the [sRGB](https://en.wikipedia.org/wiki/SRGB) colour space or the [DCI-P3](https://en.wikipedia.org/wiki/DCI-P3) colour space.

<!-- xy-plane-cie-gamut-any ![cie xy chromaticity diagram; triangles/convex polygons overlaid on top depending on colour space chosen; menu select for colour space;](interactive) -->

{% tangent(summary="Gamut & Colour space", open=true) %}
Gamut refers to the set of colours that can be physically recreated by an output device, while a colour space is simply a mathematical model used to describe colours. Colour spaces may arbitrarily restrict itself to certain values to more accurately represent physical and economic constraints.
{% end %}

## White Point

Back to some physical science — all bodies radiate photons, due to [blackbody radiation](https://en.wikipedia.org/wiki/Black-body_radiation). The spectral power distribution of the radiation is a [function of temperature](https://en.wikipedia.org/wiki/Planck%27s_law#The_law):

<!-- spd-blackbody ![black coloured spherical body radiating photons; spd below; slider for temperature bottom;](interactive) -->

{% tangent(summary="Blackbody", open=true) %}
A blackbody is an idealized body that does not reflect any light and only emits blackbody radiation. Most bodies in the universe are not technically not (perfect) blackbodies, but approximating it as such is still useful nonetheless.
{% end %}

The spectral power distribution of the radiation will have a colour associated with it:

<!-- response-curves-colour-box-blackbody ![spd on top — dependent on slider for temperature; another spd below — zoomed in on range 400nm-700nm — maybe show lines on above spd to indicate it is zoomed in view of the above spd; sensitivity curve graph of photoreceptor cells below; response curve of above two graphs below — shade the areas below with colour of photoreceptor type (rod=black,s=blue,m=greenish,l=yellowish-to-red); slider for temperature at bottom below all graphs; show amount of response of each type of receptors (rods and cones) as a sort of (progress/without sliding knob) bars on the right of the sliders for wavelength and intensity of photons; eg: https://jamie-wong.com/images/color/ConeExcitation1.png — combine all the three coloumns to one graph; keep rows separate; small colour box below or next to right to response (progress-like) bar, showing colors BUT NO colour names below the box; highlight response of cones progress bars and cones curves — by greying/reducing contrast of rods response progress bars, rods sensitivity curves, and rods response curves;](interactive) -->

The colours above have a corresponding chromaticity — and when mapped on the CIE xy chromaticity diagram, form the [planckian locus](https://en.wikipedia.org/wiki/Planckian_locus):

<!-- xy-plane-cie-planckian-locus ![cie xy chromaticity diagram with faint planckian locus (NO correlated colour temp lines) with correlated colour temperature lines; point on the locus — determined by temperature; reuse slider for temperature above;](interactive) -->

The [colour temperature](https://en.wikipedia.org/wiki/Color_temperature) is another way to describe certain colours and chromaticities — mostly different types of white. It is a common way to do it, as most physical sources of illumination have a chromaticity close to these values. Daylight, for example, has a chromaticity similar to a blackbody at temperatures ranging from 5000K to 6500K, and incandescent bulbs emit light having a colour temperature close to 2700K.

{% tangent(summary="Daylight colour temperature", open=false) %}
Incandescent bulbs have filaments heated to about 2000K to 2700K and thus have colour temperature close to that temperature. But the same is not true for sunlight as its colour temperature depends on the time of day. Due to [rayleigh scattering](https://en.wikipedia.org/wiki/Rayleigh_scattering), shorter wavelengths of sunlight get scattered making it appear redder, while making skies and overcast light appear bluer. During mornings and evenings when the sun is lower in the sky, more light gets scattered causing sunlight to appear even redder (have a lower colour temperature). Daylight is the combination of all direct and indirect sunlight, and thus also depends on the time of day.
{% end %}

Most illuminants have chromaticty values that lie close to the planckian locus, but do not lie exactly on it — as most bodies are not perfect blackbodies. Also, incadescent lights have been phased out by [flourescent lights](https://en.wikipedia.org/wiki/Fluorescent_lamp#Color_temperature) and [LEDs](https://en.wikipedia.org/wiki/Light-emitting_diode#White_LEDs), which do not use thermal radiation to emit light, and also do not lie on the planckian locus:

<!-- xy-plane-cie-planckian-locus-white-points ![cie xy chromaticity diagram with faint planckian locus; chromacity points of (non-standard) illuminants mapped on the plane;](static) -->

While the chromaticity values of these illuminants do not lie on the planckian locus, they are still close enough to be perceptually similar to be meaningfully attributed to a colour temperature. These can be assigned a [correlated colour temperature](https://en.wikipedia.org/wiki/Correlated_color_temperature) based on the colour temperature it most closely resembles.

Correlated colour temperatures can also be mapped alongside the planckian locus:

<!-- xy-plane-cie-planckian-locus-cct ![cie xy chromaticity diagram with planckian locus with correlated colour temperature lines](static) -->

{% tangent(summary="Correlated colour temperature lines", open=true) %}
The lines intersecting the planckian locus represent correlated colour temperatures. Two points on a correlated colour temperture line have the same correlated correlated colour temperature.
{% end %}

Correlated colour temperature can describe non-ideal blackbodies and other sources of white light. But since a single correlated colour temperature can correspond to multiple chromaticity values, it is not a precise way to describe white light.

To represent different types of white light in an umabiguous way, [standard illuminants](https://en.wikipedia.org/wiki/Standard_illuminant) have been defined — theoretical souces of light having a definitive spectral power distribution, and therefore an exact chromaticity value.

<!-- xy-plane-cie-planckian-locus-standard-illuminants-spd ![spd for illuminants above; cie xy diagram with faint planckian locus and correlated colour temperature below; points showing chromaticity standard illuminant; more info about selected standard illuminant — eg. D65: Represents average daylight, etc;](static) -->

Having a standard and precise way to define illumination sources is necessary because of [chromatic adaptation](https://en.wikipedia.org/wiki/Chromatic_adaptation). Human colour perception adjusts for variations in illumination to preserve colours of objects. Two colours might appear white despite having different 'true' colours because of varying lighting conditions.

<!-- different-white-points ![comparison reddish white vs bluish white — http://brainden.com/images/color-cube-big.jpg, or image similar to white-golden or blue-black dress image; https://upload.wikimedia.org/wikipedia/commons/a/a3/Wikipe-tan_wearing_The_Dress_reduced.svg](static) -->

{% tangent(summary="Colours under different lighting", open=true) %}
Same colours might look different under different lighting conditions and vice versa. [The dress](https://en.wikipedia.org/wiki/The_dress) is a popular, albeit an extreme example. The same colours can be perceived as either blue and black, or white and golden — depending on the perceived lighting.
{% end %}

Specifying a [white point](https://en.wikipedia.org/wiki/White_point) acts as a reference point for a colour space — to adjust for different viewing mediums and environments. Most colour spaces use the chromaticity of standard illuminants to define their white point.

<!-- xy-plane-cie-white-point ![cie xy chromaticity diagram; make it similar to gamut selection with RGB primaries; but with faint white point; draggable white point; similar sliders as before;](interactive) -->

{% tangent(summary="White as reference point", open=true) %}
Dragging the white point to [D65](switch#) or [4500K](switch#) shows how the chromaticity gets transformed to take into account the effects of [chromatic adaptation](https://en.wikipedia.org/wiki/Chromatic_adaptation).
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

<!--
https://youtu.be/gnUYoQ1pwes?t=632
Assign (switch#) links a class and make them distinct from other links.
maybe show values next to all sliders
-->

<script src="/scripts/quantifying-colour.js"></script>
<style>.cBox { width: 4rem; height: 2.5rem; float: right; margin: 0 0.5rem; font: 0.75rem "JetBrains Mono"; text-align: center; vertical-align: middle; line-height: 2.5rem; border: 0.0625rem solid #000; }</style>
