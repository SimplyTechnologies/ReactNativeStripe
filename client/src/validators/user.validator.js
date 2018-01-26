// @flow
import { validateUtils } from "AppUtils";
import { MIN_LENGTH, PASSWORD_NOT_MATCH } from "AppConstants";

const { isLength, matches } = validateUtils;
const EMPTY = "";
const USERNAME_MIN = MIN_LENGTH("username", 5);
const PASSWORD_MIN = MIN_LENGTH("password", 5);
const MIN_FIVE = {
  min: 5
};

export const validateRegister = ({
  username,
  password,
  confirmPassword
}: any): any => ({
  username: isLength(username, MIN_FIVE) ? EMPTY : USERNAME_MIN,
  password: isLength(password, MIN_FIVE) ? EMPTY : PASSWORD_MIN,
  confirmPassword: matches(password, confirmPassword)
    ? EMPTY
    : PASSWORD_NOT_MATCH
});

export const validateLogin = ({ username, password }: any): any => ({
  username: isLength(username, MIN_FIVE) ? EMPTY : USERNAME_MIN,
  password: isLength(password, MIN_FIVE) ? EMPTY : PASSWORD_MIN
});
