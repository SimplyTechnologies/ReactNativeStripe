// @flow
import { fetchUtils } from "AppUtils";
import { HttpMethods } from "AppConstants";

const EMPTY_OBJECT = {};
const PAYMENT_PROXY_URI = "/payments";
const { makeRequest } = fetchUtils;
const { GET, POST } = HttpMethods;

export const payWithCard = (tokenId: string): Promise<*> =>
  makeRequest(`${PAYMENT_PROXY_URI}/payWithCard`, POST, EMPTY_OBJECT, {
    tokenId
  });
