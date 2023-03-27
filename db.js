const mongoose = require("mongoose"),
  URLSlugs = require("mongoose-url-slugs"),
  passportLocalMongoose = require("passport-local-mongoose");

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
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, required: true },
    file: { type: Boolean, default: false, required: true },
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
