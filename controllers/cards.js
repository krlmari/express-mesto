const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const IncorrectError = require('../errors/incorrect-err');
const NotOwnerIdError = require('../errors/auth-err');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Запрашиваемые карточки не найдены!');
      }
      res.send({ data: cards });
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(() => {
      throw new NotFoundError('Переданы неккоректные данные карточки.');
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId).then((card) => {
    if (card.owner.equals(req.user._id)) {
      Card.findByIdAndRemove(cardId)
        .then(() => {
          res.status(200).send({ message: 'Карточка удалена' });
        })
        .catch(next);
    } else {
      throw new NotOwnerIdError('Удалять можно только свои карточки!');
    }
  });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Карточка не найдена!');
      }

      res.send(data);
    })
    .catch(() => {
      throw new IncorrectError('Переданы неккоректные данные для добавления лайка.');
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Карточка не найдена!');
      }

      res.send(data);
    })
    .catch(() => {
      throw new IncorrectError('Переданы неккоректные данные для снятия лайка.');
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
