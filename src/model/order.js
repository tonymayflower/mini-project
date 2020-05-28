
const sql = require('sql-template-strings');
const { v4: uuidv4 } = require('uuid');
const db = require('../database/db');

module.exports.list = () => db.query(sql`
    SELECT * FROM orders limit 100;
    `)
  .then(({ rows }) => rows);
// todo ajouter le lien vers le user
module.exports.create = async ({
  numberOfFigures, pack, price, userUuid,
}) => db.query(sql`INSERT INTO orders (id, numberOfFigures, pack, price, userUuid)
    VALUES (${uuidv4()}, ${numberOfFigures}, ${pack}, ${price}, ${userUuid})
    RETURNING id, numberOfFigures, pack, price, userUuid;
  `)
  .then(({ rows }) => rows[0]);

module.exports.updateStatus = async ({ orderUuid, status }) => db.query(sql`UPDATE orders set status = ${status} WHERE id = ${orderUuid}`)
  .then(({ rowCount }) => {
    if (rowCount === 0) {
      throw new Error('ORDER NOT FOUND');
    }
    return { orderUuid, status };
  });
