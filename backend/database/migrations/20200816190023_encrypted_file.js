
exports.up = async function(knex) {
    await knex.schema.createTable('encrypted_files', (table) => {
        table.comment('A table that hold which user has which file');
        table.increments('id').unsigned().primary();
        table.string('user_hash').notNullable();
        table.string('file_hash').unique().notNullable();
        table.integer('file_id').notNullable();
        table.timestamps(true, true);
    });

    await knex.schema.createTable('encrypted_indexes', (table) => {
        table.comment('A table that hold I');
        table.increments('id').unsigned().primary();
        table.string('file_hash').notNullable();
        table.string('trapdoor', 2048).notNullable();
        table.timestamps(true, true);
    });

    await knex.schema.createTable('deleted_nodes', (table) => {
        table.comment('A table that hold deleted nodes');
        table.increments('id').unsigned().primary();
        table.string('user_hash').notNullable();
        table.integer('i').notNullable();
        table.integer('j').notNullable();
        table.timestamps(true, true);
    });

    await knex.schema.createTable('number_files', (table) => {
        table.comment('A table that hold the number of files a user has');
        table.increments('id').unsigned().primary();
        table.string('user_hash').unique().notNullable();
        table.integer('file_number').notNullable();
        table.timestamps(true, true);
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTable('encrypted_file');
    await knex.schema.dropTable('encrypted_indexes');
    await knex.schema.dropTable('deleted_nodes');
    await knex.schema.dropTable('number_files');
};