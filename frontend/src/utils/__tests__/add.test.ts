import { add } from "../calculator";

let testCases = [
  [0, 0, 0],
  [1, 0, 1],
  [2, 1, 1],
  [4, 2, 2],
  [5, 3, 2],
];

test.each(testCases)(
  "should return %s when adding %s to %s",
  (expected, a, b) => {
    const result = add(a, b);
    expect(result).toBe(expected);
  }
);
