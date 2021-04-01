#!/bin/sh
echo "=> Running Docker"
docker run -it --name node -v ${pwd}/app:/app -P bitnami/node node index.js
