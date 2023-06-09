import express from "express";
import mongoose from "mongoose";
import fetch from "node-fetch";
import cheerio from "cheerio";
import nodemailer from "nodemailer";
import Post from "../mongodb/models/post.js"
import User from "../mongodb/models/user.js";

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
            text: `You have been matched with a job oppertunity that fits your skill qualification!:\r\n`,
            html: `<b>${req.body.title}</b><br>${req.body.content}`
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
            method.content = { "$regex": searchKeyword, "$options": "i" };
            break;
        case "Keywords":
            method.keywords = { "$regex": searchKeyword, "$options": "i" };
            break;
        default:
            method.$or = [{ title: { "$regex": searchKeyword, "$options": "i" }}, { content: {"$regex": searchKeyword, "$options": "i" }}];
    }
    try {
        const allPosts = await Post.find(method);
        res.status(200).json({ success: true, data: allPosts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err });
    }
});

// get tiobe index
router.route("/tiobe").get(async (req, res) => {
    const url = 'https://www.tiobe.com/tiobe-index';
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const html = await response.text();
        const $ = cheerio.load(html);
        const rankings = [];

        $('#top20.table-striped>tbody>tr').each((i, el) => {
            const rank = $(el).find('td:nth-child(1)').text().trim();
            const logoSrc = $(el).find('td:nth-child(4)>img').attr('src');
            const language = $(el).find('td:nth-child(5)').text().trim();
            const rating = $(el).find('td:nth-child(6)').text().trim();

            rankings.push({ rank, logoSrc, language, rating });
        });

        res.json(rankings);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

async function sendEmail(recipient, title, content) {
  console.log(recipient);
  const transporter = nodemailer.createTransport({
    host: 'smtps.hiworks.com',
    port: 465,
    secure: true,
    auth: {
      user: 'dkdlenlggg2@hans.best',
      pass: 'hackathon2023'
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
