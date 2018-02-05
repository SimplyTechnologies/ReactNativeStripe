import * as stripeHelper from "../helpers/stripe";
import {
  SUBSCRIPTION_CUSTOMER_ID_REQUIRED,
  SUBSCRIPTION_PLAN_REQUIRED,
  SUBSCRIPTION_ID_REQUIRED
} from "./subscriptions.constants";

export const getPlans = (req, res, next) => {
  stripeHelper
    .getPlans()
    .then(response => {
      return res.json(response.data);
    })
    .catch(err => next(err));
};

export const getSubscriptions = (req, res, next) => {
  const { customerId } = req.user;
  if (!customerId) {
    return res.status(400).json({ message: SUBSCRIPTION_CUSTOMER_ID_REQUIRED });
  }
  stripeHelper
    .getSubscriptions(customerId)
    .then(subscriptions => {
      return res.json(subscriptions.data);
    })
    .catch(err => next(err));
};

export const addSubscription = (req, res, next) => {
  const { customerId } = req.user;
  if (!customerId) {
    return res.status(400).json({ message: SUBSCRIPTION_CUSTOMER_ID_REQUIRED });
  }
  const { plan } = req.body;
  if (!plan) {
    return res.status(400).json({ message: SUBSCRIPTION_PLAN_REQUIRED });
  }
  stripeHelper
    .addSubscription(customerId, plan)
    .then(subscription => {
      return res.json(subscription);
    })
    .catch(err => next(err));
};

export const cancelSubscription = (req, res, next) => {
  const { customerId } = req.user;
  if (!customerId) {
    return res.status(400).json({ message: SUBSCRIPTION_CUSTOMER_ID_REQUIRED });
  }
  const { subscriptionId } = req.params;
  if (!subscriptionId) {
    return res.status(400).json({ message: SUBSCRIPTION_ID_REQUIRED });
  }
  stripeHelper
    .cancelSubscription(subscriptionId)
    .then(confirmation => {
      return res.json(confirmation);
    })
    .catch(err => next(err));
};
