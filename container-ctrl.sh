#!/bin/sh
echo "=> Running Docker"
docker run -it --name node -v /path/to/app:/app -P bitnami/node node index.js
