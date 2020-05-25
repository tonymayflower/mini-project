
const path = require('path');
const migrate = require('migrate');

const migrationsDirectory = path.resolve(__dirname, '../src/database/migrations');

const [command] = process.argv.slice(2);

new Promise((resolve, reject) => {
  migrate.load(
    {
      stateStore: '.migrate',
      migrationsDirectory,
    },
    (err, set) => {
      if (err) {
        reject(err);
      }

      if (typeof set[command] !== 'function') {
        reject(new Error('Command is not a function'));
      }

      set[command]((error) => {
        if (error) reject(error);
        resolve();
      });
    },
  );
})
  .then(() => {
    console.log(`migrations "${command}" successfully ran`);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error.stack);
    process.exit(1);
  });
