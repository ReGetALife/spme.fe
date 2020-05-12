# spme.fe

This is the front-end project of a simulation platform of mainframe experiment at Tongji University, which is based on z/OSMF REST APIs .

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
