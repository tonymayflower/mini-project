
const db = require('../db');

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
    ALTER TABLE orders ADD userUuid uuid NOT NULL;
    ALTER TABLE orders ADD CONSTRAINT FK_orderuser FOREIGN KEY(userUuid) REFERENCES users(id);
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
