const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const mongoURI = process.env.MONGO_URL;

const MongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
      }
    };
    module.exports = MongoDB;
    