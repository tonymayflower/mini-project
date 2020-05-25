
const db = require('../db');

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TYPE figure_status_t AS ENUM ('TODO', 'PROGRESS', 'DONE');

  CREATE TABLE IF NOT EXISTS figures (
    id uuid PRIMARY KEY,
    profile text UNIQUE,
    status figure_status_t
  );
  `);

  await client.release(true);
  next();
};

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
    DROP TABLE figures;
  `);

  await client.release(true);
  next();
};
