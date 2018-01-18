import express from "express";
import glob from "glob";
import path from "path";

const api = express();

const models = glob.sync(path.join(process.cwd(), "/**/*.model.js"));
const routes = glob.sync(path.join(process.cwd(), "/**/*.routes.js"));

models.forEach(model => require(model));
routes.forEach(route => require(route).init(api));

export default api;
