FROM node:18.10

# TODO: install build-essential python
RUN apt-get update && apt-get install -y \
		build-essential \
		python \
		&& rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm

RUN mkdir /app && chown node:node /app

WORKDIR /app
RUN mkdir -p /home/node/.n8n && chown node:node /home/node/.n8n
COPY --chown=node:node . /app

USER node

RUN pnpm install
RUN pnpm build

EXPOSE 5678

CMD [ "pnpm", "start" ]
