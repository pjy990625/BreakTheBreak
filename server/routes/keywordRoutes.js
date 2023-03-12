import express from "express";
import mongoose from "mongoose";
import Keyword from "../mongodb/models/Keyword.js"

const router = express.Router();

router.route("/add").put(async (req, res) => {
    const newKeyword = new Keyword({
      name: req.body.name,
    });
  
    try {
      Keyword.create(newKeyword);
      console.log("keyword added");
      res.status(200).json({ success: true, result: "post successful" });
    } catch (err) {
      res.status(500).json({ success: false, message: err });
    }
  });

router.get('/all', async (req, res) => {
    try {
        const allKeywords = await Keyword.find();
        res.status(200).json({ success: true, data: allKeywords });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err });
    }
});

export default router;