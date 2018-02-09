# dumbfound

Randomized testing for JavaScript. Dumbfound hooks into test runners such as
Mocha and Jest and provides randomization for specified tests and helps with
making test failures reproducible.

*Note:* This is currently a very early version that does almost nothing useful.

## Example using Jest

Install `dumbfound-jest` into your local project:

```
npm install dumbfound-jest
```

Use it in your tests:

```javascript
const { randomizedTest } = require('dumbfound-jest');

randomizedTest('Example', random => {
  const totalOrders = random.intBetween(5, 10);

  const entries = random.int(5000);
});
```

