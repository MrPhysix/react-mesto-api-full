// const { app } = require('../app');
//
// const allowedCors = [
//   'https://api.mrphysix.yandex.nomoreparties.sbs',
//   'http://api.mrphysix.yandex.nomoreparties.sbs',
//   'localhost:3000',
// ];
//
// app.use((req, res, next) => {
//   const { origin } = req.headers;
//   // проверяем, что источник запроса есть среди разрешённых
//   const { method } = req;
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
//   const requestHeaders = req.headers['access-control-request-headers'];
//
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }
//   if (method === 'OPTION') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//   }
//
//   if (method === 'OPTION') {
//     // разрешаем кросс-доменные запросы с этими заголовками
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     res.end();
//   }
//
//   next();
// });
