import express from "express";
import mongoose from "mongoose";
import Post from "../mongodb/models/post.js"

const router = express.Router();

router.route("/write/:id").put(async (req, res) => {

  const newPost = new Post({
    _id: new mongoose.Types.ObjectId(),
    uid: req.params.id,
    type: "free",
    title: req.body.title,
    body: req.body.content,
    keywords: req.body.selectedKeywords,
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
router.route("/search").get(async (req, res) => {
    const show = req.query.show;
    const searchMethod = req.query.searchMethod;
    const searchKeyword = req.query.searchKeyword;
    const method = { type: { "$regex": (show === "All" ? "" : req.query.show.toLowerCase()), "$options": "i" } };
    switch (searchMethod) {
        case "Title":
            method.title = { "$regex": searchKeyword, "$options": "i" };
            break;
        case "Content":
            method.body = { "$regex": searchKeyword, "$options": "i" };
            break;
        case "Keywords":
            method.keywords = { "$regex": searchKeyword, "$options": "i" };
            break;
        default:
            method.$or = [{ title: { "$regex": searchKeyword, "$options": "i" }}, { body: {"$regex": searchKeyword, "$options": "i" }}];
    }
    try {
        const allPosts = await Post.find(method);
        res.status(200).json({ success: true, data: allPosts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err });
    }
});

export default router;
