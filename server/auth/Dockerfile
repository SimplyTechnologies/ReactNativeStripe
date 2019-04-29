FROM node:latest

RUN mkdir -p /var/app/auth_microservice
ADD . /var/app/auth_microservice
WORKDIR /var/app/auth_microservice
RUN npm i

CMD [ "npm", "run", "dev" ]