const app = require("express")();
const rp = require("request-promise");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const PORT = process.env.PORT || 3000;
const endpointsMap = {
  users: process.env.AUTH_MICROSERVICE_URI || 'http://localhost:3001',
  payments: process.env.PAYMENTS_MICROSERVICE || 'http://localhost:3002',
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

    if (serviceUrl) {
      const uri = `${serviceUrl}${req.url}`;
      rp({
        method: req.method,
        uri,
        body: req.body,
        json: true
      })
        .then(parsedBody => {
          res.json(parsedBody);
        })
        .catch(err => {
          res.status(404).json(err.error);
        });
    } else {
      next();
    }
  });

app.listen(PORT, () => {
  console.log("Api Gateway Started on Port %d", PORT);
});
