// const mongoose = require("mongoose"),
const passport = require("passport");
const JsonStrategy = require("passport-json").Strategy;
// User = mongoose.model("User");
passport.use(
  new JsonStrategy(function (username, password, done) {
    Users.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);
// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
