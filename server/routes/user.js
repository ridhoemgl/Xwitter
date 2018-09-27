const router = require('express').Router()
const { signup, signin, getUserProfile, getUserToFollow } = require('../controllers/User')
const auth = require('../middleware/auth')

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/', auth, getUserProfile)
router.get('/:id', getUserToFollow)
 
module.exports = router