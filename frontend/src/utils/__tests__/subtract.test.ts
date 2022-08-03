import { subtract } from "../calculator";

let testCases = [
  [0, 0, 0],
  [-1, 0, 1],
  [0, 1, 1],
  [3, 5, 2],
  [5, 10, 5],
];

test.each(testCases)(
  "should return %s when subtracting %s from %s",
  (expected, a, b) => {
    const result = subtract(a, b);
    expect(result).toBe(expected);
  }
);
