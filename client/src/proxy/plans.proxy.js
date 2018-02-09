// @flow
import { fetchUtils } from "AppUtils";
import { HttpMethods } from "AppConstants";

const EMPTY_OBJECT = {};
const PLANS_PROXY_URI = "/subscriptions";
const { makeRequest } = fetchUtils;
const { GET, POST, DELETE } = HttpMethods;

type Plan = {};

export const getPlans = () => makeRequest(`${PLANS_PROXY_URI}/plans`);

export const getSubscriptions = () => makeRequest(`${PLANS_PROXY_URI}/`);

export const addSubscription = (plan: string) =>
  makeRequest(`${PLANS_PROXY_URI}/`, POST, EMPTY_OBJECT, { plan });

export const deleteSubscription = (id: string) =>
  makeRequest(`${PLANS_PROXY_URI}/${id}`, DELETE);
