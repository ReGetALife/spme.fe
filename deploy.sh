#!/bin/bash

echo 'docker -v'
docker -v

echo 'docker stop nginx_spme'
docker stop nginx_spme || true

echo 'docker rm nginx_spme'
docker rm nginx_spme  || true

# make sure to export WORKSPACE, e.g.
# export WORKSPACE=/home/user/spme/jenkins_node/workspace/spme_fe
echo 'docker run -d -p 20201:80 -v $WORKSPACE/dist:/usr/share/nginx/html -v $WORKSPACE/nginx.conf:/etc/nginx/nginx.conf --name nginx_spme nginx'
docker run -d -p 20201:80 \
-v $WORKSPACE/dist:/usr/share/nginx/html \
-v $WORKSPACE/nginx.conf:/etc/nginx/nginx.conf \
--name nginx_spme nginx