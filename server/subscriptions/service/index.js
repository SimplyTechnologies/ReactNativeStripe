import express from "express";

const api = express();

require("./subscriptions.routes").init(api);

export default api;
