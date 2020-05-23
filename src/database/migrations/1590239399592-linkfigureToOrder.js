'use strict'
const db = require('../db');

module.exports.up = async function(next) {
  const client = await db.connect();

  await client.query(`
    ALTER TABLE figures ADD orderUuid uuid NOT NULL;
    ALTER TABLE figures ADD CONSTRAINT FK_figureorder FOREIGN KEY(orderUuid) REFERENCES orders(id);
  `);

  await client.release(true);
  next();
};

module.exports.down = async function(next) {
  const client = await db.connect();

  await client.query(`
    DROP TABLE figures;
  `);

  await client.release(true);
  next();
};