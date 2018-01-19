import * as stripeHelper from "../helpers/stripe";

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

export const addCard = (req, res) => {
  // const { username, customerId } = req.user;
  const { username, customerId } = { username: "ani", customerId: "" };
  const { tokenId } = req.body;
  if (!tokenId) {
    return res.status(400).json({ message: "Token is required" });
  }
  console.log(tokenId);
  if (!customerId) {
    stripeHelper
      .createCustomer(tokenId, username)
      .then(customer => {
        console.log(customer);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
