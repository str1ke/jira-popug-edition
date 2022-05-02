const passport = require("passport");
const { users } = require("../db");

module.exports.loginForm = (request, response) => response.render("login");

module.exports.login = passport.authenticate("local", { successReturnToOrRedirect: "/", failureRedirect: "/login" });

module.exports.logout = (request, response) => {
  request.logout();
  response.redirect("/");
};

module.exports.signupForm = (request, response) => response.render("signup");

module.exports.signup = (req, res) => {
  users.create(req.body, (err, result) => {
    res.json(result || err);
  });
}