import nextConnect from 'next-connect'
import auth from '../../../../middleware/auth'
import passport from '../../../../lib/passport'

const handler = nextConnect()

handler.use(auth).use(passport.authenticate('popug-sso', { failureRedirect: '/login' }), (req, res) => {
  res.setHeader('Location', '/');

  res.status(302).send();
});

export default handler