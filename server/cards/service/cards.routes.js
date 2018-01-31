import { Router } from "express";
import * as cardsHandler from "./cards.handler";
import { requiresToBeLoggedIn } from "../middleware/auth";

export function init(api) {
  const router = Router();

  router.post("/payWithCard", cardsHandler.payWithCard);

  router.get("/", requiresToBeLoggedIn, cardsHandler.getCards);

  router.post("/", cardsHandler.addCard);

  router.put("/:id", requiresToBeLoggedIn, cardsHandler.updateCard);

  router.put("/default/:id", cardsHandler.changeDefaultCard);

  router.delete("/:id", requiresToBeLoggedIn, cardsHandler.deleteCard);

  api.use("/cards", router);
}
