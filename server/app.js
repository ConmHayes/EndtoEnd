const express = require('express')
const cors = require('cors')
const logger = require('./middleware/logger')
const countryRouter = require('./routers/countries')
const peopleRouter = require('./routers/people')
const app = express()

//Middleware
app.use(express.json())
app.use(cors())
app.use(logger)

//Routes
app.use('/countries', countryRouter)
app.use('/people', peopleRouter)

module.exports = app