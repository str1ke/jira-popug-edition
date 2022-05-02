const path = require("path");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");
const express = require("express");
const session = require("express-session");
const passport = require("passport");

const routes = require("./routes");

// Express configuration
const app = express();

app.engine("ejs", ejs.__express);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(cookieParser());
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "secretsecret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require("./auth");

app.get("/login", routes.site.loginForm);
app.post("/login", routes.site.login);

app.get("/signup", routes.site.signupForm);
app.post("/signup", routes.site.signup);

app.get("/logout", routes.site.logout);

app.get("/oauth2/authorize", routes.oauth2.authorization);
app.post("/oauth2/authorize/decision", routes.oauth2.decision);
app.post("/oauth2/token", routes.oauth2.token);
app.get("/oauth2/user_info", routes.user.info);

module.exports = app;
