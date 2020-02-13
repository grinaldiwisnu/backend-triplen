const router = require('express').Router()
const { createBoard, getBoards, updateBoard, getBoardId, deleteBoard } = require('./board.controller')
const { checkBearer } = require('./../../middleware/jwt.middleware')

router.get('/', checkBearer, getBoards)
router.get('/:id', checkBearer, getBoardId)
router.post('/', checkBearer, createBoard)
router.put('/', checkBearer, updateBoard)
router.delete('/:id', checkBearer, deleteBoard)

module.exports = router
