import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import config from "../config/config.js";

const login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) res.status(401).json({ error: "User not found." });

        if (!user.authenticate(req.body.password)) {
            return res.status("401").send({
                error: "Email and password don't match.",
            });
        }

        const token = jwt.sign({ _id: user._id }, config.secret);
        res.cookie("t", token);
        return res.json({
            // token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        res.status(401).json({ error: "Could not login." });
    }
};

const logout = async (req, res) => {
    res.clearCookie("t");
    return res.status(200).json({ message: "Logged out." });
};

const requireLogin = expressJwt({
    secret: config.secret,
    userProperty: "auth",
    algorithms: ["HS256"],
});

const hasAuthorization = (req, res, next) => {
    const authorized =
        req.profile && req.auth && req.profile._id == req.auth._id;
    if (!authorized) {
        return res.status("403").json({ error: "User is not authorized" });
    }
    next();
};

export default { login, logout, requireLogin, hasAuthorization };
