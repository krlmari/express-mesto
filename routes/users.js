const usersRouter = require('express').Router();
const {
  getUsers,
  getUserId,
  createUser,
  updateUser,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');

const {
  validateAuth,
  validateUpdateUser,
  validateUpdateAvatar,
  validateGetUsers,
  validateGetUserInfo,
  validateGetUserId,
} = require('../middlewares/validations');

usersRouter.get('/users', validateGetUsers, getUsers);
usersRouter.get('/users/:userId', validateGetUserId, getUserId);
usersRouter.get('/users/me', validateGetUserInfo, getUserInfo);
usersRouter.post('/users', validateAuth, createUser);
usersRouter.patch('/users/me', validateUpdateUser, updateUser);
usersRouter.patch('/users/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = usersRouter;
