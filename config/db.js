
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
};

module.exports = connectDB;
