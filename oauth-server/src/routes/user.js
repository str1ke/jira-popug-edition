const passport = require("passport");

module.exports.info = [
  passport.authenticate("bearer", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
    });
  },
];
