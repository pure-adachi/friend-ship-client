FROM node:16.9.1-alpine

RUN mkdir -p /myapp/client

WORKDIR /myapp/client

COPY . /myapp/client
