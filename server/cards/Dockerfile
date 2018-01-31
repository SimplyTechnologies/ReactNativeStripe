FROM node:latest

RUN mkdir -p /var/app/card_microservice
ADD . /var/app/card_microservice
WORKDIR /var/app/card_microservice
RUN npm i

CMD [ "npm", "start" ]