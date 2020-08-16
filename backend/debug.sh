#!/bin/bash

container=$(docker ps -aqf "name=backend_backend")
docker logs $container -f