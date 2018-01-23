FROM node:latest

RUN mkdir -p /var/app/api_gateway
ADD api-gateway.js /var/app/api_gateway/api-gateway.js
ADD package.json /var/app/api_gateway/package.json
ADD package-lock.json /var/app/api_gateway/package-lock.json

WORKDIR /var/app/api_gateway

RUN npm i

CMD [ "npm", "start" ]