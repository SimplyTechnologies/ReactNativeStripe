// @flow

import Stripe from "tipsi-stripe";
import config from "../../config";
import { ResponseStatuses } from "AppConstants";

const { STATUS_OK, STATUS_402, STATUS_400 } = ResponseStatuses;

const initializeStripe = () => {
  const { STRIPE_PUBLISHABLE_KEY: publishableKey } = config;
  Stripe.init({
    publishableKey
  });
};

export const stripeUtils = {
  initializeStripe
};
