// import User from "../models/user.model.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import config from "../config/config.js";

// const { compare } = bcrypt;

// const login = async (req, res) => {
//     try {
//         let user = await User.findOne({ email: req.body.email });
//         if (!user) res.status(401).send("User not found.");

//         const matchPass = await compare(req.body.password, user.password);
//         if (!matchPass) res.status(400).send("Invalid password");

//         const token = jwt.sign({ _id: user._id }, config.secret);
//         res.header("t", token).send(token);
//     } catch (err) {
//         res.status(400).send("Could not login.");
//     }
// };

// export default { login };
