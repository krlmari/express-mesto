const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/users');
const cards = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use('/', users);

app.use((req, res, next) => {
  req.user = {
    _id: '612651f570474ac41e45573e',
  };

  next();
});

app.use('/', cards);

app.listen(PORT, () => {});
