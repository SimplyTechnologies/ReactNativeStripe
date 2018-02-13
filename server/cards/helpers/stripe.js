const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const retrieveCustomer = customerId => {
  return new Promise((resolve, reject) => {
    stripe.customers.retrieve(customerId, (err, customer) => {
      if (err) reject(err);
      if (customer) resolve(customer);
    });
  });
};

export const createCustomerSource = (customerId, tokenId) => {
  return new Promise((resolve, reject) => {
    stripe.customers.createSource(
      customerId,
      { source: tokenId },
      (err, card) => {
        if (err) reject(err);
        if (card) resolve(card);
      }
    );
  });
};

export const deleteCustomerSource = (customerId, cardId) => {
  return new Promise((resolve, reject) => {
    stripe.customers.deleteCard(customerId, cardId, (err, confirmation) => {
      if (err) reject(err);
      if (confirmation) resolve(confirmation);
    });
  });
};
export const updateDefaultSource = (customerId, cardId) => {
  return new Promise((resolve, reject) => {
    stripe.customers.update(
      customerId,
      {
        default_source: cardId
      },
      (err, customer) => {
        if (err) reject(err);
        if (customer) resolve(customer);
      }
    );
  });
};
