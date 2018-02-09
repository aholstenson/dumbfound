# dumbfound

Randomized testing infrastructure. This is the main library that provides
support for reproducible randomness that is used to implement custom tests
for test runners such as [Jest]() and [Mocha]().

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
