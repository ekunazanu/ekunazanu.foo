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
<input id="sliderCaesar" type="range">Key: <span id="spanCaesar"></span>

If the letters are encoded as a number determined by its position in the alphabet, then the encrypted letter for a plaintext letter `m` is `E(m) = (m + k) mod 26`, where `k` is the shift value. The encrypted message is often referred to as the ciphertext. Decryption has to reverse the encryption operation. So the decrypted letter for the ciphertext letter `c` is then `D(c) = (c - k) mod 26`.

<canvas id="canvasCaesarDecrypt"></canvas>

{% tangent(summary="Modulo Operation", open=true) %}
The `mod` or [modulo operator](https://en.wikipedia.org/wiki/Modulo) returns the remainder after division by a number. The divisor in this case is 26, or the numbers of letters in the Latin alphabet.
{% end %}

[ROT13](https://en.wikipedia.org/wiki/ROT13) is a special case of a Caesar cipher, having a shift value of 13. The Latin alphabet has 26 letters; shifting the alphabet to the left by 13 positions is the same as shifting it to the right by 13 positions. So decrypting is effectively the same as encrypting data. That is, for a plaintext message `m` and ciphertext `c`:

`E(m) = (m + 13) mod 26 = (m - 13) mod 26 = c`\
`D(c) = (c + 13) mod 26 = (c - 13) mod 26 = m`

The only difference between encryption and decryption is the domain of the operators. While one operates on plaintexts, the other operates on ciphertexts — but that difference is purely semantical.

<canvas id="canvasRot13"></canvas>
<input id="inputRot13"><br>
Key: <span id="spanRot13"></span>

The shift parameter in the Caesar cipher determines how a message gets encrypted and decrypted — it acts as a 'key' for encrypting and decrypting the data. Only parties who have the knowledge about the keys can decrypt the messages encrypted with that key. While this is the main goal of symmetric encryption, the Caesar cipher is not a very good way to achieve this goal.

Single-alphabet substitution ciphers like the Caesar cipher are not at all secure, and they can be very easily broken — since brute forcing all possible keys takes a trivial amount of time. It can also be broken by trying to [match the frequency distribution](https://en.wikipedia.org/wiki/Frequency_analysis#Frequency_analysis_for_simple_substitution_ciphers) of the letters of the ciphertext and the frequency distribution of letters of a language.

{% tangent(summary="Brute force attacks", open=true) %}
A [brute force attack](https://en.wikipedia.org/wiki/Brute-force_attack) refers to systematically trying all possible combinations of a secret key or password, until the correct one is found.
{% end %}

## One-Time Pad

In the Caesar cipher all the letters of the plaintext are shifted by the same amount, determined by a single-valued key. However, using [separate shift values](https://en.wikipedia.org/wiki/Polyalphabetic_cipher) for each letter is arguably more secure. The [Vigenère cipher](https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher) is a cipher that employs multiple shift values for encrypting messages, determined by a multi-valued key. If the key is shorter than the plaintext message, the key is repeated until it matches the length of the message.

<canvas id="canvasVignere"></canvas>
<input id="inputVignere"><br>
<input id="inputVignereKey"><br>
Key: <span id="spanVignere"></span>

Again, decryption involves subtracting the key from the ciphertext:

<canvas id="canvasVignereDecrypt"></canvas>

Although more secure than the Caesar cipher, the Vigenère cipher is [not secure](https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher#Cryptanalysis) because of the repeating nature of the key. If length of a key is correctly guessed, the ciphertext can be treated as interweaved Caesar ciphers — all of which can be individually broken rather trivially if the key is short enough (when compared to the ciphertext).

Using a key which is at least as long as the plaintext, and is [truly random](https://en.wikipedia.org/wiki/Random_number_generation#True_vs._pseudo-random_numbers) will be [perfectly secure](https://en.wikipedia.org/wiki/Information-theoretic_security) — as long as the key is kept secret and is **never** reused.

<canvas id="canvasOneTimePad"></canvas>
<input id="inputOneTimePad"><br>
<button id="buttonOneTimePad">Generate Random Key</button><br>
Key: <span id="spanOneTimePad"></span>

{% tangent(summary="Random key security", open=true) %}
Draw freq dist before transformation. color each bar diff for each letter. draw freq dis after transformation (padding) color each bar with multiple colors signfying the prob/freq dist of original letters in the transformed letter.
{% end %}

This cipher scheme is called the [one-time pad](https://en.wikipedia.org/wiki/One-time_pad). The only information that can be leaked is the maximum length of a message.

However the moment the same key is used more than once, its security benefits vanish. Consider two different messages that are encrypted with the same key. Attackers can subtract the ciphertext of one message from the other to find the plaintext (differences). For example, if `m1` and `m2` are messages that are both encrypted with key `k` then:

`c1 = (m1 + k) mod 26`\
`c2 = (m2 + k) mod 26`

Subtracting ciphertext `c1` from `c2` eliminates `k` and reveals `m2 - m1 (mod 26)`, which can end up leaking some information about the messages `m1` and `m2`.

<canvas id="canvasOTPReuse"></canvas>

{% tangent(summary="Visualising ciphertext differences", open=true) %}
This is an example of how difference in ciphertexts can leak plaintext information. Two grayscale images are both 'encrypted' with the same key. An attacker can subtract one encrypted image from the other, exposing information about the original images.
{% end %}

## Vernam Cipher

The [Vernam cipher](https://en.wikipedia.org/wiki/Gilbert_Vernam#The_Vernam_cipher) is a type of one-time pad that uses modulo two arithmetic. That is:

`c = (m + k) mod 2`\
`m = (c - k) mod 2`

Where `c` is the ciphertext for the binary plaintext message `m` encrypted using binary key `k`. Since the result of `n mod 2` is either zero or one, `c` is also binary. Addition and subtraction in modulo two arithmetic is the [same](https://en.wikipedia.org/wiki/GF(2)#Properties), so like ROT13, the same operation can be used for encryption and decryption:

`c = (m + k) mod 2`\
`m = (c + k) mod 2`

<canvas id="canvasVernam"></canvas>
<input id="inputVernam"><br>
Key: <span id="spanVernam"></span>

Reducing the modulus does not make the cipher less secure, but it can simplify harware implementations. Modulo two addition can be performed very quickly and efficiently in hardware using [XOR gates](https://en.wikipedia.org/wiki/XOR_gate). So the ciphertext can be generated by combining a plaintext message with a key using the XOR operator:

`c = (m + k) mod 2 = m ^ k`\
`m = (c + k) mod 2 = c ^ k`

<canvas id="canvasVernamXOR"></canvas>
Key: <span id="spanVernamXOR"></span>

{% tangent(summary="The XOR operation", open=true) %}
The [XOR operator](https://en.wikipedia.org/wiki/Exclusive_or) `^` takes two binary inputs and returns one if and only if one of the inputs is one, otherwise it returns zero — same as modulo two addtion using binary numbers.
{% end %}

The binary key of the Vernam cipher is referred to as a keystream, as it is a stream of bits that is XOR-ed with the stream of plaintext bits to generate the ciphertext stream.

The Vernam cipher keystream must have the same properties as the one-time pad key to have the same security guarantees. It must be at least as long as the plaintext stream, and should be truly random. Again, the key should never be reused because it can leak information about the plaintext:

<canvas id="canvasVernamReuse"></canvas>

{% tangent(summary="XOR self inverse", open=true) %}
In XOR, a number is its own inverse. That is `x ^ x = 0`, so `y ^ x ^ x` = `y ^ 0` = `y`. The XOR operations are also [associative](https://en.wikipedia.org/wiki/Associative_property) and [commutative](https://en.wikipedia.org/wiki/Commutative_property). These properties can be exploited to leak plaintext data by XOR-ing two ciphertexts encrypted with the same key:

`c1 ^ c2`\
`= (m1 ^ k) ^ (m2 ^ k)`\
`= m1 ^ k ^ m2 ^ k`\
`= m1 ^ m2 ^ k ^ k`\
`= m1 ^ m2`
{% end %}

## ChaCha20 Cipher

Even though the Vernam cipher allows for easy encryption and decryption of data using computer hardware and is perfectly secure, it is impractical as it relies on secure and secret distribution of the keys. If a key (which is at least the size of the message) can be securely transmitted, it makes more sense to simply send the message itself instead.

A simpler approach for exchanging keys is for the communicating parties to have a sort of a random number generator that somehow generates the **same** random keystream for both parties. Such random number generators [do exist](https://en.wikipedia.org/wiki/Pseudorandom_number_generator). Most of them generate numbers that *appear* random from an initial value called the seed. For the same seed value, the same stream of random numbers is generated.

{% tangent(summary="Pseudorandomness", open=true) %}
The numbers generated this way are determinstic — since they are generated from a seed [pseudorandom](https://en.wikipedia.org/wiki/Pseudorandomness).
{% end %}

So (small) seed values can be securely exchanged, and the keystream generated by the random number generator can be used to encrypt and decrypt messages.

<canvas id="canvasKeyExchange"></canvas>

However, there are caveats to this. Since the keystream is completely determined by the seed, it is not truly random and thefore not perfectly secure. But even if it is not *perfectly* secure, it can still be *reasonably* secure.

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
<button id="buttonChaChaCounterRepeatIncrement">Increment Counter</button><br>

Encrypting data using reused keystreams (blocks) is dangerous. Thus the counter values must never repeat, and must always be incrementing. But then the counter value cannot be used for representing the relative position of blocks in the keystream.

A simple solution is to use a nonce. A nonce is simply a number used once — it does not repeat. For every new message, a unique nonce is generated. This ensures the entire initial state block is always unique even if the counter values are not. Because repetition in counters is possible, they can now be used to represent positional information.

<canvas id="canvasChaChaNonce"></canvas>
<button id="buttonChaChaNonceCounterDecrement">Decrement Counter</button><button id="buttonChaChaNonceCounterIncrement">Increment Counter</button><br>
<button id="buttonChaChaNonceDecrement">Decrement Nonce</button><button id="buttonChaChaNonceIncrement">Increment Nonce</button><br>
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

A sender can encrypt a message along with its checksum. The receiver can decrypt the message and compare the checksum of decrypted ciphertext with the one presented by the sender to verify its authenticity.

<!--
![checksums; compare checksums;](interactive)
 -->

However it is not secure at all. Attackers can modify a few bits of the ciphertext and still have a very high probability that the checksum of the decrypted **modified** ciphertext will produce the same checkum as the original plaintext message. For it to be secure, the checksum must not output the same (colliding) values if its input message is different. In other words, the checksum must have adequate collision resistance.

<!--
![compare checksums and hashes; bit flip; compare checkum and hash after flipping a single bit; contrast with below polynomial hash;](interactive)
 -->

Instead of the naively adding all the bytes of the plaintext message, they can instead be evaluated as coefficients of a polynomial over a [prime field](https://en.wikipedia.org/wiki/Finite_field). That is, the checksum for a message having bytes `C1`, `C2`, ... `Cq` is:

`(C1·x^q + C2·x^(q-1) + ... + Cq-1·x^2 + Cq·x^1) mod p`

This is called a [polynomial rolling hash](https://en.wikipedia.org/wiki/Rolling_hash#Polynomial_rolling_hash), and the 'checksum' is called its hash. These hashes have much lower chances of collisions than the simple checksum method — for a well chosen integer `x` and a big prime `p`.

> If `q` is not known, it will have a non-predictable effect on the hash. So attackers cannot accurately change the message without knowing if it would still produce the valid checksum.

<!--
![compare checksums and hashes; bit flip; compare checkum and hash; compare between the methods by flipping a single bit;](interactive)
 -->

{% tangent(summary="Hashing", open=false) %}
A [hash function](https://en.wikipedia.org/wiki/Hash_function) is any function that maps an input to a fixed sized output, called the hash. Both the simple checksum and the polynomial hash use modular addition and thus always map to fixed range outputs. So technically, both are hash functions.
{% end %}

{% tangent(summary="Prime fields", open=false) %}
Performing the modulo operation limits the results to a finite set of elements. These elements form a [finite field](https://en.wikipedia.org/wiki/Finite_field) if the set satisfies certain [axioms](https://en.wikipedia.org/wiki/Field_(mathematics)#Definition) — properties of addition, subtraction, multiplication, and division must satisfied, for two defined binary operations. A prime field is a finite field with a prime number of elements.
{% end %}

Again, the hash presented by the sender is compared with the hash of the decrypted ciphertext. If the hashes match, there should be a reasonable amount of confidence that the message is authentic and has not been altered — since the chances of collisions are much lower.

<!--
![hashed;](interactive)
 -->

Since these hash values are used to verify the authenticity of messages, they are aptly called [message authentication codes](https://en.wikipedia.org/wiki/Message_authentication_code). MACs generated using hash functions are called hash-based MACs or [HMACs](https://en.wikipedia.org/wiki/HMAC).

{% tangent(summary="MAC criteria", open=true) %}
The above hash digests are technically not MACs because they are not considered to be adequately secure against forgeries. Generally, MACs use some shared secret information to verify the authenticity of messages.
{% end %}

### Keyed Hashing

The polynomial rolling hash acts on plaintext data, but ciphertexts can also be hashed. However, hashing the ciphertext (in this manner) is pointless. An adversary that can alter the ciphertext can also recalculate the hash of the modified ciphertext and then alter the MAC (hash) as well.

<!--
![ciphertext and ciphertext hash; modifying ciphertext; recalculating ciphertext hash; modifying hash;](interactive)
 -->

When the plaintext is hashed however, an attacker cannot easily calculate how a change in the ciphertext changes the resulting MAC — because the attacker does not have the knowledge about the complete plaintext to recalculate its hash.

<!--
![ciphertext and plaintext hash; modifying ciphertext; cannot recalculate plaintext hash since plaintext itself is unknown;](interactive)
 -->

When the plaintext is hashed, an encrypted message must be decrypted before it can be verified — but it is not preferable because it is [not completely secure](https://moxie.org/2011/12/13/the-cryptographic-doom-principle.html). The alternative is generating the MAC from the ciphertext. However as mentioned earlier, MACs generated by hashing ciphertexts is even less secure.

The reason hashing ciphertexts to authenticate messages is not secure at all is because MACs are generated solely from a public ciphertext. However, if the MACs can include secret information only known to the communicating parties as its input, it can be much more secure. The secret information can again be a shared secret key.

<!--
![hash with ciphertext input vs hash with ciphertext AND secret key as input — diagram;](static)
 -->

One way to embed the key in a MAC is to include the the key while the hashing it. Using the example of the polynomial rolling hash, the hash can be generated by evaluating the polynomial at the value of the key.

`MAC = (C1·k^q + C2·k^(q-1) + ... + Cq-1·k^2 + Cq·k^1) mod p`

Here `k` is the secret key, `p` is a sufficiently big prime and `C1`, `C2`, ... `Cq` are bytes of the **ciphertext**. Since the hash accepts a secret key alongside the message, this type of hashing is referred to as keyed hashing.

<!--
![show with key this time](interactive)
 -->

But an even simpler way to include a secret key in a MAC is to simply add it to the hash of a ciphertext. Variable MACs or [VMACs](https://en.wikipedia.org/wiki/VMAC) function very similar to this — a hash function generates the hash for a message, which is then combined with a one-time key using modular addition.

`MAC = (H(c) + k) mod p`

For the VMAC to be secure, the hash function needs to be collision resistant, while the shared secret key `k` should be random and must not be reused. Since the key is unique for every invocation, the MAC too is unique and varies every time, even for the same input — hence the name.

<!--
![VMAC example](interactive)
 -->

{% tangent(summary="VMAC as a masked hash", open=true) %}
The VMAC can be thought of as a hash being 'encrypted' or masked with the one-time pad `k`. For the VMAC to have (similar) security guarantees as the one-time pad, `k` must be (pseudo)random, and must never be reused.
{% end %}

MACs incorporating secret keys are much harder to forge, allowing them to be used for authenticating ciphertexts. An attacker can modify the ciphertext, but cannot recalculate its MAC without the knowledge of the secret key.

<!--
![attacker modifying hash — keyed hashing;](static)
 -->

## Poly1305

[Poly1305](https://en.wikipedia.org/wiki/Poly1305) is a hash function, that is often used for generating one-time MACs. When it is used for authentication, it behaves as a kind of VMAC using a keyed polynomial rolling hash as its hash function and a random number as its pad. That is:

`MAC = (H(C, r) + s) mod 2^128`\
`H(C, r) = (C1·r^q + C2·r^(q-1) + ... + Cq·r^1) mod p`

Where `H(C, r)` is a polynomial rolling hash using the bytes of the ciphertext `C` as its coefficients, evaluated at the point `r` over a prime field `p`. Meanwhile `s` is any random number. The MAC is the modular addition of the two numbers over the integer 2^128.

<!--
![mac calculation — show neatly; allow changing values;](interactive)
 -->

In Poly1305-MAC, certain operations and parameters have been strictly defined:

The coefficients of the polynomial `C1`, `C2`, ... `Cq` are not single bytes of the input, but 16-byte chunks of the input interpreted as 17-byte chunks by appending a byte having the value one to each of the 16-byte chunks of the message. If the final chunk is smaller than 16-bytes, one is appended to the chunk and then zero padded to 17-bytes.

<!--
![message into chunks; 16->17 chunks; zero pad final chunk;](interactive)
 -->

The inderminate of the polynomial, `r` acts a shared secret key. It is a 16-byte little endian integer where the top four bits of bytes `r[3]`, `r[7]`, `r[11]`, and `r[15]`, as well as the bottom two bits of `r[4]`, `r[8]`, `r[12]` are all zeroes — to simplify and accelerate calculations.

<!--
![16 bytes — do NOT represent as 4x4 matrix (to avoid confusion with chacha20); show cleared bits;](static)
 -->

The MAC is designed to be 128 bits long, and so the order of the prime field `p` should preferably be close to, and greater than 2^128. It was chosen to be 2^130 - 5 because its sparse form [makes divisions easier](https://loup-vaillant.fr/tutorials/poly1305-design#poly1305s-prime-2130---5). The result is then reduced using modulo 2^128.

The random number `s` acts as the second key. It is a 16-byte integer, used to mask the polynomial rolling hash. The key `s` must never be reused.

<!--
![hash modulo; then added; then modulo again;](interactive)
 -->

The result is a 16 byte, or 128 bit MAC generated from an input `C` of arbitrary length, and two 16-byte secret keys `r` and `s`.

<!--
![message to MAC; input for r — randomize button; input for s — randomize button; input for message; shows poly1305 mac as output; maybe show equations in the background but greyed out;](interactive)
 -->

## ChaCha20-Poly1305

Poly1305 can be used to authenticate ciphertexts generated using ChaCha20. The keys for Poly1305, `r` and `s` can be derived from the keys used for ChaCha20. However the 256-bit key used in ChaCha cannot directly be used in Poly1305 — because the key is persistent, but `s` should always be unique for every MAC.

<!--
![256 bit key top; left chacha block; arrow from key to chacha block; nonce and counter on left of chacha block — arrows from them to chacha block; right poly13 block; arrow from key to poly13 block — separates into two stream r & s; update button — new message; key stays same; highlight key reuse for poly13 block;](interactive)
 -->

While the key used in ChaCha20 is persistent, its keystream is not. ChaCha20 had been designed to always generate unique keystreams. Every time a new message needs to be authenticated, an extra pseudorandom block can be generated using ChaCha20, which can be used as keys for Poly1305.

In ChaCha20-Poly1305, the extra block is generated by setting the counter of the initial state to zero for each new nonce (message). The rest of the keystream used to encrypt the plaintext message is generated by incrementing the counter, starting from one.

<!--
![chacha-poly counter 0 block; new message — resets; new nonce; counter resets to 0; used for r,s; counter keeps incrmenting; initial block for keys; rest of blocks used for XORing plaintext — show as shown before (streams getting XORed);](interactive)
 -->

The size of the pseudorandom block is 512 bits, but only 256 bits are required for the key pair `r` and `s`. So only the first 256 bits are used, while the remaining bits are discarded. The first 128 bits are used for `r` while the next 128-bits are used for `s`. Additionally, bits of `r` are clamped to satisfy its requirements — top four and bottom two bits of specific bytes must be zero.

<!--
![512 bit block — second half greyed out to indicate rejection; s used as is; r being clamped;](static/interactive)
 -->

Because `r` and `s` are derived from a ChaCha20 block, which itself is dervied using a secret 256-bit key, the 256-bit key is used for both encryption and authentication.

<!--
![message being encrypted and authenitcated;](interactive)
 -->

It is worth noting that there are slight differences between ChaCha20 and the ChaCha20 used in ChaCha20-Poly1305. Unlike ChaCha20, the initial state in ChaCha20-Poly1305 uses a 32-bit counter and 96-bit nonce instead of a 64-bit counter and 64-bit nonce.

<!--
![init state — chacha20 vs chacha20-poly1305;](static)
 -->

This allows more messages to be encrypted using the same key, albeit shorter ones. But it is not a problem, since a 32-bit counter still allows for encryption of messages up to 256 GiB in size.

### Associated Data

Sometimes ciphetexts can be paired with some associated plaintext data, which need not or should not be encrypted, but still need to be verified — data such as message timestamps, addresses, protocol versions, etc. This cleartext data is often sent alongside the ciphertext, and both are authenticated using a single MAC. This additional data is called associated data, and the authenticated encryption scheme that authenticates the associated data alongside the ciphertext, is called [authenticated encryption with associated data](https://en.wikipedia.org/wiki/Authenticated_encryption#Authenticated_encryption_with_associated_data), or AEAD.

ChaCha20-Poly1305 can authenticate ciphertext `C` along with some associated data `AD` by concatenating together, and treating them as a single unit to generate the MAC. The ChaCha20-Poly1305 specification defines `AD` and `C` to be separately padded to make their total sizes an even multiple of sixteen bytes. The padded `AD` and `C` as well as two other 64-bit fields, `len(AD)` and `len(C)`, are concatenated. Poly1305 then produces the MAC of the concatenated string.

<!--
![all combined — https://en.wikipedia.org/wiki/File:ChaCha20-Poly1305_Encryption.svg;](interative)
 -->

{% tangent(summary="Message size limit", open=false) %}
While Poly1305 can be used for authenticating messages of arbitrary length, the 64-bit fields for `len(AD)` and `len(C)` restricts the possible size of the associated data `AD` and the ciphertext message `C` to 2^64 bits, or 16 EiB. But ciphertext `C` is further bottlenecked by the 32-bit counter of the ChaCha20 initial state — limiting message sizes to only 256 GiB. If required however, the ChaCha20-Poly1305 specification permits changing the counter to be set to its original size of 64 bits to allow encrypting and authenticating longer messages.
{% end %}

This is the entirety of [ChaCha20-Poly1305](https://en.wikipedia.org/wiki/ChaCha20-Poly1305), a stream cipher used to encrypt messages, and authenticate the encrypted messages along with some optional associated data. It used in [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security#TLS_1.3), [SSH](https://en.wikipedia.org/wiki/Secure_Shell#Algorithms), [WireGuard](https://en.wikipedia.org/wiki/WireGuard#Protocol), and [other protocols](https://en.wikipedia.org/wiki/ChaCha20-Poly1305#Use).

## Security Guarantees

The probability that attackers cannot decrypt a given ciphertext relies on the security of ChaCha20. Meanwhile the possibilities of forgeries depends on the security of Poly1305, as well as ChaCha20.

### Poly1305 Security

Since the output of Poly1305 is combined with a pseudorandom pad, it is as secure as the algorithm used to generate pseudorandom number. However, it does not imply that it is perfectly secure if the pad is purely random — since collisions are still possible as the of the size of the MAC is [finite](https://en.wikipedia.org/wiki/Pigeonhole_principle).

Consider a prime field <i>GF(p)</i>, taken as <i>x mod p</i> where <i>x ∈ ℤ</i> and <i>p</i> is prime. Then, for some polynomial of degree one, e.g. <i>a·x = h</i> where <i>a,x,h ∈ GF(p)</i> — there exists only one solution or root for <i>x</i>. The probability that <i>x</i> will produce <i>h</i> for a given <i>a</i> is <i>1/n</i>, where <i>n</i> is the number of all possible values for <i>x</i>. That is, <i>n = p</i>.

<!--
![modulo heptagon, thirteen-agon etc (user selectable modulo); three in total; one on left selectable by user (a), one in middle, grayed out (x) — depends on a & h; one on right selectable by user (h)](interactive)
 -->

For a polynomial of degree two, e.g. <i>a·x^2 + b·x = h</i>, there can be at most two solutions for <i>x</i>. The probability that <i>x</i> produces <i>h</i> for a given pair <i>a,b</i> is at most <i>2/n</i>. Where <i>n</i> is the total number of possible values for <i>x</i>. Here again, <i>n = p</i>.

<!--
![modulo heptagon, thirteen-agon etc (user selectable modulo); four in total; one on left selectable by user (a), two in middle, grayed out (x) — depends on a & h; one on right selectable by user (h)](interactive)
 -->

Similary, for a <i>q</i> degree polynomial, e.g. <i>C1·x^q + C2·x^(q-1) + ... + Cq·x^1 = h</i>, [there are at most](https://en.wikipedia.org/wiki/Finite_field#Roots_of_unity) <i>q</i> number of roots for <i>x</i>, such that <i>x ∈ GF(p)</i>. Again, the probability that <i>x</i> produces <i>h</i> for some given coefficients is, at most <i>q/n</i> — where <i>n</i> is again the number of possible values for <i>x</i>.

Now assume a message <i>m</i> has a polynomial hash <i>h</i>. The probability of another distinct message <i>m'</i> having the same hash digest <i>h</i> will then depend on the on the degree of its polynomial. The polynomial in Poly1305 is of the form C1·r^q + C2·r^(q-1) + … + Cq·r^1. The coefficients of the polynomial are constructed from 16-byte chunks of a message, and thus, the degree of the polynomial is <i>⌈L/16⌉</i> — where <i>L</i> is the length of the message. So the probablity of a message <i>m'</i> having the (same) hash <i>h</i> is at most <i>⌈L/16⌉/n</i>.

<!--
![from m to L to q to h;](static)
 -->

Since the indeterminate of the polynomial in Poly1305 <i>r</i> is a 128-bit number with 22 bits always set to zero, the total number of possible values for <i>r</i> is 2^106. Thus, the probability of a message having a specific hash is at most <i>⌈L/16⌉/2^106</i>.

However, the polynomial is evaluated in <i>GF(p)</i> — the result is <i>h ∈ [0, 2^130 - 5)</i>, while the hash in Poly1305 is designed to be of 128 bits. So <i>h</i> is reduced modulo 2^128. Discarding two bits from <i>h</i> causes some outputs to be [congruent](https://en.wikipedia.org/wiki/Modular_arithmetic#Congruence) to others. More specifically, there are eight congurent values (mod 2^128) in <i>h</i> for every <i>H(m)</i> and <i>H(m')</i>.

<!--
![00xx... = 01xx... = 10xx... = 11xx... on top for m1 and on bottom for m2 — on left; xx... on right — sigynifying actual 128-bit hash value;](static)
 -->

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

The randomness of the output of the ChaCha20 stream determines the security of the ciphertext, as well as the security of Poly1305. For true uniform randomness, each bit must have an equal probability of being either zero or one.

Changing the initial state of a ChaCha20 block ([even by a single bit flip](https://en.wikipedia.org/wiki/Avalanche_effect#Strict_avalanche_criterion)) should ideally create a new uniform random block of bits. That is, the individual probability of all the bits of the output block flipping should be half — on average, [half the bits should flip](https://en.wikipedia.org/wiki/Confusion_and_diffusion#Diffusion) for a change in the initial state. Or more specifically, the [number of bit flips](https://en.wikipedia.org/wiki/Hamming_distance) due to changes the inital state should form a [binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution) centered around half the bit length of the output block.

<!--
![button to change state; show changes in output state -> hamming distance -> plot bino distribution;](aaa)
 -->

Empirical evidence suggests that it is the case. ChaCha20 generates blocks that appear uniformly random. Evaluating the randomess analytically is much more difficult however, because the interaction between the bits of the block quickly grows complex with each round. While there are ways to [measure the avalanche effect](https://webdoc.sub.gwdg.de/ebook/dissts/Bochum/Daum2005.pdf#page=57) — small changes flipping roughly half the bits, there is no proof that ChaCha20 blocks blocks can be distinguished (or not) from truly uniform random bitstreams.

There are however other ways to test its security — for example, using [linear](https://en.wikipedia.org/wiki/Linear_cryptanalysis), [differential](https://en.wikipedia.org/wiki/Differential_cryptanalysis) or [rotational](https://en.wikipedia.org/wiki/Rotational_cryptanalysis) [cryptanlysis](https://en.wikipedia.org/wiki/Cryptanalysis). ChaCha with six rounds has been [broken](https://cr.yp.to/streamciphers/attacks.html#chacha6), but there have been no successful attacks on twenty rounds of ChaCha.

ChaCha20-Poly1305, therefore is generally [considered secure](https://www.cryptrec.go.jp/exreport/cryptrec-ex-2601-2016.pdf).

## Other Ciphers

Although [other stream ciphers](https://en.wikipedia.org/wiki/Stream_cipher#Comparison) exist, ChaCha20 is the most widely used cipher currently. Other types of symmetric encryption, such as [block ciphers](https://en.wikipedia.org/wiki/Block_cipher) are also widely used for encryption and decryption. These generally use [substitution](https://en.wikipedia.org/wiki/S-box) and [permutation](https://en.wikipedia.org/wiki/Permutation_box) boxes to diffuse the data blocks in place, instead of generating a keystream.

There is also asymmetric key cryptography where communicating parties do not require the same keys for encrypting information. This type of cryptography is quite different from the ciphers mentioned above, and usually relies on the properties of [number theory](https://en.wikipedia.org/wiki/Number_theory) and [group theory](https://en.wikipedia.org/wiki/Group_theory) instead.

---

## References

* Daniel J. Bernstein: [ChaCha, a variant of Salsa20](https://cr.yp.to/chacha/chacha-20080128.pdf)
* Daniel J. Bernstein: [The Poly1305-AES message-authentication code](https://cr.yp.to/mac/poly1305-20050329.pdf)
* IRTF RFC 8439: [ChaCha20 and Poly1305 for IETF Protocols](https://datatracker.ietf.org/doc/html/rfc8439)

<script src="/scripts/stream-ciphers.js"></script>
