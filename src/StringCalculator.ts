export function CalculateStringNumber(numbers: string): number {
  if (numbers === '') {
    return 0;
  }

  let delimiter = /,|\n/;
  let numbersString = numbers;

  if (numbers.startsWith('//')) {
    const newlineIndex = numbers.indexOf('\n');
    if (newlineIndex !== -1) {
      const delimiterString = numbers.substring(2, newlineIndex);
      if (delimiterString.startsWith('[') && delimiterString.endsWith(']')) {
        const escapedDelimiter = delimiterString
          .substring(1, delimiterString.length - 1)
          .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        delimiter = new RegExp(escapedDelimiter);
      } else {
        delimiter = new RegExp(
          delimiterString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
        );
      }

      numbersString = numbers.substring(newlineIndex + 1);
    } else {
      return 0; // Or throw an exception for invalid format
    }
  }

  const numStrings = numbersString
    .split(delimiter)
    .filter(s => s.trim() !== '');
  const numArr = [];
  const negativeNumbers = [];

  for (const numStr of numStrings) {
    const num = Number(numStr.trim());
    if (isNaN(num)) continue;

    if (num < 0) {
      negativeNumbers.push(num);
    }
    numArr.push(num);
  }

  if (negativeNumbers.length > 0) {
    throw new Error(
      `negative numbers not allowed ${negativeNumbers.join(',')}`,
    );
  }

  console.log('====================================');
  console.log(numArr);
  console.log('====================================');

  return numArr.reduce((sum, num) => sum + num, 0);
}
