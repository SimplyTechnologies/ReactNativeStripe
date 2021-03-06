import http from "http";
import { initMongoose } from "./lib/mongoose";
import app from "./lib/express";

initMongoose();

const PORT = process.env.PORT || 3003;

http.createServer(app).listen(PORT, () => {
  console.log("Payments Service Started on Port %d", PORT);
});
