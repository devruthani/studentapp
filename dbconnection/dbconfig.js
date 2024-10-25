const mysql2_extended = require('mysql2-extended');
const mysql2promise = require( 'mysql2/promise');


require('dotenv').config();

const pool = mysql2promise.createPool({
    host: process.env.HOST,
    user: process.env.USER_NAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});

const db = new mysql2_extended.MySQL2Extended(pool);

module.exports = db;