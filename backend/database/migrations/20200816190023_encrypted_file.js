
exports.up = function(knex) {
    await knex.schema.createTable('encrypted_files', (table) => {
        table.comment('A table that hold EF');
        table.increments('id').unsigned().primary();
        table.string('user_hash').unique().notNullable();
        table.string('file_hash').unique().notNullable();
        table.string('content').notNullable();
        table.timestamps();
    });

    await knex.schema.createTable('encrypted_indexes', (table) => {
        table.comment('A table that hold I');
        table.increments('id').unsigned().primary();
        table.string('file_hash').notNullable();
        table.string('trapdoor').notNullable();
        table.timestamps();
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTable('encrypted_file');
    await knex.schema.dropTable('encrypted_indexes');
};