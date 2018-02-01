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

const showNotification = (
  context: any,
  messageTitle: string,
  message: string
): any => {
  context.setState({ [messageTitle]: message }, () => {
    setTimeout(() => {
      context.setState({ [messageTitle]: "" });
    }, 3000);
  });
};

const initializeCallbackMaps = (context: any, messageTitle: string): Object => {
  const handleOk = ({ message }: { message: string }): void =>
    showNotification(context, messageTitle, message);
  const handle402 = ({ message }: { message: string }): void =>
    showNotification(context, messageTitle, message);
  const handle400 = ({ message }: { message: string }): void =>
    showNotification(context, messageTitle, message);

  return {
    [STATUS_OK]: handleOk,
    [STATUS_402]: handle402,
    [STATUS_400]: handle400
  };
};

export const stripeUtils = {
  initializeStripe,
  initializeCallbackMaps
};
