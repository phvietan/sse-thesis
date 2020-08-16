require('dotenv').config();
const helper = require('./helper');
const { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME, DATABASE_PORT } = process.env;

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
  },
});

class DatabaseClass {
  constructor() {
    this.db = knex;
  }

  async getFilesFromUser(id) {
    if (!helper.isString(id)) return [];
    return this.db.from('encrypted_files')
                  .select("file_hash", "content")
                  .where("user_hash", "=", id);
  }

  async getNumberOfFilesFromUser(id) {
    if (!helper.isString(id)) return 0;
    const result = await this.db.from('encrypted_files')
                                .count("id as cnt")
                                .where("user_hash", "=", id);
    return result[0].cnt;
  }

  async storeEF(trx, user_hash, file_hash, content) {
    return trx('encrypted_files').insert({
      user_hash,
      file_hash,
      content,
    });
  }

  async storeTrapdoor(trx, file_hash, trapdoor) {
    return trx('encrypted_indexes').insert({
      file_hash,
      trapdoor,
    });
  }
}

const db = new DatabaseClass();

module.exports = db;