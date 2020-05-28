
const sql = require('sql-template-strings');
const { v4: uuidv4 } = require('uuid');
const db = require('../database/db');
const { logger } = require('../logger');

module.exports.list = () => db.query(sql`
    SELECT * FROM figures limit 100;
    `)
  .then(({ rows }) => rows);

module.exports.listFromOrder = ({ orderUuid }) => db.query(sql`
  SELECT * FROM figures where orderUuid=${orderUuid} limit 100;
  `)
  .then(({ rows }) => rows);


module.exports.create = async ({ profile, status, orderUuid }) => db.query(sql`INSERT INTO figures (id, profile, status, orderUuid)
    VALUES (${uuidv4()}, ${profile}, ${status}, ${orderUuid})
    RETURNING id, profile, status, orderUuid;
  `)
  .then(({ rows }) => rows[0]);

module.exports.updateStatus = async ({ figureUuid, status }) => db.query(sql`UPDATE figures set status = ${status} WHERE id = ${figureUuid} RETURNING id, profile, status, orderUuid`)
  .then(({rowCount, rows} ) => {
    if (rowCount === 0) {
      logger.info('figure not found');
      throw new Error('FIGURE NOT FOUND');
    }
    return rows[0];
  });
