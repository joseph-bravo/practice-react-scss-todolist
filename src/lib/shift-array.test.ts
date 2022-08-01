import shiftArray from './shift-array';

const exampleArray = ['a', 'b', 'c', 'd', 'e'];

describe('Shifts a value in the array left or right.', () => {
  test('Should not modify original array.', () => {
    const result = shiftArray(exampleArray, 0, 1);
    expect(result).not.toBe(exampleArray);
  });

  test('provided direction 1, moves value right.', () => {
    const result = shiftArray(exampleArray, 0, 1);
    expect(result).toEqual(['b', 'a', 'c', 'd', 'e']);
  });

  test('provided direction -1, moves value left.', () => {
    const result = shiftArray(exampleArray, 4, -1);
    expect(result).toEqual(['a', 'b', 'c', 'e', 'd']);
  });

  test('if target is out of bounds, throw Error', () => {
    expect(() => shiftArray(exampleArray, 4, 1)).toThrow();
  });
});
