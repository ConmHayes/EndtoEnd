const { Router } = require('express')
const pc = require('../controllers/people')
const peopleRouter = Router()

peopleRouter.get('/', pc.index)
peopleRouter.get('/:name', pc.show)
peopleRouter.post('/', pc.create)
peopleRouter.delete('/:name', pc.destroy)
peopleRouter.patch('/:name', pc.patch)


module.exports = peopleRouter