const usersRouter = require('express').Router();
const {
  getUsers,
  getUserId,
  createUser,
  updateUser,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:userId', getUserId);
usersRouter.get('/users/me', getUserInfo);
usersRouter.post('/users', createUser);
usersRouter.patch('/users/me', updateUser);
usersRouter.patch('/users/me/avatar', updateAvatar);

module.exports = usersRouter;
