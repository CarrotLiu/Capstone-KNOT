const express = require("express"),
  router = express.Router(),
  mongoose = require("mongoose"),
  List = mongoose.model("List"),
  Item = mongoose.model("Item"),
  Record = mongoose.model("Record");

router.post("/create", (req, res) => {
  const { listSlug, name, quantity } = req.body;
  const listItem = { name, quantity };

  List.findOneAndUpdate(
    { slug: listSlug },
    { $push: { items: listItem } },
    (err, list, count) => {
      console.log(err);
      res.redirect(`/list/${listSlug}`);
    }
  );
});

router.post("/check", (req, res) => {
  const { listSlug, items } = req.body;

  List.findOne({ slug: listSlug }, (err, list, count) => {
    console.log(`items: ${items}, list: ${list}`);
    for (let i = 0; i < list.items.length; i++) {
      console.log(list.items[i]);
      if (items?.includes(list.items[i].name)) {
        list.items[i].checked = true;
      }
    }
    list.markModified("items");
    list.save((err, savedList, count) => {
      console.log(err);
      res.redirect(`/list/${listSlug}`);
    });
  });
});
router.post("/saveRecord", function (req, res) {
  const blobData = req.body;
  console.log("Received blob data:", blobData);

  // Save the blob data to MongoDB
  const db = client.db();
  const collection = db.collection("recordings");
  collection.insertOne({ data: blobData }, (err, result) => {
    if (err) {
      console.error("Failed to save recording to MongoDB:", err);
      res.status(500).send("Failed to save recording");
    } else {
      console.log("Recording saved to MongoDB");
      res.send("Recording saved");
    }
  });
});
module.exports = router;
