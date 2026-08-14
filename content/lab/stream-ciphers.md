+++
title = "Stream Ciphers"
description = "Exploring stream ciphers, mostly ChaCha20-Poly1305."
weight = 3
draft = false
template = "article.html"
[extra]
type = "article"
thumbnail = "lab.bits.svg"
thumbnailalt = "Lines of dashes of variable width representing bits."
+++

Every day, billions of messages are exchanged over the internet, including very sensitive messages like financial transactions and private user data. All this information often travels across untrusted networks, and so it must be protected from anyone attempting to intercept the communication. One way to securely exchange data is by [encrypting](https://en.wikipedia.org/wiki/Encryption) the data before sending it over any network.

Encryption is a way to encode data so that only people who have 'keys' to the encoded data can 'unlock' or decrypt it. Depending on the type of keys used, encryption schemes can be broadly classified into two main categories. The first kind uses the same key for both encryption and decryption, and is called [symmetric key cryptography](https://en.wikipedia.org/wiki/Symmetric-key_algorithm). The second type is called  [asymmetric key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography), which instead uses different keys — one for encryption and a separate one for decryption.

This post is about symmetric key cryptography. More specifically, it is about how using even seemingly very simple operations like additions and multiplications is enough to secure the entire internet. To be even more specific, it is about the ChaCha20-Poly1305 cipher (an algorithm for encryption-decryption) actually works.

## Caesar Cipher

One of the simplest encryption techniques includes the [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher), a type of [simple substitution cipher](https://en.wikipedia.org/wiki/Substitution_cipher#Simple). The message to be encrypted (called plaintext) is encoded by substituting its letters with the corresponding letters from an alphabet that is 'shifted' or 'rotated' by some amount:

<canvas id="canvasCaesar"></canvas>
<input id="inputCaesar"><br>
<input id="sliderCaesar" type="range">Shift: <span id="spanCaesar"></span>

If the letters are encoded as a number determined by its position in the alphabet, then the encrypted letter for a plaintext letter `m` is `E(m) = (m + k) mod 26`, where `k` is the shift value. The encrypted message is often referred to as the ciphertext. Decryption has to reverse the encryption operation. So the decrypted letter for the ciphertext letter `c` is then `D(c) = (c - k) mod 26`.

<canvas id="canvasCaesarDecrypt"></canvas>

{% <tangent summary="Modulo Operation" open={true}> %}
The `mod` or [modulo operator](https://en.wikipedia.org/wiki/Modulo) returns the remainder after division by a number. The divisor in this case is 26, or the numbers of letters in the Latin alphabet.
{% </tangent> %}

[ROT13](https://en.wikipedia.org/wiki/ROT13) is a special case of a Caesar cipher, having a shift value of 13. The Latin alphabet has 26 letters; shifting the alphabet up by 13 positions is the same as shifting it down by 13 positions — so decryption is effectively the same as encryption. That is, for a plaintext message `m` and ciphertext `c`:

`E(m) = (m + 13) mod 26 = (m - 13) mod 26 = c`\
`D(c) = (c + 13) mod 26 = (c - 13) mod 26 = m`

The only difference between encryption and decryption is the domain of the operators. While one operates on plaintexts, the other operates on ciphertexts — but that difference is purely in semantics.

<canvas id="canvasRot13"></canvas>
<input id="inputRot13"><br>
<input id="sliderRot13" type="range" disabled> Shift: <span id="spanRot13"></span>

{% <tangent summary="Same operation for encryption and decryption" open={true}> %}
Since shifting the alphabet by thirteen letters upwards (addition) is the same as shifting it downwards (subtraction) by thirteen letters, the process for encryption and decryption is effectively the same. So, both encryption and decryption can be performed using the same operation `(m + 13) mod 26`.
{% </tangent> %}

The shift parameter in the Caesar cipher determines how a message gets encrypted and decrypted — it acts as a 'key' for encrypting and decrypting the data. Only parties who have the knowledge about the keys can decrypt the messages encrypted with that key. While this is the main goal of symmetric encryption, the Caesar cipher is not a very good way to achieve this goal. This is because single-alphabet substitution ciphers like the Caesar cipher are not secure. They can be easily broken using brute force and frequency analysis attacks.

{% <tangent summary="Brute force attacks" open={true}> %}
A [brute force attack](https://en.wikipedia.org/wiki/Brute-force_attack) refers to systematically trying all possible combinations for a key, until a correct key is found. For single-alphabet substitution ciphers (eg. the Caesar cipher), trying all combinations takes a trivial amount of time and thus the cipher is easily broken.
{% </tangent> %}

{% <tangent summary="Frequency analysis attacks" open={true}> %}
In [frequency analysis attacks](https://en.wikipedia.org/wiki/Frequency_analysis#Frequency_analysis_for_simple_substitution_ciphers), the distribution of letters in a language is studied to find likely candidates for keys. It will be discussed in slightly more detail below.
{% </tangent> %}

## One-Time Pad

In the Caesar cipher, all the letters of the plaintext are shifted by the same amount, which is determined by a single-valued key. However, it can be argued that using [separate shift values](https://en.wikipedia.org/wiki/Polyalphabetic_cipher) for each letter is more secure. The [Vigenère cipher](https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher) does exactly that — it is a cipher that employs multiple shift values for encrypting messages. The key here is multi-valued, and the each letter of the plaintext is shifted based on the values of the key. When the key is shorter than the message, the key is repeated until it matches the length of the message.

<canvas id="canvasVignere"></canvas>
<input id="inputVignere"><br>
<input id="inputVignereKey"><br>
Key: <span id="spanVignere"></span>

{% <tangent summary="Multi-valued key" open={false}> %}
Each letter in the plaintext is shifted by a different amount, based on the key values. Here, since the key is shorter than the message, the key (ie. the shift values) is repeated until it matches the length of message.
{% </tangent> %}

Again, decryption involves the reverse operation — subtracting the key values from the ciphertext.

<canvas id="canvasVignereDecrypt"></canvas>

We started with an assumption that using multiple shift values is somehow more secure than a single value. To understand why, imagine some random plaintext message. The distribution of letters in message would likely follow the frequency distribution of letters used in the language. Now imagine if the plaintext letters are shifted by a singular value. The distribution of the ciphertext would be similar to the plaintext, except only shifted by the value amount.

<canvas id="canvasLetterFrequencyStatic0"></canvas>

{% <tangent summary="Distribution distortion" open={true}> %}
This is how the frequency distribution for letters for an English plaintext message will get distorted by a single-valued key — which in this case is `1`.

The top distribution is frequency letter distribution for the plaintext, while the one below that shows the frequency letter distribution for the ciphertext. Some of the bars (the first five) are coloured to make it easier to keep track of where letters in the plaintext end up in the ciphertext. Here for example, all the plaintext 'A's will end up as ciphertext 'B's, 'B's will end up as 'C's, 'C's will end up as 'D's, etc.

Conversely, all the ciphertext 'C's definitively correspond to plaintext 'B's, 'B's correspond to 'A's, etc. Every ciphertext letter corresponds to a plaintext letter, and by simply trying to match the frequency distributions and find a mapping, the entire cipher can be broken.
{% </tangent> %}

From the ciphertext distribution it easy to understand why a single-alphabet substitution cipher (eg. Caesar) is so insecure. Since each ciphertext letter corresponds to a single plaintext letter, it is very easy to break the encryption if any corresponding plaintext letter is found — and it can be found easily by trying to match up the frequency distributions.

But now imagine if there are now two different shift values. Half of the plaintext letters would get shifted by one value, and half of them by the other value. The distribution of the ciphertext would look slightly more 'diffused', and each ciphertext letter would now correspond to two possible plaintext letters.

<canvas id="canvasLetterFrequencyStatic1"></canvas>

{% <tangent summary="Distribution distortion" open={true}> %}
This is how the frequency distribution would get distorted by a multi-valued key — which in this case is `1, 2`.

Here, all the plaintext 'A's will end up as either ciphertext 'B's or 'C's, 'B's will end up as 'C's or 'D's, and plaintext 'C's will end up as 'D' or 'E's, etc. Conversely, a ciphertext 'C' could refer to a plaintext 'B', but could also refer to an 'A'.

Firstly, it creates a more uniform distribution, which already makes frequency analysis more difficult. Second and more importantly, each ciphertext letter can now refer to two (or more) possible letters rather than a definitive one.
{% </tangent> %}

So, using more shift values spreads the likelihood of a ciphertext letter corresponding to a plaintext letter over more letters. It means using more shift values increases the range of plaintext possibilities, and thus make it less likely to correctly guess the plaintext from the ciphertext.

<canvas id="canvasLetterFrequency"></canvas>
<input id="inputLetterFrequencyKey"><br>
Key: <span id="spanLetterFrequencyKey"></span>

{% <tangent summary="Custom key" open={true}> %}
Try experimenting with the key to understand how the plaintext letters are distributed in the final ciphertext after being shifted by the values in the key. Using more values spreads the plaintext over more ciphertext values. Notice how using <a id="linkLetterFrequencyGaussian" class="linkSwitch">less uniform</a> values makes it more likely to guess the plaintext letter from the ciphertext, and less likely when the keys are <a id="linkLetterFrequencyUniform" class="linkSwitch">more uniformly distributed</a>. More on that in the following section.
{% </tangent> %}

Judging from the above example, one might assume the key only needs to be <a id="linkLetterFrequencyPerfect" class="linkSwitch">26 values long</a> (or the size of the chosen alphabet) to achieve maximum diffusion. Except it is not the case; the graph is misleading because it does not show the inherent structure of the entire key (and ciphertext) and only shows the aggregate values — the bars represent the total aggregated frequencies, but fail to show anything about the position of the keys and ciphertext.

Eagle-eyed readers may have already raised some eyebrows in the previous example that used keys of length two. If an attacker knew that the key repeats every *n* letters, then instead of a ciphertext letter corresponding to multiple possible plaintext letters, it would map to only one possible letter — ciphertext letters that appear after every *n* letters will all have the same shift value (since the key also repeats), and hence the ciphertext letters will have a singular, definitive mapping.

And finding the original key is not particularly difficult. If the length of the key is somehow known, then *n* separate distributions can be constructed — one distribution for all the letters appearing after every *n* intervals in the ciphertext. These *n* frequency distributions can be viewed as *n* Caesar ciphertexts, all of which can be individually broken [using the same method as the frequency analysis](https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher#Cryptanalysis) attack using a single distribution.

<canvas id="canvasLetterFrequencyStaticMultiple"></canvas>

{% <tangent summary="Separating frequency distributions" open={true}> %}
The above graphic illustrates how information can be extracted with a key that repeats, when its length is known. The coloured dots at the top represent ciphertext letters, 'encrypted' using the key [9, 18, 1]. The distribution coloured black is the overall frequency distribution of the ciphertext letters — and is relatively uniform, which might make frequency analysis attacks somewhat difficult.

However if the key length (three) is known, then three separate frequency distributions can be constructed using letters appearing after every three intervals in the ciphertext (coloured green, pink, and blue here). Here, letters at position 3N (coloured green) will all be shifted by the same amount (9) since the key repeats after every three intervals, and thus will form a distribution that is shifted by nine places. The same applies for letters at positions 3N+1 and 3N+2, where the letters gets shifted by eighteen units and one unit respectively — since the key is [9, 18, 1].
{% </tangent> %}

However this attack is not possible if the key does not repeat. In fact, removing repetition or any structure from the key makes it impossible to break the cipher, other than by brute-forcing all combinations. This effectively means that entire key must be random. Using a key which is at least as long as the plaintext, and is [truly random](https://en.wikipedia.org/wiki/Random_number_generation#True_vs._pseudo-random_numbers) will be [perfectly secure](https://en.wikipedia.org/wiki/Information-theoretic_security). The [proof](https://www.math.umd.edu/~lcw/OneTimePad.pdf) is somewhat simple — it is impossible to exploit structures to find keys if there *is no* structure; every key is as likely as all the other possible combinations.

<canvas id="canvasOneTimePad"></canvas>
<input id="inputOneTimePad"><br>
Key: <span id="spanOneTimePad"></span>

{% <tangent summary="Random key" open={true}> %}
The plaintext here is encrypted with keys that are randomly generated, and thus the ciphertext is effectively random as well. The ciphertext will map to a plaintext of the same length, but since the key is uniformly random, every possible combination of letters in the plaintext is as equally likely as all the other possible combinations of letters. This effectively means every plaintext message is equally likely, so no information can be extracted from the ciphertext.
{% </tangent> %}

This cipher scheme is called the [one-time pad](https://en.wikipedia.org/wiki/One-time_pad). The only information that can possibly be leaked is the maximum length of a message.

But there is an important caveat: The one-time pad is only secure if the key is kept secret and is **never** reused. The moment the same key is used more than once, all its security benefits vanish. To understand why, consider two different messages that are encrypted with the same key. An attacker can subtract the ciphertext of one message from the other to find the plaintext (or more accurately, the differences between the plaintext). For example, if `m1` and `m2` are messages that are both encrypted with key `k` then:

`c1 = (m1 + k) mod 26`\
`c2 = (m2 + k) mod 26`

Subtracting ciphertext `c1` from `c2` eliminates `k` and leaves `m2 - m1 (mod 26)`. It might feel like the plaintext difference would be a garbled mess, but even the differences in plaintexts can expose structures within the individual plaintexts — which might end up leaking information about the original plaintexts.

<canvas id="canvasOTPReuse"></canvas>

{% <tangent summary="Visualizing ciphertext differences" open={true}> %}
The above graphic shows how the difference in ciphertexts can leak plaintext information. Consider two plaintext messages with some structure — visualized above as two grayscale images (top row). Earlier, the numbers mapped to letters; here they are mapped to brightness values. This is simply to make the patterns in data easier to see.

Both the plaintexts are encrypted (padded/shifted) with the same key (middle row). Even if the key is truly random, the ciphertexts (bottom row) are not at all secure since both are padded using the same key — even if the ciphertexts individually look random and secure. An attacker here can subtract one ciphertext from the other to find the difference in plaintext, which can expose structures in the plaintexts, and possibly even leak the individual plaintexts if slightly more advanced techniques are used.
{% </tangent> %}

It also goes without saying that the key must be kept secret. It should only be known by the communicating parties, and no one else.

## Vernam Cipher

Another thing to note for the one-time pad is that the cardinality of key symbols must be equal (or greater than) the cardinality of the plaintext symbols — ie. if the size of alphabet of the plaintext is 26 symbols (letters) then the key must also contain at least 26 symbols, which map all the plaintext symbols to all the ciphertext symbols with equal probability. If the cardinality of the key is larger than the plaintext, then it must be ensured that the surplus key symbols do **not** break the uniform randomness constraint. All of the plaintext symbols must still map to the all ciphertext symbols with equal probability.

If the cardinality of key is smaller than the plaintext, then some of the ciphertext symbols are unreachable for a given plaintext symbol. For example, if the key cardinality is two (eg. the key values are 1, 2), but the plaintext cardinality is 26 (eg. English alphabet), then 24 of the letters are always unreachable for a given plaintext symbol. That is, 'A' will never map to any letter other than 'B' or 'C' (when the key values are 1, 2). This, as [shown earlier](#canvasLetterFrequencyStatic1), is not secure.

<canvas id="canvasMapPlainCipher"></canvas>
<input id="sliderMapPlainCipher" type="range"> Key Cardinality: <span id="spanMapPlainCipher"></span><br>

{% <tangent summary="Weak keys" open={true}> %}
Since the key cardinality is much smaller than that of the plaintext, each plaintext symbol only maps to a subset of the ciphertext symbols. Conversely, this means a given ciphertext symbol will only map to a subset of plaintext symbols as well. This can greatly reduce the combinations of possible plaintexts, making it insecure.

In the above example notice how many different plaintext letters the ciphertext letter 'M' can correspond to, depending on the cardinality of the key. When the cardinality of the key is equal to the cardinality of the plaintext, a ciphertext symbol corresponds to all of the plaintext symbols with equal probability — making any type of attack impossible. This would not be the case if a ciphertext symbol does not map to all the plaintext symbols with equal probability; some of the symbols will have zero probability, and attackers may use that information to break the cipher.
{% </tangent> %}

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

{% <tangent summary="Same operation for encryption and decryption" open={false}> %}
The above example shows a binary plaintext being padded using a binary key to get the ciphertext. Since addition and subtraction is the same, the same operation can be performed on the ciphertext to get back the plaintext.

Similar to [ROT13](#canvasRot13) — where shifting the symbols upwards and downwards (addition/subtraction) by 13 in modulo-26 arithmetic is same — here, in modulo-2 arithmetic, shifting the symbols upwards and downwards (addition/subtraction) by 1 is the same. So encryption and decryption is the same; both can be done using `(m + k) mod 2`.
{% </tangent> %}

The Vernam cipher is useful because computers naturally store messages in binary, and more importantly, modulo two addition can be performed very quickly and efficiently by processors using [XOR gates](https://en.wikipedia.org/wiki/XOR_gate). So ciphertexts can be generated by combining the plaintext with a key using the XOR operation.

`c = (m + k) mod 2 = m ^ k`\
`m = (c + k) mod 2 = c ^ k`

<canvas id="canvasVernamXOR"></canvas>
Key: <span id="spanVernamXOR"></span>

{% <tangent summary="The XOR operation" open={true}> %}
The [XOR operator](https://en.wikipedia.org/wiki/Exclusive_or) `^` takes two binary inputs and returns one if and only if one of the inputs is one, otherwise it returns zero — same as modulo two addition using binary numbers.
{% </tangent> %}

The binary key of the Vernam cipher is referred to as a keystream, as it is a stream of bits that is XOR'ed with the stream of plaintext bits to generate the ciphertext stream.

The Vernam cipher keystream must have the same properties as the one-time pad key to have the same security guarantees. It must be at least as long as the plaintext stream, and should be truly random. The key must also **never** be reused as otherwise it can leak information about the plaintext.

<canvas id="canvasVernamReuse"></canvas>

{% <tangent summary="XOR self inverse" open={true}> %}
Here the bits are coloured white for 0 and black for 1. The top row represents two different plaintext messages, with some structure. The middle row has two identical randomized keystreams — which are used for padding the above two plaintexts to get the ciphertexts (on the bottom row). When the two ciphertexts are XOR'ed with each other, it reveals some of the original structure of the two plaintexts (rightmost graphic, on the bottom row).

In XOR, a number is its own inverse. That is `x ^ x = 0`, so `y ^ x ^ x` = `y ^ 0` = `y`. The XOR operations are also [associative](https://en.wikipedia.org/wiki/Associative_property) and [commutative](https://en.wikipedia.org/wiki/Commutative_property). These properties can be exploited to leak plaintext data by XOR'ing two ciphertexts encrypted with the same key:

`c1 ^ c2`\
`= (m1 ^ k) ^ (m2 ^ k)`\
`= m1 ^ k ^ m2 ^ k`\
`= m1 ^ m2 ^ k ^ k`\
`= m1 ^ m2`

As discussed earlier, even recovering the combined structure of plaintexts can be enough to leak information about the individual ciphertexts — as is already somewhat evident in the visual example above.
{% </tangent> %}

So the keystream, just like the one-time pad, must be kept secret and truly random, and must never be repeated for it to be perfectly secure.

## ChaCha20 Cipher

Although the Vernam cipher enables extremely fast and efficient encryption/decryption (since it is just a single XOR operation), and is perfectly secure, it is impractical as it relies on the secure and secret distribution of keys. If a key (which is at least the size of the message) can be securely transmitted, it makes more sense to simply send the message itself instead.

The impracticality arises from needing to exchange keys that are (at least) as long as the message. If there was a way to compress the key to a more practical size, the Vernam cipher would have been a lot more useful. Fortunately, there are ways to do this — well to be more accurate, there are [ways](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) to generate identical streams of random bits from identical seed (initial) values. So the communicating parties can exchange only the small seed values and generate the same keys, instead of exchanging keystreams that are as long as the plaintext. This makes this cipher a lot more practical.

<canvas id="canvasKeyExchange"></canvas>

{% <tangent summary="Keystream from a small seed" open={true}> %}
Small initial values (shown on the left in the above graphic) can be exchanged securely between the communicating parties — which can be used to generate much longer keystreams (shown right of the seed values in the graphic). Since the seed values will be identical, both parties A and B will have identical keystreams as well. Party A can pad the plaintext (the bitstream at the top) to get the ciphertext (the third bitstream). Party B can use the identical keystream to decrypt the ciphertext sent by party A (the fourth bitstream) to get back the plaintext (the bottom bitstream).
{% </tangent> %}

The bad news: If the same keystream is generated from the same initial value, then the keystream is essentially tied to the seed value — it is not really random, it is deterministic. But here's the good news: The key does not need to be truly random. It needs to be truly random for perfect security, but sometimes good-enough security is more than sufficient especially if it makes the cipher practical and actually usable.

{% <tangent summary="Pseudorandomness" open={true}> %}
The random numbers generated this way are not actually random since they are generated from a seed, but still appear and behave like true random numbers. This is called [pseudorandomness](https://en.wikipedia.org/wiki/Pseudorandomness).
{% </tangent> %}

So what differentiates perfect security from good enough security? What differentiates a truly random bitstream from a pseudorandom bitstream? The first question is easier to answer; the second will be [discussed later](#canvasChaChaDiffusion). For the first question: If perfect security is defined as impossible to break, then 'good enough' security can be defined as the level of security that requires an unfeasibly large number of brute-force attempts to break the cipher, making any practical attack effectively impossible.

This 'good enough' security can be ensured if the generated randomness has no hidden patterns that can be exploited or reverse-engineered; and by ensuring all the possible values for the seed is big enough to deter brute-force attacks. For example, a [one-way](https://en.wikipedia.org/wiki/One-way_function) function that takes a 256-bit number as its input and then outputs a random bitstream for each of its possible inputs can be considered secure enough — if the random stream generator function is secure. This is because brute-forcing a hundred quattorvigintillion seed values (2^256) is practically infeasible.

This is the central idea behind the [ChaCha20](https://en.wikipedia.org/wiki/Salsa20#ChaCha_variant) cipher. In this cipher, a 512-bit seed is used for generating (pseudo)random keystreams — multiple rounds of [ARX (add-rotate-XOR) operations](https://en.wikipedia.org/wiki/Block_cipher#ARX_(add%E2%80%93rotate%E2%80%93XOR)) are performed on the initial seed value to generate streams of pseudorandom values. These streams are then used to pad (XOR) the plaintext to get the ciphertext, and vice versa — padding the ciphertext to get the plaintext.

<canvas id="canvasKeyExchangeChaCha"></canvas>

{% <tangent summary="The ChaCha20 cipher" open={true}> %}
A 512-bit seed value is exchanged securely between the communicating parties, which is used for generating much longer pseudorandom keystreams. The ChaCha function `f` consists of ARX operations and transforms the seed to a stream of pseudorandom values, which is then used for padding the plaintexts and ciphertexts.
{% </tangent> %}

This ChaCha20 function `f` is fundamental in transforming the initial seed to a stream of random bits. But to understand how this function works, we first need to understand how exactly are the additions, rotations and XORs performed on the seed.

### ARX Operations

In ChaCha20, a pseudorandom stream is generated from a 512-bit seed by first dividing the seed into a 4x4 block of 32-bit [words](https://en.wikipedia.org/wiki/Word_(computer_architecture)).

<canvas id="canvasChaChaPartition"></canvas>

{% <tangent summary="Seed block" open={true}> %}
A 512-bit seed is first logically divided into sixteen 32-bit words (segments). Each word is represented here as a block, and each bit in the 32-bit word is represented as a unit square in the illustration above. Squares are coloured gray if the bit is 1, and white if the bit is 0.
{% </tangent> %}

These words are then rotated, added and XOR'ed with each other in a specific manner to generate a random block from the seed block. The sequence of addition, rotation, and XOR operations is strictly defined. The primary operation in this sequence is the quarter round function — it operates on four words at a time, and is defined as:

`a += b; d ^= a; d <<<= 16;`\
`c += d; b ^= c; b <<<= 12;`\
`a += b; d ^= a; d <<<=  8;`\
`c += d; b ^= c; b <<<=  7;`

Where `a`, `b`, `c`, `d` are four 32-bit words from the 4x4 block. And `a += b` means adding a and b, and storing the result in a; `b ^= c` means XOR'ing b and c, and storing the result in c; `d <<<= 8` means [left rotating](https://en.wikipedia.org/wiki/Circular_shift#/media/File:Rotate_left.svg) d by 8 bits. Performing the above twelve operations completes one quarter round; performing four quarter rounds makes up one full round.

Twenty of these rounds are performed in ChaCha20 — these twenty rounds are divided into odd and even rounds. On odd rounds (the first round, third round, fifth round, and so on), the quarter rounds are performed on the four columns of the block. While on even rounds (the second, fourth round etc), the quarter rounds are performed on the four left diagonals of the block.

<canvas id="canvasChaChaARX"></canvas>
<button id="buttonChaChaARXNext">Perform Quarter Round</button>
<button id="buttonChaChaARXReset">Reset</button><br>
Round: <span id="spanChaChaARXRounds">0</span>

{% <tangent summary="ChaCha20 rounds" open={true}> %}
The above example shows a quarter round being performed on four words. Four words `a`, `b`, `c`, `d` are selected out of the sixteen words, based on the current iteration of the current round. The above twelve ARX operations are then performed on these four words. The specific set of four words very based on the type of round:

On odd rounds the operations are performed on the four columns of the 4x4 block — so performing the quarter round function on words [0, 4, 8, 12], and then on words [1, 5, 9, 13], then on [2, 6, 10, 12], and finally on words [3, 7, 11, 15] makes up one full odd round. While on even rounds, the quarter round functions are performed on the diagonals — so the quarter rounds are performed on words [0, 5, 10, 15], then [1, 6, 11, 12], then [2, 7, 8, 13], and then [3, 4, 9, 14].
{% </tangent> %}

These operations effectively ['diffuse'](https://cr.yp.to/snuffle/diffusion.html) the bits of the words with each other, generating a pseudorandom 512-bit block. However this pseudorandom block is not the final keystream. This block is first added to the original block, and only does it become (a part of) the final pseudorandom keystream.

<canvas id="canvasChaChaAddition"></canvas>

{% <tangent summary="Addition of final and initial state" open={true}> %}
The pseudorandom block obtained after performing twenty full rounds of the ARX operations is then added to original seed block, to generate the final pseudorandom block. The addition of the blocks is performed word-by-word, so each output word in final block is the sum of the corresponding words from the two input blocks.
{% </tangent> %}

The addition step is important since the mixing rounds are invertible. That is, it is possible to apply the reverse operations on the pseudorandom block to get the seed block. The ARX operations and this addition step together, however, make it practically impossible to derive the original seed block from an output pseudorandom block.

### Counter & Nonce

So the ChaCha20 operations transform a 512-bit seed block to a 512-bit pseudorandom block. But these 512 random bits can only be used to encrypt 512 bits of a plaintext message. What is actually required, is a long stream of pseudorandom bits — a lot more than just 512 pseudorandom bits.

<canvas id="canvasChaChaSingle"></canvas>

{% <tangent summary="Insufficient bits" open={true}> %}
A pseudorandom block of 512 bits can encrypt 512 bits of plaintext data. More pseudorandom bits (or pseudorandom blocks) are needed to encrypt longer plaintext messages.
{% </tangent> %}

To encrypt longer messages, more pseudorandom blocks are required. And these blocks must not repeat and must not be related to each other. If attackers find some correlation between the pseudorandom blocks, they can leverage it to find patterns in the ciphertext and possibly even break the cipher.

However, producing different blocks from the same initial state block is impossible. Since the ARX operations are deterministic, the same seed blocks will always produce the same pseudorandom blocks. The only way to generate different pseudorandom blocks is by altering the seed block itself.

Luckily, ChaCha20 already defines a standardized of altering the seed block to generate new pseudorandom blocks — the last four words (128 bits) of original 512-bit block are reserved for the sole purpose of modifying the initial state block, and generating new pseudorandom blocks. The four words are logically separated into two parts — a counter and a nonce. These are incremented to generate new pseudorandom blocks.

<canvas id="canvasChaChaPartitionSequence"></canvas>
<button id="buttonChaChaPartitionSequenceDecrement">Decrement Counter</button>
<button id="buttonChaChaPartitionSequenceIncrement">Increment Counter</button>

{% <tangent summary="Introducing variation" open={true}> %}
The last four words in the seed block are reserved for modifying the seed block — for generating new pseudorandom blocks. Incrementing the counter changes the seed block, and performing the ChaCha rounds on the altered seed block will generate a new pseudorandom block that is different from the original pseudorandom block (generated with the older seed block with the older counter value).

The new pseudorandom blocks generated by incrementing the counter can be used to encrypt much longer plaintext messages. As for the nonce, its meaning and purpose will be discussed slightly later.
{% </tangent> %}

Incrementing the counter changes the seed block — sometimes, by only a single bit. But because of the diffusion introduced by the ARX operations, even a single bit difference cascades through the rounds and completely changes the output pseudorandom blocks. The output blocks are *practically* completely random and unrelated, preventing attackers from inferring correlations and breaking the cipher.

<canvas id="canvasChaChaAvalanche"></canvas>
<button id="buttonChaChaAvalancheNext">Perform Quarter Round</button>
<button id="buttonChaChaAvalancheReset">Reset</button><br>
Round: <span id="spanChaChaAvalancheRounds">0</span>

{% <tangent summary="Avalanche effect" open={true}> %}
The above illustration shows how even a single bit change in the seed block propagates through the entire block via the ARX operations and completely changes the output. The seed block on the left has its counter value set to zero, while the seed block on the right has its counter set to one. The block at the bottom highlights the bit differences between the above two blocks in blue.

The same ARX operations are performed on both the blocks, but because of the initial difference in the seed block, the outputs start diverging. The difference in output is already significant after just a few rounds; after twenty rounds, there is virtually no indication that the output blocks originated from similar seed blocks.
{% </tangent> %}

The new output blocks generated by incrementing the counter together form a stream of pseudorandom bits — which can be used to encrypt data longer than just 512 bits.

To encrypt longer messages, the counter is incremented and new pseudorandom blocks are generated. This way, the counter also keeps track of the current block's position in the keystream. To encrypt/decrypt a specfic section of a message, only that specific part of the keystream can be generated — by using the counter values corresponding to that portion of the keystream.

<canvas id="canvasChaChaCounter"></canvas>
<button id="buttonChaChaCounterDecrement">Decrement Counter</button>
<button id="buttonChaChaCounterIncrement">Increment Counter</button><br>
Counter: <span id="spanChaChaCounter"></span>

{% <tangent summary="ChaCha20 counter" open={true}> %}
The counter can be incremented to generate more pseudorandom blocks, which together form a keystream that can be used to encrypt/decrypt (XOR) longer plaintexts.

With this design, decrypting (as well as encrypting) only certain portions of ciphertext (or plaintext) also becomes very simple. Instead of needing to decrypt the entire ciphertext, specific sections can also be selectively decrypted — by finding the corresponding counter values (offset / 512 bits), and then generating the pseudorandom blocks with those counters, and then XOR'ing it with the ciphertext to decrypt it.
{% </tangent> %}

However there is an issue when the counters represent/rely on the positional information of a message. For newer messages, the counter will reset to zero and start repeating values. So the initial blocks will be identical, even for different messages. This means the pseudorandom blocks and keystreams will also be identical.

As [shown earlier](#canvasVernamReuse), encrypting different data using the same keys (pseudorandom blocks, or pseudorandom keystreams) is very dangerous as it leaks plaintext data.

<canvas id="canvasChaChaCounterRepeat"></canvas>
<button id="buttonChaChaCounterRepeatDecrement">Decrement Counter</button>
<button id="buttonChaChaCounterRepeatIncrement">Increment Counter</button>

{% <tangent summary="Reusing keystreams" open={true}> %}
Consider two different plaintext messages (shown above). If the aforementioned technique is used for generating keystreams for encrypting the plaintexts, then the same keystreams is produced for both the plaintexts — because the seed blocks are the same and the counters are always incremented the same way, the keystreams will end up being the exact same as well.

As discussed, XOR'ing two ciphertexts that were encrypted with the same key(stream) leaks information about both the plaintexts. In the above example, the last row shows when the two above ciphertexts are XOR'ed with each other — it leaks plaintext information (more accurately, it is the XOR of the two plaintexts). So keystreams **must** not repeat.
{% </tangent> %}

A simple solution to ensure seed blocks do not repeat is to use another 'counter' to keep track of messages as well. Instead of just having one counter that tracks positions of blocks inside messages, there can be another counter that tracks messages itself — this counter increments for every new message.

This way, even when the 'positional' counter resets and repeats for newer messages, the seed blocks still remain unique — since the new 'message counter' now has different (incremented) values. To prevent identical seed blocks and keystreams, this message counter must never repeat. This new 'counter' is called the nonce — Number used Once. Using the nonce only once ensures that keystreams are never identical.

<canvas id="canvasChaChaNonce"></canvas>
<div class="containerButtonChaChaNonce">
<button id="buttonChaChaNonceCounterDecrement">Decrement Counter</button><button id="buttonChaChaNonceCounterIncrement">Increment Counter</button>
<button id="buttonChaChaNonceDecrement">Decrement Nonce</button><button id="buttonChaChaNonceIncrement">Increment Nonce</button>
</div>
Nonce: <span id="spanChaChaNonce"></span>,
Counter: <span id="spanChaChaNonceCounter"></span>

{% <tangent summary="ChaCha20 nonce" open={true}> %}
The above example is similar to the previous one, except here, the nonce can be changed as well. Notice how entirely different keystreams are generated when the nonce is different. These different keystreams can be used for encrypting and decrypting multiple additional plaintext messages, not just one message.

Since they keystreams are different, XOR'ing the ciphertexts (as shown in the bottom row) does not leak plaintext data unlike last time. This is also why nonce values must **never** be reused — otherwise the same keystreams are generated, which risks leaking plaintext data.
{% </tangent> %}

The counter and nonce provide a simple yet powerful way to transform the seed block to generate enough pseudorandom bits to encrypt *lots* of *really* long messages — all from a single seed block.

{% <tangent summary="Theoretical limits for keystream size" open={false}> %}
The size of the counter in ChaCha20 is two words (64 bits). So 2^64 new blocks can be generated by incrementing the counter. Since each block is 512-bits, the keystream can be up to 1 ZiB. So a 64-bit counter can encrypt up to 1 ZiB long plaintext messages. Similarly, the nonce is also two words (64 bits). Thus, a total of 2^64 messages, each of size 1 ZiB can be encrypted.
{% </tangent> %}

### Bit Constants

While extremely rare, there is a case when the entire seed block is all zeroes. Diffusing bits that are all zeroes with each other does not generate a pseudorandom block, instead it simply produces an all-zero block. Encrypting data with the all-zero block is dangerous as it does not encrypt the data at all since `m ^ 0 = m`.

<canvas id="canvasChaChaZeroBlock"></canvas>

{% <tangent summary="Zero block" open={true}> %}
Performing the ChaCha20 ARX operations on an all-zero seed block [does nothing](https://en.wikipedia.org/wiki/Fixed_point_(mathematics)) — the output block will also be all zeroes. The subsequent output blocks after the first output block (the rest of the keystream) will not be all-zero blocks however because the counter will have non-zero values.

But even then, the first 512 bits of the keystream will be all zeroes, and so the first 512 bits of the plaintext does not get encrypted. If an attacker correctly guesses the seed block was all zeroes from this, they can easily generate the rest of the keystream (by incrementing the counter) and recover the entire message.
{% </tangent> %}

To prevent the all-zero block, certain bits of the seed block are always non-zero. More specifically, the first four words (128 bits) of the seed block are specific constants, so the seed block is never all zeroes.

<canvas id="canvasChaChaPartitionConstants"></canvas>

{% <tangent summary="ChaCha20 constants" open={true}> %}
The first four words in the ChaCha20 seed block have certain fixed values.
{% </tangent> %}

The constant values avoid the all-zero block, but really more importantly these constants [introduce asymmetry](https://cr.yp.to/snuffle/security.pdf#page=5) if their values are chosen wisely. ChaCha20 has some rotational symmetry — different seed blocks can generate the same, [rotated versions](https://en.wikipedia.org/wiki/Group_action) of the output block, if the seed blocks are specific rotated versions of itself. Having fixed asymmetrical values for certain words eliminates the possibility of this shift/rotate structure, preventing attackers from exploiting relationships between related seeds.

The constants in ChaCha20 do introduce asymmetry, and have the values 0x61707865, 0x3320646e, 0x79622d32, 0x6b206574. There is [nothing special](https://en.wikipedia.org/wiki/Nothing-up-my-sleeve_number) about these constants as they simply spell "expand 32-byte k" in [ASCII](https://en.wikipedia.org/wiki/ASCII) in [little endian](https://en.wikipedia.org/wiki/Endianness#/media/File:32bit-Endianess.svg).

### Shared Key

The constants do not *need* to be exchanged securely; these are public and standardized. Similarly, exchanging the counter and nonce values securely would be very impractical as keep changing frequently. And in fact, in ChaCha20, these do not need to be securely exchanged either — the cipher is still secure.

The cipher remains secure because even if the constants, the counter and the nonce are non-secret, the remaining eight words (256 bits) are not. Attackers will need to brute force an average of 2^255 possible combinations to find the original seed block — which is completely impractical. These remaining eight words are used for the 'actual key' and need to be exchanged securely between the communicating parties.

<canvas id="canvasChaChaPartitionKey"></canvas>

{% <tangent summary="ChaCha20 key" open={true}> %}
The remaining eight words in a ChaCha20 seed block are reserved for the 'actual key' — in the sense that it needs to be secret; no one apart from the communicating parties should know the values of these 256 bits.
{% </tangent> %}

So two parties need to securely exchange only one 256-bit key to be able to encrypt and decrypt virtually unlimited number of messages. The other values do not need to be exchanged, or at least exchanged securely. The values of the counter always increment the same, predictable way — they do not need to be shared. The constants are public. The nonce, which varies per message, is needed to generate the correct keystream, but does not need to be securely transmitted.

In effect, just the key and nonce need to be shared, and moreover only the key needs to be securely transmitted.

<canvas id="canvasStructuredKeyExchange"></canvas>

{% <tangent summary="Seed transmission" open={true}> %}
The communicating parties only need to securely share the 256-bit key; the nonce can be shared publicly. When both the parties have the same key and nonce (and the public constants), they effectively have the same seed blocks — and so will generate identical keystreams when the counters are incremented. These identical keystreams can then be used to encrypt and decrypt messages. Attackers cannot reproduce the keystream as they do not have 256 bits of the original seed block, and it would be impractical to brute force all combinations.
{% </tangent> %}

All of this is ChaCha20 — a practical adaptation of the one-time pad (or more specifically the Vernam cipher). Rather than requiring an entire keystream to be shared securely, it only requires a 256-bit key to be shared securely. However, this practicality comes at the cost of perfect security, as the generated keystreams are not truly random. This tradeoff is acceptable though, as the cipher is still reasonably secure.

## Authenticated Encryption

While ChaCha20 provides a way for securely encrypting and decrypting data, it does not have any built-in mechanism to prevent attackers from tampering with the ciphertext itself. In fact, if an attacker knows a certain message always appear at a certain position in the plaintext stream (eg. the payment amount information always appearing at some fixed offset in a transaction message), then attackers can [modify that specific section of the ciphertext](https://en.wikipedia.org/wiki/Bit-flipping_attack) to modify the same section of the plaintext as well.

For example, an attacker might know the message contains "...owes $100..." at a specific section in the plaintext. They can XOR "...owes $100..." with "...owes $999..." , and then XOR it with the corresponding section of the ciphertext. When the receiver decrypts the modified ciphertext, they would get the tampered "...owes $999..." message.

<canvas id="canvasBitFlip"></canvas>

{% <tangent summary="Bit flip attacks" open={true}> %}
If an attacker knows a certain string `m` occurs at some position, they can modify it by replacing the ciphertext at that position by XOR-ing it with the original string and the modified string. So, if a part of original ciphertext is `c = m ^ k`, it can be replaced with `c' = c ^ m ^ m'`.

Decrypting `c'` results in `c' ^ k` = `((m ^ k) ^ m ^ m') ^ k` = `m ^ m ^ k ^ k ^ m'` = `m'` — the modified message, without ever knowing the original key `k`.
{% </tangent> %}

ChaCha20 is not designed to detect nor protect against tampered ciphertexts. Because bit-flipping attacks can render the entire cipher useless, ChaCha20 is usually paired with an authenticator to detect tampered ciphertexts. This type of encryption scheme that simultaneously encrypts a message as well as validates its authenticity is referred to as [authenticated encryption](https://en.wikipedia.org/wiki/Authenticated_encryption).

### Hashing

There are multiple ways to verify the authenticity of a message. A simple (but naive) way is to very simply compare the sum of all the bytes of the ciphertext — comparing their [checksums](https://en.wikipedia.org/wiki/Checksum). The checksum is usually calculated using modular arithmetic to prevent the numbers from getting too big. The checksum of a ciphertext with bytes `C1`, `C2`, ... `Cq` and some relatively big integer `p` is:

`(C1 + C2 + ... + Cq-1 + Cq) mod p`

<canvas id="canvasChecksum"></canvas>
Current Byte Block: <span class="hexTextBox" id="spanChecksumByte"></span><br>
Checksum: <span class="hexTextBox" id="spanChecksumHash"></span><br>

<button id="buttonChecksumIncrement">Goto Next Byte Block</button>

{% <tangent summary="Simple checksum" open={true}> %}
The checksum (shown right of the ciphertext) is calculated by simply adding together the values of all the bytes of the ciphertext. The terms in the checksum expression below the graphic represent the current accumulated checksum value, the previous accumulated checksum value, and the current byte respectively. The additions are performed using modular arithmetic so the checksum values remain bounded. The modulus `p` here is 2^32, so the (check)sums here only shows the last 32 bits, or 8 hex digits.
{% </tangent> %}

A sender can encrypt a message, calculate its checksum, and then send the encrypted text along with its checksum. The receiver calculates the checksum of the ciphertext, and then can compare it with the one presented by the sender to verify the authenticity of the ciphertext.

<canvas id="canvasAuthentication"></canvas>

{% <tangent summary="Checksums in practice" open={true}> %}
The sender calculates the checksum of the encrypted text and then sends it with the ciphertext. The receiver will then calculate the checksum of the ciphertext as well, and then compare it with the checksum sent by the sender. If there is any mismatch, the receiver can deduce that either the ciphertext or the checksum (or both) were modified.
{% </tangent> %}

However it is not secure at all. Attackers can modify a few bits of the ciphertext and still have a very high probability that the checksum of a **modified** ciphertext will produce the same checksum as the original ciphertext. For example, both the messages "...owes $209..." and "...owes $920..." will have the same checksum — since their bytes sum up to the same value.

Even in cases when the checksums differ, attackers can easily recalculate the checksum of the modified ciphertext, and send the altered checksum with the altered ciphertext.

<canvas id="canvasMalhash"></canvas>

{% <tangent summary="Forging checksums" open={true}> %}
Instead of modifying only the ciphertext, an attacker can intercept and modify the checksum as well. The attacker can calculate the checksum of the block the needs to be modified, then subtract it from the original checksum, and then calculate the checksum of the modified block and add it to this difference, to get the new checksum. When the receiver receiver calculates the checksum of the modified ciphertext, it would match the newly forged checksum.
{% </tangent> %}

For the authenticator to be secure, the checksum must not output same (colliding) values if its input message is different. In other words, a checksum must have adequate collision resistance. Checksums also need to be secure against forgery attempts.

Both of these problems come up because checksums are calculated by naively adding all the bytes of the plaintext message — this makes it trivial to recalculate the checksum since changes to the ciphertext result in predictable changes to the checksum. Collisions are also very likely because byte positions do not matter, and there is a high probability that small changes cancel each other out, leaving the checksum completely unchanged. Ideally, checksums should have very different values even for small input changes. Even better, they should output random-ish values to prevent attackers from finding the relationship between the checksum and the ciphertext and then using that information to create forged checksums.

A simple way to make the checksums collision resistant and sensitive to small changes is by performing a multiplication after every addition. This causes small changes to be multiplied, literally — and makes it difficult to predict how a checksum changes when its input changes (when the multiplier is not known, at least). Performing the multiplications and additions over a [prime field](https://en.wikipedia.org/wiki/Finite_field) further reduces the probability of collisions.

<canvas id="canvasPrimeField"></canvas>
<input id="sliderPrimeFieldModulus" type="range"> Modulus: <span id="spanPrimeFieldModulus"></span><br>
<input id="sliderPrimeFieldMultiplier" type="range"> Multiplier: <span id="spanPrimeFieldMultiplier"></span>

{% <tangent summary="Multiplication over prime fields for collision resistance" open={true}> %}
The modulo operation limits the results to a finite set of elements/numbers. These elements form a [finite field](https://en.wikipedia.org/wiki/Finite_field). A finite field is a prime field if the number of elements is in it prime — ie. when the modulus is prime.

The above example shows how elements are mapped when multiplied over finite fields — that is, for some input `n` its output is `(n * x) % N` , where `%` is the modulo operation `x` is the multiplier and `N` is the modulus. When the modulus is <a id="linkPrimeFieldComposite" class="linkSwitch">composite</a>, some multipliers map different inputs to the same output, causing collisions. However when the modulus is <a id="linkPrimeFieldPrime" class="linkSwitch">prime</a>, there are never any collisions regardless of the multiplier. In the case of repeated operations, prime fields ensure the outputs do not get stuck to [only a fixed subset of values](https://en.wikipedia.org/wiki/Periodic_point). Moreover in prime fields, every multiplier has a unique input-output mapping for all the non-zero elements, which means multipliers can be chosen randomly without affecting its collision resistance.

So multiplication amplifies small differences, making the correlation between the input and output unpredictable. While performing the operations over a prime field increases the likelihood that every output checksum is equally likely.
{% </tangent> %}

Since calculating the checksum now involves repeated multiplication and addition, it is basically equivalent to evaluating a polynomial, where its coefficients are the bytes of the message. That is, the checksum for a message having bytes `C1`, `C2`, ... `Cq` is:

`(C1·x^q + C2·x^(q-1) + ... + Cq-1·x^2 + Cq·x^1) mod p`

<canvas id="canvasKeyedhash"></canvas>
Current Byte Block: <span class="hexTextBox" id="spanKeyedhashByte"></span><br>
Checksum: <span class="hexTextBox" id="spanKeyedhash"></span><br>

<input id="inputKeyedhashKey">
<button id="buttonKeyedhashIncrement">Goto Next Byte Block</button>

{% <tangent summary="Polynomial checksum" open={true}> %}
The above graphic is a slightly modified version of the previous simple checksum graphic; this one has multiplication as well. The value of the checksum (shown right of the ciphertext) now depends on the multiplier (shown above and left of the checksum graphic, and the last term in the checksum expression) as well. The other terms in the checksum expression represent the values as the previous simple checksum example — the current accumulated checksum, the previous accumulated checksum, and the current byte.

As mentioned, the checksum is also multiplied each time after every addition. The current byte is added to the existing checksum (like earlier), but it is then also multiplied by the chosen multiplier. The calculation structure is the same as that of a polynomial, and can be evaluated as such — where the multiplier is the indeterminate of the polynomial and the message bytes are its coefficients. Also the example here uses a non-prime modulus to keep things simpler; actual implementations use a prime modulus.
{% </tangent> %}

This is a type of [polynomial rolling hash](https://en.wikipedia.org/wiki/Rolling_hash#Polynomial_rolling_hash), and the checksum here is called a hash. These hashes have much lower chances of collisions than the simple checksum method, for an integer multiplier `x` and a big prime `p`.

{% <tangent summary="Hashes" open={false}> %}
A [hash function](https://en.wikipedia.org/wiki/Hash_function) is any function that maps an input to a fixed sized output, called the hash. Both the simple addition checksum and the polynomial hash use modular addition and thus always map to fixed range outputs. So technically both are hash functions.
{% </tangent> %}

While the rolling polynomial hashes make collisions a lot less likely, it does not solve the forgery issue. If an attacker know the multiplier `x` they can easily recalculate the hash of a modified ciphertext and send that instead. In fact, attackers can find the multiplier rather easily — the multiplier is simply the root in the polynomial hash expression, which can be calculated using [existing algorithms](https://en.wikipedia.org/wiki/Cantor%E2%80%93Zassenhaus_algorithm).

<canvas id="canvasPolyhash"></canvas>

{% <tangent summary="Forging polynomial hashes" open={true}> %}
In the above example, two parties secretly exchange the multiplier. However, attackers can still forge hashes because extracting the multiplier is somewhat trivial. Since the attackers have access to the hash and the original ciphertext, they can use this information to construct a polynomial (its coefficients are simply the bytes of the ciphertext), and then solve for the root — the multiplier. With the knowledge of multiplier, the attackers can now recalculate the hash for any modified ciphertext, and just send the new forged hash instead.
{% </tangent> %}

The above attack relies on being able to find the root of the polynomial. One way to block these type of attacks is by masking the constant term (the hash) to prevent the attackers from finding the root. That is, for a polynomial [hash] expression:

`(C1·x^q + C2·x^(q-1) + ... + Cq-1·x^2 + Cq·x^1) ≡ y (mod p)`

The constant `y` (the output hash) is needed to quickly solve for the root. So, if the hash values are not made public, attackers will not be able to find the the root efficiently. Without the multiplier (the root), attackers cannot forge hashes for modified ciphertexts, while the probability of a collision remains close to zero.

A way to mask the hash value is to simply encrypt them before sending it. This can be done using a one-time pad — padding the real value with a random value. In effect, the value that is sent to the receiver is then:

`(H(C, x) + k) mod N`\
`H(C, x) = (C1·x^q + C2·x^(q-1) + ... + Cq-1·x^2 + Cq·x^1) mod p`

Where the addition of `k` over mod `N` acts as the one-time pad, used for padding and masking the polynomial hash `H(C, r)`. So the complete hashing scheme now takes in *two* secret values: a secret multiplier `x` and a secret one-time pad `k`.

<canvas id="canvasMachash"></canvas>
Current Byte Block: <span class="hexTextBox" id="spanMachashByte"></span><br>
Keyed Hash: <span class="hexTextBox" id="spanMachashHashKeyed"></span><br>
Padded Hash: <span class="hexTextBox" id="spanMachashHashPadded"></span><br>

<input id="inputMachashKey"><br>
<input id="inputMachashKeyPad"><button id="buttonMachashIncrement">Goto Next Byte Block</button>

{% <tangent summary="Masked polynomial hash" open={true}> %}
The above input text boxes are for the multiplier and one-time pad respectively. The hash calculation in here is very similar to the polynomial rolling hash — the only difference is that the output hash is now padded with a secret one-time pad as well, in order to mask the 'real' polynomial hash.
{% </tangent> %}

Since the hash is now masked, the actual value of the constant term in the polynomial is hidden from attackers, preventing them from finding its root to create forgeries.

<canvas id="canvasFailhash"></canvas>

{% <tangent summary="Failed forgery" open={true}> %}
If the communicating parties secretly exchange both the multiplier and the one-time pad, an attacker will not be able to extract the multiplier since the constant term (the hash) is now masked by the one-time pad. The attacker only has access to the padded hash. Without the knowledge of the multiplier, the attacker cannot recalculate/forge hashes, and the probability of collision remains close to zero.

The receiver, who has both the multiplier and the one-time pad, can easily calculate the hash of the ciphertext — and then verify the authenticity of the ciphertext by comparing the calculated hash with the received hash. If both hashes match, the receiver can be reasonably confident that the ciphertext was not modified.
{% </tangent> %}

There aren't many ways to break this hashing scheme. In fact, it is provably secure for a big enough prime `p` and modulus `N`, and for a random pad `k` sampled from a finite field of size `N`. In short, the above hashing technique prevents attackers from tampering with ciphertexts — or more accurately, it ensures that any tampering with the ciphertext is easily detected.

But the above solution does not actually 'solve' the problem. It simply shifts the problem from the secure exchange of the hash to the secure exchange of the multiplier and the one-time pad. In other words, this method relies on the secret exchange of the multiplier and the one-time pad — data that is at least as long as the hash itself (since the one-time pad needs to be at least as long as the hash; the multiplier is ideally of the same size as well). Which then begs the question: Why not send the hash secretly, instead of secretly sending the one-time pad and multiplier?

This is a very valid question in isolation, but as discussed, these authenticators are often paired with stream ciphers — which usually have an already existing mechanism for generating pseudorandom numbers from a small seed. So, the seed used for encrypting plaintexts can also be used to derive a random multiplier and one-time pad; there is no separate need for securely exchanging the multiplier and pad.

<canvas id="canvasSecretsExchange"></canvas>

{% <tangent summary="Reusing secrets" open={true}> %}
There is no separate need to exchange the hash (or the multiplier and pad) secretly; the seed used for encrypting data can also be used for authentication. The seed usually generates a stream of pseudorandom numbers — some of which can be used for the random multiplier `x` and the one-time pad `k` for calculating and padding the hash. The padded hash `H` can then be sent publicly.

Assuming the seed is exchanged securely, both the sender and receiver will generate the same multiplier and one-time pad, while they remain unknown to everyone else. So attackers cannot easily create forgeries since they only have knowledge of the publicly sent **padded** hashes, while the communicating parties can easily authenticate ciphertexts as they all have the same multiplier and one-time pad.
{% </tangent> %}

So, the ciphertexts and the (padded) hashes can be sent publicly without leaking the original plaintexts, and making forgeries infeasible — as long as the initial seed values are exchanged securely. But how *exactly* do these hashes integrate with ChaCha20?

## ChaCha20-Poly1305

A widely used polynomial rolling hash function is [Poly1305](https://en.wikipedia.org/wiki/Poly1305). It uses the same construction as the hash functions outlined above, and is frequently used alongside ChaCha20 as a ciphertext authenticator. As its name suggests, the hash is evaluated over a prime field with modulus 2^130 - 5. The hash, if used as an authenticator, is then also masked using a one-time pad; and then (usually) reduced to 128-bits. That is:

`H(C, x) = (C1·x^q + C2·x^(q-1) + ... + Cq·x^1) mod 2^130-5`\
`T = (H(C, x) + k) mod 2^128`

Where `H(C, x)` is a polynomial rolling hash, in which the bytes of the ciphertext `C` are as its coefficients, and `x` is the multiplier — evaluated over the prime field 2^130-5. Meanwhile `k` is a one-time pad (a random number). The tag `T` is the modular addition of the two numbers over the integer 2^128.

<canvas id="canvasPoly1305"></canvas>
Current Block: <span class="hexTextBox" id="spanPoly1305Byte"></span><br>
Keyed Hash: <span class="hexTextBox" id="spanPoly1305HashKeyed"></span><br>
Padded Hash (Tag): <span class="hexTextBox" id="spanPoly1305HashPadded"></span><br>

<button id="buttonPoly1305NewKeys">Generate New Keys</button><button id="buttonPoly1305Increment">Goto Next Byte Block</button>

{% <tangent summary="Poly1305 " open={true}> %}
While the previous constructions used a 32-bit multiplier and one-time pad, Poly1305 defines using a 128-bit multiplier and a 128-bit pad. The operations are same as any other polynomial rolling hash — the 128-bit chunks of the ciphertext are (after slight modification) multiplied with the 128-bit multiplier, and then added to the accumulated sum, and evaluated over the prime field 2^130-5. Poly1305 also specifies more details — how the 128-bit ciphertext segments is modified to form the coefficients, and how the 128-bit multiplier is constructed. This is described in more detail later.

Conventionally, the Poly1305 multiplier is denoted by `r` while the one-time pad is denoted as `s`.
{% </tangent> %}

{% <tangent summary="Tags and MACs" open={true}> %}
Because the above hash outputs can be used for verifying the authenticity of messages, they are aptly called [message authentication codes](https://en.wikipedia.org/wiki/Message_authentication_code) or MACs. These are also sometimes referred to as tags.

Not all hashes can be considered MACs; the simple checksum hash and the polynomial rolling hash without the keys and one-time pad are technically not MACs as they are not considered to be secure against forgeries. Generally, MACs use some shared secret information to verify the authenticity of messages.
{% </tangent> %}

If you observe the illustration above, you will notice a few things. First, the coefficients of the polynomial `C1`, `C2`, ... `Cq` are not 16 bytes (128 bits), but 17 bytes. Poly1305 defines interpreting the 16-byte ciphertext chunks as 17-byte coefficients by appending a byte with value `0x01` to each of the 16-byte chunks of the ciphertext. If the final chunk is smaller than 16 bytes, then `0x01` is appended to the last chunk, and the remaining bits are zero padded to 17 bytes.

{% <tangent summary="One-padding rationale" open={true}> %}
The added `0x01` makes the block length unambiguous. For example, the byte strings `01` and `01 00` are different, but would return the same hash — since both have the same coefficient values `0x010000...` and `0x010000...`. When they are padded with a one, the coefficients become `0x01010000...` and `0x01000100...`. Since the coefficients themselves are different, the hashes would be different as well — eliminating any ambiguity and reducing collisions.
{% </tangent> %}

Second, the 128-bit multiplier has some structure. Poly1305 specifies the multiplier as a 16-byte integer where the top four bits of bytes of `r[3]`, `r[7]`, `r[11]`, and `r[15]`, as well as the bottom two bits of `r[4]`, `r[8]`, `r[12]` are all zeroes. This is not for security. In fact, this sacrifices *some* security, but this restriction was chosen (alongside the prime 2^130 - 5), because it [makes calculations faster](https://loup-vaillant.fr/tutorials/poly1305-design#poly1305s-prime-2130---5).

The rest of Poly1305 is similar to the padded hash function described above. The output from the polynomial evaluation (the multiplications-additions of the ciphertext with `r`) is reduced using modulo 2^128. A 128-bit (16-byte) one-time pad `s` masks the polynomial output, and results in a 128 bit tag or MAC.

Poly1305 is typically used alongside ChaCha20, and there is a specification defining how the two interact. The ChaCha20-Poly1305 specification defines reserving the first block of the ChaCha keystream (block with counter value zero) to derive `r` and `s`. The rest of the keystream (generated using non-zero counter values) can be used for encrypting the plaintext message.

<canvas id="canvasChaChaPolyIntegrated"></canvas>

{% <tangent summary="ChaCha20-Poly1305 specification" open={true}> %}
The 128-bit values for `r` and `s` for Poly1305 are derived from the first block of a ChaCha keystream. Only the initial 256 bits of the block are used; the remaining bits are discarded. The first 128 bits form `r` while the next 128-bits are used for `s`. Additionally, some of the bits of `r` are clamped as mentioned earlier — the top four and bottom two bits of specific bytes are set to zero.
{% </tangent> %}

So a single 256-bit ChaCha key is enough for both encryption and authentication — it derives both the pseudorandom keystream as well as the secrets for Poly1305. Since the ChaCha keystream is pseudorandom and non-recurring across different messages, the pad `s` of Poly1305 inherits these properties, and thus remains secure.

It is worth noting that there are slight differences between ChaCha20 and the ChaCha20 used in ChaCha20-Poly1305. Unlike ChaCha20, the initial state in ChaCha20-Poly1305 uses a 32-bit counter and 96-bit nonce instead of a 64-bit counter and 64-bit nonce.

<canvas id="canvasChaChaPolySequence"></canvas>

This allows more messages to be encrypted using the same key, albeit shorter ones. But it is not a problem, since a 32-bit counter still allows for encryption of messages up to 256 GiB in size.

### Associated Data

Sometimes ciphertexts can be paired with some associated plaintext data, which do not need or should not be encrypted, but still need to be verified — data such as message timestamps, addresses, protocol versions, etc. This cleartext data is often sent alongside the ciphertext, and both are authenticated using a single MAC. This additional data is called associated data, and the authenticated encryption scheme that authenticates the associated data alongside the ciphertext, is referred to as [authenticated encryption with associated data](https://en.wikipedia.org/wiki/Authenticated_encryption#Authenticated_encryption_with_associated_data), or AEAD.

<canvas id="canvasAssociatedData"></canvas>

ChaCha20-Poly1305 can authenticate ciphertext `C` along with some associated data `AD` by concatenating together, and treating them as a single unit to generate the MAC. The ChaCha20-Poly1305 specification defines `AD` and `C` to be separately padded to make their total sizes an even multiple of sixteen bytes. The padded `AD` and `C` as well as two other 64-bit fields, `len(AD)` and `len(C)`, are concatenated. Poly1305 then produces the MAC of this concatenated string.

{% <tangent summary="Message size limit" open={false}> %}
While Poly1305 can be used for authenticating messages of arbitrary length, the 64-bit fields for `len(AD)` and `len(C)` restricts the possible size of the associated data `AD` and the ciphertext message `C` to 2^64 bits, or 16 EiB. But ciphertext `C` is further bottlenecked by the 32-bit counter of the ChaCha20 initial state — limiting message sizes to only 256 GiB. If required however, the ChaCha20-Poly1305 specification permits changing the counter to be set to its original size of 64 bits to allow encrypting and authenticating longer messages.
{% </tangent> %}

This is basically the entirety of [ChaCha20-Poly1305](https://en.wikipedia.org/wiki/ChaCha20-Poly1305), a stream cipher used for encrypting messages, and authenticating the encrypted messages along with optional associated data. It used in [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security#TLS_1.3), [SSH](https://en.wikipedia.org/wiki/Secure_Shell#Algorithms), [WireGuard](https://en.wikipedia.org/wiki/WireGuard#Protocol), and [other protocols](https://en.wikipedia.org/wiki/ChaCha20-Poly1305#Use). It is likely that the data on this webpage was encrypted with ChaCha20 and then verified using Poly1305.

The next section is a brief discussion on the security of ChaCha20-Poly1305. Feel free to skip to [the end](#Other_Ciphers).

## Security Guarantees

The probability that attackers cannot decrypt a given ciphertext relies on the security of ChaCha20. Meanwhile the possibilities of forgeries depends on the security of Poly1305, as well as ChaCha20.

### Poly1305 Security

Since the output of Poly1305 is combined with a pseudorandom pad, it is as secure as the algorithm used to generate pseudorandom number. However, it does not imply that it is perfectly secure if the pad is purely random — since collisions are still possible as the of the size of the MAC is [finite](https://en.wikipedia.org/wiki/Pigeonhole_principle).

Consider a prime field <i>GF(p)</i>, taken as <i>x mod p</i> where <i>x ∈ ℤ</i> and <i>p</i> is prime. Then, for some polynomial of degree one, e.g. <i>a·x = h</i> where <i>a,x,h ∈ GF(p)</i> — there exists, at most one solution or root for <i>x</i>. The probability that <i>x</i> will produce <i>h</i> for a given <i>a</i> is <i>1/n</i>, where <i>n</i> is the number of all possible values for <i>x</i>. That is, <i>n = p</i>.

<input id="sliderPolynomial1Coefficient1" type="range"> Coefficient (a): <span id="spanPolynomial1Coefficient1"></span><br>
<input id="sliderPolynomial1Range" type="range"> Result (h): <span id="spanPolynomial1Range"></span><br>

<span class="hexTextBox" id="spanPolynomial1Equation"></span><br>
<span class="hexTextBox" id="spanPolynomial1Root"></span><br>

For a polynomial of degree two, e.g. <i>a·x^2 + b·x = h</i>, there can be at most two solutions for <i>x</i>. The probability that <i>x</i> produces <i>h</i> for a given pair <i>a,b</i> is at most <i>2/n</i>. Where <i>n</i> is the total number of possible values for <i>x</i>. Here again, <i>n = p</i>.

<input id="sliderPolynomial2Coefficient1" type="range"> Coefficient (a): <span id="spanPolynomial2Coefficient1"></span><br>
<input id="sliderPolynomial2Coefficient2" type="range"> Coefficient (b): <span id="spanPolynomial2Coefficient2"></span><br>
<input id="sliderPolynomial2Range" type="range"> Result (h): <span id="spanPolynomial2Range"></span><br>

<span class="hexTextBox" id="spanPolynomial2Equation"></span><br>
<span class="hexTextBox" id="spanPolynomial2Root"></span><br>

Similarly, for a <i>q</i> degree polynomial, e.g. <i>C1·x^q + C2·x^(q-1) + ... + Cq·x^1 = h</i>, [there are at most](https://en.wikipedia.org/wiki/Finite_field#Roots_of_unity) <i>q</i> number of roots for <i>x</i>, such that <i>x ∈ GF(p)</i>. The probability that <i>x</i> produces <i>h</i> for some given coefficients is, at most <i>q/n</i> — where <i>n</i> is again the number of possible values for <i>x</i>.

`If deg(f(x)) = Q`\
`=> x can have at most Q roots`

Now assume a message <i>m</i> has a polynomial hash <i>h</i>. The probability of another distinct message <i>m'</i> having the same hash digest <i>h</i> will then depend on the on the degree of its polynomial. The polynomial in Poly1305 is of the form C1·r^q + C2·r^(q-1) + … + Cq·r^1. The coefficients of the polynomial are constructed from 16-byte chunks of a message, and thus, the degree of the polynomial is <i>⌈L/16⌉</i> — where <i>L</i> is the length of the message. So the probability of a message <i>m'</i> having the (same) hash <i>h</i> is at most <i>⌈L/16⌉/n</i>.

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

However, the polynomial is evaluated in <i>GF(p)</i> — the result is <i>h ∈ [0, 2^130 - 5)</i>, while the hash in Poly1305 is designed to be of 128 bits. So <i>h</i> is reduced modulo 2^128. Discarding two bits from <i>h</i> causes some outputs to be [congruent](https://en.wikipedia.org/wiki/Modular_arithmetic#Congruence) to others. More specifically, there are eight congruent values (mod 2^128) for <i>H(m)</i> - <i>H(m')</i> ≡ 0.

This increases the differential probability to <i>8·⌈L/16⌉/2^106</i>, at most — because there are now eight times as many possibilities for two messages to have the same hash.

Now if <i>D</i> forgery attempts are made, then the probability of a single successful forgery is at most <i>D·8·⌈L/16⌉/2^106</i>. The probability of forgeries is [independent](https://cr.yp.to/mac/poly1305-20050329.pdf) of the number of messages authenticated — if the pad is [uniformly random](https://en.wikipedia.org/wiki/Discrete_uniform_distribution).

{% <tangent summary="Influence of the pad on probability of forgeries" open={false}> %}
Generally, the pad is generated by a function <i>f</i> that maps a smaller nonce to a larger output space. If <i>f</i> has a uniform random distribution, then the probability that the pad is some specific number is <i>1/G</i>, where <i>G</i> is the total number of elements in the output space. If the probability the pad is a specific number is <i>1/G</i>, the probability that the pads are <i>C</i> specific numbers — or the probability that <i>f</i> interpolates <i>C</i> specific points is, at most <i>1/G · 1/G · ... · 1/G = 1/(G^C)</i>.

A uniform random [injective function](https://en.wikipedia.org/wiki/Injective_function) that has non-repeating nonces as its input can also be used for generating the pad. Then, the pad will not also repeat. The probability that it interpolates <i>C</i> number of distinct points is then <i>1/G · 1/(G-1) · 1/(G-2) · ... · 1/(G-(C-1))</i>. This can be simplified to <i>((1 - (C - 1)/G)^-(C/2))/(G)^C</i>. This can be used for evaluating the probability when [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) is used as <i>f</i> — e.g. in Poly1305-AES.

If <i>f</i> has a maximum C-interpolation probability at most <i>δ/(G^C)</i> and a maximum (C + 1)-interpolation probability at most <i>δε/(G^C)</i>, then the [probability of a successful forgery](https://cr.yp.to/antiforgery/securitywcs-20050227.pdf#page=9) using <i>C</i> distinct messages is <i>Dδε</i>, where <i>ε</i> is the probability of two messages having the same hash.

The pad in Poly1305 of ChaCha20-Poly1305 is generated using a ChaCha20 block, and can be assumed to have an interpolation probability of <i>1/(G^C)</i> as there is no restriction on pad repetition. So the probability of a successful forgery using <i>C</i> messages is at most <i>Dε</i>, or <i>D·8·⌈L/16⌉/2^106</i> — it is independent of the number of message authentications.

It is important to note that ChaCha20 blocks may still be distinguished from true random numbers with some different probability <i>δ</i>, which affects the overall probability of successful forgeries.
{% </tangent> %}

However, the Poly1305 pad in ChaCha20-Poly1305 is generated using a pseudorandom ChaCha20 block — it is not guaranteed to be truly uniformly random. If the probability of distinguishing a ChaCha20 block from a truly random keystream is <i>δ</i>, then the probability of a successful forgery is, at most <i>δ + D·8·⌈L/16⌉/2^106</i>.

### ChaCha20 Security

The randomness of the ChaCha20 output stream determines its security, as well as the security of Poly1305. This can be tested statistically.

Changing the initial state of a ChaCha20 block ([even by a single bit flip](https://en.wikipedia.org/wiki/Avalanche_effect#Strict_avalanche_criterion)) should ideally create a new uniform random block of bits. That is, the individual probability of all the bits of the output block flipping should be half — on average, [half the bits should flip](https://en.wikipedia.org/wiki/Confusion_and_diffusion#Diffusion) for a change in the initial state. Or more specifically, the [number of bit flips](https://en.wikipedia.org/wiki/Hamming_distance) due to changes the initial state should form a [binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution) centered around half the bit length of the output block.

<canvas id="canvasChaChaDiffusion"></canvas>
<button id="buttonChaChaDiffusion">Random Block</button>
<button id="buttonChaChaDiffusion1000">Thousand Random Blocks</button>
<button id="buttonChaChaDiffusionReset">Reset</button>

{% <tangent summary="Testing randomness statistically" open={true}> %}
Changing the initial state of a ChaCha20 block — even by a single bit flip — should ideally create a new output state where each bit has equal chances of being either one or zero. This means roughly half of all the bits in a block should should flip. Since a ChaCha block consists of 512 bits, on average 256 of the bits should flip.

The above example charts the number of bit flips in the output ChaCha20 block, for a (single) bit flip in the initial state block. Note how the number of bit flips is close to 256, suggesting strong randomness.
{% </tangent> %}

Empirical evidence suggests that it is the case. ChaCha20 generates blocks that appear uniformly random. Evaluating the randomness analytically is much more difficult however, because the interaction between the bits of the block quickly grows complex with each round. While there are ways to [measure the avalanche effect](https://webdoc.sub.gwdg.de/ebook/dissts/Bochum/Daum2005.pdf#page=57) — small changes flipping roughly half the bits, there is no proof that ChaCha20 blocks blocks can be distinguished (or not) from truly uniform random bitstreams.

There are however other ways to test its security — for example, using [linear](https://en.wikipedia.org/wiki/Linear_cryptanalysis), [differential](https://en.wikipedia.org/wiki/Differential_cryptanalysis) or [rotational](https://en.wikipedia.org/wiki/Rotational_cryptanalysis) [cryptanlysis](https://en.wikipedia.org/wiki/Cryptanalysis). ChaCha with six rounds has been [broken](https://cr.yp.to/streamciphers/attacks.html#chacha6), but there have been no successful attacks on twenty rounds of ChaCha.

ChaCha20-Poly1305, therefore is generally [considered secure](https://www.cryptrec.go.jp/exreport/cryptrec-ex-2601-2016.pdf).

## Other Ciphers

Although [other stream ciphers](https://en.wikipedia.org/wiki/Stream_cipher#Comparison) exist, ChaCha20 is the most widely used cipher currently. Other types of symmetric encryption, such as [block ciphers](https://en.wikipedia.org/wiki/Block_cipher) are also widely used for encryption and decryption. These generally use [substitution](https://en.wikipedia.org/wiki/S-box) and [permutation](https://en.wikipedia.org/wiki/Permutation_box) boxes to diffuse the data blocks in place, instead of generating a keystream.

Another detail that was glossed over was the secure exchange of the 256-bit keys. This entire cryptosystem relies on the secure distribution of the shared keys. It is achieved using [asymmetric key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography). This field of cryptography is quite different from the ciphers mentioned above — usually relying on the properties of [number theory](https://en.wikipedia.org/wiki/Number_theory) and [group theory](https://en.wikipedia.org/wiki/Group_theory) instead — but is equally interesting.

---

## References

* Daniel J. Bernstein: [ChaCha, a variant of Salsa20](https://cr.yp.to/chacha/chacha-20080128.pdf)
* Daniel J. Bernstein: [The Poly1305-AES message-authentication code](https://cr.yp.to/mac/poly1305-20050329.pdf)
* Moxie Marlinspike : [The Cryptographic Doom Principle](https://moxie.org/2011/12/13/the-cryptographic-doom-principle.html)
* IRTF RFC 8439: [ChaCha20 and Poly1305 for IETF Protocols](https://datatracker.ietf.org/doc/html/rfc8439)

<script>
{{ <loadData path="/scripts/stream-ciphers.js" /> }}
</script>
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
