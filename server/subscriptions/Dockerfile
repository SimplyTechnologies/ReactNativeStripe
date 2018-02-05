FROM node:latest

RUN mkdir -p /var/app/subscription_microservice
ADD . /var/app/subscription_microservice
WORKDIR /var/app/subscription_microservice
RUN npm i

CMD [ "npm", "start" ]