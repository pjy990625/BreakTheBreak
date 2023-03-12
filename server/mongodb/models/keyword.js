import mongoose from "mongoose";

const KeywordSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
        required: true
    },
    name: {
        type: String,
        required: true
    },
});

const Keyword = mongoose.model("Keyword", KeywordSchema);

export default Keyword;