import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
const secret = /*Math.random() + */ process.env.JWT_SECRET;

app.get("/token", (req, res) => {
    const payload = { userId: 42, username: "Veera Cat", admin: "true" };
    const options = { expiresIn: "1h" };

    const token = jwt.sign(payload, secret, options);
    res.send(token);
});

const checkToken = (req, res, next) => {
    const tokenRaw = req.headers.authorization;
    if (!tokenRaw) res.status(401);

    const tokenToCheck = tokenRaw.split(" ")[1];
    if (!tokenToCheck) res.status(401);

    jwt.verify(tokenToCheck, secret, (err, payload) => {
        if (err) res.status(400).send(err.message);
        req.profile = payload;
        next();
    });
};

app.get("/secure", checkToken, (req, res) => {
    res.send(`Access to ${req.profile.username} granted.`);
});

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
