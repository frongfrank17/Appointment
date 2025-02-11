FROM node:18-alpine

RUN mkdir -p /usr/src/app

COPY / /usr/src/app

WORKDIR /usr/src/app

RUN npm install 

EXPOSE 3002

CMD npm start