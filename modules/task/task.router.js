const router = require('express').Router()
const { createTask, deleteTask, getTask, updateTask, setBudget } = require('./task.controller')
const { checkBearer } = require('./../../middleware/jwt.middleware')

router.get('/:id', checkBearer, getTask)
router.post('/', checkBearer, createTask)
router.delete('/:id', checkBearer, deleteTask)
router.put('/', checkBearer, updateTask)
router.put('/finish', checkBearer, setBudget)

module.exports = router
