#!/bin/bash

docker stop $(docker ps -q)

docker-compose up -d
#docker-compose build client server
#docker run -d --network host video-service-free_client
#docker run -d --network host video-service-free_server
