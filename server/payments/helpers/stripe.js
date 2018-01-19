const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export payWithCard(tokenId, amount) => {
  return new Promise((resolve, reject) => {
    stripe.charges.create(
      {
        amount: amount * 100,
        currency: "usd",
        source: tokenId
      },
      (err, charge) => {
        if (err) reject(err);
        if (charge) resolve(charge);
      }
    );
  });
}

export createCustomer => (tokenId, username) {
  return new Promise((resolve, reject) => {
    stripe.customers.create(
      {
        description: `Customer for ${username}`,
        source: tokenId // obtained with Stripe.js
      },
      (err, customer) => {
        if (err) reject(err);
        if (customer) resolve(customer);
      }
    );
  });
}

export retrieveCustomer(customerId) => {
  return new Promise((resolve, reject) => {
    stripe.customers.retrieve(customerId, (err, customer) => {
      if (err) reject(err);
      if (customer) resolve(customer);
    });
  });
}

export createCustomerSource(customerId, tokenId) => {
  return new Promise((resolve, reject) => {
    tripe.customers.createSource(
      customerId,
      { source: tokenId },
      (err, card) => {
        if (err) reject(err);
        if (card) resolve(card);
      }
    );
  });
}

export deleteCustomerSource(customerId, cardId) => {
    return new Promise((resolve, reject) => {
        stripe.customers.deleteCard(
            customerId,
            cardId,
            (err, confirmation) => {
                if (err) reject(err);
                if (card) resolve(confirmation);
            }
          );
    });
}
export updateDefaultSource(ustomerId, cardId) => {
    return new Promise((resolve, reject) => {
        stripe.customers.update(customerId, {
            default_source: cardId
          }, function(err, customer) {
            if (err) reject(err);
            if (card) resolve(customer);
          });
    });
}