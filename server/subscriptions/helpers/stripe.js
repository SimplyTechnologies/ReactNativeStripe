const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const getPlans = () => {
  return new Promise((resolve, reject) => {
    stripe.plans.list({ limit: 3 }, function(err, plans) {
      if (err) reject(err);
      if (plans) resolve(plans);
    });
  });
};

export const getSubscriptions = customerId => {
  return new Promise((resolve, reject) => {
    stripe.subscriptions.list({ limit: 3, customer: customerId }, function(
      err,
      subscriptions
    ) {
      if (err) reject(err);
      if (subscriptions) resolve(subscriptions);
    });
  });
};

export const addSubscription = (customerId, plan) => {
  return new Promise((resolve, reject) => {
    stripe.subscriptions.create(
      {
        customer: customerId,
        items: [
          {
            plan: plan
          }
        ]
      },
      function(err, subscription) {
        if (err) reject(err);
        if (subscription) resolve(subscription);
      }
    );
  });
};

export const cancelSubscription = subscriptionId => {
  return new Promise((resolve, reject) => {
    stripe.subscriptions.del(subscriptionId, function(err, confirmation) {
      if (err) reject(err);
      if (confirmation) resolve(confirmation);
    });
  });
};
