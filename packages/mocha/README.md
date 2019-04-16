# dumbfound-mocha

Randomized testing for Mocha. Provides deterministic randomness that can be
used by test cases to find new bugs.

## Introduction

Randomized testing is built around the idea that tests should sometimes fail,
and that every time a test fails it helps improve the quality of your project.
Randomized testing helps with failure by introducing limited randomness into
test cases to help find edge cases.

Dumbfound is built around supplying deterministic randomness that can be used
by a test case to generate random data. The deterministic aspect helps with
making test failures reproducible by providing a seed that can be used to
replay the test case.

## Example

Install `dumbfound-mocha` into your local project:

```
npm install --save-dev dumbfound-mocha
```

Use it in your tests:

```javascript
const { randomizedTest } = require('dumbfound-mocha');

randomizedTest('Example', random => {
  const totalOrders = random.intBetween(5, 10);

  // Do something useful with the test here
});

// Generate a random number of runs of the given test
randomizedRuns('Group name', 1, 5, () => {
  randomizedTest('Test in group', random => {
    ...
  });
});
```

## Handling failures

Tests created via `randomizedTest` will have information about the seed used
to run the test appended to their name. The seed is important as it provides
a way to reproduce the randomness in the test allowing for debugging and fixing
of the code behind the test. The seed can via an environment variable named `SEED`.

Using seed with `randomizedTest`:

```javascript
randomizedTest('Test in group', random => ...);
```

It might be useful to use `.only` to limit test running to the given test:

```javascript
randomizedTest.only('Test in group', random => ...);
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

// Generate an int between 0 and 500
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
 * Create a generator that produces an array between 5 and 25 items with
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

* `number(max?: number): number` - generate a number between `-9007199254.740992`
  and `9007199254.740992`. If max is specified generate a number between `0` and
  max (inclusive).
* `numberBetween(min: number, max: number): number` - generate a number between
  min (inclusive) and max (inclusive).
* `int(max?: number): number` - generate a whole number between `-9007199254740991`
  and `9007199254740991`. If max is specified generate a whole number between `0`
  and max (inclusive).
* `intBetween(min: number, max: number): number` - generate a whole number between 
  min (inclusive) and max (inclusive).
* `evilNumber(max?: number): number` - generate an evil number that will bias
  towards numbers that can cause issues. Follows the same rules as `number(max?)`.
* `evilNumberBetween(min: number, max: number): number` - generate an evil
  number in the given range that will bias towards numbers that can cause 
  issues.

### Booleans

* `boolean(trueProbability=0.5): boolean` - generate either `true` or `false`.
  Optionally specify a probability to return true between 0 and 1.
* `frequently(): boolean` - generate `true` frequently and `false` otherwise.
* `rarely(): boolean` - generate `false` frequently and `true` otherwise.

### Strings

All string generation supports the optional `length` parameter, if not specified
a string between 0 and 20 characters will be returned.

* `string(generator: CharGenerator | CharGenerator[], length?: number): string` - 
  generate a string using the given character generator.
* `asciiDigits(length?: number): string` - generate string with ASCII digits
  (0 to 9) of the given length.
* `asciiLowercase(length?: number): string` - generate string with ASCII
  lower-case characters (a to z) of the given length.
* `asciiUppercase(length?: number): string` - generate string with ASCII
  upper-case characters (A to Z) of the given length.
* `ascii(length?: number): string` - generate string with ASCII characters 
  (lower-case, upper-case, digits) of the given length.
* `asciiWithSpaces(length?: number): string` - generate string with ASCII
  characters including spaces of the given length.
* `unicode(length?: number): string` - generate a string with any Unicode
  character of the given length.

There are a lot of character sources available:

```javascript
const { asciiDigits, unicodeBasicLatin, unicodeArrows } = require('dumbfound-testRunnerHere');

// Generate with a single character source
randomizer.string(asciiDigits, 40);

// Generate with multiple character sources
randomizer.string([ unicodeBasicLatin, unicodeArrows ], 40);
```

See [available sources](https://github.com/aholstenson/dumbfound/tree/master/docs/character-generators.md)
for a list of character sources.

### Arrays and Sets

Arrays can be created via the `array` function and require a generator function.

```javascript
// Generate an array with 25 random numbers
const arr1 = random.array(25, random.gen.int(500000));

// Generate an array with 10 strings consisting of ASCII digits
const arr2 = random.array(10, randomizer => randomizer.asciiDigits());

// Generate an array of primitive values between 5 and 10 items
const arr3 = random.array(random.intBetween(5, 10), random.gen.primitiveValue());
```

* `array(length: number, generator: Generator<ValueType>): ValueType[]` - 
  generate an array of the given length, the generator should be a function that
  returns a single value.
* `uniqueArray(length: number, generator: Generator<ValueType>): ValueType[]` -
  generate an array with unique items of the given length. Generator should be
  a function that returns a single value.
* `set(length: number, generator: Generator<ValueType>): Set<ValueType>` - 
  generate a Set (with unique items) of the given length.

### Static values

* `nan(): NaN` - always generate a `NaN` value. For use as a generator.
* `null(): null` - always generate a `null` value. For use as a generator.
* `undefined(): undefined` - always generate a `undefined` value. For use as a generator.

### Value picking

* `pick(items: ValueType[]): ValueType` - pick a single item from the given
  array. Items in the array may be generators in which case they will be resolved.
* `pick(items: ValueType[], weights: number[]): ValueType` - pick a single item
  from the given array while applying weights to each item.
* `primitiveValue()` - generate a primitive value, either `null`, `NaN`,
  `undefined`, a number, a boolean or a string. 
* `truthy(): any` - generate a truthy value, that is a value that when used with 
  `if(value)` would resolve to `true`.
* `falsy(): any` - generate a falsy value, that is a value that when used with
  `if(value)` would resolve to `false`.

### Misc

* `uuid(): string` - generate a UUIDv4.
* `get(generator: Generator<ValueType>): ValueType` - resolve by invoking a
  generator function. The function may take a randomizer as its first argument
  and should return a value.

[repo]: https://github.com/aholstenson/dumbfound/
