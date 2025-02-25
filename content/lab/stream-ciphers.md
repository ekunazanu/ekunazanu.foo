+++
title = "Stream Ciphers"
description = "Exploring stream ciphers, mostly ChaCha20-Poly1305."
weight = 3
draft = true
template = "article.html"
[extra]
type = "article"
thumbnail = "lab.bits.svg"
thumbnailalt = "Lines of dashes of variable width representing bits."
+++

Encryption is a way to encode data so that only people who have 'keys' to the encoded data can 'unlock' or decrypt it. Depending on the type of keys used, encryption schemes can be broadly classified into two main categories.

The first kind uses a single key to both encrypt and decrypt data, and is called [symmetric key cryptography](https://en.wikipedia.org/wiki/Symmetric-key_algorithm). The second type utilizes separate keys for encryption and decryption, and is known as [asymmetric key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography).

This post is about symmetric key cryptography — and more specifically, the ChaCha20-Poly1305 cipher.

## Caesar Cipher

One of the simplest encryption techniques includes the [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher), a type of [simple substitution cipher](https://en.wikipedia.org/wiki/Substitution_cipher#Simple). The message to be encrypted (called plaintext) is encoded by substituting its letters with the corresponding letters from an alphabet that is 'shifted' or 'rotated' by some amount:

<canvas id="canvasCaesar"></canvas>
<input id="inputCaesar"><br>
<input id="sliderCaesar" type="range">Shift: <span id="spanCaesar"></span>

If the letters are encoded as a number determined by its position in the alphabet, then the encrypted letter for a plaintext letter `m` is `E(m) = (m + k) mod 26`, where `k` is the shift value. The encrypted message is often referred to as the ciphertext. Decryption has to reverse the encryption operation. So the decrypted letter for the ciphertext letter `c` is then `D(c) = (c - k) mod 26`.

<canvas id="canvasCaesarDecrypt"></canvas>

{% tangent(summary="Modulo Operation", open=true) %}
The `mod` or [modulo operator](https://en.wikipedia.org/wiki/Modulo) returns the remainder after division by a number. The divisor in this case is 26, or the numbers of letters in the Latin alphabet.
{% end %}

[ROT13](https://en.wikipedia.org/wiki/ROT13) is a special case of a Caesar cipher, having a shift value of 13. The Latin alphabet has 26 letters; shifting the alphabet up by 13 positions is the same as shifting it down by 13 positions — so decryption is effectively the same as encryption. That is, for a plaintext message `m` and ciphertext `c`:

`E(m) = (m + 13) mod 26 = (m - 13) mod 26 = c`\
`D(c) = (c + 13) mod 26 = (c - 13) mod 26 = m`

The only difference between encryption and decryption is the domain of the operators. While one operates on plaintexts, the other operates on ciphertexts — but that difference is purely in semantics.

<canvas id="canvasRot13"></canvas>
<input id="inputRot13"><br>
<input id="sliderRot13" type="range" disabled> Shift: <span id="spanRot13"></span>

{% tangent(summary="Same operation for encryption and decryption", open=true) %}
Since shifting the alphabet by thirteen letters upwards (addition) is the same as shifting it downwards (subtraction) by thirteen letters, the process for encryption and decryption is effectively the same. So, both encryption and decryption can be performed using the same operation `(m + 13) mod 26`.
{% end %}

The shift parameter in the Caesar cipher determines how a message gets encrypted and decrypted — it acts as a 'key' for encrypting and decrypting the data. Only parties who have the knowledge about the keys can decrypt the messages encrypted with that key. While this is the main goal of symmetric encryption, the Caesar cipher is not a very good way to achieve this goal. This is because single-alphabet substitution ciphers like the Caesar cipher are not secure. They can be easily broken using brute force and frequency analysis attacks.

{% tangent(summary="Brute force attacks", open=true) %}
A [brute force attack](https://en.wikipedia.org/wiki/Brute-force_attack) refers to systematically trying all possible combinations for a key, until a correct key is found. For single-alphabet substitution ciphers (eg. the Caesar cipher), trying all combinations takes a trivial amount of time and thus the cipher is easily broken.
{% end %}

{% tangent(summary="Frequency analysis attacks", open=true) %}
In [frequency analysis attacks](https://en.wikipedia.org/wiki/Frequency_analysis#Frequency_analysis_for_simple_substitution_ciphers), the distribution of letters in a language is studied to find likely candidates for keys. It will be discussed in slightly more detail below.
{% end %}

## One-Time Pad

In the Caesar cipher, all the letters of the plaintext are shifted by the same amount, which is determined by a single-valued key. However, it can be argued that using [separate shift values](https://en.wikipedia.org/wiki/Polyalphabetic_cipher) for each letter is more secure. The [Vigenère cipher](https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher) does exactly that — it is a cipher that employs multiple shift values for encrypting messages. The key here is multi-valued, and the each letter of the plaintext is shifted based on the values of the key. When the key is shorter than the message, the key is repeated until it matches the length of the message.

<canvas id="canvasVignere"></canvas>
<input id="inputVignere"><br>
<input id="inputVignereKey"><br>
Key: <span id="spanVignere"></span>

{% tangent(summary="Multi-valued key", open=false) %}
Each letter in the plaintext is shifted by a different amount, based on the key values. Here, since the key is shorter than the message, the key (ie. the shift values) is repeated until it matches the length of message.
{% end %}

Again, decryption involves the reverse operation — subtracting the key values from the ciphertext.

<canvas id="canvasVignereDecrypt"></canvas>

We started with an assumption that using multiple shift values is somehow more secure than a single value. To understand why, imagine some random plaintext message. The distribution of letters in message would likely follow the frequency distribution of letters used in the language. Now imagine if the plaintext letters are shifted by a singular value. The distribution of the ciphertext would be similar to the plaintext, except only shifted by the value amount.

<canvas id="canvasLetterFrequencyStatic0"></canvas>

{% tangent(summary="Distribution distortion", open=true) %}
This is how the frequency distribution for letters for an English plaintext message will get distorted by a single-valued key — which in this case is `1`.

The top distribution is frequency letter distribution for the plaintext, while the one below that shows the frequency letter distribution for the ciphertext. Some of the bars (the first five) are coloured to make it easier to keep track of where letters in the plaintext end up in the ciphertext. Here for example, all the plaintext 'A's will end up as ciphertext 'B's, 'B's will end up as 'C's, 'C's will end up as 'D's, etc.

Conversely, all the ciphertext 'C's definitively correspond to plaintext 'B's, 'B's correspond to 'A's, etc. Every ciphertext letter corresponds to a plaintext letter, and by simply trying to match the frequency distributions and find a mapping, the entire cipher can be broken.
{% end %}

From the ciphertext distribution it easy to understand why a single-alphabet substitution cipher (eg. Caesar) is so unsecure. Since each ciphertext letter corresponds to a single plaintext letter, it is very easy to break the encryption if any corresponding plaintext letter is found — and it can be found easily by trying to match up the frequency distributions.

But now imagine if there are now two different shift values. Half of the plaintext letters would get shifted by one value, and half of them by the other value. The distribution of the ciphertext would look slightly more 'diffused', and each ciphertext letter would now correspond to two possible plaintext letters.

<canvas id="canvasLetterFrequencyStatic1"></canvas>

{% tangent(summary="Distribution distortion", open=true) %}
This is how the frequency distribution would get distorted by a multi-valued key — which in this case is `1, 2`.

Here, all the plaintext 'A's will end up as either ciphertext 'B's or 'C's, 'B's will end up as 'C's or 'D's, and plaintext 'C's will end up as 'D' or 'E's, etc. Conversely, a ciphertext 'C' could refer to a plaintext 'B', but could also refer to an 'A'.

Firstly, it creates a more uniform distribution, which already makes frequency analysis more difficult. Second and more importantly, each ciphertext letter can now refer to two (or more) possible letters rather than a definitive one.
{% end %}

So, using more shift values spreads the likelihood of a ciphertext letter corresponding to a plaintext letter over more letters. It means using more shift values increases the range of plaintext possibilities, and thus make it less likely to correctly guess the plaintext from the ciphertext.

<canvas id="canvasLetterFrequency"></canvas>
<input id="inputLetterFrequencyKey"><br>
Key: <span id="spanLetterFrequencyKey"></span>

{% tangent(summary="Custom key", open=true) %}
Try experimenting with the key to understand how the plaintext letters are distributed in the final ciphertext after being shifted by the values in the key. Using more values spreads the plaintext over more ciphertext values. Notice how using <a id="linkLetterFrequencyGaussian" class="linkSwitch">less uniform</a> values makes it more likely to guess the plaintext letter from the ciphertext, and less likely when the keys are <a id="linkLetterFrequencyUniform" class="linkSwitch">more uniformly distributed</a>. More on that in the following section.
{% end %}

Judging from the above illutration, one might assume the key only needs to be <a id="linkLetterFrequencyPerfect" class="linkSwitch">26 values long</a> (or the size of the chosen alphabet) to achieve maximum diffusion. Except it is not the case; the graph is misleading because it does not show the inherent structure of the entire key (and ciphertext) and only shows the aggregate values — the bars represent the total aggregated frequencies, but fail to show anything about the position of the keys and ciphertext.

Eagle-eyed readers may have already raised some eyebrows in the previous example that used keys of length two. If an attacker knew that the key repeats every *n* letters, then instead of a ciphertext letter corresponding to multiple possible plaintext letters, it would map to only one possible letter — ciphertext letters that appear after every *n* letters will all have the same shift value (since the key also repeats), and hence the ciphertext letters will have a singular, definitive mapping.

And finding the original key is not particularly difficult. If the length of the key is somehow known, then *n* separate distributions can be constructed — one distribution for all the letters appearing after every *n* intervals in the ciphertext. These *n* frequency distributions can be viewed as *n* Caesar ciphertexts, all of which can be individually broken [using the same method as the frequency analysis](https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher#Cryptanalysis) attack using a single distribution.

<canvas id="canvasLetterFrequencyStaticMultiple"></canvas>

{% tangent(summary="Separating freqency distributions", open=true) %}
The above graphic illustrates how information can be extracted with a key that repeats, when its length is known. The coloured dots at the top represent ciphertext letters, 'encrypted' using the key [9, 18, 1]. The distribution coloured black is the overall frequency distribution of the ciphertext letters — and is relatively uniform, which might make frequency analysis attacks somewhat difficult.

However if the key length (three) is known, then three separate frequency distributions can be constructed using letters appearing after every three intervals in the ciphertext (coloured green, pink, and blue here). Here, letters at the position 3N (coloured green) will all be shifted by the same amount (9) since the key repeats after every three intervals, and thus will form a distribution that is shifted by nine places. The same applies for letters at positions 3N+1 and 3N+2, where the letters gets shifted by eighteen units and one unit respectively — since the key is [9, 18, 1].
{% end %}

However this attack is not possible if the key does not repeat. In fact, removing repetition or any structure from the key makes it impossible to break the cipher, other than by brute-forcing all combinations. This effectively means that entire key must be random. Using a key which is at least as long as the plaintext, and is [truly random](https://en.wikipedia.org/wiki/Random_number_generation#True_vs._pseudo-random_numbers) will be [perfectly secure](https://en.wikipedia.org/wiki/Information-theoretic_security). The [proof](https://www.math.umd.edu/~lcw/OneTimePad.pdf) is somewhat simple — it is impossible to exploit structures to find keys if there *is no* structure; every key is as likely as all the other possible combinations.

<canvas id="canvasOneTimePad"></canvas>
<input id="inputOneTimePad"><br>
Key: <span id="spanOneTimePad"></span>

{% tangent(summary="Random key", open=true) %}
The plaintext here is encrypted with keys that are randomly generated, and thus the ciphertext is effectively random as well. The ciphertext will map to a plaintext of the same length, but since the key is uniformly random, every possible combination of letters in the plaintext is as equally likely as all the other possible combinations of letters. This effectively means every plaintext message is equally likely, so no information can be extracted from the ciphertext.
{% end %}

This cipher scheme is called the [one-time pad](https://en.wikipedia.org/wiki/One-time_pad). The only information that can possibly be leaked is the maximum length of a message.

But there is an important caveat: The one-time pad is only secure if the key is kept secret and is **never** reused. The moment the same key is used more than once, all its security benefits vanish. To understand why, consider two different messages that are encrypted with the same key. An attacker can subtract the ciphertext of one message from the other to find the plaintext (or more accurately, the differences between the plaintext). For example, if `m1` and `m2` are messages that are both encrypted with key `k` then:

`c1 = (m1 + k) mod 26`\
`c2 = (m2 + k) mod 26`

Subtracting ciphertext `c1` from `c2` eliminates `k` and leaves `m2 - m1 (mod 26)`. It might feel like the plaintext difference would be a garbled mess, but even the differences in plaintexts can expose structures within the individual plaintexts — which might end up leaking information about the original plaintexts.

<canvas id="canvasOTPReuse"></canvas>

{% tangent(summary="Visualising ciphertext differences", open=true) %}
The above graphic shows how the difference in ciphertexts can leak plaintext information. Consider two plaintext messages with some structure — visualized above as two grayscale images (top row). Earlier, the numbers mapped to letters; here they are mapped to brightness values. This is just to make it easier to see the patterns in data.

Both the plaintexts are encrypted (padded/shifted) with the same key (middle row). Even if the key is truly random, the ciphertexts (bottom row) are not at all secure since both are padded using the same key — even if the ciphertexts individually look random and secure. An attacker here can subtract one ciphertext from the other to find the difference in plaintext, which can expose structures in the plaintexts, and possibly even leak the individual plaintexts if slightly more advanced techniques are used.
{% end %}

It also goes without saying that the key must be kept secret. It should only be known by the communicating parties, and no one else.

## Vernam Cipher

Another thing to note for the one-time pad is that the cardinality of key symbols must be equal (or greater than) the cardinality of the plaintext symbols — ie. if the size of alphabet of the plaintext is 26 symbols (letters) then the key must also contain at least 26 symbols, which map all the plaintext symbols to all the ciphertext symbols with equal probability. If the cardinality of the key is larger than the plaintext, then it must be ensured that the surplus key symbols do **not** break the uniform randomness constraint. All of the plaintext symbols must still map to the all ciphertext symbols with equal probability.

If the cardinality of key is smaller than the plaintext, then some of the ciphertext symbols are unreachable for a given plaintext symbol. For example, if the key cardinality is two (eg. the key values are 1, 2), but the plaintext cardinality is 26 (eg. English alphabet), then 24 of the letters are always unreachable for a given plaintext symbol. That is, 'A' will never map to any letter other than 'B' or 'C' (when the key values are 1, 2). This, as [shown earlier](#canvasLetterFrequencyStatic1), is not secure.

<canvas id="canvasMapPlainCipher"></canvas>
<input id="sliderMapPlainCipher" type="range"> Key Cardinality: <span id="spanMapPlainCipher"></span><br>

{% tangent(summary="Weak keys", open=true) %}
Since the key cardinality is much smaller than that of the plaintext, each plaintext symbol only maps to a subset of the ciphertext symbols. Conversely, this means a given ciphertext symbol will only map to a subset of plaintext symbols as well. This can greatly reduce the combinations of possible plaintexts, making it insecure.

In the above example notice how many different plaintext letters 'M' can correspond to, depending on the cardinality of the key. When the cardinality of the key is equal to the cardinality of the plaintext, a ciphertext symbol corresponds to all of the plaintext symbols with equal probability — making any type of attack impossible. This would not be the case if a ciphertext symbol does not map to all the plaintext symbols with equal probability; some of the symbols will have zero probability, and attackers can use that information to break the cipher.
{% end %}

So the key cardinality should never be smaller than the plaintext cardinality, and ideally both should be of the same size. The [Vernam cipher](https://en.wikipedia.org/wiki/Gilbert_Vernam#The_Vernam_cipher) is a type of one-time pad, that uses keys and plaintexts of cardinality two (binary plaintexts and binary keys). That is:

`c = (m + k) mod 2`\
`m = (c - k) mod 2`

Where `c` is the ciphertext for the binary plaintext message `m` encrypted using binary key `k`. The padding (addition/subtraction) operations are performed using modulo-two arithmetic. Consequently, the ciphertext `c` is also binary.

An interesting property of modulo-two arithmetic is that addition and subtraction is the [same operation](https://en.wikipedia.org/wiki/GF(2)#Properties), so similar to ROT13, the same operation can be used for encryption and decryption.

`c = (m + k) mod 2`\
`m = (c + k) mod 2`

<canvas id="canvasVernam"></canvas>
<input id="inputVernam"><br>
Key: <span id="spanVernam"></span>

{% tangent(summary="Same operation for encryption and decryption", open=false) %}
The above example shows a binary plaintext being padded using a binary key to get the ciphertext. Since addition and subtraction is the same, the same operation can be performed on the ciphertext to get back the plaintext.

Similar to [ROT13](#canvasRot13) — where shifting the symbols upwards and downwards (addition/subtraction) by 13 in modulo-26 arithmetic is same — here, in modulo-2 arithmetic, shifting the symbols upwards and downwards (addition/subtraction) by 1 is the same. So encryption and decryption is the same; both can be done using `(m + k) mod 2`.
{% end %}

The Vernam cipher is useful because computers naturally store messages in binary, and more importantly, modulo two addition can be performed very quickly and efficiently by processors using [XOR gates](https://en.wikipedia.org/wiki/XOR_gate). So ciphertexts can be generated by combining the plaintext with a key using the XOR operation.

`c = (m + k) mod 2 = m ^ k`\
`m = (c + k) mod 2 = c ^ k`

<canvas id="canvasVernamXOR"></canvas>
Key: <span id="spanVernamXOR"></span>

{% tangent(summary="The XOR operation", open=true) %}
The [XOR operator](https://en.wikipedia.org/wiki/Exclusive_or) `^` takes two binary inputs and returns one if and only if one of the inputs is one, otherwise it returns zero — same as modulo two addtion using binary numbers.
{% end %}

The binary key of the Vernam cipher is referred to as a keystream, as it is a stream of bits that is XOR-ed with the stream of plaintext bits to generate the ciphertext stream.

The Vernam cipher keystream must have the same properties as the one-time pad key to have the same security guarantees. It must be at least as long as the plaintext stream, and should be truly random. The key must also **never** be reused as otheweise it can leak information about the plaintext.

<canvas id="canvasVernamReuse"></canvas>

{% tangent(summary="XOR self inverse", open=true) %}
Here the bits are coloured white for 0 and black for 1. The top row represents two different plaintext messages, with some structure. The middle row has two identical randomized keystreams — which are used for padding the above two plaintexts to get the ciphertexts (on the bottom row). When the two ciphertexts are XOR'ed with each other, it reveals some of the original structure of the two plaintexts (rightmost graphic, on the bottom row).

In XOR, a number is its own inverse. That is `x ^ x = 0`, so `y ^ x ^ x` = `y ^ 0` = `y`. The XOR operations are also [associative](https://en.wikipedia.org/wiki/Associative_property) and [commutative](https://en.wikipedia.org/wiki/Commutative_property). These properties can be exploited to leak plaintext data by XOR-ing two ciphertexts encrypted with the same key:

`c1 ^ c2`\
`= (m1 ^ k) ^ (m2 ^ k)`\
`= m1 ^ k ^ m2 ^ k`\
`= m1 ^ m2 ^ k ^ k`\
`= m1 ^ m2`

As discussed earlier, even recovering the combined structure of plaintexts can be enough to leak information about the individual ciphertexts — as is already somwehat evident in the visual example above.
{% end %}

So the keystream, just like the one-time pad, must be kept secret and truly random, and must never be repeated for it to be perfectly secure.

## ChaCha20 Cipher

Although the Vernam cipher enables extremely fast and efficient encryption/decryption (since it is just a single XOR operation), and is perfectly secure, it is impractical as it relies on the secure and secret distribution of keys. If a key (which is at least the size of the message) can be securely transmitted, it makes more sense to simply send the message itself instead.

<!-- The impracticality arises from needing to exchange keys that are (at least) as long as the message. If there was some way to generate a long stream of random bits using a small initial value — and the stream is always identical for the same initial value — then the communicating parties can exchange only the small seed values (and generate the same key), instead of exchanging keystreams that are as long as the plaintext. This makes the cipher scheme a lot more practical. -->

The impracticality arises from needing to exchange keys that are (at least) as long as the message. If there was a way to compress the key to a more practical size, the Vernam cipher would have been a lot more useful. Fortunately, there are ways to do this — well to be more accurate, there are [ways](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) to generate identical streams of random bits from identical seed (initial) values. So the communicating parties can exchange only the small seed values and generate the same keys, instead of exchanging keystreams that are as long as the plaintext. This makes this cipher a lot more practical.

<canvas id="canvasKeyExchange"></canvas>

{% tangent(summary="Keystream from a small seed", open=true) %}
Small initial values (shown on the left in the above graphic) can be exchanged securely between the communicating parties — which can be used to generate much longer keystreams (shown right of the seed values in the graphic). Since the seed values will be identical, both parties A and B will have identical keystreams as well. Party A can pad the plaintext (the bitstream at the top) to get the ciphertext (the third bitstream). Party B can use the identical keystream to decrypt the ciphertext sent by party A (the fourth bitstream) to get back the plaintext (the bottom bitstream).
{% end %}

The bad news: If the same keystream is generated from the same initial value, then the keystream is essentially tied to the seed value — it is not really random, it is deterministic. But here's the good news: The key does not need to be truly random. It needs to be truly random for perfect security, but sometimes good-enough security is more than sufficient especially if it makes the cipher practical and actually usable.

{% tangent(summary="Pseudorandomness", open=true) %}
The random numbers generated this way are not actually random since they are generated from a seed, but still appear and behave like true random numbers. This is called [pseudorandomness](https://en.wikipedia.org/wiki/Pseudorandomness).
{% end %}

So what differentiates perfect security from good enough security? What differentiates a truly random bitstream from a pseudorandom bitstream? The first question is easier to answer; the second will be [discussed later](#canvasChaChaDiffusion). For the first question: If perfect security is defined as impossible to break, then 'good enough' security can be defined as the level of security that requires an unfeasibly large number of brute-force attempts to break the cipher.

PROOF READ FROM HERE.

The 'good enough' security can be ensured by verifying the randomness has no hidden patterns; the randomness cannot be broken. And also that all the possible values for the seed is big enough to deter brute-force attacks.


The ChaCha20 aims to .

One way to generate such pseudorandom keystreams is using ARX (add-rotate-XOR) operations on a seed value. The [ChaCha20](https://en.wikipedia.org/wiki/Salsa20#ChaCha_variant) cipher is an example of an [ARX cipher](https://en.wikipedia.org/wiki/Block_cipher#ARX_(add%E2%80%93rotate%E2%80%93XOR)) that uses a 512-bit value as its seed.

### ARX Operations

In, ChaCha20 a pseudorandom keystream can be generated from a 'non random' 512-bit seed by first dividing it into a 4x4 block of 32-bit [words](https://en.wikipedia.org/wiki/Word_(computer_architecture)).

<canvas id="canvasChaChaPartition"></canvas>

A pseudorandom block is generated from this 4x4 block by performing specific ARX operations in specific order on the words. These operations can be grouped into quarter rounds. A quarter round operates on four words at a time, and is defined as:

`a += b; d ^= a; d <<<= 16;`\
`c += d; b ^= c; b <<<= 12;`\
`a += b; d ^= a; d <<<=  8;`\
`c += d; b ^= c; b <<<=  7;`

Performing the quarter rounds four times makes up one full round. The quarter round is performed on all four columns of the matrix during odd rounds. On even rounds, the quarter rounds is performed on the four left diagonals of the matrix. ChaCha20 specifies performing a total of twenty rounds, or ten odd rounds and ten even rounds.

<canvas id="canvasChaChaARX"></canvas>
<button id="buttonChaChaARXNext">Perform Quarter Round</button>
<button id="buttonChaChaARXReset">Reset</button><br>
Round: <span id="spanChaChaARXRounds">0</span>

These operations effectively 'mix' or [diffuse](https://cr.yp.to/snuffle/diffusion.html) the bits of the words with each other, and performing all the twenty rounds generates a pseudorandom 512-bit block. However it is not the part of the final keystream. The diffused block is first added to the original block to form (a part of) the final keystream.

<canvas id="canvasChaChaAddition"></canvas>

{% tangent(summary="Addition of final and initial state", open=true) %}
The addition step is important since the mixing rounds are invertible. It is possible to apply the reverse operations on the pseudorandom block to produce the original block.
{% end %}

### Counter & Nonce

The above operations generate a pseudorandom 512-bit block from a 512-bit seed block, which can be XOR-ed with a 512-bit plaintext block to produce the ciphertext.

<canvas id="canvasChaChaSingle"></canvas>

To encrypt longer messages, more pseudorandom blocks are required. The blocks must not repeat and must be different from each other for the keystream to be secure — or else an attacker can use the same techniques used to break the Vigenère cipher to break ChaCha20.

However, producing different blocks from the same initial state block is impossible. Since the ARX operations are deterministic, the the same initial state blocks will produce the same pseudorandom blocks. The only way to generate new and distinct pseudorandom blocks is to alter the initial state block itself.

The initial state block can be altered by simply flipping a few bits. Due to the cascading effects of diffusion from the ARX operations, even a single bit flip results in a completely different pseudorandom block.

<canvas id="canvasChaChaAvalanche"></canvas>
<button id="buttonChaChaAvalancheNext">Perform Quarter Round</button>
<button id="buttonChaChaAvalancheReset">Reset</button><br>
Round: <span id="spanChaChaAvalancheRounds">0</span>

{% tangent(summary="Difference", open=true) %}
Notice how the two blocks start to diverge just after a few rounds.
{% end %}

In ChaCha20, the last four words (128 bits) are reserved in the original 512-bit block for the sole purpose of generating new blocks. The four words are logically separated into two parts — a counter and a nonce.

<canvas id="canvasChaChaPartitionSequence"></canvas>

To encrypt longer messages, the counter is incremented and new pseudorandom blocks are generated. The counter can also be used to keep track of the block's position in the keystream. To encrypt or decrypt a specfic section of a message, only that specific part of the keystream can be generated — by using the counter value corresponding to that portion of the keystream and the plaintext message.

<canvas id="canvasChaChaCounter"></canvas>
<button id="buttonChaChaCounterDecrement">Decrement Counter</button>
<button id="buttonChaChaCounterIncrement">Increment Counter</button><br>
Counter: <span id="spanChaChaCounter"></span>

However if the counter is used for representing the positional information of a block in a message, it will reset to zero when encrypting new messages. The counter will also most likely have a lot of repeated values. This implies the output pseudorandom blocks will also repeat.

<canvas id="canvasChaChaCounterRepeat"></canvas>
<button id="buttonChaChaCounterRepeatDecrement">Decrement Counter</button>
<button id="buttonChaChaCounterRepeatIncrement">Increment Counter</button>

Encrypting data using reused keystreams (blocks) is dangerous. Thus the counter values must never repeat, and must always be incrementing. But then the counter value cannot be used for representing the relative position of blocks in the keystream.

A simple solution is to use a nonce. A nonce is simply a number used once — it does not repeat. For every new message, a unique nonce is generated. This ensures the entire initial state block is always unique even if the counter values are not. Because repetition in counters is possible, they can now be used to represent positional information.

<canvas id="canvasChaChaNonce"></canvas>
<div class="containerButtonChaChaNonce">
<button id="buttonChaChaNonceCounterDecrement">Decrement Counter</button><button id="buttonChaChaNonceCounterIncrement">Increment Counter</button>
<button id="buttonChaChaNonceDecrement">Decrement Nonce</button><button id="buttonChaChaNonceIncrement">Increment Nonce</button>
</div>
Nonce: <span id="spanChaChaNonce"></span>,
Counter: <span id="spanChaChaNonceCounter"></span>

{% tangent(summary="Theoretical limits for keystream size", open=true) %}
The size of the counter in ChaCha20 is two words (64 bits). So 2^64 new blocks can be generated by incrementing the counter. Since each block is 512-bits, the keystream can be up to 1 ZiB. So a 64-bit counter can encrypt up to 1 ZiB long plaintext messages. Similarly, the nonce is also two words (64 bits). Thus, a total of 2^64 messages, each of size 1 ZiB can be encrypted using a single 256-bit key.
{% end %}

### Bit Constants

While very rare, there may be cases when the entire initial state is all zeroes. Diffusing bits that are all zeroes with each other does not generate a pseudorandom block but simply produces an all-zero block. Encrypting data with the all-zero block is dangerous as it does not encrypt the data at all since `m ^ 0 = m`.

<canvas id="canvasChaChaZeroBlock"></canvas>

To prevent the all-zero block, certain bits of the initial state block can always be set to one. In ChaCha20, the first four words (128 bits) of the initial state block are specific non-zero constants, so that the block will never be all zeroes.

<canvas id="canvasChaChaPartitionConstants"></canvas>

The constant values avoid the all-zero block, but more importantly these constants can also [introduce asymmetry](https://cr.yp.to/snuffle/security.pdf#page=5) if certain values are chosen. ChaCha20 has some rotational symmetry — different initial state blocks can generate the same output block, if the initial state blocks are specific [rotated](https://en.wikipedia.org/wiki/Group_action) versions of itself. Having fixed asymmetrical values for certain words eliminates the possibility of this shift/rotate structure.

The asymmetric constants form the first four words of the intial state block and have the values 0x61707865, 0x3320646e, 0x79622d32, 0x6b206574. There is [nothing special](https://en.wikipedia.org/wiki/Nothing-up-my-sleeve_number) about these constants — they simply spell "expand 32-byte k" in [ASCII](https://en.wikipedia.org/wiki/ASCII) in [little endian](https://en.wikipedia.org/wiki/Endianness#/media/File:32bit-Endianess.svg).

### Shared Key

The constants, counter, and nonce values do not need to be exchanged securely — the counter and nonce keep changing often and it is impractical to securely exchange them frquently; while the constants too are public and standardised.

But even if half of the initial state block is non-secret, it is secure since attackers have to brute force the remaining 2^256 possible combinations for the remaining half. These 256 bits, or eight words, are used for the actual 'key' and must be kept private between the communicating parties.

<canvas id="canvasChaChaPartitionKey"></canvas>

The key along with the constants, counter and nonce form the complete ChaCha initial state block — which is used for generating the keystream.

<canvas id="canvasStructuredKeyExchange"></canvas>

## Authenticated Encryption

Without the knowledge of the key, an attacker cannot easily guess the keystream and decrypt the ciphertext. But attackers can [modify the ciphertext](https://en.wikipedia.org/wiki/Bit-flipping_attack) itself — especially if they have some knowledge about the position of important bits in the plaintext stream.

<canvas id="canvasBitFlip"></canvas>

{% tangent(summary="Calculating modified ciphertext", open=true) %}
If an attacker knows a certain string `m` occurs at some position, they can modify it by replacing the ciphertext at that position by XOR-ing it with the original string and the modified string. So, if a part of original ciphertext is `c = m ^ k`, it can be replaced with `c' = c ^ m ^ m'`.

Decrypting `c'` results in `c' ^ k` = `((m ^ k) ^ m ^ m') ^ k` = `m ^ m ^ k ^ k ^ m'` = `m'` — the modified message, without ever knowing the original key `k`.
{% end %}

ChaCha20 is not designed to detect nor protect against tampered ciphertexts. Because bit-flipping attacks can render the entire cipher useless, most stream ciphers are often paired with an authenticator to detect tampered ciphertexts. An encryption scheme that simultaneously encrypts a message as well as validates its authenticity is referred to as [authenticated encryption](https://en.wikipedia.org/wiki/Authenticated_encryption).

### Hashing

A simple (but rather naive) way to verify the integrity of a message is to simply compare the sum of all the bytes of the decrypted ciphertext — a very primitive [checksum](https://en.wikipedia.org/wiki/Checksum). The checksum is generally calculated using modular arithmetic to prevent the numbers from getting too big.

For example, the checksum of a message with bytes `C1`, `C2`, ... `Cq`, and an arbitrarily chosen integer `p` is:

`(C1 + C2 + ... + Cq-1 + Cq) mod p`

<canvas id="canvasChecksum"></canvas>
Current Byte Block: <span class="hexTextBox" id="spanChecksumByte"></span><br>
Checksum Hash: <span class="hexTextBox" id="spanChecksumHash"></span><br>

<button id="buttonChecksumIncrement">Goto Next Byte Block</button>

A sender can encrypt a message along with its checksum. The receiver can decrypt the message and compare the checksum of decrypted ciphertext with the one presented by the sender to verify its authenticity.

<canvas id="canvasAuthentication"></canvas>

However it is not secure at all. Attackers can modify a few bits of the ciphertext and still have a very high probability that the checksum of the decrypted **modified** ciphertext will produce the same checkum as the original plaintext message. For it to be secure, the checksum must not output the same (colliding) values if its input message is different. In other words, the checksum must have adequate collision resistance.

<canvas id="canvasMalhash"></canvas>

Instead of the naively adding all the bytes of the plaintext message, they can instead be evaluated as coefficients of a polynomial over a [prime field](https://en.wikipedia.org/wiki/Finite_field). That is, the checksum for a message having bytes `C1`, `C2`, ... `Cq` is:

`(C1·x^q + C2·x^(q-1) + ... + Cq-1·x^2 + Cq·x^1) mod p`

<canvas id="canvasKeyedhash"></canvas>
Current Byte Block: <span class="hexTextBox" id="spanKeyedhashByte"></span><br>
Keyed Hash: <span class="hexTextBox" id="spanKeyedhash"></span><br>

<input id="inputKeyedhashKey">
<button id="buttonKeyedhashIncrement">Goto Next Byte Block</button>

This is called a [polynomial rolling hash](https://en.wikipedia.org/wiki/Rolling_hash#Polynomial_rolling_hash), and the 'checksum' is called its hash. These hashes have much lower chances of collisions than the simple checksum method — for a well chosen integer `x` and a big prime `p`.

> If `q` is not known, it will have a non-predictable effect on the hash. So attackers cannot accurately change the message without knowing if it would still produce the valid checksum.

<canvas id="canvasFailhash"></canvas>

{% tangent(summary="Hashing", open=false) %}
A [hash function](https://en.wikipedia.org/wiki/Hash_function) is any function that maps an input to a fixed sized output, called the hash. Both the simple checksum and the polynomial hash use modular addition and thus always map to fixed range outputs. So technically, both are hash functions.
{% end %}

{% tangent(summary="Prime fields", open=false) %}
Performing the modulo operation limits the results to a finite set of elements. These elements form a [finite field](https://en.wikipedia.org/wiki/Finite_field) if the set satisfies certain [axioms](https://en.wikipedia.org/wiki/Field_(mathematics)#Definition) — properties of addition, subtraction, multiplication, and division must satisfied, for two defined binary operations. A prime field is a finite field with a prime number of elements.
{% end %}

Again, the hash presented by the sender is compared with the hash of the decrypted ciphertext. If the hashes match, there should be a reasonable amount of confidence that the message is authentic and has not been altered — since the chances of collisions are much lower.

<canvas id="canvasPaddedhash"></canvas>
Current Byte Block: <span class="hexTextBox" id="spanPaddedhashByte"></span><br>
Checksum Hash: <span class="hexTextBox" id="spanPaddedhashChecksum"></span><br>
Padded Hash: <span class="hexTextBox" id="spanPaddedhash"></span><br>

<input id="inputPaddedhashKey">
<button id="buttonPaddedhashIncrement">Goto Next Byte Block</button>

Since these hash values are used to verify the authenticity of messages, they are aptly called [message authentication codes](https://en.wikipedia.org/wiki/Message_authentication_code). MACs generated using hash functions are called hash-based MACs or [HMACs](https://en.wikipedia.org/wiki/HMAC).

<canvas id="canvasMachash"></canvas>
Current Byte Block: <span class="hexTextBox" id="spanMachashByte"></span><br>
Keyed Hash: <span class="hexTextBox" id="spanMachashHashKeyed"></span><br>
Padded Hash: <span class="hexTextBox" id="spanMachashHashPadded"></span><br>

<input id="inputMachashKey"><br>
<input id="inputMachashKeyPad"><button id="buttonMachashIncrement">Goto Next Byte Block</button>

{% tangent(summary="MAC criteria", open=true) %}
The above hash digests are technically not MACs because they are not considered to be adequately secure against forgeries. Generally, MACs use some shared secret information to verify the authenticity of messages.
{% end %}

### Keyed Hashing

The polynomial rolling hash acts on plaintext data, but ciphertexts can also be hashed. However, hashing the ciphertext (in this manner) is pointless. An adversary that can alter the ciphertext can also recalculate the hash of the modified ciphertext and then alter the MAC (hash) as well.

When the plaintext is hashed however, an attacker cannot easily calculate how a change in the ciphertext changes the resulting MAC — because the attacker does not have the knowledge about the complete plaintext to recalculate its hash.

When the plaintext is hashed, an encrypted message must be decrypted before it can be verified — but it is not preferable because it is [not completely secure](https://moxie.org/2011/12/13/the-cryptographic-doom-principle.html). The alternative is generating the MAC from the ciphertext. However as mentioned earlier, MACs generated by hashing ciphertexts is even less secure.

The reason hashing ciphertexts to authenticate messages is not secure at all is because MACs are generated solely from a public ciphertext. However, if the MACs can include secret information only known to the communicating parties as its input, it can be much more secure. The secret information can again be a shared secret key.

One way to embed the key in a MAC is to include the the key while the hashing it. Using the example of the polynomial rolling hash, the hash can be generated by evaluating the polynomial at the value of the key.

`MAC = (C1·k^q + C2·k^(q-1) + ... + Cq-1·k^2 + Cq·k^1) mod p`

Here `k` is the secret key, `p` is a sufficiently big prime and `C1`, `C2`, ... `Cq` are bytes of the **ciphertext**. Since the hash accepts a secret key alongside the message, this type of hashing is referred to as keyed hashing.


But an even simpler way to include a secret key in a MAC is to simply add it to the hash of a ciphertext. Variable MACs or [VMACs](https://en.wikipedia.org/wiki/VMAC) function very similar to this — a hash function generates the hash for a message, which is then combined with a one-time key using modular addition.

`MAC = (H(c) + k) mod p`

Finally some other things to keep in mind: ChaCha Counter and Associated Data when hashing.


For the VMAC to be secure, the hash function needs to be collision resistant, while the shared secret key `k` should be random and must not be reused. Since the key is unique for every invocation, the MAC too is unique and varies every time, even for the same input — hence the name.


{% tangent(summary="VMAC as a masked hash", open=true) %}
The VMAC can be thought of as a hash being 'encrypted' or masked with the one-time pad `k`. For the VMAC to have (similar) security guarantees as the one-time pad, `k` must be (pseudo)random, and must never be reused.
{% end %}

MACs incorporating secret keys are much harder to forge, allowing them to be used for authenticating ciphertexts. An attacker can modify the ciphertext, but cannot recalculate its MAC without the knowledge of the secret key.

## Poly1305

[Poly1305](https://en.wikipedia.org/wiki/Poly1305) is a hash function, that is often used for generating one-time MACs. When it is used for authentication, it behaves as a kind of VMAC using a keyed polynomial rolling hash as its hash function and a random number as its pad. That is:

`MAC = (H(C, r) + s) mod 2^128`\
`H(C, r) = (C1·r^q + C2·r^(q-1) + ... + Cq·r^1) mod p`

Where `H(C, r)` is a polynomial rolling hash using the bytes of the ciphertext `C` as its coefficients, evaluated at the point `r` over a prime field `p`. Meanwhile `s` is any random number. The MAC is the modular addition of the two numbers over the integer 2^128.

<canvas id="canvasPoly1305"></canvas>
Current Block: <span class="hexTextBox" id="spanPoly1305Byte"></span><br>
Keyed Hash: <span class="hexTextBox" id="spanPoly1305HashKeyed"></span><br>
Padded Hash: <span class="hexTextBox" id="spanPoly1305HashPadded"></span><br>

<button id="buttonPoly1305NewKeys">Generate New Keys</button><button id="buttonPoly1305Increment">Goto Next Byte Block</button>

In Poly1305-MAC, certain operations and parameters have been strictly defined:

The coefficients of the polynomial `C1`, `C2`, ... `Cq` are not single bytes of the input, but 16-byte chunks of the input interpreted as 17-byte chunks by appending a byte having the value one to each of the 16-byte chunks of the message. If the final chunk is smaller than 16-bytes, one is appended to the chunk and then zero padded to 17-bytes.

The inderminate of the polynomial, `r` acts a shared secret key. It is a 16-byte little endian integer where the top four bits of bytes `r[3]`, `r[7]`, `r[11]`, and `r[15]`, as well as the bottom two bits of `r[4]`, `r[8]`, `r[12]` are all zeroes — to simplify and accelerate calculations.

The MAC is designed to be 128 bits long, and so the order of the prime field `p` should preferably be close to, and greater than 2^128. It was chosen to be 2^130 - 5 because its sparse form [makes divisions easier](https://loup-vaillant.fr/tutorials/poly1305-design#poly1305s-prime-2130---5). The result is then reduced using modulo 2^128.

The random number `s` acts as the second key. It is a 16-byte integer, used to mask the polynomial rolling hash. The key `s` must never be reused.

The result is a 16 byte, or 128 bit MAC generated from an input `C` of arbitrary length, and two 16-byte secret keys `r` and `s`.

Evaluates the polynomial using modulo 2<sup>130</sup> - 5, hence the name Poly1305. Important to note: We want a uniform distribution again, but for different reasons: Need to minimize collision — so minimize some radom numbers from getting higher preference. Earlier the uniform distribution was for diffusion.

<canvas id="canvasPrimeField"></canvas>
<input id="sliderPrimeFieldModulus" type="range"> Modulus: <span id="spanPrimeFieldModulus"></span><br>
<input id="sliderPrimeFieldMultiplier" type="range"> Multiplier (Key): <span id="spanPrimeFieldMultiplier"></span><br>

{% tangent(summary="Minimizing collisions", open=true) %}
Show the probability distribution. How likely is it to get a certain number for a given key and modulus. Note how for prime numbers, the distribution stays uniform regardless of the chosen key. So any key can be chosen without affecting collisions. For eg. try comparing 31 (a prime) with 30 (a composite with a lot of factors).
{% end %}

## ChaCha20-Poly1305

Poly1305 can be used to authenticate ciphertexts generated using ChaCha20. The keys for Poly1305, `r` and `s` can be derived from the keys used for ChaCha20. However the 256-bit key used in ChaCha cannot directly be used in Poly1305 — because the key is persistent, but `s` should always be unique for every MAC.

<canvas id="canvasChaChaPolySeparate"></canvas>

While the key used in ChaCha20 is persistent, its keystream is not. ChaCha20 had been designed to always generate unique keystreams. Every time a new message needs to be authenticated, an extra pseudorandom block can be generated using ChaCha20, which can be used as keys for Poly1305.

In ChaCha20-Poly1305, the extra block is generated by setting the counter of the initial state to zero for each new nonce (message). The rest of the keystream used to encrypt the plaintext message is generated by incrementing the counter, starting from one.

<canvas id="canvasChaChaPolyIntegrated"></canvas>

The size of the pseudorandom block is 512 bits, but only 256 bits are required for the key pair `r` and `s`. So only the first 256 bits are used, while the remaining bits are discarded. The first 128 bits are used for `r` while the next 128-bits are used for `s`. Additionally, bits of `r` are clamped to satisfy its requirements — top four and bottom two bits of specific bytes must be zero.

Because `r` and `s` are derived from a ChaCha20 block, which itself is dervied using a secret 256-bit key, the 256-bit key is used for both encryption and authentication.

It is worth noting that there are slight differences between ChaCha20 and the ChaCha20 used in ChaCha20-Poly1305. Unlike ChaCha20, the initial state in ChaCha20-Poly1305 uses a 32-bit counter and 96-bit nonce instead of a 64-bit counter and 64-bit nonce.

<canvas id="canvasChaChaPolySequence"></canvas>

This allows more messages to be encrypted using the same key, albeit shorter ones. But it is not a problem, since a 32-bit counter still allows for encryption of messages up to 256 GiB in size.

### Associated Data

Sometimes ciphetexts can be paired with some associated plaintext data, which need not or should not be encrypted, but still need to be verified — data such as message timestamps, addresses, protocol versions, etc. This cleartext data is often sent alongside the ciphertext, and both are authenticated using a single MAC. This additional data is called associated data, and the authenticated encryption scheme that authenticates the associated data alongside the ciphertext, is called [authenticated encryption with associated data](https://en.wikipedia.org/wiki/Authenticated_encryption#Authenticated_encryption_with_associated_data), or AEAD.

<canvas id="canvasAssociatedData"></canvas>

ChaCha20-Poly1305 can authenticate ciphertext `C` along with some associated data `AD` by concatenating together, and treating them as a single unit to generate the MAC. The ChaCha20-Poly1305 specification defines `AD` and `C` to be separately padded to make their total sizes an even multiple of sixteen bytes. The padded `AD` and `C` as well as two other 64-bit fields, `len(AD)` and `len(C)`, are concatenated. Poly1305 then produces the MAC of the concatenated string.

{% tangent(summary="Message size limit", open=false) %}
While Poly1305 can be used for authenticating messages of arbitrary length, the 64-bit fields for `len(AD)` and `len(C)` restricts the possible size of the associated data `AD` and the ciphertext message `C` to 2^64 bits, or 16 EiB. But ciphertext `C` is further bottlenecked by the 32-bit counter of the ChaCha20 initial state — limiting message sizes to only 256 GiB. If required however, the ChaCha20-Poly1305 specification permits changing the counter to be set to its original size of 64 bits to allow encrypting and authenticating longer messages.
{% end %}

This is the entirety of [ChaCha20-Poly1305](https://en.wikipedia.org/wiki/ChaCha20-Poly1305), a stream cipher used to encrypt messages, and authenticate the encrypted messages along with some optional associated data. It used in [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security#TLS_1.3), [SSH](https://en.wikipedia.org/wiki/Secure_Shell#Algorithms), [WireGuard](https://en.wikipedia.org/wiki/WireGuard#Protocol), and [other protocols](https://en.wikipedia.org/wiki/ChaCha20-Poly1305#Use).

## Security Guarantees

The probability that attackers cannot decrypt a given ciphertext relies on the security of ChaCha20. Meanwhile the possibilities of forgeries depends on the security of Poly1305, as well as ChaCha20.

### Poly1305 Security

Since the output of Poly1305 is combined with a pseudorandom pad, it is as secure as the algorithm used to generate pseudorandom number. However, it does not imply that it is perfectly secure if the pad is purely random — since collisions are still possible as the of the size of the MAC is [finite](https://en.wikipedia.org/wiki/Pigeonhole_principle).

Consider a prime field <i>GF(p)</i>, taken as <i>x mod p</i> where <i>x ∈ ℤ</i> and <i>p</i> is prime. Then, for some polynomial of degree one, e.g. <i>a·x = h</i> where <i>a,x,h ∈ GF(p)</i> — there exists, at most one solution or root for <i>x</i>. The probability that <i>x</i> will produce <i>h</i> for a given <i>a</i> is <i>1/n</i>, where <i>n</i> is the number of all possible values for <i>x</i>. That is, <i>n = p</i>.

<input id="sliderPolynomial1Coefficient1" type="range"> Coefficient (a): <span id="spanPolynomial1Coefficient1"></span><br>
<input id="sliderPolynomial1Variable" type="range"> Variable (x): <span id="spanPolynomial1Variable"></span><br>
<input id="sliderPolynomial1Range" type="range"> Result (h): <span id="spanPolynomial1Range"></span><br>

<span class="hexTextBox" id="spanPolynomial1Equation"></span><br>

For a polynomial of degree two, e.g. <i>a·x^2 + b·x = h</i>, there can be at most two solutions for <i>x</i>. The probability that <i>x</i> produces <i>h</i> for a given pair <i>a,b</i> is at most <i>2/n</i>. Where <i>n</i> is the total number of possible values for <i>x</i>. Here again, <i>n = p</i>.

<input id="sliderPolynomial2Coefficient1" type="range"> Coefficient (a): <span id="spanPolynomial2Coefficient1"></span><br>
<input id="sliderPolynomial2Coefficient2" type="range"> Coefficient (b): <span id="spanPolynomial2Coefficient2"></span><br>
<input id="sliderPolynomial2Variable" type="range"> Variable (x): <span id="spanPolynomial2Variable"></span><br>
<input id="sliderPolynomial2Range" type="range"> Result (h): <span id="spanPolynomial2Range"></span><br>

<span class="hexTextBox" id="spanPolynomial2Equation"></span><br>

Similary, for a <i>q</i> degree polynomial, e.g. <i>C1·x^q + C2·x^(q-1) + ... + Cq·x^1 = h</i>, [there are at most](https://en.wikipedia.org/wiki/Finite_field#Roots_of_unity) <i>q</i> number of roots for <i>x</i>, such that <i>x ∈ GF(p)</i>. The probability that <i>x</i> produces <i>h</i> for some given coefficients is, at most <i>q/n</i> — where <i>n</i> is again the number of possible values for <i>x</i>.

`deg(f(x)) = Q => x can have, at most, Q roots`

Now assume a message <i>m</i> has a polynomial hash <i>h</i>. The probability of another distinct message <i>m'</i> having the same hash digest <i>h</i> will then depend on the on the degree of its polynomial. The polynomial in Poly1305 is of the form C1·r^q + C2·r^(q-1) + … + Cq·r^1. The coefficients of the polynomial are constructed from 16-byte chunks of a message, and thus, the degree of the polynomial is <i>⌈L/16⌉</i> — where <i>L</i> is the length of the message. So the probablity of a message <i>m'</i> having the (same) hash <i>h</i> is at most <i>⌈L/16⌉/n</i>.

`If bytes(m) = L`\
`=> deg(f(x)) = ⌈L/16⌉`\
`=> x can have, at most, ⌈L/16⌉ roots`

Since the indeterminate of the polynomial in Poly1305 <i>r</i> is a 128-bit number with 22 bits always set to zero, the total number of possible values for <i>r</i> is 2^106. Thus, the probability of a message having a specific hash is at most <i>⌈L/16⌉/2^106</i>.

`Let m != m' be two messages of length up to L bytes`\
`If h(m) ≡ h(m') (mod p)`\
`=> h(m) - h(m') ≡ 0 (mod p)`\
`=> f(x) = h(m) - h(m')`\
`=> deg(f(x)) = ⌈L/16⌉`\
`=> x can have, at most, ⌈L/16⌉ roots`

However, the polynomial is evaluated in <i>GF(p)</i> — the result is <i>h ∈ [0, 2^130 - 5)</i>, while the hash in Poly1305 is designed to be of 128 bits. So <i>h</i> is reduced modulo 2^128. Discarding two bits from <i>h</i> causes some outputs to be [congruent](https://en.wikipedia.org/wiki/Modular_arithmetic#Congruence) to others. More specifically, there are eight congurent values (mod 2^128) for <i>H(m)</i> - <i>H(m')</i> ≡ 0.

This increases the differential probability to <i>8·⌈L/16⌉/2^106</i>, at most — because there are now eight times as many possibilities for two messages to have the same hash.

Now if <i>D</i> forgery attempts are made, then the probability of a single successful forgery is at most <i>D·8·⌈L/16⌉/2^106</i>. The probability of forgeries is [independent](https://cr.yp.to/mac/poly1305-20050329.pdf) of the number of messages authenticated — if the pad is [uniformly random](https://en.wikipedia.org/wiki/Discrete_uniform_distribution).

{% tangent(summary="Influence of the pad on probability of forgeries", open=false) %}
Generally, the pad is generated by a function <i>f</i> that maps a smaller nonce to a larger output space. If <i>f</i> has a uniform random distribution, then the probability that the pad is some specific number is <i>1/G</i>, where <i>G</i> is the total number of elements in the output space. If the probability the pad is a specific number is <i>1/G</i>, the probability that the pads are <i>C</i> specific numbers — or the probability that <i>f</i> interpolates <i>C</i> specific points is, at most <i>1/G · 1/G · ... · 1/G = 1/(G^C)</i>.

A uniform random [injective function](https://en.wikipedia.org/wiki/Injective_function) that has non-repeating nonces as its input can also be used for generating the pad. Then, the pad will not also repeat. The probability that it interpolates <i>C</i> number of distinct points is then <i>1/G · 1/(G-1) · 1/(G-2) · ... · 1/(G-(C-1))</i>. This can be simplified to <i>((1 - (C - 1)/G)^-(C/2))/(G)^C</i>. This can be used for evaluating the probability when [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) is used as <i>f</i> — e.g. in Poly1305-AES.

If <i>f</i> has a maximum C-interpolation probability at most <i>δ/(G^C)</i> and a maximum (C + 1)-interpolation probability at most <i>δε/(G^C)</i>, then the [probability of a successful forgery](https://cr.yp.to/antiforgery/securitywcs-20050227.pdf#page=9) using <i>C</i> distinct messages is <i>Dδε</i>, where <i>ε</i> is the probability of two messages having the same hash.

The pad in Poly1305 of ChaCha20-Poly1305 is generated using a ChaCha20 block, and can be assumed to have an interpolation probability of <i>1/(G^C)</i> as there is no restriction on pad repetition. So the probability of a successful forgery using <i>C</i> messages is at most <i>Dε</i>, or <i>D·8·⌈L/16⌉/2^106</i> — it is independent of the number of message authentications.

It is important to note that ChaCha20 blocks may still be distinguished from true random numbers with some different probability <i>δ</i>, which affects the overall probability of successful forgeries.
{% end %}

However, the Poly1305 pad in ChaCha20-Poly1305 is generated using a pseudorandom ChaCha20 block — it is not guaranteed to be truly uniformly random. If the probability of distinguishing a ChaCha20 block from a truly random keystream is <i>δ</i>, then the probability of a successful forgery is, at most <i>δ + D·8·⌈L/16⌉/2^106</i>.

### ChaCha20 Security

The randomness of the ChaCha20 output stream determines its security, as well as the security of Poly1305. This can be tested statistically.

Changing the initial state of a ChaCha20 block ([even by a single bit flip](https://en.wikipedia.org/wiki/Avalanche_effect#Strict_avalanche_criterion)) should ideally create a new uniform random block of bits. That is, the individual probability of all the bits of the output block flipping should be half — on average, [half the bits should flip](https://en.wikipedia.org/wiki/Confusion_and_diffusion#Diffusion) for a change in the initial state. Or more specifically, the [number of bit flips](https://en.wikipedia.org/wiki/Hamming_distance) due to changes the inital state should form a [binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution) centered around half the bit length of the output block.

<canvas id="canvasChaChaDiffusion"></canvas>
<button id="buttonChaChaDiffusion">Random Block</button>
<button id="buttonChaChaDiffusion1000">Thousand Random Blocks</button>
<button id="buttonChaChaDiffusionReset">Reset</button>

{% tangent(summary="Testing randomness statistically", open=true) %}
Changing the initial state of a ChaCha20 block — even by a single bit flip — should ideally create a new output state where each bit has equal chances of being either one or zero. This means roughly half of all the bits in a block should should flip. Since a ChaCha block consists of 512 bits, on average 256 of the bits should flip.

The above example charts the number of bit flips in the output ChaCha20 block, for a (single) bit flip in the initial state block. Note how the number of bit flips is close to 256, suggesting strong randomness.
{% end %}

Empirical evidence suggests that it is the case. ChaCha20 generates blocks that appear uniformly random. Evaluating the randomess analytically is much more difficult however, because the interaction between the bits of the block quickly grows complex with each round. While there are ways to [measure the avalanche effect](https://webdoc.sub.gwdg.de/ebook/dissts/Bochum/Daum2005.pdf#page=57) — small changes flipping roughly half the bits, there is no proof that ChaCha20 blocks blocks can be distinguished (or not) from truly uniform random bitstreams.

There are however other ways to test its security — for example, using [linear](https://en.wikipedia.org/wiki/Linear_cryptanalysis), [differential](https://en.wikipedia.org/wiki/Differential_cryptanalysis) or [rotational](https://en.wikipedia.org/wiki/Rotational_cryptanalysis) [cryptanlysis](https://en.wikipedia.org/wiki/Cryptanalysis). ChaCha with six rounds has been [broken](https://cr.yp.to/streamciphers/attacks.html#chacha6), but there have been no successful attacks on twenty rounds of ChaCha.

ChaCha20-Poly1305, therefore is generally [considered secure](https://www.cryptrec.go.jp/exreport/cryptrec-ex-2601-2016.pdf).

## Other Ciphers

Although [other stream ciphers](https://en.wikipedia.org/wiki/Stream_cipher#Comparison) exist, ChaCha20 is the most widely used cipher currently. Other types of symmetric encryption, such as [block ciphers](https://en.wikipedia.org/wiki/Block_cipher) are also widely used for encryption and decryption. These generally use [substitution](https://en.wikipedia.org/wiki/S-box) and [permutation](https://en.wikipedia.org/wiki/Permutation_box) boxes to diffuse the data blocks in place, instead of generating a keystream.

Another thing that was glossed over was the secure exchange of keys in the first place.

There is also asymmetric key cryptography where communicating parties do not require the same keys for encrypting information. This type of cryptography is quite different from the ciphers mentioned above, and usually relies on the properties of [number theory](https://en.wikipedia.org/wiki/Number_theory) and [group theory](https://en.wikipedia.org/wiki/Group_theory) instead.

---

## References

* Daniel J. Bernstein: [ChaCha, a variant of Salsa20](https://cr.yp.to/chacha/chacha-20080128.pdf)
* Daniel J. Bernstein: [The Poly1305-AES message-authentication code](https://cr.yp.to/mac/poly1305-20050329.pdf)
* IRTF RFC 8439: [ChaCha20 and Poly1305 for IETF Protocols](https://datatracker.ietf.org/doc/html/rfc8439)

<script src="/scripts/stream-ciphers.js"></script>
<style>
.hexTextBox {
    font-family: var(--monospace);
    background-color: var(--gray4);
    padding: 0.0625rem 0.3125rem;
    border-radius: 0.125rem;}
.linkSwitch {
    cursor: pointer; text-decoration-style: dotted; ;}
.containerButtonChaChaNonce {
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: 0.125rem 0.375rem;}
.containerButtonChaChaNonce button {
  width: 100%;}
</style>
