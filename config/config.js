import dotenv from "dotenv";

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    secret: process.env.JWT_SECRET,
    mongoUri: process.env.MONGODB_URI,
};

export default config;
