import http from "http";
import { init } from "./lib/mongoose";
import app from "./lib/express";

init();

const PORT = process.env.port || 3002;

http.createServer(app).listen(PORT, () => {
  console.log("Payments Service Started on Port %d", PORT);
});
