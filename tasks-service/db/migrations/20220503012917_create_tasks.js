exports.up = async (knex) => {
  await knex.schema.createTable("tasks", (table) => {
    table.uuid("id").primary().notNullable().defaultTo(knex.raw("uuid_generate_v4()"));

    table.string("title");
    table.uuid("user_id");
    table.string("state");

    table.timestamps(false, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("tasks");
};
