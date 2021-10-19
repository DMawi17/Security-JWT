import express from "express";
import mongoose from "mongoose";
import config from "./config/config.js";
import userRoutes from "./routes/users.route.js";

const { connect, connection } = mongoose;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} request @ ${req.path}`);
    next();
});


app.use("/", userRoutes);

connect(config.mongoUri);
connection.on("connected", () => console.log("Connected to DB"));

app.listen(config.port, () => {
    console.log(`Server started on ${config.port}`);
});
