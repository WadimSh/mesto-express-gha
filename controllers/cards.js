const Card = require('../models/card');

const findAllCards = (_, res) => {
  Card.find({})
    .populate('owner')
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: `Ошибка по умолчанию.` }));
};

const deleteCard = (req, res) => {
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => {
        if(!card) {
          res.status(404).send({ message: `Карточка с указанным _id не найден.` });
          return;
        } 
        res.send({ data: card })
      })
      .catch(() => {
        if (err.name === 'CastError') {
          res.status(400).send({ message: 'Невалидный id.' });
          return;
        }
        res.status(500).send({ message: `Ошибка по умолчанию.` })
      });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        res.status(400).send({ message: `Переданы некорректные данные при создании карточки.` });
        return;
      }
      res.status(500).send({ message: `Ошибка по умолчанию.` })
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
  { $addToSet: { likes: req.user._id } }, 
  { new: true },
  )
  .then((card) => {
    if(!card) {
      res.status(404).send({ message: `Передан несуществующий _id карточки.` });
      return;
    }
    res.send({ data: card })
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидный id.' });
      return;
    }
    res.status(500).send({ message: `Ошибка по умолчанию.` })
  });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then((card) => {
    if(!card) {
      res.status(404).send({ message: `Передан несуществующий _id карточки.` });
      return;
    }
    res.send({ data: card })
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидный id.' });
      return;
    }
    res.status(500).send({ message: `Ошибка по умолчанию.` })
  });
};

module.exports = {
    findAllCards, deleteCard, createCard, likeCard, dislikeCard
};
