#!/usr/bin/bash


printf "================== Acessando projeto [i-wanna-be-notified-api]  ==================\n\n"
cd ../i-wanna-be-notified-api 

printf "Pausando serviços do docker-compose [mongoDB, rabbitMQ]..."
docker-compose down;

printf "Iniciando serviços do docker-compose [mongoDB, rabbitMQ]..."
docker-compose up -d; sleep 15;

printf "[i-wanna-api] Buildando imagem..."
docker build -t achimid/i-wanna-api .

printf "[i-wanna-api] Executando container..."
docker run -d --rm --net=host -p 9001:9001 --name i-wanna-api --rm achimid/i-wanna-api:latest;



cd ../i-wanna-be-notified-front
docker build -t achimid/i-wanna-front .
docker run -d --rm --net=host -p 9000:9000 --name i-wanna-front --rm achimid/i-wanna-front:latest;

cd ../i-wanna-be-notified-worker
docker build -t achimid/i-wanna-worker .
docker run -d --rm --net=host -p 9002:9002 --name i-wanna-worker-01 --rm achimid/i-wanna-worker:latest;

cd ../i-wanna-be-notified-scheduler
docker build -t achimid/i-wanna-scheduler .
docker run -d --rm --net=host -p 9003:9003 --name i-wanna-scheduler --rm achimid/i-wanna-scheduler:latest;

cd ../i-wanna-be-notified-notify
docker build -t achimid/i-wanna-notify .
docker run -d --rm --net=host -p 9004:9004 --name i-wanna-notify --rm achimid/i-wanna-notify:latest;

cd ../i-wanna-be-notified-log
docker build -t achimid/i-wanna-log .
docker run -d --rm --net=host -p 9005:9005 --name i-wanna-log --rm achimid/i-wanna-log:latest;

cd ../i-wanna-be-notified-catalog
docker build -t achimid/i-wanna-catalog .
docker run -d --rm --net=host -p 9006:9006 --name i-wanna-catalog --rm achimid/i-wanna-catalog:latest;