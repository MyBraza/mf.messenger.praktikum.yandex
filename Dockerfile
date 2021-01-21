FROM node:13

WORKDIR /app

ENV PORT=3000

COPY package.json /app/package.json

RUN npm install

COPY . /app

CMD npm start