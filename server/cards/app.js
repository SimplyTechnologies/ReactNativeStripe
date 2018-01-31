import http from "http";
import { initMongoose } from "./lib/mongoose";
import app from "./lib/express";

initMongoose();

const PORT = process.env.PORT || 3002;

http.createServer(app).listen(PORT, () => {
  console.log("Cards Service Started on Port %d", PORT);
});
