// src/config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

 dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ MongoDB is connected SUCCESSFULLY!');
  } catch (err) {
    console.error('❌ MongoDB connection failed', err.message);
  }
};

module.exports = connectDB;