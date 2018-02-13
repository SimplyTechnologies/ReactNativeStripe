import express from "express";

const api = express();

require("./cards.routes").init(api);

export default api;
