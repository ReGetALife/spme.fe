#!/bin/bash -v

docker -v

docker stop nginx_spme || true

docker rm nginx_spme  || true

# make sure to export WORKSPACE, e.g.
# export WORKSPACE=/home/user/spme/jenkins_node/workspace/spme_fe

docker run -d -p 20201:80 \
-v $WORKSPACE/dist:/usr/share/nginx/html \
-v $WORKSPACE/nginx.conf:/etc/nginx/nginx.conf \
--name nginx_spme nginx