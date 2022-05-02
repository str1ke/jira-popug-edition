const refreshToken = require("../dao/refresh_token");

module.exports.find = (key, done) => {
  refreshToken.findBy({ refreshToken: key })
    .first()
    .then((result) => {
      return done(null, result);
    })
    .catch(() => {
      done(new Error("access token not found"));
    });
};

module.exports.findByUserIdAndClientId = (userId, clientId, done) => {
  refreshToken.findBy({ userId, clientId })
    .first()
    .then((result) => {
      return done(null, result);
    })
    .catch(() => {
      done(new Error("refresh token not found"));
    });
};

module.exports.save = (token, userId, clientId, done) => {
  refreshToken.create({ refreshToken: token, userId, clientId })
    .then(() => {
      return done();
    })
    .catch(() => {
      done(new Error("refresh token not found"));
    });
};

module.exports.removeByUserIdAndClientId = (userId, clientId, done) => {
  refreshToken.delete({ userId, clientId })
    .then(() => {
      return done();
    })
    .catch(() => {
      done(new Error("refresh token not found"));
    });
};
