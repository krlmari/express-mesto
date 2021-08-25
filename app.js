const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use('/', users);

app.listen(PORT, () => {});
