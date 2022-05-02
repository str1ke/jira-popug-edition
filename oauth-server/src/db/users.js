const userDao = require("../dao/user");

module.exports.findById = (id, done) => {
  userDao.findBy({ id })
    .first()
    .then((result) => {
      return done(null, result);
    })
    .catch(() => {
      done(new Error("user not found"));
    });
};

module.exports.findByEmail = (email, done) => {
  userDao.findBy({ email })
    .first()
    .then((result) => {
      return done(null, result);
    })
    .catch((err) => {
      console.log(err);
      done(new Error("user not found"));
    });
};

module.exports.create = (attrs, done) => {
  userDao.create(attrs)
    .then((result) => {
      return done(null, result);
    })
    .catch(() => {
      done(new Error("cannot create user"));
    });
};
