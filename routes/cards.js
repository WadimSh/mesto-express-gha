const router = require('express').Router();
const {
    findAllCards, 
    deleteCard, 
    createCard, 
    likeCard, 
    dislikeCard
} = require('../controllers/cards');

router.get('/:cardId', deleteCard);
router.get('/', findAllCards);
router.post('/', createCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard)

module.exports = router;