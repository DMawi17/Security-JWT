import User from "../models/user.model.js";

const create = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        return res.status(200).json({
            message: "Successfully signed up.",
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const list = async (req, res) => {
    try {
        let users = await User.find().select();
        res.json(users);
    } catch (err) {
        return res.status(400).send("Users not found.");
    }
};

const userById = async (req, res, next, id) => {
    try {
        let user = await User.findById(id);
        if (!user) res.status(400).json({ error: "User not found." });
        req.profile = user;
        next();
    } catch (err) {
        res.status(400).json({
            error: "Could not retrieve user",
        });
    }
};

const read = (req, res) => {
    req.profile.password = undefined;
    // console.log(req.profile);
    return res.json(req.profile);
};

const update = async (req, res) => {
    try {
        let user = req.profile;
        user = Object.assign(user, req.body);
        user.updated = Date.now();
        await user.save();
        user.password = undefined;
        res.json(user);
    } catch (err) {
        return res.status(400).send({ error: "Unable to update user" });
    }
};

const remove = async (req, res) => {
    try {
        let user = req.profile;
        let deletedUser = await user.remove();
        deletedUser.password = undefined;
        res.json(deletedUser);
    } catch (err) {
        return res.status(400).json({ error: "Unable to remove user" });
    }
};

export default {
    create,
    userById,
    read,
    list,
    remove,
    update,
};
