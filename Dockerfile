FROM node:16.14.0-alpine
USER root

WORKDIR /client
COPY . /client

RUN npm install
COPY . ./

RUN npm run build
