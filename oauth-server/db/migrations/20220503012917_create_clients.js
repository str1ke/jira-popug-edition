exports.up = async (knex) => {
  await knex.schema.createTable("clients", (table) => {
    table.uuid("id").primary().notNullable().defaultTo(knex.raw("uuid_generate_v4()"));

    table.string("name");

    table.string("client_id");
    table.string("client_secret");

    table.boolean("is_trusted");

    table.timestamps(false, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("users");
};
