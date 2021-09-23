const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().min(2).max(200).required(),
    })
    .unknown(),
});

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Поле "avatar" должно быть валидным url-адресом');
      })
      .messages({
        'any.required': 'Поле "avatar" должно быть заполнено',
      }),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().min(2).max(200).required(),
    })
    .unknown(),
});

const validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().required(),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().min(2).max(200).required(),
    })
    .unknown(),
});

const validateGetUsers = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().min(2).max(200).required(),
    })
    .unknown(),
});

const validateGetUserInfo = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().min(2).max(200).required(),
    })
    .unknown(),
});

const validateGetCards = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().min(2).max(200).required(),
    })
    .unknown(),
});

const validateGetUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().min(2).max(200).required(),
    })
    .unknown(),
});

const validateDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().min(2).max(200).required(),
    })
    .unknown(),
});

const validateLikeCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().min(2).max(200).required(),
    })
    .unknown(),
});

const validateDislikeCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().min(2).max(200).required(),
    })
    .unknown(),
});

module.exports = {
  validateCreateUser,
  validateUpdateUser,
  validateAuth,
  validateCreateCard,
  validateUpdateAvatar,
  validateGetUsers,
  validateGetUserInfo,
  validateGetCards,
  validateGetUserId,
  validateDeleteCard,
  validateLikeCard,
  validateDislikeCard,
};
