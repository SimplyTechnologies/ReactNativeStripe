// @flow
import { Platform } from "react-native";
import { ResponseStatuses } from "AppConstants";
import { IP_ADDRESS } from "../../config";

const { OS } = Platform;
const BASE_URL =
  OS === "ios" ? "http://localhost:3000" : `http://${IP_ADDRESS}:3000`;

const { STATUS_OK } = ResponseStatuses;

/**
 * api fetching helper functions
 * */

/**
 * Checking response status
 * */
const checkStatus = response => {
  const { status } = response;
  if ((status >= 200 && status < 300) || (status >= 400 && status < 500)) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const defaultFailCallback = error => {
  console.log("something went wrong", error);
};

/**
 * parsing response json
 * */
const parseJSON = response =>
  response.json().then(data => ({
    data,
    status: response.status
  }));

/**
 * parsing object to query string
 * */
const objectToQueryString = (queryObject: Object): string =>
  Object.keys(queryObject)
    .map(
      (key: string) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(queryObject[key])}`
    )
    .join("&");

/**
 * making api request
 * */
const makeRequest = (
  url,
  method = "GET",
  query = {},
  body = {}
): Promise<*> => {
  const queryString = objectToQueryString(query)
    ? `?${objectToQueryString(query)}`
    : "";
  const fetchUrl = `${BASE_URL}${url}${queryString}`;
  const fetchParams = { method, credentials: "include" };

  if (method === "POST") {
    fetchParams.body = JSON.stringify(body);
    fetchParams.headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
  }

  return fetch(fetchUrl, fetchParams)
    .then(checkStatus)
    .then(parseJSON)
    .catch(error => {
      console.error("request failed - ", error);
    });
};

/**
 * Global request handler methods,
 * @param {Promise} request Promise
 * @param {Object}  callbackMap 'map with status keys and appropriate callback values'
 * @param {Function} failCallBack 'callback for handling request fail status'
 * */
const requestHandler = (
  request,
  callbackMap,
  failCallBack = defaultFailCallback
) => {
  request
    .then(({ data, status }: { data: any, status: number }) => {
      if (status >= 200 && status < 305) {
        callbackMap[STATUS_OK](data);
      } else {
        Object.keys(callbackMap).forEach((item: number) => {
          if (+item === status) {
            callbackMap[item](data);
          }
        });
      }
    })
    .catch(failCallBack);
};

export const fetchUtils = {
  parseJSON,
  objectToQueryString,
  makeRequest,
  requestHandler
};
