import { divide } from "../calculator";

let testCases = [
  [0, 0, 0],
  [0, 0, 1],
  [2, 2, 1],
  [3, 9, 3],
  [10, 50, 5],
];

test.each(testCases)(
  "should return %s when dividing %s by %s",
  (expected, a, b) => {
    const result = divide(a, b);
    expect(result).toBe(expected);
  }
);
