#!/usr/bin/bash

cd ../i-wanna-be-notified-api
docker-compose up -d; sleep 15;
npm start &

cd ../i-wanna-be-notified-front
npm start &

cd ../i-wanna-be-notified-worker
npm start &

cd ../i-wanna-be-notified-scheduler
npm start &

cd ../i-wanna-be-notified-notify
npm start &

cd ../i-wanna-be-notified-log
npm start &

cd ../i-wanna-be-notified-catalog
npm start &