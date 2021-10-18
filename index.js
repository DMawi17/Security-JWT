import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const secret = process.env.JWT_SECRET;

app.get("/token", (req, res) => {
    const payload = { userId: 42 };
    const token = jwt.sign(payload, secret);
    res.send(token);
});

const checkToken = (req, res, next) => {
    const tokenRaw = req.headers.authorization;
    if (!tokenRaw) res.status(401);

    const tokenToCheck = tokenRaw.split(" ")[1];
    if (!tokenToCheck) res.status(401);

    jwt.verify(tokenToCheck, secret, (err, payload) => {
        console.log(err, payload);

        if (err) {
            return res.status(400).send(err.message);
        }
        next();
    });
};

app.get("/secure", checkToken, (req, res) => {
    // check token and return something
    res.send("Access granted!!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
