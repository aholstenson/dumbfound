# dumbfound

Randomized testing infrastructure. This is the main library that provides
support for reproducible randomness that is used to implement custom tests
for test runners such as [Jest][jest] and [Mocha][mocha].

## Introduction

Randomized testing is built around the idea that tests should sometimes fail,
and that every time a test fails it helps improve the quality of your project.
Randomized testing helps with failure by introducing limited randomness into
test cases to help find edge cases.

Dumbfound is built around supplying deterministic randomness that can be used
by a test case to generate random data. The deterministic aspect helps with
making test failures reproducible by providing a seed that can be used to
replay the test case.

## Using

For most use cases an implementation specific to a test runner should be used,
but this library can also be used directly:

```javascript
const { generateSeed, Randomizer } = require('dumbfound');

// Generate a seed for use with the randomizer
const seed = generateSeed();

// Create a new instance over the given seed
const random = new Randomizer(seed);

console.log('Using seed:', random.seed);
console.log('Generated int:', random.int(100));
```

[jest]: https://github.com/aholstenson/dumbfound/tree/master/packages/jest
[mocha]:https://github.com/aholstenson/dumbfound/tree/master/packages/mocha
