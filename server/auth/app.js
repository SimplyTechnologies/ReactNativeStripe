import https from "https";
import fs from "fs";
import app from "./lib/express";
import { initMongoose } from "./lib/mongoose";

initMongoose();

// Setting up the server
const port = process.env.port || 4000;
const keyFilePath = process.argv[2];
const certFilePath = process.argv[3];

https
  .createServer(
    {
      key: fs.readFileSync(keyFilePath),
      cert: fs.readFileSync(certFilePath)
    },
    app
  )
  .listen(port, () => console.log(`Server running on port ${port}`));
