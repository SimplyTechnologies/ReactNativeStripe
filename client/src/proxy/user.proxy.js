import { fetchUtils } from "AppUtils";
import { HttpMethods } from "AppConstants";

const EMPTY_OBJECT = {};
const USER_PROXY_URI = "/auth";
const { makeRequest } = fetchUtils;
const { GET, POST } = HttpMethods;

const userLogin = (username, password) =>
  makeRequest(`${USER_PROXY_URI}/login`, POST, EMPTY_OBJECT, {
    username,
    password
  });

export const userProxy = {
  userLogin
};
