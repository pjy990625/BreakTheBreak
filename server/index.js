import express from "express";
import cors from "cors";
import connectDb from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import cookieSession from "cookie-session";
import "./passport.js";
import passport from "passport";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors({ origin: "http://localhost:3000", methods: "GET,POST,PUT,DELETE", credentials: true }));
app.use(cookieSession({ name: "session", keys: ["break"], maxAge: 24 * 60 * 60 * 1000 }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/post", postRoutes);
app.use("/auth", authRoutes);

const connectServer = (port) => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

const startServer = async () => {
    try {
        connectDb("mongodb+srv://hacker:hacker@cluster1.czjthnz.mongodb.net/test?retryWrites=true&w=majority");
        connectServer(2023);
    } catch (error) {
        console.error(error);
    }
}

startServer();
