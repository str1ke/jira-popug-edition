import nextConnect from "next-connect";

import passport from "../../../lib/passport";
import auth from "../../../middleware/auth";

const handler = nextConnect();

handler.use(auth).use(passport.authenticate("popug-sso"));

export default handler;
