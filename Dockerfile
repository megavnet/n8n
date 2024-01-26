FROM node:18-alpine AS builder

# TODO: install build-essential python
RUN apk add --no-cache --virtual .build-deps alpine-sdk python3

RUN npm install -g pnpm

RUN wget -O - https://gobinaries.com/tj/node-prune | sh

RUN mkdir /app && chown node:node /app
WORKDIR /app
RUN mkdir -p /home/node/.n8n && chown node:node /home/node/.n8n
COPY . /app

RUN pnpm install
RUN pnpm build
RUN node patched.js

RUN find /app/packages -type f -name "*.ts" -o -name "*.js.map" -o -name "*.vue" | xargs rm -f
RUN node-prune

###########################################################

FROM node:18-alpine

RUN mkdir /app && chown node:node /app

WORKDIR /app
RUN mkdir -p /home/node/.n8n && chown node:node /home/node/.n8n
COPY --chown=node:node --from=builder /app /app

USER node

EXPOSE 5678

CMD ["npm", "start"]
