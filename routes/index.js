const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  mongoose = require("mongoose"),
  User = mongoose.model("User"),
  List = mongoose.model("List"),
  Item = mongoose.model("Item"),
  Record = mongoose.model("Record"),
  multer = require("multer"),
  upload = multer(),
  fs = require("fs");

router.get("/logout", (req, res) => {
  req.logout();

  res.redirect("/loginPage");
});

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/loginPage", (req, res) => {
  res.render("loginPage");
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

router.get("/record-copy", (req, res) => {
  res.render("record-copy");
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

// router.post("/saveRecord", upload.single("Record"), async (req, res) => {
//   console.log("here");
//   const recordingData = req.file.buffer;
//   console.log(recordingData);
//   // Save the blob data to MongoDB
//   const recording = new Record({
//     name: "recording.webm",
//     data: recordingData,
//     mimeType: "audio/webm",
//   });
//   try {
//     await recording.save();
//     console.log("Recording saved to MongoDB");
//     res.send("Recording saved");
//   } catch (err) {
//     console.error("Failed to save recording:", err);
//     res.status(500).send("Failed to save recording");
//   }
// });

module.exports = router;
