// @flow

const isEmpty = (value: string): boolean => !value;

const isLength = (
  value: string,
  lengths: { min?: number, max?: number }
): boolean => {
  let returnValue = true;
  if (typeof lengths.min !== "undefined") {
    returnValue = returnValue && value.length < lengths.min;
  }
  if (typeof lengths.max !== "undefined") {
    returnValue = returnValue && value.length > lengths.max;
  }
  return returnValue;
};

const matches = (value1: string, value2: string): boolean => {
  console.log(value1, value2);
  return value1 === value2;
};

export const validateUtils = {
  isEmpty,
  isLength,
  matches
};
