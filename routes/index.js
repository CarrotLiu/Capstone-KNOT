const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  // mongoose = require("mongoose"),
  // User = mongoose.model("User"),
  // List = mongoose.model("List"),
  // Item = mongoose.model("Item"),
  // Record = mongoose.model("Record"),
  multer = require("multer"),
  bodyParser = require("body-parser"),
  upload = multer(),
  data = require("../data.json"),
  fs = require("fs");

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/home", (req, res) => {
  res.render("home", { layout: "layoutRegister" });
});

router.get("/", (req, res) => {
  console.log(req.user);
  if (req.user) {
    console.log("already login!");
    res.redirect("home");
  } else {
    res.render("loginPage");
  }
});

router.get("/login", (req, res) => {
  res.render("login", { layout: "layoutRegister" });
});

router.get("/register", (req, res) => {
  res.render("register", { layout: "layoutRegister" });
});

router.get("/record", (req, res) => {
  res.render("record", { layout: "layoutPage" });
});

router.post("/register", (req, res) => {
  // const { username, password } = req.body
  const userInfo = {
    username: req.body.username,
    password: req.body.password,
  };
  fs.writeFile(
    "../data.json",
    JSON.stringify({
      userInfo,
    }),
    (err) => {
      if (err) {
        res.render("register", {
          message: "Your registration information is not valid",
        });
        return;
      } else {
        passport.authenticate("json")(req, res, function () {
          res.redirect("/");
        });
      }
    }
  );
  // User.register(new User({ username }), req.body.password, (err, user) => {
  //   if (err) {
  //     res.render("register", {
  //       message: "Your registration information is not valid",
  //     });
  //   } else {
  //     passport.authenticate("local")(req, res, function () {
  //       res.redirect("/");
  //     });
  //   }
  // });
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

router.post("/saveRecord", upload.any(), (req, res) => {
  fs.writeFile(req.files[0].originalname, req.files[0].buffer, (err) => {
    if (err) {
      console.log("Error: ", err);
      res.status(500).send("An error occurred: " + err.message);
    } else {
      res.status(200).send("ok");
    }
  });
});

module.exports = router;
