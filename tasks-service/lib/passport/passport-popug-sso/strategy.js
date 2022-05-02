const util = require('util')
const OAuth2Strategy = require('passport-oauth2')
const InternalOAuthError = require('passport-oauth2').InternalOAuthError;

function Strategy(options, verify) {
  options = options || {};

  OAuth2Strategy.call(this, options, verify);

  this.name = options.name || 'popug-sso';

  this._userProfileURL = options.userProfileURL;
}

util.inherits(Strategy, OAuth2Strategy);

Strategy.prototype.userProfile = function(accessToken, done) {
  this._oauth2.get(this._userProfileURL, accessToken, function (err, body, _res) {
    let json;

    if (err) {
      return done(new InternalOAuthError('Failed to fetch user profile', err));
    }

    try {
      json = JSON.parse(body);
    } catch (ex) {
      return done(new Error('Failed to parse user profile'));
    }

    const profile = {};

    profile.provider  = 'popug-sso';
    profile.id = json.id;
    profile.name = json.name;
    profile.email = json.email;
    profile.role = json.role;

    profile._raw = body;
    profile._json = json;

    return done(null, profile);
  });
};

export default Strategy;