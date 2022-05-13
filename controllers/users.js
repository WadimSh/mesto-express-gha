const User = require('../models/user');

const findUser = (req, res) => {
    User.findById(req.params.userId)
      .then((user) => res.send({ data: user }))
      .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const findAllUsers = (_, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.send({ data: user}))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }))
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }))
}

module.exports = {
  findUser, findAllUsers, createUser, updateUser, updateAvatar
};