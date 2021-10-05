const express = require('express');
const mongoose = require('mongoose');

const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const auth = require('./middlewares/auth');

const errorMain = require('./middlewares/errors');

const users = require('./routes/users');
const cards = require('./routes/cards');

const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

// Подключаем логгер запросов
app.use(requestLogger);

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/', users);
app.use('/', cards);

// Подключаем логгер ошибок
app.use(errorLogger);

app.use(errors);
app.use(errorMain);

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
    return;
  }
  res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
  next();
});

app.listen(PORT, () => {});
