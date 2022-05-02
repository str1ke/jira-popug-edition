const clientDao = require("../dao/client");

module.exports.findById = (id, done) => {
  clientDao.findBy({ id })
    .first()
    .then((result) => {
      return done(null, result);
    })
    .catch(() => {
      done(new Error("client not found"));
    });
};

module.exports.findByClientId = (clientId, done) => {
  clientDao.findBy({ clientId })
    .first()
    .then((result) => {
      return done(null, result);
    })
    .catch(() => {
      done(new Error("client not found"));
    });
};
