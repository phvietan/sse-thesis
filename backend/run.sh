#!/bin/bash

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

if [ ! -d "upload" ]; then
  mkdir upload
fi

rm -rf data/*
rm -rf upload/*
docker-compose stop
docker-compose build
docker-compose up -d 
docker-compose exec backend knex --knexfile=./database/knexfile.js migrate:latest

