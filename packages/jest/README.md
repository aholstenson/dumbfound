# dumbfound-jest

Randomized testing for Jest. Provides deterministic randomness that can be
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

Install `dumbfound-jest` into your local project:

```
npm install dumbfound-jest
```

Use it in your tests:

```javascript
const { randomizedTest } = require('dumbfound-jest');

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
of the code behind the test. The seed can be input into the test either via an
argument or via an environment variable named `SEED`.

Using seed with `randomizedTest`:

```javascript
randomizedTest('Test in group', 'seed-here', random => ...);
```

It might be useful to use `.only` to limit test running to the given test:

```javascript
randomizedTest.only('Test in group', 'seed-here', random => ...);
```

## API documentation

For now see the [main repository][repo] for details about the API available
in tests.

[repo]: https://github.com/aholstenson/dumbfound/
