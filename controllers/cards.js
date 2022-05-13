const Card = require('../models/card');

const findAllCards = (_, res) => {
  Card.find({})
    .populate('owner')
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const deleteCard = (req, res) => {
    Card.findOneAndRemove(req.params.cardId)
      .then((card) => res.send({ data: card }))
      .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
  { $addToSet: { likes: req.user._id } }, 
  { new: true },
  )
  .then((card) => res.send({ data: card }))
  .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then((card) => res.send({ data: card }))
  .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports = {
    findAllCards, deleteCard, createCard, likeCard, dislikeCard
};
