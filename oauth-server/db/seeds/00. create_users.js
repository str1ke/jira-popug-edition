const userDao = require("../../src/dao/user");
const seedRecords = require("../seed_records");

const USERS = [{
  id: "f2aadc23-2067-4b07-8c3b-5ccbf314f5e2",
  email: "user@example.com",
  name: "user",
  password: "user",
  role: "user",
}, {
  id: "30acc214-4057-4f9f-95fb-446d778abceb",
  email: "admin@example.com",
  name: "admin",
  password: "admin",
  role: "admin",
}];

exports.seed = async () => {
  await seedRecords(USERS, {
    find: (seed) => userDao.findBy({ id: seed.id }),
    create: async (seed) => {
      await userDao.create({
        id: seed.id,
        email: seed.email,
        name: seed.name,
        password: seed.password,
        role: seed.role,
      });
    },
    update: async (id, seed) => {
      await userDao.update({ id }, {
        email: seed.email,
        name: seed.name,
        password: seed.password,
        role: seed.role,
      });
    },
  });
};
