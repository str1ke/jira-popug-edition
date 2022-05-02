import nextConnect from 'next-connect'
import auth from '../../../middleware/auth'
import passport from '../../../lib/passport'

const handler = nextConnect()

handler.use(auth).use(passport.authenticate('popug-sso'));

export default handler