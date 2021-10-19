import dotenv from "dotenv";

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    secret: process.env.JWT_SECRET,
    mongoUri:
        "mongodb://classTester:1to5@localhost:27017/?authSource=test&readPreference=primary&ssl=false",
};

export default config;
