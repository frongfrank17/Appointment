
FROM node:18-alpine

RUN mkdir -p /usr/src/app

COPY / /usr/src/app

WORKDIR /usr/src/app
RUN apk add --no-cache python3 make g++
RUN npm install 

EXPOSE 3001

CMD npm start