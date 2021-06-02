FROM node:alpine

WORKDIR /app

## package.json is separated from full copy
## so on rebuilds where package.json has not been updated
## both copy and run npm install will pull from cache instead
COPY package.json .
RUN npm install

## Real .env is ignored, .env.docker is used instead
COPY .env.docker .env
COPY . .

CMD ["npm", "run", "dev"]