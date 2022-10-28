FROM node:alpine

WORKDIR /app

EXPOSE 3000

COPY package*.json ./

COPY yarn.lock ./

RUN  yarn install

COPY . .

CMD ["npm", "start"]