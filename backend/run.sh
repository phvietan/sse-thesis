#!/bin/bash

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

rm -rf data/*
docker-compose stop
docker-compose build
docker-compose up -d
# docker-compose exec backend knex --knexfile=./database/knexfile.js migrate:latest