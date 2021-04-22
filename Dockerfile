FROM node:lts-alpine as dev
WORKDIR  /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:lts-alpine as prod
WORKDIR /app

COPY --from=dev /app/package*.json /app
COPY --from=dev /app/dist /app/dist
COPY --from=dev /app/migrations /app/migrations

RUN yarn install