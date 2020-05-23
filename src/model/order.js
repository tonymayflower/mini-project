
const db = require('../database/db');
const sql = require('sql-template-strings');
const { v4: uuidv4 } = require('uuid');

module.exports.list = () => {
    return db.query(sql`
    SELECT * FROM orders limit 100;
    `)
    .then(({rows}) => rows)
}
// todo ajouter le lien vers le user
module.exports.create = async ({numberOfFigures, price, userUuid}) => {

    return db.query(sql`INSERT INTO orders (id, numberOfFigures, price, userUuid)
    VALUES (${uuidv4()}, ${numberOfFigures}, ${price}, ${userUuid})
    RETURNING id, numberOfFigures, price, userUuid;
  `)
  .then(({rows}) => rows[0])
  
}

module.exports.updateStatus = async ({orderUuid, status}) => {
  return db.query(sql`UPDATE orders set status = ${status} WHERE id = ${orderUuid}`)
  .then(({rows}) => rows[0])
}
