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

## Randomizer and generators

The randomizer is the main API for generating random values. For most test
runners it is supplied as the first argument in the test function. Methods on
the object can be used to generate random values by invoking them either
directly or via a generator function.

Example invoking them directly:

```javascript
// Generate an int between 0 and 500
const i = random.int(500);

// Pick an item
const picked = random.pick([ 'a', 'b', 'c' ]);
```

Generators are functions that resolve a value when invoked. The Randomizer API
is available in a generator form, via the `gen` property. Generators
are useful to model a more complex data that you want to use several times.

Example of creating generator functions:

```javascript
// Create a function that generates an int between 0 and 500
const intCreator = random.gen.int(500);

// Generate an in between 0 and 500
const i = intCreator();
const i2 = intCreator(); // Will generate another int

// Create a picker function
const picker = random.gen.pick([ 'a', 'b', 'c' ]);
// Pick the item
const picked = picker();
```

Example of more complex generator:

```javascript
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

## Randomizer and Generator API

For randomizer these methods will return the generated value and for generators
they will return a function that can be used to generate a value within the
chosen bounds.

### Numbers

* `number()` - generate a number.
* `number(max)` - generate a number between 0 and max (exclusive).
* `numberBetween(min, max)` - generate a number between min (exlusive) and max (exclusive).
* `int()` - generate a whole number.
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
* `unicode(length)` - generate a string with any Unicode character of the given length.

## Arrays and Sets

Arrays can be created via the `array` function and require a generator function.

```javascript
const arr1 = random.array(idx => 'Item ' + idx);
const arr2 = random.gen.int(500000);
```

* `array(generator)` - generate an array with a length between 0 and 10.
* `array(length, generator)` - generate an array of the given length.
* `uniqueArray(generator) ` - generate an array with unique items with a length between 0 and 10.
* `uniqueArray(length, generator)` - generate an array with unique items of the given length.
* `set(generator)` - generate a Set (with unique items) with a length between 0 and 10.
* `set(length, generator)` - generate a Set (with unique items) of the given length.

## Static values

* `nan()` - always generate a `NaN` value. For use as a generator.
* `null()` - always generate a `null` value. For use as a generator.
* `undefined()` - always generate a `undefined` value. For use as a generator.

## Value picking

* `pick(items)` - pick a single item from the given array. Items in the array may be generators in which case they will be resolved.
* `pick(items, weights)` - pick a single item from the given array while applying weights to each item.
* `primitiveValue()` - generate a primitive value, either `null`, `NaN`, `undefined`, a number, a boolean or a string. 
