// @flow

import Stripe from "tipsi-stripe";
import { ResponseStatuses } from "AppConstants";
import config from "../../config";

const { STATUS_OK, STATUS_402, STATUS_400 } = ResponseStatuses;

const initializeStripe = () => {
  const { STRIPE_PUBLISHABLE_KEY: publishableKey } = config;
  Stripe.setOptions({
    publishableKey
  });
};

export const stripeUtils = {
  initializeStripe
};
