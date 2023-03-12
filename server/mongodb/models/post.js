import mongoose from "mongoose";

const Post = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["general", "job"],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
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
