import * as stripeHelper from "../helpers/stripe";
const rp = require("request-promise");

export const payWithCard = (req, res) => {
  const { tokenId } = req.body;

  if (!tokenId) {
    res.status(400).json({ msg: "Token is required" });
  } else {
    stripeHelper
      .payWithCard(tokenId, 20)
      .then(charge => {
        res.status(200).json({ msg: "The amount is paid successfully" });
      })
      .catch(err => {
        res.status(500).send(err.message);
      });
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
    customerId: "",
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
        customerId: card.customer,
        brand: card.brand,
        exp_year: card.exp_year,
        last4: card.last4
      });
    })
    .catch(err => {
      next(err.message);
    });
};
