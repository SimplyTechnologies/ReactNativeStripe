import * as stripeHelper from "../helpers/stripe";

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
