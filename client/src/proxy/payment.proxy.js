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

export const payWithCard = (customerId: string, sourceId: string): Promise<*> =>
  makeRequest(`${PAYMENT_PROXY_URI}/payWithCard`, POST, EMPTY_OBJECT, {
    customerId,
    sourceId
  });

export const payWithDefaultCard = (customerId: string): Promise<*> =>
  makeRequest(`${PAYMENT_PROXY_URI}/payWithDefaultCard`, POST, EMPTY_OBJECT, {
    customerId
  });
