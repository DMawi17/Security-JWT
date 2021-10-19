import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;
const { genSalt, hash, compare } = bcrypt;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    updated: Date,
});

UserSchema.pre("save", async function (next) {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    next();
});

UserSchema.methods.authenticate = async function (plainText) {
    return compare(plainText, this.password);
};

export default model("User", UserSchema);
