const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  mongoose = require("mongoose"),
  User = mongoose.model("User"),
  List = mongoose.model("List"),
  Item = mongoose.model("Item"),
  Record = mongoose.model("Record"),
  fs = require("fs");

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/record", (req, res) => {
  res.render("record");
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  User.register(new User({ username }), req.body.password, (err, user) => {
    if (err) {
      res.render("register", {
        message: "Your registration information is not valid",
      });
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      });
    }
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (user) {
      req.logIn(user, (err) => {
        res.redirect("/");
      });
    } else {
      res.render("login", { message: "Your login or password is incorrect." });
    }
  })(req, res, next);
});

router.post("/saveRecord", upload.single("Record"), (req, res) => {
  const recordingData = req.file.buffer;
  console.log(recordingData);
  // Save the blob data to MongoDB
  const recording = new Record({
    name: "recording.webm",
    data: recordingData,
    mimeType: "audio/webm",
  });
  try {
    await recording.save();
    console.log("Recording saved to MongoDB");
    res.send("Recording saved");
  } catch (err) {
    console.error("Failed to save recording:", err);
    res.status(500).send("Failed to save recording");
  }
});

module.exports = router;
