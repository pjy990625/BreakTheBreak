import express from "express";
import cors from "cors";
import connectDb from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/post", postRoutes);

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
