const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const payWithCard = (tokenId, amount) => {
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
