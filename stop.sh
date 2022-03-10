#!/usr/bin/bash



printf "Matando processos node"
printf ""
sudo killall -s KILL node;


printf "Pausando serviços do docker-compose [mongoDB, rabbitMQ]"
printf ""
cd ../i-wanna-be-notified-api;
docker-compose down;