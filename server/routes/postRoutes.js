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

// get all posts
router.route("/").get(async (req, res) => {
    try {
        const allPosts = await Post.find();
        res.status(200).json({ success: true, data: allPosts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err });
    }
});


// get all job posts
router.route("/job").get(async (req, res) => {
    try {
        const jobPosts = await Post.find({ type: "job" });
        res.status(200).json({ success: true, data: jobPosts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err });
    }
});

// get all free posts
router.route("/free").get(async (req, res) => {
    try {
        const freePosts = await Post.find({ type: "free" });
        res.status(200).json({ success: true, data: freePosts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err });
    }
});

export default router;
