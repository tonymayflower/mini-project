
const db = require('../db');

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TYPE order_status_t AS ENUM ('SENT', 'READY', 'DEIVERED');
  CREATE TABLE IF NOT EXISTS orders (
    id uuid PRIMARY KEY,
    numberOfFigures INT NOT NULL,
    pack text,
    price INT,
    status order_status_t
  );
  `);

  await client.release(true);
  next();
};

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
    DROP TABLE orders;
  `);

  await client.release(true);
  next();
};
