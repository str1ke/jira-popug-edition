exports.up = async (knex) => {
  await knex.schema.alterTable("users", (table) => {
    table.uuid("public_id").notNullable().defaultTo(knex.raw("uuid_generate_v4()"));
  });
};

exports.down = async (knex) => {
  await knex.schema.alterTable("users", (table) => {
    table.dropColumn("public_id");
  });
};
