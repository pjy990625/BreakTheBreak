import express from "express";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import Post from "../mongodb/models/post.js"

const router = express.Router();

router.route("/write/:id").put(async (req, res) => {
  const newPost = new Post({
    _id: new mongoose.Types.ObjectId(),
    uid: req.params.id,
    title: req.body.title,
    content: req.body.content,
    type: req.body.category.toLowerCase(),
    keywords: req.body.selectedKeywords,
    timestamp: req.body.timestamp.timestamp,
  });

  try {
    Post.create(newPost);
    if (req.body.category.toLowerCase() === "hiring") {
      const candidates = await User.find({ keywords: { $in: req.body.selectedKeywords } });
      candidates.forEach((candidate) => {
        if (candidate.uid !== req.params.id) {
          sendEmail(candidate.email, "[BreakTheBreak] A Job Oppertunity that fits your skill qualification!", {
            text: `You have been matched with a job oppertunity that fits your skill qualification!:\r\n${req.body.title}\r\n`,
            html: req.body.content
          });
        }
      });
    }
    console.log("mail sent");
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

async function sendEmail(recipient, title, content) {
  const transporter = nodemailer.createTransport({
    host: 'smtps.hiworks.com',
    port: 465,
    secure: true,
    auth: {
      user: 'dkdlenlggg2@hans.best',
      pass: 'hackathone2023'
    },
    tls: { rejectUnauthorized: false }
  });
  await transporter.sendMail({
    from: 'dkdlenlggg2@hiworks.co.kr',
    to: recipient,
    subject: title,
    text: content.text,
    html: content.html
  });
}

export default router;
