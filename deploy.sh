#!/bin/bash

REPO_HASH=$(git rev-parse HEAD)
REPO_SHORT=${REPO_HASH:0:7}
IMG_NAME=mob-api
IMG_VERSION=$IMG_NAME-$REPO_SHORT

docker ps -a | grep $IMG_NAME | awk '{print $1}' | xargs docker rm -f
> /dev/null 2>&1

docker run  \
  --name $IMG_VERSION \
  --restart=always \
  -v `pwd`:/usr/src/app \
  -w /usr/src/app \
  -e PORT='8000' \
  -p 4002:8000 \
  -d \
  node@argon \
  node server.js
