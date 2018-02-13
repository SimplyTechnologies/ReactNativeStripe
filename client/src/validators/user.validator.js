// @flow
import { validateUtils } from "AppUtils";
import {
  MIN_LENGTH,
  PASSWORD_NOT_MATCH,
  USERNAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH
} from "AppConstants";

const { isLength, matches } = validateUtils;
const EMPTY = "";
const USERNAME_MIN = MIN_LENGTH("username", USERNAME_MIN_LENGTH);
const PASSWORD_MIN = MIN_LENGTH("password", PASSWORD_MIN_LENGTH);

export const validateRegister = ({
  username,
  password,
  confirmPassword
}: any): any => ({
  username: isLength(username, { min: USERNAME_MIN_LENGTH })
    ? EMPTY
    : USERNAME_MIN,
  password: isLength(password, { min: PASSWORD_MIN_LENGTH })
    ? EMPTY
    : PASSWORD_MIN,
  confirmPassword: matches(password, confirmPassword)
    ? EMPTY
    : PASSWORD_NOT_MATCH
});

export const validateLogin = ({ username, password }: any): any => ({
  username: isLength(username, { min: USERNAME_MIN_LENGTH })
    ? EMPTY
    : USERNAME_MIN,
  password: isLength(password, { min: PASSWORD_MIN_LENGTH })
    ? EMPTY
    : PASSWORD_MIN
});
