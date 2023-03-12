import express from "express";
import Keyword from "../mongodb/models/Keyword.js"

const router = express.Router();

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