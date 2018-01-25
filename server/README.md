<h1 align="center">
  <img src="https://user-images.githubusercontent.com/13334788/35271204-c518a926-004a-11e8-82a0-30449e68e503.png"/><br>
</h1>

## React Native + Stripe API

A React Native example payment app based on [Stripe](https://stripe.com/).

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/), [npm](https://www.npmjs.com/) and [Docker](https://www.docker.com/) installed

To run the entire ecosystem run in terminal the following command
```
$ docker-compose up
```

Or you can run each microservice separately

```
// Build and run API_GATEWAY container
$ docker build . -t api_gateway && docker run api_gateway
```
```
// Build and run Auth Microservice container
$ cd ./auth && docker build . -t auth_microservice && docker run auth_microservice
```
```
// Build and run PAYMENT_MICROSERVICE container
$ cd ./payments && docker build . -t payment_microservice && docker run payment_microservice
```




