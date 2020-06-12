# build for production
FROM node:10.21.0 as build

COPY . /spme
WORKDIR /spme
RUN npm install && npm run build

# build docker image
# serving at port 80 by default
FROM nginx
COPY --from=build /spme/dist /usr/share/nginx/html
COPY --from=build /spme/nginx.conf /etc/nginx/nginx.conf