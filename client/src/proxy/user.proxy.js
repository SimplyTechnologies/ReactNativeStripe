import { fetchUtils } from "AppUtils";
import { HttpMethods } from "AppConstants";

const EMPTY_OBJECT = {};
const USER_PROXY_URI = "/users";
const { makeRequest } = fetchUtils;
const { GET, POST } = HttpMethods;

export const userLogin = (username, password) =>
  makeRequest(`${USER_PROXY_URI}/login`, POST, EMPTY_OBJECT, {
    username,
    password
  });
