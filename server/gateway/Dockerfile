FROM node:latest

RUN mkdir -p /var/app/api_gateway
ADD . /var/app/api_gateway

WORKDIR /var/app/api_gateway

RUN npm i

CMD [ "npm", "run", "dev" ]
