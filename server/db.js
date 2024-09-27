const Pool = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'dyce',
    port: '5432',
    password: process.env.POSTGRES_PASSWORD
})

module.exports = pool;