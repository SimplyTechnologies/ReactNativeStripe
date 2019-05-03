// @flow
import { Platform, AsyncStorage } from "react-native";
import { ResponseStatuses } from "AppConstants";
import config from "../../config";

const { OS } = Platform;
const { IP_ADDRESS } = config;
const BASE_URL =
  OS === "ios" ? "http://localhost:3000" : `http://${IP_ADDRESS}:3000`;

const { STATUS_OK } = ResponseStatuses;

/**
 * api fetching helper functions
 * */

/**
 * Checking response status
 * */

const checkStatus = (response: any): any => {
  const { status }: { status: number } = response;
  if (status >= 200 && status < 305) {
    return response;
  }

  const error = new Error(response.status);
  error.response = response;
  throw error;
};

const defaultFailCallback = (error: any) => {
  console.log("something went wrong", error);
};

/**
 * parsing response json
 * */
const parseJSON = (response: any): Promise<*> =>
  response.json().then(
  (data: any): { data: any, status: number } => ({
    data,
    status: response.status
  })
);

/**
 * parsing object to query string
 * */
const objectToQueryString = (queryObject: Object): string =>
  Object.keys(queryObject)
  .map(
    (key: string): string =>
        `${encodeURIComponent(key)}=${encodeURIComponent(queryObject[key])}`
  )
  .join("&");

/**
 * making api request
 * */

type FetchParams = {
  method: string,
  credentials: string,
  headers?: Object,
  body?: string
};

const fetchRequest = (
  url: string,
  method: string,
  query: Object,
  body: Object,
  token: string | null
): Promise<*> => {
  const queryString = objectToQueryString(query)
    ? `?${objectToQueryString(query)}`
    : "";
  const fetchUrl = `${BASE_URL}${url}${queryString}`;
  const fetchParams: FetchParams = { method, credentials: "include" };
  const authToken = token || "";
  fetchParams.headers = {
    Authorization: `Bearer ${authToken}`
  };
  if (method === "POST") {
    fetchParams.body = JSON.stringify(body);
    fetchParams.headers = {
      ...fetchParams.headers,
      "Content-Type": "application/json",
      Accept: "application/json"
    };
  }
  return fetch(fetchUrl, fetchParams);
};

const makeRequest = (
  url: string,
  method: string = "GET",
  query: Object = {},
  body: Object = {}
): Promise<*> =>
  AsyncStorage.getItem("token")
  .then(fetchRequest.bind(null, url, method, query, body))
  .then(parseJSON)
  .then(checkStatus);
/**
 * Global request handler methods,
 * @param {Promise} request Promise
 * @param {Object}  callbackMap 'map with status keys and appropriate callback values'
 * @param {Function} failCallBack 'callback for handling request fail status'
 * */
const requestHandler = (request: Request, callbackMap: any) => {
  request
    .then(({ data }: { data: any }) => {
      callbackMap[STATUS_OK](data);
    })
    .catch(({ response: { data, status } }: any) => {
      let failCallBack = defaultFailCallback;
      Object.keys(callbackMap).some(
        (item: number): any => {
          if (+item === status) {
            failCallBack = callbackMap[item];
            return true;
          }
        }
      );
      failCallBack(data);
    });
};

export const fetchUtils = {
  parseJSON,
  objectToQueryString,
  makeRequest,
  requestHandler
};
