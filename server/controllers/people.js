const People = require('../models/People')

const index = async (req, res) => {
    try {
        const people = await People.getAll()
        res.status(200).json(people)

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const show = async (req, res) => {
    try {
        //get the name
        const name = req.params.name.toLowerCase()
        //get the person
        const person = await People.getOneByName(name)
        //return response/person
        res.status(200).json(person)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }

}

const create = async (req, res) => {
    try {
        const data = req.body
        const newPeople = await People.create(data)
        res.status(201).json(newPeople)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const destroy = async (req, res) => {
    try {
        const name = req.params.name.toLowerCase()
        const person = await People.getOneByName(name)
        const result = await person.destroy()
        res.status(404).end()
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

const patch = async (req, res) => {
    try {
        const name = req.params.name.toLowerCase()
        const person = await People.getOneByName(name)
        const update = await person.patch(req.body)

        res.status(200).json(update)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

module.exports = { index, show, create, destroy, patch }