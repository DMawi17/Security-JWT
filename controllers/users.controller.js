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
        if (!user) res.status(400).send("User not found.");
        req.profile = user;
        next();
    } catch (err) {
        res.status(400).send("Couldn't retrieve user.");
    }
};

const read = (req, res) => {
    return res.json(req.profile);
};

const update = async (req, res) => {
    try {
        let user = req.profile;
        Object.assign(user, req.body);
        await user.save();
        res.json(user);
    } catch (err) {
        return res.status(400).send("Unable to update user");
    }
};

const remove = async (req, res) => {
    try {
        let user = req.profile;
        let deletedUser = await user.remove();
        res.json(deletedUser);
    } catch (err) {
        return res.status(400).send("Unable to remove user");
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
