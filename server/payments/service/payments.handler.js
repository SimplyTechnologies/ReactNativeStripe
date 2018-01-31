import * as stripeHelper from "../helpers/stripe";
import {
  PAYMENT_SUCCESS_MESSAGE,
  PAYMENT_TOKEN_REQUIRED,
  PAYMENT_CUSTOMER_ID_REQUIRED,
  PAYMENT_SOURCE_ID_REQUIRED
} from "./payments.constants";

export const payWithToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    res.status(400).json({ message: PAYMENT_TOKEN_REQUIRED });
  } else {
    stripeHelper
      .paywithToken(token, 20)
      .then(charge => {
        res.status(200).json({ message: PAYMENT_SUCCESS_MESSAGE });
      })
      .catch(err => next(err.message));
  }
};

export const payWithSourceId = (req, res) => {
  const { customerId, sourceId } = req.body;

  if (!customerId) {
    res.status(400).json({ message: PAYMENT_CUSTOMER_ID_REQUIRED });
  } else {
    stripeHelper
      .payWithSourceId(customerId, sourceId, 20)
      .then(charge => {
        res.status(200).json({ message: PAYMENT_SUCCESS_MESSAGE });
      })
      .catch(err => next(err.message));
  }
};

export const payWithCustomerId = (req, res) => {
  const { customerId } = req.body;

  if (!customerId) {
    return res.status(400).json({ message: PAYMENT_CUSTOMER_ID_REQUIRED });
  }
  if (!sourceId) {
    return res.status(400).json({ message: PAYMENT_SOURCE_ID_REQUIRED });
  }
  stripeHelper
    .payWithCustomerId(customerId, 20)
    .then(charge => {
      res.status(200).json({ message: PAYMENT_SUCCESS_MESSAGE });
    })
    .catch(err => next(err.message));
};
