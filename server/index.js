import express from "express";
import cors from "cors";
import connectDb from "./mongodb/connect.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", async (req, res) => {
    res.send("Hello");
});

const connectServer = (port) => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

const startServer = async () => {
    try {
        connectDb("mongodb+srv://hacker:hacker@cluster0.7vbwdzb.mongodb.net/?retryWrites=true&w=majority");
        connectServer(2023);
    } catch (error) {
        console.error(error);
    }
}

startServer();