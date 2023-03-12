import mongoose from "mongoose";

const KeywordSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});

const Keyword = mongoose.model("Keyword", KeywordSchema);

export default Keyword;