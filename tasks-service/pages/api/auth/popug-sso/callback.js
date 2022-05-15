import nextConnect from "next-connect";

import passport from "../../../../lib/passport";
import auth from "../../../../middleware/auth";

const handler = nextConnect();

handler.use(auth).use(passport.authenticate("popug-sso", { failureRedirect: "/login" }), (req, res) => {
  res.setHeader("Location", "/");

  res.status(302).send();
});

export default handler;
