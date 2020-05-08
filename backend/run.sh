#!/bin/bash

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

rm -rf data/*
docker-compose build
docker-compose up