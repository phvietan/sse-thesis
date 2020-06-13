require('dotenv').config();

const path = require('path');
const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME, DATABASE_PORT } = process.env;

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'db',
      port: DATABASE_PORT,
      database: DATABASE_NAME,
      user:     DATABASE_USER,
      password: DATABASE_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(__dirname, 'migrations'),
    },
  },

  staging: {
    client: 'pg',
    connection: {
      host: 'db',
      port: DATABASE_PORT,
      database: DATABASE_NAME,
      user:     DATABASE_USER,
      password: DATABASE_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(__dirname, 'migrations'),
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: 'db',
      port: DATABASE_PORT,
      database: DATABASE_NAME,
      user:     DATABASE_USER,
      password: DATABASE_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(__dirname, 'migrations'),
    },
  },
};