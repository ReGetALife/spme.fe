# spme.fe

<p align="left">
<a href ="https://github.com/ReGetALife/spme.fe/blob/master/LICENSE"><img alt="GitHub" src="https://img.shields.io/badge/license-MIT-blue"></a>
<a href="https://travis-ci.com/ReGetALife/spme.fe"><img src="https://travis-ci.com/ReGetALife/spme.fe.svg?branch=master"></a>
<a href="https://docs.docker.com/docker-hub/builds/"><img alt="Docker Cloud Automated build" src="https://img.shields.io/docker/cloud/automated/getalife/spme.fe"></a>
<a href="https://hub.docker.com/r/getalife/spme.fe/builds"><img alt="Docker Cloud Build Status" src="https://img.shields.io/docker/cloud/build/getalife/spme.fe"></a>
<a href="https://hub.docker.com/r/getalife/spme.fe"><img alt="Docker Image Size (tag)" src="https://img.shields.io/docker/image-size/getalife/spme.fe/latest"></a>
</p>

This is the front-end project of a simulation platform of mainframe experiment at Tongji University, which is based on z/OSMF REST APIs .

### Related project

[spme.be](https://github.com/ReGetALife/spme.be)

### Todo List

- [ ] fix UI & logic bugs
- [ ] beautify UI
- [ ] i18n
- [ ] refine experiment doc
- [x] refine project structure
- [x] fix eslint
- [x] change site logo 
- [ ] importing components on demand
- [ ] refine hard coded configuration

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
Target output location will be `dist` folder by default.

### Start server after build
```
npm run start
```
This will start an express app with proxy configured. Or you can deploy static files under `dist` folder with other web server e.g. Nginx.

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Deploy with Docker

Deploy this project to server using Docker image.

```bash
docker run --name spme-fe -d -p 20201:80 getalife/spme.fe:latest
```
