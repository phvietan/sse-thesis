
exports.up = async function(knex) {
  await knex.schema.createTable('account_file', (table) => {
    table.comment('A table that show the account hash associate to which file');
    table.increments('id').unsigned().primary();
    table.string('account_hash').unique().notNullable().index();
    table.integer('file_hash').unique().notNullable();
    table.timestamps();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable('account_file');
};
