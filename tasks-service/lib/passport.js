import passport from "passport";

import PopugSsoStrategy from "./passport/passport-popug-sso";

import userDao from "../dao/user";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userDao.findBy({ id }).first();
  done(null, user);
});

passport.use(new PopugSsoStrategy({
  clientID: "client_id",
  clientSecret: "client_secret",
  authorizationURL: "http://localhost:3000/oauth2/authorize",
  callbackURL: "http://localhost:3001/api/auth/popug-sso/callback",
  tokenURL: "http://oauth-server:3000/oauth2/token",
  userProfileURL: "http://oauth-server:3000/oauth2/user_info",
}, async (accessToken, refreshToken, user, cb) => {
  let dbUser;
  let err;

  try {
    dbUser = await userDao.findBy({ email: user.email }).first();

    if (!dbUser) {
      dbUser = await userDao.create({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });
    }
  } catch (error) {
    err = error;
  }

  return cb(err, dbUser);
}));

export default passport;
