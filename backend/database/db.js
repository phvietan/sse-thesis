require('dotenv').config();

const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME, DATABASE_PORT } = process.env;

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: DATABASE_PORT,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
  },
});

class Database {
  constructor() {
    this.db = knex;
  }
}

module.exports = Database;