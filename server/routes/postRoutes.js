import express from "express";
import mongoose from "mongoose";
import Post from "../mongodb/models/post.js"

const router = express.Router();

router.route("/:id").put(async (req, res) => {

  const newPost = new Post({
    _id: new mongoose.Types.ObjectId(),
    uid: req.params.id,
    type: "free",
    title: req.body.title,
    body: req.body.content,
    timestamp: req.body.timestamp.timestamp,
  });

  try {
    Post.create(newPost);
    res.status(200).json({ success: true, result: "post successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

export default router;