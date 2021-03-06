const app = require("express")();
const rp = require("request-promise");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const PORT = process.env.PORT || 3000;
const endpointsMap = {
  users: process.env.AUTH_MICROSERVICE_URI || "http://localhost:3001",
  cards: process.env.CARDS_MICROSERVICE_URI || "http://localhost:3002",
  payments: process.env.PAYMENTS_MICROSERVICE_URI || "http://localhost:3003",
  subscriptions: process.env.SUBSCRIPTIONS_MICROSERVICE_URI || "http://localhost:3004",
};

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
  .use(morgan("dev"))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.text())
  .use((req, res, next) => {
    const serviceUrl = endpointsMap[req.url.split("/")[1]];
    const Authorization = req.header("Authorization");
    if (serviceUrl) {
      const uri = `${serviceUrl}${req.url}`;
      rp({
        method: req.method,
        uri,
        body: req.body,
        headers: { Authorization },
        json: true,
        resolveWithFullResponse: true
      })
        .then(response => {
          res.status(response.statusCode).json(response.body);
        })
        .catch(err => {
          res.status(err.statusCode).json(err.error);
        });
    } else {
      next();
    }
  });

app.listen(PORT, () => {
  console.log("Api Gateway Started on Port %d", PORT);
});
