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

All string generation supports the optional `length` parameter, if not specified
a string between 0 and 20 characters will be returned.

*
  `string(charGenerator, length)` - generate a string using the given character generator.

  Character generators are required and common implementation are available via
  the key `chars` when requiring the library:library:

  ```javascript
  const { chars } = require('dumbfound-testRunnerHere');

  randomizer.string(chars.ascii.lowercase, 40);
  randomizer.string(chars.unicode.basicLatin, 40);
  ```

* `asciiDigits(length)` - generate string with ASCII digits (0 to 9) of the given length.
* `asciiLowercase(length)` - generate string with ASCII lower-case characters (a to z) of the given length.
* `asciiUppercase(length)` - generate string with ASCII uppwer-case characters (A to Z) of the given length.
* `ascii(length)` - generate string with ASCII characters (lower-case, upper-case, digits) of the given length.
* `asciiWithSpaces(length)` - generate string with ASCII characters including spaces of the given length.

## Arrays

Arrays can be created via the `array` function and require a generator function.

```javascript
const arr1 = random.array(idx => 'Item ' + idx);
const arr2 = random.gen.int(500000);
```

* `array(generator)` - generate an array with a length of between 0 and 10 items.
* `array(length, generator)` - generate an array of the given length.
* `uniqueArray(generator) ` - generate an array with unique items with a length of between 0 and 10 items.
* `uniqueArray(length, generator)` - generate an array with unique items of the given length.

## Generators

Generators are functions that resolve a value when invoked. The Randomizer API
is available in a generator form, via the `randomizer.gen` object. Generators
are useful to model a more complex data that you want to use several times.

Example:

```javascript
const random = // randomizer for your test-case;

/*
 * Greate a generator that produces an array between 5 and 25 items with
 * ASCII strings.
 */
const fn = random.gen.array(
  random.gen.intBetween(5, 25),
  random.gen.ascii()
);

const array1 = fn();
const array2 = fn();
```
