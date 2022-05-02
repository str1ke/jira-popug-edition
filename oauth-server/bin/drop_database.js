#!/usr/bin/env node

const knex = require("knex");

const { DB } = require("../config");

const { database } = DB.connection;

const knexInstance = knex({
  ...DB,
  connection: {
    ...DB.connection,
    database: "postgres",
  },
});

knexInstance.raw(`DROP DATABASE ${database}`)
  .then(() => {
    console.log(`database created: ${database}`);
  })
  .catch((e) => {
    console.error("cannot create database");
    console.error(e);
  })
  .finally(() => {
    knexInstance.destroy();
  });
