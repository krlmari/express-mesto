const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getUserId = (req, res) => {
  User.findById(req.params._id)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createUser = (req, res) => {
  // Получим из объекта запроса имя и описание пользователя
  const { name, about, avatar } = req.body;
  // Создадим документ на основе пришедших данных
  User.create({ name, about, avatar })
    // Вернём записанные в базу данные
    .then((user) => res.send({ data: user }))
    // Данные не записались, вернём ошибку
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  getUsers,
  getUserId,
  createUser,
};
