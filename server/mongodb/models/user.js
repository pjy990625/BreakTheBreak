import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: 1,
    },
    token: {
        type: String,
    },
    tokenExpiration: {
        type: Number,
    },
    email: {
        type: String,
    },
    keywords: {
        type: [String],
    }
});

const User = mongoose.model("User", UserSchema);

export default User;