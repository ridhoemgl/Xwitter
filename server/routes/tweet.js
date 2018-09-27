const router = require('express').Router()
const { addTweet, getAllTweets, getUserTweet } = require('../controllers/Tweet')

router.post('/add/:id', addTweet)
router.get('/', getAllTweets)
router.get('/:id', getUserTweet)
module.exports = router