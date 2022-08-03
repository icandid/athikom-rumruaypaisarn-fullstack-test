import { multiply } from "../calculator";

let testCases = [
  [0, 0, 0],
  [0, 0, 1],
  [1, 1, 1],
  [6, 3, 2],
  [50, 10, 5],
];

test.each(testCases)(
  "should return %s when multiplying %s by %s",
  (expected, a, b) => {
    const result = multiply(a, b);
    expect(result).toBe(expected);
  }
);
