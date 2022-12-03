FROM node:alpine

WORKDIR /app

EXPOSE 3000

COPY package*.json ./

COPY yarn.lock ./

RUN  yarn install

COPY . .

RUN npm run build

CMD [ "npx", "serve", "build" ]