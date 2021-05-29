#!/bin/bash

docker build . -t video-service
docker run -d -p 3000:3000 -it $(docker images -q video-service:latest)
