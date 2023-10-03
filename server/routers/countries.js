const { Router } = require('express')
const cc = require('../controllers/countries')
const countryRouter = Router()

countryRouter.get('/', cc.index)
countryRouter.get('/:name', cc.show)
countryRouter.post('/', cc.create)
countryRouter.delete('/:name', cc.destroy)
countryRouter.patch('/:name', cc.patch)


module.exports = countryRouter