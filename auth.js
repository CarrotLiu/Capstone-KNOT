// const mongoose = require("mongoose"),
const passport = require("passport");
const JsonStrategy = require("passport-json").Strategy;
const LocalStrategy = require("passport-local");

// User = mongoose.model("User");
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.username,
      username: user.username,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    if (username == "aaa") {
      return cb(null, { username: username });
    }
    return cb(null, false);
  })
);
// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// console.log("inside auth");
