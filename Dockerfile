FROM node:18-alpine

# TODO: install build-essential python
RUN apk add --no-cache --virtual .build-deps alpine-sdk python3

RUN npm install -g pnpm

RUN mkdir /app && chown node:node /app

WORKDIR /app
RUN mkdir -p /home/node/.n8n && chown node:node /home/node/.n8n
COPY --chown=node:node . /app

USER node

RUN pnpm install
RUN pnpm build

RUN node patched.js

EXPOSE 5678

CMD [ "pnpm", "start" ]
