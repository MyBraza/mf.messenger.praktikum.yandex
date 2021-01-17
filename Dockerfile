FROM node:13

WORKDIR /app

ENV PORT 80

COPY package.json /app/package.json

RUN npm install

COPY . /app

CMD npm start