# dockerfile nodejs
FROM bitnami/node:12.18.4

COPY . /app
WORKDIR /app

ENV NODE_PATH /app/node_modules
RUN yarn install --modules-folder $NODE_PATH

ENTRYPOINT ["/app/entrypoint.sh"]

