const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const todoRoutes = require('./app/routes/api/todos/todoRoute')

const app = express()

app.use(cors())

dotenv.config()

app.use(morgan('tiny'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.use('/api/todos', todoRoutes)

mongoose.connect(process.env.DB_URI, {  useNewUrlParser: true, useUnifiedTopology: true })
.then(result => app.listen(process.env.HOST))
.catch(err => console.log(err))
