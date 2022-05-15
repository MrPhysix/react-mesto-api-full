const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {
  errors,
  celebrate, Joi,
} = require('celebrate');
const NotFoundError = require('./errors/NotFoundError');

const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { URL_REGEX } = require('./utils/regEx');

const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
console.log(process.env)
const app = express();

app.use(bodyParser.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri().regex(URL_REGEX),
  }),
}), createUser);

app.use(cookieParser());
app.use(auth);

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use(errorLogger);
app.use(errors());

app.use((req, res, next) => {
  next(new NotFoundError(`Путь ${req.method} запроса ${req.path} не найден `));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? `Произошла ошибка сервера — ${err}`
      : message,
  });
  next();
});

(async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb');
    console.log(`Connected to Mongo! Database name: ${mongoose.connections[0].name}`);

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}());
