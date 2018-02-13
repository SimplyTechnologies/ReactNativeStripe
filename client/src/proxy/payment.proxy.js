// @flow
import { fetchUtils } from "AppUtils";
import { HttpMethods } from "AppConstants";

const EMPTY_OBJECT = {};
const PAYMENT_PROXY_URI = "/payments";
const { makeRequest } = fetchUtils;
const { POST } = HttpMethods;

export const payWithToken = (token: string): Promise<*> =>
  makeRequest(`${PAYMENT_PROXY_URI}/payWithToken`, POST, EMPTY_OBJECT, {
    token
  });

export const payWithCard = (sourceId: string): Promise<*> =>
  makeRequest(`${PAYMENT_PROXY_URI}/payWithCard`, POST, EMPTY_OBJECT, {
    sourceId
  });

export const payWithDefaultCard = (): Promise<*> =>
  makeRequest(`${PAYMENT_PROXY_URI}/payWithDefaultCard`, POST);
