import {CalculateStringNumber} from '../src/StringCalculator';

describe('StringCalculator', () => {
  test('should return 0 for an empty string', () => {
    expect(CalculateStringNumber('')).toBe(0);
  });

  test('should return the number itself for a single number', () => {
    expect(CalculateStringNumber('1')).toBe(1);
    expect(CalculateStringNumber('5')).toBe(5);
  });

  test('should return the sum of two numbers separated by a comma', () => {
    expect(CalculateStringNumber('1,2')).toBe(3);
    expect(CalculateStringNumber('10,20')).toBe(30);
  });

  test('should handle newlines as delimiters', () => {
    expect(CalculateStringNumber('1\n2,3')).toBe(6);
  });

  test('should support custom delimiters', () => {
    expect(CalculateStringNumber('//;\n1;2;3')).toBe(6);
    expect(CalculateStringNumber('//|\n4|5|6')).toBe(15);
  });

  test('should throw an error for negative numbers', () => {
    expect(() => CalculateStringNumber('1,-2,3')).toThrow(
      'Negative numbers not allowed: -2',
    );
  });

  test('should list all negative numbers in the error message', () => {
    expect(() => CalculateStringNumber('1,-2,-5,3')).toThrow(
      'Negative numbers not allowed: -2, -5',
    );
  });

  test('should handle single-character custom delimiter', () => {
    expect(CalculateStringNumber('//;\n1;2')).toBe(3);
  });
});
