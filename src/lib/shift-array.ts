export default function shiftArray(
  array: any[],
  index: number,
  direction: 1 | -1
): any[] {
  const targetIndex = index + direction;
  if (targetIndex === -1 || targetIndex === array.length) {
    throw new Error('Target is out of bounds.');
  }
  const newArray = [...array];
  const indexValue = newArray.at(index);
  const swappingValue = newArray.at(targetIndex);
  newArray[index] = swappingValue;
  newArray[targetIndex] = indexValue;
  return newArray;
}
