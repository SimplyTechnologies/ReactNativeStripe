import * as stripeHelper from "../helpers/stripe";
const rp = require("request-promise");

export const payWithCard = (req, res) => {
  const { tokenId } = req.body;

  if (!tokenId) {
    res.status(400).json({ message: "Token is required" });
  } else {
    stripeHelper
      .payWithCard(tokenId, 20)
      .then(charge => {
        res.status(200).json({ message: "The amount is paid successfully" });
      })
      .catch(err => next(err.message));
  }
};

const saveCustomer = (userId, customer) => {
  return rp({
    url: `http://localhost:3001/users/${userId}`,
    method: "POST",
    body: { customerId: customer.id },
    json: true // Automatically stringifies the body to JSON
  });
};

export const addCard = (req, res, next) => {
  req.user = {
    username: "ani",
    customerId: "cus_CBQtywlg6bNV7C",
    _id: "5a65a824e762c8e0226b5a3a"
  };
  const { username, customerId, _id } = req.user;
  const { tokenId } = req.body;
  if (!tokenId) {
    return res.status(400).json({ message: "Token is required" });
  }
  let addCardPromise;
  if (!customerId) {
    const createCustomerPromise = stripeHelper.createCustomer(
      tokenId,
      username
    );
    const saveCustomerPromise = createCustomerPromise.then(
      saveCustomer.bind(null, _id)
    );
    addCardPromise = Promise.all([
      createCustomerPromise,
      saveCustomerPromise
    ]).then(data => data[0].sources.data[0]);
  } else {
    addCardPromise = stripeHelper.createCustomerSource(customerId, tokenId);
  }
  addCardPromise
    .then(card => {
      return res.json({
        id: card.id,
        customerId: card.customer,
        brand: card.brand,
        exp_year: card.exp_year,
        last4: card.last4
      });
    })
    .catch(err => next(err.message));
};

export const getCards = (req, res, next) => {
  req.user = { customerId: "cus_CBQA3C94QhymgL" };
  const { customerId } = req.user;
  if (!customerId) {
    return res.status(400).json({ message: "Customer does not exist" });
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
    .catch(err => next(err.message));
};

export const deleteCard = (req, res, next) => {
  req.user = { customerId: "cus_CBQA3C94QhymgL" };
  const { customerId } = req.user;
  if (!customerId) {
    return res.status(400).json({ message: "Customer does not exist" });
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
        defaultSource: data[1].default_source,
        
      })
    })
    .catch(err => next(err.message));
};

export const updateCard = (req, res, next) => {
  req.user = { customerId: "cus_CBQtywlg6bNV7C" };
  const { customerId } = req.user;
  if (!customerId) {
    return res.status(400).json({ message: "Customer does not exist" });
  }
  const { id } = req.params;
  const { tokenId } = req.body;
  if (!tokenId) {
    res.status(400).json({ message: "Token is required" });
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
    .catch(err => next(err.message));
};

export const changeDefaultCard = (req, res, next) => {
  req.user = { customerId: "cus_CBQpcvg36VnXh1" };
  const { customerId } = req.user;
  if (!customerId) {
    return res.status(400).json({ message: "Customer does not exist" });
  }
  const { id } = req.params;
  stripeHelper
    .updateDefaultSource(customerId, id)
    .then(customer => {
      return res.json({ default_source: customer.default_source });
    })
    .catch(err => next(err.message));
};
