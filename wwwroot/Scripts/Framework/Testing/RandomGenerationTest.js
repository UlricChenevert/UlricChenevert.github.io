// import { RandomGenerator } from "../RandomGeneration/RandomGenerator";
// test('Tests Random Generation Interval', () => {
//   expect(randomGenerator.random()).toBe(3);
// });
import { expect, test } from 'vitest';
const sum = (a, b) => { return a + b; };
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});
