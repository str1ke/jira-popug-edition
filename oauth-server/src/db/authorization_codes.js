const authorizationCode = require("../dao/authorization_code");

module.exports.find = (key, done) => {
  authorizationCode.findBy({ authorizationCode: key })
    .first()
    .then((result) => {
      return done(null, result);
    })
    .catch(() => {
      done(new Error("authorization code not found"));
    });
};

module.exports.save = (code, clientId, redirectUri, userId, scope, done) => {
  authorizationCode.create({ authorizationCode: code, userId, clientId })
    .then(() => {
      return done();
    })
    .catch(() => {
      done(new Error("authorization code not found"));
    });
};
