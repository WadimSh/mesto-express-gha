const router = require('express').Router();
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
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
