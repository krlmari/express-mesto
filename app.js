const express = require('express');
const mongoose = require('mongoose');

const { errors } = require('celebrate');

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

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/', users);
app.use('/', cards);

app.use(errors);
app.use(errorMain);

app.listen(PORT, () => {});
