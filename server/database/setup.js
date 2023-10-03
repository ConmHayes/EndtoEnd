require('dotenv').config()
const fs = require('fs')

const db = require('./connect')

const sql = fs.readFileSync(__dirname + '/countries.sql').toString()

db.query(sql)
    .then((data) => {
        db.end()
        console.log("Setup Complete")
    })
    .catch((error) => console.error(error))