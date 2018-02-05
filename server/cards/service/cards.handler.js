import * as stripeHelper from "../helpers/stripe";
import { saveCustomer } from "../helpers/proxy";
import {
  TOKEN_IS_REQUIRED_MESSAGE,
  CUSTOMER_DOES_NOT_EXIST
} from "./cards.constants";

export const addCard = (req, res, next) => {
  const { customerId } = req.user;
  if (!customerId) {
    return res.status(400).json({ message: CUSTOMER_DOES_NOT_EXIST });
  }
  const { tokenId } = req.body;
  if (!tokenId) {
    return res.status(400).json({ message: TOKEN_IS_REQUIRED_MESSAGE });
  }
  stripeHelper
    .createCustomerSource(customerId, tokenId)
    .then(card => {
      return res.json({
        id: card.id,
        customerId: card.customer,
        brand: card.brand,
        exp_year: card.exp_year,
        last4: card.last4
      });
    })
    .catch(err => next(err));
};

export const getCards = (req, res, next) => {
  const { _id, customerId } = req.user;
  if (!customerId) {
    return res.status(400).json({ message: CUSTOMER_DOES_NOT_EXIST });
  }
  stripeHelper
    .retrieveCustomer(customerId)
    .then(customer => {
      const data = customer.sources.data.map(source => {
        return {
          id: source.id,
          isDefaultSource: source.id === customer.default_source,
          brand: source.brand,
          exp_month: source.exp_month,
          exp_year: source.exp_year,
          last4: source.last4
        };
      });
      return res.json(data);
    })
    .catch(err => next(err));
};

export const deleteCard = (req, res, next) => {
  const { customerId } = req.user;
  if (!customerId) {
    return res.status(400).json({ message: CUSTOMER_DOES_NOT_EXIST });
  }
  const { id } = req.params;
  const deleteCardPromise = stripeHelper.deleteCustomerSource(customerId, id);
  const retrieveCustomerPromise = deleteCardPromise.then(() =>
    stripeHelper.retrieveCustomer(customerId)
  );
  Promise.all([deleteCardPromise, retrieveCustomerPromise])
    .then(data => {
      return res.json({
        deletedCardId: data[0].id,
        defaultSource: data[1].default_source
      });
    })
    .catch(err => next(err));
};

export const updateCard = (req, res, next) => {
  const { customerId } = req.user;
  if (!customerId) {
    return res.status(400).json({ message: CUSTOMER_DOES_NOT_EXIST });
  }
  const { id } = req.params;
  const { tokenId } = req.body;
  if (!tokenId) {
    res.status(400).json({ message: TOKEN_IS_REQUIRED_MESSAGE });
  }
  const deleteCardPromise = stripeHelper.deleteCustomerSource(customerId, id);
  const retrieveCustomerPromise = deleteCardPromise.then(() =>
    stripeHelper.retrieveCustomer(customerId)
  );
  const createCardPromise = stripeHelper.createCustomerSource(
    customerId,
    tokenId
  );
  Promise.all([deleteCardPromise, retrieveCustomerPromise, createCardPromise])
    .then(data => {
      res.json([
        data[0],
        {
          default_source: data[1].default_source
        },
        {
          id: data[2].id,
          last4: data[2].last4,
          exp_month: data[2].exp_month,
          exp_year: data[2].exp_year,
          brand: data[2].brand
        }
      ]);
    })
    .catch(err => next(err));
};

export const changeDefaultCard = (req, res, next) => {
  const { customerId } = req.user;
  if (!customerId) {
    return res.status(400).json({ message: CUSTOMER_DOES_NOT_EXIST });
  }
  const { id } = req.params;
  stripeHelper
    .updateDefaultSource(customerId, id)
    .then(customer => {
      return res.json({ default_source: customer.default_source });
    })
    .catch(err => next(err));
};
