const User = require('../models/user');

const findUser = (req, res) => {
    User.findById(req.params.userId)
      .then((user) => res.status(200).send({ data: user }))
      .catch(() => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const findAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: `Произошла ошибка ${error}` }));
};

module.exports = {
  findUser, findAllUsers, createUser,
};