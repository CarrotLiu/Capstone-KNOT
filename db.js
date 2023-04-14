const mongoose = require("mongoose"),
  grid = require("gridfs-stream"),
  // GridFS = grid(mongoose.connection.db, mongoose.mongo),
  conn = mongoose.connection,
  fs = require("fs"),
  multer = require("multer"),
  upload = multer(),
  // GridFSBucket = require("mongodb"),
  URLSlugs = require("mongoose-url-slugs"),
  passportLocalMongoose = require("passport-local-mongoose");
// grid.mongo = mongoose.mongo;
// conn.once("open", function () {
//   console.log("open");

//   var gfs = grid(conn.db);

//   // streaming to gridfs

//   //filename to store in mongodb

//   var writestream = gfs.createWriteStream({
//     filename: "recording.mp3",
//   });
//   fs.createReadStream("/assets/recordings/recording.mp3").pipe(writestream);

//   writestream.on("close", function (file) {
//     // do something with \`file\`

//     console.log(file.filename + "Written To DB");
//   });
// });

// test.items.renameCollection("records");

const User = new mongoose.Schema({
  // username, password
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }],
});

const Item = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, min: 1, required: true },
    checked: { type: Boolean, default: false, required: true },
  },
  {
    _id: true,
  }
);

const Record = new mongoose.Schema(
  {
    name: { type: String, required: true },
    data: { type: Buffer, required: true },
    mimeType: { type: String, required: true },
  },
  {
    _id: true,
  }
);

const List = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  createdAt: { type: Date, required: true },
  items: [Item],
});

User.plugin(passportLocalMongoose);
List.plugin(URLSlugs("name"));

mongoose.model("User", User);
mongoose.model("List", List);
mongoose.model("Record", Record);
mongoose.model("Item", Item);
mongoose.connect(
  "mongodb+srv://XinyuLiu:X1nyulxyMongoDB@cluster0.hnusacu.mongodb.net/?retryWrites=true&w=majority"
);
