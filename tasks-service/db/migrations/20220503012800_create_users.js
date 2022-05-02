exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.createTable("users", (table) => {
    table.uuid("id").primary().notNullable().defaultTo(knex.raw("uuid_generate_v4()"));

    table.string("email").index();

    table.string("name");
    table.string("role");

    table.timestamps(false, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("users");
};
