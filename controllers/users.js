const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const IncorrectError = require('../errors/incorrect-err');
const AuthError = require('../errors/auth-err');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError('Запрашиваемые пользователи не найдены.');
      }
      res.send({ data: users });
    })
    .catch(next);
};

const getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден.');
      }
      res.send({ data: user });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }),
    )
    // Вернём записанные в базу данные
    .then((user) => res.send({ data: user }))
    // Данные не записались, вернём ошибку
    .catch(() => {
      throw new IncorrectError('Некорректные данные для создания нового пользователя.');
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((newUser) => res.send({ data: newUser }))
    .catch(() => {
      throw new IncorrectError('Некорректные данные для обновления пользователя.');
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch(() => {
      throw new IncorrectError('Некорректные данные для аватара.');
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      // создание токена
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      throw new AuthError('Некорректные почта и/или пароль.');
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.send(user);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserId,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getUserInfo,
};
