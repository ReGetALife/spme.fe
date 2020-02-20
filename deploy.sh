#!/bin/bash

docker -v
docker stop nginx_spme || true
docker rm nginx_spme  || true
docker run -d -p 20201:80 -v ./dist:/usr/share/nginx/html --name nginx_spme nginx