const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  findAuthorizationUser,
  findUser,
  findAllUsers,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/me', findAuthorizationUser);
router.get('/:userId', findUser);
router.get('/', findAllUsers);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/),
  }),
}), updateAvatar);

module.exports = router;
