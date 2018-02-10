# Dumbfound

Randomized testing for JavaScript. Dumbfound hooks into test runners such as
Mocha and Jest and provides randomization for specified tests and helps with
making test failures reproducible.

*Note:* This is currently a very early version that does almost nothing useful.

## Introduction

Randomized testing is built around the idea that tests should sometimes fail,
and that every time a test fails it helps improve the quality of your project.
Randomized testing helps with failure by introducing limited randomness into
test cases to help find edge cases.

Dumbfound is built around supplying deterministic randomness that can be used
by a test case to generate random data. The deterministic aspect helps with
making test failures reproducible by providing a seed that can be used to
replay the test case.

## Example using Jest

Install `dumbfound-jest` into your local project:

```
npm install --save-dev dumbfound-jest
```

Use it in your tests:

```javascript
const { randomizedTest } = require('dumbfound-jest');

randomizedTest('Example', random => {
  const totalOrders = random.intBetween(5, 10);

  // Do something useful with the test here
});
```

## Randomizer API

### Numbers

* `number(max)` - generate a number between 0 and max (exclusive).
* `numberBetween(min, max)` - generate a number between min (exlusive) and max (exclusive).
* `int(max)` - generate a whole number between 0 and max (exclusive).
* `int(min, max)` - generate a whole number between min (inclusive) and max (exclusive).

### Booleans

* `boolean()` - generate either `true` or `false`.
* `boolean(trueProbability)` - generate either `true` or `false`, probability of true is between 0 and 1.

### Strings

*
  `string(alphabet, length)` - generate a string using the given alphabet.

  Alphabets are provided via the `alphabets` key when requiring the library:

  ```javascript
  const { alphabets } = require('dumbfound-testRunnerHere');

  randomizer.string(alphabets.ascii.lowercase, 40);
  ```

* `asciiDigits(length)` - generate string with ASCII digits (0 to 9) of the given length.
* `asciiLowercase(length)` - generate string with ASCII lower-case characters (a to z) of the given length.
* `asciiUppercase(length)` - generate string with ASCII uppwer-case characters (A to Z) of the given length.
* `ascii(length)` - generate string with ASCII characters (lower-case, upper-case, digits) of the given length.
* `asciiWithSpaces(length)` - generate string with ASCII characters including spaces of the given length.
