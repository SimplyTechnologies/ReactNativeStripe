import { Router } from "express";
import * as paymentsHandler from "./payments.handler";

export function init(api) {
  const router = Router();

  router.post("/pay-with-card", paymentsHandler.payWithCard);

  router.post("/cards", paymentsHandler.addCard);

  router.get("/cards", paymentsHandler.getCards);

  router.delete("/cards/:id", paymentsHandler.deleteCard);

  router.put("/cards/:id", paymentsHandler.updateCard);

  router.put("/cards/default/:id", paymentsHandler.changeDefaultCard);

  api.use("/payments", router);
}
