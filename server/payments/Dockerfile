FROM node:latest

RUN mkdir -p /var/app/payment_microservice
ADD . /var/app/payment_microservice
WORKDIR /var/app/payment_microservice
RUN npm i

CMD [ "npm", "run", "dev" ]