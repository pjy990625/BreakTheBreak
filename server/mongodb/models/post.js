import mongoose from "mongoose";

const Post = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId(),
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["free", "job"],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    keywords: {
        type: [String]
    },
    timestamp: {
        type: Date,
        required: true
    }
});

const PostSchema = mongoose.model("Post", Post);

export default PostSchema;
