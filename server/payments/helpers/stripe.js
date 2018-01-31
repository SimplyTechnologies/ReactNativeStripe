const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const paywithToken = (tokenId, amount) => {
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
};

export const payWithCustomerId = (customerId, amount) => {
  return new Promise((resolve, reject) => {
    stripe.charges.create(
      {
        amount: amount * 100,
        currency: "usd",
        customer: customerId
      },
      (err, charge) => {
        if (err) reject(err);
        if (charge) resolve(charge);
      }
    );
  });
};

export const payWithSourceId = (customerId, sourceId, amount) => {
  return new Promise((resolve, reject) => {
    stripe.charges.create(
      {
        amount: amount * 100,
        currency: "usd",
        customer: customerId,
        source: sourceId
      },
      (err, charge) => {
        if (err) reject(err);
        if (charge) resolve(charge);
      }
    );
  });
};
