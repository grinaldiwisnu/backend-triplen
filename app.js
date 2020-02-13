const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()
require('dotenv').config()

app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// load user module
const user = require('./modules/user/user.router')

app.use('/users', user)

// load board module
const board = require('./modules/board/board.router')

app.use('/boards', board)

// load task module
const task = require('./modules/task/task.router')

app.use('/task', task)

app.listen(300, () => {
  // eslint-disable-next-line no-console
  console.log('app listened at http://localhost:300')
})
