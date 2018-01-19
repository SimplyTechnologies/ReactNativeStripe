import { fetchUtils } from "AppUtils";
import { HttpMethods } from "AppConstants";

const EMPTY_OBJECT = {};
const PAYMENT_PROXY_URI = "/card";
const { makeRequest } = fetchUtils;
const { GET, POST } = HttpMethods;

const payWithCard = tokenId => makeRequest("/pay", POST, EMPTY_OBJECT, { tokenId });

export const paymentProxy = {
  payWithCard
};
