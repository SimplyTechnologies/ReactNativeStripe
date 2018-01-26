/**
 * @flow
 * @providesModule AppConstants
 */

export { HttpMethods } from "./HttpMethods";
export { ResponseStatuses } from "./ResponseStatuses";

export const REQUIRED = (name: string): string => `${name} is required`;
export const MIN_LENGTH = (name: string, min: number): string =>
  `${name} must be at least ${min} chars long.`;

export const PASSWORD_NOT_MATCH = "Passwords do not match";

export const USERNAME_MIN_LENGTH = 5;

export const PASSWORD_MIN_LENGTH = 5;
