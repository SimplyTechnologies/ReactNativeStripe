import { Router } from "express";
import * as paymentsHandler from "./payments.handler";
import { requiresToBeLoggedIn } from "../middleware/auth";

export function init(api) {
  const router = Router();

  router.post("/payWithCard", paymentsHandler.payWithCard);

  router.post("/cards", paymentsHandler.addCard);

  router.get("/cards", requiresToBeLoggedIn, paymentsHandler.getCards);

  router.delete("/cards/:id", requiresToBeLoggedIn, paymentsHandler.deleteCard);

  router.put("/cards/:id", requiresToBeLoggedIn, paymentsHandler.updateCard);

  router.put("/cards/default/:id", paymentsHandler.changeDefaultCard);

  api.use("/payments", router);
}
