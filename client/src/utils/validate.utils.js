// @flow

const isEmpty = (value: string): boolean => !value;

const isLength = (
  value: string,
  lengths: { min?: number, max?: number }
): boolean => {
  const { min, max } = lengths;
  let returnValue = true;
  if (min) {
    returnValue = returnValue && value.length >= min;
  }
  if (max) {
    returnValue = returnValue && value.length <= max;
  }
  return returnValue;
};

const matches = (value1: string, value2: string): boolean => value1 === value2;

export const validateUtils = {
  isEmpty,
  isLength,
  matches
};
