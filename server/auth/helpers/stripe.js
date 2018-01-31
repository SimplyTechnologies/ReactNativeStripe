const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const createCustomer = (tokenId, username) => {
  return new Promise((resolve, reject) => {
    stripe.customers.create(
      {
        description: `Customer for ${username}`
      },
      (err, customer) => {
        if (err) reject(err);
        if (customer) resolve(customer);
      }
    );
  });
};
