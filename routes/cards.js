const router = require('express').Router();
const {
    findAllCards, 
    deleteCard, 
    createCard
} = require('../controllers/cards');

router.get('/:cardId', deleteCard);
router.get('/', findAllCards);
router.post('/', createCard);

module.exports = router;