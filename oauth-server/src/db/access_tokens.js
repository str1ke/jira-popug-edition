const accessTokenDao = require("../dao/access_token");

module.exports.find = (accessToken, done) => {
  accessTokenDao.findBy({ accessToken })
    .first()
    .then((result) => {
      return done(null, result);
    })
    .catch(() => {
      done(new Error("access token not found"));
    });
};

module.exports.findByUserIdAndClientId = (userId, clientId, done) => {
  accessTokenDao.findBy({ userId, clientId })
    .first()
    .then((result) => {
      return done(null, result);
    })
    .catch(() => {
      done(new Error("access token not found"));
    });
};

module.exports.save = (token, userId, clientId, done) => {
  accessTokenDao.create({ accessToken: token, userId, clientId })
    .then(() => {
      return done();
    })
    .catch(() => {
      done(new Error("access token not found"));
    });
};

module.exports.removeByUserIdAndClientId = (userId, clientId, done) => {
  accessTokenDao.delete({ userId, clientId })
    .then(() => {
      return done();
    })
    .catch(() => {
      done(new Error("access token not found"));
    });
};
