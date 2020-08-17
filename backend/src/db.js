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

  async checkIsFileOfUser(id, file_hash) {
    if (!helper.isString(id)) return false;
    const query = await this.db.from('encrypted_files')
                               .count("id as cnt")
                               .where({
                                 file_hash,
                                 user_hash: id,
                               });
    return parseInt(query[0].cnt) === 1;
  }

  async getNumberOfFiles(id) {
    if (!helper.isString(id)) return -1;
    const query = await this.db.from('number_files')
                              .select("file_number")
                              .where({ user_hash: id });
    if (query.length === 0) return -1;
    return query[0].file_number;
  }

  async txGetNumberOfFiles(trx, id) {
    if (!helper.isString(id)) return -1;
    const query = await trx('number_files')
                              .select("file_number")
                              .where({ user_hash: id });
    if (query.length === 0) return -1;
    return query[0].file_number;
  }

  async txInsertOrUpdateNumberOfFiles(trx, id, num) {
    const current = await this.txGetNumberOfFiles(trx, id);
    if (current === -1) {
      await trx('number_files').insert({ user_hash: id, file_number: num });
    } else {
      await trx('number_files')
            .where({ user_hash: id })
            .update({ file_number: num });
    }
  }

  async insertOrUpdateNumberOfFiles(id, num) {
    await this.db.transaction(async (trx) => {
      await this.txInsertOrUpdateNumberOfFiles(trx, id, num);
    });
  }

  async getFileHashOfUserById(user_hash, file_id) {
    const result = await this.db.from('encrypted_files')
              .select("file_hash")
              .where({ user_hash, file_id });
    return result[0].file_hash;
  }

  async txGetFileHashOfUserById(trx, user_hash, file_id) {
    const result = await trx('encrypted_files')
              .select("file_hash")
              .where({ user_hash, file_id });
    return result[0].file_hash;
  }

  async getFilesFromUser(user_hash) {
    if (!helper.isString(user_hash)) return [];
    return this.db.from('encrypted_files')
                  .select("file_hash", "file_id")
                  .where({ user_hash });
  }

  async getNumberOfFilesFromUser(id) {
    if (!helper.isString(id)) return 0;
    const result = await this.db.from('encrypted_files')
                                .count("id as cnt")
                                .where("user_hash", "=", id);
    return parseInt(result[0].cnt);
  }

  async storeEF(trx, user_hash, file_hash, n) {
    return trx('encrypted_files').insert({
      user_hash,
      file_hash,
      file_id: n,
    });
  }

  async storeTrapdoor(trx, file_hash, trapdoor) {
    return trx('encrypted_indexes').insert({
      trapdoor,
      file_hash,
    });
  }

  async txCheckTrapdoorExistFile(trx, file_hash, trapdoor) {
    const result = await trx('encrypted_indexes')
      .count("id as cnt")
      .where({
        trapdoor,
        file_hash,
      });
    return parseInt(result[0].cnt) === 1;
  }

  async deleteNode(trx, user_hash, i, j) {
    return trx('deleted_nodes').insert({
      user_hash,
      i, j,
    });
  }

  async isNodeDeleted(user_hash, i, j) {
    const result = await this.db.from('deleted_nodes').count("id as cnt")
            .where({
              user_hash,
              i, j,
            });
    return parseInt(result[0].cnt) === 1;
  }

  async txIsNodeDeleted(trx, user_hash, i, j) {
    const result = await trx('deleted_nodes').count("id as cnt")
            .where({
              user_hash,
              i, j,
            });
    return parseInt(result[0].cnt) === 1;
  }

  async txDeleteFile(trx, user_hash, file_hash) {
    await trx('encrypted_indexes')
          .where({ file_hash })
          .del();

    await trx('encrypted_files')
          .where({ user_hash, file_hash })
          .del();
  }
}

const db = new DatabaseClass();

module.exports = db;