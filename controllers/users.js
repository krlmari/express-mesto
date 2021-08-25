const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(404).send({ message: 'Запрашиваемые пользователи не найдены' }));
};

const getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(404).send({ message: 'Запрашиваемый пользователь не найден' }));
};

const createUser = (req, res) => {
  // Получим из объекта запроса имя и описание пользователя
  const { name, about, avatar } = req.body;
  // Создадим документ на основе пришедших данных
  User.create({ name, about, avatar })
    // Вернём записанные в базу данные
    .then((user) => res.send({ data: user }))
    // Данные не записались, вернём ошибку
    .catch(() => res.status(400).send({ message: 'Некорректные данные' }));
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((newUser) => res.send({ data: newUser }))
    .catch(() => res.status(400).send({ message: 'Некорректные данные' }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch(() => res.status(400).send({ message: 'Некорректные данные' }));
};

module.exports = {
  getUsers,
  getUserId,
  createUser,
  updateUser,
  updateAvatar,
};
