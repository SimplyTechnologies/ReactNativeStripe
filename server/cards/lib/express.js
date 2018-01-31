import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import service from '../service';
import { initAuth } from '../middleware/auth';

const app = express();


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


app
  .use(morgan('dev'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended:  true }))
  .use(bodyParser.text())
  .use(initAuth)
  .use('/', service);

export default app;
