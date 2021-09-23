const cardsRouter = require('express').Router();

const {
  validateCreateCard,
  validateGetCards,
  validateDeleteCard,
  validateLikeCard,
  validateDislikeCard,
} = require('../middlewares/validations');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', validateGetCards, getCards);
cardsRouter.post('/cards', validateCreateCard, createCard);
cardsRouter.delete('/cards/:cardId', validateDeleteCard, deleteCard);
cardsRouter.put('/cards/:cardId/likes', validateLikeCard, likeCard);
cardsRouter.delete('/cards/:cardId/likes', validateDislikeCard, dislikeCard);

module.exports = cardsRouter;
