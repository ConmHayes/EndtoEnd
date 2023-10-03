const db = require("../database/connect")

class People {
    constructor({ person_id, name, languages, fun_fact, country_id }) {
        this.person_id = person_id
        this.name = name
        this.languages = languages
        this.fun_fact = fun_fact
        this.country_id = country_id

    }

    static async getAll() {
        const response = await db.query('SELECT name FROM people;')
        if (response.rows.length === 0) {
            throw new Error("No people available")
        }

        return response.rows.map(c => new People(c))
    }

    static async getOneByName(peopleName) {
        const response = await db.query('SELECT * FROM people WHERE LOWER(name) = $1;', [peopleName])
        if (response.rows.length != 1) {
            throw new Error('Unable to find people')
        }
        return new People(response.rows[0])
    }

    static async create(data) {
        const { name, languages, country_id } = data
        let response = await db.query("INSERT INTO people (name, capital, country_id) VALUES ($1, $2, $3) RETURNING name;", [name, languages, country_id])
        const personName = response.rows[0].name
        const newPerson = await Person.getOneByName(personName)
        return new People(newPerson)
    }

    async destroy(req, res) {
        let response = await db.query('DELETE FROM people WHERE name = $1 RETURNING *;', [this.name])
        return new People(response.rows[0])
    }

    async patch(data) {
        // const { capital } = data
        let response = await db.query('UPDATE people SET name = $1 WHERE name = $2 RETURNING *;', [data.name, this.name])
        return new People(response.rows[0])
    }
}

module.exports = People