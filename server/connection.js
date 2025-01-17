const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'autolot',
    password: 'Master33773555',
    port: 5432
})

module.exports = pool