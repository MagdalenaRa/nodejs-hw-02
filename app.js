const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db');

const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')
const setJWTStrategy = require('./config/jwt')
const path = require('path')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use(express.static(path.resolve(__dirname, './public')))
// console.log(path.resolve(__dirname, '/public'))
setJWTStrategy();
app.use('/avatars', express.static(path.join(__dirname, 'public/avatars')));

app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)

app.use((req, res) => {
  res.status(404).json({ message: `Not found- ${req.path}` }
  )
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app