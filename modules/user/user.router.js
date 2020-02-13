const router = require('express').Router()
const { signInUser, createAccount, checkBalance } = require('./user.controller')
const { checkBearer } = require('./../../middleware/jwt.middleware')

router.post('/signIn', signInUser)
router.post('/', createAccount)
router.get('/:idUser', checkBearer, checkBalance)
module.exports = router
