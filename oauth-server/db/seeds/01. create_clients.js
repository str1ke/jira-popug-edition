const clientDao = require("../../src/dao/client");
const seedRecords = require("../seed_records");

const CLIENTS = [{
  id: "cfc277b8-9d9e-4bd8-9255-83e4a8a2789d",
  name: "task-service",
  clientId: "b4db1752-8880-4006-b17a-9bdc90b2cfa7",
  clientSecret: "b8507f29-ac80-4bd6-a8f4-f8b3358b2fdc",
  isTrusted: true,
}];

exports.seed = async () => {
  await seedRecords(CLIENTS, {
    find: (seed) => clientDao.findBy({ id: seed.id }),
    create: async (seed) => {
      await clientDao.create({
        id: seed.id,
        name: seed.name,
        clientId: seed.clientId,
        clientSecret: seed.clientSecret,
        isTrusted: seed.isTrusted,
      });
    },
    update: async (id, seed) => {
      await clientDao.update({ id }, {
        name: seed.name,
        clientId: seed.clientId,
        clientSecret: seed.clientSecret,
        isTrusted: seed.isTrusted,
      });
    },
  });
};
