import mongoose from "mongoose";
import config from "../config";

export const initMongoose = () => {
  console.log("connecting to db...", config.db);
  mongoose
    .connect(config.db)
    .then((res) => console.log('Connection established'))
    .catch((err) => console.log('Connection failed :('));
};
