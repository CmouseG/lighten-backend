FROM node:latest

ENV CONTAINER_PATH /usr/lighten_backend/

RUN mkdir -p $CONTAINER_PATH

COPY . $CONTAINER_PATH
WORKDIR $CONTAINER_PATH

RUN npm install

EXPOSE 80

ENTRYPOINT npm start

