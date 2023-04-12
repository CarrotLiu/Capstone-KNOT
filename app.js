require("./db");
require("./auth");

const passport = require("passport");
const express = require("express");
const path = require("path");

// 创建routes实例
const routes = require("./routes/index");
const list = require("./routes/list");
const listItem = require("./routes/list-item");

const app = express();

// view engine setup (express需要渲染器才能渲染页面！)
app.set("view engine", "hbs");

// enable sessions
const session = require("express-session");
const sessionOptions = {
  secret: "knottt",
  resave: true,
  saveUninitialized: true,
};
app.use(session(sessionOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
console.log(__dirname);
// app.use("/assets", express.static(path.join(__dirname, "/assets")));

// passport setup
app.use(passport.initialize());
app.use(passport.session());

// make user data available to all templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

//
app.use("/", routes);
app.use("/list", list);
app.use("/list-item", listItem);

// 在端口3000监听
app.listen(3000);
