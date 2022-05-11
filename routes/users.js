const router = require('express').Router();
const {
  findUser, findAllUsers, createUser,
} = require('../controllers/users');

router.get('/:userId', findUser);
router.get('/', findAllUsers);
router.post('/', createUser);

module.exports = router;