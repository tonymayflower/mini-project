
const db = require('../database/db');
const sql = require('sql-template-strings');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports.list = () => {
    return db.query(sql`
    SELECT * FROM users limit 100;
    `)
    .then(({rows}) => rows)
}
  
module.exports.create = async ({email, password}) => {
    console.log('password', password)
    const hashedPassword = await bcrypt.hash(password, 10);

    return db.query(sql`INSERT INTO users (id, email, password)
    VALUES (${uuidv4()}, ${email}, ${hashedPassword})
    RETURNING id, email;
  `)
  .then(({rows}) => rows[0]) 
}
