const myFunctions = require('./index.js');

test('Testing div -- success', () => {
  const target = 2/3;
  const result = myFunctions.div(12, 18);
  expect(target).toBe(result);
});

test('Testing containsNumbers, false -- success', () => {
    const target = false;
    const result = myFunctions.containsNumbers("hello");
    expect(target).toBe(result);
});

test('Testing containsNumbers, true -- success', () => {
    const target = true;
    const result = myFunctions.containsNumbers("hell0");
    expect(target).toBe(result);
});

