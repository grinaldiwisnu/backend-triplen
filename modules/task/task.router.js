const router = require('express').Router()
const { createTask, deleteTask, getTask, updateTask } = require('./task.controller')
const { checkBearer } = require('./../../middleware/jwt.middleware')

router.get('/:id', checkBearer, getTask)
router.post('/', checkBearer, createTask)
router.delete('/:id', checkBearer, deleteTask)
router.put('/', checkBearer, updateTask)

module.exports = router
