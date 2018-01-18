import express from "express";
import path from "path";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import service from "../service";
import { handleError } from "../middleware/errors";

const app = express();

app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Access-Control-Allow-Methods", "GET, POST");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use("/", service);
app.use(handleError);

export default app;
