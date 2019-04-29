import http from "http";
import { initMongoose } from "./lib/mongoose";
import app from "./lib/express";

initMongoose();

const PORT = process.env.PORT || 3004;

http.createServer(app).listen(PORT, () => {
  console.log("Subscriptions Service Started on Port %d", PORT);
});
