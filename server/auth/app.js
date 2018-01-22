import http from "http";
import fs from "fs";
import app from "./lib/express";
import { initMongoose } from "./lib/mongoose";
initMongoose();

// Setting up the server
const PORT = process.env.port || 3001;

http.createServer(app).listen(PORT, () => {
  console.log("Users Service Started on Port %d", PORT);
});
