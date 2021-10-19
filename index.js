import express from "express";
import mongoose from "mongoose";
import config from "./config/config.js";
import userRoutes from "./routes/users.route.js";
import authRoutes from "./routes/auth.route.js";

const { connect, connection } = mongoose;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} request @ ${req.path}`);
    next();
});

connection.on("connected", () => console.log("Connected to DB"));
connect(config.mongoUri);

app.use("/", userRoutes);
app.use("/", authRoutes);

app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({ error: err.name + ": " + err.message });
    } else if (err) {
        res.status(400).json({ error: err.name + ": " + err.message });
        console.log(err);
    }
});

app.listen(config.port, () => {
    console.log(`Server started on ${config.port}`);
});
