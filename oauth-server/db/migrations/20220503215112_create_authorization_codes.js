exports.up = async (knex) => {
  await knex.schema.createTable("authorization_codes", (table) => {
    table.uuid("id").primary().notNullable().defaultTo(knex.raw("uuid_generate_v4()"));

    table.string("authorization_code").index();

    table.uuid("user_id");
    table.foreign("user_id").references("users.id");

    table.uuid("client_id");
    table.foreign("client_id").references("clients.id");

    table.timestamps(false, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("authorization_codes");
};
