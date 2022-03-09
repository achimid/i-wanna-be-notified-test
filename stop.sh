#!/usr/bin/bash



printf "Pausando Apps do docker"
docker stop i-wanna-scheduler
docker stop i-wanna-api
docker stop i-wanna-worker
docker stop i-wanna-log
docker stop i-wanna-notify
docker stop i-wanna-catalog


printf "Pausando serviços do docker-compose [mongoDB, rabbitMQ]"
cd ../i-wanna-be-notified-api;
docker-compose down;