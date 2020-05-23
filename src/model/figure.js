
const db = require('../database/db');
const sql = require('sql-template-strings');
const { v4: uuidv4 } = require('uuid');

module.exports.list = () => {
    return db.query(sql`
    SELECT * FROM figures limit 100;
    `)
    .then(({rows}) => rows)
}

module.exports.listFromOrder = ({orderUuid}) => {
  console.log(orderUuid)
  return db.query(sql`
  SELECT * FROM figures where orderUuid=${orderUuid} limit 100;
  `)
  .then(({rows}) => rows)
}

module.exports.create = async ({profile, status, orderUuid}) => {

    return db.query(sql`INSERT INTO figures (id, profile, status, orderUuid)
    VALUES (${uuidv4()}, ${profile}, ${status}, ${orderUuid})
    RETURNING id, profile, status, orderUuid;
  `)
  .then(console.log)  
}

module.exports.updateStatus = async ({figureUuid, status}) => {
  return db.query(sql`UPDATE figures set status = ${status} WHERE id = ${figureUuid}`)
.then(console.log)  
}
