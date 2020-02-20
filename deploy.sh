#!/bin/bash

echo 'docker -v'
docker -v

echo 'docker stop nginx_spme'
docker stop nginx_spme || true

echo 'docker rm nginx_spme'
docker rm nginx_spme  || true

echo 'docker run -d -p 20201:80 -v $WORKSPACE/dist:/usr/share/nginx/html --name nginx_spme nginx'
docker run -d -p 20201:80 -v $WORKSPACE/dist:/usr/share/nginx/html --name nginx_spme nginx